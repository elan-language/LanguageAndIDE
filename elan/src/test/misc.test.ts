import * as vscode from 'vscode';
import { T03_mainWithAllStatements } from './model-generating-functions.';
import { assertElementHasClasses, key } from './testHelpers';
import assert from 'assert';
import { Regexes } from '../frames/fields/regexes';
import {CodeSourceFromString } from '../frames/code-source';
import { FileImpl } from '../frames/file-impl';
import { hash } from '../util';
import { DefaultProfile } from '../frames/default-profile';
import { ignore_test } from './compiler/compiler-test-helpers';

suite('Misc Tests', () => {
	vscode.window.showInformationMessage('Start all unit tests.');

	
	ignore_test('Invalid identifier', async () => {
		var file = T03_mainWithAllStatements();
		await assertElementHasClasses(file, "fileStatus", "incomplete");
		await assertElementHasClasses(file, "var3", "incomplete"); 
		file.getById("var4").processKey(key("X"));
		await assertElementHasClasses(file, "var3", "invalid");
		await assertElementHasClasses(file, "fileStatus", "invalid");
	});

	ignore_test('Valid identifier', async () => {
		var file = T03_mainWithAllStatements();
		await assertElementHasClasses(file, "fileStatus", "incomplete");
		await assertElementHasClasses(file, "var3", "incomplete"); 
		file.getById("var4").processKey(key("q"));
		await assertElementHasClasses(file, "var4", "valid");
		await assertElementHasClasses(file, "fileStatus", "incomplete"); //Because there are other incomplete fields
	});

	ignore_test('Valid variable statement', async () => {
		var file = T03_mainWithAllStatements();
		await assertElementHasClasses(file, "fileStatus", "incomplete");
		await assertElementHasClasses(file, "var3", "incomplete"); 
		file.getById("var4").processKey(key("q"));
		file.getById("expr5").processKey(key("5"));
		await assertElementHasClasses(file, "var3", "valid");
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

	
	test('parse Frames - empty file', async () => {
        var source = new CodeSourceFromString("");
		const fl = new FileImpl(hash, new DefaultProfile());
		await await fl.parseFrom(source);
		var elan = await fl.renderAsSource();
		var code = `# c86776f84624ecbc12d2eef7883c0a525c2c11b6ddcab8a3010430a7580c1ab3 Elan v0.1 valid

`;
		assert.equal(elan, code.replaceAll("\n", "\r\n"));
	}); 

});	

