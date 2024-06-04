import assert from "assert";
import * as vscode from "vscode";
import { DefaultProfile } from "../frames/default-profile";
import { CodeSourceFromString, FileImpl } from "../frames/file-impl";
import { hash } from "../util";
import { key } from "./testHelpers";
import { Constant } from "../frames/globals/constant";
import { MainFrame } from "../frames/globals/main-frame";
import { SetStatement } from "../frames/statements/set-statement";
import { GlobalFunction } from "../frames/globals/global-function";
import { testHash, transforms } from "./compiler/compiler-test-helpers";
import { IfStatement } from "../frames/statements/if-statement";
import { VarStatement } from "../frames/statements/var-statement";

suite("Editing Fields Tests", () => {
  vscode.window.showInformationMessage("Start all unit tests.");

  test("Entry of text with formatting", () => {
    const main = new MainFrame(
      new FileImpl(hash, new DefaultProfile(), transforms()),
    );
    const set = new SetStatement(main);
    const expr = set.expr;
    expr.processKey(key("3"));
    assert.equal(expr.text, "3");
    assert.equal(expr.cursorPos, 1);
    expr.processKey(key(" "));
    assert.equal(expr.text, "3 ");
    assert.equal(expr.cursorPos, 2);
    assert.equal(expr.getCompletion(), "<pr>operator </pr><pr>expression</pr>");
    expr.processKey(key("+"));
    assert.equal(expr.text, "3 + ");
    assert.equal(expr.cursorPos, 4);
    assert.equal(expr.getCompletion(), "<pr>expression</pr>");
    expr.processKey(key(" "));
    assert.equal(expr.text, "3 + ");
    assert.equal(expr.cursorPos, 4);
    assert.equal(expr.getCompletion(), "<pr>expression</pr>");
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
      new FileImpl(hash, new DefaultProfile(), transforms()),
    );
    const t = f.returnType;
    t.processKey(key("F"));
    assert.equal(t.text, "F");
    assert.equal(t.cursorPos, 1);
    t.processKey(key("<"));
    assert.equal(t.text, "F<");
    assert.equal(t.cursorPos, 2);
    assert.equal(t.getCompletion(), "of <pr>Type</pr>>");
    t.processKey(key("ArrowRight"));
    assert.equal(t.text, "F<of ");
    assert.equal(t.cursorPos, 5);
    assert.equal(t.getCompletion(), "<pr>Type</pr>>");
    t.processKey(key("ArrowRight"));
    assert.equal(t.text, "F<of "); //i.e. does not accept a prompt as text
    assert.equal(t.cursorPos, 5);
    assert.equal(t.getCompletion(), "<pr>Type</pr>>");
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
    assert.equal(t.getCompletion(), "<pr>Type</pr>>");
    assert.equal(t.cursorPos, 5);
    t.processKey(key("Backspace"));
    assert.equal(t.text, "F<of");
    assert.equal(t.getCompletion(), " <pr>Type</pr>>");
    assert.equal(t.cursorPos, 4);
    t.processKey(key("Backspace"));
    assert.equal(t.text, "F<o");
    assert.equal(t.getCompletion(), "f <pr>Type</pr>>");
    assert.equal(t.cursorPos, 3);
    t.processKey(key("Backspace"));
    assert.equal(t.text, "F<");
    assert.equal(t.getCompletion(), "of <pr>Type</pr>>");
    assert.equal(t.cursorPos, 2);
    t.processKey(key("Backspace"));
    assert.equal(t.text, "F");
    assert.equal(t.getCompletion(), "");
    assert.equal(t.cursorPos, 1);
    t.processKey(key("Backspace"));
    assert.equal(t.text, "");
    assert.equal(t.getCompletion(), "<pr>Type</pr>");
    assert.equal(t.cursorPos, 0);
    t.processKey(key("Backspace"));
    assert.equal(t.text, "");
    assert.equal(t.getCompletion(), "<pr>Type</pr>");
    assert.equal(t.cursorPos, 0);
  });

  test("Entry of text with formatting 3", () => {
    const f = new GlobalFunction(
      new FileImpl(hash, new DefaultProfile(), transforms()),
    );
    const t = f.returnType;
    t.processKey(key("("));
    assert.equal(t.text, "(");
    assert.equal(t.cursorPos, 1);
    assert.equal(t.getCompletion(), "<pr>Type</pr>)");
    t.processKey(key("F"));
    t.processKey(key("o"));
    t.processKey(key("o"));
    t.processKey(key(","));
    assert.equal(t.text, "(Foo, ");
    assert.equal(t.cursorPos, 6);
    assert.equal(t.getCompletion(), "<pr>Type</pr>)");
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
    assert.equal(t.getCompletion(), "<pr>Type</pr>)");
    t.processKey(key("Backspace"));
    assert.equal(t.text, "(Foo,");
    assert.equal(t.cursorPos, 5);
    assert.equal(t.getCompletion(), "<pr>Type</pr>)");
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
      new FileImpl(hash, new DefaultProfile(), transforms()),
    );
    const if1 = new IfStatement(main);
    const expr = if1.condition;
    expr.processKey(key("a"));
    assert.equal(expr.text, "a");
    assert.equal(expr.cursorPos, 1);
    expr.processKey(key(" "));
    assert.equal(expr.text, "a ");
    assert.equal(expr.cursorPos, 2);
    assert.equal(expr.getCompletion(), "<pr>operator </pr><pr>expression</pr>");
    expr.processKey(key("i"));
    assert.equal(expr.text, "a i");
    assert.equal(expr.cursorPos, 3);
    assert.equal(expr.getCompletion(), "s<pr>expression</pr>");
    expr.processKey(key("s"));
    assert.equal(expr.text, "a is ");
    assert.equal(expr.cursorPos, 5);
    assert.equal(expr.getCompletion(), "<pr>expression</pr>");
  });

  test("Tabbing to use plain text completions #485", () => {
    const main = new MainFrame(
      new FileImpl(hash, new DefaultProfile(), transforms()),
    );
    const v = new VarStatement(main);
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
    assert.equal(
      expr.getCompletion(),
      "as <pr>Type</pr> => <pr>expression</pr>",
    );
    expr.processKey(key("Tab"));
    assert.equal(expr.text, "lambda a as ");
    assert.equal(expr.getCompletion(), "<pr>Type</pr> => <pr>expression</pr>");
    expr.processKey(key("I"));
    expr.processKey(key("n"));
    expr.processKey(key("t"));
    assert.equal(expr.text, "lambda a as Int");
    assert.equal(expr.getCompletion(), " => <pr>expression</pr>");
    expr.processKey(key("Enter"));
    assert.equal(expr.text, "lambda a as Int => ");
  });
});
