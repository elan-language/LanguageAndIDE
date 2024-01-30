import { Constant } from "../frames/globals/constant";
import { File } from "../frames/file";
import { resetId } from "../frames/helpers";
import { MainFrame } from "../frames/globals/main-frame";
import { SetStatement } from "../frames/statements/set-statement";
import { Variable } from "../frames/statements/variable";
import { Procedure } from "../frames/globals/procedure";
import { Function } from "../frames/globals/function";
import { FunctionMethod } from "../frames/class-members/function-method";
import { Enum } from "../frames/globals/enum";
import { Class } from "../frames/globals/class";
import { Property } from "../frames/class-members/property";
import { Throw } from "../frames/statements/throw";
import { Call } from "../frames/statements/call";
import { Print } from "../frames/statements/print";
import { While } from "../frames/statements/while";
import { Repeat } from "../frames/statements/repeat";
import { For } from "../frames/statements/for";
import { Each } from "../frames/statements/each";
import { IfThen } from "../frames/statements/if-then";
import { Else } from "../frames/clauses/else";
import { TryCatch } from "../frames/statements/try-catch";
import { GlobalComment } from "../frames/globals/global-comment";
import {CommentStatement} from "../frames/statements/comment-statement";
import { SelectGlobal } from "../frames/globals/select-global";
import { SelectStatement } from "../frames/statements/select-statement";

export function T00_emptyFile() {
	resetId();
	const f = new File();
	f.addGlobalToEnd(new SelectGlobal(f));
	return f;
}

export function T01_helloWorld() {
	const f = new File();
	const m = new MainFrame(f);
	f.addGlobalToEnd(m);
	m.removeStatementSelector();
	const comment = new CommentStatement(m);
	comment.text.enterText(`My first program`);
	m.addStatementAtEnd(comment);
	const pr = new Print(m);
	pr.expr.enterText(`"Hello World!"`);
	m.addStatementAtEnd(pr);
	return f;
}

export function T02_comments() {
	const f = new File();
	const sc1 = new GlobalComment(f);
	sc1.text.enterText("Comment 1");
	f.addGlobalToEnd(sc1);
	const m = new MainFrame(f);
	f.addGlobalToEnd(m);
	m.removeStatementSelector();
	const sc2 = new CommentStatement(m);
	sc2.text.enterText("Comment 2");
	m.addStatementAtEnd(sc2);
	return f;
}

export function T03_mainWithAllStatements() {
	const f = new File();
	const m = new MainFrame(f);
	f.addGlobalToEnd(m);
	m.removeStatementSelector();
	const v = new Variable(m);
	m.addStatementAtEnd(v);
	const s = new SetStatement(m);
	s.name.enterText("a");
	s.expr.enterText("3 + 4");
	m.addStatementAtEnd(s);
	const t = new Throw(m);
	m.addStatementAtEnd(t);
	const ca = new Call(m);
	ca.proc.enterText("signIn");
	ca.args.enterText(`rwp, password`);
	m.addStatementAtEnd(ca);
	const pr = new Print(m);
	pr.expr.enterText(`"Hello World!"`);
	m.addStatementAtEnd(pr);
	const w = new While(m);
	w.condition.enterText("newGame");
	m.addStatementAtEnd(w);
	const r = new Repeat(m);
	r.condition.enterText("score > 20");
	m.addStatementAtEnd(r);
	const for1 = new For(m);
	m.addStatementAtEnd(for1);
	for1.variable.enterText("i");
	for1.from.enterText("1");
	for1.to.enterText("10");
	
	const ea = new Each(m);
	ea.variable.enterText("letter");
	ea.iter.enterText("Charlie Duke");
	m.addStatementAtEnd(ea);
	const if1 = new IfThen(m);
    if1.condition.enterText("y > 4");
	m.addStatementAtEnd(if1);
	const if2 = new IfThen(m);
	m.addStatementAtEnd(if2);
    if2.condition.enterText("y > 4");
	if2.addStatementAtEnd(new Else(if2));
	if2.addStatementAtEnd(new SelectStatement(if2));
	const if3 = new IfThen(m);
	m.addStatementAtEnd(if3);
    if3.condition.enterText("y > 4");
	const el = new Else(if3);
	el.hasIf = true;
	el.condition.enterText("y > 10");
	if3.addStatementAtEnd(el);
	if3.addStatementAtEnd(new SelectStatement(if3));
	if3.addStatementAtEnd(new Else(if3));
	if3.addStatementAtEnd(new SelectStatement(if3));
	const tr = new TryCatch(m);
	m.addStatementAtEnd(tr);
	return f;
}

export function T07_mainWithAllStatementsSelectMainById(f : File) {
	f.selectByID("main2", false);
	return () => f;
}

export function T07_mainWithAllStatementsSelectStatementById(f : File) {
	f.selectByID("for28", false);
	return () => f;
}

export function T08_expandAll(f : File) {
	f.expandAll();
	return () => f;
}

export function T08_collapseAll(f : File) {
	f.collapseAll();
	return () => f;
}

export function T04_allGlobalsExceptClass() {
	const f = new File();
	const con = new Constant(f);
	con.name.enterText("phi");
	con.expr.enterText("1.618");
	f.addGlobalToEnd(con);
	const main = new MainFrame(f);
	f.addGlobalToEnd(main);
	const p = new Procedure(f);
	p.name.enterText("signIn");
	f.addGlobalToEnd(p);
	const c = new Function(f);
	c.name.enterText("hypotenuse");
	c.params.enterText("sideB Float, sideC Float");
	c.returnType.enterText("Float");
	f.addGlobalToEnd(c);
	const e = new Enum(f);
	e.name.enterText("Fruit");
	e.values.enterText("apple, orange, pear");
	f.addGlobalToEnd(e);
	return f;
}

