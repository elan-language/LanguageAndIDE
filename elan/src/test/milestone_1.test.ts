import * as vscode from 'vscode';
import { assertAreEqual } from './testHelpers';
import { T00_emptyFile, T01_mainOnly, T02_mainInFile } from './testFrameFunctions';

suite('Milestone 1 - Html rendering of code from model', () => {
	vscode.window.showInformationMessage('Start all tests.');

	test('Test Empty File', (done) => {
		assertAreEqual(done, "T00_emptyFile.html", T00_emptyFile);
	});

	test('Test Main Only', (done) => {
		assertAreEqual(done, "T01_mainOnly.html", T01_mainOnly);
	});

	test('Test Main In File', (done) => {
		assertAreEqual(done, "T02_mainInFile.html", T02_mainInFile);
	});
});
