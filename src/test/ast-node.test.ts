/* eslint-disable @typescript-eslint/no-explicit-any */
import { ExprNode } from "../frames/parse-nodes/expr-node";
import {
  testAST,
  stubField,
  boolType,
  floatType,
  intType,
  stringType,
  unknownType,
} from "./testHelpers";
import { LitBoolean } from "../frames/parse-nodes/lit-boolean";
import { LitInt } from "../frames/parse-nodes/lit-int";
import { LitFloat } from "../frames/parse-nodes/lit-float";
import { UnaryExpression } from "../frames/parse-nodes/unary-expression";
import { BracketedExpression } from "../frames/parse-nodes/bracketed-expression";
import { LitString } from "../frames/parse-nodes/lit-string";
import { ImmutableListNode } from "../frames/parse-nodes/immutable-list-node";
import { IdentifierNode } from "../frames/parse-nodes/identifier-node";
import { FunctionCallNode } from "../frames/parse-nodes/function-call-node";
import { TypeNode } from "../frames/parse-nodes/type-node";
import { TypeSimpleOrGeneric } from "../frames/parse-nodes/type-simple-or-generic";
import { TypeSimpleNode } from "../frames/parse-nodes/type-simple-node";
import { TupleNode } from "../frames/parse-nodes/tuple-node";
import { Lambda } from "../frames/parse-nodes/lambda";
import { IfExpr } from "../frames/parse-nodes/if-expr";
import { ParamDefNode } from "../frames/parse-nodes/param-def-node";
import { Term } from "../frames/parse-nodes/term";
import { ImmutableListType } from "../frames/symbols/immutable-list-type";
import { LiteralNode } from "../frames/parse-nodes/literal-node";
import { LitTuple } from "../frames/parse-nodes/lit-tuple";
import { VarRefNode } from "../frames/parse-nodes/var-ref-node";
import { DeconstructedTuple } from "../frames/parse-nodes/deconstructed-tuple";
import { TupleType } from "../frames/symbols/tuple-type";
import { NewInstance } from "../frames/parse-nodes/new-instance";
import { EnumType } from "../frames/symbols/enum-type";
import { DictionaryNode } from "../frames/parse-nodes/dictionary-node";
import { LitValueNode } from "../frames/parse-nodes/lit-value";
import { ignore_test } from "./compiler/compiler-test-helpers";
import { DictionaryType } from "../frames/symbols/dictionary-type";
import { DeconstructedList } from "../frames/parse-nodes/deconstructed-list";
import { FunctionType } from "../frames/symbols/function-type";
import { ArrayListType } from "../frames/symbols/array-list-type";
import { ClassType } from "../frames/symbols/class-type";

