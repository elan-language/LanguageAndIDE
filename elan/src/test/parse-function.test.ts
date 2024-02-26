import assert from 'assert';
import * as vscode from 'vscode';
import {genericString, identifier, type, sp, paramDef, optional, optSp, comma, STAR, PLUS, CSV_1, paramsList, CSV_0, SEQ, LongestMatchFrom as longestMatchFrom, literalBoolean, literalInt, literalFloat, literalChar, enumValue, literalValue, scopeQualifier_opt, value, literalString, variableUse, index_opt, argsList, firstValidMatchOrLongestIncomplete, identifierList, procedureRef, variableDotMember, anythingBetweenBrackets, assignableValue } from '../frames/fields/parse-functions';
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

	test('parse functions - type', () => {
		assert.deepEqual(type([ParseStatus.notParsed, "Foo"]), [ParseStatus.valid,  ""]);
		assert.deepEqual(type([ParseStatus.notParsed, "Foo "]), [ParseStatus.valid,  " "]);
		assert.deepEqual(type([ParseStatus.notParsed, "foo"]), [ParseStatus.invalid,  "foo"]);
		assert.deepEqual(type([ParseStatus.notParsed, "Foo<of Bar>"]), [ParseStatus.valid,  ""]);
		assert.deepEqual(type([ParseStatus.notParsed, "Foo<"]), [ParseStatus.incomplete,  ""]);
		assert.deepEqual(type([ParseStatus.notParsed, "Foo<of "]), [ParseStatus.incomplete,  ""]);
		assert.deepEqual(type([ParseStatus.notParsed, "Foo<of Bar"]), [ParseStatus.incomplete,  ""]);
		//assert.deepEqual(type([ParseStatus.notParsed, "Foo<of Bar<of Qux>>"]), [ParseStatus.valid,  ""]); TODO
		assert.deepEqual(type([ParseStatus.invalid, "(Foo, Bar)"]), [ParseStatus.valid, ""]);
		assert.deepEqual(type([ParseStatus.invalid, "(Foo, Foo<of Bar>, Yon)"]), [ParseStatus.valid, ""]);
		assert.deepEqual(type([ParseStatus.incomplete, "(Foo,"]), [ParseStatus.incomplete, ""]);
		assert.deepEqual(type([ParseStatus.incomplete, "(bar"]), [ParseStatus.incomplete, "bar"]);

		assert.deepEqual(type([ParseStatus.invalid, "Foo"]), [ParseStatus.valid, ""]);
		assert.deepEqual(type([ParseStatus.incomplete, ""]), [ParseStatus.invalid, ""]);

	}); 

	test('parse functions - sp', () => {
		assert.deepEqual(sp([ParseStatus.notParsed, " abc"]), [ParseStatus.valid,  "abc"]);
		assert.deepEqual(sp([ParseStatus.notParsed, "   def"]), [ParseStatus.valid,  "def"]);
		assert.deepEqual(sp([ParseStatus.notParsed, "ghi"]), [ParseStatus.invalid,  "ghi"]);
		//Bad starting points:
		assert.deepEqual(sp([ParseStatus.invalid, " abc"]), [ParseStatus.valid, "abc"]);
		assert.deepEqual(sp([ParseStatus.incomplete, ""]), [ParseStatus.invalid, ""]);
		assert.deepEqual(sp([ParseStatus.notParsed, ""]), [ParseStatus.invalid,  ""]);
	}); 

	test('parse functions - optSp', () => {
		assert.deepEqual(optSp([ParseStatus.notParsed, " abc"]), [ParseStatus.valid,  "abc"]);
		assert.deepEqual(optSp([ParseStatus.notParsed, "   def"]), [ParseStatus.valid,  "def"]);
		assert.deepEqual(optSp([ParseStatus.notParsed, "ghi"]), [ParseStatus.valid,  "ghi"]);
		assert.deepEqual(optSp([ParseStatus.notParsed, ""]), [ParseStatus.valid,  ""]);
	}); 

	test('parse functions - comma', () => {
		assert.deepEqual(comma([ParseStatus.notParsed, ","]), [ParseStatus.valid,  ""]);
		assert.deepEqual(comma([ParseStatus.notParsed, "   ,    "]), [ParseStatus.valid,  ""]);
		assert.deepEqual(comma([ParseStatus.notParsed, " "]), [ParseStatus.invalid,  " "]);
		assert.deepEqual(comma([ParseStatus.notParsed, ", ,"]), [ParseStatus.valid,  ","]);
	}); 

	test('parse functions - sequence', () => {
		assert.deepEqual(SEQ([ParseStatus.notParsed, ", bar"], [comma, identifier]), [ParseStatus.valid,  ""]);
		assert.deepEqual(SEQ([ParseStatus.notParsed, ", ,"], [comma, identifier]), [ParseStatus.incomplete,  ","]);
		assert.deepEqual(SEQ([ParseStatus.notParsed, "bar "], [comma, identifier]), [ParseStatus.invalid,  "bar "]);
	});

	test('parse functions - paramDef', () => {
		assert.deepEqual(paramDef([ParseStatus.notParsed, "foo Bar"]), [ParseStatus.valid,  ""]);
		assert.deepEqual(paramDef([ParseStatus.notParsed, "foo   Bar"]), [ParseStatus.valid,  ""]);
		assert.deepEqual(paramDef([ParseStatus.notParsed, "foo Bar more"]), [ParseStatus.valid, " more"]);
		assert.deepEqual(paramDef([ParseStatus.notParsed, "foo "]), [ParseStatus.incomplete,  ""]);
		assert.deepEqual(paramDef([ParseStatus.notParsed, "foo"]), [ParseStatus.incomplete,  ""]);
		assert.deepEqual(paramDef([ParseStatus.notParsed, "fooBar"]), [ParseStatus.incomplete,  ""]);
		assert.deepEqual(paramDef([ParseStatus.notParsed, "Foo bar"]), [ParseStatus.invalid,  "Foo bar"]);
		assert.deepEqual(paramDef([ParseStatus.notParsed, "foo, "]), [ParseStatus.incomplete,  ", "]);
		assert.deepEqual(paramDef([ParseStatus.notParsed, "out foo Bar"]), [ParseStatus.valid,  ""]); 
		assert.deepEqual(paramDef([ParseStatus.notParsed, "out foo"]), [ParseStatus.incomplete,  ""]);
		assert.deepEqual(paramDef([ParseStatus.notParsed, "out Foo"]), [ParseStatus.incomplete,  "Foo"]);
	}); 

	test('parse functions - optional', () => {
		assert.deepEqual(optional([ParseStatus.notParsed, "foo"], identifier), [ParseStatus.valid,  ""]);
		assert.deepEqual(optional([ParseStatus.notParsed, ""], identifier), [ParseStatus.notParsed,  ""]);
		assert.deepEqual(optional([ParseStatus.notParsed, "foo set to"], identifier), [ParseStatus.valid,  " set to"]);
		assert.deepEqual(optional([ParseStatus.notParsed, "Foo"], identifier), [ParseStatus.notParsed,  "Foo"]);

		assert.deepEqual(optional([ParseStatus.notParsed, "foo"], paramDef), [ParseStatus.incomplete,  ""]);
		assert.deepEqual(optional([ParseStatus.notParsed, "foo Bar"], paramDef), [ParseStatus.valid,  ""]);
		assert.deepEqual(optional([ParseStatus.notParsed, "Foo Bar"], paramDef), [ParseStatus.notParsed,  "Foo Bar"]);
	}); 

	test('parse functions - zeroOrMore', () => {
		assert.deepEqual(STAR([ParseStatus.notParsed, " , ,, ,   ,,,  "], comma), [ParseStatus.valid,  ""]);
		assert.deepEqual(STAR([ParseStatus.notParsed, ""], comma), [ParseStatus.valid,  ""]);
	}); 

	test('parse functions - oneOrMore', () => {
		assert.deepEqual(PLUS([ParseStatus.notParsed, " , ,, ,   ,,,  "], comma), [ParseStatus.valid,  ""]);
		assert.deepEqual(PLUS([ParseStatus.notParsed, ""], comma), [ParseStatus.invalid,  ""]);
		assert.deepEqual(PLUS([ParseStatus.notParsed, "x,y"], comma), [ParseStatus.invalid,  "x,y"]);
	}); 

	test('parse functions - commaSeparatedOneOrMore - identifiers', () => {
		assert.deepEqual(CSV_1([ParseStatus.notParsed, "foo , bar ,a, yon"], identifier), [ParseStatus.valid,  ""]);
		assert.deepEqual(CSV_1([ParseStatus.notParsed, "foo , bar ,a, yon ,"], identifier), [ParseStatus.incomplete,  ""]);
		assert.deepEqual(CSV_1([ParseStatus.notParsed, "foo  bar"], identifier), [ParseStatus.valid,  "  bar"]);
		assert.deepEqual(CSV_1([ParseStatus.notParsed, "1"], identifier), [ParseStatus.invalid,  "1"]);
		assert.deepEqual(CSV_1([ParseStatus.notParsed, ", bar"], identifier), [ParseStatus.invalid,  ", bar"]);
		assert.deepEqual(CSV_1([ParseStatus.notParsed, "foo  "], identifier), [ParseStatus.valid,  "  "]);
	}); 

	test('parse functions - commaSeparatedZeroOrMore - identifiers', () => {
		assert.deepEqual(CSV_0([ParseStatus.notParsed, "foo , bar ,a, yon"], identifier), [ParseStatus.valid,  ""]);
		assert.deepEqual(CSV_0([ParseStatus.notParsed, "foo , bar ,a, yon ,"], identifier), [ParseStatus.incomplete,  ""]);
		assert.deepEqual(CSV_0([ParseStatus.notParsed, "foo  bar"], identifier), [ParseStatus.valid,  "  bar"]);
		assert.deepEqual(CSV_0([ParseStatus.notParsed, "1"], identifier), [ParseStatus.valid,  "1"]);
		assert.deepEqual(CSV_0([ParseStatus.notParsed, "foo  "], identifier), [ParseStatus.valid,  "  "]);
		assert.deepEqual(CSV_0([ParseStatus.notParsed, "foo,  "], identifier), [ParseStatus.incomplete,  ""]);
		assert.deepEqual(CSV_0([ParseStatus.notParsed, ", bar"], identifier), [ParseStatus.valid,  ", bar"]);
	}); 

	test('parse functions - paramsList', () => {
		assert.deepEqual(paramsList([ParseStatus.notParsed, "foo String , bar Int ,a Char, yon Float"]), [ParseStatus.valid,  ""]);
		assert.deepEqual(paramsList([ParseStatus.notParsed, "foo String"]), [ParseStatus.valid,  ""]);
		assert.deepEqual(paramsList([ParseStatus.notParsed, "foo String , "]), [ParseStatus.incomplete,  ""]);
		assert.deepEqual(paramsList([ParseStatus.notParsed, "foo, "]), [ParseStatus.incomplete,  ", "]);
		assert.deepEqual(paramsList([ParseStatus.notParsed, "foo String , bar "]), [ParseStatus.incomplete,  ""]);
		assert.deepEqual(paramsList([ParseStatus.notParsed, "foo String , Bar"]), [ParseStatus.incomplete,  "Bar"]);
		assert.deepEqual(paramsList([ParseStatus.notParsed, "foo string"]), [ParseStatus.incomplete,  "string"]);
		assert.deepEqual(paramsList([ParseStatus.notParsed, "Foo String"]), [ParseStatus.invalid,  "Foo String"]);
	}); 

	test('parse functions - longestMatchFrom', () => {
		assert.deepEqual(longestMatchFrom([ParseStatus.notParsed, "foo"], [type, identifier]), [ParseStatus.valid,  ""]);
		assert.deepEqual(longestMatchFrom([ParseStatus.notParsed, "String"], [type, identifier]), [ParseStatus.valid,  ""]);
		assert.deepEqual(longestMatchFrom([ParseStatus.notParsed, "foo String"], [type, identifier]), [ParseStatus.valid,  " String"]);
		assert.deepEqual(longestMatchFrom([ParseStatus.notParsed, "123"], [type, identifier]), [ParseStatus.invalid,  "123"]);

		assert.deepEqual(longestMatchFrom([ParseStatus.notParsed, "3.142"], [literalInt, literalFloat]), [ParseStatus.valid,  ""]);
		assert.deepEqual(longestMatchFrom([ParseStatus.notParsed, "3.142"], [literalFloat, literalInt ]), [ParseStatus.valid,  ""]);
		assert.deepEqual(longestMatchFrom([ParseStatus.notParsed, "3142"], [literalFloat, literalInt ]), [ParseStatus.valid,  ""]);
	}); 

	test('parse functions - firstMatchFrom', () => {
		assert.deepEqual(firstValidMatchOrLongestIncomplete([ParseStatus.notParsed, "foo"], [identifier, paramDef]), [ParseStatus.valid,  ""]);
		assert.deepEqual(firstValidMatchOrLongestIncomplete([ParseStatus.notParsed, "foo bar"], [identifier, paramDef]), [ParseStatus.valid,  " bar"]);
		assert.deepEqual(firstValidMatchOrLongestIncomplete([ParseStatus.notParsed, "foo String"], [identifier, paramDef]), [ParseStatus.valid,  " String"]);
		assert.deepEqual(firstValidMatchOrLongestIncomplete([ParseStatus.notParsed, "123"], [identifier, paramDef]), [ParseStatus.invalid,  "123"]);
		// functions specified in different order
		assert.deepEqual(firstValidMatchOrLongestIncomplete([ParseStatus.notParsed, "foo String"], [paramDef,identifier]), [ParseStatus.valid,  ""]);
	}); 

	test('parse functions - literalBoolean', () => {
		assert.deepEqual(literalBoolean([ParseStatus.notParsed, "true more"]), [ParseStatus.valid,  " more"]);
		assert.deepEqual(literalBoolean([ParseStatus.notParsed, "false"]), [ParseStatus.valid,  ""]);
		assert.deepEqual(literalBoolean([ParseStatus.notParsed, "tr"]), [ParseStatus.incomplete,  ""]);
		assert.deepEqual(literalBoolean([ParseStatus.notParsed, "f"]), [ParseStatus.incomplete,  ""]);
		assert.deepEqual(literalBoolean([ParseStatus.notParsed, "tr ue"]), [ParseStatus.invalid,  "tr ue"]);
	}); 

	test('parse functions - literalInt', () => {
		assert.deepEqual(literalInt([ParseStatus.notParsed, "30564 more"]), [ParseStatus.valid,  " more"]);
		assert.deepEqual(literalInt([ParseStatus.notParsed, "0 more"]), [ParseStatus.valid,  " more"]);
		assert.deepEqual(literalInt([ParseStatus.notParsed, "-3"]), [ParseStatus.invalid,  "-3"]);
		assert.deepEqual(literalInt([ParseStatus.notParsed, "3.141"]), [ParseStatus.valid,  ".141"]);
	}); 

	//TODO add Exponent
	test('parse functions - literalFloat', () => {
		assert.deepEqual(literalFloat([ParseStatus.notParsed, "3.141 more"]), [ParseStatus.valid,  " more"]);
		assert.deepEqual(literalFloat([ParseStatus.notParsed, "0.0"]), [ParseStatus.valid,  ""]);
		assert.deepEqual(literalFloat([ParseStatus.notParsed, "0"]), [ParseStatus.incomplete,  ""]);
		assert.deepEqual(literalFloat([ParseStatus.notParsed, "1."]), [ParseStatus.incomplete,  ""]);
		assert.deepEqual(literalFloat([ParseStatus.notParsed, "1.x"]), [ParseStatus.incomplete,  "x"]);
		assert.deepEqual(literalFloat([ParseStatus.notParsed, "a1"]), [ParseStatus.invalid,  "a1"]);
		assert.deepEqual(literalFloat([ParseStatus.notParsed, ""]), [ParseStatus.invalid,  ""]);
	}); 

	//TODO: cope with unicode ?
	test('parse functions - literalChar', () => {
	 	assert.deepEqual(literalChar([ParseStatus.notParsed, `'A' more`]), [ParseStatus.valid,  " more"]);
		assert.deepEqual(literalChar([ParseStatus.notParsed, `'z'`]), [ParseStatus.valid,  ""]);
		assert.deepEqual(literalChar([ParseStatus.notParsed, `'1`]), [ParseStatus.incomplete,  ""]);
		assert.deepEqual(literalChar([ParseStatus.notParsed, `'12`]), [ParseStatus.incomplete,  "2"]);
		assert.deepEqual(literalChar([ParseStatus.notParsed, `A'`]), [ParseStatus.invalid,  "A'"]);
	}); 

	test('parse functions - literalString', () => {
	   assert.deepEqual(literalString([ParseStatus.notParsed, `"" more`]), [ParseStatus.valid,  " more"]);
	   assert.deepEqual(literalString([ParseStatus.notParsed, `"Hello World!"`]), [ParseStatus.valid,  ""]);
	   assert.deepEqual(literalString([ParseStatus.notParsed, `"`]), [ParseStatus.incomplete,  ""]);
	   assert.deepEqual(literalString([ParseStatus.notParsed, `"Hello`]), [ParseStatus.incomplete,  ""]);
	   assert.deepEqual(literalString([ParseStatus.notParsed, `'Hello World!'`]), [ParseStatus.invalid,  "'Hello World!'"]);
   }); 

	test('parse functions - enumValue', () => {
		assert.deepEqual(enumValue([ParseStatus.notParsed, `Colour.red more`]), [ParseStatus.valid,  " more"]);
		assert.deepEqual(enumValue([ParseStatus.notParsed, `Colour.`]), [ParseStatus.incomplete, ""]);
		assert.deepEqual(enumValue([ParseStatus.notParsed, `Colour.Red`]), [ParseStatus.incomplete, "Red"]);
		assert.deepEqual(enumValue([ParseStatus.notParsed, `Colo`]), [ParseStatus.incomplete, ""]);
		assert.deepEqual(enumValue([ParseStatus.notParsed, `colour.red`]), [ParseStatus.invalid, "colour.red"]);
		assert.deepEqual(enumValue([ParseStatus.notParsed, `.red`]), [ParseStatus.invalid, ".red"]);
	}); 

	test('parse functions - literalValue', () => {
		assert.deepEqual(literalValue([ParseStatus.notParsed, `Colour.red more`]), [ParseStatus.valid,  " more"]);
		assert.deepEqual(literalValue([ParseStatus.notParsed, `'z'`]), [ParseStatus.valid,  ""]);
		assert.deepEqual(literalValue([ParseStatus.notParsed, "1.x"]), [ParseStatus.incomplete,  "x"]);
		assert.deepEqual(literalValue([ParseStatus.notParsed, "true more"]), [ParseStatus.valid,  " more"]);
		assert.deepEqual(literalValue([ParseStatus.notParsed, "a1"]), [ParseStatus.invalid,  "a1"]);
		assert.deepEqual(literalValue([ParseStatus.notParsed, `"a1"`]), [ParseStatus.valid,  ""]);
	}); 

	test('parse functions - scopeQualifier', () => {
		assert.deepEqual(scopeQualifier_opt([ParseStatus.notParsed, `xyz`]), [ParseStatus.notParsed,  "xyz"]);
		assert.deepEqual(scopeQualifier_opt([ParseStatus.notParsed, `property.more`]), [ParseStatus.valid,  "more"]);
		assert.deepEqual(scopeQualifier_opt([ParseStatus.notParsed, `global.more`]), [ParseStatus.valid,  "more"]);
		assert.deepEqual(scopeQualifier_opt([ParseStatus.notParsed, `library.more`]), [ParseStatus.valid,  "more"]);
		assert.deepEqual(scopeQualifier_opt([ParseStatus.notParsed, `myLib.more`]), [ParseStatus.notParsed,  "myLib.more"]);
		assert.deepEqual(scopeQualifier_opt([ParseStatus.notParsed, `myLib`]), [ParseStatus.notParsed,  "myLib"]);
	}); 

	test('parse functions - index', () => {
		assert.deepEqual(index_opt([ParseStatus.notParsed, `[2]`]), [ParseStatus.valid, ""]);
		assert.deepEqual(index_opt([ParseStatus.notParsed, `[2`]), [ParseStatus.incomplete, ""]);
		assert.deepEqual(index_opt([ParseStatus.notParsed, `[`]), [ParseStatus.incomplete, ""]);
		assert.deepEqual(index_opt([ParseStatus.notParsed, `[a]`]), [ParseStatus.valid, ""]);
		assert.deepEqual(index_opt([ParseStatus.notParsed, `(2)`]), [ParseStatus.notParsed, "(2)"]);
	});

	test('parse functions - variable', () => {
		assert.deepEqual(variableUse([ParseStatus.notParsed, `a`]), [ParseStatus.valid,  ""]);
		assert.deepEqual(variableUse([ParseStatus.notParsed, `a[23]`]), [ParseStatus.valid,  ""]);
		assert.deepEqual(variableUse([ParseStatus.notParsed, `a[2`]), [ParseStatus.incomplete,  ""]);
		assert.deepEqual(variableUse([ParseStatus.notParsed, `a[`]), [ParseStatus.incomplete,  ""]);
		assert.deepEqual(variableUse([ParseStatus.notParsed, `a[b]`]), [ParseStatus.valid,  ""]);
	}); 

	test('parse functions - value', () => {
		assert.deepEqual(value([ParseStatus.notParsed, `123`]), [ParseStatus.valid,  ""]);
		assert.deepEqual(value([ParseStatus.notParsed, `a`]), [ParseStatus.valid,  ""]);
		assert.deepEqual(value([ParseStatus.notParsed, `"hello"`]), [ParseStatus.valid,  ""]);
		assert.deepEqual(value([ParseStatus.notParsed, `global.a1`]), [ParseStatus.valid,  ""]);
		assert.deepEqual(value([ParseStatus.notParsed, `library.`]), [ParseStatus.incomplete,  ""]);
		assert.deepEqual(value([ParseStatus.notParsed, `global.1`]), [ParseStatus.incomplete,  "1"]);
		assert.deepEqual(value([ParseStatus.notParsed, `a[b]`]), [ParseStatus.valid,  ""]);

		//Problem here: why parsing as a variable. Poss error in SEQ when ends (or just has) an optional element
		assert.deepEqual(variableUse([ParseStatus.notParsed, `{a,b}`]), [ParseStatus.invalid,  "{a,b}"]);
		assert.deepEqual(value([ParseStatus.notParsed, `{a,b}`]), [ParseStatus.invalid,  "{a,b}"]);
	}); 

	test('parse functions - argsList', () => {
		assert.deepEqual(argsList([ParseStatus.notParsed, `1, 2, 3`]), [ParseStatus.valid,  ""]);
		assert.deepEqual(argsList([ParseStatus.notParsed, `a, b[2], c[d], "hello", 'c', true`]), [ParseStatus.valid,  ""]);
		assert.deepEqual(argsList([ParseStatus.notParsed, `a, b[2], c[d],,`]), [ParseStatus.incomplete,  ","]);
		assert.deepEqual(argsList([ParseStatus.notParsed, ``]), [ParseStatus.invalid,  ""]);
		assert.deepEqual(argsList([ParseStatus.notParsed, `a b[2]`]), [ParseStatus.valid,  " b[2]"]);
		assert.deepEqual(argsList([ParseStatus.notParsed, `a, `]), [ParseStatus.incomplete,  ""]);
	});

	test('parse functions - identifierList', () => {
		assert.deepEqual(identifierList([ParseStatus.notParsed, `a, bc, c1_d`]), [ParseStatus.valid,  ""]);
		assert.deepEqual(identifierList([ParseStatus.notParsed, `a`]), [ParseStatus.valid,  ""]);
		assert.deepEqual(identifierList([ParseStatus.notParsed, `a,`]), [ParseStatus.incomplete,  ""]);
		assert.deepEqual(identifierList([ParseStatus.notParsed, ``]), [ParseStatus.invalid,  ""]);
		assert.deepEqual(identifierList([ParseStatus.notParsed, `Foo`]), [ParseStatus.invalid,  "Foo"]);
		assert.deepEqual(identifierList([ParseStatus.notParsed, `a[1]`]), [ParseStatus.valid,  "[1]"]);
	});

	test('parse functions - variableDotIdentifier', () => {
		assert.deepEqual(variableDotMember([ParseStatus.notParsed, `foo`]), [ParseStatus.incomplete,  ""]);
		assert.deepEqual(variableDotMember([ParseStatus.notParsed, `foo.bar`]), [ParseStatus.valid,  ""]);
		assert.deepEqual(variableDotMember([ParseStatus.notParsed, `Foo.bar`]), [ParseStatus.invalid,  "Foo.bar"]);
		assert.deepEqual(variableDotMember([ParseStatus.notParsed, `foo.Bar`]), [ParseStatus.incomplete,  "Bar"]);
		assert.deepEqual(variableDotMember([ParseStatus.notParsed, `foo:bar`]), [ParseStatus.incomplete,  ":bar"]);
		assert.deepEqual(variableDotMember([ParseStatus.notParsed, `charMap.fillBackground()`]), [ParseStatus.valid,  "()"]);
	});

	test('parse functions - procedureRef', () => {
		assert.deepEqual(procedureRef([ParseStatus.notParsed, `foo`]), [ParseStatus.valid,  ""]);
		assert.deepEqual(procedureRef([ParseStatus.notParsed, `foo.bar`]), [ParseStatus.valid,  ""]);
		assert.deepEqual(procedureRef([ParseStatus.notParsed, `Foo.bar`]), [ParseStatus.invalid,  "Foo.bar"]);
		assert.deepEqual(procedureRef([ParseStatus.notParsed, `foo.Bar`]), [ParseStatus.incomplete,  "Bar"]);
		assert.deepEqual(procedureRef([ParseStatus.notParsed, `foo:bar`]), [ParseStatus.valid,  ":bar"]);
		assert.deepEqual(procedureRef([ParseStatus.notParsed, `charMap.fillBackground()`]), [ParseStatus.valid,  "()"]);
	}); 

	test('parse functions - anythingBetweenBrackets', () => {
		assert.deepEqual(anythingBetweenBrackets([ParseStatus.notParsed, `(3 + 4)`]), [ParseStatus.valid,  ""]);
		assert.deepEqual(anythingBetweenBrackets([ParseStatus.notParsed, `((3+4)*5)`]), [ParseStatus.valid,  ""]);
		assert.deepEqual(anythingBetweenBrackets([ParseStatus.notParsed, `((3+4)*5)()`]), [ParseStatus.valid,  "()"]);
		assert.deepEqual(anythingBetweenBrackets([ParseStatus.notParsed, `3+4)*5)()`]), [ParseStatus.invalid,  "3+4)*5)()"]);
	});

	test('parse functions - assignableValue', () => {
		assert.deepEqual(assignableValue([ParseStatus.notParsed, `a`]), [ParseStatus.valid,  ""]);
		assert.deepEqual(assignableValue([ParseStatus.notParsed, `(a, b)`]), [ParseStatus.valid,  ""]);
		assert.deepEqual(assignableValue([ParseStatus.notParsed, `(a, b`]), [ParseStatus.incomplete,  ""]);
		assert.deepEqual(assignableValue([ParseStatus.notParsed, `a, b`]), [ParseStatus.valid,  ", b"]);
		assert.deepEqual(assignableValue([ParseStatus.notParsed, `{x:xs}`]), [ParseStatus.valid,  ""]);
		assert.deepEqual(assignableValue([ParseStatus.notParsed, `{()`]), [ParseStatus.incomplete,  "()"]);
	});
});
