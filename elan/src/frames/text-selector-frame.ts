import { Frame } from "./frame";
import { nextId } from "./frame-factory";
import { TextFrame } from "./text-frame";
import { VarFrame } from "./var-frame";

export enum TextType {
    identifier,
    expression
}


export class TextSelectorFrame implements Frame {

    private classes = '';

    constructor(private textType: TextType) {
        this.elementId = nextId();
    }

    private currentValue = "";

    isUpperCase(s : string) : boolean {
        return s !== s.toLowerCase() &&
               s === s.toUpperCase();
    }

    frameType(key: string): Frame {
        if (this.textType === TextType.identifier && this.currentValue === "") {
            if (this.isUpperCase(key)){
                return this;
            }
        }

        if (key === "Tab" && this.currentValue.length > 0) {
            return new TextFrame(this.currentValue, this.textType);
        }

        if (key !== "Tab") {
            this.currentValue = this.currentValue + key;
        }

        return this;
    }

    newFrame(): void {
        throw new Error("Method not implemented.");
    }

    private elementId: number;

    public applyClass(id: string, cls: string) {
        this.classes = '';
        if (id === `var${this.elementId}`) {
            this.classes = cls;
        }
    }

    renderAsHtml(): string {
        return `<input type="text" value="${this.currentValue}">`;
    }
}