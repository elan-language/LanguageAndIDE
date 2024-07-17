import assert from "assert";
import { DefaultProfile } from "../src/frames/default-profile";
import { FileImpl } from "../src/frames/file-impl";
import { GlobalFunction } from "../src/frames/globals/global-function";
import { MainFrame } from "../src/frames/globals/main-frame";
import { TestFrame } from "../src/frames/globals/test-frame";
import { AssertStatement } from "../src/frames/statements/assert-statement";
import { CallStatement } from "../src/frames/statements/call-statement";
import { Case } from "../src/frames/statements/case";
import { CommentStatement } from "../src/frames/statements/comment-statement";
import { LetStatement } from "../src/frames/statements/let-statement";
import { Switch } from "../src/frames/statements/switch";
import { VarStatement } from "../src/frames/statements/var-statement";
import { ParseStatus } from "../src/frames/status-enums";
import { hash } from "../src/util";
import { transforms } from "./compiler/compiler-test-helpers";

suite("Field Parsing Tests", () => {
  test("parse CommentField", () => {
    const main = new MainFrame(new FileImpl(hash, new DefaultProfile(), transforms()));
    const commentStatement = new CommentStatement(main);
    const text = commentStatement.text;
    assert.equal(text.textAsSource(), "");
    assert.equal(text.readParseStatus(), ParseStatus.valid);
    text.setFieldToKnownValidText("Hello");
    text.parseCurrentText();
    assert.equal(text.readParseStatus(), ParseStatus.valid);
    assert.equal(
      text.renderAsHtml(),
      `<field id="comment4" class="optional ok" tabindex=0><text>Hello</text><placeholder>comment</placeholder><completion></completion><msg></msg><help title="Any text on a single line.">?</help></field>`,
    );
  });
  test("parse varDefField", () => {
    const main = new MainFrame(new FileImpl(hash, new DefaultProfile(), transforms()));
    const variable = new VarStatement(main);
    const id = variable.name;
    assert.equal(id.textAsSource(), "");
    assert.equal(id.readParseStatus(), ParseStatus.incomplete);
    id.setFieldToKnownValidText("ab_1");
    id.parseCurrentText();
    assert.equal(id.readParseStatus(), ParseStatus.valid);
    assert.equal(
      id.renderAsHtml(),
      `<field id="var4" class="ok" tabindex=0><text>ab_1</text><placeholder>name</placeholder><completion></completion><msg></msg><help title="A variable name must start with a lower-case letter, optionally followed by any letters (lower or upper case), and/or numeric digits, and/or underscores - nothing else. (For'tuple deconstruction' or 'list deconstruction' consult documentation.)">?</help></field>`,
    );
    id.setFieldToKnownValidText("Ab_1");
    id.parseCurrentText();
    assert.equal(id.readParseStatus(), ParseStatus.invalid);
    assert.equal(id.parseErrorMsg, "");
    id.setFieldToKnownValidText("default");
    id.parseCurrentText();
    assert.equal(id.readParseStatus(), ParseStatus.valid); //Because use of a keyword should now be picked up as a compile error
  });

  test("parse VarDefField 2", () => {
    const main = new MainFrame(new FileImpl(hash, new DefaultProfile(), transforms()));
    const letSt = new LetStatement(main);
    const id = letSt.name;
    assert.equal(id.textAsSource(), "");
    assert.equal(id.readParseStatus(), ParseStatus.incomplete);
    id.setFieldToKnownValidText("ab_1");
    id.parseCurrentText();
    assert.equal(id.readParseStatus(), ParseStatus.valid);
    assert.equal(
      id.renderAsHtml(),
      `<field id="var4" class="ok" tabindex=0><text>ab_1</text><placeholder>name</placeholder><completion></completion><msg></msg><help title="A variable name must start with a lower-case letter, optionally followed by any letters (lower or upper case), and/or numeric digits, and/or underscores - nothing else. (For'tuple deconstruction' or 'list deconstruction' consult documentation.)">?</help></field>`,
    );
    id.setFieldToKnownValidText("Ab_1");
    id.parseCurrentText();
    assert.equal(id.readParseStatus(), ParseStatus.invalid);
    id.setFieldToKnownValidText("default");
    id.parseCurrentText();
    assert.equal(id.readParseStatus(), ParseStatus.valid); //Because use of a keyword should now be picked up as a compile error
  });
  test("parse CaseValueField", () => {
    const main = new MainFrame(new FileImpl(hash, new DefaultProfile(), transforms()));
    const sw = new Switch(main);
    const c = new Case(sw);
    const f = c.value;
    assert.equal(f.textAsSource(), "");
    assert.equal(f.readParseStatus(), ParseStatus.incomplete);
    f.setFieldToKnownValidText("3");
    f.parseCurrentText();
    assert.equal(f.readParseStatus(), ParseStatus.valid);
    f.setFieldToKnownValidText(`"hello"`);
    f.parseCurrentText();
    assert.equal(f.readParseStatus(), ParseStatus.valid);
    f.setFieldToKnownValidText(`ab`);
    f.parseCurrentText();
    assert.equal(f.readParseStatus(), ParseStatus.invalid);
  });

  test("parse  ArgListField", () => {
    const main = new MainFrame(new FileImpl(hash, new DefaultProfile(), transforms()));
    const call = new CallStatement(main);
    const argList = call.args;
    argList.setFieldToKnownValidText("3,4,5");
    argList.parseCurrentText();
    assert.equal(argList.readParseStatus(), ParseStatus.valid);
    argList.setFieldToKnownValidText(`s, a, "hello", b[5]`);
    argList.parseCurrentText();
    assert.equal(argList.readParseStatus(), ParseStatus.valid);
    argList.setFieldToKnownValidText(`5, 3 + 4`);
    argList.parseCurrentText();
    assert.equal(argList.readParseStatus(), ParseStatus.valid);
    argList.setFieldToKnownValidText(`5, (3 + 4)`);
    argList.parseCurrentText();
    assert.equal(argList.readParseStatus(), ParseStatus.valid);
  });

  test("parse ArgListField 2", () => {
    const main = new MainFrame(new FileImpl(hash, new DefaultProfile(), transforms()));
    const call = new CallStatement(main);
    const argList = call.args;
    argList.setFieldToKnownValidText("");
    argList.parseCurrentText();
    assert.equal(argList.readParseStatus(), ParseStatus.valid);
  });

  test("parse TypeField invalid", () => {
    const func = new GlobalFunction(new FileImpl(hash, new DefaultProfile(), transforms()));
    const type = func.returnType;
    type.setFieldToKnownValidText("Foo<of bar");
    type.parseCurrentText();
    assert.equal(type.readParseStatus(), ParseStatus.invalid);
    assert.equal(type.textAsSource(), "Foo<of bar");
    assert.equal(type.textAsHtml(), "Foo&lt;of bar");
  });

  test("parse ExpressionField - literal string with interpolations", () => {
    const main = new MainFrame(new FileImpl(hash, new DefaultProfile(), transforms()));
    const v = new VarStatement(main);
    const expr = v.expr;
    expr.setFieldToKnownValidText(`"{op} times {op2} equals {op1*op2}"`);
    expr.parseCurrentText();
    assert.equal(expr.readParseStatus(), ParseStatus.valid);
    assert.equal(expr.textAsSource(), `"{op} times {op2} equals {op1*op2}"`);
    assert.equal(
      expr.textAsHtml(),
      `<string>"</string>{op}<string> times </string>{op2}<string> equals </string>{op1*op2}<string>"</string>`,
    );
  });

  test("parse ValueRefField", () => {
    const test = new TestFrame(new FileImpl(hash, new DefaultProfile(), transforms()));
    const a = new AssertStatement(test);
    const expected = a.expected;
    expected.setFieldToKnownValidText(`{4, 5, 6, 24, 26, 44, 45, 46}`);
    expected.parseCurrentText();
    assert.equal(expected.readParseStatus(), ParseStatus.valid);
    assert.equal(expected.textAsSource(), `{4, 5, 6, 24, 26, 44, 45, 46}`);
    assert.equal(expected.textAsHtml(), `{4, 5, 6, 24, 26, 44, 45, 46}`);
  });
});
