import { AbstractFrame } from "./abstract-frame";
import { Field } from "./interfaces/field";
import { KeyEvent } from "./interfaces/key-event";
import { Parent } from "./interfaces/parent";

export abstract class AbstractSelector extends AbstractFrame  {
    text: string = "";
    label: string = "new code";
    protected defaultOptions: [string, string][]= new Array<[string, string]>();

    constructor(parent: Parent) {
        super(parent);
    }

    abstract validforContext(frameType: string) : boolean;

    currentOptions(match: string): [string, string][] {
        return this.defaultOptions.filter(o => this.validforContext(o[0]) && o[1].startsWith(match));
    }

    commonStartText(match: string): string {
        return this.currentOptions(match).map(o => o[1]).reduce((soFar, o)=> this.maxCommonStart(soFar, o));
    }

    private maxCommonStart(a: string, b: string): string {
        return a !== "" && b !=="" &&  a[0] === b[0] ? a[0] + this.maxCommonStart(a.slice(1), b.slice(1)): "";          
    }
 
    getHelp(): string {
        return this.currentOptions(this.text).map(o => o[1]).reduce((soFar, kw)=> soFar + " " + kw, "");
    }

    abstract addMember(frameType: string, startText: string): void;

    protected setClasses() {
        super.setClasses();
        this.pushClass(this.text === "", "empty");
    };

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
            return `<text>${this.text}</text><placeholder>${this.label}</placeholder><help>${this.getHelp()}</help>`;
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
        if (!char || char.length > 1) { //TODO: Make any exception for any specific non-printing chars?
            return;
        }
        var options = this.currentOptions(this.text + char);
        if (options.length > 1 ) {
            this.text += this.commonStartText(this.text+ char);
        } else if (options.length === 1) {
            var typeToAdd = options[0][0];
            this.addMember(typeToAdd, this.text + char);
            this.text = "";
        } else {
            return; //key not valid so not added
        }
    }
} 
