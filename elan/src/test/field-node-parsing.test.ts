import * as vscode from 'vscode';
import { ExprNode } from '../frames/parse-nodes/expr-node';
import { ParseStatus } from '../frames/parse-status';
import { testNodeParse } from './testHelpers';
import { LitBool } from '../frames/parse-nodes/lit-bool';
import { LitChar } from '../frames/parse-nodes/lit-char';
import { LitInt } from '../frames/parse-nodes/lit-int';
import { LitFloat } from '../frames/parse-nodes/lit-float';
import { BinaryOperation } from '../frames/parse-nodes/binary-operation';
import { UnaryExpression } from '../frames/parse-nodes/unary-expression';
import { BracketedExpression } from '../frames/parse-nodes/bracketed-expression';
import { Optional } from '../frames/parse-nodes/optional';
import { LitString } from '../frames/parse-nodes/lit-string';
import { List } from '../frames/parse-nodes/list';
import { Multiple } from '../frames/parse-nodes/multiple';
import { CSV } from '../frames/parse-nodes/csv';
import { IdentifierNode } from '../frames/parse-nodes/identifier-node';
import { FunctionCallNode } from '../frames/parse-nodes/function-call-node';
import { KeywordNode } from '../frames/parse-nodes/keyword-node';
import { IndexableTerm } from '../frames/parse-nodes/indexed-term';
import { TypeNode } from '../frames/parse-nodes/type-node';
import { TypeWithOptGenerics } from '../frames/parse-nodes/type-with-opt-generics';
import { TypeSimpleNode } from '../frames/parse-nodes/type-simple-node';
import { TupleDefNode } from '../frames/parse-nodes/tuple-def-node';
import { Lambda } from '../frames/parse-nodes/lambda';
import { IfExpr } from '../frames/parse-nodes/if-expr';
import { ParamDefNode } from '../frames/parse-nodes/param-def-node';
import { Term } from '../frames/parse-nodes/term';
import { DottedTerm } from '../frames/parse-nodes/dotted-term';


