import { Regexes } from "../src/ide/frames/fields/regexes";
import { abstractKeyword } from "../src/ide/frames/keywords";
import { AbstractSequence } from "../src/ide/frames/parse-nodes/abstract-sequence";
import { Alternatives } from "../src/ide/frames/parse-nodes/alternatives";
import { BinaryExpression } from "../src/ide/frames/parse-nodes/binary-expression";
import { BinaryOperation } from "../src/ide/frames/parse-nodes/binary-operation";
import { BracketedExpression } from "../src/ide/frames/parse-nodes/bracketed-expression";
import { CommaNode } from "../src/ide/frames/parse-nodes/comma-node";
import { ConstantValueNode } from "../src/ide/frames/parse-nodes/constant-value-node";
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
import { ListImmutableNode } from "../src/ide/frames/parse-nodes/list-immutable-node";
import { LitFloat } from "../src/ide/frames/parse-nodes/lit-float";
import { LitInt } from "../src/ide/frames/parse-nodes/lit-int";
import { LitRegExp } from "../src/ide/frames/parse-nodes/lit-regExp";
import { LitString } from "../src/ide/frames/parse-nodes/lit-string";
import { LitStringInterpolation } from "../src/ide/frames/parse-nodes/lit-string-interpolation";
import { LitStringNonEmpty } from "../src/ide/frames/parse-nodes/lit-string-non-empty";
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
import { testActiveNodeAndDone, testNodeParse } from "./testHelpers";

