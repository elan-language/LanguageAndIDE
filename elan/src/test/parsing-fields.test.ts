import assert from 'assert';
import * as vscode from 'vscode';
import { FileImpl } from '../frames/file-impl';
import { MainFrame } from '../frames/globals/main-frame';
import { GlobalFunction } from '../frames/globals/global-function';
import { VarStatement } from '../frames/statements/var-statement';
import { ParseStatus } from '../frames/status-enums';
import { Switch } from '../frames/statements/switch';
import { Case } from '../frames/statements/case';
import { CallStatement } from '../frames/statements/call-statement';
import { hash } from '../util';
import { DefaultProfile } from '../frames/default-profile';
import { CommentStatement } from '../frames/statements/comment-statement';
import { LetStatement } from '../frames/statements/let-statement';

suite('Field Parsing Tests', () => {
	vscode.window.showInformationMessage('Start all unit tests.');

	test('parse CommentField', () => { 
		var main = new MainFrame(new FileImpl(hash, new DefaultProfile()));
		var commentStatement = new CommentStatement(main);
        var text = commentStatement.text;
		assert.equal(text.textAsSource(), "");
		assert.equal(text.getParseStatus(), ParseStatus.valid);
		text.setText("Hello");
		text.parseCurrentText();
		assert.equal(text.getParseStatus(), ParseStatus.valid);
		assert.equal(text.renderAsHtml(), `<field id="comment4" class="optional valid" tabindex=0><text>Hello</text><placeholder>comment</placeholder><completion></completion><msg></msg><help title="Any text on a single line.">?</help></field>`);
		}); 
	test('parse varDefField', () => { 
		var main = new MainFrame(new FileImpl(hash, new DefaultProfile()));
		var variable = new VarStatement(main);
        var id = variable.name;
		assert.equal(id.textAsSource(), "");
		assert.equal(id.getParseStatus(), ParseStatus.incomplete);
		id.setText("ab_1");
		id.parseCurrentText();
		assert.equal(id.getParseStatus(), ParseStatus.valid);
		assert.equal(id.renderAsHtml(), `<field id="var4" class="valid" tabindex=0><text>ab_1</text><placeholder>name</placeholder><completion></completion><msg></msg><help title="A variable name must start with a lower-case letter, optionally followed by any letters (lower or upper case), and/or numeric digits, and/or underscores - nothing else. (For'tuple deconstruction' or 'list deconstruction' consult documentation.)">?</help></field>`);
		id.setText("Ab_1");
		id.parseCurrentText();
		assert.equal(id.getParseStatus(), ParseStatus.invalid);
		assert.equal(id.parseErrorMsg, "");
		id.setText("result");
		id.parseCurrentText();
		assert.equal(id.getParseStatus(), ParseStatus.valid); //Because 'result' is no longer a keyword
		id.setText("default");
		id.parseCurrentText();
		assert.equal(id.getParseStatus(), ParseStatus.invalid);
	}); 
		
	test('parse VarDefField 2', () => { 
		var main = new MainFrame(new FileImpl(hash, new DefaultProfile()));
		var letSt = new LetStatement(main);
		var id = letSt.name;
		assert.equal(id.textAsSource(), "");
		assert.equal(id.getParseStatus(), ParseStatus.incomplete);
		id.setText("ab_1");
		id.parseCurrentText();
		assert.equal(id.getParseStatus(), ParseStatus.valid);
		assert.equal(id.renderAsHtml(), `<field id="var4" class="valid" tabindex=0><text>ab_1</text><placeholder>name</placeholder><completion></completion><msg></msg><help title="A variable name must start with a lower-case letter, optionally followed by any letters (lower or upper case), and/or numeric digits, and/or underscores - nothing else. (For'tuple deconstruction' or 'list deconstruction' consult documentation.)">?</help></field>`);
		id.setText("Ab_1");
		id.parseCurrentText();
		assert.equal(id.getParseStatus(), ParseStatus.invalid);
		id.setText("result");
		id.parseCurrentText();
		assert.equal(id.getParseStatus(), ParseStatus.valid);
		id.setText("default");
		id.parseCurrentText();
		assert.equal(id.getParseStatus(), ParseStatus.invalid);
	}); 
	test('parse CaseValueField', () => { 
		var main = new MainFrame(new FileImpl(hash, new DefaultProfile()));
		var sw = new Switch(main);
		var c = new Case(sw);
		var f = c.value;
		assert.equal(f.textAsSource(), "");
		assert.equal(f.getParseStatus(), ParseStatus.incomplete);
		f.setText("3");
		f.parseCurrentText();
		assert.equal(f.getParseStatus(), ParseStatus.valid);
	    f.setText(`"hello"`);
		f.parseCurrentText();
		assert.equal(f.getParseStatus(), ParseStatus.valid);
		f.setText(`ab`);
		f.parseCurrentText();
		assert.equal(f.getParseStatus(), ParseStatus.invalid);
		}); 

		test('parse  ArgListField', () => { 
			var main = new MainFrame(new FileImpl(hash, new DefaultProfile()));
			var call = new CallStatement(main);
			var argList = call.args; 
			argList.setText("3,4,5");
			argList.parseCurrentText();
			assert.equal(argList.getParseStatus(), ParseStatus.valid);
			argList.setText(`s, a, "hello", b[5]`);
			argList.parseCurrentText();
			assert.equal(argList.getParseStatus(), ParseStatus.valid);
			argList.setText(`5, 3 + 4`);
			argList.parseCurrentText();
			assert.equal(argList.getParseStatus(), ParseStatus.valid);
			argList.setText(`5, (3 + 4)`);
			argList.parseCurrentText();
			assert.equal(argList.getParseStatus(), ParseStatus.valid);
			}); 

		test('parse ArgListField 2', () => { 
			var main = new MainFrame(new FileImpl(hash, new DefaultProfile()));
			var call = new CallStatement(main);
			var argList = call.args; 
			argList.setText("");
			argList.parseCurrentText();
			assert.equal(argList.getParseStatus(), ParseStatus.valid);
			}); 


			
		test('parse TypeField invalid', () => { 
			var func = new GlobalFunction(new FileImpl(hash, new DefaultProfile()));
			var type = func.returnType;
			type.setText("Foo<of bar");
			type.parseCurrentText();
			assert.equal(type.getParseStatus(), ParseStatus.invalid);
			assert.equal(type.textAsSource(), "Foo<of bar");
			assert.equal(type.textAsHtml(), "Foo&lt;of bar");

		});

		test('parse ExpressionField - literal string with interpolations', () => { 
			var main = new MainFrame(new FileImpl(hash, new DefaultProfile()));
			var v = new VarStatement(main);
			var expr = v.expr;
			expr.setText(`"{op} times {op2} equals {op1 * op2}"`);
			expr.parseCurrentText();
			assert.equal(expr.getParseStatus(), ParseStatus.valid);
			assert.equal(expr.textAsSource(), `"{op} times {op2} equals {op1 * op2}"`);
			assert.equal(expr.textAsHtml(), `<string>"</string>{op}<string> times </string>{op2}<string> equals </string>{op1 * op2}<string>"</string>`);
		});
});