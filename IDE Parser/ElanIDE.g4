grammar ElanIDE;
import Elan_Lexer;

file: (main | procedureDef | functionDef | constantDef | enumDef | classDef  );

main: 
	MAIN 
    statement*
    END MAIN 
    ;

// STATEMENTS
statement: varDef | assignment | proceduralControlFlow | callStatement;

callStatement: expression; //Intended for a freestanding procedure/system call as a statement, 
// or expression terminated by a procedure or system call that consumes result'.
// Not possible to specify this as a syntax distinct from an expression. Compile rules will enforce that you can't use a non-consumed expression

varDef: VAR assignableValue ASSIGN expression;

assignment: assignableValue ASSIGN expression;

assignableValue: (nameQualifier?  IDENTIFIER index?) | tupleDecomp | listDecomp;

methodCall: nameQualifier? (CURRY|PARTIAL)? IDENTIFIER genericSpecifier? OPEN_BRACKET (argumentList)? CLOSE_BRACKET;

argumentList: expression (COMMA expression)*;

// PROCEDURES
procedureDef:
	NL PROCEDURE procedureSignature
	statement* 
    NL END PROCEDURE
	;

procedureSignature: IDENTIFIER OPEN_BRACKET parameterList? CLOSE_BRACKET;

parameterList: parameter (COMMA parameter)*;

parameter: NL? IDENTIFIER type; 

// FUNCTIONS
functionDef: functionWithBody | expressionFunction;

functionWithBody: 
	NL FUNCTION functionSignature
	statementBlock
	NL RETURN expression
    NL END FUNCTION
	;

expressionFunction: 
	NL FUNCTION functionSignature NL? ARROW NL? letIn? expression; 

letIn: LET NL? assignableValue ASSIGN expression (COMMA assignableValue ASSIGN expression)* NL? IN NL?; 
   
functionSignature: IDENTIFIER OPEN_BRACKET parameterList? CLOSE_BRACKET NL? AS NL? type;

// CONSTANTS
constantDef: NL CONSTANT IDENTIFIER ASSIGN literal;

// ENUMERATIONS
enumDef: 
	NL ENUMERATION enumType
	  NL IDENTIFIER (COMMA NL? IDENTIFIER)*  
	NL END ENUMERATION
	;

enumType: TYPENAME;
enumValue:	enumType DOT IDENTIFIER;

// CLASSES
classDef: mutableClass | abstractClass| immutableClass | abstractImmutableClass;

mutableClass: 
	NL CLASS TYPENAME inherits?
	constructor
    (property | functionDef | procedureDef )*	
    NL END CLASS
	;

abstractClass:
	NL ABSTRACT CLASS TYPENAME inherits?
    (property | NL FUNCTION functionSignature | NL PROCEDURE procedureSignature)*
    NL END CLASS
	;

immutableClass: 
	NL IMMUTABLE CLASS TYPENAME inherits?
	constructor
    (property | functionDef )*
    NL END CLASS 
	;

abstractImmutableClass:
	NL ABSTRACT IMMUTABLE CLASS TYPENAME inherits?
    (property | NL FUNCTION functionSignature)*
    NL END CLASS
	;
 
inherits: INHERITS type (COMMA type)*;

property: NL PRIVATE? PROPERTY IDENTIFIER AS type; 

constructor: 
	NL CONSTRUCTOR OPEN_BRACKET parameterList? CLOSE_BRACKET
    statementBlock
	NL END CONSTRUCTOR
	;

// INSTANTIATION
newInstance:
	type OPEN_BRACKET argumentList? CLOSE_BRACKET withClause?
	| IDENTIFIER withClause
	;

withClause: WITH OPEN_BRACE assignment (COMMA assignment)* CLOSE_BRACE;

// CONTROL FLOW STATMENTS
proceduralControlFlow: if | for | forIn | while | repeat | try | switch;

if:
	NL IF expression THEN
    statementBlock
    (NL ELSE IF expression THEN
    statementBlock)*
    (NL ELSE
    statementBlock)?
    NL END IF
	;

for: 
	NL FOR IDENTIFIER ASSIGN expression TO expression (STEP MINUS? LITERAL_INTEGER)?
	statementBlock
	NL END FOR
	;

