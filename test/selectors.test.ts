import assert from "assert";

import { assertKeyword, functionKeyword, letKeyword, testKeyword } from "../src/compiler/keywords";
import { StdLib } from "../src/compiler/standard-library/std-lib";
import { FunctionMethod } from "../src/ide/frames/class-members/function-method";
import { MemberSelector } from "../src/ide/frames/class-members/member-selector";
import { DefaultProfile } from "../src/ide/frames/default-profile";
import { FileImpl } from "../src/ide/frames/file-impl";
import { Profile } from "../src/ide/frames/frame-interfaces/profile";
import { AbstractClass } from "../src/ide/frames/globals/abstract-class";
import { ConcreteClass } from "../src/ide/frames/globals/concrete-class";
import { GlobalFunction } from "../src/ide/frames/globals/global-function";
import { GlobalProcedure } from "../src/ide/frames/globals/global-procedure";
import { GlobalSelector } from "../src/ide/frames/globals/global-selector";
import { InterfaceFrame } from "../src/ide/frames/globals/interface-frame";
import { MainFrame } from "../src/ide/frames/globals/main-frame";
import { TestFrame } from "../src/ide/frames/globals/test-frame";
import { IfStatement } from "../src/ide/frames/statements/if-statement";
import { StatementSelector } from "../src/ide/frames/statements/statement-selector";
import { While } from "../src/ide/frames/statements/while";
import { StubInputOutput } from "../src/ide/stub-input-output";
import { hash } from "../src/ide/util";
import { ignore_test, transforms } from "./compiler/compiler-test-helpers";
import { classWithConstructor, emptyMainOnly, T00_emptyFile } from "./model-generating-functions";
import { key } from "./testHelpers";

export class TestProfileSPJ implements Profile {
  name: string = "SPJ";
  globals: string[] = [functionKeyword, testKeyword];
  statements: string[] = [assertKeyword, letKeyword];
  class_members: string[] = [];
  require_log_on: boolean = false;
  can_load_only_own_files: boolean = false;
  show_user_and_profile: boolean = false;
}

