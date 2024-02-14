import assert from 'assert';
import * as vscode from 'vscode';
import {CodeSource, CodeSourceFromString } from '../frames/code-source';
import { FileImpl } from '../frames/file-impl';
import { MainFrame } from '../frames/globals/main-frame';
import { SetStatement } from '../frames/statements/set-statement';
import { StatementSelector } from '../frames/statements/statement-selector';

suite('Parsing Tests', () => {
	vscode.window.showInformationMessage('Start all unit tests.');

    test('parse set-to statement via the frame', () => {
		var code = "  set fooBar to 3.141";
        var source = new CodeSourceFromString(code + "\n");
		const fl = new FileImpl();
		var m = new MainFrame(fl);	
		var setTo = new SetStatement(m);
		setTo.parse(source);
		assert.equal(source.getRemainingCode(), "");
		assert.equal(setTo.renderAsSource(), code);
	}); 

	test('parse using statement selector', () => {
		var code = "set fooBar to 3.141";
        var source = new CodeSourceFromString(code + "\n");
		const fl = new FileImpl();
		var m = new MainFrame(fl);	
		var ss = new StatementSelector(m);
		ss.parse(source);
		assert.equal(source.getRemainingCode(), "");
	}); 
});	



