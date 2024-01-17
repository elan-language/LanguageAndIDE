import * as vscode from 'vscode';
import { assertAreEqual } from './testHelpers';
import { T00_emptyFile, T03_mainWithVarAndSet, T04_allGlobals } from './testFrameFunctions';

suite('Milestone 1 - Html rendering of code from model', () => {
	vscode.window.showInformationMessage('Start all tests.');

	test('Test Empty File', (done) => {
		assertAreEqual(done, "T00_emptyFile.html", T00_emptyFile);
	});
	test('Test Main With Var and Set', (done) => {
		assertAreEqual(done, "T03_mainWithVarAndSet.html", T03_mainWithVarAndSet);
	});
	test('Test All Globals', (done) => {
		assertAreEqual(done, "T04_allGlobals.html", T04_allGlobals);
	});
});
