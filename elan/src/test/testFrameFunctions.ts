import { Constant } from "../frames/globals/constant";
import { FileFrame } from "../frames/file-frame";
import { Frame } from "../frames/frame";
import { resetId } from "../frames/helpers";
import { MainFrame } from "../frames/globals/main-frame";
import { SetStatement } from "../frames/statements/set-statement";
import { Variable } from "../frames/statements/variable";
import { Procedure } from "../frames/globals/procedure";
import { Function } from "../frames/globals/function";
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
import { StatementSelector } from "../frames/statements/statement-selector";
import { TryCatch } from "../frames/statements/try-catch";
import { GlobalSelector } from "../frames/globals/global-selector";
import { Comment } from "../frames/globals/comment";
import {CommentStatement} from "../frames/statements/comment-statement";

export function T00_emptyFile() {
	resetId();
	const f = new FileFrame();
	f.addGlobal(new GlobalSelector());
	return f;
}

export function T02_comments() {
	const file = new FileFrame();
	const sc1 = new Comment();
	sc1.text.enterText("Comment 1");
	file.addGlobal(sc1);
	const main = new MainFrame();
	file.addGlobal(main);
	main.removeStatementSelector();
	const sc2 = new CommentStatement();
	sc2.text.enterText("Comment 2");
	main.addStatement(sc2);
	return file;
}

export function T03_mainWithAllStatements() {
	const file = new FileFrame();
	const main = new MainFrame();
	file.addGlobal(main);
	main.removeStatementSelector();
	const v = new Variable();
	main.addStatement(v);
	const s = new SetStatement();
	s.name.enterText("a");
	s.expr.enterText("3 + 4");
	main.addStatement(s);
	const t = new Throw();
	main.addStatement(t);
	const ca = new Call();
	ca.proc.enterText("signIn");
	ca.args.enterText(`rwp, password`);
	main.addStatement(ca);
	const pr = new Print();
	pr.expr.enterText(`"Hello World!"`);
	main.addStatement(pr);
	const w = new While();
	w.condition.enterText("newGame");
	main.addStatement(w);
	const r = new Repeat();
	r.condition.enterText("score > 20");
	main.addStatement(r);
	const for1 = new For();
	main.addStatement(for1);
	for1.variable.enterText("i");
	for1.from.enterText("1");
	for1.to.enterText("10");
	
	const ea = new Each();
	ea.variable.enterText("letter");
	ea.iter.enterText("Charlie Duke");
	main.addStatement(ea);
	const if1 = new IfThen();
    if1.condition.enterText("y > 4");
	main.addStatement(if1);
	const if2 = new IfThen();
	main.addStatement(if2);
    if2.condition.enterText("y > 4");
	if2.addStatement(new Else());
	if2.addStatement(new StatementSelector());
	const if3 = new IfThen();
	main.addStatement(if3);
    if3.condition.enterText("y > 4");
	const el = new Else();
	el.hasIf = true;
	el.condition.enterText("y > 10");
	if3.addStatement(el);
	if3.addStatement(new StatementSelector());
	if3.addStatement(new Else());
	if3.addStatement(new StatementSelector());
	const tr = new TryCatch();
	main.addStatement(tr);
	return file;
}

export function T07_mainWithAllStatementsSelectMainById(f : FileFrame) {
	f.selectByID("main0");
	return () => f;
}

export function T07_mainWithAllStatementsSelectStatementById(f : FileFrame) {
	f.selectByID("for28");
	return () => f;
}

export function T08_expandAll(f : FileFrame) {
	f.expandAll();
	return () => f;
}

export function T08_collapseAll(f : FileFrame) {
	f.collapseAll();
	return () => f;
}

