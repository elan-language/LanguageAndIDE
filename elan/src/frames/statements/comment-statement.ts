import { Comment } from "../fields/comment";
import { Member} from "../interfaces/member";
import { Parent} from "../interfaces/parent";
import { AbstractFrame} from "../abstract-frame";

import { Field } from "../interfaces/field";
import { CodeSource } from "../code-source";

export class CommentStatement extends AbstractFrame implements Member {
    isStatement = true;
    isMember = true;
    public text: Comment;

    constructor(parent: Parent) {
        super(parent);
        this.text= new Comment(this);
    }
    parseFrom(source: CodeSource): void {
        source.removeIndent();
        source.remove("# ");
        this.text.parseFrom(source);
        source.removeNewLine();
    }
    getFields(): Field[] {
        return [this.text];
    }
    getIdPrefix(): string {
        return 'com';
    }
    renderAsHtml(): string {
        return `<statement><comment class="${this.cls()}" id='${this.htmlId}' tabindex="0"><top><keyword># </keyword>${this.text.renderAsHtml()}</top></comment></statement>`;
    }
    renderAsSource(): string {
        return `${this.indent()}# ${this.text.renderAsSource()}`;
    }
}