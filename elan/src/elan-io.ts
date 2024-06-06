export interface IElanConsole {
  printLine(line: string): void;

  readLine(): Promise<string>;
}
