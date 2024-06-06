export interface ElanInputOutput {
  printLine(line: string): void;

  readLine(): Promise<string>;
}
