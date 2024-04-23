import { handleClick, handleDblClick, handleKey} from "../editorHandlers";
import { DefaultProfile } from "../frames/default-profile";
import { CodeSourceFromString, FileImpl } from "../frames/file-impl";
import { editorEvent } from "../frames/interfaces/editor-event";
import { File } from "../frames/interfaces/file";
import { Profile } from "../frames/interfaces/profile";
import { ParseStatus } from "../frames/parse-status";
import { StdLib } from "../std-lib";
import { System } from "../system";

const codeContainer = document.querySelector('.elan-code');
var file : File;
const codeFile = (<any>document.getElementsByClassName("elan-code")?.[0]).dataset.code;
var doOnce = true;

fetch("profile.json", { mode: "same-origin" })
	.then(f => f.json())
	.then(j => {
		file = new FileImpl((s) => "", j as Profile, true);
		displayFile();
	})
	.catch((e) => {
		file = new FileImpl((s) => "", new DefaultProfile(), true);
		displayFile();
	});

function displayFile() {
	if (codeFile) {
		fetch(codeFile, { mode: "same-origin" })
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
		const previousCode = localStorage.getItem("elan-code");
		if (previousCode) {
			const code = new CodeSourceFromString(previousCode);
			file.parseFrom(code);
		}

		updateContent(file.renderAsHtml());
	}
}

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
		const cursor = input.dataset.cursor as string;
		const pIndex = parseInt(cursor) as number;
		const cursorIndex = Number.isNaN(pIndex) ? input.value.length : pIndex;

		input.setSelectionRange(cursorIndex, cursorIndex);
		input.focus();
	} else if (focused) {
		focused.focus();
	}
	else {
		elanCode.focus();
	}

	if (file.parseStatus() === ParseStatus.valid){
		// save to local store
		const code = file.renderAsSource();
		localStorage.setItem("elan-code", code);
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

class ElanConsole {

	previousContent: string = "";
	currentInterval? : any;

	printLine(line : string) {
		this.previousContent = `${this.previousContent}${line}<br>`;
		consoleWindow.innerHTML = this.render();
	}

	stopReading() {
		clearInterval(this.currentInterval);
		this.previousContent = `${this.previousContent.slice(0, -48)}`;
	}

	readLine() {
		this.previousContent = `${this.previousContent}<input id = "inp" type="text" autofocus></input>`;
		consoleWindow.innerHTML = this.render();
		const inp = document.getElementById("inp") as HTMLInputElement;
		inp.focus();
		
		return new Promise<string>((rs, rj) => {
			var entered = false;
			inp.addEventListener("keydown", (k: KeyboardEvent) => {
				entered = k.key === "Enter";
			});
			this.currentInterval = setInterval(() => {
				if (entered) {
					rs(inp.value);
					this.stopReading();
					this.printLine(inp.value);
				}
			}, 250);
		});
	}

	render() {
		return `<div>${this.previousContent}</div>`;
	}

	clear() {
		this.previousContent = "";
		consoleWindow.innerHTML = this.render();
	}
}

const elanConsole = new ElanConsole();

const system = new System();
const stdlib = new StdLib();

const runButton = document.getElementById("run"); 
const clearButton = document.getElementById("clear"); 

const consoleWindow = document.getElementById("console")!;

consoleWindow.innerHTML = elanConsole.render();

function doImport(str: string) {
    const url = "data:text/javascript;base64," + btoa(str);
    return import(url);
}

function printer(s: string) {
	elanConsole.printLine(s);
}

function inputter() {
	return elanConsole.readLine();
}

runButton?.addEventListener("click", () => {
	const jsCode = file.compile();

	system.printer = printer;
	system.inputter = inputter;

	return doImport(jsCode).then(async (elan) => {
		if (elan.program) {
			elan._inject(system, stdlib);
			const main = await elan.program();
			await main();
			return system;
		}
		return undefined;
	});
});

clearButton?.addEventListener("click", () => {
	elanConsole.clear();
});




