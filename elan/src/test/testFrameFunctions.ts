import { FileFrame } from "../frames/file-frame";
import { Frame } from "../frames/frame";
import { MainFrame } from "../frames/main-frame";
import { SetStatement } from "../frames/set-statement";
import { Variable } from "../frames/variable";

export function T00_emptyFile() {
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
	var v = new Variable();
	main.addStatement(v);
	return file;
}

export function T03_mainWithVarAndSet() {
	var file = new FileFrame();
	var main = new MainFrame();
	file.addGlobal(main);
	var v = new Variable();
	main.addStatement(v);
	var s = new SetStatement();
	s.name.enterText("a");
	s.expr.enterText("3 + 4");
	main.addStatement(s);
	return file;
}


export function getTestFrame(fn : string) : Frame {
    return eval(`${fn}()`);
}