suite("Selector tests", () => {
  test("Statement Select - variable", () => {
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

  test("Member Select - function", () => {
    const file = classWithConstructor();
    file.getById("select4").processKey(key("f"));
    const v = file.getById("func8").renderAsElanSource();
    assert.equal(v, "  function () returns \r\n" + "    return \r\n" + "  end function\r\n");
  });

  test("Member Select - procedure", () => {
    const file = classWithConstructor();
    const sel = file.getById("select4");
    sel.processKey(key("p"));
    sel.processKey(key("o"));
    sel.processKey(key("c"));
    const v = file.getById("proc8").renderAsElanSource();
    assert.equal(v, "  procedure ()\r\n\r\n  end procedure\r\n");
  });

  test("Global Select - Constant", () => {
    const file = T00_emptyFile();
    const sel = file.getById("select0");
    sel.processKey(key("c"));
    sel.processKey(key("o"));
    sel.processKey(key("n"));
    const v = file.getById("const1").renderAsElanSource();
    assert.equal(v, "constant  set to \r\n");
  });

  test("Selection Filtering - globals", () => {
    const f = new FileImpl(
      hash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
    );
    const g = new GlobalSelector(f);
    let help = g.getCompletion();
    assert.equal(
      help,
      " main procedure function test constant enum class abstract interface comment",
    );
    g.processKey(key("c"));
    help = g.getCompletion();
    assert.equal(help, " constant class comment");
    assert.equal(
      g.renderAsHtml(),
      `<el-global contenteditable spellcheck="false" class="none" id='select1' tabindex="-1" ><el-select><el-txt>c</el-txt><el-place>new code</el-place><div class="options"> constant class comment</div></el-select></el-global>`,
    );
  });

  test("Selection Filtering - members", () => {
    const f = new FileImpl(
      hash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
    );
    const c = new ConcreteClass(f);
    const s = new MemberSelector(c);
    let help = s.getCompletion();
    assert.equal(help, " constructor property procedure function private...   #");
    s.processKey(key("p"));
    assert.equal(s.text, "pr");
    help = s.getCompletion();
    assert.equal(help, " property procedure private...  ");
    s.processKey(key("r"));
    assert.equal(s.text, "pr");
    help = s.getCompletion();
    assert.equal(help, " property procedure private...  ");
    s.processKey(key("i"));
    assert.equal(s.text, "private ");
    help = s.getCompletion();
    assert.equal(help, " property procedure function");
    s.processKey(key("p"));
    assert.equal(s.text, "private pro");
    help = s.getCompletion();
    assert.equal(help, " property procedure");
    assert.equal(
      s.renderAsHtml(),
      `<el-member contenteditable spellcheck="false" class="ok" id='select5' tabindex="-1" ><el-select><el-txt>private pro</el-txt><el-place>new code</el-place><div class="options"> property procedure</div></el-select></el-member>`,
    );
  });

  test("Selection Filtering - abstract class", () => {
    const f = new FileImpl(
      hash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
    );
    const c = new AbstractClass(f);
    const s = new MemberSelector(c);
    assert.equal(s.getCompletion(), " property procedure function abstract...   private...   #");
    s.processKey(key("a"));
    assert.equal(s.text, "abstract ");
    assert.equal(s.getCompletion(), " property procedure function");
    s.processKey(key("a"));
    assert.equal(s.text, "abstract ");
    s.processKey(key("b"));
    assert.equal(s.text, "abstract ");
    assert.equal(s.getCompletion(), " property procedure function");
    s.processKey(key("p"));
    assert.equal(s.text, "abstract pro");
    assert.equal(s.getCompletion(), " property procedure");
    assert.equal(
      s.renderAsHtml(),
      `<el-member contenteditable spellcheck="false" class="ok" id='select5' tabindex="-1" ><el-select><el-txt>abstract pro</el-txt><el-place>new code</el-place><div class="options"> property procedure</div></el-select></el-member>`,
    );
  });

  test("Selection Filtering - interface", () => {
    const f = new FileImpl(
      hash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
    );
    const c = new InterfaceFrame(f);
    const s = new MemberSelector(c);
    assert.equal(s.getCompletion(), " abstract...   #");
    s.processKey(key("a"));
    assert.equal(s.text, "abstract ");
    assert.equal(s.getCompletion(), " property procedure function");
  });

  test("Selection Filtering - statements", () => {
    const f = new FileImpl(
      hash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
    );
    const m = new MainFrame(f);
    const s = new StatementSelector(m);
    let help = s.getCompletion();
    assert.equal(help, " call each for if constant set throw try variable while comment");
    s.processKey(key("t"));
    help = s.getCompletion();
    assert.equal(help, " throw try");
    assert.equal(
      s.renderAsHtml(),
      `<el-statement contenteditable spellcheck="false" class="ok" id='select3' tabindex="-1" ><el-select><el-txt>t</el-txt><el-place>new code</el-place><div class="options"> throw try</div></el-select></el-statement>`,
    );
  });

  test("Selection Context - in a Function", () => {
    const fl = new FileImpl(
      hash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
    );
    const func = new GlobalFunction(fl);
    const s = new StatementSelector(func);
    const help = s.getCompletion();
    assert.equal(help, " each for if constant set throw try variable while comment");
  });

  test("Selection Context - in a Procedure", () => {
    const fl = new FileImpl(
      hash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
    );
    const proc = new GlobalProcedure(fl);
    const s = new StatementSelector(proc);
    const help = s.getCompletion();
    assert.equal(help, " call each for if constant set throw try variable while comment");
  });

  test("Selection Context - in a Test", () => {
    const fl = new FileImpl(
      hash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
    );
    const test = new TestFrame(fl);
    const s = new StatementSelector(test);
    const help = s.getCompletion();
    assert.equal(help, " assert each for if constant set throw try variable while comment");
  });

  test("Selection Context - deeper nesting 1", () => {
    const fl = new FileImpl(
      hash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
    );
    const func = new GlobalFunction(fl);
    const if1 = new IfStatement(func);
    const wh = new While(if1);
    const s = new StatementSelector(wh);
    const help = s.getCompletion();
    assert.equal(help, " each for if constant set throw try variable while comment"); //no else, call
  });

  test("Selection Context - deeper nesting 2", () => {
    const fl = new FileImpl(
      hash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
    );
    const c = new ConcreteClass(fl);
    const fm = new FunctionMethod(c);
    const if1 = new IfStatement(fm);
    const s = new StatementSelector(if1);
    const help = s.getCompletion();
    assert.equal(help, " each elif else for if constant set throw try variable while comment"); //else, but no call
  });
  test("Selection Context - in an IfThen", () => {
    const fl = new FileImpl(
      hash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
    );
    const m = new MainFrame(fl);
    const ifThen = new IfStatement(m);
    const s = new StatementSelector(ifThen);
    const help = s.getCompletion();
    assert.equal(help, " call each elif else for if constant set throw try variable while comment");
  });
  test("Selection Context - selector prevents more than one main", () => {
    const fl = new FileImpl(
      hash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
    );
    let gs = new GlobalSelector(fl);
    let help = gs.getCompletion();
    assert.equal(
      help,
      " main procedure function test constant enum class abstract interface comment",
    );
    const m = new MainFrame(fl);
    fl.getChildren().push(m);
    gs = new GlobalSelector(fl);
    help = gs.getCompletion();
    assert.equal(help, " procedure function test constant enum class abstract interface comment");
  });

  ignore_test("#377 - Global select filtered by profile", () => {
    const f = new FileImpl(
      hash,
      new TestProfileSPJ(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
    );
    const gs = f.getFirstSelectorAsDirectChild();
    const help = gs.getCompletion();
    assert.equal(help, " function test");
    const filtered = gs.optionsMatchingUserInput(`f`);
    assert.equal(filtered.length, 1);
  });
  test("#2386 - Selector should respond to Enter", () => {
    const fl = new FileImpl(
      hash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
    );
    const gs = new GlobalSelector(fl);
    gs.select(true, false);
    assert.equal(fl.getChildren().length, 1);
    gs.processKey(key("Enter"));
    assert.equal(gs.isSelected(), false);
    assert.equal(fl.getChildren().length, 1);
  });
});
