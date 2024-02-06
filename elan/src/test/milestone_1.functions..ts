import { Constant } from "../frames/globals/constant";
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
import { Else } from "../frames/statements/else";
import { TryCatch } from "../frames/statements/try-catch";
import { GlobalComment } from "../frames/globals/global-comment";
import {CommentStatement} from "../frames/statements/comment-statement";
import { FileImpl } from "../frames/file-impl";
import { SelectStatement } from "../frames/fields/select-statement";
import { GlobalSelector } from "../frames/globals/global-selector";

export function T00_emptyFile() {
	const f = new FileImpl();
	f.addGlobalToEnd(new GlobalSelector(f));
	return f;
}

export function T01_helloWorld() {
	const f = new FileImpl();
	const m = new MainFrame(f);
	f.addGlobalToEnd(m);
	m.removeStatementSelector();
	const comment = new CommentStatement(m);
	comment.text.setTextWithoutParsing(`My first program`);
	m.addStatementAtEnd(comment);
	const pr = new Print(m);
	pr.expr.setTextWithoutParsing(`"Hello World!"`);
	m.addStatementAtEnd(pr);
	return f;
}

export function T02_comments() {
	const f = new FileImpl();
	const sc1 = new GlobalComment(f);
	sc1.text.setTextWithoutParsing("Comment 1");
	f.addGlobalToEnd(sc1);
	const m = new MainFrame(f);
	f.addGlobalToEnd(m);
	m.removeStatementSelector();
	const sc2 = new CommentStatement(m);
	sc2.text.setTextWithoutParsing("Comment 2");
	m.addStatementAtEnd(sc2);
	return f;
}

export function T03_mainWithAllStatements(): FileImpl {
	const f = new FileImpl();
	const m = new MainFrame(f);
	f.addGlobalToEnd(m);
	m.removeStatementSelector();
	const v = new Variable(m);
	m.addStatementAtEnd(v);
	const s = new SetStatement(m);
	s.name.setTextWithoutParsing("a");
	s.expr.setTextWithoutParsing("3 + 4");
	m.addStatementAtEnd(s);
	const t = new Throw(m);
	m.addStatementAtEnd(t);
	const ca = new Call(m);
	ca.proc.setTextWithoutParsing("signIn");
	ca.args.setTextWithoutParsing(`rwp, password`);
	m.addStatementAtEnd(ca);
	const pr = new Print(m);
	pr.expr.setTextWithoutParsing(`"Hello World!"`);
	m.addStatementAtEnd(pr);
	const w = new While(m);
	w.condition.setTextWithoutParsing("newGame");
	m.addStatementAtEnd(w);
	const r = new Repeat(m);
	r.condition.setTextWithoutParsing("score > 20");
	m.addStatementAtEnd(r);
	const for1 = new For(m);
	m.addStatementAtEnd(for1);
	for1.variable.setTextWithoutParsing("i");
	for1.from.setTextWithoutParsing("1");
	for1.to.setTextWithoutParsing("10");
	
	const ea = new Each(m);
	ea.variable.setTextWithoutParsing("letter");
	ea.iter.setTextWithoutParsing("Charlie Duke");
	m.addStatementAtEnd(ea);
	const if1 = new IfThen(m);
    if1.condition.setTextWithoutParsing("y > 4");
	m.addStatementAtEnd(if1);
	const if2 = new IfThen(m);
	m.addStatementAtEnd(if2);
    if2.condition.setTextWithoutParsing("y > 4");
	if2.addStatementAtEnd(new Else(if2));
	if2.addStatementAtEnd(new SelectStatement(if2));
	const if3 = new IfThen(m);
	m.addStatementAtEnd(if3);
    if3.condition.setTextWithoutParsing("y > 4");
	const el = new Else(if3);
	el.hasIf = true;
	el.condition.setTextWithoutParsing("y > 10");
	if3.addStatementAtEnd(el);
	if3.addStatementAtEnd(new SelectStatement(if3));
	if3.addStatementAtEnd(new Else(if3));
	if3.addStatementAtEnd(new SelectStatement(if3));
	const tr = new TryCatch(m);
	m.addStatementAtEnd(tr);
	return f;
}

export function T07_mainWithAllStatementsSelectMainById(f : FileImpl) {
	f.getById("main0").select(true, false);
	return () => f;
}

export function T07_mainWithAllStatementsSelectStatementById(f : FileImpl) {
	f.getById("for21").select(true, false);
	return () => f;
}

export function T08_expandAll(f : FileImpl) {
	f.expandCollapseAll();
	return () => f;
}

export function T08_collapseAll(f : FileImpl) {
	f.expandCollapseAll();
	return () => f;
}

export function T04_allGlobalsExceptClass(): FileImpl {
	const f = new FileImpl();
	const con = new Constant(f);
	con.name.setTextWithoutParsing("phi");
	con.expr.setTextWithoutParsing("1.618");
	f.addGlobalToEnd(con);
	const main = new MainFrame(f);
	f.addGlobalToEnd(main);
	const p = new Procedure(f);
	p.name.setTextWithoutParsing("signIn");
	f.addGlobalToEnd(p);
	const c = new Function(f);
	c.name.setTextWithoutParsing("hypotenuse");
	c.params.setTextWithoutParsing("sideB Float, sideC Float");
	c.returnType.setTextWithoutParsing("Float");
	f.addGlobalToEnd(c);
	const e = new Enum(f);
	e.name.setTextWithoutParsing("Fruit");
	e.values.setTextWithoutParsing("apple, orange, pear");
	f.addGlobalToEnd(e);
	return f;
}

