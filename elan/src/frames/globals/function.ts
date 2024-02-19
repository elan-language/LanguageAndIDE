
import { Identifier } from "../fields/identifier";
import { ParamList } from "../fields/param-list";
import { Type } from "../fields/type";
import { ReturnStatement } from "../statements/return-statement";
import { FrameWithStatements } from "../frame-with-statements";
import { Parent} from "../interfaces/parent";
import { Field } from "../interfaces/field";
import { CodeSource } from "../code-source";
import { Regexes } from "../fields/regexes";

export class Function extends FrameWithStatements implements Parent {
    isGlobal = true;
    public name : Identifier;
    public params: ParamList;
    public returnType: Type;

    constructor(parent: Parent) {
        super(parent);
        this.multiline = true;
        this.name = new Identifier(this);
        this.params = new ParamList(this);
        this.returnType = new Type(this);
        this.returnType.setPlaceholder("return type");
        this.statements.push(new ReturnStatement(this));
    }

    getFields(): Field[] {
        return [this.name, this.params, this.returnType];
    }

    getIdPrefix(): string {
        return 'func';
    }

    get returnStatement() {
        return this.statements[this.statements.length -1] as ReturnStatement;
    }

    public override selectFirstField(): boolean {
        this.name.select();
        return true;
    }

    public renderAsHtml() : string {
        return `<function class="${this.cls()}" id='${this.htmlId}' tabindex="0">
<top><expand>+</expand><keyword>function </keyword>${this.name.renderAsHtml()}(${this.params.renderAsHtml()})<keyword> as </keyword>${this.returnType.renderAsHtml()}</top>
${this.renderStatementsAsHtml()}
<keyword>end function</keyword>
</function>`;
    }

    indent(): string {
        return "";
    }

    public renderAsSource() : string {
        return `function ${this.name.renderAsSource()}(${this.params.renderAsSource()}) as ${this.returnType.renderAsSource()}\r
${this.renderStatementsAsSource()}\r
end function\r
`;
    }

    parseTopOfFrame(source: CodeSource): void {
        source.remove("function ");
        this.name.parseFrom(source);
        source.remove("(");
        this.params.parseFrom(source);
        source.remove(") as ");
        this.returnType.parseFrom(source);
    }
    parseBottomOfFrame(source: CodeSource): boolean {
        var result = false;
        var keyword = "return ";
        if (source.isMatch(keyword)) {
            this.getReturnStatement().parseFrom(source);
            source.removeNewLine().removeIndent();
            this.parseStandardEnding(source, "end function");
            result = true;
        }
        return result;
    }

    private getReturnStatement() : ReturnStatement {
        return this.statements.filter(s => ('isReturnStatement' in s))[0] as ReturnStatement;
    }

}