import { StdLibSymbols } from "../std-lib-symbols";
import { AssertOutcome } from "../system";
import { AbstractSelector } from "./abstract-selector";
import { CodeSource, CodeSourceFromString } from "./code-source";
import { CompileError } from "./compile-error";
import { Regexes } from "./fields/regexes";
import { ClassFrame } from "./globals/class-frame";
import { Constant } from "./globals/constant";
import { Enum } from "./globals/enum";
import { GlobalComment } from "./globals/global-comment";
import { GlobalFunction } from "./globals/global-function";
import { GlobalProcedure } from "./globals/global-procedure";
import { GlobalSelector } from "./globals/global-selector";
import { MainFrame } from "./globals/main-frame";
import { TestFrame } from "./globals/test-frame";
import {
  expandCollapseAll,
  helper_compileStatusAsDisplayStatus,
  helper_parseStatusAsDisplayStatus,
  helper_runStatusAsDisplayStatus,
  helper_testStatusAsDisplayStatus,
  isSelector,
} from "./helpers";
import { editorEvent } from "./interfaces/editor-event";
import { Field } from "./interfaces/field";
import { File } from "./interfaces/file";
import { Frame } from "./interfaces/frame";
import { Parent } from "./interfaces/parent";
import { Profile } from "./interfaces/profile";
import { Scope } from "./interfaces/scope";
import { Selectable } from "./interfaces/selectable";
import { StatementFactory } from "./interfaces/statement-factory";
import { ElanSymbol } from "./interfaces/symbol";
import {
  parentHelper_addChildAfter,
  parentHelper_addChildBefore,
  parentHelper_aggregateCompileErrorsOfChildren,
  parentHelper_getChildAfter,
  parentHelper_getChildBefore,
  parentHelper_getChildRange,
  parentHelper_getFirstChild,
  parentHelper_getLastChild,
  parentHelper_insertOrGotoChildSelector,
  parentHelper_readWorstCompileStatusOfChildren,
  parentHelper_readWorstParseStatusOfChildren,
  parentHelper_removeChild,
  parentHelper_renderChildrenAsHtml,
  parentHelper_renderChildrenAsSource,
  worstParseStatus,
} from "./parent-helpers";
import { ScratchPad } from "./scratch-pad";
import { StatementFactoryImpl } from "./statement-factory-impl";
import { CompileStatus, DisplayStatus, ParseStatus, RunStatus, TestStatus } from "./status-enums";
import { DuplicateSymbol } from "./symbols/duplicate-symbol";
import { isSymbol } from "./symbols/symbol-helpers";
import { Transforms } from "./syntax-nodes/transforms";

// for web editor bundle
export { CodeSourceFromString };

//var system; var _stdlib; export function _inject(l,s) { system = l; _stdlib = s; };

export class FileImpl implements File, Scope {
  isParent: boolean = true;
  hasFields: boolean = true;
  isFile: boolean = true;
  parseError?: string;
  readonly defaultFileName = "code.elan";
  fileName: string = this.defaultFileName;
  private _parseStatus: ParseStatus = ParseStatus.default;
  private _compileStatus: CompileStatus = CompileStatus.default;
  private _testStatus: TestStatus = TestStatus.default;
  private _runStatus: RunStatus = RunStatus.default;
  private _fieldBeingEdited: boolean = false;

  private scratchPad: ScratchPad;

  private _children: Array<Frame> = new Array<Frame>();
  private _map: Map<string, Selectable>;
  private _factory: StatementFactory;
  private ignoreHashOnParsing: boolean = false;
  private _stdLibSymbols = new StdLibSymbols(); // todo needs to be populated with .d.ts
  private _nextId: number = 0;
  private _testError?: Error;
  private _frNo: number = 0;
  private _showFrameNos: boolean = true;

  constructor(
    private hash: (toHash: string) => Promise<string>,
    private profile: Profile,
    private transform: Transforms,
    ignoreHashOnParsing?: boolean,
  ) {
    this._map = new Map<string, Selectable>();
    this._factory = new StatementFactoryImpl();
    const selector = new GlobalSelector(this);
    this.getChildren().push(selector);
    selector.select(true, false);
    if (ignoreHashOnParsing) {
      this.ignoreHashOnParsing = ignoreHashOnParsing;
    }
    this.scratchPad = new ScratchPad();
  }

  symbolMatches(id: string, all: boolean): ElanSymbol[] {
    const libMatches = this.libraryScope.symbolMatches(id, all);
    const globalSymbols = this.getChildren().filter((c) => isSymbol(c)) as ElanSymbol[];
    const matches = globalSymbols.filter((s) => s.symbolId.startsWith(id) || all);

    return matches.concat(libMatches);
  }

