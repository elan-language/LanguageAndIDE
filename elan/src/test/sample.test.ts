import * as vscode from 'vscode';
import assert from 'assert';

suite('Sample Tests', () => {
	vscode.window.showInformationMessage('Start all tests.');

	test('Placeholder for new tests', () => {
		assert.deepStrictEqual(1, 1);
	});
});
