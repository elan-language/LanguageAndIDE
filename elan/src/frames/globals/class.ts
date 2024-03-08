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
import { OptionalKeyword } from "../fields/optionalKeyword";
import { AbstractFrameWithChildren } from "../abstract-frame-with-children";

export class Class extends AbstractFrameWithChildren implements Parent {
    public name: Type;
    public abstract: OptionalKeyword;
    public immutable: boolean;
    public inherits: OptionalKeyword;
    public superClasses: TypeList;
    private file: File;

    constructor(parent: File) {
        super(parent);
        this.file = parent;
        this.name = new Type(this);
        this.name.setPlaceholder("name");
        this.abstract = new OptionalKeyword(this, "abstract");
        this.inherits = new OptionalKeyword(this, "inherits");
        this.superClasses  = new TypeList(this);
        this.superClasses.setOptional(true);
        this.getChildren().push(new Constructor(this));
        this.getChildren().push(new MemberSelector(this));
        this.immutable = false;
    }
    
    fieldUpdated(field: Field): void {
        if (field === this.abstract) {
            if (this.abstract.isSpecified()) {
                if ('isConstructor' in this.getChildren()[0]) {
                    this.getChildren().splice(0,1);
                }
            } else if (!('isConstructor' in this.getChildren()[0])) {
                this.getChildren().splice(0,0,new Constructor(this));
            }
        } else if (field === this.inherits) {
            if (this.inherits.isSpecified()) {
                this.superClasses.setOptional(false);
            } else {
                this.superClasses.setText("");
                this.superClasses.setOptional(true);
            }
        }
    }

    minimumNumberOfChildrenExceeded(): boolean {
        return this.getChildren().length > 2; //Constructor +
    }

    isAbstract(): boolean {
        return this.abstract.isSpecified();
    }
    makeAbstract(): void {
        this.abstract.specify();
    }
    isImmutable(): boolean {
        return this.immutable;
    }
    makeImmutable(): void {
        this.immutable = true;
    }
    doesInherit(): boolean {
        return this.inherits.isSpecified();
    }
    makeInherits(): void {
        this.inherits.specify();
    }

    getFields(): Field[] {
        return [this.abstract, this.name, this.inherits, this.superClasses];
    } 

    getIdPrefix(): string {
        return 'class';
    }
    private modifiersAsHtml(): string {
        return `${this.abstract.renderAsHtml()} `;
    }
    private modifiersAsSource(): string {
        var result = "";
        if (this.isAbstract()) {
            result += `${this.abstract.renderAsSource()} `;
        }
        if (this.isImmutable()) {
            result += `immutable `;
        }
        return result;
    }
    private inhertanceAsHtml(): string {
        return ` ${this.inherits.renderAsHtml()} ${this.superClasses.renderAsHtml()}`;
    }
    private inhertanceAsSource(): string {
        return  this.doesInherit() ? ` ${this.inherits.renderAsSource()} ${this.superClasses.renderAsSource()}` : ``;
    }

    public renderAsHtml(): string {

        return `<classDef class="${this.cls()}" id='${this.htmlId}' tabindex="0">
<top><expand>+</expand>${this.modifiersAsHtml()}<keyword>class </keyword>${this.name.renderAsHtml()}${this.inhertanceAsHtml()}</top>
${this.renderChildrenAsHtml()}
<keyword>end class</keyword>
</classDef>`;
    }

    indent(): string {
        return "";
    }

    public renderAsSource(): string {
        return `${this.modifiersAsSource()}class ${this.name.renderAsSource()}${this.inhertanceAsSource()}\r
${this.renderChildrenAsSource()}\r
end class\r\n`;
    }


    public addMemberAndSelectFirstField(newM: Frame, existing: Frame, after: boolean = false) {
        var i = this.getChildren().indexOf(existing);
        if (after) {
            this.getChildren().splice(i+1,0, newM);
        } else {
            this.getChildren().splice(i,0, newM);
        }
        newM.selectFirstField();
    }


    public removeMember(m: Frame) {
        var i = this.getChildren().indexOf(m);
        this.getChildren().splice(i,1);    
    }

    addFunctionMethodBefore(member: Frame): Frame {
        var p = new FunctionMethod(this);
        this.addMemberAndSelectFirstField(p, member);
        return p;
    }
    addPropertyBefore(member: Frame): Frame {
        var p = new Property(this);
        this.addMemberAndSelectFirstField(p, member);
        return p;
    }
    addProcedureMethodBefore(member: Frame): Frame {
        var p = new ProcedureMethod(this);
        this.addMemberAndSelectFirstField(p, member);
        return p;
    }
    addAbstractFunctionBefore(member: Frame): Frame {
        var p = new AbstractFunction(this);
        this.addMemberAndSelectFirstField(p, member);
        return p;
    }
    addCommentBefore(member: Frame): Frame {
        var p = new CommentStatement(this);
        this.addMemberAndSelectFirstField(p, member);
        return p;
    }
    addAbstractPropertyBefore(member: Frame): Frame {
        var p = new AbstractProperty(this);
        this.addMemberAndSelectFirstField(p, member);
        return p;
    }
    addAbstractProcedureBefore(member: Frame): Frame {
        var p = new AbstractProcedure(this);
        this.addMemberAndSelectFirstField(p, member);
        return p;
    }

    private getConstructor(): Constructor {
        return this.getChildren().filter(m => ('isConstructor' in m))[0] as Constructor;
    }

    getStatus(): ParseStatus {
        var fieldStatus = this.worstStatusOfFields();
        var statementsStatus = this.getChildren().map(s => s.getStatus()).reduce((prev, cur) => cur < prev ? cur : prev, ParseStatus.valid);
        return fieldStatus < statementsStatus ? fieldStatus : statementsStatus;
    }
    
    parseTop(source: CodeSource): boolean {
        var abs = "abstract ";
        if (source.isMatch(abs)) {
            source.remove(abs);
            this.makeAbstract();
        }
        var imm = "immutable ";
        if (source.isMatch(imm)) {
            source.remove(imm);
            this.makeImmutable();
        }
        source.remove("class ");
        this.name.parseFrom(source);
        var inh = " inherits "; //Note leading & trailing space
        if (source.isMatch(inh)) {
            source.remove(inh);
            this.makeInherits();
            this.superClasses.parseFrom(source);
        }
        source.removeNewLine();
        if (!this.isAbstract()) {
            this.getConstructor().parseFrom(source);
        }
        return true;
    }

    parseBottom(source: CodeSource): boolean {
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
        var i = this.getChildren().indexOf(existing);
        if (after && existing.canInsertAfter()) {
                this.getChildren().splice(i+1,0, selector);
                selector.select(true, false);
        } else if (!after && existing.canInsertBefore()) {
                this.getChildren().splice(i,0, selector);
                selector.select(true, false);
        }
    }
    
    insertSelector(after: boolean): void {
        this.file.insertSelector(after, this);
    }


}