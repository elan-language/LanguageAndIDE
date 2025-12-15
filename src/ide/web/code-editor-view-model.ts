import { AssertOutcome } from "../../compiler/assert-outcome";
import { StdLib } from "../../compiler/standard-library/std-lib";
import { TestStatus } from "../../compiler/test-status";
import { CodeSourceFromString, FileImpl } from "../frames/file-impl";
import { isCollapsible, isFrame } from "../frames/frame-helpers";
import { CodeSource } from "../frames/frame-interfaces/code-source";
import { editorEvent } from "../frames/frame-interfaces/editor-event";
import { File, ParseMode } from "../frames/frame-interfaces/file";
import { Frame } from "../frames/frame-interfaces/frame";
import { Profile } from "../frames/frame-interfaces/profile";
import { Selectable } from "../frames/frame-interfaces/selectable";
import { CompileStatus, ParseStatus, RunStatus } from "../frames/status-enums";
import { StubInputOutput } from "../stub-input-output";
import { FileManager } from "./file-manager";
import { TestRunner } from "./test-runner";
import { ICodeEditorViewModel, IIDEViewModel } from "./ui-helpers";
import { hash, transforms } from "./web-helpers";

const stdlib = new StdLib(new StubInputOutput());
const system = stdlib.system;
system.stdlib = stdlib; // to allow injection

export class CodeEditorViewModel implements ICodeEditorViewModel {
  private file?: File = undefined;

  get fileName() {
    return this.file!.fileName;
  }

  set fileName(fn: string) {
    this.file!.fileName = fn;
  }

  setRunStatus(s: RunStatus) {
    this.file?.setRunStatus(s);
  }

  getRunStatusLabel() {
    return this.file!.getRunStatusLabel();
  }
  getRunStatusColour() {
    return this.file!.getRunStatusColour();
  }
  readParseStatus() {
    return this.file!.readParseStatus();
  }
  readCompileStatus() {
    return this.file!.readCompileStatus();
  }
  readRunStatus() {
    return this.file!.readRunStatus();
  }
  readTestStatus() {
    return this.file!.readTestStatus();
  }

  setTestStatus(ts: TestStatus) {
    this.file!.setTestStatus(ts);
  }

  getParseStatusColour() {
    return this.file!.getParseStatusColour();
  }
  getParseStatusLabel() {
    return this.file!.getParseStatusLabel();
  }
  getCompileStatusColour() {
    return this.file!.getCompileStatusColour();
  }
  getCompileStatusLabel() {
    return this.file!.getCompileStatusLabel();
  }
  getTestStatusColour() {
    return this.file!.getTestStatusColour();
  }
  getTestStatusLabel() {
    return this.file!.getTestStatusLabel();
  }

  containsMain() {
    return this.file!.containsMain();
  }

  renderAsHtml() {
    return this.file!.renderAsHtml();
  }

  removeAllSelectorsThatCanBe() {
    this.file!.removeAllSelectorsThatCanBe();
  }

  expandCollapseAll() {
    this.file!.expandCollapseAll();
  }

  getVersionString() {
    return this.file!.getVersionString();
  }

  refreshParseAndCompileStatuses(compileIfParsed: boolean) {
    return this.file!.refreshParseAndCompileStatuses(compileIfParsed);
  }

  get hasTests() {
    return this.file!.hasTests;
  }

  renderAsSource() {
    return this.file!.renderAsSource();
  }

  parseFrom(source: CodeSource) {
    return this.file!.parseFrom(source);
  }

  get parseError() {
    return this.file!.parseError;
  }

  get defaultFileName() {
    return this.file!.defaultFileName;
  }

  getCopiedSource() {
    return this.file!.getCopiedSource();
  }

  getFieldBeingEdited() {
    return this.file!.getFieldBeingEdited();
  }

  getFirstChild() {
    return this.file!.getFirstChild();
  }

  recreateFile(profile: Profile, userName: string | undefined) {
    this.file = new FileImpl(hash, profile, userName, transforms(), stdlib);
  }

  get currentHash() {
    return this.file!.currentHash;
  }

  compileAsWorker(base: string, debugMode: boolean, standalone: boolean): string {
    return this.file!.compileAsWorker(base, debugMode, standalone);
  }

  compileAsTestWorker(base: string): string {
    return this.file!.compileAsTestWorker(base);
  }

  refreshTestStatuses(outcomes: [string, AssertOutcome[]][]): void {
    this.file?.refreshTestStatuses(outcomes);
  }

  getTestError(): Error | undefined {
    return this.file!.getTestError();
  }

  getById(id: string): Selectable {
    return this.file!.getById(id);
  }

  getMap(): Map<string, Selectable> {
    return this.file!.getMap();
  }

  processKey(e: editorEvent): boolean {
    return this.file!.processKey(e);
  }

  isRunningState() {
    return (
      this.readRunStatus() === RunStatus.running ||
      this.readRunStatus() === RunStatus.paused ||
      this.readRunStatus() === RunStatus.input
    );
  }

  handleKey(e: editorEvent) {
    switch (e.key) {
      case "Shift":
        break; //Short circuit repeat from modifier held-down before other key
      case "Control":
        break;
      case "Alt":
        break;
      default: {
        if (e.target === "frame") {
          return this.getById(e.id!).processKey(e);
        } else {
          return this.processKey(e);
        }
      }
    }
    return false;
  }

