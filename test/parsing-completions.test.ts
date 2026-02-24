import { StdLib } from "../src/compiler/standard-library/std-lib";
import { DefaultProfile } from "../src/ide/frames/default-profile";
import { FileImpl } from "../src/ide/frames/file-impl";
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
import { StubInputOutput } from "../src/ide/stub-input-output";
import { hash } from "../src/ide/util";
import { transforms } from "./compiler/compiler-test-helpers";
import { testCompletion } from "./testHelpers";

suite("Parsing - Completions", () => {
  //TODO - merge the completions tests into the parse node tests

  const f = new FileImpl(
    hash,
    new DefaultProfile(),
    "",
    transforms(),
    new StdLib(new StubInputOutput()),
    false,
    true,
  );

  test("Generic Type", () => {
    testCompletion(new TypeNode(f), "", ParseStatus.empty, "<i>Type</i>");
    testCompletion(new TypeNode(f), "Foo", ParseStatus.valid, "");
    testCompletion(new TypeNode(f), "Foo<of ", ParseStatus.incomplete, "<i>Type</i>>");
    testCompletion(new TypeNode(f), "Foo<", ParseStatus.incomplete, "of <i>Type</i>>");
    testCompletion(new TypeNode(f), "Foo<of", ParseStatus.incomplete, " <i>Type</i>>");
    testCompletion(new TypeNode(f), "Foo<of Bar", ParseStatus.incomplete, ">");
    testCompletion(new TypeNode(f), "Foo<of Bar>", ParseStatus.valid, "");
    testCompletion(new TypeNode(f), "Foo<of Bar,", ParseStatus.incomplete, "<i>Type</i>>");
    testCompletion(new TypeNode(f), "Foo<of (Bar,", ParseStatus.incomplete, "<i>Type</i>)>");
  });

  test("Tuple Type", () => {
    testCompletion(new TypeNode(f), "(Foo, Bar)", ParseStatus.valid, "");
    testCompletion(new TypeNode(f), "(", ParseStatus.incomplete, "<i>Type</i>)");
    testCompletion(new TypeNode(f), "(Foo", ParseStatus.incomplete, ")");
    testCompletion(new TypeNode(f), "(Foo,", ParseStatus.incomplete, "<i>Type</i>)");
    testCompletion(new TypeNode(f), "(Foo, ", ParseStatus.incomplete, "<i>Type</i>)"); //TODO Stangely failing - completion shows '))' - even though it is working correctly in the web editor
    testCompletion(new TypeNode(f), "(Foo,Bar", ParseStatus.incomplete, ")");
  });

  test("ExprNode2", () => {
    testCompletion(new ExprNode(f), "a + b", ParseStatus.valid, "");
    testCompletion(new ExprNode(f), "a +", ParseStatus.incomplete, "<i>value or expression</i>");
    testCompletion(new ExprNode(f), "a + ", ParseStatus.incomplete, "<i>value or expression</i>");
    //testCompletion(new ExprNode2(), "(", ParseStatus.incomplete, "<i>expression</i>)");
    testCompletion(new ExprNode(f), "(a +", ParseStatus.incomplete, "<i>value or expression</i>)");
    testCompletion(new ExprNode(f), "(a + b", ParseStatus.incomplete, ")");
    testCompletion(
      new ExprNode(f),
      "(a + b)*",
      ParseStatus.incomplete,
      "<i>value or expression</i>",
    );
  });

  test("CSV of Identifier", () => {
    testCompletion(
      new CSV(f, () => new IdentifierNode(f), 0),
      "foo,",
      ParseStatus.incomplete,
      "<i>name</i>",
    );
    testCompletion(
      new CSV(f, () => new IdentifierNode(f), 0),
      "foo, bar, yon",
      ParseStatus.valid,
      "",
    );
  });

  test("SpaceNode", () => {
    testCompletion(new SpaceNode(f, Space.ignored), ``, ParseStatus.valid, "");
    testCompletion(new SpaceNode(f, Space.ignored), ` `, ParseStatus.valid, "");
    testCompletion(new SpaceNode(f, Space.ignored), `  `, ParseStatus.valid, "");
    testCompletion(new SpaceNode(f, Space.added), ``, ParseStatus.valid, "");
    testCompletion(new SpaceNode(f, Space.added), ` `, ParseStatus.valid, "");
    testCompletion(new SpaceNode(f, Space.added), `  `, ParseStatus.valid, "");
    testCompletion(new SpaceNode(f, Space.required), ``, ParseStatus.empty, " ");
    testCompletion(new SpaceNode(f, Space.required), ` `, ParseStatus.valid, "");
    testCompletion(new SpaceNode(f, Space.required), `  `, ParseStatus.valid, "");
  });

  test("ParamDef", () => {
    testCompletion(new ParamDefNode(f), "", ParseStatus.empty, "<i>name</i> as <i>Type</i>");
    testCompletion(new ParamDefNode(f), "a", ParseStatus.incomplete, " as <i>Type</i>");
    testCompletion(new ParamDefNode(f), "ax", ParseStatus.incomplete, " as <i>Type</i>");
    testCompletion(new ParamDefNode(f), "ax ", ParseStatus.incomplete, "as <i>Type</i>");
    testCompletion(new ParamDefNode(f), "ax a", ParseStatus.incomplete, "s <i>Type</i>");
    testCompletion(new ParamDefNode(f), "ax as", ParseStatus.incomplete, " <i>Type</i>");
    testCompletion(new ParamDefNode(f), "ax as ", ParseStatus.incomplete, "<i>Type</i>");
    testCompletion(new ParamDefNode(f), "ax as Int", ParseStatus.valid, "");
  });

  test("BinaryExpression", () => {
    testCompletion(
      new BinaryExpression(f),
      "a + ",
      ParseStatus.incomplete,
      "<i>value or expression</i>",
    );
    testCompletion(
      new BinaryExpression(f),
      "a +",
      ParseStatus.incomplete,
      "<i>value or expression</i>",
    );
    testCompletion(
      new BinaryExpression(f),
      "a+ ",
      ParseStatus.incomplete,
      "<i>value or expression</i>",
    );
  });

  test("NewInstance", () => {
    testCompletion(new NewInstance(f), "new ", ParseStatus.incomplete, "<i>Type</i>()");
  });
  test("Func", () => {
    testCompletion(new TypeNode(f), "Fu", ParseStatus.valid, "");
    testCompletion(
      new TypeNode(f),
      "Func",
      ParseStatus.incomplete,
      "<of <i>InputType(s) </i>=> <i>ReturnType</i>>",
    );
    testCompletion(
      new TypeNode(f),
      "Func<",
      ParseStatus.incomplete,
      "of <i>InputType(s) </i>=> <i>ReturnType</i>>",
    );
    testCompletion(
      new TypeNode(f),
      "Func<of Foo",
      ParseStatus.incomplete,
      " => <i>ReturnType</i>>",
    );
    testCompletion(
      new TypeNode(f),
      "Func<of Foo,",
      ParseStatus.incomplete,
      "<i>Type</i> => <i>ReturnType</i>>",
    );
  });
  test("Func 2", () => {
    testCompletion(
      new ParamDefNode(f),
      "f as Func",
      ParseStatus.incomplete,
      "<of <i>InputType(s) </i>=> <i>ReturnType</i>>",
    );
  });
  test("Func 3", () => {
    testCompletion(
      new CSV(f, () => new ParamDefNode(f), 0),
      "f as Func",
      ParseStatus.incomplete,
      "<of <i>InputType(s) </i>=> <i>ReturnType</i>>",
    );
  });
  test("Lambda", () => {
    testCompletion(new Lambda(f), "lambda x as Int => x*x", ParseStatus.valid, "");
    testCompletion(
      new Lambda(f),
      "lambda ",
      ParseStatus.incomplete,
      "<i>name</i> as <i>Type</i>, ...=> <i>value or expression</i>",
    );
    testCompletion(
      new Lambda(f),
      "lambda x as Int ",
      ParseStatus.incomplete,
      "=> <i>value or expression</i>",
    );
    testCompletion(
      new Lambda(f),
      "lambda x as Int,",
      ParseStatus.incomplete,
      "<i>name</i> as <i>Type</i> => <i>value or expression</i>",
    );
    testCompletion(
      new Lambda(f),
      "lambda x as Int =",
      ParseStatus.incomplete,
      "> <i>value or expression</i>",
    );
    testCompletion(
      new Lambda(f),
      "lambda => ",
      ParseStatus.incomplete,
      "<i>value or expression</i>",
    );
  });
  test("#884", () => {
    testCompletion(
      new ExprNode(f),
      "3 +  ", //extra space
      ParseStatus.incomplete,
      "<i>value or expression</i>",
    );
  });
});
