'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

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
		if (!selectedText)		
			vscode.window.showErrorMessage('Must select text to translate');
		vscode.window.showInformationMessage(selectedText);
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {
}