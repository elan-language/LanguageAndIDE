grammar RefLang;
import RefLang_Lexer;

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
    GHOSTED? FUNCTION methodName OPEN_BRACKET paramList? CLOSE_BRACKET RETURNS type NL (
        ordinaryStatement
    )* /* statements with side-effects prevented by editor and/or compiler */ returnStatement END
        FUNCTION NL
;

test:
    GHOSTED? TEST testName NL testStatement* END TEST NL
;

testStatement: 
        assert
        | variableDefinition
        | comment
;

procedure:
    GHOSTED? PROCEDURE methodName OPEN_BRACKET paramList? CLOSE_BRACKET NL ordinaryStatement* END
        PROCEDURE NL
;

constant:
    GHOSTED? CONSTANT identifierDef SET TO constantValue NL
;
enum: GHOSTED? ENUM typeName identifierList NL;

concreteClass:
    GHOSTED? CLASS classTypeName=typeName (INHERITS inheritsTypeName=typeName)? NL concreteClassMember* END CLASS NL
;

    concreteClassMember:
            constructorMember
            | property
            | functionMethod
            | procedureMethod
            | comment
    ;

abstractClass:
    GHOSTED? ABSTRACT CLASS classTypeName=typeName (INHERITS inheritsTypeName=typeName)? NL abstractClassMember* END CLASS NL
;

    abstractClassMember:
        property
        | functionMethod
        | procedureMethod
        | abstractFunction
        | abstractProcedure
        | comment
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

print: GHOSTED? PRINT OPEN_BRACKET expression? CLOSE_BRACKET NL;
variableDefinition:
    GHOSTED? VARIABLE identifierDef SET TO expression NL
;
assignment: GHOSTED? ASSIGN assignable TO expression NL;
inputStatement:
    GHOSTED? INPUT identifierDef SET TO methodName OPEN_BRACKET expression CLOSE_BRACKET NL
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
    GHOSTED? FOR identifierDef IN expression NL ordinaryStatement* END FOR NL
;

//TODO - to be reduced to one field i.e. CALL procCall NL, with procCall being procRef: (term DOT)? methodCall. Then delete following three rules
procedureCall:   
    GHOSTED? CALL procRef OPEN_BRACKET argList CLOSE_BRACKET NL
;

    procRef: 
        methodName
        | thisProcRef
        | instanceProcRef
    ;
    thisProcRef: THIS_INSTANCE DOT methodName;
    instanceProcRef: identifierWithOptIndexes DOT methodName;
    identifierWithOptIndexes: identifierUse index*;

tryStatement:
    GHOSTED? TRY NL ordinaryStatement* catchStatement ordinaryStatement* END TRY NL
;
throwStatement:
    GHOSTED? THROW typeName errorMessage NL
; 

errorMessage: litString | identifierUse ;

assert: GHOSTED? ASSERT assertActual EVALUATES TO assertExpected NL;

returnStatement: RETURN expression NL; // not ghostable
elseIfClause: GHOSTED? ELIF expression THEN NL;
elseClause: GHOSTED? ELSE NL; // TODO
catchStatement: GHOSTED? CATCH identifierDef AS typeName NL;

// Members
constructorMember:
    GHOSTED? CONSTRUCTOR OPEN_BRACKET paramList? CLOSE_BRACKET NL ordinaryStatement* END
        CONSTRUCTOR NL
;

property: GHOSTED? PRIVATE? PROPERTY identifierDef AS type NL;

functionMethod:
    GHOSTED? PRIVATE? FUNCTION methodName OPEN_BRACKET paramList? CLOSE_BRACKET RETURNS type NL (
        ordinaryStatement
    )* returnStatement END FUNCTION NL
;

procedureMethod:
    GHOSTED? PRIVATE? PROCEDURE methodName OPEN_BRACKET paramList? CLOSE_BRACKET NL
        ordinaryStatement* END PROCEDURE NL
;

abstractFunction:
    GHOSTED? ABSTRACT FUNCTION methodName OPEN_BRACKET paramList? CLOSE_BRACKET RETURNS type NL
;
abstractProcedure:
    GHOSTED? ABSTRACT PROCEDURE methodName OPEN_BRACKET paramList? CLOSE_BRACKET NL
;
// END Frames

// START Fields
identifierDef: NAME_STARTING_LC;
identifierUse: NAME_STARTING_LC;
assignable: identifierUse  
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

constantValue: 
    litBoolean
    | litInt
    | litFloat
    | litString
    ;

argList: argument (COMMA argument)*;
argument: lambda | expression;
paramList: paramDef (COMMA paramDef)*;
identifierList: identifierDef (COMMA identifierDef)+;
expressionList: expression (COMMA expression)*;

type: typeTuple | typeName | typeGeneric | typeFunc;

assertActual: expression;
assertExpected: litValue | list | dictionary | unaryExpression | tuple;
// END Fields

// START SubNodes
litValue:
    litBoolean
    | litInt
    | litFloat
    | litString
    | interpolatedString
    | enumValue
    | litRegExp
;
litBoolean: TRUE | FALSE;
litInt: LITERAL_INTEGER | LITERAL_BINARY | LITERAL_HEX;
litFloat: LITERAL_FLOAT;
litString: LITERAL_STRING;
interpolatedString: INTERPOLATED_STRING;
enumValue: typeName DOT identifierUse;
litRegExp: LITERAL_REGEXP;

index: OPEN_SQ_BRACKET expression CLOSE_SQ_BRACKET;

expression:
    newInstance
    | unaryExpression
    | term
    | binaryExpression
    | IF_ OPEN_BRACKET expression COMMA expression COMMA expression CLOSE_BRACKET
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

chainable: identifierUse | methodCall;

thisInstance: THIS_INSTANCE;
bracketedExpression: OPEN_BRACKET expression CLOSE_BRACKET;
unaryExpression: negateNumeric | negateLogical;
negateNumeric: MINUS term;
negateLogical: NOT term;

binaryExpression:
    left=term binaryOperator right=expression
; // ? expression binaryOperator expression ?

list: OPEN_SQ_BRACKET expressionList CLOSE_SQ_BRACKET;

tuple: OPEN_BRACKET expressionList CLOSE_BRACKET;

dictionary: OPEN_SQ_BRACKET kvpList CLOSE_SQ_BRACKET;
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

newInstance: NEW type OPEN_BRACKET argList? CLOSE_BRACKET;

paramDef: identifierDef AS type;

typeGeneric: typeName LT OF type (COMMA type)* GT;

typeFunc: FUNC_NAME LT OF type (COMMA type)* ARROW type GT;

typeTuple: OPEN_BRACKET type (COMMA type)+ CLOSE_BRACKET;

lambda: LAMBDA paramList ARROW expression; // TODO should change to identiferList
// END SubNodes