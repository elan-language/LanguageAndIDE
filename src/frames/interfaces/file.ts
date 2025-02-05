import { AssertOutcome } from "../../system";
import { CodeSource } from "../code-source";
import { CompileError } from "../compile-error";
import { editorEvent } from "../interfaces/editor-event";
import { ScratchPad } from "../scratch-pad";
import {
  BreakpointStatus,
  CompileStatus,
  ParseStatus,
  RunStatus,
  TestStatus,
} from "../status-enums";
import { Frame } from "./frame";
import { Parent } from "./parent";
import { Profile } from "./profile";
import { Scope } from "./scope";
import { Selectable } from "./selectable";
import { StatementFactory } from "./statement-factory";

export interface File extends Parent {
  isFile: boolean;
  getById(id: string): Selectable;
  renderAsHtml(): Promise<string>;
  renderAsSource(): Promise<string>;
  compile(): string;

  compileAsWorker(base: string): string;

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
  readParseStatusForDashboard(): string;
  updateAllParseStatus(): void;

  readCompileStatus(): CompileStatus;
  readCompileStatusForDashboard(): string;
  updateAllCompileStatus(): void;
  resetAllCompileStatusAndErrors(): void;

  readTestStatus(): TestStatus;
  readTestStatusForDashboard(): string;
  updateAllTestStatus(): void;
  resetAllTestStatus(): void;

  readRunStatus(): RunStatus;
  readRunStatusForDashboard(): string;

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

  aggregateCompileErrors(): CompileError[];

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

  updateBreakpoints(newState: BreakpointStatus): void;
}
