grammar Expressions;
import Elan_Lexer;

namespace: (TYPENAME | IDENTIFIER) (DOT (TYPENAME | IDENTIFIER))*;

assignableValue: (scopeQualifier?  IDENTIFIER index?) | deconstructedTuple | listDecomp;

procedureCall: scopeQualifier? IDENTIFIER OPEN_BRACKET (argumentList)? CLOSE_BRACKET;

functionCall: scopeQualifier? IDENTIFIER OPEN_BRACKET (argumentList)? CLOSE_BRACKET;

systemCall: SYSTEM DOT IDENTIFIER OPEN_BRACKET (argumentList)? CLOSE_BRACKET;

argument: (expression | lambda);

argumentList: argument (COMMA argument)*;


enumType: TYPENAME;
enumValue:	enumType DOT IDENTIFIER;

// INSTANTIATION
newInstance:
	NEW type OPEN_BRACKET argumentList? CLOSE_BRACKET;



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

