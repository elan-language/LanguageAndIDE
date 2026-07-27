import assert from "assert";
import { StdLib } from "../../src/compiler/standard-library/std-lib";
import { MemberSelector } from "../../src/ide/frames/class-members/member-selector";
import { FileImpl } from "../../src/ide/frames/file-impl";
import { AbstractClass } from "../../src/ide/frames/globals/abstract-class";
import { ConcreteClass } from "../../src/ide/frames/globals/concrete-class";
import { GlobalFunction } from "../../src/ide/frames/globals/global-function";
import { GlobalProcedure } from "../../src/ide/frames/globals/global-procedure";
import { GlobalSelector } from "../../src/ide/frames/globals/global-selector";
import { MainRoutine } from "../../src/ide/frames/globals/main-routine";
import { TestFrame } from "../../src/ide/frames/globals/test-frame";
import { Paradigm } from "../../src/ide/frames/paradigm";
import { IfStatement } from "../../src/ide/frames/statements/if-statement";
import { StatementSelector } from "../../src/ide/frames/statements/statement-selector";
import { WhileLoop } from "../../src/ide/frames/statements/whileLoop";
import { StubInputOutput } from "../../src/ide/stub-input-output";
import { hash } from "../../src/ide/util";
import { ignore_test, transforms } from "../compiler/compiler-test-helpers";
import { assertOptions, key, selectOption } from "../testHelpers";
import { emptyMainOnly } from "./model-generating-functions";

