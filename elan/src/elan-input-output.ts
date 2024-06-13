export interface ElanInputOutput {
  printLine(line: string): void;

  readLine(): Promise<string>;

  clearConsole(): void;

  clearGraphics(): void;

  drawGraphics(html: string): void;

  getKeypress(): string;

  getKeypressWithModifier(): [string, string];

  clearKeyBuffer(): void;
}
