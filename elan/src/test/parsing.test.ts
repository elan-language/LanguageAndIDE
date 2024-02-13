import assert from 'assert';
import * as vscode from 'vscode';
import { Parser, ParserFSM, ParserRule, SourceOfCodeImpl } from '../frames/parser-fsm';

suite('Parsing Tests', () => {
	vscode.window.showInformationMessage('Start all unit tests.');

	test('Basic use of RegEx', () => {
		var rgx = /^set /;
		var result = rgx.test("set a to b");
		assert.equal(result, true);
		result = rgx.test("get a to b");
		assert.equal(result, false);
 		result = rgx.test("can set a to b");
		assert.equal(result, false);
		result = rgx.test("seta to b");
		assert.equal(result, false);
		result = rgx.test("set set to b");
		assert.equal(result, true);
		
		var updated = "set a to b".replace(rgx,"");
		assert.equal(updated, "a to b");
	});

	test('FSM on set-to statement', () => {
        var source = new SourceOfCodeImpl("set fooBar to 3.141\n");
		var r1 = new ParserRule("initial", /^set /, "assignable", undefined);
		var r2 = new ParserRule("assignable", /^[a-z][A-Za-z0-9_]* /, "to", undefined);
		var r3 = new ParserRule("to", /^to /, "value", undefined);
		var r4 = new ParserRule("value", /^[0-9](.[0-9]*)?\n/, "end", undefined);
        var fsm = new ParserFSM([r1,r2,r3,r4]);
        var parser: Parser = fsm;
		while (source.hasMoreCode()) {
			parser = parser.processCode(source);
		}
		assert.equal(source.getRemainingCode(), "");
	}); 
});	