  handleDblClick(e: editorEvent) {
    switch (e.target) {
      case "frame": {
        const s = this.getById(e.id!);
        if (isCollapsible(s)) {
          s.expandCollapse();
        }
        return true;
      }
    }
    return false;
  }

  handleClick(e: editorEvent) {
    switch (e.target) {
      case "frame": {
        const s = this.getById(e.id!);

        if (e.modKey.shift && isFrame(s)) {
          const parent = s.getParent();
          // all current selections with same parent
          const curSel = this.getAllSelected().filter(
            (i) => isFrame(i) && i.getParent() === parent,
          );

          if (curSel.length > 0) {
            const toSelect = new Set<Selectable>();

            for (const cs of curSel) {
              const range = parent.getChildRange(cs as Frame, s);
              const fr = range.filter((c) => c);

              if (range.length !== fr.length) {
                console.warn(
                  `getChildRange returned undefined element - cs: ${cs?.constructor?.name}  s: ${s?.constructor?.name}`,
                );
              }

              for (const r of fr) {
                toSelect.add(r);
              }
            }

            // this should clear all other selections
            s?.select(true, false);
            // select all in range
            for (const ts of toSelect) {
              ts.select(false, true);
            }
            // select with focus clicked on frame
            s?.select(true, true);
          } else {
            s?.select(true, false);
          }
        } else {
          s?.select(true, false, e.selection);
        }
        return true;
      }
    }
    return false;
  }

  async refreshAndDisplay(
    vm: IIDEViewModel,
    tr: TestRunner,
    compileIfParsed: boolean,
    editingField: boolean,
  ) {
    try {
      this.refreshParseAndCompileStatuses(compileIfParsed);
      const cs = this.readCompileStatus();
      if ((cs === CompileStatus.ok || cs === CompileStatus.advisory) && this.hasTests) {
        await tr.run(this, vm);
      }
      await vm.renderAsHtml(editingField);
    } catch (e) {
      await vm.showError(e as Error, this.fileName, false);
    }
  }

  private getAllSelected() {
    const v = this.getMap().values();
    return [...v].filter((s) => s.isSelected());
  }

  async initialDisplay(fm: FileManager, vm: IIDEViewModel, tr: TestRunner, reset: boolean) {
    await vm.clearDisplays();

    const ps = this.readParseStatus();
    if (ps === ParseStatus.valid || ps === ParseStatus.default || ps === ParseStatus.incomplete) {
      await this.refreshAndDisplay(vm, tr, false, false);
      fm.updateHash(this);
      vm.updateNameAndSavedStatus(this, fm);
      if (reset) {
        const code = await this.renderAsSource();
        vm.postCodeResetToWorksheet(code);
      }
    } else {
      const msg = this.parseError || "Failed load code";
      await vm.showError(new Error(msg), this.fileName, reset);
    }
  }

  async resetFile(
    fm: FileManager,
    vm: IIDEViewModel,
    tr: TestRunner,
    profile: Profile,
    userName: string | undefined,
  ) {
    this.recreateFile(profile, userName);
    await this.initialDisplay(fm, vm, tr, false);
  }

  async displayFile(fm: FileManager, vm: IIDEViewModel, tr: TestRunner) {
    await this.initialDisplay(fm, vm, tr, true);
  }

  async readAndParse(
    vm: IIDEViewModel,
    fm: FileManager,
    tr: TestRunner,
    rawCode: string,
    fileName: string,
    mode: ParseMode,
  ) {
    const reset = mode === ParseMode.loadNew;
    const code = new CodeSourceFromString(rawCode);
    code.mode = mode;
    this.fileName = fileName;
    try {
      await this.parseFrom(code);
      if (this.parseError) {
        throw new Error(this.parseError);
      }
      await this.initialDisplay(fm, vm, tr, reset);
    } catch (e) {
      await vm.showError(e as Error, fileName, reset);
    }
  }

  async displayCode(vm: IIDEViewModel, tr: TestRunner, rawCode: string, fileName: string) {
    const code = new CodeSourceFromString(rawCode);
    code.mode = ParseMode.loadNew;
    try {
      await this.parseFrom(code);
      this.fileName = fileName || this.defaultFileName;
      await this.refreshAndDisplay(vm, tr, true, false);
    } catch (e) {
      await vm.showError(e as Error, fileName || this.defaultFileName, true);
    }
  }

  isTestRunningState() {
    return this.readTestStatus() === TestStatus.running;
  }

  isPausedState() {
    return this.readRunStatus() === RunStatus.paused;
  }

  async loadDemoFile(
    fileName: string,
    profile: Profile,
    userName: string | undefined,
    vm: IIDEViewModel,
    fm: FileManager,
    tr: TestRunner,
  ) {
    const f = await fetch(fileName, { mode: "same-origin" });
    const rawCode = await f.text();
    this.recreateFile(profile, userName);
    this.fileName = fileName;
    fm.reset();
    await this.readAndParse(vm, fm, tr, rawCode, fileName, ParseMode.loadNew);
  }
}
