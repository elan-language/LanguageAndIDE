
import { IdentifierField } from "../fields/identifier-field";
import { ParamList } from "../fields/param-list";
import { TypeField } from "../fields/type-field";
import { ReturnStatement } from "../statements/return-statement";
import { FrameWithStatements } from "../frame-with-statements";
import { Parent } from "../interfaces/parent";
import { Field } from "../interfaces/field";
import { CodeSource } from "../code-source";
import { File } from "../interfaces/file";
import { Profile } from "../interfaces/profile";
import { endKeyword, functionKeyword, returnKeyword } from "../keywords";
import { ISymbol, SymbolScope } from "../../symbols/symbol";
import { Frame } from "../interfaces/frame";
import { FunctionType } from "../../symbols/function-type";
import { Scope } from "../interfaces/scope";
import { UnknownSymbol } from "../../symbols/unknown-symbol";

export abstract class FunctionFrame extends FrameWithStatements implements Parent, ISymbol, Scope {
    public name: IdentifierField;
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
    initialKeywords(): string {
        return functionKeyword;
    }
    get symbolId() {
        return this.name.text;
    }

    get symbolType() {
        const pt = this.params.symbolTypes;
        const rt = this.returnType.symbolType!;
        return new FunctionType(pt, rt, false);
    }

    symbolScope = SymbolScope.program;

    getProfile(): Profile {
        return this.getFile().getProfile();
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
    public renderAsHtml(): string {
        return `<function class="${this.cls()}" id='${this.htmlId}' tabindex="0">
<top><expand>+</expand><keyword>${functionKeyword} </keyword><method>${this.name.renderAsHtml()}</method>(${this.params.renderAsHtml()})<keyword> ${returnKeyword} </keyword>${this.returnType.renderAsHtml()}</top>${this.compileMsgAsHtml()}
${this.renderChildrenAsHtml()}
<keyword>${endKeyword} ${functionKeyword}</keyword>
</function>`;
    }

    parseTop(source: CodeSource): void {
        source.remove(`${functionKeyword} `);
        this.name.parseFrom(source);
        source.remove("(");
        this.params.parseFrom(source);
        source.remove(`) ${returnKeyword} `);
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
    protected getReturnStatement(): ReturnStatement {
        return this.getChildren().filter(s => ('isReturnStatement' in s))[0] as ReturnStatement;
    }
    
    resolveSymbol(id: string | undefined, initialScope: Frame): ISymbol {
        if (this.name.text === id) {
            return this as ISymbol;
        }
        
        const s = this.params.resolveSymbol(id, initialScope);

        return s === UnknownSymbol.Instance ? super.resolveSymbol(id, initialScope) : s;
    }
}