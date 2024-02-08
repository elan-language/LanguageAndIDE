import { AbstractFrame } from "./abstract-frame";
import { Field } from "./interfaces/field";
import { KeyEvent } from "./interfaces/key-event";
import { Parent } from "./interfaces/parent";

export abstract class AbstractSelector extends AbstractFrame  {
    text: string = "";
    label: string = "new code";

    constructor(parent: Parent) {
        super(parent);
    }

    protected setClasses() {
        super.setClasses();
        this.pushClass(this.text === "", "empty");
    };

    abstract getHelp(): string;

    clearText() : void {
        this.text = "";
    }


    getFields(): Field[] {
        return [];
    }

    getIdPrefix(): string {
        return 'select';
    }

    override deselect(): void {
        super.deselect();
        this.text = "";
    }

    public override selectFirstField(): boolean {
        return false;
    }

    textToDisplay(): string {
            return `<text>${this.text}</text><placeholder>${this.label}</placeholder><help> ${this.getHelp()}</help>`;
    }

    renderAsSource(): string {
        return `${this.indent()}`;
    }

    processKey(keyEvent: KeyEvent): void {
        var char = keyEvent.key;
        if (char === "Backspace") {
            this.text = this.text.substring(0,this.text.length-1);
            return;
        } 
        //Ignore all others
    }
} 
