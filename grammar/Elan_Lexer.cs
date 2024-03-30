//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated by a tool.
//     ANTLR Version: 4.13.1
//
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

// Generated from c://Elan//IDE//grammar//Elan_Lexer.g4 by ANTLR 4.13.1

// Unreachable code detected
#pragma warning disable 0162
// The variable '...' is assigned but its value is never used
#pragma warning disable 0219
// Missing XML comment for publicly visible type or member '...'
#pragma warning disable 1591
// Ambiguous reference in cref attribute
#pragma warning disable 419

using System;
using System.IO;
using System.Text;
using Antlr4.Runtime;
using Antlr4.Runtime.Atn;
using Antlr4.Runtime.Misc;
using DFA = Antlr4.Runtime.Dfa.DFA;

[System.CodeDom.Compiler.GeneratedCode("ANTLR", "4.13.1")]
[System.CLSCompliant(false)]
public partial class Elan_Lexer : Lexer {
	protected static DFA[] decisionToDFA;
	protected static PredictionContextCache sharedContextCache = new PredictionContextCache();
	public const int
		NL=1, SINGLE_LINE_COMMENT=2, COMMENT_MARKER=3, ABSTRACT=4, AND=5, AS=6, 
		BE_=7, ASSERT=8, CALL=9, CASE=10, CATCH=11, CLASS=12, CONSTANT=13, CONSTRUCTOR=14, 
		CURRY=15, DEFAULT=16, DIV=17, EACH=18, ELSE=19, EXT_=20, END=21, ENUM=22, 
		FOR=23, FROM=24, FUNCTION=25, GLOBAL=26, IF=27, IMMUTABLE=28, IMPORT=29, 
		IN=30, INTO_=31, INHERITS=32, INPUT=33, LAMBDA=34, LET=35, LIBRARY=36, 
		MAIN=37, MOD=38, NEW=39, NOT=40, OF=41, IS=42, OR=43, PACKAGE=44, PARTIAL=45, 
		PRINT=46, PRIVATE=47, PROCEDURE=48, PROPERTY=49, REPEAT=50, RETURN=51, 
		SET=52, STEP=53, SWITCH=54, SYSTEM=55, TEST=56, THEN=57, THIS=58, THROW=59, 
		TO=60, TRY=61, VAR=62, WHEN=63, WHILE=64, WITH=65, XOR=66, BOOL_VALUE=67, 
		VALUE_TYPE=68, ARRAY=69, LIST=70, DICTIONARY=71, ITERABLE=72, EQUALS=73, 
		ARROW=74, OPEN_BRACE=75, CLOSE_BRACE=76, OPEN_SQ_BRACKET=77, CLOSE_SQ_BRACKET=78, 
		OPEN_BRACKET=79, CLOSE_BRACKET=80, DOUBLE_DOT=81, DOT=82, COMMA=83, COLON=84, 
		PLUS=85, MINUS=86, MULT=87, DIVIDE=88, POWER=89, LT=90, GT=91, LE=92, 
		GE=93, IS_NOT=94, TYPENAME=95, IDENTIFIER=96, LITERAL_INTEGER=97, LITERAL_FLOAT=98, 
		LITERAL_CHAR=99, LITERAL_STRING=100, WHITESPACES=101, NEWLINE=102, WS=103;
	public static string[] channelNames = {
		"DEFAULT_TOKEN_CHANNEL", "HIDDEN"
	};

	public static string[] modeNames = {
		"DEFAULT_MODE"
	};

	public static readonly string[] ruleNames = {
		"NL", "SINGLE_LINE_COMMENT", "COMMENT_MARKER", "ABSTRACT", "AND", "AS", 
		"BE_", "ASSERT", "CALL", "CASE", "CATCH", "CLASS", "CONSTANT", "CONSTRUCTOR", 
		"CURRY", "DEFAULT", "DIV", "EACH", "ELSE", "EXT_", "END", "ENUM", "FOR", 
		"FROM", "FUNCTION", "GLOBAL", "IF", "IMMUTABLE", "IMPORT", "IN", "INTO_", 
		"INHERITS", "INPUT", "LAMBDA", "LET", "LIBRARY", "MAIN", "MOD", "NEW", 
		"NOT", "OF", "IS", "OR", "PACKAGE", "PARTIAL", "PRINT", "PRIVATE", "PROCEDURE", 
		"PROPERTY", "REPEAT", "RETURN", "SET", "STEP", "SWITCH", "SYSTEM", "TEST", 
		"THEN", "THIS", "THROW", "TO", "TRY", "VAR", "WHEN", "WHILE", "WITH", 
		"XOR", "BOOL_VALUE", "VALUE_TYPE", "ARRAY", "LIST", "DICTIONARY", "ITERABLE", 
		"EQUALS", "ARROW", "OPEN_BRACE", "CLOSE_BRACE", "OPEN_SQ_BRACKET", "CLOSE_SQ_BRACKET", 
		"OPEN_BRACKET", "CLOSE_BRACKET", "DOUBLE_DOT", "DOT", "COMMA", "COLON", 
		"PLUS", "MINUS", "MULT", "DIVIDE", "POWER", "LT", "GT", "LE", "GE", "IS_NOT", 
		"TYPENAME", "IDENTIFIER", "LITERAL_INTEGER", "LITERAL_FLOAT", "LITERAL_CHAR", 
		"LITERAL_STRING", "WHITESPACES", "InputCharacter", "NewLineCharacter", 
		"ExponentPart", "CommonCharacter", "SimpleEscapeSequence", "HexEscapeSequence", 
		"NewLine", "Whitespace", "UnicodeClassZS", "IdentifierStartingUCorLC", 
		"IdentifierStartingLC", "IdentifierStartingUC", "IdentifierPartCharacter", 
		"LetterCharacter", "DecimalDigitCharacter", "ConnectingCharacter", "FormattingCharacter", 
		"UnicodeEscapeSequence", "HexDigit", "UnicodeClassLU", "UnicodeClassLL", 
		"UnicodeClassND", "NEWLINE", "WS"
	};


	public Elan_Lexer(ICharStream input)
	: this(input, Console.Out, Console.Error) { }

	public Elan_Lexer(ICharStream input, TextWriter output, TextWriter errorOutput)
	: base(input, output, errorOutput)
	{
		Interpreter = new LexerATNSimulator(this, _ATN, decisionToDFA, sharedContextCache);
	}

