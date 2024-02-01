import { CodeFrame } from "../code-frame";
import { Global } from "./global";
import { Type } from "../text-fields/type";
import { Constructor } from "../class-members/constructor";
import { Member } from "../class-members/member";
import { AsString } from "../class-members/as-string";
import { SelectMember } from "../class-members/select-member";
import { Frame } from "../frame";
import { Parent } from "../parent";
import { isMember, safeSelectAfter, safeSelectBefore, selectChildRange } from "../helpers";
import { TypeList } from "../text-fields/type-list";
import { runInThisContext } from "vm";


export class Class extends CodeFrame implements Global, Parent {
    isGlobal = true;
    public name: Type;
    private members: Array<Member> = new Array<Member>();
    public abstract: boolean = false;
    public immutable: boolean = false;
    public inherits: boolean = false;
    public superClasses: TypeList;

    constructor(parent: Parent) {
        super(parent);
        this.multiline = true;
        this.name = new Type(this);
        this.name.setPrompt("class name");
        this.superClasses  = new TypeList(this);
        this.addMemberAtEnd(new Constructor(this));
        this.addMemberAtEnd(new SelectMember(this));
        this.addMemberAtEnd(new AsString(this));
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

    selectChildAfter(child: Frame, multiSelect: boolean): void {
        if (isMember(child)) {
            const index = this.members.indexOf(child);
            safeSelectAfter(this.members, index, multiSelect);
        }
    }
    selectChildBefore(child: Frame, multiSelect: boolean): void {
        if (isMember(child)) {
            const index = this.members.indexOf(child);
            safeSelectBefore(this.members, index, multiSelect);
        }
    }

    selectChildRange(multiSelect: boolean): void {
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
}