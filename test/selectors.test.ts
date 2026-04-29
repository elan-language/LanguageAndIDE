import assert from "assert";
import { StdLib } from "../src/compiler/standard-library/std-lib";
import { FunctionMethod } from "../src/ide/frames/class-members/function-method";
import { MemberSelector } from "../src/ide/frames/class-members/member-selector";
import { FileImpl } from "../src/ide/frames/file-impl";
import { AbstractClass } from "../src/ide/frames/globals/abstract-class";
import { ConcreteClass } from "../src/ide/frames/globals/concrete-class";
import { GlobalFunction } from "../src/ide/frames/globals/global-function";
import { GlobalProcedure } from "../src/ide/frames/globals/global-procedure";
import { GlobalSelector } from "../src/ide/frames/globals/global-selector";
import { InterfaceFrame } from "../src/ide/frames/globals/interface-frame";
import { MainFrame } from "../src/ide/frames/globals/main-frame";
import { TestFrame } from "../src/ide/frames/globals/test-frame";
import { Profile } from "../src/ide/frames/profile";
import { IfStatement } from "../src/ide/frames/statements/if-statement";
import { StatementSelector } from "../src/ide/frames/statements/statement-selector";
import { While } from "../src/ide/frames/statements/while";
import { StubInputOutput } from "../src/ide/stub-input-output";
import { hash } from "../src/ide/util";
import { transforms } from "./compiler/compiler-test-helpers";
import { emptyMainOnly } from "./model-generating-functions";
import { assertOptions, key, selectOption } from "./testHelpers";

