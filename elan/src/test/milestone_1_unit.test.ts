import * as vscode from 'vscode';
import { T03_mainWithAllStatements, T04_allGlobalsExceptClass, T09_emptyMainAndClassWithGlobalSelector } from './milestone_1.functions.';
import { assertClasses, assertElementHasClasses, key } from './testHelpers';
import { isParent } from '../frames/helpers';
import assert from 'assert';
import { FileImpl } from '../frames/file-impl';
import { Class } from '../frames/globals/class';
import { MemberSelector } from '../frames/class-members/member-selector';
import { MainFrame } from '../frames/globals/main-frame';
import { StatementSelector } from '../frames/statements/statement-selector';
import { GlobalSelector } from '../frames/globals/global-selector';

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
 	});	

	 test("Member Select - procedure", () => {
		var file = T09_emptyMainAndClassWithGlobalSelector();
		file.getById("select8").processKey(key("p"));
		file.getById("select8").processKey(key("c"));
		var v = file.getById("proc17").renderAsSource();
		assert.equal(v, '  procedure name(parameter definitions)\r\n    \r\n  end procedure\r\n');
 	});	

	 test("Global Select - Constant", () => {
		var file = T09_emptyMainAndClassWithGlobalSelector();
		file.getById("select16").processKey(key("c"));
		file.getById("select16").processKey(key("o"));
		var v = file.getById("const17").renderAsSource();
		assert.equal(v, 'constant name set to literal value\r\n');
 	});	

	 test("Selection Filtering - globals", () => {
		const f = new FileImpl();
		var g = new GlobalSelector(f);
		var help = g.getHelp();
		assert.equal(help, " main procedure function class constant enum #");
		g.processKey(key('c'));
		help = g.getHelp();
		assert.equal(help, " class constant");
        assert.equal(g.renderAsHtml(), `<global class="valid" id='select0' tabindex="0"><text>c</text><placeholder>new code</placeholder><help> class constant</help></global>`);
	});	

	test("Selection Filtering - members", () => {
		const f = new FileImpl();
		var c = new Class(f);		
		var s = new MemberSelector(c);
		var help = s.getHelp();
		assert.equal(help, " function procedure property");
		s.processKey(key('p'));
		help = s.getHelp();
		assert.equal(help, " procedure property");
        assert.equal(s.renderAsHtml(), `<member class="valid" id='select14' tabindex="0"><text>pro</text><placeholder>new code</placeholder><help> procedure property</help></member>`);
	});	

	test("Selection Filtering - statements", () => {
		const f = new FileImpl();
		var m = new MainFrame(f);		
		var s = new StatementSelector(m);
		var help = s.getHelp();
		assert.equal(help, " call case catch each else for if print repeat set switch throw try var while #");
		s.processKey(key('s'));
		help = s.getHelp();
		assert.equal(help, " set switch");
        assert.equal(s.renderAsHtml(), `<statement class="valid" id='select2' tabindex="0"><text>s</text><placeholder>new code</placeholder><help> set switch</help></statement>`);
	});	
});	

