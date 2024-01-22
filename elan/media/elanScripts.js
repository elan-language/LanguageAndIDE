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

	/**
	 * Render the document in the webview.
	 */
	function updateContent(/** @type {string} */ text) {
        codeContainer.innerHTML = text;

		const frames = document.querySelectorAll('[id]');

		for (var frame of frames) {
			const id = frame.id;
		
			frame.addEventListener('keydown', event => {
				const msg = { type: 'keyOnFrame', id: id, key: event.key };
				debug(`frame ${id } keydown ${event.key}`);
				vscode.postMessage(msg);
				event.stopPropagation();
			});

			frame.addEventListener('click', event => {
				const msg = { type: 'click', id: id };
				debug(`frame ${id } click`);
				vscode.postMessage(msg);
				event.stopPropagation();
			});

			frame.addEventListener('dblclick', event => {
				const msg = { type: 'dblclick', id: id };
				debug(`frame ${id } dblclick`);
				vscode.postMessage(msg);
				event.stopPropagation();
			});
		}

		const pluses = document.getElementsByTagName('expand');

		for (var plus of pluses) {
			const id = plus.parentElement.parentElement.id;
		
			plus.addEventListener('click', event => {
				const msg = { type: 'topclick', id: id };
				debug(`frame ${id } click`);
				vscode.postMessage(msg);
				event.stopPropagation();
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
				const msg = { type: 'keyOnInput', key: text };
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
		const msg = { type: 'click' };
		debug("window click ");
		vscode.postMessage(msg);
		event.stopPropagation();
	});

	function isArrowKey(k) {
		return k === "ArrowUp" || k === "ArrowDown" || k === "ArrowLeft" || k === "ArrowRight";
	}

	window.addEventListener('keydown', event => {

		const msg = { type: 'keyOnWindow', key: event.key};
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