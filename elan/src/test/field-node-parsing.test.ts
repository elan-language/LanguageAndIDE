import * as vscode from 'vscode';
import { ExprNode } from '../frames/nodes/expr-node';
import { ParseStatus } from '../frames/parse-status';
import { testNodeParse } from './testHelpers';
import { LitBool } from '../frames/nodes/lit-bool';
import { LitChar } from '../frames/nodes/lit-char';
import { LitInt } from '../frames/nodes/lit-int';
import { LitFloat } from '../frames/nodes/lit-float';
import { Punctuation } from '../frames/nodes/punctuation';
import { BinOp } from '../frames/nodes/bin-op';
import { UnaryOp } from '../frames/nodes/unary-op';
import { UnaryTerm } from '../frames/nodes/unary-term';
import { BracketedExpression } from '../frames/nodes/bracketed-expression';
import { Optional } from '../frames/nodes/optional';
import { LitString } from '../frames/nodes/lit-string';
import { ListOfT } from '../frames/nodes/list-of-t';
import { Multiple } from '../frames/nodes/multiple';
import { CommaNode } from '../frames/nodes/comma-node';
import { CSV } from '../frames/nodes/csv';
import { IdentifierNode } from '../frames/nodes/identifier-node';
import { FunctionCallNode } from '../frames/nodes/function-call-node';
import { Keyword } from '../frames/nodes/keyword';
import { IndexedTerm } from '../frames/nodes/indexed-term';
import { ListOfExpr } from '../frames/nodes/listOfExpr';
import { TypeNode } from '../frames/nodes/type-node';
import { TypeWithOptGenerics } from '../frames/nodes/type-with-opt-generics';
import { TypeSimpleNode } from '../frames/nodes/type-simple-node';
import { TupleDefNode } from '../frames/nodes/tuple-def-node';
import { Lambda } from '../frames/nodes/lambda';
import { IfExpr } from '../frames/nodes/if-expr';


