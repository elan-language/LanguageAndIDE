// @ts-nocheck

// Script run within the webview itself.
(function () {

	// Get a reference to the VS Code webview api.
	// We use this API to post messages back to our extension.

	// @ts-ignore
	const vscode = acquireVsCodeApi();

	const codeContainer = /** @type {HTMLElement} */ (document.querySelector('.elan-code'));

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
				vscode.postMessage(msg);
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
				vscode.postMessage(msg);
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
					vscode.postMessage(msg);
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
				vscode.postMessage(msg);
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
					vscode.postMessage(msg);
					event.preventDefault();
					event.stopPropagation();
				}
			});
		}

		const input = document.querySelector('.focused > input');
		const focused = document.querySelector('.focused');
		const elanCode = document.querySelector('.elan-code');

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
				vscode.setState({ text });

				return;
		}
	});

	// Webviews are normally torn down when not visible and re-created when they become visible again.
	// State lets us save information across these re-loads
	const state = vscode.getState();
	if (state) {
		updateContent(state.text);
	}
}());