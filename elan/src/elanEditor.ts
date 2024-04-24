import * as vscode from 'vscode';
import { getNonce, hash } from './util';
import { File } from './frames/interfaces/file';
import { editorEvent } from './frames/interfaces/editor-event';
import { ParseStatus } from './frames/parse-status';
import { Uri } from 'vscode';
import { FileImpl } from './frames/file-impl';
import { CodeSourceFromString } from './frames/code-source';
import { handleClick, handleDblClick, handleKey } from './editorHandlers';
import { DefaultProfile } from './frames/default-profile';

export class ElanEditorProvider implements vscode.CustomTextEditorProvider {

	public static register(context: vscode.ExtensionContext): vscode.Disposable {
		const provider = new ElanEditorProvider(context);
		const providerRegistration = vscode.window.registerCustomEditorProvider(ElanEditorProvider.viewType, provider);
		return providerRegistration;
	}

	private static readonly viewType = 'elan.elanEditor';

	private file?: File;
	private currentFileUri?: Uri;

	constructor(
		private readonly context: vscode.ExtensionContext
	) { }

	/**
	 * Called when our custom editor is opened.
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

		if (this.currentFileUri !== document.uri || !this.file) {
			this.file = new FileImpl(hash, new DefaultProfile());
			await this.file.parseFrom(new CodeSourceFromString(document.getText()));   
			this.file.deselectAll();
			this.currentFileUri = document.uri;
		}

		function updateWebview(fm: File) {
			webviewPanel.webview.postMessage({
				type: 'update',
				text: fm.renderAsHtml(),
			});
		}

		function updateSource(fm: File) {

			if (fm.parseStatus() === ParseStatus.valid) {
				fm.renderAsSource().then(source => {

					const edit = new vscode.WorkspaceEdit();

					// Just replace the entire document every time for this example extension.
					// A more complete extension should compute minimal edits instead.
					edit.replace(
						document.uri,
						new vscode.Range(0, 0, document.lineCount, 0),
						source);

					vscode.workspace.applyEdit(edit);
				});
			}
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
				updateWebview(this.file!);
			}
		});

		// Make sure we get rid of the listener when our editor is closed.
		webviewPanel.onDidDispose(() => {
			changeDocumentSubscription.dispose();
			this.file = undefined;
		});

		// Receive message from the webview.
		webviewPanel.webview.onDidReceiveMessage((e: editorEvent) => {
			switch (e.type) {
				case 'click':
					handleClick(e, this.file!);
					updateWebview(this.file!);
					return;
				case 'dblclick':
					handleDblClick(e, this.file!);
					updateWebview(this.file!);
					return;
				case 'key':
					handleKey(e, this.file!);
					updateWebview(this.file!);
					updateSource(this.file!);
					return;
			}
		});
		updateWebview(this.file!);
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
	            <div class="elan-code" tabindex="0"></div>
				<script nonce="${nonce}" src="${scriptUri}"></script>
			</body>
			</html>`;
	}
}