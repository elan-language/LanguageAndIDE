import { AssertOutcome } from "../../../compiler/assert-outcome";
import { RootAstNode } from "../../../compiler/compiler-interfaces/root-ast-node";
import { Scope } from "../../../compiler/compiler-interfaces/scope";
import { Semver } from "../../../compiler/compiler-interfaces/semver";
import { BreakpointEvent } from "../../../compiler/debugging/breakpoint-event";
import { TestStatus } from "../../../compiler/test-status";
import { Paradigm } from "../paradigm";
import { CompileStatus, ParseStatus, RunStatus } from "../status-enums";
import { CodeSource } from "./code-source";
import { editorEvent } from "./editor-event";
import { Frame } from "./frame";
import { Language } from "./language";
import { Selectable } from "./selectable";

export enum ParseMode {
  loadNew,
  append,
  import,
}

export interface File {
  // called from INSIDE the frame hierarchy - TODO do these need to be here or can they be on the proposed ProgramFrame?
  getNextId(): number;
  setFieldBeingEdited(value: boolean): void;
  getFrNo(): string;
  updateBreakpoints(event: BreakpointEvent): void;
  addCopiedSource(source: string): void;
  deleteAllGhosted(): void;
  setLanguageToElan(): void;
  getShowCompletion(): boolean; // TODO see also showCompletion method below - are these different?

  //Called from INSIDE and OUTSIDE
  getFirstChild(): Frame; // TODO rename to getFirstGlobal ?
  getMap(): Map<string, Selectable>;
  getParadigm(): Paradigm;
  containsMain(): boolean;
  removeAllSelectorsThatCanBe(): void;
  setLanguage(l: Language): boolean; // TODO: review - used only for live language switching?
  language(): Language;

  // called from OUTSIDE the frame hierarchy
  getById(id: string): Selectable;
  renderAsHtmlPromise(): Promise<string>;
  renderAsElanSourcePromise(): Promise<string>;
  renderAsExportPromise(): Promise<string>;
  compileAsWorker(base: string, debugMode: boolean, standalone: boolean): string;
  compileAsTestWorker(base: string): string;
  fileName: string;
  readonly defaultFileName: string;
  addChild(g: Frame): void; // TODO rename to addGlobal ?
  setParadigm(p: Paradigm): void;
  expandCollapseAll(): void;
  getAst(invalidate: boolean): RootAstNode | undefined; //TODO - this is a smell!

  readParseStatus(): ParseStatus;
  getParseStatusLabel(): string;
  getParseStatusColour(): string;
  updateAllParseStatus(): void;
  readCompileStatus(): CompileStatus;
  getCompileStatusLabel(): string;
  getCompileStatusColour(): string;
  updateAllCompileStatus(): void;
  resetAllCompileStatusAndErrors(): void;
  readTestStatus(): TestStatus;
  getTestStatusLabel(): string;
  getTestStatusColour(): string;
  setTestStatus(s: TestStatus): void;
  updateAllTestStatus(): void;
  resetAllTestStatus(): void;
  readRunStatus(): RunStatus;
  getRunStatusLabel(): string;
  getRunStatusColour(): string;
  setRunStatus(s: RunStatus): void;
  refreshParseAndCompileStatuses(compileIfParsed: boolean): void;
  refreshTestStatuses(outcomes: [string, AssertOutcome[]][]): void;
  getTestError(): Error | undefined;

  parseFrom(source: CodeSource): Promise<void>;
  parseError?: string;
  deselectAll(): void;
  processKey(e: editorEvent): boolean;
  libraryScope: Scope;
  getFieldBeingEdited(): boolean;
  currentHash: string;
  hasTests: boolean;
  getVersion(): Semver;
  getVersionString(lang: string): string;
  getCopiedSource(): string[];
  showCompletion(show: boolean): void;
  addParseError(msg: string): void;
}
