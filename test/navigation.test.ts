import assert from "assert";
import { ExpressionField } from "../src/ide/frames/fields/expression-field";
import { IdentifierField } from "../src/ide/frames/fields/identifier-field";
import { VariableStatement } from "../src/ide/frames/statements/variable-statement";
import { assertClasses, end, home, right, shift_tab, tab, up } from "./testHelpers";
import { T03_mainWithAllStatements, T04_allGlobalsExceptClass } from "./model-generating-functions";
import { isParent } from "../src/ide/frames/frame-helpers";

suite("Navigation", () => {
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
  test("Tabbing through fields and back to the frame", () => {
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
    assert.equal(expr5.isSelected(), false);
    const var3 = file.getById("var3") as VariableStatement;
    assert.equal(var3.isSelected(), true);
    var3.processKey(tab());
    assert.equal(var3.isSelected(), false);
    assert.equal(var4.isSelected(), true);
  });
  test("Shift-tabbing through fields and back to the frame", () => {
    const file = T03_mainWithAllStatements();

    const var3 = file.getById("var3") as VariableStatement;
    var3.select(true, false);
    var3.processKey(shift_tab());
    assert.equal(var3.isSelected(), false);
    const expr5 = file.getById("expr5") as ExpressionField;
    assert.equal(expr5.isSelected(), true);
    expr5.processKey(shift_tab());
    assert.equal(expr5.isSelected(), false);
    const var4 = file.getById("var4") as IdentifierField;
    assert.equal(var4.isSelected(), true);
    var4.processKey(shift_tab());
    assert.equal(var4.isSelected(), false);
    assert.equal(var3.isSelected(), true);
  });
  test("Selecting frames", () => {
    const file = T03_mainWithAllStatements();
    const main = file.getById("main1");
    const global_select = file.getById("select0");
    const main_st_1 = file.getById("var3");
    assert.equal(main_st_1.isSelected(), false);
    const main_st_2 = file.getById("set6");
    assert.equal(main_st_2.isSelected(), false);
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
  });
});
