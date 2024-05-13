import { StatementFactory } from "../interfaces/statement-factory";
import { FrameWithStatements } from "../frame-with-statements";
import { AbstractSelector } from "../abstract-selector";
import { Parent } from "../interfaces/parent";
import { Frame } from "../interfaces/frame";
import { assertKeyword, callKeyword, caseKeyword, catchKeyword, defaultKeyword, eachKeyword, elseKeyword, forKeyword, ifKeyword, printKeyword, repeatKeyword, returnKeyword, setKeyword, switchKeyword, throwKeyword, tryKeyword, varKeyword, whileKeyword, testKeyword, commentMarker, inputKeyword,  letKeyword } from "../keywords";

export class StatementSelector extends AbstractSelector  {
    isStatement = true;
    private factory: StatementFactory;

    constructor(parent: FrameWithStatements) {
        super(parent);
        this.factory = (parent.getFactory());
    }

    defaultOptions(): [string, (parent: Parent) => Frame][] {
        return [
        [assertKeyword, (parent: Parent) => this.factory.newAssert(parent)],
        [callKeyword, (parent: Parent) => this.factory.newCall(parent)],
        [caseKeyword, (parent: Parent) => this.factory.newCase(parent)],
        [catchKeyword, (parent: Parent) => this.factory.newCatch(parent)],
        [defaultKeyword, (parent: Parent) => this.factory.newDefault(parent)],
        [eachKeyword, (parent: Parent) => this.factory.newEach(parent)],
        [elseKeyword, (parent: Parent) => this.factory.newElse(parent)],
        [forKeyword, (parent: Parent) => this.factory.newFor(parent)],
        [ifKeyword, (parent: Parent) => this.factory.newIf(parent)],
        [inputKeyword, (parent: Parent) => this.factory.newInput(parent)],
        [letKeyword, (parent: Parent) => this.factory.newLet(parent)],
        [printKeyword, (parent: Parent) => this.factory.newPrint(parent)],
        [repeatKeyword, (parent: Parent) => this.factory.newRepeat(parent)],
        [returnKeyword, (parent: Parent) => this.factory.newReturn(parent)],
        [setKeyword, (parent: Parent) => this.factory.newSet(parent)],
        [switchKeyword, (parent: Parent) => this.factory.newSwitch(parent)],
        [throwKeyword, (parent: Parent) => this.factory.newThrow(parent)],
        [tryKeyword, (parent: Parent) => this.factory.newTryCatch(parent)],
        [varKeyword, (parent: Parent) => this.factory.newVar(parent)],
        [whileKeyword, (parent: Parent) => this.factory.newWhile(parent)],
        [commentMarker, (parent: Parent) => this.factory.newComment(parent)]
        ];
    }

    profileAllows(keyword: string): boolean {
        return this.profile.statements.includes(keyword);
    }

    validWithinCurrentContext(keyword: string, userEntry: boolean): boolean {
        var result = false;
        if (this.getParent().getIdPrefix() === testKeyword ) {
            result = keyword === assertKeyword || keyword === letKeyword ||  keyword === varKeyword || keyword === commentMarker;
        } else if (this.getParent().getIdPrefix() === switchKeyword) {
            result = keyword === caseKeyword;  
        } else if (keyword === assertKeyword || keyword === caseKeyword) {
            result = false;   
        } else if (keyword === returnKeyword || keyword === catchKeyword || keyword === defaultKeyword) {
            result = !userEntry;
        } else if (keyword === elseKeyword ) {
            result = this.getParent().getIdPrefix() === ifKeyword ;
        } else if (keyword === printKeyword || keyword === callKeyword || keyword === inputKeyword) {
            result = !this.isWithinAFunction(this.getParent());
        } else {
            result = true;
        }
        return result;
    }

    private isWithinAFunction(parent: Parent): boolean {
        return parent.getIdPrefix() === 'func' ? true : parent.hasParent() && this.isWithinAFunction(parent.getParent());
    }
    renderAsHtml(): string {
        return `<statement class="${this.cls()}" id='${this.htmlId}' tabindex="0">${this.textToDisplayAsHtml()}</statement>`;
    }
} 
