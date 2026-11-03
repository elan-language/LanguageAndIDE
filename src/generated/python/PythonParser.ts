// Generated from src/grammars/python/Python.g4 by ANTLR 4.13.1

import * as antlr from "antlr4ng";
import { Token } from "antlr4ng";

import { PythonListener } from "./PythonListener.js";
import { PythonVisitor } from "./PythonVisitor.js";

// for running tests with parameters, TODO: discuss strategy for typed parameters in CI
// eslint-disable-next-line no-unused-vars
type int = number;

export class PythonParser extends antlr.Parser {
  public static readonly CLASS = 1;
  public static readonly ELIF = 2;
  public static readonly ELSE = 3;
  public static readonly ENUM = 4;
  public static readonly FOR = 5;
  public static readonly IF = 6;
  public static readonly IN = 7;
  public static readonly INPUT = 8;
  public static readonly LAMBDA = 9;
  public static readonly MAIN = 10;
  public static readonly RETURN = 11;
  public static readonly TRY = 12;
  public static readonly WHILE = 13;
  public static readonly IF_ = 14;
  public static readonly ABSTRACT = 15;
  public static readonly ASSERT = 16;
  public static readonly ASSIGN = 17;
  public static readonly BE = 18;
  public static readonly CALL = 19;
  public static readonly CATCH = 20;
  public static readonly CONSTANT = 21;
  public static readonly CONSTRUCTOR = 22;
  public static readonly COPY = 23;
  public static readonly DIV = 24;
  public static readonly END = 25;
  public static readonly EVALUATES = 26;
  public static readonly FROM = 27;
  public static readonly FUNCTION = 28;
  public static readonly INHERITS = 29;
  public static readonly LET = 30;
  public static readonly NEW = 31;
  public static readonly PRIVATE = 32;
  public static readonly PROCEDURE = 33;
  public static readonly PROPERTY = 34;
  public static readonly RETURNS = 35;
  public static readonly SET = 36;
  public static readonly STEP = 37;
  public static readonly TEST = 38;
  public static readonly THEN = 39;
  public static readonly THROW = 40;
  public static readonly TO = 41;
  public static readonly VARIABLE = 42;
  public static readonly ABSTRACT_METHOD = 43;
  public static readonly ASSERT_EQUAL = 44;
  public static readonly AS = 45;
  public static readonly DEF = 46;
  public static readonly EXCEPT = 47;
  public static readonly INIT = 48;
  public static readonly NONE = 49;
  public static readonly PASS = 50;
  public static readonly RAISE = 51;
  public static readonly ABC = 52;
  public static readonly TESTCASE = 53;
  public static readonly TUPLE = 54;
  public static readonly INT_NAME = 55;
  public static readonly FLOAT_NAME = 56;
  public static readonly BOOL_NAME = 57;
  public static readonly STRING_NAME = 58;
  public static readonly LIST_NAME = 59;
  public static readonly FUNC_NAME = 60;
  public static readonly TRUE = 61;
  public static readonly FALSE = 62;
  public static readonly AND = 63;
  public static readonly OR = 64;
  public static readonly NOT = 65;
  public static readonly EQUAL = 66;
  public static readonly NOT_EQUAL = 67;
  public static readonly MOD = 68;
  public static readonly ARROW = 69;
  public static readonly POWER = 70;
  public static readonly BINARY_PREFIX = 71;
  public static readonly HEX_PREFIX = 72;
  public static readonly THIS_INSTANCE = 73;
  public static readonly SINGLE_EQUALS = 74;
  public static readonly OPEN_BRACE = 75;
  public static readonly CLOSE_BRACE = 76;
  public static readonly OPEN_SQ_BRACKET = 77;
  public static readonly CLOSE_SQ_BRACKET = 78;
  public static readonly OPEN_BRACKET = 79;
  public static readonly CLOSE_BRACKET = 80;
  public static readonly DOT = 81;
  public static readonly COMMA = 82;
  public static readonly COLON = 83;
  public static readonly PLUS = 84;
  public static readonly MINUS = 85;
  public static readonly MULT = 86;
  public static readonly DIVIDE = 87;
  public static readonly LT = 88;
  public static readonly GT = 89;
  public static readonly LE = 90;
  public static readonly GE = 91;
  public static readonly DOUBLE_QUOTES = 92;
  public static readonly WS = 93;
  public static readonly NL = 94;
  public static readonly NAME_STARTING_TEST_ = 95;
  public static readonly NAME_STARTING_LC = 96;
  public static readonly NAME_STARTING_UC = 97;
  public static readonly LITERAL_BINARY = 98;
  public static readonly LITERAL_HEX = 99;
  public static readonly LITERAL_INTEGER = 100;
  public static readonly LITERAL_FLOAT = 101;
  public static readonly LITERAL_STRING = 102;
  public static readonly INTERPOLATED_STRING = 103;
  public static readonly WHITESPACES = 104;
  public static readonly TEXT = 105;
  public static readonly GHOSTED = 106;
  public static readonly END_MAIN = 107;
  public static readonly END_FUNCTION = 108;
  public static readonly END_TEST = 109;
  public static readonly END_PROCEDURE = 110;
  public static readonly END_ENUM = 111;
  public static readonly END_CLASS = 112;
  public static readonly END_IF = 113;
  public static readonly END_WHILE = 114;
  public static readonly END_FOR = 115;
  public static readonly END_TRY = 116;
  public static readonly END_CONSTRUCTOR = 117;
  public static readonly END_FUNCTION_METHOD = 118;
  public static readonly END_PROCEDURE_METHOD = 119;
  public static readonly COMMENT = 120;
  public static readonly RULE_file = 0;
  public static readonly RULE_global = 1;
  public static readonly RULE_main = 2;
  public static readonly RULE_function = 3;
  public static readonly RULE_test = 4;
  public static readonly RULE_testStatement = 5;
  public static readonly RULE_procedure = 6;
  public static readonly RULE_constant = 7;
  public static readonly RULE_enum = 8;
  public static readonly RULE_concreteClass = 9;
  public static readonly RULE_concreteClassMember = 10;
  public static readonly RULE_abstractClass = 11;
  public static readonly RULE_abstractClassMember = 12;
  public static readonly RULE_comment = 13;
  public static readonly RULE_commentText = 14;
  public static readonly RULE_ordinaryStatement = 15;
  public static readonly RULE_variableDefinition = 16;
  public static readonly RULE_assignment = 17;
  public static readonly RULE_ifStatement = 18;
  public static readonly RULE_thenClause = 19;
  public static readonly RULE_elseIfClause = 20;
  public static readonly RULE_elseClause = 21;
  public static readonly RULE_whileLoop = 22;
  public static readonly RULE_forLoop = 23;
  public static readonly RULE_procedureCall = 24;
  public static readonly RULE_tryStatement = 25;
  public static readonly RULE_tryClause = 26;
  public static readonly RULE_catchClause = 27;
  public static readonly RULE_throwStatement = 28;
  public static readonly RULE_errorMessage = 29;
  public static readonly RULE_assert = 30;
  public static readonly RULE_returnStatement = 31;
  public static readonly RULE_catchStatement = 32;
  public static readonly RULE_constructorMember = 33;
  public static readonly RULE_property = 34;
  public static readonly RULE_functionMethod = 35;
  public static readonly RULE_procedureMethod = 36;
  public static readonly RULE_abstractFunction = 37;
  public static readonly RULE_abstractProcedure = 38;
  public static readonly RULE_identifierDef = 39;
  public static readonly RULE_identifierUse = 40;
  public static readonly RULE_assignable = 41;
  public static readonly RULE_methodName = 42;
  public static readonly RULE_testName = 43;
  public static readonly RULE_typeName = 44;
  public static readonly RULE_constantValue = 45;
  public static readonly RULE_argList = 46;
  public static readonly RULE_argument = 47;
  public static readonly RULE_paramList = 48;
  public static readonly RULE_identifierList = 49;
  public static readonly RULE_expressionList = 50;
  public static readonly RULE_type = 51;
  public static readonly RULE_assertActual = 52;
  public static readonly RULE_assertExpected = 53;
  public static readonly RULE_litValue = 54;
  public static readonly RULE_litBoolean = 55;
  public static readonly RULE_litInt = 56;
  public static readonly RULE_litFloat = 57;
  public static readonly RULE_litString = 58;
  public static readonly RULE_enumValue = 59;
  public static readonly RULE_index = 60;
  public static readonly RULE_expression = 61;
  public static readonly RULE_term = 62;
  public static readonly RULE_chainable = 63;
  public static readonly RULE_thisInstance = 64;
  public static readonly RULE_bracketedExpression = 65;
  public static readonly RULE_unaryExpression = 66;
  public static readonly RULE_negateNumeric = 67;
  public static readonly RULE_negateLogical = 68;
  public static readonly RULE_binaryExpression = 69;
  public static readonly RULE_list = 70;
  public static readonly RULE_tuple = 71;
  public static readonly RULE_dictionary = 72;
  public static readonly RULE_kvpList = 73;
  public static readonly RULE_kvp = 74;
  public static readonly RULE_methodCall = 75;
  public static readonly RULE_binaryOperator = 76;
  public static readonly RULE_newInstance = 77;
  public static readonly RULE_paramDef = 78;
  public static readonly RULE_typeGeneric = 79;
  public static readonly RULE_typeFunc = 80;
  public static readonly RULE_typeTuple = 81;
  public static readonly RULE_lambda = 82;
  public static readonly RULE_interpolatedString = 83;

  public static readonly literalNames = [
    null,
    "'class'",
    "'elif'",
    "'else'",
    "'enum'",
    "'for'",
    "'if'",
    "'in'",
    "'input'",
    "'lambda'",
    "'main'",
    "'return'",
    "'try'",
    "'while'",
    "'if_'",
    "'abstract'",
    "'assert'",
    "'assign'",
    "'be'",
    "'call'",
    "'catch'",
    "'constant'",
    "'constructor'",
    "'copy'",
    "'div'",
    "'end'",
    "'evaluates'",
    "'from'",
    "'function'",
    "'inherits'",
    "'let'",
    "'new'",
    "'private'",
    "'procedure'",
    "'property'",
    "'returns'",
    "'set'",
    "'step'",
    "'test'",
    "'then'",
    "'throw'",
    "'to'",
    "'variable'",
    "'@abstractmethod'",
    "'assertEqual'",
    "'as'",
    "'def'",
    "'except'",
    "'__init__'",
    "'None'",
    "'pass'",
    "'raise'",
    "'ABC'",
    "'unittest.TestCase'",
    "'tuple'",
    "'int'",
    "'float'",
    "'bool'",
    "'str'",
    "'list'",
    "'Callable'",
    "'True'",
    "'False'",
    "'and'",
    "'or'",
    "'not'",
    "'=='",
    "'!='",
    "'%'",
    "'->'",
    "'**'",
    "'0b'",
    "'0x'",
    "'self'",
    "'='",
    "'{'",
    "'}'",
    "'['",
    "']'",
    "'('",
    "')'",
    "'.'",
    "','",
    "':'",
    "'+'",
    "'-'",
    "'*'",
    "'/'",
    "'<'",
    "'>'",
    "'<='",
    "'>='",
    "'\"'",
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    "'[ghosted]'",
    "'# end main'",
    "'# end function'",
    "'# end test'",
    "'# end procedure'",
    "'# end enum'",
    "'# end class'",
    "'# end if'",
    "'# end while'",
    "'# end for'",
    "'# end try'",
    "'# end constructor'",
    "'# end function method'",
    "'# end procedure method'",
  ];

  public static readonly symbolicNames = [
    null,
    "CLASS",
    "ELIF",
    "ELSE",
    "ENUM",
    "FOR",
    "IF",
    "IN",
    "INPUT",
    "LAMBDA",
    "MAIN",
    "RETURN",
    "TRY",
    "WHILE",
    "IF_",
    "ABSTRACT",
    "ASSERT",
    "ASSIGN",
    "BE",
    "CALL",
    "CATCH",
    "CONSTANT",
    "CONSTRUCTOR",
    "COPY",
    "DIV",
    "END",
    "EVALUATES",
    "FROM",
    "FUNCTION",
    "INHERITS",
    "LET",
    "NEW",
    "PRIVATE",
    "PROCEDURE",
    "PROPERTY",
    "RETURNS",
    "SET",
    "STEP",
    "TEST",
    "THEN",
    "THROW",
    "TO",
    "VARIABLE",
    "ABSTRACT_METHOD",
    "ASSERT_EQUAL",
    "AS",
    "DEF",
    "EXCEPT",
    "INIT",
    "NONE",
    "PASS",
    "RAISE",
    "ABC",
    "TESTCASE",
    "TUPLE",
    "INT_NAME",
    "FLOAT_NAME",
    "BOOL_NAME",
    "STRING_NAME",
    "LIST_NAME",
    "FUNC_NAME",
    "TRUE",
    "FALSE",
    "AND",
    "OR",
    "NOT",
    "EQUAL",
    "NOT_EQUAL",
    "MOD",
    "ARROW",
    "POWER",
    "BINARY_PREFIX",
    "HEX_PREFIX",
    "THIS_INSTANCE",
    "SINGLE_EQUALS",
    "OPEN_BRACE",
    "CLOSE_BRACE",
    "OPEN_SQ_BRACKET",
    "CLOSE_SQ_BRACKET",
    "OPEN_BRACKET",
    "CLOSE_BRACKET",
    "DOT",
    "COMMA",
    "COLON",
    "PLUS",
    "MINUS",
    "MULT",
    "DIVIDE",
    "LT",
    "GT",
    "LE",
    "GE",
    "DOUBLE_QUOTES",
    "WS",
    "NL",
    "NAME_STARTING_TEST_",
    "NAME_STARTING_LC",
    "NAME_STARTING_UC",
    "LITERAL_BINARY",
    "LITERAL_HEX",
    "LITERAL_INTEGER",
    "LITERAL_FLOAT",
    "LITERAL_STRING",
    "INTERPOLATED_STRING",
    "WHITESPACES",
    "TEXT",
    "GHOSTED",
    "END_MAIN",
    "END_FUNCTION",
    "END_TEST",
    "END_PROCEDURE",
    "END_ENUM",
    "END_CLASS",
    "END_IF",
    "END_WHILE",
    "END_FOR",
    "END_TRY",
    "END_CONSTRUCTOR",
    "END_FUNCTION_METHOD",
    "END_PROCEDURE_METHOD",
    "COMMENT",
  ];
  public static readonly ruleNames = [
    "file",
    "global",
    "main",
    "function",
    "test",
    "testStatement",
    "procedure",
    "constant",
    "enum",
    "concreteClass",
    "concreteClassMember",
    "abstractClass",
    "abstractClassMember",
    "comment",
    "commentText",
    "ordinaryStatement",
    "variableDefinition",
    "assignment",
    "ifStatement",
    "thenClause",
    "elseIfClause",
    "elseClause",
    "whileLoop",
    "forLoop",
    "procedureCall",
    "tryStatement",
    "tryClause",
    "catchClause",
    "throwStatement",
    "errorMessage",
    "assert",
    "returnStatement",
    "catchStatement",
    "constructorMember",
    "property",
    "functionMethod",
    "procedureMethod",
    "abstractFunction",
    "abstractProcedure",
    "identifierDef",
    "identifierUse",
    "assignable",
    "methodName",
    "testName",
    "typeName",
    "constantValue",
    "argList",
    "argument",
    "paramList",
    "identifierList",
    "expressionList",
    "type",
    "assertActual",
    "assertExpected",
    "litValue",
    "litBoolean",
    "litInt",
    "litFloat",
    "litString",
    "enumValue",
    "index",
    "expression",
    "term",
    "chainable",
    "thisInstance",
    "bracketedExpression",
    "unaryExpression",
    "negateNumeric",
    "negateLogical",
    "binaryExpression",
    "list",
    "tuple",
    "dictionary",
    "kvpList",
    "kvp",
    "methodCall",
    "binaryOperator",
    "newInstance",
    "paramDef",
    "typeGeneric",
    "typeFunc",
    "typeTuple",
    "lambda",
    "interpolatedString",
  ];

  public get grammarFileName(): string {
    return "Python.g4";
  }
  public get literalNames(): (string | null)[] {
    return PythonParser.literalNames;
  }
  public get symbolicNames(): (string | null)[] {
    return PythonParser.symbolicNames;
  }
  public get ruleNames(): string[] {
    return PythonParser.ruleNames;
  }
  public get serializedATN(): number[] {
    return PythonParser._serializedATN;
  }

  protected createFailedPredicateException(
    predicate?: string,
    message?: string,
  ): antlr.FailedPredicateException {
    return new antlr.FailedPredicateException(this, predicate, message);
  }

  public constructor(input: antlr.TokenStream) {
    super(input);
    this.interpreter = new antlr.ParserATNSimulator(
      this,
      PythonParser._ATN,
      PythonParser.decisionsToDFA,
      new antlr.PredictionContextCache(),
    );
  }
  public file(): FileContext {
    let localContext = new FileContext(this.context, this.state);
    this.enterRule(localContext, 0, PythonParser.RULE_file);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 169;
        this.errorHandler.sync(this);
        switch (this.interpreter.adaptivePredict(this.tokenStream, 0, this.context)) {
          case 1:
            {
              this.state = 168;
              this.comment();
            }
            break;
        }
        this.state = 174;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (
          _la === 1 ||
          _la === 46 ||
          (((_la - 96) & ~0x1f) === 0 && ((1 << (_la - 96)) & 16778241) !== 0)
        ) {
          {
            {
              this.state = 171;
              this.global();
            }
          }
          this.state = 176;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 180;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (_la === 94) {
          {
            {
              this.state = 177;
              this.match(PythonParser.NL);
            }
          }
          this.state = 182;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 183;
        this.match(PythonParser.EOF);
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
        this.errorHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localContext;
  }
  public global(): GlobalContext {
    let localContext = new GlobalContext(this.context, this.state);
    this.enterRule(localContext, 2, PythonParser.RULE_global);
    try {
      this.state = 194;
      this.errorHandler.sync(this);
      switch (this.interpreter.adaptivePredict(this.tokenStream, 3, this.context)) {
        case 1:
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 185;
            this.main();
          }
          break;
        case 2:
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 186;
            this.function_();
          }
          break;
        case 3:
          this.enterOuterAlt(localContext, 3);
          {
            this.state = 187;
            this.test();
          }
          break;
        case 4:
          this.enterOuterAlt(localContext, 4);
          {
            this.state = 188;
            this.procedure();
          }
          break;
        case 5:
          this.enterOuterAlt(localContext, 5);
          {
            this.state = 189;
            this.constant();
          }
          break;
        case 6:
          this.enterOuterAlt(localContext, 6);
          {
            this.state = 190;
            this.enum_();
          }
          break;
        case 7:
          this.enterOuterAlt(localContext, 7);
          {
            this.state = 191;
            this.concreteClass();
          }
          break;
        case 8:
          this.enterOuterAlt(localContext, 8);
          {
            this.state = 192;
            this.abstractClass();
          }
          break;
        case 9:
          this.enterOuterAlt(localContext, 9);
          {
            this.state = 193;
            this.comment();
          }
          break;
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
        this.errorHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localContext;
  }
  public main(): MainContext {
    let localContext = new MainContext(this.context, this.state);
    this.enterRule(localContext, 4, PythonParser.RULE_main);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 197;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 106) {
          {
            this.state = 196;
            this.match(PythonParser.GHOSTED);
          }
        }

        this.state = 199;
        this.match(PythonParser.DEF);
        this.state = 200;
        this.match(PythonParser.MAIN);
        this.state = 201;
        this.match(PythonParser.OPEN_BRACKET);
        this.state = 202;
        this.match(PythonParser.CLOSE_BRACKET);
        this.state = 203;
        this.match(PythonParser.CLOSE_BRACKET);
        this.state = 204;
        this.match(PythonParser.ARROW);
        this.state = 205;
        this.match(PythonParser.NONE);
        this.state = 206;
        this.match(PythonParser.COLON);
        this.state = 207;
        this.match(PythonParser.NL);
        this.state = 211;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (
          ((_la & ~0x1f) === 0 && ((1 << _la) & 12384) !== 0) ||
          (((_la - 51) & ~0x1f) === 0 && ((1 << (_la - 51)) & 356519409) !== 0) ||
          (((_la - 96) & ~0x1f) === 0 && ((1 << (_la - 96)) & 16778495) !== 0)
        ) {
          {
            {
              this.state = 208;
              this.ordinaryStatement();
            }
          }
          this.state = 213;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 214;
        this.match(PythonParser.END_MAIN);
        this.state = 215;
        this.match(PythonParser.NL);
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
        this.errorHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localContext;
  }
  public function_(): FunctionContext {
    let localContext = new FunctionContext(this.context, this.state);
    this.enterRule(localContext, 6, PythonParser.RULE_function);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 218;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 106) {
          {
            this.state = 217;
            this.match(PythonParser.GHOSTED);
          }
        }

        this.state = 220;
        this.match(PythonParser.DEF);
        this.state = 221;
        this.methodName();
        this.state = 222;
        this.match(PythonParser.OPEN_BRACKET);
        this.state = 224;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 96) {
          {
            this.state = 223;
            this.paramList();
          }
        }

        this.state = 226;
        this.match(PythonParser.CLOSE_BRACKET);
        this.state = 227;
        this.match(PythonParser.ARROW);
        this.state = 228;
        this.type_();
        this.state = 229;
        this.match(PythonParser.COLON);
        this.state = 231;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 120) {
          {
            this.state = 230;
            this.commentText();
          }
        }

        this.state = 233;
        this.match(PythonParser.NL);
        this.state = 237;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (
          ((_la & ~0x1f) === 0 && ((1 << _la) & 12384) !== 0) ||
          (((_la - 51) & ~0x1f) === 0 && ((1 << (_la - 51)) & 356519409) !== 0) ||
          (((_la - 96) & ~0x1f) === 0 && ((1 << (_la - 96)) & 16778495) !== 0)
        ) {
          {
            {
              this.state = 234;
              this.ordinaryStatement();
            }
          }
          this.state = 239;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 240;
        this.returnStatement();
        this.state = 241;
        this.match(PythonParser.END_FUNCTION);
        this.state = 242;
        this.match(PythonParser.NL);
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
        this.errorHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localContext;
  }
  public test(): TestContext {
    let localContext = new TestContext(this.context, this.state);
    this.enterRule(localContext, 8, PythonParser.RULE_test);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 245;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 106) {
          {
            this.state = 244;
            this.match(PythonParser.GHOSTED);
          }
        }

        this.state = 247;
        this.match(PythonParser.CLASS);
        this.state = 248;
        this.testName();
        this.state = 249;
        this.match(PythonParser.OPEN_BRACKET);
        this.state = 250;
        this.match(PythonParser.TESTCASE);
        this.state = 251;
        this.match(PythonParser.CLOSE_BRACKET);
        this.state = 252;
        this.match(PythonParser.COMMENT);
        this.state = 253;
        this.match(PythonParser.NL);
        this.state = 257;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (_la === 73 || _la === 96 || _la === 106 || _la === 120) {
          {
            {
              this.state = 254;
              this.testStatement();
            }
          }
          this.state = 259;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 260;
        this.match(PythonParser.END_TEST);
        this.state = 261;
        this.match(PythonParser.NL);
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
        this.errorHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localContext;
  }
  public testStatement(): TestStatementContext {
    let localContext = new TestStatementContext(this.context, this.state);
    this.enterRule(localContext, 10, PythonParser.RULE_testStatement);
    try {
      this.state = 266;
      this.errorHandler.sync(this);
      switch (this.interpreter.adaptivePredict(this.tokenStream, 12, this.context)) {
        case 1:
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 263;
            this.assert();
          }
          break;
        case 2:
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 264;
            this.variableDefinition();
          }
          break;
        case 3:
          this.enterOuterAlt(localContext, 3);
          {
            this.state = 265;
            this.comment();
          }
          break;
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
        this.errorHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localContext;
  }
  public procedure(): ProcedureContext {
    let localContext = new ProcedureContext(this.context, this.state);
    this.enterRule(localContext, 12, PythonParser.RULE_procedure);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 269;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 106) {
          {
            this.state = 268;
            this.match(PythonParser.GHOSTED);
          }
        }

