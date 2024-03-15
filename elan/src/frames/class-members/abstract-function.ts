import { AbstractFrame } from "../abstract-frame";
import { CodeSource } from "../code-source";
import { FuncNameDef } from "../fields/func-name-def";
import { ParamList } from "../fields/param-list";
import { TypeUse } from "../fields/type-use";
import { Class } from "../globals/class";
import { singleIndent } from "../helpers";
import { Field } from "../interfaces/field";
import { Member } from "../interfaces/member";
import { Parent } from "../interfaces/parent";

export class AbstractFunction extends AbstractFrame implements Member {
    isAbstract = true;
    isMember: boolean = true;
    public name : FuncNameDef;
    public params: ParamList;
    public returnType: TypeUse;
    private class: Class;

    constructor(parent: Parent) {
        super(parent);
        this.class = parent as Class;
        this.multiline = true;
        this.name = new FuncNameDef(this);
        this.params = new ParamList(this);
        this.returnType = new TypeUse(this);
        this.returnType.setPlaceholder("return type");
    }

    getFields(): Field[] {
        return [this.name, this.params, this.returnType];
    }

    getIdPrefix(): string {
        return 'func';
    }

    public override indent(): string {
        return singleIndent();
    }

    renderAsHtml(): string {
        return `<function class="${this.cls()}" id='${this.htmlId}' tabindex="0">
<keyword>abstract function </keyword>${this.name.renderAsHtml()}(${this.params.renderAsHtml()}) as ${this.returnType.renderAsHtml()}</function>
`;
    }

    public override renderAsSource() : string {
        return `${this.indent()}abstract function ${this.name.renderAsSource()}(${this.params.renderAsSource()}) as ${this.returnType.renderAsSource()}\r
`;
    }

    parseFrom(source: CodeSource): void {
        source.remove("abstract function ");
        this.name.parseFrom(source);
        source.remove("(");
        this.params.parseFrom(source);
        source.remove(") as ");
        this.returnType.parseFrom(source);
    }
    insertSelector(after: boolean): void {
        this.class.insertMemberSelector(after, this);
    }
}