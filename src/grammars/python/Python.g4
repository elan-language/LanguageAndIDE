


grammar Python;
import Python_Lexer;

file: comment? global* mainCall? NL* EOF;

// Globals
global:
    main
    | function
    | testClass
    | procedure
    | constant
    | enum
    | concreteClass
    | abstractClass
    | comment
;

main:
    GHOSTED_BLOCK_START? DEF MAIN OPEN_BRACKET CLOSE_BRACKET ARROW NONE COLON NL ordinaryStatement* END_MAIN GHOSTED_BLOCK_END? NL
;

mainCall: MAIN OPEN_BRACKET CLOSE_BRACKET;

function:
    GHOSTED_BLOCK_START? DEF methodName OPEN_BRACKET paramList? CLOSE_BRACKET ARROW type COLON commentText? NL
        ordinaryStatement* /* statements with side-effects prevented by editor and/or compiler */
        returnStatement END_FUNCTION GHOSTED_BLOCK_END? NL
;

testClass:
    GHOSTED_BLOCK_START? CLASS testClassName OPEN_BRACKET TESTCASE CLOSE_BRACKET COLON NL test* END_TEST_CLASS GHOSTED_BLOCK_END? NL
;

test:
    GHOSTED_BLOCK_START? DEF testName OPEN_BRACKET THIS_INSTANCE COLON testClassName CLOSE_BRACKET ARROW NONE COLON commentText? NL
      testStatement* END_TEST NL
;

testStatement: assert | variableDefinition | comment;

procedure:
    GHOSTED_BLOCK_START? DEF methodName OPEN_BRACKET paramList? CLOSE_BRACKET ARROW NONE COLON commentText? NL
        ordinaryStatement* END_PROCEDURE GHOSTED_BLOCK_END? NL
;

constant:
    GHOSTED_LINE? identifierDef SINGLE_EQUALS constantValue commentText? NL
;

enum:
    GHOSTED_BLOCK_START? CLASS typeName OPEN_BRACKET ENUM CLOSE_BRACKET COLON commentText? NL enumList NL
        END_ENUM GHOSTED_BLOCK_END? NL
;

concreteClass:
    GHOSTED_BLOCK_START? CLASS classTypeName = typeName (
        OPEN_BRACKET inheritsTypeName = typeName CLOSE_BRACKET
    )? COLON commentText? NL constructorMember concreteClassMember* END_CLASS GHOSTED_BLOCK_END? NL
;

concreteClassMember:
    property
    | functionMethod
    | procedureMethod
    | comment
;

abstractClass:
    GHOSTED_BLOCK_START? CLASS classTypeName = typeName (
        OPEN_BRACKET (inheritsTypeName = typeName | ABC) CLOSE_BRACKET
    ) COLON commentText? NL abstractClassMember* END_CLASS GHOSTED_BLOCK_END? NL
;

abstractClassMember:
    property
    | functionMethod
    | procedureMethod
    | abstractFunction
    | abstractProcedure
    | comment
;

comment: GHOSTED_LINE? commentText NL;
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
    GHOSTED_LINE? identifierDef SINGLE_EQUALS expression VARIABLE_DEFINITION_ANNOTATION NL
; // annotation eventually to be replaced by commentText? like other statements
assignment:
    GHOSTED_LINE? assignable SINGLE_EQUALS expression ASSIGNMENT_ANNOTATION NL
; // annotation eventually to be replaced by commentText? like other statements

ifStatement:
    GHOSTED_BLOCK_START? IF condition = expression COLON commentText? NL thenClause elseIfClause* elseClause?
        END_IF GHOSTED_BLOCK_END? NL
;
thenClause: ordinaryStatement*;

elseIfClause:
    GHOSTED_BLOCK_START? ELIF expression COLON commentText? NL ordinaryStatement* GHOSTED_BLOCK_END?
;

elseClause: GHOSTED_BLOCK_START? ELSE COLON commentText? NL ordinaryStatement* GHOSTED_BLOCK_END?;

whileLoop:
    GHOSTED_BLOCK_START? WHILE expression COLON commentText? NL ordinaryStatement* END_WHILE GHOSTED_BLOCK_END NL
;

forLoop:
    GHOSTED_BLOCK_START? FOR identifierDef IN expression COLON commentText? NL ordinaryStatement* END_FOR GHOSTED_BLOCK_END NL
;

procedureCall: GHOSTED_LINE? term commentText? NL;

tryStatement:
    GHOSTED_BLOCK_START? TRY COLON commentText? NL tryClause catchClause+ END_TRY GHOSTED_BLOCK_END? NL
