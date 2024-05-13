//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated by a tool.
//     ANTLR Version: 4.13.1
//
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

// Generated from c://Elan//IDE//grammar//Elan.g4 by ANTLR 4.13.1

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
public partial class ElanLexer : Lexer {
	protected static DFA[] decisionToDFA;
	protected static PredictionContextCache sharedContextCache = new PredictionContextCache();
	public const int
		T__0=1, NL=2, SINGLE_LINE_COMMENT=3, COMMENT_MARKER=4, ABSTRACT=5, AND=6, 
		AS=7, BE=8, ASSERT=9, CALL=10, CASE=11, CATCH=12, CLASS=13, CONSTANT=14, 
		CONSTRUCTOR=15, CURRY=16, DEFAULT=17, DIV=18, EACH=19, ELSE=20, END=21, 
		ENUM=22, FOR=23, FROM=24, FUNCTION=25, GLOBAL=26, IF=27, IMMUTABLE=28, 
		IMPORT=29, IN=30, INTO=31, INHERITS=32, INPUT=33, LAMBDA=34, LET=35, LIBRARY=36, 
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
		"T__0", "NL", "SINGLE_LINE_COMMENT", "COMMENT_MARKER", "ABSTRACT", "AND", 
		"AS", "BE", "ASSERT", "CALL", "CASE", "CATCH", "CLASS", "CONSTANT", "CONSTRUCTOR", 
		"CURRY", "DEFAULT", "DIV", "EACH", "ELSE", "END", "ENUM", "FOR", "FROM", 
		"FUNCTION", "GLOBAL", "IF", "IMMUTABLE", "IMPORT", "IN", "INTO", "INHERITS", 
		"INPUT", "LAMBDA", "LET", "LIBRARY", "MAIN", "MOD", "NEW", "NOT", "OF", 
		"IS", "OR", "PACKAGE", "PARTIAL", "PRINT", "PRIVATE", "PROCEDURE", "PROPERTY", 
		"REPEAT", "RETURN", "SET", "STEP", "SWITCH", "SYSTEM", "TEST", "THEN", 
		"THIS", "THROW", "TO", "TRY", "VAR", "WHEN", "WHILE", "WITH", "XOR", "BOOL_VALUE", 
		"VALUE_TYPE", "ARRAY", "LIST", "DICTIONARY", "ITERABLE", "EQUALS", "ARROW", 
		"OPEN_BRACE", "CLOSE_BRACE", "OPEN_SQ_BRACKET", "CLOSE_SQ_BRACKET", "OPEN_BRACKET", 
		"CLOSE_BRACKET", "DOUBLE_DOT", "DOT", "COMMA", "COLON", "PLUS", "MINUS", 
		"MULT", "DIVIDE", "POWER", "LT", "GT", "LE", "GE", "IS_NOT", "TYPENAME", 
		"IDENTIFIER", "LITERAL_INTEGER", "LITERAL_FLOAT", "LITERAL_CHAR", "LITERAL_STRING", 
		"WHITESPACES", "TEXT", "InputCharacter", "NewLineCharacter", "ExponentPart", 
		"CommonCharacter", "SimpleEscapeSequence", "HexEscapeSequence", "NewLine", 
		"Whitespace", "UnicodeClassZS", "IdentifierStartingUCorLC", "IdentifierStartingLC", 
		"IdentifierStartingUC", "IdentifierPartCharacter", "LetterCharacter", 
		"DecimalDigitCharacter", "ConnectingCharacter", "FormattingCharacter", 
		"UnicodeEscapeSequence", "HexDigit", "UnicodeClassLU", "UnicodeClassLL", 
		"UnicodeClassND", "NEWLINE", "WS"
	};


	public ElanLexer(ICharStream input)
	: this(input, Console.Out, Console.Error) { }

	public ElanLexer(ICharStream input, TextWriter output, TextWriter errorOutput)
	: base(input, output, errorOutput)
	{
		Interpreter = new LexerATNSimulator(this, _ATN, decisionToDFA, sharedContextCache);
	}

	private static readonly string[] _LiteralNames = {
		null, "'Func'", null, null, "'#'", "'abstract'", "'and'", "'as'", "'be'", 
		"'assert'", "'call'", "'case'", "'catch'", "'class'", "'constant'", "'constructor'", 
		"'curry'", "'default'", "'div'", "'each'", "'else'", "'end'", "'enum'", 
		"'for'", "'from'", "'function'", "'global'", "'if'", "'immutable'", "'import'", 
		"'in'", "'into'", "'inherits'", "'input'", "'lambda'", "'let'", "'library'", 
		"'main'", "'mod'", "'new'", "'not'", "'of'", "'is'", "'or'", "'package'", 
		"'partial'", "'print'", "'private'", "'procedure'", "'property'", "'repeat'", 
		"'return'", "'set'", "'step'", "'switch'", "'system'", "'test'", "'then'", 
		"'this'", "'throw'", "'to'", "'try'", "'var'", "'when'", "'while'", "'with'", 
		"'xor'", null, null, "'Array'", "'List'", "'Dictionary'", "'Iter'", "'='", 
		"'=>'", "'{'", "'}'", "'['", "']'", "'('", "')'", "'..'", "'.'", "','", 
		"':'", "'+'", "'-'", "'*'", "'/'", "'^'", "'<'", "'>'", "'<='", "'>='"
	};
	private static readonly string[] _SymbolicNames = {
		null, null, "NL", "SINGLE_LINE_COMMENT", "COMMENT_MARKER", "ABSTRACT", 
		"AND", "AS", "BE", "ASSERT", "CALL", "CASE", "CATCH", "CLASS", "CONSTANT", 
		"CONSTRUCTOR", "CURRY", "DEFAULT", "DIV", "EACH", "ELSE", "END", "ENUM", 
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

	public override string GrammarFileName { get { return "Elan.g4"; } }

	public override string[] RuleNames { get { return ruleNames; } }

	public override string[] ChannelNames { get { return channelNames; } }

	public override string[] ModeNames { get { return modeNames; } }

	public override int[] SerializedAtn { get { return _serializedATN; } }

	static ElanLexer() {
		decisionToDFA = new DFA[_ATN.NumberOfDecisions];
		for (int i = 0; i < _ATN.NumberOfDecisions; i++) {
			decisionToDFA[i] = new DFA(_ATN.GetDecisionState(i), i);
		}
	}
	private static int[] _serializedATN = {
		4,0,104,972,6,-1,2,0,7,0,2,1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,7,
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
		7,122,2,123,7,123,2,124,7,124,2,125,7,125,1,0,1,0,1,0,1,0,1,0,1,1,4,1,
		260,8,1,11,1,12,1,261,1,2,3,2,265,8,2,1,2,5,2,268,8,2,10,2,12,2,271,9,
		2,1,2,1,2,5,2,275,8,2,10,2,12,2,278,9,2,1,2,1,2,1,3,1,3,1,4,1,4,1,4,1,
		4,1,4,1,4,1,4,1,4,1,4,1,5,1,5,1,5,1,5,1,6,1,6,1,6,1,7,1,7,1,7,1,8,1,8,
		1,8,1,8,1,8,1,8,1,8,1,9,1,9,1,9,1,9,1,9,1,10,1,10,1,10,1,10,1,10,1,11,
		1,11,1,11,1,11,1,11,1,11,1,12,1,12,1,12,1,12,1,12,1,12,1,13,1,13,1,13,
		1,13,1,13,1,13,1,13,1,13,1,13,1,14,1,14,1,14,1,14,1,14,1,14,1,14,1,14,
		1,14,1,14,1,14,1,14,1,15,1,15,1,15,1,15,1,15,1,15,1,16,1,16,1,16,1,16,
		1,16,1,16,1,16,1,16,1,17,1,17,1,17,1,17,1,18,1,18,1,18,1,18,1,18,1,19,
		1,19,1,19,1,19,1,19,1,20,1,20,1,20,1,20,1,21,1,21,1,21,1,21,1,21,1,22,
		1,22,1,22,1,22,1,23,1,23,1,23,1,23,1,23,1,24,1,24,1,24,1,24,1,24,1,24,
		1,24,1,24,1,24,1,25,1,25,1,25,1,25,1,25,1,25,1,25,1,26,1,26,1,26,1,27,
		1,27,1,27,1,27,1,27,1,27,1,27,1,27,1,27,1,27,1,28,1,28,1,28,1,28,1,28,
		1,28,1,28,1,29,1,29,1,29,1,30,1,30,1,30,1,30,1,30,1,31,1,31,1,31,1,31,
		1,31,1,31,1,31,1,31,1,31,1,32,1,32,1,32,1,32,1,32,1,32,1,33,1,33,1,33,
		1,33,1,33,1,33,1,33,1,34,1,34,1,34,1,34,1,35,1,35,1,35,1,35,1,35,1,35,
		1,35,1,35,1,36,1,36,1,36,1,36,1,36,1,37,1,37,1,37,1,37,1,38,1,38,1,38,
		1,38,1,39,1,39,1,39,1,39,1,40,1,40,1,40,1,41,1,41,1,41,1,42,1,42,1,42,
		1,43,1,43,1,43,1,43,1,43,1,43,1,43,1,43,1,44,1,44,1,44,1,44,1,44,1,44,
		1,44,1,44,1,45,1,45,1,45,1,45,1,45,1,45,1,46,1,46,1,46,1,46,1,46,1,46,
		1,46,1,46,1,47,1,47,1,47,1,47,1,47,1,47,1,47,1,47,1,47,1,47,1,48,1,48,
		1,48,1,48,1,48,1,48,1,48,1,48,1,48,1,49,1,49,1,49,1,49,1,49,1,49,1,49,
		1,50,1,50,1,50,1,50,1,50,1,50,1,50,1,51,1,51,1,51,1,51,1,52,1,52,1,52,
		1,52,1,52,1,53,1,53,1,53,1,53,1,53,1,53,1,53,1,54,1,54,1,54,1,54,1,54,
		1,54,1,54,1,55,1,55,1,55,1,55,1,55,1,56,1,56,1,56,1,56,1,56,1,57,1,57,
		1,57,1,57,1,57,1,58,1,58,1,58,1,58,1,58,1,58,1,59,1,59,1,59,1,60,1,60,
		1,60,1,60,1,61,1,61,1,61,1,61,1,62,1,62,1,62,1,62,1,62,1,63,1,63,1,63,
		1,63,1,63,1,63,1,64,1,64,1,64,1,64,1,64,1,65,1,65,1,65,1,65,1,66,1,66,
		1,66,1,66,1,66,1,66,1,66,1,66,1,66,3,66,650,8,66,1,67,1,67,1,67,1,67,1,
		67,1,67,1,67,1,67,1,67,1,67,1,67,1,67,1,67,1,67,1,67,1,67,1,67,1,67,1,
		67,1,67,1,67,1,67,3,67,674,8,67,1,68,1,68,1,68,1,68,1,68,1,68,1,69,1,69,
		1,69,1,69,1,69,1,70,1,70,1,70,1,70,1,70,1,70,1,70,1,70,1,70,1,70,1,70,
		1,71,1,71,1,71,1,71,1,71,1,72,1,72,1,73,1,73,1,73,1,74,1,74,1,75,1,75,
		1,76,1,76,1,77,1,77,1,78,1,78,1,79,1,79,1,80,1,80,1,80,1,81,1,81,1,82,
		1,82,1,83,1,83,1,84,1,84,1,85,1,85,1,86,1,86,1,87,1,87,1,88,1,88,1,89,
		1,89,1,90,1,90,1,91,1,91,1,91,1,92,1,92,1,92,1,93,1,93,5,93,751,8,93,10,
		93,12,93,754,9,93,1,93,1,93,1,94,1,94,1,95,1,95,1,96,1,96,5,96,764,8,96,
		10,96,12,96,767,9,96,1,97,1,97,1,97,1,97,3,97,773,8,97,1,98,1,98,1,98,
		3,98,778,8,98,1,98,1,98,1,98,3,98,783,8,98,1,99,1,99,1,99,5,99,788,8,99,
		10,99,12,99,791,9,99,1,99,1,99,1,100,4,100,796,8,100,11,100,12,100,797,
		1,100,1,100,1,101,4,101,803,8,101,11,101,12,101,804,1,102,1,102,1,103,
		1,103,1,104,1,104,1,104,3,104,814,8,104,1,104,1,104,1,105,1,105,1,105,
		3,105,821,8,105,1,106,1,106,1,106,1,106,1,106,1,106,1,106,1,106,1,106,
		1,106,1,106,1,106,1,106,1,106,1,106,1,106,1,106,1,106,1,106,1,106,1,106,
		1,106,3,106,845,8,106,1,107,1,107,1,107,1,107,1,107,1,107,1,107,1,107,
		1,107,1,107,1,107,1,107,1,107,1,107,1,107,1,107,1,107,1,107,1,107,1,107,
		1,107,1,107,1,107,1,107,1,107,3,107,872,8,107,1,108,1,108,1,108,3,108,
		877,8,108,1,109,1,109,3,109,881,8,109,1,110,1,110,1,111,1,111,3,111,887,
		8,111,1,111,5,111,890,8,111,10,111,12,111,893,9,111,1,112,1,112,5,112,
		897,8,112,10,112,12,112,900,9,112,1,113,1,113,5,113,904,8,113,10,113,12,
		113,907,9,113,1,114,1,114,1,114,1,114,3,114,913,8,114,1,115,1,115,1,115,
		3,115,918,8,115,1,116,1,116,3,116,922,8,116,1,117,1,117,1,118,1,118,1,
		119,1,119,1,119,1,119,1,119,1,119,1,119,1,119,1,119,1,119,1,119,1,119,
		1,119,1,119,1,119,1,119,1,119,1,119,1,119,1,119,3,119,948,8,119,1,120,
		3,120,951,8,120,1,121,1,121,1,122,1,122,1,123,1,123,1,124,3,124,960,8,
		124,1,124,1,124,3,124,964,8,124,1,125,4,125,967,8,125,11,125,12,125,968,
		1,125,1,125,0,0,126,1,1,3,2,5,3,7,4,9,5,11,6,13,7,15,8,17,9,19,10,21,11,
		23,12,25,13,27,14,29,15,31,16,33,17,35,18,37,19,39,20,41,21,43,22,45,23,
		47,24,49,25,51,26,53,27,55,28,57,29,59,30,61,31,63,32,65,33,67,34,69,35,
		71,36,73,37,75,38,77,39,79,40,81,41,83,42,85,43,87,44,89,45,91,46,93,47,
		95,48,97,49,99,50,101,51,103,52,105,53,107,54,109,55,111,56,113,57,115,
		58,117,59,119,60,121,61,123,62,125,63,127,64,129,65,131,66,133,67,135,
		68,137,69,139,70,141,71,143,72,145,73,147,74,149,75,151,76,153,77,155,
		78,157,79,159,80,161,81,163,82,165,83,167,84,169,85,171,86,173,87,175,
		88,177,89,179,90,181,91,183,92,185,93,187,94,189,95,191,96,193,97,195,
		98,197,99,199,100,201,101,203,102,205,0,207,0,209,0,211,0,213,0,215,0,
		217,0,219,0,221,0,223,0,225,0,227,0,229,0,231,0,233,0,235,0,237,0,239,
		0,241,0,243,0,245,0,247,0,249,103,251,104,1,0,10,2,0,10,10,12,13,1,0,48,
		57,5,0,10,10,13,13,39,39,92,92,133,133,2,0,34,34,133,133,3,0,10,10,13,
		13,133,133,1,0,101,101,2,0,9,9,11,12,2,0,32,32,160,160,3,0,48,57,65,70,
		97,102,2,0,9,9,32,32,1000,0,1,1,0,0,0,0,3,1,0,0,0,0,5,1,0,0,0,0,7,1,0,
		0,0,0,9,1,0,0,0,0,11,1,0,0,0,0,13,1,0,0,0,0,15,1,0,0,0,0,17,1,0,0,0,0,
		19,1,0,0,0,0,21,1,0,0,0,0,23,1,0,0,0,0,25,1,0,0,0,0,27,1,0,0,0,0,29,1,
		0,0,0,0,31,1,0,0,0,0,33,1,0,0,0,0,35,1,0,0,0,0,37,1,0,0,0,0,39,1,0,0,0,
		0,41,1,0,0,0,0,43,1,0,0,0,0,45,1,0,0,0,0,47,1,0,0,0,0,49,1,0,0,0,0,51,
		1,0,0,0,0,53,1,0,0,0,0,55,1,0,0,0,0,57,1,0,0,0,0,59,1,0,0,0,0,61,1,0,0,
		0,0,63,1,0,0,0,0,65,1,0,0,0,0,67,1,0,0,0,0,69,1,0,0,0,0,71,1,0,0,0,0,73,
		1,0,0,0,0,75,1,0,0,0,0,77,1,0,0,0,0,79,1,0,0,0,0,81,1,0,0,0,0,83,1,0,0,
		0,0,85,1,0,0,0,0,87,1,0,0,0,0,89,1,0,0,0,0,91,1,0,0,0,0,93,1,0,0,0,0,95,
		1,0,0,0,0,97,1,0,0,0,0,99,1,0,0,0,0,101,1,0,0,0,0,103,1,0,0,0,0,105,1,
		0,0,0,0,107,1,0,0,0,0,109,1,0,0,0,0,111,1,0,0,0,0,113,1,0,0,0,0,115,1,
		0,0,0,0,117,1,0,0,0,0,119,1,0,0,0,0,121,1,0,0,0,0,123,1,0,0,0,0,125,1,
		0,0,0,0,127,1,0,0,0,0,129,1,0,0,0,0,131,1,0,0,0,0,133,1,0,0,0,0,135,1,
		0,0,0,0,137,1,0,0,0,0,139,1,0,0,0,0,141,1,0,0,0,0,143,1,0,0,0,0,145,1,
		0,0,0,0,147,1,0,0,0,0,149,1,0,0,0,0,151,1,0,0,0,0,153,1,0,0,0,0,155,1,
		0,0,0,0,157,1,0,0,0,0,159,1,0,0,0,0,161,1,0,0,0,0,163,1,0,0,0,0,165,1,
		0,0,0,0,167,1,0,0,0,0,169,1,0,0,0,0,171,1,0,0,0,0,173,1,0,0,0,0,175,1,
		0,0,0,0,177,1,0,0,0,0,179,1,0,0,0,0,181,1,0,0,0,0,183,1,0,0,0,0,185,1,
		0,0,0,0,187,1,0,0,0,0,189,1,0,0,0,0,191,1,0,0,0,0,193,1,0,0,0,0,195,1,
		0,0,0,0,197,1,0,0,0,0,199,1,0,0,0,0,201,1,0,0,0,0,203,1,0,0,0,0,249,1,
		0,0,0,0,251,1,0,0,0,1,253,1,0,0,0,3,259,1,0,0,0,5,264,1,0,0,0,7,281,1,
		0,0,0,9,283,1,0,0,0,11,292,1,0,0,0,13,296,1,0,0,0,15,299,1,0,0,0,17,302,
		1,0,0,0,19,309,1,0,0,0,21,314,1,0,0,0,23,319,1,0,0,0,25,325,1,0,0,0,27,
		331,1,0,0,0,29,340,1,0,0,0,31,352,1,0,0,0,33,358,1,0,0,0,35,366,1,0,0,
		0,37,370,1,0,0,0,39,375,1,0,0,0,41,380,1,0,0,0,43,384,1,0,0,0,45,389,1,
		0,0,0,47,393,1,0,0,0,49,398,1,0,0,0,51,407,1,0,0,0,53,414,1,0,0,0,55,417,
		1,0,0,0,57,427,1,0,0,0,59,434,1,0,0,0,61,437,1,0,0,0,63,442,1,0,0,0,65,
		451,1,0,0,0,67,457,1,0,0,0,69,464,1,0,0,0,71,468,1,0,0,0,73,476,1,0,0,
		0,75,481,1,0,0,0,77,485,1,0,0,0,79,489,1,0,0,0,81,493,1,0,0,0,83,496,1,
		0,0,0,85,499,1,0,0,0,87,502,1,0,0,0,89,510,1,0,0,0,91,518,1,0,0,0,93,524,
		1,0,0,0,95,532,1,0,0,0,97,542,1,0,0,0,99,551,1,0,0,0,101,558,1,0,0,0,103,
		565,1,0,0,0,105,569,1,0,0,0,107,574,1,0,0,0,109,581,1,0,0,0,111,588,1,
		0,0,0,113,593,1,0,0,0,115,598,1,0,0,0,117,603,1,0,0,0,119,609,1,0,0,0,
		121,612,1,0,0,0,123,616,1,0,0,0,125,620,1,0,0,0,127,625,1,0,0,0,129,631,
		1,0,0,0,131,636,1,0,0,0,133,649,1,0,0,0,135,673,1,0,0,0,137,675,1,0,0,
		0,139,681,1,0,0,0,141,686,1,0,0,0,143,697,1,0,0,0,145,702,1,0,0,0,147,
		704,1,0,0,0,149,707,1,0,0,0,151,709,1,0,0,0,153,711,1,0,0,0,155,713,1,
		0,0,0,157,715,1,0,0,0,159,717,1,0,0,0,161,719,1,0,0,0,163,722,1,0,0,0,
		165,724,1,0,0,0,167,726,1,0,0,0,169,728,1,0,0,0,171,730,1,0,0,0,173,732,
		1,0,0,0,175,734,1,0,0,0,177,736,1,0,0,0,179,738,1,0,0,0,181,740,1,0,0,
		0,183,742,1,0,0,0,185,745,1,0,0,0,187,748,1,0,0,0,189,757,1,0,0,0,191,
		759,1,0,0,0,193,761,1,0,0,0,195,768,1,0,0,0,197,782,1,0,0,0,199,784,1,
		0,0,0,201,795,1,0,0,0,203,802,1,0,0,0,205,806,1,0,0,0,207,808,1,0,0,0,
		209,810,1,0,0,0,211,820,1,0,0,0,213,844,1,0,0,0,215,871,1,0,0,0,217,876,
		1,0,0,0,219,880,1,0,0,0,221,882,1,0,0,0,223,886,1,0,0,0,225,894,1,0,0,
		0,227,901,1,0,0,0,229,912,1,0,0,0,231,917,1,0,0,0,233,921,1,0,0,0,235,
		923,1,0,0,0,237,925,1,0,0,0,239,947,1,0,0,0,241,950,1,0,0,0,243,952,1,
		0,0,0,245,954,1,0,0,0,247,956,1,0,0,0,249,963,1,0,0,0,251,966,1,0,0,0,
		253,254,5,70,0,0,254,255,5,117,0,0,255,256,5,110,0,0,256,257,5,99,0,0,
		257,2,1,0,0,0,258,260,7,0,0,0,259,258,1,0,0,0,260,261,1,0,0,0,261,259,
		1,0,0,0,261,262,1,0,0,0,262,4,1,0,0,0,263,265,3,3,1,0,264,263,1,0,0,0,
		264,265,1,0,0,0,265,269,1,0,0,0,266,268,3,219,109,0,267,266,1,0,0,0,268,
		271,1,0,0,0,269,267,1,0,0,0,269,270,1,0,0,0,270,272,1,0,0,0,271,269,1,
		0,0,0,272,276,3,7,3,0,273,275,3,205,102,0,274,273,1,0,0,0,275,278,1,0,
		0,0,276,274,1,0,0,0,276,277,1,0,0,0,277,279,1,0,0,0,278,276,1,0,0,0,279,
		280,6,2,0,0,280,6,1,0,0,0,281,282,5,35,0,0,282,8,1,0,0,0,283,284,5,97,
		0,0,284,285,5,98,0,0,285,286,5,115,0,0,286,287,5,116,0,0,287,288,5,114,
		0,0,288,289,5,97,0,0,289,290,5,99,0,0,290,291,5,116,0,0,291,10,1,0,0,0,
		292,293,5,97,0,0,293,294,5,110,0,0,294,295,5,100,0,0,295,12,1,0,0,0,296,
		297,5,97,0,0,297,298,5,115,0,0,298,14,1,0,0,0,299,300,5,98,0,0,300,301,
		5,101,0,0,301,16,1,0,0,0,302,303,5,97,0,0,303,304,5,115,0,0,304,305,5,
		115,0,0,305,306,5,101,0,0,306,307,5,114,0,0,307,308,5,116,0,0,308,18,1,
		0,0,0,309,310,5,99,0,0,310,311,5,97,0,0,311,312,5,108,0,0,312,313,5,108,
		0,0,313,20,1,0,0,0,314,315,5,99,0,0,315,316,5,97,0,0,316,317,5,115,0,0,
		317,318,5,101,0,0,318,22,1,0,0,0,319,320,5,99,0,0,320,321,5,97,0,0,321,
		322,5,116,0,0,322,323,5,99,0,0,323,324,5,104,0,0,324,24,1,0,0,0,325,326,
		5,99,0,0,326,327,5,108,0,0,327,328,5,97,0,0,328,329,5,115,0,0,329,330,
		5,115,0,0,330,26,1,0,0,0,331,332,5,99,0,0,332,333,5,111,0,0,333,334,5,
		110,0,0,334,335,5,115,0,0,335,336,5,116,0,0,336,337,5,97,0,0,337,338,5,
		110,0,0,338,339,5,116,0,0,339,28,1,0,0,0,340,341,5,99,0,0,341,342,5,111,
		0,0,342,343,5,110,0,0,343,344,5,115,0,0,344,345,5,116,0,0,345,346,5,114,
		0,0,346,347,5,117,0,0,347,348,5,99,0,0,348,349,5,116,0,0,349,350,5,111,
		0,0,350,351,5,114,0,0,351,30,1,0,0,0,352,353,5,99,0,0,353,354,5,117,0,
		0,354,355,5,114,0,0,355,356,5,114,0,0,356,357,5,121,0,0,357,32,1,0,0,0,
		358,359,5,100,0,0,359,360,5,101,0,0,360,361,5,102,0,0,361,362,5,97,0,0,
		362,363,5,117,0,0,363,364,5,108,0,0,364,365,5,116,0,0,365,34,1,0,0,0,366,
		367,5,100,0,0,367,368,5,105,0,0,368,369,5,118,0,0,369,36,1,0,0,0,370,371,
		5,101,0,0,371,372,5,97,0,0,372,373,5,99,0,0,373,374,5,104,0,0,374,38,1,
		0,0,0,375,376,5,101,0,0,376,377,5,108,0,0,377,378,5,115,0,0,378,379,5,
		101,0,0,379,40,1,0,0,0,380,381,5,101,0,0,381,382,5,110,0,0,382,383,5,100,
		0,0,383,42,1,0,0,0,384,385,5,101,0,0,385,386,5,110,0,0,386,387,5,117,0,
		0,387,388,5,109,0,0,388,44,1,0,0,0,389,390,5,102,0,0,390,391,5,111,0,0,
		391,392,5,114,0,0,392,46,1,0,0,0,393,394,5,102,0,0,394,395,5,114,0,0,395,
		396,5,111,0,0,396,397,5,109,0,0,397,48,1,0,0,0,398,399,5,102,0,0,399,400,
		5,117,0,0,400,401,5,110,0,0,401,402,5,99,0,0,402,403,5,116,0,0,403,404,
		5,105,0,0,404,405,5,111,0,0,405,406,5,110,0,0,406,50,1,0,0,0,407,408,5,
		103,0,0,408,409,5,108,0,0,409,410,5,111,0,0,410,411,5,98,0,0,411,412,5,
		97,0,0,412,413,5,108,0,0,413,52,1,0,0,0,414,415,5,105,0,0,415,416,5,102,
		0,0,416,54,1,0,0,0,417,418,5,105,0,0,418,419,5,109,0,0,419,420,5,109,0,
		0,420,421,5,117,0,0,421,422,5,116,0,0,422,423,5,97,0,0,423,424,5,98,0,
		0,424,425,5,108,0,0,425,426,5,101,0,0,426,56,1,0,0,0,427,428,5,105,0,0,
		428,429,5,109,0,0,429,430,5,112,0,0,430,431,5,111,0,0,431,432,5,114,0,
		0,432,433,5,116,0,0,433,58,1,0,0,0,434,435,5,105,0,0,435,436,5,110,0,0,
		436,60,1,0,0,0,437,438,5,105,0,0,438,439,5,110,0,0,439,440,5,116,0,0,440,
		441,5,111,0,0,441,62,1,0,0,0,442,443,5,105,0,0,443,444,5,110,0,0,444,445,
		5,104,0,0,445,446,5,101,0,0,446,447,5,114,0,0,447,448,5,105,0,0,448,449,
		5,116,0,0,449,450,5,115,0,0,450,64,1,0,0,0,451,452,5,105,0,0,452,453,5,
		110,0,0,453,454,5,112,0,0,454,455,5,117,0,0,455,456,5,116,0,0,456,66,1,
		0,0,0,457,458,5,108,0,0,458,459,5,97,0,0,459,460,5,109,0,0,460,461,5,98,
		0,0,461,462,5,100,0,0,462,463,5,97,0,0,463,68,1,0,0,0,464,465,5,108,0,
		0,465,466,5,101,0,0,466,467,5,116,0,0,467,70,1,0,0,0,468,469,5,108,0,0,
		469,470,5,105,0,0,470,471,5,98,0,0,471,472,5,114,0,0,472,473,5,97,0,0,
		473,474,5,114,0,0,474,475,5,121,0,0,475,72,1,0,0,0,476,477,5,109,0,0,477,
		478,5,97,0,0,478,479,5,105,0,0,479,480,5,110,0,0,480,74,1,0,0,0,481,482,
		5,109,0,0,482,483,5,111,0,0,483,484,5,100,0,0,484,76,1,0,0,0,485,486,5,
		110,0,0,486,487,5,101,0,0,487,488,5,119,0,0,488,78,1,0,0,0,489,490,5,110,
		0,0,490,491,5,111,0,0,491,492,5,116,0,0,492,80,1,0,0,0,493,494,5,111,0,
		0,494,495,5,102,0,0,495,82,1,0,0,0,496,497,5,105,0,0,497,498,5,115,0,0,
		498,84,1,0,0,0,499,500,5,111,0,0,500,501,5,114,0,0,501,86,1,0,0,0,502,
		503,5,112,0,0,503,504,5,97,0,0,504,505,5,99,0,0,505,506,5,107,0,0,506,
		507,5,97,0,0,507,508,5,103,0,0,508,509,5,101,0,0,509,88,1,0,0,0,510,511,
		5,112,0,0,511,512,5,97,0,0,512,513,5,114,0,0,513,514,5,116,0,0,514,515,
		5,105,0,0,515,516,5,97,0,0,516,517,5,108,0,0,517,90,1,0,0,0,518,519,5,
		112,0,0,519,520,5,114,0,0,520,521,5,105,0,0,521,522,5,110,0,0,522,523,
		5,116,0,0,523,92,1,0,0,0,524,525,5,112,0,0,525,526,5,114,0,0,526,527,5,
		105,0,0,527,528,5,118,0,0,528,529,5,97,0,0,529,530,5,116,0,0,530,531,5,
		101,0,0,531,94,1,0,0,0,532,533,5,112,0,0,533,534,5,114,0,0,534,535,5,111,
		0,0,535,536,5,99,0,0,536,537,5,101,0,0,537,538,5,100,0,0,538,539,5,117,
		0,0,539,540,5,114,0,0,540,541,5,101,0,0,541,96,1,0,0,0,542,543,5,112,0,
		0,543,544,5,114,0,0,544,545,5,111,0,0,545,546,5,112,0,0,546,547,5,101,
		0,0,547,548,5,114,0,0,548,549,5,116,0,0,549,550,5,121,0,0,550,98,1,0,0,
		0,551,552,5,114,0,0,552,553,5,101,0,0,553,554,5,112,0,0,554,555,5,101,
		0,0,555,556,5,97,0,0,556,557,5,116,0,0,557,100,1,0,0,0,558,559,5,114,0,
		0,559,560,5,101,0,0,560,561,5,116,0,0,561,562,5,117,0,0,562,563,5,114,
		0,0,563,564,5,110,0,0,564,102,1,0,0,0,565,566,5,115,0,0,566,567,5,101,
		0,0,567,568,5,116,0,0,568,104,1,0,0,0,569,570,5,115,0,0,570,571,5,116,
		0,0,571,572,5,101,0,0,572,573,5,112,0,0,573,106,1,0,0,0,574,575,5,115,
		0,0,575,576,5,119,0,0,576,577,5,105,0,0,577,578,5,116,0,0,578,579,5,99,
		0,0,579,580,5,104,0,0,580,108,1,0,0,0,581,582,5,115,0,0,582,583,5,121,
		0,0,583,584,5,115,0,0,584,585,5,116,0,0,585,586,5,101,0,0,586,587,5,109,
		0,0,587,110,1,0,0,0,588,589,5,116,0,0,589,590,5,101,0,0,590,591,5,115,
		0,0,591,592,5,116,0,0,592,112,1,0,0,0,593,594,5,116,0,0,594,595,5,104,
		0,0,595,596,5,101,0,0,596,597,5,110,0,0,597,114,1,0,0,0,598,599,5,116,
		0,0,599,600,5,104,0,0,600,601,5,105,0,0,601,602,5,115,0,0,602,116,1,0,
		0,0,603,604,5,116,0,0,604,605,5,104,0,0,605,606,5,114,0,0,606,607,5,111,
		0,0,607,608,5,119,0,0,608,118,1,0,0,0,609,610,5,116,0,0,610,611,5,111,
		0,0,611,120,1,0,0,0,612,613,5,116,0,0,613,614,5,114,0,0,614,615,5,121,
		0,0,615,122,1,0,0,0,616,617,5,118,0,0,617,618,5,97,0,0,618,619,5,114,0,
		0,619,124,1,0,0,0,620,621,5,119,0,0,621,622,5,104,0,0,622,623,5,101,0,
		0,623,624,5,110,0,0,624,126,1,0,0,0,625,626,5,119,0,0,626,627,5,104,0,
		0,627,628,5,105,0,0,628,629,5,108,0,0,629,630,5,101,0,0,630,128,1,0,0,
		0,631,632,5,119,0,0,632,633,5,105,0,0,633,634,5,116,0,0,634,635,5,104,
		0,0,635,130,1,0,0,0,636,637,5,120,0,0,637,638,5,111,0,0,638,639,5,114,
		0,0,639,132,1,0,0,0,640,641,5,116,0,0,641,642,5,114,0,0,642,643,5,117,
		0,0,643,650,5,101,0,0,644,645,5,102,0,0,645,646,5,97,0,0,646,647,5,108,
		0,0,647,648,5,115,0,0,648,650,5,101,0,0,649,640,1,0,0,0,649,644,1,0,0,
		0,650,134,1,0,0,0,651,652,5,73,0,0,652,653,5,110,0,0,653,674,5,116,0,0,
		654,655,5,70,0,0,655,656,5,108,0,0,656,657,5,111,0,0,657,658,5,97,0,0,
		658,674,5,116,0,0,659,660,5,67,0,0,660,661,5,104,0,0,661,662,5,97,0,0,
		662,674,5,114,0,0,663,664,5,83,0,0,664,665,5,116,0,0,665,666,5,114,0,0,
		666,667,5,105,0,0,667,668,5,110,0,0,668,674,5,103,0,0,669,670,5,66,0,0,
		670,671,5,111,0,0,671,672,5,111,0,0,672,674,5,108,0,0,673,651,1,0,0,0,
		673,654,1,0,0,0,673,659,1,0,0,0,673,663,1,0,0,0,673,669,1,0,0,0,674,136,
		1,0,0,0,675,676,5,65,0,0,676,677,5,114,0,0,677,678,5,114,0,0,678,679,5,
		97,0,0,679,680,5,121,0,0,680,138,1,0,0,0,681,682,5,76,0,0,682,683,5,105,
		0,0,683,684,5,115,0,0,684,685,5,116,0,0,685,140,1,0,0,0,686,687,5,68,0,
		0,687,688,5,105,0,0,688,689,5,99,0,0,689,690,5,116,0,0,690,691,5,105,0,
		0,691,692,5,111,0,0,692,693,5,110,0,0,693,694,5,97,0,0,694,695,5,114,0,
		0,695,696,5,121,0,0,696,142,1,0,0,0,697,698,5,73,0,0,698,699,5,116,0,0,
		699,700,5,101,0,0,700,701,5,114,0,0,701,144,1,0,0,0,702,703,5,61,0,0,703,
		146,1,0,0,0,704,705,5,61,0,0,705,706,5,62,0,0,706,148,1,0,0,0,707,708,
		5,123,0,0,708,150,1,0,0,0,709,710,5,125,0,0,710,152,1,0,0,0,711,712,5,
		91,0,0,712,154,1,0,0,0,713,714,5,93,0,0,714,156,1,0,0,0,715,716,5,40,0,
		0,716,158,1,0,0,0,717,718,5,41,0,0,718,160,1,0,0,0,719,720,5,46,0,0,720,
		721,5,46,0,0,721,162,1,0,0,0,722,723,5,46,0,0,723,164,1,0,0,0,724,725,
		5,44,0,0,725,166,1,0,0,0,726,727,5,58,0,0,727,168,1,0,0,0,728,729,5,43,
		0,0,729,170,1,0,0,0,730,731,5,45,0,0,731,172,1,0,0,0,732,733,5,42,0,0,
		733,174,1,0,0,0,734,735,5,47,0,0,735,176,1,0,0,0,736,737,5,94,0,0,737,
		178,1,0,0,0,738,739,5,60,0,0,739,180,1,0,0,0,740,741,5,62,0,0,741,182,
		1,0,0,0,742,743,5,60,0,0,743,744,5,61,0,0,744,184,1,0,0,0,745,746,5,62,
		0,0,746,747,5,61,0,0,747,186,1,0,0,0,748,752,3,83,41,0,749,751,3,219,109,
		0,750,749,1,0,0,0,751,754,1,0,0,0,752,750,1,0,0,0,752,753,1,0,0,0,753,
		755,1,0,0,0,754,752,1,0,0,0,755,756,3,79,39,0,756,188,1,0,0,0,757,758,
		3,227,113,0,758,190,1,0,0,0,759,760,3,225,112,0,760,192,1,0,0,0,761,765,
		7,1,0,0,762,764,7,1,0,0,763,762,1,0,0,0,764,767,1,0,0,0,765,763,1,0,0,
		0,765,766,1,0,0,0,766,194,1,0,0,0,767,765,1,0,0,0,768,769,3,193,96,0,769,
		770,3,163,81,0,770,772,3,193,96,0,771,773,3,209,104,0,772,771,1,0,0,0,
		772,773,1,0,0,0,773,196,1,0,0,0,774,777,5,39,0,0,775,778,8,2,0,0,776,778,
		3,211,105,0,777,775,1,0,0,0,777,776,1,0,0,0,778,779,1,0,0,0,779,783,5,
		39,0,0,780,781,5,39,0,0,781,783,5,39,0,0,782,774,1,0,0,0,782,780,1,0,0,
		0,783,198,1,0,0,0,784,789,5,34,0,0,785,788,8,3,0,0,786,788,3,211,105,0,
		787,785,1,0,0,0,787,786,1,0,0,0,788,791,1,0,0,0,789,787,1,0,0,0,789,790,
		1,0,0,0,790,792,1,0,0,0,791,789,1,0,0,0,792,793,5,34,0,0,793,200,1,0,0,
		0,794,796,3,219,109,0,795,794,1,0,0,0,796,797,1,0,0,0,797,795,1,0,0,0,
		797,798,1,0,0,0,798,799,1,0,0,0,799,800,6,100,0,0,800,202,1,0,0,0,801,
		803,3,211,105,0,802,801,1,0,0,0,803,804,1,0,0,0,804,802,1,0,0,0,804,805,
		1,0,0,0,805,204,1,0,0,0,806,807,8,4,0,0,807,206,1,0,0,0,808,809,7,4,0,
		0,809,208,1,0,0,0,810,813,7,5,0,0,811,814,3,169,84,0,812,814,3,171,85,
		0,813,811,1,0,0,0,813,812,1,0,0,0,813,814,1,0,0,0,814,815,1,0,0,0,815,
		816,3,193,96,0,816,210,1,0,0,0,817,821,3,213,106,0,818,821,3,215,107,0,
		819,821,3,239,119,0,820,817,1,0,0,0,820,818,1,0,0,0,820,819,1,0,0,0,821,
		212,1,0,0,0,822,823,5,92,0,0,823,845,5,39,0,0,824,825,5,92,0,0,825,845,
		5,34,0,0,826,827,5,92,0,0,827,845,5,92,0,0,828,829,5,92,0,0,829,845,5,
		48,0,0,830,831,5,92,0,0,831,845,5,97,0,0,832,833,5,92,0,0,833,845,5,98,
		0,0,834,835,5,92,0,0,835,845,5,102,0,0,836,837,5,92,0,0,837,845,5,110,
		0,0,838,839,5,92,0,0,839,845,5,114,0,0,840,841,5,92,0,0,841,845,5,116,
		0,0,842,843,5,92,0,0,843,845,5,118,0,0,844,822,1,0,0,0,844,824,1,0,0,0,
		844,826,1,0,0,0,844,828,1,0,0,0,844,830,1,0,0,0,844,832,1,0,0,0,844,834,
		1,0,0,0,844,836,1,0,0,0,844,838,1,0,0,0,844,840,1,0,0,0,844,842,1,0,0,
		0,845,214,1,0,0,0,846,847,5,92,0,0,847,848,5,120,0,0,848,849,1,0,0,0,849,
		872,3,241,120,0,850,851,5,92,0,0,851,852,5,120,0,0,852,853,1,0,0,0,853,
		854,3,241,120,0,854,855,3,241,120,0,855,872,1,0,0,0,856,857,5,92,0,0,857,
		858,5,120,0,0,858,859,1,0,0,0,859,860,3,241,120,0,860,861,3,241,120,0,
		861,862,3,241,120,0,862,872,1,0,0,0,863,864,5,92,0,0,864,865,5,120,0,0,
		865,866,1,0,0,0,866,867,3,241,120,0,867,868,3,241,120,0,868,869,3,241,
		120,0,869,870,3,241,120,0,870,872,1,0,0,0,871,846,1,0,0,0,871,850,1,0,
		0,0,871,856,1,0,0,0,871,863,1,0,0,0,872,216,1,0,0,0,873,874,5,13,0,0,874,
		877,5,10,0,0,875,877,7,4,0,0,876,873,1,0,0,0,876,875,1,0,0,0,877,218,1,
		0,0,0,878,881,3,221,110,0,879,881,7,6,0,0,880,878,1,0,0,0,880,879,1,0,
		0,0,881,220,1,0,0,0,882,883,7,7,0,0,883,222,1,0,0,0,884,887,3,245,122,
		0,885,887,3,243,121,0,886,884,1,0,0,0,886,885,1,0,0,0,887,891,1,0,0,0,
		888,890,3,229,114,0,889,888,1,0,0,0,890,893,1,0,0,0,891,889,1,0,0,0,891,
		892,1,0,0,0,892,224,1,0,0,0,893,891,1,0,0,0,894,898,3,245,122,0,895,897,
		3,229,114,0,896,895,1,0,0,0,897,900,1,0,0,0,898,896,1,0,0,0,898,899,1,
		0,0,0,899,226,1,0,0,0,900,898,1,0,0,0,901,905,3,243,121,0,902,904,3,229,
		114,0,903,902,1,0,0,0,904,907,1,0,0,0,905,903,1,0,0,0,905,906,1,0,0,0,
		906,228,1,0,0,0,907,905,1,0,0,0,908,913,3,243,121,0,909,913,3,245,122,
		0,910,913,3,233,116,0,911,913,5,95,0,0,912,908,1,0,0,0,912,909,1,0,0,0,
		912,910,1,0,0,0,912,911,1,0,0,0,913,230,1,0,0,0,914,918,3,243,121,0,915,
		918,3,245,122,0,916,918,3,239,119,0,917,914,1,0,0,0,917,915,1,0,0,0,917,
		916,1,0,0,0,918,232,1,0,0,0,919,922,3,247,123,0,920,922,3,239,119,0,921,
		919,1,0,0,0,921,920,1,0,0,0,922,234,1,0,0,0,923,924,3,239,119,0,924,236,
		1,0,0,0,925,926,3,239,119,0,926,238,1,0,0,0,927,928,5,92,0,0,928,929,5,
		117,0,0,929,930,1,0,0,0,930,931,3,241,120,0,931,932,3,241,120,0,932,933,
		3,241,120,0,933,934,3,241,120,0,934,948,1,0,0,0,935,936,5,92,0,0,936,937,
		5,85,0,0,937,938,1,0,0,0,938,939,3,241,120,0,939,940,3,241,120,0,940,941,
		3,241,120,0,941,942,3,241,120,0,942,943,3,241,120,0,943,944,3,241,120,
		0,944,945,3,241,120,0,945,946,3,241,120,0,946,948,1,0,0,0,947,927,1,0,
		0,0,947,935,1,0,0,0,948,240,1,0,0,0,949,951,7,8,0,0,950,949,1,0,0,0,951,
		242,1,0,0,0,952,953,2,65,90,0,953,244,1,0,0,0,954,955,2,97,122,0,955,246,
		1,0,0,0,956,957,2,48,57,0,957,248,1,0,0,0,958,960,5,13,0,0,959,958,1,0,
		0,0,959,960,1,0,0,0,960,961,1,0,0,0,961,964,5,10,0,0,962,964,5,13,0,0,
		963,959,1,0,0,0,963,962,1,0,0,0,964,250,1,0,0,0,965,967,7,9,0,0,966,965,
		1,0,0,0,967,968,1,0,0,0,968,966,1,0,0,0,968,969,1,0,0,0,969,970,1,0,0,
		0,970,971,6,125,0,0,971,252,1,0,0,0,34,0,261,264,269,276,649,673,752,765,
		772,777,782,787,789,797,804,813,820,844,871,876,880,886,891,898,905,912,
		917,921,947,950,959,963,968,1,6,0,0
	};

	public static readonly ATN _ATN =
		new ATNDeserializer().Deserialize(_serializedATN);


}
