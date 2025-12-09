import { File } from "../frames/frame-interfaces/file";
import { IIDEViewModel } from "./ui-helpers";

export class FileData {
  autoSaveFileHandle: FileSystemFileHandle | undefined = undefined;
  undoRedoFiles: string[] = [];
  previousFileIndex: number = -1;
  currentFileIndex: number = -1;
  nextFileIndex: number = -1;
  lastSavedHash = "";
  currentFieldId: string = "";
  undoRedoHash = "";
}

export function updateIndexes(indexJustUsed: number, fd: FileData) {
  fd.currentFileIndex = indexJustUsed;
  fd.nextFileIndex = indexJustUsed + 1;
  fd.nextFileIndex = fd.nextFileIndex > fd.undoRedoFiles.length - 1 ? -1 : fd.nextFileIndex;
  fd.previousFileIndex = indexJustUsed - 1;
  fd.previousFileIndex = fd.previousFileIndex < -1 ? -1 : fd.previousFileIndex;
}

export function canUndo(fd: FileData) {
  return fd.previousFileIndex > -1;
}

export function hasUnsavedChanges(fd: FileData, file: File) {
  return !(fd.lastSavedHash === file.currentHash);
}

// lock the file while we are writing and only hold a single most recent save
// accumulated while the file is locked.
let fileLock = false;
let pendingSave = "";

export async function writeCode(code: string, file: File, fd: FileData, vm: IIDEViewModel) {
  const fh = fd.autoSaveFileHandle!;
  const writeable = await fh.createWritable();
  await writeable.write(code);
  await writeable.close();
  fd.lastSavedHash = file.currentHash;
  const unsaved = hasUnsavedChanges(fd, file) ? " UNSAVED" : "";
  vm.updateFileName(unsaved);
  if (pendingSave) {
    const pendingCode = pendingSave;
    pendingSave = "";
    await writeCode(pendingCode, file, fd, vm);
  }
}

export async function autoSave(code: string, fd: FileData, file: File, vm: IIDEViewModel) {
  if (fd.autoSaveFileHandle && hasUnsavedChanges(fd, file)) {
    try {
      if (code.trim() === "") {
        // should never write empty file - always at least header
        throw new Error("Error with empty code file");
      }
      if (fileLock) {
        pendingSave = code;
      } else {
        fileLock = true;
        await writeCode(code, file, fd, vm);
        fileLock = false;
      }
    } catch (e) {
      const reason = (e as Error).message ?? "Unknown";
      const msg = `Auto-save failed. Auto-save mode has been cancelled - please save the file manually to ensure your changes are not lost! Reason: ${reason}`;
      alert(msg);
      fd.autoSaveFileHandle = undefined;
      fileLock = false;
      pendingSave = "";
      console.debug(`Autosave failed: error: ${e} code: ${code}`);
    }
  }
}
