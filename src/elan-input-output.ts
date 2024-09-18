export interface ElanInputOutput {
  print(text: string): void;

  printLine(text: string): void;

  printTab(position: number, text: string): void;

  readLine(): Promise<string>;

  clearConsole(): void;

  clearGraphics(): void;

  drawGraphics(html: string): void;

  getKeystroke(): Promise<string>;

  getKeystrokeWithModifier(): Promise<[string, string]>;

  clearKeyBuffer(): void;
}
