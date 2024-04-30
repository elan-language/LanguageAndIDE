import { Field } from "./interfaces/field";
import { Frame } from "./interfaces/frame";
import { editorEvent } from "./interfaces/editor-event";
import { Parent } from "./interfaces/parent";
import {CodeSource } from "./code-source";
import { AbstractFrame } from "./abstract-frame";
import { Profile } from "./interfaces/profile";

export abstract class AbstractSelector extends AbstractFrame {
    isSelector = true;
    isStatement = true;
    text: string = "";
    label: string = "new code";
    protected profile: Profile;
    profileOptions: [string, (parent: Parent) => Frame][];

    constructor(parent: Parent) {
        super(parent);
        this.profile = parent.getProfile();
        this.profileOptions = this.getDefaultOptions().filter(opt => this.profileAllows(opt[0]));
    }
    initialKeywords(): string {
        return ""; //Not applicable
    }

    abstract getDefaultOptions():  [string, (parent: Parent) => Frame][];

    parseFrom(source: CodeSource): void {
        source.removeIndent();
        var options = this.getDefaultOptions().filter(o => source.isMatch(o[0]));
        if (options.length === 1) {
            var typeToAdd = options[0][0];
            var frame = this.addFrame(typeToAdd);
            frame.parseFrom(source);
        } else {
            throw new Error(`${options.length} matches found at ${source.readToEndOfLine()} `);
        }
    }

    abstract validForEditorWithin(keyword: string) : boolean;

    optionsMatchingInput(match: string): [string, (parent: Parent) => Frame][] {
        return this.optionsForContext().filter(o => o[0].startsWith(match));
    }

    abstract profileAllows(keyword: string): boolean;

    private optionsForContext(): [string, (parent: Parent) => Frame][] {
        return this.profileOptions.filter(o => this.validForEditorWithin(o[0]));
    }

    commonStartText(match: string): string {
        return this.optionsMatchingInput(match).map(o => o[0]).reduce((soFar, o)=> this.maxCommonStart(soFar, o));
    }

    private maxCommonStart(a: string, b: string): string {
        return a !== "" && b !=="" &&  a[0] === b[0] ? a[0] + this.maxCommonStart(a.slice(1), b.slice(1)): "";          
    }
 
    getCompletion(): string {
        return this.optionsMatchingInput(this.text).map(o => o[0]).reduce((soFar, kw)=> `${soFar} ${kw}${kw.includes(" ")? ",":""}`, "");
    }

    addFrame(keyword: string): Frame {
        var func = this.getDefaultOptions().filter(o => o[0]===keyword)[0][1]; 
        var parent = this.getParent();
        var newFrame: Frame = func(parent);
        parent.addChildBefore(newFrame, this);
        newFrame.selectFirstField();
        return newFrame;
    }

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
    textToDisplayAsHtml(): string {
            return `<selector><text>${this.text}</text><placeholder>${this.label}</placeholder><help class="selector">${this.getCompletion()}</help></selector>`;
    }
    renderAsSource(): string {
        return `${this.indent()}`;
    }
    processKey(e: editorEvent): void {
        var key = e.key;
        switch (key) {
            case "Tab" : {this.tab(e.modKey.shift); break;}
            case "Enter" : {this.tab(e.modKey.shift); break;}
            case "Backspace": {this.text = this.text.substring(0,this.text.length-1); break; } 
            case "Delete": {this.deleteIfPermissible(); break;}
            case "d": {if (e.modKey.control) {this.deleteIfPermissible(); break;}}
            case "v": {if (e.modKey.control) {this.paste(); break;}}
            default: {
                if (!key || key.length === 1) {
                    key = key?.toLowerCase();
                    this.processOptions(key);
                } else {
                    super.processKey(e);
                } 
            }
        }  
    }

    override deleteIfPermissible(): void {
        if(this.getParent().minimumNumberOfChildrenExceeded()) {
            this.delete();
        }
    }

    paste(): void {
        var parent = this.getParent();
        var sp = this.getScratchPad();
        var frame = sp.readSnippet();
        if (frame && this.canBePastedIn(frame)) {
            sp.remove(frame);
            parent.addChildBefore(frame, this);
            frame.setParent(parent);
            frame.select(true, false);
            this.deleteIfPermissible();
        }
    }

    private canBePastedIn(frame: Frame) : boolean {
        return this.optionsMatchingInput(frame.initialKeywords()).length === 1;
    }

    processOptions(key: string | undefined) {
        var options = this.optionsMatchingInput(this.text + key);
        if (options.length > 1 ) {
            this.text += this.commonStartText(this.text+ key).substring(this.text.length);
        } else if (options.length === 1) {
            var typeToAdd = options[0][0];
            this.addFrame(typeToAdd);
            this.text = "";
        }
    }

    tab(shift: boolean): void {
        if (shift) {
            this.   selectLastFieldAboveThisFrame();
        } else {
            var next = this.getNextFrameInTabOrder();
            if (next !== this) {
                next.selectFirstField();
            }
        }
    }

    canInsertBefore(): boolean {
        return false;
    }

    canInsertAfter(): boolean {
        return false;
    }

    insertPeerSelector(after: boolean): void {
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
