import * as vscode from 'vscode';
import { getNonce, hash } from './util';
import { File } from './frames/interfaces/file';
import { ParseStatus } from './frames/parse-status';
import { isFrame, isParent } from './frames/helpers';
import { Collapsible } from './frames/interfaces/collapsible';
import { Selectable } from './frames/interfaces/selectable';
import { Frame } from './frames/interfaces/frame';
import { Uri } from 'vscode';
import { FileImpl } from './frames/file-impl';
import { CodeSourceFromString } from './frames/code-source';

interface editorEvent {
	type: "click" | "dblclick" | "key"
	target: "frame" | "window"
	key?: string,
	modKey: { control: boolean, shift: boolean, alt: boolean },
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
	private currentFileUri? : Uri;

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

		if (this.currentFileUri !== document.uri || !this.file) {
			this.file = new FileImpl(hash);
			this.file.parseFrom(new CodeSourceFromString(document.getText()));
			this.currentFileUri = document.uri;
		}

		function updateWebview(fm: File) {
			webviewPanel.webview.postMessage({
				type: 'update',
				text: fm.renderAsHtml(),
			});
		}

		function updateSource(fm: File) {

			if (fm.status() === ParseStatus.valid) {
				const source = fm.renderAsSource();

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
					updateSource(this.file!);
					return;
			}
		});

		updateWebview(this.file!);
	}

	private getAllSelected() {
		const v = this.file?.getMap().values()!;
		return [...v].filter(s => s.isSelected());
	}

	private handleClick(e: editorEvent) {
		switch (e.target) {
			case 'frame': {
				const s = this.file?.getById(e.id!);

				if (e.modKey.shift && isFrame(s)) {
					const parent = s.getParent();
					// all current selections with same parent
					const curSel = this.getAllSelected().filter(i => isFrame(i) && i.getParent() === parent);

					if (curSel.length > 0) {
						const toSelect = new Set<Selectable>();

						for (var cs of curSel) {
							const range = parent.getChildRange(cs as Frame, s);
							for (var r of range) {
								toSelect.add(r);
							}
						}

						// this should clear all other selections
						s?.select(true, false);
						// select all in range
						for (var ts of toSelect) {
							ts.select(false, true);
						}
						// select with focus clicked on frame
						s?.select(true, true);
					}
					else {
						s?.select(true, false);
					}
				}
				else {
					s?.select(true, false);
				}
				break;
			}
		}
	}

	private handleDblClick(e: editorEvent) {
		switch (e.target) {
			case 'frame': {
				const s = this.file?.getById(e.id!) as Collapsible;
				s.expandCollapse();
				break;
			}
		}
	}

	private handleKey(e: editorEvent) {
		switch (e.target) {
			case 'frame': {
				this.handleFrameKey(e);
				break;
			}
			case 'window': {
				this.handleWindowKey(e);
				break;
			}
		}
	}

	private ArrowHandler(e: editorEvent, fn: (f: Frame) => Frame) {
		const s = this.file?.getById(e.id!);
		if (isFrame(s)) {
			if (e.modKey.shift) {
				s.select(false, true);
				fn(s).select(true, true);
			}
			else {
				fn(s).select(true, false);
			}
		}
	}

	private handleFrameKey(e: editorEvent) {
		switch (e.key) {
			case 'Shift':
			case 'Control':
			case 'Alt': break; // consume
			case 'Escape': {
				const ss = this.getAllSelected();
				ss.forEach(s => s.deselect());
				break;
			}
			case 'ArrowUp': {
				this.ArrowHandler(e, f => f.getPreviousFrame());
				break;
			}
			case 'ArrowDown': {
				this.ArrowHandler(e, f => f.getNextFrame());
				break;
			}
			case 'ArrowLeft': {
				const s = this.file?.getById(e.id!);
				if (isFrame(s)) {
					const p = s.getParent();
					if (isFrame(p)) {
						p.select(true, false);
					}
				}
				break;
			}
			case 'ArrowRight': {
				const s = this.file?.getById(e.id!);
				if (isParent(s)) {
					const p = s.getFirstChild();
					p.select(true, false);
				}
				break;
			}
			case 'Home': {
				const s = this.file?.getById(e.id!);
				if (isFrame(s)) {
					s.getFirstPeerFrame().select(true, false);
				}
				break;
			}
			case 'End': {
				const s = this.file?.getById(e.id!);
				if (isFrame(s)) {
					s.getLastPeerFrame().select(true, false);
				}
				break;
			}
			case 'o': {
				if (e.modKey.control) {
					const s = this.file?.getById(e.id!) as Collapsible;
					s.expandCollapse();
					break;
				}
			}
			case 'O': {
				if (e.modKey.control) {
					this.file?.expandCollapseAll();
					break;
				}
			}
			default:
				const s = this.file?.getById(e.id!);
				s?.processKey({ key: e.key, shift: e.modKey.shift, control: e.modKey.control, alt: e.modKey.alt });
		}
	}

	private handleWindowKey(e: editorEvent) {
		switch (e.key) {
			case 'Home': {
				const g = this.file?.getFirstChild();
				g?.select(true, false);
				break;
			}
			case 'ArrowDown': {
				const g = this.file?.getFirstChild();
				g?.select(true, false);
				break;
			}
			case 'ArrowRight': {
				const g = this.file?.getFirstChild();
				g?.select(true, false);
				break;
			}
			case 'End': {
				const g = this.file?.getLastChild();
				g?.select(true, false);
				break;
			}
			case 'O': {
				if (e.modKey.control) {
					this.file?.expandCollapseAll();
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
	            <div class="elan-code" tabindex="0"></div>
				<script nonce="${nonce}" src="${scriptUri}"></script>
			</body>
			</html>`;
	}
}