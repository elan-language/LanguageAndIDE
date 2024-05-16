import assert from "assert";
import * as vscode from "vscode";
import { FileImpl } from "../frames/file-impl";
import { MainFrame } from "../frames/globals/main-frame";
import { GlobalFunction } from "../frames/globals/global-function";
import { VarStatement } from "../frames/statements/var-statement";
import { ParseStatus } from "../frames/status-enums";
import { Switch } from "../frames/statements/switch";
import { Case } from "../frames/statements/case";
import { CallStatement } from "../frames/statements/call-statement";
import { hash } from "../util";
import { DefaultProfile } from "../frames/default-profile";
import { CommentStatement } from "../frames/statements/comment-statement";
import { LetStatement } from "../frames/statements/let-statement";
import { TestFrame } from "../frames/globals/test-frame";
import { AssertStatement } from "../frames/statements/assert-statement";
import { transforms } from "./compiler/compiler-test-helpers";

suite("Field Parsing Tests", () => {
  vscode.window.showInformationMessage("Start all unit tests.");

  test("parse CommentField", () => {
    const main = new MainFrame(
      new FileImpl(hash, new DefaultProfile(), transforms()),
    );
    const commentStatement = new CommentStatement(main);
    const text = commentStatement.text;
    assert.equal(text.textAsSource(), "");
    assert.equal(text.getParseStatus(), ParseStatus.valid);
    text.setText("Hello");
    text.parseCurrentText();
    assert.equal(text.getParseStatus(), ParseStatus.valid);
    assert.equal(
      text.renderAsHtml(),
      `<field id="comment4" class="optional ok" tabindex=0><text>Hello</text><placeholder>comment</placeholder><completion></completion><msg></msg><help title="Any text on a single line.">?</help></field>`,
    );
  });
  test("parse varDefField", () => {
    const main = new MainFrame(
      new FileImpl(hash, new DefaultProfile(), transforms()),
    );
    const variable = new VarStatement(main);
    const id = variable.name;
    assert.equal(id.textAsSource(), "");
    assert.equal(id.getParseStatus(), ParseStatus.incomplete);
    id.setText("ab_1");
    id.parseCurrentText();
    assert.equal(id.getParseStatus(), ParseStatus.valid);
    assert.equal(
      id.renderAsHtml(),
      `<field id="var4" class="ok" tabindex=0><text>ab_1</text><placeholder>name</placeholder><completion></completion><msg></msg><help title="A variable name must start with a lower-case letter, optionally followed by any letters (lower or upper case), and/or numeric digits, and/or underscores - nothing else. (For'tuple deconstruction' or 'list deconstruction' consult documentation.)">?</help></field>`,
    );
    id.setText("Ab_1");
    id.parseCurrentText();
    assert.equal(id.getParseStatus(), ParseStatus.invalid);
    assert.equal(id.parseErrorMsg, "");
    id.setText("result");
    id.parseCurrentText();
    assert.equal(id.getParseStatus(), ParseStatus.valid); //Because 'result' is no longer a keyword
    id.setText("default");
    id.parseCurrentText();
    assert.equal(id.getParseStatus(), ParseStatus.invalid);
  });

  test("parse VarDefField 2", () => {
    const main = new MainFrame(
      new FileImpl(hash, new DefaultProfile(), transforms()),
    );
    const letSt = new LetStatement(main);
    const id = letSt.name;
    assert.equal(id.textAsSource(), "");
    assert.equal(id.getParseStatus(), ParseStatus.incomplete);
    id.setText("ab_1");
    id.parseCurrentText();
    assert.equal(id.getParseStatus(), ParseStatus.valid);
    assert.equal(
      id.renderAsHtml(),
      `<field id="var4" class="ok" tabindex=0><text>ab_1</text><placeholder>name</placeholder><completion></completion><msg></msg><help title="A variable name must start with a lower-case letter, optionally followed by any letters (lower or upper case), and/or numeric digits, and/or underscores - nothing else. (For'tuple deconstruction' or 'list deconstruction' consult documentation.)">?</help></field>`,
    );
    id.setText("Ab_1");
    id.parseCurrentText();
    assert.equal(id.getParseStatus(), ParseStatus.invalid);
    id.setText("result");
    id.parseCurrentText();
    assert.equal(id.getParseStatus(), ParseStatus.valid);
    id.setText("default");
    id.parseCurrentText();
    assert.equal(id.getParseStatus(), ParseStatus.invalid);
  });
  test("parse CaseValueField", () => {
    const main = new MainFrame(
      new FileImpl(hash, new DefaultProfile(), transforms()),
    );
    const sw = new Switch(main);
    const c = new Case(sw);
    const f = c.value;
    assert.equal(f.textAsSource(), "");
    assert.equal(f.getParseStatus(), ParseStatus.incomplete);
    f.setText("3");
    f.parseCurrentText();
    assert.equal(f.getParseStatus(), ParseStatus.valid);
    f.setText(`"hello"`);
    f.parseCurrentText();
    assert.equal(f.getParseStatus(), ParseStatus.valid);
    f.setText(`ab`);
    f.parseCurrentText();
    assert.equal(f.getParseStatus(), ParseStatus.invalid);
  });

  test("parse  ArgListField", () => {
    const main = new MainFrame(
      new FileImpl(hash, new DefaultProfile(), transforms()),
    );
    const call = new CallStatement(main);
    const argList = call.args;
    argList.setText("3,4,5");
    argList.parseCurrentText();
    assert.equal(argList.getParseStatus(), ParseStatus.valid);
    argList.setText(`s, a, "hello", b[5]`);
    argList.parseCurrentText();
    assert.equal(argList.getParseStatus(), ParseStatus.valid);
    argList.setText(`5, 3 + 4`);
    argList.parseCurrentText();
    assert.equal(argList.getParseStatus(), ParseStatus.valid);
    argList.setText(`5, (3 + 4)`);
    argList.parseCurrentText();
    assert.equal(argList.getParseStatus(), ParseStatus.valid);
  });

  test("parse ArgListField 2", () => {
    const main = new MainFrame(
      new FileImpl(hash, new DefaultProfile(), transforms()),
    );
    const call = new CallStatement(main);
    const argList = call.args;
    argList.setText("");
    argList.parseCurrentText();
    assert.equal(argList.getParseStatus(), ParseStatus.valid);
  });

  test("parse TypeField invalid", () => {
    const func = new GlobalFunction(
      new FileImpl(hash, new DefaultProfile(), transforms()),
    );
    const type = func.returnType;
    type.setText("Foo<of bar");
    type.parseCurrentText();
    assert.equal(type.getParseStatus(), ParseStatus.invalid);
    assert.equal(type.textAsSource(), "Foo<of bar");
    assert.equal(type.textAsHtml(), "Foo&lt;of bar");
  });

  test("parse ExpressionField - literal string with interpolations", () => {
    const main = new MainFrame(
      new FileImpl(hash, new DefaultProfile(), transforms()),
    );
    const v = new VarStatement(main);
    const expr = v.expr;
    expr.setText(`"{op} times {op2} equals {op1 * op2}"`);
    expr.parseCurrentText();
    assert.equal(expr.getParseStatus(), ParseStatus.valid);
    assert.equal(expr.textAsSource(), `"{op} times {op2} equals {op1 * op2}"`);
    assert.equal(
      expr.textAsHtml(),
      `<string>"</string>{op}<string> times </string>{op2}<string> equals </string>{op1 * op2}<string>"</string>`,
    );
  });

  test("parse ValueRefField", () => {
    const test = new TestFrame(
      new FileImpl(hash, new DefaultProfile(), transforms()),
    );
    const a = new AssertStatement(test);
    const expected = a.expected;
    expected.setText(`[4, 5, 6, 24, 26, 44, 45, 46]`);
    expected.parseCurrentText();
    assert.equal(expected.getParseStatus(), ParseStatus.valid);
    assert.equal(expected.textAsSource(), `[4, 5, 6, 24, 26, 44, 45, 46]`);
    assert.equal(expected.textAsHtml(), `[4, 5, 6, 24, 26, 44, 45, 46]`);
  });
});
