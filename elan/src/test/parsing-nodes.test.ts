import * as vscode from "vscode";
import { ExprNode } from "../frames/parse-nodes/expr-node";
import { ParseStatus } from "../frames/status-enums";
import { testNodeParse } from "./testHelpers";
import { LitBoolean } from "../frames/parse-nodes/lit-boolean";
import { LitInt } from "../frames/parse-nodes/lit-int";
import { LitFloat } from "../frames/parse-nodes/lit-float";
import { BinaryOperation } from "../frames/parse-nodes/binary-operation";
import { UnaryExpression } from "../frames/parse-nodes/unary-expression";
import { BracketedExpression } from "../frames/parse-nodes/bracketed-expression";
import { OptionalNode } from "../frames/parse-nodes/optional-node";
import { LitString } from "../frames/parse-nodes/lit-string";
import { ImmutableListNode } from "../frames/parse-nodes/immutable-list-node";
import { Multiple } from "../frames/parse-nodes/multiple";
import { CSV } from "../frames/parse-nodes/csv";
import { IdentifierNode } from "../frames/parse-nodes/identifier-node";
import { FunctionCallNode } from "../frames/parse-nodes/function-call-node";
import { KeywordNode } from "../frames/parse-nodes/keyword-node";
import { TypeNode } from "../frames/parse-nodes/type-node";
import { TypeSimpleOrGeneric } from "../frames/parse-nodes/type-simple-or-generic";
import { TypeSimple } from "../frames/parse-nodes/type-simple";
import { TupleNode } from "../frames/parse-nodes/tuple-node";
import { Lambda } from "../frames/parse-nodes/lambda";
import { IfExpr } from "../frames/parse-nodes/if-expr";
import { ParamDefNode } from "../frames/parse-nodes/param-def-node";
import { Term } from "../frames/parse-nodes/term";
import { KVPnode } from "../frames/parse-nodes/kvp-node";
import { DictionaryNode } from "../frames/parse-nodes/dictionary-node";
import { LitValueNode } from "../frames/parse-nodes/lit-value";
import { LiteralNode } from "../frames/parse-nodes/literal-node";
import { LitTuple } from "../frames/parse-nodes/lit-tuple";
import { VarRefNode } from "../frames/parse-nodes/var-ref-node";
import { DeconstructedTuple } from "../frames/parse-nodes/deconstructed-tuple";
import { DeconstructedList } from "../frames/parse-nodes/deconstructed-list";
import { abstractKeyword } from "../frames/keywords";
import { SpaceNode } from "../frames/parse-nodes/space-node";
import { Space } from "../frames/parse-nodes/parse-node-helpers";
import { CommaNode } from "../frames/parse-nodes/comma-node";
import { SetClause } from "../frames/parse-nodes/set-clause";
import { WithClause } from "../frames/parse-nodes/with-clause";
import { NewInstance } from "../frames/parse-nodes/new-instance";
import { InstanceNode } from "../frames/parse-nodes/instanceNode";
import { StringInterpolation } from "../frames/parse-nodes/string-interpolation";
import { Regexes } from "../frames/fields/regexes";
import { Alternatives } from "../frames/parse-nodes/alternatives";
import { RegExMatchNode } from "../frames/parse-nodes/regex-match-node";
import { BinaryExpression } from "../frames/parse-nodes/binary-expression";
import { InstanceProcRef } from "../frames/parse-nodes/instanceProcRef";
import { IndexNode } from "../frames/parse-nodes/index-node";

