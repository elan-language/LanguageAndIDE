grammar Elan;
import Elan_Lexer;

file: (main | procedureDef | functionDef | constantDef | enumDef | classDef | test | importStatement )* NL* EOF;

importStatement: IMPORT namespace;

namespace: (TYPENAME | IDENTIFIER) (DOT (TYPENAME | IDENTIFIER))*;

main:  
	NL MAIN  
    statementBlock
    NL END MAIN 
    ;

test: 
	NL TEST IDENTIFIER
    testStatements
    NL END TEST 
    ;

// STATEMENTS
statementBlock:  (varDef | assignment | proceduralControlFlow | callStatement | throwException | printStatement)*;

testStatements: (assert | varDef | callStatement)*;

assert: NL ASSERT expression IS value;

callStatement: NL CALL (procedureCall | (assignableValue DOT procedureCall));

throwException: NL THROW (LITERAL_STRING | IDENTIFIER );

printStatement: NL PRINT expression?;

varDef: NL VAR assignableValue SET TO expression;

assignment: NL SET assignableValue TO expression;

inlineAsignment: assignableValue SET TO expression;

assignableValue: (scopeQualifier?  IDENTIFIER index?) | deconstructedTuple | listDecomp;

procedureCall: scopeQualifier? IDENTIFIER OPEN_BRACKET (argumentList)? CLOSE_BRACKET;

functionCall: scopeQualifier? IDENTIFIER OPEN_BRACKET (argumentList)? CLOSE_BRACKET;

systemCall: SYSTEM DOT IDENTIFIER OPEN_BRACKET (argumentList)? CLOSE_BRACKET;

input: INPUT LITERAL_STRING?;

argument: (expression | lambda);

argumentList: argument (COMMA argument)*;

// PROCEDURES
procedureDef:
	NL PROCEDURE procedureSignature
	statementBlock 
    NL END PROCEDURE
	;

procedureSignature: IDENTIFIER OPEN_BRACKET procedureParameterList? CLOSE_BRACKET;

procedureParameterList: procedureParameter (COMMA procedureParameter)*;

parameterList: parameter (COMMA parameter)*;

parameter: IDENTIFIER type;

procedureParameter: OUT? IDENTIFIER type;

// FUNCTIONS
functionDef: 
	NL FUNCTION functionSignature
	statementBlock
	NL RETURN (expression | DEFAULT)
    NL END FUNCTION
	;
   
functionSignature: IDENTIFIER OPEN_BRACKET parameterList? CLOSE_BRACKET AS type;

// CONSTANTS
constantDef: NL CONSTANT IDENTIFIER SET TO (literal | newInstance);

// ENUMERATIONS
enumDef: 
	NL ENUM enumType
	  NL IDENTIFIER (COMMA IDENTIFIER)*  
	NL END ENUM
	;

enumType: TYPENAME;
enumValue:	enumType DOT IDENTIFIER;

// CLASSES
classDef: mutableClass | abstractClass| immutableClass | abstractImmutableClass;

mutableClass: 
	NL CLASS TYPENAME inherits?
	constructor
    (NL property | functionDef | procedureDef )*	
    NL END CLASS
	;

abstractClass:
	NL ABSTRACT CLASS TYPENAME inherits?
    (NL ABSTRACT property | NL ABSTRACT FUNCTION functionSignature | NL ABSTRACT PROCEDURE procedureSignature)*
    NL END CLASS
	;

immutableClass: 
	NL IMMUTABLE CLASS TYPENAME inherits?
	constructor
    (NL property | functionDef)*
    NL END CLASS 
	;

abstractImmutableClass:
	NL ABSTRACT IMMUTABLE CLASS TYPENAME inherits?
    (NL ABSTRACT property | NL ABSTRACT FUNCTION functionSignature)*
    NL END CLASS
	;
 
inherits: INHERITS type (COMMA type)*;

property: PRIVATE? PROPERTY IDENTIFIER type; 

constructor: 
	NL CONSTRUCTOR OPEN_BRACKET parameterList? CLOSE_BRACKET
    statementBlock
	NL END CONSTRUCTOR
	;

// INSTANTIATION
newInstance:
	NEW type OPEN_BRACKET argumentList? CLOSE_BRACKET withClause?
	| IDENTIFIER withClause
	;

withClause: WITH OPEN_BRACE inlineAsignment (COMMA inlineAsignment)* CLOSE_BRACE;

// CONTROL FLOW STATEMENTS
proceduralControlFlow: if | for | each | while | repeat | try | switch;

if:
	NL IF expression
    statementBlock
    (NL ELSE IF expression
    statementBlock)*
    (NL ELSE
    statementBlock)?
    NL END IF
	;

