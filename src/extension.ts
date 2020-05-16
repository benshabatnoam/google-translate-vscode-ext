'use strict';

import * as vscode from 'vscode';
const translateApi: (selectedText: string, configuration: {}) => Promise<any> = require("google-translate-open-api").default;
var languages: any;
var replaceText: boolean;
var translations: any[];
var selections: vscode.Selection[];
var linesCount: number;
let activeEditor: vscode.TextEditor;

export function activate(context: vscode.ExtensionContext) {
	const isShowWhatsNew = context.globalState.get('show-whats-new') ?? true;
	if (isShowWhatsNew) {
		showWhatsNew(context);
	}
	let disposable = vscode.commands.registerCommand('extension.translate', onActivate);
	context.subscriptions.push(disposable);
}

function showWhatsNew(context: vscode.ExtensionContext): void {
	const panel = vscode.window.createWebviewPanel(
		'whatsNew',
		`What's New in Google Translate`,
		vscode.ViewColumn.One,
		{}
	);
	panel.webview.html = getWebviewContent();
	panel.onDidDispose(onWhatsNewClosed.bind(null, context));
}

function onWhatsNewClosed(context: vscode.ExtensionContext) {
	context.globalState.update('show-whats-new', false);
}

function getWebviewContent() {
	return `
		<!DOCTYPE html>
		<html lang="en">
			<head>
					<meta charset="UTF-8">
					<meta name="viewport" content="width=device-width, initial-scale=1.0">
					<title>What's New in Google Translate</title>
			</head>
			<body>
				<h1 align="center">
					<br>
					<img src="https://raw.githubusercontent.com/benshabatnoam/google-translate-vscode-ext/master/assets/icons/icon.ico">
					<br>
					Google Translate
				</h1>
				<h2 align="center">Translate your code using Google Translate.</a>
				</h2>
				<p align="center">
					<a href="https://travis-ci.org/benshabatnoam/google-translate-vscode-ext"><img src="https://travis-ci.org/benshabatnoam/google-translate-vscode-ext.svg?branch=master" alt="Travis CI"></a>
					<a href="https://github.com/benshabatnoam/google-translate-vscode-ext/releases"><img src="https://img.shields.io/github/release/benshabatnoam/google-translate-vscode-ext.svg" alt="version"></a>
				</p>
				<h3 align="center">
					No need to register <i>Google Cloud Translate API</i> anymore! Translate your code totally free from today.
				</h3>
			</body>
		</html>
	`;
}

function onActivate(): void {
	if (!vscode.window.activeTextEditor) {
		vscode.window.showErrorMessage('Must select text to translate');
		return;
	}
	activeEditor = vscode.window.activeTextEditor;
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
	languages = vscode.workspace.getConfiguration('googleTranslateExt')['languages'];
	replaceText = vscode.workspace.getConfiguration('googleTranslateExt')['replaceText'];
	selections = activeEditor.selections;
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
			let range: vscode.Range = activeEditor.document.lineAt(lineNumber).range;
			if (lineNumber === firstLineNumber) {
				range = new vscode.Range(lineNumber, selection.start.character, lineNumber, range.end.character);
			} else if (lineNumber === lastLineNumber) {
				range = new vscode.Range(lineNumber, 0, lineNumber, selection.end.character);
			}
			translateSelection(range);
		}
		return;
	}
	let selectedText: string = activeEditor.document.getText(new vscode.Range(selection.start, selection.end));
	if (!languages) {
		vscode.window.showErrorMessage('Go to user settings and edit "googleTranslateExt.languages".');
		return;
	}
	if (typeof languages === "string") {
		translate(selectedText, <vscode.Selection>selection, languages);
	} else {
		const quickPick = vscode.window.createQuickPick();
		quickPick.items = languages.sort().map((label: string) => ({ label }));
		quickPick.placeholder = "Select a language...";
		quickPick.onDidAccept(() => {
			translate(selectedText, <vscode.Selection>selection, quickPick.selectedItems [0].label);
			quickPick.dispose();
		});
		quickPick.onDidHide(() => quickPick.dispose());

		quickPick.show();
	}
}

function translate(textToTranslate: string, selection: vscode.Selection, language: string): void {
	translateApi(textToTranslate, { to: language })
		.then((res: any) => {
			onTranslateSuccess(selection, language, res.data[0]);
		})
		.catch((error: Error) => {
			vscode.window.showInformationMessage(error.message);
		});
}

function onTranslateSuccess(selection: vscode.Selection, language: string, translatedText: any): void {
	if (replaceText) {
		if (selections.length + linesCount === translations.length + 1) {
			activeEditor.edit((editBuilder: vscode.TextEditorEdit) => {
				for (let i = 0; i < translations.length; i++) {
					const element = translations[i];
					editBuilder.replace(element.selection, element.translatedText);
				}
				editBuilder.replace(selection, translatedText);
			});
		} else {
			translations.push({
				'selection': selection,
				'translation': translatedText
			});
		}
	} else {
		vscode.window.showInformationMessage(translatedText);
	}
}

function showEmptyError(): void {
	vscode.window.showErrorMessage('Must select text to translate');
}

// this method is called when your extension is deactivated
export function deactivate() {
}