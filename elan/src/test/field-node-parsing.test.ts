import * as vscode from 'vscode';
import assert from 'assert';
import { Expression } from '../frames/nodes/expression';
import { ParseStatus } from '../frames/parse-status';


suite('FieldNode parsing', () => {
	vscode.window.showInformationMessage('Start all unit tests.');

	test('Expression 1', () => {
		var exp = new Expression();
		exp.parseText("a");
		assert.equal(exp.status, ParseStatus.valid);
		assert.equal(exp.matchedText, "a");
		assert.equal(exp.remainingText, "");
	});
	test('Expression 2', () => {
		var exp = new Expression();
		exp.parseText("a + b");
		assert.equal(exp.status, ParseStatus.valid);
		assert.equal(exp.matchedText, "a + b");
		assert.equal(exp.remainingText, "");
	});
	test('Expression 3', () => {
		var exp = new Expression();
		exp.parseText("a + b-c");
		assert.equal(exp.status, ParseStatus.valid);
		assert.equal(exp.matchedText, "a + b-c");
		assert.equal(exp.remainingText, "");
	});
	test('Expression 4', () => {
		var exp = new Expression();
		exp.parseText("+");
		assert.equal(exp.status, ParseStatus.invalid);
		assert.equal(exp.matchedText, "");
		assert.equal(exp.remainingText, "+");
	});
	test('Expression 5', () => {
		var exp = new Expression();
		exp.parseText("+b");
		assert.equal(exp.status, ParseStatus.invalid);
		assert.equal(exp.matchedText, "");
		assert.equal(exp.remainingText, "+b");
	});
   test('Expression 6', () => {
		var exp = new Expression();
		exp.parseText("a +");
		assert.equal(exp.status, ParseStatus.incomplete);
		assert.equal(exp.matchedText, "a +");
		assert.equal(exp.remainingText, "");
	});

	//Stopped here - if the whole expression is not covered, then the status should be invalid
/* 	test('Expression 7', () => {
		var exp = new Expression();
		exp.parseText("a %");
		assert.equal(exp.status, ParseStatus.invalid);
		assert.equal(exp.matchedText, "a ");
		assert.equal(exp.remainingText, "%");
	}); */

});