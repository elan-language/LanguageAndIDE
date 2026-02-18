/* eslint-disable @typescript-eslint/no-explicit-any */

import { editorEvent } from "../frames/frame-interfaces/editor-event";
import { ParseMode } from "../frames/frame-interfaces/file";
import { LanguageElan } from "../frames/language-elan";
import { ParseStatus } from "../frames/status-enums";
import { TestRunner } from "./test-runner";
import { cursorWait, ICodeEditorViewModel, IIDEViewModel, lastDirId } from "./ui-helpers";
import { encodeCode } from "./web-helpers";

export class FileManager {
  private autoSaveFileHandle: FileSystemFileHandle | undefined = undefined;
  private undoRedoFiles: string[] = [];
  private previousFileIndex: number = -1;
  private currentFileIndex: number = -1;
  private nextFileIndex: number = -1;
  private lastSavedHash = "";
  private currentFieldId: string = "";
  private undoRedoHash = "";
  private undoRedoing: boolean = false;
  // lock the file while we are writing and only hold a single most recent save
  // accumulated while the file is locked.
  private fileLock = false;
  private pendingSave = "";

  isAutosaving() {
    return !!this.autoSaveFileHandle;
  }

  canUndo() {
    return this.previousFileIndex > -1;
  }

  canRedo() {
    return this.nextFileIndex > -1;
  }

  hasUnsavedChanges(cvm: ICodeEditorViewModel) {
    return !(this.lastSavedHash === cvm.currentHash);
  }

  async save(
    cvm: ICodeEditorViewModel,
    field: HTMLElement | undefined,
    editingField: boolean,
    vm: IIDEViewModel,
  ) {
    let code = "";
    const newFieldId = editingField ? field?.id : undefined;
    const parseStatus = cvm.readParseStatus();

    if (parseStatus === ParseStatus.valid || parseStatus === ParseStatus.incomplete) {
      // save to local store

      if (this.undoRedoHash !== cvm.currentHash && !this.undoRedoing) {
        if (this.nextFileIndex !== -1 && this.nextFileIndex > this.currentFileIndex) {
          const trimedIds = this.undoRedoFiles.slice(this.nextFileIndex);
          this.undoRedoFiles = this.undoRedoFiles.slice(0, this.nextFileIndex);

          for (const id of trimedIds) {
            localStorage.removeItem(id);
          }
        }
        code = await cvm.renderAsSource();
        const timestamp = Date.now();
        const overWriteLastEntry = newFieldId === this.currentFieldId;
        const id = overWriteLastEntry
          ? this.undoRedoFiles[this.currentFileIndex]
          : `${cvm.fileName}.${timestamp}`;

        if (!overWriteLastEntry) {
          this.undoRedoFiles.push(id);
        }

        this.previousFileIndex = this.undoRedoFiles.length > 1 ? this.undoRedoFiles.length - 2 : -1;
        this.currentFileIndex = this.undoRedoFiles.length - 1;
        this.nextFileIndex = -1;

        localStorage.setItem(id, code);
        //saveButton.classList.add("unsaved");
        this.undoRedoHash = cvm.currentHash;
        this.currentFieldId = newFieldId ?? "";

        while (this.undoRedoFiles.length >= 20) {
          const toTrim = this.undoRedoFiles[0];
          this.undoRedoFiles = this.undoRedoFiles.slice(1);
          localStorage.removeItem(toTrim);
        }
      }

      // autosave if setup
      code = code || (await cvm.renderAsSource());
      await this.autoSave(code, cvm, vm);
    }

    this.undoRedoHash = cvm.currentHash;
    this.undoRedoing = false;
  }

  async undo(vm: IIDEViewModel) {
    if (this.canUndo()) {
      const indexToUse = this.previousFileIndex;
      await this.replaceCode(indexToUse, "Undoing...", vm);
    }
  }

  async redo(vm: IIDEViewModel) {
    if (this.canRedo()) {
      await this.replaceCode(this.nextFileIndex, "Redoing...", vm);
    }
  }

  reset() {
    this.autoSaveFileHandle = undefined;
    this.previousFileIndex = this.nextFileIndex = this.currentFileIndex = -1;
    localStorage.clear();
    this.undoRedoFiles = [];
    this.lastSavedHash = "";
    this.currentFieldId = "";
    this.undoRedoHash = "";
  }

