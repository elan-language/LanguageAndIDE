import * as vscode from 'vscode';
import { getNonce } from './util';
import { getTestFrame } from './test/milestone_1.functions.';
import { File } from './frames/interfaces/file';
import { setCurrentElanFile } from './extension';
import { ParsingStatus } from './frames/parsing-status';


interface editorEvent {
	type: "click" | "dblclick" | "key"
	target: "frame" | "window" | "input" | "expand" | "text"
	key?: string,
	modKey?: "Control" | "Shift",
	id?: string
}

interface editorEvent {
	type: "click" | "dblclick" | "key"
	target: "frame" | "window" | "input" | "expand" | "text"
	key?: string,
	modKey?: "Control" | "Shift",
	id?: string
}


export class ElanEditorProvider implements vscode.CustomTextEditorProvider {

	public static register(context: vscode.ExtensionContext): vscode.Disposable {
		const provider = new ElanEditorProvider(context);
		const providerRegistration = vscode.window.registerCustomEditorProvider(ElanEditorProvider.viewType, provider);
		return providerRegistration;
	}

	private static readonly viewType = 'elan.elanEditor';

	private file?: File;
	private currentSource = "";
	private currentFile = "";

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

		if (this.currentFile !== document.fileName || !this.file) {
			const name = document.fileName;
			const arr = name.split("\\");
			const fn = arr[arr.length - 1].split(".")[0];

			this.file = getTestFrame(fn);
			this.currentSource = this.file!.renderAsSource();
			this.currentFile = document.fileName;
		}

		function updateWebview(fm: File) {
			webviewPanel.webview.postMessage({
				type: 'update',
				text: fm.renderAsHtml(),
			});
		}

		function updateSource(fm: File, currentSource: string) {

			if (fm.status() === ParsingStatus.valid) {
				const source = fm.renderAsSource();
				if (currentSource !== source) {

					const edit = new vscode.WorkspaceEdit();

					// Just replace the entire document every time for this example extension.
					// A more complete extension should compute minimal edits instead.
					edit.replace(
						document.uri,
						new vscode.Range(0, 0, document.lineCount, 0),
						source);

					vscode.workspace.applyEdit(edit);
				}
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
			this.currentSource = "";
		});

		// Receive message from the webview.
		webviewPanel.webview.onDidReceiveMessage((e: editorEvent) => {
			switch (e.type) {
				case 'click':
					this.handleClick(e);
					updateWebview(this.file!);
					return;
				case 'dblclick':
					this.handleDblClick(e);
					updateWebview(this.file!);
					return;
				case 'key':
					this.handleKey(e);
					updateWebview(this.file!);
					updateSource(this.file!, this.currentSource);
					return;
			}
		});

		updateWebview(this.file!);
	}

	private handleClick(e: editorEvent) {
		switch (e.target) {
			case 'frame': {
				this.file?.getById(e.id!).select(true, e.modKey === "Shift");
				break;
			}
		}
	}

	private handleDblClick(e: editorEvent) {
		throw new Error("Not implemented");
		switch (e.target) {
/* 			case 'frame': {
				this.file?.expand{CollapseByID(e.id!)};
				break;
			}
			case 'expand': {
				this.file?.expandByID(e.id!);
				break;
			} */
		}
	}

	private handleKey(e: editorEvent) {
		switch (e.target) {
			case 'frame': {
				this.handleFrameKey(e);
				break;
			}
			case 'text': {
				this.handleTextKey(e);
				break;
			}
			case 'window': {
				this.handleWindowKey(e);
				break;
			}
		}
	}

	private handleFrameKey(e: editorEvent) {
		throw new Error("Not implemented");
		switch (e.key) {
		/* 	case 'Escape': {
				this.file?.deselectAll();
				break;
			}
			case 'ArrowUp': {
				this.file?.selectPreviousPeerByID(e.id!, e.modKey === "Shift");
				break;
			}
			case 'ArrowDown': {
				this.file?.selectNextPeerByID(e.id!, e.modKey === "Shift");
				break;
			}
			case 'ArrowLeft': {
				this.file?.selectParentByID(e.id!);
				break;
			}
			case 'ArrowRight': {
				this.file?.selectFirstChildByID(e.id!);
				break;
			}
			case 'Home': {
				this.file?.selectFirstByID(e.id!);
				break;
			}
			case 'End': {
				this.file?.selectLastByID(e.id!);
				break;
			}
			case 'Tab': {
				this.file?.selectNextTextByID(e.id!);
				break;
			}
			case 'o': {
				if (e.modKey === "Control") {
					this.file?.expandCollapseByID(e.id!);
				}
				break;
			}
			case 'O': {
				if (e.modKey === "Control") {
					this.file?.expandCollapseAllByID(e.id!);
				}
				break;
			} */
		}
	}

	private handleTextKey(e: editorEvent) {
		throw new Error("Not implemented");
/* 		switch (e.key) {
			case 'Tab': {
				this.file?.selectByID(e.id!, false);
				break;
			}
			default:
				this.file?.handleInput(e.id!, e.key!);
		} */
	}	

	private handleWindowKey(e: editorEvent) {
		throw new Error("Not implemented");
	/* 	switch (e.key) {
			case 'Home': {
				this.file?.selectFirst();
				break;
			}
			case 'ArrowDown': {
				this.file?.selectFirst();
				break;
			}
			case 'ArrowRight': {
				this.file?.selectFirst();
				break;
			}
			case 'End': {
				this.file?.selectLast();
				break;
			}
			case 'O': {
				if (e.modKey === "Control") {
					this.file?.expandCollapseAll();
				}
				break;
			}
		} */
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