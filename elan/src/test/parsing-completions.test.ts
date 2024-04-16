
import { BinaryExpression } from "../frames/parse-nodes/binary-expression";
import { CSV } from "../frames/parse-nodes/csv";
import { ExprNode } from "../frames/parse-nodes/expr-node";
import { IdentifierNode } from "../frames/parse-nodes/identifier-node";
import { NewInstance } from "../frames/parse-nodes/new-instance";
import { ParamDefNode } from "../frames/parse-nodes/param-def-node";
import { Space } from "../frames/parse-nodes/parse-node-helpers";
import { SpaceNode } from "../frames/parse-nodes/space-node";
import { TypeNode } from "../frames/parse-nodes/type-node";
import { ParseStatus } from "../frames/parse-status";
import { testCompletion } from "./testHelpers";

suite('Parsing - Completions', () => {

    //TODO - merge the completions tests into the parse node tests

    test('Generic Type', () => {
        testCompletion(new TypeNode(), "", ParseStatus.empty, "<pr>Type</pr>");
        testCompletion(new TypeNode(), "Foo", ParseStatus.valid, "");
        testCompletion(new TypeNode(), "Foo<of ", ParseStatus.incomplete, "<pr>Type</pr>>");
        testCompletion(new TypeNode(), "Foo<", ParseStatus.incomplete, "of <pr>Type</pr>>");
        testCompletion(new TypeNode(), "Foo<of", ParseStatus.incomplete, " <pr>Type</pr>>");
        testCompletion(new TypeNode(), "Foo<of Bar", ParseStatus.incomplete, ">");
        testCompletion(new TypeNode(), "Foo<of Bar>", ParseStatus.valid, "");
        testCompletion(new TypeNode(), "Foo<of Bar,", ParseStatus.incomplete, "<pr>Type</pr>>");
        testCompletion(new TypeNode(), "Foo<of (Bar,", ParseStatus.incomplete, "<pr>Type</pr>)>");
    });

    test('Tuple Type', () => {
        testCompletion(new TypeNode(), "(Foo, Bar)", ParseStatus.valid, "");
        testCompletion(new TypeNode(), "(", ParseStatus.incomplete, "<pr>Type</pr>)");
        testCompletion(new TypeNode(), "(Foo", ParseStatus.incomplete, ")");
        testCompletion(new TypeNode(), "(Foo,", ParseStatus.incomplete, "<pr>Type</pr>)");
        testCompletion(new TypeNode(), "(Foo, ", ParseStatus.incomplete, "<pr>Type</pr>)"); //TODO Stangely failing - completion shows '))' - even though it is working correctly in the web editor
        testCompletion(new TypeNode(), "(Foo,Bar", ParseStatus.incomplete, ")");
    });

    test('ExprNode', () => {
        testCompletion(new ExprNode(), "a + b", ParseStatus.valid, "");
        testCompletion(new ExprNode(), "a +", ParseStatus.incomplete, " <pr>expression</pr>");
        testCompletion(new ExprNode(), "a + ", ParseStatus.incomplete, "<pr>expression</pr>");
        testCompletion(new ExprNode(), "(", ParseStatus.incomplete, "<pr>expression</pr>)");
        testCompletion(new ExprNode(), "(a +", ParseStatus.incomplete, " <pr>expression</pr>)");
        testCompletion(new ExprNode(), "(a + b", ParseStatus.incomplete, ")");
        testCompletion(new ExprNode(), "(a + b)*", ParseStatus.incomplete, " <pr>expression</pr>");
    });

    test('CSV of Identifier', () => {
        testCompletion(new CSV(() => new IdentifierNode(), 0), "foo,", ParseStatus.incomplete, "<pr>name</pr>");
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
		testCompletion(new ParamDefNode(), "", ParseStatus.empty, "<pr></pr>");
        testCompletion(new ParamDefNode(), "a", ParseStatus.incomplete, " as <pr>Type</pr>");
        testCompletion(new ParamDefNode(), "ax", ParseStatus.incomplete, " as <pr>Type</pr>");
        testCompletion(new ParamDefNode(), "ax ", ParseStatus.incomplete, "as <pr>Type</pr>");
        testCompletion(new ParamDefNode(), "ax a", ParseStatus.incomplete, "s <pr>Type</pr>");
        testCompletion(new ParamDefNode(), "ax as", ParseStatus.incomplete, " <pr>Type</pr>");
        testCompletion(new ParamDefNode(), "ax as ", ParseStatus.incomplete, "<pr>Type</pr>");
        testCompletion(new ParamDefNode(), "ax as Int", ParseStatus.valid, "");
    });

    test('BinaryExpression', () => {
        testCompletion(new BinaryExpression(), "a + ", ParseStatus.incomplete, "<pr>expression</pr>");
        testCompletion(new BinaryExpression(), "a +", ParseStatus.incomplete, " <pr>expression</pr>");
        testCompletion(new BinaryExpression(), "a+ ", ParseStatus.incomplete, "<pr>expression</pr>");
    });

    test('NewInstance', () => {
        testCompletion(new NewInstance(), "new ", ParseStatus.incomplete, "<pr>Type</pr>(<pr>arguments</pr>)");
    });
    test('Func', () => {
        testCompletion(new TypeNode(), "Fu", ParseStatus.valid, "");
        testCompletion(new TypeNode(), "Func", ParseStatus.valid, "");
        testCompletion(new TypeNode(), "Func<", ParseStatus.incomplete, "of <pr>Type(s)</pr> => <pr>Type</pr>>");
        testCompletion(new TypeNode(), "Func<of Foo", ParseStatus.incomplete, " => <pr>Type</pr>>");
        testCompletion(new TypeNode(), "Func<of Foo,", ParseStatus.incomplete, "<pr>Type</pr> => <pr>Type</pr>>");
    });

});