  async chromeSave(cvm: ICodeEditorViewModel, code: string, updateName: boolean, newName?: string) {
    const name = newName ?? cvm.fileName;
    const html = name.endsWith(".html");
    const nameWithoutExt = name.slice(0, name.lastIndexOf("."));
    const language = cvm.isExporting() ? cvm.getLanguage() : new LanguageElan();
    const ext = html ? "html" : language.defaultFileExtension;
    const mime = html ? "text/html" : language.defaultMimeType;

    const type = { [mime]: `.${ext}` } as any;

    const fh = await showSaveFilePicker({
      suggestedName: `${nameWithoutExt}.${ext}`,
      startIn: "documents",
      types: [{ accept: type }],
      id: lastDirId,
    });

    if (updateName) {
      cvm.fileName = fh.name;
    }

    const writeable = await fh.createWritable();
    await writeable.write(code);
    await writeable.close();
    return fh;
  }

  async doAutoSave(cvm: ICodeEditorViewModel, vm: IIDEViewModel) {
    if (this.isAutosaving()) {
      this.autoSaveFileHandle = undefined;
      vm.updateDisplayValues(cvm);
    } else {
      const code = await cvm.renderAsSource();
      this.autoSaveFileHandle = await this.chromeSave(cvm, code, true);
      this.resetHash(cvm);
      await vm.renderAsHtml(false);
    }
  }

  async doDownLoad(cvm: ICodeEditorViewModel, vm: IIDEViewModel) {
    const isSaving = !cvm.isExporting();
    const code = isSaving ? await cvm.renderAsSource() : await cvm.renderAsExport();
    await this.chromeSave(cvm, code, isSaving);
    if (isSaving) {
      this.resetHash(cvm);
      await vm.renderAsHtml(false);
    }
  }

  getLastCodeVersion() {
    const id = this.undoRedoFiles[this.undoRedoFiles.length - 1];
    return localStorage.getItem(id) || "";
  }

  updateHash(cvm: ICodeEditorViewModel) {
    this.lastSavedHash = this.lastSavedHash || cvm.currentHash;
  }

  resetHash(cvm: ICodeEditorViewModel) {
    this.lastSavedHash = cvm.currentHash;
  }

  async saveAsStandAlone(cvm: ICodeEditorViewModel) {
    let jsCode = cvm.compileAsWorker("", false, true);

    const api = await (await fetch("elan-api.js", { mode: "same-origin" })).text();
    let script = await (await fetch("standalone.js", { mode: "same-origin" })).text();
    let html = await (await fetch("standalone.html", { mode: "same-origin" })).text();
    const cssColour = await (await fetch("colourScheme.css", { mode: "same-origin" })).text();
    const cssStyle = await (await fetch("elanStyle.css", { mode: "same-origin" })).text();
    const cssIde = await (await fetch("ide.css", { mode: "same-origin" })).text();

    jsCode = api + jsCode;

    const asUrl = encodeCode(jsCode);

    script = script.replace("injected_code", asUrl);
    html = html.replace("injected_code", script);
    html = html.replace("injected_colour_css", cssColour);
    html = html.replace("injected_style_css", cssStyle);
    html = html.replace("injected_ide_css", cssIde);

    await this.chromeSave(cvm, html, false, "standalone.html");
  }

  private async writeCode(code: string, cvm: ICodeEditorViewModel, vm: IIDEViewModel) {
    const fh = this.autoSaveFileHandle!;
    const writeable = await fh.createWritable();
    await writeable.write(code);
    await writeable.close();
    this.lastSavedHash = cvm.currentHash;
    const unsaved = this.hasUnsavedChanges(cvm) ? " UNSAVED" : "";
    vm.updateFileName(unsaved);
    if (this.pendingSave) {
      const pendingCode = this.pendingSave;
      this.pendingSave = "";
      await this.writeCode(pendingCode, cvm, vm);
    }
  }

  private updateIndexes(indexJustUsed: number) {
    this.currentFileIndex = indexJustUsed;
    this.nextFileIndex = indexJustUsed + 1;
    this.nextFileIndex =
      this.nextFileIndex > this.undoRedoFiles.length - 1 ? -1 : this.nextFileIndex;
    this.previousFileIndex = indexJustUsed - 1;
    this.previousFileIndex = this.previousFileIndex < -1 ? -1 : this.previousFileIndex;
  }