export function T05_classes() {
	const f = new FileImpl();

	const cl1 = new Class(f);
	f.addGlobalToEnd(cl1);
	cl1.name.setTextWithoutParsing("Player");
	cl1.asString.returnStatement.expr.setTextWithoutParsing("a Player");
	const p1 = new Property(cl1);
	cl1.addMemberBeforeAsString(p1);
	p1.name.setTextWithoutParsing("score");
	p1.type.setTextWithoutParsing("Int");

	const cl2 = new Class(f);
	cl2.inherits = true;
	cl2.superClasses.setTextWithoutParsing("Foo, Bar");
	f.addGlobalToEnd(cl2);
	cl2.name.setTextWithoutParsing("Card");
	cl2.immutable = true;
	cl2.asString.returnStatement.expr.setTextWithoutParsing("a Card");
	const p2 = new Property(cl2);
	cl2.addMemberBeforeAsString(p2);
	p2.name.setTextWithoutParsing("value");
	p2.type.setTextWithoutParsing("Int");
	p2.private = true;
	const m1 = new FunctionMethod(cl2);
	cl2.addMemberBeforeAsString(m1);
	m1.name.setTextWithoutParsing("reset");
	m1.params.setTextWithoutParsing("");
	m1.returnType.setTextWithoutParsing("Player");
	return f;
}

/*
main
  var li set to {"plum","apricot","lime","lemon","melon","apple","orange","strawberry","pear","banana"}
  print mergeSort(li)
end main */

export function T06_mergeSort() {
	const f = new FileImpl();
		const main = new MainFrame(f);
		f.addGlobalToEnd(main);
		    main.removeStatementSelector();
			const li = new Variable(main);
			main.addStatementAtEnd(li);
				li.name.setTextWithoutParsing("li");
				li.expr.setTextWithoutParsing(`{"plum","apricot","lime","lemon","melon","apple","orange","strawberry","pear","banana"}`);
			
			const pr = new Print(main);
			main.addStatementAtEnd(pr);
				pr.expr.setTextWithoutParsing("mergeSort(li)");
			
		

		const mergeSort = new Function(f);
		f.addGlobalToEnd(mergeSort);
			mergeSort.removeStatementSelector();
			mergeSort.name.setTextWithoutParsing("mergeSort");
			mergeSort.params.setTextWithoutParsing(`list List<of String>`);
			mergeSort.returnType.setTextWithoutParsing(`List<of String>`);
			const result1 = new Variable(mergeSort);
				mergeSort.addStatementBeforeReturn(result1);
				result1.name.setTextWithoutParsing(`result`);
				result1.expr.setTextWithoutParsing(`list`);

			const if1 = new IfThen(mergeSort);
			mergeSort.addStatementBeforeReturn(if1);
			    if1.removeStatementSelector();
				if1.condition.setTextWithoutParsing(`list.length() > 1`);
				const mid = new Variable(if1);
					if1.addStatementAtEnd(mid);
					mid.name.setTextWithoutParsing(`mid`);
					mid.expr.setTextWithoutParsing(`list.length() div 2`);
				const setMid = new SetStatement(if1);
					if1.addStatementAtEnd(setMid);
					setMid.name.setTextWithoutParsing(`result`);
					setMid.expr.setTextWithoutParsing(`merge(mergeSort(list[..mid]), mergeSort(list[mid..]))`);
				
			mergeSort.returnStatement.expr.setTextWithoutParsing(`result`);
		

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
			merge.name.setTextWithoutParsing(`merge`);
			merge.params.setTextWithoutParsing(`a List<of String>, b List<of String>`);
			merge.returnType.setTextWithoutParsing(`List<of String>`);
			const result = new Variable(merge);
			merge.addStatementBeforeReturn(result);
				result.name.setTextWithoutParsing(`name`);
				result.expr.setTextWithoutParsing(`new List<of String>()`);
			
			const if2 = new IfThen(merge);
			merge.addStatementBeforeReturn(if2);
			    if2.removeStatementSelector();
				if2.condition.setTextWithoutParsing(`a.isEmpty()`);
				const setResult1 = new SetStatement(if2);
					setResult1.name.setTextWithoutParsing(`result`);
					setResult1.expr.setTextWithoutParsing(`b`);
				if2.addStatementAtEnd(setResult1);
			const elif1 = new Else(if2);
				elif1.hasIf = true;
				elif1.condition.setTextWithoutParsing(`b.isEmpty()`);
			if2.addStatementAtEnd(elif1);	
			const setResult2 = new SetStatement(if2);
				setResult2.name.setTextWithoutParsing(`result`);
				setResult2.expr.setTextWithoutParsing(`a`);
			if2.addStatementAtEnd(setResult2);
			const elif2 = new Else(if2);
				elif2.hasIf = true;
				elif2.condition.setTextWithoutParsing(`a[0].isBefore(b[0])`);
			if2.addStatementAtEnd(elif2);	
			const setResult3 = new SetStatement(if2);
				setResult3.name.setTextWithoutParsing(`result`);
				setResult3.expr.setTextWithoutParsing(`a[0] + merge(a[1..], b)`);
			if2.addStatementAtEnd(setResult3);
            const els = new Else(if2);
			if2.addStatementAtEnd(els);
			const setResult4 = new SetStatement(if2);
				setResult4.name.setTextWithoutParsing(`result`);
				setResult4.expr.setTextWithoutParsing(`b[0] + merge(a, b[1..])`);
			if2.addStatementAtEnd(setResult4);
		
		merge.returnStatement.expr.setTextWithoutParsing(`result`);
	
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

export function getTestFrame(fn : string) : FileImpl {
	try {
    	return eval(`${fn}()`);
	}
	catch (e){
		return new FileImpl();
	}
}
