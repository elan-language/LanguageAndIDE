import { AssertOutcome } from "../../../compiler/assert-outcome";
import { RootAstNode } from "../../../compiler/compiler-interfaces/root-ast-node";
import { Scope } from "../../../compiler/compiler-interfaces/scope";
import { Semver } from "../../../compiler/compiler-interfaces/semver";
import { BreakpointEvent } from "../../../compiler/debugging/breakpoint-event";
import { TestStatus } from "../../../compiler/test-status";
import { CompileStatus, ParseStatus, RunStatus } from "../status-enums";
import { CodeSource } from "./code-source";
import { editorEvent } from "./editor-event";
import { Frame } from "./frame";
import { Language } from "./language";
import { Parent } from "./parent";
import { Profile } from "./profile";
import { Selectable } from "./selectable";
import { StatementFactory } from "./statement-factory";

export enum ParseMode {
  loadNew,
  append,
  import,
}

export interface File extends Parent {
  isFile: boolean;
  getById(id: string): Selectable;
  renderAsHtml(): Promise<string>;
  renderAsElanSource(): Promise<string>;
  renderAsExport(): Promise<string>;

  compile(): string;

  compileAsWorker(base: string, debugMode: boolean, standalone: boolean): string;

  compileAsTestWorker(base: string): string;

  fileName: string;
  readonly defaultFileName: string;

  addChildBefore(g: Frame, before: Frame): void;
  addChildAfter(g: Frame, after: Frame): void;

  getMap(): Map<string, Selectable>;
  getNextId(): number;
  getFactory(): StatementFactory;
  getProfile(): Profile;

  indent(): string;
  expandCollapseAll(): void;

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
  updateAllTestStatus(): void;
  resetAllTestStatus(): void;

  readRunStatus(): RunStatus;
  getRunStatusLabel(): string;
  getRunStatusColour(): string;

  //Internal use only
  createMain(): Frame;
  createFunction(): Frame;
  createProcedure(): Frame;
  createEnum(): Frame;
  createConcreteClass(): Frame;
  createAbstractClass(): Frame;
  createInterface(): Frame;
  createRecord(): Frame;
  createGlobalComment(): Frame;
  createConstant(): Frame;
  createTest(): Frame;

  parseFrom(source: CodeSource): Promise<void>;

  containsMain(): boolean;

  parseError?: string;

  deselectAll(): void;
  processKey(e: editorEvent): boolean;

  setRunStatus(s: RunStatus): void;

  setTestStatus(s: TestStatus): void;

  libraryScope: Scope;

  refreshParseAndCompileStatuses(compileIfParsed: boolean): void;

  refreshTestStatuses(outcomes: [string, AssertOutcome[]][]): void;

  setFieldBeingEdited(value: boolean): void;
  getFieldBeingEdited(): boolean;
  getTestError(): Error | undefined;

  getFrNo(): string;
  removeAllSelectorsThatCanBe(): void;
  currentHash: string;
  hasTests: boolean;

  updateBreakpoints(event: BreakpointEvent): void;

  getVersion(): Semver;
  getVersionString(): string;

  getAst(invalidate: boolean): RootAstNode | undefined;

  addCopiedSource(source: string): void;

  getCopiedSource(): string[];

  deleteAllGhosted(): void;

  setLanguage(l: Language): boolean;
  language(): Language;
}
