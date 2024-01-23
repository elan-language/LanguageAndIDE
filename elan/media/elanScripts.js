// @ts-nocheck

// Script run within the webview itself.
(function () {

	// Get a reference to the VS Code webview api.
	// We use this API to post messages back to our extension.

	// @ts-ignore
	const vscode = acquireVsCodeApi();

	const codeContainer = /** @type {HTMLElement} */ (document.querySelector('code'));
	const debugContainer = /** @type {HTMLElement} */ (document.querySelector('.debug'));

	const showDebug = false;

	debug("Debug: ");

	function debug (s){
		if (showDebug) {
			debugContainer.innerText = `${debugContainer.innerText}\n${s}`;
		}
	}

	function getModKey(e){
		if (e.ctrlKey){
			return "Control";
		}
		return undefined;
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
				debug(`frame ${id} keydown ${event.key}`);
				vscode.postMessage(msg);
				event.preventDefault();
				event.stopPropagation();
			});

			frame.addEventListener('click', event => {
				const msg = {
					type: 'click',
					target: "frame",
					id: id
				};
				debug(`frame ${id} click`);
				vscode.postMessage(msg);
				event.preventDefault();
				event.stopPropagation();
			});

			frame.addEventListener('dblclick', event => {
				const msg = {
					type: 'dblclick',
					target: "frame",
					id: id
				};
				debug(`frame ${id} dblclick`);
				vscode.postMessage(msg);
				event.preventDefault();
				event.stopPropagation();
			});
		}

		const pluses = document.getElementsByTagName('expand');

		for (var field of pluses) {
			const id = field.parentElement.parentElement.id;

			field.addEventListener('click', event => {
				const msg = {
					type: 'click',
					target: "expand",
					id: id
				};
				debug(`frame ${id} click`);
				vscode.postMessage(msg);
				event.preventDefault();
				event.stopPropagation();
			});
		}

		function isHidden(el) {
		    return (el.offsetParent === null);
		}
		
		var textFields = [...document.querySelectorAll(':not(.collapsed) text[tabindex]')];
		textFields = textFields.filter(e => !isHidden(e));

		for (var field of textFields) {
			const index = textFields.indexOf(field);
			const nextIndex =  index === textFields.length - 1 ? index :  index + 1;
			const previousIndex =  index === 0 ? index :  index - 1;
			const nextId = textFields[nextIndex].id;
			const previousId = textFields[previousIndex].id;
			
			field.addEventListener('keydown', event => {
				if (event.key === "Tab") {
					const msg = {
						type: 'key',
						target: "text",
						key: event.key,
						id: event.shiftKey ? previousId : nextId
					};
					debug(`frame ${nextId} tab`);
					vscode.postMessage(msg);
					event.preventDefault();
					event.stopPropagation();
				}
			});
		}

		const input = /** @type {HTMLElement} */ (document.querySelector('input.live'));

        if (input){
			input.focus();
			input.selectionStart = input.selectionEnd = input.value.length;

			debug("focus input" + input.id);
			input.addEventListener('keydown', event => {
				const text = event.key;
				debug("input ${id } keydown " + text);
				const msg = {
					type: 'key',
					target: "input",
					key: text
				};
				vscode.postMessage(msg);
				event.stopPropagation();
			});
			input.addEventListener('click', event => {
				debug("input ${id } click");
				event.stopPropagation();
			});
		}
		else {
			const selected = document.querySelector('.selected');
			if (selected) {
				selected.focus();
				debug("focus selected" + selected.id);
			}
			else {
				debug("no focus");
			}
		}
	}

	// Handle messages sent from the extension to the webview
	window.addEventListener('message', event => {
		const message = event.data; // The json data that the extension sent
		switch (message.type) {
			case 'update':
				debug("update content");
				const text = message.text;

				// Update our webview's content
				updateContent(text);

				// Then persist state information.
				// This state is returned in the call to `vscode.getState` below when a webview is reloaded.
				vscode.setState({ text });

				return;
		}
	});

	// spike new frames
	window.addEventListener('click', event => {
		const msg = {
			type: 'click',
			target: "window"
		};
		debug("window click ");
		vscode.postMessage(msg);
		event.stopPropagation();
	});

	function isArrowKey(k) {
		return k === "ArrowUp" || k === "ArrowDown" || k === "ArrowLeft" || k === "ArrowRight";
	}

	window.addEventListener('keydown', event => {

		const msg = {
			type: 'key',
			target: "window",
			key: event.key
		};
		debug(`window keydown ${event.key}`);
		vscode.postMessage(msg);
		event.stopPropagation();

		if (event.ctrlKey && isArrowKey(event.key)) {
			handleCtrlArrow(event.key);
		}
	});


	// Webviews are normally torn down when not visible and re-created when they become visible again.
	// State lets us save information across these re-loads
	const state = vscode.getState();
	if (state) {
		updateContent(state.text);
	}
}());