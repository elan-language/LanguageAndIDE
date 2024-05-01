import * as vscode from 'vscode';
import { ExprNode } from '../frames/parse-nodes/expr-node';
import { CodeStatus } from '../frames/code-status';
import { testNodeParse } from './testHelpers';
import { LitBool } from '../frames/parse-nodes/lit-bool';
import { LitInt } from '../frames/parse-nodes/lit-int';
import { LitNumber } from '../frames/parse-nodes/lit-number';
import { BinaryOperation } from '../frames/parse-nodes/binary-operation';
import { UnaryExpression } from '../frames/parse-nodes/unary-expression';
import { BracketedExpression } from '../frames/parse-nodes/bracketed-expression';
import { OptionalNode } from '../frames/parse-nodes/optional-node';
import { LitString } from '../frames/parse-nodes/lit-string';
import { ListNode } from '../frames/parse-nodes/list-node';
import { Multiple } from '../frames/parse-nodes/multiple';
import { CSV } from '../frames/parse-nodes/csv';
import { IdentifierNode } from '../frames/parse-nodes/identifier-node';
import { FunctionCallNode } from '../frames/parse-nodes/function-call-node';
import { KeywordNode } from '../frames/parse-nodes/keyword-node';
import { TypeNode } from '../frames/parse-nodes/type-node';
import { TypeWithOptGenerics } from '../frames/parse-nodes/type-with-opt-generics';
import { TypeSimpleNode } from '../frames/parse-nodes/type-simple-node';
import { TupleNode } from '../frames/parse-nodes/tuple-node';
import { Lambda } from '../frames/parse-nodes/lambda';
import { IfExpr } from '../frames/parse-nodes/if-expr';
import { ParamDefNode } from '../frames/parse-nodes/param-def-node';
import { Term } from '../frames/parse-nodes/term';
import { KVPnode } from '../frames/parse-nodes/kvp-node';
import { Dictionary } from '../frames/parse-nodes/dictionary';
import { LitValueNode } from '../frames/parse-nodes/lit-value';
import { LiteralNode } from '../frames/parse-nodes/literal-node';
import { LitTuple } from '../frames/parse-nodes/lit-tuple';
import { VarRefNode } from '../frames/parse-nodes/var-ref-node';
import { DeconstructedTuple } from '../frames/parse-nodes/deconstructed-tuple';
import { DeconstructedList } from '../frames/parse-nodes/deconstructed-list';
import { abstractKeyword } from '../frames/keywords';
import { SpaceNode } from '../frames/parse-nodes/space-node';
import { Space } from '../frames/parse-nodes/parse-node-helpers';
import { CommaNode } from '../frames/parse-nodes/comma-node';
import { SetClause } from '../frames/parse-nodes/set-clause';
import { WithClause } from '../frames/parse-nodes/with-clause';
import { NewInstance } from '../frames/parse-nodes/new-instance';
import { InstanceNode } from '../frames/parse-nodes/instanceNode';
import { StringInterpolation } from '../frames/parse-nodes/string-interpolation';
import { Regexes } from '../frames/fields/regexes';
import { Alternatives } from '../frames/parse-nodes/alternatives';
import { RegExMatchNode } from '../frames/parse-nodes/regex-match-node';
import { BinaryExpression } from '../frames/parse-nodes/binary-expression';
import { InstanceProcRef } from '../frames/parse-nodes/instanceProcRef';

