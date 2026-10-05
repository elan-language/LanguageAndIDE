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
		HEX_PREFIX=73, INTERPOLATED_STRING_PREFIX=74, THIS_INSTANCE=75, SINGLE_EQUALS=76, 
		OPEN_BRACE=77, CLOSE_BRACE=78, OPEN_SQ_BRACKET=79, CLOSE_SQ_BRACKET=80, 
		OPEN_BRACKET=81, CLOSE_BRACKET=82, DOT=83, COMMA=84, COLON=85, PLUS=86, 
		MINUS=87, MULT=88, DIVIDE=89, LT=90, GT=91, LE=92, GE=93, DOUBLE_QUOTES=94, 
		WS=95, NL=96, NAME_STARTING_TEST_=97, NAME_STARTING_LC=98, NAME_STARTING_UC=99, 
		LITERAL_BINARY=100, LITERAL_HEX=101, LITERAL_INTEGER=102, LITERAL_FLOAT=103, 
		LITERAL_REGEXP=104, LITERAL_STRING=105, WHITESPACES=106, TEXT=107, GHOSTED=108, 
		FUNCTION_ANNOTATION=109, PROCECDURE_ANNOTATION=110, CONSTANT_ANNOTATION=111, 
		ENUM_ANNOTATION=112, CONCRETE_CLASS_ANNOTATION=113, ABSTRACT_CLASS_ANNOTATION=114, 
		VARIABLE_ANNOTATION=115, ASSIGNMENT_ANNOTATION=116, INPUT_ANNOTATION=117, 
		CALL_ANNOTATION=118, LET_ANNOTATION=119, ELSE_IF_ANNOTATION=120, PROPERTY_ANNOTATION=121, 
		FUNCTION_METHOD_ANNOTATION=122, PROCEDURE_METHOD_ANNOTATION=123, COMMENT=124;
	public static final int
		RULE_file = 0, RULE_global = 1, RULE_main = 2, RULE_function = 3, RULE_test = 4, 
		RULE_procedure = 5, RULE_constant = 6, RULE_enum = 7, RULE_concreteClass = 8, 
		RULE_abstractClass = 9, RULE_comment = 10, RULE_commentText = 11, RULE_ordinaryStatement = 12, 
		RULE_print = 13, RULE_variableDefinition = 14, RULE_assignment = 15, RULE_inputStatement = 16, 
		RULE_ifStatement = 17, RULE_whileLoop = 18, RULE_forLoop = 19, RULE_procedureCall = 20, 
		RULE_procRef = 21, RULE_tryStatement = 22, RULE_throwStatement = 23, RULE_assert = 24, 
		RULE_returnStatement = 25, RULE_elseIfClause = 26, RULE_elseClause = 27, 
		RULE_catchStatement = 28, RULE_constructorMember = 29, RULE_property = 30, 
		RULE_functionMethod = 31, RULE_procedureMethod = 32, RULE_abstractFunction = 33, 
		RULE_abstractProcedure = 34, RULE_identifierDef = 35, RULE_identifierUse = 36, 
		RULE_assignable = 37, RULE_methodName = 38, RULE_testName = 39, RULE_typeName = 40, 
		RULE_constantValue = 41, RULE_argList = 42, RULE_argument = 43, RULE_paramsList = 44, 
		RULE_type = 45, RULE_enumValuesList = 46, RULE_assertActual = 47, RULE_litValue = 48, 
		RULE_litBoolean = 49, RULE_litInt = 50, RULE_litFloat = 51, RULE_litString = 52, 
		RULE_enumValue = 53, RULE_litRegExp = 54, RULE_index = 55, RULE_expression = 56, 
		RULE_ifClause = 57, RULE_term = 58, RULE_chainHead = 59, RULE_chainTail = 60, 
		RULE_chainable = 61, RULE_thisInstance = 62, RULE_bracketedExpression = 63, 
		RULE_unaryExpression = 64, RULE_binaryExpression = 65, RULE_tuple = 66, 
		RULE_dictionary = 67, RULE_kvpList = 68, RULE_kvp = 69, RULE_methodCall = 70, 
		RULE_binaryOperator = 71, RULE_newInstance = 72, RULE_paramDef = 73, RULE_typeGeneric = 74, 
		RULE_typeFunc = 75, RULE_typeTuple = 76, RULE_lambda = 77, RULE_list = 78, 
		RULE_interpolatedString = 79, RULE_power = 80;
	private static String[] makeRuleNames() {
		return new String[] {
			"file", "global", "main", "function", "test", "procedure", "constant", 
			"enum", "concreteClass", "abstractClass", "comment", "commentText", "ordinaryStatement", 
			"print", "variableDefinition", "assignment", "inputStatement", "ifStatement", 
			"whileLoop", "forLoop", "procedureCall", "procRef", "tryStatement", "throwStatement", 
			"assert", "returnStatement", "elseIfClause", "elseClause", "catchStatement", 
			"constructorMember", "property", "functionMethod", "procedureMethod", 
			"abstractFunction", "abstractProcedure", "identifierDef", "identifierUse", 
			"assignable", "methodName", "testName", "typeName", "constantValue", 
			"argList", "argument", "paramsList", "type", "enumValuesList", "assertActual", 
			"litValue", "litBoolean", "litInt", "litFloat", "litString", "enumValue", 
			"litRegExp", "index", "expression", "ifClause", "term", "chainHead", 
			"chainTail", "chainable", "thisInstance", "bracketedExpression", "unaryExpression", 
			"binaryExpression", "tuple", "dictionary", "kvpList", "kvp", "methodCall", 
			"binaryOperator", "newInstance", "paramDef", "typeGeneric", "typeFunc", 
			"typeTuple", "lambda", "list", "interpolatedString", "power"
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
			"'not'", "'=='", "'!='", "'%'", "'->'", "'**'", "'0b'", "'0x'", "'f'", 
			"'self'", "'='", "'{'", "'}'", "'['", "']'", "'('", "')'", "'.'", "','", 
			"':'", "'+'", "'-'", "'*'", "'/'", "'<'", "'>'", "'<='", "'>='", "'\"'", 
			null, null, null, null, null, null, null, null, null, null, null, null, 
			null, "'[ghosted]'", "'# function'", "'# procedure'", "'# constant'", 
			"'# enum'", "'# concrete class'", "'# abstract class'", "'# variable definition'", 
			"'# assignment'", "'# input statement'", "'# procedure call'", "'# let'", 
			"'# else if'", "'# property'", "'# function method'", "'# procedure method'"
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
			"BINARY_PREFIX", "HEX_PREFIX", "INTERPOLATED_STRING_PREFIX", "THIS_INSTANCE", 
			"SINGLE_EQUALS", "OPEN_BRACE", "CLOSE_BRACE", "OPEN_SQ_BRACKET", "CLOSE_SQ_BRACKET", 
			"OPEN_BRACKET", "CLOSE_BRACKET", "DOT", "COMMA", "COLON", "PLUS", "MINUS", 
			"MULT", "DIVIDE", "LT", "GT", "LE", "GE", "DOUBLE_QUOTES", "WS", "NL", 
			"NAME_STARTING_TEST_", "NAME_STARTING_LC", "NAME_STARTING_UC", "LITERAL_BINARY", 
			"LITERAL_HEX", "LITERAL_INTEGER", "LITERAL_FLOAT", "LITERAL_REGEXP", 
			"LITERAL_STRING", "WHITESPACES", "TEXT", "GHOSTED", "FUNCTION_ANNOTATION", 
			"PROCECDURE_ANNOTATION", "CONSTANT_ANNOTATION", "ENUM_ANNOTATION", "CONCRETE_CLASS_ANNOTATION", 
			"ABSTRACT_CLASS_ANNOTATION", "VARIABLE_ANNOTATION", "ASSIGNMENT_ANNOTATION", 
			"INPUT_ANNOTATION", "CALL_ANNOTATION", "LET_ANNOTATION", "ELSE_IF_ANNOTATION", 
			"PROPERTY_ANNOTATION", "FUNCTION_METHOD_ANNOTATION", "PROCEDURE_METHOD_ANNOTATION", 
			"COMMENT"
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
			setState(163);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,0,_ctx) ) {
			case 1:
				{
				setState(162);
				comment();
				}
				break;
			}
			setState(168);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==CLASS || _la==DEF || _la==NAME_STARTING_LC || _la==COMMENT) {
				{
				{
				setState(165);
				global();
				}
				}
				setState(170);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			setState(174);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==NL) {
				{
				{
				setState(171);
				match(NL);
				}
				}
				setState(176);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			setState(177);
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
			setState(188);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,3,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(179);
				main();
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(180);
				function();
				}
				break;
			case 3:
				enterOuterAlt(_localctx, 3);
				{
				setState(181);
				test();
				}
				break;
			case 4:
				enterOuterAlt(_localctx, 4);
				{
				setState(182);
				procedure();
				}
				break;
			case 5:
				enterOuterAlt(_localctx, 5);
				{
				setState(183);
				constant();
				}
				break;
			case 6:
				enterOuterAlt(_localctx, 6);
				{
				setState(184);
				enum_();
				}
				break;
			case 7:
				enterOuterAlt(_localctx, 7);
				{
				setState(185);
				concreteClass();
				}
				break;
			case 8:
				enterOuterAlt(_localctx, 8);
				{
				setState(186);
				abstractClass();
				}
				break;
			case 9:
				enterOuterAlt(_localctx, 9);
				{
				setState(187);
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
		try {
			int _alt;
			enterOuterAlt(_localctx, 1);
			{
			setState(190);
			match(DEF);
			setState(191);
			match(MAIN);
			setState(192);
			match(OPEN_BRACKET);
			setState(193);
			match(CLOSE_BRACKET);
			setState(194);
			match(CLOSE_BRACKET);
			setState(195);
			match(ARROW);
			setState(196);
			match(NONE);
			setState(197);
			match(COLON);
			setState(198);
			match(NL);
			setState(202);
			_errHandler.sync(this);
			_alt = getInterpreter().adaptivePredict(_input,4,_ctx);
			while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER ) {
				if ( _alt==1 ) {
					{
					{
					setState(199);
					ordinaryStatement();
					}
					} 
				}
				setState(204);
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,4,_ctx);
			}
			setState(205);
			match(COMMENT);
			setState(206);
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
		public ParamsListContext paramsList() {
			return getRuleContext(ParamsListContext.class,0);
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
			setState(208);
			match(DEF);
			setState(209);
			methodName();
			setState(210);
			match(OPEN_BRACKET);
			setState(212);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==NAME_STARTING_LC) {
				{
				setState(211);
				paramsList();
				}
			}

			setState(214);
			match(CLOSE_BRACKET);
			setState(215);
			match(ARROW);
			setState(216);
			type();
			setState(217);
			match(COLON);
			setState(218);
			match(FUNCTION_ANNOTATION);
			setState(219);
			match(NL);
			setState(223);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while ((((_la) & ~0x3f) == 0 && ((1L << _la) & -2373397003624224672L) != 0) || ((((_la - 74)) & ~0x3f) == 0 && ((1L << (_la - 74)) & 1125920291160227L) != 0)) {
				{
				{
				setState(220);
				ordinaryStatement();
				}
				}
				setState(225);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			setState(226);
			returnStatement();
			setState(227);
			match(COMMENT);
			setState(228);
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
		try {
			int _alt;
			enterOuterAlt(_localctx, 1);
			{
			setState(230);
			match(CLASS);
			setState(231);
			testName();
			setState(232);
			match(OPEN_BRACKET);
			setState(233);
			match(TESTCASE);
			setState(234);
			match(CLOSE_BRACKET);
			setState(235);
			match(COMMENT);
			setState(236);
			match(NL);
			setState(242);
			_errHandler.sync(this);
			_alt = getInterpreter().adaptivePredict(_input,8,_ctx);
			while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER ) {
				if ( _alt==1 ) {
					{
					setState(240);
					_errHandler.sync(this);
					switch (_input.LA(1)) {
					case THIS_INSTANCE:
						{
						setState(237);
						assert_();
						}
						break;
					case NAME_STARTING_LC:
						{
						setState(238);
						variableDefinition();
						}
						break;
					case COMMENT:
						{
						setState(239);
						comment();
						}
						break;
					default:
						throw new NoViableAltException(this);
					}
					} 
				}
				setState(244);
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,8,_ctx);
			}
			setState(245);
			match(COMMENT);
			setState(246);
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
		public ParamsListContext paramsList() {
			return getRuleContext(ParamsListContext.class,0);
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
			setState(248);
			match(DEF);
			setState(249);
			methodName();
			setState(250);
			match(OPEN_BRACKET);
			setState(252);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==NAME_STARTING_LC) {
				{
				setState(251);
				paramsList();
				}
			}

			setState(254);
			match(CLOSE_BRACKET);
			setState(255);
			match(ARROW);
			setState(256);
			match(NONE);
			setState(257);
			match(COLON);
			setState(258);
			match(PROCECDURE_ANNOTATION);
			setState(259);
			match(NL);
			setState(263);
			_errHandler.sync(this);
			_alt = getInterpreter().adaptivePredict(_input,10,_ctx);
			while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER ) {
				if ( _alt==1 ) {
					{
					{
					setState(260);
					ordinaryStatement();
					}
					} 
				}
				setState(265);
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,10,_ctx);
			}
			setState(266);
			match(COMMENT);
			setState(267);
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
		public ConstantContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_constant; }
	}

	public final ConstantContext constant() throws RecognitionException {
		ConstantContext _localctx = new ConstantContext(_ctx, getState());
		enterRule(_localctx, 12, RULE_constant);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(269);
			identifierDef();
			setState(270);
			match(EQUAL);
			setState(271);
			constantValue();
			setState(272);
			match(CONSTANT_ANNOTATION);
			setState(273);
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
		public EnumValuesListContext enumValuesList() {
			return getRuleContext(EnumValuesListContext.class,0);
		}
		public TerminalNode COMMENT() { return getToken(PythonParser.COMMENT, 0); }
		public EnumContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_enum; }
	}

	public final EnumContext enum_() throws RecognitionException {
		EnumContext _localctx = new EnumContext(_ctx, getState());
		enterRule(_localctx, 14, RULE_enum);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(275);
			match(CLASS);
			setState(276);
			typeName();
			setState(277);
			match(OPEN_BRACKET);
			setState(278);
			match(ENUM);
			setState(279);
			match(CLOSE_BRACKET);
			setState(280);
			match(COLON);
			setState(281);
			match(ENUM_ANNOTATION);
			setState(282);
			match(NL);
			setState(283);
			enumValuesList();
			setState(284);
			match(NL);
			setState(285);
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
			setState(287);
			match(CLASS);
			setState(288);
			typeName();
			setState(293);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==OPEN_BRACKET) {
				{
				setState(289);
				match(OPEN_BRACKET);
				setState(290);
				typeName();
				setState(291);
				match(CLOSE_BRACKET);
				}
			}

			setState(295);
			match(COLON);
			setState(296);
			match(CONCRETE_CLASS_ANNOTATION);
			setState(297);
			match(NL);
			setState(305);
			_errHandler.sync(this);
			_alt = getInterpreter().adaptivePredict(_input,13,_ctx);
			while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER ) {
				if ( _alt==1 ) {
					{
					setState(303);
					_errHandler.sync(this);
					switch ( getInterpreter().adaptivePredict(_input,12,_ctx) ) {
					case 1:
						{
						setState(298);
						constructorMember();
						}
						break;
					case 2:
						{
						setState(299);
						property();
						}
						break;
					case 3:
						{
						setState(300);
						functionMethod();
						}
						break;
					case 4:
						{
						setState(301);
						procedureMethod();
						}
						break;
					case 5:
						{
						setState(302);
						comment();
						}
						break;
					}
					} 
				}
				setState(307);
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,13,_ctx);
			}
			setState(308);
			match(COMMENT);
			setState(309);
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
		try {
			int _alt;
			enterOuterAlt(_localctx, 1);
			{
			setState(311);
			match(CLASS);
			setState(312);
			typeName();
			setState(317);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case OPEN_BRACKET:
				{
				setState(313);
				match(OPEN_BRACKET);
				setState(314);
				typeName();
				}
				break;
			case ABC:
				{
				setState(315);
				match(ABC);
				setState(316);
				match(CLOSE_BRACKET);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			setState(319);
			match(ABSTRACT_CLASS_ANNOTATION);
			setState(320);
			match(NL);
			setState(329);
			_errHandler.sync(this);
			_alt = getInterpreter().adaptivePredict(_input,16,_ctx);
			while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER ) {
				if ( _alt==1 ) {
					{
					setState(327);
					_errHandler.sync(this);
					switch ( getInterpreter().adaptivePredict(_input,15,_ctx) ) {
					case 1:
						{
						setState(321);
						property();
						}
						break;
					case 2:
						{
						setState(322);
						functionMethod();
						}
						break;
					case 3:
						{
						setState(323);
						procedureMethod();
						}
						break;
					case 4:
						{
						setState(324);
						abstractFunction();
						}
						break;
					case 5:
						{
						setState(325);
						abstractProcedure();
						}
						break;
					case 6:
						{
						setState(326);
						comment();
						}
						break;
					}
					} 
				}
				setState(331);
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,16,_ctx);
			}
			setState(332);
			match(COMMENT);
			setState(333);
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
			setState(335);
			commentText();
			setState(336);
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
			setState(338);
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
		public PrintContext print() {
			return getRuleContext(PrintContext.class,0);
		}
		public VariableDefinitionContext variableDefinition() {
			return getRuleContext(VariableDefinitionContext.class,0);
		}
		public AssignmentContext assignment() {
			return getRuleContext(AssignmentContext.class,0);
		}
		public InputStatementContext inputStatement() {
			return getRuleContext(InputStatementContext.class,0);
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
			setState(351);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,17,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(340);
				print();
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(341);
				variableDefinition();
				}
				break;
			case 3:
				enterOuterAlt(_localctx, 3);
				{
				setState(342);
				assignment();
				}
				break;
			case 4:
				enterOuterAlt(_localctx, 4);
				{
				setState(343);
				inputStatement();
				}
				break;
			case 5:
				enterOuterAlt(_localctx, 5);
				{
				setState(344);
				ifStatement();
				}
				break;
			case 6:
				enterOuterAlt(_localctx, 6);
				{
				setState(345);
				whileLoop();
				}
				break;
			case 7:
				enterOuterAlt(_localctx, 7);
				{
				setState(346);
				forLoop();
				}
				break;
			case 8:
				enterOuterAlt(_localctx, 8);
				{
				setState(347);
				procedureCall();
				}
				break;
			case 9:
				enterOuterAlt(_localctx, 9);
				{
				setState(348);
				tryStatement();
				}
				break;
			case 10:
				enterOuterAlt(_localctx, 10);
				{
				setState(349);
				throwStatement();
				}
				break;
			case 11:
				enterOuterAlt(_localctx, 11);
				{
				setState(350);
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
	public static class PrintContext extends ParserRuleContext {
		public TerminalNode PRINT() { return getToken(PythonParser.PRINT, 0); }
		public TerminalNode OPEN_BRACKET() { return getToken(PythonParser.OPEN_BRACKET, 0); }
		public TerminalNode CLOSE_BRACKET() { return getToken(PythonParser.CLOSE_BRACKET, 0); }
		public TerminalNode NL() { return getToken(PythonParser.NL, 0); }
		public ExpressionContext expression() {
			return getRuleContext(ExpressionContext.class,0);
		}
		public PrintContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_print; }
	}

	public final PrintContext print() throws RecognitionException {
		PrintContext _localctx = new PrintContext(_ctx, getState());
		enterRule(_localctx, 26, RULE_print);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(353);
			match(PRINT);
			setState(354);
			match(OPEN_BRACKET);
			setState(356);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (((((_la - 55)) & ~0x3f) == 0 && ((1L << (_la - 55)) & 1680058147670527L) != 0)) {
				{
				setState(355);
				expression(0);
				}
			}

			setState(358);
			match(CLOSE_BRACKET);
			setState(359);
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
		public VariableDefinitionContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_variableDefinition; }
	}

	public final VariableDefinitionContext variableDefinition() throws RecognitionException {
		VariableDefinitionContext _localctx = new VariableDefinitionContext(_ctx, getState());
		enterRule(_localctx, 28, RULE_variableDefinition);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(361);
			identifierDef();
			setState(362);
			match(EQUAL);
			setState(363);
			expression(0);
			setState(364);
			match(VARIABLE_ANNOTATION);
			setState(365);
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
		public AssignmentContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_assignment; }
	}

	public final AssignmentContext assignment() throws RecognitionException {
		AssignmentContext _localctx = new AssignmentContext(_ctx, getState());
		enterRule(_localctx, 30, RULE_assignment);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(367);
			assignable(0);
			setState(368);
			match(EQUAL);
			setState(369);
			expression(0);
			setState(370);
			match(ASSIGNMENT_ANNOTATION);
			setState(371);
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
	public static class InputStatementContext extends ParserRuleContext {
		public IdentifierDefContext identifierDef() {
			return getRuleContext(IdentifierDefContext.class,0);
		}
		public TerminalNode EQUAL() { return getToken(PythonParser.EQUAL, 0); }
		public TerminalNode INPUT() { return getToken(PythonParser.INPUT, 0); }
		public TerminalNode OPEN_BRACKET() { return getToken(PythonParser.OPEN_BRACKET, 0); }
		public ExpressionContext expression() {
			return getRuleContext(ExpressionContext.class,0);
		}
		public TerminalNode CLOSE_BRACKET() { return getToken(PythonParser.CLOSE_BRACKET, 0); }
		public TerminalNode INPUT_ANNOTATION() { return getToken(PythonParser.INPUT_ANNOTATION, 0); }
		public TerminalNode NL() { return getToken(PythonParser.NL, 0); }
		public InputStatementContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_inputStatement; }
	}

	public final InputStatementContext inputStatement() throws RecognitionException {
		InputStatementContext _localctx = new InputStatementContext(_ctx, getState());
		enterRule(_localctx, 32, RULE_inputStatement);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(373);
			identifierDef();
			setState(374);
			match(EQUAL);
			setState(375);
			match(INPUT);
			setState(376);
			match(OPEN_BRACKET);
			setState(377);
			expression(0);
			setState(378);
			match(CLOSE_BRACKET);
			setState(379);
			match(INPUT_ANNOTATION);
			setState(380);
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
		enterRule(_localctx, 34, RULE_ifStatement);
		try {
			int _alt;
			enterOuterAlt(_localctx, 1);
			{
			setState(382);
			match(IF);
			setState(383);
			expression(0);
			setState(384);
			match(COLON);
			setState(385);
			match(NL);
			setState(391);
			_errHandler.sync(this);
			_alt = getInterpreter().adaptivePredict(_input,20,_ctx);
			while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER ) {
				if ( _alt==1 ) {
					{
					setState(389);
					_errHandler.sync(this);
					switch (_input.LA(1)) {
					case ELIF:
						{
						setState(386);
						elseIfClause();
						}
						break;
					case ELSE:
						{
						setState(387);
						elseClause();
						}
						break;
					case FOR:
					case IF:
					case PRINT:
					case TRY:
					case WHILE:
					case RAISE:
					case INT_NAME:
					case FLOAT_NAME:
					case BOOL_NAME:
					case STRING_NAME:
					case LIST_NAME:
					case TRUE:
					case FALSE:
					case INTERPOLATED_STRING_PREFIX:
					case THIS_INSTANCE:
					case OPEN_SQ_BRACKET:
					case OPEN_BRACKET:
					case NAME_STARTING_LC:
					case NAME_STARTING_UC:
					case LITERAL_BINARY:
					case LITERAL_HEX:
					case LITERAL_INTEGER:
					case LITERAL_FLOAT:
					case LITERAL_STRING:
					case GHOSTED:
					case COMMENT:
						{
						setState(388);
						ordinaryStatement();
						}
						break;
					default:
						throw new NoViableAltException(this);
					}
					} 
				}
				setState(393);
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,20,_ctx);
			}
			setState(394);
			match(COMMENT);
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
		enterRule(_localctx, 36, RULE_whileLoop);
		try {
			int _alt;
			enterOuterAlt(_localctx, 1);
			{
			setState(397);
			match(WHILE);
			setState(398);
			expression(0);
			setState(399);
			match(COLON);
			setState(400);
			match(NL);
			setState(404);
			_errHandler.sync(this);
			_alt = getInterpreter().adaptivePredict(_input,21,_ctx);
			while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER ) {
				if ( _alt==1 ) {
					{
					{
					setState(401);
					ordinaryStatement();
					}
					} 
				}
				setState(406);
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,21,_ctx);
			}
			setState(407);
			match(COMMENT);
			setState(408);
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
		enterRule(_localctx, 38, RULE_forLoop);
		try {
			int _alt;
			enterOuterAlt(_localctx, 1);
			{
			setState(410);
			match(FOR);
			setState(411);
			identifierDef();
			setState(412);
			match(IN);
			setState(413);
			expression(0);
			setState(414);
			match(COLON);
			setState(415);
			match(NL);
			setState(419);
			_errHandler.sync(this);
			_alt = getInterpreter().adaptivePredict(_input,22,_ctx);
			while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER ) {
				if ( _alt==1 ) {
					{
					{
					setState(416);
					ordinaryStatement();
					}
					} 
				}
				setState(421);
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,22,_ctx);
			}
			setState(422);
			match(COMMENT);
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
		enterRule(_localctx, 40, RULE_procedureCall);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(426);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==GHOSTED) {
				{
				setState(425);
				match(GHOSTED);
				}
			}

			setState(428);
			procRef();
			setState(429);
			match(OPEN_BRACKET);
			setState(430);
			argList();
			setState(431);
			match(CLOSE_BRACKET);
			setState(432);
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
		public TermContext term() {
			return getRuleContext(TermContext.class,0);
		}
		public ProcRefContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_procRef; }
	}

	public final ProcRefContext procRef() throws RecognitionException {
		ProcRefContext _localctx = new ProcRefContext(_ctx, getState());
		enterRule(_localctx, 42, RULE_procRef);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(434);
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
	public static class TryStatementContext extends ParserRuleContext {
		public TerminalNode TRY() { return getToken(PythonParser.TRY, 0); }
		public List<TerminalNode> NL() { return getTokens(PythonParser.NL); }
		public TerminalNode NL(int i) {
			return getToken(PythonParser.NL, i);
		}
		public CatchStatementContext catchStatement() {
			return getRuleContext(CatchStatementContext.class,0);
		}
		public TerminalNode COMMENT() { return getToken(PythonParser.COMMENT, 0); }
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
		enterRule(_localctx, 44, RULE_tryStatement);
		int _la;
		try {
			int _alt;
			enterOuterAlt(_localctx, 1);
			{
			setState(436);
			match(TRY);
			setState(437);
			match(NL);
			setState(441);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while ((((_la) & ~0x3f) == 0 && ((1L << _la) & -2373397003624224672L) != 0) || ((((_la - 74)) & ~0x3f) == 0 && ((1L << (_la - 74)) & 1125920291160227L) != 0)) {
				{
				{
				setState(438);
				ordinaryStatement();
				}
				}
				setState(443);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			setState(444);
			catchStatement();
			setState(448);
			_errHandler.sync(this);
			_alt = getInterpreter().adaptivePredict(_input,25,_ctx);
			while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER ) {
				if ( _alt==1 ) {
					{
					{
					setState(445);
					ordinaryStatement();
					}
					} 
				}
				setState(450);
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,25,_ctx);
			}
			setState(451);
			match(COMMENT);
			setState(452);
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
		public LitStringContext litString() {
			return getRuleContext(LitStringContext.class,0);
		}
		public TerminalNode CLOSE_BRACKET() { return getToken(PythonParser.CLOSE_BRACKET, 0); }
		public TerminalNode NL() { return getToken(PythonParser.NL, 0); }
		public ThrowStatementContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_throwStatement; }
	}

	public final ThrowStatementContext throwStatement() throws RecognitionException {
		ThrowStatementContext _localctx = new ThrowStatementContext(_ctx, getState());
		enterRule(_localctx, 46, RULE_throwStatement);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(454);
			match(RAISE);
			setState(455);
			typeName();
			setState(456);
			match(OPEN_BRACKET);
			setState(457);
			litString();
			setState(458);
			match(CLOSE_BRACKET);
			setState(459);
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
	public static class AssertContext extends ParserRuleContext {
		public TerminalNode THIS_INSTANCE() { return getToken(PythonParser.THIS_INSTANCE, 0); }
		public TerminalNode DOT() { return getToken(PythonParser.DOT, 0); }
		public TerminalNode ASSERT_EQUAL() { return getToken(PythonParser.ASSERT_EQUAL, 0); }
		public TerminalNode OPEN_BRACKET() { return getToken(PythonParser.OPEN_BRACKET, 0); }
		public AssertActualContext assertActual() {
			return getRuleContext(AssertActualContext.class,0);
		}
		public TerminalNode COMMA() { return getToken(PythonParser.COMMA, 0); }
		public ExpressionContext expression() {
			return getRuleContext(ExpressionContext.class,0);
		}
		public TerminalNode CLOSE_BRACKET() { return getToken(PythonParser.CLOSE_BRACKET, 0); }
		public TerminalNode NL() { return getToken(PythonParser.NL, 0); }
		public AssertContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_assert; }
	}

	public final AssertContext assert_() throws RecognitionException {
		AssertContext _localctx = new AssertContext(_ctx, getState());
		enterRule(_localctx, 48, RULE_assert);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(461);
			match(THIS_INSTANCE);
			setState(462);
			match(DOT);
			setState(463);
			match(ASSERT_EQUAL);
			setState(464);
			match(OPEN_BRACKET);
			setState(465);
			assertActual();
			setState(466);
			match(COMMA);
			setState(467);
			expression(0);
			setState(468);
			match(CLOSE_BRACKET);
			setState(469);
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
		enterRule(_localctx, 50, RULE_returnStatement);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(471);
			match(RETURN);
			setState(472);
			expression(0);
			setState(473);
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
		public ElseIfClauseContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_elseIfClause; }
	}

	public final ElseIfClauseContext elseIfClause() throws RecognitionException {
		ElseIfClauseContext _localctx = new ElseIfClauseContext(_ctx, getState());
		enterRule(_localctx, 52, RULE_elseIfClause);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(475);
			match(ELIF);
			setState(476);
			expression(0);
			setState(477);
			match(COLON);
			setState(478);
			match(ELSE_IF_ANNOTATION);
			setState(479);
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
		public ElseClauseContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_elseClause; }
	}

	public final ElseClauseContext elseClause() throws RecognitionException {
		ElseClauseContext _localctx = new ElseClauseContext(_ctx, getState());
		enterRule(_localctx, 54, RULE_elseClause);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(481);
			match(ELSE);
			setState(482);
			match(COLON);
			setState(483);
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
		public CatchStatementContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_catchStatement; }
	}

	public final CatchStatementContext catchStatement() throws RecognitionException {
		CatchStatementContext _localctx = new CatchStatementContext(_ctx, getState());
		enterRule(_localctx, 56, RULE_catchStatement);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(485);
			match(EXCEPT);
			setState(486);
			typeName();
			setState(487);
			match(AS);
			setState(488);
			identifierDef();
			setState(489);
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
		public ParamsListContext paramsList() {
			return getRuleContext(ParamsListContext.class,0);
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
		enterRule(_localctx, 58, RULE_constructorMember);
		int _la;
		try {
			int _alt;
			enterOuterAlt(_localctx, 1);
			{
			setState(491);
			match(DEF);
			setState(492);
			match(INIT);
			setState(493);
			match(OPEN_BRACKET);
			setState(495);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==NAME_STARTING_LC) {
				{
				setState(494);
				paramsList();
				}
			}

			setState(497);
			match(CLOSE_BRACKET);
			setState(498);
			match(ARROW);
			setState(499);
			match(NONE);
			setState(500);
			match(COLON);
			setState(501);
			match(NL);
			setState(505);
			_errHandler.sync(this);
			_alt = getInterpreter().adaptivePredict(_input,27,_ctx);
			while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER ) {
				if ( _alt==1 ) {
					{
					{
					setState(502);
					ordinaryStatement();
					}
					} 
				}
				setState(507);
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,27,_ctx);
			}
			setState(508);
			match(COMMENT);
			setState(509);
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
		public PropertyContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_property; }
	}

	public final PropertyContext property() throws RecognitionException {
		PropertyContext _localctx = new PropertyContext(_ctx, getState());
		enterRule(_localctx, 60, RULE_property);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(511);
			identifierDef();
			setState(512);
			match(COLON);
			setState(513);
			type();
			setState(514);
			match(PROPERTY_ANNOTATION);
			setState(515);
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
		public ParamsListContext paramsList() {
			return getRuleContext(ParamsListContext.class,0);
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
		enterRule(_localctx, 62, RULE_functionMethod);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(517);
			match(DEF);
			setState(518);
			methodName();
			setState(519);
			match(OPEN_BRACKET);
			setState(521);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==NAME_STARTING_LC) {
				{
				setState(520);
				paramsList();
				}
			}

			setState(523);
			match(CLOSE_BRACKET);
			setState(524);
			match(ARROW);
			setState(525);
			type();
			setState(526);
			match(COLON);
			setState(527);
			match(FUNCTION_METHOD_ANNOTATION);
			setState(528);
			match(NL);
			setState(532);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while ((((_la) & ~0x3f) == 0 && ((1L << _la) & -2373397003624224672L) != 0) || ((((_la - 74)) & ~0x3f) == 0 && ((1L << (_la - 74)) & 1125920291160227L) != 0)) {
				{
				{
				setState(529);
				ordinaryStatement();
				}
				}
				setState(534);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			setState(535);
			returnStatement();
			setState(536);
			match(COMMENT);
			setState(537);
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
		public ParamsListContext paramsList() {
			return getRuleContext(ParamsListContext.class,0);
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
		enterRule(_localctx, 64, RULE_procedureMethod);
		int _la;
		try {
			int _alt;
			enterOuterAlt(_localctx, 1);
			{
			setState(539);
			match(DEF);
			setState(540);
			methodName();
			setState(541);
			match(OPEN_BRACKET);
			setState(543);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==NAME_STARTING_LC) {
				{
				setState(542);
				paramsList();
				}
			}

			setState(545);
			match(CLOSE_BRACKET);
			setState(546);
			match(ARROW);
			setState(547);
			match(NONE);
			setState(548);
			match(COLON);
			setState(549);
			match(PROCEDURE_METHOD_ANNOTATION);
			setState(550);
			match(NL);
			setState(554);
			_errHandler.sync(this);
			_alt = getInterpreter().adaptivePredict(_input,31,_ctx);
			while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER ) {
				if ( _alt==1 ) {
					{
					{
					setState(551);
					ordinaryStatement();
					}
					} 
				}
				setState(556);
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,31,_ctx);
			}
			setState(557);
			match(COMMENT);
			setState(558);
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
		public ParamsListContext paramsList() {
			return getRuleContext(ParamsListContext.class,0);
		}
		public AbstractFunctionContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_abstractFunction; }
	}

	public final AbstractFunctionContext abstractFunction() throws RecognitionException {
		AbstractFunctionContext _localctx = new AbstractFunctionContext(_ctx, getState());
		enterRule(_localctx, 66, RULE_abstractFunction);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(560);
			match(ABSTRACT_METHOD);
			setState(561);
			match(NL);
			setState(562);
			match(DEF);
			setState(563);
			methodName();
			setState(564);
			match(OPEN_BRACKET);
			setState(566);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==NAME_STARTING_LC) {
				{
				setState(565);
				paramsList();
				}
			}

			setState(568);
			match(CLOSE_BRACKET);
			setState(569);
			match(ARROW);
			setState(570);
			type();
			setState(571);
			match(COLON);
			setState(572);
			match(NL);
			setState(573);
			match(PASS);
			setState(574);
			match(COMMENT);
			setState(575);
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
		public ParamsListContext paramsList() {
			return getRuleContext(ParamsListContext.class,0);
		}
		public AbstractProcedureContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_abstractProcedure; }
	}

	public final AbstractProcedureContext abstractProcedure() throws RecognitionException {
		AbstractProcedureContext _localctx = new AbstractProcedureContext(_ctx, getState());
		enterRule(_localctx, 68, RULE_abstractProcedure);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(577);
			match(ABSTRACT_METHOD);
			setState(578);
			match(NL);
			setState(579);
			match(DEF);
			setState(580);
			methodName();
			setState(581);
			match(OPEN_BRACKET);
			setState(583);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==NAME_STARTING_LC) {
				{
				setState(582);
				paramsList();
				}
			}

			setState(585);
			match(CLOSE_BRACKET);
			setState(586);
			match(ARROW);
			setState(587);
			match(NONE);
			setState(588);
			match(COLON);
			setState(589);
			match(NL);
			setState(590);
			match(PASS);
			setState(591);
			match(COMMENT);
			setState(592);
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
		enterRule(_localctx, 70, RULE_identifierDef);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(594);
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
		enterRule(_localctx, 72, RULE_identifierUse);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(596);
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
		int _startState = 74;
		enterRecursionRule(_localctx, 74, RULE_assignable, _p);
		try {
			int _alt;
			enterOuterAlt(_localctx, 1);
			{
			setState(603);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case NAME_STARTING_LC:
				{
				setState(599);
				identifierUse();
				}
				break;
			case THIS_INSTANCE:
				{
				setState(600);
				match(THIS_INSTANCE);
				setState(601);
				match(DOT);
				setState(602);
				identifierUse();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			_ctx.stop = _input.LT(-1);
			setState(609);
			_errHandler.sync(this);
			_alt = getInterpreter().adaptivePredict(_input,35,_ctx);
			while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER ) {
				if ( _alt==1 ) {
					if ( _parseListeners!=null ) triggerExitRuleEvent();
					_prevctx = _localctx;
					{
					{
					_localctx = new AssignableContext(_parentctx, _parentState);
					pushNewRecursionContext(_localctx, _startState, RULE_assignable);
					setState(605);
					if (!(precpred(_ctx, 1))) throw new FailedPredicateException(this, "precpred(_ctx, 1)");
					setState(606);
					index();
					}
					} 
				}
				setState(611);
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,35,_ctx);
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
		enterRule(_localctx, 76, RULE_methodName);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(612);
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
		enterRule(_localctx, 78, RULE_testName);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(614);
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
		enterRule(_localctx, 80, RULE_typeName);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(616);
			_la = _input.LA(1);
			if ( !(((((_la - 56)) & ~0x3f) == 0 && ((1L << (_la - 56)) & 8796093022239L) != 0)) ) {
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
		enterRule(_localctx, 82, RULE_constantValue);
		try {
			setState(622);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case TRUE:
			case FALSE:
				enterOuterAlt(_localctx, 1);
				{
				setState(618);
				litBoolean();
				}
				break;
			case LITERAL_BINARY:
			case LITERAL_HEX:
			case LITERAL_INTEGER:
				enterOuterAlt(_localctx, 2);
				{
				setState(619);
				litInt();
				}
				break;
			case LITERAL_FLOAT:
				enterOuterAlt(_localctx, 3);
				{
				setState(620);
				litFloat();
				}
				break;
			case INTERPOLATED_STRING_PREFIX:
			case LITERAL_STRING:
				enterOuterAlt(_localctx, 4);
				{
				setState(621);
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
		enterRule(_localctx, 84, RULE_argList);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(624);
			argument();
			setState(629);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==COMMA) {
				{
				{
				setState(625);
				match(COMMA);
				setState(626);
				argument();
				}
				}
				setState(631);
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
		enterRule(_localctx, 86, RULE_argument);
		try {
			setState(634);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case LAMBDA:
				enterOuterAlt(_localctx, 1);
				{
				setState(632);
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
			case INTERPOLATED_STRING_PREFIX:
			case THIS_INSTANCE:
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
				enterOuterAlt(_localctx, 2);
				{
				setState(633);
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
	public static class ParamsListContext extends ParserRuleContext {
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
		public ParamsListContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_paramsList; }
	}

	public final ParamsListContext paramsList() throws RecognitionException {
		ParamsListContext _localctx = new ParamsListContext(_ctx, getState());
		enterRule(_localctx, 88, RULE_paramsList);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(636);
			paramDef();
			setState(641);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==COMMA) {
				{
				{
				setState(637);
				match(COMMA);
				setState(638);
				paramDef();
				}
				}
				setState(643);
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
		enterRule(_localctx, 90, RULE_type);
		try {
			setState(648);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,40,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(644);
				typeTuple();
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(645);
				typeName();
				}
				break;
			case 3:
				enterOuterAlt(_localctx, 3);
				{
				setState(646);
				typeGeneric();
				}
				break;
			case 4:
				enterOuterAlt(_localctx, 4);
				{
				setState(647);
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
	public static class EnumValuesListContext extends ParserRuleContext {
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
		public EnumValuesListContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_enumValuesList; }
	}

	public final EnumValuesListContext enumValuesList() throws RecognitionException {
		EnumValuesListContext _localctx = new EnumValuesListContext(_ctx, getState());
		enterRule(_localctx, 92, RULE_enumValuesList);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(650);
			identifierDef();
			setState(655);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==COMMA) {
				{
				{
				setState(651);
				match(COMMA);
				setState(652);
				identifierDef();
				}
				}
				setState(657);
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
		enterRule(_localctx, 94, RULE_assertActual);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(658);
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
		enterRule(_localctx, 96, RULE_litValue);
		try {
			setState(665);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case TRUE:
			case FALSE:
				enterOuterAlt(_localctx, 1);
				{
				setState(660);
				litBoolean();
				}
				break;
			case LITERAL_BINARY:
			case LITERAL_HEX:
			case LITERAL_INTEGER:
				enterOuterAlt(_localctx, 2);
				{
				setState(661);
				litInt();
				}
				break;
			case LITERAL_FLOAT:
				enterOuterAlt(_localctx, 3);
				{
				setState(662);
				litFloat();
				}
				break;
			case INTERPOLATED_STRING_PREFIX:
			case LITERAL_STRING:
				enterOuterAlt(_localctx, 4);
				{
				setState(663);
				litString();
				}
				break;
			case INT_NAME:
			case FLOAT_NAME:
			case BOOL_NAME:
			case STRING_NAME:
			case LIST_NAME:
			case NAME_STARTING_UC:
				enterOuterAlt(_localctx, 5);
				{
				setState(664);
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
		public TerminalNode TRUE() { return getToken(PythonParser.TRUE, 0); }
		public TerminalNode FALSE() { return getToken(PythonParser.FALSE, 0); }
		public LitBooleanContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_litBoolean; }
	}

	public final LitBooleanContext litBoolean() throws RecognitionException {
		LitBooleanContext _localctx = new LitBooleanContext(_ctx, getState());
		enterRule(_localctx, 98, RULE_litBoolean);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(667);
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
		enterRule(_localctx, 100, RULE_litInt);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(669);
			_la = _input.LA(1);
			if ( !(((((_la - 100)) & ~0x3f) == 0 && ((1L << (_la - 100)) & 7L) != 0)) ) {
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
		enterRule(_localctx, 102, RULE_litFloat);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(671);
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
		public TerminalNode INTERPOLATED_STRING_PREFIX() { return getToken(PythonParser.INTERPOLATED_STRING_PREFIX, 0); }
		public LitStringContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_litString; }
	}

	public final LitStringContext litString() throws RecognitionException {
		LitStringContext _localctx = new LitStringContext(_ctx, getState());
		enterRule(_localctx, 104, RULE_litString);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(674);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==INTERPOLATED_STRING_PREFIX) {
				{
				setState(673);
				match(INTERPOLATED_STRING_PREFIX);
				}
			}

			setState(676);
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
		enterRule(_localctx, 106, RULE_enumValue);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(678);
			typeName();
			setState(679);
			match(DOT);
			setState(680);
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
		enterRule(_localctx, 108, RULE_litRegExp);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(682);
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
		enterRule(_localctx, 110, RULE_index);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(684);
			match(OPEN_SQ_BRACKET);
			setState(685);
			expression(0);
			setState(686);
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
		public ExpressionContext expression() {
			return getRuleContext(ExpressionContext.class,0);
		}
		public IfClauseContext ifClause() {
			return getRuleContext(IfClauseContext.class,0);
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
		int _startState = 112;
		enterRecursionRule(_localctx, 112, RULE_expression, _p);
		try {
			int _alt;
			enterOuterAlt(_localctx, 1);
			{
			setState(693);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,44,_ctx) ) {
			case 1:
				{
				setState(689);
				newInstance();
				}
				break;
			case 2:
				{
				setState(690);
				unaryExpression();
				}
				break;
			case 3:
				{
				setState(691);
				term();
				}
				break;
			case 4:
				{
				setState(692);
				binaryExpression();
				}
				break;
			}
			_ctx.stop = _input.LT(-1);
			setState(699);
			_errHandler.sync(this);
			_alt = getInterpreter().adaptivePredict(_input,45,_ctx);
			while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER ) {
				if ( _alt==1 ) {
					if ( _parseListeners!=null ) triggerExitRuleEvent();
					_prevctx = _localctx;
					{
					{
					_localctx = new ExpressionContext(_parentctx, _parentState);
					pushNewRecursionContext(_localctx, _startState, RULE_expression);
					setState(695);
					if (!(precpred(_ctx, 1))) throw new FailedPredicateException(this, "precpred(_ctx, 1)");
					setState(696);
					ifClause();
					}
					} 
				}
				setState(701);
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,45,_ctx);
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
	public static class IfClauseContext extends ParserRuleContext {
		public TerminalNode IF() { return getToken(PythonParser.IF, 0); }
		public List<ExpressionContext> expression() {
			return getRuleContexts(ExpressionContext.class);
		}
		public ExpressionContext expression(int i) {
			return getRuleContext(ExpressionContext.class,i);
		}
		public TerminalNode ELSE() { return getToken(PythonParser.ELSE, 0); }
		public List<TerminalNode> ELIF() { return getTokens(PythonParser.ELIF); }
		public TerminalNode ELIF(int i) {
			return getToken(PythonParser.ELIF, i);
		}
		public IfClauseContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_ifClause; }
	}

	public final IfClauseContext ifClause() throws RecognitionException {
		IfClauseContext _localctx = new IfClauseContext(_ctx, getState());
		enterRule(_localctx, 114, RULE_ifClause);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(702);
			match(IF);
			setState(703);
			expression(0);
			setState(708);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==ELIF) {
				{
				{
				setState(704);
				match(ELIF);
				setState(705);
				expression(0);
				}
				}
				setState(710);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			setState(711);
			match(ELSE);
			setState(712);
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
	public static class TermContext extends ParserRuleContext {
		public ChainHeadContext chainHead() {
			return getRuleContext(ChainHeadContext.class,0);
		}
		public ChainTailContext chainTail() {
			return getRuleContext(ChainTailContext.class,0);
		}
		public TermContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_term; }
	}

	public final TermContext term() throws RecognitionException {
		TermContext _localctx = new TermContext(_ctx, getState());
		enterRule(_localctx, 116, RULE_term);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(714);
			chainHead();
			setState(716);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,47,_ctx) ) {
			case 1:
				{
				setState(715);
				chainTail();
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
	public static class ChainHeadContext extends ParserRuleContext {
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
		public ChainableContext chainable() {
			return getRuleContext(ChainableContext.class,0);
		}
		public ChainHeadContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_chainHead; }
	}

	public final ChainHeadContext chainHead() throws RecognitionException {
		ChainHeadContext _localctx = new ChainHeadContext(_ctx, getState());
		enterRule(_localctx, 118, RULE_chainHead);
		try {
			setState(725);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,48,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(718);
				thisInstance();
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(719);
				bracketedExpression();
				}
				break;
			case 3:
				enterOuterAlt(_localctx, 3);
				{
				setState(720);
				litValue();
				}
				break;
			case 4:
				enterOuterAlt(_localctx, 4);
				{
				setState(721);
				list();
				}
				break;
			case 5:
				enterOuterAlt(_localctx, 5);
				{
				setState(722);
				dictionary();
				}
				break;
			case 6:
				enterOuterAlt(_localctx, 6);
				{
				setState(723);
				tuple();
				}
				break;
			case 7:
				enterOuterAlt(_localctx, 7);
				{
				setState(724);
				chainable();
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
	public static class ChainTailContext extends ParserRuleContext {
		public List<TerminalNode> DOT() { return getTokens(PythonParser.DOT); }
		public TerminalNode DOT(int i) {
			return getToken(PythonParser.DOT, i);
		}
		public List<ChainableContext> chainable() {
			return getRuleContexts(ChainableContext.class);
		}
		public ChainableContext chainable(int i) {
			return getRuleContext(ChainableContext.class,i);
		}
		public ChainTailContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_chainTail; }
	}

	public final ChainTailContext chainTail() throws RecognitionException {
		ChainTailContext _localctx = new ChainTailContext(_ctx, getState());
		enterRule(_localctx, 120, RULE_chainTail);
		try {
			int _alt;
			enterOuterAlt(_localctx, 1);
			{
			setState(729); 
			_errHandler.sync(this);
			_alt = 1;
			do {
				switch (_alt) {
				case 1:
					{
					{
					setState(727);
					match(DOT);
					setState(728);
					chainable();
					}
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				setState(731); 
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,49,_ctx);
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
		enterRule(_localctx, 122, RULE_chainable);
		try {
			int _alt;
			enterOuterAlt(_localctx, 1);
			{
			setState(735);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,50,_ctx) ) {
			case 1:
				{
				setState(733);
				identifierUse();
				}
				break;
			case 2:
				{
				setState(734);
				methodCall();
				}
				break;
			}
			setState(740);
			_errHandler.sync(this);
			_alt = getInterpreter().adaptivePredict(_input,51,_ctx);
			while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER ) {
				if ( _alt==1 ) {
					{
					{
					setState(737);
					index();
					}
					} 
				}
				setState(742);
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,51,_ctx);
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
		enterRule(_localctx, 124, RULE_thisInstance);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(743);
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
		enterRule(_localctx, 126, RULE_bracketedExpression);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(745);
			match(OPEN_BRACKET);
			setState(746);
			expression(0);
			setState(747);
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
		public TermContext term() {
			return getRuleContext(TermContext.class,0);
		}
		public TerminalNode MINUS() { return getToken(PythonParser.MINUS, 0); }
		public TerminalNode NOT() { return getToken(PythonParser.NOT, 0); }
		public UnaryExpressionContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_unaryExpression; }
	}

	public final UnaryExpressionContext unaryExpression() throws RecognitionException {
		UnaryExpressionContext _localctx = new UnaryExpressionContext(_ctx, getState());
		enterRule(_localctx, 128, RULE_unaryExpression);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(749);
			_la = _input.LA(1);
			if ( !(_la==NOT || _la==MINUS) ) {
			_errHandler.recoverInline(this);
			}
			else {
				if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
				_errHandler.reportMatch(this);
				consume();
			}
			setState(750);
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
	public static class BinaryExpressionContext extends ParserRuleContext {
		public TermContext term() {
			return getRuleContext(TermContext.class,0);
		}
		public BinaryOperatorContext binaryOperator() {
			return getRuleContext(BinaryOperatorContext.class,0);
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
		enterRule(_localctx, 130, RULE_binaryExpression);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(752);
			term();
			setState(753);
			binaryOperator();
			setState(754);
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
	public static class TupleContext extends ParserRuleContext {
		public TerminalNode OPEN_BRACKET() { return getToken(PythonParser.OPEN_BRACKET, 0); }
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
		public TerminalNode CLOSE_BRACKET() { return getToken(PythonParser.CLOSE_BRACKET, 0); }
		public TupleContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_tuple; }
	}

	public final TupleContext tuple() throws RecognitionException {
		TupleContext _localctx = new TupleContext(_ctx, getState());
		enterRule(_localctx, 132, RULE_tuple);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(756);
			match(OPEN_BRACKET);
			setState(757);
			expression(0);
			setState(758);
			match(COMMA);
			setState(759);
			expression(0);
			setState(764);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==COMMA) {
				{
				{
				setState(760);
				match(COMMA);
				setState(761);
				expression(0);
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
	public static class DictionaryContext extends ParserRuleContext {
		public TerminalNode OPEN_SQ_BRACKET() { return getToken(PythonParser.OPEN_SQ_BRACKET, 0); }
		public KvpListContext kvpList() {
			return getRuleContext(KvpListContext.class,0);
		}
		public TerminalNode CLOSE_SQ_BRACKET() { return getToken(PythonParser.CLOSE_SQ_BRACKET, 0); }
		public DictionaryContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_dictionary; }
	}

	public final DictionaryContext dictionary() throws RecognitionException {
		DictionaryContext _localctx = new DictionaryContext(_ctx, getState());
		enterRule(_localctx, 134, RULE_dictionary);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(769);
			match(OPEN_SQ_BRACKET);
			setState(770);
			kvpList();
			setState(771);
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
		enterRule(_localctx, 136, RULE_kvpList);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(773);
			kvp();
			setState(778);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==COMMA) {
				{
				{
				setState(774);
				match(COMMA);
				setState(775);
				kvp();
				}
				}
				setState(780);
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
		enterRule(_localctx, 138, RULE_kvp);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(781);
			expression(0);
			setState(782);
			match(COLON);
			setState(783);
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
		enterRule(_localctx, 140, RULE_methodCall);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(785);
			methodName();
			setState(786);
			match(OPEN_BRACKET);
			setState(788);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if ((((_la) & ~0x3f) == 0 && ((1L << _la) & -36028797018963456L) != 0) || ((((_la - 66)) & ~0x3f) == 0 && ((1L << (_la - 66)) & 820340892417L) != 0)) {
				{
				setState(787);
				argList();
				}
			}

			setState(790);
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
		public BinaryOperatorContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_binaryOperator; }
	}

	public final BinaryOperatorContext binaryOperator() throws RecognitionException {
		BinaryOperatorContext _localctx = new BinaryOperatorContext(_ctx, getState());
		enterRule(_localctx, 142, RULE_binaryOperator);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(792);
			_la = _input.LA(1);
			if ( !(((((_la - 64)) & ~0x3f) == 0 && ((1L << (_la - 64)) & 1069547579L) != 0)) ) {
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
		enterRule(_localctx, 144, RULE_newInstance);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(794);
			type();
			setState(795);
			match(OPEN_BRACKET);
			setState(797);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if ((((_la) & ~0x3f) == 0 && ((1L << _la) & -36028797018963456L) != 0) || ((((_la - 66)) & ~0x3f) == 0 && ((1L << (_la - 66)) & 820340892417L) != 0)) {
				{
				setState(796);
				argList();
				}
			}

			setState(799);
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
		enterRule(_localctx, 146, RULE_paramDef);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(801);
			identifierDef();
			setState(802);
			match(COLON);
			setState(803);
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
		enterRule(_localctx, 148, RULE_typeGeneric);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(805);
			typeName();
			setState(806);
			match(OPEN_SQ_BRACKET);
			setState(807);
			type();
			setState(812);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==COMMA) {
				{
				{
				setState(808);
				match(COMMA);
				setState(809);
				type();
				}
				}
				setState(814);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			setState(815);
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
		enterRule(_localctx, 150, RULE_typeFunc);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(817);
			match(FUNC_NAME);
			setState(818);
			match(OPEN_SQ_BRACKET);
			setState(819);
			match(OPEN_SQ_BRACKET);
			setState(820);
			type();
			setState(825);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==COMMA) {
				{
				{
				setState(821);
				match(COMMA);
				setState(822);
				type();
				}
				}
				setState(827);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			setState(828);
			match(CLOSE_SQ_BRACKET);
			setState(829);
			match(COMMA);
			setState(830);
			type();
			setState(831);
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
		enterRule(_localctx, 152, RULE_typeTuple);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(833);
			match(TUPLE);
			setState(834);
			match(OPEN_SQ_BRACKET);
			setState(835);
			type();
			setState(838); 
			_errHandler.sync(this);
			_la = _input.LA(1);
			do {
				{
				{
				setState(836);
				match(COMMA);
				setState(837);
				type();
				}
				}
				setState(840); 
				_errHandler.sync(this);
				_la = _input.LA(1);
			} while ( _la==COMMA );
			setState(842);
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
		public ArgListContext argList() {
			return getRuleContext(ArgListContext.class,0);
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
		enterRule(_localctx, 154, RULE_lambda);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(844);
			match(LAMBDA);
			setState(845);
			argList();
			setState(846);
			match(COLON);
			setState(847);
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
	public static class ListContext extends ParserRuleContext {
		public TerminalNode OPEN_SQ_BRACKET() { return getToken(PythonParser.OPEN_SQ_BRACKET, 0); }
		public List<ExpressionContext> expression() {
			return getRuleContexts(ExpressionContext.class);
		}
		public ExpressionContext expression(int i) {
			return getRuleContext(ExpressionContext.class,i);
		}
		public TerminalNode CLOSE_SQ_BRACKET() { return getToken(PythonParser.CLOSE_SQ_BRACKET, 0); }
		public List<TerminalNode> COMMA() { return getTokens(PythonParser.COMMA); }
		public TerminalNode COMMA(int i) {
			return getToken(PythonParser.COMMA, i);
		}
		public ListContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_list; }
	}

	public final ListContext list() throws RecognitionException {
		ListContext _localctx = new ListContext(_ctx, getState());
		enterRule(_localctx, 156, RULE_list);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(849);
			match(OPEN_SQ_BRACKET);
			setState(850);
			expression(0);
			setState(855);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==COMMA) {
				{
				{
				setState(851);
				match(COMMA);
				setState(852);
				expression(0);
				}
				}
				setState(857);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			setState(858);
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
	public static class InterpolatedStringContext extends ParserRuleContext {
		public TerminalNode INTERPOLATED_STRING_PREFIX() { return getToken(PythonParser.INTERPOLATED_STRING_PREFIX, 0); }
		public TerminalNode LITERAL_STRING() { return getToken(PythonParser.LITERAL_STRING, 0); }
		public InterpolatedStringContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_interpolatedString; }
	}

	public final InterpolatedStringContext interpolatedString() throws RecognitionException {
		InterpolatedStringContext _localctx = new InterpolatedStringContext(_ctx, getState());
		enterRule(_localctx, 158, RULE_interpolatedString);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(860);
			match(INTERPOLATED_STRING_PREFIX);
			setState(861);
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
	public static class PowerContext extends ParserRuleContext {
		public List<TermContext> term() {
			return getRuleContexts(TermContext.class);
		}
		public TermContext term(int i) {
			return getRuleContext(TermContext.class,i);
		}
		public TerminalNode POWER() { return getToken(PythonParser.POWER, 0); }
		public PowerContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_power; }
	}

	public final PowerContext power() throws RecognitionException {
		PowerContext _localctx = new PowerContext(_ctx, getState());
		enterRule(_localctx, 160, RULE_power);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(863);
			term();
			setState(864);
			match(POWER);
			setState(865);
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

	public boolean sempred(RuleContext _localctx, int ruleIndex, int predIndex) {
		switch (ruleIndex) {
		case 37:
			return assignable_sempred((AssignableContext)_localctx, predIndex);
		case 56:
			return expression_sempred((ExpressionContext)_localctx, predIndex);
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

	public static final String _serializedATN =
		"\u0004\u0001|\u0364\u0002\u0000\u0007\u0000\u0002\u0001\u0007\u0001\u0002"+
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
		"P\u0007P\u0001\u0000\u0003\u0000\u00a4\b\u0000\u0001\u0000\u0005\u0000"+
		"\u00a7\b\u0000\n\u0000\f\u0000\u00aa\t\u0000\u0001\u0000\u0005\u0000\u00ad"+
		"\b\u0000\n\u0000\f\u0000\u00b0\t\u0000\u0001\u0000\u0001\u0000\u0001\u0001"+
		"\u0001\u0001\u0001\u0001\u0001\u0001\u0001\u0001\u0001\u0001\u0001\u0001"+
		"\u0001\u0001\u0001\u0001\u0003\u0001\u00bd\b\u0001\u0001\u0002\u0001\u0002"+
		"\u0001\u0002\u0001\u0002\u0001\u0002\u0001\u0002\u0001\u0002\u0001\u0002"+
		"\u0001\u0002\u0001\u0002\u0005\u0002\u00c9\b\u0002\n\u0002\f\u0002\u00cc"+
		"\t\u0002\u0001\u0002\u0001\u0002\u0001\u0002\u0001\u0003\u0001\u0003\u0001"+
		"\u0003\u0001\u0003\u0003\u0003\u00d5\b\u0003\u0001\u0003\u0001\u0003\u0001"+
		"\u0003\u0001\u0003\u0001\u0003\u0001\u0003\u0001\u0003\u0005\u0003\u00de"+
		"\b\u0003\n\u0003\f\u0003\u00e1\t\u0003\u0001\u0003\u0001\u0003\u0001\u0003"+
		"\u0001\u0003\u0001\u0004\u0001\u0004\u0001\u0004\u0001\u0004\u0001\u0004"+
		"\u0001\u0004\u0001\u0004\u0001\u0004\u0001\u0004\u0001\u0004\u0005\u0004"+
		"\u00f1\b\u0004\n\u0004\f\u0004\u00f4\t\u0004\u0001\u0004\u0001\u0004\u0001"+
		"\u0004\u0001\u0005\u0001\u0005\u0001\u0005\u0001\u0005\u0003\u0005\u00fd"+
		"\b\u0005\u0001\u0005\u0001\u0005\u0001\u0005\u0001\u0005\u0001\u0005\u0001"+
		"\u0005\u0001\u0005\u0005\u0005\u0106\b\u0005\n\u0005\f\u0005\u0109\t\u0005"+
		"\u0001\u0005\u0001\u0005\u0001\u0005\u0001\u0006\u0001\u0006\u0001\u0006"+
		"\u0001\u0006\u0001\u0006\u0001\u0006\u0001\u0007\u0001\u0007\u0001\u0007"+
		"\u0001\u0007\u0001\u0007\u0001\u0007\u0001\u0007\u0001\u0007\u0001\u0007"+
		"\u0001\u0007\u0001\u0007\u0001\u0007\u0001\b\u0001\b\u0001\b\u0001\b\u0001"+
		"\b\u0001\b\u0003\b\u0126\b\b\u0001\b\u0001\b\u0001\b\u0001\b\u0001\b\u0001"+
		"\b\u0001\b\u0001\b\u0005\b\u0130\b\b\n\b\f\b\u0133\t\b\u0001\b\u0001\b"+
		"\u0001\b\u0001\t\u0001\t\u0001\t\u0001\t\u0001\t\u0001\t\u0003\t\u013e"+
		"\b\t\u0001\t\u0001\t\u0001\t\u0001\t\u0001\t\u0001\t\u0001\t\u0001\t\u0005"+
		"\t\u0148\b\t\n\t\f\t\u014b\t\t\u0001\t\u0001\t\u0001\t\u0001\n\u0001\n"+
		"\u0001\n\u0001\u000b\u0001\u000b\u0001\f\u0001\f\u0001\f\u0001\f\u0001"+
		"\f\u0001\f\u0001\f\u0001\f\u0001\f\u0001\f\u0001\f\u0003\f\u0160\b\f\u0001"+
		"\r\u0001\r\u0001\r\u0003\r\u0165\b\r\u0001\r\u0001\r\u0001\r\u0001\u000e"+
		"\u0001\u000e\u0001\u000e\u0001\u000e\u0001\u000e\u0001\u000e\u0001\u000f"+
		"\u0001\u000f\u0001\u000f\u0001\u000f\u0001\u000f\u0001\u000f\u0001\u0010"+
		"\u0001\u0010\u0001\u0010\u0001\u0010\u0001\u0010\u0001\u0010\u0001\u0010"+
		"\u0001\u0010\u0001\u0010\u0001\u0011\u0001\u0011\u0001\u0011\u0001\u0011"+
		"\u0001\u0011\u0001\u0011\u0001\u0011\u0005\u0011\u0186\b\u0011\n\u0011"+
		"\f\u0011\u0189\t\u0011\u0001\u0011\u0001\u0011\u0001\u0011\u0001\u0012"+
		"\u0001\u0012\u0001\u0012\u0001\u0012\u0001\u0012\u0005\u0012\u0193\b\u0012"+
		"\n\u0012\f\u0012\u0196\t\u0012\u0001\u0012\u0001\u0012\u0001\u0012\u0001"+
		"\u0013\u0001\u0013\u0001\u0013\u0001\u0013\u0001\u0013\u0001\u0013\u0001"+
		"\u0013\u0005\u0013\u01a2\b\u0013\n\u0013\f\u0013\u01a5\t\u0013\u0001\u0013"+
		"\u0001\u0013\u0001\u0013\u0001\u0014\u0003\u0014\u01ab\b\u0014\u0001\u0014"+
		"\u0001\u0014\u0001\u0014\u0001\u0014\u0001\u0014\u0001\u0014\u0001\u0015"+
		"\u0001\u0015\u0001\u0016\u0001\u0016\u0001\u0016\u0005\u0016\u01b8\b\u0016"+
		"\n\u0016\f\u0016\u01bb\t\u0016\u0001\u0016\u0001\u0016\u0005\u0016\u01bf"+
		"\b\u0016\n\u0016\f\u0016\u01c2\t\u0016\u0001\u0016\u0001\u0016\u0001\u0016"+
		"\u0001\u0017\u0001\u0017\u0001\u0017\u0001\u0017\u0001\u0017\u0001\u0017"+
		"\u0001\u0017\u0001\u0018\u0001\u0018\u0001\u0018\u0001\u0018\u0001\u0018"+
		"\u0001\u0018\u0001\u0018\u0001\u0018\u0001\u0018\u0001\u0018\u0001\u0019"+
		"\u0001\u0019\u0001\u0019\u0001\u0019\u0001\u001a\u0001\u001a\u0001\u001a"+
		"\u0001\u001a\u0001\u001a\u0001\u001a\u0001\u001b\u0001\u001b\u0001\u001b"+
		"\u0001\u001b\u0001\u001c\u0001\u001c\u0001\u001c\u0001\u001c\u0001\u001c"+
		"\u0001\u001c\u0001\u001d\u0001\u001d\u0001\u001d\u0001\u001d\u0003\u001d"+
		"\u01f0\b\u001d\u0001\u001d\u0001\u001d\u0001\u001d\u0001\u001d\u0001\u001d"+
		"\u0001\u001d\u0005\u001d\u01f8\b\u001d\n\u001d\f\u001d\u01fb\t\u001d\u0001"+
		"\u001d\u0001\u001d\u0001\u001d\u0001\u001e\u0001\u001e\u0001\u001e\u0001"+
		"\u001e\u0001\u001e\u0001\u001e\u0001\u001f\u0001\u001f\u0001\u001f\u0001"+
		"\u001f\u0003\u001f\u020a\b\u001f\u0001\u001f\u0001\u001f\u0001\u001f\u0001"+
		"\u001f\u0001\u001f\u0001\u001f\u0001\u001f\u0005\u001f\u0213\b\u001f\n"+
		"\u001f\f\u001f\u0216\t\u001f\u0001\u001f\u0001\u001f\u0001\u001f\u0001"+
		"\u001f\u0001 \u0001 \u0001 \u0001 \u0003 \u0220\b \u0001 \u0001 \u0001"+
		" \u0001 \u0001 \u0001 \u0001 \u0005 \u0229\b \n \f \u022c\t \u0001 \u0001"+
		" \u0001 \u0001!\u0001!\u0001!\u0001!\u0001!\u0001!\u0003!\u0237\b!\u0001"+
		"!\u0001!\u0001!\u0001!\u0001!\u0001!\u0001!\u0001!\u0001!\u0001\"\u0001"+
		"\"\u0001\"\u0001\"\u0001\"\u0001\"\u0003\"\u0248\b\"\u0001\"\u0001\"\u0001"+
		"\"\u0001\"\u0001\"\u0001\"\u0001\"\u0001\"\u0001\"\u0001#\u0001#\u0001"+
		"$\u0001$\u0001%\u0001%\u0001%\u0001%\u0001%\u0003%\u025c\b%\u0001%\u0001"+
		"%\u0005%\u0260\b%\n%\f%\u0263\t%\u0001&\u0001&\u0001\'\u0001\'\u0001("+
		"\u0001(\u0001)\u0001)\u0001)\u0001)\u0003)\u026f\b)\u0001*\u0001*\u0001"+
		"*\u0005*\u0274\b*\n*\f*\u0277\t*\u0001+\u0001+\u0003+\u027b\b+\u0001,"+
		"\u0001,\u0001,\u0005,\u0280\b,\n,\f,\u0283\t,\u0001-\u0001-\u0001-\u0001"+
		"-\u0003-\u0289\b-\u0001.\u0001.\u0001.\u0005.\u028e\b.\n.\f.\u0291\t."+
		"\u0001/\u0001/\u00010\u00010\u00010\u00010\u00010\u00030\u029a\b0\u0001"+
		"1\u00011\u00012\u00012\u00013\u00013\u00014\u00034\u02a3\b4\u00014\u0001"+
		"4\u00015\u00015\u00015\u00015\u00016\u00016\u00017\u00017\u00017\u0001"+
		"7\u00018\u00018\u00018\u00018\u00018\u00038\u02b6\b8\u00018\u00018\u0005"+
		"8\u02ba\b8\n8\f8\u02bd\t8\u00019\u00019\u00019\u00019\u00059\u02c3\b9"+
		"\n9\f9\u02c6\t9\u00019\u00019\u00019\u0001:\u0001:\u0003:\u02cd\b:\u0001"+
		";\u0001;\u0001;\u0001;\u0001;\u0001;\u0001;\u0003;\u02d6\b;\u0001<\u0001"+
		"<\u0004<\u02da\b<\u000b<\f<\u02db\u0001=\u0001=\u0003=\u02e0\b=\u0001"+
		"=\u0005=\u02e3\b=\n=\f=\u02e6\t=\u0001>\u0001>\u0001?\u0001?\u0001?\u0001"+
		"?\u0001@\u0001@\u0001@\u0001A\u0001A\u0001A\u0001A\u0001B\u0001B\u0001"+
		"B\u0001B\u0001B\u0001B\u0005B\u02fb\bB\nB\fB\u02fe\tB\u0001B\u0001B\u0001"+
		"C\u0001C\u0001C\u0001C\u0001D\u0001D\u0001D\u0005D\u0309\bD\nD\fD\u030c"+
		"\tD\u0001E\u0001E\u0001E\u0001E\u0001F\u0001F\u0001F\u0003F\u0315\bF\u0001"+
		"F\u0001F\u0001G\u0001G\u0001H\u0001H\u0001H\u0003H\u031e\bH\u0001H\u0001"+
		"H\u0001I\u0001I\u0001I\u0001I\u0001J\u0001J\u0001J\u0001J\u0001J\u0005"+
		"J\u032b\bJ\nJ\fJ\u032e\tJ\u0001J\u0001J\u0001K\u0001K\u0001K\u0001K\u0001"+
		"K\u0001K\u0005K\u0338\bK\nK\fK\u033b\tK\u0001K\u0001K\u0001K\u0001K\u0001"+
		"K\u0001L\u0001L\u0001L\u0001L\u0001L\u0004L\u0347\bL\u000bL\fL\u0348\u0001"+
		"L\u0001L\u0001M\u0001M\u0001M\u0001M\u0001M\u0001N\u0001N\u0001N\u0001"+
		"N\u0005N\u0356\bN\nN\fN\u0359\tN\u0001N\u0001N\u0001O\u0001O\u0001O\u0001"+
		"P\u0001P\u0001P\u0001P\u0001P\u0000\u0002JpQ\u0000\u0002\u0004\u0006\b"+
		"\n\f\u000e\u0010\u0012\u0014\u0016\u0018\u001a\u001c\u001e \"$&(*,.02"+
		"468:<>@BDFHJLNPRTVXZ\\^`bdfhjlnprtvxz|~\u0080\u0082\u0084\u0086\u0088"+
		"\u008a\u008c\u008e\u0090\u0092\u0094\u0096\u0098\u009a\u009c\u009e\u00a0"+
		"\u0000\u0005\u0002\u00008<cc\u0001\u0000>?\u0001\u0000df\u0002\u0000B"+
		"BWW\u0003\u0000@ACEV]\u0375\u0000\u00a3\u0001\u0000\u0000\u0000\u0002"+
		"\u00bc\u0001\u0000\u0000\u0000\u0004\u00be\u0001\u0000\u0000\u0000\u0006"+
		"\u00d0\u0001\u0000\u0000\u0000\b\u00e6\u0001\u0000\u0000\u0000\n\u00f8"+
		"\u0001\u0000\u0000\u0000\f\u010d\u0001\u0000\u0000\u0000\u000e\u0113\u0001"+
		"\u0000\u0000\u0000\u0010\u011f\u0001\u0000\u0000\u0000\u0012\u0137\u0001"+
		"\u0000\u0000\u0000\u0014\u014f\u0001\u0000\u0000\u0000\u0016\u0152\u0001"+
		"\u0000\u0000\u0000\u0018\u015f\u0001\u0000\u0000\u0000\u001a\u0161\u0001"+
		"\u0000\u0000\u0000\u001c\u0169\u0001\u0000\u0000\u0000\u001e\u016f\u0001"+
		"\u0000\u0000\u0000 \u0175\u0001\u0000\u0000\u0000\"\u017e\u0001\u0000"+
		"\u0000\u0000$\u018d\u0001\u0000\u0000\u0000&\u019a\u0001\u0000\u0000\u0000"+
		"(\u01aa\u0001\u0000\u0000\u0000*\u01b2\u0001\u0000\u0000\u0000,\u01b4"+
		"\u0001\u0000\u0000\u0000.\u01c6\u0001\u0000\u0000\u00000\u01cd\u0001\u0000"+
		"\u0000\u00002\u01d7\u0001\u0000\u0000\u00004\u01db\u0001\u0000\u0000\u0000"+
		"6\u01e1\u0001\u0000\u0000\u00008\u01e5\u0001\u0000\u0000\u0000:\u01eb"+
		"\u0001\u0000\u0000\u0000<\u01ff\u0001\u0000\u0000\u0000>\u0205\u0001\u0000"+
		"\u0000\u0000@\u021b\u0001\u0000\u0000\u0000B\u0230\u0001\u0000\u0000\u0000"+
		"D\u0241\u0001\u0000\u0000\u0000F\u0252\u0001\u0000\u0000\u0000H\u0254"+
		"\u0001\u0000\u0000\u0000J\u025b\u0001\u0000\u0000\u0000L\u0264\u0001\u0000"+
		"\u0000\u0000N\u0266\u0001\u0000\u0000\u0000P\u0268\u0001\u0000\u0000\u0000"+
		"R\u026e\u0001\u0000\u0000\u0000T\u0270\u0001\u0000\u0000\u0000V\u027a"+
		"\u0001\u0000\u0000\u0000X\u027c\u0001\u0000\u0000\u0000Z\u0288\u0001\u0000"+
		"\u0000\u0000\\\u028a\u0001\u0000\u0000\u0000^\u0292\u0001\u0000\u0000"+
		"\u0000`\u0299\u0001\u0000\u0000\u0000b\u029b\u0001\u0000\u0000\u0000d"+
		"\u029d\u0001\u0000\u0000\u0000f\u029f\u0001\u0000\u0000\u0000h\u02a2\u0001"+
		"\u0000\u0000\u0000j\u02a6\u0001\u0000\u0000\u0000l\u02aa\u0001\u0000\u0000"+
		"\u0000n\u02ac\u0001\u0000\u0000\u0000p\u02b5\u0001\u0000\u0000\u0000r"+
		"\u02be\u0001\u0000\u0000\u0000t\u02ca\u0001\u0000\u0000\u0000v\u02d5\u0001"+
		"\u0000\u0000\u0000x\u02d9\u0001\u0000\u0000\u0000z\u02df\u0001\u0000\u0000"+
		"\u0000|\u02e7\u0001\u0000\u0000\u0000~\u02e9\u0001\u0000\u0000\u0000\u0080"+
		"\u02ed\u0001\u0000\u0000\u0000\u0082\u02f0\u0001\u0000\u0000\u0000\u0084"+
		"\u02f4\u0001\u0000\u0000\u0000\u0086\u0301\u0001\u0000\u0000\u0000\u0088"+
		"\u0305\u0001\u0000\u0000\u0000\u008a\u030d\u0001\u0000\u0000\u0000\u008c"+
		"\u0311\u0001\u0000\u0000\u0000\u008e\u0318\u0001\u0000\u0000\u0000\u0090"+
		"\u031a\u0001\u0000\u0000\u0000\u0092\u0321\u0001\u0000\u0000\u0000\u0094"+
		"\u0325\u0001\u0000\u0000\u0000\u0096\u0331\u0001\u0000\u0000\u0000\u0098"+
		"\u0341\u0001\u0000\u0000\u0000\u009a\u034c\u0001\u0000\u0000\u0000\u009c"+
		"\u0351\u0001\u0000\u0000\u0000\u009e\u035c\u0001\u0000\u0000\u0000\u00a0"+
		"\u035f\u0001\u0000\u0000\u0000\u00a2\u00a4\u0003\u0014\n\u0000\u00a3\u00a2"+
		"\u0001\u0000\u0000\u0000\u00a3\u00a4\u0001\u0000\u0000\u0000\u00a4\u00a8"+
		"\u0001\u0000\u0000\u0000\u00a5\u00a7\u0003\u0002\u0001\u0000\u00a6\u00a5"+
		"\u0001\u0000\u0000\u0000\u00a7\u00aa\u0001\u0000\u0000\u0000\u00a8\u00a6"+
		"\u0001\u0000\u0000\u0000\u00a8\u00a9\u0001\u0000\u0000\u0000\u00a9\u00ae"+
		"\u0001\u0000\u0000\u0000\u00aa\u00a8\u0001\u0000\u0000\u0000\u00ab\u00ad"+
		"\u0005`\u0000\u0000\u00ac\u00ab\u0001\u0000\u0000\u0000\u00ad\u00b0\u0001"+
		"\u0000\u0000\u0000\u00ae\u00ac\u0001\u0000\u0000\u0000\u00ae\u00af\u0001"+
		"\u0000\u0000\u0000\u00af\u00b1\u0001\u0000\u0000\u0000\u00b0\u00ae\u0001"+
		"\u0000\u0000\u0000\u00b1\u00b2\u0005\u0000\u0000\u0001\u00b2\u0001\u0001"+
		"\u0000\u0000\u0000\u00b3\u00bd\u0003\u0004\u0002\u0000\u00b4\u00bd\u0003"+
		"\u0006\u0003\u0000\u00b5\u00bd\u0003\b\u0004\u0000\u00b6\u00bd\u0003\n"+
		"\u0005\u0000\u00b7\u00bd\u0003\f\u0006\u0000\u00b8\u00bd\u0003\u000e\u0007"+
		"\u0000\u00b9\u00bd\u0003\u0010\b\u0000\u00ba\u00bd\u0003\u0012\t\u0000"+
		"\u00bb\u00bd\u0003\u0014\n\u0000\u00bc\u00b3\u0001\u0000\u0000\u0000\u00bc"+
		"\u00b4\u0001\u0000\u0000\u0000\u00bc\u00b5\u0001\u0000\u0000\u0000\u00bc"+
		"\u00b6\u0001\u0000\u0000\u0000\u00bc\u00b7\u0001\u0000\u0000\u0000\u00bc"+
		"\u00b8\u0001\u0000\u0000\u0000\u00bc\u00b9\u0001\u0000\u0000\u0000\u00bc"+
		"\u00ba\u0001\u0000\u0000\u0000\u00bc\u00bb\u0001\u0000\u0000\u0000\u00bd"+
		"\u0003\u0001\u0000\u0000\u0000\u00be\u00bf\u0005/\u0000\u0000\u00bf\u00c0"+
		"\u0005\n\u0000\u0000\u00c0\u00c1\u0005Q\u0000\u0000\u00c1\u00c2\u0005"+
		"R\u0000\u0000\u00c2\u00c3\u0005R\u0000\u0000\u00c3\u00c4\u0005F\u0000"+
		"\u0000\u00c4\u00c5\u00052\u0000\u0000\u00c5\u00c6\u0005U\u0000\u0000\u00c6"+
		"\u00ca\u0005`\u0000\u0000\u00c7\u00c9\u0003\u0018\f\u0000\u00c8\u00c7"+
		"\u0001\u0000\u0000\u0000\u00c9\u00cc\u0001\u0000\u0000\u0000\u00ca\u00c8"+
		"\u0001\u0000\u0000\u0000\u00ca\u00cb\u0001\u0000\u0000\u0000\u00cb\u00cd"+
		"\u0001\u0000\u0000\u0000\u00cc\u00ca\u0001\u0000\u0000\u0000\u00cd\u00ce"+
		"\u0005|\u0000\u0000\u00ce\u00cf\u0005`\u0000\u0000\u00cf\u0005\u0001\u0000"+
		"\u0000\u0000\u00d0\u00d1\u0005/\u0000\u0000\u00d1\u00d2\u0003L&\u0000"+
		"\u00d2\u00d4\u0005Q\u0000\u0000\u00d3\u00d5\u0003X,\u0000\u00d4\u00d3"+
		"\u0001\u0000\u0000\u0000\u00d4\u00d5\u0001\u0000\u0000\u0000\u00d5\u00d6"+
		"\u0001\u0000\u0000\u0000\u00d6\u00d7\u0005R\u0000\u0000\u00d7\u00d8\u0005"+
		"F\u0000\u0000\u00d8\u00d9\u0003Z-\u0000\u00d9\u00da\u0005U\u0000\u0000"+
		"\u00da\u00db\u0005m\u0000\u0000\u00db\u00df\u0005`\u0000\u0000\u00dc\u00de"+
		"\u0003\u0018\f\u0000\u00dd\u00dc\u0001\u0000\u0000\u0000\u00de\u00e1\u0001"+
		"\u0000\u0000\u0000\u00df\u00dd\u0001\u0000\u0000\u0000\u00df\u00e0\u0001"+
		"\u0000\u0000\u0000\u00e0\u00e2\u0001\u0000\u0000\u0000\u00e1\u00df\u0001"+
		"\u0000\u0000\u0000\u00e2\u00e3\u00032\u0019\u0000\u00e3\u00e4\u0005|\u0000"+
		"\u0000\u00e4\u00e5\u0005`\u0000\u0000\u00e5\u0007\u0001\u0000\u0000\u0000"+
		"\u00e6\u00e7\u0005\u0001\u0000\u0000\u00e7\u00e8\u0003N\'\u0000\u00e8"+
		"\u00e9\u0005Q\u0000\u0000\u00e9\u00ea\u00056\u0000\u0000\u00ea\u00eb\u0005"+
		"R\u0000\u0000\u00eb\u00ec\u0005|\u0000\u0000\u00ec\u00f2\u0005`\u0000"+
		"\u0000\u00ed\u00f1\u00030\u0018\u0000\u00ee\u00f1\u0003\u001c\u000e\u0000"+
		"\u00ef\u00f1\u0003\u0014\n\u0000\u00f0\u00ed\u0001\u0000\u0000\u0000\u00f0"+
		"\u00ee\u0001\u0000\u0000\u0000\u00f0\u00ef\u0001\u0000\u0000\u0000\u00f1"+
		"\u00f4\u0001\u0000\u0000\u0000\u00f2\u00f0\u0001\u0000\u0000\u0000\u00f2"+
		"\u00f3\u0001\u0000\u0000\u0000\u00f3\u00f5\u0001\u0000\u0000\u0000\u00f4"+
		"\u00f2\u0001\u0000\u0000\u0000\u00f5\u00f6\u0005|\u0000\u0000\u00f6\u00f7"+
		"\u0005`\u0000\u0000\u00f7\t\u0001\u0000\u0000\u0000\u00f8\u00f9\u0005"+
		"/\u0000\u0000\u00f9\u00fa\u0003L&\u0000\u00fa\u00fc\u0005Q\u0000\u0000"+
		"\u00fb\u00fd\u0003X,\u0000\u00fc\u00fb\u0001\u0000\u0000\u0000\u00fc\u00fd"+
		"\u0001\u0000\u0000\u0000\u00fd\u00fe\u0001\u0000\u0000\u0000\u00fe\u00ff"+
		"\u0005R\u0000\u0000\u00ff\u0100\u0005F\u0000\u0000\u0100\u0101\u00052"+
		"\u0000\u0000\u0101\u0102\u0005U\u0000\u0000\u0102\u0103\u0005n\u0000\u0000"+
		"\u0103\u0107\u0005`\u0000\u0000\u0104\u0106\u0003\u0018\f\u0000\u0105"+
		"\u0104\u0001\u0000\u0000\u0000\u0106\u0109\u0001\u0000\u0000\u0000\u0107"+
		"\u0105\u0001\u0000\u0000\u0000\u0107\u0108\u0001\u0000\u0000\u0000\u0108"+
		"\u010a\u0001\u0000\u0000\u0000\u0109\u0107\u0001\u0000\u0000\u0000\u010a"+
		"\u010b\u0005|\u0000\u0000\u010b\u010c\u0005`\u0000\u0000\u010c\u000b\u0001"+
		"\u0000\u0000\u0000\u010d\u010e\u0003F#\u0000\u010e\u010f\u0005C\u0000"+
		"\u0000\u010f\u0110\u0003R)\u0000\u0110\u0111\u0005o\u0000\u0000\u0111"+
		"\u0112\u0005`\u0000\u0000\u0112\r\u0001\u0000\u0000\u0000\u0113\u0114"+
		"\u0005\u0001\u0000\u0000\u0114\u0115\u0003P(\u0000\u0115\u0116\u0005Q"+
		"\u0000\u0000\u0116\u0117\u0005\u0004\u0000\u0000\u0117\u0118\u0005R\u0000"+
		"\u0000\u0118\u0119\u0005U\u0000\u0000\u0119\u011a\u0005p\u0000\u0000\u011a"+
		"\u011b\u0005`\u0000\u0000\u011b\u011c\u0003\\.\u0000\u011c\u011d\u0005"+
		"`\u0000\u0000\u011d\u011e\u0005|\u0000\u0000\u011e\u000f\u0001\u0000\u0000"+
		"\u0000\u011f\u0120\u0005\u0001\u0000\u0000\u0120\u0125\u0003P(\u0000\u0121"+
		"\u0122\u0005Q\u0000\u0000\u0122\u0123\u0003P(\u0000\u0123\u0124\u0005"+
		"R\u0000\u0000\u0124\u0126\u0001\u0000\u0000\u0000\u0125\u0121\u0001\u0000"+
		"\u0000\u0000\u0125\u0126\u0001\u0000\u0000\u0000\u0126\u0127\u0001\u0000"+
		"\u0000\u0000\u0127\u0128\u0005U\u0000\u0000\u0128\u0129\u0005q\u0000\u0000"+
		"\u0129\u0131\u0005`\u0000\u0000\u012a\u0130\u0003:\u001d\u0000\u012b\u0130"+
		"\u0003<\u001e\u0000\u012c\u0130\u0003>\u001f\u0000\u012d\u0130\u0003@"+
		" \u0000\u012e\u0130\u0003\u0014\n\u0000\u012f\u012a\u0001\u0000\u0000"+
		"\u0000\u012f\u012b\u0001\u0000\u0000\u0000\u012f\u012c\u0001\u0000\u0000"+
		"\u0000\u012f\u012d\u0001\u0000\u0000\u0000\u012f\u012e\u0001\u0000\u0000"+
		"\u0000\u0130\u0133\u0001\u0000\u0000\u0000\u0131\u012f\u0001\u0000\u0000"+
		"\u0000\u0131\u0132\u0001\u0000\u0000\u0000\u0132\u0134\u0001\u0000\u0000"+
		"\u0000\u0133\u0131\u0001\u0000\u0000\u0000\u0134\u0135\u0005|\u0000\u0000"+
		"\u0135\u0136\u0005`\u0000\u0000\u0136\u0011\u0001\u0000\u0000\u0000\u0137"+
		"\u0138\u0005\u0001\u0000\u0000\u0138\u013d\u0003P(\u0000\u0139\u013a\u0005"+
		"Q\u0000\u0000\u013a\u013e\u0003P(\u0000\u013b\u013c\u00055\u0000\u0000"+
		"\u013c\u013e\u0005R\u0000\u0000\u013d\u0139\u0001\u0000\u0000\u0000\u013d"+
		"\u013b\u0001\u0000\u0000\u0000\u013e\u013f\u0001\u0000\u0000\u0000\u013f"+
		"\u0140\u0005r\u0000\u0000\u0140\u0149\u0005`\u0000\u0000\u0141\u0148\u0003"+
		"<\u001e\u0000\u0142\u0148\u0003>\u001f\u0000\u0143\u0148\u0003@ \u0000"+
		"\u0144\u0148\u0003B!\u0000\u0145\u0148\u0003D\"\u0000\u0146\u0148\u0003"+
		"\u0014\n\u0000\u0147\u0141\u0001\u0000\u0000\u0000\u0147\u0142\u0001\u0000"+
		"\u0000\u0000\u0147\u0143\u0001\u0000\u0000\u0000\u0147\u0144\u0001\u0000"+
		"\u0000\u0000\u0147\u0145\u0001\u0000\u0000\u0000\u0147\u0146\u0001\u0000"+
		"\u0000\u0000\u0148\u014b\u0001\u0000\u0000\u0000\u0149\u0147\u0001\u0000"+
		"\u0000\u0000\u0149\u014a\u0001\u0000\u0000\u0000\u014a\u014c\u0001\u0000"+
		"\u0000\u0000\u014b\u0149\u0001\u0000\u0000\u0000\u014c\u014d\u0005|\u0000"+
		"\u0000\u014d\u014e\u0005`\u0000\u0000\u014e\u0013\u0001\u0000\u0000\u0000"+
		"\u014f\u0150\u0003\u0016\u000b\u0000\u0150\u0151\u0005`\u0000\u0000\u0151"+
		"\u0015\u0001\u0000\u0000\u0000\u0152\u0153\u0005|\u0000\u0000\u0153\u0017"+
		"\u0001\u0000\u0000\u0000\u0154\u0160\u0003\u001a\r\u0000\u0155\u0160\u0003"+
		"\u001c\u000e\u0000\u0156\u0160\u0003\u001e\u000f\u0000\u0157\u0160\u0003"+
		" \u0010\u0000\u0158\u0160\u0003\"\u0011\u0000\u0159\u0160\u0003$\u0012"+
		"\u0000\u015a\u0160\u0003&\u0013\u0000\u015b\u0160\u0003(\u0014\u0000\u015c"+
		"\u0160\u0003,\u0016\u0000\u015d\u0160\u0003.\u0017\u0000\u015e\u0160\u0003"+
		"\u0014\n\u0000\u015f\u0154\u0001\u0000\u0000\u0000\u015f\u0155\u0001\u0000"+
		"\u0000\u0000\u015f\u0156\u0001\u0000\u0000\u0000\u015f\u0157\u0001\u0000"+
		"\u0000\u0000\u015f\u0158\u0001\u0000\u0000\u0000\u015f\u0159\u0001\u0000"+
		"\u0000\u0000\u015f\u015a\u0001\u0000\u0000\u0000\u015f\u015b\u0001\u0000"+
		"\u0000\u0000\u015f\u015c\u0001\u0000\u0000\u0000\u015f\u015d\u0001\u0000"+
		"\u0000\u0000\u015f\u015e\u0001\u0000\u0000\u0000\u0160\u0019\u0001\u0000"+
		"\u0000\u0000\u0161\u0162\u0005\u000b\u0000\u0000\u0162\u0164\u0005Q\u0000"+
		"\u0000\u0163\u0165\u0003p8\u0000\u0164\u0163\u0001\u0000\u0000\u0000\u0164"+
		"\u0165\u0001\u0000\u0000\u0000\u0165\u0166\u0001\u0000\u0000\u0000\u0166"+
		"\u0167\u0005R\u0000\u0000\u0167\u0168\u0005`\u0000\u0000\u0168\u001b\u0001"+
		"\u0000\u0000\u0000\u0169\u016a\u0003F#\u0000\u016a\u016b\u0005C\u0000"+
		"\u0000\u016b\u016c\u0003p8\u0000\u016c\u016d\u0005s\u0000\u0000\u016d"+
		"\u016e\u0005`\u0000\u0000\u016e\u001d\u0001\u0000\u0000\u0000\u016f\u0170"+
		"\u0003J%\u0000\u0170\u0171\u0005C\u0000\u0000\u0171\u0172\u0003p8\u0000"+
		"\u0172\u0173\u0005t\u0000\u0000\u0173\u0174\u0005`\u0000\u0000\u0174\u001f"+
		"\u0001\u0000\u0000\u0000\u0175\u0176\u0003F#\u0000\u0176\u0177\u0005C"+
		"\u0000\u0000\u0177\u0178\u0005\b\u0000\u0000\u0178\u0179\u0005Q\u0000"+
		"\u0000\u0179\u017a\u0003p8\u0000\u017a\u017b\u0005R\u0000\u0000\u017b"+
		"\u017c\u0005u\u0000\u0000\u017c\u017d\u0005`\u0000\u0000\u017d!\u0001"+
		"\u0000\u0000\u0000\u017e\u017f\u0005\u0006\u0000\u0000\u017f\u0180\u0003"+
		"p8\u0000\u0180\u0181\u0005U\u0000\u0000\u0181\u0187\u0005`\u0000\u0000"+
		"\u0182\u0186\u00034\u001a\u0000\u0183\u0186\u00036\u001b\u0000\u0184\u0186"+
		"\u0003\u0018\f\u0000\u0185\u0182\u0001\u0000\u0000\u0000\u0185\u0183\u0001"+
		"\u0000\u0000\u0000\u0185\u0184\u0001\u0000\u0000\u0000\u0186\u0189\u0001"+
		"\u0000\u0000\u0000\u0187\u0185\u0001\u0000\u0000\u0000\u0187\u0188\u0001"+
		"\u0000\u0000\u0000\u0188\u018a\u0001\u0000\u0000\u0000\u0189\u0187\u0001"+
		"\u0000\u0000\u0000\u018a\u018b\u0005|\u0000\u0000\u018b\u018c\u0005`\u0000"+
		"\u0000\u018c#\u0001\u0000\u0000\u0000\u018d\u018e\u0005\u000e\u0000\u0000"+
		"\u018e\u018f\u0003p8\u0000\u018f\u0190\u0005U\u0000\u0000\u0190\u0194"+
		"\u0005`\u0000\u0000\u0191\u0193\u0003\u0018\f\u0000\u0192\u0191\u0001"+
		"\u0000\u0000\u0000\u0193\u0196\u0001\u0000\u0000\u0000\u0194\u0192\u0001"+
		"\u0000\u0000\u0000\u0194\u0195\u0001\u0000\u0000\u0000\u0195\u0197\u0001"+
		"\u0000\u0000\u0000\u0196\u0194\u0001\u0000\u0000\u0000\u0197\u0198\u0005"+
		"|\u0000\u0000\u0198\u0199\u0005`\u0000\u0000\u0199%\u0001\u0000\u0000"+
		"\u0000\u019a\u019b\u0005\u0005\u0000\u0000\u019b\u019c\u0003F#\u0000\u019c"+
		"\u019d\u0005\u0007\u0000\u0000\u019d\u019e\u0003p8\u0000\u019e\u019f\u0005"+
		"U\u0000\u0000\u019f\u01a3\u0005`\u0000\u0000\u01a0\u01a2\u0003\u0018\f"+
		"\u0000\u01a1\u01a0\u0001\u0000\u0000\u0000\u01a2\u01a5\u0001\u0000\u0000"+
		"\u0000\u01a3\u01a1\u0001\u0000\u0000\u0000\u01a3\u01a4\u0001\u0000\u0000"+
		"\u0000\u01a4\u01a6\u0001\u0000\u0000\u0000\u01a5\u01a3\u0001\u0000\u0000"+
		"\u0000\u01a6\u01a7\u0005|\u0000\u0000\u01a7\u01a8\u0005`\u0000\u0000\u01a8"+
		"\'\u0001\u0000\u0000\u0000\u01a9\u01ab\u0005l\u0000\u0000\u01aa\u01a9"+
		"\u0001\u0000\u0000\u0000\u01aa\u01ab\u0001\u0000\u0000\u0000\u01ab\u01ac"+
		"\u0001\u0000\u0000\u0000\u01ac\u01ad\u0003*\u0015\u0000\u01ad\u01ae\u0005"+
		"Q\u0000\u0000\u01ae\u01af\u0003T*\u0000\u01af\u01b0\u0005R\u0000\u0000"+
		"\u01b0\u01b1\u0005`\u0000\u0000\u01b1)\u0001\u0000\u0000\u0000\u01b2\u01b3"+
		"\u0003t:\u0000\u01b3+\u0001\u0000\u0000\u0000\u01b4\u01b5\u0005\r\u0000"+
		"\u0000\u01b5\u01b9\u0005`\u0000\u0000\u01b6\u01b8\u0003\u0018\f\u0000"+
		"\u01b7\u01b6\u0001\u0000\u0000\u0000\u01b8\u01bb\u0001\u0000\u0000\u0000"+
		"\u01b9\u01b7\u0001\u0000\u0000\u0000\u01b9\u01ba\u0001\u0000\u0000\u0000"+
		"\u01ba\u01bc\u0001\u0000\u0000\u0000\u01bb\u01b9\u0001\u0000\u0000\u0000"+
		"\u01bc\u01c0\u00038\u001c\u0000\u01bd\u01bf\u0003\u0018\f\u0000\u01be"+
		"\u01bd\u0001\u0000\u0000\u0000\u01bf\u01c2\u0001\u0000\u0000\u0000\u01c0"+
		"\u01be\u0001\u0000\u0000\u0000\u01c0\u01c1\u0001\u0000\u0000\u0000\u01c1"+
		"\u01c3\u0001\u0000\u0000\u0000\u01c2\u01c0\u0001\u0000\u0000\u0000\u01c3"+
		"\u01c4\u0005|\u0000\u0000\u01c4\u01c5\u0005`\u0000\u0000\u01c5-\u0001"+
		"\u0000\u0000\u0000\u01c6\u01c7\u00054\u0000\u0000\u01c7\u01c8\u0003P("+
		"\u0000\u01c8\u01c9\u0005Q\u0000\u0000\u01c9\u01ca\u0003h4\u0000\u01ca"+
		"\u01cb\u0005R\u0000\u0000\u01cb\u01cc\u0005`\u0000\u0000\u01cc/\u0001"+
		"\u0000\u0000\u0000\u01cd\u01ce\u0005K\u0000\u0000\u01ce\u01cf\u0005S\u0000"+
		"\u0000\u01cf\u01d0\u0005-\u0000\u0000\u01d0\u01d1\u0005Q\u0000\u0000\u01d1"+
		"\u01d2\u0003^/\u0000\u01d2\u01d3\u0005T\u0000\u0000\u01d3\u01d4\u0003"+
		"p8\u0000\u01d4\u01d5\u0005R\u0000\u0000\u01d5\u01d6\u0005`\u0000\u0000"+
		"\u01d61\u0001\u0000\u0000\u0000\u01d7\u01d8\u0005\f\u0000\u0000\u01d8"+
		"\u01d9\u0003p8\u0000\u01d9\u01da\u0005`\u0000\u0000\u01da3\u0001\u0000"+
		"\u0000\u0000\u01db\u01dc\u0005\u0002\u0000\u0000\u01dc\u01dd\u0003p8\u0000"+
		"\u01dd\u01de\u0005U\u0000\u0000\u01de\u01df\u0005x\u0000\u0000\u01df\u01e0"+
		"\u0005`\u0000\u0000\u01e05\u0001\u0000\u0000\u0000\u01e1\u01e2\u0005\u0003"+
		"\u0000\u0000\u01e2\u01e3\u0005U\u0000\u0000\u01e3\u01e4\u0005`\u0000\u0000"+
		"\u01e47\u0001\u0000\u0000\u0000\u01e5\u01e6\u00050\u0000\u0000\u01e6\u01e7"+
		"\u0003P(\u0000\u01e7\u01e8\u0005.\u0000\u0000\u01e8\u01e9\u0003F#\u0000"+
		"\u01e9\u01ea\u0005`\u0000\u0000\u01ea9\u0001\u0000\u0000\u0000\u01eb\u01ec"+
		"\u0005/\u0000\u0000\u01ec\u01ed\u00051\u0000\u0000\u01ed\u01ef\u0005Q"+
		"\u0000\u0000\u01ee\u01f0\u0003X,\u0000\u01ef\u01ee\u0001\u0000\u0000\u0000"+
		"\u01ef\u01f0\u0001\u0000\u0000\u0000\u01f0\u01f1\u0001\u0000\u0000\u0000"+
		"\u01f1\u01f2\u0005R\u0000\u0000\u01f2\u01f3\u0005F\u0000\u0000\u01f3\u01f4"+
		"\u00052\u0000\u0000\u01f4\u01f5\u0005U\u0000\u0000\u01f5\u01f9\u0005`"+
		"\u0000\u0000\u01f6\u01f8\u0003\u0018\f\u0000\u01f7\u01f6\u0001\u0000\u0000"+
		"\u0000\u01f8\u01fb\u0001\u0000\u0000\u0000\u01f9\u01f7\u0001\u0000\u0000"+
		"\u0000\u01f9\u01fa\u0001\u0000\u0000\u0000\u01fa\u01fc\u0001\u0000\u0000"+
		"\u0000\u01fb\u01f9\u0001\u0000\u0000\u0000\u01fc\u01fd\u0005|\u0000\u0000"+
		"\u01fd\u01fe\u0005`\u0000\u0000\u01fe;\u0001\u0000\u0000\u0000\u01ff\u0200"+
		"\u0003F#\u0000\u0200\u0201\u0005U\u0000\u0000\u0201\u0202\u0003Z-\u0000"+
		"\u0202\u0203\u0005y\u0000\u0000\u0203\u0204\u0005`\u0000\u0000\u0204="+
		"\u0001\u0000\u0000\u0000\u0205\u0206\u0005/\u0000\u0000\u0206\u0207\u0003"+
		"L&\u0000\u0207\u0209\u0005Q\u0000\u0000\u0208\u020a\u0003X,\u0000\u0209"+
		"\u0208\u0001\u0000\u0000\u0000\u0209\u020a\u0001\u0000\u0000\u0000\u020a"+
		"\u020b\u0001\u0000\u0000\u0000\u020b\u020c\u0005R\u0000\u0000\u020c\u020d"+
		"\u0005F\u0000\u0000\u020d\u020e\u0003Z-\u0000\u020e\u020f\u0005U\u0000"+
		"\u0000\u020f\u0210\u0005z\u0000\u0000\u0210\u0214\u0005`\u0000\u0000\u0211"+
		"\u0213\u0003\u0018\f\u0000\u0212\u0211\u0001\u0000\u0000\u0000\u0213\u0216"+
		"\u0001\u0000\u0000\u0000\u0214\u0212\u0001\u0000\u0000\u0000\u0214\u0215"+
		"\u0001\u0000\u0000\u0000\u0215\u0217\u0001\u0000\u0000\u0000\u0216\u0214"+
		"\u0001\u0000\u0000\u0000\u0217\u0218\u00032\u0019\u0000\u0218\u0219\u0005"+
		"|\u0000\u0000\u0219\u021a\u0005`\u0000\u0000\u021a?\u0001\u0000\u0000"+
		"\u0000\u021b\u021c\u0005/\u0000\u0000\u021c\u021d\u0003L&\u0000\u021d"+
		"\u021f\u0005Q\u0000\u0000\u021e\u0220\u0003X,\u0000\u021f\u021e\u0001"+
		"\u0000\u0000\u0000\u021f\u0220\u0001\u0000\u0000\u0000\u0220\u0221\u0001"+
		"\u0000\u0000\u0000\u0221\u0222\u0005R\u0000\u0000\u0222\u0223\u0005F\u0000"+
		"\u0000\u0223\u0224\u00052\u0000\u0000\u0224\u0225\u0005U\u0000\u0000\u0225"+
		"\u0226\u0005{\u0000\u0000\u0226\u022a\u0005`\u0000\u0000\u0227\u0229\u0003"+
		"\u0018\f\u0000\u0228\u0227\u0001\u0000\u0000\u0000\u0229\u022c\u0001\u0000"+
		"\u0000\u0000\u022a\u0228\u0001\u0000\u0000\u0000\u022a\u022b\u0001\u0000"+
		"\u0000\u0000\u022b\u022d\u0001\u0000\u0000\u0000\u022c\u022a\u0001\u0000"+
		"\u0000\u0000\u022d\u022e\u0005|\u0000\u0000\u022e\u022f\u0005`\u0000\u0000"+
		"\u022fA\u0001\u0000\u0000\u0000\u0230\u0231\u0005,\u0000\u0000\u0231\u0232"+
		"\u0005`\u0000\u0000\u0232\u0233\u0005/\u0000\u0000\u0233\u0234\u0003L"+
		"&\u0000\u0234\u0236\u0005Q\u0000\u0000\u0235\u0237\u0003X,\u0000\u0236"+
		"\u0235\u0001\u0000\u0000\u0000\u0236\u0237\u0001\u0000\u0000\u0000\u0237"+
		"\u0238\u0001\u0000\u0000\u0000\u0238\u0239\u0005R\u0000\u0000\u0239\u023a"+
		"\u0005F\u0000\u0000\u023a\u023b\u0003Z-\u0000\u023b\u023c\u0005U\u0000"+
		"\u0000\u023c\u023d\u0005`\u0000\u0000\u023d\u023e\u00053\u0000\u0000\u023e"+
		"\u023f\u0005|\u0000\u0000\u023f\u0240\u0005`\u0000\u0000\u0240C\u0001"+
		"\u0000\u0000\u0000\u0241\u0242\u0005,\u0000\u0000\u0242\u0243\u0005`\u0000"+
		"\u0000\u0243\u0244\u0005/\u0000\u0000\u0244\u0245\u0003L&\u0000\u0245"+
		"\u0247\u0005Q\u0000\u0000\u0246\u0248\u0003X,\u0000\u0247\u0246\u0001"+
		"\u0000\u0000\u0000\u0247\u0248\u0001\u0000\u0000\u0000\u0248\u0249\u0001"+
		"\u0000\u0000\u0000\u0249\u024a\u0005R\u0000\u0000\u024a\u024b\u0005F\u0000"+
		"\u0000\u024b\u024c\u00052\u0000\u0000\u024c\u024d\u0005U\u0000\u0000\u024d"+
		"\u024e\u0005`\u0000\u0000\u024e\u024f\u00053\u0000\u0000\u024f\u0250\u0005"+
		"|\u0000\u0000\u0250\u0251\u0005`\u0000\u0000\u0251E\u0001\u0000\u0000"+
		"\u0000\u0252\u0253\u0005b\u0000\u0000\u0253G\u0001\u0000\u0000\u0000\u0254"+
		"\u0255\u0005b\u0000\u0000\u0255I\u0001\u0000\u0000\u0000\u0256\u0257\u0006"+
		"%\uffff\uffff\u0000\u0257\u025c\u0003H$\u0000\u0258\u0259\u0005K\u0000"+
		"\u0000\u0259\u025a\u0005S\u0000\u0000\u025a\u025c\u0003H$\u0000\u025b"+
		"\u0256\u0001\u0000\u0000\u0000\u025b\u0258\u0001\u0000\u0000\u0000\u025c"+
		"\u0261\u0001\u0000\u0000\u0000\u025d\u025e\n\u0001\u0000\u0000\u025e\u0260"+
		"\u0003n7\u0000\u025f\u025d\u0001\u0000\u0000\u0000\u0260\u0263\u0001\u0000"+
		"\u0000\u0000\u0261\u025f\u0001\u0000\u0000\u0000\u0261\u0262\u0001\u0000"+
		"\u0000\u0000\u0262K\u0001\u0000\u0000\u0000\u0263\u0261\u0001\u0000\u0000"+
		"\u0000\u0264\u0265\u0005b\u0000\u0000\u0265M\u0001\u0000\u0000\u0000\u0266"+
		"\u0267\u0005a\u0000\u0000\u0267O\u0001\u0000\u0000\u0000\u0268\u0269\u0007"+
		"\u0000\u0000\u0000\u0269Q\u0001\u0000\u0000\u0000\u026a\u026f\u0003b1"+
		"\u0000\u026b\u026f\u0003d2\u0000\u026c\u026f\u0003f3\u0000\u026d\u026f"+
		"\u0003h4\u0000\u026e\u026a\u0001\u0000\u0000\u0000\u026e\u026b\u0001\u0000"+
		"\u0000\u0000\u026e\u026c\u0001\u0000\u0000\u0000\u026e\u026d\u0001\u0000"+
		"\u0000\u0000\u026fS\u0001\u0000\u0000\u0000\u0270\u0275\u0003V+\u0000"+
		"\u0271\u0272\u0005T\u0000\u0000\u0272\u0274\u0003V+\u0000\u0273\u0271"+
		"\u0001\u0000\u0000\u0000\u0274\u0277\u0001\u0000\u0000\u0000\u0275\u0273"+
		"\u0001\u0000\u0000\u0000\u0275\u0276\u0001\u0000\u0000\u0000\u0276U\u0001"+
		"\u0000\u0000\u0000\u0277\u0275\u0001\u0000\u0000\u0000\u0278\u027b\u0003"+
		"\u009aM\u0000\u0279\u027b\u0003p8\u0000\u027a\u0278\u0001\u0000\u0000"+
		"\u0000\u027a\u0279\u0001\u0000\u0000\u0000\u027bW\u0001\u0000\u0000\u0000"+
		"\u027c\u0281\u0003\u0092I\u0000\u027d\u027e\u0005T\u0000\u0000\u027e\u0280"+
		"\u0003\u0092I\u0000\u027f\u027d\u0001\u0000\u0000\u0000\u0280\u0283\u0001"+
		"\u0000\u0000\u0000\u0281\u027f\u0001\u0000\u0000\u0000\u0281\u0282\u0001"+
		"\u0000\u0000\u0000\u0282Y\u0001\u0000\u0000\u0000\u0283\u0281\u0001\u0000"+
		"\u0000\u0000\u0284\u0289\u0003\u0098L\u0000\u0285\u0289\u0003P(\u0000"+
		"\u0286\u0289\u0003\u0094J\u0000\u0287\u0289\u0003\u0096K\u0000\u0288\u0284"+
		"\u0001\u0000\u0000\u0000\u0288\u0285\u0001\u0000\u0000\u0000\u0288\u0286"+
		"\u0001\u0000\u0000\u0000\u0288\u0287\u0001\u0000\u0000\u0000\u0289[\u0001"+
		"\u0000\u0000\u0000\u028a\u028f\u0003F#\u0000\u028b\u028c\u0005T\u0000"+
		"\u0000\u028c\u028e\u0003F#\u0000\u028d\u028b\u0001\u0000\u0000\u0000\u028e"+
		"\u0291\u0001\u0000\u0000\u0000\u028f\u028d\u0001\u0000\u0000\u0000\u028f"+
		"\u0290\u0001\u0000\u0000\u0000\u0290]\u0001\u0000\u0000\u0000\u0291\u028f"+
		"\u0001\u0000\u0000\u0000\u0292\u0293\u0003p8\u0000\u0293_\u0001\u0000"+
		"\u0000\u0000\u0294\u029a\u0003b1\u0000\u0295\u029a\u0003d2\u0000\u0296"+
		"\u029a\u0003f3\u0000\u0297\u029a\u0003h4\u0000\u0298\u029a\u0003j5\u0000"+
		"\u0299\u0294\u0001\u0000\u0000\u0000\u0299\u0295\u0001\u0000\u0000\u0000"+
		"\u0299\u0296\u0001\u0000\u0000\u0000\u0299\u0297\u0001\u0000\u0000\u0000"+
		"\u0299\u0298\u0001\u0000\u0000\u0000\u029aa\u0001\u0000\u0000\u0000\u029b"+
		"\u029c\u0007\u0001\u0000\u0000\u029cc\u0001\u0000\u0000\u0000\u029d\u029e"+
		"\u0007\u0002\u0000\u0000\u029ee\u0001\u0000\u0000\u0000\u029f\u02a0\u0005"+
		"g\u0000\u0000\u02a0g\u0001\u0000\u0000\u0000\u02a1\u02a3\u0005J\u0000"+
		"\u0000\u02a2\u02a1\u0001\u0000\u0000\u0000\u02a2\u02a3\u0001\u0000\u0000"+
		"\u0000\u02a3\u02a4\u0001\u0000\u0000\u0000\u02a4\u02a5\u0005i\u0000\u0000"+
		"\u02a5i\u0001\u0000\u0000\u0000\u02a6\u02a7\u0003P(\u0000\u02a7\u02a8"+
		"\u0005S\u0000\u0000\u02a8\u02a9\u0003H$\u0000\u02a9k\u0001\u0000\u0000"+
		"\u0000\u02aa\u02ab\u0005h\u0000\u0000\u02abm\u0001\u0000\u0000\u0000\u02ac"+
		"\u02ad\u0005O\u0000\u0000\u02ad\u02ae\u0003p8\u0000\u02ae\u02af\u0005"+
		"P\u0000\u0000\u02afo\u0001\u0000\u0000\u0000\u02b0\u02b1\u00068\uffff"+
		"\uffff\u0000\u02b1\u02b6\u0003\u0090H\u0000\u02b2\u02b6\u0003\u0080@\u0000"+
		"\u02b3\u02b6\u0003t:\u0000\u02b4\u02b6\u0003\u0082A\u0000\u02b5\u02b0"+
		"\u0001\u0000\u0000\u0000\u02b5\u02b2\u0001\u0000\u0000\u0000\u02b5\u02b3"+
		"\u0001\u0000\u0000\u0000\u02b5\u02b4\u0001\u0000\u0000\u0000\u02b6\u02bb"+
		"\u0001\u0000\u0000\u0000\u02b7\u02b8\n\u0001\u0000\u0000\u02b8\u02ba\u0003"+
		"r9\u0000\u02b9\u02b7\u0001\u0000\u0000\u0000\u02ba\u02bd\u0001\u0000\u0000"+
		"\u0000\u02bb\u02b9\u0001\u0000\u0000\u0000\u02bb\u02bc\u0001\u0000\u0000"+
		"\u0000\u02bcq\u0001\u0000\u0000\u0000\u02bd\u02bb\u0001\u0000\u0000\u0000"+
		"\u02be\u02bf\u0005\u0006\u0000\u0000\u02bf\u02c4\u0003p8\u0000\u02c0\u02c1"+
		"\u0005\u0002\u0000\u0000\u02c1\u02c3\u0003p8\u0000\u02c2\u02c0\u0001\u0000"+
		"\u0000\u0000\u02c3\u02c6\u0001\u0000\u0000\u0000\u02c4\u02c2\u0001\u0000"+
		"\u0000\u0000\u02c4\u02c5\u0001\u0000\u0000\u0000\u02c5\u02c7\u0001\u0000"+
		"\u0000\u0000\u02c6\u02c4\u0001\u0000\u0000\u0000\u02c7\u02c8\u0005\u0003"+
		"\u0000\u0000\u02c8\u02c9\u0003p8\u0000\u02c9s\u0001\u0000\u0000\u0000"+
		"\u02ca\u02cc\u0003v;\u0000\u02cb\u02cd\u0003x<\u0000\u02cc\u02cb\u0001"+
		"\u0000\u0000\u0000\u02cc\u02cd\u0001\u0000\u0000\u0000\u02cdu\u0001\u0000"+
		"\u0000\u0000\u02ce\u02d6\u0003|>\u0000\u02cf\u02d6\u0003~?\u0000\u02d0"+
		"\u02d6\u0003`0\u0000\u02d1\u02d6\u0003\u009cN\u0000\u02d2\u02d6\u0003"+
		"\u0086C\u0000\u02d3\u02d6\u0003\u0084B\u0000\u02d4\u02d6\u0003z=\u0000"+
		"\u02d5\u02ce\u0001\u0000\u0000\u0000\u02d5\u02cf\u0001\u0000\u0000\u0000"+
		"\u02d5\u02d0\u0001\u0000\u0000\u0000\u02d5\u02d1\u0001\u0000\u0000\u0000"+
		"\u02d5\u02d2\u0001\u0000\u0000\u0000\u02d5\u02d3\u0001\u0000\u0000\u0000"+
		"\u02d5\u02d4\u0001\u0000\u0000\u0000\u02d6w\u0001\u0000\u0000\u0000\u02d7"+
		"\u02d8\u0005S\u0000\u0000\u02d8\u02da\u0003z=\u0000\u02d9\u02d7\u0001"+
		"\u0000\u0000\u0000\u02da\u02db\u0001\u0000\u0000\u0000\u02db\u02d9\u0001"+
		"\u0000\u0000\u0000\u02db\u02dc\u0001\u0000\u0000\u0000\u02dcy\u0001\u0000"+
		"\u0000\u0000\u02dd\u02e0\u0003H$\u0000\u02de\u02e0\u0003\u008cF\u0000"+
		"\u02df\u02dd\u0001\u0000\u0000\u0000\u02df\u02de\u0001\u0000\u0000\u0000"+
		"\u02e0\u02e4\u0001\u0000\u0000\u0000\u02e1\u02e3\u0003n7\u0000\u02e2\u02e1"+
		"\u0001\u0000\u0000\u0000\u02e3\u02e6\u0001\u0000\u0000\u0000\u02e4\u02e2"+
		"\u0001\u0000\u0000\u0000\u02e4\u02e5\u0001\u0000\u0000\u0000\u02e5{\u0001"+
		"\u0000\u0000\u0000\u02e6\u02e4\u0001\u0000\u0000\u0000\u02e7\u02e8\u0005"+
		"K\u0000\u0000\u02e8}\u0001\u0000\u0000\u0000\u02e9\u02ea\u0005Q\u0000"+
		"\u0000\u02ea\u02eb\u0003p8\u0000\u02eb\u02ec\u0005R\u0000\u0000\u02ec"+
		"\u007f\u0001\u0000\u0000\u0000\u02ed\u02ee\u0007\u0003\u0000\u0000\u02ee"+
		"\u02ef\u0003t:\u0000\u02ef\u0081\u0001\u0000\u0000\u0000\u02f0\u02f1\u0003"+
		"t:\u0000\u02f1\u02f2\u0003\u008eG\u0000\u02f2\u02f3\u0003p8\u0000\u02f3"+
		"\u0083\u0001\u0000\u0000\u0000\u02f4\u02f5\u0005Q\u0000\u0000\u02f5\u02f6"+
		"\u0003p8\u0000\u02f6\u02f7\u0005T\u0000\u0000\u02f7\u02fc\u0003p8\u0000"+
		"\u02f8\u02f9\u0005T\u0000\u0000\u02f9\u02fb\u0003p8\u0000\u02fa\u02f8"+
		"\u0001\u0000\u0000\u0000\u02fb\u02fe\u0001\u0000\u0000\u0000\u02fc\u02fa"+
		"\u0001\u0000\u0000\u0000\u02fc\u02fd\u0001\u0000\u0000\u0000\u02fd\u02ff"+
		"\u0001\u0000\u0000\u0000\u02fe\u02fc\u0001\u0000\u0000\u0000\u02ff\u0300"+
		"\u0005R\u0000\u0000\u0300\u0085\u0001\u0000\u0000\u0000\u0301\u0302\u0005"+
		"O\u0000\u0000\u0302\u0303\u0003\u0088D\u0000\u0303\u0304\u0005P\u0000"+
		"\u0000\u0304\u0087\u0001\u0000\u0000\u0000\u0305\u030a\u0003\u008aE\u0000"+
		"\u0306\u0307\u0005T\u0000\u0000\u0307\u0309\u0003\u008aE\u0000\u0308\u0306"+
		"\u0001\u0000\u0000\u0000\u0309\u030c\u0001\u0000\u0000\u0000\u030a\u0308"+
		"\u0001\u0000\u0000\u0000\u030a\u030b\u0001\u0000\u0000\u0000\u030b\u0089"+
		"\u0001\u0000\u0000\u0000\u030c\u030a\u0001\u0000\u0000\u0000\u030d\u030e"+
		"\u0003p8\u0000\u030e\u030f\u0005U\u0000\u0000\u030f\u0310\u0003p8\u0000"+
		"\u0310\u008b\u0001\u0000\u0000\u0000\u0311\u0312\u0003L&\u0000\u0312\u0314"+
		"\u0005Q\u0000\u0000\u0313\u0315\u0003T*\u0000\u0314\u0313\u0001\u0000"+
		"\u0000\u0000\u0314\u0315\u0001\u0000\u0000\u0000\u0315\u0316\u0001\u0000"+
		"\u0000\u0000\u0316\u0317\u0005R\u0000\u0000\u0317\u008d\u0001\u0000\u0000"+
		"\u0000\u0318\u0319\u0007\u0004\u0000\u0000\u0319\u008f\u0001\u0000\u0000"+
		"\u0000\u031a\u031b\u0003Z-\u0000\u031b\u031d\u0005Q\u0000\u0000\u031c"+
		"\u031e\u0003T*\u0000\u031d\u031c\u0001\u0000\u0000\u0000\u031d\u031e\u0001"+
		"\u0000\u0000\u0000\u031e\u031f\u0001\u0000\u0000\u0000\u031f\u0320\u0005"+
		"R\u0000\u0000\u0320\u0091\u0001\u0000\u0000\u0000\u0321\u0322\u0003F#"+
		"\u0000\u0322\u0323\u0005U\u0000\u0000\u0323\u0324\u0003Z-\u0000\u0324"+
		"\u0093\u0001\u0000\u0000\u0000\u0325\u0326\u0003P(\u0000\u0326\u0327\u0005"+
		"O\u0000\u0000\u0327\u032c\u0003Z-\u0000\u0328\u0329\u0005T\u0000\u0000"+
		"\u0329\u032b\u0003Z-\u0000\u032a\u0328\u0001\u0000\u0000\u0000\u032b\u032e"+
		"\u0001\u0000\u0000\u0000\u032c\u032a\u0001\u0000\u0000\u0000\u032c\u032d"+
		"\u0001\u0000\u0000\u0000\u032d\u032f\u0001\u0000\u0000\u0000\u032e\u032c"+
		"\u0001\u0000\u0000\u0000\u032f\u0330\u0005P\u0000\u0000\u0330\u0095\u0001"+
		"\u0000\u0000\u0000\u0331\u0332\u0005=\u0000\u0000\u0332\u0333\u0005O\u0000"+
		"\u0000\u0333\u0334\u0005O\u0000\u0000\u0334\u0339\u0003Z-\u0000\u0335"+
		"\u0336\u0005T\u0000\u0000\u0336\u0338\u0003Z-\u0000\u0337\u0335\u0001"+
		"\u0000\u0000\u0000\u0338\u033b\u0001\u0000\u0000\u0000\u0339\u0337\u0001"+
		"\u0000\u0000\u0000\u0339\u033a\u0001\u0000\u0000\u0000\u033a\u033c\u0001"+
		"\u0000\u0000\u0000\u033b\u0339\u0001\u0000\u0000\u0000\u033c\u033d\u0005"+
		"P\u0000\u0000\u033d\u033e\u0005T\u0000\u0000\u033e\u033f\u0003Z-\u0000"+
		"\u033f\u0340\u0005P\u0000\u0000\u0340\u0097\u0001\u0000\u0000\u0000\u0341"+
		"\u0342\u00057\u0000\u0000\u0342\u0343\u0005O\u0000\u0000\u0343\u0346\u0003"+
		"Z-\u0000\u0344\u0345\u0005T\u0000\u0000\u0345\u0347\u0003Z-\u0000\u0346"+
		"\u0344\u0001\u0000\u0000\u0000\u0347\u0348\u0001\u0000\u0000\u0000\u0348"+
		"\u0346\u0001\u0000\u0000\u0000\u0348\u0349\u0001\u0000\u0000\u0000\u0349"+
		"\u034a\u0001\u0000\u0000\u0000\u034a\u034b\u0005P\u0000\u0000\u034b\u0099"+
		"\u0001\u0000\u0000\u0000\u034c\u034d\u0005\t\u0000\u0000\u034d\u034e\u0003"+
		"T*\u0000\u034e\u034f\u0005U\u0000\u0000\u034f\u0350\u0003p8\u0000\u0350"+
		"\u009b\u0001\u0000\u0000\u0000\u0351\u0352\u0005O\u0000\u0000\u0352\u0357"+
		"\u0003p8\u0000\u0353\u0354\u0005T\u0000\u0000\u0354\u0356\u0003p8\u0000"+
		"\u0355\u0353\u0001\u0000\u0000\u0000\u0356\u0359\u0001\u0000\u0000\u0000"+
		"\u0357\u0355\u0001\u0000\u0000\u0000\u0357\u0358\u0001\u0000\u0000\u0000"+
		"\u0358\u035a\u0001\u0000\u0000\u0000\u0359\u0357\u0001\u0000\u0000\u0000"+
		"\u035a\u035b\u0005P\u0000\u0000\u035b\u009d\u0001\u0000\u0000\u0000\u035c"+
		"\u035d\u0005J\u0000\u0000\u035d\u035e\u0005i\u0000\u0000\u035e\u009f\u0001"+
		"\u0000\u0000\u0000\u035f\u0360\u0003t:\u0000\u0360\u0361\u0005G\u0000"+
		"\u0000\u0361\u0362\u0003t:\u0000\u0362\u00a1\u0001\u0000\u0000\u0000<"+
		"\u00a3\u00a8\u00ae\u00bc\u00ca\u00d4\u00df\u00f0\u00f2\u00fc\u0107\u0125"+
		"\u012f\u0131\u013d\u0147\u0149\u015f\u0164\u0185\u0187\u0194\u01a3\u01aa"+
		"\u01b9\u01c0\u01ef\u01f9\u0209\u0214\u021f\u022a\u0236\u0247\u025b\u0261"+
		"\u026e\u0275\u027a\u0281\u0288\u028f\u0299\u02a2\u02b5\u02bb\u02c4\u02cc"+
		"\u02d5\u02db\u02df\u02e4\u02fc\u030a\u0314\u031d\u032c\u0339\u0348\u0357";
	public static final ATN _ATN =
		new ATNDeserializer().deserialize(_serializedATN.toCharArray());
	static {
		_decisionToDFA = new DFA[_ATN.getNumberOfDecisions()];
		for (int i = 0; i < _ATN.getNumberOfDecisions(); i++) {
			_decisionToDFA[i] = new DFA(_ATN.getDecisionState(i), i);
		}
	}
}