'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

var googleTranslate = require('google-translate')('AIzaSyBJKuSQ6xyOq4Bjda3rsdf0n--7LU2O4I4');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	let disposable = vscode.commands.registerCommand('extension.translate', () => {
		let editor = vscode.window.activeTextEditor;
		if (!editor){
			vscode.window.showErrorMessage('Must select text to translate');
			return;
		}
		let selection = editor.selection;
		let selectedText = editor.document.getText(new vscode.Range(selection.start, selection.end));
		if (!selectedText) {
			vscode.window.showErrorMessage('Must select text to translate');
			return;
		}
		googleTranslate.translate(selectedText, 'he', (err: any, translation: any) => {
			if (err)
				vscode.window.showErrorMessage(err.body);
			else if (translation)
				vscode.window.showInformationMessage(translation.translatedText);
		});
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {
}