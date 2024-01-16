import { FileFrame } from "./file-frame";
import { Frame } from "./frame";
import { MainFrame } from "./main-frame";
import { VarFrame } from "./var-frame";

export function frameFactory(code : string) : [Frame, string] {
    const trimmedCode = code.trimStart();
    const firstCharacter = trimmedCode[0];

    switch (firstCharacter) {
        case "#" : return [new FileFrame(trimmedCode), ""];
        case "m" : return mainFrameFactory(trimmedCode);
        case "v" : return varFrameFactory(trimmedCode);
    }

    return [null!, ""];
} 

var id = 0;

export function nextId() {
  return id++; 
}

function mainFrameFactory(code : string) : [Frame, string] {
    const mainBodyRegex = /main([\s\S]*)end main([\s\S]*)/;
    const match = code.match(mainBodyRegex);
    return [new MainFrame(match![1]), match![2]];
}

function varFrameFactory(code : string) : [Frame, string] {
    const varRegex = /var (.*) set to (.*)\r\n([\s\S]*)/;
    const match = code.match(varRegex);
    return [new VarFrame(match![1], match![2]), match![3]];
}

export function newFileFrame() { return new FileFrame(); };
export function newMainFrame() { return new MainFrame(); };

