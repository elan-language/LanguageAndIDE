/* eslint-disable @typescript-eslint/no-explicit-any */

import { AssertOutcome } from "../../compiler/assert-outcome";
import { StdLib } from "../../compiler/standard-library/std-lib";
import { TestStatus } from "../../compiler/test-status";
import { isElanProduction } from "../../environment";
import { CodeSourceFromString, FileImpl } from "../frames/file-impl";
import { isCollapsible, isFrame } from "../frames/frame-helpers";
import { CodeSource } from "../frames/frame-interfaces/code-source";
import { editorEvent } from "../frames/frame-interfaces/editor-event";
import { File, ParseMode } from "../frames/frame-interfaces/file";
import { Frame } from "../frames/frame-interfaces/frame";
import { Language } from "../frames/frame-interfaces/language";
import { Profile } from "../frames/frame-interfaces/profile";
import { Selectable } from "../frames/frame-interfaces/selectable";
import { LanguageElan } from "../frames/language-elan";
import { CompileStatus, ParseStatus, RunStatus } from "../frames/status-enums";
import { StubInputOutput } from "../stub-input-output";
import { FileManager } from "./file-manager";
import { TestRunner } from "./test-runner";
import {
  collapseAllMenus,
  cursorDefault,
  delayMessage,
  getEditorMsg,
  getFocused,
  getModKey,
  handleMenuArrowDown,
  handleMenuArrowUp,
  ICodeEditorViewModel,
  IIDEViewModel,
  isGlobalKeyboardEvent,
  isSupportedKey,
  removeFocussedClassFromAllTabs,
} from "./ui-helpers";
import { hash, transforms } from "./web-helpers";

const stdlib = new StdLib(new StubInputOutput());
const system = stdlib.system;
system.stdlib = stdlib; // to allow injection

export class CodeEditorViewModel implements ICodeEditorViewModel {
  private file?: File = undefined;
  private profile?: Profile = undefined;

  lastDOMEvent: Event | undefined;
  lastEditorEvent: editorEvent | undefined;

  private exporting: boolean = false;
  setExporting(e: boolean) {
    this.exporting = e;
  }

  isExporting() {
    return this.exporting;
  }

  get fileName() {
    return this.file!.fileName;
  }

  setProfile(p: Profile) {
    this.profile = p;
  }

  set fileName(fn: string) {
    this.file!.fileName = fn;
  }

  setRunStatus(s: RunStatus) {
    this.file?.setRunStatus(s);
  }

  getLanguage(): Language {
    return this.file!.language();
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
    return this.file!.getVersionString(this.file!.language().languageFullName);
  }

  refreshParseAndCompileStatuses(compileIfParsed: boolean) {
    return this.file!.refreshParseAndCompileStatuses(compileIfParsed);
  }

  get hasTests() {
    return this.file!.hasTests;
  }

  renderAsSource() {
    return this.file!.renderAsElanSource();
  }

