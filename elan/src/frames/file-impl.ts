import { Selectable } from "./interfaces/selectable";
import { StatementFactory } from "./interfaces/statement-factory";
import { CompileStatus, OverallStatus, ParseStatus } from "./status-enums";
import { File} from "./interfaces/file";
import { MainFrame } from "./globals/main-frame";
import { GlobalFunction } from "./globals/global-function";
import { GlobalProcedure } from "./globals/global-procedure";
import { Enum } from "./globals/enum";
import { Class } from "./globals/class";
import { GlobalComment } from "./globals/global-comment";
import { Constant } from "./globals/constant";
import { TestFrame } from "./globals/test-frame";
import { StatementFactoryImpl } from "./statement-factory-impl";
import { helper_compileStatusAsOverallStatus, expandCollapseAll, isSelector, helper_parseStatusAsOverallStatus, helper_testStatusAsOverallStatus } from "./helpers";
import { Frame } from "./interfaces/frame";
import { Parent } from "./interfaces/parent";
import { CodeSource, CodeSourceFromString } from "./code-source";
import { Regexes } from "./fields/regexes";
import { GlobalSelector } from "./globals/global-selector";
import { Field } from "./interfaces/field";
import { editorEvent } from "./interfaces/editor-event";
import { AbstractSelector } from "./abstract-selector";
import { parentHelper_addChildAfter, parentHelper_addChildBefore, parentHelper_aggregateCompileErrorsOfChildren, parentHelper_getChildAfter, parentHelper_getChildBefore, parentHelper_getChildRange, parentHelper_getFirstChild, parentHelper_getLastChild, parentHelper_insertOrGotoChildSelector, parentHelper_removeChild, parentHelper_renderChildrenAsHtml, parentHelper_renderChildrenAsSource, parentHelper_worstCompileStatusOfChildren, parentHelper_worstParseStatusOfChildren } from "./parent-helpers";
import { Profile } from "./interfaces/profile";
import { ISymbol } from "../symbols/symbol";
import { StdLibSymbols } from "../std-lib-symbols";
import { isSymbol } from "../symbols/symbolHelpers";
import { Scope } from "./interfaces/scope";
import { TestStatus } from "./test-status";
import { RunStatus } from "./run-status";
import { CompileError } from "./compile-error";
import { ScratchPad } from "./scratch-pad";
import { Transforms } from "./syntax-nodes/transforms";

// for web editor bundle
export { CodeSourceFromString };

//var system; var _stdlib; export function _inject(l,s) { system = l; _stdlib = s; };

export class FileImpl implements File, Scope {
    isParent: boolean = true;
    hasFields: boolean = true;
    isFile: boolean = true;
    parseError? : string;
    readonly defaultFileName = "code.elan";
    fileName : string = this.defaultFileName;
    private _runStatus : RunStatus = RunStatus.stopped;
    private scratchPad: ScratchPad;
 
    private _children: Array<Frame> = new Array<Frame>();
    private _map: Map<string, Selectable>;
    private _factory: StatementFactory;
    private ignoreHashOnParsing: boolean = false;
    private _stdLibSymbols = new StdLibSymbols(); // todo needs to be populated with .d.ts 

    constructor(private hash: (toHash: string) => Promise<string>, private profile: Profile, private transform: Transforms, ignoreHashOnParsing?: boolean) {
        this._map = new Map<string, Selectable>();
        this._factory = new StatementFactoryImpl();
        var selector = new GlobalSelector(this);
        this.getChildren().push(selector);
        selector.select(true, false);
        if (ignoreHashOnParsing) {
            this.ignoreHashOnParsing = ignoreHashOnParsing;
        }
        this.scratchPad = new ScratchPad();
    }
    getFile(): File {
        return this;
    }

    getScratchPad(): ScratchPad {
        return this.scratchPad;
    }

    getProfile() : Profile {
        return this.profile;
    }

    getChildren(): Frame[] {
        return this._children;
    }

