import { Frame } from "./frame";
import { nextId } from "./frame-factory";
import { TextType } from "./text-selector-frame";

export class TextFrame implements Frame {

    public htmlId = "";

    constructor(public readonly value: string, private textType: TextType) {
        this.elementId = nextId();
    }
    clearSelector(): void {
        throw new Error("Method not implemented.");
    }

    userInput(key: string): Frame {
        throw new Error("Method not implemented.");
    }
    
    newFrame(id? : string): void {
        throw new Error("Method not implemented.");
    }

    private elementId: number;

    public applyClass(id: string, cls: string) {
      
    }

    renderAsHtml(): string {
        return this.textType === TextType.identifier ?   `<identifier>${this.value}</identifier>` : `<expression>${this.value}</expression>`;
    }
}