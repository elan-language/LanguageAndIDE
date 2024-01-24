import * as vscode from 'vscode';
import { T03_mainWithAllStatements, T04_allGlobalsExceptClass } from './testFrameFunctions';
import * as jsdom from 'jsdom';
import assert from 'assert';

suite('Milestone 1 - Unit tests', () => {
	vscode.window.showInformationMessage('Start all tests.');

	test('SelectFirst', () => {
		const ff = T04_allGlobalsExceptClass();
		const preDom = new jsdom.JSDOM(ff.renderAsHtml());
		ff.selectFirst();
		const postDom = new jsdom.JSDOM(ff.renderAsHtml());

		const g1 = preDom.window.document.getElementById("const2");
		const g2 = postDom.window.document.getElementById("const2");

		var c1 = g1?.className;
		var c2 = g2?.className;

		assert.strictEqual(c1, '');
		assert.strictEqual(c2, 'selected focused');
	});

	test('SelectLast', () => {
		const ff = T04_allGlobalsExceptClass();
		const preDom = new jsdom.JSDOM(ff.renderAsHtml());
		ff.selectLast();
		const postDom = new jsdom.JSDOM(ff.renderAsHtml());

		const g1 = preDom.window.document.getElementById("enum21");
		const g2 = postDom.window.document.getElementById("enum21");

		var c1 = g1?.className;
		var c2 = g2?.className;

		assert.strictEqual(c1, 'multiline');
		assert.strictEqual(c2, 'multiline selected focused');
	});

	test('SelectFirstChild', () => {
		const ff = T03_mainWithAllStatements();
		const preDom = new jsdom.JSDOM(ff.renderAsHtml());
		ff.selectFirstChild();
		const postDom = new jsdom.JSDOM(ff.renderAsHtml());

		const g1 = preDom.window.document.getElementById("main0");
		const g2 = postDom.window.document.getElementById("main0");

		var c1 = g1?.className;
		var c2 = g2?.className;

		assert.strictEqual(c1, 'multiline');
		assert.strictEqual(c2, 'multiline selected focused');
	});
});
