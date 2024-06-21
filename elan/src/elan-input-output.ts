export interface ElanInputOutput {
  print(text: string): void;

  printLine(text: string): void;

  readLine(): Promise<string>;

  clearConsole(): void;

  clearGraphics(): void;

  drawGraphics(html: string): void;

  getKeystroke(): string;

  getKeystrokeWithModifier(): [string, string];

  clearKeyBuffer(): void;
}
