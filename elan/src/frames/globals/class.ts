import { AbstractFrame } from "../abstract-frame";
import { Type } from "../fields/type";
import { AsString } from "../class-members/as-string";
import { TypeList } from "../fields/type-list";
import { File } from "../interfaces/file";
import { FunctionMethod } from "../class-members/function-method";
import { Property } from "../class-members/property";
import { ProcedureMethod } from "../class-members/procedure-method";
import { Parent } from "../interfaces/parent";
import { Frame } from "../interfaces/frame";
import { Field } from "../interfaces/field";
import { MemberSelector } from "../class-members/member-selector";
import { Constructor } from "../class-members/constructor";

export class Class extends AbstractFrame implements Parent {
    isParent: boolean = true;
    isGlobal = true;
    public name: Type;
    private members: Array<Frame> = new Array<Frame>();
    public abstract: boolean = false;
    public immutable: boolean = false;
    public inherits: boolean = false;
    public superClasses: TypeList;

    constructor(parent: File) {
        super(parent);
        this.multiline = true;
        this.name = new Type(this);
        this.name.setLabel("class name");
        this.superClasses  = new TypeList(this);
        this.addMemberAtEnd(new Constructor(this));
        this.addMemberAtEnd(new MemberSelector(this));
        this.addMemberAtEnd(new AsString(this));
    }

    getFields(): Field[] {
        return this.inherits? [this.name, this.superClasses] : [this.name]; //TODO: Immutable, Abstract?
    }

    expandCollapse(): void {
        if (this.isCollapsed()) {
            this.expand();
        } else {
            this.collapse();
        }
    }
    getFirstChild(): Frame {
        return this.members[0]; //Should always be one - at minimum a SelectGlobal
    }

    getLastChild(): Frame {
        return this.members[this.members.length - 1];
    }

    getChildAfter(g: Frame): Frame {
        const index = this.members.indexOf(g);
        return index < this.members.length -1 ? this.members[index +1] : g;
    }

    getChildBefore(g: Frame): Frame {
        const index = this.members.indexOf(g);
        return index > 0 ? this.members[index -1] : g;
    }

    getChildRange(first: Frame, last: Frame): Frame[] {
        var fst = this.members.indexOf(first);
        var lst = this.members.indexOf(last);
        return fst < lst ? this.members.slice(fst, lst + 1) : this.members.slice(lst, fst + 1);
    }

    getIdPrefix(): string {
        return 'class';
    }

    get asString() {
        return this.members[this.members.length -1] as AsString;
    }

    public override selectFirstField(): boolean {
        this.name.select();
        return true;
    }

    selectFirstChild(multiSelect: boolean): boolean {
        if (this.members.length > 0){
            this.members[0].select(true, multiSelect);
            return true;
        }
        return false;
    }

    private modifiersAsHtml(): string {
        return `${this.abstract ? "<keyword>abstract </keyword>" : ""}${this.immutable ? "<keyword>immutable </keyword>" : ""}`;
    }
    private modifiersAsSource(): string {
        return `${this.abstract ? "abstract " : ""}${this.immutable ? "immutable " : ""}`;
    }
    private inhertanceAsHtml(): string {
        return `${this.inherits ? "<keyword> inherits </keyword>" + this.superClasses.renderAsHtml() : ""}`;
    }
    private inhertanceAsSource(): string {
        return `${this.inherits ? " inherits " + this.superClasses.renderAsSource() : ""}`;
    }

    public renderAsHtml(): string {
        const ss: Array<string> = [];
        for (var m of this.members) {
            ss.push(m.renderAsHtml());
        }
        const members = ss.join("\n");
        return `<classDef class="${this.cls()}" id='${this.htmlId}' tabindex="0">
<top><expand>+</expand>${this.modifiersAsHtml()}<keyword>class </keyword>${this.name.renderAsHtml()}${this.inhertanceAsHtml()}</top>
${members}
<keyword>end class</keyword>
</classDef>`;
    }

    indent(): string {
        return "";
    }

    public renderAsSource(): string {
        const ss: Array<string> = [];
        for (var m of this.members) {
            var s = m.renderAsSource();
            ss.push(s);
        }
        const members = ss.join("\r\n");
        return `${this.modifiersAsSource()}class ${this.name.renderAsSource()}${this.inhertanceAsSource()}\r
${members}\r
end class\r\n`;
    }

    private addMemberAtEnd(m: Frame) {
        this.members.push(m);
    }

    public addMemberBeforeAsString(m: Frame) {
        var i = this.members.length - 1;
        this.members.splice(i,0,m);
    }

    public addMemberBefore(m: Frame, before: Frame) {
        var i = this.   members.indexOf(before);
        this.members.splice(i,0,m);
    }

    public removeMember(m: Frame) {
        var i = this.members.indexOf(m);
        this.members.splice(i,1);    
    }

    addFunctionMethodBefore(member: Frame): void {
        var p = new FunctionMethod(this);
        this.addMemberBefore(p, member);
        p.select(true, false);
    }
    addPropertyBefore(member: Frame): void {
        var p = new Property(this);
        this.addMemberBefore(p, member);
        p.select(true, false);
    }
    addProcedureMethodBefore(member: Frame): void {
        var p = new ProcedureMethod(this);
        this.addMemberBefore(p, member);
        p.select(true, false);
    }
}