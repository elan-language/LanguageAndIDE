import { Text } from "./text";


export class ParamList extends Text {
    constructor() {
        super("parameter definitions");
        this.htmlId = `params${this.nextId()}`;
    }

    renderAsHtml(): string {  
        return `<text id="${this.htmlId}" class="${this.class()}" tabindex=0>${this.formattedContent()}</text>`;
    }
}