suite('Parsing Nodes', () => {

	vscode.window.showInformationMessage('Start all unit tests.');
	test('UnaryExpression', () => {
		testNodeParse(new UnaryExpression(), "", CodeStatus.empty, "", "", "", "");
		testNodeParse(new UnaryExpression(), "-3", CodeStatus.valid, "-3", "", "-3", "");
		testNodeParse(new UnaryExpression(), " not foo", CodeStatus.valid, " not foo", "", "not foo", "");
		testNodeParse(new UnaryExpression(), "-", CodeStatus.incomplete, "-", "", "-", "");
		testNodeParse(new UnaryExpression(), "+4", CodeStatus.invalid, "", "+4", "", "");
	});
	test('BinOp', () => {
		testNodeParse(new BinaryOperation(), "", CodeStatus.empty, "", "", "");
		testNodeParse(new BinaryOperation(), "  ", CodeStatus.empty, "", "", "");
		testNodeParse(new BinaryOperation(), "+", CodeStatus.valid, "+", "", "+", "");
		testNodeParse(new BinaryOperation(), "-", CodeStatus.valid, "-", "", "-", "");
		testNodeParse(new BinaryOperation(), "*", CodeStatus.valid, "*", "", "*", "");
		testNodeParse(new BinaryOperation(), "/", CodeStatus.valid, "/", "", "/", "");
		testNodeParse(new BinaryOperation(), ">", CodeStatus.valid, ">", "", ">", "");
		testNodeParse(new BinaryOperation(), "<", CodeStatus.valid, "<", "", "<", "");
		testNodeParse(new BinaryOperation(), ">=", CodeStatus.valid, ">=", "", ">=", "");
		testNodeParse(new BinaryOperation(), "<=", CodeStatus.valid, "<=", "", "<=", "");
		testNodeParse(new BinaryOperation(), "< =", CodeStatus.valid, "<", " =", "<", "");

		testNodeParse(new BinaryOperation(), "is", CodeStatus.valid, "is", "", "is", "");
		testNodeParse(new BinaryOperation(), "is not", CodeStatus.valid, "is not", "", "is not", "");
		testNodeParse(new BinaryOperation(), "and", CodeStatus.valid, "and", "", "and", "");
		testNodeParse(new BinaryOperation(), "or", CodeStatus.valid, "or", "", "or", "");
		testNodeParse(new BinaryOperation(), "xor", CodeStatus.valid, "xor", "", "xor", "");
		testNodeParse(new BinaryOperation(), "mod", CodeStatus.valid, "mod", "", "mod", "");
		testNodeParse(new BinaryOperation(), "div", CodeStatus.valid, "div", "", "div", "");
		testNodeParse(new BinaryOperation(), "d", CodeStatus.incomplete, "d", "", "");
		testNodeParse(new BinaryOperation(), "%", CodeStatus.invalid, "", "%", "");
	});
	test('IndexableTerm', () => {
		testNodeParse(new Term(), "a", CodeStatus.valid, "a", "", "a", "");
	});
	test('Term', () => {
		testNodeParse(new Term(), "new Array<of String>(3)", CodeStatus.valid, "new Array<of String>(3)", "");
		testNodeParse(new Term(), "", CodeStatus.empty, "", "", "");
		testNodeParse(new Term(), "a", CodeStatus.valid, "a", "", "a", "");		
	});
	test('Expression', () => {
		testNodeParse(new ExprNode(), "", CodeStatus.empty, "", "", "");
		testNodeParse(new ExprNode(), "", CodeStatus.empty, "", "", "");
		testNodeParse(new ExprNode(), "a", CodeStatus.valid, "a", "", "a", "");
		testNodeParse(new ExprNode(), "a + b", CodeStatus.valid, "a + b", "", "a + b", "");
		testNodeParse(new ExprNode(), "a + b- c", CodeStatus.valid, "", "", "a + b - c", "");
		testNodeParse(new ExprNode(), "+", CodeStatus.invalid, "", "+", "");
		testNodeParse(new ExprNode(), "+b", CodeStatus.invalid, "", "+b", "");
		testNodeParse(new ExprNode(), "a +", CodeStatus.incomplete, "a +", "", "a + ");
		testNodeParse(new ExprNode(), "a %", CodeStatus.valid, "a", " %", "a");
		testNodeParse(new ExprNode(), "3 * 4 + x", CodeStatus.valid, "3 * 4 + x", "", "3 * 4 + x", "");
		testNodeParse(new ExprNode(), "3* foo(5)", CodeStatus.valid, "", "", "3 * foo(5)", "");
		testNodeParse(new ExprNode(), "points.foo(0.0)", CodeStatus.valid, "points.foo(0.0)", "", "points.foo(0.0)", "");
		testNodeParse(new ExprNode(), "reduce(0.0, lambda s as String, p as List<of String> => s + p.first() * p.first())", CodeStatus.valid, "reduce(0.0, lambda s as String, p as List<of String> => s + p.first() * p.first())", "", "");
		testNodeParse(new ExprNode(), "this", CodeStatus.valid, "this", "", "this", "<keyword>this</keyword>");
		testNodeParse(new ExprNode(), "default String", CodeStatus.valid, "default String", "", "", "<keyword>default</keyword> <type>String</type>");
		testNodeParse(new ExprNode(), "default Lit<of Int>", CodeStatus.valid, "", "", "", "");
		testNodeParse(new ExprNode(), "lambda a as (String, String), x as Int => (setAttemptIfGreen(a.attempt, a.target, x), setTargetIfGreen(a.attempt, a.target, x))", CodeStatus.valid, "lambda a as (String, String), x as Int => (setAttemptIfGreen(a.attempt, a.target, x), setTargetIfGreen(a.attempt, a.target, x))", "", "lambda a as (String, String), x as Int => (setAttemptIfGreen(a.attempt, a.target, x), setTargetIfGreen(a.attempt, a.target, x))", "");
	});
	test('Set Clause', () => {
		testNodeParse(new SetClause(), "x set to p.x + 3", CodeStatus.valid, "", "", "", "");
		testNodeParse(new SetClause(), "y set to p.y - 1", CodeStatus.valid, "", "", "", "");
		testNodeParse(new SetClause(), "y setto p.y - 1", CodeStatus.invalid, "", "y setto p.y - 1", "", "");
		testNodeParse(new SetClause(), "yset to p.y - 1", CodeStatus.invalid, "", "yset to p.y - 1", "", "");
		testNodeParse(new SetClause(), "x set top.x + 3", CodeStatus.invalid, "", "x set top.x + 3", "", "");
	});
	test('List of set clauses', () => {
		testNodeParse(new ListNode(() => new SetClause), "[x set to p.x + 3, y set to p.y - 1]", CodeStatus.valid, "", "", "", "");
	});
	test('with clause', () => {
		testNodeParse(new WithClause(), " with [x set to p.x + 3, y set to p.y - 1]", CodeStatus.valid, "", "", "", "");
		testNodeParse(new WithClause(), "with [x set to p.x + 3, y set to p.y - 1]", CodeStatus.valid, "", "", "", "");
	});
	test('Expression + with clause', () => {
		testNodeParse(new ExprNode(), "p with [x set to p.x + 3, y set to p.y - 1]", CodeStatus.valid, "", "", "", "");
		testNodeParse(new ExprNode(), "pwith [x set to p.x + 3, y set to p.y - 1]", CodeStatus.valid, "pwith", " [x set to p.x + 3, y set to p.y - 1]", "", "");
	});
	test('Identifier', () => {
		testNodeParse(new IdentifierNode(), ``, CodeStatus.empty, ``, "", "");
		testNodeParse(new IdentifierNode(), `  `, CodeStatus.invalid, ``, "", "");
		testNodeParse(new IdentifierNode(), `a`, CodeStatus.valid, `a`, "", "a", "");
		testNodeParse(new IdentifierNode(), `aB_d`, CodeStatus.valid, `aB_d`, "", "aB_d");
		testNodeParse(new IdentifierNode(), `abc `, CodeStatus.valid, `abc`, " ", "abc");
		testNodeParse(new IdentifierNode(), `Abc`, CodeStatus.invalid, ``, "Abc", "");
		testNodeParse(new IdentifierNode(), `abc-de`, CodeStatus.valid, `abc`, "-de", "abc");
		// Cannot be a keyword
		testNodeParse(new IdentifierNode(), `new`, CodeStatus.invalid, ``, "new", "");
		testNodeParse(new IdentifierNode(), `global`, CodeStatus.invalid, ``, "global", "");
		testNodeParse(new IdentifierNode(), `x as`, CodeStatus.valid, `x`, " as", "x");
	});
	test('LitBool', () => {
		testNodeParse(new LitBool(), "", CodeStatus.empty, "", "", "", "");
		testNodeParse(new LitBool(), " true", CodeStatus.valid, "true", "", "true", "<keyword>true</keyword>");
		testNodeParse(new LitBool(), " trueX", CodeStatus.valid, "true", "X", "true", "");
		testNodeParse(new LitBool(), " false", CodeStatus.valid, "false", "", "false", "");
		testNodeParse(new LitBool(), " True", CodeStatus.invalid, "", "True", "", "");
		testNodeParse(new LitBool(), "is True", CodeStatus.invalid, "", "is True", "", "");
		testNodeParse(new LitBool(), " tr", CodeStatus.incomplete, "tr", "", "tr", "");
		testNodeParse(new LitBool(), " tr ", CodeStatus.invalid, "", "tr ", "", "");
	});
	test('LitString - single chars', () => {
		testNodeParse(new LitString(), "", CodeStatus.empty, "", "", "", "");
		testNodeParse(new LitString(), `"a"`, CodeStatus.valid, `"a"`, "", `"a"`, "");
		testNodeParse(new LitString(), `"a`, CodeStatus.incomplete, `"a`, "", `"a`, "");
		testNodeParse(new LitString(), `"9"`, CodeStatus.valid, `"9"`, "", `"9"`, "");
		testNodeParse(new LitString(), `" "`, CodeStatus.valid, `" "`, "", `" "`, "");
	});
	test('LitString - bug #328', () => {
		testNodeParse(new LitString(), `" `, CodeStatus.incomplete, `" `, "", `" `, "");
		testNodeParse(new LitString(), `"{a} `, CodeStatus.incomplete, `"{a} `, "", `"{a} `, "");
	});
	test('LitInt', () => {
		testNodeParse(new LitInt(), "", CodeStatus.empty, "", "", "", "");
		testNodeParse(new LitInt(), "   ", CodeStatus.invalid, "", "   ", "", "");
		testNodeParse(new LitInt(), "123", CodeStatus.valid, "123", "", "123", "");
		testNodeParse(new LitInt(), "456  ", CodeStatus.valid, "456", "  ", "456", "");
		testNodeParse(new LitInt(), " 123a", CodeStatus.valid, " 123", "a", "123", "");
		testNodeParse(new LitInt(), "1.23", CodeStatus.valid, "1", ".23", "1", "");
		testNodeParse(new LitInt(), "a", CodeStatus.invalid, "", "a", "", "");
	});
	test('LitNumber', () => {
		testNodeParse(new LitNumber(), "", CodeStatus.empty, "", "", "");
		testNodeParse(new LitNumber(), "1.0", CodeStatus.valid, "1.0", "", "1.0");
		testNodeParse(new LitNumber(), " 1.0a", CodeStatus.valid, " 1.0", "a", "1.0");
		testNodeParse(new LitNumber(), "1", CodeStatus.incomplete, "1", "", "1");
		testNodeParse(new LitNumber(), "1.", CodeStatus.incomplete, "1.", "", "1.");
		testNodeParse(new LitNumber(), "1. ", CodeStatus.invalid, "", "1. ", "");
		testNodeParse(new LitNumber(), "1.1e5", CodeStatus.valid, "1.1e5", "", "1.1e5");
		testNodeParse(new LitNumber(), "1.1e-5", CodeStatus.valid, "1.1e-5", "", "1.1e-5");
	});
	test('Keyword', () => {
		testNodeParse(new KeywordNode(abstractKeyword), "", CodeStatus.empty, "", "", "");
		testNodeParse(new KeywordNode(abstractKeyword), "abstract ", CodeStatus.valid, "abstract", " ", "");
		testNodeParse(new KeywordNode(abstractKeyword), "abstract(x", CodeStatus.valid, "abstract", "(x", "");
		testNodeParse(new KeywordNode(abstractKeyword), "abstractx", CodeStatus.invalid, "", "abstractx", "");
		testNodeParse(new KeywordNode(abstractKeyword), "abstract immutable", CodeStatus.valid, "abstract", " immutable", "abstract");
		testNodeParse(new KeywordNode(abstractKeyword), " abs", CodeStatus.incomplete, " abs", "", "abs");
		testNodeParse(new KeywordNode(abstractKeyword), " abscract", CodeStatus.invalid, "", " abscract", "");
	});
	test('BracketedExpression', () => {
		testNodeParse(new BracketedExpression(), "(3 + 4)", CodeStatus.valid, "(3 + 4)", "", "(3 + 4)", "");

		testNodeParse(new BracketedExpression(), "", CodeStatus.empty, "", "", "");
		testNodeParse(new BracketedExpression(), "(3)", CodeStatus.valid, "(3)", "", "(3)", "");

		testNodeParse(new BracketedExpression(), "(a and not b)", CodeStatus.valid, "(a and not b)", "", "(a and not b)", "");
		testNodeParse(new BracketedExpression(), "(3 * 4 + x)", CodeStatus.valid, "(3 * 4 + x)", "", "(3 * 4 + x)", "");
		testNodeParse(new BracketedExpression(), "(3 * (4 + x))", CodeStatus.valid, "(3 * (4 + x))", "", "(3 * (4 + x))", "");
		testNodeParse(new BracketedExpression(), "(a and not b", CodeStatus.incomplete, "(a and not b", "", "(a and not b");
		//testNodeParse(new BracketedExpression(), "(a and not b  ", ParseStatus.incomplete, "(a and not b  ", "", "(a and not b"); TODO
		testNodeParse(new BracketedExpression(), "(", CodeStatus.incomplete, "(", "", "(");
		testNodeParse(new BracketedExpression(), "()", CodeStatus.invalid, "", "()", "(");
	});
	test('Optional', () => {
		testNodeParse(new OptionalNode(new LitInt()), "123 a", CodeStatus.valid, "123", " a", "123");
		testNodeParse(new OptionalNode(new LitInt()), "abc", CodeStatus.valid, "", "abc", "");
		testNodeParse(new OptionalNode(new KeywordNode(abstractKeyword)), " abstract", CodeStatus.valid, " abstract", "", "abstract", "<keyword>abstract</keyword>");
		testNodeParse(new OptionalNode(new KeywordNode(abstractKeyword)), "abs", CodeStatus.incomplete, "abs", "", "");
		testNodeParse(new OptionalNode(new KeywordNode(abstractKeyword)), "abscract", CodeStatus.valid, "", "abscract", "");
		testNodeParse(new OptionalNode(new KeywordNode(abstractKeyword)), "", CodeStatus.valid, "", "", "");
		testNodeParse(new OptionalNode(new KeywordNode(abstractKeyword)), "  ", CodeStatus.incomplete, "  ", "", "");
	});

	test('Multiple', () => {
		testNodeParse(new Multiple(() => new LitInt(), 0), ``, CodeStatus.valid, ``, "", "");
		testNodeParse(new Multiple(() => new LitInt(), 1), ``, CodeStatus.empty, ``, "", "");
		testNodeParse(new Multiple(() => new LitInt(), 0), `)`, CodeStatus.valid, ``, ")", "");
		testNodeParse(new Multiple(() => new LitInt(), 1), `1 0 33`, CodeStatus.valid, `1 0 33`, "", "");
		testNodeParse(new Multiple(() => new LitInt(), 1), `1`, CodeStatus.valid, `1`, "", "");
		testNodeParse(new Multiple(() => new LitInt(), 0), ``, CodeStatus.valid, ``, "", "");
		testNodeParse(new Multiple(() => new LitInt(), 1), ``, CodeStatus.empty, ``, "", "");
		testNodeParse(new Multiple(() => new LitInt(), 1), `5 6 a`, CodeStatus.valid, `5 6`, " a", "");
		testNodeParse(new Multiple(() => new LitInt(), 1), `7   `, CodeStatus.valid, `7`, "   ", "");

		testNodeParse(new Multiple(() => new KeywordNode("foo"), 1), `foo foo`, CodeStatus.valid, "", "", "");
		testNodeParse(new Multiple(() => new KeywordNode("bar"), 1), `bar ba`, CodeStatus.incomplete, "bar ba", "", "");
		testNodeParse(new Multiple(() => new KeywordNode("foo"), 1), `foo`, CodeStatus.valid, "", "", "");
		testNodeParse(new Multiple(() => new KeywordNode("foo"), 1), `fo`, CodeStatus.incomplete, "", "", "");
		testNodeParse(new Multiple(() => new KeywordNode("foo"), 1), `foo,foo`, CodeStatus.valid, "", ",foo", "");
		testNodeParse(new Multiple(() => new KeywordNode("foo"), 1), `foofoo`, CodeStatus.invalid, "", "foofoo", "");
	});
	test('CommaNode', () => {
		testNodeParse(new CommaNode(), ``, CodeStatus.incomplete, ``, "", "");
		testNodeParse(new CommaNode(), `,`, CodeStatus.valid, ``, "", ", ");
		testNodeParse(new CommaNode(), ` ,`, CodeStatus.valid, ``, "", ", ");
		testNodeParse(new CommaNode(), `  ,    `, CodeStatus.valid, ``, "", ", ");
		testNodeParse(new CommaNode(), `.`, CodeStatus.invalid, ``, ".", "");
		testNodeParse(new CommaNode(), `,,`, CodeStatus.valid, `,`, ",", "");
	});
	test('CSV', () => {
		testNodeParse(new CSV(() => new LitInt(), 0), ``, CodeStatus.valid, ``, "", "");
		testNodeParse(new CSV(() => new LitInt(), 1), ``, CodeStatus.empty, ``, "", "");
		testNodeParse(new CSV(() => new LitInt(), 0), `2, 4,3 , 1`, CodeStatus.valid, `2, 4,3 , 1`, "", "2, 4, 3, 1");
		testNodeParse(new CSV(() => new LitInt(), 0), `2`, CodeStatus.valid, `2`, "", "");
		testNodeParse(new CSV(() => new LitInt(), 1), `2`, CodeStatus.valid, `2`, "", "");
		testNodeParse(new CSV(() => new LitString(), 0), `"apple","orange" , "pear"`, CodeStatus.valid, `"apple","orange" , "pear"`, "", `"apple", "orange", "pear"`);
		testNodeParse(new CSV(() => new IdentifierNode(), 0), `a,b,c`, CodeStatus.valid, `a,b,c`, "", "");
		testNodeParse(new CSV(() => new IdentifierNode(), 0), `a,b,1`, CodeStatus.valid, `a,b`, ",1", "");
		testNodeParse(new CSV(() => new ExprNode(), 0), `a + b,c, 1`, CodeStatus.valid, `a + b,c, 1`, "", "");
		testNodeParse(new CSV(() => new ExprNode(), 0), `)`, CodeStatus.valid, ``, ")", "");

		testNodeParse(new CSV(() => new KeywordNode("foo"), 0), `foo, foo`, CodeStatus.valid, "", "");
		testNodeParse(new CSV(() => new KeywordNode("foo"), 0), `foo`, CodeStatus.valid, "", "");
		testNodeParse(new CSV(() => new KeywordNode("foo"), 1), `fook`, CodeStatus.invalid, "", "fook");
		testNodeParse(new CSV(() => new KeywordNode("foo"), 0), `fo`, CodeStatus.incomplete, "fo", "");
		testNodeParse(new CSV(() => new KeywordNode("foo"), 2), `foo, fo`, CodeStatus.incomplete, "foo, fo", "");
		testNodeParse(new CSV(() => new KeywordNode("foo"), 2), `foo,`, CodeStatus.incomplete, "foo,", "");
		testNodeParse(new CSV(() => new KeywordNode("foo"), 2), `foo, `, CodeStatus.incomplete, "foo, ", "");
		testNodeParse(new CSV(() => new KeywordNode("foo"), 2), `foo,fo`, CodeStatus.incomplete, "foo,fo", "", "foo, fo", );

		testNodeParse(new CSV(() => new ExprNode(), 0), ``, CodeStatus.valid, "", "");
	});
	test('Instance', () => {
		testNodeParse(new InstanceNode(), ``, CodeStatus.empty, ``, "", "");
		testNodeParse(new InstanceNode(), `bar`, CodeStatus.valid, `bar`, "", "");
		testNodeParse(new InstanceNode(), `bar[foo]`, CodeStatus.valid, `bar[foo]`, "", "");
		testNodeParse(new InstanceNode(), `bar[foo][0]`, CodeStatus.valid, `bar[foo]`, "[0]", "");
	});

	test('Function Call', () => {
		testNodeParse(new FunctionCallNode(), ``, CodeStatus.empty, ``, "", "");
		testNodeParse(new FunctionCallNode(), `  `, CodeStatus.empty, ``, "", "");
		testNodeParse(new FunctionCallNode(), `foo()`, CodeStatus.valid, `foo()`, "", "foo()", "<method>foo</method>()");
		testNodeParse(new FunctionCallNode(), `bar(x, 1, "hello")`, CodeStatus.valid, `bar(x, 1, "hello")`, "", "","");
		testNodeParse(new FunctionCallNode(), `yon`, CodeStatus.incomplete, `yon`, "", "");
		testNodeParse(new FunctionCallNode(), `yon `, CodeStatus.invalid, ``, "yon ", "");
		testNodeParse(new FunctionCallNode(), `yon(`, CodeStatus.incomplete, `yon(`, "", "");
		testNodeParse(new FunctionCallNode(), `yon(a`, CodeStatus.incomplete, `yon(a`, "", "");
		testNodeParse(new FunctionCallNode(), `yon(a,`, CodeStatus.incomplete, `yon(a,`, "", "");
		testNodeParse(new FunctionCallNode(), `Foo()`, CodeStatus.invalid, ``, "Foo()", "");
		testNodeParse(new FunctionCallNode(), `foo[]`, CodeStatus.invalid, ``, "foo[]", "");
		testNodeParse(new FunctionCallNode(), `bar.foo(a)`, CodeStatus.valid, ``, "", "bar.foo(a)", "bar.<method>foo</method>(a)");
		testNodeParse(new FunctionCallNode(), `global.foo()`, CodeStatus.valid, ``, "", "global.foo()", "<keyword>global</keyword>.<method>foo</method>()");
		testNodeParse(new FunctionCallNode(), `library.foo()`, CodeStatus.valid, ``, "", "library.foo()", "<keyword>library</keyword>.<method>foo</method>()");
		testNodeParse(new FunctionCallNode(), `property.foo()`, CodeStatus.invalid, ``, "property.foo()", "");
		testNodeParse(new FunctionCallNode(), `property.foo()`, CodeStatus.invalid, ``, "property.foo()", "");
		testNodeParse(new FunctionCallNode(), `isBefore(b[0])`, CodeStatus.valid, ``, "", "");
		testNodeParse(new FunctionCallNode(), `a.isBefore(b[0])`, CodeStatus.valid, ``, "", "");
		testNodeParse(new FunctionCallNode(), `a[0].isBefore(b[0])`, CodeStatus.valid, ``, "", "a[0].isBefore(b[0])","a[0].<method>isBefore</method>(b[0])");
	});
	test('Lists', () => {
		testNodeParse(new ListNode(() => new LitInt()), ``, CodeStatus.empty, ``, "", "");
		testNodeParse(new ListNode(() => new LitInt()), `[1, 2, 3, 4, 5]`, CodeStatus.valid, ``, "", "[1, 2, 3, 4, 5]", "");
		testNodeParse(new ListNode(() => new LitInt()), `[]`, CodeStatus.valid, `[]`, "", "");
		testNodeParse(new ListNode(() => new LitInt()), `[`, CodeStatus.incomplete, `[`, "", "");
		testNodeParse(new ListNode(() => new LitInt()), `[1,2,3.1]`, CodeStatus.invalid, ``, "[1,2,3.1]", "");
		// list of list
		testNodeParse(new ListNode(() => new ListNode(() => new LitInt())), ``, CodeStatus.empty, ``, "", "");
		testNodeParse(new ListNode(() => new ListNode(() => new LitInt())), `[[], [], []]`, CodeStatus.valid, `[[], [], []]`, "", "");
		testNodeParse(new ListNode(() => new ListNode(() => new LitInt())), `[[1,2], [], [3,4]]`, CodeStatus.valid, ``, "", "[[1, 2], [], [3, 4]]", "");
		testNodeParse(new ListNode(() => new ListNode(() => new LitInt())), `[[1,2], [], [3,4]`, CodeStatus.incomplete, ``, "", "");
		testNodeParse(new ListNode(() => new ListNode(() => new LitInt())), `[[1,2, [], [3,4]]`, CodeStatus.invalid, ``, `[[1,2, [], [3,4]]`, "", "");

		testNodeParse(new ListNode(() => new LitString()), `["apple", "pear"]`, CodeStatus.valid, "", "", "", `[<string>"apple"</string>, <string>"pear"</string>]`);
		testNodeParse(new ListNode(() => new LiteralNode()), `["apple", "pear"]`, CodeStatus.valid, "", "", "", `[<string>"apple"</string>, <string>"pear"</string>]`);
	});
	test('List of expressions', () => {
		testNodeParse(new ListNode(() => new ExprNode()), `[a, 3 + 4, func(a, 3)- 1, new Foo()]`, CodeStatus.valid, "[a, 3 + 4, func(a, 3)- 1, new Foo()]", "", "");
		testNodeParse(new ListNode(() => new ExprNode()), `[a, 3+ 4, foo(a, 3) - 1]`, CodeStatus.valid, "", "", "[a, 3 + 4, foo(a, 3) - 1]", "");
	});
	test('TypeSimpleNode', () => {
		testNodeParse(new TypeSimpleNode(), `Foo`, CodeStatus.valid, "Foo", "", "", "<type>Foo</type>");
		testNodeParse(new TypeSimpleNode(), `foo`, CodeStatus.invalid, "", "foo", "");
	});
	test('TypeWithOptGenerics', () => {
		testNodeParse(new TypeWithOptGenerics(), `Foo`, CodeStatus.valid, "Foo", "", "", "");
		testNodeParse(new TypeWithOptGenerics(), `foo`, CodeStatus.invalid, "", "foo", "");
		testNodeParse(new TypeWithOptGenerics(), `Foo<`, CodeStatus.incomplete, "Foo<", "", "");
		testNodeParse(new TypeWithOptGenerics(), `Foo<of`, CodeStatus.incomplete, "Foo<of", "", "");
		testNodeParse(new TypeWithOptGenerics(), `Foo<of Bar`, CodeStatus.incomplete, "Foo<of Bar", "", "");
		testNodeParse(new TypeWithOptGenerics(), `Foo<ofBar`, CodeStatus.valid, "", "<ofBar", "");
		testNodeParse(new TypeWithOptGenerics(), `Foo<of Bar>`, CodeStatus.valid, "Foo<of Bar>", "", "", "<type>Foo</type>&lt;<keyword>of</keyword> <type>Bar</type>&gt;");
		testNodeParse(new TypeWithOptGenerics(), `Foo<of List<of Bar>>`, CodeStatus.valid, "Foo<of List<of Bar>>", "", "", "<type>Foo</type>&lt;<keyword>of</keyword> <type>List</type>&lt;<keyword>of</keyword> <type>Bar</type>&gt;&gt;");
		testNodeParse(new TypeWithOptGenerics(), `Dictionary<of Bar, Yon>`, CodeStatus.valid, "Dictionary<of Bar, Yon>", "", "", "<type>Dictionary</type>&lt;<keyword>of</keyword> <type>Bar</type>, <type>Yon</type>&gt;");
		testNodeParse(new TypeWithOptGenerics(), `List<of (Bar, Yon)>`, CodeStatus.valid, "List<of (Bar, Yon)>", "", "", "<type>List</type>&lt;<keyword>of</keyword> (<type>Bar</type>, <type>Yon</type>)&gt;");

	});
	test('TypeNode', () => {
		testNodeParse(new TypeNode(), `Foo<of List<of Bar>>`, CodeStatus.valid, "Foo<of List<of Bar>>", "", "");//Single
		testNodeParse(new TypeNode(), `(Foo, Bar)`, CodeStatus.valid, "(Foo, Bar)", "", "");
		testNodeParse(new TypeNode(), `(Foo)`, CodeStatus.invalid, "", "(Foo)", "");
		testNodeParse(new TypeNode(), `(Foo, Bar, Yon`, CodeStatus.incomplete, "(Foo, Bar, Yon", "", "");
		testNodeParse(new TypeNode(), `(Foo, (Bar, Yon, Qux))`, CodeStatus.valid, "(Foo, (Bar, Yon, Qux))", "", "");
		testNodeParse(new TypeNode(), `(Foo, Bar< of Yon>)`, CodeStatus.valid, "(Foo, Bar< of Yon>)", "", "");
		testNodeParse(new TypeNode(), `Foo<of List<of (Bar, Qux)>>`, CodeStatus.valid, "Foo<of List<of (Bar, Qux)>>", "", "");
	});
	test('TypeNode - Func', () => {
		testNodeParse(new TypeNode(), `Func<of Foo, Bar => Yon>`, CodeStatus.valid, "Func<of Foo, Bar => Yon>", "", "");//Single
	});
	test('TupleDefNode', () => {
		testNodeParse(new TupleNode(), `("foo", 3)`, CodeStatus.valid, '("foo", 3)', "", "", "");
		testNodeParse(new TupleNode(), `(foo, 3, bar(a), x)`, CodeStatus.valid, "(foo, 3, bar(a), x)", "", "");
		testNodeParse(new TupleNode(), `(foo)`, CodeStatus.invalid, "", "(foo)", "");
		testNodeParse(new TupleNode(), `(foo, 3, bar(a), x`, CodeStatus.incomplete, "(foo, 3, bar(a), x", "", "");
		testNodeParse(new TupleNode(), `(setAttemptIfGreen(a.attempt, a.target, x), setTargetIfGreen(a.attempt, a.target, x))`, CodeStatus.valid, "", "", "(setAttemptIfGreen(a.attempt, a.target, x), setTargetIfGreen(a.attempt, a.target, x))");
	});
	test('Lambda', () => {
		testNodeParse(new Lambda(), `lambda x as Int => x * x`, CodeStatus.valid, "lambda x as Int => x * x", "", "");
		testNodeParse(new Lambda(), `lambda x`, CodeStatus.incomplete, "lambda x", "", "");
		testNodeParse(new Lambda(), `lambda x => x * x`, CodeStatus.invalid, "", "lambda x => x * x", "");
		testNodeParse(new Lambda(), `lambda s as Int, p as List<of Int> => s + p.first()`, CodeStatus.valid, "", "", "");
		testNodeParse(new Lambda(), `lambda bestSoFar as String, newWord as String => betterOf(bestSoFar, newWord, possAnswers)`, CodeStatus.valid, "", "", "");
		testNodeParse(new Lambda(), `lambda a as (String, String), x as Int => (setAttemptIfGreen(a.attempt, a.target, x), setTargetIfGreen(a.attempt, a.target, x))`, CodeStatus.valid, "", "", "lambda a as (String, String), x as Int => (setAttemptIfGreen(a.attempt, a.target, x), setTargetIfGreen(a.attempt, a.target, x))");
	});
	test('IfExpr', () => {
		testNodeParse(new IfExpr(), `if cell then Colour.green else Colour.black)`, CodeStatus.valid, "", ")", "");
		testNodeParse(new IfExpr(), `if cell then Colour.amber`, CodeStatus.incomplete, "", "", "");
		testNodeParse(new IfExpr(), `if attempt[n] is "*" then attempt else if attempt.isYellow(target, n) then attempt.setChar(n, "+") else attempt.setChar(n, "_")`, CodeStatus.valid, "", "", "");
		testNodeParse(new IfExpr(), `if attempt.isAlreadyMarkedGreen(n) then target else if attempt.isYellow(target, n) then target.setChar(target.indexOf(attempt[n]), ".") else target`, CodeStatus.valid, "", "", "");
		testNodeParse(new IfExpr(), `if score > 80 then "Distinction" else if score > 60 then "Merit" else if score > 40 then "Pass" else "Fail"`, CodeStatus.valid, "", "", "");
	});
	test('ParamDefNode', () => {
		testNodeParse(new ParamDefNode(), `x as String`, CodeStatus.valid, "x as String", "", "x as String", "x <keyword>as</keyword> <type>String</type>");
		testNodeParse(new ParamDefNode(), `y asString`, CodeStatus.invalid, "", "y asString", "");
		testNodeParse(new ParamDefNode(), `z`, CodeStatus.incomplete, "z", "", "");
		testNodeParse(new ParamDefNode(), `w as`, CodeStatus.incomplete, "w as", "", "");
		testNodeParse(new ParamDefNode(), `A`, CodeStatus.invalid, "", "A", "");
		testNodeParse(new ParamDefNode(), `v String`, CodeStatus.invalid, "", "v String", "");
	});
	test('Param List', () => {
		testNodeParse(new CSV(() => new ParamDefNode(), 0), `A as string`, CodeStatus.valid, "", "A as string", ""); //i.e. all leftover
		testNodeParse(new CSV(() => new ParamDefNode(), 0), ``, CodeStatus.valid, "", "", "");
		testNodeParse(new CSV(() => new ParamDefNode(), 0), `a as String`, CodeStatus.valid, "", "", "");
		testNodeParse(new CSV(() => new ParamDefNode(), 0), `a as String, bb as Int, foo as Bar`, CodeStatus.valid, "", "", "");
		testNodeParse(new CSV(() => new ParamDefNode(), 0), `a`, CodeStatus.incomplete, "a", "", "");
		testNodeParse(new CSV(() => new ParamDefNode(), 0), `a as String,`, CodeStatus.incomplete, "a as String,", "", "");
		testNodeParse(new CSV(() => new ParamDefNode(), 0), `a as String, bb as`, CodeStatus.incomplete, "", "", "");
	});
	test('KVP', () => {
		testNodeParse(new KVPnode(() => new LitString(), () => new LitInt()), `"a":37`, CodeStatus.valid, "", "", "");
		testNodeParse(new KVPnode(() => new LitString(), () => new LitInt()), `"a":`, CodeStatus.incomplete, "", "", "");
		testNodeParse(new KVPnode(() => new LitString(), () => new LitInt()), `"a"`, CodeStatus.incomplete, "", "", "");
		testNodeParse(new KVPnode(() => new LitString(), () => new LitInt()), `"a":"b"`, CodeStatus.invalid, "", `"a":"b"`, "");
	});
	test('Dictionary', () => {
		testNodeParse(new Dictionary(() => new LitString(), () => new LitInt()), `["a":37]`, CodeStatus.valid, `["a":37]`, "", "");
		testNodeParse(new Dictionary(() => new LitString(), () => new LitInt()), `["a":37, "b":42]`, CodeStatus.valid, "", "", "");
		testNodeParse(new Dictionary(() => new LitString(), () => new LitInt()), `["a":37, "b":42`, CodeStatus.incomplete, "", "", "");
		testNodeParse(new Dictionary(() => new LitString(), () => new LitInt()), `["a":37,`, CodeStatus.incomplete, "", "", "");
		testNodeParse(new Dictionary(() => new LitString(), () => new LitInt()), `["a":37, 42:"b"]`, CodeStatus.invalid, "", `["a":37, 42:"b"]`, "");
		testNodeParse(new Dictionary(() => new LitString(), () => new LitInt()), `["a":37, "b":42)`, CodeStatus.invalid, "", `["a":37, "b":42)`, "");

		testNodeParse(new Dictionary(() => new LitValueNode(), () => new LitValueNode()), `["a":37, "b":42]`, CodeStatus.valid, "", "", "");
		testNodeParse(new Dictionary(() => new LitValueNode(), () => new LitValueNode()), `["a":1.0, 5:"abc"]`, CodeStatus.valid, "", "", "");//But should fail type tests
	});
	test('LitTuple', () => {
		testNodeParse(new LitTuple(), `(3,4)`, CodeStatus.valid, "", "", "");
		testNodeParse(new LitTuple(), `(3,"a", "hello", 4.1, true)`, CodeStatus.valid, "", "", "");
		testNodeParse(new LitTuple(), `((3,4), ("a", true))`, CodeStatus.valid, "", "", "");
		testNodeParse(new LitTuple(), `(3,"a", "hello", 4.1, true`, CodeStatus.incomplete, "", "", "");
		testNodeParse(new LitTuple(), `(3,"a", "hello", 4.1,`, CodeStatus.incomplete, "", "", "");
		testNodeParse(new LitTuple(), `[3,4]`, CodeStatus.invalid, "", "[3,4]", "");
		testNodeParse(new LitTuple(), `(a,b)`, CodeStatus.invalid, "", "(a,b)", "");
		testNodeParse(new LitTuple(), `(`, CodeStatus.incomplete, "", "", "");
		testNodeParse(new LitTuple(), `(3`, CodeStatus.incomplete, "", "", "");
		testNodeParse(new LitTuple(), `(3)`, CodeStatus.invalid, "", "(3)", "");
		testNodeParse(new LitTuple(), `()`, CodeStatus.invalid, "", "()", "");
	});
	test('DeconstructedTuple', () => {
		testNodeParse(new DeconstructedTuple(), `(a,b)`, CodeStatus.valid, "", "", "");
		testNodeParse(new DeconstructedTuple(), `(a,b`, CodeStatus.incomplete, "", "", "");
		testNodeParse(new DeconstructedTuple(), `(3,4)`, CodeStatus.invalid, "", "(3,4)", "");
		testNodeParse(new DeconstructedTuple(), `(a[2],b)`, CodeStatus.invalid, "", "(a[2],b)", "");
	});
	test('Literal', () => {
		testNodeParse(new LiteralNode(), `"hello"`, CodeStatus.valid, "", "", "");
		testNodeParse(new LiteralNode(), `123`, CodeStatus.valid, "", "", "");
		testNodeParse(new LiteralNode(), `["a":37, 42:"b"]`, CodeStatus.valid, "", "", "");
		testNodeParse(new LiteralNode(), `[(3,4), (5,6)]`, CodeStatus.valid, "", "", "");
		testNodeParse(new LiteralNode(), `["apple", "pear"]`, CodeStatus.valid, "", "", "", `[<string>"apple"</string>, <string>"pear"</string>]`);

	});
	test('VarRef', () => {
		testNodeParse(new VarRefNode(), `g`, CodeStatus.valid, "", "", "");
		testNodeParse(new VarRefNode(), `result`, CodeStatus.valid, "", "", "");	//only keyword that is OK
		testNodeParse(new VarRefNode(), `new`, CodeStatus.invalid, "", "new", "");
		testNodeParse(new VarRefNode(), `global.`, CodeStatus.incomplete, "", "", "");
		testNodeParse(new VarRefNode(), `global`, CodeStatus.incomplete, "", "", "");
		testNodeParse(new VarRefNode(), `foo`, CodeStatus.valid, "", "", "");
		testNodeParse(new VarRefNode(), `foo[3]`, CodeStatus.valid, "", "", "");
		testNodeParse(new VarRefNode(), `library.foo`, CodeStatus.valid, "", "", "");
		testNodeParse(new VarRefNode(), `property.foo`, CodeStatus.valid, "", "", "");
		testNodeParse(new VarRefNode(), `global.foo[3]`, CodeStatus.valid, "", "", "");
		testNodeParse(new VarRefNode(), `property.foo[3..4]`, CodeStatus.valid, "", "", "");
		testNodeParse(new VarRefNode(), `bar.foo[3..4]`, CodeStatus.valid, "", "", "");
		testNodeParse(new VarRefNode(), `property.bar.foo`, CodeStatus.valid, "property.bar", ".foo", "");
	});
	test('DeconstructedList', () => {
		testNodeParse(new DeconstructedList(), `[a:b]`, CodeStatus.valid, "", "", "");
		testNodeParse(new DeconstructedList(), `[a:b`, CodeStatus.incomplete, "", "", "");
		testNodeParse(new DeconstructedList(), `[a:`, CodeStatus.incomplete, "", "", "");
		testNodeParse(new DeconstructedList(), `[a`, CodeStatus.incomplete, "", "", "");
		testNodeParse(new DeconstructedList(), `[`, CodeStatus.incomplete, "", "", "");
		testNodeParse(new DeconstructedList(), `[a,b]`, CodeStatus.invalid, "", "[a,b]", "");
		testNodeParse(new DeconstructedList(), `[a:3]`, CodeStatus.invalid, "", "[a:3]", "");
		testNodeParse(new DeconstructedList(), `(a:b)`, CodeStatus.invalid, "", "(a:b)", "");
	});

	test('SpaceNode', () => {
		testNodeParse(new SpaceNode(Space.ignored), ``, CodeStatus.valid, "", "", "", "");
		testNodeParse(new SpaceNode(Space.ignored), ` `, CodeStatus.valid, "", "", "", "");
		testNodeParse(new SpaceNode(Space.ignored), `  `, CodeStatus.valid, "", "", "", "");
		testNodeParse(new SpaceNode(Space.added), ``, CodeStatus.valid, "", "", " ", " ");
		testNodeParse(new SpaceNode(Space.added), ` `, CodeStatus.valid, "", "", " ", " ");
		testNodeParse(new SpaceNode(Space.added), `  `, CodeStatus.valid, "", "", " ", " ");
		testNodeParse(new SpaceNode(Space.required), ``, CodeStatus.empty, "", "", "", "");
		testNodeParse(new SpaceNode(Space.required), ` `, CodeStatus.valid, "", "", " ", " ");
		testNodeParse(new SpaceNode(Space.required), `  `, CodeStatus.valid, "", "", " ", " ");
	});
	test('New Instance', () => {
		testNodeParse(new NewInstance(), ``, CodeStatus.empty, "", "", "", "");
		testNodeParse(new NewInstance(), `new Foo()`, CodeStatus.valid, "", "", "new Foo()", "");
		testNodeParse(new NewInstance(), `newFoo()`, CodeStatus.invalid, "", "newFoo()", "", "");
	});
	test('String Interpolation', () => {
		testNodeParse(new StringInterpolation(), ``, CodeStatus.empty, "", "", "", "");
		testNodeParse(new StringInterpolation(), "{x + 1}", CodeStatus.valid, "{x + 1}", "", "", "");
		testNodeParse(new StringInterpolation(), "{x", CodeStatus.incomplete, "{x", "", "", "");
		testNodeParse(new StringInterpolation(), "{}", CodeStatus.invalid, "", "{}", "", "");
	});
	test('LitString', () => {
		testNodeParse(new LitString(), `""`, CodeStatus.valid, `""`, "", "", `<string>""</string>`);
		testNodeParse(new LitString(), `"abc"`, CodeStatus.valid, `"abc"`, "", "", `<string>"abc"</string>`);
		testNodeParse(new LitString(), `"abc def"`, CodeStatus.valid, `"abc def"`, "", "", `<string>"abc def"</string>`);
		testNodeParse(new LitString(), `"abc`, CodeStatus.incomplete, `"abc`, "", "", "");
		testNodeParse(new LitString(), `"`, CodeStatus.incomplete, `"`, "", "", "");
		testNodeParse(new LitString(), `abc`, CodeStatus.invalid, "", "abc", "", "");
		testNodeParse(new LitString(), `'abc'`, CodeStatus.invalid, "", "'abc'", "", "");
	});
	test('Interpolated strings', () => {
        var field = () => new StringInterpolation();
        var plainText = () => new RegExMatchNode(Regexes.nonEmptyStringContent);
        var segment = () => new Alternatives([field, plainText]);
        testNodeParse(segment(), `abc`, CodeStatus.valid, "abc","");
		testNodeParse(segment(), `{x}`, CodeStatus.valid, "{x}","");
		testNodeParse(segment(), `"`, CodeStatus.invalid, "",`"`);

		testNodeParse(new LitString(), `"{x}{y}"`, CodeStatus.valid, "","");
		testNodeParse(new LitString(), `"{a} times {b} equals{c}"`, CodeStatus.valid, "","");
	});
	test('Bug #290', () => {
        testNodeParse(new LitInt(), `3`, CodeStatus.valid, "3","");
		testNodeParse(new LitInt(), `3 `, CodeStatus.valid, "3"," ");

		testNodeParse(new LitValueNode(), `3 `, CodeStatus.valid, "3"," ");
		testNodeParse(new BinaryExpression(), `3 `, CodeStatus.incomplete, "3 ","","3 ");

		testNodeParse(new ExprNode(), `3 `, CodeStatus.incomplete, "3 ","","3 ");
	});

	test('ProcRefCompound', () => {
		testNodeParse(new InstanceProcRef(), `bar.foo`, CodeStatus.valid, "","");
		testNodeParse(new InstanceProcRef(), `bar.`, CodeStatus.incomplete, "","");
		testNodeParse(new InstanceProcRef(), `bar.foo.yon`, CodeStatus.valid, "",".yon");
		testNodeParse(new InstanceProcRef(), `bar.foo[2]`, CodeStatus.valid, "","[2]");
		testNodeParse(new InstanceProcRef(), `bar`, CodeStatus.incomplete, "","");
		testNodeParse(new InstanceProcRef(), `global.bar`, CodeStatus.valid, "","");
		testNodeParse(new InstanceProcRef(), `library.bar`, CodeStatus.valid, "","");
		testNodeParse(new InstanceProcRef(), `x[3].bar`, CodeStatus.valid, "","");
	});
	test('#339 call dot function on a literal', () => {
		testNodeParse(new FunctionCallNode(), `length(bar)`, CodeStatus.valid, "","");
		testNodeParse(new FunctionCallNode(), `bar.length()`, CodeStatus.valid, "","");
		testNodeParse(new FunctionCallNode(), `bar.asArray()`, CodeStatus.valid, "","");
		testNodeParse(new LiteralNode(), `[1,2,3,4,5]`, CodeStatus.valid, "","");
		testNodeParse(new FunctionCallNode(), `[1,2,3,4,5].asArray()`, CodeStatus.valid, "","");
		testNodeParse(new FunctionCallNode(), `"Hello World".length()`, CodeStatus.valid, "","");
		testNodeParse(new FunctionCallNode(), `12.3.asString()`, CodeStatus.valid, "","");
		testNodeParse(new FunctionCallNode(), `bar.`, CodeStatus.incomplete, "","");
		testNodeParse(new FunctionCallNode(), `bar`, CodeStatus.incomplete, "","");
	});
});