  renderAsExport() {
    return this.file!.renderAsExport();
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

  recreateFile(vm: IIDEViewModel) {
    const existingLanguage = this.file?.language() ?? new LanguageElan();
    this.file = new FileImpl(hash, this.profile!, undefined, transforms(), stdlib);
    this.file.setLanguage(existingLanguage);
    vm.setDisplayLanguage(this.file?.language());
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

  updateFileName() {
    let fileName = prompt("Please enter your file name", this.fileName);

    if (fileName === null) {
      // cancelled
      return;
    }

    if (!fileName) {
      fileName = this.defaultFileName;
    }

    if (!fileName.endsWith(".elan")) {
      fileName = fileName + ".elan";
    }

    this.fileName = fileName;
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
            s?.onClick(true, false);
            // select all in range
            for (const ts of toSelect) {
              ts.onClick(false, true);
            }
            // select with focus clicked on frame
            s?.onClick(true, true);
          } else {
            s?.onClick(true, false);
          }
        } else {
          s?.onClick(true, false, e.selection);
        }
        return true;
      }
    }
    return false;
  }

  private readonly inactivityTimeout = 2000;
  private inactivityTimer: any | undefined = undefined;
  private purgingKeys = false;

  async inactivityRefresh(vm: IIDEViewModel, tr: TestRunner) {
    if (
      this.readRunStatus() !== RunStatus.running &&
      this.readParseStatus() === ParseStatus.valid &&
      this.readCompileStatus() === CompileStatus.default
    ) {
      await this.refreshAndDisplay(vm, tr, true, false);
    }

    this.inactivityTimer = setTimeout(() => this.inactivityRefresh(vm, tr), this.inactivityTimeout);
  }

  async handleKeyAndRender(e: editorEvent, vm: IIDEViewModel, tr: TestRunner) {
    if (this.readRunStatus() === RunStatus.running) {
      // no change while running
      return;
    }

    clearTimeout(this.inactivityTimer);

    this.inactivityTimer = setTimeout(() => this.inactivityRefresh(vm, tr), this.inactivityTimeout);

    try {
      let codeChanged = false;
      let isBeingEdited = false;
      collapseAllMenus();
      removeFocussedClassFromAllTabs();
      switch (e.type) {
        case "click":
          isBeingEdited = this.getFieldBeingEdited(); //peek at value as may be changed
          if (this.handleClick(e) && isBeingEdited) {
            await this.refreshAndDisplay(vm, tr, false, false);
          } else {
            await vm.renderAsHtml(false);
          }
          return;
        case "dblclick":
          isBeingEdited = this.getFieldBeingEdited(); //peek at value as may be changed
          if (this.handleDblClick(e) && isBeingEdited) {
            await this.refreshAndDisplay(vm, tr, false, false);
          } else {
            await vm.renderAsHtml(false);
          }
          return;
        case "paste":
        case "key":
          if (this.purgingKeys) {
            return;
          }
          const before = Date.now();
          codeChanged = this.handleKey(e);
          const after = Date.now();
          const delay = after - before;
          if (codeChanged === true) {
            if (delay >= 1000) {
              alert(delayMessage);
              e.key = "Backspace";
              this.handleKey(e);
              setTimeout(() => (this.purgingKeys = false), 500);
              this.purgingKeys = true;
            }
            const singleKeyEdit = !(e.modKey.control || e.modKey.shift || e.modKey.alt);
            await this.refreshAndDisplay(vm, tr, false, singleKeyEdit);
          } else if (codeChanged === false) {
            await vm.renderAsHtml(false);
          }
          // undefined just return
          return;
        case "contextmenu":
          codeChanged = this.handleKey(e);
          if (codeChanged) {
            await this.refreshAndDisplay(vm, tr, true, false);
          } else {
            await vm.renderAsHtml(false);
          }
          return;
      }
    } catch (e) {
      await vm.showError(e as Error, this.fileName, false);
    }
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
    vm.setDisplayLanguage(this.file?.language() ?? new LanguageElan());
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

  async resetFile(fm: FileManager, vm: IIDEViewModel, tr: TestRunner) {
    this.recreateFile(vm);
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

  async loadDemoFile(fileName: string, vm: IIDEViewModel, fm: FileManager, tr: TestRunner) {
    const f = await fetch(fileName, { mode: "same-origin" });
    const rawCode = await f.text();
    this.recreateFile(vm);
    this.fileName = fileName;
    fm.reset();
    await this.readAndParse(vm, fm, tr, rawCode, fileName, ParseMode.loadNew);
  }

  showCode() {
    collapseAllMenus();
    removeFocussedClassFromAllTabs();
    const focused = getFocused();
    if (focused) {
      focused.focus();
    } else {
      this.getFirstChild().select();
      getFocused()?.focus();
    }
  }

  async collapseContextMenu(vm: IIDEViewModel, tr: TestRunner) {
    const items = document.querySelectorAll(".context-menu-item") as NodeListOf<HTMLDivElement>;

    if (items.length > 0) {
      const id = items[0].dataset.id;
      const mk = { control: false, shift: false, alt: false };
      const msg = getEditorMsg("key", "frame", id, "Escape", mk, undefined, undefined, undefined);
      await this.handleKeyAndRender(msg, vm, tr);
    }
  }

  handlePaste(
    vm: IIDEViewModel,
    tr: TestRunner,
    fm: FileManager,
    event: Event,
    target: HTMLElement,
    msg: editorEvent,
  ): boolean {
    // outside of handler or selection is gone
    const start = target instanceof HTMLInputElement ? (target.selectionStart ?? 0) : 0;
    const end = target instanceof HTMLInputElement ? (target.selectionEnd ?? 0) : 0;
    target.addEventListener("paste", async (event: ClipboardEvent) => {
      const txt = await navigator.clipboard.readText();
      if (start !== end) {
        await this.handleEditorEvent(
          vm,
          tr,
          fm,
          event,
          "key",
          "frame",
          { control: false, shift: false, alt: false },
          msg.id,
          "Delete",
          [start, end],
        );
      }
      await this.handleEditorEvent(
        vm,
        tr,
        fm,
        event,
        "paste",
        "frame",
        { control: true, shift: false, alt: false },
        msg.id,
        "v",
        undefined,
        undefined,
        `${txt.trim()}`,
      );
    });
    event.stopPropagation();
    return true;
  }

  handleCut(
    vm: IIDEViewModel,
    tr: TestRunner,
    fm: FileManager,
    event: Event,
    target: HTMLInputElement,
    msg: editorEvent,
  ) {
    // outside of handler or selection is gone
    const start = target.selectionStart ?? 0;
    const end = target.selectionEnd ?? 0;
    target.addEventListener("cut", async (event: ClipboardEvent) => {
      const txt = document.getSelection()?.toString() ?? "";
      await navigator.clipboard.writeText(txt);
      const mk = { control: false, shift: false, alt: false };
      await this.handleEditorEvent(vm, tr, fm, event, "key", "frame", mk, msg.id, "Delete", [
        start,
        end,
      ]);
    });
    event.stopPropagation();
    return true;
  }

  handleCopy(event: Event, target: HTMLInputElement) {
    target.addEventListener("copy", async (_event: ClipboardEvent) => {
      const txt = document.getSelection()?.toString() ?? "";
      await navigator.clipboard.writeText(txt);
    });
    event.stopPropagation();
    return true;
  }

  handleCutAndPaste(
    vm: IIDEViewModel,
    tr: TestRunner,
    fm: FileManager,
    event: Event,
    msg: editorEvent,
  ) {
    if (msg.type === "paste") {
      return false;
    }

    if (msg.modKey.control && msg.key === "v") {
      return this.handlePaste(vm, tr, fm, event, event.target as HTMLElement, msg);
    }

    if (event.target instanceof HTMLInputElement && msg.modKey.control) {
      switch (msg.key) {
        case "x":
          return this.handleCut(vm, tr, fm, event, event.target, msg);
        case "c":
          return this.handleCopy(event, event.target);
      }
    }

    return false;
  }

  async handleEditorEvent(
    vm: IIDEViewModel,
    tr: TestRunner,
    fm: FileManager,
    event: Event,
    type: "key" | "click" | "dblclick" | "paste" | "contextmenu",
    target: "frame",
    modKey: { control: boolean; shift: boolean; alt: boolean },
    id?: string | undefined,
    key?: string | undefined,
    selection?: [number, number] | undefined,
    command?: string | undefined,
    optionalData?: string | undefined,
  ) {
    if (this.isRunningState()) {
      event?.preventDefault();
      event.stopPropagation();
      return;
    }

    if (isGlobalKeyboardEvent(event)) {
      return;
    }

    // save last dom event for debug
    this.lastDOMEvent = event;

    const msg = getEditorMsg(type, target, id, key, modKey, selection, command, optionalData);

    // save last editor event for debug
    this.lastEditorEvent = msg;

    if (!isSupportedKey(msg)) {
      // discard
      return;
    }

    if (this.isTestRunningState()) {
      tr.end();
      this.setTestStatus(TestStatus.default);
      console.info("tests cancelled in handleEditorEvent");
    }

    if (
      (await vm.handleEscape(msg, this, tr)) ||
      this.handleCutAndPaste(vm, tr, fm, event, msg) ||
      (await fm.handleUndoAndRedo(vm, event, msg))
    ) {
      return;
    }

    if (key === "Delete" && !selection && event.target instanceof HTMLInputElement) {
      const start = event.target.selectionStart ?? 0;
      const end = event.target.selectionEnd ?? 0;
      msg.selection = [start, end];
    }

    this.handleKeyAndRender(msg, vm, tr);
    event.preventDefault();
    event.stopPropagation();
  }

  async changeLanguage(l: Language, vm: IIDEViewModel, tr: TestRunner) {
    if (this.file?.setLanguage(l)) {
      vm.setDisplayLanguage(l);
      await this.refreshAndDisplay(vm, tr, true, false);
    }
  }

  async updateContent(
    text: string,
    editingField: boolean,
    vm: IIDEViewModel,
    fm: FileManager,
    tr: TestRunner,
  ) {
    this.setRunStatus(RunStatus.default);
    collapseAllMenus();
    const codeContainer = (document.querySelector(".elan-code") as HTMLDivElement)!;

    codeContainer.innerHTML = text;

    const frames = document.querySelectorAll(".elan-code [id]");

    for (const frame of frames) {
      const id = frame.id;

      frame.addEventListener("keydown", (event: Event) => {
        const ke = event as KeyboardEvent;
        this.handleEditorEvent(vm, tr, fm, event, "key", "frame", getModKey(ke), id, ke.key);
      });

      frame.addEventListener("click", (event) => {
        const pe = event as PointerEvent;
        const selectionStart = (event.target as HTMLInputElement).selectionStart ?? undefined;
        const selectionEnd = (event.target as HTMLInputElement).selectionEnd ?? undefined;

        const selection: [number, number] | undefined =
          selectionStart === undefined
            ? undefined
            : [selectionStart, selectionEnd ?? selectionStart];

        this.handleEditorEvent(
          vm,
          tr,
          fm,
          event,
          "click",
          "frame",
          getModKey(pe),
          id,
          undefined,
          selection,
        );
      });

      frame.addEventListener("mousedown", (event) => {
        // mousedown rather than click as click does not seem to pick up shift/ctrl click
        const me = event as MouseEvent;
        if (me.button === 0 && me.shiftKey) {
          // left button only
          this.handleEditorEvent(vm, tr, fm, event, "click", "frame", getModKey(me), id);
        }
      });

      frame.addEventListener("mousemove", (event) => {
        event.preventDefault();
      });

      frame.addEventListener("dblclick", (event) => {
        const ke = event as KeyboardEvent;
        this.handleEditorEvent(vm, tr, fm, event, "dblclick", "frame", getModKey(ke), id);
      });

      frame.addEventListener("contextmenu", (event) => {
        const mk = { control: false, shift: false, alt: false };
        this.handleEditorEvent(vm, tr, fm, event, "contextmenu", "frame", mk, id);
        event.preventDefault();
      });
    }

    function getInput() {
      return document.querySelector(".focused input") as HTMLInputElement;
    }

    const input = getInput();
    const focused = getFocused();

    codeContainer?.addEventListener("click", (event) => {
      if (this.isRunningState()) {
        event.preventDefault();
        event.stopPropagation();
        return;
      }

      this.showCode();
    });

    codeContainer.addEventListener("mousedown", (event) => {
      // to prevent codeContainer taking focus on a click
      if (this.isRunningState()) {
        event.preventDefault();
        event.stopPropagation();
      }
    });

    let firstContextItem: HTMLDivElement | undefined;

    if (document.querySelector(".context-menu")) {
      const items = document.querySelectorAll(".context-menu-item") as NodeListOf<HTMLDivElement>;

      firstContextItem = items[0];

      for (const item of items) {
        item.addEventListener("click", async (event) => {
          event.preventDefault();
          event.stopPropagation();
          const ke = event as PointerEvent | KeyboardEvent;
          const tgt = ke.target as HTMLDivElement;
          const id = tgt.dataset.id;
          const func = tgt.dataset.func;
          const txt = await navigator.clipboard.readText();
          this.handleEditorEvent(
            vm,
            tr,
            fm,

            event,
            "contextmenu",
            "frame",
            getModKey(ke),
            id,
            "ContextMenu",
            undefined,
            func,
            `${txt.trim()}`,
          );
        });

        item.addEventListener("keydown", (event) => {
          if (event.key === "ArrowUp") {
            handleMenuArrowUp();
            event.preventDefault();
            event.stopPropagation();
          } else if (event.key === "ArrowDown") {
            handleMenuArrowDown();
            event.preventDefault();
            event.stopPropagation();
          } else if (event.key === "Enter" || event.key === "Space") {
            const focusedItem = document.activeElement as HTMLElement;
            focusedItem?.click();
            event.preventDefault();
            event.stopPropagation();
          }
        });
      }
    }

    const helpLinks = document.querySelectorAll("el-help a");

    for (const item of helpLinks) {
      item.addEventListener("click", (event) => {
        if ((event.target as any).target === "help-iframe") {
          // can't use the load event as if the page is already loaded with url it doesn#t fore agaon so
          // no focus
          vm.clickHelpTab();
        }

        event.stopPropagation();
      });
    }

    if (firstContextItem) {
      firstContextItem.focus();
    } else if (input) {
      const cursorStart = input.dataset.cursorstart as string;
      const cursorEnd = input.dataset.cursorend as string;
      const startIndex = parseInt(cursorStart) as number;
      const endIndex = parseInt(cursorEnd) as number;
      const cursorIndex1 = Number.isNaN(startIndex) ? input.value.length : startIndex;
      const cursorIndex2 = Number.isNaN(endIndex) ? input.value.length : endIndex;

      input.setSelectionRange(cursorIndex1, cursorIndex2);
      input.focus();
    } else if (focused) {
      focused.focus();
    } else {
      codeContainer.focus();
    }

    if (document.querySelector(".autocomplete-popup")) {
      const items = document.querySelectorAll(".autocomplete-item");

      for (const item of items) {
        item.addEventListener("click", (event) => {
          const ke = event as PointerEvent;
          const tgt = ke.target as HTMLDivElement;
          const id = tgt.dataset.id;

          this.handleEditorEvent(
            vm,
            tr,
            fm,
            event,
            "key",
            "frame",
            getModKey(ke),
            id,
            "Enter",
            undefined,
            undefined,
            tgt.innerText,
          );
        });
      }

      const ellipsis = document.querySelectorAll(".autocomplete-ellipsis");

      if (ellipsis.length === 1) {
        ellipsis[0].addEventListener("click", (event) => {
          const ke = event as PointerEvent;
          const tgt = ke.target as HTMLDivElement;
          const id = tgt.dataset.id;
          const selected = tgt.dataset.selected;

          this.handleEditorEvent(
            vm,
            tr,
            fm,
            event,
            "key",
            "frame",
            getModKey(ke),
            id,
            "ArrowDown",
            undefined,
            undefined,
            selected,
          );
        });
      }
    }

    const activeHelp = document.querySelector("a.active") as HTMLLinkElement | undefined;

    if (activeHelp) {
      activeHelp.click();
    }

    const copiedSource = this.getCopiedSource();

    if (copiedSource.length > 0) {
      let allCode = "";

      for (const code of copiedSource) {
        if (allCode) {
          allCode = allCode + "\n" + code;
        } else {
          allCode = code;
        }
      }

      await navigator.clipboard.writeText(allCode);
    }

    await fm.save(this, focused, editingField, vm);
    vm.updateDisplayValues(this);

    if (!isElanProduction) {
      const dbgFocused = document.querySelectorAll(".focused");
      //debug check
      if (dbgFocused.length > 1) {
        let msg = "multiple focused ";
        dbgFocused.forEach((n) => (msg = `${msg}, Node: ${(n.nodeName, n.id)} `));
        await vm.showError(new Error(msg), this.fileName, false);
      }
    }

    cursorDefault();
  }
}
