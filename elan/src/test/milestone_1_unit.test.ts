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

	test('Collapse Main', () => {
		assertClasses(
			T04_allGlobalsExceptClass,
			(ff) => {
				const mn = ff.getById("main3");
				if (isParent(mn)){
					mn.collapse();
				}
			},
			["main3", "multiline valid", "multiline collapsed valid"]);
	});

	// not implemented exception
	// test('Key on Global Selector', () => {
	// 	assertClasses(
	// 		T00_emptyFile,
	// 		(ff) => {
	// 			const fld = ff.getById("globalSelect1");
	// 			if (isField(fld)){
	// 				fld.processKey(key("a"));
	// 			}
	// 		},
	// 		["globalSelect1", "multiline valid", "multiline collapsed valid"]);
	// });

	
});
