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
import { parentHelper_addChildAfter, parentHelper_addChildBefore, parentHelper_aggregateCompileErrorsOfChildren, parentHelper_getChildAfter, parentHelper_getChildBefore, parentHelper_getChildRange, parentHelper_getFirstChild, parentHelper_getFirstSelectorAsDirectChild, parentHelper_getLastChild, parentHelper_insertOrGotoChildSelector, parentHelper_moveSelectedChildrenDownOne, parentHelper_moveSelectedChildrenUpOne, parentHelper_removeChild, parentHelper_renderChildrenAsHtml, parentHelper_compileChildren, parentHelper_renderChildrenAsSource, parentHelper_selectLastField, parentHelper_worstCompileStatusOfChildren, parentHelper_worstParseStatusOfChildren } from "../parent-helpers";
import { AbstractFrame } from "../abstract-frame";
import { Parent } from "../interfaces/parent";
import { StatementFactory } from "../interfaces/statement-factory";
import { Regexes } from "../fields/regexes";
import { Collapsible } from "../interfaces/collapsible";
import { Profile } from "../interfaces/profile";
import { TypeNameField } from "../fields/type-name-field";
import { ISymbol, SymbolScope } from "../../symbols/symbol";
import { isSymbol } from "../../symbols/symbolHelpers";
import { Scope } from "../interfaces/scope";
import { abstractKeyword, classKeyword, immutableKeyword, inheritsKeyword, thisKeyword } from "../keywords";
import { mustBeAbstractClass, mustImplementSuperClasses } from "../compile-rules";
import { ClassDefinitionType } from "../../symbols/class-definition-type";
import { CompileStatus, ParseStatus } from "../status-enums";
import { CompileError } from "../compile-error";
import { Transforms } from "../syntax-nodes/transforms";
import { AstCollectionNode } from "../interfaces/ast-collection-node";
import { AstIdNode } from "../interfaces/ast-id-node";

export class Class extends AbstractFrame implements Parent, Collapsible, ISymbol, Scope {
    isCollapsible: boolean = true;
    isParent: boolean = true; 
    public name: TypeNameField;
    public abstract: OptionalKeyword;
    public immutable: OptionalKeyword;
    public inherits: OptionalKeyword;
    public superClasses: InheritsFrom;
    private _children: Array<Frame> = new Array<Frame>();

    constructor(parent: File) {
        super(parent);
        this.name = new TypeNameField(this);
        this.abstract = new OptionalKeyword(this, abstractKeyword);
        this.immutable = new OptionalKeyword(this, immutableKeyword);
        this.inherits = new OptionalKeyword(this, inheritsKeyword);
        this.superClasses  = new InheritsFrom(this);
        this.superClasses.setOptional(true);
        this.getChildren().push(new Constructor(this));
        this.getChildren().push(new MemberSelector(this));
    }
    getFile(): File {
        return this.getParent() as File;
    }

    initialKeywords(): string {
        return classKeyword;
    }
    private hasAddedMembers(): boolean {
        return this.getChildren().filter(m => !('isConstructor' in m || 'isSelector' in m )).length > 0;
    }
    get symbolId() { 
        return this.name.text; 
    }
    symbolType(transforms : Transforms) {
        return new ClassDefinitionType(this.symbolId, this.isAbstract(), this);
    }
    symbolScope = SymbolScope.program;
    getProfile(): Profile {
        return this.getFile().getProfile();
    }
    protected setClasses() {
        super.setClasses();
        this.pushClass(true,"multiline");
    };
    getParseStatus(): ParseStatus {
        return Math.min(this.worstParseStatusOfFields(), parentHelper_worstParseStatusOfChildren(this));
    }
    getCompileStatus() : CompileStatus {
        return Math.min(super.getCompileStatus(), parentHelper_worstCompileStatusOfChildren(this));
    }
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
    insertOrGotoChildSelector(after: boolean, child: Frame) {parentHelper_insertOrGotoChildSelector(this, after,child);}
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
        return this.immutable.keywordExists();
    }
    makeImmutable(): void {
        this.immutable.specify();
    }
    doesInherit(): boolean {
        return this.inherits.keywordExists();
    }
    makeInherits(): void {
        this.inherits.specify();
    }

    getFields(): Field[] {
        return this.hasAddedMembers() ? 
            [this.name, this.inherits, this.superClasses]
            : [this.abstract, this.immutable, this.name, this.inherits, this.superClasses];
    }

    getIdPrefix(): string {
        return 'class';
    }
    private modifiersAsHtml(): string {
        var result = "";
        if (this.hasAddedMembers()) {
            result += this.isAbstract() ? `<keyword>abstract </keyword>` : ``;
            result += this.isImmutable() ? `<keyword>immutable </keyword>` : ``;
        } else {
            result +=`${this.abstract.renderAsHtml()} ${this.immutable.renderAsHtml()} `;
        } 
        return result;
    }
    private modifiersAsSource(): string {
        var result = "";
        if (this.isAbstract()) {
            result += `abstract `;
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
<top><expand>+</expand>${this.modifiersAsHtml()}<keyword>class </keyword>${this.name.renderAsHtml()}${this.inhertanceAsHtml()}</top>${this.compileMsgAsHtml()}
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
        const pp = this.getChildren().filter(c => c instanceof Property || c instanceof AbstractProperty) as (AbstractProperty | Property)[];
        const ps = pp.map(p => p.initCode()).join(", ");
        return `[${ps}]`;
    }


    public compile(transforms : Transforms): string {
        this.compileErrors = [];

        if (this.doesInherit()) {
            const superClasses = this.superClasses.getOrTransformAstNode(transforms) as AstCollectionNode;
            const nodes = superClasses.items as AstIdNode[];
            const superClassSymbolTypes = nodes.map(n => this.resolveSymbol(n.id, transforms, this)).map(c => c.symbolType(transforms) as ClassDefinitionType);

            for (const st of superClassSymbolTypes) {
                mustBeAbstractClass(st, this.compileErrors, this.htmlId);
            }

            mustImplementSuperClasses(transforms, this.symbolType(transforms), superClassSymbolTypes, this.compileErrors, this.htmlId);
        }

    
        const name = this.name.compile(transforms);
        const asString = this.isAbstract() ? `
  asString() {
    return "empty Abstract Class ${name}";
  }` : "";

        return `class ${name}${this.inheritanceAsObjectCode()} {\r
  static defaultInstance() { return system.defaultClass(${name}, ${this.propertiesToInit()});};\r
${parentHelper_compileChildren(this, transforms)}\r${asString}\r
}\r\n`;
    }


    createFunction(): Frame {return new FunctionMethod(this);}
    createProperty(): Frame {return new Property(this);}
    createProcedure(): Frame {return new ProcedureMethod(this);}
    createAbstractFunction(): Frame {return new AbstractFunction(this);}
    createComment(): Frame {return new CommentStatement(this);}
    createAbstractProperty(): Frame {return new AbstractProperty(this);}
    createAbstractProcedure(): Frame {return new AbstractProcedure(this);}

    public getConstructor(): Constructor {
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

    resolveSymbol(id: string, transforms : Transforms, initialScope: Frame): ISymbol {
        if (id === thisKeyword){
            return this;
        }

        for (var f of this.getChildren()) {
            if (isSymbol(f) && f.symbolId === id) {
                return f;
            }
        }

        return this.getParent().resolveSymbol(id, transforms, this);
    }
    aggregateCompileErrors(): CompileError[] {
        const cc = parentHelper_aggregateCompileErrorsOfChildren(this);
        return cc.concat(super.aggregateCompileErrors());
    }
}