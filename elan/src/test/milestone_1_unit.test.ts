import * as vscode from 'vscode';
import { T04_allGlobalsExceptClass } from './milestone_1.functions.';
import { assertClasses } from './testHelpers';
import { isParent } from '../frames/helpers';

suite('Milestone 1 - Unit tests', () => {
	vscode.window.showInformationMessage('Start all unit tests.');

	test('Selectable Select', () => {
		assertClasses(
			T04_allGlobalsExceptClass,
			(ff) => {
				const frame = ff.getById("const0");
				frame.select(true, false);
			},
			["const0", "valid", "selected focused valid"]);

	});

	test('Select First Child', () => {
		assertClasses(
			T04_allGlobalsExceptClass,
			(ff) => {
				const mn = ff.getById("main3");
				if (isParent(mn)){
					const s = mn.getFirstChild();
					s.select(true, false);
				}
			},
			["select4", "valid", "selected focused valid"]);
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
