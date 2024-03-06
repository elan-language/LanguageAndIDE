import { AbstractFrame } from "../abstract-frame";
import { Type } from "../fields/type";
import { TypeList } from "../fields/type-list";
import { FunctionMethod } from "../class-members/function-method";
import { Property } from "../class-members/property";
import { ProcedureMethod } from "../class-members/procedure-method";
import { Parent } from "../interfaces/parent";
import { Frame } from "../interfaces/frame";
import { Field } from "../interfaces/field";
import { File } from "../interfaces/file";
import { MemberSelector } from "../class-members/member-selector";
import { Constructor } from "../class-members/constructor";
import { CodeSource } from "../code-source";
import { Regexes } from "../fields/regexes";
import { ParseStatus } from "../parse-status";
import { AbstractFunction as AbstractFunction } from "../class-members/abstract-function";
import { AbstractProperty } from "../class-members/abstract-property";
import { AbstractProcedure as AbstractProcedure } from "../class-members/abstract-procedure";
import { CommentStatement } from "../statements/comment-statement";

export class Class extends AbstractFrame implements Parent {

    isParent: boolean = true;
    isGlobal = true;
    public name: Type;
    private _members: Array<Frame> = new Array<Frame>();
    private abstract: boolean = false;
    public immutable: boolean = false;
    public inherits: boolean = false;
    public superClasses: TypeList;
    private file: File;

    constructor(parent: File) {
        super(parent);
        this.file = parent;
        this.multiline = true;
        this.name = new Type(this);
        this.name.setPlaceholder("class name");
        this.superClasses  = new TypeList(this);
        this._members.push(new Constructor(this));
        this._members.push(new MemberSelector(this));
    }

    minimumNumberOfChildrenExceeded(): boolean {
        return this._members.length > 2; //Constructor +
    }
    removeChild(child: Frame): void {
        var i = this._members.indexOf(child);
        this._members.splice(i,1);
    }
    isAbstract(): boolean {
        return this.abstract;
    }

    makeAbstract(): void {
        this.abstract = true;
        this._members.splice(0,1);//Remove constructor
    }

    public getFirstMemberSelector() : MemberSelector {
        return this._members.filter(g => ('isSelector' in g))[0] as MemberSelector;
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
        return this._members[0]; //Should always be one - at minimum a SelectGlobal
    }

    getLastChild(): Frame {
        return this._members[this._members.length - 1];
    }

    getChildAfter(g: Frame): Frame {
        const index = this._members.indexOf(g);
        return index < this._members.length -1 ? this._members[index +1] : g;
    }

    getChildBefore(g: Frame): Frame {
        const index = this._members.indexOf(g);
        return index > 0 ? this._members[index -1] : g;
    }

    getChildRange(first: Frame, last: Frame): Frame[] {
        var fst = this._members.indexOf(first);
        var lst = this._members.indexOf(last);
        return fst < lst ? this._members.slice(fst, lst + 1) : this._members.slice(lst, fst + 1);
    }

