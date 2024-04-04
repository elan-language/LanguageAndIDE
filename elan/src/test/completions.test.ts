
import { IdentifierField } from "../frames/fields/identifier-field";
import { BinaryExpression } from "../frames/parse-nodes/binary-expression";
import { CSV } from "../frames/parse-nodes/csv";
import { ExprNode } from "../frames/parse-nodes/expr-node";
import { IdentifierNode } from "../frames/parse-nodes/identifier-node";
import { ParamDefNode } from "../frames/parse-nodes/param-def-node";
import { Space } from "../frames/parse-nodes/parse-node-helpers";
import { SpaceNode } from "../frames/parse-nodes/space-node";
import { TypeNode } from "../frames/parse-nodes/type-node";
import { ParseStatus } from "../frames/parse-status";
import { BinaryExprAsn } from "../frames/syntax-nodes/binary-expr-asn";
import { stubField, testCompletion } from "./testHelpers";

suite('Completions', () => {

    test('Generic Type', () => {
        testCompletion(new TypeNode(), "", ParseStatus.empty, "Type");
        testCompletion(new TypeNode(), "Foo", ParseStatus.valid, "");
        testCompletion(new TypeNode(), "Foo<", ParseStatus.incomplete, "of Type>");
        testCompletion(new TypeNode(), "Foo<of", ParseStatus.incomplete, " Type>");
        testCompletion(new TypeNode(), "Foo<of ", ParseStatus.incomplete, "Type>");
        testCompletion(new TypeNode(), "Foo<of Bar", ParseStatus.incomplete, ">");
        testCompletion(new TypeNode(), "Foo<of Bar>", ParseStatus.valid, "");
    });

    test('Tuple Type', () => {
        testCompletion(new TypeNode(), "(Foo, Bar)", ParseStatus.valid, "");
        testCompletion(new TypeNode(), "(", ParseStatus.incomplete, "Type)");
        testCompletion(new TypeNode(), "(Foo", ParseStatus.incomplete, ")");
         testCompletion(new TypeNode(), "(Foo,", ParseStatus.incomplete, "Type)");
        testCompletion(new TypeNode(), "(Foo, ", ParseStatus.incomplete, "Type)");
        testCompletion(new TypeNode(), "(Foo,Bar", ParseStatus.incomplete, ")");
    });

    test('ExprNode', () => {
        testCompletion(new ExprNode(), "a + b", ParseStatus.valid, "");
        testCompletion(new ExprNode(), "a +", ParseStatus.incomplete, "expression");
        testCompletion(new ExprNode(), "a + ", ParseStatus.incomplete, "expression");
        testCompletion(new ExprNode(), "(", ParseStatus.incomplete, "expression)");
        testCompletion(new ExprNode(), "(a +", ParseStatus.incomplete, "expression)");
        testCompletion(new ExprNode(), "(a + b", ParseStatus.incomplete, ")");
        testCompletion(new ExprNode(), "(a + b)*", ParseStatus.incomplete, "expression");
    });

    test('CSV of Identifier', () => {
        testCompletion(new CSV(() => new IdentifierNode(), 0), "foo,", ParseStatus.incomplete, "name");
        testCompletion(new CSV(() => new IdentifierNode(), 0), "foo, ", ParseStatus.incomplete, "name");
        testCompletion(new CSV(() => new IdentifierNode(), 0), "foo, bar, yon", ParseStatus.valid, "");
    });

    test('SpaceNode', () => {
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

    test('ParamDef', () => {
		testCompletion(new ParamDefNode(), "", ParseStatus.empty, "");
        testCompletion(new ParamDefNode(), "a", ParseStatus.incomplete, " as Type");
        testCompletion(new ParamDefNode(), "ax", ParseStatus.incomplete, " as Type");
        testCompletion(new ParamDefNode(), "ax ", ParseStatus.incomplete, "as Type");
        testCompletion(new ParamDefNode(), "ax a", ParseStatus.incomplete, "s Type");
        testCompletion(new ParamDefNode(), "ax as", ParseStatus.incomplete, " Type");
        testCompletion(new ParamDefNode(), "ax as ", ParseStatus.incomplete, "Type");
        testCompletion(new ParamDefNode(), "ax as Int", ParseStatus.valid, "");
    });

    test('BinaryExpression', () => {
        testCompletion(new BinaryExpression(), "a + ", ParseStatus.incomplete, "expression");
        testCompletion(new BinaryExpression(), "a +", ParseStatus.incomplete, "expression");
        testCompletion(new BinaryExpression(), "a+ ", ParseStatus.incomplete, "expression");
    });

});