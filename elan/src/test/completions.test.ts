
import { BinaryExpression } from "../frames/parse-nodes/binary-expression";
import { CSV } from "../frames/parse-nodes/csv";
import { ExprNode } from "../frames/parse-nodes/expr-node";
import { IdentifierNode } from "../frames/parse-nodes/identifier-node";
import { ParamDefNode } from "../frames/parse-nodes/param-def-node";
import { Space } from "../frames/parse-nodes/parse-node-helpers";
import { SpaceNode } from "../frames/parse-nodes/space-node";
import { TypeNode } from "../frames/parse-nodes/type-node";
import { ParseStatus } from "../frames/parse-status";
import { testCompletion } from "./testHelpers";

suite('Completions', () => {

    //TODO - merge the completions tests into the parse node tests

    test('Generic Type', () => {
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

    test('Tuple Type', () => {
        testCompletion(new TypeNode(), "(Foo, Bar)", ParseStatus.valid, "");
        testCompletion(new TypeNode(), "(", ParseStatus.incomplete, "<i>Type</i>)");
        testCompletion(new TypeNode(), "(Foo", ParseStatus.incomplete, ")");
        testCompletion(new TypeNode(), "(Foo,", ParseStatus.incomplete, "<i>Type</i>)");
        testCompletion(new TypeNode(), "(Foo, ", ParseStatus.incomplete, "<i>Type</i>)"); //TODO Stangely failing - completion shows '))' - even though it is working correctly in the web editor
        testCompletion(new TypeNode(), "(Foo,Bar", ParseStatus.incomplete, ")");
    });

    test('ExprNode', () => {
        testCompletion(new ExprNode(), "a + b", ParseStatus.valid, "");
        testCompletion(new ExprNode(), "a +", ParseStatus.incomplete, "<i>expression</i>");
        testCompletion(new ExprNode(), "a + ", ParseStatus.incomplete, "<i>expression</i>");
        testCompletion(new ExprNode(), "(", ParseStatus.incomplete, "<i>expression</i>)");
        testCompletion(new ExprNode(), "(a +", ParseStatus.incomplete, "<i>expression</i>)");
        testCompletion(new ExprNode(), "(a + b", ParseStatus.incomplete, ")");
        testCompletion(new ExprNode(), "(a + b)*", ParseStatus.incomplete, "<i>expression</i>");
    });

    test('CSV of Identifier', () => {
        testCompletion(new CSV(() => new IdentifierNode(), 0), "foo,", ParseStatus.incomplete, "<i>name</i>");
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
        testCompletion(new ParamDefNode(), "a", ParseStatus.incomplete, " as <i>Type</i>");
        testCompletion(new ParamDefNode(), "ax", ParseStatus.incomplete, " as <i>Type</i>");
        testCompletion(new ParamDefNode(), "ax ", ParseStatus.incomplete, "as <i>Type</i>");
        testCompletion(new ParamDefNode(), "ax a", ParseStatus.incomplete, "s <i>Type</i>");
        testCompletion(new ParamDefNode(), "ax as", ParseStatus.incomplete, " <i>Type</i>");
        testCompletion(new ParamDefNode(), "ax as ", ParseStatus.incomplete, "<i>Type</i>");
        testCompletion(new ParamDefNode(), "ax as Int", ParseStatus.valid, "");
    });

    test('BinaryExpression', () => {
        testCompletion(new BinaryExpression(), "a + ", ParseStatus.incomplete, "<i>expression</i>");
        testCompletion(new BinaryExpression(), "a +", ParseStatus.incomplete, "<i>expression</i>");
        testCompletion(new BinaryExpression(), "a+ ", ParseStatus.incomplete, "<i>expression</i>");
    });

    test('NewInstance', () => {
        testCompletion(new BinaryExpression(), "a + ", ParseStatus.incomplete, "<i>expression</i>");
        testCompletion(new BinaryExpression(), "a +", ParseStatus.incomplete, "<i>expression</i>");
        testCompletion(new BinaryExpression(), "a+ ", ParseStatus.incomplete, "<i>expression</i>");
    });

});