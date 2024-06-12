export interface ElanInputOutput {
  printLine(line: string): void;

  readLine(): Promise<string>;

  clearConsole(): void;

  clearGraphics(): void;

  drawGraphics(html: string): void;

  readKey(): string;

  readKeyWithModifier(): [string, string];

  clearKeyBuffer(): void;
}
