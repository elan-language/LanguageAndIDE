
import { Selectable } from "../interfaces/selectable";
import { ParsingStatus } from "../parsing-status";
import { Field } from "../interfaces/field";
import { Frame } from "../interfaces/frame";
import {File} from "../interfaces/file";
import { KeyEvent } from "../interfaces/key-event";

export abstract class AbstractField implements Selectable, Field {
    public isField: boolean = true;
    protected text: string = "";
    protected prompt: string = "";
    protected useHtmlTags: boolean = false;
    protected htmlId: string = "";
    private selected: boolean = false;
    private focused: boolean = false;
    private _classes = new Array<string>;
    private holder: Frame | File;
    protected _help: string = "";

    constructor(holder: Frame | File) {
        this.holder = holder;
        var map = holder.getMap();
        this.htmlId = `${this.getPrefix()}${map.size}`;
        map.set(this.htmlId, this);
    }

    help(): string {
        return this._help;
    }

    processKey(key: KeyEvent): void {
        throw new Error("Method not implemented.");
    }
    isFocused(): boolean {
        throw new Error("Method not implemented.");
    }
    getHolder(): Frame | File {
        return this.holder;
    }
    getPreviousField(): Field {
        throw new Error("Method not implemented.");
    }
    getNextField(): Field {
        throw new Error("Method not implemented.");
    }

    getPrefix(): string {
        return 'text';
    }
    focus(): void {
        throw new Error("Method not implemented.");
    }
    defocus(): void {
        throw new Error("Method not implemented.");
    }
 
     status(): ParsingStatus {
        return ParsingStatus.valid; //TODO: base on validation
    }

    select(): void {
        this.selected = true;
        this.focused = true;
    }

    isSelected() : boolean {
        return this.selected === true;
    }

    deselect(): void {
        this.selected = false;
    }

    setPrompt(prompt: string): void {
        this.prompt = prompt;
    }

    public contentAsHtml(): string {
        if (this.selected) {
            return `<input size="${this.width()}"  value="${this.escapeDoubleQuotes(this.text)}" placeholder="${this.prompt}">`;
        }
        if (this.text) { 
            var c = this.escapeAngleBrackets(this.text);
            if (this.useHtmlTags) {
                c = this.tagTypeNames(c);
                c = this.tagKeywords(c);
            }
            return c;
        } else {
            return this.prompt;
        }
    }

    public width(): number {
        return this.text ?  (this.text.length > 1 ? this.text.length-1 : 1): this.prompt.length-1;
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
         return this.prompt;
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
        return `<text id="${this.htmlId}" title="${this.help()}" class="${this.cls()}" tabindex=0>${this.contentAsHtml()}</text>`;
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