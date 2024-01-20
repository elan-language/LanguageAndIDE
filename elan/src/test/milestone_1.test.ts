import * as vscode from 'vscode';
import { assertAreEqual } from './testHelpers';
import { T00_emptyFile, T03_mainWithAllStatements, T04_allGlobals, T05_snake, T06_mergeSort } from './testFrameFunctions';

suite('Milestone 1 - Html rendering of code from model', () => {
	vscode.window.showInformationMessage('Start all tests.');

	test('Test Empty File', (done) => {
		assertAreEqual(done, "T00_emptyFile.html", T00_emptyFile);
	});
	test('Test Main With All Statements', (done) => {
		assertAreEqual(done, "T03_mainWithAllStatements.html", T03_mainWithAllStatements);
	});
	test('Test All Globals', (done) => {
		assertAreEqual(done, "T04_allGlobals.html", T04_allGlobals);
	});
	test('Test Snake', (done) => {
		assertAreEqual(done, "T05_snake.html", T05_snake);
	});
	test('Test Merge Sort', (done) => {
		assertAreEqual(done, "T06_mergeSort.html", T06_mergeSort);
	});
});
