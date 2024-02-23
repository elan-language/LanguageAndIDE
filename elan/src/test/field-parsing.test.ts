import assert from 'assert';
import * as vscode from 'vscode';
import {CodeSourceFromString } from '../frames/code-source';
import { FileImpl } from '../frames/file-impl';
import { MainFrame } from '../frames/globals/main-frame';
import { Variable } from '../frames/statements/variable';
import { ParseStatus } from '../frames/parse-status';
import { Switch } from '../frames/statements/switch';
import { Case } from '../frames/statements/case';

suite('Field Parsing Tests', () => {
	vscode.window.showInformationMessage('Start all unit tests.');

	test('parse Frames - identifier', () => { 
		var main = new MainFrame(new FileImpl());
		var variable = new Variable(main);
        var id = variable.name;
		assert.equal(id.textAsSource(), "");
		assert.equal(id.getStatus(), ParseStatus.incomplete);
		id.setText("ab_1");
		id.parseCurrentText();
		assert.equal(id.getStatus(), ParseStatus.valid);
		assert.equal(id.renderAsHtml(), `<field id="ident4" class="valid" tabindex=0><text>ab_1</text><placeholder>name</placeholder><help></help></field>`);
		id.setText("Ab_1");
		id.parseCurrentText();
		assert.equal(id.getStatus(), ParseStatus.invalid);
		}); 

	test('parse Frames - literalValue', () => { 
		var main = new MainFrame(new FileImpl());
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

});