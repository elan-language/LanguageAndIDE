import * as vscode from 'vscode';
import { FileFrame } from '../frames/file-frame';
import { assertAreEqual, assertAreEqualByFile, wrap } from './testHelpers';
import { MainFrame } from '../frames/main-frame';

function emptyFile() {
	return new FileFrame();
}

suite('Milestone 1 - Html rendering of code from model', () => {
	vscode.window.showInformationMessage('Start all tests.');

	test('Test Empty File', (done) => {
		assertAreEqual(done, "00_emptyFile.html", emptyFile);
	});

	test('Test Main Only', (done) => {
		assertAreEqual(done, "01_mainOnly.html", () => new MainFrame());
	});
});
