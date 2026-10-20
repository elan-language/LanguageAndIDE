


grammar Python;
import Python_Lexer;

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

main:
    GHOSTED? DEF MAIN OPEN_BRACKET CLOSE_BRACKET CLOSE_BRACKET ARROW NONE COLON NL ordinaryStatement
        * COMMENT NL
;

function:
    GHOSTED? DEF methodName OPEN_BRACKET paramList? CLOSE_BRACKET ARROW type COLON
        FUNCTION_ANNOTATION NL (ordinaryStatement)* /* statements with side-effects prevented by editor and/or compiler */
        returnStatement COMMENT NL
;

test:
    GHOSTED? CLASS testName OPEN_BRACKET TESTCASE CLOSE_BRACKET COMMENT NL (
        assert
        | variableDefinition
        | comment
    )* COMMENT NL
;

procedure:
    GHOSTED? DEF methodName OPEN_BRACKET paramList? CLOSE_BRACKET ARROW NONE COLON
        PROCECDURE_ANNOTATION NL ordinaryStatement* COMMENT NL
;

constant:
    GHOSTED? identifierDef EQUAL constantValue CONSTANT_ANNOTATION NL
;

enum:
    GHOSTED? CLASS typeName OPEN_BRACKET ENUM CLOSE_BRACKET COLON ENUM_ANNOTATION NL identifierList
        NL COMMENT
;

concreteClass:
    GHOSTED? CLASS typeName (OPEN_BRACKET typeName CLOSE_BRACKET)? COLON CONCRETE_CLASS_ANNOTATION
        NL (
        constructorMember
        | property
        | functionMethod
        | procedureMethod
        | comment
    )* COMMENT NL
;

abstractClass:
    GHOSTED? CLASS typeName (
        OPEN_BRACKET typeName
        | ABC CLOSE_BRACKET
    ) ABSTRACT_CLASS_ANNOTATION NL (
        property
        | functionMethod
        | procedureMethod
        | abstractFunction
        | abstractProcedure
        | comment
    )* COMMENT NL
;

comment: commentText NL;
commentText: COMMENT;

// Statements
ordinaryStatement:
    variableDefinition
    | assignment
    | ifStatement
    | whileLoop
    | forLoop
    | procedureCall
    | tryStatement
    | throwStatement
    | comment
;
variableDefinition:
    GHOSTED? identifierDef EQUAL expression VARIABLE_ANNOTATION NL
;
assignment:
    GHOSTED? assignable EQUAL expression ASSIGNMENT_ANNOTATION NL
;

ifStatement:
    GHOSTED? IF expression COLON NL (
        elseIfClause
        | elseClause
        | ordinaryStatement
    )* COMMENT NL
;

whileLoop:
    GHOSTED? WHILE expression COLON NL ordinaryStatement* COMMENT NL
;

forLoop:
    GHOSTED? FOR identifierDef IN expression COLON NL ordinaryStatement* COMMENT NL
;

procedureCall:
    //TODO - to be reduced to one field i.e. CALL procCall NL, with procCall being procRef: (term DOT)? methodCall
    GHOSTED? procRef OPEN_BRACKET argList CLOSE_BRACKET NL
;
procRef: methodName | thisProcRef | instanceProcRef;
thisProcRef: THIS_INSTANCE DOT methodName;
instanceProcRef: identifierWithOptIndexes DOT methodName;
identifierWithOptIndexes: identifierUse index*;

tryStatement:
    GHOSTED? TRY NL ordinaryStatement* catchStatement ordinaryStatement* END TRY NL
;

throwStatement:
    GHOSTED? RAISE typeName OPEN_BRACKET errorMessage CLOSE_BRACKET NL
;
errorMessage: litString | identifierUse;

assert:
    GHOSTED? THIS_INSTANCE DOT ASSERT_EQUAL OPEN_BRACKET assertActual COMMA assertExpected
        CLOSE_BRACKET NL
;

returnStatement: RETURN expression NL; // not ghostable
elseIfClause:
    GHOSTED? ELIF expression COLON ELSE_IF_ANNOTATION NL
;
elseClause: GHOSTED? ELSE COLON NL;
catchStatement: GHOSTED? EXCEPT typeName AS identifierDef NL;

