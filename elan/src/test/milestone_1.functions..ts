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
import { GlobalSelector } from "../frames/globals/global-selector";
import { StatementSelector } from "../frames/statements/statement-selector";
import { Switch } from "../frames/statements/switch";
import { Case } from "../frames/statements/case";

export function T00_emptyFile() {
	const f = new FileImpl();
	return f;
}

export function T01_helloWorld() {
	const f = new FileImpl();
	var gs = f.getFirstGlobalSelector();
	const m = new MainFrame(f);
	f.addGlobalBefore(m,gs);
	var ss = m.getFirstStatementSelector();
	const comment = new CommentStatement(m);
	comment.text.setTextWithoutParsing(`My first program`);
	m.addStatementBefore(comment, ss);
	const pr = new Print(m);
	pr.expr.setTextWithoutParsing(`"Hello World!"`);
	m.addStatementBefore(pr, ss);
	return f;
}

export function T02_comments() {
	const f = new FileImpl();
	var gs = f.getFirstGlobalSelector();
	const gc = new GlobalComment(f);
	gc.text.setTextWithoutParsing("Comment 1");
	f.addGlobalBefore(gc,gs);
	const m = new MainFrame(f);
	f.addGlobalBefore(m, gs);
	var ss = m.getFirstStatementSelector();
	const sc2 = new CommentStatement(m);
	sc2.text.setTextWithoutParsing("Comment 2");
	m.addStatementBefore(sc2, ss);
	return f;
}

export function T03_mainWithAllStatements(): FileImpl {
	const f = new FileImpl();
	var gs = f.getFirstGlobalSelector();
	const m = new MainFrame(f);
	f.addGlobalBefore(m,gs);
	var ssm = m.getFirstStatementSelector();
	const v = new Variable(m);
	m.addStatementBefore(v,ssm);
	const s = new SetStatement(m);
	s.name.setTextWithoutParsing("a");
	s.expr.setTextWithoutParsing("3 + 4");
	m.addStatementBefore(s,ssm);
	const t = new Throw(m);
	m.addStatementBefore(t,ssm);
	const ca = new Call(m);
	ca.proc.setTextWithoutParsing("signIn");
	ca.args.setTextWithoutParsing(`rwp, password`);
	m.addStatementBefore(ca,ssm);
	const pr = new Print(m);
	pr.expr.setTextWithoutParsing(`"Hello World!"`);
	m.addStatementBefore(pr,ssm);
	const w = new While(m);
	w.condition.setTextWithoutParsing("newGame");
	m.addStatementBefore(w,ssm);
	const r = new Repeat(m);
	r.condition.setTextWithoutParsing("score > 20");
	m.addStatementBefore(r,ssm);
	const for1 = new For(m);
	m.addStatementBefore(for1,ssm);
	for1.variable.setTextWithoutParsing("i");
	for1.from.setTextWithoutParsing("1");
	for1.to.setTextWithoutParsing("10");
	
	const ea = new Each(m);
	ea.variable.setTextWithoutParsing("letter");
	ea.iter.setTextWithoutParsing("Charlie Duke");
	m.addStatementBefore(ea,ssm);
	const if1 = new IfThen(m);
    if1.condition.setTextWithoutParsing("y > 4");
	m.addStatementBefore(if1,ssm);
	const if2 = new IfThen(m);
	m.addStatementBefore(if2,ssm);
    if2.condition.setTextWithoutParsing("y > 4");
	var ss2 = if2.getFirstStatementSelector();
	var el1 = new Else(if2);
	if2.addStatementBefore(el1,ss2);
	if2.addStatementBefore(new StatementSelector(if2), el1);
	const if3 = new IfThen(m);
	m.addStatementBefore(if3, ssm);
	var ss_if3 = if3.getFirstStatementSelector();
    if3.condition.setTextWithoutParsing("y > 4");
	const el2 = new Else(if3);
	el2.hasIf = true;
	el2.condition.setTextWithoutParsing("y > 10");
	if3.addStatementBefore(el2,ss_if3);
	if3.addStatementBefore(new Else(if3),ss_if3);
	const tr = new TryCatch(m);
	m.addStatementBefore(tr,ssm);
	const sw = new Switch(m);
	m.addStatementBefore(sw,ssm);
	return f;
}

