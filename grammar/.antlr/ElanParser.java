// Generated from c://Elan//Repository//Parser//Elan.g4 by ANTLR 4.13.1
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
		ASSERT=7, CALL=8, CASE=9, CATCH=10, CLASS=11, CONSTANT=12, CONSTRUCTOR=13, 
		CURRY=14, DEFAULT=15, DIV=16, EACH=17, ELSE=18, END=19, ENUM=20, FOR=21, 
		FROM=22, FUNCTION=23, GLOBAL=24, IF=25, IMMUTABLE=26, IMPORT=27, IN=28, 
		INHERITS=29, INPUT=30, LAMBDA=31, LET=32, LIBRARY=33, MAIN=34, MOD=35, 
		NEW=36, NOT=37, OF=38, IS=39, OR=40, OUT=41, PACKAGE=42, PARTIAL=43, PRINT=44, 
		PRIVATE=45, PROCEDURE=46, PROPERTY=47, REPEAT=48, RETURN=49, SET=50, STEP=51, 
		SWITCH=52, SYSTEM=53, TEST=54, THEN=55, THIS=56, THROW=57, TO=58, TRY=59, 
		VAR=60, WHEN=61, WHILE=62, WITH=63, XOR=64, BOOL_VALUE=65, VALUE_TYPE=66, 
		ARRAY=67, LIST=68, DICTIONARY=69, ITERABLE=70, EQUALS=71, ARROW=72, OPEN_BRACE=73, 
		CLOSE_BRACE=74, OPEN_SQ_BRACKET=75, CLOSE_SQ_BRACKET=76, OPEN_BRACKET=77, 
		CLOSE_BRACKET=78, DOUBLE_DOT=79, DOT=80, COMMA=81, COLON=82, PLUS=83, 
		MINUS=84, MULT=85, DIVIDE=86, POWER=87, LT=88, GT=89, LE=90, GE=91, IS_NOT=92, 
		TYPENAME=93, IDENTIFIER=94, LITERAL_INTEGER=95, LITERAL_FLOAT=96, LITERAL_CHAR=97, 
		LITERAL_STRING=98, WHITESPACES=99, NEWLINE=100, WS=101;
	public static final int
		RULE_file = 0, RULE_importStatement = 1, RULE_namespace = 2, RULE_main = 3, 
		RULE_test = 4, RULE_statementBlock = 5, RULE_testStatement = 6, RULE_assert = 7, 
		RULE_callStatement = 8, RULE_throwException = 9, RULE_printStatement = 10, 
		RULE_varDef = 11, RULE_assignment = 12, RULE_inlineAsignment = 13, RULE_assignableValue = 14, 
		RULE_procedureCall = 15, RULE_functionCall = 16, RULE_systemCall = 17, 
		RULE_input = 18, RULE_argument = 19, RULE_argumentList = 20, RULE_procedureDef = 21, 
		RULE_procedureSignature = 22, RULE_procedureParameterList = 23, RULE_parameterList = 24, 
		RULE_parameter = 25, RULE_procedureParameter = 26, RULE_functionDef = 27, 
		RULE_functionWithBody = 28, RULE_expressionFunction = 29, RULE_functionSignature = 30, 
		RULE_constantDef = 31, RULE_enumDef = 32, RULE_enumType = 33, RULE_enumValue = 34, 
		RULE_classDef = 35, RULE_mutableClass = 36, RULE_abstractClass = 37, RULE_immutableClass = 38, 
		RULE_abstractImmutableClass = 39, RULE_inherits = 40, RULE_property = 41, 
		RULE_constructor = 42, RULE_newInstance = 43, RULE_withClause = 44, RULE_proceduralControlFlow = 45, 
		RULE_if = 46, RULE_for = 47, RULE_each = 48, RULE_while = 49, RULE_repeat = 50, 
		RULE_try = 51, RULE_switch = 52, RULE_case = 53, RULE_caseDefault = 54, 
		RULE_expression = 55, RULE_bracketedExpression = 56, RULE_ifExpression = 57, 
		RULE_elseExpression = 58, RULE_lambda = 59, RULE_index = 60, RULE_range = 61, 
		RULE_value = 62, RULE_scopeQualifier = 63, RULE_literal = 64, RULE_literalValue = 65, 
		RULE_dataStructureDefinition = 66, RULE_literalDataStructure = 67, RULE_tupleDefinition = 68, 
		RULE_literalTuple = 69, RULE_deconstructedTuple = 70, RULE_listDefinition = 71, 
		RULE_literalList = 72, RULE_listDecomp = 73, RULE_arrayDefinition = 74, 
		RULE_dictionaryDefinition = 75, RULE_literalDictionary = 76, RULE_kvp = 77, 
		RULE_literalKvp = 78, RULE_unaryOp = 79, RULE_binaryOp = 80, RULE_arithmeticOp = 81, 
		RULE_logicalOp = 82, RULE_conditionalOp = 83, RULE_type = 84, RULE_dataStructureType = 85, 
		RULE_genericSpecifier = 86, RULE_tupleType = 87, RULE_typeList = 88, RULE_funcType = 89;
	private static String[] makeRuleNames() {
		return new String[] {
			"file", "importStatement", "namespace", "main", "test", "statementBlock", 
			"testStatement", "assert", "callStatement", "throwException", "printStatement", 
			"varDef", "assignment", "inlineAsignment", "assignableValue", "procedureCall", 
			"functionCall", "systemCall", "input", "argument", "argumentList", "procedureDef", 
			"procedureSignature", "procedureParameterList", "parameterList", "parameter", 
			"procedureParameter", "functionDef", "functionWithBody", "expressionFunction", 
			"functionSignature", "constantDef", "enumDef", "enumType", "enumValue", 
			"classDef", "mutableClass", "abstractClass", "immutableClass", "abstractImmutableClass", 
			"inherits", "property", "constructor", "newInstance", "withClause", "proceduralControlFlow", 
			"if", "for", "each", "while", "repeat", "try", "switch", "case", "caseDefault", 
			"expression", "bracketedExpression", "ifExpression", "elseExpression", 
			"lambda", "index", "range", "value", "scopeQualifier", "literal", "literalValue", 
			"dataStructureDefinition", "literalDataStructure", "tupleDefinition", 
			"literalTuple", "deconstructedTuple", "listDefinition", "literalList", 
			"listDecomp", "arrayDefinition", "dictionaryDefinition", "literalDictionary", 
			"kvp", "literalKvp", "unaryOp", "binaryOp", "arithmeticOp", "logicalOp", 
			"conditionalOp", "type", "dataStructureType", "genericSpecifier", "tupleType", 
			"typeList", "funcType"
		};
	}
	public static final String[] ruleNames = makeRuleNames();

	private static String[] makeLiteralNames() {
		return new String[] {
			null, null, null, "'#'", "'abstract'", "'and'", "'as'", "'assert'", "'call'", 
			"'case'", "'catch'", "'class'", "'constant'", "'constructor'", "'curry'", 
			"'default'", "'div'", "'each'", "'else'", "'end'", "'enum'", "'for'", 
			"'from'", "'function'", "'global'", "'if'", "'immutable'", "'import'", 
			"'in'", "'inherits'", "'input'", "'lambda'", "'let'", "'library'", "'main'", 
			"'mod'", "'new'", "'not'", "'of'", "'is'", "'or'", "'out'", "'package'", 
			"'partial'", "'print'", "'private'", "'procedure'", "'property'", "'repeat'", 
			"'return'", "'set'", "'step'", "'switch'", "'system'", "'test'", "'then'", 
			"'this'", "'throw'", "'to'", "'try'", "'var'", "'when'", "'while'", "'with'", 
			"'xor'", null, null, "'Array'", "'List'", "'Dictionary'", "'Iter'", "'='", 
			"'->'", "'{'", "'}'", "'['", "']'", "'('", "')'", "'..'", "'.'", "','", 
			"':'", "'+'", "'-'", "'*'", "'/'", "'^'", "'<'", "'>'", "'<='", "'>='"
		};
	}
	private static final String[] _LITERAL_NAMES = makeLiteralNames();
	private static String[] makeSymbolicNames() {
		return new String[] {
			null, "NL", "SINGLE_LINE_COMMENT", "COMMENT_MARKER", "ABSTRACT", "AND", 
			"AS", "ASSERT", "CALL", "CASE", "CATCH", "CLASS", "CONSTANT", "CONSTRUCTOR", 
			"CURRY", "DEFAULT", "DIV", "EACH", "ELSE", "END", "ENUM", "FOR", "FROM", 
			"FUNCTION", "GLOBAL", "IF", "IMMUTABLE", "IMPORT", "IN", "INHERITS", 
			"INPUT", "LAMBDA", "LET", "LIBRARY", "MAIN", "MOD", "NEW", "NOT", "OF", 
			"IS", "OR", "OUT", "PACKAGE", "PARTIAL", "PRINT", "PRIVATE", "PROCEDURE", 
			"PROPERTY", "REPEAT", "RETURN", "SET", "STEP", "SWITCH", "SYSTEM", "TEST", 
			"THEN", "THIS", "THROW", "TO", "TRY", "VAR", "WHEN", "WHILE", "WITH", 
			"XOR", "BOOL_VALUE", "VALUE_TYPE", "ARRAY", "LIST", "DICTIONARY", "ITERABLE", 
			"EQUALS", "ARROW", "OPEN_BRACE", "CLOSE_BRACE", "OPEN_SQ_BRACKET", "CLOSE_SQ_BRACKET", 
			"OPEN_BRACKET", "CLOSE_BRACKET", "DOUBLE_DOT", "DOT", "COMMA", "COLON", 
			"PLUS", "MINUS", "MULT", "DIVIDE", "POWER", "LT", "GT", "LE", "GE", "IS_NOT", 
			"TYPENAME", "IDENTIFIER", "LITERAL_INTEGER", "LITERAL_FLOAT", "LITERAL_CHAR", 
			"LITERAL_STRING", "WHITESPACES", "NEWLINE", "WS"
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
		public TerminalNode EOF() { return getToken(ElanParser.EOF, 0); }
		public List<MainContext> main() {
			return getRuleContexts(MainContext.class);
		}
		public MainContext main(int i) {
			return getRuleContext(MainContext.class,i);
		}
		public List<ProcedureDefContext> procedureDef() {
			return getRuleContexts(ProcedureDefContext.class);
		}
		public ProcedureDefContext procedureDef(int i) {
			return getRuleContext(ProcedureDefContext.class,i);
		}
		public List<FunctionDefContext> functionDef() {
			return getRuleContexts(FunctionDefContext.class);
		}
		public FunctionDefContext functionDef(int i) {
			return getRuleContext(FunctionDefContext.class,i);
		}
		public List<ConstantDefContext> constantDef() {
			return getRuleContexts(ConstantDefContext.class);
		}
		public ConstantDefContext constantDef(int i) {
			return getRuleContext(ConstantDefContext.class,i);
		}
		public List<EnumDefContext> enumDef() {
			return getRuleContexts(EnumDefContext.class);
		}
		public EnumDefContext enumDef(int i) {
			return getRuleContext(EnumDefContext.class,i);
		}
		public List<ClassDefContext> classDef() {
			return getRuleContexts(ClassDefContext.class);
		}
		public ClassDefContext classDef(int i) {
			return getRuleContext(ClassDefContext.class,i);
		}
		public List<TestContext> test() {
			return getRuleContexts(TestContext.class);
		}
		public TestContext test(int i) {
			return getRuleContext(TestContext.class,i);
		}
		public List<ImportStatementContext> importStatement() {
			return getRuleContexts(ImportStatementContext.class);
		}
		public ImportStatementContext importStatement(int i) {
			return getRuleContext(ImportStatementContext.class,i);
		}
		public List<TerminalNode> NL() { return getTokens(ElanParser.NL); }
		public TerminalNode NL(int i) {
			return getToken(ElanParser.NL, i);
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
			int _alt;
			enterOuterAlt(_localctx, 1);
			{
			setState(190);
			_errHandler.sync(this);
			_alt = getInterpreter().adaptivePredict(_input,1,_ctx);
			while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER ) {
				if ( _alt==1 ) {
					{
					setState(188);
					_errHandler.sync(this);
					switch ( getInterpreter().adaptivePredict(_input,0,_ctx) ) {
					case 1:
						{
						setState(180);
						main();
						}
						break;
					case 2:
						{
						setState(181);
						procedureDef();
						}
						break;
					case 3:
						{
						setState(182);
						functionDef();
						}
						break;
					case 4:
						{
						setState(183);
						constantDef();
						}
						break;
					case 5:
						{
						setState(184);
						enumDef();
						}
						break;
					case 6:
						{
						setState(185);
						classDef();
						}
						break;
					case 7:
						{
						setState(186);
						test();
						}
						break;
					case 8:
						{
						setState(187);
						importStatement();
						}
						break;
					}
					} 
				}
				setState(192);
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,1,_ctx);
			}
			setState(196);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==NL) {
				{
				{
				setState(193);
				match(NL);
				}
				}
				setState(198);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			setState(199);
			match(EOF);
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
		enterRule(_localctx, 2, RULE_importStatement);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(201);
			match(IMPORT);
			setState(202);
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
		enterRule(_localctx, 4, RULE_namespace);
		int _la;
		try {
			int _alt;
			enterOuterAlt(_localctx, 1);
			{
			setState(204);
			_la = _input.LA(1);
			if ( !(_la==TYPENAME || _la==IDENTIFIER) ) {
			_errHandler.recoverInline(this);
			}
			else {
				if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
				_errHandler.reportMatch(this);
				consume();
			}
			setState(209);
			_errHandler.sync(this);
			_alt = getInterpreter().adaptivePredict(_input,3,_ctx);
			while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER ) {
				if ( _alt==1 ) {
					{
					{
					setState(205);
					match(DOT);
					setState(206);
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
				}
				setState(211);
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,3,_ctx);
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
		enterRule(_localctx, 6, RULE_main);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(212);
			match(NL);
			setState(213);
			match(MAIN);
			setState(214);
			statementBlock();
			setState(215);
			match(NL);
			setState(216);
			match(END);
			setState(217);
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
		public TerminalNode END() { return getToken(ElanParser.END, 0); }
		public List<TestStatementContext> testStatement() {
			return getRuleContexts(TestStatementContext.class);
		}
		public TestStatementContext testStatement(int i) {
			return getRuleContext(TestStatementContext.class,i);
		}
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
		enterRule(_localctx, 8, RULE_test);
		try {
			int _alt;
			enterOuterAlt(_localctx, 1);
			{
			setState(219);
			match(NL);
			setState(220);
			match(TEST);
			setState(221);
			match(IDENTIFIER);
			setState(225);
			_errHandler.sync(this);
			_alt = getInterpreter().adaptivePredict(_input,4,_ctx);
			while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER ) {
				if ( _alt==1 ) {
					{
					{
					setState(222);
					testStatement();
					}
					} 
				}
				setState(227);
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,4,_ctx);
			}
			setState(228);
			match(NL);
			setState(229);
			match(END);
			setState(230);
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
	public static class StatementBlockContext extends ParserRuleContext {
		public List<VarDefContext> varDef() {
			return getRuleContexts(VarDefContext.class);
		}
		public VarDefContext varDef(int i) {
			return getRuleContext(VarDefContext.class,i);
		}
		public List<AssignmentContext> assignment() {
			return getRuleContexts(AssignmentContext.class);
		}
		public AssignmentContext assignment(int i) {
			return getRuleContext(AssignmentContext.class,i);
		}
		public List<ProceduralControlFlowContext> proceduralControlFlow() {
			return getRuleContexts(ProceduralControlFlowContext.class);
		}
		public ProceduralControlFlowContext proceduralControlFlow(int i) {
			return getRuleContext(ProceduralControlFlowContext.class,i);
		}
		public List<CallStatementContext> callStatement() {
			return getRuleContexts(CallStatementContext.class);
		}
		public CallStatementContext callStatement(int i) {
			return getRuleContext(CallStatementContext.class,i);
		}
		public List<ThrowExceptionContext> throwException() {
			return getRuleContexts(ThrowExceptionContext.class);
		}
		public ThrowExceptionContext throwException(int i) {
			return getRuleContext(ThrowExceptionContext.class,i);
		}
		public List<PrintStatementContext> printStatement() {
			return getRuleContexts(PrintStatementContext.class);
		}
		public PrintStatementContext printStatement(int i) {
			return getRuleContext(PrintStatementContext.class,i);
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
		enterRule(_localctx, 10, RULE_statementBlock);
		try {
			int _alt;
			enterOuterAlt(_localctx, 1);
			{
			setState(240);
			_errHandler.sync(this);
			_alt = getInterpreter().adaptivePredict(_input,6,_ctx);
			while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER ) {
				if ( _alt==1 ) {
					{
					setState(238);
					_errHandler.sync(this);
					switch ( getInterpreter().adaptivePredict(_input,5,_ctx) ) {
					case 1:
						{
						setState(232);
						varDef();
						}
						break;
					case 2:
						{
						setState(233);
						assignment();
						}
						break;
					case 3:
						{
						setState(234);
						proceduralControlFlow();
						}
						break;
					case 4:
						{
						setState(235);
						callStatement();
						}
						break;
					case 5:
						{
						setState(236);
						throwException();
						}
						break;
					case 6:
						{
						setState(237);
						printStatement();
						}
						break;
					}
					} 
				}
				setState(242);
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,6,_ctx);
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
	public static class TestStatementContext extends ParserRuleContext {
		public AssertContext assert_() {
			return getRuleContext(AssertContext.class,0);
		}
		public VarDefContext varDef() {
			return getRuleContext(VarDefContext.class,0);
		}
		public CallStatementContext callStatement() {
			return getRuleContext(CallStatementContext.class,0);
		}
		public TestStatementContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_testStatement; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).enterTestStatement(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).exitTestStatement(this);
		}
	}

	public final TestStatementContext testStatement() throws RecognitionException {
		TestStatementContext _localctx = new TestStatementContext(_ctx, getState());
		enterRule(_localctx, 12, RULE_testStatement);
		try {
			setState(246);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,7,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(243);
				assert_();
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(244);
				varDef();
				}
				break;
			case 3:
				enterOuterAlt(_localctx, 3);
				{
				setState(245);
				callStatement();
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
	public static class AssertContext extends ParserRuleContext {
		public TerminalNode ASSERT() { return getToken(ElanParser.ASSERT, 0); }
		public ExpressionContext expression() {
			return getRuleContext(ExpressionContext.class,0);
		}
		public TerminalNode IS() { return getToken(ElanParser.IS, 0); }
		public ValueContext value() {
			return getRuleContext(ValueContext.class,0);
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
		enterRule(_localctx, 14, RULE_assert);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(248);
			match(ASSERT);
			setState(249);
			expression(0);
			setState(250);
			match(IS);
			setState(251);
			value();
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
	public static class CallStatementContext extends ParserRuleContext {
		public TerminalNode NL() { return getToken(ElanParser.NL, 0); }
		public TerminalNode CALL() { return getToken(ElanParser.CALL, 0); }
		public ProcedureCallContext procedureCall() {
			return getRuleContext(ProcedureCallContext.class,0);
		}
		public AssignableValueContext assignableValue() {
			return getRuleContext(AssignableValueContext.class,0);
		}
		public TerminalNode DOT() { return getToken(ElanParser.DOT, 0); }
		public CallStatementContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_callStatement; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).enterCallStatement(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).exitCallStatement(this);
		}
	}

	public final CallStatementContext callStatement() throws RecognitionException {
		CallStatementContext _localctx = new CallStatementContext(_ctx, getState());
		enterRule(_localctx, 16, RULE_callStatement);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(253);
			match(NL);
			setState(254);
			match(CALL);
			setState(260);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,8,_ctx) ) {
			case 1:
				{
				setState(255);
				procedureCall();
				}
				break;
			case 2:
				{
				{
				setState(256);
				assignableValue();
				setState(257);
				match(DOT);
				setState(258);
				procedureCall();
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
	public static class ThrowExceptionContext extends ParserRuleContext {
		public TerminalNode NL() { return getToken(ElanParser.NL, 0); }
		public TerminalNode THROW() { return getToken(ElanParser.THROW, 0); }
		public TerminalNode LITERAL_STRING() { return getToken(ElanParser.LITERAL_STRING, 0); }
		public TerminalNode IDENTIFIER() { return getToken(ElanParser.IDENTIFIER, 0); }
		public ThrowExceptionContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_throwException; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).enterThrowException(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).exitThrowException(this);
		}
	}

	public final ThrowExceptionContext throwException() throws RecognitionException {
		ThrowExceptionContext _localctx = new ThrowExceptionContext(_ctx, getState());
		enterRule(_localctx, 18, RULE_throwException);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(262);
			match(NL);
			setState(263);
			match(THROW);
			setState(264);
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
	public static class PrintStatementContext extends ParserRuleContext {
		public TerminalNode NL() { return getToken(ElanParser.NL, 0); }
		public TerminalNode PRINT() { return getToken(ElanParser.PRINT, 0); }
		public ExpressionContext expression() {
			return getRuleContext(ExpressionContext.class,0);
		}
		public PrintStatementContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_printStatement; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).enterPrintStatement(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).exitPrintStatement(this);
		}
	}

	public final PrintStatementContext printStatement() throws RecognitionException {
		PrintStatementContext _localctx = new PrintStatementContext(_ctx, getState());
		enterRule(_localctx, 20, RULE_printStatement);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(266);
			match(NL);
			setState(267);
			match(PRINT);
			setState(269);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,9,_ctx) ) {
			case 1:
				{
				setState(268);
				expression(0);
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
	public static class VarDefContext extends ParserRuleContext {
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
		public VarDefContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_varDef; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).enterVarDef(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).exitVarDef(this);
		}
	}

	public final VarDefContext varDef() throws RecognitionException {
		VarDefContext _localctx = new VarDefContext(_ctx, getState());
		enterRule(_localctx, 22, RULE_varDef);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(271);
			match(NL);
			setState(272);
			match(VAR);
			setState(273);
			assignableValue();
			setState(274);
			match(SET);
			setState(275);
			match(TO);
			setState(276);
			expression(0);
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
	public static class AssignmentContext extends ParserRuleContext {
		public TerminalNode NL() { return getToken(ElanParser.NL, 0); }
		public TerminalNode SET() { return getToken(ElanParser.SET, 0); }
		public AssignableValueContext assignableValue() {
			return getRuleContext(AssignableValueContext.class,0);
		}
		public TerminalNode TO() { return getToken(ElanParser.TO, 0); }
		public ExpressionContext expression() {
			return getRuleContext(ExpressionContext.class,0);
		}
		public AssignmentContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_assignment; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).enterAssignment(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).exitAssignment(this);
		}
	}

	public final AssignmentContext assignment() throws RecognitionException {
		AssignmentContext _localctx = new AssignmentContext(_ctx, getState());
		enterRule(_localctx, 24, RULE_assignment);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(278);
			match(NL);
			setState(279);
			match(SET);
			setState(280);
			assignableValue();
			setState(281);
			match(TO);
			setState(282);
			expression(0);
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
		enterRule(_localctx, 26, RULE_inlineAsignment);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(284);
			assignableValue();
			setState(285);
			match(SET);
			setState(286);
			match(TO);
			setState(287);
			expression(0);
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
		public ScopeQualifierContext scopeQualifier() {
			return getRuleContext(ScopeQualifierContext.class,0);
		}
		public IndexContext index() {
			return getRuleContext(IndexContext.class,0);
		}
		public DeconstructedTupleContext deconstructedTuple() {
			return getRuleContext(DeconstructedTupleContext.class,0);
		}
		public ListDecompContext listDecomp() {
			return getRuleContext(ListDecompContext.class,0);
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
		enterRule(_localctx, 28, RULE_assignableValue);
		int _la;
		try {
			setState(298);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case GLOBAL:
			case LIBRARY:
			case PACKAGE:
			case PROPERTY:
			case IDENTIFIER:
				enterOuterAlt(_localctx, 1);
				{
				{
				setState(290);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if ((((_la) & ~0x3f) == 0 && ((1L << _la) & 145144141578240L) != 0)) {
					{
					setState(289);
					scopeQualifier();
					}
				}

				setState(292);
				match(IDENTIFIER);
				setState(294);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==OPEN_SQ_BRACKET) {
					{
					setState(293);
					index();
					}
				}

				}
				}
				break;
			case OPEN_BRACKET:
				enterOuterAlt(_localctx, 2);
				{
				setState(296);
				deconstructedTuple();
				}
				break;
			case OPEN_BRACE:
				enterOuterAlt(_localctx, 3);
				{
				setState(297);
				listDecomp();
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
	public static class ProcedureCallContext extends ParserRuleContext {
		public TerminalNode IDENTIFIER() { return getToken(ElanParser.IDENTIFIER, 0); }
		public TerminalNode OPEN_BRACKET() { return getToken(ElanParser.OPEN_BRACKET, 0); }
		public TerminalNode CLOSE_BRACKET() { return getToken(ElanParser.CLOSE_BRACKET, 0); }
		public ScopeQualifierContext scopeQualifier() {
			return getRuleContext(ScopeQualifierContext.class,0);
		}
		public ArgumentListContext argumentList() {
			return getRuleContext(ArgumentListContext.class,0);
		}
		public ProcedureCallContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_procedureCall; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).enterProcedureCall(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).exitProcedureCall(this);
		}
	}

	public final ProcedureCallContext procedureCall() throws RecognitionException {
		ProcedureCallContext _localctx = new ProcedureCallContext(_ctx, getState());
		enterRule(_localctx, 30, RULE_procedureCall);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(301);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if ((((_la) & ~0x3f) == 0 && ((1L << _la) & 145144141578240L) != 0)) {
				{
				setState(300);
				scopeQualifier();
				}
			}

			setState(303);
			match(IDENTIFIER);
			setState(304);
			match(OPEN_BRACKET);
			setState(306);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if ((((_la) & ~0x3f) == 0 && ((1L << _la) & 81210146813935618L) != 0) || ((((_la - 65)) & ~0x3f) == 0 && ((1L << (_la - 65)) & 16911962373L) != 0)) {
				{
				setState(305);
				argumentList();
				}
			}

			setState(308);
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
	public static class FunctionCallContext extends ParserRuleContext {
		public TerminalNode IDENTIFIER() { return getToken(ElanParser.IDENTIFIER, 0); }
		public TerminalNode OPEN_BRACKET() { return getToken(ElanParser.OPEN_BRACKET, 0); }
		public TerminalNode CLOSE_BRACKET() { return getToken(ElanParser.CLOSE_BRACKET, 0); }
		public ScopeQualifierContext scopeQualifier() {
			return getRuleContext(ScopeQualifierContext.class,0);
		}
		public ArgumentListContext argumentList() {
			return getRuleContext(ArgumentListContext.class,0);
		}
		public FunctionCallContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_functionCall; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).enterFunctionCall(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).exitFunctionCall(this);
		}
	}

	public final FunctionCallContext functionCall() throws RecognitionException {
		FunctionCallContext _localctx = new FunctionCallContext(_ctx, getState());
		enterRule(_localctx, 32, RULE_functionCall);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(311);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if ((((_la) & ~0x3f) == 0 && ((1L << _la) & 145144141578240L) != 0)) {
				{
				setState(310);
				scopeQualifier();
				}
			}

			setState(313);
			match(IDENTIFIER);
			setState(314);
			match(OPEN_BRACKET);
			setState(316);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if ((((_la) & ~0x3f) == 0 && ((1L << _la) & 81210146813935618L) != 0) || ((((_la - 65)) & ~0x3f) == 0 && ((1L << (_la - 65)) & 16911962373L) != 0)) {
				{
				setState(315);
				argumentList();
				}
			}

			setState(318);
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
	public static class SystemCallContext extends ParserRuleContext {
		public TerminalNode SYSTEM() { return getToken(ElanParser.SYSTEM, 0); }
		public TerminalNode DOT() { return getToken(ElanParser.DOT, 0); }
		public TerminalNode IDENTIFIER() { return getToken(ElanParser.IDENTIFIER, 0); }
		public TerminalNode OPEN_BRACKET() { return getToken(ElanParser.OPEN_BRACKET, 0); }
		public TerminalNode CLOSE_BRACKET() { return getToken(ElanParser.CLOSE_BRACKET, 0); }
		public ArgumentListContext argumentList() {
			return getRuleContext(ArgumentListContext.class,0);
		}
		public SystemCallContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_systemCall; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).enterSystemCall(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).exitSystemCall(this);
		}
	}

	public final SystemCallContext systemCall() throws RecognitionException {
		SystemCallContext _localctx = new SystemCallContext(_ctx, getState());
		enterRule(_localctx, 34, RULE_systemCall);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(320);
			match(SYSTEM);
			setState(321);
			match(DOT);
			setState(322);
			match(IDENTIFIER);
			setState(323);
			match(OPEN_BRACKET);
			setState(325);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if ((((_la) & ~0x3f) == 0 && ((1L << _la) & 81210146813935618L) != 0) || ((((_la - 65)) & ~0x3f) == 0 && ((1L << (_la - 65)) & 16911962373L) != 0)) {
				{
				setState(324);
				argumentList();
				}
			}

			setState(327);
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
	public static class InputContext extends ParserRuleContext {
		public TerminalNode INPUT() { return getToken(ElanParser.INPUT, 0); }
		public TerminalNode LITERAL_STRING() { return getToken(ElanParser.LITERAL_STRING, 0); }
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
		enterRule(_localctx, 36, RULE_input);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(329);
			match(INPUT);
			setState(331);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,18,_ctx) ) {
			case 1:
				{
				setState(330);
				match(LITERAL_STRING);
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
	public static class ArgumentContext extends ParserRuleContext {
		public ExpressionContext expression() {
			return getRuleContext(ExpressionContext.class,0);
		}
		public LambdaContext lambda() {
			return getRuleContext(LambdaContext.class,0);
		}
		public ArgumentContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_argument; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).enterArgument(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).exitArgument(this);
		}
	}

	public final ArgumentContext argument() throws RecognitionException {
		ArgumentContext _localctx = new ArgumentContext(_ctx, getState());
		enterRule(_localctx, 38, RULE_argument);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(335);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case NL:
			case DEFAULT:
			case GLOBAL:
			case INPUT:
			case LIBRARY:
			case NEW:
			case NOT:
			case PACKAGE:
			case PROPERTY:
			case SYSTEM:
			case THIS:
			case BOOL_VALUE:
			case ARRAY:
			case OPEN_BRACE:
			case OPEN_BRACKET:
			case MINUS:
			case TYPENAME:
			case IDENTIFIER:
			case LITERAL_INTEGER:
			case LITERAL_FLOAT:
			case LITERAL_CHAR:
			case LITERAL_STRING:
				{
				setState(333);
				expression(0);
				}
				break;
			case LAMBDA:
				{
				setState(334);
				lambda();
				}
				break;
			default:
				throw new NoViableAltException(this);
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
	public static class ArgumentListContext extends ParserRuleContext {
		public List<ArgumentContext> argument() {
			return getRuleContexts(ArgumentContext.class);
		}
		public ArgumentContext argument(int i) {
			return getRuleContext(ArgumentContext.class,i);
		}
		public List<TerminalNode> COMMA() { return getTokens(ElanParser.COMMA); }
		public TerminalNode COMMA(int i) {
			return getToken(ElanParser.COMMA, i);
		}
		public ArgumentListContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_argumentList; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).enterArgumentList(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).exitArgumentList(this);
		}
	}

	public final ArgumentListContext argumentList() throws RecognitionException {
		ArgumentListContext _localctx = new ArgumentListContext(_ctx, getState());
		enterRule(_localctx, 40, RULE_argumentList);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(337);
			argument();
			setState(342);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==COMMA) {
				{
				{
				setState(338);
				match(COMMA);
				setState(339);
				argument();
				}
				}
				setState(344);
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
	public static class ProcedureDefContext extends ParserRuleContext {
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
		public ProcedureDefContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_procedureDef; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).enterProcedureDef(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).exitProcedureDef(this);
		}
	}

	public final ProcedureDefContext procedureDef() throws RecognitionException {
		ProcedureDefContext _localctx = new ProcedureDefContext(_ctx, getState());
		enterRule(_localctx, 42, RULE_procedureDef);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(345);
			match(NL);
			setState(346);
			match(PROCEDURE);
			setState(347);
			procedureSignature();
			setState(348);
			statementBlock();
			setState(349);
			match(NL);
			setState(350);
			match(END);
			setState(351);
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
	public static class ProcedureSignatureContext extends ParserRuleContext {
		public TerminalNode IDENTIFIER() { return getToken(ElanParser.IDENTIFIER, 0); }
		public TerminalNode OPEN_BRACKET() { return getToken(ElanParser.OPEN_BRACKET, 0); }
		public TerminalNode CLOSE_BRACKET() { return getToken(ElanParser.CLOSE_BRACKET, 0); }
		public ProcedureParameterListContext procedureParameterList() {
			return getRuleContext(ProcedureParameterListContext.class,0);
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
		enterRule(_localctx, 44, RULE_procedureSignature);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(353);
			match(IDENTIFIER);
			setState(354);
			match(OPEN_BRACKET);
			setState(356);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==OUT || _la==IDENTIFIER) {
				{
				setState(355);
				procedureParameterList();
				}
			}

			setState(358);
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
	public static class ProcedureParameterListContext extends ParserRuleContext {
		public List<ProcedureParameterContext> procedureParameter() {
			return getRuleContexts(ProcedureParameterContext.class);
		}
		public ProcedureParameterContext procedureParameter(int i) {
			return getRuleContext(ProcedureParameterContext.class,i);
		}
		public List<TerminalNode> COMMA() { return getTokens(ElanParser.COMMA); }
		public TerminalNode COMMA(int i) {
			return getToken(ElanParser.COMMA, i);
		}
		public ProcedureParameterListContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_procedureParameterList; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).enterProcedureParameterList(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).exitProcedureParameterList(this);
		}
	}

	public final ProcedureParameterListContext procedureParameterList() throws RecognitionException {
		ProcedureParameterListContext _localctx = new ProcedureParameterListContext(_ctx, getState());
		enterRule(_localctx, 46, RULE_procedureParameterList);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(360);
			procedureParameter();
			setState(365);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==COMMA) {
				{
				{
				setState(361);
				match(COMMA);
				setState(362);
				procedureParameter();
				}
				}
				setState(367);
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
	public static class ParameterListContext extends ParserRuleContext {
		public List<ParameterContext> parameter() {
			return getRuleContexts(ParameterContext.class);
		}
		public ParameterContext parameter(int i) {
			return getRuleContext(ParameterContext.class,i);
		}
		public List<TerminalNode> COMMA() { return getTokens(ElanParser.COMMA); }
		public TerminalNode COMMA(int i) {
			return getToken(ElanParser.COMMA, i);
		}
		public ParameterListContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_parameterList; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).enterParameterList(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).exitParameterList(this);
		}
	}

	public final ParameterListContext parameterList() throws RecognitionException {
		ParameterListContext _localctx = new ParameterListContext(_ctx, getState());
		enterRule(_localctx, 48, RULE_parameterList);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(368);
			parameter();
			setState(373);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==COMMA) {
				{
				{
				setState(369);
				match(COMMA);
				setState(370);
				parameter();
				}
				}
				setState(375);
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
	public static class ParameterContext extends ParserRuleContext {
		public TerminalNode IDENTIFIER() { return getToken(ElanParser.IDENTIFIER, 0); }
		public TypeContext type() {
			return getRuleContext(TypeContext.class,0);
		}
		public ParameterContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_parameter; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).enterParameter(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).exitParameter(this);
		}
	}

	public final ParameterContext parameter() throws RecognitionException {
		ParameterContext _localctx = new ParameterContext(_ctx, getState());
		enterRule(_localctx, 50, RULE_parameter);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(376);
			match(IDENTIFIER);
			setState(377);
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
	public static class ProcedureParameterContext extends ParserRuleContext {
		public TerminalNode IDENTIFIER() { return getToken(ElanParser.IDENTIFIER, 0); }
		public TypeContext type() {
			return getRuleContext(TypeContext.class,0);
		}
		public TerminalNode OUT() { return getToken(ElanParser.OUT, 0); }
		public ProcedureParameterContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_procedureParameter; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).enterProcedureParameter(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).exitProcedureParameter(this);
		}
	}

	public final ProcedureParameterContext procedureParameter() throws RecognitionException {
		ProcedureParameterContext _localctx = new ProcedureParameterContext(_ctx, getState());
		enterRule(_localctx, 52, RULE_procedureParameter);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(380);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==OUT) {
				{
				setState(379);
				match(OUT);
				}
			}

			setState(382);
			match(IDENTIFIER);
			setState(383);
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
	public static class FunctionDefContext extends ParserRuleContext {
		public FunctionWithBodyContext functionWithBody() {
			return getRuleContext(FunctionWithBodyContext.class,0);
		}
		public ExpressionFunctionContext expressionFunction() {
			return getRuleContext(ExpressionFunctionContext.class,0);
		}
		public FunctionDefContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_functionDef; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).enterFunctionDef(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).exitFunctionDef(this);
		}
	}

	public final FunctionDefContext functionDef() throws RecognitionException {
		FunctionDefContext _localctx = new FunctionDefContext(_ctx, getState());
		enterRule(_localctx, 54, RULE_functionDef);
		try {
			setState(387);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,25,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(385);
				functionWithBody();
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(386);
				expressionFunction();
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
	public static class FunctionWithBodyContext extends ParserRuleContext {
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
		public FunctionWithBodyContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_functionWithBody; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).enterFunctionWithBody(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).exitFunctionWithBody(this);
		}
	}

	public final FunctionWithBodyContext functionWithBody() throws RecognitionException {
		FunctionWithBodyContext _localctx = new FunctionWithBodyContext(_ctx, getState());
		enterRule(_localctx, 56, RULE_functionWithBody);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(389);
			match(NL);
			setState(390);
			match(FUNCTION);
			setState(391);
			functionSignature();
			setState(392);
			statementBlock();
			setState(393);
			match(NL);
			setState(394);
			match(RETURN);
			setState(395);
			expression(0);
			setState(396);
			match(NL);
			setState(397);
			match(END);
			setState(398);
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
	public static class ExpressionFunctionContext extends ParserRuleContext {
		public TerminalNode NL() { return getToken(ElanParser.NL, 0); }
		public TerminalNode FUNCTION() { return getToken(ElanParser.FUNCTION, 0); }
		public FunctionSignatureContext functionSignature() {
			return getRuleContext(FunctionSignatureContext.class,0);
		}
		public TerminalNode ARROW() { return getToken(ElanParser.ARROW, 0); }
		public ExpressionContext expression() {
			return getRuleContext(ExpressionContext.class,0);
		}
		public ExpressionFunctionContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_expressionFunction; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).enterExpressionFunction(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).exitExpressionFunction(this);
		}
	}

	public final ExpressionFunctionContext expressionFunction() throws RecognitionException {
		ExpressionFunctionContext _localctx = new ExpressionFunctionContext(_ctx, getState());
		enterRule(_localctx, 58, RULE_expressionFunction);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(400);
			match(NL);
			setState(401);
			match(FUNCTION);
			setState(402);
			functionSignature();
			setState(403);
			match(ARROW);
			setState(404);
			expression(0);
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
		public TerminalNode AS() { return getToken(ElanParser.AS, 0); }
		public TypeContext type() {
			return getRuleContext(TypeContext.class,0);
		}
		public ParameterListContext parameterList() {
			return getRuleContext(ParameterListContext.class,0);
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
		enterRule(_localctx, 60, RULE_functionSignature);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(406);
			match(IDENTIFIER);
			setState(407);
			match(OPEN_BRACKET);
			setState(409);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==IDENTIFIER) {
				{
				setState(408);
				parameterList();
				}
			}

			setState(411);
			match(CLOSE_BRACKET);
			setState(412);
			match(AS);
			setState(413);
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
	public static class ConstantDefContext extends ParserRuleContext {
		public TerminalNode NL() { return getToken(ElanParser.NL, 0); }
		public TerminalNode CONSTANT() { return getToken(ElanParser.CONSTANT, 0); }
		public TerminalNode IDENTIFIER() { return getToken(ElanParser.IDENTIFIER, 0); }
		public TerminalNode SET() { return getToken(ElanParser.SET, 0); }
		public TerminalNode TO() { return getToken(ElanParser.TO, 0); }
		public LiteralContext literal() {
			return getRuleContext(LiteralContext.class,0);
		}
		public NewInstanceContext newInstance() {
			return getRuleContext(NewInstanceContext.class,0);
		}
		public ConstantDefContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_constantDef; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).enterConstantDef(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).exitConstantDef(this);
		}
	}

	public final ConstantDefContext constantDef() throws RecognitionException {
		ConstantDefContext _localctx = new ConstantDefContext(_ctx, getState());
		enterRule(_localctx, 62, RULE_constantDef);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(415);
			match(NL);
			setState(416);
			match(CONSTANT);
			setState(417);
			match(IDENTIFIER);
			setState(418);
			match(SET);
			setState(419);
			match(TO);
			setState(422);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case BOOL_VALUE:
			case OPEN_BRACE:
			case OPEN_BRACKET:
			case TYPENAME:
			case LITERAL_INTEGER:
			case LITERAL_FLOAT:
			case LITERAL_CHAR:
			case LITERAL_STRING:
				{
				setState(420);
				literal();
				}
				break;
			case NEW:
			case IDENTIFIER:
				{
				setState(421);
				newInstance();
				}
				break;
			default:
				throw new NoViableAltException(this);
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
	public static class EnumDefContext extends ParserRuleContext {
		public List<TerminalNode> NL() { return getTokens(ElanParser.NL); }
		public TerminalNode NL(int i) {
			return getToken(ElanParser.NL, i);
		}
		public List<TerminalNode> ENUM() { return getTokens(ElanParser.ENUM); }
		public TerminalNode ENUM(int i) {
			return getToken(ElanParser.ENUM, i);
		}
		public EnumTypeContext enumType() {
			return getRuleContext(EnumTypeContext.class,0);
		}
		public List<TerminalNode> IDENTIFIER() { return getTokens(ElanParser.IDENTIFIER); }
		public TerminalNode IDENTIFIER(int i) {
			return getToken(ElanParser.IDENTIFIER, i);
		}
		public TerminalNode END() { return getToken(ElanParser.END, 0); }
		public List<TerminalNode> COMMA() { return getTokens(ElanParser.COMMA); }
		public TerminalNode COMMA(int i) {
			return getToken(ElanParser.COMMA, i);
		}
		public EnumDefContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_enumDef; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).enterEnumDef(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).exitEnumDef(this);
		}
	}

	public final EnumDefContext enumDef() throws RecognitionException {
		EnumDefContext _localctx = new EnumDefContext(_ctx, getState());
		enterRule(_localctx, 64, RULE_enumDef);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(424);
			match(NL);
			setState(425);
			match(ENUM);
			setState(426);
			enumType();
			setState(427);
			match(NL);
			setState(428);
			match(IDENTIFIER);
			setState(433);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==COMMA) {
				{
				{
				setState(429);
				match(COMMA);
				setState(430);
				match(IDENTIFIER);
				}
				}
				setState(435);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			setState(436);
			match(NL);
			setState(437);
			match(END);
			setState(438);
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
	public static class EnumTypeContext extends ParserRuleContext {
		public TerminalNode TYPENAME() { return getToken(ElanParser.TYPENAME, 0); }
		public EnumTypeContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_enumType; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).enterEnumType(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).exitEnumType(this);
		}
	}

	public final EnumTypeContext enumType() throws RecognitionException {
		EnumTypeContext _localctx = new EnumTypeContext(_ctx, getState());
		enterRule(_localctx, 66, RULE_enumType);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(440);
			match(TYPENAME);
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
		public EnumTypeContext enumType() {
			return getRuleContext(EnumTypeContext.class,0);
		}
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
		enterRule(_localctx, 68, RULE_enumValue);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(442);
			enumType();
			setState(443);
			match(DOT);
			setState(444);
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
	public static class ClassDefContext extends ParserRuleContext {
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
		public ClassDefContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_classDef; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).enterClassDef(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).exitClassDef(this);
		}
	}

	public final ClassDefContext classDef() throws RecognitionException {
		ClassDefContext _localctx = new ClassDefContext(_ctx, getState());
		enterRule(_localctx, 70, RULE_classDef);
		try {
			setState(450);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,29,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(446);
				mutableClass();
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(447);
				abstractClass();
				}
				break;
			case 3:
				enterOuterAlt(_localctx, 3);
				{
				setState(448);
				immutableClass();
				}
				break;
			case 4:
				enterOuterAlt(_localctx, 4);
				{
				setState(449);
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
		public List<FunctionDefContext> functionDef() {
			return getRuleContexts(FunctionDefContext.class);
		}
		public FunctionDefContext functionDef(int i) {
			return getRuleContext(FunctionDefContext.class,i);
		}
		public List<ProcedureDefContext> procedureDef() {
			return getRuleContexts(ProcedureDefContext.class);
		}
		public ProcedureDefContext procedureDef(int i) {
			return getRuleContext(ProcedureDefContext.class,i);
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
		enterRule(_localctx, 72, RULE_mutableClass);
		int _la;
		try {
			int _alt;
			enterOuterAlt(_localctx, 1);
			{
			setState(452);
			match(NL);
			setState(453);
			match(CLASS);
			setState(454);
			match(TYPENAME);
			setState(456);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==INHERITS) {
				{
				setState(455);
				inherits();
				}
			}

			setState(458);
			constructor();
			setState(465);
			_errHandler.sync(this);
			_alt = getInterpreter().adaptivePredict(_input,32,_ctx);
			while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER ) {
				if ( _alt==1 ) {
					{
					setState(463);
					_errHandler.sync(this);
					switch ( getInterpreter().adaptivePredict(_input,31,_ctx) ) {
					case 1:
						{
						setState(459);
						match(NL);
						setState(460);
						property();
						}
						break;
					case 2:
						{
						setState(461);
						functionDef();
						}
						break;
					case 3:
						{
						setState(462);
						procedureDef();
						}
						break;
					}
					} 
				}
				setState(467);
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,32,_ctx);
			}
			setState(468);
			match(NL);
			setState(469);
			match(END);
			setState(470);
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
		enterRule(_localctx, 74, RULE_abstractClass);
		int _la;
		try {
			int _alt;
			enterOuterAlt(_localctx, 1);
			{
			setState(472);
			match(NL);
			setState(473);
			match(ABSTRACT);
			setState(474);
			match(CLASS);
			setState(475);
			match(TYPENAME);
			setState(477);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==INHERITS) {
				{
				setState(476);
				inherits();
				}
			}

			setState(492);
			_errHandler.sync(this);
			_alt = getInterpreter().adaptivePredict(_input,35,_ctx);
			while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER ) {
				if ( _alt==1 ) {
					{
					setState(490);
					_errHandler.sync(this);
					switch ( getInterpreter().adaptivePredict(_input,34,_ctx) ) {
					case 1:
						{
						setState(479);
						match(NL);
						setState(480);
						match(ABSTRACT);
						setState(481);
						property();
						}
						break;
					case 2:
						{
						setState(482);
						match(NL);
						setState(483);
						match(ABSTRACT);
						setState(484);
						match(FUNCTION);
						setState(485);
						functionSignature();
						}
						break;
					case 3:
						{
						setState(486);
						match(NL);
						setState(487);
						match(ABSTRACT);
						setState(488);
						match(PROCEDURE);
						setState(489);
						procedureSignature();
						}
						break;
					}
					} 
				}
				setState(494);
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,35,_ctx);
			}
			setState(495);
			match(NL);
			setState(496);
			match(END);
			setState(497);
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
		public List<FunctionDefContext> functionDef() {
			return getRuleContexts(FunctionDefContext.class);
		}
		public FunctionDefContext functionDef(int i) {
			return getRuleContext(FunctionDefContext.class,i);
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
		enterRule(_localctx, 76, RULE_immutableClass);
		int _la;
		try {
			int _alt;
			enterOuterAlt(_localctx, 1);
			{
			setState(499);
			match(NL);
			setState(500);
			match(IMMUTABLE);
			setState(501);
			match(CLASS);
			setState(502);
			match(TYPENAME);
			setState(504);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==INHERITS) {
				{
				setState(503);
				inherits();
				}
			}

			setState(506);
			constructor();
			setState(512);
			_errHandler.sync(this);
			_alt = getInterpreter().adaptivePredict(_input,38,_ctx);
			while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER ) {
				if ( _alt==1 ) {
					{
					setState(510);
					_errHandler.sync(this);
					switch ( getInterpreter().adaptivePredict(_input,37,_ctx) ) {
					case 1:
						{
						setState(507);
						match(NL);
						setState(508);
						property();
						}
						break;
					case 2:
						{
						setState(509);
						functionDef();
						}
						break;
					}
					} 
				}
				setState(514);
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,38,_ctx);
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
		enterRule(_localctx, 78, RULE_abstractImmutableClass);
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
			match(IMMUTABLE);
			setState(522);
			match(CLASS);
			setState(523);
			match(TYPENAME);
			setState(525);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==INHERITS) {
				{
				setState(524);
				inherits();
				}
			}

			setState(536);
			_errHandler.sync(this);
			_alt = getInterpreter().adaptivePredict(_input,41,_ctx);
			while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER ) {
				if ( _alt==1 ) {
					{
					setState(534);
					_errHandler.sync(this);
					switch ( getInterpreter().adaptivePredict(_input,40,_ctx) ) {
					case 1:
						{
						setState(527);
						match(NL);
						setState(528);
						match(ABSTRACT);
						setState(529);
						property();
						}
						break;
					case 2:
						{
						setState(530);
						match(NL);
						setState(531);
						match(ABSTRACT);
						setState(532);
						match(FUNCTION);
						setState(533);
						functionSignature();
						}
						break;
					}
					} 
				}
				setState(538);
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,41,_ctx);
			}
			setState(539);
			match(NL);
			setState(540);
			match(END);
			setState(541);
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
		enterRule(_localctx, 80, RULE_inherits);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(543);
			match(INHERITS);
			setState(544);
			type();
			setState(549);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==COMMA) {
				{
				{
				setState(545);
				match(COMMA);
				setState(546);
				type();
				}
				}
				setState(551);
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
	public static class PropertyContext extends ParserRuleContext {
		public TerminalNode PROPERTY() { return getToken(ElanParser.PROPERTY, 0); }
		public TerminalNode IDENTIFIER() { return getToken(ElanParser.IDENTIFIER, 0); }
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
		enterRule(_localctx, 82, RULE_property);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(553);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==PRIVATE) {
				{
				setState(552);
				match(PRIVATE);
				}
			}

			setState(555);
			match(PROPERTY);
			setState(556);
			match(IDENTIFIER);
			setState(557);
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
		public ParameterListContext parameterList() {
			return getRuleContext(ParameterListContext.class,0);
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
		enterRule(_localctx, 84, RULE_constructor);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(559);
			match(NL);
			setState(560);
			match(CONSTRUCTOR);
			setState(561);
			match(OPEN_BRACKET);
			setState(563);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==IDENTIFIER) {
				{
				setState(562);
				parameterList();
				}
			}

			setState(565);
			match(CLOSE_BRACKET);
			setState(566);
			statementBlock();
			setState(567);
			match(NL);
			setState(568);
			match(END);
			setState(569);
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
	public static class NewInstanceContext extends ParserRuleContext {
		public TerminalNode NEW() { return getToken(ElanParser.NEW, 0); }
		public TypeContext type() {
			return getRuleContext(TypeContext.class,0);
		}
		public TerminalNode OPEN_BRACKET() { return getToken(ElanParser.OPEN_BRACKET, 0); }
		public TerminalNode CLOSE_BRACKET() { return getToken(ElanParser.CLOSE_BRACKET, 0); }
		public ArgumentListContext argumentList() {
			return getRuleContext(ArgumentListContext.class,0);
		}
		public WithClauseContext withClause() {
			return getRuleContext(WithClauseContext.class,0);
		}
		public TerminalNode IDENTIFIER() { return getToken(ElanParser.IDENTIFIER, 0); }
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
		enterRule(_localctx, 86, RULE_newInstance);
		int _la;
		try {
			setState(583);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case NEW:
				enterOuterAlt(_localctx, 1);
				{
				setState(571);
				match(NEW);
				setState(572);
				type();
				setState(573);
				match(OPEN_BRACKET);
				setState(575);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if ((((_la) & ~0x3f) == 0 && ((1L << _la) & 81210146813935618L) != 0) || ((((_la - 65)) & ~0x3f) == 0 && ((1L << (_la - 65)) & 16911962373L) != 0)) {
					{
					setState(574);
					argumentList();
					}
				}

				setState(577);
				match(CLOSE_BRACKET);
				setState(579);
				_errHandler.sync(this);
				switch ( getInterpreter().adaptivePredict(_input,46,_ctx) ) {
				case 1:
					{
					setState(578);
					withClause();
					}
					break;
				}
				}
				break;
			case IDENTIFIER:
				enterOuterAlt(_localctx, 2);
				{
				setState(581);
				match(IDENTIFIER);
				setState(582);
				withClause();
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
	public static class WithClauseContext extends ParserRuleContext {
		public TerminalNode WITH() { return getToken(ElanParser.WITH, 0); }
		public TerminalNode OPEN_BRACE() { return getToken(ElanParser.OPEN_BRACE, 0); }
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
		enterRule(_localctx, 88, RULE_withClause);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(585);
			match(WITH);
			setState(586);
			match(OPEN_BRACE);
			setState(587);
			inlineAsignment();
			setState(592);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==COMMA) {
				{
				{
				setState(588);
				match(COMMA);
				setState(589);
				inlineAsignment();
				}
				}
				setState(594);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			setState(595);
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
	public static class ProceduralControlFlowContext extends ParserRuleContext {
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
		public ProceduralControlFlowContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_proceduralControlFlow; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).enterProceduralControlFlow(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).exitProceduralControlFlow(this);
		}
	}

	public final ProceduralControlFlowContext proceduralControlFlow() throws RecognitionException {
		ProceduralControlFlowContext _localctx = new ProceduralControlFlowContext(_ctx, getState());
		enterRule(_localctx, 90, RULE_proceduralControlFlow);
		try {
			setState(604);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,49,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(597);
				if_();
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(598);
				for_();
				}
				break;
			case 3:
				enterOuterAlt(_localctx, 3);
				{
				setState(599);
				each();
				}
				break;
			case 4:
				enterOuterAlt(_localctx, 4);
				{
				setState(600);
				while_();
				}
				break;
			case 5:
				enterOuterAlt(_localctx, 5);
				{
				setState(601);
				repeat();
				}
				break;
			case 6:
				enterOuterAlt(_localctx, 6);
				{
				setState(602);
				try_();
				}
				break;
			case 7:
				enterOuterAlt(_localctx, 7);
				{
				setState(603);
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
	public static class IfContext extends ParserRuleContext {
		public List<TerminalNode> NL() { return getTokens(ElanParser.NL); }
		public TerminalNode NL(int i) {
			return getToken(ElanParser.NL, i);
		}
		public List<TerminalNode> IF() { return getTokens(ElanParser.IF); }
		public TerminalNode IF(int i) {
			return getToken(ElanParser.IF, i);
		}
		public List<ExpressionContext> expression() {
			return getRuleContexts(ExpressionContext.class);
		}
		public ExpressionContext expression(int i) {
			return getRuleContext(ExpressionContext.class,i);
		}
		public List<TerminalNode> THEN() { return getTokens(ElanParser.THEN); }
		public TerminalNode THEN(int i) {
			return getToken(ElanParser.THEN, i);
		}
		public List<StatementBlockContext> statementBlock() {
			return getRuleContexts(StatementBlockContext.class);
		}
		public StatementBlockContext statementBlock(int i) {
			return getRuleContext(StatementBlockContext.class,i);
		}
		public TerminalNode END() { return getToken(ElanParser.END, 0); }
		public List<TerminalNode> ELSE() { return getTokens(ElanParser.ELSE); }
		public TerminalNode ELSE(int i) {
			return getToken(ElanParser.ELSE, i);
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
		enterRule(_localctx, 92, RULE_if);
		try {
			int _alt;
			enterOuterAlt(_localctx, 1);
			{
			setState(606);
			match(NL);
			setState(607);
			match(IF);
			setState(608);
			expression(0);
			setState(609);
			match(THEN);
			setState(610);
			statementBlock();
			setState(620);
			_errHandler.sync(this);
			_alt = getInterpreter().adaptivePredict(_input,50,_ctx);
			while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER ) {
				if ( _alt==1 ) {
					{
					{
					setState(611);
					match(NL);
					setState(612);
					match(ELSE);
					setState(613);
					match(IF);
					setState(614);
					expression(0);
					setState(615);
					match(THEN);
					setState(616);
					statementBlock();
					}
					} 
				}
				setState(622);
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,50,_ctx);
			}
			setState(626);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,51,_ctx) ) {
			case 1:
				{
				setState(623);
				match(NL);
				setState(624);
				match(ELSE);
				setState(625);
				statementBlock();
				}
				break;
			}
			setState(628);
			match(NL);
			setState(629);
			match(END);
			setState(630);
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
		public StatementBlockContext statementBlock() {
			return getRuleContext(StatementBlockContext.class,0);
		}
		public TerminalNode END() { return getToken(ElanParser.END, 0); }
		public TerminalNode STEP() { return getToken(ElanParser.STEP, 0); }
		public TerminalNode LITERAL_INTEGER() { return getToken(ElanParser.LITERAL_INTEGER, 0); }
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
		enterRule(_localctx, 94, RULE_for);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(632);
			match(NL);
			setState(633);
			match(FOR);
			setState(634);
			match(IDENTIFIER);
			setState(635);
			match(FROM);
			setState(636);
			expression(0);
			setState(637);
			match(TO);
			setState(638);
			expression(0);
			setState(644);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==STEP) {
				{
				setState(639);
				match(STEP);
				setState(641);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==MINUS) {
					{
					setState(640);
					match(MINUS);
					}
				}

				setState(643);
				match(LITERAL_INTEGER);
				}
			}

			setState(646);
			statementBlock();
			setState(647);
			match(NL);
			setState(648);
			match(END);
			setState(649);
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
		enterRule(_localctx, 96, RULE_each);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(651);
			match(NL);
			setState(652);
			match(EACH);
			setState(653);
			match(IDENTIFIER);
			setState(654);
			match(IN);
			setState(655);
			expression(0);
			setState(656);
			statementBlock();
			setState(657);
			match(NL);
			setState(658);
			match(END);
			setState(659);
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
		enterRule(_localctx, 98, RULE_while);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(661);
			match(NL);
			setState(662);
			match(WHILE);
			setState(663);
			expression(0);
			setState(664);
			statementBlock();
			setState(665);
			match(NL);
			setState(666);
			match(END);
			setState(667);
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
		enterRule(_localctx, 100, RULE_repeat);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(669);
			match(NL);
			{
			setState(670);
			match(REPEAT);
			}
			setState(671);
			statementBlock();
			setState(672);
			match(NL);
			setState(673);
			match(END);
			setState(674);
			match(REPEAT);
			setState(675);
			match(WHEN);
			setState(676);
			expression(0);
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
		public List<StatementBlockContext> statementBlock() {
			return getRuleContexts(StatementBlockContext.class);
		}
		public StatementBlockContext statementBlock(int i) {
			return getRuleContext(StatementBlockContext.class,i);
		}
		public TerminalNode CATCH() { return getToken(ElanParser.CATCH, 0); }
		public TerminalNode IDENTIFIER() { return getToken(ElanParser.IDENTIFIER, 0); }
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
		enterRule(_localctx, 102, RULE_try);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(678);
			match(NL);
			setState(679);
			match(TRY);
			setState(680);
			statementBlock();
			setState(681);
			match(NL);
			setState(682);
			match(CATCH);
			setState(683);
			match(IDENTIFIER);
			setState(684);
			statementBlock();
			setState(685);
			match(NL);
			setState(686);
			match(END);
			setState(687);
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
		public CaseDefaultContext caseDefault() {
			return getRuleContext(CaseDefaultContext.class,0);
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
		enterRule(_localctx, 104, RULE_switch);
		try {
			int _alt;
			enterOuterAlt(_localctx, 1);
			{
			setState(689);
			match(NL);
			setState(690);
			match(SWITCH);
			setState(691);
			expression(0);
			setState(693); 
			_errHandler.sync(this);
			_alt = 1;
			do {
				switch (_alt) {
				case 1:
					{
					{
					setState(692);
					case_();
					}
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				setState(695); 
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,54,_ctx);
			} while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER );
			setState(697);
			caseDefault();
			setState(698);
			match(NL);
			setState(699);
			match(END);
			setState(700);
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
		public TerminalNode MINUS() { return getToken(ElanParser.MINUS, 0); }
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
		enterRule(_localctx, 106, RULE_case);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(702);
			match(NL);
			setState(703);
			match(CASE);
			setState(705);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==MINUS) {
				{
				setState(704);
				match(MINUS);
				}
			}

			setState(707);
			literalValue();
			setState(708);
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
	public static class CaseDefaultContext extends ParserRuleContext {
		public TerminalNode NL() { return getToken(ElanParser.NL, 0); }
		public TerminalNode DEFAULT() { return getToken(ElanParser.DEFAULT, 0); }
		public StatementBlockContext statementBlock() {
			return getRuleContext(StatementBlockContext.class,0);
		}
		public CaseDefaultContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_caseDefault; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).enterCaseDefault(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).exitCaseDefault(this);
		}
	}

	public final CaseDefaultContext caseDefault() throws RecognitionException {
		CaseDefaultContext _localctx = new CaseDefaultContext(_ctx, getState());
		enterRule(_localctx, 108, RULE_caseDefault);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(710);
			match(NL);
			setState(711);
			match(DEFAULT);
			setState(712);
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
	public static class ExpressionContext extends ParserRuleContext {
		public BracketedExpressionContext bracketedExpression() {
			return getRuleContext(BracketedExpressionContext.class,0);
		}
		public FunctionCallContext functionCall() {
			return getRuleContext(FunctionCallContext.class,0);
		}
		public ValueContext value() {
			return getRuleContext(ValueContext.class,0);
		}
		public UnaryOpContext unaryOp() {
			return getRuleContext(UnaryOpContext.class,0);
		}
		public List<ExpressionContext> expression() {
			return getRuleContexts(ExpressionContext.class);
		}
		public ExpressionContext expression(int i) {
			return getRuleContext(ExpressionContext.class,i);
		}
		public NewInstanceContext newInstance() {
			return getRuleContext(NewInstanceContext.class,0);
		}
		public InputContext input() {
			return getRuleContext(InputContext.class,0);
		}
		public SystemCallContext systemCall() {
			return getRuleContext(SystemCallContext.class,0);
		}
		public TerminalNode NL() { return getToken(ElanParser.NL, 0); }
		public TerminalNode POWER() { return getToken(ElanParser.POWER, 0); }
		public BinaryOpContext binaryOp() {
			return getRuleContext(BinaryOpContext.class,0);
		}
		public IndexContext index() {
			return getRuleContext(IndexContext.class,0);
		}
		public TerminalNode DOT() { return getToken(ElanParser.DOT, 0); }
		public TerminalNode IDENTIFIER() { return getToken(ElanParser.IDENTIFIER, 0); }
		public IfExpressionContext ifExpression() {
			return getRuleContext(IfExpressionContext.class,0);
		}
		public ElseExpressionContext elseExpression() {
			return getRuleContext(ElseExpressionContext.class,0);
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
		return expression(0);
	}

	private ExpressionContext expression(int _p) throws RecognitionException {
		ParserRuleContext _parentctx = _ctx;
		int _parentState = getState();
		ExpressionContext _localctx = new ExpressionContext(_ctx, _parentState);
		ExpressionContext _prevctx = _localctx;
		int _startState = 110;
		enterRecursionRule(_localctx, 110, RULE_expression, _p);
		try {
			int _alt;
			enterOuterAlt(_localctx, 1);
			{
			setState(726);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,56,_ctx) ) {
			case 1:
				{
				setState(715);
				bracketedExpression();
				}
				break;
			case 2:
				{
				setState(716);
				functionCall();
				}
				break;
			case 3:
				{
				setState(717);
				value();
				}
				break;
			case 4:
				{
				setState(718);
				unaryOp();
				setState(719);
				expression(9);
				}
				break;
			case 5:
				{
				setState(721);
				newInstance();
				}
				break;
			case 6:
				{
				setState(722);
				input();
				}
				break;
			case 7:
				{
				setState(723);
				systemCall();
				}
				break;
			case 8:
				{
				setState(724);
				match(NL);
				setState(725);
				expression(1);
				}
				break;
			}
			_ctx.stop = _input.LT(-1);
			setState(751);
			_errHandler.sync(this);
			_alt = getInterpreter().adaptivePredict(_input,58,_ctx);
			while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER ) {
				if ( _alt==1 ) {
					if ( _parseListeners!=null ) triggerExitRuleEvent();
					_prevctx = _localctx;
					{
					setState(749);
					_errHandler.sync(this);
					switch ( getInterpreter().adaptivePredict(_input,57,_ctx) ) {
					case 1:
						{
						_localctx = new ExpressionContext(_parentctx, _parentState);
						pushNewRecursionContext(_localctx, _startState, RULE_expression);
						setState(728);
						if (!(precpred(_ctx, 8))) throw new FailedPredicateException(this, "precpred(_ctx, 8)");
						setState(729);
						match(POWER);
						setState(730);
						expression(9);
						}
						break;
					case 2:
						{
						_localctx = new ExpressionContext(_parentctx, _parentState);
						pushNewRecursionContext(_localctx, _startState, RULE_expression);
						setState(731);
						if (!(precpred(_ctx, 7))) throw new FailedPredicateException(this, "precpred(_ctx, 7)");
						setState(732);
						binaryOp();
						setState(733);
						expression(8);
						}
						break;
					case 3:
						{
						_localctx = new ExpressionContext(_parentctx, _parentState);
						pushNewRecursionContext(_localctx, _startState, RULE_expression);
						setState(735);
						if (!(precpred(_ctx, 12))) throw new FailedPredicateException(this, "precpred(_ctx, 12)");
						setState(736);
						index();
						}
						break;
					case 4:
						{
						_localctx = new ExpressionContext(_parentctx, _parentState);
						pushNewRecursionContext(_localctx, _startState, RULE_expression);
						setState(737);
						if (!(precpred(_ctx, 11))) throw new FailedPredicateException(this, "precpred(_ctx, 11)");
						setState(738);
						match(DOT);
						setState(739);
						functionCall();
						}
						break;
					case 5:
						{
						_localctx = new ExpressionContext(_parentctx, _parentState);
						pushNewRecursionContext(_localctx, _startState, RULE_expression);
						setState(740);
						if (!(precpred(_ctx, 10))) throw new FailedPredicateException(this, "precpred(_ctx, 10)");
						setState(741);
						match(DOT);
						setState(742);
						match(IDENTIFIER);
						}
						break;
					case 6:
						{
						_localctx = new ExpressionContext(_parentctx, _parentState);
						pushNewRecursionContext(_localctx, _startState, RULE_expression);
						setState(743);
						if (!(precpred(_ctx, 5))) throw new FailedPredicateException(this, "precpred(_ctx, 5)");
						setState(744);
						ifExpression();
						setState(745);
						elseExpression();
						}
						break;
					case 7:
						{
						_localctx = new ExpressionContext(_parentctx, _parentState);
						pushNewRecursionContext(_localctx, _startState, RULE_expression);
						setState(747);
						if (!(precpred(_ctx, 4))) throw new FailedPredicateException(this, "precpred(_ctx, 4)");
						setState(748);
						withClause();
						}
						break;
					}
					} 
				}
				setState(753);
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,58,_ctx);
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			unrollRecursionContexts(_parentctx);
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
		enterRule(_localctx, 112, RULE_bracketedExpression);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(754);
			match(OPEN_BRACKET);
			setState(755);
			expression(0);
			setState(756);
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
	public static class IfExpressionContext extends ParserRuleContext {
		public TerminalNode IF() { return getToken(ElanParser.IF, 0); }
		public ExpressionContext expression() {
			return getRuleContext(ExpressionContext.class,0);
		}
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
		enterRule(_localctx, 114, RULE_ifExpression);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(758);
			match(IF);
			setState(759);
			expression(0);
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
	public static class ElseExpressionContext extends ParserRuleContext {
		public TerminalNode ELSE() { return getToken(ElanParser.ELSE, 0); }
		public ExpressionContext expression() {
			return getRuleContext(ExpressionContext.class,0);
		}
		public ElseExpressionContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_elseExpression; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).enterElseExpression(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).exitElseExpression(this);
		}
	}

	public final ElseExpressionContext elseExpression() throws RecognitionException {
		ElseExpressionContext _localctx = new ElseExpressionContext(_ctx, getState());
		enterRule(_localctx, 116, RULE_elseExpression);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(761);
			match(ELSE);
			setState(762);
			expression(0);
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
		public ArgumentListContext argumentList() {
			return getRuleContext(ArgumentListContext.class,0);
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
		enterRule(_localctx, 118, RULE_lambda);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(764);
			match(LAMBDA);
			setState(765);
			argumentList();
			setState(766);
			match(ARROW);
			setState(767);
			expression(0);
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
		enterRule(_localctx, 120, RULE_index);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(769);
			match(OPEN_SQ_BRACKET);
			setState(776);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,59,_ctx) ) {
			case 1:
				{
				setState(770);
				expression(0);
				}
				break;
			case 2:
				{
				setState(771);
				expression(0);
				setState(772);
				match(COMMA);
				setState(773);
				expression(0);
				}
				break;
			case 3:
				{
				setState(775);
				range();
				}
				break;
			}
			setState(778);
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
		enterRule(_localctx, 122, RULE_range);
		try {
			setState(789);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,60,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(780);
				expression(0);
				setState(781);
				match(DOUBLE_DOT);
				setState(782);
				expression(0);
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(784);
				expression(0);
				setState(785);
				match(DOUBLE_DOT);
				}
				break;
			case 3:
				enterOuterAlt(_localctx, 3);
				{
				setState(787);
				match(DOUBLE_DOT);
				setState(788);
				expression(0);
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
	public static class ValueContext extends ParserRuleContext {
		public LiteralContext literal() {
			return getRuleContext(LiteralContext.class,0);
		}
		public TerminalNode IDENTIFIER() { return getToken(ElanParser.IDENTIFIER, 0); }
		public ScopeQualifierContext scopeQualifier() {
			return getRuleContext(ScopeQualifierContext.class,0);
		}
		public DataStructureDefinitionContext dataStructureDefinition() {
			return getRuleContext(DataStructureDefinitionContext.class,0);
		}
		public TerminalNode THIS() { return getToken(ElanParser.THIS, 0); }
		public TerminalNode DEFAULT() { return getToken(ElanParser.DEFAULT, 0); }
		public TypeContext type() {
			return getRuleContext(TypeContext.class,0);
		}
		public ValueContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_value; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).enterValue(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).exitValue(this);
		}
	}

	public final ValueContext value() throws RecognitionException {
		ValueContext _localctx = new ValueContext(_ctx, getState());
		enterRule(_localctx, 124, RULE_value);
		int _la;
		try {
			setState(800);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,62,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(791);
				literal();
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(793);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if ((((_la) & ~0x3f) == 0 && ((1L << _la) & 145144141578240L) != 0)) {
					{
					setState(792);
					scopeQualifier();
					}
				}

				setState(795);
				match(IDENTIFIER);
				}
				break;
			case 3:
				enterOuterAlt(_localctx, 3);
				{
				setState(796);
				dataStructureDefinition();
				}
				break;
			case 4:
				enterOuterAlt(_localctx, 4);
				{
				setState(797);
				match(THIS);
				}
				break;
			case 5:
				enterOuterAlt(_localctx, 5);
				{
				setState(798);
				match(DEFAULT);
				setState(799);
				type();
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
	public static class ScopeQualifierContext extends ParserRuleContext {
		public List<TerminalNode> DOT() { return getTokens(ElanParser.DOT); }
		public TerminalNode DOT(int i) {
			return getToken(ElanParser.DOT, i);
		}
		public TerminalNode PROPERTY() { return getToken(ElanParser.PROPERTY, 0); }
		public TerminalNode GLOBAL() { return getToken(ElanParser.GLOBAL, 0); }
		public TerminalNode LIBRARY() { return getToken(ElanParser.LIBRARY, 0); }
		public TerminalNode PACKAGE() { return getToken(ElanParser.PACKAGE, 0); }
		public NamespaceContext namespace() {
			return getRuleContext(NamespaceContext.class,0);
		}
		public ScopeQualifierContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_scopeQualifier; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).enterScopeQualifier(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).exitScopeQualifier(this);
		}
	}

	public final ScopeQualifierContext scopeQualifier() throws RecognitionException {
		ScopeQualifierContext _localctx = new ScopeQualifierContext(_ctx, getState());
		enterRule(_localctx, 126, RULE_scopeQualifier);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(808);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case PROPERTY:
				{
				setState(802);
				match(PROPERTY);
				}
				break;
			case GLOBAL:
				{
				setState(803);
				match(GLOBAL);
				}
				break;
			case LIBRARY:
				{
				setState(804);
				match(LIBRARY);
				}
				break;
			case PACKAGE:
				{
				{
				setState(805);
				match(PACKAGE);
				setState(806);
				match(DOT);
				setState(807);
				namespace();
				}
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			setState(810);
			match(DOT);
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
		enterRule(_localctx, 128, RULE_literal);
		try {
			setState(814);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case BOOL_VALUE:
			case TYPENAME:
			case LITERAL_INTEGER:
			case LITERAL_FLOAT:
			case LITERAL_CHAR:
				enterOuterAlt(_localctx, 1);
				{
				setState(812);
				literalValue();
				}
				break;
			case OPEN_BRACE:
			case OPEN_BRACKET:
			case LITERAL_STRING:
				enterOuterAlt(_localctx, 2);
				{
				setState(813);
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
		enterRule(_localctx, 130, RULE_literalValue);
		try {
			setState(821);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case BOOL_VALUE:
				enterOuterAlt(_localctx, 1);
				{
				setState(816);
				match(BOOL_VALUE);
				}
				break;
			case LITERAL_INTEGER:
				enterOuterAlt(_localctx, 2);
				{
				setState(817);
				match(LITERAL_INTEGER);
				}
				break;
			case LITERAL_FLOAT:
				enterOuterAlt(_localctx, 3);
				{
				setState(818);
				match(LITERAL_FLOAT);
				}
				break;
			case LITERAL_CHAR:
				enterOuterAlt(_localctx, 4);
				{
				setState(819);
				match(LITERAL_CHAR);
				}
				break;
			case TYPENAME:
				enterOuterAlt(_localctx, 5);
				{
				setState(820);
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
	public static class DataStructureDefinitionContext extends ParserRuleContext {
		public ListDefinitionContext listDefinition() {
			return getRuleContext(ListDefinitionContext.class,0);
		}
		public ArrayDefinitionContext arrayDefinition() {
			return getRuleContext(ArrayDefinitionContext.class,0);
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
			setState(827);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,66,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(823);
				listDefinition();
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(824);
				arrayDefinition();
				}
				break;
			case 3:
				enterOuterAlt(_localctx, 3);
				{
				setState(825);
				tupleDefinition();
				}
				break;
			case 4:
				enterOuterAlt(_localctx, 4);
				{
				setState(826);
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
		enterRule(_localctx, 134, RULE_literalDataStructure);
		try {
			setState(833);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,67,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(829);
				match(LITERAL_STRING);
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(830);
				literalTuple();
				}
				break;
			case 3:
				enterOuterAlt(_localctx, 3);
				{
				setState(831);
				literalList();
				}
				break;
			case 4:
				enterOuterAlt(_localctx, 4);
				{
				setState(832);
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
			setState(835);
			match(OPEN_BRACKET);
			setState(836);
			expression(0);
			setState(837);
			match(COMMA);
			setState(838);
			expression(0);
			setState(843);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==COMMA) {
				{
				{
				setState(839);
				match(COMMA);
				setState(840);
				expression(0);
				}
				}
				setState(845);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			setState(846);
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
		enterRule(_localctx, 138, RULE_literalTuple);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(848);
			match(OPEN_BRACKET);
			setState(849);
			literal();
			setState(850);
			match(COMMA);
			setState(851);
			literal();
			setState(856);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==COMMA) {
				{
				{
				setState(852);
				match(COMMA);
				setState(853);
				literal();
				}
				}
				setState(858);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			setState(859);
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
		enterRule(_localctx, 140, RULE_deconstructedTuple);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(861);
			match(OPEN_BRACKET);
			setState(862);
			match(IDENTIFIER);
			setState(865); 
			_errHandler.sync(this);
			_la = _input.LA(1);
			do {
				{
				{
				setState(863);
				match(COMMA);
				setState(864);
				match(IDENTIFIER);
				}
				}
				setState(867); 
				_errHandler.sync(this);
				_la = _input.LA(1);
			} while ( _la==COMMA );
			setState(869);
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
	public static class ListDefinitionContext extends ParserRuleContext {
		public TerminalNode OPEN_BRACE() { return getToken(ElanParser.OPEN_BRACE, 0); }
		public TerminalNode CLOSE_BRACE() { return getToken(ElanParser.CLOSE_BRACE, 0); }
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
		enterRule(_localctx, 142, RULE_listDefinition);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(871);
			match(OPEN_BRACE);
			{
			setState(872);
			expression(0);
			setState(877);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==COMMA) {
				{
				{
				setState(873);
				match(COMMA);
				setState(874);
				expression(0);
				}
				}
				setState(879);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			}
			setState(880);
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
	public static class LiteralListContext extends ParserRuleContext {
		public TerminalNode OPEN_BRACE() { return getToken(ElanParser.OPEN_BRACE, 0); }
		public TerminalNode CLOSE_BRACE() { return getToken(ElanParser.CLOSE_BRACE, 0); }
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
		enterRule(_localctx, 144, RULE_literalList);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(882);
			match(OPEN_BRACE);
			{
			setState(883);
			literal();
			setState(888);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==COMMA) {
				{
				{
				setState(884);
				match(COMMA);
				setState(885);
				literal();
				}
				}
				setState(890);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			}
			setState(891);
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
	public static class ListDecompContext extends ParserRuleContext {
		public TerminalNode OPEN_BRACE() { return getToken(ElanParser.OPEN_BRACE, 0); }
		public List<TerminalNode> IDENTIFIER() { return getTokens(ElanParser.IDENTIFIER); }
		public TerminalNode IDENTIFIER(int i) {
			return getToken(ElanParser.IDENTIFIER, i);
		}
		public TerminalNode COLON() { return getToken(ElanParser.COLON, 0); }
		public TerminalNode CLOSE_BRACE() { return getToken(ElanParser.CLOSE_BRACE, 0); }
		public ListDecompContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_listDecomp; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).enterListDecomp(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).exitListDecomp(this);
		}
	}

	public final ListDecompContext listDecomp() throws RecognitionException {
		ListDecompContext _localctx = new ListDecompContext(_ctx, getState());
		enterRule(_localctx, 146, RULE_listDecomp);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(893);
			match(OPEN_BRACE);
			setState(894);
			match(IDENTIFIER);
			setState(895);
			match(COLON);
			setState(896);
			match(IDENTIFIER);
			setState(897);
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
	public static class ArrayDefinitionContext extends ParserRuleContext {
		public TerminalNode ARRAY() { return getToken(ElanParser.ARRAY, 0); }
		public GenericSpecifierContext genericSpecifier() {
			return getRuleContext(GenericSpecifierContext.class,0);
		}
		public TerminalNode OPEN_BRACKET() { return getToken(ElanParser.OPEN_BRACKET, 0); }
		public TerminalNode CLOSE_BRACKET() { return getToken(ElanParser.CLOSE_BRACKET, 0); }
		public TerminalNode LITERAL_INTEGER() { return getToken(ElanParser.LITERAL_INTEGER, 0); }
		public ArrayDefinitionContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_arrayDefinition; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).enterArrayDefinition(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof ElanListener ) ((ElanListener)listener).exitArrayDefinition(this);
		}
	}

	public final ArrayDefinitionContext arrayDefinition() throws RecognitionException {
		ArrayDefinitionContext _localctx = new ArrayDefinitionContext(_ctx, getState());
		enterRule(_localctx, 148, RULE_arrayDefinition);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(899);
			match(ARRAY);
			setState(900);
			genericSpecifier();
			setState(901);
			match(OPEN_BRACKET);
			setState(903);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==LITERAL_INTEGER) {
				{
				setState(902);
				match(LITERAL_INTEGER);
				}
			}

			setState(905);
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
		public TerminalNode OPEN_BRACE() { return getToken(ElanParser.OPEN_BRACE, 0); }
		public TerminalNode CLOSE_BRACE() { return getToken(ElanParser.CLOSE_BRACE, 0); }
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
		enterRule(_localctx, 150, RULE_dictionaryDefinition);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(907);
			match(OPEN_BRACE);
			{
			setState(908);
			kvp();
			setState(913);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==COMMA) {
				{
				{
				setState(909);
				match(COMMA);
				setState(910);
				kvp();
				}
				}
				setState(915);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			}
			setState(916);
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
	public static class LiteralDictionaryContext extends ParserRuleContext {
		public TerminalNode OPEN_BRACE() { return getToken(ElanParser.OPEN_BRACE, 0); }
		public TerminalNode CLOSE_BRACE() { return getToken(ElanParser.CLOSE_BRACE, 0); }
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
		enterRule(_localctx, 152, RULE_literalDictionary);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(918);
			match(OPEN_BRACE);
			{
			setState(919);
			literalKvp();
			setState(924);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==COMMA) {
				{
				{
				setState(920);
				match(COMMA);
				setState(921);
				literalKvp();
				}
				}
				setState(926);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			}
			setState(927);
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
		enterRule(_localctx, 154, RULE_kvp);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(929);
			expression(0);
			setState(930);
			match(COLON);
			setState(931);
			expression(0);
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
		enterRule(_localctx, 156, RULE_literalKvp);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(933);
			literal();
			setState(934);
			match(COLON);
			setState(935);
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
	public static class UnaryOpContext extends ParserRuleContext {
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
		enterRule(_localctx, 158, RULE_unaryOp);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(937);
			_la = _input.LA(1);
			if ( !(_la==NOT || _la==MINUS) ) {
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
		enterRule(_localctx, 160, RULE_binaryOp);
		try {
			setState(942);
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
				setState(939);
				arithmeticOp();
				}
				break;
			case AND:
			case OR:
			case XOR:
				enterOuterAlt(_localctx, 2);
				{
				setState(940);
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
				setState(941);
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
		enterRule(_localctx, 162, RULE_arithmeticOp);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(944);
			_la = _input.LA(1);
			if ( !(_la==DIV || _la==MOD || ((((_la - 83)) & ~0x3f) == 0 && ((1L << (_la - 83)) & 31L) != 0)) ) {
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
		enterRule(_localctx, 164, RULE_logicalOp);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(946);
			_la = _input.LA(1);
			if ( !(((((_la - 5)) & ~0x3f) == 0 && ((1L << (_la - 5)) & 576460786663161857L) != 0)) ) {
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
		enterRule(_localctx, 166, RULE_conditionalOp);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(948);
			_la = _input.LA(1);
			if ( !(((((_la - 39)) & ~0x3f) == 0 && ((1L << (_la - 39)) & 17451448556060673L) != 0)) ) {
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
		enterRule(_localctx, 168, RULE_type);
		try {
			setState(957);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,77,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(950);
				match(VALUE_TYPE);
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(951);
				dataStructureType();
				}
				break;
			case 3:
				enterOuterAlt(_localctx, 3);
				{
				setState(952);
				match(TYPENAME);
				}
				break;
			case 4:
				enterOuterAlt(_localctx, 4);
				{
				setState(953);
				match(TYPENAME);
				setState(954);
				genericSpecifier();
				}
				break;
			case 5:
				enterOuterAlt(_localctx, 5);
				{
				setState(955);
				tupleType();
				}
				break;
			case 6:
				enterOuterAlt(_localctx, 6);
				{
				setState(956);
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
		enterRule(_localctx, 170, RULE_dataStructureType);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(959);
			_la = _input.LA(1);
			if ( !(((((_la - 67)) & ~0x3f) == 0 && ((1L << (_la - 67)) & 15L) != 0)) ) {
			_errHandler.recoverInline(this);
			}
			else {
				if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
				_errHandler.reportMatch(this);
				consume();
			}
			setState(960);
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
		enterRule(_localctx, 172, RULE_genericSpecifier);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(962);
			match(LT);
			setState(963);
			match(OF);
			setState(964);
			type();
			setState(969);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==COMMA) {
				{
				{
				setState(965);
				match(COMMA);
				setState(966);
				type();
				}
				}
				setState(971);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			setState(972);
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
		enterRule(_localctx, 174, RULE_tupleType);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(974);
			match(OPEN_BRACKET);
			setState(975);
			type();
			setState(978); 
			_errHandler.sync(this);
			_la = _input.LA(1);
			do {
				{
				{
				setState(976);
				match(COMMA);
				setState(977);
				type();
				}
				}
				setState(980); 
				_errHandler.sync(this);
				_la = _input.LA(1);
			} while ( _la==COMMA );
			setState(982);
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
		enterRule(_localctx, 176, RULE_typeList);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(984);
			type();
			setState(989);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==COMMA) {
				{
				{
				setState(985);
				match(COMMA);
				setState(986);
				type();
				}
				}
				setState(991);
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
		enterRule(_localctx, 178, RULE_funcType);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(992);
			match(OPEN_BRACKET);
			setState(993);
			typeList();
			setState(994);
			match(ARROW);
			setState(995);
			type();
			setState(996);
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

	public boolean sempred(RuleContext _localctx, int ruleIndex, int predIndex) {
		switch (ruleIndex) {
		case 55:
			return expression_sempred((ExpressionContext)_localctx, predIndex);
		}
		return true;
	}
	private boolean expression_sempred(ExpressionContext _localctx, int predIndex) {
		switch (predIndex) {
		case 0:
			return precpred(_ctx, 8);
		case 1:
			return precpred(_ctx, 7);
		case 2:
			return precpred(_ctx, 12);
		case 3:
			return precpred(_ctx, 11);
		case 4:
			return precpred(_ctx, 10);
		case 5:
			return precpred(_ctx, 5);
		case 6:
			return precpred(_ctx, 4);
		}
		return true;
	}

	public static final String _serializedATN =
		"\u0004\u0001e\u03e7\u0002\u0000\u0007\u0000\u0002\u0001\u0007\u0001\u0002"+
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
		"U\u0007U\u0002V\u0007V\u0002W\u0007W\u0002X\u0007X\u0002Y\u0007Y\u0001"+
		"\u0000\u0001\u0000\u0001\u0000\u0001\u0000\u0001\u0000\u0001\u0000\u0001"+
		"\u0000\u0001\u0000\u0005\u0000\u00bd\b\u0000\n\u0000\f\u0000\u00c0\t\u0000"+
		"\u0001\u0000\u0005\u0000\u00c3\b\u0000\n\u0000\f\u0000\u00c6\t\u0000\u0001"+
		"\u0000\u0001\u0000\u0001\u0001\u0001\u0001\u0001\u0001\u0001\u0002\u0001"+
		"\u0002\u0001\u0002\u0005\u0002\u00d0\b\u0002\n\u0002\f\u0002\u00d3\t\u0002"+
		"\u0001\u0003\u0001\u0003\u0001\u0003\u0001\u0003\u0001\u0003\u0001\u0003"+
		"\u0001\u0003\u0001\u0004\u0001\u0004\u0001\u0004\u0001\u0004\u0005\u0004"+
		"\u00e0\b\u0004\n\u0004\f\u0004\u00e3\t\u0004\u0001\u0004\u0001\u0004\u0001"+
		"\u0004\u0001\u0004\u0001\u0005\u0001\u0005\u0001\u0005\u0001\u0005\u0001"+
		"\u0005\u0001\u0005\u0005\u0005\u00ef\b\u0005\n\u0005\f\u0005\u00f2\t\u0005"+
		"\u0001\u0006\u0001\u0006\u0001\u0006\u0003\u0006\u00f7\b\u0006\u0001\u0007"+
		"\u0001\u0007\u0001\u0007\u0001\u0007\u0001\u0007\u0001\b\u0001\b\u0001"+
		"\b\u0001\b\u0001\b\u0001\b\u0001\b\u0003\b\u0105\b\b\u0001\t\u0001\t\u0001"+
		"\t\u0001\t\u0001\n\u0001\n\u0001\n\u0003\n\u010e\b\n\u0001\u000b\u0001"+
		"\u000b\u0001\u000b\u0001\u000b\u0001\u000b\u0001\u000b\u0001\u000b\u0001"+
		"\f\u0001\f\u0001\f\u0001\f\u0001\f\u0001\f\u0001\r\u0001\r\u0001\r\u0001"+
		"\r\u0001\r\u0001\u000e\u0003\u000e\u0123\b\u000e\u0001\u000e\u0001\u000e"+
		"\u0003\u000e\u0127\b\u000e\u0001\u000e\u0001\u000e\u0003\u000e\u012b\b"+
		"\u000e\u0001\u000f\u0003\u000f\u012e\b\u000f\u0001\u000f\u0001\u000f\u0001"+
		"\u000f\u0003\u000f\u0133\b\u000f\u0001\u000f\u0001\u000f\u0001\u0010\u0003"+
		"\u0010\u0138\b\u0010\u0001\u0010\u0001\u0010\u0001\u0010\u0003\u0010\u013d"+
		"\b\u0010\u0001\u0010\u0001\u0010\u0001\u0011\u0001\u0011\u0001\u0011\u0001"+
		"\u0011\u0001\u0011\u0003\u0011\u0146\b\u0011\u0001\u0011\u0001\u0011\u0001"+
		"\u0012\u0001\u0012\u0003\u0012\u014c\b\u0012\u0001\u0013\u0001\u0013\u0003"+
		"\u0013\u0150\b\u0013\u0001\u0014\u0001\u0014\u0001\u0014\u0005\u0014\u0155"+
		"\b\u0014\n\u0014\f\u0014\u0158\t\u0014\u0001\u0015\u0001\u0015\u0001\u0015"+
		"\u0001\u0015\u0001\u0015\u0001\u0015\u0001\u0015\u0001\u0015\u0001\u0016"+
		"\u0001\u0016\u0001\u0016\u0003\u0016\u0165\b\u0016\u0001\u0016\u0001\u0016"+
		"\u0001\u0017\u0001\u0017\u0001\u0017\u0005\u0017\u016c\b\u0017\n\u0017"+
		"\f\u0017\u016f\t\u0017\u0001\u0018\u0001\u0018\u0001\u0018\u0005\u0018"+
		"\u0174\b\u0018\n\u0018\f\u0018\u0177\t\u0018\u0001\u0019\u0001\u0019\u0001"+
		"\u0019\u0001\u001a\u0003\u001a\u017d\b\u001a\u0001\u001a\u0001\u001a\u0001"+
		"\u001a\u0001\u001b\u0001\u001b\u0003\u001b\u0184\b\u001b\u0001\u001c\u0001"+
		"\u001c\u0001\u001c\u0001\u001c\u0001\u001c\u0001\u001c\u0001\u001c\u0001"+
		"\u001c\u0001\u001c\u0001\u001c\u0001\u001c\u0001\u001d\u0001\u001d\u0001"+
		"\u001d\u0001\u001d\u0001\u001d\u0001\u001d\u0001\u001e\u0001\u001e\u0001"+
		"\u001e\u0003\u001e\u019a\b\u001e\u0001\u001e\u0001\u001e\u0001\u001e\u0001"+
		"\u001e\u0001\u001f\u0001\u001f\u0001\u001f\u0001\u001f\u0001\u001f\u0001"+
		"\u001f\u0001\u001f\u0003\u001f\u01a7\b\u001f\u0001 \u0001 \u0001 \u0001"+
		" \u0001 \u0001 \u0001 \u0005 \u01b0\b \n \f \u01b3\t \u0001 \u0001 \u0001"+
		" \u0001 \u0001!\u0001!\u0001\"\u0001\"\u0001\"\u0001\"\u0001#\u0001#\u0001"+
		"#\u0001#\u0003#\u01c3\b#\u0001$\u0001$\u0001$\u0001$\u0003$\u01c9\b$\u0001"+
		"$\u0001$\u0001$\u0001$\u0001$\u0005$\u01d0\b$\n$\f$\u01d3\t$\u0001$\u0001"+
		"$\u0001$\u0001$\u0001%\u0001%\u0001%\u0001%\u0001%\u0003%\u01de\b%\u0001"+
		"%\u0001%\u0001%\u0001%\u0001%\u0001%\u0001%\u0001%\u0001%\u0001%\u0001"+
		"%\u0005%\u01eb\b%\n%\f%\u01ee\t%\u0001%\u0001%\u0001%\u0001%\u0001&\u0001"+
		"&\u0001&\u0001&\u0001&\u0003&\u01f9\b&\u0001&\u0001&\u0001&\u0001&\u0005"+
		"&\u01ff\b&\n&\f&\u0202\t&\u0001&\u0001&\u0001&\u0001&\u0001\'\u0001\'"+
		"\u0001\'\u0001\'\u0001\'\u0001\'\u0003\'\u020e\b\'\u0001\'\u0001\'\u0001"+
		"\'\u0001\'\u0001\'\u0001\'\u0001\'\u0005\'\u0217\b\'\n\'\f\'\u021a\t\'"+
		"\u0001\'\u0001\'\u0001\'\u0001\'\u0001(\u0001(\u0001(\u0001(\u0005(\u0224"+
		"\b(\n(\f(\u0227\t(\u0001)\u0003)\u022a\b)\u0001)\u0001)\u0001)\u0001)"+
		"\u0001*\u0001*\u0001*\u0001*\u0003*\u0234\b*\u0001*\u0001*\u0001*\u0001"+
		"*\u0001*\u0001*\u0001+\u0001+\u0001+\u0001+\u0003+\u0240\b+\u0001+\u0001"+
		"+\u0003+\u0244\b+\u0001+\u0001+\u0003+\u0248\b+\u0001,\u0001,\u0001,\u0001"+
		",\u0001,\u0005,\u024f\b,\n,\f,\u0252\t,\u0001,\u0001,\u0001-\u0001-\u0001"+
		"-\u0001-\u0001-\u0001-\u0001-\u0003-\u025d\b-\u0001.\u0001.\u0001.\u0001"+
		".\u0001.\u0001.\u0001.\u0001.\u0001.\u0001.\u0001.\u0001.\u0005.\u026b"+
		"\b.\n.\f.\u026e\t.\u0001.\u0001.\u0001.\u0003.\u0273\b.\u0001.\u0001."+
		"\u0001.\u0001.\u0001/\u0001/\u0001/\u0001/\u0001/\u0001/\u0001/\u0001"+
		"/\u0001/\u0003/\u0282\b/\u0001/\u0003/\u0285\b/\u0001/\u0001/\u0001/\u0001"+
		"/\u0001/\u00010\u00010\u00010\u00010\u00010\u00010\u00010\u00010\u0001"+
		"0\u00010\u00011\u00011\u00011\u00011\u00011\u00011\u00011\u00011\u0001"+
		"2\u00012\u00012\u00012\u00012\u00012\u00012\u00012\u00012\u00013\u0001"+
		"3\u00013\u00013\u00013\u00013\u00013\u00013\u00013\u00013\u00013\u0001"+
		"4\u00014\u00014\u00014\u00044\u02b6\b4\u000b4\f4\u02b7\u00014\u00014\u0001"+
		"4\u00014\u00014\u00015\u00015\u00015\u00035\u02c2\b5\u00015\u00015\u0001"+
		"5\u00016\u00016\u00016\u00016\u00017\u00017\u00017\u00017\u00017\u0001"+
		"7\u00017\u00017\u00017\u00017\u00017\u00017\u00037\u02d7\b7\u00017\u0001"+
		"7\u00017\u00017\u00017\u00017\u00017\u00017\u00017\u00017\u00017\u0001"+
		"7\u00017\u00017\u00017\u00017\u00017\u00017\u00017\u00017\u00017\u0005"+
		"7\u02ee\b7\n7\f7\u02f1\t7\u00018\u00018\u00018\u00018\u00019\u00019\u0001"+
		"9\u0001:\u0001:\u0001:\u0001;\u0001;\u0001;\u0001;\u0001;\u0001<\u0001"+
		"<\u0001<\u0001<\u0001<\u0001<\u0001<\u0003<\u0309\b<\u0001<\u0001<\u0001"+
		"=\u0001=\u0001=\u0001=\u0001=\u0001=\u0001=\u0001=\u0001=\u0003=\u0316"+
		"\b=\u0001>\u0001>\u0003>\u031a\b>\u0001>\u0001>\u0001>\u0001>\u0001>\u0003"+
		">\u0321\b>\u0001?\u0001?\u0001?\u0001?\u0001?\u0001?\u0003?\u0329\b?\u0001"+
		"?\u0001?\u0001@\u0001@\u0003@\u032f\b@\u0001A\u0001A\u0001A\u0001A\u0001"+
		"A\u0003A\u0336\bA\u0001B\u0001B\u0001B\u0001B\u0003B\u033c\bB\u0001C\u0001"+
		"C\u0001C\u0001C\u0003C\u0342\bC\u0001D\u0001D\u0001D\u0001D\u0001D\u0001"+
		"D\u0005D\u034a\bD\nD\fD\u034d\tD\u0001D\u0001D\u0001E\u0001E\u0001E\u0001"+
		"E\u0001E\u0001E\u0005E\u0357\bE\nE\fE\u035a\tE\u0001E\u0001E\u0001F\u0001"+
		"F\u0001F\u0001F\u0004F\u0362\bF\u000bF\fF\u0363\u0001F\u0001F\u0001G\u0001"+
		"G\u0001G\u0001G\u0005G\u036c\bG\nG\fG\u036f\tG\u0001G\u0001G\u0001H\u0001"+
		"H\u0001H\u0001H\u0005H\u0377\bH\nH\fH\u037a\tH\u0001H\u0001H\u0001I\u0001"+
		"I\u0001I\u0001I\u0001I\u0001I\u0001J\u0001J\u0001J\u0001J\u0003J\u0388"+
		"\bJ\u0001J\u0001J\u0001K\u0001K\u0001K\u0001K\u0005K\u0390\bK\nK\fK\u0393"+
		"\tK\u0001K\u0001K\u0001L\u0001L\u0001L\u0001L\u0005L\u039b\bL\nL\fL\u039e"+
		"\tL\u0001L\u0001L\u0001M\u0001M\u0001M\u0001M\u0001N\u0001N\u0001N\u0001"+
		"N\u0001O\u0001O\u0001P\u0001P\u0001P\u0003P\u03af\bP\u0001Q\u0001Q\u0001"+
		"R\u0001R\u0001S\u0001S\u0001T\u0001T\u0001T\u0001T\u0001T\u0001T\u0001"+
		"T\u0003T\u03be\bT\u0001U\u0001U\u0001U\u0001V\u0001V\u0001V\u0001V\u0001"+
		"V\u0005V\u03c8\bV\nV\fV\u03cb\tV\u0001V\u0001V\u0001W\u0001W\u0001W\u0001"+
		"W\u0004W\u03d3\bW\u000bW\fW\u03d4\u0001W\u0001W\u0001X\u0001X\u0001X\u0005"+
		"X\u03dc\bX\nX\fX\u03df\tX\u0001Y\u0001Y\u0001Y\u0001Y\u0001Y\u0001Y\u0001"+
		"Y\u0000\u0001nZ\u0000\u0002\u0004\u0006\b\n\f\u000e\u0010\u0012\u0014"+
		"\u0016\u0018\u001a\u001c\u001e \"$&(*,.02468:<>@BDFHJLNPRTVXZ\\^`bdfh"+
		"jlnprtvxz|~\u0080\u0082\u0084\u0086\u0088\u008a\u008c\u008e\u0090\u0092"+
		"\u0094\u0096\u0098\u009a\u009c\u009e\u00a0\u00a2\u00a4\u00a6\u00a8\u00aa"+
		"\u00ac\u00ae\u00b0\u00b2\u0000\u0007\u0001\u0000]^\u0002\u0000^^bb\u0002"+
		"\u0000%%TT\u0003\u0000\u0010\u0010##SW\u0003\u0000\u0005\u0005((@@\u0002"+
		"\u0000\'\'X\\\u0001\u0000CF\u0410\u0000\u00be\u0001\u0000\u0000\u0000"+
		"\u0002\u00c9\u0001\u0000\u0000\u0000\u0004\u00cc\u0001\u0000\u0000\u0000"+
		"\u0006\u00d4\u0001\u0000\u0000\u0000\b\u00db\u0001\u0000\u0000\u0000\n"+
		"\u00f0\u0001\u0000\u0000\u0000\f\u00f6\u0001\u0000\u0000\u0000\u000e\u00f8"+
		"\u0001\u0000\u0000\u0000\u0010\u00fd\u0001\u0000\u0000\u0000\u0012\u0106"+
		"\u0001\u0000\u0000\u0000\u0014\u010a\u0001\u0000\u0000\u0000\u0016\u010f"+
		"\u0001\u0000\u0000\u0000\u0018\u0116\u0001\u0000\u0000\u0000\u001a\u011c"+
		"\u0001\u0000\u0000\u0000\u001c\u012a\u0001\u0000\u0000\u0000\u001e\u012d"+
		"\u0001\u0000\u0000\u0000 \u0137\u0001\u0000\u0000\u0000\"\u0140\u0001"+
		"\u0000\u0000\u0000$\u0149\u0001\u0000\u0000\u0000&\u014f\u0001\u0000\u0000"+
		"\u0000(\u0151\u0001\u0000\u0000\u0000*\u0159\u0001\u0000\u0000\u0000,"+
		"\u0161\u0001\u0000\u0000\u0000.\u0168\u0001\u0000\u0000\u00000\u0170\u0001"+
		"\u0000\u0000\u00002\u0178\u0001\u0000\u0000\u00004\u017c\u0001\u0000\u0000"+
		"\u00006\u0183\u0001\u0000\u0000\u00008\u0185\u0001\u0000\u0000\u0000:"+
		"\u0190\u0001\u0000\u0000\u0000<\u0196\u0001\u0000\u0000\u0000>\u019f\u0001"+
		"\u0000\u0000\u0000@\u01a8\u0001\u0000\u0000\u0000B\u01b8\u0001\u0000\u0000"+
		"\u0000D\u01ba\u0001\u0000\u0000\u0000F\u01c2\u0001\u0000\u0000\u0000H"+
		"\u01c4\u0001\u0000\u0000\u0000J\u01d8\u0001\u0000\u0000\u0000L\u01f3\u0001"+
		"\u0000\u0000\u0000N\u0207\u0001\u0000\u0000\u0000P\u021f\u0001\u0000\u0000"+
		"\u0000R\u0229\u0001\u0000\u0000\u0000T\u022f\u0001\u0000\u0000\u0000V"+
		"\u0247\u0001\u0000\u0000\u0000X\u0249\u0001\u0000\u0000\u0000Z\u025c\u0001"+
		"\u0000\u0000\u0000\\\u025e\u0001\u0000\u0000\u0000^\u0278\u0001\u0000"+
		"\u0000\u0000`\u028b\u0001\u0000\u0000\u0000b\u0295\u0001\u0000\u0000\u0000"+
		"d\u029d\u0001\u0000\u0000\u0000f\u02a6\u0001\u0000\u0000\u0000h\u02b1"+
		"\u0001\u0000\u0000\u0000j\u02be\u0001\u0000\u0000\u0000l\u02c6\u0001\u0000"+
		"\u0000\u0000n\u02d6\u0001\u0000\u0000\u0000p\u02f2\u0001\u0000\u0000\u0000"+
		"r\u02f6\u0001\u0000\u0000\u0000t\u02f9\u0001\u0000\u0000\u0000v\u02fc"+
		"\u0001\u0000\u0000\u0000x\u0301\u0001\u0000\u0000\u0000z\u0315\u0001\u0000"+
		"\u0000\u0000|\u0320\u0001\u0000\u0000\u0000~\u0328\u0001\u0000\u0000\u0000"+
		"\u0080\u032e\u0001\u0000\u0000\u0000\u0082\u0335\u0001\u0000\u0000\u0000"+
		"\u0084\u033b\u0001\u0000\u0000\u0000\u0086\u0341\u0001\u0000\u0000\u0000"+
		"\u0088\u0343\u0001\u0000\u0000\u0000\u008a\u0350\u0001\u0000\u0000\u0000"+
		"\u008c\u035d\u0001\u0000\u0000\u0000\u008e\u0367\u0001\u0000\u0000\u0000"+
		"\u0090\u0372\u0001\u0000\u0000\u0000\u0092\u037d\u0001\u0000\u0000\u0000"+
		"\u0094\u0383\u0001\u0000\u0000\u0000\u0096\u038b\u0001\u0000\u0000\u0000"+
		"\u0098\u0396\u0001\u0000\u0000\u0000\u009a\u03a1\u0001\u0000\u0000\u0000"+
		"\u009c\u03a5\u0001\u0000\u0000\u0000\u009e\u03a9\u0001\u0000\u0000\u0000"+
		"\u00a0\u03ae\u0001\u0000\u0000\u0000\u00a2\u03b0\u0001\u0000\u0000\u0000"+
		"\u00a4\u03b2\u0001\u0000\u0000\u0000\u00a6\u03b4\u0001\u0000\u0000\u0000"+
		"\u00a8\u03bd\u0001\u0000\u0000\u0000\u00aa\u03bf\u0001\u0000\u0000\u0000"+
		"\u00ac\u03c2\u0001\u0000\u0000\u0000\u00ae\u03ce\u0001\u0000\u0000\u0000"+
		"\u00b0\u03d8\u0001\u0000\u0000\u0000\u00b2\u03e0\u0001\u0000\u0000\u0000"+
		"\u00b4\u00bd\u0003\u0006\u0003\u0000\u00b5\u00bd\u0003*\u0015\u0000\u00b6"+
		"\u00bd\u00036\u001b\u0000\u00b7\u00bd\u0003>\u001f\u0000\u00b8\u00bd\u0003"+
		"@ \u0000\u00b9\u00bd\u0003F#\u0000\u00ba\u00bd\u0003\b\u0004\u0000\u00bb"+
		"\u00bd\u0003\u0002\u0001\u0000\u00bc\u00b4\u0001\u0000\u0000\u0000\u00bc"+
		"\u00b5\u0001\u0000\u0000\u0000\u00bc\u00b6\u0001\u0000\u0000\u0000\u00bc"+
		"\u00b7\u0001\u0000\u0000\u0000\u00bc\u00b8\u0001\u0000\u0000\u0000\u00bc"+
		"\u00b9\u0001\u0000\u0000\u0000\u00bc\u00ba\u0001\u0000\u0000\u0000\u00bc"+
		"\u00bb\u0001\u0000\u0000\u0000\u00bd\u00c0\u0001\u0000\u0000\u0000\u00be"+
		"\u00bc\u0001\u0000\u0000\u0000\u00be\u00bf\u0001\u0000\u0000\u0000\u00bf"+
		"\u00c4\u0001\u0000\u0000\u0000\u00c0\u00be\u0001\u0000\u0000\u0000\u00c1"+
		"\u00c3\u0005\u0001\u0000\u0000\u00c2\u00c1\u0001\u0000\u0000\u0000\u00c3"+
		"\u00c6\u0001\u0000\u0000\u0000\u00c4\u00c2\u0001\u0000\u0000\u0000\u00c4"+
		"\u00c5\u0001\u0000\u0000\u0000\u00c5\u00c7\u0001\u0000\u0000\u0000\u00c6"+
		"\u00c4\u0001\u0000\u0000\u0000\u00c7\u00c8\u0005\u0000\u0000\u0001\u00c8"+
		"\u0001\u0001\u0000\u0000\u0000\u00c9\u00ca\u0005\u001b\u0000\u0000\u00ca"+
		"\u00cb\u0003\u0004\u0002\u0000\u00cb\u0003\u0001\u0000\u0000\u0000\u00cc"+
		"\u00d1\u0007\u0000\u0000\u0000\u00cd\u00ce\u0005P\u0000\u0000\u00ce\u00d0"+
		"\u0007\u0000\u0000\u0000\u00cf\u00cd\u0001\u0000\u0000\u0000\u00d0\u00d3"+
		"\u0001\u0000\u0000\u0000\u00d1\u00cf\u0001\u0000\u0000\u0000\u00d1\u00d2"+
		"\u0001\u0000\u0000\u0000\u00d2\u0005\u0001\u0000\u0000\u0000\u00d3\u00d1"+
		"\u0001\u0000\u0000\u0000\u00d4\u00d5\u0005\u0001\u0000\u0000\u00d5\u00d6"+
		"\u0005\"\u0000\u0000\u00d6\u00d7\u0003\n\u0005\u0000\u00d7\u00d8\u0005"+
		"\u0001\u0000\u0000\u00d8\u00d9\u0005\u0013\u0000\u0000\u00d9\u00da\u0005"+
		"\"\u0000\u0000\u00da\u0007\u0001\u0000\u0000\u0000\u00db\u00dc\u0005\u0001"+
		"\u0000\u0000\u00dc\u00dd\u00056\u0000\u0000\u00dd\u00e1\u0005^\u0000\u0000"+
		"\u00de\u00e0\u0003\f\u0006\u0000\u00df\u00de\u0001\u0000\u0000\u0000\u00e0"+
		"\u00e3\u0001\u0000\u0000\u0000\u00e1\u00df\u0001\u0000\u0000\u0000\u00e1"+
		"\u00e2\u0001\u0000\u0000\u0000\u00e2\u00e4\u0001\u0000\u0000\u0000\u00e3"+
		"\u00e1\u0001\u0000\u0000\u0000\u00e4\u00e5\u0005\u0001\u0000\u0000\u00e5"+
		"\u00e6\u0005\u0013\u0000\u0000\u00e6\u00e7\u00056\u0000\u0000\u00e7\t"+
		"\u0001\u0000\u0000\u0000\u00e8\u00ef\u0003\u0016\u000b\u0000\u00e9\u00ef"+
		"\u0003\u0018\f\u0000\u00ea\u00ef\u0003Z-\u0000\u00eb\u00ef\u0003\u0010"+
		"\b\u0000\u00ec\u00ef\u0003\u0012\t\u0000\u00ed\u00ef\u0003\u0014\n\u0000"+
		"\u00ee\u00e8\u0001\u0000\u0000\u0000\u00ee\u00e9\u0001\u0000\u0000\u0000"+
		"\u00ee\u00ea\u0001\u0000\u0000\u0000\u00ee\u00eb\u0001\u0000\u0000\u0000"+
		"\u00ee\u00ec\u0001\u0000\u0000\u0000\u00ee\u00ed\u0001\u0000\u0000\u0000"+
		"\u00ef\u00f2\u0001\u0000\u0000\u0000\u00f0\u00ee\u0001\u0000\u0000\u0000"+
		"\u00f0\u00f1\u0001\u0000\u0000\u0000\u00f1\u000b\u0001\u0000\u0000\u0000"+
		"\u00f2\u00f0\u0001\u0000\u0000\u0000\u00f3\u00f7\u0003\u000e\u0007\u0000"+
		"\u00f4\u00f7\u0003\u0016\u000b\u0000\u00f5\u00f7\u0003\u0010\b\u0000\u00f6"+
		"\u00f3\u0001\u0000\u0000\u0000\u00f6\u00f4\u0001\u0000\u0000\u0000\u00f6"+
		"\u00f5\u0001\u0000\u0000\u0000\u00f7\r\u0001\u0000\u0000\u0000\u00f8\u00f9"+
		"\u0005\u0007\u0000\u0000\u00f9\u00fa\u0003n7\u0000\u00fa\u00fb\u0005\'"+
		"\u0000\u0000\u00fb\u00fc\u0003|>\u0000\u00fc\u000f\u0001\u0000\u0000\u0000"+
		"\u00fd\u00fe\u0005\u0001\u0000\u0000\u00fe\u0104\u0005\b\u0000\u0000\u00ff"+
		"\u0105\u0003\u001e\u000f\u0000\u0100\u0101\u0003\u001c\u000e\u0000\u0101"+
		"\u0102\u0005P\u0000\u0000\u0102\u0103\u0003\u001e\u000f\u0000\u0103\u0105"+
		"\u0001\u0000\u0000\u0000\u0104\u00ff\u0001\u0000\u0000\u0000\u0104\u0100"+
		"\u0001\u0000\u0000\u0000\u0105\u0011\u0001\u0000\u0000\u0000\u0106\u0107"+
		"\u0005\u0001\u0000\u0000\u0107\u0108\u00059\u0000\u0000\u0108\u0109\u0007"+
		"\u0001\u0000\u0000\u0109\u0013\u0001\u0000\u0000\u0000\u010a\u010b\u0005"+
		"\u0001\u0000\u0000\u010b\u010d\u0005,\u0000\u0000\u010c\u010e\u0003n7"+
		"\u0000\u010d\u010c\u0001\u0000\u0000\u0000\u010d\u010e\u0001\u0000\u0000"+
		"\u0000\u010e\u0015\u0001\u0000\u0000\u0000\u010f\u0110\u0005\u0001\u0000"+
		"\u0000\u0110\u0111\u0005<\u0000\u0000\u0111\u0112\u0003\u001c\u000e\u0000"+
		"\u0112\u0113\u00052\u0000\u0000\u0113\u0114\u0005:\u0000\u0000\u0114\u0115"+
		"\u0003n7\u0000\u0115\u0017\u0001\u0000\u0000\u0000\u0116\u0117\u0005\u0001"+
		"\u0000\u0000\u0117\u0118\u00052\u0000\u0000\u0118\u0119\u0003\u001c\u000e"+
		"\u0000\u0119\u011a\u0005:\u0000\u0000\u011a\u011b\u0003n7\u0000\u011b"+
		"\u0019\u0001\u0000\u0000\u0000\u011c\u011d\u0003\u001c\u000e\u0000\u011d"+
		"\u011e\u00052\u0000\u0000\u011e\u011f\u0005:\u0000\u0000\u011f\u0120\u0003"+
		"n7\u0000\u0120\u001b\u0001\u0000\u0000\u0000\u0121\u0123\u0003~?\u0000"+
		"\u0122\u0121\u0001\u0000\u0000\u0000\u0122\u0123\u0001\u0000\u0000\u0000"+
		"\u0123\u0124\u0001\u0000\u0000\u0000\u0124\u0126\u0005^\u0000\u0000\u0125"+
		"\u0127\u0003x<\u0000\u0126\u0125\u0001\u0000\u0000\u0000\u0126\u0127\u0001"+
		"\u0000\u0000\u0000\u0127\u012b\u0001\u0000\u0000\u0000\u0128\u012b\u0003"+
		"\u008cF\u0000\u0129\u012b\u0003\u0092I\u0000\u012a\u0122\u0001\u0000\u0000"+
		"\u0000\u012a\u0128\u0001\u0000\u0000\u0000\u012a\u0129\u0001\u0000\u0000"+
		"\u0000\u012b\u001d\u0001\u0000\u0000\u0000\u012c\u012e\u0003~?\u0000\u012d"+
		"\u012c\u0001\u0000\u0000\u0000\u012d\u012e\u0001\u0000\u0000\u0000\u012e"+
		"\u012f\u0001\u0000\u0000\u0000\u012f\u0130\u0005^\u0000\u0000\u0130\u0132"+
		"\u0005M\u0000\u0000\u0131\u0133\u0003(\u0014\u0000\u0132\u0131\u0001\u0000"+
		"\u0000\u0000\u0132\u0133\u0001\u0000\u0000\u0000\u0133\u0134\u0001\u0000"+
		"\u0000\u0000\u0134\u0135\u0005N\u0000\u0000\u0135\u001f\u0001\u0000\u0000"+
		"\u0000\u0136\u0138\u0003~?\u0000\u0137\u0136\u0001\u0000\u0000\u0000\u0137"+
		"\u0138\u0001\u0000\u0000\u0000\u0138\u0139\u0001\u0000\u0000\u0000\u0139"+
		"\u013a\u0005^\u0000\u0000\u013a\u013c\u0005M\u0000\u0000\u013b\u013d\u0003"+
		"(\u0014\u0000\u013c\u013b\u0001\u0000\u0000\u0000\u013c\u013d\u0001\u0000"+
		"\u0000\u0000\u013d\u013e\u0001\u0000\u0000\u0000\u013e\u013f\u0005N\u0000"+
		"\u0000\u013f!\u0001\u0000\u0000\u0000\u0140\u0141\u00055\u0000\u0000\u0141"+
		"\u0142\u0005P\u0000\u0000\u0142\u0143\u0005^\u0000\u0000\u0143\u0145\u0005"+
		"M\u0000\u0000\u0144\u0146\u0003(\u0014\u0000\u0145\u0144\u0001\u0000\u0000"+
		"\u0000\u0145\u0146\u0001\u0000\u0000\u0000\u0146\u0147\u0001\u0000\u0000"+
		"\u0000\u0147\u0148\u0005N\u0000\u0000\u0148#\u0001\u0000\u0000\u0000\u0149"+
		"\u014b\u0005\u001e\u0000\u0000\u014a\u014c\u0005b\u0000\u0000\u014b\u014a"+
		"\u0001\u0000\u0000\u0000\u014b\u014c\u0001\u0000\u0000\u0000\u014c%\u0001"+
		"\u0000\u0000\u0000\u014d\u0150\u0003n7\u0000\u014e\u0150\u0003v;\u0000"+
		"\u014f\u014d\u0001\u0000\u0000\u0000\u014f\u014e\u0001\u0000\u0000\u0000"+
		"\u0150\'\u0001\u0000\u0000\u0000\u0151\u0156\u0003&\u0013\u0000\u0152"+
		"\u0153\u0005Q\u0000\u0000\u0153\u0155\u0003&\u0013\u0000\u0154\u0152\u0001"+
		"\u0000\u0000\u0000\u0155\u0158\u0001\u0000\u0000\u0000\u0156\u0154\u0001"+
		"\u0000\u0000\u0000\u0156\u0157\u0001\u0000\u0000\u0000\u0157)\u0001\u0000"+
		"\u0000\u0000\u0158\u0156\u0001\u0000\u0000\u0000\u0159\u015a\u0005\u0001"+
		"\u0000\u0000\u015a\u015b\u0005.\u0000\u0000\u015b\u015c\u0003,\u0016\u0000"+
		"\u015c\u015d\u0003\n\u0005\u0000\u015d\u015e\u0005\u0001\u0000\u0000\u015e"+
		"\u015f\u0005\u0013\u0000\u0000\u015f\u0160\u0005.\u0000\u0000\u0160+\u0001"+
		"\u0000\u0000\u0000\u0161\u0162\u0005^\u0000\u0000\u0162\u0164\u0005M\u0000"+
		"\u0000\u0163\u0165\u0003.\u0017\u0000\u0164\u0163\u0001\u0000\u0000\u0000"+
		"\u0164\u0165\u0001\u0000\u0000\u0000\u0165\u0166\u0001\u0000\u0000\u0000"+
		"\u0166\u0167\u0005N\u0000\u0000\u0167-\u0001\u0000\u0000\u0000\u0168\u016d"+
		"\u00034\u001a\u0000\u0169\u016a\u0005Q\u0000\u0000\u016a\u016c\u00034"+
		"\u001a\u0000\u016b\u0169\u0001\u0000\u0000\u0000\u016c\u016f\u0001\u0000"+
		"\u0000\u0000\u016d\u016b\u0001\u0000\u0000\u0000\u016d\u016e\u0001\u0000"+
		"\u0000\u0000\u016e/\u0001\u0000\u0000\u0000\u016f\u016d\u0001\u0000\u0000"+
		"\u0000\u0170\u0175\u00032\u0019\u0000\u0171\u0172\u0005Q\u0000\u0000\u0172"+
		"\u0174\u00032\u0019\u0000\u0173\u0171\u0001\u0000\u0000\u0000\u0174\u0177"+
		"\u0001\u0000\u0000\u0000\u0175\u0173\u0001\u0000\u0000\u0000\u0175\u0176"+
		"\u0001\u0000\u0000\u0000\u01761\u0001\u0000\u0000\u0000\u0177\u0175\u0001"+
		"\u0000\u0000\u0000\u0178\u0179\u0005^\u0000\u0000\u0179\u017a\u0003\u00a8"+
		"T\u0000\u017a3\u0001\u0000\u0000\u0000\u017b\u017d\u0005)\u0000\u0000"+
		"\u017c\u017b\u0001\u0000\u0000\u0000\u017c\u017d\u0001\u0000\u0000\u0000"+
		"\u017d\u017e\u0001\u0000\u0000\u0000\u017e\u017f\u0005^\u0000\u0000\u017f"+
		"\u0180\u0003\u00a8T\u0000\u01805\u0001\u0000\u0000\u0000\u0181\u0184\u0003"+
		"8\u001c\u0000\u0182\u0184\u0003:\u001d\u0000\u0183\u0181\u0001\u0000\u0000"+
		"\u0000\u0183\u0182\u0001\u0000\u0000\u0000\u01847\u0001\u0000\u0000\u0000"+
		"\u0185\u0186\u0005\u0001\u0000\u0000\u0186\u0187\u0005\u0017\u0000\u0000"+
		"\u0187\u0188\u0003<\u001e\u0000\u0188\u0189\u0003\n\u0005\u0000\u0189"+
		"\u018a\u0005\u0001\u0000\u0000\u018a\u018b\u00051\u0000\u0000\u018b\u018c"+
		"\u0003n7\u0000\u018c\u018d\u0005\u0001\u0000\u0000\u018d\u018e\u0005\u0013"+
		"\u0000\u0000\u018e\u018f\u0005\u0017\u0000\u0000\u018f9\u0001\u0000\u0000"+
		"\u0000\u0190\u0191\u0005\u0001\u0000\u0000\u0191\u0192\u0005\u0017\u0000"+
		"\u0000\u0192\u0193\u0003<\u001e\u0000\u0193\u0194\u0005H\u0000\u0000\u0194"+
		"\u0195\u0003n7\u0000\u0195;\u0001\u0000\u0000\u0000\u0196\u0197\u0005"+
		"^\u0000\u0000\u0197\u0199\u0005M\u0000\u0000\u0198\u019a\u00030\u0018"+
		"\u0000\u0199\u0198\u0001\u0000\u0000\u0000\u0199\u019a\u0001\u0000\u0000"+
		"\u0000\u019a\u019b\u0001\u0000\u0000\u0000\u019b\u019c\u0005N\u0000\u0000"+
		"\u019c\u019d\u0005\u0006\u0000\u0000\u019d\u019e\u0003\u00a8T\u0000\u019e"+
		"=\u0001\u0000\u0000\u0000\u019f\u01a0\u0005\u0001\u0000\u0000\u01a0\u01a1"+
		"\u0005\f\u0000\u0000\u01a1\u01a2\u0005^\u0000\u0000\u01a2\u01a3\u0005"+
		"2\u0000\u0000\u01a3\u01a6\u0005:\u0000\u0000\u01a4\u01a7\u0003\u0080@"+
		"\u0000\u01a5\u01a7\u0003V+\u0000\u01a6\u01a4\u0001\u0000\u0000\u0000\u01a6"+
		"\u01a5\u0001\u0000\u0000\u0000\u01a7?\u0001\u0000\u0000\u0000\u01a8\u01a9"+
		"\u0005\u0001\u0000\u0000\u01a9\u01aa\u0005\u0014\u0000\u0000\u01aa\u01ab"+
		"\u0003B!\u0000\u01ab\u01ac\u0005\u0001\u0000\u0000\u01ac\u01b1\u0005^"+
		"\u0000\u0000\u01ad\u01ae\u0005Q\u0000\u0000\u01ae\u01b0\u0005^\u0000\u0000"+
		"\u01af\u01ad\u0001\u0000\u0000\u0000\u01b0\u01b3\u0001\u0000\u0000\u0000"+
		"\u01b1\u01af\u0001\u0000\u0000\u0000\u01b1\u01b2\u0001\u0000\u0000\u0000"+
		"\u01b2\u01b4\u0001\u0000\u0000\u0000\u01b3\u01b1\u0001\u0000\u0000\u0000"+
		"\u01b4\u01b5\u0005\u0001\u0000\u0000\u01b5\u01b6\u0005\u0013\u0000\u0000"+
		"\u01b6\u01b7\u0005\u0014\u0000\u0000\u01b7A\u0001\u0000\u0000\u0000\u01b8"+
		"\u01b9\u0005]\u0000\u0000\u01b9C\u0001\u0000\u0000\u0000\u01ba\u01bb\u0003"+
		"B!\u0000\u01bb\u01bc\u0005P\u0000\u0000\u01bc\u01bd\u0005^\u0000\u0000"+
		"\u01bdE\u0001\u0000\u0000\u0000\u01be\u01c3\u0003H$\u0000\u01bf\u01c3"+
		"\u0003J%\u0000\u01c0\u01c3\u0003L&\u0000\u01c1\u01c3\u0003N\'\u0000\u01c2"+
		"\u01be\u0001\u0000\u0000\u0000\u01c2\u01bf\u0001\u0000\u0000\u0000\u01c2"+
		"\u01c0\u0001\u0000\u0000\u0000\u01c2\u01c1\u0001\u0000\u0000\u0000\u01c3"+
		"G\u0001\u0000\u0000\u0000\u01c4\u01c5\u0005\u0001\u0000\u0000\u01c5\u01c6"+
		"\u0005\u000b\u0000\u0000\u01c6\u01c8\u0005]\u0000\u0000\u01c7\u01c9\u0003"+
		"P(\u0000\u01c8\u01c7\u0001\u0000\u0000\u0000\u01c8\u01c9\u0001\u0000\u0000"+
		"\u0000\u01c9\u01ca\u0001\u0000\u0000\u0000\u01ca\u01d1\u0003T*\u0000\u01cb"+
		"\u01cc\u0005\u0001\u0000\u0000\u01cc\u01d0\u0003R)\u0000\u01cd\u01d0\u0003"+
		"6\u001b\u0000\u01ce\u01d0\u0003*\u0015\u0000\u01cf\u01cb\u0001\u0000\u0000"+
		"\u0000\u01cf\u01cd\u0001\u0000\u0000\u0000\u01cf\u01ce\u0001\u0000\u0000"+
		"\u0000\u01d0\u01d3\u0001\u0000\u0000\u0000\u01d1\u01cf\u0001\u0000\u0000"+
		"\u0000\u01d1\u01d2\u0001\u0000\u0000\u0000\u01d2\u01d4\u0001\u0000\u0000"+
		"\u0000\u01d3\u01d1\u0001\u0000\u0000\u0000\u01d4\u01d5\u0005\u0001\u0000"+
		"\u0000\u01d5\u01d6\u0005\u0013\u0000\u0000\u01d6\u01d7\u0005\u000b\u0000"+
		"\u0000\u01d7I\u0001\u0000\u0000\u0000\u01d8\u01d9\u0005\u0001\u0000\u0000"+
		"\u01d9\u01da\u0005\u0004\u0000\u0000\u01da\u01db\u0005\u000b\u0000\u0000"+
		"\u01db\u01dd\u0005]\u0000\u0000\u01dc\u01de\u0003P(\u0000\u01dd\u01dc"+
		"\u0001\u0000\u0000\u0000\u01dd\u01de\u0001\u0000\u0000\u0000\u01de\u01ec"+
		"\u0001\u0000\u0000\u0000\u01df\u01e0\u0005\u0001\u0000\u0000\u01e0\u01e1"+
		"\u0005\u0004\u0000\u0000\u01e1\u01eb\u0003R)\u0000\u01e2\u01e3\u0005\u0001"+
		"\u0000\u0000\u01e3\u01e4\u0005\u0004\u0000\u0000\u01e4\u01e5\u0005\u0017"+
		"\u0000\u0000\u01e5\u01eb\u0003<\u001e\u0000\u01e6\u01e7\u0005\u0001\u0000"+
		"\u0000\u01e7\u01e8\u0005\u0004\u0000\u0000\u01e8\u01e9\u0005.\u0000\u0000"+
		"\u01e9\u01eb\u0003,\u0016\u0000\u01ea\u01df\u0001\u0000\u0000\u0000\u01ea"+
		"\u01e2\u0001\u0000\u0000\u0000\u01ea\u01e6\u0001\u0000\u0000\u0000\u01eb"+
		"\u01ee\u0001\u0000\u0000\u0000\u01ec\u01ea\u0001\u0000\u0000\u0000\u01ec"+
		"\u01ed\u0001\u0000\u0000\u0000\u01ed\u01ef\u0001\u0000\u0000\u0000\u01ee"+
		"\u01ec\u0001\u0000\u0000\u0000\u01ef\u01f0\u0005\u0001\u0000\u0000\u01f0"+
		"\u01f1\u0005\u0013\u0000\u0000\u01f1\u01f2\u0005\u000b\u0000\u0000\u01f2"+
		"K\u0001\u0000\u0000\u0000\u01f3\u01f4\u0005\u0001\u0000\u0000\u01f4\u01f5"+
		"\u0005\u001a\u0000\u0000\u01f5\u01f6\u0005\u000b\u0000\u0000\u01f6\u01f8"+
		"\u0005]\u0000\u0000\u01f7\u01f9\u0003P(\u0000\u01f8\u01f7\u0001\u0000"+
		"\u0000\u0000\u01f8\u01f9\u0001\u0000\u0000\u0000\u01f9\u01fa\u0001\u0000"+
		"\u0000\u0000\u01fa\u0200\u0003T*\u0000\u01fb\u01fc\u0005\u0001\u0000\u0000"+
		"\u01fc\u01ff\u0003R)\u0000\u01fd\u01ff\u00036\u001b\u0000\u01fe\u01fb"+
		"\u0001\u0000\u0000\u0000\u01fe\u01fd\u0001\u0000\u0000\u0000\u01ff\u0202"+
		"\u0001\u0000\u0000\u0000\u0200\u01fe\u0001\u0000\u0000\u0000\u0200\u0201"+
		"\u0001\u0000\u0000\u0000\u0201\u0203\u0001\u0000\u0000\u0000\u0202\u0200"+
		"\u0001\u0000\u0000\u0000\u0203\u0204\u0005\u0001\u0000\u0000\u0204\u0205"+
		"\u0005\u0013\u0000\u0000\u0205\u0206\u0005\u000b\u0000\u0000\u0206M\u0001"+
		"\u0000\u0000\u0000\u0207\u0208\u0005\u0001\u0000\u0000\u0208\u0209\u0005"+
		"\u0004\u0000\u0000\u0209\u020a\u0005\u001a\u0000\u0000\u020a\u020b\u0005"+
		"\u000b\u0000\u0000\u020b\u020d\u0005]\u0000\u0000\u020c\u020e\u0003P("+
		"\u0000\u020d\u020c\u0001\u0000\u0000\u0000\u020d\u020e\u0001\u0000\u0000"+
		"\u0000\u020e\u0218\u0001\u0000\u0000\u0000\u020f\u0210\u0005\u0001\u0000"+
		"\u0000\u0210\u0211\u0005\u0004\u0000\u0000\u0211\u0217\u0003R)\u0000\u0212"+
		"\u0213\u0005\u0001\u0000\u0000\u0213\u0214\u0005\u0004\u0000\u0000\u0214"+
		"\u0215\u0005\u0017\u0000\u0000\u0215\u0217\u0003<\u001e\u0000\u0216\u020f"+
		"\u0001\u0000\u0000\u0000\u0216\u0212\u0001\u0000\u0000\u0000\u0217\u021a"+
		"\u0001\u0000\u0000\u0000\u0218\u0216\u0001\u0000\u0000\u0000\u0218\u0219"+
		"\u0001\u0000\u0000\u0000\u0219\u021b\u0001\u0000\u0000\u0000\u021a\u0218"+
		"\u0001\u0000\u0000\u0000\u021b\u021c\u0005\u0001\u0000\u0000\u021c\u021d"+
		"\u0005\u0013\u0000\u0000\u021d\u021e\u0005\u000b\u0000\u0000\u021eO\u0001"+
		"\u0000\u0000\u0000\u021f\u0220\u0005\u001d\u0000\u0000\u0220\u0225\u0003"+
		"\u00a8T\u0000\u0221\u0222\u0005Q\u0000\u0000\u0222\u0224\u0003\u00a8T"+
		"\u0000\u0223\u0221\u0001\u0000\u0000\u0000\u0224\u0227\u0001\u0000\u0000"+
		"\u0000\u0225\u0223\u0001\u0000\u0000\u0000\u0225\u0226\u0001\u0000\u0000"+
		"\u0000\u0226Q\u0001\u0000\u0000\u0000\u0227\u0225\u0001\u0000\u0000\u0000"+
		"\u0228\u022a\u0005-\u0000\u0000\u0229\u0228\u0001\u0000\u0000\u0000\u0229"+
		"\u022a\u0001\u0000\u0000\u0000\u022a\u022b\u0001\u0000\u0000\u0000\u022b"+
		"\u022c\u0005/\u0000\u0000\u022c\u022d\u0005^\u0000\u0000\u022d\u022e\u0003"+
		"\u00a8T\u0000\u022eS\u0001\u0000\u0000\u0000\u022f\u0230\u0005\u0001\u0000"+
		"\u0000\u0230\u0231\u0005\r\u0000\u0000\u0231\u0233\u0005M\u0000\u0000"+
		"\u0232\u0234\u00030\u0018\u0000\u0233\u0232\u0001\u0000\u0000\u0000\u0233"+
		"\u0234\u0001\u0000\u0000\u0000\u0234\u0235\u0001\u0000\u0000\u0000\u0235"+
		"\u0236\u0005N\u0000\u0000\u0236\u0237\u0003\n\u0005\u0000\u0237\u0238"+
		"\u0005\u0001\u0000\u0000\u0238\u0239\u0005\u0013\u0000\u0000\u0239\u023a"+
		"\u0005\r\u0000\u0000\u023aU\u0001\u0000\u0000\u0000\u023b\u023c\u0005"+
		"$\u0000\u0000\u023c\u023d\u0003\u00a8T\u0000\u023d\u023f\u0005M\u0000"+
		"\u0000\u023e\u0240\u0003(\u0014\u0000\u023f\u023e\u0001\u0000\u0000\u0000"+
		"\u023f\u0240\u0001\u0000\u0000\u0000\u0240\u0241\u0001\u0000\u0000\u0000"+
		"\u0241\u0243\u0005N\u0000\u0000\u0242\u0244\u0003X,\u0000\u0243\u0242"+
		"\u0001\u0000\u0000\u0000\u0243\u0244\u0001\u0000\u0000\u0000\u0244\u0248"+
		"\u0001\u0000\u0000\u0000\u0245\u0246\u0005^\u0000\u0000\u0246\u0248\u0003"+
		"X,\u0000\u0247\u023b\u0001\u0000\u0000\u0000\u0247\u0245\u0001\u0000\u0000"+
		"\u0000\u0248W\u0001\u0000\u0000\u0000\u0249\u024a\u0005?\u0000\u0000\u024a"+
		"\u024b\u0005I\u0000\u0000\u024b\u0250\u0003\u001a\r\u0000\u024c\u024d"+
		"\u0005Q\u0000\u0000\u024d\u024f\u0003\u001a\r\u0000\u024e\u024c\u0001"+
		"\u0000\u0000\u0000\u024f\u0252\u0001\u0000\u0000\u0000\u0250\u024e\u0001"+
		"\u0000\u0000\u0000\u0250\u0251\u0001\u0000\u0000\u0000\u0251\u0253\u0001"+
		"\u0000\u0000\u0000\u0252\u0250\u0001\u0000\u0000\u0000\u0253\u0254\u0005"+
		"J\u0000\u0000\u0254Y\u0001\u0000\u0000\u0000\u0255\u025d\u0003\\.\u0000"+
		"\u0256\u025d\u0003^/\u0000\u0257\u025d\u0003`0\u0000\u0258\u025d\u0003"+
		"b1\u0000\u0259\u025d\u0003d2\u0000\u025a\u025d\u0003f3\u0000\u025b\u025d"+
		"\u0003h4\u0000\u025c\u0255\u0001\u0000\u0000\u0000\u025c\u0256\u0001\u0000"+
		"\u0000\u0000\u025c\u0257\u0001\u0000\u0000\u0000\u025c\u0258\u0001\u0000"+
		"\u0000\u0000\u025c\u0259\u0001\u0000\u0000\u0000\u025c\u025a\u0001\u0000"+
		"\u0000\u0000\u025c\u025b\u0001\u0000\u0000\u0000\u025d[\u0001\u0000\u0000"+
		"\u0000\u025e\u025f\u0005\u0001\u0000\u0000\u025f\u0260\u0005\u0019\u0000"+
		"\u0000\u0260\u0261\u0003n7\u0000\u0261\u0262\u00057\u0000\u0000\u0262"+
		"\u026c\u0003\n\u0005\u0000\u0263\u0264\u0005\u0001\u0000\u0000\u0264\u0265"+
		"\u0005\u0012\u0000\u0000\u0265\u0266\u0005\u0019\u0000\u0000\u0266\u0267"+
		"\u0003n7\u0000\u0267\u0268\u00057\u0000\u0000\u0268\u0269\u0003\n\u0005"+
		"\u0000\u0269\u026b\u0001\u0000\u0000\u0000\u026a\u0263\u0001\u0000\u0000"+
		"\u0000\u026b\u026e\u0001\u0000\u0000\u0000\u026c\u026a\u0001\u0000\u0000"+
		"\u0000\u026c\u026d\u0001\u0000\u0000\u0000\u026d\u0272\u0001\u0000\u0000"+
		"\u0000\u026e\u026c\u0001\u0000\u0000\u0000\u026f\u0270\u0005\u0001\u0000"+
		"\u0000\u0270\u0271\u0005\u0012\u0000\u0000\u0271\u0273\u0003\n\u0005\u0000"+
		"\u0272\u026f\u0001\u0000\u0000\u0000\u0272\u0273\u0001\u0000\u0000\u0000"+
		"\u0273\u0274\u0001\u0000\u0000\u0000\u0274\u0275\u0005\u0001\u0000\u0000"+
		"\u0275\u0276\u0005\u0013\u0000\u0000\u0276\u0277\u0005\u0019\u0000\u0000"+
		"\u0277]\u0001\u0000\u0000\u0000\u0278\u0279\u0005\u0001\u0000\u0000\u0279"+
		"\u027a\u0005\u0015\u0000\u0000\u027a\u027b\u0005^\u0000\u0000\u027b\u027c"+
		"\u0005\u0016\u0000\u0000\u027c\u027d\u0003n7\u0000\u027d\u027e\u0005:"+
		"\u0000\u0000\u027e\u0284\u0003n7\u0000\u027f\u0281\u00053\u0000\u0000"+
		"\u0280\u0282\u0005T\u0000\u0000\u0281\u0280\u0001\u0000\u0000\u0000\u0281"+
		"\u0282\u0001\u0000\u0000\u0000\u0282\u0283\u0001\u0000\u0000\u0000\u0283"+
		"\u0285\u0005_\u0000\u0000\u0284\u027f\u0001\u0000\u0000\u0000\u0284\u0285"+
		"\u0001\u0000\u0000\u0000\u0285\u0286\u0001\u0000\u0000\u0000\u0286\u0287"+
		"\u0003\n\u0005\u0000\u0287\u0288\u0005\u0001\u0000\u0000\u0288\u0289\u0005"+
		"\u0013\u0000\u0000\u0289\u028a\u0005\u0015\u0000\u0000\u028a_\u0001\u0000"+
		"\u0000\u0000\u028b\u028c\u0005\u0001\u0000\u0000\u028c\u028d\u0005\u0011"+
		"\u0000\u0000\u028d\u028e\u0005^\u0000\u0000\u028e\u028f\u0005\u001c\u0000"+
		"\u0000\u028f\u0290\u0003n7\u0000\u0290\u0291\u0003\n\u0005\u0000\u0291"+
		"\u0292\u0005\u0001\u0000\u0000\u0292\u0293\u0005\u0013\u0000\u0000\u0293"+
		"\u0294\u0005\u0011\u0000\u0000\u0294a\u0001\u0000\u0000\u0000\u0295\u0296"+
		"\u0005\u0001\u0000\u0000\u0296\u0297\u0005>\u0000\u0000\u0297\u0298\u0003"+
		"n7\u0000\u0298\u0299\u0003\n\u0005\u0000\u0299\u029a\u0005\u0001\u0000"+
		"\u0000\u029a\u029b\u0005\u0013\u0000\u0000\u029b\u029c\u0005>\u0000\u0000"+
		"\u029cc\u0001\u0000\u0000\u0000\u029d\u029e\u0005\u0001\u0000\u0000\u029e"+
		"\u029f\u00050\u0000\u0000\u029f\u02a0\u0003\n\u0005\u0000\u02a0\u02a1"+
		"\u0005\u0001\u0000\u0000\u02a1\u02a2\u0005\u0013\u0000\u0000\u02a2\u02a3"+
		"\u00050\u0000\u0000\u02a3\u02a4\u0005=\u0000\u0000\u02a4\u02a5\u0003n"+
		"7\u0000\u02a5e\u0001\u0000\u0000\u0000\u02a6\u02a7\u0005\u0001\u0000\u0000"+
		"\u02a7\u02a8\u0005;\u0000\u0000\u02a8\u02a9\u0003\n\u0005\u0000\u02a9"+
		"\u02aa\u0005\u0001\u0000\u0000\u02aa\u02ab\u0005\n\u0000\u0000\u02ab\u02ac"+
		"\u0005^\u0000\u0000\u02ac\u02ad\u0003\n\u0005\u0000\u02ad\u02ae\u0005"+
		"\u0001\u0000\u0000\u02ae\u02af\u0005\u0013\u0000\u0000\u02af\u02b0\u0005"+
		";\u0000\u0000\u02b0g\u0001\u0000\u0000\u0000\u02b1\u02b2\u0005\u0001\u0000"+
		"\u0000\u02b2\u02b3\u00054\u0000\u0000\u02b3\u02b5\u0003n7\u0000\u02b4"+
		"\u02b6\u0003j5\u0000\u02b5\u02b4\u0001\u0000\u0000\u0000\u02b6\u02b7\u0001"+
		"\u0000\u0000\u0000\u02b7\u02b5\u0001\u0000\u0000\u0000\u02b7\u02b8\u0001"+
		"\u0000\u0000\u0000\u02b8\u02b9\u0001\u0000\u0000\u0000\u02b9\u02ba\u0003"+
		"l6\u0000\u02ba\u02bb\u0005\u0001\u0000\u0000\u02bb\u02bc\u0005\u0013\u0000"+
		"\u0000\u02bc\u02bd\u00054\u0000\u0000\u02bdi\u0001\u0000\u0000\u0000\u02be"+
		"\u02bf\u0005\u0001\u0000\u0000\u02bf\u02c1\u0005\t\u0000\u0000\u02c0\u02c2"+
		"\u0005T\u0000\u0000\u02c1\u02c0\u0001\u0000\u0000\u0000\u02c1\u02c2\u0001"+
		"\u0000\u0000\u0000\u02c2\u02c3\u0001\u0000\u0000\u0000\u02c3\u02c4\u0003"+
		"\u0082A\u0000\u02c4\u02c5\u0003\n\u0005\u0000\u02c5k\u0001\u0000\u0000"+
		"\u0000\u02c6\u02c7\u0005\u0001\u0000\u0000\u02c7\u02c8\u0005\u000f\u0000"+
		"\u0000\u02c8\u02c9\u0003\n\u0005\u0000\u02c9m\u0001\u0000\u0000\u0000"+
		"\u02ca\u02cb\u00067\uffff\uffff\u0000\u02cb\u02d7\u0003p8\u0000\u02cc"+
		"\u02d7\u0003 \u0010\u0000\u02cd\u02d7\u0003|>\u0000\u02ce\u02cf\u0003"+
		"\u009eO\u0000\u02cf\u02d0\u0003n7\t\u02d0\u02d7\u0001\u0000\u0000\u0000"+
		"\u02d1\u02d7\u0003V+\u0000\u02d2\u02d7\u0003$\u0012\u0000\u02d3\u02d7"+
		"\u0003\"\u0011\u0000\u02d4\u02d5\u0005\u0001\u0000\u0000\u02d5\u02d7\u0003"+
		"n7\u0001\u02d6\u02ca\u0001\u0000\u0000\u0000\u02d6\u02cc\u0001\u0000\u0000"+
		"\u0000\u02d6\u02cd\u0001\u0000\u0000\u0000\u02d6\u02ce\u0001\u0000\u0000"+
		"\u0000\u02d6\u02d1\u0001\u0000\u0000\u0000\u02d6\u02d2\u0001\u0000\u0000"+
		"\u0000\u02d6\u02d3\u0001\u0000\u0000\u0000\u02d6\u02d4\u0001\u0000\u0000"+
		"\u0000\u02d7\u02ef\u0001\u0000\u0000\u0000\u02d8\u02d9\n\b\u0000\u0000"+
		"\u02d9\u02da\u0005W\u0000\u0000\u02da\u02ee\u0003n7\t\u02db\u02dc\n\u0007"+
		"\u0000\u0000\u02dc\u02dd\u0003\u00a0P\u0000\u02dd\u02de\u0003n7\b\u02de"+
		"\u02ee\u0001\u0000\u0000\u0000\u02df\u02e0\n\f\u0000\u0000\u02e0\u02ee"+
		"\u0003x<\u0000\u02e1\u02e2\n\u000b\u0000\u0000\u02e2\u02e3\u0005P\u0000"+
		"\u0000\u02e3\u02ee\u0003 \u0010\u0000\u02e4\u02e5\n\n\u0000\u0000\u02e5"+
		"\u02e6\u0005P\u0000\u0000\u02e6\u02ee\u0005^\u0000\u0000\u02e7\u02e8\n"+
		"\u0005\u0000\u0000\u02e8\u02e9\u0003r9\u0000\u02e9\u02ea\u0003t:\u0000"+
		"\u02ea\u02ee\u0001\u0000\u0000\u0000\u02eb\u02ec\n\u0004\u0000\u0000\u02ec"+
		"\u02ee\u0003X,\u0000\u02ed\u02d8\u0001\u0000\u0000\u0000\u02ed\u02db\u0001"+
		"\u0000\u0000\u0000\u02ed\u02df\u0001\u0000\u0000\u0000\u02ed\u02e1\u0001"+
		"\u0000\u0000\u0000\u02ed\u02e4\u0001\u0000\u0000\u0000\u02ed\u02e7\u0001"+
		"\u0000\u0000\u0000\u02ed\u02eb\u0001\u0000\u0000\u0000\u02ee\u02f1\u0001"+
		"\u0000\u0000\u0000\u02ef\u02ed\u0001\u0000\u0000\u0000\u02ef\u02f0\u0001"+
		"\u0000\u0000\u0000\u02f0o\u0001\u0000\u0000\u0000\u02f1\u02ef\u0001\u0000"+
		"\u0000\u0000\u02f2\u02f3\u0005M\u0000\u0000\u02f3\u02f4\u0003n7\u0000"+
		"\u02f4\u02f5\u0005N\u0000\u0000\u02f5q\u0001\u0000\u0000\u0000\u02f6\u02f7"+
		"\u0005\u0019\u0000\u0000\u02f7\u02f8\u0003n7\u0000\u02f8s\u0001\u0000"+
		"\u0000\u0000\u02f9\u02fa\u0005\u0012\u0000\u0000\u02fa\u02fb\u0003n7\u0000"+
		"\u02fbu\u0001\u0000\u0000\u0000\u02fc\u02fd\u0005\u001f\u0000\u0000\u02fd"+
		"\u02fe\u0003(\u0014\u0000\u02fe\u02ff\u0005H\u0000\u0000\u02ff\u0300\u0003"+
		"n7\u0000\u0300w\u0001\u0000\u0000\u0000\u0301\u0308\u0005K\u0000\u0000"+
		"\u0302\u0309\u0003n7\u0000\u0303\u0304\u0003n7\u0000\u0304\u0305\u0005"+
		"Q\u0000\u0000\u0305\u0306\u0003n7\u0000\u0306\u0309\u0001\u0000\u0000"+
		"\u0000\u0307\u0309\u0003z=\u0000\u0308\u0302\u0001\u0000\u0000\u0000\u0308"+
		"\u0303\u0001\u0000\u0000\u0000\u0308\u0307\u0001\u0000\u0000\u0000\u0309"+
		"\u030a\u0001\u0000\u0000\u0000\u030a\u030b\u0005L\u0000\u0000\u030by\u0001"+
		"\u0000\u0000\u0000\u030c\u030d\u0003n7\u0000\u030d\u030e\u0005O\u0000"+
		"\u0000\u030e\u030f\u0003n7\u0000\u030f\u0316\u0001\u0000\u0000\u0000\u0310"+
		"\u0311\u0003n7\u0000\u0311\u0312\u0005O\u0000\u0000\u0312\u0316\u0001"+
		"\u0000\u0000\u0000\u0313\u0314\u0005O\u0000\u0000\u0314\u0316\u0003n7"+
		"\u0000\u0315\u030c\u0001\u0000\u0000\u0000\u0315\u0310\u0001\u0000\u0000"+
		"\u0000\u0315\u0313\u0001\u0000\u0000\u0000\u0316{\u0001\u0000\u0000\u0000"+
		"\u0317\u0321\u0003\u0080@\u0000\u0318\u031a\u0003~?\u0000\u0319\u0318"+
		"\u0001\u0000\u0000\u0000\u0319\u031a\u0001\u0000\u0000\u0000\u031a\u031b"+
		"\u0001\u0000\u0000\u0000\u031b\u0321\u0005^\u0000\u0000\u031c\u0321\u0003"+
		"\u0084B\u0000\u031d\u0321\u00058\u0000\u0000\u031e\u031f\u0005\u000f\u0000"+
		"\u0000\u031f\u0321\u0003\u00a8T\u0000\u0320\u0317\u0001\u0000\u0000\u0000"+
		"\u0320\u0319\u0001\u0000\u0000\u0000\u0320\u031c\u0001\u0000\u0000\u0000"+
		"\u0320\u031d\u0001\u0000\u0000\u0000\u0320\u031e\u0001\u0000\u0000\u0000"+
		"\u0321}\u0001\u0000\u0000\u0000\u0322\u0329\u0005/\u0000\u0000\u0323\u0329"+
		"\u0005\u0018\u0000\u0000\u0324\u0329\u0005!\u0000\u0000\u0325\u0326\u0005"+
		"*\u0000\u0000\u0326\u0327\u0005P\u0000\u0000\u0327\u0329\u0003\u0004\u0002"+
		"\u0000\u0328\u0322\u0001\u0000\u0000\u0000\u0328\u0323\u0001\u0000\u0000"+
		"\u0000\u0328\u0324\u0001\u0000\u0000\u0000\u0328\u0325\u0001\u0000\u0000"+
		"\u0000\u0329\u032a\u0001\u0000\u0000\u0000\u032a\u032b\u0005P\u0000\u0000"+
		"\u032b\u007f\u0001\u0000\u0000\u0000\u032c\u032f\u0003\u0082A\u0000\u032d"+
		"\u032f\u0003\u0086C\u0000\u032e\u032c\u0001\u0000\u0000\u0000\u032e\u032d"+
		"\u0001\u0000\u0000\u0000\u032f\u0081\u0001\u0000\u0000\u0000\u0330\u0336"+
		"\u0005A\u0000\u0000\u0331\u0336\u0005_\u0000\u0000\u0332\u0336\u0005`"+
		"\u0000\u0000\u0333\u0336\u0005a\u0000\u0000\u0334\u0336\u0003D\"\u0000"+
		"\u0335\u0330\u0001\u0000\u0000\u0000\u0335\u0331\u0001\u0000\u0000\u0000"+
		"\u0335\u0332\u0001\u0000\u0000\u0000\u0335\u0333\u0001\u0000\u0000\u0000"+
		"\u0335\u0334\u0001\u0000\u0000\u0000\u0336\u0083\u0001\u0000\u0000\u0000"+
		"\u0337\u033c\u0003\u008eG\u0000\u0338\u033c\u0003\u0094J\u0000\u0339\u033c"+
		"\u0003\u0088D\u0000\u033a\u033c\u0003\u0096K\u0000\u033b\u0337\u0001\u0000"+
		"\u0000\u0000\u033b\u0338\u0001\u0000\u0000\u0000\u033b\u0339\u0001\u0000"+
		"\u0000\u0000\u033b\u033a\u0001\u0000\u0000\u0000\u033c\u0085\u0001\u0000"+
		"\u0000\u0000\u033d\u0342\u0005b\u0000\u0000\u033e\u0342\u0003\u008aE\u0000"+
		"\u033f\u0342\u0003\u0090H\u0000\u0340\u0342\u0003\u0098L\u0000\u0341\u033d"+
		"\u0001\u0000\u0000\u0000\u0341\u033e\u0001\u0000\u0000\u0000\u0341\u033f"+
		"\u0001\u0000\u0000\u0000\u0341\u0340\u0001\u0000\u0000\u0000\u0342\u0087"+
		"\u0001\u0000\u0000\u0000\u0343\u0344\u0005M\u0000\u0000\u0344\u0345\u0003"+
		"n7\u0000\u0345\u0346\u0005Q\u0000\u0000\u0346\u034b\u0003n7\u0000\u0347"+
		"\u0348\u0005Q\u0000\u0000\u0348\u034a\u0003n7\u0000\u0349\u0347\u0001"+
		"\u0000\u0000\u0000\u034a\u034d\u0001\u0000\u0000\u0000\u034b\u0349\u0001"+
		"\u0000\u0000\u0000\u034b\u034c\u0001\u0000\u0000\u0000\u034c\u034e\u0001"+
		"\u0000\u0000\u0000\u034d\u034b\u0001\u0000\u0000\u0000\u034e\u034f\u0005"+
		"N\u0000\u0000\u034f\u0089\u0001\u0000\u0000\u0000\u0350\u0351\u0005M\u0000"+
		"\u0000\u0351\u0352\u0003\u0080@\u0000\u0352\u0353\u0005Q\u0000\u0000\u0353"+
		"\u0358\u0003\u0080@\u0000\u0354\u0355\u0005Q\u0000\u0000\u0355\u0357\u0003"+
		"\u0080@\u0000\u0356\u0354\u0001\u0000\u0000\u0000\u0357\u035a\u0001\u0000"+
		"\u0000\u0000\u0358\u0356\u0001\u0000\u0000\u0000\u0358\u0359\u0001\u0000"+
		"\u0000\u0000\u0359\u035b\u0001\u0000\u0000\u0000\u035a\u0358\u0001\u0000"+
		"\u0000\u0000\u035b\u035c\u0005N\u0000\u0000\u035c\u008b\u0001\u0000\u0000"+
		"\u0000\u035d\u035e\u0005M\u0000\u0000\u035e\u0361\u0005^\u0000\u0000\u035f"+
		"\u0360\u0005Q\u0000\u0000\u0360\u0362\u0005^\u0000\u0000\u0361\u035f\u0001"+
		"\u0000\u0000\u0000\u0362\u0363\u0001\u0000\u0000\u0000\u0363\u0361\u0001"+
		"\u0000\u0000\u0000\u0363\u0364\u0001\u0000\u0000\u0000\u0364\u0365\u0001"+
		"\u0000\u0000\u0000\u0365\u0366\u0005N\u0000\u0000\u0366\u008d\u0001\u0000"+
		"\u0000\u0000\u0367\u0368\u0005I\u0000\u0000\u0368\u036d\u0003n7\u0000"+
		"\u0369\u036a\u0005Q\u0000\u0000\u036a\u036c\u0003n7\u0000\u036b\u0369"+
		"\u0001\u0000\u0000\u0000\u036c\u036f\u0001\u0000\u0000\u0000\u036d\u036b"+
		"\u0001\u0000\u0000\u0000\u036d\u036e\u0001\u0000\u0000\u0000\u036e\u0370"+
		"\u0001\u0000\u0000\u0000\u036f\u036d\u0001\u0000\u0000\u0000\u0370\u0371"+
		"\u0005J\u0000\u0000\u0371\u008f\u0001\u0000\u0000\u0000\u0372\u0373\u0005"+
		"I\u0000\u0000\u0373\u0378\u0003\u0080@\u0000\u0374\u0375\u0005Q\u0000"+
		"\u0000\u0375\u0377\u0003\u0080@\u0000\u0376\u0374\u0001\u0000\u0000\u0000"+
		"\u0377\u037a\u0001\u0000\u0000\u0000\u0378\u0376\u0001\u0000\u0000\u0000"+
		"\u0378\u0379\u0001\u0000\u0000\u0000\u0379\u037b\u0001\u0000\u0000\u0000"+
		"\u037a\u0378\u0001\u0000\u0000\u0000\u037b\u037c\u0005J\u0000\u0000\u037c"+
		"\u0091\u0001\u0000\u0000\u0000\u037d\u037e\u0005I\u0000\u0000\u037e\u037f"+
		"\u0005^\u0000\u0000\u037f\u0380\u0005R\u0000\u0000\u0380\u0381\u0005^"+
		"\u0000\u0000\u0381\u0382\u0005J\u0000\u0000\u0382\u0093\u0001\u0000\u0000"+
		"\u0000\u0383\u0384\u0005C\u0000\u0000\u0384\u0385\u0003\u00acV\u0000\u0385"+
		"\u0387\u0005M\u0000\u0000\u0386\u0388\u0005_\u0000\u0000\u0387\u0386\u0001"+
		"\u0000\u0000\u0000\u0387\u0388\u0001\u0000\u0000\u0000\u0388\u0389\u0001"+
		"\u0000\u0000\u0000\u0389\u038a\u0005N\u0000\u0000\u038a\u0095\u0001\u0000"+
		"\u0000\u0000\u038b\u038c\u0005I\u0000\u0000\u038c\u0391\u0003\u009aM\u0000"+
		"\u038d\u038e\u0005Q\u0000\u0000\u038e\u0390\u0003\u009aM\u0000\u038f\u038d"+
		"\u0001\u0000\u0000\u0000\u0390\u0393\u0001\u0000\u0000\u0000\u0391\u038f"+
		"\u0001\u0000\u0000\u0000\u0391\u0392\u0001\u0000\u0000\u0000\u0392\u0394"+
		"\u0001\u0000\u0000\u0000\u0393\u0391\u0001\u0000\u0000\u0000\u0394\u0395"+
		"\u0005J\u0000\u0000\u0395\u0097\u0001\u0000\u0000\u0000\u0396\u0397\u0005"+
		"I\u0000\u0000\u0397\u039c\u0003\u009cN\u0000\u0398\u0399\u0005Q\u0000"+
		"\u0000\u0399\u039b\u0003\u009cN\u0000\u039a\u0398\u0001\u0000\u0000\u0000"+
		"\u039b\u039e\u0001\u0000\u0000\u0000\u039c\u039a\u0001\u0000\u0000\u0000"+
		"\u039c\u039d\u0001\u0000\u0000\u0000\u039d\u039f\u0001\u0000\u0000\u0000"+
		"\u039e\u039c\u0001\u0000\u0000\u0000\u039f\u03a0\u0005J\u0000\u0000\u03a0"+
		"\u0099\u0001\u0000\u0000\u0000\u03a1\u03a2\u0003n7\u0000\u03a2\u03a3\u0005"+
		"R\u0000\u0000\u03a3\u03a4\u0003n7\u0000\u03a4\u009b\u0001\u0000\u0000"+
		"\u0000\u03a5\u03a6\u0003\u0080@\u0000\u03a6\u03a7\u0005R\u0000\u0000\u03a7"+
		"\u03a8\u0003\u0080@\u0000\u03a8\u009d\u0001\u0000\u0000\u0000\u03a9\u03aa"+
		"\u0007\u0002\u0000\u0000\u03aa\u009f\u0001\u0000\u0000\u0000\u03ab\u03af"+
		"\u0003\u00a2Q\u0000\u03ac\u03af\u0003\u00a4R\u0000\u03ad\u03af\u0003\u00a6"+
		"S\u0000\u03ae\u03ab\u0001\u0000\u0000\u0000\u03ae\u03ac\u0001\u0000\u0000"+
		"\u0000\u03ae\u03ad\u0001\u0000\u0000\u0000\u03af\u00a1\u0001\u0000\u0000"+
		"\u0000\u03b0\u03b1\u0007\u0003\u0000\u0000\u03b1\u00a3\u0001\u0000\u0000"+
		"\u0000\u03b2\u03b3\u0007\u0004\u0000\u0000\u03b3\u00a5\u0001\u0000\u0000"+
		"\u0000\u03b4\u03b5\u0007\u0005\u0000\u0000\u03b5\u00a7\u0001\u0000\u0000"+
		"\u0000\u03b6\u03be\u0005B\u0000\u0000\u03b7\u03be\u0003\u00aaU\u0000\u03b8"+
		"\u03be\u0005]\u0000\u0000\u03b9\u03ba\u0005]\u0000\u0000\u03ba\u03be\u0003"+
		"\u00acV\u0000\u03bb\u03be\u0003\u00aeW\u0000\u03bc\u03be\u0003\u00b2Y"+
		"\u0000\u03bd\u03b6\u0001\u0000\u0000\u0000\u03bd\u03b7\u0001\u0000\u0000"+
		"\u0000\u03bd\u03b8\u0001\u0000\u0000\u0000\u03bd\u03b9\u0001\u0000\u0000"+
		"\u0000\u03bd\u03bb\u0001\u0000\u0000\u0000\u03bd\u03bc\u0001\u0000\u0000"+
		"\u0000\u03be\u00a9\u0001\u0000\u0000\u0000\u03bf\u03c0\u0007\u0006\u0000"+
		"\u0000\u03c0\u03c1\u0003\u00acV\u0000\u03c1\u00ab\u0001\u0000\u0000\u0000"+
		"\u03c2\u03c3\u0005X\u0000\u0000\u03c3\u03c4\u0005&\u0000\u0000\u03c4\u03c9"+
		"\u0003\u00a8T\u0000\u03c5\u03c6\u0005Q\u0000\u0000\u03c6\u03c8\u0003\u00a8"+
		"T\u0000\u03c7\u03c5\u0001\u0000\u0000\u0000\u03c8\u03cb\u0001\u0000\u0000"+
		"\u0000\u03c9\u03c7\u0001\u0000\u0000\u0000\u03c9\u03ca\u0001\u0000\u0000"+
		"\u0000\u03ca\u03cc\u0001\u0000\u0000\u0000\u03cb\u03c9\u0001\u0000\u0000"+
		"\u0000\u03cc\u03cd\u0005Y\u0000\u0000\u03cd\u00ad\u0001\u0000\u0000\u0000"+
		"\u03ce\u03cf\u0005M\u0000\u0000\u03cf\u03d2\u0003\u00a8T\u0000\u03d0\u03d1"+
		"\u0005Q\u0000\u0000\u03d1\u03d3\u0003\u00a8T\u0000\u03d2\u03d0\u0001\u0000"+
		"\u0000\u0000\u03d3\u03d4\u0001\u0000\u0000\u0000\u03d4\u03d2\u0001\u0000"+
		"\u0000\u0000\u03d4\u03d5\u0001\u0000\u0000\u0000\u03d5\u03d6\u0001\u0000"+
		"\u0000\u0000\u03d6\u03d7\u0005N\u0000\u0000\u03d7\u00af\u0001\u0000\u0000"+
		"\u0000\u03d8\u03dd\u0003\u00a8T\u0000\u03d9\u03da\u0005Q\u0000\u0000\u03da"+
		"\u03dc\u0003\u00a8T\u0000\u03db\u03d9\u0001\u0000\u0000\u0000\u03dc\u03df"+
		"\u0001\u0000\u0000\u0000\u03dd\u03db\u0001\u0000\u0000\u0000\u03dd\u03de"+
		"\u0001\u0000\u0000\u0000\u03de\u00b1\u0001\u0000\u0000\u0000\u03df\u03dd"+
		"\u0001\u0000\u0000\u0000\u03e0\u03e1\u0005M\u0000\u0000\u03e1\u03e2\u0003"+
		"\u00b0X\u0000\u03e2\u03e3\u0005H\u0000\u0000\u03e3\u03e4\u0003\u00a8T"+
		"\u0000\u03e4\u03e5\u0005N\u0000\u0000\u03e5\u00b3\u0001\u0000\u0000\u0000"+
		"Q\u00bc\u00be\u00c4\u00d1\u00e1\u00ee\u00f0\u00f6\u0104\u010d\u0122\u0126"+
		"\u012a\u012d\u0132\u0137\u013c\u0145\u014b\u014f\u0156\u0164\u016d\u0175"+
		"\u017c\u0183\u0199\u01a6\u01b1\u01c2\u01c8\u01cf\u01d1\u01dd\u01ea\u01ec"+
		"\u01f8\u01fe\u0200\u020d\u0216\u0218\u0225\u0229\u0233\u023f\u0243\u0247"+
		"\u0250\u025c\u026c\u0272\u0281\u0284\u02b7\u02c1\u02d6\u02ed\u02ef\u0308"+
		"\u0315\u0319\u0320\u0328\u032e\u0335\u033b\u0341\u034b\u0358\u0363\u036d"+
		"\u0378\u0387\u0391\u039c\u03ae\u03bd\u03c9\u03d4\u03dd";
	public static final ATN _ATN =
		new ATNDeserializer().deserialize(_serializedATN.toCharArray());
	static {
		_decisionToDFA = new DFA[_ATN.getNumberOfDecisions()];
		for (int i = 0; i < _ATN.getNumberOfDecisions(); i++) {
			_decisionToDFA[i] = new DFA(_ATN.getDecisionState(i), i);
		}
	}
}