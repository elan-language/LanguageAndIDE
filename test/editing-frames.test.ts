import assert from "assert";

import {
  classWithConstructor,
  emptyFunctionOnly,
  emptyMainOnly,
  oneConstant,
  T00_emptyFile,
  T03_mainWithAllStatements,
  twoConstants,
} from "./model-generating-functions";
import {
  createTestRunner,
  ctrl_backspace,
  ctrl_del,
  ctrl_down,
  ctrl_up,
  ctrl_v,
  ctrl_x,
  del,
  enter,
  key,
  loadFileAsModelNew,
  shift_down,
  shift_enter,
  shift_tab,
  shift_up,
  tab,
  up,
} from "./testHelpers";
import { Constructor } from "../src/ide/frames/class-members/constructor";
import { MemberSelector } from "../src/ide/frames/class-members/member-selector";
import { CommentField } from "../src/ide/frames/fields/comment-field";
import { ConstantValueField } from "../src/ide/frames/fields/constant-value-field";
import { IdentifierField } from "../src/ide/frames/fields/identifier-field";
import { InheritsFromField } from "../src/ide/frames/fields/inherits-from-field";
import { TypeNameField } from "../src/ide/frames/fields/type-name-field";
import { FileImpl } from "../src/ide/frames/file-impl";
import { ConcreteClass } from "../src/ide/frames/globals/concrete-class";
import { Constant } from "../src/ide/frames/globals/constant";
import { GlobalFunction } from "../src/ide/frames/globals/global-function";
import { GlobalSelector } from "../src/ide/frames/globals/global-selector";
import { MainFrame } from "../src/ide/frames/globals/main-frame";
import { TestFrame } from "../src/ide/frames/globals/test-frame";
import { ReturnStatement } from "../src/ide/frames/statements/return-statement";
import { StatementSelector } from "../src/ide/frames/statements/statement-selector";
import { ParseStatus } from "../src/ide/frames/status-enums";

