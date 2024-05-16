import { ProcedureType } from "../symbols/procedure-type";
import { ISymbol } from "../interfaces/symbol";
import { UnknownSymbol } from "../symbols/unknown-symbol";
import { CodeSource } from "../code-source";
import { IdentifierField } from "../fields/identifier-field";
import { ParamList } from "../fields/param-list";
import { FrameWithStatements } from "../frame-with-statements";
import { Field } from "../interfaces/field";
import { File } from "../interfaces/file";
import { Frame } from "../interfaces/frame";
import { Parent } from "../interfaces/parent";
import { Scope } from "../interfaces/scope";
import { procedureKeyword } from "../keywords";
import { Transforms } from "../syntax-nodes/transforms";

export abstract class ProcedureFrame extends FrameWithStatements implements ISymbol, Scope {
    public name: IdentifierField;
    public params: ParamList;
    file: File;

    constructor(parent: Parent) {
        super(parent);
        this.file = parent as File;
        this.name = new IdentifierField(this);
        this.params = new ParamList(this);
    }
    initialKeywords(): string {
        return procedureKeyword;
    }
    get symbolId() {
        return this.name.text;
    }

    symbolType(transforms : Transforms) {
        const pt = this.params.symbolTypes(transforms);
        return new ProcedureType(pt);
    }

    getFields(): Field[] {
        return [this.name, this.params];
    }

    getIdPrefix(): string {
        return 'proc';
    }
    public renderAsHtml(): string {
        return `<procedure class="${this.cls()}" id='${this.htmlId}' tabindex="0">
<top><expand>+</expand><keyword>procedure </keyword><method>${this.name.renderAsHtml()}</method>(${this.params.renderAsHtml()})</top>${this.compileMsgAsHtml()}
${this.renderChildrenAsHtml()}
<keyword>end procedure</keyword>
</procedure>`;
    }

    parseTop(source: CodeSource): void {
        source.remove("procedure ");
        this.name.parseFrom(source);
        source.remove("(");
        this.params.parseFrom(source);
        source.remove(")");
    }
    parseBottom(source: CodeSource): boolean {
        return this.parseStandardEnding(source, "end procedure");
    }

    resolveSymbol(id: string | undefined, transforms: Transforms,
         initialScope: Frame): ISymbol {
        if (this.name.text === id) {
            return this as ISymbol;
        }
        const s = this.params.resolveSymbol(id, transforms, initialScope);

        return s === UnknownSymbol.Instance ? super.resolveSymbol(id, transforms, initialScope) : s;
    }
}