import * as vscode from 'vscode';
import { T04_allGlobalsExceptClass } from './milestone_1.functions.';
import { assertElementsById, readAsDOM } from './testHelpers';
import { isParent } from '../frames/helpers';
import assert from 'assert';

suite('Milestone 1 - Unit tests', () => {
	vscode.window.showInformationMessage('Start all unit tests.');

	test('Selectable Select', () => {
		const ff = T04_allGlobalsExceptClass();
		const preDom = readAsDOM(ff);
		const frame = ff.getById("const0");
		frame.select(true, false);
		const postDom = readAsDOM(ff);

		assertElementsById(preDom, "const0", 'valid');
		assertElementsById(postDom, "const0", 'selected focused valid');
	});

	test('Select First Child', () => {
		const ff = T04_allGlobalsExceptClass();
		const preDom = readAsDOM(ff);
		const mn = ff.getById("main3");

		if (isParent(mn)){
			const s = mn.getFirstChild();
			s.select(true, false);

			const postDom = readAsDOM(ff);

			assertElementsById(preDom, "select4", 'valid');
			assertElementsById(postDom, "select4", 'selected focused valid');
		}
		else {
			assert.fail("expect main to be parent");
		}
	});

	/*	test('SelectFirstChild', () => {
			const ff = T03_mainWithAllStatements();
			const preDom = new jsdom.JSDOM(ff.renderAsHtml());
			ff.selectFirstChild(false);
			const postDom = new jsdom.JSDOM(ff.renderAsHtml());
	
			assertElementsById(preDom, "main0", 'multiline');
			assertElementsById(postDom, "main0", 'multiline selected focused');
		});
	
		test('SelectNextTextByID', () => {
			const ff = T03_mainWithAllStatements();
			const preDom = new jsdom.JSDOM(ff.renderAsHtml());
			ff.getByIdselectNextTextByID("var2");
			const postDom = new jsdom.JSDOM(ff.renderAsHtml());
	
			assertElementsById(preDom, "ident3", 'empty');
			assertElementsById(postDom, "ident3", 'selected focused empty');
		});
	
		test('SelectLastByID Global', () => {
			const ff = T04_allGlobalsExceptClass();
			const preDom = new jsdom.JSDOM(ff.renderAsHtml());
			ff.selectLastByID("const0");
			const postDom = new jsdom.JSDOM(ff.renderAsHtml());
	
			assertElementsById(preDom, "enum16", 'multiline');
			assertElementsById(postDom, "enum16", 'multiline selected focused');
		}); */

	// test('SelectLastByID Statement', () => {
	// 	const ff = T04_allGlobalsExceptClass();
	// 	const preDom = new jsdom.JSDOM(ff.renderAsHtml());
	// 	ff.selectLastByID("statementSelect13");
	// 	const postDom = new jsdom.JSDOM(ff.renderAsHtml());

	// 	assertElementsById(preDom, "return17", '');
	// 	assertElementsById(postDom, "return17", 'selected focused');
	// });

	// test('SelectLastByID Member', () => {
	// 	const ff = T05_classes();
	// 	const preDom = new jsdom.JSDOM(ff.renderAsHtml());
	// 	ff.selectLastByID("constructor4");
	// 	const postDom = new jsdom.JSDOM(ff.renderAsHtml());

	// 	assertElementsById(preDom, "func12", 'multiline ');
	// 	assertElementsById(postDom, "func12", 'multiline selected focused');
	// });
});
