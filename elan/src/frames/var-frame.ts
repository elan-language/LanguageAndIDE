import { Frame } from "./frame";
import { nextId } from "./frame-factory";
import { TextFrame } from "./text-frame";
import { TextSelectorFrame, TextType } from "./text-selector-frame";

export class VarFrame implements Frame {

    private classes = '';

    private idFrame : Frame;
    private exprFrame : Frame;
    public htmlId : string;


    constructor(identifier: string, expr: string) {
        this.idFrame = new TextFrame(identifier, TextType.identifier);
        this.exprFrame = new TextFrame(expr, TextType.expression);
        this.htmlId = `var${nextId()}`;
    }
    clearSelector(): void {
        if (this.idFrame instanceof TextSelectorFrame) {
            this.idFrame = new TextFrame("", TextType.identifier);
        }
        if (this.exprFrame instanceof TextSelectorFrame) {
            this.exprFrame = new TextFrame("", TextType.expression);
        }
    }

    addFrame(frame : Frame, textType : TextType){
        if (textType === TextType.identifier){
            this.idFrame = frame;
        }
        else {
            this.exprFrame = frame;
        }
    }


    userInput(key: string): Frame {
        if (this.idFrame instanceof TextSelectorFrame) {
            this.idFrame = this.idFrame.userInput(key);

            if (this.idFrame instanceof TextFrame && this.exprFrame instanceof TextFrame){
                if (this.exprFrame.value.length === 0){
                    this.exprFrame = new TextSelectorFrame(TextType.expression);
                }
            }
        }

        if (this.exprFrame instanceof TextSelectorFrame) {
            this.exprFrame = this.exprFrame.userInput(key);
        }

        return this;
    }
    
    newFrame(id? : string): void {
        throw new Error("Method not implemented.");
    }

    public applyClass(id: string, cls: string) {
        this.classes = '';
        if (id === this.htmlId){
           this.classes = cls;
        }

        if (this.idFrame.htmlId === id){
            this.idFrame = new TextSelectorFrame(TextType.identifier, (<TextFrame> this.idFrame).value);
        }

        if (this.exprFrame.htmlId === id){
            this.exprFrame = new TextSelectorFrame(TextType.expression, (<TextFrame> this.exprFrame).value);
        }
    }

    renderAsHtml(): string {
        const cls = `frame ${this.classes}`;
        const id = this.idFrame.renderAsHtml();
        const expr = this.exprFrame.renderAsHtml();
      
        return `<statement id='${this.htmlId}' class="${cls}" tabindex="0">
                <keyword>var</keyword>
                ${id}
                <keyword>set to</keyword>
                ${expr}
                </statement>`;
    }
}