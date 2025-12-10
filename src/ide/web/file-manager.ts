import { ParseStatus } from "../frames/status-enums";
import { ICodeEditorViewModel, IIDEViewModel } from "./ui-helpers";
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

  hasUnsavedChanges(file: ICodeEditorViewModel) {
    return !(this.lastSavedHash === file.currentHash);
  }

  async save(
    file: ICodeEditorViewModel,
    field: HTMLElement | undefined,
    editingField: boolean,
    vm: IIDEViewModel,
  ) {
    let code = "";
    const newFieldId = editingField ? field?.id : undefined;
    const parseStatus = file.readParseStatus();

    if (parseStatus === ParseStatus.valid || parseStatus === ParseStatus.incomplete) {
      // save to local store

      if (this.undoRedoHash !== file.currentHash && !this.undoRedoing) {
        if (this.nextFileIndex !== -1 && this.nextFileIndex > this.currentFileIndex) {
          const trimedIds = this.undoRedoFiles.slice(this.nextFileIndex);
          this.undoRedoFiles = this.undoRedoFiles.slice(0, this.nextFileIndex);

          for (const id of trimedIds) {
            localStorage.removeItem(id);
          }
        }
        code = await file.renderAsSource();
        const timestamp = Date.now();
        const overWriteLastEntry = newFieldId === this.currentFieldId;
        const id = overWriteLastEntry
          ? this.undoRedoFiles[this.currentFileIndex]
          : `${file.fileName}.${timestamp}`;

        if (!overWriteLastEntry) {
          this.undoRedoFiles.push(id);
        }

        this.previousFileIndex = this.undoRedoFiles.length > 1 ? this.undoRedoFiles.length - 2 : -1;
        this.currentFileIndex = this.undoRedoFiles.length - 1;
        this.nextFileIndex = -1;

        localStorage.setItem(id, code);
        //saveButton.classList.add("unsaved");
        this.undoRedoHash = file.currentHash;
        this.currentFieldId = newFieldId ?? "";

        while (this.undoRedoFiles.length >= 20) {
          const toTrim = this.undoRedoFiles[0];
          this.undoRedoFiles = this.undoRedoFiles.slice(1);
          localStorage.removeItem(toTrim);
        }
      }

      // autosave if setup
      code = code || (await file.renderAsSource());
      await this.autoSave(code, file, vm);
    }

    this.undoRedoHash = file.currentHash;
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

  async chromeSave(
    file: ICodeEditorViewModel,
    code: string,
    updateName: boolean,
    newName?: string,
  ) {
    const name = newName ?? file.fileName;
    const html = name.endsWith(".html");
    const lastDirId = "elan-files";

    const fh = await showSaveFilePicker({
      suggestedName: name,
      startIn: "documents",
      types: html ? [{ accept: { "text/html": ".html" } }] : [{ accept: { "text/elan": ".elan" } }],
      id: lastDirId,
    });

    if (updateName) {
      file.fileName = fh.name;
    }

    const writeable = await fh.createWritable();
    await writeable.write(code);
    await writeable.close();
    return fh;
  }

  async doAutoSave(file: ICodeEditorViewModel, vm: IIDEViewModel) {
    if (this.isAutosaving()) {
      this.autoSaveFileHandle = undefined;
      vm.updateDisplayValues(file);
    } else {
      const code = await file.renderAsSource();
      this.autoSaveFileHandle = await this.chromeSave(file, code, true);
      this.resetHash(file);
      await vm.renderAsHtml(false);
    }
  }

  async doDownLoad(file: ICodeEditorViewModel, vm: IIDEViewModel) {
    const code = await file.renderAsSource();
    await this.chromeSave(file, code, true);
    this.resetHash(file);
    await vm.renderAsHtml(false);
  }

  getLastCodeVersion() {
    const id = this.undoRedoFiles[this.undoRedoFiles.length - 1];
    return localStorage.getItem(id) || "";
  }

  updateHash(file: ICodeEditorViewModel) {
    this.lastSavedHash = this.lastSavedHash || file.currentHash;
  }

  resetHash(file: ICodeEditorViewModel) {
    this.lastSavedHash = file.currentHash;
  }

  async saveAsStandAlone(file: ICodeEditorViewModel) {
    let jsCode = file.compileAsWorker("", false, true);

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

    await this.chromeSave(file, html, false, "standalone.html");
  }

  private async writeCode(code: string, file: ICodeEditorViewModel, vm: IIDEViewModel) {
    const fh = this.autoSaveFileHandle!;
    const writeable = await fh.createWritable();
    await writeable.write(code);
    await writeable.close();
    this.lastSavedHash = file.currentHash;
    const unsaved = this.hasUnsavedChanges(file) ? " UNSAVED" : "";
    vm.updateFileName(unsaved);
    if (this.pendingSave) {
      const pendingCode = this.pendingSave;
      this.pendingSave = "";
      await this.writeCode(pendingCode, file, vm);
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

  private async autoSave(code: string, file: ICodeEditorViewModel, vm: IIDEViewModel) {
    if (this.autoSaveFileHandle && this.hasUnsavedChanges(file)) {
      try {
        if (code.trim() === "") {
          // should never write empty file - always at least header
          throw new Error("Error with empty code file");
        }
        if (this.fileLock) {
          this.pendingSave = code;
        } else {
          this.fileLock = true;
          await this.writeCode(code, file, vm);
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
}