suite("ASTNodes", () => {
  ignore_test("ExprNode", () => {
    testAST(new ExprNode(), stubField, "1 + 2", "Add (1) (2)", intType);
    testAST(new ExprNode(), stubField, "a", "a", intType);
    testAST(new ExprNode(), stubField, "a + b", "Add (a) (b)", floatType);
    testAST(new ExprNode(), stubField, "a + b - c", "Add (a) (Minus (b) (c))", floatType);
    testAST(new ExprNode(), stubField, "a is b", "Equals (a) (b)", boolType);

    testAST(new ExprNode(), stubField, "3 * 4 + x", "Multiply (3) (Add (4) (x))", intType);
    testAST(new ExprNode(), stubField, "3 * foo(5)", "Multiply (3) (Func Call foo (5))", intType);
    testAST(new ExprNode(), stubField, "points.foo(0.0)", "Func Call points.foo (0)", intType);
    const ast =
      "Func Call reduce (0, Lambda (Param s : Type String, Param p : Type ImmutableList<Type String>) => (Add (s) (Multiply (Func Call p.first ()) (Func Call p.first ()))))";
    testAST(
      new ExprNode(),
      stubField,
      "reduce(0.0, lambda s as String, p as ImmutableList<of String> => s + p.first() * p.first())",
      ast,
      intType,
    );
    testAST(new ExprNode(), stubField, "empty String", "Default (Type String)", stringType);
    testAST(
      new ExprNode(),
      stubField,
      "empty ImmutableList<of Int>",
      "Default (Type ImmutableList<Type Int>)",
      new ImmutableListType(intType),
    );

    const ast1 = "With (p) ({Set (x) (Add (p.x) (3)), Set (y) (Minus (p.y) (1))})";
    testAST(
      new ExprNode(),
      stubField,
      "p with {x set to p.x + 3, y set to p.y - 1}",
      ast1,
      new ClassType("p", false, false, [], undefined as any),
    );
  });

  test("Unary", () => {
    testAST(new UnaryExpression(), stubField, "-3", "Minus (3)", intType);
    testAST(new UnaryExpression(), stubField, " not true", "Not (true)", boolType);
    testAST(new UnaryExpression(), stubField, " not boo", "Not (boo)", boolType);
  });

  test("Term", () => {
    testAST(new Term(), stubField, "a", "a", intType);
  });

  test("Id", () => {
    testAST(new IdentifierNode(), stubField, `a`, "a", intType);
  });

  test("Boolean", () => {
    testAST(new LitBoolean(), stubField, " true", "true", boolType);
    testAST(new LitBoolean(), stubField, " false", "false", boolType);
  });

  test("Int", () => {
    testAST(new LitInt(), stubField, " 123", "123", intType);
  });

  test("Float", () => {
    testAST(new LitFloat(), stubField, " 1.1", "1.1", floatType);
  });

  test("Brackets", () => {
    testAST(new BracketedExpression(), stubField, "(3)", "(3)", intType);
    testAST(new BracketedExpression(), stubField, "(3 + 4)", "(Add (3) (4))", intType);
    testAST(new BracketedExpression(), stubField, "(a and not b)", "(And (a) (Not (b)))", boolType);
    testAST(
      new BracketedExpression(),
      stubField,
      "(3 * 4 + x)",
      "(Multiply (3) (Add (4) (x)))",
      intType,
    );
    testAST(
      new BracketedExpression(),
      stubField,
      "(3 * (4 + x))",
      "(Multiply (3) ((Add (4) (x))))",
      intType,
    );
  });

  test("String", () => {
    testAST(new LitString(), stubField, `"abc"`, `"abc"`, stringType);
    testAST(new LitString(), stubField, `"a"`, `"a"`, stringType);
    testAST(new LitString(), stubField, ` "9"`, `"9"`, stringType);
  });

  ignore_test("Function", () => {
    testAST(new FunctionCallNode(), stubField, `foo()`, "Func Call foo ()", intType);
    testAST(
      new FunctionCallNode(),
      stubField,
      `bar(x, 1, "hello")`,
      'Func Call bar (x, 1, "hello")',
      stringType,
    );
    testAST(new FunctionCallNode(), stubField, `bar.foo()`, "Func Call bar.foo ()", intType);
    testAST(new FunctionCallNode(), stubField, `global.foo()`, "Func Call foo ()", intType);
    testAST(
      new FunctionCallNode(),
      stubField,
      `library.foo()`,
      "Func Call library.foo ()",
      intType,
    );
    testAST(
      new FunctionCallNode(),
      stubField,
      `isBefore(b[0])`,
      "Func Call isBefore (b[0])",
      boolType,
    );
    testAST(
      new FunctionCallNode(),
      stubField,
      `a.isBefore(b[0])`,
      "Func Call a.isBefore (b[0])",
      boolType,
    );
    testAST(
      new FunctionCallNode(),
      stubField,
      `a[0].isBefore(b[0])`,
      "Func Call a[0].isBefore (b[0])",
      boolType,
    );
  });

  test("ImmutableList", () => {
    testAST(
      new ImmutableListNode(() => new LitInt()),
      stubField,
      `{1,2,3 ,4 , 5}`,
      "{1, 2, 3, 4, 5}",
      new ImmutableListType(intType),
    );
    testAST(
      new ImmutableListNode(() => new ImmutableListNode(() => new LitInt())),
      stubField,
      `{{1,2}, {3}, {4,5,6}}`,
      "{{1, 2}, {3}, {4, 5, 6}}",
      new ImmutableListType(new ImmutableListType(intType)),
    );
    testAST(
      new ImmutableListNode(() => new LitString()),
      stubField,
      `{"apple", "pear"}`,
      '{"apple", "pear"}',
      new ImmutableListType(stringType),
    );
    testAST(
      new ImmutableListNode(() => new LiteralNode()),
      stubField,
      `{"apple", "pear"}`,
      '{"apple", "pear"}',
      new ImmutableListType(stringType),
    );
    testAST(
      new ImmutableListNode(() => new ExprNode()),
      stubField,
      `{a, 3+ 4 , func(a, 3) -1, new Foo()}`,
      "{a, Add (3) (4), Minus (Func Call func (a, 3)) (1), new Type Foo()}",
      new ImmutableListType(intType),
    );
    testAST(
      new ImmutableListNode(() => new ExprNode()),
      stubField,
      `{a, 3+ 4 , foo(a, 3) -1}`,
      "{a, Add (3) (4), Minus (Func Call foo (a, 3)) (1)}",
      new ImmutableListType(intType),
    );
  });

  test("Types", () => {
    testAST(
      new TypeSimpleNode(),
      stubField,
      `Foo`,
      "Type Foo",
      new ClassType("Foo", false, false, [], undefined as any),
    );
    testAST(
      new TypeSimpleOrGeneric(),
      stubField,
      `Foo`,
      "Type Foo",
      new ClassType("Foo", false, false, [], undefined as any),
    );
    testAST(
      new TypeNode(),
      stubField,
      `(Foo, Bar)`,
      "Type Tuple<Type Foo, Type Bar>",
      new TupleType([
        new ClassType("Foo", false, false, [], undefined as any),
        new ClassType("Bar", false, false, [], undefined as any),
      ]),
    );
    testAST(
      new TypeNode(),
      stubField,
      `(Foo, (Bar, Yon, Qux))`,
      "Type Tuple<Type Foo, Type Tuple<Type Bar, Type Yon, Type Qux>>",
      new TupleType([
        new ClassType("Foo", false, false, [], undefined as any),
        new TupleType([
          new ClassType("Bar", false, false, [], undefined as any),
          new ClassType("Yon", false, false, [], undefined as any),
          new ClassType("Qux", false, false, [], undefined as any),
        ]),
      ]),
    );
  });

  test("Tuple", () => {
    testAST(
      new TupleNode(),
      stubField,
      `("foo", 3)`,
      '("foo", 3)',
      new TupleType([stringType, intType]),
    );
    testAST(
      new TupleNode(),
      stubField,
      `(foo, 3.0, bar(a), x)`,
      "(foo, 3, Func Call bar (a), x)",
      new TupleType([intType, floatType, stringType, intType]),
    );
  });

  ignore_test("Lambda", () => {
    testAST(
      new Lambda(),
      stubField,
      `lambda x as Int => x * x`,
      "Lambda (Param x : Type Int) => (Multiply (x) (x))",
      new FunctionType([intType], intType, false),
    );
    testAST(
      new Lambda(),
      stubField,
      `lambda s as Int, p as ImmutableList<of Int> => s + p.first()`,
      "Lambda (Param s : Type Int, Param p : Type ImmutableList<Type Int>) => (Add (s) (Func Call p.first ()))",
      new FunctionType([intType, new ImmutableListType(intType)], intType, false),
    );
    testAST(
      new Lambda(),
      stubField,
      `lambda bestSoFar as String, newWord as String => betterOf(bestSoFar, newWord, possAnswers)`,
      "Lambda (Param bestSoFar : Type String, Param newWord : Type String) => (Func Call betterOf (bestSoFar, newWord, possAnswers))",
      new FunctionType([stringType, stringType], stringType, false),
    );
  });

  test("If", () => {
    testAST(
      new IfExpr(),
      stubField,
      `if cell then Colour.green else Colour.black)`,
      "Ternary (cell) ? ((Colour).green) : ((Colour).black)",
      new EnumType("Colour"),
    );

    const ast2 = `Ternary (Equals (attempt[n]) ("*")) ? (attempt) : (Ternary (Func Call attempt.isYellow (target, n)) ? (Func Call attempt.setChar (n, "+")) : (Func Call attempt.setChar (n, "_")))`;
    testAST(
      new IfExpr(),
      stubField,
      `if attempt[n] is "*" then attempt else if attempt.isYellow(target, n) then attempt.setChar(n, "+") else attempt.setChar(n, "_")`,
      ast2,
      boolType,
    );

    const ast3 = `Ternary (Func Call attempt.isAlreadyMarkedGreen (n)) ? (target) : (Ternary (Func Call attempt.isYellow (target, n)) ? (Func Call target.setChar (Func Call target.indexOf (attempt[n]), ".")) : (target))`;
    testAST(
      new IfExpr(),
      stubField,
      `if attempt.isAlreadyMarkedGreen(n) then target else if attempt.isYellow(target, n) then target.setChar(target.indexOf(attempt[n]), ".") else target`,
      ast3,
      stringType,
    );

    testAST(new ParamDefNode(), stubField, `x as String`, "Param x : Type String", stringType);
  });

  test("Dictionary", () => {
    testAST(
      new DictionaryNode(
        () => new LitString(),
        () => new LitInt(),
      ),
      stubField,
      `["a":37]`,
      `[("a":37)]`,
      new DictionaryType(stringType, intType),
    );
    testAST(
      new DictionaryNode(
        () => new LitString(),
        () => new LitInt(),
      ),
      stubField,
      `["a":37, "b":42]`,
      `[("a":37), ("b":42)]`,
      new DictionaryType(stringType, intType),
    );
    testAST(
      new DictionaryNode(
        () => new LitValueNode(),
        () => new LitValueNode(),
      ),
      stubField,
      `["a":37, "b":42]`,
      `[("a":37), ("b":42)]`,
      new DictionaryType(stringType, intType),
    );
    testAST(
      new DictionaryNode(
        () => new LitValueNode(),
        () => new LitValueNode(),
      ),
      stubField,
      `["a":1.1, 5:"abc"]`,
      `[("a":1.1), (5:"abc")]`,
      new DictionaryType(stringType, floatType),
    );
  });

  test("LitTuple", () => {
    testAST(new LitTuple(), stubField, `(3,4)`, "(3, 4)", new TupleType([intType, intType]));
    testAST(
      new LitTuple(),
      stubField,
      `(3,"a", "hello", 4.1, true)`,
      `(3, "a", "hello", 4.1, true)`,
      new TupleType([intType, stringType, stringType, floatType, boolType]),
    );
    testAST(
      new LitTuple(),
      stubField,
      `((3,4), ("a", true))`,
      `((3, 4), ("a", true))`,
      new TupleType([new TupleType([intType, intType]), new TupleType([stringType, boolType])]),
    );

    testAST(
      new DeconstructedTuple(),
      stubField,
      `(a,b)`,
      "(a, b)",
      new TupleType([intType, floatType]),
    );
  });

  test("LitNode", () => {
    testAST(new LiteralNode(), stubField, `"hello"`, `"hello"`, stringType);
    testAST(new LiteralNode(), stubField, `123`, "123", intType);
    testAST(
      new LiteralNode(),
      stubField,
      `["a":37, 42:"b"]`,
      `[("a":37), (42:"b")]`,
      new DictionaryType(stringType, intType),
    );
    testAST(
      new LiteralNode(),
      stubField,
      `{(3,4), (5,6)}`,
      "{(3, 4), (5, 6)}",
      new ImmutableListType(new TupleType([intType, intType])),
    );
    testAST(
      new LiteralNode(),
      stubField,
      `[(3,4), (5,6)]`,
      "[(3, 4), (5, 6)]",
      new ArrayListType(new TupleType([intType, intType])),
    );
    testAST(
      new LiteralNode(),
      stubField,
      `{"apple", "pear"}`,
      `{"apple", "pear"}`,
      new ImmutableListType(stringType),
    );
    testAST(
      new LiteralNode(),
      stubField,
      `["apple", "pear"]`,
      `["apple", "pear"]`,
      new ArrayListType(stringType),
    );
  });

  test("Var", () => {
    testAST(new VarRefNode(), stubField, `a`, "a", intType);
    testAST(new VarRefNode(), stubField, `result`, "result", unknownType);
    testAST(new VarRefNode(), stubField, `lst`, "lst", new ImmutableListType(intType));
    testAST(new VarRefNode(), stubField, `lst[3]`, "lst[3]", intType);
    testAST(new VarRefNode(), stubField, `library.foo`, "library.foo", intType);
    //testAST(new VarRefNode(), stubField, `global.lst[3]`, "lst[3]", intType);
    testAST(
      new VarRefNode(),
      stubField,
      `bar.lst[..4]`,
      "bar.lst[Range ..4]",
      new ImmutableListType(intType),
    );
  });

  ignore_test("DeconList", () => {
    testAST(new DeconstructedList(), stubField, `[a:b]`, "[a:b]", unknownType);
  });

  test("New", () => {
    testAST(
      new NewInstance(),
      stubField,
      `new Foo()`,
      "new Type Foo()",
      new ClassType("Foo", false, false, [], undefined as any),
    );
  });

  test("Generic Function", () => {
    testAST(
      new FunctionCallNode(),
      stubField,
      `simpleGeneric(a)`,
      "Func Call simpleGeneric (a)",
      intType,
    );
    testAST(new FunctionCallNode(), stubField, `getKey(lst)`, "Func Call getKey (lst)", intType);
    testAST(
      new FunctionCallNode(),
      stubField,
      `getKey(lst1)`,
      "Func Call getKey (lst1)",
      stringType,
    );
  });
});
