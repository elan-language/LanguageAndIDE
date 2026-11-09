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
		CLASS=1, ELIF=2, ELSE=3, ENUM=4, FOR=5, IF=6, IN=7, INPUT=8, LAMBDA=9, 
		MAIN=10, RETURN=11, TRY=12, WHILE=13, IF_=14, ABSTRACT=15, ASSERT=16, 
		ASSIGN=17, BE=18, CALL=19, CATCH=20, CONSTANT=21, CONSTRUCTOR=22, COPY=23, 
		DIV=24, END=25, EVALUATES=26, FROM=27, FUNCTION=28, INHERITS=29, LET=30, 
		NEW=31, PRIVATE=32, PROCEDURE=33, PROPERTY=34, RETURNS=35, SET=36, STEP=37, 
		TEST=38, THEN=39, THROW=40, TO=41, VARIABLE=42, ASSERT_EQUAL=43, AS=44, 
		DEF=45, EXCEPT=46, INIT=47, NONE=48, PASS=49, RAISE=50, ABC=51, TESTCASE=52, 
		TUPLE=53, INT_NAME=54, FLOAT_NAME=55, BOOL_NAME=56, STRING_NAME=57, LIST_NAME=58, 
		FUNC_NAME=59, TRUE=60, FALSE=61, AND=62, OR=63, NOT=64, EQUAL=65, NOT_EQUAL=66, 
		MOD=67, ARROW=68, POWER=69, BINARY_PREFIX=70, HEX_PREFIX=71, THIS_INSTANCE=72, 
		SINGLE_EQUALS=73, OPEN_BRACE=74, CLOSE_BRACE=75, OPEN_SQ_BRACKET=76, CLOSE_SQ_BRACKET=77, 
		OPEN_BRACKET=78, CLOSE_BRACKET=79, DOT=80, COMMA=81, COLON=82, PLUS=83, 
		MINUS=84, MULT=85, DIVIDE=86, LT=87, GT=88, LE=89, GE=90, DOUBLE_QUOTES=91, 
		WS=92, NL=93, NAME_STARTING_TEST_=94, NAME_STARTING_LC=95, NAME_STARTING_UC=96, 
		LITERAL_BINARY=97, LITERAL_HEX=98, LITERAL_INTEGER=99, LITERAL_FLOAT=100, 
		LITERAL_STRING=101, INTERPOLATED_STRING=102, WHITESPACES=103, TEXT=104, 
		GHOSTED_LINE=105, GHOSTED_BLOCK_START=106, GHOSTED_BLOCK_END=107, END_MAIN=108, 
		END_FUNCTION=109, END_TEST=110, END_PROCEDURE=111, END_ENUM=112, END_CLASS=113, 
		END_IF=114, END_WHILE=115, END_FOR=116, END_TRY=117, END_CONSTRUCTOR=118, 
		END_FUNCTION_METHOD=119, END_PROCEDURE_METHOD=120, ASSIGNMENT_ANNOTATION=121, 
		VARIABLE_DEFINITION_ANNOTATION=122, ABSTRACT_METHOD=123, COMMENT=124;
	public static final int
		RULE_file = 0, RULE_global = 1, RULE_main = 2, RULE_mainCall = 3, RULE_function = 4, 
		RULE_test = 5, RULE_testStatement = 6, RULE_procedure = 7, RULE_constant = 8, 
		RULE_enum = 9, RULE_concreteClass = 10, RULE_concreteClassMember = 11, 
		RULE_abstractClass = 12, RULE_abstractClassMember = 13, RULE_comment = 14, 
		RULE_commentText = 15, RULE_ordinaryStatement = 16, RULE_variableDefinition = 17, 
		RULE_assignment = 18, RULE_ifStatement = 19, RULE_thenClause = 20, RULE_elseIfClause = 21, 
		RULE_elseClause = 22, RULE_whileLoop = 23, RULE_forLoop = 24, RULE_procedureCall = 25, 
		RULE_tryStatement = 26, RULE_tryClause = 27, RULE_catchClause = 28, RULE_throwStatement = 29, 
		RULE_errorMessage = 30, RULE_assert = 31, RULE_returnStatement = 32, RULE_constructorMember = 33, 
		RULE_property = 34, RULE_functionMethod = 35, RULE_procedureMethod = 36, 
		RULE_abstractFunction = 37, RULE_abstractProcedure = 38, RULE_identifierDef = 39, 
		RULE_identifierUse = 40, RULE_assignable = 41, RULE_methodName = 42, RULE_testName = 43, 
		RULE_typeName = 44, RULE_constantValue = 45, RULE_argList = 46, RULE_argument = 47, 
		RULE_paramList = 48, RULE_identifierList = 49, RULE_expressionList = 50, 
		RULE_enumDefValue = 51, RULE_enumList = 52, RULE_type = 53, RULE_assertActual = 54, 
		RULE_assertExpected = 55, RULE_litValue = 56, RULE_litBoolean = 57, RULE_litInt = 58, 
		RULE_litFloat = 59, RULE_litString = 60, RULE_enumValue = 61, RULE_index = 62, 
		RULE_expression = 63, RULE_term = 64, RULE_chainable = 65, RULE_thisInstance = 66, 
		RULE_bracketedExpression = 67, RULE_unaryExpression = 68, RULE_negateNumeric = 69, 
		RULE_negateLogical = 70, RULE_binaryExpression = 71, RULE_list = 72, RULE_tuple = 73, 
		RULE_dictionary = 74, RULE_kvpList = 75, RULE_kvp = 76, RULE_methodCall = 77, 
		RULE_binaryOperator = 78, RULE_newInstance = 79, RULE_paramDef = 80, RULE_typeGeneric = 81, 
		RULE_typeFunc = 82, RULE_typeTuple = 83, RULE_lambda = 84, RULE_interpolatedString = 85;
	private static String[] makeRuleNames() {
		return new String[] {
			"file", "global", "main", "mainCall", "function", "test", "testStatement", 
			"procedure", "constant", "enum", "concreteClass", "concreteClassMember", 
			"abstractClass", "abstractClassMember", "comment", "commentText", "ordinaryStatement", 
			"variableDefinition", "assignment", "ifStatement", "thenClause", "elseIfClause", 
			"elseClause", "whileLoop", "forLoop", "procedureCall", "tryStatement", 
			"tryClause", "catchClause", "throwStatement", "errorMessage", "assert", 
			"returnStatement", "constructorMember", "property", "functionMethod", 
			"procedureMethod", "abstractFunction", "abstractProcedure", "identifierDef", 
			"identifierUse", "assignable", "methodName", "testName", "typeName", 
			"constantValue", "argList", "argument", "paramList", "identifierList", 
			"expressionList", "enumDefValue", "enumList", "type", "assertActual", 
			"assertExpected", "litValue", "litBoolean", "litInt", "litFloat", "litString", 
			"enumValue", "index", "expression", "term", "chainable", "thisInstance", 
			"bracketedExpression", "unaryExpression", "negateNumeric", "negateLogical", 
			"binaryExpression", "list", "tuple", "dictionary", "kvpList", "kvp", 
			"methodCall", "binaryOperator", "newInstance", "paramDef", "typeGeneric", 
			"typeFunc", "typeTuple", "lambda", "interpolatedString"
		};
	}
	public static final String[] ruleNames = makeRuleNames();

	private static String[] makeLiteralNames() {
		return new String[] {
			null, "'class'", "'elif'", "'else'", "'enum'", "'for'", "'if'", "'in'", 
			"'input'", "'lambda'", "'main'", "'return'", "'try'", "'while'", "'if_'", 
			"'abstract'", "'assert'", "'assign'", "'be'", "'call'", "'catch'", "'constant'", 
			"'constructor'", "'copy'", "'div'", "'end'", "'evaluates'", "'from'", 
			"'function'", "'inherits'", "'let'", "'new'", "'private'", "'procedure'", 
			"'property'", "'returns'", "'set'", "'step'", "'test'", "'then'", "'throw'", 
			"'to'", "'variable'", "'assertEqual'", "'as'", "'def'", "'except'", "'__init__'", 
			"'None'", "'pass'", "'raise'", "'ABC'", "'unittest.TestCase'", "'tuple'", 
			"'int'", "'float'", "'bool'", "'str'", "'list'", "'Callable'", "'True'", 
			"'False'", "'and'", "'or'", "'not'", "'=='", "'!='", "'%'", "'->'", "'**'", 
			"'0b'", "'0x'", "'self'", "'='", "'{'", "'}'", "'['", "']'", "'('", "')'", 
			"'.'", "','", "':'", "'+'", "'-'", "'*'", "'/'", "'<'", "'>'", "'<='", 
			"'>='", "'\"'", null, null, null, null, null, null, null, null, null, 
			null, null, null, null, "'#[ghosted] '", "''''[ghosted] '", "'''''", 
			"'# end main'", "'# end function'", "'# end test'", "'# end procedure'", 
			"'# end enum'", "'# end class'", "'# end if'", "'# end while'", "'# end for'", 
			"'# end try'", "'# end constructor'", "'# end function method'", "'# end procedure method'", 
			"'# assignment'", "'# variable definition'", "'@abstractmethod'"
		};
	}
	private static final String[] _LITERAL_NAMES = makeLiteralNames();
	private static String[] makeSymbolicNames() {
		return new String[] {
			null, "CLASS", "ELIF", "ELSE", "ENUM", "FOR", "IF", "IN", "INPUT", "LAMBDA", 
			"MAIN", "RETURN", "TRY", "WHILE", "IF_", "ABSTRACT", "ASSERT", "ASSIGN", 
			"BE", "CALL", "CATCH", "CONSTANT", "CONSTRUCTOR", "COPY", "DIV", "END", 
			"EVALUATES", "FROM", "FUNCTION", "INHERITS", "LET", "NEW", "PRIVATE", 
			"PROCEDURE", "PROPERTY", "RETURNS", "SET", "STEP", "TEST", "THEN", "THROW", 
			"TO", "VARIABLE", "ASSERT_EQUAL", "AS", "DEF", "EXCEPT", "INIT", "NONE", 
			"PASS", "RAISE", "ABC", "TESTCASE", "TUPLE", "INT_NAME", "FLOAT_NAME", 
			"BOOL_NAME", "STRING_NAME", "LIST_NAME", "FUNC_NAME", "TRUE", "FALSE", 
			"AND", "OR", "NOT", "EQUAL", "NOT_EQUAL", "MOD", "ARROW", "POWER", "BINARY_PREFIX", 
			"HEX_PREFIX", "THIS_INSTANCE", "SINGLE_EQUALS", "OPEN_BRACE", "CLOSE_BRACE", 
			"OPEN_SQ_BRACKET", "CLOSE_SQ_BRACKET", "OPEN_BRACKET", "CLOSE_BRACKET", 
			"DOT", "COMMA", "COLON", "PLUS", "MINUS", "MULT", "DIVIDE", "LT", "GT", 
			"LE", "GE", "DOUBLE_QUOTES", "WS", "NL", "NAME_STARTING_TEST_", "NAME_STARTING_LC", 
			"NAME_STARTING_UC", "LITERAL_BINARY", "LITERAL_HEX", "LITERAL_INTEGER", 
			"LITERAL_FLOAT", "LITERAL_STRING", "INTERPOLATED_STRING", "WHITESPACES", 
			"TEXT", "GHOSTED_LINE", "GHOSTED_BLOCK_START", "GHOSTED_BLOCK_END", "END_MAIN", 
			"END_FUNCTION", "END_TEST", "END_PROCEDURE", "END_ENUM", "END_CLASS", 
			"END_IF", "END_WHILE", "END_FOR", "END_TRY", "END_CONSTRUCTOR", "END_FUNCTION_METHOD", 
			"END_PROCEDURE_METHOD", "ASSIGNMENT_ANNOTATION", "VARIABLE_DEFINITION_ANNOTATION", 
			"ABSTRACT_METHOD", "COMMENT"
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
			setState(173);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,0,_ctx) ) {
			case 1:
				{
				setState(172);
				comment();
				}
				break;
			}
			setState(178);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==CLASS || _la==DEF || ((((_la - 95)) & ~0x3f) == 0 && ((1L << (_la - 95)) & 536873985L) != 0)) {
				{
				{
				setState(175);
				global();
				}
				}
				setState(180);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			setState(182);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==MAIN) {
				{
				setState(181);
				mainCall();
				}
			}

			setState(187);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==NL) {
				{
				{
				setState(184);
				match(NL);
				}
				}
				setState(189);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			setState(190);
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
		enterRule(_localctx, 2, RULE_global);
		try {
			setState(201);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,4,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(192);
				main();
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(193);
				function();
				}
				break;
			case 3:
				enterOuterAlt(_localctx, 3);
				{
				setState(194);
				test();
				}
				break;
			case 4:
				enterOuterAlt(_localctx, 4);
				{
				setState(195);
				procedure();
				}
				break;
			case 5:
				enterOuterAlt(_localctx, 5);
				{
				setState(196);
				constant();
				}
				break;
			case 6:
				enterOuterAlt(_localctx, 6);
				{
				setState(197);
				enum_();
				}
				break;
			case 7:
				enterOuterAlt(_localctx, 7);
				{
				setState(198);
				concreteClass();
				}
				break;
			case 8:
				enterOuterAlt(_localctx, 8);
				{
				setState(199);
				abstractClass();
				}
				break;
			case 9:
				enterOuterAlt(_localctx, 9);
				{
				setState(200);
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
		enterRule(_localctx, 4, RULE_main);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(204);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==GHOSTED_BLOCK_START) {
				{
				setState(203);
				match(GHOSTED_BLOCK_START);
				}
			}

			setState(206);
			match(DEF);
			setState(207);
			match(MAIN);
			setState(208);
			match(OPEN_BRACKET);
			setState(209);
			match(CLOSE_BRACKET);
			setState(210);
			match(ARROW);
			setState(211);
			match(NONE);
			setState(212);
			match(COLON);
			setState(213);
			match(NL);
			setState(217);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while ((((_la) & ~0x3f) == 0 && ((1L << _la) & 4018336767521337440L) != 0) || ((((_la - 72)) & ~0x3f) == 0 && ((1L << (_la - 72)) & 4503627536269397L) != 0)) {
				{
				{
				setState(214);
				ordinaryStatement();
				}
				}
				setState(219);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			setState(220);
			match(END_MAIN);
			setState(222);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==GHOSTED_BLOCK_END) {
				{
				setState(221);
				match(GHOSTED_BLOCK_END);
				}
			}

			setState(224);
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
		enterRule(_localctx, 6, RULE_mainCall);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(226);
			match(MAIN);
			setState(227);
			match(OPEN_BRACKET);
			setState(228);
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
		enterRule(_localctx, 8, RULE_function);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(231);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==GHOSTED_BLOCK_START) {
				{
				setState(230);
				match(GHOSTED_BLOCK_START);
				}
			}

			setState(233);
			match(DEF);
			setState(234);
			methodName();
			setState(235);
			match(OPEN_BRACKET);
			setState(237);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==THIS_INSTANCE || _la==NAME_STARTING_LC) {
				{
				setState(236);
				paramList();
				}
			}

			setState(239);
			match(CLOSE_BRACKET);
			setState(240);
			match(ARROW);
			setState(241);
			type();
			setState(242);
			match(COLON);
			setState(244);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==COMMENT) {
				{
				setState(243);
				commentText();
				}
			}

			setState(246);
			match(NL);
			setState(250);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while ((((_la) & ~0x3f) == 0 && ((1L << _la) & 4018336767521337440L) != 0) || ((((_la - 72)) & ~0x3f) == 0 && ((1L << (_la - 72)) & 4503627536269397L) != 0)) {
				{
				{
				setState(247);
				ordinaryStatement();
				}
				}
				setState(252);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			setState(253);
			returnStatement();
			setState(254);
			match(END_FUNCTION);
			setState(256);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==GHOSTED_BLOCK_END) {
				{
				setState(255);
				match(GHOSTED_BLOCK_END);
				}
			}

			setState(258);
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
		public TestNameContext testName() {
			return getRuleContext(TestNameContext.class,0);
		}
		public TerminalNode OPEN_BRACKET() { return getToken(PythonParser.OPEN_BRACKET, 0); }
		public TerminalNode TESTCASE() { return getToken(PythonParser.TESTCASE, 0); }
		public TerminalNode CLOSE_BRACKET() { return getToken(PythonParser.CLOSE_BRACKET, 0); }
		public TerminalNode COMMENT() { return getToken(PythonParser.COMMENT, 0); }
		public List<TerminalNode> NL() { return getTokens(PythonParser.NL); }
		public TerminalNode NL(int i) {
			return getToken(PythonParser.NL, i);
		}
		public TerminalNode END_TEST() { return getToken(PythonParser.END_TEST, 0); }
		public TerminalNode GHOSTED_BLOCK_START() { return getToken(PythonParser.GHOSTED_BLOCK_START, 0); }
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
		enterRule(_localctx, 10, RULE_test);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(261);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==GHOSTED_BLOCK_START) {
				{
				setState(260);
				match(GHOSTED_BLOCK_START);
				}
			}

			setState(263);
			match(CLASS);
			setState(264);
			testName();
			setState(265);
			match(OPEN_BRACKET);
			setState(266);
			match(TESTCASE);
			setState(267);
			match(CLOSE_BRACKET);
			setState(268);
			match(COMMENT);
			setState(269);
			match(NL);
			setState(273);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (((((_la - 72)) & ~0x3f) == 0 && ((1L << (_la - 72)) & 4503608225693697L) != 0)) {
				{
				{
				setState(270);
				testStatement();
				}
				}
				setState(275);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			setState(276);
			match(END_TEST);
			setState(278);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==GHOSTED_BLOCK_END) {
				{
				setState(277);
				match(GHOSTED_BLOCK_END);
				}
			}

			setState(280);
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
		enterRule(_localctx, 12, RULE_testStatement);
		try {
			setState(285);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,16,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(282);
				assert_();
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(283);
				variableDefinition();
				}
				break;
			case 3:
				enterOuterAlt(_localctx, 3);
				{
				setState(284);
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
		enterRule(_localctx, 14, RULE_procedure);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(288);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==GHOSTED_BLOCK_START) {
				{
				setState(287);
				match(GHOSTED_BLOCK_START);
				}
			}

			setState(290);
			match(DEF);
			setState(291);
			methodName();
			setState(292);
			match(OPEN_BRACKET);
			setState(294);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==THIS_INSTANCE || _la==NAME_STARTING_LC) {
				{
				setState(293);
				paramList();
				}
			}

			setState(296);
			match(CLOSE_BRACKET);
			setState(297);
			match(ARROW);
			setState(298);
			match(NONE);
			setState(299);
			match(COLON);
			setState(301);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==COMMENT) {
				{
				setState(300);
				commentText();
				}
			}

			setState(303);
			match(NL);
			setState(307);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while ((((_la) & ~0x3f) == 0 && ((1L << _la) & 4018336767521337440L) != 0) || ((((_la - 72)) & ~0x3f) == 0 && ((1L << (_la - 72)) & 4503627536269397L) != 0)) {
				{
				{
				setState(304);
				ordinaryStatement();
				}
				}
				setState(309);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			setState(310);
			match(END_PROCEDURE);
			setState(312);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==GHOSTED_BLOCK_END) {
				{
				setState(311);
				match(GHOSTED_BLOCK_END);
				}
			}

			setState(314);
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
		enterRule(_localctx, 16, RULE_constant);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(317);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==GHOSTED_LINE) {
				{
				setState(316);
				match(GHOSTED_LINE);
				}
			}

			setState(319);
			identifierDef();
			setState(320);
			match(SINGLE_EQUALS);
			setState(321);
			constantValue();
			setState(323);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==COMMENT) {
				{
				setState(322);
				commentText();
				}
			}

			setState(325);
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
		public IdentifierListContext identifierList() {
			return getRuleContext(IdentifierListContext.class,0);
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
		enterRule(_localctx, 18, RULE_enum);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(328);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==GHOSTED_BLOCK_START) {
				{
				setState(327);
				match(GHOSTED_BLOCK_START);
				}
			}

			setState(330);
			match(CLASS);
			setState(331);
			typeName();
			setState(332);
			match(OPEN_BRACKET);
			setState(333);
			match(ENUM);
			setState(334);
			match(CLOSE_BRACKET);
			setState(335);
			match(COLON);
			setState(337);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==COMMENT) {
				{
				setState(336);
				commentText();
				}
			}

			setState(339);
			match(NL);
			setState(340);
			identifierList();
			setState(341);
			match(END_ENUM);
			setState(343);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==GHOSTED_BLOCK_END) {
				{
				setState(342);
				match(GHOSTED_BLOCK_END);
				}
			}

			setState(345);
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
		enterRule(_localctx, 20, RULE_concreteClass);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(348);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==GHOSTED_BLOCK_START) {
				{
				setState(347);
				match(GHOSTED_BLOCK_START);
				}
			}

			setState(350);
			match(CLASS);
			setState(351);
			((ConcreteClassContext)_localctx).classTypeName = typeName();
			setState(356);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==OPEN_BRACKET) {
				{
				setState(352);
				match(OPEN_BRACKET);
				setState(353);
				((ConcreteClassContext)_localctx).inheritsTypeName = typeName();
				setState(354);
				match(CLOSE_BRACKET);
				}
			}

			setState(358);
			match(COLON);
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
			setState(363);
			constructorMember();
			setState(367);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==DEF || ((((_la - 95)) & ~0x3f) == 0 && ((1L << (_la - 95)) & 536873985L) != 0)) {
				{
				{
				setState(364);
				concreteClassMember();
				}
				}
				setState(369);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			setState(370);
			match(END_CLASS);
			setState(372);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==GHOSTED_BLOCK_END) {
				{
				setState(371);
				match(GHOSTED_BLOCK_END);
				}
			}

			setState(374);
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
		enterRule(_localctx, 22, RULE_concreteClassMember);
		try {
			setState(380);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,32,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(376);
				property();
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(377);
				functionMethod();
				}
				break;
			case 3:
				enterOuterAlt(_localctx, 3);
				{
				setState(378);
				procedureMethod();
				}
				break;
			case 4:
				enterOuterAlt(_localctx, 4);
				{
				setState(379);
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
		enterRule(_localctx, 24, RULE_abstractClass);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(383);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==GHOSTED_BLOCK_START) {
				{
				setState(382);
				match(GHOSTED_BLOCK_START);
				}
			}

			setState(385);
			match(CLASS);
			setState(386);
			((AbstractClassContext)_localctx).classTypeName = typeName();
			{
			setState(387);
			match(OPEN_BRACKET);
			setState(390);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case INT_NAME:
			case FLOAT_NAME:
			case BOOL_NAME:
			case STRING_NAME:
			case LIST_NAME:
			case NAME_STARTING_UC:
				{
				setState(388);
				((AbstractClassContext)_localctx).inheritsTypeName = typeName();
				}
				break;
			case ABC:
				{
				setState(389);
				match(ABC);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			setState(392);
			match(CLOSE_BRACKET);
			}
			setState(394);
			match(COLON);
			setState(396);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==COMMENT) {
				{
				setState(395);
				commentText();
				}
			}

			setState(398);
			match(NL);
			setState(402);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==DEF || ((((_la - 95)) & ~0x3f) == 0 && ((1L << (_la - 95)) & 805309441L) != 0)) {
				{
				{
				setState(399);
				abstractClassMember();
				}
				}
				setState(404);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			setState(405);
			match(END_CLASS);
			setState(407);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==GHOSTED_BLOCK_END) {
				{
				setState(406);
				match(GHOSTED_BLOCK_END);
				}
			}

			setState(409);
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
		enterRule(_localctx, 26, RULE_abstractClassMember);
		try {
			setState(417);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,38,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(411);
				property();
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(412);
				functionMethod();
				}
				break;
			case 3:
				enterOuterAlt(_localctx, 3);
				{
				setState(413);
				procedureMethod();
				}
				break;
			case 4:
				enterOuterAlt(_localctx, 4);
				{
				setState(414);
				abstractFunction();
				}
				break;
			case 5:
				enterOuterAlt(_localctx, 5);
				{
				setState(415);
				abstractProcedure();
				}
				break;
			case 6:
				enterOuterAlt(_localctx, 6);
				{
				setState(416);
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
		enterRule(_localctx, 28, RULE_comment);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(420);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==GHOSTED_LINE) {
				{
				setState(419);
				match(GHOSTED_LINE);
				}
			}

			setState(422);
			commentText();
			setState(423);
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
		enterRule(_localctx, 30, RULE_commentText);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(425);
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
		enterRule(_localctx, 32, RULE_ordinaryStatement);
		try {
			setState(436);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,40,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(427);
				variableDefinition();
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(428);
				assignment();
				}
				break;
			case 3:
				enterOuterAlt(_localctx, 3);
				{
				setState(429);
				ifStatement();
				}
				break;
			case 4:
				enterOuterAlt(_localctx, 4);
				{
				setState(430);
				whileLoop();
				}
				break;
			case 5:
				enterOuterAlt(_localctx, 5);
				{
				setState(431);
				forLoop();
				}
				break;
			case 6:
				enterOuterAlt(_localctx, 6);
				{
				setState(432);
				procedureCall();
				}
				break;
			case 7:
				enterOuterAlt(_localctx, 7);
				{
				setState(433);
				tryStatement();
				}
				break;
			case 8:
				enterOuterAlt(_localctx, 8);
				{
				setState(434);
				throwStatement();
				}
				break;
			case 9:
				enterOuterAlt(_localctx, 9);
				{
				setState(435);
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
		enterRule(_localctx, 34, RULE_variableDefinition);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(439);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==GHOSTED_LINE) {
				{
				setState(438);
				match(GHOSTED_LINE);
				}
			}

			setState(441);
			identifierDef();
			setState(442);
			match(SINGLE_EQUALS);
			setState(443);
			expression(0);
			setState(444);
			match(VARIABLE_DEFINITION_ANNOTATION);
			setState(445);
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
		enterRule(_localctx, 36, RULE_assignment);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(448);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==GHOSTED_LINE) {
				{
				setState(447);
				match(GHOSTED_LINE);
				}
			}

			setState(450);
			assignable(0);
			setState(451);
			match(SINGLE_EQUALS);
			setState(452);
			expression(0);
			setState(453);
			match(ASSIGNMENT_ANNOTATION);
			setState(454);
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
		enterRule(_localctx, 38, RULE_ifStatement);
		int _la;
		try {
			int _alt;
			enterOuterAlt(_localctx, 1);
			{
			setState(457);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==GHOSTED_BLOCK_START) {
				{
				setState(456);
				match(GHOSTED_BLOCK_START);
				}
			}

			setState(459);
			match(IF);
			setState(460);
			((IfStatementContext)_localctx).condition = expression(0);
			setState(461);
			match(COLON);
			setState(463);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==COMMENT) {
				{
				setState(462);
				commentText();
				}
			}

			setState(465);
			match(NL);
			setState(466);
			thenClause();
			setState(470);
			_errHandler.sync(this);
			_alt = getInterpreter().adaptivePredict(_input,45,_ctx);
			while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER ) {
				if ( _alt==1 ) {
					{
					{
					setState(467);
					elseIfClause();
					}
					} 
				}
				setState(472);
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,45,_ctx);
			}
			setState(474);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==ELSE || _la==GHOSTED_BLOCK_START) {
				{
				setState(473);
				elseClause();
				}
			}

			setState(476);
			match(END_IF);
			setState(478);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==GHOSTED_BLOCK_END) {
				{
				setState(477);
				match(GHOSTED_BLOCK_END);
				}
			}

			setState(480);
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
		enterRule(_localctx, 40, RULE_thenClause);
		try {
			int _alt;
			enterOuterAlt(_localctx, 1);
			{
			setState(485);
			_errHandler.sync(this);
			_alt = getInterpreter().adaptivePredict(_input,48,_ctx);
			while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER ) {
				if ( _alt==1 ) {
					{
					{
					setState(482);
					ordinaryStatement();
					}
					} 
				}
				setState(487);
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,48,_ctx);
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
		enterRule(_localctx, 42, RULE_elseIfClause);
		int _la;
		try {
			int _alt;
			enterOuterAlt(_localctx, 1);
			{
			setState(489);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==GHOSTED_BLOCK_START) {
				{
				setState(488);
				match(GHOSTED_BLOCK_START);
				}
			}

			setState(491);
			match(ELIF);
			setState(492);
			expression(0);
			setState(493);
			match(COLON);
			setState(495);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==COMMENT) {
				{
				setState(494);
				commentText();
				}
			}

			setState(497);
			match(NL);
			setState(501);
			_errHandler.sync(this);
			_alt = getInterpreter().adaptivePredict(_input,51,_ctx);
			while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER ) {
				if ( _alt==1 ) {
					{
					{
					setState(498);
					ordinaryStatement();
					}
					} 
				}
				setState(503);
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,51,_ctx);
			}
			setState(505);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==GHOSTED_BLOCK_END) {
				{
				setState(504);
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
		enterRule(_localctx, 44, RULE_elseClause);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(508);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==GHOSTED_BLOCK_START) {
				{
				setState(507);
				match(GHOSTED_BLOCK_START);
				}
			}

			setState(510);
			match(ELSE);
			setState(511);
			match(COLON);
			setState(513);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==COMMENT) {
				{
				setState(512);
				commentText();
				}
			}

			setState(515);
			match(NL);
			setState(519);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while ((((_la) & ~0x3f) == 0 && ((1L << _la) & 4018336767521337440L) != 0) || ((((_la - 72)) & ~0x3f) == 0 && ((1L << (_la - 72)) & 4503627536269397L) != 0)) {
				{
				{
				setState(516);
				ordinaryStatement();
				}
				}
				setState(521);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			setState(523);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==GHOSTED_BLOCK_END) {
				{
				setState(522);
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
		public TerminalNode GHOSTED_BLOCK_END() { return getToken(PythonParser.GHOSTED_BLOCK_END, 0); }
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
		public WhileLoopContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_whileLoop; }
	}

	public final WhileLoopContext whileLoop() throws RecognitionException {
		WhileLoopContext _localctx = new WhileLoopContext(_ctx, getState());
		enterRule(_localctx, 46, RULE_whileLoop);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(526);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==GHOSTED_BLOCK_START) {
				{
				setState(525);
				match(GHOSTED_BLOCK_START);
				}
			}

			setState(528);
			match(WHILE);
			setState(529);
			expression(0);
			setState(530);
			match(COLON);
			setState(532);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==COMMENT) {
				{
				setState(531);
				commentText();
				}
			}

			setState(534);
			match(NL);
			setState(538);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while ((((_la) & ~0x3f) == 0 && ((1L << _la) & 4018336767521337440L) != 0) || ((((_la - 72)) & ~0x3f) == 0 && ((1L << (_la - 72)) & 4503627536269397L) != 0)) {
				{
				{
				setState(535);
				ordinaryStatement();
				}
				}
				setState(540);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			setState(541);
			match(END_WHILE);
			setState(542);
			match(GHOSTED_BLOCK_END);
			setState(543);
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
		public TerminalNode GHOSTED_BLOCK_END() { return getToken(PythonParser.GHOSTED_BLOCK_END, 0); }
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
		public ForLoopContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_forLoop; }
	}

	public final ForLoopContext forLoop() throws RecognitionException {
		ForLoopContext _localctx = new ForLoopContext(_ctx, getState());
		enterRule(_localctx, 48, RULE_forLoop);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(546);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==GHOSTED_BLOCK_START) {
				{
				setState(545);
				match(GHOSTED_BLOCK_START);
				}
			}

			setState(548);
			match(FOR);
			setState(549);
			identifierDef();
			setState(550);
			match(IN);
			setState(551);
			expression(0);
			setState(552);
			match(COLON);
			setState(554);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==COMMENT) {
				{
				setState(553);
				commentText();
				}
			}

			setState(556);
			match(NL);
			setState(560);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while ((((_la) & ~0x3f) == 0 && ((1L << _la) & 4018336767521337440L) != 0) || ((((_la - 72)) & ~0x3f) == 0 && ((1L << (_la - 72)) & 4503627536269397L) != 0)) {
				{
				{
				setState(557);
				ordinaryStatement();
				}
				}
				setState(562);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			setState(563);
			match(END_FOR);
			setState(564);
			match(GHOSTED_BLOCK_END);
			setState(565);
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
		enterRule(_localctx, 50, RULE_procedureCall);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(568);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==GHOSTED_LINE) {
				{
				setState(567);
				match(GHOSTED_LINE);
				}
			}

			setState(570);
			term(0);
			setState(572);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==COMMENT) {
				{
				setState(571);
				commentText();
				}
			}

			setState(574);
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
		enterRule(_localctx, 52, RULE_tryStatement);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(577);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==GHOSTED_BLOCK_START) {
				{
				setState(576);
				match(GHOSTED_BLOCK_START);
				}
			}

			setState(579);
			match(TRY);
			setState(580);
			match(COLON);
			setState(582);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==COMMENT) {
				{
				setState(581);
				commentText();
				}
			}

			setState(584);
			match(NL);
			setState(585);
			tryClause();
			setState(587); 
			_errHandler.sync(this);
			_la = _input.LA(1);
			do {
				{
				{
				setState(586);
				catchClause();
				}
				}
				setState(589); 
				_errHandler.sync(this);
				_la = _input.LA(1);
			} while ( _la==EXCEPT || _la==GHOSTED_BLOCK_START );
			setState(591);
			match(END_TRY);
			setState(593);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==GHOSTED_BLOCK_END) {
				{
				setState(592);
				match(GHOSTED_BLOCK_END);
				}
			}

			setState(595);
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
		enterRule(_localctx, 54, RULE_tryClause);
		try {
			int _alt;
			enterOuterAlt(_localctx, 1);
			{
			setState(600);
			_errHandler.sync(this);
			_alt = getInterpreter().adaptivePredict(_input,69,_ctx);
			while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER ) {
				if ( _alt==1 ) {
					{
					{
					setState(597);
					ordinaryStatement();
					}
					} 
				}
				setState(602);
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,69,_ctx);
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
		enterRule(_localctx, 56, RULE_catchClause);
		int _la;
		try {
			int _alt;
			enterOuterAlt(_localctx, 1);
			{
			setState(604);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==GHOSTED_BLOCK_START) {
				{
				setState(603);
				match(GHOSTED_BLOCK_START);
				}
			}

			setState(606);
			match(EXCEPT);
			setState(607);
			typeName();
			setState(608);
			match(AS);
			setState(609);
			identifierDef();
			setState(610);
			match(COLON);
			setState(612);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==COMMENT) {
				{
				setState(611);
				commentText();
				}
			}

			setState(614);
			match(NL);
			setState(618);
			_errHandler.sync(this);
			_alt = getInterpreter().adaptivePredict(_input,72,_ctx);
			while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER ) {
				if ( _alt==1 ) {
					{
					{
					setState(615);
					ordinaryStatement();
					}
					} 
				}
				setState(620);
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,72,_ctx);
			}
			setState(622);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==GHOSTED_BLOCK_END) {
				{
				setState(621);
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
		enterRule(_localctx, 58, RULE_throwStatement);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(625);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==GHOSTED_LINE) {
				{
				setState(624);
				match(GHOSTED_LINE);
				}
			}

			setState(627);
			match(RAISE);
			setState(628);
			typeName();
			setState(629);
			match(OPEN_BRACKET);
			setState(630);
			errorMessage();
			setState(631);
			match(CLOSE_BRACKET);
			setState(633);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==COMMENT) {
				{
				setState(632);
				commentText();
				}
			}

			setState(635);
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
		enterRule(_localctx, 60, RULE_errorMessage);
		try {
			setState(639);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case LITERAL_STRING:
			case INTERPOLATED_STRING:
				enterOuterAlt(_localctx, 1);
				{
				setState(637);
				litString();
				}
				break;
			case NAME_STARTING_LC:
				enterOuterAlt(_localctx, 2);
				{
				setState(638);
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
		enterRule(_localctx, 62, RULE_assert);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(642);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==GHOSTED_LINE) {
				{
				setState(641);
				match(GHOSTED_LINE);
				}
			}

			setState(644);
			match(THIS_INSTANCE);
			setState(645);
			match(DOT);
			setState(646);
			match(ASSERT_EQUAL);
			setState(647);
			match(OPEN_BRACKET);
			setState(648);
			assertActual();
			setState(649);
			match(COMMA);
			setState(650);
			assertExpected();
			setState(651);
			match(CLOSE_BRACKET);
			setState(653);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==COMMENT) {
				{
				setState(652);
				commentText();
				}
			}

			setState(655);
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
		enterRule(_localctx, 64, RULE_returnStatement);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(657);
			match(RETURN);
			setState(658);
			expression(0);
			setState(660);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==COMMENT) {
				{
				setState(659);
				commentText();
				}
			}

			setState(662);
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
	public static class ConstructorMemberContext extends ParserRuleContext {
		public TerminalNode DEF() { return getToken(PythonParser.DEF, 0); }
		public TerminalNode INIT() { return getToken(PythonParser.INIT, 0); }
		public TerminalNode OPEN_BRACKET() { return getToken(PythonParser.OPEN_BRACKET, 0); }
		public TerminalNode CLOSE_BRACKET() { return getToken(PythonParser.CLOSE_BRACKET, 0); }
		public TerminalNode ARROW() { return getToken(PythonParser.ARROW, 0); }
		public TerminalNode NONE() { return getToken(PythonParser.NONE, 0); }
		public TerminalNode COLON() { return getToken(PythonParser.COLON, 0); }
		public TerminalNode GHOSTED_BLOCK_END() { return getToken(PythonParser.GHOSTED_BLOCK_END, 0); }
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
		enterRule(_localctx, 66, RULE_constructorMember);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(665);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==GHOSTED_BLOCK_START) {
				{
				setState(664);
				match(GHOSTED_BLOCK_START);
				}
			}

			setState(667);
			match(DEF);
			setState(668);
			match(INIT);
			setState(669);
			match(OPEN_BRACKET);
			setState(671);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==THIS_INSTANCE || _la==NAME_STARTING_LC) {
				{
				setState(670);
				paramList();
				}
			}

			setState(673);
			match(CLOSE_BRACKET);
			setState(674);
			match(ARROW);
			setState(675);
			match(NONE);
			setState(676);
			match(COLON);
			setState(678);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==COMMENT) {
				{
				setState(677);
				commentText();
				}
			}

			setState(680);
			match(GHOSTED_BLOCK_END);
			setState(681);
			match(NL);
			setState(685);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while ((((_la) & ~0x3f) == 0 && ((1L << _la) & 4018336767521337440L) != 0) || ((((_la - 72)) & ~0x3f) == 0 && ((1L << (_la - 72)) & 4503627536269397L) != 0)) {
				{
				{
				setState(682);
				ordinaryStatement();
				}
				}
				setState(687);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			setState(688);
			match(END_CONSTRUCTOR);
			setState(689);
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
		enterRule(_localctx, 68, RULE_property);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(692);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==GHOSTED_LINE) {
				{
				setState(691);
				match(GHOSTED_LINE);
				}
			}

			setState(694);
			identifierDef();
			setState(695);
			match(COLON);
			setState(696);
			type();
			setState(698);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==COMMENT) {
				{
				setState(697);
				commentText();
				}
			}

			setState(700);
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
		public FunctionMethodContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_functionMethod; }
	}

	public final FunctionMethodContext functionMethod() throws RecognitionException {
		FunctionMethodContext _localctx = new FunctionMethodContext(_ctx, getState());
		enterRule(_localctx, 70, RULE_functionMethod);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(703);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==GHOSTED_BLOCK_START) {
				{
				setState(702);
				match(GHOSTED_BLOCK_START);
				}
			}

			setState(705);
			match(DEF);
			setState(706);
			methodName();
			setState(707);
			match(OPEN_BRACKET);
			setState(709);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==THIS_INSTANCE || _la==NAME_STARTING_LC) {
				{
				setState(708);
				paramList();
				}
			}

			setState(711);
			match(CLOSE_BRACKET);
			setState(712);
			match(ARROW);
			setState(713);
			type();
			setState(714);
			match(COLON);
			setState(716);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==COMMENT) {
				{
				setState(715);
				commentText();
				}
			}

			setState(718);
			match(NL);
			setState(722);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while ((((_la) & ~0x3f) == 0 && ((1L << _la) & 4018336767521337440L) != 0) || ((((_la - 72)) & ~0x3f) == 0 && ((1L << (_la - 72)) & 4503627536269397L) != 0)) {
				{
				{
				setState(719);
				ordinaryStatement();
				}
				}
				setState(724);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			setState(725);
			returnStatement();
			setState(726);
			match(END_FUNCTION);
			setState(728);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==GHOSTED_BLOCK_END) {
				{
				setState(727);
				match(GHOSTED_BLOCK_END);
				}
			}

			setState(730);
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
		public ProcedureMethodContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_procedureMethod; }
	}

	public final ProcedureMethodContext procedureMethod() throws RecognitionException {
		ProcedureMethodContext _localctx = new ProcedureMethodContext(_ctx, getState());
		enterRule(_localctx, 72, RULE_procedureMethod);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(733);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==GHOSTED_BLOCK_START) {
				{
				setState(732);
				match(GHOSTED_BLOCK_START);
				}
			}

			setState(735);
			match(DEF);
			setState(736);
			methodName();
			setState(737);
			match(OPEN_BRACKET);
			setState(739);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==THIS_INSTANCE || _la==NAME_STARTING_LC) {
				{
				setState(738);
				paramList();
				}
			}

			setState(741);
			match(CLOSE_BRACKET);
			setState(742);
			match(ARROW);
			setState(743);
			match(NONE);
			setState(744);
			match(COLON);
			setState(746);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==COMMENT) {
				{
				setState(745);
				commentText();
				}
			}

			setState(748);
			match(NL);
			setState(752);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while ((((_la) & ~0x3f) == 0 && ((1L << _la) & 4018336767521337440L) != 0) || ((((_la - 72)) & ~0x3f) == 0 && ((1L << (_la - 72)) & 4503627536269397L) != 0)) {
				{
				{
				setState(749);
				ordinaryStatement();
				}
				}
				setState(754);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			setState(755);
			match(END_PROCEDURE);
			setState(757);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==GHOSTED_BLOCK_END) {
				{
				setState(756);
				match(GHOSTED_BLOCK_END);
				}
			}

			setState(759);
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
		enterRule(_localctx, 74, RULE_abstractFunction);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(762);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==GHOSTED_LINE) {
				{
				setState(761);
				match(GHOSTED_LINE);
				}
			}

			setState(764);
			match(ABSTRACT_METHOD);
			setState(765);
			match(NL);
			setState(766);
			match(DEF);
			setState(767);
			methodName();
			setState(768);
			match(OPEN_BRACKET);
			setState(770);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==THIS_INSTANCE || _la==NAME_STARTING_LC) {
				{
				setState(769);
				paramList();
				}
			}

			setState(772);
			match(CLOSE_BRACKET);
			setState(773);
			match(ARROW);
			setState(774);
			type();
			setState(775);
			match(COLON);
			setState(776);
			match(NL);
			setState(777);
			match(PASS);
			setState(779);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==COMMENT) {
				{
				setState(778);
				commentText();
				}
			}

			setState(781);
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
		enterRule(_localctx, 76, RULE_abstractProcedure);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(784);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==GHOSTED_LINE) {
				{
				setState(783);
				match(GHOSTED_LINE);
				}
			}

			setState(786);
			match(ABSTRACT_METHOD);
			setState(787);
			match(NL);
			setState(788);
			match(DEF);
			setState(789);
			methodName();
			setState(790);
			match(OPEN_BRACKET);
			setState(792);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==THIS_INSTANCE || _la==NAME_STARTING_LC) {
				{
				setState(791);
				paramList();
				}
			}

			setState(794);
			match(CLOSE_BRACKET);
			setState(795);
			match(ARROW);
			setState(796);
			match(NONE);
			setState(797);
			match(COLON);
			setState(798);
			match(NL);
			setState(799);
			match(PASS);
			setState(801);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==COMMENT) {
				{
				setState(800);
				commentText();
				}
			}

			setState(803);
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
		enterRule(_localctx, 78, RULE_identifierDef);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(805);
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
		enterRule(_localctx, 80, RULE_identifierUse);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(807);
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
		int _startState = 82;
		enterRecursionRule(_localctx, 82, RULE_assignable, _p);
		try {
			int _alt;
			enterOuterAlt(_localctx, 1);
			{
			setState(814);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case NAME_STARTING_LC:
				{
				_localctx = new SimpleAssignableContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;

				setState(810);
				identifierUse();
				}
				break;
			case THIS_INSTANCE:
				{
				_localctx = new ThisAssignableContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;
				setState(811);
				match(THIS_INSTANCE);
				setState(812);
				match(DOT);
				setState(813);
				identifierUse();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			_ctx.stop = _input.LT(-1);
			setState(820);
			_errHandler.sync(this);
			_alt = getInterpreter().adaptivePredict(_input,103,_ctx);
			while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER ) {
				if ( _alt==1 ) {
					if ( _parseListeners!=null ) triggerExitRuleEvent();
					_prevctx = _localctx;
					{
					{
					_localctx = new IndexedAssignableContext(new AssignableContext(_parentctx, _parentState));
					pushNewRecursionContext(_localctx, _startState, RULE_assignable);
					setState(816);
					if (!(precpred(_ctx, 1))) throw new FailedPredicateException(this, "precpred(_ctx, 1)");
					setState(817);
					index();
					}
					} 
				}
				setState(822);
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,103,_ctx);
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
		enterRule(_localctx, 84, RULE_methodName);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(823);
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
		enterRule(_localctx, 86, RULE_testName);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(825);
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
		enterRule(_localctx, 88, RULE_typeName);
		try {
			setState(833);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case INT_NAME:
				_localctx = new IntTypeNameContext(_localctx);
				enterOuterAlt(_localctx, 1);
				{
				setState(827);
				match(INT_NAME);
				}
				break;
			case FLOAT_NAME:
				_localctx = new FloatTypeNameContext(_localctx);
				enterOuterAlt(_localctx, 2);
				{
				setState(828);
				match(FLOAT_NAME);
				}
				break;
			case BOOL_NAME:
				_localctx = new BoolTypeNameContext(_localctx);
				enterOuterAlt(_localctx, 3);
				{
				setState(829);
				match(BOOL_NAME);
				}
				break;
			case STRING_NAME:
				_localctx = new StringTypeNameContext(_localctx);
				enterOuterAlt(_localctx, 4);
				{
				setState(830);
				match(STRING_NAME);
				}
				break;
			case LIST_NAME:
				_localctx = new ListTypeNameContext(_localctx);
				enterOuterAlt(_localctx, 5);
				{
				setState(831);
				match(LIST_NAME);
				}
				break;
			case NAME_STARTING_UC:
				_localctx = new UdtTypeNameContext(_localctx);
				enterOuterAlt(_localctx, 6);
				{
				setState(832);
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
		enterRule(_localctx, 90, RULE_constantValue);
		try {
			setState(839);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case TRUE:
			case FALSE:
				enterOuterAlt(_localctx, 1);
				{
				setState(835);
				litBoolean();
				}
				break;
			case LITERAL_BINARY:
			case LITERAL_HEX:
			case LITERAL_INTEGER:
				enterOuterAlt(_localctx, 2);
				{
				setState(836);
				litInt();
				}
				break;
			case LITERAL_FLOAT:
				enterOuterAlt(_localctx, 3);
				{
				setState(837);
				litFloat();
				}
				break;
			case LITERAL_STRING:
			case INTERPOLATED_STRING:
				enterOuterAlt(_localctx, 4);
				{
				setState(838);
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
		enterRule(_localctx, 92, RULE_argList);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(841);
			argument();
			setState(846);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==COMMA) {
				{
				{
				setState(842);
				match(COMMA);
				setState(843);
				argument();
				}
				}
				setState(848);
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
		enterRule(_localctx, 94, RULE_argument);
		try {
			setState(851);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case LAMBDA:
				enterOuterAlt(_localctx, 1);
				{
				setState(849);
				lambda();
				}
				break;
			case TUPLE:
			case INT_NAME:
			case FLOAT_NAME:
			case BOOL_NAME:
			case STRING_NAME:
			case LIST_NAME:
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
			case LITERAL_STRING:
			case INTERPOLATED_STRING:
				enterOuterAlt(_localctx, 2);
				{
				setState(850);
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
		enterRule(_localctx, 96, RULE_paramList);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(853);
			paramDef();
			setState(858);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==COMMA) {
				{
				{
				setState(854);
				match(COMMA);
				setState(855);
				paramDef();
				}
				}
				setState(860);
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
		enterRule(_localctx, 98, RULE_identifierList);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(861);
			identifierDef();
			setState(864); 
			_errHandler.sync(this);
			_la = _input.LA(1);
			do {
				{
				{
				setState(862);
				match(COMMA);
				setState(863);
				identifierDef();
				}
				}
				setState(866); 
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
		enterRule(_localctx, 100, RULE_expressionList);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(868);
			expression(0);
			setState(873);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==COMMA) {
				{
				{
				setState(869);
				match(COMMA);
				setState(870);
				expression(0);
				}
				}
				setState(875);
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
		enterRule(_localctx, 102, RULE_enumDefValue);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(876);
			identifierDef();
			setState(877);
			match(SINGLE_EQUALS);
			setState(878);
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
		enterRule(_localctx, 104, RULE_enumList);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(880);
			enumDefValue();
			setState(885);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==NL) {
				{
				{
				setState(881);
				match(NL);
				setState(882);
				enumDefValue();
				}
				}
				setState(887);
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
		enterRule(_localctx, 106, RULE_type);
		try {
			setState(892);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,112,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(888);
				typeTuple();
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(889);
				typeName();
				}
				break;
			case 3:
				enterOuterAlt(_localctx, 3);
				{
				setState(890);
				typeGeneric();
				}
				break;
			case 4:
				enterOuterAlt(_localctx, 4);
				{
				setState(891);
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
		enterRule(_localctx, 108, RULE_assertActual);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(894);
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
		public LitValueContext litValue() {
			return getRuleContext(LitValueContext.class,0);
		}
		public ListContext list() {
			return getRuleContext(ListContext.class,0);
		}
		public DictionaryContext dictionary() {
			return getRuleContext(DictionaryContext.class,0);
		}
		public UnaryExpressionContext unaryExpression() {
			return getRuleContext(UnaryExpressionContext.class,0);
		}
		public TupleContext tuple() {
			return getRuleContext(TupleContext.class,0);
		}
		public AssertExpectedContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_assertExpected; }
	}

	public final AssertExpectedContext assertExpected() throws RecognitionException {
		AssertExpectedContext _localctx = new AssertExpectedContext(_ctx, getState());
		enterRule(_localctx, 110, RULE_assertExpected);
		try {
			setState(901);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case INT_NAME:
			case FLOAT_NAME:
			case BOOL_NAME:
			case STRING_NAME:
			case LIST_NAME:
			case TRUE:
			case FALSE:
			case NAME_STARTING_UC:
			case LITERAL_BINARY:
			case LITERAL_HEX:
			case LITERAL_INTEGER:
			case LITERAL_FLOAT:
			case LITERAL_STRING:
			case INTERPOLATED_STRING:
				enterOuterAlt(_localctx, 1);
				{
				setState(896);
				litValue();
				}
				break;
			case OPEN_SQ_BRACKET:
				enterOuterAlt(_localctx, 2);
				{
				setState(897);
				list();
				}
				break;
			case OPEN_BRACE:
				enterOuterAlt(_localctx, 3);
				{
				setState(898);
				dictionary();
				}
				break;
			case NOT:
			case MINUS:
				enterOuterAlt(_localctx, 4);
				{
				setState(899);
				unaryExpression();
				}
				break;
			case OPEN_BRACKET:
				enterOuterAlt(_localctx, 5);
				{
				setState(900);
				tuple();
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
		enterRule(_localctx, 112, RULE_litValue);
		try {
			setState(909);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,114,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(903);
				litBoolean();
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(904);
				litInt();
				}
				break;
			case 3:
				enterOuterAlt(_localctx, 3);
				{
				setState(905);
				litFloat();
				}
				break;
			case 4:
				enterOuterAlt(_localctx, 4);
				{
				setState(906);
				litString();
				}
				break;
			case 5:
				enterOuterAlt(_localctx, 5);
				{
				setState(907);
				interpolatedString();
				}
				break;
			case 6:
				enterOuterAlt(_localctx, 6);
				{
				setState(908);
				enumValue();
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
	public static class LitBooleanContext extends ParserRuleContext {
		public TerminalNode TRUE() { return getToken(PythonParser.TRUE, 0); }
		public TerminalNode FALSE() { return getToken(PythonParser.FALSE, 0); }
		public LitBooleanContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_litBoolean; }
	}

	public final LitBooleanContext litBoolean() throws RecognitionException {
		LitBooleanContext _localctx = new LitBooleanContext(_ctx, getState());
		enterRule(_localctx, 114, RULE_litBoolean);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(911);
			_la = _input.LA(1);
			if ( !(_la==TRUE || _la==FALSE) ) {
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
		enterRule(_localctx, 116, RULE_litInt);
		try {
			setState(916);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case LITERAL_INTEGER:
				_localctx = new LitIntegerContext(_localctx);
				enterOuterAlt(_localctx, 1);
				{
				setState(913);
				match(LITERAL_INTEGER);
				}
				break;
			case LITERAL_BINARY:
				_localctx = new LitBinaryContext(_localctx);
				enterOuterAlt(_localctx, 2);
				{
				setState(914);
				match(LITERAL_BINARY);
				}
				break;
			case LITERAL_HEX:
				_localctx = new LitHexContext(_localctx);
				enterOuterAlt(_localctx, 3);
				{
				setState(915);
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
		enterRule(_localctx, 118, RULE_litFloat);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(918);
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
		public TerminalNode INTERPOLATED_STRING() { return getToken(PythonParser.INTERPOLATED_STRING, 0); }
		public LitStringContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_litString; }
	}

	public final LitStringContext litString() throws RecognitionException {
		LitStringContext _localctx = new LitStringContext(_ctx, getState());
		enterRule(_localctx, 120, RULE_litString);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(920);
			_la = _input.LA(1);
			if ( !(_la==LITERAL_STRING || _la==INTERPOLATED_STRING) ) {
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
		enterRule(_localctx, 122, RULE_enumValue);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(922);
			typeName();
			setState(923);
			match(DOT);
			setState(924);
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
		enterRule(_localctx, 124, RULE_index);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(926);
			match(OPEN_SQ_BRACKET);
			setState(927);
			expression(0);
			setState(928);
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
		int _startState = 126;
		enterRecursionRule(_localctx, 126, RULE_expression, _p);
		int _la;
		try {
			int _alt;
			enterOuterAlt(_localctx, 1);
			{
			setState(935);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,116,_ctx) ) {
			case 1:
				{
				_localctx = new NewInstanceExpressionContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;

				setState(931);
				newInstance();
				}
				break;
			case 2:
				{
				_localctx = new UnaryExpressionLabelContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;
				setState(932);
				unaryExpression();
				}
				break;
			case 3:
				{
				_localctx = new TermExpressionContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;
				setState(933);
				term(0);
				}
				break;
			case 4:
				{
				_localctx = new BinaryExpressionLabelContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;
				setState(934);
				binaryExpression();
				}
				break;
			}
			_ctx.stop = _input.LT(-1);
			setState(952);
			_errHandler.sync(this);
			_alt = getInterpreter().adaptivePredict(_input,118,_ctx);
			while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER ) {
				if ( _alt==1 ) {
					if ( _parseListeners!=null ) triggerExitRuleEvent();
					_prevctx = _localctx;
					{
					{
					_localctx = new IfExpressionContext(new ExpressionContext(_parentctx, _parentState));
					((IfExpressionContext)_localctx).trueExpr = _prevctx;
					pushNewRecursionContext(_localctx, _startState, RULE_expression);
					setState(937);
					if (!(precpred(_ctx, 1))) throw new FailedPredicateException(this, "precpred(_ctx, 1)");
					setState(938);
					match(IF);
					setState(939);
					((IfExpressionContext)_localctx).condition = expression(0);
					setState(944);
					_errHandler.sync(this);
					_la = _input.LA(1);
					while (_la==ELIF) {
						{
						{
						setState(940);
						match(ELIF);
						setState(941);
						((IfExpressionContext)_localctx).elifCondition = expression(0);
						}
						}
						setState(946);
						_errHandler.sync(this);
						_la = _input.LA(1);
					}
					setState(947);
					match(ELSE);
					setState(948);
					((IfExpressionContext)_localctx).falseExpr = expression(2);
					}
					} 
				}
				setState(954);
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,118,_ctx);
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
		int _startState = 128;
		enterRecursionRule(_localctx, 128, RULE_term, _p);
		try {
			int _alt;
			enterOuterAlt(_localctx, 1);
			{
			setState(964);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,119,_ctx) ) {
			case 1:
				{
				_localctx = new ThisInstanceTermContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;

				setState(956);
				thisInstance();
				}
				break;
			case 2:
				{
				_localctx = new BracketedExpressionTermContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;
				setState(957);
				bracketedExpression();
				}
				break;
			case 3:
				{
				_localctx = new LitValueTermContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;
				setState(958);
				litValue();
				}
				break;
			case 4:
				{
				_localctx = new ListTermContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;
				setState(959);
				list();
				}
				break;
			case 5:
				{
				_localctx = new DictionaryTermContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;
				setState(960);
				dictionary();
				}
				break;
			case 6:
				{
				_localctx = new TupleTermContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;
				setState(961);
				tuple();
				}
				break;
			case 7:
				{
				_localctx = new IdentifierUseTermContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;
				setState(962);
				identifierUse();
				}
				break;
			case 8:
				{
				_localctx = new MethodCallTermContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;
				setState(963);
				methodCall();
				}
				break;
			}
			_ctx.stop = _input.LT(-1);
			setState(973);
			_errHandler.sync(this);
			_alt = getInterpreter().adaptivePredict(_input,121,_ctx);
			while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER ) {
				if ( _alt==1 ) {
					if ( _parseListeners!=null ) triggerExitRuleEvent();
					_prevctx = _localctx;
					{
					setState(971);
					_errHandler.sync(this);
					switch ( getInterpreter().adaptivePredict(_input,120,_ctx) ) {
					case 1:
						{
						_localctx = new IndexedTermContext(new TermContext(_parentctx, _parentState));
						pushNewRecursionContext(_localctx, _startState, RULE_term);
						setState(966);
						if (!(precpred(_ctx, 2))) throw new FailedPredicateException(this, "precpred(_ctx, 2)");
						setState(967);
						index();
						}
						break;
					case 2:
						{
						_localctx = new ChainableTermContext(new TermContext(_parentctx, _parentState));
						pushNewRecursionContext(_localctx, _startState, RULE_term);
						setState(968);
						if (!(precpred(_ctx, 1))) throw new FailedPredicateException(this, "precpred(_ctx, 1)");
						setState(969);
						match(DOT);
						setState(970);
						chainable();
						}
						break;
					}
					} 
				}
				setState(975);
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,121,_ctx);
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
		enterRule(_localctx, 130, RULE_chainable);
		try {
			setState(978);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,122,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(976);
				identifierUse();
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(977);
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
		enterRule(_localctx, 132, RULE_thisInstance);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(980);
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
		enterRule(_localctx, 134, RULE_bracketedExpression);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(982);
			match(OPEN_BRACKET);
			setState(983);
			expression(0);
			setState(984);
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
		enterRule(_localctx, 136, RULE_unaryExpression);
		try {
			setState(988);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case MINUS:
				enterOuterAlt(_localctx, 1);
				{
				setState(986);
				negateNumeric();
				}
				break;
			case NOT:
				enterOuterAlt(_localctx, 2);
				{
				setState(987);
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
		enterRule(_localctx, 138, RULE_negateNumeric);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(990);
			match(MINUS);
			setState(991);
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
		enterRule(_localctx, 140, RULE_negateLogical);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(993);
			match(NOT);
			setState(994);
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
		enterRule(_localctx, 142, RULE_binaryExpression);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(996);
			((BinaryExpressionContext)_localctx).left = term(0);
			setState(997);
			binaryOperator();
			setState(998);
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
		enterRule(_localctx, 144, RULE_list);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(1000);
			match(OPEN_SQ_BRACKET);
			setState(1001);
			expressionList();
			setState(1002);
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
		enterRule(_localctx, 146, RULE_tuple);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(1004);
			match(OPEN_BRACKET);
			setState(1005);
			expressionList();
			setState(1006);
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
		enterRule(_localctx, 148, RULE_dictionary);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(1008);
			match(OPEN_BRACE);
			setState(1009);
			kvpList();
			setState(1010);
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
		enterRule(_localctx, 150, RULE_kvpList);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(1012);
			kvp();
			setState(1017);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==COMMA) {
				{
				{
				setState(1013);
				match(COMMA);
				setState(1014);
				kvp();
				}
				}
				setState(1019);
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
		enterRule(_localctx, 152, RULE_kvp);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(1020);
			((KvpContext)_localctx).key = expression(0);
			setState(1021);
			match(COLON);
			setState(1022);
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
		enterRule(_localctx, 154, RULE_methodCall);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(1024);
			methodName();
			setState(1025);
			match(OPEN_BRACKET);
			setState(1027);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if ((((_la) & ~0x3f) == 0 && ((1L << _la) & 4602678819172647424L) != 0) || ((((_la - 64)) & ~0x3f) == 0 && ((1L << (_la - 64)) & 547609400577L) != 0)) {
				{
				setState(1026);
				argList();
				}
			}

			setState(1029);
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
		public TerminalNode EQUAL() { return getToken(PythonParser.EQUAL, 0); }
		public TerminalNode NOT_EQUAL() { return getToken(PythonParser.NOT_EQUAL, 0); }
		public TerminalNode GT() { return getToken(PythonParser.GT, 0); }
		public TerminalNode LT() { return getToken(PythonParser.LT, 0); }
		public TerminalNode GE() { return getToken(PythonParser.GE, 0); }
		public TerminalNode LE() { return getToken(PythonParser.LE, 0); }
		public TerminalNode MULT() { return getToken(PythonParser.MULT, 0); }
		public TerminalNode DIVIDE() { return getToken(PythonParser.DIVIDE, 0); }
		public TerminalNode PLUS() { return getToken(PythonParser.PLUS, 0); }
		public TerminalNode MINUS() { return getToken(PythonParser.MINUS, 0); }
		public TerminalNode AND() { return getToken(PythonParser.AND, 0); }
		public TerminalNode OR() { return getToken(PythonParser.OR, 0); }
		public TerminalNode MOD() { return getToken(PythonParser.MOD, 0); }
		public TerminalNode POWER() { return getToken(PythonParser.POWER, 0); }
		public BinaryOperatorContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_binaryOperator; }
	}

	public final BinaryOperatorContext binaryOperator() throws RecognitionException {
		BinaryOperatorContext _localctx = new BinaryOperatorContext(_ctx, getState());
		enterRule(_localctx, 156, RULE_binaryOperator);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(1031);
			_la = _input.LA(1);
			if ( !(((((_la - 62)) & ~0x3f) == 0 && ((1L << (_la - 62)) & 534773947L) != 0)) ) {
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
		enterRule(_localctx, 158, RULE_newInstance);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(1033);
			type();
			setState(1034);
			match(OPEN_BRACKET);
			setState(1036);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if ((((_la) & ~0x3f) == 0 && ((1L << _la) & 4602678819172647424L) != 0) || ((((_la - 64)) & ~0x3f) == 0 && ((1L << (_la - 64)) & 547609400577L) != 0)) {
				{
				setState(1035);
				argList();
				}
			}

			setState(1038);
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
		enterRule(_localctx, 160, RULE_paramDef);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(1042);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case NAME_STARTING_LC:
				{
				setState(1040);
				identifierDef();
				}
				break;
			case THIS_INSTANCE:
				{
				setState(1041);
				match(THIS_INSTANCE);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			setState(1044);
			match(COLON);
			setState(1045);
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
		enterRule(_localctx, 162, RULE_typeGeneric);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(1047);
			typeName();
			setState(1048);
			match(OPEN_SQ_BRACKET);
			setState(1049);
			type();
			setState(1054);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==COMMA) {
				{
				{
				setState(1050);
				match(COMMA);
				setState(1051);
				type();
				}
				}
				setState(1056);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			setState(1057);
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
		enterRule(_localctx, 164, RULE_typeFunc);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(1059);
			match(FUNC_NAME);
			setState(1060);
			match(OPEN_SQ_BRACKET);
			setState(1061);
			match(OPEN_SQ_BRACKET);
			setState(1062);
			type();
			setState(1067);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==COMMA) {
				{
				{
				setState(1063);
				match(COMMA);
				setState(1064);
				type();
				}
				}
				setState(1069);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			setState(1070);
			match(CLOSE_SQ_BRACKET);
			setState(1071);
			match(COMMA);
			setState(1072);
			type();
			setState(1073);
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
		enterRule(_localctx, 166, RULE_typeTuple);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(1075);
			match(TUPLE);
			setState(1076);
			match(OPEN_SQ_BRACKET);
			setState(1077);
			type();
			setState(1080); 
			_errHandler.sync(this);
			_la = _input.LA(1);
			do {
				{
				{
				setState(1078);
				match(COMMA);
				setState(1079);
				type();
				}
				}
				setState(1082); 
				_errHandler.sync(this);
				_la = _input.LA(1);
			} while ( _la==COMMA );
			setState(1084);
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
		enterRule(_localctx, 168, RULE_lambda);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(1086);
			match(LAMBDA);
			setState(1087);
			paramList();
			setState(1088);
			match(COLON);
			setState(1089);
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
	public static class InterpolatedStringContext extends ParserRuleContext {
		public TerminalNode INTERPOLATED_STRING() { return getToken(PythonParser.INTERPOLATED_STRING, 0); }
		public InterpolatedStringContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_interpolatedString; }
	}

	public final InterpolatedStringContext interpolatedString() throws RecognitionException {
		InterpolatedStringContext _localctx = new InterpolatedStringContext(_ctx, getState());
		enterRule(_localctx, 170, RULE_interpolatedString);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(1091);
			match(INTERPOLATED_STRING);
			}
		}
		catch (RecognitionException re) {
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
		case 41:
			return assignable_sempred((AssignableContext)_localctx, predIndex);
		case 63:
			return expression_sempred((ExpressionContext)_localctx, predIndex);
		case 64:
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
		"\u0004\u0001|\u0446\u0002\u0000\u0007\u0000\u0002\u0001\u0007\u0001\u0002"+
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
		"U\u0007U\u0001\u0000\u0003\u0000\u00ae\b\u0000\u0001\u0000\u0005\u0000"+
		"\u00b1\b\u0000\n\u0000\f\u0000\u00b4\t\u0000\u0001\u0000\u0003\u0000\u00b7"+
		"\b\u0000\u0001\u0000\u0005\u0000\u00ba\b\u0000\n\u0000\f\u0000\u00bd\t"+
		"\u0000\u0001\u0000\u0001\u0000\u0001\u0001\u0001\u0001\u0001\u0001\u0001"+
		"\u0001\u0001\u0001\u0001\u0001\u0001\u0001\u0001\u0001\u0001\u0001\u0003"+
		"\u0001\u00ca\b\u0001\u0001\u0002\u0003\u0002\u00cd\b\u0002\u0001\u0002"+
		"\u0001\u0002\u0001\u0002\u0001\u0002\u0001\u0002\u0001\u0002\u0001\u0002"+
		"\u0001\u0002\u0001\u0002\u0005\u0002\u00d8\b\u0002\n\u0002\f\u0002\u00db"+
		"\t\u0002\u0001\u0002\u0001\u0002\u0003\u0002\u00df\b\u0002\u0001\u0002"+
		"\u0001\u0002\u0001\u0003\u0001\u0003\u0001\u0003\u0001\u0003\u0001\u0004"+
		"\u0003\u0004\u00e8\b\u0004\u0001\u0004\u0001\u0004\u0001\u0004\u0001\u0004"+
		"\u0003\u0004\u00ee\b\u0004\u0001\u0004\u0001\u0004\u0001\u0004\u0001\u0004"+
		"\u0001\u0004\u0003\u0004\u00f5\b\u0004\u0001\u0004\u0001\u0004\u0005\u0004"+
		"\u00f9\b\u0004\n\u0004\f\u0004\u00fc\t\u0004\u0001\u0004\u0001\u0004\u0001"+
		"\u0004\u0003\u0004\u0101\b\u0004\u0001\u0004\u0001\u0004\u0001\u0005\u0003"+
		"\u0005\u0106\b\u0005\u0001\u0005\u0001\u0005\u0001\u0005\u0001\u0005\u0001"+
		"\u0005\u0001\u0005\u0001\u0005\u0001\u0005\u0005\u0005\u0110\b\u0005\n"+
		"\u0005\f\u0005\u0113\t\u0005\u0001\u0005\u0001\u0005\u0003\u0005\u0117"+
		"\b\u0005\u0001\u0005\u0001\u0005\u0001\u0006\u0001\u0006\u0001\u0006\u0003"+
		"\u0006\u011e\b\u0006\u0001\u0007\u0003\u0007\u0121\b\u0007\u0001\u0007"+
		"\u0001\u0007\u0001\u0007\u0001\u0007\u0003\u0007\u0127\b\u0007\u0001\u0007"+
		"\u0001\u0007\u0001\u0007\u0001\u0007\u0001\u0007\u0003\u0007\u012e\b\u0007"+
		"\u0001\u0007\u0001\u0007\u0005\u0007\u0132\b\u0007\n\u0007\f\u0007\u0135"+
		"\t\u0007\u0001\u0007\u0001\u0007\u0003\u0007\u0139\b\u0007\u0001\u0007"+
		"\u0001\u0007\u0001\b\u0003\b\u013e\b\b\u0001\b\u0001\b\u0001\b\u0001\b"+
		"\u0003\b\u0144\b\b\u0001\b\u0001\b\u0001\t\u0003\t\u0149\b\t\u0001\t\u0001"+
		"\t\u0001\t\u0001\t\u0001\t\u0001\t\u0001\t\u0003\t\u0152\b\t\u0001\t\u0001"+
		"\t\u0001\t\u0001\t\u0003\t\u0158\b\t\u0001\t\u0001\t\u0001\n\u0003\n\u015d"+
		"\b\n\u0001\n\u0001\n\u0001\n\u0001\n\u0001\n\u0001\n\u0003\n\u0165\b\n"+
		"\u0001\n\u0001\n\u0003\n\u0169\b\n\u0001\n\u0001\n\u0001\n\u0005\n\u016e"+
		"\b\n\n\n\f\n\u0171\t\n\u0001\n\u0001\n\u0003\n\u0175\b\n\u0001\n\u0001"+
		"\n\u0001\u000b\u0001\u000b\u0001\u000b\u0001\u000b\u0003\u000b\u017d\b"+
		"\u000b\u0001\f\u0003\f\u0180\b\f\u0001\f\u0001\f\u0001\f\u0001\f\u0001"+
		"\f\u0003\f\u0187\b\f\u0001\f\u0001\f\u0001\f\u0001\f\u0003\f\u018d\b\f"+
		"\u0001\f\u0001\f\u0005\f\u0191\b\f\n\f\f\f\u0194\t\f\u0001\f\u0001\f\u0003"+
		"\f\u0198\b\f\u0001\f\u0001\f\u0001\r\u0001\r\u0001\r\u0001\r\u0001\r\u0001"+
		"\r\u0003\r\u01a2\b\r\u0001\u000e\u0003\u000e\u01a5\b\u000e\u0001\u000e"+
		"\u0001\u000e\u0001\u000e\u0001\u000f\u0001\u000f\u0001\u0010\u0001\u0010"+
		"\u0001\u0010\u0001\u0010\u0001\u0010\u0001\u0010\u0001\u0010\u0001\u0010"+
		"\u0001\u0010\u0003\u0010\u01b5\b\u0010\u0001\u0011\u0003\u0011\u01b8\b"+
		"\u0011\u0001\u0011\u0001\u0011\u0001\u0011\u0001\u0011\u0001\u0011\u0001"+
		"\u0011\u0001\u0012\u0003\u0012\u01c1\b\u0012\u0001\u0012\u0001\u0012\u0001"+
		"\u0012\u0001\u0012\u0001\u0012\u0001\u0012\u0001\u0013\u0003\u0013\u01ca"+
		"\b\u0013\u0001\u0013\u0001\u0013\u0001\u0013\u0001\u0013\u0003\u0013\u01d0"+
		"\b\u0013\u0001\u0013\u0001\u0013\u0001\u0013\u0005\u0013\u01d5\b\u0013"+
		"\n\u0013\f\u0013\u01d8\t\u0013\u0001\u0013\u0003\u0013\u01db\b\u0013\u0001"+
		"\u0013\u0001\u0013\u0003\u0013\u01df\b\u0013\u0001\u0013\u0001\u0013\u0001"+
		"\u0014\u0005\u0014\u01e4\b\u0014\n\u0014\f\u0014\u01e7\t\u0014\u0001\u0015"+
		"\u0003\u0015\u01ea\b\u0015\u0001\u0015\u0001\u0015\u0001\u0015\u0001\u0015"+
		"\u0003\u0015\u01f0\b\u0015\u0001\u0015\u0001\u0015\u0005\u0015\u01f4\b"+
		"\u0015\n\u0015\f\u0015\u01f7\t\u0015\u0001\u0015\u0003\u0015\u01fa\b\u0015"+
		"\u0001\u0016\u0003\u0016\u01fd\b\u0016\u0001\u0016\u0001\u0016\u0001\u0016"+
		"\u0003\u0016\u0202\b\u0016\u0001\u0016\u0001\u0016\u0005\u0016\u0206\b"+
		"\u0016\n\u0016\f\u0016\u0209\t\u0016\u0001\u0016\u0003\u0016\u020c\b\u0016"+
		"\u0001\u0017\u0003\u0017\u020f\b\u0017\u0001\u0017\u0001\u0017\u0001\u0017"+
		"\u0001\u0017\u0003\u0017\u0215\b\u0017\u0001\u0017\u0001\u0017\u0005\u0017"+
		"\u0219\b\u0017\n\u0017\f\u0017\u021c\t\u0017\u0001\u0017\u0001\u0017\u0001"+
		"\u0017\u0001\u0017\u0001\u0018\u0003\u0018\u0223\b\u0018\u0001\u0018\u0001"+
		"\u0018\u0001\u0018\u0001\u0018\u0001\u0018\u0001\u0018\u0003\u0018\u022b"+
		"\b\u0018\u0001\u0018\u0001\u0018\u0005\u0018\u022f\b\u0018\n\u0018\f\u0018"+
		"\u0232\t\u0018\u0001\u0018\u0001\u0018\u0001\u0018\u0001\u0018\u0001\u0019"+
		"\u0003\u0019\u0239\b\u0019\u0001\u0019\u0001\u0019\u0003\u0019\u023d\b"+
		"\u0019\u0001\u0019\u0001\u0019\u0001\u001a\u0003\u001a\u0242\b\u001a\u0001"+
		"\u001a\u0001\u001a\u0001\u001a\u0003\u001a\u0247\b\u001a\u0001\u001a\u0001"+
		"\u001a\u0001\u001a\u0004\u001a\u024c\b\u001a\u000b\u001a\f\u001a\u024d"+
		"\u0001\u001a\u0001\u001a\u0003\u001a\u0252\b\u001a\u0001\u001a\u0001\u001a"+
		"\u0001\u001b\u0005\u001b\u0257\b\u001b\n\u001b\f\u001b\u025a\t\u001b\u0001"+
		"\u001c\u0003\u001c\u025d\b\u001c\u0001\u001c\u0001\u001c\u0001\u001c\u0001"+
		"\u001c\u0001\u001c\u0001\u001c\u0003\u001c\u0265\b\u001c\u0001\u001c\u0001"+
		"\u001c\u0005\u001c\u0269\b\u001c\n\u001c\f\u001c\u026c\t\u001c\u0001\u001c"+
		"\u0003\u001c\u026f\b\u001c\u0001\u001d\u0003\u001d\u0272\b\u001d\u0001"+
		"\u001d\u0001\u001d\u0001\u001d\u0001\u001d\u0001\u001d\u0001\u001d\u0003"+
		"\u001d\u027a\b\u001d\u0001\u001d\u0001\u001d\u0001\u001e\u0001\u001e\u0003"+
		"\u001e\u0280\b\u001e\u0001\u001f\u0003\u001f\u0283\b\u001f\u0001\u001f"+
		"\u0001\u001f\u0001\u001f\u0001\u001f\u0001\u001f\u0001\u001f\u0001\u001f"+
		"\u0001\u001f\u0001\u001f\u0003\u001f\u028e\b\u001f\u0001\u001f\u0001\u001f"+
		"\u0001 \u0001 \u0001 \u0003 \u0295\b \u0001 \u0001 \u0001!\u0003!\u029a"+
		"\b!\u0001!\u0001!\u0001!\u0001!\u0003!\u02a0\b!\u0001!\u0001!\u0001!\u0001"+
		"!\u0001!\u0003!\u02a7\b!\u0001!\u0001!\u0001!\u0005!\u02ac\b!\n!\f!\u02af"+
		"\t!\u0001!\u0001!\u0001!\u0001\"\u0003\"\u02b5\b\"\u0001\"\u0001\"\u0001"+
		"\"\u0001\"\u0003\"\u02bb\b\"\u0001\"\u0001\"\u0001#\u0003#\u02c0\b#\u0001"+
		"#\u0001#\u0001#\u0001#\u0003#\u02c6\b#\u0001#\u0001#\u0001#\u0001#\u0001"+
		"#\u0003#\u02cd\b#\u0001#\u0001#\u0005#\u02d1\b#\n#\f#\u02d4\t#\u0001#"+
		"\u0001#\u0001#\u0003#\u02d9\b#\u0001#\u0001#\u0001$\u0003$\u02de\b$\u0001"+
		"$\u0001$\u0001$\u0001$\u0003$\u02e4\b$\u0001$\u0001$\u0001$\u0001$\u0001"+
		"$\u0003$\u02eb\b$\u0001$\u0001$\u0005$\u02ef\b$\n$\f$\u02f2\t$\u0001$"+
		"\u0001$\u0003$\u02f6\b$\u0001$\u0001$\u0001%\u0003%\u02fb\b%\u0001%\u0001"+
		"%\u0001%\u0001%\u0001%\u0001%\u0003%\u0303\b%\u0001%\u0001%\u0001%\u0001"+
		"%\u0001%\u0001%\u0001%\u0003%\u030c\b%\u0001%\u0001%\u0001&\u0003&\u0311"+
		"\b&\u0001&\u0001&\u0001&\u0001&\u0001&\u0001&\u0003&\u0319\b&\u0001&\u0001"+
		"&\u0001&\u0001&\u0001&\u0001&\u0001&\u0003&\u0322\b&\u0001&\u0001&\u0001"+
		"\'\u0001\'\u0001(\u0001(\u0001)\u0001)\u0001)\u0001)\u0001)\u0003)\u032f"+
		"\b)\u0001)\u0001)\u0005)\u0333\b)\n)\f)\u0336\t)\u0001*\u0001*\u0001+"+
		"\u0001+\u0001,\u0001,\u0001,\u0001,\u0001,\u0001,\u0003,\u0342\b,\u0001"+
		"-\u0001-\u0001-\u0001-\u0003-\u0348\b-\u0001.\u0001.\u0001.\u0005.\u034d"+
		"\b.\n.\f.\u0350\t.\u0001/\u0001/\u0003/\u0354\b/\u00010\u00010\u00010"+
		"\u00050\u0359\b0\n0\f0\u035c\t0\u00011\u00011\u00011\u00041\u0361\b1\u000b"+
		"1\f1\u0362\u00012\u00012\u00012\u00052\u0368\b2\n2\f2\u036b\t2\u00013"+
		"\u00013\u00013\u00013\u00014\u00014\u00014\u00054\u0374\b4\n4\f4\u0377"+
		"\t4\u00015\u00015\u00015\u00015\u00035\u037d\b5\u00016\u00016\u00017\u0001"+
		"7\u00017\u00017\u00017\u00037\u0386\b7\u00018\u00018\u00018\u00018\u0001"+
		"8\u00018\u00038\u038e\b8\u00019\u00019\u0001:\u0001:\u0001:\u0003:\u0395"+
		"\b:\u0001;\u0001;\u0001<\u0001<\u0001=\u0001=\u0001=\u0001=\u0001>\u0001"+
		">\u0001>\u0001>\u0001?\u0001?\u0001?\u0001?\u0001?\u0003?\u03a8\b?\u0001"+
		"?\u0001?\u0001?\u0001?\u0001?\u0005?\u03af\b?\n?\f?\u03b2\t?\u0001?\u0001"+
		"?\u0001?\u0005?\u03b7\b?\n?\f?\u03ba\t?\u0001@\u0001@\u0001@\u0001@\u0001"+
		"@\u0001@\u0001@\u0001@\u0001@\u0003@\u03c5\b@\u0001@\u0001@\u0001@\u0001"+
		"@\u0001@\u0005@\u03cc\b@\n@\f@\u03cf\t@\u0001A\u0001A\u0003A\u03d3\bA"+
		"\u0001B\u0001B\u0001C\u0001C\u0001C\u0001C\u0001D\u0001D\u0003D\u03dd"+
		"\bD\u0001E\u0001E\u0001E\u0001F\u0001F\u0001F\u0001G\u0001G\u0001G\u0001"+
		"G\u0001H\u0001H\u0001H\u0001H\u0001I\u0001I\u0001I\u0001I\u0001J\u0001"+
		"J\u0001J\u0001J\u0001K\u0001K\u0001K\u0005K\u03f8\bK\nK\fK\u03fb\tK\u0001"+
		"L\u0001L\u0001L\u0001L\u0001M\u0001M\u0001M\u0003M\u0404\bM\u0001M\u0001"+
		"M\u0001N\u0001N\u0001O\u0001O\u0001O\u0003O\u040d\bO\u0001O\u0001O\u0001"+
		"P\u0001P\u0003P\u0413\bP\u0001P\u0001P\u0001P\u0001Q\u0001Q\u0001Q\u0001"+
		"Q\u0001Q\u0005Q\u041d\bQ\nQ\fQ\u0420\tQ\u0001Q\u0001Q\u0001R\u0001R\u0001"+
		"R\u0001R\u0001R\u0001R\u0005R\u042a\bR\nR\fR\u042d\tR\u0001R\u0001R\u0001"+
		"R\u0001R\u0001R\u0001S\u0001S\u0001S\u0001S\u0001S\u0004S\u0439\bS\u000b"+
		"S\fS\u043a\u0001S\u0001S\u0001T\u0001T\u0001T\u0001T\u0001T\u0001U\u0001"+
		"U\u0001U\u0000\u0003R~\u0080V\u0000\u0002\u0004\u0006\b\n\f\u000e\u0010"+
		"\u0012\u0014\u0016\u0018\u001a\u001c\u001e \"$&(*,.02468:<>@BDFHJLNPR"+
		"TVXZ\\^`bdfhjlnprtvxz|~\u0080\u0082\u0084\u0086\u0088\u008a\u008c\u008e"+
		"\u0090\u0092\u0094\u0096\u0098\u009a\u009c\u009e\u00a0\u00a2\u00a4\u00a6"+
		"\u00a8\u00aa\u0000\u0003\u0001\u0000<=\u0001\u0000ef\u0004\u0000>?ACE"+
		"ESZ\u049f\u0000\u00ad\u0001\u0000\u0000\u0000\u0002\u00c9\u0001\u0000"+
		"\u0000\u0000\u0004\u00cc\u0001\u0000\u0000\u0000\u0006\u00e2\u0001\u0000"+
		"\u0000\u0000\b\u00e7\u0001\u0000\u0000\u0000\n\u0105\u0001\u0000\u0000"+
		"\u0000\f\u011d\u0001\u0000\u0000\u0000\u000e\u0120\u0001\u0000\u0000\u0000"+
		"\u0010\u013d\u0001\u0000\u0000\u0000\u0012\u0148\u0001\u0000\u0000\u0000"+
		"\u0014\u015c\u0001\u0000\u0000\u0000\u0016\u017c\u0001\u0000\u0000\u0000"+
		"\u0018\u017f\u0001\u0000\u0000\u0000\u001a\u01a1\u0001\u0000\u0000\u0000"+
		"\u001c\u01a4\u0001\u0000\u0000\u0000\u001e\u01a9\u0001\u0000\u0000\u0000"+
		" \u01b4\u0001\u0000\u0000\u0000\"\u01b7\u0001\u0000\u0000\u0000$\u01c0"+
		"\u0001\u0000\u0000\u0000&\u01c9\u0001\u0000\u0000\u0000(\u01e5\u0001\u0000"+
		"\u0000\u0000*\u01e9\u0001\u0000\u0000\u0000,\u01fc\u0001\u0000\u0000\u0000"+
		".\u020e\u0001\u0000\u0000\u00000\u0222\u0001\u0000\u0000\u00002\u0238"+
		"\u0001\u0000\u0000\u00004\u0241\u0001\u0000\u0000\u00006\u0258\u0001\u0000"+
		"\u0000\u00008\u025c\u0001\u0000\u0000\u0000:\u0271\u0001\u0000\u0000\u0000"+
		"<\u027f\u0001\u0000\u0000\u0000>\u0282\u0001\u0000\u0000\u0000@\u0291"+
		"\u0001\u0000\u0000\u0000B\u0299\u0001\u0000\u0000\u0000D\u02b4\u0001\u0000"+
		"\u0000\u0000F\u02bf\u0001\u0000\u0000\u0000H\u02dd\u0001\u0000\u0000\u0000"+
		"J\u02fa\u0001\u0000\u0000\u0000L\u0310\u0001\u0000\u0000\u0000N\u0325"+
		"\u0001\u0000\u0000\u0000P\u0327\u0001\u0000\u0000\u0000R\u032e\u0001\u0000"+
		"\u0000\u0000T\u0337\u0001\u0000\u0000\u0000V\u0339\u0001\u0000\u0000\u0000"+
		"X\u0341\u0001\u0000\u0000\u0000Z\u0347\u0001\u0000\u0000\u0000\\\u0349"+
		"\u0001\u0000\u0000\u0000^\u0353\u0001\u0000\u0000\u0000`\u0355\u0001\u0000"+
		"\u0000\u0000b\u035d\u0001\u0000\u0000\u0000d\u0364\u0001\u0000\u0000\u0000"+
		"f\u036c\u0001\u0000\u0000\u0000h\u0370\u0001\u0000\u0000\u0000j\u037c"+
		"\u0001\u0000\u0000\u0000l\u037e\u0001\u0000\u0000\u0000n\u0385\u0001\u0000"+
		"\u0000\u0000p\u038d\u0001\u0000\u0000\u0000r\u038f\u0001\u0000\u0000\u0000"+
		"t\u0394\u0001\u0000\u0000\u0000v\u0396\u0001\u0000\u0000\u0000x\u0398"+
		"\u0001\u0000\u0000\u0000z\u039a\u0001\u0000\u0000\u0000|\u039e\u0001\u0000"+
		"\u0000\u0000~\u03a7\u0001\u0000\u0000\u0000\u0080\u03c4\u0001\u0000\u0000"+
		"\u0000\u0082\u03d2\u0001\u0000\u0000\u0000\u0084\u03d4\u0001\u0000\u0000"+
		"\u0000\u0086\u03d6\u0001\u0000\u0000\u0000\u0088\u03dc\u0001\u0000\u0000"+
		"\u0000\u008a\u03de\u0001\u0000\u0000\u0000\u008c\u03e1\u0001\u0000\u0000"+
		"\u0000\u008e\u03e4\u0001\u0000\u0000\u0000\u0090\u03e8\u0001\u0000\u0000"+
		"\u0000\u0092\u03ec\u0001\u0000\u0000\u0000\u0094\u03f0\u0001\u0000\u0000"+
		"\u0000\u0096\u03f4\u0001\u0000\u0000\u0000\u0098\u03fc\u0001\u0000\u0000"+
		"\u0000\u009a\u0400\u0001\u0000\u0000\u0000\u009c\u0407\u0001\u0000\u0000"+
		"\u0000\u009e\u0409\u0001\u0000\u0000\u0000\u00a0\u0412\u0001\u0000\u0000"+
		"\u0000\u00a2\u0417\u0001\u0000\u0000\u0000\u00a4\u0423\u0001\u0000\u0000"+
		"\u0000\u00a6\u0433\u0001\u0000\u0000\u0000\u00a8\u043e\u0001\u0000\u0000"+
		"\u0000\u00aa\u0443\u0001\u0000\u0000\u0000\u00ac\u00ae\u0003\u001c\u000e"+
		"\u0000\u00ad\u00ac\u0001\u0000\u0000\u0000\u00ad\u00ae\u0001\u0000\u0000"+
		"\u0000\u00ae\u00b2\u0001\u0000\u0000\u0000\u00af\u00b1\u0003\u0002\u0001"+
		"\u0000\u00b0\u00af\u0001\u0000\u0000\u0000\u00b1\u00b4\u0001\u0000\u0000"+
		"\u0000\u00b2\u00b0\u0001\u0000\u0000\u0000\u00b2\u00b3\u0001\u0000\u0000"+
		"\u0000\u00b3\u00b6\u0001\u0000\u0000\u0000\u00b4\u00b2\u0001\u0000\u0000"+
		"\u0000\u00b5\u00b7\u0003\u0006\u0003\u0000\u00b6\u00b5\u0001\u0000\u0000"+
		"\u0000\u00b6\u00b7\u0001\u0000\u0000\u0000\u00b7\u00bb\u0001\u0000\u0000"+
		"\u0000\u00b8\u00ba\u0005]\u0000\u0000\u00b9\u00b8\u0001\u0000\u0000\u0000"+
		"\u00ba\u00bd\u0001\u0000\u0000\u0000\u00bb\u00b9\u0001\u0000\u0000\u0000"+
		"\u00bb\u00bc\u0001\u0000\u0000\u0000\u00bc\u00be\u0001\u0000\u0000\u0000"+
		"\u00bd\u00bb\u0001\u0000\u0000\u0000\u00be\u00bf\u0005\u0000\u0000\u0001"+
		"\u00bf\u0001\u0001\u0000\u0000\u0000\u00c0\u00ca\u0003\u0004\u0002\u0000"+
		"\u00c1\u00ca\u0003\b\u0004\u0000\u00c2\u00ca\u0003\n\u0005\u0000\u00c3"+
		"\u00ca\u0003\u000e\u0007\u0000\u00c4\u00ca\u0003\u0010\b\u0000\u00c5\u00ca"+
		"\u0003\u0012\t\u0000\u00c6\u00ca\u0003\u0014\n\u0000\u00c7\u00ca\u0003"+
		"\u0018\f\u0000\u00c8\u00ca\u0003\u001c\u000e\u0000\u00c9\u00c0\u0001\u0000"+
		"\u0000\u0000\u00c9\u00c1\u0001\u0000\u0000\u0000\u00c9\u00c2\u0001\u0000"+
		"\u0000\u0000\u00c9\u00c3\u0001\u0000\u0000\u0000\u00c9\u00c4\u0001\u0000"+
		"\u0000\u0000\u00c9\u00c5\u0001\u0000\u0000\u0000\u00c9\u00c6\u0001\u0000"+
		"\u0000\u0000\u00c9\u00c7\u0001\u0000\u0000\u0000\u00c9\u00c8\u0001\u0000"+
		"\u0000\u0000\u00ca\u0003\u0001\u0000\u0000\u0000\u00cb\u00cd\u0005j\u0000"+
		"\u0000\u00cc\u00cb\u0001\u0000\u0000\u0000\u00cc\u00cd\u0001\u0000\u0000"+
		"\u0000\u00cd\u00ce\u0001\u0000\u0000\u0000\u00ce\u00cf\u0005-\u0000\u0000"+
		"\u00cf\u00d0\u0005\n\u0000\u0000\u00d0\u00d1\u0005N\u0000\u0000\u00d1"+
		"\u00d2\u0005O\u0000\u0000\u00d2\u00d3\u0005D\u0000\u0000\u00d3\u00d4\u0005"+
		"0\u0000\u0000\u00d4\u00d5\u0005R\u0000\u0000\u00d5\u00d9\u0005]\u0000"+
		"\u0000\u00d6\u00d8\u0003 \u0010\u0000\u00d7\u00d6\u0001\u0000\u0000\u0000"+
		"\u00d8\u00db\u0001\u0000\u0000\u0000\u00d9\u00d7\u0001\u0000\u0000\u0000"+
		"\u00d9\u00da\u0001\u0000\u0000\u0000\u00da\u00dc\u0001\u0000\u0000\u0000"+
		"\u00db\u00d9\u0001\u0000\u0000\u0000\u00dc\u00de\u0005l\u0000\u0000\u00dd"+
		"\u00df\u0005k\u0000\u0000\u00de\u00dd\u0001\u0000\u0000\u0000\u00de\u00df"+
		"\u0001\u0000\u0000\u0000\u00df\u00e0\u0001\u0000\u0000\u0000\u00e0\u00e1"+
		"\u0005]\u0000\u0000\u00e1\u0005\u0001\u0000\u0000\u0000\u00e2\u00e3\u0005"+
		"\n\u0000\u0000\u00e3\u00e4\u0005N\u0000\u0000\u00e4\u00e5\u0005O\u0000"+
		"\u0000\u00e5\u0007\u0001\u0000\u0000\u0000\u00e6\u00e8\u0005j\u0000\u0000"+
		"\u00e7\u00e6\u0001\u0000\u0000\u0000\u00e7\u00e8\u0001\u0000\u0000\u0000"+
		"\u00e8\u00e9\u0001\u0000\u0000\u0000\u00e9\u00ea\u0005-\u0000\u0000\u00ea"+
		"\u00eb\u0003T*\u0000\u00eb\u00ed\u0005N\u0000\u0000\u00ec\u00ee\u0003"+
		"`0\u0000\u00ed\u00ec\u0001\u0000\u0000\u0000\u00ed\u00ee\u0001\u0000\u0000"+
		"\u0000\u00ee\u00ef\u0001\u0000\u0000\u0000\u00ef\u00f0\u0005O\u0000\u0000"+
		"\u00f0\u00f1\u0005D\u0000\u0000\u00f1\u00f2\u0003j5\u0000\u00f2\u00f4"+
		"\u0005R\u0000\u0000\u00f3\u00f5\u0003\u001e\u000f\u0000\u00f4\u00f3\u0001"+
		"\u0000\u0000\u0000\u00f4\u00f5\u0001\u0000\u0000\u0000\u00f5\u00f6\u0001"+
		"\u0000\u0000\u0000\u00f6\u00fa\u0005]\u0000\u0000\u00f7\u00f9\u0003 \u0010"+
		"\u0000\u00f8\u00f7\u0001\u0000\u0000\u0000\u00f9\u00fc\u0001\u0000\u0000"+
		"\u0000\u00fa\u00f8\u0001\u0000\u0000\u0000\u00fa\u00fb\u0001\u0000\u0000"+
		"\u0000\u00fb\u00fd\u0001\u0000\u0000\u0000\u00fc\u00fa\u0001\u0000\u0000"+
		"\u0000\u00fd\u00fe\u0003@ \u0000\u00fe\u0100\u0005m\u0000\u0000\u00ff"+
		"\u0101\u0005k\u0000\u0000\u0100\u00ff\u0001\u0000\u0000\u0000\u0100\u0101"+
		"\u0001\u0000\u0000\u0000\u0101\u0102\u0001\u0000\u0000\u0000\u0102\u0103"+
		"\u0005]\u0000\u0000\u0103\t\u0001\u0000\u0000\u0000\u0104\u0106\u0005"+
		"j\u0000\u0000\u0105\u0104\u0001\u0000\u0000\u0000\u0105\u0106\u0001\u0000"+
		"\u0000\u0000\u0106\u0107\u0001\u0000\u0000\u0000\u0107\u0108\u0005\u0001"+
		"\u0000\u0000\u0108\u0109\u0003V+\u0000\u0109\u010a\u0005N\u0000\u0000"+
		"\u010a\u010b\u00054\u0000\u0000\u010b\u010c\u0005O\u0000\u0000\u010c\u010d"+
		"\u0005|\u0000\u0000\u010d\u0111\u0005]\u0000\u0000\u010e\u0110\u0003\f"+
		"\u0006\u0000\u010f\u010e\u0001\u0000\u0000\u0000\u0110\u0113\u0001\u0000"+
		"\u0000\u0000\u0111\u010f\u0001\u0000\u0000\u0000\u0111\u0112\u0001\u0000"+
		"\u0000\u0000\u0112\u0114\u0001\u0000\u0000\u0000\u0113\u0111\u0001\u0000"+
		"\u0000\u0000\u0114\u0116\u0005n\u0000\u0000\u0115\u0117\u0005k\u0000\u0000"+
		"\u0116\u0115\u0001\u0000\u0000\u0000\u0116\u0117\u0001\u0000\u0000\u0000"+
		"\u0117\u0118\u0001\u0000\u0000\u0000\u0118\u0119\u0005]\u0000\u0000\u0119"+
		"\u000b\u0001\u0000\u0000\u0000\u011a\u011e\u0003>\u001f\u0000\u011b\u011e"+
		"\u0003\"\u0011\u0000\u011c\u011e\u0003\u001c\u000e\u0000\u011d\u011a\u0001"+
		"\u0000\u0000\u0000\u011d\u011b\u0001\u0000\u0000\u0000\u011d\u011c\u0001"+
		"\u0000\u0000\u0000\u011e\r\u0001\u0000\u0000\u0000\u011f\u0121\u0005j"+
		"\u0000\u0000\u0120\u011f\u0001\u0000\u0000\u0000\u0120\u0121\u0001\u0000"+
		"\u0000\u0000\u0121\u0122\u0001\u0000\u0000\u0000\u0122\u0123\u0005-\u0000"+
		"\u0000\u0123\u0124\u0003T*\u0000\u0124\u0126\u0005N\u0000\u0000\u0125"+
		"\u0127\u0003`0\u0000\u0126\u0125\u0001\u0000\u0000\u0000\u0126\u0127\u0001"+
		"\u0000\u0000\u0000\u0127\u0128\u0001\u0000\u0000\u0000\u0128\u0129\u0005"+
		"O\u0000\u0000\u0129\u012a\u0005D\u0000\u0000\u012a\u012b\u00050\u0000"+
		"\u0000\u012b\u012d\u0005R\u0000\u0000\u012c\u012e\u0003\u001e\u000f\u0000"+
		"\u012d\u012c\u0001\u0000\u0000\u0000\u012d\u012e\u0001\u0000\u0000\u0000"+
		"\u012e\u012f\u0001\u0000\u0000\u0000\u012f\u0133\u0005]\u0000\u0000\u0130"+
		"\u0132\u0003 \u0010\u0000\u0131\u0130\u0001\u0000\u0000\u0000\u0132\u0135"+
		"\u0001\u0000\u0000\u0000\u0133\u0131\u0001\u0000\u0000\u0000\u0133\u0134"+
		"\u0001\u0000\u0000\u0000\u0134\u0136\u0001\u0000\u0000\u0000\u0135\u0133"+
		"\u0001\u0000\u0000\u0000\u0136\u0138\u0005o\u0000\u0000\u0137\u0139\u0005"+
		"k\u0000\u0000\u0138\u0137\u0001\u0000\u0000\u0000\u0138\u0139\u0001\u0000"+
		"\u0000\u0000\u0139\u013a\u0001\u0000\u0000\u0000\u013a\u013b\u0005]\u0000"+
		"\u0000\u013b\u000f\u0001\u0000\u0000\u0000\u013c\u013e\u0005i\u0000\u0000"+
		"\u013d\u013c\u0001\u0000\u0000\u0000\u013d\u013e\u0001\u0000\u0000\u0000"+
		"\u013e\u013f\u0001\u0000\u0000\u0000\u013f\u0140\u0003N\'\u0000\u0140"+
		"\u0141\u0005I\u0000\u0000\u0141\u0143\u0003Z-\u0000\u0142\u0144\u0003"+
		"\u001e\u000f\u0000\u0143\u0142\u0001\u0000\u0000\u0000\u0143\u0144\u0001"+
		"\u0000\u0000\u0000\u0144\u0145\u0001\u0000\u0000\u0000\u0145\u0146\u0005"+
		"]\u0000\u0000\u0146\u0011\u0001\u0000\u0000\u0000\u0147\u0149\u0005j\u0000"+
		"\u0000\u0148\u0147\u0001\u0000\u0000\u0000\u0148\u0149\u0001\u0000\u0000"+
		"\u0000\u0149\u014a\u0001\u0000\u0000\u0000\u014a\u014b\u0005\u0001\u0000"+
		"\u0000\u014b\u014c\u0003X,\u0000\u014c\u014d\u0005N\u0000\u0000\u014d"+
		"\u014e\u0005\u0004\u0000\u0000\u014e\u014f\u0005O\u0000\u0000\u014f\u0151"+
		"\u0005R\u0000\u0000\u0150\u0152\u0003\u001e\u000f\u0000\u0151\u0150\u0001"+
		"\u0000\u0000\u0000\u0151\u0152\u0001\u0000\u0000\u0000\u0152\u0153\u0001"+
		"\u0000\u0000\u0000\u0153\u0154\u0005]\u0000\u0000\u0154\u0155\u0003b1"+
		"\u0000\u0155\u0157\u0005p\u0000\u0000\u0156\u0158\u0005k\u0000\u0000\u0157"+
		"\u0156\u0001\u0000\u0000\u0000\u0157\u0158\u0001\u0000\u0000\u0000\u0158"+
		"\u0159\u0001\u0000\u0000\u0000\u0159\u015a\u0005]\u0000\u0000\u015a\u0013"+
		"\u0001\u0000\u0000\u0000\u015b\u015d\u0005j\u0000\u0000\u015c\u015b\u0001"+
		"\u0000\u0000\u0000\u015c\u015d\u0001\u0000\u0000\u0000\u015d\u015e\u0001"+
		"\u0000\u0000\u0000\u015e\u015f\u0005\u0001\u0000\u0000\u015f\u0164\u0003"+
		"X,\u0000\u0160\u0161\u0005N\u0000\u0000\u0161\u0162\u0003X,\u0000\u0162"+
		"\u0163\u0005O\u0000\u0000\u0163\u0165\u0001\u0000\u0000\u0000\u0164\u0160"+
		"\u0001\u0000\u0000\u0000\u0164\u0165\u0001\u0000\u0000\u0000\u0165\u0166"+
		"\u0001\u0000\u0000\u0000\u0166\u0168\u0005R\u0000\u0000\u0167\u0169\u0003"+
		"\u001e\u000f\u0000\u0168\u0167\u0001\u0000\u0000\u0000\u0168\u0169\u0001"+
		"\u0000\u0000\u0000\u0169\u016a\u0001\u0000\u0000\u0000\u016a\u016b\u0005"+
		"]\u0000\u0000\u016b\u016f\u0003B!\u0000\u016c\u016e\u0003\u0016\u000b"+
		"\u0000\u016d\u016c\u0001\u0000\u0000\u0000\u016e\u0171\u0001\u0000\u0000"+
		"\u0000\u016f\u016d\u0001\u0000\u0000\u0000\u016f\u0170\u0001\u0000\u0000"+
		"\u0000\u0170\u0172\u0001\u0000\u0000\u0000\u0171\u016f\u0001\u0000\u0000"+
		"\u0000\u0172\u0174\u0005q\u0000\u0000\u0173\u0175\u0005k\u0000\u0000\u0174"+
		"\u0173\u0001\u0000\u0000\u0000\u0174\u0175\u0001\u0000\u0000\u0000\u0175"+
		"\u0176\u0001\u0000\u0000\u0000\u0176\u0177\u0005]\u0000\u0000\u0177\u0015"+
		"\u0001\u0000\u0000\u0000\u0178\u017d\u0003D\"\u0000\u0179\u017d\u0003"+
		"F#\u0000\u017a\u017d\u0003H$\u0000\u017b\u017d\u0003\u001c\u000e\u0000"+
		"\u017c\u0178\u0001\u0000\u0000\u0000\u017c\u0179\u0001\u0000\u0000\u0000"+
		"\u017c\u017a\u0001\u0000\u0000\u0000\u017c\u017b\u0001\u0000\u0000\u0000"+
		"\u017d\u0017\u0001\u0000\u0000\u0000\u017e\u0180\u0005j\u0000\u0000\u017f"+
		"\u017e\u0001\u0000\u0000\u0000\u017f\u0180\u0001\u0000\u0000\u0000\u0180"+
		"\u0181\u0001\u0000\u0000\u0000\u0181\u0182\u0005\u0001\u0000\u0000\u0182"+
		"\u0183\u0003X,\u0000\u0183\u0186\u0005N\u0000\u0000\u0184\u0187\u0003"+
		"X,\u0000\u0185\u0187\u00053\u0000\u0000\u0186\u0184\u0001\u0000\u0000"+
		"\u0000\u0186\u0185\u0001\u0000\u0000\u0000\u0187\u0188\u0001\u0000\u0000"+
		"\u0000\u0188\u0189\u0005O\u0000\u0000\u0189\u018a\u0001\u0000\u0000\u0000"+
		"\u018a\u018c\u0005R\u0000\u0000\u018b\u018d\u0003\u001e\u000f\u0000\u018c"+
		"\u018b\u0001\u0000\u0000\u0000\u018c\u018d\u0001\u0000\u0000\u0000\u018d"+
		"\u018e\u0001\u0000\u0000\u0000\u018e\u0192\u0005]\u0000\u0000\u018f\u0191"+
		"\u0003\u001a\r\u0000\u0190\u018f\u0001\u0000\u0000\u0000\u0191\u0194\u0001"+
		"\u0000\u0000\u0000\u0192\u0190\u0001\u0000\u0000\u0000\u0192\u0193\u0001"+
		"\u0000\u0000\u0000\u0193\u0195\u0001\u0000\u0000\u0000\u0194\u0192\u0001"+
		"\u0000\u0000\u0000\u0195\u0197\u0005q\u0000\u0000\u0196\u0198\u0005k\u0000"+
		"\u0000\u0197\u0196\u0001\u0000\u0000\u0000\u0197\u0198\u0001\u0000\u0000"+
		"\u0000\u0198\u0199\u0001\u0000\u0000\u0000\u0199\u019a\u0005]\u0000\u0000"+
		"\u019a\u0019\u0001\u0000\u0000\u0000\u019b\u01a2\u0003D\"\u0000\u019c"+
		"\u01a2\u0003F#\u0000\u019d\u01a2\u0003H$\u0000\u019e\u01a2\u0003J%\u0000"+
		"\u019f\u01a2\u0003L&\u0000\u01a0\u01a2\u0003\u001c\u000e\u0000\u01a1\u019b"+
		"\u0001\u0000\u0000\u0000\u01a1\u019c\u0001\u0000\u0000\u0000\u01a1\u019d"+
		"\u0001\u0000\u0000\u0000\u01a1\u019e\u0001\u0000\u0000\u0000\u01a1\u019f"+
		"\u0001\u0000\u0000\u0000\u01a1\u01a0\u0001\u0000\u0000\u0000\u01a2\u001b"+
		"\u0001\u0000\u0000\u0000\u01a3\u01a5\u0005i\u0000\u0000\u01a4\u01a3\u0001"+
		"\u0000\u0000\u0000\u01a4\u01a5\u0001\u0000\u0000\u0000\u01a5\u01a6\u0001"+
		"\u0000\u0000\u0000\u01a6\u01a7\u0003\u001e\u000f\u0000\u01a7\u01a8\u0005"+
		"]\u0000\u0000\u01a8\u001d\u0001\u0000\u0000\u0000\u01a9\u01aa\u0005|\u0000"+
		"\u0000\u01aa\u001f\u0001\u0000\u0000\u0000\u01ab\u01b5\u0003\"\u0011\u0000"+
		"\u01ac\u01b5\u0003$\u0012\u0000\u01ad\u01b5\u0003&\u0013\u0000\u01ae\u01b5"+
		"\u0003.\u0017\u0000\u01af\u01b5\u00030\u0018\u0000\u01b0\u01b5\u00032"+
		"\u0019\u0000\u01b1\u01b5\u00034\u001a\u0000\u01b2\u01b5\u0003:\u001d\u0000"+
		"\u01b3\u01b5\u0003\u001c\u000e\u0000\u01b4\u01ab\u0001\u0000\u0000\u0000"+
		"\u01b4\u01ac\u0001\u0000\u0000\u0000\u01b4\u01ad\u0001\u0000\u0000\u0000"+
		"\u01b4\u01ae\u0001\u0000\u0000\u0000\u01b4\u01af\u0001\u0000\u0000\u0000"+
		"\u01b4\u01b0\u0001\u0000\u0000\u0000\u01b4\u01b1\u0001\u0000\u0000\u0000"+
		"\u01b4\u01b2\u0001\u0000\u0000\u0000\u01b4\u01b3\u0001\u0000\u0000\u0000"+
		"\u01b5!\u0001\u0000\u0000\u0000\u01b6\u01b8\u0005i\u0000\u0000\u01b7\u01b6"+
		"\u0001\u0000\u0000\u0000\u01b7\u01b8\u0001\u0000\u0000\u0000\u01b8\u01b9"+
		"\u0001\u0000\u0000\u0000\u01b9\u01ba\u0003N\'\u0000\u01ba\u01bb\u0005"+
		"I\u0000\u0000\u01bb\u01bc\u0003~?\u0000\u01bc\u01bd\u0005z\u0000\u0000"+
		"\u01bd\u01be\u0005]\u0000\u0000\u01be#\u0001\u0000\u0000\u0000\u01bf\u01c1"+
		"\u0005i\u0000\u0000\u01c0\u01bf\u0001\u0000\u0000\u0000\u01c0\u01c1\u0001"+
		"\u0000\u0000\u0000\u01c1\u01c2\u0001\u0000\u0000\u0000\u01c2\u01c3\u0003"+
		"R)\u0000\u01c3\u01c4\u0005I\u0000\u0000\u01c4\u01c5\u0003~?\u0000\u01c5"+
		"\u01c6\u0005y\u0000\u0000\u01c6\u01c7\u0005]\u0000\u0000\u01c7%\u0001"+
		"\u0000\u0000\u0000\u01c8\u01ca\u0005j\u0000\u0000\u01c9\u01c8\u0001\u0000"+
		"\u0000\u0000\u01c9\u01ca\u0001\u0000\u0000\u0000\u01ca\u01cb\u0001\u0000"+
		"\u0000\u0000\u01cb\u01cc\u0005\u0006\u0000\u0000\u01cc\u01cd\u0003~?\u0000"+
		"\u01cd\u01cf\u0005R\u0000\u0000\u01ce\u01d0\u0003\u001e\u000f\u0000\u01cf"+
		"\u01ce\u0001\u0000\u0000\u0000\u01cf\u01d0\u0001\u0000\u0000\u0000\u01d0"+
		"\u01d1\u0001\u0000\u0000\u0000\u01d1\u01d2\u0005]\u0000\u0000\u01d2\u01d6"+
		"\u0003(\u0014\u0000\u01d3\u01d5\u0003*\u0015\u0000\u01d4\u01d3\u0001\u0000"+
		"\u0000\u0000\u01d5\u01d8\u0001\u0000\u0000\u0000\u01d6\u01d4\u0001\u0000"+
		"\u0000\u0000\u01d6\u01d7\u0001\u0000\u0000\u0000\u01d7\u01da\u0001\u0000"+
		"\u0000\u0000\u01d8\u01d6\u0001\u0000\u0000\u0000\u01d9\u01db\u0003,\u0016"+
		"\u0000\u01da\u01d9\u0001\u0000\u0000\u0000\u01da\u01db\u0001\u0000\u0000"+
		"\u0000\u01db\u01dc\u0001\u0000\u0000\u0000\u01dc\u01de\u0005r\u0000\u0000"+
		"\u01dd\u01df\u0005k\u0000\u0000\u01de\u01dd\u0001\u0000\u0000\u0000\u01de"+
		"\u01df\u0001\u0000\u0000\u0000\u01df\u01e0\u0001\u0000\u0000\u0000\u01e0"+
		"\u01e1\u0005]\u0000\u0000\u01e1\'\u0001\u0000\u0000\u0000\u01e2\u01e4"+
		"\u0003 \u0010\u0000\u01e3\u01e2\u0001\u0000\u0000\u0000\u01e4\u01e7\u0001"+
		"\u0000\u0000\u0000\u01e5\u01e3\u0001\u0000\u0000\u0000\u01e5\u01e6\u0001"+
		"\u0000\u0000\u0000\u01e6)\u0001\u0000\u0000\u0000\u01e7\u01e5\u0001\u0000"+
		"\u0000\u0000\u01e8\u01ea\u0005j\u0000\u0000\u01e9\u01e8\u0001\u0000\u0000"+
		"\u0000\u01e9\u01ea\u0001\u0000\u0000\u0000\u01ea\u01eb\u0001\u0000\u0000"+
		"\u0000\u01eb\u01ec\u0005\u0002\u0000\u0000\u01ec\u01ed\u0003~?\u0000\u01ed"+
		"\u01ef\u0005R\u0000\u0000\u01ee\u01f0\u0003\u001e\u000f\u0000\u01ef\u01ee"+
		"\u0001\u0000\u0000\u0000\u01ef\u01f0\u0001\u0000\u0000\u0000\u01f0\u01f1"+
		"\u0001\u0000\u0000\u0000\u01f1\u01f5\u0005]\u0000\u0000\u01f2\u01f4\u0003"+
		" \u0010\u0000\u01f3\u01f2\u0001\u0000\u0000\u0000\u01f4\u01f7\u0001\u0000"+
		"\u0000\u0000\u01f5\u01f3\u0001\u0000\u0000\u0000\u01f5\u01f6\u0001\u0000"+
		"\u0000\u0000\u01f6\u01f9\u0001\u0000\u0000\u0000\u01f7\u01f5\u0001\u0000"+
		"\u0000\u0000\u01f8\u01fa\u0005k\u0000\u0000\u01f9\u01f8\u0001\u0000\u0000"+
		"\u0000\u01f9\u01fa\u0001\u0000\u0000\u0000\u01fa+\u0001\u0000\u0000\u0000"+
		"\u01fb\u01fd\u0005j\u0000\u0000\u01fc\u01fb\u0001\u0000\u0000\u0000\u01fc"+
		"\u01fd\u0001\u0000\u0000\u0000\u01fd\u01fe\u0001\u0000\u0000\u0000\u01fe"+
		"\u01ff\u0005\u0003\u0000\u0000\u01ff\u0201\u0005R\u0000\u0000\u0200\u0202"+
		"\u0003\u001e\u000f\u0000\u0201\u0200\u0001\u0000\u0000\u0000\u0201\u0202"+
		"\u0001\u0000\u0000\u0000\u0202\u0203\u0001\u0000\u0000\u0000\u0203\u0207"+
		"\u0005]\u0000\u0000\u0204\u0206\u0003 \u0010\u0000\u0205\u0204\u0001\u0000"+
		"\u0000\u0000\u0206\u0209\u0001\u0000\u0000\u0000\u0207\u0205\u0001\u0000"+
		"\u0000\u0000\u0207\u0208\u0001\u0000\u0000\u0000\u0208\u020b\u0001\u0000"+
		"\u0000\u0000\u0209\u0207\u0001\u0000\u0000\u0000\u020a\u020c\u0005k\u0000"+
		"\u0000\u020b\u020a\u0001\u0000\u0000\u0000\u020b\u020c\u0001\u0000\u0000"+
		"\u0000\u020c-\u0001\u0000\u0000\u0000\u020d\u020f\u0005j\u0000\u0000\u020e"+
		"\u020d\u0001\u0000\u0000\u0000\u020e\u020f\u0001\u0000\u0000\u0000\u020f"+
		"\u0210\u0001\u0000\u0000\u0000\u0210\u0211\u0005\r\u0000\u0000\u0211\u0212"+
		"\u0003~?\u0000\u0212\u0214\u0005R\u0000\u0000\u0213\u0215\u0003\u001e"+
		"\u000f\u0000\u0214\u0213\u0001\u0000\u0000\u0000\u0214\u0215\u0001\u0000"+
		"\u0000\u0000\u0215\u0216\u0001\u0000\u0000\u0000\u0216\u021a\u0005]\u0000"+
		"\u0000\u0217\u0219\u0003 \u0010\u0000\u0218\u0217\u0001\u0000\u0000\u0000"+
		"\u0219\u021c\u0001\u0000\u0000\u0000\u021a\u0218\u0001\u0000\u0000\u0000"+
		"\u021a\u021b\u0001\u0000\u0000\u0000\u021b\u021d\u0001\u0000\u0000\u0000"+
		"\u021c\u021a\u0001\u0000\u0000\u0000\u021d\u021e\u0005s\u0000\u0000\u021e"+
		"\u021f\u0005k\u0000\u0000\u021f\u0220\u0005]\u0000\u0000\u0220/\u0001"+
		"\u0000\u0000\u0000\u0221\u0223\u0005j\u0000\u0000\u0222\u0221\u0001\u0000"+
		"\u0000\u0000\u0222\u0223\u0001\u0000\u0000\u0000\u0223\u0224\u0001\u0000"+
		"\u0000\u0000\u0224\u0225\u0005\u0005\u0000\u0000\u0225\u0226\u0003N\'"+
		"\u0000\u0226\u0227\u0005\u0007\u0000\u0000\u0227\u0228\u0003~?\u0000\u0228"+
		"\u022a\u0005R\u0000\u0000\u0229\u022b\u0003\u001e\u000f\u0000\u022a\u0229"+
		"\u0001\u0000\u0000\u0000\u022a\u022b\u0001\u0000\u0000\u0000\u022b\u022c"+
		"\u0001\u0000\u0000\u0000\u022c\u0230\u0005]\u0000\u0000\u022d\u022f\u0003"+
		" \u0010\u0000\u022e\u022d\u0001\u0000\u0000\u0000\u022f\u0232\u0001\u0000"+
		"\u0000\u0000\u0230\u022e\u0001\u0000\u0000\u0000\u0230\u0231\u0001\u0000"+
		"\u0000\u0000\u0231\u0233\u0001\u0000\u0000\u0000\u0232\u0230\u0001\u0000"+
		"\u0000\u0000\u0233\u0234\u0005t\u0000\u0000\u0234\u0235\u0005k\u0000\u0000"+
		"\u0235\u0236\u0005]\u0000\u0000\u02361\u0001\u0000\u0000\u0000\u0237\u0239"+
		"\u0005i\u0000\u0000\u0238\u0237\u0001\u0000\u0000\u0000\u0238\u0239\u0001"+
		"\u0000\u0000\u0000\u0239\u023a\u0001\u0000\u0000\u0000\u023a\u023c\u0003"+
		"\u0080@\u0000\u023b\u023d\u0003\u001e\u000f\u0000\u023c\u023b\u0001\u0000"+
		"\u0000\u0000\u023c\u023d\u0001\u0000\u0000\u0000\u023d\u023e\u0001\u0000"+
		"\u0000\u0000\u023e\u023f\u0005]\u0000\u0000\u023f3\u0001\u0000\u0000\u0000"+
		"\u0240\u0242\u0005j\u0000\u0000\u0241\u0240\u0001\u0000\u0000\u0000\u0241"+
		"\u0242\u0001\u0000\u0000\u0000\u0242\u0243\u0001\u0000\u0000\u0000\u0243"+
		"\u0244\u0005\f\u0000\u0000\u0244\u0246\u0005R\u0000\u0000\u0245\u0247"+
		"\u0003\u001e\u000f\u0000\u0246\u0245\u0001\u0000\u0000\u0000\u0246\u0247"+
		"\u0001\u0000\u0000\u0000\u0247\u0248\u0001\u0000\u0000\u0000\u0248\u0249"+
		"\u0005]\u0000\u0000\u0249\u024b\u00036\u001b\u0000\u024a\u024c\u00038"+
		"\u001c\u0000\u024b\u024a\u0001\u0000\u0000\u0000\u024c\u024d\u0001\u0000"+
		"\u0000\u0000\u024d\u024b\u0001\u0000\u0000\u0000\u024d\u024e\u0001\u0000"+
		"\u0000\u0000\u024e\u024f\u0001\u0000\u0000\u0000\u024f\u0251\u0005u\u0000"+
		"\u0000\u0250\u0252\u0005k\u0000\u0000\u0251\u0250\u0001\u0000\u0000\u0000"+
		"\u0251\u0252\u0001\u0000\u0000\u0000\u0252\u0253\u0001\u0000\u0000\u0000"+
		"\u0253\u0254\u0005]\u0000\u0000\u02545\u0001\u0000\u0000\u0000\u0255\u0257"+
		"\u0003 \u0010\u0000\u0256\u0255\u0001\u0000\u0000\u0000\u0257\u025a\u0001"+
		"\u0000\u0000\u0000\u0258\u0256\u0001\u0000\u0000\u0000\u0258\u0259\u0001"+
		"\u0000\u0000\u0000\u02597\u0001\u0000\u0000\u0000\u025a\u0258\u0001\u0000"+
		"\u0000\u0000\u025b\u025d\u0005j\u0000\u0000\u025c\u025b\u0001\u0000\u0000"+
		"\u0000\u025c\u025d\u0001\u0000\u0000\u0000\u025d\u025e\u0001\u0000\u0000"+
		"\u0000\u025e\u025f\u0005.\u0000\u0000\u025f\u0260\u0003X,\u0000\u0260"+
		"\u0261\u0005,\u0000\u0000\u0261\u0262\u0003N\'\u0000\u0262\u0264\u0005"+
		"R\u0000\u0000\u0263\u0265\u0003\u001e\u000f\u0000\u0264\u0263\u0001\u0000"+
		"\u0000\u0000\u0264\u0265\u0001\u0000\u0000\u0000\u0265\u0266\u0001\u0000"+
		"\u0000\u0000\u0266\u026a\u0005]\u0000\u0000\u0267\u0269\u0003 \u0010\u0000"+
		"\u0268\u0267\u0001\u0000\u0000\u0000\u0269\u026c\u0001\u0000\u0000\u0000"+
		"\u026a\u0268\u0001\u0000\u0000\u0000\u026a\u026b\u0001\u0000\u0000\u0000"+
		"\u026b\u026e\u0001\u0000\u0000\u0000\u026c\u026a\u0001\u0000\u0000\u0000"+
		"\u026d\u026f\u0005k\u0000\u0000\u026e\u026d\u0001\u0000\u0000\u0000\u026e"+
		"\u026f\u0001\u0000\u0000\u0000\u026f9\u0001\u0000\u0000\u0000\u0270\u0272"+
		"\u0005i\u0000\u0000\u0271\u0270\u0001\u0000\u0000\u0000\u0271\u0272\u0001"+
		"\u0000\u0000\u0000\u0272\u0273\u0001\u0000\u0000\u0000\u0273\u0274\u0005"+
		"2\u0000\u0000\u0274\u0275\u0003X,\u0000\u0275\u0276\u0005N\u0000\u0000"+
		"\u0276\u0277\u0003<\u001e\u0000\u0277\u0279\u0005O\u0000\u0000\u0278\u027a"+
		"\u0003\u001e\u000f\u0000\u0279\u0278\u0001\u0000\u0000\u0000\u0279\u027a"+
		"\u0001\u0000\u0000\u0000\u027a\u027b\u0001\u0000\u0000\u0000\u027b\u027c"+
		"\u0005]\u0000\u0000\u027c;\u0001\u0000\u0000\u0000\u027d\u0280\u0003x"+
		"<\u0000\u027e\u0280\u0003P(\u0000\u027f\u027d\u0001\u0000\u0000\u0000"+
		"\u027f\u027e\u0001\u0000\u0000\u0000\u0280=\u0001\u0000\u0000\u0000\u0281"+
		"\u0283\u0005i\u0000\u0000\u0282\u0281\u0001\u0000\u0000\u0000\u0282\u0283"+
		"\u0001\u0000\u0000\u0000\u0283\u0284\u0001\u0000\u0000\u0000\u0284\u0285"+
		"\u0005H\u0000\u0000\u0285\u0286\u0005P\u0000\u0000\u0286\u0287\u0005+"+
		"\u0000\u0000\u0287\u0288\u0005N\u0000\u0000\u0288\u0289\u0003l6\u0000"+
		"\u0289\u028a\u0005Q\u0000\u0000\u028a\u028b\u0003n7\u0000\u028b\u028d"+
		"\u0005O\u0000\u0000\u028c\u028e\u0003\u001e\u000f\u0000\u028d\u028c\u0001"+
		"\u0000\u0000\u0000\u028d\u028e\u0001\u0000\u0000\u0000\u028e\u028f\u0001"+
		"\u0000\u0000\u0000\u028f\u0290\u0005]\u0000\u0000\u0290?\u0001\u0000\u0000"+
		"\u0000\u0291\u0292\u0005\u000b\u0000\u0000\u0292\u0294\u0003~?\u0000\u0293"+
		"\u0295\u0003\u001e\u000f\u0000\u0294\u0293\u0001\u0000\u0000\u0000\u0294"+
		"\u0295\u0001\u0000\u0000\u0000\u0295\u0296\u0001\u0000\u0000\u0000\u0296"+
		"\u0297\u0005]\u0000\u0000\u0297A\u0001\u0000\u0000\u0000\u0298\u029a\u0005"+
		"j\u0000\u0000\u0299\u0298\u0001\u0000\u0000\u0000\u0299\u029a\u0001\u0000"+
		"\u0000\u0000\u029a\u029b\u0001\u0000\u0000\u0000\u029b\u029c\u0005-\u0000"+
		"\u0000\u029c\u029d\u0005/\u0000\u0000\u029d\u029f\u0005N\u0000\u0000\u029e"+
		"\u02a0\u0003`0\u0000\u029f\u029e\u0001\u0000\u0000\u0000\u029f\u02a0\u0001"+
		"\u0000\u0000\u0000\u02a0\u02a1\u0001\u0000\u0000\u0000\u02a1\u02a2\u0005"+
		"O\u0000\u0000\u02a2\u02a3\u0005D\u0000\u0000\u02a3\u02a4\u00050\u0000"+
		"\u0000\u02a4\u02a6\u0005R\u0000\u0000\u02a5\u02a7\u0003\u001e\u000f\u0000"+
		"\u02a6\u02a5\u0001\u0000\u0000\u0000\u02a6\u02a7\u0001\u0000\u0000\u0000"+
		"\u02a7\u02a8\u0001\u0000\u0000\u0000\u02a8\u02a9\u0005k\u0000\u0000\u02a9"+
		"\u02ad\u0005]\u0000\u0000\u02aa\u02ac\u0003 \u0010\u0000\u02ab\u02aa\u0001"+
		"\u0000\u0000\u0000\u02ac\u02af\u0001\u0000\u0000\u0000\u02ad\u02ab\u0001"+
		"\u0000\u0000\u0000\u02ad\u02ae\u0001\u0000\u0000\u0000\u02ae\u02b0\u0001"+
		"\u0000\u0000\u0000\u02af\u02ad\u0001\u0000\u0000\u0000\u02b0\u02b1\u0005"+
		"v\u0000\u0000\u02b1\u02b2\u0005]\u0000\u0000\u02b2C\u0001\u0000\u0000"+
		"\u0000\u02b3\u02b5\u0005i\u0000\u0000\u02b4\u02b3\u0001\u0000\u0000\u0000"+
		"\u02b4\u02b5\u0001\u0000\u0000\u0000\u02b5\u02b6\u0001\u0000\u0000\u0000"+
		"\u02b6\u02b7\u0003N\'\u0000\u02b7\u02b8\u0005R\u0000\u0000\u02b8\u02ba"+
		"\u0003j5\u0000\u02b9\u02bb\u0003\u001e\u000f\u0000\u02ba\u02b9\u0001\u0000"+
		"\u0000\u0000\u02ba\u02bb\u0001\u0000\u0000\u0000\u02bb\u02bc\u0001\u0000"+
		"\u0000\u0000\u02bc\u02bd\u0005]\u0000\u0000\u02bdE\u0001\u0000\u0000\u0000"+
		"\u02be\u02c0\u0005j\u0000\u0000\u02bf\u02be\u0001\u0000\u0000\u0000\u02bf"+
		"\u02c0\u0001\u0000\u0000\u0000\u02c0\u02c1\u0001\u0000\u0000\u0000\u02c1"+
		"\u02c2\u0005-\u0000\u0000\u02c2\u02c3\u0003T*\u0000\u02c3\u02c5\u0005"+
		"N\u0000\u0000\u02c4\u02c6\u0003`0\u0000\u02c5\u02c4\u0001\u0000\u0000"+
		"\u0000\u02c5\u02c6\u0001\u0000\u0000\u0000\u02c6\u02c7\u0001\u0000\u0000"+
		"\u0000\u02c7\u02c8\u0005O\u0000\u0000\u02c8\u02c9\u0005D\u0000\u0000\u02c9"+
		"\u02ca\u0003j5\u0000\u02ca\u02cc\u0005R\u0000\u0000\u02cb\u02cd\u0003"+
		"\u001e\u000f\u0000\u02cc\u02cb\u0001\u0000\u0000\u0000\u02cc\u02cd\u0001"+
		"\u0000\u0000\u0000\u02cd\u02ce\u0001\u0000\u0000\u0000\u02ce\u02d2\u0005"+
		"]\u0000\u0000\u02cf\u02d1\u0003 \u0010\u0000\u02d0\u02cf\u0001\u0000\u0000"+
		"\u0000\u02d1\u02d4\u0001\u0000\u0000\u0000\u02d2\u02d0\u0001\u0000\u0000"+
		"\u0000\u02d2\u02d3\u0001\u0000\u0000\u0000\u02d3\u02d5\u0001\u0000\u0000"+
		"\u0000\u02d4\u02d2\u0001\u0000\u0000\u0000\u02d5\u02d6\u0003@ \u0000\u02d6"+
		"\u02d8\u0005m\u0000\u0000\u02d7\u02d9\u0005k\u0000\u0000\u02d8\u02d7\u0001"+
		"\u0000\u0000\u0000\u02d8\u02d9\u0001\u0000\u0000\u0000\u02d9\u02da\u0001"+
		"\u0000\u0000\u0000\u02da\u02db\u0005]\u0000\u0000\u02dbG\u0001\u0000\u0000"+
		"\u0000\u02dc\u02de\u0005j\u0000\u0000\u02dd\u02dc\u0001\u0000\u0000\u0000"+
		"\u02dd\u02de\u0001\u0000\u0000\u0000\u02de\u02df\u0001\u0000\u0000\u0000"+
		"\u02df\u02e0\u0005-\u0000\u0000\u02e0\u02e1\u0003T*\u0000\u02e1\u02e3"+
		"\u0005N\u0000\u0000\u02e2\u02e4\u0003`0\u0000\u02e3\u02e2\u0001\u0000"+
		"\u0000\u0000\u02e3\u02e4\u0001\u0000\u0000\u0000\u02e4\u02e5\u0001\u0000"+
		"\u0000\u0000\u02e5\u02e6\u0005O\u0000\u0000\u02e6\u02e7\u0005D\u0000\u0000"+
		"\u02e7\u02e8\u00050\u0000\u0000\u02e8\u02ea\u0005R\u0000\u0000\u02e9\u02eb"+
		"\u0003\u001e\u000f\u0000\u02ea\u02e9\u0001\u0000\u0000\u0000\u02ea\u02eb"+
		"\u0001\u0000\u0000\u0000\u02eb\u02ec\u0001\u0000\u0000\u0000\u02ec\u02f0"+
		"\u0005]\u0000\u0000\u02ed\u02ef\u0003 \u0010\u0000\u02ee\u02ed\u0001\u0000"+
		"\u0000\u0000\u02ef\u02f2\u0001\u0000\u0000\u0000\u02f0\u02ee\u0001\u0000"+
		"\u0000\u0000\u02f0\u02f1\u0001\u0000\u0000\u0000\u02f1\u02f3\u0001\u0000"+
		"\u0000\u0000\u02f2\u02f0\u0001\u0000\u0000\u0000\u02f3\u02f5\u0005o\u0000"+
		"\u0000\u02f4\u02f6\u0005k\u0000\u0000\u02f5\u02f4\u0001\u0000\u0000\u0000"+
		"\u02f5\u02f6\u0001\u0000\u0000\u0000\u02f6\u02f7\u0001\u0000\u0000\u0000"+
		"\u02f7\u02f8\u0005]\u0000\u0000\u02f8I\u0001\u0000\u0000\u0000\u02f9\u02fb"+
		"\u0005i\u0000\u0000\u02fa\u02f9\u0001\u0000\u0000\u0000\u02fa\u02fb\u0001"+
		"\u0000\u0000\u0000\u02fb\u02fc\u0001\u0000\u0000\u0000\u02fc\u02fd\u0005"+
		"{\u0000\u0000\u02fd\u02fe\u0005]\u0000\u0000\u02fe\u02ff\u0005-\u0000"+
		"\u0000\u02ff\u0300\u0003T*\u0000\u0300\u0302\u0005N\u0000\u0000\u0301"+
		"\u0303\u0003`0\u0000\u0302\u0301\u0001\u0000\u0000\u0000\u0302\u0303\u0001"+
		"\u0000\u0000\u0000\u0303\u0304\u0001\u0000\u0000\u0000\u0304\u0305\u0005"+
		"O\u0000\u0000\u0305\u0306\u0005D\u0000\u0000\u0306\u0307\u0003j5\u0000"+
		"\u0307\u0308\u0005R\u0000\u0000\u0308\u0309\u0005]\u0000\u0000\u0309\u030b"+
		"\u00051\u0000\u0000\u030a\u030c\u0003\u001e\u000f\u0000\u030b\u030a\u0001"+
		"\u0000\u0000\u0000\u030b\u030c\u0001\u0000\u0000\u0000\u030c\u030d\u0001"+
		"\u0000\u0000\u0000\u030d\u030e\u0005]\u0000\u0000\u030eK\u0001\u0000\u0000"+
		"\u0000\u030f\u0311\u0005i\u0000\u0000\u0310\u030f\u0001\u0000\u0000\u0000"+
		"\u0310\u0311\u0001\u0000\u0000\u0000\u0311\u0312\u0001\u0000\u0000\u0000"+
		"\u0312\u0313\u0005{\u0000\u0000\u0313\u0314\u0005]\u0000\u0000\u0314\u0315"+
		"\u0005-\u0000\u0000\u0315\u0316\u0003T*\u0000\u0316\u0318\u0005N\u0000"+
		"\u0000\u0317\u0319\u0003`0\u0000\u0318\u0317\u0001\u0000\u0000\u0000\u0318"+
		"\u0319\u0001\u0000\u0000\u0000\u0319\u031a\u0001\u0000\u0000\u0000\u031a"+
		"\u031b\u0005O\u0000\u0000\u031b\u031c\u0005D\u0000\u0000\u031c\u031d\u0005"+
		"0\u0000\u0000\u031d\u031e\u0005R\u0000\u0000\u031e\u031f\u0005]\u0000"+
		"\u0000\u031f\u0321\u00051\u0000\u0000\u0320\u0322\u0003\u001e\u000f\u0000"+
		"\u0321\u0320\u0001\u0000\u0000\u0000\u0321\u0322\u0001\u0000\u0000\u0000"+
		"\u0322\u0323\u0001\u0000\u0000\u0000\u0323\u0324\u0005]\u0000\u0000\u0324"+
		"M\u0001\u0000\u0000\u0000\u0325\u0326\u0005_\u0000\u0000\u0326O\u0001"+
		"\u0000\u0000\u0000\u0327\u0328\u0005_\u0000\u0000\u0328Q\u0001\u0000\u0000"+
		"\u0000\u0329\u032a\u0006)\uffff\uffff\u0000\u032a\u032f\u0003P(\u0000"+
		"\u032b\u032c\u0005H\u0000\u0000\u032c\u032d\u0005P\u0000\u0000\u032d\u032f"+
		"\u0003P(\u0000\u032e\u0329\u0001\u0000\u0000\u0000\u032e\u032b\u0001\u0000"+
		"\u0000\u0000\u032f\u0334\u0001\u0000\u0000\u0000\u0330\u0331\n\u0001\u0000"+
		"\u0000\u0331\u0333\u0003|>\u0000\u0332\u0330\u0001\u0000\u0000\u0000\u0333"+
		"\u0336\u0001\u0000\u0000\u0000\u0334\u0332\u0001\u0000\u0000\u0000\u0334"+
		"\u0335\u0001\u0000\u0000\u0000\u0335S\u0001\u0000\u0000\u0000\u0336\u0334"+
		"\u0001\u0000\u0000\u0000\u0337\u0338\u0005_\u0000\u0000\u0338U\u0001\u0000"+
		"\u0000\u0000\u0339\u033a\u0005^\u0000\u0000\u033aW\u0001\u0000\u0000\u0000"+
		"\u033b\u0342\u00056\u0000\u0000\u033c\u0342\u00057\u0000\u0000\u033d\u0342"+
		"\u00058\u0000\u0000\u033e\u0342\u00059\u0000\u0000\u033f\u0342\u0005:"+
		"\u0000\u0000\u0340\u0342\u0005`\u0000\u0000\u0341\u033b\u0001\u0000\u0000"+
		"\u0000\u0341\u033c\u0001\u0000\u0000\u0000\u0341\u033d\u0001\u0000\u0000"+
		"\u0000\u0341\u033e\u0001\u0000\u0000\u0000\u0341\u033f\u0001\u0000\u0000"+
		"\u0000\u0341\u0340\u0001\u0000\u0000\u0000\u0342Y\u0001\u0000\u0000\u0000"+
		"\u0343\u0348\u0003r9\u0000\u0344\u0348\u0003t:\u0000\u0345\u0348\u0003"+
		"v;\u0000\u0346\u0348\u0003x<\u0000\u0347\u0343\u0001\u0000\u0000\u0000"+
		"\u0347\u0344\u0001\u0000\u0000\u0000\u0347\u0345\u0001\u0000\u0000\u0000"+
		"\u0347\u0346\u0001\u0000\u0000\u0000\u0348[\u0001\u0000\u0000\u0000\u0349"+
		"\u034e\u0003^/\u0000\u034a\u034b\u0005Q\u0000\u0000\u034b\u034d\u0003"+
		"^/\u0000\u034c\u034a\u0001\u0000\u0000\u0000\u034d\u0350\u0001\u0000\u0000"+
		"\u0000\u034e\u034c\u0001\u0000\u0000\u0000\u034e\u034f\u0001\u0000\u0000"+
		"\u0000\u034f]\u0001\u0000\u0000\u0000\u0350\u034e\u0001\u0000\u0000\u0000"+
		"\u0351\u0354\u0003\u00a8T\u0000\u0352\u0354\u0003~?\u0000\u0353\u0351"+
		"\u0001\u0000\u0000\u0000\u0353\u0352\u0001\u0000\u0000\u0000\u0354_\u0001"+
		"\u0000\u0000\u0000\u0355\u035a\u0003\u00a0P\u0000\u0356\u0357\u0005Q\u0000"+
		"\u0000\u0357\u0359\u0003\u00a0P\u0000\u0358\u0356\u0001\u0000\u0000\u0000"+
		"\u0359\u035c\u0001\u0000\u0000\u0000\u035a\u0358\u0001\u0000\u0000\u0000"+
		"\u035a\u035b\u0001\u0000\u0000\u0000\u035ba\u0001\u0000\u0000\u0000\u035c"+
		"\u035a\u0001\u0000\u0000\u0000\u035d\u0360\u0003N\'\u0000\u035e\u035f"+
		"\u0005Q\u0000\u0000\u035f\u0361\u0003N\'\u0000\u0360\u035e\u0001\u0000"+
		"\u0000\u0000\u0361\u0362\u0001\u0000\u0000\u0000\u0362\u0360\u0001\u0000"+
		"\u0000\u0000\u0362\u0363\u0001\u0000\u0000\u0000\u0363c\u0001\u0000\u0000"+
		"\u0000\u0364\u0369\u0003~?\u0000\u0365\u0366\u0005Q\u0000\u0000\u0366"+
		"\u0368\u0003~?\u0000\u0367\u0365\u0001\u0000\u0000\u0000\u0368\u036b\u0001"+
		"\u0000\u0000\u0000\u0369\u0367\u0001\u0000\u0000\u0000\u0369\u036a\u0001"+
		"\u0000\u0000\u0000\u036ae\u0001\u0000\u0000\u0000\u036b\u0369\u0001\u0000"+
		"\u0000\u0000\u036c\u036d\u0003N\'\u0000\u036d\u036e\u0005I\u0000\u0000"+
		"\u036e\u036f\u0003t:\u0000\u036fg\u0001\u0000\u0000\u0000\u0370\u0375"+
		"\u0003f3\u0000\u0371\u0372\u0005]\u0000\u0000\u0372\u0374\u0003f3\u0000"+
		"\u0373\u0371\u0001\u0000\u0000\u0000\u0374\u0377\u0001\u0000\u0000\u0000"+
		"\u0375\u0373\u0001\u0000\u0000\u0000\u0375\u0376\u0001\u0000\u0000\u0000"+
		"\u0376i\u0001\u0000\u0000\u0000\u0377\u0375\u0001\u0000\u0000\u0000\u0378"+
		"\u037d\u0003\u00a6S\u0000\u0379\u037d\u0003X,\u0000\u037a\u037d\u0003"+
		"\u00a2Q\u0000\u037b\u037d\u0003\u00a4R\u0000\u037c\u0378\u0001\u0000\u0000"+
		"\u0000\u037c\u0379\u0001\u0000\u0000\u0000\u037c\u037a\u0001\u0000\u0000"+
		"\u0000\u037c\u037b\u0001\u0000\u0000\u0000\u037dk\u0001\u0000\u0000\u0000"+
		"\u037e\u037f\u0003~?\u0000\u037fm\u0001\u0000\u0000\u0000\u0380\u0386"+
		"\u0003p8\u0000\u0381\u0386\u0003\u0090H\u0000\u0382\u0386\u0003\u0094"+
		"J\u0000\u0383\u0386\u0003\u0088D\u0000\u0384\u0386\u0003\u0092I\u0000"+
		"\u0385\u0380\u0001\u0000\u0000\u0000\u0385\u0381\u0001\u0000\u0000\u0000"+
		"\u0385\u0382\u0001\u0000\u0000\u0000\u0385\u0383\u0001\u0000\u0000\u0000"+
		"\u0385\u0384\u0001\u0000\u0000\u0000\u0386o\u0001\u0000\u0000\u0000\u0387"+
		"\u038e\u0003r9\u0000\u0388\u038e\u0003t:\u0000\u0389\u038e\u0003v;\u0000"+
		"\u038a\u038e\u0003x<\u0000\u038b\u038e\u0003\u00aaU\u0000\u038c\u038e"+
		"\u0003z=\u0000\u038d\u0387\u0001\u0000\u0000\u0000\u038d\u0388\u0001\u0000"+
		"\u0000\u0000\u038d\u0389\u0001\u0000\u0000\u0000\u038d\u038a\u0001\u0000"+
		"\u0000\u0000\u038d\u038b\u0001\u0000\u0000\u0000\u038d\u038c\u0001\u0000"+
		"\u0000\u0000\u038eq\u0001\u0000\u0000\u0000\u038f\u0390\u0007\u0000\u0000"+
		"\u0000\u0390s\u0001\u0000\u0000\u0000\u0391\u0395\u0005c\u0000\u0000\u0392"+
		"\u0395\u0005a\u0000\u0000\u0393\u0395\u0005b\u0000\u0000\u0394\u0391\u0001"+
		"\u0000\u0000\u0000\u0394\u0392\u0001\u0000\u0000\u0000\u0394\u0393\u0001"+
		"\u0000\u0000\u0000\u0395u\u0001\u0000\u0000\u0000\u0396\u0397\u0005d\u0000"+
		"\u0000\u0397w\u0001\u0000\u0000\u0000\u0398\u0399\u0007\u0001\u0000\u0000"+
		"\u0399y\u0001\u0000\u0000\u0000\u039a\u039b\u0003X,\u0000\u039b\u039c"+
		"\u0005P\u0000\u0000\u039c\u039d\u0003P(\u0000\u039d{\u0001\u0000\u0000"+
		"\u0000\u039e\u039f\u0005L\u0000\u0000\u039f\u03a0\u0003~?\u0000\u03a0"+
		"\u03a1\u0005M\u0000\u0000\u03a1}\u0001\u0000\u0000\u0000\u03a2\u03a3\u0006"+
		"?\uffff\uffff\u0000\u03a3\u03a8\u0003\u009eO\u0000\u03a4\u03a8\u0003\u0088"+
		"D\u0000\u03a5\u03a8\u0003\u0080@\u0000\u03a6\u03a8\u0003\u008eG\u0000"+
		"\u03a7\u03a2\u0001\u0000\u0000\u0000\u03a7\u03a4\u0001\u0000\u0000\u0000"+
		"\u03a7\u03a5\u0001\u0000\u0000\u0000\u03a7\u03a6\u0001\u0000\u0000\u0000"+
		"\u03a8\u03b8\u0001\u0000\u0000\u0000\u03a9\u03aa\n\u0001\u0000\u0000\u03aa"+
		"\u03ab\u0005\u0006\u0000\u0000\u03ab\u03b0\u0003~?\u0000\u03ac\u03ad\u0005"+
		"\u0002\u0000\u0000\u03ad\u03af\u0003~?\u0000\u03ae\u03ac\u0001\u0000\u0000"+
		"\u0000\u03af\u03b2\u0001\u0000\u0000\u0000\u03b0\u03ae\u0001\u0000\u0000"+
		"\u0000\u03b0\u03b1\u0001\u0000\u0000\u0000\u03b1\u03b3\u0001\u0000\u0000"+
		"\u0000\u03b2\u03b0\u0001\u0000\u0000\u0000\u03b3\u03b4\u0005\u0003\u0000"+
		"\u0000\u03b4\u03b5\u0003~?\u0002\u03b5\u03b7\u0001\u0000\u0000\u0000\u03b6"+
		"\u03a9\u0001\u0000\u0000\u0000\u03b7\u03ba\u0001\u0000\u0000\u0000\u03b8"+
		"\u03b6\u0001\u0000\u0000\u0000\u03b8\u03b9\u0001\u0000\u0000\u0000\u03b9"+
		"\u007f\u0001\u0000\u0000\u0000\u03ba\u03b8\u0001\u0000\u0000\u0000\u03bb"+
		"\u03bc\u0006@\uffff\uffff\u0000\u03bc\u03c5\u0003\u0084B\u0000\u03bd\u03c5"+
		"\u0003\u0086C\u0000\u03be\u03c5\u0003p8\u0000\u03bf\u03c5\u0003\u0090"+
		"H\u0000\u03c0\u03c5\u0003\u0094J\u0000\u03c1\u03c5\u0003\u0092I\u0000"+
		"\u03c2\u03c5\u0003P(\u0000\u03c3\u03c5\u0003\u009aM\u0000\u03c4\u03bb"+
		"\u0001\u0000\u0000\u0000\u03c4\u03bd\u0001\u0000\u0000\u0000\u03c4\u03be"+
		"\u0001\u0000\u0000\u0000\u03c4\u03bf\u0001\u0000\u0000\u0000\u03c4\u03c0"+
		"\u0001\u0000\u0000\u0000\u03c4\u03c1\u0001\u0000\u0000\u0000\u03c4\u03c2"+
		"\u0001\u0000\u0000\u0000\u03c4\u03c3\u0001\u0000\u0000\u0000\u03c5\u03cd"+
		"\u0001\u0000\u0000\u0000\u03c6\u03c7\n\u0002\u0000\u0000\u03c7\u03cc\u0003"+
		"|>\u0000\u03c8\u03c9\n\u0001\u0000\u0000\u03c9\u03ca\u0005P\u0000\u0000"+
		"\u03ca\u03cc\u0003\u0082A\u0000\u03cb\u03c6\u0001\u0000\u0000\u0000\u03cb"+
		"\u03c8\u0001\u0000\u0000\u0000\u03cc\u03cf\u0001\u0000\u0000\u0000\u03cd"+
		"\u03cb\u0001\u0000\u0000\u0000\u03cd\u03ce\u0001\u0000\u0000\u0000\u03ce"+
		"\u0081\u0001\u0000\u0000\u0000\u03cf\u03cd\u0001\u0000\u0000\u0000\u03d0"+
		"\u03d3\u0003P(\u0000\u03d1\u03d3\u0003\u009aM\u0000\u03d2\u03d0\u0001"+
		"\u0000\u0000\u0000\u03d2\u03d1\u0001\u0000\u0000\u0000\u03d3\u0083\u0001"+
		"\u0000\u0000\u0000\u03d4\u03d5\u0005H\u0000\u0000\u03d5\u0085\u0001\u0000"+
		"\u0000\u0000\u03d6\u03d7\u0005N\u0000\u0000\u03d7\u03d8\u0003~?\u0000"+
		"\u03d8\u03d9\u0005O\u0000\u0000\u03d9\u0087\u0001\u0000\u0000\u0000\u03da"+
		"\u03dd\u0003\u008aE\u0000\u03db\u03dd\u0003\u008cF\u0000\u03dc\u03da\u0001"+
		"\u0000\u0000\u0000\u03dc\u03db\u0001\u0000\u0000\u0000\u03dd\u0089\u0001"+
		"\u0000\u0000\u0000\u03de\u03df\u0005T\u0000\u0000\u03df\u03e0\u0003\u0080"+
		"@\u0000\u03e0\u008b\u0001\u0000\u0000\u0000\u03e1\u03e2\u0005@\u0000\u0000"+
		"\u03e2\u03e3\u0003\u0080@\u0000\u03e3\u008d\u0001\u0000\u0000\u0000\u03e4"+
		"\u03e5\u0003\u0080@\u0000\u03e5\u03e6\u0003\u009cN\u0000\u03e6\u03e7\u0003"+
		"~?\u0000\u03e7\u008f\u0001\u0000\u0000\u0000\u03e8\u03e9\u0005L\u0000"+
		"\u0000\u03e9\u03ea\u0003d2\u0000\u03ea\u03eb\u0005M\u0000\u0000\u03eb"+
		"\u0091\u0001\u0000\u0000\u0000\u03ec\u03ed\u0005N\u0000\u0000\u03ed\u03ee"+
		"\u0003d2\u0000\u03ee\u03ef\u0005O\u0000\u0000\u03ef\u0093\u0001\u0000"+
		"\u0000\u0000\u03f0\u03f1\u0005J\u0000\u0000\u03f1\u03f2\u0003\u0096K\u0000"+
		"\u03f2\u03f3\u0005K\u0000\u0000\u03f3\u0095\u0001\u0000\u0000\u0000\u03f4"+
		"\u03f9\u0003\u0098L\u0000\u03f5\u03f6\u0005Q\u0000\u0000\u03f6\u03f8\u0003"+
		"\u0098L\u0000\u03f7\u03f5\u0001\u0000\u0000\u0000\u03f8\u03fb\u0001\u0000"+
		"\u0000\u0000\u03f9\u03f7\u0001\u0000\u0000\u0000\u03f9\u03fa\u0001\u0000"+
		"\u0000\u0000\u03fa\u0097\u0001\u0000\u0000\u0000\u03fb\u03f9\u0001\u0000"+
		"\u0000\u0000\u03fc\u03fd\u0003~?\u0000\u03fd\u03fe\u0005R\u0000\u0000"+
		"\u03fe\u03ff\u0003~?\u0000\u03ff\u0099\u0001\u0000\u0000\u0000\u0400\u0401"+
		"\u0003T*\u0000\u0401\u0403\u0005N\u0000\u0000\u0402\u0404\u0003\\.\u0000"+
		"\u0403\u0402\u0001\u0000\u0000\u0000\u0403\u0404\u0001\u0000\u0000\u0000"+
		"\u0404\u0405\u0001\u0000\u0000\u0000\u0405\u0406\u0005O\u0000\u0000\u0406"+
		"\u009b\u0001\u0000\u0000\u0000\u0407\u0408\u0007\u0002\u0000\u0000\u0408"+
		"\u009d\u0001\u0000\u0000\u0000\u0409\u040a\u0003j5\u0000\u040a\u040c\u0005"+
		"N\u0000\u0000\u040b\u040d\u0003\\.\u0000\u040c\u040b\u0001\u0000\u0000"+
		"\u0000\u040c\u040d\u0001\u0000\u0000\u0000\u040d\u040e\u0001\u0000\u0000"+
		"\u0000\u040e\u040f\u0005O\u0000\u0000\u040f\u009f\u0001\u0000\u0000\u0000"+
		"\u0410\u0413\u0003N\'\u0000\u0411\u0413\u0005H\u0000\u0000\u0412\u0410"+
		"\u0001\u0000\u0000\u0000\u0412\u0411\u0001\u0000\u0000\u0000\u0413\u0414"+
		"\u0001\u0000\u0000\u0000\u0414\u0415\u0005R\u0000\u0000\u0415\u0416\u0003"+
		"j5\u0000\u0416\u00a1\u0001\u0000\u0000\u0000\u0417\u0418\u0003X,\u0000"+
		"\u0418\u0419\u0005L\u0000\u0000\u0419\u041e\u0003j5\u0000\u041a\u041b"+
		"\u0005Q\u0000\u0000\u041b\u041d\u0003j5\u0000\u041c\u041a\u0001\u0000"+
		"\u0000\u0000\u041d\u0420\u0001\u0000\u0000\u0000\u041e\u041c\u0001\u0000"+
		"\u0000\u0000\u041e\u041f\u0001\u0000\u0000\u0000\u041f\u0421\u0001\u0000"+
		"\u0000\u0000\u0420\u041e\u0001\u0000\u0000\u0000\u0421\u0422\u0005M\u0000"+
		"\u0000\u0422\u00a3\u0001\u0000\u0000\u0000\u0423\u0424\u0005;\u0000\u0000"+
		"\u0424\u0425\u0005L\u0000\u0000\u0425\u0426\u0005L\u0000\u0000\u0426\u042b"+
		"\u0003j5\u0000\u0427\u0428\u0005Q\u0000\u0000\u0428\u042a\u0003j5\u0000"+
		"\u0429\u0427\u0001\u0000\u0000\u0000\u042a\u042d\u0001\u0000\u0000\u0000"+
		"\u042b\u0429\u0001\u0000\u0000\u0000\u042b\u042c\u0001\u0000\u0000\u0000"+
		"\u042c\u042e\u0001\u0000\u0000\u0000\u042d\u042b\u0001\u0000\u0000\u0000"+
		"\u042e\u042f\u0005M\u0000\u0000\u042f\u0430\u0005Q\u0000\u0000\u0430\u0431"+
		"\u0003j5\u0000\u0431\u0432\u0005M\u0000\u0000\u0432\u00a5\u0001\u0000"+
		"\u0000\u0000\u0433\u0434\u00055\u0000\u0000\u0434\u0435\u0005L\u0000\u0000"+
		"\u0435\u0438\u0003j5\u0000\u0436\u0437\u0005Q\u0000\u0000\u0437\u0439"+
		"\u0003j5\u0000\u0438\u0436\u0001\u0000\u0000\u0000\u0439\u043a\u0001\u0000"+
		"\u0000\u0000\u043a\u0438\u0001\u0000\u0000\u0000\u043a\u043b\u0001\u0000"+
		"\u0000\u0000\u043b\u043c\u0001\u0000\u0000\u0000\u043c\u043d\u0005M\u0000"+
		"\u0000\u043d\u00a7\u0001\u0000\u0000\u0000\u043e\u043f\u0005\t\u0000\u0000"+
		"\u043f\u0440\u0003`0\u0000\u0440\u0441\u0005R\u0000\u0000\u0441\u0442"+
		"\u0003~?\u0000\u0442\u00a9\u0001\u0000\u0000\u0000\u0443\u0444\u0005f"+
		"\u0000\u0000\u0444\u00ab\u0001\u0000\u0000\u0000\u0083\u00ad\u00b2\u00b6"+
		"\u00bb\u00c9\u00cc\u00d9\u00de\u00e7\u00ed\u00f4\u00fa\u0100\u0105\u0111"+
		"\u0116\u011d\u0120\u0126\u012d\u0133\u0138\u013d\u0143\u0148\u0151\u0157"+
		"\u015c\u0164\u0168\u016f\u0174\u017c\u017f\u0186\u018c\u0192\u0197\u01a1"+
		"\u01a4\u01b4\u01b7\u01c0\u01c9\u01cf\u01d6\u01da\u01de\u01e5\u01e9\u01ef"+
		"\u01f5\u01f9\u01fc\u0201\u0207\u020b\u020e\u0214\u021a\u0222\u022a\u0230"+
		"\u0238\u023c\u0241\u0246\u024d\u0251\u0258\u025c\u0264\u026a\u026e\u0271"+
		"\u0279\u027f\u0282\u028d\u0294\u0299\u029f\u02a6\u02ad\u02b4\u02ba\u02bf"+
		"\u02c5\u02cc\u02d2\u02d8\u02dd\u02e3\u02ea\u02f0\u02f5\u02fa\u0302\u030b"+
		"\u0310\u0318\u0321\u032e\u0334\u0341\u0347\u034e\u0353\u035a\u0362\u0369"+
		"\u0375\u037c\u0385\u038d\u0394\u03a7\u03b0\u03b8\u03c4\u03cb\u03cd\u03d2"+
		"\u03dc\u03f9\u0403\u040c\u0412\u041e\u042b\u043a";
	public static final ATN _ATN =
		new ATNDeserializer().deserialize(_serializedATN.toCharArray());
	static {
		_decisionToDFA = new DFA[_ATN.getNumberOfDecisions()];
		for (int i = 0; i < _ATN.getNumberOfDecisions(); i++) {
			_decisionToDFA[i] = new DFA(_ATN.getDecisionState(i), i);
		}
	}
}