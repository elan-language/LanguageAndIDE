// Generated from c:/elan-language/LanguageAndIDE/src/grammars/python/Python.g4 by ANTLR 4.13.1
import org.antlr.v4.runtime.atn.*;
import org.antlr.v4.runtime.dfa.DFA;
import org.antlr.v4.runtime.*;
import org.antlr.v4.runtime.misc.*;
import org.antlr.v4.runtime.tree.*;
import java.util.List;
import java.util.Iterator;
import java.util.ArrayList;

@SuppressWarnings({"all", "warnings", "unchecked", "unused", "cast", "CheckReturnValue"})
public class PythonParser extends Parser {
	static { RuntimeMetaData.checkVersion("4.13.1", RuntimeMetaData.VERSION); }

	protected static final DFA[] _decisionToDFA;
	protected static final PredictionContextCache _sharedContextCache =
		new PredictionContextCache();
	public static final int
		CLASS=1, ELIF=2, ELSE=3, FOR=4, IF=5, IN=6, LAMBDA=7, MAIN=8, RETURN=9, 
		TRY=10, WHILE=11, IF_=12, ABSTRACT=13, ASSERT=14, ASSIGN=15, BE=16, CALL=17, 
		CATCH=18, CONSTANT=19, CONSTRUCTOR=20, COPY=21, DIV=22, END=23, EVALUATES=24, 
		FROM=25, FUNCTION=26, INHERITS=27, LET=28, NEW=29, PROCEDURE=30, PROPERTY=31, 
		RETURNS=32, SET=33, STEP=34, TEST=35, THEN=36, THROW=37, TO=38, VARIABLE=39, 
		ASSERT_EQUAL=40, AS=41, DEF=42, EXCEPT=43, INIT=44, NONE=45, PASS=46, 
		RAISE=47, ABC=48, ENUM=49, TESTCASE=50, TUPLE=51, INT_NAME=52, FLOAT_NAME=53, 
		BOOL_NAME=54, STRING_NAME=55, LIST_NAME=56, DICT_NAME=57, FUNC_NAME=58, 
		TRUE=59, FALSE=60, AND=61, OR=62, NOT=63, EQUAL=64, NOT_EQUAL=65, REF_EQUAL=66, 
		REF_NOT_EQUAL=67, MOD=68, ARROW=69, POWER=70, BINARY_PREFIX=71, HEX_PREFIX=72, 
		THIS_INSTANCE=73, SINGLE_EQUALS=74, OPEN_BRACE=75, CLOSE_BRACE=76, OPEN_SQ_BRACKET=77, 
		CLOSE_SQ_BRACKET=78, OPEN_BRACKET=79, CLOSE_BRACKET=80, DOT=81, COMMA=82, 
		COLON=83, PLUS=84, MINUS=85, MULT=86, DIVIDE=87, LT=88, GT=89, LE=90, 
		GE=91, DOUBLE_QUOTES=92, WS=93, NL=94, NAME_STARTING_TEST_=95, NAME_STARTING_LC=96, 
		NAME_STARTING_UC=97, LITERAL_BINARY=98, LITERAL_HEX=99, LITERAL_INTEGER=100, 
		LITERAL_FLOAT=101, START_INTERPOLATED_STRING=102, LITERAL_STRING=103, 
		WHITESPACES=104, TEXT=105, GHOSTED_LINE=106, GHOSTED_BLOCK_START=107, 
		GHOSTED_BLOCK_END=108, END_MAIN=109, END_FUNCTION=110, END_TEST=111, END_PROCEDURE=112, 
		END_ENUM=113, END_CLASS=114, END_IF=115, END_WHILE=116, END_FOR=117, END_TRY=118, 
		END_CONSTRUCTOR=119, END_FUNCTION_METHOD=120, END_PROCEDURE_METHOD=121, 
		ASSIGNMENT_ANNOTATION=122, VARIABLE_DEFINITION_ANNOTATION=123, PRIVATE_ANNOTATION=124, 
		ABSTRACT_METHOD=125, COMMENT=126, Grapheme=127, EscapedLeftBrace=128, 
		EscapedDoubleQuotes=129;
	public static final int
		RULE_file = 0, RULE_globalBlock = 1, RULE_global = 2, RULE_main = 3, RULE_mainCall = 4, 
		RULE_function = 5, RULE_test = 6, RULE_testStatement = 7, RULE_procedure = 8, 
		RULE_constant = 9, RULE_enum = 10, RULE_concreteClass = 11, RULE_concreteClassMember = 12, 
		RULE_abstractClass = 13, RULE_abstractClassMember = 14, RULE_comment = 15, 
		RULE_commentText = 16, RULE_statementBlock = 17, RULE_selectableStatement = 18, 
		RULE_ordinaryStatement = 19, RULE_variableDefinition = 20, RULE_assignment = 21, 
		RULE_ifStatement = 22, RULE_thenClause = 23, RULE_elseIfClause = 24, RULE_elseClause = 25, 
		RULE_whileLoop = 26, RULE_forLoop = 27, RULE_procedureCall = 28, RULE_tryStatement = 29, 
		RULE_tryClause = 30, RULE_catchClause = 31, RULE_throwStatement = 32, 
		RULE_errorMessage = 33, RULE_assert = 34, RULE_returnStatement = 35, RULE_memberBlock = 36, 
		RULE_selectableMember = 37, RULE_constructorMember = 38, RULE_property = 39, 
		RULE_functionMethod = 40, RULE_procedureMethod = 41, RULE_abstractFunction = 42, 
		RULE_abstractProcedure = 43, RULE_identifierDef = 44, RULE_identifierUse = 45, 
		RULE_assignable = 46, RULE_methodName = 47, RULE_testName = 48, RULE_testClassName = 49, 
		RULE_typeName = 50, RULE_constantValue = 51, RULE_argList = 52, RULE_argument = 53, 
		RULE_paramList = 54, RULE_identifierList = 55, RULE_expressionList = 56, 
		RULE_enumDefValue = 57, RULE_enumList = 58, RULE_type = 59, RULE_assertActual = 60, 
		RULE_assertExpected = 61, RULE_litValue = 62, RULE_litBoolean = 63, RULE_litInt = 64, 
		RULE_litFloat = 65, RULE_litString = 66, RULE_interpolatedString = 67, 
		RULE_segment = 68, RULE_interpolatedStringText = 69, RULE_interpolatedStringExpression = 70, 
		RULE_enumValue = 71, RULE_index = 72, RULE_expression = 73, RULE_term = 74, 
		RULE_chainable = 75, RULE_thisInstance = 76, RULE_bracketedExpression = 77, 
		RULE_unaryExpression = 78, RULE_negateNumeric = 79, RULE_negateLogical = 80, 
		RULE_binaryExpression = 81, RULE_list = 82, RULE_tuple = 83, RULE_dictionary = 84, 
		RULE_kvpList = 85, RULE_kvp = 86, RULE_methodCall = 87, RULE_binaryOperator = 88, 
		RULE_newInstance = 89, RULE_paramDef = 90, RULE_typeGeneric = 91, RULE_typeFunc = 92, 
		RULE_typeTuple = 93, RULE_lambda = 94;
	private static String[] makeRuleNames() {
		return new String[] {
			"file", "globalBlock", "global", "main", "mainCall", "function", "test", 
			"testStatement", "procedure", "constant", "enum", "concreteClass", "concreteClassMember", 
			"abstractClass", "abstractClassMember", "comment", "commentText", "statementBlock", 
			"selectableStatement", "ordinaryStatement", "variableDefinition", "assignment", 
			"ifStatement", "thenClause", "elseIfClause", "elseClause", "whileLoop", 
			"forLoop", "procedureCall", "tryStatement", "tryClause", "catchClause", 
			"throwStatement", "errorMessage", "assert", "returnStatement", "memberBlock", 
			"selectableMember", "constructorMember", "property", "functionMethod", 
			"procedureMethod", "abstractFunction", "abstractProcedure", "identifierDef", 
			"identifierUse", "assignable", "methodName", "testName", "testClassName", 
			"typeName", "constantValue", "argList", "argument", "paramList", "identifierList", 
			"expressionList", "enumDefValue", "enumList", "type", "assertActual", 
			"assertExpected", "litValue", "litBoolean", "litInt", "litFloat", "litString", 
			"interpolatedString", "segment", "interpolatedStringText", "interpolatedStringExpression", 
			"enumValue", "index", "expression", "term", "chainable", "thisInstance", 
			"bracketedExpression", "unaryExpression", "negateNumeric", "negateLogical", 
			"binaryExpression", "list", "tuple", "dictionary", "kvpList", "kvp", 
			"methodCall", "binaryOperator", "newInstance", "paramDef", "typeGeneric", 
			"typeFunc", "typeTuple", "lambda"
		};
	}
	public static final String[] ruleNames = makeRuleNames();

