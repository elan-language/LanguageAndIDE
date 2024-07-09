import assert from "assert";
import * as vscode from "vscode";
import { Constructor } from "../frames/class-members/constructor";
import { MemberSelector } from "../frames/class-members/member-selector";
import { Property } from "../frames/class-members/property";
import { ExpressionField } from "../frames/fields/expression-field";
import { IdentifierField } from "../frames/fields/identifier-field";
import { FileImpl } from "../frames/file-impl";
import { ClassFrame } from "../frames/globals/class-frame";
import { GlobalFunction } from "../frames/globals/global-function";
import { MainFrame } from "../frames/globals/main-frame";
import { Else } from "../frames/statements/else";
import { IfStatement } from "../frames/statements/if-statement";
import { StatementSelector } from "../frames/statements/statement-selector";
import { ThenStatement } from "../frames/statements/then-statement";
import { ParseStatus } from "../frames/status-enums";
import { ignore_test } from "./compiler/compiler-test-helpers";
import { T03_mainWithAllStatements, T05_classes } from "./model-generating-functions.";
import {
  back,
  createTestRunner,
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
  loadFileAsModel,
  shift_down,
  shift_enter,
  up,
} from "./testHelpers";
import { GlobalSelector } from "../frames/globals/global-selector";

suite("Editing Frames", () => {
  vscode.window.showInformationMessage("Start all unit tests.");

  test("Enter on a frame to Insert new code - creating a selector", () => {
    const file = T03_mainWithAllStatements();
    const if_st = file.getById("if37");
    if_st.processKey(shift_enter()); //Insert above
    const newSel = file.getById("select68");
    assert.equal(if_st.isSelected(), false);
    assert.equal(newSel.isSelected(), true);
    newSel.processKey(down());
    assert.equal(if_st.isSelected(), true);
    assert.equal(newSel.isSelected(), false);
    if_st.processKey(enter()); //Insert below
    const newSel2 = file.getById("select69");
    assert.equal(if_st.isSelected(), false);
    newSel2.processKey(up());
    assert.equal(if_st.isSelected(), true);
  });
  test("Enter on a frame does not create a selector if there is already one there", () => {
    const file = T03_mainWithAllStatements();
    const if_st = file.getById("if47");
    if_st.processKey(enter()); //Should insert selector below
    const newSel = file.getById("select68"); //New a selector
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
  test("Enter on a field goes to next/previous field owned by same frame (except the last/field field).", () => {
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
  });

  test("Enter on last field in a frame - is same effect as that key on the Frame itself", () => {
    const file = T03_mainWithAllStatements();
    const varStatement = file.getById("var3");
    const expr5 = file.getById("expr5") as ExpressionField;
    expr5.select();
    expr5.processKey(enter());
    const newSel = file.getById("select68"); //New selector
    assert.equal(newSel.isSelected(), true);
    newSel.processKey(up());
    assert.equal(newSel.isSelected(), false);
    assert.equal(varStatement.isSelected(), true);
  });

  test("Enter on last field in a frame with statements", () => {
    const file = T03_mainWithAllStatements();
    const printEx = file.getById("expr15");
    printEx.processKey(enter());
    const stateSel = file.getById("select68");
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
    var3.select();
    var3.processKey(ctrl_x());
    const firstStatement = main.getChildren()[0];
    assert.equal(firstStatement.getHtmlId(), "set6");
  });
  test("Cut - multi-select", () => {
    const file = T03_mainWithAllStatements();
    const main = file.getById("main1") as MainFrame;
    const var3 = file.getById("var3");
    var3.select();
    const set6 = file.getById("set6");
    set6.select(true, true);
    set6.processKey(ctrl_x());
    const firstStatement = main.getChildren()[0];
    assert.equal(firstStatement.getHtmlId(), "throw9");
  });
  test("Paste", () => {
    const file = T03_mainWithAllStatements();
    const main = file.getById("main1") as MainFrame;
    const var3 = file.getById("var3");
    var3.select();
    var3.processKey(ctrl_x());
    const set6 = file.getById("set6");
    set6.processKey(enter());
    const selector = main.getChildren()[1];
    assert.equal(selector.getHtmlId(), "select68");
    selector.processKey(ctrl_v());
    const pasted = main.getChildren()[1];
    assert.equal(pasted.getHtmlId(), "var3");
    const third = main.getChildren()[2];
    assert.equal(third.getHtmlId(), "throw9");
  });
  test("Paste - multi-select", () => {
    const file = T03_mainWithAllStatements();
    const main = file.getById("main1") as MainFrame;
    const var3 = file.getById("var3");
    var3.select();
    const set6 = file.getById("set6");
    set6.select(true, true);
    set6.processKey(ctrl_x());
    const firstStatement = main.getChildren()[0];
    assert.equal(firstStatement.getHtmlId(), "throw9");
    firstStatement.select(true, false);
    firstStatement.processKey(enter());
    const newSel = file.getById("select68");
    newSel.select();
    newSel.processKey(ctrl_v());
    const second = main.getChildren()[1];
    assert.equal(second.getHtmlId(), "var3");
    const third = main.getChildren()[2];
    assert.equal(third.getHtmlId(), "set6");
    const fourth = main.getChildren()[3];
    assert.equal(fourth.getHtmlId(), "call11");
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
  test("#596 - cutting an else must not result in a selector inserted above the then", () => {
    const file = T03_mainWithAllStatements();
    const if37 = file.getById("if37") as IfStatement;
    assert.equal(if37.getChildren().length, 4);
    const else42 = file.getById("else42") as Else;
    else42.select(true, false);
    else42.processKey(ctrl_x());
    assert.equal(if37.getChildren().length, 3);
  });
  test("#617 - Enter on condition field in if statement should select the then clause", () => {
    const file = T03_mainWithAllStatements();
    const condition = file.getById("expr34") as ExpressionField;
    condition.select(true, false);
    condition.processKey(enter());
    const then = file.getById("then35") as ThenStatement;
    assert.equal(then.isSelected(), true);
  });

  test("Paste at wrong level has no effect", async () => {
    const file = await loadFileAsModel("single_var.elan");
    const runner = await createTestRunner();
    await file.refreshAllStatuses(runner);

    const main = file.getById("main1") as MainFrame;
    const var3 = file.getById("var3");
    var3.select();
    var3.processKey(ctrl_x());
    main.processKey(shift_enter());
    const globalSelect = file.getChildren()[0];
    assert.equal(globalSelect.getHtmlId(), "select7");
    globalSelect.processKey(ctrl_v());
    const newFirst = file.getChildren()[0];
    assert.equal(newFirst.renderAsHtml(), globalSelect.renderAsHtml());
  });

  test("#634 snippet remains in scratchpad if not successfully pasted", async () => {
    const file = await loadFileAsModel("single_var.elan");
    const runner = await createTestRunner();
    await file.refreshAllStatuses(runner);

    const main = file.getById("main1") as MainFrame;
    const var3 = file.getById("var3");
    var3.select();
    var3.processKey(ctrl_x());
    let scratchpad = (file as FileImpl).getScratchPad();
    assert.equal(scratchpad.readFrames()?.length, 1);
    main.processKey(shift_enter());
    let mainStatements = main.getChildren();
    assert.equal(mainStatements.length, 1);
    const mainSel = file.getById("select6") as StatementSelector;
    const globalSelect = file.getChildren()[0];
    assert.equal(globalSelect.getHtmlId(), "select7");
    globalSelect.select(true, false);
    globalSelect.processKey(ctrl_v());
    const newFirst = file.getChildren()[0];
    assert.equal(newFirst.renderAsHtml(), globalSelect.renderAsHtml());
    //Now paste back into main
    mainSel.processKey(ctrl_v());
    mainStatements = main.getChildren();
    assert.equal(mainStatements.length, 1);
    assert.equal(mainStatements[0].renderAsHtml(), var3.renderAsHtml());
    scratchpad = (file as FileImpl).getScratchPad();
    assert.equal(scratchpad.readFrames(), undefined);
  });
  test("#622 can't cut and paste a method to global level", async () => {
    const file = await loadFileAsModel("testcode622.elan");
    const runner = await createTestRunner();
    await file.refreshAllStatuses(runner);
    const func11 = file.getById("func11");
    func11.select();
    func11.processKey(ctrl_x());
    const scratchpad = (file as FileImpl).getScratchPad();
    assert.equal(scratchpad.readFrames()?.length, 1);
    const class1 = file.getById("class1");
    class1.processKey(enter());
    const sel20 = file.getById("select21") as GlobalSelector;
    sel20.select(true, false);
    sel20.processKey(ctrl_v());
    assert.equal(scratchpad.readFrames()?.length, 1);
  });
});
