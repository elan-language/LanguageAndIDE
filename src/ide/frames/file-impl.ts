import { AssertOutcome } from "../../compiler/assert-outcome";
import { CompileMode, RootAstNode } from "../../compiler/compiler-interfaces/root-ast-node";
import { Semver } from "../../compiler/compiler-interfaces/semver";
import { BreakpointEvent } from "../../compiler/debugging/breakpoint-event";
import { StdLib } from "../../compiler/standard-library/std-lib";
import { StdLibSymbols } from "../../compiler/standard-library/std-lib-symbols";
import { TestStatus } from "../../compiler/test-status";
import { elanVersion, isElanProduction } from "../../environment";
import { Transforms } from "../compile-api/transforms";
import { ElanFileError } from "../elan-file-error";
import { AbstractSelector } from "./abstract-selector";
import { CodeSourceFromString } from "./code-source-from-string";
import { Regexes } from "./fields/regexes";
import {
  expandCollapseAll,
  helper_compileStatusAsDisplayStatus,
  helper_parseStatusAsDisplayStatus,
  helper_testStatusAsDisplayStatus,
  isMain,
  isSelector,
} from "./frame-helpers";
import { CodeSource } from "./frame-interfaces/code-source";
import { editorEvent } from "./frame-interfaces/editor-event";
import { Field } from "./frame-interfaces/field";
import { File, ParseMode } from "./frame-interfaces/file";
import { Frame } from "./frame-interfaces/frame";
import { Language } from "./frame-interfaces/language";
import { Parent } from "./frame-interfaces/parent";
import { defaultUsername, Profile } from "./frame-interfaces/profile";
import { Selectable } from "./frame-interfaces/selectable";
import { StatementFactory } from "./frame-interfaces/statement-factory";
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
import { LanguageElan } from "./language-elan";
import { LanguagePython } from "./language-python";
import {
  parentHelper_addChildAfter,
  parentHelper_addChildBefore,
  parentHelper_copySelectedChildren,
  parentHelper_deleteSelectedChildren,
  parentHelper_getChildAfter,
  parentHelper_getChildBefore,
  parentHelper_getChildRange,
  parentHelper_getFirstChild,
  parentHelper_getLastChild,
  parentHelper_insertOrGotoChildSelector,
  parentHelper_moveSelectedChildrenDownOne,
  parentHelper_moveSelectedChildrenUpOne,
  parentHelper_readWorstCompileStatusOfChildren,
  parentHelper_readWorstParseStatusOfChildren,
  parentHelper_removeChild,
  parentHelper_renderChildrenAsHtml,
  parentHelper_renderChildrenAsSource,
  parentHelper_updateBreakpoints,
  setGhostOnSelectedChildren,
  worstParseStatus,
} from "./parent-helpers";
import { StatementFactoryImpl } from "./statement-factory-impl";
import { CompileStatus, DisplayColour, ParseStatus, RunStatus } from "./status-enums";

// for web editor bundle
export { CodeSourceFromString };

export const fileErrorPrefix = `Cannot load file:`;
export const parseErrorPrefix = `Parse error before:`;

export const cannotLoadInvalidHashFile = `${fileErrorPrefix} Elan header does not match the code below. The file might have been created or modified outside Elan IDE.`;
export const cannotLoadInvalidFile = `${fileErrorPrefix} code does not begin with a valid Elan header, so cannot be loaded.`;
export const cannotLoadEmptyFile = `${fileErrorPrefix} no code found to load.`;
export const cannotLoadFile = `${fileErrorPrefix} it has been created or modified outside Elan IDE`;
export const cannotLoadUnparseableFile = `${fileErrorPrefix} cannot parse code`;

export class FileImpl implements File {
  currentHash: string = "";
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
  private _children: Array<Frame> = new Array<Frame>();
  private _map: Map<string, Selectable>;
  private _factory: StatementFactory;
  private allowAnyHeader: boolean = false;
  private _stdLibSymbols: StdLibSymbols;
  private _nextId: number = 0;
  private _testError?: Error;
  private _frNo: number = 0;
  private _showFrameNos: boolean = true;
  ast: RootAstNode | undefined;

  private copiedSource: string[] = [];

  constructor(
    private readonly hash: (toHash: string) => Promise<string>,
    private readonly profile: Profile,
    private userName: string | undefined,
    private readonly transform: Transforms,
    stdLib: StdLib,
    allowAnyHeader?: boolean,
  ) {
    this._stdLibSymbols = new StdLibSymbols(stdLib);
    this._map = new Map<string, Selectable>();
    this._factory = new StatementFactoryImpl();
    const selector = new GlobalSelector(this);
    this.getChildren().push(selector);
    selector.select(true, false);
    if (allowAnyHeader) {
      this.allowAnyHeader = allowAnyHeader;
    }
  }

  addCopiedSource(source: string): void {
    this.copiedSource.push(source);
  }

  getCopiedSource(): string[] {
    const ss = this.copiedSource;
    this.copiedSource = [];
    return ss;
  }

