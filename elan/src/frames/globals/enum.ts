import { EnumValues } from "../fields/enum-values";
import { AbstractFrame } from "../abstract-frame";
import { File } from "../interfaces/file";
import { singleIndent } from "../helpers";
import { Field } from "../interfaces/field";
import { CodeSource } from "../code-source";
import { TypeNameField } from "../fields/type-name-field";
import { enumKeyword } from "../keywords";
import { Frame } from "../interfaces/frame";
import { ISymbol, SymbolScope } from "../../symbols/symbol";
import { EnumValueType } from "../../symbols/enum-value-type";
import { GlobalFrame } from "../interfaces/global-frame";
import { Transforms } from "../syntax-nodes/transforms";

export class Enum extends AbstractFrame implements GlobalFrame {
    isGlobal = true;
    name: TypeNameField;
    values: EnumValues;
    file: File;

    constructor(parent: File) {
        super(parent);
        this.file = parent;
        this.name = new TypeNameField(this);
        this.name.setPlaceholder("Name");
        this.values = new EnumValues(this);
    }
    initialKeywords(): string {
        return enumKeyword;
    }
    getFields(): Field[] {
        return [this.name, this.values];
    }
    getIdPrefix(): string {
        return 'enum';
    }
    renderAsHtml(): string {
        return `<enum class="${this.cls()}" id='${this.htmlId}' tabindex="0">
<top><expand>+</expand><keyword>enum </keyword>${this.name.renderAsHtml()}</top>${this.compileMsgAsHtml()}
<statement>${this.values.renderAsHtml()}</statement>       
<keyword>end enum</keyword>
</enum>`;
    }
    indent(): string {
        return "";
    }
    renderAsSource(): string {
        return `enum ${this.name.renderAsSource()}\r
${singleIndent()}${this.values.renderAsSource()}\r
end enum\r
`;
    }

    compile(transforms: Transforms): string {
        this.compileErrors = [];
        return `var ${this.name.renderAsSource()} = {\r
${singleIndent()}${this.values.compile(transforms)}\r
};\r
`;
    }

    parseFrom(source: CodeSource): void {
        source.remove("enum ");
        this.name.parseFrom(source);
        source.removeNewLine();
        source.removeIndent();
        this.values.parseFrom(source);
        source.removeNewLine();
        source.remove("end enum");
    }

    resolveSymbol(id: string, transforms : Transforms, initialScope: Frame): ISymbol {
        const names = this.values.renderAsSource().split(",").map(s => s.trim());

        for (var n of names) {
            if (n === id) {
                return {
                    symbolId : id,
                    symbolType: () => new EnumValueType(this.name.renderAsSource(), id),
                    symbolScope: SymbolScope.program
                };
            }
        }

        return this.getParent().resolveSymbol(id, transforms, this);
    }
} 
