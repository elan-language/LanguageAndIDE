import assert from "assert";

import { Alternatives } from "../src/ide/frames/parse-nodes/alternatives";
import { ArgListNode } from "../src/ide/frames/parse-nodes/arg-list-node";
import { AssertActualNode } from "../src/ide/frames/parse-nodes/assert-actual-node";
import { AssignableNode } from "../src/ide/frames/parse-nodes/assignable-node";
import { BinaryExpression } from "../src/ide/frames/parse-nodes/binary-expression";
import { BinaryOperation } from "../src/ide/frames/parse-nodes/binary-operation";
import { CSV } from "../src/ide/frames/parse-nodes/csv";
import { ExprNode } from "../src/ide/frames/parse-nodes/expr-node";
import { IdentifierNode } from "../src/ide/frames/parse-nodes/identifier-node";
import { InstanceProcRef } from "../src/ide/frames/parse-nodes/instanceProcRef";
import { MethodCallNode } from "../src/ide/frames/parse-nodes/method-call-node";
import { MethodNameNode } from "../src/ide/frames/parse-nodes/method-name-node";
import { OptionalNode } from "../src/ide/frames/parse-nodes/optional-node";
import { allIds } from "../src/ide/frames/parse-nodes/parse-node-helpers";
import { ProcRefNode } from "../src/ide/frames/parse-nodes/proc-ref-node";
import { ReferenceNode } from "../src/ide/frames/parse-nodes/reference-node";
import { TermSimple } from "../src/ide/frames/parse-nodes/term-simple";
import { TypeNode } from "../src/ide/frames/parse-nodes/type-node";
import { TypeSimpleName } from "../src/ide/frames/parse-nodes/type-simple-name";
import { TypeSimpleOrGeneric } from "../src/ide/frames/parse-nodes/type-simple-or-generic";
import { ValueDefNode } from "../src/ide/frames/parse-nodes/value-def-node";
import { ParseStatus } from "../src/ide/frames/status-enums";
import { TokenType } from "../src/ide/frames/symbol-completion-helpers";
import { testSymbolCompletionSpec } from "./testHelpers";
import { hash } from "../src/ide/util";
import { StdLib } from "../src/compiler/standard-library/std-lib";
import { DefaultProfile } from "../src/ide/frames/default-profile";
import { FileImpl } from "../src/ide/frames/file-impl";
import { StubInputOutput } from "../src/ide/stub-input-output";
import { transforms } from "./compiler/compiler-test-helpers";

