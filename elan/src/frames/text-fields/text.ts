import { TextFieldHolder } from "../TextFieldHolder";
import { Frame } from "../frame";
import { FrameFactory } from "../frame-factory";
import { nextId } from "../helpers";
import { Parent } from "../parent";
import { ParsingStatus } from "../parsing-status";

export abstract class Text implements Frame {
    protected text: string = "";
    protected prompt: string = "";
    protected useHtmlTags: boolean = false;
    protected htmlId: string = "";
    private selected: boolean = false;
    private focused: boolean = false;
    private _factory: FrameFactory;
    private _classes = new Array<string>;

    holder: TextFieldHolder;
    
    constructor(holder: TextFieldHolder) {
        this.holder = holder;
        var frameMap = holder.getFrameMap();
        this.htmlId = `${this.getPrefix()}${nextId()}`;
        frameMap.set(this.htmlId, this);
        this._factory = holder.getFactory();
    }

    getPrefix(): string {
        return 'text';
    }

    getFrameMap(): Map<string, Frame> {
        throw new Error("Method not implemented.");
    }
    isFocused(): boolean {
        throw new Error("Method not implemented.");
    }
    focus(): void {
        throw new Error("Method not implemented.");
    }
    defocus(): void {
        throw new Error("Method not implemented.");
    }
    isMultiline(): boolean {
        throw new Error("Method not implemented.");
    }
    hasParent(): boolean {
        throw new Error("Method not implemented.");
    }
    setParent(parent: Parent): void {
        throw new Error("Method not implemented.");
    }
    getParent(): Parent {
        throw new Error("Method not implemented.");
    }
    selectParent(multiSelect: boolean): void {
        throw new Error("Method not implemented.");
    }
    isParent(): boolean {
        throw new Error("Method not implemented.");
    }
    selectFirstChild(multiSelect: boolean): boolean {
        throw new Error("Method not implemented.");
    }
    selectNextPeer(multiSelect: boolean): void {
        throw new Error("Method not implemented.");
    }
    selectPreviousPeer(multiSelect: boolean): void {
        throw new Error("Method not implemented.");
    }
    selectFirstPeer(multiSelect: boolean): void {
        throw new Error("Method not implemented.");
    }
    selectLastPeer(multiSelect: boolean): void {
        throw new Error("Method not implemented.");
    }
    selectFirstText(): boolean {
        throw new Error("Method not implemented.");
    }
    isCollapsed(): boolean {
        throw new Error("Method not implemented.");
    }
    collapse(): void {} //Nothing to do
    expand(): void {}//Nothing to do

    status(): ParsingStatus {
        throw new Error("Method not implemented.");
    }

    getFactory(): FrameFactory {
        return this._factory;
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
        return this.text ? this.text.length : this.prompt.length;
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
        return `<text id="${this.htmlId}" class="${this.cls()}" tabindex=0>${this.contentAsHtml()}</text>`;
    }

    indent(): string {
        return "";
    }

    renderAsSource(): string {
        return this.contentAsSource();
    }

    enterText(char: string): void {
        switch (char) {
            case 'Shift': {
                break;
            }
            case 'Backspace': {
                this.text = this.text.substring(0, this.text.length-1);
                break;
            }
            case 'ArrowUp': {
                this.holder.select(true, false);
                break;
            }
            case 'Down': {
                this.holder.select(true, false);
                break;
            }
            default :
            {
                this.text += char;
            }
        }
	}
}