    private moveDownOne(child: Frame): boolean {
        var result = false;
        var i = this.getChildren().indexOf(child);
        if (i < this.getChildren().length - 1) {
            this.getChildren().splice(i,1);
            this.getChildren().splice(i+1,0,child);
            result = true;
        }  
        return result;
    }
    private moveUpOne(child: Frame): boolean {
        var result = false;
        var i = this.getChildren().indexOf(child);
        if (i > 0) {
            this.getChildren().splice(i,1);
            this.getChildren().splice(i-1,0,child); 
            return result = true;  
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
    minimumNumberOfChildrenExceeded(): boolean {
        return this.getChildren().length > 1;
    }

    hasParent(): boolean {
        return false;
    }

    getParent(): Parent {
        throw new Error("getParent Should not have been called on a file; test for 'hasParent()' before calling.");
    }
    
    getById(id: string): Selectable {
        return this._map.get(id) as Selectable;
    }

    getIdPrefix(): string {
        return 'file';
    }

    public async renderAsHtml(): Promise<string> {
        var globals = parentHelper_renderChildrenAsHtml(this);
        const hash = await this.getHash();
        return `<header># <hash>${hash}</hash> ${this.getVersion()}${this.getProfileName()} <span id="fileStatus" class="${this.parseStatusAsString()}">${this.parseStatusAsString()}</span></header>\r\n${globals}`;
    }

    public indent(): string {
        return "";
    }

    private getHash(body? : string): Promise<string> {
        body = (body || this.renderHashableContent()).trim().replaceAll("\r", "");
        return this.hash(body);
    }

    private getVersion() {
        return "Elan v0.1";
    }

    private getProfileName() {
        var profile = this.getProfile();
        return profile.include_profile_name_in_header ? ` ${profile.name}` : "";
    }

    compileGlobals() : string{
        var result = "";
        if (this._children.length > 0) {
            const ss: Array<string> = [];
            for (var frame of this._children.filter(g => g instanceof Enum)) {
                ss.push(frame.compile(this.transform));
            }

            for (var frame of this._children.filter(g => !('isSelector' in g || g instanceof Enum))) {
                ss.push(frame.compile(this.transform));
            }
            result = ss.join("\r\n");
        }
        return result;
    }

    async renderAsSource(): Promise<string> {
        const content = this.renderHashableContent();
        const hash = await this.getHash(content);
        return `# ${hash} ${content}`; 
    }

    compile(): string {
        const stdLib = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {`;
        return `${stdLib}\n${this.compileGlobals()}return [main, _tests];}`; 
    }

    renderHashableContent(): string {
        const globals = parentHelper_renderChildrenAsSource(this);
        return `${this.getVersion()}${this.getProfileName()} ${this.parseStatusAsString()}\r\n\r\n${globals}`; 
    }

    public getFirstSelectorAsDirectChild() : AbstractSelector {
        return this.getChildren().filter(g => ('isSelector' in g))[0] as GlobalSelector;
    }

    getChildNumber(n: number): Frame {
        return this.getChildren()[n];
    }
    
    getFirstChild(): Frame {return parentHelper_getFirstChild(this); }
    getLastChild(): Frame {return parentHelper_getLastChild(this); }
    getChildAfter(child: Frame): Frame {return parentHelper_getChildAfter(this, child);}
    getChildBefore(child: Frame): Frame {return parentHelper_getChildBefore(this, child);}
    getChildRange(first: Frame, last: Frame): Frame[] {return parentHelper_getChildRange(this, first, last); }
    addChildBefore(child: Frame, before: Frame): void {parentHelper_addChildBefore(this, child, before);}
    addChildAfter(child: Frame, before: Frame): void {parentHelper_addChildAfter(this, child, before);}
    removeChild(child: Frame): void { parentHelper_removeChild(this, child);};
        insertOrGotoChildSelector(after: boolean, child: Frame) {parentHelper_insertOrGotoChildSelector(this, after,child);}

    defocusAll() {
        for (const f of this._map.values()) {
            if (f.isFocused()) {
                f.defocus();
            }
        }
    }

    expandCollapseAll() {
        expandCollapseAll(this);
    }

    expand(): void {
        //Does nothing
    }
    collapse(): void {
        //does nothing
    }

    getTestStatus(): TestStatus {
        const tests =  this.getChildren().filter(c => c instanceof TestFrame).map(c => c as TestFrame);
        const worstOf = (a: TestStatus, b: TestStatus) => a < b ? a : b;
        const worst = tests.reduce((prev,t) => worstOf(t.getTestStatus(), prev), TestStatus.pending);
        return worst;
    }
    getTestStatusForDashboard(): string {
        var str = "";
        if (this.getParseStatus() !== ParseStatus.valid || this.getCompileStatus() !== CompileStatus.ok) {
            str = "default";
        } else {
            str = OverallStatus[helper_testStatusAsOverallStatus(this.getTestStatus())];
        }
        return str;
    }

    getRunStatus(): RunStatus {
        return this._runStatus;
    }

    setRunStatus(s : RunStatus){
        this._runStatus = s;
    }

    getParseStatus(): ParseStatus {
        return parentHelper_worstParseStatusOfChildren(this);
    };
    getParseStatusForDashboard(): string {
        return OverallStatus[helper_parseStatusAsOverallStatus(this.getParseStatus())];
    }
    getCompileStatusForDashboard(): string {
        var str = "";
        if (this.getParseStatus() !== ParseStatus.valid) {
            str = "default";
        } else {
            str = OverallStatus[helper_compileStatusAsOverallStatus(this.getCompileStatus())]
        }
        return str;
    }
    
    getCompileStatus(): CompileStatus {
        return parentHelper_worstCompileStatusOfChildren(this);
    }

    parseStatusAsString() : string {
        return ParseStatus[this.getParseStatus()];
    }
    compileErrors(): CompileError[] {
        return parentHelper_aggregateCompileErrorsOfChildren(this);
    }
    getAllSelected(): Selectable[] {
        const v = this.getMap().values()!;
        return  [...v].filter(s => s.isSelected());
    }

    deselectAll(): void {
        this.getAllSelected().forEach(s => s.deselect());
    }

    getMap(): Map<string, Selectable> {
        return this._map;
    }
    getFactory(): StatementFactory {
        return this._factory;
    }

    createMain(): Frame {return new MainFrame(this);}
    createFunction(): Frame {return  new GlobalFunction(this);}
    createProcedure(): Frame {return  new GlobalProcedure(this);}
    createEnum(): Frame {return  new Enum(this);}
    createClass(): Frame {return  new Class(this);}
    createGlobalComment(): Frame {return  new GlobalComment(this);}
    createConstant(): Frame {return  new Constant(this);}
    createTest(): Frame {return  new TestFrame(this);}

    async parseFrom(source: CodeSource): Promise<void> {
        try {
            this.parseError = undefined;
            await this.validateHeader(source.getRemainingCode());
            if (source.isMatch("#")) {
                source.removeRegEx(Regexes.comment, false);
                source.removeRegEx(Regexes.newLine, false);
                source.removeRegEx(Regexes.newLine, false);
            }
            while (source.hasMoreCode()) {
                if (source.isMatchRegEx(Regexes.newLine)) {
                    source.removeNewLine();
                } else {
                    this.getFirstSelectorAsDirectChild().parseFrom(source);
                }
            }
            this.removeAllSelectorsThatCanBe();
            this.deselectAll();
        } catch (e) {
            this.parseError = `Parse error before: ${source.getRemainingCode().substring(0, 100)}: ${e instanceof Error ? e.message : e}`;
        }
        this.getFirstChild().select(true, false);
    }

    containsMain(): boolean {
        var mains = this.getChildren().filter(g => 'isMain' in g);
        return mains.length > 0;
    }

    async validateHeader(code: string) {
        if (!this.ignoreHashOnParsing && !this.isEmpty(code)) {
            const eol = code.indexOf("\n");
            const header = code.substring(0, eol > 0 ? eol : undefined);
            const tokens = header.split(" ");
            if (tokens.length !== 5 || tokens[0] !== "#" || tokens[2] !== "Elan") {
                throw new Error("Invalid file header format");
            }
            const fileHash = tokens[1];
            const toHash = code.substring(code.indexOf("Elan"));
            const newHash = await this.getHash(toHash);

            if (fileHash !== newHash) {
                throw new Error("Code does not match the hash in the file header");
            }
        }
    }

    private isEmpty(code: string): boolean {
        var matches = code.match(/^[\s\r\n]*$/);
        return matches !== null && matches.length > 0;
    }

    getFields(): Field[] {
        return [];
    }

    processKey(e: editorEvent): void {
        switch (e.key) {
            case 'Home': {this.selectFirstGlobal(); break;}
            case 'End': {this.getLastChild().select(true, false); break;}
            case 'Tab': {this.tab(e.modKey.shift); break;}
            case 'ArrowDown':  {this.selectFirstGlobal(); break;}
            case 'ArrowRight':  {this.selectFirstGlobal(); break;}
            case "O": {if (e.modKey.control) {this.expandCollapseAll();} break;}
        }
    } 

    private selectFirstGlobal(): void {
        this.getFirstChild().select(true, false);
    }

    private tab(back: boolean) {
        if (back) {
            this.getLastChild().selectLastField();
        } else {
            this.getFirstChild().selectFirstField();
        }
    }

    newChildSelector(): AbstractSelector {
        return new GlobalSelector(this);
    }

    removeAllSelectorsThatCanBe(): void {
        for (const f of this.getMap().values()) {
            if (isSelector(f)) {
                f.deleteIfPermissible();
            }
        }
    }

    resolveSymbol(id: string | undefined, transforms: Transforms, initialScope : Frame): ISymbol {

        const globalSymbols = this.getChildren().filter(c => isSymbol(c)) as unknown as Array<ISymbol>;

        for (const s of globalSymbols){
            if (s.symbolId === id){
                return s;
            }
        }

        return this.libraryScope.resolveSymbol(id, transforms, this as unknown as Scope)!;
    }

    libraryScope = this._stdLibSymbols as Scope;
}