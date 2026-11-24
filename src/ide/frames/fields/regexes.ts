export class Regexes {
  static readonly newLine = /^\r?\n/;
  static readonly anythingToNewLineAsString = "^[^\r\n]*";
  static readonly anythingToNewLineAsRegExp = /^[^\r\n]*/;
  static readonly indent = /^\s*/;
  static readonly compilerDirective = /^\[[A-Za-z]+\]\s/;
  static readonly identifier = /^\s*(([a-z][a-zA-Z0-9_]*)|(_[a-zA-Z0-9_]+))/;
}
