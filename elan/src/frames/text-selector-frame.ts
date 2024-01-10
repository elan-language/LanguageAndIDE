import { Frame } from "./frame";
import { nextId } from "./frame-factory";
import { TextFrame } from "./text-frame";
import { VarFrame } from "./var-frame";

export enum TextType {
    identifier,
    expression
}


export class TextSelectorFrame implements Frame {

    public htmlId = "";

    constructor(private textType: TextType, v? : string) {
        this.elementId = nextId();
        this.currentValue = v ? v : "";
    }
    clearSelector(): void {
        throw new Error("Method not implemented.");
    }

    private currentValue = "";

    isUpperCase(s : string) : boolean {
        return s !== s.toLowerCase() &&
               s === s.toUpperCase();
    }

    userInput(key: string): Frame {
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

    newFrame(id? : string): void {
        throw new Error("Method not implemented.");
    }

    private elementId: number;

    public applyClass(id: string, cls: string) {
        
    }

    renderAsHtml(): string {
        return `<input id='ts${this.textType}' class='live' type='text' value='${this.currentValue}'>`;
    }
}