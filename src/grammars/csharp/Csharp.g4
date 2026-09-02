


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
    | commentLine
;

main:
    STATIC VOID MAIN OPEN_BRACKET CLOSE_BRACKET OPEN_BRACE NL ordinaryStatement* CLOSE_BRACE COMMENT
        NL
;

function:
    STATIC type methodName OPEN_BRACKET paramsList? CLOSE_BRACKET OPEN_BRACE COMMENT NL (
        letStatement
        | ordinaryStatement
    )* /* statements with side-effects prevented by editor and/or compiler */ returnStatement
        CLOSE_BRACE COMMENT NL
;

test:
    TEST_CLASS_ANNOT CLASS typeName NL TEST_METHOD_ANNOT STATIC VOID testName (
        assert
        | letStatement
        | variableDefinition
        | commentLine
    )* CLOSE_BRACE COMMENT NL
;

procedure:
    STATIC VOID methodName OPEN_BRACKET paramsList? CLOSE_BRACKET OPEN_BRACE COMMENT NL
        ordinaryStatement* /* statements with side-effects prevented by editor and/or compiler */
        CLOSE_BRACE COMMENT NL
;

constant: CONST identifier EQUAL constantValue COMMENT NL;

// `<el-kw>${this.CLASS}</el-kw> ${frame.name.renderAsHtml()}(<el-type>Enum</el-type>):${frame.values.renderAsHtml()}`
enum: ENUM typeName OPEN_BRACE enumValuesList CLOSE_BRACKET NL;

concreteClass:
    CLASS typeName (COLON typeName)? OPEN_BRACE NL (
        constructorMember
        | property
        | functionMethod
        | procedureMethod
        | commentLine
    )* CLOSE_BRACE COMMENT NL
;

abstractClass:
    ABSTRACT CLASS typeName (COLON typeName)? OPEN_BRACE NL (
        property
        | functionMethod
        | procedureMethod
        | abstractFunction
        | abstractProcedure
        | commentLine
    )* CLOSE_BRACE COMMENT NL
;

commentLine: COMMENT NL;

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
    | commentLine
;

ifStatement: // TODO - see #3444
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
    FOREACH OPEN_BRACKET VAR identifier IN expression CLOSE_BRACKET OPEN_BRACE NL ordinaryStatement*
        CLOSE_BRACE COMMENT NL
;

tryStatement: //TODO - see #3444
    TRY OPEN_BRACE NL ordinaryStatement* catchStatement ordinaryStatement* CLOSE_BRACE COMMENT NL
;

//self.assertEqual(actual, expected)
assert:
    ASSERT DOT ARE_EQUAL OPEN_BRACKET assertActual COMMA expression CLOSE_BRACKET SEMI_COLON NL
;
letStatement:
    VAR identifier SINGLE_EQUALS expression SEMI_COLON COMMENT NL
;
print:
    PRINT OPEN_BRACKET expression? CLOSE_BRACKET SEMI_COLON NL
;
variableDefinition:
    VAR identifier SINGLE_EQUALS expression SEMI_COLON NL
;
assignment:
    assignable SINGLE_EQUALS expression SEMI_COLON COMMENT NL
;
inputStatement:
    identifier EQUAL INPUT OPEN_BRACKET expression CLOSE_BRACKET SEMI_COLON NL
;
procedureCall:
    term SEMI_COLON COMMENT NL
; // Compiler to check that term ends in a methodCall, and that the method is a procedure
throwStatement:
    THROW NEW typeName OPEN_BRACKET expression CLOSE_BRACKET SEMI_COLON NL
;
returnStatement: RETURN expression SEMI_COLON NL;
elseIfClause:
    CLOSE_BRACE ELSE IF OPEN_BRACKET expression CLOSE_BRACKET OPEN_BRACE NL
;
elseClause: CLOSE_BRACE ELSE OPEN_BRACE NL;
catchStatement:
    CLOSE_BRACE CATCH OPEN_BRACKET typeName identifier CLOSE_BRACKET OPEN_BRACE NL
;

// Members
constructorMember:
    PUBLIC OPEN_BRACKET paramsList? CLOSE_BRACKET OPEN_BRACE NL ordinaryStatement* CLOSE_BRACE
        COMMENT NL
;

property: PUBLIC type identifier GET_SET COMMENT NL;

functionMethod:
    PUBLIC type methodName OPEN_BRACKET paramsList? CLOSE_BRACKET OPEN_BRACE COMMENT NL (
        letStatement
        | ordinaryStatement
    )* returnStatement CLOSE_BRACE COMMENT NL
;

procedureMethod:
    PUBLIC VOID methodName OPEN_BRACKET paramsList? CLOSE_BRACKET OPEN_BRACE COMMENT NL
        ordinaryStatement* CLOSE_BRACE COMMENT NL
;

abstractFunction:
    ABSTRACT type methodName OPEN_BRACKET paramsList? CLOSE_BRACKET SEMI_COLON COMMENT NL
;

abstractProcedure:
    ABSTRACT VOID methodName OPEN_BRACKET paramsList? CLOSE_BRACKET SEMI_COLON COMMENT NL
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

index: OPEN_SQ_BRACKET expression CLOSE_SQ_BRACKET;

identifierWithOptIndexes: identifier index*;

propertyRef: THIS_INSTANCE DOT identifierWithOptIndexes;

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
    THIS_INSTANCE
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

paramDef: type identifier;

typeGeneric: typeName LT type (COMMA type)* GT;

typeTuple:
    TUPLE OPEN_SQ_BRACKET type (COMMA type)+ CLOSE_SQ_BRACKET
;

lambda: LAMBDA argList COLON expression;

list: OPEN_BRACE expression (COMMA expression)* CLOSE_BRACE;

interpolatedString: INTERPOLATED_STRING_PREFIX LITERAL_STRING;

power: term POWER term;

// END SubNodes