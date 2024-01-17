import { Constant } from "../frames/globals/constant";
import { FileFrame } from "../frames/file-frame";
import { Frame } from "../frames/frame";
import { resetId } from "../frames/helpers";
import { MainFrame } from "../frames/globals/main-frame";
import { SetStatement } from "../frames/statements/set";
import { Variable } from "../frames/statements/variable";
import { Procedure } from "../frames/globals/procedure";
import { Function } from "../frames/globals/function";
import { Enum } from "../frames/globals/enum";
import { Class } from "../frames/globals/class";

export function T00_emptyFile() {
	resetId();
	return new FileFrame();
}

export function T01_mainInFile() {
	var file = new FileFrame();
	var main = new MainFrame();
	file.addGlobal(main);
	return file;
}

export function T02_mainWithVar() {
	var file = new FileFrame();
	var main = new MainFrame();
	file.addGlobal(main);
	main.removeStatementSelector();
	var v = new Variable();
	main.addStatement(v);
	return file;
}

export function T03_mainWithVarAndSet() {
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
	var cl = new Class();
	cl.name.enterText("Player");
	cl.asString.returnExpr.enterText("a Player");
	file.addGlobal(cl);
	return file;
}

export function getTestFrame(fn : string) : Frame {
    return eval(`${fn}()`);
}
