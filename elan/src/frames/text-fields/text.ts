import { AbstractFrame } from "../abstract-frame";
import { Frame } from "../frame";


export abstract class Text extends AbstractFrame {
    public htmlId: string = "";
    protected text: string = "";
    protected prompt: string = "";
    protected useHtmlTags: boolean = false;

    constructor(prompt: string) {
        super();
        this.prompt = prompt;
    }

    public content() : string {
       if (this.text) {
        var c = this.replaceAngleBrackets(this.text);
        if (this.useHtmlTags) {
            c = this.tagTypeNames(c);
            c = this.tagKeywords(c);
        }
        return c;
       } else {
        return this.prompt;
       }
    }

    private replaceAngleBrackets(c: string) : string {
        return c.replaceAll("<","&lt;").replaceAll(">","&gt;");
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

    protected class() : String {
        if (this.text) {
            return "";
           } else {
            return "empty";
           }
    }

    renderAsHtml(): string {
        return `<text id="${this.htmlId}" class="${this.class()}" tabindex=0>${this.content()}</text>`;
    }

    enterText(text: string): void {
		this.text = text;
	}
}