export function T05_classes() {
	const f = new File();

	const cl1 = new Class(f);
	f.addGlobalToEnd(cl1);
	cl1.name.enterText("Player");
	cl1.asString.returnStatement.expr.enterText("a Player");
	const p1 = new Property(cl1);
	cl1.addMemberBeforeAsString(p1);
	p1.name.enterText("score");
	p1.type.enterText("Int");

	const cl2 = new Class(f);
	cl2.inherits = true;
	cl2.superClasses.enterText("Foo, Bar");
	f.addGlobalToEnd(cl2);
	cl2.name.enterText("Card");
	cl2.immutable = true;
	cl2.asString.returnStatement.expr.enterText("a Card");
	const p2 = new Property(cl2);
	cl2.addMemberBeforeAsString(p2);
	p2.name.enterText("value");
	p2.type.enterText("Int");
	p2.private = true;
	const m1 = new FunctionMethod(cl2);
	cl2.addMemberBeforeAsString(m1);
	m1.name.enterText("reset");
	m1.params.enterText("");
	m1.returnType.enterText("Player");
	return f;
}

/*
main
  var li set to {"plum","apricot","lime","lemon","melon","apple","orange","strawberry","pear","banana"}
  print mergeSort(li)
end main */

export function T06_mergeSort() {
	resetId();
	const f = new File();
		const main = new MainFrame(f);
		f.addGlobalToEnd(main);
		    main.removeStatementSelector();
			const li = new Variable(main);
			main.addStatementAtEnd(li);
				li.name.enterText("li");
				li.expr.enterText(`{"plum","apricot","lime","lemon","melon","apple","orange","strawberry","pear","banana"}`);
			
			const pr = new Print(main);
			main.addStatementAtEnd(pr);
				pr.expr.enterText("mergeSort(li)");
			
		

		const mergeSort = new Function(f);
		f.addGlobalToEnd(mergeSort);
			mergeSort.removeStatementSelector();
			mergeSort.name.enterText("mergeSort");
			mergeSort.params.enterText(`list List<of String>`);
			mergeSort.returnType.enterText(`List<of String>`);
			const result1 = new Variable(mergeSort);
				mergeSort.addStatementBeforeReturn(result1);
				result1.name.enterText(`result`);
				result1.expr.enterText(`list`);

			const if1 = new IfThen(mergeSort);
			mergeSort.addStatementBeforeReturn(if1);
			    if1.removeStatementSelector();
				if1.condition.enterText(`list.length() > 1`);
				const mid = new Variable(if1);
					if1.addStatementAtEnd(mid);
					mid.name.enterText(`mid`);
					mid.expr.enterText(`list.length() div 2`);
				const setMid = new SetStatement(if1);
					if1.addStatementAtEnd(setMid);
					setMid.name.enterText(`result`);
					setMid.expr.enterText(`merge(mergeSort(list[..mid]), mergeSort(list[mid..]))`);
				
			mergeSort.returnStatement.expr.enterText(`result`);
		

		/*
function mergeSort(list List<of String>) as List<of String> 
    var result set to list
    if list.length() > 1 then
      var mid set to list.length() div 2 
      set result to merge(mergeSort(list[..mid]), mergeSort(list[mid..]))
    end if
    return result
end function */

		const merge = new Function(f);
		f.addGlobalToEnd(merge);
		
		    merge.removeStatementSelector();
			merge.name.enterText(`merge`);
			merge.params.enterText(`a List<of String>, b List<of String>`);
			merge.returnType.enterText(`List<of String>`);
			const result = new Variable(merge);
			merge.addStatementBeforeReturn(result);
				result.name.enterText(`name`);
				result.expr.enterText(`new List<of String>()`);
			
			const if2 = new IfThen(merge);
			merge.addStatementBeforeReturn(if2);
			    if2.removeStatementSelector();
				if2.condition.enterText(`a.isEmpty()`);
				const setResult1 = new SetStatement(if2);
					setResult1.name.enterText(`result`);
					setResult1.expr.enterText(`b`);
				if2.addStatementAtEnd(setResult1);
			const elif1 = new Else(if2);
				elif1.hasIf = true;
				elif1.condition.enterText(`b.isEmpty()`);
			if2.addStatementAtEnd(elif1);	
			const setResult2 = new SetStatement(if2);
				setResult2.name.enterText(`result`);
				setResult2.expr.enterText(`a`);
			if2.addStatementAtEnd(setResult2);
			const elif2 = new Else(if2);
				elif2.hasIf = true;
				elif2.condition.enterText(`a[0].isBefore(b[0])`);
			if2.addStatementAtEnd(elif2);	
			const setResult3 = new SetStatement(if2);
				setResult3.name.enterText(`result`);
				setResult3.expr.enterText(`a[0] + merge(a[1..], b)`);
			if2.addStatementAtEnd(setResult3);
            const els = new Else(if2);
			if2.addStatementAtEnd(els);
			const setResult4 = new SetStatement(if2);
				setResult4.name.enterText(`result`);
				setResult4.expr.enterText(`b[0] + merge(a, b[1..])`);
			if2.addStatementAtEnd(setResult4);
		
		merge.returnStatement.expr.enterText(`result`);
	
	return f;
}
/*function merge(a List<of String>, b List<of String>) as List<of String>
    var result set to new List<of String>()
    if a.isEmpty() then 
      set result to b 
    else if b.isEmpty() then
      set result to a
    else if a[0].isBefore(b[0]) then 
      set result to a[0] + merge(a[1..], b) 
    else 
      set result to b[0] + merge(a, b[1..])
    end if
    return result
end function
*/

export function getTestFrame(fn : string) : File {
	try {
    	return eval(`${fn}()`);
	}
	catch (e){
		return new File();
	}
}
