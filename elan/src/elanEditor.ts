import * as vscode from 'vscode';
import { getNonce } from './util';
import { getTestFrame } from './test/testFrameFunctions';
import { FileFrame } from './frames/file-frame';
import { Frame } from './frames/frame';
import { setCurrentElanFile } from './extension';


interface editorEvent {
	type: "click" | "dblclick" | "key"
	target: "frame" | "window" | "input" | "expand"
	key?: string,
	modKey? : string,
	id?: string
}

export class ElanEditorProvider implements vscode.CustomTextEditorProvider {

	public static register(context: vscode.ExtensionContext): vscode.Disposable {
		const provider = new ElanEditorProvider(context);
		const providerRegistration = vscode.window.registerCustomEditorProvider(ElanEditorProvider.viewType, provider);
		return providerRegistration;
	}

	private static readonly viewType = 'elan.elanEditor';

	private frameModel? : FileFrame;

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

		setCurrentElanFile(document);

		// Setup initial content for the webview
		webviewPanel.webview.options = {
			enableScripts: true,
		};
		webviewPanel.webview.html = this.getHtmlForWebview(webviewPanel.webview);

		if (!document.getText() && !this.frameModel){
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
				updateWebview(this.frameModel!);
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
					this.handleClick(e);
					updateWebview(this.frameModel!);
					return;
				case 'dblclick':
					this.handleDblClick(e);
					updateWebview(this.frameModel!);
					return;
				case 'key':
					this.handleKey(e);
					updateWebview(this.frameModel!);
					return;
			}
		});

		updateWebview(this.frameModel!);
	}

	private handleClick(e : editorEvent) {
		switch (e.target) {
			case 'frame' : {
				this.frameModel?.selectByID(e.id!);
				break;
			}
			case 'expand' : {
				this.frameModel?.expandByID(e.id!);
				break;
			}
		}
	}

	private handleDblClick(e : editorEvent) {
		switch (e.target) {
			case 'frame' : {
				this.frameModel?.expandCollapseByID(e.id!);
				break;
			}
		}
	}

	private handleKey(e : editorEvent) {
		switch (e.target) {
			case 'frame' : {
				this.handleFrameKey(e);
				break;
			}
		}
	}

	private handleFrameKey(e : editorEvent) {
		switch (e.key) {
			case 'Escape' : {
				this.frameModel?.deselectAll();
				break;
			}
			case '-': {
				if (e.modKey === "Control") {
					this.frameModel?.collapseByID(e.id!);
				}
				break;
			}
			case '+': {
				if (e.modKey === "Control") {
					this.frameModel?.expandByID(e.id!);
				}
				break;
			}
		}
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