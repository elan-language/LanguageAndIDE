// Generated from c://Elan//IDE//grammar//Elan.g4 by ANTLR 4.13.1
import org.antlr.v4.runtime.atn.*;
import org.antlr.v4.runtime.dfa.DFA;
import org.antlr.v4.runtime.*;
import org.antlr.v4.runtime.misc.*;
import org.antlr.v4.runtime.tree.*;
import java.util.List;
import java.util.Iterator;
import java.util.ArrayList;

@SuppressWarnings({"all", "warnings", "unchecked", "unused", "cast", "CheckReturnValue"})
public class ElanParser extends Parser {
	static { RuntimeMetaData.checkVersion("4.13.1", RuntimeMetaData.VERSION); }

	protected static final DFA[] _decisionToDFA;
	protected static final PredictionContextCache _sharedContextCache =
		new PredictionContextCache();
	public static final int
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
	public static final int
		RULE_file = 0, RULE_comment = 1, RULE_importStatement = 2, RULE_namespace = 3, 
		RULE_global = 4, RULE_main = 5, RULE_procedure = 6, RULE_function = 7, 
		RULE_constant = 8, RULE_class = 9, RULE_enum = 10, RULE_test = 11, RULE_procedureSignature = 12, 
		RULE_paramList = 13, RULE_paramDef = 14, RULE_functionSignature = 15, 
		RULE_statementBlock = 16, RULE_singleLineStatement = 17, RULE_multiLineStatement = 18, 
		RULE_var = 19, RULE_set = 20, RULE_call = 21, RULE_throw = 22, RULE_print = 23, 
		RULE_input = 24, RULE_external = 25, RULE_assert = 26, RULE_let = 27, 
		RULE_assignableValue = 28, RULE_methodCall = 29, RULE_argList = 30, RULE_if = 31, 
		RULE_else = 32, RULE_for = 33, RULE_each = 34, RULE_while = 35, RULE_repeat = 36, 
		RULE_try = 37, RULE_switch = 38, RULE_case = 39, RULE_defaultCase = 40, 
		RULE_mutableClass = 41, RULE_abstractClass = 42, RULE_immutableClass = 43, 
		RULE_abstractImmutableClass = 44, RULE_inherits = 45, RULE_constructor = 46, 
		RULE_property = 47, RULE_expression = 48, RULE_term = 49, RULE_bracketedExpression = 50, 
		RULE_lambda = 51, RULE_ifExpression = 52, RULE_newInstance = 53, RULE_unaryOp = 54, 
		RULE_varRef = 55, RULE_defaultType = 56, RULE_index = 57, RULE_range = 58, 
		RULE_withClause = 59, RULE_inlineAsignment = 60, RULE_literal = 61, RULE_literalValue = 62, 
		RULE_enumValue = 63, RULE_literalDataStructure = 64, RULE_literalTuple = 65, 
		RULE_dataStructureDefinition = 66, RULE_listDefinition = 67, RULE_tupleDefinition = 68, 
		RULE_dictionaryDefinition = 69, RULE_kvp = 70, RULE_literalList = 71, 
		RULE_literalDictionary = 72, RULE_literalKvp = 73, RULE_deconstructedTuple = 74, 
		RULE_deconstructedList = 75, RULE_binaryOp = 76, RULE_arithmeticOp = 77, 
		RULE_logicalOp = 78, RULE_conditionalOp = 79, RULE_type = 80, RULE_dataStructureType = 81, 
		RULE_genericSpecifier = 82, RULE_tupleType = 83, RULE_typeList = 84, RULE_funcType = 85;
	private static String[] makeRuleNames() {
		return new String[] {
			"file", "comment", "importStatement", "namespace", "global", "main", 
			"procedure", "function", "constant", "class", "enum", "test", "procedureSignature", 
			"paramList", "paramDef", "functionSignature", "statementBlock", "singleLineStatement", 
			"multiLineStatement", "var", "set", "call", "throw", "print", "input", 
			"external", "assert", "let", "assignableValue", "methodCall", "argList", 
			"if", "else", "for", "each", "while", "repeat", "try", "switch", "case", 
			"defaultCase", "mutableClass", "abstractClass", "immutableClass", "abstractImmutableClass", 
			"inherits", "constructor", "property", "expression", "term", "bracketedExpression", 
			"lambda", "ifExpression", "newInstance", "unaryOp", "varRef", "defaultType", 
			"index", "range", "withClause", "inlineAsignment", "literal", "literalValue", 
			"enumValue", "literalDataStructure", "literalTuple", "dataStructureDefinition", 
			"listDefinition", "tupleDefinition", "dictionaryDefinition", "kvp", "literalList", 
			"literalDictionary", "literalKvp", "deconstructedTuple", "deconstructedList", 
			"binaryOp", "arithmeticOp", "logicalOp", "conditionalOp", "type", "dataStructureType", 
			"genericSpecifier", "tupleType", "typeList", "funcType"
		};
	}
	public static final String[] ruleNames = makeRuleNames();

