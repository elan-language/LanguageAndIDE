


grammar Elan2;
import Elan2_Lexer;

// START Elan2_Frames
file: COMMENT? global* NL* EOF;

// Globals
global:
    main
    | function
    | test
    | procedure
    | constant
    | enum
    | concreteClass
    | abstractClass
    | commentGlobal
;

main: GHOSTED? MAIN NL ordinaryStatement* END MAIN NL;

function:
    GHOSTED? FUNCTION methodName OPEN_BRACKET paramsList? CLOSE_BRACKET RETURNS type NL (
        letStatement
        | ordinaryStatement
    )* /* statements with side-effects prevented by editor and/or compiler */ returnStatement END
        FUNCTION NL
;

test:
    GHOSTED? TEST testName NL (
        assert
        | letStatement
        | variableDefinition
        | commentStatement
    )* END TEST NL
;

procedure:
    GHOSTED? PROCEDURE methodName OPEN_BRACKET paramsList? CLOSE_BRACKET NL ordinaryStatement* END
        PROCEDURE NL
;

constant: GHOSTED? CONSTANT identifier SET TO constantValue NL;
enum: GHOSTED? ENUM typeName enumValuesList NL;

concreteClass:
    GHOSTED? CLASS typeName (INHERITS typeName)? NL (
        constructorMember
        | property
        | functionMethod
        | procedureMethod
        | commentMember
    )* END CLASS NL
;

abstractClass:
    GHOSTED? ABSTRACT CLASS typeName (INHERITS typeName)? NL (
        property
        | functionMethod
        | procedureMethod
        | abstractFunction
        | abstractProcedure
        | commentMember
    )* END CLASS NL
;

commentGlobal: COMMENT NL;

// Statements
ordinaryStatement:
    print
    | variableDefinition
    | assignment
    | inputStatement
    | ifStatement
    | whileLoop
    | forLoop
    | procedureCall
    | tryStatement
    | throwStatement
    | commentStatement
;

ifStatement:
    GHOSTED? IF expression THEN NL (
        elseIfClause
        | elseClause
        | ordinaryStatement
    )* END IF NL
;

whileLoop:
    GHOSTED? WHILE expression NL ordinaryStatement* END WHILE NL
;

forLoop:
    GHOSTED? FOR identifier IN expression NL ordinaryStatement* END FOR NL
;

tryStatement:
    GHOSTED? TRY NL ordinaryStatement* catchStatement ordinaryStatement* END TRY NL
;

assert: GHOSTED? ASSERT assertActual EVALUATES TO expression NL;
letStatement: GHOSTED? LET identifier BE expression NL;
print: GHOSTED? PRINT OPEN_BRACKET expression? CLOSE_BRACKET NL;
variableDefinition:
    GHOSTED? VARIABLE identifier SET TO expression NL
;
assignment: GHOSTED? ASSIGN assignable TO expression NL;
inputStatement:
    GHOSTED? INPUT identifier SET TO methodName OPEN_BRACKET expression CLOSE_BRACKET NL
;
procedureCall:
    GHOSTED? CALL term NL
; // Compiler to check that term ends in a methodCall, and that the method is a procedure
throwStatement:
    GHOSTED? THROW typeName litString NL
; // TODO: currently has typeNameUse 
returnStatement: RETURN expression NL; // not ghostable
elseIfClause: GHOSTED? ELIF expression THEN NL;
elseClause: GHOSTED? ELSE NL; // TODO
catchStatement: GHOSTED? CATCH identifier AS typeName NL;
commentStatement: COMMENT NL;

// Members
constructorMember:
    GHOSTED? CONSTRUCTOR OPEN_BRACKET paramsList? CLOSE_BRACKET NL ordinaryStatement* END
        CONSTRUCTOR NL
;

property: PRIVATE? PROPERTY identifier AS type NL;

