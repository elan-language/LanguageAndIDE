import * as vscode from "vscode";
import { T03_mainWithAllStatements, T05_classes } from "./model-generating-functions.";
import {
  back,
  ctrl_d,
  ctrl_del,
  ctrl_down,
  ctrl_up,
  ctrl_v,
  ctrl_x,
  del,
  down,
  enter,
  key,
  shift_down,
  shift_enter,
  shift_ins,
  shift_tab,
  tab,
  up,
} from "./testHelpers";
import assert from "assert";
import { GlobalFunction } from "../frames/globals/global-function";
import { Constructor } from "../frames/class-members/constructor";
import { IdentifierField } from "../frames/fields/identifier-field";
import { ExpressionField } from "../frames/fields/expression-field";
import { Property } from "../frames/class-members/property";
import { ClassFrame } from "../frames/globals/class-frame";
import { MemberSelector } from "../frames/class-members/member-selector";
import { StatementSelector } from "../frames/statements/statement-selector";
import { MainFrame } from "../frames/globals/main-frame";
import { ParseStatus } from "../frames/status-enums";
import { ignore_test } from "./compiler/compiler-test-helpers";

suite("Editing Frames", () => {
  vscode.window.showInformationMessage("Start all unit tests.");

  test("Tab from file to first field in first global", () => {
    const file = T05_classes();
    file.processKey(tab());
    const field = file.getById("type2");
    assert.equal(field.isSelected(), true);
    field.processKey(shift_tab());
    assert.equal(field.isSelected(), true);
  });
  test("Shift-tab from file to first field in a main (that is also first in file", () => {
    const file = T03_mainWithAllStatements();
    const var4 = file.getById("var4");
    assert.equal(var4.isSelected(), false);
    file.processKey(tab());
    assert.equal(var4.isSelected(), true);
    var4.processKey(shift_tab());
    assert.equal(var4.isSelected(), true);
  });

  test("Enter on a frame to Insert new code - creating a selector", () => {
    const file = T03_mainWithAllStatements();
    const if_st = file.getById("if37");
    if_st.processKey(shift_enter()); //Insert above
    const newSel = file.getById("select70");
    assert.equal(if_st.isSelected(), false);
    assert.equal(newSel.isSelected(), true);
    newSel.processKey(down());
    assert.equal(if_st.isSelected(), true);
    assert.equal(newSel.isSelected(), false);
    if_st.processKey(enter()); //Insert below
    const newSel2 = file.getById("select71");
    assert.equal(if_st.isSelected(), false);
    newSel2.processKey(up());
    assert.equal(if_st.isSelected(), true);
  });
  test("Enter on a frame does not create a selector if there is already one there", () => {
    const file = T03_mainWithAllStatements();
    const if_st = file.getById("if47");
    if_st.processKey(enter()); //Should insert selector below
    const newSel = file.getById("select70"); //New a selector
    assert.equal(newSel.isSelected(), true);
    newSel.processKey(up()); //Go back up to 'if'
    assert.equal(newSel.isSelected(), false);
    assert.equal(if_st.isSelected(), true);
    if_st.processKey(enter()); //Enter again should not now insert a new selector, but should go to existing
    assert.equal(newSel.isSelected(), true); //Confirm the now-existing selector is selected
    newSel.processKey(up()); //Go back up to confirm that selector is still immediately below
    assert.equal(newSel.isSelected(), false);
    assert.equal(if_st.isSelected(), true);
  });
  test("Enter/shift-enter on a field goes to next/previous field owned by same frame (except the last/field field).", () => {
    const file = T03_mainWithAllStatements();
    const varStatement = file.getById("var3");
    varStatement.select(true, false);
    const var4 = file.getById("var4") as IdentifierField;
    var4.select();
    assert.equal(var4.isSelected(), true);
    const expr5 = file.getById("expr5") as ExpressionField;
    assert.equal(expr5.isSelected(), false);
    var4.processKey(enter());
    assert.equal(var4.isSelected(), false);
    assert.equal(expr5.isSelected(), true);
    expr5.processKey(shift_enter());
    assert.equal(expr5.isSelected(), false);
    assert.equal(var4.isSelected(), true);
  });

  test("Enter on last field in a frame (or shift-enter on first field) - is same effect as that key on the Frame itself", () => {
    const file = T03_mainWithAllStatements();
    const varStatement = file.getById("var3");
    const expr5 = file.getById("expr5") as ExpressionField;
    expr5.select();
    expr5.processKey(enter());
    const newSel = file.getById("select70"); //New selector
    assert.equal(newSel.isSelected(), true);
    newSel.processKey(up());
    assert.equal(newSel.isSelected(), false);
    assert.equal(varStatement.isSelected(), true);

    const var4 = file.getById("var4") as IdentifierField;
    var4.select();
    var4.processKey(shift_enter());
    const newSel2 = file.getById("select71"); //New selector
    assert.equal(newSel2.isSelected(), true);
    newSel2.processKey(down());
    assert.equal(newSel2.isSelected(), false);
    assert.equal(varStatement.isSelected(), true);
  });

  test("Enter on last field in a frame with statements", () => {
    const file = T03_mainWithAllStatements();
    const globSel = file.getById("select0");
    globSel.processKey(key("p"));
    const params = file.getById("params73");
    const stateSel = file.getById("select71");
    assert.equal(stateSel.isSelected(), false);
    params.processKey(enter());
    assert.equal(stateSel.isSelected(), true);
  });

  test("Move", () => {
    const file = T03_mainWithAllStatements();
    const if_st = file.getById("if47");
    const try_st = file.getById("try60");
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
    if_st.select(true, false);
    if_st.processKey(ctrl_up());
    if_st.processKey(ctrl_up());
    const each = file.getById("if37");
    assert.equal(each.isSelected(), false);
    if_st.processKey(down());
    assert.equal(each.isSelected(), true);
  });
  test("Move multi-selection", () => {
    const file = T03_mainWithAllStatements();
    const whil = file.getById("while16");
    const rep = file.getById("repeat19");
    const fr = file.getById("for22");
    whil.select(true, false);
    whil.processKey(shift_down());
    rep.processKey(shift_down());
    assert.equal(whil.isSelected(), true);
    assert.equal(rep.isSelected(), true);
    assert.equal(fr.isSelected(), true);
    fr.processKey(ctrl_down());
    assert.equal(whil.isSelected(), true);
    assert.equal(rep.isSelected(), true);
    assert.equal(fr.isSelected(), true);
    whil.select(true, false);
    assert.equal(whil.isSelected(), true);
    assert.equal(rep.isSelected(), false);
    assert.equal(fr.isSelected(), false);
    whil.processKey(up());
    const each = file.getById("each28");
    assert.equal(each.isSelected(), true);
  });
  test("Remove selector frame", () => {
    const file = T05_classes();
    const fun = file.getById("func27") as GlobalFunction;
    let child1 = fun.getFirstChild();
    const sel = file.getById("select28");
    assert.equal(child1, sel);
    const ret = file.getById("return32");
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
  test("Cannot remove selector that is only statement", () => {
    const file = T05_classes();
    const cons = file.getById("constructor7") as Constructor;
    let child1 = cons.getFirstChild();
    const sel = file.getById("select8");
    assert.equal(child1, sel);
    sel.processKey(del());
    child1 = cons.getFirstChild();
    assert.equal(child1, sel);
  });
  test("Delete frame - Ctrl-Delete", () => {
    const file = T05_classes();
    const cls = file.getById("class1") as ClassFrame;
    let last = cls.getChildren()[1];
    assert.equal(last instanceof Property, true);
    last.processKey(ctrl_del());
    last = cls.getChildren()[1];
    assert.equal(last instanceof MemberSelector, true);
  });
  test("Delete frame  - Ctrl-d", () => {
    const file = T05_classes();
    const cls = file.getById("class1") as ClassFrame;
    let last = cls.getChildren()[1];
    assert.equal(last instanceof Property, true);
    last.processKey(ctrl_d());
    last = cls.getChildren()[1];
    assert.equal(last instanceof MemberSelector, true);
  });
  test("Cut", () => {
    const file = T03_mainWithAllStatements();
    const main = file.getById("main1") as MainFrame;
    const var3 = file.getById("var3");
    var3.processKey(ctrl_x());
    const firstStatement = main.getChildren()[0];
    assert.equal(firstStatement.getHtmlId(), "set6");
  });
  test("Paste", () => {
    const file = T03_mainWithAllStatements();
    const main = file.getById("main1") as MainFrame;
    const var3 = file.getById("var3");
    var3.processKey(ctrl_x());
    const set6 = file.getById("set6");
    set6.processKey(enter());
    const selector = main.getChildren()[1];
    assert.equal(selector.getHtmlId(), "select70");
    selector.processKey(ctrl_v());
    const pasted = main.getChildren()[1];
    assert.equal(pasted.getHtmlId(), "var3");
    const third = main.getChildren()[2];
    assert.equal(third.getHtmlId(), "throw9");
  });
  test("Paste at wrong level has no effect", () => {
    const file = T03_mainWithAllStatements();
    const main = file.getById("main1") as MainFrame;
    const var3 = file.getById("var3");
    var3.processKey(ctrl_x());
    main.processKey(shift_enter());
    const globalSelect = file.getChildren()[0];
    assert.equal(globalSelect.getHtmlId(), "select70");
    globalSelect.processKey(ctrl_v());
    const newFirst = file.getChildren()[0];
    assert.equal(newFirst, globalSelect);
  });
  ignore_test("#364 ParseError within in class member not showing up at class level", () => {
    const file = T05_classes();
    const player = file.getById("class1");
    assert.equal(player.readParseStatus(), ParseStatus.valid);
    const field = file.getById("ident12");
    assert.equal(field.readParseStatus(), ParseStatus.valid);
    field.processKey(key("%"));
    assert.equal(field.readParseStatus(), ParseStatus.invalid);
    assert.equal(player.readParseStatus(), ParseStatus.invalid);
    field.processKey(back());
    assert.equal(field.readParseStatus(), ParseStatus.valid);
    assert.equal(player.readParseStatus(), ParseStatus.valid);
    const card = file.getById("class14");
    const reset = file.getById("func27");
    const ret = file.getById("return32");
    const expr = file.getById("expr33");
    expr.processKey(key("£"));
    assert.equal(expr.readParseStatus(), ParseStatus.invalid);
    assert.equal(ret.readParseStatus(), ParseStatus.invalid);
    assert.equal(reset.readParseStatus(), ParseStatus.invalid);
    assert.equal(card.readParseStatus(), ParseStatus.invalid);
  });
});