suite('FieldNode parsing', () => {
	vscode.window.showInformationMessage('Start all unit tests.');
	test('UnaryExpression', () => {
		testNodeParse(new UnaryExpression(),"", ParseStatus.empty, "", "","");
		testNodeParse(new UnaryExpression(),"-3", ParseStatus.valid, "-3", "","-3");
		testNodeParse(new UnaryExpression()," not foo", ParseStatus.valid, " not foo", "","not foo");
		testNodeParse(new UnaryExpression(),"-", ParseStatus.incomplete, "-", "","-");
		testNodeParse(new UnaryExpression(),"+4", ParseStatus.invalid, "", "+4","");
	});
	test('BinOp', () => {
		testNodeParse(new BinaryOperation(),"", ParseStatus.empty, "", "","");
		testNodeParse(new BinaryOperation(),"  ", ParseStatus.empty, "", "  ","");
		testNodeParse(new BinaryOperation(),"+", ParseStatus.valid, "+", ""," + ");
		testNodeParse(new BinaryOperation(),"-", ParseStatus.valid, "-", ""," - ");
		testNodeParse(new BinaryOperation(),"*", ParseStatus.valid, "*", ""," * ");
		testNodeParse(new BinaryOperation(),"/", ParseStatus.valid, "/", ""," / ");
		testNodeParse(new BinaryOperation(),">", ParseStatus.valid, ">", ""," > ");
		testNodeParse(new BinaryOperation(),"<", ParseStatus.valid, "<", ""," < ");
		testNodeParse(new BinaryOperation(),">=", ParseStatus.valid, ">=", ""," >= ");
		testNodeParse(new BinaryOperation(),"<=", ParseStatus.valid, "<=", ""," <= ");
		testNodeParse(new BinaryOperation(),"< =", ParseStatus.valid, "<", " ="," < ");

		testNodeParse(new BinaryOperation(),"is", ParseStatus.valid, "is", ""," is ");
		testNodeParse(new BinaryOperation(),"is not", ParseStatus.valid, "is not", ""," is not ");
		testNodeParse(new BinaryOperation(),"and", ParseStatus.valid, "and", ""," and ");
		testNodeParse(new BinaryOperation(),"or", ParseStatus.valid, "or", ""," or ");
		testNodeParse(new BinaryOperation(),"xor", ParseStatus.valid, "xor", ""," xor ");
		testNodeParse(new BinaryOperation(),"mod", ParseStatus.valid, "mod", ""," mod ");
		testNodeParse(new BinaryOperation(),"div", ParseStatus.valid, "div", ""," div ");
		testNodeParse(new BinaryOperation(),"d", ParseStatus.incomplete, "d", "","");
		testNodeParse(new BinaryOperation(),"%", ParseStatus.invalid, "", "%","");
	});
	test('IndexableTerm', () => {
		testNodeParse(new Term(),"a", ParseStatus.valid, "a", "","a");
	});
	test('Term', () => {
		testNodeParse(new Term(),"", ParseStatus.empty, "", "","");
		testNodeParse(new Term(),"a", ParseStatus.valid, "a", "","a");
	});
	test('Expression', () => {
		testNodeParse(new ExprNode(),"", ParseStatus.empty, "", "","");
		testNodeParse(new ExprNode(),"  ", ParseStatus.empty, "", "  ","");
		testNodeParse(new ExprNode(),"a", ParseStatus.valid, "a", "","a");
		testNodeParse(new ExprNode(),"a + b", ParseStatus.valid, "a + b", "","a + b");
		testNodeParse(new ExprNode(), "a + b-c", ParseStatus.valid, "a + b-c", "","a + b - c");
		testNodeParse(new ExprNode(), "+", ParseStatus.invalid, "", "+","");
		testNodeParse(new ExprNode(),"+b", ParseStatus.invalid, "", "+b","");
		testNodeParse(new ExprNode(), "a +", ParseStatus.incomplete, "a +", "","a + ");
		testNodeParse(new ExprNode(), "a %", ParseStatus.valid, "a", " %","a");
		testNodeParse(new ExprNode(), "3 * 4 + x", ParseStatus.valid, "3 * 4 + x", "","3 * 4 + x");
		testNodeParse(new ExprNode(), "3*foo(5)", ParseStatus.valid, "3*foo(5)", "","3 * foo(5)");
		testNodeParse(new ExprNode(), "points.foo(0.0)", ParseStatus.valid, "points.foo(0.0)", "","points.foo(0.0)");
		testNodeParse(new ExprNode(), "reduce(0.0, lambda s as String, p as List<of String> return s + p.first() * p.first())", ParseStatus.valid, "reduce(0.0, lambda s as String, p as List<of String> return s + p.first() * p.first())", "","");
	});
	test('VariableNode', () => {
		testNodeParse(new IdentifierNode(),``, ParseStatus.empty, ``, "","");
		testNodeParse(new IdentifierNode(),`  `, ParseStatus.empty, ``, "  ","");
		testNodeParse(new IdentifierNode(),`a`, ParseStatus.valid, `a`, "","a");
		testNodeParse(new IdentifierNode(),`aB_d`, ParseStatus.valid, `aB_d`, "","aB_d");
		testNodeParse(new IdentifierNode(),`abc `, ParseStatus.valid, `abc`, " ","abc");
		testNodeParse(new IdentifierNode(),`Abc`, ParseStatus.invalid, ``, "Abc","");
		testNodeParse(new IdentifierNode(),`abc-de`, ParseStatus.valid, `abc`, "-de","abc");
	});
	test('LitBool', () => {
		testNodeParse(new LitBool(), "", ParseStatus.empty, "", "","");
		testNodeParse(new LitBool(), " true", ParseStatus.valid, " true", "","true ");
		testNodeParse(new LitBool(), " trueX", ParseStatus.valid, " true", "X","true ");
		testNodeParse(new LitBool(), " false", ParseStatus.valid, " false", "","false ");
		testNodeParse(new LitBool(), " True", ParseStatus.invalid, "", " True","");
		testNodeParse(new LitBool(), "is True", ParseStatus.invalid, "", "is True","");
		testNodeParse(new LitBool(), " tr", ParseStatus.incomplete, " tr", "","tr ");
		testNodeParse(new LitBool(), " tr ", ParseStatus.invalid, "", " tr ","");
	});
	test('LitChar', () => {
		testNodeParse(new LitChar(), "", ParseStatus.empty, "", "","");
		testNodeParse(new LitChar(), "'a'", ParseStatus.valid, "'a'", "","'a'");
		testNodeParse(new LitChar(), " '9'", ParseStatus.valid, " '9'", "","'9'");
		testNodeParse(new LitChar(), "'ab'", ParseStatus.invalid, "", "'ab'","");
		testNodeParse(new LitChar(), `"a"`, ParseStatus.invalid, "", `"a"`,"");
	});
	test('LitInt', () => {
		testNodeParse(new LitInt(), "", ParseStatus.empty, "", "","");
		testNodeParse(new LitInt(), "   ", ParseStatus.empty, "", "   ","");
		testNodeParse(new LitInt(), "123", ParseStatus.valid, "123", "","123");
		testNodeParse(new LitInt(), "456  ", ParseStatus.valid, "456", "  ","456");
		testNodeParse(new LitInt(), " 123a", ParseStatus.valid, " 123", "a","123");
		testNodeParse(new LitInt(), "1.23", ParseStatus.valid, "1", ".23","1");
		testNodeParse(new LitInt(), "a", ParseStatus.invalid, "", "a","");
	});
	test('LitFloat', () => {
		testNodeParse(new LitFloat(), "", ParseStatus.empty, "", "","");
		testNodeParse(new LitFloat(), "1.0", ParseStatus.valid, "1.0", "","1.0");
		testNodeParse(new LitFloat(), " 1.0a", ParseStatus.valid, " 1.0", "a","1.0");
		testNodeParse(new LitFloat(), "1", ParseStatus.incomplete, "1", "","1");
		testNodeParse(new LitFloat(), "1.", ParseStatus.incomplete, "1.", "","1.");
		testNodeParse(new LitFloat(), "1. ", ParseStatus.incomplete, "1.", " ","1.");
		testNodeParse(new LitFloat(), "1.1e5", ParseStatus.valid, "1.1e5", "","1.1e5");
		testNodeParse(new LitFloat(), "1.1e-5", ParseStatus.valid, "1.1e-5", "","1.1e-5");
	});
	test('Keyword', () => {
		testNodeParse(new KeywordNode("abstract"), "", ParseStatus.empty, "", "","");
		testNodeParse(new KeywordNode("abstract"), "abstract ", ParseStatus.valid, "abstract", "","");
		testNodeParse(new KeywordNode("abstract"), "abstract(x", ParseStatus.valid, "abstract", "(x","");
		testNodeParse(new KeywordNode("abstract"), "abstractx", ParseStatus.invalid, "", "abstractx","");
		testNodeParse(new KeywordNode("abstract"), "abstract immutable", ParseStatus.valid, "abstract", " immutable","abstract ");
		testNodeParse(new KeywordNode("abstract"), " abs", ParseStatus.incomplete, " abs", "","abs ");
		testNodeParse(new KeywordNode("abstract"), " abscract", ParseStatus.invalid, "", " abscract","");
	});
	test('BracketedExpression', () => {
		testNodeParse(new BracketedExpression(),"", ParseStatus.empty, "", "","");
		testNodeParse(new BracketedExpression(),"(3)", ParseStatus.valid, "(3)", "","(3)");
		testNodeParse(new BracketedExpression(),"(3 + 4)", ParseStatus.valid, "(3 + 4)", "","(3 + 4)");
		testNodeParse(new BracketedExpression(),"(a and not b)", ParseStatus.valid, "(a and not b)", "","(a and not b)");
		testNodeParse(new BracketedExpression(),"(3 * 4 + x)", ParseStatus.valid, "(3 * 4 + x)", "","(3 * 4 + x)");
		testNodeParse(new BracketedExpression(),"(3 * (4 + x))", ParseStatus.valid, "(3 * (4 + x))", "","(3 * (4 + x))");
		testNodeParse(new BracketedExpression(),"(a and not b", ParseStatus.incomplete, "(a and not b", "","(a and not b");
		testNodeParse(new BracketedExpression(),"(a and not b  ", ParseStatus.incomplete, "(a and not b", "  ","(a and not b");
		testNodeParse(new BracketedExpression(),"(", ParseStatus.incomplete, "(", "","(");
		testNodeParse(new BracketedExpression(),"()", ParseStatus.invalid, "", "()","(");// TODO - change this?
	});
	test('Optional', () => {
		testNodeParse(new Optional(() => new LitInt()),"123 a", ParseStatus.valid, "123", " a","123");
		testNodeParse(new Optional(() => new LitInt()), "abc", ParseStatus.valid, "", "abc","");
		testNodeParse(new Optional(() => new KeywordNode("abstract")), " abstract", ParseStatus.valid, " abstract", "","abstract ","<keyword>abstract </keyword>");
		testNodeParse(new Optional(() => new KeywordNode("abstract")), "abs", ParseStatus.incomplete, "abs", "","");
		testNodeParse(new Optional(() => new KeywordNode("abstract")), "abscract", ParseStatus.valid, "", "abscract","");
		testNodeParse(new Optional(() => new KeywordNode("abstract")), "", ParseStatus.valid, "", "","");
		testNodeParse(new Optional(() => new KeywordNode("abstract")), "  ", ParseStatus.valid, "", "  ","");
	});
	test('LitString', () => {
		testNodeParse(new LitString(),`"abc"`, ParseStatus.valid, `"abc"`, "","",`<string>"abc"</string>`);
		testNodeParse(new LitString(),`"abc`, ParseStatus.incomplete, `"abc`, "","");
		testNodeParse(new LitString(),`"`, ParseStatus.incomplete, `"`, "","");
		testNodeParse(new LitString(),`abc`, ParseStatus.invalid, "", "abc","");
		testNodeParse(new LitString(),`'abc'`, ParseStatus.invalid, "", "'abc'","");
	});
	test('Multiple', () => {
		testNodeParse(new Multiple(() => new LitInt(), 0),``, ParseStatus.valid, ``, "","");
		testNodeParse(new Multiple(() => new LitInt(), 1),``, ParseStatus.empty, ``, "","");
		testNodeParse(new Multiple(() => new LitInt(), 0),`)`, ParseStatus.valid, ``, ")","");
		testNodeParse(new Multiple(() => new LitInt(), 1),`1 0 33`, ParseStatus.valid, `1 0 33`, "","");
		testNodeParse(new Multiple(() => new LitInt(), 1),`1`, ParseStatus.valid, `1`, "","");
		testNodeParse(new Multiple(() => new LitInt(), 0),``, ParseStatus.valid, ``, "","");
		testNodeParse(new Multiple(() => new LitInt(), 1),``, ParseStatus.empty, ``, "","");
		testNodeParse(new Multiple(() => new LitInt(), 1),`5 6 a`, ParseStatus.valid, `5 6`, " a","");
		testNodeParse(new Multiple(() => new LitInt(), 1),`7   `, ParseStatus.valid, `7`, "   ","");

		testNodeParse(new Multiple(() => new KeywordNode("foo"), 1),`foo foo`, ParseStatus.valid, "", "","");
		testNodeParse(new Multiple(() => new KeywordNode("bar"), 1),`bar ba`, ParseStatus.incomplete, "bar ba", "","");
		testNodeParse(new Multiple(() => new KeywordNode("foo"), 1),`foo`, ParseStatus.valid, "", "","");
		testNodeParse(new Multiple(() => new KeywordNode("foo"), 1),`fo`, ParseStatus.incomplete, "", "","");
		testNodeParse(new Multiple(() => new KeywordNode("foo"), 1),`foo,foo`, ParseStatus.valid, "", ",foo","");
		testNodeParse(new Multiple(() => new KeywordNode("foo"), 1),`foofoo`, ParseStatus.invalid, "", "foofoo","");
	});
	test('CSV', () => {
		testNodeParse(new CSV(() => new LitInt(),0),``, ParseStatus.valid, ``, "","");
		testNodeParse(new CSV(() => new LitInt(),1),``, ParseStatus.empty, ``, "","");
		testNodeParse(new CSV(() => new LitInt(),0),`2, 4,3 , 1 `, ParseStatus.valid, `2, 4,3 , 1`, " ","2, 4, 3, 1");
 		testNodeParse(new CSV(() => new LitInt(),0),`2`, ParseStatus.valid, `2`, "","");
		testNodeParse(new CSV(() => new LitInt(),1),`2`, ParseStatus.valid, `2`, "","");
		testNodeParse(new CSV(() => new LitString(),0),`"apple","orange" , "pear"`, ParseStatus.valid, `"apple","orange" , "pear"`, "",`"apple", "orange", "pear"`);
		testNodeParse(new CSV(() => new IdentifierNode(),0),`a,b,c`, ParseStatus.valid, `a,b,c`, "","");
		testNodeParse(new CSV(() => new IdentifierNode(),0),`a,b,1`, ParseStatus.valid, `a,b`, ",1","");
		testNodeParse(new CSV(() => new ExprNode(),0),`a + b,c, 1`, ParseStatus.valid, `a + b,c, 1`, "","");
		testNodeParse(new CSV(() => new ExprNode(),0),`)`, ParseStatus.valid, ``, ")","");

		testNodeParse(new CSV(() => new KeywordNode("foo"),0),`foo, foo `, ParseStatus.valid, "","");
		testNodeParse(new CSV(() => new KeywordNode("foo"),0),`foo `, ParseStatus.valid, "","");
		testNodeParse(new CSV(() => new KeywordNode("foo"),1),`fook `, ParseStatus.invalid, "","");
		testNodeParse(new CSV(() => new KeywordNode("foo"),0),`fo`, ParseStatus.incomplete, "fo","");
		testNodeParse(new CSV(() => new KeywordNode("foo"),2),`foo, fo`, ParseStatus.incomplete, "foo, fo","");

		testNodeParse(new CSV(() => new ExprNode(),0),``, ParseStatus.valid, "","");
	});
	test('Function Call', () => {
		testNodeParse(new FunctionCallNode(),``, ParseStatus.empty, ``, "","");
		testNodeParse(new FunctionCallNode(),`  `, ParseStatus.empty, ``, "  ","");
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
	test('Lists', () => {
		testNodeParse(new List(() => new LitInt()),``, ParseStatus.empty, ``, "","");
		testNodeParse(new List(() => new LitInt()),`[1,2,3 ,4 , 5]`, ParseStatus.valid, `[1,2,3 ,4 , 5]`, "","");
		testNodeParse(new List(() => new LitInt()),`[]`, ParseStatus.valid, `[]`, "","");
		testNodeParse(new List(() => new LitInt()),`[`, ParseStatus.incomplete, `[`, "","");
		testNodeParse(new List(() => new LitInt()),`[1,2,3.1]`, ParseStatus.invalid, ``, "[1,2,3.1]","");
		// list of list
		testNodeParse(new List(() => new List(() => new LitInt())),``, ParseStatus.empty, ``, "","");
		testNodeParse(new List(() => new List(() => new LitInt())),`[[], [], [ ]]`, ParseStatus.valid, `[[], [], [ ]]`, "","");
		testNodeParse(new List(() => new List(() => new LitInt())),`[[1,2], [], [3,4]]`, ParseStatus.valid, `[[1,2], [], [3,4]]`, "","");
		testNodeParse(new List(() => new List(() => new LitInt())),`[[1,2], [], [3,4]`, ParseStatus.incomplete, `[[1,2], [], [3,4]`, "","");
		testNodeParse(new List(() => new List(() => new LitInt())),`[[1,2, [], [3,4]]`, ParseStatus.invalid, ``, `[[1,2, [], [3,4]]`,"");
	});
	test('Indexed term', () => {
		testNodeParse(new IndexableTerm(),`foo[3]`, ParseStatus.valid, "foo[3]","","");
		testNodeParse(new IndexableTerm(),`foo[bar]`, ParseStatus.valid, "foo[bar]","","");
		testNodeParse(new IndexableTerm(),`foo[3..4]`, ParseStatus.valid, "foo[3..4]","","");
		testNodeParse(new IndexableTerm(),`foo[3..]`, ParseStatus.valid, "foo[3..]","","");
		testNodeParse(new IndexableTerm(),`foo[..4]`, ParseStatus.valid, "foo[..4]","","");
	});
	test('List of expressions', () => {
		testNodeParse(new List(() => new ExprNode()),`[a, 3+ 4 , func(a, 3) -1, new Foo()]`, ParseStatus.valid, "[a, 3+ 4 , func(a, 3) -1, new Foo()]","","");
	});
	test('TypeSimpleNode', () => {
		testNodeParse(new TypeSimpleNode(),`Foo`, ParseStatus.valid, "Foo","","","<type>Foo</type>");
		testNodeParse(new TypeSimpleNode(),`foo`, ParseStatus.invalid, "","foo","");
	});
	test('TypeWithOptGenerics', () => {
		testNodeParse(new TypeWithOptGenerics(),`Foo`, ParseStatus.valid, "Foo","","");
		testNodeParse(new TypeWithOptGenerics(),`foo`, ParseStatus.invalid, "","foo","");
		testNodeParse(new TypeWithOptGenerics(),`Foo<`, ParseStatus.incomplete, "Foo<","","");
		testNodeParse(new TypeWithOptGenerics(),`Foo<of`, ParseStatus.incomplete, "Foo<of","","");
		testNodeParse(new TypeWithOptGenerics(),`Foo<of Bar`, ParseStatus.incomplete, "Foo<of Bar","","");
		testNodeParse(new TypeWithOptGenerics(),`Foo<of Bar>`, ParseStatus.valid, "Foo<of Bar>","","","<type>Foo</type>&lt;<keyword>of </keyword><type>Bar</type>&gt;");
		testNodeParse(new TypeWithOptGenerics(),`Foo<of List<of Bar>>`, ParseStatus.valid, "Foo<of List<of Bar>>","","","<type>Foo</type>&lt;<keyword>of </keyword><type>List</type>&lt;<keyword>of </keyword><type>Bar</type>&gt;&gt;");
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
		testNodeParse(new Lambda(),`lambda x as Int return x * x`, ParseStatus.valid, "lambda x as Int return x * x","","");
		testNodeParse(new Lambda(),`lambda x`, ParseStatus.incomplete, "lambda x","","");
		testNodeParse(new Lambda(),`lambda x return x * x`, ParseStatus.invalid, "","lambda x return x * x","");
		testNodeParse(new Lambda(),`lambda s as Int, p as List<of Int> return s + p.first()`, ParseStatus.valid, "","","");
	});
	test('IfExpr', () => {
		testNodeParse(new IfExpr(),`if cell then Colour.green else Colour.black)`, ParseStatus.valid, "","","");
		testNodeParse(new IfExpr(),`if cell then Colour.amber`, ParseStatus.incomplete, "","","");
		testNodeParse(new IfExpr(),`if attempt[n] is '*' then attempt  else if attempt.isYellow(target, n) then (attempt.setChar(n, '+')  else attempt.setChar(n, '_')`, ParseStatus.valid, "","","");
		testNodeParse(new IfExpr(),`if attempt.isAlreadyMarkedGreen(n) then target else if attempt.isYellow(target, n) then (target.setChar(target.indexOf(attempt[n]), '.') else target))`, ParseStatus.valid, "","","");
	});
	test('ParamDefNode', () => {
		testNodeParse(new ParamDefNode(),`a as String`, ParseStatus.valid, "a as String","","");
		testNodeParse(new ParamDefNode(),`a`, ParseStatus.incomplete, "a","","");
		testNodeParse(new ParamDefNode(),`a as`, ParseStatus.incomplete, "a as","","");
		testNodeParse(new ParamDefNode(),`A`, ParseStatus.invalid, "","","");
		testNodeParse(new ParamDefNode(),`a String`, ParseStatus.invalid, "","a String","");
	});
	test('Param List', () => {
		testNodeParse(new CSV(() => new ParamDefNode(), 0),`A as string`, ParseStatus.valid, "","A as string",""); //i.e. all leftover
 		testNodeParse(new CSV(() => new ParamDefNode(), 0),``, ParseStatus.valid, "","","");
		testNodeParse(new CSV(() => new ParamDefNode(), 0),`a as String`, ParseStatus.valid, "","","");
		testNodeParse(new CSV(() => new ParamDefNode(), 0),`a as String, bb as Int, foo as Bar`, ParseStatus.valid, "","","");
		testNodeParse(new CSV(() => new ParamDefNode(), 0),`a`, ParseStatus.incomplete, "a","","");
		testNodeParse(new CSV(() => new ParamDefNode(), 0),`a as String,`, ParseStatus.incomplete, "a as String,","","");
		testNodeParse(new CSV(() => new ParamDefNode(), 0),`a as String, bb as`, ParseStatus.incomplete, "","","");
	});
	test('DottedTerm', () => {
		testNodeParse(new DottedTerm(),`foo.bar()`, ParseStatus.valid, "foo.bar()","","foo.bar()","foo.<method>bar</method>()");
	});
});