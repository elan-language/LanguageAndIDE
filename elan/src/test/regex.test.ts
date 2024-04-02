import assert from 'assert';
import * as vscode from 'vscode';
import { Regexes } from '../frames/fields/regexes';

suite('Regex Tests', () => {
	vscode.window.showInformationMessage('Start all unit tests.');

	
	test('parse functions - all Regexes', () => { 
		assert.equal(Regexes.newLine.test(""), false);
		assert.equal(Regexes.newLine.test("\n"), true);
		assert.equal(Regexes.newLine.test("\r\n"), true);

		
}); 

});
