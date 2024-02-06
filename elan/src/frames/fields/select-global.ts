import { AbstractField } from "./abstract-field";
import {File} from "../interfaces/file";
import { KeyEvent } from "../interfaces/key-event";
import { GlobalSelector } from "../globals/global-selector";

export class SelectGlobal extends AbstractField {
    isGlobal: boolean = true;

    constructor(holder: GlobalSelector) {
        super(holder);
        this._help = "class constant enum function main procedure #";
        this.setPrompt("new code");
        this.setOptional(true);
    }
    private getFile(): File {
        return (this.getHolder() as GlobalSelector).getParent() as unknown as File;
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
            this.getFile().addMainBefore(this);
            return;
        }
        if (empty && (char ==='f')) {
            this.getFile().addFunctionBefore(this);
            return;
        }
        if (empty && (char ==='p')) {
            this.getFile().addProcedureBefore(this);
            return;
        }
        if (empty && (char ==='e')) {
            this.getFile().addEnumBefore(this);
            return;
        }
        if (empty && (char ==='#')) {
            this.getFile().addGlobalCommentBefore(this);
            return;
        }     
        if (this.text === "c" && char ==="o") {
            this.getFile().addConstantBefore(this);
            this.text = "";
            return;
        }
        if (this.text === "c" && char ==="l") {
            this.getFile().addClassBefore(this);
            this.text = "";
            return;
        }
        super.processKey(keyEvent);
    }
}
