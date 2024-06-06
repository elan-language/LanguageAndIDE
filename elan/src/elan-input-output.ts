export interface ElanInputOutput {
  printLine(line: string): void;

  readLine(): Promise<string>;

  clearGraphics(): void;

  drawGraphics(html: string): void;
}
