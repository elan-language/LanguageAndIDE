import { handleClick, handleDblClick, handleKey} from "../editorHandlers";
import { CodeSourceFromString, FileImpl } from "../frames/file-impl";
import { editorEvent } from "../frames/interfaces/editor-event";
import { File } from "../frames/interfaces/file";

const codeContainer = document.querySelector('.elan-code');
var file : File = new FileImpl((s) => "", true);
//const codeFile = (<any>document.getElementsByClassName("elan-code")?.[0]).dataset.code;
var doOnce = true;

// if (codeFile) {
// 	const req = new XMLHttpRequest();
// 	req.addEventListener("load", (r : any) => {
// 		const code = new CodeSourceFromString(r.currentTarget.responseText);
// 		file.parseFrom(code);
// 		updateContent(file.renderAsHtml());
// 	});
// 	req.open("GET", codeFile);
// 	req.send();
// }
// else {
// 	updateContent(file.renderAsHtml());
// }

function getModKey(e: KeyboardEvent | MouseEvent) {
	return { control: e.ctrlKey, shift: e.shiftKey, alt: e.altKey };
}

/**
 * Render the document
 */
function updateContent(text: string) {
	doOnce = doOnce === undefined || doOnce ? true : false;

	codeContainer!.innerHTML = text;

	const frames = document.querySelectorAll('.elan-code [id]');

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

	const input = document.querySelector('.focused input') as HTMLInputElement;
	const focused = document.querySelector('.focused') as HTMLUnknownElement;
	const elanCode = document.querySelector('.elan-code') as HTMLDivElement;

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