import assert from "assert";
import { StdLib } from "../../src/compiler/standard-library/std-lib";
import { CommentFrame } from "../../src/ide/frames/comment-frame";
import { FileImpl } from "../../src/ide/frames/file-impl";
import { GlobalFunction } from "../../src/ide/frames/globals/global-function";
import { MainRoutine } from "../../src/ide/frames/globals/main-routine";
import { Paradigm } from "../../src/ide/frames/paradigm";
import { Assignment } from "../../src/ide/frames/statements/assignment";
import { IfStatement } from "../../src/ide/frames/statements/if-statement";
import { StubInputOutput } from "../../src/ide/stub-input-output";
import { hash } from "../../src/ide/util";
import { ignore_test, transforms } from "../compiler/compiler-test-helpers";
import { fileWithCS, fileWithPython, key, tab } from "../testHelpers";

suite("Editing Fields Tests", () => {
  ignore_test("Entry of text with formatting", () => {
    const main = new MainRoutine(
      new FileImpl(
        hash,
        new Paradigm(""),
        "",
        transforms(),
        new StdLib(new StubInputOutput()),
        false,
      ),
    );
    const set = new Assignment(main);
    const expr = set.expr;
    expr.processKey(key("3"));
    assert.equal(expr.text, "3");
    assert.equal(expr.cursorPos, 1);
    expr.processKey(key(" "));
    assert.equal(expr.text, "3 ");
    assert.equal(expr.cursorPos, 2);
    expr.processKey(key("+"));
    assert.equal(expr.text, "3 +");
    assert.equal(expr.cursorPos, 3);
    assert.equal(expr.getCompletion(), "");
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

  test("Entry of text with formatting Python", () => {
    const f = new GlobalFunction(fileWithPython());
    const t = f.returnType;
    t.processKey(key("F"));
    t.processKey(key("["));
  });
  ignore_test("Entry of text with formatting C#", () => {
    const f = new GlobalFunction(fileWithCS());
    const t = f.returnType;
    t.processKey(key("F"));
    t.processKey(key("<"));
  });

  test("Entry of text with formatting 3", () => {
    const f = new GlobalFunction(
      new FileImpl(
        hash,
        new Paradigm(""),
        "",
        transforms(),
        new StdLib(new StubInputOutput()),
        false,
      ),
    );
    const t = f.returnType;
    t.processKey(key("("));
    assert.equal(t.text, "(");
    assert.equal(t.cursorPos, 1);
    t.processKey(key("F"));
    t.processKey(key("o"));
    t.processKey(key("o"));
    t.processKey(key(","));
    assert.equal(t.text, "(Foo,");
    assert.equal(t.cursorPos, 5);
    t.processKey(key("B"));
    t.processKey(key("a"));
    t.processKey(key("r"));
    assert.equal(t.text, "(Foo,Bar");
    assert.equal(t.cursorPos, 8);
    t.processKey(key("Backspace"));
    assert.equal(t.text, "(Foo,Ba");
    t.processKey(key("Backspace"));
    assert.equal(t.text, "(Foo,B");
    t.processKey(key("Backspace"));
    assert.equal(t.text, "(Foo,");
    assert.equal(t.cursorPos, 5);
    t.processKey(key("Backspace"));
    assert.equal(t.text, "(Foo");
    assert.equal(t.cursorPos, 4);
    t.processKey(key("Backspace"));
    t.processKey(key("Backspace"));
    t.processKey(key("Backspace"));
    t.processKey(key("Backspace"));
    assert.equal(t.text, ""); //i.e. does not accept a prompt as text
    assert.equal(t.cursorPos, 0);
  });

  test("Entry of expression using 'is' - #464", () => {
    const main = new MainRoutine(
      new FileImpl(
        hash,
        new Paradigm(""),
        "",
        transforms(),
        new StdLib(new StubInputOutput()),
        false,
      ),
    );
    const if1 = new IfStatement(main);
    const expr = if1.condition;
    expr.processKey(key("a"));
    assert.equal(expr.text, "a");
    assert.equal(expr.cursorPos, 1);
    expr.processKey(key(" "));
    assert.equal(expr.text, "a ");
    assert.equal(expr.cursorPos, 2);
    expr.processKey(key("i"));
    assert.equal(expr.text, "a i");
    assert.equal(expr.cursorPos, 3);
    expr.processKey(key("s"));
    expr.processKey(key(" "));
    assert.equal(expr.text, "a is ");
    assert.equal(expr.cursorPos, 5);
  });

  test("Ensure Html tag in a comment is not recognised - #840", () => {
    const comment = new CommentFrame(
      new FileImpl(
        hash,
        new Paradigm(""),
        "",
        transforms(),
        new StdLib(new StubInputOutput()),
        false,
      ),
    );
    const field = comment.text;
    field.select();
    field.processKey(key("<"));
    field.processKey(key("p"));
    field.processKey(key(">"));
    assert.equal(field.text, "# <p>");
    assert.equal(
      field.renderAsHtml(),
      '<el-field id="elan_comment2" class="selected focused ok" tabindex="-1"><el-txt><input spellcheck="false" data-cursorstart="5" data-cursorend="5" size="4" style="width: 5ch" value="# <p>" tabindex="-1"></el-txt><el-place># <i>comment</i></el-place><el-compl></el-compl><el-msg></el-msg><el-help title="Click to open Help for this field"><a href="documentation/LangRef.html#CommentField" target="help-iframe" tabindex="-1">?</a></el-help></el-field>',
    );
    field.processKey(tab());
    assert.equal(
      field.renderAsHtml(),
      `<el-field id="elan_comment2" class="ok" tabindex="-1"><el-txt># &lt;p&gt;</el-txt><el-place># <i>comment</i></el-place><el-compl></el-compl><el-msg></el-msg><el-help title="Click to open Help for this field"><a href="documentation/LangRef.html#CommentField" target="help-iframe" tabindex="-1">?</a></el-help></el-field>`,
    );
  });

  test("Ensure - leading spaces in a comment OK", () => {
    const comment = new CommentFrame(
      new FileImpl(
        hash,
        new Paradigm(""),
        "",
        transforms(),
        new StdLib(new StubInputOutput()),
        false,
      ),
    );
    const field = comment.text;
    field.select();
    field.processKey(key(" "));
    field.processKey(key("f"));
    field.processKey(key(" "));
    field.processKey(key(" "));
    field.processKey(key("b"));
    assert.equal(field.text, "#  f  b");
    assert.equal(
      field.renderAsHtml(),
      '<el-field id="elan_comment2" class="selected focused ok" tabindex="-1"><el-txt><input spellcheck="false" data-cursorstart="7" data-cursorend="7" size="6" style="width: 7ch" value="#  f  b" tabindex="-1"></el-txt><el-place># <i>comment</i></el-place><el-compl></el-compl><el-msg></el-msg><el-help title="Click to open Help for this field"><a href="documentation/LangRef.html#CommentField" target="help-iframe" tabindex="-1">?</a></el-help></el-field>',
    );
    field.processKey(tab());
    assert.equal(
      field.renderAsHtml(),
      '<el-field id="elan_comment2" class="ok" tabindex="-1"><el-txt># &nbsp;f &nbsp;b</el-txt><el-place># <i>comment</i></el-place><el-compl></el-compl><el-msg></el-msg><el-help title="Click to open Help for this field"><a href="documentation/LangRef.html#CommentField" target="help-iframe" tabindex="-1">?</a></el-help></el-field>',
    );
  });
});
