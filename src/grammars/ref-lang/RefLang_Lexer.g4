lexer grammar RefLang_Lexer;

//START common token names; custom definitions
COMMENT_MARKER: '#';

INT_NAME: 'Int';
FLOAT_NAME: 'Float';
BOOL_NAME: 'Boolean';
STRING_NAME: 'String';
LIST_NAME: 'List';
FUNC_NAME: 'Func';

TRUE: 'true';
FALSE: 'false';
AND: 'and';
OR: 'or';
NOT: 'not';
EQUAL: 'is';
NOT_EQUAL: 'isnt';
MOD: 'mod';
ARROW: '=>';

BINARY_PREFIX: '0b';
HEX_PREFIX: '0x';
INTERPOLATED_STRING_PREFIX: '$';

THIS_INSTANCE: 'this';
//END common token names; custom definitions

// START RefLang-specifiFc tokens
ABSTRACT: 'abstract';
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
NEW: 'new';
OF: 'of';
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
THROW: 'throw';
TO: 'to';
TRY: 'try';
VARIABLE: 'variable';
WHILE: 'while';

POWER: '^';

IF_:
    'if_'
; // Temporary solution - to be replaced by language-specific implementation

// END RefLang-specific tokens

//START Common token names; common definitions
COMMENT: COMMENT_MARKER ~( '\r' | '\n')*; // In other langs, the casing may be different

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

WS: [ \t]+ -> skip;
NL: [\r\n\f]+;

NAME_STARTING_TEST_: 'test_' IdentifierPartCharacter*;
NAME_STARTING_LC: UnicodeClassLL IdentifierPartCharacter*;
NAME_STARTING_UC: UnicodeClassLU IdentifierPartCharacter*;

LITERAL_BINARY: BINARY_PREFIX [01]+;
LITERAL_HEX: HEX_PREFIX [0-9A-Fa-f]+;
LITERAL_INTEGER: [0-9] [0-9]*;

LITERAL_FLOAT:
    LITERAL_INTEGER DOT LITERAL_INTEGER ExponentPart?
;
LITERAL_STRING: '"' (~["\u0085] | CommonCharacter)* '"';

WHITESPACES: (Whitespace)+ -> skip;
TEXT: CommonCharacter+;

GHOSTED: '[ghosted]';

//annotations
FUNCTION_ANNOTATION: COMMENT_MARKER 'function';
PROCECDURE_ANNOTATION: COMMENT_MARKER 'procedure';
CONSTANT_ANNOTATION: COMMENT_MARKER 'constant';
ENUM_ANNOTATION: COMMENT_MARKER 'enum';
CONCRETE_CLASS_ANNOTATION: COMMENT_MARKER 'concrete class';
ABSTRACT_CLASS_ANNOTATION: COMMENT_MARKER 'abstract class';
VARIABLE_ANNOTATION: COMMENT_MARKER 'variable definition';
ASSIGNMENT_ANNOTATION: COMMENT_MARKER 'assignment';
INPUT_ANNOTATION: COMMENT_MARKER 'input statement';
CALL_ANNOTATION: COMMENT_MARKER 'procedure call';
LET_ANNOTATION: COMMENT_MARKER 'let';
ELSE_IF_ANNOTATION: COMMENT_MARKER 'else if';
PROPERTY_ANNOTATION: COMMENT_MARKER 'property';
FUNCTION_METHOD_ANNOTATION: COMMENT_MARKER 'function method';
PROCEDURE_METHOD_ANNOTATION: COMMENT_MARKER 'procedure method';

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
//END Common token names; common definitions