  getFile(): File {
    return this;
  }

  getFrNo(): string {
    const n = this._frNo++;
    return this._showFrameNos ? `<frno>${n}</frno>` : ``;
  }

  getFieldBeingEdited() {
    return this._fieldBeingEdited;
  }

  setFieldBeingEdited(value: boolean) {
    this._fieldBeingEdited = value;
  }

  getScratchPad(): ScratchPad {
    return this.scratchPad;
  }

  getProfile(): Profile {
    return this.profile;
  }

  getChildren(): Frame[] {
    return this._children;
  }

  private moveDownOne(child: Frame): boolean {
    let result = false;
    const i = this.getChildren().indexOf(child);
    if (i < this.getChildren().length - 1) {
      this.getChildren().splice(i, 1);
      this.getChildren().splice(i + 1, 0, child);
      result = true;
    }
    return result;
  }
  private moveUpOne(child: Frame): boolean {
    let result = false;
    const i = this.getChildren().indexOf(child);
    if (i > 0) {
      this.getChildren().splice(i, 1);
      this.getChildren().splice(i - 1, 0, child);
      return (result = true);
    }
    return result;
  }
  moveSelectedChildrenUpOne(): void {
    const toMove = this.getChildren().filter((g) => g.isSelected());
    let cont = true;
    let i = 0;
    while (cont && i < toMove.length) {
      cont = this.moveUpOne(toMove[i]);
      i++;
    }
  }
  moveSelectedChildrenDownOne(): void {
    const toMove = this.getChildren().filter((g) => g.isSelected());
    let cont = true;
    let i = toMove.length - 1;
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
    throw new Error(
      "getParent Should not have been called on a file; test for 'hasParent()' before calling.",
    );
  }

  getParentScope(): Scope {
    return this.libraryScope;
  }

  getById(id: string): Selectable {
    return this._map.get(id) as Selectable;
  }

  getIdPrefix(): string {
    return "file";
  }

  private frNo = 1;

  public async renderAsHtml(): Promise<string> {
    this._frNo = 1;
    const globals = parentHelper_renderChildrenAsHtml(this);
    const hash = await this.getHash();
    return `<header># <hash>${hash}</hash> ${this.getVersion()}${this.getProfileName()} <span id="fileStatus" class="${this.parseStatusAsString()}">${this.parseStatusAsString()}</span></header>\r\n${globals}`;
  }

  public indent(): string {
    return "";
  }

  private getHash(body?: string): Promise<string> {
    body = (body || this.renderHashableContent()).trim().replaceAll("\r", "");
    return this.hash(body);
  }

  private getVersion() {
    return "Elan Beta 2";
  }

  private getProfileName() {
    const profile = this.getProfile();
    return profile.include_profile_name_in_header ? ` ${profile.name}` : "";
  }

