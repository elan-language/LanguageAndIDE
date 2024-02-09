import * as vscode from 'vscode';
import { T00_emptyFile, T04_allGlobalsExceptClass } from './milestone_1.functions.';
import { assertClasses, assertElementContainsHtml, assertHtml, key } from './testHelpers';
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
			["select4", "valid empty", "selected focused valid empty"]);
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

	test('Key on Global Selector - main', () => {
		var file = T00_emptyFile();
		assertElementContainsHtml(file, "select0", `<text></text><placeholder>new code</placeholder><help> main procedure function class constant enum #</help>`);
		file.getById("select0").processKey(key("m"));
		assertElementContainsHtml(file, "main1", `
<top><expand>+</expand><keyword>main</keyword></top>
<statement class="valid empty" id="select2" tabindex="0"><text></text><placeholder>new code</placeholder><help> call each for if print repeat set switch throw try var while #</help></statement>
<keyword>end main</keyword>
`);
	});

	test('Key on Global Selector = procedure', () => {
		var file = T00_emptyFile();
		assertElementContainsHtml(file, "select0", `<text></text><placeholder>new code</placeholder><help> main procedure function class constant enum #</help>`);
		file.getById("select0").processKey(key("p"));
		assertElementContainsHtml(file, "proc1", `
<top><expand>+</expand><keyword>procedure </keyword><field id="ident3" class="empty incomplete" tabindex="0"><text></text><placeholder>name</placeholder><help></help></field>(<field id="params4" class="empty optional valid" tabindex="0"><text></text><placeholder>parameter definitions</placeholder><help></help></field>)</top>
<statement class="valid empty" id="select2" tabindex="0"><text></text><placeholder>new code</placeholder><help> call each for if print repeat set switch throw try var while #</help></statement>
<keyword>end procedure</keyword>
`);
	});
	
});
