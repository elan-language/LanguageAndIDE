import assert from 'assert';
import * as vscode from 'vscode';
import {Status, genericString, identifier, type, sp, paramDef, optional, optSp, comma, zeroOrMore } from '../frames/fields/field-parsers';

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

	test('parseField - paramDef', () => {
		assert.deepEqual(paramDef([Status.NotParsed, "foo Bar"]), [Status.Valid,  ""]);
		assert.deepEqual(paramDef([Status.NotParsed, "foo Bar more"]), [Status.Valid, " more"]);
		assert.deepEqual(paramDef([Status.NotParsed, "foo "]), [Status.Incomplete,  ""]);
		assert.deepEqual(paramDef([Status.NotParsed, "foo"]), [Status.Incomplete,  ""]);
		assert.deepEqual(paramDef([Status.NotParsed, "Foo bar"]), [Status.Invalid,  "Foo bar"]);
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
	}); 
});