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
	public static final int
		RULE_file = 0, RULE_comment = 1, RULE_importStatement = 2, RULE_namespace = 3, 
		RULE_global = 4, RULE_main = 5, RULE_procedure = 6, RULE_function = 7, 
		RULE_constant = 8, RULE_class = 9, RULE_enum = 10, RULE_test = 11, RULE_procedureSignature = 12, 
		RULE_paramList = 13, RULE_paramDef = 14, RULE_functionSignature = 15, 
		RULE_statementBlock = 16, RULE_singleLineStatement = 17, RULE_multiLineStatement = 18, 
		RULE_var = 19, RULE_set = 20, RULE_call = 21, RULE_throw = 22, RULE_print = 23, 
		RULE_input = 24, RULE_assert = 25, RULE_let = 26, RULE_assignableValue = 27, 
		RULE_methodCall = 28, RULE_argList = 29, RULE_if = 30, RULE_else = 31, 
		RULE_for = 32, RULE_each = 33, RULE_while = 34, RULE_repeat = 35, RULE_try = 36, 
		RULE_switch = 37, RULE_case = 38, RULE_defaultCase = 39, RULE_mutableClass = 40, 
		RULE_abstractClass = 41, RULE_immutableClass = 42, RULE_abstractImmutableClass = 43, 
		RULE_inherits = 44, RULE_constructor = 45, RULE_property = 46, RULE_expression = 47, 
		RULE_term = 48, RULE_bracketedExpression = 49, RULE_lambda = 50, RULE_ifExpression = 51, 
		RULE_newInstance = 52, RULE_unaryOp = 53, RULE_varRef = 54, RULE_defaultType = 55, 
		RULE_index = 56, RULE_range = 57, RULE_withClause = 58, RULE_inlineAsignment = 59, 
		RULE_literal = 60, RULE_literalValue = 61, RULE_enumValue = 62, RULE_literalDataStructure = 63, 
		RULE_literalTuple = 64, RULE_dataStructureDefinition = 65, RULE_listDefinition = 66, 
		RULE_tupleDefinition = 67, RULE_dictionaryDefinition = 68, RULE_kvp = 69, 
		RULE_literalList = 70, RULE_literalDictionary = 71, RULE_literalKvp = 72, 
		RULE_deconstructedTuple = 73, RULE_deconstructedList = 74, RULE_binaryOp = 75, 
		RULE_arithmeticOp = 76, RULE_logicalOp = 77, RULE_conditionalOp = 78, 
		RULE_type = 79, RULE_dataStructureType = 80, RULE_genericSpecifier = 81, 
		RULE_tupleType = 82, RULE_typeList = 83, RULE_funcType = 84;
	private static String[] makeRuleNames() {
		return new String[] {
			"file", "comment", "importStatement", "namespace", "global", "main", 
			"procedure", "function", "constant", "class", "enum", "test", "procedureSignature", 
			"paramList", "paramDef", "functionSignature", "statementBlock", "singleLineStatement", 
			"multiLineStatement", "var", "set", "call", "throw", "print", "input", 
			"assert", "let", "assignableValue", "methodCall", "argList", "if", "else", 
			"for", "each", "while", "repeat", "try", "switch", "case", "defaultCase", 
			"mutableClass", "abstractClass", "immutableClass", "abstractImmutableClass", 
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
	}
	private static final String[] _LITERAL_NAMES = makeLiteralNames();
	private static String[] makeSymbolicNames() {
		return new String[] {
			null, null, "NL", "SINGLE_LINE_COMMENT", "COMMENT_MARKER", "ABSTRACT", 
			"AND", "AS", "BE", "ASSERT", "CALL", "CASE", "CATCH", "CLASS", "CONSTANT", 
			"CONSTRUCTOR", "CURRY", "DEFAULT", "DIV", "EACH", "ELSE", "END", "ENUM", 
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
			setState(170);
			comment();
			setState(174);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==IMPORT) {
				{
				{
				setState(171);
				importStatement();
				}
				}
				setState(176);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			setState(180);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==NL || _la==COMMENT_MARKER) {
				{
				{
				setState(177);
				global();
				}
				}
				setState(182);
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
			setState(183);
			match(COMMENT_MARKER);
			setState(184);
			match(TEXT);
			setState(185);
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
			setState(187);
			match(IMPORT);
			setState(188);
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
			setState(190);
			_la = _input.LA(1);
			if ( !(_la==TYPENAME || _la==IDENTIFIER) ) {
			_errHandler.recoverInline(this);
			}
			else {
				if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
				_errHandler.reportMatch(this);
				consume();
			}
			setState(195);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==DOT) {
				{
				{
				setState(191);
				match(DOT);
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
				}
				}
				setState(197);
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
			setState(206);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,3,_ctx) ) {
			case 1:
				{
				setState(198);
				main();
				}
				break;
			case 2:
				{
				setState(199);
				procedure();
				}
				break;
			case 3:
				{
				setState(200);
				function();
				}
				break;
			case 4:
				{
				setState(201);
				constant();
				}
				break;
			case 5:
				{
				setState(202);
				enum_();
				}
				break;
			case 6:
				{
				setState(203);
				class_();
				}
				break;
			case 7:
				{
				setState(204);
				test();
				}
				break;
			case 8:
				{
				setState(205);
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
			setState(208);
			match(NL);
			setState(209);
			match(MAIN);
			setState(210);
			statementBlock();
			setState(211);
			match(NL);
			setState(212);
			match(END);
			setState(213);
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
			setState(215);
			match(NL);
			setState(216);
			match(PROCEDURE);
			setState(217);
			procedureSignature();
			setState(218);
			statementBlock();
			setState(219);
			match(NL);
			setState(220);
			match(END);
			setState(221);
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
			setState(223);
			match(NL);
			setState(224);
			match(FUNCTION);
			setState(225);
			functionSignature();
			setState(226);
			statementBlock();
			setState(227);
			match(NL);
			setState(228);
			match(RETURN);
			setState(229);
			expression();
			setState(230);
			match(NL);
			setState(231);
			match(END);
			setState(232);
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
			setState(234);
			match(NL);
			setState(235);
			match(CONSTANT);
			setState(236);
			match(IDENTIFIER);
			setState(237);
			match(SET);
			setState(238);
			match(TO);
			setState(239);
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
			setState(245);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,4,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(241);
				mutableClass();
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(242);
				abstractClass();
				}
				break;
			case 3:
				enterOuterAlt(_localctx, 3);
				{
				setState(243);
				immutableClass();
				}
				break;
			case 4:
				enterOuterAlt(_localctx, 4);
				{
				setState(244);
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
			setState(247);
			match(NL);
			setState(248);
			match(ENUM);
			setState(249);
			match(TYPENAME);
			setState(250);
			match(NL);
			setState(251);
			match(IDENTIFIER);
			setState(256);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==COMMA) {
				{
				{
				setState(252);
				match(COMMA);
				setState(253);
				match(IDENTIFIER);
				}
				}
				setState(258);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			setState(259);
			match(NL);
			setState(260);
			match(END);
			setState(261);
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
			setState(263);
			match(NL);
			setState(264);
			match(TEST);
			setState(265);
			match(IDENTIFIER);
			setState(266);
			statementBlock();
			setState(267);
			match(NL);
			setState(268);
			match(END);
			setState(269);
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
			setState(271);
			match(IDENTIFIER);
			setState(272);
			match(OPEN_BRACKET);
			setState(274);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==IDENTIFIER) {
				{
				setState(273);
				paramList();
				}
			}

			setState(276);
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
			setState(278);
			paramDef();
			setState(283);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==COMMA) {
				{
				{
				setState(279);
				match(COMMA);
				setState(280);
				paramDef();
				}
				}
				setState(285);
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
			setState(286);
			match(IDENTIFIER);
			setState(287);
			match(AS);
			setState(288);
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
			setState(290);
			match(IDENTIFIER);
			setState(291);
			match(OPEN_BRACKET);
			setState(293);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==IDENTIFIER) {
				{
				setState(292);
				paramList();
				}
			}

			setState(295);
			match(CLOSE_BRACKET);
			setState(296);
			match(RETURN);
			setState(297);
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
			setState(303);
			_errHandler.sync(this);
			_alt = getInterpreter().adaptivePredict(_input,10,_ctx);
			while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER ) {
				if ( _alt==1 ) {
					{
					setState(301);
					_errHandler.sync(this);
					switch ( getInterpreter().adaptivePredict(_input,9,_ctx) ) {
					case 1:
						{
						setState(299);
						singleLineStatement();
						}
						break;
					case 2:
						{
						setState(300);
						multiLineStatement();
						}
						break;
					}
					} 
				}
				setState(305);
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
			setState(314);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,11,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(306);
				var();
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(307);
				let();
				}
				break;
			case 3:
				enterOuterAlt(_localctx, 3);
				{
				setState(308);
				set();
				}
				break;
			case 4:
				enterOuterAlt(_localctx, 4);
				{
				setState(309);
				call();
				}
				break;
			case 5:
				enterOuterAlt(_localctx, 5);
				{
				setState(310);
				throw_();
				}
				break;
			case 6:
				enterOuterAlt(_localctx, 6);
				{
				setState(311);
				print();
				}
				break;
			case 7:
				enterOuterAlt(_localctx, 7);
				{
				setState(312);
				input();
				}
				break;
			case 8:
				enterOuterAlt(_localctx, 8);
				{
				setState(313);
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
			setState(323);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,12,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(316);
				if_();
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(317);
				for_();
				}
				break;
			case 3:
				enterOuterAlt(_localctx, 3);
				{
				setState(318);
				each();
				}
				break;
			case 4:
				enterOuterAlt(_localctx, 4);
				{
				setState(319);
				while_();
				}
				break;
			case 5:
				enterOuterAlt(_localctx, 5);
				{
				setState(320);
				repeat();
				}
				break;
			case 6:
				enterOuterAlt(_localctx, 6);
				{
				setState(321);
				try_();
				}
				break;
			case 7:
				enterOuterAlt(_localctx, 7);
				{
				setState(322);
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
			setState(325);
			match(NL);
			setState(326);
			match(VAR);
			setState(327);
			assignableValue();
			setState(328);
			match(SET);
			setState(329);
			match(TO);
			setState(330);
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
			setState(332);
			match(NL);
			setState(333);
			match(SET);
			setState(334);
			assignableValue();
			setState(335);
			match(TO);
			setState(336);
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
			setState(338);
			match(NL);
			setState(339);
			match(CALL);
			setState(345);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,13,_ctx) ) {
			case 1:
				{
				setState(340);
				methodCall();
				}
				break;
			case 2:
				{
				{
				setState(341);
				assignableValue();
				setState(342);
				match(DOT);
				setState(343);
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
			setState(347);
			match(NL);
			setState(348);
			match(THROW);
			setState(349);
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
			setState(351);
			match(NL);
			setState(352);
			match(PRINT);
			setState(354);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if ((((_la) & ~0x3f) == 0 && ((1L << _la) & 288795061473378304L) != 0) || ((((_la - 67)) & ~0x3f) == 0 && ((1L << (_la - 67)) & 16911963137L) != 0)) {
				{
				setState(353);
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
			setState(356);
			match(INPUT);
			setState(357);
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
		enterRule(_localctx, 50, RULE_assert);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(359);
			match(NL);
			setState(360);
			match(ASSERT);
			setState(361);
			expression();
			setState(362);
			match(IS);
			setState(363);
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
		enterRule(_localctx, 52, RULE_let);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(365);
			match(NL);
			setState(366);
			match(LET);
			setState(367);
			match(IDENTIFIER);
			setState(368);
			match(BE);
			setState(369);
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
		enterRule(_localctx, 54, RULE_assignableValue);
		int _la;
		try {
			setState(381);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case PROPERTY:
			case IDENTIFIER:
				enterOuterAlt(_localctx, 1);
				{
				setState(373);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==PROPERTY) {
					{
					setState(371);
					match(PROPERTY);
					setState(372);
					match(DOT);
					}
				}

				setState(375);
				match(IDENTIFIER);
				setState(377);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==OPEN_SQ_BRACKET) {
					{
					setState(376);
					index();
					}
				}

				}
				break;
			case OPEN_BRACKET:
				enterOuterAlt(_localctx, 2);
				{
				setState(379);
				deconstructedTuple();
				}
				break;
			case OPEN_SQ_BRACKET:
				enterOuterAlt(_localctx, 3);
				{
				setState(380);
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
		enterRule(_localctx, 56, RULE_methodCall);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(388);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,18,_ctx) ) {
			case 1:
				{
				setState(383);
				match(PROPERTY);
				}
				break;
			case 2:
				{
				setState(384);
				match(GLOBAL);
				}
				break;
			case 3:
				{
				setState(385);
				match(LIBRARY);
				}
				break;
			case 4:
				{
				setState(386);
				match(IDENTIFIER);
				setState(387);
				match(DOT);
				}
				break;
			}
			setState(390);
			match(IDENTIFIER);
			setState(391);
			match(OPEN_BRACKET);
			setState(393);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if ((((_la) & ~0x3f) == 0 && ((1L << _la) & 288795061473378304L) != 0) || ((((_la - 67)) & ~0x3f) == 0 && ((1L << (_la - 67)) & 16911963137L) != 0)) {
				{
				setState(392);
				argList();
				}
			}

			setState(395);
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
		enterRule(_localctx, 58, RULE_argList);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(397);
			expression();
			setState(402);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==COMMA) {
				{
				{
				setState(398);
				match(COMMA);
				setState(399);
				expression();
				}
				}
				setState(404);
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
		enterRule(_localctx, 60, RULE_if);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(405);
			match(NL);
			setState(406);
			match(IF);
			setState(407);
			expression();
			setState(408);
			statementBlock();
			setState(412);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==ELSE) {
				{
				{
				setState(409);
				else_();
				}
				}
				setState(414);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			setState(415);
			match(NL);
			setState(416);
			match(END);
			setState(417);
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
		enterRule(_localctx, 62, RULE_else);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(419);
			match(ELSE);
			setState(422);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==IF) {
				{
				setState(420);
				match(IF);
				setState(421);
				expression();
				}
			}

			setState(424);
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
		enterRule(_localctx, 64, RULE_for);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(426);
			match(NL);
			setState(427);
			match(FOR);
			setState(428);
			match(IDENTIFIER);
			setState(429);
			match(FROM);
			setState(430);
			expression();
			setState(431);
			match(TO);
			setState(432);
			expression();
			setState(433);
			match(STEP);
			setState(435);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==MINUS) {
				{
				setState(434);
				match(MINUS);
				}
			}

			setState(437);
			match(LITERAL_INTEGER);
			setState(438);
			statementBlock();
			setState(439);
			match(NL);
			setState(440);
			match(END);
			setState(441);
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
		enterRule(_localctx, 66, RULE_each);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(443);
			match(NL);
			setState(444);
			match(EACH);
			setState(445);
			match(IDENTIFIER);
			setState(446);
			match(IN);
			setState(447);
			expression();
			setState(448);
			statementBlock();
			setState(449);
			match(NL);
			setState(450);
			match(END);
			setState(451);
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
		enterRule(_localctx, 68, RULE_while);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(453);
			match(NL);
			setState(454);
			match(WHILE);
			setState(455);
			expression();
			setState(456);
			statementBlock();
			setState(457);
			match(NL);
			setState(458);
			match(END);
			setState(459);
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
		enterRule(_localctx, 70, RULE_repeat);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(461);
			match(NL);
			{
			setState(462);
			match(REPEAT);
			}
			setState(463);
			statementBlock();
			setState(464);
			match(NL);
			setState(465);
			match(END);
			setState(466);
			match(REPEAT);
			setState(467);
			match(WHEN);
			setState(468);
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
		enterRule(_localctx, 72, RULE_try);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(470);
			match(NL);
			setState(471);
			match(TRY);
			setState(472);
			statementBlock();
			setState(473);
			match(NL);
			setState(474);
			match(END);
			setState(475);
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
		enterRule(_localctx, 74, RULE_switch);
		try {
			int _alt;
			enterOuterAlt(_localctx, 1);
			{
			setState(477);
			match(NL);
			setState(478);
			match(SWITCH);
			setState(479);
			expression();
			setState(481); 
			_errHandler.sync(this);
			_alt = 1;
			do {
				switch (_alt) {
				case 1:
					{
					{
					setState(480);
					case_();
					}
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				setState(483); 
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,24,_ctx);
			} while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER );
			setState(485);
			defaultCase();
			setState(486);
			match(NL);
			setState(487);
			match(END);
			setState(488);
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
		enterRule(_localctx, 76, RULE_case);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(490);
			match(NL);
			setState(491);
			match(CASE);
			setState(492);
			literalValue();
			setState(493);
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
		enterRule(_localctx, 78, RULE_defaultCase);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(495);
			match(NL);
			setState(496);
			match(DEFAULT);
			setState(497);
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
		enterRule(_localctx, 80, RULE_mutableClass);
		int _la;
		try {
			int _alt;
			enterOuterAlt(_localctx, 1);
			{
			setState(499);
			match(NL);
			setState(500);
			match(CLASS);
			setState(501);
			match(TYPENAME);
			setState(503);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==INHERITS) {
				{
				setState(502);
				inherits();
				}
			}

			setState(505);
			constructor();
			setState(512);
			_errHandler.sync(this);
			_alt = getInterpreter().adaptivePredict(_input,27,_ctx);
			while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER ) {
				if ( _alt==1 ) {
					{
					setState(510);
					_errHandler.sync(this);
					switch ( getInterpreter().adaptivePredict(_input,26,_ctx) ) {
					case 1:
						{
						setState(506);
						match(NL);
						setState(507);
						property();
						}
						break;
					case 2:
						{
						setState(508);
						function();
						}
						break;
					case 3:
						{
						setState(509);
						procedure();
						}
						break;
					}
					} 
				}
				setState(514);
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,27,_ctx);
			}
			setState(515);
			match(NL);
			setState(516);
			match(END);
			setState(517);
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
		enterRule(_localctx, 82, RULE_abstractClass);
		int _la;
		try {
			int _alt;
			enterOuterAlt(_localctx, 1);
			{
			setState(519);
			match(NL);
			setState(520);
			match(ABSTRACT);
			setState(521);
			match(CLASS);
			setState(522);
			match(TYPENAME);
			setState(524);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==INHERITS) {
				{
				setState(523);
				inherits();
				}
			}

			setState(539);
			_errHandler.sync(this);
			_alt = getInterpreter().adaptivePredict(_input,30,_ctx);
			while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER ) {
				if ( _alt==1 ) {
					{
					setState(537);
					_errHandler.sync(this);
					switch ( getInterpreter().adaptivePredict(_input,29,_ctx) ) {
					case 1:
						{
						setState(526);
						match(NL);
						setState(527);
						match(ABSTRACT);
						setState(528);
						property();
						}
						break;
					case 2:
						{
						setState(529);
						match(NL);
						setState(530);
						match(ABSTRACT);
						setState(531);
						match(FUNCTION);
						setState(532);
						functionSignature();
						}
						break;
					case 3:
						{
						setState(533);
						match(NL);
						setState(534);
						match(ABSTRACT);
						setState(535);
						match(PROCEDURE);
						setState(536);
						procedureSignature();
						}
						break;
					}
					} 
				}
				setState(541);
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,30,_ctx);
			}
			setState(542);
			match(NL);
			setState(543);
			match(END);
			setState(544);
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
		enterRule(_localctx, 84, RULE_immutableClass);
		int _la;
		try {
			int _alt;
			enterOuterAlt(_localctx, 1);
			{
			setState(546);
			match(NL);
			setState(547);
			match(IMMUTABLE);
			setState(548);
			match(CLASS);
			setState(549);
			match(TYPENAME);
			setState(551);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==INHERITS) {
				{
				setState(550);
				inherits();
				}
			}

			setState(553);
			constructor();
			setState(559);
			_errHandler.sync(this);
			_alt = getInterpreter().adaptivePredict(_input,33,_ctx);
			while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER ) {
				if ( _alt==1 ) {
					{
					setState(557);
					_errHandler.sync(this);
					switch ( getInterpreter().adaptivePredict(_input,32,_ctx) ) {
					case 1:
						{
						setState(554);
						match(NL);
						setState(555);
						property();
						}
						break;
					case 2:
						{
						setState(556);
						function();
						}
						break;
					}
					} 
				}
				setState(561);
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,33,_ctx);
			}
			setState(562);
			match(NL);
			setState(563);
			match(END);
			setState(564);
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
		enterRule(_localctx, 86, RULE_abstractImmutableClass);
		int _la;
		try {
			int _alt;
			enterOuterAlt(_localctx, 1);
			{
			setState(566);
			match(NL);
			setState(567);
			match(ABSTRACT);
			setState(568);
			match(IMMUTABLE);
			setState(569);
			match(CLASS);
			setState(570);
			match(TYPENAME);
			setState(572);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==INHERITS) {
				{
				setState(571);
				inherits();
				}
			}

			setState(583);
			_errHandler.sync(this);
			_alt = getInterpreter().adaptivePredict(_input,36,_ctx);
			while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER ) {
				if ( _alt==1 ) {
					{
					setState(581);
					_errHandler.sync(this);
					switch ( getInterpreter().adaptivePredict(_input,35,_ctx) ) {
					case 1:
						{
						setState(574);
						match(NL);
						setState(575);
						match(ABSTRACT);
						setState(576);
						property();
						}
						break;
					case 2:
						{
						setState(577);
						match(NL);
						setState(578);
						match(ABSTRACT);
						setState(579);
						match(FUNCTION);
						setState(580);
						functionSignature();
						}
						break;
					}
					} 
				}
				setState(585);
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,36,_ctx);
			}
			setState(586);
			match(NL);
			setState(587);
			match(END);
			setState(588);
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
		enterRule(_localctx, 88, RULE_inherits);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(590);
			match(INHERITS);
			setState(591);
			type();
			setState(596);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==COMMA) {
				{
				{
				setState(592);
				match(COMMA);
				setState(593);
				type();
				}
				}
				setState(598);
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
		enterRule(_localctx, 90, RULE_constructor);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(599);
			match(NL);
			setState(600);
			match(CONSTRUCTOR);
			setState(601);
			match(OPEN_BRACKET);
			setState(603);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==IDENTIFIER) {
				{
				setState(602);
				paramList();
				}
			}

			setState(605);
			match(CLOSE_BRACKET);
			setState(606);
			statementBlock();
			setState(607);
			match(NL);
			setState(608);
			match(END);
			setState(609);
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
		enterRule(_localctx, 92, RULE_property);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(612);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==PRIVATE) {
				{
				setState(611);
				match(PRIVATE);
				}
			}

			setState(614);
			match(PROPERTY);
			setState(615);
			match(IDENTIFIER);
			setState(616);
			match(AS);
			setState(617);
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
		enterRule(_localctx, 94, RULE_expression);
		try {
			setState(627);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,40,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(619);
				term();
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				{
				setState(620);
				term();
				setState(621);
				binaryOp();
				setState(622);
				expression();
				}
				}
				break;
			case 3:
				enterOuterAlt(_localctx, 3);
				{
				{
				setState(624);
				term();
				setState(625);
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
		enterRule(_localctx, 96, RULE_term);
		try {
			setState(640);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,41,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(629);
				bracketedExpression();
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(630);
				lambda();
				}
				break;
			case 3:
				enterOuterAlt(_localctx, 3);
				{
				setState(631);
				ifExpression();
				}
				break;
			case 4:
				enterOuterAlt(_localctx, 4);
				{
				setState(632);
				newInstance();
				}
				break;
			case 5:
				enterOuterAlt(_localctx, 5);
				{
				setState(633);
				unaryOp();
				}
				break;
			case 6:
				enterOuterAlt(_localctx, 6);
				{
				setState(634);
				literal();
				}
				break;
			case 7:
				enterOuterAlt(_localctx, 7);
				{
				setState(635);
				varRef();
				}
				break;
			case 8:
				enterOuterAlt(_localctx, 8);
				{
				setState(636);
				match(THIS);
				}
				break;
			case 9:
				enterOuterAlt(_localctx, 9);
				{
				setState(637);
				defaultType();
				}
				break;
			case 10:
				enterOuterAlt(_localctx, 10);
				{
				setState(638);
				methodCall();
				}
				break;
			case 11:
				enterOuterAlt(_localctx, 11);
				{
				setState(639);
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
		enterRule(_localctx, 98, RULE_bracketedExpression);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(642);
			match(OPEN_BRACKET);
			setState(643);
			expression();
			setState(644);
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
		enterRule(_localctx, 100, RULE_lambda);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(646);
			match(LAMBDA);
			setState(647);
			paramList();
			setState(648);
			match(ARROW);
			setState(649);
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
		enterRule(_localctx, 102, RULE_ifExpression);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(651);
			match(IF);
			setState(652);
			expression();
			setState(653);
			match(THEN);
			setState(654);
			expression();
			setState(655);
			match(ELSE);
			setState(656);
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
		enterRule(_localctx, 104, RULE_newInstance);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			{
			setState(658);
			match(NEW);
			setState(659);
			type();
			setState(660);
			match(OPEN_BRACKET);
			setState(662);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if ((((_la) & ~0x3f) == 0 && ((1L << _la) & 288795061473378304L) != 0) || ((((_la - 67)) & ~0x3f) == 0 && ((1L << (_la - 67)) & 16911963137L) != 0)) {
				{
				setState(661);
				argList();
				}
			}

			setState(664);
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
		enterRule(_localctx, 106, RULE_unaryOp);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(666);
			_la = _input.LA(1);
			if ( !(_la==NOT || _la==MINUS) ) {
			_errHandler.recoverInline(this);
			}
			else {
				if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
				_errHandler.reportMatch(this);
				consume();
			}
			setState(667);
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
		enterRule(_localctx, 108, RULE_varRef);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(671);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,43,_ctx) ) {
			case 1:
				{
				setState(669);
				_la = _input.LA(1);
				if ( !((((_la) & ~0x3f) == 0 && ((1L << _la) & 563018740006912L) != 0) || _la==IDENTIFIER) ) {
				_errHandler.recoverInline(this);
				}
				else {
					if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
					_errHandler.reportMatch(this);
					consume();
				}
				setState(670);
				match(DOT);
				}
				break;
			}
			setState(673);
			match(IDENTIFIER);
			setState(675);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==OPEN_SQ_BRACKET) {
				{
				setState(674);
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
		enterRule(_localctx, 110, RULE_defaultType);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(677);
			match(DEFAULT);
			setState(678);
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
		enterRule(_localctx, 112, RULE_index);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(680);
			match(OPEN_SQ_BRACKET);
			setState(687);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,45,_ctx) ) {
			case 1:
				{
				setState(681);
				expression();
				}
				break;
			case 2:
				{
				setState(682);
				expression();
				setState(683);
				match(COMMA);
				setState(684);
				expression();
				}
				break;
			case 3:
				{
				setState(686);
				range();
				}
				break;
			}
			setState(689);
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
		enterRule(_localctx, 114, RULE_range);
		try {
			setState(700);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,46,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(691);
				expression();
				setState(692);
				match(DOUBLE_DOT);
				setState(693);
				expression();
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(695);
				expression();
				setState(696);
				match(DOUBLE_DOT);
				}
				break;
			case 3:
				enterOuterAlt(_localctx, 3);
				{
				setState(698);
				match(DOUBLE_DOT);
				setState(699);
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
		enterRule(_localctx, 116, RULE_withClause);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(702);
			match(WITH);
			setState(703);
			match(OPEN_SQ_BRACKET);
			setState(704);
			inlineAsignment();
			setState(709);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==COMMA) {
				{
				{
				setState(705);
				match(COMMA);
				setState(706);
				inlineAsignment();
				}
				}
				setState(711);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			setState(712);
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
		enterRule(_localctx, 118, RULE_inlineAsignment);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(714);
			assignableValue();
			setState(715);
			match(SET);
			setState(716);
			match(TO);
			setState(717);
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
		enterRule(_localctx, 120, RULE_literal);
		try {
			setState(721);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case BOOL_VALUE:
			case TYPENAME:
			case LITERAL_INTEGER:
			case LITERAL_FLOAT:
			case LITERAL_CHAR:
				enterOuterAlt(_localctx, 1);
				{
				setState(719);
				literalValue();
				}
				break;
			case OPEN_SQ_BRACKET:
			case OPEN_BRACKET:
			case LITERAL_STRING:
				enterOuterAlt(_localctx, 2);
				{
				setState(720);
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
		enterRule(_localctx, 122, RULE_literalValue);
		try {
			setState(728);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case BOOL_VALUE:
				enterOuterAlt(_localctx, 1);
				{
				setState(723);
				match(BOOL_VALUE);
				}
				break;
			case LITERAL_INTEGER:
				enterOuterAlt(_localctx, 2);
				{
				setState(724);
				match(LITERAL_INTEGER);
				}
				break;
			case LITERAL_FLOAT:
				enterOuterAlt(_localctx, 3);
				{
				setState(725);
				match(LITERAL_FLOAT);
				}
				break;
			case LITERAL_CHAR:
				enterOuterAlt(_localctx, 4);
				{
				setState(726);
				match(LITERAL_CHAR);
				}
				break;
			case TYPENAME:
				enterOuterAlt(_localctx, 5);
				{
				setState(727);
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
		enterRule(_localctx, 124, RULE_enumValue);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(730);
			match(TYPENAME);
			setState(731);
			match(DOT);
			setState(732);
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
		enterRule(_localctx, 126, RULE_literalDataStructure);
		try {
			setState(738);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,50,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(734);
				match(LITERAL_STRING);
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(735);
				literalTuple();
				}
				break;
			case 3:
				enterOuterAlt(_localctx, 3);
				{
				setState(736);
				literalList();
				}
				break;
			case 4:
				enterOuterAlt(_localctx, 4);
				{
				setState(737);
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
		enterRule(_localctx, 128, RULE_literalTuple);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(740);
			match(OPEN_BRACKET);
			setState(741);
			literal();
			setState(742);
			match(COMMA);
			setState(743);
			literal();
			setState(748);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==COMMA) {
				{
				{
				setState(744);
				match(COMMA);
				setState(745);
				literal();
				}
				}
				setState(750);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			setState(751);
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
		enterRule(_localctx, 130, RULE_dataStructureDefinition);
		try {
			setState(756);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,52,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(753);
				listDefinition();
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(754);
				tupleDefinition();
				}
				break;
			case 3:
				enterOuterAlt(_localctx, 3);
				{
				setState(755);
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
		enterRule(_localctx, 132, RULE_listDefinition);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(758);
			match(OPEN_SQ_BRACKET);
			{
			setState(759);
			expression();
			setState(764);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==COMMA) {
				{
				{
				setState(760);
				match(COMMA);
				setState(761);
				expression();
				}
				}
				setState(766);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			}
			setState(767);
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
		enterRule(_localctx, 134, RULE_tupleDefinition);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(769);
			match(OPEN_BRACKET);
			setState(770);
			expression();
			setState(771);
			match(COMMA);
			setState(772);
			expression();
			setState(777);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==COMMA) {
				{
				{
				setState(773);
				match(COMMA);
				setState(774);
				expression();
				}
				}
				setState(779);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			setState(780);
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
		enterRule(_localctx, 136, RULE_dictionaryDefinition);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(782);
			match(OPEN_SQ_BRACKET);
			{
			setState(783);
			kvp();
			setState(788);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==COMMA) {
				{
				{
				setState(784);
				match(COMMA);
				setState(785);
				kvp();
				}
				}
				setState(790);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			}
			setState(791);
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
		enterRule(_localctx, 138, RULE_kvp);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(793);
			expression();
			setState(794);
			match(COLON);
			setState(795);
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
		enterRule(_localctx, 140, RULE_literalList);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(797);
			match(OPEN_SQ_BRACKET);
			{
			setState(798);
			literal();
			setState(803);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==COMMA) {
				{
				{
				setState(799);
				match(COMMA);
				setState(800);
				literal();
				}
				}
				setState(805);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			}
			setState(806);
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
		enterRule(_localctx, 142, RULE_literalDictionary);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(808);
			match(OPEN_SQ_BRACKET);
			{
			setState(809);
			literalKvp();
			setState(814);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==COMMA) {
				{
				{
				setState(810);
				match(COMMA);
				setState(811);
				literalKvp();
				}
				}
				setState(816);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			}
			setState(817);
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
		enterRule(_localctx, 144, RULE_literalKvp);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(819);
			literal();
			setState(820);
			match(COLON);
			setState(821);
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
		enterRule(_localctx, 146, RULE_deconstructedTuple);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(823);
			match(OPEN_BRACKET);
			setState(824);
			match(IDENTIFIER);
			setState(827); 
			_errHandler.sync(this);
			_la = _input.LA(1);
			do {
				{
				{
				setState(825);
				match(COMMA);
				setState(826);
				match(IDENTIFIER);
				}
				}
				setState(829); 
				_errHandler.sync(this);
				_la = _input.LA(1);
			} while ( _la==COMMA );
			setState(831);
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
		enterRule(_localctx, 148, RULE_deconstructedList);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(833);
			match(OPEN_SQ_BRACKET);
			setState(834);
			match(IDENTIFIER);
			setState(835);
			match(COLON);
			setState(836);
			match(IDENTIFIER);
			setState(837);
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
		enterRule(_localctx, 150, RULE_binaryOp);
		try {
			setState(842);
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
				setState(839);
				arithmeticOp();
				}
				break;
			case AND:
			case OR:
			case XOR:
				enterOuterAlt(_localctx, 2);
				{
				setState(840);
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
				setState(841);
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
		enterRule(_localctx, 152, RULE_arithmeticOp);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(844);
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
		enterRule(_localctx, 154, RULE_logicalOp);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(846);
			_la = _input.LA(1);
			if ( !(((((_la - 6)) & ~0x3f) == 0 && ((1L << (_la - 6)) & 1152921642045800449L) != 0)) ) {
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
		enterRule(_localctx, 156, RULE_conditionalOp);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(848);
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
		enterRule(_localctx, 158, RULE_type);
		try {
			setState(857);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,60,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(850);
				match(VALUE_TYPE);
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(851);
				dataStructureType();
				}
				break;
			case 3:
				enterOuterAlt(_localctx, 3);
				{
				setState(852);
				match(TYPENAME);
				}
				break;
			case 4:
				enterOuterAlt(_localctx, 4);
				{
				setState(853);
				match(TYPENAME);
				setState(854);
				genericSpecifier();
				}
				break;
			case 5:
				enterOuterAlt(_localctx, 5);
				{
				setState(855);
				tupleType();
				}
				break;
			case 6:
				enterOuterAlt(_localctx, 6);
				{
				setState(856);
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
		enterRule(_localctx, 160, RULE_dataStructureType);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(859);
			_la = _input.LA(1);
			if ( !(((((_la - 69)) & ~0x3f) == 0 && ((1L << (_la - 69)) & 15L) != 0)) ) {
			_errHandler.recoverInline(this);
			}
			else {
				if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
				_errHandler.reportMatch(this);
				consume();
			}
			setState(860);
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
		enterRule(_localctx, 162, RULE_genericSpecifier);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(862);
			match(LT);
			setState(863);
			match(OF);
			setState(864);
			type();
			setState(869);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==COMMA) {
				{
				{
				setState(865);
				match(COMMA);
				setState(866);
				type();
				}
				}
				setState(871);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			setState(872);
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
		enterRule(_localctx, 164, RULE_tupleType);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(874);
			match(OPEN_BRACKET);
			setState(875);
			type();
			setState(878); 
			_errHandler.sync(this);
			_la = _input.LA(1);
			do {
				{
				{
				setState(876);
				match(COMMA);
				setState(877);
				type();
				}
				}
				setState(880); 
				_errHandler.sync(this);
				_la = _input.LA(1);
			} while ( _la==COMMA );
			setState(882);
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
		enterRule(_localctx, 166, RULE_typeList);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(884);
			type();
			setState(889);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==COMMA) {
				{
				{
				setState(885);
				match(COMMA);
				setState(886);
				type();
				}
				}
				setState(891);
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
		public TerminalNode LT() { return getToken(ElanParser.LT, 0); }
		public TerminalNode OF() { return getToken(ElanParser.OF, 0); }
		public TypeListContext typeList() {
			return getRuleContext(TypeListContext.class,0);
		}
		public TerminalNode ARROW() { return getToken(ElanParser.ARROW, 0); }
		public TypeContext type() {
			return getRuleContext(TypeContext.class,0);
		}
		public TerminalNode GT() { return getToken(ElanParser.GT, 0); }
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
		enterRule(_localctx, 168, RULE_funcType);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(892);
			match(T__0);
			setState(893);
			match(LT);
			setState(894);
			match(OF);
			setState(895);
			typeList();
			setState(896);
			match(ARROW);
			setState(897);
			type();
			setState(898);
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

	public static final String _serializedATN =
		"\u0004\u0001h\u0385\u0002\u0000\u0007\u0000\u0002\u0001\u0007\u0001\u0002"+
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
		"P\u0007P\u0002Q\u0007Q\u0002R\u0007R\u0002S\u0007S\u0002T\u0007T\u0001"+
		"\u0000\u0001\u0000\u0005\u0000\u00ad\b\u0000\n\u0000\f\u0000\u00b0\t\u0000"+
		"\u0001\u0000\u0005\u0000\u00b3\b\u0000\n\u0000\f\u0000\u00b6\t\u0000\u0001"+
		"\u0001\u0001\u0001\u0001\u0001\u0001\u0001\u0001\u0002\u0001\u0002\u0001"+
		"\u0002\u0001\u0003\u0001\u0003\u0001\u0003\u0005\u0003\u00c2\b\u0003\n"+
		"\u0003\f\u0003\u00c5\t\u0003\u0001\u0004\u0001\u0004\u0001\u0004\u0001"+
		"\u0004\u0001\u0004\u0001\u0004\u0001\u0004\u0001\u0004\u0003\u0004\u00cf"+
		"\b\u0004\u0001\u0005\u0001\u0005\u0001\u0005\u0001\u0005\u0001\u0005\u0001"+
		"\u0005\u0001\u0005\u0001\u0006\u0001\u0006\u0001\u0006\u0001\u0006\u0001"+
		"\u0006\u0001\u0006\u0001\u0006\u0001\u0006\u0001\u0007\u0001\u0007\u0001"+
		"\u0007\u0001\u0007\u0001\u0007\u0001\u0007\u0001\u0007\u0001\u0007\u0001"+
		"\u0007\u0001\u0007\u0001\u0007\u0001\b\u0001\b\u0001\b\u0001\b\u0001\b"+
		"\u0001\b\u0001\b\u0001\t\u0001\t\u0001\t\u0001\t\u0003\t\u00f6\b\t\u0001"+
		"\n\u0001\n\u0001\n\u0001\n\u0001\n\u0001\n\u0001\n\u0005\n\u00ff\b\n\n"+
		"\n\f\n\u0102\t\n\u0001\n\u0001\n\u0001\n\u0001\n\u0001\u000b\u0001\u000b"+
		"\u0001\u000b\u0001\u000b\u0001\u000b\u0001\u000b\u0001\u000b\u0001\u000b"+
		"\u0001\f\u0001\f\u0001\f\u0003\f\u0113\b\f\u0001\f\u0001\f\u0001\r\u0001"+
		"\r\u0001\r\u0005\r\u011a\b\r\n\r\f\r\u011d\t\r\u0001\u000e\u0001\u000e"+
		"\u0001\u000e\u0001\u000e\u0001\u000f\u0001\u000f\u0001\u000f\u0003\u000f"+
		"\u0126\b\u000f\u0001\u000f\u0001\u000f\u0001\u000f\u0001\u000f\u0001\u0010"+
		"\u0001\u0010\u0005\u0010\u012e\b\u0010\n\u0010\f\u0010\u0131\t\u0010\u0001"+
		"\u0011\u0001\u0011\u0001\u0011\u0001\u0011\u0001\u0011\u0001\u0011\u0001"+
		"\u0011\u0001\u0011\u0003\u0011\u013b\b\u0011\u0001\u0012\u0001\u0012\u0001"+
		"\u0012\u0001\u0012\u0001\u0012\u0001\u0012\u0001\u0012\u0003\u0012\u0144"+
		"\b\u0012\u0001\u0013\u0001\u0013\u0001\u0013\u0001\u0013\u0001\u0013\u0001"+
		"\u0013\u0001\u0013\u0001\u0014\u0001\u0014\u0001\u0014\u0001\u0014\u0001"+
		"\u0014\u0001\u0014\u0001\u0015\u0001\u0015\u0001\u0015\u0001\u0015\u0001"+
		"\u0015\u0001\u0015\u0001\u0015\u0003\u0015\u015a\b\u0015\u0001\u0016\u0001"+
		"\u0016\u0001\u0016\u0001\u0016\u0001\u0017\u0001\u0017\u0001\u0017\u0003"+
		"\u0017\u0163\b\u0017\u0001\u0018\u0001\u0018\u0001\u0018\u0001\u0019\u0001"+
		"\u0019\u0001\u0019\u0001\u0019\u0001\u0019\u0001\u0019\u0001\u001a\u0001"+
		"\u001a\u0001\u001a\u0001\u001a\u0001\u001a\u0001\u001a\u0001\u001b\u0001"+
		"\u001b\u0003\u001b\u0176\b\u001b\u0001\u001b\u0001\u001b\u0003\u001b\u017a"+
		"\b\u001b\u0001\u001b\u0001\u001b\u0003\u001b\u017e\b\u001b\u0001\u001c"+
		"\u0001\u001c\u0001\u001c\u0001\u001c\u0001\u001c\u0003\u001c\u0185\b\u001c"+
		"\u0001\u001c\u0001\u001c\u0001\u001c\u0003\u001c\u018a\b\u001c\u0001\u001c"+
		"\u0001\u001c\u0001\u001d\u0001\u001d\u0001\u001d\u0005\u001d\u0191\b\u001d"+
		"\n\u001d\f\u001d\u0194\t\u001d\u0001\u001e\u0001\u001e\u0001\u001e\u0001"+
		"\u001e\u0001\u001e\u0005\u001e\u019b\b\u001e\n\u001e\f\u001e\u019e\t\u001e"+
		"\u0001\u001e\u0001\u001e\u0001\u001e\u0001\u001e\u0001\u001f\u0001\u001f"+
		"\u0001\u001f\u0003\u001f\u01a7\b\u001f\u0001\u001f\u0001\u001f\u0001 "+
		"\u0001 \u0001 \u0001 \u0001 \u0001 \u0001 \u0001 \u0001 \u0003 \u01b4"+
		"\b \u0001 \u0001 \u0001 \u0001 \u0001 \u0001 \u0001!\u0001!\u0001!\u0001"+
		"!\u0001!\u0001!\u0001!\u0001!\u0001!\u0001!\u0001\"\u0001\"\u0001\"\u0001"+
		"\"\u0001\"\u0001\"\u0001\"\u0001\"\u0001#\u0001#\u0001#\u0001#\u0001#"+
		"\u0001#\u0001#\u0001#\u0001#\u0001$\u0001$\u0001$\u0001$\u0001$\u0001"+
		"$\u0001$\u0001%\u0001%\u0001%\u0001%\u0004%\u01e2\b%\u000b%\f%\u01e3\u0001"+
		"%\u0001%\u0001%\u0001%\u0001%\u0001&\u0001&\u0001&\u0001&\u0001&\u0001"+
		"\'\u0001\'\u0001\'\u0001\'\u0001(\u0001(\u0001(\u0001(\u0003(\u01f8\b"+
		"(\u0001(\u0001(\u0001(\u0001(\u0001(\u0005(\u01ff\b(\n(\f(\u0202\t(\u0001"+
		"(\u0001(\u0001(\u0001(\u0001)\u0001)\u0001)\u0001)\u0001)\u0003)\u020d"+
		"\b)\u0001)\u0001)\u0001)\u0001)\u0001)\u0001)\u0001)\u0001)\u0001)\u0001"+
		")\u0001)\u0005)\u021a\b)\n)\f)\u021d\t)\u0001)\u0001)\u0001)\u0001)\u0001"+
		"*\u0001*\u0001*\u0001*\u0001*\u0003*\u0228\b*\u0001*\u0001*\u0001*\u0001"+
		"*\u0005*\u022e\b*\n*\f*\u0231\t*\u0001*\u0001*\u0001*\u0001*\u0001+\u0001"+
		"+\u0001+\u0001+\u0001+\u0001+\u0003+\u023d\b+\u0001+\u0001+\u0001+\u0001"+
		"+\u0001+\u0001+\u0001+\u0005+\u0246\b+\n+\f+\u0249\t+\u0001+\u0001+\u0001"+
		"+\u0001+\u0001,\u0001,\u0001,\u0001,\u0005,\u0253\b,\n,\f,\u0256\t,\u0001"+
		"-\u0001-\u0001-\u0001-\u0003-\u025c\b-\u0001-\u0001-\u0001-\u0001-\u0001"+
		"-\u0001-\u0001.\u0003.\u0265\b.\u0001.\u0001.\u0001.\u0001.\u0001.\u0001"+
		"/\u0001/\u0001/\u0001/\u0001/\u0001/\u0001/\u0001/\u0003/\u0274\b/\u0001"+
		"0\u00010\u00010\u00010\u00010\u00010\u00010\u00010\u00010\u00010\u0001"+
		"0\u00030\u0281\b0\u00011\u00011\u00011\u00011\u00012\u00012\u00012\u0001"+
		"2\u00012\u00013\u00013\u00013\u00013\u00013\u00013\u00013\u00014\u0001"+
		"4\u00014\u00014\u00034\u0297\b4\u00014\u00014\u00015\u00015\u00015\u0001"+
		"6\u00016\u00036\u02a0\b6\u00016\u00016\u00036\u02a4\b6\u00017\u00017\u0001"+
		"7\u00018\u00018\u00018\u00018\u00018\u00018\u00018\u00038\u02b0\b8\u0001"+
		"8\u00018\u00019\u00019\u00019\u00019\u00019\u00019\u00019\u00019\u0001"+
		"9\u00039\u02bd\b9\u0001:\u0001:\u0001:\u0001:\u0001:\u0005:\u02c4\b:\n"+
		":\f:\u02c7\t:\u0001:\u0001:\u0001;\u0001;\u0001;\u0001;\u0001;\u0001<"+
		"\u0001<\u0003<\u02d2\b<\u0001=\u0001=\u0001=\u0001=\u0001=\u0003=\u02d9"+
		"\b=\u0001>\u0001>\u0001>\u0001>\u0001?\u0001?\u0001?\u0001?\u0003?\u02e3"+
		"\b?\u0001@\u0001@\u0001@\u0001@\u0001@\u0001@\u0005@\u02eb\b@\n@\f@\u02ee"+
		"\t@\u0001@\u0001@\u0001A\u0001A\u0001A\u0003A\u02f5\bA\u0001B\u0001B\u0001"+
		"B\u0001B\u0005B\u02fb\bB\nB\fB\u02fe\tB\u0001B\u0001B\u0001C\u0001C\u0001"+
		"C\u0001C\u0001C\u0001C\u0005C\u0308\bC\nC\fC\u030b\tC\u0001C\u0001C\u0001"+
		"D\u0001D\u0001D\u0001D\u0005D\u0313\bD\nD\fD\u0316\tD\u0001D\u0001D\u0001"+
		"E\u0001E\u0001E\u0001E\u0001F\u0001F\u0001F\u0001F\u0005F\u0322\bF\nF"+
		"\fF\u0325\tF\u0001F\u0001F\u0001G\u0001G\u0001G\u0001G\u0005G\u032d\b"+
		"G\nG\fG\u0330\tG\u0001G\u0001G\u0001H\u0001H\u0001H\u0001H\u0001I\u0001"+
		"I\u0001I\u0001I\u0004I\u033c\bI\u000bI\fI\u033d\u0001I\u0001I\u0001J\u0001"+
		"J\u0001J\u0001J\u0001J\u0001J\u0001K\u0001K\u0001K\u0003K\u034b\bK\u0001"+
		"L\u0001L\u0001M\u0001M\u0001N\u0001N\u0001O\u0001O\u0001O\u0001O\u0001"+
		"O\u0001O\u0001O\u0003O\u035a\bO\u0001P\u0001P\u0001P\u0001Q\u0001Q\u0001"+
		"Q\u0001Q\u0001Q\u0005Q\u0364\bQ\nQ\fQ\u0367\tQ\u0001Q\u0001Q\u0001R\u0001"+
		"R\u0001R\u0001R\u0004R\u036f\bR\u000bR\fR\u0370\u0001R\u0001R\u0001S\u0001"+
		"S\u0001S\u0005S\u0378\bS\nS\fS\u037b\tS\u0001T\u0001T\u0001T\u0001T\u0001"+
		"T\u0001T\u0001T\u0001T\u0001T\u0000\u0000U\u0000\u0002\u0004\u0006\b\n"+
		"\f\u000e\u0010\u0012\u0014\u0016\u0018\u001a\u001c\u001e \"$&(*,.0246"+
		"8:<>@BDFHJLNPRTVXZ\\^`bdfhjlnprtvxz|~\u0080\u0082\u0084\u0086\u0088\u008a"+
		"\u008c\u008e\u0090\u0092\u0094\u0096\u0098\u009a\u009c\u009e\u00a0\u00a2"+
		"\u00a4\u00a6\u00a8\u0000\b\u0001\u0000_`\u0002\u0000``dd\u0002\u0000("+
		"(VV\u0004\u0000\u001a\u001a$$11``\u0003\u0000\u0012\u0012&&UY\u0003\u0000"+
		"\u0006\u0006++BB\u0002\u0000**Z^\u0001\u0000EH\u039f\u0000\u00aa\u0001"+
		"\u0000\u0000\u0000\u0002\u00b7\u0001\u0000\u0000\u0000\u0004\u00bb\u0001"+
		"\u0000\u0000\u0000\u0006\u00be\u0001\u0000\u0000\u0000\b\u00ce\u0001\u0000"+
		"\u0000\u0000\n\u00d0\u0001\u0000\u0000\u0000\f\u00d7\u0001\u0000\u0000"+
		"\u0000\u000e\u00df\u0001\u0000\u0000\u0000\u0010\u00ea\u0001\u0000\u0000"+
		"\u0000\u0012\u00f5\u0001\u0000\u0000\u0000\u0014\u00f7\u0001\u0000\u0000"+
		"\u0000\u0016\u0107\u0001\u0000\u0000\u0000\u0018\u010f\u0001\u0000\u0000"+
		"\u0000\u001a\u0116\u0001\u0000\u0000\u0000\u001c\u011e\u0001\u0000\u0000"+
		"\u0000\u001e\u0122\u0001\u0000\u0000\u0000 \u012f\u0001\u0000\u0000\u0000"+
		"\"\u013a\u0001\u0000\u0000\u0000$\u0143\u0001\u0000\u0000\u0000&\u0145"+
		"\u0001\u0000\u0000\u0000(\u014c\u0001\u0000\u0000\u0000*\u0152\u0001\u0000"+
		"\u0000\u0000,\u015b\u0001\u0000\u0000\u0000.\u015f\u0001\u0000\u0000\u0000"+
		"0\u0164\u0001\u0000\u0000\u00002\u0167\u0001\u0000\u0000\u00004\u016d"+
		"\u0001\u0000\u0000\u00006\u017d\u0001\u0000\u0000\u00008\u0184\u0001\u0000"+
		"\u0000\u0000:\u018d\u0001\u0000\u0000\u0000<\u0195\u0001\u0000\u0000\u0000"+
		">\u01a3\u0001\u0000\u0000\u0000@\u01aa\u0001\u0000\u0000\u0000B\u01bb"+
		"\u0001\u0000\u0000\u0000D\u01c5\u0001\u0000\u0000\u0000F\u01cd\u0001\u0000"+
		"\u0000\u0000H\u01d6\u0001\u0000\u0000\u0000J\u01dd\u0001\u0000\u0000\u0000"+
		"L\u01ea\u0001\u0000\u0000\u0000N\u01ef\u0001\u0000\u0000\u0000P\u01f3"+
		"\u0001\u0000\u0000\u0000R\u0207\u0001\u0000\u0000\u0000T\u0222\u0001\u0000"+
		"\u0000\u0000V\u0236\u0001\u0000\u0000\u0000X\u024e\u0001\u0000\u0000\u0000"+
		"Z\u0257\u0001\u0000\u0000\u0000\\\u0264\u0001\u0000\u0000\u0000^\u0273"+
		"\u0001\u0000\u0000\u0000`\u0280\u0001\u0000\u0000\u0000b\u0282\u0001\u0000"+
		"\u0000\u0000d\u0286\u0001\u0000\u0000\u0000f\u028b\u0001\u0000\u0000\u0000"+
		"h\u0292\u0001\u0000\u0000\u0000j\u029a\u0001\u0000\u0000\u0000l\u029f"+
		"\u0001\u0000\u0000\u0000n\u02a5\u0001\u0000\u0000\u0000p\u02a8\u0001\u0000"+
		"\u0000\u0000r\u02bc\u0001\u0000\u0000\u0000t\u02be\u0001\u0000\u0000\u0000"+
		"v\u02ca\u0001\u0000\u0000\u0000x\u02d1\u0001\u0000\u0000\u0000z\u02d8"+
		"\u0001\u0000\u0000\u0000|\u02da\u0001\u0000\u0000\u0000~\u02e2\u0001\u0000"+
		"\u0000\u0000\u0080\u02e4\u0001\u0000\u0000\u0000\u0082\u02f4\u0001\u0000"+
		"\u0000\u0000\u0084\u02f6\u0001\u0000\u0000\u0000\u0086\u0301\u0001\u0000"+
		"\u0000\u0000\u0088\u030e\u0001\u0000\u0000\u0000\u008a\u0319\u0001\u0000"+
		"\u0000\u0000\u008c\u031d\u0001\u0000\u0000\u0000\u008e\u0328\u0001\u0000"+
		"\u0000\u0000\u0090\u0333\u0001\u0000\u0000\u0000\u0092\u0337\u0001\u0000"+
		"\u0000\u0000\u0094\u0341\u0001\u0000\u0000\u0000\u0096\u034a\u0001\u0000"+
		"\u0000\u0000\u0098\u034c\u0001\u0000\u0000\u0000\u009a\u034e\u0001\u0000"+
		"\u0000\u0000\u009c\u0350\u0001\u0000\u0000\u0000\u009e\u0359\u0001\u0000"+
		"\u0000\u0000\u00a0\u035b\u0001\u0000\u0000\u0000\u00a2\u035e\u0001\u0000"+
		"\u0000\u0000\u00a4\u036a\u0001\u0000\u0000\u0000\u00a6\u0374\u0001\u0000"+
		"\u0000\u0000\u00a8\u037c\u0001\u0000\u0000\u0000\u00aa\u00ae\u0003\u0002"+
		"\u0001\u0000\u00ab\u00ad\u0003\u0004\u0002\u0000\u00ac\u00ab\u0001\u0000"+
		"\u0000\u0000\u00ad\u00b0\u0001\u0000\u0000\u0000\u00ae\u00ac\u0001\u0000"+
		"\u0000\u0000\u00ae\u00af\u0001\u0000\u0000\u0000\u00af\u00b4\u0001\u0000"+
		"\u0000\u0000\u00b0\u00ae\u0001\u0000\u0000\u0000\u00b1\u00b3\u0003\b\u0004"+
		"\u0000\u00b2\u00b1\u0001\u0000\u0000\u0000\u00b3\u00b6\u0001\u0000\u0000"+
		"\u0000\u00b4\u00b2\u0001\u0000\u0000\u0000\u00b4\u00b5\u0001\u0000\u0000"+
		"\u0000\u00b5\u0001\u0001\u0000\u0000\u0000\u00b6\u00b4\u0001\u0000\u0000"+
		"\u0000\u00b7\u00b8\u0005\u0004\u0000\u0000\u00b8\u00b9\u0005f\u0000\u0000"+
		"\u00b9\u00ba\u0005\u0002\u0000\u0000\u00ba\u0003\u0001\u0000\u0000\u0000"+
		"\u00bb\u00bc\u0005\u001d\u0000\u0000\u00bc\u00bd\u0003\u0006\u0003\u0000"+
		"\u00bd\u0005\u0001\u0000\u0000\u0000\u00be\u00c3\u0007\u0000\u0000\u0000"+
		"\u00bf\u00c0\u0005R\u0000\u0000\u00c0\u00c2\u0007\u0000\u0000\u0000\u00c1"+
		"\u00bf\u0001\u0000\u0000\u0000\u00c2\u00c5\u0001\u0000\u0000\u0000\u00c3"+
		"\u00c1\u0001\u0000\u0000\u0000\u00c3\u00c4\u0001\u0000\u0000\u0000\u00c4"+
		"\u0007\u0001\u0000\u0000\u0000\u00c5\u00c3\u0001\u0000\u0000\u0000\u00c6"+
		"\u00cf\u0003\n\u0005\u0000\u00c7\u00cf\u0003\f\u0006\u0000\u00c8\u00cf"+
		"\u0003\u000e\u0007\u0000\u00c9\u00cf\u0003\u0010\b\u0000\u00ca\u00cf\u0003"+
		"\u0014\n\u0000\u00cb\u00cf\u0003\u0012\t\u0000\u00cc\u00cf\u0003\u0016"+
		"\u000b\u0000\u00cd\u00cf\u0003\u0002\u0001\u0000\u00ce\u00c6\u0001\u0000"+
		"\u0000\u0000\u00ce\u00c7\u0001\u0000\u0000\u0000\u00ce\u00c8\u0001\u0000"+
		"\u0000\u0000\u00ce\u00c9\u0001\u0000\u0000\u0000\u00ce\u00ca\u0001\u0000"+
		"\u0000\u0000\u00ce\u00cb\u0001\u0000\u0000\u0000\u00ce\u00cc\u0001\u0000"+
		"\u0000\u0000\u00ce\u00cd\u0001\u0000\u0000\u0000\u00cf\t\u0001\u0000\u0000"+
		"\u0000\u00d0\u00d1\u0005\u0002\u0000\u0000\u00d1\u00d2\u0005%\u0000\u0000"+
		"\u00d2\u00d3\u0003 \u0010\u0000\u00d3\u00d4\u0005\u0002\u0000\u0000\u00d4"+
		"\u00d5\u0005\u0015\u0000\u0000\u00d5\u00d6\u0005%\u0000\u0000\u00d6\u000b"+
		"\u0001\u0000\u0000\u0000\u00d7\u00d8\u0005\u0002\u0000\u0000\u00d8\u00d9"+
		"\u00050\u0000\u0000\u00d9\u00da\u0003\u0018\f\u0000\u00da\u00db\u0003"+
		" \u0010\u0000\u00db\u00dc\u0005\u0002\u0000\u0000\u00dc\u00dd\u0005\u0015"+
		"\u0000\u0000\u00dd\u00de\u00050\u0000\u0000\u00de\r\u0001\u0000\u0000"+
		"\u0000\u00df\u00e0\u0005\u0002\u0000\u0000\u00e0\u00e1\u0005\u0019\u0000"+
		"\u0000\u00e1\u00e2\u0003\u001e\u000f\u0000\u00e2\u00e3\u0003 \u0010\u0000"+
		"\u00e3\u00e4\u0005\u0002\u0000\u0000\u00e4\u00e5\u00053\u0000\u0000\u00e5"+
		"\u00e6\u0003^/\u0000\u00e6\u00e7\u0005\u0002\u0000\u0000\u00e7\u00e8\u0005"+
		"\u0015\u0000\u0000\u00e8\u00e9\u0005\u0019\u0000\u0000\u00e9\u000f\u0001"+
		"\u0000\u0000\u0000\u00ea\u00eb\u0005\u0002\u0000\u0000\u00eb\u00ec\u0005"+
		"\u000e\u0000\u0000\u00ec\u00ed\u0005`\u0000\u0000\u00ed\u00ee\u00054\u0000"+
		"\u0000\u00ee\u00ef\u0005<\u0000\u0000\u00ef\u00f0\u0003x<\u0000\u00f0"+
		"\u0011\u0001\u0000\u0000\u0000\u00f1\u00f6\u0003P(\u0000\u00f2\u00f6\u0003"+
		"R)\u0000\u00f3\u00f6\u0003T*\u0000\u00f4\u00f6\u0003V+\u0000\u00f5\u00f1"+
		"\u0001\u0000\u0000\u0000\u00f5\u00f2\u0001\u0000\u0000\u0000\u00f5\u00f3"+
		"\u0001\u0000\u0000\u0000\u00f5\u00f4\u0001\u0000\u0000\u0000\u00f6\u0013"+
		"\u0001\u0000\u0000\u0000\u00f7\u00f8\u0005\u0002\u0000\u0000\u00f8\u00f9"+
		"\u0005\u0016\u0000\u0000\u00f9\u00fa\u0005_\u0000\u0000\u00fa\u00fb\u0005"+
		"\u0002\u0000\u0000\u00fb\u0100\u0005`\u0000\u0000\u00fc\u00fd\u0005S\u0000"+
		"\u0000\u00fd\u00ff\u0005`\u0000\u0000\u00fe\u00fc\u0001\u0000\u0000\u0000"+
		"\u00ff\u0102\u0001\u0000\u0000\u0000\u0100\u00fe\u0001\u0000\u0000\u0000"+
		"\u0100\u0101\u0001\u0000\u0000\u0000\u0101\u0103\u0001\u0000\u0000\u0000"+
		"\u0102\u0100\u0001\u0000\u0000\u0000\u0103\u0104\u0005\u0002\u0000\u0000"+
		"\u0104\u0105\u0005\u0015\u0000\u0000\u0105\u0106\u0005\u0016\u0000\u0000"+
		"\u0106\u0015\u0001\u0000\u0000\u0000\u0107\u0108\u0005\u0002\u0000\u0000"+
		"\u0108\u0109\u00058\u0000\u0000\u0109\u010a\u0005`\u0000\u0000\u010a\u010b"+
		"\u0003 \u0010\u0000\u010b\u010c\u0005\u0002\u0000\u0000\u010c\u010d\u0005"+
		"\u0015\u0000\u0000\u010d\u010e\u00058\u0000\u0000\u010e\u0017\u0001\u0000"+
		"\u0000\u0000\u010f\u0110\u0005`\u0000\u0000\u0110\u0112\u0005O\u0000\u0000"+
		"\u0111\u0113\u0003\u001a\r\u0000\u0112\u0111\u0001\u0000\u0000\u0000\u0112"+
		"\u0113\u0001\u0000\u0000\u0000\u0113\u0114\u0001\u0000\u0000\u0000\u0114"+
		"\u0115\u0005P\u0000\u0000\u0115\u0019\u0001\u0000\u0000\u0000\u0116\u011b"+
		"\u0003\u001c\u000e\u0000\u0117\u0118\u0005S\u0000\u0000\u0118\u011a\u0003"+
		"\u001c\u000e\u0000\u0119\u0117\u0001\u0000\u0000\u0000\u011a\u011d\u0001"+
		"\u0000\u0000\u0000\u011b\u0119\u0001\u0000\u0000\u0000\u011b\u011c\u0001"+
		"\u0000\u0000\u0000\u011c\u001b\u0001\u0000\u0000\u0000\u011d\u011b\u0001"+
		"\u0000\u0000\u0000\u011e\u011f\u0005`\u0000\u0000\u011f\u0120\u0005\u0007"+
		"\u0000\u0000\u0120\u0121\u0003\u009eO\u0000\u0121\u001d\u0001\u0000\u0000"+
		"\u0000\u0122\u0123\u0005`\u0000\u0000\u0123\u0125\u0005O\u0000\u0000\u0124"+
		"\u0126\u0003\u001a\r\u0000\u0125\u0124\u0001\u0000\u0000\u0000\u0125\u0126"+
		"\u0001\u0000\u0000\u0000\u0126\u0127\u0001\u0000\u0000\u0000\u0127\u0128"+
		"\u0005P\u0000\u0000\u0128\u0129\u00053\u0000\u0000\u0129\u012a\u0003\u009e"+
		"O\u0000\u012a\u001f\u0001\u0000\u0000\u0000\u012b\u012e\u0003\"\u0011"+
		"\u0000\u012c\u012e\u0003$\u0012\u0000\u012d\u012b\u0001\u0000\u0000\u0000"+
		"\u012d\u012c\u0001\u0000\u0000\u0000\u012e\u0131\u0001\u0000\u0000\u0000"+
		"\u012f\u012d\u0001\u0000\u0000\u0000\u012f\u0130\u0001\u0000\u0000\u0000"+
		"\u0130!\u0001\u0000\u0000\u0000\u0131\u012f\u0001\u0000\u0000\u0000\u0132"+
		"\u013b\u0003&\u0013\u0000\u0133\u013b\u00034\u001a\u0000\u0134\u013b\u0003"+
		"(\u0014\u0000\u0135\u013b\u0003*\u0015\u0000\u0136\u013b\u0003,\u0016"+
		"\u0000\u0137\u013b\u0003.\u0017\u0000\u0138\u013b\u00030\u0018\u0000\u0139"+
		"\u013b\u00032\u0019\u0000\u013a\u0132\u0001\u0000\u0000\u0000\u013a\u0133"+
		"\u0001\u0000\u0000\u0000\u013a\u0134\u0001\u0000\u0000\u0000\u013a\u0135"+
		"\u0001\u0000\u0000\u0000\u013a\u0136\u0001\u0000\u0000\u0000\u013a\u0137"+
		"\u0001\u0000\u0000\u0000\u013a\u0138\u0001\u0000\u0000\u0000\u013a\u0139"+
		"\u0001\u0000\u0000\u0000\u013b#\u0001\u0000\u0000\u0000\u013c\u0144\u0003"+
		"<\u001e\u0000\u013d\u0144\u0003@ \u0000\u013e\u0144\u0003B!\u0000\u013f"+
		"\u0144\u0003D\"\u0000\u0140\u0144\u0003F#\u0000\u0141\u0144\u0003H$\u0000"+
		"\u0142\u0144\u0003J%\u0000\u0143\u013c\u0001\u0000\u0000\u0000\u0143\u013d"+
		"\u0001\u0000\u0000\u0000\u0143\u013e\u0001\u0000\u0000\u0000\u0143\u013f"+
		"\u0001\u0000\u0000\u0000\u0143\u0140\u0001\u0000\u0000\u0000\u0143\u0141"+
		"\u0001\u0000\u0000\u0000\u0143\u0142\u0001\u0000\u0000\u0000\u0144%\u0001"+
		"\u0000\u0000\u0000\u0145\u0146\u0005\u0002\u0000\u0000\u0146\u0147\u0005"+
		">\u0000\u0000\u0147\u0148\u00036\u001b\u0000\u0148\u0149\u00054\u0000"+
		"\u0000\u0149\u014a\u0005<\u0000\u0000\u014a\u014b\u0003^/\u0000\u014b"+
		"\'\u0001\u0000\u0000\u0000\u014c\u014d\u0005\u0002\u0000\u0000\u014d\u014e"+
		"\u00054\u0000\u0000\u014e\u014f\u00036\u001b\u0000\u014f\u0150\u0005<"+
		"\u0000\u0000\u0150\u0151\u0003^/\u0000\u0151)\u0001\u0000\u0000\u0000"+
		"\u0152\u0153\u0005\u0002\u0000\u0000\u0153\u0159\u0005\n\u0000\u0000\u0154"+
		"\u015a\u00038\u001c\u0000\u0155\u0156\u00036\u001b\u0000\u0156\u0157\u0005"+
		"R\u0000\u0000\u0157\u0158\u00038\u001c\u0000\u0158\u015a\u0001\u0000\u0000"+
		"\u0000\u0159\u0154\u0001\u0000\u0000\u0000\u0159\u0155\u0001\u0000\u0000"+
		"\u0000\u015a+\u0001\u0000\u0000\u0000\u015b\u015c\u0005\u0002\u0000\u0000"+
		"\u015c\u015d\u0005;\u0000\u0000\u015d\u015e\u0007\u0001\u0000\u0000\u015e"+
		"-\u0001\u0000\u0000\u0000\u015f\u0160\u0005\u0002\u0000\u0000\u0160\u0162"+
		"\u0005.\u0000\u0000\u0161\u0163\u0003^/\u0000\u0162\u0161\u0001\u0000"+
		"\u0000\u0000\u0162\u0163\u0001\u0000\u0000\u0000\u0163/\u0001\u0000\u0000"+
		"\u0000\u0164\u0165\u0005!\u0000\u0000\u0165\u0166\u00036\u001b\u0000\u0166"+
		"1\u0001\u0000\u0000\u0000\u0167\u0168\u0005\u0002\u0000\u0000\u0168\u0169"+
		"\u0005\t\u0000\u0000\u0169\u016a\u0003^/\u0000\u016a\u016b\u0005*\u0000"+
		"\u0000\u016b\u016c\u0003x<\u0000\u016c3\u0001\u0000\u0000\u0000\u016d"+
		"\u016e\u0005\u0002\u0000\u0000\u016e\u016f\u0005#\u0000\u0000\u016f\u0170"+
		"\u0005`\u0000\u0000\u0170\u0171\u0005\b\u0000\u0000\u0171\u0172\u0003"+
		"^/\u0000\u01725\u0001\u0000\u0000\u0000\u0173\u0174\u00051\u0000\u0000"+
		"\u0174\u0176\u0005R\u0000\u0000\u0175\u0173\u0001\u0000\u0000\u0000\u0175"+
		"\u0176\u0001\u0000\u0000\u0000\u0176\u0177\u0001\u0000\u0000\u0000\u0177"+
		"\u0179\u0005`\u0000\u0000\u0178\u017a\u0003p8\u0000\u0179\u0178\u0001"+
		"\u0000\u0000\u0000\u0179\u017a\u0001\u0000\u0000\u0000\u017a\u017e\u0001"+
		"\u0000\u0000\u0000\u017b\u017e\u0003\u0092I\u0000\u017c\u017e\u0003\u0094"+
		"J\u0000\u017d\u0175\u0001\u0000\u0000\u0000\u017d\u017b\u0001\u0000\u0000"+
		"\u0000\u017d\u017c\u0001\u0000\u0000\u0000\u017e7\u0001\u0000\u0000\u0000"+
		"\u017f\u0185\u00051\u0000\u0000\u0180\u0185\u0005\u001a\u0000\u0000\u0181"+
		"\u0185\u0005$\u0000\u0000\u0182\u0183\u0005`\u0000\u0000\u0183\u0185\u0005"+
		"R\u0000\u0000\u0184\u017f\u0001\u0000\u0000\u0000\u0184\u0180\u0001\u0000"+
		"\u0000\u0000\u0184\u0181\u0001\u0000\u0000\u0000\u0184\u0182\u0001\u0000"+
		"\u0000\u0000\u0184\u0185\u0001\u0000\u0000\u0000\u0185\u0186\u0001\u0000"+
		"\u0000\u0000\u0186\u0187\u0005`\u0000\u0000\u0187\u0189\u0005O\u0000\u0000"+
		"\u0188\u018a\u0003:\u001d\u0000\u0189\u0188\u0001\u0000\u0000\u0000\u0189"+
		"\u018a\u0001\u0000\u0000\u0000\u018a\u018b\u0001\u0000\u0000\u0000\u018b"+
		"\u018c\u0005P\u0000\u0000\u018c9\u0001\u0000\u0000\u0000\u018d\u0192\u0003"+
		"^/\u0000\u018e\u018f\u0005S\u0000\u0000\u018f\u0191\u0003^/\u0000\u0190"+
		"\u018e\u0001\u0000\u0000\u0000\u0191\u0194\u0001\u0000\u0000\u0000\u0192"+
		"\u0190\u0001\u0000\u0000\u0000\u0192\u0193\u0001\u0000\u0000\u0000\u0193"+
		";\u0001\u0000\u0000\u0000\u0194\u0192\u0001\u0000\u0000\u0000\u0195\u0196"+
		"\u0005\u0002\u0000\u0000\u0196\u0197\u0005\u001b\u0000\u0000\u0197\u0198"+
		"\u0003^/\u0000\u0198\u019c\u0003 \u0010\u0000\u0199\u019b\u0003>\u001f"+
		"\u0000\u019a\u0199\u0001\u0000\u0000\u0000\u019b\u019e\u0001\u0000\u0000"+
		"\u0000\u019c\u019a\u0001\u0000\u0000\u0000\u019c\u019d\u0001\u0000\u0000"+
		"\u0000\u019d\u019f\u0001\u0000\u0000\u0000\u019e\u019c\u0001\u0000\u0000"+
		"\u0000\u019f\u01a0\u0005\u0002\u0000\u0000\u01a0\u01a1\u0005\u0015\u0000"+
		"\u0000\u01a1\u01a2\u0005\u001b\u0000\u0000\u01a2=\u0001\u0000\u0000\u0000"+
		"\u01a3\u01a6\u0005\u0014\u0000\u0000\u01a4\u01a5\u0005\u001b\u0000\u0000"+
		"\u01a5\u01a7\u0003^/\u0000\u01a6\u01a4\u0001\u0000\u0000\u0000\u01a6\u01a7"+
		"\u0001\u0000\u0000\u0000\u01a7\u01a8\u0001\u0000\u0000\u0000\u01a8\u01a9"+
		"\u0003 \u0010\u0000\u01a9?\u0001\u0000\u0000\u0000\u01aa\u01ab\u0005\u0002"+
		"\u0000\u0000\u01ab\u01ac\u0005\u0017\u0000\u0000\u01ac\u01ad\u0005`\u0000"+
		"\u0000\u01ad\u01ae\u0005\u0018\u0000\u0000\u01ae\u01af\u0003^/\u0000\u01af"+
		"\u01b0\u0005<\u0000\u0000\u01b0\u01b1\u0003^/\u0000\u01b1\u01b3\u0005"+
		"5\u0000\u0000\u01b2\u01b4\u0005V\u0000\u0000\u01b3\u01b2\u0001\u0000\u0000"+
		"\u0000\u01b3\u01b4\u0001\u0000\u0000\u0000\u01b4\u01b5\u0001\u0000\u0000"+
		"\u0000\u01b5\u01b6\u0005a\u0000\u0000\u01b6\u01b7\u0003 \u0010\u0000\u01b7"+
		"\u01b8\u0005\u0002\u0000\u0000\u01b8\u01b9\u0005\u0015\u0000\u0000\u01b9"+
		"\u01ba\u0005\u0017\u0000\u0000\u01baA\u0001\u0000\u0000\u0000\u01bb\u01bc"+
		"\u0005\u0002\u0000\u0000\u01bc\u01bd\u0005\u0013\u0000\u0000\u01bd\u01be"+
		"\u0005`\u0000\u0000\u01be\u01bf\u0005\u001e\u0000\u0000\u01bf\u01c0\u0003"+
		"^/\u0000\u01c0\u01c1\u0003 \u0010\u0000\u01c1\u01c2\u0005\u0002\u0000"+
		"\u0000\u01c2\u01c3\u0005\u0015\u0000\u0000\u01c3\u01c4\u0005\u0013\u0000"+
		"\u0000\u01c4C\u0001\u0000\u0000\u0000\u01c5\u01c6\u0005\u0002\u0000\u0000"+
		"\u01c6\u01c7\u0005@\u0000\u0000\u01c7\u01c8\u0003^/\u0000\u01c8\u01c9"+
		"\u0003 \u0010\u0000\u01c9\u01ca\u0005\u0002\u0000\u0000\u01ca\u01cb\u0005"+
		"\u0015\u0000\u0000\u01cb\u01cc\u0005@\u0000\u0000\u01ccE\u0001\u0000\u0000"+
		"\u0000\u01cd\u01ce\u0005\u0002\u0000\u0000\u01ce\u01cf\u00052\u0000\u0000"+
		"\u01cf\u01d0\u0003 \u0010\u0000\u01d0\u01d1\u0005\u0002\u0000\u0000\u01d1"+
		"\u01d2\u0005\u0015\u0000\u0000\u01d2\u01d3\u00052\u0000\u0000\u01d3\u01d4"+
		"\u0005?\u0000\u0000\u01d4\u01d5\u0003^/\u0000\u01d5G\u0001\u0000\u0000"+
		"\u0000\u01d6\u01d7\u0005\u0002\u0000\u0000\u01d7\u01d8\u0005=\u0000\u0000"+
		"\u01d8\u01d9\u0003 \u0010\u0000\u01d9\u01da\u0005\u0002\u0000\u0000\u01da"+
		"\u01db\u0005\u0015\u0000\u0000\u01db\u01dc\u0005=\u0000\u0000\u01dcI\u0001"+
		"\u0000\u0000\u0000\u01dd\u01de\u0005\u0002\u0000\u0000\u01de\u01df\u0005"+
		"6\u0000\u0000\u01df\u01e1\u0003^/\u0000\u01e0\u01e2\u0003L&\u0000\u01e1"+
		"\u01e0\u0001\u0000\u0000\u0000\u01e2\u01e3\u0001\u0000\u0000\u0000\u01e3"+
		"\u01e1\u0001\u0000\u0000\u0000\u01e3\u01e4\u0001\u0000\u0000\u0000\u01e4"+
		"\u01e5\u0001\u0000\u0000\u0000\u01e5\u01e6\u0003N\'\u0000\u01e6\u01e7"+
		"\u0005\u0002\u0000\u0000\u01e7\u01e8\u0005\u0015\u0000\u0000\u01e8\u01e9"+
		"\u00056\u0000\u0000\u01e9K\u0001\u0000\u0000\u0000\u01ea\u01eb\u0005\u0002"+
		"\u0000\u0000\u01eb\u01ec\u0005\u000b\u0000\u0000\u01ec\u01ed\u0003z=\u0000"+
		"\u01ed\u01ee\u0003 \u0010\u0000\u01eeM\u0001\u0000\u0000\u0000\u01ef\u01f0"+
		"\u0005\u0002\u0000\u0000\u01f0\u01f1\u0005\u0011\u0000\u0000\u01f1\u01f2"+
		"\u0003 \u0010\u0000\u01f2O\u0001\u0000\u0000\u0000\u01f3\u01f4\u0005\u0002"+
		"\u0000\u0000\u01f4\u01f5\u0005\r\u0000\u0000\u01f5\u01f7\u0005_\u0000"+
		"\u0000\u01f6\u01f8\u0003X,\u0000\u01f7\u01f6\u0001\u0000\u0000\u0000\u01f7"+
		"\u01f8\u0001\u0000\u0000\u0000\u01f8\u01f9\u0001\u0000\u0000\u0000\u01f9"+
		"\u0200\u0003Z-\u0000\u01fa\u01fb\u0005\u0002\u0000\u0000\u01fb\u01ff\u0003"+
		"\\.\u0000\u01fc\u01ff\u0003\u000e\u0007\u0000\u01fd\u01ff\u0003\f\u0006"+
		"\u0000\u01fe\u01fa\u0001\u0000\u0000\u0000\u01fe\u01fc\u0001\u0000\u0000"+
		"\u0000\u01fe\u01fd\u0001\u0000\u0000\u0000\u01ff\u0202\u0001\u0000\u0000"+
		"\u0000\u0200\u01fe\u0001\u0000\u0000\u0000\u0200\u0201\u0001\u0000\u0000"+
		"\u0000\u0201\u0203\u0001\u0000\u0000\u0000\u0202\u0200\u0001\u0000\u0000"+
		"\u0000\u0203\u0204\u0005\u0002\u0000\u0000\u0204\u0205\u0005\u0015\u0000"+
		"\u0000\u0205\u0206\u0005\r\u0000\u0000\u0206Q\u0001\u0000\u0000\u0000"+
		"\u0207\u0208\u0005\u0002\u0000\u0000\u0208\u0209\u0005\u0005\u0000\u0000"+
		"\u0209\u020a\u0005\r\u0000\u0000\u020a\u020c\u0005_\u0000\u0000\u020b"+
		"\u020d\u0003X,\u0000\u020c\u020b\u0001\u0000\u0000\u0000\u020c\u020d\u0001"+
		"\u0000\u0000\u0000\u020d\u021b\u0001\u0000\u0000\u0000\u020e\u020f\u0005"+
		"\u0002\u0000\u0000\u020f\u0210\u0005\u0005\u0000\u0000\u0210\u021a\u0003"+
		"\\.\u0000\u0211\u0212\u0005\u0002\u0000\u0000\u0212\u0213\u0005\u0005"+
		"\u0000\u0000\u0213\u0214\u0005\u0019\u0000\u0000\u0214\u021a\u0003\u001e"+
		"\u000f\u0000\u0215\u0216\u0005\u0002\u0000\u0000\u0216\u0217\u0005\u0005"+
		"\u0000\u0000\u0217\u0218\u00050\u0000\u0000\u0218\u021a\u0003\u0018\f"+
		"\u0000\u0219\u020e\u0001\u0000\u0000\u0000\u0219\u0211\u0001\u0000\u0000"+
		"\u0000\u0219\u0215\u0001\u0000\u0000\u0000\u021a\u021d\u0001\u0000\u0000"+
		"\u0000\u021b\u0219\u0001\u0000\u0000\u0000\u021b\u021c\u0001\u0000\u0000"+
		"\u0000\u021c\u021e\u0001\u0000\u0000\u0000\u021d\u021b\u0001\u0000\u0000"+
		"\u0000\u021e\u021f\u0005\u0002\u0000\u0000\u021f\u0220\u0005\u0015\u0000"+
		"\u0000\u0220\u0221\u0005\r\u0000\u0000\u0221S\u0001\u0000\u0000\u0000"+
		"\u0222\u0223\u0005\u0002\u0000\u0000\u0223\u0224\u0005\u001c\u0000\u0000"+
		"\u0224\u0225\u0005\r\u0000\u0000\u0225\u0227\u0005_\u0000\u0000\u0226"+
		"\u0228\u0003X,\u0000\u0227\u0226\u0001\u0000\u0000\u0000\u0227\u0228\u0001"+
		"\u0000\u0000\u0000\u0228\u0229\u0001\u0000\u0000\u0000\u0229\u022f\u0003"+
		"Z-\u0000\u022a\u022b\u0005\u0002\u0000\u0000\u022b\u022e\u0003\\.\u0000"+
		"\u022c\u022e\u0003\u000e\u0007\u0000\u022d\u022a\u0001\u0000\u0000\u0000"+
		"\u022d\u022c\u0001\u0000\u0000\u0000\u022e\u0231\u0001\u0000\u0000\u0000"+
		"\u022f\u022d\u0001\u0000\u0000\u0000\u022f\u0230\u0001\u0000\u0000\u0000"+
		"\u0230\u0232\u0001\u0000\u0000\u0000\u0231\u022f\u0001\u0000\u0000\u0000"+
		"\u0232\u0233\u0005\u0002\u0000\u0000\u0233\u0234\u0005\u0015\u0000\u0000"+
		"\u0234\u0235\u0005\r\u0000\u0000\u0235U\u0001\u0000\u0000\u0000\u0236"+
		"\u0237\u0005\u0002\u0000\u0000\u0237\u0238\u0005\u0005\u0000\u0000\u0238"+
		"\u0239\u0005\u001c\u0000\u0000\u0239\u023a\u0005\r\u0000\u0000\u023a\u023c"+
		"\u0005_\u0000\u0000\u023b\u023d\u0003X,\u0000\u023c\u023b\u0001\u0000"+
		"\u0000\u0000\u023c\u023d\u0001\u0000\u0000\u0000\u023d\u0247\u0001\u0000"+
		"\u0000\u0000\u023e\u023f\u0005\u0002\u0000\u0000\u023f\u0240\u0005\u0005"+
		"\u0000\u0000\u0240\u0246\u0003\\.\u0000\u0241\u0242\u0005\u0002\u0000"+
		"\u0000\u0242\u0243\u0005\u0005\u0000\u0000\u0243\u0244\u0005\u0019\u0000"+
		"\u0000\u0244\u0246\u0003\u001e\u000f\u0000\u0245\u023e\u0001\u0000\u0000"+
		"\u0000\u0245\u0241\u0001\u0000\u0000\u0000\u0246\u0249\u0001\u0000\u0000"+
		"\u0000\u0247\u0245\u0001\u0000\u0000\u0000\u0247\u0248\u0001\u0000\u0000"+
		"\u0000\u0248\u024a\u0001\u0000\u0000\u0000\u0249\u0247\u0001\u0000\u0000"+
		"\u0000\u024a\u024b\u0005\u0002\u0000\u0000\u024b\u024c\u0005\u0015\u0000"+
		"\u0000\u024c\u024d\u0005\r\u0000\u0000\u024dW\u0001\u0000\u0000\u0000"+
		"\u024e\u024f\u0005 \u0000\u0000\u024f\u0254\u0003\u009eO\u0000\u0250\u0251"+
		"\u0005S\u0000\u0000\u0251\u0253\u0003\u009eO\u0000\u0252\u0250\u0001\u0000"+
		"\u0000\u0000\u0253\u0256\u0001\u0000\u0000\u0000\u0254\u0252\u0001\u0000"+
		"\u0000\u0000\u0254\u0255\u0001\u0000\u0000\u0000\u0255Y\u0001\u0000\u0000"+
		"\u0000\u0256\u0254\u0001\u0000\u0000\u0000\u0257\u0258\u0005\u0002\u0000"+
		"\u0000\u0258\u0259\u0005\u000f\u0000\u0000\u0259\u025b\u0005O\u0000\u0000"+
		"\u025a\u025c\u0003\u001a\r\u0000\u025b\u025a\u0001\u0000\u0000\u0000\u025b"+
		"\u025c\u0001\u0000\u0000\u0000\u025c\u025d\u0001\u0000\u0000\u0000\u025d"+
		"\u025e\u0005P\u0000\u0000\u025e\u025f\u0003 \u0010\u0000\u025f\u0260\u0005"+
		"\u0002\u0000\u0000\u0260\u0261\u0005\u0015\u0000\u0000\u0261\u0262\u0005"+
		"\u000f\u0000\u0000\u0262[\u0001\u0000\u0000\u0000\u0263\u0265\u0005/\u0000"+
		"\u0000\u0264\u0263\u0001\u0000\u0000\u0000\u0264\u0265\u0001\u0000\u0000"+
		"\u0000\u0265\u0266\u0001\u0000\u0000\u0000\u0266\u0267\u00051\u0000\u0000"+
		"\u0267\u0268\u0005`\u0000\u0000\u0268\u0269\u0005\u0007\u0000\u0000\u0269"+
		"\u026a\u0003\u009eO\u0000\u026a]\u0001\u0000\u0000\u0000\u026b\u0274\u0003"+
		"`0\u0000\u026c\u026d\u0003`0\u0000\u026d\u026e\u0003\u0096K\u0000\u026e"+
		"\u026f\u0003^/\u0000\u026f\u0274\u0001\u0000\u0000\u0000\u0270\u0271\u0003"+
		"`0\u0000\u0271\u0272\u0003t:\u0000\u0272\u0274\u0001\u0000\u0000\u0000"+
		"\u0273\u026b\u0001\u0000\u0000\u0000\u0273\u026c\u0001\u0000\u0000\u0000"+
		"\u0273\u0270\u0001\u0000\u0000\u0000\u0274_\u0001\u0000\u0000\u0000\u0275"+
		"\u0281\u0003b1\u0000\u0276\u0281\u0003d2\u0000\u0277\u0281\u0003f3\u0000"+
		"\u0278\u0281\u0003h4\u0000\u0279\u0281\u0003j5\u0000\u027a\u0281\u0003"+
		"x<\u0000\u027b\u0281\u0003l6\u0000\u027c\u0281\u0005:\u0000\u0000\u027d"+
		"\u0281\u0003n7\u0000\u027e\u0281\u00038\u001c\u0000\u027f\u0281\u0003"+
		"\u0082A\u0000\u0280\u0275\u0001\u0000\u0000\u0000\u0280\u0276\u0001\u0000"+
		"\u0000\u0000\u0280\u0277\u0001\u0000\u0000\u0000\u0280\u0278\u0001\u0000"+
		"\u0000\u0000\u0280\u0279\u0001\u0000\u0000\u0000\u0280\u027a\u0001\u0000"+
		"\u0000\u0000\u0280\u027b\u0001\u0000\u0000\u0000\u0280\u027c\u0001\u0000"+
		"\u0000\u0000\u0280\u027d\u0001\u0000\u0000\u0000\u0280\u027e\u0001\u0000"+
		"\u0000\u0000\u0280\u027f\u0001\u0000\u0000\u0000\u0281a\u0001\u0000\u0000"+
		"\u0000\u0282\u0283\u0005O\u0000\u0000\u0283\u0284\u0003^/\u0000\u0284"+
		"\u0285\u0005P\u0000\u0000\u0285c\u0001\u0000\u0000\u0000\u0286\u0287\u0005"+
		"\"\u0000\u0000\u0287\u0288\u0003\u001a\r\u0000\u0288\u0289\u0005J\u0000"+
		"\u0000\u0289\u028a\u0003^/\u0000\u028ae\u0001\u0000\u0000\u0000\u028b"+
		"\u028c\u0005\u001b\u0000\u0000\u028c\u028d\u0003^/\u0000\u028d\u028e\u0005"+
		"9\u0000\u0000\u028e\u028f\u0003^/\u0000\u028f\u0290\u0005\u0014\u0000"+
		"\u0000\u0290\u0291\u0003^/\u0000\u0291g\u0001\u0000\u0000\u0000\u0292"+
		"\u0293\u0005\'\u0000\u0000\u0293\u0294\u0003\u009eO\u0000\u0294\u0296"+
		"\u0005O\u0000\u0000\u0295\u0297\u0003:\u001d\u0000\u0296\u0295\u0001\u0000"+
		"\u0000\u0000\u0296\u0297\u0001\u0000\u0000\u0000\u0297\u0298\u0001\u0000"+
		"\u0000\u0000\u0298\u0299\u0005P\u0000\u0000\u0299i\u0001\u0000\u0000\u0000"+
		"\u029a\u029b\u0007\u0002\u0000\u0000\u029b\u029c\u0003`0\u0000\u029ck"+
		"\u0001\u0000\u0000\u0000\u029d\u029e\u0007\u0003\u0000\u0000\u029e\u02a0"+
		"\u0005R\u0000\u0000\u029f\u029d\u0001\u0000\u0000\u0000\u029f\u02a0\u0001"+
		"\u0000\u0000\u0000\u02a0\u02a1\u0001\u0000\u0000\u0000\u02a1\u02a3\u0005"+
		"`\u0000\u0000\u02a2\u02a4\u0003p8\u0000\u02a3\u02a2\u0001\u0000\u0000"+
		"\u0000\u02a3\u02a4\u0001\u0000\u0000\u0000\u02a4m\u0001\u0000\u0000\u0000"+
		"\u02a5\u02a6\u0005\u0011\u0000\u0000\u02a6\u02a7\u0003\u009eO\u0000\u02a7"+
		"o\u0001\u0000\u0000\u0000\u02a8\u02af\u0005M\u0000\u0000\u02a9\u02b0\u0003"+
		"^/\u0000\u02aa\u02ab\u0003^/\u0000\u02ab\u02ac\u0005S\u0000\u0000\u02ac"+
		"\u02ad\u0003^/\u0000\u02ad\u02b0\u0001\u0000\u0000\u0000\u02ae\u02b0\u0003"+
		"r9\u0000\u02af\u02a9\u0001\u0000\u0000\u0000\u02af\u02aa\u0001\u0000\u0000"+
		"\u0000\u02af\u02ae\u0001\u0000\u0000\u0000\u02b0\u02b1\u0001\u0000\u0000"+
		"\u0000\u02b1\u02b2\u0005N\u0000\u0000\u02b2q\u0001\u0000\u0000\u0000\u02b3"+
		"\u02b4\u0003^/\u0000\u02b4\u02b5\u0005Q\u0000\u0000\u02b5\u02b6\u0003"+
		"^/\u0000\u02b6\u02bd\u0001\u0000\u0000\u0000\u02b7\u02b8\u0003^/\u0000"+
		"\u02b8\u02b9\u0005Q\u0000\u0000\u02b9\u02bd\u0001\u0000\u0000\u0000\u02ba"+
		"\u02bb\u0005Q\u0000\u0000\u02bb\u02bd\u0003^/\u0000\u02bc\u02b3\u0001"+
		"\u0000\u0000\u0000\u02bc\u02b7\u0001\u0000\u0000\u0000\u02bc\u02ba\u0001"+
		"\u0000\u0000\u0000\u02bds\u0001\u0000\u0000\u0000\u02be\u02bf\u0005A\u0000"+
		"\u0000\u02bf\u02c0\u0005M\u0000\u0000\u02c0\u02c5\u0003v;\u0000\u02c1"+
		"\u02c2\u0005S\u0000\u0000\u02c2\u02c4\u0003v;\u0000\u02c3\u02c1\u0001"+
		"\u0000\u0000\u0000\u02c4\u02c7\u0001\u0000\u0000\u0000\u02c5\u02c3\u0001"+
		"\u0000\u0000\u0000\u02c5\u02c6\u0001\u0000\u0000\u0000\u02c6\u02c8\u0001"+
		"\u0000\u0000\u0000\u02c7\u02c5\u0001\u0000\u0000\u0000\u02c8\u02c9\u0005"+
		"L\u0000\u0000\u02c9u\u0001\u0000\u0000\u0000\u02ca\u02cb\u00036\u001b"+
		"\u0000\u02cb\u02cc\u00054\u0000\u0000\u02cc\u02cd\u0005<\u0000\u0000\u02cd"+
		"\u02ce\u0003^/\u0000\u02cew\u0001\u0000\u0000\u0000\u02cf\u02d2\u0003"+
		"z=\u0000\u02d0\u02d2\u0003~?\u0000\u02d1\u02cf\u0001\u0000\u0000\u0000"+
		"\u02d1\u02d0\u0001\u0000\u0000\u0000\u02d2y\u0001\u0000\u0000\u0000\u02d3"+
		"\u02d9\u0005C\u0000\u0000\u02d4\u02d9\u0005a\u0000\u0000\u02d5\u02d9\u0005"+
		"b\u0000\u0000\u02d6\u02d9\u0005c\u0000\u0000\u02d7\u02d9\u0003|>\u0000"+
		"\u02d8\u02d3\u0001\u0000\u0000\u0000\u02d8\u02d4\u0001\u0000\u0000\u0000"+
		"\u02d8\u02d5\u0001\u0000\u0000\u0000\u02d8\u02d6\u0001\u0000\u0000\u0000"+
		"\u02d8\u02d7\u0001\u0000\u0000\u0000\u02d9{\u0001\u0000\u0000\u0000\u02da"+
		"\u02db\u0005_\u0000\u0000\u02db\u02dc\u0005R\u0000\u0000\u02dc\u02dd\u0005"+
		"`\u0000\u0000\u02dd}\u0001\u0000\u0000\u0000\u02de\u02e3\u0005d\u0000"+
		"\u0000\u02df\u02e3\u0003\u0080@\u0000\u02e0\u02e3\u0003\u008cF\u0000\u02e1"+
		"\u02e3\u0003\u008eG\u0000\u02e2\u02de\u0001\u0000\u0000\u0000\u02e2\u02df"+
		"\u0001\u0000\u0000\u0000\u02e2\u02e0\u0001\u0000\u0000\u0000\u02e2\u02e1"+
		"\u0001\u0000\u0000\u0000\u02e3\u007f\u0001\u0000\u0000\u0000\u02e4\u02e5"+
		"\u0005O\u0000\u0000\u02e5\u02e6\u0003x<\u0000\u02e6\u02e7\u0005S\u0000"+
		"\u0000\u02e7\u02ec\u0003x<\u0000\u02e8\u02e9\u0005S\u0000\u0000\u02e9"+
		"\u02eb\u0003x<\u0000\u02ea\u02e8\u0001\u0000\u0000\u0000\u02eb\u02ee\u0001"+
		"\u0000\u0000\u0000\u02ec\u02ea\u0001\u0000\u0000\u0000\u02ec\u02ed\u0001"+
		"\u0000\u0000\u0000\u02ed\u02ef\u0001\u0000\u0000\u0000\u02ee\u02ec\u0001"+
		"\u0000\u0000\u0000\u02ef\u02f0\u0005P\u0000\u0000\u02f0\u0081\u0001\u0000"+
		"\u0000\u0000\u02f1\u02f5\u0003\u0084B\u0000\u02f2\u02f5\u0003\u0086C\u0000"+
		"\u02f3\u02f5\u0003\u0088D\u0000\u02f4\u02f1\u0001\u0000\u0000\u0000\u02f4"+
		"\u02f2\u0001\u0000\u0000\u0000\u02f4\u02f3\u0001\u0000\u0000\u0000\u02f5"+
		"\u0083\u0001\u0000\u0000\u0000\u02f6\u02f7\u0005M\u0000\u0000\u02f7\u02fc"+
		"\u0003^/\u0000\u02f8\u02f9\u0005S\u0000\u0000\u02f9\u02fb\u0003^/\u0000"+
		"\u02fa\u02f8\u0001\u0000\u0000\u0000\u02fb\u02fe\u0001\u0000\u0000\u0000"+
		"\u02fc\u02fa\u0001\u0000\u0000\u0000\u02fc\u02fd\u0001\u0000\u0000\u0000"+
		"\u02fd\u02ff\u0001\u0000\u0000\u0000\u02fe\u02fc\u0001\u0000\u0000\u0000"+
		"\u02ff\u0300\u0005N\u0000\u0000\u0300\u0085\u0001\u0000\u0000\u0000\u0301"+
		"\u0302\u0005O\u0000\u0000\u0302\u0303\u0003^/\u0000\u0303\u0304\u0005"+
		"S\u0000\u0000\u0304\u0309\u0003^/\u0000\u0305\u0306\u0005S\u0000\u0000"+
		"\u0306\u0308\u0003^/\u0000\u0307\u0305\u0001\u0000\u0000\u0000\u0308\u030b"+
		"\u0001\u0000\u0000\u0000\u0309\u0307\u0001\u0000\u0000\u0000\u0309\u030a"+
		"\u0001\u0000\u0000\u0000\u030a\u030c\u0001\u0000\u0000\u0000\u030b\u0309"+
		"\u0001\u0000\u0000\u0000\u030c\u030d\u0005P\u0000\u0000\u030d\u0087\u0001"+
		"\u0000\u0000\u0000\u030e\u030f\u0005M\u0000\u0000\u030f\u0314\u0003\u008a"+
		"E\u0000\u0310\u0311\u0005S\u0000\u0000\u0311\u0313\u0003\u008aE\u0000"+
		"\u0312\u0310\u0001\u0000\u0000\u0000\u0313\u0316\u0001\u0000\u0000\u0000"+
		"\u0314\u0312\u0001\u0000\u0000\u0000\u0314\u0315\u0001\u0000\u0000\u0000"+
		"\u0315\u0317\u0001\u0000\u0000\u0000\u0316\u0314\u0001\u0000\u0000\u0000"+
		"\u0317\u0318\u0005N\u0000\u0000\u0318\u0089\u0001\u0000\u0000\u0000\u0319"+
		"\u031a\u0003^/\u0000\u031a\u031b\u0005T\u0000\u0000\u031b\u031c\u0003"+
		"^/\u0000\u031c\u008b\u0001\u0000\u0000\u0000\u031d\u031e\u0005M\u0000"+
		"\u0000\u031e\u0323\u0003x<\u0000\u031f\u0320\u0005S\u0000\u0000\u0320"+
		"\u0322\u0003x<\u0000\u0321\u031f\u0001\u0000\u0000\u0000\u0322\u0325\u0001"+
		"\u0000\u0000\u0000\u0323\u0321\u0001\u0000\u0000\u0000\u0323\u0324\u0001"+
		"\u0000\u0000\u0000\u0324\u0326\u0001\u0000\u0000\u0000\u0325\u0323\u0001"+
		"\u0000\u0000\u0000\u0326\u0327\u0005N\u0000\u0000\u0327\u008d\u0001\u0000"+
		"\u0000\u0000\u0328\u0329\u0005M\u0000\u0000\u0329\u032e\u0003\u0090H\u0000"+
		"\u032a\u032b\u0005S\u0000\u0000\u032b\u032d\u0003\u0090H\u0000\u032c\u032a"+
		"\u0001\u0000\u0000\u0000\u032d\u0330\u0001\u0000\u0000\u0000\u032e\u032c"+
		"\u0001\u0000\u0000\u0000\u032e\u032f\u0001\u0000\u0000\u0000\u032f\u0331"+
		"\u0001\u0000\u0000\u0000\u0330\u032e\u0001\u0000\u0000\u0000\u0331\u0332"+
		"\u0005N\u0000\u0000\u0332\u008f\u0001\u0000\u0000\u0000\u0333\u0334\u0003"+
		"x<\u0000\u0334\u0335\u0005T\u0000\u0000\u0335\u0336\u0003x<\u0000\u0336"+
		"\u0091\u0001\u0000\u0000\u0000\u0337\u0338\u0005O\u0000\u0000\u0338\u033b"+
		"\u0005`\u0000\u0000\u0339\u033a\u0005S\u0000\u0000\u033a\u033c\u0005`"+
		"\u0000\u0000\u033b\u0339\u0001\u0000\u0000\u0000\u033c\u033d\u0001\u0000"+
		"\u0000\u0000\u033d\u033b\u0001\u0000\u0000\u0000\u033d\u033e\u0001\u0000"+
		"\u0000\u0000\u033e\u033f\u0001\u0000\u0000\u0000\u033f\u0340\u0005P\u0000"+
		"\u0000\u0340\u0093\u0001\u0000\u0000\u0000\u0341\u0342\u0005M\u0000\u0000"+
		"\u0342\u0343\u0005`\u0000\u0000\u0343\u0344\u0005T\u0000\u0000\u0344\u0345"+
		"\u0005`\u0000\u0000\u0345\u0346\u0005N\u0000\u0000\u0346\u0095\u0001\u0000"+
		"\u0000\u0000\u0347\u034b\u0003\u0098L\u0000\u0348\u034b\u0003\u009aM\u0000"+
		"\u0349\u034b\u0003\u009cN\u0000\u034a\u0347\u0001\u0000\u0000\u0000\u034a"+
		"\u0348\u0001\u0000\u0000\u0000\u034a\u0349\u0001\u0000\u0000\u0000\u034b"+
		"\u0097\u0001\u0000\u0000\u0000\u034c\u034d\u0007\u0004\u0000\u0000\u034d"+
		"\u0099\u0001\u0000\u0000\u0000\u034e\u034f\u0007\u0005\u0000\u0000\u034f"+
		"\u009b\u0001\u0000\u0000\u0000\u0350\u0351\u0007\u0006\u0000\u0000\u0351"+
		"\u009d\u0001\u0000\u0000\u0000\u0352\u035a\u0005D\u0000\u0000\u0353\u035a"+
		"\u0003\u00a0P\u0000\u0354\u035a\u0005_\u0000\u0000\u0355\u0356\u0005_"+
		"\u0000\u0000\u0356\u035a\u0003\u00a2Q\u0000\u0357\u035a\u0003\u00a4R\u0000"+
		"\u0358\u035a\u0003\u00a8T\u0000\u0359\u0352\u0001\u0000\u0000\u0000\u0359"+
		"\u0353\u0001\u0000\u0000\u0000\u0359\u0354\u0001\u0000\u0000\u0000\u0359"+
		"\u0355\u0001\u0000\u0000\u0000\u0359\u0357\u0001\u0000\u0000\u0000\u0359"+
		"\u0358\u0001\u0000\u0000\u0000\u035a\u009f\u0001\u0000\u0000\u0000\u035b"+
		"\u035c\u0007\u0007\u0000\u0000\u035c\u035d\u0003\u00a2Q\u0000\u035d\u00a1"+
		"\u0001\u0000\u0000\u0000\u035e\u035f\u0005Z\u0000\u0000\u035f\u0360\u0005"+
		")\u0000\u0000\u0360\u0365\u0003\u009eO\u0000\u0361\u0362\u0005S\u0000"+
		"\u0000\u0362\u0364\u0003\u009eO\u0000\u0363\u0361\u0001\u0000\u0000\u0000"+
		"\u0364\u0367\u0001\u0000\u0000\u0000\u0365\u0363\u0001\u0000\u0000\u0000"+
		"\u0365\u0366\u0001\u0000\u0000\u0000\u0366\u0368\u0001\u0000\u0000\u0000"+
		"\u0367\u0365\u0001\u0000\u0000\u0000\u0368\u0369\u0005[\u0000\u0000\u0369"+
		"\u00a3\u0001\u0000\u0000\u0000\u036a\u036b\u0005O\u0000\u0000\u036b\u036e"+
		"\u0003\u009eO\u0000\u036c\u036d\u0005S\u0000\u0000\u036d\u036f\u0003\u009e"+
		"O\u0000\u036e\u036c\u0001\u0000\u0000\u0000\u036f\u0370\u0001\u0000\u0000"+
		"\u0000\u0370\u036e\u0001\u0000\u0000\u0000\u0370\u0371\u0001\u0000\u0000"+
		"\u0000\u0371\u0372\u0001\u0000\u0000\u0000\u0372\u0373\u0005P\u0000\u0000"+
		"\u0373\u00a5\u0001\u0000\u0000\u0000\u0374\u0379\u0003\u009eO\u0000\u0375"+
		"\u0376\u0005S\u0000\u0000\u0376\u0378\u0003\u009eO\u0000\u0377\u0375\u0001"+
		"\u0000\u0000\u0000\u0378\u037b\u0001\u0000\u0000\u0000\u0379\u0377\u0001"+
		"\u0000\u0000\u0000\u0379\u037a\u0001\u0000\u0000\u0000\u037a\u00a7\u0001"+
		"\u0000\u0000\u0000\u037b\u0379\u0001\u0000\u0000\u0000\u037c\u037d\u0005"+
		"\u0001\u0000\u0000\u037d\u037e\u0005Z\u0000\u0000\u037e\u037f\u0005)\u0000"+
		"\u0000\u037f\u0380\u0003\u00a6S\u0000\u0380\u0381\u0005J\u0000\u0000\u0381"+
		"\u0382\u0003\u009eO\u0000\u0382\u0383\u0005[\u0000\u0000\u0383\u00a9\u0001"+
		"\u0000\u0000\u0000@\u00ae\u00b4\u00c3\u00ce\u00f5\u0100\u0112\u011b\u0125"+
		"\u012d\u012f\u013a\u0143\u0159\u0162\u0175\u0179\u017d\u0184\u0189\u0192"+
		"\u019c\u01a6\u01b3\u01e3\u01f7\u01fe\u0200\u020c\u0219\u021b\u0227\u022d"+
		"\u022f\u023c\u0245\u0247\u0254\u025b\u0264\u0273\u0280\u0296\u029f\u02a3"+
		"\u02af\u02bc\u02c5\u02d1\u02d8\u02e2\u02ec\u02f4\u02fc\u0309\u0314\u0323"+
		"\u032e\u033d\u034a\u0359\u0365\u0370\u0379";
	public static final ATN _ATN =
		new ATNDeserializer().deserialize(_serializedATN.toCharArray());
	static {
		_decisionToDFA = new DFA[_ATN.getNumberOfDecisions()];
		for (int i = 0; i < _ATN.getNumberOfDecisions(); i++) {
			_decisionToDFA[i] = new DFA(_ATN.getDecisionState(i), i);
		}
	}
}