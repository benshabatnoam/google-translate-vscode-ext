'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	let disposable = vscode.commands.registerCommand('extension.translate', () => {
		let editor = vscode.window.activeTextEditor;
		if (!editor) {
			vscode.window.showErrorMessage('Must select text to translate');
			return;
		}
		let selection = editor.selection;
		let selectedText = editor.document.getText(new vscode.Range(selection.start, selection.end));
		if (!selectedText) {
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
			googleTranslate.translate(selectedText, languages, onTranslated.bind(languages));
		} else {
			languages.forEach((language: string) => {
				googleTranslate.translate(selectedText, language, onTranslated.bind(language));
			});
		}
	});
	context.subscriptions.push(disposable);
}

function onTranslated(this: typeof String, err: any, translation: any): void {
	if (err) {
		var error = JSON.parse(err.body);
		if (error.error.code === 400)
			vscode.window.showErrorMessage('Invalid language code - "' + this + '". Go to user settings and edit "googleTranslateExt.languages".');
		else
			vscode.window.showErrorMessage(error.error.message);
	}
	else if (diffLanguages(translation.detectedSourceLanguage, this.toString())) {
		vscode.window.showInformationMessage(translation.translatedText);
	}
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