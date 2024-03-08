
import { Identifier } from "../fields/identifier";
import { ParamList } from "../fields/param-list";
import { Type } from "../fields/type";
import { ReturnStatement } from "../statements/return-statement";
import { FrameWithStatements } from "../frame-with-statements";
import { Parent} from "../interfaces/parent";
import { Field } from "../interfaces/field";
import { CodeSource } from "../code-source";
import { File } from "../interfaces/file";

export class Function extends FrameWithStatements implements Parent {
    isGlobal = true;
    public name : Identifier;
    public params: ParamList;
    public returnType: Type;
    file: File;

    constructor(parent: Parent) {
        super(parent);
        this.file = parent as File;
        this.multiline = true;
        this.name = new Identifier(this);
        this.params = new ParamList(this);
        this.returnType = new Type(this);
        this.returnType.setPlaceholder("return type");
        this.getChildren().push(new ReturnStatement(this));
    }

    minimumNumberOfChildrenExceeded(): boolean {
        return this.getChildren().length > 1; // return may be the only statement
    }

    getFields(): Field[] {
        return [this.name, this.params, this.returnType];
    }

    getIdPrefix(): string {
        return 'func';
    }
    public renderAsHtml() : string {
        return `<function class="${this.cls()}" id='${this.htmlId}' tabindex="0">
<top><expand>+</expand><keyword>function </keyword>${this.name.renderAsHtml()}(${this.params.renderAsHtml()})<keyword> as </keyword>${this.returnType.renderAsHtml()}</top>
${this.renderChildrenAsHtml()}
<keyword>end function</keyword>
</function>`;
    }

    indent(): string {
        return "";
    }

    public renderAsSource() : string {
        return `function ${this.name.renderAsSource()}(${this.params.renderAsSource()}) as ${this.returnType.renderAsSource()}\r
${this.renderChildrenAsSource()}\r
end function\r
`;
    }

    parseTop(source: CodeSource): void {
        source.remove("function ");
        this.name.parseFrom(source);
        source.remove("(");
        this.params.parseFrom(source);
        source.remove(") as ");
        this.returnType.parseFrom(source);
    }
    parseBottom(source: CodeSource): boolean {
        var result = false;
        var keyword = "return ";
        source.removeIndent();
        if (source.isMatch(keyword)) {
            this.getReturnStatement().parseFrom(source);
            source.removeNewLine().removeIndent();
            this.parseStandardEnding(source, "end function");
            result = true;
        }
        return result;
    }
    private getReturnStatement() : ReturnStatement {
        return this.getChildren().filter(s => ('isReturnStatement' in s))[0] as ReturnStatement;
    }
    insertSelector(after: boolean): void {
        this.file.insertSelector(after, this);
    }
}