import * as vscode from 'vscode';
import { T03_mainWithAllStatements, T04_allGlobalsExceptClass } from './testFrameFunctions';
import * as jsdom from 'jsdom';
import assert from 'assert';

function assertElementsById(dom : jsdom.JSDOM, id: string, expected: string){
	const e = dom.window.document.getElementById(id);
	const c = e?.className;
	assert.strictEqual(c, expected);
}

suite('Milestone 1 - Unit tests', () => {
	vscode.window.showInformationMessage('Start all tests.');

	test('SelectFirst', () => {
		const ff = T04_allGlobalsExceptClass();
		const preDom = new jsdom.JSDOM(ff.renderAsHtml());
		ff.selectFirst();
		const postDom = new jsdom.JSDOM(ff.renderAsHtml());

		assertElementsById(preDom, "const2", '');
		assertElementsById(postDom, "const2", 'selected focused');
	});

	test('SelectLast', () => {
		const ff = T04_allGlobalsExceptClass();
		const preDom = new jsdom.JSDOM(ff.renderAsHtml());
		ff.selectLast();
		const postDom = new jsdom.JSDOM(ff.renderAsHtml());

		assertElementsById(preDom, "enum21", 'multiline');
		assertElementsById(postDom, "enum21", 'multiline selected focused');
	});

	test('SelectFirstChild', () => {
		const ff = T03_mainWithAllStatements();
		const preDom = new jsdom.JSDOM(ff.renderAsHtml());
		ff.selectFirstChild();
		const postDom = new jsdom.JSDOM(ff.renderAsHtml());

		assertElementsById(preDom, "main0", 'multiline');
		assertElementsById(postDom, "main0", 'multiline selected focused');
	});
});
