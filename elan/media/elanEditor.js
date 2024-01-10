// @ts-nocheck

// Script run within the webview itself.
(function () {

	// Get a reference to the VS Code webview api.
	// We use this API to post messages back to our extension.

	// @ts-ignore
	const vscode = acquireVsCodeApi();

	const codeContainer = /** @type {HTMLElement} */ (document.querySelector('.code'));
	const debugContainer = /** @type {HTMLElement} */ (document.querySelector('.debug'));

	/**
	 * Render the document in the webview.
	 */
	function updateContent(/** @type {string} */ text) {
        codeContainer.innerHTML = text;

		const frames = document.getElementsByClassName('frame');

		for (var frame of frames) {
			const id = frame.id;
		
			frame.addEventListener('keydown', event => {
				const msg = { type: 'newFrame', id: id };
				debugContainer.innerText = "press" + event.key;
				vscode.postMessage(msg);
				event.stopPropagation();
			});

			frame.addEventListener('click', event => {
				const msg = { type: 'click', id: id };
				debugContainer.innerText = "click" + event.key;
				vscode.postMessage(msg);
				event.stopPropagation();
			});
		}

		const input = /** @type {HTMLElement} */ (document.querySelector('input.live'));

        if (input){
			input.focus();
			debugContainer.innerText = "focus input" + input.id;
			input.addEventListener('keydown', event => {
                const text = event.key;
				if (text.length === 1 || text === "Tab" || text === "Backspace") {
					const msg = { type: 'userInput', key: text };
					vscode.postMessage(msg);
				}
				event.stopPropagation();
			});
			input.addEventListener('click', event => {
				event.stopPropagation();
			});
		}
		else {
			const selected = document.querySelector('.selected');
			if (selected) {
				selected.focus();
				debugContainer.innerText = "focus selected" + selected.id;
			}
			else {
				debugContainer.innerText = "no focus";
			}
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

	// spike new frames
	window.addEventListener('click', event => {
		const msg = { type: 'newFrame' };
		vscode.postMessage(msg);
		event.stopPropagation();
	});



	function isArrowKey(k) {
		return k === "ArrowUp" || k === "ArrowDown" || k === "ArrowLeft" || k === "ArrowRight";
	}

    window.addEventListener('keydown', event => {
	
		if (event.ctrlKey && isArrowKey(event.key)){
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