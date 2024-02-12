import { File } from "../interfaces/file";
import { KeyEvent } from "../interfaces/key-event";
import { AbstractSelector } from "../abstract-selector";
import { Parent } from "../interfaces/parent";

export class GlobalSelector extends AbstractSelector  {

    constructor(parent: Parent) {
        super(parent);
        this.currentOptions = this.defaultOptions;
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
    isGlobal = true;
  
    getHelp(): string {
        return this.text === "c" ? "class constant" :  "main procedure function class constant enum #";
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

    addFrame(frameType: string, startText: string): void {
        //TODO: use startText
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

    processKey(keyEvent: KeyEvent): void {
        var char = keyEvent.key;
        var empty = this.text ==="";
        if (empty && char ==='m') {
            this.getFile().addMainBefore(this);
            return;
        }
        if (empty && char ==='f') {
            this.getFile().addFunctionBefore(this);
            return;
        }
        if (empty && char ==='p') {
            this.getFile().addProcedureBefore(this);
            return;
        }
        if (empty && char ==='e') {
            this.getFile().addEnumBefore(this);
            return;
        }
        if (empty && char ==='#') {
            this.getFile().addGlobalCommentBefore(this);
            return;
        }
        if (empty && char ==='c') {
            this.text+=char;
            return;
        } 
        if (this.text === "c" && char ==="o") {
            this.getFile().addConstantBefore(this);
            this.clearText();
            return;
        }
        if (this.text === "c" && char ==="l") {
            this.getFile().addClassBefore(this);
            this.clearText();
            return;
        }
        super.processKey(keyEvent);
    }
} 
