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
import { Property } from "../frames/members/property";
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
import { Comment } from "../frames/clauses/comment";

export function T00_emptyFile() {
	resetId();
	var f = new FileFrame();
	f.addGlobal(new GlobalSelector());
	return f;
}

export function T02_comments() {
	var file = new FileFrame();
	var sc1 = new Comment();
	sc1.text.enterText("Comment 1");
	file.addGlobal(sc1);
	var main = new MainFrame();
	file.addGlobal(main);
	main.removeStatementSelector();
	var sc2 = new Comment();
	sc2.text.enterText("Comment 2");
	sc2.indent = true;
	main.addStatement(sc2);
	return file;
}

export function T03_mainWithAllStatements() {
	var file = new FileFrame();
	var main = new MainFrame();
	file.addGlobal(main);
	main.removeStatementSelector();
	var v = new Variable();
	main.addStatement(v);
	var s = new SetStatement();
	s.name.enterText("a");
	s.expr.enterText("3 + 4");
	main.addStatement(s);
	var t = new Throw();
	main.addStatement(t);
	var ca = new Call();
	ca.proc.enterText("signIn");
	ca.args.enterText(`rwp, password`);
	main.addStatement(ca);
	var pr = new Print();
	pr.expr.enterText(`"Hello World!"`);
	main.addStatement(pr);
	var w = new While();
	w.condition.enterText("newGame");
	main.addStatement(w);
	var r = new Repeat();
	r.condition.enterText("score > 20");
	main.addStatement(r);
	var for1 = new For();
	for1.variable.enterText("i");
	for1.from.enterText("1");
	for1.to.enterText("10");
	main.addStatement(for1);
	var ea = new Each();
	ea.variable.enterText("letter");
	ea.iter.enterText("Charlie Duke");
	main.addStatement(ea);
	var if1 = new IfThen();
    if1.condition.enterText("y > 4");
	main.addStatement(if1);
	var if2 = new IfThen();
    if2.condition.enterText("y > 4");
	if2.addStatement(new Else());
	if2.addStatement(new StatementSelector());
	main.addStatement(if2);
	var if3 = new IfThen();
    if3.condition.enterText("y > 4");
	var el = new Else();
	el.hasIf = true;
	el.condition.enterText("y > 10");
	if3.addStatement(el);
	if3.addStatement(new StatementSelector());
	if3.addStatement(new Else());
	if3.addStatement(new StatementSelector());
	main.addStatement(if3);
	var tr = new TryCatch();
	main.addStatement(tr);
	return file;
}

export function T04_allGlobals() {
	var file = new FileFrame();
	var con = new Constant();
	con.name.enterText("phi");
	con.expr.enterText("1.618");
	file.addGlobal(con);
	var main = new MainFrame();
	file.addGlobal(main);
	var p = new Procedure();
	p.name.enterText("signIn");
	file.addGlobal(p);
	var f = new Function();
	f.name.enterText("hypotenuse");
	f.params.enterText("sideB Float, sideC Float");
	f.returnType.enterText("Float");
	file.addGlobal(f);
	var e = new Enum();
	e.name.enterText("Fruit");
	e.values.enterText("apple, orange, pear");
	file.addGlobal(e);
	var cl1 = new Class();
	file.addGlobal(cl1);
	cl1.name.enterText("Player");
	cl1.asString.returnStatement.expr.enterText("a Player");
	var p1 = new Property();
	p1.name.enterText("score");
	p1.type.enterText("Int");
	cl1.addMember(p1);
	var cl2 = new Class();
	file.addGlobal(cl2);
	cl2.name.enterText("Card");
	cl2.immutable = true;
	cl2.asString.returnStatement.expr.enterText("a Card");
	var p1 = new Property();
	p1.name.enterText("value");
	p1.type.enterText("Int");
	p1.private = true;
	cl2.addMember(p1);
	var m1 = new Function();
	m1.name.enterText("reset");
	m1.params.enterText("");
	m1.returnType.enterText("Player");
	cl2.addMember(m1);
	return file;
}

export function T05_snake() {
	resetId();
	var file = new FileFrame();
	var main = new MainFrame();
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
	var file = new FileFrame();
		var main = new MainFrame();
		    main.removeStatementSelector();
			var li = new Variable();
				li.name.enterText("li");
				li.expr.enterText(`{"plum","apricot","lime","lemon","melon","apple","orange","strawberry","pear","banana"}`);
			main.addStatement(li);
			var pr = new Print();
				pr.expr.enterText("mergeSort(li)");
			main.addStatement(pr);
		file.addGlobal(main);

		var mergeSort = new Function();
			mergeSort.removeStatementSelector();
			mergeSort.name.enterText("mergeSort");
			mergeSort.params.enterText(`list List<of String>`);
			mergeSort.returnType.enterText(`List<of String>`);
			var result = new Variable();
				mergeSort.addStatement(result);
				result.name.enterText(`result`);
				result.expr.enterText(`list`);

			var if1 = new IfThen();
			    if1.removeStatementSelector();
				if1.condition.enterText(`list.length() > 1`);
				var mid = new Variable();
					if1.addStatement(mid);
					mid.name.enterText(`mid`);
					mid.expr.enterText(`list.length() div 2`);
				var setMid = new SetStatement();
					if1.addStatement(setMid);
					setMid.name.enterText(`result`);
					setMid.expr.enterText(`merge(mergeSort(list[..mid]), mergeSort(list[mid..]))`);
			mergeSort.addStatement(if1);	
			mergeSort.returnStatement.expr.enterText(`result`);
		file.addGlobal(mergeSort);

		/*
function mergeSort(list List<of String>) as List<of String> 
    var result set to list
    if list.length() > 1 then
      var mid set to list.length() div 2 
      set result to merge(mergeSort(list[..mid]), mergeSort(list[mid..]))
    end if
    return result
end function */

		var merge = new Function();
		    merge.removeStatementSelector();
			merge.name.enterText(`merge`);
			merge.params.enterText(`a List<of String>, b List<of String>`);
			merge.returnType.enterText(`List<of String>`);
			var result = new Variable();
				result.name.enterText(`name`);
				result.expr.enterText(`new List<of String>()`);
			merge.addStatement(result);
			var if2 = new IfThen();
			    if2.removeStatementSelector();
				if2.condition.enterText(`a.isEmpty()`);
				var setResult = new SetStatement();
					setResult.name.enterText(`result`);
					setResult.expr.enterText(`b`);
				if2.addStatement(setResult);
			var elif1 = new Else();
				elif1.condition.enterText(`b.isEmpty()`);
			if2.addStatement(elif1);	
			var setResult = new SetStatement();
				setResult.name.enterText(`result`);
				setResult.expr.enterText(`b`);
			if2.addStatement(setResult);
			var elif2 = new Else();
			elif2.condition.enterText(`b.isEmpty()`);
			if2.addStatement(elif2);	
			var setResult = new SetStatement();
				setResult.name.enterText(`result`);
				setResult.expr.enterText(`a[0] + merge(a[1..], b)`);
			if2.addStatement(setResult);
            var els = new Else();
			if2.addStatement(els);
			var setResult = new SetStatement();
				setResult.name.enterText(`result`);
				setResult.expr.enterText(`b[0] + merge(a, b[1..])`);
			merge.addStatement(setResult);
		merge.addStatement(if2);
		merge.returnStatement.expr.enterText(`result`);
	file.addGlobal(merge);
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

export function getTestFrame(fn : string) : Frame {
    return eval(`${fn}()`);
}
