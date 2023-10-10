// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

import { runNpmCli } from 'npm-in-browser';
import { Uri } from 'vscode';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "vsc-web-tool" is now active in the web extension host!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('vsc-web-tool.helloWorld', async () => {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from vsc-web-tool in a web extension host!');

		await runNpmCli(["install", "react", "react-dom"], {
			// Here we use memfs but anything compatible with Node.js fs can be used
			fs: vscode.workspace.fs,
			cwd: "/home/web/app",
			stdout: (chunk) => {
				console.log("stdout", chunk);
			},
			stderr: (chunk) => {
				console.log("stderr", chunk);
			},
			timings: {
				start(name) {
					console.log("START: " + name);
				},
				end(name) {
					console.log("END: " + name);
				},
			},
		});

		// This should print the contents of package.json of react
		console.log(
			await vscode.workspace.fs.readFile(Uri.file("/home/web/app/node_modules/react/package.json")),
		);

	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() { }
