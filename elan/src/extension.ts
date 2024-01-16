// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as https from 'https';
import { ElanEditorProvider } from './elanEditor';
import { parse as parseUrl } from 'url';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "elan" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('elan.helloWorld', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from Elan!');
	});

	context.subscriptions.push(disposable);

	context.subscriptions.push(disposable);

	context.subscriptions.push(ElanEditorProvider.register(context));

	//downloadCompiler("https://ci.appveyor.com/api/buildjobs/n92p586rw7dddsg6/artifacts/Compiler%2Fbin%2FDebug%2Fbc.zip");
}

// This method is called when your extension is deactivated
export function deactivate() {}

function downloadCompiler(urlString : string) {

	const url = parseUrl(urlString);

	const options: https.RequestOptions = {
		host: url.hostname,
		port: url.port,
		path: url.path,
		method: 'GET'
    };

	const req = https.request(options, (response) => {
		if (response.statusCode === 301 || response.statusCode === 302) {
			// Redirect - download from new location
			if (response.headers.location === undefined) {
			
				console.warn(`Failed to download from appveyor. Redirected without location header`);
				
				return;
			}
			return downloadCompiler(response.headers.location);
		} else if (response.statusCode !== 200) {
			// Download failed - print error message
			console.warn(`Failed to download from appveyor. Error code '${response.statusCode}')`);
			return; // Known to exist because this is from a ClientRequest
		}

		if (response.headers['content-length'] === undefined) {
			console.warn(`Failed to download from appveyor. No content-length header`);
			return;
		}

		// Downloading - hook up events
		const packageSize = parseInt(response.headers['content-length'], 10);
		let downloadedBytes = 0;
		let downloadPercentage = 0;

		//eventStream.post(new DownloadSizeObtained(packageSize));

		response.on('data', (data) => {
			downloadedBytes += data.length;
			//buffers.push(data);

			// Update status bar item with percentage
			// const newPercentage = Math.ceil(100 * (downloadedBytes / packageSize));
			// if (newPercentage !== downloadPercentage) {
			// 	downloadPercentage = newPercentage;
			// 	//eventStream.post(new DownloadProgress(downloadPercentage, description));
			// }
		});

		response.on('end', () => {
			//resolve(Buffer.concat(buffers));
		});

		response.on('error', (err) => {
			// reject(
			// 	new NestedError(
			// 		`Failed to download from ${urlString}. Error Message: ${err.message} || 'NONE'}`,
			// 		err
			// 	)
			// );
		});
	}); 

	req.on('error', function(e) {
		console.log('problem with request: ' + e.message);
	  });

	req.end();
}

