import * as vscode from 'vscode';
import { T03_mainWithAllStatements } from './model-generating-functions.';
import { assertElementHasClasses, key } from './testHelpers';
import assert from 'assert';
import { Regexes } from '../frames/fields/regexes';
import {CodeSourceFromString } from '../frames/code-source';
import { FileImpl } from '../frames/file-impl';
import { hash } from '../util';
import { DefaultProfile } from '../frames/default-profile';

suite('Misc Tests', () => {
	vscode.window.showInformationMessage('Start all unit tests.');

	
	test('Invalid identifier', () => {
		var file = T03_mainWithAllStatements();
		assertElementHasClasses(file, "fileStatus", "incomplete");
		assertElementHasClasses(file, "var3", "incomplete"); 
		file.getById("var4").processKey(key("X"));
		assertElementHasClasses(file, "var3", "invalid");
		assertElementHasClasses(file, "fileStatus", "invalid");
	});

	test('Valid identifier', () => {
		var file = T03_mainWithAllStatements();
		assertElementHasClasses(file, "fileStatus", "incomplete");
		assertElementHasClasses(file, "var3", "incomplete"); 
		file.getById("var4").processKey(key("q"));
		assertElementHasClasses(file, "var4", "valid");
		assertElementHasClasses(file, "fileStatus", "incomplete"); //Because there are other incomplete fields
	});

	test('Valid variable statement', () => {
		var file = T03_mainWithAllStatements();
		assertElementHasClasses(file, "fileStatus", "incomplete");
		assertElementHasClasses(file, "var3", "incomplete"); 
		file.getById("var4").processKey(key("q"));
		file.getById("expr5").processKey(key("5"));
		assertElementHasClasses(file, "var3", "valid");
	});

	//Regex
	test('Test Regexes', () => { 
		assert.equal(Regexes.newLine.test(""), false);
		assert.equal(Regexes.newLine.test("\n"), true);
		assert.equal(Regexes.newLine.test("\r\n"), true);
	});

	//Code source
	
	test('code source - readToNonMatchingCloseBracket1', () => {
		var source = new CodeSourceFromString("foo, bar, yon) ");
		var read = source.readToNonMatchingCloseBracket();
		assert.equal(read, "foo, bar, yon");
		assert.equal(source.getRemainingCode(), ") ");
	});
	test('code source - readToNonMatchingCloseBracket2', () => {
		var source = new CodeSourceFromString(`"x)y" ) `);
		var read = source.readToNonMatchingCloseBracket();
		assert.equal(read, `"x)y" `);
		assert.equal(source.getRemainingCode(), ") ");
	});
	test('code source - readToNonMatchingCloseBracket3', () => {
		var source = new CodeSourceFromString(`x() ) `);
		var read = source.readToNonMatchingCloseBracket();
		assert.equal(read, `x() `);
		assert.equal(source.getRemainingCode(), ") ");
	});

	
	test('parse Frames - empty file', () => {
        var source = new CodeSourceFromString("");
		const fl = new FileImpl(hash, new DefaultProfile());
		fl.parseFrom(source);
		var elan = fl.renderAsSource();
		var code = `# c86776f84624ecbc12d2eef7883c0a525c2c11b6ddcab8a3010430a7580c1ab3 Elan v0.1 valid

`;
		assert.equal(elan, code.replaceAll("\n", "\r\n"));
	}); 

});	

