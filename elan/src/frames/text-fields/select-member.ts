import { Frame } from "../frame";
import { singleIndent } from "../helpers";
import { Member} from "../class-members/member";
import { Text } from "./text";

export class SelectMember extends Text implements Member {
    isMember = true;
    
    constructor(parent: Frame) {
        super(parent);
        this.setPrompt("member");
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
} 
