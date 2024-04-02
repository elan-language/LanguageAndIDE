import assert from 'assert';
import * as vscode from 'vscode';
import { FileImpl } from '../frames/file-impl';
import { MainFrame } from '../frames/globals/main-frame';
import { VarStatement } from '../frames/statements/var-statement';
import { ParseStatus } from '../frames/parse-status';
import { Switch } from '../frames/statements/switch';
import { Case } from '../frames/statements/case';
import { CallStatement } from '../frames/statements/call-statement';
import { hash } from '../util';
import { DefaultProfile } from '../frames/default-profile';
import { CommentStatement } from '../frames/statements/comment-statement';
import { LetStatement } from '../frames/statements/let-statement';

suite('Field Parsing Tests', () => {
	vscode.window.showInformationMessage('Start all unit tests.');

	test('parse Frames - Comment', () => { 
		var main = new MainFrame(new FileImpl(hash, new DefaultProfile()));
		var commentStatement = new CommentStatement(main);
        var text = commentStatement.text;
		assert.equal(text.textAsSource(), "");
		assert.equal(text.getStatus(), ParseStatus.valid);
		text.setText("Hello");
		text.parseCurrentText();
		assert.equal(text.getStatus(), ParseStatus.valid);
		assert.equal(text.renderAsHtml(), `<field id="comment4" class="optional valid" tabindex=0><text>Hello</text><placeholder>comment</placeholder><completion></completion></field>`);
		}); 

	test('parse Frames - VariableDefStatement', () => { 
		var main = new MainFrame(new FileImpl(hash, new DefaultProfile()));
		var variable = new VarStatement(main);
        var id = variable.name;
		assert.equal(id.textAsSource(), "");
		assert.equal(id.getStatus(), ParseStatus.incomplete);
		id.setText("ab_1");
		id.parseCurrentText();
		assert.equal(id.getStatus(), ParseStatus.valid);
		assert.equal(id.renderAsHtml(), `<field id="var4" class="valid" tabindex=0><text>ab_1</text><placeholder>name</placeholder><completion></completion></field>`);
		id.setText("Ab_1");
		id.parseCurrentText();
		assert.equal(id.getStatus(), ParseStatus.invalid);
		id.setText("result");
		id.parseCurrentText();
		assert.equal(id.getStatus(), ParseStatus.valid); //Because 'result' is no longer a keyword
		id.setText("default");
		id.parseCurrentText();
		assert.equal(id.getStatus(), ParseStatus.invalid);
		}); 

	test('parse Frames - literalValue', () => { 
		var main = new MainFrame(new FileImpl(hash, new DefaultProfile()));
		var sw = new Switch(main);
		var c = new Case(sw);
		var f = c.value;
		assert.equal(f.textAsSource(), "");
		assert.equal(f.getStatus(), ParseStatus.incomplete);
		f.setText("3");
		f.parseCurrentText();
		assert.equal(f.getStatus(), ParseStatus.valid);
	    f.setText(`"hello"`);
		f.parseCurrentText();
		assert.equal(f.getStatus(), ParseStatus.valid);
		f.setText(`ab`);
		f.parseCurrentText();
		assert.equal(f.getStatus(), ParseStatus.invalid);
		}); 

		test('parse Frames - argsList1', () => { 
			var main = new MainFrame(new FileImpl(hash, new DefaultProfile()));
			var call = new CallStatement(main);
			var argList = call.args; 
			argList.setText("3,4,5");
			argList.parseCurrentText();
			assert.equal(argList.getStatus(), ParseStatus.valid);
			argList.setText(`s, a, "hello", b[5]`);
			argList.parseCurrentText();
			assert.equal(argList.getStatus(), ParseStatus.valid);
			argList.setText(`5, 3 + 4`);
			argList.parseCurrentText();
			assert.equal(argList.getStatus(), ParseStatus.valid);
			argList.setText(`5, (3 + 4)`);
			argList.parseCurrentText();
			assert.equal(argList.getStatus(), ParseStatus.valid);
			}); 

			test('parse Frames - argsList2', () => { 
				var main = new MainFrame(new FileImpl(hash, new DefaultProfile()));
				var call = new CallStatement(main);
				var argList = call.args; 
				argList.setText("");
				argList.parseCurrentText();
				assert.equal(argList.getStatus(), ParseStatus.valid);
				}); 

			test('parse Frames - LetStatement', () => { 
				var main = new MainFrame(new FileImpl(hash, new DefaultProfile()));
				var letSt = new LetStatement(main);
				var id = letSt.name;
				assert.equal(id.textAsSource(), "");
				assert.equal(id.getStatus(), ParseStatus.incomplete);
				id.setText("ab_1");
				id.parseCurrentText();
				assert.equal(id.getStatus(), ParseStatus.valid);
				assert.equal(id.renderAsHtml(), `<field id="var4" class="valid" tabindex=0><text>ab_1</text><placeholder>name</placeholder><completion></completion></field>`);
				id.setText("Ab_1");
				id.parseCurrentText();
				assert.equal(id.getStatus(), ParseStatus.invalid);
				id.setText("result");
				id.parseCurrentText();
				assert.equal(id.getStatus(), ParseStatus.valid);
				id.setText("default");
				id.parseCurrentText();
				assert.equal(id.getStatus(), ParseStatus.invalid);
				}); 
			
});