suite("Editing Frames", () => {
  test("Enter on a frame to Insert new code - creating a selector", () => {
    const file = oneConstant();
    file.removeAllSelectorsThatCanBe();
    assert.equal(file.getChildren().length, 1);
    const c = file.getById("const1") as Constant;
    c.select(true, false);
    c.processKey(enter());
    assert.equal(file.getChildren().length, 2);
    const newSel = file.getChildAfter(c);
    assert.equal(newSel.getHtmlId(), "select4");
  });
  test("Enter on a frame does not create a selector if there is already one there", () => {
    const file = oneConstant();
    assert.equal(file.getChildren().length, 2);
    const c = file.getById("const1") as Constant;
    c.select(true, false);
    c.processKey(enter());
    assert.equal(file.getChildren().length, 2);
    const select0 = file.getChildAfter(c);
    assert.equal(select0.getHtmlId(), "select0");
    assert.equal(select0.isSelected(), true);
  });
  test("Enter on a field goes to next field owned by same frame (except the last/field field).", () => {
    const file = oneConstant();
    assert.equal(file.getChildren().length, 2);
    const ident2 = file.getById("ident2") as IdentifierField;
    ident2.select();
    assert.equal(ident2.isSelected(), true);
    ident2.processKey(enter());
    assert.equal(ident2.isSelected(), false);
    const text3 = file.getById("text3") as ConstantValueField;
    assert.equal(text3.isSelected(), true);
    text3.processKey(enter());
    assert.equal(text3.isSelected(), false);
    assert.equal(file.getChildren().length, 2);
    const select0 = file.getById("select0") as IdentifierField;
    assert.equal(select0.isSelected(), true);
  });
  test("#1057 enter on inheritance clause field should put focus *inside* the class, not the next global", () => {
    const file = classWithConstructor();
    assert.equal(file.getChildren().length, 2);
    const className = file.getById("type2") as TypeNameField;
    className.select();
    assert.equal(className.isSelected(), true);
    className.processKey(enter());
    assert.equal(className.isSelected(), false);
    const text3 = file.getById("text3") as InheritsFromField;
    assert.equal(text3.isSelected(), true);
    text3.processKey(enter());
    assert.equal(text3.isSelected(), false);
    const constructor = file.getById("constructor5") as Constructor;
    assert.equal(constructor.isSelected(), true);
  });
  test("Tab/Shift-Tab on a field goes to next/prev", () => {
    const file = oneConstant();
    const c = file.getById("const1") as Constant;
    const ident2 = file.getById("ident2") as IdentifierField;
    const text3 = file.getById("text3") as ConstantValueField;
    c.select(true, false);
    assert.equal(c.isSelected(), true);
    c.processKey(tab());
    assert.equal(c.isSelected(), false);
    assert.equal(ident2.isSelected(), true);
    ident2.processKey(tab());
    assert.equal(ident2.isSelected(), false);
    assert.equal(text3.isSelected(), true);
    text3.processKey(tab());
    assert.equal(text3.isSelected(), false);
    assert.equal(c.isSelected(), true);
    c.processKey(shift_tab());
    assert.equal(c.isSelected(), false);
    assert.equal(text3.isSelected(), true);
    text3.processKey(shift_tab());
    assert.equal(text3.isSelected(), false);
    assert.equal(ident2.isSelected(), true);
    ident2.processKey(shift_tab());
    assert.equal(ident2.isSelected(), false);
    assert.equal(c.isSelected(), true);
  });

  test("Enter on last field in a frame with statements", () => {
    const file = emptyFunctionOnly();
    const select2 = file.getById("select2");
    assert.equal(select2.isSelected(), false);
    const type5 = file.getById("type5");
    type5.select(true, false);
    type5.processKey(enter());
    assert.equal(select2.isSelected(), true);
  });
  test("Enter on last field in a last child selects parent", () => {
    const file = emptyFunctionOnly();
    const func = file.getById("func1");
    const returnExpr = file.getById("expr7");
    returnExpr.select(true, false);
    assert.equal(func.isSelected(), false);
    returnExpr.processKey(enter());
    assert.equal(func.isSelected(), true);
  });

  test("Move", () => {
    const file = twoConstants();
    const phi = file.getById("const1") as Constant;
    const sel0 = file.getById("select0") as GlobalSelector;
    const c = file.getById("const4") as Constant;
    assert.equal(file.getFirstChild(), phi);
    assert.equal(file.getLastChild(), sel0);
    phi.select(true, false);
    c.processKey(ctrl_down());
    assert.equal(file.getFirstChild(), c);
    assert.equal(file.getLastChild(), sel0);
    c.processKey(ctrl_down());
    assert.equal(file.getFirstChild(), c);
    assert.equal(file.getLastChild(), phi);
    c.processKey(ctrl_up());
    assert.equal(file.getLastChild(), sel0);
    assert.equal(file.getFirstChild(), c);
    c.processKey(ctrl_up());
    assert.equal(file.getLastChild(), sel0);
    assert.equal(file.getFirstChild(), phi);
  });
  test("Multi-selection incl. reversal", () => {
    const file = T03_mainWithAllStatements();
    const print = file.getById("print14");
    const whil = file.getById("while16");
    const rep = file.getById("repeat19");
    const fr = file.getById("for22");
    whil.select(true, false);
    whil.processKey(shift_down());
    rep.processKey(shift_down());
    assert.equal(whil.isSelected(), true);
    assert.equal(rep.isSelected(), true);
    assert.equal(fr.isSelected(), true);
    fr.processKey(shift_up());
    assert.equal(whil.isSelected(), true);
    assert.equal(rep.isSelected(), true);
    assert.equal(fr.isSelected(), false);
    rep.processKey(shift_up());
    assert.equal(whil.isSelected(), true);
    assert.equal(rep.isSelected(), false);
    assert.equal(fr.isSelected(), false);
    whil.processKey(shift_up());
    assert.equal(print.isSelected(), true);
    assert.equal(whil.isSelected(), true);
    assert.equal(rep.isSelected(), false);
    assert.equal(fr.isSelected(), false);
    print.processKey(shift_down());
    assert.equal(print.isSelected(), false);
    assert.equal(whil.isSelected(), true);
    assert.equal(rep.isSelected(), false);
    assert.equal(fr.isSelected(), false);
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
    const file = emptyFunctionOnly();
    const fun = file.getById("func1") as GlobalFunction;
    const sel = file.getById("select2") as StatementSelector;
    const ret = file.getById("return6") as ReturnStatement;
    assert.equal(fun.getFirstChild(), sel);
    sel.select(true, false);
    sel.processKey(del());
    assert.equal(fun.getChildren().length, 1);
    assert.equal(fun.getFirstChild(), ret);
  });
  test("Cannot remove selector that is only statement", () => {
    const file = emptyMainOnly();
    const main = file.getById("main1") as MainFrame;
    const sel = file.getById("select2") as StatementSelector;
    sel.processKey(del());
    assert.equal(main.getFirstChild(), sel);
  });
  test("Delete frame - Ctrl-Delete", () => {
    const file = emptyFunctionOnly();
    const func = file.getById("func1") as GlobalFunction;
    const sel = file.getById("select0") as GlobalFunction;
    assert.equal(file.getFirstChild(), func);
    func.select(true, false);
    func.processKey(ctrl_del());
    assert.equal(file.getChildren().length, 1);
    assert.equal(file.getFirstChild(), sel);
  });
  test("Delete frame - Ctrl-d", () => {
    const file = emptyFunctionOnly();
    const func = file.getById("func1") as GlobalFunction;
    const sel = file.getById("select0") as GlobalFunction;
    assert.equal(file.getFirstChild(), func);
    func.select(true, false);
    func.processKey(ctrl_backspace());
    assert.equal(file.getChildren().length, 1);
    assert.equal(file.getFirstChild(), sel);
  });
  test("Delete frame - Can delete constructor", () => {
    const file = classWithConstructor();
    const cls = file.getById("class1") as ConcreteClass;
    assert.equal(cls.getChildren().length, 2);
    const con = file.getById("constructor5") as Constructor;
    con.select(true, false);
    con.processKey(ctrl_del());
    assert.equal(cls.getChildren().length, 1);
    assert.equal(cls.getChildren()[0] instanceof MemberSelector, true);
  });
  test("Delete multi-selection", () => {
    const file = T03_mainWithAllStatements();
    const main = file.getById("main1") as MainFrame;
    assert.equal(main.getChildren().length, 14);
    const whil = file.getById("while16");
    const rep = file.getById("repeat19");
    const fr = file.getById("for22");
    whil.select(true, false);
    whil.processKey(shift_down());
    rep.processKey(shift_down());
    assert.equal(whil.isSelected(), true);
    assert.equal(rep.isSelected(), true);
    assert.equal(fr.isSelected(), true);
    whil.processKey(ctrl_del());
    assert.equal(main.getChildren().length, 11);
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
    assert.equal(selector.getHtmlId(), "select56");
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
    const newSel = file.getById("select56");
    newSel.select();
    newSel.processKey(ctrl_v());
    const second = main.getChildren()[1];
    assert.equal(second.getHtmlId(), "var3");
    const third = main.getChildren()[2];
    assert.equal(third.getHtmlId(), "set6");
    const fourth = main.getChildren()[3];
    assert.equal(fourth.getHtmlId(), "call11");
  });

  test("Paste at wrong level has no effect", async () => {
    const file = await loadFileAsModelNew(`${__dirname}\\files\\single_var.elan`);
    const runner = await createTestRunner();
    file.refreshParseAndCompileStatuses(false);

    const main = file.getById("main1") as MainFrame;
    const var3 = file.getById("var3");
    var3.select();
    var3.processKey(ctrl_x());
    main.processKey(shift_enter());
    const globalSelect = file.getChildren()[0];
    assert.equal(globalSelect.getHtmlId(), "select7");

    globalSelect.processKey(ctrl_v());

    const newFirst = file.getChildren()[0];

    assert.ok(
      globalSelect
        .renderAsHtml()
        .includes(
          `<div class="context-menu"><div>Paste Failed: Cannot paste frame into location</div></div>`,
        ),
    );
  });

  test("#634 snippet remains in scratchpad if not successfully pasted", async () => {
    const file = await loadFileAsModelNew(`${__dirname}\\files\\single_var.elan`);
    const runner = await createTestRunner();
    file.refreshParseAndCompileStatuses(false);

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

    assert.ok(
      globalSelect
        .renderAsHtml()
        .includes(
          `<div class="context-menu"><div>Paste Failed: Cannot paste frame into location</div></div>`,
        ),
    );

    const newFirst = file.getChildren()[0];
    assert.equal(newFirst.renderAsSource(), globalSelect.renderAsSource());
    //Now paste back into main
    mainSel.processKey(ctrl_v());
    mainStatements = main.getChildren();
    assert.equal(mainStatements.length, 1);
    assert.equal(mainStatements[0].renderAsSource(), var3.renderAsSource());
    scratchpad = (file as FileImpl).getScratchPad();
    assert.equal(scratchpad.readFrames(), undefined);
  });
  test("#622 can't cut and paste a method to global level", async () => {
    const file = await loadFileAsModelNew(`${__dirname}\\files\\testcode622.elan`);
    const runner = await createTestRunner();
    file.refreshParseAndCompileStatuses(false);
    const func9 = file.getById("func8");
    func9.select();
    func9.processKey(ctrl_x());
    const scratchpad = (file as FileImpl).getScratchPad();
    assert.equal(scratchpad.readFrames()?.length, 1);
    const class1 = file.getById("class1");
    class1.processKey(enter());
    const sel18 = file.getById("select16") as GlobalSelector;
    sel18.select(true, false);

    sel18.processKey(ctrl_v());

    assert.ok(
      sel18
        .renderAsHtml()
        .includes(
          `<div class="context-menu"><div>Paste Failed: Cannot paste frame into location</div></div>`,
        ),
    );

    assert.equal(scratchpad.readFrames()?.length, 1);
  });
  test("#644 cutting statement when there is already a selector following", async () => {
    const file = await loadFileAsModelNew(`${__dirname}\\files\\test644.elan`);
    const runner = await createTestRunner();
    file.refreshParseAndCompileStatuses(false);
    const var3 = file.getById("var3");
    var3.select();
    var3.processKey(enter()); //To create selector following
    const select6 = file.getById("select6");
    var3.select();
    var3.processKey(ctrl_x());
    const main = file.getById("main1") as MainFrame;
    assert.equal(main.getChildren()[0].renderAsHtml(), select6.renderAsHtml());
  });
  test("#666 able to move a frame past a selector", async () => {
    const file = await loadFileAsModelNew(`${__dirname}\\files\\test666.elan`);
    const runner = await createTestRunner();
    file.refreshParseAndCompileStatuses(false);
    const var3 = file.getById("var3");
    var3.select();
    var3.processKey(enter()); //To create selector following
    const select6 = file.getById("select6");
    var3.select();
    var3.processKey(ctrl_down());
    const main = file.getById("main1") as MainFrame;
    assert.equal(main.getChildren()[0].renderAsSource(), select6.renderAsSource());
    var3.processKey(ctrl_up());
    assert.equal(main.getChildren()[0].renderAsSource(), var3.renderAsSource());
  });
  test("#653 able to delete a frame that has not been added to", async () => {
    const file = T00_emptyFile();
    // 1. Backspace on the first field
    const sel0 = file.getById("select0");
    sel0.processKey(key("f"));
    const name = file.getById("ident3");
    assert.equal(name.isSelected(), true);
    name.processKey(key("Backspace"));
    assert.equal(file.getChildren().length, 1);
    // 2. Backspace after selecting the frame
    sel0.processKey(key("f"));
    assert.equal(file.getChildren().length, 2);
    assert.equal(file.getFirstChild().getHtmlId(), "func8");
    const f2 = file.getById("func8");
    f2.processKey(key("Backspace"));
    assert.equal(file.getChildren().length, 1);
    // 3. Does not work if field has been edited
    sel0.processKey(key("f"));
    assert.equal(file.getChildren().length, 2);
    const f3 = file.getById("func15");
    const name3 = file.getById("ident17");
    name3.processKey(key("x"));
    f3.processKey(key("Backspace"));
    assert.equal(file.getChildren().length, 2);
    // 4. Does not work if any child frame has been added
    sel0.processKey(key("f"));
    assert.equal(file.getChildren().length, 3);
    const f4 = file.getById("func22");
    const sel4 = file.getById("select23");
    sel4.processKey(key("v"));
    f4.processKey(key("Backspace"));
    assert.equal(file.getChildren().length, 3);
  });
  test("Create and ignore test #927", async () => {
    const file = T00_emptyFile();
    const sel0 = file.getById("select0");
    sel0.processKey(key("t"));
    const test = file.getById("test1") as TestFrame;
    assert.equal(false, test.ignored);
    assert.equal(true, test.renderAsHtml().includes(`<el-kw>test </el-kw>`));
    test.processKey(key("i", false, true, false));
    assert.equal(true, test.ignored);
    assert.equal(true, test.renderAsHtml().includes(`<el-kw>ignore test </el-kw>`));
    test.processKey(key("i", false, true, false));
    assert.equal(false, test.ignored);
    assert.equal(true, test.renderAsHtml().includes(`<el-kw>test </el-kw>`));
  });
  test("Test description #936", async () => {
    const file = T00_emptyFile();
    const sel0 = file.getById("select0");
    sel0.processKey(key("t"));
    const test = file.getById("test1") as TestFrame;
    const desc = file.getById("comment3") as CommentField;
    assert.equal(true, desc.isOptional());
    desc.processKey(key("x"));
    desc.processKey(key(" "));
    desc.processKey(key("y"));
    assert.equal(desc.readParseStatus(), ParseStatus.valid);
    assert.equal(desc.renderAsSource(), "x y");
  });
});
