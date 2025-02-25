export interface ElanInputOutput {
  print(text: string): Promise<void>;

  printLine(text: string): Promise<void>;

  printTab(position: number, text: string): Promise<void>;

  readLine(): Promise<string>;

  clearPrintedText(): Promise<void>;
  clearSystemInfo(): Promise<void>;

  drawBlockGraphics(html: string): Promise<void>;
  clearBlockGraphics(): Promise<void>;

  drawVectorGraphics(html: string): Promise<void>;
  clearVectorGraphics(): Promise<void>;

  clearAllGraphics(): Promise<void>;

  waitForAnyKey(): Promise<void>;

  getKey(): Promise<string>;

  getKeyWithModifier(): Promise<[string, string]>;

  clearKeyBuffer(): Promise<void>;

  readFile(): Promise<string>;

  writeFile(fileName: string, data: string): Promise<void>;
}
