import { Field } from "./interfaces/field";
import { Frame } from "./interfaces/frame";
import { editorEvent } from "./interfaces/editor-event";
import { Parent } from "./interfaces/parent";
import {CodeSource } from "./code-source";
import { SingleLineStatement } from "./statements/single-line-statement";

export abstract class AbstractSelector extends SingleLineStatement {
    isSelector = true;
    isStatement = true;
    text: string = "";
    label: string = "new code";
    protected defaultOptions: [string, string][]= new Array<[string, string]>();

    constructor(parent: Parent) {
        super(parent);
    }
    parseFrom(source: CodeSource): void {
        source.removeIndent();
        var options = this.defaultOptions.filter(o => source.isMatch(o[1]));
        if (options.length === 1) {
            var typeToAdd = options[0][0];
            var frame = this.addFrame(typeToAdd);
            frame.parseFrom(source);
        } else {
            throw new Error(`${options.length} matches found at ${source.readToEndOfLine()} `);
        }
    }

    abstract validForEditorWithin(frameType: string) : boolean;

    optionsMatchingInput(match: string): [string, string][] {
        return this.optionsForContext().filter(o => o[1].startsWith(match));
    }

    private optionsForContext(): [string, string][] {
        return this.defaultOptions.filter(o => this.validForEditorWithin(o[0]));
    }

    commonStartText(match: string): string {
        return this.optionsMatchingInput(match).map(o => o[1]).reduce((soFar, o)=> this.maxCommonStart(soFar, o));
    }

    private maxCommonStart(a: string, b: string): string {
        return a !== "" && b !=="" &&  a[0] === b[0] ? a[0] + this.maxCommonStart(a.slice(1), b.slice(1)): "";          
    }
 
    getHelp(): string {
        return this.optionsMatchingInput(this.text).map(o => o[1]).reduce((soFar, kw)=> soFar + " " + kw, "");
    }

    abstract addFrame(frameType: string): Frame;

    protected setClasses() {
        super.setClasses();
        this.pushClass(this.text === "", "empty");
    };

    clearText() : void {
        this.text = "";
    }


    getFields(): Field[] {
        return [];
    }
    getIdPrefix(): string {
        return 'select';
    }
    override deselect(): void {
        super.deselect();
        this.text = "";
    }
    textToDisplay(): string {
            return `<selector><text>${this.text}</text><placeholder>${this.label}</placeholder><help class="selector">${this.getHelp()}</help></selector>`;
    }

    renderAsSource(): string {
        return `${this.indent()}`;
    }

    processKey(e: editorEvent): void {
        var key = e.key;
        switch (key) {
            case "Tab" : {this.tabOrEnter(e.modKey.shift); break}
            case "Enter" : {this.tabOrEnter(e.modKey.shift); break}
            case "Backspace": {this.text = this.text.substring(0,this.text.length-1); break; } 
            case "Delete": {if(this.getParent().minimumNumberOfChildrenExceeded()) {this.getParent().removeChild(this);} break;}
            default: {
                if (!key || key.length === 1) {
                    this.processOptions(key);
                } else {
                    super.processKey(e);
                } 
            }
        }  
    }

    processOptions(key: string | undefined) {
        var options = this.optionsMatchingInput(this.text + key);
        if (options.length > 1 ) {
            this.text += this.commonStartText(this.text+ key);
        } else if (options.length === 1) {
            var typeToAdd = options[0][0];
            this.addFrame(typeToAdd);
            this.text = "";
        }
    }

    tabOrEnter(shift: boolean): void {
        if (shift) {
            this.selectLastFieldAboveThisFrame();
        } else {
            this.getNextFrameInTabOrder().selectFirstField();
        }
    }

    canInsertBefore(): boolean {
        return false;
    }

    canInsertAfter(): boolean {
        return false;
    }

    insertSelector(after: boolean): void {
        throw new Error("Should never be called on a Selector");
    }

    selectFirstField() : boolean {
        this.select(true, false);
        return true;
    }

    selectLastField() : boolean {
        this.select(true, false);
        return true;
    }
} 
