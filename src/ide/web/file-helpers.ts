export class FileData {
  autoSaveFileHandle: FileSystemFileHandle | undefined = undefined;
  undoRedoFiles: string[] = [];
  previousFileIndex: number = -1;
  currentFileIndex: number = -1;
  nextFileIndex: number = -1;
  lastSavedHash = "";
  currentFieldId: string = "";
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
