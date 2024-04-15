
import { IdentifierField } from "../fields/identifier-field";
import { ParamList } from "../fields/param-list";
import { TypeField } from "../fields/type-field";
import { ReturnStatement } from "../statements/return-statement";
import { FrameWithStatements } from "../frame-with-statements";
import { Parent} from "../interfaces/parent";
import { Field } from "../interfaces/field";
import { CodeSource } from "../code-source";
import { File } from "../interfaces/file";
import { Profile } from "../interfaces/profile";
import { endKeyword, functionKeyword, returnKeyword } from "../keywords";

export class FunctionFrame extends FrameWithStatements implements Parent {
    isGlobal = true;
    public name : IdentifierField;
    public params: ParamList;
    public returnType: TypeField;
    file: File;

    constructor(parent: Parent) {
        super(parent);
        this.file = parent as File;
        this.name = new IdentifierField(this);
        this.params = new ParamList(this);
        this.returnType = new TypeField(this);
        this.returnType.setPlaceholder("return type");
        this.getChildren().push(new ReturnStatement(this));
    }
    getProfile(): Profile {
        return this.getParent().getProfile();
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
<top><expand>+</expand><keyword>${functionKeyword} </keyword><method>${this.name.renderAsHtml()}</method>(${this.params.renderAsHtml()})<keyword> ${ returnKeyword} </keyword>${this.returnType.renderAsHtml()}</top>
${this.renderChildrenAsHtml()}
<keyword>${endKeyword} ${functionKeyword}</keyword>
</function>`;
    }

    indent(): string {
        return "";
    }

    public renderAsSource() : string {
        return `${functionKeyword} ${this.name.renderAsSource()}(${this.params.renderAsSource()}) ${ returnKeyword} ${this.returnType.renderAsSource()}\r
${this.renderChildrenAsSource()}\r
${endKeyword} ${functionKeyword}\r
`;
    }

    public renderAsObjectCode() : string {
        return `function ${this.name.renderAsObjectCode()}(${this.params.renderAsObjectCode()}) {\r
${this.renderChildrenAsObjectCode()}\r
}\r
`;
    }

    parseTop(source: CodeSource): void {
        source.remove(`${functionKeyword} `);
        this.name.parseFrom(source);
        source.remove("(");
        this.params.parseFrom(source);
        source.remove(`) ${ returnKeyword} `);
        this.returnType.parseFrom(source);
    }
    parseBottom(source: CodeSource): boolean {
        var result = false;
        var keyword = `${returnKeyword} `;
        source.removeIndent();
        if (source.isMatch(keyword)) {
            this.getReturnStatement().parseFrom(source);
            source.removeNewLine().removeIndent();
            this.parseStandardEnding(source, `${endKeyword} ${functionKeyword}`);
            result = true;
        }
        return result;
    }
    private getReturnStatement() : ReturnStatement {
        return this.getChildren().filter(s => ('isReturnStatement' in s))[0] as ReturnStatement;
    }
}