	private static String[] makeLiteralNames() {
		return new String[] {
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
	}
	private static final String[] _LITERAL_NAMES = makeLiteralNames();
	private static String[] makeSymbolicNames() {
		return new String[] {
			null, "NL", "SINGLE_LINE_COMMENT", "COMMENT_MARKER", "ABSTRACT", "AND", 
			"AS", "BE", "ASSERT", "CALL", "CASE", "CATCH", "CLASS", "CONSTANT", "CONSTRUCTOR", 
			"CURRY", "DEFAULT", "DIV", "EACH", "ELSE", "EXTERNAL", "END", "ENUM", 
			"FOR", "FROM", "FUNCTION", "GLOBAL", "IF", "IMMUTABLE", "IMPORT", "IN", 
			"INTO", "INHERITS", "INPUT", "LAMBDA", "LET", "LIBRARY", "MAIN", "MOD", 
			"NEW", "NOT", "OF", "IS", "OR", "PACKAGE", "PARTIAL", "PRINT", "PRIVATE", 
			"PROCEDURE", "PROPERTY", "REPEAT", "RETURN", "SET", "STEP", "SWITCH", 
			"SYSTEM", "TEST", "THEN", "THIS", "THROW", "TO", "TRY", "VAR", "WHEN", 
			"WHILE", "WITH", "XOR", "BOOL_VALUE", "VALUE_TYPE", "ARRAY", "LIST", 
			"DICTIONARY", "ITERABLE", "EQUALS", "ARROW", "OPEN_BRACE", "CLOSE_BRACE", 
			"OPEN_SQ_BRACKET", "CLOSE_SQ_BRACKET", "OPEN_BRACKET", "CLOSE_BRACKET", 
			"DOUBLE_DOT", "DOT", "COMMA", "COLON", "PLUS", "MINUS", "MULT", "DIVIDE", 
			"POWER", "LT", "GT", "LE", "GE", "IS_NOT", "TYPENAME", "IDENTIFIER", 
			"LITERAL_INTEGER", "LITERAL_FLOAT", "LITERAL_CHAR", "LITERAL_STRING", 
			"WHITESPACES", "TEXT", "NEWLINE", "WS"
		};
	}
	private static final String[] _SYMBOLIC_NAMES = makeSymbolicNames();
	public static final Vocabulary VOCABULARY = new VocabularyImpl(_LITERAL_NAMES, _SYMBOLIC_NAMES);

	/**
	 * @deprecated Use {@link #VOCABULARY} instead.
	 */
	@Deprecated
	public static final String[] tokenNames;
	static {
		tokenNames = new String[_SYMBOLIC_NAMES.length];
		for (int i = 0; i < tokenNames.length; i++) {
			tokenNames[i] = VOCABULARY.getLiteralName(i);
			if (tokenNames[i] == null) {
				tokenNames[i] = VOCABULARY.getSymbolicName(i);
			}

			if (tokenNames[i] == null) {
				tokenNames[i] = "<INVALID>";
			}
		}
	}

	@Override
	@Deprecated
	public String[] getTokenNames() {
		return tokenNames;
	}

	@Override

	public Vocabulary getVocabulary() {
		return VOCABULARY;
	}

	@Override
	public String getGrammarFileName() { return "Elan.g4"; }

	@Override
	public String[] getRuleNames() { return ruleNames; }

	@Override
	public String getSerializedATN() { return _serializedATN; }

	@Override
	public ATN getATN() { return _ATN; }

	public ElanParser(TokenStream input) {
		super(input);
		_interp = new ParserATNSimulator(this,_ATN,_decisionToDFA,_sharedContextCache);
	}

	@SuppressWarnings("CheckReturnValue")
	public static class FileContext extends ParserRuleContext {
		public CommentContext comment() {
			return getRuleContext(CommentContext.class,0);
		}
		public List<ImportStatementContext> importStatement() {
			return getRuleContexts(ImportStatementContext.class);
		}
		public ImportStatementContext importStatement(int i) {
			return getRuleContext(ImportStatementContext.class,i);
		}
		public List<GlobalContext> global() {
			return getRuleContexts(GlobalContext.class);
		}
		public GlobalContext global(int i) {
			return getRuleContext(GlobalContext.class,i);
		}
		public FileContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_file; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).enterFile(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).exitFile(this);
		}
	}

	public final FileContext file() throws RecognitionException {
		FileContext _localctx = new FileContext(_ctx, getState());
		enterRule(_localctx, 0, RULE_file);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(172);
			comment();
			setState(176);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==IMPORT) {
				{
				{
				setState(173);
				importStatement();
				}
				}
				setState(178);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			setState(182);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==NL || _la==COMMENT_MARKER) {
				{
				{
				setState(179);
				global();
				}
				}
				setState(184);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class CommentContext extends ParserRuleContext {
		public TerminalNode COMMENT_MARKER() { return getToken(ElanParser.COMMENT_MARKER, 0); }
		public TerminalNode TEXT() { return getToken(ElanParser.TEXT, 0); }
		public TerminalNode NL() { return getToken(ElanParser.NL, 0); }
		public CommentContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_comment; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).enterComment(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).exitComment(this);
		}
	}

	public final CommentContext comment() throws RecognitionException {
		CommentContext _localctx = new CommentContext(_ctx, getState());
		enterRule(_localctx, 2, RULE_comment);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(185);
			match(COMMENT_MARKER);
			setState(186);
			match(TEXT);
			setState(187);
			match(NL);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class ImportStatementContext extends ParserRuleContext {
		public TerminalNode IMPORT() { return getToken(ElanParser.IMPORT, 0); }
		public NamespaceContext namespace() {
			return getRuleContext(NamespaceContext.class,0);
		}
		public ImportStatementContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_importStatement; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).enterImportStatement(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).exitImportStatement(this);
		}
	}

	public final ImportStatementContext importStatement() throws RecognitionException {
		ImportStatementContext _localctx = new ImportStatementContext(_ctx, getState());
		enterRule(_localctx, 4, RULE_importStatement);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(189);
			match(IMPORT);
			setState(190);
			namespace();
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class NamespaceContext extends ParserRuleContext {
		public List<TerminalNode> TYPENAME() { return getTokens(ElanParser.TYPENAME); }
		public TerminalNode TYPENAME(int i) {
			return getToken(ElanParser.TYPENAME, i);
		}
		public List<TerminalNode> IDENTIFIER() { return getTokens(ElanParser.IDENTIFIER); }
		public TerminalNode IDENTIFIER(int i) {
			return getToken(ElanParser.IDENTIFIER, i);
		}
		public List<TerminalNode> DOT() { return getTokens(ElanParser.DOT); }
		public TerminalNode DOT(int i) {
			return getToken(ElanParser.DOT, i);
		}
		public NamespaceContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_namespace; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).enterNamespace(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).exitNamespace(this);
		}
	}

	public final NamespaceContext namespace() throws RecognitionException {
		NamespaceContext _localctx = new NamespaceContext(_ctx, getState());
		enterRule(_localctx, 6, RULE_namespace);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(192);
			_la = _input.LA(1);
			if ( !(_la==TYPENAME || _la==IDENTIFIER) ) {
			_errHandler.recoverInline(this);
			}
			else {
				if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
				_errHandler.reportMatch(this);
				consume();
			}
			setState(197);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==DOT) {
				{
				{
				setState(193);
				match(DOT);
				setState(194);
				_la = _input.LA(1);
				if ( !(_la==TYPENAME || _la==IDENTIFIER) ) {
				_errHandler.recoverInline(this);
				}
				else {
					if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
					_errHandler.reportMatch(this);
					consume();
				}
				}
				}
				setState(199);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class GlobalContext extends ParserRuleContext {
		public MainContext main() {
			return getRuleContext(MainContext.class,0);
		}
		public ProcedureContext procedure() {
			return getRuleContext(ProcedureContext.class,0);
		}
		public FunctionContext function() {
			return getRuleContext(FunctionContext.class,0);
		}
		public ConstantContext constant() {
			return getRuleContext(ConstantContext.class,0);
		}
		public EnumContext enum_() {
			return getRuleContext(EnumContext.class,0);
		}
		public ClassContext class_() {
			return getRuleContext(ClassContext.class,0);
		}
		public TestContext test() {
			return getRuleContext(TestContext.class,0);
		}
		public CommentContext comment() {
			return getRuleContext(CommentContext.class,0);
		}
		public GlobalContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_global; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).enterGlobal(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).exitGlobal(this);
		}
	}

	public final GlobalContext global() throws RecognitionException {
		GlobalContext _localctx = new GlobalContext(_ctx, getState());
		enterRule(_localctx, 8, RULE_global);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(208);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,3,_ctx) ) {
			case 1:
				{
				setState(200);
				main();
				}
				break;
			case 2:
				{
				setState(201);
				procedure();
				}
				break;
			case 3:
				{
				setState(202);
				function();
				}
				break;
			case 4:
				{
				setState(203);
				constant();
				}
				break;
			case 5:
				{
				setState(204);
				enum_();
				}
				break;
			case 6:
				{
				setState(205);
				class_();
				}
				break;
			case 7:
				{
				setState(206);
				test();
				}
				break;
			case 8:
				{
				setState(207);
				comment();
				}
				break;
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class MainContext extends ParserRuleContext {
		public List<TerminalNode> NL() { return getTokens(ElanParser.NL); }
		public TerminalNode NL(int i) {
			return getToken(ElanParser.NL, i);
		}
		public List<TerminalNode> MAIN() { return getTokens(ElanParser.MAIN); }
		public TerminalNode MAIN(int i) {
			return getToken(ElanParser.MAIN, i);
		}
		public StatementBlockContext statementBlock() {
			return getRuleContext(StatementBlockContext.class,0);
		}
		public TerminalNode END() { return getToken(ElanParser.END, 0); }
		public MainContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_main; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).enterMain(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).exitMain(this);
		}
	}

	public final MainContext main() throws RecognitionException {
		MainContext _localctx = new MainContext(_ctx, getState());
		enterRule(_localctx, 10, RULE_main);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(210);
			match(NL);
			setState(211);
			match(MAIN);
			setState(212);
			statementBlock();
			setState(213);
			match(NL);
			setState(214);
			match(END);
			setState(215);
			match(MAIN);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class ProcedureContext extends ParserRuleContext {
		public List<TerminalNode> NL() { return getTokens(ElanParser.NL); }
		public TerminalNode NL(int i) {
			return getToken(ElanParser.NL, i);
		}
		public List<TerminalNode> PROCEDURE() { return getTokens(ElanParser.PROCEDURE); }
		public TerminalNode PROCEDURE(int i) {
			return getToken(ElanParser.PROCEDURE, i);
		}
		public ProcedureSignatureContext procedureSignature() {
			return getRuleContext(ProcedureSignatureContext.class,0);
		}
		public StatementBlockContext statementBlock() {
			return getRuleContext(StatementBlockContext.class,0);
		}
		public TerminalNode END() { return getToken(ElanParser.END, 0); }
		public ProcedureContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_procedure; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).enterProcedure(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).exitProcedure(this);
		}
	}

	public final ProcedureContext procedure() throws RecognitionException {
		ProcedureContext _localctx = new ProcedureContext(_ctx, getState());
		enterRule(_localctx, 12, RULE_procedure);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(217);
			match(NL);
			setState(218);
			match(PROCEDURE);
			setState(219);
			procedureSignature();
			setState(220);
			statementBlock();
			setState(221);
			match(NL);
			setState(222);
			match(END);
			setState(223);
			match(PROCEDURE);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class FunctionContext extends ParserRuleContext {
		public List<TerminalNode> NL() { return getTokens(ElanParser.NL); }
		public TerminalNode NL(int i) {
			return getToken(ElanParser.NL, i);
		}
		public List<TerminalNode> FUNCTION() { return getTokens(ElanParser.FUNCTION); }
		public TerminalNode FUNCTION(int i) {
			return getToken(ElanParser.FUNCTION, i);
		}
		public FunctionSignatureContext functionSignature() {
			return getRuleContext(FunctionSignatureContext.class,0);
		}
		public StatementBlockContext statementBlock() {
			return getRuleContext(StatementBlockContext.class,0);
		}
		public TerminalNode RETURN() { return getToken(ElanParser.RETURN, 0); }
		public ExpressionContext expression() {
			return getRuleContext(ExpressionContext.class,0);
		}
		public TerminalNode END() { return getToken(ElanParser.END, 0); }
		public FunctionContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_function; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).enterFunction(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).exitFunction(this);
		}
	}

	public final FunctionContext function() throws RecognitionException {
		FunctionContext _localctx = new FunctionContext(_ctx, getState());
		enterRule(_localctx, 14, RULE_function);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(225);
			match(NL);
			setState(226);
			match(FUNCTION);
			setState(227);
			functionSignature();
			setState(228);
			statementBlock();
			setState(229);
			match(NL);
			setState(230);
			match(RETURN);
			setState(231);
			expression();
			setState(232);
			match(NL);
			setState(233);
			match(END);
			setState(234);
			match(FUNCTION);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class ConstantContext extends ParserRuleContext {
		public TerminalNode NL() { return getToken(ElanParser.NL, 0); }
		public TerminalNode CONSTANT() { return getToken(ElanParser.CONSTANT, 0); }
		public TerminalNode IDENTIFIER() { return getToken(ElanParser.IDENTIFIER, 0); }
		public TerminalNode SET() { return getToken(ElanParser.SET, 0); }
		public TerminalNode TO() { return getToken(ElanParser.TO, 0); }
		public LiteralContext literal() {
			return getRuleContext(LiteralContext.class,0);
		}
		public ConstantContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_constant; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).enterConstant(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).exitConstant(this);
		}
	}

	public final ConstantContext constant() throws RecognitionException {
		ConstantContext _localctx = new ConstantContext(_ctx, getState());
		enterRule(_localctx, 16, RULE_constant);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(236);
			match(NL);
			setState(237);
			match(CONSTANT);
			setState(238);
			match(IDENTIFIER);
			setState(239);
			match(SET);
			setState(240);
			match(TO);
			setState(241);
			literal();
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class ClassContext extends ParserRuleContext {
		public MutableClassContext mutableClass() {
			return getRuleContext(MutableClassContext.class,0);
		}
		public AbstractClassContext abstractClass() {
			return getRuleContext(AbstractClassContext.class,0);
		}
		public ImmutableClassContext immutableClass() {
			return getRuleContext(ImmutableClassContext.class,0);
		}
		public AbstractImmutableClassContext abstractImmutableClass() {
			return getRuleContext(AbstractImmutableClassContext.class,0);
		}
		public ClassContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_class; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).enterClass(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).exitClass(this);
		}
	}

	public final ClassContext class_() throws RecognitionException {
		ClassContext _localctx = new ClassContext(_ctx, getState());
		enterRule(_localctx, 18, RULE_class);
		try {
			setState(247);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,4,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(243);
				mutableClass();
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(244);
				abstractClass();
				}
				break;
			case 3:
				enterOuterAlt(_localctx, 3);
				{
				setState(245);
				immutableClass();
				}
				break;
			case 4:
				enterOuterAlt(_localctx, 4);
				{
				setState(246);
				abstractImmutableClass();
				}
				break;
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class EnumContext extends ParserRuleContext {
		public List<TerminalNode> NL() { return getTokens(ElanParser.NL); }
		public TerminalNode NL(int i) {
			return getToken(ElanParser.NL, i);
		}
		public List<TerminalNode> ENUM() { return getTokens(ElanParser.ENUM); }
		public TerminalNode ENUM(int i) {
			return getToken(ElanParser.ENUM, i);
		}
		public TerminalNode TYPENAME() { return getToken(ElanParser.TYPENAME, 0); }
		public List<TerminalNode> IDENTIFIER() { return getTokens(ElanParser.IDENTIFIER); }
		public TerminalNode IDENTIFIER(int i) {
			return getToken(ElanParser.IDENTIFIER, i);
		}
		public TerminalNode END() { return getToken(ElanParser.END, 0); }
		public List<TerminalNode> COMMA() { return getTokens(ElanParser.COMMA); }
		public TerminalNode COMMA(int i) {
			return getToken(ElanParser.COMMA, i);
		}
		public EnumContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_enum; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).enterEnum(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).exitEnum(this);
		}
	}

	public final EnumContext enum_() throws RecognitionException {
		EnumContext _localctx = new EnumContext(_ctx, getState());
		enterRule(_localctx, 20, RULE_enum);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(249);
			match(NL);
			setState(250);
			match(ENUM);
			setState(251);
			match(TYPENAME);
			setState(252);
			match(NL);
			setState(253);
			match(IDENTIFIER);
			setState(258);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==COMMA) {
				{
				{
				setState(254);
				match(COMMA);
				setState(255);
				match(IDENTIFIER);
				}
				}
				setState(260);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			setState(261);
			match(NL);
			setState(262);
			match(END);
			setState(263);
			match(ENUM);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class TestContext extends ParserRuleContext {
		public List<TerminalNode> NL() { return getTokens(ElanParser.NL); }
		public TerminalNode NL(int i) {
			return getToken(ElanParser.NL, i);
		}
		public List<TerminalNode> TEST() { return getTokens(ElanParser.TEST); }
		public TerminalNode TEST(int i) {
			return getToken(ElanParser.TEST, i);
		}
		public TerminalNode IDENTIFIER() { return getToken(ElanParser.IDENTIFIER, 0); }
		public StatementBlockContext statementBlock() {
			return getRuleContext(StatementBlockContext.class,0);
		}
		public TerminalNode END() { return getToken(ElanParser.END, 0); }
		public TestContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_test; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).enterTest(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).exitTest(this);
		}
	}

	public final TestContext test() throws RecognitionException {
		TestContext _localctx = new TestContext(_ctx, getState());
		enterRule(_localctx, 22, RULE_test);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(265);
			match(NL);
			setState(266);
			match(TEST);
			setState(267);
			match(IDENTIFIER);
			setState(268);
			statementBlock();
			setState(269);
			match(NL);
			setState(270);
			match(END);
			setState(271);
			match(TEST);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class ProcedureSignatureContext extends ParserRuleContext {
		public TerminalNode IDENTIFIER() { return getToken(ElanParser.IDENTIFIER, 0); }
		public TerminalNode OPEN_BRACKET() { return getToken(ElanParser.OPEN_BRACKET, 0); }
		public TerminalNode CLOSE_BRACKET() { return getToken(ElanParser.CLOSE_BRACKET, 0); }
		public ParamListContext paramList() {
			return getRuleContext(ParamListContext.class,0);
		}
		public ProcedureSignatureContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_procedureSignature; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).enterProcedureSignature(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).exitProcedureSignature(this);
		}
	}

	public final ProcedureSignatureContext procedureSignature() throws RecognitionException {
		ProcedureSignatureContext _localctx = new ProcedureSignatureContext(_ctx, getState());
		enterRule(_localctx, 24, RULE_procedureSignature);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(273);
			match(IDENTIFIER);
			setState(274);
			match(OPEN_BRACKET);
			setState(276);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==IDENTIFIER) {
				{
				setState(275);
				paramList();
				}
			}

			setState(278);
			match(CLOSE_BRACKET);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class ParamListContext extends ParserRuleContext {
		public List<ParamDefContext> paramDef() {
			return getRuleContexts(ParamDefContext.class);
		}
		public ParamDefContext paramDef(int i) {
			return getRuleContext(ParamDefContext.class,i);
		}
		public List<TerminalNode> COMMA() { return getTokens(ElanParser.COMMA); }
		public TerminalNode COMMA(int i) {
			return getToken(ElanParser.COMMA, i);
		}
		public ParamListContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_paramList; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).enterParamList(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).exitParamList(this);
		}
	}

	public final ParamListContext paramList() throws RecognitionException {
		ParamListContext _localctx = new ParamListContext(_ctx, getState());
		enterRule(_localctx, 26, RULE_paramList);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(280);
			paramDef();
			setState(285);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==COMMA) {
				{
				{
				setState(281);
				match(COMMA);
				setState(282);
				paramDef();
				}
				}
				setState(287);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class ParamDefContext extends ParserRuleContext {
		public TerminalNode IDENTIFIER() { return getToken(ElanParser.IDENTIFIER, 0); }
		public TerminalNode AS() { return getToken(ElanParser.AS, 0); }
		public TypeContext type() {
			return getRuleContext(TypeContext.class,0);
		}
		public ParamDefContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_paramDef; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).enterParamDef(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).exitParamDef(this);
		}
	}

	public final ParamDefContext paramDef() throws RecognitionException {
		ParamDefContext _localctx = new ParamDefContext(_ctx, getState());
		enterRule(_localctx, 28, RULE_paramDef);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(288);
			match(IDENTIFIER);
			setState(289);
			match(AS);
			setState(290);
			type();
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class FunctionSignatureContext extends ParserRuleContext {
		public TerminalNode IDENTIFIER() { return getToken(ElanParser.IDENTIFIER, 0); }
		public TerminalNode OPEN_BRACKET() { return getToken(ElanParser.OPEN_BRACKET, 0); }
		public TerminalNode CLOSE_BRACKET() { return getToken(ElanParser.CLOSE_BRACKET, 0); }
		public TerminalNode RETURN() { return getToken(ElanParser.RETURN, 0); }
		public TypeContext type() {
			return getRuleContext(TypeContext.class,0);
		}
		public ParamListContext paramList() {
			return getRuleContext(ParamListContext.class,0);
		}
		public FunctionSignatureContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_functionSignature; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).enterFunctionSignature(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).exitFunctionSignature(this);
		}
	}

	public final FunctionSignatureContext functionSignature() throws RecognitionException {
		FunctionSignatureContext _localctx = new FunctionSignatureContext(_ctx, getState());
		enterRule(_localctx, 30, RULE_functionSignature);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(292);
			match(IDENTIFIER);
			setState(293);
			match(OPEN_BRACKET);
			setState(295);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==IDENTIFIER) {
				{
				setState(294);
				paramList();
				}
			}

			setState(297);
			match(CLOSE_BRACKET);
			setState(298);
			match(RETURN);
			setState(299);
			type();
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class StatementBlockContext extends ParserRuleContext {
		public List<SingleLineStatementContext> singleLineStatement() {
			return getRuleContexts(SingleLineStatementContext.class);
		}
		public SingleLineStatementContext singleLineStatement(int i) {
			return getRuleContext(SingleLineStatementContext.class,i);
		}
		public List<MultiLineStatementContext> multiLineStatement() {
			return getRuleContexts(MultiLineStatementContext.class);
		}
		public MultiLineStatementContext multiLineStatement(int i) {
			return getRuleContext(MultiLineStatementContext.class,i);
		}
		public StatementBlockContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_statementBlock; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).enterStatementBlock(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).exitStatementBlock(this);
		}
	}

	public final StatementBlockContext statementBlock() throws RecognitionException {
		StatementBlockContext _localctx = new StatementBlockContext(_ctx, getState());
		enterRule(_localctx, 32, RULE_statementBlock);
		try {
			int _alt;
			enterOuterAlt(_localctx, 1);
			{
			setState(305);
			_errHandler.sync(this);
			_alt = getInterpreter().adaptivePredict(_input,10,_ctx);
			while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER ) {
				if ( _alt==1 ) {
					{
					setState(303);
					_errHandler.sync(this);
					switch ( getInterpreter().adaptivePredict(_input,9,_ctx) ) {
					case 1:
						{
						setState(301);
						singleLineStatement();
						}
						break;
					case 2:
						{
						setState(302);
						multiLineStatement();
						}
						break;
					}
					} 
				}
				setState(307);
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,10,_ctx);
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class SingleLineStatementContext extends ParserRuleContext {
		public VarContext var() {
			return getRuleContext(VarContext.class,0);
		}
		public LetContext let() {
			return getRuleContext(LetContext.class,0);
		}
		public SetContext set() {
			return getRuleContext(SetContext.class,0);
		}
		public CallContext call() {
			return getRuleContext(CallContext.class,0);
		}
		public ThrowContext throw_() {
			return getRuleContext(ThrowContext.class,0);
		}
		public PrintContext print() {
			return getRuleContext(PrintContext.class,0);
		}
		public InputContext input() {
			return getRuleContext(InputContext.class,0);
		}
		public ExternalContext external() {
			return getRuleContext(ExternalContext.class,0);
		}
		public AssertContext assert_() {
			return getRuleContext(AssertContext.class,0);
		}
		public SingleLineStatementContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_singleLineStatement; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).enterSingleLineStatement(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).exitSingleLineStatement(this);
		}
	}

	public final SingleLineStatementContext singleLineStatement() throws RecognitionException {
		SingleLineStatementContext _localctx = new SingleLineStatementContext(_ctx, getState());
		enterRule(_localctx, 34, RULE_singleLineStatement);
		try {
			setState(317);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,11,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(308);
				var();
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(309);
				let();
				}
				break;
			case 3:
				enterOuterAlt(_localctx, 3);
				{
				setState(310);
				set();
				}
				break;
			case 4:
				enterOuterAlt(_localctx, 4);
				{
				setState(311);
				call();
				}
				break;
			case 5:
				enterOuterAlt(_localctx, 5);
				{
				setState(312);
				throw_();
				}
				break;
			case 6:
				enterOuterAlt(_localctx, 6);
				{
				setState(313);
				print();
				}
				break;
			case 7:
				enterOuterAlt(_localctx, 7);
				{
				setState(314);
				input();
				}
				break;
			case 8:
				enterOuterAlt(_localctx, 8);
				{
				setState(315);
				external();
				}
				break;
			case 9:
				enterOuterAlt(_localctx, 9);
				{
				setState(316);
				assert_();
				}
				break;
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class MultiLineStatementContext extends ParserRuleContext {
		public IfContext if_() {
			return getRuleContext(IfContext.class,0);
		}
		public ForContext for_() {
			return getRuleContext(ForContext.class,0);
		}
		public EachContext each() {
			return getRuleContext(EachContext.class,0);
		}
		public WhileContext while_() {
			return getRuleContext(WhileContext.class,0);
		}
		public RepeatContext repeat() {
			return getRuleContext(RepeatContext.class,0);
		}
		public TryContext try_() {
			return getRuleContext(TryContext.class,0);
		}
		public SwitchContext switch_() {
			return getRuleContext(SwitchContext.class,0);
		}
		public MultiLineStatementContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_multiLineStatement; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).enterMultiLineStatement(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).exitMultiLineStatement(this);
		}
	}

	public final MultiLineStatementContext multiLineStatement() throws RecognitionException {
		MultiLineStatementContext _localctx = new MultiLineStatementContext(_ctx, getState());
		enterRule(_localctx, 36, RULE_multiLineStatement);
		try {
			setState(326);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,12,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(319);
				if_();
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(320);
				for_();
				}
				break;
			case 3:
				enterOuterAlt(_localctx, 3);
				{
				setState(321);
				each();
				}
				break;
			case 4:
				enterOuterAlt(_localctx, 4);
				{
				setState(322);
				while_();
				}
				break;
			case 5:
				enterOuterAlt(_localctx, 5);
				{
				setState(323);
				repeat();
				}
				break;
			case 6:
				enterOuterAlt(_localctx, 6);
				{
				setState(324);
				try_();
				}
				break;
			case 7:
				enterOuterAlt(_localctx, 7);
				{
				setState(325);
				switch_();
				}
				break;
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class VarContext extends ParserRuleContext {
		public TerminalNode NL() { return getToken(ElanParser.NL, 0); }
		public TerminalNode VAR() { return getToken(ElanParser.VAR, 0); }
		public AssignableValueContext assignableValue() {
			return getRuleContext(AssignableValueContext.class,0);
		}
		public TerminalNode SET() { return getToken(ElanParser.SET, 0); }
		public TerminalNode TO() { return getToken(ElanParser.TO, 0); }
		public ExpressionContext expression() {
			return getRuleContext(ExpressionContext.class,0);
		}
		public VarContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_var; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).enterVar(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).exitVar(this);
		}
	}

	public final VarContext var() throws RecognitionException {
		VarContext _localctx = new VarContext(_ctx, getState());
		enterRule(_localctx, 38, RULE_var);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(328);
			match(NL);
			setState(329);
			match(VAR);
			setState(330);
			assignableValue();
			setState(331);
			match(SET);
			setState(332);
			match(TO);
			setState(333);
			expression();
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class SetContext extends ParserRuleContext {
		public TerminalNode NL() { return getToken(ElanParser.NL, 0); }
		public TerminalNode SET() { return getToken(ElanParser.SET, 0); }
		public AssignableValueContext assignableValue() {
			return getRuleContext(AssignableValueContext.class,0);
		}
		public TerminalNode TO() { return getToken(ElanParser.TO, 0); }
		public ExpressionContext expression() {
			return getRuleContext(ExpressionContext.class,0);
		}
		public SetContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_set; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).enterSet(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).exitSet(this);
		}
	}

	public final SetContext set() throws RecognitionException {
		SetContext _localctx = new SetContext(_ctx, getState());
		enterRule(_localctx, 40, RULE_set);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(335);
			match(NL);
			setState(336);
			match(SET);
			setState(337);
			assignableValue();
			setState(338);
			match(TO);
			setState(339);
			expression();
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class CallContext extends ParserRuleContext {
		public TerminalNode NL() { return getToken(ElanParser.NL, 0); }
		public TerminalNode CALL() { return getToken(ElanParser.CALL, 0); }
		public MethodCallContext methodCall() {
			return getRuleContext(MethodCallContext.class,0);
		}
		public AssignableValueContext assignableValue() {
			return getRuleContext(AssignableValueContext.class,0);
		}
		public TerminalNode DOT() { return getToken(ElanParser.DOT, 0); }
		public CallContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_call; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).enterCall(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).exitCall(this);
		}
	}

	public final CallContext call() throws RecognitionException {
		CallContext _localctx = new CallContext(_ctx, getState());
		enterRule(_localctx, 42, RULE_call);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(341);
			match(NL);
			setState(342);
			match(CALL);
			setState(348);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,13,_ctx) ) {
			case 1:
				{
				setState(343);
				methodCall();
				}
				break;
			case 2:
				{
				{
				setState(344);
				assignableValue();
				setState(345);
				match(DOT);
				setState(346);
				methodCall();
				}
				}
				break;
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class ThrowContext extends ParserRuleContext {
		public TerminalNode NL() { return getToken(ElanParser.NL, 0); }
		public TerminalNode THROW() { return getToken(ElanParser.THROW, 0); }
		public TerminalNode LITERAL_STRING() { return getToken(ElanParser.LITERAL_STRING, 0); }
		public TerminalNode IDENTIFIER() { return getToken(ElanParser.IDENTIFIER, 0); }
		public ThrowContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_throw; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).enterThrow(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).exitThrow(this);
		}
	}

	public final ThrowContext throw_() throws RecognitionException {
		ThrowContext _localctx = new ThrowContext(_ctx, getState());
		enterRule(_localctx, 44, RULE_throw);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(350);
			match(NL);
			setState(351);
			match(THROW);
			setState(352);
			_la = _input.LA(1);
			if ( !(_la==IDENTIFIER || _la==LITERAL_STRING) ) {
			_errHandler.recoverInline(this);
			}
			else {
				if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
				_errHandler.reportMatch(this);
				consume();
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class PrintContext extends ParserRuleContext {
		public TerminalNode NL() { return getToken(ElanParser.NL, 0); }
		public TerminalNode PRINT() { return getToken(ElanParser.PRINT, 0); }
		public ExpressionContext expression() {
			return getRuleContext(ExpressionContext.class,0);
		}
		public PrintContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_print; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).enterPrint(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).exitPrint(this);
		}
	}

	public final PrintContext print() throws RecognitionException {
		PrintContext _localctx = new PrintContext(_ctx, getState());
		enterRule(_localctx, 46, RULE_print);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(354);
			match(NL);
			setState(355);
			match(PRINT);
			setState(357);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if ((((_la) & ~0x3f) == 0 && ((1L << _la) & 288795061473312768L) != 0) || ((((_la - 67)) & ~0x3f) == 0 && ((1L << (_la - 67)) & 16911963137L) != 0)) {
				{
				setState(356);
				expression();
				}
			}

			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class InputContext extends ParserRuleContext {
		public TerminalNode INPUT() { return getToken(ElanParser.INPUT, 0); }
		public AssignableValueContext assignableValue() {
			return getRuleContext(AssignableValueContext.class,0);
		}
		public InputContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_input; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).enterInput(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).exitInput(this);
		}
	}

	public final InputContext input() throws RecognitionException {
		InputContext _localctx = new InputContext(_ctx, getState());
		enterRule(_localctx, 48, RULE_input);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(359);
			match(INPUT);
			setState(360);
			assignableValue();
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class ExternalContext extends ParserRuleContext {
		public TerminalNode NL() { return getToken(ElanParser.NL, 0); }
		public TerminalNode EXTERNAL() { return getToken(ElanParser.EXTERNAL, 0); }
		public MethodCallContext methodCall() {
			return getRuleContext(MethodCallContext.class,0);
		}
		public TerminalNode INTO() { return getToken(ElanParser.INTO, 0); }
		public List<AssignableValueContext> assignableValue() {
			return getRuleContexts(AssignableValueContext.class);
		}
		public AssignableValueContext assignableValue(int i) {
			return getRuleContext(AssignableValueContext.class,i);
		}
		public TerminalNode DOT() { return getToken(ElanParser.DOT, 0); }
		public ExternalContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_external; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).enterExternal(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).exitExternal(this);
		}
	}

	public final ExternalContext external() throws RecognitionException {
		ExternalContext _localctx = new ExternalContext(_ctx, getState());
		enterRule(_localctx, 50, RULE_external);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(362);
			match(NL);
			setState(363);
			match(EXTERNAL);
			setState(369);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,15,_ctx) ) {
			case 1:
				{
				setState(364);
				methodCall();
				}
				break;
			case 2:
				{
				{
				setState(365);
				assignableValue();
				setState(366);
				match(DOT);
				setState(367);
				methodCall();
				}
				}
				break;
			}
			setState(373);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==INTO) {
				{
				setState(371);
				match(INTO);
				setState(372);
				assignableValue();
				}
			}

			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class AssertContext extends ParserRuleContext {
		public TerminalNode NL() { return getToken(ElanParser.NL, 0); }
		public TerminalNode ASSERT() { return getToken(ElanParser.ASSERT, 0); }
		public ExpressionContext expression() {
			return getRuleContext(ExpressionContext.class,0);
		}
		public TerminalNode IS() { return getToken(ElanParser.IS, 0); }
		public LiteralContext literal() {
			return getRuleContext(LiteralContext.class,0);
		}
		public AssertContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_assert; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).enterAssert(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).exitAssert(this);
		}
	}

	public final AssertContext assert_() throws RecognitionException {
		AssertContext _localctx = new AssertContext(_ctx, getState());
		enterRule(_localctx, 52, RULE_assert);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(375);
			match(NL);
			setState(376);
			match(ASSERT);
			setState(377);
			expression();
			setState(378);
			match(IS);
			setState(379);
			literal();
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class LetContext extends ParserRuleContext {
		public TerminalNode NL() { return getToken(ElanParser.NL, 0); }
		public TerminalNode LET() { return getToken(ElanParser.LET, 0); }
		public TerminalNode IDENTIFIER() { return getToken(ElanParser.IDENTIFIER, 0); }
		public TerminalNode BE() { return getToken(ElanParser.BE, 0); }
		public ExpressionContext expression() {
			return getRuleContext(ExpressionContext.class,0);
		}
		public LetContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_let; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).enterLet(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).exitLet(this);
		}
	}

	public final LetContext let() throws RecognitionException {
		LetContext _localctx = new LetContext(_ctx, getState());
		enterRule(_localctx, 54, RULE_let);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(381);
			match(NL);
			setState(382);
			match(LET);
			setState(383);
			match(IDENTIFIER);
			setState(384);
			match(BE);
			setState(385);
			expression();
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class AssignableValueContext extends ParserRuleContext {
		public TerminalNode IDENTIFIER() { return getToken(ElanParser.IDENTIFIER, 0); }
		public TerminalNode PROPERTY() { return getToken(ElanParser.PROPERTY, 0); }
		public TerminalNode DOT() { return getToken(ElanParser.DOT, 0); }
		public IndexContext index() {
			return getRuleContext(IndexContext.class,0);
		}
		public DeconstructedTupleContext deconstructedTuple() {
			return getRuleContext(DeconstructedTupleContext.class,0);
		}
		public DeconstructedListContext deconstructedList() {
			return getRuleContext(DeconstructedListContext.class,0);
		}
		public AssignableValueContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_assignableValue; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).enterAssignableValue(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).exitAssignableValue(this);
		}
	}

	public final AssignableValueContext assignableValue() throws RecognitionException {
		AssignableValueContext _localctx = new AssignableValueContext(_ctx, getState());
		enterRule(_localctx, 56, RULE_assignableValue);
		int _la;
		try {
			setState(397);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case PROPERTY:
			case IDENTIFIER:
				enterOuterAlt(_localctx, 1);
				{
				setState(389);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==PROPERTY) {
					{
					setState(387);
					match(PROPERTY);
					setState(388);
					match(DOT);
					}
				}

				setState(391);
				match(IDENTIFIER);
				setState(393);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==OPEN_SQ_BRACKET) {
					{
					setState(392);
					index();
					}
				}

				}
				break;
			case OPEN_BRACKET:
				enterOuterAlt(_localctx, 2);
				{
				setState(395);
				deconstructedTuple();
				}
				break;
			case OPEN_SQ_BRACKET:
				enterOuterAlt(_localctx, 3);
				{
				setState(396);
				deconstructedList();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class MethodCallContext extends ParserRuleContext {
		public List<TerminalNode> IDENTIFIER() { return getTokens(ElanParser.IDENTIFIER); }
		public TerminalNode IDENTIFIER(int i) {
			return getToken(ElanParser.IDENTIFIER, i);
		}
		public TerminalNode OPEN_BRACKET() { return getToken(ElanParser.OPEN_BRACKET, 0); }
		public TerminalNode CLOSE_BRACKET() { return getToken(ElanParser.CLOSE_BRACKET, 0); }
		public TerminalNode PROPERTY() { return getToken(ElanParser.PROPERTY, 0); }
		public TerminalNode GLOBAL() { return getToken(ElanParser.GLOBAL, 0); }
		public TerminalNode LIBRARY() { return getToken(ElanParser.LIBRARY, 0); }
		public TerminalNode DOT() { return getToken(ElanParser.DOT, 0); }
		public ArgListContext argList() {
			return getRuleContext(ArgListContext.class,0);
		}
		public MethodCallContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_methodCall; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).enterMethodCall(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).exitMethodCall(this);
		}
	}

	public final MethodCallContext methodCall() throws RecognitionException {
		MethodCallContext _localctx = new MethodCallContext(_ctx, getState());
		enterRule(_localctx, 58, RULE_methodCall);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(404);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,20,_ctx) ) {
			case 1:
				{
				setState(399);
				match(PROPERTY);
				}
				break;
			case 2:
				{
				setState(400);
				match(GLOBAL);
				}
				break;
			case 3:
				{
				setState(401);
				match(LIBRARY);
				}
				break;
			case 4:
				{
				setState(402);
				match(IDENTIFIER);
				setState(403);
				match(DOT);
				}
				break;
			}
			setState(406);
			match(IDENTIFIER);
			setState(407);
			match(OPEN_BRACKET);
			setState(409);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if ((((_la) & ~0x3f) == 0 && ((1L << _la) & 288795061473312768L) != 0) || ((((_la - 67)) & ~0x3f) == 0 && ((1L << (_la - 67)) & 16911963137L) != 0)) {
				{
				setState(408);
				argList();
				}
			}

			setState(411);
			match(CLOSE_BRACKET);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class ArgListContext extends ParserRuleContext {
		public List<ExpressionContext> expression() {
			return getRuleContexts(ExpressionContext.class);
		}
		public ExpressionContext expression(int i) {
			return getRuleContext(ExpressionContext.class,i);
		}
		public List<TerminalNode> COMMA() { return getTokens(ElanParser.COMMA); }
		public TerminalNode COMMA(int i) {
			return getToken(ElanParser.COMMA, i);
		}
		public ArgListContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_argList; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).enterArgList(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).exitArgList(this);
		}
	}

	public final ArgListContext argList() throws RecognitionException {
		ArgListContext _localctx = new ArgListContext(_ctx, getState());
		enterRule(_localctx, 60, RULE_argList);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(413);
			expression();
			setState(418);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==COMMA) {
				{
				{
				setState(414);
				match(COMMA);
				setState(415);
				expression();
				}
				}
				setState(420);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class IfContext extends ParserRuleContext {
		public List<TerminalNode> NL() { return getTokens(ElanParser.NL); }
		public TerminalNode NL(int i) {
			return getToken(ElanParser.NL, i);
		}
		public List<TerminalNode> IF() { return getTokens(ElanParser.IF); }
		public TerminalNode IF(int i) {
			return getToken(ElanParser.IF, i);
		}
		public ExpressionContext expression() {
			return getRuleContext(ExpressionContext.class,0);
		}
		public StatementBlockContext statementBlock() {
			return getRuleContext(StatementBlockContext.class,0);
		}
		public TerminalNode END() { return getToken(ElanParser.END, 0); }
		public List<ElseContext> else_() {
			return getRuleContexts(ElseContext.class);
		}
		public ElseContext else_(int i) {
			return getRuleContext(ElseContext.class,i);
		}
		public IfContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_if; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).enterIf(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).exitIf(this);
		}
	}

	public final IfContext if_() throws RecognitionException {
		IfContext _localctx = new IfContext(_ctx, getState());
		enterRule(_localctx, 62, RULE_if);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(421);
			match(NL);
			setState(422);
			match(IF);
			setState(423);
			expression();
			setState(424);
			statementBlock();
			setState(428);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==ELSE) {
				{
				{
				setState(425);
				else_();
				}
				}
				setState(430);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			setState(431);
			match(NL);
			setState(432);
			match(END);
			setState(433);
			match(IF);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class ElseContext extends ParserRuleContext {
		public TerminalNode ELSE() { return getToken(ElanParser.ELSE, 0); }
		public StatementBlockContext statementBlock() {
			return getRuleContext(StatementBlockContext.class,0);
		}
		public TerminalNode IF() { return getToken(ElanParser.IF, 0); }
		public ExpressionContext expression() {
			return getRuleContext(ExpressionContext.class,0);
		}
		public ElseContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_else; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).enterElse(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).exitElse(this);
		}
	}

	public final ElseContext else_() throws RecognitionException {
		ElseContext _localctx = new ElseContext(_ctx, getState());
		enterRule(_localctx, 64, RULE_else);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(435);
			match(ELSE);
			setState(438);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==IF) {
				{
				setState(436);
				match(IF);
				setState(437);
				expression();
				}
			}

			setState(440);
			statementBlock();
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class ForContext extends ParserRuleContext {
		public List<TerminalNode> NL() { return getTokens(ElanParser.NL); }
		public TerminalNode NL(int i) {
			return getToken(ElanParser.NL, i);
		}
		public List<TerminalNode> FOR() { return getTokens(ElanParser.FOR); }
		public TerminalNode FOR(int i) {
			return getToken(ElanParser.FOR, i);
		}
		public TerminalNode IDENTIFIER() { return getToken(ElanParser.IDENTIFIER, 0); }
		public TerminalNode FROM() { return getToken(ElanParser.FROM, 0); }
		public List<ExpressionContext> expression() {
			return getRuleContexts(ExpressionContext.class);
		}
		public ExpressionContext expression(int i) {
			return getRuleContext(ExpressionContext.class,i);
		}
		public TerminalNode TO() { return getToken(ElanParser.TO, 0); }
		public TerminalNode STEP() { return getToken(ElanParser.STEP, 0); }
		public TerminalNode LITERAL_INTEGER() { return getToken(ElanParser.LITERAL_INTEGER, 0); }
		public StatementBlockContext statementBlock() {
			return getRuleContext(StatementBlockContext.class,0);
		}
		public TerminalNode END() { return getToken(ElanParser.END, 0); }
		public TerminalNode MINUS() { return getToken(ElanParser.MINUS, 0); }
		public ForContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_for; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).enterFor(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).exitFor(this);
		}
	}

	public final ForContext for_() throws RecognitionException {
		ForContext _localctx = new ForContext(_ctx, getState());
		enterRule(_localctx, 66, RULE_for);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(442);
			match(NL);
			setState(443);
			match(FOR);
			setState(444);
			match(IDENTIFIER);
			setState(445);
			match(FROM);
			setState(446);
			expression();
			setState(447);
			match(TO);
			setState(448);
			expression();
			setState(449);
			match(STEP);
			setState(451);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==MINUS) {
				{
				setState(450);
				match(MINUS);
				}
			}

			setState(453);
			match(LITERAL_INTEGER);
			setState(454);
			statementBlock();
			setState(455);
			match(NL);
			setState(456);
			match(END);
			setState(457);
			match(FOR);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class EachContext extends ParserRuleContext {
		public List<TerminalNode> NL() { return getTokens(ElanParser.NL); }
		public TerminalNode NL(int i) {
			return getToken(ElanParser.NL, i);
		}
		public List<TerminalNode> EACH() { return getTokens(ElanParser.EACH); }
		public TerminalNode EACH(int i) {
			return getToken(ElanParser.EACH, i);
		}
		public TerminalNode IDENTIFIER() { return getToken(ElanParser.IDENTIFIER, 0); }
		public TerminalNode IN() { return getToken(ElanParser.IN, 0); }
		public ExpressionContext expression() {
			return getRuleContext(ExpressionContext.class,0);
		}
		public StatementBlockContext statementBlock() {
			return getRuleContext(StatementBlockContext.class,0);
		}
		public TerminalNode END() { return getToken(ElanParser.END, 0); }
		public EachContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_each; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).enterEach(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).exitEach(this);
		}
	}

	public final EachContext each() throws RecognitionException {
		EachContext _localctx = new EachContext(_ctx, getState());
		enterRule(_localctx, 68, RULE_each);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(459);
			match(NL);
			setState(460);
			match(EACH);
			setState(461);
			match(IDENTIFIER);
			setState(462);
			match(IN);
			setState(463);
			expression();
			setState(464);
			statementBlock();
			setState(465);
			match(NL);
			setState(466);
			match(END);
			setState(467);
			match(EACH);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class WhileContext extends ParserRuleContext {
		public List<TerminalNode> NL() { return getTokens(ElanParser.NL); }
		public TerminalNode NL(int i) {
			return getToken(ElanParser.NL, i);
		}
		public List<TerminalNode> WHILE() { return getTokens(ElanParser.WHILE); }
		public TerminalNode WHILE(int i) {
			return getToken(ElanParser.WHILE, i);
		}
		public ExpressionContext expression() {
			return getRuleContext(ExpressionContext.class,0);
		}
		public StatementBlockContext statementBlock() {
			return getRuleContext(StatementBlockContext.class,0);
		}
		public TerminalNode END() { return getToken(ElanParser.END, 0); }
		public WhileContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_while; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).enterWhile(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).exitWhile(this);
		}
	}

	public final WhileContext while_() throws RecognitionException {
		WhileContext _localctx = new WhileContext(_ctx, getState());
		enterRule(_localctx, 70, RULE_while);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(469);
			match(NL);
			setState(470);
			match(WHILE);
			setState(471);
			expression();
			setState(472);
			statementBlock();
			setState(473);
			match(NL);
			setState(474);
			match(END);
			setState(475);
			match(WHILE);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class RepeatContext extends ParserRuleContext {
		public List<TerminalNode> NL() { return getTokens(ElanParser.NL); }
		public TerminalNode NL(int i) {
			return getToken(ElanParser.NL, i);
		}
		public StatementBlockContext statementBlock() {
			return getRuleContext(StatementBlockContext.class,0);
		}
		public TerminalNode END() { return getToken(ElanParser.END, 0); }
		public List<TerminalNode> REPEAT() { return getTokens(ElanParser.REPEAT); }
		public TerminalNode REPEAT(int i) {
			return getToken(ElanParser.REPEAT, i);
		}
		public TerminalNode WHEN() { return getToken(ElanParser.WHEN, 0); }
		public ExpressionContext expression() {
			return getRuleContext(ExpressionContext.class,0);
		}
		public RepeatContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_repeat; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).enterRepeat(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).exitRepeat(this);
		}
	}

	public final RepeatContext repeat() throws RecognitionException {
		RepeatContext _localctx = new RepeatContext(_ctx, getState());
		enterRule(_localctx, 72, RULE_repeat);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(477);
			match(NL);
			{
			setState(478);
			match(REPEAT);
			}
			setState(479);
			statementBlock();
			setState(480);
			match(NL);
			setState(481);
			match(END);
			setState(482);
			match(REPEAT);
			setState(483);
			match(WHEN);
			setState(484);
			expression();
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class TryContext extends ParserRuleContext {
		public List<TerminalNode> NL() { return getTokens(ElanParser.NL); }
		public TerminalNode NL(int i) {
			return getToken(ElanParser.NL, i);
		}
		public List<TerminalNode> TRY() { return getTokens(ElanParser.TRY); }
		public TerminalNode TRY(int i) {
			return getToken(ElanParser.TRY, i);
		}
		public StatementBlockContext statementBlock() {
			return getRuleContext(StatementBlockContext.class,0);
		}
		public TerminalNode END() { return getToken(ElanParser.END, 0); }
		public TryContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_try; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).enterTry(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).exitTry(this);
		}
	}

	public final TryContext try_() throws RecognitionException {
		TryContext _localctx = new TryContext(_ctx, getState());
		enterRule(_localctx, 74, RULE_try);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(486);
			match(NL);
			setState(487);
			match(TRY);
			setState(488);
			statementBlock();
			setState(489);
			match(NL);
			setState(490);
			match(END);
			setState(491);
			match(TRY);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class SwitchContext extends ParserRuleContext {
		public List<TerminalNode> NL() { return getTokens(ElanParser.NL); }
		public TerminalNode NL(int i) {
			return getToken(ElanParser.NL, i);
		}
		public List<TerminalNode> SWITCH() { return getTokens(ElanParser.SWITCH); }
		public TerminalNode SWITCH(int i) {
			return getToken(ElanParser.SWITCH, i);
		}
		public ExpressionContext expression() {
			return getRuleContext(ExpressionContext.class,0);
		}
		public DefaultCaseContext defaultCase() {
			return getRuleContext(DefaultCaseContext.class,0);
		}
		public TerminalNode END() { return getToken(ElanParser.END, 0); }
		public List<CaseContext> case_() {
			return getRuleContexts(CaseContext.class);
		}
		public CaseContext case_(int i) {
			return getRuleContext(CaseContext.class,i);
		}
		public SwitchContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_switch; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).enterSwitch(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).exitSwitch(this);
		}
	}

	public final SwitchContext switch_() throws RecognitionException {
		SwitchContext _localctx = new SwitchContext(_ctx, getState());
		enterRule(_localctx, 76, RULE_switch);
		try {
			int _alt;
			enterOuterAlt(_localctx, 1);
			{
			setState(493);
			match(NL);
			setState(494);
			match(SWITCH);
			setState(495);
			expression();
			setState(497); 
			_errHandler.sync(this);
			_alt = 1;
			do {
				switch (_alt) {
				case 1:
					{
					{
					setState(496);
					case_();
					}
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				setState(499); 
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,26,_ctx);
			} while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER );
			setState(501);
			defaultCase();
			setState(502);
			match(NL);
			setState(503);
			match(END);
			setState(504);
			match(SWITCH);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class CaseContext extends ParserRuleContext {
		public TerminalNode NL() { return getToken(ElanParser.NL, 0); }
		public TerminalNode CASE() { return getToken(ElanParser.CASE, 0); }
		public LiteralValueContext literalValue() {
			return getRuleContext(LiteralValueContext.class,0);
		}
		public StatementBlockContext statementBlock() {
			return getRuleContext(StatementBlockContext.class,0);
		}
		public CaseContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_case; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).enterCase(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).exitCase(this);
		}
	}

	public final CaseContext case_() throws RecognitionException {
		CaseContext _localctx = new CaseContext(_ctx, getState());
		enterRule(_localctx, 78, RULE_case);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(506);
			match(NL);
			setState(507);
			match(CASE);
			setState(508);
			literalValue();
			setState(509);
			statementBlock();
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class DefaultCaseContext extends ParserRuleContext {
		public TerminalNode NL() { return getToken(ElanParser.NL, 0); }
		public TerminalNode DEFAULT() { return getToken(ElanParser.DEFAULT, 0); }
		public StatementBlockContext statementBlock() {
			return getRuleContext(StatementBlockContext.class,0);
		}
		public DefaultCaseContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_defaultCase; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).enterDefaultCase(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).exitDefaultCase(this);
		}
	}

	public final DefaultCaseContext defaultCase() throws RecognitionException {
		DefaultCaseContext _localctx = new DefaultCaseContext(_ctx, getState());
		enterRule(_localctx, 80, RULE_defaultCase);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(511);
			match(NL);
			setState(512);
			match(DEFAULT);
			setState(513);
			statementBlock();
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class MutableClassContext extends ParserRuleContext {
		public List<TerminalNode> NL() { return getTokens(ElanParser.NL); }
		public TerminalNode NL(int i) {
			return getToken(ElanParser.NL, i);
		}
		public List<TerminalNode> CLASS() { return getTokens(ElanParser.CLASS); }
		public TerminalNode CLASS(int i) {
			return getToken(ElanParser.CLASS, i);
		}
		public TerminalNode TYPENAME() { return getToken(ElanParser.TYPENAME, 0); }
		public ConstructorContext constructor() {
			return getRuleContext(ConstructorContext.class,0);
		}
		public TerminalNode END() { return getToken(ElanParser.END, 0); }
		public InheritsContext inherits() {
			return getRuleContext(InheritsContext.class,0);
		}
		public List<PropertyContext> property() {
			return getRuleContexts(PropertyContext.class);
		}
		public PropertyContext property(int i) {
			return getRuleContext(PropertyContext.class,i);
		}
		public List<FunctionContext> function() {
			return getRuleContexts(FunctionContext.class);
		}
		public FunctionContext function(int i) {
			return getRuleContext(FunctionContext.class,i);
		}
		public List<ProcedureContext> procedure() {
			return getRuleContexts(ProcedureContext.class);
		}
		public ProcedureContext procedure(int i) {
			return getRuleContext(ProcedureContext.class,i);
		}
		public MutableClassContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_mutableClass; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).enterMutableClass(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).exitMutableClass(this);
		}
	}

	public final MutableClassContext mutableClass() throws RecognitionException {
		MutableClassContext _localctx = new MutableClassContext(_ctx, getState());
		enterRule(_localctx, 82, RULE_mutableClass);
		int _la;
		try {
			int _alt;
			enterOuterAlt(_localctx, 1);
			{
			setState(515);
			match(NL);
			setState(516);
			match(CLASS);
			setState(517);
			match(TYPENAME);
			setState(519);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==INHERITS) {
				{
				setState(518);
				inherits();
				}
			}

			setState(521);
			constructor();
			setState(528);
			_errHandler.sync(this);
			_alt = getInterpreter().adaptivePredict(_input,29,_ctx);
			while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER ) {
				if ( _alt==1 ) {
					{
					setState(526);
					_errHandler.sync(this);
					switch ( getInterpreter().adaptivePredict(_input,28,_ctx) ) {
					case 1:
						{
						setState(522);
						match(NL);
						setState(523);
						property();
						}
						break;
					case 2:
						{
						setState(524);
						function();
						}
						break;
					case 3:
						{
						setState(525);
						procedure();
						}
						break;
					}
					} 
				}
				setState(530);
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,29,_ctx);
			}
			setState(531);
			match(NL);
			setState(532);
			match(END);
			setState(533);
			match(CLASS);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class AbstractClassContext extends ParserRuleContext {
		public List<TerminalNode> NL() { return getTokens(ElanParser.NL); }
		public TerminalNode NL(int i) {
			return getToken(ElanParser.NL, i);
		}
		public List<TerminalNode> ABSTRACT() { return getTokens(ElanParser.ABSTRACT); }
		public TerminalNode ABSTRACT(int i) {
			return getToken(ElanParser.ABSTRACT, i);
		}
		public List<TerminalNode> CLASS() { return getTokens(ElanParser.CLASS); }
		public TerminalNode CLASS(int i) {
			return getToken(ElanParser.CLASS, i);
		}
		public TerminalNode TYPENAME() { return getToken(ElanParser.TYPENAME, 0); }
		public TerminalNode END() { return getToken(ElanParser.END, 0); }
		public InheritsContext inherits() {
			return getRuleContext(InheritsContext.class,0);
		}
		public List<PropertyContext> property() {
			return getRuleContexts(PropertyContext.class);
		}
		public PropertyContext property(int i) {
			return getRuleContext(PropertyContext.class,i);
		}
		public List<TerminalNode> FUNCTION() { return getTokens(ElanParser.FUNCTION); }
		public TerminalNode FUNCTION(int i) {
			return getToken(ElanParser.FUNCTION, i);
		}
		public List<FunctionSignatureContext> functionSignature() {
			return getRuleContexts(FunctionSignatureContext.class);
		}
		public FunctionSignatureContext functionSignature(int i) {
			return getRuleContext(FunctionSignatureContext.class,i);
		}
		public List<TerminalNode> PROCEDURE() { return getTokens(ElanParser.PROCEDURE); }
		public TerminalNode PROCEDURE(int i) {
			return getToken(ElanParser.PROCEDURE, i);
		}
		public List<ProcedureSignatureContext> procedureSignature() {
			return getRuleContexts(ProcedureSignatureContext.class);
		}
		public ProcedureSignatureContext procedureSignature(int i) {
			return getRuleContext(ProcedureSignatureContext.class,i);
		}
		public AbstractClassContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_abstractClass; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).enterAbstractClass(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).exitAbstractClass(this);
		}
	}

	public final AbstractClassContext abstractClass() throws RecognitionException {
		AbstractClassContext _localctx = new AbstractClassContext(_ctx, getState());
		enterRule(_localctx, 84, RULE_abstractClass);
		int _la;
		try {
			int _alt;
			enterOuterAlt(_localctx, 1);
			{
			setState(535);
			match(NL);
			setState(536);
			match(ABSTRACT);
			setState(537);
			match(CLASS);
			setState(538);
			match(TYPENAME);
			setState(540);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==INHERITS) {
				{
				setState(539);
				inherits();
				}
			}

			setState(555);
			_errHandler.sync(this);
			_alt = getInterpreter().adaptivePredict(_input,32,_ctx);
			while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER ) {
				if ( _alt==1 ) {
					{
					setState(553);
					_errHandler.sync(this);
					switch ( getInterpreter().adaptivePredict(_input,31,_ctx) ) {
					case 1:
						{
						setState(542);
						match(NL);
						setState(543);
						match(ABSTRACT);
						setState(544);
						property();
						}
						break;
					case 2:
						{
						setState(545);
						match(NL);
						setState(546);
						match(ABSTRACT);
						setState(547);
						match(FUNCTION);
						setState(548);
						functionSignature();
						}
						break;
					case 3:
						{
						setState(549);
						match(NL);
						setState(550);
						match(ABSTRACT);
						setState(551);
						match(PROCEDURE);
						setState(552);
						procedureSignature();
						}
						break;
					}
					} 
				}
				setState(557);
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,32,_ctx);
			}
			setState(558);
			match(NL);
			setState(559);
			match(END);
			setState(560);
			match(CLASS);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class ImmutableClassContext extends ParserRuleContext {
		public List<TerminalNode> NL() { return getTokens(ElanParser.NL); }
		public TerminalNode NL(int i) {
			return getToken(ElanParser.NL, i);
		}
		public TerminalNode IMMUTABLE() { return getToken(ElanParser.IMMUTABLE, 0); }
		public List<TerminalNode> CLASS() { return getTokens(ElanParser.CLASS); }
		public TerminalNode CLASS(int i) {
			return getToken(ElanParser.CLASS, i);
		}
		public TerminalNode TYPENAME() { return getToken(ElanParser.TYPENAME, 0); }
		public ConstructorContext constructor() {
			return getRuleContext(ConstructorContext.class,0);
		}
		public TerminalNode END() { return getToken(ElanParser.END, 0); }
		public InheritsContext inherits() {
			return getRuleContext(InheritsContext.class,0);
		}
		public List<PropertyContext> property() {
			return getRuleContexts(PropertyContext.class);
		}
		public PropertyContext property(int i) {
			return getRuleContext(PropertyContext.class,i);
		}
		public List<FunctionContext> function() {
			return getRuleContexts(FunctionContext.class);
		}
		public FunctionContext function(int i) {
			return getRuleContext(FunctionContext.class,i);
		}
		public ImmutableClassContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_immutableClass; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).enterImmutableClass(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).exitImmutableClass(this);
		}
	}

	public final ImmutableClassContext immutableClass() throws RecognitionException {
		ImmutableClassContext _localctx = new ImmutableClassContext(_ctx, getState());
		enterRule(_localctx, 86, RULE_immutableClass);
		int _la;
		try {
			int _alt;
			enterOuterAlt(_localctx, 1);
			{
			setState(562);
			match(NL);
			setState(563);
			match(IMMUTABLE);
			setState(564);
			match(CLASS);
			setState(565);
			match(TYPENAME);
			setState(567);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==INHERITS) {
				{
				setState(566);
				inherits();
				}
			}

			setState(569);
			constructor();
			setState(575);
			_errHandler.sync(this);
			_alt = getInterpreter().adaptivePredict(_input,35,_ctx);
			while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER ) {
				if ( _alt==1 ) {
					{
					setState(573);
					_errHandler.sync(this);
					switch ( getInterpreter().adaptivePredict(_input,34,_ctx) ) {
					case 1:
						{
						setState(570);
						match(NL);
						setState(571);
						property();
						}
						break;
					case 2:
						{
						setState(572);
						function();
						}
						break;
					}
					} 
				}
				setState(577);
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,35,_ctx);
			}
			setState(578);
			match(NL);
			setState(579);
			match(END);
			setState(580);
			match(CLASS);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class AbstractImmutableClassContext extends ParserRuleContext {
		public List<TerminalNode> NL() { return getTokens(ElanParser.NL); }
		public TerminalNode NL(int i) {
			return getToken(ElanParser.NL, i);
		}
		public List<TerminalNode> ABSTRACT() { return getTokens(ElanParser.ABSTRACT); }
		public TerminalNode ABSTRACT(int i) {
			return getToken(ElanParser.ABSTRACT, i);
		}
		public TerminalNode IMMUTABLE() { return getToken(ElanParser.IMMUTABLE, 0); }
		public List<TerminalNode> CLASS() { return getTokens(ElanParser.CLASS); }
		public TerminalNode CLASS(int i) {
			return getToken(ElanParser.CLASS, i);
		}
		public TerminalNode TYPENAME() { return getToken(ElanParser.TYPENAME, 0); }
		public TerminalNode END() { return getToken(ElanParser.END, 0); }
		public InheritsContext inherits() {
			return getRuleContext(InheritsContext.class,0);
		}
		public List<PropertyContext> property() {
			return getRuleContexts(PropertyContext.class);
		}
		public PropertyContext property(int i) {
			return getRuleContext(PropertyContext.class,i);
		}
		public List<TerminalNode> FUNCTION() { return getTokens(ElanParser.FUNCTION); }
		public TerminalNode FUNCTION(int i) {
			return getToken(ElanParser.FUNCTION, i);
		}
		public List<FunctionSignatureContext> functionSignature() {
			return getRuleContexts(FunctionSignatureContext.class);
		}
		public FunctionSignatureContext functionSignature(int i) {
			return getRuleContext(FunctionSignatureContext.class,i);
		}
		public AbstractImmutableClassContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_abstractImmutableClass; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).enterAbstractImmutableClass(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).exitAbstractImmutableClass(this);
		}
	}

	public final AbstractImmutableClassContext abstractImmutableClass() throws RecognitionException {
		AbstractImmutableClassContext _localctx = new AbstractImmutableClassContext(_ctx, getState());
		enterRule(_localctx, 88, RULE_abstractImmutableClass);
		int _la;
		try {
			int _alt;
			enterOuterAlt(_localctx, 1);
			{
			setState(582);
			match(NL);
			setState(583);
			match(ABSTRACT);
			setState(584);
			match(IMMUTABLE);
			setState(585);
			match(CLASS);
			setState(586);
			match(TYPENAME);
			setState(588);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==INHERITS) {
				{
				setState(587);
				inherits();
				}
			}

			setState(599);
			_errHandler.sync(this);
			_alt = getInterpreter().adaptivePredict(_input,38,_ctx);
			while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER ) {
				if ( _alt==1 ) {
					{
					setState(597);
					_errHandler.sync(this);
					switch ( getInterpreter().adaptivePredict(_input,37,_ctx) ) {
					case 1:
						{
						setState(590);
						match(NL);
						setState(591);
						match(ABSTRACT);
						setState(592);
						property();
						}
						break;
					case 2:
						{
						setState(593);
						match(NL);
						setState(594);
						match(ABSTRACT);
						setState(595);
						match(FUNCTION);
						setState(596);
						functionSignature();
						}
						break;
					}
					} 
				}
				setState(601);
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,38,_ctx);
			}
			setState(602);
			match(NL);
			setState(603);
			match(END);
			setState(604);
			match(CLASS);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class InheritsContext extends ParserRuleContext {
		public TerminalNode INHERITS() { return getToken(ElanParser.INHERITS, 0); }
		public List<TypeContext> type() {
			return getRuleContexts(TypeContext.class);
		}
		public TypeContext type(int i) {
			return getRuleContext(TypeContext.class,i);
		}
		public List<TerminalNode> COMMA() { return getTokens(ElanParser.COMMA); }
		public TerminalNode COMMA(int i) {
			return getToken(ElanParser.COMMA, i);
		}
		public InheritsContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_inherits; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).enterInherits(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).exitInherits(this);
		}
	}

	public final InheritsContext inherits() throws RecognitionException {
		InheritsContext _localctx = new InheritsContext(_ctx, getState());
		enterRule(_localctx, 90, RULE_inherits);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(606);
			match(INHERITS);
			setState(607);
			type();
			setState(612);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==COMMA) {
				{
				{
				setState(608);
				match(COMMA);
				setState(609);
				type();
				}
				}
				setState(614);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class ConstructorContext extends ParserRuleContext {
		public List<TerminalNode> NL() { return getTokens(ElanParser.NL); }
		public TerminalNode NL(int i) {
			return getToken(ElanParser.NL, i);
		}
		public List<TerminalNode> CONSTRUCTOR() { return getTokens(ElanParser.CONSTRUCTOR); }
		public TerminalNode CONSTRUCTOR(int i) {
			return getToken(ElanParser.CONSTRUCTOR, i);
		}
		public TerminalNode OPEN_BRACKET() { return getToken(ElanParser.OPEN_BRACKET, 0); }
		public TerminalNode CLOSE_BRACKET() { return getToken(ElanParser.CLOSE_BRACKET, 0); }
		public StatementBlockContext statementBlock() {
			return getRuleContext(StatementBlockContext.class,0);
		}
		public TerminalNode END() { return getToken(ElanParser.END, 0); }
		public ParamListContext paramList() {
			return getRuleContext(ParamListContext.class,0);
		}
		public ConstructorContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_constructor; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).enterConstructor(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).exitConstructor(this);
		}
	}

	public final ConstructorContext constructor() throws RecognitionException {
		ConstructorContext _localctx = new ConstructorContext(_ctx, getState());
		enterRule(_localctx, 92, RULE_constructor);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(615);
			match(NL);
			setState(616);
			match(CONSTRUCTOR);
			setState(617);
			match(OPEN_BRACKET);
			setState(619);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==IDENTIFIER) {
				{
				setState(618);
				paramList();
				}
			}

			setState(621);
			match(CLOSE_BRACKET);
			setState(622);
			statementBlock();
			setState(623);
			match(NL);
			setState(624);
			match(END);
			setState(625);
			match(CONSTRUCTOR);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class PropertyContext extends ParserRuleContext {
		public TerminalNode PROPERTY() { return getToken(ElanParser.PROPERTY, 0); }
		public TerminalNode IDENTIFIER() { return getToken(ElanParser.IDENTIFIER, 0); }
		public TerminalNode AS() { return getToken(ElanParser.AS, 0); }
		public TypeContext type() {
			return getRuleContext(TypeContext.class,0);
		}
		public TerminalNode PRIVATE() { return getToken(ElanParser.PRIVATE, 0); }
		public PropertyContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_property; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).enterProperty(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).exitProperty(this);
		}
	}

	public final PropertyContext property() throws RecognitionException {
		PropertyContext _localctx = new PropertyContext(_ctx, getState());
		enterRule(_localctx, 94, RULE_property);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(628);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==PRIVATE) {
				{
				setState(627);
				match(PRIVATE);
				}
			}

			setState(630);
			match(PROPERTY);
			setState(631);
			match(IDENTIFIER);
			setState(632);
			match(AS);
			setState(633);
			type();
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class ExpressionContext extends ParserRuleContext {
		public TermContext term() {
			return getRuleContext(TermContext.class,0);
		}
		public BinaryOpContext binaryOp() {
			return getRuleContext(BinaryOpContext.class,0);
		}
		public ExpressionContext expression() {
			return getRuleContext(ExpressionContext.class,0);
		}
		public WithClauseContext withClause() {
			return getRuleContext(WithClauseContext.class,0);
		}
		public ExpressionContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_expression; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).enterExpression(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).exitExpression(this);
		}
	}

	public final ExpressionContext expression() throws RecognitionException {
		ExpressionContext _localctx = new ExpressionContext(_ctx, getState());
		enterRule(_localctx, 96, RULE_expression);
		try {
			setState(643);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,42,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(635);
				term();
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				{
				setState(636);
				term();
				setState(637);
				binaryOp();
				setState(638);
				expression();
				}
				}
				break;
			case 3:
				enterOuterAlt(_localctx, 3);
				{
				{
				setState(640);
				term();
				setState(641);
				withClause();
				}
				}
				break;
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class TermContext extends ParserRuleContext {
		public BracketedExpressionContext bracketedExpression() {
			return getRuleContext(BracketedExpressionContext.class,0);
		}
		public LambdaContext lambda() {
			return getRuleContext(LambdaContext.class,0);
		}
		public IfExpressionContext ifExpression() {
			return getRuleContext(IfExpressionContext.class,0);
		}
		public NewInstanceContext newInstance() {
			return getRuleContext(NewInstanceContext.class,0);
		}
		public UnaryOpContext unaryOp() {
			return getRuleContext(UnaryOpContext.class,0);
		}
		public LiteralContext literal() {
			return getRuleContext(LiteralContext.class,0);
		}
		public VarRefContext varRef() {
			return getRuleContext(VarRefContext.class,0);
		}
		public TerminalNode THIS() { return getToken(ElanParser.THIS, 0); }
		public DefaultTypeContext defaultType() {
			return getRuleContext(DefaultTypeContext.class,0);
		}
		public MethodCallContext methodCall() {
			return getRuleContext(MethodCallContext.class,0);
		}
		public DataStructureDefinitionContext dataStructureDefinition() {
			return getRuleContext(DataStructureDefinitionContext.class,0);
		}
		public TermContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_term; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).enterTerm(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).exitTerm(this);
		}
	}

	public final TermContext term() throws RecognitionException {
		TermContext _localctx = new TermContext(_ctx, getState());
		enterRule(_localctx, 98, RULE_term);
		try {
			setState(656);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,43,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(645);
				bracketedExpression();
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(646);
				lambda();
				}
				break;
			case 3:
				enterOuterAlt(_localctx, 3);
				{
				setState(647);
				ifExpression();
				}
				break;
			case 4:
				enterOuterAlt(_localctx, 4);
				{
				setState(648);
				newInstance();
				}
				break;
			case 5:
				enterOuterAlt(_localctx, 5);
				{
				setState(649);
				unaryOp();
				}
				break;
			case 6:
				enterOuterAlt(_localctx, 6);
				{
				setState(650);
				literal();
				}
				break;
			case 7:
				enterOuterAlt(_localctx, 7);
				{
				setState(651);
				varRef();
				}
				break;
			case 8:
				enterOuterAlt(_localctx, 8);
				{
				setState(652);
				match(THIS);
				}
				break;
			case 9:
				enterOuterAlt(_localctx, 9);
				{
				setState(653);
				defaultType();
				}
				break;
			case 10:
				enterOuterAlt(_localctx, 10);
				{
				setState(654);
				methodCall();
				}
				break;
			case 11:
				enterOuterAlt(_localctx, 11);
				{
				setState(655);
				dataStructureDefinition();
				}
				break;
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class BracketedExpressionContext extends ParserRuleContext {
		public TerminalNode OPEN_BRACKET() { return getToken(ElanParser.OPEN_BRACKET, 0); }
		public ExpressionContext expression() {
			return getRuleContext(ExpressionContext.class,0);
		}
		public TerminalNode CLOSE_BRACKET() { return getToken(ElanParser.CLOSE_BRACKET, 0); }
		public BracketedExpressionContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_bracketedExpression; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).enterBracketedExpression(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).exitBracketedExpression(this);
		}
	}

	public final BracketedExpressionContext bracketedExpression() throws RecognitionException {
		BracketedExpressionContext _localctx = new BracketedExpressionContext(_ctx, getState());
		enterRule(_localctx, 100, RULE_bracketedExpression);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(658);
			match(OPEN_BRACKET);
			setState(659);
			expression();
			setState(660);
			match(CLOSE_BRACKET);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class LambdaContext extends ParserRuleContext {
		public TerminalNode LAMBDA() { return getToken(ElanParser.LAMBDA, 0); }
		public ParamListContext paramList() {
			return getRuleContext(ParamListContext.class,0);
		}
		public TerminalNode ARROW() { return getToken(ElanParser.ARROW, 0); }
		public ExpressionContext expression() {
			return getRuleContext(ExpressionContext.class,0);
		}
		public LambdaContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_lambda; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).enterLambda(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).exitLambda(this);
		}
	}

	public final LambdaContext lambda() throws RecognitionException {
		LambdaContext _localctx = new LambdaContext(_ctx, getState());
		enterRule(_localctx, 102, RULE_lambda);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(662);
			match(LAMBDA);
			setState(663);
			paramList();
			setState(664);
			match(ARROW);
			setState(665);
			expression();
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class IfExpressionContext extends ParserRuleContext {
		public TerminalNode IF() { return getToken(ElanParser.IF, 0); }
		public List<ExpressionContext> expression() {
			return getRuleContexts(ExpressionContext.class);
		}
		public ExpressionContext expression(int i) {
			return getRuleContext(ExpressionContext.class,i);
		}
		public TerminalNode THEN() { return getToken(ElanParser.THEN, 0); }
		public TerminalNode ELSE() { return getToken(ElanParser.ELSE, 0); }
		public IfExpressionContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_ifExpression; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).enterIfExpression(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).exitIfExpression(this);
		}
	}

	public final IfExpressionContext ifExpression() throws RecognitionException {
		IfExpressionContext _localctx = new IfExpressionContext(_ctx, getState());
		enterRule(_localctx, 104, RULE_ifExpression);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(667);
			match(IF);
			setState(668);
			expression();
			setState(669);
			match(THEN);
			setState(670);
			expression();
			setState(671);
			match(ELSE);
			setState(672);
			expression();
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class NewInstanceContext extends ParserRuleContext {
		public TerminalNode NEW() { return getToken(ElanParser.NEW, 0); }
		public TypeContext type() {
			return getRuleContext(TypeContext.class,0);
		}
		public TerminalNode OPEN_BRACKET() { return getToken(ElanParser.OPEN_BRACKET, 0); }
		public TerminalNode CLOSE_BRACKET() { return getToken(ElanParser.CLOSE_BRACKET, 0); }
		public ArgListContext argList() {
			return getRuleContext(ArgListContext.class,0);
		}
		public NewInstanceContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_newInstance; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).enterNewInstance(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).exitNewInstance(this);
		}
	}

	public final NewInstanceContext newInstance() throws RecognitionException {
		NewInstanceContext _localctx = new NewInstanceContext(_ctx, getState());
		enterRule(_localctx, 106, RULE_newInstance);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			{
			setState(674);
			match(NEW);
			setState(675);
			type();
			setState(676);
			match(OPEN_BRACKET);
			setState(678);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if ((((_la) & ~0x3f) == 0 && ((1L << _la) & 288795061473312768L) != 0) || ((((_la - 67)) & ~0x3f) == 0 && ((1L << (_la - 67)) & 16911963137L) != 0)) {
				{
				setState(677);
				argList();
				}
			}

			setState(680);
			match(CLOSE_BRACKET);
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class UnaryOpContext extends ParserRuleContext {
		public TermContext term() {
			return getRuleContext(TermContext.class,0);
		}
		public TerminalNode MINUS() { return getToken(ElanParser.MINUS, 0); }
		public TerminalNode NOT() { return getToken(ElanParser.NOT, 0); }
		public UnaryOpContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_unaryOp; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).enterUnaryOp(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).exitUnaryOp(this);
		}
	}

	public final UnaryOpContext unaryOp() throws RecognitionException {
		UnaryOpContext _localctx = new UnaryOpContext(_ctx, getState());
		enterRule(_localctx, 108, RULE_unaryOp);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(682);
			_la = _input.LA(1);
			if ( !(_la==NOT || _la==MINUS) ) {
			_errHandler.recoverInline(this);
			}
			else {
				if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
				_errHandler.reportMatch(this);
				consume();
			}
			setState(683);
			term();
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class VarRefContext extends ParserRuleContext {
		public List<TerminalNode> IDENTIFIER() { return getTokens(ElanParser.IDENTIFIER); }
		public TerminalNode IDENTIFIER(int i) {
			return getToken(ElanParser.IDENTIFIER, i);
		}
		public TerminalNode DOT() { return getToken(ElanParser.DOT, 0); }
		public IndexContext index() {
			return getRuleContext(IndexContext.class,0);
		}
		public TerminalNode PROPERTY() { return getToken(ElanParser.PROPERTY, 0); }
		public TerminalNode GLOBAL() { return getToken(ElanParser.GLOBAL, 0); }
		public TerminalNode LIBRARY() { return getToken(ElanParser.LIBRARY, 0); }
		public VarRefContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_varRef; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).enterVarRef(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).exitVarRef(this);
		}
	}

	public final VarRefContext varRef() throws RecognitionException {
		VarRefContext _localctx = new VarRefContext(_ctx, getState());
		enterRule(_localctx, 110, RULE_varRef);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(687);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,45,_ctx) ) {
			case 1:
				{
				setState(685);
				_la = _input.LA(1);
				if ( !((((_la) & ~0x3f) == 0 && ((1L << _la) & 563018740006912L) != 0) || _la==IDENTIFIER) ) {
				_errHandler.recoverInline(this);
				}
				else {
					if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
					_errHandler.reportMatch(this);
					consume();
				}
				setState(686);
				match(DOT);
				}
				break;
			}
			setState(689);
			match(IDENTIFIER);
			setState(691);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==OPEN_SQ_BRACKET) {
				{
				setState(690);
				index();
				}
			}

			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class DefaultTypeContext extends ParserRuleContext {
		public TerminalNode DEFAULT() { return getToken(ElanParser.DEFAULT, 0); }
		public TypeContext type() {
			return getRuleContext(TypeContext.class,0);
		}
		public DefaultTypeContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_defaultType; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).enterDefaultType(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).exitDefaultType(this);
		}
	}

	public final DefaultTypeContext defaultType() throws RecognitionException {
		DefaultTypeContext _localctx = new DefaultTypeContext(_ctx, getState());
		enterRule(_localctx, 112, RULE_defaultType);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(693);
			match(DEFAULT);
			setState(694);
			type();
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class IndexContext extends ParserRuleContext {
		public TerminalNode OPEN_SQ_BRACKET() { return getToken(ElanParser.OPEN_SQ_BRACKET, 0); }
		public TerminalNode CLOSE_SQ_BRACKET() { return getToken(ElanParser.CLOSE_SQ_BRACKET, 0); }
		public List<ExpressionContext> expression() {
			return getRuleContexts(ExpressionContext.class);
		}
		public ExpressionContext expression(int i) {
			return getRuleContext(ExpressionContext.class,i);
		}
		public TerminalNode COMMA() { return getToken(ElanParser.COMMA, 0); }
		public RangeContext range() {
			return getRuleContext(RangeContext.class,0);
		}
		public IndexContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_index; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).enterIndex(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).exitIndex(this);
		}
	}

	public final IndexContext index() throws RecognitionException {
		IndexContext _localctx = new IndexContext(_ctx, getState());
		enterRule(_localctx, 114, RULE_index);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(696);
			match(OPEN_SQ_BRACKET);
			setState(703);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,47,_ctx) ) {
			case 1:
				{
				setState(697);
				expression();
				}
				break;
			case 2:
				{
				setState(698);
				expression();
				setState(699);
				match(COMMA);
				setState(700);
				expression();
				}
				break;
			case 3:
				{
				setState(702);
				range();
				}
				break;
			}
			setState(705);
			match(CLOSE_SQ_BRACKET);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class RangeContext extends ParserRuleContext {
		public List<ExpressionContext> expression() {
			return getRuleContexts(ExpressionContext.class);
		}
		public ExpressionContext expression(int i) {
			return getRuleContext(ExpressionContext.class,i);
		}
		public TerminalNode DOUBLE_DOT() { return getToken(ElanParser.DOUBLE_DOT, 0); }
		public RangeContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_range; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).enterRange(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).exitRange(this);
		}
	}

	public final RangeContext range() throws RecognitionException {
		RangeContext _localctx = new RangeContext(_ctx, getState());
		enterRule(_localctx, 116, RULE_range);
		try {
			setState(716);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,48,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(707);
				expression();
				setState(708);
				match(DOUBLE_DOT);
				setState(709);
				expression();
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(711);
				expression();
				setState(712);
				match(DOUBLE_DOT);
				}
				break;
			case 3:
				enterOuterAlt(_localctx, 3);
				{
				setState(714);
				match(DOUBLE_DOT);
				setState(715);
				expression();
				}
				break;
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class WithClauseContext extends ParserRuleContext {
		public TerminalNode WITH() { return getToken(ElanParser.WITH, 0); }
		public TerminalNode OPEN_SQ_BRACKET() { return getToken(ElanParser.OPEN_SQ_BRACKET, 0); }
		public List<InlineAsignmentContext> inlineAsignment() {
			return getRuleContexts(InlineAsignmentContext.class);
		}
		public InlineAsignmentContext inlineAsignment(int i) {
			return getRuleContext(InlineAsignmentContext.class,i);
		}
		public TerminalNode CLOSE_BRACE() { return getToken(ElanParser.CLOSE_BRACE, 0); }
		public List<TerminalNode> COMMA() { return getTokens(ElanParser.COMMA); }
		public TerminalNode COMMA(int i) {
			return getToken(ElanParser.COMMA, i);
		}
		public WithClauseContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_withClause; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).enterWithClause(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).exitWithClause(this);
		}
	}

	public final WithClauseContext withClause() throws RecognitionException {
		WithClauseContext _localctx = new WithClauseContext(_ctx, getState());
		enterRule(_localctx, 118, RULE_withClause);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(718);
			match(WITH);
			setState(719);
			match(OPEN_SQ_BRACKET);
			setState(720);
			inlineAsignment();
			setState(725);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==COMMA) {
				{
				{
				setState(721);
				match(COMMA);
				setState(722);
				inlineAsignment();
				}
				}
				setState(727);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			setState(728);
			match(CLOSE_BRACE);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class InlineAsignmentContext extends ParserRuleContext {
		public AssignableValueContext assignableValue() {
			return getRuleContext(AssignableValueContext.class,0);
		}
		public TerminalNode SET() { return getToken(ElanParser.SET, 0); }
		public TerminalNode TO() { return getToken(ElanParser.TO, 0); }
		public ExpressionContext expression() {
			return getRuleContext(ExpressionContext.class,0);
		}
		public InlineAsignmentContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_inlineAsignment; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).enterInlineAsignment(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).exitInlineAsignment(this);
		}
	}

	public final InlineAsignmentContext inlineAsignment() throws RecognitionException {
		InlineAsignmentContext _localctx = new InlineAsignmentContext(_ctx, getState());
		enterRule(_localctx, 120, RULE_inlineAsignment);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(730);
			assignableValue();
			setState(731);
			match(SET);
			setState(732);
			match(TO);
			setState(733);
			expression();
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class LiteralContext extends ParserRuleContext {
		public LiteralValueContext literalValue() {
			return getRuleContext(LiteralValueContext.class,0);
		}
		public LiteralDataStructureContext literalDataStructure() {
			return getRuleContext(LiteralDataStructureContext.class,0);
		}
		public LiteralContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_literal; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).enterLiteral(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).exitLiteral(this);
		}
	}

	public final LiteralContext literal() throws RecognitionException {
		LiteralContext _localctx = new LiteralContext(_ctx, getState());
		enterRule(_localctx, 122, RULE_literal);
		try {
			setState(737);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case BOOL_VALUE:
			case TYPENAME:
			case LITERAL_INTEGER:
			case LITERAL_FLOAT:
			case LITERAL_CHAR:
				enterOuterAlt(_localctx, 1);
				{
				setState(735);
				literalValue();
				}
				break;
			case OPEN_SQ_BRACKET:
			case OPEN_BRACKET:
			case LITERAL_STRING:
				enterOuterAlt(_localctx, 2);
				{
				setState(736);
				literalDataStructure();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class LiteralValueContext extends ParserRuleContext {
		public TerminalNode BOOL_VALUE() { return getToken(ElanParser.BOOL_VALUE, 0); }
		public TerminalNode LITERAL_INTEGER() { return getToken(ElanParser.LITERAL_INTEGER, 0); }
		public TerminalNode LITERAL_FLOAT() { return getToken(ElanParser.LITERAL_FLOAT, 0); }
		public TerminalNode LITERAL_CHAR() { return getToken(ElanParser.LITERAL_CHAR, 0); }
		public EnumValueContext enumValue() {
			return getRuleContext(EnumValueContext.class,0);
		}
		public LiteralValueContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_literalValue; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).enterLiteralValue(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).exitLiteralValue(this);
		}
	}

	public final LiteralValueContext literalValue() throws RecognitionException {
		LiteralValueContext _localctx = new LiteralValueContext(_ctx, getState());
		enterRule(_localctx, 124, RULE_literalValue);
		try {
			setState(744);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case BOOL_VALUE:
				enterOuterAlt(_localctx, 1);
				{
				setState(739);
				match(BOOL_VALUE);
				}
				break;
			case LITERAL_INTEGER:
				enterOuterAlt(_localctx, 2);
				{
				setState(740);
				match(LITERAL_INTEGER);
				}
				break;
			case LITERAL_FLOAT:
				enterOuterAlt(_localctx, 3);
				{
				setState(741);
				match(LITERAL_FLOAT);
				}
				break;
			case LITERAL_CHAR:
				enterOuterAlt(_localctx, 4);
				{
				setState(742);
				match(LITERAL_CHAR);
				}
				break;
			case TYPENAME:
				enterOuterAlt(_localctx, 5);
				{
				setState(743);
				enumValue();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class EnumValueContext extends ParserRuleContext {
		public TerminalNode TYPENAME() { return getToken(ElanParser.TYPENAME, 0); }
		public TerminalNode DOT() { return getToken(ElanParser.DOT, 0); }
		public TerminalNode IDENTIFIER() { return getToken(ElanParser.IDENTIFIER, 0); }
		public EnumValueContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_enumValue; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).enterEnumValue(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).exitEnumValue(this);
		}
	}

	public final EnumValueContext enumValue() throws RecognitionException {
		EnumValueContext _localctx = new EnumValueContext(_ctx, getState());
		enterRule(_localctx, 126, RULE_enumValue);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(746);
			match(TYPENAME);
			setState(747);
			match(DOT);
			setState(748);
			match(IDENTIFIER);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class LiteralDataStructureContext extends ParserRuleContext {
		public TerminalNode LITERAL_STRING() { return getToken(ElanParser.LITERAL_STRING, 0); }
		public LiteralTupleContext literalTuple() {
			return getRuleContext(LiteralTupleContext.class,0);
		}
		public LiteralListContext literalList() {
			return getRuleContext(LiteralListContext.class,0);
		}
		public LiteralDictionaryContext literalDictionary() {
			return getRuleContext(LiteralDictionaryContext.class,0);
		}
		public LiteralDataStructureContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_literalDataStructure; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).enterLiteralDataStructure(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).exitLiteralDataStructure(this);
		}
	}

	public final LiteralDataStructureContext literalDataStructure() throws RecognitionException {
		LiteralDataStructureContext _localctx = new LiteralDataStructureContext(_ctx, getState());
		enterRule(_localctx, 128, RULE_literalDataStructure);
		try {
			setState(754);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,52,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(750);
				match(LITERAL_STRING);
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(751);
				literalTuple();
				}
				break;
			case 3:
				enterOuterAlt(_localctx, 3);
				{
				setState(752);
				literalList();
				}
				break;
			case 4:
				enterOuterAlt(_localctx, 4);
				{
				setState(753);
				literalDictionary();
				}
				break;
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class LiteralTupleContext extends ParserRuleContext {
		public TerminalNode OPEN_BRACKET() { return getToken(ElanParser.OPEN_BRACKET, 0); }
		public List<LiteralContext> literal() {
			return getRuleContexts(LiteralContext.class);
		}
		public LiteralContext literal(int i) {
			return getRuleContext(LiteralContext.class,i);
		}
		public List<TerminalNode> COMMA() { return getTokens(ElanParser.COMMA); }
		public TerminalNode COMMA(int i) {
			return getToken(ElanParser.COMMA, i);
		}
		public TerminalNode CLOSE_BRACKET() { return getToken(ElanParser.CLOSE_BRACKET, 0); }
		public LiteralTupleContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_literalTuple; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).enterLiteralTuple(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).exitLiteralTuple(this);
		}
	}

	public final LiteralTupleContext literalTuple() throws RecognitionException {
		LiteralTupleContext _localctx = new LiteralTupleContext(_ctx, getState());
		enterRule(_localctx, 130, RULE_literalTuple);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(756);
			match(OPEN_BRACKET);
			setState(757);
			literal();
			setState(758);
			match(COMMA);
			setState(759);
			literal();
			setState(764);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==COMMA) {
				{
				{
				setState(760);
				match(COMMA);
				setState(761);
				literal();
				}
				}
				setState(766);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			setState(767);
			match(CLOSE_BRACKET);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class DataStructureDefinitionContext extends ParserRuleContext {
		public ListDefinitionContext listDefinition() {
			return getRuleContext(ListDefinitionContext.class,0);
		}
		public TupleDefinitionContext tupleDefinition() {
			return getRuleContext(TupleDefinitionContext.class,0);
		}
		public DictionaryDefinitionContext dictionaryDefinition() {
			return getRuleContext(DictionaryDefinitionContext.class,0);
		}
		public DataStructureDefinitionContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_dataStructureDefinition; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).enterDataStructureDefinition(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).exitDataStructureDefinition(this);
		}
	}

	public final DataStructureDefinitionContext dataStructureDefinition() throws RecognitionException {
		DataStructureDefinitionContext _localctx = new DataStructureDefinitionContext(_ctx, getState());
		enterRule(_localctx, 132, RULE_dataStructureDefinition);
		try {
			setState(772);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,54,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(769);
				listDefinition();
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(770);
				tupleDefinition();
				}
				break;
			case 3:
				enterOuterAlt(_localctx, 3);
				{
				setState(771);
				dictionaryDefinition();
				}
				break;
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class ListDefinitionContext extends ParserRuleContext {
		public TerminalNode OPEN_SQ_BRACKET() { return getToken(ElanParser.OPEN_SQ_BRACKET, 0); }
		public TerminalNode CLOSE_SQ_BRACKET() { return getToken(ElanParser.CLOSE_SQ_BRACKET, 0); }
		public List<ExpressionContext> expression() {
			return getRuleContexts(ExpressionContext.class);
		}
		public ExpressionContext expression(int i) {
			return getRuleContext(ExpressionContext.class,i);
		}
		public List<TerminalNode> COMMA() { return getTokens(ElanParser.COMMA); }
		public TerminalNode COMMA(int i) {
			return getToken(ElanParser.COMMA, i);
		}
		public ListDefinitionContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_listDefinition; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).enterListDefinition(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).exitListDefinition(this);
		}
	}

	public final ListDefinitionContext listDefinition() throws RecognitionException {
		ListDefinitionContext _localctx = new ListDefinitionContext(_ctx, getState());
		enterRule(_localctx, 134, RULE_listDefinition);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(774);
			match(OPEN_SQ_BRACKET);
			{
			setState(775);
			expression();
			setState(780);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==COMMA) {
				{
				{
				setState(776);
				match(COMMA);
				setState(777);
				expression();
				}
				}
				setState(782);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			}
			setState(783);
			match(CLOSE_SQ_BRACKET);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class TupleDefinitionContext extends ParserRuleContext {
		public TerminalNode OPEN_BRACKET() { return getToken(ElanParser.OPEN_BRACKET, 0); }
		public List<ExpressionContext> expression() {
			return getRuleContexts(ExpressionContext.class);
		}
		public ExpressionContext expression(int i) {
			return getRuleContext(ExpressionContext.class,i);
		}
		public List<TerminalNode> COMMA() { return getTokens(ElanParser.COMMA); }
		public TerminalNode COMMA(int i) {
			return getToken(ElanParser.COMMA, i);
		}
		public TerminalNode CLOSE_BRACKET() { return getToken(ElanParser.CLOSE_BRACKET, 0); }
		public TupleDefinitionContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_tupleDefinition; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).enterTupleDefinition(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).exitTupleDefinition(this);
		}
	}

	public final TupleDefinitionContext tupleDefinition() throws RecognitionException {
		TupleDefinitionContext _localctx = new TupleDefinitionContext(_ctx, getState());
		enterRule(_localctx, 136, RULE_tupleDefinition);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(785);
			match(OPEN_BRACKET);
			setState(786);
			expression();
			setState(787);
			match(COMMA);
			setState(788);
			expression();
			setState(793);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==COMMA) {
				{
				{
				setState(789);
				match(COMMA);
				setState(790);
				expression();
				}
				}
				setState(795);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			setState(796);
			match(CLOSE_BRACKET);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class DictionaryDefinitionContext extends ParserRuleContext {
		public TerminalNode OPEN_SQ_BRACKET() { return getToken(ElanParser.OPEN_SQ_BRACKET, 0); }
		public TerminalNode CLOSE_SQ_BRACKET() { return getToken(ElanParser.CLOSE_SQ_BRACKET, 0); }
		public List<KvpContext> kvp() {
			return getRuleContexts(KvpContext.class);
		}
		public KvpContext kvp(int i) {
			return getRuleContext(KvpContext.class,i);
		}
		public List<TerminalNode> COMMA() { return getTokens(ElanParser.COMMA); }
		public TerminalNode COMMA(int i) {
			return getToken(ElanParser.COMMA, i);
		}
		public DictionaryDefinitionContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_dictionaryDefinition; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).enterDictionaryDefinition(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).exitDictionaryDefinition(this);
		}
	}

	public final DictionaryDefinitionContext dictionaryDefinition() throws RecognitionException {
		DictionaryDefinitionContext _localctx = new DictionaryDefinitionContext(_ctx, getState());
		enterRule(_localctx, 138, RULE_dictionaryDefinition);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(798);
			match(OPEN_SQ_BRACKET);
			{
			setState(799);
			kvp();
			setState(804);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==COMMA) {
				{
				{
				setState(800);
				match(COMMA);
				setState(801);
				kvp();
				}
				}
				setState(806);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			}
			setState(807);
			match(CLOSE_SQ_BRACKET);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class KvpContext extends ParserRuleContext {
		public List<ExpressionContext> expression() {
			return getRuleContexts(ExpressionContext.class);
		}
		public ExpressionContext expression(int i) {
			return getRuleContext(ExpressionContext.class,i);
		}
		public TerminalNode COLON() { return getToken(ElanParser.COLON, 0); }
		public KvpContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_kvp; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).enterKvp(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).exitKvp(this);
		}
	}

	public final KvpContext kvp() throws RecognitionException {
		KvpContext _localctx = new KvpContext(_ctx, getState());
		enterRule(_localctx, 140, RULE_kvp);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(809);
			expression();
			setState(810);
			match(COLON);
			setState(811);
			expression();
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class LiteralListContext extends ParserRuleContext {
		public TerminalNode OPEN_SQ_BRACKET() { return getToken(ElanParser.OPEN_SQ_BRACKET, 0); }
		public TerminalNode CLOSE_SQ_BRACKET() { return getToken(ElanParser.CLOSE_SQ_BRACKET, 0); }
		public List<LiteralContext> literal() {
			return getRuleContexts(LiteralContext.class);
		}
		public LiteralContext literal(int i) {
			return getRuleContext(LiteralContext.class,i);
		}
		public List<TerminalNode> COMMA() { return getTokens(ElanParser.COMMA); }
		public TerminalNode COMMA(int i) {
			return getToken(ElanParser.COMMA, i);
		}
		public LiteralListContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_literalList; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).enterLiteralList(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).exitLiteralList(this);
		}
	}

	public final LiteralListContext literalList() throws RecognitionException {
		LiteralListContext _localctx = new LiteralListContext(_ctx, getState());
		enterRule(_localctx, 142, RULE_literalList);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(813);
			match(OPEN_SQ_BRACKET);
			{
			setState(814);
			literal();
			setState(819);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==COMMA) {
				{
				{
				setState(815);
				match(COMMA);
				setState(816);
				literal();
				}
				}
				setState(821);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			}
			setState(822);
			match(CLOSE_SQ_BRACKET);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class LiteralDictionaryContext extends ParserRuleContext {
		public TerminalNode OPEN_SQ_BRACKET() { return getToken(ElanParser.OPEN_SQ_BRACKET, 0); }
		public TerminalNode CLOSE_SQ_BRACKET() { return getToken(ElanParser.CLOSE_SQ_BRACKET, 0); }
		public List<LiteralKvpContext> literalKvp() {
			return getRuleContexts(LiteralKvpContext.class);
		}
		public LiteralKvpContext literalKvp(int i) {
			return getRuleContext(LiteralKvpContext.class,i);
		}
		public List<TerminalNode> COMMA() { return getTokens(ElanParser.COMMA); }
		public TerminalNode COMMA(int i) {
			return getToken(ElanParser.COMMA, i);
		}
		public LiteralDictionaryContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_literalDictionary; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).enterLiteralDictionary(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).exitLiteralDictionary(this);
		}
	}

	public final LiteralDictionaryContext literalDictionary() throws RecognitionException {
		LiteralDictionaryContext _localctx = new LiteralDictionaryContext(_ctx, getState());
		enterRule(_localctx, 144, RULE_literalDictionary);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(824);
			match(OPEN_SQ_BRACKET);
			{
			setState(825);
			literalKvp();
			setState(830);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==COMMA) {
				{
				{
				setState(826);
				match(COMMA);
				setState(827);
				literalKvp();
				}
				}
				setState(832);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			}
			setState(833);
			match(CLOSE_SQ_BRACKET);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class LiteralKvpContext extends ParserRuleContext {
		public List<LiteralContext> literal() {
			return getRuleContexts(LiteralContext.class);
		}
		public LiteralContext literal(int i) {
			return getRuleContext(LiteralContext.class,i);
		}
		public TerminalNode COLON() { return getToken(ElanParser.COLON, 0); }
		public LiteralKvpContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_literalKvp; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).enterLiteralKvp(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).exitLiteralKvp(this);
		}
	}

	public final LiteralKvpContext literalKvp() throws RecognitionException {
		LiteralKvpContext _localctx = new LiteralKvpContext(_ctx, getState());
		enterRule(_localctx, 146, RULE_literalKvp);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(835);
			literal();
			setState(836);
			match(COLON);
			setState(837);
			literal();
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class DeconstructedTupleContext extends ParserRuleContext {
		public TerminalNode OPEN_BRACKET() { return getToken(ElanParser.OPEN_BRACKET, 0); }
		public List<TerminalNode> IDENTIFIER() { return getTokens(ElanParser.IDENTIFIER); }
		public TerminalNode IDENTIFIER(int i) {
			return getToken(ElanParser.IDENTIFIER, i);
		}
		public TerminalNode CLOSE_BRACKET() { return getToken(ElanParser.CLOSE_BRACKET, 0); }
		public List<TerminalNode> COMMA() { return getTokens(ElanParser.COMMA); }
		public TerminalNode COMMA(int i) {
			return getToken(ElanParser.COMMA, i);
		}
		public DeconstructedTupleContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_deconstructedTuple; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).enterDeconstructedTuple(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).exitDeconstructedTuple(this);
		}
	}

	public final DeconstructedTupleContext deconstructedTuple() throws RecognitionException {
		DeconstructedTupleContext _localctx = new DeconstructedTupleContext(_ctx, getState());
		enterRule(_localctx, 148, RULE_deconstructedTuple);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(839);
			match(OPEN_BRACKET);
			setState(840);
			match(IDENTIFIER);
			setState(843); 
			_errHandler.sync(this);
			_la = _input.LA(1);
			do {
				{
				{
				setState(841);
				match(COMMA);
				setState(842);
				match(IDENTIFIER);
				}
				}
				setState(845); 
				_errHandler.sync(this);
				_la = _input.LA(1);
			} while ( _la==COMMA );
			setState(847);
			match(CLOSE_BRACKET);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class DeconstructedListContext extends ParserRuleContext {
		public TerminalNode OPEN_SQ_BRACKET() { return getToken(ElanParser.OPEN_SQ_BRACKET, 0); }
		public List<TerminalNode> IDENTIFIER() { return getTokens(ElanParser.IDENTIFIER); }
		public TerminalNode IDENTIFIER(int i) {
			return getToken(ElanParser.IDENTIFIER, i);
		}
		public TerminalNode COLON() { return getToken(ElanParser.COLON, 0); }
		public TerminalNode CLOSE_SQ_BRACKET() { return getToken(ElanParser.CLOSE_SQ_BRACKET, 0); }
		public DeconstructedListContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_deconstructedList; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).enterDeconstructedList(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).exitDeconstructedList(this);
		}
	}

	public final DeconstructedListContext deconstructedList() throws RecognitionException {
		DeconstructedListContext _localctx = new DeconstructedListContext(_ctx, getState());
		enterRule(_localctx, 150, RULE_deconstructedList);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(849);
			match(OPEN_SQ_BRACKET);
			setState(850);
			match(IDENTIFIER);
			setState(851);
			match(COLON);
			setState(852);
			match(IDENTIFIER);
			setState(853);
			match(CLOSE_SQ_BRACKET);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class BinaryOpContext extends ParserRuleContext {
		public ArithmeticOpContext arithmeticOp() {
			return getRuleContext(ArithmeticOpContext.class,0);
		}
		public LogicalOpContext logicalOp() {
			return getRuleContext(LogicalOpContext.class,0);
		}
		public ConditionalOpContext conditionalOp() {
			return getRuleContext(ConditionalOpContext.class,0);
		}
		public BinaryOpContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_binaryOp; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).enterBinaryOp(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).exitBinaryOp(this);
		}
	}

	public final BinaryOpContext binaryOp() throws RecognitionException {
		BinaryOpContext _localctx = new BinaryOpContext(_ctx, getState());
		enterRule(_localctx, 152, RULE_binaryOp);
		try {
			setState(858);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case DIV:
			case MOD:
			case PLUS:
			case MINUS:
			case MULT:
			case DIVIDE:
			case POWER:
				enterOuterAlt(_localctx, 1);
				{
				setState(855);
				arithmeticOp();
				}
				break;
			case AND:
			case OR:
			case XOR:
				enterOuterAlt(_localctx, 2);
				{
				setState(856);
				logicalOp();
				}
				break;
			case IS:
			case LT:
			case GT:
			case LE:
			case GE:
			case IS_NOT:
				enterOuterAlt(_localctx, 3);
				{
				setState(857);
				conditionalOp();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class ArithmeticOpContext extends ParserRuleContext {
		public TerminalNode POWER() { return getToken(ElanParser.POWER, 0); }
		public TerminalNode MULT() { return getToken(ElanParser.MULT, 0); }
		public TerminalNode DIVIDE() { return getToken(ElanParser.DIVIDE, 0); }
		public TerminalNode MOD() { return getToken(ElanParser.MOD, 0); }
		public TerminalNode DIV() { return getToken(ElanParser.DIV, 0); }
		public TerminalNode PLUS() { return getToken(ElanParser.PLUS, 0); }
		public TerminalNode MINUS() { return getToken(ElanParser.MINUS, 0); }
		public ArithmeticOpContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_arithmeticOp; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).enterArithmeticOp(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).exitArithmeticOp(this);
		}
	}

	public final ArithmeticOpContext arithmeticOp() throws RecognitionException {
		ArithmeticOpContext _localctx = new ArithmeticOpContext(_ctx, getState());
		enterRule(_localctx, 154, RULE_arithmeticOp);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(860);
			_la = _input.LA(1);
			if ( !(_la==DIV || _la==MOD || ((((_la - 85)) & ~0x3f) == 0 && ((1L << (_la - 85)) & 31L) != 0)) ) {
			_errHandler.recoverInline(this);
			}
			else {
				if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
				_errHandler.reportMatch(this);
				consume();
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class LogicalOpContext extends ParserRuleContext {
		public TerminalNode AND() { return getToken(ElanParser.AND, 0); }
		public TerminalNode OR() { return getToken(ElanParser.OR, 0); }
		public TerminalNode XOR() { return getToken(ElanParser.XOR, 0); }
		public LogicalOpContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_logicalOp; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).enterLogicalOp(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).exitLogicalOp(this);
		}
	}

	public final LogicalOpContext logicalOp() throws RecognitionException {
		LogicalOpContext _localctx = new LogicalOpContext(_ctx, getState());
		enterRule(_localctx, 156, RULE_logicalOp);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(862);
			_la = _input.LA(1);
			if ( !(((((_la - 5)) & ~0x3f) == 0 && ((1L << (_la - 5)) & 2305843284091600897L) != 0)) ) {
			_errHandler.recoverInline(this);
			}
			else {
				if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
				_errHandler.reportMatch(this);
				consume();
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class ConditionalOpContext extends ParserRuleContext {
		public TerminalNode GT() { return getToken(ElanParser.GT, 0); }
		public TerminalNode LT() { return getToken(ElanParser.LT, 0); }
		public TerminalNode GE() { return getToken(ElanParser.GE, 0); }
		public TerminalNode LE() { return getToken(ElanParser.LE, 0); }
		public TerminalNode IS() { return getToken(ElanParser.IS, 0); }
		public TerminalNode IS_NOT() { return getToken(ElanParser.IS_NOT, 0); }
		public ConditionalOpContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_conditionalOp; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).enterConditionalOp(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).exitConditionalOp(this);
		}
	}

	public final ConditionalOpContext conditionalOp() throws RecognitionException {
		ConditionalOpContext _localctx = new ConditionalOpContext(_ctx, getState());
		enterRule(_localctx, 158, RULE_conditionalOp);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(864);
			_la = _input.LA(1);
			if ( !(((((_la - 42)) & ~0x3f) == 0 && ((1L << (_la - 42)) & 8725724278030337L) != 0)) ) {
			_errHandler.recoverInline(this);
			}
			else {
				if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
				_errHandler.reportMatch(this);
				consume();
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class TypeContext extends ParserRuleContext {
		public TerminalNode VALUE_TYPE() { return getToken(ElanParser.VALUE_TYPE, 0); }
		public DataStructureTypeContext dataStructureType() {
			return getRuleContext(DataStructureTypeContext.class,0);
		}
		public TerminalNode TYPENAME() { return getToken(ElanParser.TYPENAME, 0); }
		public GenericSpecifierContext genericSpecifier() {
			return getRuleContext(GenericSpecifierContext.class,0);
		}
		public TupleTypeContext tupleType() {
			return getRuleContext(TupleTypeContext.class,0);
		}
		public FuncTypeContext funcType() {
			return getRuleContext(FuncTypeContext.class,0);
		}
		public TypeContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_type; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).enterType(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).exitType(this);
		}
	}

	public final TypeContext type() throws RecognitionException {
		TypeContext _localctx = new TypeContext(_ctx, getState());
		enterRule(_localctx, 160, RULE_type);
		try {
			setState(873);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,62,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(866);
				match(VALUE_TYPE);
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(867);
				dataStructureType();
				}
				break;
			case 3:
				enterOuterAlt(_localctx, 3);
				{
				setState(868);
				match(TYPENAME);
				}
				break;
			case 4:
				enterOuterAlt(_localctx, 4);
				{
				setState(869);
				match(TYPENAME);
				setState(870);
				genericSpecifier();
				}
				break;
			case 5:
				enterOuterAlt(_localctx, 5);
				{
				setState(871);
				tupleType();
				}
				break;
			case 6:
				enterOuterAlt(_localctx, 6);
				{
				setState(872);
				funcType();
				}
				break;
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class DataStructureTypeContext extends ParserRuleContext {
		public GenericSpecifierContext genericSpecifier() {
			return getRuleContext(GenericSpecifierContext.class,0);
		}
		public TerminalNode ARRAY() { return getToken(ElanParser.ARRAY, 0); }
		public TerminalNode LIST() { return getToken(ElanParser.LIST, 0); }
		public TerminalNode DICTIONARY() { return getToken(ElanParser.DICTIONARY, 0); }
		public TerminalNode ITERABLE() { return getToken(ElanParser.ITERABLE, 0); }
		public DataStructureTypeContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_dataStructureType; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).enterDataStructureType(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).exitDataStructureType(this);
		}
	}

	public final DataStructureTypeContext dataStructureType() throws RecognitionException {
		DataStructureTypeContext _localctx = new DataStructureTypeContext(_ctx, getState());
		enterRule(_localctx, 162, RULE_dataStructureType);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(875);
			_la = _input.LA(1);
			if ( !(((((_la - 69)) & ~0x3f) == 0 && ((1L << (_la - 69)) & 15L) != 0)) ) {
			_errHandler.recoverInline(this);
			}
			else {
				if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
				_errHandler.reportMatch(this);
				consume();
			}
			setState(876);
			genericSpecifier();
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class GenericSpecifierContext extends ParserRuleContext {
		public TerminalNode LT() { return getToken(ElanParser.LT, 0); }
		public TerminalNode OF() { return getToken(ElanParser.OF, 0); }
		public List<TypeContext> type() {
			return getRuleContexts(TypeContext.class);
		}
		public TypeContext type(int i) {
			return getRuleContext(TypeContext.class,i);
		}
		public TerminalNode GT() { return getToken(ElanParser.GT, 0); }
		public List<TerminalNode> COMMA() { return getTokens(ElanParser.COMMA); }
		public TerminalNode COMMA(int i) {
			return getToken(ElanParser.COMMA, i);
		}
		public GenericSpecifierContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_genericSpecifier; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).enterGenericSpecifier(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).exitGenericSpecifier(this);
		}
	}

	public final GenericSpecifierContext genericSpecifier() throws RecognitionException {
		GenericSpecifierContext _localctx = new GenericSpecifierContext(_ctx, getState());
		enterRule(_localctx, 164, RULE_genericSpecifier);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(878);
			match(LT);
			setState(879);
			match(OF);
			setState(880);
			type();
			setState(885);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==COMMA) {
				{
				{
				setState(881);
				match(COMMA);
				setState(882);
				type();
				}
				}
				setState(887);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			setState(888);
			match(GT);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class TupleTypeContext extends ParserRuleContext {
		public TerminalNode OPEN_BRACKET() { return getToken(ElanParser.OPEN_BRACKET, 0); }
		public List<TypeContext> type() {
			return getRuleContexts(TypeContext.class);
		}
		public TypeContext type(int i) {
			return getRuleContext(TypeContext.class,i);
		}
		public TerminalNode CLOSE_BRACKET() { return getToken(ElanParser.CLOSE_BRACKET, 0); }
		public List<TerminalNode> COMMA() { return getTokens(ElanParser.COMMA); }
		public TerminalNode COMMA(int i) {
			return getToken(ElanParser.COMMA, i);
		}
		public TupleTypeContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_tupleType; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).enterTupleType(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).exitTupleType(this);
		}
	}

	public final TupleTypeContext tupleType() throws RecognitionException {
		TupleTypeContext _localctx = new TupleTypeContext(_ctx, getState());
		enterRule(_localctx, 166, RULE_tupleType);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(890);
			match(OPEN_BRACKET);
			setState(891);
			type();
			setState(894); 
			_errHandler.sync(this);
			_la = _input.LA(1);
			do {
				{
				{
				setState(892);
				match(COMMA);
				setState(893);
				type();
				}
				}
				setState(896); 
				_errHandler.sync(this);
				_la = _input.LA(1);
			} while ( _la==COMMA );
			setState(898);
			match(CLOSE_BRACKET);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class TypeListContext extends ParserRuleContext {
		public List<TypeContext> type() {
			return getRuleContexts(TypeContext.class);
		}
		public TypeContext type(int i) {
			return getRuleContext(TypeContext.class,i);
		}
		public List<TerminalNode> COMMA() { return getTokens(ElanParser.COMMA); }
		public TerminalNode COMMA(int i) {
			return getToken(ElanParser.COMMA, i);
		}
		public TypeListContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_typeList; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).enterTypeList(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).exitTypeList(this);
		}
	}

	public final TypeListContext typeList() throws RecognitionException {
		TypeListContext _localctx = new TypeListContext(_ctx, getState());
		enterRule(_localctx, 168, RULE_typeList);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(900);
			type();
			setState(905);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==COMMA) {
				{
				{
				setState(901);
				match(COMMA);
				setState(902);
				type();
				}
				}
				setState(907);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class FuncTypeContext extends ParserRuleContext {
		public TerminalNode OPEN_BRACKET() { return getToken(ElanParser.OPEN_BRACKET, 0); }
		public TypeListContext typeList() {
			return getRuleContext(TypeListContext.class,0);
		}
		public TerminalNode ARROW() { return getToken(ElanParser.ARROW, 0); }
		public TypeContext type() {
			return getRuleContext(TypeContext.class,0);
		}
		public TerminalNode CLOSE_BRACKET() { return getToken(ElanParser.CLOSE_BRACKET, 0); }
		public FuncTypeContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_funcType; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).enterFuncType(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).exitFuncType(this);
		}
	}

	public final FuncTypeContext funcType() throws RecognitionException {
		FuncTypeContext _localctx = new FuncTypeContext(_ctx, getState());
		enterRule(_localctx, 170, RULE_funcType);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(908);
			match(OPEN_BRACKET);
			setState(909);
			typeList();
			setState(910);
			match(ARROW);
			setState(911);
			type();
			setState(912);
			match(CLOSE_BRACKET);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static final String _serializedATN =
		"\u0004\u0001h\u0393\u0002\u0000\u0007\u0000\u0002\u0001\u0007\u0001\u0002"+
		"\u0002\u0007\u0002\u0002\u0003\u0007\u0003\u0002\u0004\u0007\u0004\u0002"+
		"\u0005\u0007\u0005\u0002\u0006\u0007\u0006\u0002\u0007\u0007\u0007\u0002"+
		"\b\u0007\b\u0002\t\u0007\t\u0002\n\u0007\n\u0002\u000b\u0007\u000b\u0002"+
		"\f\u0007\f\u0002\r\u0007\r\u0002\u000e\u0007\u000e\u0002\u000f\u0007\u000f"+
		"\u0002\u0010\u0007\u0010\u0002\u0011\u0007\u0011\u0002\u0012\u0007\u0012"+
		"\u0002\u0013\u0007\u0013\u0002\u0014\u0007\u0014\u0002\u0015\u0007\u0015"+
		"\u0002\u0016\u0007\u0016\u0002\u0017\u0007\u0017\u0002\u0018\u0007\u0018"+
		"\u0002\u0019\u0007\u0019\u0002\u001a\u0007\u001a\u0002\u001b\u0007\u001b"+
		"\u0002\u001c\u0007\u001c\u0002\u001d\u0007\u001d\u0002\u001e\u0007\u001e"+
		"\u0002\u001f\u0007\u001f\u0002 \u0007 \u0002!\u0007!\u0002\"\u0007\"\u0002"+
		"#\u0007#\u0002$\u0007$\u0002%\u0007%\u0002&\u0007&\u0002\'\u0007\'\u0002"+
		"(\u0007(\u0002)\u0007)\u0002*\u0007*\u0002+\u0007+\u0002,\u0007,\u0002"+
		"-\u0007-\u0002.\u0007.\u0002/\u0007/\u00020\u00070\u00021\u00071\u0002"+
		"2\u00072\u00023\u00073\u00024\u00074\u00025\u00075\u00026\u00076\u0002"+
		"7\u00077\u00028\u00078\u00029\u00079\u0002:\u0007:\u0002;\u0007;\u0002"+
		"<\u0007<\u0002=\u0007=\u0002>\u0007>\u0002?\u0007?\u0002@\u0007@\u0002"+
		"A\u0007A\u0002B\u0007B\u0002C\u0007C\u0002D\u0007D\u0002E\u0007E\u0002"+
		"F\u0007F\u0002G\u0007G\u0002H\u0007H\u0002I\u0007I\u0002J\u0007J\u0002"+
		"K\u0007K\u0002L\u0007L\u0002M\u0007M\u0002N\u0007N\u0002O\u0007O\u0002"+
		"P\u0007P\u0002Q\u0007Q\u0002R\u0007R\u0002S\u0007S\u0002T\u0007T\u0002"+
		"U\u0007U\u0001\u0000\u0001\u0000\u0005\u0000\u00af\b\u0000\n\u0000\f\u0000"+
		"\u00b2\t\u0000\u0001\u0000\u0005\u0000\u00b5\b\u0000\n\u0000\f\u0000\u00b8"+
		"\t\u0000\u0001\u0001\u0001\u0001\u0001\u0001\u0001\u0001\u0001\u0002\u0001"+
		"\u0002\u0001\u0002\u0001\u0003\u0001\u0003\u0001\u0003\u0005\u0003\u00c4"+
		"\b\u0003\n\u0003\f\u0003\u00c7\t\u0003\u0001\u0004\u0001\u0004\u0001\u0004"+
		"\u0001\u0004\u0001\u0004\u0001\u0004\u0001\u0004\u0001\u0004\u0003\u0004"+
		"\u00d1\b\u0004\u0001\u0005\u0001\u0005\u0001\u0005\u0001\u0005\u0001\u0005"+
		"\u0001\u0005\u0001\u0005\u0001\u0006\u0001\u0006\u0001\u0006\u0001\u0006"+
		"\u0001\u0006\u0001\u0006\u0001\u0006\u0001\u0006\u0001\u0007\u0001\u0007"+
		"\u0001\u0007\u0001\u0007\u0001\u0007\u0001\u0007\u0001\u0007\u0001\u0007"+
		"\u0001\u0007\u0001\u0007\u0001\u0007\u0001\b\u0001\b\u0001\b\u0001\b\u0001"+
		"\b\u0001\b\u0001\b\u0001\t\u0001\t\u0001\t\u0001\t\u0003\t\u00f8\b\t\u0001"+
		"\n\u0001\n\u0001\n\u0001\n\u0001\n\u0001\n\u0001\n\u0005\n\u0101\b\n\n"+
		"\n\f\n\u0104\t\n\u0001\n\u0001\n\u0001\n\u0001\n\u0001\u000b\u0001\u000b"+
		"\u0001\u000b\u0001\u000b\u0001\u000b\u0001\u000b\u0001\u000b\u0001\u000b"+
		"\u0001\f\u0001\f\u0001\f\u0003\f\u0115\b\f\u0001\f\u0001\f\u0001\r\u0001"+
		"\r\u0001\r\u0005\r\u011c\b\r\n\r\f\r\u011f\t\r\u0001\u000e\u0001\u000e"+
		"\u0001\u000e\u0001\u000e\u0001\u000f\u0001\u000f\u0001\u000f\u0003\u000f"+
		"\u0128\b\u000f\u0001\u000f\u0001\u000f\u0001\u000f\u0001\u000f\u0001\u0010"+
		"\u0001\u0010\u0005\u0010\u0130\b\u0010\n\u0010\f\u0010\u0133\t\u0010\u0001"+
		"\u0011\u0001\u0011\u0001\u0011\u0001\u0011\u0001\u0011\u0001\u0011\u0001"+
		"\u0011\u0001\u0011\u0001\u0011\u0003\u0011\u013e\b\u0011\u0001\u0012\u0001"+
		"\u0012\u0001\u0012\u0001\u0012\u0001\u0012\u0001\u0012\u0001\u0012\u0003"+
		"\u0012\u0147\b\u0012\u0001\u0013\u0001\u0013\u0001\u0013\u0001\u0013\u0001"+
		"\u0013\u0001\u0013\u0001\u0013\u0001\u0014\u0001\u0014\u0001\u0014\u0001"+
		"\u0014\u0001\u0014\u0001\u0014\u0001\u0015\u0001\u0015\u0001\u0015\u0001"+
		"\u0015\u0001\u0015\u0001\u0015\u0001\u0015\u0003\u0015\u015d\b\u0015\u0001"+
		"\u0016\u0001\u0016\u0001\u0016\u0001\u0016\u0001\u0017\u0001\u0017\u0001"+
		"\u0017\u0003\u0017\u0166\b\u0017\u0001\u0018\u0001\u0018\u0001\u0018\u0001"+
		"\u0019\u0001\u0019\u0001\u0019\u0001\u0019\u0001\u0019\u0001\u0019\u0001"+
		"\u0019\u0003\u0019\u0172\b\u0019\u0001\u0019\u0001\u0019\u0003\u0019\u0176"+
		"\b\u0019\u0001\u001a\u0001\u001a\u0001\u001a\u0001\u001a\u0001\u001a\u0001"+
		"\u001a\u0001\u001b\u0001\u001b\u0001\u001b\u0001\u001b\u0001\u001b\u0001"+
		"\u001b\u0001\u001c\u0001\u001c\u0003\u001c\u0186\b\u001c\u0001\u001c\u0001"+
		"\u001c\u0003\u001c\u018a\b\u001c\u0001\u001c\u0001\u001c\u0003\u001c\u018e"+
		"\b\u001c\u0001\u001d\u0001\u001d\u0001\u001d\u0001\u001d\u0001\u001d\u0003"+
		"\u001d\u0195\b\u001d\u0001\u001d\u0001\u001d\u0001\u001d\u0003\u001d\u019a"+
		"\b\u001d\u0001\u001d\u0001\u001d\u0001\u001e\u0001\u001e\u0001\u001e\u0005"+
		"\u001e\u01a1\b\u001e\n\u001e\f\u001e\u01a4\t\u001e\u0001\u001f\u0001\u001f"+
		"\u0001\u001f\u0001\u001f\u0001\u001f\u0005\u001f\u01ab\b\u001f\n\u001f"+
		"\f\u001f\u01ae\t\u001f\u0001\u001f\u0001\u001f\u0001\u001f\u0001\u001f"+
		"\u0001 \u0001 \u0001 \u0003 \u01b7\b \u0001 \u0001 \u0001!\u0001!\u0001"+
		"!\u0001!\u0001!\u0001!\u0001!\u0001!\u0001!\u0003!\u01c4\b!\u0001!\u0001"+
		"!\u0001!\u0001!\u0001!\u0001!\u0001\"\u0001\"\u0001\"\u0001\"\u0001\""+
		"\u0001\"\u0001\"\u0001\"\u0001\"\u0001\"\u0001#\u0001#\u0001#\u0001#\u0001"+
		"#\u0001#\u0001#\u0001#\u0001$\u0001$\u0001$\u0001$\u0001$\u0001$\u0001"+
		"$\u0001$\u0001$\u0001%\u0001%\u0001%\u0001%\u0001%\u0001%\u0001%\u0001"+
		"&\u0001&\u0001&\u0001&\u0004&\u01f2\b&\u000b&\f&\u01f3\u0001&\u0001&\u0001"+
		"&\u0001&\u0001&\u0001\'\u0001\'\u0001\'\u0001\'\u0001\'\u0001(\u0001("+
		"\u0001(\u0001(\u0001)\u0001)\u0001)\u0001)\u0003)\u0208\b)\u0001)\u0001"+
		")\u0001)\u0001)\u0001)\u0005)\u020f\b)\n)\f)\u0212\t)\u0001)\u0001)\u0001"+
		")\u0001)\u0001*\u0001*\u0001*\u0001*\u0001*\u0003*\u021d\b*\u0001*\u0001"+
		"*\u0001*\u0001*\u0001*\u0001*\u0001*\u0001*\u0001*\u0001*\u0001*\u0005"+
		"*\u022a\b*\n*\f*\u022d\t*\u0001*\u0001*\u0001*\u0001*\u0001+\u0001+\u0001"+
		"+\u0001+\u0001+\u0003+\u0238\b+\u0001+\u0001+\u0001+\u0001+\u0005+\u023e"+
		"\b+\n+\f+\u0241\t+\u0001+\u0001+\u0001+\u0001+\u0001,\u0001,\u0001,\u0001"+
		",\u0001,\u0001,\u0003,\u024d\b,\u0001,\u0001,\u0001,\u0001,\u0001,\u0001"+
		",\u0001,\u0005,\u0256\b,\n,\f,\u0259\t,\u0001,\u0001,\u0001,\u0001,\u0001"+
		"-\u0001-\u0001-\u0001-\u0005-\u0263\b-\n-\f-\u0266\t-\u0001.\u0001.\u0001"+
		".\u0001.\u0003.\u026c\b.\u0001.\u0001.\u0001.\u0001.\u0001.\u0001.\u0001"+
		"/\u0003/\u0275\b/\u0001/\u0001/\u0001/\u0001/\u0001/\u00010\u00010\u0001"+
		"0\u00010\u00010\u00010\u00010\u00010\u00030\u0284\b0\u00011\u00011\u0001"+
		"1\u00011\u00011\u00011\u00011\u00011\u00011\u00011\u00011\u00031\u0291"+
		"\b1\u00012\u00012\u00012\u00012\u00013\u00013\u00013\u00013\u00013\u0001"+
		"4\u00014\u00014\u00014\u00014\u00014\u00014\u00015\u00015\u00015\u0001"+
		"5\u00035\u02a7\b5\u00015\u00015\u00016\u00016\u00016\u00017\u00017\u0003"+
		"7\u02b0\b7\u00017\u00017\u00037\u02b4\b7\u00018\u00018\u00018\u00019\u0001"+
		"9\u00019\u00019\u00019\u00019\u00019\u00039\u02c0\b9\u00019\u00019\u0001"+
		":\u0001:\u0001:\u0001:\u0001:\u0001:\u0001:\u0001:\u0001:\u0003:\u02cd"+
		"\b:\u0001;\u0001;\u0001;\u0001;\u0001;\u0005;\u02d4\b;\n;\f;\u02d7\t;"+
		"\u0001;\u0001;\u0001<\u0001<\u0001<\u0001<\u0001<\u0001=\u0001=\u0003"+
		"=\u02e2\b=\u0001>\u0001>\u0001>\u0001>\u0001>\u0003>\u02e9\b>\u0001?\u0001"+
		"?\u0001?\u0001?\u0001@\u0001@\u0001@\u0001@\u0003@\u02f3\b@\u0001A\u0001"+
		"A\u0001A\u0001A\u0001A\u0001A\u0005A\u02fb\bA\nA\fA\u02fe\tA\u0001A\u0001"+
		"A\u0001B\u0001B\u0001B\u0003B\u0305\bB\u0001C\u0001C\u0001C\u0001C\u0005"+
		"C\u030b\bC\nC\fC\u030e\tC\u0001C\u0001C\u0001D\u0001D\u0001D\u0001D\u0001"+
		"D\u0001D\u0005D\u0318\bD\nD\fD\u031b\tD\u0001D\u0001D\u0001E\u0001E\u0001"+
		"E\u0001E\u0005E\u0323\bE\nE\fE\u0326\tE\u0001E\u0001E\u0001F\u0001F\u0001"+
		"F\u0001F\u0001G\u0001G\u0001G\u0001G\u0005G\u0332\bG\nG\fG\u0335\tG\u0001"+
		"G\u0001G\u0001H\u0001H\u0001H\u0001H\u0005H\u033d\bH\nH\fH\u0340\tH\u0001"+
		"H\u0001H\u0001I\u0001I\u0001I\u0001I\u0001J\u0001J\u0001J\u0001J\u0004"+
		"J\u034c\bJ\u000bJ\fJ\u034d\u0001J\u0001J\u0001K\u0001K\u0001K\u0001K\u0001"+
		"K\u0001K\u0001L\u0001L\u0001L\u0003L\u035b\bL\u0001M\u0001M\u0001N\u0001"+
		"N\u0001O\u0001O\u0001P\u0001P\u0001P\u0001P\u0001P\u0001P\u0001P\u0003"+
		"P\u036a\bP\u0001Q\u0001Q\u0001Q\u0001R\u0001R\u0001R\u0001R\u0001R\u0005"+
		"R\u0374\bR\nR\fR\u0377\tR\u0001R\u0001R\u0001S\u0001S\u0001S\u0001S\u0004"+
		"S\u037f\bS\u000bS\fS\u0380\u0001S\u0001S\u0001T\u0001T\u0001T\u0005T\u0388"+
		"\bT\nT\fT\u038b\tT\u0001U\u0001U\u0001U\u0001U\u0001U\u0001U\u0001U\u0000"+
		"\u0000V\u0000\u0002\u0004\u0006\b\n\f\u000e\u0010\u0012\u0014\u0016\u0018"+
		"\u001a\u001c\u001e \"$&(*,.02468:<>@BDFHJLNPRTVXZ\\^`bdfhjlnprtvxz|~\u0080"+
		"\u0082\u0084\u0086\u0088\u008a\u008c\u008e\u0090\u0092\u0094\u0096\u0098"+
		"\u009a\u009c\u009e\u00a0\u00a2\u00a4\u00a6\u00a8\u00aa\u0000\b\u0001\u0000"+
		"_`\u0002\u0000``dd\u0002\u0000((VV\u0004\u0000\u001a\u001a$$11``\u0003"+
		"\u0000\u0011\u0011&&UY\u0003\u0000\u0005\u0005++BB\u0002\u0000**Z^\u0001"+
		"\u0000EH\u03af\u0000\u00ac\u0001\u0000\u0000\u0000\u0002\u00b9\u0001\u0000"+
		"\u0000\u0000\u0004\u00bd\u0001\u0000\u0000\u0000\u0006\u00c0\u0001\u0000"+
		"\u0000\u0000\b\u00d0\u0001\u0000\u0000\u0000\n\u00d2\u0001\u0000\u0000"+
		"\u0000\f\u00d9\u0001\u0000\u0000\u0000\u000e\u00e1\u0001\u0000\u0000\u0000"+
		"\u0010\u00ec\u0001\u0000\u0000\u0000\u0012\u00f7\u0001\u0000\u0000\u0000"+
		"\u0014\u00f9\u0001\u0000\u0000\u0000\u0016\u0109\u0001\u0000\u0000\u0000"+
		"\u0018\u0111\u0001\u0000\u0000\u0000\u001a\u0118\u0001\u0000\u0000\u0000"+
		"\u001c\u0120\u0001\u0000\u0000\u0000\u001e\u0124\u0001\u0000\u0000\u0000"+
		" \u0131\u0001\u0000\u0000\u0000\"\u013d\u0001\u0000\u0000\u0000$\u0146"+
		"\u0001\u0000\u0000\u0000&\u0148\u0001\u0000\u0000\u0000(\u014f\u0001\u0000"+
		"\u0000\u0000*\u0155\u0001\u0000\u0000\u0000,\u015e\u0001\u0000\u0000\u0000"+
		".\u0162\u0001\u0000\u0000\u00000\u0167\u0001\u0000\u0000\u00002\u016a"+
		"\u0001\u0000\u0000\u00004\u0177\u0001\u0000\u0000\u00006\u017d\u0001\u0000"+
		"\u0000\u00008\u018d\u0001\u0000\u0000\u0000:\u0194\u0001\u0000\u0000\u0000"+
		"<\u019d\u0001\u0000\u0000\u0000>\u01a5\u0001\u0000\u0000\u0000@\u01b3"+
		"\u0001\u0000\u0000\u0000B\u01ba\u0001\u0000\u0000\u0000D\u01cb\u0001\u0000"+
		"\u0000\u0000F\u01d5\u0001\u0000\u0000\u0000H\u01dd\u0001\u0000\u0000\u0000"+
		"J\u01e6\u0001\u0000\u0000\u0000L\u01ed\u0001\u0000\u0000\u0000N\u01fa"+
		"\u0001\u0000\u0000\u0000P\u01ff\u0001\u0000\u0000\u0000R\u0203\u0001\u0000"+
		"\u0000\u0000T\u0217\u0001\u0000\u0000\u0000V\u0232\u0001\u0000\u0000\u0000"+
		"X\u0246\u0001\u0000\u0000\u0000Z\u025e\u0001\u0000\u0000\u0000\\\u0267"+
		"\u0001\u0000\u0000\u0000^\u0274\u0001\u0000\u0000\u0000`\u0283\u0001\u0000"+
		"\u0000\u0000b\u0290\u0001\u0000\u0000\u0000d\u0292\u0001\u0000\u0000\u0000"+
		"f\u0296\u0001\u0000\u0000\u0000h\u029b\u0001\u0000\u0000\u0000j\u02a2"+
		"\u0001\u0000\u0000\u0000l\u02aa\u0001\u0000\u0000\u0000n\u02af\u0001\u0000"+
		"\u0000\u0000p\u02b5\u0001\u0000\u0000\u0000r\u02b8\u0001\u0000\u0000\u0000"+
		"t\u02cc\u0001\u0000\u0000\u0000v\u02ce\u0001\u0000\u0000\u0000x\u02da"+
		"\u0001\u0000\u0000\u0000z\u02e1\u0001\u0000\u0000\u0000|\u02e8\u0001\u0000"+
		"\u0000\u0000~\u02ea\u0001\u0000\u0000\u0000\u0080\u02f2\u0001\u0000\u0000"+
		"\u0000\u0082\u02f4\u0001\u0000\u0000\u0000\u0084\u0304\u0001\u0000\u0000"+
		"\u0000\u0086\u0306\u0001\u0000\u0000\u0000\u0088\u0311\u0001\u0000\u0000"+
		"\u0000\u008a\u031e\u0001\u0000\u0000\u0000\u008c\u0329\u0001\u0000\u0000"+
		"\u0000\u008e\u032d\u0001\u0000\u0000\u0000\u0090\u0338\u0001\u0000\u0000"+
		"\u0000\u0092\u0343\u0001\u0000\u0000\u0000\u0094\u0347\u0001\u0000\u0000"+
		"\u0000\u0096\u0351\u0001\u0000\u0000\u0000\u0098\u035a\u0001\u0000\u0000"+
		"\u0000\u009a\u035c\u0001\u0000\u0000\u0000\u009c\u035e\u0001\u0000\u0000"+
		"\u0000\u009e\u0360\u0001\u0000\u0000\u0000\u00a0\u0369\u0001\u0000\u0000"+
		"\u0000\u00a2\u036b\u0001\u0000\u0000\u0000\u00a4\u036e\u0001\u0000\u0000"+
		"\u0000\u00a6\u037a\u0001\u0000\u0000\u0000\u00a8\u0384\u0001\u0000\u0000"+
		"\u0000\u00aa\u038c\u0001\u0000\u0000\u0000\u00ac\u00b0\u0003\u0002\u0001"+
		"\u0000\u00ad\u00af\u0003\u0004\u0002\u0000\u00ae\u00ad\u0001\u0000\u0000"+
		"\u0000\u00af\u00b2\u0001\u0000\u0000\u0000\u00b0\u00ae\u0001\u0000\u0000"+
		"\u0000\u00b0\u00b1\u0001\u0000\u0000\u0000\u00b1\u00b6\u0001\u0000\u0000"+
		"\u0000\u00b2\u00b0\u0001\u0000\u0000\u0000\u00b3\u00b5\u0003\b\u0004\u0000"+
		"\u00b4\u00b3\u0001\u0000\u0000\u0000\u00b5\u00b8\u0001\u0000\u0000\u0000"+
		"\u00b6\u00b4\u0001\u0000\u0000\u0000\u00b6\u00b7\u0001\u0000\u0000\u0000"+
		"\u00b7\u0001\u0001\u0000\u0000\u0000\u00b8\u00b6\u0001\u0000\u0000\u0000"+
		"\u00b9\u00ba\u0005\u0003\u0000\u0000\u00ba\u00bb\u0005f\u0000\u0000\u00bb"+
		"\u00bc\u0005\u0001\u0000\u0000\u00bc\u0003\u0001\u0000\u0000\u0000\u00bd"+
		"\u00be\u0005\u001d\u0000\u0000\u00be\u00bf\u0003\u0006\u0003\u0000\u00bf"+
		"\u0005\u0001\u0000\u0000\u0000\u00c0\u00c5\u0007\u0000\u0000\u0000\u00c1"+
		"\u00c2\u0005R\u0000\u0000\u00c2\u00c4\u0007\u0000\u0000\u0000\u00c3\u00c1"+
		"\u0001\u0000\u0000\u0000\u00c4\u00c7\u0001\u0000\u0000\u0000\u00c5\u00c3"+
		"\u0001\u0000\u0000\u0000\u00c5\u00c6\u0001\u0000\u0000\u0000\u00c6\u0007"+
		"\u0001\u0000\u0000\u0000\u00c7\u00c5\u0001\u0000\u0000\u0000\u00c8\u00d1"+
		"\u0003\n\u0005\u0000\u00c9\u00d1\u0003\f\u0006\u0000\u00ca\u00d1\u0003"+
		"\u000e\u0007\u0000\u00cb\u00d1\u0003\u0010\b\u0000\u00cc\u00d1\u0003\u0014"+
		"\n\u0000\u00cd\u00d1\u0003\u0012\t\u0000\u00ce\u00d1\u0003\u0016\u000b"+
		"\u0000\u00cf\u00d1\u0003\u0002\u0001\u0000\u00d0\u00c8\u0001\u0000\u0000"+
		"\u0000\u00d0\u00c9\u0001\u0000\u0000\u0000\u00d0\u00ca\u0001\u0000\u0000"+
		"\u0000\u00d0\u00cb\u0001\u0000\u0000\u0000\u00d0\u00cc\u0001\u0000\u0000"+
		"\u0000\u00d0\u00cd\u0001\u0000\u0000\u0000\u00d0\u00ce\u0001\u0000\u0000"+
		"\u0000\u00d0\u00cf\u0001\u0000\u0000\u0000\u00d1\t\u0001\u0000\u0000\u0000"+
		"\u00d2\u00d3\u0005\u0001\u0000\u0000\u00d3\u00d4\u0005%\u0000\u0000\u00d4"+
		"\u00d5\u0003 \u0010\u0000\u00d5\u00d6\u0005\u0001\u0000\u0000\u00d6\u00d7"+
		"\u0005\u0015\u0000\u0000\u00d7\u00d8\u0005%\u0000\u0000\u00d8\u000b\u0001"+
		"\u0000\u0000\u0000\u00d9\u00da\u0005\u0001\u0000\u0000\u00da\u00db\u0005"+
		"0\u0000\u0000\u00db\u00dc\u0003\u0018\f\u0000\u00dc\u00dd\u0003 \u0010"+
		"\u0000\u00dd\u00de\u0005\u0001\u0000\u0000\u00de\u00df\u0005\u0015\u0000"+
		"\u0000\u00df\u00e0\u00050\u0000\u0000\u00e0\r\u0001\u0000\u0000\u0000"+
		"\u00e1\u00e2\u0005\u0001\u0000\u0000\u00e2\u00e3\u0005\u0019\u0000\u0000"+
		"\u00e3\u00e4\u0003\u001e\u000f\u0000\u00e4\u00e5\u0003 \u0010\u0000\u00e5"+
		"\u00e6\u0005\u0001\u0000\u0000\u00e6\u00e7\u00053\u0000\u0000\u00e7\u00e8"+
		"\u0003`0\u0000\u00e8\u00e9\u0005\u0001\u0000\u0000\u00e9\u00ea\u0005\u0015"+
		"\u0000\u0000\u00ea\u00eb\u0005\u0019\u0000\u0000\u00eb\u000f\u0001\u0000"+
		"\u0000\u0000\u00ec\u00ed\u0005\u0001\u0000\u0000\u00ed\u00ee\u0005\r\u0000"+
		"\u0000\u00ee\u00ef\u0005`\u0000\u0000\u00ef\u00f0\u00054\u0000\u0000\u00f0"+
		"\u00f1\u0005<\u0000\u0000\u00f1\u00f2\u0003z=\u0000\u00f2\u0011\u0001"+
		"\u0000\u0000\u0000\u00f3\u00f8\u0003R)\u0000\u00f4\u00f8\u0003T*\u0000"+
		"\u00f5\u00f8\u0003V+\u0000\u00f6\u00f8\u0003X,\u0000\u00f7\u00f3\u0001"+
		"\u0000\u0000\u0000\u00f7\u00f4\u0001\u0000\u0000\u0000\u00f7\u00f5\u0001"+
		"\u0000\u0000\u0000\u00f7\u00f6\u0001\u0000\u0000\u0000\u00f8\u0013\u0001"+
		"\u0000\u0000\u0000\u00f9\u00fa\u0005\u0001\u0000\u0000\u00fa\u00fb\u0005"+
		"\u0016\u0000\u0000\u00fb\u00fc\u0005_\u0000\u0000\u00fc\u00fd\u0005\u0001"+
		"\u0000\u0000\u00fd\u0102\u0005`\u0000\u0000\u00fe\u00ff\u0005S\u0000\u0000"+
		"\u00ff\u0101\u0005`\u0000\u0000\u0100\u00fe\u0001\u0000\u0000\u0000\u0101"+
		"\u0104\u0001\u0000\u0000\u0000\u0102\u0100\u0001\u0000\u0000\u0000\u0102"+
		"\u0103\u0001\u0000\u0000\u0000\u0103\u0105\u0001\u0000\u0000\u0000\u0104"+
		"\u0102\u0001\u0000\u0000\u0000\u0105\u0106\u0005\u0001\u0000\u0000\u0106"+
		"\u0107\u0005\u0015\u0000\u0000\u0107\u0108\u0005\u0016\u0000\u0000\u0108"+
		"\u0015\u0001\u0000\u0000\u0000\u0109\u010a\u0005\u0001\u0000\u0000\u010a"+
		"\u010b\u00058\u0000\u0000\u010b\u010c\u0005`\u0000\u0000\u010c\u010d\u0003"+
		" \u0010\u0000\u010d\u010e\u0005\u0001\u0000\u0000\u010e\u010f\u0005\u0015"+
		"\u0000\u0000\u010f\u0110\u00058\u0000\u0000\u0110\u0017\u0001\u0000\u0000"+
		"\u0000\u0111\u0112\u0005`\u0000\u0000\u0112\u0114\u0005O\u0000\u0000\u0113"+
		"\u0115\u0003\u001a\r\u0000\u0114\u0113\u0001\u0000\u0000\u0000\u0114\u0115"+
		"\u0001\u0000\u0000\u0000\u0115\u0116\u0001\u0000\u0000\u0000\u0116\u0117"+
		"\u0005P\u0000\u0000\u0117\u0019\u0001\u0000\u0000\u0000\u0118\u011d\u0003"+
		"\u001c\u000e\u0000\u0119\u011a\u0005S\u0000\u0000\u011a\u011c\u0003\u001c"+
		"\u000e\u0000\u011b\u0119\u0001\u0000\u0000\u0000\u011c\u011f\u0001\u0000"+
		"\u0000\u0000\u011d\u011b\u0001\u0000\u0000\u0000\u011d\u011e\u0001\u0000"+
		"\u0000\u0000\u011e\u001b\u0001\u0000\u0000\u0000\u011f\u011d\u0001\u0000"+
		"\u0000\u0000\u0120\u0121\u0005`\u0000\u0000\u0121\u0122\u0005\u0006\u0000"+
		"\u0000\u0122\u0123\u0003\u00a0P\u0000\u0123\u001d\u0001\u0000\u0000\u0000"+
		"\u0124\u0125\u0005`\u0000\u0000\u0125\u0127\u0005O\u0000\u0000\u0126\u0128"+
		"\u0003\u001a\r\u0000\u0127\u0126\u0001\u0000\u0000\u0000\u0127\u0128\u0001"+
		"\u0000\u0000\u0000\u0128\u0129\u0001\u0000\u0000\u0000\u0129\u012a\u0005"+
		"P\u0000\u0000\u012a\u012b\u00053\u0000\u0000\u012b\u012c\u0003\u00a0P"+
		"\u0000\u012c\u001f\u0001\u0000\u0000\u0000\u012d\u0130\u0003\"\u0011\u0000"+
		"\u012e\u0130\u0003$\u0012\u0000\u012f\u012d\u0001\u0000\u0000\u0000\u012f"+
		"\u012e\u0001\u0000\u0000\u0000\u0130\u0133\u0001\u0000\u0000\u0000\u0131"+
		"\u012f\u0001\u0000\u0000\u0000\u0131\u0132\u0001\u0000\u0000\u0000\u0132"+
		"!\u0001\u0000\u0000\u0000\u0133\u0131\u0001\u0000\u0000\u0000\u0134\u013e"+
		"\u0003&\u0013\u0000\u0135\u013e\u00036\u001b\u0000\u0136\u013e\u0003("+
		"\u0014\u0000\u0137\u013e\u0003*\u0015\u0000\u0138\u013e\u0003,\u0016\u0000"+
		"\u0139\u013e\u0003.\u0017\u0000\u013a\u013e\u00030\u0018\u0000\u013b\u013e"+
		"\u00032\u0019\u0000\u013c\u013e\u00034\u001a\u0000\u013d\u0134\u0001\u0000"+
		"\u0000\u0000\u013d\u0135\u0001\u0000\u0000\u0000\u013d\u0136\u0001\u0000"+
		"\u0000\u0000\u013d\u0137\u0001\u0000\u0000\u0000\u013d\u0138\u0001\u0000"+
		"\u0000\u0000\u013d\u0139\u0001\u0000\u0000\u0000\u013d\u013a\u0001\u0000"+
		"\u0000\u0000\u013d\u013b\u0001\u0000\u0000\u0000\u013d\u013c\u0001\u0000"+
		"\u0000\u0000\u013e#\u0001\u0000\u0000\u0000\u013f\u0147\u0003>\u001f\u0000"+
		"\u0140\u0147\u0003B!\u0000\u0141\u0147\u0003D\"\u0000\u0142\u0147\u0003"+
		"F#\u0000\u0143\u0147\u0003H$\u0000\u0144\u0147\u0003J%\u0000\u0145\u0147"+
		"\u0003L&\u0000\u0146\u013f\u0001\u0000\u0000\u0000\u0146\u0140\u0001\u0000"+
		"\u0000\u0000\u0146\u0141\u0001\u0000\u0000\u0000\u0146\u0142\u0001\u0000"+
		"\u0000\u0000\u0146\u0143\u0001\u0000\u0000\u0000\u0146\u0144\u0001\u0000"+
		"\u0000\u0000\u0146\u0145\u0001\u0000\u0000\u0000\u0147%\u0001\u0000\u0000"+
		"\u0000\u0148\u0149\u0005\u0001\u0000\u0000\u0149\u014a\u0005>\u0000\u0000"+
		"\u014a\u014b\u00038\u001c\u0000\u014b\u014c\u00054\u0000\u0000\u014c\u014d"+
		"\u0005<\u0000\u0000\u014d\u014e\u0003`0\u0000\u014e\'\u0001\u0000\u0000"+
		"\u0000\u014f\u0150\u0005\u0001\u0000\u0000\u0150\u0151\u00054\u0000\u0000"+
		"\u0151\u0152\u00038\u001c\u0000\u0152\u0153\u0005<\u0000\u0000\u0153\u0154"+
		"\u0003`0\u0000\u0154)\u0001\u0000\u0000\u0000\u0155\u0156\u0005\u0001"+
		"\u0000\u0000\u0156\u015c\u0005\t\u0000\u0000\u0157\u015d\u0003:\u001d"+
		"\u0000\u0158\u0159\u00038\u001c\u0000\u0159\u015a\u0005R\u0000\u0000\u015a"+
		"\u015b\u0003:\u001d\u0000\u015b\u015d\u0001\u0000\u0000\u0000\u015c\u0157"+
		"\u0001\u0000\u0000\u0000\u015c\u0158\u0001\u0000\u0000\u0000\u015d+\u0001"+
		"\u0000\u0000\u0000\u015e\u015f\u0005\u0001\u0000\u0000\u015f\u0160\u0005"+
		";\u0000\u0000\u0160\u0161\u0007\u0001\u0000\u0000\u0161-\u0001\u0000\u0000"+
		"\u0000\u0162\u0163\u0005\u0001\u0000\u0000\u0163\u0165\u0005.\u0000\u0000"+
		"\u0164\u0166\u0003`0\u0000\u0165\u0164\u0001\u0000\u0000\u0000\u0165\u0166"+
		"\u0001\u0000\u0000\u0000\u0166/\u0001\u0000\u0000\u0000\u0167\u0168\u0005"+
		"!\u0000\u0000\u0168\u0169\u00038\u001c\u0000\u01691\u0001\u0000\u0000"+
		"\u0000\u016a\u016b\u0005\u0001\u0000\u0000\u016b\u0171\u0005\u0014\u0000"+
		"\u0000\u016c\u0172\u0003:\u001d\u0000\u016d\u016e\u00038\u001c\u0000\u016e"+
		"\u016f\u0005R\u0000\u0000\u016f\u0170\u0003:\u001d\u0000\u0170\u0172\u0001"+
		"\u0000\u0000\u0000\u0171\u016c\u0001\u0000\u0000\u0000\u0171\u016d\u0001"+
		"\u0000\u0000\u0000\u0172\u0175\u0001\u0000\u0000\u0000\u0173\u0174\u0005"+
		"\u001f\u0000\u0000\u0174\u0176\u00038\u001c\u0000\u0175\u0173\u0001\u0000"+
		"\u0000\u0000\u0175\u0176\u0001\u0000\u0000\u0000\u01763\u0001\u0000\u0000"+
		"\u0000\u0177\u0178\u0005\u0001\u0000\u0000\u0178\u0179\u0005\b\u0000\u0000"+
		"\u0179\u017a\u0003`0\u0000\u017a\u017b\u0005*\u0000\u0000\u017b\u017c"+
		"\u0003z=\u0000\u017c5\u0001\u0000\u0000\u0000\u017d\u017e\u0005\u0001"+
		"\u0000\u0000\u017e\u017f\u0005#\u0000\u0000\u017f\u0180\u0005`\u0000\u0000"+
		"\u0180\u0181\u0005\u0007\u0000\u0000\u0181\u0182\u0003`0\u0000\u01827"+
		"\u0001\u0000\u0000\u0000\u0183\u0184\u00051\u0000\u0000\u0184\u0186\u0005"+
		"R\u0000\u0000\u0185\u0183\u0001\u0000\u0000\u0000\u0185\u0186\u0001\u0000"+
		"\u0000\u0000\u0186\u0187\u0001\u0000\u0000\u0000\u0187\u0189\u0005`\u0000"+
		"\u0000\u0188\u018a\u0003r9\u0000\u0189\u0188\u0001\u0000\u0000\u0000\u0189"+
		"\u018a\u0001\u0000\u0000\u0000\u018a\u018e\u0001\u0000\u0000\u0000\u018b"+
		"\u018e\u0003\u0094J\u0000\u018c\u018e\u0003\u0096K\u0000\u018d\u0185\u0001"+
		"\u0000\u0000\u0000\u018d\u018b\u0001\u0000\u0000\u0000\u018d\u018c\u0001"+
		"\u0000\u0000\u0000\u018e9\u0001\u0000\u0000\u0000\u018f\u0195\u00051\u0000"+
		"\u0000\u0190\u0195\u0005\u001a\u0000\u0000\u0191\u0195\u0005$\u0000\u0000"+
		"\u0192\u0193\u0005`\u0000\u0000\u0193\u0195\u0005R\u0000\u0000\u0194\u018f"+
		"\u0001\u0000\u0000\u0000\u0194\u0190\u0001\u0000\u0000\u0000\u0194\u0191"+
		"\u0001\u0000\u0000\u0000\u0194\u0192\u0001\u0000\u0000\u0000\u0194\u0195"+
		"\u0001\u0000\u0000\u0000\u0195\u0196\u0001\u0000\u0000\u0000\u0196\u0197"+
		"\u0005`\u0000\u0000\u0197\u0199\u0005O\u0000\u0000\u0198\u019a\u0003<"+
		"\u001e\u0000\u0199\u0198\u0001\u0000\u0000\u0000\u0199\u019a\u0001\u0000"+
		"\u0000\u0000\u019a\u019b\u0001\u0000\u0000\u0000\u019b\u019c\u0005P\u0000"+
		"\u0000\u019c;\u0001\u0000\u0000\u0000\u019d\u01a2\u0003`0\u0000\u019e"+
		"\u019f\u0005S\u0000\u0000\u019f\u01a1\u0003`0\u0000\u01a0\u019e\u0001"+
		"\u0000\u0000\u0000\u01a1\u01a4\u0001\u0000\u0000\u0000\u01a2\u01a0\u0001"+
		"\u0000\u0000\u0000\u01a2\u01a3\u0001\u0000\u0000\u0000\u01a3=\u0001\u0000"+
		"\u0000\u0000\u01a4\u01a2\u0001\u0000\u0000\u0000\u01a5\u01a6\u0005\u0001"+
		"\u0000\u0000\u01a6\u01a7\u0005\u001b\u0000\u0000\u01a7\u01a8\u0003`0\u0000"+
		"\u01a8\u01ac\u0003 \u0010\u0000\u01a9\u01ab\u0003@ \u0000\u01aa\u01a9"+
		"\u0001\u0000\u0000\u0000\u01ab\u01ae\u0001\u0000\u0000\u0000\u01ac\u01aa"+
		"\u0001\u0000\u0000\u0000\u01ac\u01ad\u0001\u0000\u0000\u0000\u01ad\u01af"+
		"\u0001\u0000\u0000\u0000\u01ae\u01ac\u0001\u0000\u0000\u0000\u01af\u01b0"+
		"\u0005\u0001\u0000\u0000\u01b0\u01b1\u0005\u0015\u0000\u0000\u01b1\u01b2"+
		"\u0005\u001b\u0000\u0000\u01b2?\u0001\u0000\u0000\u0000\u01b3\u01b6\u0005"+
		"\u0013\u0000\u0000\u01b4\u01b5\u0005\u001b\u0000\u0000\u01b5\u01b7\u0003"+
		"`0\u0000\u01b6\u01b4\u0001\u0000\u0000\u0000\u01b6\u01b7\u0001\u0000\u0000"+
		"\u0000\u01b7\u01b8\u0001\u0000\u0000\u0000\u01b8\u01b9\u0003 \u0010\u0000"+
		"\u01b9A\u0001\u0000\u0000\u0000\u01ba\u01bb\u0005\u0001\u0000\u0000\u01bb"+
		"\u01bc\u0005\u0017\u0000\u0000\u01bc\u01bd\u0005`\u0000\u0000\u01bd\u01be"+
		"\u0005\u0018\u0000\u0000\u01be\u01bf\u0003`0\u0000\u01bf\u01c0\u0005<"+
		"\u0000\u0000\u01c0\u01c1\u0003`0\u0000\u01c1\u01c3\u00055\u0000\u0000"+
		"\u01c2\u01c4\u0005V\u0000\u0000\u01c3\u01c2\u0001\u0000\u0000\u0000\u01c3"+
		"\u01c4\u0001\u0000\u0000\u0000\u01c4\u01c5\u0001\u0000\u0000\u0000\u01c5"+
		"\u01c6\u0005a\u0000\u0000\u01c6\u01c7\u0003 \u0010\u0000\u01c7\u01c8\u0005"+
		"\u0001\u0000\u0000\u01c8\u01c9\u0005\u0015\u0000\u0000\u01c9\u01ca\u0005"+
		"\u0017\u0000\u0000\u01caC\u0001\u0000\u0000\u0000\u01cb\u01cc\u0005\u0001"+
		"\u0000\u0000\u01cc\u01cd\u0005\u0012\u0000\u0000\u01cd\u01ce\u0005`\u0000"+
		"\u0000\u01ce\u01cf\u0005\u001e\u0000\u0000\u01cf\u01d0\u0003`0\u0000\u01d0"+
		"\u01d1\u0003 \u0010\u0000\u01d1\u01d2\u0005\u0001\u0000\u0000\u01d2\u01d3"+
		"\u0005\u0015\u0000\u0000\u01d3\u01d4\u0005\u0012\u0000\u0000\u01d4E\u0001"+
		"\u0000\u0000\u0000\u01d5\u01d6\u0005\u0001\u0000\u0000\u01d6\u01d7\u0005"+
		"@\u0000\u0000\u01d7\u01d8\u0003`0\u0000\u01d8\u01d9\u0003 \u0010\u0000"+
		"\u01d9\u01da\u0005\u0001\u0000\u0000\u01da\u01db\u0005\u0015\u0000\u0000"+
		"\u01db\u01dc\u0005@\u0000\u0000\u01dcG\u0001\u0000\u0000\u0000\u01dd\u01de"+
		"\u0005\u0001\u0000\u0000\u01de\u01df\u00052\u0000\u0000\u01df\u01e0\u0003"+
		" \u0010\u0000\u01e0\u01e1\u0005\u0001\u0000\u0000\u01e1\u01e2\u0005\u0015"+
		"\u0000\u0000\u01e2\u01e3\u00052\u0000\u0000\u01e3\u01e4\u0005?\u0000\u0000"+
		"\u01e4\u01e5\u0003`0\u0000\u01e5I\u0001\u0000\u0000\u0000\u01e6\u01e7"+
		"\u0005\u0001\u0000\u0000\u01e7\u01e8\u0005=\u0000\u0000\u01e8\u01e9\u0003"+
		" \u0010\u0000\u01e9\u01ea\u0005\u0001\u0000\u0000\u01ea\u01eb\u0005\u0015"+
		"\u0000\u0000\u01eb\u01ec\u0005=\u0000\u0000\u01ecK\u0001\u0000\u0000\u0000"+
		"\u01ed\u01ee\u0005\u0001\u0000\u0000\u01ee\u01ef\u00056\u0000\u0000\u01ef"+
		"\u01f1\u0003`0\u0000\u01f0\u01f2\u0003N\'\u0000\u01f1\u01f0\u0001\u0000"+
		"\u0000\u0000\u01f2\u01f3\u0001\u0000\u0000\u0000\u01f3\u01f1\u0001\u0000"+
		"\u0000\u0000\u01f3\u01f4\u0001\u0000\u0000\u0000\u01f4\u01f5\u0001\u0000"+
		"\u0000\u0000\u01f5\u01f6\u0003P(\u0000\u01f6\u01f7\u0005\u0001\u0000\u0000"+
		"\u01f7\u01f8\u0005\u0015\u0000\u0000\u01f8\u01f9\u00056\u0000\u0000\u01f9"+
		"M\u0001\u0000\u0000\u0000\u01fa\u01fb\u0005\u0001\u0000\u0000\u01fb\u01fc"+
		"\u0005\n\u0000\u0000\u01fc\u01fd\u0003|>\u0000\u01fd\u01fe\u0003 \u0010"+
		"\u0000\u01feO\u0001\u0000\u0000\u0000\u01ff\u0200\u0005\u0001\u0000\u0000"+
		"\u0200\u0201\u0005\u0010\u0000\u0000\u0201\u0202\u0003 \u0010\u0000\u0202"+
		"Q\u0001\u0000\u0000\u0000\u0203\u0204\u0005\u0001\u0000\u0000\u0204\u0205"+
		"\u0005\f\u0000\u0000\u0205\u0207\u0005_\u0000\u0000\u0206\u0208\u0003"+
		"Z-\u0000\u0207\u0206\u0001\u0000\u0000\u0000\u0207\u0208\u0001\u0000\u0000"+
		"\u0000\u0208\u0209\u0001\u0000\u0000\u0000\u0209\u0210\u0003\\.\u0000"+
		"\u020a\u020b\u0005\u0001\u0000\u0000\u020b\u020f\u0003^/\u0000\u020c\u020f"+
		"\u0003\u000e\u0007\u0000\u020d\u020f\u0003\f\u0006\u0000\u020e\u020a\u0001"+
		"\u0000\u0000\u0000\u020e\u020c\u0001\u0000\u0000\u0000\u020e\u020d\u0001"+
		"\u0000\u0000\u0000\u020f\u0212\u0001\u0000\u0000\u0000\u0210\u020e\u0001"+
		"\u0000\u0000\u0000\u0210\u0211\u0001\u0000\u0000\u0000\u0211\u0213\u0001"+
		"\u0000\u0000\u0000\u0212\u0210\u0001\u0000\u0000\u0000\u0213\u0214\u0005"+
		"\u0001\u0000\u0000\u0214\u0215\u0005\u0015\u0000\u0000\u0215\u0216\u0005"+
		"\f\u0000\u0000\u0216S\u0001\u0000\u0000\u0000\u0217\u0218\u0005\u0001"+
		"\u0000\u0000\u0218\u0219\u0005\u0004\u0000\u0000\u0219\u021a\u0005\f\u0000"+
		"\u0000\u021a\u021c\u0005_\u0000\u0000\u021b\u021d\u0003Z-\u0000\u021c"+
		"\u021b\u0001\u0000\u0000\u0000\u021c\u021d\u0001\u0000\u0000\u0000\u021d"+
		"\u022b\u0001\u0000\u0000\u0000\u021e\u021f\u0005\u0001\u0000\u0000\u021f"+
		"\u0220\u0005\u0004\u0000\u0000\u0220\u022a\u0003^/\u0000\u0221\u0222\u0005"+
		"\u0001\u0000\u0000\u0222\u0223\u0005\u0004\u0000\u0000\u0223\u0224\u0005"+
		"\u0019\u0000\u0000\u0224\u022a\u0003\u001e\u000f\u0000\u0225\u0226\u0005"+
		"\u0001\u0000\u0000\u0226\u0227\u0005\u0004\u0000\u0000\u0227\u0228\u0005"+
		"0\u0000\u0000\u0228\u022a\u0003\u0018\f\u0000\u0229\u021e\u0001\u0000"+
		"\u0000\u0000\u0229\u0221\u0001\u0000\u0000\u0000\u0229\u0225\u0001\u0000"+
		"\u0000\u0000\u022a\u022d\u0001\u0000\u0000\u0000\u022b\u0229\u0001\u0000"+
		"\u0000\u0000\u022b\u022c\u0001\u0000\u0000\u0000\u022c\u022e\u0001\u0000"+
		"\u0000\u0000\u022d\u022b\u0001\u0000\u0000\u0000\u022e\u022f\u0005\u0001"+
		"\u0000\u0000\u022f\u0230\u0005\u0015\u0000\u0000\u0230\u0231\u0005\f\u0000"+
		"\u0000\u0231U\u0001\u0000\u0000\u0000\u0232\u0233\u0005\u0001\u0000\u0000"+
		"\u0233\u0234\u0005\u001c\u0000\u0000\u0234\u0235\u0005\f\u0000\u0000\u0235"+
		"\u0237\u0005_\u0000\u0000\u0236\u0238\u0003Z-\u0000\u0237\u0236\u0001"+
		"\u0000\u0000\u0000\u0237\u0238\u0001\u0000\u0000\u0000\u0238\u0239\u0001"+
		"\u0000\u0000\u0000\u0239\u023f\u0003\\.\u0000\u023a\u023b\u0005\u0001"+
		"\u0000\u0000\u023b\u023e\u0003^/\u0000\u023c\u023e\u0003\u000e\u0007\u0000"+
		"\u023d\u023a\u0001\u0000\u0000\u0000\u023d\u023c\u0001\u0000\u0000\u0000"+
		"\u023e\u0241\u0001\u0000\u0000\u0000\u023f\u023d\u0001\u0000\u0000\u0000"+
		"\u023f\u0240\u0001\u0000\u0000\u0000\u0240\u0242\u0001\u0000\u0000\u0000"+
		"\u0241\u023f\u0001\u0000\u0000\u0000\u0242\u0243\u0005\u0001\u0000\u0000"+
		"\u0243\u0244\u0005\u0015\u0000\u0000\u0244\u0245\u0005\f\u0000\u0000\u0245"+
		"W\u0001\u0000\u0000\u0000\u0246\u0247\u0005\u0001\u0000\u0000\u0247\u0248"+
		"\u0005\u0004\u0000\u0000\u0248\u0249\u0005\u001c\u0000\u0000\u0249\u024a"+
		"\u0005\f\u0000\u0000\u024a\u024c\u0005_\u0000\u0000\u024b\u024d\u0003"+
		"Z-\u0000\u024c\u024b\u0001\u0000\u0000\u0000\u024c\u024d\u0001\u0000\u0000"+
		"\u0000\u024d\u0257\u0001\u0000\u0000\u0000\u024e\u024f\u0005\u0001\u0000"+
		"\u0000\u024f\u0250\u0005\u0004\u0000\u0000\u0250\u0256\u0003^/\u0000\u0251"+
		"\u0252\u0005\u0001\u0000\u0000\u0252\u0253\u0005\u0004\u0000\u0000\u0253"+
		"\u0254\u0005\u0019\u0000\u0000\u0254\u0256\u0003\u001e\u000f\u0000\u0255"+
		"\u024e\u0001\u0000\u0000\u0000\u0255\u0251\u0001\u0000\u0000\u0000\u0256"+
		"\u0259\u0001\u0000\u0000\u0000\u0257\u0255\u0001\u0000\u0000\u0000\u0257"+
		"\u0258\u0001\u0000\u0000\u0000\u0258\u025a\u0001\u0000\u0000\u0000\u0259"+
		"\u0257\u0001\u0000\u0000\u0000\u025a\u025b\u0005\u0001\u0000\u0000\u025b"+
		"\u025c\u0005\u0015\u0000\u0000\u025c\u025d\u0005\f\u0000\u0000\u025dY"+
		"\u0001\u0000\u0000\u0000\u025e\u025f\u0005 \u0000\u0000\u025f\u0264\u0003"+
		"\u00a0P\u0000\u0260\u0261\u0005S\u0000\u0000\u0261\u0263\u0003\u00a0P"+
		"\u0000\u0262\u0260\u0001\u0000\u0000\u0000\u0263\u0266\u0001\u0000\u0000"+
		"\u0000\u0264\u0262\u0001\u0000\u0000\u0000\u0264\u0265\u0001\u0000\u0000"+
		"\u0000\u0265[\u0001\u0000\u0000\u0000\u0266\u0264\u0001\u0000\u0000\u0000"+
		"\u0267\u0268\u0005\u0001\u0000\u0000\u0268\u0269\u0005\u000e\u0000\u0000"+
		"\u0269\u026b\u0005O\u0000\u0000\u026a\u026c\u0003\u001a\r\u0000\u026b"+
		"\u026a\u0001\u0000\u0000\u0000\u026b\u026c\u0001\u0000\u0000\u0000\u026c"+
		"\u026d\u0001\u0000\u0000\u0000\u026d\u026e\u0005P\u0000\u0000\u026e\u026f"+
		"\u0003 \u0010\u0000\u026f\u0270\u0005\u0001\u0000\u0000\u0270\u0271\u0005"+
		"\u0015\u0000\u0000\u0271\u0272\u0005\u000e\u0000\u0000\u0272]\u0001\u0000"+
		"\u0000\u0000\u0273\u0275\u0005/\u0000\u0000\u0274\u0273\u0001\u0000\u0000"+
		"\u0000\u0274\u0275\u0001\u0000\u0000\u0000\u0275\u0276\u0001\u0000\u0000"+
		"\u0000\u0276\u0277\u00051\u0000\u0000\u0277\u0278\u0005`\u0000\u0000\u0278"+
		"\u0279\u0005\u0006\u0000\u0000\u0279\u027a\u0003\u00a0P\u0000\u027a_\u0001"+
		"\u0000\u0000\u0000\u027b\u0284\u0003b1\u0000\u027c\u027d\u0003b1\u0000"+
		"\u027d\u027e\u0003\u0098L\u0000\u027e\u027f\u0003`0\u0000\u027f\u0284"+
		"\u0001\u0000\u0000\u0000\u0280\u0281\u0003b1\u0000\u0281\u0282\u0003v"+
		";\u0000\u0282\u0284\u0001\u0000\u0000\u0000\u0283\u027b\u0001\u0000\u0000"+
		"\u0000\u0283\u027c\u0001\u0000\u0000\u0000\u0283\u0280\u0001\u0000\u0000"+
		"\u0000\u0284a\u0001\u0000\u0000\u0000\u0285\u0291\u0003d2\u0000\u0286"+
		"\u0291\u0003f3\u0000\u0287\u0291\u0003h4\u0000\u0288\u0291\u0003j5\u0000"+
		"\u0289\u0291\u0003l6\u0000\u028a\u0291\u0003z=\u0000\u028b\u0291\u0003"+
		"n7\u0000\u028c\u0291\u0005:\u0000\u0000\u028d\u0291\u0003p8\u0000\u028e"+
		"\u0291\u0003:\u001d\u0000\u028f\u0291\u0003\u0084B\u0000\u0290\u0285\u0001"+
		"\u0000\u0000\u0000\u0290\u0286\u0001\u0000\u0000\u0000\u0290\u0287\u0001"+
		"\u0000\u0000\u0000\u0290\u0288\u0001\u0000\u0000\u0000\u0290\u0289\u0001"+
		"\u0000\u0000\u0000\u0290\u028a\u0001\u0000\u0000\u0000\u0290\u028b\u0001"+
		"\u0000\u0000\u0000\u0290\u028c\u0001\u0000\u0000\u0000\u0290\u028d\u0001"+
		"\u0000\u0000\u0000\u0290\u028e\u0001\u0000\u0000\u0000\u0290\u028f\u0001"+
		"\u0000\u0000\u0000\u0291c\u0001\u0000\u0000\u0000\u0292\u0293\u0005O\u0000"+
		"\u0000\u0293\u0294\u0003`0\u0000\u0294\u0295\u0005P\u0000\u0000\u0295"+
		"e\u0001\u0000\u0000\u0000\u0296\u0297\u0005\"\u0000\u0000\u0297\u0298"+
		"\u0003\u001a\r\u0000\u0298\u0299\u0005J\u0000\u0000\u0299\u029a\u0003"+
		"`0\u0000\u029ag\u0001\u0000\u0000\u0000\u029b\u029c\u0005\u001b\u0000"+
		"\u0000\u029c\u029d\u0003`0\u0000\u029d\u029e\u00059\u0000\u0000\u029e"+
		"\u029f\u0003`0\u0000\u029f\u02a0\u0005\u0013\u0000\u0000\u02a0\u02a1\u0003"+
		"`0\u0000\u02a1i\u0001\u0000\u0000\u0000\u02a2\u02a3\u0005\'\u0000\u0000"+
		"\u02a3\u02a4\u0003\u00a0P\u0000\u02a4\u02a6\u0005O\u0000\u0000\u02a5\u02a7"+
		"\u0003<\u001e\u0000\u02a6\u02a5\u0001\u0000\u0000\u0000\u02a6\u02a7\u0001"+
		"\u0000\u0000\u0000\u02a7\u02a8\u0001\u0000\u0000\u0000\u02a8\u02a9\u0005"+
		"P\u0000\u0000\u02a9k\u0001\u0000\u0000\u0000\u02aa\u02ab\u0007\u0002\u0000"+
		"\u0000\u02ab\u02ac\u0003b1\u0000\u02acm\u0001\u0000\u0000\u0000\u02ad"+
		"\u02ae\u0007\u0003\u0000\u0000\u02ae\u02b0\u0005R\u0000\u0000\u02af\u02ad"+
		"\u0001\u0000\u0000\u0000\u02af\u02b0\u0001\u0000\u0000\u0000\u02b0\u02b1"+
		"\u0001\u0000\u0000\u0000\u02b1\u02b3\u0005`\u0000\u0000\u02b2\u02b4\u0003"+
		"r9\u0000\u02b3\u02b2\u0001\u0000\u0000\u0000\u02b3\u02b4\u0001\u0000\u0000"+
		"\u0000\u02b4o\u0001\u0000\u0000\u0000\u02b5\u02b6\u0005\u0010\u0000\u0000"+
		"\u02b6\u02b7\u0003\u00a0P\u0000\u02b7q\u0001\u0000\u0000\u0000\u02b8\u02bf"+
		"\u0005M\u0000\u0000\u02b9\u02c0\u0003`0\u0000\u02ba\u02bb\u0003`0\u0000"+
		"\u02bb\u02bc\u0005S\u0000\u0000\u02bc\u02bd\u0003`0\u0000\u02bd\u02c0"+
		"\u0001\u0000\u0000\u0000\u02be\u02c0\u0003t:\u0000\u02bf\u02b9\u0001\u0000"+
		"\u0000\u0000\u02bf\u02ba\u0001\u0000\u0000\u0000\u02bf\u02be\u0001\u0000"+
		"\u0000\u0000\u02c0\u02c1\u0001\u0000\u0000\u0000\u02c1\u02c2\u0005N\u0000"+
		"\u0000\u02c2s\u0001\u0000\u0000\u0000\u02c3\u02c4\u0003`0\u0000\u02c4"+
		"\u02c5\u0005Q\u0000\u0000\u02c5\u02c6\u0003`0\u0000\u02c6\u02cd\u0001"+
		"\u0000\u0000\u0000\u02c7\u02c8\u0003`0\u0000\u02c8\u02c9\u0005Q\u0000"+
		"\u0000\u02c9\u02cd\u0001\u0000\u0000\u0000\u02ca\u02cb\u0005Q\u0000\u0000"+
		"\u02cb\u02cd\u0003`0\u0000\u02cc\u02c3\u0001\u0000\u0000\u0000\u02cc\u02c7"+
		"\u0001\u0000\u0000\u0000\u02cc\u02ca\u0001\u0000\u0000\u0000\u02cdu\u0001"+
		"\u0000\u0000\u0000\u02ce\u02cf\u0005A\u0000\u0000\u02cf\u02d0\u0005M\u0000"+
		"\u0000\u02d0\u02d5\u0003x<\u0000\u02d1\u02d2\u0005S\u0000\u0000\u02d2"+
		"\u02d4\u0003x<\u0000\u02d3\u02d1\u0001\u0000\u0000\u0000\u02d4\u02d7\u0001"+
		"\u0000\u0000\u0000\u02d5\u02d3\u0001\u0000\u0000\u0000\u02d5\u02d6\u0001"+
		"\u0000\u0000\u0000\u02d6\u02d8\u0001\u0000\u0000\u0000\u02d7\u02d5\u0001"+
		"\u0000\u0000\u0000\u02d8\u02d9\u0005L\u0000\u0000\u02d9w\u0001\u0000\u0000"+
		"\u0000\u02da\u02db\u00038\u001c\u0000\u02db\u02dc\u00054\u0000\u0000\u02dc"+
		"\u02dd\u0005<\u0000\u0000\u02dd\u02de\u0003`0\u0000\u02dey\u0001\u0000"+
		"\u0000\u0000\u02df\u02e2\u0003|>\u0000\u02e0\u02e2\u0003\u0080@\u0000"+
		"\u02e1\u02df\u0001\u0000\u0000\u0000\u02e1\u02e0\u0001\u0000\u0000\u0000"+
		"\u02e2{\u0001\u0000\u0000\u0000\u02e3\u02e9\u0005C\u0000\u0000\u02e4\u02e9"+
		"\u0005a\u0000\u0000\u02e5\u02e9\u0005b\u0000\u0000\u02e6\u02e9\u0005c"+
		"\u0000\u0000\u02e7\u02e9\u0003~?\u0000\u02e8\u02e3\u0001\u0000\u0000\u0000"+
		"\u02e8\u02e4\u0001\u0000\u0000\u0000\u02e8\u02e5\u0001\u0000\u0000\u0000"+
		"\u02e8\u02e6\u0001\u0000\u0000\u0000\u02e8\u02e7\u0001\u0000\u0000\u0000"+
		"\u02e9}\u0001\u0000\u0000\u0000\u02ea\u02eb\u0005_\u0000\u0000\u02eb\u02ec"+
		"\u0005R\u0000\u0000\u02ec\u02ed\u0005`\u0000\u0000\u02ed\u007f\u0001\u0000"+
		"\u0000\u0000\u02ee\u02f3\u0005d\u0000\u0000\u02ef\u02f3\u0003\u0082A\u0000"+
		"\u02f0\u02f3\u0003\u008eG\u0000\u02f1\u02f3\u0003\u0090H\u0000\u02f2\u02ee"+
		"\u0001\u0000\u0000\u0000\u02f2\u02ef\u0001\u0000\u0000\u0000\u02f2\u02f0"+
		"\u0001\u0000\u0000\u0000\u02f2\u02f1\u0001\u0000\u0000\u0000\u02f3\u0081"+
		"\u0001\u0000\u0000\u0000\u02f4\u02f5\u0005O\u0000\u0000\u02f5\u02f6\u0003"+
		"z=\u0000\u02f6\u02f7\u0005S\u0000\u0000\u02f7\u02fc\u0003z=\u0000\u02f8"+
		"\u02f9\u0005S\u0000\u0000\u02f9\u02fb\u0003z=\u0000\u02fa\u02f8\u0001"+
		"\u0000\u0000\u0000\u02fb\u02fe\u0001\u0000\u0000\u0000\u02fc\u02fa\u0001"+
		"\u0000\u0000\u0000\u02fc\u02fd\u0001\u0000\u0000\u0000\u02fd\u02ff\u0001"+
		"\u0000\u0000\u0000\u02fe\u02fc\u0001\u0000\u0000\u0000\u02ff\u0300\u0005"+
		"P\u0000\u0000\u0300\u0083\u0001\u0000\u0000\u0000\u0301\u0305\u0003\u0086"+
		"C\u0000\u0302\u0305\u0003\u0088D\u0000\u0303\u0305\u0003\u008aE\u0000"+
		"\u0304\u0301\u0001\u0000\u0000\u0000\u0304\u0302\u0001\u0000\u0000\u0000"+
		"\u0304\u0303\u0001\u0000\u0000\u0000\u0305\u0085\u0001\u0000\u0000\u0000"+
		"\u0306\u0307\u0005M\u0000\u0000\u0307\u030c\u0003`0\u0000\u0308\u0309"+
		"\u0005S\u0000\u0000\u0309\u030b\u0003`0\u0000\u030a\u0308\u0001\u0000"+
		"\u0000\u0000\u030b\u030e\u0001\u0000\u0000\u0000\u030c\u030a\u0001\u0000"+
		"\u0000\u0000\u030c\u030d\u0001\u0000\u0000\u0000\u030d\u030f\u0001\u0000"+
		"\u0000\u0000\u030e\u030c\u0001\u0000\u0000\u0000\u030f\u0310\u0005N\u0000"+
		"\u0000\u0310\u0087\u0001\u0000\u0000\u0000\u0311\u0312\u0005O\u0000\u0000"+
		"\u0312\u0313\u0003`0\u0000\u0313\u0314\u0005S\u0000\u0000\u0314\u0319"+
		"\u0003`0\u0000\u0315\u0316\u0005S\u0000\u0000\u0316\u0318\u0003`0\u0000"+
		"\u0317\u0315\u0001\u0000\u0000\u0000\u0318\u031b\u0001\u0000\u0000\u0000"+
		"\u0319\u0317\u0001\u0000\u0000\u0000\u0319\u031a\u0001\u0000\u0000\u0000"+
		"\u031a\u031c\u0001\u0000\u0000\u0000\u031b\u0319\u0001\u0000\u0000\u0000"+
		"\u031c\u031d\u0005P\u0000\u0000\u031d\u0089\u0001\u0000\u0000\u0000\u031e"+
		"\u031f\u0005M\u0000\u0000\u031f\u0324\u0003\u008cF\u0000\u0320\u0321\u0005"+
		"S\u0000\u0000\u0321\u0323\u0003\u008cF\u0000\u0322\u0320\u0001\u0000\u0000"+
		"\u0000\u0323\u0326\u0001\u0000\u0000\u0000\u0324\u0322\u0001\u0000\u0000"+
		"\u0000\u0324\u0325\u0001\u0000\u0000\u0000\u0325\u0327\u0001\u0000\u0000"+
		"\u0000\u0326\u0324\u0001\u0000\u0000\u0000\u0327\u0328\u0005N\u0000\u0000"+
		"\u0328\u008b\u0001\u0000\u0000\u0000\u0329\u032a\u0003`0\u0000\u032a\u032b"+
		"\u0005T\u0000\u0000\u032b\u032c\u0003`0\u0000\u032c\u008d\u0001\u0000"+
		"\u0000\u0000\u032d\u032e\u0005M\u0000\u0000\u032e\u0333\u0003z=\u0000"+
		"\u032f\u0330\u0005S\u0000\u0000\u0330\u0332\u0003z=\u0000\u0331\u032f"+
		"\u0001\u0000\u0000\u0000\u0332\u0335\u0001\u0000\u0000\u0000\u0333\u0331"+
		"\u0001\u0000\u0000\u0000\u0333\u0334\u0001\u0000\u0000\u0000\u0334\u0336"+
		"\u0001\u0000\u0000\u0000\u0335\u0333\u0001\u0000\u0000\u0000\u0336\u0337"+
		"\u0005N\u0000\u0000\u0337\u008f\u0001\u0000\u0000\u0000\u0338\u0339\u0005"+
		"M\u0000\u0000\u0339\u033e\u0003\u0092I\u0000\u033a\u033b\u0005S\u0000"+
		"\u0000\u033b\u033d\u0003\u0092I\u0000\u033c\u033a\u0001\u0000\u0000\u0000"+
		"\u033d\u0340\u0001\u0000\u0000\u0000\u033e\u033c\u0001\u0000\u0000\u0000"+
		"\u033e\u033f\u0001\u0000\u0000\u0000\u033f\u0341\u0001\u0000\u0000\u0000"+
		"\u0340\u033e\u0001\u0000\u0000\u0000\u0341\u0342\u0005N\u0000\u0000\u0342"+
		"\u0091\u0001\u0000\u0000\u0000\u0343\u0344\u0003z=\u0000\u0344\u0345\u0005"+
		"T\u0000\u0000\u0345\u0346\u0003z=\u0000\u0346\u0093\u0001\u0000\u0000"+
		"\u0000\u0347\u0348\u0005O\u0000\u0000\u0348\u034b\u0005`\u0000\u0000\u0349"+
		"\u034a\u0005S\u0000\u0000\u034a\u034c\u0005`\u0000\u0000\u034b\u0349\u0001"+
		"\u0000\u0000\u0000\u034c\u034d\u0001\u0000\u0000\u0000\u034d\u034b\u0001"+
		"\u0000\u0000\u0000\u034d\u034e\u0001\u0000\u0000\u0000\u034e\u034f\u0001"+
		"\u0000\u0000\u0000\u034f\u0350\u0005P\u0000\u0000\u0350\u0095\u0001\u0000"+
		"\u0000\u0000\u0351\u0352\u0005M\u0000\u0000\u0352\u0353\u0005`\u0000\u0000"+
		"\u0353\u0354\u0005T\u0000\u0000\u0354\u0355\u0005`\u0000\u0000\u0355\u0356"+
		"\u0005N\u0000\u0000\u0356\u0097\u0001\u0000\u0000\u0000\u0357\u035b\u0003"+
		"\u009aM\u0000\u0358\u035b\u0003\u009cN\u0000\u0359\u035b\u0003\u009eO"+
		"\u0000\u035a\u0357\u0001\u0000\u0000\u0000\u035a\u0358\u0001\u0000\u0000"+
		"\u0000\u035a\u0359\u0001\u0000\u0000\u0000\u035b\u0099\u0001\u0000\u0000"+
		"\u0000\u035c\u035d\u0007\u0004\u0000\u0000\u035d\u009b\u0001\u0000\u0000"+
		"\u0000\u035e\u035f\u0007\u0005\u0000\u0000\u035f\u009d\u0001\u0000\u0000"+
		"\u0000\u0360\u0361\u0007\u0006\u0000\u0000\u0361\u009f\u0001\u0000\u0000"+
		"\u0000\u0362\u036a\u0005D\u0000\u0000\u0363\u036a\u0003\u00a2Q\u0000\u0364"+
		"\u036a\u0005_\u0000\u0000\u0365\u0366\u0005_\u0000\u0000\u0366\u036a\u0003"+
		"\u00a4R\u0000\u0367\u036a\u0003\u00a6S\u0000\u0368\u036a\u0003\u00aaU"+
		"\u0000\u0369\u0362\u0001\u0000\u0000\u0000\u0369\u0363\u0001\u0000\u0000"+
		"\u0000\u0369\u0364\u0001\u0000\u0000\u0000\u0369\u0365\u0001\u0000\u0000"+
		"\u0000\u0369\u0367\u0001\u0000\u0000\u0000\u0369\u0368\u0001\u0000\u0000"+
		"\u0000\u036a\u00a1\u0001\u0000\u0000\u0000\u036b\u036c\u0007\u0007\u0000"+
		"\u0000\u036c\u036d\u0003\u00a4R\u0000\u036d\u00a3\u0001\u0000\u0000\u0000"+
		"\u036e\u036f\u0005Z\u0000\u0000\u036f\u0370\u0005)\u0000\u0000\u0370\u0375"+
		"\u0003\u00a0P\u0000\u0371\u0372\u0005S\u0000\u0000\u0372\u0374\u0003\u00a0"+
		"P\u0000\u0373\u0371\u0001\u0000\u0000\u0000\u0374\u0377\u0001\u0000\u0000"+
		"\u0000\u0375\u0373\u0001\u0000\u0000\u0000\u0375\u0376\u0001\u0000\u0000"+
		"\u0000\u0376\u0378\u0001\u0000\u0000\u0000\u0377\u0375\u0001\u0000\u0000"+
		"\u0000\u0378\u0379\u0005[\u0000\u0000\u0379\u00a5\u0001\u0000\u0000\u0000"+
		"\u037a\u037b\u0005O\u0000\u0000\u037b\u037e\u0003\u00a0P\u0000\u037c\u037d"+
		"\u0005S\u0000\u0000\u037d\u037f\u0003\u00a0P\u0000\u037e\u037c\u0001\u0000"+
		"\u0000\u0000\u037f\u0380\u0001\u0000\u0000\u0000\u0380\u037e\u0001\u0000"+
		"\u0000\u0000\u0380\u0381\u0001\u0000\u0000\u0000\u0381\u0382\u0001\u0000"+
		"\u0000\u0000\u0382\u0383\u0005P\u0000\u0000\u0383\u00a7\u0001\u0000\u0000"+
		"\u0000\u0384\u0389\u0003\u00a0P\u0000\u0385\u0386\u0005S\u0000\u0000\u0386"+
		"\u0388\u0003\u00a0P\u0000\u0387\u0385\u0001\u0000\u0000\u0000\u0388\u038b"+
		"\u0001\u0000\u0000\u0000\u0389\u0387\u0001\u0000\u0000\u0000\u0389\u038a"+
		"\u0001\u0000\u0000\u0000\u038a\u00a9\u0001\u0000\u0000\u0000\u038b\u0389"+
		"\u0001\u0000\u0000\u0000\u038c\u038d\u0005O\u0000\u0000\u038d\u038e\u0003"+
		"\u00a8T\u0000\u038e\u038f\u0005J\u0000\u0000\u038f\u0390\u0003\u00a0P"+
		"\u0000\u0390\u0391\u0005P\u0000\u0000\u0391\u00ab\u0001\u0000\u0000\u0000"+
		"B\u00b0\u00b6\u00c5\u00d0\u00f7\u0102\u0114\u011d\u0127\u012f\u0131\u013d"+
		"\u0146\u015c\u0165\u0171\u0175\u0185\u0189\u018d\u0194\u0199\u01a2\u01ac"+
		"\u01b6\u01c3\u01f3\u0207\u020e\u0210\u021c\u0229\u022b\u0237\u023d\u023f"+
		"\u024c\u0255\u0257\u0264\u026b\u0274\u0283\u0290\u02a6\u02af\u02b3\u02bf"+
		"\u02cc\u02d5\u02e1\u02e8\u02f2\u02fc\u0304\u030c\u0319\u0324\u0333\u033e"+
		"\u034d\u035a\u0369\u0375\u0380\u0389";
	public static final ATN _ATN =
		new ATNDeserializer().deserialize(_serializedATN.toCharArray());
	static {
		_decisionToDFA = new DFA[_ATN.getNumberOfDecisions()];
		for (int i = 0; i < _ATN.getNumberOfDecisions(); i++) {
			_decisionToDFA[i] = new DFA(_ATN.getDecisionState(i), i);
		}
	}
}