suite("Selector tests", () => {
  test("Options within main", () => {
    const file = emptyMainOnly();
    const selector = file.getById("elan_select2") as StatementSelector;
    assertOptions(selector, [
      "print statement",
      "variable definition",
      "assignment",
      "input statement",
      "if statement",
      "while loop",
      "for loop",
      "procedure call",
      "try statement",
      "throw statement",
      "# comment",
    ]);
  });

  test("Select - variable", () => {
    const file = emptyMainOnly();
    const selector = file.getById("elan_select2") as StatementSelector;
    selectOption(selector, "variable definition");
    const v = file.getById("elan_var3").renderAsElanSource();
    assert.equal(v, "  variable  set to ");
  });

  test("Select - variable by key", () => {
    const file = emptyMainOnly();
    file.getById("elan_select2").processKey(key("v"));
    const v = file.getById("elan_var3").renderAsElanSource();
    assert.equal(v, "  variable  set to ");
  });

  test("Statement Select - case insensitive", () => {
    const file = emptyMainOnly();
    file.getById("elan_select2").processKey(key("V"));
    const v = file.getById("elan_var3").renderAsElanSource();
    assert.equal(v, "  variable  set to ");
  });

  test("Selection Filtering - globals - procedural", () => {
    const f = new FileImpl(
      hash,
      new Paradigm("procedural"),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
    );
    const g = new GlobalSelector(f);
    assertOptions(g, [
      "main routine",
      "function",
      "test",
      "procedure",
      "k constant",
      "enum",
      "# comment",
    ]);
  });

  test("Selection Filtering - globals - procedural - with main", () => {
    const f = emptyMainOnly("procedural");
    const g = new GlobalSelector(f);
    assertOptions(g, ["function", "test", "procedure", "k constant", "enum", "# comment"]);
  });

  test("Selection Filtering - globals - no paradigm specified", () => {
    const f = new FileImpl(
      hash,
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
    );
    const g = new GlobalSelector(f);
    assertOptions(g, [
      "main routine",
      "function",
      "test",
      "procedure",
      "k constant",
      "enum",
      "# comment",
    ]);
  });

  test("Selection Filtering - members - oop", () => {
    const f = new FileImpl(
      hash,
      new Paradigm("oop"),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
    );
    const c = new ConcreteClass(f);
    const s = new MemberSelector(c);
    assertOptions(s, ["property", "procedure method", "function method", "# comment"]);
  });

  test("Selection Filtering - members - functional", () => {
    const f = new FileImpl(
      hash,
      new Paradigm("functional"),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
    );
    const c = new ConcreteClass(f);
    const s = new MemberSelector(c);
    assertOptions(s, ["property", "function method", "# comment"]);
  });

  test("Selection Filtering - abstract class", () => {
    const f = new FileImpl(
      hash,
      new Paradigm("oop"),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
    );
    const c = new AbstractClass(f);
    const s = new MemberSelector(c);
    assertOptions(s, [
      "property",
      "procedure method",
      "function method",
      "abstract procedure",
      "abstract function",
      "# comment",
    ]);
  });

  test("Selection Context - in a Function - procedural", () => {
    const fl = new FileImpl(
      hash,
      new Paradigm("procedural"),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
    );
    const func = new GlobalFunction(fl);
    const s = new StatementSelector(func);
    assertOptions(s, [
      "variable definition",
      "assignment",
      "if statement",
      "while loop",
      "for loop",
      "try statement",
      "throw statement",
      "# comment",
    ]);
  });

  test("Selection Context - in a Function - functional", () => {
    const fl = new FileImpl(
      hash,
      new Paradigm("functional"),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
    );
    const func = new GlobalFunction(fl);
    const s = new StatementSelector(func);
    assertOptions(s, ["let statement", "# comment"]);
  });

  test("Selection Context - in a Procedure", () => {
    const fl = new FileImpl(
      hash,
      new Paradigm("procedural"),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
    );
    const proc = new GlobalProcedure(fl);
    const s = new StatementSelector(proc);
    assertOptions(s, [
      "print statement",
      "variable definition",
      "assignment",
      "input statement",
      "if statement",
      "while loop",
      "for loop",
      "procedure call",
      "try statement",
      "throw statement",
      "# comment",
    ]);
  });

  test("Selection Context - in a Procedure - functional paradigm", () => {
    const fl = new FileImpl(
      hash,
      new Paradigm("functional"),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
    );
    const proc = new GlobalProcedure(fl);
    const s = new StatementSelector(proc);
    assertOptions(s, [
      "print statement",
      "variable definition",
      "assignment",
      "input statement",
      "if statement",
      "while loop",
      "for loop",
      "procedure call",
      "try statement",
      "throw statement",
      "# comment",
    ]);
  });

  test("Selection Context - in a Test - functional", () => {
    const fl = new FileImpl(
      hash,
      new Paradigm("functional"),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
    );
    const test = new TestFrame(fl);
    const s = new StatementSelector(test);
    assertOptions(s, ["assert", "let statement", "# comment"]);
  });

  test("Selection Context - in a Test - procedural", () => {
    const fl = new FileImpl(
      hash,
      new Paradigm("procedural"),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
    );
    const test = new TestFrame(fl);
    const s = new StatementSelector(test);
    assertOptions(s, ["assert", "let statement", "variable definition", "# comment"]);
  });

  test("Selection Context - deeper nesting  - functional", () => {
    const fl = new FileImpl(
      hash,
      new Paradigm("functional"),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
    );
    const func = new GlobalFunction(fl);
    const if1 = new IfStatement(func);
    const wh = new WhileLoop(if1);
    const s = new StatementSelector(wh);
    assertOptions(s, ["let statement", "# comment"]);
  });

  test("Selection Context - in an IfThen", () => {
    const fl = new FileImpl(
      hash,
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
    );
    const m = new MainRoutine(fl);
    const ifThen = new IfStatement(m);
    const s = new StatementSelector(ifThen);
    assertOptions(s, [
      "print statement",
      "variable definition",
      "assignment",
      "input statement",
      "if statement",
      "else if clause",
      "else clause",
      "while loop",
      "for loop",
      "procedure call",
      "try statement",
      "throw statement",
      "# comment",
    ]);
  });

  test("Selection Context - if main deleted main option is shown - procedural", () => {
    const fl = new FileImpl(
      hash,
      new Paradigm("procedural"),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
    );
    fl.removeChild(fl.getFirstChild());
    const gs = new GlobalSelector(fl);
    assertOptions(gs, [
      "main routine",
      "function",
      "test",
      "procedure",
      "k constant",
      "enum",
      "# comment",
    ]);
  });

  test("Selection Filtering - globals - all", () => {
    const f = new FileImpl(
      hash,
      new Paradigm("functional"),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
    );
    const g = new GlobalSelector(f);
    assertOptions(g, [
      "main routine",
      "function",
      "test",
      "procedure",
      "k constant",
      "enum",
      "concrete class",
      "abstract class",
      "# comment",
    ]);
  });
});
