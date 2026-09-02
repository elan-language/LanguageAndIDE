


lexer grammar Elan2_Lexer;

// TODO: need to have reserved words from ALL langs defined in Lexer to test that we aren't unknowingly using them somewhere else
// e.g. use of 'set' for a method name

// START RefLang_Lexer
ABSTRACT: 'abstract';
AND: 'and';
AS: 'as';
ASSERT: 'assert';
ASSIGN: 'assign';
BE: 'be';
CALL: 'call';
CATCH: 'catch';
CLASS: 'class';
CONSTANT: 'constant';
CONSTRUCTOR: 'constructor';
COPY: 'copy';
DIV: 'div';
ELIF: 'elif';
ELSE: 'else';
END: 'end';
ENUM: 'enum';
EVALUATES: 'evaluates';
FOR: 'for';
FROM: 'from';
FUNCTION: 'function';
IF: 'if';
IN: 'in';
INHERITS: 'inherits';
INPUT: 'input';
LAMBDA: 'lambda';
LET: 'let';
MAIN: 'main';
MOD: 'mod';
NEW: 'new';
NOT: 'not';
OF: 'of';
OR: 'or';
PRINT: 'print';
PRIVATE: 'private';
PROCEDURE: 'procedure';
PROPERTY: 'property';
RETURN: 'return';
RETURNS: 'returns';
SET: 'set';
STEP: 'step';
TEST: 'test';
THEN: 'then';
THIS: 'this';
THROW: 'throw';
TO: 'to';
TRY: 'try';
VARIABLE: 'variable';
WHILE: 'while';

INT_NAME: 'Int';
FLOAT_NAME: 'Float';
BOOL_NAME: 'Boolean';
STRING_NAME: 'String';
LIST_NAME: 'List';

COMMENT: '#' ~( '\r' | '\n')*;
LIT_BOOLEAN:
    'true'
    | 'false'
; // In other langs, the casing may be different

EQUAL: 'is';
NOT_EQUAL: 'isnt';
ARROW: '=>';
POWER: '^';

BINARY_PREFIX: '0b';
HEX_PREFIX: '0x';
INTERPOLATED_STRING_PREFIX: '$';
// END RefLang_Lexer

// START ELAN2_Lexer:
WS: [ \t]+ -> skip;
NL: [\r\n\f]+;

SINGLE_EQUALS: '=';
OPEN_BRACE: '{';
CLOSE_BRACE: '}';
OPEN_SQ_BRACKET: '[';
CLOSE_SQ_BRACKET: ']';
OPEN_BRACKET: '(';
CLOSE_BRACKET: ')';
DOT: '.';
COMMA: ',';
COLON: ':';
PLUS: '+';
MINUS: '-';
MULT: '*';
DIVIDE: '/';
LT: '<';
GT: '>';
LE: '<=';
GE: '>=';
DOUBLE_QUOTES: '"';

IF_:
    'if_'
; // Temporary solution - to be replaced by language-specific implementation

NAME_STARTING_TEST_: 'test_' IdentifierPartCharacter*;
NAME_STARTING_LC: UnicodeClassLL IdentifierPartCharacter*;
NAME_STARTING_UC: UnicodeClassLU IdentifierPartCharacter*;

LITERAL_BINARY: BINARY_PREFIX [01]+;
LITERAL_HEX: HEX_PREFIX [0-9A-Fa-f]+;
LITERAL_INTEGER: [0-9] [0-9]*;

LITERAL_FLOAT:
    LITERAL_INTEGER DOT LITERAL_INTEGER ExponentPart?
;
INTERPOLATED_STRING:
    INTERPOLATED_STRING_PREFIX '"' (~["\u0085] | CommonCharacter)* '"'
;
// INTERPOLATED_STRING - a temp kludge pending full node-parsing of interpolated string - must precede:
LITERAL_STRING: '"' (~["\u0085] | CommonCharacter)* '"';

WHITESPACES: (Whitespace)+ -> skip;
TEXT: CommonCharacter+;

GHOSTED: '[ghosted]';

fragment InputCharacter: ~[\r\n\u0085];

fragment NewLineCharacter:
    '\u000D' // Carriage Return
    | '\u000A' // Line Feed 
    | '\u0085' // Next Line 
;

fragment ExponentPart: [e] (PLUS | MINUS)? LITERAL_INTEGER;

fragment CommonCharacter:
    SimpleEscapeSequence
    | HexEscapeSequence
    | UnicodeEscapeSequence
;

fragment SimpleEscapeSequence:
    '\\\''
    | '\\"'
    | '\\\\'
    | '\\0'
    | '\\a'
    | '\\b'
    | '\\f'
    | '\\n'
    | '\\r'
    | '\\t'
    | '\\v'
;

fragment HexEscapeSequence:
    '\\x' HexDigit
    | '\\x' HexDigit HexDigit
    | '\\x' HexDigit HexDigit HexDigit
    | '\\x' HexDigit HexDigit HexDigit HexDigit
;

fragment NewLine: '\r\n' | '\r' | '\n' | '\u0085';

fragment Whitespace:
    UnicodeClassZS //'<Any Character With Unicode Class Zs>'
    | '\u0009' // Horizontal Tab 
    | '\u000B' // Vertical Tab
    | '\u000C' // Form Feed
;

fragment UnicodeClassZS:
    '\u0020' // SPACE
    | '\u00A0' // NO_BREAK SPACE
;

fragment IdentifierStartingUCorLC: (
        UnicodeClassLL
        | UnicodeClassLU
    ) IdentifierPartCharacter*
;

fragment IdentifierPartCharacter:
    UnicodeClassLU
    | UnicodeClassLL
    | DecimalDigitCharacter
    | '_'
;

fragment LetterCharacter:
    UnicodeClassLU
    | UnicodeClassLL
    | UnicodeEscapeSequence
;

fragment DecimalDigitCharacter:
    UnicodeClassND
    | UnicodeEscapeSequence
;

fragment ConnectingCharacter: UnicodeEscapeSequence;

fragment FormattingCharacter: UnicodeEscapeSequence;

fragment UnicodeEscapeSequence:
    '\\u' HexDigit HexDigit HexDigit HexDigit
    | '\\U' HexDigit HexDigit HexDigit HexDigit HexDigit HexDigit HexDigit HexDigit
;

fragment HexDigit: [0-9] | [A-F] | [a-f];

fragment UnicodeClassLU: '\u0041' ..'\u005a';
fragment UnicodeClassLL: '\u0061' ..'\u007A';
fragment UnicodeClassND: '\u0030' ..'\u0039';
// END Elan2_Lexer