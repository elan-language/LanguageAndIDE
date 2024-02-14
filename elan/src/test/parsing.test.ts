import assert from 'assert';
import * as vscode from 'vscode';
import {CodeSource, CodeSourceFromString } from '../frames/code-source';
import { FileImpl } from '../frames/file-impl';
import { MainFrame } from '../frames/globals/main-frame';
import { SetStatement } from '../frames/statements/set-statement';
import { StatementSelector } from '../frames/statements/statement-selector';
import { Variable } from '../frames/statements/variable';
import { Print } from '../frames/statements/print';
import { Throw } from '../frames/statements/throw';
import { Call } from '../frames/statements/call';
import { Regexes } from '../frames/fields/regexs';

suite('Parsing Tests', () => {
	vscode.window.showInformationMessage('Start all unit tests.');

	test('parse - all Regexes', () => { 
		assert.equal(new RegExp(`^${Regexes.type}$`).test(``), false);
		assert.equal(new RegExp(`^${Regexes.type}$`).test(`T`), true);
		assert.equal(new RegExp(`^${Regexes.type}$`).test(`Foo123_x`), true);
		assert.equal(new RegExp(`^${Regexes.type}$`).test(`f`), false);
		assert.equal(new RegExp(`^${Regexes.type}$`).test(`T `), false);

		assert.equal(new RegExp(`^${Regexes.identifier}$`).test(``), false);
		assert.equal(new RegExp(`^${Regexes.identifier}$`).test(`t`), true);
		assert.equal(new RegExp(`^${Regexes.identifier}$`).test(`abc123_h`), true);
		assert.equal(new RegExp(`^${Regexes.identifier}$`).test(`F`), false);
		assert.equal(new RegExp(`^${Regexes.identifier}$`).test(`abc `), false);

		assert.equal(new RegExp(`^${Regexes.literalString}$`).test(``), false);
		assert.equal(new RegExp(`^${Regexes.literalString}$`).test(`"hello"`), true);
		assert.equal(new RegExp(`^${Regexes.literalString}$`).test(`"hello`), false);
		assert.equal(new RegExp(`^${Regexes.literalString}$`).test(`hello"`), false);
		assert.equal(new RegExp(`^${Regexes.literalString}$`).test(`"hello" there`), false);
		assert.equal(new RegExp(Regexes.literalString).test(`"hello" there`), true);
       
		assert.equal(new RegExp(`^${Regexes.literalInt}$`).test(``), false);
		assert.equal(new RegExp(`^${Regexes.literalInt}$`).test(`0345`), true);
		assert.equal(new RegExp(`^${Regexes.literalInt}$`).test(`0345 `), false);
		assert.equal(new RegExp(`^${Regexes.literalInt}$`).test(`03 45`), false);
		assert.equal(new RegExp(`^${Regexes.literalInt}$`).test(`03.45`), false);
		assert.equal(new RegExp(`^${Regexes.literalInt}$`).test(``), false);

		assert.equal(new RegExp(Regexes.literalFloat).test(`0.345`), true);
		assert.equal(new RegExp(Regexes.literalFloat).test(`345`), false);
		assert.equal(new RegExp(Regexes.literalFloat).test(`.345`), false);
		assert.equal(new RegExp(`^${Regexes.literalFloat}$`).test(`0.345 `), false);
		assert.equal(new RegExp(`^${Regexes.literalFloat}$`).test(``), false);

		assert.equal(new RegExp(Regexes.literalChar).test(`'a'`), true);
		assert.equal(new RegExp(Regexes.literalChar).test(`' '`), true);
		assert.equal(new RegExp(Regexes.literalChar).test(`'a`), false);
		assert.equal(new RegExp(Regexes.literalChar).test(`a`), false);
		assert.equal(new RegExp(Regexes.literalChar).test(`a'`), false);
		assert.equal(new RegExp(Regexes.literalChar).test(`'ab'`), false);
		assert.equal(new RegExp(Regexes.literalChar).test(`"a"`), false);
		assert.equal(new RegExp(`^${Regexes.literalChar}$`).test(`'a' `), false);
		assert.equal(new RegExp(`^${Regexes.literalChar}$`).test(``), false);

		assert.equal(new RegExp(`^${Regexes.literalBool}$`).test(``), false);
		assert.equal(new RegExp(`^${Regexes.literalBool}$`).test(`true`), true);
		assert.equal(new RegExp(`^${Regexes.literalBool}$`).test(`false`), true);
		assert.equal(new RegExp(`^${Regexes.literalBool}$`).test(`True`), false);
		assert.equal(new RegExp(`^${Regexes.literalBool}$`).test(`true `), false);

		assert.equal(new RegExp(`^${Regexes.literalValue}$`).test(``), false);
		assert.equal(new RegExp(`^${Regexes.literalValue}$`).test(`"hello"`), true);
		assert.equal(new RegExp(`^${Regexes.literalValue}$`).test(`0345`), true);
		assert.equal(new RegExp(`^${Regexes.literalValue}$`).test(`0.345`), true);
		assert.equal(new RegExp(`^${Regexes.literalValue}$`).test(`'a'`), true);	
		assert.equal(new RegExp(`^${Regexes.literalValue}$`).test(`true`), true);	
		assert.equal(new RegExp(`^${Regexes.literalValue}$`).test(`true `), false);
		assert.equal(new RegExp(`^${Regexes.literalValue}$`).test(`a`), false);

		assert.equal(new RegExp(`^${Regexes.variable}$`).test(``), false);
		assert.equal(new RegExp(`^${Regexes.variable}$`).test(`a`), true);
		assert.equal(new RegExp(`^${Regexes.variable}$`).test(`a[3]`), true);
		assert.equal(new RegExp(`^${Regexes.variable}$`).test(`a[b]`), true);
		assert.equal(new RegExp(`^${Regexes.variable}$`).test(`"a"`), false);

		assert.equal(new RegExp(`^${Regexes.value}$`).test(``), false);
		assert.equal(new RegExp(`^${Regexes.value}$`).test(`a[3]`), true);
		assert.equal(new RegExp(`^${Regexes.value}$`).test(`3`), true);
		assert.equal(new RegExp(`^${Regexes.value}$`).test(`"3"`), true);

		assert.equal(new RegExp(`^${Regexes.argList}$`).test(``), false);
		assert.equal(new RegExp(`^${Regexes.argList}$`).test(`a`), true);
		//assert.equal(new RegExp(`^${Regexes.argList}$`).test(`a, b`), true);
		assert.equal(new RegExp(`^${Regexes.argList}$`).test(`3, a, "hello"`), true);
		assert.equal(new RegExp(`^${Regexes.argList}$`).test(`a `), false);
		assert.equal(new RegExp(`^${Regexes.argList}$`).test(`a,`), false);
		assert.equal(new RegExp(`^${Regexes.argList}$`).test(`,`), false);
		assert.equal(new RegExp(`^${Regexes.argList}$`).test(`a,b`), false);
		
/*		static readonly argList = `${Regexes.value}(, ${Regexes.value})*`; //For time being does not allow expressions
		static readonly paramDef = `${Regexes.identifier} ${Regexes.type}`;
		static readonly paramList = `${Regexes.paramDef}(, ${Regexes.paramDef})*`;
		static readonly typeList = `${Regexes.type}(, ${Regexes.type})*`;
		static readonly identifierList = `${Regexes.identifier}(, ${Regexes.identifier})*`;
		static readonly anythingToNewLine = `[^\\n]*`;
		static readonly expression = Regexes.anythingToNewLine; //TODO temporary kludge only - expression must go to end of line */
	}); 

    test('parse - set statement', () => {
		var code = "  set fooBar to 3.141";
        var source = new CodeSourceFromString(code + "\n");
		const fl = new FileImpl();
		var m = new MainFrame(fl);	
		var setTo = new SetStatement(m);
		setTo.parseFromSource(source);
		assert.equal(source.hasMoreCode(), false);
		assert.equal(setTo.renderAsSource(), code);
	}); 

	test('parse - variable', () => {
		var code = "  var fooBar set to 3.141";
        var source = new CodeSourceFromString(code + "\n");
		const fl = new FileImpl();
		var m = new MainFrame(fl);	
		var v = new Variable(m);
		v.parseFromSource(source);
		assert.equal(source.hasMoreCode(), false);
		assert.equal(v.renderAsSource(), code);
	});

	test('parse - print', () => {
		var code = `  print "Hello World!"`;
        var source = new CodeSourceFromString(code + "\n");
		const fl = new FileImpl();
		var m = new MainFrame(fl);	
		var p = new Print(m);
		p.parseFromSource(source);
		assert.equal(source.hasMoreCode(), false);
		assert.equal(p.renderAsSource(), code);
	});
	test('parse - throw', () => {
		var code = `  throw "Failure"`;
        var source = new CodeSourceFromString(code + "\n");
		const fl = new FileImpl();
		var m = new MainFrame(fl);	
		var setTo = new Throw(m);
		setTo.parseFromSource(source);
		assert.equal(source.hasMoreCode(), false);
		assert.equal(setTo.renderAsSource(), code);
	});
	test('parse - throw with variable', () => {
		var code = `  throw message1`;
        var source = new CodeSourceFromString(code + "\n");
		const fl = new FileImpl();
		var m = new MainFrame(fl);	
		var setTo = new Throw(m);
		setTo.parseFromSource(source);
		assert.equal(source.hasMoreCode(), false);
		assert.equal(setTo.renderAsSource(), code);
	});
	test('parse - call', () => {
		var code = `  call foo()`;
        var source = new CodeSourceFromString(code + "\n");
		const fl = new FileImpl();
		var m = new MainFrame(fl);	
		var setTo = new Call(m);
		setTo.parseFromSource(source);
		assert.equal(source.hasMoreCode(), false);
		assert.equal(setTo.renderAsSource(), code);
	});
	test('parse - call with args', () => {
		var code = `  call foo(3, a, "hello")`;
        var source = new CodeSourceFromString(code + "\n");
		const fl = new FileImpl();
		var m = new MainFrame(fl);	
		var setTo = new Call(m);
		setTo.parseFromSource(source);
		assert.equal(source.hasMoreCode(), false);
		assert.equal(setTo.renderAsSource(), code);
	});
	test('parse - StatementSelector', () => {
		var code = "set fooBar to 3.141";
        var source = new CodeSourceFromString(code + "\n");
		const fl = new FileImpl();
		var m = new MainFrame(fl);	
		var ss = new StatementSelector(m);
		ss.parseFromSource(source);
		assert.equal(source.getRemainingCode(), "");
	}); 
});	



