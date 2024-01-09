// @ts-nocheck

// Script run within the webview itself.
(function () {

	// Get a reference to the VS Code webview api.
	// We use this API to post messages back to our extension.

	// @ts-ignore
	const vscode = acquireVsCodeApi();


	const codeContainer = /** @type {HTMLElement} */ (document.querySelector('.code'));
	const debugContainer = /** @type {HTMLElement} */ (document.querySelector('.debug'));

	



	// addButtonContainer.querySelector('button').addEventListener('click', () => {
	// 	vscode.postMessage({
	// 		type: 'add'
	// 	});
	// })

	// const errorContainer = document.createElement('div');
	// document.body.appendChild(errorContainer);
	// errorContainer.className = 'error'
	// errorContainer.style.display = 'none'

	/**
	 * Render the document in the webview.
	 */
	function updateContent(/** @type {string} */ text) {
        codeContainer.innerHTML = text;

		const frames = document.getElementsByClassName('frame');

		for (var frame of frames) {
			const id = frame.id;
			frame.addEventListener('click', event => {
				const msg = { type: 'click', id: id };
				vscode.postMessage(msg);
				event.stopPropagation();
			});
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