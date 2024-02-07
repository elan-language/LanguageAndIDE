import * as vscode from 'vscode';
import { T00_emptyFile, T04_allGlobalsExceptClass } from './milestone_1.functions.';
import { assertClasses, assertHtml, key } from './testHelpers';
import { isField, isParent } from '../frames/helpers';

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

	test('Key on Global Selector', () => {
		assertHtml(
			T00_emptyFile,
			(ff) => {
				const s = ff.getById("select0");
				s.processKey(key("m"));
			},
			["main1", `
<top><expand>+</expand><keyword>main</keyword></top>
<statement class="valid" id="select2" tabindex="0"><prompt>new code</prompt></statement>
<keyword>end main</keyword>
`]);
	});

	
});
