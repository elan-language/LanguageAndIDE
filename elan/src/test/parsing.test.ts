import assert from 'assert';
import * as vscode from 'vscode';
import { Parser, ParserFSM, ParserRule, SourceOfCode, SourceOfCodeImpl } from '../frames/parser-fsm';

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
		var r4 = new ParserRule("value", /^[0-9](.[0-9]*)?/, "eol", undefined);
		var r5 = new ParserRule("eol", /^\n/, ParserFSM.finished, undefined);
        var fsm = new ParserFSM([r1,r2,r3,r4,r5]);
        var parser: Parser = fsm;
        parser.parseAsMuchAsPoss(source);
		assert.equal(source.getRemainingCode(), "");
	}); 

 	test('FSM with separate Parser for Identifier', () => {
		class IdParser implements Parser {

			parseAsMuchAsPoss(source: SourceOfCode) {
				var rgx = /^[a-z][A-Za-z0-9_]*/;
				var isMatch = source.matches(rgx);
				if (isMatch) {
					source.removeMatch(rgx);
				} else {
					throw new Error(`Code ${source.getRemainingCode()} does not match ${rgx}`);
				}
			}
			isFinished(): boolean {
				return false;
			}
		}
		var idParser = new IdParser(); 
        var source = new SourceOfCodeImpl("set fooBar to 3.141\n");
		var r1 = new ParserRule("initial", /^set /, "to", idParser);
		var r2 = new ParserRule("to", /^ to /, "value", undefined);
		var r3 = new ParserRule("value", /^[0-9](.[0-9]*)?/, "eol", undefined);
		var r4 = new ParserRule("eol", /^\n/, ParserFSM.finished, undefined);
        var fsm = new ParserFSM([r1,r2,r3,r4]);
        fsm.parseAsMuchAsPoss(source);
		assert.equal(source.getRemainingCode(), "");
	}); 
});	



