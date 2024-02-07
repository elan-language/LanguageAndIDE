
import { AbstractFrame } from "../abstract-frame";
import { Field } from "../interfaces/field";
import { File } from "../interfaces/file";
import { Parent } from "../interfaces/parent";
import { KeyEvent } from "../interfaces/key-event";

export class GlobalSelector extends AbstractFrame  {
    isGlobal = true;
    text: string = "";
    prompt: string = "new code";
    help: string = "";
    private readonly defaultHelp: string = "main procedure function class constant enum #";

   constructor(parent: Parent) {
        super(parent);
        this.help = this.defaultHelp;
    }

    override deselect(): void {
        super.deselect();
        this.text = "";
        this.help = this.defaultHelp;
    }

    getFile(): File {
        return this.getParent() as File;
    }

    getHelp(): string {
        return this.help; //TODO, filter list based on text
    }

    textToDisplay(): string {
        if (this.isSelected()) {
            return `<text>${this.text}</text><prompt> ${this.getHelp()}</prompt>`;
        } else {
            return `<prompt>${this.prompt}</prompt`;
        }
    }

    getFields(): Field[] {
        return [];
    }

    getPrefix(): string {
        return 'select';
    }

    public override selectFirstField(): boolean {
        return true;
    }

    renderAsHtml(): string {
        return `<global class="${this.cls()}" id='${this.htmlId}' tabindex="0">${this.textToDisplay()}</global>`;
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
        if (char === "Shift") {
            return;
        }
        if (char === "Backspace") {
            this.text = this.text.substring(0,this.text.length-1);
            this.help = this.defaultHelp;
            return;
        } 
        if (empty && char ==='m') {
            this.getFile().addMainBefore(this);
            return;
        }
        if (empty && char ==='f') {
            this.getFile().addFunctionBefore(this);
            return;
        }
        if (empty && char ==='p') {
            this.getFile().addProcedureBefore(this);
            return;
        }
        if (empty && char ==='e') {
            this.getFile().addEnumBefore(this);
            return;
        }
        if (empty && char ==='#') {
            this.getFile().addGlobalCommentBefore(this);
            return;
        }
        if (empty && char ==='c') {
            this.text+=char;
            this.help = "class constant";
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
        //All other characters ignored
    }
} 
