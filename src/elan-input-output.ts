export interface ElanInputOutput {
  print(text: string): void;

  printLine(text: string): void;

  printTab(position: number, text: string): void;

  readLine(): Promise<string>;

  clearConsole(): void;

  drawBlockGraphics(html: string): void;
  clearBlockGraphics(): void;

  drawVectorGraphics(html: string): void;
  clearVectorGraphics(): void;

  clearAllGraphics(): void;

  waitForAnyKey(): Promise<void>;

  getKey(): Promise<string>;

  getKeyWithModifier(): Promise<[string, string]>;

  clearKeyBuffer(): void;

  readFile(): Promise<string>;

  writeFile(fileName: string, data: string): Promise<void>;
}
