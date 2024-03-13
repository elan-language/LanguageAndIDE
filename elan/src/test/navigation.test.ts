import * as vscode from 'vscode';
import { T03_mainWithAllStatements, T05_classes } from './milestone_1.functions.';
import {ctrl_down, ctrl_up, del, down, end, enter, esc, home, ins, key, loadFileAsModel, readAsDOM, right, shift_down, shift_enter, shift_ins, shift_tab, shift_up, tab, up } from './testHelpers';
import assert from 'assert';
import { Identifier } from '../frames/fields/identifier';
import { Expression } from '../frames/fields/expression';
import { Function } from '../frames/globals/function';

import { Constructor } from '../frames/class-members/constructor';


suite('Navigation', () => {
	vscode.window.showInformationMessage('Start all unit tests.');

	test('Tabbing through fields (& back)', () => {

		var file = T03_mainWithAllStatements();
		var var4 = file.getById("var4") as Identifier;
		assert.equal(var4.isSelected(), false);
		file.processKey(enter());
		assert.equal(var4.isSelected(), true);
		var expr5 = file.getById("expr5") as Expression;
		assert.equal(expr5.isSelected(), false);
		var4.processKey(tab());
		assert.equal(var4.isSelected(), false);
		assert.equal(expr5.isSelected(), true);
		expr5.processKey(tab());
		var expr7 = file.getById("expr7") as Expression;
		assert.equal(expr7.isSelected(), true);
		expr7.processKey(enter());
		var expr8 = file.getById("expr8") as Expression;
		assert.equal(expr8.isSelected(), true);
		expr8.processKey(shift_tab());
		assert.equal(expr8.isSelected(), false);
		assert.equal(expr7.isSelected(), true);
		expr7.processKey(shift_enter());
		assert.equal(expr7.isSelected(), false);
		assert.equal(expr5.isSelected(), true);
		expr5.processKey(shift_enter());
		assert.equal(expr5.isSelected(), false);
		assert.equal(var4.isSelected(), true);
	});
	test('Tabbing through ALL fields (& back)', () => {
		var file = T05_classes();
		var fields = ["text3","type2","text4","args5","params8",
		"select7","ident11","type12","select9","text15","type14","text16","args17",
	"params20","select19",
"ident23", "type24", 
"ident27", "params28", "type29",
"select26",
"expr31",
"select21",
"select0"];
		file.processKey(enter());
		var field = file.getById(fields[0]);
		for (var i in fields) {
			field = file.getById(fields[i]);
			assert.equal(field.isSelected(), true);
			field.processKey(enter());
		}
		//Check that one more tab does not move beyond last field
		field.processKey(enter());
		assert.equal(field.isSelected(), true);
		file.processKey(esc());
		file.processKey(shift_enter());
		for (var i in fields.reverse()) {
			field = file.getById(fields[i]);
			assert.equal(field.isSelected(), true);
			field.processKey(shift_enter());
		}
		//Check that one more tab does not move beyond first field
		field.processKey(shift_enter());
		assert.equal(field.isSelected(), true);
		field.processKey(esc());
		assert.equal(field.isSelected(), false);
	});

	test('Shift-Enter from first field in first global', () => {
			var file = T05_classes();
			file.processKey(enter());
			var field = file.getById("text3");
			assert.equal(field.isSelected(), true);
			field.processKey(shift_enter());
			assert.equal(field.isSelected(), true);
	});
	test('Shift-enter from first field in a main (that is also first in file', () => {
		var file = T03_mainWithAllStatements();
		var var4 = file.getById("var4");
		assert.equal(var4.isSelected(), false);
		file.processKey(enter());
		assert.equal(var4.isSelected(), true);
		var4.processKey(shift_enter());
		assert.equal(var4.isSelected(), true);
	});

	test('Selecting frames', () => {
		var file = T03_mainWithAllStatements();
		var main = file.getById("main1");
		var global_select = file.getById("select0");
		var main_st_1 = file.getById("var3");
		assert.equal(main_st_1.isSelected(), false);
		var main_st_2 = file.getById("set6");
		assert.equal(main_st_2.isSelected(), false);
		var main_st_penult = file.getById("switch59");
		assert.equal(main_st_penult.isSelected(), false);
		var main_st_last = file.getById("select2");
		assert.equal(main_st_last.isSelected(), false);
		assert.equal(main.isSelected(), false);
		assert.equal(global_select.isSelected(), false);
		file.processKey(home());
		assert.equal(main.isSelected(), true);
		assert.equal(global_select.isSelected(), false);
		main.processKey(esc());
		assert.equal(main.isSelected(), false);
		assert.equal(global_select.isSelected(), false);;
		file.processKey(end());
		assert.equal(global_select.isSelected(), true);
		global_select.processKey(up());
		assert.equal(global_select.isSelected(), false);
		assert.equal(main.isSelected(), true);
		main.processKey(right());
		assert.equal(main.isSelected(), false);
		assert.equal(main_st_1.isSelected(), true);
		main_st_1.processKey(end());
		assert.equal(main_st_1.isSelected(), false);
		assert.equal(main_st_last.isSelected(), true);
		main_st_last.processKey(up());
		assert.equal(main_st_last.isSelected(), false);
		assert.equal(main_st_penult.isSelected(), true);
		main_st_penult.processKey(right());
		assert.equal(main_st_penult.isSelected(), false);
		var select = file.getById("select60");
		assert.equal(select.isSelected(), true);
		select.processKey(down());
		var def = file.getById("default62");
		assert.equal(def.isSelected(), true);
	});
	test('Insert frame', () => {
		var file = T03_mainWithAllStatements();
		var if_st = file.getById("if43");
		if_st.processKey(ins());
		var newSel = file.getById("select64");
		assert.equal(if_st.isSelected(), false);
		assert.equal(newSel.isSelected(), true);
		newSel.processKey(down());
		assert.equal(if_st.isSelected(), true);
		assert.equal(newSel.isSelected(), false);
		if_st.processKey(shift_ins());
		var newSel2 = file.getById("select65");
		assert.equal(if_st.isSelected(), false);
		newSel2.processKey(up());
		assert.equal(if_st.isSelected(), true);
	});	
	test('Move', () => {
		var file = T03_mainWithAllStatements();
		var if_st = file.getById("if43");
		var try_st = file.getById("try54");
		assert.equal(try_st.isSelected(), false);
		if_st.processKey(down());
		assert.equal(try_st.isSelected(), true);
		try_st.processKey(up());
		assert.equal(if_st.isSelected(), true);
		if_st.processKey(ctrl_down());
		assert.equal(if_st.isSelected(), true);
		if_st.processKey(up());
		assert.equal(if_st.isSelected(), false);
		assert.equal(try_st.isSelected(), true);
		if_st.select(true,false);
		if_st.processKey(ctrl_up());
		if_st.processKey(ctrl_up());
		var each = file.getById("if35");
		assert.equal(each.isSelected(), false);
		if_st.processKey(down());
		assert.equal(each.isSelected(), true);
	});
	test('Multi-select and move', () => {
		var file = T03_mainWithAllStatements();
		var whil = file.getById("while16");
		var rep = file.getById("repeat19");
		var fr = file.getById("for22");
		whil.select(true,false);
		whil.processKey(shift_down());
		rep.processKey(shift_down());
		assert.equal(whil.isSelected(), true);
		assert.equal(rep.isSelected(), true);
		assert.equal(fr.isSelected(), true);
		fr.processKey(ctrl_down());
		assert.equal(whil.isSelected(), true);
		assert.equal(rep.isSelected(), true);
		assert.equal(fr.isSelected(), true);
		whil.select(true,false);
		assert.equal(whil.isSelected(), true);
		assert.equal(rep.isSelected(), false);
		assert.equal(fr.isSelected(), false);
		whil.processKey(up());
		var each = file.getById("each28");
		assert.equal(each.isSelected(), true);
	});
	test('Remove selector frame', () => {
		var file = T05_classes();
		var fun = file.getById("func25") as Function;
		var child1 = fun.getFirstChild();
		var sel = file.getById("select26");
		assert.equal(child1, sel);
		var ret = file.getById("return30");
		ret.select(true, false);
		ret.processKey(up());
		assert.equal(ret.isSelected(), false);
		assert.equal(sel.isSelected(), true);
		sel.processKey(del());
		ret.select(true, false);
		ret.processKey(up());
		assert.equal(ret.isSelected(), true);
		child1 = fun.getFirstChild();
		assert.equal(child1, ret);
	});
	test('Cannot remove selector that is only statement', () => {
		var file = T05_classes();
		var cons = file.getById("constructor6") as Constructor;
		var child1 = cons.getFirstChild();
		var sel = file.getById("select7");
		assert.equal(child1, sel);
		sel.processKey(del());
		child1 = cons.getFirstChild();
		assert.equal(child1, sel);
	});
});	

