import { Frame } from "./frame";
import { nextId } from "./helpers";

export abstract class AbstractFrame implements Frame {
    htmlId: string = "";

    protected cls() : string {
        return "";
    };

    protected nextId() : number {
        return nextId();
    }
    
    abstract renderAsHtml(): string;
}