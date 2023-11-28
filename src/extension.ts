import * as vscode from 'vscode';

// This method is called when the extension is activated
export function activate(context: vscode.ExtensionContext) {

	// to make sure the extension is active
	console.log('Auto Code Active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('auto-code', () => {

		// Display a message box to the user
		vscode.window.showInformationMessage('Auto Code is now active!');
	});

	context.subscriptions.push(disposable);
}

// This method is called when the extension is deactivated
export function deactivate() {}