suite("Symbol Completion Spec", () => {
  const f = new FileImpl(
    hash,
    new DefaultProfile(),
    "",
    transforms(),
    new StdLib(new StubInputOutput()),
    true,
  );

  test("MethodCallNode", () => {
    testSymbolCompletionSpec(
      new MethodCallNode(f),
      "x",
      ParseStatus.incomplete,
      MethodNameNode.name,
      "x",
      [TokenType.method_function, TokenType.method_system],
      [],
    );
  });
  test("Reference1", () => {
    testSymbolCompletionSpec(
      new ReferenceNode(f),
      "r",
      ParseStatus.valid,
      ReferenceNode.name,
      "r",
      [
        TokenType.id_constant,
        TokenType.id_let,
        TokenType.id_parameter_regular,
        TokenType.id_property,
        TokenType.id_variable,
        TokenType.id_enumValue,
        TokenType.method_function,
        TokenType.method_system,
      ],
      ["ref"],
    );
  });
  test("Reference2", () => {
    testSymbolCompletionSpec(
      new ReferenceNode(f),
      "t",
      ParseStatus.valid,
      ReferenceNode.name,
      "t",
      [
        TokenType.id_constant,
        TokenType.id_let,
        TokenType.id_parameter_regular,
        TokenType.id_property,
        TokenType.id_variable,
        TokenType.id_enumValue,
        TokenType.method_function,
        TokenType.method_system,
      ],
      ["this"],
    );
  });
  test("Expression1", () => {
    testSymbolCompletionSpec(
      new ExprNode(f),
      "t",
      ParseStatus.valid,
      ExprNode.name,
      "t",
      [
        TokenType.id_constant,
        TokenType.id_let,
        TokenType.id_parameter_regular,
        TokenType.id_property,
        TokenType.id_variable,
        TokenType.id_enumValue,
        TokenType.method_function,
        TokenType.method_system,
        TokenType.type_enum,
      ],
      ["this,tuple"],
    );
  });
  test("Expression2", () => {
    testSymbolCompletionSpec(
      new ExprNode(f),
      "th",
      ParseStatus.valid,
      ReferenceNode.name, //because t could be start of literal boolean, or typeof  also
      "th",
      [
        TokenType.id_constant,
        TokenType.id_let,
        TokenType.id_parameter_regular,
        TokenType.id_property,
        TokenType.id_variable,
        TokenType.id_enumValue,
        TokenType.method_function,
        TokenType.method_system,
      ],
      ["this"],
    );
  });
  test("TermSimple", () => {
    testSymbolCompletionSpec(
      new TermSimple(f),
      "t",
      ParseStatus.valid,
      ReferenceNode.name,
      "t",
      [
        TokenType.id_constant,
        TokenType.id_let,
        TokenType.id_parameter_regular,
        TokenType.id_property,
        TokenType.id_variable,
        TokenType.id_enumValue,
        TokenType.method_function,
        TokenType.method_system,
      ],
      ["this"],
    );
  });
  test("Expression_Empty", () => {
    testSymbolCompletionSpec(
      new ExprNode(f),
      "",
      ParseStatus.empty,
      ExprNode.name,
      "",
      [
        TokenType.id_constant,
        TokenType.id_let,
        TokenType.id_parameter_regular,
        TokenType.id_property,
        TokenType.id_variable,
        TokenType.id_enumValue,
        TokenType.method_function,
        TokenType.method_system,
        TokenType.type_enum,
      ],
      ["new,copy,if,image,lambda,empty,this,ref,not,tuple"],
    );
  });
  test("Expression3", () => {
    testSymbolCompletionSpec(
      new ExprNode(f),
      "Foo",
      ParseStatus.incomplete,
      TypeSimpleName.name,
      "Foo",
      [
        TokenType.type_abstract,
        TokenType.type_concrete,
        TokenType.type_notInheritable,
        TokenType.type_enum,
      ],
      [],
    );
  });
  test("Expression4", () => {
    testSymbolCompletionSpec(
      new ExprNode(f),
      "empty List<of I",
      ParseStatus.incomplete,
      TypeNode.name,
      "I",
      [
        TokenType.type_abstract,
        TokenType.type_notInheritable,
        TokenType.type_concrete,
        TokenType.type_enum,
      ],
      [],
    );
  });
  test("Assignable", () => {
    testSymbolCompletionSpec(
      new AssignableNode(f),
      "property.f",
      ParseStatus.valid,
      IdentifierNode.name,
      "f",
      [
        TokenType.id_let,
        TokenType.id_parameter_regular,
        TokenType.id_property,
        TokenType.id_variable,
      ],
      [],
      "",
    );
  });
  test("InstanceProcRef", () => {
    testSymbolCompletionSpec(
      new InstanceProcRef(f),
      "foo.",
      ParseStatus.incomplete,
      MethodNameNode.name,
      "",
      [TokenType.method_procedure],
      [],
      "foo",
    );
  });
  test("Expression_new", () => {
    testSymbolCompletionSpec(
      new ExprNode(f),
      "new ",
      ParseStatus.incomplete,
      TypeSimpleOrGeneric.name,
      "",
      [TokenType.type_concrete],
      [],
      "none",
    );
  });
  test("Expression_functionDotCall", () => {
    testSymbolCompletionSpec(
      new ExprNode(f),
      "foo().",
      ParseStatus.incomplete,
      Alternatives.name,
      "",
      [TokenType.id_property, TokenType.method_function, TokenType.method_system],
      [],
    );
  });
  test("Expression_instanceDotCall", () => {
    testSymbolCompletionSpec(
      new ExprNode(f),
      "foo.",
      ParseStatus.incomplete,
      Alternatives.name,
      "",
      [TokenType.id_property, TokenType.method_function, TokenType.method_system],
      [],
    );
  });
  test("InstanceProcRef", () => {
    testSymbolCompletionSpec(
      new InstanceProcRef(f),
      "foo.wi",
      ParseStatus.valid,
      MethodNameNode.name,
      "wi",
      [TokenType.method_procedure],
      [],
      "foo",
    );
  });
  test("RegexForExtractingContext", () => {
    const rgx = /(.*\.)*(([A-Za-z_]*)(\(.*\))*)\..*/;
    const test1 = "foo.bar().yon((3+4)*5).qux";
    assert.equal(test1.match(rgx)![3], "yon");
    const test2 = "foo.bar().yon((3+4)*5).";
    assert.equal(test2.match(rgx)![3], "yon");
    const test3 = "foo.bar().yon((3+4)*5)";
    assert.equal(test3.match(rgx)![3], "bar");
    const test4 = "foo.";
    assert.equal(test4.match(rgx)![3], "foo");
    const test5 = "foo";
    assert.equal(rgx.test(test5), false);
    const test6 = "foo(bar)";
    assert.equal(rgx.test(test6), false);
  });
  test("BinaryExpression", () => {
    testSymbolCompletionSpec(
      new BinaryExpression(f),
      "a ",
      ParseStatus.incomplete,
      BinaryOperation.name,
      " ",
      [],
      ["and", "div", "is", "isnt", "mod", "or"],
      "",
    );
  });
  test("BinaryExpression", () => {
    testSymbolCompletionSpec(
      new ExprNode(f),
      "a i",
      ParseStatus.incomplete,
      BinaryOperation.name,
      " i",
      [],
      ["is", "isnt"],
      "",
    );
  });
  test("Start of an expression", () => {
    testSymbolCompletionSpec(
      new ExprNode(f),
      "n",
      ParseStatus.valid,
      ExprNode.name,
      "n",
      [
        TokenType.id_constant,
        TokenType.id_let,
        TokenType.id_parameter_regular,
        TokenType.id_property,
        TokenType.id_variable,
        TokenType.id_enumValue,
        TokenType.method_function,
        TokenType.method_system,
        TokenType.type_enum,
      ],
      ["new", "not"],
      "",
    );
  });
  test("Bracketed expression", () => {
    testSymbolCompletionSpec(
      new ExprNode(f),
      "(",
      ParseStatus.incomplete,
      ExprNode.name,
      "",
      [
        TokenType.id_constant,
        TokenType.id_let,
        TokenType.id_parameter_regular,
        TokenType.id_property,
        TokenType.id_variable,
        TokenType.id_enumValue,
        TokenType.method_function,
        TokenType.method_system,
        TokenType.type_enum,
      ],
      ["new,copy,if,image,lambda,empty,this,ref,not,tuple"],
      "",
    );
  });
  test("CSV minimum 1", () => {
    testSymbolCompletionSpec(
      new CSV(
        f,
        () => new IdentifierNode(f, new Set([TokenType.id_let, TokenType.id_variable])),
        1,
      ),
      "",
      ParseStatus.empty,
      IdentifierNode.name,
      "",
      [TokenType.id_let, TokenType.id_variable],
      [],
      "",
    );
  });
  test("CSV minimum 0", () => {
    testSymbolCompletionSpec(
      new CSV(
        f,
        () => new IdentifierNode(f, new Set([TokenType.id_let, TokenType.id_variable])),
        0,
      ),
      "",
      ParseStatus.valid,
      OptionalNode.name,
      "",
      [TokenType.id_let, TokenType.id_variable],
      [],
      "",
    );
  });
  test("CSV in a valid entry", () => {
    testSymbolCompletionSpec(
      new CSV(
        f,
        () => new IdentifierNode(f, new Set([TokenType.id_let, TokenType.id_variable])),
        0,
      ),
      "foo",
      ParseStatus.valid,
      IdentifierNode.name,
      "foo",
      [TokenType.id_let, TokenType.id_variable],
      [],
      "",
    );
  });
  test("CSV after a comma & space", () => {
    testSymbolCompletionSpec(
      new CSV(
        f,
        () => new IdentifierNode(f, new Set([TokenType.id_let, TokenType.id_variable])),
        0,
      ),
      "foo, ",
      ParseStatus.incomplete,
      IdentifierNode.name,
      "",
      [TokenType.id_let, TokenType.id_variable],
      [],
      "",
    );
  });
  test("CSV after a comma only", () => {
    testSymbolCompletionSpec(
      new CSV(
        f,
        () => new IdentifierNode(f, new Set([TokenType.id_let, TokenType.id_variable])),
        0,
      ),
      "foo,",
      ParseStatus.incomplete,
      IdentifierNode.name,
      "",
      [TokenType.id_let, TokenType.id_variable],
      [],
      "",
    );
  });
  test("new instance as a method argument #897", () => {
    testSymbolCompletionSpec(
      new ExprNode(f),
      "vg.add(new ",
      ParseStatus.incomplete,
      TypeSimpleOrGeneric.name,
      "",
      [TokenType.type_concrete],
      [],
      "none",
    );
  });
  test("'to' clause #902 - 1", () => {
    testSymbolCompletionSpec(
      new ExprNode(f),
      "new CircleVG() with ",
      ParseStatus.incomplete,
      IdentifierNode.name,
      "",
      [TokenType.id_property],
      [],
      "CircleVG",
    );
  });
  test("'to' clause #902 - 2", () => {
    testSymbolCompletionSpec(
      new ExprNode(f),
      "new CircleVG() with cx set to ",
      ParseStatus.incomplete,
      ExprNode.name,
      "",
      [
        TokenType.id_constant,
        TokenType.id_let,
        TokenType.id_parameter_regular,
        TokenType.id_property,
        TokenType.id_variable,
        TokenType.id_enumValue,
        TokenType.method_function,
        TokenType.method_system,
        TokenType.type_enum,
      ],
      ["new,copy,if,image,lambda,empty,this,ref,not,tuple"],
      "",
    );
  });
  test("'to' clause #902 - 3", () => {
    testSymbolCompletionSpec(
      new ExprNode(f),
      "copy c with ",
      ParseStatus.incomplete,
      IdentifierNode.name,
      "",
      [TokenType.id_property],
      [],
      "c",
    );
  });
  test("'to' clause #902 - 4", () => {
    testSymbolCompletionSpec(
      new ExprNode(f),
      "copy c with cx set to ",
      ParseStatus.incomplete,
      ExprNode.name,
      "",
      [
        TokenType.id_constant,
        TokenType.id_let,
        TokenType.id_parameter_regular,
        TokenType.id_property,
        TokenType.id_variable,
        TokenType.id_enumValue,
        TokenType.method_function,
        TokenType.method_system,
        TokenType.type_enum,
      ],
      ["new,copy,if,image,lambda,empty,this,ref,not,tuple"],
      "",
    );
  });
  test("Enum values #924", () => {
    testSymbolCompletionSpec(
      new ExprNode(f),
      "Direction.",
      ParseStatus.incomplete,
      IdentifierNode.name,
      "",
      [TokenType.id_enumValue],
      [""],
      "Direction",
    );
  });
  test("#909 Tuple 1", () => {
    testSymbolCompletionSpec(
      new ExprNode(f),
      "tuple(",
      ParseStatus.incomplete,
      ExprNode.name,
      "",
      allIds.concat([TokenType.method_function, TokenType.method_system, TokenType.type_enum]),
      ["new,copy,if,image,lambda,empty,this,ref,not,tuple"],
      "",
    );
  });
  test("#909 Tuple 2", () => {
    testSymbolCompletionSpec(
      new ExprNode(f),
      "(a",
      ParseStatus.incomplete,
      ReferenceNode.name,
      "a",
      allIds.concat([TokenType.method_function, TokenType.method_system]),
      [""],
      "",
    );
  });
  test("#909 Tuple 3", () => {
    testSymbolCompletionSpec(
      new ExprNode(f),
      "tuple(a, a",
      ParseStatus.incomplete,
      ReferenceNode.name,
      "a",
      allIds.concat([TokenType.method_function, TokenType.method_system]),
      [""],
      "",
    );
  });
  test("#909 List 1", () => {
    testSymbolCompletionSpec(
      new ExprNode(f),
      "[",
      ParseStatus.incomplete,
      TermSimple.name,
      "",
      allIds.concat([TokenType.method_function, TokenType.method_system, TokenType.type_enum]),
      ["new,copy,if,image,lambda,empty,this,ref,not,tuple"],
      "",
    );
  });
  test("#909 List 2", () => {
    testSymbolCompletionSpec(
      new ExprNode(f),
      "[a",
      ParseStatus.incomplete,
      TermSimple.name,
      "a",
      allIds.concat([TokenType.method_function, TokenType.method_system]),
      [""],
      "",
    );
  });
  test("#909 List 3", () => {
    testSymbolCompletionSpec(
      new ExprNode(f),
      "[a, a",
      ParseStatus.incomplete,
      ReferenceNode.name,
      "a",
      allIds.concat([TokenType.method_function, TokenType.method_system]),
      [""],
      "",
    );
  });
  test("#932 assert actual node", () => {
    testSymbolCompletionSpec(
      new AssertActualNode(f),
      "",
      ParseStatus.empty,
      AssertActualNode.name,
      "",
      [TokenType.id_let, TokenType.id_variable, TokenType.method_function, TokenType.method_system],
      [""],
      "",
    );
  });
  test("Proc Ref", () => {
    testSymbolCompletionSpec(
      new ProcRefNode(f),
      "",
      ParseStatus.empty,
      ProcRefNode.name,
      "",
      [
        TokenType.id_let,
        TokenType.id_parameter_regular,
        TokenType.id_property,
        TokenType.id_variable,
        TokenType.method_procedure,
      ],
      ["global,library,property"],
      "",
    );
  });
  test("ArgList", () => {
    testSymbolCompletionSpec(
      new ArgListNode(f, () => ""),
      "",
      ParseStatus.valid,
      ArgListNode.name,
      "",
      [],
      [""],
      "",
    );
  });
});
