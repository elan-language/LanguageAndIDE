export class Regexes {
  static readonly newLine = /^\r?\n/;
  static readonly anythingToNewLineAsString = "^[^\r\n]*";
  static readonly anythingToNewLineAsRegExp = /^[^\r\n]*/;
  static readonly comment = /# [^\r\n]*/;
  static readonly indent = /^\s*/;
  static readonly ifClause = /^if[^\S\r\n]/;
  static readonly intoClause = /^into[^\S\r\n]/;
  static readonly identifier = /^\s*[a-z]\w*/;
  static readonly literalInt = /^\s*[0-9]+/;
  static readonly negatableLitInt = /^\s*-?((0b[0-1]+)|(0x[0-9a-fA-F]+)|([0-9]+))/;
  static readonly negatableLitFloat = /^\s*-?[0-9]+\.[0-9]+((e|E)-?[0-9]+)?/;
  static readonly charValue = /[^']/;
  static readonly nonEmptyStringContent = /^[^{"]+/;
  static readonly leadingSpaceNotNL = /^[^\S\r\n]+/;
  static readonly anythingExceptUnescapedForwardSlash = /^([^\/\\]|\\.)+/;
  static readonly flags = /^[dgimsuvy]*/;
  static readonly whiteSpaceButNotNewline = /[^\S\r\n]/;
  static readonly url =
    /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&\/=]*)/;
}
