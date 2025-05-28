import { AssertOutcome } from "../../assert-outcome";

import { editorEvent } from "../interfaces/editor-event";
import { ScratchPad } from "../scratch-pad";
import {
  BreakpointEvent,
  CompileStatus,
  ParseStatus,
  RunStatus,
  TestStatus,
} from "../status-enums";
import { SymbolCompletionSpec } from "../symbol-completion-helpers";
import { CodeSource } from "./code-source";
import { ElanSymbol } from "./elan-symbol";
import { Frame } from "./frame";
import { Parent } from "./parent";
import { Profile } from "./profile";
import { Scope } from "./scope";
import { Selectable } from "./selectable";
import { Semver } from "./semver";
import { StatementFactory } from "./statement-factory";

export interface File extends Parent {
  isFile: boolean;
  getById(id: string): Selectable;
  renderAsHtml(): Promise<string>;
  renderAsSource(): Promise<string>;
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
  getScratchPad(): ScratchPad;

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

  parseFrom(source: CodeSource, append?: boolean): Promise<void>;

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

  filteredSymbols(spec: SymbolCompletionSpec, htmlId: string): ElanSymbol[];
}
