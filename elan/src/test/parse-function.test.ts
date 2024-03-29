import assert from 'assert';
import * as vscode from 'vscode';
import {genericString, identifier,  optional} from '../frames/fields/parse-functions';
import { ParseStatus } from '../frames/parse-status';
import { Regexes } from '../frames/fields/regexes';

suite('Parse Function Tests', () => {
	vscode.window.showInformationMessage('Start all unit tests.');

	
	test('parse functions - all Regexes', () => { 
		assert.equal(new RegExp(`^${Regexes.newLine}$`).test(``), false);
		assert.equal(new RegExp(`^${Regexes.newLine}$`).test(`\n`), true);
		assert.equal(new RegExp(`^${Regexes.newLine}$`).test(`\r\n`), true);

		assert.equal(new RegExp(`^${Regexes.simpleType}$`).test(``), false);
		assert.equal(new RegExp(`^${Regexes.simpleType}$`).test(`T`), true);
		assert.equal(new RegExp(`^${Regexes.simpleType}$`).test(`Foo123_x`), true);
		assert.equal(new RegExp(`^${Regexes.simpleType}$`).test(`f`), false);


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

		assert.equal(new RegExp(`^${Regexes.expression}$`).test(``), false);
		assert.equal(new RegExp(`^${Regexes.expression}$`).test(`3`), true);
		assert.equal(new RegExp(`^${Regexes.expression}$`).test(`3 + 4`), true);
		assert.equal(new RegExp(`^${Regexes.expression}$`).test(`(3 + 4) * 5`), true);
		assert.equal(new RegExp(`^${Regexes.expression}$`).test(`mergeSort(li)`), true);

		assert.equal(new RegExp(`^${Regexes.conditionalOperator}$`).test(`>`), true);

		assert.equal(new RegExp(`^${Regexes.condition}$`).test(``), false);
		assert.equal(new RegExp(`^${Regexes.condition}$`).test(`a > b`), true);
	
/*		static readonly argList = `${Regexes.value}(, ${Regexes.value})*`; //For time being does not allow expressions
		static readonly paramDef = `${Regexes.identifier} ${Regexes.type}`;
		static readonly paramList = `${Regexes.paramDef}(, ${Regexes.paramDef})*`;
		static readonly typeList = `${Regexes.type}(, ${Regexes.type})*`;
		static readonly identifierList = `${Regexes.identifier}(, ${Regexes.identifier})*`;
		static readonly anythingToNewLine = `[^\\n]*`;
		static readonly expression = Regexes.anythingToNewLine; //TODO temporary kludge only - expression must go to end of line */
	}); 

	test('parse functions - generic string', () => {
		var kw = "var";
		assert.deepEqual(genericString([ParseStatus.notParsed, "var a set to 3"],kw), [ParseStatus.valid,  " a set to 3"]);
		assert.deepEqual(genericString([ParseStatus.notParsed, "var"],kw), [ParseStatus.valid,  ""]);
		assert.deepEqual(genericString([ParseStatus.notParsed, "variable"],kw), [ParseStatus.valid,  "iable"]);
		assert.deepEqual(genericString([ParseStatus.notParsed, "v"],kw), [ParseStatus.incomplete, ""]);
		assert.deepEqual(genericString([ParseStatus.notParsed, "vax"],kw), [ParseStatus.invalid, "vax"]);
		assert.deepEqual(genericString([ParseStatus.notParsed, "tvar"],kw), [ParseStatus.invalid, "tvar"]);
	}); 

	test('parse functions - identifier', () => {
		assert.deepEqual(identifier([ParseStatus.notParsed, "foo"]), [ParseStatus.valid,  ""]);
		assert.deepEqual(identifier([ParseStatus.notParsed, "foo "]), [ParseStatus.valid,  " "]);
		assert.deepEqual(identifier([ParseStatus.notParsed, "f set to"]), [ParseStatus.valid,  " set to"]);
		assert.deepEqual(identifier([ParseStatus.notParsed, "Foo"]), [ParseStatus.invalid,  "Foo"]);
		//Bad starting points:
		assert.deepEqual(identifier([ParseStatus.invalid, "foo"]), [ParseStatus.valid, ""]);
		assert.deepEqual(identifier([ParseStatus.incomplete, ""]), [ParseStatus.invalid, ""]);
		assert.deepEqual(identifier([ParseStatus.notParsed, ""]), [ParseStatus.invalid,  ""]);
		assert.deepEqual(identifier([ParseStatus.invalid, ""]), [ParseStatus.invalid,  ""]);
	}); 
	test('parse functions - optional', () => {
		assert.deepEqual(optional([ParseStatus.notParsed, "foo"], identifier), [ParseStatus.valid,  ""]);
		assert.deepEqual(optional([ParseStatus.notParsed, ""], identifier), [ParseStatus.notParsed,  ""]);
		assert.deepEqual(optional([ParseStatus.notParsed, "foo set to"], identifier), [ParseStatus.valid,  " set to"]);
		assert.deepEqual(optional([ParseStatus.notParsed, "Foo"], identifier), [ParseStatus.notParsed,  "Foo"]);
	}); 
});
