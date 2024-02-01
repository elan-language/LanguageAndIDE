import { Text } from "./text";
import { TextFieldHolder } from "../TextFieldHolder";
import { Global } from "../globals/global";
import {File} from "../file";

export class SelectGlobalField extends Text implements Global {
    isGlobal: boolean = true;
    file: File ;

    constructor(holder: TextFieldHolder ) {
        super(holder);
        this.file = holder as File;
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
            this.file.addMainBefore(this);
            return;
        }
        if (empty && (char ==='f')) {
            this.file.addFunctionBefore(this);
            return;
        }
        if (empty && (char ==='p')) {
            this.file.addProcedureBefore(this);
            return;
        }
        if (empty && (char ==='e')) {
            this.file.addEnumBefore(this);
            return;
        }
        if (empty && (char ==='#')) {
            this.file.addGlobalCommentBefore(this);
            return;
        }     
        if (this.text === "c" && char ==="o") {
            this.file.addConstantBefore(this);
            this.text = "";
            return;
        }
        if (this.text === "c" && char ==="l") {
            this.file.addClassBefore(this);
            this.text = "";
            return;
        }
        super.enterText(char);
    }
}
