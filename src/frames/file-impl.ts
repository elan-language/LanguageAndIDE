import { ElanFileError } from "../elan-file-error";
import { elanVersion, isElanProduction } from "../production";
import { StdLibSymbols } from "../standard-library/std-lib-symbols";
import { AssertOutcome } from "../system";
import { AbstractSelector } from "./abstract-selector";
import { CodeSource, CodeSourceFromString } from "./code-source";
import { CompileError } from "./compile-error";
import { Regexes } from "./fields/regexes";
import {
  expandCollapseAll,
  helper_compileStatusAsDisplayStatus,
  helper_parseStatusAsDisplayStatus,
  helper_testStatusAsDisplayStatus,
  isMain,
  isSelector,
} from "./frame-helpers";
import { AbstractClass } from "./globals/abstract-class";
import { ConcreteClass } from "./globals/concrete-class";
import { Constant } from "./globals/constant";
import { Enum } from "./globals/enum";
import { GlobalComment } from "./globals/global-comment";
import { GlobalFunction } from "./globals/global-function";
import { GlobalProcedure } from "./globals/global-procedure";
import { GlobalSelector } from "./globals/global-selector";
import { InterfaceFrame } from "./globals/interface-frame";
import { MainFrame } from "./globals/main-frame";
import { RecordFrame } from "./globals/record-frame";
import { TestFrame } from "./globals/test-frame";
import { editorEvent } from "./interfaces/editor-event";
import { ElanSymbol } from "./interfaces/elan-symbol";
import { Field } from "./interfaces/field";
import { File } from "./interfaces/file";
import { Frame } from "./interfaces/frame";
import { Parent } from "./interfaces/parent";
import { Profile } from "./interfaces/profile";
import { Scope } from "./interfaces/scope";
import { Selectable } from "./interfaces/selectable";
import { StatementFactory } from "./interfaces/statement-factory";
import { Transforms } from "./interfaces/transforms";
import {
  parentHelper_addChildAfter,
  parentHelper_addChildBefore,
  parentHelper_aggregateCompileErrorsOfChildren,
  parentHelper_deleteSelectedChildren,
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
  parentHelper_updateBreakpoints,
  worstParseStatus,
} from "./parent-helpers";
import { ScratchPad } from "./scratch-pad";
import { StatementFactoryImpl } from "./statement-factory-impl";
import {
  BreakpointEvent,
  CompileStatus,
  DisplayColour,
  ParseStatus,
  RunStatus,
  TestStatus,
} from "./status-enums";
import { DuplicateSymbol } from "./symbols/duplicate-symbol";
import { elanSymbols } from "./symbols/elan-symbols";
import { isSymbol, symbolMatches } from "./symbols/symbol-helpers";

// for web editor bundle
export { CodeSourceFromString };

export const fileErrorPrefix = `Cannot load file:`;

const cannotLoadFile = `${fileErrorPrefix} it has been created or modified outside Elan IDE`;

export class FileImpl implements File, Scope {
  currentHash: string = "";
  isParent: boolean = true;
  hasFields: boolean = true;
  hasTests: boolean = false;
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
  private allowAnyHeader: boolean = false;
  private _stdLibSymbols: StdLibSymbols;
  private _nextId: number = 0;
  private _testError?: Error;
  private _frNo: number = 0;
  private _showFrameNos: boolean = true;

  constructor(
    private readonly hash: (toHash: string) => Promise<string>,
    private readonly profile: Profile,
    private userName: string | undefined,
    private readonly transform: Transforms,
    allowAnyHeader?: boolean,
  ) {
    this._stdLibSymbols = new StdLibSymbols();
    this._map = new Map<string, Selectable>();
    this._factory = new StatementFactoryImpl();
    const selector = new GlobalSelector(this);
    this.getChildren().push(selector);
    selector.select(true, false);
    if (allowAnyHeader) {
      this.allowAnyHeader = allowAnyHeader;
    }
    this.scratchPad = new ScratchPad();
  }

  private version = elanVersion;
  private isProduction = isElanProduction;

  symbolMatches(id: string, all: boolean): ElanSymbol[] {
    const languageMatches = symbolMatches(id, all, elanSymbols);
    const libMatches = this.libraryScope.symbolMatches(id, all);
    const globalSymbols = this.getChildren().filter((c) => isSymbol(c)) as ElanSymbol[];
    const matches = symbolMatches(id, all, globalSymbols);

    return languageMatches.concat(matches).concat(libMatches);
  }

