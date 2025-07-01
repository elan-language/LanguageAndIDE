import assert from "assert";
import { DefaultProfile } from "../src/frames/default-profile";
import { FileImpl } from "../src/frames/file-impl";
import { Constant } from "../src/frames/globals/constant";
import { GlobalFunction } from "../src/frames/globals/global-function";
import { MainFrame } from "../src/frames/globals/main-frame";
import { TestFrame } from "../src/frames/globals/test-frame";
import { AssertStatement } from "../src/frames/statements/assert-statement";
import { CallStatement } from "../src/frames/statements/call-statement";
import { CommentStatement } from "../src/frames/statements/comment-statement";
import { LetStatement } from "../src/frames/statements/let-statement";
import { VariableStatement } from "../src/frames/statements/variable-statement";
import { ParseStatus } from "../src/frames/status-enums";
import { hash } from "../src/util";
import { transforms } from "./compiler/compiler-test-helpers";
import { testExtractContextForExpression } from "./testHelpers";

suite("Field Parsing Tests", () => {
  test("parse CommentField", () => {
    const main = new MainFrame(new FileImpl(hash, new DefaultProfile(), "", transforms()));
    const commentStatement = new CommentStatement(main);
    const text = commentStatement.text;
    assert.equal(text.textAsSource(), "");
    assert.equal(text.readParseStatus(), ParseStatus.valid);
    text.setFieldToKnownValidText("Hello");
    text.parseCurrentText();
    assert.equal(text.readParseStatus(), ParseStatus.valid);
    assert.equal(
      text.renderAsHtml(),
      `<el-field id="comment4" class="optional ok" tabindex="-1"><el-txt>Hello</el-txt><el-place><i>comment</i></el-place><el-compl></el-compl><el-msg></el-msg><el-help title="Click to open Help for this field"><a href="documentation/LangRef.html#CommentField" target="doc-iframe" tabindex="-1">?</a></el-help></el-field>`,
    );
  });
  test("parse CommentFieldWithSpaces", () => {
    const main = new MainFrame(new FileImpl(hash, new DefaultProfile(), "", transforms()));
    const commentStatement = new CommentStatement(main);
    const text = commentStatement.text;
    assert.equal(text.textAsSource(), "");
    assert.equal(text.readParseStatus(), ParseStatus.valid);
    text.setFieldToKnownValidText("  Hello   World ");
    text.parseCurrentText();
    assert.equal(text.readParseStatus(), ParseStatus.valid);
    assert.equal(
      text.renderAsHtml(),
      `<el-field id="comment4" class="optional ok" tabindex="-1"><el-txt>&nbsp;&nbsp;Hello &nbsp;&nbsp;World &nbsp;</el-txt><el-place><i>comment</i></el-place><el-compl></el-compl><el-msg></el-msg><el-help title="Click to open Help for this field"><a href="documentation/LangRef.html#CommentField" target="doc-iframe" tabindex="-1">?</a></el-help></el-field>`,
    );
  });
  test("parse varDefField", () => {
    const main = new MainFrame(new FileImpl(hash, new DefaultProfile(), "", transforms()));
    const variable = new VariableStatement(main);
    const id = variable.name;
    assert.equal(id.textAsSource(), "");
    assert.equal(id.readParseStatus(), ParseStatus.incomplete);
    id.setFieldToKnownValidText("ab_1");
    id.parseCurrentText();
    assert.equal(id.readParseStatus(), ParseStatus.valid);
    assert.equal(
      id.renderAsHtml(),
      `<el-field id="var4" class="ok" tabindex="-1"><el-txt><el-id>ab_1</el-id></el-txt><el-place><i>name</i></el-place><el-compl></el-compl><el-msg></el-msg><el-help title="Click to open Help for this field"><a href="documentation/LangRef.html#ValueDefField" target="doc-iframe" tabindex="-1">?</a></el-help></el-field>`,
    );
    id.setFieldToKnownValidText("Ab_1");
    id.parseCurrentText();
    assert.equal(id.readParseStatus(), ParseStatus.invalid);
    id.setFieldToKnownValidText("default");
    id.parseCurrentText();
    assert.equal(id.readParseStatus(), ParseStatus.valid); //Because use of a keyword should now be picked up as a compile error
  });

  test("parse VarDefField 2", () => {
    const main = new MainFrame(new FileImpl(hash, new DefaultProfile(), "", transforms()));
    const letSt = new LetStatement(main);
    const id = letSt.name;
    assert.equal(id.textAsSource(), "");
    assert.equal(id.readParseStatus(), ParseStatus.incomplete);
    id.setFieldToKnownValidText("ab_1");
    id.parseCurrentText();
    assert.equal(id.readParseStatus(), ParseStatus.valid);
    assert.equal(
      id.renderAsHtml(),
      `<el-field id="var4" class="ok" tabindex="-1"><el-txt><el-id>ab_1</el-id></el-txt><el-place><i>name</i></el-place><el-compl></el-compl><el-msg></el-msg><el-help title="Click to open Help for this field"><a href="documentation/LangRef.html#ValueDefField" target="doc-iframe" tabindex="-1">?</a></el-help></el-field>`,
    );
    id.setFieldToKnownValidText("Ab_1");
    id.parseCurrentText();
    assert.equal(id.readParseStatus(), ParseStatus.invalid);
    id.setFieldToKnownValidText("default");
    id.parseCurrentText();
    assert.equal(id.readParseStatus(), ParseStatus.valid); //Because use of a keyword should now be picked up as a compile error
  });
  test("parse  ArgListField", () => {
    const main = new MainFrame(new FileImpl(hash, new DefaultProfile(), "", transforms()));
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
    const main = new MainFrame(new FileImpl(hash, new DefaultProfile(), "", transforms()));
    const call = new CallStatement(main);
    const argList = call.args;
    argList.setFieldToKnownValidText("");
    argList.parseCurrentText();
    assert.equal(argList.readParseStatus(), ParseStatus.valid);
  });

  test("parse TypeField invalid", () => {
    const func = new GlobalFunction(new FileImpl(hash, new DefaultProfile(), "", transforms()));
    const type = func.returnType;
    type.setFieldToKnownValidText("Foo<of bar");
    type.parseCurrentText();
    assert.equal(type.readParseStatus(), ParseStatus.invalid);
    assert.equal(type.textAsSource(), "Foo<of bar");
    assert.equal(type.textAsHtml(), "Foo&lt;of bar");
    type.setFieldToKnownValidText(`foo`);
    type.parseCurrentText();
    assert.equal(type.readParseStatus(), ParseStatus.invalid);
  });

  test("parse ExpressionField - literal string with interpolations", () => {
    const main = new MainFrame(new FileImpl(hash, new DefaultProfile(), "", transforms()));
    const v = new VariableStatement(main);
    const expr = v.expr;
    expr.setFieldToKnownValidText(`"{op} times {op2} equals {op1*op2}"`);
    expr.parseCurrentText();
    assert.equal(expr.readParseStatus(), ParseStatus.valid);
    assert.equal(expr.textAsSource(), `"{op} times {op2} equals {op1*op2}"`);
    assert.equal(
      expr.textAsHtml(),
      `"<el-lit></el-lit>{<el-id>op</el-id>}<el-lit> times </el-lit>{<el-id>op2</el-id>}<el-lit> equals </el-lit>{<el-id>op1</el-id>*<el-id>op2</el-id>}<el-lit></el-lit>"`,
    );
  });

  test("parse ValueRefField", () => {
    const test = new TestFrame(new FileImpl(hash, new DefaultProfile(), "", transforms()));
    const a = new AssertStatement(test);
    const expected = a.expected;
    expected.setFieldToKnownValidText(`{4, 5, 6, 24, 26, 44, 45, 46}`);
    expected.parseCurrentText();
    assert.equal(expected.readParseStatus(), ParseStatus.valid);
    assert.equal(expected.textAsSource(), `{4, 5, 6, 24, 26, 44, 45, 46}`);
    assert.equal(
      expected.textAsHtml(),
      `{<el-lit>4</el-lit>, <el-lit>5</el-lit>, <el-lit>6</el-lit>, <el-lit>24</el-lit>, <el-lit>26</el-lit>, <el-lit>44</el-lit>, <el-lit>45</el-lit>, <el-lit>46</el-lit>}`,
    );
  });
  test("parse instance dot method", () => {
    const test = new TestFrame(new FileImpl(hash, new DefaultProfile(), "", transforms()));
    const a = new LetStatement(test);
    const expr = a.expr;
    expr.setFieldToKnownValidText(`foo.`);
    expr.parseCurrentText();
    assert.equal(expr.readParseStatus(), ParseStatus.incomplete);
    const spec = expr.getSymbolCompletionSpec();
    assert.equal(spec.context, "foo");
  });
  test("parse paramDefs with closing bracket #855", () => {
    const test = new TestFrame(new FileImpl(hash, new DefaultProfile(), "", transforms()));
    const fn = new GlobalFunction(test);
    const params = fn.params;
    params.setFieldToKnownValidText(`a as Int)`);
    params.parseCurrentText();
    assert.equal(params.readParseStatus(), ParseStatus.valid);
    assert.equal(params.textAsSource(), `a as Int`);
  });
  test("parse proc call args list with closing bracket #685", () => {
    const main = new MainFrame(new FileImpl(hash, new DefaultProfile(), "", transforms()));
    const call = new CallStatement(main);
    const args = call.args;
    args.setFieldToKnownValidText(`a)`);
    args.parseCurrentText();
    assert.equal(args.readParseStatus(), ParseStatus.valid);
    assert.equal(args.textAsSource(), `a`);
  });
  test("#950 space at start of var-def-field is ignored", () => {
    const main = new MainFrame(new FileImpl(hash, new DefaultProfile(), "", transforms()));
    const v = new VariableStatement(main);
    const name = v.name;
    name.setFieldToKnownValidText(" ");
    name.parseCurrentText();
    assert.equal(name.readParseStatus(), ParseStatus.incomplete);
    assert.equal(name.textAsSource(), ``);
  });
  test("parse list of listof floats", () => {
    const c = new Constant(new FileImpl(hash, new DefaultProfile(), "", transforms()));
    const v = c.value;
    v.setFieldToKnownValidText(
      `{{0.0,0.0,0.0,0.16,0.0,0.0,0.01},{0.85,0.04,-0.04,0.85,0.0,1.60,0.85},{0.20,-0.26,0.23,0.22,0.0,1.60,0.07},{-0.15,0.28,0.26,0.24,0.0,0.44,0.07}}`,
    );
    v.parseCurrentText();
    assert.equal(v.readParseStatus(), ParseStatus.valid);
  });
  test("parse ExpressionField - extractContextForExpression", () => {
    testExtractContextForExpression(`foo`, ``);
    testExtractContextForExpression(`foo.`, `foo`);
    testExtractContextForExpression(`foo.bar`, `foo`);
    testExtractContextForExpression(`foo123.bar`, `foo123`);
    testExtractContextForExpression(`foo().bar`, `foo`);
    testExtractContextForExpression(`foo(1,2,a).bar`, `foo`);
    testExtractContextForExpression(`123.bar`, ``);
    testExtractContextForExpression(`123.456`, ``);
    testExtractContextForExpression(`qux.foo().bar`, `foo`);
    testExtractContextForExpression(
      `{{0.0,0.0,0.0,0.16,0.0,0.0,0.01},{0.85,0.04,-0.04,0.85,0.0,1.60,0.85},{0.20,-0.26,0.23,0.22,0.0,1.60,0.07},{-0.15,0.28,0.26,0.24,0.0,0.44,0.07`,
      ``,
    );
  });
  test("parse Actual field cannot contain ' is '", () => {
    const test = new TestFrame(new FileImpl(hash, new DefaultProfile(), "", transforms()));
    const assertStatement = new AssertStatement(test);
    const actual = assertStatement.actual!;
    actual.setFieldToKnownValidText("a is b");
    actual.parseCurrentText();
    assert.equal(actual.readParseStatus(), ParseStatus.invalid);
  });
});
