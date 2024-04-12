grammar Elan;
import Elan_Lexer;

file: comment
      (importStatement)*
	  global*;

comment: COMMENT_MARKER TEXT NL;
importStatement: IMPORT namespace; //Not implemented yet
namespace: (TYPENAME | IDENTIFIER) (DOT (TYPENAME | IDENTIFIER))*;//Not implemented yet

// GLOBALS
global: (main | procedure | function | constant | enum | class | test | comment);

main:	NL MAIN  
    	statementBlock
    	NL END MAIN;

procedure:	NL PROCEDURE procedureSignature
			statementBlock 
    		NL END PROCEDURE;

function: 	NL FUNCTION functionSignature
			statementBlock
			NL RETURN expression
    		NL END FUNCTION;

constant: NL CONSTANT IDENTIFIER SET TO literal;

class: mutableClass | abstractClass| immutableClass | abstractImmutableClass;

enum:	NL ENUM TYPENAME
	  	NL IDENTIFIER (COMMA IDENTIFIER)*  
		NL END ENUM;

test:	NL TEST IDENTIFIER
    	statementBlock
    	NL END TEST;

procedureSignature: IDENTIFIER OPEN_BRACKET paramList? CLOSE_BRACKET;
paramList: paramDef (COMMA paramDef)*;
paramDef: IDENTIFIER AS type;
functionSignature: IDENTIFIER OPEN_BRACKET paramList? CLOSE_BRACKET RETURN type;

// STATEMENT BLOCK
statementBlock:  ( singleLineStatement | multiLineStatement )*;
singleLineStatement: var | let | set |  call | throw | print | input | external | assert;
multiLineStatement: if | for | each | while | repeat | try | switch;

// SINGLE LINE STATEMENTS
var: NL VAR assignableValue SET TO expression;
set: NL SET assignableValue TO expression;
call: NL CALL (methodCall | (assignableValue DOT methodCall));
throw: NL THROW (LITERAL_STRING | IDENTIFIER ); 
print: NL PRINT expression?;
input: INPUT assignableValue;
external: NL EXTERNAL (methodCall | (assignableValue DOT methodCall)) (INTO assignableValue)?;
assert: NL ASSERT expression IS literal;
let: NL LET IDENTIFIER BE expression;

assignableValue: (PROPERTY DOT)?  IDENTIFIER index? | deconstructedTuple | deconstructedList;
methodCall: (PROPERTY|GLOBAL|LIBRARY|IDENTIFIER DOT)? IDENTIFIER OPEN_BRACKET (argList)? CLOSE_BRACKET;
argList: expression (COMMA expression)*;

// MULTI-LINE STATEMENTS (& CLAUSES)
if:		NL IF expression
    	statementBlock
		else*
    	NL END IF;

else:	ELSE (IF expression)?
		statementBlock;

for:	NL FOR IDENTIFIER FROM expression TO expression STEP MINUS? LITERAL_INTEGER
		statementBlock
		NL END FOR;

each: 	NL EACH IDENTIFIER IN expression 
    	statementBlock
    	NL END EACH;
          
while:	NL WHILE expression 
    	statementBlock
    	NL END WHILE;
          
repeat:	NL (REPEAT)
    	statementBlock
    	NL END REPEAT WHEN expression;

try:	NL TRY 
    	statementBlock
    	NL END TRY;

switch:	NL SWITCH expression
	  	case+
      	defaultCase
		NL END SWITCH;
	
case: 	NL CASE literalValue  
    	statementBlock;

defaultCase : 
		NL DEFAULT
    	statementBlock;

// CLASSES
mutableClass: 
	NL CLASS TYPENAME inherits?
	constructor
    (NL property | function | procedure )*	
    NL END CLASS;

abstractClass:
	NL ABSTRACT CLASS TYPENAME inherits?
    (NL ABSTRACT property | NL ABSTRACT FUNCTION functionSignature | NL ABSTRACT PROCEDURE procedureSignature)*
    NL END CLASS;

