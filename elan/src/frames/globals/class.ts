import { InheritsFrom } from "../fields/inheritsFrom";
import { FunctionMethod } from "../class-members/function-method";
import { Property } from "../class-members/property";
import { ProcedureMethod } from "../class-members/procedure-method";
import { Frame } from "../interfaces/frame";
import { Field } from "../interfaces/field";
import { File } from "../interfaces/file";
import { MemberSelector } from "../class-members/member-selector";
import { Constructor } from "../class-members/constructor";
import { CodeSource } from "../code-source";
import { AbstractFunction as AbstractFunction } from "../class-members/abstract-function";
import { AbstractProperty } from "../class-members/abstract-property";
import { AbstractProcedure as AbstractProcedure } from "../class-members/abstract-procedure";
import { CommentStatement } from "../statements/comment-statement";
import { OptionalKeyword } from "../fields/optionalKeyword";
import { AbstractSelector } from "../abstract-selector";
import { parentHelper_addChildAfter, parentHelper_addChildBefore, parentHelper_getChildAfter, parentHelper_getChildBefore, parentHelper_getChildRange, parentHelper_getFirstChild, parentHelper_getFirstSelectorAsDirectChild, parentHelper_getLastChild, parentHelper_insertChildSelector, parentHelper_moveSelectedChildrenDownOne, parentHelper_moveSelectedChildrenUpOne, parentHelper_removeChild, parentHelper_renderChildrenAsHtml, parentHelper_renderChildrenAsObjectCode, parentHelper_renderChildrenAsSource, parentHelper_selectLastField } from "../parent-helpers";
import { AbstractFrame } from "../abstract-frame";
import { Parent } from "../interfaces/parent";
import { StatementFactory } from "../interfaces/statement-factory";
import { Regexes } from "../fields/regexes";
import { Collapsible } from "../interfaces/collapsible";
import { Profile } from "../interfaces/profile";
import { TypeNameField } from "../fields/type-name-field";
import { ISymbol } from "../../symbols/symbol";
import { isSymbol } from "../../symbols/symbolHelpers";

export class Class extends AbstractFrame implements Parent, Collapsible {
    isCollapsible: boolean = true;
    isParent: boolean = true; 
    public name: TypeNameField;
    public abstract: OptionalKeyword;
    public immutable: boolean;
    public inherits: OptionalKeyword;
    public superClasses: InheritsFrom;
    private _children: Array<Frame> = new Array<Frame>();

    constructor(parent: File) {
        super(parent);
        this.name = new TypeNameField(this);
        this.abstract = new OptionalKeyword(this, "abstract");
        this.inherits = new OptionalKeyword(this, "inherits");
        this.superClasses  = new InheritsFrom(this);
        this.superClasses.setOptional(true);
        this.getChildren().push(new Constructor(this));
        this.getChildren().push(new MemberSelector(this));
        this.immutable = false;
    }
    getProfile(): Profile {
        return this.getParent().getProfile();
    }
    protected setClasses() {
        super.setClasses();
        this.pushClass(true,"multiline");
    };
    getFactory(): StatementFactory {
        return this.getParent().getFactory();
    }
    getChildren(): Frame[] {
        return this._children;
    }

    getFirstChild(): Frame {return parentHelper_getFirstChild(this); }
    getLastChild(): Frame {return parentHelper_getLastChild(this); }
    getChildAfter(child: Frame): Frame {return parentHelper_getChildAfter(this, child);}
    getChildBefore(child: Frame): Frame {return parentHelper_getChildBefore(this, child);}
    getChildRange(first: Frame, last: Frame): Frame[] {return parentHelper_getChildRange(this, first, last); }
    getFirstSelectorAsDirectChild() : AbstractSelector {return parentHelper_getFirstSelectorAsDirectChild(this);}
    addChildBefore(child: Frame, before: Frame): void {parentHelper_addChildBefore(this, child, before);}
    addChildAfter(child: Frame, before: Frame): void {parentHelper_addChildAfter(this, child, before);}
    removeChild(child: Frame): void { parentHelper_removeChild(this, child);};
    insertChildSelector(after: boolean, child: Frame) {parentHelper_insertChildSelector(this, after,child);}
    moveSelectedChildrenUpOne(): void {parentHelper_moveSelectedChildrenUpOne(this);}
    moveSelectedChildrenDownOne(): void {parentHelper_moveSelectedChildrenDownOne(this);}
    selectLastField(): boolean {return parentHelper_selectLastField(this);} 
    
