import { Global } from "../globals/global";
import { Frame } from "../frame";
import { Text } from "./text";

export class SelectGlobal extends Text implements Global {
    isGlobal = true;

    constructor(parent: Frame) {
        super(parent);
        this.setPrompt("main, procedure, function, constant ...");
    }

    getPrefix(): string {
        return 'globalSelect';
    }

    renderAsHtml(): string {
        return `<global>${super.renderAsHtml()}</global>`;
    }

    indent(): string {
        return "";
    }

    renderAsSource(): string {
        return ``;
    } 
}
