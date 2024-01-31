import { Text } from "./text";
import { TextFieldHolder } from "../TextFieldHolder";
import { Global } from "../globals/global";

export class SelectGlobalField extends Text {
    global: Global;

    constructor(holder: TextFieldHolder ) {
        super(holder);
        this.global = holder as Global;
        this.setPrompt("class constant enum function main procedure #");
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

    enterText(char: string): void {
        var empty = this.text ==="";
        if (empty && (char ==='m')) {
            this.getFactory().addMainBefore(this.global);
            return;
        }
        if (empty && (char ==='f')) {
            this.getFactory().addFunctionBefore(this.global);
            return;
        }
        if (empty && (char ==='p')) {
            this.getFactory().addProcedureBefore(this.global);
            return;
        }
        if (empty && (char ==='e')) {
            this.getFactory().addEnumBefore(this.global);
            return;
        }
        if (empty && (char ==='#')) {
            this.getFactory().addGlobalCommentBefore(this.global);
            return;
        }     
        if (this.text === "c" && char ==="o") {
            this.getFactory().addConstantBefore(this.global);
            this.text = "";
            return;
        }
        if (this.text === "c" && char ==="l") {
            this.getFactory().addClassBefore(this.global);
            this.text = "";
            return;
        }
        super.enterText(char);
    }
}
