import { handleClick, handleDblClick, handleKey } from "../editorHandlers";
import { CompileError } from "../frames/compile-error";
import { DefaultProfile } from "../frames/default-profile";
import { CodeSourceFromString, FileImpl } from "../frames/file-impl";
import { editorEvent } from "../frames/interfaces/editor-event";
import { File } from "../frames/interfaces/file";
import { Profile } from "../frames/interfaces/profile";
import { ParseStatus } from "../frames/status-enums";
import { RunStatus } from "../frames/run-status";
import { StdLib } from "../std-lib";
import { System } from "../system";

const codeContainer = document.querySelector('.elan-code');
var file: File;
const codeFile = (<any>document.getElementsByClassName("elan-code")?.[0]).dataset.code;
var doOnce = true;
var profile: Profile;

async function hash(toHash: string) {
	const msgUint8 = new TextEncoder().encode(toHash); // encode as (utf-8) Uint8Array
	const hashBuffer = await crypto.subtle.digest("SHA-256", msgUint8); // hash the message
	const hashArray = Array.from(new Uint8Array(hashBuffer)); // convert buffer to byte array
	const hashHex = hashArray
		.map((b) => b.toString(16).padStart(2, "0"))
		.join(""); // convert bytes to hex string
	return hashHex;
}

function fetchProfile() {
	if (window.location.protocol === "file:") {
		const localProfile = (window as any).localProfile as Profile;
		return localProfile ? Promise.resolve(localProfile) : Promise.reject();
	}
	else {
		var scriptUrl = document.getElementsByTagName('script')[0].src;
		var scriptName = scriptUrl.split("/").slice(-1)[0].split(".")[0];
		var jsonProfile = `${scriptName}.json`;
		return fetch(jsonProfile, { mode: "same-origin" }).then(f => f.json()).then(j => j as Profile);
	}
}

function setup(p: Profile) {
	profile = p;
	file = new FileImpl(hash, profile, true);
	displayFile();
}

fetchProfile()
	.then(p => setup(p))
	.catch((e) => {
		console.warn("profile not found - using default");
		setup(new DefaultProfile());
	});

function displayFile() {
	if (codeFile) {
		fetch(codeFile, { mode: "same-origin" })
			.then((f) => f.text())
			.then((text) => {
				const code = new CodeSourceFromString(text);
				file.parseFrom(code).then(() => {
					file.renderAsHtml().then(c => updateContent(c));
				});
			})
			.catch((e) => {
				console.error(e);
				file.renderAsHtml().then(c => updateContent(c));
			});
	}
	else {
		const previousCode = localStorage.getItem("elan-code");
		const previousFileName = localStorage.getItem("elan-file");
		if (previousCode) {
			const code = new CodeSourceFromString(previousCode);
			file.parseFrom(code).then(() => {
				file.fileName = previousFileName || file.defaultFileName;
				file.renderAsHtml().then(c => updateContent(c));
			});
		}
		else {
			file.renderAsHtml().then(c => updateContent(c));
		}
	}
}

function getModKey(e: KeyboardEvent | MouseEvent) {
	return { control: e.ctrlKey, shift: e.shiftKey, alt: e.altKey };
}

function getStatus() {
	return file.getParseStatus();
}

function updateStatus() {
	(document.getElementById("code-title") as HTMLDivElement).innerText = `Program: ${file.fileName}`; // ${getStatus()}`;
	// TODO  Adding the class is wrong. It must replace existing class. So make status the only class.
	(document.getElementById("parse") as HTMLDivElement).setAttribute("class", file.getParseStatusForDashboard());
	(document.getElementById("compile") as HTMLDivElement).setAttribute("class",file.getCompileStatusForDashboard());
}


/**
 * Render the document
 */
