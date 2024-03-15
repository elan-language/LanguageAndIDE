
import { ParamList } from "../fields/param-list";
import { TypeUse } from "../fields/type-use";
import { ReturnStatement } from "../statements/return-statement";
import { FrameWithStatements } from "../frame-with-statements";
import { Parent} from "../interfaces/parent";
import { Field } from "../interfaces/field";
import { CodeSource } from "../code-source";
import { File } from "../interfaces/file";
import { FuncNameDef } from "../fields/func-name-def";

export class Function extends FrameWithStatements implements Parent {
    isGlobal = true;
    public name : FuncNameDef;
    public params: ParamList;
    public returnType: TypeUse;
    file: File;

    constructor(parent: Parent) {
        super(parent);
        this.file = parent as File;
        this.multiline = true;
        this.name = new FuncNameDef(this);
        this.params = new ParamList(this);
        this.returnType = new TypeUse(this);
        this.returnType.setPlaceholder("return type");
        this.statements.push(new ReturnStatement(this));
    }

    minimumNumberOfChildrenExceeded(): boolean {
        return this.getNoOfStatements() > 1; // return may be the only statement
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
        return this.statements.filter(s => ('isReturnStatement' in s))[0] as ReturnStatement;
    }
    insertSelector(after: boolean): void {
        this.file.insertGlobalSelector(after, this);
    }
}