  getFile(): File {
    return this;
  }

  getFrNo(): string {
    const n = this._frNo++;
    return this._showFrameNos ? `<el-fr>${n}</el-fr>` : ``;
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
  deleteSelectedChildren(): void {
    parentHelper_deleteSelectedChildren(this);
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
    this.currentHash = await this.getHash();
    return `<el-header># <el-hash>${this.currentHash}</el-hash> ${this.getVersionString()}${this.getUserName()}${this.getProfileName()}</el-header>\r\n${globals}`;
  }

  public indent(): string {
    return "";
  }

  private async getHash(body?: string): Promise<string> {
    body = (body || this.renderHashableContent()).trim().replaceAll("\r", "");
    return await this.hash(body);
  }

  private getVersion() {
    return this.version;
  }

  private getVersionString() {
    const v = this.getVersion();
    const suffix = v.preRelease === "" ? "" : `-${v.preRelease}`;

    return `Elan ${v.major}.${v.minor}.${v.patch}${suffix}`;
  }

  // to allow header generation of new version
  setVersion(major: number, minor: number, patch: number, preRelease: string) {
    this.version = { major: major, minor: minor, patch: patch, preRelease: preRelease };
  }

  // for testing
  setIsProduction(flag: boolean) {
    this.isProduction = flag;
  }

  private getUserName() {
    return this.userName ? ` ${this.userName}` : " guest";
  }

  private getProfileName() {
    const pn = this.profile.name.replaceAll(" ", "_");
    return pn ? ` ${pn}` : " _";
  }

  compileGlobals(): string {
    let result = "";
    if (this._children.length > 0) {
      const ss: Array<string> = [];
      for (const frame of this._children.filter((g) => g instanceof Enum)) {
        ss.push(frame.compile(this.transform));
      }

      const constants = this._children.filter((g) => g instanceof Constant);

      if (constants.length > 0) {
        ss.push("const global = new class {");
        for (const frame of constants) {
          ss.push(`  ${frame.compile(this.transform)}`);
        }
        ss.push("};");
      } else {
        ss.push("const global = new class {};");
      }

      for (const frame of this._children.filter(
        (g) => !(isSelector(g) || g instanceof Enum || g instanceof Constant),
      )) {
        ss.push(frame.compile(this.transform));
      }

      if (!this._children.some((g) => g instanceof MainFrame)) {
        const emptyMain = new MainFrame(this);
        ss.push(emptyMain.compile(this.transform));
      }

      result = ss.join("\r\n");

      this.hasTests = this._children.some((g) => g instanceof TestFrame);
    }
    return result;
  }

  async renderAsSource(): Promise<string> {
    const content = this.renderHashableContent();
    this.currentHash = await this.getHash(content);
    return `# ${this.currentHash} ${content}`;
  }

  compile(): string {
    const stdlib = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {`;
    return `${stdlib}\n${this.compileGlobals()}return [main, _tests];}`;
  }

  compileAsWorker(base: string, debugMode: boolean, standalone: boolean): string {
    this.updateBreakpoints(debugMode ? BreakpointEvent.activate : BreakpointEvent.disable);
    const onmsg = `addEventListener("message", async (e) => {
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
  if (e.data.type === "pause") {
    __pause = true;
  }
  });`;

    const imp = standalone ? "" : `import { StdLib } from "${base}/elan-api.js"; `;
    const stdlib = `${imp}let system; let _stdlib; let _tests = []; let __pause = false; async function program() { _stdlib = new StdLib(); system = _stdlib.system; system.stdlib = _stdlib  `;
    return `${stdlib}\n${this.compileGlobals()}return [main, _tests];}\n${onmsg}`;
  }

  compileAsTestWorker(base: string): string {
    this.updateBreakpoints(BreakpointEvent.disable);
    const onmsg = `onmessage = async (e) => {
  if (e.data.type === "start") {
    try {
      const [main, tests] = await program();
      const outcomes = await system.runTests(tests);
      postMessage({type : "test", value : outcomes});
    }
    catch (e) {
      postMessage({type : "status", status : "error", error : e});
    }
  }
};`;

    const stdlib = `import { StdLib } from "${base}/elan-api.js"; let system; let _stdlib; let _tests = []; async function program() { _stdlib = new StdLib(); system = _stdlib.system; system.stdlib = _stdlib  `;
    return `${stdlib}\n${this.compileGlobals()}return [main, _tests];}\n${onmsg}`;
  }

  renderHashableContent(): string {
    const globals = parentHelper_renderChildrenAsSource(this);
    const code = `${this.getVersionString()}${this.getUserName()}${this.getProfileName()} ${this.getParseStatusLabel()}\r\n\r\n${globals}`;
    return code.endsWith("\r\n") ? code : code + "\r\n"; // To accommodate possibility that last global is a global-comment
  }

  public getFirstSelectorAsDirectChild(): AbstractSelector {
    return this.getChildren().filter((g) => isSelector(g))[0];
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
  getRunStatusLabel(): string {
    const status = this.readRunStatus();
    return status === RunStatus.default ? "" : RunStatus[status];
  }
  getRunStatusColour(): string {
    return RunStatus[this._runStatus];
  }
  setRunStatus(s: RunStatus) {
    this._runStatus = s;
  }

  readParseStatus(): ParseStatus {
    return this._parseStatus;
  }
  getParseStatusLabel(): string {
    const status = this.readParseStatus();
    return status === ParseStatus.default ? "" : ParseStatus[status];
  }
  getParseStatusColour(): string {
    return DisplayColour[helper_parseStatusAsDisplayStatus(this._parseStatus)];
  }

  setTestStatus(s: TestStatus) {
    this._testStatus = s;
  }

  updateAllParseStatus(): void {
    this.getChildren().forEach((c) => c.updateParseStatus());
    this._parseStatus = worstParseStatus(
      this._parseStatus,
      parentHelper_readWorstParseStatusOfChildren(this),
    );
  }

  refreshParseAndCompileStatuses(compileIfParsed: boolean) {
    this._parseStatus = ParseStatus.default as ParseStatus;
    this.parseError = undefined;
    this.updateAllParseStatus();
    this.resetAllCompileStatusAndErrors();
    this.resetAllTestStatus();

    if (this._parseStatus === ParseStatus.valid && (!this._fieldBeingEdited || compileIfParsed)) {
      this.compile();
      this.updateAllCompileStatus();
    }
  }

  refreshTestStatuses(outcomes: [string, AssertOutcome[]][]) {
    if (this._compileStatus === CompileStatus.ok) {
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
  getCompileStatusLabel(): string {
    const status = this.readCompileStatus();
    return status === CompileStatus.default ? "" : CompileStatus[status].replace("_", " ");
  }
  getCompileStatusColour(): string {
    let status = DisplayColour.none;
    const parseStatus = helper_parseStatusAsDisplayStatus(this.readParseStatus());
    if (parseStatus === DisplayColour.ok) {
      status = helper_compileStatusAsDisplayStatus(this._compileStatus);
    }
    return DisplayColour[status];
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
    return this.hasTests ? this._testStatus : TestStatus.default;
  }
  getTestError(): Error | undefined {
    return this._testError;
  }
  getTestStatusLabel(): string {
    return this.getTestStatusColour() === "none" ? "" : TestStatus[this.readTestStatus()];
  }
  getTestStatusColour(): string {
    let status: DisplayColour;
    if (
      this.readParseStatus() !== ParseStatus.valid ||
      this.readCompileStatus() !== CompileStatus.ok
    ) {
      status = DisplayColour.none;
    } else {
      status = helper_testStatusAsDisplayStatus(this.readTestStatus());
    }
    return DisplayColour[status];
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
  createConcreteClass(): Frame {
    return new ConcreteClass(this);
  }
  createAbstractClass(): Frame {
    return new AbstractClass(this);
  }
  createInterface(): Frame {
    return new InterfaceFrame(this);
  }
  createRecord(): Frame {
    return new RecordFrame(this);
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

  getNextSelector(append?: boolean) {
    if (append) {
      const last = this.getLastChild();
      if (isSelector(last)) {
        return last as GlobalSelector;
      }

      parentHelper_insertOrGotoChildSelector(this, true, last);

      return this.getLastChild();
    }

    return this.getFirstSelectorAsDirectChild();
  }

  async parseFrom(source: CodeSource, append?: boolean): Promise<void> {
    if (!this._stdLibSymbols.isInitialised) {
      this.parseError = this._stdLibSymbols.error;
      this._parseStatus = ParseStatus.invalid;
      return;
    }
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
          this.getNextSelector(append).parseFrom(source);
        }
      }
      this.removeAllSelectorsThatCanBe();
      this.deselectAll();
      this.getFirstChild().select(true, false);
      this.updateAllParseStatus();
    } catch (e) {
      if (e instanceof ElanFileError) {
        this.parseError = e.message;
      } else {
        this.parseError = `Parse error before: ${source.getRemainingCode().substring(0, 100)}: ${e instanceof Error ? e.message : e}`;
      }
      this._parseStatus = ParseStatus.invalid;
    }
  }

  containsMain(): boolean {
    const mains = this.getChildren().filter((g) => isMain(g));
    return mains.length > 0;
  }

  async validateHash(fileHash: string, code: string) {
    if (this.isProduction && !this.allowAnyHeader) {
      const toHash = code.substring(code.indexOf("Elan"));
      const newHash = await this.getHash(toHash);

      if (fileHash !== newHash) {
        throw new ElanFileError(cannotLoadFile);
      }
    }
  }

  getPatch(patch: string): [number, string] {
    const tokens = patch.split("-");
    if (tokens.length === 1) {
      return [parseInt(tokens[0], 10), ""];
    }

    if (tokens.length === 2) {
      return [parseInt(tokens[0], 10), tokens[1]];
    }

    throw new ElanFileError(cannotLoadFile);
  }

  validateVersion(version: string) {
    if (this.isProduction && !this.allowAnyHeader) {
      const tokens = version.split(".");

      if (tokens.length !== 3) {
        throw new ElanFileError(cannotLoadFile);
      }

      const fileMajor = parseInt(tokens[0], 10);
      const fileMinor = parseInt(tokens[1], 10);
      const [filePatch, filePreRelease] = this.getPatch(tokens[2]);

      if (isNaN(fileMajor) || isNaN(fileMinor) || isNaN(filePatch)) {
        throw new ElanFileError(cannotLoadFile);
      }

      if (filePreRelease) {
        throw new ElanFileError(
          `${fileErrorPrefix} it was created in a pre-release version of Elan IDE`,
        );
      }

      if (fileMajor !== this.version.major) {
        throw new ElanFileError(
          `${fileErrorPrefix} it must be loaded into an Elan IDE version ${fileMajor}`,
        );
      }

      if (fileMinor > this.version.minor) {
        throw new ElanFileError(
          `${fileErrorPrefix} it must be loaded into an Elan IDE version ${fileMajor}.${fileMinor}`,
        );
      }
    }
  }

  async validateHeader(code: string) {
    if (!this.isEmpty(code)) {
      const eol = code.indexOf("\n");
      const header = code.substring(0, eol > 0 ? eol : undefined);
      const tokens = header.split(" ");
      if (tokens.length === 7 && tokens[0] === "#" && tokens[2] === "Elan") {
        await this.validateHash(tokens[1], code);
        this.validateVersion(tokens[3]);
        this.userName = tokens[4] ?? "guest";
      } else {
        throw new ElanFileError(cannotLoadFile);
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
      case "t": {
        if (e.modKey.alt) {
          this.removeAllSelectorsThatCanBe();
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

  resolveSymbol(id: string, transforms: Transforms, _initialScope: Scope): ElanSymbol {
    // unknown because of typescript quirk
    const globalSymbols = (this.getChildren().filter((c) => isSymbol(c)) as ElanSymbol[]).concat(
      elanSymbols,
    );
    const matches = globalSymbols.filter((s) => s.symbolId === id);

    if (matches.length === 1) {
      return matches[0];
    }
    if (matches.length > 1) {
      return new DuplicateSymbol(matches);
    }

    return this.libraryScope.resolveSymbol(id, transforms, this);
  }

  get libraryScope() {
    return this._stdLibSymbols;
  }

  updateBreakpoints(event: BreakpointEvent) {
    parentHelper_updateBreakpoints(this, event);
  }
}