  compileGlobals(): string {
    let result = "";
    if (this._children.length > 0) {
      const ss: Array<string> = [];
      for (const frame of this._children.filter((g) => g instanceof Enum)) {
        ss.push(frame.compile(this.transform));
      }

      for (const frame of this._children.filter((g) => !("isSelector" in g || g instanceof Enum))) {
        ss.push(frame.compile(this.transform));
      }

      if (!this._children.some((g) => g instanceof MainFrame)) {
        const emptyMain = new MainFrame(this);
        ss.push(emptyMain.compile(this.transform));
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

  compileAsWorker(base: string): string {
    const onmsg = `onmessage = async (e) => {
  if (e.data.type === "start") {
    try {
      const [main, tests] = await program();
      await main();
      postMessage({type : "status", status : "finished"});
    }
    catch (e) {
      postMessage({type : "status", status : "error", error : e});
    }
  }
};`;

    const stdLib = `import { StdLib } from "${base}/elan-api.js"; var system; var _stdlib; var _tests = []; async function program() { _stdlib = new StdLib(); system = _stdlib.system;`;
    return `${stdLib}\n${this.compileGlobals()}return [main, _tests];}\n${onmsg}`;
  }

  renderHashableContent(): string {
    const globals = parentHelper_renderChildrenAsSource(this);
    let html = `${this.getVersion()}${this.getProfileName()} ${this.parseStatusAsString()}\r\n\r\n${globals}`;
    html = html.endsWith("\r\n") ? html : html + "\r\n"; // To accommodate possibility that last global is a global-comment
    return html;
  }

  public getFirstSelectorAsDirectChild(): AbstractSelector {
    return this.getChildren().filter((g) => "isSelector" in g)[0] as GlobalSelector;
  }

  getChildNumber(n: number): Frame {
    return this.getChildren()[n];
  }

  getFirstChild(): Frame {
    return parentHelper_getFirstChild(this);
  }
  getLastChild(): Frame {
    return parentHelper_getLastChild(this);
  }
  getChildAfter(child: Frame): Frame {
    return parentHelper_getChildAfter(this, child);
  }
  getChildBefore(child: Frame): Frame {
    return parentHelper_getChildBefore(this, child);
  }
  getChildRange(first: Frame, last: Frame): Frame[] {
    return parentHelper_getChildRange(this, first, last);
  }
  addChildBefore(child: Frame, before: Frame): void {
    parentHelper_addChildBefore(this, child, before);
  }
  addChildAfter(child: Frame, before: Frame): void {
    parentHelper_addChildAfter(this, child, before);
  }
  removeChild(child: Frame): void {
    parentHelper_removeChild(this, child);
  }
  insertOrGotoChildSelector(after: boolean, child: Frame) {
    parentHelper_insertOrGotoChildSelector(this, after, child);
  }

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

  readRunStatus(): RunStatus {
    return this._runStatus;
  }
  readRunStatusForDashboard(): string {
    return DisplayStatus[helper_runStatusAsDisplayStatus(this._runStatus)];
  }
  setRunStatus(s: RunStatus) {
    this._runStatus = s;
  }
  readParseStatus(): ParseStatus {
    return this._parseStatus;
  }
  parseStatusAsString(): string {
    return ParseStatus[this.readParseStatus()];
  }
  readParseStatusForDashboard(): string {
    return DisplayStatus[helper_parseStatusAsDisplayStatus(this._parseStatus)];
  }

  updateAllParseStatus(): void {
    this.getChildren().forEach((c) => c.updateParseStatus());
    this._parseStatus = worstParseStatus(
      this._parseStatus,
      parentHelper_readWorstParseStatusOfChildren(this),
    );
  }

  async refreshAllStatuses(testRunner: (jsCode: string) => Promise<[string, AssertOutcome[]][]>) {
    let code = "";
    this._parseStatus = ParseStatus.default as ParseStatus;
    this.parseError = undefined;
    this.updateAllParseStatus();
    this.resetAllCompileStatusAndErrors();

    if (this._parseStatus === ParseStatus.valid && !this._fieldBeingEdited) {
      code = this.compile();
      this.updateAllCompileStatus();
    }
    if (this._compileStatus === CompileStatus.ok) {
      const outcomes = await testRunner(code);
      let errors: Error[] = [];
      for (const outcome of outcomes) {
        const [tid, asserts] = outcome;
        const test = this.getById(tid) as TestFrame;
        test.setAssertOutcomes(asserts);
        errors = errors.concat(asserts.map((a) => a.error).filter((e) => e) as Error[]);
      }
      this._testError = errors.length > 0 ? errors[0] : undefined; // TODO aggregate to display all ?
      this.updateAllTestStatus();
    } else {
      this.resetAllTestStatus();
    }
  }

  //Compile status
  readCompileStatus(): CompileStatus {
    return this._compileStatus;
  }
  readCompileStatusForDashboard(): string {
    let status = DisplayStatus.default;
    const parseStatus = helper_parseStatusAsDisplayStatus(this.readParseStatus());
    if (parseStatus === DisplayStatus.ok) {
      status = helper_compileStatusAsDisplayStatus(this._compileStatus);
    }
    return DisplayStatus[status];
  }
  updateAllCompileStatus(): void {
    this.getChildren().forEach((c) => c.updateCompileStatus());
    this._compileStatus = parentHelper_readWorstCompileStatusOfChildren(this);
  }
  resetAllCompileStatusAndErrors(): void {
    this.getChildren().forEach((c) => c.resetCompileStatusAndErrors());
    this._compileStatus = CompileStatus.default;
    this._testError = undefined;
  }

  readTestStatus(): TestStatus {
    return this._testStatus;
  }

  getTestError(): Error | undefined {
    return this._testError;
  }

  readTestStatusForDashboard(): string {
    let status: DisplayStatus;
    if (
      this.readParseStatus() !== ParseStatus.valid ||
      this.readCompileStatus() !== CompileStatus.ok
    ) {
      status = DisplayStatus.default;
    } else {
      status = helper_testStatusAsDisplayStatus(this.readTestStatus());
    }
    return DisplayStatus[status];
  }
  updateAllTestStatus(): void {
    const tests = this.getTestFrames();
    tests.forEach((t) => t.updateTestStatus());
    const worstOf = (a: TestStatus, b: TestStatus) => (a < b ? a : b);
    const worst = tests.reduce((prev, t) => worstOf(t.readTestStatus(), prev), TestStatus.default);
    this._testStatus = worst;
  }
  resetAllTestStatus(): void {
    const tests = this.getTestFrames();
    tests.forEach((t) => t.resetTestStatus());
  }

  private getTestFrames(): TestFrame[] {
    return this.getChildren()
      .filter((c) => c instanceof TestFrame)
      .map((c) => c as TestFrame);
  }

  aggregateCompileErrors(): CompileError[] {
    return parentHelper_aggregateCompileErrorsOfChildren(this);
  }
  getAllSelected(): Selectable[] {
    const v = this.getMap().values()!;
    return [...v].filter((s) => s.isSelected());
  }

  deselectAll(): void {
    this.getAllSelected().forEach((s) => s.deselect());
  }

  getMap(): Map<string, Selectable> {
    return this._map;
  }

  getNextId() {
    return this._nextId++;
  }

  getFactory(): StatementFactory {
    return this._factory;
  }

  createMain(): Frame {
    return new MainFrame(this);
  }
  createFunction(): Frame {
    return new GlobalFunction(this);
  }
  createProcedure(): Frame {
    return new GlobalProcedure(this);
  }
  createEnum(): Frame {
    return new Enum(this);
  }
  createClass(abstract: boolean, immutable: boolean): Frame {
    return new ClassFrame(this, abstract, immutable);
  }
  createGlobalComment(): Frame {
    return new GlobalComment(this);
  }
  createConstant(): Frame {
    return new Constant(this);
  }
  createTest(): Frame {
    return new TestFrame(this);
  }

  async parseFrom(source: CodeSource): Promise<void> {
    try {
      this.parseError = undefined;
      this._parseStatus = ParseStatus.default;
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
      this.getFirstChild().select(true, false);
      this.updateAllParseStatus();
    } catch (e) {
      if (e instanceof Error && e.message === cannotLoadFile) {
        this.parseError = e.message;
      } else {
        this.parseError = `Parse error before: ${source.getRemainingCode().substring(0, 100)}: ${e instanceof Error ? e.message : e}`;
      }
      this._parseStatus = ParseStatus.invalid;
    }
  }

  containsMain(): boolean {
    const mains = this.getChildren().filter((g) => "isMain" in g);
    return mains.length > 0;
  }

  async validateHeader(code: string) {
    const msg = cannotLoadFile;
    if (!this.ignoreHashOnParsing && !this.isEmpty(code)) {
      const eol = code.indexOf("\n");
      const header = code.substring(0, eol > 0 ? eol : undefined);
      const tokens = header.split(" ");
      if (tokens.length !== 6 || tokens[0] !== "#" || tokens[2] !== "Elan") {
        throw new Error(msg);
      }
      const fileHash = tokens[1];
      const toHash = code.substring(code.indexOf("Elan"));
      const newHash = await this.getHash(toHash);

      if (fileHash !== newHash && fileHash !== "FFFF") {
        throw new Error(msg);
      }
    }
  }

  private isEmpty(code: string): boolean {
    const matches = code.match(/^[\s\r\n]*$/);
    return matches !== null && matches.length > 0;
  }

  getFields(): Field[] {
    return [];
  }

  processKey(e: editorEvent): boolean {
    const codeHasChanged = this._fieldBeingEdited;
    switch (e.key) {
      case "Home": {
        this.selectFirstGlobal();
        break;
      }
      case "End": {
        this.getLastChild().select(true, false);
        break;
      }
      case "Tab": {
        this.tab();
        break;
      }
      case "ArrowDown": {
        this.selectFirstGlobal();
        break;
      }
      case "ArrowRight": {
        this.selectFirstGlobal();
        break;
      }
      case "O": {
        if (e.modKey.control) {
          this.expandCollapseAll();
        }
        break;
      }
    }
    this.setFieldBeingEdited(false);
    return codeHasChanged;
  }

  private selectFirstGlobal(): void {
    this.getFirstChild().select(true, false);
  }

  private tab() {
    this.getFirstChild().selectFirstField();
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

  resolveSymbol(id: string | undefined, transforms: Transforms, initialScope: Frame): ElanSymbol {
    // unknown because of typescript quirk
    const globalSymbols = this.getChildren().filter((c) => isSymbol(c)) as ElanSymbol[];
    const matches = globalSymbols.filter((s) => s.symbolId === id);

    if (matches.length === 1) {
      return matches[0];
    }
    if (matches.length > 1) {
      return new DuplicateSymbol(matches);
    }

    return this.libraryScope.resolveSymbol(id, transforms, this);
  }

  libraryScope = this._stdLibSymbols;
}

export const cannotLoadFile = `Cannot load file: it has been created or modified outside Elan IDE`;
