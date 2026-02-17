import { abstractKeyword } from "../src/compiler/keywords";
import { StdLib } from "../src/compiler/standard-library/std-lib";
import { DefaultProfile } from "../src/ide/frames/default-profile";
import { Regexes } from "../src/ide/frames/fields/regexes";
import { FileImpl } from "../src/ide/frames/file-impl";
import { AbstractSequence } from "../src/ide/frames/parse-nodes/abstract-sequence";
import { Alternatives } from "../src/ide/frames/parse-nodes/alternatives";
import { BinaryExpression } from "../src/ide/frames/parse-nodes/binary-expression";
import { BinaryOperation } from "../src/ide/frames/parse-nodes/binary-operation";
import { BracketedExpression } from "../src/ide/frames/parse-nodes/bracketed-expression";
import { CommaNode } from "../src/ide/frames/parse-nodes/comma-node";
import { CSV } from "../src/ide/frames/parse-nodes/csv";
import { DictionaryNode } from "../src/ide/frames/parse-nodes/dictionary-node";
import { DotAfter } from "../src/ide/frames/parse-nodes/dot-after";
import { DottedTerm } from "../src/ide/frames/parse-nodes/dotted-term";
import { ExprNode } from "../src/ide/frames/parse-nodes/expr-node";
import { IdentifierNode } from "../src/ide/frames/parse-nodes/identifier-node";
import { IfExpr } from "../src/ide/frames/parse-nodes/if-expr";
import { ImageNode } from "../src/ide/frames/parse-nodes/image-node";
import { InstanceNode } from "../src/ide/frames/parse-nodes/instanceNode";
import { InstanceProcRef } from "../src/ide/frames/parse-nodes/instanceProcRef";
import { KeywordNode } from "../src/ide/frames/parse-nodes/keyword-node";
import { KVPnode } from "../src/ide/frames/parse-nodes/kvp-node";
import { Lambda } from "../src/ide/frames/parse-nodes/lambda";
import { LitFloat } from "../src/ide/frames/parse-nodes/lit-float";
import { LitInt } from "../src/ide/frames/parse-nodes/lit-int";
import { LitRegExp } from "../src/ide/frames/parse-nodes/lit-regExp";
import { LitString } from "../src/ide/frames/parse-nodes/lit-string";
import { LitStringDoubleQuotesNonEmpty } from "../src/ide/frames/parse-nodes/lit-string-double-quotes-non-empty";
import { LitStringInterpolation } from "../src/ide/frames/parse-nodes/lit-string-interpolation";
import { LitValueNode } from "../src/ide/frames/parse-nodes/lit-value-node";
import { MethodCallNode } from "../src/ide/frames/parse-nodes/method-call-node";
import { Multiple } from "../src/ide/frames/parse-nodes/multiple";
import { NewInstance } from "../src/ide/frames/parse-nodes/new-instance";
import { OptionalNode } from "../src/ide/frames/parse-nodes/optional-node";
import { ParamDefNode } from "../src/ide/frames/parse-nodes/param-def-node";
import { Space } from "../src/ide/frames/parse-nodes/parse-node-helpers";
import { PunctuationNode } from "../src/ide/frames/parse-nodes/punctuation-node";
import { Qualifier } from "../src/ide/frames/parse-nodes/qualifier";
import { ReferenceNode } from "../src/ide/frames/parse-nodes/reference-node";
import { RegExMatchNode } from "../src/ide/frames/parse-nodes/regex-match-node";
import { SetToClause } from "../src/ide/frames/parse-nodes/set-to-clause";
import { SpaceNode } from "../src/ide/frames/parse-nodes/space-node";
import { Term } from "../src/ide/frames/parse-nodes/term";
import { TermChained } from "../src/ide/frames/parse-nodes/term-chained";
import { TermSimple } from "../src/ide/frames/parse-nodes/term-simple";
import { TermSimpleWithOptIndex } from "../src/ide/frames/parse-nodes/term-simple-with-opt-index";
import { TupleNode } from "../src/ide/frames/parse-nodes/tuple-node";
import { TypeNameQualifiedNode } from "../src/ide/frames/parse-nodes/type-name-qualified-node";
import { TypeNode } from "../src/ide/frames/parse-nodes/type-node";
import { TypeSimpleOrGeneric } from "../src/ide/frames/parse-nodes/type-simple-or-generic";
import { UnaryExpression } from "../src/ide/frames/parse-nodes/unary-expression";
import { ParseStatus } from "../src/ide/frames/status-enums";
import { DOT } from "../src/ide/frames/symbols";
import { StubInputOutput } from "../src/ide/stub-input-output";
import { hash } from "../src/ide/util";
import { transforms } from "./compiler/compiler-test-helpers";
import { testActiveNodeAndDone, testNodeParseElan } from "./testHelpers";

