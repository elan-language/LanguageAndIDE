
import { IdentifierField } from "../frames/fields/identifier-field";
import { CSV } from "../frames/parse-nodes/csv";
import { ExprNode } from "../frames/parse-nodes/expr-node";
import { IdentifierNode } from "../frames/parse-nodes/identifier-node";
import { TypeNode } from "../frames/parse-nodes/type-node";
import { ParseStatus } from "../frames/parse-status";
import { stubField, testCompletion } from "./testHelpers";

suite('Completions', () => {

    test('Generic Type', () => {
        testCompletion(new TypeNode(stubField), "", ParseStatus.empty, "Type");
        testCompletion(new TypeNode(stubField), "Foo", ParseStatus.valid, "");
        testCompletion(new TypeNode(stubField), "Foo<", ParseStatus.incomplete, "of Type>");
        testCompletion(new TypeNode(stubField), "Foo<of", ParseStatus.incomplete, "Type>");
        testCompletion(new TypeNode(stubField), "Foo<of ", ParseStatus.incomplete, "Type>");
        testCompletion(new TypeNode(stubField), "Foo<of Bar", ParseStatus.incomplete, ">");
        testCompletion(new TypeNode(stubField), "Foo<of Bar>", ParseStatus.valid, "");
    });

    test('Tuple Type', () => {
        testCompletion(new TypeNode(stubField), "(Foo, Bar)", ParseStatus.valid, "");
        testCompletion(new TypeNode(stubField), "(", ParseStatus.incomplete, "Type)");
        testCompletion(new TypeNode(stubField), "(Foo", ParseStatus.incomplete, ")");
/*         testCompletion(new TypeNode(stubField), "(Foo,", ParseStatus.incomplete, "Type)");
        testCompletion(new TypeNode(stubField), "(Foo, ", ParseStatus.incomplete, "Type)");
        testCompletion(new TypeNode(stubField), "(Foo,Bar", ParseStatus.incomplete, ")"); */
    });

    test('ExprNode', () => {
        testCompletion(new ExprNode(stubField), "a + b", ParseStatus.valid, "");
        testCompletion(new ExprNode(stubField), "a +", ParseStatus.incomplete, "expression");
        testCompletion(new ExprNode(stubField), "a + ", ParseStatus.incomplete, "expression");
        testCompletion(new ExprNode(stubField), "(", ParseStatus.incomplete, "expression)");
        testCompletion(new ExprNode(stubField), "(a +", ParseStatus.incomplete, "expression)");
        testCompletion(new ExprNode(stubField), "(a + b", ParseStatus.incomplete, ")");
        testCompletion(new ExprNode(stubField), "(a + b)*", ParseStatus.incomplete, "expression");
    });

    test('CSV of Identifier', () => {
        testCompletion(new CSV(() => new IdentifierNode(stubField), 0, stubField), "foo,", ParseStatus.incomplete, "name");
        testCompletion(new CSV(() => new IdentifierNode(stubField), 0, stubField), "foo, ", ParseStatus.incomplete, "name");
        testCompletion(new CSV(() => new IdentifierNode(stubField), 0, stubField), "foo, bar, yon", ParseStatus.valid, "");
    });

});