functionMethod:
    GHOSTED? PRIVATE? FUNCTION methodName OPEN_BRACKET paramsList? CLOSE_BRACKET RETURNS type NL (
        letStatement
        | ordinaryStatement
    )* returnStatement END FUNCTION NL
;

procedureMethod:
    GHOSTED? PRIVATE? PROCEDURE methodName OPEN_BRACKET paramsList? CLOSE_BRACKET NL
        ordinaryStatement* END PROCEDURE NL
;

abstractFunction:
    GHOSTED? ABSTRACT FUNCTION methodName OPEN_BRACKET paramsList? CLOSE_BRACKET RETURNS type NL
;
abstractProcedure:
    GHOSTED? ABSTRACT PROCEDURE methodName OPEN_BRACKET paramsList? CLOSE_BRACKET NL
;

commentMember: COMMENT? NL;
// END Frames

// START Fields
identifier: NAME_STARTING_LC;
assignable: identifierWithOptIndexes | propertyRef;

methodName: NAME_STARTING_LC;
testName: NAME_STARTING_TEST_;
typeName:
    INT_NAME
    | FLOAT_NAME
    | BOOL_NAME
    | STRING_NAME
    | LIST_NAME
    | NAME_STARTING_UC
;

constantValue: litValue | identifier;

argList: argument (COMMA argument)*;
argument: lambda | expression;
paramsList: paramDef (COMMA paramDef)*;

type: typeTuple | typeName | typeGeneric;

enumValuesList: identifier (COMMA identifier)*;

assertActual: expression;
// END Fields

// START SubNodes
litValue:
    LIT_BOOLEAN
    | litInt
    | litFloat
    | litString
    | enumValue
; // litRegExp
litInt: LITERAL_INTEGER | LITERAL_BINARY | LITERAL_HEX;
litFloat: LITERAL_FLOAT;
enumValue: typeName DOT identifier;
// litRegExp:;
litString: LITERAL_STRING | INTERPOLATED_STRING;

thisInstance: THIS;

index: OPEN_SQ_BRACKET expression CLOSE_SQ_BRACKET;

identifierWithOptIndexes: identifier index*;

propertyRef: thisInstance DOT identifierWithOptIndexes;

expression:
    newInstance
    | unaryExpression
    | term
    | expression binaryOperator expression
    | IF_ OPEN_BRACKET expression COMMA expression COMMA expression CLOSE_BRACKET
    // specified inline anticipating Python's `expression IF expression ( ELIF expression )* ELSE expression
;

term: chainHead (DOT chainable)*;

chainHead:
    thisInstance
    | bracketedExpression
    | tuple
    | litValue
    | list
    | chainable
;

chainable: ( identifier | methodCall) index*;

bracketedExpression: OPEN_BRACKET expression CLOSE_BRACKET;
unaryExpression: (MINUS | NOT) term;
binaryExpression:
    term binaryOperator expression
; // ? expression binaryOperator expression ?
tuple:
    OPEN_BRACKET expression COMMA expression (COMMA expression)* CLOSE_BRACKET
;
methodCall: methodName OPEN_BRACKET argList? CLOSE_BRACKET;

binaryOperator:
    EQUAL
    | NOT_EQUAL
    | GT
    | LT
    | GE
    | LE
    | MULT
    | DIVIDE
    | PLUS
    | MINUS
    | AND
    | OR
    | MOD
;

newInstance: NEW type OPEN_BRACKET argList? CLOSE_BRACKET;

paramDef: identifier AS type;

typeGeneric: typeName LT OF type (COMMA type)* GT;

typeTuple: OPEN_BRACKET type (COMMA type)+ CLOSE_BRACKET;

lambda: LAMBDA (paramsList | argList) ARROW expression;

list:
    OPEN_SQ_BRACKET expression (COMMA expression)* CLOSE_SQ_BRACKET
;

interpolatedString: INTERPOLATED_STRING_PREFIX LITERAL_STRING;

power: term POWER term;

// END SubNodes