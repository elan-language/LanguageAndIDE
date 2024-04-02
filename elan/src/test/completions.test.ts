
import { IdentifierField } from "../frames/fields/identifier-field";
import { CSV } from "../frames/parse-nodes/csv";
import { ExprNode } from "../frames/parse-nodes/expr-node";
import { IdentifierNode } from "../frames/parse-nodes/identifier-node";
import { TypeNode } from "../frames/parse-nodes/type-node";
import { ParseStatus } from "../frames/parse-status";
import { stubField, testCompletion } from "./testHelpers";

suite('Completions', () => {

    test('Generic Type', () => {
        testCompletion(new TypeNode(), "", ParseStatus.empty, "Type");
        testCompletion(new TypeNode(), "Foo", ParseStatus.valid, "");
        testCompletion(new TypeNode(), "Foo<", ParseStatus.incomplete, "of Type>");
        testCompletion(new TypeNode(), "Foo<of", ParseStatus.incomplete, "Type>");
        testCompletion(new TypeNode(), "Foo<of ", ParseStatus.incomplete, "Type>");
        testCompletion(new TypeNode(), "Foo<of Bar", ParseStatus.incomplete, ">");
        testCompletion(new TypeNode(), "Foo<of Bar>", ParseStatus.valid, "");
    });

    test('Tuple Type', () => {
        testCompletion(new TypeNode(), "(Foo, Bar)", ParseStatus.valid, "");
        testCompletion(new TypeNode(), "(", ParseStatus.incomplete, "Type)");
        testCompletion(new TypeNode(), "(Foo", ParseStatus.incomplete, ")");
/*         testCompletion(new TypeNode(), "(Foo,", ParseStatus.incomplete, "Type)");
        testCompletion(new TypeNode(), "(Foo, ", ParseStatus.incomplete, "Type)");
        testCompletion(new TypeNode(), "(Foo,Bar", ParseStatus.incomplete, ")"); */
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

});