	private static readonly string[] _LiteralNames = {
		null, null, null, "'#'", "'abstract'", "'and'", "'as'", "'be'", "'assert'", 
		"'call'", "'case'", "'catch'", "'class'", "'constant'", "'constructor'", 
		"'curry'", "'default'", "'div'", "'each'", "'else'", "'external'", "'end'", 
		"'enum'", "'for'", "'from'", "'function'", "'global'", "'if'", "'immutable'", 
		"'import'", "'in'", "'into'", "'inherits'", "'input'", "'lambda'", "'let'", 
		"'library'", "'main'", "'mod'", "'new'", "'not'", "'of'", "'is'", "'or'", 
		"'package'", "'partial'", "'print'", "'private'", "'procedure'", "'property'", 
		"'repeat'", "'return'", "'set'", "'step'", "'switch'", "'system'", "'test'", 
		"'then'", "'this'", "'throw'", "'to'", "'try'", "'var'", "'when'", "'while'", 
		"'with'", "'xor'", null, null, "'Array'", "'List'", "'Dictionary'", "'Iter'", 
		"'='", "'=>'", "'{'", "'}'", "'['", "']'", "'('", "')'", "'..'", "'.'", 
		"','", "':'", "'+'", "'-'", "'*'", "'/'", "'^'", "'<'", "'>'", "'<='", 
		"'>='"
	};
	private static readonly string[] _SymbolicNames = {
		null, "NL", "SINGLE_LINE_COMMENT", "COMMENT_MARKER", "ABSTRACT", "AND", 
		"AS", "BE_", "ASSERT", "CALL", "CASE", "CATCH", "CLASS", "CONSTANT", "CONSTRUCTOR", 
		"CURRY", "DEFAULT", "DIV", "EACH", "ELSE", "EXT_", "END", "ENUM", "FOR", 
		"FROM", "FUNCTION", "GLOBAL", "IF", "IMMUTABLE", "IMPORT", "IN", "INTO_", 
		"INHERITS", "INPUT", "LAMBDA", "LET", "LIBRARY", "MAIN", "MOD", "NEW", 
		"NOT", "OF", "IS", "OR", "PACKAGE", "PARTIAL", "PRINT", "PRIVATE", "PROCEDURE", 
		"PROPERTY", "REPEAT", "RETURN", "SET", "STEP", "SWITCH", "SYSTEM", "TEST", 
		"THEN", "THIS", "THROW", "TO", "TRY", "VAR", "WHEN", "WHILE", "WITH", 
		"XOR", "BOOL_VALUE", "VALUE_TYPE", "ARRAY", "LIST", "DICTIONARY", "ITERABLE", 
		"EQUALS", "ARROW", "OPEN_BRACE", "CLOSE_BRACE", "OPEN_SQ_BRACKET", "CLOSE_SQ_BRACKET", 
		"OPEN_BRACKET", "CLOSE_BRACKET", "DOUBLE_DOT", "DOT", "COMMA", "COLON", 
		"PLUS", "MINUS", "MULT", "DIVIDE", "POWER", "LT", "GT", "LE", "GE", "IS_NOT", 
		"TYPENAME", "IDENTIFIER", "LITERAL_INTEGER", "LITERAL_FLOAT", "LITERAL_CHAR", 
		"LITERAL_STRING", "WHITESPACES", "NEWLINE", "WS"
	};
	public static readonly IVocabulary DefaultVocabulary = new Vocabulary(_LiteralNames, _SymbolicNames);

	[NotNull]
	public override IVocabulary Vocabulary
	{
		get
		{
			return DefaultVocabulary;
		}
	}

	public override string GrammarFileName { get { return "Elan_Lexer.g4"; } }

	public override string[] RuleNames { get { return ruleNames; } }

	public override string[] ChannelNames { get { return channelNames; } }

	public override string[] ModeNames { get { return modeNames; } }

	public override int[] SerializedAtn { get { return _serializedATN; } }

