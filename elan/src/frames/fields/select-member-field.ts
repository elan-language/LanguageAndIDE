import { singleIndent } from "../helpers";
import { Field } from "./field";
import { TextFieldHolder } from "../TextFieldHolder";
import { Member } from "../class-members/member";
import { Class } from "../globals/class";

export class SelectMemberField extends Field implements Member {
    isMember: boolean = true;
    class: Class;

    constructor(holder: TextFieldHolder ) {
        super(holder);
        this.class = holder as Class;
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

    enterText(char: string): void {
        var empty = this.text ==="";
        if (empty && (char ==='f')) {
            this.class.addFunctionMethodBefore(this);
            return;
        }
        if (this.text === "pro" && char ==="c") {
            this.class.addProcedureMethodBefore(this);
            this.text = "";
            return;
        }
        if (this.text === "pro" && char ==="p") {
            this.class.addPropertyBefore(this);
            this.text = "";
            return;
        }
        super.enterText(char);
    }
} 