    fieldUpdated(field: Field): void {
        if (field === this.abstract) {
            if (this.abstract.keywordExists()) {
                if ('isConstructor' in this.getChildren()[0]) {
                    this.getChildren().splice(0,1);
                }
            } else if (!('isConstructor' in this.getChildren()[0])) {
                this.getChildren().splice(0,0,new Constructor(this));
            }
        } else if (field === this.inherits) {
            if (this.inherits.keywordExists()) {
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
        return this.abstract.keywordExists();
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
        return this.inherits.keywordExists();
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

    private inheritanceAsObjectCode(): string {
        return ``;
    }

    public renderAsHtml(): string {

        return `<classDef class="${this.cls()}" id='${this.htmlId}' tabindex="0">
<top><expand>+</expand>${this.modifiersAsHtml()}<keyword>class </keyword>${this.name.renderAsHtml()}${this.inhertanceAsHtml()}</top>
${parentHelper_renderChildrenAsHtml(this)}
<keyword>end class</keyword>
</classDef>`;
    }

    indent(): string {
        return "";
    }

    public renderAsSource(): string {
        return `${this.modifiersAsSource()}class ${this.name.renderAsSource()}${this.inhertanceAsSource()}\r
${parentHelper_renderChildrenAsSource(this)}\r
end class\r\n`;
    }

    private propertiesToInit() {
        const pp = this.getChildren().filter(c => c instanceof Property ) as Property[];
        const ps = pp.map(p => p.initCode()).join(", ");
        return `[${ps}]`;
    }


    public renderAsObjectCode(): string {
        // don't generate code for abstract classes 
        if (this.isAbstract()){
            return "";
        }

        return `class ${this.name.renderAsObjectCode()}${this.inheritanceAsObjectCode()} {\r
  static defaultInstance() { return system.defaultClass(${this.name.renderAsObjectCode()}, ${this.propertiesToInit()});};\r
${parentHelper_renderChildrenAsObjectCode(this)}\r
}\r\n`;
    }


    createFunction(): Frame {return new FunctionMethod(this);}
    createProperty(): Frame {return new Property(this);}
    createProcedure(): Frame {return new ProcedureMethod(this);}
    createAbstractFunction(): Frame {return new AbstractFunction(this);}
    createComment(): Frame {return new CommentStatement(this);}
    createAbstractProperty(): Frame {return new AbstractProperty(this);}
    createAbstractProcedure(): Frame {return new AbstractProcedure(this);}

    private getConstructor(): Constructor {
        return this.getChildren().filter(m => ('isConstructor' in m))[0] as Constructor;
    }
    parseFrom(source: CodeSource): void {
        this.parseTop(source);
        while (!this.parseBottom(source)) {
            if (source.isMatchRegEx(Regexes.newLine)) {
                source.removeRegEx(Regexes.newLine, false);
                source.removeIndent();
            } else {
                this.getFirstSelectorAsDirectChild().parseFrom(source);
            }
        } 
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
    newChildSelector(): AbstractSelector {
        return new MemberSelector(this);
    }

    resolveSymbol(id: string, initialScope: Frame): ISymbol {

        for (var f of this.getChildren()) {
            if (isSymbol(f) && f.symbolId === id) {
                return f;
            }
        }

        return this.getParent().resolveSymbol(id, this);
    }
}