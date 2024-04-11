import { Selectable } from "../interfaces/selectable";
import { ParseStatus } from "../parse-status";
import { Field } from "../interfaces/field";
import { Frame } from "../interfaces/frame";
import { editorEvent } from "../interfaces/editor-event";
import {CodeSource } from "../code-source";
import { escapeAngleBrackets, isCollapsible} from "../helpers";
import { ParseNode } from "../parse-nodes/parse-node";

export abstract class AbstractField implements Selectable, Field {
    public isField: boolean = true;
    protected text: string = "";
    protected placeholder: string = "";
    protected placeholderIsCode: boolean = false;
    protected useHtmlTags: boolean = false;
    protected htmlId: string = "";
    protected selected: boolean = false;
    private focused: boolean = false;
    private _classes = new Array<string>;
    private holder: Frame;
    private _optional: boolean = false;
    protected map: Map<string, Selectable>;
    private status: ParseStatus | undefined;
    private cursorPos: number = 0; //Relative to LH end of text
    protected rootNode?: ParseNode;
    protected completion: string = "";

    constructor(holder: Frame) {
        this.holder = holder;
        var map = holder.getMap();
        this.htmlId = `${this.getIdPrefix()}${map.size}`;
        map.set(this.htmlId, this);
        this.map = map;
    }
    abstract initialiseRoot(): ParseNode ;
    abstract readToDelimeter: (source: CodeSource) => string;

    alertHolderToUpdate():void {
        this.getHolder().fieldUpdated(this);
    }
    
    parseCurrentText() : void {    
        var root = this.initialiseRoot();
        this.parseCompleteTextUsingNode(this.text, root);
    }

    parseFrom(source: CodeSource): void {
        var text = this.readToDelimeter(source); 
        var root = this.initialiseRoot();
        this.parseCompleteTextUsingNode(text, root);
        if (this.status !== ParseStatus.valid) { 
            throw new Error(`Parse error at ${source.getRemainingCode()}`);
        }
    }

     parseCompleteTextUsingNode(text: string, root: ParseNode): void {
        if (text.length === 0) {
            this.setStatus(this.isOptional()? ParseStatus.valid : ParseStatus.incomplete);
        } else {
            root.parseText(text.trimStart());
            if (root.remainingText.trim().length > 0 || root.status === ParseStatus.invalid) {
                this.setStatus(ParseStatus.invalid);
                this.text = text.trimStart();
            } else {
                this.setStatus(root.status);
                this.text = root.renderAsSource();
            }
        }
    }

    getCompletion(): string {
        return this.rootNode? this.rootNode.getCompletionAsHtml() : "";
    }

    getPlainTextCompletion() : string {
        var comps = this.getCompletion();
        var i = comps.indexOf("<pr>");
        return i === -1 ? comps : comps.substring(0,i);
    }

    setOptional(optional: boolean) : void {
        this._optional = optional;
        if (this.text ==='' && optional ) {
            this.status = ParseStatus.valid;
        } else  if (this.text ==='' && !optional ) {
            this.status === ParseStatus.incomplete;
        }
    }

    getOptional(): boolean {
        return this._optional;
    }

    isOptional(): boolean {
        return this._optional;
    }
    processKey(e: editorEvent): void {
        var key = e.key;
        var textLen = this.text.length;
        switch (key) {
            case 'Escape': {this.holder.select(true, false); break;}
            case "Home": {this.cursorPos = 0; break; } 
            case "End": {this.cursorPos = textLen; break;} 
            case "Tab": {this.tabOrEnter(e.modKey.shift); break; } 
            case "Enter": {this.tabOrEnter(e.modKey.shift); break;} 
            case "ArrowLeft": {if (this.cursorPos > 0) { this.cursorPos --; } break; }  
            case "ArrowRight": {this.cursorRight(); break; } 
            case "ArrowUp": {this.getHolder().getPreviousFrameInTabOrder().select(true, false); break;} 
            case "ArrowDown": {this.getHolder().getNextFrameInTabOrder().select(true, false); break; } 
            case "Backspace": {
                if (this.cursorPos > 0) {
                    this.text = this.text.slice(0,this.cursorPos - 1) + this.text.slice(this.cursorPos);
                    this.cursorPos --;
                    this.parseCurrentText();
                }
                break;
            } 
            case "Delete": {
                if (this.cursorPos < textLen) {
                    this.text = this.text.slice(0,this.cursorPos) + this.text.slice(this.cursorPos+1);
                    this.parseCurrentText();
                }
                break;
            } 
            default: {
                if(key === "o" && e.modKey.control && isCollapsible(this.holder)) {
                    this.holder.expandCollapse(); 
                } else if ( key === 'O' && e.modKey.control) {
                        this.holder.expandCollapseAll();
                } else if (key?.length === 1) {
                    this.text = this.text.slice(0,this.cursorPos) + key + this.text.slice(this.cursorPos);
                    this.cursorPos ++;
                    var preParse = this.text.length;
                    this.parseCurrentText();
                    var afterParse = this.text.length;
                    if (afterParse > preParse ) {
                        this.cursorPos = this.cursorPos + afterParse - preParse;
                    }               
                }
            }
        }
    }

