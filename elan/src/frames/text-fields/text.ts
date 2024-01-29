import { CodeFrame } from "../code-frame";
import { Frame } from "../frame";

export abstract class Text extends CodeFrame {
    protected text: string = "";
    protected prompt: string = "";
    protected useHtmlTags: boolean = false;

    constructor(parent: Frame) {
        super(parent);
    }

    setPrompt(prompt: string): void {
        this.prompt = prompt;
    }

    public contentAsHtml(): string {
        if (this.isSelected()) {
            return `<input value="${this.text || this.prompt}">`;
        }
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

    public contentAsSource() : string {
        if (this.text) {
         return this.text;
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

    protected override setClasses() {
        super.setClasses();
        this.pushClass(!this.text, "empty");
    }


    renderAsHtml(): string {
        return `<text id="${this.htmlId}" class="${this.cls()}" tabindex=0>${this.contentAsHtml()}</text>`;
    }

    indent(): string {
        return "";
    }

    renderAsSource(): string {
        return this.contentAsSource();
    }

    enterText(text: string): void {
		this.text = text;
	}
}