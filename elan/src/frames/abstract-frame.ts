import { Frame } from "./frame";
import { nextId } from "./helpers";

export abstract class AbstractFrame implements Frame {
    htmlId: string = "";
    isMultiLine: boolean = false;

    protected cls() : string {
        return `${this.isMultiLine? "multiline " : ""}`;
    };

    protected nextId() : number {
        return nextId();
    }
    
    abstract renderAsHtml(): string;
}