function updateContent(text: string) {
	file.setRunStatus(RunStatus.stopped);
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
			const selection = (event.target as any)["selectionStart"] as number | undefined;
			const msg: editorEvent = {
				type: 'click',
				target: "frame",
				id: id,
				modKey: getModKey(ke),
				selection : selection
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

		frame.addEventListener('mousemove', event => {
			event.preventDefault();
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

	if (file.getParseStatus() === ParseStatus.valid) {
		// save to local store
		file.renderAsSource().then(code => {
			localStorage.setItem("elan-code", code);
			localStorage.setItem("elan-file", file.fileName);
			(document.getElementById("save") as HTMLButtonElement).classList.add("unsaved");
		});
		// compile before updating status
		file.compile();
	}

	updateStatus();

	// debug check 
	if (document.querySelectorAll('.focused').length > 1) {
		console.warn("multiple focused");
	}
}

function postMessage(e: editorEvent) {
	switch (e.type) {
		case 'click':
			handleClick(e, file);
			file.renderAsHtml().then(c => updateContent(c));
			return;
		case 'dblclick':
			handleDblClick(e, file);
			file.renderAsHtml().then(c => updateContent(c));
			return;
		case 'key':
			handleKey(e, file);
			file.renderAsHtml().then(c => updateContent(c));
			return;
	}
}

class ElanConsole {

	previousContent: string = "";
	currentInterval?: any;

	printLine(line: string) {
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

const runButton = document.getElementById("run-button");
const clearButton = document.getElementById("clear-button");
const newButton = document.getElementById("new");

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
	try {
		file.setRunStatus(RunStatus.running);
		updateStatus();
		const jsCode = file.compile();

		system.printer = printer;
		system.inputter = inputter;

		return doImport(jsCode).then(async (elan) => {
			if (elan.program) {
				elan._inject(system, stdlib);
				const main = await elan.program();
				main().then(() => {
					console.info("elan program completed OK");
					file.setRunStatus(RunStatus.stopped);
					updateStatus();
				})
					.catch((e: any) => {
						console.warn(e);
						file.setRunStatus(RunStatus.error);
						updateStatus();
					});
			}
		});
	}
	catch (e) {
		console.warn(e);
		file.setRunStatus(RunStatus.error);
		updateStatus();
	}
});

clearButton?.addEventListener("click", () => {
	elanConsole.clear();
});

newButton?.addEventListener("click", () => {
	file = new FileImpl(hash, profile, true);
	file.renderAsHtml().then(c => updateContent(c));
});

const upload = document.getElementById('load') as Element;
upload.addEventListener('click', chooser);

function chooser(event: Event) {
	var f = document.createElement('input');
	f.style.display = 'none';
	f.type = 'file';
	f.name = 'file';
	f.accept = ".elan";
	(document.getElementById("code-controls") as any).appendChild(f);
	f.addEventListener('change', handleUpload);
	f.click();
}


function handleUpload(event: Event) {

	const elanFile = (event.target as any).files?.[0] as any;

	if (elanFile) {
		const fileName = elanFile.name;
		const reader = new FileReader();
		reader.addEventListener('load', (event: any) => {
			const rawCode = event.target.result;
			const code = new CodeSourceFromString(rawCode);
			file = new FileImpl(hash, profile, true);
			file.fileName = fileName;
			file.parseFrom(code).then(() => {
				file.renderAsHtml().then(c => updateContent(c));
			});
		});
		reader.readAsText(elanFile);
	}

	event.preventDefault();
}

const download = document.getElementById('save') as Element;
download.addEventListener('click', handleDownload);

function handleDownload(event: Event) {
	var fileName = prompt("Please enter your file name", file.fileName);

	if (fileName === null) {
		// cancelled
		return;
	}

	if (!fileName) {
		fileName = file.defaultFileName;
	}

	if (!fileName.endsWith(".elan")) {
		fileName = fileName + ".elan";
	}

	file.fileName = fileName;
	file.renderAsSource().then(code => {
		const blob = new Blob([code], { type: 'plain/text' });

		const aElement = document.createElement('a');
		aElement.setAttribute('download', fileName!);
		const href = URL.createObjectURL(blob);
		aElement.href = href;
		aElement.setAttribute('target', '_blank');
		aElement.click();
		URL.revokeObjectURL(href);
		(download as HTMLButtonElement).classList.remove("unsaved");
		event.preventDefault();
		file.renderAsHtml().then(c => updateContent(c));
	});
}