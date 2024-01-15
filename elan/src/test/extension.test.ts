import * as assert from 'assert';

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode';
import { FileFrame } from '../frames/file-frame';
// import * as myExtension from '../../extension';

suite('Extension Test Suite', () => {
	vscode.window.showInformationMessage('Start all tests.');

	test('Sample test', () => {
		assert.strictEqual(-1, [1, 2, 3].indexOf(5));
		assert.strictEqual(-1, [1, 2, 3].indexOf(0));
	});

	test('Test file', (done) => {
        vscode.workspace.openTextDocument("C:\\GitHub\\IDE\\elan\\src\\test\\test0.elan").then((fe) => {
			vscode.workspace.openTextDocument("C:\\GitHub\\IDE\\elan\\src\\test\\test0.html").then((fh) => {
				var model = new FileFrame(fe.getText());
				var html = model.renderAsHtml();

				done(assert.strictEqual(html, fh.getText()));
			} );
		} );
	});
});
