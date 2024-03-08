import { AbstractFrame } from "./abstract-frame";
import { Parent } from "./interfaces/parent";
import { File } from "./interfaces/file";
import { Frame } from "./interfaces/frame";
import { Collapsible } from "./interfaces/collapsible";
import { ParseStatus } from "./parse-status";
import { StatementSelector } from "./statements/statement-selector";
import { CodeSource } from "./code-source";
import { Regexes } from "./fields/regexes";
import { AbstractSelector } from "./abstract-selector";
import { Field } from "./interfaces/field";
import { AbstractFrameWithChildren } from "./abstract-frame-with-children";

export abstract class FrameWithStatements extends AbstractFrameWithChildren implements Parent, Collapsible{
    isCollapsible: boolean = true;
    isParent: boolean = true;
    multiline:boolean = true;

    constructor(parent: File | Parent) {
        super(parent);   
        this.getChildren().push(this.newStatementSelector());
    }

    newStatementSelector(): StatementSelector {
        return new StatementSelector(this);
    }

    protected getNoOfStatements(): number {
        return this.getChildren().length;
    }

    minimumNumberOfChildrenExceeded(): boolean {
        return this.getChildren().length > 1;
    }

    removeChild(child: Frame): void {
        var i = this.getChildren().indexOf(child);
        this.getChildren().splice(i,1);
    }

    getStatus(): ParseStatus {
        var fieldStatus = this.worstStatusOfFields();
        var statementsStatus = this.getChildren().map(s => s.getStatus()).reduce((prev, cur) => cur < prev ? cur : prev, ParseStatus.valid);
        return fieldStatus < statementsStatus ? fieldStatus : statementsStatus;
    }

    expandCollapse(): void {
        if (this.isCollapsed()) {
            this.expand();
        } else {
            this.collapse();
        }
    }
    public getFirstStatementSelector() : StatementSelector {
        return this.getChildren().filter(g => ('isSelector' in g))[0] as StatementSelector;
    }

    getFirstChild(): Frame {
        return this.getChildren()[0]; //Should always be one - if only a Selector
    }

    getLastChild(): Frame {
        return this.getChildren()[this.getChildren().length - 1];
    }

    getChildAfter(g: Frame): Frame {
        const index = this.getChildren().indexOf(g);
        return index < this.getChildren().length -1 ? this.getChildren()[index +1] : g;
    }

    getChildBefore(g: Frame): Frame {
        const index = this.getChildren().indexOf(g);
        return index > 0 ? this.getChildren()[index -1] : g;
    }

    getChildRange(first: Frame, last: Frame): Frame[] {
        var fst = this.getChildren().indexOf(first);
        var lst = this.getChildren().indexOf(last);
        return fst < lst ? this.getChildren().slice(fst, lst + 1) : this.getChildren().slice(lst, fst + 1);
    }

    selectFirstField(): boolean {
        var result = super.selectFirstField();
        if (!result) {
            result = this.getChildren()[0].selectFirstField();
        }
        return result;
    } 

    selectLastField(): boolean {
        var n = this.getChildren().length;
        return this.getChildren()[n-1].selectLastField();
    } 

    selectFieldBefore(current: Field): boolean {
        if (this.getFields().includes(current)) {
            return super.selectFieldBefore(current);
        }
        return this.getLastChild().selectLastField();
    }

    selectFirstChildIfAny(): boolean {
        var result = false;
        if (this.getChildren().length > 0) {
            this.getChildren()[0].select(true, false);
            result = true;
        }
        return result;
    }

    protected renderStatementsAsHtml() : string {
        const ss: Array<string> = [];
        for (var frame of this.getChildren()) {
            ss.push(frame.renderAsHtml());
        }
        return ss.join("\n");
    }

    protected renderStatementsAsSource() : string {
        var result = "";
        if (this.getChildren().length > 0 ) {
            const ss: Array<string> = [];
            for (var frame of this.getChildren().filter(s => !('isSelector' in s))) {
                ss.push(frame.renderAsSource());
            }
            result = ss.join("\r\n");
        }
        return result;
    }

    public addStatementBefore(s: Frame, before: Frame) {
        var i = this.getChildren().indexOf(before);
        this.getChildren().splice(i, 0, s);
    }

    public addStatementAfter(s: Frame, after: Frame) {
        var i = this.getChildren().indexOf(after) + 1;
        this.getChildren().splice(i, 0, s);   
    }

    public removeStatement(s: Frame) {
        var i = this.getChildren().indexOf(s);
        this.getChildren().splice(i, 1);   
    }

    parseFrom(source: CodeSource): void {
        this.parseTopOfFrame(source);
        while (!this.parseBottomOfFrame(source)) {
            if (source.isMatchRegEx(Regexes.startsWithNewLine)) {
                source.removeRegEx(Regexes.startsWithNewLine, false);
                source.removeIndent();
            } else {
                this.getFirstStatementSelector().parseFrom(source);
            }
        } 
    }
    abstract parseTopOfFrame(source: CodeSource): void;
    abstract parseBottomOfFrame(source: CodeSource): boolean;

    protected parseStandardEnding(source: CodeSource, keywords: string): boolean {
        source.removeIndent();
        var result = false;
        if (source.isMatch(keywords)) {
            source.remove(keywords);
            result = true;
        }
        return result;
    }
    getSelectorToInsertAboveBelow(): AbstractSelector { //Overridden by Global frames that inherit from this
        return new StatementSelector(this.getParent() as FrameWithStatements);
    }

    insertSelector(after: boolean): void { //Overridden by Global frames that inherit from this
        var selector = this.getSelectorToInsertAboveBelow();
        var parent =(this.getParent() as FrameWithStatements);
        if (after && this.canInsertAfter()) {
            parent.addStatementAfter(selector, this);
            selector.select(true, false);
        } else if (!after && this.canInsertBefore()) {
            parent.addStatementBefore(selector, this);
            selector.select(true, false);
        } 
    }

    private moveDownOne(child: Frame): boolean {
        var result = false;
        var i = this.getChildren().indexOf(child);
        if ((i < this.getChildren().length - 1) && (this.getChildren()[i+1].canInsertAfter())) {
            this.getChildren().splice(i,1);
            this.getChildren().splice(i+1,0,child);  
            result = true;
        }
        return result;
    }
    private moveUpOne(child: Frame): boolean {
        var result = false;
        var i = this.getChildren().indexOf(child);
        if ((i > 0) && (this.getChildren()[i-1].canInsertBefore())) {
            this.getChildren().splice(i,1);
            this.getChildren().splice(i-1,0,child);
            result = true;     
        }
        return result;
    }

    moveSelectedChildrenUpOne(): void {
        var toMove = this.getChildren().filter(g => g.isSelected()); 
        var cont = true;
        var i = 0;
        while (cont && i < toMove.length) {
            cont = this.moveUpOne(toMove[i]);
            i++;
        }
    }
    moveSelectedChildrenDownOne(): void {
        var toMove = this.getChildren().filter(g => g.isSelected()); 
        var cont = true;
        var i = toMove.length - 1;
        while (cont && i >= 0) {
            cont = this.moveDownOne(toMove[i]);
            i--;
        }
    }
}