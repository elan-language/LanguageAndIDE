import { File } from "../interfaces/file";
import { AbstractSelector } from "../abstract-selector";
import { Frame } from "../interfaces/frame";
import { Class } from "./class";

export class GlobalSelector extends AbstractSelector  {
    isGlobal = true;
    file: File;

    constructor(parent: File) {
        super(parent);
        this.file = parent;
    }
    
    defaultOptions: [string, string][] = [
        ["MainFrame", "main"],
        ["Procedure", "procedure"],
        ["Function", "function"],
        ["Class", "class"],
        ["Constant", "constant"],
        ["Enum", "enum"],
        ["Test", "test"],
        ["GlobalComment", "#"],
        ["Abstract", "abstract"],
        ["Immutable", "immutable"],
    ];

    validForEditorWithin(frameType: string): boolean {
        var result = false;
        if (frameType === "MainFrame") {
            result = !this.file.containsMain();
        } else if ( frameType === "Abstract" || frameType === "Immutable") { //Those options available for parsing code from file only
            result = false;
        } else {
            result = true;
        }
        return result;
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

    addFrame(frameType: string): Frame {
        switch(frameType) {
            case "MainFrame": {
                return this.getFile().addMainBefore(this);
            }
            case "Procedure": {
                return this.getFile().addProcedureBefore(this);
            }
            case "Function": {
                return this.getFile().addFunctionBefore(this);
            }
            case "Class": {
                return this.getFile().addClassBefore(this);
            }
            case "Abstract": {
                var cl = this.getFile().addClassBefore(this) as Class;
                cl.makeAbstract();
                return cl;
            } 
            case "Immutable": {
                return this.getFile().addClassBefore(this) as Class;
            }
            case "Constant": {
                return this.getFile().addConstantBefore(this);
            }
            case "Enum": {
                return this.getFile().addEnumBefore(this);
            }
            case "GlobalComment": {
                return this.getFile().addGlobalCommentBefore(this);
            } 
            case "Test": {
                return this.getFile().addTestBefore(this);
            } 
            default: {
                throw new Error(`${frameType} is not a valid global frame type.`);
            }
        } 
    }
} 