        this.state = 271;
        this.match(PythonParser.DEF);
        this.state = 272;
        this.methodName();
        this.state = 273;
        this.match(PythonParser.OPEN_BRACKET);
        this.state = 275;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 96) {
          {
            this.state = 274;
            this.paramList();
          }
        }

        this.state = 277;
        this.match(PythonParser.CLOSE_BRACKET);
        this.state = 278;
        this.match(PythonParser.ARROW);
        this.state = 279;
        this.match(PythonParser.NONE);
        this.state = 280;
        this.match(PythonParser.COLON);
        this.state = 282;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 120) {
          {
            this.state = 281;
            this.commentText();
          }
        }

        this.state = 284;
        this.match(PythonParser.NL);
        this.state = 288;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (
          ((_la & ~0x1f) === 0 && ((1 << _la) & 12384) !== 0) ||
          (((_la - 51) & ~0x1f) === 0 && ((1 << (_la - 51)) & 356519409) !== 0) ||
          (((_la - 96) & ~0x1f) === 0 && ((1 << (_la - 96)) & 16778495) !== 0)
        ) {
          {
            {
              this.state = 285;
              this.ordinaryStatement();
            }
          }
          this.state = 290;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 291;
        this.match(PythonParser.END_PROCEDURE);
        this.state = 292;
        this.match(PythonParser.NL);
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
        this.errorHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localContext;
  }
  public constant(): ConstantContext {
    let localContext = new ConstantContext(this.context, this.state);
    this.enterRule(localContext, 14, PythonParser.RULE_constant);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 295;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 106) {
          {
            this.state = 294;
            this.match(PythonParser.GHOSTED);
          }
        }

        this.state = 297;
        this.identifierDef();
        this.state = 298;
        this.match(PythonParser.EQUAL);
        this.state = 299;
        this.constantValue();
        this.state = 301;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 120) {
          {
            this.state = 300;
            this.commentText();
          }
        }

        this.state = 303;
        this.match(PythonParser.NL);
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
        this.errorHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localContext;
  }
  public enum_(): EnumContext {
    let localContext = new EnumContext(this.context, this.state);
    this.enterRule(localContext, 16, PythonParser.RULE_enum);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 306;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 106) {
          {
            this.state = 305;
            this.match(PythonParser.GHOSTED);
          }
        }

        this.state = 308;
        this.match(PythonParser.CLASS);
        this.state = 309;
        this.typeName();
        this.state = 310;
        this.match(PythonParser.OPEN_BRACKET);
        this.state = 311;
        this.match(PythonParser.ENUM);
        this.state = 312;
        this.match(PythonParser.CLOSE_BRACKET);
        this.state = 313;
        this.match(PythonParser.COLON);
        this.state = 315;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 120) {
          {
            this.state = 314;
            this.commentText();
          }
        }

        this.state = 317;
        this.match(PythonParser.NL);
        this.state = 318;
        this.identifierList();
        this.state = 319;
        this.match(PythonParser.END_ENUM);
        this.state = 320;
        this.match(PythonParser.NL);
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
        this.errorHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localContext;
  }
  public concreteClass(): ConcreteClassContext {
    let localContext = new ConcreteClassContext(this.context, this.state);
    this.enterRule(localContext, 18, PythonParser.RULE_concreteClass);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 323;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 106) {
          {
            this.state = 322;
            this.match(PythonParser.GHOSTED);
          }
        }

        this.state = 325;
        this.match(PythonParser.CLASS);
        this.state = 326;
        localContext._classTypeName = this.typeName();
        this.state = 331;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 79) {
          {
            this.state = 327;
            this.match(PythonParser.OPEN_BRACKET);
            this.state = 328;
            localContext._inheritsTypeName = this.typeName();
            this.state = 329;
            this.match(PythonParser.CLOSE_BRACKET);
          }
        }

        this.state = 333;
        this.match(PythonParser.COLON);
        this.state = 335;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 120) {
          {
            this.state = 334;
            this.commentText();
          }
        }

        this.state = 337;
        this.match(PythonParser.NL);
        this.state = 338;
        this.constructorMember();
        this.state = 342;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (_la === 46 || (((_la - 96) & ~0x1f) === 0 && ((1 << (_la - 96)) & 16778241) !== 0)) {
          {
            {
              this.state = 339;
              this.concreteClassMember();
            }
          }
          this.state = 344;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 345;
        this.match(PythonParser.END_CLASS);
        this.state = 346;
        this.match(PythonParser.NL);
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
        this.errorHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localContext;
  }
  public concreteClassMember(): ConcreteClassMemberContext {
    let localContext = new ConcreteClassMemberContext(this.context, this.state);
    this.enterRule(localContext, 20, PythonParser.RULE_concreteClassMember);
    try {
      this.state = 352;
      this.errorHandler.sync(this);
      switch (this.interpreter.adaptivePredict(this.tokenStream, 25, this.context)) {
        case 1:
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 348;
            this.property();
          }
          break;
        case 2:
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 349;
            this.functionMethod();
          }
          break;
        case 3:
          this.enterOuterAlt(localContext, 3);
          {
            this.state = 350;
            this.procedureMethod();
          }
          break;
        case 4:
          this.enterOuterAlt(localContext, 4);
          {
            this.state = 351;
            this.comment();
          }
          break;
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
        this.errorHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localContext;
  }
  public abstractClass(): AbstractClassContext {
    let localContext = new AbstractClassContext(this.context, this.state);
    this.enterRule(localContext, 22, PythonParser.RULE_abstractClass);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 355;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 106) {
          {
            this.state = 354;
            this.match(PythonParser.GHOSTED);
          }
        }

        this.state = 357;
        this.match(PythonParser.CLASS);
        this.state = 358;
        localContext._classTypeName = this.typeName();
        this.state = 363;
        this.errorHandler.sync(this);
        switch (this.tokenStream.LA(1)) {
          case PythonParser.OPEN_BRACKET:
            {
              this.state = 359;
              this.match(PythonParser.OPEN_BRACKET);
              this.state = 360;
              localContext._inheritsTypeName = this.typeName();
            }
            break;
          case PythonParser.ABC:
            {
              this.state = 361;
              this.match(PythonParser.ABC);
              this.state = 362;
              this.match(PythonParser.CLOSE_BRACKET);
            }
            break;
          default:
            throw new antlr.NoViableAltException(this);
        }
        this.state = 365;
        this.match(PythonParser.COLON);
        this.state = 367;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 120) {
          {
            this.state = 366;
            this.commentText();
          }
        }

        this.state = 369;
        this.match(PythonParser.NL);
        this.state = 373;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (
          _la === 43 ||
          _la === 46 ||
          (((_la - 96) & ~0x1f) === 0 && ((1 << (_la - 96)) & 16778241) !== 0)
        ) {
          {
            {
              this.state = 370;
              this.abstractClassMember();
            }
          }
          this.state = 375;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 376;
        this.match(PythonParser.END_CLASS);
        this.state = 377;
        this.match(PythonParser.NL);
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
        this.errorHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localContext;
  }
  public abstractClassMember(): AbstractClassMemberContext {
    let localContext = new AbstractClassMemberContext(this.context, this.state);
    this.enterRule(localContext, 24, PythonParser.RULE_abstractClassMember);
    try {
      this.state = 385;
      this.errorHandler.sync(this);
      switch (this.interpreter.adaptivePredict(this.tokenStream, 30, this.context)) {
        case 1:
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 379;
            this.property();
          }
          break;
        case 2:
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 380;
            this.functionMethod();
          }
          break;
        case 3:
          this.enterOuterAlt(localContext, 3);
          {
            this.state = 381;
            this.procedureMethod();
          }
          break;
        case 4:
          this.enterOuterAlt(localContext, 4);
          {
            this.state = 382;
            this.abstractFunction();
          }
          break;
        case 5:
          this.enterOuterAlt(localContext, 5);
          {
            this.state = 383;
            this.abstractProcedure();
          }
          break;
        case 6:
          this.enterOuterAlt(localContext, 6);
          {
            this.state = 384;
            this.comment();
          }
          break;
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
        this.errorHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localContext;
  }
  public comment(): CommentContext {
    let localContext = new CommentContext(this.context, this.state);
    this.enterRule(localContext, 26, PythonParser.RULE_comment);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 387;
        this.commentText();
        this.state = 388;
        this.match(PythonParser.NL);
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
        this.errorHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localContext;
  }
  public commentText(): CommentTextContext {
    let localContext = new CommentTextContext(this.context, this.state);
    this.enterRule(localContext, 28, PythonParser.RULE_commentText);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 390;
        this.match(PythonParser.COMMENT);
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
        this.errorHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localContext;
  }
  public ordinaryStatement(): OrdinaryStatementContext {
    let localContext = new OrdinaryStatementContext(this.context, this.state);
    this.enterRule(localContext, 30, PythonParser.RULE_ordinaryStatement);
    try {
      this.state = 401;
      this.errorHandler.sync(this);
      switch (this.interpreter.adaptivePredict(this.tokenStream, 31, this.context)) {
        case 1:
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 392;
            this.variableDefinition();
          }
          break;
        case 2:
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 393;
            this.assignment();
          }
          break;
        case 3:
          this.enterOuterAlt(localContext, 3);
          {
            this.state = 394;
            this.ifStatement();
          }
          break;
        case 4:
          this.enterOuterAlt(localContext, 4);
          {
            this.state = 395;
            this.whileLoop();
          }
          break;
        case 5:
          this.enterOuterAlt(localContext, 5);
          {
            this.state = 396;
            this.forLoop();
          }
          break;
        case 6:
          this.enterOuterAlt(localContext, 6);
          {
            this.state = 397;
            this.procedureCall();
          }
          break;
        case 7:
          this.enterOuterAlt(localContext, 7);
          {
            this.state = 398;
            this.tryStatement();
          }
          break;
        case 8:
          this.enterOuterAlt(localContext, 8);
          {
            this.state = 399;
            this.throwStatement();
          }
          break;
        case 9:
          this.enterOuterAlt(localContext, 9);
          {
            this.state = 400;
            this.comment();
          }
          break;
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
        this.errorHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localContext;
  }
  public variableDefinition(): VariableDefinitionContext {
    let localContext = new VariableDefinitionContext(this.context, this.state);
    this.enterRule(localContext, 32, PythonParser.RULE_variableDefinition);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 404;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 106) {
          {
            this.state = 403;
            this.match(PythonParser.GHOSTED);
          }
        }

        this.state = 406;
        this.identifierDef();
        this.state = 407;
        this.match(PythonParser.EQUAL);
        this.state = 408;
        this.expression(0);
        this.state = 410;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 120) {
          {
            this.state = 409;
            this.commentText();
          }
        }

        this.state = 412;
        this.match(PythonParser.NL);
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
        this.errorHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localContext;
  }
  public assignment(): AssignmentContext {
    let localContext = new AssignmentContext(this.context, this.state);
    this.enterRule(localContext, 34, PythonParser.RULE_assignment);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 415;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 106) {
          {
            this.state = 414;
            this.match(PythonParser.GHOSTED);
          }
        }

        this.state = 417;
        this.assignable(0);
        this.state = 418;
        this.match(PythonParser.EQUAL);
        this.state = 419;
        this.expression(0);
        this.state = 421;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 120) {
          {
            this.state = 420;
            this.commentText();
          }
        }

        this.state = 423;
        this.match(PythonParser.NL);
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
        this.errorHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localContext;
  }
  public ifStatement(): IfStatementContext {
    let localContext = new IfStatementContext(this.context, this.state);
    this.enterRule(localContext, 36, PythonParser.RULE_ifStatement);
    let _la: number;
    try {
      let alternative: number;
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 426;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 106) {
          {
            this.state = 425;
            this.match(PythonParser.GHOSTED);
          }
        }

        this.state = 428;
        this.match(PythonParser.IF);
        this.state = 429;
        localContext._condition = this.expression(0);
        this.state = 430;
        this.match(PythonParser.THEN);
        this.state = 432;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 120) {
          {
            this.state = 431;
            this.commentText();
          }
        }

        this.state = 434;
        this.match(PythonParser.NL);
        this.state = 435;
        this.thenClause();
        this.state = 439;
        this.errorHandler.sync(this);
        alternative = this.interpreter.adaptivePredict(this.tokenStream, 38, this.context);
        while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
          if (alternative === 1) {
            {
              {
                this.state = 436;
                this.elseIfClause();
              }
            }
          }
          this.state = 441;
          this.errorHandler.sync(this);
          alternative = this.interpreter.adaptivePredict(this.tokenStream, 38, this.context);
        }
        this.state = 443;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 3 || _la === 106) {
          {
            this.state = 442;
            this.elseClause();
          }
        }

        this.state = 445;
        this.match(PythonParser.END_IF);
        this.state = 446;
        this.match(PythonParser.NL);
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
        this.errorHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localContext;
  }
  public thenClause(): ThenClauseContext {
    let localContext = new ThenClauseContext(this.context, this.state);
    this.enterRule(localContext, 38, PythonParser.RULE_thenClause);
    try {
      let alternative: number;
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 451;
        this.errorHandler.sync(this);
        alternative = this.interpreter.adaptivePredict(this.tokenStream, 40, this.context);
        while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
          if (alternative === 1) {
            {
              {
                this.state = 448;
                this.ordinaryStatement();
              }
            }
          }
          this.state = 453;
          this.errorHandler.sync(this);
          alternative = this.interpreter.adaptivePredict(this.tokenStream, 40, this.context);
        }
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
        this.errorHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localContext;
  }
  public elseIfClause(): ElseIfClauseContext {
    let localContext = new ElseIfClauseContext(this.context, this.state);
    this.enterRule(localContext, 40, PythonParser.RULE_elseIfClause);
    let _la: number;
    try {
      let alternative: number;
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 455;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 106) {
          {
            this.state = 454;
            this.match(PythonParser.GHOSTED);
          }
        }

        this.state = 457;
        this.match(PythonParser.ELIF);
        this.state = 458;
        this.expression(0);
        this.state = 459;
        this.match(PythonParser.THEN);
        this.state = 461;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 120) {
          {
            this.state = 460;
            this.commentText();
          }
        }

        this.state = 463;
        this.match(PythonParser.NL);
        this.state = 467;
        this.errorHandler.sync(this);
        alternative = this.interpreter.adaptivePredict(this.tokenStream, 43, this.context);
        while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
          if (alternative === 1) {
            {
              {
                this.state = 464;
                this.ordinaryStatement();
              }
            }
          }
          this.state = 469;
          this.errorHandler.sync(this);
          alternative = this.interpreter.adaptivePredict(this.tokenStream, 43, this.context);
        }
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
        this.errorHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localContext;
  }
  public elseClause(): ElseClauseContext {
    let localContext = new ElseClauseContext(this.context, this.state);
    this.enterRule(localContext, 42, PythonParser.RULE_elseClause);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 471;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 106) {
          {
            this.state = 470;
            this.match(PythonParser.GHOSTED);
          }
        }

        this.state = 473;
        this.match(PythonParser.ELSE);
        this.state = 475;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 120) {
          {
            this.state = 474;
            this.commentText();
          }
        }

        this.state = 477;
        this.match(PythonParser.NL);
        this.state = 481;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (
          ((_la & ~0x1f) === 0 && ((1 << _la) & 12384) !== 0) ||
          (((_la - 51) & ~0x1f) === 0 && ((1 << (_la - 51)) & 356519409) !== 0) ||
          (((_la - 96) & ~0x1f) === 0 && ((1 << (_la - 96)) & 16778495) !== 0)
        ) {
          {
            {
              this.state = 478;
              this.ordinaryStatement();
            }
          }
          this.state = 483;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
        this.errorHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localContext;
  }
  public whileLoop(): WhileLoopContext {
    let localContext = new WhileLoopContext(this.context, this.state);
    this.enterRule(localContext, 44, PythonParser.RULE_whileLoop);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 485;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 106) {
          {
            this.state = 484;
            this.match(PythonParser.GHOSTED);
          }
        }

        this.state = 487;
        this.match(PythonParser.WHILE);
        this.state = 488;
        this.expression(0);
        this.state = 489;
        this.match(PythonParser.COLON);
        this.state = 491;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 120) {
          {
            this.state = 490;
            this.commentText();
          }
        }

        this.state = 493;
        this.match(PythonParser.NL);
        this.state = 497;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (
          ((_la & ~0x1f) === 0 && ((1 << _la) & 12384) !== 0) ||
          (((_la - 51) & ~0x1f) === 0 && ((1 << (_la - 51)) & 356519409) !== 0) ||
          (((_la - 96) & ~0x1f) === 0 && ((1 << (_la - 96)) & 16778495) !== 0)
        ) {
          {
            {
              this.state = 494;
              this.ordinaryStatement();
            }
          }
          this.state = 499;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 500;
        this.match(PythonParser.END_WHILE);
        this.state = 501;
        this.match(PythonParser.NL);
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
        this.errorHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localContext;
  }
  public forLoop(): ForLoopContext {
    let localContext = new ForLoopContext(this.context, this.state);
    this.enterRule(localContext, 46, PythonParser.RULE_forLoop);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 504;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 106) {
          {
            this.state = 503;
            this.match(PythonParser.GHOSTED);
          }
        }

        this.state = 506;
        this.match(PythonParser.FOR);
        this.state = 507;
        this.identifierDef();
        this.state = 508;
        this.match(PythonParser.IN);
        this.state = 509;
        this.expression(0);
        this.state = 510;
        this.match(PythonParser.COLON);
        this.state = 512;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 120) {
          {
            this.state = 511;
            this.commentText();
          }
        }

        this.state = 514;
        this.match(PythonParser.NL);
        this.state = 518;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (
          ((_la & ~0x1f) === 0 && ((1 << _la) & 12384) !== 0) ||
          (((_la - 51) & ~0x1f) === 0 && ((1 << (_la - 51)) & 356519409) !== 0) ||
          (((_la - 96) & ~0x1f) === 0 && ((1 << (_la - 96)) & 16778495) !== 0)
        ) {
          {
            {
              this.state = 515;
              this.ordinaryStatement();
            }
          }
          this.state = 520;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 521;
        this.match(PythonParser.END_FOR);
        this.state = 522;
        this.match(PythonParser.NL);
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
        this.errorHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localContext;
  }
  public procedureCall(): ProcedureCallContext {
    let localContext = new ProcedureCallContext(this.context, this.state);
    this.enterRule(localContext, 48, PythonParser.RULE_procedureCall);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 525;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 106) {
          {
            this.state = 524;
            this.match(PythonParser.GHOSTED);
          }
        }

        this.state = 527;
        this.term(0);
        this.state = 529;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 120) {
          {
            this.state = 528;
            this.commentText();
          }
        }

        this.state = 531;
        this.match(PythonParser.NL);
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
        this.errorHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localContext;
  }
  public tryStatement(): TryStatementContext {
    let localContext = new TryStatementContext(this.context, this.state);
    this.enterRule(localContext, 50, PythonParser.RULE_tryStatement);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 534;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 106) {
          {
            this.state = 533;
            this.match(PythonParser.GHOSTED);
          }
        }

        this.state = 536;
        this.match(PythonParser.TRY);
        this.state = 537;
        this.match(PythonParser.COLON);
        this.state = 539;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 120) {
          {
            this.state = 538;
            this.commentText();
          }
        }

        this.state = 541;
        this.match(PythonParser.NL);
        this.state = 542;
        this.tryClause();
        this.state = 544;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        do {
          {
            {
              this.state = 543;
              this.catchClause();
            }
          }
          this.state = 546;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        } while (_la === 47 || _la === 106);
        this.state = 548;
        this.match(PythonParser.END_TRY);
        this.state = 549;
        this.match(PythonParser.NL);
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
        this.errorHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localContext;
  }
  public tryClause(): TryClauseContext {
    let localContext = new TryClauseContext(this.context, this.state);
    this.enterRule(localContext, 52, PythonParser.RULE_tryClause);
    try {
      let alternative: number;
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 554;
        this.errorHandler.sync(this);
        alternative = this.interpreter.adaptivePredict(this.tokenStream, 58, this.context);
        while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
          if (alternative === 1) {
            {
              {
                this.state = 551;
                this.ordinaryStatement();
              }
            }
          }
          this.state = 556;
          this.errorHandler.sync(this);
          alternative = this.interpreter.adaptivePredict(this.tokenStream, 58, this.context);
        }
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
        this.errorHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localContext;
  }
  public catchClause(): CatchClauseContext {
    let localContext = new CatchClauseContext(this.context, this.state);
    this.enterRule(localContext, 54, PythonParser.RULE_catchClause);
    let _la: number;
    try {
      let alternative: number;
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 558;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 106) {
          {
            this.state = 557;
            this.match(PythonParser.GHOSTED);
          }
        }

        this.state = 560;
        this.match(PythonParser.EXCEPT);
        this.state = 561;
        this.typeName();
        this.state = 562;
        this.match(PythonParser.AS);
        this.state = 563;
        this.identifierDef();
        this.state = 564;
        this.match(PythonParser.COLON);
        this.state = 566;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 120) {
          {
            this.state = 565;
            this.commentText();
          }
        }

        this.state = 568;
        this.match(PythonParser.NL);
        this.state = 572;
        this.errorHandler.sync(this);
        alternative = this.interpreter.adaptivePredict(this.tokenStream, 61, this.context);
        while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
          if (alternative === 1) {
            {
              {
                this.state = 569;
                this.ordinaryStatement();
              }
            }
          }
          this.state = 574;
          this.errorHandler.sync(this);
          alternative = this.interpreter.adaptivePredict(this.tokenStream, 61, this.context);
        }
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
        this.errorHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localContext;
  }
  public throwStatement(): ThrowStatementContext {
    let localContext = new ThrowStatementContext(this.context, this.state);
    this.enterRule(localContext, 56, PythonParser.RULE_throwStatement);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 576;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 106) {
          {
            this.state = 575;
            this.match(PythonParser.GHOSTED);
          }
        }

        this.state = 578;
        this.match(PythonParser.RAISE);
        this.state = 579;
        this.typeName();
        this.state = 580;
        this.match(PythonParser.OPEN_BRACKET);
        this.state = 581;
        this.errorMessage();
        this.state = 582;
        this.match(PythonParser.CLOSE_BRACKET);
        this.state = 584;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 120) {
          {
            this.state = 583;
            this.commentText();
          }
        }

        this.state = 586;
        this.match(PythonParser.NL);
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
        this.errorHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localContext;
  }
  public errorMessage(): ErrorMessageContext {
    let localContext = new ErrorMessageContext(this.context, this.state);
    this.enterRule(localContext, 58, PythonParser.RULE_errorMessage);
    try {
      this.state = 590;
      this.errorHandler.sync(this);
      switch (this.tokenStream.LA(1)) {
        case PythonParser.LITERAL_STRING:
        case PythonParser.INTERPOLATED_STRING:
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 588;
            this.litString();
          }
          break;
        case PythonParser.NAME_STARTING_LC:
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 589;
            this.identifierUse();
          }
          break;
        default:
          throw new antlr.NoViableAltException(this);
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
        this.errorHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localContext;
  }
  public assert(): AssertContext {
    let localContext = new AssertContext(this.context, this.state);
    this.enterRule(localContext, 60, PythonParser.RULE_assert);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 593;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 106) {
          {
            this.state = 592;
            this.match(PythonParser.GHOSTED);
          }
        }

        this.state = 595;
        this.match(PythonParser.THIS_INSTANCE);
        this.state = 596;
        this.match(PythonParser.DOT);
        this.state = 597;
        this.match(PythonParser.ASSERT_EQUAL);
        this.state = 598;
        this.match(PythonParser.OPEN_BRACKET);
        this.state = 599;
        this.assertActual();
        this.state = 600;
        this.match(PythonParser.COMMA);
        this.state = 601;
        this.assertExpected();
        this.state = 602;
        this.match(PythonParser.CLOSE_BRACKET);
        this.state = 604;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 120) {
          {
            this.state = 603;
            this.commentText();
          }
        }

        this.state = 606;
        this.match(PythonParser.NL);
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
        this.errorHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localContext;
  }
  public returnStatement(): ReturnStatementContext {
    let localContext = new ReturnStatementContext(this.context, this.state);
    this.enterRule(localContext, 62, PythonParser.RULE_returnStatement);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 608;
        this.match(PythonParser.RETURN);
        this.state = 609;
        this.expression(0);
        this.state = 611;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 120) {
          {
            this.state = 610;
            this.commentText();
          }
        }

        this.state = 613;
        this.match(PythonParser.NL);
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
        this.errorHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localContext;
  }
  public catchStatement(): CatchStatementContext {
    let localContext = new CatchStatementContext(this.context, this.state);
    this.enterRule(localContext, 64, PythonParser.RULE_catchStatement);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 616;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 106) {
          {
            this.state = 615;
            this.match(PythonParser.GHOSTED);
          }
        }

        this.state = 618;
        this.match(PythonParser.EXCEPT);
        this.state = 619;
        this.typeName();
        this.state = 620;
        this.match(PythonParser.AS);
        this.state = 621;
        this.identifierDef();
        this.state = 623;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 120) {
          {
            this.state = 622;
            this.commentText();
          }
        }

        this.state = 625;
        this.match(PythonParser.NL);
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
        this.errorHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localContext;
  }
  public constructorMember(): ConstructorMemberContext {
    let localContext = new ConstructorMemberContext(this.context, this.state);
    this.enterRule(localContext, 66, PythonParser.RULE_constructorMember);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 628;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 106) {
          {
            this.state = 627;
            this.match(PythonParser.GHOSTED);
          }
        }

        this.state = 630;
        this.match(PythonParser.DEF);
        this.state = 631;
        this.match(PythonParser.INIT);
        this.state = 632;
        this.match(PythonParser.OPEN_BRACKET);
        this.state = 634;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 96) {
          {
            this.state = 633;
            this.paramList();
          }
        }

        this.state = 636;
        this.match(PythonParser.CLOSE_BRACKET);
        this.state = 637;
        this.match(PythonParser.ARROW);
        this.state = 638;
        this.match(PythonParser.NONE);
        this.state = 639;
        this.match(PythonParser.COLON);
        this.state = 641;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 120) {
          {
            this.state = 640;
            this.commentText();
          }
        }

        this.state = 643;
        this.match(PythonParser.NL);
        this.state = 647;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (
          ((_la & ~0x1f) === 0 && ((1 << _la) & 12384) !== 0) ||
          (((_la - 51) & ~0x1f) === 0 && ((1 << (_la - 51)) & 356519409) !== 0) ||
          (((_la - 96) & ~0x1f) === 0 && ((1 << (_la - 96)) & 16778495) !== 0)
        ) {
          {
            {
              this.state = 644;
              this.ordinaryStatement();
            }
          }
          this.state = 649;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 650;
        this.match(PythonParser.END_CONSTRUCTOR);
        this.state = 651;
        this.match(PythonParser.NL);
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
        this.errorHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localContext;
  }
  public property(): PropertyContext {
    let localContext = new PropertyContext(this.context, this.state);
    this.enterRule(localContext, 68, PythonParser.RULE_property);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 654;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 106) {
          {
            this.state = 653;
            this.match(PythonParser.GHOSTED);
          }
        }

        this.state = 656;
        this.identifierDef();
        this.state = 657;
        this.match(PythonParser.COLON);
        this.state = 658;
        this.type_();
        this.state = 660;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 120) {
          {
            this.state = 659;
            this.commentText();
          }
        }

        this.state = 662;
        this.match(PythonParser.NL);
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
        this.errorHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localContext;
  }
  public functionMethod(): FunctionMethodContext {
    let localContext = new FunctionMethodContext(this.context, this.state);
    this.enterRule(localContext, 70, PythonParser.RULE_functionMethod);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 665;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 106) {
          {
            this.state = 664;
            this.match(PythonParser.GHOSTED);
          }
        }

        this.state = 667;
        this.match(PythonParser.DEF);
        this.state = 668;
        this.methodName();
        this.state = 669;
        this.match(PythonParser.OPEN_BRACKET);
        this.state = 671;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 96) {
          {
            this.state = 670;
            this.paramList();
          }
        }

        this.state = 673;
        this.match(PythonParser.CLOSE_BRACKET);
        this.state = 674;
        this.match(PythonParser.ARROW);
        this.state = 675;
        this.type_();
        this.state = 676;
        this.match(PythonParser.COLON);
        this.state = 678;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 120) {
          {
            this.state = 677;
            this.commentText();
          }
        }

        this.state = 680;
        this.match(PythonParser.NL);
        this.state = 684;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (
          ((_la & ~0x1f) === 0 && ((1 << _la) & 12384) !== 0) ||
          (((_la - 51) & ~0x1f) === 0 && ((1 << (_la - 51)) & 356519409) !== 0) ||
          (((_la - 96) & ~0x1f) === 0 && ((1 << (_la - 96)) & 16778495) !== 0)
        ) {
          {
            {
              this.state = 681;
              this.ordinaryStatement();
            }
          }
          this.state = 686;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 687;
        this.returnStatement();
        this.state = 688;
        this.match(PythonParser.END_FUNCTION_METHOD);
        this.state = 689;
        this.match(PythonParser.NL);
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
        this.errorHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localContext;
  }
  public procedureMethod(): ProcedureMethodContext {
    let localContext = new ProcedureMethodContext(this.context, this.state);
    this.enterRule(localContext, 72, PythonParser.RULE_procedureMethod);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 692;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 106) {
          {
            this.state = 691;
            this.match(PythonParser.GHOSTED);
          }
        }

        this.state = 694;
        this.match(PythonParser.DEF);
        this.state = 695;
        this.methodName();
        this.state = 696;
        this.match(PythonParser.OPEN_BRACKET);
        this.state = 698;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 96) {
          {
            this.state = 697;
            this.paramList();
          }
        }

        this.state = 700;
        this.match(PythonParser.CLOSE_BRACKET);
        this.state = 701;
        this.match(PythonParser.ARROW);
        this.state = 702;
        this.match(PythonParser.NONE);
        this.state = 703;
        this.match(PythonParser.COLON);
        this.state = 705;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 120) {
          {
            this.state = 704;
            this.commentText();
          }
        }

        this.state = 707;
        this.match(PythonParser.NL);
        this.state = 711;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (
          ((_la & ~0x1f) === 0 && ((1 << _la) & 12384) !== 0) ||
          (((_la - 51) & ~0x1f) === 0 && ((1 << (_la - 51)) & 356519409) !== 0) ||
          (((_la - 96) & ~0x1f) === 0 && ((1 << (_la - 96)) & 16778495) !== 0)
        ) {
          {
            {
              this.state = 708;
              this.ordinaryStatement();
            }
          }
          this.state = 713;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 714;
        this.match(PythonParser.END_PROCEDURE_METHOD);
        this.state = 715;
        this.match(PythonParser.NL);
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
        this.errorHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localContext;
  }
  public abstractFunction(): AbstractFunctionContext {
    let localContext = new AbstractFunctionContext(this.context, this.state);
    this.enterRule(localContext, 74, PythonParser.RULE_abstractFunction);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 718;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 106) {
          {
            this.state = 717;
            this.match(PythonParser.GHOSTED);
          }
        }

        this.state = 720;
        this.match(PythonParser.ABSTRACT_METHOD);
        this.state = 721;
        this.match(PythonParser.NL);
        this.state = 722;
        this.match(PythonParser.DEF);
        this.state = 723;
        this.methodName();
        this.state = 724;
        this.match(PythonParser.OPEN_BRACKET);
        this.state = 726;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 96) {
          {
            this.state = 725;
            this.paramList();
          }
        }

        this.state = 728;
        this.match(PythonParser.CLOSE_BRACKET);
        this.state = 729;
        this.match(PythonParser.ARROW);
        this.state = 730;
        this.type_();
        this.state = 731;
        this.match(PythonParser.COLON);
        this.state = 732;
        this.match(PythonParser.NL);
        this.state = 733;
        this.match(PythonParser.PASS);
        this.state = 735;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 120) {
          {
            this.state = 734;
            this.commentText();
          }
        }

        this.state = 737;
        this.match(PythonParser.NL);
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
        this.errorHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localContext;
  }
  public abstractProcedure(): AbstractProcedureContext {
    let localContext = new AbstractProcedureContext(this.context, this.state);
    this.enterRule(localContext, 76, PythonParser.RULE_abstractProcedure);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 740;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 106) {
          {
            this.state = 739;
            this.match(PythonParser.GHOSTED);
          }
        }

        this.state = 742;
        this.match(PythonParser.ABSTRACT_METHOD);
        this.state = 743;
        this.match(PythonParser.NL);
        this.state = 744;
        this.match(PythonParser.DEF);
        this.state = 745;
        this.methodName();
        this.state = 746;
        this.match(PythonParser.OPEN_BRACKET);
        this.state = 748;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 96) {
          {
            this.state = 747;
            this.paramList();
          }
        }

        this.state = 750;
        this.match(PythonParser.CLOSE_BRACKET);
        this.state = 751;
        this.match(PythonParser.ARROW);
        this.state = 752;
        this.match(PythonParser.NONE);
        this.state = 753;
        this.match(PythonParser.COLON);
        this.state = 754;
        this.match(PythonParser.NL);
        this.state = 755;
        this.match(PythonParser.PASS);
        this.state = 757;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 120) {
          {
            this.state = 756;
            this.commentText();
          }
        }

        this.state = 759;
        this.match(PythonParser.NL);
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
        this.errorHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localContext;
  }
  public identifierDef(): IdentifierDefContext {
    let localContext = new IdentifierDefContext(this.context, this.state);
    this.enterRule(localContext, 78, PythonParser.RULE_identifierDef);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 761;
        this.match(PythonParser.NAME_STARTING_LC);
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
        this.errorHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localContext;
  }
  public identifierUse(): IdentifierUseContext {
    let localContext = new IdentifierUseContext(this.context, this.state);
    this.enterRule(localContext, 80, PythonParser.RULE_identifierUse);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 763;
        this.match(PythonParser.NAME_STARTING_LC);
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
        this.errorHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localContext;
  }

  public assignable(): AssignableContext;
  public assignable(_p: number): AssignableContext;
  public assignable(_p?: number): AssignableContext {
    if (_p === undefined) {
      _p = 0;
    }

    let parentContext = this.context;
    let parentState = this.state;
    let localContext = new AssignableContext(this.context, parentState);
    let previousContext = localContext;
    let _startState = 82;
    this.enterRecursionRule(localContext, 82, PythonParser.RULE_assignable, _p);
    try {
      let alternative: number;
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 770;
        this.errorHandler.sync(this);
        switch (this.tokenStream.LA(1)) {
          case PythonParser.NAME_STARTING_LC:
            {
              localContext = new SimpleAssignableContext(localContext);
              this.context = localContext;
              previousContext = localContext;

              this.state = 766;
              this.identifierUse();
            }
            break;
          case PythonParser.THIS_INSTANCE:
            {
              localContext = new ThisAssignableContext(localContext);
              this.context = localContext;
              previousContext = localContext;
              this.state = 767;
              this.match(PythonParser.THIS_INSTANCE);
              this.state = 768;
              this.match(PythonParser.DOT);
              this.state = 769;
              this.identifierUse();
            }
            break;
          default:
            throw new antlr.NoViableAltException(this);
        }
        this.context!.stop = this.tokenStream.LT(-1);
        this.state = 776;
        this.errorHandler.sync(this);
        alternative = this.interpreter.adaptivePredict(this.tokenStream, 91, this.context);
        while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
          if (alternative === 1) {
            if (this.parseListeners != null) {
              this.triggerExitRuleEvent();
            }
            previousContext = localContext;
            {
              {
                localContext = new IndexedAssignableContext(
                  new AssignableContext(parentContext, parentState),
                );
                this.pushNewRecursionContext(
                  localContext,
                  _startState,
                  PythonParser.RULE_assignable,
                );
                this.state = 772;
                if (!this.precpred(this.context, 1)) {
                  throw this.createFailedPredicateException("this.precpred(this.context, 1)");
                }
                this.state = 773;
                this.index();
              }
            }
          }
          this.state = 778;
          this.errorHandler.sync(this);
          alternative = this.interpreter.adaptivePredict(this.tokenStream, 91, this.context);
        }
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
        this.errorHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.unrollRecursionContexts(parentContext);
    }
    return localContext;
  }
  public methodName(): MethodNameContext {
    let localContext = new MethodNameContext(this.context, this.state);
    this.enterRule(localContext, 84, PythonParser.RULE_methodName);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 779;
        this.match(PythonParser.NAME_STARTING_LC);
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
        this.errorHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localContext;
  }
  public testName(): TestNameContext {
    let localContext = new TestNameContext(this.context, this.state);
    this.enterRule(localContext, 86, PythonParser.RULE_testName);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 781;
        this.match(PythonParser.NAME_STARTING_TEST_);
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
        this.errorHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localContext;
  }
  public typeName(): TypeNameContext {
    let localContext = new TypeNameContext(this.context, this.state);
    this.enterRule(localContext, 88, PythonParser.RULE_typeName);
    try {
      this.state = 789;
      this.errorHandler.sync(this);
      switch (this.tokenStream.LA(1)) {
        case PythonParser.INT_NAME:
          localContext = new IntTypeNameContext(localContext);
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 783;
            this.match(PythonParser.INT_NAME);
          }
          break;
        case PythonParser.FLOAT_NAME:
          localContext = new FloatTypeNameContext(localContext);
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 784;
            this.match(PythonParser.FLOAT_NAME);
          }
          break;
        case PythonParser.BOOL_NAME:
          localContext = new BoolTypeNameContext(localContext);
          this.enterOuterAlt(localContext, 3);
          {
            this.state = 785;
            this.match(PythonParser.BOOL_NAME);
          }
          break;
        case PythonParser.STRING_NAME:
          localContext = new StringTypeNameContext(localContext);
          this.enterOuterAlt(localContext, 4);
          {
            this.state = 786;
            this.match(PythonParser.STRING_NAME);
          }
          break;
        case PythonParser.LIST_NAME:
          localContext = new ListTypeNameContext(localContext);
          this.enterOuterAlt(localContext, 5);
          {
            this.state = 787;
            this.match(PythonParser.LIST_NAME);
          }
          break;
        case PythonParser.NAME_STARTING_UC:
          localContext = new UdtTypeNameContext(localContext);
          this.enterOuterAlt(localContext, 6);
          {
            this.state = 788;
            this.match(PythonParser.NAME_STARTING_UC);
          }
          break;
        default:
          throw new antlr.NoViableAltException(this);
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
        this.errorHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localContext;
  }
  public constantValue(): ConstantValueContext {
    let localContext = new ConstantValueContext(this.context, this.state);
    this.enterRule(localContext, 90, PythonParser.RULE_constantValue);
    try {
      this.state = 795;
      this.errorHandler.sync(this);
      switch (this.tokenStream.LA(1)) {
        case PythonParser.TRUE:
        case PythonParser.FALSE:
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 791;
            this.litBoolean();
          }
          break;
        case PythonParser.LITERAL_BINARY:
        case PythonParser.LITERAL_HEX:
        case PythonParser.LITERAL_INTEGER:
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 792;
            this.litInt();
          }
          break;
        case PythonParser.LITERAL_FLOAT:
          this.enterOuterAlt(localContext, 3);
          {
            this.state = 793;
            this.litFloat();
          }
          break;
        case PythonParser.LITERAL_STRING:
        case PythonParser.INTERPOLATED_STRING:
          this.enterOuterAlt(localContext, 4);
          {
            this.state = 794;
            this.litString();
          }
          break;
        default:
          throw new antlr.NoViableAltException(this);
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
        this.errorHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localContext;
  }
  public argList(): ArgListContext {
    let localContext = new ArgListContext(this.context, this.state);
    this.enterRule(localContext, 92, PythonParser.RULE_argList);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 797;
        this.argument();
        this.state = 802;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (_la === 82) {
          {
            {
              this.state = 798;
              this.match(PythonParser.COMMA);
              this.state = 799;
              this.argument();
            }
          }
          this.state = 804;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
        this.errorHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localContext;
  }
  public argument(): ArgumentContext {
    let localContext = new ArgumentContext(this.context, this.state);
    this.enterRule(localContext, 94, PythonParser.RULE_argument);
    try {
      this.state = 807;
      this.errorHandler.sync(this);
      switch (this.tokenStream.LA(1)) {
        case PythonParser.LAMBDA:
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 805;
            this.lambda();
          }
          break;
        case PythonParser.TUPLE:
        case PythonParser.INT_NAME:
        case PythonParser.FLOAT_NAME:
        case PythonParser.BOOL_NAME:
        case PythonParser.STRING_NAME:
        case PythonParser.LIST_NAME:
        case PythonParser.FUNC_NAME:
        case PythonParser.TRUE:
        case PythonParser.FALSE:
        case PythonParser.NOT:
        case PythonParser.THIS_INSTANCE:
        case PythonParser.OPEN_BRACE:
        case PythonParser.OPEN_SQ_BRACKET:
        case PythonParser.OPEN_BRACKET:
        case PythonParser.MINUS:
        case PythonParser.NAME_STARTING_LC:
        case PythonParser.NAME_STARTING_UC:
        case PythonParser.LITERAL_BINARY:
        case PythonParser.LITERAL_HEX:
        case PythonParser.LITERAL_INTEGER:
        case PythonParser.LITERAL_FLOAT:
        case PythonParser.LITERAL_STRING:
        case PythonParser.INTERPOLATED_STRING:
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 806;
            this.expression(0);
          }
          break;
        default:
          throw new antlr.NoViableAltException(this);
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
        this.errorHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localContext;
  }
  public paramList(): ParamListContext {
    let localContext = new ParamListContext(this.context, this.state);
    this.enterRule(localContext, 96, PythonParser.RULE_paramList);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 809;
        this.paramDef();
        this.state = 814;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (_la === 82) {
          {
            {
              this.state = 810;
              this.match(PythonParser.COMMA);
              this.state = 811;
              this.paramDef();
            }
          }
          this.state = 816;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
        this.errorHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localContext;
  }
  public identifierList(): IdentifierListContext {
    let localContext = new IdentifierListContext(this.context, this.state);
    this.enterRule(localContext, 98, PythonParser.RULE_identifierList);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 817;
        this.identifierDef();
        this.state = 820;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        do {
          {
            {
              this.state = 818;
              this.match(PythonParser.COMMA);
              this.state = 819;
              this.identifierDef();
            }
          }
          this.state = 822;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        } while (_la === 82);
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
        this.errorHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localContext;
  }
  public expressionList(): ExpressionListContext {
    let localContext = new ExpressionListContext(this.context, this.state);
    this.enterRule(localContext, 100, PythonParser.RULE_expressionList);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 824;
        this.expression(0);
        this.state = 829;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (_la === 82) {
          {
            {
              this.state = 825;
              this.match(PythonParser.COMMA);
              this.state = 826;
              this.expression(0);
            }
          }
          this.state = 831;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
        this.errorHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localContext;
  }
  public type_(): TypeContext {
    let localContext = new TypeContext(this.context, this.state);
    this.enterRule(localContext, 102, PythonParser.RULE_type);
    try {
      this.state = 836;
      this.errorHandler.sync(this);
      switch (this.interpreter.adaptivePredict(this.tokenStream, 99, this.context)) {
        case 1:
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 832;
            this.typeTuple();
          }
          break;
        case 2:
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 833;
            this.typeName();
          }
          break;
        case 3:
          this.enterOuterAlt(localContext, 3);
          {
            this.state = 834;
            this.typeGeneric();
          }
          break;
        case 4:
          this.enterOuterAlt(localContext, 4);
          {
            this.state = 835;
            this.typeFunc();
          }
          break;
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
        this.errorHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localContext;
  }
  public assertActual(): AssertActualContext {
    let localContext = new AssertActualContext(this.context, this.state);
    this.enterRule(localContext, 104, PythonParser.RULE_assertActual);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 838;
        this.expression(0);
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
        this.errorHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localContext;
  }
  public assertExpected(): AssertExpectedContext {
    let localContext = new AssertExpectedContext(this.context, this.state);
    this.enterRule(localContext, 106, PythonParser.RULE_assertExpected);
    try {
      this.state = 845;
      this.errorHandler.sync(this);
      switch (this.tokenStream.LA(1)) {
        case PythonParser.INT_NAME:
        case PythonParser.FLOAT_NAME:
        case PythonParser.BOOL_NAME:
        case PythonParser.STRING_NAME:
        case PythonParser.LIST_NAME:
        case PythonParser.TRUE:
        case PythonParser.FALSE:
        case PythonParser.NAME_STARTING_UC:
        case PythonParser.LITERAL_BINARY:
        case PythonParser.LITERAL_HEX:
        case PythonParser.LITERAL_INTEGER:
        case PythonParser.LITERAL_FLOAT:
        case PythonParser.LITERAL_STRING:
        case PythonParser.INTERPOLATED_STRING:
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 840;
            this.litValue();
          }
          break;
        case PythonParser.OPEN_SQ_BRACKET:
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 841;
            this.list();
          }
          break;
        case PythonParser.OPEN_BRACE:
          this.enterOuterAlt(localContext, 3);
          {
            this.state = 842;
            this.dictionary();
          }
          break;
        case PythonParser.NOT:
        case PythonParser.MINUS:
          this.enterOuterAlt(localContext, 4);
          {
            this.state = 843;
            this.unaryExpression();
          }
          break;
        case PythonParser.OPEN_BRACKET:
          this.enterOuterAlt(localContext, 5);
          {
            this.state = 844;
            this.tuple();
          }
          break;
        default:
          throw new antlr.NoViableAltException(this);
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
        this.errorHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localContext;
  }
  public litValue(): LitValueContext {
    let localContext = new LitValueContext(this.context, this.state);
    this.enterRule(localContext, 108, PythonParser.RULE_litValue);
    try {
      this.state = 853;
      this.errorHandler.sync(this);
      switch (this.interpreter.adaptivePredict(this.tokenStream, 101, this.context)) {
        case 1:
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 847;
            this.litBoolean();
          }
          break;
        case 2:
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 848;
            this.litInt();
          }
          break;
        case 3:
          this.enterOuterAlt(localContext, 3);
          {
            this.state = 849;
            this.litFloat();
          }
          break;
        case 4:
          this.enterOuterAlt(localContext, 4);
          {
            this.state = 850;
            this.litString();
          }
          break;
        case 5:
          this.enterOuterAlt(localContext, 5);
          {
            this.state = 851;
            this.interpolatedString();
          }
          break;
        case 6:
          this.enterOuterAlt(localContext, 6);
          {
            this.state = 852;
            this.enumValue();
          }
          break;
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
        this.errorHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localContext;
  }
  public litBoolean(): LitBooleanContext {
    let localContext = new LitBooleanContext(this.context, this.state);
    this.enterRule(localContext, 110, PythonParser.RULE_litBoolean);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 855;
        _la = this.tokenStream.LA(1);
        if (!(_la === 61 || _la === 62)) {
          this.errorHandler.recoverInline(this);
        } else {
          this.errorHandler.reportMatch(this);
          this.consume();
        }
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
        this.errorHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localContext;
  }
  public litInt(): LitIntContext {
    let localContext = new LitIntContext(this.context, this.state);
    this.enterRule(localContext, 112, PythonParser.RULE_litInt);
    try {
      this.state = 860;
      this.errorHandler.sync(this);
      switch (this.tokenStream.LA(1)) {
        case PythonParser.LITERAL_INTEGER:
          localContext = new LitIntegerContext(localContext);
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 857;
            this.match(PythonParser.LITERAL_INTEGER);
          }
          break;
        case PythonParser.LITERAL_BINARY:
          localContext = new LitBinaryContext(localContext);
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 858;
            this.match(PythonParser.LITERAL_BINARY);
          }
          break;
        case PythonParser.LITERAL_HEX:
          localContext = new LitHexContext(localContext);
          this.enterOuterAlt(localContext, 3);
          {
            this.state = 859;
            this.match(PythonParser.LITERAL_HEX);
          }
          break;
        default:
          throw new antlr.NoViableAltException(this);
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
        this.errorHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localContext;
  }
  public litFloat(): LitFloatContext {
    let localContext = new LitFloatContext(this.context, this.state);
    this.enterRule(localContext, 114, PythonParser.RULE_litFloat);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 862;
        this.match(PythonParser.LITERAL_FLOAT);
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
        this.errorHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localContext;
  }
  public litString(): LitStringContext {
    let localContext = new LitStringContext(this.context, this.state);
    this.enterRule(localContext, 116, PythonParser.RULE_litString);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 864;
        _la = this.tokenStream.LA(1);
        if (!(_la === 102 || _la === 103)) {
          this.errorHandler.recoverInline(this);
        } else {
          this.errorHandler.reportMatch(this);
          this.consume();
        }
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
        this.errorHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localContext;
  }
  public enumValue(): EnumValueContext {
    let localContext = new EnumValueContext(this.context, this.state);
    this.enterRule(localContext, 118, PythonParser.RULE_enumValue);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 866;
        this.typeName();
        this.state = 867;
        this.match(PythonParser.DOT);
        this.state = 868;
        this.identifierUse();
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
        this.errorHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localContext;
  }
  public index(): IndexContext {
    let localContext = new IndexContext(this.context, this.state);
    this.enterRule(localContext, 120, PythonParser.RULE_index);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 870;
        this.match(PythonParser.OPEN_SQ_BRACKET);
        this.state = 871;
        this.expression(0);
        this.state = 872;
        this.match(PythonParser.CLOSE_SQ_BRACKET);
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
        this.errorHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localContext;
  }

  public expression(): ExpressionContext;
  public expression(_p: number): ExpressionContext;
  public expression(_p?: number): ExpressionContext {
    if (_p === undefined) {
      _p = 0;
    }

    let parentContext = this.context;
    let parentState = this.state;
    let localContext = new ExpressionContext(this.context, parentState);
    let previousContext = localContext;
    let _startState = 122;
    this.enterRecursionRule(localContext, 122, PythonParser.RULE_expression, _p);
    let _la: number;
    try {
      let alternative: number;
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 879;
        this.errorHandler.sync(this);
        switch (this.interpreter.adaptivePredict(this.tokenStream, 103, this.context)) {
          case 1:
            {
              localContext = new NewInstanceExpressionContext(localContext);
              this.context = localContext;
              previousContext = localContext;

              this.state = 875;
              this.newInstance();
            }
            break;
          case 2:
            {
              localContext = new UnaryExpressionLabelContext(localContext);
              this.context = localContext;
              previousContext = localContext;
              this.state = 876;
              this.unaryExpression();
            }
            break;
          case 3:
            {
              localContext = new TermExpressionContext(localContext);
              this.context = localContext;
              previousContext = localContext;
              this.state = 877;
              this.term(0);
            }
            break;
          case 4:
            {
              localContext = new BinaryExpressionLabelContext(localContext);
              this.context = localContext;
              previousContext = localContext;
              this.state = 878;
              this.binaryExpression();
            }
            break;
        }
        this.context!.stop = this.tokenStream.LT(-1);
        this.state = 896;
        this.errorHandler.sync(this);
        alternative = this.interpreter.adaptivePredict(this.tokenStream, 105, this.context);
        while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
          if (alternative === 1) {
            if (this.parseListeners != null) {
              this.triggerExitRuleEvent();
            }
            previousContext = localContext;
            {
              {
                localContext = new IfExpressionContext(
                  new ExpressionContext(parentContext, parentState),
                );
                (localContext as IfExpressionContext)._trueExpr = previousContext;
                this.pushNewRecursionContext(
                  localContext,
                  _startState,
                  PythonParser.RULE_expression,
                );
                this.state = 881;
                if (!this.precpred(this.context, 1)) {
                  throw this.createFailedPredicateException("this.precpred(this.context, 1)");
                }
                this.state = 882;
                this.match(PythonParser.IF);
                this.state = 883;
                (localContext as IfExpressionContext)._condition = this.expression(0);
                this.state = 888;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 2) {
                  {
                    {
                      this.state = 884;
                      this.match(PythonParser.ELIF);
                      this.state = 885;
                      (localContext as IfExpressionContext)._elifCondition = this.expression(0);
                    }
                  }
                  this.state = 890;
                  this.errorHandler.sync(this);
                  _la = this.tokenStream.LA(1);
                }
                this.state = 891;
                this.match(PythonParser.ELSE);
                this.state = 892;
                (localContext as IfExpressionContext)._falseExpr = this.expression(2);
              }
            }
          }
          this.state = 898;
          this.errorHandler.sync(this);
          alternative = this.interpreter.adaptivePredict(this.tokenStream, 105, this.context);
        }
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
        this.errorHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.unrollRecursionContexts(parentContext);
    }
    return localContext;
  }

  public term(): TermContext;
  public term(_p: number): TermContext;
  public term(_p?: number): TermContext {
    if (_p === undefined) {
      _p = 0;
    }

    let parentContext = this.context;
    let parentState = this.state;
    let localContext = new TermContext(this.context, parentState);
    let previousContext = localContext;
    let _startState = 124;
    this.enterRecursionRule(localContext, 124, PythonParser.RULE_term, _p);
    try {
      let alternative: number;
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 908;
        this.errorHandler.sync(this);
        switch (this.interpreter.adaptivePredict(this.tokenStream, 106, this.context)) {
          case 1:
            {
              localContext = new ThisInstanceTermContext(localContext);
              this.context = localContext;
              previousContext = localContext;

              this.state = 900;
              this.thisInstance();
            }
            break;
          case 2:
            {
              localContext = new BracketedExpressionTermContext(localContext);
              this.context = localContext;
              previousContext = localContext;
              this.state = 901;
              this.bracketedExpression();
            }
            break;
          case 3:
            {
              localContext = new LitValueTermContext(localContext);
              this.context = localContext;
              previousContext = localContext;
              this.state = 902;
              this.litValue();
            }
            break;
          case 4:
            {
              localContext = new ListTermContext(localContext);
              this.context = localContext;
              previousContext = localContext;
              this.state = 903;
              this.list();
            }
            break;
          case 5:
            {
              localContext = new DictionaryTermContext(localContext);
              this.context = localContext;
              previousContext = localContext;
              this.state = 904;
              this.dictionary();
            }
            break;
          case 6:
            {
              localContext = new TupleTermContext(localContext);
              this.context = localContext;
              previousContext = localContext;
              this.state = 905;
              this.tuple();
            }
            break;
          case 7:
            {
              localContext = new IdentifierUseTermContext(localContext);
              this.context = localContext;
              previousContext = localContext;
              this.state = 906;
              this.identifierUse();
            }
            break;
          case 8:
            {
              localContext = new MethodCallTermContext(localContext);
              this.context = localContext;
              previousContext = localContext;
              this.state = 907;
              this.methodCall();
            }
            break;
        }
        this.context!.stop = this.tokenStream.LT(-1);
        this.state = 917;
        this.errorHandler.sync(this);
        alternative = this.interpreter.adaptivePredict(this.tokenStream, 108, this.context);
        while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
          if (alternative === 1) {
            if (this.parseListeners != null) {
              this.triggerExitRuleEvent();
            }
            previousContext = localContext;
            {
              this.state = 915;
              this.errorHandler.sync(this);
              switch (this.interpreter.adaptivePredict(this.tokenStream, 107, this.context)) {
                case 1:
                  {
                    localContext = new IndexedTermContext(
                      new TermContext(parentContext, parentState),
                    );
                    this.pushNewRecursionContext(localContext, _startState, PythonParser.RULE_term);
                    this.state = 910;
                    if (!this.precpred(this.context, 2)) {
                      throw this.createFailedPredicateException("this.precpred(this.context, 2)");
                    }
                    this.state = 911;
                    this.index();
                  }
                  break;
                case 2:
                  {
                    localContext = new ChainableTermContext(
                      new TermContext(parentContext, parentState),
                    );
                    this.pushNewRecursionContext(localContext, _startState, PythonParser.RULE_term);
                    this.state = 912;
                    if (!this.precpred(this.context, 1)) {
                      throw this.createFailedPredicateException("this.precpred(this.context, 1)");
                    }
                    this.state = 913;
                    this.match(PythonParser.DOT);
                    this.state = 914;
                    this.chainable();
                  }
                  break;
              }
            }
          }
          this.state = 919;
          this.errorHandler.sync(this);
          alternative = this.interpreter.adaptivePredict(this.tokenStream, 108, this.context);
        }
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
        this.errorHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.unrollRecursionContexts(parentContext);
    }
    return localContext;
  }
  public chainable(): ChainableContext {
    let localContext = new ChainableContext(this.context, this.state);
    this.enterRule(localContext, 126, PythonParser.RULE_chainable);
    try {
      this.state = 922;
      this.errorHandler.sync(this);
      switch (this.interpreter.adaptivePredict(this.tokenStream, 109, this.context)) {
        case 1:
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 920;
            this.identifierUse();
          }
          break;
        case 2:
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 921;
            this.methodCall();
          }
          break;
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
        this.errorHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localContext;
  }
  public thisInstance(): ThisInstanceContext {
    let localContext = new ThisInstanceContext(this.context, this.state);
    this.enterRule(localContext, 128, PythonParser.RULE_thisInstance);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 924;
        this.match(PythonParser.THIS_INSTANCE);
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
        this.errorHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localContext;
  }
  public bracketedExpression(): BracketedExpressionContext {
    let localContext = new BracketedExpressionContext(this.context, this.state);
    this.enterRule(localContext, 130, PythonParser.RULE_bracketedExpression);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 926;
        this.match(PythonParser.OPEN_BRACKET);
        this.state = 927;
        this.expression(0);
        this.state = 928;
        this.match(PythonParser.CLOSE_BRACKET);
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
        this.errorHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localContext;
  }
  public unaryExpression(): UnaryExpressionContext {
    let localContext = new UnaryExpressionContext(this.context, this.state);
    this.enterRule(localContext, 132, PythonParser.RULE_unaryExpression);
    try {
      this.state = 932;
      this.errorHandler.sync(this);
      switch (this.tokenStream.LA(1)) {
        case PythonParser.MINUS:
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 930;
            this.negateNumeric();
          }
          break;
        case PythonParser.NOT:
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 931;
            this.negateLogical();
          }
          break;
        default:
          throw new antlr.NoViableAltException(this);
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
        this.errorHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localContext;
  }
  public negateNumeric(): NegateNumericContext {
    let localContext = new NegateNumericContext(this.context, this.state);
    this.enterRule(localContext, 134, PythonParser.RULE_negateNumeric);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 934;
        this.match(PythonParser.MINUS);
        this.state = 935;
        this.term(0);
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
        this.errorHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localContext;
  }
  public negateLogical(): NegateLogicalContext {
    let localContext = new NegateLogicalContext(this.context, this.state);
    this.enterRule(localContext, 136, PythonParser.RULE_negateLogical);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 937;
        this.match(PythonParser.NOT);
        this.state = 938;
        this.term(0);
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
        this.errorHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localContext;
  }
  public binaryExpression(): BinaryExpressionContext {
    let localContext = new BinaryExpressionContext(this.context, this.state);
    this.enterRule(localContext, 138, PythonParser.RULE_binaryExpression);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 940;
        localContext._left = this.term(0);
        this.state = 941;
        this.binaryOperator();
        this.state = 942;
        localContext._right = this.expression(0);
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
        this.errorHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localContext;
  }
  public list(): ListContext {
    let localContext = new ListContext(this.context, this.state);
    this.enterRule(localContext, 140, PythonParser.RULE_list);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 944;
        this.match(PythonParser.OPEN_SQ_BRACKET);
        this.state = 945;
        this.expressionList();
        this.state = 946;
        this.match(PythonParser.CLOSE_SQ_BRACKET);
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
        this.errorHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localContext;
  }
  public tuple(): TupleContext {
    let localContext = new TupleContext(this.context, this.state);
    this.enterRule(localContext, 142, PythonParser.RULE_tuple);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 948;
        this.match(PythonParser.OPEN_BRACKET);
        this.state = 949;
        this.expressionList();
        this.state = 950;
        this.match(PythonParser.CLOSE_BRACKET);
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
        this.errorHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localContext;
  }
  public dictionary(): DictionaryContext {
    let localContext = new DictionaryContext(this.context, this.state);
    this.enterRule(localContext, 144, PythonParser.RULE_dictionary);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 952;
        this.match(PythonParser.OPEN_BRACE);
        this.state = 953;
        this.kvpList();
        this.state = 954;
        this.match(PythonParser.CLOSE_BRACE);
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
        this.errorHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localContext;
  }
  public kvpList(): KvpListContext {
    let localContext = new KvpListContext(this.context, this.state);
    this.enterRule(localContext, 146, PythonParser.RULE_kvpList);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 956;
        this.kvp();
        this.state = 961;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (_la === 82) {
          {
            {
              this.state = 957;
              this.match(PythonParser.COMMA);
              this.state = 958;
              this.kvp();
            }
          }
          this.state = 963;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
        this.errorHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localContext;
  }
  public kvp(): KvpContext {
    let localContext = new KvpContext(this.context, this.state);
    this.enterRule(localContext, 148, PythonParser.RULE_kvp);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 964;
        localContext._key = this.expression(0);
        this.state = 965;
        this.match(PythonParser.COLON);
        this.state = 966;
        localContext._value = this.expression(0);
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
        this.errorHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localContext;
  }
  public methodCall(): MethodCallContext {
    let localContext = new MethodCallContext(this.context, this.state);
    this.enterRule(localContext, 150, PythonParser.RULE_methodCall);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 968;
        this.methodName();
        this.state = 969;
        this.match(PythonParser.OPEN_BRACKET);
        this.state = 971;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (
          _la === 9 ||
          (((_la - 54) & ~0x1f) === 0 && ((1 << (_la - 54)) & 2192050687) !== 0) ||
          (((_la - 96) & ~0x1f) === 0 && ((1 << (_la - 96)) & 255) !== 0)
        ) {
          {
            this.state = 970;
            this.argList();
          }
        }

        this.state = 973;
        this.match(PythonParser.CLOSE_BRACKET);
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
        this.errorHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localContext;
  }
  public binaryOperator(): BinaryOperatorContext {
    let localContext = new BinaryOperatorContext(this.context, this.state);
    this.enterRule(localContext, 152, PythonParser.RULE_binaryOperator);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 975;
        _la = this.tokenStream.LA(1);
        if (!(((_la - 63) & ~0x1f) === 0 && ((1 << (_la - 63)) & 534773947) !== 0)) {
          this.errorHandler.recoverInline(this);
        } else {
          this.errorHandler.reportMatch(this);
          this.consume();
        }
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
        this.errorHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localContext;
  }
  public newInstance(): NewInstanceContext {
    let localContext = new NewInstanceContext(this.context, this.state);
    this.enterRule(localContext, 154, PythonParser.RULE_newInstance);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 977;
        this.type_();
        this.state = 978;
        this.match(PythonParser.OPEN_BRACKET);
        this.state = 980;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (
          _la === 9 ||
          (((_la - 54) & ~0x1f) === 0 && ((1 << (_la - 54)) & 2192050687) !== 0) ||
          (((_la - 96) & ~0x1f) === 0 && ((1 << (_la - 96)) & 255) !== 0)
        ) {
          {
            this.state = 979;
            this.argList();
          }
        }

        this.state = 982;
        this.match(PythonParser.CLOSE_BRACKET);
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
        this.errorHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localContext;
  }
  public paramDef(): ParamDefContext {
    let localContext = new ParamDefContext(this.context, this.state);
    this.enterRule(localContext, 156, PythonParser.RULE_paramDef);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 984;
        this.identifierDef();
        this.state = 985;
        this.match(PythonParser.COLON);
        this.state = 986;
        this.type_();
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
        this.errorHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localContext;
  }
  public typeGeneric(): TypeGenericContext {
    let localContext = new TypeGenericContext(this.context, this.state);
    this.enterRule(localContext, 158, PythonParser.RULE_typeGeneric);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 988;
        this.typeName();
        this.state = 989;
        this.match(PythonParser.OPEN_SQ_BRACKET);
        this.state = 990;
        this.type_();
        this.state = 995;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (_la === 82) {
          {
            {
              this.state = 991;
              this.match(PythonParser.COMMA);
              this.state = 992;
              this.type_();
            }
          }
          this.state = 997;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 998;
        this.match(PythonParser.CLOSE_SQ_BRACKET);
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
        this.errorHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localContext;
  }
  public typeFunc(): TypeFuncContext {
    let localContext = new TypeFuncContext(this.context, this.state);
    this.enterRule(localContext, 160, PythonParser.RULE_typeFunc);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 1000;
        this.match(PythonParser.FUNC_NAME);
        this.state = 1001;
        this.match(PythonParser.OPEN_SQ_BRACKET);
        this.state = 1002;
        this.match(PythonParser.OPEN_SQ_BRACKET);
        this.state = 1003;
        this.type_();
        this.state = 1008;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (_la === 82) {
          {
            {
              this.state = 1004;
              this.match(PythonParser.COMMA);
              this.state = 1005;
              this.type_();
            }
          }
          this.state = 1010;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 1011;
        this.match(PythonParser.CLOSE_SQ_BRACKET);
        this.state = 1012;
        this.match(PythonParser.COMMA);
        this.state = 1013;
        this.type_();
        this.state = 1014;
        this.match(PythonParser.CLOSE_SQ_BRACKET);
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
        this.errorHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localContext;
  }
  public typeTuple(): TypeTupleContext {
    let localContext = new TypeTupleContext(this.context, this.state);
    this.enterRule(localContext, 162, PythonParser.RULE_typeTuple);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 1016;
        this.match(PythonParser.TUPLE);
        this.state = 1017;
        this.match(PythonParser.OPEN_SQ_BRACKET);
        this.state = 1018;
        this.type_();
        this.state = 1021;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        do {
          {
            {
              this.state = 1019;
              this.match(PythonParser.COMMA);
              this.state = 1020;
              this.type_();
            }
          }
          this.state = 1023;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        } while (_la === 82);
        this.state = 1025;
        this.match(PythonParser.CLOSE_SQ_BRACKET);
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
        this.errorHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localContext;
  }
  public lambda(): LambdaContext {
    let localContext = new LambdaContext(this.context, this.state);
    this.enterRule(localContext, 164, PythonParser.RULE_lambda);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 1027;
        this.match(PythonParser.LAMBDA);
        this.state = 1028;
        this.paramList();
        this.state = 1029;
        this.match(PythonParser.COLON);
        this.state = 1030;
        this.expression(0);
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
        this.errorHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localContext;
  }
  public interpolatedString(): InterpolatedStringContext {
    let localContext = new InterpolatedStringContext(this.context, this.state);
    this.enterRule(localContext, 166, PythonParser.RULE_interpolatedString);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 1032;
        this.match(PythonParser.INTERPOLATED_STRING);
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
        this.errorHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localContext;
  }

  public override sempred(
    localContext: antlr.ParserRuleContext | null,
    ruleIndex: number,
    predIndex: number,
  ): boolean {
    switch (ruleIndex) {
      case 41:
        return this.assignable_sempred(localContext as AssignableContext, predIndex);
      case 61:
        return this.expression_sempred(localContext as ExpressionContext, predIndex);
      case 62:
        return this.term_sempred(localContext as TermContext, predIndex);
    }
    return true;
  }
  private assignable_sempred(localContext: AssignableContext | null, predIndex: number): boolean {
    switch (predIndex) {
      case 0:
        return this.precpred(this.context, 1);
    }
    return true;
  }
  private expression_sempred(localContext: ExpressionContext | null, predIndex: number): boolean {
    switch (predIndex) {
      case 1:
        return this.precpred(this.context, 1);
    }
    return true;
  }
  private term_sempred(localContext: TermContext | null, predIndex: number): boolean {
    switch (predIndex) {
      case 2:
        return this.precpred(this.context, 2);
      case 3:
        return this.precpred(this.context, 1);
    }
    return true;
  }

  public static readonly _serializedATN: number[] = [
    4, 1, 120, 1035, 2, 0, 7, 0, 2, 1, 7, 1, 2, 2, 7, 2, 2, 3, 7, 3, 2, 4, 7, 4, 2, 5, 7, 5, 2, 6,
    7, 6, 2, 7, 7, 7, 2, 8, 7, 8, 2, 9, 7, 9, 2, 10, 7, 10, 2, 11, 7, 11, 2, 12, 7, 12, 2, 13, 7,
    13, 2, 14, 7, 14, 2, 15, 7, 15, 2, 16, 7, 16, 2, 17, 7, 17, 2, 18, 7, 18, 2, 19, 7, 19, 2, 20,
    7, 20, 2, 21, 7, 21, 2, 22, 7, 22, 2, 23, 7, 23, 2, 24, 7, 24, 2, 25, 7, 25, 2, 26, 7, 26, 2,
    27, 7, 27, 2, 28, 7, 28, 2, 29, 7, 29, 2, 30, 7, 30, 2, 31, 7, 31, 2, 32, 7, 32, 2, 33, 7, 33,
    2, 34, 7, 34, 2, 35, 7, 35, 2, 36, 7, 36, 2, 37, 7, 37, 2, 38, 7, 38, 2, 39, 7, 39, 2, 40, 7,
    40, 2, 41, 7, 41, 2, 42, 7, 42, 2, 43, 7, 43, 2, 44, 7, 44, 2, 45, 7, 45, 2, 46, 7, 46, 2, 47,
    7, 47, 2, 48, 7, 48, 2, 49, 7, 49, 2, 50, 7, 50, 2, 51, 7, 51, 2, 52, 7, 52, 2, 53, 7, 53, 2,
    54, 7, 54, 2, 55, 7, 55, 2, 56, 7, 56, 2, 57, 7, 57, 2, 58, 7, 58, 2, 59, 7, 59, 2, 60, 7, 60,
    2, 61, 7, 61, 2, 62, 7, 62, 2, 63, 7, 63, 2, 64, 7, 64, 2, 65, 7, 65, 2, 66, 7, 66, 2, 67, 7,
    67, 2, 68, 7, 68, 2, 69, 7, 69, 2, 70, 7, 70, 2, 71, 7, 71, 2, 72, 7, 72, 2, 73, 7, 73, 2, 74,
    7, 74, 2, 75, 7, 75, 2, 76, 7, 76, 2, 77, 7, 77, 2, 78, 7, 78, 2, 79, 7, 79, 2, 80, 7, 80, 2,
    81, 7, 81, 2, 82, 7, 82, 2, 83, 7, 83, 1, 0, 3, 0, 170, 8, 0, 1, 0, 5, 0, 173, 8, 0, 10, 0, 12,
    0, 176, 9, 0, 1, 0, 5, 0, 179, 8, 0, 10, 0, 12, 0, 182, 9, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 1, 195, 8, 1, 1, 2, 3, 2, 198, 8, 2, 1, 2, 1, 2, 1, 2, 1, 2,
    1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 5, 2, 210, 8, 2, 10, 2, 12, 2, 213, 9, 2, 1, 2, 1, 2, 1, 2,
    1, 3, 3, 3, 219, 8, 3, 1, 3, 1, 3, 1, 3, 1, 3, 3, 3, 225, 8, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 3,
    3, 232, 8, 3, 1, 3, 1, 3, 5, 3, 236, 8, 3, 10, 3, 12, 3, 239, 9, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1,
    4, 3, 4, 246, 8, 4, 1, 4, 1, 4, 1, 4, 1, 4, 1, 4, 1, 4, 1, 4, 1, 4, 5, 4, 256, 8, 4, 10, 4, 12,
    4, 259, 9, 4, 1, 4, 1, 4, 1, 4, 1, 5, 1, 5, 1, 5, 3, 5, 267, 8, 5, 1, 6, 3, 6, 270, 8, 6, 1, 6,
    1, 6, 1, 6, 1, 6, 3, 6, 276, 8, 6, 1, 6, 1, 6, 1, 6, 1, 6, 1, 6, 3, 6, 283, 8, 6, 1, 6, 1, 6, 5,
    6, 287, 8, 6, 10, 6, 12, 6, 290, 9, 6, 1, 6, 1, 6, 1, 6, 1, 7, 3, 7, 296, 8, 7, 1, 7, 1, 7, 1,
    7, 1, 7, 3, 7, 302, 8, 7, 1, 7, 1, 7, 1, 8, 3, 8, 307, 8, 8, 1, 8, 1, 8, 1, 8, 1, 8, 1, 8, 1, 8,
    1, 8, 3, 8, 316, 8, 8, 1, 8, 1, 8, 1, 8, 1, 8, 1, 8, 1, 9, 3, 9, 324, 8, 9, 1, 9, 1, 9, 1, 9, 1,
    9, 1, 9, 1, 9, 3, 9, 332, 8, 9, 1, 9, 1, 9, 3, 9, 336, 8, 9, 1, 9, 1, 9, 1, 9, 5, 9, 341, 8, 9,
    10, 9, 12, 9, 344, 9, 9, 1, 9, 1, 9, 1, 9, 1, 10, 1, 10, 1, 10, 1, 10, 3, 10, 353, 8, 10, 1, 11,
    3, 11, 356, 8, 11, 1, 11, 1, 11, 1, 11, 1, 11, 1, 11, 1, 11, 3, 11, 364, 8, 11, 1, 11, 1, 11, 3,
    11, 368, 8, 11, 1, 11, 1, 11, 5, 11, 372, 8, 11, 10, 11, 12, 11, 375, 9, 11, 1, 11, 1, 11, 1,
    11, 1, 12, 1, 12, 1, 12, 1, 12, 1, 12, 1, 12, 3, 12, 386, 8, 12, 1, 13, 1, 13, 1, 13, 1, 14, 1,
    14, 1, 15, 1, 15, 1, 15, 1, 15, 1, 15, 1, 15, 1, 15, 1, 15, 1, 15, 3, 15, 402, 8, 15, 1, 16, 3,
    16, 405, 8, 16, 1, 16, 1, 16, 1, 16, 1, 16, 3, 16, 411, 8, 16, 1, 16, 1, 16, 1, 17, 3, 17, 416,
    8, 17, 1, 17, 1, 17, 1, 17, 1, 17, 3, 17, 422, 8, 17, 1, 17, 1, 17, 1, 18, 3, 18, 427, 8, 18, 1,
    18, 1, 18, 1, 18, 1, 18, 3, 18, 433, 8, 18, 1, 18, 1, 18, 1, 18, 5, 18, 438, 8, 18, 10, 18, 12,
    18, 441, 9, 18, 1, 18, 3, 18, 444, 8, 18, 1, 18, 1, 18, 1, 18, 1, 19, 5, 19, 450, 8, 19, 10, 19,
    12, 19, 453, 9, 19, 1, 20, 3, 20, 456, 8, 20, 1, 20, 1, 20, 1, 20, 1, 20, 3, 20, 462, 8, 20, 1,
    20, 1, 20, 5, 20, 466, 8, 20, 10, 20, 12, 20, 469, 9, 20, 1, 21, 3, 21, 472, 8, 21, 1, 21, 1,
    21, 3, 21, 476, 8, 21, 1, 21, 1, 21, 5, 21, 480, 8, 21, 10, 21, 12, 21, 483, 9, 21, 1, 22, 3,
    22, 486, 8, 22, 1, 22, 1, 22, 1, 22, 1, 22, 3, 22, 492, 8, 22, 1, 22, 1, 22, 5, 22, 496, 8, 22,
    10, 22, 12, 22, 499, 9, 22, 1, 22, 1, 22, 1, 22, 1, 23, 3, 23, 505, 8, 23, 1, 23, 1, 23, 1, 23,
    1, 23, 1, 23, 1, 23, 3, 23, 513, 8, 23, 1, 23, 1, 23, 5, 23, 517, 8, 23, 10, 23, 12, 23, 520, 9,
    23, 1, 23, 1, 23, 1, 23, 1, 24, 3, 24, 526, 8, 24, 1, 24, 1, 24, 3, 24, 530, 8, 24, 1, 24, 1,
    24, 1, 25, 3, 25, 535, 8, 25, 1, 25, 1, 25, 1, 25, 3, 25, 540, 8, 25, 1, 25, 1, 25, 1, 25, 4,
    25, 545, 8, 25, 11, 25, 12, 25, 546, 1, 25, 1, 25, 1, 25, 1, 26, 5, 26, 553, 8, 26, 10, 26, 12,
    26, 556, 9, 26, 1, 27, 3, 27, 559, 8, 27, 1, 27, 1, 27, 1, 27, 1, 27, 1, 27, 1, 27, 3, 27, 567,
    8, 27, 1, 27, 1, 27, 5, 27, 571, 8, 27, 10, 27, 12, 27, 574, 9, 27, 1, 28, 3, 28, 577, 8, 28, 1,
    28, 1, 28, 1, 28, 1, 28, 1, 28, 1, 28, 3, 28, 585, 8, 28, 1, 28, 1, 28, 1, 29, 1, 29, 3, 29,
    591, 8, 29, 1, 30, 3, 30, 594, 8, 30, 1, 30, 1, 30, 1, 30, 1, 30, 1, 30, 1, 30, 1, 30, 1, 30, 1,
    30, 3, 30, 605, 8, 30, 1, 30, 1, 30, 1, 31, 1, 31, 1, 31, 3, 31, 612, 8, 31, 1, 31, 1, 31, 1,
    32, 3, 32, 617, 8, 32, 1, 32, 1, 32, 1, 32, 1, 32, 1, 32, 3, 32, 624, 8, 32, 1, 32, 1, 32, 1,
    33, 3, 33, 629, 8, 33, 1, 33, 1, 33, 1, 33, 1, 33, 3, 33, 635, 8, 33, 1, 33, 1, 33, 1, 33, 1,
    33, 1, 33, 3, 33, 642, 8, 33, 1, 33, 1, 33, 5, 33, 646, 8, 33, 10, 33, 12, 33, 649, 9, 33, 1,
    33, 1, 33, 1, 33, 1, 34, 3, 34, 655, 8, 34, 1, 34, 1, 34, 1, 34, 1, 34, 3, 34, 661, 8, 34, 1,
    34, 1, 34, 1, 35, 3, 35, 666, 8, 35, 1, 35, 1, 35, 1, 35, 1, 35, 3, 35, 672, 8, 35, 1, 35, 1,
    35, 1, 35, 1, 35, 1, 35, 3, 35, 679, 8, 35, 1, 35, 1, 35, 5, 35, 683, 8, 35, 10, 35, 12, 35,
    686, 9, 35, 1, 35, 1, 35, 1, 35, 1, 35, 1, 36, 3, 36, 693, 8, 36, 1, 36, 1, 36, 1, 36, 1, 36, 3,
    36, 699, 8, 36, 1, 36, 1, 36, 1, 36, 1, 36, 1, 36, 3, 36, 706, 8, 36, 1, 36, 1, 36, 5, 36, 710,
    8, 36, 10, 36, 12, 36, 713, 9, 36, 1, 36, 1, 36, 1, 36, 1, 37, 3, 37, 719, 8, 37, 1, 37, 1, 37,
    1, 37, 1, 37, 1, 37, 1, 37, 3, 37, 727, 8, 37, 1, 37, 1, 37, 1, 37, 1, 37, 1, 37, 1, 37, 1, 37,
    3, 37, 736, 8, 37, 1, 37, 1, 37, 1, 38, 3, 38, 741, 8, 38, 1, 38, 1, 38, 1, 38, 1, 38, 1, 38, 1,
    38, 3, 38, 749, 8, 38, 1, 38, 1, 38, 1, 38, 1, 38, 1, 38, 1, 38, 1, 38, 3, 38, 758, 8, 38, 1,
    38, 1, 38, 1, 39, 1, 39, 1, 40, 1, 40, 1, 41, 1, 41, 1, 41, 1, 41, 1, 41, 3, 41, 771, 8, 41, 1,
    41, 1, 41, 5, 41, 775, 8, 41, 10, 41, 12, 41, 778, 9, 41, 1, 42, 1, 42, 1, 43, 1, 43, 1, 44, 1,
    44, 1, 44, 1, 44, 1, 44, 1, 44, 3, 44, 790, 8, 44, 1, 45, 1, 45, 1, 45, 1, 45, 3, 45, 796, 8,
    45, 1, 46, 1, 46, 1, 46, 5, 46, 801, 8, 46, 10, 46, 12, 46, 804, 9, 46, 1, 47, 1, 47, 3, 47,
    808, 8, 47, 1, 48, 1, 48, 1, 48, 5, 48, 813, 8, 48, 10, 48, 12, 48, 816, 9, 48, 1, 49, 1, 49, 1,
    49, 4, 49, 821, 8, 49, 11, 49, 12, 49, 822, 1, 50, 1, 50, 1, 50, 5, 50, 828, 8, 50, 10, 50, 12,
    50, 831, 9, 50, 1, 51, 1, 51, 1, 51, 1, 51, 3, 51, 837, 8, 51, 1, 52, 1, 52, 1, 53, 1, 53, 1,
    53, 1, 53, 1, 53, 3, 53, 846, 8, 53, 1, 54, 1, 54, 1, 54, 1, 54, 1, 54, 1, 54, 3, 54, 854, 8,
    54, 1, 55, 1, 55, 1, 56, 1, 56, 1, 56, 3, 56, 861, 8, 56, 1, 57, 1, 57, 1, 58, 1, 58, 1, 59, 1,
    59, 1, 59, 1, 59, 1, 60, 1, 60, 1, 60, 1, 60, 1, 61, 1, 61, 1, 61, 1, 61, 1, 61, 3, 61, 880, 8,
    61, 1, 61, 1, 61, 1, 61, 1, 61, 1, 61, 5, 61, 887, 8, 61, 10, 61, 12, 61, 890, 9, 61, 1, 61, 1,
    61, 1, 61, 5, 61, 895, 8, 61, 10, 61, 12, 61, 898, 9, 61, 1, 62, 1, 62, 1, 62, 1, 62, 1, 62, 1,
    62, 1, 62, 1, 62, 1, 62, 3, 62, 909, 8, 62, 1, 62, 1, 62, 1, 62, 1, 62, 1, 62, 5, 62, 916, 8,
    62, 10, 62, 12, 62, 919, 9, 62, 1, 63, 1, 63, 3, 63, 923, 8, 63, 1, 64, 1, 64, 1, 65, 1, 65, 1,
    65, 1, 65, 1, 66, 1, 66, 3, 66, 933, 8, 66, 1, 67, 1, 67, 1, 67, 1, 68, 1, 68, 1, 68, 1, 69, 1,
    69, 1, 69, 1, 69, 1, 70, 1, 70, 1, 70, 1, 70, 1, 71, 1, 71, 1, 71, 1, 71, 1, 72, 1, 72, 1, 72,
    1, 72, 1, 73, 1, 73, 1, 73, 5, 73, 960, 8, 73, 10, 73, 12, 73, 963, 9, 73, 1, 74, 1, 74, 1, 74,
    1, 74, 1, 75, 1, 75, 1, 75, 3, 75, 972, 8, 75, 1, 75, 1, 75, 1, 76, 1, 76, 1, 77, 1, 77, 1, 77,
    3, 77, 981, 8, 77, 1, 77, 1, 77, 1, 78, 1, 78, 1, 78, 1, 78, 1, 79, 1, 79, 1, 79, 1, 79, 1, 79,
    5, 79, 994, 8, 79, 10, 79, 12, 79, 997, 9, 79, 1, 79, 1, 79, 1, 80, 1, 80, 1, 80, 1, 80, 1, 80,
    1, 80, 5, 80, 1007, 8, 80, 10, 80, 12, 80, 1010, 9, 80, 1, 80, 1, 80, 1, 80, 1, 80, 1, 80, 1,
    81, 1, 81, 1, 81, 1, 81, 1, 81, 4, 81, 1022, 8, 81, 11, 81, 12, 81, 1023, 1, 81, 1, 81, 1, 82,
    1, 82, 1, 82, 1, 82, 1, 82, 1, 83, 1, 83, 1, 83, 0, 3, 82, 122, 124, 84, 0, 2, 4, 6, 8, 10, 12,
    14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40, 42, 44, 46, 48, 50, 52, 54, 56, 58, 60,
    62, 64, 66, 68, 70, 72, 74, 76, 78, 80, 82, 84, 86, 88, 90, 92, 94, 96, 98, 100, 102, 104, 106,
    108, 110, 112, 114, 116, 118, 120, 122, 124, 126, 128, 130, 132, 134, 136, 138, 140, 142, 144,
    146, 148, 150, 152, 154, 156, 158, 160, 162, 164, 166, 0, 3, 1, 0, 61, 62, 1, 0, 102, 103, 4, 0,
    63, 64, 66, 68, 70, 70, 84, 91, 1112, 0, 169, 1, 0, 0, 0, 2, 194, 1, 0, 0, 0, 4, 197, 1, 0, 0,
    0, 6, 218, 1, 0, 0, 0, 8, 245, 1, 0, 0, 0, 10, 266, 1, 0, 0, 0, 12, 269, 1, 0, 0, 0, 14, 295, 1,
    0, 0, 0, 16, 306, 1, 0, 0, 0, 18, 323, 1, 0, 0, 0, 20, 352, 1, 0, 0, 0, 22, 355, 1, 0, 0, 0, 24,
    385, 1, 0, 0, 0, 26, 387, 1, 0, 0, 0, 28, 390, 1, 0, 0, 0, 30, 401, 1, 0, 0, 0, 32, 404, 1, 0,
    0, 0, 34, 415, 1, 0, 0, 0, 36, 426, 1, 0, 0, 0, 38, 451, 1, 0, 0, 0, 40, 455, 1, 0, 0, 0, 42,
    471, 1, 0, 0, 0, 44, 485, 1, 0, 0, 0, 46, 504, 1, 0, 0, 0, 48, 525, 1, 0, 0, 0, 50, 534, 1, 0,
    0, 0, 52, 554, 1, 0, 0, 0, 54, 558, 1, 0, 0, 0, 56, 576, 1, 0, 0, 0, 58, 590, 1, 0, 0, 0, 60,
    593, 1, 0, 0, 0, 62, 608, 1, 0, 0, 0, 64, 616, 1, 0, 0, 0, 66, 628, 1, 0, 0, 0, 68, 654, 1, 0,
    0, 0, 70, 665, 1, 0, 0, 0, 72, 692, 1, 0, 0, 0, 74, 718, 1, 0, 0, 0, 76, 740, 1, 0, 0, 0, 78,
    761, 1, 0, 0, 0, 80, 763, 1, 0, 0, 0, 82, 770, 1, 0, 0, 0, 84, 779, 1, 0, 0, 0, 86, 781, 1, 0,
    0, 0, 88, 789, 1, 0, 0, 0, 90, 795, 1, 0, 0, 0, 92, 797, 1, 0, 0, 0, 94, 807, 1, 0, 0, 0, 96,
    809, 1, 0, 0, 0, 98, 817, 1, 0, 0, 0, 100, 824, 1, 0, 0, 0, 102, 836, 1, 0, 0, 0, 104, 838, 1,
    0, 0, 0, 106, 845, 1, 0, 0, 0, 108, 853, 1, 0, 0, 0, 110, 855, 1, 0, 0, 0, 112, 860, 1, 0, 0, 0,
    114, 862, 1, 0, 0, 0, 116, 864, 1, 0, 0, 0, 118, 866, 1, 0, 0, 0, 120, 870, 1, 0, 0, 0, 122,
    879, 1, 0, 0, 0, 124, 908, 1, 0, 0, 0, 126, 922, 1, 0, 0, 0, 128, 924, 1, 0, 0, 0, 130, 926, 1,
    0, 0, 0, 132, 932, 1, 0, 0, 0, 134, 934, 1, 0, 0, 0, 136, 937, 1, 0, 0, 0, 138, 940, 1, 0, 0, 0,
    140, 944, 1, 0, 0, 0, 142, 948, 1, 0, 0, 0, 144, 952, 1, 0, 0, 0, 146, 956, 1, 0, 0, 0, 148,
    964, 1, 0, 0, 0, 150, 968, 1, 0, 0, 0, 152, 975, 1, 0, 0, 0, 154, 977, 1, 0, 0, 0, 156, 984, 1,
    0, 0, 0, 158, 988, 1, 0, 0, 0, 160, 1000, 1, 0, 0, 0, 162, 1016, 1, 0, 0, 0, 164, 1027, 1, 0, 0,
    0, 166, 1032, 1, 0, 0, 0, 168, 170, 3, 26, 13, 0, 169, 168, 1, 0, 0, 0, 169, 170, 1, 0, 0, 0,
    170, 174, 1, 0, 0, 0, 171, 173, 3, 2, 1, 0, 172, 171, 1, 0, 0, 0, 173, 176, 1, 0, 0, 0, 174,
    172, 1, 0, 0, 0, 174, 175, 1, 0, 0, 0, 175, 180, 1, 0, 0, 0, 176, 174, 1, 0, 0, 0, 177, 179, 5,
    94, 0, 0, 178, 177, 1, 0, 0, 0, 179, 182, 1, 0, 0, 0, 180, 178, 1, 0, 0, 0, 180, 181, 1, 0, 0,
    0, 181, 183, 1, 0, 0, 0, 182, 180, 1, 0, 0, 0, 183, 184, 5, 0, 0, 1, 184, 1, 1, 0, 0, 0, 185,
    195, 3, 4, 2, 0, 186, 195, 3, 6, 3, 0, 187, 195, 3, 8, 4, 0, 188, 195, 3, 12, 6, 0, 189, 195, 3,
    14, 7, 0, 190, 195, 3, 16, 8, 0, 191, 195, 3, 18, 9, 0, 192, 195, 3, 22, 11, 0, 193, 195, 3, 26,
    13, 0, 194, 185, 1, 0, 0, 0, 194, 186, 1, 0, 0, 0, 194, 187, 1, 0, 0, 0, 194, 188, 1, 0, 0, 0,
    194, 189, 1, 0, 0, 0, 194, 190, 1, 0, 0, 0, 194, 191, 1, 0, 0, 0, 194, 192, 1, 0, 0, 0, 194,
    193, 1, 0, 0, 0, 195, 3, 1, 0, 0, 0, 196, 198, 5, 106, 0, 0, 197, 196, 1, 0, 0, 0, 197, 198, 1,
    0, 0, 0, 198, 199, 1, 0, 0, 0, 199, 200, 5, 46, 0, 0, 200, 201, 5, 10, 0, 0, 201, 202, 5, 79, 0,
    0, 202, 203, 5, 80, 0, 0, 203, 204, 5, 80, 0, 0, 204, 205, 5, 69, 0, 0, 205, 206, 5, 49, 0, 0,
    206, 207, 5, 83, 0, 0, 207, 211, 5, 94, 0, 0, 208, 210, 3, 30, 15, 0, 209, 208, 1, 0, 0, 0, 210,
    213, 1, 0, 0, 0, 211, 209, 1, 0, 0, 0, 211, 212, 1, 0, 0, 0, 212, 214, 1, 0, 0, 0, 213, 211, 1,
    0, 0, 0, 214, 215, 5, 107, 0, 0, 215, 216, 5, 94, 0, 0, 216, 5, 1, 0, 0, 0, 217, 219, 5, 106, 0,
    0, 218, 217, 1, 0, 0, 0, 218, 219, 1, 0, 0, 0, 219, 220, 1, 0, 0, 0, 220, 221, 5, 46, 0, 0, 221,
    222, 3, 84, 42, 0, 222, 224, 5, 79, 0, 0, 223, 225, 3, 96, 48, 0, 224, 223, 1, 0, 0, 0, 224,
    225, 1, 0, 0, 0, 225, 226, 1, 0, 0, 0, 226, 227, 5, 80, 0, 0, 227, 228, 5, 69, 0, 0, 228, 229,
    3, 102, 51, 0, 229, 231, 5, 83, 0, 0, 230, 232, 3, 28, 14, 0, 231, 230, 1, 0, 0, 0, 231, 232, 1,
    0, 0, 0, 232, 233, 1, 0, 0, 0, 233, 237, 5, 94, 0, 0, 234, 236, 3, 30, 15, 0, 235, 234, 1, 0, 0,
    0, 236, 239, 1, 0, 0, 0, 237, 235, 1, 0, 0, 0, 237, 238, 1, 0, 0, 0, 238, 240, 1, 0, 0, 0, 239,
    237, 1, 0, 0, 0, 240, 241, 3, 62, 31, 0, 241, 242, 5, 108, 0, 0, 242, 243, 5, 94, 0, 0, 243, 7,
    1, 0, 0, 0, 244, 246, 5, 106, 0, 0, 245, 244, 1, 0, 0, 0, 245, 246, 1, 0, 0, 0, 246, 247, 1, 0,
    0, 0, 247, 248, 5, 1, 0, 0, 248, 249, 3, 86, 43, 0, 249, 250, 5, 79, 0, 0, 250, 251, 5, 53, 0,
    0, 251, 252, 5, 80, 0, 0, 252, 253, 5, 120, 0, 0, 253, 257, 5, 94, 0, 0, 254, 256, 3, 10, 5, 0,
    255, 254, 1, 0, 0, 0, 256, 259, 1, 0, 0, 0, 257, 255, 1, 0, 0, 0, 257, 258, 1, 0, 0, 0, 258,
    260, 1, 0, 0, 0, 259, 257, 1, 0, 0, 0, 260, 261, 5, 109, 0, 0, 261, 262, 5, 94, 0, 0, 262, 9, 1,
    0, 0, 0, 263, 267, 3, 60, 30, 0, 264, 267, 3, 32, 16, 0, 265, 267, 3, 26, 13, 0, 266, 263, 1, 0,
    0, 0, 266, 264, 1, 0, 0, 0, 266, 265, 1, 0, 0, 0, 267, 11, 1, 0, 0, 0, 268, 270, 5, 106, 0, 0,
    269, 268, 1, 0, 0, 0, 269, 270, 1, 0, 0, 0, 270, 271, 1, 0, 0, 0, 271, 272, 5, 46, 0, 0, 272,
    273, 3, 84, 42, 0, 273, 275, 5, 79, 0, 0, 274, 276, 3, 96, 48, 0, 275, 274, 1, 0, 0, 0, 275,
    276, 1, 0, 0, 0, 276, 277, 1, 0, 0, 0, 277, 278, 5, 80, 0, 0, 278, 279, 5, 69, 0, 0, 279, 280,
    5, 49, 0, 0, 280, 282, 5, 83, 0, 0, 281, 283, 3, 28, 14, 0, 282, 281, 1, 0, 0, 0, 282, 283, 1,
    0, 0, 0, 283, 284, 1, 0, 0, 0, 284, 288, 5, 94, 0, 0, 285, 287, 3, 30, 15, 0, 286, 285, 1, 0, 0,
    0, 287, 290, 1, 0, 0, 0, 288, 286, 1, 0, 0, 0, 288, 289, 1, 0, 0, 0, 289, 291, 1, 0, 0, 0, 290,
    288, 1, 0, 0, 0, 291, 292, 5, 110, 0, 0, 292, 293, 5, 94, 0, 0, 293, 13, 1, 0, 0, 0, 294, 296,
    5, 106, 0, 0, 295, 294, 1, 0, 0, 0, 295, 296, 1, 0, 0, 0, 296, 297, 1, 0, 0, 0, 297, 298, 3, 78,
    39, 0, 298, 299, 5, 66, 0, 0, 299, 301, 3, 90, 45, 0, 300, 302, 3, 28, 14, 0, 301, 300, 1, 0, 0,
    0, 301, 302, 1, 0, 0, 0, 302, 303, 1, 0, 0, 0, 303, 304, 5, 94, 0, 0, 304, 15, 1, 0, 0, 0, 305,
    307, 5, 106, 0, 0, 306, 305, 1, 0, 0, 0, 306, 307, 1, 0, 0, 0, 307, 308, 1, 0, 0, 0, 308, 309,
    5, 1, 0, 0, 309, 310, 3, 88, 44, 0, 310, 311, 5, 79, 0, 0, 311, 312, 5, 4, 0, 0, 312, 313, 5,
    80, 0, 0, 313, 315, 5, 83, 0, 0, 314, 316, 3, 28, 14, 0, 315, 314, 1, 0, 0, 0, 315, 316, 1, 0,
    0, 0, 316, 317, 1, 0, 0, 0, 317, 318, 5, 94, 0, 0, 318, 319, 3, 98, 49, 0, 319, 320, 5, 111, 0,
    0, 320, 321, 5, 94, 0, 0, 321, 17, 1, 0, 0, 0, 322, 324, 5, 106, 0, 0, 323, 322, 1, 0, 0, 0,
    323, 324, 1, 0, 0, 0, 324, 325, 1, 0, 0, 0, 325, 326, 5, 1, 0, 0, 326, 331, 3, 88, 44, 0, 327,
    328, 5, 79, 0, 0, 328, 329, 3, 88, 44, 0, 329, 330, 5, 80, 0, 0, 330, 332, 1, 0, 0, 0, 331, 327,
    1, 0, 0, 0, 331, 332, 1, 0, 0, 0, 332, 333, 1, 0, 0, 0, 333, 335, 5, 83, 0, 0, 334, 336, 3, 28,
    14, 0, 335, 334, 1, 0, 0, 0, 335, 336, 1, 0, 0, 0, 336, 337, 1, 0, 0, 0, 337, 338, 5, 94, 0, 0,
    338, 342, 3, 66, 33, 0, 339, 341, 3, 20, 10, 0, 340, 339, 1, 0, 0, 0, 341, 344, 1, 0, 0, 0, 342,
    340, 1, 0, 0, 0, 342, 343, 1, 0, 0, 0, 343, 345, 1, 0, 0, 0, 344, 342, 1, 0, 0, 0, 345, 346, 5,
    112, 0, 0, 346, 347, 5, 94, 0, 0, 347, 19, 1, 0, 0, 0, 348, 353, 3, 68, 34, 0, 349, 353, 3, 70,
    35, 0, 350, 353, 3, 72, 36, 0, 351, 353, 3, 26, 13, 0, 352, 348, 1, 0, 0, 0, 352, 349, 1, 0, 0,
    0, 352, 350, 1, 0, 0, 0, 352, 351, 1, 0, 0, 0, 353, 21, 1, 0, 0, 0, 354, 356, 5, 106, 0, 0, 355,
    354, 1, 0, 0, 0, 355, 356, 1, 0, 0, 0, 356, 357, 1, 0, 0, 0, 357, 358, 5, 1, 0, 0, 358, 363, 3,
    88, 44, 0, 359, 360, 5, 79, 0, 0, 360, 364, 3, 88, 44, 0, 361, 362, 5, 52, 0, 0, 362, 364, 5,
    80, 0, 0, 363, 359, 1, 0, 0, 0, 363, 361, 1, 0, 0, 0, 364, 365, 1, 0, 0, 0, 365, 367, 5, 83, 0,
    0, 366, 368, 3, 28, 14, 0, 367, 366, 1, 0, 0, 0, 367, 368, 1, 0, 0, 0, 368, 369, 1, 0, 0, 0,
    369, 373, 5, 94, 0, 0, 370, 372, 3, 24, 12, 0, 371, 370, 1, 0, 0, 0, 372, 375, 1, 0, 0, 0, 373,
    371, 1, 0, 0, 0, 373, 374, 1, 0, 0, 0, 374, 376, 1, 0, 0, 0, 375, 373, 1, 0, 0, 0, 376, 377, 5,
    112, 0, 0, 377, 378, 5, 94, 0, 0, 378, 23, 1, 0, 0, 0, 379, 386, 3, 68, 34, 0, 380, 386, 3, 70,
    35, 0, 381, 386, 3, 72, 36, 0, 382, 386, 3, 74, 37, 0, 383, 386, 3, 76, 38, 0, 384, 386, 3, 26,
    13, 0, 385, 379, 1, 0, 0, 0, 385, 380, 1, 0, 0, 0, 385, 381, 1, 0, 0, 0, 385, 382, 1, 0, 0, 0,
    385, 383, 1, 0, 0, 0, 385, 384, 1, 0, 0, 0, 386, 25, 1, 0, 0, 0, 387, 388, 3, 28, 14, 0, 388,
    389, 5, 94, 0, 0, 389, 27, 1, 0, 0, 0, 390, 391, 5, 120, 0, 0, 391, 29, 1, 0, 0, 0, 392, 402, 3,
    32, 16, 0, 393, 402, 3, 34, 17, 0, 394, 402, 3, 36, 18, 0, 395, 402, 3, 44, 22, 0, 396, 402, 3,
    46, 23, 0, 397, 402, 3, 48, 24, 0, 398, 402, 3, 50, 25, 0, 399, 402, 3, 56, 28, 0, 400, 402, 3,
    26, 13, 0, 401, 392, 1, 0, 0, 0, 401, 393, 1, 0, 0, 0, 401, 394, 1, 0, 0, 0, 401, 395, 1, 0, 0,
    0, 401, 396, 1, 0, 0, 0, 401, 397, 1, 0, 0, 0, 401, 398, 1, 0, 0, 0, 401, 399, 1, 0, 0, 0, 401,
    400, 1, 0, 0, 0, 402, 31, 1, 0, 0, 0, 403, 405, 5, 106, 0, 0, 404, 403, 1, 0, 0, 0, 404, 405, 1,
    0, 0, 0, 405, 406, 1, 0, 0, 0, 406, 407, 3, 78, 39, 0, 407, 408, 5, 66, 0, 0, 408, 410, 3, 122,
    61, 0, 409, 411, 3, 28, 14, 0, 410, 409, 1, 0, 0, 0, 410, 411, 1, 0, 0, 0, 411, 412, 1, 0, 0, 0,
    412, 413, 5, 94, 0, 0, 413, 33, 1, 0, 0, 0, 414, 416, 5, 106, 0, 0, 415, 414, 1, 0, 0, 0, 415,
    416, 1, 0, 0, 0, 416, 417, 1, 0, 0, 0, 417, 418, 3, 82, 41, 0, 418, 419, 5, 66, 0, 0, 419, 421,
    3, 122, 61, 0, 420, 422, 3, 28, 14, 0, 421, 420, 1, 0, 0, 0, 421, 422, 1, 0, 0, 0, 422, 423, 1,
    0, 0, 0, 423, 424, 5, 94, 0, 0, 424, 35, 1, 0, 0, 0, 425, 427, 5, 106, 0, 0, 426, 425, 1, 0, 0,
    0, 426, 427, 1, 0, 0, 0, 427, 428, 1, 0, 0, 0, 428, 429, 5, 6, 0, 0, 429, 430, 3, 122, 61, 0,
    430, 432, 5, 39, 0, 0, 431, 433, 3, 28, 14, 0, 432, 431, 1, 0, 0, 0, 432, 433, 1, 0, 0, 0, 433,
    434, 1, 0, 0, 0, 434, 435, 5, 94, 0, 0, 435, 439, 3, 38, 19, 0, 436, 438, 3, 40, 20, 0, 437,
    436, 1, 0, 0, 0, 438, 441, 1, 0, 0, 0, 439, 437, 1, 0, 0, 0, 439, 440, 1, 0, 0, 0, 440, 443, 1,
    0, 0, 0, 441, 439, 1, 0, 0, 0, 442, 444, 3, 42, 21, 0, 443, 442, 1, 0, 0, 0, 443, 444, 1, 0, 0,
    0, 444, 445, 1, 0, 0, 0, 445, 446, 5, 113, 0, 0, 446, 447, 5, 94, 0, 0, 447, 37, 1, 0, 0, 0,
    448, 450, 3, 30, 15, 0, 449, 448, 1, 0, 0, 0, 450, 453, 1, 0, 0, 0, 451, 449, 1, 0, 0, 0, 451,
    452, 1, 0, 0, 0, 452, 39, 1, 0, 0, 0, 453, 451, 1, 0, 0, 0, 454, 456, 5, 106, 0, 0, 455, 454, 1,
    0, 0, 0, 455, 456, 1, 0, 0, 0, 456, 457, 1, 0, 0, 0, 457, 458, 5, 2, 0, 0, 458, 459, 3, 122, 61,
    0, 459, 461, 5, 39, 0, 0, 460, 462, 3, 28, 14, 0, 461, 460, 1, 0, 0, 0, 461, 462, 1, 0, 0, 0,
    462, 463, 1, 0, 0, 0, 463, 467, 5, 94, 0, 0, 464, 466, 3, 30, 15, 0, 465, 464, 1, 0, 0, 0, 466,
    469, 1, 0, 0, 0, 467, 465, 1, 0, 0, 0, 467, 468, 1, 0, 0, 0, 468, 41, 1, 0, 0, 0, 469, 467, 1,
    0, 0, 0, 470, 472, 5, 106, 0, 0, 471, 470, 1, 0, 0, 0, 471, 472, 1, 0, 0, 0, 472, 473, 1, 0, 0,
    0, 473, 475, 5, 3, 0, 0, 474, 476, 3, 28, 14, 0, 475, 474, 1, 0, 0, 0, 475, 476, 1, 0, 0, 0,
    476, 477, 1, 0, 0, 0, 477, 481, 5, 94, 0, 0, 478, 480, 3, 30, 15, 0, 479, 478, 1, 0, 0, 0, 480,
    483, 1, 0, 0, 0, 481, 479, 1, 0, 0, 0, 481, 482, 1, 0, 0, 0, 482, 43, 1, 0, 0, 0, 483, 481, 1,
    0, 0, 0, 484, 486, 5, 106, 0, 0, 485, 484, 1, 0, 0, 0, 485, 486, 1, 0, 0, 0, 486, 487, 1, 0, 0,
    0, 487, 488, 5, 13, 0, 0, 488, 489, 3, 122, 61, 0, 489, 491, 5, 83, 0, 0, 490, 492, 3, 28, 14,
    0, 491, 490, 1, 0, 0, 0, 491, 492, 1, 0, 0, 0, 492, 493, 1, 0, 0, 0, 493, 497, 5, 94, 0, 0, 494,
    496, 3, 30, 15, 0, 495, 494, 1, 0, 0, 0, 496, 499, 1, 0, 0, 0, 497, 495, 1, 0, 0, 0, 497, 498,
    1, 0, 0, 0, 498, 500, 1, 0, 0, 0, 499, 497, 1, 0, 0, 0, 500, 501, 5, 114, 0, 0, 501, 502, 5, 94,
    0, 0, 502, 45, 1, 0, 0, 0, 503, 505, 5, 106, 0, 0, 504, 503, 1, 0, 0, 0, 504, 505, 1, 0, 0, 0,
    505, 506, 1, 0, 0, 0, 506, 507, 5, 5, 0, 0, 507, 508, 3, 78, 39, 0, 508, 509, 5, 7, 0, 0, 509,
    510, 3, 122, 61, 0, 510, 512, 5, 83, 0, 0, 511, 513, 3, 28, 14, 0, 512, 511, 1, 0, 0, 0, 512,
    513, 1, 0, 0, 0, 513, 514, 1, 0, 0, 0, 514, 518, 5, 94, 0, 0, 515, 517, 3, 30, 15, 0, 516, 515,
    1, 0, 0, 0, 517, 520, 1, 0, 0, 0, 518, 516, 1, 0, 0, 0, 518, 519, 1, 0, 0, 0, 519, 521, 1, 0, 0,
    0, 520, 518, 1, 0, 0, 0, 521, 522, 5, 115, 0, 0, 522, 523, 5, 94, 0, 0, 523, 47, 1, 0, 0, 0,
    524, 526, 5, 106, 0, 0, 525, 524, 1, 0, 0, 0, 525, 526, 1, 0, 0, 0, 526, 527, 1, 0, 0, 0, 527,
    529, 3, 124, 62, 0, 528, 530, 3, 28, 14, 0, 529, 528, 1, 0, 0, 0, 529, 530, 1, 0, 0, 0, 530,
    531, 1, 0, 0, 0, 531, 532, 5, 94, 0, 0, 532, 49, 1, 0, 0, 0, 533, 535, 5, 106, 0, 0, 534, 533,
    1, 0, 0, 0, 534, 535, 1, 0, 0, 0, 535, 536, 1, 0, 0, 0, 536, 537, 5, 12, 0, 0, 537, 539, 5, 83,
    0, 0, 538, 540, 3, 28, 14, 0, 539, 538, 1, 0, 0, 0, 539, 540, 1, 0, 0, 0, 540, 541, 1, 0, 0, 0,
    541, 542, 5, 94, 0, 0, 542, 544, 3, 52, 26, 0, 543, 545, 3, 54, 27, 0, 544, 543, 1, 0, 0, 0,
    545, 546, 1, 0, 0, 0, 546, 544, 1, 0, 0, 0, 546, 547, 1, 0, 0, 0, 547, 548, 1, 0, 0, 0, 548,
    549, 5, 116, 0, 0, 549, 550, 5, 94, 0, 0, 550, 51, 1, 0, 0, 0, 551, 553, 3, 30, 15, 0, 552, 551,
    1, 0, 0, 0, 553, 556, 1, 0, 0, 0, 554, 552, 1, 0, 0, 0, 554, 555, 1, 0, 0, 0, 555, 53, 1, 0, 0,
    0, 556, 554, 1, 0, 0, 0, 557, 559, 5, 106, 0, 0, 558, 557, 1, 0, 0, 0, 558, 559, 1, 0, 0, 0,
    559, 560, 1, 0, 0, 0, 560, 561, 5, 47, 0, 0, 561, 562, 3, 88, 44, 0, 562, 563, 5, 45, 0, 0, 563,
    564, 3, 78, 39, 0, 564, 566, 5, 83, 0, 0, 565, 567, 3, 28, 14, 0, 566, 565, 1, 0, 0, 0, 566,
    567, 1, 0, 0, 0, 567, 568, 1, 0, 0, 0, 568, 572, 5, 94, 0, 0, 569, 571, 3, 30, 15, 0, 570, 569,
    1, 0, 0, 0, 571, 574, 1, 0, 0, 0, 572, 570, 1, 0, 0, 0, 572, 573, 1, 0, 0, 0, 573, 55, 1, 0, 0,
    0, 574, 572, 1, 0, 0, 0, 575, 577, 5, 106, 0, 0, 576, 575, 1, 0, 0, 0, 576, 577, 1, 0, 0, 0,
    577, 578, 1, 0, 0, 0, 578, 579, 5, 51, 0, 0, 579, 580, 3, 88, 44, 0, 580, 581, 5, 79, 0, 0, 581,
    582, 3, 58, 29, 0, 582, 584, 5, 80, 0, 0, 583, 585, 3, 28, 14, 0, 584, 583, 1, 0, 0, 0, 584,
    585, 1, 0, 0, 0, 585, 586, 1, 0, 0, 0, 586, 587, 5, 94, 0, 0, 587, 57, 1, 0, 0, 0, 588, 591, 3,
    116, 58, 0, 589, 591, 3, 80, 40, 0, 590, 588, 1, 0, 0, 0, 590, 589, 1, 0, 0, 0, 591, 59, 1, 0,
    0, 0, 592, 594, 5, 106, 0, 0, 593, 592, 1, 0, 0, 0, 593, 594, 1, 0, 0, 0, 594, 595, 1, 0, 0, 0,
    595, 596, 5, 73, 0, 0, 596, 597, 5, 81, 0, 0, 597, 598, 5, 44, 0, 0, 598, 599, 5, 79, 0, 0, 599,
    600, 3, 104, 52, 0, 600, 601, 5, 82, 0, 0, 601, 602, 3, 106, 53, 0, 602, 604, 5, 80, 0, 0, 603,
    605, 3, 28, 14, 0, 604, 603, 1, 0, 0, 0, 604, 605, 1, 0, 0, 0, 605, 606, 1, 0, 0, 0, 606, 607,
    5, 94, 0, 0, 607, 61, 1, 0, 0, 0, 608, 609, 5, 11, 0, 0, 609, 611, 3, 122, 61, 0, 610, 612, 3,
    28, 14, 0, 611, 610, 1, 0, 0, 0, 611, 612, 1, 0, 0, 0, 612, 613, 1, 0, 0, 0, 613, 614, 5, 94, 0,
    0, 614, 63, 1, 0, 0, 0, 615, 617, 5, 106, 0, 0, 616, 615, 1, 0, 0, 0, 616, 617, 1, 0, 0, 0, 617,
    618, 1, 0, 0, 0, 618, 619, 5, 47, 0, 0, 619, 620, 3, 88, 44, 0, 620, 621, 5, 45, 0, 0, 621, 623,
    3, 78, 39, 0, 622, 624, 3, 28, 14, 0, 623, 622, 1, 0, 0, 0, 623, 624, 1, 0, 0, 0, 624, 625, 1,
    0, 0, 0, 625, 626, 5, 94, 0, 0, 626, 65, 1, 0, 0, 0, 627, 629, 5, 106, 0, 0, 628, 627, 1, 0, 0,
    0, 628, 629, 1, 0, 0, 0, 629, 630, 1, 0, 0, 0, 630, 631, 5, 46, 0, 0, 631, 632, 5, 48, 0, 0,
    632, 634, 5, 79, 0, 0, 633, 635, 3, 96, 48, 0, 634, 633, 1, 0, 0, 0, 634, 635, 1, 0, 0, 0, 635,
    636, 1, 0, 0, 0, 636, 637, 5, 80, 0, 0, 637, 638, 5, 69, 0, 0, 638, 639, 5, 49, 0, 0, 639, 641,
    5, 83, 0, 0, 640, 642, 3, 28, 14, 0, 641, 640, 1, 0, 0, 0, 641, 642, 1, 0, 0, 0, 642, 643, 1, 0,
    0, 0, 643, 647, 5, 94, 0, 0, 644, 646, 3, 30, 15, 0, 645, 644, 1, 0, 0, 0, 646, 649, 1, 0, 0, 0,
    647, 645, 1, 0, 0, 0, 647, 648, 1, 0, 0, 0, 648, 650, 1, 0, 0, 0, 649, 647, 1, 0, 0, 0, 650,
    651, 5, 117, 0, 0, 651, 652, 5, 94, 0, 0, 652, 67, 1, 0, 0, 0, 653, 655, 5, 106, 0, 0, 654, 653,
    1, 0, 0, 0, 654, 655, 1, 0, 0, 0, 655, 656, 1, 0, 0, 0, 656, 657, 3, 78, 39, 0, 657, 658, 5, 83,
    0, 0, 658, 660, 3, 102, 51, 0, 659, 661, 3, 28, 14, 0, 660, 659, 1, 0, 0, 0, 660, 661, 1, 0, 0,
    0, 661, 662, 1, 0, 0, 0, 662, 663, 5, 94, 0, 0, 663, 69, 1, 0, 0, 0, 664, 666, 5, 106, 0, 0,
    665, 664, 1, 0, 0, 0, 665, 666, 1, 0, 0, 0, 666, 667, 1, 0, 0, 0, 667, 668, 5, 46, 0, 0, 668,
    669, 3, 84, 42, 0, 669, 671, 5, 79, 0, 0, 670, 672, 3, 96, 48, 0, 671, 670, 1, 0, 0, 0, 671,
    672, 1, 0, 0, 0, 672, 673, 1, 0, 0, 0, 673, 674, 5, 80, 0, 0, 674, 675, 5, 69, 0, 0, 675, 676,
    3, 102, 51, 0, 676, 678, 5, 83, 0, 0, 677, 679, 3, 28, 14, 0, 678, 677, 1, 0, 0, 0, 678, 679, 1,
    0, 0, 0, 679, 680, 1, 0, 0, 0, 680, 684, 5, 94, 0, 0, 681, 683, 3, 30, 15, 0, 682, 681, 1, 0, 0,
    0, 683, 686, 1, 0, 0, 0, 684, 682, 1, 0, 0, 0, 684, 685, 1, 0, 0, 0, 685, 687, 1, 0, 0, 0, 686,
    684, 1, 0, 0, 0, 687, 688, 3, 62, 31, 0, 688, 689, 5, 118, 0, 0, 689, 690, 5, 94, 0, 0, 690, 71,
    1, 0, 0, 0, 691, 693, 5, 106, 0, 0, 692, 691, 1, 0, 0, 0, 692, 693, 1, 0, 0, 0, 693, 694, 1, 0,
    0, 0, 694, 695, 5, 46, 0, 0, 695, 696, 3, 84, 42, 0, 696, 698, 5, 79, 0, 0, 697, 699, 3, 96, 48,
    0, 698, 697, 1, 0, 0, 0, 698, 699, 1, 0, 0, 0, 699, 700, 1, 0, 0, 0, 700, 701, 5, 80, 0, 0, 701,
    702, 5, 69, 0, 0, 702, 703, 5, 49, 0, 0, 703, 705, 5, 83, 0, 0, 704, 706, 3, 28, 14, 0, 705,
    704, 1, 0, 0, 0, 705, 706, 1, 0, 0, 0, 706, 707, 1, 0, 0, 0, 707, 711, 5, 94, 0, 0, 708, 710, 3,
    30, 15, 0, 709, 708, 1, 0, 0, 0, 710, 713, 1, 0, 0, 0, 711, 709, 1, 0, 0, 0, 711, 712, 1, 0, 0,
    0, 712, 714, 1, 0, 0, 0, 713, 711, 1, 0, 0, 0, 714, 715, 5, 119, 0, 0, 715, 716, 5, 94, 0, 0,
    716, 73, 1, 0, 0, 0, 717, 719, 5, 106, 0, 0, 718, 717, 1, 0, 0, 0, 718, 719, 1, 0, 0, 0, 719,
    720, 1, 0, 0, 0, 720, 721, 5, 43, 0, 0, 721, 722, 5, 94, 0, 0, 722, 723, 5, 46, 0, 0, 723, 724,
    3, 84, 42, 0, 724, 726, 5, 79, 0, 0, 725, 727, 3, 96, 48, 0, 726, 725, 1, 0, 0, 0, 726, 727, 1,
    0, 0, 0, 727, 728, 1, 0, 0, 0, 728, 729, 5, 80, 0, 0, 729, 730, 5, 69, 0, 0, 730, 731, 3, 102,
    51, 0, 731, 732, 5, 83, 0, 0, 732, 733, 5, 94, 0, 0, 733, 735, 5, 50, 0, 0, 734, 736, 3, 28, 14,
    0, 735, 734, 1, 0, 0, 0, 735, 736, 1, 0, 0, 0, 736, 737, 1, 0, 0, 0, 737, 738, 5, 94, 0, 0, 738,
    75, 1, 0, 0, 0, 739, 741, 5, 106, 0, 0, 740, 739, 1, 0, 0, 0, 740, 741, 1, 0, 0, 0, 741, 742, 1,
    0, 0, 0, 742, 743, 5, 43, 0, 0, 743, 744, 5, 94, 0, 0, 744, 745, 5, 46, 0, 0, 745, 746, 3, 84,
    42, 0, 746, 748, 5, 79, 0, 0, 747, 749, 3, 96, 48, 0, 748, 747, 1, 0, 0, 0, 748, 749, 1, 0, 0,
    0, 749, 750, 1, 0, 0, 0, 750, 751, 5, 80, 0, 0, 751, 752, 5, 69, 0, 0, 752, 753, 5, 49, 0, 0,
    753, 754, 5, 83, 0, 0, 754, 755, 5, 94, 0, 0, 755, 757, 5, 50, 0, 0, 756, 758, 3, 28, 14, 0,
    757, 756, 1, 0, 0, 0, 757, 758, 1, 0, 0, 0, 758, 759, 1, 0, 0, 0, 759, 760, 5, 94, 0, 0, 760,
    77, 1, 0, 0, 0, 761, 762, 5, 96, 0, 0, 762, 79, 1, 0, 0, 0, 763, 764, 5, 96, 0, 0, 764, 81, 1,
    0, 0, 0, 765, 766, 6, 41, -1, 0, 766, 771, 3, 80, 40, 0, 767, 768, 5, 73, 0, 0, 768, 769, 5, 81,
    0, 0, 769, 771, 3, 80, 40, 0, 770, 765, 1, 0, 0, 0, 770, 767, 1, 0, 0, 0, 771, 776, 1, 0, 0, 0,
    772, 773, 10, 1, 0, 0, 773, 775, 3, 120, 60, 0, 774, 772, 1, 0, 0, 0, 775, 778, 1, 0, 0, 0, 776,
    774, 1, 0, 0, 0, 776, 777, 1, 0, 0, 0, 777, 83, 1, 0, 0, 0, 778, 776, 1, 0, 0, 0, 779, 780, 5,
    96, 0, 0, 780, 85, 1, 0, 0, 0, 781, 782, 5, 95, 0, 0, 782, 87, 1, 0, 0, 0, 783, 790, 5, 55, 0,
    0, 784, 790, 5, 56, 0, 0, 785, 790, 5, 57, 0, 0, 786, 790, 5, 58, 0, 0, 787, 790, 5, 59, 0, 0,
    788, 790, 5, 97, 0, 0, 789, 783, 1, 0, 0, 0, 789, 784, 1, 0, 0, 0, 789, 785, 1, 0, 0, 0, 789,
    786, 1, 0, 0, 0, 789, 787, 1, 0, 0, 0, 789, 788, 1, 0, 0, 0, 790, 89, 1, 0, 0, 0, 791, 796, 3,
    110, 55, 0, 792, 796, 3, 112, 56, 0, 793, 796, 3, 114, 57, 0, 794, 796, 3, 116, 58, 0, 795, 791,
    1, 0, 0, 0, 795, 792, 1, 0, 0, 0, 795, 793, 1, 0, 0, 0, 795, 794, 1, 0, 0, 0, 796, 91, 1, 0, 0,
    0, 797, 802, 3, 94, 47, 0, 798, 799, 5, 82, 0, 0, 799, 801, 3, 94, 47, 0, 800, 798, 1, 0, 0, 0,
    801, 804, 1, 0, 0, 0, 802, 800, 1, 0, 0, 0, 802, 803, 1, 0, 0, 0, 803, 93, 1, 0, 0, 0, 804, 802,
    1, 0, 0, 0, 805, 808, 3, 164, 82, 0, 806, 808, 3, 122, 61, 0, 807, 805, 1, 0, 0, 0, 807, 806, 1,
    0, 0, 0, 808, 95, 1, 0, 0, 0, 809, 814, 3, 156, 78, 0, 810, 811, 5, 82, 0, 0, 811, 813, 3, 156,
    78, 0, 812, 810, 1, 0, 0, 0, 813, 816, 1, 0, 0, 0, 814, 812, 1, 0, 0, 0, 814, 815, 1, 0, 0, 0,
    815, 97, 1, 0, 0, 0, 816, 814, 1, 0, 0, 0, 817, 820, 3, 78, 39, 0, 818, 819, 5, 82, 0, 0, 819,
    821, 3, 78, 39, 0, 820, 818, 1, 0, 0, 0, 821, 822, 1, 0, 0, 0, 822, 820, 1, 0, 0, 0, 822, 823,
    1, 0, 0, 0, 823, 99, 1, 0, 0, 0, 824, 829, 3, 122, 61, 0, 825, 826, 5, 82, 0, 0, 826, 828, 3,
    122, 61, 0, 827, 825, 1, 0, 0, 0, 828, 831, 1, 0, 0, 0, 829, 827, 1, 0, 0, 0, 829, 830, 1, 0, 0,
    0, 830, 101, 1, 0, 0, 0, 831, 829, 1, 0, 0, 0, 832, 837, 3, 162, 81, 0, 833, 837, 3, 88, 44, 0,
    834, 837, 3, 158, 79, 0, 835, 837, 3, 160, 80, 0, 836, 832, 1, 0, 0, 0, 836, 833, 1, 0, 0, 0,
    836, 834, 1, 0, 0, 0, 836, 835, 1, 0, 0, 0, 837, 103, 1, 0, 0, 0, 838, 839, 3, 122, 61, 0, 839,
    105, 1, 0, 0, 0, 840, 846, 3, 108, 54, 0, 841, 846, 3, 140, 70, 0, 842, 846, 3, 144, 72, 0, 843,
    846, 3, 132, 66, 0, 844, 846, 3, 142, 71, 0, 845, 840, 1, 0, 0, 0, 845, 841, 1, 0, 0, 0, 845,
    842, 1, 0, 0, 0, 845, 843, 1, 0, 0, 0, 845, 844, 1, 0, 0, 0, 846, 107, 1, 0, 0, 0, 847, 854, 3,
    110, 55, 0, 848, 854, 3, 112, 56, 0, 849, 854, 3, 114, 57, 0, 850, 854, 3, 116, 58, 0, 851, 854,
    3, 166, 83, 0, 852, 854, 3, 118, 59, 0, 853, 847, 1, 0, 0, 0, 853, 848, 1, 0, 0, 0, 853, 849, 1,
    0, 0, 0, 853, 850, 1, 0, 0, 0, 853, 851, 1, 0, 0, 0, 853, 852, 1, 0, 0, 0, 854, 109, 1, 0, 0, 0,
    855, 856, 7, 0, 0, 0, 856, 111, 1, 0, 0, 0, 857, 861, 5, 100, 0, 0, 858, 861, 5, 98, 0, 0, 859,
    861, 5, 99, 0, 0, 860, 857, 1, 0, 0, 0, 860, 858, 1, 0, 0, 0, 860, 859, 1, 0, 0, 0, 861, 113, 1,
    0, 0, 0, 862, 863, 5, 101, 0, 0, 863, 115, 1, 0, 0, 0, 864, 865, 7, 1, 0, 0, 865, 117, 1, 0, 0,
    0, 866, 867, 3, 88, 44, 0, 867, 868, 5, 81, 0, 0, 868, 869, 3, 80, 40, 0, 869, 119, 1, 0, 0, 0,
    870, 871, 5, 77, 0, 0, 871, 872, 3, 122, 61, 0, 872, 873, 5, 78, 0, 0, 873, 121, 1, 0, 0, 0,
    874, 875, 6, 61, -1, 0, 875, 880, 3, 154, 77, 0, 876, 880, 3, 132, 66, 0, 877, 880, 3, 124, 62,
    0, 878, 880, 3, 138, 69, 0, 879, 874, 1, 0, 0, 0, 879, 876, 1, 0, 0, 0, 879, 877, 1, 0, 0, 0,
    879, 878, 1, 0, 0, 0, 880, 896, 1, 0, 0, 0, 881, 882, 10, 1, 0, 0, 882, 883, 5, 6, 0, 0, 883,
    888, 3, 122, 61, 0, 884, 885, 5, 2, 0, 0, 885, 887, 3, 122, 61, 0, 886, 884, 1, 0, 0, 0, 887,
    890, 1, 0, 0, 0, 888, 886, 1, 0, 0, 0, 888, 889, 1, 0, 0, 0, 889, 891, 1, 0, 0, 0, 890, 888, 1,
    0, 0, 0, 891, 892, 5, 3, 0, 0, 892, 893, 3, 122, 61, 2, 893, 895, 1, 0, 0, 0, 894, 881, 1, 0, 0,
    0, 895, 898, 1, 0, 0, 0, 896, 894, 1, 0, 0, 0, 896, 897, 1, 0, 0, 0, 897, 123, 1, 0, 0, 0, 898,
    896, 1, 0, 0, 0, 899, 900, 6, 62, -1, 0, 900, 909, 3, 128, 64, 0, 901, 909, 3, 130, 65, 0, 902,
    909, 3, 108, 54, 0, 903, 909, 3, 140, 70, 0, 904, 909, 3, 144, 72, 0, 905, 909, 3, 142, 71, 0,
    906, 909, 3, 80, 40, 0, 907, 909, 3, 150, 75, 0, 908, 899, 1, 0, 0, 0, 908, 901, 1, 0, 0, 0,
    908, 902, 1, 0, 0, 0, 908, 903, 1, 0, 0, 0, 908, 904, 1, 0, 0, 0, 908, 905, 1, 0, 0, 0, 908,
    906, 1, 0, 0, 0, 908, 907, 1, 0, 0, 0, 909, 917, 1, 0, 0, 0, 910, 911, 10, 2, 0, 0, 911, 916, 3,
    120, 60, 0, 912, 913, 10, 1, 0, 0, 913, 914, 5, 81, 0, 0, 914, 916, 3, 126, 63, 0, 915, 910, 1,
    0, 0, 0, 915, 912, 1, 0, 0, 0, 916, 919, 1, 0, 0, 0, 917, 915, 1, 0, 0, 0, 917, 918, 1, 0, 0, 0,
    918, 125, 1, 0, 0, 0, 919, 917, 1, 0, 0, 0, 920, 923, 3, 80, 40, 0, 921, 923, 3, 150, 75, 0,
    922, 920, 1, 0, 0, 0, 922, 921, 1, 0, 0, 0, 923, 127, 1, 0, 0, 0, 924, 925, 5, 73, 0, 0, 925,
    129, 1, 0, 0, 0, 926, 927, 5, 79, 0, 0, 927, 928, 3, 122, 61, 0, 928, 929, 5, 80, 0, 0, 929,
    131, 1, 0, 0, 0, 930, 933, 3, 134, 67, 0, 931, 933, 3, 136, 68, 0, 932, 930, 1, 0, 0, 0, 932,
    931, 1, 0, 0, 0, 933, 133, 1, 0, 0, 0, 934, 935, 5, 85, 0, 0, 935, 936, 3, 124, 62, 0, 936, 135,
    1, 0, 0, 0, 937, 938, 5, 65, 0, 0, 938, 939, 3, 124, 62, 0, 939, 137, 1, 0, 0, 0, 940, 941, 3,
    124, 62, 0, 941, 942, 3, 152, 76, 0, 942, 943, 3, 122, 61, 0, 943, 139, 1, 0, 0, 0, 944, 945, 5,
    77, 0, 0, 945, 946, 3, 100, 50, 0, 946, 947, 5, 78, 0, 0, 947, 141, 1, 0, 0, 0, 948, 949, 5, 79,
    0, 0, 949, 950, 3, 100, 50, 0, 950, 951, 5, 80, 0, 0, 951, 143, 1, 0, 0, 0, 952, 953, 5, 75, 0,
    0, 953, 954, 3, 146, 73, 0, 954, 955, 5, 76, 0, 0, 955, 145, 1, 0, 0, 0, 956, 961, 3, 148, 74,
    0, 957, 958, 5, 82, 0, 0, 958, 960, 3, 148, 74, 0, 959, 957, 1, 0, 0, 0, 960, 963, 1, 0, 0, 0,
    961, 959, 1, 0, 0, 0, 961, 962, 1, 0, 0, 0, 962, 147, 1, 0, 0, 0, 963, 961, 1, 0, 0, 0, 964,
    965, 3, 122, 61, 0, 965, 966, 5, 83, 0, 0, 966, 967, 3, 122, 61, 0, 967, 149, 1, 0, 0, 0, 968,
    969, 3, 84, 42, 0, 969, 971, 5, 79, 0, 0, 970, 972, 3, 92, 46, 0, 971, 970, 1, 0, 0, 0, 971,
    972, 1, 0, 0, 0, 972, 973, 1, 0, 0, 0, 973, 974, 5, 80, 0, 0, 974, 151, 1, 0, 0, 0, 975, 976, 7,
    2, 0, 0, 976, 153, 1, 0, 0, 0, 977, 978, 3, 102, 51, 0, 978, 980, 5, 79, 0, 0, 979, 981, 3, 92,
    46, 0, 980, 979, 1, 0, 0, 0, 980, 981, 1, 0, 0, 0, 981, 982, 1, 0, 0, 0, 982, 983, 5, 80, 0, 0,
    983, 155, 1, 0, 0, 0, 984, 985, 3, 78, 39, 0, 985, 986, 5, 83, 0, 0, 986, 987, 3, 102, 51, 0,
    987, 157, 1, 0, 0, 0, 988, 989, 3, 88, 44, 0, 989, 990, 5, 77, 0, 0, 990, 995, 3, 102, 51, 0,
    991, 992, 5, 82, 0, 0, 992, 994, 3, 102, 51, 0, 993, 991, 1, 0, 0, 0, 994, 997, 1, 0, 0, 0, 995,
    993, 1, 0, 0, 0, 995, 996, 1, 0, 0, 0, 996, 998, 1, 0, 0, 0, 997, 995, 1, 0, 0, 0, 998, 999, 5,
    78, 0, 0, 999, 159, 1, 0, 0, 0, 1000, 1001, 5, 60, 0, 0, 1001, 1002, 5, 77, 0, 0, 1002, 1003, 5,
    77, 0, 0, 1003, 1008, 3, 102, 51, 0, 1004, 1005, 5, 82, 0, 0, 1005, 1007, 3, 102, 51, 0, 1006,
    1004, 1, 0, 0, 0, 1007, 1010, 1, 0, 0, 0, 1008, 1006, 1, 0, 0, 0, 1008, 1009, 1, 0, 0, 0, 1009,
    1011, 1, 0, 0, 0, 1010, 1008, 1, 0, 0, 0, 1011, 1012, 5, 78, 0, 0, 1012, 1013, 5, 82, 0, 0,
    1013, 1014, 3, 102, 51, 0, 1014, 1015, 5, 78, 0, 0, 1015, 161, 1, 0, 0, 0, 1016, 1017, 5, 54, 0,
    0, 1017, 1018, 5, 77, 0, 0, 1018, 1021, 3, 102, 51, 0, 1019, 1020, 5, 82, 0, 0, 1020, 1022, 3,
    102, 51, 0, 1021, 1019, 1, 0, 0, 0, 1022, 1023, 1, 0, 0, 0, 1023, 1021, 1, 0, 0, 0, 1023, 1024,
    1, 0, 0, 0, 1024, 1025, 1, 0, 0, 0, 1025, 1026, 5, 78, 0, 0, 1026, 163, 1, 0, 0, 0, 1027, 1028,
    5, 9, 0, 0, 1028, 1029, 3, 96, 48, 0, 1029, 1030, 5, 83, 0, 0, 1030, 1031, 3, 122, 61, 0, 1031,
    165, 1, 0, 0, 0, 1032, 1033, 5, 103, 0, 0, 1033, 167, 1, 0, 0, 0, 117, 169, 174, 180, 194, 197,
    211, 218, 224, 231, 237, 245, 257, 266, 269, 275, 282, 288, 295, 301, 306, 315, 323, 331, 335,
    342, 352, 355, 363, 367, 373, 385, 401, 404, 410, 415, 421, 426, 432, 439, 443, 451, 455, 461,
    467, 471, 475, 481, 485, 491, 497, 504, 512, 518, 525, 529, 534, 539, 546, 554, 558, 566, 572,
    576, 584, 590, 593, 604, 611, 616, 623, 628, 634, 641, 647, 654, 660, 665, 671, 678, 684, 692,
    698, 705, 711, 718, 726, 735, 740, 748, 757, 770, 776, 789, 795, 802, 807, 814, 822, 829, 836,
    845, 853, 860, 879, 888, 896, 908, 915, 917, 922, 932, 961, 971, 980, 995, 1008, 1023,
  ];

  private static __ATN: antlr.ATN;
  public static get _ATN(): antlr.ATN {
    if (!PythonParser.__ATN) {
      PythonParser.__ATN = new antlr.ATNDeserializer().deserialize(PythonParser._serializedATN);
    }

    return PythonParser.__ATN;
  }

  private static readonly vocabulary = new antlr.Vocabulary(
    PythonParser.literalNames,
    PythonParser.symbolicNames,
    [],
  );

  public override get vocabulary(): antlr.Vocabulary {
    return PythonParser.vocabulary;
  }

  private static readonly decisionsToDFA = PythonParser._ATN.decisionToState.map(
    (ds: antlr.DecisionState, index: number) => new antlr.DFA(ds, index),
  );
}

export class FileContext extends antlr.ParserRuleContext {
  public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
    super(parent, invokingState);
  }
  public EOF(): antlr.TerminalNode {
    return this.getToken(PythonParser.EOF, 0)!;
  }
  public comment(): CommentContext | null {
    return this.getRuleContext(0, CommentContext);
  }
  public global(): GlobalContext[];
  public global(i: number): GlobalContext | null;
  public global(i?: number): GlobalContext[] | GlobalContext | null {
    if (i === undefined) {
      return this.getRuleContexts(GlobalContext);
    }

    return this.getRuleContext(i, GlobalContext);
  }
  public NL(): antlr.TerminalNode[];
  public NL(i: number): antlr.TerminalNode | null;
  public NL(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    if (i === undefined) {
      return this.getTokens(PythonParser.NL);
    } else {
      return this.getToken(PythonParser.NL, i);
    }
  }
  public override get ruleIndex(): number {
    return PythonParser.RULE_file;
  }
  public override enterRule(listener: PythonListener): void {
    if (listener.enterFile) {
      listener.enterFile(this);
    }
  }
  public override exitRule(listener: PythonListener): void {
    if (listener.exitFile) {
      listener.exitFile(this);
    }
  }
  public override accept<Result>(visitor: PythonVisitor<Result>): Result | null {
    if (visitor.visitFile) {
      return visitor.visitFile(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class GlobalContext extends antlr.ParserRuleContext {
  public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
    super(parent, invokingState);
  }
  public main(): MainContext | null {
    return this.getRuleContext(0, MainContext);
  }
  public function(): FunctionContext | null {
    return this.getRuleContext(0, FunctionContext);
  }
  public test(): TestContext | null {
    return this.getRuleContext(0, TestContext);
  }
  public procedure(): ProcedureContext | null {
    return this.getRuleContext(0, ProcedureContext);
  }
  public constant(): ConstantContext | null {
    return this.getRuleContext(0, ConstantContext);
  }
  public enum(): EnumContext | null {
    return this.getRuleContext(0, EnumContext);
  }
  public concreteClass(): ConcreteClassContext | null {
    return this.getRuleContext(0, ConcreteClassContext);
  }
  public abstractClass(): AbstractClassContext | null {
    return this.getRuleContext(0, AbstractClassContext);
  }
  public comment(): CommentContext | null {
    return this.getRuleContext(0, CommentContext);
  }
  public override get ruleIndex(): number {
    return PythonParser.RULE_global;
  }
  public override enterRule(listener: PythonListener): void {
    if (listener.enterGlobal) {
      listener.enterGlobal(this);
    }
  }
  public override exitRule(listener: PythonListener): void {
    if (listener.exitGlobal) {
      listener.exitGlobal(this);
    }
  }
  public override accept<Result>(visitor: PythonVisitor<Result>): Result | null {
    if (visitor.visitGlobal) {
      return visitor.visitGlobal(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class MainContext extends antlr.ParserRuleContext {
  public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
    super(parent, invokingState);
  }
  public DEF(): antlr.TerminalNode {
    return this.getToken(PythonParser.DEF, 0)!;
  }
  public MAIN(): antlr.TerminalNode {
    return this.getToken(PythonParser.MAIN, 0)!;
  }
  public OPEN_BRACKET(): antlr.TerminalNode {
    return this.getToken(PythonParser.OPEN_BRACKET, 0)!;
  }
  public CLOSE_BRACKET(): antlr.TerminalNode[];
  public CLOSE_BRACKET(i: number): antlr.TerminalNode | null;
  public CLOSE_BRACKET(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    if (i === undefined) {
      return this.getTokens(PythonParser.CLOSE_BRACKET);
    } else {
      return this.getToken(PythonParser.CLOSE_BRACKET, i);
    }
  }
  public ARROW(): antlr.TerminalNode {
    return this.getToken(PythonParser.ARROW, 0)!;
  }
  public NONE(): antlr.TerminalNode {
    return this.getToken(PythonParser.NONE, 0)!;
  }
  public COLON(): antlr.TerminalNode {
    return this.getToken(PythonParser.COLON, 0)!;
  }
  public NL(): antlr.TerminalNode[];
  public NL(i: number): antlr.TerminalNode | null;
  public NL(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    if (i === undefined) {
      return this.getTokens(PythonParser.NL);
    } else {
      return this.getToken(PythonParser.NL, i);
    }
  }
  public END_MAIN(): antlr.TerminalNode {
    return this.getToken(PythonParser.END_MAIN, 0)!;
  }
  public GHOSTED(): antlr.TerminalNode | null {
    return this.getToken(PythonParser.GHOSTED, 0);
  }
  public ordinaryStatement(): OrdinaryStatementContext[];
  public ordinaryStatement(i: number): OrdinaryStatementContext | null;
  public ordinaryStatement(
    i?: number,
  ): OrdinaryStatementContext[] | OrdinaryStatementContext | null {
    if (i === undefined) {
      return this.getRuleContexts(OrdinaryStatementContext);
    }

    return this.getRuleContext(i, OrdinaryStatementContext);
  }
  public override get ruleIndex(): number {
    return PythonParser.RULE_main;
  }
  public override enterRule(listener: PythonListener): void {
    if (listener.enterMain) {
      listener.enterMain(this);
    }
  }
  public override exitRule(listener: PythonListener): void {
    if (listener.exitMain) {
      listener.exitMain(this);
    }
  }
  public override accept<Result>(visitor: PythonVisitor<Result>): Result | null {
    if (visitor.visitMain) {
      return visitor.visitMain(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class FunctionContext extends antlr.ParserRuleContext {
  public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
    super(parent, invokingState);
  }
  public DEF(): antlr.TerminalNode {
    return this.getToken(PythonParser.DEF, 0)!;
  }
  public methodName(): MethodNameContext {
    return this.getRuleContext(0, MethodNameContext)!;
  }
  public OPEN_BRACKET(): antlr.TerminalNode {
    return this.getToken(PythonParser.OPEN_BRACKET, 0)!;
  }
  public CLOSE_BRACKET(): antlr.TerminalNode {
    return this.getToken(PythonParser.CLOSE_BRACKET, 0)!;
  }
  public ARROW(): antlr.TerminalNode {
    return this.getToken(PythonParser.ARROW, 0)!;
  }
  public type(): TypeContext {
    return this.getRuleContext(0, TypeContext)!;
  }
  public COLON(): antlr.TerminalNode {
    return this.getToken(PythonParser.COLON, 0)!;
  }
  public NL(): antlr.TerminalNode[];
  public NL(i: number): antlr.TerminalNode | null;
  public NL(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    if (i === undefined) {
      return this.getTokens(PythonParser.NL);
    } else {
      return this.getToken(PythonParser.NL, i);
    }
  }
  public returnStatement(): ReturnStatementContext {
    return this.getRuleContext(0, ReturnStatementContext)!;
  }
  public END_FUNCTION(): antlr.TerminalNode {
    return this.getToken(PythonParser.END_FUNCTION, 0)!;
  }
  public GHOSTED(): antlr.TerminalNode | null {
    return this.getToken(PythonParser.GHOSTED, 0);
  }
  public paramList(): ParamListContext | null {
    return this.getRuleContext(0, ParamListContext);
  }
  public commentText(): CommentTextContext | null {
    return this.getRuleContext(0, CommentTextContext);
  }
  public ordinaryStatement(): OrdinaryStatementContext[];
  public ordinaryStatement(i: number): OrdinaryStatementContext | null;
  public ordinaryStatement(
    i?: number,
  ): OrdinaryStatementContext[] | OrdinaryStatementContext | null {
    if (i === undefined) {
      return this.getRuleContexts(OrdinaryStatementContext);
    }

    return this.getRuleContext(i, OrdinaryStatementContext);
  }
  public override get ruleIndex(): number {
    return PythonParser.RULE_function;
  }
  public override enterRule(listener: PythonListener): void {
    if (listener.enterFunction) {
      listener.enterFunction(this);
    }
  }
  public override exitRule(listener: PythonListener): void {
    if (listener.exitFunction) {
      listener.exitFunction(this);
    }
  }
  public override accept<Result>(visitor: PythonVisitor<Result>): Result | null {
    if (visitor.visitFunction) {
      return visitor.visitFunction(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class TestContext extends antlr.ParserRuleContext {
  public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
    super(parent, invokingState);
  }
  public CLASS(): antlr.TerminalNode {
    return this.getToken(PythonParser.CLASS, 0)!;
  }
  public testName(): TestNameContext {
    return this.getRuleContext(0, TestNameContext)!;
  }
  public OPEN_BRACKET(): antlr.TerminalNode {
    return this.getToken(PythonParser.OPEN_BRACKET, 0)!;
  }
  public TESTCASE(): antlr.TerminalNode {
    return this.getToken(PythonParser.TESTCASE, 0)!;
  }
  public CLOSE_BRACKET(): antlr.TerminalNode {
    return this.getToken(PythonParser.CLOSE_BRACKET, 0)!;
  }
  public COMMENT(): antlr.TerminalNode {
    return this.getToken(PythonParser.COMMENT, 0)!;
  }
  public NL(): antlr.TerminalNode[];
  public NL(i: number): antlr.TerminalNode | null;
  public NL(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    if (i === undefined) {
      return this.getTokens(PythonParser.NL);
    } else {
      return this.getToken(PythonParser.NL, i);
    }
  }
  public END_TEST(): antlr.TerminalNode {
    return this.getToken(PythonParser.END_TEST, 0)!;
  }
  public GHOSTED(): antlr.TerminalNode | null {
    return this.getToken(PythonParser.GHOSTED, 0);
  }
  public testStatement(): TestStatementContext[];
  public testStatement(i: number): TestStatementContext | null;
  public testStatement(i?: number): TestStatementContext[] | TestStatementContext | null {
    if (i === undefined) {
      return this.getRuleContexts(TestStatementContext);
    }

    return this.getRuleContext(i, TestStatementContext);
  }
  public override get ruleIndex(): number {
    return PythonParser.RULE_test;
  }
  public override enterRule(listener: PythonListener): void {
    if (listener.enterTest) {
      listener.enterTest(this);
    }
  }
  public override exitRule(listener: PythonListener): void {
    if (listener.exitTest) {
      listener.exitTest(this);
    }
  }
  public override accept<Result>(visitor: PythonVisitor<Result>): Result | null {
    if (visitor.visitTest) {
      return visitor.visitTest(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class TestStatementContext extends antlr.ParserRuleContext {
  public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
    super(parent, invokingState);
  }
  public assert(): AssertContext | null {
    return this.getRuleContext(0, AssertContext);
  }
  public variableDefinition(): VariableDefinitionContext | null {
    return this.getRuleContext(0, VariableDefinitionContext);
  }
  public comment(): CommentContext | null {
    return this.getRuleContext(0, CommentContext);
  }
  public override get ruleIndex(): number {
    return PythonParser.RULE_testStatement;
  }
  public override enterRule(listener: PythonListener): void {
    if (listener.enterTestStatement) {
      listener.enterTestStatement(this);
    }
  }
  public override exitRule(listener: PythonListener): void {
    if (listener.exitTestStatement) {
      listener.exitTestStatement(this);
    }
  }
  public override accept<Result>(visitor: PythonVisitor<Result>): Result | null {
    if (visitor.visitTestStatement) {
      return visitor.visitTestStatement(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class ProcedureContext extends antlr.ParserRuleContext {
  public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
    super(parent, invokingState);
  }
  public DEF(): antlr.TerminalNode {
    return this.getToken(PythonParser.DEF, 0)!;
  }
  public methodName(): MethodNameContext {
    return this.getRuleContext(0, MethodNameContext)!;
  }
  public OPEN_BRACKET(): antlr.TerminalNode {
    return this.getToken(PythonParser.OPEN_BRACKET, 0)!;
  }
  public CLOSE_BRACKET(): antlr.TerminalNode {
    return this.getToken(PythonParser.CLOSE_BRACKET, 0)!;
  }
  public ARROW(): antlr.TerminalNode {
    return this.getToken(PythonParser.ARROW, 0)!;
  }
  public NONE(): antlr.TerminalNode {
    return this.getToken(PythonParser.NONE, 0)!;
  }
  public COLON(): antlr.TerminalNode {
    return this.getToken(PythonParser.COLON, 0)!;
  }
  public NL(): antlr.TerminalNode[];
  public NL(i: number): antlr.TerminalNode | null;
  public NL(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    if (i === undefined) {
      return this.getTokens(PythonParser.NL);
    } else {
      return this.getToken(PythonParser.NL, i);
    }
  }
  public END_PROCEDURE(): antlr.TerminalNode {
    return this.getToken(PythonParser.END_PROCEDURE, 0)!;
  }
  public GHOSTED(): antlr.TerminalNode | null {
    return this.getToken(PythonParser.GHOSTED, 0);
  }
  public paramList(): ParamListContext | null {
    return this.getRuleContext(0, ParamListContext);
  }
  public commentText(): CommentTextContext | null {
    return this.getRuleContext(0, CommentTextContext);
  }
  public ordinaryStatement(): OrdinaryStatementContext[];
  public ordinaryStatement(i: number): OrdinaryStatementContext | null;
  public ordinaryStatement(
    i?: number,
  ): OrdinaryStatementContext[] | OrdinaryStatementContext | null {
    if (i === undefined) {
      return this.getRuleContexts(OrdinaryStatementContext);
    }

    return this.getRuleContext(i, OrdinaryStatementContext);
  }
  public override get ruleIndex(): number {
    return PythonParser.RULE_procedure;
  }
  public override enterRule(listener: PythonListener): void {
    if (listener.enterProcedure) {
      listener.enterProcedure(this);
    }
  }
  public override exitRule(listener: PythonListener): void {
    if (listener.exitProcedure) {
      listener.exitProcedure(this);
    }
  }
  public override accept<Result>(visitor: PythonVisitor<Result>): Result | null {
    if (visitor.visitProcedure) {
      return visitor.visitProcedure(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class ConstantContext extends antlr.ParserRuleContext {
  public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
    super(parent, invokingState);
  }
  public identifierDef(): IdentifierDefContext {
    return this.getRuleContext(0, IdentifierDefContext)!;
  }
  public EQUAL(): antlr.TerminalNode {
    return this.getToken(PythonParser.EQUAL, 0)!;
  }
  public constantValue(): ConstantValueContext {
    return this.getRuleContext(0, ConstantValueContext)!;
  }
  public NL(): antlr.TerminalNode {
    return this.getToken(PythonParser.NL, 0)!;
  }
  public GHOSTED(): antlr.TerminalNode | null {
    return this.getToken(PythonParser.GHOSTED, 0);
  }
  public commentText(): CommentTextContext | null {
    return this.getRuleContext(0, CommentTextContext);
  }
  public override get ruleIndex(): number {
    return PythonParser.RULE_constant;
  }
  public override enterRule(listener: PythonListener): void {
    if (listener.enterConstant) {
      listener.enterConstant(this);
    }
  }
  public override exitRule(listener: PythonListener): void {
    if (listener.exitConstant) {
      listener.exitConstant(this);
    }
  }
  public override accept<Result>(visitor: PythonVisitor<Result>): Result | null {
    if (visitor.visitConstant) {
      return visitor.visitConstant(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class EnumContext extends antlr.ParserRuleContext {
  public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
    super(parent, invokingState);
  }
  public CLASS(): antlr.TerminalNode {
    return this.getToken(PythonParser.CLASS, 0)!;
  }
  public typeName(): TypeNameContext {
    return this.getRuleContext(0, TypeNameContext)!;
  }
  public OPEN_BRACKET(): antlr.TerminalNode {
    return this.getToken(PythonParser.OPEN_BRACKET, 0)!;
  }
  public ENUM(): antlr.TerminalNode {
    return this.getToken(PythonParser.ENUM, 0)!;
  }
  public CLOSE_BRACKET(): antlr.TerminalNode {
    return this.getToken(PythonParser.CLOSE_BRACKET, 0)!;
  }
  public COLON(): antlr.TerminalNode {
    return this.getToken(PythonParser.COLON, 0)!;
  }
  public NL(): antlr.TerminalNode[];
  public NL(i: number): antlr.TerminalNode | null;
  public NL(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    if (i === undefined) {
      return this.getTokens(PythonParser.NL);
    } else {
      return this.getToken(PythonParser.NL, i);
    }
  }
  public identifierList(): IdentifierListContext {
    return this.getRuleContext(0, IdentifierListContext)!;
  }
  public END_ENUM(): antlr.TerminalNode {
    return this.getToken(PythonParser.END_ENUM, 0)!;
  }
  public GHOSTED(): antlr.TerminalNode | null {
    return this.getToken(PythonParser.GHOSTED, 0);
  }
  public commentText(): CommentTextContext | null {
    return this.getRuleContext(0, CommentTextContext);
  }
  public override get ruleIndex(): number {
    return PythonParser.RULE_enum;
  }
  public override enterRule(listener: PythonListener): void {
    if (listener.enterEnum) {
      listener.enterEnum(this);
    }
  }
  public override exitRule(listener: PythonListener): void {
    if (listener.exitEnum) {
      listener.exitEnum(this);
    }
  }
  public override accept<Result>(visitor: PythonVisitor<Result>): Result | null {
    if (visitor.visitEnum) {
      return visitor.visitEnum(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class ConcreteClassContext extends antlr.ParserRuleContext {
  public _classTypeName?: TypeNameContext;
  public _inheritsTypeName?: TypeNameContext;
  public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
    super(parent, invokingState);
  }
  public CLASS(): antlr.TerminalNode {
    return this.getToken(PythonParser.CLASS, 0)!;
  }
  public COLON(): antlr.TerminalNode {
    return this.getToken(PythonParser.COLON, 0)!;
  }
  public NL(): antlr.TerminalNode[];
  public NL(i: number): antlr.TerminalNode | null;
  public NL(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    if (i === undefined) {
      return this.getTokens(PythonParser.NL);
    } else {
      return this.getToken(PythonParser.NL, i);
    }
  }
  public constructorMember(): ConstructorMemberContext {
    return this.getRuleContext(0, ConstructorMemberContext)!;
  }
  public END_CLASS(): antlr.TerminalNode {
    return this.getToken(PythonParser.END_CLASS, 0)!;
  }
  public typeName(): TypeNameContext[];
  public typeName(i: number): TypeNameContext | null;
  public typeName(i?: number): TypeNameContext[] | TypeNameContext | null {
    if (i === undefined) {
      return this.getRuleContexts(TypeNameContext);
    }

    return this.getRuleContext(i, TypeNameContext);
  }
  public GHOSTED(): antlr.TerminalNode | null {
    return this.getToken(PythonParser.GHOSTED, 0);
  }
  public OPEN_BRACKET(): antlr.TerminalNode | null {
    return this.getToken(PythonParser.OPEN_BRACKET, 0);
  }
  public CLOSE_BRACKET(): antlr.TerminalNode | null {
    return this.getToken(PythonParser.CLOSE_BRACKET, 0);
  }
  public commentText(): CommentTextContext | null {
    return this.getRuleContext(0, CommentTextContext);
  }
  public concreteClassMember(): ConcreteClassMemberContext[];
  public concreteClassMember(i: number): ConcreteClassMemberContext | null;
  public concreteClassMember(
    i?: number,
  ): ConcreteClassMemberContext[] | ConcreteClassMemberContext | null {
    if (i === undefined) {
      return this.getRuleContexts(ConcreteClassMemberContext);
    }

    return this.getRuleContext(i, ConcreteClassMemberContext);
  }
  public override get ruleIndex(): number {
    return PythonParser.RULE_concreteClass;
  }
  public override enterRule(listener: PythonListener): void {
    if (listener.enterConcreteClass) {
      listener.enterConcreteClass(this);
    }
  }
  public override exitRule(listener: PythonListener): void {
    if (listener.exitConcreteClass) {
      listener.exitConcreteClass(this);
    }
  }
  public override accept<Result>(visitor: PythonVisitor<Result>): Result | null {
    if (visitor.visitConcreteClass) {
      return visitor.visitConcreteClass(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class ConcreteClassMemberContext extends antlr.ParserRuleContext {
  public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
    super(parent, invokingState);
  }
  public property(): PropertyContext | null {
    return this.getRuleContext(0, PropertyContext);
  }
  public functionMethod(): FunctionMethodContext | null {
    return this.getRuleContext(0, FunctionMethodContext);
  }
  public procedureMethod(): ProcedureMethodContext | null {
    return this.getRuleContext(0, ProcedureMethodContext);
  }
  public comment(): CommentContext | null {
    return this.getRuleContext(0, CommentContext);
  }
  public override get ruleIndex(): number {
    return PythonParser.RULE_concreteClassMember;
  }
  public override enterRule(listener: PythonListener): void {
    if (listener.enterConcreteClassMember) {
      listener.enterConcreteClassMember(this);
    }
  }
  public override exitRule(listener: PythonListener): void {
    if (listener.exitConcreteClassMember) {
      listener.exitConcreteClassMember(this);
    }
  }
  public override accept<Result>(visitor: PythonVisitor<Result>): Result | null {
    if (visitor.visitConcreteClassMember) {
      return visitor.visitConcreteClassMember(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class AbstractClassContext extends antlr.ParserRuleContext {
  public _classTypeName?: TypeNameContext;
  public _inheritsTypeName?: TypeNameContext;
  public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
    super(parent, invokingState);
  }
  public CLASS(): antlr.TerminalNode {
    return this.getToken(PythonParser.CLASS, 0)!;
  }
  public COLON(): antlr.TerminalNode {
    return this.getToken(PythonParser.COLON, 0)!;
  }
  public NL(): antlr.TerminalNode[];
  public NL(i: number): antlr.TerminalNode | null;
  public NL(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    if (i === undefined) {
      return this.getTokens(PythonParser.NL);
    } else {
      return this.getToken(PythonParser.NL, i);
    }
  }
  public END_CLASS(): antlr.TerminalNode {
    return this.getToken(PythonParser.END_CLASS, 0)!;
  }
  public typeName(): TypeNameContext[];
  public typeName(i: number): TypeNameContext | null;
  public typeName(i?: number): TypeNameContext[] | TypeNameContext | null {
    if (i === undefined) {
      return this.getRuleContexts(TypeNameContext);
    }

    return this.getRuleContext(i, TypeNameContext);
  }
  public OPEN_BRACKET(): antlr.TerminalNode | null {
    return this.getToken(PythonParser.OPEN_BRACKET, 0);
  }
  public ABC(): antlr.TerminalNode | null {
    return this.getToken(PythonParser.ABC, 0);
  }
  public CLOSE_BRACKET(): antlr.TerminalNode | null {
    return this.getToken(PythonParser.CLOSE_BRACKET, 0);
  }
  public GHOSTED(): antlr.TerminalNode | null {
    return this.getToken(PythonParser.GHOSTED, 0);
  }
  public commentText(): CommentTextContext | null {
    return this.getRuleContext(0, CommentTextContext);
  }
  public abstractClassMember(): AbstractClassMemberContext[];
  public abstractClassMember(i: number): AbstractClassMemberContext | null;
  public abstractClassMember(
    i?: number,
  ): AbstractClassMemberContext[] | AbstractClassMemberContext | null {
    if (i === undefined) {
      return this.getRuleContexts(AbstractClassMemberContext);
    }

    return this.getRuleContext(i, AbstractClassMemberContext);
  }
  public override get ruleIndex(): number {
    return PythonParser.RULE_abstractClass;
  }
  public override enterRule(listener: PythonListener): void {
    if (listener.enterAbstractClass) {
      listener.enterAbstractClass(this);
    }
  }
  public override exitRule(listener: PythonListener): void {
    if (listener.exitAbstractClass) {
      listener.exitAbstractClass(this);
    }
  }
  public override accept<Result>(visitor: PythonVisitor<Result>): Result | null {
    if (visitor.visitAbstractClass) {
      return visitor.visitAbstractClass(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class AbstractClassMemberContext extends antlr.ParserRuleContext {
  public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
    super(parent, invokingState);
  }
  public property(): PropertyContext | null {
    return this.getRuleContext(0, PropertyContext);
  }
  public functionMethod(): FunctionMethodContext | null {
    return this.getRuleContext(0, FunctionMethodContext);
  }
  public procedureMethod(): ProcedureMethodContext | null {
    return this.getRuleContext(0, ProcedureMethodContext);
  }
  public abstractFunction(): AbstractFunctionContext | null {
    return this.getRuleContext(0, AbstractFunctionContext);
  }
  public abstractProcedure(): AbstractProcedureContext | null {
    return this.getRuleContext(0, AbstractProcedureContext);
  }
  public comment(): CommentContext | null {
    return this.getRuleContext(0, CommentContext);
  }
  public override get ruleIndex(): number {
    return PythonParser.RULE_abstractClassMember;
  }
  public override enterRule(listener: PythonListener): void {
    if (listener.enterAbstractClassMember) {
      listener.enterAbstractClassMember(this);
    }
  }
  public override exitRule(listener: PythonListener): void {
    if (listener.exitAbstractClassMember) {
      listener.exitAbstractClassMember(this);
    }
  }
  public override accept<Result>(visitor: PythonVisitor<Result>): Result | null {
    if (visitor.visitAbstractClassMember) {
      return visitor.visitAbstractClassMember(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class CommentContext extends antlr.ParserRuleContext {
  public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
    super(parent, invokingState);
  }
  public commentText(): CommentTextContext {
    return this.getRuleContext(0, CommentTextContext)!;
  }
  public NL(): antlr.TerminalNode {
    return this.getToken(PythonParser.NL, 0)!;
  }
  public override get ruleIndex(): number {
    return PythonParser.RULE_comment;
  }
  public override enterRule(listener: PythonListener): void {
    if (listener.enterComment) {
      listener.enterComment(this);
    }
  }
  public override exitRule(listener: PythonListener): void {
    if (listener.exitComment) {
      listener.exitComment(this);
    }
  }
  public override accept<Result>(visitor: PythonVisitor<Result>): Result | null {
    if (visitor.visitComment) {
      return visitor.visitComment(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class CommentTextContext extends antlr.ParserRuleContext {
  public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
    super(parent, invokingState);
  }
  public COMMENT(): antlr.TerminalNode {
    return this.getToken(PythonParser.COMMENT, 0)!;
  }
  public override get ruleIndex(): number {
    return PythonParser.RULE_commentText;
  }
  public override enterRule(listener: PythonListener): void {
    if (listener.enterCommentText) {
      listener.enterCommentText(this);
    }
  }
  public override exitRule(listener: PythonListener): void {
    if (listener.exitCommentText) {
      listener.exitCommentText(this);
    }
  }
  public override accept<Result>(visitor: PythonVisitor<Result>): Result | null {
    if (visitor.visitCommentText) {
      return visitor.visitCommentText(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class OrdinaryStatementContext extends antlr.ParserRuleContext {
  public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
    super(parent, invokingState);
  }
  public variableDefinition(): VariableDefinitionContext | null {
    return this.getRuleContext(0, VariableDefinitionContext);
  }
  public assignment(): AssignmentContext | null {
    return this.getRuleContext(0, AssignmentContext);
  }
  public ifStatement(): IfStatementContext | null {
    return this.getRuleContext(0, IfStatementContext);
  }
  public whileLoop(): WhileLoopContext | null {
    return this.getRuleContext(0, WhileLoopContext);
  }
  public forLoop(): ForLoopContext | null {
    return this.getRuleContext(0, ForLoopContext);
  }
  public procedureCall(): ProcedureCallContext | null {
    return this.getRuleContext(0, ProcedureCallContext);
  }
  public tryStatement(): TryStatementContext | null {
    return this.getRuleContext(0, TryStatementContext);
  }
  public throwStatement(): ThrowStatementContext | null {
    return this.getRuleContext(0, ThrowStatementContext);
  }
  public comment(): CommentContext | null {
    return this.getRuleContext(0, CommentContext);
  }
  public override get ruleIndex(): number {
    return PythonParser.RULE_ordinaryStatement;
  }
  public override enterRule(listener: PythonListener): void {
    if (listener.enterOrdinaryStatement) {
      listener.enterOrdinaryStatement(this);
    }
  }
  public override exitRule(listener: PythonListener): void {
    if (listener.exitOrdinaryStatement) {
      listener.exitOrdinaryStatement(this);
    }
  }
  public override accept<Result>(visitor: PythonVisitor<Result>): Result | null {
    if (visitor.visitOrdinaryStatement) {
      return visitor.visitOrdinaryStatement(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class VariableDefinitionContext extends antlr.ParserRuleContext {
  public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
    super(parent, invokingState);
  }
  public identifierDef(): IdentifierDefContext {
    return this.getRuleContext(0, IdentifierDefContext)!;
  }
  public EQUAL(): antlr.TerminalNode {
    return this.getToken(PythonParser.EQUAL, 0)!;
  }
  public expression(): ExpressionContext {
    return this.getRuleContext(0, ExpressionContext)!;
  }
  public NL(): antlr.TerminalNode {
    return this.getToken(PythonParser.NL, 0)!;
  }
  public GHOSTED(): antlr.TerminalNode | null {
    return this.getToken(PythonParser.GHOSTED, 0);
  }
  public commentText(): CommentTextContext | null {
    return this.getRuleContext(0, CommentTextContext);
  }
  public override get ruleIndex(): number {
    return PythonParser.RULE_variableDefinition;
  }
  public override enterRule(listener: PythonListener): void {
    if (listener.enterVariableDefinition) {
      listener.enterVariableDefinition(this);
    }
  }
  public override exitRule(listener: PythonListener): void {
    if (listener.exitVariableDefinition) {
      listener.exitVariableDefinition(this);
    }
  }
  public override accept<Result>(visitor: PythonVisitor<Result>): Result | null {
    if (visitor.visitVariableDefinition) {
      return visitor.visitVariableDefinition(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class AssignmentContext extends antlr.ParserRuleContext {
  public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
    super(parent, invokingState);
  }
  public assignable(): AssignableContext {
    return this.getRuleContext(0, AssignableContext)!;
  }
  public EQUAL(): antlr.TerminalNode {
    return this.getToken(PythonParser.EQUAL, 0)!;
  }
  public expression(): ExpressionContext {
    return this.getRuleContext(0, ExpressionContext)!;
  }
  public NL(): antlr.TerminalNode {
    return this.getToken(PythonParser.NL, 0)!;
  }
  public GHOSTED(): antlr.TerminalNode | null {
    return this.getToken(PythonParser.GHOSTED, 0);
  }
  public commentText(): CommentTextContext | null {
    return this.getRuleContext(0, CommentTextContext);
  }
  public override get ruleIndex(): number {
    return PythonParser.RULE_assignment;
  }
  public override enterRule(listener: PythonListener): void {
    if (listener.enterAssignment) {
      listener.enterAssignment(this);
    }
  }
  public override exitRule(listener: PythonListener): void {
    if (listener.exitAssignment) {
      listener.exitAssignment(this);
    }
  }
  public override accept<Result>(visitor: PythonVisitor<Result>): Result | null {
    if (visitor.visitAssignment) {
      return visitor.visitAssignment(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class IfStatementContext extends antlr.ParserRuleContext {
  public _condition?: ExpressionContext;
  public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
    super(parent, invokingState);
  }
  public IF(): antlr.TerminalNode {
    return this.getToken(PythonParser.IF, 0)!;
  }
  public THEN(): antlr.TerminalNode {
    return this.getToken(PythonParser.THEN, 0)!;
  }
  public NL(): antlr.TerminalNode[];
  public NL(i: number): antlr.TerminalNode | null;
  public NL(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    if (i === undefined) {
      return this.getTokens(PythonParser.NL);
    } else {
      return this.getToken(PythonParser.NL, i);
    }
  }
  public thenClause(): ThenClauseContext {
    return this.getRuleContext(0, ThenClauseContext)!;
  }
  public END_IF(): antlr.TerminalNode {
    return this.getToken(PythonParser.END_IF, 0)!;
  }
  public expression(): ExpressionContext {
    return this.getRuleContext(0, ExpressionContext)!;
  }
  public GHOSTED(): antlr.TerminalNode | null {
    return this.getToken(PythonParser.GHOSTED, 0);
  }
  public commentText(): CommentTextContext | null {
    return this.getRuleContext(0, CommentTextContext);
  }
  public elseIfClause(): ElseIfClauseContext[];
  public elseIfClause(i: number): ElseIfClauseContext | null;
  public elseIfClause(i?: number): ElseIfClauseContext[] | ElseIfClauseContext | null {
    if (i === undefined) {
      return this.getRuleContexts(ElseIfClauseContext);
    }

    return this.getRuleContext(i, ElseIfClauseContext);
  }
  public elseClause(): ElseClauseContext | null {
    return this.getRuleContext(0, ElseClauseContext);
  }
  public override get ruleIndex(): number {
    return PythonParser.RULE_ifStatement;
  }
  public override enterRule(listener: PythonListener): void {
    if (listener.enterIfStatement) {
      listener.enterIfStatement(this);
    }
  }
  public override exitRule(listener: PythonListener): void {
    if (listener.exitIfStatement) {
      listener.exitIfStatement(this);
    }
  }
  public override accept<Result>(visitor: PythonVisitor<Result>): Result | null {
    if (visitor.visitIfStatement) {
      return visitor.visitIfStatement(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class ThenClauseContext extends antlr.ParserRuleContext {
  public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
    super(parent, invokingState);
  }
  public ordinaryStatement(): OrdinaryStatementContext[];
  public ordinaryStatement(i: number): OrdinaryStatementContext | null;
  public ordinaryStatement(
    i?: number,
  ): OrdinaryStatementContext[] | OrdinaryStatementContext | null {
    if (i === undefined) {
      return this.getRuleContexts(OrdinaryStatementContext);
    }

    return this.getRuleContext(i, OrdinaryStatementContext);
  }
  public override get ruleIndex(): number {
    return PythonParser.RULE_thenClause;
  }
  public override enterRule(listener: PythonListener): void {
    if (listener.enterThenClause) {
      listener.enterThenClause(this);
    }
  }
  public override exitRule(listener: PythonListener): void {
    if (listener.exitThenClause) {
      listener.exitThenClause(this);
    }
  }
  public override accept<Result>(visitor: PythonVisitor<Result>): Result | null {
    if (visitor.visitThenClause) {
      return visitor.visitThenClause(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class ElseIfClauseContext extends antlr.ParserRuleContext {
  public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
    super(parent, invokingState);
  }
  public ELIF(): antlr.TerminalNode {
    return this.getToken(PythonParser.ELIF, 0)!;
  }
  public expression(): ExpressionContext {
    return this.getRuleContext(0, ExpressionContext)!;
  }
  public THEN(): antlr.TerminalNode {
    return this.getToken(PythonParser.THEN, 0)!;
  }
  public NL(): antlr.TerminalNode {
    return this.getToken(PythonParser.NL, 0)!;
  }
  public GHOSTED(): antlr.TerminalNode | null {
    return this.getToken(PythonParser.GHOSTED, 0);
  }
  public commentText(): CommentTextContext | null {
    return this.getRuleContext(0, CommentTextContext);
  }
  public ordinaryStatement(): OrdinaryStatementContext[];
  public ordinaryStatement(i: number): OrdinaryStatementContext | null;
  public ordinaryStatement(
    i?: number,
  ): OrdinaryStatementContext[] | OrdinaryStatementContext | null {
    if (i === undefined) {
      return this.getRuleContexts(OrdinaryStatementContext);
    }

    return this.getRuleContext(i, OrdinaryStatementContext);
  }
  public override get ruleIndex(): number {
    return PythonParser.RULE_elseIfClause;
  }
  public override enterRule(listener: PythonListener): void {
    if (listener.enterElseIfClause) {
      listener.enterElseIfClause(this);
    }
  }
  public override exitRule(listener: PythonListener): void {
    if (listener.exitElseIfClause) {
      listener.exitElseIfClause(this);
    }
  }
  public override accept<Result>(visitor: PythonVisitor<Result>): Result | null {
    if (visitor.visitElseIfClause) {
      return visitor.visitElseIfClause(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class ElseClauseContext extends antlr.ParserRuleContext {
  public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
    super(parent, invokingState);
  }
  public ELSE(): antlr.TerminalNode {
    return this.getToken(PythonParser.ELSE, 0)!;
  }
  public NL(): antlr.TerminalNode {
    return this.getToken(PythonParser.NL, 0)!;
  }
  public GHOSTED(): antlr.TerminalNode | null {
    return this.getToken(PythonParser.GHOSTED, 0);
  }
  public commentText(): CommentTextContext | null {
    return this.getRuleContext(0, CommentTextContext);
  }
  public ordinaryStatement(): OrdinaryStatementContext[];
  public ordinaryStatement(i: number): OrdinaryStatementContext | null;
  public ordinaryStatement(
    i?: number,
  ): OrdinaryStatementContext[] | OrdinaryStatementContext | null {
    if (i === undefined) {
      return this.getRuleContexts(OrdinaryStatementContext);
    }

    return this.getRuleContext(i, OrdinaryStatementContext);
  }
  public override get ruleIndex(): number {
    return PythonParser.RULE_elseClause;
  }
  public override enterRule(listener: PythonListener): void {
    if (listener.enterElseClause) {
      listener.enterElseClause(this);
    }
  }
  public override exitRule(listener: PythonListener): void {
    if (listener.exitElseClause) {
      listener.exitElseClause(this);
    }
  }
  public override accept<Result>(visitor: PythonVisitor<Result>): Result | null {
    if (visitor.visitElseClause) {
      return visitor.visitElseClause(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class WhileLoopContext extends antlr.ParserRuleContext {
  public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
    super(parent, invokingState);
  }
  public WHILE(): antlr.TerminalNode {
    return this.getToken(PythonParser.WHILE, 0)!;
  }
  public expression(): ExpressionContext {
    return this.getRuleContext(0, ExpressionContext)!;
  }
  public COLON(): antlr.TerminalNode {
    return this.getToken(PythonParser.COLON, 0)!;
  }
  public NL(): antlr.TerminalNode[];
  public NL(i: number): antlr.TerminalNode | null;
  public NL(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    if (i === undefined) {
      return this.getTokens(PythonParser.NL);
    } else {
      return this.getToken(PythonParser.NL, i);
    }
  }
  public END_WHILE(): antlr.TerminalNode {
    return this.getToken(PythonParser.END_WHILE, 0)!;
  }
  public GHOSTED(): antlr.TerminalNode | null {
    return this.getToken(PythonParser.GHOSTED, 0);
  }
  public commentText(): CommentTextContext | null {
    return this.getRuleContext(0, CommentTextContext);
  }
  public ordinaryStatement(): OrdinaryStatementContext[];
  public ordinaryStatement(i: number): OrdinaryStatementContext | null;
  public ordinaryStatement(
    i?: number,
  ): OrdinaryStatementContext[] | OrdinaryStatementContext | null {
    if (i === undefined) {
      return this.getRuleContexts(OrdinaryStatementContext);
    }

    return this.getRuleContext(i, OrdinaryStatementContext);
  }
  public override get ruleIndex(): number {
    return PythonParser.RULE_whileLoop;
  }
  public override enterRule(listener: PythonListener): void {
    if (listener.enterWhileLoop) {
      listener.enterWhileLoop(this);
    }
  }
  public override exitRule(listener: PythonListener): void {
    if (listener.exitWhileLoop) {
      listener.exitWhileLoop(this);
    }
  }
  public override accept<Result>(visitor: PythonVisitor<Result>): Result | null {
    if (visitor.visitWhileLoop) {
      return visitor.visitWhileLoop(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class ForLoopContext extends antlr.ParserRuleContext {
  public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
    super(parent, invokingState);
  }
  public FOR(): antlr.TerminalNode {
    return this.getToken(PythonParser.FOR, 0)!;
  }
  public identifierDef(): IdentifierDefContext {
    return this.getRuleContext(0, IdentifierDefContext)!;
  }
  public IN(): antlr.TerminalNode {
    return this.getToken(PythonParser.IN, 0)!;
  }
  public expression(): ExpressionContext {
    return this.getRuleContext(0, ExpressionContext)!;
  }
  public COLON(): antlr.TerminalNode {
    return this.getToken(PythonParser.COLON, 0)!;
  }
  public NL(): antlr.TerminalNode[];
  public NL(i: number): antlr.TerminalNode | null;
  public NL(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    if (i === undefined) {
      return this.getTokens(PythonParser.NL);
    } else {
      return this.getToken(PythonParser.NL, i);
    }
  }
  public END_FOR(): antlr.TerminalNode {
    return this.getToken(PythonParser.END_FOR, 0)!;
  }
  public GHOSTED(): antlr.TerminalNode | null {
    return this.getToken(PythonParser.GHOSTED, 0);
  }
  public commentText(): CommentTextContext | null {
    return this.getRuleContext(0, CommentTextContext);
  }
  public ordinaryStatement(): OrdinaryStatementContext[];
  public ordinaryStatement(i: number): OrdinaryStatementContext | null;
  public ordinaryStatement(
    i?: number,
  ): OrdinaryStatementContext[] | OrdinaryStatementContext | null {
    if (i === undefined) {
      return this.getRuleContexts(OrdinaryStatementContext);
    }

    return this.getRuleContext(i, OrdinaryStatementContext);
  }
  public override get ruleIndex(): number {
    return PythonParser.RULE_forLoop;
  }
  public override enterRule(listener: PythonListener): void {
    if (listener.enterForLoop) {
      listener.enterForLoop(this);
    }
  }
  public override exitRule(listener: PythonListener): void {
    if (listener.exitForLoop) {
      listener.exitForLoop(this);
    }
  }
  public override accept<Result>(visitor: PythonVisitor<Result>): Result | null {
    if (visitor.visitForLoop) {
      return visitor.visitForLoop(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class ProcedureCallContext extends antlr.ParserRuleContext {
  public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
    super(parent, invokingState);
  }
  public term(): TermContext {
    return this.getRuleContext(0, TermContext)!;
  }
  public NL(): antlr.TerminalNode {
    return this.getToken(PythonParser.NL, 0)!;
  }
  public GHOSTED(): antlr.TerminalNode | null {
    return this.getToken(PythonParser.GHOSTED, 0);
  }
  public commentText(): CommentTextContext | null {
    return this.getRuleContext(0, CommentTextContext);
  }
  public override get ruleIndex(): number {
    return PythonParser.RULE_procedureCall;
  }
  public override enterRule(listener: PythonListener): void {
    if (listener.enterProcedureCall) {
      listener.enterProcedureCall(this);
    }
  }
  public override exitRule(listener: PythonListener): void {
    if (listener.exitProcedureCall) {
      listener.exitProcedureCall(this);
    }
  }
  public override accept<Result>(visitor: PythonVisitor<Result>): Result | null {
    if (visitor.visitProcedureCall) {
      return visitor.visitProcedureCall(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class TryStatementContext extends antlr.ParserRuleContext {
  public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
    super(parent, invokingState);
  }
  public TRY(): antlr.TerminalNode {
    return this.getToken(PythonParser.TRY, 0)!;
  }
  public COLON(): antlr.TerminalNode {
    return this.getToken(PythonParser.COLON, 0)!;
  }
  public NL(): antlr.TerminalNode[];
  public NL(i: number): antlr.TerminalNode | null;
  public NL(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    if (i === undefined) {
      return this.getTokens(PythonParser.NL);
    } else {
      return this.getToken(PythonParser.NL, i);
    }
  }
  public tryClause(): TryClauseContext {
    return this.getRuleContext(0, TryClauseContext)!;
  }
  public END_TRY(): antlr.TerminalNode {
    return this.getToken(PythonParser.END_TRY, 0)!;
  }
  public GHOSTED(): antlr.TerminalNode | null {
    return this.getToken(PythonParser.GHOSTED, 0);
  }
  public commentText(): CommentTextContext | null {
    return this.getRuleContext(0, CommentTextContext);
  }
  public catchClause(): CatchClauseContext[];
  public catchClause(i: number): CatchClauseContext | null;
  public catchClause(i?: number): CatchClauseContext[] | CatchClauseContext | null {
    if (i === undefined) {
      return this.getRuleContexts(CatchClauseContext);
    }

    return this.getRuleContext(i, CatchClauseContext);
  }
  public override get ruleIndex(): number {
    return PythonParser.RULE_tryStatement;
  }
  public override enterRule(listener: PythonListener): void {
    if (listener.enterTryStatement) {
      listener.enterTryStatement(this);
    }
  }
  public override exitRule(listener: PythonListener): void {
    if (listener.exitTryStatement) {
      listener.exitTryStatement(this);
    }
  }
  public override accept<Result>(visitor: PythonVisitor<Result>): Result | null {
    if (visitor.visitTryStatement) {
      return visitor.visitTryStatement(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class TryClauseContext extends antlr.ParserRuleContext {
  public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
    super(parent, invokingState);
  }
  public ordinaryStatement(): OrdinaryStatementContext[];
  public ordinaryStatement(i: number): OrdinaryStatementContext | null;
  public ordinaryStatement(
    i?: number,
  ): OrdinaryStatementContext[] | OrdinaryStatementContext | null {
    if (i === undefined) {
      return this.getRuleContexts(OrdinaryStatementContext);
    }

    return this.getRuleContext(i, OrdinaryStatementContext);
  }
  public override get ruleIndex(): number {
    return PythonParser.RULE_tryClause;
  }
  public override enterRule(listener: PythonListener): void {
    if (listener.enterTryClause) {
      listener.enterTryClause(this);
    }
  }
  public override exitRule(listener: PythonListener): void {
    if (listener.exitTryClause) {
      listener.exitTryClause(this);
    }
  }
  public override accept<Result>(visitor: PythonVisitor<Result>): Result | null {
    if (visitor.visitTryClause) {
      return visitor.visitTryClause(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class CatchClauseContext extends antlr.ParserRuleContext {
  public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
    super(parent, invokingState);
  }
  public EXCEPT(): antlr.TerminalNode {
    return this.getToken(PythonParser.EXCEPT, 0)!;
  }
  public typeName(): TypeNameContext {
    return this.getRuleContext(0, TypeNameContext)!;
  }
  public AS(): antlr.TerminalNode {
    return this.getToken(PythonParser.AS, 0)!;
  }
  public identifierDef(): IdentifierDefContext {
    return this.getRuleContext(0, IdentifierDefContext)!;
  }
  public COLON(): antlr.TerminalNode {
    return this.getToken(PythonParser.COLON, 0)!;
  }
  public NL(): antlr.TerminalNode {
    return this.getToken(PythonParser.NL, 0)!;
  }
  public GHOSTED(): antlr.TerminalNode | null {
    return this.getToken(PythonParser.GHOSTED, 0);
  }
  public commentText(): CommentTextContext | null {
    return this.getRuleContext(0, CommentTextContext);
  }
  public ordinaryStatement(): OrdinaryStatementContext[];
  public ordinaryStatement(i: number): OrdinaryStatementContext | null;
  public ordinaryStatement(
    i?: number,
  ): OrdinaryStatementContext[] | OrdinaryStatementContext | null {
    if (i === undefined) {
      return this.getRuleContexts(OrdinaryStatementContext);
    }

    return this.getRuleContext(i, OrdinaryStatementContext);
  }
  public override get ruleIndex(): number {
    return PythonParser.RULE_catchClause;
  }
  public override enterRule(listener: PythonListener): void {
    if (listener.enterCatchClause) {
      listener.enterCatchClause(this);
    }
  }
  public override exitRule(listener: PythonListener): void {
    if (listener.exitCatchClause) {
      listener.exitCatchClause(this);
    }
  }
  public override accept<Result>(visitor: PythonVisitor<Result>): Result | null {
    if (visitor.visitCatchClause) {
      return visitor.visitCatchClause(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class ThrowStatementContext extends antlr.ParserRuleContext {
  public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
    super(parent, invokingState);
  }
  public RAISE(): antlr.TerminalNode {
    return this.getToken(PythonParser.RAISE, 0)!;
  }
  public typeName(): TypeNameContext {
    return this.getRuleContext(0, TypeNameContext)!;
  }
  public OPEN_BRACKET(): antlr.TerminalNode {
    return this.getToken(PythonParser.OPEN_BRACKET, 0)!;
  }
  public errorMessage(): ErrorMessageContext {
    return this.getRuleContext(0, ErrorMessageContext)!;
  }
  public CLOSE_BRACKET(): antlr.TerminalNode {
    return this.getToken(PythonParser.CLOSE_BRACKET, 0)!;
  }
  public NL(): antlr.TerminalNode {
    return this.getToken(PythonParser.NL, 0)!;
  }
  public GHOSTED(): antlr.TerminalNode | null {
    return this.getToken(PythonParser.GHOSTED, 0);
  }
  public commentText(): CommentTextContext | null {
    return this.getRuleContext(0, CommentTextContext);
  }
  public override get ruleIndex(): number {
    return PythonParser.RULE_throwStatement;
  }
  public override enterRule(listener: PythonListener): void {
    if (listener.enterThrowStatement) {
      listener.enterThrowStatement(this);
    }
  }
  public override exitRule(listener: PythonListener): void {
    if (listener.exitThrowStatement) {
      listener.exitThrowStatement(this);
    }
  }
  public override accept<Result>(visitor: PythonVisitor<Result>): Result | null {
    if (visitor.visitThrowStatement) {
      return visitor.visitThrowStatement(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class ErrorMessageContext extends antlr.ParserRuleContext {
  public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
    super(parent, invokingState);
  }
  public litString(): LitStringContext | null {
    return this.getRuleContext(0, LitStringContext);
  }
  public identifierUse(): IdentifierUseContext | null {
    return this.getRuleContext(0, IdentifierUseContext);
  }
  public override get ruleIndex(): number {
    return PythonParser.RULE_errorMessage;
  }
  public override enterRule(listener: PythonListener): void {
    if (listener.enterErrorMessage) {
      listener.enterErrorMessage(this);
    }
  }
  public override exitRule(listener: PythonListener): void {
    if (listener.exitErrorMessage) {
      listener.exitErrorMessage(this);
    }
  }
  public override accept<Result>(visitor: PythonVisitor<Result>): Result | null {
    if (visitor.visitErrorMessage) {
      return visitor.visitErrorMessage(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class AssertContext extends antlr.ParserRuleContext {
  public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
    super(parent, invokingState);
  }
  public THIS_INSTANCE(): antlr.TerminalNode {
    return this.getToken(PythonParser.THIS_INSTANCE, 0)!;
  }
  public DOT(): antlr.TerminalNode {
    return this.getToken(PythonParser.DOT, 0)!;
  }
  public ASSERT_EQUAL(): antlr.TerminalNode {
    return this.getToken(PythonParser.ASSERT_EQUAL, 0)!;
  }
  public OPEN_BRACKET(): antlr.TerminalNode {
    return this.getToken(PythonParser.OPEN_BRACKET, 0)!;
  }
  public assertActual(): AssertActualContext {
    return this.getRuleContext(0, AssertActualContext)!;
  }
  public COMMA(): antlr.TerminalNode {
    return this.getToken(PythonParser.COMMA, 0)!;
  }
  public assertExpected(): AssertExpectedContext {
    return this.getRuleContext(0, AssertExpectedContext)!;
  }
  public CLOSE_BRACKET(): antlr.TerminalNode {
    return this.getToken(PythonParser.CLOSE_BRACKET, 0)!;
  }
  public NL(): antlr.TerminalNode {
    return this.getToken(PythonParser.NL, 0)!;
  }
  public GHOSTED(): antlr.TerminalNode | null {
    return this.getToken(PythonParser.GHOSTED, 0);
  }
  public commentText(): CommentTextContext | null {
    return this.getRuleContext(0, CommentTextContext);
  }
  public override get ruleIndex(): number {
    return PythonParser.RULE_assert;
  }
  public override enterRule(listener: PythonListener): void {
    if (listener.enterAssert) {
      listener.enterAssert(this);
    }
  }
  public override exitRule(listener: PythonListener): void {
    if (listener.exitAssert) {
      listener.exitAssert(this);
    }
  }
  public override accept<Result>(visitor: PythonVisitor<Result>): Result | null {
    if (visitor.visitAssert) {
      return visitor.visitAssert(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class ReturnStatementContext extends antlr.ParserRuleContext {
  public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
    super(parent, invokingState);
  }
  public RETURN(): antlr.TerminalNode {
    return this.getToken(PythonParser.RETURN, 0)!;
  }
  public expression(): ExpressionContext {
    return this.getRuleContext(0, ExpressionContext)!;
  }
  public NL(): antlr.TerminalNode {
    return this.getToken(PythonParser.NL, 0)!;
  }
  public commentText(): CommentTextContext | null {
    return this.getRuleContext(0, CommentTextContext);
  }
  public override get ruleIndex(): number {
    return PythonParser.RULE_returnStatement;
  }
  public override enterRule(listener: PythonListener): void {
    if (listener.enterReturnStatement) {
      listener.enterReturnStatement(this);
    }
  }
  public override exitRule(listener: PythonListener): void {
    if (listener.exitReturnStatement) {
      listener.exitReturnStatement(this);
    }
  }
  public override accept<Result>(visitor: PythonVisitor<Result>): Result | null {
    if (visitor.visitReturnStatement) {
      return visitor.visitReturnStatement(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class CatchStatementContext extends antlr.ParserRuleContext {
  public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
    super(parent, invokingState);
  }
  public EXCEPT(): antlr.TerminalNode {
    return this.getToken(PythonParser.EXCEPT, 0)!;
  }
  public typeName(): TypeNameContext {
    return this.getRuleContext(0, TypeNameContext)!;
  }
  public AS(): antlr.TerminalNode {
    return this.getToken(PythonParser.AS, 0)!;
  }
  public identifierDef(): IdentifierDefContext {
    return this.getRuleContext(0, IdentifierDefContext)!;
  }
  public NL(): antlr.TerminalNode {
    return this.getToken(PythonParser.NL, 0)!;
  }
  public GHOSTED(): antlr.TerminalNode | null {
    return this.getToken(PythonParser.GHOSTED, 0);
  }
  public commentText(): CommentTextContext | null {
    return this.getRuleContext(0, CommentTextContext);
  }
  public override get ruleIndex(): number {
    return PythonParser.RULE_catchStatement;
  }
  public override enterRule(listener: PythonListener): void {
    if (listener.enterCatchStatement) {
      listener.enterCatchStatement(this);
    }
  }
  public override exitRule(listener: PythonListener): void {
    if (listener.exitCatchStatement) {
      listener.exitCatchStatement(this);
    }
  }
  public override accept<Result>(visitor: PythonVisitor<Result>): Result | null {
    if (visitor.visitCatchStatement) {
      return visitor.visitCatchStatement(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class ConstructorMemberContext extends antlr.ParserRuleContext {
  public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
    super(parent, invokingState);
  }
  public DEF(): antlr.TerminalNode {
    return this.getToken(PythonParser.DEF, 0)!;
  }
  public INIT(): antlr.TerminalNode {
    return this.getToken(PythonParser.INIT, 0)!;
  }
  public OPEN_BRACKET(): antlr.TerminalNode {
    return this.getToken(PythonParser.OPEN_BRACKET, 0)!;
  }
  public CLOSE_BRACKET(): antlr.TerminalNode {
    return this.getToken(PythonParser.CLOSE_BRACKET, 0)!;
  }
  public ARROW(): antlr.TerminalNode {
    return this.getToken(PythonParser.ARROW, 0)!;
  }
  public NONE(): antlr.TerminalNode {
    return this.getToken(PythonParser.NONE, 0)!;
  }
  public COLON(): antlr.TerminalNode {
    return this.getToken(PythonParser.COLON, 0)!;
  }
  public NL(): antlr.TerminalNode[];
  public NL(i: number): antlr.TerminalNode | null;
  public NL(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    if (i === undefined) {
      return this.getTokens(PythonParser.NL);
    } else {
      return this.getToken(PythonParser.NL, i);
    }
  }
  public END_CONSTRUCTOR(): antlr.TerminalNode {
    return this.getToken(PythonParser.END_CONSTRUCTOR, 0)!;
  }
  public GHOSTED(): antlr.TerminalNode | null {
    return this.getToken(PythonParser.GHOSTED, 0);
  }
  public paramList(): ParamListContext | null {
    return this.getRuleContext(0, ParamListContext);
  }
  public commentText(): CommentTextContext | null {
    return this.getRuleContext(0, CommentTextContext);
  }
  public ordinaryStatement(): OrdinaryStatementContext[];
  public ordinaryStatement(i: number): OrdinaryStatementContext | null;
  public ordinaryStatement(
    i?: number,
  ): OrdinaryStatementContext[] | OrdinaryStatementContext | null {
    if (i === undefined) {
      return this.getRuleContexts(OrdinaryStatementContext);
    }

    return this.getRuleContext(i, OrdinaryStatementContext);
  }
  public override get ruleIndex(): number {
    return PythonParser.RULE_constructorMember;
  }
  public override enterRule(listener: PythonListener): void {
    if (listener.enterConstructorMember) {
      listener.enterConstructorMember(this);
    }
  }
  public override exitRule(listener: PythonListener): void {
    if (listener.exitConstructorMember) {
      listener.exitConstructorMember(this);
    }
  }
  public override accept<Result>(visitor: PythonVisitor<Result>): Result | null {
    if (visitor.visitConstructorMember) {
      return visitor.visitConstructorMember(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class PropertyContext extends antlr.ParserRuleContext {
  public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
    super(parent, invokingState);
  }
  public identifierDef(): IdentifierDefContext {
    return this.getRuleContext(0, IdentifierDefContext)!;
  }
  public COLON(): antlr.TerminalNode {
    return this.getToken(PythonParser.COLON, 0)!;
  }
  public type(): TypeContext {
    return this.getRuleContext(0, TypeContext)!;
  }
  public NL(): antlr.TerminalNode {
    return this.getToken(PythonParser.NL, 0)!;
  }
  public GHOSTED(): antlr.TerminalNode | null {
    return this.getToken(PythonParser.GHOSTED, 0);
  }
  public commentText(): CommentTextContext | null {
    return this.getRuleContext(0, CommentTextContext);
  }
  public override get ruleIndex(): number {
    return PythonParser.RULE_property;
  }
  public override enterRule(listener: PythonListener): void {
    if (listener.enterProperty) {
      listener.enterProperty(this);
    }
  }
  public override exitRule(listener: PythonListener): void {
    if (listener.exitProperty) {
      listener.exitProperty(this);
    }
  }
  public override accept<Result>(visitor: PythonVisitor<Result>): Result | null {
    if (visitor.visitProperty) {
      return visitor.visitProperty(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class FunctionMethodContext extends antlr.ParserRuleContext {
  public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
    super(parent, invokingState);
  }
  public DEF(): antlr.TerminalNode {
    return this.getToken(PythonParser.DEF, 0)!;
  }
  public methodName(): MethodNameContext {
    return this.getRuleContext(0, MethodNameContext)!;
  }
  public OPEN_BRACKET(): antlr.TerminalNode {
    return this.getToken(PythonParser.OPEN_BRACKET, 0)!;
  }
  public CLOSE_BRACKET(): antlr.TerminalNode {
    return this.getToken(PythonParser.CLOSE_BRACKET, 0)!;
  }
  public ARROW(): antlr.TerminalNode {
    return this.getToken(PythonParser.ARROW, 0)!;
  }
  public type(): TypeContext {
    return this.getRuleContext(0, TypeContext)!;
  }
  public COLON(): antlr.TerminalNode {
    return this.getToken(PythonParser.COLON, 0)!;
  }
  public NL(): antlr.TerminalNode[];
  public NL(i: number): antlr.TerminalNode | null;
  public NL(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    if (i === undefined) {
      return this.getTokens(PythonParser.NL);
    } else {
      return this.getToken(PythonParser.NL, i);
    }
  }
  public returnStatement(): ReturnStatementContext {
    return this.getRuleContext(0, ReturnStatementContext)!;
  }
  public END_FUNCTION_METHOD(): antlr.TerminalNode {
    return this.getToken(PythonParser.END_FUNCTION_METHOD, 0)!;
  }
  public GHOSTED(): antlr.TerminalNode | null {
    return this.getToken(PythonParser.GHOSTED, 0);
  }
  public paramList(): ParamListContext | null {
    return this.getRuleContext(0, ParamListContext);
  }
  public commentText(): CommentTextContext | null {
    return this.getRuleContext(0, CommentTextContext);
  }
  public ordinaryStatement(): OrdinaryStatementContext[];
  public ordinaryStatement(i: number): OrdinaryStatementContext | null;
  public ordinaryStatement(
    i?: number,
  ): OrdinaryStatementContext[] | OrdinaryStatementContext | null {
    if (i === undefined) {
      return this.getRuleContexts(OrdinaryStatementContext);
    }

    return this.getRuleContext(i, OrdinaryStatementContext);
  }
  public override get ruleIndex(): number {
    return PythonParser.RULE_functionMethod;
  }
  public override enterRule(listener: PythonListener): void {
    if (listener.enterFunctionMethod) {
      listener.enterFunctionMethod(this);
    }
  }
  public override exitRule(listener: PythonListener): void {
    if (listener.exitFunctionMethod) {
      listener.exitFunctionMethod(this);
    }
  }
  public override accept<Result>(visitor: PythonVisitor<Result>): Result | null {
    if (visitor.visitFunctionMethod) {
      return visitor.visitFunctionMethod(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class ProcedureMethodContext extends antlr.ParserRuleContext {
  public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
    super(parent, invokingState);
  }
  public DEF(): antlr.TerminalNode {
    return this.getToken(PythonParser.DEF, 0)!;
  }
  public methodName(): MethodNameContext {
    return this.getRuleContext(0, MethodNameContext)!;
  }
  public OPEN_BRACKET(): antlr.TerminalNode {
    return this.getToken(PythonParser.OPEN_BRACKET, 0)!;
  }
  public CLOSE_BRACKET(): antlr.TerminalNode {
    return this.getToken(PythonParser.CLOSE_BRACKET, 0)!;
  }
  public ARROW(): antlr.TerminalNode {
    return this.getToken(PythonParser.ARROW, 0)!;
  }
  public NONE(): antlr.TerminalNode {
    return this.getToken(PythonParser.NONE, 0)!;
  }
  public COLON(): antlr.TerminalNode {
    return this.getToken(PythonParser.COLON, 0)!;
  }
  public NL(): antlr.TerminalNode[];
  public NL(i: number): antlr.TerminalNode | null;
  public NL(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    if (i === undefined) {
      return this.getTokens(PythonParser.NL);
    } else {
      return this.getToken(PythonParser.NL, i);
    }
  }
  public END_PROCEDURE_METHOD(): antlr.TerminalNode {
    return this.getToken(PythonParser.END_PROCEDURE_METHOD, 0)!;
  }
  public GHOSTED(): antlr.TerminalNode | null {
    return this.getToken(PythonParser.GHOSTED, 0);
  }
  public paramList(): ParamListContext | null {
    return this.getRuleContext(0, ParamListContext);
  }
  public commentText(): CommentTextContext | null {
    return this.getRuleContext(0, CommentTextContext);
  }
  public ordinaryStatement(): OrdinaryStatementContext[];
  public ordinaryStatement(i: number): OrdinaryStatementContext | null;
  public ordinaryStatement(
    i?: number,
  ): OrdinaryStatementContext[] | OrdinaryStatementContext | null {
    if (i === undefined) {
      return this.getRuleContexts(OrdinaryStatementContext);
    }

    return this.getRuleContext(i, OrdinaryStatementContext);
  }
  public override get ruleIndex(): number {
    return PythonParser.RULE_procedureMethod;
  }
  public override enterRule(listener: PythonListener): void {
    if (listener.enterProcedureMethod) {
      listener.enterProcedureMethod(this);
    }
  }
  public override exitRule(listener: PythonListener): void {
    if (listener.exitProcedureMethod) {
      listener.exitProcedureMethod(this);
    }
  }
  public override accept<Result>(visitor: PythonVisitor<Result>): Result | null {
    if (visitor.visitProcedureMethod) {
      return visitor.visitProcedureMethod(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class AbstractFunctionContext extends antlr.ParserRuleContext {
  public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
    super(parent, invokingState);
  }
  public ABSTRACT_METHOD(): antlr.TerminalNode {
    return this.getToken(PythonParser.ABSTRACT_METHOD, 0)!;
  }
  public NL(): antlr.TerminalNode[];
  public NL(i: number): antlr.TerminalNode | null;
  public NL(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    if (i === undefined) {
      return this.getTokens(PythonParser.NL);
    } else {
      return this.getToken(PythonParser.NL, i);
    }
  }
  public DEF(): antlr.TerminalNode {
    return this.getToken(PythonParser.DEF, 0)!;
  }
  public methodName(): MethodNameContext {
    return this.getRuleContext(0, MethodNameContext)!;
  }
  public OPEN_BRACKET(): antlr.TerminalNode {
    return this.getToken(PythonParser.OPEN_BRACKET, 0)!;
  }
  public CLOSE_BRACKET(): antlr.TerminalNode {
    return this.getToken(PythonParser.CLOSE_BRACKET, 0)!;
  }
  public ARROW(): antlr.TerminalNode {
    return this.getToken(PythonParser.ARROW, 0)!;
  }
  public type(): TypeContext {
    return this.getRuleContext(0, TypeContext)!;
  }
  public COLON(): antlr.TerminalNode {
    return this.getToken(PythonParser.COLON, 0)!;
  }
  public PASS(): antlr.TerminalNode {
    return this.getToken(PythonParser.PASS, 0)!;
  }
  public GHOSTED(): antlr.TerminalNode | null {
    return this.getToken(PythonParser.GHOSTED, 0);
  }
  public paramList(): ParamListContext | null {
    return this.getRuleContext(0, ParamListContext);
  }
  public commentText(): CommentTextContext | null {
    return this.getRuleContext(0, CommentTextContext);
  }
  public override get ruleIndex(): number {
    return PythonParser.RULE_abstractFunction;
  }
  public override enterRule(listener: PythonListener): void {
    if (listener.enterAbstractFunction) {
      listener.enterAbstractFunction(this);
    }
  }
  public override exitRule(listener: PythonListener): void {
    if (listener.exitAbstractFunction) {
      listener.exitAbstractFunction(this);
    }
  }
  public override accept<Result>(visitor: PythonVisitor<Result>): Result | null {
    if (visitor.visitAbstractFunction) {
      return visitor.visitAbstractFunction(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class AbstractProcedureContext extends antlr.ParserRuleContext {
  public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
    super(parent, invokingState);
  }
  public ABSTRACT_METHOD(): antlr.TerminalNode {
    return this.getToken(PythonParser.ABSTRACT_METHOD, 0)!;
  }
  public NL(): antlr.TerminalNode[];
  public NL(i: number): antlr.TerminalNode | null;
  public NL(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    if (i === undefined) {
      return this.getTokens(PythonParser.NL);
    } else {
      return this.getToken(PythonParser.NL, i);
    }
  }
  public DEF(): antlr.TerminalNode {
    return this.getToken(PythonParser.DEF, 0)!;
  }
  public methodName(): MethodNameContext {
    return this.getRuleContext(0, MethodNameContext)!;
  }
  public OPEN_BRACKET(): antlr.TerminalNode {
    return this.getToken(PythonParser.OPEN_BRACKET, 0)!;
  }
  public CLOSE_BRACKET(): antlr.TerminalNode {
    return this.getToken(PythonParser.CLOSE_BRACKET, 0)!;
  }
  public ARROW(): antlr.TerminalNode {
    return this.getToken(PythonParser.ARROW, 0)!;
  }
  public NONE(): antlr.TerminalNode {
    return this.getToken(PythonParser.NONE, 0)!;
  }
  public COLON(): antlr.TerminalNode {
    return this.getToken(PythonParser.COLON, 0)!;
  }
  public PASS(): antlr.TerminalNode {
    return this.getToken(PythonParser.PASS, 0)!;
  }
  public GHOSTED(): antlr.TerminalNode | null {
    return this.getToken(PythonParser.GHOSTED, 0);
  }
  public paramList(): ParamListContext | null {
    return this.getRuleContext(0, ParamListContext);
  }
  public commentText(): CommentTextContext | null {
    return this.getRuleContext(0, CommentTextContext);
  }
  public override get ruleIndex(): number {
    return PythonParser.RULE_abstractProcedure;
  }
  public override enterRule(listener: PythonListener): void {
    if (listener.enterAbstractProcedure) {
      listener.enterAbstractProcedure(this);
    }
  }
  public override exitRule(listener: PythonListener): void {
    if (listener.exitAbstractProcedure) {
      listener.exitAbstractProcedure(this);
    }
  }
  public override accept<Result>(visitor: PythonVisitor<Result>): Result | null {
    if (visitor.visitAbstractProcedure) {
      return visitor.visitAbstractProcedure(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class IdentifierDefContext extends antlr.ParserRuleContext {
  public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
    super(parent, invokingState);
  }
  public NAME_STARTING_LC(): antlr.TerminalNode {
    return this.getToken(PythonParser.NAME_STARTING_LC, 0)!;
  }
  public override get ruleIndex(): number {
    return PythonParser.RULE_identifierDef;
  }
  public override enterRule(listener: PythonListener): void {
    if (listener.enterIdentifierDef) {
      listener.enterIdentifierDef(this);
    }
  }
  public override exitRule(listener: PythonListener): void {
    if (listener.exitIdentifierDef) {
      listener.exitIdentifierDef(this);
    }
  }
  public override accept<Result>(visitor: PythonVisitor<Result>): Result | null {
    if (visitor.visitIdentifierDef) {
      return visitor.visitIdentifierDef(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class IdentifierUseContext extends antlr.ParserRuleContext {
  public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
    super(parent, invokingState);
  }
  public NAME_STARTING_LC(): antlr.TerminalNode {
    return this.getToken(PythonParser.NAME_STARTING_LC, 0)!;
  }
  public override get ruleIndex(): number {
    return PythonParser.RULE_identifierUse;
  }
  public override enterRule(listener: PythonListener): void {
    if (listener.enterIdentifierUse) {
      listener.enterIdentifierUse(this);
    }
  }
  public override exitRule(listener: PythonListener): void {
    if (listener.exitIdentifierUse) {
      listener.exitIdentifierUse(this);
    }
  }
  public override accept<Result>(visitor: PythonVisitor<Result>): Result | null {
    if (visitor.visitIdentifierUse) {
      return visitor.visitIdentifierUse(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class AssignableContext extends antlr.ParserRuleContext {
  public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
    super(parent, invokingState);
  }
  public override get ruleIndex(): number {
    return PythonParser.RULE_assignable;
  }
  public override copyFrom(ctx: AssignableContext): void {
    super.copyFrom(ctx);
  }
}
export class SimpleAssignableContext extends AssignableContext {
  public constructor(ctx: AssignableContext) {
    super(ctx.parent, ctx.invokingState);
    super.copyFrom(ctx);
  }
  public identifierUse(): IdentifierUseContext {
    return this.getRuleContext(0, IdentifierUseContext)!;
  }
  public override enterRule(listener: PythonListener): void {
    if (listener.enterSimpleAssignable) {
      listener.enterSimpleAssignable(this);
    }
  }
  public override exitRule(listener: PythonListener): void {
    if (listener.exitSimpleAssignable) {
      listener.exitSimpleAssignable(this);
    }
  }
  public override accept<Result>(visitor: PythonVisitor<Result>): Result | null {
    if (visitor.visitSimpleAssignable) {
      return visitor.visitSimpleAssignable(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}
export class IndexedAssignableContext extends AssignableContext {
  public constructor(ctx: AssignableContext) {
    super(ctx.parent, ctx.invokingState);
    super.copyFrom(ctx);
  }
  public assignable(): AssignableContext {
    return this.getRuleContext(0, AssignableContext)!;
  }
  public index(): IndexContext {
    return this.getRuleContext(0, IndexContext)!;
  }
  public override enterRule(listener: PythonListener): void {
    if (listener.enterIndexedAssignable) {
      listener.enterIndexedAssignable(this);
    }
  }
  public override exitRule(listener: PythonListener): void {
    if (listener.exitIndexedAssignable) {
      listener.exitIndexedAssignable(this);
    }
  }
  public override accept<Result>(visitor: PythonVisitor<Result>): Result | null {
    if (visitor.visitIndexedAssignable) {
      return visitor.visitIndexedAssignable(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}
export class ThisAssignableContext extends AssignableContext {
  public constructor(ctx: AssignableContext) {
    super(ctx.parent, ctx.invokingState);
    super.copyFrom(ctx);
  }
  public THIS_INSTANCE(): antlr.TerminalNode {
    return this.getToken(PythonParser.THIS_INSTANCE, 0)!;
  }
  public DOT(): antlr.TerminalNode {
    return this.getToken(PythonParser.DOT, 0)!;
  }
  public identifierUse(): IdentifierUseContext {
    return this.getRuleContext(0, IdentifierUseContext)!;
  }
  public override enterRule(listener: PythonListener): void {
    if (listener.enterThisAssignable) {
      listener.enterThisAssignable(this);
    }
  }
  public override exitRule(listener: PythonListener): void {
    if (listener.exitThisAssignable) {
      listener.exitThisAssignable(this);
    }
  }
  public override accept<Result>(visitor: PythonVisitor<Result>): Result | null {
    if (visitor.visitThisAssignable) {
      return visitor.visitThisAssignable(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class MethodNameContext extends antlr.ParserRuleContext {
  public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
    super(parent, invokingState);
  }
  public NAME_STARTING_LC(): antlr.TerminalNode {
    return this.getToken(PythonParser.NAME_STARTING_LC, 0)!;
  }
  public override get ruleIndex(): number {
    return PythonParser.RULE_methodName;
  }
  public override enterRule(listener: PythonListener): void {
    if (listener.enterMethodName) {
      listener.enterMethodName(this);
    }
  }
  public override exitRule(listener: PythonListener): void {
    if (listener.exitMethodName) {
      listener.exitMethodName(this);
    }
  }
  public override accept<Result>(visitor: PythonVisitor<Result>): Result | null {
    if (visitor.visitMethodName) {
      return visitor.visitMethodName(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class TestNameContext extends antlr.ParserRuleContext {
  public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
    super(parent, invokingState);
  }
  public NAME_STARTING_TEST_(): antlr.TerminalNode {
    return this.getToken(PythonParser.NAME_STARTING_TEST_, 0)!;
  }
  public override get ruleIndex(): number {
    return PythonParser.RULE_testName;
  }
  public override enterRule(listener: PythonListener): void {
    if (listener.enterTestName) {
      listener.enterTestName(this);
    }
  }
  public override exitRule(listener: PythonListener): void {
    if (listener.exitTestName) {
      listener.exitTestName(this);
    }
  }
  public override accept<Result>(visitor: PythonVisitor<Result>): Result | null {
    if (visitor.visitTestName) {
      return visitor.visitTestName(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class TypeNameContext extends antlr.ParserRuleContext {
  public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
    super(parent, invokingState);
  }
  public override get ruleIndex(): number {
    return PythonParser.RULE_typeName;
  }
  public override copyFrom(ctx: TypeNameContext): void {
    super.copyFrom(ctx);
  }
}
export class IntTypeNameContext extends TypeNameContext {
  public constructor(ctx: TypeNameContext) {
    super(ctx.parent, ctx.invokingState);
    super.copyFrom(ctx);
  }
  public INT_NAME(): antlr.TerminalNode {
    return this.getToken(PythonParser.INT_NAME, 0)!;
  }
  public override enterRule(listener: PythonListener): void {
    if (listener.enterIntTypeName) {
      listener.enterIntTypeName(this);
    }
  }
  public override exitRule(listener: PythonListener): void {
    if (listener.exitIntTypeName) {
      listener.exitIntTypeName(this);
    }
  }
  public override accept<Result>(visitor: PythonVisitor<Result>): Result | null {
    if (visitor.visitIntTypeName) {
      return visitor.visitIntTypeName(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}
export class ListTypeNameContext extends TypeNameContext {
  public constructor(ctx: TypeNameContext) {
    super(ctx.parent, ctx.invokingState);
    super.copyFrom(ctx);
  }
  public LIST_NAME(): antlr.TerminalNode {
    return this.getToken(PythonParser.LIST_NAME, 0)!;
  }
  public override enterRule(listener: PythonListener): void {
    if (listener.enterListTypeName) {
      listener.enterListTypeName(this);
    }
  }
  public override exitRule(listener: PythonListener): void {
    if (listener.exitListTypeName) {
      listener.exitListTypeName(this);
    }
  }
  public override accept<Result>(visitor: PythonVisitor<Result>): Result | null {
    if (visitor.visitListTypeName) {
      return visitor.visitListTypeName(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}
export class UdtTypeNameContext extends TypeNameContext {
  public constructor(ctx: TypeNameContext) {
    super(ctx.parent, ctx.invokingState);
    super.copyFrom(ctx);
  }
  public NAME_STARTING_UC(): antlr.TerminalNode {
    return this.getToken(PythonParser.NAME_STARTING_UC, 0)!;
  }
  public override enterRule(listener: PythonListener): void {
    if (listener.enterUdtTypeName) {
      listener.enterUdtTypeName(this);
    }
  }
  public override exitRule(listener: PythonListener): void {
    if (listener.exitUdtTypeName) {
      listener.exitUdtTypeName(this);
    }
  }
  public override accept<Result>(visitor: PythonVisitor<Result>): Result | null {
    if (visitor.visitUdtTypeName) {
      return visitor.visitUdtTypeName(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}
export class BoolTypeNameContext extends TypeNameContext {
  public constructor(ctx: TypeNameContext) {
    super(ctx.parent, ctx.invokingState);
    super.copyFrom(ctx);
  }
  public BOOL_NAME(): antlr.TerminalNode {
    return this.getToken(PythonParser.BOOL_NAME, 0)!;
  }
  public override enterRule(listener: PythonListener): void {
    if (listener.enterBoolTypeName) {
      listener.enterBoolTypeName(this);
    }
  }
  public override exitRule(listener: PythonListener): void {
    if (listener.exitBoolTypeName) {
      listener.exitBoolTypeName(this);
    }
  }
  public override accept<Result>(visitor: PythonVisitor<Result>): Result | null {
    if (visitor.visitBoolTypeName) {
      return visitor.visitBoolTypeName(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}
export class FloatTypeNameContext extends TypeNameContext {
  public constructor(ctx: TypeNameContext) {
    super(ctx.parent, ctx.invokingState);
    super.copyFrom(ctx);
  }
  public FLOAT_NAME(): antlr.TerminalNode {
    return this.getToken(PythonParser.FLOAT_NAME, 0)!;
  }
  public override enterRule(listener: PythonListener): void {
    if (listener.enterFloatTypeName) {
      listener.enterFloatTypeName(this);
    }
  }
  public override exitRule(listener: PythonListener): void {
    if (listener.exitFloatTypeName) {
      listener.exitFloatTypeName(this);
    }
  }
  public override accept<Result>(visitor: PythonVisitor<Result>): Result | null {
    if (visitor.visitFloatTypeName) {
      return visitor.visitFloatTypeName(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}
export class StringTypeNameContext extends TypeNameContext {
  public constructor(ctx: TypeNameContext) {
    super(ctx.parent, ctx.invokingState);
    super.copyFrom(ctx);
  }
  public STRING_NAME(): antlr.TerminalNode {
    return this.getToken(PythonParser.STRING_NAME, 0)!;
  }
  public override enterRule(listener: PythonListener): void {
    if (listener.enterStringTypeName) {
      listener.enterStringTypeName(this);
    }
  }
  public override exitRule(listener: PythonListener): void {
    if (listener.exitStringTypeName) {
      listener.exitStringTypeName(this);
    }
  }
  public override accept<Result>(visitor: PythonVisitor<Result>): Result | null {
    if (visitor.visitStringTypeName) {
      return visitor.visitStringTypeName(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class ConstantValueContext extends antlr.ParserRuleContext {
  public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
    super(parent, invokingState);
  }
  public litBoolean(): LitBooleanContext | null {
    return this.getRuleContext(0, LitBooleanContext);
  }
  public litInt(): LitIntContext | null {
    return this.getRuleContext(0, LitIntContext);
  }
  public litFloat(): LitFloatContext | null {
    return this.getRuleContext(0, LitFloatContext);
  }
  public litString(): LitStringContext | null {
    return this.getRuleContext(0, LitStringContext);
  }
  public override get ruleIndex(): number {
    return PythonParser.RULE_constantValue;
  }
  public override enterRule(listener: PythonListener): void {
    if (listener.enterConstantValue) {
      listener.enterConstantValue(this);
    }
  }
  public override exitRule(listener: PythonListener): void {
    if (listener.exitConstantValue) {
      listener.exitConstantValue(this);
    }
  }
  public override accept<Result>(visitor: PythonVisitor<Result>): Result | null {
    if (visitor.visitConstantValue) {
      return visitor.visitConstantValue(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class ArgListContext extends antlr.ParserRuleContext {
  public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
    super(parent, invokingState);
  }
  public argument(): ArgumentContext[];
  public argument(i: number): ArgumentContext | null;
  public argument(i?: number): ArgumentContext[] | ArgumentContext | null {
    if (i === undefined) {
      return this.getRuleContexts(ArgumentContext);
    }

    return this.getRuleContext(i, ArgumentContext);
  }
  public COMMA(): antlr.TerminalNode[];
  public COMMA(i: number): antlr.TerminalNode | null;
  public COMMA(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    if (i === undefined) {
      return this.getTokens(PythonParser.COMMA);
    } else {
      return this.getToken(PythonParser.COMMA, i);
    }
  }
  public override get ruleIndex(): number {
    return PythonParser.RULE_argList;
  }
  public override enterRule(listener: PythonListener): void {
    if (listener.enterArgList) {
      listener.enterArgList(this);
    }
  }
  public override exitRule(listener: PythonListener): void {
    if (listener.exitArgList) {
      listener.exitArgList(this);
    }
  }
  public override accept<Result>(visitor: PythonVisitor<Result>): Result | null {
    if (visitor.visitArgList) {
      return visitor.visitArgList(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class ArgumentContext extends antlr.ParserRuleContext {
  public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
    super(parent, invokingState);
  }
  public lambda(): LambdaContext | null {
    return this.getRuleContext(0, LambdaContext);
  }
  public expression(): ExpressionContext | null {
    return this.getRuleContext(0, ExpressionContext);
  }
  public override get ruleIndex(): number {
    return PythonParser.RULE_argument;
  }
  public override enterRule(listener: PythonListener): void {
    if (listener.enterArgument) {
      listener.enterArgument(this);
    }
  }
  public override exitRule(listener: PythonListener): void {
    if (listener.exitArgument) {
      listener.exitArgument(this);
    }
  }
  public override accept<Result>(visitor: PythonVisitor<Result>): Result | null {
    if (visitor.visitArgument) {
      return visitor.visitArgument(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class ParamListContext extends antlr.ParserRuleContext {
  public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
    super(parent, invokingState);
  }
  public paramDef(): ParamDefContext[];
  public paramDef(i: number): ParamDefContext | null;
  public paramDef(i?: number): ParamDefContext[] | ParamDefContext | null {
    if (i === undefined) {
      return this.getRuleContexts(ParamDefContext);
    }

    return this.getRuleContext(i, ParamDefContext);
  }
  public COMMA(): antlr.TerminalNode[];
  public COMMA(i: number): antlr.TerminalNode | null;
  public COMMA(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    if (i === undefined) {
      return this.getTokens(PythonParser.COMMA);
    } else {
      return this.getToken(PythonParser.COMMA, i);
    }
  }
  public override get ruleIndex(): number {
    return PythonParser.RULE_paramList;
  }
  public override enterRule(listener: PythonListener): void {
    if (listener.enterParamList) {
      listener.enterParamList(this);
    }
  }
  public override exitRule(listener: PythonListener): void {
    if (listener.exitParamList) {
      listener.exitParamList(this);
    }
  }
  public override accept<Result>(visitor: PythonVisitor<Result>): Result | null {
    if (visitor.visitParamList) {
      return visitor.visitParamList(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class IdentifierListContext extends antlr.ParserRuleContext {
  public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
    super(parent, invokingState);
  }
  public identifierDef(): IdentifierDefContext[];
  public identifierDef(i: number): IdentifierDefContext | null;
  public identifierDef(i?: number): IdentifierDefContext[] | IdentifierDefContext | null {
    if (i === undefined) {
      return this.getRuleContexts(IdentifierDefContext);
    }

    return this.getRuleContext(i, IdentifierDefContext);
  }
  public COMMA(): antlr.TerminalNode[];
  public COMMA(i: number): antlr.TerminalNode | null;
  public COMMA(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    if (i === undefined) {
      return this.getTokens(PythonParser.COMMA);
    } else {
      return this.getToken(PythonParser.COMMA, i);
    }
  }
  public override get ruleIndex(): number {
    return PythonParser.RULE_identifierList;
  }
  public override enterRule(listener: PythonListener): void {
    if (listener.enterIdentifierList) {
      listener.enterIdentifierList(this);
    }
  }
  public override exitRule(listener: PythonListener): void {
    if (listener.exitIdentifierList) {
      listener.exitIdentifierList(this);
    }
  }
  public override accept<Result>(visitor: PythonVisitor<Result>): Result | null {
    if (visitor.visitIdentifierList) {
      return visitor.visitIdentifierList(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class ExpressionListContext extends antlr.ParserRuleContext {
  public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
    super(parent, invokingState);
  }
  public expression(): ExpressionContext[];
  public expression(i: number): ExpressionContext | null;
  public expression(i?: number): ExpressionContext[] | ExpressionContext | null {
    if (i === undefined) {
      return this.getRuleContexts(ExpressionContext);
    }

    return this.getRuleContext(i, ExpressionContext);
  }
  public COMMA(): antlr.TerminalNode[];
  public COMMA(i: number): antlr.TerminalNode | null;
  public COMMA(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    if (i === undefined) {
      return this.getTokens(PythonParser.COMMA);
    } else {
      return this.getToken(PythonParser.COMMA, i);
    }
  }
  public override get ruleIndex(): number {
    return PythonParser.RULE_expressionList;
  }
  public override enterRule(listener: PythonListener): void {
    if (listener.enterExpressionList) {
      listener.enterExpressionList(this);
    }
  }
  public override exitRule(listener: PythonListener): void {
    if (listener.exitExpressionList) {
      listener.exitExpressionList(this);
    }
  }
  public override accept<Result>(visitor: PythonVisitor<Result>): Result | null {
    if (visitor.visitExpressionList) {
      return visitor.visitExpressionList(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class TypeContext extends antlr.ParserRuleContext {
  public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
    super(parent, invokingState);
  }
  public typeTuple(): TypeTupleContext | null {
    return this.getRuleContext(0, TypeTupleContext);
  }
  public typeName(): TypeNameContext | null {
    return this.getRuleContext(0, TypeNameContext);
  }
  public typeGeneric(): TypeGenericContext | null {
    return this.getRuleContext(0, TypeGenericContext);
  }
  public typeFunc(): TypeFuncContext | null {
    return this.getRuleContext(0, TypeFuncContext);
  }
  public override get ruleIndex(): number {
    return PythonParser.RULE_type;
  }
  public override enterRule(listener: PythonListener): void {
    if (listener.enterType) {
      listener.enterType(this);
    }
  }
  public override exitRule(listener: PythonListener): void {
    if (listener.exitType) {
      listener.exitType(this);
    }
  }
  public override accept<Result>(visitor: PythonVisitor<Result>): Result | null {
    if (visitor.visitType) {
      return visitor.visitType(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class AssertActualContext extends antlr.ParserRuleContext {
  public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
    super(parent, invokingState);
  }
  public expression(): ExpressionContext {
    return this.getRuleContext(0, ExpressionContext)!;
  }
  public override get ruleIndex(): number {
    return PythonParser.RULE_assertActual;
  }
  public override enterRule(listener: PythonListener): void {
    if (listener.enterAssertActual) {
      listener.enterAssertActual(this);
    }
  }
  public override exitRule(listener: PythonListener): void {
    if (listener.exitAssertActual) {
      listener.exitAssertActual(this);
    }
  }
  public override accept<Result>(visitor: PythonVisitor<Result>): Result | null {
    if (visitor.visitAssertActual) {
      return visitor.visitAssertActual(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class AssertExpectedContext extends antlr.ParserRuleContext {
  public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
    super(parent, invokingState);
  }
  public litValue(): LitValueContext | null {
    return this.getRuleContext(0, LitValueContext);
  }
  public list(): ListContext | null {
    return this.getRuleContext(0, ListContext);
  }
  public dictionary(): DictionaryContext | null {
    return this.getRuleContext(0, DictionaryContext);
  }
  public unaryExpression(): UnaryExpressionContext | null {
    return this.getRuleContext(0, UnaryExpressionContext);
  }
  public tuple(): TupleContext | null {
    return this.getRuleContext(0, TupleContext);
  }
  public override get ruleIndex(): number {
    return PythonParser.RULE_assertExpected;
  }
  public override enterRule(listener: PythonListener): void {
    if (listener.enterAssertExpected) {
      listener.enterAssertExpected(this);
    }
  }
  public override exitRule(listener: PythonListener): void {
    if (listener.exitAssertExpected) {
      listener.exitAssertExpected(this);
    }
  }
  public override accept<Result>(visitor: PythonVisitor<Result>): Result | null {
    if (visitor.visitAssertExpected) {
      return visitor.visitAssertExpected(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class LitValueContext extends antlr.ParserRuleContext {
  public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
    super(parent, invokingState);
  }
  public litBoolean(): LitBooleanContext | null {
    return this.getRuleContext(0, LitBooleanContext);
  }
  public litInt(): LitIntContext | null {
    return this.getRuleContext(0, LitIntContext);
  }
  public litFloat(): LitFloatContext | null {
    return this.getRuleContext(0, LitFloatContext);
  }
  public litString(): LitStringContext | null {
    return this.getRuleContext(0, LitStringContext);
  }
  public interpolatedString(): InterpolatedStringContext | null {
    return this.getRuleContext(0, InterpolatedStringContext);
  }
  public enumValue(): EnumValueContext | null {
    return this.getRuleContext(0, EnumValueContext);
  }
  public override get ruleIndex(): number {
    return PythonParser.RULE_litValue;
  }
  public override enterRule(listener: PythonListener): void {
    if (listener.enterLitValue) {
      listener.enterLitValue(this);
    }
  }
  public override exitRule(listener: PythonListener): void {
    if (listener.exitLitValue) {
      listener.exitLitValue(this);
    }
  }
  public override accept<Result>(visitor: PythonVisitor<Result>): Result | null {
    if (visitor.visitLitValue) {
      return visitor.visitLitValue(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class LitBooleanContext extends antlr.ParserRuleContext {
  public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
    super(parent, invokingState);
  }
  public TRUE(): antlr.TerminalNode | null {
    return this.getToken(PythonParser.TRUE, 0);
  }
  public FALSE(): antlr.TerminalNode | null {
    return this.getToken(PythonParser.FALSE, 0);
  }
  public override get ruleIndex(): number {
    return PythonParser.RULE_litBoolean;
  }
  public override enterRule(listener: PythonListener): void {
    if (listener.enterLitBoolean) {
      listener.enterLitBoolean(this);
    }
  }
  public override exitRule(listener: PythonListener): void {
    if (listener.exitLitBoolean) {
      listener.exitLitBoolean(this);
    }
  }
  public override accept<Result>(visitor: PythonVisitor<Result>): Result | null {
    if (visitor.visitLitBoolean) {
      return visitor.visitLitBoolean(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class LitIntContext extends antlr.ParserRuleContext {
  public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
    super(parent, invokingState);
  }
  public override get ruleIndex(): number {
    return PythonParser.RULE_litInt;
  }
  public override copyFrom(ctx: LitIntContext): void {
    super.copyFrom(ctx);
  }
}
export class LitBinaryContext extends LitIntContext {
  public constructor(ctx: LitIntContext) {
    super(ctx.parent, ctx.invokingState);
    super.copyFrom(ctx);
  }
  public LITERAL_BINARY(): antlr.TerminalNode {
    return this.getToken(PythonParser.LITERAL_BINARY, 0)!;
  }
  public override enterRule(listener: PythonListener): void {
    if (listener.enterLitBinary) {
      listener.enterLitBinary(this);
    }
  }
  public override exitRule(listener: PythonListener): void {
    if (listener.exitLitBinary) {
      listener.exitLitBinary(this);
    }
  }
  public override accept<Result>(visitor: PythonVisitor<Result>): Result | null {
    if (visitor.visitLitBinary) {
      return visitor.visitLitBinary(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}
export class LitIntegerContext extends LitIntContext {
  public constructor(ctx: LitIntContext) {
    super(ctx.parent, ctx.invokingState);
    super.copyFrom(ctx);
  }
  public LITERAL_INTEGER(): antlr.TerminalNode {
    return this.getToken(PythonParser.LITERAL_INTEGER, 0)!;
  }
  public override enterRule(listener: PythonListener): void {
    if (listener.enterLitInteger) {
      listener.enterLitInteger(this);
    }
  }
  public override exitRule(listener: PythonListener): void {
    if (listener.exitLitInteger) {
      listener.exitLitInteger(this);
    }
  }
  public override accept<Result>(visitor: PythonVisitor<Result>): Result | null {
    if (visitor.visitLitInteger) {
      return visitor.visitLitInteger(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}
export class LitHexContext extends LitIntContext {
  public constructor(ctx: LitIntContext) {
    super(ctx.parent, ctx.invokingState);
    super.copyFrom(ctx);
  }
  public LITERAL_HEX(): antlr.TerminalNode {
    return this.getToken(PythonParser.LITERAL_HEX, 0)!;
  }
  public override enterRule(listener: PythonListener): void {
    if (listener.enterLitHex) {
      listener.enterLitHex(this);
    }
  }
  public override exitRule(listener: PythonListener): void {
    if (listener.exitLitHex) {
      listener.exitLitHex(this);
    }
  }
  public override accept<Result>(visitor: PythonVisitor<Result>): Result | null {
    if (visitor.visitLitHex) {
      return visitor.visitLitHex(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class LitFloatContext extends antlr.ParserRuleContext {
  public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
    super(parent, invokingState);
  }
  public LITERAL_FLOAT(): antlr.TerminalNode {
    return this.getToken(PythonParser.LITERAL_FLOAT, 0)!;
  }
  public override get ruleIndex(): number {
    return PythonParser.RULE_litFloat;
  }
  public override enterRule(listener: PythonListener): void {
    if (listener.enterLitFloat) {
      listener.enterLitFloat(this);
    }
  }
  public override exitRule(listener: PythonListener): void {
    if (listener.exitLitFloat) {
      listener.exitLitFloat(this);
    }
  }
  public override accept<Result>(visitor: PythonVisitor<Result>): Result | null {
    if (visitor.visitLitFloat) {
      return visitor.visitLitFloat(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class LitStringContext extends antlr.ParserRuleContext {
  public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
    super(parent, invokingState);
  }
  public LITERAL_STRING(): antlr.TerminalNode | null {
    return this.getToken(PythonParser.LITERAL_STRING, 0);
  }
  public INTERPOLATED_STRING(): antlr.TerminalNode | null {
    return this.getToken(PythonParser.INTERPOLATED_STRING, 0);
  }
  public override get ruleIndex(): number {
    return PythonParser.RULE_litString;
  }
  public override enterRule(listener: PythonListener): void {
    if (listener.enterLitString) {
      listener.enterLitString(this);
    }
  }
  public override exitRule(listener: PythonListener): void {
    if (listener.exitLitString) {
      listener.exitLitString(this);
    }
  }
  public override accept<Result>(visitor: PythonVisitor<Result>): Result | null {
    if (visitor.visitLitString) {
      return visitor.visitLitString(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class EnumValueContext extends antlr.ParserRuleContext {
  public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
    super(parent, invokingState);
  }
  public typeName(): TypeNameContext {
    return this.getRuleContext(0, TypeNameContext)!;
  }
  public DOT(): antlr.TerminalNode {
    return this.getToken(PythonParser.DOT, 0)!;
  }
  public identifierUse(): IdentifierUseContext {
    return this.getRuleContext(0, IdentifierUseContext)!;
  }
  public override get ruleIndex(): number {
    return PythonParser.RULE_enumValue;
  }
  public override enterRule(listener: PythonListener): void {
    if (listener.enterEnumValue) {
      listener.enterEnumValue(this);
    }
  }
  public override exitRule(listener: PythonListener): void {
    if (listener.exitEnumValue) {
      listener.exitEnumValue(this);
    }
  }
  public override accept<Result>(visitor: PythonVisitor<Result>): Result | null {
    if (visitor.visitEnumValue) {
      return visitor.visitEnumValue(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class IndexContext extends antlr.ParserRuleContext {
  public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
    super(parent, invokingState);
  }
  public OPEN_SQ_BRACKET(): antlr.TerminalNode {
    return this.getToken(PythonParser.OPEN_SQ_BRACKET, 0)!;
  }
  public expression(): ExpressionContext {
    return this.getRuleContext(0, ExpressionContext)!;
  }
  public CLOSE_SQ_BRACKET(): antlr.TerminalNode {
    return this.getToken(PythonParser.CLOSE_SQ_BRACKET, 0)!;
  }
  public override get ruleIndex(): number {
    return PythonParser.RULE_index;
  }
  public override enterRule(listener: PythonListener): void {
    if (listener.enterIndex) {
      listener.enterIndex(this);
    }
  }
  public override exitRule(listener: PythonListener): void {
    if (listener.exitIndex) {
      listener.exitIndex(this);
    }
  }
  public override accept<Result>(visitor: PythonVisitor<Result>): Result | null {
    if (visitor.visitIndex) {
      return visitor.visitIndex(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class ExpressionContext extends antlr.ParserRuleContext {
  public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
    super(parent, invokingState);
  }
  public override get ruleIndex(): number {
    return PythonParser.RULE_expression;
  }
  public override copyFrom(ctx: ExpressionContext): void {
    super.copyFrom(ctx);
  }
}
export class UnaryExpressionLabelContext extends ExpressionContext {
  public constructor(ctx: ExpressionContext) {
    super(ctx.parent, ctx.invokingState);
    super.copyFrom(ctx);
  }
  public unaryExpression(): UnaryExpressionContext {
    return this.getRuleContext(0, UnaryExpressionContext)!;
  }
  public override enterRule(listener: PythonListener): void {
    if (listener.enterUnaryExpressionLabel) {
      listener.enterUnaryExpressionLabel(this);
    }
  }
  public override exitRule(listener: PythonListener): void {
    if (listener.exitUnaryExpressionLabel) {
      listener.exitUnaryExpressionLabel(this);
    }
  }
  public override accept<Result>(visitor: PythonVisitor<Result>): Result | null {
    if (visitor.visitUnaryExpressionLabel) {
      return visitor.visitUnaryExpressionLabel(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}
export class BinaryExpressionLabelContext extends ExpressionContext {
  public constructor(ctx: ExpressionContext) {
    super(ctx.parent, ctx.invokingState);
    super.copyFrom(ctx);
  }
  public binaryExpression(): BinaryExpressionContext {
    return this.getRuleContext(0, BinaryExpressionContext)!;
  }
  public override enterRule(listener: PythonListener): void {
    if (listener.enterBinaryExpressionLabel) {
      listener.enterBinaryExpressionLabel(this);
    }
  }
  public override exitRule(listener: PythonListener): void {
    if (listener.exitBinaryExpressionLabel) {
      listener.exitBinaryExpressionLabel(this);
    }
  }
  public override accept<Result>(visitor: PythonVisitor<Result>): Result | null {
    if (visitor.visitBinaryExpressionLabel) {
      return visitor.visitBinaryExpressionLabel(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}
export class NewInstanceExpressionContext extends ExpressionContext {
  public constructor(ctx: ExpressionContext) {
    super(ctx.parent, ctx.invokingState);
    super.copyFrom(ctx);
  }
  public newInstance(): NewInstanceContext {
    return this.getRuleContext(0, NewInstanceContext)!;
  }
  public override enterRule(listener: PythonListener): void {
    if (listener.enterNewInstanceExpression) {
      listener.enterNewInstanceExpression(this);
    }
  }
  public override exitRule(listener: PythonListener): void {
    if (listener.exitNewInstanceExpression) {
      listener.exitNewInstanceExpression(this);
    }
  }
  public override accept<Result>(visitor: PythonVisitor<Result>): Result | null {
    if (visitor.visitNewInstanceExpression) {
      return visitor.visitNewInstanceExpression(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}
export class IfExpressionContext extends ExpressionContext {
  public _trueExpr?: ExpressionContext;
  public _condition?: ExpressionContext;
  public _elifCondition?: ExpressionContext;
  public _falseExpr?: ExpressionContext;
  public constructor(ctx: ExpressionContext) {
    super(ctx.parent, ctx.invokingState);
    super.copyFrom(ctx);
  }
  public IF(): antlr.TerminalNode {
    return this.getToken(PythonParser.IF, 0)!;
  }
  public ELSE(): antlr.TerminalNode {
    return this.getToken(PythonParser.ELSE, 0)!;
  }
  public expression(): ExpressionContext[];
  public expression(i: number): ExpressionContext | null;
  public expression(i?: number): ExpressionContext[] | ExpressionContext | null {
    if (i === undefined) {
      return this.getRuleContexts(ExpressionContext);
    }

    return this.getRuleContext(i, ExpressionContext);
  }
  public ELIF(): antlr.TerminalNode[];
  public ELIF(i: number): antlr.TerminalNode | null;
  public ELIF(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    if (i === undefined) {
      return this.getTokens(PythonParser.ELIF);
    } else {
      return this.getToken(PythonParser.ELIF, i);
    }
  }
  public override enterRule(listener: PythonListener): void {
    if (listener.enterIfExpression) {
      listener.enterIfExpression(this);
    }
  }
  public override exitRule(listener: PythonListener): void {
    if (listener.exitIfExpression) {
      listener.exitIfExpression(this);
    }
  }
  public override accept<Result>(visitor: PythonVisitor<Result>): Result | null {
    if (visitor.visitIfExpression) {
      return visitor.visitIfExpression(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}
export class TermExpressionContext extends ExpressionContext {
  public constructor(ctx: ExpressionContext) {
    super(ctx.parent, ctx.invokingState);
    super.copyFrom(ctx);
  }
  public term(): TermContext {
    return this.getRuleContext(0, TermContext)!;
  }
  public override enterRule(listener: PythonListener): void {
    if (listener.enterTermExpression) {
      listener.enterTermExpression(this);
    }
  }
  public override exitRule(listener: PythonListener): void {
    if (listener.exitTermExpression) {
      listener.exitTermExpression(this);
    }
  }
  public override accept<Result>(visitor: PythonVisitor<Result>): Result | null {
    if (visitor.visitTermExpression) {
      return visitor.visitTermExpression(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class TermContext extends antlr.ParserRuleContext {
  public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
    super(parent, invokingState);
  }
  public override get ruleIndex(): number {
    return PythonParser.RULE_term;
  }
  public override copyFrom(ctx: TermContext): void {
    super.copyFrom(ctx);
  }
}
export class IdentifierUseTermContext extends TermContext {
  public constructor(ctx: TermContext) {
    super(ctx.parent, ctx.invokingState);
    super.copyFrom(ctx);
  }
  public identifierUse(): IdentifierUseContext {
    return this.getRuleContext(0, IdentifierUseContext)!;
  }
  public override enterRule(listener: PythonListener): void {
    if (listener.enterIdentifierUseTerm) {
      listener.enterIdentifierUseTerm(this);
    }
  }
  public override exitRule(listener: PythonListener): void {
    if (listener.exitIdentifierUseTerm) {
      listener.exitIdentifierUseTerm(this);
    }
  }
  public override accept<Result>(visitor: PythonVisitor<Result>): Result | null {
    if (visitor.visitIdentifierUseTerm) {
      return visitor.visitIdentifierUseTerm(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}
export class MethodCallTermContext extends TermContext {
  public constructor(ctx: TermContext) {
    super(ctx.parent, ctx.invokingState);
    super.copyFrom(ctx);
  }
  public methodCall(): MethodCallContext {
    return this.getRuleContext(0, MethodCallContext)!;
  }
  public override enterRule(listener: PythonListener): void {
    if (listener.enterMethodCallTerm) {
      listener.enterMethodCallTerm(this);
    }
  }
  public override exitRule(listener: PythonListener): void {
    if (listener.exitMethodCallTerm) {
      listener.exitMethodCallTerm(this);
    }
  }
  public override accept<Result>(visitor: PythonVisitor<Result>): Result | null {
    if (visitor.visitMethodCallTerm) {
      return visitor.visitMethodCallTerm(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}
export class IndexedTermContext extends TermContext {
  public constructor(ctx: TermContext) {
    super(ctx.parent, ctx.invokingState);
    super.copyFrom(ctx);
  }
  public term(): TermContext {
    return this.getRuleContext(0, TermContext)!;
  }
  public index(): IndexContext {
    return this.getRuleContext(0, IndexContext)!;
  }
  public override enterRule(listener: PythonListener): void {
    if (listener.enterIndexedTerm) {
      listener.enterIndexedTerm(this);
    }
  }
  public override exitRule(listener: PythonListener): void {
    if (listener.exitIndexedTerm) {
      listener.exitIndexedTerm(this);
    }
  }
  public override accept<Result>(visitor: PythonVisitor<Result>): Result | null {
    if (visitor.visitIndexedTerm) {
      return visitor.visitIndexedTerm(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}
export class LitValueTermContext extends TermContext {
  public constructor(ctx: TermContext) {
    super(ctx.parent, ctx.invokingState);
    super.copyFrom(ctx);
  }
  public litValue(): LitValueContext {
    return this.getRuleContext(0, LitValueContext)!;
  }
  public override enterRule(listener: PythonListener): void {
    if (listener.enterLitValueTerm) {
      listener.enterLitValueTerm(this);
    }
  }
  public override exitRule(listener: PythonListener): void {
    if (listener.exitLitValueTerm) {
      listener.exitLitValueTerm(this);
    }
  }
  public override accept<Result>(visitor: PythonVisitor<Result>): Result | null {
    if (visitor.visitLitValueTerm) {
      return visitor.visitLitValueTerm(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}
export class DictionaryTermContext extends TermContext {
  public constructor(ctx: TermContext) {
    super(ctx.parent, ctx.invokingState);
    super.copyFrom(ctx);
  }
  public dictionary(): DictionaryContext {
    return this.getRuleContext(0, DictionaryContext)!;
  }
  public override enterRule(listener: PythonListener): void {
    if (listener.enterDictionaryTerm) {
      listener.enterDictionaryTerm(this);
    }
  }
  public override exitRule(listener: PythonListener): void {
    if (listener.exitDictionaryTerm) {
      listener.exitDictionaryTerm(this);
    }
  }
  public override accept<Result>(visitor: PythonVisitor<Result>): Result | null {
    if (visitor.visitDictionaryTerm) {
      return visitor.visitDictionaryTerm(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}
export class BracketedExpressionTermContext extends TermContext {
  public constructor(ctx: TermContext) {
    super(ctx.parent, ctx.invokingState);
    super.copyFrom(ctx);
  }
  public bracketedExpression(): BracketedExpressionContext {
    return this.getRuleContext(0, BracketedExpressionContext)!;
  }
  public override enterRule(listener: PythonListener): void {
    if (listener.enterBracketedExpressionTerm) {
      listener.enterBracketedExpressionTerm(this);
    }
  }
  public override exitRule(listener: PythonListener): void {
    if (listener.exitBracketedExpressionTerm) {
      listener.exitBracketedExpressionTerm(this);
    }
  }
  public override accept<Result>(visitor: PythonVisitor<Result>): Result | null {
    if (visitor.visitBracketedExpressionTerm) {
      return visitor.visitBracketedExpressionTerm(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}
export class ChainableTermContext extends TermContext {
  public constructor(ctx: TermContext) {
    super(ctx.parent, ctx.invokingState);
    super.copyFrom(ctx);
  }
  public term(): TermContext {
    return this.getRuleContext(0, TermContext)!;
  }
  public DOT(): antlr.TerminalNode {
    return this.getToken(PythonParser.DOT, 0)!;
  }
  public chainable(): ChainableContext {
    return this.getRuleContext(0, ChainableContext)!;
  }
  public override enterRule(listener: PythonListener): void {
    if (listener.enterChainableTerm) {
      listener.enterChainableTerm(this);
    }
  }
  public override exitRule(listener: PythonListener): void {
    if (listener.exitChainableTerm) {
      listener.exitChainableTerm(this);
    }
  }
  public override accept<Result>(visitor: PythonVisitor<Result>): Result | null {
    if (visitor.visitChainableTerm) {
      return visitor.visitChainableTerm(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}
export class TupleTermContext extends TermContext {
  public constructor(ctx: TermContext) {
    super(ctx.parent, ctx.invokingState);
    super.copyFrom(ctx);
  }
  public tuple(): TupleContext {
    return this.getRuleContext(0, TupleContext)!;
  }
  public override enterRule(listener: PythonListener): void {
    if (listener.enterTupleTerm) {
      listener.enterTupleTerm(this);
    }
  }
  public override exitRule(listener: PythonListener): void {
    if (listener.exitTupleTerm) {
      listener.exitTupleTerm(this);
    }
  }
  public override accept<Result>(visitor: PythonVisitor<Result>): Result | null {
    if (visitor.visitTupleTerm) {
      return visitor.visitTupleTerm(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}
export class ThisInstanceTermContext extends TermContext {
  public constructor(ctx: TermContext) {
    super(ctx.parent, ctx.invokingState);
    super.copyFrom(ctx);
  }
  public thisInstance(): ThisInstanceContext {
    return this.getRuleContext(0, ThisInstanceContext)!;
  }
  public override enterRule(listener: PythonListener): void {
    if (listener.enterThisInstanceTerm) {
      listener.enterThisInstanceTerm(this);
    }
  }
  public override exitRule(listener: PythonListener): void {
    if (listener.exitThisInstanceTerm) {
      listener.exitThisInstanceTerm(this);
    }
  }
  public override accept<Result>(visitor: PythonVisitor<Result>): Result | null {
    if (visitor.visitThisInstanceTerm) {
      return visitor.visitThisInstanceTerm(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}
export class ListTermContext extends TermContext {
  public constructor(ctx: TermContext) {
    super(ctx.parent, ctx.invokingState);
    super.copyFrom(ctx);
  }
  public list(): ListContext {
    return this.getRuleContext(0, ListContext)!;
  }
  public override enterRule(listener: PythonListener): void {
    if (listener.enterListTerm) {
      listener.enterListTerm(this);
    }
  }
  public override exitRule(listener: PythonListener): void {
    if (listener.exitListTerm) {
      listener.exitListTerm(this);
    }
  }
  public override accept<Result>(visitor: PythonVisitor<Result>): Result | null {
    if (visitor.visitListTerm) {
      return visitor.visitListTerm(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class ChainableContext extends antlr.ParserRuleContext {
  public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
    super(parent, invokingState);
  }
  public identifierUse(): IdentifierUseContext | null {
    return this.getRuleContext(0, IdentifierUseContext);
  }
  public methodCall(): MethodCallContext | null {
    return this.getRuleContext(0, MethodCallContext);
  }
  public override get ruleIndex(): number {
    return PythonParser.RULE_chainable;
  }
  public override enterRule(listener: PythonListener): void {
    if (listener.enterChainable) {
      listener.enterChainable(this);
    }
  }
  public override exitRule(listener: PythonListener): void {
    if (listener.exitChainable) {
      listener.exitChainable(this);
    }
  }
  public override accept<Result>(visitor: PythonVisitor<Result>): Result | null {
    if (visitor.visitChainable) {
      return visitor.visitChainable(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class ThisInstanceContext extends antlr.ParserRuleContext {
  public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
    super(parent, invokingState);
  }
  public THIS_INSTANCE(): antlr.TerminalNode {
    return this.getToken(PythonParser.THIS_INSTANCE, 0)!;
  }
  public override get ruleIndex(): number {
    return PythonParser.RULE_thisInstance;
  }
  public override enterRule(listener: PythonListener): void {
    if (listener.enterThisInstance) {
      listener.enterThisInstance(this);
    }
  }
  public override exitRule(listener: PythonListener): void {
    if (listener.exitThisInstance) {
      listener.exitThisInstance(this);
    }
  }
  public override accept<Result>(visitor: PythonVisitor<Result>): Result | null {
    if (visitor.visitThisInstance) {
      return visitor.visitThisInstance(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class BracketedExpressionContext extends antlr.ParserRuleContext {
  public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
    super(parent, invokingState);
  }
  public OPEN_BRACKET(): antlr.TerminalNode {
    return this.getToken(PythonParser.OPEN_BRACKET, 0)!;
  }
  public expression(): ExpressionContext {
    return this.getRuleContext(0, ExpressionContext)!;
  }
  public CLOSE_BRACKET(): antlr.TerminalNode {
    return this.getToken(PythonParser.CLOSE_BRACKET, 0)!;
  }
  public override get ruleIndex(): number {
    return PythonParser.RULE_bracketedExpression;
  }
  public override enterRule(listener: PythonListener): void {
    if (listener.enterBracketedExpression) {
      listener.enterBracketedExpression(this);
    }
  }
  public override exitRule(listener: PythonListener): void {
    if (listener.exitBracketedExpression) {
      listener.exitBracketedExpression(this);
    }
  }
  public override accept<Result>(visitor: PythonVisitor<Result>): Result | null {
    if (visitor.visitBracketedExpression) {
      return visitor.visitBracketedExpression(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class UnaryExpressionContext extends antlr.ParserRuleContext {
  public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
    super(parent, invokingState);
  }
  public negateNumeric(): NegateNumericContext | null {
    return this.getRuleContext(0, NegateNumericContext);
  }
  public negateLogical(): NegateLogicalContext | null {
    return this.getRuleContext(0, NegateLogicalContext);
  }
  public override get ruleIndex(): number {
    return PythonParser.RULE_unaryExpression;
  }
  public override enterRule(listener: PythonListener): void {
    if (listener.enterUnaryExpression) {
      listener.enterUnaryExpression(this);
    }
  }
  public override exitRule(listener: PythonListener): void {
    if (listener.exitUnaryExpression) {
      listener.exitUnaryExpression(this);
    }
  }
  public override accept<Result>(visitor: PythonVisitor<Result>): Result | null {
    if (visitor.visitUnaryExpression) {
      return visitor.visitUnaryExpression(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class NegateNumericContext extends antlr.ParserRuleContext {
  public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
    super(parent, invokingState);
  }
  public MINUS(): antlr.TerminalNode {
    return this.getToken(PythonParser.MINUS, 0)!;
  }
  public term(): TermContext {
    return this.getRuleContext(0, TermContext)!;
  }
  public override get ruleIndex(): number {
    return PythonParser.RULE_negateNumeric;
  }
  public override enterRule(listener: PythonListener): void {
    if (listener.enterNegateNumeric) {
      listener.enterNegateNumeric(this);
    }
  }
  public override exitRule(listener: PythonListener): void {
    if (listener.exitNegateNumeric) {
      listener.exitNegateNumeric(this);
    }
  }
  public override accept<Result>(visitor: PythonVisitor<Result>): Result | null {
    if (visitor.visitNegateNumeric) {
      return visitor.visitNegateNumeric(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class NegateLogicalContext extends antlr.ParserRuleContext {
  public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
    super(parent, invokingState);
  }
  public NOT(): antlr.TerminalNode {
    return this.getToken(PythonParser.NOT, 0)!;
  }
  public term(): TermContext {
    return this.getRuleContext(0, TermContext)!;
  }
  public override get ruleIndex(): number {
    return PythonParser.RULE_negateLogical;
  }
  public override enterRule(listener: PythonListener): void {
    if (listener.enterNegateLogical) {
      listener.enterNegateLogical(this);
    }
  }
  public override exitRule(listener: PythonListener): void {
    if (listener.exitNegateLogical) {
      listener.exitNegateLogical(this);
    }
  }
  public override accept<Result>(visitor: PythonVisitor<Result>): Result | null {
    if (visitor.visitNegateLogical) {
      return visitor.visitNegateLogical(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class BinaryExpressionContext extends antlr.ParserRuleContext {
  public _left?: TermContext;
  public _right?: ExpressionContext;
  public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
    super(parent, invokingState);
  }
  public binaryOperator(): BinaryOperatorContext {
    return this.getRuleContext(0, BinaryOperatorContext)!;
  }
  public term(): TermContext {
    return this.getRuleContext(0, TermContext)!;
  }
  public expression(): ExpressionContext {
    return this.getRuleContext(0, ExpressionContext)!;
  }
  public override get ruleIndex(): number {
    return PythonParser.RULE_binaryExpression;
  }
  public override enterRule(listener: PythonListener): void {
    if (listener.enterBinaryExpression) {
      listener.enterBinaryExpression(this);
    }
  }
  public override exitRule(listener: PythonListener): void {
    if (listener.exitBinaryExpression) {
      listener.exitBinaryExpression(this);
    }
  }
  public override accept<Result>(visitor: PythonVisitor<Result>): Result | null {
    if (visitor.visitBinaryExpression) {
      return visitor.visitBinaryExpression(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class ListContext extends antlr.ParserRuleContext {
  public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
    super(parent, invokingState);
  }
  public OPEN_SQ_BRACKET(): antlr.TerminalNode {
    return this.getToken(PythonParser.OPEN_SQ_BRACKET, 0)!;
  }
  public expressionList(): ExpressionListContext {
    return this.getRuleContext(0, ExpressionListContext)!;
  }
  public CLOSE_SQ_BRACKET(): antlr.TerminalNode {
    return this.getToken(PythonParser.CLOSE_SQ_BRACKET, 0)!;
  }
  public override get ruleIndex(): number {
    return PythonParser.RULE_list;
  }
  public override enterRule(listener: PythonListener): void {
    if (listener.enterList) {
      listener.enterList(this);
    }
  }
  public override exitRule(listener: PythonListener): void {
    if (listener.exitList) {
      listener.exitList(this);
    }
  }
  public override accept<Result>(visitor: PythonVisitor<Result>): Result | null {
    if (visitor.visitList) {
      return visitor.visitList(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class TupleContext extends antlr.ParserRuleContext {
  public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
    super(parent, invokingState);
  }
  public OPEN_BRACKET(): antlr.TerminalNode {
    return this.getToken(PythonParser.OPEN_BRACKET, 0)!;
  }
  public expressionList(): ExpressionListContext {
    return this.getRuleContext(0, ExpressionListContext)!;
  }
  public CLOSE_BRACKET(): antlr.TerminalNode {
    return this.getToken(PythonParser.CLOSE_BRACKET, 0)!;
  }
  public override get ruleIndex(): number {
    return PythonParser.RULE_tuple;
  }
  public override enterRule(listener: PythonListener): void {
    if (listener.enterTuple) {
      listener.enterTuple(this);
    }
  }
  public override exitRule(listener: PythonListener): void {
    if (listener.exitTuple) {
      listener.exitTuple(this);
    }
  }
  public override accept<Result>(visitor: PythonVisitor<Result>): Result | null {
    if (visitor.visitTuple) {
      return visitor.visitTuple(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class DictionaryContext extends antlr.ParserRuleContext {
  public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
    super(parent, invokingState);
  }
  public OPEN_BRACE(): antlr.TerminalNode {
    return this.getToken(PythonParser.OPEN_BRACE, 0)!;
  }
  public kvpList(): KvpListContext {
    return this.getRuleContext(0, KvpListContext)!;
  }
  public CLOSE_BRACE(): antlr.TerminalNode {
    return this.getToken(PythonParser.CLOSE_BRACE, 0)!;
  }
  public override get ruleIndex(): number {
    return PythonParser.RULE_dictionary;
  }
  public override enterRule(listener: PythonListener): void {
    if (listener.enterDictionary) {
      listener.enterDictionary(this);
    }
  }
  public override exitRule(listener: PythonListener): void {
    if (listener.exitDictionary) {
      listener.exitDictionary(this);
    }
  }
  public override accept<Result>(visitor: PythonVisitor<Result>): Result | null {
    if (visitor.visitDictionary) {
      return visitor.visitDictionary(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class KvpListContext extends antlr.ParserRuleContext {
  public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
    super(parent, invokingState);
  }
  public kvp(): KvpContext[];
  public kvp(i: number): KvpContext | null;
  public kvp(i?: number): KvpContext[] | KvpContext | null {
    if (i === undefined) {
      return this.getRuleContexts(KvpContext);
    }

    return this.getRuleContext(i, KvpContext);
  }
  public COMMA(): antlr.TerminalNode[];
  public COMMA(i: number): antlr.TerminalNode | null;
  public COMMA(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    if (i === undefined) {
      return this.getTokens(PythonParser.COMMA);
    } else {
      return this.getToken(PythonParser.COMMA, i);
    }
  }
  public override get ruleIndex(): number {
    return PythonParser.RULE_kvpList;
  }
  public override enterRule(listener: PythonListener): void {
    if (listener.enterKvpList) {
      listener.enterKvpList(this);
    }
  }
  public override exitRule(listener: PythonListener): void {
    if (listener.exitKvpList) {
      listener.exitKvpList(this);
    }
  }
  public override accept<Result>(visitor: PythonVisitor<Result>): Result | null {
    if (visitor.visitKvpList) {
      return visitor.visitKvpList(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class KvpContext extends antlr.ParserRuleContext {
  public _key?: ExpressionContext;
  public _value?: ExpressionContext;
  public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
    super(parent, invokingState);
  }
  public COLON(): antlr.TerminalNode {
    return this.getToken(PythonParser.COLON, 0)!;
  }
  public expression(): ExpressionContext[];
  public expression(i: number): ExpressionContext | null;
  public expression(i?: number): ExpressionContext[] | ExpressionContext | null {
    if (i === undefined) {
      return this.getRuleContexts(ExpressionContext);
    }

    return this.getRuleContext(i, ExpressionContext);
  }
  public override get ruleIndex(): number {
    return PythonParser.RULE_kvp;
  }
  public override enterRule(listener: PythonListener): void {
    if (listener.enterKvp) {
      listener.enterKvp(this);
    }
  }
  public override exitRule(listener: PythonListener): void {
    if (listener.exitKvp) {
      listener.exitKvp(this);
    }
  }
  public override accept<Result>(visitor: PythonVisitor<Result>): Result | null {
    if (visitor.visitKvp) {
      return visitor.visitKvp(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class MethodCallContext extends antlr.ParserRuleContext {
  public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
    super(parent, invokingState);
  }
  public methodName(): MethodNameContext {
    return this.getRuleContext(0, MethodNameContext)!;
  }
  public OPEN_BRACKET(): antlr.TerminalNode {
    return this.getToken(PythonParser.OPEN_BRACKET, 0)!;
  }
  public CLOSE_BRACKET(): antlr.TerminalNode {
    return this.getToken(PythonParser.CLOSE_BRACKET, 0)!;
  }
  public argList(): ArgListContext | null {
    return this.getRuleContext(0, ArgListContext);
  }
  public override get ruleIndex(): number {
    return PythonParser.RULE_methodCall;
  }
  public override enterRule(listener: PythonListener): void {
    if (listener.enterMethodCall) {
      listener.enterMethodCall(this);
    }
  }
  public override exitRule(listener: PythonListener): void {
    if (listener.exitMethodCall) {
      listener.exitMethodCall(this);
    }
  }
  public override accept<Result>(visitor: PythonVisitor<Result>): Result | null {
    if (visitor.visitMethodCall) {
      return visitor.visitMethodCall(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class BinaryOperatorContext extends antlr.ParserRuleContext {
  public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
    super(parent, invokingState);
  }
  public EQUAL(): antlr.TerminalNode | null {
    return this.getToken(PythonParser.EQUAL, 0);
  }
  public NOT_EQUAL(): antlr.TerminalNode | null {
    return this.getToken(PythonParser.NOT_EQUAL, 0);
  }
  public GT(): antlr.TerminalNode | null {
    return this.getToken(PythonParser.GT, 0);
  }
  public LT(): antlr.TerminalNode | null {
    return this.getToken(PythonParser.LT, 0);
  }
  public GE(): antlr.TerminalNode | null {
    return this.getToken(PythonParser.GE, 0);
  }
  public LE(): antlr.TerminalNode | null {
    return this.getToken(PythonParser.LE, 0);
  }
  public MULT(): antlr.TerminalNode | null {
    return this.getToken(PythonParser.MULT, 0);
  }
  public DIVIDE(): antlr.TerminalNode | null {
    return this.getToken(PythonParser.DIVIDE, 0);
  }
  public PLUS(): antlr.TerminalNode | null {
    return this.getToken(PythonParser.PLUS, 0);
  }
  public MINUS(): antlr.TerminalNode | null {
    return this.getToken(PythonParser.MINUS, 0);
  }
  public AND(): antlr.TerminalNode | null {
    return this.getToken(PythonParser.AND, 0);
  }
  public OR(): antlr.TerminalNode | null {
    return this.getToken(PythonParser.OR, 0);
  }
  public MOD(): antlr.TerminalNode | null {
    return this.getToken(PythonParser.MOD, 0);
  }
  public POWER(): antlr.TerminalNode | null {
    return this.getToken(PythonParser.POWER, 0);
  }
  public override get ruleIndex(): number {
    return PythonParser.RULE_binaryOperator;
  }
  public override enterRule(listener: PythonListener): void {
    if (listener.enterBinaryOperator) {
      listener.enterBinaryOperator(this);
    }
  }
  public override exitRule(listener: PythonListener): void {
    if (listener.exitBinaryOperator) {
      listener.exitBinaryOperator(this);
    }
  }
  public override accept<Result>(visitor: PythonVisitor<Result>): Result | null {
    if (visitor.visitBinaryOperator) {
      return visitor.visitBinaryOperator(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class NewInstanceContext extends antlr.ParserRuleContext {
  public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
    super(parent, invokingState);
  }
  public type(): TypeContext {
    return this.getRuleContext(0, TypeContext)!;
  }
  public OPEN_BRACKET(): antlr.TerminalNode {
    return this.getToken(PythonParser.OPEN_BRACKET, 0)!;
  }
  public CLOSE_BRACKET(): antlr.TerminalNode {
    return this.getToken(PythonParser.CLOSE_BRACKET, 0)!;
  }
  public argList(): ArgListContext | null {
    return this.getRuleContext(0, ArgListContext);
  }
  public override get ruleIndex(): number {
    return PythonParser.RULE_newInstance;
  }
  public override enterRule(listener: PythonListener): void {
    if (listener.enterNewInstance) {
      listener.enterNewInstance(this);
    }
  }
  public override exitRule(listener: PythonListener): void {
    if (listener.exitNewInstance) {
      listener.exitNewInstance(this);
    }
  }
  public override accept<Result>(visitor: PythonVisitor<Result>): Result | null {
    if (visitor.visitNewInstance) {
      return visitor.visitNewInstance(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class ParamDefContext extends antlr.ParserRuleContext {
  public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
    super(parent, invokingState);
  }
  public identifierDef(): IdentifierDefContext {
    return this.getRuleContext(0, IdentifierDefContext)!;
  }
  public COLON(): antlr.TerminalNode {
    return this.getToken(PythonParser.COLON, 0)!;
  }
  public type(): TypeContext {
    return this.getRuleContext(0, TypeContext)!;
  }
  public override get ruleIndex(): number {
    return PythonParser.RULE_paramDef;
  }
  public override enterRule(listener: PythonListener): void {
    if (listener.enterParamDef) {
      listener.enterParamDef(this);
    }
  }
  public override exitRule(listener: PythonListener): void {
    if (listener.exitParamDef) {
      listener.exitParamDef(this);
    }
  }
  public override accept<Result>(visitor: PythonVisitor<Result>): Result | null {
    if (visitor.visitParamDef) {
      return visitor.visitParamDef(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class TypeGenericContext extends antlr.ParserRuleContext {
  public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
    super(parent, invokingState);
  }
  public typeName(): TypeNameContext {
    return this.getRuleContext(0, TypeNameContext)!;
  }
  public OPEN_SQ_BRACKET(): antlr.TerminalNode {
    return this.getToken(PythonParser.OPEN_SQ_BRACKET, 0)!;
  }
  public type_(): TypeContext[];
  public type_(i: number): TypeContext | null;
  public type_(i?: number): TypeContext[] | TypeContext | null {
    if (i === undefined) {
      return this.getRuleContexts(TypeContext);
    }

    return this.getRuleContext(i, TypeContext);
  }
  public CLOSE_SQ_BRACKET(): antlr.TerminalNode {
    return this.getToken(PythonParser.CLOSE_SQ_BRACKET, 0)!;
  }
  public COMMA(): antlr.TerminalNode[];
  public COMMA(i: number): antlr.TerminalNode | null;
  public COMMA(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    if (i === undefined) {
      return this.getTokens(PythonParser.COMMA);
    } else {
      return this.getToken(PythonParser.COMMA, i);
    }
  }
  public override get ruleIndex(): number {
    return PythonParser.RULE_typeGeneric;
  }
  public override enterRule(listener: PythonListener): void {
    if (listener.enterTypeGeneric) {
      listener.enterTypeGeneric(this);
    }
  }
  public override exitRule(listener: PythonListener): void {
    if (listener.exitTypeGeneric) {
      listener.exitTypeGeneric(this);
    }
  }
  public override accept<Result>(visitor: PythonVisitor<Result>): Result | null {
    if (visitor.visitTypeGeneric) {
      return visitor.visitTypeGeneric(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class TypeFuncContext extends antlr.ParserRuleContext {
  public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
    super(parent, invokingState);
  }
  public FUNC_NAME(): antlr.TerminalNode {
    return this.getToken(PythonParser.FUNC_NAME, 0)!;
  }
  public OPEN_SQ_BRACKET(): antlr.TerminalNode[];
  public OPEN_SQ_BRACKET(i: number): antlr.TerminalNode | null;
  public OPEN_SQ_BRACKET(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    if (i === undefined) {
      return this.getTokens(PythonParser.OPEN_SQ_BRACKET);
    } else {
      return this.getToken(PythonParser.OPEN_SQ_BRACKET, i);
    }
  }
  public type_(): TypeContext[];
  public type_(i: number): TypeContext | null;
  public type_(i?: number): TypeContext[] | TypeContext | null {
    if (i === undefined) {
      return this.getRuleContexts(TypeContext);
    }

    return this.getRuleContext(i, TypeContext);
  }
  public CLOSE_SQ_BRACKET(): antlr.TerminalNode[];
  public CLOSE_SQ_BRACKET(i: number): antlr.TerminalNode | null;
  public CLOSE_SQ_BRACKET(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    if (i === undefined) {
      return this.getTokens(PythonParser.CLOSE_SQ_BRACKET);
    } else {
      return this.getToken(PythonParser.CLOSE_SQ_BRACKET, i);
    }
  }
  public COMMA(): antlr.TerminalNode[];
  public COMMA(i: number): antlr.TerminalNode | null;
  public COMMA(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    if (i === undefined) {
      return this.getTokens(PythonParser.COMMA);
    } else {
      return this.getToken(PythonParser.COMMA, i);
    }
  }
  public override get ruleIndex(): number {
    return PythonParser.RULE_typeFunc;
  }
  public override enterRule(listener: PythonListener): void {
    if (listener.enterTypeFunc) {
      listener.enterTypeFunc(this);
    }
  }
  public override exitRule(listener: PythonListener): void {
    if (listener.exitTypeFunc) {
      listener.exitTypeFunc(this);
    }
  }
  public override accept<Result>(visitor: PythonVisitor<Result>): Result | null {
    if (visitor.visitTypeFunc) {
      return visitor.visitTypeFunc(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class TypeTupleContext extends antlr.ParserRuleContext {
  public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
    super(parent, invokingState);
  }
  public TUPLE(): antlr.TerminalNode {
    return this.getToken(PythonParser.TUPLE, 0)!;
  }
  public OPEN_SQ_BRACKET(): antlr.TerminalNode {
    return this.getToken(PythonParser.OPEN_SQ_BRACKET, 0)!;
  }
  public type_(): TypeContext[];
  public type_(i: number): TypeContext | null;
  public type_(i?: number): TypeContext[] | TypeContext | null {
    if (i === undefined) {
      return this.getRuleContexts(TypeContext);
    }

    return this.getRuleContext(i, TypeContext);
  }
  public CLOSE_SQ_BRACKET(): antlr.TerminalNode {
    return this.getToken(PythonParser.CLOSE_SQ_BRACKET, 0)!;
  }
  public COMMA(): antlr.TerminalNode[];
  public COMMA(i: number): antlr.TerminalNode | null;
  public COMMA(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    if (i === undefined) {
      return this.getTokens(PythonParser.COMMA);
    } else {
      return this.getToken(PythonParser.COMMA, i);
    }
  }
  public override get ruleIndex(): number {
    return PythonParser.RULE_typeTuple;
  }
  public override enterRule(listener: PythonListener): void {
    if (listener.enterTypeTuple) {
      listener.enterTypeTuple(this);
    }
  }
  public override exitRule(listener: PythonListener): void {
    if (listener.exitTypeTuple) {
      listener.exitTypeTuple(this);
    }
  }
  public override accept<Result>(visitor: PythonVisitor<Result>): Result | null {
    if (visitor.visitTypeTuple) {
      return visitor.visitTypeTuple(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class LambdaContext extends antlr.ParserRuleContext {
  public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
    super(parent, invokingState);
  }
  public LAMBDA(): antlr.TerminalNode {
    return this.getToken(PythonParser.LAMBDA, 0)!;
  }
  public paramList(): ParamListContext {
    return this.getRuleContext(0, ParamListContext)!;
  }
  public COLON(): antlr.TerminalNode {
    return this.getToken(PythonParser.COLON, 0)!;
  }
  public expression(): ExpressionContext {
    return this.getRuleContext(0, ExpressionContext)!;
  }
  public override get ruleIndex(): number {
    return PythonParser.RULE_lambda;
  }
  public override enterRule(listener: PythonListener): void {
    if (listener.enterLambda) {
      listener.enterLambda(this);
    }
  }
  public override exitRule(listener: PythonListener): void {
    if (listener.exitLambda) {
      listener.exitLambda(this);
    }
  }
  public override accept<Result>(visitor: PythonVisitor<Result>): Result | null {
    if (visitor.visitLambda) {
      return visitor.visitLambda(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class InterpolatedStringContext extends antlr.ParserRuleContext {
  public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
    super(parent, invokingState);
  }
  public INTERPOLATED_STRING(): antlr.TerminalNode {
    return this.getToken(PythonParser.INTERPOLATED_STRING, 0)!;
  }
  public override get ruleIndex(): number {
    return PythonParser.RULE_interpolatedString;
  }
  public override enterRule(listener: PythonListener): void {
    if (listener.enterInterpolatedString) {
      listener.enterInterpolatedString(this);
    }
  }
  public override exitRule(listener: PythonListener): void {
    if (listener.exitInterpolatedString) {
      listener.exitInterpolatedString(this);
    }
  }
  public override accept<Result>(visitor: PythonVisitor<Result>): Result | null {
    if (visitor.visitInterpolatedString) {
      return visitor.visitInterpolatedString(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}
