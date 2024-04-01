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
		BE=7, ASSERT=8, CALL=9, CASE=10, CATCH=11, CLASS=12, CONSTANT=13, CONSTRUCTOR=14, 
		CURRY=15, DEFAULT=16, DIV=17, EACH=18, ELSE=19, EXTERNAL=20, END=21, ENUM=22, 
		FOR=23, FROM=24, FUNCTION=25, GLOBAL=26, IF=27, IMMUTABLE=28, IMPORT=29, 
		IN=30, INTO=31, INHERITS=32, INPUT=33, LAMBDA=34, LET=35, LIBRARY=36, 
		MAIN=37, MOD=38, NEW=39, NOT=40, OF=41, IS=42, OR=43, PACKAGE=44, PARTIAL=45, 
		PRINT=46, PRIVATE=47, PROCEDURE=48, PROPERTY=49, REPEAT=50, RETURN=51, 
		SET=52, STEP=53, SWITCH=54, SYSTEM=55, TEST=56, THEN=57, THIS=58, THROW=59, 
		TO=60, TRY=61, VAR=62, WHEN=63, WHILE=64, WITH=65, XOR=66, BOOL_VALUE=67, 
		VALUE_TYPE=68, ARRAY=69, LIST=70, DICTIONARY=71, ITERABLE=72, EQUALS=73, 
		ARROW=74, OPEN_BRACE=75, CLOSE_BRACE=76, OPEN_SQ_BRACKET=77, CLOSE_SQ_BRACKET=78, 
		OPEN_BRACKET=79, CLOSE_BRACKET=80, DOUBLE_DOT=81, DOT=82, COMMA=83, COLON=84, 
		PLUS=85, MINUS=86, MULT=87, DIVIDE=88, POWER=89, LT=90, GT=91, LE=92, 
		GE=93, IS_NOT=94, TYPENAME=95, IDENTIFIER=96, LITERAL_INTEGER=97, LITERAL_FLOAT=98, 
		LITERAL_CHAR=99, LITERAL_STRING=100, WHITESPACES=101, TEXT=102, NEWLINE=103, 
		WS=104;
	public static string[] channelNames = {
		"DEFAULT_TOKEN_CHANNEL", "HIDDEN"
	};

	public static string[] modeNames = {
		"DEFAULT_MODE"
	};

	public static readonly string[] ruleNames = {
		"NL", "SINGLE_LINE_COMMENT", "COMMENT_MARKER", "ABSTRACT", "AND", "AS", 
		"BE", "ASSERT", "CALL", "CASE", "CATCH", "CLASS", "CONSTANT", "CONSTRUCTOR", 
		"CURRY", "DEFAULT", "DIV", "EACH", "ELSE", "EXTERNAL", "END", "ENUM", 
		"FOR", "FROM", "FUNCTION", "GLOBAL", "IF", "IMMUTABLE", "IMPORT", "IN", 
		"INTO", "INHERITS", "INPUT", "LAMBDA", "LET", "LIBRARY", "MAIN", "MOD", 
		"NEW", "NOT", "OF", "IS", "OR", "PACKAGE", "PARTIAL", "PRINT", "PRIVATE", 
		"PROCEDURE", "PROPERTY", "REPEAT", "RETURN", "SET", "STEP", "SWITCH", 
		"SYSTEM", "TEST", "THEN", "THIS", "THROW", "TO", "TRY", "VAR", "WHEN", 
		"WHILE", "WITH", "XOR", "BOOL_VALUE", "VALUE_TYPE", "ARRAY", "LIST", "DICTIONARY", 
		"ITERABLE", "EQUALS", "ARROW", "OPEN_BRACE", "CLOSE_BRACE", "OPEN_SQ_BRACKET", 
		"CLOSE_SQ_BRACKET", "OPEN_BRACKET", "CLOSE_BRACKET", "DOUBLE_DOT", "DOT", 
		"COMMA", "COLON", "PLUS", "MINUS", "MULT", "DIVIDE", "POWER", "LT", "GT", 
		"LE", "GE", "IS_NOT", "TYPENAME", "IDENTIFIER", "LITERAL_INTEGER", "LITERAL_FLOAT", 
		"LITERAL_CHAR", "LITERAL_STRING", "WHITESPACES", "TEXT", "InputCharacter", 
		"NewLineCharacter", "ExponentPart", "CommonCharacter", "SimpleEscapeSequence", 
		"HexEscapeSequence", "NewLine", "Whitespace", "UnicodeClassZS", "IdentifierStartingUCorLC", 
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
		"AS", "BE", "ASSERT", "CALL", "CASE", "CATCH", "CLASS", "CONSTANT", "CONSTRUCTOR", 
		"CURRY", "DEFAULT", "DIV", "EACH", "ELSE", "EXTERNAL", "END", "ENUM", 
		"FOR", "FROM", "FUNCTION", "GLOBAL", "IF", "IMMUTABLE", "IMPORT", "IN", 
		"INTO", "INHERITS", "INPUT", "LAMBDA", "LET", "LIBRARY", "MAIN", "MOD", 
		"NEW", "NOT", "OF", "IS", "OR", "PACKAGE", "PARTIAL", "PRINT", "PRIVATE", 
		"PROCEDURE", "PROPERTY", "REPEAT", "RETURN", "SET", "STEP", "SWITCH", 
		"SYSTEM", "TEST", "THEN", "THIS", "THROW", "TO", "TRY", "VAR", "WHEN", 
		"WHILE", "WITH", "XOR", "BOOL_VALUE", "VALUE_TYPE", "ARRAY", "LIST", "DICTIONARY", 
		"ITERABLE", "EQUALS", "ARROW", "OPEN_BRACE", "CLOSE_BRACE", "OPEN_SQ_BRACKET", 
		"CLOSE_SQ_BRACKET", "OPEN_BRACKET", "CLOSE_BRACKET", "DOUBLE_DOT", "DOT", 
		"COMMA", "COLON", "PLUS", "MINUS", "MULT", "DIVIDE", "POWER", "LT", "GT", 
		"LE", "GE", "IS_NOT", "TYPENAME", "IDENTIFIER", "LITERAL_INTEGER", "LITERAL_FLOAT", 
		"LITERAL_CHAR", "LITERAL_STRING", "WHITESPACES", "TEXT", "NEWLINE", "WS"
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
		4,0,104,976,6,-1,2,0,7,0,2,1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,7,
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
		7,122,2,123,7,123,2,124,7,124,2,125,7,125,1,0,4,0,255,8,0,11,0,12,0,256,
		1,1,3,1,260,8,1,1,1,5,1,263,8,1,10,1,12,1,266,9,1,1,1,1,1,5,1,270,8,1,
		10,1,12,1,273,9,1,1,1,1,1,1,2,1,2,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,
		1,4,1,4,1,4,1,4,1,5,1,5,1,5,1,6,1,6,1,6,1,7,1,7,1,7,1,7,1,7,1,7,1,7,1,
		8,1,8,1,8,1,8,1,8,1,9,1,9,1,9,1,9,1,9,1,10,1,10,1,10,1,10,1,10,1,10,1,
		11,1,11,1,11,1,11,1,11,1,11,1,12,1,12,1,12,1,12,1,12,1,12,1,12,1,12,1,
		12,1,13,1,13,1,13,1,13,1,13,1,13,1,13,1,13,1,13,1,13,1,13,1,13,1,14,1,
		14,1,14,1,14,1,14,1,14,1,15,1,15,1,15,1,15,1,15,1,15,1,15,1,15,1,16,1,
		16,1,16,1,16,1,17,1,17,1,17,1,17,1,17,1,18,1,18,1,18,1,18,1,18,1,19,1,
		19,1,19,1,19,1,19,1,19,1,19,1,19,1,19,1,20,1,20,1,20,1,20,1,21,1,21,1,
		21,1,21,1,21,1,22,1,22,1,22,1,22,1,23,1,23,1,23,1,23,1,23,1,24,1,24,1,
		24,1,24,1,24,1,24,1,24,1,24,1,24,1,25,1,25,1,25,1,25,1,25,1,25,1,25,1,
		26,1,26,1,26,1,27,1,27,1,27,1,27,1,27,1,27,1,27,1,27,1,27,1,27,1,28,1,
		28,1,28,1,28,1,28,1,28,1,28,1,29,1,29,1,29,1,30,1,30,1,30,1,30,1,30,1,
		31,1,31,1,31,1,31,1,31,1,31,1,31,1,31,1,31,1,32,1,32,1,32,1,32,1,32,1,
		32,1,33,1,33,1,33,1,33,1,33,1,33,1,33,1,34,1,34,1,34,1,34,1,35,1,35,1,
		35,1,35,1,35,1,35,1,35,1,35,1,36,1,36,1,36,1,36,1,36,1,37,1,37,1,37,1,
		37,1,38,1,38,1,38,1,38,1,39,1,39,1,39,1,39,1,40,1,40,1,40,1,41,1,41,1,
		41,1,42,1,42,1,42,1,43,1,43,1,43,1,43,1,43,1,43,1,43,1,43,1,44,1,44,1,
		44,1,44,1,44,1,44,1,44,1,44,1,45,1,45,1,45,1,45,1,45,1,45,1,46,1,46,1,
		46,1,46,1,46,1,46,1,46,1,46,1,47,1,47,1,47,1,47,1,47,1,47,1,47,1,47,1,
		47,1,47,1,48,1,48,1,48,1,48,1,48,1,48,1,48,1,48,1,48,1,49,1,49,1,49,1,
		49,1,49,1,49,1,49,1,50,1,50,1,50,1,50,1,50,1,50,1,50,1,51,1,51,1,51,1,
		51,1,52,1,52,1,52,1,52,1,52,1,53,1,53,1,53,1,53,1,53,1,53,1,53,1,54,1,
		54,1,54,1,54,1,54,1,54,1,54,1,55,1,55,1,55,1,55,1,55,1,56,1,56,1,56,1,
		56,1,56,1,57,1,57,1,57,1,57,1,57,1,58,1,58,1,58,1,58,1,58,1,58,1,59,1,
		59,1,59,1,60,1,60,1,60,1,60,1,61,1,61,1,61,1,61,1,62,1,62,1,62,1,62,1,
		62,1,63,1,63,1,63,1,63,1,63,1,63,1,64,1,64,1,64,1,64,1,64,1,65,1,65,1,
		65,1,65,1,66,1,66,1,66,1,66,1,66,1,66,1,66,1,66,1,66,3,66,654,8,66,1,67,
		1,67,1,67,1,67,1,67,1,67,1,67,1,67,1,67,1,67,1,67,1,67,1,67,1,67,1,67,
		1,67,1,67,1,67,1,67,1,67,1,67,1,67,3,67,678,8,67,1,68,1,68,1,68,1,68,1,
		68,1,68,1,69,1,69,1,69,1,69,1,69,1,70,1,70,1,70,1,70,1,70,1,70,1,70,1,
		70,1,70,1,70,1,70,1,71,1,71,1,71,1,71,1,71,1,72,1,72,1,73,1,73,1,73,1,
		74,1,74,1,75,1,75,1,76,1,76,1,77,1,77,1,78,1,78,1,79,1,79,1,80,1,80,1,
		80,1,81,1,81,1,82,1,82,1,83,1,83,1,84,1,84,1,85,1,85,1,86,1,86,1,87,1,
		87,1,88,1,88,1,89,1,89,1,90,1,90,1,91,1,91,1,91,1,92,1,92,1,92,1,93,1,
		93,5,93,755,8,93,10,93,12,93,758,9,93,1,93,1,93,1,94,1,94,1,95,1,95,1,
		96,1,96,5,96,768,8,96,10,96,12,96,771,9,96,1,97,1,97,1,97,1,97,3,97,777,
		8,97,1,98,1,98,1,98,3,98,782,8,98,1,98,1,98,1,98,3,98,787,8,98,1,99,1,
		99,1,99,5,99,792,8,99,10,99,12,99,795,9,99,1,99,1,99,1,100,4,100,800,8,
		100,11,100,12,100,801,1,100,1,100,1,101,4,101,807,8,101,11,101,12,101,
		808,1,102,1,102,1,103,1,103,1,104,1,104,1,104,3,104,818,8,104,1,104,1,
		104,1,105,1,105,1,105,3,105,825,8,105,1,106,1,106,1,106,1,106,1,106,1,
		106,1,106,1,106,1,106,1,106,1,106,1,106,1,106,1,106,1,106,1,106,1,106,
		1,106,1,106,1,106,1,106,1,106,3,106,849,8,106,1,107,1,107,1,107,1,107,
		1,107,1,107,1,107,1,107,1,107,1,107,1,107,1,107,1,107,1,107,1,107,1,107,
		1,107,1,107,1,107,1,107,1,107,1,107,1,107,1,107,1,107,3,107,876,8,107,
		1,108,1,108,1,108,3,108,881,8,108,1,109,1,109,3,109,885,8,109,1,110,1,
		110,1,111,1,111,3,111,891,8,111,1,111,5,111,894,8,111,10,111,12,111,897,
		9,111,1,112,1,112,5,112,901,8,112,10,112,12,112,904,9,112,1,113,1,113,
		5,113,908,8,113,10,113,12,113,911,9,113,1,114,1,114,1,114,1,114,3,114,
		917,8,114,1,115,1,115,1,115,3,115,922,8,115,1,116,1,116,3,116,926,8,116,
		1,117,1,117,1,118,1,118,1,119,1,119,1,119,1,119,1,119,1,119,1,119,1,119,
		1,119,1,119,1,119,1,119,1,119,1,119,1,119,1,119,1,119,1,119,1,119,1,119,
		3,119,952,8,119,1,120,3,120,955,8,120,1,121,1,121,1,122,1,122,1,123,1,
		123,1,124,3,124,964,8,124,1,124,1,124,3,124,968,8,124,1,125,4,125,971,
		8,125,11,125,12,125,972,1,125,1,125,0,0,126,1,1,3,2,5,3,7,4,9,5,11,6,13,
		7,15,8,17,9,19,10,21,11,23,12,25,13,27,14,29,15,31,16,33,17,35,18,37,19,
		39,20,41,21,43,22,45,23,47,24,49,25,51,26,53,27,55,28,57,29,59,30,61,31,
		63,32,65,33,67,34,69,35,71,36,73,37,75,38,77,39,79,40,81,41,83,42,85,43,
		87,44,89,45,91,46,93,47,95,48,97,49,99,50,101,51,103,52,105,53,107,54,
		109,55,111,56,113,57,115,58,117,59,119,60,121,61,123,62,125,63,127,64,
		129,65,131,66,133,67,135,68,137,69,139,70,141,71,143,72,145,73,147,74,
		149,75,151,76,153,77,155,78,157,79,159,80,161,81,163,82,165,83,167,84,
		169,85,171,86,173,87,175,88,177,89,179,90,181,91,183,92,185,93,187,94,
		189,95,191,96,193,97,195,98,197,99,199,100,201,101,203,102,205,0,207,0,
		209,0,211,0,213,0,215,0,217,0,219,0,221,0,223,0,225,0,227,0,229,0,231,
		0,233,0,235,0,237,0,239,0,241,0,243,0,245,0,247,0,249,103,251,104,1,0,
		10,2,0,10,10,12,13,1,0,48,57,5,0,10,10,13,13,39,39,92,92,133,133,2,0,34,
		34,133,133,3,0,10,10,13,13,133,133,1,0,101,101,2,0,9,9,11,12,2,0,32,32,
		160,160,3,0,48,57,65,70,97,102,2,0,9,9,32,32,1004,0,1,1,0,0,0,0,3,1,0,
		0,0,0,5,1,0,0,0,0,7,1,0,0,0,0,9,1,0,0,0,0,11,1,0,0,0,0,13,1,0,0,0,0,15,
		1,0,0,0,0,17,1,0,0,0,0,19,1,0,0,0,0,21,1,0,0,0,0,23,1,0,0,0,0,25,1,0,0,
		0,0,27,1,0,0,0,0,29,1,0,0,0,0,31,1,0,0,0,0,33,1,0,0,0,0,35,1,0,0,0,0,37,
		1,0,0,0,0,39,1,0,0,0,0,41,1,0,0,0,0,43,1,0,0,0,0,45,1,0,0,0,0,47,1,0,0,
		0,0,49,1,0,0,0,0,51,1,0,0,0,0,53,1,0,0,0,0,55,1,0,0,0,0,57,1,0,0,0,0,59,
		1,0,0,0,0,61,1,0,0,0,0,63,1,0,0,0,0,65,1,0,0,0,0,67,1,0,0,0,0,69,1,0,0,
		0,0,71,1,0,0,0,0,73,1,0,0,0,0,75,1,0,0,0,0,77,1,0,0,0,0,79,1,0,0,0,0,81,
		1,0,0,0,0,83,1,0,0,0,0,85,1,0,0,0,0,87,1,0,0,0,0,89,1,0,0,0,0,91,1,0,0,
		0,0,93,1,0,0,0,0,95,1,0,0,0,0,97,1,0,0,0,0,99,1,0,0,0,0,101,1,0,0,0,0,
		103,1,0,0,0,0,105,1,0,0,0,0,107,1,0,0,0,0,109,1,0,0,0,0,111,1,0,0,0,0,
		113,1,0,0,0,0,115,1,0,0,0,0,117,1,0,0,0,0,119,1,0,0,0,0,121,1,0,0,0,0,
		123,1,0,0,0,0,125,1,0,0,0,0,127,1,0,0,0,0,129,1,0,0,0,0,131,1,0,0,0,0,
		133,1,0,0,0,0,135,1,0,0,0,0,137,1,0,0,0,0,139,1,0,0,0,0,141,1,0,0,0,0,
		143,1,0,0,0,0,145,1,0,0,0,0,147,1,0,0,0,0,149,1,0,0,0,0,151,1,0,0,0,0,
		153,1,0,0,0,0,155,1,0,0,0,0,157,1,0,0,0,0,159,1,0,0,0,0,161,1,0,0,0,0,
		163,1,0,0,0,0,165,1,0,0,0,0,167,1,0,0,0,0,169,1,0,0,0,0,171,1,0,0,0,0,
		173,1,0,0,0,0,175,1,0,0,0,0,177,1,0,0,0,0,179,1,0,0,0,0,181,1,0,0,0,0,
		183,1,0,0,0,0,185,1,0,0,0,0,187,1,0,0,0,0,189,1,0,0,0,0,191,1,0,0,0,0,
		193,1,0,0,0,0,195,1,0,0,0,0,197,1,0,0,0,0,199,1,0,0,0,0,201,1,0,0,0,0,
		203,1,0,0,0,0,249,1,0,0,0,0,251,1,0,0,0,1,254,1,0,0,0,3,259,1,0,0,0,5,
		276,1,0,0,0,7,278,1,0,0,0,9,287,1,0,0,0,11,291,1,0,0,0,13,294,1,0,0,0,
		15,297,1,0,0,0,17,304,1,0,0,0,19,309,1,0,0,0,21,314,1,0,0,0,23,320,1,0,
		0,0,25,326,1,0,0,0,27,335,1,0,0,0,29,347,1,0,0,0,31,353,1,0,0,0,33,361,
		1,0,0,0,35,365,1,0,0,0,37,370,1,0,0,0,39,375,1,0,0,0,41,384,1,0,0,0,43,
		388,1,0,0,0,45,393,1,0,0,0,47,397,1,0,0,0,49,402,1,0,0,0,51,411,1,0,0,
		0,53,418,1,0,0,0,55,421,1,0,0,0,57,431,1,0,0,0,59,438,1,0,0,0,61,441,1,
		0,0,0,63,446,1,0,0,0,65,455,1,0,0,0,67,461,1,0,0,0,69,468,1,0,0,0,71,472,
		1,0,0,0,73,480,1,0,0,0,75,485,1,0,0,0,77,489,1,0,0,0,79,493,1,0,0,0,81,
		497,1,0,0,0,83,500,1,0,0,0,85,503,1,0,0,0,87,506,1,0,0,0,89,514,1,0,0,
		0,91,522,1,0,0,0,93,528,1,0,0,0,95,536,1,0,0,0,97,546,1,0,0,0,99,555,1,
		0,0,0,101,562,1,0,0,0,103,569,1,0,0,0,105,573,1,0,0,0,107,578,1,0,0,0,
		109,585,1,0,0,0,111,592,1,0,0,0,113,597,1,0,0,0,115,602,1,0,0,0,117,607,
		1,0,0,0,119,613,1,0,0,0,121,616,1,0,0,0,123,620,1,0,0,0,125,624,1,0,0,
		0,127,629,1,0,0,0,129,635,1,0,0,0,131,640,1,0,0,0,133,653,1,0,0,0,135,
		677,1,0,0,0,137,679,1,0,0,0,139,685,1,0,0,0,141,690,1,0,0,0,143,701,1,
		0,0,0,145,706,1,0,0,0,147,708,1,0,0,0,149,711,1,0,0,0,151,713,1,0,0,0,
		153,715,1,0,0,0,155,717,1,0,0,0,157,719,1,0,0,0,159,721,1,0,0,0,161,723,
		1,0,0,0,163,726,1,0,0,0,165,728,1,0,0,0,167,730,1,0,0,0,169,732,1,0,0,
		0,171,734,1,0,0,0,173,736,1,0,0,0,175,738,1,0,0,0,177,740,1,0,0,0,179,
		742,1,0,0,0,181,744,1,0,0,0,183,746,1,0,0,0,185,749,1,0,0,0,187,752,1,
		0,0,0,189,761,1,0,0,0,191,763,1,0,0,0,193,765,1,0,0,0,195,772,1,0,0,0,
		197,786,1,0,0,0,199,788,1,0,0,0,201,799,1,0,0,0,203,806,1,0,0,0,205,810,
		1,0,0,0,207,812,1,0,0,0,209,814,1,0,0,0,211,824,1,0,0,0,213,848,1,0,0,
		0,215,875,1,0,0,0,217,880,1,0,0,0,219,884,1,0,0,0,221,886,1,0,0,0,223,
		890,1,0,0,0,225,898,1,0,0,0,227,905,1,0,0,0,229,916,1,0,0,0,231,921,1,
		0,0,0,233,925,1,0,0,0,235,927,1,0,0,0,237,929,1,0,0,0,239,951,1,0,0,0,
		241,954,1,0,0,0,243,956,1,0,0,0,245,958,1,0,0,0,247,960,1,0,0,0,249,967,
		1,0,0,0,251,970,1,0,0,0,253,255,7,0,0,0,254,253,1,0,0,0,255,256,1,0,0,
		0,256,254,1,0,0,0,256,257,1,0,0,0,257,2,1,0,0,0,258,260,3,1,0,0,259,258,
		1,0,0,0,259,260,1,0,0,0,260,264,1,0,0,0,261,263,3,219,109,0,262,261,1,
		0,0,0,263,266,1,0,0,0,264,262,1,0,0,0,264,265,1,0,0,0,265,267,1,0,0,0,
		266,264,1,0,0,0,267,271,3,5,2,0,268,270,3,205,102,0,269,268,1,0,0,0,270,
		273,1,0,0,0,271,269,1,0,0,0,271,272,1,0,0,0,272,274,1,0,0,0,273,271,1,
		0,0,0,274,275,6,1,0,0,275,4,1,0,0,0,276,277,5,35,0,0,277,6,1,0,0,0,278,
		279,5,97,0,0,279,280,5,98,0,0,280,281,5,115,0,0,281,282,5,116,0,0,282,
		283,5,114,0,0,283,284,5,97,0,0,284,285,5,99,0,0,285,286,5,116,0,0,286,
		8,1,0,0,0,287,288,5,97,0,0,288,289,5,110,0,0,289,290,5,100,0,0,290,10,
		1,0,0,0,291,292,5,97,0,0,292,293,5,115,0,0,293,12,1,0,0,0,294,295,5,98,
		0,0,295,296,5,101,0,0,296,14,1,0,0,0,297,298,5,97,0,0,298,299,5,115,0,
		0,299,300,5,115,0,0,300,301,5,101,0,0,301,302,5,114,0,0,302,303,5,116,
		0,0,303,16,1,0,0,0,304,305,5,99,0,0,305,306,5,97,0,0,306,307,5,108,0,0,
		307,308,5,108,0,0,308,18,1,0,0,0,309,310,5,99,0,0,310,311,5,97,0,0,311,
		312,5,115,0,0,312,313,5,101,0,0,313,20,1,0,0,0,314,315,5,99,0,0,315,316,
		5,97,0,0,316,317,5,116,0,0,317,318,5,99,0,0,318,319,5,104,0,0,319,22,1,
		0,0,0,320,321,5,99,0,0,321,322,5,108,0,0,322,323,5,97,0,0,323,324,5,115,
		0,0,324,325,5,115,0,0,325,24,1,0,0,0,326,327,5,99,0,0,327,328,5,111,0,
		0,328,329,5,110,0,0,329,330,5,115,0,0,330,331,5,116,0,0,331,332,5,97,0,
		0,332,333,5,110,0,0,333,334,5,116,0,0,334,26,1,0,0,0,335,336,5,99,0,0,
		336,337,5,111,0,0,337,338,5,110,0,0,338,339,5,115,0,0,339,340,5,116,0,
		0,340,341,5,114,0,0,341,342,5,117,0,0,342,343,5,99,0,0,343,344,5,116,0,
		0,344,345,5,111,0,0,345,346,5,114,0,0,346,28,1,0,0,0,347,348,5,99,0,0,
		348,349,5,117,0,0,349,350,5,114,0,0,350,351,5,114,0,0,351,352,5,121,0,
		0,352,30,1,0,0,0,353,354,5,100,0,0,354,355,5,101,0,0,355,356,5,102,0,0,
		356,357,5,97,0,0,357,358,5,117,0,0,358,359,5,108,0,0,359,360,5,116,0,0,
		360,32,1,0,0,0,361,362,5,100,0,0,362,363,5,105,0,0,363,364,5,118,0,0,364,
		34,1,0,0,0,365,366,5,101,0,0,366,367,5,97,0,0,367,368,5,99,0,0,368,369,
		5,104,0,0,369,36,1,0,0,0,370,371,5,101,0,0,371,372,5,108,0,0,372,373,5,
		115,0,0,373,374,5,101,0,0,374,38,1,0,0,0,375,376,5,101,0,0,376,377,5,120,
		0,0,377,378,5,116,0,0,378,379,5,101,0,0,379,380,5,114,0,0,380,381,5,110,
		0,0,381,382,5,97,0,0,382,383,5,108,0,0,383,40,1,0,0,0,384,385,5,101,0,
		0,385,386,5,110,0,0,386,387,5,100,0,0,387,42,1,0,0,0,388,389,5,101,0,0,
		389,390,5,110,0,0,390,391,5,117,0,0,391,392,5,109,0,0,392,44,1,0,0,0,393,
		394,5,102,0,0,394,395,5,111,0,0,395,396,5,114,0,0,396,46,1,0,0,0,397,398,
		5,102,0,0,398,399,5,114,0,0,399,400,5,111,0,0,400,401,5,109,0,0,401,48,
		1,0,0,0,402,403,5,102,0,0,403,404,5,117,0,0,404,405,5,110,0,0,405,406,
		5,99,0,0,406,407,5,116,0,0,407,408,5,105,0,0,408,409,5,111,0,0,409,410,
		5,110,0,0,410,50,1,0,0,0,411,412,5,103,0,0,412,413,5,108,0,0,413,414,5,
		111,0,0,414,415,5,98,0,0,415,416,5,97,0,0,416,417,5,108,0,0,417,52,1,0,
		0,0,418,419,5,105,0,0,419,420,5,102,0,0,420,54,1,0,0,0,421,422,5,105,0,
		0,422,423,5,109,0,0,423,424,5,109,0,0,424,425,5,117,0,0,425,426,5,116,
		0,0,426,427,5,97,0,0,427,428,5,98,0,0,428,429,5,108,0,0,429,430,5,101,
		0,0,430,56,1,0,0,0,431,432,5,105,0,0,432,433,5,109,0,0,433,434,5,112,0,
		0,434,435,5,111,0,0,435,436,5,114,0,0,436,437,5,116,0,0,437,58,1,0,0,0,
		438,439,5,105,0,0,439,440,5,110,0,0,440,60,1,0,0,0,441,442,5,105,0,0,442,
		443,5,110,0,0,443,444,5,116,0,0,444,445,5,111,0,0,445,62,1,0,0,0,446,447,
		5,105,0,0,447,448,5,110,0,0,448,449,5,104,0,0,449,450,5,101,0,0,450,451,
		5,114,0,0,451,452,5,105,0,0,452,453,5,116,0,0,453,454,5,115,0,0,454,64,
		1,0,0,0,455,456,5,105,0,0,456,457,5,110,0,0,457,458,5,112,0,0,458,459,
		5,117,0,0,459,460,5,116,0,0,460,66,1,0,0,0,461,462,5,108,0,0,462,463,5,
		97,0,0,463,464,5,109,0,0,464,465,5,98,0,0,465,466,5,100,0,0,466,467,5,
		97,0,0,467,68,1,0,0,0,468,469,5,108,0,0,469,470,5,101,0,0,470,471,5,116,
		0,0,471,70,1,0,0,0,472,473,5,108,0,0,473,474,5,105,0,0,474,475,5,98,0,
		0,475,476,5,114,0,0,476,477,5,97,0,0,477,478,5,114,0,0,478,479,5,121,0,
		0,479,72,1,0,0,0,480,481,5,109,0,0,481,482,5,97,0,0,482,483,5,105,0,0,
		483,484,5,110,0,0,484,74,1,0,0,0,485,486,5,109,0,0,486,487,5,111,0,0,487,
		488,5,100,0,0,488,76,1,0,0,0,489,490,5,110,0,0,490,491,5,101,0,0,491,492,
		5,119,0,0,492,78,1,0,0,0,493,494,5,110,0,0,494,495,5,111,0,0,495,496,5,
		116,0,0,496,80,1,0,0,0,497,498,5,111,0,0,498,499,5,102,0,0,499,82,1,0,
		0,0,500,501,5,105,0,0,501,502,5,115,0,0,502,84,1,0,0,0,503,504,5,111,0,
		0,504,505,5,114,0,0,505,86,1,0,0,0,506,507,5,112,0,0,507,508,5,97,0,0,
		508,509,5,99,0,0,509,510,5,107,0,0,510,511,5,97,0,0,511,512,5,103,0,0,
		512,513,5,101,0,0,513,88,1,0,0,0,514,515,5,112,0,0,515,516,5,97,0,0,516,
		517,5,114,0,0,517,518,5,116,0,0,518,519,5,105,0,0,519,520,5,97,0,0,520,
		521,5,108,0,0,521,90,1,0,0,0,522,523,5,112,0,0,523,524,5,114,0,0,524,525,
		5,105,0,0,525,526,5,110,0,0,526,527,5,116,0,0,527,92,1,0,0,0,528,529,5,
		112,0,0,529,530,5,114,0,0,530,531,5,105,0,0,531,532,5,118,0,0,532,533,
		5,97,0,0,533,534,5,116,0,0,534,535,5,101,0,0,535,94,1,0,0,0,536,537,5,
		112,0,0,537,538,5,114,0,0,538,539,5,111,0,0,539,540,5,99,0,0,540,541,5,
		101,0,0,541,542,5,100,0,0,542,543,5,117,0,0,543,544,5,114,0,0,544,545,
		5,101,0,0,545,96,1,0,0,0,546,547,5,112,0,0,547,548,5,114,0,0,548,549,5,
		111,0,0,549,550,5,112,0,0,550,551,5,101,0,0,551,552,5,114,0,0,552,553,
		5,116,0,0,553,554,5,121,0,0,554,98,1,0,0,0,555,556,5,114,0,0,556,557,5,
		101,0,0,557,558,5,112,0,0,558,559,5,101,0,0,559,560,5,97,0,0,560,561,5,
		116,0,0,561,100,1,0,0,0,562,563,5,114,0,0,563,564,5,101,0,0,564,565,5,
		116,0,0,565,566,5,117,0,0,566,567,5,114,0,0,567,568,5,110,0,0,568,102,
		1,0,0,0,569,570,5,115,0,0,570,571,5,101,0,0,571,572,5,116,0,0,572,104,
		1,0,0,0,573,574,5,115,0,0,574,575,5,116,0,0,575,576,5,101,0,0,576,577,
		5,112,0,0,577,106,1,0,0,0,578,579,5,115,0,0,579,580,5,119,0,0,580,581,
		5,105,0,0,581,582,5,116,0,0,582,583,5,99,0,0,583,584,5,104,0,0,584,108,
		1,0,0,0,585,586,5,115,0,0,586,587,5,121,0,0,587,588,5,115,0,0,588,589,
		5,116,0,0,589,590,5,101,0,0,590,591,5,109,0,0,591,110,1,0,0,0,592,593,
		5,116,0,0,593,594,5,101,0,0,594,595,5,115,0,0,595,596,5,116,0,0,596,112,
		1,0,0,0,597,598,5,116,0,0,598,599,5,104,0,0,599,600,5,101,0,0,600,601,
		5,110,0,0,601,114,1,0,0,0,602,603,5,116,0,0,603,604,5,104,0,0,604,605,
		5,105,0,0,605,606,5,115,0,0,606,116,1,0,0,0,607,608,5,116,0,0,608,609,
		5,104,0,0,609,610,5,114,0,0,610,611,5,111,0,0,611,612,5,119,0,0,612,118,
		1,0,0,0,613,614,5,116,0,0,614,615,5,111,0,0,615,120,1,0,0,0,616,617,5,
		116,0,0,617,618,5,114,0,0,618,619,5,121,0,0,619,122,1,0,0,0,620,621,5,
		118,0,0,621,622,5,97,0,0,622,623,5,114,0,0,623,124,1,0,0,0,624,625,5,119,
		0,0,625,626,5,104,0,0,626,627,5,101,0,0,627,628,5,110,0,0,628,126,1,0,
		0,0,629,630,5,119,0,0,630,631,5,104,0,0,631,632,5,105,0,0,632,633,5,108,
		0,0,633,634,5,101,0,0,634,128,1,0,0,0,635,636,5,119,0,0,636,637,5,105,
		0,0,637,638,5,116,0,0,638,639,5,104,0,0,639,130,1,0,0,0,640,641,5,120,
		0,0,641,642,5,111,0,0,642,643,5,114,0,0,643,132,1,0,0,0,644,645,5,116,
		0,0,645,646,5,114,0,0,646,647,5,117,0,0,647,654,5,101,0,0,648,649,5,102,
		0,0,649,650,5,97,0,0,650,651,5,108,0,0,651,652,5,115,0,0,652,654,5,101,
		0,0,653,644,1,0,0,0,653,648,1,0,0,0,654,134,1,0,0,0,655,656,5,73,0,0,656,
		657,5,110,0,0,657,678,5,116,0,0,658,659,5,70,0,0,659,660,5,108,0,0,660,
		661,5,111,0,0,661,662,5,97,0,0,662,678,5,116,0,0,663,664,5,67,0,0,664,
		665,5,104,0,0,665,666,5,97,0,0,666,678,5,114,0,0,667,668,5,83,0,0,668,
		669,5,116,0,0,669,670,5,114,0,0,670,671,5,105,0,0,671,672,5,110,0,0,672,
		678,5,103,0,0,673,674,5,66,0,0,674,675,5,111,0,0,675,676,5,111,0,0,676,
		678,5,108,0,0,677,655,1,0,0,0,677,658,1,0,0,0,677,663,1,0,0,0,677,667,
		1,0,0,0,677,673,1,0,0,0,678,136,1,0,0,0,679,680,5,65,0,0,680,681,5,114,
		0,0,681,682,5,114,0,0,682,683,5,97,0,0,683,684,5,121,0,0,684,138,1,0,0,
		0,685,686,5,76,0,0,686,687,5,105,0,0,687,688,5,115,0,0,688,689,5,116,0,
		0,689,140,1,0,0,0,690,691,5,68,0,0,691,692,5,105,0,0,692,693,5,99,0,0,
		693,694,5,116,0,0,694,695,5,105,0,0,695,696,5,111,0,0,696,697,5,110,0,
		0,697,698,5,97,0,0,698,699,5,114,0,0,699,700,5,121,0,0,700,142,1,0,0,0,
		701,702,5,73,0,0,702,703,5,116,0,0,703,704,5,101,0,0,704,705,5,114,0,0,
		705,144,1,0,0,0,706,707,5,61,0,0,707,146,1,0,0,0,708,709,5,61,0,0,709,
		710,5,62,0,0,710,148,1,0,0,0,711,712,5,123,0,0,712,150,1,0,0,0,713,714,
		5,125,0,0,714,152,1,0,0,0,715,716,5,91,0,0,716,154,1,0,0,0,717,718,5,93,
		0,0,718,156,1,0,0,0,719,720,5,40,0,0,720,158,1,0,0,0,721,722,5,41,0,0,
		722,160,1,0,0,0,723,724,5,46,0,0,724,725,5,46,0,0,725,162,1,0,0,0,726,
		727,5,46,0,0,727,164,1,0,0,0,728,729,5,44,0,0,729,166,1,0,0,0,730,731,
		5,58,0,0,731,168,1,0,0,0,732,733,5,43,0,0,733,170,1,0,0,0,734,735,5,45,
		0,0,735,172,1,0,0,0,736,737,5,42,0,0,737,174,1,0,0,0,738,739,5,47,0,0,
		739,176,1,0,0,0,740,741,5,94,0,0,741,178,1,0,0,0,742,743,5,60,0,0,743,
		180,1,0,0,0,744,745,5,62,0,0,745,182,1,0,0,0,746,747,5,60,0,0,747,748,
		5,61,0,0,748,184,1,0,0,0,749,750,5,62,0,0,750,751,5,61,0,0,751,186,1,0,
		0,0,752,756,3,83,41,0,753,755,3,219,109,0,754,753,1,0,0,0,755,758,1,0,
		0,0,756,754,1,0,0,0,756,757,1,0,0,0,757,759,1,0,0,0,758,756,1,0,0,0,759,
		760,3,79,39,0,760,188,1,0,0,0,761,762,3,227,113,0,762,190,1,0,0,0,763,
		764,3,225,112,0,764,192,1,0,0,0,765,769,7,1,0,0,766,768,7,1,0,0,767,766,
		1,0,0,0,768,771,1,0,0,0,769,767,1,0,0,0,769,770,1,0,0,0,770,194,1,0,0,
		0,771,769,1,0,0,0,772,773,3,193,96,0,773,774,3,163,81,0,774,776,3,193,
		96,0,775,777,3,209,104,0,776,775,1,0,0,0,776,777,1,0,0,0,777,196,1,0,0,
		0,778,781,5,39,0,0,779,782,8,2,0,0,780,782,3,211,105,0,781,779,1,0,0,0,
		781,780,1,0,0,0,782,783,1,0,0,0,783,787,5,39,0,0,784,785,5,39,0,0,785,
		787,5,39,0,0,786,778,1,0,0,0,786,784,1,0,0,0,787,198,1,0,0,0,788,793,5,
		34,0,0,789,792,8,3,0,0,790,792,3,211,105,0,791,789,1,0,0,0,791,790,1,0,
		0,0,792,795,1,0,0,0,793,791,1,0,0,0,793,794,1,0,0,0,794,796,1,0,0,0,795,
		793,1,0,0,0,796,797,5,34,0,0,797,200,1,0,0,0,798,800,3,219,109,0,799,798,
		1,0,0,0,800,801,1,0,0,0,801,799,1,0,0,0,801,802,1,0,0,0,802,803,1,0,0,
		0,803,804,6,100,0,0,804,202,1,0,0,0,805,807,3,211,105,0,806,805,1,0,0,
		0,807,808,1,0,0,0,808,806,1,0,0,0,808,809,1,0,0,0,809,204,1,0,0,0,810,
		811,8,4,0,0,811,206,1,0,0,0,812,813,7,4,0,0,813,208,1,0,0,0,814,817,7,
		5,0,0,815,818,3,169,84,0,816,818,3,171,85,0,817,815,1,0,0,0,817,816,1,
		0,0,0,817,818,1,0,0,0,818,819,1,0,0,0,819,820,3,193,96,0,820,210,1,0,0,
		0,821,825,3,213,106,0,822,825,3,215,107,0,823,825,3,239,119,0,824,821,
		1,0,0,0,824,822,1,0,0,0,824,823,1,0,0,0,825,212,1,0,0,0,826,827,5,92,0,
		0,827,849,5,39,0,0,828,829,5,92,0,0,829,849,5,34,0,0,830,831,5,92,0,0,
		831,849,5,92,0,0,832,833,5,92,0,0,833,849,5,48,0,0,834,835,5,92,0,0,835,
		849,5,97,0,0,836,837,5,92,0,0,837,849,5,98,0,0,838,839,5,92,0,0,839,849,
		5,102,0,0,840,841,5,92,0,0,841,849,5,110,0,0,842,843,5,92,0,0,843,849,
		5,114,0,0,844,845,5,92,0,0,845,849,5,116,0,0,846,847,5,92,0,0,847,849,
		5,118,0,0,848,826,1,0,0,0,848,828,1,0,0,0,848,830,1,0,0,0,848,832,1,0,
		0,0,848,834,1,0,0,0,848,836,1,0,0,0,848,838,1,0,0,0,848,840,1,0,0,0,848,
		842,1,0,0,0,848,844,1,0,0,0,848,846,1,0,0,0,849,214,1,0,0,0,850,851,5,
		92,0,0,851,852,5,120,0,0,852,853,1,0,0,0,853,876,3,241,120,0,854,855,5,
		92,0,0,855,856,5,120,0,0,856,857,1,0,0,0,857,858,3,241,120,0,858,859,3,
		241,120,0,859,876,1,0,0,0,860,861,5,92,0,0,861,862,5,120,0,0,862,863,1,
		0,0,0,863,864,3,241,120,0,864,865,3,241,120,0,865,866,3,241,120,0,866,
		876,1,0,0,0,867,868,5,92,0,0,868,869,5,120,0,0,869,870,1,0,0,0,870,871,
		3,241,120,0,871,872,3,241,120,0,872,873,3,241,120,0,873,874,3,241,120,
		0,874,876,1,0,0,0,875,850,1,0,0,0,875,854,1,0,0,0,875,860,1,0,0,0,875,
		867,1,0,0,0,876,216,1,0,0,0,877,878,5,13,0,0,878,881,5,10,0,0,879,881,
		7,4,0,0,880,877,1,0,0,0,880,879,1,0,0,0,881,218,1,0,0,0,882,885,3,221,
		110,0,883,885,7,6,0,0,884,882,1,0,0,0,884,883,1,0,0,0,885,220,1,0,0,0,
		886,887,7,7,0,0,887,222,1,0,0,0,888,891,3,245,122,0,889,891,3,243,121,
		0,890,888,1,0,0,0,890,889,1,0,0,0,891,895,1,0,0,0,892,894,3,229,114,0,
		893,892,1,0,0,0,894,897,1,0,0,0,895,893,1,0,0,0,895,896,1,0,0,0,896,224,
		1,0,0,0,897,895,1,0,0,0,898,902,3,245,122,0,899,901,3,229,114,0,900,899,
		1,0,0,0,901,904,1,0,0,0,902,900,1,0,0,0,902,903,1,0,0,0,903,226,1,0,0,
		0,904,902,1,0,0,0,905,909,3,243,121,0,906,908,3,229,114,0,907,906,1,0,
		0,0,908,911,1,0,0,0,909,907,1,0,0,0,909,910,1,0,0,0,910,228,1,0,0,0,911,
		909,1,0,0,0,912,917,3,243,121,0,913,917,3,245,122,0,914,917,3,233,116,
		0,915,917,5,95,0,0,916,912,1,0,0,0,916,913,1,0,0,0,916,914,1,0,0,0,916,
		915,1,0,0,0,917,230,1,0,0,0,918,922,3,243,121,0,919,922,3,245,122,0,920,
		922,3,239,119,0,921,918,1,0,0,0,921,919,1,0,0,0,921,920,1,0,0,0,922,232,
		1,0,0,0,923,926,3,247,123,0,924,926,3,239,119,0,925,923,1,0,0,0,925,924,
		1,0,0,0,926,234,1,0,0,0,927,928,3,239,119,0,928,236,1,0,0,0,929,930,3,
		239,119,0,930,238,1,0,0,0,931,932,5,92,0,0,932,933,5,117,0,0,933,934,1,
		0,0,0,934,935,3,241,120,0,935,936,3,241,120,0,936,937,3,241,120,0,937,
		938,3,241,120,0,938,952,1,0,0,0,939,940,5,92,0,0,940,941,5,85,0,0,941,
		942,1,0,0,0,942,943,3,241,120,0,943,944,3,241,120,0,944,945,3,241,120,
		0,945,946,3,241,120,0,946,947,3,241,120,0,947,948,3,241,120,0,948,949,
		3,241,120,0,949,950,3,241,120,0,950,952,1,0,0,0,951,931,1,0,0,0,951,939,
		1,0,0,0,952,240,1,0,0,0,953,955,7,8,0,0,954,953,1,0,0,0,955,242,1,0,0,
		0,956,957,2,65,90,0,957,244,1,0,0,0,958,959,2,97,122,0,959,246,1,0,0,0,
		960,961,2,48,57,0,961,248,1,0,0,0,962,964,5,13,0,0,963,962,1,0,0,0,963,
		964,1,0,0,0,964,965,1,0,0,0,965,968,5,10,0,0,966,968,5,13,0,0,967,963,
		1,0,0,0,967,966,1,0,0,0,968,250,1,0,0,0,969,971,7,9,0,0,970,969,1,0,0,
		0,971,972,1,0,0,0,972,970,1,0,0,0,972,973,1,0,0,0,973,974,1,0,0,0,974,
		975,6,125,0,0,975,252,1,0,0,0,34,0,256,259,264,271,653,677,756,769,776,
		781,786,791,793,801,808,817,824,848,875,880,884,890,895,902,909,916,921,
		925,951,954,963,967,972,1,6,0,0
	};

	public static readonly ATN _ATN =
		new ATNDeserializer().Deserialize(_serializedATN);


}
