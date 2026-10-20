


grammar Csharp;
import CSharp_Lexer;

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
    | comment
;

main:
    STATIC VOID MAIN OPEN_BRACKET CLOSE_BRACKET OPEN_BRACE NL ordinaryStatement* CLOSE_BRACE COMMENT
        NL
;

function:
    STATIC type methodName OPEN_BRACKET paramList? CLOSE_BRACKET OPEN_BRACE COMMENT NL (
        ordinaryStatement ordinaryStatement
    )* /* statements with side-effects prevented by editor and/or compiler */ returnStatement
        CLOSE_BRACE COMMENT NL
;

test:
    TEST_CLASS_ANNOT CLASS typeName NL TEST_METHOD_ANNOT STATIC VOID testName (
        assert
        | variableDefinition
        | comment
    )* CLOSE_BRACE COMMENT NL
;

procedure:
    STATIC VOID methodName OPEN_BRACKET paramList? CLOSE_BRACKET OPEN_BRACE COMMENT NL
        ordinaryStatement* /* statements with side-effects prevented by editor and/or compiler */
        CLOSE_BRACE COMMENT NL
;

constant: CONST identifierDef EQUAL constantValue COMMENT NL;

// `<el-kw>${this.CLASS}</el-kw> ${frame.name.renderAsHtml()}(<el-type>Enum</el-type>):${frame.values.renderAsHtml()}`
enum: ENUM typeName OPEN_BRACE identifierList CLOSE_BRACKET NL;

concreteClass:
    CLASS typeName (COLON typeName)? OPEN_BRACE NL (
        constructorMember
        | property
        | functionMethod
        | procedureMethod
        | comment
    )* CLOSE_BRACE COMMENT NL
;

abstractClass:
    ABSTRACT CLASS typeName (COLON typeName)? OPEN_BRACE NL (
        property
        | functionMethod
        | procedureMethod
        | abstractFunction
        | abstractProcedure
        | comment
    )* CLOSE_BRACE COMMENT NL
;

comment: commentText NL;
commentText: COMMENT;

// Statements
ordinaryStatement:
    print
    | variableDefinition
    | assignment
    | ifStatement
    | whileLoop
    | forLoop
    | procedureCall
    | tryStatement
    | throwStatement
    | comment
;

print:
    PRINT OPEN_BRACKET expression? CLOSE_BRACKET SEMI_COLON NL
;
variableDefinition:
    VAR identifierDef SINGLE_EQUALS expression SEMI_COLON NL
;
assignment:
    assignable SINGLE_EQUALS expression SEMI_COLON COMMENT NL
;

ifStatement:
    IF OPEN_BRACKET expression CLOSE_BRACKET OPEN_BRACE NL (
        elseIfClause
        | elseClause
        | ordinaryStatement
    )* CLOSE_BRACE COMMENT NL
;

whileLoop:
    WHILE OPEN_BRACKET expression CLOSE_BRACKET OPEN_BRACE NL ordinaryStatement* CLOSE_BRACE COMMENT
        NL
;

//TODO: Currently use only ForEach, but should offer conventional FOR also FOREACH should be created by 'each' again
forLoop:
    FOREACH OPEN_BRACKET VAR identifierDef IN expression CLOSE_BRACKET OPEN_BRACE NL
        ordinaryStatement* CLOSE_BRACE COMMENT NL
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
    TRY OPEN_BRACE NL ordinaryStatement* catchStatement ordinaryStatement* CLOSE_BRACE COMMENT NL
;

throwStatement:
    THROW NEW typeName OPEN_BRACKET errorMessage CLOSE_BRACKET SEMI_COLON NL
;
errorMessage: litString | identifierUse;

//self.assertEqual(actual, expected)
assert:
    ASSERT DOT ARE_EQUAL OPEN_BRACKET assertActual COMMA expression CLOSE_BRACKET SEMI_COLON NL
;
returnStatement: RETURN expression SEMI_COLON NL;
elseIfClause:
    CLOSE_BRACE ELSE IF OPEN_BRACKET expression CLOSE_BRACKET OPEN_BRACE NL
;
elseClause: CLOSE_BRACE ELSE OPEN_BRACE NL;
catchStatement:
    CLOSE_BRACE CATCH OPEN_BRACKET typeName identifierDef CLOSE_BRACKET OPEN_BRACE NL
;

// Members
constructorMember:
    PUBLIC OPEN_BRACKET paramList? CLOSE_BRACKET OPEN_BRACE NL ordinaryStatement* CLOSE_BRACE
        COMMENT NL
;

property: PUBLIC type identifierDef GET_SET COMMENT NL;

functionMethod:
    PUBLIC type methodName OPEN_BRACKET paramList? CLOSE_BRACKET OPEN_BRACE COMMENT NL (
        ordinaryStatement
    )* returnStatement CLOSE_BRACE COMMENT NL
;

procedureMethod:
    PUBLIC VOID methodName OPEN_BRACKET paramList? CLOSE_BRACKET OPEN_BRACE COMMENT NL
        ordinaryStatement* CLOSE_BRACE COMMENT NL
;

abstractFunction:
    ABSTRACT type methodName OPEN_BRACKET paramList? CLOSE_BRACKET SEMI_COLON COMMENT NL
;

abstractProcedure:
    ABSTRACT VOID methodName OPEN_BRACKET paramList? CLOSE_BRACKET SEMI_COLON COMMENT NL
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
litString: INTERPOLATED_STRING_PREFIX? LITERAL_STRING;
enumValue: typeName DOT identifierUse;
litRegExp: LITERAL_REGEXP; // TODO see #3565

index: OPEN_SQ_BRACKET expression CLOSE_SQ_BRACKET;

expression:
    newInstance
    | unaryExpression
    | term
    | binaryExpression
    | IF_ OPEN_BRACKET expression COMMA expression COMMA expression CLOSE_BRACKET
    // specified inline anticipating Python's `expression IF expression ( ELIF expression )* ELSE expression
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

list: OPEN_BRACE expression (COMMA expression)* CLOSE_BRACE;
tuple:
    OPEN_BRACKET expression COMMA expression (COMMA expression)* CLOSE_BRACKET
;
dictionary: OPEN_BRACE kvpList CLOSE_BRACE;
kvpList: kvp (COMMA kvp)*;
kvp: OPEN_BRACE expression COLON expression CLOSE_BRACE;

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

paramDef: type identifierDef;

typeGeneric: typeName LT type (COMMA type)* GT;

typeFunc: FUNC_NAME LT type (COMMA type)* ARROW type GT;

typeTuple:
    TUPLE OPEN_SQ_BRACKET type (COMMA type)+ CLOSE_SQ_BRACKET
;

lambda: LAMBDA argList COLON expression;

interpolatedString: INTERPOLATED_STRING;

power: term POWER term;
// END SubNodes