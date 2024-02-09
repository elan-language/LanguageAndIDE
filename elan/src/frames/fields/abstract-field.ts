import { Selectable } from "../interfaces/selectable";
import { ParsingStatus } from "../parsing-status";
import { Field } from "../interfaces/field";
import { Frame } from "../interfaces/frame";
import { KeyEvent } from "../interfaces/key-event";

export abstract class AbstractField implements Selectable, Field {
    public isField: boolean = true;
    protected text: string = "";
    protected placeholder: string = "";
    protected useHtmlTags: boolean = false;
    protected htmlId: string = "";
    private selected: boolean = false;
    private focused: boolean = false;
    private _classes = new Array<string>;
    private holder: Frame;
    protected _optional: boolean = false;
    protected map: Map<string, Selectable>;

    constructor(holder: Frame) {
        this.holder = holder;
        var map = holder.getMap();
        this.htmlId = `${this.getIdPrefix()}${map.size}`;
        map.set(this.htmlId, this);
        this.map = map;
    }

    getHelp(): string {
        return "";
    }

    setOptional(value: boolean) : void {
        this._optional = value;
    }

    isOptional(): boolean {
        return this._optional;
    }

    processKey(keyEvent: KeyEvent): void {
        var char = keyEvent.key;
        if (char?.length === 1) {
            this.text += char;
            return;
        }
        if (char === "Tab") {
        if (keyEvent.shift) {
                this.holder.selectPreviousField();
            } else {
                this.holder.selectNextField();
            }
            return;
        } 
        if (char === "Backspace") {
            this.text = this.text.substring(0,this.text.length-1);
            return;
        } 
        if (char === "ArrowDown") {
           this.holder.getNextFrame().select(true, false);
            return;
        } 
        if (char === "ArrowUp") {
            this.holder.getPreviousFrame().select(true, false);
            return;
        } 
        if (char === "Escape") {
            this.holder.select(true, false);
            return;
        } 
        if (char === "ArrowLeft") {
            //TODO
            return;
        } 
        if (char === "ArrowRight") {
            //TODO
            return;
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
 
    //Default implementation to be overridden
     status(): ParsingStatus {
        if (this.text === ``)  {
            return this.isOptional() ? ParsingStatus.valid : ParsingStatus.incomplete;
        }
        return ParsingStatus.valid;
    }

    select(): void {
        this.deselectAll();
        this.selected = true;
        this.focus();
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
        if (this.selected) {
            return `<input size="${this.width()}" placeholder="${this.placeholder}" value="${this.escapeDoubleQuotes(this.text)}">`;
        }
        else{ 
            var c = this.escapeAngleBrackets(this.text);
             /* if (this.useHtmlTags) {
                c = this.tagTypeNames(c);
                c = this.tagKeywords(c);
            } */
            return c;
        } 
    }

    public width(): number {
        return this.text ?  (this.text.length > 1 ? this.text.length-1 : 1): this.placeholder.length-1;
    }

    private escapeDoubleQuotes(str: string): string {
        return str
            .replace(/"/g, '&quot;');
    }

    private escapeAngleBrackets(str: string) : string {
        return str
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
    }

    public contentAsSource() : string {
        if (this.text) {
         return this.text;
        } else {
         return this.placeholder;
        }
     }

    private tagTypeNames(c: string) : string {
        return c.replaceAll(/([A-Z][A-Za-z0-9_]*)/g,'<type>$1</type>');
    } 

    private tagKeywords(c: string) : string {
        var keywords = ["new ", "of ", "with "];
        keywords.forEach(kw => {
            c = c.replaceAll(kw,`<keyword>${kw}</keyword>`);
        });
        return c;
    }

    protected setClasses() {
        this._classes = new Array<string>();
        this.pushClass(this.selected, "selected");
        this.pushClass(this.focused, "focused");
        this.pushClass(!this.text, "empty");
        this.pushClass(this.isOptional(), "optional")
        this._classes.push(ParsingStatus[this.status()]);
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

    renderAsHtml(): string {
        return `<field id="${this.htmlId}" class="${this.cls()}" tabindex=0><text>${this.textAsHtml()}</text><placeholder>${this.placeholder}</placeholder><help>${this.getHelp()}</help></field>`;
    }

    indent(): string {
        return "";
    }

    renderAsSource(): string {
        return this.contentAsSource();
    }

    setTextWithoutParsing(text: string) {
        this.text = text;
    }
}