suite("Parsing Nodes", () => {
  const f = new FileImpl(
    hash,
    new DefaultProfile(),
    "",
    transforms(),
    new StdLib(new StubInputOutput()),
    true,
  );

  test("UnaryExpression", () => {
    testNodeParseElan(new UnaryExpression(f), "", ParseStatus.empty, "", "", "", "");
    testNodeParseElan(new UnaryExpression(f), "-3", ParseStatus.valid, "-3", "", "-3", "");
    testNodeParseElan(
      new UnaryExpression(f),
      " not foo",
      ParseStatus.valid,
      " not foo",
      "",
      "not foo",
      "",
    );
    testNodeParseElan(new UnaryExpression(f), "-", ParseStatus.incomplete, "-", "", "-", "");
    testNodeParseElan(new UnaryExpression(f), "+4", ParseStatus.invalid, "", "+4", "", "");
  });
  test("IndexableTerm", () => {
    testNodeParseElan(new Term(f), "a", ParseStatus.valid, "a", "", "a", "");
  });
  test("Term2", () => {
    testNodeParseElan(new Term(f), "empty ", ParseStatus.invalid, "", "empty ", "");
    testNodeParseElan(new Term(f), "", ParseStatus.empty, "", "", "");
    testNodeParseElan(new Term(f), "a", ParseStatus.valid, "a", "", "a", "");
  });
  test("Expression", () => {
    testNodeParseElan(new ExprNode(f), "", ParseStatus.empty, "", "", "");
    testNodeParseElan(new ExprNode(f), "", ParseStatus.empty, "", "", "");
    testNodeParseElan(new ExprNode(f), "a", ParseStatus.valid, "a", "", "a", "");
    testNodeParseElan(new ExprNode(f), "a + b", ParseStatus.valid, "a + b", "", "a + b", "");
    testNodeParseElan(new ExprNode(f), "a * -b", ParseStatus.valid, "a * -b", "", "a*-b", "");
    testNodeParseElan(new ExprNode(f), "a + b- c", ParseStatus.valid, "", "", "a + b - c", "");
    testNodeParseElan(new ExprNode(f), "+", ParseStatus.invalid, "", "+", "");
    testNodeParseElan(new ExprNode(f), "+b", ParseStatus.invalid, "", "+b", "");
    testNodeParseElan(new ExprNode(f), "a +", ParseStatus.incomplete, "a +", "", "a + ");
    testNodeParseElan(new ExprNode(f), "a %", ParseStatus.valid, "a", " %", "a");
    testNodeParseElan(
      new ExprNode(f),
      "3 * 4 + x",
      ParseStatus.valid,
      "3 * 4 + x",
      "",
      "3*4 + x",
      "",
    );
    testNodeParseElan(new ExprNode(f), "3* foo(5)", ParseStatus.valid, "", "", "3*foo(5)", "");
    testNodeParseElan(
      new ExprNode(f),
      "new List<of String>()",
      ParseStatus.valid,
      "new List<of String>()",
      "",
    );
    testNodeParseElan(
      new ExprNode(f),
      "points.foo(0.0)",
      ParseStatus.valid,
      "points.foo(0.0)",
      "",
      "points.foo(0.0)",
      "",
    );
    testNodeParseElan(
      new ExprNode(f),
      "this",
      ParseStatus.valid,
      "this",
      "",
      "this",
      "<el-kw>this</el-kw>",
    );
    testNodeParseElan(
      new ExprNode(f),
      "thisWidget",
      ParseStatus.valid,
      "thisWidget",
      "",
      "thisWidget",
      "<el-id>thisWidget</el-id>",
    );
    // empty data structures
    testNodeParseElan(
      new ExprNode(f),
      "new List<of Int>()",
      ParseStatus.valid,
      "new List<of Int>()",
      "",
      "",
      "<el-kw>new</el-kw> <el-type>List</el-type>&lt;<el-kw>of</el-kw> <el-type>Int</el-type>&gt;()",
    );
    testNodeParseElan(new ExprNode(f), `""`, ParseStatus.valid, `""`, "", "", `""`);
    testNodeParseElan(new ExprNode(f), "empty Lit<of Int>", ParseStatus.valid, "", "", "", "");
    testNodeParseElan(
      new ExprNode(f),
      "lambda a as (String, String), x as Int => tuple(setAttemptIfGreen(a.attempt, a.target, x), setTargetIfGreen(a.attempt, a.target, x))",
      ParseStatus.valid,
      "lambda a as (String, String), x as Int => tuple(setAttemptIfGreen(a.attempt, a.target, x), setTargetIfGreen(a.attempt, a.target, x))",
      "",
      "lambda a as (String, String), x as Int => tuple(setAttemptIfGreen(a.attempt, a.target, x), setTargetIfGreen(a.attempt, a.target, x))",
      "",
    );
  });
  test("Set To Clause", () => {
    testNodeParseElan(
      new SetToClause(f, () => ""),
      "x set to p.x + 3",
      ParseStatus.valid,
      "",
      "",
      "",
      "",
    );
  });
  test("CSV of set clauses", () => {
    testNodeParseElan(
      new CSV(f, () => new SetToClause(f, () => ""), 1),
      "x set to p.x + 3, y set to p.y - 1",
      ParseStatus.valid,
      "",
      "",
      "",
      "",
    );
  });

  test("Expression + with clause", () => {
    testNodeParseElan(
      new ExprNode(f),
      "copy p with x set to p.x + 3, y set to p.y - 1",
      ParseStatus.valid,
      "",
      "",
      "",
      "",
    );
  });
  test("new record + with clause", () => {
    testNodeParseElan(
      new ExprNode(f),
      "new Foo() with x set to 3, y set to 1",
      ParseStatus.valid,
      "",
      "",
      "",
      "",
    );
  });
  test("Identifier", () => {
    testNodeParseElan(new IdentifierNode(f), ``, ParseStatus.empty, ``, "", "");
    testNodeParseElan(new IdentifierNode(f), `  `, ParseStatus.invalid, ``, "", "");
    testNodeParseElan(new IdentifierNode(f), `a`, ParseStatus.valid, `a`, "", "a", "");
    testNodeParseElan(new IdentifierNode(f), `aB_d`, ParseStatus.valid, `aB_d`, "", "aB_d");
    testNodeParseElan(new IdentifierNode(f), `abc `, ParseStatus.valid, `abc`, " ", "abc");
    testNodeParseElan(new IdentifierNode(f), `Abc`, ParseStatus.invalid, ``, "Abc", "");
    testNodeParseElan(new IdentifierNode(f), `abc-de`, ParseStatus.valid, `abc`, "-de", "abc");
    // Can be a keyword - because that will be rejected at compile stage, not parse stage
    testNodeParseElan(new IdentifierNode(f), `new`, ParseStatus.valid, `new`, "", "");
    testNodeParseElan(new IdentifierNode(f), `global`, ParseStatus.valid, `global`, "", "");
    testNodeParseElan(new IdentifierNode(f), `x as`, ParseStatus.valid, `x`, " as", "x");
    testNodeParseElan(new IdentifierNode(f), `_a`, ParseStatus.valid, `_a`, "", "_a", "");
    testNodeParseElan(new IdentifierNode(f), `_`, ParseStatus.invalid, ``, "_", "");
  });
  test("LitString - single chars", () => {
    testNodeParseElan(new LitString(f), "", ParseStatus.empty, "", "", "", "");
    testNodeParseElan(new LitString(f), `"a"`, ParseStatus.valid, `"a"`, "", `"a"`, "");
    testNodeParseElan(new LitString(f), `"a`, ParseStatus.incomplete, `"a`, "", `"a`, "");
    testNodeParseElan(new LitString(f), `"9"`, ParseStatus.valid, `"9"`, "", `"9"`, "");
    testNodeParseElan(new LitString(f), `" "`, ParseStatus.valid, `" "`, "", `" "`, "");
  });
  test("LitString - bug #328", () => {
    testNodeParseElan(new LitString(f), `" `, ParseStatus.incomplete, `" `, "", `" `, "");
    testNodeParseElan(new LitString(f), `"{a} `, ParseStatus.incomplete, `"{a} `, "", `"{a} `, "");
  });
  test("LitInt", () => {
    testNodeParseElan(new LitInt(f), "", ParseStatus.empty, "", "", "", "");
    testNodeParseElan(new LitInt(f), "   ", ParseStatus.invalid, "", "   ", "", "");
    testNodeParseElan(new LitInt(f), "123", ParseStatus.valid, "123", "", "123", "");
    testNodeParseElan(new LitInt(f), "-123", ParseStatus.valid, "-123", "", "-123", "");
    testNodeParseElan(new LitInt(f), "- 123", ParseStatus.invalid, "", "- 123", "", "");
    testNodeParseElan(new LitInt(f), "1-23", ParseStatus.valid, "1", "-23", "", "");
    testNodeParseElan(new LitInt(f), "456  ", ParseStatus.valid, "456", "  ", "456", "");
    testNodeParseElan(new LitInt(f), " 123a", ParseStatus.valid, " 123", "a", "123", "");
    testNodeParseElan(new LitInt(f), "1.23", ParseStatus.valid, "1", ".23", "1", "");
    testNodeParseElan(new LitInt(f), "a", ParseStatus.invalid, "", "a", "", "");
    //Hex & binary
    testNodeParseElan(
      new LitInt(f),
      "0xfa3c",
      ParseStatus.valid,
      "0xfa3c",
      "",
      "",
      "<el-lit>0xfa3c</el-lit>",
    );
    testNodeParseElan(new LitInt(f), "0xfa3g", ParseStatus.valid, "0xfa3", "g", "", "");
    testNodeParseElan(
      new LitInt(f),
      "0b01101",
      ParseStatus.valid,
      "0b01101",
      "",
      "",
      "<el-lit>0b01101</el-lit>",
    );
    testNodeParseElan(new LitInt(f), "0b01102", ParseStatus.valid, "0b0110", "2", "", "");
  });
  test("LitFloat", () => {
    testNodeParseElan(new LitFloat(f), "", ParseStatus.empty, "", "", "");
    testNodeParseElan(new LitFloat(f), "1.0", ParseStatus.valid, "1.0", "", "1.0");
    testNodeParseElan(new LitFloat(f), "-1.0", ParseStatus.valid, "-1.0", "", "-1.0");
    testNodeParseElan(new LitFloat(f), "- 1.0", ParseStatus.invalid, "", "- 1.0", "");
    testNodeParseElan(new LitFloat(f), "1.-0", ParseStatus.invalid, "", "1.-0", "");
    testNodeParseElan(new LitFloat(f), " 1.0a", ParseStatus.valid, " 1.0", "a", "1.0");
    testNodeParseElan(new LitFloat(f), "1", ParseStatus.incomplete, "1", "", "1");
    testNodeParseElan(new LitFloat(f), "1.", ParseStatus.incomplete, "1.", "", "1.");
    testNodeParseElan(new LitFloat(f), "1. ", ParseStatus.invalid, "", "1. ", "");
    testNodeParseElan(new LitFloat(f), "1.1e5", ParseStatus.valid, "1.1e5", "", "1.1e5");
    testNodeParseElan(new LitFloat(f), "1.1e-5", ParseStatus.valid, "1.1e-5", "", "1.1e-5");
    testNodeParseElan(new LitFloat(f), "1.1E-5", ParseStatus.valid, "1.1E-5", "", "1.1E-5");
  });
  test("Keyword", () => {
    testNodeParseElan(new KeywordNode(f, abstractKeyword), "", ParseStatus.empty, "", "", "");
    testNodeParseElan(
      new KeywordNode(f, abstractKeyword),
      "abstract ",
      ParseStatus.valid,
      "abstract",
      " ",
      "",
    );
    testNodeParseElan(
      new KeywordNode(f, abstractKeyword),
      "abstract(x",
      ParseStatus.valid,
      "abstract",
      "(x",
      "",
    );
    testNodeParseElan(
      new KeywordNode(f, abstractKeyword),
      "abstractx",
      ParseStatus.invalid,
      "",
      "abstractx",
      "",
    );
    testNodeParseElan(
      new KeywordNode(f, abstractKeyword),
      "abstract immutable",
      ParseStatus.valid,
      "abstract",
      " immutable",
      "abstract",
    );
    testNodeParseElan(
      new KeywordNode(f, abstractKeyword),
      " abs",
      ParseStatus.incomplete,
      " abs",
      "",
      "abs",
    );
    testNodeParseElan(
      new KeywordNode(f, abstractKeyword),
      " abscract",
      ParseStatus.invalid,
      "",
      " abscract",
      "",
    );
  });
  test("BracketedExpression", () => {
    testNodeParseElan(
      new BracketedExpression(f),
      "(3 + 4)",
      ParseStatus.valid,
      "(3 + 4)",
      "",
      "(3 + 4)",
      "",
    );

    testNodeParseElan(new BracketedExpression(f), "", ParseStatus.empty, "", "", "");
    testNodeParseElan(new BracketedExpression(f), "(3)", ParseStatus.valid, "(3)", "", "(3)", "");

    testNodeParseElan(
      new BracketedExpression(f),
      "(a and not b)",
      ParseStatus.valid,
      "(a and not b)",
      "",
      "(a and not b)",
      "",
    );
    testNodeParseElan(
      new BracketedExpression(f),
      "(3 * 4 + x)",
      ParseStatus.valid,
      "(3 * 4 + x)",
      "",
      "(3*4 + x)",
      "",
    );
    testNodeParseElan(
      new BracketedExpression(f),
      "(3 * (4 + x))",
      ParseStatus.valid,
      "(3 * (4 + x))",
      "",
      "(3*(4 + x))",
      "",
    );
    testNodeParseElan(
      new BracketedExpression(f),
      "(a and not b",
      ParseStatus.incomplete,
      "(a and not b",
      "",
      "(a and not b",
    );
    //testNodeParse(new BracketedExpression(), "(a and not b  ", ParseStatus.incomplete, "(a and not b  ", "", "(a and not b"); TODO
    testNodeParseElan(new BracketedExpression(f), "(", ParseStatus.incomplete, "(", "", "(");
    testNodeParseElan(new BracketedExpression(f), "()", ParseStatus.invalid, "", "()", "");
  });
  test("Optional", () => {
    testNodeParseElan(
      new OptionalNode(f, new LitInt(f)),
      "123 a",
      ParseStatus.valid,
      "123",
      " a",
      "123",
    );
    testNodeParseElan(new OptionalNode(f, new LitInt(f)), "abc", ParseStatus.valid, "", "abc", "");
    testNodeParseElan(
      new OptionalNode(f, new KeywordNode(f, abstractKeyword)),
      " abstract",
      ParseStatus.valid,
      " abstract",
      "",
      "abstract",
      "<el-kw>abstract</el-kw>",
    );
    testNodeParseElan(
      new OptionalNode(f, new KeywordNode(f, abstractKeyword)),
      "abs",
      ParseStatus.incomplete,
      "abs",
      "",
      "",
    );
    testNodeParseElan(
      new OptionalNode(f, new KeywordNode(f, abstractKeyword)),
      "abscract",
      ParseStatus.valid,
      "",
      "abscract",
      "",
    );
    testNodeParseElan(
      new OptionalNode(f, new KeywordNode(f, abstractKeyword)),
      "",
      ParseStatus.valid,
      "",
      "",
      "",
    );
    testNodeParseElan(
      new OptionalNode(f, new KeywordNode(f, abstractKeyword)),
      "  ",
      ParseStatus.incomplete,
      "  ",
      "",
      "",
    );
  });

  test("Multiple", () => {
    testNodeParseElan(new Multiple(f, () => new LitInt(f), 0), ``, ParseStatus.valid, ``, "", "");
    testNodeParseElan(new Multiple(f, () => new LitInt(f), 1), ``, ParseStatus.empty, ``, "", "");
    testNodeParseElan(new Multiple(f, () => new LitInt(f), 0), `)`, ParseStatus.valid, ``, ")", "");
    testNodeParseElan(
      new Multiple(f, () => new LitInt(f), 1),
      `1 0 33`,
      ParseStatus.valid,
      `1 0 33`,
      "",
      "",
    );
    testNodeParseElan(new Multiple(f, () => new LitInt(f), 1), `1`, ParseStatus.valid, `1`, "", "");
    testNodeParseElan(new Multiple(f, () => new LitInt(f), 0), ``, ParseStatus.valid, ``, "", "");
    testNodeParseElan(new Multiple(f, () => new LitInt(f), 1), ``, ParseStatus.empty, ``, "", "");
    testNodeParseElan(
      new Multiple(f, () => new LitInt(f), 1),
      `5 6 a`,
      ParseStatus.valid,
      `5 6`,
      " a",
      "",
    );
    testNodeParseElan(
      new Multiple(f, () => new LitInt(f), 1),
      `7   `,
      ParseStatus.valid,
      `7`,
      "   ",
      "",
    );

    testNodeParseElan(
      new Multiple(f, () => new KeywordNode(f, "foo"), 1),
      `foo foo`,
      ParseStatus.valid,
      "",
      "",
      "",
    );
    testNodeParseElan(
      new Multiple(f, () => new KeywordNode(f, "bar"), 1),
      `bar ba`,
      ParseStatus.incomplete,
      "bar ba",
      "",
      "",
    );
    testNodeParseElan(
      new Multiple(f, () => new KeywordNode(f, "foo"), 1),
      `foo`,
      ParseStatus.valid,
      "",
      "",
      "",
    );
    testNodeParseElan(
      new Multiple(f, () => new KeywordNode(f, "foo"), 1),
      `fo`,
      ParseStatus.incomplete,
      "",
      "",
      "",
    );
    testNodeParseElan(
      new Multiple(f, () => new KeywordNode(f, "foo"), 1),
      `foo,foo`,
      ParseStatus.valid,
      "",
      ",foo",
      "",
    );
    testNodeParseElan(
      new Multiple(f, () => new KeywordNode(f, "foo"), 1),
      `foofoo`,
      ParseStatus.invalid,
      "",
      "foofoo",
      "",
    );
  });
  test("CommaNode", () => {
    testNodeParseElan(new CommaNode(f), ``, ParseStatus.empty, ``, "", "");
    testNodeParseElan(new CommaNode(f), `,`, ParseStatus.valid, ``, "", ", ");
    testNodeParseElan(new CommaNode(f), ` ,`, ParseStatus.valid, `,`, "", ", ");
    testNodeParseElan(new CommaNode(f), `,    `, ParseStatus.valid, ``, "", ", ");
    testNodeParseElan(new CommaNode(f), `.`, ParseStatus.invalid, ``, ".", "");
    testNodeParseElan(new CommaNode(f), `,,`, ParseStatus.valid, `,`, ",", "");
  });
  test("CSV", () => {
    testNodeParseElan(
      new CSV(f, () => new PunctuationNode(f, "a"), 0),
      `a,a,a`,
      ParseStatus.valid,
      `a,a,a`,
      "",
      "a, a, a",
    );
    testNodeParseElan(
      new CSV(f, () => new PunctuationNode(f, "a"), 0),
      `a,`,
      ParseStatus.incomplete,
      `a,`,
      "",
      "a, ",
    );
    testNodeParseElan(
      new CSV(f, () => new PunctuationNode(f, "a"), 0),
      `x`,
      ParseStatus.valid,
      ``,
      "x",
      "",
    );
    testNodeParseElan(
      new CSV(f, () => new PunctuationNode(f, "a"), 1),
      `x`,
      ParseStatus.invalid,
      ``,
      "x",
      "",
    );
    testNodeParseElan(
      new CSV(f, () => new PunctuationNode(f, "a"), 0),
      `a,a,x`,
      ParseStatus.valid,
      `a,a`,
      ",x",
      "a, a",
    );
    testNodeParseElan(new CSV(f, () => new LitInt(f), 0), ``, ParseStatus.valid, ``, "", "");
    testNodeParseElan(new CSV(f, () => new LitInt(f), 1), ``, ParseStatus.empty, ``, "", "");
    testNodeParseElan(new CSV(f, () => new LitInt(f), 0), `2`, ParseStatus.valid, `2`, "", "");
    testNodeParseElan(new CSV(f, () => new LitInt(f), 1), `2`, ParseStatus.valid, `2`, "", "");
    testNodeParseElan(
      new CSV(f, () => new LitString(f), 0),
      `"apple","orange", "pear"`,
      ParseStatus.valid,
      `"apple","orange", "pear"`,
      "",
      `"apple", "orange", "pear"`,
    );
    testNodeParseElan(
      new CSV(f, () => new IdentifierNode(f), 0),
      `a,b,c`,
      ParseStatus.valid,
      `a,b,c`,
      "",
      "a, b, c",
    );
    testNodeParseElan(
      new CSV(f, () => new IdentifierNode(f), 0),
      `1`,
      ParseStatus.valid,
      ``,
      "1",
      "",
    );
    testNodeParseElan(
      new CSV(f, () => new IdentifierNode(f), 1),
      `1`,
      ParseStatus.invalid,
      ``,
      "1",
      "",
    );
    testNodeParseElan(
      new CSV(f, () => new IdentifierNode(f), 0),
      `a,1`,
      ParseStatus.valid,
      `a`,
      ",1",
      "",
    );
    testNodeParseElan(
      new CSV(f, () => new IdentifierNode(f), 0),
      `a,b,1`,
      ParseStatus.valid,
      `a,b`,
      ",1",
      "",
    );
    testNodeParseElan(
      new CSV(f, () => new ExprNode(f), 0),
      `a + b, c, 1`,
      ParseStatus.valid,
      `a + b, c, 1`,
      "",
      "",
    );
    testNodeParseElan(new CSV(f, () => new ExprNode(f), 0), `)`, ParseStatus.valid, ``, ")", "");

    testNodeParseElan(
      new CSV(f, () => new KeywordNode(f, "foo"), 0),
      `foo, foo`,
      ParseStatus.valid,
      "",
      "",
    );
    testNodeParseElan(
      new CSV(f, () => new KeywordNode(f, "foo"), 0),
      `foo`,
      ParseStatus.valid,
      "",
      "",
    );
    testNodeParseElan(
      new CSV(f, () => new KeywordNode(f, "foo"), 1),
      `fook`,
      ParseStatus.invalid,
      "",
      "fook",
    );
    testNodeParseElan(
      new CSV(f, () => new KeywordNode(f, "foo"), 0),
      ``,
      ParseStatus.valid,
      "",
      "",
    );
    testNodeParseElan(
      new CSV(f, () => new KeywordNode(f, "foo"), 1),
      `fo`,
      ParseStatus.incomplete,
      "fo",
      "",
    );
    testNodeParseElan(
      new CSV(f, () => new KeywordNode(f, "foo"), 0),
      `fo`,
      ParseStatus.incomplete,
      "fo",
      "",
    );
    testNodeParseElan(
      new CSV(f, () => new KeywordNode(f, "foo"), 2),
      `foo, fo`,
      ParseStatus.incomplete,
      "foo, fo",
      "",
    );
    testNodeParseElan(
      new CSV(f, () => new KeywordNode(f, "foo"), 2),
      `foo,`,
      ParseStatus.incomplete,
      "foo,",
      "",
    );
    testNodeParseElan(
      new CSV(f, () => new KeywordNode(f, "foo"), 2),
      `foo, `,
      ParseStatus.incomplete,
      "foo, ",
      "",
    );
    testNodeParseElan(
      new CSV(f, () => new KeywordNode(f, "foo"), 2),
      `foo,fo`,
      ParseStatus.incomplete,
      "foo,fo",
      "",
      "foo, fo",
    );

    testNodeParseElan(new CSV(f, () => new ExprNode(f), 0), ``, ParseStatus.valid, "", "");
  });
  test("Instance", () => {
    testNodeParseElan(new InstanceNode(f), ``, ParseStatus.empty, ``, "", "");
    testNodeParseElan(new InstanceNode(f), `bar`, ParseStatus.valid, `bar`, "", "");
    testNodeParseElan(new InstanceNode(f), `bar[foo]`, ParseStatus.valid, `bar[foo]`, "", "");
    //testNodeParse(new InstanceNode(), `bar[foo][0]`, ParseStatus.valid, `bar[foo][0]`, "", "");
  });

  test("Function Call", () => {
    testNodeParseElan(new MethodCallNode(f), ``, ParseStatus.empty, ``, "", "");
    testNodeParseElan(new MethodCallNode(f), `  `, ParseStatus.empty, ``, "", "");
    testNodeParseElan(
      new MethodCallNode(f),
      `foo()`,
      ParseStatus.valid,
      `foo()`,
      "",
      "foo()",
      "<el-method>foo</el-method>()",
    );
    testNodeParseElan(
      new MethodCallNode(f),
      `bar(x, 1, "hello")`,
      ParseStatus.valid,
      `bar(x, 1, "hello")`,
      "",
      "",
      "",
    );
    testNodeParseElan(new MethodCallNode(f), `yon`, ParseStatus.incomplete, `yon`, "", "");
    testNodeParseElan(new MethodCallNode(f), `yon `, ParseStatus.invalid, ``, "yon ", "");
    testNodeParseElan(new MethodCallNode(f), `yon(`, ParseStatus.incomplete, `yon(`, "", "");
    testNodeParseElan(new MethodCallNode(f), `yon(a`, ParseStatus.incomplete, `yon(a`, "", "");
    testNodeParseElan(new MethodCallNode(f), `yon(a,`, ParseStatus.incomplete, `yon(a,`, "", "");
    testNodeParseElan(new MethodCallNode(f), `Foo()`, ParseStatus.invalid, ``, "Foo()", "");
    testNodeParseElan(new MethodCallNode(f), `foo[]`, ParseStatus.invalid, ``, "foo[]", "");
    testNodeParseElan(
      new MethodCallNode(f),
      `foo(a)`,
      ParseStatus.valid,
      ``,
      "",
      "foo(a)",
      "<el-method>foo</el-method>(<el-id>a</el-id>)",
    );
    testNodeParseElan(new MethodCallNode(f), `isBefore(b[0])`, ParseStatus.valid, ``, "", "");
  });
  test("TypeSimpleNode", () => {
    testNodeParseElan(
      new TypeNameQualifiedNode(f),
      `Foo`,
      ParseStatus.valid,
      "Foo",
      "",
      "",
      "<el-type>Foo</el-type>",
    );
    testNodeParseElan(new TypeNameQualifiedNode(f), `foo`, ParseStatus.invalid, "", "foo", "");
  });
  test("TypeSimpleOrGeneric", () => {
    testNodeParseElan(new TypeSimpleOrGeneric(f), `Foo`, ParseStatus.valid, "Foo", "", "", "");
    testNodeParseElan(new TypeSimpleOrGeneric(f), `foo`, ParseStatus.invalid, "", "foo", "");
    testNodeParseElan(new TypeSimpleOrGeneric(f), `Foo<`, ParseStatus.incomplete, "Foo<", "", "");
    testNodeParseElan(
      new TypeSimpleOrGeneric(f),
      `Foo<of`,
      ParseStatus.incomplete,
      "Foo<of",
      "",
      "",
    );
    testNodeParseElan(
      new TypeSimpleOrGeneric(f),
      `Foo<of Bar`,
      ParseStatus.incomplete,
      "Foo<of Bar",
      "",
      "",
    );
    testNodeParseElan(new TypeSimpleOrGeneric(f), `Foo<ofBar`, ParseStatus.valid, "", "<ofBar", "");
    testNodeParseElan(
      new TypeSimpleOrGeneric(f),
      `Foo<of Bar>`,
      ParseStatus.valid,
      "Foo<of Bar>",
      "",
      "",
      "<el-type>Foo</el-type>&lt;<el-kw>of</el-kw> <el-type>Bar</el-type>&gt;",
    );
    testNodeParseElan(
      new TypeSimpleOrGeneric(f),
      `Dictionary<of Bar, Yon>`,
      ParseStatus.valid,
      "Dictionary<of Bar, Yon>",
      "",
      "",
      "<el-type>Dictionary</el-type>&lt;<el-kw>of</el-kw> <el-type>Bar</el-type>, <el-type>Yon</el-type>&gt;",
    );
  });
  test("TypeNode", () => {
    //Single
    testNodeParseElan(new TypeNode(f), `(Foo, Bar)`, ParseStatus.valid, "(Foo, Bar)", "", "");
    testNodeParseElan(new TypeNode(f), `(Foo)`, ParseStatus.invalid, "", "(Foo)", "");
    testNodeParseElan(
      new TypeNode(f),
      `(Foo, Bar, Yon`,
      ParseStatus.incomplete,
      "(Foo, Bar, Yon",
      "",
      "",
    );
    testNodeParseElan(
      new TypeNode(f),
      `(Foo, (Bar, Yon, Qux))`,
      ParseStatus.valid,
      "(Foo, (Bar, Yon, Qux))",
      "",
      "",
    );
    testNodeParseElan(
      new TypeNode(f),
      `(Foo, Bar< of Yon>)`,
      ParseStatus.valid,
      "(Foo, Bar< of Yon>)",
      "",
      "",
    );
  });
  test("TypeNode - Func", () => {
    testNodeParseElan(
      new TypeNode(f),
      `Func<of Foo, Bar => Yon>`,
      ParseStatus.valid,
      "Func<of Foo, Bar => Yon>",
      "",
      "",
    ); //Single
  });
  test("TypeNode - library qualifier", () => {
    testNodeParseElan(
      new TypeNode(f),
      `library.Random`,
      ParseStatus.valid,
      "library.Random",
      "",
      "",
    ); //Single
  });
  test("TypeNode - other qualifier", () => {
    testNodeParseElan(
      new TypeNode(f),
      `global.Random`,
      ParseStatus.invalid,
      "",
      "global.Random",
      "",
    ); //Single
  });
  test("TupleNode", () => {
    testNodeParseElan(new TupleNode(f), `tuple(3,4)`, ParseStatus.valid, "", "", "");
    testNodeParseElan(
      new TupleNode(f),
      `tuple(3,"a", "hello", 4.1, true)`,
      ParseStatus.valid,
      "",
      "",
      "",
    );
    testNodeParseElan(
      new TupleNode(f),
      `tuple(tuple(3,4), tuple("a", true))`,
      ParseStatus.valid,
      "",
      "",
      "",
    );
    testNodeParseElan(
      new TupleNode(f),
      `tuple(3,"a", "hello", 4.1, true`,
      ParseStatus.incomplete,
      "",
      "",
      "",
    );
    testNodeParseElan(
      new TupleNode(f),
      `tuple(3,"a", "hello", 4.1,`,
      ParseStatus.incomplete,
      "",
      "",
      "",
    );
    testNodeParseElan(new TupleNode(f), `tuple[3,4]`, ParseStatus.invalid, "", "tuple[3,4]", "");
    testNodeParseElan(new TupleNode(f), `tuple(a,b)`, ParseStatus.valid, "tuple(a,b)", "", "");
    testNodeParseElan(new TupleNode(f), `tuple(`, ParseStatus.incomplete, "tuple(", "", "");
    testNodeParseElan(new TupleNode(f), `tuple(3`, ParseStatus.incomplete, "tuple(3", "", "");
    testNodeParseElan(new TupleNode(f), `tuple(3)`, ParseStatus.invalid, "", "tuple(3)", "");
    testNodeParseElan(new TupleNode(f), `tuple()`, ParseStatus.invalid, "", "tuple()", "");
    testNodeParseElan(
      new TupleNode(f),
      `tuple("foo", 3)`,
      ParseStatus.valid,
      'tuple("foo", 3)',
      "",
      "",
      "",
    );
    testNodeParseElan(
      new TupleNode(f),
      `tuple(foo, 3, bar(a), x)`,
      ParseStatus.valid,
      "tuple(foo, 3, bar(a), x)",
      "",
      "",
    );
    testNodeParseElan(new TupleNode(f), `tuple(foo)`, ParseStatus.invalid, "", "tuple(foo)", "");
    testNodeParseElan(
      new TupleNode(f),
      `tuple(foo, 3, bar(a), x`,
      ParseStatus.incomplete,
      "tuple(foo, 3, bar(a), x",
      "",
      "",
    );
    testNodeParseElan(
      new TupleNode(f),
      `tuple(setAttemptIfGreen(a.attempt, a.target, x), setTargetIfGreen(a.attempt, a.target, x))`,
      ParseStatus.valid,
      "",
      "",
      "tuple(setAttemptIfGreen(a.attempt, a.target, x), setTargetIfGreen(a.attempt, a.target, x))",
    );
  });
  test("Lambda", () => {
    testNodeParseElan(
      new Lambda(f),
      `lambda x as Int => x * x`,
      ParseStatus.valid,
      "lambda x as Int => x * x",
      "",
      "",
    );
    testNodeParseElan(new Lambda(f), `lambda x`, ParseStatus.incomplete, "lambda x", "", "");
    testNodeParseElan(
      new Lambda(f),
      `lambda x => x * x`,
      ParseStatus.invalid,
      "",
      "lambda x => x * x",
      "",
    );
    testNodeParseElan(
      new Lambda(f),
      `lambda bestSoFar as String, newWord as String => betterOf(bestSoFar, newWord, possAnswers)`,
      ParseStatus.valid,
      "",
      "",
      "",
    );
    testNodeParseElan(
      new Lambda(f),
      `lambda a as (String, String), x as Int => tuple(setAttemptIfGreen(a.attempt, a.target, x), setTargetIfGreen(a.attempt, a.target, x))`,
      ParseStatus.valid,
      "",
      "",
      "lambda a as (String, String), x as Int => tuple(setAttemptIfGreen(a.attempt, a.target, x), setTargetIfGreen(a.attempt, a.target, x))",
    );
  });
  test("IfExpr", () => {
    testNodeParseElan(
      new IfExpr(f),
      `if cell then Colour.green else Colour.black)`,
      ParseStatus.valid,
      "",
      ")",
      "",
      "<el-kw>if </el-kw><el-id>cell</el-id><el-kw> then </el-kw><el-type>Colour</el-type>.<el-id>green</el-id><el-kw> else </el-kw><el-type>Colour</el-type>.<el-id>black</el-id>",
    );
    testNodeParseElan(
      new IfExpr(f),
      `if cell then Colour.amber`,
      ParseStatus.incomplete,
      "",
      "",
      "",
    );
    testNodeParseElan(
      new IfExpr(f),
      `if attempt[n] is "*" then attempt else if attempt.isYellow(target, n) then attempt.setChar(n, "+") else attempt.setChar(n, "_")`,
      ParseStatus.valid,
      "",
      "",
      "",
    );
    testNodeParseElan(
      new IfExpr(f),
      `if attempt.isAlreadyMarkedGreen(n) then target else if attempt.isYellow(target, n) then target.setChar(target.indexOf(attempt[n]), ".") else target`,
      ParseStatus.valid,
      "",
      "",
      "",
    );
    testNodeParseElan(
      new IfExpr(f),
      `if score > 80 then "Distinction" else if score > 60 then "Merit" else if score > 40 then "Pass" else "Fail"`,
      ParseStatus.valid,
      "",
      "",
      "",
    );
  });
  test("ParamDefNode", () => {
    testNodeParseElan(
      new ParamDefNode(f),
      `x as String`,
      ParseStatus.valid,
      "x as String",
      "",
      "x as String",
      "<el-id>x</el-id> <el-kw>as</el-kw> <el-type>String</el-type>",
    );
    testNodeParseElan(new ParamDefNode(f), `z`, ParseStatus.incomplete, "z", "", "");
    testNodeParseElan(new ParamDefNode(f), `w as`, ParseStatus.incomplete, "w as", "", "");
    testNodeParseElan(new ParamDefNode(f), `A`, ParseStatus.invalid, "", "A", "");
    testNodeParseElan(new ParamDefNode(f), `v String`, ParseStatus.invalid, "", "v String", "");
  });
  test("Param List", () => {
    testNodeParseElan(
      new CSV(f, () => new ParamDefNode(f), 0),
      `A as string`,
      ParseStatus.valid,
      "",
      "A as string",
      "",
    ); //i.e. all leftover
    testNodeParseElan(new CSV(f, () => new ParamDefNode(f), 0), ``, ParseStatus.valid, "", "", "");
    testNodeParseElan(
      new CSV(f, () => new ParamDefNode(f), 0),
      `a as String`,
      ParseStatus.valid,
      "",
      "",
      "",
    );
    testNodeParseElan(
      new CSV(f, () => new ParamDefNode(f), 0),
      `a as String, bb as Int, foo as Bar`,
      ParseStatus.valid,
      "",
      "",
      "",
    );
    testNodeParseElan(
      new CSV(f, () => new ParamDefNode(f), 0),
      `a`,
      ParseStatus.incomplete,
      "a",
      "",
      "",
    );
    testNodeParseElan(
      new CSV(f, () => new ParamDefNode(f), 0),
      `a as String,`,
      ParseStatus.incomplete,
      "a as String,",
      "",
      "",
    );
    testNodeParseElan(
      new CSV(f, () => new ParamDefNode(f), 0),
      `a as String, bb as`,
      ParseStatus.incomplete,
      "",
      "",
      "",
    );
  });
  test("KVP", () => {
    testNodeParseElan(
      new KVPnode(
        f,
        () => new LitString(f),
        () => new LitInt(f),
      ),
      `"a":37`,
      ParseStatus.valid,
      "",
      "",
      "",
    );
    testNodeParseElan(
      new KVPnode(
        f,
        () => new LitString(f),
        () => new LitInt(f),
      ),
      `"a":`,
      ParseStatus.incomplete,
      "",
      "",
      "",
    );
    testNodeParseElan(
      new KVPnode(
        f,
        () => new LitString(f),
        () => new LitInt(f),
      ),
      `"a"`,
      ParseStatus.incomplete,
      "",
      "",
      "",
    );
    testNodeParseElan(
      new KVPnode(
        f,
        () => new LitString(f),
        () => new LitInt(f),
      ),
      `"a":"b"`,
      ParseStatus.invalid,
      "",
      `"a":"b"`,
      "",
    );
  });
  test("Dictionary", () => {
    testNodeParseElan(
      new DictionaryNode(
        f,
        () => new LitString(f),
        () => new LitInt(f),
      ),
      `["a":37]`,
      ParseStatus.valid,
      `["a":37]`,
      "",
      "",
    );
    testNodeParseElan(
      new DictionaryNode(
        f,
        () => new LitString(f),
        () => new LitInt(f),
      ),
      `["a":37, "b":42]`,
      ParseStatus.valid,
      "",
      "",
      "",
    );
    testNodeParseElan(
      new DictionaryNode(
        f,
        () => new LitString(f),
        () => new LitInt(f),
      ),
      `["a":37, "b":42`,
      ParseStatus.incomplete,
      "",
      "",
      "",
    );
    testNodeParseElan(
      new DictionaryNode(
        f,
        () => new LitString(f),
        () => new LitInt(f),
      ),
      `["a":37,`,
      ParseStatus.incomplete,
      "",
      "",
      "",
    );
    testNodeParseElan(
      new DictionaryNode(
        f,
        () => new LitString(f),
        () => new LitInt(f),
      ),
      `["a":37, 42:"b"]`,
      ParseStatus.invalid,
      "",
      `["a":37, 42:"b"]`,
      "",
    );
    testNodeParseElan(
      new DictionaryNode(
        f,
        () => new LitString(f),
        () => new LitInt(f),
      ),
      `["a":37, "b":42)`,
      ParseStatus.invalid,
      "",
      `["a":37, "b":42)`,
      "",
    );

    testNodeParseElan(
      new DictionaryNode(
        f,
        () => new LitValueNode(f),
        () => new LitValueNode(f),
      ),
      `["a":37, "b":42]`,
      ParseStatus.valid,
      "",
      "",
      "",
    );
    testNodeParseElan(
      new DictionaryNode(
        f,
        () => new LitValueNode(f),
        () => new LitValueNode(f),
      ),
      `["a":1.0, 5:"abc"]`,
      ParseStatus.valid,
      "",
      "",
      "",
    ); //But should fail type tests
    testNodeParseElan(new LitValueNode(f), `''`, ParseStatus.valid, "", "", "");
    testNodeParseElan(new LitValueNode(f), `'`, ParseStatus.incomplete, "", "", "");
  });
  test("Literal", () => {
    testNodeParseElan(new LitValueNode(f), `"hello"`, ParseStatus.valid, "", "", "");
    testNodeParseElan(new LitValueNode(f), `123`, ParseStatus.valid, "", "", "");
  });
  test("SpaceNode", () => {
    testNodeParseElan(new SpaceNode(f, Space.ignored), ``, ParseStatus.valid, "", "", "", "");
    testNodeParseElan(new SpaceNode(f, Space.ignored), ` `, ParseStatus.valid, "", "", "", "");
    testNodeParseElan(new SpaceNode(f, Space.ignored), `  `, ParseStatus.valid, "", "", "", "");
    testNodeParseElan(new SpaceNode(f, Space.added), ``, ParseStatus.valid, "", "", " ", " ");
    testNodeParseElan(new SpaceNode(f, Space.added), ` `, ParseStatus.valid, "", "", " ", " ");
    testNodeParseElan(new SpaceNode(f, Space.added), `  `, ParseStatus.valid, "", "", " ", " ");
    testNodeParseElan(new SpaceNode(f, Space.required), ``, ParseStatus.empty, "", "", "", "");
    testNodeParseElan(new SpaceNode(f, Space.required), ` `, ParseStatus.valid, "", "", " ", " ");
    testNodeParseElan(new SpaceNode(f, Space.required), `  `, ParseStatus.valid, "", "", " ", " ");
  });
  test("New Instance", () => {
    testNodeParseElan(new NewInstance(f), ``, ParseStatus.empty, "", "", "", "");
    testNodeParseElan(new NewInstance(f), `new Foo()`, ParseStatus.valid, "", "", "new Foo()", "");
    testNodeParseElan(new NewInstance(f), `newFoo()`, ParseStatus.invalid, "", "newFoo()", "", "");
    testNodeParseElan(
      new NewInstance(f),
      "new List<of String>()",
      ParseStatus.valid,
      "new List<of String>()",
      "",
    );
  });
  test("String Interpolation", () => {
    testNodeParseElan(new LitStringInterpolation(f), ``, ParseStatus.empty, "", "", "", "");
    testNodeParseElan(
      new LitStringInterpolation(f),
      "{x + 1}",
      ParseStatus.valid,
      "{x + 1}",
      "",
      "",
      "",
    );
    testNodeParseElan(
      new LitStringInterpolation(f),
      "{x",
      ParseStatus.incomplete,
      "{x",
      "",
      "",
      "",
    );
    testNodeParseElan(new LitStringInterpolation(f), "{}", ParseStatus.invalid, "", "{}", "", "");
  });
  test("LitString", () => {
    testNodeParseElan(new LitString(f), `""`, ParseStatus.valid, `""`, "", "", `""`);
    testNodeParseElan(
      new LitString(f),
      `"abc"`,
      ParseStatus.valid,
      `"abc"`,
      "",
      "",
      `"<el-lit>abc</el-lit>"`,
    );
    testNodeParseElan(
      new LitString(f),
      `"abc def"`,
      ParseStatus.valid,
      `"abc def"`,
      "",
      "",
      `"<el-lit>abc def</el-lit>"`,
    );
    testNodeParseElan(new LitString(f), `"abc`, ParseStatus.incomplete, `"abc`, "", "", "");
    testNodeParseElan(new LitString(f), `"`, ParseStatus.incomplete, `"`, "", "", "");
    testNodeParseElan(new LitString(f), `abc`, ParseStatus.invalid, "", "abc", "", "");
    testNodeParseElan(new LitString(f), `'abc'`, ParseStatus.valid, "'abc'", "", "", "");
    testNodeParseElan(new LitString(f), `'abc"`, ParseStatus.incomplete, `'abc"`, "", "", "");
    testNodeParseElan(new LitString(f), `"abc'`, ParseStatus.incomplete, `"abc'`, "", "", "");
    //Test embedded html
    testNodeParseElan(
      new LitStringDoubleQuotesNonEmpty(f),
      `"<p>abc</p>"`,
      ParseStatus.valid,
      `"<p>abc</p>"`,
      "",
      `"<p>abc</p>"`,
      `"<el-lit>&lt;p&gt;abc&lt;/p&gt;</el-lit>"`,
    );
    testNodeParseElan(
      new LitStringDoubleQuotesNonEmpty(f),
      `"&#123;curly braces&#125;"`,
      ParseStatus.valid,
      `"&#123;curly braces&#125;"`,
      "",
      `"&#123;curly braces&#125;"`,
      `"<el-lit>&amp;#123;curly braces&amp;#125;</el-lit>"`,
    );
  });
  test("Interpolated strings", () => {
    const field = () => new LitStringInterpolation(f);
    const plainText = () => new RegExMatchNode(f, Regexes.nonEmptyStringContent);
    const segment = () => new Alternatives(f, [field, plainText]);
    testNodeParseElan(segment(), `abc`, ParseStatus.valid, "abc", "");
    testNodeParseElan(segment(), `{x}`, ParseStatus.valid, "{x}", "");
    testNodeParseElan(segment(), `"`, ParseStatus.invalid, "", `"`);

    testNodeParseElan(new LitString(f), `"{x}{y}"`, ParseStatus.valid, "", "");
    testNodeParseElan(new LitString(f), `"{a} times {b} equals{c}"`, ParseStatus.valid, "", "");
  });
  test("Bug #290", () => {
    testNodeParseElan(new LitInt(f), `3`, ParseStatus.valid, "3", "");
    testNodeParseElan(new LitInt(f), `3 `, ParseStatus.valid, "3", " ");

    testNodeParseElan(new LitValueNode(f), `3 `, ParseStatus.valid, "3", " ");
    testNodeParseElan(new BinaryExpression(f), `3 `, ParseStatus.incomplete, "3 ", "", "3 ");

    testNodeParseElan(new ExprNode(f), `3 `, ParseStatus.incomplete, "3 ", "", "3 ");
  });

  test("ProcRefCompound", () => {
    testNodeParseElan(new InstanceProcRef(f), `bar.foo`, ParseStatus.valid, "", "");
    testNodeParseElan(new InstanceProcRef(f), `bar.`, ParseStatus.incomplete, "", "");
    testNodeParseElan(new InstanceProcRef(f), `bar.foo.yon`, ParseStatus.valid, "", ".yon");
    testNodeParseElan(new InstanceProcRef(f), `bar.foo[2]`, ParseStatus.valid, "", "[2]");
    testNodeParseElan(new InstanceProcRef(f), `bar`, ParseStatus.incomplete, "", "");
    testNodeParseElan(new InstanceProcRef(f), `global.bar`, ParseStatus.valid, "", "");
    testNodeParseElan(new InstanceProcRef(f), `library.bar`, ParseStatus.valid, "", "");
    testNodeParseElan(new InstanceProcRef(f), `x[3].bar`, ParseStatus.valid, "", "");
  });
  // test("#339 call dot function on a literal", () => {
  //   testNodeParse(new MethodCallNode(f), `length(bar)`, ParseStatus.valid, "", "");
  //   testNodeParse(new MethodCallNode(f), `bar.length()`, ParseStatus.valid, "", "");
  //   testNodeParse(new MethodCallNode(f), `bar.asList()`, ParseStatus.valid, "", "");
  //   testNodeParse(new LiteralNode(), `{1,2,3,4,5}`, ParseStatus.valid, "", "");
  //   testNodeParse(new MethodCallNode(f), `{1,2,3,4,5}.asList()`, ParseStatus.valid, "", "");
  //   testNodeParse(new MethodCallNode(f), `"Hello World".length()`, ParseStatus.valid, "", "");
  //   testNodeParse(new MethodCallNode(f), `12.3.asString()`, ParseStatus.valid, "", "");
  //   testNodeParse(new MethodCallNode(f), `bar.`, ParseStatus.incomplete, "", "");
  //   testNodeParse(new MethodCallNode(f), `bar`, ParseStatus.incomplete, "", "");
  // });

  test("#670 new parse node structure for terms & expressions", () => {
    testNodeParseElan(new TermSimple(f), `abc`, ParseStatus.valid, "abc", "");
    testNodeParseElan(new TermSimple(f), `abc()`, ParseStatus.valid, "abc()", "");
    testNodeParseElan(new TermSimple(f), `this`, ParseStatus.valid, "this", "");
    testNodeParseElan(new TermSimple(f), `abc(def, ghi)`, ParseStatus.valid, "abc(def, ghi)", "");
    testNodeParseElan(new TermSimpleWithOptIndex(f), `abc[1]`, ParseStatus.valid, "abc[1]", "");
    testNodeParseElan(
      new TermSimpleWithOptIndex(f),
      `abc[1][2]`,
      ParseStatus.valid,
      "abc[1]",
      "[2]",
    );
    testNodeParseElan(
      new TermSimpleWithOptIndex(f),
      `abc[1..2]`,
      ParseStatus.valid,
      "abc[1..2]",
      "",
    );
    testNodeParseElan(
      new TermSimpleWithOptIndex(f),
      `abc[1, 2]`,
      ParseStatus.valid,
      "abc[1, 2]",
      "",
    );
    testNodeParseElan(
      new TermSimpleWithOptIndex(f),
      `abc(def, ghi)[0]`,
      ParseStatus.valid,
      "abc(def, ghi)[0]",
      "",
    );
    testNodeParseElan(new ExprNode(f), `tuple(def, ghi)`, ParseStatus.valid, "tuple(def, ghi)", ""); // tuple
    testNodeParseElan(new TermSimple(f), `[def, ghi]`, ParseStatus.valid, "[def, ghi]", "");
    testNodeParseElan(new TermSimple(f), `345`, ParseStatus.valid, "345", "");
    testNodeParseElan(new TermSimple(f), `-345`, ParseStatus.valid, "-345", "");
    testNodeParseElan(new TermSimple(f), `not a`, ParseStatus.valid, "not a", "");
    testNodeParseElan(new TermSimple(f), `(3 + a)`, ParseStatus.valid, "(3 + a)", "");
    testNodeParseElan(new Qualifier(f), `property`, ParseStatus.valid, `property`, "");
    testNodeParseElan(new PunctuationNode(f, DOT), `.`, ParseStatus.valid, `.`, "");
    testNodeParseElan(new ReferenceNode(f), `a`, ParseStatus.valid, `a`, "");
    testNodeParseElan(new DottedTerm(f), `.a`, ParseStatus.valid, `.a`, "");
    testNodeParseElan(new DotAfter(f, new ReferenceNode(f)), `.a`, ParseStatus.invalid, ``, ".a");
    testNodeParseElan(new TermChained(f), `property.a`, ParseStatus.valid, `property.a`, "");
    testNodeParseElan(
      new TermChained(f),
      `a[1].b()[1..2].c(d)[e][f]`,
      ParseStatus.valid,
      `a[1].b()[1..2].c(d)[e][f]`,
      "",
    );
    testNodeParseElan(
      new TermChained(f),
      `property.a[1].b().c(d)[e]`,
      ParseStatus.valid,
      `property.a[1].b().c(d)[e]`,
      "",
    );
    testNodeParseElan(
      new TermChained(f),
      `this.a.b()`,
      ParseStatus.valid,
      `this.a.b()`,
      "",
      "this.a.b()",
      "<el-kw>this</el-kw>.<el-id>a</el-id>.<el-method>b</el-method>()",
    );
    testNodeParseElan(
      new ExprNode(f),
      `a[1].b()[1..2].c(d).e.f[g]`,
      ParseStatus.valid,
      `a[1].b()[1..2].c(d).e.f[g]`,
      "",
    );
    testNodeParseElan(
      new ExprNode(f),
      `property.a[1].b().c(d)[e]`,
      ParseStatus.valid,
      `property.a[1].b().c(d)[e]`,
      "",
    );
    testNodeParseElan(new ExprNode(f), `ref foo`, ParseStatus.valid, `ref foo`, "");
    testNodeParseElan(new ExprNode(f), `ref `, ParseStatus.incomplete, `ref `, "");
  });
  test("OperatorAmbiguity#728", () => {
    //Test operations
    testNodeParseElan(new BinaryOperation(f), ``, ParseStatus.empty, "", "", "", "");
    testNodeParseElan(new BinaryOperation(f), ` `, ParseStatus.incomplete, " ", "", " ", " ");
    testNodeParseElan(new BinaryOperation(f), `+`, ParseStatus.valid, "+", "", " + ", " + ");
    testNodeParseElan(new BinaryOperation(f), ` +`, ParseStatus.valid, " +", "", " + ", " + ");
    testNodeParseElan(new BinaryOperation(f), ` + `, ParseStatus.valid, " + ", "", " + ", " + ");
    testNodeParseElan(new BinaryOperation(f), `*`, ParseStatus.valid, "*", "", "*", "*");
    testNodeParseElan(new BinaryOperation(f), ` *`, ParseStatus.valid, " *", "", "*", "*");
    testNodeParseElan(new BinaryOperation(f), ` * `, ParseStatus.valid, " * ", "", "*", "*");
    testNodeParseElan(new BinaryOperation(f), `>=`, ParseStatus.valid, ">=", "", " >= ", " >= ");
    testNodeParseElan(new BinaryOperation(f), ` >=`, ParseStatus.valid, " >=", "", " >= ", " >= ");
    testNodeParseElan(
      new BinaryOperation(f),
      ` >= `,
      ParseStatus.valid,
      " >= ",
      "",
      " >= ",
      " >= ",
    );
    testNodeParseElan(new BinaryOperation(f), `>`, ParseStatus.incomplete, ">", "", ">", ">");
    testNodeParseElan(new BinaryOperation(f), ` >`, ParseStatus.incomplete, " >", "", " >", " >");
    testNodeParseElan(new BinaryOperation(f), `> `, ParseStatus.valid, "> ", "", " > ", " > ");
    testNodeParseElan(new BinaryOperation(f), ` > `, ParseStatus.valid, " > ", "", " > ", " > ");
    testNodeParseElan(new BinaryOperation(f), `is`, ParseStatus.incomplete, "is", "", "is", "is");
    testNodeParseElan(
      new BinaryOperation(f),
      `is `,
      ParseStatus.valid,
      "is ",
      "",
      " is ",
      "<el-kw> is </el-kw>",
    );
    testNodeParseElan(
      new BinaryOperation(f),
      `isn`,
      ParseStatus.incomplete,
      "isn",
      "",
      "isn",
      "isn",
    );
    testNodeParseElan(
      new BinaryOperation(f),
      `isnt`,
      ParseStatus.valid,
      "isnt",
      "",
      " isnt ",
      "<el-kw> isnt </el-kw>",
    );
    testNodeParseElan(
      new BinaryOperation(f),
      ` and `,
      ParseStatus.valid,
      " and ",
      "",
      " and ",
      "<el-kw> and </el-kw>",
    );
    testNodeParseElan(
      new BinaryOperation(f),
      `and`,
      ParseStatus.valid,
      "and",
      "",
      " and ",
      "<el-kw> and </el-kw>",
    );
    testNodeParseElan(
      new BinaryOperation(f),
      `anda`,
      ParseStatus.valid,
      "and",
      "a",
      " and ",
      "<el-kw> and </el-kw>",
    );

    testNodeParseElan(new BinaryOperation(f), `an`, ParseStatus.incomplete, "an", "", "an", "an");
    testNodeParseElan(new BinaryOperation(f), `not`, ParseStatus.invalid, "", "not", "", "");

    //test expressions
    testNodeParseElan(
      new BinaryExpression(f),
      `"a"+  "b"`,
      ParseStatus.valid,
      `"a"+  "b"`,
      "",
      `"a" + "b"`,
    );
    testNodeParseElan(
      new BinaryExpression(f),
      `3+`,
      ParseStatus.incomplete,
      "3+",
      "",
      "3 + ",
      "<el-lit>3</el-lit> + ",
    );
    testNodeParseElan(
      new BinaryExpression(f),
      `3 +`,
      ParseStatus.incomplete,
      "3 +",
      "",
      "3 + ",
      "<el-lit>3</el-lit> + ",
    );
    testNodeParseElan(
      new BinaryExpression(f),
      `3 `,
      ParseStatus.incomplete,
      "3 ",
      "",
      "3 ",
      "<el-lit>3</el-lit> ",
    );
    testNodeParseElan(
      new BinaryExpression(f),
      `3+4`,
      ParseStatus.valid,
      "3+4",
      "",
      "3 + 4",
      "<el-lit>3</el-lit> + <el-lit>4</el-lit>",
    );
    testNodeParseElan(
      new BinaryExpression(f),
      `3>=4`,
      ParseStatus.valid,
      "3>=4",
      "",
      "3 >= 4",
      "<el-lit>3</el-lit> >= <el-lit>4</el-lit>",
    );
    testNodeParseElan(new BinaryExpression(f), `3>`, ParseStatus.incomplete, "3>", "", "3>");
    testNodeParseElan(new BinaryExpression(f), `3> `, ParseStatus.incomplete, "3> ", "", "3 > ");
    testNodeParseElan(new BinaryExpression(f), `3> 4`, ParseStatus.valid, "3> 4", "", "3 > 4");
    testNodeParseElan(new BinaryExpression(f), `3>4`, ParseStatus.valid, "3>4", "", "3 > 4");
    testNodeParseElan(new BinaryExpression(f), `3 > 4`, ParseStatus.valid, "3 > 4", "", "3 > 4");
    testNodeParseElan(new BinaryExpression(f), `3>=`, ParseStatus.incomplete, "3>=", "", "3 >= ");
    testNodeParseElan(new BinaryExpression(f), `3>=4`, ParseStatus.valid, "3>=4", "", "3 >= 4");
    testNodeParseElan(
      new BinaryExpression(f),
      `3 is 4`,
      ParseStatus.valid,
      "3 is 4",
      "",
      "3 is 4",
      "<el-lit>3</el-lit><el-kw> is </el-kw><el-lit>4</el-lit>",
    );
    testNodeParseElan(
      new BinaryExpression(f),
      `11 div 3`,
      ParseStatus.valid,
      "11 div 3",
      "",
      "11 div 3",
    );
  });
  test("RevisedParseMethodForAbstractSequence#857", () => {
    testActiveNodeAndDone(new test_seq1(f), `foo 45`, ParseStatus.valid, LitInt.name, false);
    testActiveNodeAndDone(new test_seq1(f), `foo `, ParseStatus.incomplete, LitInt.name, false);
    testActiveNodeAndDone(new test_seq1(f), `foo`, ParseStatus.incomplete, SpaceNode.name, false);
    testActiveNodeAndDone(new test_seq2(f), `3.1 end`, ParseStatus.valid, KeywordNode.name, true);
    testActiveNodeAndDone(
      new test_seq2(f),
      `3.1 en`,
      ParseStatus.incomplete,
      KeywordNode.name,
      false,
    );
    testActiveNodeAndDone(
      new LitFloat(f),
      `3.`,
      ParseStatus.incomplete,
      RegExMatchNode.name,
      false,
    );
    testActiveNodeAndDone(new LitFloat(f), `3.1`, ParseStatus.valid, RegExMatchNode.name, false);
    testActiveNodeAndDone(
      new test_seq2(f),
      `3.1`,
      ParseStatus.incomplete,
      RegExMatchNode.name, //for exponent. Should technically still be the RegexMatchNode for fractional part
      // since it could be extended. But unimportand as there is no symbol completion for any literal
      false,
    );
    testActiveNodeAndDone(
      new CSV(f, () => new LitInt(f), 2),
      `12,34`,
      ParseStatus.valid,
      LitInt.name,
      false,
    );
    testActiveNodeAndDone(
      new CSV(f, () => new LitInt(f), 1),
      `12`,
      ParseStatus.valid,
      LitInt.name,
      false,
    );
    testActiveNodeAndDone(
      new CSV(f, () => new LitInt(f), 1),
      `12,`,
      ParseStatus.incomplete,
      LitInt.name,
      false,
    );
  });
  test("LitRegExp", () => {
    testNodeParseElan(
      new LitRegExp(f),
      `/abc+.*/`,
      ParseStatus.valid,
      `/abc+.*/`,
      "",
      "/abc+.*/",
      `/<el-regex>abc+.*</el-regex>/`,
    );
  });
  test("LitRegExp with flags", () => {
    testNodeParseElan(
      new LitRegExp(f),
      `/abc+.*/gm`,
      ParseStatus.valid,
      `/abc+.*/gm`,
      "",
      "/abc+.*/gm",
      `/<el-regex>abc+.*</el-regex>/<el-regex>gm</el-regex>`,
    );
  });
  test("LitRegExp with invalid flags", () => {
    testNodeParseElan(
      new LitRegExp(f),
      `/abc+.*/x`,
      ParseStatus.valid,
      `/abc+.*/`,
      "x",
      "/abc+.*/",
      `/<el-regex>abc+.*</el-regex>/`,
    );
  });
  test("not(a+b)", () => {
    testNodeParseElan(
      new ExprNode(f),
      `not(a+b)`,
      ParseStatus.valid,
      `not(a+b)`,
      "",
      "not (a + b)",
      `<el-kw>not</el-kw> (<el-id>a</el-id> + <el-id>b</el-id>)`,
    );
  });
  test("Parse list of list of floats", () => {
    testNodeParseElan(
      new ExprNode(f),
      `[[0.0,0.0,0.0,0.16,0.0,0.0,0.01],[0.85,0.04,-0.04,0.85,0.0,1.60,0.85],[0.20,-0.26,0.23,0.22,0.0,1.60,0.07],[-0.15,0.28,0.26,0.24,0.0,0.44,0.07]]`,
      ParseStatus.valid,
      `[[0.0,0.0,0.0,0.16,0.0,0.0,0.01],[0.85,0.04,-0.04,0.85,0.0,1.60,0.85],[0.20,-0.26,0.23,0.22,0.0,1.60,0.07],[-0.15,0.28,0.26,0.24,0.0,0.44,0.07]]`,
      "",
    );
  });
  test("Parse list of floats 2", () => {
    testNodeParseElan(new ExprNode(f), `[0.0]`, ParseStatus.valid, `[0.0]`, "");
  });
  test("Six open brackets", () => {
    testNodeParseElan(new ExprNode(f), `((((((3))))))`, ParseStatus.valid, `((((((3))))))`, "");
  });
  test("Image", () => {
    testNodeParseElan(
      new RegExMatchNode(f, Regexes.url),
      "http://website.com/images/image1.png",
      ParseStatus.valid,
      "http://website.com/images/image1.png",
      "",
      "",
      "",
    );
    testNodeParseElan(
      new ImageNode(f),
      "image http://website.com/images/image1.png",
      ParseStatus.valid,
      "image http://website.com/images/image1.png",
      "",
      "image http://website.com/images/image1.png",
      `<img src="http://website.com/images/image1.png">`,
    );
    testNodeParseElan(
      new ImageNode(f),
      "image http://website.com/images/image1.png with height set to 10, width set to 20",
      ParseStatus.valid,
      "image http://website.com/images/image1.png with height set to 10, width set to 20",
      "",
      "image http://website.com/images/image1.png with height set to 10, width set to 20",
      `<img src="http://website.com/images/image1.png"><el-kw> with </el-kw><el-id>height</el-id><el-kw> set to </el-kw><el-lit>10</el-lit>, <el-id>width</el-id><el-kw> set to </el-kw><el-lit>20</el-lit>`,
    );
  });
});

class test_seq1 extends AbstractSequence {
  parseText(text: string): void {
    this.addElement(new KeywordNode(this.file, "foo"));
    this.addElement(new SpaceNode(this.file, Space.required));
    this.addElement(new LitInt(this.file));
    super.parseText(text);
  }
}

class test_seq2 extends AbstractSequence {
  parseText(text: string): void {
    this.addElement(new LitFloat(this.file));
    this.addElement(new SpaceNode(this.file, Space.required));
    this.addElement(new KeywordNode(this.file, "end"));
    super.parseText(text);
  }
}
