import { AbstractField } from "./abstract-field";
import {File} from "../interfaces/file";
import { KeyEvent } from "../interfaces/key-event";
import { GlobalSelector } from "../globals/global-selector";
import { Frame } from "../interfaces/frame";

export class GlobalSelectorField extends AbstractField {

    constructor(holder: GlobalSelector) {
        super(holder);
        this._help = "class constant enum function main procedure #";
        this.setPrompt("new code");
        this.setOptional(true);
    }
    private getFile(): File {
        return this.getFrame().getParent() as unknown as File;
    }

    private getFrame(): Frame {
        return (this.getHolder() as GlobalSelector);
    }

    getPrefix(): string {
        return 'globalSelect';
    }

    renderAsHtml(): string {
        return `${super.renderAsHtml()}`;
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
            this.getFile().addMainBefore(this.getFrame());
            return;
        }
        if (empty && (char ==='f')) {
            this.getFile().addFunctionBefore(this.getFrame());
            return;
        }
        if (empty && (char ==='p')) {
            this.getFile().addProcedureBefore(this.getFrame());
            return;
        }
        if (empty && (char ==='e')) {
            this.getFile().addEnumBefore(this.getFrame());
            return;
        }
        if (empty && (char ==='#')) {
            this.getFile().addGlobalCommentBefore(this.getFrame());
            return;
        }     
        if (this.text === "c" && char ==="o") {
            this.getFile().addConstantBefore(this.getFrame());
            this.text = "";
            return;
        }
        if (this.text === "c" && char ==="l") {
            this.getFile().addClassBefore(this.getFrame());
            this.text = "";
            return;
        }
        super.processKey(keyEvent);
    }
}