export function T07_mainWithAllStatementsSelectMainById(f : FileImpl) {
	f.getById("main1").select(true, false);
	return () => f;
}

export function T07_mainWithAllStatementsSelectStatementById(f : FileImpl) {
	f.getById("for22").select(true, false);
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
	var gs = f.getFirstGlobalSelector();
	const con = new Constant(f);
	con.name.setTextWithoutParsing("phi");
	con.expr.setTextWithoutParsing("1.618");
	f.addGlobalBefore(con, gs);
	const main = new MainFrame(f);
	f.addGlobalBefore(main, gs);
	const proc = new Procedure(f);
	proc.name.setTextWithoutParsing("signIn");
	f.addGlobalBefore(proc, gs);
	const func = new Function(f);
	func.name.setTextWithoutParsing("hypotenuse");
	func.params.setTextWithoutParsing("sideB Float, sideC Float");
	func.returnType.setTextWithoutParsing("Float");
	f.addGlobalBefore(func, gs);
	const enu = new Enum(f);
	enu.name.setTextWithoutParsing("Fruit");
	enu.values.setTextWithoutParsing("apple, orange, pear");
	f.addGlobalBefore(enu, gs);
	return f;
}

export function T05_classes() {
	const f = new FileImpl();
	var gs = f.getFirstGlobalSelector();
	const cl1 = new Class(f);
	var ms = cl1.getFirstMemberSelector();
	f.addGlobalBefore(cl1, gs);
	cl1.name.setTextWithoutParsing("Player");
	cl1.asString.returnStatement.expr.setTextWithoutParsing("a Player");
	const p1 = new Property(cl1);
	cl1.addMemberBefore(p1,ms);
	p1.name.setTextWithoutParsing("score");
	p1.type.setTextWithoutParsing("Int");

	const cl2 = new Class(f);
	var ms2 = cl2.getFirstMemberSelector();
	cl2.inherits = true;
	cl2.superClasses.setTextWithoutParsing("Foo, Bar");
	f.addGlobalBefore(cl2, gs);
	cl2.name.setTextWithoutParsing("Card");
	cl2.immutable = true;
	cl2.asString.returnStatement.expr.setTextWithoutParsing("a Card");
	const p2 = new Property(cl2);
	cl2.addMemberBefore(p2, ms2);
	p2.name.setTextWithoutParsing("value");
	p2.type.setTextWithoutParsing("Int");
	p2.private = true;
	const m1 = new FunctionMethod(cl2);
	cl2.addMemberBefore(m1,ms2);
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
	var gs_file = f.getFirstGlobalSelector();
		const main = new MainFrame(f);
		f.addGlobalBefore(main, gs_file);
		var ssm = main.getFirstStatementSelector();
			const li = new Variable(main);
			main.addStatementBefore(li, ssm);
				li.name.setTextWithoutParsing("li");
				li.expr.setTextWithoutParsing(`{"plum","apricot","lime","lemon","melon","apple","orange","strawberry","pear","banana"}`);
			
			const pr = new Print(main);
			main.addStatementBefore(pr, ssm);
				pr.expr.setTextWithoutParsing("mergeSort(li)");
			
		const mergeSort = new Function(f);
		f.addGlobalBefore(mergeSort,gs_file);
		var ss_ms = mergeSort.getFirstStatementSelector();
			mergeSort.name.setTextWithoutParsing("mergeSort");
			mergeSort.params.setTextWithoutParsing(`list List<of String>`);
			mergeSort.returnType.setTextWithoutParsing(`List<of String>`);
			const result1 = new Variable(mergeSort);
				mergeSort.addStatementBefore(result1,ss_ms);
				result1.name.setTextWithoutParsing(`result`);
				result1.expr.setTextWithoutParsing(`list`);

			const if1 = new IfThen(mergeSort);
			mergeSort.addStatementBefore(if1, ss_ms);
			    var ss_mergeSort_if1 = if1.getFirstStatementSelector();
				if1.condition.setTextWithoutParsing(`list.length() > 1`);
				const mid = new Variable(if1);
					if1.addStatementBefore(mid, ss_mergeSort_if1);
					mid.name.setTextWithoutParsing(`mid`);
					mid.expr.setTextWithoutParsing(`list.length() div 2`);
				const setMid = new SetStatement(if1);
					if1.addStatementBefore(setMid, ss_mergeSort_if1);
					setMid.name.setTextWithoutParsing(`result`);
					setMid.expr.setTextWithoutParsing(`merge(mergeSort(list[..mid]), mergeSort(list[mid..]))`);
				
			mergeSort.returnStatement.expr.setTextWithoutParsing(`result`);
		
		const merge = new Function(f);
		f.addGlobalBefore(merge,gs_file);	
		var ss_merge = merge.getFirstStatementSelector();	
			merge.name.setTextWithoutParsing(`merge`);
			merge.params.setTextWithoutParsing(`a List<of String>, b List<of String>`);
			merge.returnType.setTextWithoutParsing(`List<of String>`);
			const result = new Variable(merge);
			merge.addStatementBefore(result, ss_merge);
				result.name.setTextWithoutParsing(`name`);
				result.expr.setTextWithoutParsing(`new List<of String>()`);
			
			const if2 = new IfThen(merge);
			merge.addStatementBefore(if2, ss_merge);
			    var ss_merge_if = if2.getFirstStatementSelector();
				if2.condition.setTextWithoutParsing(`a.isEmpty()`);
				const setResult1 = new SetStatement(if2);
					setResult1.name.setTextWithoutParsing(`result`);
					setResult1.expr.setTextWithoutParsing(`b`);
				if2.addStatementBefore(setResult1, ss_merge_if);
			const elif1 = new Else(if2);
				elif1.hasIf = true;
				elif1.condition.setTextWithoutParsing(`b.isEmpty()`);
			if2.addStatementBefore(elif1, ss_merge_if);	
			const setResult2 = new SetStatement(if2);
				setResult2.name.setTextWithoutParsing(`result`);
				setResult2.expr.setTextWithoutParsing(`a`);
			if2.addStatementBefore(setResult2, ss_merge_if);
			const elif2 = new Else(if2);
				elif2.hasIf = true;
				elif2.condition.setTextWithoutParsing(`a[0].isBefore(b[0])`);
			if2.addStatementBefore(elif2, ss_merge_if);	
			const setResult3 = new SetStatement(if2);
				setResult3.name.setTextWithoutParsing(`result`);
				setResult3.expr.setTextWithoutParsing(`a[0] + merge(a[1..], b)`);
			if2.addStatementBefore(setResult3, ss_merge_if);
            const els = new Else(if2);
			if2.addStatementBefore(els, ss_merge_if);
			const setResult4 = new SetStatement(if2);
				setResult4.name.setTextWithoutParsing(`result`);
				setResult4.expr.setTextWithoutParsing(`b[0] + merge(a, b[1..])`);
			if2.addStatementBefore(setResult4, ss_merge_if);
		
		merge.returnStatement.expr.setTextWithoutParsing(`result`);
	
	return f;
}

export function T09_emptyMainAndClassWithGlobalSelector() {
	const f = new FileImpl();
	var gs = f.getFirstGlobalSelector();
	f.addGlobalBefore(new MainFrame(f), gs);
	f.addGlobalBefore(new Class(f), gs);
	return f;
}

export function getTestFrame(fn : string) : FileImpl {
	try {
    	return eval(`${fn}()`);
	}
	catch (e){
		return new FileImpl();
	}
}