suite('FieldNode parsing', () => {
	vscode.window.showInformationMessage('Start all unit tests.');
	test('UnaryOp', () => {
		testNodeParse(new UnaryOp(),"", ParseStatus.incomplete, "", "","");
		testNodeParse(new UnaryOp(),"-", ParseStatus.valid, "-", ""," -");
		testNodeParse(new UnaryOp()," not", ParseStatus.valid, " not", ""," not");
		testNodeParse(new UnaryOp(),"+", ParseStatus.invalid, "", "+","");
	});
	test('UnaryTerm', () => {
		testNodeParse(new UnaryTerm(),"", ParseStatus.incomplete, "", "","");
		testNodeParse(new UnaryTerm(),"-3", ParseStatus.valid, "-3", ""," - 3");
		testNodeParse(new UnaryTerm()," not foo", ParseStatus.valid, " not foo", ""," not foo");
		testNodeParse(new UnaryTerm(),"-", ParseStatus.incomplete, "-", ""," -");
		testNodeParse(new UnaryTerm(),"+4", ParseStatus.invalid, "", "+4","");
	});
	test('BinOp', () => {
		testNodeParse(new BinOp(),"", ParseStatus.incomplete, "", "","");
		testNodeParse(new BinOp(),"  ", ParseStatus.incomplete, "", "  ","");
		testNodeParse(new BinOp(),"+", ParseStatus.valid, "+", ""," +");
		testNodeParse(new BinOp(),"-", ParseStatus.valid, "-", ""," -");
		testNodeParse(new BinOp(),"*", ParseStatus.valid, "*", ""," *");
		testNodeParse(new BinOp(),"/", ParseStatus.valid, "/", ""," /");
		testNodeParse(new BinOp(),">", ParseStatus.valid, ">", ""," >");
		testNodeParse(new BinOp(),"<", ParseStatus.valid, "<", ""," <");
		testNodeParse(new BinOp(),">=", ParseStatus.valid, ">=", ""," >=");
		testNodeParse(new BinOp(),"<=", ParseStatus.valid, "<=", ""," <=");
		testNodeParse(new BinOp(),"< =", ParseStatus.valid, "<", " ="," <");

		testNodeParse(new BinOp(),"is", ParseStatus.valid, "is", ""," is");
		testNodeParse(new BinOp(),"is not", ParseStatus.valid, "is not", ""," is not");
		testNodeParse(new BinOp(),"and", ParseStatus.valid, "and", ""," and");
		testNodeParse(new BinOp(),"or", ParseStatus.valid, "or", ""," or");
		testNodeParse(new BinOp(),"xor", ParseStatus.valid, "xor", ""," xor");
		testNodeParse(new BinOp(),"mod", ParseStatus.valid, "mod", ""," mod");
		testNodeParse(new BinOp(),"div", ParseStatus.valid, "div", ""," div");
		testNodeParse(new BinOp(),"d", ParseStatus.incomplete, "d", ""," d");
		testNodeParse(new BinOp(),"%", ParseStatus.invalid, "", "%","");
	});
	test('Expression', () => {
		testNodeParse(new ExprNode(),"", ParseStatus.incomplete, "", "","");
		testNodeParse(new ExprNode(),"  ", ParseStatus.incomplete, "", "  ","");
		testNodeParse(new ExprNode(),"a", ParseStatus.valid, "a", ""," a");
		testNodeParse(new ExprNode(),"a + b", ParseStatus.valid, "a + b", ""," a + b");
		testNodeParse(new ExprNode(), "a + b-c", ParseStatus.valid, "a + b-c", ""," a + b - c");
		testNodeParse(new ExprNode(), "+", ParseStatus.invalid, "", "+","");
		testNodeParse(new ExprNode(),"+b", ParseStatus.invalid, "", "+b","");
		testNodeParse(new ExprNode(), "a +", ParseStatus.incomplete, "a +", ""," a +");
		testNodeParse(new ExprNode(), "a %", ParseStatus.valid, "a", " %"," a");
		testNodeParse(new ExprNode(), "3 * 4 + x", ParseStatus.valid, "3 * 4 + x", ""," 3 * 4 + x");
		testNodeParse(new ExprNode(), "3*foo(5)", ParseStatus.valid, "3*foo(5)", ""," 3 * foo( 5)");
		testNodeParse(new ExprNode(), "points.foo(0.0)", ParseStatus.valid, "points.foo(0.0)", "","");
		testNodeParse(new ExprNode(), "points.reduct(0.0, lambda s,p -> s + p.first() * p.first())", ParseStatus.valid, "points.reduct(0.0, lambda s,p -> s + p.first() * p.first())", "","");
	});
	test('VariableNode', () => {
		testNodeParse(new IdentifierNode(),``, ParseStatus.incomplete, ``, "","");
		testNodeParse(new IdentifierNode(),`  `, ParseStatus.incomplete, ``, "  ","");
		testNodeParse(new IdentifierNode(),`a`, ParseStatus.valid, `a`, ""," a");
		testNodeParse(new IdentifierNode(),`aB_d`, ParseStatus.valid, `aB_d`, ""," aB_d");
		testNodeParse(new IdentifierNode(),`abc `, ParseStatus.valid, `abc`, " "," abc");
		testNodeParse(new IdentifierNode(),`Abc`, ParseStatus.invalid, ``, "Abc","");
		testNodeParse(new IdentifierNode(),`abc-de`, ParseStatus.valid, `abc`, "-de"," abc");
	});
	test('LitBool', () => {
		testNodeParse(new LitBool(), "", ParseStatus.incomplete, "", "","");
		testNodeParse(new LitBool(), " true", ParseStatus.valid, " true", ""," true");
		testNodeParse(new LitBool(), " trueX", ParseStatus.valid, " true", "X"," true");
		testNodeParse(new LitBool(), " false", ParseStatus.valid, " false", ""," false");
		testNodeParse(new LitBool(), " True", ParseStatus.invalid, "", " True","");
		testNodeParse(new LitBool(), "is True", ParseStatus.invalid, "", "is True","");
		testNodeParse(new LitBool(), " tr", ParseStatus.incomplete, " tr", ""," tr");
		testNodeParse(new LitBool(), " tr ", ParseStatus.invalid, "", " tr ","");
	});
	test('LitChar', () => {
		testNodeParse(new LitChar(), "", ParseStatus.incomplete, "", "","");
		testNodeParse(new LitChar(), "'a'", ParseStatus.valid, "'a'", ""," 'a'");
		testNodeParse(new LitChar(), " '9'", ParseStatus.valid, " '9'", ""," '9'");
		testNodeParse(new LitChar(), "'ab'", ParseStatus.invalid, "", "'ab'","");
		testNodeParse(new LitChar(), `"a"`, ParseStatus.invalid, "", `"a"`,"");
	});
	test('LitInt', () => {
		testNodeParse(new LitInt(), "", ParseStatus.incomplete, "", "","");
		testNodeParse(new LitInt(), "   ", ParseStatus.incomplete, "", "   ","");
		testNodeParse(new LitInt(), "123", ParseStatus.valid, "123", ""," 123");
		testNodeParse(new LitInt(), "456  ", ParseStatus.valid, "456", "  "," 456");
		testNodeParse(new LitInt(), " 123a", ParseStatus.valid, " 123", "a"," 123");
		testNodeParse(new LitInt(), "1.23", ParseStatus.valid, "1", ".23"," 1");
		testNodeParse(new LitInt(), "a", ParseStatus.invalid, "", "a","");
	});
	test('LitFloat', () => {
		testNodeParse(new LitFloat(), "", ParseStatus.incomplete, "", "","");
		testNodeParse(new LitFloat(), "1.0", ParseStatus.valid, "1.0", ""," 1.0");
		testNodeParse(new LitFloat(), " 1.0a", ParseStatus.valid, " 1.0", "a"," 1.0");
		testNodeParse(new LitFloat(), "1", ParseStatus.incomplete, "1", ""," 1");
		testNodeParse(new LitFloat(), "1.", ParseStatus.incomplete, "1.", ""," 1.");
		testNodeParse(new LitFloat(), "1. ", ParseStatus.incomplete, "1.", " "," 1.");
	});
	test('Keyword', () => {
		testNodeParse(new Keyword("abstract"), "", ParseStatus.incomplete, "", "","");
		testNodeParse(new Keyword("abstract"), "abstract", ParseStatus.valid, "abstract", ""," abstract");
		testNodeParse(new Keyword("abstract"), "abstract immutable", ParseStatus.valid, "abstract", " immutable"," abstract");
		testNodeParse(new Keyword("abstract"), " abs", ParseStatus.incomplete, " abs", ""," abs");
		testNodeParse(new Keyword("abstract"), " abscract", ParseStatus.invalid, "", " abscract","");
	});
	test('BracketedExpression', () => {
		testNodeParse(new BracketedExpression(),"", ParseStatus.incomplete, "", "","");
		testNodeParse(new BracketedExpression(),"(3)", ParseStatus.valid, "(3)", "","( 3)");
		testNodeParse(new BracketedExpression(),"(3 + 4)", ParseStatus.valid, "(3 + 4)", "","( 3 + 4)");
		testNodeParse(new BracketedExpression(),"(a and not b)", ParseStatus.valid, "(a and not b)", "","( a and not b)");
		testNodeParse(new BracketedExpression(),"(3 * 4 + x)", ParseStatus.valid, "(3 * 4 + x)", "","( 3 * 4 + x)");
		testNodeParse(new BracketedExpression(),"(3 * (4 + x))", ParseStatus.valid, "(3 * (4 + x))", "","( 3 * ( 4 + x))");
		testNodeParse(new BracketedExpression(),"(a and not b", ParseStatus.incomplete, "(a and not b", "","( a and not b");
		testNodeParse(new BracketedExpression(),"(a and not b  ", ParseStatus.incomplete, "(a and not b", "  ","( a and not b");
		testNodeParse(new BracketedExpression(),"(", ParseStatus.incomplete, "(", "","(");
		testNodeParse(new BracketedExpression(),"()", ParseStatus.invalid, "", "()","(");// TODO - change this?
	});
	test('Optional', () => {
		testNodeParse(new Optional(() => new LitInt()),"123 a", ParseStatus.valid, "123", " a"," 123");
		testNodeParse(new Optional(() => new LitInt()), "abc", ParseStatus.valid, "", "abc","");
		testNodeParse(new Optional(() => new Punctuation("abstract")), "abs", ParseStatus.incomplete, "abs", ""," abs");
		testNodeParse(new Optional(() => new Punctuation("abstract")), "abscract", ParseStatus.valid, "", "abscract","");
		testNodeParse(new Optional(() => new Punctuation("abstract")), "", ParseStatus.valid, "", "","");
		testNodeParse(new Optional(() => new Punctuation("abstract")), "  ", ParseStatus.valid, "", "  ","");
	});
	test('LitString', () => {
		testNodeParse(new LitString(),`"abc"`, ParseStatus.valid, `"abc"`, "","");
		testNodeParse(new LitString(),`"abc`, ParseStatus.incomplete, `"abc`, "","");
		testNodeParse(new LitString(),`"`, ParseStatus.incomplete, `"`, "","");
		testNodeParse(new LitString(),`abc`, ParseStatus.invalid, "", "abc","");
		testNodeParse(new LitString(),`'abc'`, ParseStatus.invalid, "", "'abc'","");
	});
	test('Multiple', () => {
		testNodeParse(new Multiple(() => new LitInt(), 0),`)`, ParseStatus.valid, ``, ")","");
		testNodeParse(new Multiple(() => new LitInt(), 1),`1 0 33`, ParseStatus.valid, `1 0 33`, "","");
		testNodeParse(new Multiple(() => new LitInt(), 1),`1`, ParseStatus.valid, `1`, "","");
		testNodeParse(new Multiple(() => new LitInt(), 0),``, ParseStatus.valid, ``, "","");
		testNodeParse(new Multiple(() => new LitInt(), 1),``, ParseStatus.invalid, ``, "","");
		testNodeParse(new Multiple(() => new LitInt(), 1),`5 6 a`, ParseStatus.valid, `5 6`, " a","");
		testNodeParse(new Multiple(() => new LitInt(), 1),`7   `, ParseStatus.valid, `7`, "   ","");
	});
	test('CommaNode', () => {
		testNodeParse(new CommaNode(() => new LitInt()),`, 1`, ParseStatus.valid, `, 1`, "","");
		testNodeParse(new CommaNode(() => new LitInt()),`1,`, ParseStatus.invalid, ``, "1,","");
		testNodeParse(new CommaNode(() => new LitInt()),`,  `, ParseStatus.incomplete, `,`, "  ","");
	});
	test('CSV', () => {
		testNodeParse(new CSV(() => new LitInt(),0),`2, 4,3 , 1 `, ParseStatus.valid, `2, 4,3 , 1`, " ","");
 		testNodeParse(new CSV(() => new LitInt(),0),`2`, ParseStatus.valid, `2`, "","");
		testNodeParse(new CSV(() => new LitInt(),1),`2`, ParseStatus.valid, `2`, "","");
		testNodeParse(new CSV(() => new LitInt(),0),``, ParseStatus.valid, ``, "","");
		testNodeParse(new CSV(() => new LitInt(),1),``, ParseStatus.incomplete, ``, "","");
		testNodeParse(new CSV(() => new LitString(),0),`"apple","orange" , "pear"`, ParseStatus.valid, `"apple","orange" , "pear"`, "","");
		testNodeParse(new CSV(() => new IdentifierNode(),0),`a,b,c`, ParseStatus.valid, `a,b,c`, "","");
		testNodeParse(new CSV(() => new IdentifierNode(),0),`a,b,1`, ParseStatus.valid, `a,b`, ",1","");
		testNodeParse(new CSV(() => new ExprNode(),0),`a + b,c, 1`, ParseStatus.valid, `a + b,c, 1`, "","");
		testNodeParse(new CSV(() => new ExprNode(),0),`)`, ParseStatus.valid, ``, ")","");
	});
	test('Function Call', () => {
		testNodeParse(new FunctionCallNode(),``, ParseStatus.incomplete, ``, "","");
		testNodeParse(new FunctionCallNode(),`  `, ParseStatus.incomplete, ``, "  ","");
		testNodeParse(new FunctionCallNode(),`foo()`, ParseStatus.valid, `foo()`, "","");
		testNodeParse(new FunctionCallNode(),`bar(x, 1, "hello")`, ParseStatus.valid, `bar(x, 1, "hello")`, "","");	
		testNodeParse(new FunctionCallNode(),`yon`, ParseStatus.incomplete, `yon`, "","");
		testNodeParse(new FunctionCallNode(),`yon `, ParseStatus.incomplete, `yon`, " ","");
		testNodeParse(new FunctionCallNode(),`yon(`, ParseStatus.incomplete, `yon(`, "","");
		testNodeParse(new FunctionCallNode(),`yon(a`, ParseStatus.incomplete, `yon(a`, "","");
		testNodeParse(new FunctionCallNode(),`yon(a,`, ParseStatus.incomplete, `yon(a,`, "","");
		testNodeParse(new FunctionCallNode(),`Foo()`, ParseStatus.invalid, ``, "Foo()","");
		testNodeParse(new FunctionCallNode(),`foo[]`, ParseStatus.invalid, ``, "foo[]","");
	});
	test('Literal List of T', () => {
		testNodeParse(new ListOfT(() => new LitInt()),``, ParseStatus.incomplete, ``, "","");
		testNodeParse(new ListOfT(() => new LitInt()),`{1,2,3 ,4 , 5}`, ParseStatus.valid, `{1,2,3 ,4 , 5}`, "","");
		testNodeParse(new ListOfT(() => new LitInt()),`{}`, ParseStatus.valid, `{}`, "","");
		testNodeParse(new ListOfT(() => new LitInt()),`{`, ParseStatus.incomplete, `{`, "","");
		testNodeParse(new ListOfT(() => new LitInt()),`{1,2,3.1}`, ParseStatus.invalid, ``, "{1,2,3.1}","");
		// list of list
		testNodeParse(new ListOfT(() => new ListOfT(() => new LitInt())),``, ParseStatus.incomplete, ``, "","");
		testNodeParse(new ListOfT(() => new ListOfT(() => new LitInt())),`{{}, {}, { }}`, ParseStatus.valid, `{{}, {}, { }}`, "","");
		testNodeParse(new ListOfT(() => new ListOfT(() => new LitInt())),`{{1,2}, {}, {3,4}}`, ParseStatus.valid, `{{1,2}, {}, {3,4}}`, "","");
		testNodeParse(new ListOfT(() => new ListOfT(() => new LitInt())),`{{1,2}, {}, {3,4}`, ParseStatus.incomplete, `{{1,2}, {}, {3,4}`, "","");
		testNodeParse(new ListOfT(() => new ListOfT(() => new LitInt())),`{{1,2, {}, {3,4}}`, ParseStatus.invalid, ``, `{{1,2, {}, {3,4}}`,"");
	});
	test('Indexed term', () => {
		testNodeParse(new IndexedTerm(),`foo[3]`, ParseStatus.valid, "foo[3]","","");
		testNodeParse(new IndexedTerm(),`foo[bar]`, ParseStatus.valid, "foo[bar]","","");
		testNodeParse(new IndexedTerm(),`foo[3..4]`, ParseStatus.valid, "foo[3..4]","","");
		testNodeParse(new IndexedTerm(),`foo[3..]`, ParseStatus.valid, "foo[3..]","","");
		testNodeParse(new IndexedTerm(),`foo[..4]`, ParseStatus.valid, "foo[..4]","","");
	});
	test('ListOfExpr', () => {
		testNodeParse(new ListOfExpr(),`{a, 3+ 4 , func(a, 3) -1, new Foo()}`, ParseStatus.valid, "{a, 3+ 4 , func(a, 3) -1, new Foo()}","","");
	});
	test('TypeSimpleNode', () => {
		testNodeParse(new TypeSimpleNode(),`Foo`, ParseStatus.valid, "Foo","","");
		testNodeParse(new TypeSimpleNode(),`foo`, ParseStatus.invalid, "","foo","");
	});
	test('TypeSingleNode', () => {
		testNodeParse(new TypeWithOptGenerics(),`Foo`, ParseStatus.valid, "Foo","","");
		testNodeParse(new TypeWithOptGenerics(),`foo`, ParseStatus.invalid, "","foo","");
		testNodeParse(new TypeWithOptGenerics(),`Foo<`, ParseStatus.incomplete, "Foo<","","");
		testNodeParse(new TypeWithOptGenerics(),`Foo<of`, ParseStatus.incomplete, "Foo<of","","");
		testNodeParse(new TypeWithOptGenerics(),`Foo<of Bar`, ParseStatus.incomplete, "Foo<of Bar","","");
		testNodeParse(new TypeWithOptGenerics(),`Foo<of Bar>`, ParseStatus.valid, "Foo<of Bar>","","");
		testNodeParse(new TypeWithOptGenerics(),`Foo<of List<of Bar>>`, ParseStatus.valid, "Foo<of List<of Bar>>","","");
	});
	test('TypeNode', () => {
		testNodeParse(new TypeNode(),`Foo<of List<of Bar>>`, ParseStatus.valid, "Foo<of List<of Bar>>","","");//Single
		testNodeParse(new TypeNode(),`(Foo, Bar)`, ParseStatus.valid, "(Foo, Bar)","","");
		testNodeParse(new TypeNode(),`(Foo)`, ParseStatus.invalid, "","(Foo)","");
		testNodeParse(new TypeNode(),`(Foo, Bar, Yon`, ParseStatus.incomplete, "(Foo, Bar, Yon","","");
		testNodeParse(new TypeNode(),`(Foo, (Bar, Yon, Qux))`, ParseStatus.valid, "(Foo, (Bar, Yon, Qux))","","");
		testNodeParse(new TypeNode(),`(Foo, Bar< of Yon>)`, ParseStatus.valid, "(Foo, Bar< of Yon>)","","");
		testNodeParse(new TypeNode(),`Foo<of List<of (Bar, Qux)>>`, ParseStatus.valid, "Foo<of List<of (Bar, Qux)>>","","");
	});
	test('TupleDefNode', () => {
		testNodeParse(new TupleDefNode(),`(foo, 3, bar(a), x)`, ParseStatus.valid, "(foo, 3, bar(a), x)","","");
		testNodeParse(new TupleDefNode(),`(foo)`, ParseStatus.invalid, "","(foo)","");
		testNodeParse(new TupleDefNode(),`(foo, 3, bar(a), x`, ParseStatus.incomplete, "(foo, 3, bar(a), x","","");
	});
	test('Lambda', () => {
		testNodeParse(new Lambda(),`lambda x -> x * x`, ParseStatus.valid, "lambda x -> x * x","","");
		testNodeParse(new Lambda(),`lambda x ->`, ParseStatus.incomplete, "lambda x ->","","");
		testNodeParse(new Lambda(),`lambda x = x * x`, ParseStatus.invalid, "","lambda x = x * x","");
		testNodeParse(new Lambda(),`lambda s,p -> s + p.first()`, ParseStatus.valid, "lambda s,p -> s + p.first()","","");
	});
	test('IfExpr', () => {
		testNodeParse(new IfExpr(),`if cell then Colour.green else Colour.black)`, ParseStatus.valid, "","","");
		testNodeParse(new IfExpr(),`if cell then Colour.amber`, ParseStatus.incomplete, "","","");
		testNodeParse(new IfExpr(),`if attempt[n] is '*' then attempt  else if attempt.isYellow(target, n) then (attempt.setChar(n, '+')  else attempt.setChar(n, '_')`, ParseStatus.valid, "","","");
		testNodeParse(new IfExpr(),`if attempt.isAlreadyMarkedGreen(n) then target else if attempt.isYellow(target, n) then (target.setChar(target.indexOf(attempt[n]), '.') else target))`, ParseStatus.valid, "","","");
	});
});