    getIdPrefix(): string {
        return 'class';
    }
    selectFirstChild(multiSelect: boolean): boolean {
        if (this._members.length > 0){
            this._members[0].select(true, multiSelect);
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
        for (var m of this._members) {
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
        return `${this.modifiersAsSource()}class ${this.name.renderAsSource()}${this.inhertanceAsSource()}\r
${this.membersAsSource()}\r
end class\r\n`;
    }

    private membersAsSource(): string {
        var result = "";
        if (this._members.length > 0) {
        const ss: Array<string> = [];
        for (var m of this._members.filter(m  => !('isSelector' in m))) {
            var s = m.renderAsSource();
            ss.push(s);
        }
        result = ss.join("\r\n");
        }
        return result;
    }

    public addMemberAndSelectFirstField(newM: Frame, existing: Frame, after: boolean = false) {
        var i = this.   _members.indexOf(existing);
        if (after) {
            this._members.splice(i+1,0, newM);
        } else {
            this._members.splice(i,0, newM);
        }
        newM.selectFirstField();
    }


    public removeMember(m: Frame) {
        var i = this._members.indexOf(m);
        this._members.splice(i,1);    
    }

    addFunctionMethodBefore(member: Frame): Frame {
        var p = new FunctionMethod(this);
        this.addMemberAndSelectFirstField(p, member);
        p.select(true, false);
        return p;
    }
    addPropertyBefore(member: Frame): Frame {
        var p = new Property(this);
        this.addMemberAndSelectFirstField(p, member);
        p.select(true, false);
        return p;
    }
    addProcedureMethodBefore(member: Frame): Frame {
        var p = new ProcedureMethod(this);
        this.addMemberAndSelectFirstField(p, member);
        p.select(true, false);
        return p;
    }
    addAbstractFunctionBefore(member: Frame): Frame {
        var p = new AbstractFunction(this);
        this.addMemberAndSelectFirstField(p, member);
        p.select(true, false);
        return p;
    }
    addCommentBefore(member: Frame): Frame {
        var p = new CommentStatement(this);
        this.addMemberAndSelectFirstField(p, member);
        p.select(true, false);
        return p;
    }
    addAbstractPropertyBefore(member: Frame): Frame {
        var p = new AbstractProperty(this);
        this.addMemberAndSelectFirstField(p, member);
        p.select(true, false);
        return p;
    }
    addAbstractProcedureBefore(member: Frame): Frame {
        var p = new AbstractProcedure(this);
        this.addMemberAndSelectFirstField(p, member);
        p.select(true, false);
        return p;
    }


    private getConstructor(): Constructor {
        return this._members.filter(m => ('isConstructor' in m))[0] as Constructor;
    }

    getStatus(): ParseStatus {
        var fieldStatus = this.worstStatusOfFields();
        var statementsStatus = this._members.map(s => s.getStatus()).reduce((prev, cur) => cur < prev ? cur : prev, ParseStatus.valid);
        return fieldStatus < statementsStatus ? fieldStatus : statementsStatus;
    }
    
    parseFrom(source: CodeSource): void {
        var abs = "abstract ";
        if (source.isMatch(abs)) {
            source.remove(abs);
            this.abstract = true;
        }
        var imm = "immutable ";
        if (source.isMatch(imm)) {
            source.remove(imm);
            this.immutable = true;
        }
        source.remove("class ");
        this.name.parseFrom(source);
        var inh = " inherits "; //Note leading & trailing space
        if (source.isMatch(inh)) {
            source.remove(inh);
            this.inherits = true;
            this.superClasses.parseFrom(source);
        }
        source.removeNewLine();
        if (!this.abstract) {
            this.getConstructor().parseFrom(source);
        }
        while (!this.parseEndOfClass(source)) {
            if (source.isMatchRegEx(Regexes.startsWithNewLine)) {
                source.removeRegEx(Regexes.startsWithNewLine, false);}
            else {
                this.getFirstMemberSelector().parseFrom(source);
            }
        } 
    }

    private parseEndOfClass(source: CodeSource): boolean {
        var result = false;
        source.removeIndent();
        var keyword = "end class";
        if (source.isMatch(keyword)) {
            source.remove(keyword);
            result = true;
        }
        return result;
    }
    insertMemberSelector(after: boolean, existing: Frame): void {
        var selector =  new MemberSelector(this);
        var i = this._members.indexOf(existing);
        if (after && existing.canInsertAfter()) {
                this._members.splice(i+1,0, selector);
                selector.select(true, false);
        } else if (!after && existing.canInsertBefore()) {
                this._members.splice(i,0, selector);
                selector.select(true, false);
        }
    }
    
    insertSelector(after: boolean): void {
        this.file.insertGlobalSelector(after, this);
    }

    private moveDownOne(child: Frame): boolean {
        var result = false;
        var i = this._members.indexOf(child);
        if ((i < this._members.length - 1) && (this._members[i+1].canInsertAfter())) {
            this._members.splice(i,1);
            this._members.splice(i+1,0,child); 
            result = true;
        } 
        return result;
    }

    private moveUpOne(child: Frame): boolean {
        var result = false;
        var i = this._members.indexOf(child);
        if ((i > 0) && (this._members[i-1].canInsertBefore())) {
            this._members.splice(i,1);
            this._members.splice(i-1,0,child); 
            result = true;
        }
        return result;
    }
    moveSelectedChildrenUpOne(): void {
        var toMove = this._members.filter(g => g.isSelected()); 
        var cont = true;
        var i = 0;
        while (cont && i < toMove.length) {
            cont = this.moveUpOne(toMove[i]);
            i++;
        }
    }
    moveSelectedChildrenDownOne(): void {
        var toMove = this._members.filter(g => g.isSelected()); 
        var cont = true;
        var i = toMove.length - 1;
        while (cont && i >= 0) {
            cont = this.moveDownOne(toMove[i]);
            i--;
        }
    }
    selectLastField(): boolean {
        var n = this._members.length;
        return this._members[n-1].selectLastField();
    } 
}