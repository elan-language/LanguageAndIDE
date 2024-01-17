import { Constant } from "../frames/globals/constant";
import { FileFrame } from "../frames/file-frame";
import { Frame } from "../frames/frame";
import { resetId } from "../frames/helpers";
import { MainFrame } from "../frames/globals/main-frame";
import { SetStatement } from "../frames/statements/set";
import { Variable } from "../frames/statements/variable";
import { Procedure } from "../frames/globals/procedure";

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
	var c = new Constant();
	c.name.enterText("phi");
	c.expr.enterText("1.618");
	file.addGlobal(c);
	var main = new MainFrame();
	file.addGlobal(main);
	var proc = new Procedure();
	proc.name.enterText("hypotenuse");
	proc.argList.enterText("3, 4");
	file.addGlobal(proc);
	return file;
}

export function getTestFrame(fn : string) : Frame {
    return eval(`${fn}()`);
}
