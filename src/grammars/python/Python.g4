


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
    GHOSTED? DEF MAIN OPEN_BRACKET CLOSE_BRACKET CLOSE_BRACKET ARROW NONE COLON NL 
      ordinaryStatement*
    END_MAIN NL
;

function:
    GHOSTED? DEF methodName OPEN_BRACKET paramList? CLOSE_BRACKET ARROW type COLON commentText? NL 
      ordinaryStatement* /* statements with side-effects prevented by editor and/or compiler */
      returnStatement 
    END_FUNCTION NL
;

test:
    GHOSTED? CLASS testName OPEN_BRACKET TESTCASE CLOSE_BRACKET COMMENT NL (
        assert
        | variableDefinition
        | comment
    )* END_TEST NL
;

procedure:
    GHOSTED? DEF methodName OPEN_BRACKET paramList? CLOSE_BRACKET ARROW NONE COLON commentText? NL
      ordinaryStatement* 
    END_PROCEDURE NL
;

constant:
    GHOSTED? identifierDef EQUAL constantValue commentText? NL
;

enum:
    GHOSTED? CLASS typeName OPEN_BRACKET ENUM CLOSE_BRACKET COLON commentText? NL identifierList
        END_ENUM NL
;

concreteClass:
    GHOSTED? CLASS typeName (OPEN_BRACKET typeName CLOSE_BRACKET)? COLON commentText? NL
        constructorMember
        concreteClassMember*
    END_CLASS NL
;

concreteClassMember: 
          property
        | functionMethod
        | procedureMethod
        | comment;

abstractClass:
    GHOSTED? CLASS typeName (OPEN_BRACKET typeName | ABC CLOSE_BRACKET) COLON commentText? NL 
      abstractClassMember*
    END_CLASS NL
;

abstractClassMember:
          property
        | functionMethod
        | procedureMethod
        | abstractFunction
        | abstractProcedure
        | comment;

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
    GHOSTED? identifierDef EQUAL expression commentText? NL
;
assignment:
    GHOSTED? assignable EQUAL expression commentText? NL
;

ifStatement:
    GHOSTED? IF condition = expression THEN commentText? NL
        thenClause
        elseIfClause*
        elseClause?
    END_IF NL
;
    thenClause: 
        ordinaryStatement*;

    elseIfClause: GHOSTED? ELIF expression THEN commentText? NL
        ordinaryStatement*;

    elseClause: GHOSTED? ELSE commentText? NL
        ordinaryStatement*;

whileLoop:
    GHOSTED? WHILE expression COLON  commentText? NL
      ordinaryStatement*
    END_WHILE NL
;

forLoop:
    GHOSTED? FOR identifierDef IN expression COLON  commentText? NL 
      ordinaryStatement*
    END_FOR NL
;

procedureCall:
    GHOSTED? term  commentText? NL
;

tryStatement:
    GHOSTED? TRY COLON  commentText? NL 
      tryClause 
      catchClause+ 
    END_TRY NL
;
    tryClause: ordinaryStatement*;
    catchClause: GHOSTED? EXCEPT typeName AS identifierDef COLON commentText? NL ordinaryStatement*;

throwStatement:
    GHOSTED? RAISE typeName OPEN_BRACKET errorMessage CLOSE_BRACKET commentText? NL
;
errorMessage: litString | identifierUse;

assert:
    GHOSTED? THIS_INSTANCE DOT ASSERT_EQUAL OPEN_BRACKET assertActual COMMA assertExpected CLOSE_BRACKET commentText? NL
;

returnStatement: RETURN expression commentText? NL; // not ghostable
catchStatement: GHOSTED? EXCEPT typeName AS identifierDef commentText? NL;

// Members
constructorMember:
    GHOSTED? DEF INIT OPEN_BRACKET paramList? CLOSE_BRACKET ARROW NONE COLON commentText? NL 
      ordinaryStatement*
    END_CONSTRUCTOR NL
;

property:
    GHOSTED? identifierDef COLON type commentText? NL
;

functionMethod:
    GHOSTED? DEF methodName OPEN_BRACKET paramList? CLOSE_BRACKET ARROW type COLON commentText? NL 
      (ordinaryStatement)* 
      returnStatement 
    END_FUNCTION_METHOD NL
;

procedureMethod:
    GHOSTED? DEF methodName OPEN_BRACKET paramList? CLOSE_BRACKET ARROW NONE COLON commentText? NL
      ordinaryStatement*
    END_PROCEDURE_METHOD NL
;

abstractFunction:
    GHOSTED? ABSTRACT_METHOD NL DEF methodName OPEN_BRACKET paramList? CLOSE_BRACKET ARROW type
        COLON NL PASS commentText? NL
;

abstractProcedure:
    GHOSTED? ABSTRACT_METHOD NL DEF methodName OPEN_BRACKET paramList? CLOSE_BRACKET ARROW NONE
        COLON NL PASS commentText? NL
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