	private static String[] makeLiteralNames() {
		return new String[] {
			null, "'class'", "'elif'", "'else'", "'for'", "'if'", "'in'", "'lambda'", 
			"'main'", "'return'", "'try'", "'while'", "'if_'", "'abstract'", "'assert'", 
			"'assign'", "'be'", "'call'", "'catch'", "'constant'", "'constructor'", 
			"'copy'", "'div'", "'end'", "'evaluates'", "'from'", "'function'", "'inherits'", 
			"'let'", "'new'", "'procedure'", "'property'", "'returns'", "'set'", 
			"'step'", "'test'", "'then'", "'throw'", "'to'", "'variable'", "'assertEqual'", 
			"'as'", "'def'", "'except'", "'__init__'", "'None'", "'pass'", "'raise'", 
			"'ABC'", "'Enum'", "'unittest.TestCase'", "'tuple'", "'int'", "'float'", 
			"'bool'", "'str'", "'list'", "'dict'", "'Callable'", "'True'", "'False'", 
			"'and'", "'or'", "'not'", "'=='", "'!='", "'is'", "'not is'", "'%'", 
			"'->'", "'**'", "'0b'", "'0x'", "'self'", "'='", "'{'", null, "'['", 
			"']'", "'('", "')'", "'.'", "','", "':'", "'+'", "'-'", "'*'", "'/'", 
			"'<'", "'>'", "'<='", "'>='", null, null, null, null, null, null, null, 
			null, null, null, "'f\"'", null, null, null, "'#[ghosted] '", "''''[ghosted] '", 
			"'''''", "'# end main'", "'# end function'", "'# end test'", "'# end procedure'", 
			"'# end enum'", "'# end class'", "'# end if'", "'# end while'", "'# end for'", 
			"'# end try'", "'# end constructor'", "'# end function method'", "'# end procedure method'", 
			"'# assignment'", "'# variable definition'", "'# private'", "'@abstractmethod'", 
			null, null, "'\\{'", "'\\\"'"
		};
	}
	private static final String[] _LITERAL_NAMES = makeLiteralNames();
	private static String[] makeSymbolicNames() {
		return new String[] {
			null, "CLASS", "ELIF", "ELSE", "FOR", "IF", "IN", "LAMBDA", "MAIN", "RETURN", 
			"TRY", "WHILE", "IF_", "ABSTRACT", "ASSERT", "ASSIGN", "BE", "CALL", 
			"CATCH", "CONSTANT", "CONSTRUCTOR", "COPY", "DIV", "END", "EVALUATES", 
			"FROM", "FUNCTION", "INHERITS", "LET", "NEW", "PROCEDURE", "PROPERTY", 
			"RETURNS", "SET", "STEP", "TEST", "THEN", "THROW", "TO", "VARIABLE", 
			"ASSERT_EQUAL", "AS", "DEF", "EXCEPT", "INIT", "NONE", "PASS", "RAISE", 
			"ABC", "ENUM", "TESTCASE", "TUPLE", "INT_NAME", "FLOAT_NAME", "BOOL_NAME", 
			"STRING_NAME", "LIST_NAME", "DICT_NAME", "FUNC_NAME", "TRUE", "FALSE", 
			"AND", "OR", "NOT", "EQUAL", "NOT_EQUAL", "REF_EQUAL", "REF_NOT_EQUAL", 
			"MOD", "ARROW", "POWER", "BINARY_PREFIX", "HEX_PREFIX", "THIS_INSTANCE", 
			"SINGLE_EQUALS", "OPEN_BRACE", "CLOSE_BRACE", "OPEN_SQ_BRACKET", "CLOSE_SQ_BRACKET", 
			"OPEN_BRACKET", "CLOSE_BRACKET", "DOT", "COMMA", "COLON", "PLUS", "MINUS", 
			"MULT", "DIVIDE", "LT", "GT", "LE", "GE", "DOUBLE_QUOTES", "WS", "NL", 
			"NAME_STARTING_TEST_", "NAME_STARTING_LC", "NAME_STARTING_UC", "LITERAL_BINARY", 
			"LITERAL_HEX", "LITERAL_INTEGER", "LITERAL_FLOAT", "START_INTERPOLATED_STRING", 
			"LITERAL_STRING", "WHITESPACES", "TEXT", "GHOSTED_LINE", "GHOSTED_BLOCK_START", 
			"GHOSTED_BLOCK_END", "END_MAIN", "END_FUNCTION", "END_TEST", "END_PROCEDURE", 
			"END_ENUM", "END_CLASS", "END_IF", "END_WHILE", "END_FOR", "END_TRY", 
			"END_CONSTRUCTOR", "END_FUNCTION_METHOD", "END_PROCEDURE_METHOD", "ASSIGNMENT_ANNOTATION", 
			"VARIABLE_DEFINITION_ANNOTATION", "PRIVATE_ANNOTATION", "ABSTRACT_METHOD", 
			"COMMENT", "Grapheme", "EscapedLeftBrace", "EscapedDoubleQuotes"
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
	public String getGrammarFileName() { return "Python.g4"; }

	@Override
	public String[] getRuleNames() { return ruleNames; }

	@Override
	public String getSerializedATN() { return _serializedATN; }

	@Override
	public ATN getATN() { return _ATN; }

	public PythonParser(TokenStream input) {
		super(input);
		_interp = new ParserATNSimulator(this,_ATN,_decisionToDFA,_sharedContextCache);
	}

	@SuppressWarnings("CheckReturnValue")
	public static class FileContext extends ParserRuleContext {
		public TerminalNode EOF() { return getToken(PythonParser.EOF, 0); }
		public CommentContext comment() {
			return getRuleContext(CommentContext.class,0);
		}
		public List<GlobalContext> global() {
			return getRuleContexts(GlobalContext.class);
		}
		public GlobalContext global(int i) {
			return getRuleContext(GlobalContext.class,i);
		}
		public MainCallContext mainCall() {
			return getRuleContext(MainCallContext.class,0);
		}
		public List<TerminalNode> NL() { return getTokens(PythonParser.NL); }
		public TerminalNode NL(int i) {
			return getToken(PythonParser.NL, i);
		}
		public FileContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_file; }
	}

	public final FileContext file() throws RecognitionException {
		FileContext _localctx = new FileContext(_ctx, getState());
		enterRule(_localctx, 0, RULE_file);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(191);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,0,_ctx) ) {
			case 1:
				{
				setState(190);
				comment();
				}
				break;
			}
			setState(196);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==CLASS || _la==DEF || ((((_la - 96)) & ~0x3f) == 0 && ((1L << (_la - 96)) & 1073744897L) != 0)) {
				{
				{
				setState(193);
				global();
				}
				}
				setState(198);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			setState(200);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==MAIN) {
				{
				setState(199);
				mainCall();
				}
			}

			setState(205);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==NL) {
				{
				{
				setState(202);
				match(NL);
				}
				}
				setState(207);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			setState(208);
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
	public static class GlobalBlockContext extends ParserRuleContext {
		public List<GlobalContext> global() {
			return getRuleContexts(GlobalContext.class);
		}
		public GlobalContext global(int i) {
			return getRuleContext(GlobalContext.class,i);
		}
		public GlobalBlockContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_globalBlock; }
	}

	public final GlobalBlockContext globalBlock() throws RecognitionException {
		GlobalBlockContext _localctx = new GlobalBlockContext(_ctx, getState());
		enterRule(_localctx, 2, RULE_globalBlock);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(211); 
			_errHandler.sync(this);
			_la = _input.LA(1);
			do {
				{
				{
				setState(210);
				global();
				}
				}
				setState(213); 
				_errHandler.sync(this);
				_la = _input.LA(1);
			} while ( _la==CLASS || _la==DEF || ((((_la - 96)) & ~0x3f) == 0 && ((1L << (_la - 96)) & 1073744897L) != 0) );
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
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
		public FunctionContext function() {
			return getRuleContext(FunctionContext.class,0);
		}
		public TestContext test() {
			return getRuleContext(TestContext.class,0);
		}
		public ProcedureContext procedure() {
			return getRuleContext(ProcedureContext.class,0);
		}
		public ConstantContext constant() {
			return getRuleContext(ConstantContext.class,0);
		}
		public EnumContext enum_() {
			return getRuleContext(EnumContext.class,0);
		}
		public ConcreteClassContext concreteClass() {
			return getRuleContext(ConcreteClassContext.class,0);
		}
		public AbstractClassContext abstractClass() {
			return getRuleContext(AbstractClassContext.class,0);
		}
		public CommentContext comment() {
			return getRuleContext(CommentContext.class,0);
		}
		public GlobalContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_global; }
	}

	public final GlobalContext global() throws RecognitionException {
		GlobalContext _localctx = new GlobalContext(_ctx, getState());
		enterRule(_localctx, 4, RULE_global);
		try {
			setState(224);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,5,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(215);
				main();
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(216);
				function();
				}
				break;
			case 3:
				enterOuterAlt(_localctx, 3);
				{
				setState(217);
				test();
				}
				break;
			case 4:
				enterOuterAlt(_localctx, 4);
				{
				setState(218);
				procedure();
				}
				break;
			case 5:
				enterOuterAlt(_localctx, 5);
				{
				setState(219);
				constant();
				}
				break;
			case 6:
				enterOuterAlt(_localctx, 6);
				{
				setState(220);
				enum_();
				}
				break;
			case 7:
				enterOuterAlt(_localctx, 7);
				{
				setState(221);
				concreteClass();
				}
				break;
			case 8:
				enterOuterAlt(_localctx, 8);
				{
				setState(222);
				abstractClass();
				}
				break;
			case 9:
				enterOuterAlt(_localctx, 9);
				{
				setState(223);
				comment();
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
	public static class MainContext extends ParserRuleContext {
		public TerminalNode DEF() { return getToken(PythonParser.DEF, 0); }
		public TerminalNode MAIN() { return getToken(PythonParser.MAIN, 0); }
		public TerminalNode OPEN_BRACKET() { return getToken(PythonParser.OPEN_BRACKET, 0); }
		public TerminalNode CLOSE_BRACKET() { return getToken(PythonParser.CLOSE_BRACKET, 0); }
		public TerminalNode ARROW() { return getToken(PythonParser.ARROW, 0); }
		public TerminalNode NONE() { return getToken(PythonParser.NONE, 0); }
		public TerminalNode COLON() { return getToken(PythonParser.COLON, 0); }
		public List<TerminalNode> NL() { return getTokens(PythonParser.NL); }
		public TerminalNode NL(int i) {
			return getToken(PythonParser.NL, i);
		}
		public TerminalNode END_MAIN() { return getToken(PythonParser.END_MAIN, 0); }
		public TerminalNode GHOSTED_BLOCK_START() { return getToken(PythonParser.GHOSTED_BLOCK_START, 0); }
		public List<OrdinaryStatementContext> ordinaryStatement() {
			return getRuleContexts(OrdinaryStatementContext.class);
		}
		public OrdinaryStatementContext ordinaryStatement(int i) {
			return getRuleContext(OrdinaryStatementContext.class,i);
		}
		public TerminalNode GHOSTED_BLOCK_END() { return getToken(PythonParser.GHOSTED_BLOCK_END, 0); }
		public MainContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_main; }
	}

	public final MainContext main() throws RecognitionException {
		MainContext _localctx = new MainContext(_ctx, getState());
		enterRule(_localctx, 6, RULE_main);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(227);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==GHOSTED_BLOCK_START) {
				{
				setState(226);
				match(GHOSTED_BLOCK_START);
				}
			}

			setState(229);
			match(DEF);
			setState(230);
			match(MAIN);
			setState(231);
			match(OPEN_BRACKET);
			setState(232);
			match(CLOSE_BRACKET);
			setState(233);
			match(ARROW);
			setState(234);
			match(NONE);
			setState(235);
			match(COLON);
			setState(236);
			match(NL);
			setState(240);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while ((((_la) & ~0x3f) == 0 && ((1L << _la) & 2013249770922970160L) != 0) || ((((_la - 73)) & ~0x3f) == 0 && ((1L << (_la - 73)) & 9007227163639893L) != 0)) {
				{
				{
				setState(237);
				ordinaryStatement();
				}
				}
				setState(242);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			setState(243);
			match(END_MAIN);
			setState(245);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==GHOSTED_BLOCK_END) {
				{
				setState(244);
				match(GHOSTED_BLOCK_END);
				}
			}

			setState(247);
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
	public static class MainCallContext extends ParserRuleContext {
		public TerminalNode MAIN() { return getToken(PythonParser.MAIN, 0); }
		public TerminalNode OPEN_BRACKET() { return getToken(PythonParser.OPEN_BRACKET, 0); }
		public TerminalNode CLOSE_BRACKET() { return getToken(PythonParser.CLOSE_BRACKET, 0); }
		public MainCallContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_mainCall; }
	}

	public final MainCallContext mainCall() throws RecognitionException {
		MainCallContext _localctx = new MainCallContext(_ctx, getState());
		enterRule(_localctx, 8, RULE_mainCall);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(249);
			match(MAIN);
			setState(250);
			match(OPEN_BRACKET);
			setState(251);
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
	public static class FunctionContext extends ParserRuleContext {
		public TerminalNode DEF() { return getToken(PythonParser.DEF, 0); }
		public MethodNameContext methodName() {
			return getRuleContext(MethodNameContext.class,0);
		}
		public TerminalNode OPEN_BRACKET() { return getToken(PythonParser.OPEN_BRACKET, 0); }
		public TerminalNode CLOSE_BRACKET() { return getToken(PythonParser.CLOSE_BRACKET, 0); }
		public TerminalNode ARROW() { return getToken(PythonParser.ARROW, 0); }
		public TypeContext type() {
			return getRuleContext(TypeContext.class,0);
		}
		public TerminalNode COLON() { return getToken(PythonParser.COLON, 0); }
		public List<TerminalNode> NL() { return getTokens(PythonParser.NL); }
		public TerminalNode NL(int i) {
			return getToken(PythonParser.NL, i);
		}
		public ReturnStatementContext returnStatement() {
			return getRuleContext(ReturnStatementContext.class,0);
		}
		public TerminalNode END_FUNCTION() { return getToken(PythonParser.END_FUNCTION, 0); }
		public TerminalNode GHOSTED_BLOCK_START() { return getToken(PythonParser.GHOSTED_BLOCK_START, 0); }
		public ParamListContext paramList() {
			return getRuleContext(ParamListContext.class,0);
		}
		public CommentTextContext commentText() {
			return getRuleContext(CommentTextContext.class,0);
		}
		public List<OrdinaryStatementContext> ordinaryStatement() {
			return getRuleContexts(OrdinaryStatementContext.class);
		}
		public OrdinaryStatementContext ordinaryStatement(int i) {
			return getRuleContext(OrdinaryStatementContext.class,i);
		}
		public TerminalNode GHOSTED_BLOCK_END() { return getToken(PythonParser.GHOSTED_BLOCK_END, 0); }
		public FunctionContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_function; }
	}

	public final FunctionContext function() throws RecognitionException {
		FunctionContext _localctx = new FunctionContext(_ctx, getState());
		enterRule(_localctx, 10, RULE_function);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(254);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==GHOSTED_BLOCK_START) {
				{
				setState(253);
				match(GHOSTED_BLOCK_START);
				}
			}

			setState(256);
			match(DEF);
			setState(257);
			methodName();
			setState(258);
			match(OPEN_BRACKET);
			setState(260);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==THIS_INSTANCE || _la==NAME_STARTING_LC) {
				{
				setState(259);
				paramList();
				}
			}

			setState(262);
			match(CLOSE_BRACKET);
			setState(263);
			match(ARROW);
			setState(264);
			type();
			setState(265);
			match(COLON);
			setState(267);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==COMMENT) {
				{
				setState(266);
				commentText();
				}
			}

			setState(269);
			match(NL);
			setState(273);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while ((((_la) & ~0x3f) == 0 && ((1L << _la) & 2013249770922970160L) != 0) || ((((_la - 73)) & ~0x3f) == 0 && ((1L << (_la - 73)) & 9007227163639893L) != 0)) {
				{
				{
				setState(270);
				ordinaryStatement();
				}
				}
				setState(275);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			setState(276);
			returnStatement();
			setState(277);
			match(END_FUNCTION);
			setState(279);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==GHOSTED_BLOCK_END) {
				{
				setState(278);
				match(GHOSTED_BLOCK_END);
				}
			}

			setState(281);
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
	public static class TestContext extends ParserRuleContext {
		public TerminalNode CLASS() { return getToken(PythonParser.CLASS, 0); }
		public List<TestClassNameContext> testClassName() {
			return getRuleContexts(TestClassNameContext.class);
		}
		public TestClassNameContext testClassName(int i) {
			return getRuleContext(TestClassNameContext.class,i);
		}
		public List<TerminalNode> OPEN_BRACKET() { return getTokens(PythonParser.OPEN_BRACKET); }
		public TerminalNode OPEN_BRACKET(int i) {
			return getToken(PythonParser.OPEN_BRACKET, i);
		}
		public TerminalNode TESTCASE() { return getToken(PythonParser.TESTCASE, 0); }
		public List<TerminalNode> CLOSE_BRACKET() { return getTokens(PythonParser.CLOSE_BRACKET); }
		public TerminalNode CLOSE_BRACKET(int i) {
			return getToken(PythonParser.CLOSE_BRACKET, i);
		}
		public List<TerminalNode> COLON() { return getTokens(PythonParser.COLON); }
		public TerminalNode COLON(int i) {
			return getToken(PythonParser.COLON, i);
		}
		public List<TerminalNode> NL() { return getTokens(PythonParser.NL); }
		public TerminalNode NL(int i) {
			return getToken(PythonParser.NL, i);
		}
		public TerminalNode DEF() { return getToken(PythonParser.DEF, 0); }
		public TestNameContext testName() {
			return getRuleContext(TestNameContext.class,0);
		}
		public TerminalNode THIS_INSTANCE() { return getToken(PythonParser.THIS_INSTANCE, 0); }
		public TerminalNode ARROW() { return getToken(PythonParser.ARROW, 0); }
		public TerminalNode NONE() { return getToken(PythonParser.NONE, 0); }
		public TerminalNode END_TEST() { return getToken(PythonParser.END_TEST, 0); }
		public TerminalNode GHOSTED_BLOCK_START() { return getToken(PythonParser.GHOSTED_BLOCK_START, 0); }
		public CommentTextContext commentText() {
			return getRuleContext(CommentTextContext.class,0);
		}
		public List<TestStatementContext> testStatement() {
			return getRuleContexts(TestStatementContext.class);
		}
		public TestStatementContext testStatement(int i) {
			return getRuleContext(TestStatementContext.class,i);
		}
		public TerminalNode GHOSTED_BLOCK_END() { return getToken(PythonParser.GHOSTED_BLOCK_END, 0); }
		public TestContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_test; }
	}

	public final TestContext test() throws RecognitionException {
		TestContext _localctx = new TestContext(_ctx, getState());
		enterRule(_localctx, 12, RULE_test);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(284);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==GHOSTED_BLOCK_START) {
				{
				setState(283);
				match(GHOSTED_BLOCK_START);
				}
			}

			setState(286);
			match(CLASS);
			setState(287);
			testClassName();
			setState(288);
			match(OPEN_BRACKET);
			setState(289);
			match(TESTCASE);
			setState(290);
			match(CLOSE_BRACKET);
			setState(291);
			match(COLON);
			setState(292);
			match(NL);
			setState(293);
			match(DEF);
			setState(294);
			testName();
			setState(295);
			match(OPEN_BRACKET);
			setState(296);
			match(THIS_INSTANCE);
			setState(297);
			match(COLON);
			setState(298);
			testClassName();
			setState(299);
			match(CLOSE_BRACKET);
			setState(300);
			match(ARROW);
			setState(301);
			match(NONE);
			setState(302);
			match(COLON);
			setState(304);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==COMMENT) {
				{
				setState(303);
				commentText();
				}
			}

			setState(306);
			match(NL);
			setState(310);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (((((_la - 73)) & ~0x3f) == 0 && ((1L << (_la - 73)) & 9007207853064193L) != 0)) {
				{
				{
				setState(307);
				testStatement();
				}
				}
				setState(312);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			setState(313);
			match(END_TEST);
			setState(315);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==GHOSTED_BLOCK_END) {
				{
				setState(314);
				match(GHOSTED_BLOCK_END);
				}
			}

			setState(317);
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
	public static class TestStatementContext extends ParserRuleContext {
		public AssertContext assert_() {
			return getRuleContext(AssertContext.class,0);
		}
		public VariableDefinitionContext variableDefinition() {
			return getRuleContext(VariableDefinitionContext.class,0);
		}
		public CommentContext comment() {
			return getRuleContext(CommentContext.class,0);
		}
		public TestStatementContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_testStatement; }
	}

	public final TestStatementContext testStatement() throws RecognitionException {
		TestStatementContext _localctx = new TestStatementContext(_ctx, getState());
		enterRule(_localctx, 14, RULE_testStatement);
		try {
			setState(322);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,18,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(319);
				assert_();
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(320);
				variableDefinition();
				}
				break;
			case 3:
				enterOuterAlt(_localctx, 3);
				{
				setState(321);
				comment();
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
	public static class ProcedureContext extends ParserRuleContext {
		public TerminalNode DEF() { return getToken(PythonParser.DEF, 0); }
		public MethodNameContext methodName() {
			return getRuleContext(MethodNameContext.class,0);
		}
		public TerminalNode OPEN_BRACKET() { return getToken(PythonParser.OPEN_BRACKET, 0); }
		public TerminalNode CLOSE_BRACKET() { return getToken(PythonParser.CLOSE_BRACKET, 0); }
		public TerminalNode ARROW() { return getToken(PythonParser.ARROW, 0); }
		public TerminalNode NONE() { return getToken(PythonParser.NONE, 0); }
		public TerminalNode COLON() { return getToken(PythonParser.COLON, 0); }
		public List<TerminalNode> NL() { return getTokens(PythonParser.NL); }
		public TerminalNode NL(int i) {
			return getToken(PythonParser.NL, i);
		}
		public TerminalNode END_PROCEDURE() { return getToken(PythonParser.END_PROCEDURE, 0); }
		public TerminalNode GHOSTED_BLOCK_START() { return getToken(PythonParser.GHOSTED_BLOCK_START, 0); }
		public ParamListContext paramList() {
			return getRuleContext(ParamListContext.class,0);
		}
		public CommentTextContext commentText() {
			return getRuleContext(CommentTextContext.class,0);
		}
		public List<OrdinaryStatementContext> ordinaryStatement() {
			return getRuleContexts(OrdinaryStatementContext.class);
		}
		public OrdinaryStatementContext ordinaryStatement(int i) {
			return getRuleContext(OrdinaryStatementContext.class,i);
		}
		public TerminalNode GHOSTED_BLOCK_END() { return getToken(PythonParser.GHOSTED_BLOCK_END, 0); }
		public ProcedureContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_procedure; }
	}

	public final ProcedureContext procedure() throws RecognitionException {
		ProcedureContext _localctx = new ProcedureContext(_ctx, getState());
		enterRule(_localctx, 16, RULE_procedure);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(325);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==GHOSTED_BLOCK_START) {
				{
				setState(324);
				match(GHOSTED_BLOCK_START);
				}
			}

			setState(327);
			match(DEF);
			setState(328);
			methodName();
			setState(329);
			match(OPEN_BRACKET);
			setState(331);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==THIS_INSTANCE || _la==NAME_STARTING_LC) {
				{
				setState(330);
				paramList();
				}
			}

			setState(333);
			match(CLOSE_BRACKET);
			setState(334);
			match(ARROW);
			setState(335);
			match(NONE);
			setState(336);
			match(COLON);
			setState(338);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==COMMENT) {
				{
				setState(337);
				commentText();
				}
			}

			setState(340);
			match(NL);
			setState(344);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while ((((_la) & ~0x3f) == 0 && ((1L << _la) & 2013249770922970160L) != 0) || ((((_la - 73)) & ~0x3f) == 0 && ((1L << (_la - 73)) & 9007227163639893L) != 0)) {
				{
				{
				setState(341);
				ordinaryStatement();
				}
				}
				setState(346);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			setState(347);
			match(END_PROCEDURE);
			setState(349);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==GHOSTED_BLOCK_END) {
				{
				setState(348);
				match(GHOSTED_BLOCK_END);
				}
			}

			setState(351);
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
	public static class ConstantContext extends ParserRuleContext {
		public IdentifierDefContext identifierDef() {
			return getRuleContext(IdentifierDefContext.class,0);
		}
		public TerminalNode SINGLE_EQUALS() { return getToken(PythonParser.SINGLE_EQUALS, 0); }
		public ConstantValueContext constantValue() {
			return getRuleContext(ConstantValueContext.class,0);
		}
		public TerminalNode NL() { return getToken(PythonParser.NL, 0); }
		public TerminalNode GHOSTED_LINE() { return getToken(PythonParser.GHOSTED_LINE, 0); }
		public CommentTextContext commentText() {
			return getRuleContext(CommentTextContext.class,0);
		}
		public ConstantContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_constant; }
	}

	public final ConstantContext constant() throws RecognitionException {
		ConstantContext _localctx = new ConstantContext(_ctx, getState());
		enterRule(_localctx, 18, RULE_constant);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(354);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==GHOSTED_LINE) {
				{
				setState(353);
				match(GHOSTED_LINE);
				}
			}

			setState(356);
			identifierDef();
			setState(357);
			match(SINGLE_EQUALS);
			setState(358);
			constantValue();
			setState(360);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==COMMENT) {
				{
				setState(359);
				commentText();
				}
			}

			setState(362);
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
	public static class EnumContext extends ParserRuleContext {
		public TerminalNode CLASS() { return getToken(PythonParser.CLASS, 0); }
		public TypeNameContext typeName() {
			return getRuleContext(TypeNameContext.class,0);
		}
		public TerminalNode OPEN_BRACKET() { return getToken(PythonParser.OPEN_BRACKET, 0); }
		public TerminalNode ENUM() { return getToken(PythonParser.ENUM, 0); }
		public TerminalNode CLOSE_BRACKET() { return getToken(PythonParser.CLOSE_BRACKET, 0); }
		public TerminalNode COLON() { return getToken(PythonParser.COLON, 0); }
		public List<TerminalNode> NL() { return getTokens(PythonParser.NL); }
		public TerminalNode NL(int i) {
			return getToken(PythonParser.NL, i);
		}
		public EnumListContext enumList() {
			return getRuleContext(EnumListContext.class,0);
		}
		public TerminalNode END_ENUM() { return getToken(PythonParser.END_ENUM, 0); }
		public TerminalNode GHOSTED_BLOCK_START() { return getToken(PythonParser.GHOSTED_BLOCK_START, 0); }
		public CommentTextContext commentText() {
			return getRuleContext(CommentTextContext.class,0);
		}
		public TerminalNode GHOSTED_BLOCK_END() { return getToken(PythonParser.GHOSTED_BLOCK_END, 0); }
		public EnumContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_enum; }
	}

	public final EnumContext enum_() throws RecognitionException {
		EnumContext _localctx = new EnumContext(_ctx, getState());
		enterRule(_localctx, 20, RULE_enum);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(365);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==GHOSTED_BLOCK_START) {
				{
				setState(364);
				match(GHOSTED_BLOCK_START);
				}
			}

			setState(367);
			match(CLASS);
			setState(368);
			typeName();
			setState(369);
			match(OPEN_BRACKET);
			setState(370);
			match(ENUM);
			setState(371);
			match(CLOSE_BRACKET);
			setState(372);
			match(COLON);
			setState(374);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==COMMENT) {
				{
				setState(373);
				commentText();
				}
			}

			setState(376);
			match(NL);
			setState(377);
			enumList();
			setState(378);
			match(NL);
			setState(379);
			match(END_ENUM);
			setState(381);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==GHOSTED_BLOCK_END) {
				{
				setState(380);
				match(GHOSTED_BLOCK_END);
				}
			}

			setState(383);
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
	public static class ConcreteClassContext extends ParserRuleContext {
		public TypeNameContext classTypeName;
		public TypeNameContext inheritsTypeName;
		public TerminalNode CLASS() { return getToken(PythonParser.CLASS, 0); }
		public TerminalNode COLON() { return getToken(PythonParser.COLON, 0); }
		public List<TerminalNode> NL() { return getTokens(PythonParser.NL); }
		public TerminalNode NL(int i) {
			return getToken(PythonParser.NL, i);
		}
		public ConstructorMemberContext constructorMember() {
			return getRuleContext(ConstructorMemberContext.class,0);
		}
		public TerminalNode END_CLASS() { return getToken(PythonParser.END_CLASS, 0); }
		public List<TypeNameContext> typeName() {
			return getRuleContexts(TypeNameContext.class);
		}
		public TypeNameContext typeName(int i) {
			return getRuleContext(TypeNameContext.class,i);
		}
		public TerminalNode GHOSTED_BLOCK_START() { return getToken(PythonParser.GHOSTED_BLOCK_START, 0); }
		public TerminalNode OPEN_BRACKET() { return getToken(PythonParser.OPEN_BRACKET, 0); }
		public TerminalNode CLOSE_BRACKET() { return getToken(PythonParser.CLOSE_BRACKET, 0); }
		public CommentTextContext commentText() {
			return getRuleContext(CommentTextContext.class,0);
		}
		public List<ConcreteClassMemberContext> concreteClassMember() {
			return getRuleContexts(ConcreteClassMemberContext.class);
		}
		public ConcreteClassMemberContext concreteClassMember(int i) {
			return getRuleContext(ConcreteClassMemberContext.class,i);
		}
		public TerminalNode GHOSTED_BLOCK_END() { return getToken(PythonParser.GHOSTED_BLOCK_END, 0); }
		public ConcreteClassContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_concreteClass; }
	}

	public final ConcreteClassContext concreteClass() throws RecognitionException {
		ConcreteClassContext _localctx = new ConcreteClassContext(_ctx, getState());
		enterRule(_localctx, 22, RULE_concreteClass);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(386);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==GHOSTED_BLOCK_START) {
				{
				setState(385);
				match(GHOSTED_BLOCK_START);
				}
			}

			setState(388);
			match(CLASS);
			setState(389);
			((ConcreteClassContext)_localctx).classTypeName = typeName();
			setState(394);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==OPEN_BRACKET) {
				{
				setState(390);
				match(OPEN_BRACKET);
				setState(391);
				((ConcreteClassContext)_localctx).inheritsTypeName = typeName();
				setState(392);
				match(CLOSE_BRACKET);
				}
			}

			setState(396);
			match(COLON);
			setState(398);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==COMMENT) {
				{
				setState(397);
				commentText();
				}
			}

			setState(400);
			match(NL);
			setState(401);
			constructorMember();
			setState(405);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==DEF || ((((_la - 96)) & ~0x3f) == 0 && ((1L << (_la - 96)) & 1073744897L) != 0)) {
				{
				{
				setState(402);
				concreteClassMember();
				}
				}
				setState(407);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			setState(408);
			match(END_CLASS);
			setState(410);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==GHOSTED_BLOCK_END) {
				{
				setState(409);
				match(GHOSTED_BLOCK_END);
				}
			}

			setState(412);
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
	public static class ConcreteClassMemberContext extends ParserRuleContext {
		public PropertyContext property() {
			return getRuleContext(PropertyContext.class,0);
		}
		public FunctionMethodContext functionMethod() {
			return getRuleContext(FunctionMethodContext.class,0);
		}
		public ProcedureMethodContext procedureMethod() {
			return getRuleContext(ProcedureMethodContext.class,0);
		}
		public CommentContext comment() {
			return getRuleContext(CommentContext.class,0);
		}
		public ConcreteClassMemberContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_concreteClassMember; }
	}

	public final ConcreteClassMemberContext concreteClassMember() throws RecognitionException {
		ConcreteClassMemberContext _localctx = new ConcreteClassMemberContext(_ctx, getState());
		enterRule(_localctx, 24, RULE_concreteClassMember);
		try {
			setState(418);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,34,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(414);
				property();
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(415);
				functionMethod();
				}
				break;
			case 3:
				enterOuterAlt(_localctx, 3);
				{
				setState(416);
				procedureMethod();
				}
				break;
			case 4:
				enterOuterAlt(_localctx, 4);
				{
				setState(417);
				comment();
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
	public static class AbstractClassContext extends ParserRuleContext {
		public TypeNameContext classTypeName;
		public TypeNameContext inheritsTypeName;
		public TerminalNode CLASS() { return getToken(PythonParser.CLASS, 0); }
		public TerminalNode COLON() { return getToken(PythonParser.COLON, 0); }
		public List<TerminalNode> NL() { return getTokens(PythonParser.NL); }
		public TerminalNode NL(int i) {
			return getToken(PythonParser.NL, i);
		}
		public TerminalNode END_CLASS() { return getToken(PythonParser.END_CLASS, 0); }
		public List<TypeNameContext> typeName() {
			return getRuleContexts(TypeNameContext.class);
		}
		public TypeNameContext typeName(int i) {
			return getRuleContext(TypeNameContext.class,i);
		}
		public TerminalNode OPEN_BRACKET() { return getToken(PythonParser.OPEN_BRACKET, 0); }
		public TerminalNode CLOSE_BRACKET() { return getToken(PythonParser.CLOSE_BRACKET, 0); }
		public TerminalNode GHOSTED_BLOCK_START() { return getToken(PythonParser.GHOSTED_BLOCK_START, 0); }
		public CommentTextContext commentText() {
			return getRuleContext(CommentTextContext.class,0);
		}
		public List<AbstractClassMemberContext> abstractClassMember() {
			return getRuleContexts(AbstractClassMemberContext.class);
		}
		public AbstractClassMemberContext abstractClassMember(int i) {
			return getRuleContext(AbstractClassMemberContext.class,i);
		}
		public TerminalNode GHOSTED_BLOCK_END() { return getToken(PythonParser.GHOSTED_BLOCK_END, 0); }
		public TerminalNode ABC() { return getToken(PythonParser.ABC, 0); }
		public AbstractClassContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_abstractClass; }
	}

	public final AbstractClassContext abstractClass() throws RecognitionException {
		AbstractClassContext _localctx = new AbstractClassContext(_ctx, getState());
		enterRule(_localctx, 26, RULE_abstractClass);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(421);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==GHOSTED_BLOCK_START) {
				{
				setState(420);
				match(GHOSTED_BLOCK_START);
				}
			}

			setState(423);
			match(CLASS);
			setState(424);
			((AbstractClassContext)_localctx).classTypeName = typeName();
			{
			setState(425);
			match(OPEN_BRACKET);
			setState(428);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case INT_NAME:
			case FLOAT_NAME:
			case BOOL_NAME:
			case STRING_NAME:
			case LIST_NAME:
			case DICT_NAME:
			case NAME_STARTING_UC:
				{
				setState(426);
				((AbstractClassContext)_localctx).inheritsTypeName = typeName();
				}
				break;
			case ABC:
				{
				setState(427);
				match(ABC);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			setState(430);
			match(CLOSE_BRACKET);
			}
			setState(432);
			match(COLON);
			setState(434);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==COMMENT) {
				{
				setState(433);
				commentText();
				}
			}

			setState(436);
			match(NL);
			setState(440);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==DEF || ((((_la - 96)) & ~0x3f) == 0 && ((1L << (_la - 96)) & 1610615809L) != 0)) {
				{
				{
				setState(437);
				abstractClassMember();
				}
				}
				setState(442);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			setState(443);
			match(END_CLASS);
			setState(445);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==GHOSTED_BLOCK_END) {
				{
				setState(444);
				match(GHOSTED_BLOCK_END);
				}
			}

			setState(447);
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
	public static class AbstractClassMemberContext extends ParserRuleContext {
		public PropertyContext property() {
			return getRuleContext(PropertyContext.class,0);
		}
		public FunctionMethodContext functionMethod() {
			return getRuleContext(FunctionMethodContext.class,0);
		}
		public ProcedureMethodContext procedureMethod() {
			return getRuleContext(ProcedureMethodContext.class,0);
		}
		public AbstractFunctionContext abstractFunction() {
			return getRuleContext(AbstractFunctionContext.class,0);
		}
		public AbstractProcedureContext abstractProcedure() {
			return getRuleContext(AbstractProcedureContext.class,0);
		}
		public CommentContext comment() {
			return getRuleContext(CommentContext.class,0);
		}
		public AbstractClassMemberContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_abstractClassMember; }
	}

	public final AbstractClassMemberContext abstractClassMember() throws RecognitionException {
		AbstractClassMemberContext _localctx = new AbstractClassMemberContext(_ctx, getState());
		enterRule(_localctx, 28, RULE_abstractClassMember);
		try {
			setState(455);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,40,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(449);
				property();
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(450);
				functionMethod();
				}
				break;
			case 3:
				enterOuterAlt(_localctx, 3);
				{
				setState(451);
				procedureMethod();
				}
				break;
			case 4:
				enterOuterAlt(_localctx, 4);
				{
				setState(452);
				abstractFunction();
				}
				break;
			case 5:
				enterOuterAlt(_localctx, 5);
				{
				setState(453);
				abstractProcedure();
				}
				break;
			case 6:
				enterOuterAlt(_localctx, 6);
				{
				setState(454);
				comment();
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
	public static class CommentContext extends ParserRuleContext {
		public CommentTextContext commentText() {
			return getRuleContext(CommentTextContext.class,0);
		}
		public TerminalNode NL() { return getToken(PythonParser.NL, 0); }
		public TerminalNode GHOSTED_LINE() { return getToken(PythonParser.GHOSTED_LINE, 0); }
		public CommentContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_comment; }
	}

	public final CommentContext comment() throws RecognitionException {
		CommentContext _localctx = new CommentContext(_ctx, getState());
		enterRule(_localctx, 30, RULE_comment);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(458);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==GHOSTED_LINE) {
				{
				setState(457);
				match(GHOSTED_LINE);
				}
			}

			setState(460);
			commentText();
			setState(461);
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
	public static class CommentTextContext extends ParserRuleContext {
		public TerminalNode COMMENT() { return getToken(PythonParser.COMMENT, 0); }
		public CommentTextContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_commentText; }
	}

	public final CommentTextContext commentText() throws RecognitionException {
		CommentTextContext _localctx = new CommentTextContext(_ctx, getState());
		enterRule(_localctx, 32, RULE_commentText);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(463);
			match(COMMENT);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
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
		public List<SelectableStatementContext> selectableStatement() {
			return getRuleContexts(SelectableStatementContext.class);
		}
		public SelectableStatementContext selectableStatement(int i) {
			return getRuleContext(SelectableStatementContext.class,i);
		}
		public StatementBlockContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_statementBlock; }
	}

	public final StatementBlockContext statementBlock() throws RecognitionException {
		StatementBlockContext _localctx = new StatementBlockContext(_ctx, getState());
		enterRule(_localctx, 34, RULE_statementBlock);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(466); 
			_errHandler.sync(this);
			_la = _input.LA(1);
			do {
				{
				{
				setState(465);
				selectableStatement();
				}
				}
				setState(468); 
				_errHandler.sync(this);
				_la = _input.LA(1);
			} while ( (((_la) & ~0x3f) == 0 && ((1L << _la) & 2013258567015992380L) != 0) || ((((_la - 73)) & ~0x3f) == 0 && ((1L << (_la - 73)) & 9007227163639893L) != 0) );
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class SelectableStatementContext extends ParserRuleContext {
		public VariableDefinitionContext variableDefinition() {
			return getRuleContext(VariableDefinitionContext.class,0);
		}
		public AssertContext assert_() {
			return getRuleContext(AssertContext.class,0);
		}
		public AssignmentContext assignment() {
			return getRuleContext(AssignmentContext.class,0);
		}
		public IfStatementContext ifStatement() {
			return getRuleContext(IfStatementContext.class,0);
		}
		public ElseIfClauseContext elseIfClause() {
			return getRuleContext(ElseIfClauseContext.class,0);
		}
		public ElseClauseContext elseClause() {
			return getRuleContext(ElseClauseContext.class,0);
		}
		public WhileLoopContext whileLoop() {
			return getRuleContext(WhileLoopContext.class,0);
		}
		public ForLoopContext forLoop() {
			return getRuleContext(ForLoopContext.class,0);
		}
		public ProcedureCallContext procedureCall() {
			return getRuleContext(ProcedureCallContext.class,0);
		}
		public TryStatementContext tryStatement() {
			return getRuleContext(TryStatementContext.class,0);
		}
		public CatchClauseContext catchClause() {
			return getRuleContext(CatchClauseContext.class,0);
		}
		public ThrowStatementContext throwStatement() {
			return getRuleContext(ThrowStatementContext.class,0);
		}
		public CommentContext comment() {
			return getRuleContext(CommentContext.class,0);
		}
		public SelectableStatementContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_selectableStatement; }
	}

	public final SelectableStatementContext selectableStatement() throws RecognitionException {
		SelectableStatementContext _localctx = new SelectableStatementContext(_ctx, getState());
		enterRule(_localctx, 36, RULE_selectableStatement);
		try {
			setState(483);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,43,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(470);
				variableDefinition();
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(471);
				assert_();
				}
				break;
			case 3:
				enterOuterAlt(_localctx, 3);
				{
				setState(472);
				assignment();
				}
				break;
			case 4:
				enterOuterAlt(_localctx, 4);
				{
				setState(473);
				ifStatement();
				}
				break;
			case 5:
				enterOuterAlt(_localctx, 5);
				{
				setState(474);
				elseIfClause();
				}
				break;
			case 6:
				enterOuterAlt(_localctx, 6);
				{
				setState(475);
				elseClause();
				}
				break;
			case 7:
				enterOuterAlt(_localctx, 7);
				{
				setState(476);
				whileLoop();
				}
				break;
			case 8:
				enterOuterAlt(_localctx, 8);
				{
				setState(477);
				forLoop();
				}
				break;
			case 9:
				enterOuterAlt(_localctx, 9);
				{
				setState(478);
				procedureCall();
				}
				break;
			case 10:
				enterOuterAlt(_localctx, 10);
				{
				setState(479);
				tryStatement();
				}
				break;
			case 11:
				enterOuterAlt(_localctx, 11);
				{
				setState(480);
				catchClause();
				}
				break;
			case 12:
				enterOuterAlt(_localctx, 12);
				{
				setState(481);
				throwStatement();
				}
				break;
			case 13:
				enterOuterAlt(_localctx, 13);
				{
				setState(482);
				comment();
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
	public static class OrdinaryStatementContext extends ParserRuleContext {
		public VariableDefinitionContext variableDefinition() {
			return getRuleContext(VariableDefinitionContext.class,0);
		}
		public AssignmentContext assignment() {
			return getRuleContext(AssignmentContext.class,0);
		}
		public IfStatementContext ifStatement() {
			return getRuleContext(IfStatementContext.class,0);
		}
		public WhileLoopContext whileLoop() {
			return getRuleContext(WhileLoopContext.class,0);
		}
		public ForLoopContext forLoop() {
			return getRuleContext(ForLoopContext.class,0);
		}
		public ProcedureCallContext procedureCall() {
			return getRuleContext(ProcedureCallContext.class,0);
		}
		public TryStatementContext tryStatement() {
			return getRuleContext(TryStatementContext.class,0);
		}
		public ThrowStatementContext throwStatement() {
			return getRuleContext(ThrowStatementContext.class,0);
		}
		public CommentContext comment() {
			return getRuleContext(CommentContext.class,0);
		}
		public OrdinaryStatementContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_ordinaryStatement; }
	}

	public final OrdinaryStatementContext ordinaryStatement() throws RecognitionException {
		OrdinaryStatementContext _localctx = new OrdinaryStatementContext(_ctx, getState());
		enterRule(_localctx, 38, RULE_ordinaryStatement);
		try {
			setState(494);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,44,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(485);
				variableDefinition();
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(486);
				assignment();
				}
				break;
			case 3:
				enterOuterAlt(_localctx, 3);
				{
				setState(487);
				ifStatement();
				}
				break;
			case 4:
				enterOuterAlt(_localctx, 4);
				{
				setState(488);
				whileLoop();
				}
				break;
			case 5:
				enterOuterAlt(_localctx, 5);
				{
				setState(489);
				forLoop();
				}
				break;
			case 6:
				enterOuterAlt(_localctx, 6);
				{
				setState(490);
				procedureCall();
				}
				break;
			case 7:
				enterOuterAlt(_localctx, 7);
				{
				setState(491);
				tryStatement();
				}
				break;
			case 8:
				enterOuterAlt(_localctx, 8);
				{
				setState(492);
				throwStatement();
				}
				break;
			case 9:
				enterOuterAlt(_localctx, 9);
				{
				setState(493);
				comment();
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
	public static class VariableDefinitionContext extends ParserRuleContext {
		public IdentifierDefContext identifierDef() {
			return getRuleContext(IdentifierDefContext.class,0);
		}
		public TerminalNode SINGLE_EQUALS() { return getToken(PythonParser.SINGLE_EQUALS, 0); }
		public ExpressionContext expression() {
			return getRuleContext(ExpressionContext.class,0);
		}
		public TerminalNode VARIABLE_DEFINITION_ANNOTATION() { return getToken(PythonParser.VARIABLE_DEFINITION_ANNOTATION, 0); }
		public TerminalNode NL() { return getToken(PythonParser.NL, 0); }
		public TerminalNode GHOSTED_LINE() { return getToken(PythonParser.GHOSTED_LINE, 0); }
		public VariableDefinitionContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_variableDefinition; }
	}

	public final VariableDefinitionContext variableDefinition() throws RecognitionException {
		VariableDefinitionContext _localctx = new VariableDefinitionContext(_ctx, getState());
		enterRule(_localctx, 40, RULE_variableDefinition);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(497);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==GHOSTED_LINE) {
				{
				setState(496);
				match(GHOSTED_LINE);
				}
			}

			setState(499);
			identifierDef();
			setState(500);
			match(SINGLE_EQUALS);
			setState(501);
			expression(0);
			setState(502);
			match(VARIABLE_DEFINITION_ANNOTATION);
			setState(503);
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
	public static class AssignmentContext extends ParserRuleContext {
		public AssignableContext assignable() {
			return getRuleContext(AssignableContext.class,0);
		}
		public TerminalNode SINGLE_EQUALS() { return getToken(PythonParser.SINGLE_EQUALS, 0); }
		public ExpressionContext expression() {
			return getRuleContext(ExpressionContext.class,0);
		}
		public TerminalNode ASSIGNMENT_ANNOTATION() { return getToken(PythonParser.ASSIGNMENT_ANNOTATION, 0); }
		public TerminalNode NL() { return getToken(PythonParser.NL, 0); }
		public TerminalNode GHOSTED_LINE() { return getToken(PythonParser.GHOSTED_LINE, 0); }
		public AssignmentContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_assignment; }
	}

	public final AssignmentContext assignment() throws RecognitionException {
		AssignmentContext _localctx = new AssignmentContext(_ctx, getState());
		enterRule(_localctx, 42, RULE_assignment);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(506);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==GHOSTED_LINE) {
				{
				setState(505);
				match(GHOSTED_LINE);
				}
			}

			setState(508);
			assignable(0);
			setState(509);
			match(SINGLE_EQUALS);
			setState(510);
			expression(0);
			setState(511);
			match(ASSIGNMENT_ANNOTATION);
			setState(512);
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
	public static class IfStatementContext extends ParserRuleContext {
		public ExpressionContext condition;
		public TerminalNode IF() { return getToken(PythonParser.IF, 0); }
		public TerminalNode COLON() { return getToken(PythonParser.COLON, 0); }
		public List<TerminalNode> NL() { return getTokens(PythonParser.NL); }
		public TerminalNode NL(int i) {
			return getToken(PythonParser.NL, i);
		}
		public ThenClauseContext thenClause() {
			return getRuleContext(ThenClauseContext.class,0);
		}
		public TerminalNode END_IF() { return getToken(PythonParser.END_IF, 0); }
		public ExpressionContext expression() {
			return getRuleContext(ExpressionContext.class,0);
		}
		public TerminalNode GHOSTED_BLOCK_START() { return getToken(PythonParser.GHOSTED_BLOCK_START, 0); }
		public CommentTextContext commentText() {
			return getRuleContext(CommentTextContext.class,0);
		}
		public List<ElseIfClauseContext> elseIfClause() {
			return getRuleContexts(ElseIfClauseContext.class);
		}
		public ElseIfClauseContext elseIfClause(int i) {
			return getRuleContext(ElseIfClauseContext.class,i);
		}
		public ElseClauseContext elseClause() {
			return getRuleContext(ElseClauseContext.class,0);
		}
		public TerminalNode GHOSTED_BLOCK_END() { return getToken(PythonParser.GHOSTED_BLOCK_END, 0); }
		public IfStatementContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_ifStatement; }
	}

	public final IfStatementContext ifStatement() throws RecognitionException {
		IfStatementContext _localctx = new IfStatementContext(_ctx, getState());
		enterRule(_localctx, 44, RULE_ifStatement);
		int _la;
		try {
			int _alt;
			enterOuterAlt(_localctx, 1);
			{
			setState(515);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==GHOSTED_BLOCK_START) {
				{
				setState(514);
				match(GHOSTED_BLOCK_START);
				}
			}

			setState(517);
			match(IF);
			setState(518);
			((IfStatementContext)_localctx).condition = expression(0);
			setState(519);
			match(COLON);
			setState(521);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==COMMENT) {
				{
				setState(520);
				commentText();
				}
			}

			setState(523);
			match(NL);
			setState(524);
			thenClause();
			setState(528);
			_errHandler.sync(this);
			_alt = getInterpreter().adaptivePredict(_input,49,_ctx);
			while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER ) {
				if ( _alt==1 ) {
					{
					{
					setState(525);
					elseIfClause();
					}
					} 
				}
				setState(530);
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,49,_ctx);
			}
			setState(532);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==ELSE || _la==GHOSTED_BLOCK_START) {
				{
				setState(531);
				elseClause();
				}
			}

			setState(534);
			match(END_IF);
			setState(536);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==GHOSTED_BLOCK_END) {
				{
				setState(535);
				match(GHOSTED_BLOCK_END);
				}
			}

			setState(538);
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
	public static class ThenClauseContext extends ParserRuleContext {
		public List<OrdinaryStatementContext> ordinaryStatement() {
			return getRuleContexts(OrdinaryStatementContext.class);
		}
		public OrdinaryStatementContext ordinaryStatement(int i) {
			return getRuleContext(OrdinaryStatementContext.class,i);
		}
		public ThenClauseContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_thenClause; }
	}

	public final ThenClauseContext thenClause() throws RecognitionException {
		ThenClauseContext _localctx = new ThenClauseContext(_ctx, getState());
		enterRule(_localctx, 46, RULE_thenClause);
		try {
			int _alt;
			enterOuterAlt(_localctx, 1);
			{
			setState(543);
			_errHandler.sync(this);
			_alt = getInterpreter().adaptivePredict(_input,52,_ctx);
			while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER ) {
				if ( _alt==1 ) {
					{
					{
					setState(540);
					ordinaryStatement();
					}
					} 
				}
				setState(545);
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,52,_ctx);
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
	public static class ElseIfClauseContext extends ParserRuleContext {
		public TerminalNode ELIF() { return getToken(PythonParser.ELIF, 0); }
		public ExpressionContext expression() {
			return getRuleContext(ExpressionContext.class,0);
		}
		public TerminalNode COLON() { return getToken(PythonParser.COLON, 0); }
		public TerminalNode NL() { return getToken(PythonParser.NL, 0); }
		public TerminalNode GHOSTED_BLOCK_START() { return getToken(PythonParser.GHOSTED_BLOCK_START, 0); }
		public CommentTextContext commentText() {
			return getRuleContext(CommentTextContext.class,0);
		}
		public List<OrdinaryStatementContext> ordinaryStatement() {
			return getRuleContexts(OrdinaryStatementContext.class);
		}
		public OrdinaryStatementContext ordinaryStatement(int i) {
			return getRuleContext(OrdinaryStatementContext.class,i);
		}
		public TerminalNode GHOSTED_BLOCK_END() { return getToken(PythonParser.GHOSTED_BLOCK_END, 0); }
		public ElseIfClauseContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_elseIfClause; }
	}

	public final ElseIfClauseContext elseIfClause() throws RecognitionException {
		ElseIfClauseContext _localctx = new ElseIfClauseContext(_ctx, getState());
		enterRule(_localctx, 48, RULE_elseIfClause);
		int _la;
		try {
			int _alt;
			enterOuterAlt(_localctx, 1);
			{
			setState(547);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==GHOSTED_BLOCK_START) {
				{
				setState(546);
				match(GHOSTED_BLOCK_START);
				}
			}

			setState(549);
			match(ELIF);
			setState(550);
			expression(0);
			setState(551);
			match(COLON);
			setState(553);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==COMMENT) {
				{
				setState(552);
				commentText();
				}
			}

			setState(555);
			match(NL);
			setState(559);
			_errHandler.sync(this);
			_alt = getInterpreter().adaptivePredict(_input,55,_ctx);
			while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER ) {
				if ( _alt==1 ) {
					{
					{
					setState(556);
					ordinaryStatement();
					}
					} 
				}
				setState(561);
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,55,_ctx);
			}
			setState(563);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==GHOSTED_BLOCK_END) {
				{
				setState(562);
				match(GHOSTED_BLOCK_END);
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
	public static class ElseClauseContext extends ParserRuleContext {
		public TerminalNode ELSE() { return getToken(PythonParser.ELSE, 0); }
		public TerminalNode COLON() { return getToken(PythonParser.COLON, 0); }
		public TerminalNode NL() { return getToken(PythonParser.NL, 0); }
		public TerminalNode GHOSTED_BLOCK_START() { return getToken(PythonParser.GHOSTED_BLOCK_START, 0); }
		public CommentTextContext commentText() {
			return getRuleContext(CommentTextContext.class,0);
		}
		public List<OrdinaryStatementContext> ordinaryStatement() {
			return getRuleContexts(OrdinaryStatementContext.class);
		}
		public OrdinaryStatementContext ordinaryStatement(int i) {
			return getRuleContext(OrdinaryStatementContext.class,i);
		}
		public TerminalNode GHOSTED_BLOCK_END() { return getToken(PythonParser.GHOSTED_BLOCK_END, 0); }
		public ElseClauseContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_elseClause; }
	}

	public final ElseClauseContext elseClause() throws RecognitionException {
		ElseClauseContext _localctx = new ElseClauseContext(_ctx, getState());
		enterRule(_localctx, 50, RULE_elseClause);
		int _la;
		try {
			int _alt;
			enterOuterAlt(_localctx, 1);
			{
			setState(566);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==GHOSTED_BLOCK_START) {
				{
				setState(565);
				match(GHOSTED_BLOCK_START);
				}
			}

			setState(568);
			match(ELSE);
			setState(569);
			match(COLON);
			setState(571);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==COMMENT) {
				{
				setState(570);
				commentText();
				}
			}

			setState(573);
			match(NL);
			setState(577);
			_errHandler.sync(this);
			_alt = getInterpreter().adaptivePredict(_input,59,_ctx);
			while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER ) {
				if ( _alt==1 ) {
					{
					{
					setState(574);
					ordinaryStatement();
					}
					} 
				}
				setState(579);
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,59,_ctx);
			}
			setState(581);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==GHOSTED_BLOCK_END) {
				{
				setState(580);
				match(GHOSTED_BLOCK_END);
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
	public static class WhileLoopContext extends ParserRuleContext {
		public TerminalNode WHILE() { return getToken(PythonParser.WHILE, 0); }
		public ExpressionContext expression() {
			return getRuleContext(ExpressionContext.class,0);
		}
		public TerminalNode COLON() { return getToken(PythonParser.COLON, 0); }
		public List<TerminalNode> NL() { return getTokens(PythonParser.NL); }
		public TerminalNode NL(int i) {
			return getToken(PythonParser.NL, i);
		}
		public TerminalNode END_WHILE() { return getToken(PythonParser.END_WHILE, 0); }
		public TerminalNode GHOSTED_BLOCK_START() { return getToken(PythonParser.GHOSTED_BLOCK_START, 0); }
		public CommentTextContext commentText() {
			return getRuleContext(CommentTextContext.class,0);
		}
		public List<OrdinaryStatementContext> ordinaryStatement() {
			return getRuleContexts(OrdinaryStatementContext.class);
		}
		public OrdinaryStatementContext ordinaryStatement(int i) {
			return getRuleContext(OrdinaryStatementContext.class,i);
		}
		public TerminalNode GHOSTED_BLOCK_END() { return getToken(PythonParser.GHOSTED_BLOCK_END, 0); }
		public WhileLoopContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_whileLoop; }
	}

	public final WhileLoopContext whileLoop() throws RecognitionException {
		WhileLoopContext _localctx = new WhileLoopContext(_ctx, getState());
		enterRule(_localctx, 52, RULE_whileLoop);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(584);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==GHOSTED_BLOCK_START) {
				{
				setState(583);
				match(GHOSTED_BLOCK_START);
				}
			}

			setState(586);
			match(WHILE);
			setState(587);
			expression(0);
			setState(588);
			match(COLON);
			setState(590);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==COMMENT) {
				{
				setState(589);
				commentText();
				}
			}

			setState(592);
			match(NL);
			setState(596);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while ((((_la) & ~0x3f) == 0 && ((1L << _la) & 2013249770922970160L) != 0) || ((((_la - 73)) & ~0x3f) == 0 && ((1L << (_la - 73)) & 9007227163639893L) != 0)) {
				{
				{
				setState(593);
				ordinaryStatement();
				}
				}
				setState(598);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			setState(599);
			match(END_WHILE);
			setState(601);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==GHOSTED_BLOCK_END) {
				{
				setState(600);
				match(GHOSTED_BLOCK_END);
				}
			}

			setState(603);
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
	public static class ForLoopContext extends ParserRuleContext {
		public TerminalNode FOR() { return getToken(PythonParser.FOR, 0); }
		public IdentifierDefContext identifierDef() {
			return getRuleContext(IdentifierDefContext.class,0);
		}
		public TerminalNode IN() { return getToken(PythonParser.IN, 0); }
		public ExpressionContext expression() {
			return getRuleContext(ExpressionContext.class,0);
		}
		public TerminalNode COLON() { return getToken(PythonParser.COLON, 0); }
		public List<TerminalNode> NL() { return getTokens(PythonParser.NL); }
		public TerminalNode NL(int i) {
			return getToken(PythonParser.NL, i);
		}
		public TerminalNode END_FOR() { return getToken(PythonParser.END_FOR, 0); }
		public TerminalNode GHOSTED_BLOCK_START() { return getToken(PythonParser.GHOSTED_BLOCK_START, 0); }
		public CommentTextContext commentText() {
			return getRuleContext(CommentTextContext.class,0);
		}
		public List<OrdinaryStatementContext> ordinaryStatement() {
			return getRuleContexts(OrdinaryStatementContext.class);
		}
		public OrdinaryStatementContext ordinaryStatement(int i) {
			return getRuleContext(OrdinaryStatementContext.class,i);
		}
		public TerminalNode GHOSTED_BLOCK_END() { return getToken(PythonParser.GHOSTED_BLOCK_END, 0); }
		public ForLoopContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_forLoop; }
	}

	public final ForLoopContext forLoop() throws RecognitionException {
		ForLoopContext _localctx = new ForLoopContext(_ctx, getState());
		enterRule(_localctx, 54, RULE_forLoop);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(606);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==GHOSTED_BLOCK_START) {
				{
				setState(605);
				match(GHOSTED_BLOCK_START);
				}
			}

			setState(608);
			match(FOR);
			setState(609);
			identifierDef();
			setState(610);
			match(IN);
			setState(611);
			expression(0);
			setState(612);
			match(COLON);
			setState(614);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==COMMENT) {
				{
				setState(613);
				commentText();
				}
			}

			setState(616);
			match(NL);
			setState(620);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while ((((_la) & ~0x3f) == 0 && ((1L << _la) & 2013249770922970160L) != 0) || ((((_la - 73)) & ~0x3f) == 0 && ((1L << (_la - 73)) & 9007227163639893L) != 0)) {
				{
				{
				setState(617);
				ordinaryStatement();
				}
				}
				setState(622);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			setState(623);
			match(END_FOR);
			setState(625);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==GHOSTED_BLOCK_END) {
				{
				setState(624);
				match(GHOSTED_BLOCK_END);
				}
			}

			setState(627);
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
	public static class ProcedureCallContext extends ParserRuleContext {
		public TermContext term() {
			return getRuleContext(TermContext.class,0);
		}
		public TerminalNode NL() { return getToken(PythonParser.NL, 0); }
		public TerminalNode GHOSTED_LINE() { return getToken(PythonParser.GHOSTED_LINE, 0); }
		public CommentTextContext commentText() {
			return getRuleContext(CommentTextContext.class,0);
		}
		public ProcedureCallContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_procedureCall; }
	}

	public final ProcedureCallContext procedureCall() throws RecognitionException {
		ProcedureCallContext _localctx = new ProcedureCallContext(_ctx, getState());
		enterRule(_localctx, 56, RULE_procedureCall);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(630);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==GHOSTED_LINE) {
				{
				setState(629);
				match(GHOSTED_LINE);
				}
			}

			setState(632);
			term(0);
			setState(634);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==COMMENT) {
				{
				setState(633);
				commentText();
				}
			}

			setState(636);
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
	public static class TryStatementContext extends ParserRuleContext {
		public TerminalNode TRY() { return getToken(PythonParser.TRY, 0); }
		public TerminalNode COLON() { return getToken(PythonParser.COLON, 0); }
		public List<TerminalNode> NL() { return getTokens(PythonParser.NL); }
		public TerminalNode NL(int i) {
			return getToken(PythonParser.NL, i);
		}
		public TryClauseContext tryClause() {
			return getRuleContext(TryClauseContext.class,0);
		}
		public TerminalNode END_TRY() { return getToken(PythonParser.END_TRY, 0); }
		public TerminalNode GHOSTED_BLOCK_START() { return getToken(PythonParser.GHOSTED_BLOCK_START, 0); }
		public CommentTextContext commentText() {
			return getRuleContext(CommentTextContext.class,0);
		}
		public List<CatchClauseContext> catchClause() {
			return getRuleContexts(CatchClauseContext.class);
		}
		public CatchClauseContext catchClause(int i) {
			return getRuleContext(CatchClauseContext.class,i);
		}
		public TerminalNode GHOSTED_BLOCK_END() { return getToken(PythonParser.GHOSTED_BLOCK_END, 0); }
		public TryStatementContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_tryStatement; }
	}

	public final TryStatementContext tryStatement() throws RecognitionException {
		TryStatementContext _localctx = new TryStatementContext(_ctx, getState());
		enterRule(_localctx, 58, RULE_tryStatement);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(639);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==GHOSTED_BLOCK_START) {
				{
				setState(638);
				match(GHOSTED_BLOCK_START);
				}
			}

			setState(641);
			match(TRY);
			setState(642);
			match(COLON);
			setState(644);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==COMMENT) {
				{
				setState(643);
				commentText();
				}
			}

			setState(646);
			match(NL);
			setState(647);
			tryClause();
			setState(649); 
			_errHandler.sync(this);
			_la = _input.LA(1);
			do {
				{
				{
				setState(648);
				catchClause();
				}
				}
				setState(651); 
				_errHandler.sync(this);
				_la = _input.LA(1);
			} while ( _la==EXCEPT || _la==GHOSTED_BLOCK_START );
			setState(653);
			match(END_TRY);
			setState(655);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==GHOSTED_BLOCK_END) {
				{
				setState(654);
				match(GHOSTED_BLOCK_END);
				}
			}

			setState(657);
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
	public static class TryClauseContext extends ParserRuleContext {
		public List<OrdinaryStatementContext> ordinaryStatement() {
			return getRuleContexts(OrdinaryStatementContext.class);
		}
		public OrdinaryStatementContext ordinaryStatement(int i) {
			return getRuleContext(OrdinaryStatementContext.class,i);
		}
		public TryClauseContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_tryClause; }
	}

	public final TryClauseContext tryClause() throws RecognitionException {
		TryClauseContext _localctx = new TryClauseContext(_ctx, getState());
		enterRule(_localctx, 60, RULE_tryClause);
		try {
			int _alt;
			enterOuterAlt(_localctx, 1);
			{
			setState(662);
			_errHandler.sync(this);
			_alt = getInterpreter().adaptivePredict(_input,75,_ctx);
			while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER ) {
				if ( _alt==1 ) {
					{
					{
					setState(659);
					ordinaryStatement();
					}
					} 
				}
				setState(664);
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,75,_ctx);
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
	public static class CatchClauseContext extends ParserRuleContext {
		public TerminalNode EXCEPT() { return getToken(PythonParser.EXCEPT, 0); }
		public TypeNameContext typeName() {
			return getRuleContext(TypeNameContext.class,0);
		}
		public TerminalNode AS() { return getToken(PythonParser.AS, 0); }
		public IdentifierDefContext identifierDef() {
			return getRuleContext(IdentifierDefContext.class,0);
		}
		public TerminalNode COLON() { return getToken(PythonParser.COLON, 0); }
		public TerminalNode NL() { return getToken(PythonParser.NL, 0); }
		public TerminalNode GHOSTED_BLOCK_START() { return getToken(PythonParser.GHOSTED_BLOCK_START, 0); }
		public CommentTextContext commentText() {
			return getRuleContext(CommentTextContext.class,0);
		}
		public List<OrdinaryStatementContext> ordinaryStatement() {
			return getRuleContexts(OrdinaryStatementContext.class);
		}
		public OrdinaryStatementContext ordinaryStatement(int i) {
			return getRuleContext(OrdinaryStatementContext.class,i);
		}
		public TerminalNode GHOSTED_BLOCK_END() { return getToken(PythonParser.GHOSTED_BLOCK_END, 0); }
		public CatchClauseContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_catchClause; }
	}

	public final CatchClauseContext catchClause() throws RecognitionException {
		CatchClauseContext _localctx = new CatchClauseContext(_ctx, getState());
		enterRule(_localctx, 62, RULE_catchClause);
		int _la;
		try {
			int _alt;
			enterOuterAlt(_localctx, 1);
			{
			setState(666);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==GHOSTED_BLOCK_START) {
				{
				setState(665);
				match(GHOSTED_BLOCK_START);
				}
			}

			setState(668);
			match(EXCEPT);
			setState(669);
			typeName();
			setState(670);
			match(AS);
			setState(671);
			identifierDef();
			setState(672);
			match(COLON);
			setState(674);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==COMMENT) {
				{
				setState(673);
				commentText();
				}
			}

			setState(676);
			match(NL);
			setState(680);
			_errHandler.sync(this);
			_alt = getInterpreter().adaptivePredict(_input,78,_ctx);
			while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER ) {
				if ( _alt==1 ) {
					{
					{
					setState(677);
					ordinaryStatement();
					}
					} 
				}
				setState(682);
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,78,_ctx);
			}
			setState(684);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==GHOSTED_BLOCK_END) {
				{
				setState(683);
				match(GHOSTED_BLOCK_END);
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
	public static class ThrowStatementContext extends ParserRuleContext {
		public TerminalNode RAISE() { return getToken(PythonParser.RAISE, 0); }
		public TypeNameContext typeName() {
			return getRuleContext(TypeNameContext.class,0);
		}
		public TerminalNode OPEN_BRACKET() { return getToken(PythonParser.OPEN_BRACKET, 0); }
		public ErrorMessageContext errorMessage() {
			return getRuleContext(ErrorMessageContext.class,0);
		}
		public TerminalNode CLOSE_BRACKET() { return getToken(PythonParser.CLOSE_BRACKET, 0); }
		public TerminalNode NL() { return getToken(PythonParser.NL, 0); }
		public TerminalNode GHOSTED_LINE() { return getToken(PythonParser.GHOSTED_LINE, 0); }
		public CommentTextContext commentText() {
			return getRuleContext(CommentTextContext.class,0);
		}
		public ThrowStatementContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_throwStatement; }
	}

	public final ThrowStatementContext throwStatement() throws RecognitionException {
		ThrowStatementContext _localctx = new ThrowStatementContext(_ctx, getState());
		enterRule(_localctx, 64, RULE_throwStatement);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(687);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==GHOSTED_LINE) {
				{
				setState(686);
				match(GHOSTED_LINE);
				}
			}

			setState(689);
			match(RAISE);
			setState(690);
			typeName();
			setState(691);
			match(OPEN_BRACKET);
			setState(692);
			errorMessage();
			setState(693);
			match(CLOSE_BRACKET);
			setState(695);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==COMMENT) {
				{
				setState(694);
				commentText();
				}
			}

			setState(697);
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
	public static class ErrorMessageContext extends ParserRuleContext {
		public LitStringContext litString() {
			return getRuleContext(LitStringContext.class,0);
		}
		public IdentifierUseContext identifierUse() {
			return getRuleContext(IdentifierUseContext.class,0);
		}
		public ErrorMessageContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_errorMessage; }
	}

	public final ErrorMessageContext errorMessage() throws RecognitionException {
		ErrorMessageContext _localctx = new ErrorMessageContext(_ctx, getState());
		enterRule(_localctx, 66, RULE_errorMessage);
		try {
			setState(701);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case LITERAL_STRING:
				enterOuterAlt(_localctx, 1);
				{
				setState(699);
				litString();
				}
				break;
			case NAME_STARTING_LC:
				enterOuterAlt(_localctx, 2);
				{
				setState(700);
				identifierUse();
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
	public static class AssertContext extends ParserRuleContext {
		public TerminalNode THIS_INSTANCE() { return getToken(PythonParser.THIS_INSTANCE, 0); }
		public TerminalNode DOT() { return getToken(PythonParser.DOT, 0); }
		public TerminalNode ASSERT_EQUAL() { return getToken(PythonParser.ASSERT_EQUAL, 0); }
		public TerminalNode OPEN_BRACKET() { return getToken(PythonParser.OPEN_BRACKET, 0); }
		public AssertActualContext assertActual() {
			return getRuleContext(AssertActualContext.class,0);
		}
		public TerminalNode COMMA() { return getToken(PythonParser.COMMA, 0); }
		public AssertExpectedContext assertExpected() {
			return getRuleContext(AssertExpectedContext.class,0);
		}
		public TerminalNode CLOSE_BRACKET() { return getToken(PythonParser.CLOSE_BRACKET, 0); }
		public TerminalNode NL() { return getToken(PythonParser.NL, 0); }
		public TerminalNode GHOSTED_LINE() { return getToken(PythonParser.GHOSTED_LINE, 0); }
		public CommentTextContext commentText() {
			return getRuleContext(CommentTextContext.class,0);
		}
		public AssertContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_assert; }
	}

	public final AssertContext assert_() throws RecognitionException {
		AssertContext _localctx = new AssertContext(_ctx, getState());
		enterRule(_localctx, 68, RULE_assert);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(704);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==GHOSTED_LINE) {
				{
				setState(703);
				match(GHOSTED_LINE);
				}
			}

			setState(706);
			match(THIS_INSTANCE);
			setState(707);
			match(DOT);
			setState(708);
			match(ASSERT_EQUAL);
			setState(709);
			match(OPEN_BRACKET);
			setState(710);
			assertActual();
			setState(711);
			match(COMMA);
			setState(712);
			assertExpected();
			setState(713);
			match(CLOSE_BRACKET);
			setState(715);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==COMMENT) {
				{
				setState(714);
				commentText();
				}
			}

			setState(717);
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
	public static class ReturnStatementContext extends ParserRuleContext {
		public TerminalNode RETURN() { return getToken(PythonParser.RETURN, 0); }
		public ExpressionContext expression() {
			return getRuleContext(ExpressionContext.class,0);
		}
		public TerminalNode NL() { return getToken(PythonParser.NL, 0); }
		public CommentTextContext commentText() {
			return getRuleContext(CommentTextContext.class,0);
		}
		public ReturnStatementContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_returnStatement; }
	}

	public final ReturnStatementContext returnStatement() throws RecognitionException {
		ReturnStatementContext _localctx = new ReturnStatementContext(_ctx, getState());
		enterRule(_localctx, 70, RULE_returnStatement);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(719);
			match(RETURN);
			setState(720);
			expression(0);
			setState(722);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==COMMENT) {
				{
				setState(721);
				commentText();
				}
			}

			setState(724);
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
	public static class MemberBlockContext extends ParserRuleContext {
		public List<SelectableMemberContext> selectableMember() {
			return getRuleContexts(SelectableMemberContext.class);
		}
		public SelectableMemberContext selectableMember(int i) {
			return getRuleContext(SelectableMemberContext.class,i);
		}
		public MemberBlockContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_memberBlock; }
	}

	public final MemberBlockContext memberBlock() throws RecognitionException {
		MemberBlockContext _localctx = new MemberBlockContext(_ctx, getState());
		enterRule(_localctx, 72, RULE_memberBlock);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(727); 
			_errHandler.sync(this);
			_la = _input.LA(1);
			do {
				{
				{
				setState(726);
				selectableMember();
				}
				}
				setState(729); 
				_errHandler.sync(this);
				_la = _input.LA(1);
			} while ( _la==DEF || ((((_la - 96)) & ~0x3f) == 0 && ((1L << (_la - 96)) & 536873985L) != 0) );
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class SelectableMemberContext extends ParserRuleContext {
		public PropertyContext property() {
			return getRuleContext(PropertyContext.class,0);
		}
		public FunctionMethodContext functionMethod() {
			return getRuleContext(FunctionMethodContext.class,0);
		}
		public ProcedureMethodContext procedureMethod() {
			return getRuleContext(ProcedureMethodContext.class,0);
		}
		public AbstractFunctionContext abstractFunction() {
			return getRuleContext(AbstractFunctionContext.class,0);
		}
		public AbstractProcedureContext abstractProcedure() {
			return getRuleContext(AbstractProcedureContext.class,0);
		}
		public SelectableMemberContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_selectableMember; }
	}

	public final SelectableMemberContext selectableMember() throws RecognitionException {
		SelectableMemberContext _localctx = new SelectableMemberContext(_ctx, getState());
		enterRule(_localctx, 74, RULE_selectableMember);
		try {
			setState(736);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,87,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(731);
				property();
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(732);
				functionMethod();
				}
				break;
			case 3:
				enterOuterAlt(_localctx, 3);
				{
				setState(733);
				procedureMethod();
				}
				break;
			case 4:
				enterOuterAlt(_localctx, 4);
				{
				setState(734);
				abstractFunction();
				}
				break;
			case 5:
				enterOuterAlt(_localctx, 5);
				{
				setState(735);
				abstractProcedure();
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
	public static class ConstructorMemberContext extends ParserRuleContext {
		public TerminalNode DEF() { return getToken(PythonParser.DEF, 0); }
		public TerminalNode INIT() { return getToken(PythonParser.INIT, 0); }
		public TerminalNode OPEN_BRACKET() { return getToken(PythonParser.OPEN_BRACKET, 0); }
		public TerminalNode CLOSE_BRACKET() { return getToken(PythonParser.CLOSE_BRACKET, 0); }
		public TerminalNode ARROW() { return getToken(PythonParser.ARROW, 0); }
		public TerminalNode NONE() { return getToken(PythonParser.NONE, 0); }
		public TerminalNode COLON() { return getToken(PythonParser.COLON, 0); }
		public List<TerminalNode> NL() { return getTokens(PythonParser.NL); }
		public TerminalNode NL(int i) {
			return getToken(PythonParser.NL, i);
		}
		public TerminalNode END_CONSTRUCTOR() { return getToken(PythonParser.END_CONSTRUCTOR, 0); }
		public TerminalNode GHOSTED_BLOCK_START() { return getToken(PythonParser.GHOSTED_BLOCK_START, 0); }
		public ParamListContext paramList() {
			return getRuleContext(ParamListContext.class,0);
		}
		public CommentTextContext commentText() {
			return getRuleContext(CommentTextContext.class,0);
		}
		public TerminalNode GHOSTED_BLOCK_END() { return getToken(PythonParser.GHOSTED_BLOCK_END, 0); }
		public List<OrdinaryStatementContext> ordinaryStatement() {
			return getRuleContexts(OrdinaryStatementContext.class);
		}
		public OrdinaryStatementContext ordinaryStatement(int i) {
			return getRuleContext(OrdinaryStatementContext.class,i);
		}
		public ConstructorMemberContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_constructorMember; }
	}

	public final ConstructorMemberContext constructorMember() throws RecognitionException {
		ConstructorMemberContext _localctx = new ConstructorMemberContext(_ctx, getState());
		enterRule(_localctx, 76, RULE_constructorMember);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(739);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==GHOSTED_BLOCK_START) {
				{
				setState(738);
				match(GHOSTED_BLOCK_START);
				}
			}

			setState(741);
			match(DEF);
			setState(742);
			match(INIT);
			setState(743);
			match(OPEN_BRACKET);
			setState(745);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==THIS_INSTANCE || _la==NAME_STARTING_LC) {
				{
				setState(744);
				paramList();
				}
			}

			setState(747);
			match(CLOSE_BRACKET);
			setState(748);
			match(ARROW);
			setState(749);
			match(NONE);
			setState(750);
			match(COLON);
			setState(752);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==COMMENT) {
				{
				setState(751);
				commentText();
				}
			}

			setState(755);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==GHOSTED_BLOCK_END) {
				{
				setState(754);
				match(GHOSTED_BLOCK_END);
				}
			}

			setState(757);
			match(NL);
			setState(761);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while ((((_la) & ~0x3f) == 0 && ((1L << _la) & 2013249770922970160L) != 0) || ((((_la - 73)) & ~0x3f) == 0 && ((1L << (_la - 73)) & 9007227163639893L) != 0)) {
				{
				{
				setState(758);
				ordinaryStatement();
				}
				}
				setState(763);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			setState(764);
			match(END_CONSTRUCTOR);
			setState(765);
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
	public static class PropertyContext extends ParserRuleContext {
		public IdentifierDefContext identifierDef() {
			return getRuleContext(IdentifierDefContext.class,0);
		}
		public TerminalNode COLON() { return getToken(PythonParser.COLON, 0); }
		public TypeContext type() {
			return getRuleContext(TypeContext.class,0);
		}
		public TerminalNode NL() { return getToken(PythonParser.NL, 0); }
		public TerminalNode GHOSTED_LINE() { return getToken(PythonParser.GHOSTED_LINE, 0); }
		public TerminalNode PRIVATE_ANNOTATION() { return getToken(PythonParser.PRIVATE_ANNOTATION, 0); }
		public CommentTextContext commentText() {
			return getRuleContext(CommentTextContext.class,0);
		}
		public PropertyContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_property; }
	}

	public final PropertyContext property() throws RecognitionException {
		PropertyContext _localctx = new PropertyContext(_ctx, getState());
		enterRule(_localctx, 78, RULE_property);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(768);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==GHOSTED_LINE) {
				{
				setState(767);
				match(GHOSTED_LINE);
				}
			}

			setState(770);
			identifierDef();
			setState(771);
			match(COLON);
			setState(772);
			type();
			setState(774);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==PRIVATE_ANNOTATION) {
				{
				setState(773);
				match(PRIVATE_ANNOTATION);
				}
			}

			setState(777);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==COMMENT) {
				{
				setState(776);
				commentText();
				}
			}

			setState(779);
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
	public static class FunctionMethodContext extends ParserRuleContext {
		public TerminalNode DEF() { return getToken(PythonParser.DEF, 0); }
		public MethodNameContext methodName() {
			return getRuleContext(MethodNameContext.class,0);
		}
		public TerminalNode OPEN_BRACKET() { return getToken(PythonParser.OPEN_BRACKET, 0); }
		public TerminalNode CLOSE_BRACKET() { return getToken(PythonParser.CLOSE_BRACKET, 0); }
		public TerminalNode ARROW() { return getToken(PythonParser.ARROW, 0); }
		public TypeContext type() {
			return getRuleContext(TypeContext.class,0);
		}
		public TerminalNode COLON() { return getToken(PythonParser.COLON, 0); }
		public List<TerminalNode> NL() { return getTokens(PythonParser.NL); }
		public TerminalNode NL(int i) {
			return getToken(PythonParser.NL, i);
		}
		public ReturnStatementContext returnStatement() {
			return getRuleContext(ReturnStatementContext.class,0);
		}
		public TerminalNode END_FUNCTION() { return getToken(PythonParser.END_FUNCTION, 0); }
		public TerminalNode GHOSTED_BLOCK_START() { return getToken(PythonParser.GHOSTED_BLOCK_START, 0); }
		public ParamListContext paramList() {
			return getRuleContext(ParamListContext.class,0);
		}
		public TerminalNode PRIVATE_ANNOTATION() { return getToken(PythonParser.PRIVATE_ANNOTATION, 0); }
		public List<OrdinaryStatementContext> ordinaryStatement() {
			return getRuleContexts(OrdinaryStatementContext.class);
		}
		public OrdinaryStatementContext ordinaryStatement(int i) {
			return getRuleContext(OrdinaryStatementContext.class,i);
		}
		public TerminalNode GHOSTED_BLOCK_END() { return getToken(PythonParser.GHOSTED_BLOCK_END, 0); }
		public FunctionMethodContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_functionMethod; }
	}

	public final FunctionMethodContext functionMethod() throws RecognitionException {
		FunctionMethodContext _localctx = new FunctionMethodContext(_ctx, getState());
		enterRule(_localctx, 80, RULE_functionMethod);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(782);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==GHOSTED_BLOCK_START) {
				{
				setState(781);
				match(GHOSTED_BLOCK_START);
				}
			}

			setState(784);
			match(DEF);
			setState(785);
			methodName();
			setState(786);
			match(OPEN_BRACKET);
			setState(788);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==THIS_INSTANCE || _la==NAME_STARTING_LC) {
				{
				setState(787);
				paramList();
				}
			}

			setState(790);
			match(CLOSE_BRACKET);
			setState(791);
			match(ARROW);
			setState(792);
			type();
			setState(793);
			match(COLON);
			setState(795);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==PRIVATE_ANNOTATION) {
				{
				setState(794);
				match(PRIVATE_ANNOTATION);
				}
			}

			setState(797);
			match(NL);
			setState(801);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while ((((_la) & ~0x3f) == 0 && ((1L << _la) & 2013249770922970160L) != 0) || ((((_la - 73)) & ~0x3f) == 0 && ((1L << (_la - 73)) & 9007227163639893L) != 0)) {
				{
				{
				setState(798);
				ordinaryStatement();
				}
				}
				setState(803);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			setState(804);
			returnStatement();
			setState(805);
			match(END_FUNCTION);
			setState(807);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==GHOSTED_BLOCK_END) {
				{
				setState(806);
				match(GHOSTED_BLOCK_END);
				}
			}

			setState(809);
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
	public static class ProcedureMethodContext extends ParserRuleContext {
		public TerminalNode DEF() { return getToken(PythonParser.DEF, 0); }
		public MethodNameContext methodName() {
			return getRuleContext(MethodNameContext.class,0);
		}
		public TerminalNode OPEN_BRACKET() { return getToken(PythonParser.OPEN_BRACKET, 0); }
		public TerminalNode CLOSE_BRACKET() { return getToken(PythonParser.CLOSE_BRACKET, 0); }
		public TerminalNode ARROW() { return getToken(PythonParser.ARROW, 0); }
		public TerminalNode NONE() { return getToken(PythonParser.NONE, 0); }
		public TerminalNode COLON() { return getToken(PythonParser.COLON, 0); }
		public List<TerminalNode> NL() { return getTokens(PythonParser.NL); }
		public TerminalNode NL(int i) {
			return getToken(PythonParser.NL, i);
		}
		public TerminalNode END_PROCEDURE() { return getToken(PythonParser.END_PROCEDURE, 0); }
		public TerminalNode GHOSTED_BLOCK_START() { return getToken(PythonParser.GHOSTED_BLOCK_START, 0); }
		public ParamListContext paramList() {
			return getRuleContext(ParamListContext.class,0);
		}
		public TerminalNode PRIVATE_ANNOTATION() { return getToken(PythonParser.PRIVATE_ANNOTATION, 0); }
		public List<OrdinaryStatementContext> ordinaryStatement() {
			return getRuleContexts(OrdinaryStatementContext.class);
		}
		public OrdinaryStatementContext ordinaryStatement(int i) {
			return getRuleContext(OrdinaryStatementContext.class,i);
		}
		public TerminalNode GHOSTED_BLOCK_END() { return getToken(PythonParser.GHOSTED_BLOCK_END, 0); }
		public ProcedureMethodContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_procedureMethod; }
	}

	public final ProcedureMethodContext procedureMethod() throws RecognitionException {
		ProcedureMethodContext _localctx = new ProcedureMethodContext(_ctx, getState());
		enterRule(_localctx, 82, RULE_procedureMethod);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(812);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==GHOSTED_BLOCK_START) {
				{
				setState(811);
				match(GHOSTED_BLOCK_START);
				}
			}

			setState(814);
			match(DEF);
			setState(815);
			methodName();
			setState(816);
			match(OPEN_BRACKET);
			setState(818);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==THIS_INSTANCE || _la==NAME_STARTING_LC) {
				{
				setState(817);
				paramList();
				}
			}

			setState(820);
			match(CLOSE_BRACKET);
			setState(821);
			match(ARROW);
			setState(822);
			match(NONE);
			setState(823);
			match(COLON);
			setState(825);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==PRIVATE_ANNOTATION) {
				{
				setState(824);
				match(PRIVATE_ANNOTATION);
				}
			}

			setState(827);
			match(NL);
			setState(831);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while ((((_la) & ~0x3f) == 0 && ((1L << _la) & 2013249770922970160L) != 0) || ((((_la - 73)) & ~0x3f) == 0 && ((1L << (_la - 73)) & 9007227163639893L) != 0)) {
				{
				{
				setState(828);
				ordinaryStatement();
				}
				}
				setState(833);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			setState(834);
			match(END_PROCEDURE);
			setState(836);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==GHOSTED_BLOCK_END) {
				{
				setState(835);
				match(GHOSTED_BLOCK_END);
				}
			}

			setState(838);
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
	public static class AbstractFunctionContext extends ParserRuleContext {
		public TerminalNode ABSTRACT_METHOD() { return getToken(PythonParser.ABSTRACT_METHOD, 0); }
		public List<TerminalNode> NL() { return getTokens(PythonParser.NL); }
		public TerminalNode NL(int i) {
			return getToken(PythonParser.NL, i);
		}
		public TerminalNode DEF() { return getToken(PythonParser.DEF, 0); }
		public MethodNameContext methodName() {
			return getRuleContext(MethodNameContext.class,0);
		}
		public TerminalNode OPEN_BRACKET() { return getToken(PythonParser.OPEN_BRACKET, 0); }
		public TerminalNode CLOSE_BRACKET() { return getToken(PythonParser.CLOSE_BRACKET, 0); }
		public TerminalNode ARROW() { return getToken(PythonParser.ARROW, 0); }
		public TypeContext type() {
			return getRuleContext(TypeContext.class,0);
		}
		public TerminalNode COLON() { return getToken(PythonParser.COLON, 0); }
		public TerminalNode PASS() { return getToken(PythonParser.PASS, 0); }
		public TerminalNode GHOSTED_LINE() { return getToken(PythonParser.GHOSTED_LINE, 0); }
		public ParamListContext paramList() {
			return getRuleContext(ParamListContext.class,0);
		}
		public CommentTextContext commentText() {
			return getRuleContext(CommentTextContext.class,0);
		}
		public AbstractFunctionContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_abstractFunction; }
	}

	public final AbstractFunctionContext abstractFunction() throws RecognitionException {
		AbstractFunctionContext _localctx = new AbstractFunctionContext(_ctx, getState());
		enterRule(_localctx, 84, RULE_abstractFunction);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(841);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==GHOSTED_LINE) {
				{
				setState(840);
				match(GHOSTED_LINE);
				}
			}

			setState(843);
			match(ABSTRACT_METHOD);
			setState(844);
			match(NL);
			setState(845);
			match(DEF);
			setState(846);
			methodName();
			setState(847);
			match(OPEN_BRACKET);
			setState(849);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==THIS_INSTANCE || _la==NAME_STARTING_LC) {
				{
				setState(848);
				paramList();
				}
			}

			setState(851);
			match(CLOSE_BRACKET);
			setState(852);
			match(ARROW);
			setState(853);
			type();
			setState(854);
			match(COLON);
			setState(855);
			match(NL);
			setState(856);
			match(PASS);
			setState(858);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==COMMENT) {
				{
				setState(857);
				commentText();
				}
			}

			setState(860);
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
	public static class AbstractProcedureContext extends ParserRuleContext {
		public TerminalNode ABSTRACT_METHOD() { return getToken(PythonParser.ABSTRACT_METHOD, 0); }
		public List<TerminalNode> NL() { return getTokens(PythonParser.NL); }
		public TerminalNode NL(int i) {
			return getToken(PythonParser.NL, i);
		}
		public TerminalNode DEF() { return getToken(PythonParser.DEF, 0); }
		public MethodNameContext methodName() {
			return getRuleContext(MethodNameContext.class,0);
		}
		public TerminalNode OPEN_BRACKET() { return getToken(PythonParser.OPEN_BRACKET, 0); }
		public TerminalNode CLOSE_BRACKET() { return getToken(PythonParser.CLOSE_BRACKET, 0); }
		public TerminalNode ARROW() { return getToken(PythonParser.ARROW, 0); }
		public TerminalNode NONE() { return getToken(PythonParser.NONE, 0); }
		public TerminalNode COLON() { return getToken(PythonParser.COLON, 0); }
		public TerminalNode PASS() { return getToken(PythonParser.PASS, 0); }
		public TerminalNode GHOSTED_LINE() { return getToken(PythonParser.GHOSTED_LINE, 0); }
		public ParamListContext paramList() {
			return getRuleContext(ParamListContext.class,0);
		}
		public TerminalNode PRIVATE_ANNOTATION() { return getToken(PythonParser.PRIVATE_ANNOTATION, 0); }
		public CommentTextContext commentText() {
			return getRuleContext(CommentTextContext.class,0);
		}
		public AbstractProcedureContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_abstractProcedure; }
	}

	public final AbstractProcedureContext abstractProcedure() throws RecognitionException {
		AbstractProcedureContext _localctx = new AbstractProcedureContext(_ctx, getState());
		enterRule(_localctx, 86, RULE_abstractProcedure);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(863);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==GHOSTED_LINE) {
				{
				setState(862);
				match(GHOSTED_LINE);
				}
			}

			setState(865);
			match(ABSTRACT_METHOD);
			setState(866);
			match(NL);
			setState(867);
			match(DEF);
			setState(868);
			methodName();
			setState(869);
			match(OPEN_BRACKET);
			setState(871);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==THIS_INSTANCE || _la==NAME_STARTING_LC) {
				{
				setState(870);
				paramList();
				}
			}

			setState(873);
			match(CLOSE_BRACKET);
			setState(874);
			match(ARROW);
			setState(875);
			match(NONE);
			setState(876);
			match(COLON);
			setState(878);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==PRIVATE_ANNOTATION) {
				{
				setState(877);
				match(PRIVATE_ANNOTATION);
				}
			}

			setState(880);
			match(NL);
			setState(881);
			match(PASS);
			setState(883);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==COMMENT) {
				{
				setState(882);
				commentText();
				}
			}

			setState(885);
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
	public static class IdentifierDefContext extends ParserRuleContext {
		public TerminalNode NAME_STARTING_LC() { return getToken(PythonParser.NAME_STARTING_LC, 0); }
		public IdentifierDefContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_identifierDef; }
	}

	public final IdentifierDefContext identifierDef() throws RecognitionException {
		IdentifierDefContext _localctx = new IdentifierDefContext(_ctx, getState());
		enterRule(_localctx, 88, RULE_identifierDef);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(887);
			match(NAME_STARTING_LC);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class IdentifierUseContext extends ParserRuleContext {
		public TerminalNode NAME_STARTING_LC() { return getToken(PythonParser.NAME_STARTING_LC, 0); }
		public IdentifierUseContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_identifierUse; }
	}

	public final IdentifierUseContext identifierUse() throws RecognitionException {
		IdentifierUseContext _localctx = new IdentifierUseContext(_ctx, getState());
		enterRule(_localctx, 90, RULE_identifierUse);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(889);
			match(NAME_STARTING_LC);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class AssignableContext extends ParserRuleContext {
		public AssignableContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_assignable; }
	 
		public AssignableContext() { }
		public void copyFrom(AssignableContext ctx) {
			super.copyFrom(ctx);
		}
	}
	@SuppressWarnings("CheckReturnValue")
	public static class SimpleAssignableContext extends AssignableContext {
		public IdentifierUseContext identifierUse() {
			return getRuleContext(IdentifierUseContext.class,0);
		}
		public SimpleAssignableContext(AssignableContext ctx) { copyFrom(ctx); }
	}
	@SuppressWarnings("CheckReturnValue")
	public static class IndexedAssignableContext extends AssignableContext {
		public AssignableContext assignable() {
			return getRuleContext(AssignableContext.class,0);
		}
		public IndexContext index() {
			return getRuleContext(IndexContext.class,0);
		}
		public IndexedAssignableContext(AssignableContext ctx) { copyFrom(ctx); }
	}
	@SuppressWarnings("CheckReturnValue")
	public static class ThisAssignableContext extends AssignableContext {
		public TerminalNode THIS_INSTANCE() { return getToken(PythonParser.THIS_INSTANCE, 0); }
		public TerminalNode DOT() { return getToken(PythonParser.DOT, 0); }
		public IdentifierUseContext identifierUse() {
			return getRuleContext(IdentifierUseContext.class,0);
		}
		public ThisAssignableContext(AssignableContext ctx) { copyFrom(ctx); }
	}

	public final AssignableContext assignable() throws RecognitionException {
		return assignable(0);
	}

	private AssignableContext assignable(int _p) throws RecognitionException {
		ParserRuleContext _parentctx = _ctx;
		int _parentState = getState();
		AssignableContext _localctx = new AssignableContext(_ctx, _parentState);
		AssignableContext _prevctx = _localctx;
		int _startState = 92;
		enterRecursionRule(_localctx, 92, RULE_assignable, _p);
		try {
			int _alt;
			enterOuterAlt(_localctx, 1);
			{
			setState(896);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case NAME_STARTING_LC:
				{
				_localctx = new SimpleAssignableContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;

				setState(892);
				identifierUse();
				}
				break;
			case THIS_INSTANCE:
				{
				_localctx = new ThisAssignableContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;
				setState(893);
				match(THIS_INSTANCE);
				setState(894);
				match(DOT);
				setState(895);
				identifierUse();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			_ctx.stop = _input.LT(-1);
			setState(902);
			_errHandler.sync(this);
			_alt = getInterpreter().adaptivePredict(_input,114,_ctx);
			while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER ) {
				if ( _alt==1 ) {
					if ( _parseListeners!=null ) triggerExitRuleEvent();
					_prevctx = _localctx;
					{
					{
					_localctx = new IndexedAssignableContext(new AssignableContext(_parentctx, _parentState));
					pushNewRecursionContext(_localctx, _startState, RULE_assignable);
					setState(898);
					if (!(precpred(_ctx, 1))) throw new FailedPredicateException(this, "precpred(_ctx, 1)");
					setState(899);
					index();
					}
					} 
				}
				setState(904);
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,114,_ctx);
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
	public static class MethodNameContext extends ParserRuleContext {
		public TerminalNode NAME_STARTING_LC() { return getToken(PythonParser.NAME_STARTING_LC, 0); }
		public MethodNameContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_methodName; }
	}

	public final MethodNameContext methodName() throws RecognitionException {
		MethodNameContext _localctx = new MethodNameContext(_ctx, getState());
		enterRule(_localctx, 94, RULE_methodName);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(905);
			match(NAME_STARTING_LC);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class TestNameContext extends ParserRuleContext {
		public TerminalNode NAME_STARTING_TEST_() { return getToken(PythonParser.NAME_STARTING_TEST_, 0); }
		public TestNameContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_testName; }
	}

	public final TestNameContext testName() throws RecognitionException {
		TestNameContext _localctx = new TestNameContext(_ctx, getState());
		enterRule(_localctx, 96, RULE_testName);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(907);
			match(NAME_STARTING_TEST_);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class TestClassNameContext extends ParserRuleContext {
		public TerminalNode NAME_STARTING_UC() { return getToken(PythonParser.NAME_STARTING_UC, 0); }
		public TestClassNameContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_testClassName; }
	}

	public final TestClassNameContext testClassName() throws RecognitionException {
		TestClassNameContext _localctx = new TestClassNameContext(_ctx, getState());
		enterRule(_localctx, 98, RULE_testClassName);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(909);
			match(NAME_STARTING_UC);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class TypeNameContext extends ParserRuleContext {
		public TypeNameContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_typeName; }
	 
		public TypeNameContext() { }
		public void copyFrom(TypeNameContext ctx) {
			super.copyFrom(ctx);
		}
	}
	@SuppressWarnings("CheckReturnValue")
	public static class IntTypeNameContext extends TypeNameContext {
		public TerminalNode INT_NAME() { return getToken(PythonParser.INT_NAME, 0); }
		public IntTypeNameContext(TypeNameContext ctx) { copyFrom(ctx); }
	}
	@SuppressWarnings("CheckReturnValue")
	public static class ListTypeNameContext extends TypeNameContext {
		public TerminalNode LIST_NAME() { return getToken(PythonParser.LIST_NAME, 0); }
		public ListTypeNameContext(TypeNameContext ctx) { copyFrom(ctx); }
	}
	@SuppressWarnings("CheckReturnValue")
	public static class UdtTypeNameContext extends TypeNameContext {
		public TerminalNode NAME_STARTING_UC() { return getToken(PythonParser.NAME_STARTING_UC, 0); }
		public UdtTypeNameContext(TypeNameContext ctx) { copyFrom(ctx); }
	}
	@SuppressWarnings("CheckReturnValue")
	public static class BoolTypeNameContext extends TypeNameContext {
		public TerminalNode BOOL_NAME() { return getToken(PythonParser.BOOL_NAME, 0); }
		public BoolTypeNameContext(TypeNameContext ctx) { copyFrom(ctx); }
	}
	@SuppressWarnings("CheckReturnValue")
	public static class DictTypeNameContext extends TypeNameContext {
		public TerminalNode DICT_NAME() { return getToken(PythonParser.DICT_NAME, 0); }
		public DictTypeNameContext(TypeNameContext ctx) { copyFrom(ctx); }
	}
	@SuppressWarnings("CheckReturnValue")
	public static class FloatTypeNameContext extends TypeNameContext {
		public TerminalNode FLOAT_NAME() { return getToken(PythonParser.FLOAT_NAME, 0); }
		public FloatTypeNameContext(TypeNameContext ctx) { copyFrom(ctx); }
	}
	@SuppressWarnings("CheckReturnValue")
	public static class StringTypeNameContext extends TypeNameContext {
		public TerminalNode STRING_NAME() { return getToken(PythonParser.STRING_NAME, 0); }
		public StringTypeNameContext(TypeNameContext ctx) { copyFrom(ctx); }
	}

	public final TypeNameContext typeName() throws RecognitionException {
		TypeNameContext _localctx = new TypeNameContext(_ctx, getState());
		enterRule(_localctx, 100, RULE_typeName);
		try {
			setState(918);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case INT_NAME:
				_localctx = new IntTypeNameContext(_localctx);
				enterOuterAlt(_localctx, 1);
				{
				setState(911);
				match(INT_NAME);
				}
				break;
			case FLOAT_NAME:
				_localctx = new FloatTypeNameContext(_localctx);
				enterOuterAlt(_localctx, 2);
				{
				setState(912);
				match(FLOAT_NAME);
				}
				break;
			case BOOL_NAME:
				_localctx = new BoolTypeNameContext(_localctx);
				enterOuterAlt(_localctx, 3);
				{
				setState(913);
				match(BOOL_NAME);
				}
				break;
			case STRING_NAME:
				_localctx = new StringTypeNameContext(_localctx);
				enterOuterAlt(_localctx, 4);
				{
				setState(914);
				match(STRING_NAME);
				}
				break;
			case LIST_NAME:
				_localctx = new ListTypeNameContext(_localctx);
				enterOuterAlt(_localctx, 5);
				{
				setState(915);
				match(LIST_NAME);
				}
				break;
			case DICT_NAME:
				_localctx = new DictTypeNameContext(_localctx);
				enterOuterAlt(_localctx, 6);
				{
				setState(916);
				match(DICT_NAME);
				}
				break;
			case NAME_STARTING_UC:
				_localctx = new UdtTypeNameContext(_localctx);
				enterOuterAlt(_localctx, 7);
				{
				setState(917);
				match(NAME_STARTING_UC);
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
	public static class ConstantValueContext extends ParserRuleContext {
		public LitBooleanContext litBoolean() {
			return getRuleContext(LitBooleanContext.class,0);
		}
		public LitIntContext litInt() {
			return getRuleContext(LitIntContext.class,0);
		}
		public LitFloatContext litFloat() {
			return getRuleContext(LitFloatContext.class,0);
		}
		public LitStringContext litString() {
			return getRuleContext(LitStringContext.class,0);
		}
		public ConstantValueContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_constantValue; }
	}

	public final ConstantValueContext constantValue() throws RecognitionException {
		ConstantValueContext _localctx = new ConstantValueContext(_ctx, getState());
		enterRule(_localctx, 102, RULE_constantValue);
		try {
			setState(924);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case TRUE:
			case FALSE:
				enterOuterAlt(_localctx, 1);
				{
				setState(920);
				litBoolean();
				}
				break;
			case LITERAL_BINARY:
			case LITERAL_HEX:
			case LITERAL_INTEGER:
				enterOuterAlt(_localctx, 2);
				{
				setState(921);
				litInt();
				}
				break;
			case LITERAL_FLOAT:
				enterOuterAlt(_localctx, 3);
				{
				setState(922);
				litFloat();
				}
				break;
			case LITERAL_STRING:
				enterOuterAlt(_localctx, 4);
				{
				setState(923);
				litString();
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
	public static class ArgListContext extends ParserRuleContext {
		public List<ArgumentContext> argument() {
			return getRuleContexts(ArgumentContext.class);
		}
		public ArgumentContext argument(int i) {
			return getRuleContext(ArgumentContext.class,i);
		}
		public List<TerminalNode> COMMA() { return getTokens(PythonParser.COMMA); }
		public TerminalNode COMMA(int i) {
			return getToken(PythonParser.COMMA, i);
		}
		public ArgListContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_argList; }
	}

	public final ArgListContext argList() throws RecognitionException {
		ArgListContext _localctx = new ArgListContext(_ctx, getState());
		enterRule(_localctx, 104, RULE_argList);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(926);
			argument();
			setState(931);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==COMMA) {
				{
				{
				setState(927);
				match(COMMA);
				setState(928);
				argument();
				}
				}
				setState(933);
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
	public static class ArgumentContext extends ParserRuleContext {
		public LambdaContext lambda() {
			return getRuleContext(LambdaContext.class,0);
		}
		public ExpressionContext expression() {
			return getRuleContext(ExpressionContext.class,0);
		}
		public ArgumentContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_argument; }
	}

	public final ArgumentContext argument() throws RecognitionException {
		ArgumentContext _localctx = new ArgumentContext(_ctx, getState());
		enterRule(_localctx, 106, RULE_argument);
		try {
			setState(936);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case LAMBDA:
				enterOuterAlt(_localctx, 1);
				{
				setState(934);
				lambda();
				}
				break;
			case TUPLE:
			case INT_NAME:
			case FLOAT_NAME:
			case BOOL_NAME:
			case STRING_NAME:
			case LIST_NAME:
			case DICT_NAME:
			case FUNC_NAME:
			case TRUE:
			case FALSE:
			case NOT:
			case THIS_INSTANCE:
			case OPEN_BRACE:
			case OPEN_SQ_BRACKET:
			case OPEN_BRACKET:
			case MINUS:
			case NAME_STARTING_LC:
			case NAME_STARTING_UC:
			case LITERAL_BINARY:
			case LITERAL_HEX:
			case LITERAL_INTEGER:
			case LITERAL_FLOAT:
			case START_INTERPOLATED_STRING:
			case LITERAL_STRING:
				enterOuterAlt(_localctx, 2);
				{
				setState(935);
				expression(0);
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
	public static class ParamListContext extends ParserRuleContext {
		public List<ParamDefContext> paramDef() {
			return getRuleContexts(ParamDefContext.class);
		}
		public ParamDefContext paramDef(int i) {
			return getRuleContext(ParamDefContext.class,i);
		}
		public List<TerminalNode> COMMA() { return getTokens(PythonParser.COMMA); }
		public TerminalNode COMMA(int i) {
			return getToken(PythonParser.COMMA, i);
		}
		public ParamListContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_paramList; }
	}

	public final ParamListContext paramList() throws RecognitionException {
		ParamListContext _localctx = new ParamListContext(_ctx, getState());
		enterRule(_localctx, 108, RULE_paramList);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(938);
			paramDef();
			setState(943);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==COMMA) {
				{
				{
				setState(939);
				match(COMMA);
				setState(940);
				paramDef();
				}
				}
				setState(945);
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
	public static class IdentifierListContext extends ParserRuleContext {
		public List<IdentifierDefContext> identifierDef() {
			return getRuleContexts(IdentifierDefContext.class);
		}
		public IdentifierDefContext identifierDef(int i) {
			return getRuleContext(IdentifierDefContext.class,i);
		}
		public List<TerminalNode> COMMA() { return getTokens(PythonParser.COMMA); }
		public TerminalNode COMMA(int i) {
			return getToken(PythonParser.COMMA, i);
		}
		public IdentifierListContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_identifierList; }
	}

	public final IdentifierListContext identifierList() throws RecognitionException {
		IdentifierListContext _localctx = new IdentifierListContext(_ctx, getState());
		enterRule(_localctx, 110, RULE_identifierList);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(946);
			identifierDef();
			setState(949); 
			_errHandler.sync(this);
			_la = _input.LA(1);
			do {
				{
				{
				setState(947);
				match(COMMA);
				setState(948);
				identifierDef();
				}
				}
				setState(951); 
				_errHandler.sync(this);
				_la = _input.LA(1);
			} while ( _la==COMMA );
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class ExpressionListContext extends ParserRuleContext {
		public List<ExpressionContext> expression() {
			return getRuleContexts(ExpressionContext.class);
		}
		public ExpressionContext expression(int i) {
			return getRuleContext(ExpressionContext.class,i);
		}
		public List<TerminalNode> COMMA() { return getTokens(PythonParser.COMMA); }
		public TerminalNode COMMA(int i) {
			return getToken(PythonParser.COMMA, i);
		}
		public ExpressionListContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_expressionList; }
	}

	public final ExpressionListContext expressionList() throws RecognitionException {
		ExpressionListContext _localctx = new ExpressionListContext(_ctx, getState());
		enterRule(_localctx, 112, RULE_expressionList);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(953);
			expression(0);
			setState(958);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==COMMA) {
				{
				{
				setState(954);
				match(COMMA);
				setState(955);
				expression(0);
				}
				}
				setState(960);
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
	public static class EnumDefValueContext extends ParserRuleContext {
		public IdentifierDefContext identifierDef() {
			return getRuleContext(IdentifierDefContext.class,0);
		}
		public TerminalNode SINGLE_EQUALS() { return getToken(PythonParser.SINGLE_EQUALS, 0); }
		public LitIntContext litInt() {
			return getRuleContext(LitIntContext.class,0);
		}
		public EnumDefValueContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_enumDefValue; }
	}

	public final EnumDefValueContext enumDefValue() throws RecognitionException {
		EnumDefValueContext _localctx = new EnumDefValueContext(_ctx, getState());
		enterRule(_localctx, 114, RULE_enumDefValue);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(961);
			identifierDef();
			setState(962);
			match(SINGLE_EQUALS);
			setState(963);
			litInt();
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class EnumListContext extends ParserRuleContext {
		public List<EnumDefValueContext> enumDefValue() {
			return getRuleContexts(EnumDefValueContext.class);
		}
		public EnumDefValueContext enumDefValue(int i) {
			return getRuleContext(EnumDefValueContext.class,i);
		}
		public List<TerminalNode> NL() { return getTokens(PythonParser.NL); }
		public TerminalNode NL(int i) {
			return getToken(PythonParser.NL, i);
		}
		public EnumListContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_enumList; }
	}

	public final EnumListContext enumList() throws RecognitionException {
		EnumListContext _localctx = new EnumListContext(_ctx, getState());
		enterRule(_localctx, 116, RULE_enumList);
		try {
			int _alt;
			enterOuterAlt(_localctx, 1);
			{
			setState(965);
			enumDefValue();
			setState(970);
			_errHandler.sync(this);
			_alt = getInterpreter().adaptivePredict(_input,122,_ctx);
			while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER ) {
				if ( _alt==1 ) {
					{
					{
					setState(966);
					match(NL);
					setState(967);
					enumDefValue();
					}
					} 
				}
				setState(972);
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,122,_ctx);
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
		public TypeTupleContext typeTuple() {
			return getRuleContext(TypeTupleContext.class,0);
		}
		public TypeNameContext typeName() {
			return getRuleContext(TypeNameContext.class,0);
		}
		public TypeGenericContext typeGeneric() {
			return getRuleContext(TypeGenericContext.class,0);
		}
		public TypeFuncContext typeFunc() {
			return getRuleContext(TypeFuncContext.class,0);
		}
		public TypeContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_type; }
	}

	public final TypeContext type() throws RecognitionException {
		TypeContext _localctx = new TypeContext(_ctx, getState());
		enterRule(_localctx, 118, RULE_type);
		try {
			setState(977);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,123,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(973);
				typeTuple();
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(974);
				typeName();
				}
				break;
			case 3:
				enterOuterAlt(_localctx, 3);
				{
				setState(975);
				typeGeneric();
				}
				break;
			case 4:
				enterOuterAlt(_localctx, 4);
				{
				setState(976);
				typeFunc();
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
	public static class AssertActualContext extends ParserRuleContext {
		public ExpressionContext expression() {
			return getRuleContext(ExpressionContext.class,0);
		}
		public AssertActualContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_assertActual; }
	}

	public final AssertActualContext assertActual() throws RecognitionException {
		AssertActualContext _localctx = new AssertActualContext(_ctx, getState());
		enterRule(_localctx, 120, RULE_assertActual);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(979);
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
	public static class AssertExpectedContext extends ParserRuleContext {
		public ExpressionContext expression() {
			return getRuleContext(ExpressionContext.class,0);
		}
		public AssertExpectedContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_assertExpected; }
	}

	public final AssertExpectedContext assertExpected() throws RecognitionException {
		AssertExpectedContext _localctx = new AssertExpectedContext(_ctx, getState());
		enterRule(_localctx, 122, RULE_assertExpected);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(981);
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
	public static class LitValueContext extends ParserRuleContext {
		public LitBooleanContext litBoolean() {
			return getRuleContext(LitBooleanContext.class,0);
		}
		public LitIntContext litInt() {
			return getRuleContext(LitIntContext.class,0);
		}
		public LitFloatContext litFloat() {
			return getRuleContext(LitFloatContext.class,0);
		}
		public LitStringContext litString() {
			return getRuleContext(LitStringContext.class,0);
		}
		public InterpolatedStringContext interpolatedString() {
			return getRuleContext(InterpolatedStringContext.class,0);
		}
		public EnumValueContext enumValue() {
			return getRuleContext(EnumValueContext.class,0);
		}
		public LitValueContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_litValue; }
	}

	public final LitValueContext litValue() throws RecognitionException {
		LitValueContext _localctx = new LitValueContext(_ctx, getState());
		enterRule(_localctx, 124, RULE_litValue);
		try {
			setState(989);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case TRUE:
			case FALSE:
				enterOuterAlt(_localctx, 1);
				{
				setState(983);
				litBoolean();
				}
				break;
			case LITERAL_BINARY:
			case LITERAL_HEX:
			case LITERAL_INTEGER:
				enterOuterAlt(_localctx, 2);
				{
				setState(984);
				litInt();
				}
				break;
			case LITERAL_FLOAT:
				enterOuterAlt(_localctx, 3);
				{
				setState(985);
				litFloat();
				}
				break;
			case LITERAL_STRING:
				enterOuterAlt(_localctx, 4);
				{
				setState(986);
				litString();
				}
				break;
			case START_INTERPOLATED_STRING:
				enterOuterAlt(_localctx, 5);
				{
				setState(987);
				interpolatedString();
				}
				break;
			case INT_NAME:
			case FLOAT_NAME:
			case BOOL_NAME:
			case STRING_NAME:
			case LIST_NAME:
			case DICT_NAME:
			case NAME_STARTING_UC:
				enterOuterAlt(_localctx, 6);
				{
				setState(988);
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
	public static class LitBooleanContext extends ParserRuleContext {
		public LitBooleanContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_litBoolean; }
	 
		public LitBooleanContext() { }
		public void copyFrom(LitBooleanContext ctx) {
			super.copyFrom(ctx);
		}
	}
	@SuppressWarnings("CheckReturnValue")
	public static class LitBooleanFalseContext extends LitBooleanContext {
		public TerminalNode FALSE() { return getToken(PythonParser.FALSE, 0); }
		public LitBooleanFalseContext(LitBooleanContext ctx) { copyFrom(ctx); }
	}
	@SuppressWarnings("CheckReturnValue")
	public static class LitBooleanTrueContext extends LitBooleanContext {
		public TerminalNode TRUE() { return getToken(PythonParser.TRUE, 0); }
		public LitBooleanTrueContext(LitBooleanContext ctx) { copyFrom(ctx); }
	}

	public final LitBooleanContext litBoolean() throws RecognitionException {
		LitBooleanContext _localctx = new LitBooleanContext(_ctx, getState());
		enterRule(_localctx, 126, RULE_litBoolean);
		try {
			setState(993);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case TRUE:
				_localctx = new LitBooleanTrueContext(_localctx);
				enterOuterAlt(_localctx, 1);
				{
				setState(991);
				match(TRUE);
				}
				break;
			case FALSE:
				_localctx = new LitBooleanFalseContext(_localctx);
				enterOuterAlt(_localctx, 2);
				{
				setState(992);
				match(FALSE);
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
	public static class LitIntContext extends ParserRuleContext {
		public LitIntContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_litInt; }
	 
		public LitIntContext() { }
		public void copyFrom(LitIntContext ctx) {
			super.copyFrom(ctx);
		}
	}
	@SuppressWarnings("CheckReturnValue")
	public static class LitBinaryContext extends LitIntContext {
		public TerminalNode LITERAL_BINARY() { return getToken(PythonParser.LITERAL_BINARY, 0); }
		public LitBinaryContext(LitIntContext ctx) { copyFrom(ctx); }
	}
	@SuppressWarnings("CheckReturnValue")
	public static class LitIntegerContext extends LitIntContext {
		public TerminalNode LITERAL_INTEGER() { return getToken(PythonParser.LITERAL_INTEGER, 0); }
		public LitIntegerContext(LitIntContext ctx) { copyFrom(ctx); }
	}
	@SuppressWarnings("CheckReturnValue")
	public static class LitHexContext extends LitIntContext {
		public TerminalNode LITERAL_HEX() { return getToken(PythonParser.LITERAL_HEX, 0); }
		public LitHexContext(LitIntContext ctx) { copyFrom(ctx); }
	}

	public final LitIntContext litInt() throws RecognitionException {
		LitIntContext _localctx = new LitIntContext(_ctx, getState());
		enterRule(_localctx, 128, RULE_litInt);
		try {
			setState(998);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case LITERAL_INTEGER:
				_localctx = new LitIntegerContext(_localctx);
				enterOuterAlt(_localctx, 1);
				{
				setState(995);
				match(LITERAL_INTEGER);
				}
				break;
			case LITERAL_BINARY:
				_localctx = new LitBinaryContext(_localctx);
				enterOuterAlt(_localctx, 2);
				{
				setState(996);
				match(LITERAL_BINARY);
				}
				break;
			case LITERAL_HEX:
				_localctx = new LitHexContext(_localctx);
				enterOuterAlt(_localctx, 3);
				{
				setState(997);
				match(LITERAL_HEX);
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
	public static class LitFloatContext extends ParserRuleContext {
		public TerminalNode LITERAL_FLOAT() { return getToken(PythonParser.LITERAL_FLOAT, 0); }
		public LitFloatContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_litFloat; }
	}

	public final LitFloatContext litFloat() throws RecognitionException {
		LitFloatContext _localctx = new LitFloatContext(_ctx, getState());
		enterRule(_localctx, 130, RULE_litFloat);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(1000);
			match(LITERAL_FLOAT);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class LitStringContext extends ParserRuleContext {
		public TerminalNode LITERAL_STRING() { return getToken(PythonParser.LITERAL_STRING, 0); }
		public LitStringContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_litString; }
	}

	public final LitStringContext litString() throws RecognitionException {
		LitStringContext _localctx = new LitStringContext(_ctx, getState());
		enterRule(_localctx, 132, RULE_litString);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(1002);
			match(LITERAL_STRING);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class InterpolatedStringContext extends ParserRuleContext {
		public TerminalNode START_INTERPOLATED_STRING() { return getToken(PythonParser.START_INTERPOLATED_STRING, 0); }
		public TerminalNode DOUBLE_QUOTES() { return getToken(PythonParser.DOUBLE_QUOTES, 0); }
		public List<SegmentContext> segment() {
			return getRuleContexts(SegmentContext.class);
		}
		public SegmentContext segment(int i) {
			return getRuleContext(SegmentContext.class,i);
		}
		public InterpolatedStringContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_interpolatedString; }
	}

	public final InterpolatedStringContext interpolatedString() throws RecognitionException {
		InterpolatedStringContext _localctx = new InterpolatedStringContext(_ctx, getState());
		enterRule(_localctx, 134, RULE_interpolatedString);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(1004);
			match(START_INTERPOLATED_STRING);
			setState(1008);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==OPEN_BRACE || _la==Grapheme) {
				{
				{
				setState(1005);
				segment();
				}
				}
				setState(1010);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			setState(1011);
			match(DOUBLE_QUOTES);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class SegmentContext extends ParserRuleContext {
		public InterpolatedStringTextContext interpolatedStringText() {
			return getRuleContext(InterpolatedStringTextContext.class,0);
		}
		public InterpolatedStringExpressionContext interpolatedStringExpression() {
			return getRuleContext(InterpolatedStringExpressionContext.class,0);
		}
		public SegmentContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_segment; }
	}

	public final SegmentContext segment() throws RecognitionException {
		SegmentContext _localctx = new SegmentContext(_ctx, getState());
		enterRule(_localctx, 136, RULE_segment);
		try {
			setState(1015);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case Grapheme:
				enterOuterAlt(_localctx, 1);
				{
				setState(1013);
				interpolatedStringText();
				}
				break;
			case OPEN_BRACE:
				enterOuterAlt(_localctx, 2);
				{
				setState(1014);
				interpolatedStringExpression();
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
	public static class InterpolatedStringTextContext extends ParserRuleContext {
		public List<TerminalNode> Grapheme() { return getTokens(PythonParser.Grapheme); }
		public TerminalNode Grapheme(int i) {
			return getToken(PythonParser.Grapheme, i);
		}
		public InterpolatedStringTextContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_interpolatedStringText; }
	}

	public final InterpolatedStringTextContext interpolatedStringText() throws RecognitionException {
		InterpolatedStringTextContext _localctx = new InterpolatedStringTextContext(_ctx, getState());
		enterRule(_localctx, 138, RULE_interpolatedStringText);
		try {
			int _alt;
			enterOuterAlt(_localctx, 1);
			{
			setState(1018); 
			_errHandler.sync(this);
			_alt = 1;
			do {
				switch (_alt) {
				case 1:
					{
					{
					setState(1017);
					match(Grapheme);
					}
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				setState(1020); 
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,129,_ctx);
			} while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER );
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class InterpolatedStringExpressionContext extends ParserRuleContext {
		public TerminalNode OPEN_BRACE() { return getToken(PythonParser.OPEN_BRACE, 0); }
		public ExpressionContext expression() {
			return getRuleContext(ExpressionContext.class,0);
		}
		public TerminalNode CLOSE_BRACE() { return getToken(PythonParser.CLOSE_BRACE, 0); }
		public InterpolatedStringExpressionContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_interpolatedStringExpression; }
	}

	public final InterpolatedStringExpressionContext interpolatedStringExpression() throws RecognitionException {
		InterpolatedStringExpressionContext _localctx = new InterpolatedStringExpressionContext(_ctx, getState());
		enterRule(_localctx, 140, RULE_interpolatedStringExpression);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(1022);
			match(OPEN_BRACE);
			setState(1023);
			expression(0);
			setState(1024);
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
	public static class EnumValueContext extends ParserRuleContext {
		public TypeNameContext typeName() {
			return getRuleContext(TypeNameContext.class,0);
		}
		public TerminalNode DOT() { return getToken(PythonParser.DOT, 0); }
		public IdentifierUseContext identifierUse() {
			return getRuleContext(IdentifierUseContext.class,0);
		}
		public EnumValueContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_enumValue; }
	}

	public final EnumValueContext enumValue() throws RecognitionException {
		EnumValueContext _localctx = new EnumValueContext(_ctx, getState());
		enterRule(_localctx, 142, RULE_enumValue);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(1026);
			typeName();
			setState(1027);
			match(DOT);
			setState(1028);
			identifierUse();
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
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
		public TerminalNode OPEN_SQ_BRACKET() { return getToken(PythonParser.OPEN_SQ_BRACKET, 0); }
		public ExpressionContext expression() {
			return getRuleContext(ExpressionContext.class,0);
		}
		public TerminalNode CLOSE_SQ_BRACKET() { return getToken(PythonParser.CLOSE_SQ_BRACKET, 0); }
		public IndexContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_index; }
	}

	public final IndexContext index() throws RecognitionException {
		IndexContext _localctx = new IndexContext(_ctx, getState());
		enterRule(_localctx, 144, RULE_index);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(1030);
			match(OPEN_SQ_BRACKET);
			setState(1031);
			expression(0);
			setState(1032);
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
	public static class ExpressionContext extends ParserRuleContext {
		public ExpressionContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_expression; }
	 
		public ExpressionContext() { }
		public void copyFrom(ExpressionContext ctx) {
			super.copyFrom(ctx);
		}
	}
	@SuppressWarnings("CheckReturnValue")
	public static class UnaryExpressionLabelContext extends ExpressionContext {
		public UnaryExpressionContext unaryExpression() {
			return getRuleContext(UnaryExpressionContext.class,0);
		}
		public UnaryExpressionLabelContext(ExpressionContext ctx) { copyFrom(ctx); }
	}
	@SuppressWarnings("CheckReturnValue")
	public static class BinaryExpressionLabelContext extends ExpressionContext {
		public BinaryExpressionContext binaryExpression() {
			return getRuleContext(BinaryExpressionContext.class,0);
		}
		public BinaryExpressionLabelContext(ExpressionContext ctx) { copyFrom(ctx); }
	}
	@SuppressWarnings("CheckReturnValue")
	public static class NewInstanceExpressionContext extends ExpressionContext {
		public NewInstanceContext newInstance() {
			return getRuleContext(NewInstanceContext.class,0);
		}
		public NewInstanceExpressionContext(ExpressionContext ctx) { copyFrom(ctx); }
	}
	@SuppressWarnings("CheckReturnValue")
	public static class IfExpressionContext extends ExpressionContext {
		public ExpressionContext trueExpr;
		public ExpressionContext condition;
		public ExpressionContext elifCondition;
		public ExpressionContext falseExpr;
		public TerminalNode IF() { return getToken(PythonParser.IF, 0); }
		public TerminalNode ELSE() { return getToken(PythonParser.ELSE, 0); }
		public List<ExpressionContext> expression() {
			return getRuleContexts(ExpressionContext.class);
		}
		public ExpressionContext expression(int i) {
			return getRuleContext(ExpressionContext.class,i);
		}
		public List<TerminalNode> ELIF() { return getTokens(PythonParser.ELIF); }
		public TerminalNode ELIF(int i) {
			return getToken(PythonParser.ELIF, i);
		}
		public IfExpressionContext(ExpressionContext ctx) { copyFrom(ctx); }
	}
	@SuppressWarnings("CheckReturnValue")
	public static class TermExpressionContext extends ExpressionContext {
		public TermContext term() {
			return getRuleContext(TermContext.class,0);
		}
		public TermExpressionContext(ExpressionContext ctx) { copyFrom(ctx); }
	}

	public final ExpressionContext expression() throws RecognitionException {
		return expression(0);
	}

	private ExpressionContext expression(int _p) throws RecognitionException {
		ParserRuleContext _parentctx = _ctx;
		int _parentState = getState();
		ExpressionContext _localctx = new ExpressionContext(_ctx, _parentState);
		ExpressionContext _prevctx = _localctx;
		int _startState = 146;
		enterRecursionRule(_localctx, 146, RULE_expression, _p);
		int _la;
		try {
			int _alt;
			enterOuterAlt(_localctx, 1);
			{
			setState(1039);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,130,_ctx) ) {
			case 1:
				{
				_localctx = new NewInstanceExpressionContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;

				setState(1035);
				newInstance();
				}
				break;
			case 2:
				{
				_localctx = new UnaryExpressionLabelContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;
				setState(1036);
				unaryExpression();
				}
				break;
			case 3:
				{
				_localctx = new TermExpressionContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;
				setState(1037);
				term(0);
				}
				break;
			case 4:
				{
				_localctx = new BinaryExpressionLabelContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;
				setState(1038);
				binaryExpression();
				}
				break;
			}
			_ctx.stop = _input.LT(-1);
			setState(1056);
			_errHandler.sync(this);
			_alt = getInterpreter().adaptivePredict(_input,132,_ctx);
			while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER ) {
				if ( _alt==1 ) {
					if ( _parseListeners!=null ) triggerExitRuleEvent();
					_prevctx = _localctx;
					{
					{
					_localctx = new IfExpressionContext(new ExpressionContext(_parentctx, _parentState));
					((IfExpressionContext)_localctx).trueExpr = _prevctx;
					pushNewRecursionContext(_localctx, _startState, RULE_expression);
					setState(1041);
					if (!(precpred(_ctx, 1))) throw new FailedPredicateException(this, "precpred(_ctx, 1)");
					setState(1042);
					match(IF);
					setState(1043);
					((IfExpressionContext)_localctx).condition = expression(0);
					setState(1048);
					_errHandler.sync(this);
					_la = _input.LA(1);
					while (_la==ELIF) {
						{
						{
						setState(1044);
						match(ELIF);
						setState(1045);
						((IfExpressionContext)_localctx).elifCondition = expression(0);
						}
						}
						setState(1050);
						_errHandler.sync(this);
						_la = _input.LA(1);
					}
					setState(1051);
					match(ELSE);
					setState(1052);
					((IfExpressionContext)_localctx).falseExpr = expression(2);
					}
					} 
				}
				setState(1058);
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,132,_ctx);
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
	public static class TermContext extends ParserRuleContext {
		public TermContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_term; }
	 
		public TermContext() { }
		public void copyFrom(TermContext ctx) {
			super.copyFrom(ctx);
		}
	}
	@SuppressWarnings("CheckReturnValue")
	public static class IdentifierUseTermContext extends TermContext {
		public IdentifierUseContext identifierUse() {
			return getRuleContext(IdentifierUseContext.class,0);
		}
		public IdentifierUseTermContext(TermContext ctx) { copyFrom(ctx); }
	}
	@SuppressWarnings("CheckReturnValue")
	public static class MethodCallTermContext extends TermContext {
		public MethodCallContext methodCall() {
			return getRuleContext(MethodCallContext.class,0);
		}
		public MethodCallTermContext(TermContext ctx) { copyFrom(ctx); }
	}
	@SuppressWarnings("CheckReturnValue")
	public static class IndexedTermContext extends TermContext {
		public TermContext term() {
			return getRuleContext(TermContext.class,0);
		}
		public IndexContext index() {
			return getRuleContext(IndexContext.class,0);
		}
		public IndexedTermContext(TermContext ctx) { copyFrom(ctx); }
	}
	@SuppressWarnings("CheckReturnValue")
	public static class LitValueTermContext extends TermContext {
		public LitValueContext litValue() {
			return getRuleContext(LitValueContext.class,0);
		}
		public LitValueTermContext(TermContext ctx) { copyFrom(ctx); }
	}
	@SuppressWarnings("CheckReturnValue")
	public static class DictionaryTermContext extends TermContext {
		public DictionaryContext dictionary() {
			return getRuleContext(DictionaryContext.class,0);
		}
		public DictionaryTermContext(TermContext ctx) { copyFrom(ctx); }
	}
	@SuppressWarnings("CheckReturnValue")
	public static class BracketedExpressionTermContext extends TermContext {
		public BracketedExpressionContext bracketedExpression() {
			return getRuleContext(BracketedExpressionContext.class,0);
		}
		public BracketedExpressionTermContext(TermContext ctx) { copyFrom(ctx); }
	}
	@SuppressWarnings("CheckReturnValue")
	public static class ChainableTermContext extends TermContext {
		public TermContext term() {
			return getRuleContext(TermContext.class,0);
		}
		public TerminalNode DOT() { return getToken(PythonParser.DOT, 0); }
		public ChainableContext chainable() {
			return getRuleContext(ChainableContext.class,0);
		}
		public ChainableTermContext(TermContext ctx) { copyFrom(ctx); }
	}
	@SuppressWarnings("CheckReturnValue")
	public static class TupleTermContext extends TermContext {
		public TupleContext tuple() {
			return getRuleContext(TupleContext.class,0);
		}
		public TupleTermContext(TermContext ctx) { copyFrom(ctx); }
	}
	@SuppressWarnings("CheckReturnValue")
	public static class ThisInstanceTermContext extends TermContext {
		public ThisInstanceContext thisInstance() {
			return getRuleContext(ThisInstanceContext.class,0);
		}
		public ThisInstanceTermContext(TermContext ctx) { copyFrom(ctx); }
	}
	@SuppressWarnings("CheckReturnValue")
	public static class ListTermContext extends TermContext {
		public ListContext list() {
			return getRuleContext(ListContext.class,0);
		}
		public ListTermContext(TermContext ctx) { copyFrom(ctx); }
	}

	public final TermContext term() throws RecognitionException {
		return term(0);
	}

	private TermContext term(int _p) throws RecognitionException {
		ParserRuleContext _parentctx = _ctx;
		int _parentState = getState();
		TermContext _localctx = new TermContext(_ctx, _parentState);
		TermContext _prevctx = _localctx;
		int _startState = 148;
		enterRecursionRule(_localctx, 148, RULE_term, _p);
		try {
			int _alt;
			enterOuterAlt(_localctx, 1);
			{
			setState(1068);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,133,_ctx) ) {
			case 1:
				{
				_localctx = new ThisInstanceTermContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;

				setState(1060);
				thisInstance();
				}
				break;
			case 2:
				{
				_localctx = new BracketedExpressionTermContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;
				setState(1061);
				bracketedExpression();
				}
				break;
			case 3:
				{
				_localctx = new LitValueTermContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;
				setState(1062);
				litValue();
				}
				break;
			case 4:
				{
				_localctx = new ListTermContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;
				setState(1063);
				list();
				}
				break;
			case 5:
				{
				_localctx = new DictionaryTermContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;
				setState(1064);
				dictionary();
				}
				break;
			case 6:
				{
				_localctx = new TupleTermContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;
				setState(1065);
				tuple();
				}
				break;
			case 7:
				{
				_localctx = new IdentifierUseTermContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;
				setState(1066);
				identifierUse();
				}
				break;
			case 8:
				{
				_localctx = new MethodCallTermContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;
				setState(1067);
				methodCall();
				}
				break;
			}
			_ctx.stop = _input.LT(-1);
			setState(1077);
			_errHandler.sync(this);
			_alt = getInterpreter().adaptivePredict(_input,135,_ctx);
			while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER ) {
				if ( _alt==1 ) {
					if ( _parseListeners!=null ) triggerExitRuleEvent();
					_prevctx = _localctx;
					{
					setState(1075);
					_errHandler.sync(this);
					switch ( getInterpreter().adaptivePredict(_input,134,_ctx) ) {
					case 1:
						{
						_localctx = new IndexedTermContext(new TermContext(_parentctx, _parentState));
						pushNewRecursionContext(_localctx, _startState, RULE_term);
						setState(1070);
						if (!(precpred(_ctx, 2))) throw new FailedPredicateException(this, "precpred(_ctx, 2)");
						setState(1071);
						index();
						}
						break;
					case 2:
						{
						_localctx = new ChainableTermContext(new TermContext(_parentctx, _parentState));
						pushNewRecursionContext(_localctx, _startState, RULE_term);
						setState(1072);
						if (!(precpred(_ctx, 1))) throw new FailedPredicateException(this, "precpred(_ctx, 1)");
						setState(1073);
						match(DOT);
						setState(1074);
						chainable();
						}
						break;
					}
					} 
				}
				setState(1079);
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,135,_ctx);
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
	public static class ChainableContext extends ParserRuleContext {
		public IdentifierUseContext identifierUse() {
			return getRuleContext(IdentifierUseContext.class,0);
		}
		public MethodCallContext methodCall() {
			return getRuleContext(MethodCallContext.class,0);
		}
		public ChainableContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_chainable; }
	}

	public final ChainableContext chainable() throws RecognitionException {
		ChainableContext _localctx = new ChainableContext(_ctx, getState());
		enterRule(_localctx, 150, RULE_chainable);
		try {
			setState(1082);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,136,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(1080);
				identifierUse();
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(1081);
				methodCall();
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
	public static class ThisInstanceContext extends ParserRuleContext {
		public TerminalNode THIS_INSTANCE() { return getToken(PythonParser.THIS_INSTANCE, 0); }
		public ThisInstanceContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_thisInstance; }
	}

	public final ThisInstanceContext thisInstance() throws RecognitionException {
		ThisInstanceContext _localctx = new ThisInstanceContext(_ctx, getState());
		enterRule(_localctx, 152, RULE_thisInstance);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(1084);
			match(THIS_INSTANCE);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
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
		public TerminalNode OPEN_BRACKET() { return getToken(PythonParser.OPEN_BRACKET, 0); }
		public ExpressionContext expression() {
			return getRuleContext(ExpressionContext.class,0);
		}
		public TerminalNode CLOSE_BRACKET() { return getToken(PythonParser.CLOSE_BRACKET, 0); }
		public BracketedExpressionContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_bracketedExpression; }
	}

	public final BracketedExpressionContext bracketedExpression() throws RecognitionException {
		BracketedExpressionContext _localctx = new BracketedExpressionContext(_ctx, getState());
		enterRule(_localctx, 154, RULE_bracketedExpression);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(1086);
			match(OPEN_BRACKET);
			setState(1087);
			expression(0);
			setState(1088);
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
	public static class UnaryExpressionContext extends ParserRuleContext {
		public NegateNumericContext negateNumeric() {
			return getRuleContext(NegateNumericContext.class,0);
		}
		public NegateLogicalContext negateLogical() {
			return getRuleContext(NegateLogicalContext.class,0);
		}
		public UnaryExpressionContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_unaryExpression; }
	}

	public final UnaryExpressionContext unaryExpression() throws RecognitionException {
		UnaryExpressionContext _localctx = new UnaryExpressionContext(_ctx, getState());
		enterRule(_localctx, 156, RULE_unaryExpression);
		try {
			setState(1092);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case MINUS:
				enterOuterAlt(_localctx, 1);
				{
				setState(1090);
				negateNumeric();
				}
				break;
			case NOT:
				enterOuterAlt(_localctx, 2);
				{
				setState(1091);
				negateLogical();
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
	public static class NegateNumericContext extends ParserRuleContext {
		public TerminalNode MINUS() { return getToken(PythonParser.MINUS, 0); }
		public TermContext term() {
			return getRuleContext(TermContext.class,0);
		}
		public NegateNumericContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_negateNumeric; }
	}

	public final NegateNumericContext negateNumeric() throws RecognitionException {
		NegateNumericContext _localctx = new NegateNumericContext(_ctx, getState());
		enterRule(_localctx, 158, RULE_negateNumeric);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(1094);
			match(MINUS);
			setState(1095);
			term(0);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class NegateLogicalContext extends ParserRuleContext {
		public TerminalNode NOT() { return getToken(PythonParser.NOT, 0); }
		public TermContext term() {
			return getRuleContext(TermContext.class,0);
		}
		public NegateLogicalContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_negateLogical; }
	}

	public final NegateLogicalContext negateLogical() throws RecognitionException {
		NegateLogicalContext _localctx = new NegateLogicalContext(_ctx, getState());
		enterRule(_localctx, 160, RULE_negateLogical);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(1097);
			match(NOT);
			setState(1098);
			term(0);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class BinaryExpressionContext extends ParserRuleContext {
		public TermContext left;
		public ExpressionContext right;
		public BinaryOperatorContext binaryOperator() {
			return getRuleContext(BinaryOperatorContext.class,0);
		}
		public TermContext term() {
			return getRuleContext(TermContext.class,0);
		}
		public ExpressionContext expression() {
			return getRuleContext(ExpressionContext.class,0);
		}
		public BinaryExpressionContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_binaryExpression; }
	}

	public final BinaryExpressionContext binaryExpression() throws RecognitionException {
		BinaryExpressionContext _localctx = new BinaryExpressionContext(_ctx, getState());
		enterRule(_localctx, 162, RULE_binaryExpression);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(1100);
			((BinaryExpressionContext)_localctx).left = term(0);
			setState(1101);
			binaryOperator();
			setState(1102);
			((BinaryExpressionContext)_localctx).right = expression(0);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class ListContext extends ParserRuleContext {
		public TerminalNode OPEN_SQ_BRACKET() { return getToken(PythonParser.OPEN_SQ_BRACKET, 0); }
		public ExpressionListContext expressionList() {
			return getRuleContext(ExpressionListContext.class,0);
		}
		public TerminalNode CLOSE_SQ_BRACKET() { return getToken(PythonParser.CLOSE_SQ_BRACKET, 0); }
		public ListContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_list; }
	}

	public final ListContext list() throws RecognitionException {
		ListContext _localctx = new ListContext(_ctx, getState());
		enterRule(_localctx, 164, RULE_list);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(1104);
			match(OPEN_SQ_BRACKET);
			setState(1105);
			expressionList();
			setState(1106);
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
	public static class TupleContext extends ParserRuleContext {
		public TerminalNode OPEN_BRACKET() { return getToken(PythonParser.OPEN_BRACKET, 0); }
		public ExpressionListContext expressionList() {
			return getRuleContext(ExpressionListContext.class,0);
		}
		public TerminalNode CLOSE_BRACKET() { return getToken(PythonParser.CLOSE_BRACKET, 0); }
		public TupleContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_tuple; }
	}

	public final TupleContext tuple() throws RecognitionException {
		TupleContext _localctx = new TupleContext(_ctx, getState());
		enterRule(_localctx, 166, RULE_tuple);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(1108);
			match(OPEN_BRACKET);
			setState(1109);
			expressionList();
			setState(1110);
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
	public static class DictionaryContext extends ParserRuleContext {
		public TerminalNode OPEN_BRACE() { return getToken(PythonParser.OPEN_BRACE, 0); }
		public KvpListContext kvpList() {
			return getRuleContext(KvpListContext.class,0);
		}
		public TerminalNode CLOSE_BRACE() { return getToken(PythonParser.CLOSE_BRACE, 0); }
		public DictionaryContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_dictionary; }
	}

	public final DictionaryContext dictionary() throws RecognitionException {
		DictionaryContext _localctx = new DictionaryContext(_ctx, getState());
		enterRule(_localctx, 168, RULE_dictionary);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(1112);
			match(OPEN_BRACE);
			setState(1113);
			kvpList();
			setState(1114);
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
	public static class KvpListContext extends ParserRuleContext {
		public List<KvpContext> kvp() {
			return getRuleContexts(KvpContext.class);
		}
		public KvpContext kvp(int i) {
			return getRuleContext(KvpContext.class,i);
		}
		public List<TerminalNode> COMMA() { return getTokens(PythonParser.COMMA); }
		public TerminalNode COMMA(int i) {
			return getToken(PythonParser.COMMA, i);
		}
		public KvpListContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_kvpList; }
	}

	public final KvpListContext kvpList() throws RecognitionException {
		KvpListContext _localctx = new KvpListContext(_ctx, getState());
		enterRule(_localctx, 170, RULE_kvpList);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(1116);
			kvp();
			setState(1121);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==COMMA) {
				{
				{
				setState(1117);
				match(COMMA);
				setState(1118);
				kvp();
				}
				}
				setState(1123);
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
	public static class KvpContext extends ParserRuleContext {
		public ExpressionContext key;
		public ExpressionContext value;
		public TerminalNode COLON() { return getToken(PythonParser.COLON, 0); }
		public List<ExpressionContext> expression() {
			return getRuleContexts(ExpressionContext.class);
		}
		public ExpressionContext expression(int i) {
			return getRuleContext(ExpressionContext.class,i);
		}
		public KvpContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_kvp; }
	}

	public final KvpContext kvp() throws RecognitionException {
		KvpContext _localctx = new KvpContext(_ctx, getState());
		enterRule(_localctx, 172, RULE_kvp);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(1124);
			((KvpContext)_localctx).key = expression(0);
			setState(1125);
			match(COLON);
			setState(1126);
			((KvpContext)_localctx).value = expression(0);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
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
		public MethodNameContext methodName() {
			return getRuleContext(MethodNameContext.class,0);
		}
		public TerminalNode OPEN_BRACKET() { return getToken(PythonParser.OPEN_BRACKET, 0); }
		public TerminalNode CLOSE_BRACKET() { return getToken(PythonParser.CLOSE_BRACKET, 0); }
		public ArgListContext argList() {
			return getRuleContext(ArgListContext.class,0);
		}
		public MethodCallContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_methodCall; }
	}

	public final MethodCallContext methodCall() throws RecognitionException {
		MethodCallContext _localctx = new MethodCallContext(_ctx, getState());
		enterRule(_localctx, 174, RULE_methodCall);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(1128);
			methodName();
			setState(1129);
			match(OPEN_BRACKET);
			setState(1131);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if ((((_la) & ~0x3f) == 0 && ((1L << _la) & -6919780827454766976L) != 0) || ((((_la - 73)) & ~0x3f) == 0 && ((1L << (_la - 73)) & 2139099221L) != 0)) {
				{
				setState(1130);
				argList();
				}
			}

			setState(1133);
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
	public static class BinaryOperatorContext extends ParserRuleContext {
		public BinaryOperatorContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_binaryOperator; }
	 
		public BinaryOperatorContext() { }
		public void copyFrom(BinaryOperatorContext ctx) {
			super.copyFrom(ctx);
		}
	}
	@SuppressWarnings("CheckReturnValue")
	public static class OpPLUSContext extends BinaryOperatorContext {
		public TerminalNode PLUS() { return getToken(PythonParser.PLUS, 0); }
		public OpPLUSContext(BinaryOperatorContext ctx) { copyFrom(ctx); }
	}
	@SuppressWarnings("CheckReturnValue")
	public static class OpREF_NOT_EQUALContext extends BinaryOperatorContext {
		public TerminalNode REF_NOT_EQUAL() { return getToken(PythonParser.REF_NOT_EQUAL, 0); }
		public OpREF_NOT_EQUALContext(BinaryOperatorContext ctx) { copyFrom(ctx); }
	}
	@SuppressWarnings("CheckReturnValue")
	public static class OpANDContext extends BinaryOperatorContext {
		public TerminalNode AND() { return getToken(PythonParser.AND, 0); }
		public OpANDContext(BinaryOperatorContext ctx) { copyFrom(ctx); }
	}
	@SuppressWarnings("CheckReturnValue")
	public static class OpDIVIDEContext extends BinaryOperatorContext {
		public TerminalNode DIVIDE() { return getToken(PythonParser.DIVIDE, 0); }
		public OpDIVIDEContext(BinaryOperatorContext ctx) { copyFrom(ctx); }
	}
	@SuppressWarnings("CheckReturnValue")
	public static class OpMULTContext extends BinaryOperatorContext {
		public TerminalNode MULT() { return getToken(PythonParser.MULT, 0); }
		public OpMULTContext(BinaryOperatorContext ctx) { copyFrom(ctx); }
	}
	@SuppressWarnings("CheckReturnValue")
	public static class OpGEContext extends BinaryOperatorContext {
		public TerminalNode GE() { return getToken(PythonParser.GE, 0); }
		public OpGEContext(BinaryOperatorContext ctx) { copyFrom(ctx); }
	}
	@SuppressWarnings("CheckReturnValue")
	public static class OpREF_EQUALContext extends BinaryOperatorContext {
		public TerminalNode REF_EQUAL() { return getToken(PythonParser.REF_EQUAL, 0); }
		public OpREF_EQUALContext(BinaryOperatorContext ctx) { copyFrom(ctx); }
	}
	@SuppressWarnings("CheckReturnValue")
	public static class OpLEContext extends BinaryOperatorContext {
		public TerminalNode LE() { return getToken(PythonParser.LE, 0); }
		public OpLEContext(BinaryOperatorContext ctx) { copyFrom(ctx); }
	}
	@SuppressWarnings("CheckReturnValue")
	public static class OpORContext extends BinaryOperatorContext {
		public TerminalNode OR() { return getToken(PythonParser.OR, 0); }
		public OpORContext(BinaryOperatorContext ctx) { copyFrom(ctx); }
	}
	@SuppressWarnings("CheckReturnValue")
	public static class OpMODContext extends BinaryOperatorContext {
		public TerminalNode MOD() { return getToken(PythonParser.MOD, 0); }
		public OpMODContext(BinaryOperatorContext ctx) { copyFrom(ctx); }
	}
	@SuppressWarnings("CheckReturnValue")
	public static class OpEQUALContext extends BinaryOperatorContext {
		public TerminalNode EQUAL() { return getToken(PythonParser.EQUAL, 0); }
		public OpEQUALContext(BinaryOperatorContext ctx) { copyFrom(ctx); }
	}
	@SuppressWarnings("CheckReturnValue")
	public static class OpGTContext extends BinaryOperatorContext {
		public TerminalNode GT() { return getToken(PythonParser.GT, 0); }
		public OpGTContext(BinaryOperatorContext ctx) { copyFrom(ctx); }
	}
	@SuppressWarnings("CheckReturnValue")
	public static class OpPOWERContext extends BinaryOperatorContext {
		public TerminalNode POWER() { return getToken(PythonParser.POWER, 0); }
		public OpPOWERContext(BinaryOperatorContext ctx) { copyFrom(ctx); }
	}
	@SuppressWarnings("CheckReturnValue")
	public static class OpNOT_EQUALContext extends BinaryOperatorContext {
		public TerminalNode NOT_EQUAL() { return getToken(PythonParser.NOT_EQUAL, 0); }
		public OpNOT_EQUALContext(BinaryOperatorContext ctx) { copyFrom(ctx); }
	}
	@SuppressWarnings("CheckReturnValue")
	public static class OpLTContext extends BinaryOperatorContext {
		public TerminalNode LT() { return getToken(PythonParser.LT, 0); }
		public OpLTContext(BinaryOperatorContext ctx) { copyFrom(ctx); }
	}
	@SuppressWarnings("CheckReturnValue")
	public static class OpMINUSContext extends BinaryOperatorContext {
		public TerminalNode MINUS() { return getToken(PythonParser.MINUS, 0); }
		public OpMINUSContext(BinaryOperatorContext ctx) { copyFrom(ctx); }
	}

	public final BinaryOperatorContext binaryOperator() throws RecognitionException {
		BinaryOperatorContext _localctx = new BinaryOperatorContext(_ctx, getState());
		enterRule(_localctx, 176, RULE_binaryOperator);
		try {
			setState(1151);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case EQUAL:
				_localctx = new OpEQUALContext(_localctx);
				enterOuterAlt(_localctx, 1);
				{
				setState(1135);
				match(EQUAL);
				}
				break;
			case NOT_EQUAL:
				_localctx = new OpNOT_EQUALContext(_localctx);
				enterOuterAlt(_localctx, 2);
				{
				setState(1136);
				match(NOT_EQUAL);
				}
				break;
			case REF_EQUAL:
				_localctx = new OpREF_EQUALContext(_localctx);
				enterOuterAlt(_localctx, 3);
				{
				setState(1137);
				match(REF_EQUAL);
				}
				break;
			case REF_NOT_EQUAL:
				_localctx = new OpREF_NOT_EQUALContext(_localctx);
				enterOuterAlt(_localctx, 4);
				{
				setState(1138);
				match(REF_NOT_EQUAL);
				}
				break;
			case GT:
				_localctx = new OpGTContext(_localctx);
				enterOuterAlt(_localctx, 5);
				{
				setState(1139);
				match(GT);
				}
				break;
			case LT:
				_localctx = new OpLTContext(_localctx);
				enterOuterAlt(_localctx, 6);
				{
				setState(1140);
				match(LT);
				}
				break;
			case GE:
				_localctx = new OpGEContext(_localctx);
				enterOuterAlt(_localctx, 7);
				{
				setState(1141);
				match(GE);
				}
				break;
			case LE:
				_localctx = new OpLEContext(_localctx);
				enterOuterAlt(_localctx, 8);
				{
				setState(1142);
				match(LE);
				}
				break;
			case MULT:
				_localctx = new OpMULTContext(_localctx);
				enterOuterAlt(_localctx, 9);
				{
				setState(1143);
				match(MULT);
				}
				break;
			case DIVIDE:
				_localctx = new OpDIVIDEContext(_localctx);
				enterOuterAlt(_localctx, 10);
				{
				setState(1144);
				match(DIVIDE);
				}
				break;
			case PLUS:
				_localctx = new OpPLUSContext(_localctx);
				enterOuterAlt(_localctx, 11);
				{
				setState(1145);
				match(PLUS);
				}
				break;
			case MINUS:
				_localctx = new OpMINUSContext(_localctx);
				enterOuterAlt(_localctx, 12);
				{
				setState(1146);
				match(MINUS);
				}
				break;
			case AND:
				_localctx = new OpANDContext(_localctx);
				enterOuterAlt(_localctx, 13);
				{
				setState(1147);
				match(AND);
				}
				break;
			case OR:
				_localctx = new OpORContext(_localctx);
				enterOuterAlt(_localctx, 14);
				{
				setState(1148);
				match(OR);
				}
				break;
			case MOD:
				_localctx = new OpMODContext(_localctx);
				enterOuterAlt(_localctx, 15);
				{
				setState(1149);
				match(MOD);
				}
				break;
			case POWER:
				_localctx = new OpPOWERContext(_localctx);
				enterOuterAlt(_localctx, 16);
				{
				setState(1150);
				match(POWER);
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
	public static class NewInstanceContext extends ParserRuleContext {
		public TypeContext type() {
			return getRuleContext(TypeContext.class,0);
		}
		public TerminalNode OPEN_BRACKET() { return getToken(PythonParser.OPEN_BRACKET, 0); }
		public TerminalNode CLOSE_BRACKET() { return getToken(PythonParser.CLOSE_BRACKET, 0); }
		public ArgListContext argList() {
			return getRuleContext(ArgListContext.class,0);
		}
		public NewInstanceContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_newInstance; }
	}

	public final NewInstanceContext newInstance() throws RecognitionException {
		NewInstanceContext _localctx = new NewInstanceContext(_ctx, getState());
		enterRule(_localctx, 178, RULE_newInstance);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(1153);
			type();
			setState(1154);
			match(OPEN_BRACKET);
			setState(1156);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if ((((_la) & ~0x3f) == 0 && ((1L << _la) & -6919780827454766976L) != 0) || ((((_la - 73)) & ~0x3f) == 0 && ((1L << (_la - 73)) & 2139099221L) != 0)) {
				{
				setState(1155);
				argList();
				}
			}

			setState(1158);
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
	public static class ParamDefContext extends ParserRuleContext {
		public TerminalNode COLON() { return getToken(PythonParser.COLON, 0); }
		public TypeContext type() {
			return getRuleContext(TypeContext.class,0);
		}
		public IdentifierDefContext identifierDef() {
			return getRuleContext(IdentifierDefContext.class,0);
		}
		public TerminalNode THIS_INSTANCE() { return getToken(PythonParser.THIS_INSTANCE, 0); }
		public ParamDefContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_paramDef; }
	}

	public final ParamDefContext paramDef() throws RecognitionException {
		ParamDefContext _localctx = new ParamDefContext(_ctx, getState());
		enterRule(_localctx, 180, RULE_paramDef);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(1162);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case NAME_STARTING_LC:
				{
				setState(1160);
				identifierDef();
				}
				break;
			case THIS_INSTANCE:
				{
				setState(1161);
				match(THIS_INSTANCE);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			setState(1164);
			match(COLON);
			setState(1165);
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
	public static class TypeGenericContext extends ParserRuleContext {
		public TypeNameContext typeName() {
			return getRuleContext(TypeNameContext.class,0);
		}
		public TerminalNode OPEN_SQ_BRACKET() { return getToken(PythonParser.OPEN_SQ_BRACKET, 0); }
		public List<TypeContext> type() {
			return getRuleContexts(TypeContext.class);
		}
		public TypeContext type(int i) {
			return getRuleContext(TypeContext.class,i);
		}
		public TerminalNode CLOSE_SQ_BRACKET() { return getToken(PythonParser.CLOSE_SQ_BRACKET, 0); }
		public List<TerminalNode> COMMA() { return getTokens(PythonParser.COMMA); }
		public TerminalNode COMMA(int i) {
			return getToken(PythonParser.COMMA, i);
		}
		public TypeGenericContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_typeGeneric; }
	}

	public final TypeGenericContext typeGeneric() throws RecognitionException {
		TypeGenericContext _localctx = new TypeGenericContext(_ctx, getState());
		enterRule(_localctx, 182, RULE_typeGeneric);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(1167);
			typeName();
			setState(1168);
			match(OPEN_SQ_BRACKET);
			setState(1169);
			type();
			setState(1174);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==COMMA) {
				{
				{
				setState(1170);
				match(COMMA);
				setState(1171);
				type();
				}
				}
				setState(1176);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			setState(1177);
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
	public static class TypeFuncContext extends ParserRuleContext {
		public TerminalNode FUNC_NAME() { return getToken(PythonParser.FUNC_NAME, 0); }
		public List<TerminalNode> OPEN_SQ_BRACKET() { return getTokens(PythonParser.OPEN_SQ_BRACKET); }
		public TerminalNode OPEN_SQ_BRACKET(int i) {
			return getToken(PythonParser.OPEN_SQ_BRACKET, i);
		}
		public List<TypeContext> type() {
			return getRuleContexts(TypeContext.class);
		}
		public TypeContext type(int i) {
			return getRuleContext(TypeContext.class,i);
		}
		public List<TerminalNode> CLOSE_SQ_BRACKET() { return getTokens(PythonParser.CLOSE_SQ_BRACKET); }
		public TerminalNode CLOSE_SQ_BRACKET(int i) {
			return getToken(PythonParser.CLOSE_SQ_BRACKET, i);
		}
		public List<TerminalNode> COMMA() { return getTokens(PythonParser.COMMA); }
		public TerminalNode COMMA(int i) {
			return getToken(PythonParser.COMMA, i);
		}
		public TypeFuncContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_typeFunc; }
	}

	public final TypeFuncContext typeFunc() throws RecognitionException {
		TypeFuncContext _localctx = new TypeFuncContext(_ctx, getState());
		enterRule(_localctx, 184, RULE_typeFunc);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(1179);
			match(FUNC_NAME);
			setState(1180);
			match(OPEN_SQ_BRACKET);
			setState(1181);
			match(OPEN_SQ_BRACKET);
			setState(1182);
			type();
			setState(1187);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==COMMA) {
				{
				{
				setState(1183);
				match(COMMA);
				setState(1184);
				type();
				}
				}
				setState(1189);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			setState(1190);
			match(CLOSE_SQ_BRACKET);
			setState(1191);
			match(COMMA);
			setState(1192);
			type();
			setState(1193);
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
	public static class TypeTupleContext extends ParserRuleContext {
		public TerminalNode TUPLE() { return getToken(PythonParser.TUPLE, 0); }
		public TerminalNode OPEN_SQ_BRACKET() { return getToken(PythonParser.OPEN_SQ_BRACKET, 0); }
		public List<TypeContext> type() {
			return getRuleContexts(TypeContext.class);
		}
		public TypeContext type(int i) {
			return getRuleContext(TypeContext.class,i);
		}
		public TerminalNode CLOSE_SQ_BRACKET() { return getToken(PythonParser.CLOSE_SQ_BRACKET, 0); }
		public List<TerminalNode> COMMA() { return getTokens(PythonParser.COMMA); }
		public TerminalNode COMMA(int i) {
			return getToken(PythonParser.COMMA, i);
		}
		public TypeTupleContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_typeTuple; }
	}

	public final TypeTupleContext typeTuple() throws RecognitionException {
		TypeTupleContext _localctx = new TypeTupleContext(_ctx, getState());
		enterRule(_localctx, 186, RULE_typeTuple);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(1195);
			match(TUPLE);
			setState(1196);
			match(OPEN_SQ_BRACKET);
			setState(1197);
			type();
			setState(1200); 
			_errHandler.sync(this);
			_la = _input.LA(1);
			do {
				{
				{
				setState(1198);
				match(COMMA);
				setState(1199);
				type();
				}
				}
				setState(1202); 
				_errHandler.sync(this);
				_la = _input.LA(1);
			} while ( _la==COMMA );
			setState(1204);
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
	public static class LambdaContext extends ParserRuleContext {
		public TerminalNode LAMBDA() { return getToken(PythonParser.LAMBDA, 0); }
		public ParamListContext paramList() {
			return getRuleContext(ParamListContext.class,0);
		}
		public TerminalNode COLON() { return getToken(PythonParser.COLON, 0); }
		public ExpressionContext expression() {
			return getRuleContext(ExpressionContext.class,0);
		}
		public LambdaContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_lambda; }
	}

	public final LambdaContext lambda() throws RecognitionException {
		LambdaContext _localctx = new LambdaContext(_ctx, getState());
		enterRule(_localctx, 188, RULE_lambda);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(1206);
			match(LAMBDA);
			setState(1207);
			paramList();
			setState(1208);
			match(COLON);
			setState(1209);
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

	public boolean sempred(RuleContext _localctx, int ruleIndex, int predIndex) {
		switch (ruleIndex) {
		case 46:
			return assignable_sempred((AssignableContext)_localctx, predIndex);
		case 73:
			return expression_sempred((ExpressionContext)_localctx, predIndex);
		case 74:
			return term_sempred((TermContext)_localctx, predIndex);
		}
		return true;
	}
	private boolean assignable_sempred(AssignableContext _localctx, int predIndex) {
		switch (predIndex) {
		case 0:
			return precpred(_ctx, 1);
		}
		return true;
	}
	private boolean expression_sempred(ExpressionContext _localctx, int predIndex) {
		switch (predIndex) {
		case 1:
			return precpred(_ctx, 1);
		}
		return true;
	}
	private boolean term_sempred(TermContext _localctx, int predIndex) {
		switch (predIndex) {
		case 2:
			return precpred(_ctx, 2);
		case 3:
			return precpred(_ctx, 1);
		}
		return true;
	}

	public static final String _serializedATN =
		"\u0004\u0001\u0081\u04bc\u0002\u0000\u0007\u0000\u0002\u0001\u0007\u0001"+
		"\u0002\u0002\u0007\u0002\u0002\u0003\u0007\u0003\u0002\u0004\u0007\u0004"+
		"\u0002\u0005\u0007\u0005\u0002\u0006\u0007\u0006\u0002\u0007\u0007\u0007"+
		"\u0002\b\u0007\b\u0002\t\u0007\t\u0002\n\u0007\n\u0002\u000b\u0007\u000b"+
		"\u0002\f\u0007\f\u0002\r\u0007\r\u0002\u000e\u0007\u000e\u0002\u000f\u0007"+
		"\u000f\u0002\u0010\u0007\u0010\u0002\u0011\u0007\u0011\u0002\u0012\u0007"+
		"\u0012\u0002\u0013\u0007\u0013\u0002\u0014\u0007\u0014\u0002\u0015\u0007"+
		"\u0015\u0002\u0016\u0007\u0016\u0002\u0017\u0007\u0017\u0002\u0018\u0007"+
		"\u0018\u0002\u0019\u0007\u0019\u0002\u001a\u0007\u001a\u0002\u001b\u0007"+
		"\u001b\u0002\u001c\u0007\u001c\u0002\u001d\u0007\u001d\u0002\u001e\u0007"+
		"\u001e\u0002\u001f\u0007\u001f\u0002 \u0007 \u0002!\u0007!\u0002\"\u0007"+
		"\"\u0002#\u0007#\u0002$\u0007$\u0002%\u0007%\u0002&\u0007&\u0002\'\u0007"+
		"\'\u0002(\u0007(\u0002)\u0007)\u0002*\u0007*\u0002+\u0007+\u0002,\u0007"+
		",\u0002-\u0007-\u0002.\u0007.\u0002/\u0007/\u00020\u00070\u00021\u0007"+
		"1\u00022\u00072\u00023\u00073\u00024\u00074\u00025\u00075\u00026\u0007"+
		"6\u00027\u00077\u00028\u00078\u00029\u00079\u0002:\u0007:\u0002;\u0007"+
		";\u0002<\u0007<\u0002=\u0007=\u0002>\u0007>\u0002?\u0007?\u0002@\u0007"+
		"@\u0002A\u0007A\u0002B\u0007B\u0002C\u0007C\u0002D\u0007D\u0002E\u0007"+
		"E\u0002F\u0007F\u0002G\u0007G\u0002H\u0007H\u0002I\u0007I\u0002J\u0007"+
		"J\u0002K\u0007K\u0002L\u0007L\u0002M\u0007M\u0002N\u0007N\u0002O\u0007"+
		"O\u0002P\u0007P\u0002Q\u0007Q\u0002R\u0007R\u0002S\u0007S\u0002T\u0007"+
		"T\u0002U\u0007U\u0002V\u0007V\u0002W\u0007W\u0002X\u0007X\u0002Y\u0007"+
		"Y\u0002Z\u0007Z\u0002[\u0007[\u0002\\\u0007\\\u0002]\u0007]\u0002^\u0007"+
		"^\u0001\u0000\u0003\u0000\u00c0\b\u0000\u0001\u0000\u0005\u0000\u00c3"+
		"\b\u0000\n\u0000\f\u0000\u00c6\t\u0000\u0001\u0000\u0003\u0000\u00c9\b"+
		"\u0000\u0001\u0000\u0005\u0000\u00cc\b\u0000\n\u0000\f\u0000\u00cf\t\u0000"+
		"\u0001\u0000\u0001\u0000\u0001\u0001\u0004\u0001\u00d4\b\u0001\u000b\u0001"+
		"\f\u0001\u00d5\u0001\u0002\u0001\u0002\u0001\u0002\u0001\u0002\u0001\u0002"+
		"\u0001\u0002\u0001\u0002\u0001\u0002\u0001\u0002\u0003\u0002\u00e1\b\u0002"+
		"\u0001\u0003\u0003\u0003\u00e4\b\u0003\u0001\u0003\u0001\u0003\u0001\u0003"+
		"\u0001\u0003\u0001\u0003\u0001\u0003\u0001\u0003\u0001\u0003\u0001\u0003"+
		"\u0005\u0003\u00ef\b\u0003\n\u0003\f\u0003\u00f2\t\u0003\u0001\u0003\u0001"+
		"\u0003\u0003\u0003\u00f6\b\u0003\u0001\u0003\u0001\u0003\u0001\u0004\u0001"+
		"\u0004\u0001\u0004\u0001\u0004\u0001\u0005\u0003\u0005\u00ff\b\u0005\u0001"+
		"\u0005\u0001\u0005\u0001\u0005\u0001\u0005\u0003\u0005\u0105\b\u0005\u0001"+
		"\u0005\u0001\u0005\u0001\u0005\u0001\u0005\u0001\u0005\u0003\u0005\u010c"+
		"\b\u0005\u0001\u0005\u0001\u0005\u0005\u0005\u0110\b\u0005\n\u0005\f\u0005"+
		"\u0113\t\u0005\u0001\u0005\u0001\u0005\u0001\u0005\u0003\u0005\u0118\b"+
		"\u0005\u0001\u0005\u0001\u0005\u0001\u0006\u0003\u0006\u011d\b\u0006\u0001"+
		"\u0006\u0001\u0006\u0001\u0006\u0001\u0006\u0001\u0006\u0001\u0006\u0001"+
		"\u0006\u0001\u0006\u0001\u0006\u0001\u0006\u0001\u0006\u0001\u0006\u0001"+
		"\u0006\u0001\u0006\u0001\u0006\u0001\u0006\u0001\u0006\u0001\u0006\u0003"+
		"\u0006\u0131\b\u0006\u0001\u0006\u0001\u0006\u0005\u0006\u0135\b\u0006"+
		"\n\u0006\f\u0006\u0138\t\u0006\u0001\u0006\u0001\u0006\u0003\u0006\u013c"+
		"\b\u0006\u0001\u0006\u0001\u0006\u0001\u0007\u0001\u0007\u0001\u0007\u0003"+
		"\u0007\u0143\b\u0007\u0001\b\u0003\b\u0146\b\b\u0001\b\u0001\b\u0001\b"+
		"\u0001\b\u0003\b\u014c\b\b\u0001\b\u0001\b\u0001\b\u0001\b\u0001\b\u0003"+
		"\b\u0153\b\b\u0001\b\u0001\b\u0005\b\u0157\b\b\n\b\f\b\u015a\t\b\u0001"+
		"\b\u0001\b\u0003\b\u015e\b\b\u0001\b\u0001\b\u0001\t\u0003\t\u0163\b\t"+
		"\u0001\t\u0001\t\u0001\t\u0001\t\u0003\t\u0169\b\t\u0001\t\u0001\t\u0001"+
		"\n\u0003\n\u016e\b\n\u0001\n\u0001\n\u0001\n\u0001\n\u0001\n\u0001\n\u0001"+
		"\n\u0003\n\u0177\b\n\u0001\n\u0001\n\u0001\n\u0001\n\u0001\n\u0003\n\u017e"+
		"\b\n\u0001\n\u0001\n\u0001\u000b\u0003\u000b\u0183\b\u000b\u0001\u000b"+
		"\u0001\u000b\u0001\u000b\u0001\u000b\u0001\u000b\u0001\u000b\u0003\u000b"+
		"\u018b\b\u000b\u0001\u000b\u0001\u000b\u0003\u000b\u018f\b\u000b\u0001"+
		"\u000b\u0001\u000b\u0001\u000b\u0005\u000b\u0194\b\u000b\n\u000b\f\u000b"+
		"\u0197\t\u000b\u0001\u000b\u0001\u000b\u0003\u000b\u019b\b\u000b\u0001"+
		"\u000b\u0001\u000b\u0001\f\u0001\f\u0001\f\u0001\f\u0003\f\u01a3\b\f\u0001"+
		"\r\u0003\r\u01a6\b\r\u0001\r\u0001\r\u0001\r\u0001\r\u0001\r\u0003\r\u01ad"+
		"\b\r\u0001\r\u0001\r\u0001\r\u0001\r\u0003\r\u01b3\b\r\u0001\r\u0001\r"+
		"\u0005\r\u01b7\b\r\n\r\f\r\u01ba\t\r\u0001\r\u0001\r\u0003\r\u01be\b\r"+
		"\u0001\r\u0001\r\u0001\u000e\u0001\u000e\u0001\u000e\u0001\u000e\u0001"+
		"\u000e\u0001\u000e\u0003\u000e\u01c8\b\u000e\u0001\u000f\u0003\u000f\u01cb"+
		"\b\u000f\u0001\u000f\u0001\u000f\u0001\u000f\u0001\u0010\u0001\u0010\u0001"+
		"\u0011\u0004\u0011\u01d3\b\u0011\u000b\u0011\f\u0011\u01d4\u0001\u0012"+
		"\u0001\u0012\u0001\u0012\u0001\u0012\u0001\u0012\u0001\u0012\u0001\u0012"+
		"\u0001\u0012\u0001\u0012\u0001\u0012\u0001\u0012\u0001\u0012\u0001\u0012"+
		"\u0003\u0012\u01e4\b\u0012\u0001\u0013\u0001\u0013\u0001\u0013\u0001\u0013"+
		"\u0001\u0013\u0001\u0013\u0001\u0013\u0001\u0013\u0001\u0013\u0003\u0013"+
		"\u01ef\b\u0013\u0001\u0014\u0003\u0014\u01f2\b\u0014\u0001\u0014\u0001"+
		"\u0014\u0001\u0014\u0001\u0014\u0001\u0014\u0001\u0014\u0001\u0015\u0003"+
		"\u0015\u01fb\b\u0015\u0001\u0015\u0001\u0015\u0001\u0015\u0001\u0015\u0001"+
		"\u0015\u0001\u0015\u0001\u0016\u0003\u0016\u0204\b\u0016\u0001\u0016\u0001"+
		"\u0016\u0001\u0016\u0001\u0016\u0003\u0016\u020a\b\u0016\u0001\u0016\u0001"+
		"\u0016\u0001\u0016\u0005\u0016\u020f\b\u0016\n\u0016\f\u0016\u0212\t\u0016"+
		"\u0001\u0016\u0003\u0016\u0215\b\u0016\u0001\u0016\u0001\u0016\u0003\u0016"+
		"\u0219\b\u0016\u0001\u0016\u0001\u0016\u0001\u0017\u0005\u0017\u021e\b"+
		"\u0017\n\u0017\f\u0017\u0221\t\u0017\u0001\u0018\u0003\u0018\u0224\b\u0018"+
		"\u0001\u0018\u0001\u0018\u0001\u0018\u0001\u0018\u0003\u0018\u022a\b\u0018"+
		"\u0001\u0018\u0001\u0018\u0005\u0018\u022e\b\u0018\n\u0018\f\u0018\u0231"+
		"\t\u0018\u0001\u0018\u0003\u0018\u0234\b\u0018\u0001\u0019\u0003\u0019"+
		"\u0237\b\u0019\u0001\u0019\u0001\u0019\u0001\u0019\u0003\u0019\u023c\b"+
		"\u0019\u0001\u0019\u0001\u0019\u0005\u0019\u0240\b\u0019\n\u0019\f\u0019"+
		"\u0243\t\u0019\u0001\u0019\u0003\u0019\u0246\b\u0019\u0001\u001a\u0003"+
		"\u001a\u0249\b\u001a\u0001\u001a\u0001\u001a\u0001\u001a\u0001\u001a\u0003"+
		"\u001a\u024f\b\u001a\u0001\u001a\u0001\u001a\u0005\u001a\u0253\b\u001a"+
		"\n\u001a\f\u001a\u0256\t\u001a\u0001\u001a\u0001\u001a\u0003\u001a\u025a"+
		"\b\u001a\u0001\u001a\u0001\u001a\u0001\u001b\u0003\u001b\u025f\b\u001b"+
		"\u0001\u001b\u0001\u001b\u0001\u001b\u0001\u001b\u0001\u001b\u0001\u001b"+
		"\u0003\u001b\u0267\b\u001b\u0001\u001b\u0001\u001b\u0005\u001b\u026b\b"+
		"\u001b\n\u001b\f\u001b\u026e\t\u001b\u0001\u001b\u0001\u001b\u0003\u001b"+
		"\u0272\b\u001b\u0001\u001b\u0001\u001b\u0001\u001c\u0003\u001c\u0277\b"+
		"\u001c\u0001\u001c\u0001\u001c\u0003\u001c\u027b\b\u001c\u0001\u001c\u0001"+
		"\u001c\u0001\u001d\u0003\u001d\u0280\b\u001d\u0001\u001d\u0001\u001d\u0001"+
		"\u001d\u0003\u001d\u0285\b\u001d\u0001\u001d\u0001\u001d\u0001\u001d\u0004"+
		"\u001d\u028a\b\u001d\u000b\u001d\f\u001d\u028b\u0001\u001d\u0001\u001d"+
		"\u0003\u001d\u0290\b\u001d\u0001\u001d\u0001\u001d\u0001\u001e\u0005\u001e"+
		"\u0295\b\u001e\n\u001e\f\u001e\u0298\t\u001e\u0001\u001f\u0003\u001f\u029b"+
		"\b\u001f\u0001\u001f\u0001\u001f\u0001\u001f\u0001\u001f\u0001\u001f\u0001"+
		"\u001f\u0003\u001f\u02a3\b\u001f\u0001\u001f\u0001\u001f\u0005\u001f\u02a7"+
		"\b\u001f\n\u001f\f\u001f\u02aa\t\u001f\u0001\u001f\u0003\u001f\u02ad\b"+
		"\u001f\u0001 \u0003 \u02b0\b \u0001 \u0001 \u0001 \u0001 \u0001 \u0001"+
		" \u0003 \u02b8\b \u0001 \u0001 \u0001!\u0001!\u0003!\u02be\b!\u0001\""+
		"\u0003\"\u02c1\b\"\u0001\"\u0001\"\u0001\"\u0001\"\u0001\"\u0001\"\u0001"+
		"\"\u0001\"\u0001\"\u0003\"\u02cc\b\"\u0001\"\u0001\"\u0001#\u0001#\u0001"+
		"#\u0003#\u02d3\b#\u0001#\u0001#\u0001$\u0004$\u02d8\b$\u000b$\f$\u02d9"+
		"\u0001%\u0001%\u0001%\u0001%\u0001%\u0003%\u02e1\b%\u0001&\u0003&\u02e4"+
		"\b&\u0001&\u0001&\u0001&\u0001&\u0003&\u02ea\b&\u0001&\u0001&\u0001&\u0001"+
		"&\u0001&\u0003&\u02f1\b&\u0001&\u0003&\u02f4\b&\u0001&\u0001&\u0005&\u02f8"+
		"\b&\n&\f&\u02fb\t&\u0001&\u0001&\u0001&\u0001\'\u0003\'\u0301\b\'\u0001"+
		"\'\u0001\'\u0001\'\u0001\'\u0003\'\u0307\b\'\u0001\'\u0003\'\u030a\b\'"+
		"\u0001\'\u0001\'\u0001(\u0003(\u030f\b(\u0001(\u0001(\u0001(\u0001(\u0003"+
		"(\u0315\b(\u0001(\u0001(\u0001(\u0001(\u0001(\u0003(\u031c\b(\u0001(\u0001"+
		"(\u0005(\u0320\b(\n(\f(\u0323\t(\u0001(\u0001(\u0001(\u0003(\u0328\b("+
		"\u0001(\u0001(\u0001)\u0003)\u032d\b)\u0001)\u0001)\u0001)\u0001)\u0003"+
		")\u0333\b)\u0001)\u0001)\u0001)\u0001)\u0001)\u0003)\u033a\b)\u0001)\u0001"+
		")\u0005)\u033e\b)\n)\f)\u0341\t)\u0001)\u0001)\u0003)\u0345\b)\u0001)"+
		"\u0001)\u0001*\u0003*\u034a\b*\u0001*\u0001*\u0001*\u0001*\u0001*\u0001"+
		"*\u0003*\u0352\b*\u0001*\u0001*\u0001*\u0001*\u0001*\u0001*\u0001*\u0003"+
		"*\u035b\b*\u0001*\u0001*\u0001+\u0003+\u0360\b+\u0001+\u0001+\u0001+\u0001"+
		"+\u0001+\u0001+\u0003+\u0368\b+\u0001+\u0001+\u0001+\u0001+\u0001+\u0003"+
		"+\u036f\b+\u0001+\u0001+\u0001+\u0003+\u0374\b+\u0001+\u0001+\u0001,\u0001"+
		",\u0001-\u0001-\u0001.\u0001.\u0001.\u0001.\u0001.\u0003.\u0381\b.\u0001"+
		".\u0001.\u0005.\u0385\b.\n.\f.\u0388\t.\u0001/\u0001/\u00010\u00010\u0001"+
		"1\u00011\u00012\u00012\u00012\u00012\u00012\u00012\u00012\u00032\u0397"+
		"\b2\u00013\u00013\u00013\u00013\u00033\u039d\b3\u00014\u00014\u00014\u0005"+
		"4\u03a2\b4\n4\f4\u03a5\t4\u00015\u00015\u00035\u03a9\b5\u00016\u00016"+
		"\u00016\u00056\u03ae\b6\n6\f6\u03b1\t6\u00017\u00017\u00017\u00047\u03b6"+
		"\b7\u000b7\f7\u03b7\u00018\u00018\u00018\u00058\u03bd\b8\n8\f8\u03c0\t"+
		"8\u00019\u00019\u00019\u00019\u0001:\u0001:\u0001:\u0005:\u03c9\b:\n:"+
		"\f:\u03cc\t:\u0001;\u0001;\u0001;\u0001;\u0003;\u03d2\b;\u0001<\u0001"+
		"<\u0001=\u0001=\u0001>\u0001>\u0001>\u0001>\u0001>\u0001>\u0003>\u03de"+
		"\b>\u0001?\u0001?\u0003?\u03e2\b?\u0001@\u0001@\u0001@\u0003@\u03e7\b"+
		"@\u0001A\u0001A\u0001B\u0001B\u0001C\u0001C\u0005C\u03ef\bC\nC\fC\u03f2"+
		"\tC\u0001C\u0001C\u0001D\u0001D\u0003D\u03f8\bD\u0001E\u0004E\u03fb\b"+
		"E\u000bE\fE\u03fc\u0001F\u0001F\u0001F\u0001F\u0001G\u0001G\u0001G\u0001"+
		"G\u0001H\u0001H\u0001H\u0001H\u0001I\u0001I\u0001I\u0001I\u0001I\u0003"+
		"I\u0410\bI\u0001I\u0001I\u0001I\u0001I\u0001I\u0005I\u0417\bI\nI\fI\u041a"+
		"\tI\u0001I\u0001I\u0001I\u0005I\u041f\bI\nI\fI\u0422\tI\u0001J\u0001J"+
		"\u0001J\u0001J\u0001J\u0001J\u0001J\u0001J\u0001J\u0003J\u042d\bJ\u0001"+
		"J\u0001J\u0001J\u0001J\u0001J\u0005J\u0434\bJ\nJ\fJ\u0437\tJ\u0001K\u0001"+
		"K\u0003K\u043b\bK\u0001L\u0001L\u0001M\u0001M\u0001M\u0001M\u0001N\u0001"+
		"N\u0003N\u0445\bN\u0001O\u0001O\u0001O\u0001P\u0001P\u0001P\u0001Q\u0001"+
		"Q\u0001Q\u0001Q\u0001R\u0001R\u0001R\u0001R\u0001S\u0001S\u0001S\u0001"+
		"S\u0001T\u0001T\u0001T\u0001T\u0001U\u0001U\u0001U\u0005U\u0460\bU\nU"+
		"\fU\u0463\tU\u0001V\u0001V\u0001V\u0001V\u0001W\u0001W\u0001W\u0003W\u046c"+
		"\bW\u0001W\u0001W\u0001X\u0001X\u0001X\u0001X\u0001X\u0001X\u0001X\u0001"+
		"X\u0001X\u0001X\u0001X\u0001X\u0001X\u0001X\u0001X\u0001X\u0003X\u0480"+
		"\bX\u0001Y\u0001Y\u0001Y\u0003Y\u0485\bY\u0001Y\u0001Y\u0001Z\u0001Z\u0003"+
		"Z\u048b\bZ\u0001Z\u0001Z\u0001Z\u0001[\u0001[\u0001[\u0001[\u0001[\u0005"+
		"[\u0495\b[\n[\f[\u0498\t[\u0001[\u0001[\u0001\\\u0001\\\u0001\\\u0001"+
		"\\\u0001\\\u0001\\\u0005\\\u04a2\b\\\n\\\f\\\u04a5\t\\\u0001\\\u0001\\"+
		"\u0001\\\u0001\\\u0001\\\u0001]\u0001]\u0001]\u0001]\u0001]\u0004]\u04b1"+
		"\b]\u000b]\f]\u04b2\u0001]\u0001]\u0001^\u0001^\u0001^\u0001^\u0001^\u0001"+
		"^\u0000\u0003\\\u0092\u0094_\u0000\u0002\u0004\u0006\b\n\f\u000e\u0010"+
		"\u0012\u0014\u0016\u0018\u001a\u001c\u001e \"$&(*,.02468:<>@BDFHJLNPR"+
		"TVXZ\\^`bdfhjlnprtvxz|~\u0080\u0082\u0084\u0086\u0088\u008a\u008c\u008e"+
		"\u0090\u0092\u0094\u0096\u0098\u009a\u009c\u009e\u00a0\u00a2\u00a4\u00a6"+
		"\u00a8\u00aa\u00ac\u00ae\u00b0\u00b2\u00b4\u00b6\u00b8\u00ba\u00bc\u0000"+
		"\u0000\u0535\u0000\u00bf\u0001\u0000\u0000\u0000\u0002\u00d3\u0001\u0000"+
		"\u0000\u0000\u0004\u00e0\u0001\u0000\u0000\u0000\u0006\u00e3\u0001\u0000"+
		"\u0000\u0000\b\u00f9\u0001\u0000\u0000\u0000\n\u00fe\u0001\u0000\u0000"+
		"\u0000\f\u011c\u0001\u0000\u0000\u0000\u000e\u0142\u0001\u0000\u0000\u0000"+
		"\u0010\u0145\u0001\u0000\u0000\u0000\u0012\u0162\u0001\u0000\u0000\u0000"+
		"\u0014\u016d\u0001\u0000\u0000\u0000\u0016\u0182\u0001\u0000\u0000\u0000"+
		"\u0018\u01a2\u0001\u0000\u0000\u0000\u001a\u01a5\u0001\u0000\u0000\u0000"+
		"\u001c\u01c7\u0001\u0000\u0000\u0000\u001e\u01ca\u0001\u0000\u0000\u0000"+
		" \u01cf\u0001\u0000\u0000\u0000\"\u01d2\u0001\u0000\u0000\u0000$\u01e3"+
		"\u0001\u0000\u0000\u0000&\u01ee\u0001\u0000\u0000\u0000(\u01f1\u0001\u0000"+
		"\u0000\u0000*\u01fa\u0001\u0000\u0000\u0000,\u0203\u0001\u0000\u0000\u0000"+
		".\u021f\u0001\u0000\u0000\u00000\u0223\u0001\u0000\u0000\u00002\u0236"+
		"\u0001\u0000\u0000\u00004\u0248\u0001\u0000\u0000\u00006\u025e\u0001\u0000"+
		"\u0000\u00008\u0276\u0001\u0000\u0000\u0000:\u027f\u0001\u0000\u0000\u0000"+
		"<\u0296\u0001\u0000\u0000\u0000>\u029a\u0001\u0000\u0000\u0000@\u02af"+
		"\u0001\u0000\u0000\u0000B\u02bd\u0001\u0000\u0000\u0000D\u02c0\u0001\u0000"+
		"\u0000\u0000F\u02cf\u0001\u0000\u0000\u0000H\u02d7\u0001\u0000\u0000\u0000"+
		"J\u02e0\u0001\u0000\u0000\u0000L\u02e3\u0001\u0000\u0000\u0000N\u0300"+
		"\u0001\u0000\u0000\u0000P\u030e\u0001\u0000\u0000\u0000R\u032c\u0001\u0000"+
		"\u0000\u0000T\u0349\u0001\u0000\u0000\u0000V\u035f\u0001\u0000\u0000\u0000"+
		"X\u0377\u0001\u0000\u0000\u0000Z\u0379\u0001\u0000\u0000\u0000\\\u0380"+
		"\u0001\u0000\u0000\u0000^\u0389\u0001\u0000\u0000\u0000`\u038b\u0001\u0000"+
		"\u0000\u0000b\u038d\u0001\u0000\u0000\u0000d\u0396\u0001\u0000\u0000\u0000"+
		"f\u039c\u0001\u0000\u0000\u0000h\u039e\u0001\u0000\u0000\u0000j\u03a8"+
		"\u0001\u0000\u0000\u0000l\u03aa\u0001\u0000\u0000\u0000n\u03b2\u0001\u0000"+
		"\u0000\u0000p\u03b9\u0001\u0000\u0000\u0000r\u03c1\u0001\u0000\u0000\u0000"+
		"t\u03c5\u0001\u0000\u0000\u0000v\u03d1\u0001\u0000\u0000\u0000x\u03d3"+
		"\u0001\u0000\u0000\u0000z\u03d5\u0001\u0000\u0000\u0000|\u03dd\u0001\u0000"+
		"\u0000\u0000~\u03e1\u0001\u0000\u0000\u0000\u0080\u03e6\u0001\u0000\u0000"+
		"\u0000\u0082\u03e8\u0001\u0000\u0000\u0000\u0084\u03ea\u0001\u0000\u0000"+
		"\u0000\u0086\u03ec\u0001\u0000\u0000\u0000\u0088\u03f7\u0001\u0000\u0000"+
		"\u0000\u008a\u03fa\u0001\u0000\u0000\u0000\u008c\u03fe\u0001\u0000\u0000"+
		"\u0000\u008e\u0402\u0001\u0000\u0000\u0000\u0090\u0406\u0001\u0000\u0000"+
		"\u0000\u0092\u040f\u0001\u0000\u0000\u0000\u0094\u042c\u0001\u0000\u0000"+
		"\u0000\u0096\u043a\u0001\u0000\u0000\u0000\u0098\u043c\u0001\u0000\u0000"+
		"\u0000\u009a\u043e\u0001\u0000\u0000\u0000\u009c\u0444\u0001\u0000\u0000"+
		"\u0000\u009e\u0446\u0001\u0000\u0000\u0000\u00a0\u0449\u0001\u0000\u0000"+
		"\u0000\u00a2\u044c\u0001\u0000\u0000\u0000\u00a4\u0450\u0001\u0000\u0000"+
		"\u0000\u00a6\u0454\u0001\u0000\u0000\u0000\u00a8\u0458\u0001\u0000\u0000"+
		"\u0000\u00aa\u045c\u0001\u0000\u0000\u0000\u00ac\u0464\u0001\u0000\u0000"+
		"\u0000\u00ae\u0468\u0001\u0000\u0000\u0000\u00b0\u047f\u0001\u0000\u0000"+
		"\u0000\u00b2\u0481\u0001\u0000\u0000\u0000\u00b4\u048a\u0001\u0000\u0000"+
		"\u0000\u00b6\u048f\u0001\u0000\u0000\u0000\u00b8\u049b\u0001\u0000\u0000"+
		"\u0000\u00ba\u04ab\u0001\u0000\u0000\u0000\u00bc\u04b6\u0001\u0000\u0000"+
		"\u0000\u00be\u00c0\u0003\u001e\u000f\u0000\u00bf\u00be\u0001\u0000\u0000"+
		"\u0000\u00bf\u00c0\u0001\u0000\u0000\u0000\u00c0\u00c4\u0001\u0000\u0000"+
		"\u0000\u00c1\u00c3\u0003\u0004\u0002\u0000\u00c2\u00c1\u0001\u0000\u0000"+
		"\u0000\u00c3\u00c6\u0001\u0000\u0000\u0000\u00c4\u00c2\u0001\u0000\u0000"+
		"\u0000\u00c4\u00c5\u0001\u0000\u0000\u0000\u00c5\u00c8\u0001\u0000\u0000"+
		"\u0000\u00c6\u00c4\u0001\u0000\u0000\u0000\u00c7\u00c9\u0003\b\u0004\u0000"+
		"\u00c8\u00c7\u0001\u0000\u0000\u0000\u00c8\u00c9\u0001\u0000\u0000\u0000"+
		"\u00c9\u00cd\u0001\u0000\u0000\u0000\u00ca\u00cc\u0005^\u0000\u0000\u00cb"+
		"\u00ca\u0001\u0000\u0000\u0000\u00cc\u00cf\u0001\u0000\u0000\u0000\u00cd"+
		"\u00cb\u0001\u0000\u0000\u0000\u00cd\u00ce\u0001\u0000\u0000\u0000\u00ce"+
		"\u00d0\u0001\u0000\u0000\u0000\u00cf\u00cd\u0001\u0000\u0000\u0000\u00d0"+
		"\u00d1\u0005\u0000\u0000\u0001\u00d1\u0001\u0001\u0000\u0000\u0000\u00d2"+
		"\u00d4\u0003\u0004\u0002\u0000\u00d3\u00d2\u0001\u0000\u0000\u0000\u00d4"+
		"\u00d5\u0001\u0000\u0000\u0000\u00d5\u00d3\u0001\u0000\u0000\u0000\u00d5"+
		"\u00d6\u0001\u0000\u0000\u0000\u00d6\u0003\u0001\u0000\u0000\u0000\u00d7"+
		"\u00e1\u0003\u0006\u0003\u0000\u00d8\u00e1\u0003\n\u0005\u0000\u00d9\u00e1"+
		"\u0003\f\u0006\u0000\u00da\u00e1\u0003\u0010\b\u0000\u00db\u00e1\u0003"+
		"\u0012\t\u0000\u00dc\u00e1\u0003\u0014\n\u0000\u00dd\u00e1\u0003\u0016"+
		"\u000b\u0000\u00de\u00e1\u0003\u001a\r\u0000\u00df\u00e1\u0003\u001e\u000f"+
		"\u0000\u00e0\u00d7\u0001\u0000\u0000\u0000\u00e0\u00d8\u0001\u0000\u0000"+
		"\u0000\u00e0\u00d9\u0001\u0000\u0000\u0000\u00e0\u00da\u0001\u0000\u0000"+
		"\u0000\u00e0\u00db\u0001\u0000\u0000\u0000\u00e0\u00dc\u0001\u0000\u0000"+
		"\u0000\u00e0\u00dd\u0001\u0000\u0000\u0000\u00e0\u00de\u0001\u0000\u0000"+
		"\u0000\u00e0\u00df\u0001\u0000\u0000\u0000\u00e1\u0005\u0001\u0000\u0000"+
		"\u0000\u00e2\u00e4\u0005k\u0000\u0000\u00e3\u00e2\u0001\u0000\u0000\u0000"+
		"\u00e3\u00e4\u0001\u0000\u0000\u0000\u00e4\u00e5\u0001\u0000\u0000\u0000"+
		"\u00e5\u00e6\u0005*\u0000\u0000\u00e6\u00e7\u0005\b\u0000\u0000\u00e7"+
		"\u00e8\u0005O\u0000\u0000\u00e8\u00e9\u0005P\u0000\u0000\u00e9\u00ea\u0005"+
		"E\u0000\u0000\u00ea\u00eb\u0005-\u0000\u0000\u00eb\u00ec\u0005S\u0000"+
		"\u0000\u00ec\u00f0\u0005^\u0000\u0000\u00ed\u00ef\u0003&\u0013\u0000\u00ee"+
		"\u00ed\u0001\u0000\u0000\u0000\u00ef\u00f2\u0001\u0000\u0000\u0000\u00f0"+
		"\u00ee\u0001\u0000\u0000\u0000\u00f0\u00f1\u0001\u0000\u0000\u0000\u00f1"+
		"\u00f3\u0001\u0000\u0000\u0000\u00f2\u00f0\u0001\u0000\u0000\u0000\u00f3"+
		"\u00f5\u0005m\u0000\u0000\u00f4\u00f6\u0005l\u0000\u0000\u00f5\u00f4\u0001"+
		"\u0000\u0000\u0000\u00f5\u00f6\u0001\u0000\u0000\u0000\u00f6\u00f7\u0001"+
		"\u0000\u0000\u0000\u00f7\u00f8\u0005^\u0000\u0000\u00f8\u0007\u0001\u0000"+
		"\u0000\u0000\u00f9\u00fa\u0005\b\u0000\u0000\u00fa\u00fb\u0005O\u0000"+
		"\u0000\u00fb\u00fc\u0005P\u0000\u0000\u00fc\t\u0001\u0000\u0000\u0000"+
		"\u00fd\u00ff\u0005k\u0000\u0000\u00fe\u00fd\u0001\u0000\u0000\u0000\u00fe"+
		"\u00ff\u0001\u0000\u0000\u0000\u00ff\u0100\u0001\u0000\u0000\u0000\u0100"+
		"\u0101\u0005*\u0000\u0000\u0101\u0102\u0003^/\u0000\u0102\u0104\u0005"+
		"O\u0000\u0000\u0103\u0105\u0003l6\u0000\u0104\u0103\u0001\u0000\u0000"+
		"\u0000\u0104\u0105\u0001\u0000\u0000\u0000\u0105\u0106\u0001\u0000\u0000"+
		"\u0000\u0106\u0107\u0005P\u0000\u0000\u0107\u0108\u0005E\u0000\u0000\u0108"+
		"\u0109\u0003v;\u0000\u0109\u010b\u0005S\u0000\u0000\u010a\u010c\u0003"+
		" \u0010\u0000\u010b\u010a\u0001\u0000\u0000\u0000\u010b\u010c\u0001\u0000"+
		"\u0000\u0000\u010c\u010d\u0001\u0000\u0000\u0000\u010d\u0111\u0005^\u0000"+
		"\u0000\u010e\u0110\u0003&\u0013\u0000\u010f\u010e\u0001\u0000\u0000\u0000"+
		"\u0110\u0113\u0001\u0000\u0000\u0000\u0111\u010f\u0001\u0000\u0000\u0000"+
		"\u0111\u0112\u0001\u0000\u0000\u0000\u0112\u0114\u0001\u0000\u0000\u0000"+
		"\u0113\u0111\u0001\u0000\u0000\u0000\u0114\u0115\u0003F#\u0000\u0115\u0117"+
		"\u0005n\u0000\u0000\u0116\u0118\u0005l\u0000\u0000\u0117\u0116\u0001\u0000"+
		"\u0000\u0000\u0117\u0118\u0001\u0000\u0000\u0000\u0118\u0119\u0001\u0000"+
		"\u0000\u0000\u0119\u011a\u0005^\u0000\u0000\u011a\u000b\u0001\u0000\u0000"+
		"\u0000\u011b\u011d\u0005k\u0000\u0000\u011c\u011b\u0001\u0000\u0000\u0000"+
		"\u011c\u011d\u0001\u0000\u0000\u0000\u011d\u011e\u0001\u0000\u0000\u0000"+
		"\u011e\u011f\u0005\u0001\u0000\u0000\u011f\u0120\u0003b1\u0000\u0120\u0121"+
		"\u0005O\u0000\u0000\u0121\u0122\u00052\u0000\u0000\u0122\u0123\u0005P"+
		"\u0000\u0000\u0123\u0124\u0005S\u0000\u0000\u0124\u0125\u0005^\u0000\u0000"+
		"\u0125\u0126\u0005*\u0000\u0000\u0126\u0127\u0003`0\u0000\u0127\u0128"+
		"\u0005O\u0000\u0000\u0128\u0129\u0005I\u0000\u0000\u0129\u012a\u0005S"+
		"\u0000\u0000\u012a\u012b\u0003b1\u0000\u012b\u012c\u0005P\u0000\u0000"+
		"\u012c\u012d\u0005E\u0000\u0000\u012d\u012e\u0005-\u0000\u0000\u012e\u0130"+
		"\u0005S\u0000\u0000\u012f\u0131\u0003 \u0010\u0000\u0130\u012f\u0001\u0000"+
		"\u0000\u0000\u0130\u0131\u0001\u0000\u0000\u0000\u0131\u0132\u0001\u0000"+
		"\u0000\u0000\u0132\u0136\u0005^\u0000\u0000\u0133\u0135\u0003\u000e\u0007"+
		"\u0000\u0134\u0133\u0001\u0000\u0000\u0000\u0135\u0138\u0001\u0000\u0000"+
		"\u0000\u0136\u0134\u0001\u0000\u0000\u0000\u0136\u0137\u0001\u0000\u0000"+
		"\u0000\u0137\u0139\u0001\u0000\u0000\u0000\u0138\u0136\u0001\u0000\u0000"+
		"\u0000\u0139\u013b\u0005o\u0000\u0000\u013a\u013c\u0005l\u0000\u0000\u013b"+
		"\u013a\u0001\u0000\u0000\u0000\u013b\u013c\u0001\u0000\u0000\u0000\u013c"+
		"\u013d\u0001\u0000\u0000\u0000\u013d\u013e\u0005^\u0000\u0000\u013e\r"+
		"\u0001\u0000\u0000\u0000\u013f\u0143\u0003D\"\u0000\u0140\u0143\u0003"+
		"(\u0014\u0000\u0141\u0143\u0003\u001e\u000f\u0000\u0142\u013f\u0001\u0000"+
		"\u0000\u0000\u0142\u0140\u0001\u0000\u0000\u0000\u0142\u0141\u0001\u0000"+
		"\u0000\u0000\u0143\u000f\u0001\u0000\u0000\u0000\u0144\u0146\u0005k\u0000"+
		"\u0000\u0145\u0144\u0001\u0000\u0000\u0000\u0145\u0146\u0001\u0000\u0000"+
		"\u0000\u0146\u0147\u0001\u0000\u0000\u0000\u0147\u0148\u0005*\u0000\u0000"+
		"\u0148\u0149\u0003^/\u0000\u0149\u014b\u0005O\u0000\u0000\u014a\u014c"+
		"\u0003l6\u0000\u014b\u014a\u0001\u0000\u0000\u0000\u014b\u014c\u0001\u0000"+
		"\u0000\u0000\u014c\u014d\u0001\u0000\u0000\u0000\u014d\u014e\u0005P\u0000"+
		"\u0000\u014e\u014f\u0005E\u0000\u0000\u014f\u0150\u0005-\u0000\u0000\u0150"+
		"\u0152\u0005S\u0000\u0000\u0151\u0153\u0003 \u0010\u0000\u0152\u0151\u0001"+
		"\u0000\u0000\u0000\u0152\u0153\u0001\u0000\u0000\u0000\u0153\u0154\u0001"+
		"\u0000\u0000\u0000\u0154\u0158\u0005^\u0000\u0000\u0155\u0157\u0003&\u0013"+
		"\u0000\u0156\u0155\u0001\u0000\u0000\u0000\u0157\u015a\u0001\u0000\u0000"+
		"\u0000\u0158\u0156\u0001\u0000\u0000\u0000\u0158\u0159\u0001\u0000\u0000"+
		"\u0000\u0159\u015b\u0001\u0000\u0000\u0000\u015a\u0158\u0001\u0000\u0000"+
		"\u0000\u015b\u015d\u0005p\u0000\u0000\u015c\u015e\u0005l\u0000\u0000\u015d"+
		"\u015c\u0001\u0000\u0000\u0000\u015d\u015e\u0001\u0000\u0000\u0000\u015e"+
		"\u015f\u0001\u0000\u0000\u0000\u015f\u0160\u0005^\u0000\u0000\u0160\u0011"+
		"\u0001\u0000\u0000\u0000\u0161\u0163\u0005j\u0000\u0000\u0162\u0161\u0001"+
		"\u0000\u0000\u0000\u0162\u0163\u0001\u0000\u0000\u0000\u0163\u0164\u0001"+
		"\u0000\u0000\u0000\u0164\u0165\u0003X,\u0000\u0165\u0166\u0005J\u0000"+
		"\u0000\u0166\u0168\u0003f3\u0000\u0167\u0169\u0003 \u0010\u0000\u0168"+
		"\u0167\u0001\u0000\u0000\u0000\u0168\u0169\u0001\u0000\u0000\u0000\u0169"+
		"\u016a\u0001\u0000\u0000\u0000\u016a\u016b\u0005^\u0000\u0000\u016b\u0013"+
		"\u0001\u0000\u0000\u0000\u016c\u016e\u0005k\u0000\u0000\u016d\u016c\u0001"+
		"\u0000\u0000\u0000\u016d\u016e\u0001\u0000\u0000\u0000\u016e\u016f\u0001"+
		"\u0000\u0000\u0000\u016f\u0170\u0005\u0001\u0000\u0000\u0170\u0171\u0003"+
		"d2\u0000\u0171\u0172\u0005O\u0000\u0000\u0172\u0173\u00051\u0000\u0000"+
		"\u0173\u0174\u0005P\u0000\u0000\u0174\u0176\u0005S\u0000\u0000\u0175\u0177"+
		"\u0003 \u0010\u0000\u0176\u0175\u0001\u0000\u0000\u0000\u0176\u0177\u0001"+
		"\u0000\u0000\u0000\u0177\u0178\u0001\u0000\u0000\u0000\u0178\u0179\u0005"+
		"^\u0000\u0000\u0179\u017a\u0003t:\u0000\u017a\u017b\u0005^\u0000\u0000"+
		"\u017b\u017d\u0005q\u0000\u0000\u017c\u017e\u0005l\u0000\u0000\u017d\u017c"+
		"\u0001\u0000\u0000\u0000\u017d\u017e\u0001\u0000\u0000\u0000\u017e\u017f"+
		"\u0001\u0000\u0000\u0000\u017f\u0180\u0005^\u0000\u0000\u0180\u0015\u0001"+
		"\u0000\u0000\u0000\u0181\u0183\u0005k\u0000\u0000\u0182\u0181\u0001\u0000"+
		"\u0000\u0000\u0182\u0183\u0001\u0000\u0000\u0000\u0183\u0184\u0001\u0000"+
		"\u0000\u0000\u0184\u0185\u0005\u0001\u0000\u0000\u0185\u018a\u0003d2\u0000"+
		"\u0186\u0187\u0005O\u0000\u0000\u0187\u0188\u0003d2\u0000\u0188\u0189"+
		"\u0005P\u0000\u0000\u0189\u018b\u0001\u0000\u0000\u0000\u018a\u0186\u0001"+
		"\u0000\u0000\u0000\u018a\u018b\u0001\u0000\u0000\u0000\u018b\u018c\u0001"+
		"\u0000\u0000\u0000\u018c\u018e\u0005S\u0000\u0000\u018d\u018f\u0003 \u0010"+
		"\u0000\u018e\u018d\u0001\u0000\u0000\u0000\u018e\u018f\u0001\u0000\u0000"+
		"\u0000\u018f\u0190\u0001\u0000\u0000\u0000\u0190\u0191\u0005^\u0000\u0000"+
		"\u0191\u0195\u0003L&\u0000\u0192\u0194\u0003\u0018\f\u0000\u0193\u0192"+
		"\u0001\u0000\u0000\u0000\u0194\u0197\u0001\u0000\u0000\u0000\u0195\u0193"+
		"\u0001\u0000\u0000\u0000\u0195\u0196\u0001\u0000\u0000\u0000\u0196\u0198"+
		"\u0001\u0000\u0000\u0000\u0197\u0195\u0001\u0000\u0000\u0000\u0198\u019a"+
		"\u0005r\u0000\u0000\u0199\u019b\u0005l\u0000\u0000\u019a\u0199\u0001\u0000"+
		"\u0000\u0000\u019a\u019b\u0001\u0000\u0000\u0000\u019b\u019c\u0001\u0000"+
		"\u0000\u0000\u019c\u019d\u0005^\u0000\u0000\u019d\u0017\u0001\u0000\u0000"+
		"\u0000\u019e\u01a3\u0003N\'\u0000\u019f\u01a3\u0003P(\u0000\u01a0\u01a3"+
		"\u0003R)\u0000\u01a1\u01a3\u0003\u001e\u000f\u0000\u01a2\u019e\u0001\u0000"+
		"\u0000\u0000\u01a2\u019f\u0001\u0000\u0000\u0000\u01a2\u01a0\u0001\u0000"+
		"\u0000\u0000\u01a2\u01a1\u0001\u0000\u0000\u0000\u01a3\u0019\u0001\u0000"+
		"\u0000\u0000\u01a4\u01a6\u0005k\u0000\u0000\u01a5\u01a4\u0001\u0000\u0000"+
		"\u0000\u01a5\u01a6\u0001\u0000\u0000\u0000\u01a6\u01a7\u0001\u0000\u0000"+
		"\u0000\u01a7\u01a8\u0005\u0001\u0000\u0000\u01a8\u01a9\u0003d2\u0000\u01a9"+
		"\u01ac\u0005O\u0000\u0000\u01aa\u01ad\u0003d2\u0000\u01ab\u01ad\u0005"+
		"0\u0000\u0000\u01ac\u01aa\u0001\u0000\u0000\u0000\u01ac\u01ab\u0001\u0000"+
		"\u0000\u0000\u01ad\u01ae\u0001\u0000\u0000\u0000\u01ae\u01af\u0005P\u0000"+
		"\u0000\u01af\u01b0\u0001\u0000\u0000\u0000\u01b0\u01b2\u0005S\u0000\u0000"+
		"\u01b1\u01b3\u0003 \u0010\u0000\u01b2\u01b1\u0001\u0000\u0000\u0000\u01b2"+
		"\u01b3\u0001\u0000\u0000\u0000\u01b3\u01b4\u0001\u0000\u0000\u0000\u01b4"+
		"\u01b8\u0005^\u0000\u0000\u01b5\u01b7\u0003\u001c\u000e\u0000\u01b6\u01b5"+
		"\u0001\u0000\u0000\u0000\u01b7\u01ba\u0001\u0000\u0000\u0000\u01b8\u01b6"+
		"\u0001\u0000\u0000\u0000\u01b8\u01b9\u0001\u0000\u0000\u0000\u01b9\u01bb"+
		"\u0001\u0000\u0000\u0000\u01ba\u01b8\u0001\u0000\u0000\u0000\u01bb\u01bd"+
		"\u0005r\u0000\u0000\u01bc\u01be\u0005l\u0000\u0000\u01bd\u01bc\u0001\u0000"+
		"\u0000\u0000\u01bd\u01be\u0001\u0000\u0000\u0000\u01be\u01bf\u0001\u0000"+
		"\u0000\u0000\u01bf\u01c0\u0005^\u0000\u0000\u01c0\u001b\u0001\u0000\u0000"+
		"\u0000\u01c1\u01c8\u0003N\'\u0000\u01c2\u01c8\u0003P(\u0000\u01c3\u01c8"+
		"\u0003R)\u0000\u01c4\u01c8\u0003T*\u0000\u01c5\u01c8\u0003V+\u0000\u01c6"+
		"\u01c8\u0003\u001e\u000f\u0000\u01c7\u01c1\u0001\u0000\u0000\u0000\u01c7"+
		"\u01c2\u0001\u0000\u0000\u0000\u01c7\u01c3\u0001\u0000\u0000\u0000\u01c7"+
		"\u01c4\u0001\u0000\u0000\u0000\u01c7\u01c5\u0001\u0000\u0000\u0000\u01c7"+
		"\u01c6\u0001\u0000\u0000\u0000\u01c8\u001d\u0001\u0000\u0000\u0000\u01c9"+
		"\u01cb\u0005j\u0000\u0000\u01ca\u01c9\u0001\u0000\u0000\u0000\u01ca\u01cb"+
		"\u0001\u0000\u0000\u0000\u01cb\u01cc\u0001\u0000\u0000\u0000\u01cc\u01cd"+
		"\u0003 \u0010\u0000\u01cd\u01ce\u0005^\u0000\u0000\u01ce\u001f\u0001\u0000"+
		"\u0000\u0000\u01cf\u01d0\u0005~\u0000\u0000\u01d0!\u0001\u0000\u0000\u0000"+
		"\u01d1\u01d3\u0003$\u0012\u0000\u01d2\u01d1\u0001\u0000\u0000\u0000\u01d3"+
		"\u01d4\u0001\u0000\u0000\u0000\u01d4\u01d2\u0001\u0000\u0000\u0000\u01d4"+
		"\u01d5\u0001\u0000\u0000\u0000\u01d5#\u0001\u0000\u0000\u0000\u01d6\u01e4"+
		"\u0003(\u0014\u0000\u01d7\u01e4\u0003D\"\u0000\u01d8\u01e4\u0003*\u0015"+
		"\u0000\u01d9\u01e4\u0003,\u0016\u0000\u01da\u01e4\u00030\u0018\u0000\u01db"+
		"\u01e4\u00032\u0019\u0000\u01dc\u01e4\u00034\u001a\u0000\u01dd\u01e4\u0003"+
		"6\u001b\u0000\u01de\u01e4\u00038\u001c\u0000\u01df\u01e4\u0003:\u001d"+
		"\u0000\u01e0\u01e4\u0003>\u001f\u0000\u01e1\u01e4\u0003@ \u0000\u01e2"+
		"\u01e4\u0003\u001e\u000f\u0000\u01e3\u01d6\u0001\u0000\u0000\u0000\u01e3"+
		"\u01d7\u0001\u0000\u0000\u0000\u01e3\u01d8\u0001\u0000\u0000\u0000\u01e3"+
		"\u01d9\u0001\u0000\u0000\u0000\u01e3\u01da\u0001\u0000\u0000\u0000\u01e3"+
		"\u01db\u0001\u0000\u0000\u0000\u01e3\u01dc\u0001\u0000\u0000\u0000\u01e3"+
		"\u01dd\u0001\u0000\u0000\u0000\u01e3\u01de\u0001\u0000\u0000\u0000\u01e3"+
		"\u01df\u0001\u0000\u0000\u0000\u01e3\u01e0\u0001\u0000\u0000\u0000\u01e3"+
		"\u01e1\u0001\u0000\u0000\u0000\u01e3\u01e2\u0001\u0000\u0000\u0000\u01e4"+
		"%\u0001\u0000\u0000\u0000\u01e5\u01ef\u0003(\u0014\u0000\u01e6\u01ef\u0003"+
		"*\u0015\u0000\u01e7\u01ef\u0003,\u0016\u0000\u01e8\u01ef\u00034\u001a"+
		"\u0000\u01e9\u01ef\u00036\u001b\u0000\u01ea\u01ef\u00038\u001c\u0000\u01eb"+
		"\u01ef\u0003:\u001d\u0000\u01ec\u01ef\u0003@ \u0000\u01ed\u01ef\u0003"+
		"\u001e\u000f\u0000\u01ee\u01e5\u0001\u0000\u0000\u0000\u01ee\u01e6\u0001"+
		"\u0000\u0000\u0000\u01ee\u01e7\u0001\u0000\u0000\u0000\u01ee\u01e8\u0001"+
		"\u0000\u0000\u0000\u01ee\u01e9\u0001\u0000\u0000\u0000\u01ee\u01ea\u0001"+
		"\u0000\u0000\u0000\u01ee\u01eb\u0001\u0000\u0000\u0000\u01ee\u01ec\u0001"+
		"\u0000\u0000\u0000\u01ee\u01ed\u0001\u0000\u0000\u0000\u01ef\'\u0001\u0000"+
		"\u0000\u0000\u01f0\u01f2\u0005j\u0000\u0000\u01f1\u01f0\u0001\u0000\u0000"+
		"\u0000\u01f1\u01f2\u0001\u0000\u0000\u0000\u01f2\u01f3\u0001\u0000\u0000"+
		"\u0000\u01f3\u01f4\u0003X,\u0000\u01f4\u01f5\u0005J\u0000\u0000\u01f5"+
		"\u01f6\u0003\u0092I\u0000\u01f6\u01f7\u0005{\u0000\u0000\u01f7\u01f8\u0005"+
		"^\u0000\u0000\u01f8)\u0001\u0000\u0000\u0000\u01f9\u01fb\u0005j\u0000"+
		"\u0000\u01fa\u01f9\u0001\u0000\u0000\u0000\u01fa\u01fb\u0001\u0000\u0000"+
		"\u0000\u01fb\u01fc\u0001\u0000\u0000\u0000\u01fc\u01fd\u0003\\.\u0000"+
		"\u01fd\u01fe\u0005J\u0000\u0000\u01fe\u01ff\u0003\u0092I\u0000\u01ff\u0200"+
		"\u0005z\u0000\u0000\u0200\u0201\u0005^\u0000\u0000\u0201+\u0001\u0000"+
		"\u0000\u0000\u0202\u0204\u0005k\u0000\u0000\u0203\u0202\u0001\u0000\u0000"+
		"\u0000\u0203\u0204\u0001\u0000\u0000\u0000\u0204\u0205\u0001\u0000\u0000"+
		"\u0000\u0205\u0206\u0005\u0005\u0000\u0000\u0206\u0207\u0003\u0092I\u0000"+
		"\u0207\u0209\u0005S\u0000\u0000\u0208\u020a\u0003 \u0010\u0000\u0209\u0208"+
		"\u0001\u0000\u0000\u0000\u0209\u020a\u0001\u0000\u0000\u0000\u020a\u020b"+
		"\u0001\u0000\u0000\u0000\u020b\u020c\u0005^\u0000\u0000\u020c\u0210\u0003"+
		".\u0017\u0000\u020d\u020f\u00030\u0018\u0000\u020e\u020d\u0001\u0000\u0000"+
		"\u0000\u020f\u0212\u0001\u0000\u0000\u0000\u0210\u020e\u0001\u0000\u0000"+
		"\u0000\u0210\u0211\u0001\u0000\u0000\u0000\u0211\u0214\u0001\u0000\u0000"+
		"\u0000\u0212\u0210\u0001\u0000\u0000\u0000\u0213\u0215\u00032\u0019\u0000"+
		"\u0214\u0213\u0001\u0000\u0000\u0000\u0214\u0215\u0001\u0000\u0000\u0000"+
		"\u0215\u0216\u0001\u0000\u0000\u0000\u0216\u0218\u0005s\u0000\u0000\u0217"+
		"\u0219\u0005l\u0000\u0000\u0218\u0217\u0001\u0000\u0000\u0000\u0218\u0219"+
		"\u0001\u0000\u0000\u0000\u0219\u021a\u0001\u0000\u0000\u0000\u021a\u021b"+
		"\u0005^\u0000\u0000\u021b-\u0001\u0000\u0000\u0000\u021c\u021e\u0003&"+
		"\u0013\u0000\u021d\u021c\u0001\u0000\u0000\u0000\u021e\u0221\u0001\u0000"+
		"\u0000\u0000\u021f\u021d\u0001\u0000\u0000\u0000\u021f\u0220\u0001\u0000"+
		"\u0000\u0000\u0220/\u0001\u0000\u0000\u0000\u0221\u021f\u0001\u0000\u0000"+
		"\u0000\u0222\u0224\u0005k\u0000\u0000\u0223\u0222\u0001\u0000\u0000\u0000"+
		"\u0223\u0224\u0001\u0000\u0000\u0000\u0224\u0225\u0001\u0000\u0000\u0000"+
		"\u0225\u0226\u0005\u0002\u0000\u0000\u0226\u0227\u0003\u0092I\u0000\u0227"+
		"\u0229\u0005S\u0000\u0000\u0228\u022a\u0003 \u0010\u0000\u0229\u0228\u0001"+
		"\u0000\u0000\u0000\u0229\u022a\u0001\u0000\u0000\u0000\u022a\u022b\u0001"+
		"\u0000\u0000\u0000\u022b\u022f\u0005^\u0000\u0000\u022c\u022e\u0003&\u0013"+
		"\u0000\u022d\u022c\u0001\u0000\u0000\u0000\u022e\u0231\u0001\u0000\u0000"+
		"\u0000\u022f\u022d\u0001\u0000\u0000\u0000\u022f\u0230\u0001\u0000\u0000"+
		"\u0000\u0230\u0233\u0001\u0000\u0000\u0000\u0231\u022f\u0001\u0000\u0000"+
		"\u0000\u0232\u0234\u0005l\u0000\u0000\u0233\u0232\u0001\u0000\u0000\u0000"+
		"\u0233\u0234\u0001\u0000\u0000\u0000\u02341\u0001\u0000\u0000\u0000\u0235"+
		"\u0237\u0005k\u0000\u0000\u0236\u0235\u0001\u0000\u0000\u0000\u0236\u0237"+
		"\u0001\u0000\u0000\u0000\u0237\u0238\u0001\u0000\u0000\u0000\u0238\u0239"+
		"\u0005\u0003\u0000\u0000\u0239\u023b\u0005S\u0000\u0000\u023a\u023c\u0003"+
		" \u0010\u0000\u023b\u023a\u0001\u0000\u0000\u0000\u023b\u023c\u0001\u0000"+
		"\u0000\u0000\u023c\u023d\u0001\u0000\u0000\u0000\u023d\u0241\u0005^\u0000"+
		"\u0000\u023e\u0240\u0003&\u0013\u0000\u023f\u023e\u0001\u0000\u0000\u0000"+
		"\u0240\u0243\u0001\u0000\u0000\u0000\u0241\u023f\u0001\u0000\u0000\u0000"+
		"\u0241\u0242\u0001\u0000\u0000\u0000\u0242\u0245\u0001\u0000\u0000\u0000"+
		"\u0243\u0241\u0001\u0000\u0000\u0000\u0244\u0246\u0005l\u0000\u0000\u0245"+
		"\u0244\u0001\u0000\u0000\u0000\u0245\u0246\u0001\u0000\u0000\u0000\u0246"+
		"3\u0001\u0000\u0000\u0000\u0247\u0249\u0005k\u0000\u0000\u0248\u0247\u0001"+
		"\u0000\u0000\u0000\u0248\u0249\u0001\u0000\u0000\u0000\u0249\u024a\u0001"+
		"\u0000\u0000\u0000\u024a\u024b\u0005\u000b\u0000\u0000\u024b\u024c\u0003"+
		"\u0092I\u0000\u024c\u024e\u0005S\u0000\u0000\u024d\u024f\u0003 \u0010"+
		"\u0000\u024e\u024d\u0001\u0000\u0000\u0000\u024e\u024f\u0001\u0000\u0000"+
		"\u0000\u024f\u0250\u0001\u0000\u0000\u0000\u0250\u0254\u0005^\u0000\u0000"+
		"\u0251\u0253\u0003&\u0013\u0000\u0252\u0251\u0001\u0000\u0000\u0000\u0253"+
		"\u0256\u0001\u0000\u0000\u0000\u0254\u0252\u0001\u0000\u0000\u0000\u0254"+
		"\u0255\u0001\u0000\u0000\u0000\u0255\u0257\u0001\u0000\u0000\u0000\u0256"+
		"\u0254\u0001\u0000\u0000\u0000\u0257\u0259\u0005t\u0000\u0000\u0258\u025a"+
		"\u0005l\u0000\u0000\u0259\u0258\u0001\u0000\u0000\u0000\u0259\u025a\u0001"+
		"\u0000\u0000\u0000\u025a\u025b\u0001\u0000\u0000\u0000\u025b\u025c\u0005"+
		"^\u0000\u0000\u025c5\u0001\u0000\u0000\u0000\u025d\u025f\u0005k\u0000"+
		"\u0000\u025e\u025d\u0001\u0000\u0000\u0000\u025e\u025f\u0001\u0000\u0000"+
		"\u0000\u025f\u0260\u0001\u0000\u0000\u0000\u0260\u0261\u0005\u0004\u0000"+
		"\u0000\u0261\u0262\u0003X,\u0000\u0262\u0263\u0005\u0006\u0000\u0000\u0263"+
		"\u0264\u0003\u0092I\u0000\u0264\u0266\u0005S\u0000\u0000\u0265\u0267\u0003"+
		" \u0010\u0000\u0266\u0265\u0001\u0000\u0000\u0000\u0266\u0267\u0001\u0000"+
		"\u0000\u0000\u0267\u0268\u0001\u0000\u0000\u0000\u0268\u026c\u0005^\u0000"+
		"\u0000\u0269\u026b\u0003&\u0013\u0000\u026a\u0269\u0001\u0000\u0000\u0000"+
		"\u026b\u026e\u0001\u0000\u0000\u0000\u026c\u026a\u0001\u0000\u0000\u0000"+
		"\u026c\u026d\u0001\u0000\u0000\u0000\u026d\u026f\u0001\u0000\u0000\u0000"+
		"\u026e\u026c\u0001\u0000\u0000\u0000\u026f\u0271\u0005u\u0000\u0000\u0270"+
		"\u0272\u0005l\u0000\u0000\u0271\u0270\u0001\u0000\u0000\u0000\u0271\u0272"+
		"\u0001\u0000\u0000\u0000\u0272\u0273\u0001\u0000\u0000\u0000\u0273\u0274"+
		"\u0005^\u0000\u0000\u02747\u0001\u0000\u0000\u0000\u0275\u0277\u0005j"+
		"\u0000\u0000\u0276\u0275\u0001\u0000\u0000\u0000\u0276\u0277\u0001\u0000"+
		"\u0000\u0000\u0277\u0278\u0001\u0000\u0000\u0000\u0278\u027a\u0003\u0094"+
		"J\u0000\u0279\u027b\u0003 \u0010\u0000\u027a\u0279\u0001\u0000\u0000\u0000"+
		"\u027a\u027b\u0001\u0000\u0000\u0000\u027b\u027c\u0001\u0000\u0000\u0000"+
		"\u027c\u027d\u0005^\u0000\u0000\u027d9\u0001\u0000\u0000\u0000\u027e\u0280"+
		"\u0005k\u0000\u0000\u027f\u027e\u0001\u0000\u0000\u0000\u027f\u0280\u0001"+
		"\u0000\u0000\u0000\u0280\u0281\u0001\u0000\u0000\u0000\u0281\u0282\u0005"+
		"\n\u0000\u0000\u0282\u0284\u0005S\u0000\u0000\u0283\u0285\u0003 \u0010"+
		"\u0000\u0284\u0283\u0001\u0000\u0000\u0000\u0284\u0285\u0001\u0000\u0000"+
		"\u0000\u0285\u0286\u0001\u0000\u0000\u0000\u0286\u0287\u0005^\u0000\u0000"+
		"\u0287\u0289\u0003<\u001e\u0000\u0288\u028a\u0003>\u001f\u0000\u0289\u0288"+
		"\u0001\u0000\u0000\u0000\u028a\u028b\u0001\u0000\u0000\u0000\u028b\u0289"+
		"\u0001\u0000\u0000\u0000\u028b\u028c\u0001\u0000\u0000\u0000\u028c\u028d"+
		"\u0001\u0000\u0000\u0000\u028d\u028f\u0005v\u0000\u0000\u028e\u0290\u0005"+
		"l\u0000\u0000\u028f\u028e\u0001\u0000\u0000\u0000\u028f\u0290\u0001\u0000"+
		"\u0000\u0000\u0290\u0291\u0001\u0000\u0000\u0000\u0291\u0292\u0005^\u0000"+
		"\u0000\u0292;\u0001\u0000\u0000\u0000\u0293\u0295\u0003&\u0013\u0000\u0294"+
		"\u0293\u0001\u0000\u0000\u0000\u0295\u0298\u0001\u0000\u0000\u0000\u0296"+
		"\u0294\u0001\u0000\u0000\u0000\u0296\u0297\u0001\u0000\u0000\u0000\u0297"+
		"=\u0001\u0000\u0000\u0000\u0298\u0296\u0001\u0000\u0000\u0000\u0299\u029b"+
		"\u0005k\u0000\u0000\u029a\u0299\u0001\u0000\u0000\u0000\u029a\u029b\u0001"+
		"\u0000\u0000\u0000\u029b\u029c\u0001\u0000\u0000\u0000\u029c\u029d\u0005"+
		"+\u0000\u0000\u029d\u029e\u0003d2\u0000\u029e\u029f\u0005)\u0000\u0000"+
		"\u029f\u02a0\u0003X,\u0000\u02a0\u02a2\u0005S\u0000\u0000\u02a1\u02a3"+
		"\u0003 \u0010\u0000\u02a2\u02a1\u0001\u0000\u0000\u0000\u02a2\u02a3\u0001"+
		"\u0000\u0000\u0000\u02a3\u02a4\u0001\u0000\u0000\u0000\u02a4\u02a8\u0005"+
		"^\u0000\u0000\u02a5\u02a7\u0003&\u0013\u0000\u02a6\u02a5\u0001\u0000\u0000"+
		"\u0000\u02a7\u02aa\u0001\u0000\u0000\u0000\u02a8\u02a6\u0001\u0000\u0000"+
		"\u0000\u02a8\u02a9\u0001\u0000\u0000\u0000\u02a9\u02ac\u0001\u0000\u0000"+
		"\u0000\u02aa\u02a8\u0001\u0000\u0000\u0000\u02ab\u02ad\u0005l\u0000\u0000"+
		"\u02ac\u02ab\u0001\u0000\u0000\u0000\u02ac\u02ad\u0001\u0000\u0000\u0000"+
		"\u02ad?\u0001\u0000\u0000\u0000\u02ae\u02b0\u0005j\u0000\u0000\u02af\u02ae"+
		"\u0001\u0000\u0000\u0000\u02af\u02b0\u0001\u0000\u0000\u0000\u02b0\u02b1"+
		"\u0001\u0000\u0000\u0000\u02b1\u02b2\u0005/\u0000\u0000\u02b2\u02b3\u0003"+
		"d2\u0000\u02b3\u02b4\u0005O\u0000\u0000\u02b4\u02b5\u0003B!\u0000\u02b5"+
		"\u02b7\u0005P\u0000\u0000\u02b6\u02b8\u0003 \u0010\u0000\u02b7\u02b6\u0001"+
		"\u0000\u0000\u0000\u02b7\u02b8\u0001\u0000\u0000\u0000\u02b8\u02b9\u0001"+
		"\u0000\u0000\u0000\u02b9\u02ba\u0005^\u0000\u0000\u02baA\u0001\u0000\u0000"+
		"\u0000\u02bb\u02be\u0003\u0084B\u0000\u02bc\u02be\u0003Z-\u0000\u02bd"+
		"\u02bb\u0001\u0000\u0000\u0000\u02bd\u02bc\u0001\u0000\u0000\u0000\u02be"+
		"C\u0001\u0000\u0000\u0000\u02bf\u02c1\u0005j\u0000\u0000\u02c0\u02bf\u0001"+
		"\u0000\u0000\u0000\u02c0\u02c1\u0001\u0000\u0000\u0000\u02c1\u02c2\u0001"+
		"\u0000\u0000\u0000\u02c2\u02c3\u0005I\u0000\u0000\u02c3\u02c4\u0005Q\u0000"+
		"\u0000\u02c4\u02c5\u0005(\u0000\u0000\u02c5\u02c6\u0005O\u0000\u0000\u02c6"+
		"\u02c7\u0003x<\u0000\u02c7\u02c8\u0005R\u0000\u0000\u02c8\u02c9\u0003"+
		"z=\u0000\u02c9\u02cb\u0005P\u0000\u0000\u02ca\u02cc\u0003 \u0010\u0000"+
		"\u02cb\u02ca\u0001\u0000\u0000\u0000\u02cb\u02cc\u0001\u0000\u0000\u0000"+
		"\u02cc\u02cd\u0001\u0000\u0000\u0000\u02cd\u02ce\u0005^\u0000\u0000\u02ce"+
		"E\u0001\u0000\u0000\u0000\u02cf\u02d0\u0005\t\u0000\u0000\u02d0\u02d2"+
		"\u0003\u0092I\u0000\u02d1\u02d3\u0003 \u0010\u0000\u02d2\u02d1\u0001\u0000"+
		"\u0000\u0000\u02d2\u02d3\u0001\u0000\u0000\u0000\u02d3\u02d4\u0001\u0000"+
		"\u0000\u0000\u02d4\u02d5\u0005^\u0000\u0000\u02d5G\u0001\u0000\u0000\u0000"+
		"\u02d6\u02d8\u0003J%\u0000\u02d7\u02d6\u0001\u0000\u0000\u0000\u02d8\u02d9"+
		"\u0001\u0000\u0000\u0000\u02d9\u02d7\u0001\u0000\u0000\u0000\u02d9\u02da"+
		"\u0001\u0000\u0000\u0000\u02daI\u0001\u0000\u0000\u0000\u02db\u02e1\u0003"+
		"N\'\u0000\u02dc\u02e1\u0003P(\u0000\u02dd\u02e1\u0003R)\u0000\u02de\u02e1"+
		"\u0003T*\u0000\u02df\u02e1\u0003V+\u0000\u02e0\u02db\u0001\u0000\u0000"+
		"\u0000\u02e0\u02dc\u0001\u0000\u0000\u0000\u02e0\u02dd\u0001\u0000\u0000"+
		"\u0000\u02e0\u02de\u0001\u0000\u0000\u0000\u02e0\u02df\u0001\u0000\u0000"+
		"\u0000\u02e1K\u0001\u0000\u0000\u0000\u02e2\u02e4\u0005k\u0000\u0000\u02e3"+
		"\u02e2\u0001\u0000\u0000\u0000\u02e3\u02e4\u0001\u0000\u0000\u0000\u02e4"+
		"\u02e5\u0001\u0000\u0000\u0000\u02e5\u02e6\u0005*\u0000\u0000\u02e6\u02e7"+
		"\u0005,\u0000\u0000\u02e7\u02e9\u0005O\u0000\u0000\u02e8\u02ea\u0003l"+
		"6\u0000\u02e9\u02e8\u0001\u0000\u0000\u0000\u02e9\u02ea\u0001\u0000\u0000"+
		"\u0000\u02ea\u02eb\u0001\u0000\u0000\u0000\u02eb\u02ec\u0005P\u0000\u0000"+
		"\u02ec\u02ed\u0005E\u0000\u0000\u02ed\u02ee\u0005-\u0000\u0000\u02ee\u02f0"+
		"\u0005S\u0000\u0000\u02ef\u02f1\u0003 \u0010\u0000\u02f0\u02ef\u0001\u0000"+
		"\u0000\u0000\u02f0\u02f1\u0001\u0000\u0000\u0000\u02f1\u02f3\u0001\u0000"+
		"\u0000\u0000\u02f2\u02f4\u0005l\u0000\u0000\u02f3\u02f2\u0001\u0000\u0000"+
		"\u0000\u02f3\u02f4\u0001\u0000\u0000\u0000\u02f4\u02f5\u0001\u0000\u0000"+
		"\u0000\u02f5\u02f9\u0005^\u0000\u0000\u02f6\u02f8\u0003&\u0013\u0000\u02f7"+
		"\u02f6\u0001\u0000\u0000\u0000\u02f8\u02fb\u0001\u0000\u0000\u0000\u02f9"+
		"\u02f7\u0001\u0000\u0000\u0000\u02f9\u02fa\u0001\u0000\u0000\u0000\u02fa"+
		"\u02fc\u0001\u0000\u0000\u0000\u02fb\u02f9\u0001\u0000\u0000\u0000\u02fc"+
		"\u02fd\u0005w\u0000\u0000\u02fd\u02fe\u0005^\u0000\u0000\u02feM\u0001"+
		"\u0000\u0000\u0000\u02ff\u0301\u0005j\u0000\u0000\u0300\u02ff\u0001\u0000"+
		"\u0000\u0000\u0300\u0301\u0001\u0000\u0000\u0000\u0301\u0302\u0001\u0000"+
		"\u0000\u0000\u0302\u0303\u0003X,\u0000\u0303\u0304\u0005S\u0000\u0000"+
		"\u0304\u0306\u0003v;\u0000\u0305\u0307\u0005|\u0000\u0000\u0306\u0305"+
		"\u0001\u0000\u0000\u0000\u0306\u0307\u0001\u0000\u0000\u0000\u0307\u0309"+
		"\u0001\u0000\u0000\u0000\u0308\u030a\u0003 \u0010\u0000\u0309\u0308\u0001"+
		"\u0000\u0000\u0000\u0309\u030a\u0001\u0000\u0000\u0000\u030a\u030b\u0001"+
		"\u0000\u0000\u0000\u030b\u030c\u0005^\u0000\u0000\u030cO\u0001\u0000\u0000"+
		"\u0000\u030d\u030f\u0005k\u0000\u0000\u030e\u030d\u0001\u0000\u0000\u0000"+
		"\u030e\u030f\u0001\u0000\u0000\u0000\u030f\u0310\u0001\u0000\u0000\u0000"+
		"\u0310\u0311\u0005*\u0000\u0000\u0311\u0312\u0003^/\u0000\u0312\u0314"+
		"\u0005O\u0000\u0000\u0313\u0315\u0003l6\u0000\u0314\u0313\u0001\u0000"+
		"\u0000\u0000\u0314\u0315\u0001\u0000\u0000\u0000\u0315\u0316\u0001\u0000"+
		"\u0000\u0000\u0316\u0317\u0005P\u0000\u0000\u0317\u0318\u0005E\u0000\u0000"+
		"\u0318\u0319\u0003v;\u0000\u0319\u031b\u0005S\u0000\u0000\u031a\u031c"+
		"\u0005|\u0000\u0000\u031b\u031a\u0001\u0000\u0000\u0000\u031b\u031c\u0001"+
		"\u0000\u0000\u0000\u031c\u031d\u0001\u0000\u0000\u0000\u031d\u0321\u0005"+
		"^\u0000\u0000\u031e\u0320\u0003&\u0013\u0000\u031f\u031e\u0001\u0000\u0000"+
		"\u0000\u0320\u0323\u0001\u0000\u0000\u0000\u0321\u031f\u0001\u0000\u0000"+
		"\u0000\u0321\u0322\u0001\u0000\u0000\u0000\u0322\u0324\u0001\u0000\u0000"+
		"\u0000\u0323\u0321\u0001\u0000\u0000\u0000\u0324\u0325\u0003F#\u0000\u0325"+
		"\u0327\u0005n\u0000\u0000\u0326\u0328\u0005l\u0000\u0000\u0327\u0326\u0001"+
		"\u0000\u0000\u0000\u0327\u0328\u0001\u0000\u0000\u0000\u0328\u0329\u0001"+
		"\u0000\u0000\u0000\u0329\u032a\u0005^\u0000\u0000\u032aQ\u0001\u0000\u0000"+
		"\u0000\u032b\u032d\u0005k\u0000\u0000\u032c\u032b\u0001\u0000\u0000\u0000"+
		"\u032c\u032d\u0001\u0000\u0000\u0000\u032d\u032e\u0001\u0000\u0000\u0000"+
		"\u032e\u032f\u0005*\u0000\u0000\u032f\u0330\u0003^/\u0000\u0330\u0332"+
		"\u0005O\u0000\u0000\u0331\u0333\u0003l6\u0000\u0332\u0331\u0001\u0000"+
		"\u0000\u0000\u0332\u0333\u0001\u0000\u0000\u0000\u0333\u0334\u0001\u0000"+
		"\u0000\u0000\u0334\u0335\u0005P\u0000\u0000\u0335\u0336\u0005E\u0000\u0000"+
		"\u0336\u0337\u0005-\u0000\u0000\u0337\u0339\u0005S\u0000\u0000\u0338\u033a"+
		"\u0005|\u0000\u0000\u0339\u0338\u0001\u0000\u0000\u0000\u0339\u033a\u0001"+
		"\u0000\u0000\u0000\u033a\u033b\u0001\u0000\u0000\u0000\u033b\u033f\u0005"+
		"^\u0000\u0000\u033c\u033e\u0003&\u0013\u0000\u033d\u033c\u0001\u0000\u0000"+
		"\u0000\u033e\u0341\u0001\u0000\u0000\u0000\u033f\u033d\u0001\u0000\u0000"+
		"\u0000\u033f\u0340\u0001\u0000\u0000\u0000\u0340\u0342\u0001\u0000\u0000"+
		"\u0000\u0341\u033f\u0001\u0000\u0000\u0000\u0342\u0344\u0005p\u0000\u0000"+
		"\u0343\u0345\u0005l\u0000\u0000\u0344\u0343\u0001\u0000\u0000\u0000\u0344"+
		"\u0345\u0001\u0000\u0000\u0000\u0345\u0346\u0001\u0000\u0000\u0000\u0346"+
		"\u0347\u0005^\u0000\u0000\u0347S\u0001\u0000\u0000\u0000\u0348\u034a\u0005"+
		"j\u0000\u0000\u0349\u0348\u0001\u0000\u0000\u0000\u0349\u034a\u0001\u0000"+
		"\u0000\u0000\u034a\u034b\u0001\u0000\u0000\u0000\u034b\u034c\u0005}\u0000"+
		"\u0000\u034c\u034d\u0005^\u0000\u0000\u034d\u034e\u0005*\u0000\u0000\u034e"+
		"\u034f\u0003^/\u0000\u034f\u0351\u0005O\u0000\u0000\u0350\u0352\u0003"+
		"l6\u0000\u0351\u0350\u0001\u0000\u0000\u0000\u0351\u0352\u0001\u0000\u0000"+
		"\u0000\u0352\u0353\u0001\u0000\u0000\u0000\u0353\u0354\u0005P\u0000\u0000"+
		"\u0354\u0355\u0005E\u0000\u0000\u0355\u0356\u0003v;\u0000\u0356\u0357"+
		"\u0005S\u0000\u0000\u0357\u0358\u0005^\u0000\u0000\u0358\u035a\u0005."+
		"\u0000\u0000\u0359\u035b\u0003 \u0010\u0000\u035a\u0359\u0001\u0000\u0000"+
		"\u0000\u035a\u035b\u0001\u0000\u0000\u0000\u035b\u035c\u0001\u0000\u0000"+
		"\u0000\u035c\u035d\u0005^\u0000\u0000\u035dU\u0001\u0000\u0000\u0000\u035e"+
		"\u0360\u0005j\u0000\u0000\u035f\u035e\u0001\u0000\u0000\u0000\u035f\u0360"+
		"\u0001\u0000\u0000\u0000\u0360\u0361\u0001\u0000\u0000\u0000\u0361\u0362"+
		"\u0005}\u0000\u0000\u0362\u0363\u0005^\u0000\u0000\u0363\u0364\u0005*"+
		"\u0000\u0000\u0364\u0365\u0003^/\u0000\u0365\u0367\u0005O\u0000\u0000"+
		"\u0366\u0368\u0003l6\u0000\u0367\u0366\u0001\u0000\u0000\u0000\u0367\u0368"+
		"\u0001\u0000\u0000\u0000\u0368\u0369\u0001\u0000\u0000\u0000\u0369\u036a"+
		"\u0005P\u0000\u0000\u036a\u036b\u0005E\u0000\u0000\u036b\u036c\u0005-"+
		"\u0000\u0000\u036c\u036e\u0005S\u0000\u0000\u036d\u036f\u0005|\u0000\u0000"+
		"\u036e\u036d\u0001\u0000\u0000\u0000\u036e\u036f\u0001\u0000\u0000\u0000"+
		"\u036f\u0370\u0001\u0000\u0000\u0000\u0370\u0371\u0005^\u0000\u0000\u0371"+
		"\u0373\u0005.\u0000\u0000\u0372\u0374\u0003 \u0010\u0000\u0373\u0372\u0001"+
		"\u0000\u0000\u0000\u0373\u0374\u0001\u0000\u0000\u0000\u0374\u0375\u0001"+
		"\u0000\u0000\u0000\u0375\u0376\u0005^\u0000\u0000\u0376W\u0001\u0000\u0000"+
		"\u0000\u0377\u0378\u0005`\u0000\u0000\u0378Y\u0001\u0000\u0000\u0000\u0379"+
		"\u037a\u0005`\u0000\u0000\u037a[\u0001\u0000\u0000\u0000\u037b\u037c\u0006"+
		".\uffff\uffff\u0000\u037c\u0381\u0003Z-\u0000\u037d\u037e\u0005I\u0000"+
		"\u0000\u037e\u037f\u0005Q\u0000\u0000\u037f\u0381\u0003Z-\u0000\u0380"+
		"\u037b\u0001\u0000\u0000\u0000\u0380\u037d\u0001\u0000\u0000\u0000\u0381"+
		"\u0386\u0001\u0000\u0000\u0000\u0382\u0383\n\u0001\u0000\u0000\u0383\u0385"+
		"\u0003\u0090H\u0000\u0384\u0382\u0001\u0000\u0000\u0000\u0385\u0388\u0001"+
		"\u0000\u0000\u0000\u0386\u0384\u0001\u0000\u0000\u0000\u0386\u0387\u0001"+
		"\u0000\u0000\u0000\u0387]\u0001\u0000\u0000\u0000\u0388\u0386\u0001\u0000"+
		"\u0000\u0000\u0389\u038a\u0005`\u0000\u0000\u038a_\u0001\u0000\u0000\u0000"+
		"\u038b\u038c\u0005_\u0000\u0000\u038ca\u0001\u0000\u0000\u0000\u038d\u038e"+
		"\u0005a\u0000\u0000\u038ec\u0001\u0000\u0000\u0000\u038f\u0397\u00054"+
		"\u0000\u0000\u0390\u0397\u00055\u0000\u0000\u0391\u0397\u00056\u0000\u0000"+
		"\u0392\u0397\u00057\u0000\u0000\u0393\u0397\u00058\u0000\u0000\u0394\u0397"+
		"\u00059\u0000\u0000\u0395\u0397\u0005a\u0000\u0000\u0396\u038f\u0001\u0000"+
		"\u0000\u0000\u0396\u0390\u0001\u0000\u0000\u0000\u0396\u0391\u0001\u0000"+
		"\u0000\u0000\u0396\u0392\u0001\u0000\u0000\u0000\u0396\u0393\u0001\u0000"+
		"\u0000\u0000\u0396\u0394\u0001\u0000\u0000\u0000\u0396\u0395\u0001\u0000"+
		"\u0000\u0000\u0397e\u0001\u0000\u0000\u0000\u0398\u039d\u0003~?\u0000"+
		"\u0399\u039d\u0003\u0080@\u0000\u039a\u039d\u0003\u0082A\u0000\u039b\u039d"+
		"\u0003\u0084B\u0000\u039c\u0398\u0001\u0000\u0000\u0000\u039c\u0399\u0001"+
		"\u0000\u0000\u0000\u039c\u039a\u0001\u0000\u0000\u0000\u039c\u039b\u0001"+
		"\u0000\u0000\u0000\u039dg\u0001\u0000\u0000\u0000\u039e\u03a3\u0003j5"+
		"\u0000\u039f\u03a0\u0005R\u0000\u0000\u03a0\u03a2\u0003j5\u0000\u03a1"+
		"\u039f\u0001\u0000\u0000\u0000\u03a2\u03a5\u0001\u0000\u0000\u0000\u03a3"+
		"\u03a1\u0001\u0000\u0000\u0000\u03a3\u03a4\u0001\u0000\u0000\u0000\u03a4"+
		"i\u0001\u0000\u0000\u0000\u03a5\u03a3\u0001\u0000\u0000\u0000\u03a6\u03a9"+
		"\u0003\u00bc^\u0000\u03a7\u03a9\u0003\u0092I\u0000\u03a8\u03a6\u0001\u0000"+
		"\u0000\u0000\u03a8\u03a7\u0001\u0000\u0000\u0000\u03a9k\u0001\u0000\u0000"+
		"\u0000\u03aa\u03af\u0003\u00b4Z\u0000\u03ab\u03ac\u0005R\u0000\u0000\u03ac"+
		"\u03ae\u0003\u00b4Z\u0000\u03ad\u03ab\u0001\u0000\u0000\u0000\u03ae\u03b1"+
		"\u0001\u0000\u0000\u0000\u03af\u03ad\u0001\u0000\u0000\u0000\u03af\u03b0"+
		"\u0001\u0000\u0000\u0000\u03b0m\u0001\u0000\u0000\u0000\u03b1\u03af\u0001"+
		"\u0000\u0000\u0000\u03b2\u03b5\u0003X,\u0000\u03b3\u03b4\u0005R\u0000"+
		"\u0000\u03b4\u03b6\u0003X,\u0000\u03b5\u03b3\u0001\u0000\u0000\u0000\u03b6"+
		"\u03b7\u0001\u0000\u0000\u0000\u03b7\u03b5\u0001\u0000\u0000\u0000\u03b7"+
		"\u03b8\u0001\u0000\u0000\u0000\u03b8o\u0001\u0000\u0000\u0000\u03b9\u03be"+
		"\u0003\u0092I\u0000\u03ba\u03bb\u0005R\u0000\u0000\u03bb\u03bd\u0003\u0092"+
		"I\u0000\u03bc\u03ba\u0001\u0000\u0000\u0000\u03bd\u03c0\u0001\u0000\u0000"+
		"\u0000\u03be\u03bc\u0001\u0000\u0000\u0000\u03be\u03bf\u0001\u0000\u0000"+
		"\u0000\u03bfq\u0001\u0000\u0000\u0000\u03c0\u03be\u0001\u0000\u0000\u0000"+
		"\u03c1\u03c2\u0003X,\u0000\u03c2\u03c3\u0005J\u0000\u0000\u03c3\u03c4"+
		"\u0003\u0080@\u0000\u03c4s\u0001\u0000\u0000\u0000\u03c5\u03ca\u0003r"+
		"9\u0000\u03c6\u03c7\u0005^\u0000\u0000\u03c7\u03c9\u0003r9\u0000\u03c8"+
		"\u03c6\u0001\u0000\u0000\u0000\u03c9\u03cc\u0001\u0000\u0000\u0000\u03ca"+
		"\u03c8\u0001\u0000\u0000\u0000\u03ca\u03cb\u0001\u0000\u0000\u0000\u03cb"+
		"u\u0001\u0000\u0000\u0000\u03cc\u03ca\u0001\u0000\u0000\u0000\u03cd\u03d2"+
		"\u0003\u00ba]\u0000\u03ce\u03d2\u0003d2\u0000\u03cf\u03d2\u0003\u00b6"+
		"[\u0000\u03d0\u03d2\u0003\u00b8\\\u0000\u03d1\u03cd\u0001\u0000\u0000"+
		"\u0000\u03d1\u03ce\u0001\u0000\u0000\u0000\u03d1\u03cf\u0001\u0000\u0000"+
		"\u0000\u03d1\u03d0\u0001\u0000\u0000\u0000\u03d2w\u0001\u0000\u0000\u0000"+
		"\u03d3\u03d4\u0003\u0092I\u0000\u03d4y\u0001\u0000\u0000\u0000\u03d5\u03d6"+
		"\u0003\u0092I\u0000\u03d6{\u0001\u0000\u0000\u0000\u03d7\u03de\u0003~"+
		"?\u0000\u03d8\u03de\u0003\u0080@\u0000\u03d9\u03de\u0003\u0082A\u0000"+
		"\u03da\u03de\u0003\u0084B\u0000\u03db\u03de\u0003\u0086C\u0000\u03dc\u03de"+
		"\u0003\u008eG\u0000\u03dd\u03d7\u0001\u0000\u0000\u0000\u03dd\u03d8\u0001"+
		"\u0000\u0000\u0000\u03dd\u03d9\u0001\u0000\u0000\u0000\u03dd\u03da\u0001"+
		"\u0000\u0000\u0000\u03dd\u03db\u0001\u0000\u0000\u0000\u03dd\u03dc\u0001"+
		"\u0000\u0000\u0000\u03de}\u0001\u0000\u0000\u0000\u03df\u03e2\u0005;\u0000"+
		"\u0000\u03e0\u03e2\u0005<\u0000\u0000\u03e1\u03df\u0001\u0000\u0000\u0000"+
		"\u03e1\u03e0\u0001\u0000\u0000\u0000\u03e2\u007f\u0001\u0000\u0000\u0000"+
		"\u03e3\u03e7\u0005d\u0000\u0000\u03e4\u03e7\u0005b\u0000\u0000\u03e5\u03e7"+
		"\u0005c\u0000\u0000\u03e6\u03e3\u0001\u0000\u0000\u0000\u03e6\u03e4\u0001"+
		"\u0000\u0000\u0000\u03e6\u03e5\u0001\u0000\u0000\u0000\u03e7\u0081\u0001"+
		"\u0000\u0000\u0000\u03e8\u03e9\u0005e\u0000\u0000\u03e9\u0083\u0001\u0000"+
		"\u0000\u0000\u03ea\u03eb\u0005g\u0000\u0000\u03eb\u0085\u0001\u0000\u0000"+
		"\u0000\u03ec\u03f0\u0005f\u0000\u0000\u03ed\u03ef\u0003\u0088D\u0000\u03ee"+
		"\u03ed\u0001\u0000\u0000\u0000\u03ef\u03f2\u0001\u0000\u0000\u0000\u03f0"+
		"\u03ee\u0001\u0000\u0000\u0000\u03f0\u03f1\u0001\u0000\u0000\u0000\u03f1"+
		"\u03f3\u0001\u0000\u0000\u0000\u03f2\u03f0\u0001\u0000\u0000\u0000\u03f3"+
		"\u03f4\u0005\\\u0000\u0000\u03f4\u0087\u0001\u0000\u0000\u0000\u03f5\u03f8"+
		"\u0003\u008aE\u0000\u03f6\u03f8\u0003\u008cF\u0000\u03f7\u03f5\u0001\u0000"+
		"\u0000\u0000\u03f7\u03f6\u0001\u0000\u0000\u0000\u03f8\u0089\u0001\u0000"+
		"\u0000\u0000\u03f9\u03fb\u0005\u007f\u0000\u0000\u03fa\u03f9\u0001\u0000"+
		"\u0000\u0000\u03fb\u03fc\u0001\u0000\u0000\u0000\u03fc\u03fa\u0001\u0000"+
		"\u0000\u0000\u03fc\u03fd\u0001\u0000\u0000\u0000\u03fd\u008b\u0001\u0000"+
		"\u0000\u0000\u03fe\u03ff\u0005K\u0000\u0000\u03ff\u0400\u0003\u0092I\u0000"+
		"\u0400\u0401\u0005L\u0000\u0000\u0401\u008d\u0001\u0000\u0000\u0000\u0402"+
		"\u0403\u0003d2\u0000\u0403\u0404\u0005Q\u0000\u0000\u0404\u0405\u0003"+
		"Z-\u0000\u0405\u008f\u0001\u0000\u0000\u0000\u0406\u0407\u0005M\u0000"+
		"\u0000\u0407\u0408\u0003\u0092I\u0000\u0408\u0409\u0005N\u0000\u0000\u0409"+
		"\u0091\u0001\u0000\u0000\u0000\u040a\u040b\u0006I\uffff\uffff\u0000\u040b"+
		"\u0410\u0003\u00b2Y\u0000\u040c\u0410\u0003\u009cN\u0000\u040d\u0410\u0003"+
		"\u0094J\u0000\u040e\u0410\u0003\u00a2Q\u0000\u040f\u040a\u0001\u0000\u0000"+
		"\u0000\u040f\u040c\u0001\u0000\u0000\u0000\u040f\u040d\u0001\u0000\u0000"+
		"\u0000\u040f\u040e\u0001\u0000\u0000\u0000\u0410\u0420\u0001\u0000\u0000"+
		"\u0000\u0411\u0412\n\u0001\u0000\u0000\u0412\u0413\u0005\u0005\u0000\u0000"+
		"\u0413\u0418\u0003\u0092I\u0000\u0414\u0415\u0005\u0002\u0000\u0000\u0415"+
		"\u0417\u0003\u0092I\u0000\u0416\u0414\u0001\u0000\u0000\u0000\u0417\u041a"+
		"\u0001\u0000\u0000\u0000\u0418\u0416\u0001\u0000\u0000\u0000\u0418\u0419"+
		"\u0001\u0000\u0000\u0000\u0419\u041b\u0001\u0000\u0000\u0000\u041a\u0418"+
		"\u0001\u0000\u0000\u0000\u041b\u041c\u0005\u0003\u0000\u0000\u041c\u041d"+
		"\u0003\u0092I\u0002\u041d\u041f\u0001\u0000\u0000\u0000\u041e\u0411\u0001"+
		"\u0000\u0000\u0000\u041f\u0422\u0001\u0000\u0000\u0000\u0420\u041e\u0001"+
		"\u0000\u0000\u0000\u0420\u0421\u0001\u0000\u0000\u0000\u0421\u0093\u0001"+
		"\u0000\u0000\u0000\u0422\u0420\u0001\u0000\u0000\u0000\u0423\u0424\u0006"+
		"J\uffff\uffff\u0000\u0424\u042d\u0003\u0098L\u0000\u0425\u042d\u0003\u009a"+
		"M\u0000\u0426\u042d\u0003|>\u0000\u0427\u042d\u0003\u00a4R\u0000\u0428"+
		"\u042d\u0003\u00a8T\u0000\u0429\u042d\u0003\u00a6S\u0000\u042a\u042d\u0003"+
		"Z-\u0000\u042b\u042d\u0003\u00aeW\u0000\u042c\u0423\u0001\u0000\u0000"+
		"\u0000\u042c\u0425\u0001\u0000\u0000\u0000\u042c\u0426\u0001\u0000\u0000"+
		"\u0000\u042c\u0427\u0001\u0000\u0000\u0000\u042c\u0428\u0001\u0000\u0000"+
		"\u0000\u042c\u0429\u0001\u0000\u0000\u0000\u042c\u042a\u0001\u0000\u0000"+
		"\u0000\u042c\u042b\u0001\u0000\u0000\u0000\u042d\u0435\u0001\u0000\u0000"+
		"\u0000\u042e\u042f\n\u0002\u0000\u0000\u042f\u0434\u0003\u0090H\u0000"+
		"\u0430\u0431\n\u0001\u0000\u0000\u0431\u0432\u0005Q\u0000\u0000\u0432"+
		"\u0434\u0003\u0096K\u0000\u0433\u042e\u0001\u0000\u0000\u0000\u0433\u0430"+
		"\u0001\u0000\u0000\u0000\u0434\u0437\u0001\u0000\u0000\u0000\u0435\u0433"+
		"\u0001\u0000\u0000\u0000\u0435\u0436\u0001\u0000\u0000\u0000\u0436\u0095"+
		"\u0001\u0000\u0000\u0000\u0437\u0435\u0001\u0000\u0000\u0000\u0438\u043b"+
		"\u0003Z-\u0000\u0439\u043b\u0003\u00aeW\u0000\u043a\u0438\u0001\u0000"+
		"\u0000\u0000\u043a\u0439\u0001\u0000\u0000\u0000\u043b\u0097\u0001\u0000"+
		"\u0000\u0000\u043c\u043d\u0005I\u0000\u0000\u043d\u0099\u0001\u0000\u0000"+
		"\u0000\u043e\u043f\u0005O\u0000\u0000\u043f\u0440\u0003\u0092I\u0000\u0440"+
		"\u0441\u0005P\u0000\u0000\u0441\u009b\u0001\u0000\u0000\u0000\u0442\u0445"+
		"\u0003\u009eO\u0000\u0443\u0445\u0003\u00a0P\u0000\u0444\u0442\u0001\u0000"+
		"\u0000\u0000\u0444\u0443\u0001\u0000\u0000\u0000\u0445\u009d\u0001\u0000"+
		"\u0000\u0000\u0446\u0447\u0005U\u0000\u0000\u0447\u0448\u0003\u0094J\u0000"+
		"\u0448\u009f\u0001\u0000\u0000\u0000\u0449\u044a\u0005?\u0000\u0000\u044a"+
		"\u044b\u0003\u0094J\u0000\u044b\u00a1\u0001\u0000\u0000\u0000\u044c\u044d"+
		"\u0003\u0094J\u0000\u044d\u044e\u0003\u00b0X\u0000\u044e\u044f\u0003\u0092"+
		"I\u0000\u044f\u00a3\u0001\u0000\u0000\u0000\u0450\u0451\u0005M\u0000\u0000"+
		"\u0451\u0452\u0003p8\u0000\u0452\u0453\u0005N\u0000\u0000\u0453\u00a5"+
		"\u0001\u0000\u0000\u0000\u0454\u0455\u0005O\u0000\u0000\u0455\u0456\u0003"+
		"p8\u0000\u0456\u0457\u0005P\u0000\u0000\u0457\u00a7\u0001\u0000\u0000"+
		"\u0000\u0458\u0459\u0005K\u0000\u0000\u0459\u045a\u0003\u00aaU\u0000\u045a"+
		"\u045b\u0005L\u0000\u0000\u045b\u00a9\u0001\u0000\u0000\u0000\u045c\u0461"+
		"\u0003\u00acV\u0000\u045d\u045e\u0005R\u0000\u0000\u045e\u0460\u0003\u00ac"+
		"V\u0000\u045f\u045d\u0001\u0000\u0000\u0000\u0460\u0463\u0001\u0000\u0000"+
		"\u0000\u0461\u045f\u0001\u0000\u0000\u0000\u0461\u0462\u0001\u0000\u0000"+
		"\u0000\u0462\u00ab\u0001\u0000\u0000\u0000\u0463\u0461\u0001\u0000\u0000"+
		"\u0000\u0464\u0465\u0003\u0092I\u0000\u0465\u0466\u0005S\u0000\u0000\u0466"+
		"\u0467\u0003\u0092I\u0000\u0467\u00ad\u0001\u0000\u0000\u0000\u0468\u0469"+
		"\u0003^/\u0000\u0469\u046b\u0005O\u0000\u0000\u046a\u046c\u0003h4\u0000"+
		"\u046b\u046a\u0001\u0000\u0000\u0000\u046b\u046c\u0001\u0000\u0000\u0000"+
		"\u046c\u046d\u0001\u0000\u0000\u0000\u046d\u046e\u0005P\u0000\u0000\u046e"+
		"\u00af\u0001\u0000\u0000\u0000\u046f\u0480\u0005@\u0000\u0000\u0470\u0480"+
		"\u0005A\u0000\u0000\u0471\u0480\u0005B\u0000\u0000\u0472\u0480\u0005C"+
		"\u0000\u0000\u0473\u0480\u0005Y\u0000\u0000\u0474\u0480\u0005X\u0000\u0000"+
		"\u0475\u0480\u0005[\u0000\u0000\u0476\u0480\u0005Z\u0000\u0000\u0477\u0480"+
		"\u0005V\u0000\u0000\u0478\u0480\u0005W\u0000\u0000\u0479\u0480\u0005T"+
		"\u0000\u0000\u047a\u0480\u0005U\u0000\u0000\u047b\u0480\u0005=\u0000\u0000"+
		"\u047c\u0480\u0005>\u0000\u0000\u047d\u0480\u0005D\u0000\u0000\u047e\u0480"+
		"\u0005F\u0000\u0000\u047f\u046f\u0001\u0000\u0000\u0000\u047f\u0470\u0001"+
		"\u0000\u0000\u0000\u047f\u0471\u0001\u0000\u0000\u0000\u047f\u0472\u0001"+
		"\u0000\u0000\u0000\u047f\u0473\u0001\u0000\u0000\u0000\u047f\u0474\u0001"+
		"\u0000\u0000\u0000\u047f\u0475\u0001\u0000\u0000\u0000\u047f\u0476\u0001"+
		"\u0000\u0000\u0000\u047f\u0477\u0001\u0000\u0000\u0000\u047f\u0478\u0001"+
		"\u0000\u0000\u0000\u047f\u0479\u0001\u0000\u0000\u0000\u047f\u047a\u0001"+
		"\u0000\u0000\u0000\u047f\u047b\u0001\u0000\u0000\u0000\u047f\u047c\u0001"+
		"\u0000\u0000\u0000\u047f\u047d\u0001\u0000\u0000\u0000\u047f\u047e\u0001"+
		"\u0000\u0000\u0000\u0480\u00b1\u0001\u0000\u0000\u0000\u0481\u0482\u0003"+
		"v;\u0000\u0482\u0484\u0005O\u0000\u0000\u0483\u0485\u0003h4\u0000\u0484"+
		"\u0483\u0001\u0000\u0000\u0000\u0484\u0485\u0001\u0000\u0000\u0000\u0485"+
		"\u0486\u0001\u0000\u0000\u0000\u0486\u0487\u0005P\u0000\u0000\u0487\u00b3"+
		"\u0001\u0000\u0000\u0000\u0488\u048b\u0003X,\u0000\u0489\u048b\u0005I"+
		"\u0000\u0000\u048a\u0488\u0001\u0000\u0000\u0000\u048a\u0489\u0001\u0000"+
		"\u0000\u0000\u048b\u048c\u0001\u0000\u0000\u0000\u048c\u048d\u0005S\u0000"+
		"\u0000\u048d\u048e\u0003v;\u0000\u048e\u00b5\u0001\u0000\u0000\u0000\u048f"+
		"\u0490\u0003d2\u0000\u0490\u0491\u0005M\u0000\u0000\u0491\u0496\u0003"+
		"v;\u0000\u0492\u0493\u0005R\u0000\u0000\u0493\u0495\u0003v;\u0000\u0494"+
		"\u0492\u0001\u0000\u0000\u0000\u0495\u0498\u0001\u0000\u0000\u0000\u0496"+
		"\u0494\u0001\u0000\u0000\u0000\u0496\u0497\u0001\u0000\u0000\u0000\u0497"+
		"\u0499\u0001\u0000\u0000\u0000\u0498\u0496\u0001\u0000\u0000\u0000\u0499"+
		"\u049a\u0005N\u0000\u0000\u049a\u00b7\u0001\u0000\u0000\u0000\u049b\u049c"+
		"\u0005:\u0000\u0000\u049c\u049d\u0005M\u0000\u0000\u049d\u049e\u0005M"+
		"\u0000\u0000\u049e\u04a3\u0003v;\u0000\u049f\u04a0\u0005R\u0000\u0000"+
		"\u04a0\u04a2\u0003v;\u0000\u04a1\u049f\u0001\u0000\u0000\u0000\u04a2\u04a5"+
		"\u0001\u0000\u0000\u0000\u04a3\u04a1\u0001\u0000\u0000\u0000\u04a3\u04a4"+
		"\u0001\u0000\u0000\u0000\u04a4\u04a6\u0001\u0000\u0000\u0000\u04a5\u04a3"+
		"\u0001\u0000\u0000\u0000\u04a6\u04a7\u0005N\u0000\u0000\u04a7\u04a8\u0005"+
		"R\u0000\u0000\u04a8\u04a9\u0003v;\u0000\u04a9\u04aa\u0005N\u0000\u0000"+
		"\u04aa\u00b9\u0001\u0000\u0000\u0000\u04ab\u04ac\u00053\u0000\u0000\u04ac"+
		"\u04ad\u0005M\u0000\u0000\u04ad\u04b0\u0003v;\u0000\u04ae\u04af\u0005"+
		"R\u0000\u0000\u04af\u04b1\u0003v;\u0000\u04b0\u04ae\u0001\u0000\u0000"+
		"\u0000\u04b1\u04b2\u0001\u0000\u0000\u0000\u04b2\u04b0\u0001\u0000\u0000"+
		"\u0000\u04b2\u04b3\u0001\u0000\u0000\u0000\u04b3\u04b4\u0001\u0000\u0000"+
		"\u0000\u04b4\u04b5\u0005N\u0000\u0000\u04b5\u00bb\u0001\u0000\u0000\u0000"+
		"\u04b6\u04b7\u0005\u0007\u0000\u0000\u04b7\u04b8\u0003l6\u0000\u04b8\u04b9"+
		"\u0005S\u0000\u0000\u04b9\u04ba\u0003\u0092I\u0000\u04ba\u00bd\u0001\u0000"+
		"\u0000\u0000\u0092\u00bf\u00c4\u00c8\u00cd\u00d5\u00e0\u00e3\u00f0\u00f5"+
		"\u00fe\u0104\u010b\u0111\u0117\u011c\u0130\u0136\u013b\u0142\u0145\u014b"+
		"\u0152\u0158\u015d\u0162\u0168\u016d\u0176\u017d\u0182\u018a\u018e\u0195"+
		"\u019a\u01a2\u01a5\u01ac\u01b2\u01b8\u01bd\u01c7\u01ca\u01d4\u01e3\u01ee"+
		"\u01f1\u01fa\u0203\u0209\u0210\u0214\u0218\u021f\u0223\u0229\u022f\u0233"+
		"\u0236\u023b\u0241\u0245\u0248\u024e\u0254\u0259\u025e\u0266\u026c\u0271"+
		"\u0276\u027a\u027f\u0284\u028b\u028f\u0296\u029a\u02a2\u02a8\u02ac\u02af"+
		"\u02b7\u02bd\u02c0\u02cb\u02d2\u02d9\u02e0\u02e3\u02e9\u02f0\u02f3\u02f9"+
		"\u0300\u0306\u0309\u030e\u0314\u031b\u0321\u0327\u032c\u0332\u0339\u033f"+
		"\u0344\u0349\u0351\u035a\u035f\u0367\u036e\u0373\u0380\u0386\u0396\u039c"+
		"\u03a3\u03a8\u03af\u03b7\u03be\u03ca\u03d1\u03dd\u03e1\u03e6\u03f0\u03f7"+
		"\u03fc\u040f\u0418\u0420\u042c\u0433\u0435\u043a\u0444\u0461\u046b\u047f"+
		"\u0484\u048a\u0496\u04a3\u04b2";
	public static final ATN _ATN =
		new ATNDeserializer().deserialize(_serializedATN.toCharArray());
	static {
		_decisionToDFA = new DFA[_ATN.getNumberOfDecisions()];
		for (int i = 0; i < _ATN.getNumberOfDecisions(); i++) {
			_decisionToDFA[i] = new DFA(_ATN.getDecisionState(i), i);
		}
	}
}