  private async autoSave(code: string, cvm: ICodeEditorViewModel, vm: IIDEViewModel) {
    if (this.autoSaveFileHandle && this.hasUnsavedChanges(cvm)) {
      try {
        if (code.trim() === "") {
          // should never write empty file - always at least header
          throw new Error("Error with empty code file");
        }
        if (this.fileLock) {
          this.pendingSave = code;
        } else {
          this.fileLock = true;
          await this.writeCode(code, cvm, vm);
          this.fileLock = false;
        }
      } catch (e) {
        const reason = (e as Error).message ?? "Unknown";
        const msg = `Auto-save failed. Auto-save mode has been cancelled - please save the file manually to ensure your changes are not lost! Reason: ${reason}`;
        alert(msg);
        this.autoSaveFileHandle = undefined;
        this.fileLock = false;
        this.pendingSave = "";
        console.debug(`Autosave failed: error: ${e} code: ${code}`);
      }
    }
  }

  private async replaceCode(indexToUse: number, msg: string, vm: IIDEViewModel) {
    const id = this.undoRedoFiles[indexToUse];
    this.updateIndexes(indexToUse);
    const code = localStorage.getItem(id);
    // reset so changes on same field after this will be seen
    this.currentFieldId = "";
    if (code) {
      vm.disableUndoRedoButtons(msg);
      this.undoRedoing = true;
      await vm.updateFileAndCode(code);
    }
  }

  async openWorksheet() {
    try {
      const [fileHandle] = await window.showOpenFilePicker({
        startIn: "documents",
        types: [{ accept: { "text/html": ".html" } }],
        id: lastDirId,
      });
      const codeFile = await fileHandle.getFile();

      const url = URL.createObjectURL(codeFile);
      window.open(url, "worksheet-iframe")?.focus();
    } catch (_e) {
      // user cancelled
      return;
    }
  }

  async handleUndoAndRedo(vm: IIDEViewModel, event: Event, msg: editorEvent) {
    if (msg.modKey.control) {
      switch (msg.key) {
        case "z":
          event.stopPropagation();
          await this.undo(vm);
          return true;
        case "y":
          event.stopPropagation();
          await this.redo(vm);
          return true;
      }
    }

    return false;
  }

  async doGenericDownload(cvm: ICodeEditorViewModel, vm: IIDEViewModel, fm: FileManager) {
    const isSaving = !cvm.isExporting();
    const language = isSaving ? new LanguageElan() : cvm.getLanguage();
    cvm.updateFileName(`.${language.defaultFileExtension}`);
    const code = isSaving ? await cvm.renderAsSource() : await cvm.renderAsExport();
    const blob = new Blob([code], { type: "plain/text" });
    const aElement = document.createElement("a");
    aElement.setAttribute("download", cvm.fileName!);
    const href = URL.createObjectURL(blob);
    aElement.href = href;
    aElement.setAttribute("target", "_blank");
    aElement.click();
    URL.revokeObjectURL(href);
    //saveButton.classList.remove("unsaved");
    fm.resetHash(cvm);
    await vm.renderAsHtml(false);
  }

  async handleChromeUploadOrAppend(
    mode: ParseMode,
    cvm: ICodeEditorViewModel,
    vm: IIDEViewModel,
    tr: TestRunner,
  ) {
    try {
      const [fileHandle] = await window.showOpenFilePicker({
        startIn: "documents",
        types: [{ accept: { "text/elan": ".elan" } }],
        id: lastDirId,
      });
      const codeFile = await fileHandle.getFile();
      const fileName = mode === ParseMode.loadNew ? codeFile.name : cvm.fileName;
      const rawCode = await codeFile.text();
      if (mode === ParseMode.loadNew) {
        cvm.recreateFile(vm);
        this.reset();
      }
      await cvm.readAndParse(vm, this, tr, rawCode, fileName, mode);
    } catch (_e) {
      // user cancelled
      return;
    }
  }

  async handleUploadOrAppend(
    event: Event,
    mode: ParseMode,
    cvm: ICodeEditorViewModel,
    vm: IIDEViewModel,
    tr: TestRunner,
  ) {
    const elanFile = (event.target as any).files?.[0] as any;

    if (elanFile) {
      const fileName = mode === ParseMode.loadNew ? elanFile.name : cvm.fileName;
      cursorWait();
      await vm.clearDisplays();
      const reader = new FileReader();
      reader.addEventListener("load", async (event: any) => {
        const rawCode = event.target.result;
        if ((mode = ParseMode.loadNew)) {
          cvm.recreateFile(vm);
          this.reset();
        }
        await cvm.readAndParse(vm, this, tr, rawCode, fileName, mode);
      });
      reader.readAsText(elanFile);
    }
  }
}
