import { singleIndent } from "../helpers";
import { Text } from "./text";
import { TextFieldHolder } from "../TextFieldHolder";
import { Member } from "../class-members/member";

export class SelectMemberField extends Text implements Member {
    isMember: boolean = true;
    member: Member;

    constructor(holder: TextFieldHolder ) {
        super(holder);
        this.member = holder as Member;
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
            this.getFactory().addFunctionMethodBefore(this.member);
            return;
        }
        if (this.text === "pro" && char ==="c") {
            this.getFactory().addProcedureMethodBefore(this.member);
            this.text = "";
            return;
        }
        if (this.text === "pro" && char ==="p") {
            this.getFactory().addPropertyBefore(this.member);
            this.text = "";
            return;
        }
        super.enterText(char);
    }
} 
