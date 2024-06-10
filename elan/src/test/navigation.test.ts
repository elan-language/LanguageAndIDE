import * as vscode from "vscode";
import {
  T03_mainWithAllStatements,
  T04_allGlobalsExceptClass,
  T05_classes,
} from "./model-generating-functions.";
import { assertClasses, down, end, esc, home, right, shift_tab, tab, up } from "./testHelpers";
import assert from "assert";
import { IdentifierField } from "../frames/fields/identifier-field";
import { ExpressionField } from "../frames/fields/expression-field";
import { isParent } from "../frames/helpers";
import { Selectable } from "../frames/interfaces/selectable";
import { ignore_test } from "./compiler/compiler-test-helpers";

suite("Navigation", () => {
  vscode.window.showInformationMessage("Start all unit tests.");

  test("Selectable Select", async () => {
    await assertClasses(
      T04_allGlobalsExceptClass,
      (ff) => {
        const frame = ff.getById("const1");
        frame.select(true, false);
      },
      ["const1", "ok multiline", "selected focused ok multiline"],
    );
  });
  test("Select First Child", async () => {
    await assertClasses(
      T04_allGlobalsExceptClass,
      (ff) => {
        const mn = ff.getById("main4");
        if (isParent(mn)) {
          const s = mn.getFirstChild();
          s.select(true, false);
        }
      },
      ["select5", "ok empty", "selected focused ok empty"],
    );
  });
  test("Collapse Main", async () => {
    await assertClasses(
      T04_allGlobalsExceptClass,
      (ff) => {
        const mn = ff.getById("main4");
        if (isParent(mn)) {
          mn.collapse();
        }
      },
      ["main4", "ok multiline", "collapsed ok multiline"],
    );
  });
  test("Tabbing through fields (& back)", () => {
    const file = T03_mainWithAllStatements();
    const var4 = file.getById("var4") as IdentifierField;
    assert.equal(var4.isSelected(), false);
    file.processKey(tab());
    assert.equal(var4.isSelected(), true);
    const expr5 = file.getById("expr5") as ExpressionField;
    assert.equal(expr5.isSelected(), false);
    var4.processKey(tab());
    assert.equal(var4.isSelected(), false);
    assert.equal(expr5.isSelected(), true);
    expr5.processKey(tab());
    const ident7 = file.getById("ident7") as ExpressionField;
    assert.equal(ident7.isSelected(), true);
    ident7.processKey(tab());
    const expr8 = file.getById("expr8") as ExpressionField;
    assert.equal(expr8.isSelected(), true);
    expr8.processKey(shift_tab());
    assert.equal(expr8.isSelected(), false);
    assert.equal(ident7.isSelected(), true);
    ident7.processKey(shift_tab());
    assert.equal(ident7.isSelected(), false);
    assert.equal(expr5.isSelected(), true);
    expr5.processKey(shift_tab());
    assert.equal(expr5.isSelected(), false);
    assert.equal(var4.isSelected(), true);
  });
  test("Tabbing through ALL fields (& back)", () => {
    const file = T05_classes();
    const fields: string[] = [
      "type2",
      "text5",
      "args6",
      "params9",
      "select8",
      "ident12",
      "type13",
      "select10",
      "type15",
      "text18",
      "args19",
      "params22",
      "select21",
      "ident25",
      "type26",
      "ident29",
      "params30",
      "type31",
      "select28",
      "expr33",
      "select23",
      "select0",
    ];
    file.processKey(tab());
    let selected: Selectable = file.getAllSelected()[0];
    for (let i = 0; i <= 21; i++) {
      const id = selected.getHtmlId();
      assert.equal(id, fields[i]);
      selected.processKey(tab());
      selected = file.getAllSelected()[0];
    }
    //Check that last tab did not move beyond last field
    assert.equal(selected!.isSelected(), true);
    file.processKey(esc());
    file.processKey(shift_tab());
    selected = file.getAllSelected()[0];
    for (let i = 21; i >= 0; i--) {
      const id = selected.getHtmlId();
      assert.equal(id, fields[i]);
      selected.processKey(shift_tab());
      selected = file.getAllSelected()[0];
    }
    //Check thatlastshift tab does not move beyond first field
    assert.equal(selected.isSelected(), true);
    selected.processKey(esc());
    assert.equal(selected.isSelected(), false);
  });
  test("Selecting frames", () => {
    const file = T03_mainWithAllStatements();
    const main = file.getById("main1");
    const global_select = file.getById("select0");
    const main_st_1 = file.getById("var3");
    assert.equal(main_st_1.isSelected(), false);
    const main_st_2 = file.getById("set6");
    assert.equal(main_st_2.isSelected(), false);
    const main_st_penult = file.getById("switch68");
    assert.equal(main_st_penult.isSelected(), false);
    const main_st_last = file.getById("select2");
    assert.equal(main_st_last.isSelected(), false);
    assert.equal(main.isSelected(), false);
    assert.equal(global_select.isSelected(), true);
    file.processKey(home());
    assert.equal(main.isSelected(), true);
    assert.equal(global_select.isSelected(), false);
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
  });
});
