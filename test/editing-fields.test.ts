import assert from "assert";
import { hash } from "../src/ide/util";
import { transforms } from "./compiler/compiler-test-helpers";
import { key, tab } from "./testHelpers";
import { DefaultProfile } from "../src/ide/frames/default-profile";
import { FileImpl } from "../src/ide/frames/file-impl";
import { Constant } from "../src/ide/frames/globals/constant";
import { GlobalComment } from "../src/ide/frames/globals/global-comment";
import { GlobalFunction } from "../src/ide/frames/globals/global-function";
import { MainFrame } from "../src/ide/frames/globals/main-frame";
import { CallStatement } from "../src/ide/frames/statements/call-statement";
import { IfStatement } from "../src/ide/frames/statements/if-statement";
import { SetStatement } from "../src/ide/frames/statements/set-statement";
import { VariableStatement } from "../src/ide/frames/statements/variable-statement";
import { StdLib } from "../src/compiler/standard-library/std-lib";
import { StubInputOutput } from "../src/ide/stub-input-output";

suite("Editing Fields Tests", () => {
  test("Entry of text with formatting", () => {
    const main = new MainFrame(
      new FileImpl(hash, new DefaultProfile(), "", transforms(), new StdLib(new StubInputOutput())),
    );
    const set = new SetStatement(main);
    const expr = set.expr;
    expr.processKey(key("3"));
    assert.equal(expr.text, "3");
    assert.equal(expr.cursorPos, 1);
    expr.processKey(key(" "));
    assert.equal(expr.text, "3 ");
    assert.equal(expr.cursorPos, 2);
    assert.equal(expr.getCompletion(), "<i>operator </i><i>value or expression</i>");
    expr.processKey(key("+"));
    assert.equal(expr.text, "3 + ");
    assert.equal(expr.cursorPos, 4);
    assert.equal(expr.getCompletion(), "<i>value or expression</i>");
    expr.processKey(key("4"));
    assert.equal(expr.text, "3 + 4");
    assert.equal(expr.cursorPos, 5);
    assert.equal(expr.getCompletion(), "");
    expr.processKey(key("Backspace"));
    assert.equal(expr.text, "3 + ");
    assert.equal(expr.cursorPos, 4);
    expr.processKey(key("Backspace"));
    assert.equal(expr.text, "3 +");
    assert.equal(expr.cursorPos, 3);
    expr.processKey(key("Backspace"));
    assert.equal(expr.text, "3 ");
    assert.equal(expr.cursorPos, 2);
    expr.processKey(key("Backspace"));
    assert.equal(expr.text, "3");
    assert.equal(expr.cursorPos, 1);
    expr.processKey(key("Backspace"));
    assert.equal(expr.text, "");
    assert.equal(expr.cursorPos, 0);
    expr.processKey(key("Backspace"));
    assert.equal(expr.text, "");
    assert.equal(expr.cursorPos, 0);
  });

  test("Entry of text with formatting 2", () => {
    const f = new GlobalFunction(
      new FileImpl(hash, new DefaultProfile(), "", transforms(), new StdLib(new StubInputOutput())),
    );
    const t = f.returnType;
    t.processKey(key("F"));
    assert.equal(t.text, "F");
    assert.equal(t.cursorPos, 1);
    t.processKey(key("<"));
    assert.equal(t.text, "F<");
    assert.equal(t.cursorPos, 2);
    assert.equal(t.getCompletion(), "of <i>Type</i>>");
    t.processKey(key("ArrowRight"));
    assert.equal(t.text, "F<of ");
    assert.equal(t.cursorPos, 5);
    assert.equal(t.getCompletion(), "<i>Type</i>>");
    t.processKey(key("ArrowRight"));
    assert.equal(t.text, "F<of "); //i.e. does not accept a prompt as text
    assert.equal(t.cursorPos, 5);
    assert.equal(t.getCompletion(), "<i>Type</i>>");
    t.processKey(key("B"));
    t.processKey(key("ArrowRight"));
    assert.equal(t.text, "F<of B>");
    assert.equal(t.getCompletion(), "");
    assert.equal(t.cursorPos, 7);
    t.processKey(key("Backspace"));
    assert.equal(t.text, "F<of B");
    assert.equal(t.getCompletion(), ">");
    assert.equal(t.cursorPos, 6);
    t.processKey(key("Backspace"));
    assert.equal(t.text, "F<of ");
    assert.equal(t.getCompletion(), "<i>Type</i>>");
    assert.equal(t.cursorPos, 5);
    t.processKey(key("Backspace"));
    assert.equal(t.text, "F<of");
    assert.equal(t.getCompletion(), " <i>Type</i>>");
    assert.equal(t.cursorPos, 4);
    t.processKey(key("Backspace"));
    assert.equal(t.text, "F<o");
    assert.equal(t.getCompletion(), "f <i>Type</i>>");
    assert.equal(t.cursorPos, 3);
    t.processKey(key("Backspace"));
    assert.equal(t.text, "F<");
    assert.equal(t.getCompletion(), "of <i>Type</i>>");
    assert.equal(t.cursorPos, 2);
    t.processKey(key("Backspace"));
    assert.equal(t.text, "F");
    assert.equal(t.getCompletion(), "");
    assert.equal(t.cursorPos, 1);
    t.processKey(key("Backspace"));
    assert.equal(t.text, "");
    assert.equal(t.getCompletion(), "<i>Type</i>");
    assert.equal(t.cursorPos, 0);
    t.processKey(key("Backspace"));
    assert.equal(t.text, "");
    assert.equal(t.getCompletion(), "<i>Type</i>");
    assert.equal(t.cursorPos, 0);
  });

  test("Entry of text with formatting 3", () => {
    const f = new GlobalFunction(
      new FileImpl(hash, new DefaultProfile(), "", transforms(), new StdLib(new StubInputOutput())),
    );
    const t = f.returnType;
    t.processKey(key("("));
    assert.equal(t.text, "(");
    assert.equal(t.cursorPos, 1);
    assert.equal(t.getCompletion(), "<i>Type</i>)");
    t.processKey(key("F"));
    t.processKey(key("o"));
    t.processKey(key("o"));
    t.processKey(key(","));
    assert.equal(t.text, "(Foo, ");
    assert.equal(t.cursorPos, 6);
    assert.equal(t.getCompletion(), "<i>Type</i>)");
    t.processKey(key("B"));
    t.processKey(key("a"));
    t.processKey(key("r"));
    assert.equal(t.text, "(Foo, Bar");
    assert.equal(t.cursorPos, 9);
    assert.equal(t.getCompletion(), ")");
    t.processKey(key("Backspace"));
    assert.equal(t.text, "(Foo, Ba");
    t.processKey(key("Backspace"));
    assert.equal(t.text, "(Foo, B");
    t.processKey(key("Backspace"));
    assert.equal(t.text, "(Foo, ");
    assert.equal(t.cursorPos, 6);
    assert.equal(t.getCompletion(), "<i>Type</i>)");
    t.processKey(key("Backspace"));
    assert.equal(t.text, "(Foo,");
    assert.equal(t.cursorPos, 5);
    assert.equal(t.getCompletion(), "<i>Type</i>)");
    t.processKey(key("Backspace"));
    assert.equal(t.text, "(Foo");
    assert.equal(t.cursorPos, 4);
    assert.equal(t.getCompletion(), ")");
    t.processKey(key("Backspace"));
    t.processKey(key("Backspace"));
    t.processKey(key("Backspace"));
    t.processKey(key("Backspace"));
    assert.equal(t.text, ""); //i.e. does not accept a prompt as text
    assert.equal(t.cursorPos, 0);
  });

  test("Entry of expression using 'is' - #464", () => {
    const main = new MainFrame(
      new FileImpl(hash, new DefaultProfile(), "", transforms(), new StdLib(new StubInputOutput())),
    );
    const if1 = new IfStatement(main);
    const expr = if1.condition;
    expr.processKey(key("a"));
    assert.equal(expr.text, "a");
    assert.equal(expr.cursorPos, 1);
    expr.processKey(key(" "));
    assert.equal(expr.text, "a ");
    assert.equal(expr.cursorPos, 2);
    assert.equal(expr.getCompletion(), "<i>operator </i><i>value or expression</i>");
    expr.processKey(key("i"));
    assert.equal(expr.text, "a i");
    assert.equal(expr.cursorPos, 3);
    assert.equal(expr.getCompletion(), "s<i>value or expression</i>");
    expr.processKey(key("s"));
    expr.processKey(key(" "));
    assert.equal(expr.text, "a is ");
    assert.equal(expr.cursorPos, 5);
    assert.equal(expr.getCompletion(), "<i>value or expression</i>");
  });

  test("Ensure Html tag in a comment is not recognised - #840", () => {
    const comment = new GlobalComment(
      new FileImpl(hash, new DefaultProfile(), "", transforms(), new StdLib(new StubInputOutput())),
    );
    const field = comment.text;
    field.select();
    field.processKey(key("<"));
    field.processKey(key("p"));
    field.processKey(key(">"));
    assert.equal(field.text, "<p>");
    assert.equal(
      field.renderAsHtml(),
      `<el-field id="comment2" class="selected focused optional ok" tabindex="-1"><el-txt><input spellcheck="false" data-cursorstart="3" data-cursorend="3" size="2" style="width: 3ch" value="<p>" tabindex="-1"></el-txt><el-place><i>comment</i></el-place><el-compl></el-compl><el-msg></el-msg><el-help title="Click to open Help for this field"><a href="documentation/LangRef.html#CommentField" target="help-iframe" tabindex="-1">?</a></el-help></el-field>`,
    );
    field.processKey(tab());
    assert.equal(
      field.renderAsHtml(),
      `<el-field id="comment2" class="optional ok" tabindex="-1"><el-txt>&lt;p&gt;</el-txt><el-place><i>comment</i></el-place><el-compl></el-compl><el-msg></el-msg><el-help title="Click to open Help for this field"><a href="documentation/LangRef.html#CommentField" target="help-iframe" tabindex="-1">?</a></el-help></el-field>`,
    );
  });

  test("Ensure - leading spaces in a comment OK", () => {
    const comment = new GlobalComment(
      new FileImpl(hash, new DefaultProfile(), "", transforms(), new StdLib(new StubInputOutput())),
    );
    const field = comment.text;
    field.select();
    field.processKey(key(" "));
    field.processKey(key("f"));
    field.processKey(key(" "));
    field.processKey(key(" "));
    field.processKey(key("b"));
    assert.equal(field.text, " f  b");
    assert.equal(
      field.renderAsHtml(),
      `<el-field id="comment2" class="selected focused optional ok" tabindex="-1"><el-txt><input spellcheck="false" data-cursorstart="5" data-cursorend="5" size="4" style="width: 5ch" value=" f  b" tabindex="-1"></el-txt><el-place><i>comment</i></el-place><el-compl></el-compl><el-msg></el-msg><el-help title="Click to open Help for this field"><a href="documentation/LangRef.html#CommentField" target="help-iframe" tabindex="-1">?</a></el-help></el-field>`,
    );
    field.processKey(tab());
    assert.equal(
      field.renderAsHtml(),
      `<el-field id="comment2" class="optional ok" tabindex="-1"><el-txt>&nbsp;f &nbsp;b</el-txt><el-place><i>comment</i></el-place><el-compl></el-compl><el-msg></el-msg><el-help title="Click to open Help for this field"><a href="documentation/LangRef.html#CommentField" target="help-iframe" tabindex="-1">?</a></el-help></el-field>`,
    );
  });

  test("Tabbing to use plain text completions #485", () => {
    const main = new MainFrame(
      new FileImpl(hash, new DefaultProfile(), "", transforms(), new StdLib(new StubInputOutput())),
    );
    const v = new VariableStatement(main);
    const expr = v.expr;
    expr.processKey(key("l"));
    expr.processKey(key("a"));
    expr.processKey(key("m"));
    expr.processKey(key("b"));
    expr.processKey(key("d"));
    expr.processKey(key("a"));
    expr.processKey(key(" "));
    expr.processKey(key("a"));
    expr.processKey(key(" "));
    assert.equal(expr.text, "lambda a ");
    assert.equal(expr.getCompletion(), "as <i>Type</i> => <i>value or expression</i>");
    expr.processKey(key("Tab"));
    assert.equal(expr.text, "lambda a as ");
    assert.equal(expr.getCompletion(), "<i>Type</i> => <i>value or expression</i>");
    expr.processKey(key("I"));
    expr.processKey(key("n"));
    expr.processKey(key("t"));
    assert.equal(expr.text, "lambda a as Int");
    assert.equal(expr.getCompletion(), " => <i>value or expression</i>");
    expr.processKey(key("Enter"));
    assert.equal(expr.text, "lambda a as Int => ");
  });
  test("End of field marker automatically skips to next field #496", () => {
    const file = new FileImpl(
      hash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
    );
    const main = new MainFrame(file);
    const c = new CallStatement(main);
    const proc = c.proc;
    const args = c.args;
    proc.select(true, false);
    assert.equal(proc.isSelected(), true);
    assert.equal(args.isSelected(), false);
    proc.processKey(key("f"));
    proc.processKey(key("o"));
    proc.processKey(key("o"));
    assert.equal(proc.text, "foo");
    proc.processKey(key("("));
    assert.equal(proc.text, "foo");
    assert.equal(proc.isSelected(), false);
    assert.equal(args.isSelected(), true);
    args.processKey(key(")"));
    assert.equal(args.text, "");
    assert.equal(args.isSelected(), false);
    const con = new Constant(file);
    const name = con.name;
    const val = con.value;
    name.processKey(key("a"));
    name.processKey(key(" "));
    assert.equal(name.text, "a");
    const lit = con.value;
    assert.equal(lit.isSelected(), true);
    const fun = new GlobalFunction(file);
    const fn = fun.name;
    fn.processKey(key("b"));
    fn.processKey(key("("));
    assert.equal(fn.text, "b");
    const fparams = fun.params;
    assert.equal(fparams.isSelected(), true);
    fparams.processKey(key(")"));
    assert.equal(fparams.isSelected(), false);
    //Control case:
    const fun2 = new GlobalFunction(file);
    const fn2 = fun2.name;
    fn2.processKey(key("c"));
    fn2.processKey(key(")"));
    assert.equal(fn2.text, "c)");
  });
});
