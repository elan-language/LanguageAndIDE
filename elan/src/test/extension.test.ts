import * as vscode from 'vscode';
import { assertAreEqual, } from './testHelpers';
import { newFileFrame, newMainFrame } from '../frames/frame-factory';


suite('Elan Extension Frame Tests', () => {
	vscode.window.showInformationMessage('Start all tests.');

	test('Test File Frame', (done) => {
		assertAreEqual(done, "test0.html", newFileFrame);
	});

	test('Test Main Frame', (done) => {
		assertAreEqual(done, "test1.html", newMainFrame);
	});
});