	static Elan_Lexer() {
		decisionToDFA = new DFA[_ATN.NumberOfDecisions];
		for (int i = 0; i < _ATN.NumberOfDecisions; i++) {
			decisionToDFA[i] = new DFA(_ATN.GetDecisionState(i), i);
		}
	}
	private static int[] _serializedATN = {
		4,0,103,969,6,-1,2,0,7,0,2,1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,7,
		6,2,7,7,7,2,8,7,8,2,9,7,9,2,10,7,10,2,11,7,11,2,12,7,12,2,13,7,13,2,14,
		7,14,2,15,7,15,2,16,7,16,2,17,7,17,2,18,7,18,2,19,7,19,2,20,7,20,2,21,
		7,21,2,22,7,22,2,23,7,23,2,24,7,24,2,25,7,25,2,26,7,26,2,27,7,27,2,28,
		7,28,2,29,7,29,2,30,7,30,2,31,7,31,2,32,7,32,2,33,7,33,2,34,7,34,2,35,
		7,35,2,36,7,36,2,37,7,37,2,38,7,38,2,39,7,39,2,40,7,40,2,41,7,41,2,42,
		7,42,2,43,7,43,2,44,7,44,2,45,7,45,2,46,7,46,2,47,7,47,2,48,7,48,2,49,
		7,49,2,50,7,50,2,51,7,51,2,52,7,52,2,53,7,53,2,54,7,54,2,55,7,55,2,56,
		7,56,2,57,7,57,2,58,7,58,2,59,7,59,2,60,7,60,2,61,7,61,2,62,7,62,2,63,
		7,63,2,64,7,64,2,65,7,65,2,66,7,66,2,67,7,67,2,68,7,68,2,69,7,69,2,70,
		7,70,2,71,7,71,2,72,7,72,2,73,7,73,2,74,7,74,2,75,7,75,2,76,7,76,2,77,
		7,77,2,78,7,78,2,79,7,79,2,80,7,80,2,81,7,81,2,82,7,82,2,83,7,83,2,84,
		7,84,2,85,7,85,2,86,7,86,2,87,7,87,2,88,7,88,2,89,7,89,2,90,7,90,2,91,
		7,91,2,92,7,92,2,93,7,93,2,94,7,94,2,95,7,95,2,96,7,96,2,97,7,97,2,98,
		7,98,2,99,7,99,2,100,7,100,2,101,7,101,2,102,7,102,2,103,7,103,2,104,7,
		104,2,105,7,105,2,106,7,106,2,107,7,107,2,108,7,108,2,109,7,109,2,110,
		7,110,2,111,7,111,2,112,7,112,2,113,7,113,2,114,7,114,2,115,7,115,2,116,
		7,116,2,117,7,117,2,118,7,118,2,119,7,119,2,120,7,120,2,121,7,121,2,122,
		7,122,2,123,7,123,2,124,7,124,1,0,4,0,253,8,0,11,0,12,0,254,1,1,3,1,258,
		8,1,1,1,5,1,261,8,1,10,1,12,1,264,9,1,1,1,1,1,5,1,268,8,1,10,1,12,1,271,
		9,1,1,1,1,1,1,2,1,2,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,4,1,4,1,4,1,
		4,1,5,1,5,1,5,1,6,1,6,1,6,1,7,1,7,1,7,1,7,1,7,1,7,1,7,1,8,1,8,1,8,1,8,
		1,8,1,9,1,9,1,9,1,9,1,9,1,10,1,10,1,10,1,10,1,10,1,10,1,11,1,11,1,11,1,
		11,1,11,1,11,1,12,1,12,1,12,1,12,1,12,1,12,1,12,1,12,1,12,1,13,1,13,1,
		13,1,13,1,13,1,13,1,13,1,13,1,13,1,13,1,13,1,13,1,14,1,14,1,14,1,14,1,
		14,1,14,1,15,1,15,1,15,1,15,1,15,1,15,1,15,1,15,1,16,1,16,1,16,1,16,1,
		17,1,17,1,17,1,17,1,17,1,18,1,18,1,18,1,18,1,18,1,19,1,19,1,19,1,19,1,
		19,1,19,1,19,1,19,1,19,1,20,1,20,1,20,1,20,1,21,1,21,1,21,1,21,1,21,1,
		22,1,22,1,22,1,22,1,23,1,23,1,23,1,23,1,23,1,24,1,24,1,24,1,24,1,24,1,
		24,1,24,1,24,1,24,1,25,1,25,1,25,1,25,1,25,1,25,1,25,1,26,1,26,1,26,1,
		27,1,27,1,27,1,27,1,27,1,27,1,27,1,27,1,27,1,27,1,28,1,28,1,28,1,28,1,
		28,1,28,1,28,1,29,1,29,1,29,1,30,1,30,1,30,1,30,1,30,1,31,1,31,1,31,1,
		31,1,31,1,31,1,31,1,31,1,31,1,32,1,32,1,32,1,32,1,32,1,32,1,33,1,33,1,
		33,1,33,1,33,1,33,1,33,1,34,1,34,1,34,1,34,1,35,1,35,1,35,1,35,1,35,1,
		35,1,35,1,35,1,36,1,36,1,36,1,36,1,36,1,37,1,37,1,37,1,37,1,38,1,38,1,
		38,1,38,1,39,1,39,1,39,1,39,1,40,1,40,1,40,1,41,1,41,1,41,1,42,1,42,1,
		42,1,43,1,43,1,43,1,43,1,43,1,43,1,43,1,43,1,44,1,44,1,44,1,44,1,44,1,
		44,1,44,1,44,1,45,1,45,1,45,1,45,1,45,1,45,1,46,1,46,1,46,1,46,1,46,1,
		46,1,46,1,46,1,47,1,47,1,47,1,47,1,47,1,47,1,47,1,47,1,47,1,47,1,48,1,
		48,1,48,1,48,1,48,1,48,1,48,1,48,1,48,1,49,1,49,1,49,1,49,1,49,1,49,1,
		49,1,50,1,50,1,50,1,50,1,50,1,50,1,50,1,51,1,51,1,51,1,51,1,52,1,52,1,
		52,1,52,1,52,1,53,1,53,1,53,1,53,1,53,1,53,1,53,1,54,1,54,1,54,1,54,1,
		54,1,54,1,54,1,55,1,55,1,55,1,55,1,55,1,56,1,56,1,56,1,56,1,56,1,57,1,
		57,1,57,1,57,1,57,1,58,1,58,1,58,1,58,1,58,1,58,1,59,1,59,1,59,1,60,1,
		60,1,60,1,60,1,61,1,61,1,61,1,61,1,62,1,62,1,62,1,62,1,62,1,63,1,63,1,
		63,1,63,1,63,1,63,1,64,1,64,1,64,1,64,1,64,1,65,1,65,1,65,1,65,1,66,1,
		66,1,66,1,66,1,66,1,66,1,66,1,66,1,66,3,66,652,8,66,1,67,1,67,1,67,1,67,
		1,67,1,67,1,67,1,67,1,67,1,67,1,67,1,67,1,67,1,67,1,67,1,67,1,67,1,67,
		1,67,1,67,1,67,1,67,3,67,676,8,67,1,68,1,68,1,68,1,68,1,68,1,68,1,69,1,
		69,1,69,1,69,1,69,1,70,1,70,1,70,1,70,1,70,1,70,1,70,1,70,1,70,1,70,1,
		70,1,71,1,71,1,71,1,71,1,71,1,72,1,72,1,73,1,73,1,73,1,74,1,74,1,75,1,
		75,1,76,1,76,1,77,1,77,1,78,1,78,1,79,1,79,1,80,1,80,1,80,1,81,1,81,1,
		82,1,82,1,83,1,83,1,84,1,84,1,85,1,85,1,86,1,86,1,87,1,87,1,88,1,88,1,
		89,1,89,1,90,1,90,1,91,1,91,1,91,1,92,1,92,1,92,1,93,1,93,5,93,753,8,93,
		10,93,12,93,756,9,93,1,93,1,93,1,94,1,94,1,95,1,95,1,96,1,96,5,96,766,
		8,96,10,96,12,96,769,9,96,1,97,1,97,1,97,1,97,3,97,775,8,97,1,98,1,98,
		1,98,3,98,780,8,98,1,98,1,98,1,98,3,98,785,8,98,1,99,1,99,1,99,5,99,790,
		8,99,10,99,12,99,793,9,99,1,99,1,99,1,100,4,100,798,8,100,11,100,12,100,
		799,1,100,1,100,1,101,1,101,1,102,1,102,1,103,1,103,1,103,3,103,811,8,
		103,1,103,1,103,1,104,1,104,1,104,3,104,818,8,104,1,105,1,105,1,105,1,
		105,1,105,1,105,1,105,1,105,1,105,1,105,1,105,1,105,1,105,1,105,1,105,
		1,105,1,105,1,105,1,105,1,105,1,105,1,105,3,105,842,8,105,1,106,1,106,
		1,106,1,106,1,106,1,106,1,106,1,106,1,106,1,106,1,106,1,106,1,106,1,106,
		1,106,1,106,1,106,1,106,1,106,1,106,1,106,1,106,1,106,1,106,1,106,3,106,
		869,8,106,1,107,1,107,1,107,3,107,874,8,107,1,108,1,108,3,108,878,8,108,
		1,109,1,109,1,110,1,110,3,110,884,8,110,1,110,5,110,887,8,110,10,110,12,
		110,890,9,110,1,111,1,111,5,111,894,8,111,10,111,12,111,897,9,111,1,112,
		1,112,5,112,901,8,112,10,112,12,112,904,9,112,1,113,1,113,1,113,1,113,
		3,113,910,8,113,1,114,1,114,1,114,3,114,915,8,114,1,115,1,115,3,115,919,
		8,115,1,116,1,116,1,117,1,117,1,118,1,118,1,118,1,118,1,118,1,118,1,118,
		1,118,1,118,1,118,1,118,1,118,1,118,1,118,1,118,1,118,1,118,1,118,1,118,
		1,118,3,118,945,8,118,1,119,3,119,948,8,119,1,120,1,120,1,121,1,121,1,
		122,1,122,1,123,3,123,957,8,123,1,123,1,123,3,123,961,8,123,1,124,4,124,
		964,8,124,11,124,12,124,965,1,124,1,124,0,0,125,1,1,3,2,5,3,7,4,9,5,11,
		6,13,7,15,8,17,9,19,10,21,11,23,12,25,13,27,14,29,15,31,16,33,17,35,18,
		37,19,39,20,41,21,43,22,45,23,47,24,49,25,51,26,53,27,55,28,57,29,59,30,
		61,31,63,32,65,33,67,34,69,35,71,36,73,37,75,38,77,39,79,40,81,41,83,42,
		85,43,87,44,89,45,91,46,93,47,95,48,97,49,99,50,101,51,103,52,105,53,107,
		54,109,55,111,56,113,57,115,58,117,59,119,60,121,61,123,62,125,63,127,
		64,129,65,131,66,133,67,135,68,137,69,139,70,141,71,143,72,145,73,147,
		74,149,75,151,76,153,77,155,78,157,79,159,80,161,81,163,82,165,83,167,
		84,169,85,171,86,173,87,175,88,177,89,179,90,181,91,183,92,185,93,187,
		94,189,95,191,96,193,97,195,98,197,99,199,100,201,101,203,0,205,0,207,
		0,209,0,211,0,213,0,215,0,217,0,219,0,221,0,223,0,225,0,227,0,229,0,231,
		0,233,0,235,0,237,0,239,0,241,0,243,0,245,0,247,102,249,103,1,0,10,2,0,
		10,10,12,13,1,0,48,57,5,0,10,10,13,13,39,39,92,92,133,133,2,0,34,34,133,
		133,3,0,10,10,13,13,133,133,1,0,101,101,2,0,9,9,11,12,2,0,32,32,160,160,
		3,0,48,57,65,70,97,102,2,0,9,9,32,32,996,0,1,1,0,0,0,0,3,1,0,0,0,0,5,1,
		0,0,0,0,7,1,0,0,0,0,9,1,0,0,0,0,11,1,0,0,0,0,13,1,0,0,0,0,15,1,0,0,0,0,
		17,1,0,0,0,0,19,1,0,0,0,0,21,1,0,0,0,0,23,1,0,0,0,0,25,1,0,0,0,0,27,1,
		0,0,0,0,29,1,0,0,0,0,31,1,0,0,0,0,33,1,0,0,0,0,35,1,0,0,0,0,37,1,0,0,0,
		0,39,1,0,0,0,0,41,1,0,0,0,0,43,1,0,0,0,0,45,1,0,0,0,0,47,1,0,0,0,0,49,
		1,0,0,0,0,51,1,0,0,0,0,53,1,0,0,0,0,55,1,0,0,0,0,57,1,0,0,0,0,59,1,0,0,
		0,0,61,1,0,0,0,0,63,1,0,0,0,0,65,1,0,0,0,0,67,1,0,0,0,0,69,1,0,0,0,0,71,
		1,0,0,0,0,73,1,0,0,0,0,75,1,0,0,0,0,77,1,0,0,0,0,79,1,0,0,0,0,81,1,0,0,
		0,0,83,1,0,0,0,0,85,1,0,0,0,0,87,1,0,0,0,0,89,1,0,0,0,0,91,1,0,0,0,0,93,
		1,0,0,0,0,95,1,0,0,0,0,97,1,0,0,0,0,99,1,0,0,0,0,101,1,0,0,0,0,103,1,0,
		0,0,0,105,1,0,0,0,0,107,1,0,0,0,0,109,1,0,0,0,0,111,1,0,0,0,0,113,1,0,
		0,0,0,115,1,0,0,0,0,117,1,0,0,0,0,119,1,0,0,0,0,121,1,0,0,0,0,123,1,0,
		0,0,0,125,1,0,0,0,0,127,1,0,0,0,0,129,1,0,0,0,0,131,1,0,0,0,0,133,1,0,
		0,0,0,135,1,0,0,0,0,137,1,0,0,0,0,139,1,0,0,0,0,141,1,0,0,0,0,143,1,0,
		0,0,0,145,1,0,0,0,0,147,1,0,0,0,0,149,1,0,0,0,0,151,1,0,0,0,0,153,1,0,
		0,0,0,155,1,0,0,0,0,157,1,0,0,0,0,159,1,0,0,0,0,161,1,0,0,0,0,163,1,0,
		0,0,0,165,1,0,0,0,0,167,1,0,0,0,0,169,1,0,0,0,0,171,1,0,0,0,0,173,1,0,
		0,0,0,175,1,0,0,0,0,177,1,0,0,0,0,179,1,0,0,0,0,181,1,0,0,0,0,183,1,0,
		0,0,0,185,1,0,0,0,0,187,1,0,0,0,0,189,1,0,0,0,0,191,1,0,0,0,0,193,1,0,
		0,0,0,195,1,0,0,0,0,197,1,0,0,0,0,199,1,0,0,0,0,201,1,0,0,0,0,247,1,0,
		0,0,0,249,1,0,0,0,1,252,1,0,0,0,3,257,1,0,0,0,5,274,1,0,0,0,7,276,1,0,
		0,0,9,285,1,0,0,0,11,289,1,0,0,0,13,292,1,0,0,0,15,295,1,0,0,0,17,302,
		1,0,0,0,19,307,1,0,0,0,21,312,1,0,0,0,23,318,1,0,0,0,25,324,1,0,0,0,27,
		333,1,0,0,0,29,345,1,0,0,0,31,351,1,0,0,0,33,359,1,0,0,0,35,363,1,0,0,
		0,37,368,1,0,0,0,39,373,1,0,0,0,41,382,1,0,0,0,43,386,1,0,0,0,45,391,1,
		0,0,0,47,395,1,0,0,0,49,400,1,0,0,0,51,409,1,0,0,0,53,416,1,0,0,0,55,419,
		1,0,0,0,57,429,1,0,0,0,59,436,1,0,0,0,61,439,1,0,0,0,63,444,1,0,0,0,65,
		453,1,0,0,0,67,459,1,0,0,0,69,466,1,0,0,0,71,470,1,0,0,0,73,478,1,0,0,
		0,75,483,1,0,0,0,77,487,1,0,0,0,79,491,1,0,0,0,81,495,1,0,0,0,83,498,1,
		0,0,0,85,501,1,0,0,0,87,504,1,0,0,0,89,512,1,0,0,0,91,520,1,0,0,0,93,526,
		1,0,0,0,95,534,1,0,0,0,97,544,1,0,0,0,99,553,1,0,0,0,101,560,1,0,0,0,103,
		567,1,0,0,0,105,571,1,0,0,0,107,576,1,0,0,0,109,583,1,0,0,0,111,590,1,
		0,0,0,113,595,1,0,0,0,115,600,1,0,0,0,117,605,1,0,0,0,119,611,1,0,0,0,
		121,614,1,0,0,0,123,618,1,0,0,0,125,622,1,0,0,0,127,627,1,0,0,0,129,633,
		1,0,0,0,131,638,1,0,0,0,133,651,1,0,0,0,135,675,1,0,0,0,137,677,1,0,0,
		0,139,683,1,0,0,0,141,688,1,0,0,0,143,699,1,0,0,0,145,704,1,0,0,0,147,
		706,1,0,0,0,149,709,1,0,0,0,151,711,1,0,0,0,153,713,1,0,0,0,155,715,1,
		0,0,0,157,717,1,0,0,0,159,719,1,0,0,0,161,721,1,0,0,0,163,724,1,0,0,0,
		165,726,1,0,0,0,167,728,1,0,0,0,169,730,1,0,0,0,171,732,1,0,0,0,173,734,
		1,0,0,0,175,736,1,0,0,0,177,738,1,0,0,0,179,740,1,0,0,0,181,742,1,0,0,
		0,183,744,1,0,0,0,185,747,1,0,0,0,187,750,1,0,0,0,189,759,1,0,0,0,191,
		761,1,0,0,0,193,763,1,0,0,0,195,770,1,0,0,0,197,784,1,0,0,0,199,786,1,
		0,0,0,201,797,1,0,0,0,203,803,1,0,0,0,205,805,1,0,0,0,207,807,1,0,0,0,
		209,817,1,0,0,0,211,841,1,0,0,0,213,868,1,0,0,0,215,873,1,0,0,0,217,877,
		1,0,0,0,219,879,1,0,0,0,221,883,1,0,0,0,223,891,1,0,0,0,225,898,1,0,0,
		0,227,909,1,0,0,0,229,914,1,0,0,0,231,918,1,0,0,0,233,920,1,0,0,0,235,
		922,1,0,0,0,237,944,1,0,0,0,239,947,1,0,0,0,241,949,1,0,0,0,243,951,1,
		0,0,0,245,953,1,0,0,0,247,960,1,0,0,0,249,963,1,0,0,0,251,253,7,0,0,0,
		252,251,1,0,0,0,253,254,1,0,0,0,254,252,1,0,0,0,254,255,1,0,0,0,255,2,
		1,0,0,0,256,258,3,1,0,0,257,256,1,0,0,0,257,258,1,0,0,0,258,262,1,0,0,
		0,259,261,3,217,108,0,260,259,1,0,0,0,261,264,1,0,0,0,262,260,1,0,0,0,
		262,263,1,0,0,0,263,265,1,0,0,0,264,262,1,0,0,0,265,269,3,5,2,0,266,268,
		3,203,101,0,267,266,1,0,0,0,268,271,1,0,0,0,269,267,1,0,0,0,269,270,1,
		0,0,0,270,272,1,0,0,0,271,269,1,0,0,0,272,273,6,1,0,0,273,4,1,0,0,0,274,
		275,5,35,0,0,275,6,1,0,0,0,276,277,5,97,0,0,277,278,5,98,0,0,278,279,5,
		115,0,0,279,280,5,116,0,0,280,281,5,114,0,0,281,282,5,97,0,0,282,283,5,
		99,0,0,283,284,5,116,0,0,284,8,1,0,0,0,285,286,5,97,0,0,286,287,5,110,
		0,0,287,288,5,100,0,0,288,10,1,0,0,0,289,290,5,97,0,0,290,291,5,115,0,
		0,291,12,1,0,0,0,292,293,5,98,0,0,293,294,5,101,0,0,294,14,1,0,0,0,295,
		296,5,97,0,0,296,297,5,115,0,0,297,298,5,115,0,0,298,299,5,101,0,0,299,
		300,5,114,0,0,300,301,5,116,0,0,301,16,1,0,0,0,302,303,5,99,0,0,303,304,
		5,97,0,0,304,305,5,108,0,0,305,306,5,108,0,0,306,18,1,0,0,0,307,308,5,
		99,0,0,308,309,5,97,0,0,309,310,5,115,0,0,310,311,5,101,0,0,311,20,1,0,
		0,0,312,313,5,99,0,0,313,314,5,97,0,0,314,315,5,116,0,0,315,316,5,99,0,
		0,316,317,5,104,0,0,317,22,1,0,0,0,318,319,5,99,0,0,319,320,5,108,0,0,
		320,321,5,97,0,0,321,322,5,115,0,0,322,323,5,115,0,0,323,24,1,0,0,0,324,
		325,5,99,0,0,325,326,5,111,0,0,326,327,5,110,0,0,327,328,5,115,0,0,328,
		329,5,116,0,0,329,330,5,97,0,0,330,331,5,110,0,0,331,332,5,116,0,0,332,
		26,1,0,0,0,333,334,5,99,0,0,334,335,5,111,0,0,335,336,5,110,0,0,336,337,
		5,115,0,0,337,338,5,116,0,0,338,339,5,114,0,0,339,340,5,117,0,0,340,341,
		5,99,0,0,341,342,5,116,0,0,342,343,5,111,0,0,343,344,5,114,0,0,344,28,
		1,0,0,0,345,346,5,99,0,0,346,347,5,117,0,0,347,348,5,114,0,0,348,349,5,
		114,0,0,349,350,5,121,0,0,350,30,1,0,0,0,351,352,5,100,0,0,352,353,5,101,
		0,0,353,354,5,102,0,0,354,355,5,97,0,0,355,356,5,117,0,0,356,357,5,108,
		0,0,357,358,5,116,0,0,358,32,1,0,0,0,359,360,5,100,0,0,360,361,5,105,0,
		0,361,362,5,118,0,0,362,34,1,0,0,0,363,364,5,101,0,0,364,365,5,97,0,0,
		365,366,5,99,0,0,366,367,5,104,0,0,367,36,1,0,0,0,368,369,5,101,0,0,369,
		370,5,108,0,0,370,371,5,115,0,0,371,372,5,101,0,0,372,38,1,0,0,0,373,374,
		5,101,0,0,374,375,5,120,0,0,375,376,5,116,0,0,376,377,5,101,0,0,377,378,
		5,114,0,0,378,379,5,110,0,0,379,380,5,97,0,0,380,381,5,108,0,0,381,40,
		1,0,0,0,382,383,5,101,0,0,383,384,5,110,0,0,384,385,5,100,0,0,385,42,1,
		0,0,0,386,387,5,101,0,0,387,388,5,110,0,0,388,389,5,117,0,0,389,390,5,
		109,0,0,390,44,1,0,0,0,391,392,5,102,0,0,392,393,5,111,0,0,393,394,5,114,
		0,0,394,46,1,0,0,0,395,396,5,102,0,0,396,397,5,114,0,0,397,398,5,111,0,
		0,398,399,5,109,0,0,399,48,1,0,0,0,400,401,5,102,0,0,401,402,5,117,0,0,
		402,403,5,110,0,0,403,404,5,99,0,0,404,405,5,116,0,0,405,406,5,105,0,0,
		406,407,5,111,0,0,407,408,5,110,0,0,408,50,1,0,0,0,409,410,5,103,0,0,410,
		411,5,108,0,0,411,412,5,111,0,0,412,413,5,98,0,0,413,414,5,97,0,0,414,
		415,5,108,0,0,415,52,1,0,0,0,416,417,5,105,0,0,417,418,5,102,0,0,418,54,
		1,0,0,0,419,420,5,105,0,0,420,421,5,109,0,0,421,422,5,109,0,0,422,423,
		5,117,0,0,423,424,5,116,0,0,424,425,5,97,0,0,425,426,5,98,0,0,426,427,
		5,108,0,0,427,428,5,101,0,0,428,56,1,0,0,0,429,430,5,105,0,0,430,431,5,
		109,0,0,431,432,5,112,0,0,432,433,5,111,0,0,433,434,5,114,0,0,434,435,
		5,116,0,0,435,58,1,0,0,0,436,437,5,105,0,0,437,438,5,110,0,0,438,60,1,
		0,0,0,439,440,5,105,0,0,440,441,5,110,0,0,441,442,5,116,0,0,442,443,5,
		111,0,0,443,62,1,0,0,0,444,445,5,105,0,0,445,446,5,110,0,0,446,447,5,104,
		0,0,447,448,5,101,0,0,448,449,5,114,0,0,449,450,5,105,0,0,450,451,5,116,
		0,0,451,452,5,115,0,0,452,64,1,0,0,0,453,454,5,105,0,0,454,455,5,110,0,
		0,455,456,5,112,0,0,456,457,5,117,0,0,457,458,5,116,0,0,458,66,1,0,0,0,
		459,460,5,108,0,0,460,461,5,97,0,0,461,462,5,109,0,0,462,463,5,98,0,0,
		463,464,5,100,0,0,464,465,5,97,0,0,465,68,1,0,0,0,466,467,5,108,0,0,467,
		468,5,101,0,0,468,469,5,116,0,0,469,70,1,0,0,0,470,471,5,108,0,0,471,472,
		5,105,0,0,472,473,5,98,0,0,473,474,5,114,0,0,474,475,5,97,0,0,475,476,
		5,114,0,0,476,477,5,121,0,0,477,72,1,0,0,0,478,479,5,109,0,0,479,480,5,
		97,0,0,480,481,5,105,0,0,481,482,5,110,0,0,482,74,1,0,0,0,483,484,5,109,
		0,0,484,485,5,111,0,0,485,486,5,100,0,0,486,76,1,0,0,0,487,488,5,110,0,
		0,488,489,5,101,0,0,489,490,5,119,0,0,490,78,1,0,0,0,491,492,5,110,0,0,
		492,493,5,111,0,0,493,494,5,116,0,0,494,80,1,0,0,0,495,496,5,111,0,0,496,
		497,5,102,0,0,497,82,1,0,0,0,498,499,5,105,0,0,499,500,5,115,0,0,500,84,
		1,0,0,0,501,502,5,111,0,0,502,503,5,114,0,0,503,86,1,0,0,0,504,505,5,112,
		0,0,505,506,5,97,0,0,506,507,5,99,0,0,507,508,5,107,0,0,508,509,5,97,0,
		0,509,510,5,103,0,0,510,511,5,101,0,0,511,88,1,0,0,0,512,513,5,112,0,0,
		513,514,5,97,0,0,514,515,5,114,0,0,515,516,5,116,0,0,516,517,5,105,0,0,
		517,518,5,97,0,0,518,519,5,108,0,0,519,90,1,0,0,0,520,521,5,112,0,0,521,
		522,5,114,0,0,522,523,5,105,0,0,523,524,5,110,0,0,524,525,5,116,0,0,525,
		92,1,0,0,0,526,527,5,112,0,0,527,528,5,114,0,0,528,529,5,105,0,0,529,530,
		5,118,0,0,530,531,5,97,0,0,531,532,5,116,0,0,532,533,5,101,0,0,533,94,
		1,0,0,0,534,535,5,112,0,0,535,536,5,114,0,0,536,537,5,111,0,0,537,538,
		5,99,0,0,538,539,5,101,0,0,539,540,5,100,0,0,540,541,5,117,0,0,541,542,
		5,114,0,0,542,543,5,101,0,0,543,96,1,0,0,0,544,545,5,112,0,0,545,546,5,
		114,0,0,546,547,5,111,0,0,547,548,5,112,0,0,548,549,5,101,0,0,549,550,
		5,114,0,0,550,551,5,116,0,0,551,552,5,121,0,0,552,98,1,0,0,0,553,554,5,
		114,0,0,554,555,5,101,0,0,555,556,5,112,0,0,556,557,5,101,0,0,557,558,
		5,97,0,0,558,559,5,116,0,0,559,100,1,0,0,0,560,561,5,114,0,0,561,562,5,
		101,0,0,562,563,5,116,0,0,563,564,5,117,0,0,564,565,5,114,0,0,565,566,
		5,110,0,0,566,102,1,0,0,0,567,568,5,115,0,0,568,569,5,101,0,0,569,570,
		5,116,0,0,570,104,1,0,0,0,571,572,5,115,0,0,572,573,5,116,0,0,573,574,
		5,101,0,0,574,575,5,112,0,0,575,106,1,0,0,0,576,577,5,115,0,0,577,578,
		5,119,0,0,578,579,5,105,0,0,579,580,5,116,0,0,580,581,5,99,0,0,581,582,
		5,104,0,0,582,108,1,0,0,0,583,584,5,115,0,0,584,585,5,121,0,0,585,586,
		5,115,0,0,586,587,5,116,0,0,587,588,5,101,0,0,588,589,5,109,0,0,589,110,
		1,0,0,0,590,591,5,116,0,0,591,592,5,101,0,0,592,593,5,115,0,0,593,594,
		5,116,0,0,594,112,1,0,0,0,595,596,5,116,0,0,596,597,5,104,0,0,597,598,
		5,101,0,0,598,599,5,110,0,0,599,114,1,0,0,0,600,601,5,116,0,0,601,602,
		5,104,0,0,602,603,5,105,0,0,603,604,5,115,0,0,604,116,1,0,0,0,605,606,
		5,116,0,0,606,607,5,104,0,0,607,608,5,114,0,0,608,609,5,111,0,0,609,610,
		5,119,0,0,610,118,1,0,0,0,611,612,5,116,0,0,612,613,5,111,0,0,613,120,
		1,0,0,0,614,615,5,116,0,0,615,616,5,114,0,0,616,617,5,121,0,0,617,122,
		1,0,0,0,618,619,5,118,0,0,619,620,5,97,0,0,620,621,5,114,0,0,621,124,1,
		0,0,0,622,623,5,119,0,0,623,624,5,104,0,0,624,625,5,101,0,0,625,626,5,
		110,0,0,626,126,1,0,0,0,627,628,5,119,0,0,628,629,5,104,0,0,629,630,5,
		105,0,0,630,631,5,108,0,0,631,632,5,101,0,0,632,128,1,0,0,0,633,634,5,
		119,0,0,634,635,5,105,0,0,635,636,5,116,0,0,636,637,5,104,0,0,637,130,
		1,0,0,0,638,639,5,120,0,0,639,640,5,111,0,0,640,641,5,114,0,0,641,132,
		1,0,0,0,642,643,5,116,0,0,643,644,5,114,0,0,644,645,5,117,0,0,645,652,
		5,101,0,0,646,647,5,102,0,0,647,648,5,97,0,0,648,649,5,108,0,0,649,650,
		5,115,0,0,650,652,5,101,0,0,651,642,1,0,0,0,651,646,1,0,0,0,652,134,1,
		0,0,0,653,654,5,73,0,0,654,655,5,110,0,0,655,676,5,116,0,0,656,657,5,70,
		0,0,657,658,5,108,0,0,658,659,5,111,0,0,659,660,5,97,0,0,660,676,5,116,
		0,0,661,662,5,67,0,0,662,663,5,104,0,0,663,664,5,97,0,0,664,676,5,114,
		0,0,665,666,5,83,0,0,666,667,5,116,0,0,667,668,5,114,0,0,668,669,5,105,
		0,0,669,670,5,110,0,0,670,676,5,103,0,0,671,672,5,66,0,0,672,673,5,111,
		0,0,673,674,5,111,0,0,674,676,5,108,0,0,675,653,1,0,0,0,675,656,1,0,0,
		0,675,661,1,0,0,0,675,665,1,0,0,0,675,671,1,0,0,0,676,136,1,0,0,0,677,
		678,5,65,0,0,678,679,5,114,0,0,679,680,5,114,0,0,680,681,5,97,0,0,681,
		682,5,121,0,0,682,138,1,0,0,0,683,684,5,76,0,0,684,685,5,105,0,0,685,686,
		5,115,0,0,686,687,5,116,0,0,687,140,1,0,0,0,688,689,5,68,0,0,689,690,5,
		105,0,0,690,691,5,99,0,0,691,692,5,116,0,0,692,693,5,105,0,0,693,694,5,
		111,0,0,694,695,5,110,0,0,695,696,5,97,0,0,696,697,5,114,0,0,697,698,5,
		121,0,0,698,142,1,0,0,0,699,700,5,73,0,0,700,701,5,116,0,0,701,702,5,101,
		0,0,702,703,5,114,0,0,703,144,1,0,0,0,704,705,5,61,0,0,705,146,1,0,0,0,
		706,707,5,61,0,0,707,708,5,62,0,0,708,148,1,0,0,0,709,710,5,123,0,0,710,
		150,1,0,0,0,711,712,5,125,0,0,712,152,1,0,0,0,713,714,5,91,0,0,714,154,
		1,0,0,0,715,716,5,93,0,0,716,156,1,0,0,0,717,718,5,40,0,0,718,158,1,0,
		0,0,719,720,5,41,0,0,720,160,1,0,0,0,721,722,5,46,0,0,722,723,5,46,0,0,
		723,162,1,0,0,0,724,725,5,46,0,0,725,164,1,0,0,0,726,727,5,44,0,0,727,
		166,1,0,0,0,728,729,5,58,0,0,729,168,1,0,0,0,730,731,5,43,0,0,731,170,
		1,0,0,0,732,733,5,45,0,0,733,172,1,0,0,0,734,735,5,42,0,0,735,174,1,0,
		0,0,736,737,5,47,0,0,737,176,1,0,0,0,738,739,5,94,0,0,739,178,1,0,0,0,
		740,741,5,60,0,0,741,180,1,0,0,0,742,743,5,62,0,0,743,182,1,0,0,0,744,
		745,5,60,0,0,745,746,5,61,0,0,746,184,1,0,0,0,747,748,5,62,0,0,748,749,
		5,61,0,0,749,186,1,0,0,0,750,754,3,83,41,0,751,753,3,217,108,0,752,751,
		1,0,0,0,753,756,1,0,0,0,754,752,1,0,0,0,754,755,1,0,0,0,755,757,1,0,0,
		0,756,754,1,0,0,0,757,758,3,79,39,0,758,188,1,0,0,0,759,760,3,225,112,
		0,760,190,1,0,0,0,761,762,3,223,111,0,762,192,1,0,0,0,763,767,7,1,0,0,
		764,766,7,1,0,0,765,764,1,0,0,0,766,769,1,0,0,0,767,765,1,0,0,0,767,768,
		1,0,0,0,768,194,1,0,0,0,769,767,1,0,0,0,770,771,3,193,96,0,771,772,3,163,
		81,0,772,774,3,193,96,0,773,775,3,207,103,0,774,773,1,0,0,0,774,775,1,
		0,0,0,775,196,1,0,0,0,776,779,5,39,0,0,777,780,8,2,0,0,778,780,3,209,104,
		0,779,777,1,0,0,0,779,778,1,0,0,0,780,781,1,0,0,0,781,785,5,39,0,0,782,
		783,5,39,0,0,783,785,5,39,0,0,784,776,1,0,0,0,784,782,1,0,0,0,785,198,
		1,0,0,0,786,791,5,34,0,0,787,790,8,3,0,0,788,790,3,209,104,0,789,787,1,
		0,0,0,789,788,1,0,0,0,790,793,1,0,0,0,791,789,1,0,0,0,791,792,1,0,0,0,
		792,794,1,0,0,0,793,791,1,0,0,0,794,795,5,34,0,0,795,200,1,0,0,0,796,798,
		3,217,108,0,797,796,1,0,0,0,798,799,1,0,0,0,799,797,1,0,0,0,799,800,1,
		0,0,0,800,801,1,0,0,0,801,802,6,100,0,0,802,202,1,0,0,0,803,804,8,4,0,
		0,804,204,1,0,0,0,805,806,7,4,0,0,806,206,1,0,0,0,807,810,7,5,0,0,808,
		811,3,169,84,0,809,811,3,171,85,0,810,808,1,0,0,0,810,809,1,0,0,0,810,
		811,1,0,0,0,811,812,1,0,0,0,812,813,3,193,96,0,813,208,1,0,0,0,814,818,
		3,211,105,0,815,818,3,213,106,0,816,818,3,237,118,0,817,814,1,0,0,0,817,
		815,1,0,0,0,817,816,1,0,0,0,818,210,1,0,0,0,819,820,5,92,0,0,820,842,5,
		39,0,0,821,822,5,92,0,0,822,842,5,34,0,0,823,824,5,92,0,0,824,842,5,92,
		0,0,825,826,5,92,0,0,826,842,5,48,0,0,827,828,5,92,0,0,828,842,5,97,0,
		0,829,830,5,92,0,0,830,842,5,98,0,0,831,832,5,92,0,0,832,842,5,102,0,0,
		833,834,5,92,0,0,834,842,5,110,0,0,835,836,5,92,0,0,836,842,5,114,0,0,
		837,838,5,92,0,0,838,842,5,116,0,0,839,840,5,92,0,0,840,842,5,118,0,0,
		841,819,1,0,0,0,841,821,1,0,0,0,841,823,1,0,0,0,841,825,1,0,0,0,841,827,
		1,0,0,0,841,829,1,0,0,0,841,831,1,0,0,0,841,833,1,0,0,0,841,835,1,0,0,
		0,841,837,1,0,0,0,841,839,1,0,0,0,842,212,1,0,0,0,843,844,5,92,0,0,844,
		845,5,120,0,0,845,846,1,0,0,0,846,869,3,239,119,0,847,848,5,92,0,0,848,
		849,5,120,0,0,849,850,1,0,0,0,850,851,3,239,119,0,851,852,3,239,119,0,
		852,869,1,0,0,0,853,854,5,92,0,0,854,855,5,120,0,0,855,856,1,0,0,0,856,
		857,3,239,119,0,857,858,3,239,119,0,858,859,3,239,119,0,859,869,1,0,0,
		0,860,861,5,92,0,0,861,862,5,120,0,0,862,863,1,0,0,0,863,864,3,239,119,
		0,864,865,3,239,119,0,865,866,3,239,119,0,866,867,3,239,119,0,867,869,
		1,0,0,0,868,843,1,0,0,0,868,847,1,0,0,0,868,853,1,0,0,0,868,860,1,0,0,
		0,869,214,1,0,0,0,870,871,5,13,0,0,871,874,5,10,0,0,872,874,7,4,0,0,873,
		870,1,0,0,0,873,872,1,0,0,0,874,216,1,0,0,0,875,878,3,219,109,0,876,878,
		7,6,0,0,877,875,1,0,0,0,877,876,1,0,0,0,878,218,1,0,0,0,879,880,7,7,0,
		0,880,220,1,0,0,0,881,884,3,243,121,0,882,884,3,241,120,0,883,881,1,0,
		0,0,883,882,1,0,0,0,884,888,1,0,0,0,885,887,3,227,113,0,886,885,1,0,0,
		0,887,890,1,0,0,0,888,886,1,0,0,0,888,889,1,0,0,0,889,222,1,0,0,0,890,
		888,1,0,0,0,891,895,3,243,121,0,892,894,3,227,113,0,893,892,1,0,0,0,894,
		897,1,0,0,0,895,893,1,0,0,0,895,896,1,0,0,0,896,224,1,0,0,0,897,895,1,
		0,0,0,898,902,3,241,120,0,899,901,3,227,113,0,900,899,1,0,0,0,901,904,
		1,0,0,0,902,900,1,0,0,0,902,903,1,0,0,0,903,226,1,0,0,0,904,902,1,0,0,
		0,905,910,3,241,120,0,906,910,3,243,121,0,907,910,3,231,115,0,908,910,
		5,95,0,0,909,905,1,0,0,0,909,906,1,0,0,0,909,907,1,0,0,0,909,908,1,0,0,
		0,910,228,1,0,0,0,911,915,3,241,120,0,912,915,3,243,121,0,913,915,3,237,
		118,0,914,911,1,0,0,0,914,912,1,0,0,0,914,913,1,0,0,0,915,230,1,0,0,0,
		916,919,3,245,122,0,917,919,3,237,118,0,918,916,1,0,0,0,918,917,1,0,0,
		0,919,232,1,0,0,0,920,921,3,237,118,0,921,234,1,0,0,0,922,923,3,237,118,
		0,923,236,1,0,0,0,924,925,5,92,0,0,925,926,5,117,0,0,926,927,1,0,0,0,927,
		928,3,239,119,0,928,929,3,239,119,0,929,930,3,239,119,0,930,931,3,239,
		119,0,931,945,1,0,0,0,932,933,5,92,0,0,933,934,5,85,0,0,934,935,1,0,0,
		0,935,936,3,239,119,0,936,937,3,239,119,0,937,938,3,239,119,0,938,939,
		3,239,119,0,939,940,3,239,119,0,940,941,3,239,119,0,941,942,3,239,119,
		0,942,943,3,239,119,0,943,945,1,0,0,0,944,924,1,0,0,0,944,932,1,0,0,0,
		945,238,1,0,0,0,946,948,7,8,0,0,947,946,1,0,0,0,948,240,1,0,0,0,949,950,
		2,65,90,0,950,242,1,0,0,0,951,952,2,97,122,0,952,244,1,0,0,0,953,954,2,
		48,57,0,954,246,1,0,0,0,955,957,5,13,0,0,956,955,1,0,0,0,956,957,1,0,0,
		0,957,958,1,0,0,0,958,961,5,10,0,0,959,961,5,13,0,0,960,956,1,0,0,0,960,
		959,1,0,0,0,961,248,1,0,0,0,962,964,7,9,0,0,963,962,1,0,0,0,964,965,1,
		0,0,0,965,963,1,0,0,0,965,966,1,0,0,0,966,967,1,0,0,0,967,968,6,124,0,
		0,968,250,1,0,0,0,33,0,254,257,262,269,651,675,754,767,774,779,784,789,
		791,799,810,817,841,868,873,877,883,888,895,902,909,914,918,944,947,956,
		960,965,1,6,0,0
	};

	public static readonly ATN _ATN =
		new ATNDeserializer().Deserialize(_serializedATN);


}