export function T04_allGlobals() {
	const file = new FileFrame();
	const con = new Constant();
	con.name.enterText("phi");
	con.expr.enterText("1.618");
	file.addGlobal(con);
	const main = new MainFrame();
	file.addGlobal(main);
	const p = new Procedure();
	p.name.enterText("signIn");
	file.addGlobal(p);
	const f = new Function();
	f.name.enterText("hypotenuse");
	f.params.enterText("sideB Float, sideC Float");
	f.returnType.enterText("Float");
	file.addGlobal(f);
	const e = new Enum();
	e.name.enterText("Fruit");
	e.values.enterText("apple, orange, pear");
	file.addGlobal(e);
	const cl1 = new Class();
	file.addGlobal(cl1);
	cl1.name.enterText("Player");
	cl1.asString.returnStatement.expr.enterText("a Player");
	const p1 = new Property();
	cl1.addMember(p1);
	p1.name.enterText("score");
	p1.type.enterText("Int");
	const cl2 = new Class();
	file.addGlobal(cl2);
	cl2.name.enterText("Card");
	cl2.immutable = true;
	cl2.asString.returnStatement.expr.enterText("a Card");
	const p2 = new Property();
	cl2.addMember(p2);
	p2.name.enterText("value");
	p2.type.enterText("Int");
	p2.private = true;
	const m1 = new Function();
	cl2.addMember(m1);
	m1.name.enterText("reset");
	m1.params.enterText("");
	m1.returnType.enterText("Player");
	
	return file;
}

export function T05_snake() {
	resetId();
	const file = new FileFrame();
	const main = new MainFrame();
	file.addGlobal(main);
	return file;
}
/*
main
  var li set to {"plum","apricot","lime","lemon","melon","apple","orange","strawberry","pear","banana"}
  print mergeSort(li)
end main */

export function T06_mergeSort() {
	resetId();
	const file = new FileFrame();
		const main = new MainFrame();
		file.addGlobal(main);
		    main.removeStatementSelector();
			const li = new Variable();
			main.addStatement(li);
				li.name.enterText("li");
				li.expr.enterText(`{"plum","apricot","lime","lemon","melon","apple","orange","strawberry","pear","banana"}`);
			
			const pr = new Print();
			main.addStatement(pr);
				pr.expr.enterText("mergeSort(li)");
			
		

		const mergeSort = new Function();
		file.addGlobal(mergeSort);
			mergeSort.removeStatementSelector();
			mergeSort.name.enterText("mergeSort");
			mergeSort.params.enterText(`list List<of String>`);
			mergeSort.returnType.enterText(`List<of String>`);
			const result1 = new Variable();
				mergeSort.addStatement(result1);
				result1.name.enterText(`result`);
				result1.expr.enterText(`list`);

			const if1 = new IfThen();
			mergeSort.addStatement(if1);
			    if1.removeStatementSelector();
				if1.condition.enterText(`list.length() > 1`);
				const mid = new Variable();
					if1.addStatement(mid);
					mid.name.enterText(`mid`);
					mid.expr.enterText(`list.length() div 2`);
				const setMid = new SetStatement();
					if1.addStatement(setMid);
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

		const merge = new Function();
		file.addGlobal(merge);
		
		    merge.removeStatementSelector();
			merge.name.enterText(`merge`);
			merge.params.enterText(`a List<of String>, b List<of String>`);
			merge.returnType.enterText(`List<of String>`);
			const result = new Variable();
			merge.addStatement(result);
				result.name.enterText(`name`);
				result.expr.enterText(`new List<of String>()`);
			
			const if2 = new IfThen();
			merge.addStatement(if2);
			    if2.removeStatementSelector();
				if2.condition.enterText(`a.isEmpty()`);
				const setResult1 = new SetStatement();
					setResult1.name.enterText(`result`);
					setResult1.expr.enterText(`b`);
				if2.addStatement(setResult1);
			const elif1 = new Else();
				elif1.hasIf = true;
				elif1.condition.enterText(`b.isEmpty()`);
			if2.addStatement(elif1);	
			const setResult2 = new SetStatement();
				setResult2.name.enterText(`result`);
				setResult2.expr.enterText(`a`);
			if2.addStatement(setResult2);
			const elif2 = new Else();
				elif1.hasIf = true;
				elif2.condition.enterText(`b.isEmpty()`);
			if2.addStatement(elif2);	
			const setResult3 = new SetStatement();
				setResult3.name.enterText(`result`);
				setResult3.expr.enterText(`a[0] + merge(a[1..], b)`);
			if2.addStatement(setResult3);
            const els = new Else();
			if2.addStatement(els);
			const setResult4 = new SetStatement();
				setResult4.name.enterText(`result`);
				setResult4.expr.enterText(`b[0] + merge(a, b[1..])`);
			if2.addStatement(setResult4);
		
		merge.returnStatement.expr.enterText(`result`);
	
	return file;
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

export function getTestFrame(fn : string) : FileFrame {
    return eval(`${fn}()`);
}
