import { AbstractFrame } from "../abstract-frame";


export abstract class Text extends AbstractFrame {
    public htmlId: string = "";
    protected text: string = "";
    protected prompt: string = "";

    constructor(prompt: string) {
        super();
        this.prompt = prompt;
    }

    public content() : String {
       if (this.text) {
        //TODO factor this out
        return this.text.replaceAll("<","&lt;").replaceAll(">","&gt;");
       } else {
        return this.prompt;
       }
    }

    public formattedContent() : String {
        return this.content().replaceAll(/([A-Z][A-Za-z0-9_]*)/g,'<type>$1</type>').replaceAll("of ","<keyword>of </keyword>").replaceAll("new ","<keyword>new </keyword>");
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