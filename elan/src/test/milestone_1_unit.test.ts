import * as vscode from 'vscode';
import { T03_mainWithAllStatements, T04_allGlobalsExceptClass, T05_classes } from './milestone_1.functions.';
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

		assertElementsById(preDom, "const0", '');
		assertElementsById(postDom, "const0", 'selected focused');
	});

	test('SelectLast', () => {
		const ff = T04_allGlobalsExceptClass();
		const preDom = new jsdom.JSDOM(ff.renderAsHtml());
		ff.selectLast();
		const postDom = new jsdom.JSDOM(ff.renderAsHtml());

		assertElementsById(preDom, "enum19", 'multiline');
		assertElementsById(postDom, "enum19", 'multiline selected focused');
	});

	test('SelectFirstChild', () => {
		const ff = T03_mainWithAllStatements();
		const preDom = new jsdom.JSDOM(ff.renderAsHtml());
		ff.selectFirstChild();
		const postDom = new jsdom.JSDOM(ff.renderAsHtml());

		assertElementsById(preDom, "main0", 'multiline');
		assertElementsById(postDom, "main0", 'multiline selected focused');
	});

	test('SelectNextTextByID', () => {
		const ff = T03_mainWithAllStatements();
		const preDom = new jsdom.JSDOM(ff.renderAsHtml());
		ff.selectNextTextByID("var3");
		const postDom = new jsdom.JSDOM(ff.renderAsHtml());

		assertElementsById(preDom, "ident4", 'empty');
		assertElementsById(postDom, "ident4", 'selected focused empty');
	});

	test('SelectLastByID Global', () => {
		const ff = T04_allGlobalsExceptClass();
		const preDom = new jsdom.JSDOM(ff.renderAsHtml());
		ff.selectLastByID("const0");
		const postDom = new jsdom.JSDOM(ff.renderAsHtml());

		assertElementsById(preDom, "enum19", 'multiline');
		assertElementsById(postDom, "enum19", 'multiline selected focused');
	});

	test('SelectLastByID Statement', () => {
		const ff = T04_allGlobalsExceptClass();
		const preDom = new jsdom.JSDOM(ff.renderAsHtml());
		ff.selectLastByID("statementSelect15");
		const postDom = new jsdom.JSDOM(ff.renderAsHtml());

		assertElementsById(preDom, "return17", '');
		assertElementsById(postDom, "return17", 'selected focused');
	});

	// test('SelectLastByID Member', () => {
	// 	const ff = T05_classes();
	// 	const preDom = new jsdom.JSDOM(ff.renderAsHtml());
	// 	ff.selectLastByID("constructor4");
	// 	const postDom = new jsdom.JSDOM(ff.renderAsHtml());

	// 	assertElementsById(preDom, "func12", 'multiline ');
	// 	assertElementsById(postDom, "func12", 'multiline selected focused');
	// });
});
