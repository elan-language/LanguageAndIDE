import { FileFrame } from "../frames/file-frame";
import { Frame } from "../frames/frame";
import { MainFrame } from "../frames/main-frame";

export function T00_emptyFile() {
	return new FileFrame();
}

export function T01_mainInFile() {
	var file = new FileFrame();
	var main = new MainFrame();
	file.AddChild(main);
	return file;
}


export function getTestFrame(fn : string) : Frame {
    return eval(`${fn}()`);
}
