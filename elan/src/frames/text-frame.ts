import { Frame } from "./frame";
import { nextId } from "./frame-factory";
import { TextType } from "./text-selector-frame";

export class TextFrame implements Frame {

    public htmlId = "";

    constructor(public readonly value: string, private textType: TextType) {
        const type = textType === TextType.identifier ? "identifier" : "expression";
        this.htmlId = `${type}${nextId()}`;
    }

    clearSelector(): void {
        throw new Error("Method not implemented.");
    }

    userInput(key: string): Frame {
        throw new Error("Method not implemented.");
    }

    newFrame(id?: string): void {
        throw new Error("Method not implemented.");
    }

    public applyClass(id: string, cls: string) {

    }

    renderAsHtml(): string {
        return this.textType === TextType.identifier ? `<identifier class="frame" id ='${this.htmlId}'>${this.value}</identifier>` : `<expression class='frame' id ='${this.htmlId}'>${this.value}</expression>`;
    }
}