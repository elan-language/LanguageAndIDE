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

suite("Symbol Completion Spec", () => {
  test("MethodCallNode", () => {
    testSymbolCompletionSpec(
      new MethodCallNode(),
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
      new ReferenceNode(),
      "r",
      ParseStatus.valid,
      ReferenceNode.name,
      "r",
      [
        TokenType.id_constant,
        TokenType.id_let,
        TokenType.id_parameter_out,
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
      new ReferenceNode(),
      "t",
      ParseStatus.valid,
      ReferenceNode.name,
      "t",
      [
        TokenType.id_constant,
        TokenType.id_let,
        TokenType.id_parameter_out,
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
      new ExprNode(),
      "t",
      ParseStatus.valid,
      ExprNode.name,
      "t",
      [
        TokenType.id_constant,
        TokenType.id_let,
        TokenType.id_parameter_out,
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
      new ExprNode(),
      "th",
      ParseStatus.valid,
      ReferenceNode.name, //because t could be start of literal boolean, or typeof  also
      "th",
      [
        TokenType.id_constant,
        TokenType.id_let,
        TokenType.id_parameter_out,
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
      new TermSimple(),
      "t",
      ParseStatus.valid,
      ReferenceNode.name,
      "t",
      [
        TokenType.id_constant,
        TokenType.id_let,
        TokenType.id_parameter_out,
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
      new ExprNode(),
      "",
      ParseStatus.empty,
      ExprNode.name,
      "",
      [
        TokenType.id_constant,
        TokenType.id_let,
        TokenType.id_parameter_out,
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
      new ExprNode(),
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
      new ExprNode(),
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
      new AssignableNode(),
      "property.f",
      ParseStatus.valid,
      IdentifierNode.name,
      "f",
      [TokenType.id_property],
      [],
      "",
    );
  });
  test("InstanceProcRef", () => {
    testSymbolCompletionSpec(
      new InstanceProcRef(),
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
      new ExprNode(),
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
      new ExprNode(),
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
      new ExprNode(),
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
      new InstanceProcRef(),
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
      new BinaryExpression(),
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
      new ExprNode(),
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
      new ExprNode(),
      "n",
      ParseStatus.valid,
      ExprNode.name,
      "n",
      [
        TokenType.id_constant,
        TokenType.id_let,
        TokenType.id_parameter_out,
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
      new ExprNode(),
      "(",
      ParseStatus.incomplete,
      ExprNode.name,
      "",
      [
        TokenType.id_constant,
        TokenType.id_let,
        TokenType.id_parameter_out,
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
      new CSV(() => new IdentifierNode(new Set([TokenType.id_let, TokenType.id_variable])), 1),
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
      new CSV(() => new IdentifierNode(new Set([TokenType.id_let, TokenType.id_variable])), 0),
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
      new CSV(() => new IdentifierNode(new Set([TokenType.id_let, TokenType.id_variable])), 0),
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
      new CSV(() => new IdentifierNode(new Set([TokenType.id_let, TokenType.id_variable])), 0),
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
      new CSV(() => new IdentifierNode(new Set([TokenType.id_let, TokenType.id_variable])), 0),
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
      new ExprNode(),
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
      new ExprNode(),
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
      new ExprNode(),
      "new CircleVG() with cx set to ",
      ParseStatus.incomplete,
      ExprNode.name,
      "",
      [
        TokenType.id_constant,
        TokenType.id_let,
        TokenType.id_parameter_out,
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
      new ExprNode(),
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
      new ExprNode(),
      "copy c with cx set to ",
      ParseStatus.incomplete,
      ExprNode.name,
      "",
      [
        TokenType.id_constant,
        TokenType.id_let,
        TokenType.id_parameter_out,
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
      new ExprNode(),
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
      new ExprNode(),
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
      new ExprNode(),
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
      new ExprNode(),
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
      new ExprNode(),
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
      new ExprNode(),
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
      new ExprNode(),
      "[a, a",
      ParseStatus.incomplete,
      ReferenceNode.name,
      "a",
      allIds.concat([TokenType.method_function, TokenType.method_system]),
      [""],
      "",
    );
  });
  test("#909 ImmutableList 1", () => {
    testSymbolCompletionSpec(
      new ExprNode(),
      "{",
      ParseStatus.incomplete,
      TermSimple.name,
      "",
      allIds.concat([TokenType.method_function, TokenType.method_system, TokenType.type_enum]),
      ["new,copy,if,image,lambda,empty,this,ref,not,tuple"],
      "",
    );
  });
  test("#909 ImmutableList 2", () => {
    testSymbolCompletionSpec(
      new ExprNode(),
      "{a",
      ParseStatus.incomplete,
      TermSimple.name,
      "a",
      allIds.concat([TokenType.method_function, TokenType.method_system]),
      [""],
      "",
    );
  });
  test("#909 ImmutableList 3", () => {
    testSymbolCompletionSpec(
      new ExprNode(),
      "{a, a",
      ParseStatus.incomplete,
      ReferenceNode.name,
      "a",
      allIds.concat([TokenType.method_function, TokenType.method_system]),
      [""],
      "",
    );
  });
  test("#930 var def node", () => {
    testSymbolCompletionSpec(
      new ValueDefNode(),
      "",
      ParseStatus.empty,
      ValueDefNode.name,
      "",
      [],
      [""],
      "",
    );
  });
  test("#932 assert actual node", () => {
    testSymbolCompletionSpec(
      new AssertActualNode(),
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
      new ProcRefNode(),
      "",
      ParseStatus.empty,
      ProcRefNode.name,
      "",
      [
        TokenType.id_let,
        TokenType.id_parameter_out,
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
      new ArgListNode(() => ""),
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
