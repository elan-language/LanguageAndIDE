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
import { DeconstructedList } from "../src/ide/frames/parse-nodes/deconstructed-list";
import { DeconstructedTuple } from "../src/ide/frames/parse-nodes/deconstructed-tuple";
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
import { TypeNameNode } from "../src/ide/frames/parse-nodes/type-name-node";
import { TypeNode } from "../src/ide/frames/parse-nodes/type-node";
import { TypeSimpleOrGeneric } from "../src/ide/frames/parse-nodes/type-simple-or-generic";
import { UnaryExpression } from "../src/ide/frames/parse-nodes/unary-expression";
import { ParseStatus } from "../src/ide/frames/status-enums";
import { DOT } from "../src/ide/frames/symbols";
import { StubInputOutput } from "../src/ide/stub-input-output";
import { hash } from "../src/ide/util";
import { transforms } from "./compiler/compiler-test-helpers";
import { testActiveNodeAndDone, testNodeParse } from "./testHelpers";

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
    testNodeParse(new UnaryExpression(f), "", ParseStatus.empty, "", "", "", "");
    testNodeParse(new UnaryExpression(f), "-3", ParseStatus.valid, "-3", "", "-3", "");
    testNodeParse(
      new UnaryExpression(f),
      " not foo",
      ParseStatus.valid,
      " not foo",
      "",
      "not foo",
      "",
    );
    testNodeParse(new UnaryExpression(f), "-", ParseStatus.incomplete, "-", "", "-", "");
    testNodeParse(new UnaryExpression(f), "+4", ParseStatus.invalid, "", "+4", "", "");
  });
  test("IndexableTerm", () => {
    testNodeParse(new Term(f), "a", ParseStatus.valid, "a", "", "a", "");
  });
  test("Term2", () => {
    testNodeParse(new Term(f), "empty ", ParseStatus.invalid, "", "empty ", "");
    testNodeParse(new Term(f), "", ParseStatus.empty, "", "", "");
    testNodeParse(new Term(f), "a", ParseStatus.valid, "a", "", "a", "");
  });
  test("Expression", () => {
    testNodeParse(new ExprNode(f), "", ParseStatus.empty, "", "", "");
    testNodeParse(new ExprNode(f), "", ParseStatus.empty, "", "", "");
    testNodeParse(new ExprNode(f), "a", ParseStatus.valid, "a", "", "a", "");
    testNodeParse(new ExprNode(f), "a + b", ParseStatus.valid, "a + b", "", "a + b", "");
    testNodeParse(new ExprNode(f), "a * -b", ParseStatus.valid, "a * -b", "", "a*-b", "");
    testNodeParse(new ExprNode(f), "a + b- c", ParseStatus.valid, "", "", "a + b - c", "");
    testNodeParse(new ExprNode(f), "+", ParseStatus.invalid, "", "+", "");
    testNodeParse(new ExprNode(f), "+b", ParseStatus.invalid, "", "+b", "");
    testNodeParse(new ExprNode(f), "a +", ParseStatus.incomplete, "a +", "", "a + ");
    testNodeParse(new ExprNode(f), "a %", ParseStatus.valid, "a", " %", "a");
    testNodeParse(new ExprNode(f), "3 * 4 + x", ParseStatus.valid, "3 * 4 + x", "", "3*4 + x", "");
    testNodeParse(new ExprNode(f), "3* foo(5)", ParseStatus.valid, "", "", "3*foo(5)", "");
    testNodeParse(
      new ExprNode(f),
      "new List<of String>()",
      ParseStatus.valid,
      "new List<of String>()",
      "",
    );
    testNodeParse(
      new ExprNode(f),
      "points.foo(0.0)",
      ParseStatus.valid,
      "points.foo(0.0)",
      "",
      "points.foo(0.0)",
      "",
    );
    testNodeParse(
      new ExprNode(f),
      "this",
      ParseStatus.valid,
      "this",
      "",
      "this",
      "<el-kw>this</el-kw>",
    );
    testNodeParse(
      new ExprNode(f),
      "thisWidget",
      ParseStatus.valid,
      "thisWidget",
      "",
      "thisWidget",
      "<el-id>thisWidget</el-id>",
    );
    // empty data structures
    testNodeParse(
      new ExprNode(f),
      "empty List<of Int>",
      ParseStatus.valid,
      "empty List<of Int>",
      "",
      "",
      "<el-kw>empty</el-kw> <el-type>List</el-type>&lt;<el-kw>of</el-kw> <el-type>Int</el-type>&gt;",
    );
    testNodeParse(
      new ExprNode(f),
      "empty String",
      ParseStatus.valid,
      "empty String",
      "",
      "",
      "<el-kw>empty</el-kw> <el-type>String</el-type>",
    );
    testNodeParse(new ExprNode(f), "empty Lit<of Int>", ParseStatus.valid, "", "", "", "");
    testNodeParse(
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
    testNodeParse(
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
    testNodeParse(
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
    testNodeParse(
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
    testNodeParse(
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
    testNodeParse(new IdentifierNode(f), ``, ParseStatus.empty, ``, "", "");
    testNodeParse(new IdentifierNode(f), `  `, ParseStatus.invalid, ``, "", "");
    testNodeParse(new IdentifierNode(f), `a`, ParseStatus.valid, `a`, "", "a", "");
    testNodeParse(new IdentifierNode(f), `aB_d`, ParseStatus.valid, `aB_d`, "", "aB_d");
    testNodeParse(new IdentifierNode(f), `abc `, ParseStatus.valid, `abc`, " ", "abc");
    testNodeParse(new IdentifierNode(f), `Abc`, ParseStatus.invalid, ``, "Abc", "");
    testNodeParse(new IdentifierNode(f), `abc-de`, ParseStatus.valid, `abc`, "-de", "abc");
    // Can be a keyword - because that will be rejected at compile stage, not parse stage
    testNodeParse(new IdentifierNode(f), `new`, ParseStatus.valid, `new`, "", "");
    testNodeParse(new IdentifierNode(f), `global`, ParseStatus.valid, `global`, "", "");
    testNodeParse(new IdentifierNode(f), `x as`, ParseStatus.valid, `x`, " as", "x");
    testNodeParse(new IdentifierNode(f), `_a`, ParseStatus.valid, `_a`, "", "_a", "");
    testNodeParse(new IdentifierNode(f), `_`, ParseStatus.invalid, ``, "_", "");
  });
  test("LitString - single chars", () => {
    testNodeParse(new LitString(f), "", ParseStatus.empty, "", "", "", "");
    testNodeParse(new LitString(f), `"a"`, ParseStatus.valid, `"a"`, "", `"a"`, "");
    testNodeParse(new LitString(f), `"a`, ParseStatus.incomplete, `"a`, "", `"a`, "");
    testNodeParse(new LitString(f), `"9"`, ParseStatus.valid, `"9"`, "", `"9"`, "");
    testNodeParse(new LitString(f), `" "`, ParseStatus.valid, `" "`, "", `" "`, "");
  });
  test("LitString - bug #328", () => {
    testNodeParse(new LitString(f), `" `, ParseStatus.incomplete, `" `, "", `" `, "");
    testNodeParse(new LitString(f), `"{a} `, ParseStatus.incomplete, `"{a} `, "", `"{a} `, "");
  });
  test("LitInt", () => {
    testNodeParse(new LitInt(f), "", ParseStatus.empty, "", "", "", "");
    testNodeParse(new LitInt(f), "   ", ParseStatus.invalid, "", "   ", "", "");
    testNodeParse(new LitInt(f), "123", ParseStatus.valid, "123", "", "123", "");
    testNodeParse(new LitInt(f), "-123", ParseStatus.valid, "-123", "", "-123", "");
    testNodeParse(new LitInt(f), "- 123", ParseStatus.invalid, "", "- 123", "", "");
    testNodeParse(new LitInt(f), "1-23", ParseStatus.valid, "1", "-23", "", "");
    testNodeParse(new LitInt(f), "456  ", ParseStatus.valid, "456", "  ", "456", "");
    testNodeParse(new LitInt(f), " 123a", ParseStatus.valid, " 123", "a", "123", "");
    testNodeParse(new LitInt(f), "1.23", ParseStatus.valid, "1", ".23", "1", "");
    testNodeParse(new LitInt(f), "a", ParseStatus.invalid, "", "a", "", "");
    //Hex & binary
    testNodeParse(
      new LitInt(f),
      "0xfa3c",
      ParseStatus.valid,
      "0xfa3c",
      "",
      "",
      "<el-lit>0xfa3c</el-lit>",
    );
    testNodeParse(new LitInt(f), "0xfa3g", ParseStatus.valid, "0xfa3", "g", "", "");
    testNodeParse(
      new LitInt(f),
      "0b01101",
      ParseStatus.valid,
      "0b01101",
      "",
      "",
      "<el-lit>0b01101</el-lit>",
    );
    testNodeParse(new LitInt(f), "0b01102", ParseStatus.valid, "0b0110", "2", "", "");
  });
  test("LitFloat", () => {
    testNodeParse(new LitFloat(f), "", ParseStatus.empty, "", "", "");
    testNodeParse(new LitFloat(f), "1.0", ParseStatus.valid, "1.0", "", "1.0");
    testNodeParse(new LitFloat(f), "-1.0", ParseStatus.valid, "-1.0", "", "-1.0");
    testNodeParse(new LitFloat(f), "- 1.0", ParseStatus.invalid, "", "- 1.0", "");
    testNodeParse(new LitFloat(f), "1.-0", ParseStatus.invalid, "", "1.-0", "");
    testNodeParse(new LitFloat(f), " 1.0a", ParseStatus.valid, " 1.0", "a", "1.0");
    testNodeParse(new LitFloat(f), "1", ParseStatus.incomplete, "1", "", "1");
    testNodeParse(new LitFloat(f), "1.", ParseStatus.incomplete, "1.", "", "1.");
    testNodeParse(new LitFloat(f), "1. ", ParseStatus.invalid, "", "1. ", "");
    testNodeParse(new LitFloat(f), "1.1e5", ParseStatus.valid, "1.1e5", "", "1.1e5");
    testNodeParse(new LitFloat(f), "1.1e-5", ParseStatus.valid, "1.1e-5", "", "1.1e-5");
    testNodeParse(new LitFloat(f), "1.1E-5", ParseStatus.valid, "1.1E-5", "", "1.1E-5");
  });
  test("Keyword", () => {
    testNodeParse(new KeywordNode(f, abstractKeyword), "", ParseStatus.empty, "", "", "");
    testNodeParse(
      new KeywordNode(f, abstractKeyword),
      "abstract ",
      ParseStatus.valid,
      "abstract",
      " ",
      "",
    );
    testNodeParse(
      new KeywordNode(f, abstractKeyword),
      "abstract(x",
      ParseStatus.valid,
      "abstract",
      "(x",
      "",
    );
    testNodeParse(
      new KeywordNode(f, abstractKeyword),
      "abstractx",
      ParseStatus.invalid,
      "",
      "abstractx",
      "",
    );
    testNodeParse(
      new KeywordNode(f, abstractKeyword),
      "abstract immutable",
      ParseStatus.valid,
      "abstract",
      " immutable",
      "abstract",
    );
    testNodeParse(
      new KeywordNode(f, abstractKeyword),
      " abs",
      ParseStatus.incomplete,
      " abs",
      "",
      "abs",
    );
    testNodeParse(
      new KeywordNode(f, abstractKeyword),
      " abscract",
      ParseStatus.invalid,
      "",
      " abscract",
      "",
    );
  });
  test("BracketedExpression", () => {
    testNodeParse(
      new BracketedExpression(f),
      "(3 + 4)",
      ParseStatus.valid,
      "(3 + 4)",
      "",
      "(3 + 4)",
      "",
    );

    testNodeParse(new BracketedExpression(f), "", ParseStatus.empty, "", "", "");
    testNodeParse(new BracketedExpression(f), "(3)", ParseStatus.valid, "(3)", "", "(3)", "");

    testNodeParse(
      new BracketedExpression(f),
      "(a and not b)",
      ParseStatus.valid,
      "(a and not b)",
      "",
      "(a and not b)",
      "",
    );
    testNodeParse(
      new BracketedExpression(f),
      "(3 * 4 + x)",
      ParseStatus.valid,
      "(3 * 4 + x)",
      "",
      "(3*4 + x)",
      "",
    );
    testNodeParse(
      new BracketedExpression(f),
      "(3 * (4 + x))",
      ParseStatus.valid,
      "(3 * (4 + x))",
      "",
      "(3*(4 + x))",
      "",
    );
    testNodeParse(
      new BracketedExpression(f),
      "(a and not b",
      ParseStatus.incomplete,
      "(a and not b",
      "",
      "(a and not b",
    );
    //testNodeParse(new BracketedExpression(), "(a and not b  ", ParseStatus.incomplete, "(a and not b  ", "", "(a and not b"); TODO
    testNodeParse(new BracketedExpression(f), "(", ParseStatus.incomplete, "(", "", "(");
    testNodeParse(new BracketedExpression(f), "()", ParseStatus.invalid, "", "()", "");
  });
  test("Optional", () => {
    testNodeParse(
      new OptionalNode(f, new LitInt(f)),
      "123 a",
      ParseStatus.valid,
      "123",
      " a",
      "123",
    );
    testNodeParse(new OptionalNode(f, new LitInt(f)), "abc", ParseStatus.valid, "", "abc", "");
    testNodeParse(
      new OptionalNode(f, new KeywordNode(f, abstractKeyword)),
      " abstract",
      ParseStatus.valid,
      " abstract",
      "",
      "abstract",
      "<el-kw>abstract</el-kw>",
    );
    testNodeParse(
      new OptionalNode(f, new KeywordNode(f, abstractKeyword)),
      "abs",
      ParseStatus.incomplete,
      "abs",
      "",
      "",
    );
    testNodeParse(
      new OptionalNode(f, new KeywordNode(f, abstractKeyword)),
      "abscract",
      ParseStatus.valid,
      "",
      "abscract",
      "",
    );
    testNodeParse(
      new OptionalNode(f, new KeywordNode(f, abstractKeyword)),
      "",
      ParseStatus.valid,
      "",
      "",
      "",
    );
    testNodeParse(
      new OptionalNode(f, new KeywordNode(f, abstractKeyword)),
      "  ",
      ParseStatus.incomplete,
      "  ",
      "",
      "",
    );
  });

  test("Multiple", () => {
    testNodeParse(new Multiple(f, () => new LitInt(f), 0), ``, ParseStatus.valid, ``, "", "");
    testNodeParse(new Multiple(f, () => new LitInt(f), 1), ``, ParseStatus.empty, ``, "", "");
    testNodeParse(new Multiple(f, () => new LitInt(f), 0), `)`, ParseStatus.valid, ``, ")", "");
    testNodeParse(
      new Multiple(f, () => new LitInt(f), 1),
      `1 0 33`,
      ParseStatus.valid,
      `1 0 33`,
      "",
      "",
    );
    testNodeParse(new Multiple(f, () => new LitInt(f), 1), `1`, ParseStatus.valid, `1`, "", "");
    testNodeParse(new Multiple(f, () => new LitInt(f), 0), ``, ParseStatus.valid, ``, "", "");
    testNodeParse(new Multiple(f, () => new LitInt(f), 1), ``, ParseStatus.empty, ``, "", "");
    testNodeParse(
      new Multiple(f, () => new LitInt(f), 1),
      `5 6 a`,
      ParseStatus.valid,
      `5 6`,
      " a",
      "",
    );
    testNodeParse(
      new Multiple(f, () => new LitInt(f), 1),
      `7   `,
      ParseStatus.valid,
      `7`,
      "   ",
      "",
    );

    testNodeParse(
      new Multiple(f, () => new KeywordNode(f, "foo"), 1),
      `foo foo`,
      ParseStatus.valid,
      "",
      "",
      "",
    );
    testNodeParse(
      new Multiple(f, () => new KeywordNode(f, "bar"), 1),
      `bar ba`,
      ParseStatus.incomplete,
      "bar ba",
      "",
      "",
    );
    testNodeParse(
      new Multiple(f, () => new KeywordNode(f, "foo"), 1),
      `foo`,
      ParseStatus.valid,
      "",
      "",
      "",
    );
    testNodeParse(
      new Multiple(f, () => new KeywordNode(f, "foo"), 1),
      `fo`,
      ParseStatus.incomplete,
      "",
      "",
      "",
    );
    testNodeParse(
      new Multiple(f, () => new KeywordNode(f, "foo"), 1),
      `foo,foo`,
      ParseStatus.valid,
      "",
      ",foo",
      "",
    );
    testNodeParse(
      new Multiple(f, () => new KeywordNode(f, "foo"), 1),
      `foofoo`,
      ParseStatus.invalid,
      "",
      "foofoo",
      "",
    );
  });
  test("CommaNode", () => {
    testNodeParse(new CommaNode(f), ``, ParseStatus.empty, ``, "", "");
    testNodeParse(new CommaNode(f), `,`, ParseStatus.valid, ``, "", ", ");
    testNodeParse(new CommaNode(f), ` ,`, ParseStatus.valid, `,`, "", ", ");
    testNodeParse(new CommaNode(f), `,    `, ParseStatus.valid, ``, "", ", ");
    testNodeParse(new CommaNode(f), `.`, ParseStatus.invalid, ``, ".", "");
    testNodeParse(new CommaNode(f), `,,`, ParseStatus.valid, `,`, ",", "");
  });
  test("CSV", () => {
    testNodeParse(
      new CSV(f, () => new PunctuationNode(f, "a"), 0),
      `a,a,a`,
      ParseStatus.valid,
      `a,a,a`,
      "",
      "a, a, a",
    );
    testNodeParse(
      new CSV(f, () => new PunctuationNode(f, "a"), 0),
      `a,`,
      ParseStatus.incomplete,
      `a,`,
      "",
      "a, ",
    );
    testNodeParse(
      new CSV(f, () => new PunctuationNode(f, "a"), 0),
      `x`,
      ParseStatus.valid,
      ``,
      "x",
      "",
    );
    testNodeParse(
      new CSV(f, () => new PunctuationNode(f, "a"), 1),
      `x`,
      ParseStatus.invalid,
      ``,
      "x",
      "",
    );
    testNodeParse(
      new CSV(f, () => new PunctuationNode(f, "a"), 0),
      `a,a,x`,
      ParseStatus.valid,
      `a,a`,
      ",x",
      "a, a",
    );
    testNodeParse(new CSV(f, () => new LitInt(f), 0), ``, ParseStatus.valid, ``, "", "");
    testNodeParse(new CSV(f, () => new LitInt(f), 1), ``, ParseStatus.empty, ``, "", "");
    testNodeParse(new CSV(f, () => new LitInt(f), 0), `2`, ParseStatus.valid, `2`, "", "");
    testNodeParse(new CSV(f, () => new LitInt(f), 1), `2`, ParseStatus.valid, `2`, "", "");
    testNodeParse(
      new CSV(f, () => new LitString(f), 0),
      `"apple","orange", "pear"`,
      ParseStatus.valid,
      `"apple","orange", "pear"`,
      "",
      `"apple", "orange", "pear"`,
    );
    testNodeParse(
      new CSV(f, () => new IdentifierNode(f), 0),
      `a,b,c`,
      ParseStatus.valid,
      `a,b,c`,
      "",
      "a, b, c",
    );
    testNodeParse(new CSV(f, () => new IdentifierNode(f), 0), `1`, ParseStatus.valid, ``, "1", "");
    testNodeParse(
      new CSV(f, () => new IdentifierNode(f), 1),
      `1`,
      ParseStatus.invalid,
      ``,
      "1",
      "",
    );
    testNodeParse(
      new CSV(f, () => new IdentifierNode(f), 0),
      `a,1`,
      ParseStatus.valid,
      `a`,
      ",1",
      "",
    );
    testNodeParse(
      new CSV(f, () => new IdentifierNode(f), 0),
      `a,b,1`,
      ParseStatus.valid,
      `a,b`,
      ",1",
      "",
    );
    testNodeParse(
      new CSV(f, () => new ExprNode(f), 0),
      `a + b, c, 1`,
      ParseStatus.valid,
      `a + b, c, 1`,
      "",
      "",
    );
    testNodeParse(new CSV(f, () => new ExprNode(f), 0), `)`, ParseStatus.valid, ``, ")", "");

    testNodeParse(
      new CSV(f, () => new KeywordNode(f, "foo"), 0),
      `foo, foo`,
      ParseStatus.valid,
      "",
      "",
    );
    testNodeParse(new CSV(f, () => new KeywordNode(f, "foo"), 0), `foo`, ParseStatus.valid, "", "");
    testNodeParse(
      new CSV(f, () => new KeywordNode(f, "foo"), 1),
      `fook`,
      ParseStatus.invalid,
      "",
      "fook",
    );
    testNodeParse(new CSV(f, () => new KeywordNode(f, "foo"), 0), ``, ParseStatus.valid, "", "");
    testNodeParse(
      new CSV(f, () => new KeywordNode(f, "foo"), 1),
      `fo`,
      ParseStatus.incomplete,
      "fo",
      "",
    );
    testNodeParse(
      new CSV(f, () => new KeywordNode(f, "foo"), 0),
      `fo`,
      ParseStatus.incomplete,
      "fo",
      "",
    );
    testNodeParse(
      new CSV(f, () => new KeywordNode(f, "foo"), 2),
      `foo, fo`,
      ParseStatus.incomplete,
      "foo, fo",
      "",
    );
    testNodeParse(
      new CSV(f, () => new KeywordNode(f, "foo"), 2),
      `foo,`,
      ParseStatus.incomplete,
      "foo,",
      "",
    );
    testNodeParse(
      new CSV(f, () => new KeywordNode(f, "foo"), 2),
      `foo, `,
      ParseStatus.incomplete,
      "foo, ",
      "",
    );
    testNodeParse(
      new CSV(f, () => new KeywordNode(f, "foo"), 2),
      `foo,fo`,
      ParseStatus.incomplete,
      "foo,fo",
      "",
      "foo, fo",
    );

    testNodeParse(new CSV(f, () => new ExprNode(f), 0), ``, ParseStatus.valid, "", "");
  });
  test("Instance", () => {
    testNodeParse(new InstanceNode(f), ``, ParseStatus.empty, ``, "", "");
    testNodeParse(new InstanceNode(f), `bar`, ParseStatus.valid, `bar`, "", "");
    testNodeParse(new InstanceNode(f), `bar[foo]`, ParseStatus.valid, `bar[foo]`, "", "");
    //testNodeParse(new InstanceNode(), `bar[foo][0]`, ParseStatus.valid, `bar[foo][0]`, "", "");
  });

  test("Function Call", () => {
    testNodeParse(new MethodCallNode(f), ``, ParseStatus.empty, ``, "", "");
    testNodeParse(new MethodCallNode(f), `  `, ParseStatus.empty, ``, "", "");
    testNodeParse(
      new MethodCallNode(f),
      `foo()`,
      ParseStatus.valid,
      `foo()`,
      "",
      "foo()",
      "<el-method>foo</el-method>()",
    );
    testNodeParse(
      new MethodCallNode(f),
      `bar(x, 1, "hello")`,
      ParseStatus.valid,
      `bar(x, 1, "hello")`,
      "",
      "",
      "",
    );
    testNodeParse(new MethodCallNode(f), `yon`, ParseStatus.incomplete, `yon`, "", "");
    testNodeParse(new MethodCallNode(f), `yon `, ParseStatus.invalid, ``, "yon ", "");
    testNodeParse(new MethodCallNode(f), `yon(`, ParseStatus.incomplete, `yon(`, "", "");
    testNodeParse(new MethodCallNode(f), `yon(a`, ParseStatus.incomplete, `yon(a`, "", "");
    testNodeParse(new MethodCallNode(f), `yon(a,`, ParseStatus.incomplete, `yon(a,`, "", "");
    testNodeParse(new MethodCallNode(f), `Foo()`, ParseStatus.invalid, ``, "Foo()", "");
    testNodeParse(new MethodCallNode(f), `foo[]`, ParseStatus.invalid, ``, "foo[]", "");
    testNodeParse(
      new MethodCallNode(f),
      `foo(a)`,
      ParseStatus.valid,
      ``,
      "",
      "foo(a)",
      "<el-method>foo</el-method>(<el-id>a</el-id>)",
    );
    testNodeParse(new MethodCallNode(f), `isBefore(b[0])`, ParseStatus.valid, ``, "", "");
  });
  test("TypeSimpleNode", () => {
    testNodeParse(
      new TypeNameNode(f),
      `Foo`,
      ParseStatus.valid,
      "Foo",
      "",
      "",
      "<el-type>Foo</el-type>",
    );
    testNodeParse(new TypeNameNode(f), `foo`, ParseStatus.invalid, "", "foo", "");
  });
  test("TypeSimpleOrGeneric", () => {
    testNodeParse(new TypeSimpleOrGeneric(f), `Foo`, ParseStatus.valid, "Foo", "", "", "");
    testNodeParse(new TypeSimpleOrGeneric(f), `foo`, ParseStatus.invalid, "", "foo", "");
    testNodeParse(new TypeSimpleOrGeneric(f), `Foo<`, ParseStatus.incomplete, "Foo<", "", "");
    testNodeParse(new TypeSimpleOrGeneric(f), `Foo<of`, ParseStatus.incomplete, "Foo<of", "", "");
    testNodeParse(
      new TypeSimpleOrGeneric(f),
      `Foo<of Bar`,
      ParseStatus.incomplete,
      "Foo<of Bar",
      "",
      "",
    );
    testNodeParse(new TypeSimpleOrGeneric(f), `Foo<ofBar`, ParseStatus.valid, "", "<ofBar", "");
    testNodeParse(
      new TypeSimpleOrGeneric(f),
      `Foo<of Bar>`,
      ParseStatus.valid,
      "Foo<of Bar>",
      "",
      "",
      "<el-type>Foo</el-type>&lt;<el-kw>of</el-kw> <el-type>Bar</el-type>&gt;",
    );
    testNodeParse(
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
    testNodeParse(new TypeNode(f), `(Foo, Bar)`, ParseStatus.valid, "(Foo, Bar)", "", "");
    testNodeParse(new TypeNode(f), `(Foo)`, ParseStatus.invalid, "", "(Foo)", "");
    testNodeParse(
      new TypeNode(f),
      `(Foo, Bar, Yon`,
      ParseStatus.incomplete,
      "(Foo, Bar, Yon",
      "",
      "",
    );
    testNodeParse(
      new TypeNode(f),
      `(Foo, (Bar, Yon, Qux))`,
      ParseStatus.valid,
      "(Foo, (Bar, Yon, Qux))",
      "",
      "",
    );
    testNodeParse(
      new TypeNode(f),
      `(Foo, Bar< of Yon>)`,
      ParseStatus.valid,
      "(Foo, Bar< of Yon>)",
      "",
      "",
    );
  });
  test("TypeNode - Func", () => {
    testNodeParse(
      new TypeNode(f),
      `Func<of Foo, Bar => Yon>`,
      ParseStatus.valid,
      "Func<of Foo, Bar => Yon>",
      "",
      "",
    ); //Single
  });
  test("TypeNode - library qualifier", () => {
    testNodeParse(new TypeNode(f), `library.Random`, ParseStatus.valid, "library.Random", "", ""); //Single
  });
  test("TypeNode - other qualifier", () => {
    testNodeParse(new TypeNode(f), `global.Random`, ParseStatus.invalid, "", "global.Random", ""); //Single
  });
  test("TupleNode", () => {
    testNodeParse(new TupleNode(f), `tuple(3,4)`, ParseStatus.valid, "", "", "");
    testNodeParse(
      new TupleNode(f),
      `tuple(3,"a", "hello", 4.1, true)`,
      ParseStatus.valid,
      "",
      "",
      "",
    );
    testNodeParse(
      new TupleNode(f),
      `tuple(tuple(3,4), tuple("a", true))`,
      ParseStatus.valid,
      "",
      "",
      "",
    );
    testNodeParse(
      new TupleNode(f),
      `tuple(3,"a", "hello", 4.1, true`,
      ParseStatus.incomplete,
      "",
      "",
      "",
    );
    testNodeParse(
      new TupleNode(f),
      `tuple(3,"a", "hello", 4.1,`,
      ParseStatus.incomplete,
      "",
      "",
      "",
    );
    testNodeParse(new TupleNode(f), `tuple[3,4]`, ParseStatus.invalid, "", "tuple[3,4]", "");
    testNodeParse(new TupleNode(f), `tuple(a,b)`, ParseStatus.valid, "tuple(a,b)", "", "");
    testNodeParse(new TupleNode(f), `tuple(`, ParseStatus.incomplete, "tuple(", "", "");
    testNodeParse(new TupleNode(f), `tuple(3`, ParseStatus.incomplete, "tuple(3", "", "");
    testNodeParse(new TupleNode(f), `tuple(3)`, ParseStatus.invalid, "", "tuple(3)", "");
    testNodeParse(new TupleNode(f), `tuple()`, ParseStatus.invalid, "", "tuple()", "");
    testNodeParse(
      new TupleNode(f),
      `tuple("foo", 3)`,
      ParseStatus.valid,
      'tuple("foo", 3)',
      "",
      "",
      "",
    );
    testNodeParse(
      new TupleNode(f),
      `tuple(foo, 3, bar(a), x)`,
      ParseStatus.valid,
      "tuple(foo, 3, bar(a), x)",
      "",
      "",
    );
    testNodeParse(new TupleNode(f), `tuple(foo)`, ParseStatus.invalid, "", "tuple(foo)", "");
    testNodeParse(
      new TupleNode(f),
      `tuple(foo, 3, bar(a), x`,
      ParseStatus.incomplete,
      "tuple(foo, 3, bar(a), x",
      "",
      "",
    );
    testNodeParse(
      new TupleNode(f),
      `tuple(setAttemptIfGreen(a.attempt, a.target, x), setTargetIfGreen(a.attempt, a.target, x))`,
      ParseStatus.valid,
      "",
      "",
      "tuple(setAttemptIfGreen(a.attempt, a.target, x), setTargetIfGreen(a.attempt, a.target, x))",
    );
  });
  test("Lambda", () => {
    testNodeParse(
      new Lambda(f),
      `lambda x as Int => x * x`,
      ParseStatus.valid,
      "lambda x as Int => x * x",
      "",
      "",
    );
    testNodeParse(new Lambda(f), `lambda x`, ParseStatus.incomplete, "lambda x", "", "");
    testNodeParse(
      new Lambda(f),
      `lambda x => x * x`,
      ParseStatus.invalid,
      "",
      "lambda x => x * x",
      "",
    );
    testNodeParse(
      new Lambda(f),
      `lambda bestSoFar as String, newWord as String => betterOf(bestSoFar, newWord, possAnswers)`,
      ParseStatus.valid,
      "",
      "",
      "",
    );
    testNodeParse(
      new Lambda(f),
      `lambda a as (String, String), x as Int => tuple(setAttemptIfGreen(a.attempt, a.target, x), setTargetIfGreen(a.attempt, a.target, x))`,
      ParseStatus.valid,
      "",
      "",
      "lambda a as (String, String), x as Int => tuple(setAttemptIfGreen(a.attempt, a.target, x), setTargetIfGreen(a.attempt, a.target, x))",
    );
  });
  test("IfExpr", () => {
    testNodeParse(
      new IfExpr(f),
      `if cell then Colour.green else Colour.black)`,
      ParseStatus.valid,
      "",
      ")",
      "",
      "<el-kw>if </el-kw><el-id>cell</el-id><el-kw> then </el-kw><el-type>Colour</el-type>.<el-id>green</el-id><el-kw> else </el-kw><el-type>Colour</el-type>.<el-id>black</el-id>",
    );
    testNodeParse(new IfExpr(f), `if cell then Colour.amber`, ParseStatus.incomplete, "", "", "");
    testNodeParse(
      new IfExpr(f),
      `if attempt[n] is "*" then attempt else if attempt.isYellow(target, n) then attempt.setChar(n, "+") else attempt.setChar(n, "_")`,
      ParseStatus.valid,
      "",
      "",
      "",
    );
    testNodeParse(
      new IfExpr(f),
      `if attempt.isAlreadyMarkedGreen(n) then target else if attempt.isYellow(target, n) then target.setChar(target.indexOf(attempt[n]), ".") else target`,
      ParseStatus.valid,
      "",
      "",
      "",
    );
    testNodeParse(
      new IfExpr(f),
      `if score > 80 then "Distinction" else if score > 60 then "Merit" else if score > 40 then "Pass" else "Fail"`,
      ParseStatus.valid,
      "",
      "",
      "",
    );
  });
  test("ParamDefNode", () => {
    testNodeParse(
      new ParamDefNode(f),
      `x as String`,
      ParseStatus.valid,
      "x as String",
      "",
      "x as String",
      "<el-id>x</el-id> <el-kw>as</el-kw> <el-type>String</el-type>",
    );
    testNodeParse(new ParamDefNode(f), `z`, ParseStatus.incomplete, "z", "", "");
    testNodeParse(new ParamDefNode(f), `w as`, ParseStatus.incomplete, "w as", "", "");
    testNodeParse(new ParamDefNode(f), `A`, ParseStatus.invalid, "", "A", "");
    testNodeParse(new ParamDefNode(f), `v String`, ParseStatus.invalid, "", "v String", "");
  });
  test("Param List", () => {
    testNodeParse(
      new CSV(f, () => new ParamDefNode(f), 0),
      `A as string`,
      ParseStatus.valid,
      "",
      "A as string",
      "",
    ); //i.e. all leftover
    testNodeParse(new CSV(f, () => new ParamDefNode(f), 0), ``, ParseStatus.valid, "", "", "");
    testNodeParse(
      new CSV(f, () => new ParamDefNode(f), 0),
      `a as String`,
      ParseStatus.valid,
      "",
      "",
      "",
    );
    testNodeParse(
      new CSV(f, () => new ParamDefNode(f), 0),
      `a as String, bb as Int, foo as Bar`,
      ParseStatus.valid,
      "",
      "",
      "",
    );
    testNodeParse(
      new CSV(f, () => new ParamDefNode(f), 0),
      `a`,
      ParseStatus.incomplete,
      "a",
      "",
      "",
    );
    testNodeParse(
      new CSV(f, () => new ParamDefNode(f), 0),
      `a as String,`,
      ParseStatus.incomplete,
      "a as String,",
      "",
      "",
    );
    testNodeParse(
      new CSV(f, () => new ParamDefNode(f), 0),
      `a as String, bb as`,
      ParseStatus.incomplete,
      "",
      "",
      "",
    );
  });
  test("KVP", () => {
    testNodeParse(
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
    testNodeParse(
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
    testNodeParse(
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
    testNodeParse(
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
    testNodeParse(
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
    testNodeParse(
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
    testNodeParse(
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
    testNodeParse(
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
    testNodeParse(
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
    testNodeParse(
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

    testNodeParse(
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
    testNodeParse(
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
    testNodeParse(new LitValueNode(f), `''`, ParseStatus.valid, "", "", "");
    testNodeParse(new LitValueNode(f), `'`, ParseStatus.incomplete, "", "", "");
  });
  test("DeconstructedTuple", () => {
    testNodeParse(new DeconstructedTuple(f), `a, b`, ParseStatus.valid, "", "", "");
    testNodeParse(new DeconstructedTuple(f), `a,b`, ParseStatus.valid, "", "", "");
    testNodeParse(new DeconstructedTuple(f), `a,`, ParseStatus.incomplete, "", "", "");
    testNodeParse(new DeconstructedTuple(f), `(a,b)`, ParseStatus.invalid, "", "(a,b)", "");
    testNodeParse(new DeconstructedTuple(f), `3,4`, ParseStatus.invalid, "", "3,4", "");
    testNodeParse(
      new DeconstructedTuple(f),
      `property.a, b`,
      ParseStatus.invalid,
      "",
      "property.a, b",
      "",
    );
  });
  test("Literal", () => {
    testNodeParse(new LitValueNode(f), `"hello"`, ParseStatus.valid, "", "", "");
    testNodeParse(new LitValueNode(f), `123`, ParseStatus.valid, "", "", "");
  });
  test("DeconstructedList", () => {
    testNodeParse(new DeconstructedList(f), `a:b`, ParseStatus.valid, "", "", "");
    testNodeParse(new DeconstructedList(f), `a:`, ParseStatus.incomplete, "", "", "");
    testNodeParse(new DeconstructedList(f), `[a,b]`, ParseStatus.invalid, "", "[a,b]", "");
    testNodeParse(new DeconstructedList(f), `[a:3]`, ParseStatus.invalid, "", "[a:3]", "");
    testNodeParse(new DeconstructedList(f), `(a:b)`, ParseStatus.invalid, "", "(a:b)", "");
  });
  test("SpaceNode", () => {
    testNodeParse(new SpaceNode(f, Space.ignored), ``, ParseStatus.valid, "", "", "", "");
    testNodeParse(new SpaceNode(f, Space.ignored), ` `, ParseStatus.valid, "", "", "", "");
    testNodeParse(new SpaceNode(f, Space.ignored), `  `, ParseStatus.valid, "", "", "", "");
    testNodeParse(new SpaceNode(f, Space.added), ``, ParseStatus.valid, "", "", " ", " ");
    testNodeParse(new SpaceNode(f, Space.added), ` `, ParseStatus.valid, "", "", " ", " ");
    testNodeParse(new SpaceNode(f, Space.added), `  `, ParseStatus.valid, "", "", " ", " ");
    testNodeParse(new SpaceNode(f, Space.required), ``, ParseStatus.empty, "", "", "", "");
    testNodeParse(new SpaceNode(f, Space.required), ` `, ParseStatus.valid, "", "", " ", " ");
    testNodeParse(new SpaceNode(f, Space.required), `  `, ParseStatus.valid, "", "", " ", " ");
  });
  test("New Instance", () => {
    testNodeParse(new NewInstance(f), ``, ParseStatus.empty, "", "", "", "");
    testNodeParse(new NewInstance(f), `new Foo()`, ParseStatus.valid, "", "", "new Foo()", "");
    testNodeParse(new NewInstance(f), `newFoo()`, ParseStatus.invalid, "", "newFoo()", "", "");
    testNodeParse(
      new NewInstance(f),
      "new List<of String>()",
      ParseStatus.valid,
      "new List<of String>()",
      "",
    );
  });
  test("String Interpolation", () => {
    testNodeParse(new LitStringInterpolation(f), ``, ParseStatus.empty, "", "", "", "");
    testNodeParse(
      new LitStringInterpolation(f),
      "{x + 1}",
      ParseStatus.valid,
      "{x + 1}",
      "",
      "",
      "",
    );
    testNodeParse(new LitStringInterpolation(f), "{x", ParseStatus.incomplete, "{x", "", "", "");
    testNodeParse(new LitStringInterpolation(f), "{}", ParseStatus.invalid, "", "{}", "", "");
  });
  test("LitString", () => {
    testNodeParse(new LitString(f), `""`, ParseStatus.valid, `""`, "", "", `""`);
    testNodeParse(
      new LitString(f),
      `"abc"`,
      ParseStatus.valid,
      `"abc"`,
      "",
      "",
      `"<el-lit>abc</el-lit>"`,
    );
    testNodeParse(
      new LitString(f),
      `"abc def"`,
      ParseStatus.valid,
      `"abc def"`,
      "",
      "",
      `"<el-lit>abc def</el-lit>"`,
    );
    testNodeParse(new LitString(f), `"abc`, ParseStatus.incomplete, `"abc`, "", "", "");
    testNodeParse(new LitString(f), `"`, ParseStatus.incomplete, `"`, "", "", "");
    testNodeParse(new LitString(f), `abc`, ParseStatus.invalid, "", "abc", "", "");
    testNodeParse(new LitString(f), `'abc'`, ParseStatus.valid, "'abc'", "", "", "");
    testNodeParse(new LitString(f), `'abc"`, ParseStatus.incomplete, `'abc"`, "", "", "");
    testNodeParse(new LitString(f), `"abc'`, ParseStatus.incomplete, `"abc'`, "", "", "");
    //Test embedded html
    testNodeParse(
      new LitStringDoubleQuotesNonEmpty(f),
      `"<p>abc</p>"`,
      ParseStatus.valid,
      `"<p>abc</p>"`,
      "",
      `"<p>abc</p>"`,
      `"<el-lit>&lt;p&gt;abc&lt;/p&gt;</el-lit>"`,
    );
    testNodeParse(
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
    testNodeParse(segment(), `abc`, ParseStatus.valid, "abc", "");
    testNodeParse(segment(), `{x}`, ParseStatus.valid, "{x}", "");
    testNodeParse(segment(), `"`, ParseStatus.invalid, "", `"`);

    testNodeParse(new LitString(f), `"{x}{y}"`, ParseStatus.valid, "", "");
    testNodeParse(new LitString(f), `"{a} times {b} equals{c}"`, ParseStatus.valid, "", "");
  });
  test("Bug #290", () => {
    testNodeParse(new LitInt(f), `3`, ParseStatus.valid, "3", "");
    testNodeParse(new LitInt(f), `3 `, ParseStatus.valid, "3", " ");

    testNodeParse(new LitValueNode(f), `3 `, ParseStatus.valid, "3", " ");
    testNodeParse(new BinaryExpression(f), `3 `, ParseStatus.incomplete, "3 ", "", "3 ");

    testNodeParse(new ExprNode(f), `3 `, ParseStatus.incomplete, "3 ", "", "3 ");
  });

  test("ProcRefCompound", () => {
    testNodeParse(new InstanceProcRef(f), `bar.foo`, ParseStatus.valid, "", "");
    testNodeParse(new InstanceProcRef(f), `bar.`, ParseStatus.incomplete, "", "");
    testNodeParse(new InstanceProcRef(f), `bar.foo.yon`, ParseStatus.valid, "", ".yon");
    testNodeParse(new InstanceProcRef(f), `bar.foo[2]`, ParseStatus.valid, "", "[2]");
    testNodeParse(new InstanceProcRef(f), `bar`, ParseStatus.incomplete, "", "");
    testNodeParse(new InstanceProcRef(f), `global.bar`, ParseStatus.valid, "", "");
    testNodeParse(new InstanceProcRef(f), `library.bar`, ParseStatus.valid, "", "");
    testNodeParse(new InstanceProcRef(f), `x[3].bar`, ParseStatus.valid, "", "");
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
    testNodeParse(new TermSimple(f), `abc`, ParseStatus.valid, "abc", "");
    testNodeParse(new TermSimple(f), `abc()`, ParseStatus.valid, "abc()", "");
    testNodeParse(new TermSimple(f), `this`, ParseStatus.valid, "this", "");
    testNodeParse(new TermSimple(f), `abc(def, ghi)`, ParseStatus.valid, "abc(def, ghi)", "");
    testNodeParse(new TermSimpleWithOptIndex(f), `abc[1]`, ParseStatus.valid, "abc[1]", "");
    testNodeParse(new TermSimpleWithOptIndex(f), `abc[1][2]`, ParseStatus.valid, "abc[1]", "[2]");
    testNodeParse(new TermSimpleWithOptIndex(f), `abc[1..2]`, ParseStatus.valid, "abc[1..2]", "");
    testNodeParse(new TermSimpleWithOptIndex(f), `abc[1, 2]`, ParseStatus.valid, "abc[1, 2]", "");
    testNodeParse(
      new TermSimpleWithOptIndex(f),
      `abc(def, ghi)[0]`,
      ParseStatus.valid,
      "abc(def, ghi)[0]",
      "",
    );
    testNodeParse(new ExprNode(f), `tuple(def, ghi)`, ParseStatus.valid, "tuple(def, ghi)", ""); // tuple
    testNodeParse(new TermSimple(f), `[def, ghi]`, ParseStatus.valid, "[def, ghi]", "");
    testNodeParse(new TermSimple(f), `345`, ParseStatus.valid, "345", "");
    testNodeParse(new TermSimple(f), `-345`, ParseStatus.valid, "-345", "");
    testNodeParse(new TermSimple(f), `not a`, ParseStatus.valid, "not a", "");
    testNodeParse(new TermSimple(f), `(3 + a)`, ParseStatus.valid, "(3 + a)", "");
    testNodeParse(new Qualifier(f), `property`, ParseStatus.valid, `property`, "");
    testNodeParse(new PunctuationNode(f, DOT), `.`, ParseStatus.valid, `.`, "");
    testNodeParse(new ReferenceNode(f), `a`, ParseStatus.valid, `a`, "");
    testNodeParse(new DottedTerm(f), `.a`, ParseStatus.valid, `.a`, "");
    testNodeParse(new DotAfter(f, new ReferenceNode(f)), `.a`, ParseStatus.invalid, ``, ".a");
    testNodeParse(new TermChained(f), `property.a`, ParseStatus.valid, `property.a`, "");
    testNodeParse(
      new TermChained(f),
      `a[1].b()[1..2].c(d)[e][f]`,
      ParseStatus.valid,
      `a[1].b()[1..2].c(d)[e][f]`,
      "",
    );
    testNodeParse(
      new TermChained(f),
      `property.a[1].b().c(d)[e]`,
      ParseStatus.valid,
      `property.a[1].b().c(d)[e]`,
      "",
    );
    testNodeParse(
      new TermChained(f),
      `this.a.b()`,
      ParseStatus.valid,
      `this.a.b()`,
      "",
      "this.a.b()",
      "<el-kw>this</el-kw>.<el-id>a</el-id>.<el-method>b</el-method>()",
    );
    testNodeParse(
      new ExprNode(f),
      `a[1].b()[1..2].c(d).e.f[g]`,
      ParseStatus.valid,
      `a[1].b()[1..2].c(d).e.f[g]`,
      "",
    );
    testNodeParse(
      new ExprNode(f),
      `property.a[1].b().c(d)[e]`,
      ParseStatus.valid,
      `property.a[1].b().c(d)[e]`,
      "",
    );
    testNodeParse(new ExprNode(f), `ref foo`, ParseStatus.valid, `ref foo`, "");
    testNodeParse(new ExprNode(f), `ref `, ParseStatus.incomplete, `ref `, "");
  });
  test("OperatorAmbiguity#728", () => {
    //Test operations
    testNodeParse(new BinaryOperation(f), ``, ParseStatus.empty, "", "", "", "");
    testNodeParse(new BinaryOperation(f), ` `, ParseStatus.incomplete, " ", "", " ", " ");
    testNodeParse(new BinaryOperation(f), `+`, ParseStatus.valid, "+", "", " + ", " + ");
    testNodeParse(new BinaryOperation(f), ` +`, ParseStatus.valid, " +", "", " + ", " + ");
    testNodeParse(new BinaryOperation(f), ` + `, ParseStatus.valid, " + ", "", " + ", " + ");
    testNodeParse(new BinaryOperation(f), `*`, ParseStatus.valid, "*", "", "*", "*");
    testNodeParse(new BinaryOperation(f), ` *`, ParseStatus.valid, " *", "", "*", "*");
    testNodeParse(new BinaryOperation(f), ` * `, ParseStatus.valid, " * ", "", "*", "*");
    testNodeParse(new BinaryOperation(f), `>=`, ParseStatus.valid, ">=", "", " >= ", " >= ");
    testNodeParse(new BinaryOperation(f), ` >=`, ParseStatus.valid, " >=", "", " >= ", " >= ");
    testNodeParse(new BinaryOperation(f), ` >= `, ParseStatus.valid, " >= ", "", " >= ", " >= ");
    testNodeParse(new BinaryOperation(f), `>`, ParseStatus.incomplete, ">", "", ">", ">");
    testNodeParse(new BinaryOperation(f), ` >`, ParseStatus.incomplete, " >", "", " >", " >");
    testNodeParse(new BinaryOperation(f), `> `, ParseStatus.valid, "> ", "", " > ", " > ");
    testNodeParse(new BinaryOperation(f), ` > `, ParseStatus.valid, " > ", "", " > ", " > ");
    testNodeParse(new BinaryOperation(f), `is`, ParseStatus.incomplete, "is", "", "is", "is");
    testNodeParse(
      new BinaryOperation(f),
      `is `,
      ParseStatus.valid,
      "is ",
      "",
      " is ",
      "<el-kw> is </el-kw>",
    );
    testNodeParse(new BinaryOperation(f), `isn`, ParseStatus.incomplete, "isn", "", "isn", "isn");
    testNodeParse(
      new BinaryOperation(f),
      `isnt`,
      ParseStatus.valid,
      "isnt",
      "",
      " isnt ",
      "<el-kw> isnt </el-kw>",
    );
    testNodeParse(
      new BinaryOperation(f),
      ` and `,
      ParseStatus.valid,
      " and ",
      "",
      " and ",
      "<el-kw> and </el-kw>",
    );
    testNodeParse(
      new BinaryOperation(f),
      `and`,
      ParseStatus.valid,
      "and",
      "",
      " and ",
      "<el-kw> and </el-kw>",
    );
    testNodeParse(
      new BinaryOperation(f),
      `anda`,
      ParseStatus.valid,
      "and",
      "a",
      " and ",
      "<el-kw> and </el-kw>",
    );

    testNodeParse(new BinaryOperation(f), `an`, ParseStatus.incomplete, "an", "", "an", "an");
    testNodeParse(new BinaryOperation(f), `not`, ParseStatus.invalid, "", "not", "", "");

    //test expressions
    testNodeParse(
      new BinaryExpression(f),
      `"a"+  "b"`,
      ParseStatus.valid,
      `"a"+  "b"`,
      "",
      `"a" + "b"`,
    );
    testNodeParse(
      new BinaryExpression(f),
      `3+`,
      ParseStatus.incomplete,
      "3+",
      "",
      "3 + ",
      "<el-lit>3</el-lit> + ",
    );
    testNodeParse(
      new BinaryExpression(f),
      `3 +`,
      ParseStatus.incomplete,
      "3 +",
      "",
      "3 + ",
      "<el-lit>3</el-lit> + ",
    );
    testNodeParse(
      new BinaryExpression(f),
      `3 `,
      ParseStatus.incomplete,
      "3 ",
      "",
      "3 ",
      "<el-lit>3</el-lit> ",
    );
    testNodeParse(
      new BinaryExpression(f),
      `3+4`,
      ParseStatus.valid,
      "3+4",
      "",
      "3 + 4",
      "<el-lit>3</el-lit> + <el-lit>4</el-lit>",
    );
    testNodeParse(
      new BinaryExpression(f),
      `3>=4`,
      ParseStatus.valid,
      "3>=4",
      "",
      "3 >= 4",
      "<el-lit>3</el-lit> >= <el-lit>4</el-lit>",
    );
    testNodeParse(new BinaryExpression(f), `3>`, ParseStatus.incomplete, "3>", "", "3>");
    testNodeParse(new BinaryExpression(f), `3> `, ParseStatus.incomplete, "3> ", "", "3 > ");
    testNodeParse(new BinaryExpression(f), `3> 4`, ParseStatus.valid, "3> 4", "", "3 > 4");
    testNodeParse(new BinaryExpression(f), `3>4`, ParseStatus.valid, "3>4", "", "3 > 4");
    testNodeParse(new BinaryExpression(f), `3 > 4`, ParseStatus.valid, "3 > 4", "", "3 > 4");
    testNodeParse(new BinaryExpression(f), `3>=`, ParseStatus.incomplete, "3>=", "", "3 >= ");
    testNodeParse(new BinaryExpression(f), `3>=4`, ParseStatus.valid, "3>=4", "", "3 >= 4");
    testNodeParse(
      new BinaryExpression(f),
      `3 is 4`,
      ParseStatus.valid,
      "3 is 4",
      "",
      "3 is 4",
      "<el-lit>3</el-lit><el-kw> is </el-kw><el-lit>4</el-lit>",
    );
    testNodeParse(
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
    testNodeParse(
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
    testNodeParse(
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
    testNodeParse(
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
    testNodeParse(
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
    testNodeParse(
      new ExprNode(f),
      `[[0.0,0.0,0.0,0.16,0.0,0.0,0.01],[0.85,0.04,-0.04,0.85,0.0,1.60,0.85],[0.20,-0.26,0.23,0.22,0.0,1.60,0.07],[-0.15,0.28,0.26,0.24,0.0,0.44,0.07]]`,
      ParseStatus.valid,
      `[[0.0,0.0,0.0,0.16,0.0,0.0,0.01],[0.85,0.04,-0.04,0.85,0.0,1.60,0.85],[0.20,-0.26,0.23,0.22,0.0,1.60,0.07],[-0.15,0.28,0.26,0.24,0.0,0.44,0.07]]`,
      "",
    );
  });
  test("Parse list of floats 2", () => {
    testNodeParse(new ExprNode(f), `[0.0]`, ParseStatus.valid, `[0.0]`, "");
  });
  test("Six open brackets", () => {
    testNodeParse(new ExprNode(f), `((((((3))))))`, ParseStatus.valid, `((((((3))))))`, "");
  });
  test("Image", () => {
    testNodeParse(
      new RegExMatchNode(f, Regexes.url),
      "http://website.com/images/image1.png",
      ParseStatus.valid,
      "http://website.com/images/image1.png",
      "",
      "",
      "",
    );
    testNodeParse(
      new ImageNode(f),
      "image http://website.com/images/image1.png",
      ParseStatus.valid,
      "image http://website.com/images/image1.png",
      "",
      "image http://website.com/images/image1.png",
      `<img src="http://website.com/images/image1.png">`,
    );
    testNodeParse(
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
