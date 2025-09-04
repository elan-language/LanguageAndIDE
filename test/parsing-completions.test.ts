import { BinaryExpression } from "../src/ide/frames/parse-nodes/binary-expression";
import { CSV } from "../src/ide/frames/parse-nodes/csv";
import { ExprNode } from "../src/ide/frames/parse-nodes/expr-node";
import { IdentifierNode } from "../src/ide/frames/parse-nodes/identifier-node";
import { Lambda } from "../src/ide/frames/parse-nodes/lambda";
import { NewInstance } from "../src/ide/frames/parse-nodes/new-instance";
import { ParamDefNode } from "../src/ide/frames/parse-nodes/param-def-node";
import { Space } from "../src/ide/frames/parse-nodes/parse-node-helpers";
import { SpaceNode } from "../src/ide/frames/parse-nodes/space-node";
import { TypeNode } from "../src/ide/frames/parse-nodes/type-node";
import { ParseStatus } from "../src/ide/frames/status-enums";
import { testCompletion } from "./testHelpers";

suite("Parsing - Completions", () => {
  //TODO - merge the completions tests into the parse node tests

  test("Generic Type", () => {
    testCompletion(new TypeNode(), "", ParseStatus.empty, "<i>Type</i>");
    testCompletion(new TypeNode(), "Foo", ParseStatus.valid, "");
    testCompletion(new TypeNode(), "Foo<of ", ParseStatus.incomplete, "<i>Type</i>>");
    testCompletion(new TypeNode(), "Foo<", ParseStatus.incomplete, "of <i>Type</i>>");
    testCompletion(new TypeNode(), "Foo<of", ParseStatus.incomplete, " <i>Type</i>>");
    testCompletion(new TypeNode(), "Foo<of Bar", ParseStatus.incomplete, ">");
    testCompletion(new TypeNode(), "Foo<of Bar>", ParseStatus.valid, "");
    testCompletion(new TypeNode(), "Foo<of Bar,", ParseStatus.incomplete, "<i>Type</i>>");
    testCompletion(new TypeNode(), "Foo<of (Bar,", ParseStatus.incomplete, "<i>Type</i>)>");
  });

  test("Tuple Type", () => {
    testCompletion(new TypeNode(), "(Foo, Bar)", ParseStatus.valid, "");
    testCompletion(new TypeNode(), "(", ParseStatus.incomplete, "<i>Type</i>)");
    testCompletion(new TypeNode(), "(Foo", ParseStatus.incomplete, ")");
    testCompletion(new TypeNode(), "(Foo,", ParseStatus.incomplete, "<i>Type</i>)");
    testCompletion(new TypeNode(), "(Foo, ", ParseStatus.incomplete, "<i>Type</i>)"); //TODO Stangely failing - completion shows '))' - even though it is working correctly in the web editor
    testCompletion(new TypeNode(), "(Foo,Bar", ParseStatus.incomplete, ")");
  });

  test("ExprNode2", () => {
    testCompletion(new ExprNode(), "a + b", ParseStatus.valid, "");
    testCompletion(new ExprNode(), "a +", ParseStatus.incomplete, "<i>value or expression</i>");
    testCompletion(new ExprNode(), "a + ", ParseStatus.incomplete, "<i>value or expression</i>");
    //testCompletion(new ExprNode2(), "(", ParseStatus.incomplete, "<i>expression</i>)");
    testCompletion(new ExprNode(), "(a +", ParseStatus.incomplete, "<i>value or expression</i>)");
    testCompletion(new ExprNode(), "(a + b", ParseStatus.incomplete, ")");
    testCompletion(
      new ExprNode(),
      "(a + b)*",
      ParseStatus.incomplete,
      "<i>value or expression</i>",
    );
  });

  test("CSV of Identifier", () => {
    testCompletion(
      new CSV(() => new IdentifierNode(), 0),
      "foo,",
      ParseStatus.incomplete,
      "<i>name</i>",
    );
    testCompletion(new CSV(() => new IdentifierNode(), 0), "foo, bar, yon", ParseStatus.valid, "");
  });

  test("SpaceNode", () => {
    testCompletion(new SpaceNode(Space.ignored), ``, ParseStatus.valid, "");
    testCompletion(new SpaceNode(Space.ignored), ` `, ParseStatus.valid, "");
    testCompletion(new SpaceNode(Space.ignored), `  `, ParseStatus.valid, "");
    testCompletion(new SpaceNode(Space.added), ``, ParseStatus.valid, "");
    testCompletion(new SpaceNode(Space.added), ` `, ParseStatus.valid, "");
    testCompletion(new SpaceNode(Space.added), `  `, ParseStatus.valid, "");
    testCompletion(new SpaceNode(Space.required), ``, ParseStatus.empty, " ");
    testCompletion(new SpaceNode(Space.required), ` `, ParseStatus.valid, "");
    testCompletion(new SpaceNode(Space.required), `  `, ParseStatus.valid, "");
  });

  test("ParamDef", () => {
    testCompletion(new ParamDefNode(false), "", ParseStatus.empty, "<i>name</i> as <i>Type</i>");
    testCompletion(new ParamDefNode(false), "a", ParseStatus.incomplete, " as <i>Type</i>");
    testCompletion(new ParamDefNode(false), "ax", ParseStatus.incomplete, " as <i>Type</i>");
    testCompletion(new ParamDefNode(false), "ax ", ParseStatus.incomplete, "as <i>Type</i>");
    testCompletion(new ParamDefNode(false), "ax a", ParseStatus.incomplete, "s <i>Type</i>");
    testCompletion(new ParamDefNode(false), "ax as", ParseStatus.incomplete, " <i>Type</i>");
    testCompletion(new ParamDefNode(false), "ax as ", ParseStatus.incomplete, "<i>Type</i>");
    testCompletion(new ParamDefNode(false), "ax as Int", ParseStatus.valid, "");
  });

  test("BinaryExpression", () => {
    testCompletion(
      new BinaryExpression(),
      "a + ",
      ParseStatus.incomplete,
      "<i>value or expression</i>",
    );
    testCompletion(
      new BinaryExpression(),
      "a +",
      ParseStatus.incomplete,
      "<i>value or expression</i>",
    );
    testCompletion(
      new BinaryExpression(),
      "a+ ",
      ParseStatus.incomplete,
      "<i>value or expression</i>",
    );
  });

  test("NewInstance", () => {
    testCompletion(new NewInstance(), "new ", ParseStatus.incomplete, "<i>Type</i>()");
  });
  test("Func", () => {
    testCompletion(new TypeNode(), "Fu", ParseStatus.valid, "");
    testCompletion(
      new TypeNode(),
      "Func",
      ParseStatus.incomplete,
      "<of <i>InputType(s) </i>=> <i>ReturnType</i>>",
    );
    testCompletion(
      new TypeNode(),
      "Func<",
      ParseStatus.incomplete,
      "of <i>InputType(s) </i>=> <i>ReturnType</i>>",
    );
    testCompletion(new TypeNode(), "Func<of Foo", ParseStatus.incomplete, " => <i>ReturnType</i>>");
    testCompletion(
      new TypeNode(),
      "Func<of Foo,",
      ParseStatus.incomplete,
      "<i>Type</i> => <i>ReturnType</i>>",
    );
  });
  test("Func 2", () => {
    testCompletion(
      new ParamDefNode(false),
      "f as Func",
      ParseStatus.incomplete,
      "<of <i>InputType(s) </i>=> <i>ReturnType</i>>",
    );
  });
  test("Func 3", () => {
    testCompletion(
      new CSV(() => new ParamDefNode(false), 0),
      "f as Func",
      ParseStatus.incomplete,
      "<of <i>InputType(s) </i>=> <i>ReturnType</i>>",
    );
  });
  test("Lambda", () => {
    testCompletion(new Lambda(), "lambda x as Int => x*x", ParseStatus.valid, "");
    testCompletion(
      new Lambda(),
      "lambda ",
      ParseStatus.incomplete,
      "<i>name</i> as <i>Type</i>, ...=> <i>value or expression</i>",
    );
    testCompletion(
      new Lambda(),
      "lambda x as Int ",
      ParseStatus.incomplete,
      "=> <i>value or expression</i>",
    );
    testCompletion(
      new Lambda(),
      "lambda x as Int,",
      ParseStatus.incomplete,
      "<i>name</i> as <i>Type</i> => <i>value or expression</i>",
    );
    testCompletion(
      new Lambda(),
      "lambda x as Int =",
      ParseStatus.incomplete,
      "> <i>value or expression</i>",
    );
    testCompletion(
      new Lambda(),
      "lambda => ",
      ParseStatus.incomplete,
      "<i>value or expression</i>",
    );
  });
  test("#884", () => {
    testCompletion(
      new ExprNode(),
      "3 +  ", //extra space
      ParseStatus.incomplete,
      "<i>value or expression</i>",
    );
  });
});
