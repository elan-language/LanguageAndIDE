import * as vscode from 'vscode';
import { ExprNode } from '../frames/nodes/expr-node';
import { ParseStatus } from '../frames/parse-status';
import { testNodeParse } from './testHelpers';
import { LitBool } from '../frames/nodes/lit-bool';
import { LitChar } from '../frames/nodes/lit-char';
import { LitInt } from '../frames/nodes/lit-int';
import { LitFloat } from '../frames/nodes/lit-float';
import { FixedText } from '../frames/nodes/fixed-text';
import { BinOp } from '../frames/nodes/bin-op';
import { UnaryOp } from '../frames/nodes/unary-op';
import { UnaryTerm } from '../frames/nodes/unary-term';
import { BracketedExpression } from '../frames/nodes/bracketed-expression';
import { Optional } from '../frames/nodes/optional';
import { LitString } from '../frames/nodes/lit-string';
import { LitList } from '../frames/nodes/lit-list';
import { Multiple } from '../frames/nodes/multiple';
import { CommaNode } from '../frames/nodes/comma-node';
import { CSV } from '../frames/nodes/csv';


suite('FieldNode parsing', () => {
	vscode.window.showInformationMessage('Start all unit tests.');
	test('UnaryOp', () => {
		testNodeParse(new UnaryOp(),"", ParseStatus.incomplete, "", "");
		testNodeParse(new UnaryOp(),"-", ParseStatus.valid, "-", "");
		testNodeParse(new UnaryOp()," not", ParseStatus.valid, " not", "");
		testNodeParse(new UnaryOp(),"+", ParseStatus.invalid, "", "+");
	});
	test('UnaryTerm', () => {
		testNodeParse(new UnaryTerm(),"", ParseStatus.incomplete, "", "");
		testNodeParse(new UnaryTerm(),"-3", ParseStatus.valid, "-3", "");
		testNodeParse(new UnaryTerm()," not foo", ParseStatus.valid, " not foo", "");
		testNodeParse(new UnaryTerm(),"-", ParseStatus.incomplete, "-", "");
		testNodeParse(new UnaryTerm(),"+4", ParseStatus.invalid, "", "+4");
	});
	test('BinOp', () => {
		testNodeParse(new BinOp(),"", ParseStatus.incomplete, "", "");
		testNodeParse(new BinOp(),"  ", ParseStatus.incomplete, "", "  ");
		testNodeParse(new BinOp(),"+", ParseStatus.valid, "+", "");
		testNodeParse(new BinOp(),"-", ParseStatus.valid, "-", "");
		testNodeParse(new BinOp(),"*", ParseStatus.valid, "*", "");
		testNodeParse(new BinOp(),"/", ParseStatus.valid, "/", "");
		testNodeParse(new BinOp(),">", ParseStatus.valid, ">", "");
		testNodeParse(new BinOp(),"<", ParseStatus.valid, "<", "");
		testNodeParse(new BinOp(),">=", ParseStatus.valid, ">=", "");
		testNodeParse(new BinOp(),"<=", ParseStatus.valid, "<=", "");
		testNodeParse(new BinOp(),"< =", ParseStatus.valid, "<", " =");

		testNodeParse(new BinOp(),"is", ParseStatus.valid, "is", "");
		testNodeParse(new BinOp(),"is not", ParseStatus.valid, "is not", "");
		testNodeParse(new BinOp(),"and", ParseStatus.valid, "and", "");
		testNodeParse(new BinOp(),"or", ParseStatus.valid, "or", "");
		testNodeParse(new BinOp(),"xor", ParseStatus.valid, "xor", "");
		testNodeParse(new BinOp(),"mod", ParseStatus.valid, "mod", "");
		testNodeParse(new BinOp(),"div", ParseStatus.valid, "div", "");
		testNodeParse(new BinOp(),"d", ParseStatus.incomplete, "d", "");
		testNodeParse(new BinOp(),"%", ParseStatus.invalid, "", "%");
	});
	test('Expression', () => {
		testNodeParse(new ExprNode(),"", ParseStatus.incomplete, "", "");
		testNodeParse(new ExprNode(),"  ", ParseStatus.incomplete, "", "  ");
		testNodeParse(new ExprNode(),"a", ParseStatus.valid, "a", "");
		testNodeParse(new ExprNode(),"a + b", ParseStatus.valid, "a + b", "");
		testNodeParse(new ExprNode(), "a + b-c", ParseStatus.valid, "a + b-c", "");
		testNodeParse(new ExprNode(), "+", ParseStatus.invalid, "", "+");
		testNodeParse(new ExprNode(),"+b", ParseStatus.invalid, "", "+b");
		testNodeParse(new ExprNode(), "a +", ParseStatus.incomplete, "a +", "");
		testNodeParse(new ExprNode(), "a %", ParseStatus.valid, "a", " %");
		testNodeParse(new ExprNode(), "3 * 4 + x", ParseStatus.valid, "3 * 4 + x", "");
	});
	test('LitBool', () => {
		testNodeParse(new LitBool(), "", ParseStatus.incomplete, "", "");
		testNodeParse(new LitBool(), " true", ParseStatus.valid, " true", "");
		testNodeParse(new LitBool(), " trueX", ParseStatus.valid, " true", "X");
		testNodeParse(new LitBool(), " false", ParseStatus.valid, " false", "");
		testNodeParse(new LitBool(), " True", ParseStatus.invalid, "", " True");
		testNodeParse(new LitBool(), "is True", ParseStatus.invalid, "", "is True");
		testNodeParse(new LitBool(), " tr", ParseStatus.incomplete, " tr", "");
		testNodeParse(new LitBool(), " tr ", ParseStatus.invalid, "", " tr ");
	});
	test('LitChar', () => {
		testNodeParse(new LitChar(), "", ParseStatus.incomplete, "", "");
		testNodeParse(new LitChar(), "'a'", ParseStatus.valid, "'a'", "");
		testNodeParse(new LitChar(), " '9'", ParseStatus.valid, " '9'", "");
		testNodeParse(new LitChar(), "'ab'", ParseStatus.invalid, "", "'ab'");
		testNodeParse(new LitChar(), `"a"`, ParseStatus.invalid, "", `"a"`);
	});
	test('LitInt', () => {
		testNodeParse(new LitInt(), "", ParseStatus.incomplete, "", "");
		testNodeParse(new LitInt(), "   ", ParseStatus.incomplete, "", "   ");
		testNodeParse(new LitInt(), "123", ParseStatus.valid, "123", "");
		testNodeParse(new LitInt(), "456  ", ParseStatus.valid, "456", "  ");
		testNodeParse(new LitInt(), " 123a", ParseStatus.valid, " 123", "a");
		testNodeParse(new LitInt(), "1.23", ParseStatus.valid, "1", ".23");
		testNodeParse(new LitInt(), "a", ParseStatus.invalid, "", "a");
	});
	test('LitFloat', () => {
		testNodeParse(new LitFloat(), "", ParseStatus.incomplete, "", "");
		testNodeParse(new LitFloat(), "1.0", ParseStatus.valid, "1.0", "");
		testNodeParse(new LitFloat(), " 1.0a", ParseStatus.valid, " 1.0", "a");
		testNodeParse(new LitFloat(), "1", ParseStatus.incomplete, "1", "");
		testNodeParse(new LitFloat(), "1.", ParseStatus.incomplete, "1.", "");
		testNodeParse(new LitFloat(), "1. ", ParseStatus.incomplete, "1.", " ");
	});
	test('FixedText', () => {
		testNodeParse(new FixedText("abstract"), "", ParseStatus.incomplete, "", "");
		testNodeParse(new FixedText("abstract"), "abstract", ParseStatus.valid, "abstract", "");
		testNodeParse(new FixedText("abstract"), "abstract immutable", ParseStatus.valid, "abstract", " immutable");
		testNodeParse(new FixedText("abstract"), " abs", ParseStatus.incomplete, " abs", "");
		testNodeParse(new FixedText("abstract"), " abscract", ParseStatus.invalid, "", " abscract");
	});
	test('BracketedExpression', () => {
		testNodeParse(new BracketedExpression(),"", ParseStatus.incomplete, "", "");
		testNodeParse(new BracketedExpression(),"(3)", ParseStatus.valid, "(3)", "");
		testNodeParse(new BracketedExpression(),"(3 + 4)", ParseStatus.valid, "(3 + 4)", "");
		testNodeParse(new BracketedExpression(),"(a and not b)", ParseStatus.valid, "(a and not b)", "");
		testNodeParse(new BracketedExpression(),"(3 * 4 + x)", ParseStatus.valid, "(3 * 4 + x)", "");
		testNodeParse(new BracketedExpression(),"(3 * (4 + x))", ParseStatus.valid, "(3 * (4 + x))", "");
		testNodeParse(new BracketedExpression(),"(a and not b", ParseStatus.incomplete, "(a and not b", "");
		testNodeParse(new BracketedExpression(),"(a and not b  ", ParseStatus.incomplete, "(a and not b", "  ");
		testNodeParse(new BracketedExpression(),"(", ParseStatus.incomplete, "(", "");
		testNodeParse(new BracketedExpression(),"()", ParseStatus.invalid, "(", ")");
	});
	test('Optional', () => {
		testNodeParse(new Optional(() => new LitInt()),"123 a", ParseStatus.valid, "123", " a");
		testNodeParse(new Optional(() => new LitInt()), "abc", ParseStatus.valid, "", "abc");
		testNodeParse(new Optional(() => new FixedText("abstract")), "abs", ParseStatus.incomplete, "abs", "");
		testNodeParse(new Optional(() => new FixedText("abstract")), "abscract", ParseStatus.valid, "", "abscract");
		testNodeParse(new Optional(() => new FixedText("abstract")), "", ParseStatus.valid, "", "");
		testNodeParse(new Optional(() => new FixedText("abstract")), "  ", ParseStatus.valid, "", "  ");
	});
	test('LitString', () => {
		testNodeParse(new LitString(),`"abc"`, ParseStatus.valid, `"abc"`, "");
		testNodeParse(new LitString(),`"abc`, ParseStatus.incomplete, `"abc`, "");
		testNodeParse(new LitString(),`"`, ParseStatus.incomplete, `"`, "");
		testNodeParse(new LitString(),`abc`, ParseStatus.invalid, "", "abc");
		testNodeParse(new LitString(),`'abc'`, ParseStatus.invalid, "", "'abc'");
	});
	test('LitList', () => {
		testNodeParse(new LitList(),`{123}`, ParseStatus.valid, `{123}`, "");
		testNodeParse(new LitList(),`{123`, ParseStatus.incomplete, `{123`, "");
	});
	test('Multiple', () => {
		testNodeParse(new Multiple(() => new LitInt(), 1),`1 0 33`, ParseStatus.valid, `1 0 33`, "");
		testNodeParse(new Multiple(() => new LitInt(), 1),`1`, ParseStatus.valid, `1`, "");
		testNodeParse(new Multiple(() => new LitInt(), 0),``, ParseStatus.valid, ``, "");
		testNodeParse(new Multiple(() => new LitInt(), 1),``, ParseStatus.invalid, ``, "");
		testNodeParse(new Multiple(() => new LitInt(), 1),`5 6 a`, ParseStatus.valid, `5 6`, " a");
		testNodeParse(new Multiple(() => new LitInt(), 1),`7   `, ParseStatus.valid, `7`, "   ");
	});
	test('CommaNode', () => {
		testNodeParse(new CommaNode(() => new LitInt()),`, 1`, ParseStatus.valid, `, 1`, "");
		testNodeParse(new CommaNode(() => new LitInt()),`1,`, ParseStatus.invalid, ``, "1,");
		testNodeParse(new CommaNode(() => new LitInt()),`,  `, ParseStatus.incomplete, `,`, "  ");
	});
	test('CSV', () => {
		testNodeParse(new CSV(() => new LitInt(),0),`2, 4,3 , 1 `, ParseStatus.valid, `2, 4,3 , 1`, " ");
 		testNodeParse(new CSV(() => new LitInt(),0),`2`, ParseStatus.valid, `2`, "");
		testNodeParse(new CSV(() => new LitInt(),1),`2`, ParseStatus.valid, `2`, "");
		testNodeParse(new CSV(() => new LitInt(),0),``, ParseStatus.valid, ``, "");
		testNodeParse(new CSV(() => new LitInt(),1),``, ParseStatus.incomplete, ``, "");
	});

});