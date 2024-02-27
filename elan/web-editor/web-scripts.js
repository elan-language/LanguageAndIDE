// @ts-nocheck

// Script run within the webview itself.
(function () {

	var file;

	function isFrame(f) {
		return !!f && 'isFrame' in f;
	}
	
	function isParent(f) {
		return !!f && 'isParent' in f;
	}

	const codeContainer = /** @type {HTMLElement} */ (document.querySelector('.elan-code'));

	import("./web-editor.js").then(editor => {
		file = new editor.FileImpl((s) => "", true);

		const elanLines = codeContainer.getElementsByClassName("elanSource");
		var elanCode = "";

		for (var e of elanLines){
			elanCode = elanCode + "\r\n" + e.innerText;
		}

		elanCode = elanCode.trim();
		if (elanCode) {
			const code = new editor.CodeSourceFromString(elanCode);
			file.parseFrom(code);
		}

		updateContent(file.renderAsHtml());
	});

	// Get a reference to the VS Code webview api.
	// We use this API to post messages back to our extension.

	// @ts-ignore
	//const vscode = acquireVsCodeApi();

	
	

	var doOnce = true;

	function getModKey(e) {
		return { control: e.ctrlKey, shift: e.shiftKey, alt: e.altKey };
	}

	/**
	 * Render the document in the webview.
	 */
	function updateContent(/** @type {string} */ text) {
		codeContainer.innerHTML = text;

		const frames = document.querySelectorAll('[id]');

		for (var frame of frames) {
			const id = frame.id;

			frame.addEventListener('keydown', event => {
				const msg = {
					type: 'key',
					target: "frame",
					id: id,
					key: event.key,
					modKey: getModKey(event)
				};
				postMessage(msg);
				event.preventDefault();
				event.stopPropagation();
			});

			frame.addEventListener('click', event => {
				const msg = {
					type: 'click',
					target: "frame",
					id: id,
					modKey: getModKey(event)
				};
				postMessage(msg);
				event.preventDefault();
				event.stopPropagation();
			});

			frame.addEventListener('mousedown', event => {
				// mousedown rather than click as click does not seem to pick up shift/ctrl click
				if (event.button === 0 && event.shiftKey) { // left button only
					const msg = {
						type: 'click',
						target: "frame",
						id: id,
						modKey: getModKey(event)
					};
					postMessage(msg);
					event.preventDefault();
					event.stopPropagation();
				}
			});

			frame.addEventListener('dblclick', event => {
				const msg = {
					type: 'dblclick',
					target: "frame",
					id: id,
					modKey: getModKey(event)
				};
				postMessage(msg);
				event.preventDefault();
				event.stopPropagation();
			});
		}

		function isVsCodeTaskOrCommand(event) {
			if (event.altKey && event.key === "B") {
				return true;
			}
			if (event.ctrlKey && event.key === "B") {
				return true;
			}
			if (event.ctrlKey && event.key === "P") {
				return true;
			}
			return false;
		}

		const input = document.querySelector('.focused input');
		const focused = document.querySelector('.focused');
		const elanCode = document.querySelector('.elan-code');

		if (doOnce) {
			doOnce = false;
			elanCode.addEventListener('keydown', event => {
				if (!isVsCodeTaskOrCommand(event)) {
					const msg = {
						type: 'key',
						target: "window",
						key: event.key,
						modKey: getModKey(event)
					};
					postMessage(msg);
					event.preventDefault();
					event.stopPropagation();
				}
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

	function postMessage(e) {
		switch (e.type) {
			case 'click':
				handleClick(e);
				updateContent(file.renderAsHtml());
				return;
			case 'dblclick':
				handleDblClick(e);
				updateContent(file.renderAsHtml());
				return;
			case 'key':
				handleKey(e);
				updateContent(file.renderAsHtml());
				return;
		}
	}

	function getAllSelected() {
		const v = file.getMap().values();
		return [...v].filter(s => s.isSelected());
	}

    function handleClick(e) {
		switch (e.target) {
			case 'frame': {
				const s = file?.getById(e.id);

				if (e.modKey.shift && isFrame(s)) {
					const parent = s.getParent();
					// all current selections with same parent
					const curSel = getAllSelected().filter(i => isFrame(i) && i.getParent() === parent);

					if (curSel.length > 0) {
						const toSelect = new Set();

						for (var cs of curSel) {
							const range = parent.getChildRange(cs, s);
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

	function handleDblClick(e) {
		switch (e.target) {
			case 'frame': {
				const s = file?.getById(e.id);
				s.expandCollapse();
				break;
			}
		}
	}

	function handleKey(e) {
		switch (e.target) {
			case 'frame': {
				handleFrameKey(e);
				break;
			}
			case 'window': {
				handleWindowKey(e);
				break;
			}
		}
	}

	function ArrowHandler(e, fn) {
		const s = file?.getById(e.id);
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

	function handleFrameKey(e) {
		switch (e.key) {
			case 'Shift':
			case 'Control':
			case 'Alt': break; // consume
			case 'Escape': {
				const ss = getAllSelected();
				ss.forEach(s => s.deselect());
				break;
			}
			case 'ArrowUp': {
				ArrowHandler(e, f => f.getPreviousFrame());
				break;
			}
			case 'ArrowDown': {
				ArrowHandler(e, f => f.getNextFrame());
				break;
			}
			case 'ArrowLeft': {
				const s = file?.getById(e.id);
				if (isFrame(s)) {
					const p = s.getParent();
					if (isFrame(p)) {
						p.select(true, false);
					}
				}
				break;
			}
			case 'ArrowRight': {
				const s = file?.getById(e.id);
				if (isParent(s)) {
					const p = s.getFirstChild();
					p.select(true, false);
				}
				break;
			}
			case 'Home': {
				const s = file?.getById(e.id);
				if (isFrame(s)) {
					s.getFirstPeerFrame().select(true, false);
				}
				break;
			}
			case 'End': {
				const s = file?.getById(e.id);
				if (isFrame(s)) {
					s.getLastPeerFrame().select(true, false);
				}
				break;
			}
			case 'o': {
				if (e.modKey.control) {
					const s = file?.getById(e.id);
					s.expandCollapse();
					break;
				}
			}
			case 'O': {
				if (e.modKey.control) {
					file?.expandCollapseAll();
					break;
				}
			}
			default:
				const s = file?.getById(e.id);
				s?.processKey({ key: e.key, shift: e.modKey.shift, control: e.modKey.control, alt: e.modKey.alt });
		}
	}

	function handleWindowKey(e) {
		switch (e.key) {
			case 'Home': {
				const g = file?.getFirstChild();
				g?.select(true, false);
				break;
			}
			case 'ArrowDown': {
				const g = file?.getFirstChild();
				g?.select(true, false);
				break;
			}
			case 'ArrowRight': {
				const g = file?.getFirstChild();
				g?.select(true, false);
				break;
			}
			case 'End': {
				const g = file?.getLastChild();
				g?.select(true, false);
				break;
			}
			case 'O': {
				if (e.modKey.control) {
					file?.expandCollapseAll();
				}
				break;
			}
		}
	}

	// Webviews are normally torn down when not visible and re-created when they become visible again.
	// State lets us save information across these re-loads
	// const state = vscode.getState();
	// if (state) {
	// 	updateContent(state.text);
	// }
}());