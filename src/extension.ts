'use strict';

import * as vscode from 'vscode';

var replaceText: boolean;
var translations: any[] = [];
var selections: vscode.Selection[];

export function activate(context: vscode.ExtensionContext) {
	let disposable = vscode.commands.registerCommand('extension.translate', () => {
		if (!vscode.window.activeTextEditor) {
			vscode.window.showErrorMessage('Must select text to translate');
			return;
		}
		replaceText = vscode.workspace.getConfiguration('googleTranslateExt')['replaceText'];
		selections = vscode.window.activeTextEditor.selections;
		if (selections.length > 1) {
			multiCursorTranslate();
		}
		else if (selections.length === 1) {
			translate(selections[0]);
		}
		else {
			// show error from above
		}
	});
	context.subscriptions.push(disposable);
}

function multiCursorTranslate() {
	selections.forEach(selection => {
		translate(selection);
	});
}

function translate(selection: vscode.Selection) {
	let selectedText = vscode.window.activeTextEditor.document.getText(new vscode.Range(selection.start, selection.end));
	if (!selectedText || selectedText.length === 0 || !selectedText.trim()) {
		vscode.window.showErrorMessage('Must select text to translate');
		return;
	}
	let apiKey = vscode.workspace.getConfiguration('googleTranslateExt')['apiKey'];
	let googleTranslate = require('google-translate')(apiKey);
	let languages: any = vscode.workspace.getConfiguration('googleTranslateExt')['languages'];
	if (!languages) {
		vscode.window.showErrorMessage('Go to user settings and edit "googleTranslateExt.languages".');
		return;
	}
	if (typeof languages === "string") {
		googleTranslate.translate(selectedText, languages, onTranslated);
	}
	else {
		if (replaceText) {
			googleTranslate.translate(selectedText, languages[0], onTranslated.bind(null, selection, languages[0]));
		}
		else {
			languages.forEach((language: string) => {
				googleTranslate.translate(selectedText, language, onTranslated.bind(null, selection, language));
			});
		}
	}
}

function onTranslated(selection: vscode.Selection, language: string, err: any, translation: any): void {
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
			if (selections.length === translations.length + 1) {
				let editor = vscode.window.activeTextEditor;
				editor.edit((editBuilder: vscode.TextEditorEdit) => {
					for (let i = 0; i < translations.length; i++) {
						const element = translations[i];
						editBuilder.replace(element.selection, element.translation.translatedText);
					}
					editBuilder.replace(selection, translation.translatedText);					
				}).then((value) => {
					translations = [];
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

// this method is called when your extension is deactivated
export function deactivate() {
}