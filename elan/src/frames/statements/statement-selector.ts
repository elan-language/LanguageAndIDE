import { StatementFactory } from "../interfaces/statement-factory";
import { FrameWithStatements } from "../frame-with-statements";
import { AbstractSelector } from "../abstract-selector";
import { Parent } from "../interfaces/parent";
import { Frame } from "../interfaces/frame";

export class StatementSelector extends AbstractSelector  {
    isStatement = true;
    private factory: StatementFactory;

    constructor(parent: FrameWithStatements) {
        super(parent);
        this.factory = (parent.getFactory());
    }

    defaultOptions: [string, (parent: Parent) => Frame][] = [
        ["assert", (parent: Parent) => this.factory.newAssert(parent)],
        ["call", (parent: Parent) => this.factory.newCall(parent)],
        ["case", (parent: Parent) => this.factory.newCase(parent)],
        ["catch", (parent: Parent) => this.factory.newCatch(parent)],
        ["default", (parent: Parent) => this.factory.newDefault(parent)],
        ["each", (parent: Parent) => this.factory.newEach(parent)],
        ["else", (parent: Parent) => this.factory.newElse(parent)],
        ["for", (parent: Parent) => this.factory.newFor(parent)],
        ["if", (parent: Parent) => this.factory.newIf(parent)],
        ["print", (parent: Parent) => this.factory.newPrint(parent)],
        ["repeat", (parent: Parent) => this.factory.newRepeat(parent)],
        ["return", (parent: Parent) => this.factory.newReturn(parent)],
        ["set", (parent: Parent) => this.factory.newSet(parent)],
        ["switch", (parent: Parent) => this.factory.newSwitch(parent)],
        ["throw", (parent: Parent) => this.factory.newThrow(parent)],
        ["try", (parent: Parent) => this.factory.newTryCatch(parent)],
        ["var", (parent: Parent) => this.factory.newVar(parent)],
        ["while", (parent: Parent) => this.factory.newWhile(parent)],
        ["#", (parent: Parent) => this.factory.newComment(parent)]
    ];

    validForEditorWithin(keyword: string): boolean {
        if (this.getParent().getIdPrefix() === "test" ) {
            return keyword === "assert" ||keyword === "call" || keyword === "var";
        } else if (this.getParent().getIdPrefix() === "switch") {
            return keyword === "case";     
        } else if (keyword === "return" || keyword === "assert" || keyword === "case" || keyword === "catch" || keyword === "default") {
            return false;
        } else if (keyword === "else" ) {
            return this.getParent().getIdPrefix() === "if" ;
        } else if (keyword === "print" || keyword === "call") {
            return !this.isWithinAFunction(this.getParent());
        } else {
            return true;
        }
    }

    private isWithinAFunction(parent: Parent): boolean {
        return parent.getIdPrefix() === 'func' ? true : parent.hasParent() && this.isWithinAFunction(parent.getParent());
    }
    renderAsHtml(): string {
        return `<statement class="${this.cls()}" id='${this.htmlId}' tabindex="0">${this.textToDisplayAsHtml()}</statement>`;
    }
} 