    private cursorRight() {
        var textLen = this.text.length;
        if (this.cursorPos < textLen) { 
            this.cursorPos ++; 
        } else {
            var completions = this.getPlainTextCompletion();
            if (completions.length > 0) {
                this.text = this.text + completions;
                this.parseCurrentText();
                this.cursorPos = this.text.length;
            }
        }
    }

    private tabOrEnter(back: boolean) {  
        if (back) {
            this.holder.selectFieldBefore(this);
        } else {
            this.holder.selectFieldAfter(this);
        }
    }

    isFocused(): boolean {
        return this.focused;
    }
    getHolder(): Frame  {
        return this.holder;
    }
    getIdPrefix(): string {
        return 'text';
    }
    focus(): void {
        this.focused = true;
    }
    defocus(): void {
        this.focused = false;
    }

    deselectAll() {
        for (const f of this.map.values()) {
            if (f.isSelected()) {
                f.deselect();
            }
        }
    }
    getStatus(): ParseStatus {
        if (!this.status) {
            this.parseCurrentText();
        }
        return this.status!;
    }
    protected setStatus(newStatus: ParseStatus) {
        this.status = newStatus;
    }

    select(): void {
        this.deselectAll();
        this.selected = true;
        this.focus();
        this.cursorPos = this.text.length;
    }

    isSelected() : boolean {
        return this.selected === true;
    }

    deselect(): void {
        this.selected = false;
        this.defocus();
    }

    setPlaceholder(placeholder: string): void {
        this.placeholder = placeholder;
    }

    public textAsHtml(): string {
        var html ="";
        if (this.selected) {
            html = `<input spellcheck="false" data-cursor="${this.cursorPos}" size="${this.charCount()}" style="width: ${this.fieldWidth()}" value="${this.escapeDoubleQuotes(this.text)}">`;
        } else { 
            if (this.rootNode && this.status !== ParseStatus.invalid) {
                html = this.rootNode.renderAsHtml();
            } else {
                html = escapeAngleBrackets(this.text);
            }
        }
        return html;
    }

    public charCount(): number {
        return this.text ?  (this.text.length > 1 ? this.text.length-1 : 1): 1;
    }

    public fieldWidth(): string {
        return this.text.length === 0 ? "2px" : `${this.text.length}ch`;
    }

    private escapeDoubleQuotes(str: string): string {
        return str
            .replace(/"/g, '&quot;');
    }

    public textAsSource() : string {
        return this.text;
    }

    protected setClasses() {
        this._classes = new Array<string>();
        this.pushClass(this.selected, "selected");
        this.pushClass(this.focused, "focused");
        this.pushClass(!this.text, "empty");
        this.pushClass(this.isOptional(), "optional");
        this._classes.push(ParseStatus[this.getStatus()]);
    }

    protected pushClass(flag: boolean, cls: string) {
        if (flag) {
            this._classes.push(cls);
        }
    }

    protected cls(): string {
        this.setClasses();
        return this._classes.join(" ");
    };

    placeholderKind() : string {
        return this.placeholderIsCode ? ` class="code"` : ``;
    }

    renderAsHtml(): string {
        return `<field id="${this.htmlId}" class="${this.cls()}" tabindex=0><text>${this.textAsHtml()}</text><placeholder${this.placeholderKind()}>${this.placeholder}</placeholder><completion>${this.getCompletion()}</completion></field>`;
    }

    indent(): string {
        return "";
    }

    renderAsSource(): string {
        return this.textAsSource();
    }

    renderAsObjectCode(): string {
        return this.textAsSource();
    }

    setText(text: string) {
        this.text = text;
    }
}