forIn: 
	NL FOR IDENTIFIER IN expression 
    statementBlock
    NL END FOR
	;
          
while: 
	NL WHILE expression 
    statementBlock
    NL END WHILE
	;
          
repeat: 
	NL (REPEAT)
    statementBlock
    NL UNTIL expression
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
	| methodCall
	| value
	| expression index
	| expression DOT methodCall
	| expression DOT IDENTIFIER 
	| unaryOp expression
	| expression POWER NL expression // to allow break after POWER
	| expression POWER expression // so that ^ has higher priority (because implemented with function in CSharp)
	| expression binaryOp expression
	| newInstance
	| ifExpression
	| lambda
	| NL expression // so that any expression may be broken over multiple lines at its 'natural joints' i.e. before any sub-expression
	;

bracketedExpression: OPEN_BRACKET expression CLOSE_BRACKET ; //made into rule so that compiler can add the brackets explicitly

ifExpression: NL? IF expression NL? THEN expression NL? ELSE expression;

lambda: LAMBDA argumentList ARROW expression;

index: OPEN_SQ_BRACKET (expression | expression COMMA expression | range) CLOSE_SQ_BRACKET;

range: expression DOUBLE_DOT expression | expression DOUBLE_DOT	| DOUBLE_DOT expression; 

// VALUES
value: literal | nameQualifier? IDENTIFIER  |dataStructureDefinition | SELF;

nameQualifier: (SELF | GLOBAL ) DOT; // might add 'namespace' as a further option in future
 
// LITERALS
literal: literalValue | literalDataStructure ; 

literalValue:  BOOL_VALUE | LITERAL_INTEGER | LITERAL_FLOAT | LITERAL_DECIMAL| LITERAL_CHAR | enumValue ;

dataStructureDefinition:  listDefinition | arrayDefinition | tupleDefinition | dictionaryDefinition  ;
 
literalDataStructure: LITERAL_STRING | literalTuple | literalList | literalDictionary;

tupleDefinition:  OPEN_BRACKET expression COMMA expression (COMMA expression)* CLOSE_BRACKET; 

literalTuple:  OPEN_BRACKET literal COMMA literal (COMMA literal)* CLOSE_BRACKET; 

tupleDecomp: OPEN_BRACKET IDENTIFIER (COMMA IDENTIFIER)+  CLOSE_BRACKET;
 
listDefinition: OPEN_BRACE (NL? expression (COMMA expression)* NL?) CLOSE_BRACE;

literalList: OPEN_BRACE (NL? literal (COMMA literal)* NL?) CLOSE_BRACE;

listDecomp: OPEN_BRACE IDENTIFIER COLON IDENTIFIER CLOSE_BRACE;

arrayDefinition: ARRAY genericSpecifier OPEN_BRACKET LITERAL_INTEGER? CLOSE_BRACKET;

dictionaryDefinition: OPEN_BRACE (NL? kvp (COMMA kvp)* NL?) CLOSE_BRACE;

literalDictionary: OPEN_BRACE (NL? literalKvp (COMMA literalKvp)* NL?) CLOSE_BRACE;

kvp: expression COLON expression;

literalKvp: literal COLON literal;

// OPERATIONS
unaryOp: MINUS | OP_NOT;

binaryOp: arithmeticOp | logicalOp | conditionalOp ;

arithmeticOp:  POWER | MULT | DIVIDE | MOD | INT_DIV | PLUS | MINUS;

logicalOp: OP_AND | OP_OR | OP_XOR;

conditionalOp: GT | LT | OP_GE | OP_LE | OP_EQ | OP_NE;

// TYPES
type:  VALUE_TYPE | dataStructureType | TYPENAME | TYPENAME genericSpecifier | tupleType |  funcType;

dataStructureType: (ARRAY | LIST | DICTIONARY | ITERABLE ) genericSpecifier;

genericSpecifier: LT type (COMMA type)* GT;

tupleType: OPEN_BRACKET type (COMMA type)+ CLOSE_BRACKET; 
    
funcType: OPEN_BRACKET type (COMMA type)*  ARROW type CLOSE_BRACKET; 