suite("Selector tests", () => {
  test("Options within main", () => {
    const file = emptyMainOnly();
    const selector = file.getById("select2") as StatementSelector;
    assertOptions(selector, [
      "print",
      "variable definition",
      "change variable",
      "if",
      "while loop",
      "for loop",
      "call procedure",
      "try ... catch",
      "throw exception",
      "# comment",
    ]);
  });

  test("Select - variable", () => {
    const file = emptyMainOnly();
    const selector = file.getById("select2") as StatementSelector;
    selectOption(selector, "variable definition");
    const v = file.getById("var3").renderAsElanSource();
    assert.equal(v, "  variable  set to ");
  });

  test("Select - variable by key", () => {
    const file = emptyMainOnly();
    file.getById("select2").processKey(key("v"));
    const v = file.getById("var3").renderAsElanSource();
    assert.equal(v, "  variable  set to ");
  });

  test("Statement Select - case insensitive", () => {
    const file = emptyMainOnly();
    file.getById("select2").processKey(key("V"));
    const v = file.getById("var3").renderAsElanSource();
    assert.equal(v, "  variable  set to ");
  });

  test("Selection Filtering - globals - all", () => {
    const f = new FileImpl(
      hash,
      new Profile("all"),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
    );
    const g = new GlobalSelector(f);
    assertOptions(g, [
      "main",
      "function",
      "test",
      "procedure",
      "constant",
      "enum",
      "class",
      "abstract class",
      "interface",
      "# comment",
    ]);
  });

  test("Selection Filtering - globals - procedural", () => {
    const f = new FileImpl(
      hash,
      new Profile("procedural"),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
    );
    const g = new GlobalSelector(f);
    assertOptions(g, ["main", "function", "test", "procedure", "constant", "# comment"]);
  });

  test("Selection Filtering - globals - no profile specified", () => {
    const f = new FileImpl(
      hash,
      new Profile(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
    );
    const g = new GlobalSelector(f);
    assertOptions(g, ["main", "function", "test", "procedure", "constant", "# comment"]);
  });

  test("Selection Filtering - members - oop", () => {
    const f = new FileImpl(
      hash,
      new Profile("oop"),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
    );
    const c = new ConcreteClass(f);
    const s = new MemberSelector(c);
    assertOptions(s, ["property", "procedure", "function", "# comment"]);
  });

  test("Selection Filtering - members - functional", () => {
    const f = new FileImpl(
      hash,
      new Profile("functional"),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
    );
    const c = new ConcreteClass(f);
    const s = new MemberSelector(c);
    assertOptions(s, ["property", "function", "with method", "# comment"]);
  });

  test("Selection Filtering - abstract class", () => {
    const f = new FileImpl(
      hash,
      new Profile("oop"),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
    );
    const c = new AbstractClass(f);
    const s = new MemberSelector(c);
    assertOptions(s, [
      "property",
      "procedure",
      "function",
      "abstract property",
      "abstract procedure",
      "abstract function",
      "# comment",
    ]);
  });

  test("Selection Filtering - interface", () => {
    const f = new FileImpl(
      hash,
      new Profile("oop"),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
    );
    const c = new InterfaceFrame(f);
    const s = new MemberSelector(c);
    assertOptions(s, ["abstract property", "abstract procedure", "abstract function", "# comment"]);
  });

  test("Selection Context - in a Function - functional", () => {
    const fl = new FileImpl(
      hash,
      new Profile("functional"),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
    );
    const func = new GlobalFunction(fl);
    const s = new StatementSelector(func);
    assertOptions(s, [
      "let statement",
      "variable definition",
      "change variable",
      "if",
      "while loop",
      "for loop",
      "try ... catch",
      "throw exception",
      "# comment",
    ]);
  });

  test("Selection Context - in a Function - no profile", () => {
    const fl = new FileImpl(
      hash,
      new Profile(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
    );
    const func = new GlobalFunction(fl);
    const s = new StatementSelector(func);
    assertOptions(s, [
      "variable definition",
      "change variable",
      "if",
      "while loop",
      "for loop",
      "try ... catch",
      "throw exception",
      "# comment",
    ]);
  });

  test("Selection Context - in a Procedure", () => {
    const fl = new FileImpl(
      hash,
      new Profile(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
    );
    const proc = new GlobalProcedure(fl);
    const s = new StatementSelector(proc);
    assertOptions(s, [
      "print",
      "variable definition",
      "change variable",
      "if",
      "while loop",
      "for loop",
      "call procedure",
      "try ... catch",
      "throw exception",
      "# comment",
    ]);
  });

  test("Selection Context - in a Test - functional", () => {
    const fl = new FileImpl(
      hash,
      new Profile("functional"),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
    );
    const test = new TestFrame(fl);
    const s = new StatementSelector(test);
    assertOptions(s, [
      "assert equal",
      "let statement",
      "variable definition",
      "change variable",
      "if",
      "while loop",
      "for loop",
      "try ... catch",
      "throw exception",
      "# comment",
    ]);
  });

  test("Selection Context - in a Test - no profile", () => {
    const fl = new FileImpl(
      hash,
      new Profile(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
    );
    const test = new TestFrame(fl);
    const s = new StatementSelector(test);
    assertOptions(s, [
      "assert equal",
      "variable definition",
      "change variable",
      "if",
      "while loop",
      "for loop",
      "try ... catch",
      "throw exception",
      "# comment",
    ]);
  });

  test("Selection Context - deeper nesting  - functional", () => {
    const fl = new FileImpl(
      hash,
      new Profile("functional"),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
    );
    const func = new GlobalFunction(fl);
    const if1 = new IfStatement(func);
    const wh = new While(if1);
    const s = new StatementSelector(wh);
    assertOptions(s, [
      "let statement",
      "variable definition",
      "change variable",
      "if",
      "while loop",
      "for loop",
      "try ... catch",
      "throw exception",
      "# comment",
    ]);
  });

  test("Selection Context - deeper nesting 2 - all", () => {
    const fl = new FileImpl(
      hash,
      new Profile("all"),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
    );
    const c = new ConcreteClass(fl);
    const fm = new FunctionMethod(c);
    const if1 = new IfStatement(fm);
    const s = new StatementSelector(if1);
    assertOptions(s, [
      "let statement",
      "variable definition",
      "change variable",
      "if",
      "else if",
      "else",
      "while loop",
      "for loop",
      "try ... catch",
      "throw exception",
      "# comment",
    ]);
  });

  test("Selection Context - in an IfThen", () => {
    const fl = new FileImpl(
      hash,
      new Profile(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
    );
    const m = new MainFrame(fl);
    const ifThen = new IfStatement(m);
    const s = new StatementSelector(ifThen);
    assertOptions(s, [
      "print",
      "variable definition",
      "change variable",
      "if",
      "else if",
      "else",
      "while loop",
      "for loop",
      "call procedure",
      "try ... catch",
      "throw exception",
      "# comment",
    ]);
  });

  test("Selection Context - if main deleted main option is shown", () => {
    const fl = new FileImpl(
      hash,
      new Profile(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
    );
    fl.removeChild(fl.getFirstChild());
    const gs = new GlobalSelector(fl);
    assertOptions(gs, ["main", "function", "test", "procedure", "constant", "# comment"]);
  });

  test("Selection Filtering - profile=functional", () => {
    const file = new FileImpl(
      hash,
      new Profile("functional"),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
    );
    const g = file.getFirstSelectorAsDirectChild() as GlobalSelector;
    const func = new GlobalFunction(file);
    file.addChildBefore(func, g);
    file.updateAllParseStatus();
    const s = func.getFirstSelectorAsDirectChild();
    assertOptions(s, [
      "let statement",
      "variable definition",
      "change variable",
      "if",
      "while loop",
      "for loop",
      "try ... catch",
      "throw exception",
      "# comment",
    ]);
  });
});
