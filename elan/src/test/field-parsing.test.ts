import assert from 'assert';
import * as vscode from 'vscode';
import {Status, genericString, identifier, type, sp, paramDef, optional, optSp, comma, zeroOrMore, oneOrMore, commaSeparatedOneOrMore, paramsList, commaSeparatedZeroOrMore, sequence, OR, literalBoolean, literalInt, literalFloat, literalChar, enumValue, literalValue } from '../frames/fields/field-parsers';

suite('Field Parsing Tests', () => {
	vscode.window.showInformationMessage('Start all unit tests.');

	test('parseField - generic string', () => {
		var kw = "var";
		assert.deepEqual(genericString([Status.NotParsed, "var a set to 3"],kw), [Status.Valid,  " a set to 3"]);
		assert.deepEqual(genericString([Status.NotParsed, "var"],kw), [Status.Valid,  ""]);
		assert.deepEqual(genericString([Status.NotParsed, "variable"],kw), [Status.Valid,  "iable"]);
		assert.deepEqual(genericString([Status.NotParsed, "v"],kw), [Status.Incomplete, ""]);
		assert.deepEqual(genericString([Status.NotParsed, "vax"],kw), [Status.Invalid, "vax"]);
		assert.deepEqual(genericString([Status.NotParsed, "tvar"],kw), [Status.Invalid, "tvar"]);
		//Bad starting points:
		assert.deepEqual(genericString([Status.Invalid, "var"],kw), [Status.Invalid, "var"]);
		assert.deepEqual(genericString([Status.Incomplete, ""],kw), [Status.Incomplete, ""]);
		assert.deepEqual(genericString([Status.NotParsed, ""],kw), [Status.Invalid,  ""]);
	}); 

	test('parseField - identifier', () => {
		assert.deepEqual(identifier([Status.NotParsed, "foo"]), [Status.Valid,  ""]);
		assert.deepEqual(identifier([Status.NotParsed, "foo "]), [Status.Valid,  " "]);
		assert.deepEqual(identifier([Status.NotParsed, "f set to"]), [Status.Valid,  " set to"]);
		assert.deepEqual(identifier([Status.NotParsed, "Foo"]), [Status.Invalid,  "Foo"]);
		//Bad starting points:
		assert.deepEqual(identifier([Status.Invalid, "foo"]), [Status.Invalid, "foo"]);
		assert.deepEqual(identifier([Status.Incomplete, ""]), [Status.Incomplete, ""]);
		assert.deepEqual(identifier([Status.NotParsed, ""]), [Status.Invalid,  ""]);
	}); 

	test('parseField - type', () => {
		assert.deepEqual(type([Status.NotParsed, "Foo"]), [Status.Valid,  ""]);
		assert.deepEqual(type([Status.NotParsed, "Foo "]), [Status.Valid,  " "]);
		assert.deepEqual(type([Status.NotParsed, "foo"]), [Status.Invalid,  "foo"]);
		//Bad starting points:
		assert.deepEqual(type([Status.Invalid, "Foo"]), [Status.Invalid, "Foo"]);
		assert.deepEqual(type([Status.Incomplete, ""]), [Status.Incomplete, ""]);
		assert.deepEqual(type([Status.NotParsed, ""]), [Status.Invalid,  ""]);
	}); 

	test('parseField - sp', () => {
		assert.deepEqual(sp([Status.NotParsed, " abc"]), [Status.Valid,  "abc"]);
		assert.deepEqual(sp([Status.NotParsed, "   def"]), [Status.Valid,  "def"]);
		assert.deepEqual(sp([Status.NotParsed, "ghi"]), [Status.Invalid,  "ghi"]);
		//Bad starting points:
		assert.deepEqual(sp([Status.Invalid, " abc"]), [Status.Invalid, " abc"]);
		assert.deepEqual(sp([Status.Incomplete, ""]), [Status.Incomplete, ""]);
		assert.deepEqual(sp([Status.NotParsed, ""]), [Status.Invalid,  ""]);
	}); 

	test('parseField - optSp', () => {
		assert.deepEqual(optSp([Status.NotParsed, " abc"]), [Status.Valid,  "abc"]);
		assert.deepEqual(optSp([Status.NotParsed, "   def"]), [Status.Valid,  "def"]);
		assert.deepEqual(optSp([Status.NotParsed, "ghi"]), [Status.Valid,  "ghi"]);
		assert.deepEqual(optSp([Status.NotParsed, ""]), [Status.Valid,  ""]);
	}); 

	test('parseField - comma', () => {
		assert.deepEqual(comma([Status.NotParsed, ","]), [Status.Valid,  ""]);
		assert.deepEqual(comma([Status.NotParsed, "   ,    "]), [Status.Valid,  ""]);
		assert.deepEqual(comma([Status.NotParsed, " "]), [Status.Invalid,  " "]);
		assert.deepEqual(comma([Status.NotParsed, ", ,"]), [Status.Valid,  ","]);
	}); 

	test('parseField - sequence', () => {
		assert.deepEqual(sequence([Status.NotParsed, ", bar"], [comma, identifier]), [Status.Valid,  ""]);
		assert.deepEqual(sequence([Status.NotParsed, ", ,"], [comma, identifier]), [Status.Incomplete,  ","]);
		assert.deepEqual(sequence([Status.NotParsed, "bar "], [comma, identifier]), [Status.Invalid,  "bar "]);
	});

	test('parseField - paramDef', () => {
		assert.deepEqual(paramDef([Status.NotParsed, "foo Bar"]), [Status.Valid,  ""]);
		assert.deepEqual(paramDef([Status.NotParsed, "foo   Bar"]), [Status.Valid,  ""]);
		assert.deepEqual(paramDef([Status.NotParsed, "foo Bar more"]), [Status.Valid, " more"]);
		assert.deepEqual(paramDef([Status.NotParsed, "foo "]), [Status.Incomplete,  ""]);
		assert.deepEqual(paramDef([Status.NotParsed, "foo"]), [Status.Incomplete,  ""]);
		assert.deepEqual(paramDef([Status.NotParsed, "fooBar"]), [Status.Incomplete,  ""]);
		assert.deepEqual(paramDef([Status.NotParsed, "Foo bar"]), [Status.Invalid,  "Foo bar"]);
		assert.deepEqual(paramDef([Status.NotParsed, "foo, "]), [Status.Incomplete,  ", "]);
		//foo, 
	}); 

	test('parseField - optional', () => {
		assert.deepEqual(optional([Status.NotParsed, "foo"], identifier), [Status.Valid,  ""]);
		assert.deepEqual(optional([Status.NotParsed, ""], identifier), [Status.Valid,  ""]);
		assert.deepEqual(optional([Status.NotParsed, "foo set to"], identifier), [Status.Valid,  " set to"]);
		assert.deepEqual(optional([Status.NotParsed, "Foo"], identifier), [Status.Valid,  "Foo"]);

		assert.deepEqual(optional([Status.NotParsed, "foo"], paramDef), [Status.Incomplete,  ""]);
		assert.deepEqual(optional([Status.NotParsed, "foo Bar"], paramDef), [Status.Valid,  ""]);
		assert.deepEqual(optional([Status.NotParsed, "Foo Bar"], paramDef), [Status.Valid,  "Foo Bar"]);
	}); 

	test('parseField - zeroOrMore', () => {
		assert.deepEqual(zeroOrMore([Status.NotParsed, " , ,, ,   ,,,  "], comma), [Status.Valid,  ""]);
		assert.deepEqual(zeroOrMore([Status.NotParsed, ""], comma), [Status.Valid,  ""]);
	}); 

	test('parseField - oneOrMore', () => {
		assert.deepEqual(oneOrMore([Status.NotParsed, " , ,, ,   ,,,  "], comma), [Status.Valid,  ""]);
		assert.deepEqual(oneOrMore([Status.NotParsed, ""], comma), [Status.Invalid,  ""]);
		assert.deepEqual(oneOrMore([Status.NotParsed, "x,y"], comma), [Status.Invalid,  "x,y"]);
	}); 

	test('parseField - commaSeparatedOneOrMore - identifiers', () => {
		assert.deepEqual(commaSeparatedOneOrMore([Status.NotParsed, "foo , bar ,a, yon"], identifier), [Status.Valid,  ""]);
		assert.deepEqual(commaSeparatedOneOrMore([Status.NotParsed, "foo , bar ,a, yon ,"], identifier), [Status.Incomplete,  ""]);
		assert.deepEqual(commaSeparatedOneOrMore([Status.NotParsed, "foo  bar"], identifier), [Status.Valid,  "  bar"]);
		assert.deepEqual(commaSeparatedOneOrMore([Status.NotParsed, "1"], identifier), [Status.Invalid,  "1"]);
		assert.deepEqual(commaSeparatedOneOrMore([Status.NotParsed, ", bar"], identifier), [Status.Invalid,  ", bar"]);
		assert.deepEqual(commaSeparatedOneOrMore([Status.NotParsed, "foo  "], identifier), [Status.Valid,  "  "]);
	}); 

	test('parseField - commaSeparatedZeroOrMore - identifiers', () => {
		assert.deepEqual(commaSeparatedZeroOrMore([Status.NotParsed, "foo , bar ,a, yon"], identifier), [Status.Valid,  ""]);
		assert.deepEqual(commaSeparatedZeroOrMore([Status.NotParsed, "foo , bar ,a, yon ,"], identifier), [Status.Incomplete,  ""]);
		assert.deepEqual(commaSeparatedZeroOrMore([Status.NotParsed, "foo  bar"], identifier), [Status.Valid,  "  bar"]);
		assert.deepEqual(commaSeparatedZeroOrMore([Status.NotParsed, "1"], identifier), [Status.Valid,  "1"]);
		assert.deepEqual(commaSeparatedZeroOrMore([Status.NotParsed, "foo  "], identifier), [Status.Valid,  "  "]);
		assert.deepEqual(commaSeparatedZeroOrMore([Status.NotParsed, "foo,  "], identifier), [Status.Incomplete,  ""]);
		assert.deepEqual(commaSeparatedZeroOrMore([Status.NotParsed, ", bar"], identifier), [Status.Valid,  ", bar"]);
	}); 

	test('parseField - paramsList', () => {
		assert.deepEqual(paramsList([Status.NotParsed, "foo String , bar Int ,a Char, yon Float"]), [Status.Valid,  ""]);
		assert.deepEqual(paramsList([Status.NotParsed, "foo String"]), [Status.Valid,  ""]);
		assert.deepEqual(paramsList([Status.NotParsed, "foo String , "]), [Status.Incomplete,  ""]);
		assert.deepEqual(paramsList([Status.NotParsed, "foo, "]), [Status.Incomplete,  ", "]);
		assert.deepEqual(paramsList([Status.NotParsed, "foo String , bar "]), [Status.Incomplete,  ""]);
		assert.deepEqual(paramsList([Status.NotParsed, "foo String , Bar"]), [Status.Incomplete,  "Bar"]);
		assert.deepEqual(paramsList([Status.NotParsed, "foo string"]), [Status.Incomplete,  "string"]);
		assert.deepEqual(paramsList([Status.NotParsed, "Foo String"]), [Status.Valid,  "Foo String"]);
	}); 

	test('parseField - or', () => {
		assert.deepEqual(OR([Status.NotParsed, "foo"], [type, identifier]), [Status.Valid,  ""]);
		assert.deepEqual(OR([Status.NotParsed, "String"], [type, identifier]), [Status.Valid,  ""]);
		assert.deepEqual(OR([Status.NotParsed, "foo String"], [type, identifier]), [Status.Valid,  " String"]);
		assert.deepEqual(OR([Status.NotParsed, "123"], [type, identifier]), [Status.Invalid,  "123"]);
	}); 

	test('parseField - literalBoolean', () => {
		assert.deepEqual(literalBoolean([Status.NotParsed, "true more"]), [Status.Valid,  " more"]);
		assert.deepEqual(literalBoolean([Status.NotParsed, "false"]), [Status.Valid,  ""]);
		assert.deepEqual(literalBoolean([Status.NotParsed, "tr"]), [Status.Incomplete,  ""]);
		assert.deepEqual(literalBoolean([Status.NotParsed, "f"]), [Status.Incomplete,  ""]);
		assert.deepEqual(literalBoolean([Status.NotParsed, "tr ue"]), [Status.Invalid,  "tr ue"]);
	}); 

	test('parseField - literalInt', () => {
		assert.deepEqual(literalInt([Status.NotParsed, "30564 more"]), [Status.Valid,  " more"]);
		assert.deepEqual(literalInt([Status.NotParsed, "0 more"]), [Status.Valid,  " more"]);
		assert.deepEqual(literalInt([Status.NotParsed, "-3"]), [Status.Invalid,  "-3"]);
		assert.deepEqual(literalInt([Status.NotParsed, "3.141"]), [Status.Valid,  ".141"]);
	}); 

	//TODO add Exponent
	test('parseField - literalFloat', () => {
		assert.deepEqual(literalFloat([Status.NotParsed, "3.141 more"]), [Status.Valid,  " more"]);
		assert.deepEqual(literalFloat([Status.NotParsed, "0.0"]), [Status.Valid,  ""]);
		assert.deepEqual(literalFloat([Status.NotParsed, "0"]), [Status.Incomplete,  ""]);
		assert.deepEqual(literalFloat([Status.NotParsed, "1."]), [Status.Incomplete,  ""]);
		assert.deepEqual(literalFloat([Status.NotParsed, "1.x"]), [Status.Incomplete,  "x"]);
		assert.deepEqual(literalFloat([Status.NotParsed, "a1"]), [Status.Invalid,  "a1"]);
		assert.deepEqual(literalFloat([Status.NotParsed, ""]), [Status.Invalid,  ""]);
	}); 

	//TODO: cope with unicode ?
	test('parseField - literalChar', () => {
	 	assert.deepEqual(literalChar([Status.NotParsed, `'A' more`]), [Status.Valid,  " more"]);
		assert.deepEqual(literalChar([Status.NotParsed, `'z'`]), [Status.Valid,  ""]);
		assert.deepEqual(literalChar([Status.NotParsed, `'1`]), [Status.Incomplete,  ""]);
		assert.deepEqual(literalChar([Status.NotParsed, `'12`]), [Status.Incomplete,  "2"]);
		assert.deepEqual(literalChar([Status.NotParsed, `A'`]), [Status.Invalid,  "A'"]);
	}); 

	test('parseField - enumValue', () => {
		assert.deepEqual(enumValue([Status.NotParsed, `Colour.red more`]), [Status.Valid,  " more"]);
		assert.deepEqual(enumValue([Status.NotParsed, `Colour.`]), [Status.Incomplete, ""]);
		assert.deepEqual(enumValue([Status.NotParsed, `Colour.Red`]), [Status.Incomplete, "Red"]);
		assert.deepEqual(enumValue([Status.NotParsed, `Colo`]), [Status.Incomplete, ""]);
		assert.deepEqual(enumValue([Status.NotParsed, `colour.red`]), [Status.Invalid, "colour.red"]);
		assert.deepEqual(enumValue([Status.NotParsed, `.red`]), [Status.Invalid, ".red"]);
	}); 

	test('parseField - literalValue', () => {
		assert.deepEqual(literalValue([Status.NotParsed, `Colour.red more`]), [Status.Valid,  " more"]);
		assert.deepEqual(literalChar([Status.NotParsed, `'z'`]), [Status.Valid,  ""]);
		assert.deepEqual(literalFloat([Status.NotParsed, "1.x"]), [Status.Incomplete,  "x"]);
		assert.deepEqual(literalBoolean([Status.NotParsed, "true more"]), [Status.Valid,  " more"]);
		assert.deepEqual(literalFloat([Status.NotParsed, "a1"]), [Status.Invalid,  "a1"]);
	}); 
});