  private version = elanVersion;
  private isProduction = isElanProduction;

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

  getProfile(): Profile {
    return this.profile;
  }

  getChildren(): Frame[] {
    return this._children;
  }

  get hasTests() {
    return this._children.some((g) => g instanceof TestFrame && !g.isGhosted());
  }

  deleteSelectedChildren(): void {
    parentHelper_deleteSelectedChildren(this);
  }

  copySelectedChildren(): boolean {
    return parentHelper_copySelectedChildren(this);
  }

  moveSelectedChildrenUpOne(): void {
    parentHelper_moveSelectedChildrenUpOne(this);
  }
  moveSelectedChildrenDownOne(): void {
    parentHelper_moveSelectedChildrenDownOne(this);
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

  getById(id: string): Selectable {
    return this._map.get(id) as Selectable;
  }

  getIdPrefix(): string {
    return "file";
  }

  private frNo = 1;

  public async renderAsHtml(withHeader: boolean = true): Promise<string> {
    this._frNo = 1;
    const globals = parentHelper_renderChildrenAsHtml(this);
    this.currentHash = await this.getHash();
    return withHeader
      ? `<el-header># ${this.getHashAsHtml()} ${this.getVersionAsHtml()} ${this.getUserNameAsHtml()} ${this.getProfileNameAsHtml()}</el-header>\r\n${globals}`
      : globals;
  }

  public indent(): string {
    return "";
  }

  private async getHash(body?: string): Promise<string> {
    body = (body || this.renderHashableContent()).trim().replaceAll("\r", "");
    return await this.hash(body);
  }

  getVersion(): Semver {
    return this.version;
  }

  getSemverString() {
    const v = this.getVersion();
    const suffix = v.preRelease === "" ? "" : `-${v.preRelease}`;

    return `${v.major}.${v.minor}.${v.patch}${suffix}`;
  }

  getVersionString() {
    return `Elan ${this.getSemverString()}`;
  }

  getVersionAsHtml() {
    const v = this.getVersionString();
    return `<el-version>${v}</el-version>`;
  }

  getHashAsHtml() {
    return `<el-hash>${this.currentHash}</el-hash>`;
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
    return this.userName ? this.userName : defaultUsername;
  }

  private getUserNameAsHtml() {
    const cls = this.profile.show_user_and_profile ? "show" : "hide";
    const userName = this.getUserName();
    return `<el-user class="${cls}">${userName}</el-user>`;
  }

  private getProfileName() {
    const pn = this.profile.name.replaceAll(" ", "_");
    return pn ? pn : "_";
  }

  private getProfileNameAsHtml() {
    const cls = this.profile.show_user_and_profile ? "show" : "hide";
    const profileName = this.getProfileName();
    return `<el-profile class="${cls}">${profileName}</el-profile>`;
  }

  async renderAsSource(): Promise<string> {
    const content = this.renderHashableContent();
    this.currentHash = await this.getHash(content);
    return `# ${this.currentHash} ${content}`;
  }

  getAst(invalidate: boolean): RootAstNode | undefined {
    if (!this.ast || invalidate) {
      this.ast = this.transform.transform(this, "", undefined) as RootAstNode | undefined;
    }
    return this.ast;
  }

  compile(): string {
    return this.getAst(true)?.compile() ?? "";
  }

  compileAsWorker(base: string, debugMode: boolean, standalone: boolean): string {
    const ast = this.getAst(true);
    const mode = debugMode
      ? CompileMode.debugWorker
      : standalone
        ? CompileMode.standaloneWorker
        : CompileMode.worker;
    ast?.setCompileOptions(mode, base);

    return ast?.compile() ?? "";
  }

  compileAsTestWorker(base: string): string {
    const ast = this.getAst(true);
    ast?.setCompileOptions(CompileMode.testWorker, base);

    return ast?.compile() ?? "";
  }

  renderHashableContent(): string {
    const globals = parentHelper_renderChildrenAsSource(this);
    const code = `${this.getVersionString()} ${this.getUserName()} ${this.getProfileName()} ${this.getParseStatusLabel()}\r\n\r\n${globals}`;
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
  private getFirstNonImportedChild(): Frame {
    const globals = this.getChildren();
    const nonImported = globals.filter((g) => !g.isImported());
    return nonImported.length > 0 ? nonImported[0] : this.getLastChild();
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
    this._parseStatus = ParseStatus.default as ParseStatus;
    this.updateAllParseStatus();
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
    try {
      this._parseStatus = ParseStatus.default as ParseStatus;
      this.parseError = undefined;
      this.updateAllParseStatus();
      this.resetAllCompileStatusAndErrors();
      this.resetAllTestStatus();
    } catch (e) {
      this._parseStatus = ParseStatus.invalid;
      throw e;
    }
    try {
      if (this._parseStatus === ParseStatus.valid && (!this._fieldBeingEdited || compileIfParsed)) {
        this.compile();
        this.updateAllCompileStatus();
      }
    } catch (e) {
      this._compileStatus = CompileStatus.error;
      throw e;
    }
  }

  refreshTestStatuses(outcomes: [string, AssertOutcome[]][]) {
    if (
      this._compileStatus === CompileStatus.ok ||
      this._compileStatus === CompileStatus.advisory
    ) {
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
    this._compileStatus = parentHelper_readWorstCompileStatusOfChildren(this);
  }

  resetAllCompileStatusAndErrors(): void {
    this.ast = undefined;
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
    const cs = this.readCompileStatus();
    if (cs === CompileStatus.ok || cs === CompileStatus.advisory) {
      status = helper_testStatusAsDisplayStatus(this.readTestStatus());
    } else {
      status = DisplayColour.none;
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
      .filter((c) => c instanceof TestFrame && !c.isGhosted())
      .map((c) => c as TestFrame);
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

  getNextSelector(mode: ParseMode) {
    let frame: Frame;
    if (mode === ParseMode.append) {
      frame = this.getLastChild();
      return isSelector(frame)
        ? (frame as GlobalSelector)
        : parentHelper_insertOrGotoChildSelector(this, true, frame);
    } else if (mode === ParseMode.import) {
      frame = this.getFirstNonImportedChild();
      return isSelector(frame)
        ? (frame as GlobalSelector)
        : parentHelper_insertOrGotoChildSelector(this, false, frame);
    } else {
      return this.getFirstSelectorAsDirectChild();
    }
  }

  parseBodyFrom(source: CodeSource): void {
    try {
      while (source.hasMoreCode()) {
        if (source.isMatchRegEx(Regexes.newLine)) {
          source.removeNewLine();
        } else {
          this.getNextSelector(source.mode).parseFrom(source);
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

  async parseFrom(source: CodeSource): Promise<void> {
    if (!this._stdLibSymbols.isInitialised) {
      this.parseError = this._stdLibSymbols.error;
      this._parseStatus = ParseStatus.invalid;
      return;
    }
    try {
      this.parseError = undefined;
      this._parseStatus = ParseStatus.default;
      if (source.getRemainingCode().trim() === "") {
        throw new ElanFileError(cannotLoadEmptyFile);
      }

      await this.validateHeader(source.getRemainingCode());
      if (source.isMatch("#")) {
        source.removeRegEx(Regexes.comment, false);
        source.removeRegEx(Regexes.newLine, false);
        source.removeRegEx(Regexes.newLine, false);
      }
      this.parseBodyFrom(source);
    } catch (e) {
      if (e instanceof ElanFileError) {
        this.parseError = e.message;
      } else {
        this.parseError = `${parseErrorPrefix} ${source.getRemainingCode().substring(0, 100)}: ${e instanceof Error ? e.message : e}`;
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
        throw new ElanFileError(cannotLoadInvalidHashFile);
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
        throw new ElanFileError(cannotLoadInvalidFile);
      }

      const fileMajor = parseInt(tokens[0], 10);
      const fileMinor = parseInt(tokens[1], 10);
      const [filePatch] = this.getPatch(tokens[2]);

      if (isNaN(fileMajor) || isNaN(fileMinor) || isNaN(filePatch)) {
        throw new ElanFileError(cannotLoadInvalidFile);
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
        this.validateVersion(tokens[3]);
        await this.validateHash(tokens[1], code);
        this.userName = tokens[4] ?? defaultUsername;
      } else {
        throw new ElanFileError(cannotLoadInvalidFile);
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

  private controlKeys = ["O"];

  processKey(e: editorEvent): boolean {
    if (e.modKey.control && !this.controlKeys.includes(e.key ?? "")) {
      return false;
    }

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

  // for testing only
  setSymbols(testSymbols: StdLibSymbols) {
    this._stdLibSymbols = testSymbols;
  }

  get libraryScope() {
    return this._stdLibSymbols;
  }

  updateBreakpoints(event: BreakpointEvent) {
    parentHelper_updateBreakpoints(this, event);
  }

  isGhostedOrWithinAGhostedFrame(): boolean {
    return false;
  }

  isWithinAnImportedFrame(): boolean {
    return false;
  }

  isImported(): boolean {
    return false;
  }

  ghostSelectedChildren(): void {
    setGhostOnSelectedChildren(this, true);
  }
  unghostSelectedChildren(): void {
    setGhostOnSelectedChildren(this, false);
  }

  deleteAllGhosted(): void {
    for (const frame of this._children) {
      frame.deleteAllGhosted();
    }
  }

  annotation(): string {
    return "";
  }

  displayLanguage(): Language {
    //TODO: temporary hard-wired solution - eventually to be picked up from IDE
    const elan = new LanguageElan();
    const python = new LanguagePython();
    return true ? elan : python;
  }

  sourceLanguage(): Language {
    //TODO: temporary hard-wired solution - eventually to be picked up from IDE
    const elan = new LanguageElan();
    const python = new LanguagePython();
    return true ? elan : python;
  }
}
