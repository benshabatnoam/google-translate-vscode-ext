'use strict';

import * as vscode from 'vscode';

var selections: vscode.Selection[];
var currentSelection: vscode.Selection;
var currentLanguage: string;

export function activate(context: vscode.ExtensionContext) {
	let disposable = vscode.commands.registerCommand('extension.translate', () => {
		if (!vscode.window.activeTextEditor) {
			vscode.window.showErrorMessage('Must select text to translate');
			return;
		}
		selections = vscode.window.activeTextEditor.selections;
		if (selections.length > 1) {
			multiCursorTranslate();
		}
		else if (selections.length === 1) {
			currentSelection = selections[0];
			translate();
		}
		else {
			// show error from above
		}
	});
	context.subscriptions.push(disposable);
}

function multiCursorTranslate() {
	selections.forEach(selection => {
		currentSelection = selection;
		translate();
	});
}

function translate() {
	let selectedText = vscode.window.activeTextEditor.document.getText(new vscode.Range(currentSelection.start, currentSelection.end));
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
		currentLanguage = languages;
		googleTranslate.translate(selectedText, currentLanguage, onTranslated);
	}
	else {
		let replaceText = vscode.workspace.getConfiguration('googleTranslateExt')['replaceText'];
		if (replaceText) {
			currentLanguage = languages[0];
			googleTranslate.translate(selectedText, currentLanguage, onTranslated);
		}
		else {
			languages.forEach((language: string) => {
				currentLanguage = language;
				googleTranslate.translate(selectedText, currentLanguage, onTranslated);
			});
		}
	}
}

function onTranslated(err: any, translation: any): void {
	if (err) {
		var error = JSON.parse(err.body);
		if (error.error.code === 400)
			vscode.window.showErrorMessage('Invalid language code - "' + currentLanguage + '". Go to user settings and edit "googleTranslateExt.languages".');
		else
			vscode.window.showErrorMessage(error.error.message);
	}
	else if (diffLanguages(translation.detectedSourceLanguage, currentLanguage)) {
		let replaceText = vscode.workspace.getConfiguration('googleTranslateExt')['replaceText'];
		if (replaceText) {
			let editor = vscode.window.activeTextEditor;
			editor.edit(replaceSelectedText.bind(translation.translatedText))
		}
		else {
			vscode.window.showInformationMessage(translation.translatedText);
		}
	}
}

function replaceSelectedText(this: typeof String, editBuilder: vscode.TextEditorEdit) {
	editBuilder.replace(new vscode.Range(currentSelection.start, currentSelection.end), this.toString());
}

function diffLanguages(detectedSourceLanguage: string, translateToLanguage: string): boolean {
	if (translateToLanguage === "iw")
		translateToLanguage = "he";
	if (detectedSourceLanguage === "iw")
		detectedSourceLanguage = "he";
	return detectedSourceLanguage !== translateToLanguage;
}

// this method is called when your extension is deactivated
export function deactivate() {
}