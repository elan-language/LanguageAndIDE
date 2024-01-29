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
            return `<input value="${this.escapeDoubleQuotes(this.text)}" placeholder="${this.prompt}">`;
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

    enterText(char: string): void {
        switch (char) {
            case 'Shift': {
                break; //Do nothing
            }
            case 'Backspace': {
                this.text = this.text.substring(0, this.text.length-1);
                break;
            }
            default :
            {
                this.text += char;
            }
        }
	}
}