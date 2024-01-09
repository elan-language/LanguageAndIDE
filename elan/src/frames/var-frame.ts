import { Frame } from "./frame";
import { nextId } from "./frame-factory";
import { TextFrame } from "./text-frame";
import { TextSelectorFrame, TextType } from "./text-selector-frame";

export class VarFrame implements Frame {

    private classes = '';

    private idFrame : Frame;
    private exprFrame : Frame;

    constructor(id: string, expr: string) {
        this.elementId = nextId();
        this.idFrame = new TextFrame(id, TextType.identifier);
        this.exprFrame = new TextFrame(expr, TextType.expression);
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
    
    newFrame(): void {
        throw new Error("Method not implemented.");
    }

    private elementId: number;

    public applyClass(id: string, cls: string) {
        this.classes = '';
        if (id === `var${this.elementId}`){
           this.classes = cls;
        }
    }

    renderAsHtml(): string {
        const cls = `frame ${this.classes}`;
        const id = this.idFrame.renderAsHtml();
        const expr = this.exprFrame.renderAsHtml();
      
        return `<statement id='var${this.elementId}' class="${cls}"><keyword>var</keyword>${id}<keyword>set to</keyword>${expr}</statement>`;
    }
}