for: 
	NL FOR IDENTIFIER FROM expression TO expression (STEP MINUS? LITERAL_INTEGER)?
	statementBlock
	NL END FOR
	;

each: 
	NL EACH IDENTIFIER IN expression 
    statementBlock
    NL END EACH
	;
          
while: 
	NL WHILE expression 
    statementBlock
    NL END WHILE
	;
          
repeat: 
	NL (REPEAT)
    statementBlock
    NL END REPEAT WHEN expression
	;

try: 
	NL TRY 
    statementBlock
    NL CATCH IDENTIFIER 
	statementBlock
    NL END TRY
	;

switch: 
	NL SWITCH expression
	  case+
      caseDefault
	NL END SWITCH
	;
	
case: 
	NL CASE MINUS? literalValue
    statementBlock
	;

caseDefault : 
	NL DEFAULT
    statementBlock
	;

// EXPRESSIONS
expression: 
	  bracketedExpression
	| functionCall 
	| value
	| expression index
	| expression DOT functionCall
	| expression DOT IDENTIFIER 
	| unaryOp expression
	| expression POWER expression // so that ^ has higher priority (because implemented with function in CSharp)
	| expression binaryOp expression
	| newInstance
	| expression ifExpression elseExpression 
	| expression withClause
	| input
	| systemCall
	;

bracketedExpression: OPEN_BRACKET expression CLOSE_BRACKET ; //made into rule so that compiler can add the brackets explicitly

ifExpression: IF expression;

elseExpression : ELSE expression;

lambda: LAMBDA argumentList ARROW expression;

index: OPEN_SQ_BRACKET (expression | expression COMMA expression | range) CLOSE_SQ_BRACKET;

range: expression DOUBLE_DOT expression | expression DOUBLE_DOT	| DOUBLE_DOT expression; 

// VALUES
value: literal | scopeQualifier? IDENTIFIER  |dataStructureDefinition | THIS | DEFAULT type;

scopeQualifier: (PROPERTY | GLOBAL | LIBRARY | (PACKAGE DOT namespace)) DOT; 
 
// LITERALS
literal: literalValue | literalDataStructure ; 

literalValue:  BOOL_VALUE | LITERAL_INTEGER | LITERAL_FLOAT | LITERAL_CHAR | enumValue ;

dataStructureDefinition:  listDefinition | arrayDefinition | tupleDefinition | dictionaryDefinition  ;
 
literalDataStructure: LITERAL_STRING | literalTuple | literalList | literalDictionary;

tupleDefinition:  OPEN_BRACKET expression COMMA expression (COMMA expression)* CLOSE_BRACKET; 

literalTuple:  OPEN_BRACKET literal COMMA literal (COMMA literal)* CLOSE_BRACKET; 

deconstructedTuple: OPEN_BRACKET IDENTIFIER (COMMA IDENTIFIER)+  CLOSE_BRACKET;
 
listDefinition: OPEN_BRACE (expression (COMMA expression)*) CLOSE_BRACE;

literalList: OPEN_BRACE (literal (COMMA literal)* ) CLOSE_BRACE;

listDecomp: OPEN_BRACE IDENTIFIER COLON IDENTIFIER CLOSE_BRACE;

arrayDefinition: ARRAY genericSpecifier OPEN_BRACKET LITERAL_INTEGER? CLOSE_BRACKET;

dictionaryDefinition: OPEN_BRACE (kvp (COMMA kvp)* ) CLOSE_BRACE;

literalDictionary: OPEN_BRACE (literalKvp (COMMA literalKvp)*) CLOSE_BRACE;

kvp: expression COLON expression;

literalKvp: literal COLON literal;

// OPERATIONS
unaryOp: MINUS | NOT;

binaryOp: arithmeticOp | logicalOp | conditionalOp ;

arithmeticOp:  POWER | MULT | DIVIDE | MOD | DIV | PLUS | MINUS;

logicalOp: AND | OR | XOR;

conditionalOp: GT | LT | GE | LE | IS | IS_NOT;

// TYPES
type:  VALUE_TYPE | dataStructureType | TYPENAME | TYPENAME genericSpecifier | tupleType |  funcType;

dataStructureType: (ARRAY | LIST | DICTIONARY | ITERABLE ) genericSpecifier;

genericSpecifier: LT OF type (COMMA type)* GT;

tupleType: OPEN_BRACKET type (COMMA type)+ CLOSE_BRACKET; 

typeList: type (COMMA type)*;
    
funcType: OPEN_BRACKET typeList  ARROW type CLOSE_BRACKET; 

