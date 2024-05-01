
import { BinaryExpression } from "../frames/parse-nodes/binary-expression";
import { CSV } from "../frames/parse-nodes/csv";
import { ExprNode } from "../frames/parse-nodes/expr-node";
import { IdentifierNode } from "../frames/parse-nodes/identifier-node";
import { NewInstance } from "../frames/parse-nodes/new-instance";
import { ParamDefNode } from "../frames/parse-nodes/param-def-node";
import { Space } from "../frames/parse-nodes/parse-node-helpers";
import { SpaceNode } from "../frames/parse-nodes/space-node";
import { TypeNode } from "../frames/parse-nodes/type-node";
import { CodeStatus } from "../frames/code-status";
import { testCompletion } from "./testHelpers";

suite('Parsing - Completions', () => {

    //TODO - merge the completions tests into the parse node tests

    test('Generic Type', () => {
        testCompletion(new TypeNode(), "", CodeStatus.empty, "<pr>Type</pr>");
        testCompletion(new TypeNode(), "Foo", CodeStatus.valid, "");
        testCompletion(new TypeNode(), "Foo<of ", CodeStatus.incomplete, "<pr>Type</pr>>");
        testCompletion(new TypeNode(), "Foo<", CodeStatus.incomplete, "of <pr>Type</pr>>");
        testCompletion(new TypeNode(), "Foo<of", CodeStatus.incomplete, " <pr>Type</pr>>");
        testCompletion(new TypeNode(), "Foo<of Bar", CodeStatus.incomplete, ">");
        testCompletion(new TypeNode(), "Foo<of Bar>", CodeStatus.valid, "");
        testCompletion(new TypeNode(), "Foo<of Bar,", CodeStatus.incomplete, "<pr>Type</pr>>");
        testCompletion(new TypeNode(), "Foo<of (Bar,", CodeStatus.incomplete, "<pr>Type</pr>)>");
    });

    test('Tuple Type', () => {
        testCompletion(new TypeNode(), "(Foo, Bar)", CodeStatus.valid, "");
        testCompletion(new TypeNode(), "(", CodeStatus.incomplete, "<pr>Type</pr>)");
        testCompletion(new TypeNode(), "(Foo", CodeStatus.incomplete, ")");
        testCompletion(new TypeNode(), "(Foo,", CodeStatus.incomplete, "<pr>Type</pr>)");
        testCompletion(new TypeNode(), "(Foo, ", CodeStatus.incomplete, "<pr>Type</pr>)"); //TODO Stangely failing - completion shows '))' - even though it is working correctly in the web editor
        testCompletion(new TypeNode(), "(Foo,Bar", CodeStatus.incomplete, ")");
    });

    test('ExprNode', () => {
        testCompletion(new ExprNode(), "a + b", CodeStatus.valid, "");
        testCompletion(new ExprNode(), "a +", CodeStatus.incomplete, "<pr>expression</pr>");
        testCompletion(new ExprNode(), "a + ", CodeStatus.incomplete, "<pr>expression</pr>");
        testCompletion(new ExprNode(), "(", CodeStatus.incomplete, "<pr>expression</pr>)");
        testCompletion(new ExprNode(), "(a +", CodeStatus.incomplete, "<pr>expression</pr>)");
        testCompletion(new ExprNode(), "(a + b", CodeStatus.incomplete, ")");
        testCompletion(new ExprNode(), "(a + b)*", CodeStatus.incomplete, "<pr>expression</pr>");
    });

    test('CSV of Identifier', () => {
        testCompletion(new CSV(() => new IdentifierNode(), 0), "foo,", CodeStatus.incomplete, "<pr>name</pr>");
        testCompletion(new CSV(() => new IdentifierNode(), 0), "foo, bar, yon", CodeStatus.valid, "");
    });

    test('SpaceNode', () => {
		testCompletion(new SpaceNode(Space.ignored), ``, CodeStatus.valid, "");
		testCompletion(new SpaceNode(Space.ignored), ` `, CodeStatus.valid, "");
		testCompletion(new SpaceNode(Space.ignored), `  `, CodeStatus.valid, "");
		testCompletion(new SpaceNode(Space.added), ``, CodeStatus.valid, "");
		testCompletion(new SpaceNode(Space.added), ` `, CodeStatus.valid, "");
		testCompletion(new SpaceNode(Space.added), `  `, CodeStatus.valid, "");
		testCompletion(new SpaceNode(Space.required), ``, CodeStatus.empty, " ");
		testCompletion(new SpaceNode(Space.required), ` `, CodeStatus.valid, "");
		testCompletion(new SpaceNode(Space.required), `  `, CodeStatus.valid, "");
	});

    test('ParamDef', () => {
		testCompletion(new ParamDefNode(), "", CodeStatus.empty, "<pr></pr>");
        testCompletion(new ParamDefNode(), "a", CodeStatus.incomplete, " as <pr>Type</pr>");
        testCompletion(new ParamDefNode(), "ax", CodeStatus.incomplete, " as <pr>Type</pr>");
        testCompletion(new ParamDefNode(), "ax ", CodeStatus.incomplete, "as <pr>Type</pr>");
        testCompletion(new ParamDefNode(), "ax a", CodeStatus.incomplete, "s <pr>Type</pr>");
        testCompletion(new ParamDefNode(), "ax as", CodeStatus.incomplete, " <pr>Type</pr>");
        testCompletion(new ParamDefNode(), "ax as ", CodeStatus.incomplete, "<pr>Type</pr>");
        testCompletion(new ParamDefNode(), "ax as Int", CodeStatus.valid, "");
    });

    test('BinaryExpression', () => {
        testCompletion(new BinaryExpression(), "a + ", CodeStatus.incomplete, "<pr>expression</pr>");
        testCompletion(new BinaryExpression(), "a +", CodeStatus.incomplete, "<pr>expression</pr>");
        testCompletion(new BinaryExpression(), "a+ ", CodeStatus.incomplete, "<pr>expression</pr>");
    });

    test('NewInstance', () => {
        testCompletion(new NewInstance(), "new ", CodeStatus.incomplete, "<pr>Type</pr>(<pr>arguments</pr>)");
    });
    test('Func', () => {
        testCompletion(new TypeNode(), "Fu", CodeStatus.valid, "");
        testCompletion(new TypeNode(), "Func", CodeStatus.valid, "");
        testCompletion(new TypeNode(), "Func<", CodeStatus.incomplete, "of <pr>Type(s)</pr> => <pr>Type</pr>>");
        testCompletion(new TypeNode(), "Func<of Foo", CodeStatus.incomplete, " => <pr>Type</pr>>");
        testCompletion(new TypeNode(), "Func<of Foo,", CodeStatus.incomplete, "<pr>Type</pr> => <pr>Type</pr>>");
    });

});