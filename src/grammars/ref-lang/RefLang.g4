


grammar RefLang;
import RefLang_Lexer;

// START Elan2_Frames
file: comment? global* NL* EOF;

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
    | comment
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
        | comment
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
        | comment
    )* END CLASS NL
;

abstractClass:
    GHOSTED? ABSTRACT CLASS typeName (INHERITS typeName)? NL (
        property
        | functionMethod
        | procedureMethod
        | abstractFunction
        | abstractProcedure
        | comment
    )* END CLASS NL
;

comment: commentText NL;

commentText: COMMENT;

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
    | comment
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

procedureCall: //TODO - to be reduced to one field i.e. CALL procCall NL, with procCall being procRef: (term DOT)? methodCall
    GHOSTED? CALL procRef OPEN_BRACKET argList CLOSE_BRACKET NL
;
procRef: term;

throwStatement:
    GHOSTED? THROW typeName litString NL
; // TODO: currently has typeNameUse 
returnStatement: RETURN expression NL; // not ghostable
elseIfClause: GHOSTED? ELIF expression THEN NL;
elseClause: GHOSTED? ELSE NL; // TODO
catchStatement: GHOSTED? CATCH identifier AS typeName NL;

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

type: typeTuple | typeName | typeGeneric | typeFunc;

enumValuesList: identifier (COMMA identifier)*;

assertActual: expression;
// END Fields

// START SubNodes
litValue:
    litBoolean
    | litInt
    | litFloat
    | litString
    | enumValue
    | litRegExp
;
litBoolean: TRUE | FALSE;
litInt: LITERAL_INTEGER | LITERAL_BINARY | LITERAL_HEX;
litFloat: LITERAL_FLOAT;
litString: INTERPOLATED_STRING_PREFIX? LITERAL_STRING;
enumValue: typeName DOT identifier;
litRegExp: LITERAL_REGEXP ;

index: OPEN_SQ_BRACKET expression CLOSE_SQ_BRACKET;

identifierWithOptIndexes: identifier index*;

propertyRef: THIS_INSTANCE DOT identifierWithOptIndexes;

expression:
    newInstance
    | unaryExpression
    | term
    | binaryExpression
    | ifExpression
;

ifExpression:  IF_ OPEN_BRACKET expression COMMA expression COMMA expression CLOSE_BRACKET;

term: chainHead chainTail?;

chainHead:
    thisInstance
    | bracketedExpression
    | litValue
    | list
    | dictionary
    | tuple
    | chainable
;

chainTail: (DOT chainable)+;
chainable: ( identifier | methodCall) index*;

thisInstance: THIS_INSTANCE;



bracketedExpression: OPEN_BRACKET expression CLOSE_BRACKET;
unaryExpression: negateNumeric | negateLogical;
negateNumeric: MINUS term;
negateLogical: NOT term;

binaryExpression:
    term binaryOperator expression
; // ? expression binaryOperator expression ?

list:
    OPEN_SQ_BRACKET expressionList CLOSE_SQ_BRACKET
;

expressionList: expression (COMMA expression)*;

tuple:
    OPEN_BRACKET tupleElementList CLOSE_BRACKET
;

tupleElementList: expression (COMMA expression)+; // min 2 elements

dictionary:
    OPEN_SQ_BRACKET kvpList CLOSE_SQ_BRACKET
;

kvpList: kvp  (COMMA kvp)*;

kvp: expression COLON expression;

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

typeFunc: FUNC_NAME LT OF type (COMMA type)* ARROW type GT;

typeTuple: OPEN_BRACKET type (COMMA type)+ CLOSE_BRACKET;

lambda: LAMBDA (paramsList | argList) ARROW expression;

interpolatedString: INTERPOLATED_STRING_PREFIX LITERAL_STRING;

power: term POWER term;

// END SubNodes