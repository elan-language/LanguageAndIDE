import { File } from "../interfaces/file";
import { KeyEvent } from "../interfaces/key-event";
import { AbstractSelector } from "../abstract-selector";
import { Parent } from "../interfaces/parent";

export class GlobalSelector extends AbstractSelector  {
    isGlobal = true;

    constructor(parent: Parent) {
        super(parent);
    }
    
    defaultOptions: [string, string][] = [
        ["MainFrame", "main"],
        ["Procedure", "procedure"],
        ["Function", "function"],
        ["Class", "class"],
        ["Constant", "constant"],
        ["Enum", "enum"],
        ["GlobalComment", "#"]
    ];

    validforContext(frameType: string): boolean {
        return true; //TODO
    }

    getFile(): File {
        return this.getParent() as File;
    }

    renderAsHtml(): string {
        return `<global class="${this.cls()}" id='${this.htmlId}' tabindex="0">${this.textToDisplay()}</global>`;
    }

    indent(): string {
        return "";
    }

    addFrame(frameType: string): void {
        switch(frameType) {
            case "MainFrame": {
                this.getFile().addMainBefore(this);
                break;
            }
            case "Procedure": {
                this.getFile().addProcedureBefore(this);
                break;
            }
            case "Function": {
                this.getFile().addFunctionBefore(this);
                break;
            }
            case "Class": {
                this.getFile().addClassBefore(this);
                break;
            }
            case "Constant": {
                this.getFile().addConstantBefore(this);
                break;
            }
            case "Enum": {
                this.getFile().addEnumBefore(this);
                break;
            }
            case "GlobalComment": {
                this.getFile().addGlobalCommentBefore(this);
                break;
            }
        }
    }
} 
