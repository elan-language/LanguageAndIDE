import * as assert from 'assert';

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode';
import { FileFrame } from '../frames/file-frame';
// import * as myExtension from '../../extension';

function wrap(html : string) {
	return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link href="..\\..\\media\\elanStyle.css" rel="stylesheet" />
<title>Elan Editor</title>
</head>
<body>
<div class="code">${html}</div>
</body>
</html>`;
}


suite('Extension Test Suite', () => {
	vscode.window.showInformationMessage('Start all tests.');

	test('Sample test', () => {
		assert.strictEqual(-1, [1, 2, 3].indexOf(5));
		assert.strictEqual(-1, [1, 2, 3].indexOf(0));
	});

	test('Test file model ', (done) => {
        
		var ws = vscode.workspace.workspaceFolders![0].uri;

		var elanUri = vscode.Uri.joinPath(ws, 'test0.elan');
		var htmlUri = vscode.Uri.joinPath(ws, 'test0.html');

		vscode.workspace.openTextDocument(elanUri).then((fe) => {
			vscode.workspace.openTextDocument(htmlUri).then((fh) => {
				const model = new FileFrame(fe.getText());
				const actualHtml = wrap(model.renderAsHtml()).replaceAll("\r", "");
				const expectedHtml = fh.getText().replaceAll("\r", "");

				done(assert.strictEqual(actualHtml, expectedHtml));
			} );
		} );
	});

	test('Open file in editor', (done) => {
        
		var ws = vscode.workspace.workspaceFolders![0].uri;

		var elanUri = vscode.Uri.joinPath(ws, 'test1.elan');
		
		vscode.workspace.openTextDocument(elanUri).then((fe) => {
			vscode.commands.executeCommand('vscode.openWith', elanUri, 'elan.elanEditor', 1).then(e => {
				done();
			});
		} );
	});
});
