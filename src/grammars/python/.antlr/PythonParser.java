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
		MAIN=10, PRINT=11, RETURN=12, TRY=13, WHILE=14, IF_=15, ABSTRACT=16, ASSERT=17, 
		ASSIGN=18, BE=19, CALL=20, CATCH=21, CONSTANT=22, CONSTRUCTOR=23, COPY=24, 
		DIV=25, END=26, EVALUATES=27, FROM=28, FUNCTION=29, INHERITS=30, LET=31, 
		NEW=32, PRIVATE=33, PROCEDURE=34, PROPERTY=35, RETURNS=36, SET=37, STEP=38, 
		TEST=39, THEN=40, THROW=41, TO=42, VARIABLE=43, ABSTRACT_METHOD=44, ASSERT_EQUAL=45, 
		AS=46, DEF=47, EXCEPT=48, INIT=49, NONE=50, PASS=51, RAISE=52, ABC=53, 
		TESTCASE=54, TUPLE=55, INT_NAME=56, FLOAT_NAME=57, BOOL_NAME=58, STRING_NAME=59, 
		LIST_NAME=60, FUNC_NAME=61, TRUE=62, FALSE=63, AND=64, OR=65, NOT=66, 
		EQUAL=67, NOT_EQUAL=68, MOD=69, ARROW=70, POWER=71, BINARY_PREFIX=72, 
		HEX_PREFIX=73, THIS_INSTANCE=74, SINGLE_EQUALS=75, OPEN_BRACE=76, CLOSE_BRACE=77, 
		OPEN_SQ_BRACKET=78, CLOSE_SQ_BRACKET=79, OPEN_BRACKET=80, CLOSE_BRACKET=81, 
		DOT=82, COMMA=83, COLON=84, PLUS=85, MINUS=86, MULT=87, DIVIDE=88, LT=89, 
		GT=90, LE=91, GE=92, DOUBLE_QUOTES=93, WS=94, NL=95, NAME_STARTING_TEST_=96, 
		NAME_STARTING_LC=97, NAME_STARTING_UC=98, LITERAL_BINARY=99, LITERAL_HEX=100, 
		LITERAL_INTEGER=101, LITERAL_FLOAT=102, LITERAL_STRING=103, INTERPOLATED_STRING=104, 
		LITERAL_REGEXP=105, WHITESPACES=106, TEXT=107, GHOSTED=108, FUNCTION_ANNOTATION=109, 
		PROCECDURE_ANNOTATION=110, CONSTANT_ANNOTATION=111, ENUM_ANNOTATION=112, 
		CONCRETE_CLASS_ANNOTATION=113, ABSTRACT_CLASS_ANNOTATION=114, VARIABLE_ANNOTATION=115, 
		ASSIGNMENT_ANNOTATION=116, INPUT_ANNOTATION=117, CALL_ANNOTATION=118, 
		ELSE_IF_ANNOTATION=119, PROPERTY_ANNOTATION=120, FUNCTION_METHOD_ANNOTATION=121, 
		PROCEDURE_METHOD_ANNOTATION=122, COMMENT=123;
	public static final int
		RULE_file = 0, RULE_global = 1, RULE_main = 2, RULE_function = 3, RULE_test = 4, 
		RULE_procedure = 5, RULE_constant = 6, RULE_enum = 7, RULE_concreteClass = 8, 
		RULE_abstractClass = 9, RULE_comment = 10, RULE_commentText = 11, RULE_ordinaryStatement = 12, 
		RULE_variableDefinition = 13, RULE_assignment = 14, RULE_ifStatement = 15, 
		RULE_whileLoop = 16, RULE_forLoop = 17, RULE_procedureCall = 18, RULE_procRef = 19, 
		RULE_thisProcRef = 20, RULE_instanceProcRef = 21, RULE_identifierWithOptIndexes = 22, 
		RULE_tryStatement = 23, RULE_throwStatement = 24, RULE_errorMessage = 25, 
		RULE_assert = 26, RULE_returnStatement = 27, RULE_elseIfClause = 28, RULE_elseClause = 29, 
		RULE_catchStatement = 30, RULE_constructorMember = 31, RULE_property = 32, 
		RULE_functionMethod = 33, RULE_procedureMethod = 34, RULE_abstractFunction = 35, 
		RULE_abstractProcedure = 36, RULE_identifierDef = 37, RULE_identifierUse = 38, 
		RULE_assignable = 39, RULE_methodName = 40, RULE_testName = 41, RULE_typeName = 42, 
		RULE_constantValue = 43, RULE_argList = 44, RULE_argument = 45, RULE_paramList = 46, 
		RULE_identifierList = 47, RULE_expressionList = 48, RULE_type = 49, RULE_assertActual = 50, 
		RULE_assertExpected = 51, RULE_litValue = 52, RULE_litBoolean = 53, RULE_litInt = 54, 
		RULE_litFloat = 55, RULE_litString = 56, RULE_enumValue = 57, RULE_litRegExp = 58, 
		RULE_index = 59, RULE_expression = 60, RULE_term = 61, RULE_chainable = 62, 
		RULE_thisInstance = 63, RULE_bracketedExpression = 64, RULE_unaryExpression = 65, 
		RULE_negateNumeric = 66, RULE_negateLogical = 67, RULE_binaryExpression = 68, 
		RULE_list = 69, RULE_tuple = 70, RULE_dictionary = 71, RULE_kvpList = 72, 
		RULE_kvp = 73, RULE_methodCall = 74, RULE_binaryOperator = 75, RULE_newInstance = 76, 
		RULE_paramDef = 77, RULE_typeGeneric = 78, RULE_typeFunc = 79, RULE_typeTuple = 80, 
		RULE_lambda = 81, RULE_interpolatedString = 82;
	private static String[] makeRuleNames() {
		return new String[] {
			"file", "global", "main", "function", "test", "procedure", "constant", 
			"enum", "concreteClass", "abstractClass", "comment", "commentText", "ordinaryStatement", 
			"variableDefinition", "assignment", "ifStatement", "whileLoop", "forLoop", 
			"procedureCall", "procRef", "thisProcRef", "instanceProcRef", "identifierWithOptIndexes", 
			"tryStatement", "throwStatement", "errorMessage", "assert", "returnStatement", 
			"elseIfClause", "elseClause", "catchStatement", "constructorMember", 
			"property", "functionMethod", "procedureMethod", "abstractFunction", 
			"abstractProcedure", "identifierDef", "identifierUse", "assignable", 
			"methodName", "testName", "typeName", "constantValue", "argList", "argument", 
			"paramList", "identifierList", "expressionList", "type", "assertActual", 
			"assertExpected", "litValue", "litBoolean", "litInt", "litFloat", "litString", 
			"enumValue", "litRegExp", "index", "expression", "term", "chainable", 
			"thisInstance", "bracketedExpression", "unaryExpression", "negateNumeric", 
			"negateLogical", "binaryExpression", "list", "tuple", "dictionary", "kvpList", 
			"kvp", "methodCall", "binaryOperator", "newInstance", "paramDef", "typeGeneric", 
			"typeFunc", "typeTuple", "lambda", "interpolatedString"
		};
	}
	public static final String[] ruleNames = makeRuleNames();

	private static String[] makeLiteralNames() {
		return new String[] {
			null, "'class'", "'elif'", "'else'", "'enum'", "'for'", "'if'", "'in'", 
			"'input'", "'lambda'", "'main'", "'print'", "'return'", "'try'", "'while'", 
			"'if_'", "'abstract'", "'assert'", "'assign'", "'be'", "'call'", "'catch'", 
			"'constant'", "'constructor'", "'copy'", "'div'", "'end'", "'evaluates'", 
			"'from'", "'function'", "'inherits'", "'let'", "'new'", "'private'", 
			"'procedure'", "'property'", "'returns'", "'set'", "'step'", "'test'", 
			"'then'", "'throw'", "'to'", "'variable'", "'@abstractmethod'", "'assertEqual'", 
			"'as'", "'def'", "'except'", "'__init__'", "'None'", "'pass'", "'raise'", 
			"'ABC'", "'unittest.TestCase'", "'tuple'", "'int'", "'float'", "'bool'", 
			"'str'", "'list'", "'Callable'", "'True'", "'False'", "'and'", "'or'", 
			"'not'", "'=='", "'!='", "'%'", "'->'", "'**'", "'0b'", "'0x'", "'self'", 
			"'='", "'{'", "'}'", "'['", "']'", "'('", "')'", "'.'", "','", "':'", 
			"'+'", "'-'", "'*'", "'/'", "'<'", "'>'", "'<='", "'>='", "'\"'", null, 
			null, null, null, null, null, null, null, null, null, null, null, null, 
			null, "'[ghosted]'", "'# function'", "'# procedure'", "'# constant'", 
			"'# enum'", "'# concrete class'", "'# abstract class'", "'# variable definition'", 
			"'# assignment'", "'# input statement'", "'# procedure call'", "'# else if'", 
			"'# property'", "'# function method'", "'# procedure method'"
		};
	}
	private static final String[] _LITERAL_NAMES = makeLiteralNames();
	private static String[] makeSymbolicNames() {
		return new String[] {
			null, "CLASS", "ELIF", "ELSE", "ENUM", "FOR", "IF", "IN", "INPUT", "LAMBDA", 
			"MAIN", "PRINT", "RETURN", "TRY", "WHILE", "IF_", "ABSTRACT", "ASSERT", 
			"ASSIGN", "BE", "CALL", "CATCH", "CONSTANT", "CONSTRUCTOR", "COPY", "DIV", 
			"END", "EVALUATES", "FROM", "FUNCTION", "INHERITS", "LET", "NEW", "PRIVATE", 
			"PROCEDURE", "PROPERTY", "RETURNS", "SET", "STEP", "TEST", "THEN", "THROW", 
			"TO", "VARIABLE", "ABSTRACT_METHOD", "ASSERT_EQUAL", "AS", "DEF", "EXCEPT", 
			"INIT", "NONE", "PASS", "RAISE", "ABC", "TESTCASE", "TUPLE", "INT_NAME", 
			"FLOAT_NAME", "BOOL_NAME", "STRING_NAME", "LIST_NAME", "FUNC_NAME", "TRUE", 
			"FALSE", "AND", "OR", "NOT", "EQUAL", "NOT_EQUAL", "MOD", "ARROW", "POWER", 
			"BINARY_PREFIX", "HEX_PREFIX", "THIS_INSTANCE", "SINGLE_EQUALS", "OPEN_BRACE", 
			"CLOSE_BRACE", "OPEN_SQ_BRACKET", "CLOSE_SQ_BRACKET", "OPEN_BRACKET", 
			"CLOSE_BRACKET", "DOT", "COMMA", "COLON", "PLUS", "MINUS", "MULT", "DIVIDE", 
			"LT", "GT", "LE", "GE", "DOUBLE_QUOTES", "WS", "NL", "NAME_STARTING_TEST_", 
			"NAME_STARTING_LC", "NAME_STARTING_UC", "LITERAL_BINARY", "LITERAL_HEX", 
			"LITERAL_INTEGER", "LITERAL_FLOAT", "LITERAL_STRING", "INTERPOLATED_STRING", 
			"LITERAL_REGEXP", "WHITESPACES", "TEXT", "GHOSTED", "FUNCTION_ANNOTATION", 
			"PROCECDURE_ANNOTATION", "CONSTANT_ANNOTATION", "ENUM_ANNOTATION", "CONCRETE_CLASS_ANNOTATION", 
			"ABSTRACT_CLASS_ANNOTATION", "VARIABLE_ANNOTATION", "ASSIGNMENT_ANNOTATION", 
			"INPUT_ANNOTATION", "CALL_ANNOTATION", "ELSE_IF_ANNOTATION", "PROPERTY_ANNOTATION", 
			"FUNCTION_METHOD_ANNOTATION", "PROCEDURE_METHOD_ANNOTATION", "COMMENT"
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
			setState(167);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,0,_ctx) ) {
			case 1:
				{
				setState(166);
				comment();
				}
				break;
			}
			setState(172);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==CLASS || _la==DEF || ((((_la - 97)) & ~0x3f) == 0 && ((1L << (_la - 97)) & 67110913L) != 0)) {
				{
				{
				setState(169);
				global();
				}
				}
				setState(174);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			setState(178);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==NL) {
				{
				{
				setState(175);
				match(NL);
				}
				}
				setState(180);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			setState(181);
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
			setState(192);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,3,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(183);
				main();
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(184);
				function();
				}
				break;
			case 3:
				enterOuterAlt(_localctx, 3);
				{
				setState(185);
				test();
				}
				break;
			case 4:
				enterOuterAlt(_localctx, 4);
				{
				setState(186);
				procedure();
				}
				break;
			case 5:
				enterOuterAlt(_localctx, 5);
				{
				setState(187);
				constant();
				}
				break;
			case 6:
				enterOuterAlt(_localctx, 6);
				{
				setState(188);
				enum_();
				}
				break;
			case 7:
				enterOuterAlt(_localctx, 7);
				{
				setState(189);
				concreteClass();
				}
				break;
			case 8:
				enterOuterAlt(_localctx, 8);
				{
				setState(190);
				abstractClass();
				}
				break;
			case 9:
				enterOuterAlt(_localctx, 9);
				{
				setState(191);
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
		public List<TerminalNode> CLOSE_BRACKET() { return getTokens(PythonParser.CLOSE_BRACKET); }
		public TerminalNode CLOSE_BRACKET(int i) {
			return getToken(PythonParser.CLOSE_BRACKET, i);
		}
		public TerminalNode ARROW() { return getToken(PythonParser.ARROW, 0); }
		public TerminalNode NONE() { return getToken(PythonParser.NONE, 0); }
		public TerminalNode COLON() { return getToken(PythonParser.COLON, 0); }
		public List<TerminalNode> NL() { return getTokens(PythonParser.NL); }
		public TerminalNode NL(int i) {
			return getToken(PythonParser.NL, i);
		}
		public TerminalNode COMMENT() { return getToken(PythonParser.COMMENT, 0); }
		public TerminalNode GHOSTED() { return getToken(PythonParser.GHOSTED, 0); }
		public List<OrdinaryStatementContext> ordinaryStatement() {
			return getRuleContexts(OrdinaryStatementContext.class);
		}
		public OrdinaryStatementContext ordinaryStatement(int i) {
			return getRuleContext(OrdinaryStatementContext.class,i);
		}
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
			int _alt;
			enterOuterAlt(_localctx, 1);
			{
			setState(195);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==GHOSTED) {
				{
				setState(194);
				match(GHOSTED);
				}
			}

			setState(197);
			match(DEF);
			setState(198);
			match(MAIN);
			setState(199);
			match(OPEN_BRACKET);
			setState(200);
			match(CLOSE_BRACKET);
			setState(201);
			match(CLOSE_BRACKET);
			setState(202);
			match(ARROW);
			setState(203);
			match(NONE);
			setState(204);
			match(COLON);
			setState(205);
			match(NL);
			setState(209);
			_errHandler.sync(this);
			_alt = getInterpreter().adaptivePredict(_input,5,_ctx);
			while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER ) {
				if ( _alt==1 ) {
					{
					{
					setState(206);
					ordinaryStatement();
					}
					} 
				}
				setState(211);
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,5,_ctx);
			}
			setState(212);
			match(COMMENT);
			setState(213);
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
		public TerminalNode FUNCTION_ANNOTATION() { return getToken(PythonParser.FUNCTION_ANNOTATION, 0); }
		public List<TerminalNode> NL() { return getTokens(PythonParser.NL); }
		public TerminalNode NL(int i) {
			return getToken(PythonParser.NL, i);
		}
		public ReturnStatementContext returnStatement() {
			return getRuleContext(ReturnStatementContext.class,0);
		}
		public TerminalNode COMMENT() { return getToken(PythonParser.COMMENT, 0); }
		public TerminalNode GHOSTED() { return getToken(PythonParser.GHOSTED, 0); }
		public ParamListContext paramList() {
			return getRuleContext(ParamListContext.class,0);
		}
		public List<OrdinaryStatementContext> ordinaryStatement() {
			return getRuleContexts(OrdinaryStatementContext.class);
		}
		public OrdinaryStatementContext ordinaryStatement(int i) {
			return getRuleContext(OrdinaryStatementContext.class,i);
		}
		public FunctionContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_function; }
	}

	public final FunctionContext function() throws RecognitionException {
		FunctionContext _localctx = new FunctionContext(_ctx, getState());
		enterRule(_localctx, 6, RULE_function);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(216);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==GHOSTED) {
				{
				setState(215);
				match(GHOSTED);
				}
			}

			setState(218);
			match(DEF);
			setState(219);
			methodName();
			setState(220);
			match(OPEN_BRACKET);
			setState(222);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==NAME_STARTING_LC) {
				{
				setState(221);
				paramList();
				}
			}

			setState(224);
			match(CLOSE_BRACKET);
			setState(225);
			match(ARROW);
			setState(226);
			type();
			setState(227);
			match(COLON);
			setState(228);
			match(FUNCTION_ANNOTATION);
			setState(229);
			match(NL);
			setState(233);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while ((((_la) & ~0x3f) == 0 && ((1L << _la) & 4503599627395168L) != 0) || ((((_la - 74)) & ~0x3f) == 0 && ((1L << (_la - 74)) & 562967141679105L) != 0)) {
				{
				{
				setState(230);
				ordinaryStatement();
				}
				}
				setState(235);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			setState(236);
			returnStatement();
			setState(237);
			match(COMMENT);
			setState(238);
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
		public List<TerminalNode> COMMENT() { return getTokens(PythonParser.COMMENT); }
		public TerminalNode COMMENT(int i) {
			return getToken(PythonParser.COMMENT, i);
		}
		public List<TerminalNode> NL() { return getTokens(PythonParser.NL); }
		public TerminalNode NL(int i) {
			return getToken(PythonParser.NL, i);
		}
		public TerminalNode GHOSTED() { return getToken(PythonParser.GHOSTED, 0); }
		public List<AssertContext> assert_() {
			return getRuleContexts(AssertContext.class);
		}
		public AssertContext assert_(int i) {
			return getRuleContext(AssertContext.class,i);
		}
		public List<VariableDefinitionContext> variableDefinition() {
			return getRuleContexts(VariableDefinitionContext.class);
		}
		public VariableDefinitionContext variableDefinition(int i) {
			return getRuleContext(VariableDefinitionContext.class,i);
		}
		public List<CommentContext> comment() {
			return getRuleContexts(CommentContext.class);
		}
		public CommentContext comment(int i) {
			return getRuleContext(CommentContext.class,i);
		}
		public TestContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_test; }
	}

	public final TestContext test() throws RecognitionException {
		TestContext _localctx = new TestContext(_ctx, getState());
		enterRule(_localctx, 8, RULE_test);
		int _la;
		try {
			int _alt;
			enterOuterAlt(_localctx, 1);
			{
			setState(241);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==GHOSTED) {
				{
				setState(240);
				match(GHOSTED);
				}
			}

			setState(243);
			match(CLASS);
			setState(244);
			testName();
			setState(245);
			match(OPEN_BRACKET);
			setState(246);
			match(TESTCASE);
			setState(247);
			match(CLOSE_BRACKET);
			setState(248);
			match(COMMENT);
			setState(249);
			match(NL);
			setState(255);
			_errHandler.sync(this);
			_alt = getInterpreter().adaptivePredict(_input,11,_ctx);
			while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER ) {
				if ( _alt==1 ) {
					{
					setState(253);
					_errHandler.sync(this);
					switch ( getInterpreter().adaptivePredict(_input,10,_ctx) ) {
					case 1:
						{
						setState(250);
						assert_();
						}
						break;
					case 2:
						{
						setState(251);
						variableDefinition();
						}
						break;
					case 3:
						{
						setState(252);
						comment();
						}
						break;
					}
					} 
				}
				setState(257);
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,11,_ctx);
			}
			setState(258);
			match(COMMENT);
			setState(259);
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
		public TerminalNode PROCECDURE_ANNOTATION() { return getToken(PythonParser.PROCECDURE_ANNOTATION, 0); }
		public List<TerminalNode> NL() { return getTokens(PythonParser.NL); }
		public TerminalNode NL(int i) {
			return getToken(PythonParser.NL, i);
		}
		public TerminalNode COMMENT() { return getToken(PythonParser.COMMENT, 0); }
		public TerminalNode GHOSTED() { return getToken(PythonParser.GHOSTED, 0); }
		public ParamListContext paramList() {
			return getRuleContext(ParamListContext.class,0);
		}
		public List<OrdinaryStatementContext> ordinaryStatement() {
			return getRuleContexts(OrdinaryStatementContext.class);
		}
		public OrdinaryStatementContext ordinaryStatement(int i) {
			return getRuleContext(OrdinaryStatementContext.class,i);
		}
		public ProcedureContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_procedure; }
	}

	public final ProcedureContext procedure() throws RecognitionException {
		ProcedureContext _localctx = new ProcedureContext(_ctx, getState());
		enterRule(_localctx, 10, RULE_procedure);
		int _la;
		try {
			int _alt;
			enterOuterAlt(_localctx, 1);
			{
			setState(262);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==GHOSTED) {
				{
				setState(261);
				match(GHOSTED);
				}
			}

			setState(264);
			match(DEF);
			setState(265);
			methodName();
			setState(266);
			match(OPEN_BRACKET);
			setState(268);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==NAME_STARTING_LC) {
				{
				setState(267);
				paramList();
				}
			}

			setState(270);
			match(CLOSE_BRACKET);
			setState(271);
			match(ARROW);
			setState(272);
			match(NONE);
			setState(273);
			match(COLON);
			setState(274);
			match(PROCECDURE_ANNOTATION);
			setState(275);
			match(NL);
			setState(279);
			_errHandler.sync(this);
			_alt = getInterpreter().adaptivePredict(_input,14,_ctx);
			while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER ) {
				if ( _alt==1 ) {
					{
					{
					setState(276);
					ordinaryStatement();
					}
					} 
				}
				setState(281);
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,14,_ctx);
			}
			setState(282);
			match(COMMENT);
			setState(283);
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
		public TerminalNode EQUAL() { return getToken(PythonParser.EQUAL, 0); }
		public ConstantValueContext constantValue() {
			return getRuleContext(ConstantValueContext.class,0);
		}
		public TerminalNode CONSTANT_ANNOTATION() { return getToken(PythonParser.CONSTANT_ANNOTATION, 0); }
		public TerminalNode NL() { return getToken(PythonParser.NL, 0); }
		public TerminalNode GHOSTED() { return getToken(PythonParser.GHOSTED, 0); }
		public ConstantContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_constant; }
	}

	public final ConstantContext constant() throws RecognitionException {
		ConstantContext _localctx = new ConstantContext(_ctx, getState());
		enterRule(_localctx, 12, RULE_constant);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(286);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==GHOSTED) {
				{
				setState(285);
				match(GHOSTED);
				}
			}

			setState(288);
			identifierDef();
			setState(289);
			match(EQUAL);
			setState(290);
			constantValue();
			setState(291);
			match(CONSTANT_ANNOTATION);
			setState(292);
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
		public TerminalNode ENUM_ANNOTATION() { return getToken(PythonParser.ENUM_ANNOTATION, 0); }
		public List<TerminalNode> NL() { return getTokens(PythonParser.NL); }
		public TerminalNode NL(int i) {
			return getToken(PythonParser.NL, i);
		}
		public IdentifierListContext identifierList() {
			return getRuleContext(IdentifierListContext.class,0);
		}
		public TerminalNode COMMENT() { return getToken(PythonParser.COMMENT, 0); }
		public TerminalNode GHOSTED() { return getToken(PythonParser.GHOSTED, 0); }
		public EnumContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_enum; }
	}

	public final EnumContext enum_() throws RecognitionException {
		EnumContext _localctx = new EnumContext(_ctx, getState());
		enterRule(_localctx, 14, RULE_enum);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(295);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==GHOSTED) {
				{
				setState(294);
				match(GHOSTED);
				}
			}

			setState(297);
			match(CLASS);
			setState(298);
			typeName();
			setState(299);
			match(OPEN_BRACKET);
			setState(300);
			match(ENUM);
			setState(301);
			match(CLOSE_BRACKET);
			setState(302);
			match(COLON);
			setState(303);
			match(ENUM_ANNOTATION);
			setState(304);
			match(NL);
			setState(305);
			identifierList();
			setState(306);
			match(NL);
			setState(307);
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
	public static class ConcreteClassContext extends ParserRuleContext {
		public TerminalNode CLASS() { return getToken(PythonParser.CLASS, 0); }
		public List<TypeNameContext> typeName() {
			return getRuleContexts(TypeNameContext.class);
		}
		public TypeNameContext typeName(int i) {
			return getRuleContext(TypeNameContext.class,i);
		}
		public TerminalNode COLON() { return getToken(PythonParser.COLON, 0); }
		public TerminalNode CONCRETE_CLASS_ANNOTATION() { return getToken(PythonParser.CONCRETE_CLASS_ANNOTATION, 0); }
		public List<TerminalNode> NL() { return getTokens(PythonParser.NL); }
		public TerminalNode NL(int i) {
			return getToken(PythonParser.NL, i);
		}
		public TerminalNode COMMENT() { return getToken(PythonParser.COMMENT, 0); }
		public TerminalNode GHOSTED() { return getToken(PythonParser.GHOSTED, 0); }
		public TerminalNode OPEN_BRACKET() { return getToken(PythonParser.OPEN_BRACKET, 0); }
		public TerminalNode CLOSE_BRACKET() { return getToken(PythonParser.CLOSE_BRACKET, 0); }
		public List<ConstructorMemberContext> constructorMember() {
			return getRuleContexts(ConstructorMemberContext.class);
		}
		public ConstructorMemberContext constructorMember(int i) {
			return getRuleContext(ConstructorMemberContext.class,i);
		}
		public List<PropertyContext> property() {
			return getRuleContexts(PropertyContext.class);
		}
		public PropertyContext property(int i) {
			return getRuleContext(PropertyContext.class,i);
		}
		public List<FunctionMethodContext> functionMethod() {
			return getRuleContexts(FunctionMethodContext.class);
		}
		public FunctionMethodContext functionMethod(int i) {
			return getRuleContext(FunctionMethodContext.class,i);
		}
		public List<ProcedureMethodContext> procedureMethod() {
			return getRuleContexts(ProcedureMethodContext.class);
		}
		public ProcedureMethodContext procedureMethod(int i) {
			return getRuleContext(ProcedureMethodContext.class,i);
		}
		public List<CommentContext> comment() {
			return getRuleContexts(CommentContext.class);
		}
		public CommentContext comment(int i) {
			return getRuleContext(CommentContext.class,i);
		}
		public ConcreteClassContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_concreteClass; }
	}

	public final ConcreteClassContext concreteClass() throws RecognitionException {
		ConcreteClassContext _localctx = new ConcreteClassContext(_ctx, getState());
		enterRule(_localctx, 16, RULE_concreteClass);
		int _la;
		try {
			int _alt;
			enterOuterAlt(_localctx, 1);
			{
			setState(310);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==GHOSTED) {
				{
				setState(309);
				match(GHOSTED);
				}
			}

			setState(312);
			match(CLASS);
			setState(313);
			typeName();
			setState(318);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==OPEN_BRACKET) {
				{
				setState(314);
				match(OPEN_BRACKET);
				setState(315);
				typeName();
				setState(316);
				match(CLOSE_BRACKET);
				}
			}

			setState(320);
			match(COLON);
			setState(321);
			match(CONCRETE_CLASS_ANNOTATION);
			setState(322);
			match(NL);
			setState(330);
			_errHandler.sync(this);
			_alt = getInterpreter().adaptivePredict(_input,20,_ctx);
			while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER ) {
				if ( _alt==1 ) {
					{
					setState(328);
					_errHandler.sync(this);
					switch ( getInterpreter().adaptivePredict(_input,19,_ctx) ) {
					case 1:
						{
						setState(323);
						constructorMember();
						}
						break;
					case 2:
						{
						setState(324);
						property();
						}
						break;
					case 3:
						{
						setState(325);
						functionMethod();
						}
						break;
					case 4:
						{
						setState(326);
						procedureMethod();
						}
						break;
					case 5:
						{
						setState(327);
						comment();
						}
						break;
					}
					} 
				}
				setState(332);
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,20,_ctx);
			}
			setState(333);
			match(COMMENT);
			setState(334);
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
	public static class AbstractClassContext extends ParserRuleContext {
		public TerminalNode CLASS() { return getToken(PythonParser.CLASS, 0); }
		public List<TypeNameContext> typeName() {
			return getRuleContexts(TypeNameContext.class);
		}
		public TypeNameContext typeName(int i) {
			return getRuleContext(TypeNameContext.class,i);
		}
		public TerminalNode ABSTRACT_CLASS_ANNOTATION() { return getToken(PythonParser.ABSTRACT_CLASS_ANNOTATION, 0); }
		public List<TerminalNode> NL() { return getTokens(PythonParser.NL); }
		public TerminalNode NL(int i) {
			return getToken(PythonParser.NL, i);
		}
		public TerminalNode COMMENT() { return getToken(PythonParser.COMMENT, 0); }
		public TerminalNode OPEN_BRACKET() { return getToken(PythonParser.OPEN_BRACKET, 0); }
		public TerminalNode ABC() { return getToken(PythonParser.ABC, 0); }
		public TerminalNode CLOSE_BRACKET() { return getToken(PythonParser.CLOSE_BRACKET, 0); }
		public TerminalNode GHOSTED() { return getToken(PythonParser.GHOSTED, 0); }
		public List<PropertyContext> property() {
			return getRuleContexts(PropertyContext.class);
		}
		public PropertyContext property(int i) {
			return getRuleContext(PropertyContext.class,i);
		}
		public List<FunctionMethodContext> functionMethod() {
			return getRuleContexts(FunctionMethodContext.class);
		}
		public FunctionMethodContext functionMethod(int i) {
			return getRuleContext(FunctionMethodContext.class,i);
		}
		public List<ProcedureMethodContext> procedureMethod() {
			return getRuleContexts(ProcedureMethodContext.class);
		}
		public ProcedureMethodContext procedureMethod(int i) {
			return getRuleContext(ProcedureMethodContext.class,i);
		}
		public List<AbstractFunctionContext> abstractFunction() {
			return getRuleContexts(AbstractFunctionContext.class);
		}
		public AbstractFunctionContext abstractFunction(int i) {
			return getRuleContext(AbstractFunctionContext.class,i);
		}
		public List<AbstractProcedureContext> abstractProcedure() {
			return getRuleContexts(AbstractProcedureContext.class);
		}
		public AbstractProcedureContext abstractProcedure(int i) {
			return getRuleContext(AbstractProcedureContext.class,i);
		}
		public List<CommentContext> comment() {
			return getRuleContexts(CommentContext.class);
		}
		public CommentContext comment(int i) {
			return getRuleContext(CommentContext.class,i);
		}
		public AbstractClassContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_abstractClass; }
	}

	public final AbstractClassContext abstractClass() throws RecognitionException {
		AbstractClassContext _localctx = new AbstractClassContext(_ctx, getState());
		enterRule(_localctx, 18, RULE_abstractClass);
		int _la;
		try {
			int _alt;
			enterOuterAlt(_localctx, 1);
			{
			setState(337);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==GHOSTED) {
				{
				setState(336);
				match(GHOSTED);
				}
			}

			setState(339);
			match(CLASS);
			setState(340);
			typeName();
			setState(345);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case OPEN_BRACKET:
				{
				setState(341);
				match(OPEN_BRACKET);
				setState(342);
				typeName();
				}
				break;
			case ABC:
				{
				setState(343);
				match(ABC);
				setState(344);
				match(CLOSE_BRACKET);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			setState(347);
			match(ABSTRACT_CLASS_ANNOTATION);
			setState(348);
			match(NL);
			setState(357);
			_errHandler.sync(this);
			_alt = getInterpreter().adaptivePredict(_input,24,_ctx);
			while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER ) {
				if ( _alt==1 ) {
					{
					setState(355);
					_errHandler.sync(this);
					switch ( getInterpreter().adaptivePredict(_input,23,_ctx) ) {
					case 1:
						{
						setState(349);
						property();
						}
						break;
					case 2:
						{
						setState(350);
						functionMethod();
						}
						break;
					case 3:
						{
						setState(351);
						procedureMethod();
						}
						break;
					case 4:
						{
						setState(352);
						abstractFunction();
						}
						break;
					case 5:
						{
						setState(353);
						abstractProcedure();
						}
						break;
					case 6:
						{
						setState(354);
						comment();
						}
						break;
					}
					} 
				}
				setState(359);
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,24,_ctx);
			}
			setState(360);
			match(COMMENT);
			setState(361);
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
	public static class CommentContext extends ParserRuleContext {
		public CommentTextContext commentText() {
			return getRuleContext(CommentTextContext.class,0);
		}
		public TerminalNode NL() { return getToken(PythonParser.NL, 0); }
		public CommentContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_comment; }
	}

	public final CommentContext comment() throws RecognitionException {
		CommentContext _localctx = new CommentContext(_ctx, getState());
		enterRule(_localctx, 20, RULE_comment);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(363);
			commentText();
			setState(364);
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
		enterRule(_localctx, 22, RULE_commentText);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(366);
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
		enterRule(_localctx, 24, RULE_ordinaryStatement);
		try {
			setState(377);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,25,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(368);
				variableDefinition();
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(369);
				assignment();
				}
				break;
			case 3:
				enterOuterAlt(_localctx, 3);
				{
				setState(370);
				ifStatement();
				}
				break;
			case 4:
				enterOuterAlt(_localctx, 4);
				{
				setState(371);
				whileLoop();
				}
				break;
			case 5:
				enterOuterAlt(_localctx, 5);
				{
				setState(372);
				forLoop();
				}
				break;
			case 6:
				enterOuterAlt(_localctx, 6);
				{
				setState(373);
				procedureCall();
				}
				break;
			case 7:
				enterOuterAlt(_localctx, 7);
				{
				setState(374);
				tryStatement();
				}
				break;
			case 8:
				enterOuterAlt(_localctx, 8);
				{
				setState(375);
				throwStatement();
				}
				break;
			case 9:
				enterOuterAlt(_localctx, 9);
				{
				setState(376);
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
		public TerminalNode EQUAL() { return getToken(PythonParser.EQUAL, 0); }
		public ExpressionContext expression() {
			return getRuleContext(ExpressionContext.class,0);
		}
		public TerminalNode VARIABLE_ANNOTATION() { return getToken(PythonParser.VARIABLE_ANNOTATION, 0); }
		public TerminalNode NL() { return getToken(PythonParser.NL, 0); }
		public TerminalNode GHOSTED() { return getToken(PythonParser.GHOSTED, 0); }
		public VariableDefinitionContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_variableDefinition; }
	}

	public final VariableDefinitionContext variableDefinition() throws RecognitionException {
		VariableDefinitionContext _localctx = new VariableDefinitionContext(_ctx, getState());
		enterRule(_localctx, 26, RULE_variableDefinition);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(380);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==GHOSTED) {
				{
				setState(379);
				match(GHOSTED);
				}
			}

			setState(382);
			identifierDef();
			setState(383);
			match(EQUAL);
			setState(384);
			expression(0);
			setState(385);
			match(VARIABLE_ANNOTATION);
			setState(386);
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
		public TerminalNode EQUAL() { return getToken(PythonParser.EQUAL, 0); }
		public ExpressionContext expression() {
			return getRuleContext(ExpressionContext.class,0);
		}
		public TerminalNode ASSIGNMENT_ANNOTATION() { return getToken(PythonParser.ASSIGNMENT_ANNOTATION, 0); }
		public TerminalNode NL() { return getToken(PythonParser.NL, 0); }
		public TerminalNode GHOSTED() { return getToken(PythonParser.GHOSTED, 0); }
		public AssignmentContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_assignment; }
	}

	public final AssignmentContext assignment() throws RecognitionException {
		AssignmentContext _localctx = new AssignmentContext(_ctx, getState());
		enterRule(_localctx, 28, RULE_assignment);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(389);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==GHOSTED) {
				{
				setState(388);
				match(GHOSTED);
				}
			}

			setState(391);
			assignable(0);
			setState(392);
			match(EQUAL);
			setState(393);
			expression(0);
			setState(394);
			match(ASSIGNMENT_ANNOTATION);
			setState(395);
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
		public TerminalNode IF() { return getToken(PythonParser.IF, 0); }
		public ExpressionContext expression() {
			return getRuleContext(ExpressionContext.class,0);
		}
		public TerminalNode COLON() { return getToken(PythonParser.COLON, 0); }
		public List<TerminalNode> NL() { return getTokens(PythonParser.NL); }
		public TerminalNode NL(int i) {
			return getToken(PythonParser.NL, i);
		}
		public TerminalNode COMMENT() { return getToken(PythonParser.COMMENT, 0); }
		public TerminalNode GHOSTED() { return getToken(PythonParser.GHOSTED, 0); }
		public List<ElseIfClauseContext> elseIfClause() {
			return getRuleContexts(ElseIfClauseContext.class);
		}
		public ElseIfClauseContext elseIfClause(int i) {
			return getRuleContext(ElseIfClauseContext.class,i);
		}
		public List<ElseClauseContext> elseClause() {
			return getRuleContexts(ElseClauseContext.class);
		}
		public ElseClauseContext elseClause(int i) {
			return getRuleContext(ElseClauseContext.class,i);
		}
		public List<OrdinaryStatementContext> ordinaryStatement() {
			return getRuleContexts(OrdinaryStatementContext.class);
		}
		public OrdinaryStatementContext ordinaryStatement(int i) {
			return getRuleContext(OrdinaryStatementContext.class,i);
		}
		public IfStatementContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_ifStatement; }
	}

	public final IfStatementContext ifStatement() throws RecognitionException {
		IfStatementContext _localctx = new IfStatementContext(_ctx, getState());
		enterRule(_localctx, 30, RULE_ifStatement);
		int _la;
		try {
			int _alt;
			enterOuterAlt(_localctx, 1);
			{
			setState(398);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==GHOSTED) {
				{
				setState(397);
				match(GHOSTED);
				}
			}

			setState(400);
			match(IF);
			setState(401);
			expression(0);
			setState(402);
			match(COLON);
			setState(403);
			match(NL);
			setState(409);
			_errHandler.sync(this);
			_alt = getInterpreter().adaptivePredict(_input,30,_ctx);
			while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER ) {
				if ( _alt==1 ) {
					{
					setState(407);
					_errHandler.sync(this);
					switch ( getInterpreter().adaptivePredict(_input,29,_ctx) ) {
					case 1:
						{
						setState(404);
						elseIfClause();
						}
						break;
					case 2:
						{
						setState(405);
						elseClause();
						}
						break;
					case 3:
						{
						setState(406);
						ordinaryStatement();
						}
						break;
					}
					} 
				}
				setState(411);
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,30,_ctx);
			}
			setState(412);
			match(COMMENT);
			setState(413);
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
		public TerminalNode COMMENT() { return getToken(PythonParser.COMMENT, 0); }
		public TerminalNode GHOSTED() { return getToken(PythonParser.GHOSTED, 0); }
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
		enterRule(_localctx, 32, RULE_whileLoop);
		int _la;
		try {
			int _alt;
			enterOuterAlt(_localctx, 1);
			{
			setState(416);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==GHOSTED) {
				{
				setState(415);
				match(GHOSTED);
				}
			}

			setState(418);
			match(WHILE);
			setState(419);
			expression(0);
			setState(420);
			match(COLON);
			setState(421);
			match(NL);
			setState(425);
			_errHandler.sync(this);
			_alt = getInterpreter().adaptivePredict(_input,32,_ctx);
			while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER ) {
				if ( _alt==1 ) {
					{
					{
					setState(422);
					ordinaryStatement();
					}
					} 
				}
				setState(427);
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,32,_ctx);
			}
			setState(428);
			match(COMMENT);
			setState(429);
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
		public TerminalNode COMMENT() { return getToken(PythonParser.COMMENT, 0); }
		public TerminalNode GHOSTED() { return getToken(PythonParser.GHOSTED, 0); }
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
		enterRule(_localctx, 34, RULE_forLoop);
		int _la;
		try {
			int _alt;
			enterOuterAlt(_localctx, 1);
			{
			setState(432);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==GHOSTED) {
				{
				setState(431);
				match(GHOSTED);
				}
			}

			setState(434);
			match(FOR);
			setState(435);
			identifierDef();
			setState(436);
			match(IN);
			setState(437);
			expression(0);
			setState(438);
			match(COLON);
			setState(439);
			match(NL);
			setState(443);
			_errHandler.sync(this);
			_alt = getInterpreter().adaptivePredict(_input,34,_ctx);
			while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER ) {
				if ( _alt==1 ) {
					{
					{
					setState(440);
					ordinaryStatement();
					}
					} 
				}
				setState(445);
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,34,_ctx);
			}
			setState(446);
			match(COMMENT);
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
	public static class ProcedureCallContext extends ParserRuleContext {
		public ProcRefContext procRef() {
			return getRuleContext(ProcRefContext.class,0);
		}
		public TerminalNode OPEN_BRACKET() { return getToken(PythonParser.OPEN_BRACKET, 0); }
		public ArgListContext argList() {
			return getRuleContext(ArgListContext.class,0);
		}
		public TerminalNode CLOSE_BRACKET() { return getToken(PythonParser.CLOSE_BRACKET, 0); }
		public TerminalNode NL() { return getToken(PythonParser.NL, 0); }
		public TerminalNode GHOSTED() { return getToken(PythonParser.GHOSTED, 0); }
		public ProcedureCallContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_procedureCall; }
	}

	public final ProcedureCallContext procedureCall() throws RecognitionException {
		ProcedureCallContext _localctx = new ProcedureCallContext(_ctx, getState());
		enterRule(_localctx, 36, RULE_procedureCall);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(450);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==GHOSTED) {
				{
				setState(449);
				match(GHOSTED);
				}
			}

			setState(452);
			procRef();
			setState(453);
			match(OPEN_BRACKET);
			setState(454);
			argList();
			setState(455);
			match(CLOSE_BRACKET);
			setState(456);
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
	public static class ProcRefContext extends ParserRuleContext {
		public MethodNameContext methodName() {
			return getRuleContext(MethodNameContext.class,0);
		}
		public ThisProcRefContext thisProcRef() {
			return getRuleContext(ThisProcRefContext.class,0);
		}
		public InstanceProcRefContext instanceProcRef() {
			return getRuleContext(InstanceProcRefContext.class,0);
		}
		public ProcRefContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_procRef; }
	}

	public final ProcRefContext procRef() throws RecognitionException {
		ProcRefContext _localctx = new ProcRefContext(_ctx, getState());
		enterRule(_localctx, 38, RULE_procRef);
		try {
			setState(461);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,36,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(458);
				methodName();
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(459);
				thisProcRef();
				}
				break;
			case 3:
				enterOuterAlt(_localctx, 3);
				{
				setState(460);
				instanceProcRef();
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
	public static class ThisProcRefContext extends ParserRuleContext {
		public TerminalNode THIS_INSTANCE() { return getToken(PythonParser.THIS_INSTANCE, 0); }
		public TerminalNode DOT() { return getToken(PythonParser.DOT, 0); }
		public MethodNameContext methodName() {
			return getRuleContext(MethodNameContext.class,0);
		}
		public ThisProcRefContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_thisProcRef; }
	}

	public final ThisProcRefContext thisProcRef() throws RecognitionException {
		ThisProcRefContext _localctx = new ThisProcRefContext(_ctx, getState());
		enterRule(_localctx, 40, RULE_thisProcRef);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(463);
			match(THIS_INSTANCE);
			setState(464);
			match(DOT);
			setState(465);
			methodName();
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class InstanceProcRefContext extends ParserRuleContext {
		public IdentifierWithOptIndexesContext identifierWithOptIndexes() {
			return getRuleContext(IdentifierWithOptIndexesContext.class,0);
		}
		public TerminalNode DOT() { return getToken(PythonParser.DOT, 0); }
		public MethodNameContext methodName() {
			return getRuleContext(MethodNameContext.class,0);
		}
		public InstanceProcRefContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_instanceProcRef; }
	}

	public final InstanceProcRefContext instanceProcRef() throws RecognitionException {
		InstanceProcRefContext _localctx = new InstanceProcRefContext(_ctx, getState());
		enterRule(_localctx, 42, RULE_instanceProcRef);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(467);
			identifierWithOptIndexes();
			setState(468);
			match(DOT);
			setState(469);
			methodName();
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class IdentifierWithOptIndexesContext extends ParserRuleContext {
		public IdentifierUseContext identifierUse() {
			return getRuleContext(IdentifierUseContext.class,0);
		}
		public List<IndexContext> index() {
			return getRuleContexts(IndexContext.class);
		}
		public IndexContext index(int i) {
			return getRuleContext(IndexContext.class,i);
		}
		public IdentifierWithOptIndexesContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_identifierWithOptIndexes; }
	}

	public final IdentifierWithOptIndexesContext identifierWithOptIndexes() throws RecognitionException {
		IdentifierWithOptIndexesContext _localctx = new IdentifierWithOptIndexesContext(_ctx, getState());
		enterRule(_localctx, 44, RULE_identifierWithOptIndexes);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(471);
			identifierUse();
			setState(475);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==OPEN_SQ_BRACKET) {
				{
				{
				setState(472);
				index();
				}
				}
				setState(477);
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
	public static class TryStatementContext extends ParserRuleContext {
		public List<TerminalNode> TRY() { return getTokens(PythonParser.TRY); }
		public TerminalNode TRY(int i) {
			return getToken(PythonParser.TRY, i);
		}
		public List<TerminalNode> NL() { return getTokens(PythonParser.NL); }
		public TerminalNode NL(int i) {
			return getToken(PythonParser.NL, i);
		}
		public CatchStatementContext catchStatement() {
			return getRuleContext(CatchStatementContext.class,0);
		}
		public TerminalNode END() { return getToken(PythonParser.END, 0); }
		public TerminalNode GHOSTED() { return getToken(PythonParser.GHOSTED, 0); }
		public List<OrdinaryStatementContext> ordinaryStatement() {
			return getRuleContexts(OrdinaryStatementContext.class);
		}
		public OrdinaryStatementContext ordinaryStatement(int i) {
			return getRuleContext(OrdinaryStatementContext.class,i);
		}
		public TryStatementContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_tryStatement; }
	}

	public final TryStatementContext tryStatement() throws RecognitionException {
		TryStatementContext _localctx = new TryStatementContext(_ctx, getState());
		enterRule(_localctx, 46, RULE_tryStatement);
		int _la;
		try {
			int _alt;
			enterOuterAlt(_localctx, 1);
			{
			setState(479);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==GHOSTED) {
				{
				setState(478);
				match(GHOSTED);
				}
			}

			setState(481);
			match(TRY);
			setState(482);
			match(NL);
			setState(486);
			_errHandler.sync(this);
			_alt = getInterpreter().adaptivePredict(_input,39,_ctx);
			while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER ) {
				if ( _alt==1 ) {
					{
					{
					setState(483);
					ordinaryStatement();
					}
					} 
				}
				setState(488);
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,39,_ctx);
			}
			setState(489);
			catchStatement();
			setState(493);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while ((((_la) & ~0x3f) == 0 && ((1L << _la) & 4503599627395168L) != 0) || ((((_la - 74)) & ~0x3f) == 0 && ((1L << (_la - 74)) & 562967141679105L) != 0)) {
				{
				{
				setState(490);
				ordinaryStatement();
				}
				}
				setState(495);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			setState(496);
			match(END);
			setState(497);
			match(TRY);
			setState(498);
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
		public TerminalNode GHOSTED() { return getToken(PythonParser.GHOSTED, 0); }
		public ThrowStatementContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_throwStatement; }
	}

	public final ThrowStatementContext throwStatement() throws RecognitionException {
		ThrowStatementContext _localctx = new ThrowStatementContext(_ctx, getState());
		enterRule(_localctx, 48, RULE_throwStatement);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(501);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==GHOSTED) {
				{
				setState(500);
				match(GHOSTED);
				}
			}

			setState(503);
			match(RAISE);
			setState(504);
			typeName();
			setState(505);
			match(OPEN_BRACKET);
			setState(506);
			errorMessage();
			setState(507);
			match(CLOSE_BRACKET);
			setState(508);
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
		enterRule(_localctx, 50, RULE_errorMessage);
		try {
			setState(512);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case LITERAL_STRING:
			case INTERPOLATED_STRING:
				enterOuterAlt(_localctx, 1);
				{
				setState(510);
				litString();
				}
				break;
			case NAME_STARTING_LC:
				enterOuterAlt(_localctx, 2);
				{
				setState(511);
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
		public TerminalNode GHOSTED() { return getToken(PythonParser.GHOSTED, 0); }
		public AssertContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_assert; }
	}

	public final AssertContext assert_() throws RecognitionException {
		AssertContext _localctx = new AssertContext(_ctx, getState());
		enterRule(_localctx, 52, RULE_assert);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(515);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==GHOSTED) {
				{
				setState(514);
				match(GHOSTED);
				}
			}

			setState(517);
			match(THIS_INSTANCE);
			setState(518);
			match(DOT);
			setState(519);
			match(ASSERT_EQUAL);
			setState(520);
			match(OPEN_BRACKET);
			setState(521);
			assertActual();
			setState(522);
			match(COMMA);
			setState(523);
			assertExpected();
			setState(524);
			match(CLOSE_BRACKET);
			setState(525);
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
		public ReturnStatementContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_returnStatement; }
	}

	public final ReturnStatementContext returnStatement() throws RecognitionException {
		ReturnStatementContext _localctx = new ReturnStatementContext(_ctx, getState());
		enterRule(_localctx, 54, RULE_returnStatement);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(527);
			match(RETURN);
			setState(528);
			expression(0);
			setState(529);
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
	public static class ElseIfClauseContext extends ParserRuleContext {
		public TerminalNode ELIF() { return getToken(PythonParser.ELIF, 0); }
		public ExpressionContext expression() {
			return getRuleContext(ExpressionContext.class,0);
		}
		public TerminalNode COLON() { return getToken(PythonParser.COLON, 0); }
		public TerminalNode ELSE_IF_ANNOTATION() { return getToken(PythonParser.ELSE_IF_ANNOTATION, 0); }
		public TerminalNode NL() { return getToken(PythonParser.NL, 0); }
		public TerminalNode GHOSTED() { return getToken(PythonParser.GHOSTED, 0); }
		public ElseIfClauseContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_elseIfClause; }
	}

	public final ElseIfClauseContext elseIfClause() throws RecognitionException {
		ElseIfClauseContext _localctx = new ElseIfClauseContext(_ctx, getState());
		enterRule(_localctx, 56, RULE_elseIfClause);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(532);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==GHOSTED) {
				{
				setState(531);
				match(GHOSTED);
				}
			}

			setState(534);
			match(ELIF);
			setState(535);
			expression(0);
			setState(536);
			match(COLON);
			setState(537);
			match(ELSE_IF_ANNOTATION);
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
	public static class ElseClauseContext extends ParserRuleContext {
		public TerminalNode ELSE() { return getToken(PythonParser.ELSE, 0); }
		public TerminalNode COLON() { return getToken(PythonParser.COLON, 0); }
		public TerminalNode NL() { return getToken(PythonParser.NL, 0); }
		public TerminalNode GHOSTED() { return getToken(PythonParser.GHOSTED, 0); }
		public ElseClauseContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_elseClause; }
	}

	public final ElseClauseContext elseClause() throws RecognitionException {
		ElseClauseContext _localctx = new ElseClauseContext(_ctx, getState());
		enterRule(_localctx, 58, RULE_elseClause);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(541);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==GHOSTED) {
				{
				setState(540);
				match(GHOSTED);
				}
			}

			setState(543);
			match(ELSE);
			setState(544);
			match(COLON);
			setState(545);
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
	public static class CatchStatementContext extends ParserRuleContext {
		public TerminalNode EXCEPT() { return getToken(PythonParser.EXCEPT, 0); }
		public TypeNameContext typeName() {
			return getRuleContext(TypeNameContext.class,0);
		}
		public TerminalNode AS() { return getToken(PythonParser.AS, 0); }
		public IdentifierDefContext identifierDef() {
			return getRuleContext(IdentifierDefContext.class,0);
		}
		public TerminalNode NL() { return getToken(PythonParser.NL, 0); }
		public TerminalNode GHOSTED() { return getToken(PythonParser.GHOSTED, 0); }
		public CatchStatementContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_catchStatement; }
	}

	public final CatchStatementContext catchStatement() throws RecognitionException {
		CatchStatementContext _localctx = new CatchStatementContext(_ctx, getState());
		enterRule(_localctx, 60, RULE_catchStatement);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(548);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==GHOSTED) {
				{
				setState(547);
				match(GHOSTED);
				}
			}

			setState(550);
			match(EXCEPT);
			setState(551);
			typeName();
			setState(552);
			match(AS);
			setState(553);
			identifierDef();
			setState(554);
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
		public List<TerminalNode> NL() { return getTokens(PythonParser.NL); }
		public TerminalNode NL(int i) {
			return getToken(PythonParser.NL, i);
		}
		public TerminalNode COMMENT() { return getToken(PythonParser.COMMENT, 0); }
		public TerminalNode GHOSTED() { return getToken(PythonParser.GHOSTED, 0); }
		public ParamListContext paramList() {
			return getRuleContext(ParamListContext.class,0);
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
		enterRule(_localctx, 62, RULE_constructorMember);
		int _la;
		try {
			int _alt;
			enterOuterAlt(_localctx, 1);
			{
			setState(557);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==GHOSTED) {
				{
				setState(556);
				match(GHOSTED);
				}
			}

			setState(559);
			match(DEF);
			setState(560);
			match(INIT);
			setState(561);
			match(OPEN_BRACKET);
			setState(563);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==NAME_STARTING_LC) {
				{
				setState(562);
				paramList();
				}
			}

			setState(565);
			match(CLOSE_BRACKET);
			setState(566);
			match(ARROW);
			setState(567);
			match(NONE);
			setState(568);
			match(COLON);
			setState(569);
			match(NL);
			setState(573);
			_errHandler.sync(this);
			_alt = getInterpreter().adaptivePredict(_input,49,_ctx);
			while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER ) {
				if ( _alt==1 ) {
					{
					{
					setState(570);
					ordinaryStatement();
					}
					} 
				}
				setState(575);
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,49,_ctx);
			}
			setState(576);
			match(COMMENT);
			setState(577);
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
		public TerminalNode PROPERTY_ANNOTATION() { return getToken(PythonParser.PROPERTY_ANNOTATION, 0); }
		public TerminalNode NL() { return getToken(PythonParser.NL, 0); }
		public TerminalNode GHOSTED() { return getToken(PythonParser.GHOSTED, 0); }
		public PropertyContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_property; }
	}

	public final PropertyContext property() throws RecognitionException {
		PropertyContext _localctx = new PropertyContext(_ctx, getState());
		enterRule(_localctx, 64, RULE_property);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(580);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==GHOSTED) {
				{
				setState(579);
				match(GHOSTED);
				}
			}

			setState(582);
			identifierDef();
			setState(583);
			match(COLON);
			setState(584);
			type();
			setState(585);
			match(PROPERTY_ANNOTATION);
			setState(586);
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
		public TerminalNode FUNCTION_METHOD_ANNOTATION() { return getToken(PythonParser.FUNCTION_METHOD_ANNOTATION, 0); }
		public List<TerminalNode> NL() { return getTokens(PythonParser.NL); }
		public TerminalNode NL(int i) {
			return getToken(PythonParser.NL, i);
		}
		public ReturnStatementContext returnStatement() {
			return getRuleContext(ReturnStatementContext.class,0);
		}
		public TerminalNode COMMENT() { return getToken(PythonParser.COMMENT, 0); }
		public TerminalNode GHOSTED() { return getToken(PythonParser.GHOSTED, 0); }
		public ParamListContext paramList() {
			return getRuleContext(ParamListContext.class,0);
		}
		public List<OrdinaryStatementContext> ordinaryStatement() {
			return getRuleContexts(OrdinaryStatementContext.class);
		}
		public OrdinaryStatementContext ordinaryStatement(int i) {
			return getRuleContext(OrdinaryStatementContext.class,i);
		}
		public FunctionMethodContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_functionMethod; }
	}

	public final FunctionMethodContext functionMethod() throws RecognitionException {
		FunctionMethodContext _localctx = new FunctionMethodContext(_ctx, getState());
		enterRule(_localctx, 66, RULE_functionMethod);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(589);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==GHOSTED) {
				{
				setState(588);
				match(GHOSTED);
				}
			}

			setState(591);
			match(DEF);
			setState(592);
			methodName();
			setState(593);
			match(OPEN_BRACKET);
			setState(595);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==NAME_STARTING_LC) {
				{
				setState(594);
				paramList();
				}
			}

			setState(597);
			match(CLOSE_BRACKET);
			setState(598);
			match(ARROW);
			setState(599);
			type();
			setState(600);
			match(COLON);
			setState(601);
			match(FUNCTION_METHOD_ANNOTATION);
			setState(602);
			match(NL);
			setState(606);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while ((((_la) & ~0x3f) == 0 && ((1L << _la) & 4503599627395168L) != 0) || ((((_la - 74)) & ~0x3f) == 0 && ((1L << (_la - 74)) & 562967141679105L) != 0)) {
				{
				{
				setState(603);
				ordinaryStatement();
				}
				}
				setState(608);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			setState(609);
			returnStatement();
			setState(610);
			match(COMMENT);
			setState(611);
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
		public TerminalNode PROCEDURE_METHOD_ANNOTATION() { return getToken(PythonParser.PROCEDURE_METHOD_ANNOTATION, 0); }
		public List<TerminalNode> NL() { return getTokens(PythonParser.NL); }
		public TerminalNode NL(int i) {
			return getToken(PythonParser.NL, i);
		}
		public TerminalNode COMMENT() { return getToken(PythonParser.COMMENT, 0); }
		public TerminalNode GHOSTED() { return getToken(PythonParser.GHOSTED, 0); }
		public ParamListContext paramList() {
			return getRuleContext(ParamListContext.class,0);
		}
		public List<OrdinaryStatementContext> ordinaryStatement() {
			return getRuleContexts(OrdinaryStatementContext.class);
		}
		public OrdinaryStatementContext ordinaryStatement(int i) {
			return getRuleContext(OrdinaryStatementContext.class,i);
		}
		public ProcedureMethodContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_procedureMethod; }
	}

	public final ProcedureMethodContext procedureMethod() throws RecognitionException {
		ProcedureMethodContext _localctx = new ProcedureMethodContext(_ctx, getState());
		enterRule(_localctx, 68, RULE_procedureMethod);
		int _la;
		try {
			int _alt;
			enterOuterAlt(_localctx, 1);
			{
			setState(614);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==GHOSTED) {
				{
				setState(613);
				match(GHOSTED);
				}
			}

			setState(616);
			match(DEF);
			setState(617);
			methodName();
			setState(618);
			match(OPEN_BRACKET);
			setState(620);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==NAME_STARTING_LC) {
				{
				setState(619);
				paramList();
				}
			}

			setState(622);
			match(CLOSE_BRACKET);
			setState(623);
			match(ARROW);
			setState(624);
			match(NONE);
			setState(625);
			match(COLON);
			setState(626);
			match(PROCEDURE_METHOD_ANNOTATION);
			setState(627);
			match(NL);
			setState(631);
			_errHandler.sync(this);
			_alt = getInterpreter().adaptivePredict(_input,56,_ctx);
			while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER ) {
				if ( _alt==1 ) {
					{
					{
					setState(628);
					ordinaryStatement();
					}
					} 
				}
				setState(633);
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,56,_ctx);
			}
			setState(634);
			match(COMMENT);
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
		public TerminalNode COMMENT() { return getToken(PythonParser.COMMENT, 0); }
		public TerminalNode GHOSTED() { return getToken(PythonParser.GHOSTED, 0); }
		public ParamListContext paramList() {
			return getRuleContext(ParamListContext.class,0);
		}
		public AbstractFunctionContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_abstractFunction; }
	}

	public final AbstractFunctionContext abstractFunction() throws RecognitionException {
		AbstractFunctionContext _localctx = new AbstractFunctionContext(_ctx, getState());
		enterRule(_localctx, 70, RULE_abstractFunction);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(638);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==GHOSTED) {
				{
				setState(637);
				match(GHOSTED);
				}
			}

			setState(640);
			match(ABSTRACT_METHOD);
			setState(641);
			match(NL);
			setState(642);
			match(DEF);
			setState(643);
			methodName();
			setState(644);
			match(OPEN_BRACKET);
			setState(646);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==NAME_STARTING_LC) {
				{
				setState(645);
				paramList();
				}
			}

			setState(648);
			match(CLOSE_BRACKET);
			setState(649);
			match(ARROW);
			setState(650);
			type();
			setState(651);
			match(COLON);
			setState(652);
			match(NL);
			setState(653);
			match(PASS);
			setState(654);
			match(COMMENT);
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
		public TerminalNode COMMENT() { return getToken(PythonParser.COMMENT, 0); }
		public TerminalNode GHOSTED() { return getToken(PythonParser.GHOSTED, 0); }
		public ParamListContext paramList() {
			return getRuleContext(ParamListContext.class,0);
		}
		public AbstractProcedureContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_abstractProcedure; }
	}

	public final AbstractProcedureContext abstractProcedure() throws RecognitionException {
		AbstractProcedureContext _localctx = new AbstractProcedureContext(_ctx, getState());
		enterRule(_localctx, 72, RULE_abstractProcedure);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(658);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==GHOSTED) {
				{
				setState(657);
				match(GHOSTED);
				}
			}

			setState(660);
			match(ABSTRACT_METHOD);
			setState(661);
			match(NL);
			setState(662);
			match(DEF);
			setState(663);
			methodName();
			setState(664);
			match(OPEN_BRACKET);
			setState(666);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==NAME_STARTING_LC) {
				{
				setState(665);
				paramList();
				}
			}

			setState(668);
			match(CLOSE_BRACKET);
			setState(669);
			match(ARROW);
			setState(670);
			match(NONE);
			setState(671);
			match(COLON);
			setState(672);
			match(NL);
			setState(673);
			match(PASS);
			setState(674);
			match(COMMENT);
			setState(675);
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
		enterRule(_localctx, 74, RULE_identifierDef);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(677);
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
		enterRule(_localctx, 76, RULE_identifierUse);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(679);
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
		public IdentifierUseContext identifierUse() {
			return getRuleContext(IdentifierUseContext.class,0);
		}
		public TerminalNode THIS_INSTANCE() { return getToken(PythonParser.THIS_INSTANCE, 0); }
		public TerminalNode DOT() { return getToken(PythonParser.DOT, 0); }
		public AssignableContext assignable() {
			return getRuleContext(AssignableContext.class,0);
		}
		public IndexContext index() {
			return getRuleContext(IndexContext.class,0);
		}
		public AssignableContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_assignable; }
	}

	public final AssignableContext assignable() throws RecognitionException {
		return assignable(0);
	}

	private AssignableContext assignable(int _p) throws RecognitionException {
		ParserRuleContext _parentctx = _ctx;
		int _parentState = getState();
		AssignableContext _localctx = new AssignableContext(_ctx, _parentState);
		AssignableContext _prevctx = _localctx;
		int _startState = 78;
		enterRecursionRule(_localctx, 78, RULE_assignable, _p);
		try {
			int _alt;
			enterOuterAlt(_localctx, 1);
			{
			setState(686);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case NAME_STARTING_LC:
				{
				setState(682);
				identifierUse();
				}
				break;
			case THIS_INSTANCE:
				{
				setState(683);
				match(THIS_INSTANCE);
				setState(684);
				match(DOT);
				setState(685);
				identifierUse();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			_ctx.stop = _input.LT(-1);
			setState(692);
			_errHandler.sync(this);
			_alt = getInterpreter().adaptivePredict(_input,62,_ctx);
			while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER ) {
				if ( _alt==1 ) {
					if ( _parseListeners!=null ) triggerExitRuleEvent();
					_prevctx = _localctx;
					{
					{
					_localctx = new AssignableContext(_parentctx, _parentState);
					pushNewRecursionContext(_localctx, _startState, RULE_assignable);
					setState(688);
					if (!(precpred(_ctx, 1))) throw new FailedPredicateException(this, "precpred(_ctx, 1)");
					setState(689);
					index();
					}
					} 
				}
				setState(694);
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,62,_ctx);
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
		enterRule(_localctx, 80, RULE_methodName);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(695);
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
		enterRule(_localctx, 82, RULE_testName);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(697);
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
		public TerminalNode INT_NAME() { return getToken(PythonParser.INT_NAME, 0); }
		public TerminalNode FLOAT_NAME() { return getToken(PythonParser.FLOAT_NAME, 0); }
		public TerminalNode BOOL_NAME() { return getToken(PythonParser.BOOL_NAME, 0); }
		public TerminalNode STRING_NAME() { return getToken(PythonParser.STRING_NAME, 0); }
		public TerminalNode LIST_NAME() { return getToken(PythonParser.LIST_NAME, 0); }
		public TerminalNode NAME_STARTING_UC() { return getToken(PythonParser.NAME_STARTING_UC, 0); }
		public TypeNameContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_typeName; }
	}

	public final TypeNameContext typeName() throws RecognitionException {
		TypeNameContext _localctx = new TypeNameContext(_ctx, getState());
		enterRule(_localctx, 84, RULE_typeName);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(699);
			_la = _input.LA(1);
			if ( !(((((_la - 56)) & ~0x3f) == 0 && ((1L << (_la - 56)) & 4398046511135L) != 0)) ) {
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
		enterRule(_localctx, 86, RULE_constantValue);
		try {
			setState(705);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case TRUE:
			case FALSE:
				enterOuterAlt(_localctx, 1);
				{
				setState(701);
				litBoolean();
				}
				break;
			case LITERAL_BINARY:
			case LITERAL_HEX:
			case LITERAL_INTEGER:
				enterOuterAlt(_localctx, 2);
				{
				setState(702);
				litInt();
				}
				break;
			case LITERAL_FLOAT:
				enterOuterAlt(_localctx, 3);
				{
				setState(703);
				litFloat();
				}
				break;
			case LITERAL_STRING:
			case INTERPOLATED_STRING:
				enterOuterAlt(_localctx, 4);
				{
				setState(704);
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
		enterRule(_localctx, 88, RULE_argList);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(707);
			argument();
			setState(712);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==COMMA) {
				{
				{
				setState(708);
				match(COMMA);
				setState(709);
				argument();
				}
				}
				setState(714);
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
		enterRule(_localctx, 90, RULE_argument);
		try {
			setState(717);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case LAMBDA:
				enterOuterAlt(_localctx, 1);
				{
				setState(715);
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
				setState(716);
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
		enterRule(_localctx, 92, RULE_paramList);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(719);
			paramDef();
			setState(724);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==COMMA) {
				{
				{
				setState(720);
				match(COMMA);
				setState(721);
				paramDef();
				}
				}
				setState(726);
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
		enterRule(_localctx, 94, RULE_identifierList);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(727);
			identifierDef();
			setState(730); 
			_errHandler.sync(this);
			_la = _input.LA(1);
			do {
				{
				{
				setState(728);
				match(COMMA);
				setState(729);
				identifierDef();
				}
				}
				setState(732); 
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
		enterRule(_localctx, 96, RULE_expressionList);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(734);
			expression(0);
			setState(739);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==COMMA) {
				{
				{
				setState(735);
				match(COMMA);
				setState(736);
				expression(0);
				}
				}
				setState(741);
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
		enterRule(_localctx, 98, RULE_type);
		try {
			setState(746);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,69,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(742);
				typeTuple();
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(743);
				typeName();
				}
				break;
			case 3:
				enterOuterAlt(_localctx, 3);
				{
				setState(744);
				typeGeneric();
				}
				break;
			case 4:
				enterOuterAlt(_localctx, 4);
				{
				setState(745);
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
		enterRule(_localctx, 100, RULE_assertActual);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(748);
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
		enterRule(_localctx, 102, RULE_assertExpected);
		try {
			setState(755);
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
				setState(750);
				litValue();
				}
				break;
			case OPEN_SQ_BRACKET:
				enterOuterAlt(_localctx, 2);
				{
				setState(751);
				list();
				}
				break;
			case OPEN_BRACE:
				enterOuterAlt(_localctx, 3);
				{
				setState(752);
				dictionary();
				}
				break;
			case NOT:
			case MINUS:
				enterOuterAlt(_localctx, 4);
				{
				setState(753);
				unaryExpression();
				}
				break;
			case OPEN_BRACKET:
				enterOuterAlt(_localctx, 5);
				{
				setState(754);
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
		enterRule(_localctx, 104, RULE_litValue);
		try {
			setState(763);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,71,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(757);
				litBoolean();
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(758);
				litInt();
				}
				break;
			case 3:
				enterOuterAlt(_localctx, 3);
				{
				setState(759);
				litFloat();
				}
				break;
			case 4:
				enterOuterAlt(_localctx, 4);
				{
				setState(760);
				litString();
				}
				break;
			case 5:
				enterOuterAlt(_localctx, 5);
				{
				setState(761);
				interpolatedString();
				}
				break;
			case 6:
				enterOuterAlt(_localctx, 6);
				{
				setState(762);
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
		enterRule(_localctx, 106, RULE_litBoolean);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(765);
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
		public TerminalNode LITERAL_INTEGER() { return getToken(PythonParser.LITERAL_INTEGER, 0); }
		public TerminalNode LITERAL_BINARY() { return getToken(PythonParser.LITERAL_BINARY, 0); }
		public TerminalNode LITERAL_HEX() { return getToken(PythonParser.LITERAL_HEX, 0); }
		public LitIntContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_litInt; }
	}

	public final LitIntContext litInt() throws RecognitionException {
		LitIntContext _localctx = new LitIntContext(_ctx, getState());
		enterRule(_localctx, 108, RULE_litInt);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(767);
			_la = _input.LA(1);
			if ( !(((((_la - 99)) & ~0x3f) == 0 && ((1L << (_la - 99)) & 7L) != 0)) ) {
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
	public static class LitFloatContext extends ParserRuleContext {
		public TerminalNode LITERAL_FLOAT() { return getToken(PythonParser.LITERAL_FLOAT, 0); }
		public LitFloatContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_litFloat; }
	}

	public final LitFloatContext litFloat() throws RecognitionException {
		LitFloatContext _localctx = new LitFloatContext(_ctx, getState());
		enterRule(_localctx, 110, RULE_litFloat);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(769);
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
		enterRule(_localctx, 112, RULE_litString);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(771);
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
		enterRule(_localctx, 114, RULE_enumValue);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(773);
			typeName();
			setState(774);
			match(DOT);
			setState(775);
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
	public static class LitRegExpContext extends ParserRuleContext {
		public TerminalNode LITERAL_REGEXP() { return getToken(PythonParser.LITERAL_REGEXP, 0); }
		public LitRegExpContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_litRegExp; }
	}

	public final LitRegExpContext litRegExp() throws RecognitionException {
		LitRegExpContext _localctx = new LitRegExpContext(_ctx, getState());
		enterRule(_localctx, 116, RULE_litRegExp);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(777);
			match(LITERAL_REGEXP);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
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
		enterRule(_localctx, 118, RULE_index);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(779);
			match(OPEN_SQ_BRACKET);
			setState(780);
			expression(0);
			setState(781);
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
		public NewInstanceContext newInstance() {
			return getRuleContext(NewInstanceContext.class,0);
		}
		public UnaryExpressionContext unaryExpression() {
			return getRuleContext(UnaryExpressionContext.class,0);
		}
		public TermContext term() {
			return getRuleContext(TermContext.class,0);
		}
		public BinaryExpressionContext binaryExpression() {
			return getRuleContext(BinaryExpressionContext.class,0);
		}
		public List<ExpressionContext> expression() {
			return getRuleContexts(ExpressionContext.class);
		}
		public ExpressionContext expression(int i) {
			return getRuleContext(ExpressionContext.class,i);
		}
		public TerminalNode IF() { return getToken(PythonParser.IF, 0); }
		public TerminalNode ELSE() { return getToken(PythonParser.ELSE, 0); }
		public List<TerminalNode> ELIF() { return getTokens(PythonParser.ELIF); }
		public TerminalNode ELIF(int i) {
			return getToken(PythonParser.ELIF, i);
		}
		public ExpressionContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_expression; }
	}

	public final ExpressionContext expression() throws RecognitionException {
		return expression(0);
	}

	private ExpressionContext expression(int _p) throws RecognitionException {
		ParserRuleContext _parentctx = _ctx;
		int _parentState = getState();
		ExpressionContext _localctx = new ExpressionContext(_ctx, _parentState);
		ExpressionContext _prevctx = _localctx;
		int _startState = 120;
		enterRecursionRule(_localctx, 120, RULE_expression, _p);
		int _la;
		try {
			int _alt;
			enterOuterAlt(_localctx, 1);
			{
			setState(788);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,72,_ctx) ) {
			case 1:
				{
				setState(784);
				newInstance();
				}
				break;
			case 2:
				{
				setState(785);
				unaryExpression();
				}
				break;
			case 3:
				{
				setState(786);
				term(0);
				}
				break;
			case 4:
				{
				setState(787);
				binaryExpression();
				}
				break;
			}
			_ctx.stop = _input.LT(-1);
			setState(805);
			_errHandler.sync(this);
			_alt = getInterpreter().adaptivePredict(_input,74,_ctx);
			while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER ) {
				if ( _alt==1 ) {
					if ( _parseListeners!=null ) triggerExitRuleEvent();
					_prevctx = _localctx;
					{
					{
					_localctx = new ExpressionContext(_parentctx, _parentState);
					pushNewRecursionContext(_localctx, _startState, RULE_expression);
					setState(790);
					if (!(precpred(_ctx, 1))) throw new FailedPredicateException(this, "precpred(_ctx, 1)");
					setState(791);
					match(IF);
					setState(792);
					expression(0);
					setState(797);
					_errHandler.sync(this);
					_la = _input.LA(1);
					while (_la==ELIF) {
						{
						{
						setState(793);
						match(ELIF);
						setState(794);
						expression(0);
						}
						}
						setState(799);
						_errHandler.sync(this);
						_la = _input.LA(1);
					}
					setState(800);
					match(ELSE);
					setState(801);
					expression(2);
					}
					} 
				}
				setState(807);
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,74,_ctx);
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
		public ThisInstanceContext thisInstance() {
			return getRuleContext(ThisInstanceContext.class,0);
		}
		public BracketedExpressionContext bracketedExpression() {
			return getRuleContext(BracketedExpressionContext.class,0);
		}
		public LitValueContext litValue() {
			return getRuleContext(LitValueContext.class,0);
		}
		public ListContext list() {
			return getRuleContext(ListContext.class,0);
		}
		public DictionaryContext dictionary() {
			return getRuleContext(DictionaryContext.class,0);
		}
		public TupleContext tuple() {
			return getRuleContext(TupleContext.class,0);
		}
		public IdentifierUseContext identifierUse() {
			return getRuleContext(IdentifierUseContext.class,0);
		}
		public MethodCallContext methodCall() {
			return getRuleContext(MethodCallContext.class,0);
		}
		public TermContext term() {
			return getRuleContext(TermContext.class,0);
		}
		public IndexContext index() {
			return getRuleContext(IndexContext.class,0);
		}
		public TerminalNode DOT() { return getToken(PythonParser.DOT, 0); }
		public ChainableContext chainable() {
			return getRuleContext(ChainableContext.class,0);
		}
		public TermContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_term; }
	}

	public final TermContext term() throws RecognitionException {
		return term(0);
	}

	private TermContext term(int _p) throws RecognitionException {
		ParserRuleContext _parentctx = _ctx;
		int _parentState = getState();
		TermContext _localctx = new TermContext(_ctx, _parentState);
		TermContext _prevctx = _localctx;
		int _startState = 122;
		enterRecursionRule(_localctx, 122, RULE_term, _p);
		try {
			int _alt;
			enterOuterAlt(_localctx, 1);
			{
			setState(817);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,75,_ctx) ) {
			case 1:
				{
				setState(809);
				thisInstance();
				}
				break;
			case 2:
				{
				setState(810);
				bracketedExpression();
				}
				break;
			case 3:
				{
				setState(811);
				litValue();
				}
				break;
			case 4:
				{
				setState(812);
				list();
				}
				break;
			case 5:
				{
				setState(813);
				dictionary();
				}
				break;
			case 6:
				{
				setState(814);
				tuple();
				}
				break;
			case 7:
				{
				setState(815);
				identifierUse();
				}
				break;
			case 8:
				{
				setState(816);
				methodCall();
				}
				break;
			}
			_ctx.stop = _input.LT(-1);
			setState(826);
			_errHandler.sync(this);
			_alt = getInterpreter().adaptivePredict(_input,77,_ctx);
			while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER ) {
				if ( _alt==1 ) {
					if ( _parseListeners!=null ) triggerExitRuleEvent();
					_prevctx = _localctx;
					{
					setState(824);
					_errHandler.sync(this);
					switch ( getInterpreter().adaptivePredict(_input,76,_ctx) ) {
					case 1:
						{
						_localctx = new TermContext(_parentctx, _parentState);
						pushNewRecursionContext(_localctx, _startState, RULE_term);
						setState(819);
						if (!(precpred(_ctx, 2))) throw new FailedPredicateException(this, "precpred(_ctx, 2)");
						setState(820);
						index();
						}
						break;
					case 2:
						{
						_localctx = new TermContext(_parentctx, _parentState);
						pushNewRecursionContext(_localctx, _startState, RULE_term);
						setState(821);
						if (!(precpred(_ctx, 1))) throw new FailedPredicateException(this, "precpred(_ctx, 1)");
						setState(822);
						match(DOT);
						setState(823);
						chainable();
						}
						break;
					}
					} 
				}
				setState(828);
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,77,_ctx);
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
		public List<IndexContext> index() {
			return getRuleContexts(IndexContext.class);
		}
		public IndexContext index(int i) {
			return getRuleContext(IndexContext.class,i);
		}
		public ChainableContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_chainable; }
	}

	public final ChainableContext chainable() throws RecognitionException {
		ChainableContext _localctx = new ChainableContext(_ctx, getState());
		enterRule(_localctx, 124, RULE_chainable);
		try {
			int _alt;
			enterOuterAlt(_localctx, 1);
			{
			setState(831);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,78,_ctx) ) {
			case 1:
				{
				setState(829);
				identifierUse();
				}
				break;
			case 2:
				{
				setState(830);
				methodCall();
				}
				break;
			}
			setState(836);
			_errHandler.sync(this);
			_alt = getInterpreter().adaptivePredict(_input,79,_ctx);
			while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER ) {
				if ( _alt==1 ) {
					{
					{
					setState(833);
					index();
					}
					} 
				}
				setState(838);
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,79,_ctx);
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
	public static class ThisInstanceContext extends ParserRuleContext {
		public TerminalNode THIS_INSTANCE() { return getToken(PythonParser.THIS_INSTANCE, 0); }
		public ThisInstanceContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_thisInstance; }
	}

	public final ThisInstanceContext thisInstance() throws RecognitionException {
		ThisInstanceContext _localctx = new ThisInstanceContext(_ctx, getState());
		enterRule(_localctx, 126, RULE_thisInstance);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(839);
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
		enterRule(_localctx, 128, RULE_bracketedExpression);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(841);
			match(OPEN_BRACKET);
			setState(842);
			expression(0);
			setState(843);
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
		enterRule(_localctx, 130, RULE_unaryExpression);
		try {
			setState(847);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case MINUS:
				enterOuterAlt(_localctx, 1);
				{
				setState(845);
				negateNumeric();
				}
				break;
			case NOT:
				enterOuterAlt(_localctx, 2);
				{
				setState(846);
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
		enterRule(_localctx, 132, RULE_negateNumeric);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(849);
			match(MINUS);
			setState(850);
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
		enterRule(_localctx, 134, RULE_negateLogical);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(852);
			match(NOT);
			setState(853);
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
		enterRule(_localctx, 136, RULE_binaryExpression);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(855);
			((BinaryExpressionContext)_localctx).left = term(0);
			setState(856);
			binaryOperator();
			setState(857);
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
		enterRule(_localctx, 138, RULE_list);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(859);
			match(OPEN_SQ_BRACKET);
			setState(860);
			expressionList();
			setState(861);
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
		enterRule(_localctx, 140, RULE_tuple);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(863);
			match(OPEN_BRACKET);
			setState(864);
			expressionList();
			setState(865);
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
		enterRule(_localctx, 142, RULE_dictionary);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(867);
			match(OPEN_BRACE);
			setState(868);
			kvpList();
			setState(869);
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
		enterRule(_localctx, 144, RULE_kvpList);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(871);
			kvp();
			setState(876);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==COMMA) {
				{
				{
				setState(872);
				match(COMMA);
				setState(873);
				kvp();
				}
				}
				setState(878);
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
		public List<ExpressionContext> expression() {
			return getRuleContexts(ExpressionContext.class);
		}
		public ExpressionContext expression(int i) {
			return getRuleContext(ExpressionContext.class,i);
		}
		public TerminalNode COLON() { return getToken(PythonParser.COLON, 0); }
		public KvpContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_kvp; }
	}

	public final KvpContext kvp() throws RecognitionException {
		KvpContext _localctx = new KvpContext(_ctx, getState());
		enterRule(_localctx, 146, RULE_kvp);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(879);
			expression(0);
			setState(880);
			match(COLON);
			setState(881);
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
		enterRule(_localctx, 148, RULE_methodCall);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(883);
			methodName();
			setState(884);
			match(OPEN_BRACKET);
			setState(886);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if ((((_la) & ~0x3f) == 0 && ((1L << _la) & -36028797018963456L) != 0) || ((((_la - 66)) & ~0x3f) == 0 && ((1L << (_la - 66)) & 547609400577L) != 0)) {
				{
				setState(885);
				argList();
				}
			}

			setState(888);
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
		enterRule(_localctx, 150, RULE_binaryOperator);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(890);
			_la = _input.LA(1);
			if ( !(((((_la - 64)) & ~0x3f) == 0 && ((1L << (_la - 64)) & 534773947L) != 0)) ) {
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
		enterRule(_localctx, 152, RULE_newInstance);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(892);
			type();
			setState(893);
			match(OPEN_BRACKET);
			setState(895);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if ((((_la) & ~0x3f) == 0 && ((1L << _la) & -36028797018963456L) != 0) || ((((_la - 66)) & ~0x3f) == 0 && ((1L << (_la - 66)) & 547609400577L) != 0)) {
				{
				setState(894);
				argList();
				}
			}

			setState(897);
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
		public IdentifierDefContext identifierDef() {
			return getRuleContext(IdentifierDefContext.class,0);
		}
		public TerminalNode COLON() { return getToken(PythonParser.COLON, 0); }
		public TypeContext type() {
			return getRuleContext(TypeContext.class,0);
		}
		public ParamDefContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_paramDef; }
	}

	public final ParamDefContext paramDef() throws RecognitionException {
		ParamDefContext _localctx = new ParamDefContext(_ctx, getState());
		enterRule(_localctx, 154, RULE_paramDef);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(899);
			identifierDef();
			setState(900);
			match(COLON);
			setState(901);
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
		enterRule(_localctx, 156, RULE_typeGeneric);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(903);
			typeName();
			setState(904);
			match(OPEN_SQ_BRACKET);
			setState(905);
			type();
			setState(910);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==COMMA) {
				{
				{
				setState(906);
				match(COMMA);
				setState(907);
				type();
				}
				}
				setState(912);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			setState(913);
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
		enterRule(_localctx, 158, RULE_typeFunc);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(915);
			match(FUNC_NAME);
			setState(916);
			match(OPEN_SQ_BRACKET);
			setState(917);
			match(OPEN_SQ_BRACKET);
			setState(918);
			type();
			setState(923);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==COMMA) {
				{
				{
				setState(919);
				match(COMMA);
				setState(920);
				type();
				}
				}
				setState(925);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			setState(926);
			match(CLOSE_SQ_BRACKET);
			setState(927);
			match(COMMA);
			setState(928);
			type();
			setState(929);
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
		enterRule(_localctx, 160, RULE_typeTuple);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(931);
			match(TUPLE);
			setState(932);
			match(OPEN_SQ_BRACKET);
			setState(933);
			type();
			setState(936); 
			_errHandler.sync(this);
			_la = _input.LA(1);
			do {
				{
				{
				setState(934);
				match(COMMA);
				setState(935);
				type();
				}
				}
				setState(938); 
				_errHandler.sync(this);
				_la = _input.LA(1);
			} while ( _la==COMMA );
			setState(940);
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
		enterRule(_localctx, 162, RULE_lambda);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(942);
			match(LAMBDA);
			setState(943);
			paramList();
			setState(944);
			match(COLON);
			setState(945);
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
		enterRule(_localctx, 164, RULE_interpolatedString);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(947);
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
		case 39:
			return assignable_sempred((AssignableContext)_localctx, predIndex);
		case 60:
			return expression_sempred((ExpressionContext)_localctx, predIndex);
		case 61:
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
		"\u0004\u0001{\u03b6\u0002\u0000\u0007\u0000\u0002\u0001\u0007\u0001\u0002"+
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
		"P\u0007P\u0002Q\u0007Q\u0002R\u0007R\u0001\u0000\u0003\u0000\u00a8\b\u0000"+
		"\u0001\u0000\u0005\u0000\u00ab\b\u0000\n\u0000\f\u0000\u00ae\t\u0000\u0001"+
		"\u0000\u0005\u0000\u00b1\b\u0000\n\u0000\f\u0000\u00b4\t\u0000\u0001\u0000"+
		"\u0001\u0000\u0001\u0001\u0001\u0001\u0001\u0001\u0001\u0001\u0001\u0001"+
		"\u0001\u0001\u0001\u0001\u0001\u0001\u0001\u0001\u0003\u0001\u00c1\b\u0001"+
		"\u0001\u0002\u0003\u0002\u00c4\b\u0002\u0001\u0002\u0001\u0002\u0001\u0002"+
		"\u0001\u0002\u0001\u0002\u0001\u0002\u0001\u0002\u0001\u0002\u0001\u0002"+
		"\u0001\u0002\u0005\u0002\u00d0\b\u0002\n\u0002\f\u0002\u00d3\t\u0002\u0001"+
		"\u0002\u0001\u0002\u0001\u0002\u0001\u0003\u0003\u0003\u00d9\b\u0003\u0001"+
		"\u0003\u0001\u0003\u0001\u0003\u0001\u0003\u0003\u0003\u00df\b\u0003\u0001"+
		"\u0003\u0001\u0003\u0001\u0003\u0001\u0003\u0001\u0003\u0001\u0003\u0001"+
		"\u0003\u0005\u0003\u00e8\b\u0003\n\u0003\f\u0003\u00eb\t\u0003\u0001\u0003"+
		"\u0001\u0003\u0001\u0003\u0001\u0003\u0001\u0004\u0003\u0004\u00f2\b\u0004"+
		"\u0001\u0004\u0001\u0004\u0001\u0004\u0001\u0004\u0001\u0004\u0001\u0004"+
		"\u0001\u0004\u0001\u0004\u0001\u0004\u0001\u0004\u0005\u0004\u00fe\b\u0004"+
		"\n\u0004\f\u0004\u0101\t\u0004\u0001\u0004\u0001\u0004\u0001\u0004\u0001"+
		"\u0005\u0003\u0005\u0107\b\u0005\u0001\u0005\u0001\u0005\u0001\u0005\u0001"+
		"\u0005\u0003\u0005\u010d\b\u0005\u0001\u0005\u0001\u0005\u0001\u0005\u0001"+
		"\u0005\u0001\u0005\u0001\u0005\u0001\u0005\u0005\u0005\u0116\b\u0005\n"+
		"\u0005\f\u0005\u0119\t\u0005\u0001\u0005\u0001\u0005\u0001\u0005\u0001"+
		"\u0006\u0003\u0006\u011f\b\u0006\u0001\u0006\u0001\u0006\u0001\u0006\u0001"+
		"\u0006\u0001\u0006\u0001\u0006\u0001\u0007\u0003\u0007\u0128\b\u0007\u0001"+
		"\u0007\u0001\u0007\u0001\u0007\u0001\u0007\u0001\u0007\u0001\u0007\u0001"+
		"\u0007\u0001\u0007\u0001\u0007\u0001\u0007\u0001\u0007\u0001\u0007\u0001"+
		"\b\u0003\b\u0137\b\b\u0001\b\u0001\b\u0001\b\u0001\b\u0001\b\u0001\b\u0003"+
		"\b\u013f\b\b\u0001\b\u0001\b\u0001\b\u0001\b\u0001\b\u0001\b\u0001\b\u0001"+
		"\b\u0005\b\u0149\b\b\n\b\f\b\u014c\t\b\u0001\b\u0001\b\u0001\b\u0001\t"+
		"\u0003\t\u0152\b\t\u0001\t\u0001\t\u0001\t\u0001\t\u0001\t\u0001\t\u0003"+
		"\t\u015a\b\t\u0001\t\u0001\t\u0001\t\u0001\t\u0001\t\u0001\t\u0001\t\u0001"+
		"\t\u0005\t\u0164\b\t\n\t\f\t\u0167\t\t\u0001\t\u0001\t\u0001\t\u0001\n"+
		"\u0001\n\u0001\n\u0001\u000b\u0001\u000b\u0001\f\u0001\f\u0001\f\u0001"+
		"\f\u0001\f\u0001\f\u0001\f\u0001\f\u0001\f\u0003\f\u017a\b\f\u0001\r\u0003"+
		"\r\u017d\b\r\u0001\r\u0001\r\u0001\r\u0001\r\u0001\r\u0001\r\u0001\u000e"+
		"\u0003\u000e\u0186\b\u000e\u0001\u000e\u0001\u000e\u0001\u000e\u0001\u000e"+
		"\u0001\u000e\u0001\u000e\u0001\u000f\u0003\u000f\u018f\b\u000f\u0001\u000f"+
		"\u0001\u000f\u0001\u000f\u0001\u000f\u0001\u000f\u0001\u000f\u0001\u000f"+
		"\u0005\u000f\u0198\b\u000f\n\u000f\f\u000f\u019b\t\u000f\u0001\u000f\u0001"+
		"\u000f\u0001\u000f\u0001\u0010\u0003\u0010\u01a1\b\u0010\u0001\u0010\u0001"+
		"\u0010\u0001\u0010\u0001\u0010\u0001\u0010\u0005\u0010\u01a8\b\u0010\n"+
		"\u0010\f\u0010\u01ab\t\u0010\u0001\u0010\u0001\u0010\u0001\u0010\u0001"+
		"\u0011\u0003\u0011\u01b1\b\u0011\u0001\u0011\u0001\u0011\u0001\u0011\u0001"+
		"\u0011\u0001\u0011\u0001\u0011\u0001\u0011\u0005\u0011\u01ba\b\u0011\n"+
		"\u0011\f\u0011\u01bd\t\u0011\u0001\u0011\u0001\u0011\u0001\u0011\u0001"+
		"\u0012\u0003\u0012\u01c3\b\u0012\u0001\u0012\u0001\u0012\u0001\u0012\u0001"+
		"\u0012\u0001\u0012\u0001\u0012\u0001\u0013\u0001\u0013\u0001\u0013\u0003"+
		"\u0013\u01ce\b\u0013\u0001\u0014\u0001\u0014\u0001\u0014\u0001\u0014\u0001"+
		"\u0015\u0001\u0015\u0001\u0015\u0001\u0015\u0001\u0016\u0001\u0016\u0005"+
		"\u0016\u01da\b\u0016\n\u0016\f\u0016\u01dd\t\u0016\u0001\u0017\u0003\u0017"+
		"\u01e0\b\u0017\u0001\u0017\u0001\u0017\u0001\u0017\u0005\u0017\u01e5\b"+
		"\u0017\n\u0017\f\u0017\u01e8\t\u0017\u0001\u0017\u0001\u0017\u0005\u0017"+
		"\u01ec\b\u0017\n\u0017\f\u0017\u01ef\t\u0017\u0001\u0017\u0001\u0017\u0001"+
		"\u0017\u0001\u0017\u0001\u0018\u0003\u0018\u01f6\b\u0018\u0001\u0018\u0001"+
		"\u0018\u0001\u0018\u0001\u0018\u0001\u0018\u0001\u0018\u0001\u0018\u0001"+
		"\u0019\u0001\u0019\u0003\u0019\u0201\b\u0019\u0001\u001a\u0003\u001a\u0204"+
		"\b\u001a\u0001\u001a\u0001\u001a\u0001\u001a\u0001\u001a\u0001\u001a\u0001"+
		"\u001a\u0001\u001a\u0001\u001a\u0001\u001a\u0001\u001a\u0001\u001b\u0001"+
		"\u001b\u0001\u001b\u0001\u001b\u0001\u001c\u0003\u001c\u0215\b\u001c\u0001"+
		"\u001c\u0001\u001c\u0001\u001c\u0001\u001c\u0001\u001c\u0001\u001c\u0001"+
		"\u001d\u0003\u001d\u021e\b\u001d\u0001\u001d\u0001\u001d\u0001\u001d\u0001"+
		"\u001d\u0001\u001e\u0003\u001e\u0225\b\u001e\u0001\u001e\u0001\u001e\u0001"+
		"\u001e\u0001\u001e\u0001\u001e\u0001\u001e\u0001\u001f\u0003\u001f\u022e"+
		"\b\u001f\u0001\u001f\u0001\u001f\u0001\u001f\u0001\u001f\u0003\u001f\u0234"+
		"\b\u001f\u0001\u001f\u0001\u001f\u0001\u001f\u0001\u001f\u0001\u001f\u0001"+
		"\u001f\u0005\u001f\u023c\b\u001f\n\u001f\f\u001f\u023f\t\u001f\u0001\u001f"+
		"\u0001\u001f\u0001\u001f\u0001 \u0003 \u0245\b \u0001 \u0001 \u0001 \u0001"+
		" \u0001 \u0001 \u0001!\u0003!\u024e\b!\u0001!\u0001!\u0001!\u0001!\u0003"+
		"!\u0254\b!\u0001!\u0001!\u0001!\u0001!\u0001!\u0001!\u0001!\u0005!\u025d"+
		"\b!\n!\f!\u0260\t!\u0001!\u0001!\u0001!\u0001!\u0001\"\u0003\"\u0267\b"+
		"\"\u0001\"\u0001\"\u0001\"\u0001\"\u0003\"\u026d\b\"\u0001\"\u0001\"\u0001"+
		"\"\u0001\"\u0001\"\u0001\"\u0001\"\u0005\"\u0276\b\"\n\"\f\"\u0279\t\""+
		"\u0001\"\u0001\"\u0001\"\u0001#\u0003#\u027f\b#\u0001#\u0001#\u0001#\u0001"+
		"#\u0001#\u0001#\u0003#\u0287\b#\u0001#\u0001#\u0001#\u0001#\u0001#\u0001"+
		"#\u0001#\u0001#\u0001#\u0001$\u0003$\u0293\b$\u0001$\u0001$\u0001$\u0001"+
		"$\u0001$\u0001$\u0003$\u029b\b$\u0001$\u0001$\u0001$\u0001$\u0001$\u0001"+
		"$\u0001$\u0001$\u0001$\u0001%\u0001%\u0001&\u0001&\u0001\'\u0001\'\u0001"+
		"\'\u0001\'\u0001\'\u0003\'\u02af\b\'\u0001\'\u0001\'\u0005\'\u02b3\b\'"+
		"\n\'\f\'\u02b6\t\'\u0001(\u0001(\u0001)\u0001)\u0001*\u0001*\u0001+\u0001"+
		"+\u0001+\u0001+\u0003+\u02c2\b+\u0001,\u0001,\u0001,\u0005,\u02c7\b,\n"+
		",\f,\u02ca\t,\u0001-\u0001-\u0003-\u02ce\b-\u0001.\u0001.\u0001.\u0005"+
		".\u02d3\b.\n.\f.\u02d6\t.\u0001/\u0001/\u0001/\u0004/\u02db\b/\u000b/"+
		"\f/\u02dc\u00010\u00010\u00010\u00050\u02e2\b0\n0\f0\u02e5\t0\u00011\u0001"+
		"1\u00011\u00011\u00031\u02eb\b1\u00012\u00012\u00013\u00013\u00013\u0001"+
		"3\u00013\u00033\u02f4\b3\u00014\u00014\u00014\u00014\u00014\u00014\u0003"+
		"4\u02fc\b4\u00015\u00015\u00016\u00016\u00017\u00017\u00018\u00018\u0001"+
		"9\u00019\u00019\u00019\u0001:\u0001:\u0001;\u0001;\u0001;\u0001;\u0001"+
		"<\u0001<\u0001<\u0001<\u0001<\u0003<\u0315\b<\u0001<\u0001<\u0001<\u0001"+
		"<\u0001<\u0005<\u031c\b<\n<\f<\u031f\t<\u0001<\u0001<\u0001<\u0005<\u0324"+
		"\b<\n<\f<\u0327\t<\u0001=\u0001=\u0001=\u0001=\u0001=\u0001=\u0001=\u0001"+
		"=\u0001=\u0003=\u0332\b=\u0001=\u0001=\u0001=\u0001=\u0001=\u0005=\u0339"+
		"\b=\n=\f=\u033c\t=\u0001>\u0001>\u0003>\u0340\b>\u0001>\u0005>\u0343\b"+
		">\n>\f>\u0346\t>\u0001?\u0001?\u0001@\u0001@\u0001@\u0001@\u0001A\u0001"+
		"A\u0003A\u0350\bA\u0001B\u0001B\u0001B\u0001C\u0001C\u0001C\u0001D\u0001"+
		"D\u0001D\u0001D\u0001E\u0001E\u0001E\u0001E\u0001F\u0001F\u0001F\u0001"+
		"F\u0001G\u0001G\u0001G\u0001G\u0001H\u0001H\u0001H\u0005H\u036b\bH\nH"+
		"\fH\u036e\tH\u0001I\u0001I\u0001I\u0001I\u0001J\u0001J\u0001J\u0003J\u0377"+
		"\bJ\u0001J\u0001J\u0001K\u0001K\u0001L\u0001L\u0001L\u0003L\u0380\bL\u0001"+
		"L\u0001L\u0001M\u0001M\u0001M\u0001M\u0001N\u0001N\u0001N\u0001N\u0001"+
		"N\u0005N\u038d\bN\nN\fN\u0390\tN\u0001N\u0001N\u0001O\u0001O\u0001O\u0001"+
		"O\u0001O\u0001O\u0005O\u039a\bO\nO\fO\u039d\tO\u0001O\u0001O\u0001O\u0001"+
		"O\u0001O\u0001P\u0001P\u0001P\u0001P\u0001P\u0004P\u03a9\bP\u000bP\fP"+
		"\u03aa\u0001P\u0001P\u0001Q\u0001Q\u0001Q\u0001Q\u0001Q\u0001R\u0001R"+
		"\u0001R\u0000\u0003NxzS\u0000\u0002\u0004\u0006\b\n\f\u000e\u0010\u0012"+
		"\u0014\u0016\u0018\u001a\u001c\u001e \"$&(*,.02468:<>@BDFHJLNPRTVXZ\\"+
		"^`bdfhjlnprtvxz|~\u0080\u0082\u0084\u0086\u0088\u008a\u008c\u008e\u0090"+
		"\u0092\u0094\u0096\u0098\u009a\u009c\u009e\u00a0\u00a2\u00a4\u0000\u0005"+
		"\u0002\u00008<bb\u0001\u0000>?\u0001\u0000ce\u0001\u0000gh\u0004\u0000"+
		"@ACEGGU\\\u03e4\u0000\u00a7\u0001\u0000\u0000\u0000\u0002\u00c0\u0001"+
		"\u0000\u0000\u0000\u0004\u00c3\u0001\u0000\u0000\u0000\u0006\u00d8\u0001"+
		"\u0000\u0000\u0000\b\u00f1\u0001\u0000\u0000\u0000\n\u0106\u0001\u0000"+
		"\u0000\u0000\f\u011e\u0001\u0000\u0000\u0000\u000e\u0127\u0001\u0000\u0000"+
		"\u0000\u0010\u0136\u0001\u0000\u0000\u0000\u0012\u0151\u0001\u0000\u0000"+
		"\u0000\u0014\u016b\u0001\u0000\u0000\u0000\u0016\u016e\u0001\u0000\u0000"+
		"\u0000\u0018\u0179\u0001\u0000\u0000\u0000\u001a\u017c\u0001\u0000\u0000"+
		"\u0000\u001c\u0185\u0001\u0000\u0000\u0000\u001e\u018e\u0001\u0000\u0000"+
		"\u0000 \u01a0\u0001\u0000\u0000\u0000\"\u01b0\u0001\u0000\u0000\u0000"+
		"$\u01c2\u0001\u0000\u0000\u0000&\u01cd\u0001\u0000\u0000\u0000(\u01cf"+
		"\u0001\u0000\u0000\u0000*\u01d3\u0001\u0000\u0000\u0000,\u01d7\u0001\u0000"+
		"\u0000\u0000.\u01df\u0001\u0000\u0000\u00000\u01f5\u0001\u0000\u0000\u0000"+
		"2\u0200\u0001\u0000\u0000\u00004\u0203\u0001\u0000\u0000\u00006\u020f"+
		"\u0001\u0000\u0000\u00008\u0214\u0001\u0000\u0000\u0000:\u021d\u0001\u0000"+
		"\u0000\u0000<\u0224\u0001\u0000\u0000\u0000>\u022d\u0001\u0000\u0000\u0000"+
		"@\u0244\u0001\u0000\u0000\u0000B\u024d\u0001\u0000\u0000\u0000D\u0266"+
		"\u0001\u0000\u0000\u0000F\u027e\u0001\u0000\u0000\u0000H\u0292\u0001\u0000"+
		"\u0000\u0000J\u02a5\u0001\u0000\u0000\u0000L\u02a7\u0001\u0000\u0000\u0000"+
		"N\u02ae\u0001\u0000\u0000\u0000P\u02b7\u0001\u0000\u0000\u0000R\u02b9"+
		"\u0001\u0000\u0000\u0000T\u02bb\u0001\u0000\u0000\u0000V\u02c1\u0001\u0000"+
		"\u0000\u0000X\u02c3\u0001\u0000\u0000\u0000Z\u02cd\u0001\u0000\u0000\u0000"+
		"\\\u02cf\u0001\u0000\u0000\u0000^\u02d7\u0001\u0000\u0000\u0000`\u02de"+
		"\u0001\u0000\u0000\u0000b\u02ea\u0001\u0000\u0000\u0000d\u02ec\u0001\u0000"+
		"\u0000\u0000f\u02f3\u0001\u0000\u0000\u0000h\u02fb\u0001\u0000\u0000\u0000"+
		"j\u02fd\u0001\u0000\u0000\u0000l\u02ff\u0001\u0000\u0000\u0000n\u0301"+
		"\u0001\u0000\u0000\u0000p\u0303\u0001\u0000\u0000\u0000r\u0305\u0001\u0000"+
		"\u0000\u0000t\u0309\u0001\u0000\u0000\u0000v\u030b\u0001\u0000\u0000\u0000"+
		"x\u0314\u0001\u0000\u0000\u0000z\u0331\u0001\u0000\u0000\u0000|\u033f"+
		"\u0001\u0000\u0000\u0000~\u0347\u0001\u0000\u0000\u0000\u0080\u0349\u0001"+
		"\u0000\u0000\u0000\u0082\u034f\u0001\u0000\u0000\u0000\u0084\u0351\u0001"+
		"\u0000\u0000\u0000\u0086\u0354\u0001\u0000\u0000\u0000\u0088\u0357\u0001"+
		"\u0000\u0000\u0000\u008a\u035b\u0001\u0000\u0000\u0000\u008c\u035f\u0001"+
		"\u0000\u0000\u0000\u008e\u0363\u0001\u0000\u0000\u0000\u0090\u0367\u0001"+
		"\u0000\u0000\u0000\u0092\u036f\u0001\u0000\u0000\u0000\u0094\u0373\u0001"+
		"\u0000\u0000\u0000\u0096\u037a\u0001\u0000\u0000\u0000\u0098\u037c\u0001"+
		"\u0000\u0000\u0000\u009a\u0383\u0001\u0000\u0000\u0000\u009c\u0387\u0001"+
		"\u0000\u0000\u0000\u009e\u0393\u0001\u0000\u0000\u0000\u00a0\u03a3\u0001"+
		"\u0000\u0000\u0000\u00a2\u03ae\u0001\u0000\u0000\u0000\u00a4\u03b3\u0001"+
		"\u0000\u0000\u0000\u00a6\u00a8\u0003\u0014\n\u0000\u00a7\u00a6\u0001\u0000"+
		"\u0000\u0000\u00a7\u00a8\u0001\u0000\u0000\u0000\u00a8\u00ac\u0001\u0000"+
		"\u0000\u0000\u00a9\u00ab\u0003\u0002\u0001\u0000\u00aa\u00a9\u0001\u0000"+
		"\u0000\u0000\u00ab\u00ae\u0001\u0000\u0000\u0000\u00ac\u00aa\u0001\u0000"+
		"\u0000\u0000\u00ac\u00ad\u0001\u0000\u0000\u0000\u00ad\u00b2\u0001\u0000"+
		"\u0000\u0000\u00ae\u00ac\u0001\u0000\u0000\u0000\u00af\u00b1\u0005_\u0000"+
		"\u0000\u00b0\u00af\u0001\u0000\u0000\u0000\u00b1\u00b4\u0001\u0000\u0000"+
		"\u0000\u00b2\u00b0\u0001\u0000\u0000\u0000\u00b2\u00b3\u0001\u0000\u0000"+
		"\u0000\u00b3\u00b5\u0001\u0000\u0000\u0000\u00b4\u00b2\u0001\u0000\u0000"+
		"\u0000\u00b5\u00b6\u0005\u0000\u0000\u0001\u00b6\u0001\u0001\u0000\u0000"+
		"\u0000\u00b7\u00c1\u0003\u0004\u0002\u0000\u00b8\u00c1\u0003\u0006\u0003"+
		"\u0000\u00b9\u00c1\u0003\b\u0004\u0000\u00ba\u00c1\u0003\n\u0005\u0000"+
		"\u00bb\u00c1\u0003\f\u0006\u0000\u00bc\u00c1\u0003\u000e\u0007\u0000\u00bd"+
		"\u00c1\u0003\u0010\b\u0000\u00be\u00c1\u0003\u0012\t\u0000\u00bf\u00c1"+
		"\u0003\u0014\n\u0000\u00c0\u00b7\u0001\u0000\u0000\u0000\u00c0\u00b8\u0001"+
		"\u0000\u0000\u0000\u00c0\u00b9\u0001\u0000\u0000\u0000\u00c0\u00ba\u0001"+
		"\u0000\u0000\u0000\u00c0\u00bb\u0001\u0000\u0000\u0000\u00c0\u00bc\u0001"+
		"\u0000\u0000\u0000\u00c0\u00bd\u0001\u0000\u0000\u0000\u00c0\u00be\u0001"+
		"\u0000\u0000\u0000\u00c0\u00bf\u0001\u0000\u0000\u0000\u00c1\u0003\u0001"+
		"\u0000\u0000\u0000\u00c2\u00c4\u0005l\u0000\u0000\u00c3\u00c2\u0001\u0000"+
		"\u0000\u0000\u00c3\u00c4\u0001\u0000\u0000\u0000\u00c4\u00c5\u0001\u0000"+
		"\u0000\u0000\u00c5\u00c6\u0005/\u0000\u0000\u00c6\u00c7\u0005\n\u0000"+
		"\u0000\u00c7\u00c8\u0005P\u0000\u0000\u00c8\u00c9\u0005Q\u0000\u0000\u00c9"+
		"\u00ca\u0005Q\u0000\u0000\u00ca\u00cb\u0005F\u0000\u0000\u00cb\u00cc\u0005"+
		"2\u0000\u0000\u00cc\u00cd\u0005T\u0000\u0000\u00cd\u00d1\u0005_\u0000"+
		"\u0000\u00ce\u00d0\u0003\u0018\f\u0000\u00cf\u00ce\u0001\u0000\u0000\u0000"+
		"\u00d0\u00d3\u0001\u0000\u0000\u0000\u00d1\u00cf\u0001\u0000\u0000\u0000"+
		"\u00d1\u00d2\u0001\u0000\u0000\u0000\u00d2\u00d4\u0001\u0000\u0000\u0000"+
		"\u00d3\u00d1\u0001\u0000\u0000\u0000\u00d4\u00d5\u0005{\u0000\u0000\u00d5"+
		"\u00d6\u0005_\u0000\u0000\u00d6\u0005\u0001\u0000\u0000\u0000\u00d7\u00d9"+
		"\u0005l\u0000\u0000\u00d8\u00d7\u0001\u0000\u0000\u0000\u00d8\u00d9\u0001"+
		"\u0000\u0000\u0000\u00d9\u00da\u0001\u0000\u0000\u0000\u00da\u00db\u0005"+
		"/\u0000\u0000\u00db\u00dc\u0003P(\u0000\u00dc\u00de\u0005P\u0000\u0000"+
		"\u00dd\u00df\u0003\\.\u0000\u00de\u00dd\u0001\u0000\u0000\u0000\u00de"+
		"\u00df\u0001\u0000\u0000\u0000\u00df\u00e0\u0001\u0000\u0000\u0000\u00e0"+
		"\u00e1\u0005Q\u0000\u0000\u00e1\u00e2\u0005F\u0000\u0000\u00e2\u00e3\u0003"+
		"b1\u0000\u00e3\u00e4\u0005T\u0000\u0000\u00e4\u00e5\u0005m\u0000\u0000"+
		"\u00e5\u00e9\u0005_\u0000\u0000\u00e6\u00e8\u0003\u0018\f\u0000\u00e7"+
		"\u00e6\u0001\u0000\u0000\u0000\u00e8\u00eb\u0001\u0000\u0000\u0000\u00e9"+
		"\u00e7\u0001\u0000\u0000\u0000\u00e9\u00ea\u0001\u0000\u0000\u0000\u00ea"+
		"\u00ec\u0001\u0000\u0000\u0000\u00eb\u00e9\u0001\u0000\u0000\u0000\u00ec"+
		"\u00ed\u00036\u001b\u0000\u00ed\u00ee\u0005{\u0000\u0000\u00ee\u00ef\u0005"+
		"_\u0000\u0000\u00ef\u0007\u0001\u0000\u0000\u0000\u00f0\u00f2\u0005l\u0000"+
		"\u0000\u00f1\u00f0\u0001\u0000\u0000\u0000\u00f1\u00f2\u0001\u0000\u0000"+
		"\u0000\u00f2\u00f3\u0001\u0000\u0000\u0000\u00f3\u00f4\u0005\u0001\u0000"+
		"\u0000\u00f4\u00f5\u0003R)\u0000\u00f5\u00f6\u0005P\u0000\u0000\u00f6"+
		"\u00f7\u00056\u0000\u0000\u00f7\u00f8\u0005Q\u0000\u0000\u00f8\u00f9\u0005"+
		"{\u0000\u0000\u00f9\u00ff\u0005_\u0000\u0000\u00fa\u00fe\u00034\u001a"+
		"\u0000\u00fb\u00fe\u0003\u001a\r\u0000\u00fc\u00fe\u0003\u0014\n\u0000"+
		"\u00fd\u00fa\u0001\u0000\u0000\u0000\u00fd\u00fb\u0001\u0000\u0000\u0000"+
		"\u00fd\u00fc\u0001\u0000\u0000\u0000\u00fe\u0101\u0001\u0000\u0000\u0000"+
		"\u00ff\u00fd\u0001\u0000\u0000\u0000\u00ff\u0100\u0001\u0000\u0000\u0000"+
		"\u0100\u0102\u0001\u0000\u0000\u0000\u0101\u00ff\u0001\u0000\u0000\u0000"+
		"\u0102\u0103\u0005{\u0000\u0000\u0103\u0104\u0005_\u0000\u0000\u0104\t"+
		"\u0001\u0000\u0000\u0000\u0105\u0107\u0005l\u0000\u0000\u0106\u0105\u0001"+
		"\u0000\u0000\u0000\u0106\u0107\u0001\u0000\u0000\u0000\u0107\u0108\u0001"+
		"\u0000\u0000\u0000\u0108\u0109\u0005/\u0000\u0000\u0109\u010a\u0003P("+
		"\u0000\u010a\u010c\u0005P\u0000\u0000\u010b\u010d\u0003\\.\u0000\u010c"+
		"\u010b\u0001\u0000\u0000\u0000\u010c\u010d\u0001\u0000\u0000\u0000\u010d"+
		"\u010e\u0001\u0000\u0000\u0000\u010e\u010f\u0005Q\u0000\u0000\u010f\u0110"+
		"\u0005F\u0000\u0000\u0110\u0111\u00052\u0000\u0000\u0111\u0112\u0005T"+
		"\u0000\u0000\u0112\u0113\u0005n\u0000\u0000\u0113\u0117\u0005_\u0000\u0000"+
		"\u0114\u0116\u0003\u0018\f\u0000\u0115\u0114\u0001\u0000\u0000\u0000\u0116"+
		"\u0119\u0001\u0000\u0000\u0000\u0117\u0115\u0001\u0000\u0000\u0000\u0117"+
		"\u0118\u0001\u0000\u0000\u0000\u0118\u011a\u0001\u0000\u0000\u0000\u0119"+
		"\u0117\u0001\u0000\u0000\u0000\u011a\u011b\u0005{\u0000\u0000\u011b\u011c"+
		"\u0005_\u0000\u0000\u011c\u000b\u0001\u0000\u0000\u0000\u011d\u011f\u0005"+
		"l\u0000\u0000\u011e\u011d\u0001\u0000\u0000\u0000\u011e\u011f\u0001\u0000"+
		"\u0000\u0000\u011f\u0120\u0001\u0000\u0000\u0000\u0120\u0121\u0003J%\u0000"+
		"\u0121\u0122\u0005C\u0000\u0000\u0122\u0123\u0003V+\u0000\u0123\u0124"+
		"\u0005o\u0000\u0000\u0124\u0125\u0005_\u0000\u0000\u0125\r\u0001\u0000"+
		"\u0000\u0000\u0126\u0128\u0005l\u0000\u0000\u0127\u0126\u0001\u0000\u0000"+
		"\u0000\u0127\u0128\u0001\u0000\u0000\u0000\u0128\u0129\u0001\u0000\u0000"+
		"\u0000\u0129\u012a\u0005\u0001\u0000\u0000\u012a\u012b\u0003T*\u0000\u012b"+
		"\u012c\u0005P\u0000\u0000\u012c\u012d\u0005\u0004\u0000\u0000\u012d\u012e"+
		"\u0005Q\u0000\u0000\u012e\u012f\u0005T\u0000\u0000\u012f\u0130\u0005p"+
		"\u0000\u0000\u0130\u0131\u0005_\u0000\u0000\u0131\u0132\u0003^/\u0000"+
		"\u0132\u0133\u0005_\u0000\u0000\u0133\u0134\u0005{\u0000\u0000\u0134\u000f"+
		"\u0001\u0000\u0000\u0000\u0135\u0137\u0005l\u0000\u0000\u0136\u0135\u0001"+
		"\u0000\u0000\u0000\u0136\u0137\u0001\u0000\u0000\u0000\u0137\u0138\u0001"+
		"\u0000\u0000\u0000\u0138\u0139\u0005\u0001\u0000\u0000\u0139\u013e\u0003"+
		"T*\u0000\u013a\u013b\u0005P\u0000\u0000\u013b\u013c\u0003T*\u0000\u013c"+
		"\u013d\u0005Q\u0000\u0000\u013d\u013f\u0001\u0000\u0000\u0000\u013e\u013a"+
		"\u0001\u0000\u0000\u0000\u013e\u013f\u0001\u0000\u0000\u0000\u013f\u0140"+
		"\u0001\u0000\u0000\u0000\u0140\u0141\u0005T\u0000\u0000\u0141\u0142\u0005"+
		"q\u0000\u0000\u0142\u014a\u0005_\u0000\u0000\u0143\u0149\u0003>\u001f"+
		"\u0000\u0144\u0149\u0003@ \u0000\u0145\u0149\u0003B!\u0000\u0146\u0149"+
		"\u0003D\"\u0000\u0147\u0149\u0003\u0014\n\u0000\u0148\u0143\u0001\u0000"+
		"\u0000\u0000\u0148\u0144\u0001\u0000\u0000\u0000\u0148\u0145\u0001\u0000"+
		"\u0000\u0000\u0148\u0146\u0001\u0000\u0000\u0000\u0148\u0147\u0001\u0000"+
		"\u0000\u0000\u0149\u014c\u0001\u0000\u0000\u0000\u014a\u0148\u0001\u0000"+
		"\u0000\u0000\u014a\u014b\u0001\u0000\u0000\u0000\u014b\u014d\u0001\u0000"+
		"\u0000\u0000\u014c\u014a\u0001\u0000\u0000\u0000\u014d\u014e\u0005{\u0000"+
		"\u0000\u014e\u014f\u0005_\u0000\u0000\u014f\u0011\u0001\u0000\u0000\u0000"+
		"\u0150\u0152\u0005l\u0000\u0000\u0151\u0150\u0001\u0000\u0000\u0000\u0151"+
		"\u0152\u0001\u0000\u0000\u0000\u0152\u0153\u0001\u0000\u0000\u0000\u0153"+
		"\u0154\u0005\u0001\u0000\u0000\u0154\u0159\u0003T*\u0000\u0155\u0156\u0005"+
		"P\u0000\u0000\u0156\u015a\u0003T*\u0000\u0157\u0158\u00055\u0000\u0000"+
		"\u0158\u015a\u0005Q\u0000\u0000\u0159\u0155\u0001\u0000\u0000\u0000\u0159"+
		"\u0157\u0001\u0000\u0000\u0000\u015a\u015b\u0001\u0000\u0000\u0000\u015b"+
		"\u015c\u0005r\u0000\u0000\u015c\u0165\u0005_\u0000\u0000\u015d\u0164\u0003"+
		"@ \u0000\u015e\u0164\u0003B!\u0000\u015f\u0164\u0003D\"\u0000\u0160\u0164"+
		"\u0003F#\u0000\u0161\u0164\u0003H$\u0000\u0162\u0164\u0003\u0014\n\u0000"+
		"\u0163\u015d\u0001\u0000\u0000\u0000\u0163\u015e\u0001\u0000\u0000\u0000"+
		"\u0163\u015f\u0001\u0000\u0000\u0000\u0163\u0160\u0001\u0000\u0000\u0000"+
		"\u0163\u0161\u0001\u0000\u0000\u0000\u0163\u0162\u0001\u0000\u0000\u0000"+
		"\u0164\u0167\u0001\u0000\u0000\u0000\u0165\u0163\u0001\u0000\u0000\u0000"+
		"\u0165\u0166\u0001\u0000\u0000\u0000\u0166\u0168\u0001\u0000\u0000\u0000"+
		"\u0167\u0165\u0001\u0000\u0000\u0000\u0168\u0169\u0005{\u0000\u0000\u0169"+
		"\u016a\u0005_\u0000\u0000\u016a\u0013\u0001\u0000\u0000\u0000\u016b\u016c"+
		"\u0003\u0016\u000b\u0000\u016c\u016d\u0005_\u0000\u0000\u016d\u0015\u0001"+
		"\u0000\u0000\u0000\u016e\u016f\u0005{\u0000\u0000\u016f\u0017\u0001\u0000"+
		"\u0000\u0000\u0170\u017a\u0003\u001a\r\u0000\u0171\u017a\u0003\u001c\u000e"+
		"\u0000\u0172\u017a\u0003\u001e\u000f\u0000\u0173\u017a\u0003 \u0010\u0000"+
		"\u0174\u017a\u0003\"\u0011\u0000\u0175\u017a\u0003$\u0012\u0000\u0176"+
		"\u017a\u0003.\u0017\u0000\u0177\u017a\u00030\u0018\u0000\u0178\u017a\u0003"+
		"\u0014\n\u0000\u0179\u0170\u0001\u0000\u0000\u0000\u0179\u0171\u0001\u0000"+
		"\u0000\u0000\u0179\u0172\u0001\u0000\u0000\u0000\u0179\u0173\u0001\u0000"+
		"\u0000\u0000\u0179\u0174\u0001\u0000\u0000\u0000\u0179\u0175\u0001\u0000"+
		"\u0000\u0000\u0179\u0176\u0001\u0000\u0000\u0000\u0179\u0177\u0001\u0000"+
		"\u0000\u0000\u0179\u0178\u0001\u0000\u0000\u0000\u017a\u0019\u0001\u0000"+
		"\u0000\u0000\u017b\u017d\u0005l\u0000\u0000\u017c\u017b\u0001\u0000\u0000"+
		"\u0000\u017c\u017d\u0001\u0000\u0000\u0000\u017d\u017e\u0001\u0000\u0000"+
		"\u0000\u017e\u017f\u0003J%\u0000\u017f\u0180\u0005C\u0000\u0000\u0180"+
		"\u0181\u0003x<\u0000\u0181\u0182\u0005s\u0000\u0000\u0182\u0183\u0005"+
		"_\u0000\u0000\u0183\u001b\u0001\u0000\u0000\u0000\u0184\u0186\u0005l\u0000"+
		"\u0000\u0185\u0184\u0001\u0000\u0000\u0000\u0185\u0186\u0001\u0000\u0000"+
		"\u0000\u0186\u0187\u0001\u0000\u0000\u0000\u0187\u0188\u0003N\'\u0000"+
		"\u0188\u0189\u0005C\u0000\u0000\u0189\u018a\u0003x<\u0000\u018a\u018b"+
		"\u0005t\u0000\u0000\u018b\u018c\u0005_\u0000\u0000\u018c\u001d\u0001\u0000"+
		"\u0000\u0000\u018d\u018f\u0005l\u0000\u0000\u018e\u018d\u0001\u0000\u0000"+
		"\u0000\u018e\u018f\u0001\u0000\u0000\u0000\u018f\u0190\u0001\u0000\u0000"+
		"\u0000\u0190\u0191\u0005\u0006\u0000\u0000\u0191\u0192\u0003x<\u0000\u0192"+
		"\u0193\u0005T\u0000\u0000\u0193\u0199\u0005_\u0000\u0000\u0194\u0198\u0003"+
		"8\u001c\u0000\u0195\u0198\u0003:\u001d\u0000\u0196\u0198\u0003\u0018\f"+
		"\u0000\u0197\u0194\u0001\u0000\u0000\u0000\u0197\u0195\u0001\u0000\u0000"+
		"\u0000\u0197\u0196\u0001\u0000\u0000\u0000\u0198\u019b\u0001\u0000\u0000"+
		"\u0000\u0199\u0197\u0001\u0000\u0000\u0000\u0199\u019a\u0001\u0000\u0000"+
		"\u0000\u019a\u019c\u0001\u0000\u0000\u0000\u019b\u0199\u0001\u0000\u0000"+
		"\u0000\u019c\u019d\u0005{\u0000\u0000\u019d\u019e\u0005_\u0000\u0000\u019e"+
		"\u001f\u0001\u0000\u0000\u0000\u019f\u01a1\u0005l\u0000\u0000\u01a0\u019f"+
		"\u0001\u0000\u0000\u0000\u01a0\u01a1\u0001\u0000\u0000\u0000\u01a1\u01a2"+
		"\u0001\u0000\u0000\u0000\u01a2\u01a3\u0005\u000e\u0000\u0000\u01a3\u01a4"+
		"\u0003x<\u0000\u01a4\u01a5\u0005T\u0000\u0000\u01a5\u01a9\u0005_\u0000"+
		"\u0000\u01a6\u01a8\u0003\u0018\f\u0000\u01a7\u01a6\u0001\u0000\u0000\u0000"+
		"\u01a8\u01ab\u0001\u0000\u0000\u0000\u01a9\u01a7\u0001\u0000\u0000\u0000"+
		"\u01a9\u01aa\u0001\u0000\u0000\u0000\u01aa\u01ac\u0001\u0000\u0000\u0000"+
		"\u01ab\u01a9\u0001\u0000\u0000\u0000\u01ac\u01ad\u0005{\u0000\u0000\u01ad"+
		"\u01ae\u0005_\u0000\u0000\u01ae!\u0001\u0000\u0000\u0000\u01af\u01b1\u0005"+
		"l\u0000\u0000\u01b0\u01af\u0001\u0000\u0000\u0000\u01b0\u01b1\u0001\u0000"+
		"\u0000\u0000\u01b1\u01b2\u0001\u0000\u0000\u0000\u01b2\u01b3\u0005\u0005"+
		"\u0000\u0000\u01b3\u01b4\u0003J%\u0000\u01b4\u01b5\u0005\u0007\u0000\u0000"+
		"\u01b5\u01b6\u0003x<\u0000\u01b6\u01b7\u0005T\u0000\u0000\u01b7\u01bb"+
		"\u0005_\u0000\u0000\u01b8\u01ba\u0003\u0018\f\u0000\u01b9\u01b8\u0001"+
		"\u0000\u0000\u0000\u01ba\u01bd\u0001\u0000\u0000\u0000\u01bb\u01b9\u0001"+
		"\u0000\u0000\u0000\u01bb\u01bc\u0001\u0000\u0000\u0000\u01bc\u01be\u0001"+
		"\u0000\u0000\u0000\u01bd\u01bb\u0001\u0000\u0000\u0000\u01be\u01bf\u0005"+
		"{\u0000\u0000\u01bf\u01c0\u0005_\u0000\u0000\u01c0#\u0001\u0000\u0000"+
		"\u0000\u01c1\u01c3\u0005l\u0000\u0000\u01c2\u01c1\u0001\u0000\u0000\u0000"+
		"\u01c2\u01c3\u0001\u0000\u0000\u0000\u01c3\u01c4\u0001\u0000\u0000\u0000"+
		"\u01c4\u01c5\u0003&\u0013\u0000\u01c5\u01c6\u0005P\u0000\u0000\u01c6\u01c7"+
		"\u0003X,\u0000\u01c7\u01c8\u0005Q\u0000\u0000\u01c8\u01c9\u0005_\u0000"+
		"\u0000\u01c9%\u0001\u0000\u0000\u0000\u01ca\u01ce\u0003P(\u0000\u01cb"+
		"\u01ce\u0003(\u0014\u0000\u01cc\u01ce\u0003*\u0015\u0000\u01cd\u01ca\u0001"+
		"\u0000\u0000\u0000\u01cd\u01cb\u0001\u0000\u0000\u0000\u01cd\u01cc\u0001"+
		"\u0000\u0000\u0000\u01ce\'\u0001\u0000\u0000\u0000\u01cf\u01d0\u0005J"+
		"\u0000\u0000\u01d0\u01d1\u0005R\u0000\u0000\u01d1\u01d2\u0003P(\u0000"+
		"\u01d2)\u0001\u0000\u0000\u0000\u01d3\u01d4\u0003,\u0016\u0000\u01d4\u01d5"+
		"\u0005R\u0000\u0000\u01d5\u01d6\u0003P(\u0000\u01d6+\u0001\u0000\u0000"+
		"\u0000\u01d7\u01db\u0003L&\u0000\u01d8\u01da\u0003v;\u0000\u01d9\u01d8"+
		"\u0001\u0000\u0000\u0000\u01da\u01dd\u0001\u0000\u0000\u0000\u01db\u01d9"+
		"\u0001\u0000\u0000\u0000\u01db\u01dc\u0001\u0000\u0000\u0000\u01dc-\u0001"+
		"\u0000\u0000\u0000\u01dd\u01db\u0001\u0000\u0000\u0000\u01de\u01e0\u0005"+
		"l\u0000\u0000\u01df\u01de\u0001\u0000\u0000\u0000\u01df\u01e0\u0001\u0000"+
		"\u0000\u0000\u01e0\u01e1\u0001\u0000\u0000\u0000\u01e1\u01e2\u0005\r\u0000"+
		"\u0000\u01e2\u01e6\u0005_\u0000\u0000\u01e3\u01e5\u0003\u0018\f\u0000"+
		"\u01e4\u01e3\u0001\u0000\u0000\u0000\u01e5\u01e8\u0001\u0000\u0000\u0000"+
		"\u01e6\u01e4\u0001\u0000\u0000\u0000\u01e6\u01e7\u0001\u0000\u0000\u0000"+
		"\u01e7\u01e9\u0001\u0000\u0000\u0000\u01e8\u01e6\u0001\u0000\u0000\u0000"+
		"\u01e9\u01ed\u0003<\u001e\u0000\u01ea\u01ec\u0003\u0018\f\u0000\u01eb"+
		"\u01ea\u0001\u0000\u0000\u0000\u01ec\u01ef\u0001\u0000\u0000\u0000\u01ed"+
		"\u01eb\u0001\u0000\u0000\u0000\u01ed\u01ee\u0001\u0000\u0000\u0000\u01ee"+
		"\u01f0\u0001\u0000\u0000\u0000\u01ef\u01ed\u0001\u0000\u0000\u0000\u01f0"+
		"\u01f1\u0005\u001a\u0000\u0000\u01f1\u01f2\u0005\r\u0000\u0000\u01f2\u01f3"+
		"\u0005_\u0000\u0000\u01f3/\u0001\u0000\u0000\u0000\u01f4\u01f6\u0005l"+
		"\u0000\u0000\u01f5\u01f4\u0001\u0000\u0000\u0000\u01f5\u01f6\u0001\u0000"+
		"\u0000\u0000\u01f6\u01f7\u0001\u0000\u0000\u0000\u01f7\u01f8\u00054\u0000"+
		"\u0000\u01f8\u01f9\u0003T*\u0000\u01f9\u01fa\u0005P\u0000\u0000\u01fa"+
		"\u01fb\u00032\u0019\u0000\u01fb\u01fc\u0005Q\u0000\u0000\u01fc\u01fd\u0005"+
		"_\u0000\u0000\u01fd1\u0001\u0000\u0000\u0000\u01fe\u0201\u0003p8\u0000"+
		"\u01ff\u0201\u0003L&\u0000\u0200\u01fe\u0001\u0000\u0000\u0000\u0200\u01ff"+
		"\u0001\u0000\u0000\u0000\u02013\u0001\u0000\u0000\u0000\u0202\u0204\u0005"+
		"l\u0000\u0000\u0203\u0202\u0001\u0000\u0000\u0000\u0203\u0204\u0001\u0000"+
		"\u0000\u0000\u0204\u0205\u0001\u0000\u0000\u0000\u0205\u0206\u0005J\u0000"+
		"\u0000\u0206\u0207\u0005R\u0000\u0000\u0207\u0208\u0005-\u0000\u0000\u0208"+
		"\u0209\u0005P\u0000\u0000\u0209\u020a\u0003d2\u0000\u020a\u020b\u0005"+
		"S\u0000\u0000\u020b\u020c\u0003f3\u0000\u020c\u020d\u0005Q\u0000\u0000"+
		"\u020d\u020e\u0005_\u0000\u0000\u020e5\u0001\u0000\u0000\u0000\u020f\u0210"+
		"\u0005\f\u0000\u0000\u0210\u0211\u0003x<\u0000\u0211\u0212\u0005_\u0000"+
		"\u0000\u02127\u0001\u0000\u0000\u0000\u0213\u0215\u0005l\u0000\u0000\u0214"+
		"\u0213\u0001\u0000\u0000\u0000\u0214\u0215\u0001\u0000\u0000\u0000\u0215"+
		"\u0216\u0001\u0000\u0000\u0000\u0216\u0217\u0005\u0002\u0000\u0000\u0217"+
		"\u0218\u0003x<\u0000\u0218\u0219\u0005T\u0000\u0000\u0219\u021a\u0005"+
		"w\u0000\u0000\u021a\u021b\u0005_\u0000\u0000\u021b9\u0001\u0000\u0000"+
		"\u0000\u021c\u021e\u0005l\u0000\u0000\u021d\u021c\u0001\u0000\u0000\u0000"+
		"\u021d\u021e\u0001\u0000\u0000\u0000\u021e\u021f\u0001\u0000\u0000\u0000"+
		"\u021f\u0220\u0005\u0003\u0000\u0000\u0220\u0221\u0005T\u0000\u0000\u0221"+
		"\u0222\u0005_\u0000\u0000\u0222;\u0001\u0000\u0000\u0000\u0223\u0225\u0005"+
		"l\u0000\u0000\u0224\u0223\u0001\u0000\u0000\u0000\u0224\u0225\u0001\u0000"+
		"\u0000\u0000\u0225\u0226\u0001\u0000\u0000\u0000\u0226\u0227\u00050\u0000"+
		"\u0000\u0227\u0228\u0003T*\u0000\u0228\u0229\u0005.\u0000\u0000\u0229"+
		"\u022a\u0003J%\u0000\u022a\u022b\u0005_\u0000\u0000\u022b=\u0001\u0000"+
		"\u0000\u0000\u022c\u022e\u0005l\u0000\u0000\u022d\u022c\u0001\u0000\u0000"+
		"\u0000\u022d\u022e\u0001\u0000\u0000\u0000\u022e\u022f\u0001\u0000\u0000"+
		"\u0000\u022f\u0230\u0005/\u0000\u0000\u0230\u0231\u00051\u0000\u0000\u0231"+
		"\u0233\u0005P\u0000\u0000\u0232\u0234\u0003\\.\u0000\u0233\u0232\u0001"+
		"\u0000\u0000\u0000\u0233\u0234\u0001\u0000\u0000\u0000\u0234\u0235\u0001"+
		"\u0000\u0000\u0000\u0235\u0236\u0005Q\u0000\u0000\u0236\u0237\u0005F\u0000"+
		"\u0000\u0237\u0238\u00052\u0000\u0000\u0238\u0239\u0005T\u0000\u0000\u0239"+
		"\u023d\u0005_\u0000\u0000\u023a\u023c\u0003\u0018\f\u0000\u023b\u023a"+
		"\u0001\u0000\u0000\u0000\u023c\u023f\u0001\u0000\u0000\u0000\u023d\u023b"+
		"\u0001\u0000\u0000\u0000\u023d\u023e\u0001\u0000\u0000\u0000\u023e\u0240"+
		"\u0001\u0000\u0000\u0000\u023f\u023d\u0001\u0000\u0000\u0000\u0240\u0241"+
		"\u0005{\u0000\u0000\u0241\u0242\u0005_\u0000\u0000\u0242?\u0001\u0000"+
		"\u0000\u0000\u0243\u0245\u0005l\u0000\u0000\u0244\u0243\u0001\u0000\u0000"+
		"\u0000\u0244\u0245\u0001\u0000\u0000\u0000\u0245\u0246\u0001\u0000\u0000"+
		"\u0000\u0246\u0247\u0003J%\u0000\u0247\u0248\u0005T\u0000\u0000\u0248"+
		"\u0249\u0003b1\u0000\u0249\u024a\u0005x\u0000\u0000\u024a\u024b\u0005"+
		"_\u0000\u0000\u024bA\u0001\u0000\u0000\u0000\u024c\u024e\u0005l\u0000"+
		"\u0000\u024d\u024c\u0001\u0000\u0000\u0000\u024d\u024e\u0001\u0000\u0000"+
		"\u0000\u024e\u024f\u0001\u0000\u0000\u0000\u024f\u0250\u0005/\u0000\u0000"+
		"\u0250\u0251\u0003P(\u0000\u0251\u0253\u0005P\u0000\u0000\u0252\u0254"+
		"\u0003\\.\u0000\u0253\u0252\u0001\u0000\u0000\u0000\u0253\u0254\u0001"+
		"\u0000\u0000\u0000\u0254\u0255\u0001\u0000\u0000\u0000\u0255\u0256\u0005"+
		"Q\u0000\u0000\u0256\u0257\u0005F\u0000\u0000\u0257\u0258\u0003b1\u0000"+
		"\u0258\u0259\u0005T\u0000\u0000\u0259\u025a\u0005y\u0000\u0000\u025a\u025e"+
		"\u0005_\u0000\u0000\u025b\u025d\u0003\u0018\f\u0000\u025c\u025b\u0001"+
		"\u0000\u0000\u0000\u025d\u0260\u0001\u0000\u0000\u0000\u025e\u025c\u0001"+
		"\u0000\u0000\u0000\u025e\u025f\u0001\u0000\u0000\u0000\u025f\u0261\u0001"+
		"\u0000\u0000\u0000\u0260\u025e\u0001\u0000\u0000\u0000\u0261\u0262\u0003"+
		"6\u001b\u0000\u0262\u0263\u0005{\u0000\u0000\u0263\u0264\u0005_\u0000"+
		"\u0000\u0264C\u0001\u0000\u0000\u0000\u0265\u0267\u0005l\u0000\u0000\u0266"+
		"\u0265\u0001\u0000\u0000\u0000\u0266\u0267\u0001\u0000\u0000\u0000\u0267"+
		"\u0268\u0001\u0000\u0000\u0000\u0268\u0269\u0005/\u0000\u0000\u0269\u026a"+
		"\u0003P(\u0000\u026a\u026c\u0005P\u0000\u0000\u026b\u026d\u0003\\.\u0000"+
		"\u026c\u026b\u0001\u0000\u0000\u0000\u026c\u026d\u0001\u0000\u0000\u0000"+
		"\u026d\u026e\u0001\u0000\u0000\u0000\u026e\u026f\u0005Q\u0000\u0000\u026f"+
		"\u0270\u0005F\u0000\u0000\u0270\u0271\u00052\u0000\u0000\u0271\u0272\u0005"+
		"T\u0000\u0000\u0272\u0273\u0005z\u0000\u0000\u0273\u0277\u0005_\u0000"+
		"\u0000\u0274\u0276\u0003\u0018\f\u0000\u0275\u0274\u0001\u0000\u0000\u0000"+
		"\u0276\u0279\u0001\u0000\u0000\u0000\u0277\u0275\u0001\u0000\u0000\u0000"+
		"\u0277\u0278\u0001\u0000\u0000\u0000\u0278\u027a\u0001\u0000\u0000\u0000"+
		"\u0279\u0277\u0001\u0000\u0000\u0000\u027a\u027b\u0005{\u0000\u0000\u027b"+
		"\u027c\u0005_\u0000\u0000\u027cE\u0001\u0000\u0000\u0000\u027d\u027f\u0005"+
		"l\u0000\u0000\u027e\u027d\u0001\u0000\u0000\u0000\u027e\u027f\u0001\u0000"+
		"\u0000\u0000\u027f\u0280\u0001\u0000\u0000\u0000\u0280\u0281\u0005,\u0000"+
		"\u0000\u0281\u0282\u0005_\u0000\u0000\u0282\u0283\u0005/\u0000\u0000\u0283"+
		"\u0284\u0003P(\u0000\u0284\u0286\u0005P\u0000\u0000\u0285\u0287\u0003"+
		"\\.\u0000\u0286\u0285\u0001\u0000\u0000\u0000\u0286\u0287\u0001\u0000"+
		"\u0000\u0000\u0287\u0288\u0001\u0000\u0000\u0000\u0288\u0289\u0005Q\u0000"+
		"\u0000\u0289\u028a\u0005F\u0000\u0000\u028a\u028b\u0003b1\u0000\u028b"+
		"\u028c\u0005T\u0000\u0000\u028c\u028d\u0005_\u0000\u0000\u028d\u028e\u0005"+
		"3\u0000\u0000\u028e\u028f\u0005{\u0000\u0000\u028f\u0290\u0005_\u0000"+
		"\u0000\u0290G\u0001\u0000\u0000\u0000\u0291\u0293\u0005l\u0000\u0000\u0292"+
		"\u0291\u0001\u0000\u0000\u0000\u0292\u0293\u0001\u0000\u0000\u0000\u0293"+
		"\u0294\u0001\u0000\u0000\u0000\u0294\u0295\u0005,\u0000\u0000\u0295\u0296"+
		"\u0005_\u0000\u0000\u0296\u0297\u0005/\u0000\u0000\u0297\u0298\u0003P"+
		"(\u0000\u0298\u029a\u0005P\u0000\u0000\u0299\u029b\u0003\\.\u0000\u029a"+
		"\u0299\u0001\u0000\u0000\u0000\u029a\u029b\u0001\u0000\u0000\u0000\u029b"+
		"\u029c\u0001\u0000\u0000\u0000\u029c\u029d\u0005Q\u0000\u0000\u029d\u029e"+
		"\u0005F\u0000\u0000\u029e\u029f\u00052\u0000\u0000\u029f\u02a0\u0005T"+
		"\u0000\u0000\u02a0\u02a1\u0005_\u0000\u0000\u02a1\u02a2\u00053\u0000\u0000"+
		"\u02a2\u02a3\u0005{\u0000\u0000\u02a3\u02a4\u0005_\u0000\u0000\u02a4I"+
		"\u0001\u0000\u0000\u0000\u02a5\u02a6\u0005a\u0000\u0000\u02a6K\u0001\u0000"+
		"\u0000\u0000\u02a7\u02a8\u0005a\u0000\u0000\u02a8M\u0001\u0000\u0000\u0000"+
		"\u02a9\u02aa\u0006\'\uffff\uffff\u0000\u02aa\u02af\u0003L&\u0000\u02ab"+
		"\u02ac\u0005J\u0000\u0000\u02ac\u02ad\u0005R\u0000\u0000\u02ad\u02af\u0003"+
		"L&\u0000\u02ae\u02a9\u0001\u0000\u0000\u0000\u02ae\u02ab\u0001\u0000\u0000"+
		"\u0000\u02af\u02b4\u0001\u0000\u0000\u0000\u02b0\u02b1\n\u0001\u0000\u0000"+
		"\u02b1\u02b3\u0003v;\u0000\u02b2\u02b0\u0001\u0000\u0000\u0000\u02b3\u02b6"+
		"\u0001\u0000\u0000\u0000\u02b4\u02b2\u0001\u0000\u0000\u0000\u02b4\u02b5"+
		"\u0001\u0000\u0000\u0000\u02b5O\u0001\u0000\u0000\u0000\u02b6\u02b4\u0001"+
		"\u0000\u0000\u0000\u02b7\u02b8\u0005a\u0000\u0000\u02b8Q\u0001\u0000\u0000"+
		"\u0000\u02b9\u02ba\u0005`\u0000\u0000\u02baS\u0001\u0000\u0000\u0000\u02bb"+
		"\u02bc\u0007\u0000\u0000\u0000\u02bcU\u0001\u0000\u0000\u0000\u02bd\u02c2"+
		"\u0003j5\u0000\u02be\u02c2\u0003l6\u0000\u02bf\u02c2\u0003n7\u0000\u02c0"+
		"\u02c2\u0003p8\u0000\u02c1\u02bd\u0001\u0000\u0000\u0000\u02c1\u02be\u0001"+
		"\u0000\u0000\u0000\u02c1\u02bf\u0001\u0000\u0000\u0000\u02c1\u02c0\u0001"+
		"\u0000\u0000\u0000\u02c2W\u0001\u0000\u0000\u0000\u02c3\u02c8\u0003Z-"+
		"\u0000\u02c4\u02c5\u0005S\u0000\u0000\u02c5\u02c7\u0003Z-\u0000\u02c6"+
		"\u02c4\u0001\u0000\u0000\u0000\u02c7\u02ca\u0001\u0000\u0000\u0000\u02c8"+
		"\u02c6\u0001\u0000\u0000\u0000\u02c8\u02c9\u0001\u0000\u0000\u0000\u02c9"+
		"Y\u0001\u0000\u0000\u0000\u02ca\u02c8\u0001\u0000\u0000\u0000\u02cb\u02ce"+
		"\u0003\u00a2Q\u0000\u02cc\u02ce\u0003x<\u0000\u02cd\u02cb\u0001\u0000"+
		"\u0000\u0000\u02cd\u02cc\u0001\u0000\u0000\u0000\u02ce[\u0001\u0000\u0000"+
		"\u0000\u02cf\u02d4\u0003\u009aM\u0000\u02d0\u02d1\u0005S\u0000\u0000\u02d1"+
		"\u02d3\u0003\u009aM\u0000\u02d2\u02d0\u0001\u0000\u0000\u0000\u02d3\u02d6"+
		"\u0001\u0000\u0000\u0000\u02d4\u02d2\u0001\u0000\u0000\u0000\u02d4\u02d5"+
		"\u0001\u0000\u0000\u0000\u02d5]\u0001\u0000\u0000\u0000\u02d6\u02d4\u0001"+
		"\u0000\u0000\u0000\u02d7\u02da\u0003J%\u0000\u02d8\u02d9\u0005S\u0000"+
		"\u0000\u02d9\u02db\u0003J%\u0000\u02da\u02d8\u0001\u0000\u0000\u0000\u02db"+
		"\u02dc\u0001\u0000\u0000\u0000\u02dc\u02da\u0001\u0000\u0000\u0000\u02dc"+
		"\u02dd\u0001\u0000\u0000\u0000\u02dd_\u0001\u0000\u0000\u0000\u02de\u02e3"+
		"\u0003x<\u0000\u02df\u02e0\u0005S\u0000\u0000\u02e0\u02e2\u0003x<\u0000"+
		"\u02e1\u02df\u0001\u0000\u0000\u0000\u02e2\u02e5\u0001\u0000\u0000\u0000"+
		"\u02e3\u02e1\u0001\u0000\u0000\u0000\u02e3\u02e4\u0001\u0000\u0000\u0000"+
		"\u02e4a\u0001\u0000\u0000\u0000\u02e5\u02e3\u0001\u0000\u0000\u0000\u02e6"+
		"\u02eb\u0003\u00a0P\u0000\u02e7\u02eb\u0003T*\u0000\u02e8\u02eb\u0003"+
		"\u009cN\u0000\u02e9\u02eb\u0003\u009eO\u0000\u02ea\u02e6\u0001\u0000\u0000"+
		"\u0000\u02ea\u02e7\u0001\u0000\u0000\u0000\u02ea\u02e8\u0001\u0000\u0000"+
		"\u0000\u02ea\u02e9\u0001\u0000\u0000\u0000\u02ebc\u0001\u0000\u0000\u0000"+
		"\u02ec\u02ed\u0003x<\u0000\u02ede\u0001\u0000\u0000\u0000\u02ee\u02f4"+
		"\u0003h4\u0000\u02ef\u02f4\u0003\u008aE\u0000\u02f0\u02f4\u0003\u008e"+
		"G\u0000\u02f1\u02f4\u0003\u0082A\u0000\u02f2\u02f4\u0003\u008cF\u0000"+
		"\u02f3\u02ee\u0001\u0000\u0000\u0000\u02f3\u02ef\u0001\u0000\u0000\u0000"+
		"\u02f3\u02f0\u0001\u0000\u0000\u0000\u02f3\u02f1\u0001\u0000\u0000\u0000"+
		"\u02f3\u02f2\u0001\u0000\u0000\u0000\u02f4g\u0001\u0000\u0000\u0000\u02f5"+
		"\u02fc\u0003j5\u0000\u02f6\u02fc\u0003l6\u0000\u02f7\u02fc\u0003n7\u0000"+
		"\u02f8\u02fc\u0003p8\u0000\u02f9\u02fc\u0003\u00a4R\u0000\u02fa\u02fc"+
		"\u0003r9\u0000\u02fb\u02f5\u0001\u0000\u0000\u0000\u02fb\u02f6\u0001\u0000"+
		"\u0000\u0000\u02fb\u02f7\u0001\u0000\u0000\u0000\u02fb\u02f8\u0001\u0000"+
		"\u0000\u0000\u02fb\u02f9\u0001\u0000\u0000\u0000\u02fb\u02fa\u0001\u0000"+
		"\u0000\u0000\u02fci\u0001\u0000\u0000\u0000\u02fd\u02fe\u0007\u0001\u0000"+
		"\u0000\u02fek\u0001\u0000\u0000\u0000\u02ff\u0300\u0007\u0002\u0000\u0000"+
		"\u0300m\u0001\u0000\u0000\u0000\u0301\u0302\u0005f\u0000\u0000\u0302o"+
		"\u0001\u0000\u0000\u0000\u0303\u0304\u0007\u0003\u0000\u0000\u0304q\u0001"+
		"\u0000\u0000\u0000\u0305\u0306\u0003T*\u0000\u0306\u0307\u0005R\u0000"+
		"\u0000\u0307\u0308\u0003L&\u0000\u0308s\u0001\u0000\u0000\u0000\u0309"+
		"\u030a\u0005i\u0000\u0000\u030au\u0001\u0000\u0000\u0000\u030b\u030c\u0005"+
		"N\u0000\u0000\u030c\u030d\u0003x<\u0000\u030d\u030e\u0005O\u0000\u0000"+
		"\u030ew\u0001\u0000\u0000\u0000\u030f\u0310\u0006<\uffff\uffff\u0000\u0310"+
		"\u0315\u0003\u0098L\u0000\u0311\u0315\u0003\u0082A\u0000\u0312\u0315\u0003"+
		"z=\u0000\u0313\u0315\u0003\u0088D\u0000\u0314\u030f\u0001\u0000\u0000"+
		"\u0000\u0314\u0311\u0001\u0000\u0000\u0000\u0314\u0312\u0001\u0000\u0000"+
		"\u0000\u0314\u0313\u0001\u0000\u0000\u0000\u0315\u0325\u0001\u0000\u0000"+
		"\u0000\u0316\u0317\n\u0001\u0000\u0000\u0317\u0318\u0005\u0006\u0000\u0000"+
		"\u0318\u031d\u0003x<\u0000\u0319\u031a\u0005\u0002\u0000\u0000\u031a\u031c"+
		"\u0003x<\u0000\u031b\u0319\u0001\u0000\u0000\u0000\u031c\u031f\u0001\u0000"+
		"\u0000\u0000\u031d\u031b\u0001\u0000\u0000\u0000\u031d\u031e\u0001\u0000"+
		"\u0000\u0000\u031e\u0320\u0001\u0000\u0000\u0000\u031f\u031d\u0001\u0000"+
		"\u0000\u0000\u0320\u0321\u0005\u0003\u0000\u0000\u0321\u0322\u0003x<\u0002"+
		"\u0322\u0324\u0001\u0000\u0000\u0000\u0323\u0316\u0001\u0000\u0000\u0000"+
		"\u0324\u0327\u0001\u0000\u0000\u0000\u0325\u0323\u0001\u0000\u0000\u0000"+
		"\u0325\u0326\u0001\u0000\u0000\u0000\u0326y\u0001\u0000\u0000\u0000\u0327"+
		"\u0325\u0001\u0000\u0000\u0000\u0328\u0329\u0006=\uffff\uffff\u0000\u0329"+
		"\u0332\u0003~?\u0000\u032a\u0332\u0003\u0080@\u0000\u032b\u0332\u0003"+
		"h4\u0000\u032c\u0332\u0003\u008aE\u0000\u032d\u0332\u0003\u008eG\u0000"+
		"\u032e\u0332\u0003\u008cF\u0000\u032f\u0332\u0003L&\u0000\u0330\u0332"+
		"\u0003\u0094J\u0000\u0331\u0328\u0001\u0000\u0000\u0000\u0331\u032a\u0001"+
		"\u0000\u0000\u0000\u0331\u032b\u0001\u0000\u0000\u0000\u0331\u032c\u0001"+
		"\u0000\u0000\u0000\u0331\u032d\u0001\u0000\u0000\u0000\u0331\u032e\u0001"+
		"\u0000\u0000\u0000\u0331\u032f\u0001\u0000\u0000\u0000\u0331\u0330\u0001"+
		"\u0000\u0000\u0000\u0332\u033a\u0001\u0000\u0000\u0000\u0333\u0334\n\u0002"+
		"\u0000\u0000\u0334\u0339\u0003v;\u0000\u0335\u0336\n\u0001\u0000\u0000"+
		"\u0336\u0337\u0005R\u0000\u0000\u0337\u0339\u0003|>\u0000\u0338\u0333"+
		"\u0001\u0000\u0000\u0000\u0338\u0335\u0001\u0000\u0000\u0000\u0339\u033c"+
		"\u0001\u0000\u0000\u0000\u033a\u0338\u0001\u0000\u0000\u0000\u033a\u033b"+
		"\u0001\u0000\u0000\u0000\u033b{\u0001\u0000\u0000\u0000\u033c\u033a\u0001"+
		"\u0000\u0000\u0000\u033d\u0340\u0003L&\u0000\u033e\u0340\u0003\u0094J"+
		"\u0000\u033f\u033d\u0001\u0000\u0000\u0000\u033f\u033e\u0001\u0000\u0000"+
		"\u0000\u0340\u0344\u0001\u0000\u0000\u0000\u0341\u0343\u0003v;\u0000\u0342"+
		"\u0341\u0001\u0000\u0000\u0000\u0343\u0346\u0001\u0000\u0000\u0000\u0344"+
		"\u0342\u0001\u0000\u0000\u0000\u0344\u0345\u0001\u0000\u0000\u0000\u0345"+
		"}\u0001\u0000\u0000\u0000\u0346\u0344\u0001\u0000\u0000\u0000\u0347\u0348"+
		"\u0005J\u0000\u0000\u0348\u007f\u0001\u0000\u0000\u0000\u0349\u034a\u0005"+
		"P\u0000\u0000\u034a\u034b\u0003x<\u0000\u034b\u034c\u0005Q\u0000\u0000"+
		"\u034c\u0081\u0001\u0000\u0000\u0000\u034d\u0350\u0003\u0084B\u0000\u034e"+
		"\u0350\u0003\u0086C\u0000\u034f\u034d\u0001\u0000\u0000\u0000\u034f\u034e"+
		"\u0001\u0000\u0000\u0000\u0350\u0083\u0001\u0000\u0000\u0000\u0351\u0352"+
		"\u0005V\u0000\u0000\u0352\u0353\u0003z=\u0000\u0353\u0085\u0001\u0000"+
		"\u0000\u0000\u0354\u0355\u0005B\u0000\u0000\u0355\u0356\u0003z=\u0000"+
		"\u0356\u0087\u0001\u0000\u0000\u0000\u0357\u0358\u0003z=\u0000\u0358\u0359"+
		"\u0003\u0096K\u0000\u0359\u035a\u0003x<\u0000\u035a\u0089\u0001\u0000"+
		"\u0000\u0000\u035b\u035c\u0005N\u0000\u0000\u035c\u035d\u0003`0\u0000"+
		"\u035d\u035e\u0005O\u0000\u0000\u035e\u008b\u0001\u0000\u0000\u0000\u035f"+
		"\u0360\u0005P\u0000\u0000\u0360\u0361\u0003`0\u0000\u0361\u0362\u0005"+
		"Q\u0000\u0000\u0362\u008d\u0001\u0000\u0000\u0000\u0363\u0364\u0005L\u0000"+
		"\u0000\u0364\u0365\u0003\u0090H\u0000\u0365\u0366\u0005M\u0000\u0000\u0366"+
		"\u008f\u0001\u0000\u0000\u0000\u0367\u036c\u0003\u0092I\u0000\u0368\u0369"+
		"\u0005S\u0000\u0000\u0369\u036b\u0003\u0092I\u0000\u036a\u0368\u0001\u0000"+
		"\u0000\u0000\u036b\u036e\u0001\u0000\u0000\u0000\u036c\u036a\u0001\u0000"+
		"\u0000\u0000\u036c\u036d\u0001\u0000\u0000\u0000\u036d\u0091\u0001\u0000"+
		"\u0000\u0000\u036e\u036c\u0001\u0000\u0000\u0000\u036f\u0370\u0003x<\u0000"+
		"\u0370\u0371\u0005T\u0000\u0000\u0371\u0372\u0003x<\u0000\u0372\u0093"+
		"\u0001\u0000\u0000\u0000\u0373\u0374\u0003P(\u0000\u0374\u0376\u0005P"+
		"\u0000\u0000\u0375\u0377\u0003X,\u0000\u0376\u0375\u0001\u0000\u0000\u0000"+
		"\u0376\u0377\u0001\u0000\u0000\u0000\u0377\u0378\u0001\u0000\u0000\u0000"+
		"\u0378\u0379\u0005Q\u0000\u0000\u0379\u0095\u0001\u0000\u0000\u0000\u037a"+
		"\u037b\u0007\u0004\u0000\u0000\u037b\u0097\u0001\u0000\u0000\u0000\u037c"+
		"\u037d\u0003b1\u0000\u037d\u037f\u0005P\u0000\u0000\u037e\u0380\u0003"+
		"X,\u0000\u037f\u037e\u0001\u0000\u0000\u0000\u037f\u0380\u0001\u0000\u0000"+
		"\u0000\u0380\u0381\u0001\u0000\u0000\u0000\u0381\u0382\u0005Q\u0000\u0000"+
		"\u0382\u0099\u0001\u0000\u0000\u0000\u0383\u0384\u0003J%\u0000\u0384\u0385"+
		"\u0005T\u0000\u0000\u0385\u0386\u0003b1\u0000\u0386\u009b\u0001\u0000"+
		"\u0000\u0000\u0387\u0388\u0003T*\u0000\u0388\u0389\u0005N\u0000\u0000"+
		"\u0389\u038e\u0003b1\u0000\u038a\u038b\u0005S\u0000\u0000\u038b\u038d"+
		"\u0003b1\u0000\u038c\u038a\u0001\u0000\u0000\u0000\u038d\u0390\u0001\u0000"+
		"\u0000\u0000\u038e\u038c\u0001\u0000\u0000\u0000\u038e\u038f\u0001\u0000"+
		"\u0000\u0000\u038f\u0391\u0001\u0000\u0000\u0000\u0390\u038e\u0001\u0000"+
		"\u0000\u0000\u0391\u0392\u0005O\u0000\u0000\u0392\u009d\u0001\u0000\u0000"+
		"\u0000\u0393\u0394\u0005=\u0000\u0000\u0394\u0395\u0005N\u0000\u0000\u0395"+
		"\u0396\u0005N\u0000\u0000\u0396\u039b\u0003b1\u0000\u0397\u0398\u0005"+
		"S\u0000\u0000\u0398\u039a\u0003b1\u0000\u0399\u0397\u0001\u0000\u0000"+
		"\u0000\u039a\u039d\u0001\u0000\u0000\u0000\u039b\u0399\u0001\u0000\u0000"+
		"\u0000\u039b\u039c\u0001\u0000\u0000\u0000\u039c\u039e\u0001\u0000\u0000"+
		"\u0000\u039d\u039b\u0001\u0000\u0000\u0000\u039e\u039f\u0005O\u0000\u0000"+
		"\u039f\u03a0\u0005S\u0000\u0000\u03a0\u03a1\u0003b1\u0000\u03a1\u03a2"+
		"\u0005O\u0000\u0000\u03a2\u009f\u0001\u0000\u0000\u0000\u03a3\u03a4\u0005"+
		"7\u0000\u0000\u03a4\u03a5\u0005N\u0000\u0000\u03a5\u03a8\u0003b1\u0000"+
		"\u03a6\u03a7\u0005S\u0000\u0000\u03a7\u03a9\u0003b1\u0000\u03a8\u03a6"+
		"\u0001\u0000\u0000\u0000\u03a9\u03aa\u0001\u0000\u0000\u0000\u03aa\u03a8"+
		"\u0001\u0000\u0000\u0000\u03aa\u03ab\u0001\u0000\u0000\u0000\u03ab\u03ac"+
		"\u0001\u0000\u0000\u0000\u03ac\u03ad\u0005O\u0000\u0000\u03ad\u00a1\u0001"+
		"\u0000\u0000\u0000\u03ae\u03af\u0005\t\u0000\u0000\u03af\u03b0\u0003\\"+
		".\u0000\u03b0\u03b1\u0005T\u0000\u0000\u03b1\u03b2\u0003x<\u0000\u03b2"+
		"\u00a3\u0001\u0000\u0000\u0000\u03b3\u03b4\u0005h\u0000\u0000\u03b4\u00a5"+
		"\u0001\u0000\u0000\u0000W\u00a7\u00ac\u00b2\u00c0\u00c3\u00d1\u00d8\u00de"+
		"\u00e9\u00f1\u00fd\u00ff\u0106\u010c\u0117\u011e\u0127\u0136\u013e\u0148"+
		"\u014a\u0151\u0159\u0163\u0165\u0179\u017c\u0185\u018e\u0197\u0199\u01a0"+
		"\u01a9\u01b0\u01bb\u01c2\u01cd\u01db\u01df\u01e6\u01ed\u01f5\u0200\u0203"+
		"\u0214\u021d\u0224\u022d\u0233\u023d\u0244\u024d\u0253\u025e\u0266\u026c"+
		"\u0277\u027e\u0286\u0292\u029a\u02ae\u02b4\u02c1\u02c8\u02cd\u02d4\u02dc"+
		"\u02e3\u02ea\u02f3\u02fb\u0314\u031d\u0325\u0331\u0338\u033a\u033f\u0344"+
		"\u034f\u036c\u0376\u037f\u038e\u039b\u03aa";
	public static final ATN _ATN =
		new ATNDeserializer().deserialize(_serializedATN.toCharArray());
	static {
		_decisionToDFA = new DFA[_ATN.getNumberOfDecisions()];
		for (int i = 0; i < _ATN.getNumberOfDecisions(); i++) {
			_decisionToDFA[i] = new DFA(_ATN.getDecisionState(i), i);
		}
	}
}