immutableClass: 
	NL IMMUTABLE CLASS TYPENAME inherits?
	constructor
    (NL property | function)*
    NL END CLASS ;

abstractImmutableClass:
	NL ABSTRACT IMMUTABLE CLASS TYPENAME inherits?
    (NL ABSTRACT property | NL ABSTRACT FUNCTION functionSignature)*
    NL END CLASS;
 
inherits: INHERITS type (COMMA type)*;

constructor: 
	NL CONSTRUCTOR OPEN_BRACKET paramList? CLOSE_BRACKET
    statementBlock
	NL END CONSTRUCTOR;

property: PRIVATE? PROPERTY IDENTIFIER AS type; 

// EXPRESSIONS
expression: term | (term binaryOp expression) | (term withClause);

term:	bracketedExpression // starts with '('
	| 	lambda  // Starts with 'lambda'
	|	ifExpression // starts with 'if'
	| 	newInstance // starts with 'new'
	|	unaryOp // starts with '-' or 'not'
	|	literal  //starts with 0-9, ", ', true, false, [, ( for tuple
	|	varRef //includes qualifier, instance DOT, and optional
	|	THIS
	|   defaultType
	|	methodCall  //Type checking will enforce that this must be a function call not a procedure
	|   dataStructureDefinition  //members are expressions, not literals
	;

bracketedExpression: OPEN_BRACKET expression CLOSE_BRACKET ; //made into rule so that compiler can add the brackets explicitly
lambda: LAMBDA paramList ARROW expression;
ifExpression: IF expression THEN expression ELSE expression;
newInstance: (NEW type OPEN_BRACKET argList? CLOSE_BRACKET);
unaryOp: (MINUS | NOT) term;
varRef: ((PROPERTY|GLOBAL|LIBRARY|IDENTIFIER) DOT)? IDENTIFIER index?;
defaultType: DEFAULT type;
index: OPEN_SQ_BRACKET (expression | expression COMMA expression | range) CLOSE_SQ_BRACKET;
range: expression DOUBLE_DOT expression | expression DOUBLE_DOT	| DOUBLE_DOT expression; 
withClause: WITH OPEN_SQ_BRACKET inlineAsignment (COMMA inlineAsignment)* CLOSE_BRACE;
inlineAsignment: assignableValue SET TO expression;

// LITERALS
literal: literalValue | literalDataStructure ; 

literalValue:  BOOL_VALUE | LITERAL_INTEGER | LITERAL_FLOAT | LITERAL_CHAR | enumValue ;
enumValue: TYPENAME DOT IDENTIFIER;
literalDataStructure: LITERAL_STRING | literalTuple | literalList | literalDictionary;
literalTuple:  OPEN_BRACKET literal COMMA literal (COMMA literal)* CLOSE_BRACKET; 

dataStructureDefinition:  listDefinition | tupleDefinition | dictionaryDefinition  ;
listDefinition: OPEN_SQ_BRACKET (expression (COMMA expression)*) CLOSE_SQ_BRACKET;
tupleDefinition:  OPEN_BRACKET expression COMMA expression (COMMA expression)* CLOSE_BRACKET; 
dictionaryDefinition: OPEN_SQ_BRACKET (kvp (COMMA kvp)* ) CLOSE_SQ_BRACKET;
kvp: expression COLON expression;

literalList: OPEN_SQ_BRACKET (literal (COMMA literal)* ) CLOSE_SQ_BRACKET;
literalDictionary: OPEN_SQ_BRACKET (literalKvp (COMMA literalKvp)*) CLOSE_SQ_BRACKET;
literalKvp: literal COLON literal;

deconstructedTuple: OPEN_BRACKET IDENTIFIER (COMMA IDENTIFIER)+  CLOSE_BRACKET;
deconstructedList: OPEN_SQ_BRACKET IDENTIFIER COLON IDENTIFIER CLOSE_SQ_BRACKET;

// Binary Ops
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
funcType: OPEN_BRACKET typeList ARROW type CLOSE_BRACKET; 

