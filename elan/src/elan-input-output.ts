export interface ElanInputOutput {
  printLine(line: string): void;

  readLine(): Promise<string>;

  clearConsole(): void;

  clearGraphics(): void;

  drawGraphics(html: string): void;

  getKeystroke(): string;

  getKeystrokeWithModifier(): [string, string];

  clearKeyBuffer(): void;
}
