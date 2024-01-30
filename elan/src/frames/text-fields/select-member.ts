import { Frame } from "../frame";
import { singleIndent } from "../helpers";
import { Text } from "./text";
import { Class } from "../globals/class";
import { FunctionMethod } from "../class-members/function-method";
import { Member } from "../class-members/member";
import { Property } from "../class-members/property";
import { ProcedureMethod } from "../class-members/procedure-method";


export class SelectMember extends Text implements Member {
    isMember = true;
    
    constructor(parent: Frame) {
        super(parent);
        this.setPrompt("function procedure property");
    }

    getPrefix(): string {
        return 'memberSelect';
    }

    renderAsHtml(): string {
        return `<member>${super.renderAsHtml()}</member>`;
    }

    renderAsSource(): string {
        return `${singleIndent()}member\r\n`;
    }

    private addBeforeAndSelect(member: Member) {
        (this.parent as Class).addMemberBefore(member, this);
        this.deselectAll(); //TODO should happen automatically
        member.select(true, false);
    }

    enterText(char: string): void {
        var empty = this.text ==="";
        if (empty && (char ==='f')) {
            var m = new FunctionMethod(this.parent);
            this.addBeforeAndSelect(m);
            return;
        }
        if (this.text === "pro" && char ==="c") {
            var proc= new ProcedureMethod(this.parent);
            this.text = "";
            this.addBeforeAndSelect(proc);
            return;
        }
        if (this.text === "pro" && char ==="p") {
            var prop= new Property(this.parent);
            this.text = "";
            this.addBeforeAndSelect(prop);
            return;
        }
        super.enterText(char);
    }
} 
