'use strict';

import * as vscode from 'vscode';

var googleTranslate: any;
var languages: any;
var replaceText: boolean;
var translations: any[];
var selections: vscode.Selection[];
var linesCount: number;

export function activate(context: vscode.ExtensionContext) {
	let disposable = vscode.commands.registerCommand('extension.translate', onActivate);
	context.subscriptions.push(disposable);
}

function onActivate(): void {
	if (!vscode.window.activeTextEditor) {
		vscode.window.showErrorMessage('Must select text to translate');
		return;
	}
	initMembers();
	if (selections.length > 1) {
		if (selections.every(s => s.isEmpty)) {
			showEmptyError();
			return;
		}
		multiCursorTranslate();
	}
	else if (selections.length === 1) {
		let selection: vscode.Selection = selections[0];
		if (selection.isEmpty) {
			showEmptyError();
			return;
		}
		translateSelection(selections[0]);
	}
	else {
		showEmptyError();
	}
}

function initMembers(): void {
	let apiKey = vscode.workspace.getConfiguration('googleTranslateExt')['apiKey'];
	googleTranslate = require('google-translate')(apiKey);
	languages = vscode.workspace.getConfiguration('googleTranslateExt')['languages'];
	replaceText = vscode.workspace.getConfiguration('googleTranslateExt')['replaceText'];
	selections = vscode.window.activeTextEditor.selections;
	translations = [];
	linesCount = 0;
}

function multiCursorTranslate(): void {
	selections.forEach(selection => {
		translateSelection(selection);
	});
}

function translateSelection(selection: vscode.Selection | vscode.Range): void {
	if (!selection.isSingleLine) {
		let firstLineNumber: number = selection.start.line;
		let lastLineNumber = selection.end.line;
		linesCount += lastLineNumber - firstLineNumber;
		for (let lineNumber = firstLineNumber; lineNumber <= lastLineNumber; lineNumber++) {
			let range: vscode.Range = vscode.window.activeTextEditor.document.lineAt(lineNumber).range;
			if (lineNumber === firstLineNumber) {
				range = new vscode.Range(lineNumber, selection.start.character, lineNumber, range.end.character);
			} else if (lineNumber === lastLineNumber) {
				range = new vscode.Range(lineNumber, 0, lineNumber, selection.end.character);
			}
			translateSelection(range);
		}
		return;
	}
	let selectedText: string = vscode.window.activeTextEditor.document.getText(new vscode.Range(selection.start, selection.end));
	if (!languages) {
		vscode.window.showErrorMessage('Go to user settings and edit "googleTranslateExt.languages".');
		return;
	}
	if (typeof languages === "string") {
		googleTranslate.translate(selectedText, languages, onGoogleTranslate);
	}
	else {
		if (replaceText) {
			googleTranslate.translate(selectedText, languages[0], onGoogleTranslate.bind(null, selection, languages[0]));
		}
		else {
			languages.forEach((language: string) => {
				googleTranslate.translate(selectedText, language, onGoogleTranslate.bind(null, selection, language));
			});
		}
	}
}

function onGoogleTranslate(selection: vscode.Selection, language: string, err: any, translation: any): void {
	if (err) {
		var error: any;
		if (err.body)
			error += JSON.parse(err.body)
		if (err.error)
			error += err.error.message;
		if (error)
			console.error(error);
		vscode.window.showErrorMessage('error ocurred on translation, see console for more details');
	}
	else if (translation.detectedSourceLanguage !== language) {
		if (replaceText) {
			if (selections.length + linesCount === translations.length + 1) {
				let editor = vscode.window.activeTextEditor;
				editor.edit((editBuilder: vscode.TextEditorEdit) => {
					for (let i = 0; i < translations.length; i++) {
						const element = translations[i];
						editBuilder.replace(element.selection, element.translation.translatedText);
					}
					editBuilder.replace(selection, translation.translatedText);
				});
			}
			else {
				translations.push({
					'selection': selection,
					'translation': translation
				});
			}
		}
		else {
			vscode.window.showInformationMessage(translation.translatedText);
		}
	}
}

function showEmptyError(): void {
	vscode.window.showErrorMessage('Must select text to translate');
}

// this method is called when your extension is deactivated
export function deactivate() {
}