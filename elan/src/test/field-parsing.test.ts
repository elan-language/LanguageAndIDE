import assert from 'assert';
import * as vscode from 'vscode';
import {CodeSourceFromString } from '../frames/code-source';
import { FileImpl } from '../frames/file-impl';
import { MainFrame } from '../frames/globals/main-frame';
import { VariableDefStatement } from '../frames/statements/variable-def-statement';
import { ParseStatus } from '../frames/parse-status';
import { Switch } from '../frames/statements/switch';
import { Case } from '../frames/statements/case';
import { Call } from '../frames/statements/call';
import { hash } from '../util';
import { DefaultProfile } from '../frames/default-profile';

suite('Field Parsing Tests', () => {
	vscode.window.showInformationMessage('Start all unit tests.');

	test('parse Frames - VariableDefStatement', () => { 
		var main = new MainFrame(new FileImpl(hash, new DefaultProfile()));
		var variable = new VariableDefStatement(main);
        var id = variable.name;
		assert.equal(id.textAsSource(), "");
		assert.equal(id.getStatus(), ParseStatus.incomplete);
		id.setText("ab_1");
		id.parseCurrentText();
		assert.equal(id.getStatus(), ParseStatus.valid);
		assert.equal(id.renderAsHtml(), `<field id="var4" class="valid" tabindex=0><text>ab_1</text><placeholder>name</placeholder><help></help></field>`);
		id.setText("Ab_1");
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

		test('parse Frames - argsList', () => { 
			var main = new MainFrame(new FileImpl(hash, new DefaultProfile()));
			var call = new Call(main);
			var args = call.args; 
			args.setText("3,4,5");
			args.parseCurrentText();
			assert.equal(args.getStatus(), ParseStatus.valid);
			args.setText(`s, a, "hello", b[5]`);
			args.parseCurrentText();
			assert.equal(args.getStatus(), ParseStatus.valid);
			args.setText(`5, 3 + 4`);
			args.parseCurrentText();
			assert.equal(args.getStatus(), ParseStatus.invalid);
			args.setText(`5, (3 + 4)`);
			args.parseCurrentText();
			assert.equal(args.getStatus(), ParseStatus.valid);
			}); 

});