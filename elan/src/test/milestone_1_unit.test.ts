import * as vscode from 'vscode';
import { T00_emptyFile, T03_mainWithAllStatements, T04_allGlobalsExceptClass, T09_emptyMainAndClassWithGlobalSelector } from './milestone_1.functions.';
import { assertClasses, assertElementContainsHtml, assertElementHasClasses, assertHtml, key } from './testHelpers';
import { isField, isParent } from '../frames/helpers';
import assert from 'assert';

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

	test('Invalid identifier', () => {
		var file = T03_mainWithAllStatements();
		assertElementHasClasses(file, "fileStatus", "incomplete");
		assertElementHasClasses(file, "var2", "incomplete"); 
		file.getById("ident3").processKey(key("X"));
		assertElementHasClasses(file, "var2", "invalid");
		assertElementHasClasses(file, "fileStatus", "invalid");
	});

	test('Valid identifier', () => {
		var file = T03_mainWithAllStatements();
		assertElementHasClasses(file, "fileStatus", "incomplete");
		assertElementHasClasses(file, "var2", "incomplete"); 
		file.getById("ident3").processKey(key("q"));
		assertElementHasClasses(file, "ident3", "valid");
		assertElementHasClasses(file, "fileStatus", "incomplete"); //Because there are other incomplete fields
	});

	test('Valid variable statement', () => {
		var file = T03_mainWithAllStatements();
		assertElementHasClasses(file, "fileStatus", "incomplete");
		assertElementHasClasses(file, "var2", "incomplete"); 
		file.getById("ident3").processKey(key("q"));
		file.getById("expr4").processKey(key("5"));
		assertElementHasClasses(file, "var2", "valid");
	});

	test("Statement Select - variable", () => {
		var file = T09_emptyMainAndClassWithGlobalSelector();
		file.getById("select1").processKey(key("v"));
		var v = file.getById("var17").renderAsSource();
		assert.equal(v, '  var name set to value or expression');
	});	
	
	test("Member Select - function", () => {
		var file = T09_emptyMainAndClassWithGlobalSelector();
		file.getById("select8").processKey(key("f"));
		var v = file.getById("func17").renderAsSource();
		assert.equal(v, '  function name(parameter definitions) as return type\r\n' +
		'    \r\n' +
		'    return value or expression\r\n' +
		'  end function\r\n');
/* 	});	
	test("Member Select - dynamic help & auto-completion", () => {
		var file = T09_emptyMainAndClassWithGlobalSelector();
		assertElementContainsHtml(file, "select8","<text></text><placeholder>new code</placeholder><help> function procedure property</help>");
		file.getById("select8").processKey(key("p"));
		assertElementContainsHtml(file, "select8","<text>pro</text><placeholder>new code</placeholder><help> procedure property</help>");
		file.getById("select8").processKey(key("c"));
		var v = file.getById("proc17").renderAsSource();
		assert.equal(v, '  function name(parameter definitions) as return type\r\n' +
		'    \r\n' +
		'    return value or expression\r\n' +
		'  end function\r\n');
	});	 */
});	
