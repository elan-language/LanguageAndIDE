import { editorEvent, handleClick, handleDblClick, handleKey } from "../src/editorHandlers";
import { CodeSourceFromString, FileImpl } from "../src/frames/file-impl";
import { File } from "../src/frames/interfaces/file";

var file: File;

const codeContainer = document.querySelector('.elan-code');

file = new FileImpl((s) => "", true);

const hash = window.location.hash;

if (hash) {
	const initialFile = hash.substring(1);

	fetch(initialFile)
		.then((f) => f.text())
		.then((text) => {
			const code = new CodeSourceFromString(text);
			file.parseFrom(code);
			updateContent(file.renderAsHtml());
		})
		.catch((e) => {
			console.error(e);
			updateContent(file.renderAsHtml());
		});
}
else {
	updateContent(file.renderAsHtml());
}


// Get a reference to the VS Code webview api.
// We use this API to post messages back to our extension.

// @ts-ignore
//const vscode = acquireVsCodeApi();

var doOnce = true;

function getModKey(e: KeyboardEvent | MouseEvent) {
	return { control: e.ctrlKey, shift: e.shiftKey, alt: e.altKey };
}

/**
 * Render the document in the webview.
 */
function updateContent(text: string) {
	codeContainer!.innerHTML = text;

	const frames = document.querySelectorAll('[id]');

	for (var frame of frames) {
		const id = frame.id;

		frame.addEventListener('keydown', (event: Event) => {
			const ke = event as KeyboardEvent;
			const msg: editorEvent = {
				type: 'key',
				target: "frame",
				id: id,
				key: ke.key,
				modKey: getModKey(ke)
			};
			postMessage(msg);
			event.preventDefault();
			event.stopPropagation();
		});

		frame.addEventListener('click', event => {
			const ke = event as KeyboardEvent;
			const msg: editorEvent = {
				type: 'click',
				target: "frame",
				id: id,
				modKey: getModKey(ke)
			};
			postMessage(msg);
			event.preventDefault();
			event.stopPropagation();
		});

		frame.addEventListener('mousedown', event => {
			// mousedown rather than click as click does not seem to pick up shift/ctrl click
			const me = event as MouseEvent;
			if (me.button === 0 && me.shiftKey) { // left button only
				const msg: editorEvent = {
					type: 'click',
					target: "frame",
					id: id,
					modKey: getModKey(me)
				};
				postMessage(msg);
				event.preventDefault();
				event.stopPropagation();
			}
		});

		frame.addEventListener('dblclick', event => {
			const ke = event as KeyboardEvent;
			const msg: editorEvent = {
				type: 'dblclick',
				target: "frame",
				id: id,
				modKey: getModKey(ke)
			};
			postMessage(msg);
			event.preventDefault();
			event.stopPropagation();
		});
	}

	const input = document.querySelector('.focused input') as any;
	const focused = document.querySelector('.focused') as any;
	const elanCode = document.querySelector('.elan-code') as any;

	if (doOnce) {
		doOnce = false;
		elanCode!.addEventListener('keydown', (event: Event) => {
			const ke = event as KeyboardEvent;
			const msg: editorEvent = {
				type: 'key',
				target: "window",
				key: ke.key,
				modKey: getModKey(ke)
			};
			postMessage(msg);
			event.preventDefault();
			event.stopPropagation();

		});
	}

	if (input) {
		input.setSelectionRange(input.value.length, input.value.length);
		input.focus();
	} else if (focused) {
		focused.focus();
	}
	else {
		elanCode.focus();
	}

	// debug check 
	if (document.querySelectorAll('.focused').length > 1) {
		console.warn("multiple focused");
	}
}

// Handle messages sent from the extension to the webview
window.addEventListener('message', event => {
	const message = event.data; // The json data that the extension sent
	switch (message.type) {
		case 'update':
			const text = message.text;

			// Update our webview's content
			updateContent(text);

			// Then persist state information.
			// This state is returned in the call to `vscode.getState` below when a webview is reloaded.
			//vscode.setState({ text });

			return;
	}
});

function postMessage(e: editorEvent) {
	switch (e.type) {
		case 'click':
			handleClick(e, file);
			updateContent(file.renderAsHtml());
			return;
		case 'dblclick':
			handleDblClick(e, file);
			updateContent(file.renderAsHtml());
			return;
		case 'key':
			handleKey(e, file);
			updateContent(file.renderAsHtml());
			return;
	}
}