suite("Parsing Nodes", () => {
  vscode.window.showInformationMessage("Start all unit tests.");
  test("UnaryExpression", () => {
    testNodeParse(new UnaryExpression(), "", ParseStatus.empty, "", "", "", "");
    testNodeParse(
      new UnaryExpression(),
      "-3",
      ParseStatus.valid,
      "-3",
      "",
      "-3",
      "",
    );
    testNodeParse(
      new UnaryExpression(),
      " not foo",
      ParseStatus.valid,
      " not foo",
      "",
      "not foo",
      "",
    );
    testNodeParse(
      new UnaryExpression(),
      "-",
      ParseStatus.incomplete,
      "-",
      "",
      "-",
      "",
    );
    testNodeParse(
      new UnaryExpression(),
      "+4",
      ParseStatus.invalid,
      "",
      "+4",
      "",
      "",
    );
  });
  test("BinOp", () => {
    testNodeParse(new BinaryOperation(), "", ParseStatus.empty, "", "", "");
    testNodeParse(new BinaryOperation(), "  ", ParseStatus.empty, "", "", "");
    testNodeParse(
      new BinaryOperation(),
      "+",
      ParseStatus.valid,
      "+",
      "",
      "+",
      "",
    );
    testNodeParse(
      new BinaryOperation(),
      "-",
      ParseStatus.valid,
      "-",
      "",
      "-",
      "",
    );
    testNodeParse(
      new BinaryOperation(),
      "*",
      ParseStatus.valid,
      "*",
      "",
      "*",
      "",
    );
    testNodeParse(
      new BinaryOperation(),
      "/",
      ParseStatus.valid,
      "/",
      "",
      "/",
      "",
    );
    testNodeParse(
      new BinaryOperation(),
      ">",
      ParseStatus.valid,
      ">",
      "",
      ">",
      "",
    );
    testNodeParse(
      new BinaryOperation(),
      "<",
      ParseStatus.valid,
      "<",
      "",
      "<",
      "",
    );
    testNodeParse(
      new BinaryOperation(),
      ">=",
      ParseStatus.valid,
      ">=",
      "",
      ">=",
      "",
    );
    testNodeParse(
      new BinaryOperation(),
      "<=",
      ParseStatus.valid,
      "<=",
      "",
      "<=",
      "",
    );
    testNodeParse(
      new BinaryOperation(),
      "< =",
      ParseStatus.valid,
      "<",
      " =",
      "<",
      "",
    );

    testNodeParse(
      new BinaryOperation(),
      "is",
      ParseStatus.valid,
      "is",
      "",
      "is",
      "",
    );
    testNodeParse(
      new BinaryOperation(),
      "is not",
      ParseStatus.valid,
      "is not",
      "",
      "is not",
      "",
    );
    testNodeParse(
      new BinaryOperation(),
      "and",
      ParseStatus.valid,
      "and",
      "",
      "and",
      "",
    );
    testNodeParse(
      new BinaryOperation(),
      "or",
      ParseStatus.valid,
      "or",
      "",
      "or",
      "",
    );
    testNodeParse(new BinaryOperation(), "%", ParseStatus.invalid, "", "%", "");
  });
  test("IndexableTerm", () => {
    testNodeParse(new Term(), "a", ParseStatus.valid, "a", "", "a", "");
  });
  test("Term", () => {
    testNodeParse(
      new Term(),
      "new ArrayList<of String>(3)",
      ParseStatus.valid,
      "new ArrayList<of String>(3)",
      "",
    );
    testNodeParse(new Term(), "", ParseStatus.empty, "", "", "");
    testNodeParse(new Term(), "a", ParseStatus.valid, "a", "", "a", "");
  });
  test("Expression", () => {
    testNodeParse(new ExprNode(), "", ParseStatus.empty, "", "", "");
    testNodeParse(new ExprNode(), "", ParseStatus.empty, "", "", "");
    testNodeParse(new ExprNode(), "a", ParseStatus.valid, "a", "", "a", "");
    testNodeParse(
      new ExprNode(),
      "a + b",
      ParseStatus.valid,
      "a + b",
      "",
      "a + b",
      "",
    );
    testNodeParse(
      new ExprNode(),
      "a * -b",
      ParseStatus.valid,
      "a * -b",
      "",
      "a*-b",
      "",
    );
    testNodeParse(
      new ExprNode(),
      "a + b- c",
      ParseStatus.valid,
      "",
      "",
      "a + b - c",
      "",
    );
    testNodeParse(new ExprNode(), "+", ParseStatus.invalid, "", "+", "");
    testNodeParse(new ExprNode(), "+b", ParseStatus.invalid, "", "+b", "");
    testNodeParse(
      new ExprNode(),
      "a +",
      ParseStatus.incomplete,
      "a +",
      "",
      "a + ",
    );
    testNodeParse(new ExprNode(), "a %", ParseStatus.valid, "a", " %", "a");
    testNodeParse(
      new ExprNode(),
      "3 * 4 + x",
      ParseStatus.valid,
      "3 * 4 + x",
      "",
      "3*4 + x",
      "",
    );
    testNodeParse(
      new ExprNode(),
      "3* foo(5)",
      ParseStatus.valid,
      "",
      "",
      "3*foo(5)",
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
      "reduce(0.0, lambda s as String, p as ImmutableList<of String> => s + p.first() * p.first())",
      ParseStatus.valid,
      "reduce(0.0, lambda s as String, p as ImmutableList<of String> => s + p.first() * p.first())",
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
      "this", // Not now detected or rejected as a keyword by the parse node - that is down to compilation
    );
    testNodeParse(
      new ExprNode(),
      "default String",
      ParseStatus.valid,
      "default String",
      "",
      "",
      "<keyword>default</keyword> <type>String</type>",
    );
    testNodeParse(
      new ExprNode(),
      "default Lit<of Int>",
      ParseStatus.valid,
      "",
      "",
      "",
      "",
    );
    testNodeParse(
      new ExprNode(),
      "lambda a as (String, String), x as Int => (setAttemptIfGreen(a.attempt, a.target, x), setTargetIfGreen(a.attempt, a.target, x))",
      ParseStatus.valid,
      "lambda a as (String, String), x as Int => (setAttemptIfGreen(a.attempt, a.target, x), setTargetIfGreen(a.attempt, a.target, x))",
      "",
      "lambda a as (String, String), x as Int => (setAttemptIfGreen(a.attempt, a.target, x), setTargetIfGreen(a.attempt, a.target, x))",
      "",
    );
  });
  test("Set Clause", () => {
    testNodeParse(
      new SetClause(),
      "x set to p.x + 3",
      ParseStatus.valid,
      "",
      "",
      "",
      "",
    );
    testNodeParse(
      new SetClause(),
      "y set to p.y - 1",
      ParseStatus.valid,
      "",
      "",
      "",
      "",
    );
    testNodeParse(
      new SetClause(),
      "y setto p.y - 1",
      ParseStatus.invalid,
      "",
      "y setto p.y - 1",
      "",
      "",
    );
    testNodeParse(
      new SetClause(),
      "yset to p.y - 1",
      ParseStatus.invalid,
      "",
      "yset to p.y - 1",
      "",
      "",
    );
    testNodeParse(
      new SetClause(),
      "x set top.x + 3",
      ParseStatus.invalid,
      "",
      "x set top.x + 3",
      "",
      "",
    );
  });
  test("ImmutableList of set clauses", () => {
    testNodeParse(
      new ImmutableListNode(() => new SetClause()),
      "{x set to p.x + 3, y set to p.y - 1}",
      ParseStatus.valid,
      "",
      "",
      "",
      "",
    );
  });
  test("with clause", () => {
    testNodeParse(
      new WithClause(),
      " with {x set to p.x + 3, y set to p.y - 1}",
      ParseStatus.valid,
      "",
      "",
      "",
      "",
    );
    testNodeParse(
      new WithClause(),
      "with {x set to p.x + 3, y set to p.y - 1}",
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
      "p with {x set to p.x + 3, y set to p.y - 1}",
      ParseStatus.valid,
      "",
      "",
      "",
      "",
    );
    testNodeParse(
      new ExprNode(),
      "pwith {x set to p.x + 3, y set to p.y - 1}",
      ParseStatus.valid,
      "pwith",
      " {x set to p.x + 3, y set to p.y - 1}",
      "",
      "",
    );
  });
  test("Identifier", () => {
    testNodeParse(new IdentifierNode(), ``, ParseStatus.empty, ``, "", "");
    testNodeParse(new IdentifierNode(), `  `, ParseStatus.invalid, ``, "", "");
    testNodeParse(
      new IdentifierNode(),
      `a`,
      ParseStatus.valid,
      `a`,
      "",
      "a",
      "",
    );
    testNodeParse(
      new IdentifierNode(),
      `aB_d`,
      ParseStatus.valid,
      `aB_d`,
      "",
      "aB_d",
    );
    testNodeParse(
      new IdentifierNode(),
      `abc `,
      ParseStatus.valid,
      `abc`,
      " ",
      "abc",
    );
    testNodeParse(
      new IdentifierNode(),
      `Abc`,
      ParseStatus.invalid,
      ``,
      "Abc",
      "",
    );
    testNodeParse(
      new IdentifierNode(),
      `abc-de`,
      ParseStatus.valid,
      `abc`,
      "-de",
      "abc",
    );
    // Can be a keyword - because that will be rejected at compile stage, not parse stage
    testNodeParse(
      new IdentifierNode(),
      `new`,
      ParseStatus.valid,
      `new`,
      "",
      "",
    );
    testNodeParse(
      new IdentifierNode(),
      `global`,
      ParseStatus.valid,
      `global`,
      "",
      "",
    );
    testNodeParse(
      new IdentifierNode(),
      `x as`,
      ParseStatus.valid,
      `x`,
      " as",
      "x",
    );
  });
  test("LitBool", () => {
    testNodeParse(new LitBoolean(), "", ParseStatus.empty, "", "", "", "");
    testNodeParse(
      new LitBoolean(),
      " true",
      ParseStatus.valid,
      "true",
      "",
      "true",
      "<keyword>true</keyword>",
    );
    testNodeParse(
      new LitBoolean(),
      " trueX",
      ParseStatus.valid,
      "true",
      "X",
      "true",
      "",
    );
    testNodeParse(
      new LitBoolean(),
      " false",
      ParseStatus.valid,
      "false",
      "",
      "false",
      "",
    );
    testNodeParse(
      new LitBoolean(),
      " True",
      ParseStatus.invalid,
      "",
      "True",
      "",
      "",
    );
    testNodeParse(
      new LitBoolean(),
      "is True",
      ParseStatus.invalid,
      "",
      "is True",
      "",
      "",
    );
    testNodeParse(
      new LitBoolean(),
      " tr",
      ParseStatus.incomplete,
      "tr",
      "",
      "tr",
      "",
    );
    testNodeParse(
      new LitBoolean(),
      " tr ",
      ParseStatus.invalid,
      "",
      "tr ",
      "",
      "",
    );
  });
  test("LitString - single chars", () => {
    testNodeParse(new LitString(), "", ParseStatus.empty, "", "", "", "");
    testNodeParse(
      new LitString(),
      `"a"`,
      ParseStatus.valid,
      `"a"`,
      "",
      `"a"`,
      "",
    );
    testNodeParse(
      new LitString(),
      `"a`,
      ParseStatus.incomplete,
      `"a`,
      "",
      `"a`,
      "",
    );
    testNodeParse(
      new LitString(),
      `"9"`,
      ParseStatus.valid,
      `"9"`,
      "",
      `"9"`,
      "",
    );
    testNodeParse(
      new LitString(),
      `" "`,
      ParseStatus.valid,
      `" "`,
      "",
      `" "`,
      "",
    );
  });
  test("LitString - bug #328", () => {
    testNodeParse(
      new LitString(),
      `" `,
      ParseStatus.incomplete,
      `" `,
      "",
      `" `,
      "",
    );
    testNodeParse(
      new LitString(),
      `"{a} `,
      ParseStatus.incomplete,
      `"{a} `,
      "",
      `"{a} `,
      "",
    );
  });
  test("LitInt", () => {
    testNodeParse(new LitInt(), "", ParseStatus.empty, "", "", "", "");
    testNodeParse(new LitInt(), "   ", ParseStatus.invalid, "", "   ", "", "");
    testNodeParse(new LitInt(), "123", ParseStatus.valid, "123", "", "123", "");
    testNodeParse(
      new LitInt(),
      "-123",
      ParseStatus.valid,
      "-123",
      "",
      "-123",
      "",
    );
    testNodeParse(
      new LitInt(),
      "- 123",
      ParseStatus.invalid,
      "",
      "- 123",
      "",
      "",
    );
    testNodeParse(new LitInt(), "1-23", ParseStatus.valid, "1", "-23", "", "");
    testNodeParse(
      new LitInt(),
      "456  ",
      ParseStatus.valid,
      "456",
      "  ",
      "456",
      "",
    );
    testNodeParse(
      new LitInt(),
      " 123a",
      ParseStatus.valid,
      " 123",
      "a",
      "123",
      "",
    );
    testNodeParse(new LitInt(), "1.23", ParseStatus.valid, "1", ".23", "1", "");
    testNodeParse(new LitInt(), "a", ParseStatus.invalid, "", "a", "", "");
  });
  test("LitFloat", () => {
    testNodeParse(new LitFloat(), "", ParseStatus.empty, "", "", "");
    testNodeParse(new LitFloat(), "1.0", ParseStatus.valid, "1.0", "", "1.0");
    testNodeParse(
      new LitFloat(),
      "-1.0",
      ParseStatus.valid,
      "-1.0",
      "",
      "-1.0",
    );
    testNodeParse(
      new LitFloat(),
      "- 1.0",
      ParseStatus.invalid,
      "",
      "- 1.0",
      "",
    );
    testNodeParse(new LitFloat(), "1.-0", ParseStatus.invalid, "", "1.-0", "");
    testNodeParse(
      new LitFloat(),
      " 1.0a",
      ParseStatus.valid,
      " 1.0",
      "a",
      "1.0",
    );
    testNodeParse(new LitFloat(), "1", ParseStatus.incomplete, "1", "", "1");
    testNodeParse(new LitFloat(), "1.", ParseStatus.incomplete, "1.", "", "1.");
    testNodeParse(new LitFloat(), "1. ", ParseStatus.invalid, "", "1. ", "");
    testNodeParse(
      new LitFloat(),
      "1.1e5",
      ParseStatus.valid,
      "1.1e5",
      "",
      "1.1e5",
    );
    testNodeParse(
      new LitFloat(),
      "1.1e-5",
      ParseStatus.valid,
      "1.1e-5",
      "",
      "1.1e-5",
    );
  });
  test("Keyword", () => {
    testNodeParse(
      new KeywordNode(abstractKeyword),
      "",
      ParseStatus.empty,
      "",
      "",
      "",
    );
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
    testNodeParse(
      new BracketedExpression(),
      "(3)",
      ParseStatus.valid,
      "(3)",
      "",
      "(3)",
      "",
    );

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
    testNodeParse(
      new BracketedExpression(),
      "(",
      ParseStatus.incomplete,
      "(",
      "",
      "(",
    );
    testNodeParse(
      new BracketedExpression(),
      "()",
      ParseStatus.invalid,
      "",
      "()",
      "(",
    );
  });
  test("Optional", () => {
    testNodeParse(
      new OptionalNode(new LitInt()),
      "123 a",
      ParseStatus.valid,
      "123",
      " a",
      "123",
    );
    testNodeParse(
      new OptionalNode(new LitInt()),
      "abc",
      ParseStatus.valid,
      "",
      "abc",
      "",
    );
    testNodeParse(
      new OptionalNode(new KeywordNode(abstractKeyword)),
      " abstract",
      ParseStatus.valid,
      " abstract",
      "",
      "abstract",
      "<keyword>abstract</keyword>",
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
    testNodeParse(
      new Multiple(() => new LitInt(), 0),
      ``,
      ParseStatus.valid,
      ``,
      "",
      "",
    );
    testNodeParse(
      new Multiple(() => new LitInt(), 1),
      ``,
      ParseStatus.empty,
      ``,
      "",
      "",
    );
    testNodeParse(
      new Multiple(() => new LitInt(), 0),
      `)`,
      ParseStatus.valid,
      ``,
      ")",
      "",
    );
    testNodeParse(
      new Multiple(() => new LitInt(), 1),
      `1 0 33`,
      ParseStatus.valid,
      `1 0 33`,
      "",
      "",
    );
    testNodeParse(
      new Multiple(() => new LitInt(), 1),
      `1`,
      ParseStatus.valid,
      `1`,
      "",
      "",
    );
    testNodeParse(
      new Multiple(() => new LitInt(), 0),
      ``,
      ParseStatus.valid,
      ``,
      "",
      "",
    );
    testNodeParse(
      new Multiple(() => new LitInt(), 1),
      ``,
      ParseStatus.empty,
      ``,
      "",
      "",
    );
    testNodeParse(
      new Multiple(() => new LitInt(), 1),
      `5 6 a`,
      ParseStatus.valid,
      `5 6`,
      " a",
      "",
    );
    testNodeParse(
      new Multiple(() => new LitInt(), 1),
      `7   `,
      ParseStatus.valid,
      `7`,
      "   ",
      "",
    );

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
    testNodeParse(new CommaNode(), ``, ParseStatus.incomplete, ``, "", "");
    testNodeParse(new CommaNode(), `,`, ParseStatus.valid, ``, "", ", ");
    testNodeParse(new CommaNode(), ` ,`, ParseStatus.valid, ``, "", ", ");
    testNodeParse(new CommaNode(), `  ,    `, ParseStatus.valid, ``, "", ", ");
    testNodeParse(new CommaNode(), `.`, ParseStatus.invalid, ``, ".", "");
    testNodeParse(new CommaNode(), `,,`, ParseStatus.valid, `,`, ",", "");
  });
  test("CSV", () => {
    testNodeParse(
      new CSV(() => new LitInt(), 0),
      ``,
      ParseStatus.valid,
      ``,
      "",
      "",
    );
    testNodeParse(
      new CSV(() => new LitInt(), 1),
      ``,
      ParseStatus.empty,
      ``,
      "",
      "",
    );
    testNodeParse(
      new CSV(() => new LitInt(), 0),
      `2, 4,3 , 1`,
      ParseStatus.valid,
      `2, 4,3 , 1`,
      "",
      "2, 4, 3, 1",
    );
    testNodeParse(
      new CSV(() => new LitInt(), 0),
      `2`,
      ParseStatus.valid,
      `2`,
      "",
      "",
    );
    testNodeParse(
      new CSV(() => new LitInt(), 1),
      `2`,
      ParseStatus.valid,
      `2`,
      "",
      "",
    );
    testNodeParse(
      new CSV(() => new LitString(), 0),
      `"apple","orange" , "pear"`,
      ParseStatus.valid,
      `"apple","orange" , "pear"`,
      "",
      `"apple", "orange", "pear"`,
    );
    testNodeParse(
      new CSV(() => new IdentifierNode(), 0),
      `a,b,c`,
      ParseStatus.valid,
      `a,b,c`,
      "",
      "",
    );
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
      `a + b,c, 1`,
      ParseStatus.valid,
      `a + b,c, 1`,
      "",
      "",
    );
    testNodeParse(
      new CSV(() => new ExprNode(), 0),
      `)`,
      ParseStatus.valid,
      ``,
      ")",
      "",
    );

    testNodeParse(
      new CSV(() => new KeywordNode("foo"), 0),
      `foo, foo`,
      ParseStatus.valid,
      "",
      "",
    );
    testNodeParse(
      new CSV(() => new KeywordNode("foo"), 0),
      `foo`,
      ParseStatus.valid,
      "",
      "",
    );
    testNodeParse(
      new CSV(() => new KeywordNode("foo"), 1),
      `fook`,
      ParseStatus.invalid,
      "",
      "fook",
    );
    testNodeParse(
      new CSV(() => new KeywordNode("foo"), 0),
      `fo`,
      ParseStatus.incomplete,
      "fo",
      "",
    );
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

    testNodeParse(
      new CSV(() => new ExprNode(), 0),
      ``,
      ParseStatus.valid,
      "",
      "",
    );
  });
  test("Instance", () => {
    testNodeParse(new InstanceNode(), ``, ParseStatus.empty, ``, "", "");
    testNodeParse(new InstanceNode(), `bar`, ParseStatus.valid, `bar`, "", "");
    testNodeParse(
      new InstanceNode(),
      `bar[foo]`,
      ParseStatus.valid,
      `bar[foo]`,
      "",
      "",
    );
    testNodeParse(
      new InstanceNode(),
      `bar[foo][0]`,
      ParseStatus.valid,
      `bar[foo]`,
      "[0]",
      "",
    );
  });

  test("Function Call", () => {
    testNodeParse(new FunctionCallNode(), ``, ParseStatus.empty, ``, "", "");
    testNodeParse(new FunctionCallNode(), `  `, ParseStatus.empty, ``, "", "");
    testNodeParse(
      new FunctionCallNode(),
      `foo()`,
      ParseStatus.valid,
      `foo()`,
      "",
      "foo()",
      "<method>foo</method>()",
    );
    testNodeParse(
      new FunctionCallNode(),
      `bar(x, 1, "hello")`,
      ParseStatus.valid,
      `bar(x, 1, "hello")`,
      "",
      "",
      "",
    );
    testNodeParse(
      new FunctionCallNode(),
      `yon`,
      ParseStatus.incomplete,
      `yon`,
      "",
      "",
    );
    testNodeParse(
      new FunctionCallNode(),
      `yon `,
      ParseStatus.invalid,
      ``,
      "yon ",
      "",
    );
    testNodeParse(
      new FunctionCallNode(),
      `yon(`,
      ParseStatus.incomplete,
      `yon(`,
      "",
      "",
    );
    testNodeParse(
      new FunctionCallNode(),
      `yon(a`,
      ParseStatus.incomplete,
      `yon(a`,
      "",
      "",
    );
    testNodeParse(
      new FunctionCallNode(),
      `yon(a,`,
      ParseStatus.incomplete,
      `yon(a,`,
      "",
      "",
    );
    testNodeParse(
      new FunctionCallNode(),
      `Foo()`,
      ParseStatus.invalid,
      ``,
      "Foo()",
      "",
    );
    testNodeParse(
      new FunctionCallNode(),
      `foo[]`,
      ParseStatus.invalid,
      ``,
      "foo[]",
      "",
    );
    testNodeParse(
      new FunctionCallNode(),
      `bar.foo(a)`,
      ParseStatus.valid,
      ``,
      "",
      "bar.foo(a)",
      "bar.<method>foo</method>(a)",
    );
    testNodeParse(
      new FunctionCallNode(),
      `global.foo()`,
      ParseStatus.valid,
      ``,
      "",
      "global.foo()",
      "<keyword>global</keyword>.<method>foo</method>()",
    );
    testNodeParse(
      new FunctionCallNode(),
      `library.foo()`,
      ParseStatus.valid,
      ``,
      "",
      "library.foo()",
      "<keyword>library</keyword>.<method>foo</method>()",
    );
    testNodeParse(
      new FunctionCallNode(),
      `property.foo()`,
      ParseStatus.valid, //Because 'property' is parsed as an instance name. This should be picked up as a compile error though.
      `property.foo()`,
      "",
      "",
    );
    testNodeParse(
      new FunctionCallNode(),
      `isBefore(b[0])`,
      ParseStatus.valid,
      ``,
      "",
      "",
    );
    testNodeParse(
      new FunctionCallNode(),
      `a.isBefore(b[0])`,
      ParseStatus.valid,
      ``,
      "",
      "",
    );
    testNodeParse(
      new FunctionCallNode(),
      `a[0].isBefore(b[0])`,
      ParseStatus.valid,
      ``,
      "",
      "a[0].isBefore(b[0])",
      "a[0].<method>isBefore</method>(b[0])",
    );
  });
  test("Lists", () => {
    testNodeParse(
      new ImmutableListNode(() => new LitInt()),
      ``,
      ParseStatus.empty,
      ``,
      "",
      "",
    );
    testNodeParse(
      new ImmutableListNode(() => new LitInt()),
      `{1, 2, 3, 4, 5}`,
      ParseStatus.valid,
      ``,
      "",
      "{1, 2, 3, 4, 5}",
      "",
    );
    testNodeParse(
      new ImmutableListNode(() => new LitInt()),
      `{}`,
      ParseStatus.invalid,
      ``,
      "{}",
      "",
    );
    testNodeParse(
      new ImmutableListNode(() => new LitInt()),
      `{`,
      ParseStatus.incomplete,
      `{`,
      "",
      "",
    );
    testNodeParse(
      new ImmutableListNode(() => new LitInt()),
      `{1,2,3.1}`,
      ParseStatus.invalid,
      ``,
      "{1,2,3.1}",
      "",
    );
    // list of list
    testNodeParse(
      new ImmutableListNode(() => new ImmutableListNode(() => new LitInt())),
      ``,
      ParseStatus.empty,
      ``,
      "",
      "",
    );
    testNodeParse(
      new ImmutableListNode(() => new ImmutableListNode(() => new LitInt())),
      `{{}, {}, {}}`,
      ParseStatus.invalid,
      ``,
      "{{}, {}, {}}",
      "",
    );
    testNodeParse(
      new ImmutableListNode(() => new ImmutableListNode(() => new LitInt())),
      `{{1,2}, {3,4}}`,
      ParseStatus.valid,
      ``,
      "",
      "{{1, 2}, {3, 4}}",
      "",
    );
    testNodeParse(
      new ImmutableListNode(() => new ImmutableListNode(() => new LitInt())),
      `{{1,2}, {3,4}`,
      ParseStatus.incomplete,
      `{{1,2}, {3,4}`,
      "",
      "",
    );
    testNodeParse(
      new ImmutableListNode(() => new ImmutableListNode(() => new LitInt())),
      `{{1,2, {}}`,
      ParseStatus.invalid,
      ``,
      `{{1,2, {}}`,
      "",
      "",
    );

    testNodeParse(
      new ImmutableListNode(() => new LitString()),
      `{"apple", "pear"}`,
      ParseStatus.valid,
      "",
      "",
      "",
      `{<string>"apple"</string>, <string>"pear"</string>}`,
    );
    testNodeParse(
      new ImmutableListNode(() => new LiteralNode()),
      `{"apple", "pear"}`,
      ParseStatus.valid,
      "",
      "",
      "",
      `{<string>"apple"</string>, <string>"pear"</string>}`,
    );
  });
  test("ImmutableList of expressions", () => {
    testNodeParse(
      new ImmutableListNode(() => new ExprNode()),
      `{a, 3 + 4, func(a, 3)- 1, new Foo()}`,
      ParseStatus.valid,
      "{a, 3 + 4, func(a, 3)- 1, new Foo()}",
      "",
      "",
    );
    testNodeParse(
      new ImmutableListNode(() => new ExprNode()),
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
      new TypeSimple(),
      `Foo`,
      ParseStatus.valid,
      "Foo",
      "",
      "",
      "<type>Foo</type>",
    );
    testNodeParse(
      new TypeSimple(),
      `foo`,
      ParseStatus.invalid,
      "",
      "foo",
      "",
    );
  });
  test("TypeWithOptGenerics", () => {
    testNodeParse(
      new TypeSimpleOrGeneric(),
      `Foo`,
      ParseStatus.valid,
      "Foo",
      "",
      "",
      "",
    );
    testNodeParse(
      new TypeSimpleOrGeneric(),
      `foo`,
      ParseStatus.invalid,
      "",
      "foo",
      "",
    );
    testNodeParse(
      new TypeSimpleOrGeneric(),
      `Foo<`,
      ParseStatus.incomplete,
      "Foo<",
      "",
      "",
    );
    testNodeParse(
      new TypeSimpleOrGeneric(),
      `Foo<of`,
      ParseStatus.incomplete,
      "Foo<of",
      "",
      "",
    );
    testNodeParse(
      new TypeSimpleOrGeneric(),
      `Foo<of Bar`,
      ParseStatus.incomplete,
      "Foo<of Bar",
      "",
      "",
    );
    testNodeParse(
      new TypeSimpleOrGeneric(),
      `Foo<ofBar`,
      ParseStatus.valid,
      "",
      "<ofBar",
      "",
    );
    testNodeParse(
      new TypeSimpleOrGeneric(),
      `Foo<of Bar>`,
      ParseStatus.valid,
      "Foo<of Bar>",
      "",
      "",
      "<type>Foo</type>&lt;<keyword>of</keyword> <type>Bar</type>&gt;",
    );
    testNodeParse(
      new TypeSimpleOrGeneric(),
      `Foo<of ImmutableList<of Bar>>`,
      ParseStatus.valid,
      "Foo<of ImmutableList<of Bar>>",
      "",
      "",
      "<type>Foo</type>&lt;<keyword>of</keyword> <type>ImmutableList</type>&lt;<keyword>of</keyword> <type>Bar</type>&gt;&gt;",
    );
    testNodeParse(
      new TypeSimpleOrGeneric(),
      `Dictionary<of Bar, Yon>`,
      ParseStatus.valid,
      "Dictionary<of Bar, Yon>",
      "",
      "",
      "<type>Dictionary</type>&lt;<keyword>of</keyword> <type>Bar</type>, <type>Yon</type>&gt;",
    );
    testNodeParse(
      new TypeSimpleOrGeneric(),
      `ImmutableList<of (Bar, Yon)>`,
      ParseStatus.valid,
      "ImmutableList<of (Bar, Yon)>",
      "",
      "",
      "<type>ImmutableList</type>&lt;<keyword>of</keyword> (<type>Bar</type>, <type>Yon</type>)&gt;",
    );
  });
  test("TypeNode", () => {
    testNodeParse(
      new TypeNode(),
      `Foo<of ImmutableList<of Bar>>`,
      ParseStatus.valid,
      "Foo<of ImmutableList<of Bar>>",
      "",
      "",
    ); //Single
    testNodeParse(
      new TypeNode(),
      `(Foo, Bar)`,
      ParseStatus.valid,
      "(Foo, Bar)",
      "",
      "",
    );
    testNodeParse(
      new TypeNode(),
      `(Foo)`,
      ParseStatus.invalid,
      "",
      "(Foo)",
      "",
    );
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
      `Foo<of ImmutableList<of (Bar, Qux)>>`,
      ParseStatus.valid,
      "Foo<of ImmutableList<of (Bar, Qux)>>",
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
  test("TupleDefNode", () => {
    testNodeParse(
      new TupleNode(),
      `("foo", 3)`,
      ParseStatus.valid,
      '("foo", 3)',
      "",
      "",
      "",
    );
    testNodeParse(
      new TupleNode(),
      `(foo, 3, bar(a), x)`,
      ParseStatus.valid,
      "(foo, 3, bar(a), x)",
      "",
      "",
    );
    testNodeParse(
      new TupleNode(),
      `(foo)`,
      ParseStatus.invalid,
      "",
      "(foo)",
      "",
    );
    testNodeParse(
      new TupleNode(),
      `(foo, 3, bar(a), x`,
      ParseStatus.incomplete,
      "(foo, 3, bar(a), x",
      "",
      "",
    );
    testNodeParse(
      new TupleNode(),
      `(setAttemptIfGreen(a.attempt, a.target, x), setTargetIfGreen(a.attempt, a.target, x))`,
      ParseStatus.valid,
      "",
      "",
      "(setAttemptIfGreen(a.attempt, a.target, x), setTargetIfGreen(a.attempt, a.target, x))",
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
    testNodeParse(
      new Lambda(),
      `lambda x`,
      ParseStatus.incomplete,
      "lambda x",
      "",
      "",
    );
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
      `lambda s as Int, p as ImmutableList<of Int> => s + p.first()`,
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
      `lambda a as (String, String), x as Int => (setAttemptIfGreen(a.attempt, a.target, x), setTargetIfGreen(a.attempt, a.target, x))`,
      ParseStatus.valid,
      "",
      "",
      "lambda a as (String, String), x as Int => (setAttemptIfGreen(a.attempt, a.target, x), setTargetIfGreen(a.attempt, a.target, x))",
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
    testNodeParse(
      new IfExpr(),
      `if cell then Colour.amber`,
      ParseStatus.incomplete,
      "",
      "",
      "",
    );
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
      "x <keyword>as</keyword> <type>String</type>",
    );
    testNodeParse(
      new ParamDefNode(),
      `y asString`,
      ParseStatus.invalid,
      "",
      "y asString",
      "",
    );
    testNodeParse(new ParamDefNode(), `z`, ParseStatus.incomplete, "z", "", "");
    testNodeParse(
      new ParamDefNode(),
      `w as`,
      ParseStatus.incomplete,
      "w as",
      "",
      "",
    );
    testNodeParse(new ParamDefNode(), `A`, ParseStatus.invalid, "", "A", "");
    testNodeParse(
      new ParamDefNode(),
      `v String`,
      ParseStatus.invalid,
      "",
      "v String",
      "",
    );
  });
  test("Param ImmutableList", () => {
    testNodeParse(
      new CSV(() => new ParamDefNode(), 0),
      `A as string`,
      ParseStatus.valid,
      "",
      "A as string",
      "",
    ); //i.e. all leftover
    testNodeParse(
      new CSV(() => new ParamDefNode(), 0),
      ``,
      ParseStatus.valid,
      "",
      "",
      "",
    );
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
    testNodeParse(
      new CSV(() => new ParamDefNode(), 0),
      `a`,
      ParseStatus.incomplete,
      "a",
      "",
      "",
    );
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
  test("LitTuple", () => {
    testNodeParse(new LitTuple(), `(3,4)`, ParseStatus.valid, "", "", "");
    testNodeParse(
      new LitTuple(),
      `(3,"a", "hello", 4.1, true)`,
      ParseStatus.valid,
      "",
      "",
      "",
    );
    testNodeParse(
      new LitTuple(),
      `((3,4), ("a", true))`,
      ParseStatus.valid,
      "",
      "",
      "",
    );
    testNodeParse(
      new LitTuple(),
      `(3,"a", "hello", 4.1, true`,
      ParseStatus.incomplete,
      "",
      "",
      "",
    );
    testNodeParse(
      new LitTuple(),
      `(3,"a", "hello", 4.1,`,
      ParseStatus.incomplete,
      "",
      "",
      "",
    );
    testNodeParse(
      new LitTuple(),
      `[3,4]`,
      ParseStatus.invalid,
      "",
      "[3,4]",
      "",
    );
    testNodeParse(
      new LitTuple(),
      `(a,b)`,
      ParseStatus.invalid,
      "",
      "(a,b)",
      "",
    );
    testNodeParse(new LitTuple(), `(`, ParseStatus.incomplete, "", "", "");
    testNodeParse(new LitTuple(), `(3`, ParseStatus.incomplete, "", "", "");
    testNodeParse(new LitTuple(), `(3)`, ParseStatus.invalid, "", "(3)", "");
    testNodeParse(new LitTuple(), `()`, ParseStatus.invalid, "", "()", "");
  });
  test("DeconstructedTuple", () => {
    testNodeParse(
      new DeconstructedTuple(),
      `(a,b)`,
      ParseStatus.valid,
      "",
      "",
      "",
    );
    testNodeParse(
      new DeconstructedTuple(),
      `(a,b`,
      ParseStatus.incomplete,
      "",
      "",
      "",
    );
    testNodeParse(
      new DeconstructedTuple(),
      `(3,4)`,
      ParseStatus.invalid,
      "",
      "(3,4)",
      "",
    );
    testNodeParse(
      new DeconstructedTuple(),
      `(a[2],b)`,
      ParseStatus.invalid,
      "",
      "(a[2],b)",
      "",
    );
  });
  test("Literal", () => {
    testNodeParse(new LiteralNode(), `"hello"`, ParseStatus.valid, "", "", "");
    testNodeParse(new LiteralNode(), `123`, ParseStatus.valid, "", "", "");
    testNodeParse(
      new LiteralNode(),
      `{"a":37, 42:"b"}`,
      ParseStatus.valid,
      "",
      "",
      "",
    );
    testNodeParse(
      new LiteralNode(),
      `{(3,4), (5,6)}`,
      ParseStatus.valid,
      "",
      "",
      "",
    );
    testNodeParse(
      new LiteralNode(),
      `{"apple", "pear"}`,
      ParseStatus.valid,
      "",
      "",
      "",
      `{<string>"apple"</string>, <string>"pear"</string>}`,
    );
    testNodeParse(
      new LiteralNode(),
      `{4, 5, 2, 3}`,
      ParseStatus.valid,
      "",
      "",
      "",
      `{4, 5, 2, 3}`,
    );
  });
  test("VarRef", () => {
    testNodeParse(new VarRefNode(), `g`, ParseStatus.valid, "", "", "");
    testNodeParse(new VarRefNode(), `new`, ParseStatus.valid, "new", "", ""); // because keyword as var is now a compile error not parse error
    testNodeParse(
      new VarRefNode(),
      `global.`,
      ParseStatus.incomplete,
      "",
      "",
      "",
    );
    testNodeParse(
      new VarRefNode(),
      `global`,
      ParseStatus.valid, //because use of a keyword alone is now to be picked up as a compile error, not a parse error
      "global",
      "",
      "",
    );
    testNodeParse(new VarRefNode(), `foo`, ParseStatus.valid, "", "", "");
    testNodeParse(new VarRefNode(), `foo[3]`, ParseStatus.valid, "", "", "");
    testNodeParse(
      new VarRefNode(),
      `library.foo`,
      ParseStatus.valid,
      "",
      "",
      "",
    );
    testNodeParse(
      new VarRefNode(),
      `property.foo`,
      ParseStatus.valid,
      "",
      "",
      "",
    );
    testNodeParse(
      new VarRefNode(),
      `global.foo[3]`,
      ParseStatus.valid,
      "",
      "",
      "",
    );
    testNodeParse(
      new VarRefNode(),
      `property.foo[3..4]`,
      ParseStatus.valid,
      "",
      "",
      "",
    );
    testNodeParse(
      new VarRefNode(),
      `bar.foo[3..4]`,
      ParseStatus.valid,
      "",
      "",
      "",
    );
    testNodeParse(
      new VarRefNode(),
      `property.bar.foo`,
      ParseStatus.valid,
      "property.bar",
      ".foo",
      "",
    );
  });
  test("DeconstructedList", () => {
    testNodeParse(
      new DeconstructedList(),
      `[a:b]`,
      ParseStatus.valid,
      "",
      "",
      "",
    );
    testNodeParse(
      new DeconstructedList(),
      `[a:b`,
      ParseStatus.incomplete,
      "",
      "",
      "",
    );
    testNodeParse(
      new DeconstructedList(),
      `[a:`,
      ParseStatus.incomplete,
      "",
      "",
      "",
    );
    testNodeParse(
      new DeconstructedList(),
      `[a`,
      ParseStatus.incomplete,
      "",
      "",
      "",
    );
    testNodeParse(
      new DeconstructedList(),
      `[`,
      ParseStatus.incomplete,
      "",
      "",
      "",
    );
    testNodeParse(
      new DeconstructedList(),
      `[a,b]`,
      ParseStatus.invalid,
      "",
      "[a,b]",
      "",
    );
    testNodeParse(
      new DeconstructedList(),
      `[a:3]`,
      ParseStatus.invalid,
      "",
      "[a:3]",
      "",
    );
    testNodeParse(
      new DeconstructedList(),
      `(a:b)`,
      ParseStatus.invalid,
      "",
      "(a:b)",
      "",
    );
  });

  test("SpaceNode", () => {
    testNodeParse(
      new SpaceNode(Space.ignored),
      ``,
      ParseStatus.valid,
      "",
      "",
      "",
      "",
    );
    testNodeParse(
      new SpaceNode(Space.ignored),
      ` `,
      ParseStatus.valid,
      "",
      "",
      "",
      "",
    );
    testNodeParse(
      new SpaceNode(Space.ignored),
      `  `,
      ParseStatus.valid,
      "",
      "",
      "",
      "",
    );
    testNodeParse(
      new SpaceNode(Space.added),
      ``,
      ParseStatus.valid,
      "",
      "",
      " ",
      " ",
    );
    testNodeParse(
      new SpaceNode(Space.added),
      ` `,
      ParseStatus.valid,
      "",
      "",
      " ",
      " ",
    );
    testNodeParse(
      new SpaceNode(Space.added),
      `  `,
      ParseStatus.valid,
      "",
      "",
      " ",
      " ",
    );
    testNodeParse(
      new SpaceNode(Space.required),
      ``,
      ParseStatus.empty,
      "",
      "",
      "",
      "",
    );
    testNodeParse(
      new SpaceNode(Space.required),
      ` `,
      ParseStatus.valid,
      "",
      "",
      " ",
      " ",
    );
    testNodeParse(
      new SpaceNode(Space.required),
      `  `,
      ParseStatus.valid,
      "",
      "",
      " ",
      " ",
    );
  });
  test("New Instance", () => {
    testNodeParse(new NewInstance(), ``, ParseStatus.empty, "", "", "", "");
    testNodeParse(
      new NewInstance(),
      `new Foo()`,
      ParseStatus.valid,
      "",
      "",
      "new Foo()",
      "",
    );
    testNodeParse(
      new NewInstance(),
      `newFoo()`,
      ParseStatus.invalid,
      "",
      "newFoo()",
      "",
      "",
    );
  });
  test("String Interpolation", () => {
    testNodeParse(
      new StringInterpolation(),
      ``,
      ParseStatus.empty,
      "",
      "",
      "",
      "",
    );
    testNodeParse(
      new StringInterpolation(),
      "{x + 1}",
      ParseStatus.valid,
      "{x + 1}",
      "",
      "",
      "",
    );
    testNodeParse(
      new StringInterpolation(),
      "{x",
      ParseStatus.incomplete,
      "{x",
      "",
      "",
      "",
    );
    testNodeParse(
      new StringInterpolation(),
      "{}",
      ParseStatus.invalid,
      "",
      "{}",
      "",
      "",
    );
  });
  test("LitString", () => {
    testNodeParse(
      new LitString(),
      `""`,
      ParseStatus.valid,
      `""`,
      "",
      "",
      `<string>""</string>`,
    );
    testNodeParse(
      new LitString(),
      `"abc"`,
      ParseStatus.valid,
      `"abc"`,
      "",
      "",
      `<string>"abc"</string>`,
    );
    testNodeParse(
      new LitString(),
      `"abc def"`,
      ParseStatus.valid,
      `"abc def"`,
      "",
      "",
      `<string>"abc def"</string>`,
    );
    testNodeParse(
      new LitString(),
      `"abc`,
      ParseStatus.incomplete,
      `"abc`,
      "",
      "",
      "",
    );
    testNodeParse(
      new LitString(),
      `"`,
      ParseStatus.incomplete,
      `"`,
      "",
      "",
      "",
    );
    testNodeParse(
      new LitString(),
      `abc`,
      ParseStatus.invalid,
      "",
      "abc",
      "",
      "",
    );
    testNodeParse(
      new LitString(),
      `'abc'`,
      ParseStatus.invalid,
      "",
      "'abc'",
      "",
      "",
    );
  });
  test("Interpolated strings", () => {
    const field = () => new StringInterpolation();
    const plainText = () => new RegExMatchNode(Regexes.nonEmptyStringContent);
    const segment = () => new Alternatives([field, plainText]);
    testNodeParse(segment(), `abc`, ParseStatus.valid, "abc", "");
    testNodeParse(segment(), `{x}`, ParseStatus.valid, "{x}", "");
    testNodeParse(segment(), `"`, ParseStatus.invalid, "", `"`);

    testNodeParse(new LitString(), `"{x}{y}"`, ParseStatus.valid, "", "");
    testNodeParse(
      new LitString(),
      `"{a} times {b} equals{c}"`,
      ParseStatus.valid,
      "",
      "",
    );
  });
  test("Bug #290", () => {
    testNodeParse(new LitInt(), `3`, ParseStatus.valid, "3", "");
    testNodeParse(new LitInt(), `3 `, ParseStatus.valid, "3", " ");

    testNodeParse(new LitValueNode(), `3 `, ParseStatus.valid, "3", " ");
    testNodeParse(
      new BinaryExpression(),
      `3 `,
      ParseStatus.incomplete,
      "3 ",
      "",
      "3 ",
    );

    testNodeParse(new ExprNode(), `3 `, ParseStatus.incomplete, "3 ", "", "3 ");
  });

  test("ProcRefCompound", () => {
    testNodeParse(new InstanceProcRef(), `bar.foo`, ParseStatus.valid, "", "");
    testNodeParse(
      new InstanceProcRef(),
      `bar.`,
      ParseStatus.incomplete,
      "",
      "",
    );
    testNodeParse(
      new InstanceProcRef(),
      `bar.foo.yon`,
      ParseStatus.valid,
      "",
      ".yon",
    );
    testNodeParse(
      new InstanceProcRef(),
      `bar.foo[2]`,
      ParseStatus.valid,
      "",
      "[2]",
    );
    testNodeParse(new InstanceProcRef(), `bar`, ParseStatus.incomplete, "", "");
    testNodeParse(
      new InstanceProcRef(),
      `global.bar`,
      ParseStatus.valid,
      "",
      "",
    );
    testNodeParse(
      new InstanceProcRef(),
      `library.bar`,
      ParseStatus.valid,
      "",
      "",
    );
    testNodeParse(new InstanceProcRef(), `x[3].bar`, ParseStatus.valid, "", "");
  });
  test("#339 call dot function on a literal", () => {
    testNodeParse(
      new FunctionCallNode(),
      `length(bar)`,
      ParseStatus.valid,
      "",
      "",
    );
    testNodeParse(
      new FunctionCallNode(),
      `bar.length()`,
      ParseStatus.valid,
      "",
      "",
    );
    testNodeParse(
      new FunctionCallNode(),
      `bar.asArray()`,
      ParseStatus.valid,
      "",
      "",
    );
    testNodeParse(new LiteralNode(), `{1,2,3,4,5}`, ParseStatus.valid, "", "");
    testNodeParse(
      new FunctionCallNode(),
      `{1,2,3,4,5}.asArray()`,
      ParseStatus.valid,
      "",
      "",
    );
    testNodeParse(
      new FunctionCallNode(),
      `"Hello World".length()`,
      ParseStatus.valid,
      "",
      "",
    );
    testNodeParse(
      new FunctionCallNode(),
      `12.3.asString()`,
      ParseStatus.valid,
      "",
      "",
    );
    testNodeParse(
      new FunctionCallNode(),
      `bar.`,
      ParseStatus.incomplete,
      "",
      "",
    );
    testNodeParse(
      new FunctionCallNode(),
      `bar`,
      ParseStatus.incomplete,
      "",
      "",
    );
  });
  test("#387 Indexes", () => {
    testNodeParse(new IndexNode(), `[3]`, ParseStatus.valid, "[3]", "");
    testNodeParse(new IndexNode(), `[3`, ParseStatus.incomplete, "[3", "");
    testNodeParse(new IndexNode(), `(3)`, ParseStatus.invalid, "", "(3)");
    testNodeParse(new IndexNode(), `[x + y]`, ParseStatus.valid, "[x + y]", "");
    testNodeParse(new IndexNode(), `[3..4]`, ParseStatus.valid, "[3..4]", "");
    testNodeParse(new IndexNode(), `[3..]`, ParseStatus.valid, "[3..]", "");
    testNodeParse(new IndexNode(), `[..4]`, ParseStatus.valid, "[..4]", "");
    testNodeParse(new IndexNode(), `[3..`, ParseStatus.incomplete, "[3..", "");
    testNodeParse(new IndexNode(), `[3,4]`, ParseStatus.valid, "[3,4]", "");
    testNodeParse(
      new IndexNode(),
      `[3,4,5]`,
      ParseStatus.invalid,
      "",
      "[3,4,5]",
    );
    testNodeParse(
      new IndexNode(),
      `[3..4,5]`,
      ParseStatus.invalid,
      "",
      "[3..4,5]",
    );
  });
});
