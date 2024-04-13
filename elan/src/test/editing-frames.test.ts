import * as vscode from 'vscode';
import { T03_mainWithAllStatements, T05_classes } from './milestone_1.functions.';
import {ctrl_down, ctrl_up, del, down, enter, ins, shift_down, shift_enter, shift_ins, up } from './testHelpers';
import assert from 'assert';
import { Function } from '../frames/globals/function';
import { Constructor } from '../frames/class-members/constructor';

suite('Editing Frames', () => {
	vscode.window.showInformationMessage('Start all unit tests.');

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
	test('Move multi-selection', () => {
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

