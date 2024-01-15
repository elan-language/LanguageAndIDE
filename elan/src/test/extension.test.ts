import * as vscode from 'vscode';
import { FileFrame } from '../frames/file-frame';
import { assertAreEqual, assertAreEqualByFile, wrap } from './testHelpers';
import { MainFrame } from '../frames/main-frame';


suite('Elan Extension Frame Tests', () => {
	vscode.window.showInformationMessage('Start all tests.');

	test('Test File Frame', (done) => {
		assertAreEqual(done, "test0.html", () => new FileFrame());
	});

	test('Test Main Frame', (done) => {
		assertAreEqual(done, "test1.html", () => new MainFrame());
	});
});
