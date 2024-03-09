import { AbstractFrame } from "./abstract-frame";
import { AbstractSelector } from "./abstract-selector";
import { CodeSource } from "./code-source";
import { Regexes } from "./fields/regexes";
import { Collapsible } from "./interfaces/collapsible";
import { Field } from "./interfaces/field";
import { Frame } from "./interfaces/frame";
import { Parent } from "./interfaces/parent";
import { StatementFactory } from "./interfaces/statement-factory";
import { ParseStatus } from "./parse-status";

export abstract class AbstractFrameWithChildren extends AbstractFrame implements Parent, Collapsible{


    isCollapsible: boolean = true;
    isParent: boolean = true;
    private _children: Array<Frame> = new Array<Frame>();

    getFactory(): StatementFactory {
        return this.getParent().getFactory();
    }

    protected setClasses() {
        super.setClasses();
        this.pushClass(true,"multiline");
    };

    getStatus(): ParseStatus {
        var fieldStatus = this.worstStatusOfFields();
        var statementsStatus = this.getChildren().map(s => s.getStatus()).reduce((prev, cur) => cur < prev ? cur : prev, ParseStatus.valid);
        return fieldStatus < statementsStatus ? fieldStatus : statementsStatus;
    }

    getChildren(): Frame[] {
        return this._children;
    }

    minimumNumberOfChildrenExceeded(): boolean {
        return this.getChildren().length > 1;
    }

    removeChild(child: Frame): void {
        var i = this.getChildren().indexOf(child);
        this.getChildren().splice(i,1);
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
        expandCollapse(): void {
        if (this.isCollapsed()) {
            this.expand();
        } else {
            this.collapse();
        }
    }

    public getFirstSelectorAsDirectChild() : AbstractSelector {
        return this.getChildren().filter(g => ('isSelector' in g))[0] as AbstractSelector;
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

    selectFirstChild(multiSelect: boolean): boolean {
        if (this.getChildren().length > 0){
            this.getChildren()[0].select(true, multiSelect);
            return true;
        }
        return false;
    }

    selectLastField(): boolean {
        var n = this.getChildren().length;
        return this.getChildren()[n-1].selectLastField();
    } 
    
    selectFirstField(): boolean {
        var result = super.selectFirstField();
        if (!result) {
            result = this.getChildren()[0].selectFirstField();
        }
        return result;
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

    public addChildBefore(child: Frame, before: Frame) {
        var i = this.getChildren().indexOf(before);
        this.getChildren().splice(i, 0, child);
    }

    public addChildAfter(child: Frame, after: Frame) {
        var i = this.getChildren().indexOf(after) + 1;
        this.getChildren().splice(i, 0, child);   
    }

    protected renderChildrenAsHtml(): string {
        const ss: Array<string> = [];
        for (var m of this.getChildren()) {
            ss.push(m.renderAsHtml());
        }
        return ss.join("\n");
    }

    protected renderChildrenAsSource() : string {
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

    parseFrom(source: CodeSource): void {
        this.parseTop(source);
        while (!this.parseBottom(source)) {
            if (source.isMatchRegEx(Regexes.startsWithNewLine)) {
                source.removeRegEx(Regexes.startsWithNewLine, false);
                source.removeIndent();
            } else {
                this.getFirstSelectorAsDirectChild().parseFrom(source);
            }
        } 
    }

    abstract parseTop(source: CodeSource): void;
    abstract parseBottom(source: CodeSource): boolean;

    protected parseStandardEnding(source: CodeSource, keywords: string): boolean {
        source.removeIndent();
        var result = false;
        if (source.isMatch(keywords)) {
            source.remove(keywords);
            result = true;
        }
        return result;
    }

    abstract newChildSelector(): AbstractSelector;

    insertChildSelector(after: boolean, child: Frame) {
        var selector = this.newChildSelector();
        if (after && child.canInsertAfter()) {
            this.addChildAfter(selector, child);
        } else if (!after && child.canInsertBefore()) {
            this.addChildBefore(selector, child);
        }
        selector.select(true, false);
    }
}