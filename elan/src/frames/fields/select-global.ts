import { AbstractField } from "./abstract-field";
import { Global } from "../interfaces/global";
import {File} from "../interfaces/file";
import { KeyEvent } from "../interfaces/key-event";

export class SelectGlobal extends AbstractField implements Global {
    isGlobal: boolean = true;
    private file: File;

    constructor(holder: File) {
        super(holder);
        this.file = holder;
        this._help = "class constant enum function main procedure #";
        this.setPrompt("new code");
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

    processKey(keyEvent: KeyEvent): void {
        var char = keyEvent.key;
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
        super.processKey(keyEvent);
    }
}
