import { CodeFrame } from "../code-frame";
import { Frame } from "../frame";
import { singleIndent } from "../helpers";
import { PlainText } from "../text-fields/plain_text";
import { Member} from "./member";

export class MemberSelector extends CodeFrame implements Member {
    isMember = true;
    text: PlainText;
    
    constructor(parent: Frame) {
        super(parent);
        this.text = new PlainText(this);
        this.text.setPrompt("member");
    }

    getPrefix(): string {
        return 'memberSelect';
    }

    public override selectFirstText(): boolean {
        this.text.select(true);
        return true;
    }

    renderAsHtml(): string {
        return `<memberSelector class="${this.cls()}" id='${this.htmlId}' tabindex="0">${this.text.renderAsHtml()}</memberSelector>`;
    }

    renderAsSource(): string {
        return `${singleIndent()}member\r\n`;
    }
} 
