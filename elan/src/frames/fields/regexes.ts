export class Regexes {

    static readonly newLine = /^\r?\n/;
    static readonly anythingToNewLineAsString = "^[^\r\n]*";
    static readonly anythingToNewLineAsRegExp = /^[^\r\n]*/;
    static readonly comment = /# [^\r\n]*/;
    static readonly indent =/^\s*/;
    static readonly ifClause = /^if[^\S\r\n]/;
    static readonly identifier =/^\s*[a-z]\w*/;
    static readonly literalInt =/^\s*[0-9]+/;
    static readonly negatableLitInt = /^-?[0-9]+/;
    static readonly charValue =/[^']/;
    static readonly stringContent = /^[^"]*/;
}