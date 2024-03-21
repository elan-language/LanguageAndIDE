import {Symbol} from "./symbol";

//Comma is distinct from other symbols because it is always followed by a space
export class Comma extends Symbol {
    constructor() {
        super(",");
    }

    renderAsHtml(): string {
        throw new Error("Method not implemented.");
    }

    renderAsSource(): string {
        return this.matchedText.trim() + " ";
    }
}