// Members
constructorMember:
    GHOSTED? DEF INIT OPEN_BRACKET paramList? CLOSE_BRACKET ARROW NONE COLON NL ordinaryStatement*
        COMMENT NL
;

property:
    GHOSTED? identifierDef COLON type PROPERTY_ANNOTATION NL
;

functionMethod:
    GHOSTED? DEF methodName OPEN_BRACKET paramList? CLOSE_BRACKET ARROW type COLON
        FUNCTION_METHOD_ANNOTATION NL (ordinaryStatement)* returnStatement COMMENT NL
;

procedureMethod:
    GHOSTED? DEF methodName OPEN_BRACKET paramList? CLOSE_BRACKET ARROW NONE COLON
        PROCEDURE_METHOD_ANNOTATION NL ordinaryStatement* COMMENT NL
;

abstractFunction:
    GHOSTED? ABSTRACT_METHOD NL DEF methodName OPEN_BRACKET paramList? CLOSE_BRACKET ARROW type
        COLON NL PASS COMMENT NL
;

abstractProcedure:
    GHOSTED? ABSTRACT_METHOD NL DEF methodName OPEN_BRACKET paramList? CLOSE_BRACKET ARROW NONE
        COLON NL PASS COMMENT NL
;
// END Frames

// START Fields
identifierDef: NAME_STARTING_LC;
identifierUse: NAME_STARTING_LC;
assignable:
    identifierUse
    | THIS_INSTANCE DOT identifierUse
    | assignable index
;

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

constantValue: litBoolean | litInt | litFloat | litString;

argList: argument (COMMA argument)*;
argument: lambda | expression;
paramList: paramDef (COMMA paramDef)*;
identifierList: identifierDef (COMMA identifierDef)+;
expressionList: expression (COMMA expression)*;

type: typeTuple | typeName | typeGeneric | typeFunc;

assertActual: expression;
assertExpected:
    litValue
    | list
    | dictionary
    | unaryExpression
    | tuple
;
// END Fields

// START SubNodes
litValue:
    litBoolean
    | litInt
    | litFloat
    | litString
    | interpolatedString
    | enumValue
;
litBoolean: TRUE | FALSE;
litInt: LITERAL_INTEGER | LITERAL_BINARY | LITERAL_HEX;
litFloat: LITERAL_FLOAT;
litString: LITERAL_STRING | INTERPOLATED_STRING;
enumValue: typeName DOT identifierUse;
litRegExp: LITERAL_REGEXP; // TODO see #3565

index: OPEN_SQ_BRACKET expression CLOSE_SQ_BRACKET;

expression:
    newInstance
    | unaryExpression
    | term
    | binaryExpression
    | expression IF expression (ELIF expression)* ELSE expression
;

term:
    thisInstance
    | bracketedExpression
    | litValue
    | list
    | dictionary
    | tuple
    | identifierUse
    | methodCall
    | term index
    | term DOT chainable
;
chainable: ( identifierUse | methodCall) index*;

thisInstance: THIS_INSTANCE;
bracketedExpression: OPEN_BRACKET expression CLOSE_BRACKET;
unaryExpression: negateNumeric | negateLogical;
negateNumeric: MINUS term;
negateLogical: NOT term;

binaryExpression: left = term binaryOperator right = expression;

list: OPEN_SQ_BRACKET expressionList CLOSE_SQ_BRACKET;
tuple: OPEN_BRACKET expressionList CLOSE_BRACKET;
dictionary: OPEN_BRACE kvpList CLOSE_BRACE;
kvpList: kvp (COMMA kvp)*;
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
    | POWER
;

newInstance: type OPEN_BRACKET argList? CLOSE_BRACKET;

paramDef: identifierDef COLON type;

typeGeneric:
    typeName OPEN_SQ_BRACKET type (COMMA type)* CLOSE_SQ_BRACKET
;

typeFunc:
    FUNC_NAME OPEN_SQ_BRACKET OPEN_SQ_BRACKET type (COMMA type)* CLOSE_SQ_BRACKET COMMA type
        CLOSE_SQ_BRACKET
;

typeTuple:
    TUPLE OPEN_SQ_BRACKET type (COMMA type)+ CLOSE_SQ_BRACKET
;

lambda:
    LAMBDA paramList COLON expression
; // TODO should change to identiferList

interpolatedString: INTERPOLATED_STRING;
// END SubNodes