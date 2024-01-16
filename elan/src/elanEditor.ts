import * as vscode from 'vscode';
import { getNonce } from './util';
import { getTestFrame } from './test/testFrameFunctions';
import { FileFrame } from './frames/file-frame';
import { Frame } from './frames/frame';


interface editorEvent {
	type: "click" | "keyOnInput" | "keyOnFrame",
	key?: string,
	id?: string
}

export class ElanEditorProvider implements vscode.CustomTextEditorProvider {

	public static register(context: vscode.ExtensionContext): vscode.Disposable {
		const provider = new ElanEditorProvider(context);
		const providerRegistration = vscode.window.registerCustomEditorProvider(ElanEditorProvider.viewType, provider);
		return providerRegistration;
	}

	private static readonly viewType = 'elan.elanEditor';

	private frameModel : Frame = new FileFrame();

	constructor(
		private readonly context: vscode.ExtensionContext
	) { }

	/**
	 * Called when our custom editor is opened.
	 * 
	 * 
	 */
	public async resolveCustomTextEditor(
		document: vscode.TextDocument,
		webviewPanel: vscode.WebviewPanel,
		_token: vscode.CancellationToken
	): Promise<void> {
		// Setup initial content for the webview
		webviewPanel.webview.options = {
			enableScripts: true,
		};
		webviewPanel.webview.html = this.getHtmlForWebview(webviewPanel.webview);

		if (!document.getText()){
			const name = document.fileName;
			const arr = name.split("\\");
			const fn = arr[arr.length -1].split(".")[0];
	
			this.frameModel = getTestFrame(fn);
		}

		

		function updateWebview(fm : Frame) {
			webviewPanel.webview.postMessage({
				type: 'update',
				text: fm.renderAsHtml(),
			});
		}

		// Hook up event handlers so that we can synchronize the webview with the text document.
		//
		// The text document acts as our model, so we have to sync change in the document to our
		// editor and sync changes in the editor back to the document.
		// 
		// Remember that a single text document can also be shared between multiple custom
		// editors (this happens for example when you split a custom editor)

		const changeDocumentSubscription = vscode.workspace.onDidChangeTextDocument(e => {
			if (e.document.uri.toString() === document.uri.toString()) {
				updateWebview(this.frameModel);
			}
		});

		// Make sure we get rid of the listener when our editor is closed.
		webviewPanel.onDidDispose(() => {
			changeDocumentSubscription.dispose();
		});

		// Receive message from the webview.
		webviewPanel.webview.onDidReceiveMessage((e: editorEvent) => {
			switch (e.type) {
				case 'click':
					if (e.id) {
						this.click(e.id);
					}
					else {
						this.newFrame();
					}
					updateWebview(this.frameModel);
					return;
				case 'keyOnFrame':
					this.newFrame(e.id);
					updateWebview(this.frameModel);
					return;
				case 'keyOnInput':
					this.userInput(e.key!);
					updateWebview(this.frameModel);
					return;
			}
		});

		updateWebview(this.frameModel);
	}

	private click(id: string) {
		//this.frameModel.select(id, "");
	}

	private newFrame(id?: string) {
		//this.frameModel.newFrame(id);
	}

	private userInput(key: string) {
		//this.frameModel.userInput(key);
	}

	/**
	 * Get the static html used for the editor webviews.
	 */
	private getHtmlForWebview(webview: vscode.Webview): string {
		// Local path to script and css for the webview
		const scriptUri = webview.asWebviewUri(vscode.Uri.joinPath(
			this.context.extensionUri, 'media', 'elanScripts.js'));

		const styleMainUri = webview.asWebviewUri(vscode.Uri.joinPath(
			this.context.extensionUri, 'media', 'elanStyle.css'));

		// Use a nonce to whitelist which scripts can be run
		const nonce = getNonce();

		return /* html */`
			<!DOCTYPE html>
			<html lang="en">
			<head>
				<meta charset="UTF-8">

				<!--
				Use a content security policy to only allow loading images from https or from our extension directory,
				and only allow scripts that have a specific nonce.
				-->
				<meta http-equiv="Content-Security-Policy" content="default-src 'none'; img-src ${webview.cspSource}; style-src ${webview.cspSource}; script-src 'nonce-${nonce}';">

				<meta name="viewport" content="width=device-width, initial-scale=1.0">

				<link href="${styleMainUri}" rel="stylesheet" />

				<title>Elan Editor</title>
			</head>
			<body>
				<code></code>
				<div class="debug"></div>
				<script nonce="${nonce}" src="${scriptUri}"></script>
			</body>
			</html>`;
	}
}