suite("Parsing Nodes", () => {
  test("UnaryExpression", () => {
    testNodeParse(new UnaryExpression(), "", ParseStatus.empty, "", "", "", "");
    testNodeParse(new UnaryExpression(), "-3", ParseStatus.valid, "-3", "", "-3", "");
    testNodeParse(
      new UnaryExpression(),
      " not foo",
      ParseStatus.valid,
      " not foo",
      "",
      "not foo",
      "",
    );
    testNodeParse(new UnaryExpression(), "-", ParseStatus.incomplete, "-", "", "-", "");
    testNodeParse(new UnaryExpression(), "+4", ParseStatus.invalid, "", "+4", "", "");
  });
  test("IndexableTerm", () => {
    testNodeParse(new Term(), "a", ParseStatus.valid, "a", "", "a", "");
  });
  test("Term2", () => {
    testNodeParse(new Term(), "empty ", ParseStatus.invalid, "", "empty ", "");
    testNodeParse(new Term(), "", ParseStatus.empty, "", "", "");
    testNodeParse(new Term(), "a", ParseStatus.valid, "a", "", "a", "");
  });
  test("Expression", () => {
    testNodeParse(new ExprNode(), "", ParseStatus.empty, "", "", "");
    testNodeParse(new ExprNode(), "", ParseStatus.empty, "", "", "");
    testNodeParse(new ExprNode(), "a", ParseStatus.valid, "a", "", "a", "");
    testNodeParse(new ExprNode(), "a + b", ParseStatus.valid, "a + b", "", "a + b", "");
    testNodeParse(new ExprNode(), "a * -b", ParseStatus.valid, "a * -b", "", "a*-b", "");
    testNodeParse(new ExprNode(), "a + b- c", ParseStatus.valid, "", "", "a + b - c", "");
    testNodeParse(new ExprNode(), "+", ParseStatus.invalid, "", "+", "");
    testNodeParse(new ExprNode(), "+b", ParseStatus.invalid, "", "+b", "");
    testNodeParse(new ExprNode(), "a +", ParseStatus.incomplete, "a +", "", "a + ");
    testNodeParse(new ExprNode(), "a %", ParseStatus.valid, "a", " %", "a");
    testNodeParse(new ExprNode(), "3 * 4 + x", ParseStatus.valid, "3 * 4 + x", "", "3*4 + x", "");
    testNodeParse(new ExprNode(), "3* foo(5)", ParseStatus.valid, "", "", "3*foo(5)", "");
    testNodeParse(
      new ExprNode(),
      "new List<of String>()",
      ParseStatus.valid,
      "new List<of String>()",
      "",
    );
    testNodeParse(
      new ExprNode(),
      "points.foo(0.0)",
      ParseStatus.valid,
      "points.foo(0.0)",
      "",
      "points.foo(0.0)",
      "",
    );
    testNodeParse(
      new ExprNode(),
      "reduce(0.0, lambda s as String, p as ListImmutable<of String> => s + p[0] * p[0])",
      ParseStatus.valid,
      "reduce(0.0, lambda s as String, p as ListImmutable<of String> => s + p[0] * p[0])",
      "",
      "",
    );
    testNodeParse(
      new ExprNode(),
      "this",
      ParseStatus.valid,
      "this",
      "",
      "this",
      "<el-kw>this</el-kw>",
    );
    testNodeParse(
      new ExprNode(),
      "thisWidget",
      ParseStatus.valid,
      "thisWidget",
      "",
      "thisWidget",
      "<el-id>thisWidget</el-id>",
    );
    // empty data structures
    testNodeParse(
      new ExprNode(),
      "empty List<of Int>",
      ParseStatus.valid,
      "empty List<of Int>",
      "",
      "",
      "<el-kw>empty</el-kw> <el-type>List</el-type>&lt;<el-kw>of</el-kw> <el-type>Int</el-type>&gt;",
    );
    testNodeParse(
      new ExprNode(),
      "empty ListImmutable<of Int>",
      ParseStatus.valid,
      "empty ListImmutable<of Int>",
      "",
      "",
      "<el-kw>empty</el-kw> <el-type>ListImmutable</el-type>&lt;<el-kw>of</el-kw> <el-type>Int</el-type>&gt;",
    );
    testNodeParse(
      new ExprNode(),
      "empty String",
      ParseStatus.valid,
      "empty String",
      "",
      "",
      "<el-kw>empty</el-kw> <el-type>String</el-type>",
    );
    testNodeParse(new ExprNode(), "empty Lit<of Int>", ParseStatus.valid, "", "", "", "");
    testNodeParse(
      new ExprNode(),
      "lambda a as (String, String), x as Int => tuple(setAttemptIfGreen(a.attempt, a.target, x), setTargetIfGreen(a.attempt, a.target, x))",
      ParseStatus.valid,
      "lambda a as (String, String), x as Int => tuple(setAttemptIfGreen(a.attempt, a.target, x), setTargetIfGreen(a.attempt, a.target, x))",
      "",
      "lambda a as (String, String), x as Int => tuple(setAttemptIfGreen(a.attempt, a.target, x), setTargetIfGreen(a.attempt, a.target, x))",
      "",
    );
  });
  test("Set To Clause", () => {
    testNodeParse(new SetToClause(() => ""), "x set to p.x + 3", ParseStatus.valid, "", "", "", "");
  });
  test("CSV of set clauses", () => {
    testNodeParse(
      new CSV(() => new SetToClause(() => ""), 1),
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
      new ExprNode(),
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
      new ExprNode(),
      "new Foo() with x set to 3, y set to 1",
      ParseStatus.valid,
      "",
      "",
      "",
      "",
    );
  });
  test("Identifier", () => {
    testNodeParse(new IdentifierNode(), ``, ParseStatus.empty, ``, "", "");
    testNodeParse(new IdentifierNode(), `  `, ParseStatus.invalid, ``, "", "");
    testNodeParse(new IdentifierNode(), `a`, ParseStatus.valid, `a`, "", "a", "");
    testNodeParse(new IdentifierNode(), `aB_d`, ParseStatus.valid, `aB_d`, "", "aB_d");
    testNodeParse(new IdentifierNode(), `abc `, ParseStatus.valid, `abc`, " ", "abc");
    testNodeParse(new IdentifierNode(), `Abc`, ParseStatus.invalid, ``, "Abc", "");
    testNodeParse(new IdentifierNode(), `abc-de`, ParseStatus.valid, `abc`, "-de", "abc");
    // Can be a keyword - because that will be rejected at compile stage, not parse stage
    testNodeParse(new IdentifierNode(), `new`, ParseStatus.valid, `new`, "", "");
    testNodeParse(new IdentifierNode(), `global`, ParseStatus.valid, `global`, "", "");
    testNodeParse(new IdentifierNode(), `x as`, ParseStatus.valid, `x`, " as", "x");
  });
  test("LitString - single chars", () => {
    testNodeParse(new LitString(), "", ParseStatus.empty, "", "", "", "");
    testNodeParse(new LitString(), `"a"`, ParseStatus.valid, `"a"`, "", `"a"`, "");
    testNodeParse(new LitString(), `"a`, ParseStatus.incomplete, `"a`, "", `"a`, "");
    testNodeParse(new LitString(), `"9"`, ParseStatus.valid, `"9"`, "", `"9"`, "");
    testNodeParse(new LitString(), `" "`, ParseStatus.valid, `" "`, "", `" "`, "");
  });
  test("LitString - bug #328", () => {
    testNodeParse(new LitString(), `" `, ParseStatus.incomplete, `" `, "", `" `, "");
    testNodeParse(new LitString(), `"{a} `, ParseStatus.incomplete, `"{a} `, "", `"{a} `, "");
  });
  test("LitInt", () => {
    testNodeParse(new LitInt(), "", ParseStatus.empty, "", "", "", "");
    testNodeParse(new LitInt(), "   ", ParseStatus.invalid, "", "   ", "", "");
    testNodeParse(new LitInt(), "123", ParseStatus.valid, "123", "", "123", "");
    testNodeParse(new LitInt(), "-123", ParseStatus.valid, "-123", "", "-123", "");
    testNodeParse(new LitInt(), "- 123", ParseStatus.invalid, "", "- 123", "", "");
    testNodeParse(new LitInt(), "1-23", ParseStatus.valid, "1", "-23", "", "");
    testNodeParse(new LitInt(), "456  ", ParseStatus.valid, "456", "  ", "456", "");
    testNodeParse(new LitInt(), " 123a", ParseStatus.valid, " 123", "a", "123", "");
    testNodeParse(new LitInt(), "1.23", ParseStatus.valid, "1", ".23", "1", "");
    testNodeParse(new LitInt(), "a", ParseStatus.invalid, "", "a", "", "");
    //Hex & binary
    testNodeParse(
      new LitInt(),
      "0xfa3c",
      ParseStatus.valid,
      "0xfa3c",
      "",
      "",
      "<el-lit>0xfa3c</el-lit>",
    );
    testNodeParse(new LitInt(), "0xfa3g", ParseStatus.valid, "0xfa3", "g", "", "");
    testNodeParse(
      new LitInt(),
      "0b01101",
      ParseStatus.valid,
      "0b01101",
      "",
      "",
      "<el-lit>0b01101</el-lit>",
    );
    testNodeParse(new LitInt(), "0b01102", ParseStatus.valid, "0b0110", "2", "", "");
  });
  test("LitFloat", () => {
    testNodeParse(new LitFloat(), "", ParseStatus.empty, "", "", "");
    testNodeParse(new LitFloat(), "1.0", ParseStatus.valid, "1.0", "", "1.0");
    testNodeParse(new LitFloat(), "-1.0", ParseStatus.valid, "-1.0", "", "-1.0");
    testNodeParse(new LitFloat(), "- 1.0", ParseStatus.invalid, "", "- 1.0", "");
    testNodeParse(new LitFloat(), "1.-0", ParseStatus.invalid, "", "1.-0", "");
    testNodeParse(new LitFloat(), " 1.0a", ParseStatus.valid, " 1.0", "a", "1.0");
    testNodeParse(new LitFloat(), "1", ParseStatus.incomplete, "1", "", "1");
    testNodeParse(new LitFloat(), "1.", ParseStatus.incomplete, "1.", "", "1.");
    testNodeParse(new LitFloat(), "1. ", ParseStatus.invalid, "", "1. ", "");
    testNodeParse(new LitFloat(), "1.1e5", ParseStatus.valid, "1.1e5", "", "1.1e5");
    testNodeParse(new LitFloat(), "1.1e-5", ParseStatus.valid, "1.1e-5", "", "1.1e-5");
    testNodeParse(new LitFloat(), "1.1E-5", ParseStatus.valid, "1.1E-5", "", "1.1E-5");
  });
  test("Keyword", () => {
    testNodeParse(new KeywordNode(abstractKeyword), "", ParseStatus.empty, "", "", "");
    testNodeParse(
      new KeywordNode(abstractKeyword),
      "abstract ",
      ParseStatus.valid,
      "abstract",
      " ",
      "",
    );
    testNodeParse(
      new KeywordNode(abstractKeyword),
      "abstract(x",
      ParseStatus.valid,
      "abstract",
      "(x",
      "",
    );
    testNodeParse(
      new KeywordNode(abstractKeyword),
      "abstractx",
      ParseStatus.invalid,
      "",
      "abstractx",
      "",
    );
    testNodeParse(
      new KeywordNode(abstractKeyword),
      "abstract immutable",
      ParseStatus.valid,
      "abstract",
      " immutable",
      "abstract",
    );
    testNodeParse(
      new KeywordNode(abstractKeyword),
      " abs",
      ParseStatus.incomplete,
      " abs",
      "",
      "abs",
    );
    testNodeParse(
      new KeywordNode(abstractKeyword),
      " abscract",
      ParseStatus.invalid,
      "",
      " abscract",
      "",
    );
  });
  test("BracketedExpression", () => {
    testNodeParse(
      new BracketedExpression(),
      "(3 + 4)",
      ParseStatus.valid,
      "(3 + 4)",
      "",
      "(3 + 4)",
      "",
    );

    testNodeParse(new BracketedExpression(), "", ParseStatus.empty, "", "", "");
    testNodeParse(new BracketedExpression(), "(3)", ParseStatus.valid, "(3)", "", "(3)", "");

    testNodeParse(
      new BracketedExpression(),
      "(a and not b)",
      ParseStatus.valid,
      "(a and not b)",
      "",
      "(a and not b)",
      "",
    );
    testNodeParse(
      new BracketedExpression(),
      "(3 * 4 + x)",
      ParseStatus.valid,
      "(3 * 4 + x)",
      "",
      "(3*4 + x)",
      "",
    );
    testNodeParse(
      new BracketedExpression(),
      "(3 * (4 + x))",
      ParseStatus.valid,
      "(3 * (4 + x))",
      "",
      "(3*(4 + x))",
      "",
    );
    testNodeParse(
      new BracketedExpression(),
      "(a and not b",
      ParseStatus.incomplete,
      "(a and not b",
      "",
      "(a and not b",
    );
    //testNodeParse(new BracketedExpression(), "(a and not b  ", ParseStatus.incomplete, "(a and not b  ", "", "(a and not b"); TODO
    testNodeParse(new BracketedExpression(), "(", ParseStatus.incomplete, "(", "", "(");
    testNodeParse(new BracketedExpression(), "()", ParseStatus.invalid, "", "()", "");
  });
  test("Optional", () => {
    testNodeParse(new OptionalNode(new LitInt()), "123 a", ParseStatus.valid, "123", " a", "123");
    testNodeParse(new OptionalNode(new LitInt()), "abc", ParseStatus.valid, "", "abc", "");
    testNodeParse(
      new OptionalNode(new KeywordNode(abstractKeyword)),
      " abstract",
      ParseStatus.valid,
      " abstract",
      "",
      "abstract",
      "<el-kw>abstract</el-kw>",
    );
    testNodeParse(
      new OptionalNode(new KeywordNode(abstractKeyword)),
      "abs",
      ParseStatus.incomplete,
      "abs",
      "",
      "",
    );
    testNodeParse(
      new OptionalNode(new KeywordNode(abstractKeyword)),
      "abscract",
      ParseStatus.valid,
      "",
      "abscract",
      "",
    );
    testNodeParse(
      new OptionalNode(new KeywordNode(abstractKeyword)),
      "",
      ParseStatus.valid,
      "",
      "",
      "",
    );
    testNodeParse(
      new OptionalNode(new KeywordNode(abstractKeyword)),
      "  ",
      ParseStatus.incomplete,
      "  ",
      "",
      "",
    );
  });

  test("Multiple", () => {
    testNodeParse(new Multiple(() => new LitInt(), 0), ``, ParseStatus.valid, ``, "", "");
    testNodeParse(new Multiple(() => new LitInt(), 1), ``, ParseStatus.empty, ``, "", "");
    testNodeParse(new Multiple(() => new LitInt(), 0), `)`, ParseStatus.valid, ``, ")", "");
    testNodeParse(
      new Multiple(() => new LitInt(), 1),
      `1 0 33`,
      ParseStatus.valid,
      `1 0 33`,
      "",
      "",
    );
    testNodeParse(new Multiple(() => new LitInt(), 1), `1`, ParseStatus.valid, `1`, "", "");
    testNodeParse(new Multiple(() => new LitInt(), 0), ``, ParseStatus.valid, ``, "", "");
    testNodeParse(new Multiple(() => new LitInt(), 1), ``, ParseStatus.empty, ``, "", "");
    testNodeParse(new Multiple(() => new LitInt(), 1), `5 6 a`, ParseStatus.valid, `5 6`, " a", "");
    testNodeParse(new Multiple(() => new LitInt(), 1), `7   `, ParseStatus.valid, `7`, "   ", "");

    testNodeParse(
      new Multiple(() => new KeywordNode("foo"), 1),
      `foo foo`,
      ParseStatus.valid,
      "",
      "",
      "",
    );
    testNodeParse(
      new Multiple(() => new KeywordNode("bar"), 1),
      `bar ba`,
      ParseStatus.incomplete,
      "bar ba",
      "",
      "",
    );
    testNodeParse(
      new Multiple(() => new KeywordNode("foo"), 1),
      `foo`,
      ParseStatus.valid,
      "",
      "",
      "",
    );
    testNodeParse(
      new Multiple(() => new KeywordNode("foo"), 1),
      `fo`,
      ParseStatus.incomplete,
      "",
      "",
      "",
    );
    testNodeParse(
      new Multiple(() => new KeywordNode("foo"), 1),
      `foo,foo`,
      ParseStatus.valid,
      "",
      ",foo",
      "",
    );
    testNodeParse(
      new Multiple(() => new KeywordNode("foo"), 1),
      `foofoo`,
      ParseStatus.invalid,
      "",
      "foofoo",
      "",
    );
  });
  test("CommaNode", () => {
    testNodeParse(new CommaNode(), ``, ParseStatus.empty, ``, "", "");
    testNodeParse(new CommaNode(), `,`, ParseStatus.valid, ``, "", ", ");
    testNodeParse(new CommaNode(), ` ,`, ParseStatus.valid, `,`, "", ", ");
    testNodeParse(new CommaNode(), `,    `, ParseStatus.valid, ``, "", ", ");
    testNodeParse(new CommaNode(), `.`, ParseStatus.invalid, ``, ".", "");
    testNodeParse(new CommaNode(), `,,`, ParseStatus.valid, `,`, ",", "");
  });
  test("CSV", () => {
    testNodeParse(
      new CSV(() => new PunctuationNode("a"), 0),
      `a,a,a`,
      ParseStatus.valid,
      `a,a,a`,
      "",
      "a, a, a",
    );
    testNodeParse(
      new CSV(() => new PunctuationNode("a"), 0),
      `a,`,
      ParseStatus.incomplete,
      `a,`,
      "",
      "a, ",
    );
    testNodeParse(new CSV(() => new PunctuationNode("a"), 0), `x`, ParseStatus.valid, ``, "x", "");
    testNodeParse(
      new CSV(() => new PunctuationNode("a"), 1),
      `x`,
      ParseStatus.invalid,
      ``,
      "x",
      "",
    );
    testNodeParse(
      new CSV(() => new PunctuationNode("a"), 0),
      `a,a,x`,
      ParseStatus.valid,
      `a,a`,
      ",x",
      "a, a",
    );
    testNodeParse(new CSV(() => new LitInt(), 0), ``, ParseStatus.valid, ``, "", "");
    testNodeParse(new CSV(() => new LitInt(), 1), ``, ParseStatus.empty, ``, "", "");
    testNodeParse(new CSV(() => new LitInt(), 0), `2`, ParseStatus.valid, `2`, "", "");
    testNodeParse(new CSV(() => new LitInt(), 1), `2`, ParseStatus.valid, `2`, "", "");
    testNodeParse(
      new CSV(() => new LitString(), 0),
      `"apple","orange", "pear"`,
      ParseStatus.valid,
      `"apple","orange", "pear"`,
      "",
      `"apple", "orange", "pear"`,
    );
    testNodeParse(
      new CSV(() => new IdentifierNode(), 0),
      `a,b,c`,
      ParseStatus.valid,
      `a,b,c`,
      "",
      "a, b, c",
    );
    testNodeParse(new CSV(() => new IdentifierNode(), 0), `1`, ParseStatus.valid, ``, "1", "");
    testNodeParse(new CSV(() => new IdentifierNode(), 1), `1`, ParseStatus.invalid, ``, "1", "");
    testNodeParse(new CSV(() => new IdentifierNode(), 0), `a,1`, ParseStatus.valid, `a`, ",1", "");
    testNodeParse(
      new CSV(() => new IdentifierNode(), 0),
      `a,b,1`,
      ParseStatus.valid,
      `a,b`,
      ",1",
      "",
    );
    testNodeParse(
      new CSV(() => new ExprNode(), 0),
      `a + b, c, 1`,
      ParseStatus.valid,
      `a + b, c, 1`,
      "",
      "",
    );
    testNodeParse(new CSV(() => new ExprNode(), 0), `)`, ParseStatus.valid, ``, ")", "");

    testNodeParse(new CSV(() => new KeywordNode("foo"), 0), `foo, foo`, ParseStatus.valid, "", "");
    testNodeParse(new CSV(() => new KeywordNode("foo"), 0), `foo`, ParseStatus.valid, "", "");
    testNodeParse(
      new CSV(() => new KeywordNode("foo"), 1),
      `fook`,
      ParseStatus.invalid,
      "",
      "fook",
    );
    testNodeParse(new CSV(() => new KeywordNode("foo"), 0), ``, ParseStatus.valid, "", "");
    testNodeParse(new CSV(() => new KeywordNode("foo"), 1), `fo`, ParseStatus.incomplete, "fo", "");
    testNodeParse(new CSV(() => new KeywordNode("foo"), 0), `fo`, ParseStatus.incomplete, "fo", "");
    testNodeParse(
      new CSV(() => new KeywordNode("foo"), 2),
      `foo, fo`,
      ParseStatus.incomplete,
      "foo, fo",
      "",
    );
    testNodeParse(
      new CSV(() => new KeywordNode("foo"), 2),
      `foo,`,
      ParseStatus.incomplete,
      "foo,",
      "",
    );
    testNodeParse(
      new CSV(() => new KeywordNode("foo"), 2),
      `foo, `,
      ParseStatus.incomplete,
      "foo, ",
      "",
    );
    testNodeParse(
      new CSV(() => new KeywordNode("foo"), 2),
      `foo,fo`,
      ParseStatus.incomplete,
      "foo,fo",
      "",
      "foo, fo",
    );

    testNodeParse(new CSV(() => new ExprNode(), 0), ``, ParseStatus.valid, "", "");
  });
  test("Instance", () => {
    testNodeParse(new InstanceNode(), ``, ParseStatus.empty, ``, "", "");
    testNodeParse(new InstanceNode(), `bar`, ParseStatus.valid, `bar`, "", "");
    testNodeParse(new InstanceNode(), `bar[foo]`, ParseStatus.valid, `bar[foo]`, "", "");
    //testNodeParse(new InstanceNode(), `bar[foo][0]`, ParseStatus.valid, `bar[foo][0]`, "", "");
  });

  test("Function Call", () => {
    testNodeParse(new MethodCallNode(), ``, ParseStatus.empty, ``, "", "");
    testNodeParse(new MethodCallNode(), `  `, ParseStatus.empty, ``, "", "");
    testNodeParse(
      new MethodCallNode(),
      `foo()`,
      ParseStatus.valid,
      `foo()`,
      "",
      "foo()",
      "<el-method>foo</el-method>()",
    );
    testNodeParse(
      new MethodCallNode(),
      `bar(x, 1, "hello")`,
      ParseStatus.valid,
      `bar(x, 1, "hello")`,
      "",
      "",
      "",
    );
    testNodeParse(new MethodCallNode(), `yon`, ParseStatus.incomplete, `yon`, "", "");
    testNodeParse(new MethodCallNode(), `yon `, ParseStatus.invalid, ``, "yon ", "");
    testNodeParse(new MethodCallNode(), `yon(`, ParseStatus.incomplete, `yon(`, "", "");
    testNodeParse(new MethodCallNode(), `yon(a`, ParseStatus.incomplete, `yon(a`, "", "");
    testNodeParse(new MethodCallNode(), `yon(a,`, ParseStatus.incomplete, `yon(a,`, "", "");
    testNodeParse(new MethodCallNode(), `Foo()`, ParseStatus.invalid, ``, "Foo()", "");
    testNodeParse(new MethodCallNode(), `foo[]`, ParseStatus.invalid, ``, "foo[]", "");
    testNodeParse(
      new MethodCallNode(),
      `foo(a)`,
      ParseStatus.valid,
      ``,
      "",
      "foo(a)",
      "<el-method>foo</el-method>(<el-id>a</el-id>)",
    );
    testNodeParse(new MethodCallNode(), `isBefore(b[0])`, ParseStatus.valid, ``, "", "");
  });
  test("Lists", () => {
    testNodeParse(new ListImmutableNode(() => new LitInt()), ``, ParseStatus.empty, ``, "", "");
    testNodeParse(
      new ListImmutableNode(() => new LitInt()),
      `{1, 2, 3, 4, 5}`,
      ParseStatus.valid,
      ``,
      "",
      "{1, 2, 3, 4, 5}",
      "",
    );
    testNodeParse(
      new ListImmutableNode(() => new LitInt()),
      `{}`,
      ParseStatus.invalid,
      ``,
      "{}",
      "",
    );
    testNodeParse(
      new ListImmutableNode(() => new LitInt()),
      `{`,
      ParseStatus.incomplete,
      `{`,
      "",
      "",
    );
    testNodeParse(
      new ListImmutableNode(() => new LitInt()),
      `{1,2,3.1}`,
      ParseStatus.invalid,
      ``,
      "{1,2,3.1}",
      "",
    );
    // list of list
    testNodeParse(
      new ListImmutableNode(() => new ListImmutableNode(() => new LitInt())),
      ``,
      ParseStatus.empty,
      ``,
      "",
      "",
    );
    testNodeParse(
      new ListImmutableNode(() => new ListImmutableNode(() => new LitInt())),
      `{{}, {}, {}}`,
      ParseStatus.invalid,
      ``,
      "{{}, {}, {}}",
      "",
    );
    testNodeParse(
      new ListImmutableNode(() => new ListImmutableNode(() => new LitInt())),
      `{{1,2}, {3,4}}`,
      ParseStatus.valid,
      ``,
      "",
      "{{1, 2}, {3, 4}}",
      "",
    );
    testNodeParse(
      new ListImmutableNode(() => new ListImmutableNode(() => new LitInt())),
      `{{1,2}, {3,4}`,
      ParseStatus.incomplete,
      `{{1,2}, {3,4}`,
      "",
      "",
    );
    testNodeParse(
      new ListImmutableNode(() => new ListImmutableNode(() => new LitInt())),
      `{{1,2, {}}`,
      ParseStatus.invalid,
      ``,
      `{{1,2, {}}`,
      "",
      "",
    );

    testNodeParse(
      new ListImmutableNode(() => new LitString()),
      `{"apple", "pear"}`,
      ParseStatus.valid,
      "",
      "",
      "",
      `{"<el-lit>apple</el-lit>", "<el-lit>pear</el-lit>"}`,
    );
  });
  test("List of expressions", () => {
    testNodeParse(
      new ListImmutableNode(() => new ExprNode()),
      `{a, 3 + 4, func(a, 3)- 1, new Foo()}`,
      ParseStatus.valid,
      "{a, 3 + 4, func(a, 3)- 1, new Foo()}",
      "",
      "",
    );
    testNodeParse(
      new ListImmutableNode(() => new ExprNode()),
      `{a, 3+ 4, foo(a, 3) - 1}`,
      ParseStatus.valid,
      "",
      "",
      "{a, 3 + 4, foo(a, 3) - 1}",
      "",
    );
  });
  test("TypeSimpleNode", () => {
    testNodeParse(
      new TypeNameNode(),
      `Foo`,
      ParseStatus.valid,
      "Foo",
      "",
      "",
      "<el-type>Foo</el-type>",
    );
    testNodeParse(new TypeNameNode(), `foo`, ParseStatus.invalid, "", "foo", "");
  });
  test("TypeSimpleOrGeneric", () => {
    testNodeParse(new TypeSimpleOrGeneric(), `Foo`, ParseStatus.valid, "Foo", "", "", "");
    testNodeParse(new TypeSimpleOrGeneric(), `foo`, ParseStatus.invalid, "", "foo", "");
    testNodeParse(new TypeSimpleOrGeneric(), `Foo<`, ParseStatus.incomplete, "Foo<", "", "");
    testNodeParse(new TypeSimpleOrGeneric(), `Foo<of`, ParseStatus.incomplete, "Foo<of", "", "");
    testNodeParse(
      new TypeSimpleOrGeneric(),
      `Foo<of Bar`,
      ParseStatus.incomplete,
      "Foo<of Bar",
      "",
      "",
    );
    testNodeParse(new TypeSimpleOrGeneric(), `Foo<ofBar`, ParseStatus.valid, "", "<ofBar", "");
    testNodeParse(
      new TypeSimpleOrGeneric(),
      `Foo<of Bar>`,
      ParseStatus.valid,
      "Foo<of Bar>",
      "",
      "",
      "<el-type>Foo</el-type>&lt;<el-kw>of</el-kw> <el-type>Bar</el-type>&gt;",
    );
    testNodeParse(
      new TypeSimpleOrGeneric(),
      `Foo<of ListImmutable<of Bar>>`,
      ParseStatus.valid,
      "Foo<of ListImmutable<of Bar>>",
      "",
      "",
      "<el-type>Foo</el-type>&lt;<el-kw>of</el-kw> <el-type>ListImmutable</el-type>&lt;<el-kw>of</el-kw> <el-type>Bar</el-type>&gt;&gt;",
    );
    testNodeParse(
      new TypeSimpleOrGeneric(),
      `Dictionary<of Bar, Yon>`,
      ParseStatus.valid,
      "Dictionary<of Bar, Yon>",
      "",
      "",
      "<el-type>Dictionary</el-type>&lt;<el-kw>of</el-kw> <el-type>Bar</el-type>, <el-type>Yon</el-type>&gt;",
    );
    testNodeParse(
      new TypeSimpleOrGeneric(),
      `ListImmutable<of (Bar, Yon)>`,
      ParseStatus.valid,
      "ListImmutable<of (Bar, Yon)>",
      "",
      "",
      "<el-type>ListImmutable</el-type>&lt;<el-kw>of</el-kw> (<el-type>Bar</el-type>, <el-type>Yon</el-type>)&gt;",
    );
  });
  test("TypeNode", () => {
    testNodeParse(
      new TypeNode(),
      `Foo<of ListImmutable<of Bar>>`,
      ParseStatus.valid,
      "Foo<of ListImmutable<of Bar>>",
      "",
      "",
    ); //Single
    testNodeParse(new TypeNode(), `(Foo, Bar)`, ParseStatus.valid, "(Foo, Bar)", "", "");
    testNodeParse(new TypeNode(), `(Foo)`, ParseStatus.invalid, "", "(Foo)", "");
    testNodeParse(
      new TypeNode(),
      `(Foo, Bar, Yon`,
      ParseStatus.incomplete,
      "(Foo, Bar, Yon",
      "",
      "",
    );
    testNodeParse(
      new TypeNode(),
      `(Foo, (Bar, Yon, Qux))`,
      ParseStatus.valid,
      "(Foo, (Bar, Yon, Qux))",
      "",
      "",
    );
    testNodeParse(
      new TypeNode(),
      `(Foo, Bar< of Yon>)`,
      ParseStatus.valid,
      "(Foo, Bar< of Yon>)",
      "",
      "",
    );
    testNodeParse(
      new TypeNode(),
      `Foo<of ListImmutable<of (Bar, Qux)>>`,
      ParseStatus.valid,
      "Foo<of ListImmutable<of (Bar, Qux)>>",
      "",
      "",
    );
  });
  test("TypeNode - Func", () => {
    testNodeParse(
      new TypeNode(),
      `Func<of Foo, Bar => Yon>`,
      ParseStatus.valid,
      "Func<of Foo, Bar => Yon>",
      "",
      "",
    ); //Single
  });
  test("TupleNode", () => {
    testNodeParse(new TupleNode(), `tuple(3,4)`, ParseStatus.valid, "", "", "");
    testNodeParse(
      new TupleNode(),
      `tuple(3,"a", "hello", 4.1, true)`,
      ParseStatus.valid,
      "",
      "",
      "",
    );
    testNodeParse(
      new TupleNode(),
      `tuple(tuple(3,4), tuple("a", true))`,
      ParseStatus.valid,
      "",
      "",
      "",
    );
    testNodeParse(
      new TupleNode(),
      `tuple(3,"a", "hello", 4.1, true`,
      ParseStatus.incomplete,
      "",
      "",
      "",
    );
    testNodeParse(
      new TupleNode(),
      `tuple(3,"a", "hello", 4.1,`,
      ParseStatus.incomplete,
      "",
      "",
      "",
    );
    testNodeParse(new TupleNode(), `tuple[3,4]`, ParseStatus.invalid, "", "tuple[3,4]", "");
    testNodeParse(new TupleNode(), `tuple(a,b)`, ParseStatus.valid, "tuple(a,b)", "", "");
    testNodeParse(new TupleNode(), `tuple(`, ParseStatus.incomplete, "tuple(", "", "");
    testNodeParse(new TupleNode(), `tuple(3`, ParseStatus.incomplete, "tuple(3", "", "");
    testNodeParse(new TupleNode(), `tuple(3)`, ParseStatus.invalid, "", "tuple(3)", "");
    testNodeParse(new TupleNode(), `tuple()`, ParseStatus.invalid, "", "tuple()", "");
    testNodeParse(
      new TupleNode(),
      `tuple("foo", 3)`,
      ParseStatus.valid,
      'tuple("foo", 3)',
      "",
      "",
      "",
    );
    testNodeParse(
      new TupleNode(),
      `tuple(foo, 3, bar(a), x)`,
      ParseStatus.valid,
      "tuple(foo, 3, bar(a), x)",
      "",
      "",
    );
    testNodeParse(new TupleNode(), `tuple(foo)`, ParseStatus.invalid, "", "tuple(foo)", "");
    testNodeParse(
      new TupleNode(),
      `tuple(foo, 3, bar(a), x`,
      ParseStatus.incomplete,
      "tuple(foo, 3, bar(a), x",
      "",
      "",
    );
    testNodeParse(
      new TupleNode(),
      `tuple(setAttemptIfGreen(a.attempt, a.target, x), setTargetIfGreen(a.attempt, a.target, x))`,
      ParseStatus.valid,
      "",
      "",
      "tuple(setAttemptIfGreen(a.attempt, a.target, x), setTargetIfGreen(a.attempt, a.target, x))",
    );
  });
  test("Lambda", () => {
    testNodeParse(
      new Lambda(),
      `lambda x as Int => x * x`,
      ParseStatus.valid,
      "lambda x as Int => x * x",
      "",
      "",
    );
    testNodeParse(new Lambda(), `lambda x`, ParseStatus.incomplete, "lambda x", "", "");
    testNodeParse(
      new Lambda(),
      `lambda x => x * x`,
      ParseStatus.invalid,
      "",
      "lambda x => x * x",
      "",
    );
    testNodeParse(
      new Lambda(),
      `lambda s as Int, p as ListImmutable<of Int> => s + p[0]`,
      ParseStatus.valid,
      "",
      "",
      "",
    );
    testNodeParse(
      new Lambda(),
      `lambda bestSoFar as String, newWord as String => betterOf(bestSoFar, newWord, possAnswers)`,
      ParseStatus.valid,
      "",
      "",
      "",
    );
    testNodeParse(
      new Lambda(),
      `lambda a as (String, String), x as Int => tuple(setAttemptIfGreen(a.attempt, a.target, x), setTargetIfGreen(a.attempt, a.target, x))`,
      ParseStatus.valid,
      "",
      "",
      "lambda a as (String, String), x as Int => tuple(setAttemptIfGreen(a.attempt, a.target, x), setTargetIfGreen(a.attempt, a.target, x))",
    );
  });
  test("IfExpr", () => {
    testNodeParse(
      new IfExpr(),
      `if cell then Colour.green else Colour.black)`,
      ParseStatus.valid,
      "",
      ")",
      "",
    );
    testNodeParse(new IfExpr(), `if cell then Colour.amber`, ParseStatus.incomplete, "", "", "");
    testNodeParse(
      new IfExpr(),
      `if attempt[n] is "*" then attempt else if attempt.isYellow(target, n) then attempt.setChar(n, "+") else attempt.setChar(n, "_")`,
      ParseStatus.valid,
      "",
      "",
      "",
    );
    testNodeParse(
      new IfExpr(),
      `if attempt.isAlreadyMarkedGreen(n) then target else if attempt.isYellow(target, n) then target.setChar(target.indexOf(attempt[n]), ".") else target`,
      ParseStatus.valid,
      "",
      "",
      "",
    );
    testNodeParse(
      new IfExpr(),
      `if score > 80 then "Distinction" else if score > 60 then "Merit" else if score > 40 then "Pass" else "Fail"`,
      ParseStatus.valid,
      "",
      "",
      "",
    );
  });
  test("ParamDefNode", () => {
    testNodeParse(
      new ParamDefNode(),
      `x as String`,
      ParseStatus.valid,
      "x as String",
      "",
      "x as String",
      "<el-id>x</el-id> <el-kw>as</el-kw> <el-type>String</el-type>",
    );
    testNodeParse(
      new ParamDefNode(),
      `out x as String`,
      ParseStatus.valid,
      "out x as String",
      "",
      "out x as String",
      "<el-kw>out</el-kw> <el-id>x</el-id> <el-kw>as</el-kw> <el-type>String</el-type>",
    );
    testNodeParse(
      new ParamDefNode(),
      `ref x as String`,
      ParseStatus.invalid,
      "",
      "ref x as String",
      "",
      "",
    );
    testNodeParse(
      new ParamDefNode(),
      `out as String`,
      ParseStatus.invalid,
      "",
      "out as String",
      "",
      "",
    );
    testNodeParse(new ParamDefNode(), `y asString`, ParseStatus.invalid, "", "y asString", "");
    testNodeParse(new ParamDefNode(), `z`, ParseStatus.incomplete, "z", "", "");
    testNodeParse(new ParamDefNode(), `w as`, ParseStatus.incomplete, "w as", "", "");
    testNodeParse(new ParamDefNode(), `A`, ParseStatus.invalid, "", "A", "");
    testNodeParse(new ParamDefNode(), `v String`, ParseStatus.invalid, "", "v String", "");
  });
  test("Param List", () => {
    testNodeParse(
      new CSV(() => new ParamDefNode(), 0),
      `A as string`,
      ParseStatus.valid,
      "",
      "A as string",
      "",
    ); //i.e. all leftover
    testNodeParse(new CSV(() => new ParamDefNode(), 0), ``, ParseStatus.valid, "", "", "");
    testNodeParse(
      new CSV(() => new ParamDefNode(), 0),
      `a as String`,
      ParseStatus.valid,
      "",
      "",
      "",
    );
    testNodeParse(
      new CSV(() => new ParamDefNode(), 0),
      `a as String, bb as Int, foo as Bar`,
      ParseStatus.valid,
      "",
      "",
      "",
    );
    testNodeParse(new CSV(() => new ParamDefNode(), 0), `a`, ParseStatus.incomplete, "a", "", "");
    testNodeParse(
      new CSV(() => new ParamDefNode(), 0),
      `a as String,`,
      ParseStatus.incomplete,
      "a as String,",
      "",
      "",
    );
    testNodeParse(
      new CSV(() => new ParamDefNode(), 0),
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
        () => new LitString(),
        () => new LitInt(),
      ),
      `"a":37`,
      ParseStatus.valid,
      "",
      "",
      "",
    );
    testNodeParse(
      new KVPnode(
        () => new LitString(),
        () => new LitInt(),
      ),
      `"a":`,
      ParseStatus.incomplete,
      "",
      "",
      "",
    );
    testNodeParse(
      new KVPnode(
        () => new LitString(),
        () => new LitInt(),
      ),
      `"a"`,
      ParseStatus.incomplete,
      "",
      "",
      "",
    );
    testNodeParse(
      new KVPnode(
        () => new LitString(),
        () => new LitInt(),
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
        () => new LitString(),
        () => new LitInt(),
      ),
      `["a":37]`,
      ParseStatus.valid,
      `["a":37]`,
      "",
      "",
    );
    testNodeParse(
      new DictionaryNode(
        () => new LitString(),
        () => new LitInt(),
      ),
      `["a":37, "b":42]`,
      ParseStatus.valid,
      "",
      "",
      "",
    );
    testNodeParse(
      new DictionaryNode(
        () => new LitString(),
        () => new LitInt(),
      ),
      `["a":37, "b":42`,
      ParseStatus.incomplete,
      "",
      "",
      "",
    );
    testNodeParse(
      new DictionaryNode(
        () => new LitString(),
        () => new LitInt(),
      ),
      `["a":37,`,
      ParseStatus.incomplete,
      "",
      "",
      "",
    );
    testNodeParse(
      new DictionaryNode(
        () => new LitString(),
        () => new LitInt(),
      ),
      `["a":37, 42:"b"]`,
      ParseStatus.invalid,
      "",
      `["a":37, 42:"b"]`,
      "",
    );
    testNodeParse(
      new DictionaryNode(
        () => new LitString(),
        () => new LitInt(),
      ),
      `["a":37, "b":42)`,
      ParseStatus.invalid,
      "",
      `["a":37, "b":42)`,
      "",
    );

    testNodeParse(
      new DictionaryNode(
        () => new LitValueNode(),
        () => new LitValueNode(),
      ),
      `["a":37, "b":42]`,
      ParseStatus.valid,
      "",
      "",
      "",
    );
    testNodeParse(
      new DictionaryNode(
        () => new LitValueNode(),
        () => new LitValueNode(),
      ),
      `["a":1.0, 5:"abc"]`,
      ParseStatus.valid,
      "",
      "",
      "",
    ); //But should fail type tests
  });
  test("DeconstructedTuple", () => {
    testNodeParse(new DeconstructedTuple(), `a, b`, ParseStatus.valid, "", "", "");
    testNodeParse(new DeconstructedTuple(), `a,b`, ParseStatus.valid, "", "", "");
    testNodeParse(new DeconstructedTuple(), `a,`, ParseStatus.incomplete, "", "", "");
    testNodeParse(new DeconstructedTuple(), `(a,b)`, ParseStatus.invalid, "", "(a,b)", "");
    testNodeParse(new DeconstructedTuple(), `3,4`, ParseStatus.invalid, "", "3,4", "");
    testNodeParse(
      new DeconstructedTuple(),
      `property.a, b`,
      ParseStatus.invalid,
      "",
      "property.a, b",
      "",
    );
  });
  test("Literal", () => {
    testNodeParse(new LitValueNode(), `"hello"`, ParseStatus.valid, "", "", "");
    testNodeParse(new LitValueNode(), `123`, ParseStatus.valid, "", "", "");
    testNodeParse(
      new ListImmutableNode(() => new ConstantValueNode()),
      `{"apple", "pear"}`,
      ParseStatus.valid,
      "",
      "",
      "",
      `{"<el-lit>apple</el-lit>", "<el-lit>pear</el-lit>"}`,
    );
    testNodeParse(
      new ListImmutableNode(() => new ConstantValueNode()),
      `{4, 5, 2, 3}`,
      ParseStatus.valid,
      "",
      "",
      "",
      `{<el-lit>4</el-lit>, <el-lit>5</el-lit>, <el-lit>2</el-lit>, <el-lit>3</el-lit>}`,
    );
  });
  test("DeconstructedList", () => {
    testNodeParse(new DeconstructedList(), `a:b`, ParseStatus.valid, "", "", "");
    testNodeParse(new DeconstructedList(), `a:`, ParseStatus.incomplete, "", "", "");
    testNodeParse(new DeconstructedList(), `[a,b]`, ParseStatus.invalid, "", "[a,b]", "");
    testNodeParse(new DeconstructedList(), `[a:3]`, ParseStatus.invalid, "", "[a:3]", "");
    testNodeParse(new DeconstructedList(), `(a:b)`, ParseStatus.invalid, "", "(a:b)", "");
  });
  test("SpaceNode", () => {
    testNodeParse(new SpaceNode(Space.ignored), ``, ParseStatus.valid, "", "", "", "");
    testNodeParse(new SpaceNode(Space.ignored), ` `, ParseStatus.valid, "", "", "", "");
    testNodeParse(new SpaceNode(Space.ignored), `  `, ParseStatus.valid, "", "", "", "");
    testNodeParse(new SpaceNode(Space.added), ``, ParseStatus.valid, "", "", " ", " ");
    testNodeParse(new SpaceNode(Space.added), ` `, ParseStatus.valid, "", "", " ", " ");
    testNodeParse(new SpaceNode(Space.added), `  `, ParseStatus.valid, "", "", " ", " ");
    testNodeParse(new SpaceNode(Space.required), ``, ParseStatus.empty, "", "", "", "");
    testNodeParse(new SpaceNode(Space.required), ` `, ParseStatus.valid, "", "", " ", " ");
    testNodeParse(new SpaceNode(Space.required), `  `, ParseStatus.valid, "", "", " ", " ");
  });
  test("New Instance", () => {
    testNodeParse(new NewInstance(), ``, ParseStatus.empty, "", "", "", "");
    testNodeParse(new NewInstance(), `new Foo()`, ParseStatus.valid, "", "", "new Foo()", "");
    testNodeParse(new NewInstance(), `newFoo()`, ParseStatus.invalid, "", "newFoo()", "", "");
    testNodeParse(
      new NewInstance(),
      "new List<of String>()",
      ParseStatus.valid,
      "new List<of String>()",
      "",
    );
  });
  test("String Interpolation", () => {
    testNodeParse(new LitStringInterpolation(), ``, ParseStatus.empty, "", "", "", "");
    testNodeParse(
      new LitStringInterpolation(),
      "{x + 1}",
      ParseStatus.valid,
      "{x + 1}",
      "",
      "",
      "",
    );
    testNodeParse(new LitStringInterpolation(), "{x", ParseStatus.incomplete, "{x", "", "", "");
    testNodeParse(new LitStringInterpolation(), "{}", ParseStatus.invalid, "", "{}", "", "");
  });
  test("LitString", () => {
    testNodeParse(new LitString(), `""`, ParseStatus.valid, `""`, "", "", `""`);
    testNodeParse(
      new LitString(),
      `"abc"`,
      ParseStatus.valid,
      `"abc"`,
      "",
      "",
      `"<el-lit>abc</el-lit>"`,
    );
    testNodeParse(
      new LitString(),
      `"abc def"`,
      ParseStatus.valid,
      `"abc def"`,
      "",
      "",
      `"<el-lit>abc def</el-lit>"`,
    );
    testNodeParse(new LitString(), `"abc`, ParseStatus.incomplete, `"abc`, "", "", "");
    testNodeParse(new LitString(), `"`, ParseStatus.incomplete, `"`, "", "", "");
    testNodeParse(new LitString(), `abc`, ParseStatus.invalid, "", "abc", "", "");
    testNodeParse(new LitString(), `'abc'`, ParseStatus.invalid, "", "'abc'", "", "");
    //Test embedded html
    testNodeParse(
      new LitStringNonEmpty(),
      `"<p>abc</p>"`,
      ParseStatus.valid,
      `"<p>abc</p>"`,
      "",
      `"<p>abc</p>"`,
      `"<el-lit>&lt;p&gt;abc&lt;/p&gt;</el-lit>"`,
    );
    testNodeParse(
      new LitStringNonEmpty(),
      `"&#123;curly braces&#125;"`,
      ParseStatus.valid,
      `"&#123;curly braces&#125;"`,
      "",
      `"&#123;curly braces&#125;"`,
      `"<el-lit>&amp;#123;curly braces&amp;#125;</el-lit>"`,
    );
  });
  test("Interpolated strings", () => {
    const field = () => new LitStringInterpolation();
    const plainText = () => new RegExMatchNode(Regexes.nonEmptyStringContent);
    const segment = () => new Alternatives([field, plainText]);
    testNodeParse(segment(), `abc`, ParseStatus.valid, "abc", "");
    testNodeParse(segment(), `{x}`, ParseStatus.valid, "{x}", "");
    testNodeParse(segment(), `"`, ParseStatus.invalid, "", `"`);

    testNodeParse(new LitString(), `"{x}{y}"`, ParseStatus.valid, "", "");
    testNodeParse(new LitString(), `"{a} times {b} equals{c}"`, ParseStatus.valid, "", "");
  });
  test("Bug #290", () => {
    testNodeParse(new LitInt(), `3`, ParseStatus.valid, "3", "");
    testNodeParse(new LitInt(), `3 `, ParseStatus.valid, "3", " ");

    testNodeParse(new LitValueNode(), `3 `, ParseStatus.valid, "3", " ");
    testNodeParse(new BinaryExpression(), `3 `, ParseStatus.incomplete, "3 ", "", "3 ");

    testNodeParse(new ExprNode(), `3 `, ParseStatus.incomplete, "3 ", "", "3 ");
  });

  test("ProcRefCompound", () => {
    testNodeParse(new InstanceProcRef(), `bar.foo`, ParseStatus.valid, "", "");
    testNodeParse(new InstanceProcRef(), `bar.`, ParseStatus.incomplete, "", "");
    testNodeParse(new InstanceProcRef(), `bar.foo.yon`, ParseStatus.valid, "", ".yon");
    testNodeParse(new InstanceProcRef(), `bar.foo[2]`, ParseStatus.valid, "", "[2]");
    testNodeParse(new InstanceProcRef(), `bar`, ParseStatus.incomplete, "", "");
    testNodeParse(new InstanceProcRef(), `global.bar`, ParseStatus.valid, "", "");
    testNodeParse(new InstanceProcRef(), `library.bar`, ParseStatus.valid, "", "");
    testNodeParse(new InstanceProcRef(), `x[3].bar`, ParseStatus.valid, "", "");
  });
  // test("#339 call dot function on a literal", () => {
  //   testNodeParse(new MethodCallNode(), `length(bar)`, ParseStatus.valid, "", "");
  //   testNodeParse(new MethodCallNode(), `bar.length()`, ParseStatus.valid, "", "");
  //   testNodeParse(new MethodCallNode(), `bar.asList()`, ParseStatus.valid, "", "");
  //   testNodeParse(new LiteralNode(), `{1,2,3,4,5}`, ParseStatus.valid, "", "");
  //   testNodeParse(new MethodCallNode(), `{1,2,3,4,5}.asList()`, ParseStatus.valid, "", "");
  //   testNodeParse(new MethodCallNode(), `"Hello World".length()`, ParseStatus.valid, "", "");
  //   testNodeParse(new MethodCallNode(), `12.3.asString()`, ParseStatus.valid, "", "");
  //   testNodeParse(new MethodCallNode(), `bar.`, ParseStatus.incomplete, "", "");
  //   testNodeParse(new MethodCallNode(), `bar`, ParseStatus.incomplete, "", "");
  // });

  test("#670 new parse node structure for terms & expressions", () => {
    testNodeParse(new TermSimple(), `abc`, ParseStatus.valid, "abc", "");
    testNodeParse(new TermSimple(), `abc()`, ParseStatus.valid, "abc()", "");
    testNodeParse(new TermSimple(), `this`, ParseStatus.valid, "this", "");
    testNodeParse(new TermSimple(), `abc(def, ghi)`, ParseStatus.valid, "abc(def, ghi)", "");
    testNodeParse(new TermSimpleWithOptIndex(), `abc[1]`, ParseStatus.valid, "abc[1]", "");
    testNodeParse(new TermSimpleWithOptIndex(), `abc[1][2]`, ParseStatus.valid, "abc[1]", "[2]");
    testNodeParse(new TermSimpleWithOptIndex(), `abc[1..2]`, ParseStatus.valid, "abc[1..2]", "");
    testNodeParse(new TermSimpleWithOptIndex(), `abc[1, 2]`, ParseStatus.valid, "abc[1, 2]", "");
    testNodeParse(
      new TermSimpleWithOptIndex(),
      `abc(def, ghi)[0]`,
      ParseStatus.valid,
      "abc(def, ghi)[0]",
      "",
    );
    testNodeParse(new ExprNode(), `tuple(def, ghi)`, ParseStatus.valid, "tuple(def, ghi)", ""); // tuple
    testNodeParse(new TermSimple(), `[def, ghi]`, ParseStatus.valid, "[def, ghi]", "");
    testNodeParse(
      new TermSimple(),
      `{def:true, ghi: false}`,
      ParseStatus.valid,
      "{def:true, ghi: false}",
      "",
    );
    testNodeParse(new TermSimple(), `345`, ParseStatus.valid, "345", "");
    testNodeParse(new TermSimple(), `-345`, ParseStatus.valid, "-345", "");
    testNodeParse(new TermSimple(), `not a`, ParseStatus.valid, "not a", "");
    testNodeParse(new TermSimple(), `(3 + a)`, ParseStatus.valid, "(3 + a)", "");
    testNodeParse(new Qualifier(), `property`, ParseStatus.valid, `property`, "");
    testNodeParse(new PunctuationNode(DOT), `.`, ParseStatus.valid, `.`, "");
    testNodeParse(new ReferenceNode(), `a`, ParseStatus.valid, `a`, "");
    testNodeParse(new DottedTerm(), `.a`, ParseStatus.valid, `.a`, "");
    testNodeParse(new DotAfter(new ReferenceNode()), `.a`, ParseStatus.invalid, ``, ".a");
    testNodeParse(new TermChained(), `property.a`, ParseStatus.valid, `property.a`, "");
    testNodeParse(
      new TermChained(),
      `a[1].b()[1..2].c(d)[e][f]`,
      ParseStatus.valid,
      `a[1].b()[1..2].c(d)[e][f]`,
      "",
    );
    testNodeParse(
      new TermChained(),
      `property.a[1].b().c(d)[e]`,
      ParseStatus.valid,
      `property.a[1].b().c(d)[e]`,
      "",
    );
    testNodeParse(
      new TermChained(),
      `this.a.b()`,
      ParseStatus.valid,
      `this.a.b()`,
      "",
      "this.a.b()",
      "<el-kw>this</el-kw>.<el-id>a</el-id>.<el-method>b</el-method>()",
    );
    testNodeParse(
      new ExprNode(),
      `a[1].b()[1..2].c(d).e.f[g]`,
      ParseStatus.valid,
      `a[1].b()[1..2].c(d).e.f[g]`,
      "",
    );
    testNodeParse(
      new ExprNode(),
      `property.a[1].b().c(d)[e]`,
      ParseStatus.valid,
      `property.a[1].b().c(d)[e]`,
      "",
    );
    testNodeParse(new ExprNode(), `ref foo`, ParseStatus.valid, `ref foo`, "");
    testNodeParse(new ExprNode(), `ref `, ParseStatus.incomplete, `ref `, "");
  });
  test("OperatorAmbiguity#728", () => {
    //Test operations
    testNodeParse(new BinaryOperation(), ``, ParseStatus.empty, "", "", "", "");
    testNodeParse(new BinaryOperation(), ` `, ParseStatus.incomplete, " ", "", " ", " ");
    testNodeParse(new BinaryOperation(), `+`, ParseStatus.valid, "+", "", " + ", " + ");
    testNodeParse(new BinaryOperation(), ` +`, ParseStatus.valid, " +", "", " + ", " + ");
    testNodeParse(new BinaryOperation(), ` + `, ParseStatus.valid, " + ", "", " + ", " + ");
    testNodeParse(new BinaryOperation(), `*`, ParseStatus.valid, "*", "", "*", "*");
    testNodeParse(new BinaryOperation(), ` *`, ParseStatus.valid, " *", "", "*", "*");
    testNodeParse(new BinaryOperation(), ` * `, ParseStatus.valid, " * ", "", "*", "*");
    testNodeParse(new BinaryOperation(), `>=`, ParseStatus.valid, ">=", "", " >= ", " >= ");
    testNodeParse(new BinaryOperation(), ` >=`, ParseStatus.valid, " >=", "", " >= ", " >= ");
    testNodeParse(new BinaryOperation(), ` >= `, ParseStatus.valid, " >= ", "", " >= ", " >= ");
    testNodeParse(new BinaryOperation(), `>`, ParseStatus.incomplete, ">", "", ">", ">");
    testNodeParse(new BinaryOperation(), ` >`, ParseStatus.incomplete, " >", "", " >", " >");
    testNodeParse(new BinaryOperation(), `> `, ParseStatus.valid, "> ", "", " > ", " > ");
    testNodeParse(new BinaryOperation(), ` > `, ParseStatus.valid, " > ", "", " > ", " > ");
    testNodeParse(new BinaryOperation(), `is`, ParseStatus.incomplete, "is", "", "is", "is");
    testNodeParse(
      new BinaryOperation(),
      `is `,
      ParseStatus.valid,
      "is ",
      "",
      " is ",
      "<el-kw> is </el-kw>",
    );
    testNodeParse(new BinaryOperation(), `isn`, ParseStatus.incomplete, "isn", "", "isn", "isn");
    testNodeParse(
      new BinaryOperation(),
      `isnt`,
      ParseStatus.valid,
      "isnt",
      "",
      " isnt ",
      "<el-kw> isnt </el-kw>",
    );
    testNodeParse(
      new BinaryOperation(),
      ` and `,
      ParseStatus.valid,
      " and ",
      "",
      " and ",
      "<el-kw> and </el-kw>",
    );
    testNodeParse(
      new BinaryOperation(),
      `and`,
      ParseStatus.valid,
      "and",
      "",
      " and ",
      "<el-kw> and </el-kw>",
    );
    testNodeParse(
      new BinaryOperation(),
      `anda`,
      ParseStatus.valid,
      "and",
      "a",
      " and ",
      "<el-kw> and </el-kw>",
    );

    testNodeParse(new BinaryOperation(), `an`, ParseStatus.incomplete, "an", "", "an", "an");
    testNodeParse(new BinaryOperation(), `not`, ParseStatus.invalid, "", "not", "", "");

    //test expressions
    testNodeParse(
      new BinaryExpression(),
      `"a"+  "b"`,
      ParseStatus.valid,
      `"a"+  "b"`,
      "",
      `"a" + "b"`,
    );
    testNodeParse(
      new BinaryExpression(),
      `3+`,
      ParseStatus.incomplete,
      "3+",
      "",
      "3 + ",
      "<el-lit>3</el-lit> + ",
    );
    testNodeParse(
      new BinaryExpression(),
      `3 +`,
      ParseStatus.incomplete,
      "3 +",
      "",
      "3 + ",
      "<el-lit>3</el-lit> + ",
    );
    testNodeParse(
      new BinaryExpression(),
      `3 `,
      ParseStatus.incomplete,
      "3 ",
      "",
      "3 ",
      "<el-lit>3</el-lit> ",
    );
    testNodeParse(
      new BinaryExpression(),
      `3+4`,
      ParseStatus.valid,
      "3+4",
      "",
      "3 + 4",
      "<el-lit>3</el-lit> + <el-lit>4</el-lit>",
    );
    testNodeParse(
      new BinaryExpression(),
      `3>=4`,
      ParseStatus.valid,
      "3>=4",
      "",
      "3 >= 4",
      "<el-lit>3</el-lit> >= <el-lit>4</el-lit>",
    );
    testNodeParse(new BinaryExpression(), `3>`, ParseStatus.incomplete, "3>", "", "3>");
    testNodeParse(new BinaryExpression(), `3> `, ParseStatus.incomplete, "3> ", "", "3 > ");
    testNodeParse(new BinaryExpression(), `3> 4`, ParseStatus.valid, "3> 4", "", "3 > 4");
    testNodeParse(new BinaryExpression(), `3>4`, ParseStatus.valid, "3>4", "", "3 > 4");
    testNodeParse(new BinaryExpression(), `3 > 4`, ParseStatus.valid, "3 > 4", "", "3 > 4");
    testNodeParse(new BinaryExpression(), `3>=`, ParseStatus.incomplete, "3>=", "", "3 >= ");
    testNodeParse(new BinaryExpression(), `3>=4`, ParseStatus.valid, "3>=4", "", "3 >= 4");
    testNodeParse(
      new BinaryExpression(),
      `3 is 4`,
      ParseStatus.valid,
      "3 is 4",
      "",
      "3 is 4",
      "<el-lit>3</el-lit><el-kw> is </el-kw><el-lit>4</el-lit>",
    );
    testNodeParse(
      new BinaryExpression(),
      `11 div 3`,
      ParseStatus.valid,
      "11 div 3",
      "",
      "11 div 3",
    );
  });
  test("RevisedParseMethodForAbstractSequence#857", () => {
    testActiveNodeAndDone(new test_seq1(), `foo 45`, ParseStatus.valid, LitInt.name, false);
    testActiveNodeAndDone(new test_seq1(), `foo `, ParseStatus.incomplete, LitInt.name, false);
    testActiveNodeAndDone(new test_seq1(), `foo`, ParseStatus.incomplete, SpaceNode.name, false);
    testActiveNodeAndDone(new test_seq2(), `3.1 end`, ParseStatus.valid, KeywordNode.name, true);
    testActiveNodeAndDone(
      new test_seq2(),
      `3.1 en`,
      ParseStatus.incomplete,
      KeywordNode.name,
      false,
    );
    testActiveNodeAndDone(new LitFloat(), `3.`, ParseStatus.incomplete, RegExMatchNode.name, false);
    testActiveNodeAndDone(new LitFloat(), `3.1`, ParseStatus.valid, RegExMatchNode.name, false);
    testActiveNodeAndDone(
      new test_seq2(),
      `3.1`,
      ParseStatus.incomplete,
      RegExMatchNode.name, //for exponent. Should technically still be the RegexMatchNode for fractional part
      // since it could be extended. But unimportand as there is no symbol completion for any literal
      false,
    );
    testActiveNodeAndDone(
      new CSV(() => new LitInt(), 2),
      `12,34`,
      ParseStatus.valid,
      LitInt.name,
      false,
    );
    testActiveNodeAndDone(
      new CSV(() => new LitInt(), 1),
      `12`,
      ParseStatus.valid,
      LitInt.name,
      false,
    );
    testActiveNodeAndDone(
      new CSV(() => new LitInt(), 1),
      `12,`,
      ParseStatus.incomplete,
      LitInt.name,
      false,
    );
  });
  test("LitRegExp", () => {
    testNodeParse(
      new LitRegExp(),
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
      new LitRegExp(),
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
      new LitRegExp(),
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
      new ExprNode(),
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
      new ExprNode(),
      `{{0.0,0.0,0.0,0.16,0.0,0.0,0.01},{0.85,0.04,-0.04,0.85,0.0,1.60,0.85},{0.20,-0.26,0.23,0.22,0.0,1.60,0.07},{-0.15,0.28,0.26,0.24,0.0,0.44,0.07}}`,
      ParseStatus.valid,
      `{{0.0,0.0,0.0,0.16,0.0,0.0,0.01},{0.85,0.04,-0.04,0.85,0.0,1.60,0.85},{0.20,-0.26,0.23,0.22,0.0,1.60,0.07},{-0.15,0.28,0.26,0.24,0.0,0.44,0.07}}`,
      "",
    );
  });
  test("Parse list of floats 2", () => {
    testNodeParse(new ExprNode(), `{0.0}`, ParseStatus.valid, `{0.0}`, "");
  });
  test("Six open brackets", () => {
    testNodeParse(new ExprNode(), `((((((3))))))`, ParseStatus.valid, `((((((3))))))`, "");
  });
  test("Image", () => {
    testNodeParse(
      new RegExMatchNode(Regexes.url),
      "http://website.com/images/image1.png",
      ParseStatus.valid,
      "http://website.com/images/image1.png",
      "",
      "",
      "",
    );
    testNodeParse(
      new ImageNode(),
      "image http://website.com/images/image1.png",
      ParseStatus.valid,
      "image http://website.com/images/image1.png",
      "",
      "image http://website.com/images/image1.png",
      `<img src="http://website.com/images/image1.png">`,
    );
    testNodeParse(
      new ImageNode(),
      "image http://website.com/images/image1.png with height set to 10, width set to 20",
      ParseStatus.valid,
      "image http://website.com/images/image1.png with height set to 10, width set to 20",
      "",
      "image http://website.com/images/image1.png with height set to 10, width set to 20",
      `<img src="http://website.com/images/image1.png">`,
    );
  });
});

class test_seq1 extends AbstractSequence {
  parseText(text: string): void {
    this.addElement(new KeywordNode("foo"));
    this.addElement(new SpaceNode(Space.required));
    this.addElement(new LitInt());
    super.parseText(text);
  }
}

class test_seq2 extends AbstractSequence {
  parseText(text: string): void {
    this.addElement(new LitFloat());
    this.addElement(new SpaceNode(Space.required));
    this.addElement(new KeywordNode("end"));
    super.parseText(text);
  }
}