;
tryClause: ordinaryStatement*;
catchClause:
    GHOSTED_BLOCK_START? EXCEPT typeName AS identifierDef COLON commentText? NL ordinaryStatement* GHOSTED_BLOCK_END?
;

throwStatement:
    GHOSTED_LINE? RAISE typeName OPEN_BRACKET errorMessage CLOSE_BRACKET commentText? NL
;
errorMessage: litString | identifierUse;

assert:
    GHOSTED_LINE? THIS_INSTANCE DOT ASSERT_EQUAL OPEN_BRACKET assertActual COMMA assertExpected
        CLOSE_BRACKET commentText? NL
;

returnStatement:
    RETURN expression commentText? NL
; // not ghostable


// Members
constructorMember:
    GHOSTED_BLOCK_START? DEF INIT OPEN_BRACKET paramList? CLOSE_BRACKET ARROW NONE COLON commentText? GHOSTED_BLOCK_END NL
        ordinaryStatement* END_CONSTRUCTOR NL
;

property: GHOSTED_LINE? identifierDef COLON type commentText? NL;

functionMethod:
    GHOSTED_BLOCK_START? DEF methodName OPEN_BRACKET paramList? CLOSE_BRACKET ARROW type COLON commentText? NL (
        ordinaryStatement
    )* returnStatement END_FUNCTION GHOSTED_BLOCK_END? NL
;

procedureMethod:
    GHOSTED_BLOCK_START? DEF methodName OPEN_BRACKET paramList? CLOSE_BRACKET ARROW NONE COLON commentText? NL
        ordinaryStatement* END_PROCEDURE GHOSTED_BLOCK_END? NL
;

abstractFunction:
    GHOSTED_LINE? ABSTRACT_METHOD NL DEF methodName OPEN_BRACKET paramList? CLOSE_BRACKET ARROW type
       COLON NL PASS commentText? NL
;

abstractProcedure:
    GHOSTED_LINE? ABSTRACT_METHOD NL DEF methodName OPEN_BRACKET paramList? CLOSE_BRACKET ARROW NONE
        COLON NL PASS commentText? NL
;
// END Frames

// START Fields
identifierDef: NAME_STARTING_LC;
identifierUse: NAME_STARTING_LC;
assignable:
    identifierUse                     # simpleAssignable
    | THIS_INSTANCE DOT identifierUse # thisAssignable
    | assignable index                # indexedAssignable
;

methodName: NAME_STARTING_LC;
testName: NAME_STARTING_LC_TEST_;
testClassName: NAME_STARTING_UC_TEST_;

typeName:
    INT_NAME           # intTypeName
    | FLOAT_NAME       # floatTypeName
    | BOOL_NAME        # boolTypeName
    | STRING_NAME      # stringTypeName
    | LIST_NAME        # listTypeName
    | NAME_STARTING_UC # udtTypeName
;

constantValue: litBoolean | litInt | litFloat | litString;

argList: argument (COMMA argument)*;
argument: lambda | expression;
paramList: paramDef (COMMA paramDef)*;
identifierList: identifierDef (COMMA identifierDef)+;
expressionList: expression (COMMA expression)*;

enumDefValue: identifierDef SINGLE_EQUALS litInt;
enumList: enumDefValue (NL enumDefValue)*;

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
litInt:
    LITERAL_INTEGER  # litInteger
    | LITERAL_BINARY # litBinary
    | LITERAL_HEX    # litHex
;
litFloat: LITERAL_FLOAT;
litString: LITERAL_STRING | INTERPOLATED_STRING;
enumValue: typeName DOT identifierUse;

index: OPEN_SQ_BRACKET expression CLOSE_SQ_BRACKET;

expression:
    newInstance        # newInstanceExpression
    | unaryExpression  # unaryExpressionLabel
    | term             # termExpression
    | binaryExpression # binaryExpressionLabel
    | trueExpr = expression IF condition = expression (
        ELIF elifCondition = expression
    )* ELSE falseExpr = expression # ifExpression
;

term:
    thisInstance          # thisInstanceTerm
    | bracketedExpression # bracketedExpressionTerm
    | litValue            # litValueTerm
    | list                # listTerm
    | dictionary          # dictionaryTerm
    | tuple               # tupleTerm
    | identifierUse       # identifierUseTerm
    | methodCall          # methodCallTerm
    | term index          # indexedTerm
    | term DOT chainable  # chainableTerm
;

chainable: identifierUse | methodCall;

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
kvp: key = expression COLON value = expression;

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

paramDef: (identifierDef | THIS_INSTANCE) COLON type;

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