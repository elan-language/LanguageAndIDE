import * as vscode from 'vscode';
import { assertAreEqual } from './testHelpers';
import { T00_emptyFile, T01_mainInFile } from './testFrameFunctions';

suite('Milestone 1 - Html rendering of code from model', () => {
	vscode.window.showInformationMessage('Start all tests.');

	test('Test Empty File', (done) => {
		assertAreEqual(done, "T00_emptyFile.html", T00_emptyFile);
	});

	test('Test Main In File', (done) => {
		assertAreEqual(done, "T01_mainInFile.html", T01_mainInFile);
	});
});
