
import { AbstractFrame } from "./abstract-frame";
import { Field } from "./interfaces/field";
import { KeyEvent } from "./interfaces/key-event";
import { Parent } from "./interfaces/parent";

export abstract class AbstractSelector extends AbstractFrame  {
    text: string = "";
    prompt: string = "new code";
    protected help: string = "";

    constructor(parent: Parent) {
        super(parent);
        this.help = this.getDefaultHelp();
    }

    abstract getDefaultHelp(): string;

    getFields(): Field[] {
        return [];
    }

    getPrefix(): string {
        return 'select';
    }

    override deselect(): void {
        super.deselect();
        this.text = "";
        this.help = this.getDefaultHelp();
    }

    public override selectFirstField(): boolean {
        return false;
    }

    textToDisplay(): string {
        if (this.isSelected()) {
            return `<text>${this.text}</text><options> ${this.help}</options>`;
        } else {
            return `<prompt>${this.prompt}</prompt>`;
        }
    }

    renderAsSource(): string {
        return `${this.indent()}`;
    }

    processKey(keyEvent: KeyEvent): void {
        var char = keyEvent.key;
        if (char === "Backspace") {
            this.text = this.text.substring(0,this.text.length-1);
            this.help = this.getDefaultHelp();
            return;
        } 
        //Ignore all others
    }
} 
