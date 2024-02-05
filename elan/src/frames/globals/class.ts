import { AbstractFrame } from "../abstract-frame";
import { Global } from "../interfaces/global";
import { Type } from "../fields/type";
import { Constructor } from "../class-members/constructor";
import { Member } from "../interfaces/member";
import { AsString } from "../class-members/as-string";
import { Selectable } from "../interfaces/selectable";
import { isMember, safeSelectAfter, safeSelectBefore, selectChildRange } from "../helpers";
import { TypeList } from "../fields/type-list";
import { SelectMember } from "../fields/select-member";
import { File } from "../interfaces/file";
import { FunctionMethod } from "../class-members/function-method";
import { Property } from "../class-members/property";
import { ProcedureMethod } from "../class-members/procedure-method";
import { ParentFrame } from "../interfaces/parent-frame";
import { Frame } from "../interfaces/frame";
import { StatementFactory } from "../interfaces/statement-factory";
import { Field } from "../interfaces/field";

export class Class extends AbstractFrame implements Global, ParentFrame {
    isParent: boolean = true;
    isGlobal = true;
    public name: Type;
    private members: Array<Member> = new Array<Member>();
    public abstract: boolean = false;
    public immutable: boolean = false;
    public inherits: boolean = false;
    public superClasses: TypeList;

    constructor(parent: File) {
        super(parent);
        this.multiline = true;
        this.name = new Type(this);
        this.name.setPrompt("class name");
        this.superClasses  = new TypeList(this);
        this.addMemberAtEnd(new Constructor(this));
        this.addMemberAtEnd(new SelectMember(this));
        this.addMemberAtEnd(new AsString(this));
    }

    getFields(): Field[] {
        return this.inherits? [this.name, this.superClasses] : [this.name]; //TODO: Immutable, Abstract?
    }

    getFirstChild(): Frame {
        throw new Error("Method not implemented.");
    }
    getLastChild(): Frame {
        throw new Error("Method not implemented.");
    }
    getChildAfter(): Frame;
    getChildAfter(): Frame;
    getChildAfter(): import("../interfaces/frame").Frame {
        throw new Error("Method not implemented.");
    }
    getChildBefore(): Frame {
        throw new Error("Method not implemented.");
    }
    getChildrenBetween(first: Frame, last: Frame): Frame[] {
        throw new Error("Method not implemented.");
    }
    getStatementFactory(): StatementFactory {
        throw new Error("Method not implemented.");
    }

    getPrefix(): string {
        return 'class';
    }

    private get constr() {
        return this.members[0] as Constructor;
    }

    get asString() {
        return this.members[this.members.length -1] as AsString;
    }

    private rangeSelecting = false;
    isRangeSelecting(): boolean {
        return this.rangeSelecting;
    }

    public override selectFirstText(): boolean {
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

    selectLastChild(multiSelect: boolean): void {
        this.members[this.members.length - 1].select(true, multiSelect);
    }

    selectChildAfter(child: Selectable, multiSelect: boolean): void {
        if (isMember(child)) {
            const index = this.members.indexOf(child);
            safeSelectAfter(this.members, index, multiSelect);
        }
    }
    selectChildBefore(child: Selectable, multiSelect: boolean): void {
        if (isMember(child)) {
            const index = this.members.indexOf(child);
            safeSelectBefore(this.members, index, multiSelect);
        }
    }

    selectRange(multiSelect: boolean): void {
        this.rangeSelecting = true;
        selectChildRange(this.members, multiSelect);
        this.rangeSelecting = false;
    }

    private modifiersAsHtml(): string {
        return `${this.abstract ? "<keyword>abstract </keyword>" : ""}${this.immutable ? "<keyword>immutable </keyword>" : ""}`;
    }
    private modifiersAsSource(): string {
        return `${this.abstract ? "abstract " : ""}${this.immutable ? "immutable " : ""}`;
    }
    private inhertanceAsHtml(): string {
        return `${this.inherits ? " inherits " + this.superClasses.renderAsHtml() : ""}`;
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

    private addMemberAtEnd(m: Member) {
        this.members.push(m);
    }

    public addMemberBeforeAsString(m: Member) {
        var i = this.members.length - 1;
        this.members.splice(i,0,m);
    }

    public addMemberBefore(m: Member, before: Member) {
        var i = this.   members.indexOf(before);
        this.members.splice(i,0,m);
    }

    public addMemberAfter(m: Member, after: Member) {
        var i = this.members.indexOf(after) + 1;
        this.members.splice(i,0,m);      
    }

    public removeMember(m: Member) {
        var i = this.members.indexOf(m);
        this.members.splice(i,1);    
    }

    addFunctionMethodBefore(member: Member): void {
        var p = new FunctionMethod(this);
        this.addMemberBefore(p, member);
        p.select(true, false);
    }
    addPropertyBefore(member: Member): void {
        var p = new Property(this);
        this.addMemberBefore(p, member);
        p.select(true, false);
    }
    addProcedureMethodBefore(member: Member): void {
        var p = new ProcedureMethod(this);
        this.addMemberBefore(p, member);
        p.select(true, false);
    }
}