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
  public static readonly PRINT = 11;
  public static readonly RETURN = 12;
  public static readonly TRY = 13;
  public static readonly WHILE = 14;
  public static readonly IF_ = 15;
  public static readonly ABSTRACT = 16;
  public static readonly ASSERT = 17;
  public static readonly ASSIGN = 18;
  public static readonly BE = 19;
  public static readonly CALL = 20;
  public static readonly CATCH = 21;
  public static readonly CONSTANT = 22;
  public static readonly CONSTRUCTOR = 23;
  public static readonly COPY = 24;
  public static readonly DIV = 25;
  public static readonly END = 26;
  public static readonly EVALUATES = 27;
  public static readonly FROM = 28;
  public static readonly FUNCTION = 29;
  public static readonly INHERITS = 30;
  public static readonly LET = 31;
  public static readonly NEW = 32;
  public static readonly PRIVATE = 33;
  public static readonly PROCEDURE = 34;
  public static readonly PROPERTY = 35;
  public static readonly RETURNS = 36;
  public static readonly SET = 37;
  public static readonly STEP = 38;
  public static readonly TEST = 39;
  public static readonly THEN = 40;
  public static readonly THROW = 41;
  public static readonly TO = 42;
  public static readonly VARIABLE = 43;
  public static readonly ABSTRACT_METHOD = 44;
  public static readonly ASSERT_EQUAL = 45;
  public static readonly AS = 46;
  public static readonly DEF = 47;
  public static readonly EXCEPT = 48;
  public static readonly INIT = 49;
  public static readonly NONE = 50;
  public static readonly PASS = 51;
  public static readonly RAISE = 52;
  public static readonly ABC = 53;
  public static readonly TESTCASE = 54;
  public static readonly TUPLE = 55;
  public static readonly INT_NAME = 56;
  public static readonly FLOAT_NAME = 57;
  public static readonly BOOL_NAME = 58;
  public static readonly STRING_NAME = 59;
  public static readonly LIST_NAME = 60;
  public static readonly FUNC_NAME = 61;
  public static readonly TRUE = 62;
  public static readonly FALSE = 63;
  public static readonly AND = 64;
  public static readonly OR = 65;
  public static readonly NOT = 66;
  public static readonly EQUAL = 67;
  public static readonly NOT_EQUAL = 68;
  public static readonly MOD = 69;
  public static readonly ARROW = 70;
  public static readonly POWER = 71;
  public static readonly BINARY_PREFIX = 72;
  public static readonly HEX_PREFIX = 73;
  public static readonly THIS_INSTANCE = 74;
  public static readonly SINGLE_EQUALS = 75;
  public static readonly OPEN_BRACE = 76;
  public static readonly CLOSE_BRACE = 77;
  public static readonly OPEN_SQ_BRACKET = 78;
  public static readonly CLOSE_SQ_BRACKET = 79;
  public static readonly OPEN_BRACKET = 80;
  public static readonly CLOSE_BRACKET = 81;
  public static readonly DOT = 82;
  public static readonly COMMA = 83;
  public static readonly COLON = 84;
  public static readonly PLUS = 85;
  public static readonly MINUS = 86;
  public static readonly MULT = 87;
  public static readonly DIVIDE = 88;
  public static readonly LT = 89;
  public static readonly GT = 90;
  public static readonly LE = 91;
  public static readonly GE = 92;
  public static readonly DOUBLE_QUOTES = 93;
  public static readonly WS = 94;
  public static readonly NL = 95;
  public static readonly NAME_STARTING_TEST_ = 96;
  public static readonly NAME_STARTING_LC = 97;
  public static readonly NAME_STARTING_UC = 98;
  public static readonly LITERAL_BINARY = 99;
  public static readonly LITERAL_HEX = 100;
  public static readonly LITERAL_INTEGER = 101;
  public static readonly LITERAL_FLOAT = 102;
  public static readonly LITERAL_STRING = 103;
  public static readonly INTERPOLATED_STRING = 104;
  public static readonly LITERAL_REGEXP = 105;
  public static readonly WHITESPACES = 106;
  public static readonly TEXT = 107;
  public static readonly GHOSTED = 108;
  public static readonly FUNCTION_ANNOTATION = 109;
  public static readonly PROCECDURE_ANNOTATION = 110;
  public static readonly CONSTANT_ANNOTATION = 111;
  public static readonly ENUM_ANNOTATION = 112;
  public static readonly CONCRETE_CLASS_ANNOTATION = 113;
  public static readonly ABSTRACT_CLASS_ANNOTATION = 114;
  public static readonly VARIABLE_ANNOTATION = 115;
  public static readonly ASSIGNMENT_ANNOTATION = 116;
  public static readonly INPUT_ANNOTATION = 117;
  public static readonly CALL_ANNOTATION = 118;
  public static readonly ELSE_IF_ANNOTATION = 119;
  public static readonly PROPERTY_ANNOTATION = 120;
  public static readonly FUNCTION_METHOD_ANNOTATION = 121;
  public static readonly PROCEDURE_METHOD_ANNOTATION = 122;
  public static readonly COMMENT = 123;
  public static readonly RULE_file = 0;
  public static readonly RULE_global = 1;
  public static readonly RULE_main = 2;
  public static readonly RULE_function = 3;
  public static readonly RULE_test = 4;
  public static readonly RULE_procedure = 5;
  public static readonly RULE_constant = 6;
  public static readonly RULE_enum = 7;
  public static readonly RULE_concreteClass = 8;
  public static readonly RULE_abstractClass = 9;
  public static readonly RULE_comment = 10;
  public static readonly RULE_commentText = 11;
  public static readonly RULE_ordinaryStatement = 12;
  public static readonly RULE_print = 13;
  public static readonly RULE_variableDefinition = 14;
  public static readonly RULE_assignment = 15;
  public static readonly RULE_ifStatement = 16;
  public static readonly RULE_whileLoop = 17;
  public static readonly RULE_forLoop = 18;
  public static readonly RULE_procedureCall = 19;
  public static readonly RULE_procRef = 20;
  public static readonly RULE_thisProcRef = 21;
  public static readonly RULE_instanceProcRef = 22;
  public static readonly RULE_identifierWithOptIndexes = 23;
  public static readonly RULE_tryStatement = 24;
  public static readonly RULE_throwStatement = 25;
  public static readonly RULE_errorMessage = 26;
  public static readonly RULE_assert = 27;
  public static readonly RULE_returnStatement = 28;
  public static readonly RULE_elseIfClause = 29;
  public static readonly RULE_elseClause = 30;
  public static readonly RULE_catchStatement = 31;
  public static readonly RULE_constructorMember = 32;
  public static readonly RULE_property = 33;
  public static readonly RULE_functionMethod = 34;
  public static readonly RULE_procedureMethod = 35;
  public static readonly RULE_abstractFunction = 36;
  public static readonly RULE_abstractProcedure = 37;
  public static readonly RULE_identifierDef = 38;
  public static readonly RULE_identifierUse = 39;
  public static readonly RULE_assignable = 40;
  public static readonly RULE_methodName = 41;
  public static readonly RULE_testName = 42;
  public static readonly RULE_typeName = 43;
  public static readonly RULE_constantValue = 44;
  public static readonly RULE_argList = 45;
  public static readonly RULE_argument = 46;
  public static readonly RULE_paramList = 47;
  public static readonly RULE_identifierList = 48;
  public static readonly RULE_expressionList = 49;
  public static readonly RULE_type = 50;
  public static readonly RULE_assertActual = 51;
  public static readonly RULE_assertExpected = 52;
  public static readonly RULE_litValue = 53;
  public static readonly RULE_litBoolean = 54;
  public static readonly RULE_litInt = 55;
  public static readonly RULE_litFloat = 56;
  public static readonly RULE_litString = 57;
  public static readonly RULE_enumValue = 58;
  public static readonly RULE_litRegExp = 59;
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
    "'print'",
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
    null,
    "'[ghosted]'",
    "'# function'",
    "'# procedure'",
    "'# constant'",
    "'# enum'",
    "'# concrete class'",
    "'# abstract class'",
    "'# variable definition'",
    "'# assignment'",
    "'# input statement'",
    "'# procedure call'",
    "'# else if'",
    "'# property'",
    "'# function method'",
    "'# procedure method'",
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
    "PRINT",
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
    "LITERAL_REGEXP",
    "WHITESPACES",
    "TEXT",
    "GHOSTED",
    "FUNCTION_ANNOTATION",
    "PROCECDURE_ANNOTATION",
    "CONSTANT_ANNOTATION",
    "ENUM_ANNOTATION",
    "CONCRETE_CLASS_ANNOTATION",
    "ABSTRACT_CLASS_ANNOTATION",
    "VARIABLE_ANNOTATION",
    "ASSIGNMENT_ANNOTATION",
    "INPUT_ANNOTATION",
    "CALL_ANNOTATION",
    "ELSE_IF_ANNOTATION",
    "PROPERTY_ANNOTATION",
    "FUNCTION_METHOD_ANNOTATION",
    "PROCEDURE_METHOD_ANNOTATION",
    "COMMENT",
  ];
  public static readonly ruleNames = [
    "file",
    "global",
    "main",
    "function",
    "test",
    "procedure",
    "constant",
    "enum",
    "concreteClass",
    "abstractClass",
    "comment",
    "commentText",
    "ordinaryStatement",
    "print",
    "variableDefinition",
    "assignment",
    "ifStatement",
    "whileLoop",
    "forLoop",
    "procedureCall",
    "procRef",
    "thisProcRef",
    "instanceProcRef",
    "identifierWithOptIndexes",
    "tryStatement",
    "throwStatement",
    "errorMessage",
    "assert",
    "returnStatement",
    "elseIfClause",
    "elseClause",
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
    "litRegExp",
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
          _la === 47 ||
          (((_la - 97) & ~0x1f) === 0 && ((1 << (_la - 97)) & 67110913) !== 0)
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
        while (_la === 95) {
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
      let alternative: number;
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 197;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 108) {
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
        alternative = this.interpreter.adaptivePredict(this.tokenStream, 5, this.context);
        while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
          if (alternative === 1) {
            {
              {
                this.state = 208;
                this.ordinaryStatement();
              }
            }
          }
          this.state = 213;
          this.errorHandler.sync(this);
          alternative = this.interpreter.adaptivePredict(this.tokenStream, 5, this.context);
        }
        this.state = 214;
        this.match(PythonParser.COMMENT);
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
        if (_la === 108) {
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
        if (_la === 97) {
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
        this.state = 230;
        this.match(PythonParser.FUNCTION_ANNOTATION);
        this.state = 231;
        this.match(PythonParser.NL);
        this.state = 235;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (
          ((_la & ~0x1f) === 0 && ((1 << _la) & 26720) !== 0) ||
          _la === 52 ||
          _la === 74 ||
          (((_la - 97) & ~0x1f) === 0 && ((1 << (_la - 97)) & 67110913) !== 0)
        ) {
          {
            {
              this.state = 232;
              this.ordinaryStatement();
            }
          }
          this.state = 237;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 238;
        this.returnStatement();
        this.state = 239;
        this.match(PythonParser.COMMENT);
        this.state = 240;
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
      let alternative: number;
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 243;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 108) {
          {
            this.state = 242;
            this.match(PythonParser.GHOSTED);
          }
        }

        this.state = 245;
        this.match(PythonParser.CLASS);
        this.state = 246;
        this.testName();
        this.state = 247;
        this.match(PythonParser.OPEN_BRACKET);
        this.state = 248;
        this.match(PythonParser.TESTCASE);
        this.state = 249;
        this.match(PythonParser.CLOSE_BRACKET);
        this.state = 250;
        this.match(PythonParser.COMMENT);
        this.state = 251;
        this.match(PythonParser.NL);
        this.state = 257;
        this.errorHandler.sync(this);
        alternative = this.interpreter.adaptivePredict(this.tokenStream, 11, this.context);
        while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
          if (alternative === 1) {
            {
              this.state = 255;
              this.errorHandler.sync(this);
              switch (this.interpreter.adaptivePredict(this.tokenStream, 10, this.context)) {
                case 1:
                  {
                    this.state = 252;
                    this.assert();
                  }
                  break;
                case 2:
                  {
                    this.state = 253;
                    this.variableDefinition();
                  }
                  break;
                case 3:
                  {
                    this.state = 254;
                    this.comment();
                  }
                  break;
              }
            }
          }
          this.state = 259;
          this.errorHandler.sync(this);
          alternative = this.interpreter.adaptivePredict(this.tokenStream, 11, this.context);
        }
        this.state = 260;
        this.match(PythonParser.COMMENT);
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
  public procedure(): ProcedureContext {
    let localContext = new ProcedureContext(this.context, this.state);
    this.enterRule(localContext, 10, PythonParser.RULE_procedure);
    let _la: number;
    try {
      let alternative: number;
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 264;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 108) {
          {
            this.state = 263;
            this.match(PythonParser.GHOSTED);
          }
        }

        this.state = 266;
        this.match(PythonParser.DEF);
        this.state = 267;
        this.methodName();
        this.state = 268;
        this.match(PythonParser.OPEN_BRACKET);
        this.state = 270;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 97) {
          {
            this.state = 269;
            this.paramList();
          }
        }

        this.state = 272;
        this.match(PythonParser.CLOSE_BRACKET);
        this.state = 273;
        this.match(PythonParser.ARROW);
        this.state = 274;
        this.match(PythonParser.NONE);
        this.state = 275;
        this.match(PythonParser.COLON);
        this.state = 276;
        this.match(PythonParser.PROCECDURE_ANNOTATION);
        this.state = 277;
        this.match(PythonParser.NL);
        this.state = 281;
        this.errorHandler.sync(this);
        alternative = this.interpreter.adaptivePredict(this.tokenStream, 14, this.context);
        while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
          if (alternative === 1) {
            {
              {
                this.state = 278;
                this.ordinaryStatement();
              }
            }
          }
          this.state = 283;
          this.errorHandler.sync(this);
          alternative = this.interpreter.adaptivePredict(this.tokenStream, 14, this.context);
        }
        this.state = 284;
        this.match(PythonParser.COMMENT);
        this.state = 285;
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
    this.enterRule(localContext, 12, PythonParser.RULE_constant);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 288;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 108) {
          {
            this.state = 287;
            this.match(PythonParser.GHOSTED);
          }
        }

        this.state = 290;
        this.identifierDef();
        this.state = 291;
        this.match(PythonParser.EQUAL);
        this.state = 292;
        this.constantValue();
        this.state = 293;
        this.match(PythonParser.CONSTANT_ANNOTATION);
        this.state = 294;
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
    this.enterRule(localContext, 14, PythonParser.RULE_enum);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 297;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 108) {
          {
            this.state = 296;
            this.match(PythonParser.GHOSTED);
          }
        }

        this.state = 299;
        this.match(PythonParser.CLASS);
        this.state = 300;
        this.typeName();
        this.state = 301;
        this.match(PythonParser.OPEN_BRACKET);
        this.state = 302;
        this.match(PythonParser.ENUM);
        this.state = 303;
        this.match(PythonParser.CLOSE_BRACKET);
        this.state = 304;
        this.match(PythonParser.COLON);
        this.state = 305;
        this.match(PythonParser.ENUM_ANNOTATION);
        this.state = 306;
        this.match(PythonParser.NL);
        this.state = 307;
        this.identifierList();
        this.state = 308;
        this.match(PythonParser.NL);
        this.state = 309;
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
  public concreteClass(): ConcreteClassContext {
    let localContext = new ConcreteClassContext(this.context, this.state);
    this.enterRule(localContext, 16, PythonParser.RULE_concreteClass);
    let _la: number;
    try {
      let alternative: number;
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 312;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 108) {
          {
            this.state = 311;
            this.match(PythonParser.GHOSTED);
          }
        }

        this.state = 314;
        this.match(PythonParser.CLASS);
        this.state = 315;
        this.typeName();
        this.state = 320;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 80) {
          {
            this.state = 316;
            this.match(PythonParser.OPEN_BRACKET);
            this.state = 317;
            this.typeName();
            this.state = 318;
            this.match(PythonParser.CLOSE_BRACKET);
          }
        }

        this.state = 322;
        this.match(PythonParser.COLON);
        this.state = 323;
        this.match(PythonParser.CONCRETE_CLASS_ANNOTATION);
        this.state = 324;
        this.match(PythonParser.NL);
        this.state = 332;
        this.errorHandler.sync(this);
        alternative = this.interpreter.adaptivePredict(this.tokenStream, 20, this.context);
        while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
          if (alternative === 1) {
            {
              this.state = 330;
              this.errorHandler.sync(this);
              switch (this.interpreter.adaptivePredict(this.tokenStream, 19, this.context)) {
                case 1:
                  {
                    this.state = 325;
                    this.constructorMember();
                  }
                  break;
                case 2:
                  {
                    this.state = 326;
                    this.property();
                  }
                  break;
                case 3:
                  {
                    this.state = 327;
                    this.functionMethod();
                  }
                  break;
                case 4:
                  {
                    this.state = 328;
                    this.procedureMethod();
                  }
                  break;
                case 5:
                  {
                    this.state = 329;
                    this.comment();
                  }
                  break;
              }
            }
          }
          this.state = 334;
          this.errorHandler.sync(this);
          alternative = this.interpreter.adaptivePredict(this.tokenStream, 20, this.context);
        }
        this.state = 335;
        this.match(PythonParser.COMMENT);
        this.state = 336;
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
  public abstractClass(): AbstractClassContext {
    let localContext = new AbstractClassContext(this.context, this.state);
    this.enterRule(localContext, 18, PythonParser.RULE_abstractClass);
    let _la: number;
    try {
      let alternative: number;
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 339;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 108) {
          {
            this.state = 338;
            this.match(PythonParser.GHOSTED);
          }
        }

        this.state = 341;
        this.match(PythonParser.CLASS);
        this.state = 342;
        this.typeName();
        this.state = 347;
        this.errorHandler.sync(this);
        switch (this.tokenStream.LA(1)) {
          case PythonParser.OPEN_BRACKET:
            {
              this.state = 343;
              this.match(PythonParser.OPEN_BRACKET);
              this.state = 344;
              this.typeName();
            }
            break;
          case PythonParser.ABC:
            {
              this.state = 345;
              this.match(PythonParser.ABC);
              this.state = 346;
              this.match(PythonParser.CLOSE_BRACKET);
            }
            break;
          default:
            throw new antlr.NoViableAltException(this);
        }
        this.state = 349;
        this.match(PythonParser.ABSTRACT_CLASS_ANNOTATION);
        this.state = 350;
        this.match(PythonParser.NL);
        this.state = 359;
        this.errorHandler.sync(this);
        alternative = this.interpreter.adaptivePredict(this.tokenStream, 24, this.context);
        while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
          if (alternative === 1) {
            {
              this.state = 357;
              this.errorHandler.sync(this);
              switch (this.interpreter.adaptivePredict(this.tokenStream, 23, this.context)) {
                case 1:
                  {
                    this.state = 351;
                    this.property();
                  }
                  break;
                case 2:
                  {
                    this.state = 352;
                    this.functionMethod();
                  }
                  break;
                case 3:
                  {
                    this.state = 353;
                    this.procedureMethod();
                  }
                  break;
                case 4:
                  {
                    this.state = 354;
                    this.abstractFunction();
                  }
                  break;
                case 5:
                  {
                    this.state = 355;
                    this.abstractProcedure();
                  }
                  break;
                case 6:
                  {
                    this.state = 356;
                    this.comment();
                  }
                  break;
              }
            }
          }
          this.state = 361;
          this.errorHandler.sync(this);
          alternative = this.interpreter.adaptivePredict(this.tokenStream, 24, this.context);
        }
        this.state = 362;
        this.match(PythonParser.COMMENT);
        this.state = 363;
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
  public comment(): CommentContext {
    let localContext = new CommentContext(this.context, this.state);
    this.enterRule(localContext, 20, PythonParser.RULE_comment);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 365;
        this.commentText();
        this.state = 366;
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
    this.enterRule(localContext, 22, PythonParser.RULE_commentText);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 368;
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
    this.enterRule(localContext, 24, PythonParser.RULE_ordinaryStatement);
    try {
      this.state = 380;
      this.errorHandler.sync(this);
      switch (this.interpreter.adaptivePredict(this.tokenStream, 25, this.context)) {
        case 1:
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 370;
            this.print();
          }
          break;
        case 2:
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 371;
            this.variableDefinition();
          }
          break;
        case 3:
          this.enterOuterAlt(localContext, 3);
          {
            this.state = 372;
            this.assignment();
          }
          break;
        case 4:
          this.enterOuterAlt(localContext, 4);
          {
            this.state = 373;
            this.ifStatement();
          }
          break;
        case 5:
          this.enterOuterAlt(localContext, 5);
          {
            this.state = 374;
            this.whileLoop();
          }
          break;
        case 6:
          this.enterOuterAlt(localContext, 6);
          {
            this.state = 375;
            this.forLoop();
          }
          break;
        case 7:
          this.enterOuterAlt(localContext, 7);
          {
            this.state = 376;
            this.procedureCall();
          }
          break;
        case 8:
          this.enterOuterAlt(localContext, 8);
          {
            this.state = 377;
            this.tryStatement();
          }
          break;
        case 9:
          this.enterOuterAlt(localContext, 9);
          {
            this.state = 378;
            this.throwStatement();
          }
          break;
        case 10:
          this.enterOuterAlt(localContext, 10);
          {
            this.state = 379;
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
  public print(): PrintContext {
    let localContext = new PrintContext(this.context, this.state);
    this.enterRule(localContext, 26, PythonParser.RULE_print);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 383;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 108) {
          {
            this.state = 382;
            this.match(PythonParser.GHOSTED);
          }
        }

        this.state = 385;
        this.match(PythonParser.PRINT);
        this.state = 386;
        this.match(PythonParser.OPEN_BRACKET);
        this.state = 388;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (
          (((_la - 55) & ~0x1f) === 0 && ((1 << (_la - 55)) & 2192050687) !== 0) ||
          (((_la - 97) & ~0x1f) === 0 && ((1 << (_la - 97)) & 255) !== 0)
        ) {
          {
            this.state = 387;
            this.expression(0);
          }
        }

        this.state = 390;
        this.match(PythonParser.CLOSE_BRACKET);
        this.state = 391;
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
  public variableDefinition(): VariableDefinitionContext {
    let localContext = new VariableDefinitionContext(this.context, this.state);
    this.enterRule(localContext, 28, PythonParser.RULE_variableDefinition);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 394;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 108) {
          {
            this.state = 393;
            this.match(PythonParser.GHOSTED);
          }
        }

        this.state = 396;
        this.identifierDef();
        this.state = 397;
        this.match(PythonParser.EQUAL);
        this.state = 398;
        this.expression(0);
        this.state = 399;
        this.match(PythonParser.VARIABLE_ANNOTATION);
        this.state = 400;
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
    this.enterRule(localContext, 30, PythonParser.RULE_assignment);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 403;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 108) {
          {
            this.state = 402;
            this.match(PythonParser.GHOSTED);
          }
        }

        this.state = 405;
        this.assignable(0);
        this.state = 406;
        this.match(PythonParser.EQUAL);
        this.state = 407;
        this.expression(0);
        this.state = 408;
        this.match(PythonParser.ASSIGNMENT_ANNOTATION);
        this.state = 409;
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
    this.enterRule(localContext, 32, PythonParser.RULE_ifStatement);
    let _la: number;
    try {
      let alternative: number;
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 412;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 108) {
          {
            this.state = 411;
            this.match(PythonParser.GHOSTED);
          }
        }

        this.state = 414;
        this.match(PythonParser.IF);
        this.state = 415;
        this.expression(0);
        this.state = 416;
        this.match(PythonParser.COLON);
        this.state = 417;
        this.match(PythonParser.NL);
        this.state = 423;
        this.errorHandler.sync(this);
        alternative = this.interpreter.adaptivePredict(this.tokenStream, 32, this.context);
        while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
          if (alternative === 1) {
            {
              this.state = 421;
              this.errorHandler.sync(this);
              switch (this.interpreter.adaptivePredict(this.tokenStream, 31, this.context)) {
                case 1:
                  {
                    this.state = 418;
                    this.elseIfClause();
                  }
                  break;
                case 2:
                  {
                    this.state = 419;
                    this.elseClause();
                  }
                  break;
                case 3:
                  {
                    this.state = 420;
                    this.ordinaryStatement();
                  }
                  break;
              }
            }
          }
          this.state = 425;
          this.errorHandler.sync(this);
          alternative = this.interpreter.adaptivePredict(this.tokenStream, 32, this.context);
        }
        this.state = 426;
        this.match(PythonParser.COMMENT);
        this.state = 427;
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
  public whileLoop(): WhileLoopContext {
    let localContext = new WhileLoopContext(this.context, this.state);
    this.enterRule(localContext, 34, PythonParser.RULE_whileLoop);
    let _la: number;
    try {
      let alternative: number;
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 430;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 108) {
          {
            this.state = 429;
            this.match(PythonParser.GHOSTED);
          }
        }

        this.state = 432;
        this.match(PythonParser.WHILE);
        this.state = 433;
        this.expression(0);
        this.state = 434;
        this.match(PythonParser.COLON);
        this.state = 435;
        this.match(PythonParser.NL);
        this.state = 439;
        this.errorHandler.sync(this);
        alternative = this.interpreter.adaptivePredict(this.tokenStream, 34, this.context);
        while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
          if (alternative === 1) {
            {
              {
                this.state = 436;
                this.ordinaryStatement();
              }
            }
          }
          this.state = 441;
          this.errorHandler.sync(this);
          alternative = this.interpreter.adaptivePredict(this.tokenStream, 34, this.context);
        }
        this.state = 442;
        this.match(PythonParser.COMMENT);
        this.state = 443;
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
    this.enterRule(localContext, 36, PythonParser.RULE_forLoop);
    let _la: number;
    try {
      let alternative: number;
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 446;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 108) {
          {
            this.state = 445;
            this.match(PythonParser.GHOSTED);
          }
        }

        this.state = 448;
        this.match(PythonParser.FOR);
        this.state = 449;
        this.identifierDef();
        this.state = 450;
        this.match(PythonParser.IN);
        this.state = 451;
        this.expression(0);
        this.state = 452;
        this.match(PythonParser.COLON);
        this.state = 453;
        this.match(PythonParser.NL);
        this.state = 457;
        this.errorHandler.sync(this);
        alternative = this.interpreter.adaptivePredict(this.tokenStream, 36, this.context);
        while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
          if (alternative === 1) {
            {
              {
                this.state = 454;
                this.ordinaryStatement();
              }
            }
          }
          this.state = 459;
          this.errorHandler.sync(this);
          alternative = this.interpreter.adaptivePredict(this.tokenStream, 36, this.context);
        }
        this.state = 460;
        this.match(PythonParser.COMMENT);
        this.state = 461;
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
    this.enterRule(localContext, 38, PythonParser.RULE_procedureCall);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 464;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 108) {
          {
            this.state = 463;
            this.match(PythonParser.GHOSTED);
          }
        }

        this.state = 466;
        this.procRef();
        this.state = 467;
        this.match(PythonParser.OPEN_BRACKET);
        this.state = 468;
        this.argList();
        this.state = 469;
        this.match(PythonParser.CLOSE_BRACKET);
        this.state = 470;
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
  public procRef(): ProcRefContext {
    let localContext = new ProcRefContext(this.context, this.state);
    this.enterRule(localContext, 40, PythonParser.RULE_procRef);
    try {
      this.state = 475;
      this.errorHandler.sync(this);
      switch (this.interpreter.adaptivePredict(this.tokenStream, 38, this.context)) {
        case 1:
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 472;
            this.methodName();
          }
          break;
        case 2:
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 473;
            this.thisProcRef();
          }
          break;
        case 3:
          this.enterOuterAlt(localContext, 3);
          {
            this.state = 474;
            this.instanceProcRef();
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
  public thisProcRef(): ThisProcRefContext {
    let localContext = new ThisProcRefContext(this.context, this.state);
    this.enterRule(localContext, 42, PythonParser.RULE_thisProcRef);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 477;
        this.match(PythonParser.THIS_INSTANCE);
        this.state = 478;
        this.match(PythonParser.DOT);
        this.state = 479;
        this.methodName();
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
  public instanceProcRef(): InstanceProcRefContext {
    let localContext = new InstanceProcRefContext(this.context, this.state);
    this.enterRule(localContext, 44, PythonParser.RULE_instanceProcRef);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 481;
        this.identifierWithOptIndexes();
        this.state = 482;
        this.match(PythonParser.DOT);
        this.state = 483;
        this.methodName();
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
  public identifierWithOptIndexes(): IdentifierWithOptIndexesContext {
    let localContext = new IdentifierWithOptIndexesContext(this.context, this.state);
    this.enterRule(localContext, 46, PythonParser.RULE_identifierWithOptIndexes);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 485;
        this.identifierUse();
        this.state = 489;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (_la === 78) {
          {
            {
              this.state = 486;
              this.index();
            }
          }
          this.state = 491;
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
  public tryStatement(): TryStatementContext {
    let localContext = new TryStatementContext(this.context, this.state);
    this.enterRule(localContext, 48, PythonParser.RULE_tryStatement);
    let _la: number;
    try {
      let alternative: number;
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 493;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 108) {
          {
            this.state = 492;
            this.match(PythonParser.GHOSTED);
          }
        }

        this.state = 495;
        this.match(PythonParser.TRY);
        this.state = 496;
        this.match(PythonParser.NL);
        this.state = 500;
        this.errorHandler.sync(this);
        alternative = this.interpreter.adaptivePredict(this.tokenStream, 41, this.context);
        while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
          if (alternative === 1) {
            {
              {
                this.state = 497;
                this.ordinaryStatement();
              }
            }
          }
          this.state = 502;
          this.errorHandler.sync(this);
          alternative = this.interpreter.adaptivePredict(this.tokenStream, 41, this.context);
        }
        this.state = 503;
        this.catchStatement();
        this.state = 507;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (
          ((_la & ~0x1f) === 0 && ((1 << _la) & 26720) !== 0) ||
          _la === 52 ||
          _la === 74 ||
          (((_la - 97) & ~0x1f) === 0 && ((1 << (_la - 97)) & 67110913) !== 0)
        ) {
          {
            {
              this.state = 504;
              this.ordinaryStatement();
            }
          }
          this.state = 509;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 510;
        this.match(PythonParser.END);
        this.state = 511;
        this.match(PythonParser.TRY);
        this.state = 512;
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
  public throwStatement(): ThrowStatementContext {
    let localContext = new ThrowStatementContext(this.context, this.state);
    this.enterRule(localContext, 50, PythonParser.RULE_throwStatement);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 515;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 108) {
          {
            this.state = 514;
            this.match(PythonParser.GHOSTED);
          }
        }

        this.state = 517;
        this.match(PythonParser.RAISE);
        this.state = 518;
        this.typeName();
        this.state = 519;
        this.match(PythonParser.OPEN_BRACKET);
        this.state = 520;
        this.errorMessage();
        this.state = 521;
        this.match(PythonParser.CLOSE_BRACKET);
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
  public errorMessage(): ErrorMessageContext {
    let localContext = new ErrorMessageContext(this.context, this.state);
    this.enterRule(localContext, 52, PythonParser.RULE_errorMessage);
    try {
      this.state = 526;
      this.errorHandler.sync(this);
      switch (this.tokenStream.LA(1)) {
        case PythonParser.LITERAL_STRING:
        case PythonParser.INTERPOLATED_STRING:
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 524;
            this.litString();
          }
          break;
        case PythonParser.NAME_STARTING_LC:
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 525;
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
    this.enterRule(localContext, 54, PythonParser.RULE_assert);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 529;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 108) {
          {
            this.state = 528;
            this.match(PythonParser.GHOSTED);
          }
        }

        this.state = 531;
        this.match(PythonParser.THIS_INSTANCE);
        this.state = 532;
        this.match(PythonParser.DOT);
        this.state = 533;
        this.match(PythonParser.ASSERT_EQUAL);
        this.state = 534;
        this.match(PythonParser.OPEN_BRACKET);
        this.state = 535;
        this.assertActual();
        this.state = 536;
        this.match(PythonParser.COMMA);
        this.state = 537;
        this.assertExpected();
        this.state = 538;
        this.match(PythonParser.CLOSE_BRACKET);
        this.state = 539;
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
    this.enterRule(localContext, 56, PythonParser.RULE_returnStatement);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 541;
        this.match(PythonParser.RETURN);
        this.state = 542;
        this.expression(0);
        this.state = 543;
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
  public elseIfClause(): ElseIfClauseContext {
    let localContext = new ElseIfClauseContext(this.context, this.state);
    this.enterRule(localContext, 58, PythonParser.RULE_elseIfClause);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 546;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 108) {
          {
            this.state = 545;
            this.match(PythonParser.GHOSTED);
          }
        }

        this.state = 548;
        this.match(PythonParser.ELIF);
        this.state = 549;
        this.expression(0);
        this.state = 550;
        this.match(PythonParser.COLON);
        this.state = 551;
        this.match(PythonParser.ELSE_IF_ANNOTATION);
        this.state = 552;
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
  public elseClause(): ElseClauseContext {
    let localContext = new ElseClauseContext(this.context, this.state);
    this.enterRule(localContext, 60, PythonParser.RULE_elseClause);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 555;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 108) {
          {
            this.state = 554;
            this.match(PythonParser.GHOSTED);
          }
        }

        this.state = 557;
        this.match(PythonParser.ELSE);
        this.state = 558;
        this.match(PythonParser.COLON);
        this.state = 559;
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
    this.enterRule(localContext, 62, PythonParser.RULE_catchStatement);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 562;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 108) {
          {
            this.state = 561;
            this.match(PythonParser.GHOSTED);
          }
        }

        this.state = 564;
        this.match(PythonParser.EXCEPT);
        this.state = 565;
        this.typeName();
        this.state = 566;
        this.match(PythonParser.AS);
        this.state = 567;
        this.identifierDef();
        this.state = 568;
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
    this.enterRule(localContext, 64, PythonParser.RULE_constructorMember);
    let _la: number;
    try {
      let alternative: number;
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 571;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 108) {
          {
            this.state = 570;
            this.match(PythonParser.GHOSTED);
          }
        }

        this.state = 573;
        this.match(PythonParser.DEF);
        this.state = 574;
        this.match(PythonParser.INIT);
        this.state = 575;
        this.match(PythonParser.OPEN_BRACKET);
        this.state = 577;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 97) {
          {
            this.state = 576;
            this.paramList();
          }
        }

        this.state = 579;
        this.match(PythonParser.CLOSE_BRACKET);
        this.state = 580;
        this.match(PythonParser.ARROW);
        this.state = 581;
        this.match(PythonParser.NONE);
        this.state = 582;
        this.match(PythonParser.COLON);
        this.state = 583;
        this.match(PythonParser.NL);
        this.state = 587;
        this.errorHandler.sync(this);
        alternative = this.interpreter.adaptivePredict(this.tokenStream, 51, this.context);
        while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
          if (alternative === 1) {
            {
              {
                this.state = 584;
                this.ordinaryStatement();
              }
            }
          }
          this.state = 589;
          this.errorHandler.sync(this);
          alternative = this.interpreter.adaptivePredict(this.tokenStream, 51, this.context);
        }
        this.state = 590;
        this.match(PythonParser.COMMENT);
        this.state = 591;
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
    this.enterRule(localContext, 66, PythonParser.RULE_property);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 594;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 108) {
          {
            this.state = 593;
            this.match(PythonParser.GHOSTED);
          }
        }

        this.state = 596;
        this.identifierDef();
        this.state = 597;
        this.match(PythonParser.COLON);
        this.state = 598;
        this.type_();
        this.state = 599;
        this.match(PythonParser.PROPERTY_ANNOTATION);
        this.state = 600;
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
    this.enterRule(localContext, 68, PythonParser.RULE_functionMethod);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 603;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 108) {
          {
            this.state = 602;
            this.match(PythonParser.GHOSTED);
          }
        }

        this.state = 605;
        this.match(PythonParser.DEF);
        this.state = 606;
        this.methodName();
        this.state = 607;
        this.match(PythonParser.OPEN_BRACKET);
        this.state = 609;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 97) {
          {
            this.state = 608;
            this.paramList();
          }
        }

        this.state = 611;
        this.match(PythonParser.CLOSE_BRACKET);
        this.state = 612;
        this.match(PythonParser.ARROW);
        this.state = 613;
        this.type_();
        this.state = 614;
        this.match(PythonParser.COLON);
        this.state = 615;
        this.match(PythonParser.FUNCTION_METHOD_ANNOTATION);
        this.state = 616;
        this.match(PythonParser.NL);
        this.state = 620;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (
          ((_la & ~0x1f) === 0 && ((1 << _la) & 26720) !== 0) ||
          _la === 52 ||
          _la === 74 ||
          (((_la - 97) & ~0x1f) === 0 && ((1 << (_la - 97)) & 67110913) !== 0)
        ) {
          {
            {
              this.state = 617;
              this.ordinaryStatement();
            }
          }
          this.state = 622;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 623;
        this.returnStatement();
        this.state = 624;
        this.match(PythonParser.COMMENT);
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
  public procedureMethod(): ProcedureMethodContext {
    let localContext = new ProcedureMethodContext(this.context, this.state);
    this.enterRule(localContext, 70, PythonParser.RULE_procedureMethod);
    let _la: number;
    try {
      let alternative: number;
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 628;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 108) {
          {
            this.state = 627;
            this.match(PythonParser.GHOSTED);
          }
        }

        this.state = 630;
        this.match(PythonParser.DEF);
        this.state = 631;
        this.methodName();
        this.state = 632;
        this.match(PythonParser.OPEN_BRACKET);
        this.state = 634;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 97) {
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
        this.state = 640;
        this.match(PythonParser.PROCEDURE_METHOD_ANNOTATION);
        this.state = 641;
        this.match(PythonParser.NL);
        this.state = 645;
        this.errorHandler.sync(this);
        alternative = this.interpreter.adaptivePredict(this.tokenStream, 58, this.context);
        while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
          if (alternative === 1) {
            {
              {
                this.state = 642;
                this.ordinaryStatement();
              }
            }
          }
          this.state = 647;
          this.errorHandler.sync(this);
          alternative = this.interpreter.adaptivePredict(this.tokenStream, 58, this.context);
        }
        this.state = 648;
        this.match(PythonParser.COMMENT);
        this.state = 649;
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
    this.enterRule(localContext, 72, PythonParser.RULE_abstractFunction);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 652;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 108) {
          {
            this.state = 651;
            this.match(PythonParser.GHOSTED);
          }
        }

        this.state = 654;
        this.match(PythonParser.ABSTRACT_METHOD);
        this.state = 655;
        this.match(PythonParser.NL);
        this.state = 656;
        this.match(PythonParser.DEF);
        this.state = 657;
        this.methodName();
        this.state = 658;
        this.match(PythonParser.OPEN_BRACKET);
        this.state = 660;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 97) {
          {
            this.state = 659;
            this.paramList();
          }
        }

        this.state = 662;
        this.match(PythonParser.CLOSE_BRACKET);
        this.state = 663;
        this.match(PythonParser.ARROW);
        this.state = 664;
        this.type_();
        this.state = 665;
        this.match(PythonParser.COLON);
        this.state = 666;
        this.match(PythonParser.NL);
        this.state = 667;
        this.match(PythonParser.PASS);
        this.state = 668;
        this.match(PythonParser.COMMENT);
        this.state = 669;
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
    this.enterRule(localContext, 74, PythonParser.RULE_abstractProcedure);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 672;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 108) {
          {
            this.state = 671;
            this.match(PythonParser.GHOSTED);
          }
        }

        this.state = 674;
        this.match(PythonParser.ABSTRACT_METHOD);
        this.state = 675;
        this.match(PythonParser.NL);
        this.state = 676;
        this.match(PythonParser.DEF);
        this.state = 677;
        this.methodName();
        this.state = 678;
        this.match(PythonParser.OPEN_BRACKET);
        this.state = 680;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 97) {
          {
            this.state = 679;
            this.paramList();
          }
        }

        this.state = 682;
        this.match(PythonParser.CLOSE_BRACKET);
        this.state = 683;
        this.match(PythonParser.ARROW);
        this.state = 684;
        this.match(PythonParser.NONE);
        this.state = 685;
        this.match(PythonParser.COLON);
        this.state = 686;
        this.match(PythonParser.NL);
        this.state = 687;
        this.match(PythonParser.PASS);
        this.state = 688;
        this.match(PythonParser.COMMENT);
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
  public identifierDef(): IdentifierDefContext {
    let localContext = new IdentifierDefContext(this.context, this.state);
    this.enterRule(localContext, 76, PythonParser.RULE_identifierDef);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 691;
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
    this.enterRule(localContext, 78, PythonParser.RULE_identifierUse);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 693;
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
    let _startState = 80;
    this.enterRecursionRule(localContext, 80, PythonParser.RULE_assignable, _p);
    try {
      let alternative: number;
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 700;
        this.errorHandler.sync(this);
        switch (this.tokenStream.LA(1)) {
          case PythonParser.NAME_STARTING_LC:
            {
              this.state = 696;
              this.identifierUse();
            }
            break;
          case PythonParser.THIS_INSTANCE:
            {
              this.state = 697;
              this.match(PythonParser.THIS_INSTANCE);
              this.state = 698;
              this.match(PythonParser.DOT);
              this.state = 699;
              this.identifierUse();
            }
            break;
          default:
            throw new antlr.NoViableAltException(this);
        }
        this.context!.stop = this.tokenStream.LT(-1);
        this.state = 706;
        this.errorHandler.sync(this);
        alternative = this.interpreter.adaptivePredict(this.tokenStream, 64, this.context);
        while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
          if (alternative === 1) {
            if (this.parseListeners != null) {
              this.triggerExitRuleEvent();
            }
            previousContext = localContext;
            {
              {
                localContext = new AssignableContext(parentContext, parentState);
                this.pushNewRecursionContext(
                  localContext,
                  _startState,
                  PythonParser.RULE_assignable,
                );
                this.state = 702;
                if (!this.precpred(this.context, 1)) {
                  throw this.createFailedPredicateException("this.precpred(this.context, 1)");
                }
                this.state = 703;
                this.index();
              }
            }
          }
          this.state = 708;
          this.errorHandler.sync(this);
          alternative = this.interpreter.adaptivePredict(this.tokenStream, 64, this.context);
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
    this.enterRule(localContext, 82, PythonParser.RULE_methodName);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 709;
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
    this.enterRule(localContext, 84, PythonParser.RULE_testName);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 711;
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
    this.enterRule(localContext, 86, PythonParser.RULE_typeName);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 713;
        _la = this.tokenStream.LA(1);
        if (!((((_la - 56) & ~0x1f) === 0 && ((1 << (_la - 56)) & 31) !== 0) || _la === 98)) {
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
  public constantValue(): ConstantValueContext {
    let localContext = new ConstantValueContext(this.context, this.state);
    this.enterRule(localContext, 88, PythonParser.RULE_constantValue);
    try {
      this.state = 719;
      this.errorHandler.sync(this);
      switch (this.tokenStream.LA(1)) {
        case PythonParser.TRUE:
        case PythonParser.FALSE:
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 715;
            this.litBoolean();
          }
          break;
        case PythonParser.LITERAL_BINARY:
        case PythonParser.LITERAL_HEX:
        case PythonParser.LITERAL_INTEGER:
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 716;
            this.litInt();
          }
          break;
        case PythonParser.LITERAL_FLOAT:
          this.enterOuterAlt(localContext, 3);
          {
            this.state = 717;
            this.litFloat();
          }
          break;
        case PythonParser.LITERAL_STRING:
        case PythonParser.INTERPOLATED_STRING:
          this.enterOuterAlt(localContext, 4);
          {
            this.state = 718;
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
    this.enterRule(localContext, 90, PythonParser.RULE_argList);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 721;
        this.argument();
        this.state = 726;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (_la === 83) {
          {
            {
              this.state = 722;
              this.match(PythonParser.COMMA);
              this.state = 723;
              this.argument();
            }
          }
          this.state = 728;
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
    this.enterRule(localContext, 92, PythonParser.RULE_argument);
    try {
      this.state = 731;
      this.errorHandler.sync(this);
      switch (this.tokenStream.LA(1)) {
        case PythonParser.LAMBDA:
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 729;
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
            this.state = 730;
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
    this.enterRule(localContext, 94, PythonParser.RULE_paramList);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 733;
        this.paramDef();
        this.state = 738;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (_la === 83) {
          {
            {
              this.state = 734;
              this.match(PythonParser.COMMA);
              this.state = 735;
              this.paramDef();
            }
          }
          this.state = 740;
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
    this.enterRule(localContext, 96, PythonParser.RULE_identifierList);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 741;
        this.identifierDef();
        this.state = 744;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        do {
          {
            {
              this.state = 742;
              this.match(PythonParser.COMMA);
              this.state = 743;
              this.identifierDef();
            }
          }
          this.state = 746;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        } while (_la === 83);
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
    this.enterRule(localContext, 98, PythonParser.RULE_expressionList);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 748;
        this.expression(0);
        this.state = 753;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (_la === 83) {
          {
            {
              this.state = 749;
              this.match(PythonParser.COMMA);
              this.state = 750;
              this.expression(0);
            }
          }
          this.state = 755;
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
    this.enterRule(localContext, 100, PythonParser.RULE_type);
    try {
      this.state = 760;
      this.errorHandler.sync(this);
      switch (this.interpreter.adaptivePredict(this.tokenStream, 71, this.context)) {
        case 1:
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 756;
            this.typeTuple();
          }
          break;
        case 2:
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 757;
            this.typeName();
          }
          break;
        case 3:
          this.enterOuterAlt(localContext, 3);
          {
            this.state = 758;
            this.typeGeneric();
          }
          break;
        case 4:
          this.enterOuterAlt(localContext, 4);
          {
            this.state = 759;
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
    this.enterRule(localContext, 102, PythonParser.RULE_assertActual);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 762;
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
    this.enterRule(localContext, 104, PythonParser.RULE_assertExpected);
    try {
      this.state = 769;
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
            this.state = 764;
            this.litValue();
          }
          break;
        case PythonParser.OPEN_SQ_BRACKET:
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 765;
            this.list();
          }
          break;
        case PythonParser.OPEN_BRACE:
          this.enterOuterAlt(localContext, 3);
          {
            this.state = 766;
            this.dictionary();
          }
          break;
        case PythonParser.NOT:
        case PythonParser.MINUS:
          this.enterOuterAlt(localContext, 4);
          {
            this.state = 767;
            this.unaryExpression();
          }
          break;
        case PythonParser.OPEN_BRACKET:
          this.enterOuterAlt(localContext, 5);
          {
            this.state = 768;
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
    this.enterRule(localContext, 106, PythonParser.RULE_litValue);
    try {
      this.state = 777;
      this.errorHandler.sync(this);
      switch (this.interpreter.adaptivePredict(this.tokenStream, 73, this.context)) {
        case 1:
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 771;
            this.litBoolean();
          }
          break;
        case 2:
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 772;
            this.litInt();
          }
          break;
        case 3:
          this.enterOuterAlt(localContext, 3);
          {
            this.state = 773;
            this.litFloat();
          }
          break;
        case 4:
          this.enterOuterAlt(localContext, 4);
          {
            this.state = 774;
            this.litString();
          }
          break;
        case 5:
          this.enterOuterAlt(localContext, 5);
          {
            this.state = 775;
            this.interpolatedString();
          }
          break;
        case 6:
          this.enterOuterAlt(localContext, 6);
          {
            this.state = 776;
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
    this.enterRule(localContext, 108, PythonParser.RULE_litBoolean);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 779;
        _la = this.tokenStream.LA(1);
        if (!(_la === 62 || _la === 63)) {
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
    this.enterRule(localContext, 110, PythonParser.RULE_litInt);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 781;
        _la = this.tokenStream.LA(1);
        if (!(((_la - 99) & ~0x1f) === 0 && ((1 << (_la - 99)) & 7) !== 0)) {
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
  public litFloat(): LitFloatContext {
    let localContext = new LitFloatContext(this.context, this.state);
    this.enterRule(localContext, 112, PythonParser.RULE_litFloat);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 783;
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
    this.enterRule(localContext, 114, PythonParser.RULE_litString);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 785;
        _la = this.tokenStream.LA(1);
        if (!(_la === 103 || _la === 104)) {
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
    this.enterRule(localContext, 116, PythonParser.RULE_enumValue);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 787;
        this.typeName();
        this.state = 788;
        this.match(PythonParser.DOT);
        this.state = 789;
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
  public litRegExp(): LitRegExpContext {
    let localContext = new LitRegExpContext(this.context, this.state);
    this.enterRule(localContext, 118, PythonParser.RULE_litRegExp);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 791;
        this.match(PythonParser.LITERAL_REGEXP);
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
        this.state = 793;
        this.match(PythonParser.OPEN_SQ_BRACKET);
        this.state = 794;
        this.expression(0);
        this.state = 795;
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
        this.state = 802;
        this.errorHandler.sync(this);
        switch (this.interpreter.adaptivePredict(this.tokenStream, 74, this.context)) {
          case 1:
            {
              this.state = 798;
              this.newInstance();
            }
            break;
          case 2:
            {
              this.state = 799;
              this.unaryExpression();
            }
            break;
          case 3:
            {
              this.state = 800;
              this.term(0);
            }
            break;
          case 4:
            {
              this.state = 801;
              this.binaryExpression();
            }
            break;
        }
        this.context!.stop = this.tokenStream.LT(-1);
        this.state = 819;
        this.errorHandler.sync(this);
        alternative = this.interpreter.adaptivePredict(this.tokenStream, 76, this.context);
        while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
          if (alternative === 1) {
            if (this.parseListeners != null) {
              this.triggerExitRuleEvent();
            }
            previousContext = localContext;
            {
              {
                localContext = new ExpressionContext(parentContext, parentState);
                this.pushNewRecursionContext(
                  localContext,
                  _startState,
                  PythonParser.RULE_expression,
                );
                this.state = 804;
                if (!this.precpred(this.context, 1)) {
                  throw this.createFailedPredicateException("this.precpred(this.context, 1)");
                }
                this.state = 805;
                this.match(PythonParser.IF);
                this.state = 806;
                this.expression(0);
                this.state = 811;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 2) {
                  {
                    {
                      this.state = 807;
                      this.match(PythonParser.ELIF);
                      this.state = 808;
                      this.expression(0);
                    }
                  }
                  this.state = 813;
                  this.errorHandler.sync(this);
                  _la = this.tokenStream.LA(1);
                }
                this.state = 814;
                this.match(PythonParser.ELSE);
                this.state = 815;
                this.expression(2);
              }
            }
          }
          this.state = 821;
          this.errorHandler.sync(this);
          alternative = this.interpreter.adaptivePredict(this.tokenStream, 76, this.context);
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
        this.state = 831;
        this.errorHandler.sync(this);
        switch (this.interpreter.adaptivePredict(this.tokenStream, 77, this.context)) {
          case 1:
            {
              this.state = 823;
              this.thisInstance();
            }
            break;
          case 2:
            {
              this.state = 824;
              this.bracketedExpression();
            }
            break;
          case 3:
            {
              this.state = 825;
              this.litValue();
            }
            break;
          case 4:
            {
              this.state = 826;
              this.list();
            }
            break;
          case 5:
            {
              this.state = 827;
              this.dictionary();
            }
            break;
          case 6:
            {
              this.state = 828;
              this.tuple();
            }
            break;
          case 7:
            {
              this.state = 829;
              this.identifierUse();
            }
            break;
          case 8:
            {
              this.state = 830;
              this.methodCall();
            }
            break;
        }
        this.context!.stop = this.tokenStream.LT(-1);
        this.state = 840;
        this.errorHandler.sync(this);
        alternative = this.interpreter.adaptivePredict(this.tokenStream, 79, this.context);
        while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
          if (alternative === 1) {
            if (this.parseListeners != null) {
              this.triggerExitRuleEvent();
            }
            previousContext = localContext;
            {
              this.state = 838;
              this.errorHandler.sync(this);
              switch (this.interpreter.adaptivePredict(this.tokenStream, 78, this.context)) {
                case 1:
                  {
                    localContext = new TermContext(parentContext, parentState);
                    this.pushNewRecursionContext(localContext, _startState, PythonParser.RULE_term);
                    this.state = 833;
                    if (!this.precpred(this.context, 2)) {
                      throw this.createFailedPredicateException("this.precpred(this.context, 2)");
                    }
                    this.state = 834;
                    this.index();
                  }
                  break;
                case 2:
                  {
                    localContext = new TermContext(parentContext, parentState);
                    this.pushNewRecursionContext(localContext, _startState, PythonParser.RULE_term);
                    this.state = 835;
                    if (!this.precpred(this.context, 1)) {
                      throw this.createFailedPredicateException("this.precpred(this.context, 1)");
                    }
                    this.state = 836;
                    this.match(PythonParser.DOT);
                    this.state = 837;
                    this.chainable();
                  }
                  break;
              }
            }
          }
          this.state = 842;
          this.errorHandler.sync(this);
          alternative = this.interpreter.adaptivePredict(this.tokenStream, 79, this.context);
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
      let alternative: number;
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 845;
        this.errorHandler.sync(this);
        switch (this.interpreter.adaptivePredict(this.tokenStream, 80, this.context)) {
          case 1:
            {
              this.state = 843;
              this.identifierUse();
            }
            break;
          case 2:
            {
              this.state = 844;
              this.methodCall();
            }
            break;
        }
        this.state = 850;
        this.errorHandler.sync(this);
        alternative = this.interpreter.adaptivePredict(this.tokenStream, 81, this.context);
        while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
          if (alternative === 1) {
            {
              {
                this.state = 847;
                this.index();
              }
            }
          }
          this.state = 852;
          this.errorHandler.sync(this);
          alternative = this.interpreter.adaptivePredict(this.tokenStream, 81, this.context);
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
  public thisInstance(): ThisInstanceContext {
    let localContext = new ThisInstanceContext(this.context, this.state);
    this.enterRule(localContext, 128, PythonParser.RULE_thisInstance);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 853;
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
        this.state = 855;
        this.match(PythonParser.OPEN_BRACKET);
        this.state = 856;
        this.expression(0);
        this.state = 857;
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
      this.state = 861;
      this.errorHandler.sync(this);
      switch (this.tokenStream.LA(1)) {
        case PythonParser.MINUS:
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 859;
            this.negateNumeric();
          }
          break;
        case PythonParser.NOT:
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 860;
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
        this.state = 863;
        this.match(PythonParser.MINUS);
        this.state = 864;
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
        this.state = 866;
        this.match(PythonParser.NOT);
        this.state = 867;
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
        this.state = 869;
        localContext._left = this.term(0);
        this.state = 870;
        this.binaryOperator();
        this.state = 871;
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
        this.state = 873;
        this.match(PythonParser.OPEN_SQ_BRACKET);
        this.state = 874;
        this.expressionList();
        this.state = 875;
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
        this.state = 877;
        this.match(PythonParser.OPEN_BRACKET);
        this.state = 878;
        this.expressionList();
        this.state = 879;
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
        this.state = 881;
        this.match(PythonParser.OPEN_BRACE);
        this.state = 882;
        this.kvpList();
        this.state = 883;
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
        this.state = 885;
        this.kvp();
        this.state = 890;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (_la === 83) {
          {
            {
              this.state = 886;
              this.match(PythonParser.COMMA);
              this.state = 887;
              this.kvp();
            }
          }
          this.state = 892;
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
        this.state = 893;
        this.expression(0);
        this.state = 894;
        this.match(PythonParser.COLON);
        this.state = 895;
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
  public methodCall(): MethodCallContext {
    let localContext = new MethodCallContext(this.context, this.state);
    this.enterRule(localContext, 150, PythonParser.RULE_methodCall);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 897;
        this.methodName();
        this.state = 898;
        this.match(PythonParser.OPEN_BRACKET);
        this.state = 900;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (
          _la === 9 ||
          (((_la - 55) & ~0x1f) === 0 && ((1 << (_la - 55)) & 2192050687) !== 0) ||
          (((_la - 97) & ~0x1f) === 0 && ((1 << (_la - 97)) & 255) !== 0)
        ) {
          {
            this.state = 899;
            this.argList();
          }
        }

        this.state = 902;
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
        this.state = 904;
        _la = this.tokenStream.LA(1);
        if (!(((_la - 64) & ~0x1f) === 0 && ((1 << (_la - 64)) & 534773947) !== 0)) {
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
        this.state = 906;
        this.type_();
        this.state = 907;
        this.match(PythonParser.OPEN_BRACKET);
        this.state = 909;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (
          _la === 9 ||
          (((_la - 55) & ~0x1f) === 0 && ((1 << (_la - 55)) & 2192050687) !== 0) ||
          (((_la - 97) & ~0x1f) === 0 && ((1 << (_la - 97)) & 255) !== 0)
        ) {
          {
            this.state = 908;
            this.argList();
          }
        }

        this.state = 911;
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
        this.state = 913;
        this.identifierDef();
        this.state = 914;
        this.match(PythonParser.COLON);
        this.state = 915;
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
        this.state = 917;
        this.typeName();
        this.state = 918;
        this.match(PythonParser.OPEN_SQ_BRACKET);
        this.state = 919;
        this.type_();
        this.state = 924;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (_la === 83) {
          {
            {
              this.state = 920;
              this.match(PythonParser.COMMA);
              this.state = 921;
              this.type_();
            }
          }
          this.state = 926;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 927;
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
        this.state = 929;
        this.match(PythonParser.FUNC_NAME);
        this.state = 930;
        this.match(PythonParser.OPEN_SQ_BRACKET);
        this.state = 931;
        this.match(PythonParser.OPEN_SQ_BRACKET);
        this.state = 932;
        this.type_();
        this.state = 937;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (_la === 83) {
          {
            {
              this.state = 933;
              this.match(PythonParser.COMMA);
              this.state = 934;
              this.type_();
            }
          }
          this.state = 939;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 940;
        this.match(PythonParser.CLOSE_SQ_BRACKET);
        this.state = 941;
        this.match(PythonParser.COMMA);
        this.state = 942;
        this.type_();
        this.state = 943;
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
        this.state = 945;
        this.match(PythonParser.TUPLE);
        this.state = 946;
        this.match(PythonParser.OPEN_SQ_BRACKET);
        this.state = 947;
        this.type_();
        this.state = 950;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        do {
          {
            {
              this.state = 948;
              this.match(PythonParser.COMMA);
              this.state = 949;
              this.type_();
            }
          }
          this.state = 952;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        } while (_la === 83);
        this.state = 954;
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
        this.state = 956;
        this.match(PythonParser.LAMBDA);
        this.state = 957;
        this.paramList();
        this.state = 958;
        this.match(PythonParser.COLON);
        this.state = 959;
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
        this.state = 961;
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
      case 40:
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
    4, 1, 123, 964, 2, 0, 7, 0, 2, 1, 7, 1, 2, 2, 7, 2, 2, 3, 7, 3, 2, 4, 7, 4, 2, 5, 7, 5, 2, 6, 7,
    6, 2, 7, 7, 7, 2, 8, 7, 8, 2, 9, 7, 9, 2, 10, 7, 10, 2, 11, 7, 11, 2, 12, 7, 12, 2, 13, 7, 13,
    2, 14, 7, 14, 2, 15, 7, 15, 2, 16, 7, 16, 2, 17, 7, 17, 2, 18, 7, 18, 2, 19, 7, 19, 2, 20, 7,
    20, 2, 21, 7, 21, 2, 22, 7, 22, 2, 23, 7, 23, 2, 24, 7, 24, 2, 25, 7, 25, 2, 26, 7, 26, 2, 27,
    7, 27, 2, 28, 7, 28, 2, 29, 7, 29, 2, 30, 7, 30, 2, 31, 7, 31, 2, 32, 7, 32, 2, 33, 7, 33, 2,
    34, 7, 34, 2, 35, 7, 35, 2, 36, 7, 36, 2, 37, 7, 37, 2, 38, 7, 38, 2, 39, 7, 39, 2, 40, 7, 40,
    2, 41, 7, 41, 2, 42, 7, 42, 2, 43, 7, 43, 2, 44, 7, 44, 2, 45, 7, 45, 2, 46, 7, 46, 2, 47, 7,
    47, 2, 48, 7, 48, 2, 49, 7, 49, 2, 50, 7, 50, 2, 51, 7, 51, 2, 52, 7, 52, 2, 53, 7, 53, 2, 54,
    7, 54, 2, 55, 7, 55, 2, 56, 7, 56, 2, 57, 7, 57, 2, 58, 7, 58, 2, 59, 7, 59, 2, 60, 7, 60, 2,
    61, 7, 61, 2, 62, 7, 62, 2, 63, 7, 63, 2, 64, 7, 64, 2, 65, 7, 65, 2, 66, 7, 66, 2, 67, 7, 67,
    2, 68, 7, 68, 2, 69, 7, 69, 2, 70, 7, 70, 2, 71, 7, 71, 2, 72, 7, 72, 2, 73, 7, 73, 2, 74, 7,
    74, 2, 75, 7, 75, 2, 76, 7, 76, 2, 77, 7, 77, 2, 78, 7, 78, 2, 79, 7, 79, 2, 80, 7, 80, 2, 81,
    7, 81, 2, 82, 7, 82, 2, 83, 7, 83, 1, 0, 3, 0, 170, 8, 0, 1, 0, 5, 0, 173, 8, 0, 10, 0, 12, 0,
    176, 9, 0, 1, 0, 5, 0, 179, 8, 0, 10, 0, 12, 0, 182, 9, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 1, 195, 8, 1, 1, 2, 3, 2, 198, 8, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1,
    2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 5, 2, 210, 8, 2, 10, 2, 12, 2, 213, 9, 2, 1, 2, 1, 2, 1, 2, 1,
    3, 3, 3, 219, 8, 3, 1, 3, 1, 3, 1, 3, 1, 3, 3, 3, 225, 8, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3,
    1, 3, 5, 3, 234, 8, 3, 10, 3, 12, 3, 237, 9, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 4, 3, 4, 244, 8, 4,
    1, 4, 1, 4, 1, 4, 1, 4, 1, 4, 1, 4, 1, 4, 1, 4, 1, 4, 1, 4, 5, 4, 256, 8, 4, 10, 4, 12, 4, 259,
    9, 4, 1, 4, 1, 4, 1, 4, 1, 5, 3, 5, 265, 8, 5, 1, 5, 1, 5, 1, 5, 1, 5, 3, 5, 271, 8, 5, 1, 5, 1,
    5, 1, 5, 1, 5, 1, 5, 1, 5, 1, 5, 5, 5, 280, 8, 5, 10, 5, 12, 5, 283, 9, 5, 1, 5, 1, 5, 1, 5, 1,
    6, 3, 6, 289, 8, 6, 1, 6, 1, 6, 1, 6, 1, 6, 1, 6, 1, 6, 1, 7, 3, 7, 298, 8, 7, 1, 7, 1, 7, 1, 7,
    1, 7, 1, 7, 1, 7, 1, 7, 1, 7, 1, 7, 1, 7, 1, 7, 1, 7, 1, 8, 3, 8, 313, 8, 8, 1, 8, 1, 8, 1, 8,
    1, 8, 1, 8, 1, 8, 3, 8, 321, 8, 8, 1, 8, 1, 8, 1, 8, 1, 8, 1, 8, 1, 8, 1, 8, 1, 8, 5, 8, 331, 8,
    8, 10, 8, 12, 8, 334, 9, 8, 1, 8, 1, 8, 1, 8, 1, 9, 3, 9, 340, 8, 9, 1, 9, 1, 9, 1, 9, 1, 9, 1,
    9, 1, 9, 3, 9, 348, 8, 9, 1, 9, 1, 9, 1, 9, 1, 9, 1, 9, 1, 9, 1, 9, 1, 9, 5, 9, 358, 8, 9, 10,
    9, 12, 9, 361, 9, 9, 1, 9, 1, 9, 1, 9, 1, 10, 1, 10, 1, 10, 1, 11, 1, 11, 1, 12, 1, 12, 1, 12,
    1, 12, 1, 12, 1, 12, 1, 12, 1, 12, 1, 12, 1, 12, 3, 12, 381, 8, 12, 1, 13, 3, 13, 384, 8, 13, 1,
    13, 1, 13, 1, 13, 3, 13, 389, 8, 13, 1, 13, 1, 13, 1, 13, 1, 14, 3, 14, 395, 8, 14, 1, 14, 1,
    14, 1, 14, 1, 14, 1, 14, 1, 14, 1, 15, 3, 15, 404, 8, 15, 1, 15, 1, 15, 1, 15, 1, 15, 1, 15, 1,
    15, 1, 16, 3, 16, 413, 8, 16, 1, 16, 1, 16, 1, 16, 1, 16, 1, 16, 1, 16, 1, 16, 5, 16, 422, 8,
    16, 10, 16, 12, 16, 425, 9, 16, 1, 16, 1, 16, 1, 16, 1, 17, 3, 17, 431, 8, 17, 1, 17, 1, 17, 1,
    17, 1, 17, 1, 17, 5, 17, 438, 8, 17, 10, 17, 12, 17, 441, 9, 17, 1, 17, 1, 17, 1, 17, 1, 18, 3,
    18, 447, 8, 18, 1, 18, 1, 18, 1, 18, 1, 18, 1, 18, 1, 18, 1, 18, 5, 18, 456, 8, 18, 10, 18, 12,
    18, 459, 9, 18, 1, 18, 1, 18, 1, 18, 1, 19, 3, 19, 465, 8, 19, 1, 19, 1, 19, 1, 19, 1, 19, 1,
    19, 1, 19, 1, 20, 1, 20, 1, 20, 3, 20, 476, 8, 20, 1, 21, 1, 21, 1, 21, 1, 21, 1, 22, 1, 22, 1,
    22, 1, 22, 1, 23, 1, 23, 5, 23, 488, 8, 23, 10, 23, 12, 23, 491, 9, 23, 1, 24, 3, 24, 494, 8,
    24, 1, 24, 1, 24, 1, 24, 5, 24, 499, 8, 24, 10, 24, 12, 24, 502, 9, 24, 1, 24, 1, 24, 5, 24,
    506, 8, 24, 10, 24, 12, 24, 509, 9, 24, 1, 24, 1, 24, 1, 24, 1, 24, 1, 25, 3, 25, 516, 8, 25, 1,
    25, 1, 25, 1, 25, 1, 25, 1, 25, 1, 25, 1, 25, 1, 26, 1, 26, 3, 26, 527, 8, 26, 1, 27, 3, 27,
    530, 8, 27, 1, 27, 1, 27, 1, 27, 1, 27, 1, 27, 1, 27, 1, 27, 1, 27, 1, 27, 1, 27, 1, 28, 1, 28,
    1, 28, 1, 28, 1, 29, 3, 29, 547, 8, 29, 1, 29, 1, 29, 1, 29, 1, 29, 1, 29, 1, 29, 1, 30, 3, 30,
    556, 8, 30, 1, 30, 1, 30, 1, 30, 1, 30, 1, 31, 3, 31, 563, 8, 31, 1, 31, 1, 31, 1, 31, 1, 31, 1,
    31, 1, 31, 1, 32, 3, 32, 572, 8, 32, 1, 32, 1, 32, 1, 32, 1, 32, 3, 32, 578, 8, 32, 1, 32, 1,
    32, 1, 32, 1, 32, 1, 32, 1, 32, 5, 32, 586, 8, 32, 10, 32, 12, 32, 589, 9, 32, 1, 32, 1, 32, 1,
    32, 1, 33, 3, 33, 595, 8, 33, 1, 33, 1, 33, 1, 33, 1, 33, 1, 33, 1, 33, 1, 34, 3, 34, 604, 8,
    34, 1, 34, 1, 34, 1, 34, 1, 34, 3, 34, 610, 8, 34, 1, 34, 1, 34, 1, 34, 1, 34, 1, 34, 1, 34, 1,
    34, 5, 34, 619, 8, 34, 10, 34, 12, 34, 622, 9, 34, 1, 34, 1, 34, 1, 34, 1, 34, 1, 35, 3, 35,
    629, 8, 35, 1, 35, 1, 35, 1, 35, 1, 35, 3, 35, 635, 8, 35, 1, 35, 1, 35, 1, 35, 1, 35, 1, 35, 1,
    35, 1, 35, 5, 35, 644, 8, 35, 10, 35, 12, 35, 647, 9, 35, 1, 35, 1, 35, 1, 35, 1, 36, 3, 36,
    653, 8, 36, 1, 36, 1, 36, 1, 36, 1, 36, 1, 36, 1, 36, 3, 36, 661, 8, 36, 1, 36, 1, 36, 1, 36, 1,
    36, 1, 36, 1, 36, 1, 36, 1, 36, 1, 36, 1, 37, 3, 37, 673, 8, 37, 1, 37, 1, 37, 1, 37, 1, 37, 1,
    37, 1, 37, 3, 37, 681, 8, 37, 1, 37, 1, 37, 1, 37, 1, 37, 1, 37, 1, 37, 1, 37, 1, 37, 1, 37, 1,
    38, 1, 38, 1, 39, 1, 39, 1, 40, 1, 40, 1, 40, 1, 40, 1, 40, 3, 40, 701, 8, 40, 1, 40, 1, 40, 5,
    40, 705, 8, 40, 10, 40, 12, 40, 708, 9, 40, 1, 41, 1, 41, 1, 42, 1, 42, 1, 43, 1, 43, 1, 44, 1,
    44, 1, 44, 1, 44, 3, 44, 720, 8, 44, 1, 45, 1, 45, 1, 45, 5, 45, 725, 8, 45, 10, 45, 12, 45,
    728, 9, 45, 1, 46, 1, 46, 3, 46, 732, 8, 46, 1, 47, 1, 47, 1, 47, 5, 47, 737, 8, 47, 10, 47, 12,
    47, 740, 9, 47, 1, 48, 1, 48, 1, 48, 4, 48, 745, 8, 48, 11, 48, 12, 48, 746, 1, 49, 1, 49, 1,
    49, 5, 49, 752, 8, 49, 10, 49, 12, 49, 755, 9, 49, 1, 50, 1, 50, 1, 50, 1, 50, 3, 50, 761, 8,
    50, 1, 51, 1, 51, 1, 52, 1, 52, 1, 52, 1, 52, 1, 52, 3, 52, 770, 8, 52, 1, 53, 1, 53, 1, 53, 1,
    53, 1, 53, 1, 53, 3, 53, 778, 8, 53, 1, 54, 1, 54, 1, 55, 1, 55, 1, 56, 1, 56, 1, 57, 1, 57, 1,
    58, 1, 58, 1, 58, 1, 58, 1, 59, 1, 59, 1, 60, 1, 60, 1, 60, 1, 60, 1, 61, 1, 61, 1, 61, 1, 61,
    1, 61, 3, 61, 803, 8, 61, 1, 61, 1, 61, 1, 61, 1, 61, 1, 61, 5, 61, 810, 8, 61, 10, 61, 12, 61,
    813, 9, 61, 1, 61, 1, 61, 1, 61, 5, 61, 818, 8, 61, 10, 61, 12, 61, 821, 9, 61, 1, 62, 1, 62, 1,
    62, 1, 62, 1, 62, 1, 62, 1, 62, 1, 62, 1, 62, 3, 62, 832, 8, 62, 1, 62, 1, 62, 1, 62, 1, 62, 1,
    62, 5, 62, 839, 8, 62, 10, 62, 12, 62, 842, 9, 62, 1, 63, 1, 63, 3, 63, 846, 8, 63, 1, 63, 5,
    63, 849, 8, 63, 10, 63, 12, 63, 852, 9, 63, 1, 64, 1, 64, 1, 65, 1, 65, 1, 65, 1, 65, 1, 66, 1,
    66, 3, 66, 862, 8, 66, 1, 67, 1, 67, 1, 67, 1, 68, 1, 68, 1, 68, 1, 69, 1, 69, 1, 69, 1, 69, 1,
    70, 1, 70, 1, 70, 1, 70, 1, 71, 1, 71, 1, 71, 1, 71, 1, 72, 1, 72, 1, 72, 1, 72, 1, 73, 1, 73,
    1, 73, 5, 73, 889, 8, 73, 10, 73, 12, 73, 892, 9, 73, 1, 74, 1, 74, 1, 74, 1, 74, 1, 75, 1, 75,
    1, 75, 3, 75, 901, 8, 75, 1, 75, 1, 75, 1, 76, 1, 76, 1, 77, 1, 77, 1, 77, 3, 77, 910, 8, 77, 1,
    77, 1, 77, 1, 78, 1, 78, 1, 78, 1, 78, 1, 79, 1, 79, 1, 79, 1, 79, 1, 79, 5, 79, 923, 8, 79, 10,
    79, 12, 79, 926, 9, 79, 1, 79, 1, 79, 1, 80, 1, 80, 1, 80, 1, 80, 1, 80, 1, 80, 5, 80, 936, 8,
    80, 10, 80, 12, 80, 939, 9, 80, 1, 80, 1, 80, 1, 80, 1, 80, 1, 80, 1, 81, 1, 81, 1, 81, 1, 81,
    1, 81, 4, 81, 951, 8, 81, 11, 81, 12, 81, 952, 1, 81, 1, 81, 1, 82, 1, 82, 1, 82, 1, 82, 1, 82,
    1, 83, 1, 83, 1, 83, 0, 3, 80, 122, 124, 84, 0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26,
    28, 30, 32, 34, 36, 38, 40, 42, 44, 46, 48, 50, 52, 54, 56, 58, 60, 62, 64, 66, 68, 70, 72, 74,
    76, 78, 80, 82, 84, 86, 88, 90, 92, 94, 96, 98, 100, 102, 104, 106, 108, 110, 112, 114, 116,
    118, 120, 122, 124, 126, 128, 130, 132, 134, 136, 138, 140, 142, 144, 146, 148, 150, 152, 154,
    156, 158, 160, 162, 164, 166, 0, 5, 2, 0, 56, 60, 98, 98, 1, 0, 62, 63, 1, 0, 99, 101, 1, 0,
    103, 104, 4, 0, 64, 65, 67, 69, 71, 71, 85, 92, 1012, 0, 169, 1, 0, 0, 0, 2, 194, 1, 0, 0, 0, 4,
    197, 1, 0, 0, 0, 6, 218, 1, 0, 0, 0, 8, 243, 1, 0, 0, 0, 10, 264, 1, 0, 0, 0, 12, 288, 1, 0, 0,
    0, 14, 297, 1, 0, 0, 0, 16, 312, 1, 0, 0, 0, 18, 339, 1, 0, 0, 0, 20, 365, 1, 0, 0, 0, 22, 368,
    1, 0, 0, 0, 24, 380, 1, 0, 0, 0, 26, 383, 1, 0, 0, 0, 28, 394, 1, 0, 0, 0, 30, 403, 1, 0, 0, 0,
    32, 412, 1, 0, 0, 0, 34, 430, 1, 0, 0, 0, 36, 446, 1, 0, 0, 0, 38, 464, 1, 0, 0, 0, 40, 475, 1,
    0, 0, 0, 42, 477, 1, 0, 0, 0, 44, 481, 1, 0, 0, 0, 46, 485, 1, 0, 0, 0, 48, 493, 1, 0, 0, 0, 50,
    515, 1, 0, 0, 0, 52, 526, 1, 0, 0, 0, 54, 529, 1, 0, 0, 0, 56, 541, 1, 0, 0, 0, 58, 546, 1, 0,
    0, 0, 60, 555, 1, 0, 0, 0, 62, 562, 1, 0, 0, 0, 64, 571, 1, 0, 0, 0, 66, 594, 1, 0, 0, 0, 68,
    603, 1, 0, 0, 0, 70, 628, 1, 0, 0, 0, 72, 652, 1, 0, 0, 0, 74, 672, 1, 0, 0, 0, 76, 691, 1, 0,
    0, 0, 78, 693, 1, 0, 0, 0, 80, 700, 1, 0, 0, 0, 82, 709, 1, 0, 0, 0, 84, 711, 1, 0, 0, 0, 86,
    713, 1, 0, 0, 0, 88, 719, 1, 0, 0, 0, 90, 721, 1, 0, 0, 0, 92, 731, 1, 0, 0, 0, 94, 733, 1, 0,
    0, 0, 96, 741, 1, 0, 0, 0, 98, 748, 1, 0, 0, 0, 100, 760, 1, 0, 0, 0, 102, 762, 1, 0, 0, 0, 104,
    769, 1, 0, 0, 0, 106, 777, 1, 0, 0, 0, 108, 779, 1, 0, 0, 0, 110, 781, 1, 0, 0, 0, 112, 783, 1,
    0, 0, 0, 114, 785, 1, 0, 0, 0, 116, 787, 1, 0, 0, 0, 118, 791, 1, 0, 0, 0, 120, 793, 1, 0, 0, 0,
    122, 802, 1, 0, 0, 0, 124, 831, 1, 0, 0, 0, 126, 845, 1, 0, 0, 0, 128, 853, 1, 0, 0, 0, 130,
    855, 1, 0, 0, 0, 132, 861, 1, 0, 0, 0, 134, 863, 1, 0, 0, 0, 136, 866, 1, 0, 0, 0, 138, 869, 1,
    0, 0, 0, 140, 873, 1, 0, 0, 0, 142, 877, 1, 0, 0, 0, 144, 881, 1, 0, 0, 0, 146, 885, 1, 0, 0, 0,
    148, 893, 1, 0, 0, 0, 150, 897, 1, 0, 0, 0, 152, 904, 1, 0, 0, 0, 154, 906, 1, 0, 0, 0, 156,
    913, 1, 0, 0, 0, 158, 917, 1, 0, 0, 0, 160, 929, 1, 0, 0, 0, 162, 945, 1, 0, 0, 0, 164, 956, 1,
    0, 0, 0, 166, 961, 1, 0, 0, 0, 168, 170, 3, 20, 10, 0, 169, 168, 1, 0, 0, 0, 169, 170, 1, 0, 0,
    0, 170, 174, 1, 0, 0, 0, 171, 173, 3, 2, 1, 0, 172, 171, 1, 0, 0, 0, 173, 176, 1, 0, 0, 0, 174,
    172, 1, 0, 0, 0, 174, 175, 1, 0, 0, 0, 175, 180, 1, 0, 0, 0, 176, 174, 1, 0, 0, 0, 177, 179, 5,
    95, 0, 0, 178, 177, 1, 0, 0, 0, 179, 182, 1, 0, 0, 0, 180, 178, 1, 0, 0, 0, 180, 181, 1, 0, 0,
    0, 181, 183, 1, 0, 0, 0, 182, 180, 1, 0, 0, 0, 183, 184, 5, 0, 0, 1, 184, 1, 1, 0, 0, 0, 185,
    195, 3, 4, 2, 0, 186, 195, 3, 6, 3, 0, 187, 195, 3, 8, 4, 0, 188, 195, 3, 10, 5, 0, 189, 195, 3,
    12, 6, 0, 190, 195, 3, 14, 7, 0, 191, 195, 3, 16, 8, 0, 192, 195, 3, 18, 9, 0, 193, 195, 3, 20,
    10, 0, 194, 185, 1, 0, 0, 0, 194, 186, 1, 0, 0, 0, 194, 187, 1, 0, 0, 0, 194, 188, 1, 0, 0, 0,
    194, 189, 1, 0, 0, 0, 194, 190, 1, 0, 0, 0, 194, 191, 1, 0, 0, 0, 194, 192, 1, 0, 0, 0, 194,
    193, 1, 0, 0, 0, 195, 3, 1, 0, 0, 0, 196, 198, 5, 108, 0, 0, 197, 196, 1, 0, 0, 0, 197, 198, 1,
    0, 0, 0, 198, 199, 1, 0, 0, 0, 199, 200, 5, 47, 0, 0, 200, 201, 5, 10, 0, 0, 201, 202, 5, 80, 0,
    0, 202, 203, 5, 81, 0, 0, 203, 204, 5, 81, 0, 0, 204, 205, 5, 70, 0, 0, 205, 206, 5, 50, 0, 0,
    206, 207, 5, 84, 0, 0, 207, 211, 5, 95, 0, 0, 208, 210, 3, 24, 12, 0, 209, 208, 1, 0, 0, 0, 210,
    213, 1, 0, 0, 0, 211, 209, 1, 0, 0, 0, 211, 212, 1, 0, 0, 0, 212, 214, 1, 0, 0, 0, 213, 211, 1,
    0, 0, 0, 214, 215, 5, 123, 0, 0, 215, 216, 5, 95, 0, 0, 216, 5, 1, 0, 0, 0, 217, 219, 5, 108, 0,
    0, 218, 217, 1, 0, 0, 0, 218, 219, 1, 0, 0, 0, 219, 220, 1, 0, 0, 0, 220, 221, 5, 47, 0, 0, 221,
    222, 3, 82, 41, 0, 222, 224, 5, 80, 0, 0, 223, 225, 3, 94, 47, 0, 224, 223, 1, 0, 0, 0, 224,
    225, 1, 0, 0, 0, 225, 226, 1, 0, 0, 0, 226, 227, 5, 81, 0, 0, 227, 228, 5, 70, 0, 0, 228, 229,
    3, 100, 50, 0, 229, 230, 5, 84, 0, 0, 230, 231, 5, 109, 0, 0, 231, 235, 5, 95, 0, 0, 232, 234,
    3, 24, 12, 0, 233, 232, 1, 0, 0, 0, 234, 237, 1, 0, 0, 0, 235, 233, 1, 0, 0, 0, 235, 236, 1, 0,
    0, 0, 236, 238, 1, 0, 0, 0, 237, 235, 1, 0, 0, 0, 238, 239, 3, 56, 28, 0, 239, 240, 5, 123, 0,
    0, 240, 241, 5, 95, 0, 0, 241, 7, 1, 0, 0, 0, 242, 244, 5, 108, 0, 0, 243, 242, 1, 0, 0, 0, 243,
    244, 1, 0, 0, 0, 244, 245, 1, 0, 0, 0, 245, 246, 5, 1, 0, 0, 246, 247, 3, 84, 42, 0, 247, 248,
    5, 80, 0, 0, 248, 249, 5, 54, 0, 0, 249, 250, 5, 81, 0, 0, 250, 251, 5, 123, 0, 0, 251, 257, 5,
    95, 0, 0, 252, 256, 3, 54, 27, 0, 253, 256, 3, 28, 14, 0, 254, 256, 3, 20, 10, 0, 255, 252, 1,
    0, 0, 0, 255, 253, 1, 0, 0, 0, 255, 254, 1, 0, 0, 0, 256, 259, 1, 0, 0, 0, 257, 255, 1, 0, 0, 0,
    257, 258, 1, 0, 0, 0, 258, 260, 1, 0, 0, 0, 259, 257, 1, 0, 0, 0, 260, 261, 5, 123, 0, 0, 261,
    262, 5, 95, 0, 0, 262, 9, 1, 0, 0, 0, 263, 265, 5, 108, 0, 0, 264, 263, 1, 0, 0, 0, 264, 265, 1,
    0, 0, 0, 265, 266, 1, 0, 0, 0, 266, 267, 5, 47, 0, 0, 267, 268, 3, 82, 41, 0, 268, 270, 5, 80,
    0, 0, 269, 271, 3, 94, 47, 0, 270, 269, 1, 0, 0, 0, 270, 271, 1, 0, 0, 0, 271, 272, 1, 0, 0, 0,
    272, 273, 5, 81, 0, 0, 273, 274, 5, 70, 0, 0, 274, 275, 5, 50, 0, 0, 275, 276, 5, 84, 0, 0, 276,
    277, 5, 110, 0, 0, 277, 281, 5, 95, 0, 0, 278, 280, 3, 24, 12, 0, 279, 278, 1, 0, 0, 0, 280,
    283, 1, 0, 0, 0, 281, 279, 1, 0, 0, 0, 281, 282, 1, 0, 0, 0, 282, 284, 1, 0, 0, 0, 283, 281, 1,
    0, 0, 0, 284, 285, 5, 123, 0, 0, 285, 286, 5, 95, 0, 0, 286, 11, 1, 0, 0, 0, 287, 289, 5, 108,
    0, 0, 288, 287, 1, 0, 0, 0, 288, 289, 1, 0, 0, 0, 289, 290, 1, 0, 0, 0, 290, 291, 3, 76, 38, 0,
    291, 292, 5, 67, 0, 0, 292, 293, 3, 88, 44, 0, 293, 294, 5, 111, 0, 0, 294, 295, 5, 95, 0, 0,
    295, 13, 1, 0, 0, 0, 296, 298, 5, 108, 0, 0, 297, 296, 1, 0, 0, 0, 297, 298, 1, 0, 0, 0, 298,
    299, 1, 0, 0, 0, 299, 300, 5, 1, 0, 0, 300, 301, 3, 86, 43, 0, 301, 302, 5, 80, 0, 0, 302, 303,
    5, 4, 0, 0, 303, 304, 5, 81, 0, 0, 304, 305, 5, 84, 0, 0, 305, 306, 5, 112, 0, 0, 306, 307, 5,
    95, 0, 0, 307, 308, 3, 96, 48, 0, 308, 309, 5, 95, 0, 0, 309, 310, 5, 123, 0, 0, 310, 15, 1, 0,
    0, 0, 311, 313, 5, 108, 0, 0, 312, 311, 1, 0, 0, 0, 312, 313, 1, 0, 0, 0, 313, 314, 1, 0, 0, 0,
    314, 315, 5, 1, 0, 0, 315, 320, 3, 86, 43, 0, 316, 317, 5, 80, 0, 0, 317, 318, 3, 86, 43, 0,
    318, 319, 5, 81, 0, 0, 319, 321, 1, 0, 0, 0, 320, 316, 1, 0, 0, 0, 320, 321, 1, 0, 0, 0, 321,
    322, 1, 0, 0, 0, 322, 323, 5, 84, 0, 0, 323, 324, 5, 113, 0, 0, 324, 332, 5, 95, 0, 0, 325, 331,
    3, 64, 32, 0, 326, 331, 3, 66, 33, 0, 327, 331, 3, 68, 34, 0, 328, 331, 3, 70, 35, 0, 329, 331,
    3, 20, 10, 0, 330, 325, 1, 0, 0, 0, 330, 326, 1, 0, 0, 0, 330, 327, 1, 0, 0, 0, 330, 328, 1, 0,
    0, 0, 330, 329, 1, 0, 0, 0, 331, 334, 1, 0, 0, 0, 332, 330, 1, 0, 0, 0, 332, 333, 1, 0, 0, 0,
    333, 335, 1, 0, 0, 0, 334, 332, 1, 0, 0, 0, 335, 336, 5, 123, 0, 0, 336, 337, 5, 95, 0, 0, 337,
    17, 1, 0, 0, 0, 338, 340, 5, 108, 0, 0, 339, 338, 1, 0, 0, 0, 339, 340, 1, 0, 0, 0, 340, 341, 1,
    0, 0, 0, 341, 342, 5, 1, 0, 0, 342, 347, 3, 86, 43, 0, 343, 344, 5, 80, 0, 0, 344, 348, 3, 86,
    43, 0, 345, 346, 5, 53, 0, 0, 346, 348, 5, 81, 0, 0, 347, 343, 1, 0, 0, 0, 347, 345, 1, 0, 0, 0,
    348, 349, 1, 0, 0, 0, 349, 350, 5, 114, 0, 0, 350, 359, 5, 95, 0, 0, 351, 358, 3, 66, 33, 0,
    352, 358, 3, 68, 34, 0, 353, 358, 3, 70, 35, 0, 354, 358, 3, 72, 36, 0, 355, 358, 3, 74, 37, 0,
    356, 358, 3, 20, 10, 0, 357, 351, 1, 0, 0, 0, 357, 352, 1, 0, 0, 0, 357, 353, 1, 0, 0, 0, 357,
    354, 1, 0, 0, 0, 357, 355, 1, 0, 0, 0, 357, 356, 1, 0, 0, 0, 358, 361, 1, 0, 0, 0, 359, 357, 1,
    0, 0, 0, 359, 360, 1, 0, 0, 0, 360, 362, 1, 0, 0, 0, 361, 359, 1, 0, 0, 0, 362, 363, 5, 123, 0,
    0, 363, 364, 5, 95, 0, 0, 364, 19, 1, 0, 0, 0, 365, 366, 3, 22, 11, 0, 366, 367, 5, 95, 0, 0,
    367, 21, 1, 0, 0, 0, 368, 369, 5, 123, 0, 0, 369, 23, 1, 0, 0, 0, 370, 381, 3, 26, 13, 0, 371,
    381, 3, 28, 14, 0, 372, 381, 3, 30, 15, 0, 373, 381, 3, 32, 16, 0, 374, 381, 3, 34, 17, 0, 375,
    381, 3, 36, 18, 0, 376, 381, 3, 38, 19, 0, 377, 381, 3, 48, 24, 0, 378, 381, 3, 50, 25, 0, 379,
    381, 3, 20, 10, 0, 380, 370, 1, 0, 0, 0, 380, 371, 1, 0, 0, 0, 380, 372, 1, 0, 0, 0, 380, 373,
    1, 0, 0, 0, 380, 374, 1, 0, 0, 0, 380, 375, 1, 0, 0, 0, 380, 376, 1, 0, 0, 0, 380, 377, 1, 0, 0,
    0, 380, 378, 1, 0, 0, 0, 380, 379, 1, 0, 0, 0, 381, 25, 1, 0, 0, 0, 382, 384, 5, 108, 0, 0, 383,
    382, 1, 0, 0, 0, 383, 384, 1, 0, 0, 0, 384, 385, 1, 0, 0, 0, 385, 386, 5, 11, 0, 0, 386, 388, 5,
    80, 0, 0, 387, 389, 3, 122, 61, 0, 388, 387, 1, 0, 0, 0, 388, 389, 1, 0, 0, 0, 389, 390, 1, 0,
    0, 0, 390, 391, 5, 81, 0, 0, 391, 392, 5, 95, 0, 0, 392, 27, 1, 0, 0, 0, 393, 395, 5, 108, 0, 0,
    394, 393, 1, 0, 0, 0, 394, 395, 1, 0, 0, 0, 395, 396, 1, 0, 0, 0, 396, 397, 3, 76, 38, 0, 397,
    398, 5, 67, 0, 0, 398, 399, 3, 122, 61, 0, 399, 400, 5, 115, 0, 0, 400, 401, 5, 95, 0, 0, 401,
    29, 1, 0, 0, 0, 402, 404, 5, 108, 0, 0, 403, 402, 1, 0, 0, 0, 403, 404, 1, 0, 0, 0, 404, 405, 1,
    0, 0, 0, 405, 406, 3, 80, 40, 0, 406, 407, 5, 67, 0, 0, 407, 408, 3, 122, 61, 0, 408, 409, 5,
    116, 0, 0, 409, 410, 5, 95, 0, 0, 410, 31, 1, 0, 0, 0, 411, 413, 5, 108, 0, 0, 412, 411, 1, 0,
    0, 0, 412, 413, 1, 0, 0, 0, 413, 414, 1, 0, 0, 0, 414, 415, 5, 6, 0, 0, 415, 416, 3, 122, 61, 0,
    416, 417, 5, 84, 0, 0, 417, 423, 5, 95, 0, 0, 418, 422, 3, 58, 29, 0, 419, 422, 3, 60, 30, 0,
    420, 422, 3, 24, 12, 0, 421, 418, 1, 0, 0, 0, 421, 419, 1, 0, 0, 0, 421, 420, 1, 0, 0, 0, 422,
    425, 1, 0, 0, 0, 423, 421, 1, 0, 0, 0, 423, 424, 1, 0, 0, 0, 424, 426, 1, 0, 0, 0, 425, 423, 1,
    0, 0, 0, 426, 427, 5, 123, 0, 0, 427, 428, 5, 95, 0, 0, 428, 33, 1, 0, 0, 0, 429, 431, 5, 108,
    0, 0, 430, 429, 1, 0, 0, 0, 430, 431, 1, 0, 0, 0, 431, 432, 1, 0, 0, 0, 432, 433, 5, 14, 0, 0,
    433, 434, 3, 122, 61, 0, 434, 435, 5, 84, 0, 0, 435, 439, 5, 95, 0, 0, 436, 438, 3, 24, 12, 0,
    437, 436, 1, 0, 0, 0, 438, 441, 1, 0, 0, 0, 439, 437, 1, 0, 0, 0, 439, 440, 1, 0, 0, 0, 440,
    442, 1, 0, 0, 0, 441, 439, 1, 0, 0, 0, 442, 443, 5, 123, 0, 0, 443, 444, 5, 95, 0, 0, 444, 35,
    1, 0, 0, 0, 445, 447, 5, 108, 0, 0, 446, 445, 1, 0, 0, 0, 446, 447, 1, 0, 0, 0, 447, 448, 1, 0,
    0, 0, 448, 449, 5, 5, 0, 0, 449, 450, 3, 76, 38, 0, 450, 451, 5, 7, 0, 0, 451, 452, 3, 122, 61,
    0, 452, 453, 5, 84, 0, 0, 453, 457, 5, 95, 0, 0, 454, 456, 3, 24, 12, 0, 455, 454, 1, 0, 0, 0,
    456, 459, 1, 0, 0, 0, 457, 455, 1, 0, 0, 0, 457, 458, 1, 0, 0, 0, 458, 460, 1, 0, 0, 0, 459,
    457, 1, 0, 0, 0, 460, 461, 5, 123, 0, 0, 461, 462, 5, 95, 0, 0, 462, 37, 1, 0, 0, 0, 463, 465,
    5, 108, 0, 0, 464, 463, 1, 0, 0, 0, 464, 465, 1, 0, 0, 0, 465, 466, 1, 0, 0, 0, 466, 467, 3, 40,
    20, 0, 467, 468, 5, 80, 0, 0, 468, 469, 3, 90, 45, 0, 469, 470, 5, 81, 0, 0, 470, 471, 5, 95, 0,
    0, 471, 39, 1, 0, 0, 0, 472, 476, 3, 82, 41, 0, 473, 476, 3, 42, 21, 0, 474, 476, 3, 44, 22, 0,
    475, 472, 1, 0, 0, 0, 475, 473, 1, 0, 0, 0, 475, 474, 1, 0, 0, 0, 476, 41, 1, 0, 0, 0, 477, 478,
    5, 74, 0, 0, 478, 479, 5, 82, 0, 0, 479, 480, 3, 82, 41, 0, 480, 43, 1, 0, 0, 0, 481, 482, 3,
    46, 23, 0, 482, 483, 5, 82, 0, 0, 483, 484, 3, 82, 41, 0, 484, 45, 1, 0, 0, 0, 485, 489, 3, 78,
    39, 0, 486, 488, 3, 120, 60, 0, 487, 486, 1, 0, 0, 0, 488, 491, 1, 0, 0, 0, 489, 487, 1, 0, 0,
    0, 489, 490, 1, 0, 0, 0, 490, 47, 1, 0, 0, 0, 491, 489, 1, 0, 0, 0, 492, 494, 5, 108, 0, 0, 493,
    492, 1, 0, 0, 0, 493, 494, 1, 0, 0, 0, 494, 495, 1, 0, 0, 0, 495, 496, 5, 13, 0, 0, 496, 500, 5,
    95, 0, 0, 497, 499, 3, 24, 12, 0, 498, 497, 1, 0, 0, 0, 499, 502, 1, 0, 0, 0, 500, 498, 1, 0, 0,
    0, 500, 501, 1, 0, 0, 0, 501, 503, 1, 0, 0, 0, 502, 500, 1, 0, 0, 0, 503, 507, 3, 62, 31, 0,
    504, 506, 3, 24, 12, 0, 505, 504, 1, 0, 0, 0, 506, 509, 1, 0, 0, 0, 507, 505, 1, 0, 0, 0, 507,
    508, 1, 0, 0, 0, 508, 510, 1, 0, 0, 0, 509, 507, 1, 0, 0, 0, 510, 511, 5, 26, 0, 0, 511, 512, 5,
    13, 0, 0, 512, 513, 5, 95, 0, 0, 513, 49, 1, 0, 0, 0, 514, 516, 5, 108, 0, 0, 515, 514, 1, 0, 0,
    0, 515, 516, 1, 0, 0, 0, 516, 517, 1, 0, 0, 0, 517, 518, 5, 52, 0, 0, 518, 519, 3, 86, 43, 0,
    519, 520, 5, 80, 0, 0, 520, 521, 3, 52, 26, 0, 521, 522, 5, 81, 0, 0, 522, 523, 5, 95, 0, 0,
    523, 51, 1, 0, 0, 0, 524, 527, 3, 114, 57, 0, 525, 527, 3, 78, 39, 0, 526, 524, 1, 0, 0, 0, 526,
    525, 1, 0, 0, 0, 527, 53, 1, 0, 0, 0, 528, 530, 5, 108, 0, 0, 529, 528, 1, 0, 0, 0, 529, 530, 1,
    0, 0, 0, 530, 531, 1, 0, 0, 0, 531, 532, 5, 74, 0, 0, 532, 533, 5, 82, 0, 0, 533, 534, 5, 45, 0,
    0, 534, 535, 5, 80, 0, 0, 535, 536, 3, 102, 51, 0, 536, 537, 5, 83, 0, 0, 537, 538, 3, 104, 52,
    0, 538, 539, 5, 81, 0, 0, 539, 540, 5, 95, 0, 0, 540, 55, 1, 0, 0, 0, 541, 542, 5, 12, 0, 0,
    542, 543, 3, 122, 61, 0, 543, 544, 5, 95, 0, 0, 544, 57, 1, 0, 0, 0, 545, 547, 5, 108, 0, 0,
    546, 545, 1, 0, 0, 0, 546, 547, 1, 0, 0, 0, 547, 548, 1, 0, 0, 0, 548, 549, 5, 2, 0, 0, 549,
    550, 3, 122, 61, 0, 550, 551, 5, 84, 0, 0, 551, 552, 5, 119, 0, 0, 552, 553, 5, 95, 0, 0, 553,
    59, 1, 0, 0, 0, 554, 556, 5, 108, 0, 0, 555, 554, 1, 0, 0, 0, 555, 556, 1, 0, 0, 0, 556, 557, 1,
    0, 0, 0, 557, 558, 5, 3, 0, 0, 558, 559, 5, 84, 0, 0, 559, 560, 5, 95, 0, 0, 560, 61, 1, 0, 0,
    0, 561, 563, 5, 108, 0, 0, 562, 561, 1, 0, 0, 0, 562, 563, 1, 0, 0, 0, 563, 564, 1, 0, 0, 0,
    564, 565, 5, 48, 0, 0, 565, 566, 3, 86, 43, 0, 566, 567, 5, 46, 0, 0, 567, 568, 3, 76, 38, 0,
    568, 569, 5, 95, 0, 0, 569, 63, 1, 0, 0, 0, 570, 572, 5, 108, 0, 0, 571, 570, 1, 0, 0, 0, 571,
    572, 1, 0, 0, 0, 572, 573, 1, 0, 0, 0, 573, 574, 5, 47, 0, 0, 574, 575, 5, 49, 0, 0, 575, 577,
    5, 80, 0, 0, 576, 578, 3, 94, 47, 0, 577, 576, 1, 0, 0, 0, 577, 578, 1, 0, 0, 0, 578, 579, 1, 0,
    0, 0, 579, 580, 5, 81, 0, 0, 580, 581, 5, 70, 0, 0, 581, 582, 5, 50, 0, 0, 582, 583, 5, 84, 0,
    0, 583, 587, 5, 95, 0, 0, 584, 586, 3, 24, 12, 0, 585, 584, 1, 0, 0, 0, 586, 589, 1, 0, 0, 0,
    587, 585, 1, 0, 0, 0, 587, 588, 1, 0, 0, 0, 588, 590, 1, 0, 0, 0, 589, 587, 1, 0, 0, 0, 590,
    591, 5, 123, 0, 0, 591, 592, 5, 95, 0, 0, 592, 65, 1, 0, 0, 0, 593, 595, 5, 108, 0, 0, 594, 593,
    1, 0, 0, 0, 594, 595, 1, 0, 0, 0, 595, 596, 1, 0, 0, 0, 596, 597, 3, 76, 38, 0, 597, 598, 5, 84,
    0, 0, 598, 599, 3, 100, 50, 0, 599, 600, 5, 120, 0, 0, 600, 601, 5, 95, 0, 0, 601, 67, 1, 0, 0,
    0, 602, 604, 5, 108, 0, 0, 603, 602, 1, 0, 0, 0, 603, 604, 1, 0, 0, 0, 604, 605, 1, 0, 0, 0,
    605, 606, 5, 47, 0, 0, 606, 607, 3, 82, 41, 0, 607, 609, 5, 80, 0, 0, 608, 610, 3, 94, 47, 0,
    609, 608, 1, 0, 0, 0, 609, 610, 1, 0, 0, 0, 610, 611, 1, 0, 0, 0, 611, 612, 5, 81, 0, 0, 612,
    613, 5, 70, 0, 0, 613, 614, 3, 100, 50, 0, 614, 615, 5, 84, 0, 0, 615, 616, 5, 121, 0, 0, 616,
    620, 5, 95, 0, 0, 617, 619, 3, 24, 12, 0, 618, 617, 1, 0, 0, 0, 619, 622, 1, 0, 0, 0, 620, 618,
    1, 0, 0, 0, 620, 621, 1, 0, 0, 0, 621, 623, 1, 0, 0, 0, 622, 620, 1, 0, 0, 0, 623, 624, 3, 56,
    28, 0, 624, 625, 5, 123, 0, 0, 625, 626, 5, 95, 0, 0, 626, 69, 1, 0, 0, 0, 627, 629, 5, 108, 0,
    0, 628, 627, 1, 0, 0, 0, 628, 629, 1, 0, 0, 0, 629, 630, 1, 0, 0, 0, 630, 631, 5, 47, 0, 0, 631,
    632, 3, 82, 41, 0, 632, 634, 5, 80, 0, 0, 633, 635, 3, 94, 47, 0, 634, 633, 1, 0, 0, 0, 634,
    635, 1, 0, 0, 0, 635, 636, 1, 0, 0, 0, 636, 637, 5, 81, 0, 0, 637, 638, 5, 70, 0, 0, 638, 639,
    5, 50, 0, 0, 639, 640, 5, 84, 0, 0, 640, 641, 5, 122, 0, 0, 641, 645, 5, 95, 0, 0, 642, 644, 3,
    24, 12, 0, 643, 642, 1, 0, 0, 0, 644, 647, 1, 0, 0, 0, 645, 643, 1, 0, 0, 0, 645, 646, 1, 0, 0,
    0, 646, 648, 1, 0, 0, 0, 647, 645, 1, 0, 0, 0, 648, 649, 5, 123, 0, 0, 649, 650, 5, 95, 0, 0,
    650, 71, 1, 0, 0, 0, 651, 653, 5, 108, 0, 0, 652, 651, 1, 0, 0, 0, 652, 653, 1, 0, 0, 0, 653,
    654, 1, 0, 0, 0, 654, 655, 5, 44, 0, 0, 655, 656, 5, 95, 0, 0, 656, 657, 5, 47, 0, 0, 657, 658,
    3, 82, 41, 0, 658, 660, 5, 80, 0, 0, 659, 661, 3, 94, 47, 0, 660, 659, 1, 0, 0, 0, 660, 661, 1,
    0, 0, 0, 661, 662, 1, 0, 0, 0, 662, 663, 5, 81, 0, 0, 663, 664, 5, 70, 0, 0, 664, 665, 3, 100,
    50, 0, 665, 666, 5, 84, 0, 0, 666, 667, 5, 95, 0, 0, 667, 668, 5, 51, 0, 0, 668, 669, 5, 123, 0,
    0, 669, 670, 5, 95, 0, 0, 670, 73, 1, 0, 0, 0, 671, 673, 5, 108, 0, 0, 672, 671, 1, 0, 0, 0,
    672, 673, 1, 0, 0, 0, 673, 674, 1, 0, 0, 0, 674, 675, 5, 44, 0, 0, 675, 676, 5, 95, 0, 0, 676,
    677, 5, 47, 0, 0, 677, 678, 3, 82, 41, 0, 678, 680, 5, 80, 0, 0, 679, 681, 3, 94, 47, 0, 680,
    679, 1, 0, 0, 0, 680, 681, 1, 0, 0, 0, 681, 682, 1, 0, 0, 0, 682, 683, 5, 81, 0, 0, 683, 684, 5,
    70, 0, 0, 684, 685, 5, 50, 0, 0, 685, 686, 5, 84, 0, 0, 686, 687, 5, 95, 0, 0, 687, 688, 5, 51,
    0, 0, 688, 689, 5, 123, 0, 0, 689, 690, 5, 95, 0, 0, 690, 75, 1, 0, 0, 0, 691, 692, 5, 97, 0, 0,
    692, 77, 1, 0, 0, 0, 693, 694, 5, 97, 0, 0, 694, 79, 1, 0, 0, 0, 695, 696, 6, 40, -1, 0, 696,
    701, 3, 78, 39, 0, 697, 698, 5, 74, 0, 0, 698, 699, 5, 82, 0, 0, 699, 701, 3, 78, 39, 0, 700,
    695, 1, 0, 0, 0, 700, 697, 1, 0, 0, 0, 701, 706, 1, 0, 0, 0, 702, 703, 10, 1, 0, 0, 703, 705, 3,
    120, 60, 0, 704, 702, 1, 0, 0, 0, 705, 708, 1, 0, 0, 0, 706, 704, 1, 0, 0, 0, 706, 707, 1, 0, 0,
    0, 707, 81, 1, 0, 0, 0, 708, 706, 1, 0, 0, 0, 709, 710, 5, 97, 0, 0, 710, 83, 1, 0, 0, 0, 711,
    712, 5, 96, 0, 0, 712, 85, 1, 0, 0, 0, 713, 714, 7, 0, 0, 0, 714, 87, 1, 0, 0, 0, 715, 720, 3,
    108, 54, 0, 716, 720, 3, 110, 55, 0, 717, 720, 3, 112, 56, 0, 718, 720, 3, 114, 57, 0, 719, 715,
    1, 0, 0, 0, 719, 716, 1, 0, 0, 0, 719, 717, 1, 0, 0, 0, 719, 718, 1, 0, 0, 0, 720, 89, 1, 0, 0,
    0, 721, 726, 3, 92, 46, 0, 722, 723, 5, 83, 0, 0, 723, 725, 3, 92, 46, 0, 724, 722, 1, 0, 0, 0,
    725, 728, 1, 0, 0, 0, 726, 724, 1, 0, 0, 0, 726, 727, 1, 0, 0, 0, 727, 91, 1, 0, 0, 0, 728, 726,
    1, 0, 0, 0, 729, 732, 3, 164, 82, 0, 730, 732, 3, 122, 61, 0, 731, 729, 1, 0, 0, 0, 731, 730, 1,
    0, 0, 0, 732, 93, 1, 0, 0, 0, 733, 738, 3, 156, 78, 0, 734, 735, 5, 83, 0, 0, 735, 737, 3, 156,
    78, 0, 736, 734, 1, 0, 0, 0, 737, 740, 1, 0, 0, 0, 738, 736, 1, 0, 0, 0, 738, 739, 1, 0, 0, 0,
    739, 95, 1, 0, 0, 0, 740, 738, 1, 0, 0, 0, 741, 744, 3, 76, 38, 0, 742, 743, 5, 83, 0, 0, 743,
    745, 3, 76, 38, 0, 744, 742, 1, 0, 0, 0, 745, 746, 1, 0, 0, 0, 746, 744, 1, 0, 0, 0, 746, 747,
    1, 0, 0, 0, 747, 97, 1, 0, 0, 0, 748, 753, 3, 122, 61, 0, 749, 750, 5, 83, 0, 0, 750, 752, 3,
    122, 61, 0, 751, 749, 1, 0, 0, 0, 752, 755, 1, 0, 0, 0, 753, 751, 1, 0, 0, 0, 753, 754, 1, 0, 0,
    0, 754, 99, 1, 0, 0, 0, 755, 753, 1, 0, 0, 0, 756, 761, 3, 162, 81, 0, 757, 761, 3, 86, 43, 0,
    758, 761, 3, 158, 79, 0, 759, 761, 3, 160, 80, 0, 760, 756, 1, 0, 0, 0, 760, 757, 1, 0, 0, 0,
    760, 758, 1, 0, 0, 0, 760, 759, 1, 0, 0, 0, 761, 101, 1, 0, 0, 0, 762, 763, 3, 122, 61, 0, 763,
    103, 1, 0, 0, 0, 764, 770, 3, 106, 53, 0, 765, 770, 3, 140, 70, 0, 766, 770, 3, 144, 72, 0, 767,
    770, 3, 132, 66, 0, 768, 770, 3, 142, 71, 0, 769, 764, 1, 0, 0, 0, 769, 765, 1, 0, 0, 0, 769,
    766, 1, 0, 0, 0, 769, 767, 1, 0, 0, 0, 769, 768, 1, 0, 0, 0, 770, 105, 1, 0, 0, 0, 771, 778, 3,
    108, 54, 0, 772, 778, 3, 110, 55, 0, 773, 778, 3, 112, 56, 0, 774, 778, 3, 114, 57, 0, 775, 778,
    3, 166, 83, 0, 776, 778, 3, 116, 58, 0, 777, 771, 1, 0, 0, 0, 777, 772, 1, 0, 0, 0, 777, 773, 1,
    0, 0, 0, 777, 774, 1, 0, 0, 0, 777, 775, 1, 0, 0, 0, 777, 776, 1, 0, 0, 0, 778, 107, 1, 0, 0, 0,
    779, 780, 7, 1, 0, 0, 780, 109, 1, 0, 0, 0, 781, 782, 7, 2, 0, 0, 782, 111, 1, 0, 0, 0, 783,
    784, 5, 102, 0, 0, 784, 113, 1, 0, 0, 0, 785, 786, 7, 3, 0, 0, 786, 115, 1, 0, 0, 0, 787, 788,
    3, 86, 43, 0, 788, 789, 5, 82, 0, 0, 789, 790, 3, 78, 39, 0, 790, 117, 1, 0, 0, 0, 791, 792, 5,
    105, 0, 0, 792, 119, 1, 0, 0, 0, 793, 794, 5, 78, 0, 0, 794, 795, 3, 122, 61, 0, 795, 796, 5,
    79, 0, 0, 796, 121, 1, 0, 0, 0, 797, 798, 6, 61, -1, 0, 798, 803, 3, 154, 77, 0, 799, 803, 3,
    132, 66, 0, 800, 803, 3, 124, 62, 0, 801, 803, 3, 138, 69, 0, 802, 797, 1, 0, 0, 0, 802, 799, 1,
    0, 0, 0, 802, 800, 1, 0, 0, 0, 802, 801, 1, 0, 0, 0, 803, 819, 1, 0, 0, 0, 804, 805, 10, 1, 0,
    0, 805, 806, 5, 6, 0, 0, 806, 811, 3, 122, 61, 0, 807, 808, 5, 2, 0, 0, 808, 810, 3, 122, 61, 0,
    809, 807, 1, 0, 0, 0, 810, 813, 1, 0, 0, 0, 811, 809, 1, 0, 0, 0, 811, 812, 1, 0, 0, 0, 812,
    814, 1, 0, 0, 0, 813, 811, 1, 0, 0, 0, 814, 815, 5, 3, 0, 0, 815, 816, 3, 122, 61, 2, 816, 818,
    1, 0, 0, 0, 817, 804, 1, 0, 0, 0, 818, 821, 1, 0, 0, 0, 819, 817, 1, 0, 0, 0, 819, 820, 1, 0, 0,
    0, 820, 123, 1, 0, 0, 0, 821, 819, 1, 0, 0, 0, 822, 823, 6, 62, -1, 0, 823, 832, 3, 128, 64, 0,
    824, 832, 3, 130, 65, 0, 825, 832, 3, 106, 53, 0, 826, 832, 3, 140, 70, 0, 827, 832, 3, 144, 72,
    0, 828, 832, 3, 142, 71, 0, 829, 832, 3, 78, 39, 0, 830, 832, 3, 150, 75, 0, 831, 822, 1, 0, 0,
    0, 831, 824, 1, 0, 0, 0, 831, 825, 1, 0, 0, 0, 831, 826, 1, 0, 0, 0, 831, 827, 1, 0, 0, 0, 831,
    828, 1, 0, 0, 0, 831, 829, 1, 0, 0, 0, 831, 830, 1, 0, 0, 0, 832, 840, 1, 0, 0, 0, 833, 834, 10,
    2, 0, 0, 834, 839, 3, 120, 60, 0, 835, 836, 10, 1, 0, 0, 836, 837, 5, 82, 0, 0, 837, 839, 3,
    126, 63, 0, 838, 833, 1, 0, 0, 0, 838, 835, 1, 0, 0, 0, 839, 842, 1, 0, 0, 0, 840, 838, 1, 0, 0,
    0, 840, 841, 1, 0, 0, 0, 841, 125, 1, 0, 0, 0, 842, 840, 1, 0, 0, 0, 843, 846, 3, 78, 39, 0,
    844, 846, 3, 150, 75, 0, 845, 843, 1, 0, 0, 0, 845, 844, 1, 0, 0, 0, 846, 850, 1, 0, 0, 0, 847,
    849, 3, 120, 60, 0, 848, 847, 1, 0, 0, 0, 849, 852, 1, 0, 0, 0, 850, 848, 1, 0, 0, 0, 850, 851,
    1, 0, 0, 0, 851, 127, 1, 0, 0, 0, 852, 850, 1, 0, 0, 0, 853, 854, 5, 74, 0, 0, 854, 129, 1, 0,
    0, 0, 855, 856, 5, 80, 0, 0, 856, 857, 3, 122, 61, 0, 857, 858, 5, 81, 0, 0, 858, 131, 1, 0, 0,
    0, 859, 862, 3, 134, 67, 0, 860, 862, 3, 136, 68, 0, 861, 859, 1, 0, 0, 0, 861, 860, 1, 0, 0, 0,
    862, 133, 1, 0, 0, 0, 863, 864, 5, 86, 0, 0, 864, 865, 3, 124, 62, 0, 865, 135, 1, 0, 0, 0, 866,
    867, 5, 66, 0, 0, 867, 868, 3, 124, 62, 0, 868, 137, 1, 0, 0, 0, 869, 870, 3, 124, 62, 0, 870,
    871, 3, 152, 76, 0, 871, 872, 3, 122, 61, 0, 872, 139, 1, 0, 0, 0, 873, 874, 5, 78, 0, 0, 874,
    875, 3, 98, 49, 0, 875, 876, 5, 79, 0, 0, 876, 141, 1, 0, 0, 0, 877, 878, 5, 80, 0, 0, 878, 879,
    3, 98, 49, 0, 879, 880, 5, 81, 0, 0, 880, 143, 1, 0, 0, 0, 881, 882, 5, 76, 0, 0, 882, 883, 3,
    146, 73, 0, 883, 884, 5, 77, 0, 0, 884, 145, 1, 0, 0, 0, 885, 890, 3, 148, 74, 0, 886, 887, 5,
    83, 0, 0, 887, 889, 3, 148, 74, 0, 888, 886, 1, 0, 0, 0, 889, 892, 1, 0, 0, 0, 890, 888, 1, 0,
    0, 0, 890, 891, 1, 0, 0, 0, 891, 147, 1, 0, 0, 0, 892, 890, 1, 0, 0, 0, 893, 894, 3, 122, 61, 0,
    894, 895, 5, 84, 0, 0, 895, 896, 3, 122, 61, 0, 896, 149, 1, 0, 0, 0, 897, 898, 3, 82, 41, 0,
    898, 900, 5, 80, 0, 0, 899, 901, 3, 90, 45, 0, 900, 899, 1, 0, 0, 0, 900, 901, 1, 0, 0, 0, 901,
    902, 1, 0, 0, 0, 902, 903, 5, 81, 0, 0, 903, 151, 1, 0, 0, 0, 904, 905, 7, 4, 0, 0, 905, 153, 1,
    0, 0, 0, 906, 907, 3, 100, 50, 0, 907, 909, 5, 80, 0, 0, 908, 910, 3, 90, 45, 0, 909, 908, 1, 0,
    0, 0, 909, 910, 1, 0, 0, 0, 910, 911, 1, 0, 0, 0, 911, 912, 5, 81, 0, 0, 912, 155, 1, 0, 0, 0,
    913, 914, 3, 76, 38, 0, 914, 915, 5, 84, 0, 0, 915, 916, 3, 100, 50, 0, 916, 157, 1, 0, 0, 0,
    917, 918, 3, 86, 43, 0, 918, 919, 5, 78, 0, 0, 919, 924, 3, 100, 50, 0, 920, 921, 5, 83, 0, 0,
    921, 923, 3, 100, 50, 0, 922, 920, 1, 0, 0, 0, 923, 926, 1, 0, 0, 0, 924, 922, 1, 0, 0, 0, 924,
    925, 1, 0, 0, 0, 925, 927, 1, 0, 0, 0, 926, 924, 1, 0, 0, 0, 927, 928, 5, 79, 0, 0, 928, 159, 1,
    0, 0, 0, 929, 930, 5, 61, 0, 0, 930, 931, 5, 78, 0, 0, 931, 932, 5, 78, 0, 0, 932, 937, 3, 100,
    50, 0, 933, 934, 5, 83, 0, 0, 934, 936, 3, 100, 50, 0, 935, 933, 1, 0, 0, 0, 936, 939, 1, 0, 0,
    0, 937, 935, 1, 0, 0, 0, 937, 938, 1, 0, 0, 0, 938, 940, 1, 0, 0, 0, 939, 937, 1, 0, 0, 0, 940,
    941, 5, 79, 0, 0, 941, 942, 5, 83, 0, 0, 942, 943, 3, 100, 50, 0, 943, 944, 5, 79, 0, 0, 944,
    161, 1, 0, 0, 0, 945, 946, 5, 55, 0, 0, 946, 947, 5, 78, 0, 0, 947, 950, 3, 100, 50, 0, 948,
    949, 5, 83, 0, 0, 949, 951, 3, 100, 50, 0, 950, 948, 1, 0, 0, 0, 951, 952, 1, 0, 0, 0, 952, 950,
    1, 0, 0, 0, 952, 953, 1, 0, 0, 0, 953, 954, 1, 0, 0, 0, 954, 955, 5, 79, 0, 0, 955, 163, 1, 0,
    0, 0, 956, 957, 5, 9, 0, 0, 957, 958, 3, 94, 47, 0, 958, 959, 5, 84, 0, 0, 959, 960, 3, 122, 61,
    0, 960, 165, 1, 0, 0, 0, 961, 962, 5, 104, 0, 0, 962, 167, 1, 0, 0, 0, 89, 169, 174, 180, 194,
    197, 211, 218, 224, 235, 243, 255, 257, 264, 270, 281, 288, 297, 312, 320, 330, 332, 339, 347,
    357, 359, 380, 383, 388, 394, 403, 412, 421, 423, 430, 439, 446, 457, 464, 475, 489, 493, 500,
    507, 515, 526, 529, 546, 555, 562, 571, 577, 587, 594, 603, 609, 620, 628, 634, 645, 652, 660,
    672, 680, 700, 706, 719, 726, 731, 738, 746, 753, 760, 769, 777, 802, 811, 819, 831, 838, 840,
    845, 850, 861, 890, 900, 909, 924, 937, 952,
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
  public COMMENT(): antlr.TerminalNode {
    return this.getToken(PythonParser.COMMENT, 0)!;
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
  public FUNCTION_ANNOTATION(): antlr.TerminalNode {
    return this.getToken(PythonParser.FUNCTION_ANNOTATION, 0)!;
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
  public COMMENT(): antlr.TerminalNode {
    return this.getToken(PythonParser.COMMENT, 0)!;
  }
  public GHOSTED(): antlr.TerminalNode | null {
    return this.getToken(PythonParser.GHOSTED, 0);
  }
  public paramList(): ParamListContext | null {
    return this.getRuleContext(0, ParamListContext);
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
  public COMMENT(): antlr.TerminalNode[];
  public COMMENT(i: number): antlr.TerminalNode | null;
  public COMMENT(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    if (i === undefined) {
      return this.getTokens(PythonParser.COMMENT);
    } else {
      return this.getToken(PythonParser.COMMENT, i);
    }
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
  public GHOSTED(): antlr.TerminalNode | null {
    return this.getToken(PythonParser.GHOSTED, 0);
  }
  public assert(): AssertContext[];
  public assert(i: number): AssertContext | null;
  public assert(i?: number): AssertContext[] | AssertContext | null {
    if (i === undefined) {
      return this.getRuleContexts(AssertContext);
    }

    return this.getRuleContext(i, AssertContext);
  }
  public variableDefinition(): VariableDefinitionContext[];
  public variableDefinition(i: number): VariableDefinitionContext | null;
  public variableDefinition(
    i?: number,
  ): VariableDefinitionContext[] | VariableDefinitionContext | null {
    if (i === undefined) {
      return this.getRuleContexts(VariableDefinitionContext);
    }

    return this.getRuleContext(i, VariableDefinitionContext);
  }
  public comment(): CommentContext[];
  public comment(i: number): CommentContext | null;
  public comment(i?: number): CommentContext[] | CommentContext | null {
    if (i === undefined) {
      return this.getRuleContexts(CommentContext);
    }

    return this.getRuleContext(i, CommentContext);
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
  public PROCECDURE_ANNOTATION(): antlr.TerminalNode {
    return this.getToken(PythonParser.PROCECDURE_ANNOTATION, 0)!;
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
  public COMMENT(): antlr.TerminalNode {
    return this.getToken(PythonParser.COMMENT, 0)!;
  }
  public GHOSTED(): antlr.TerminalNode | null {
    return this.getToken(PythonParser.GHOSTED, 0);
  }
  public paramList(): ParamListContext | null {
    return this.getRuleContext(0, ParamListContext);
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
  public CONSTANT_ANNOTATION(): antlr.TerminalNode {
    return this.getToken(PythonParser.CONSTANT_ANNOTATION, 0)!;
  }
  public NL(): antlr.TerminalNode {
    return this.getToken(PythonParser.NL, 0)!;
  }
  public GHOSTED(): antlr.TerminalNode | null {
    return this.getToken(PythonParser.GHOSTED, 0);
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
  public ENUM_ANNOTATION(): antlr.TerminalNode {
    return this.getToken(PythonParser.ENUM_ANNOTATION, 0)!;
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
  public COMMENT(): antlr.TerminalNode {
    return this.getToken(PythonParser.COMMENT, 0)!;
  }
  public GHOSTED(): antlr.TerminalNode | null {
    return this.getToken(PythonParser.GHOSTED, 0);
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
  public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
    super(parent, invokingState);
  }
  public CLASS(): antlr.TerminalNode {
    return this.getToken(PythonParser.CLASS, 0)!;
  }
  public typeName(): TypeNameContext[];
  public typeName(i: number): TypeNameContext | null;
  public typeName(i?: number): TypeNameContext[] | TypeNameContext | null {
    if (i === undefined) {
      return this.getRuleContexts(TypeNameContext);
    }

    return this.getRuleContext(i, TypeNameContext);
  }
  public COLON(): antlr.TerminalNode {
    return this.getToken(PythonParser.COLON, 0)!;
  }
  public CONCRETE_CLASS_ANNOTATION(): antlr.TerminalNode {
    return this.getToken(PythonParser.CONCRETE_CLASS_ANNOTATION, 0)!;
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
  public COMMENT(): antlr.TerminalNode {
    return this.getToken(PythonParser.COMMENT, 0)!;
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
  public constructorMember(): ConstructorMemberContext[];
  public constructorMember(i: number): ConstructorMemberContext | null;
  public constructorMember(
    i?: number,
  ): ConstructorMemberContext[] | ConstructorMemberContext | null {
    if (i === undefined) {
      return this.getRuleContexts(ConstructorMemberContext);
    }

    return this.getRuleContext(i, ConstructorMemberContext);
  }
  public property(): PropertyContext[];
  public property(i: number): PropertyContext | null;
  public property(i?: number): PropertyContext[] | PropertyContext | null {
    if (i === undefined) {
      return this.getRuleContexts(PropertyContext);
    }

    return this.getRuleContext(i, PropertyContext);
  }
  public functionMethod(): FunctionMethodContext[];
  public functionMethod(i: number): FunctionMethodContext | null;
  public functionMethod(i?: number): FunctionMethodContext[] | FunctionMethodContext | null {
    if (i === undefined) {
      return this.getRuleContexts(FunctionMethodContext);
    }

    return this.getRuleContext(i, FunctionMethodContext);
  }
  public procedureMethod(): ProcedureMethodContext[];
  public procedureMethod(i: number): ProcedureMethodContext | null;
  public procedureMethod(i?: number): ProcedureMethodContext[] | ProcedureMethodContext | null {
    if (i === undefined) {
      return this.getRuleContexts(ProcedureMethodContext);
    }

    return this.getRuleContext(i, ProcedureMethodContext);
  }
  public comment(): CommentContext[];
  public comment(i: number): CommentContext | null;
  public comment(i?: number): CommentContext[] | CommentContext | null {
    if (i === undefined) {
      return this.getRuleContexts(CommentContext);
    }

    return this.getRuleContext(i, CommentContext);
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

export class AbstractClassContext extends antlr.ParserRuleContext {
  public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
    super(parent, invokingState);
  }
  public CLASS(): antlr.TerminalNode {
    return this.getToken(PythonParser.CLASS, 0)!;
  }
  public typeName(): TypeNameContext[];
  public typeName(i: number): TypeNameContext | null;
  public typeName(i?: number): TypeNameContext[] | TypeNameContext | null {
    if (i === undefined) {
      return this.getRuleContexts(TypeNameContext);
    }

    return this.getRuleContext(i, TypeNameContext);
  }
  public ABSTRACT_CLASS_ANNOTATION(): antlr.TerminalNode {
    return this.getToken(PythonParser.ABSTRACT_CLASS_ANNOTATION, 0)!;
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
  public COMMENT(): antlr.TerminalNode {
    return this.getToken(PythonParser.COMMENT, 0)!;
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
  public property(): PropertyContext[];
  public property(i: number): PropertyContext | null;
  public property(i?: number): PropertyContext[] | PropertyContext | null {
    if (i === undefined) {
      return this.getRuleContexts(PropertyContext);
    }

    return this.getRuleContext(i, PropertyContext);
  }
  public functionMethod(): FunctionMethodContext[];
  public functionMethod(i: number): FunctionMethodContext | null;
  public functionMethod(i?: number): FunctionMethodContext[] | FunctionMethodContext | null {
    if (i === undefined) {
      return this.getRuleContexts(FunctionMethodContext);
    }

    return this.getRuleContext(i, FunctionMethodContext);
  }
  public procedureMethod(): ProcedureMethodContext[];
  public procedureMethod(i: number): ProcedureMethodContext | null;
  public procedureMethod(i?: number): ProcedureMethodContext[] | ProcedureMethodContext | null {
    if (i === undefined) {
      return this.getRuleContexts(ProcedureMethodContext);
    }

    return this.getRuleContext(i, ProcedureMethodContext);
  }
  public abstractFunction(): AbstractFunctionContext[];
  public abstractFunction(i: number): AbstractFunctionContext | null;
  public abstractFunction(i?: number): AbstractFunctionContext[] | AbstractFunctionContext | null {
    if (i === undefined) {
      return this.getRuleContexts(AbstractFunctionContext);
    }

    return this.getRuleContext(i, AbstractFunctionContext);
  }
  public abstractProcedure(): AbstractProcedureContext[];
  public abstractProcedure(i: number): AbstractProcedureContext | null;
  public abstractProcedure(
    i?: number,
  ): AbstractProcedureContext[] | AbstractProcedureContext | null {
    if (i === undefined) {
      return this.getRuleContexts(AbstractProcedureContext);
    }

    return this.getRuleContext(i, AbstractProcedureContext);
  }
  public comment(): CommentContext[];
  public comment(i: number): CommentContext | null;
  public comment(i?: number): CommentContext[] | CommentContext | null {
    if (i === undefined) {
      return this.getRuleContexts(CommentContext);
    }

    return this.getRuleContext(i, CommentContext);
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
  public print(): PrintContext | null {
    return this.getRuleContext(0, PrintContext);
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

export class PrintContext extends antlr.ParserRuleContext {
  public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
    super(parent, invokingState);
  }
  public PRINT(): antlr.TerminalNode {
    return this.getToken(PythonParser.PRINT, 0)!;
  }
  public OPEN_BRACKET(): antlr.TerminalNode {
    return this.getToken(PythonParser.OPEN_BRACKET, 0)!;
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
  public expression(): ExpressionContext | null {
    return this.getRuleContext(0, ExpressionContext);
  }
  public override get ruleIndex(): number {
    return PythonParser.RULE_print;
  }
  public override enterRule(listener: PythonListener): void {
    if (listener.enterPrint) {
      listener.enterPrint(this);
    }
  }
  public override exitRule(listener: PythonListener): void {
    if (listener.exitPrint) {
      listener.exitPrint(this);
    }
  }
  public override accept<Result>(visitor: PythonVisitor<Result>): Result | null {
    if (visitor.visitPrint) {
      return visitor.visitPrint(this);
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
  public VARIABLE_ANNOTATION(): antlr.TerminalNode {
    return this.getToken(PythonParser.VARIABLE_ANNOTATION, 0)!;
  }
  public NL(): antlr.TerminalNode {
    return this.getToken(PythonParser.NL, 0)!;
  }
  public GHOSTED(): antlr.TerminalNode | null {
    return this.getToken(PythonParser.GHOSTED, 0);
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
  public ASSIGNMENT_ANNOTATION(): antlr.TerminalNode {
    return this.getToken(PythonParser.ASSIGNMENT_ANNOTATION, 0)!;
  }
  public NL(): antlr.TerminalNode {
    return this.getToken(PythonParser.NL, 0)!;
  }
  public GHOSTED(): antlr.TerminalNode | null {
    return this.getToken(PythonParser.GHOSTED, 0);
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
  public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
    super(parent, invokingState);
  }
  public IF(): antlr.TerminalNode {
    return this.getToken(PythonParser.IF, 0)!;
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
  public COMMENT(): antlr.TerminalNode {
    return this.getToken(PythonParser.COMMENT, 0)!;
  }
  public GHOSTED(): antlr.TerminalNode | null {
    return this.getToken(PythonParser.GHOSTED, 0);
  }
  public elseIfClause(): ElseIfClauseContext[];
  public elseIfClause(i: number): ElseIfClauseContext | null;
  public elseIfClause(i?: number): ElseIfClauseContext[] | ElseIfClauseContext | null {
    if (i === undefined) {
      return this.getRuleContexts(ElseIfClauseContext);
    }

    return this.getRuleContext(i, ElseIfClauseContext);
  }
  public elseClause(): ElseClauseContext[];
  public elseClause(i: number): ElseClauseContext | null;
  public elseClause(i?: number): ElseClauseContext[] | ElseClauseContext | null {
    if (i === undefined) {
      return this.getRuleContexts(ElseClauseContext);
    }

    return this.getRuleContext(i, ElseClauseContext);
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
  public COMMENT(): antlr.TerminalNode {
    return this.getToken(PythonParser.COMMENT, 0)!;
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
  public COMMENT(): antlr.TerminalNode {
    return this.getToken(PythonParser.COMMENT, 0)!;
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
  public procRef(): ProcRefContext {
    return this.getRuleContext(0, ProcRefContext)!;
  }
  public OPEN_BRACKET(): antlr.TerminalNode {
    return this.getToken(PythonParser.OPEN_BRACKET, 0)!;
  }
  public argList(): ArgListContext {
    return this.getRuleContext(0, ArgListContext)!;
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

export class ProcRefContext extends antlr.ParserRuleContext {
  public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
    super(parent, invokingState);
  }
  public methodName(): MethodNameContext | null {
    return this.getRuleContext(0, MethodNameContext);
  }
  public thisProcRef(): ThisProcRefContext | null {
    return this.getRuleContext(0, ThisProcRefContext);
  }
  public instanceProcRef(): InstanceProcRefContext | null {
    return this.getRuleContext(0, InstanceProcRefContext);
  }
  public override get ruleIndex(): number {
    return PythonParser.RULE_procRef;
  }
  public override enterRule(listener: PythonListener): void {
    if (listener.enterProcRef) {
      listener.enterProcRef(this);
    }
  }
  public override exitRule(listener: PythonListener): void {
    if (listener.exitProcRef) {
      listener.exitProcRef(this);
    }
  }
  public override accept<Result>(visitor: PythonVisitor<Result>): Result | null {
    if (visitor.visitProcRef) {
      return visitor.visitProcRef(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class ThisProcRefContext extends antlr.ParserRuleContext {
  public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
    super(parent, invokingState);
  }
  public THIS_INSTANCE(): antlr.TerminalNode {
    return this.getToken(PythonParser.THIS_INSTANCE, 0)!;
  }
  public DOT(): antlr.TerminalNode {
    return this.getToken(PythonParser.DOT, 0)!;
  }
  public methodName(): MethodNameContext {
    return this.getRuleContext(0, MethodNameContext)!;
  }
  public override get ruleIndex(): number {
    return PythonParser.RULE_thisProcRef;
  }
  public override enterRule(listener: PythonListener): void {
    if (listener.enterThisProcRef) {
      listener.enterThisProcRef(this);
    }
  }
  public override exitRule(listener: PythonListener): void {
    if (listener.exitThisProcRef) {
      listener.exitThisProcRef(this);
    }
  }
  public override accept<Result>(visitor: PythonVisitor<Result>): Result | null {
    if (visitor.visitThisProcRef) {
      return visitor.visitThisProcRef(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class InstanceProcRefContext extends antlr.ParserRuleContext {
  public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
    super(parent, invokingState);
  }
  public identifierWithOptIndexes(): IdentifierWithOptIndexesContext {
    return this.getRuleContext(0, IdentifierWithOptIndexesContext)!;
  }
  public DOT(): antlr.TerminalNode {
    return this.getToken(PythonParser.DOT, 0)!;
  }
  public methodName(): MethodNameContext {
    return this.getRuleContext(0, MethodNameContext)!;
  }
  public override get ruleIndex(): number {
    return PythonParser.RULE_instanceProcRef;
  }
  public override enterRule(listener: PythonListener): void {
    if (listener.enterInstanceProcRef) {
      listener.enterInstanceProcRef(this);
    }
  }
  public override exitRule(listener: PythonListener): void {
    if (listener.exitInstanceProcRef) {
      listener.exitInstanceProcRef(this);
    }
  }
  public override accept<Result>(visitor: PythonVisitor<Result>): Result | null {
    if (visitor.visitInstanceProcRef) {
      return visitor.visitInstanceProcRef(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class IdentifierWithOptIndexesContext extends antlr.ParserRuleContext {
  public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
    super(parent, invokingState);
  }
  public identifierUse(): IdentifierUseContext {
    return this.getRuleContext(0, IdentifierUseContext)!;
  }
  public index(): IndexContext[];
  public index(i: number): IndexContext | null;
  public index(i?: number): IndexContext[] | IndexContext | null {
    if (i === undefined) {
      return this.getRuleContexts(IndexContext);
    }

    return this.getRuleContext(i, IndexContext);
  }
  public override get ruleIndex(): number {
    return PythonParser.RULE_identifierWithOptIndexes;
  }
  public override enterRule(listener: PythonListener): void {
    if (listener.enterIdentifierWithOptIndexes) {
      listener.enterIdentifierWithOptIndexes(this);
    }
  }
  public override exitRule(listener: PythonListener): void {
    if (listener.exitIdentifierWithOptIndexes) {
      listener.exitIdentifierWithOptIndexes(this);
    }
  }
  public override accept<Result>(visitor: PythonVisitor<Result>): Result | null {
    if (visitor.visitIdentifierWithOptIndexes) {
      return visitor.visitIdentifierWithOptIndexes(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class TryStatementContext extends antlr.ParserRuleContext {
  public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
    super(parent, invokingState);
  }
  public TRY(): antlr.TerminalNode[];
  public TRY(i: number): antlr.TerminalNode | null;
  public TRY(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    if (i === undefined) {
      return this.getTokens(PythonParser.TRY);
    } else {
      return this.getToken(PythonParser.TRY, i);
    }
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
  public catchStatement(): CatchStatementContext {
    return this.getRuleContext(0, CatchStatementContext)!;
  }
  public END(): antlr.TerminalNode {
    return this.getToken(PythonParser.END, 0)!;
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
  public COLON(): antlr.TerminalNode {
    return this.getToken(PythonParser.COLON, 0)!;
  }
  public ELSE_IF_ANNOTATION(): antlr.TerminalNode {
    return this.getToken(PythonParser.ELSE_IF_ANNOTATION, 0)!;
  }
  public NL(): antlr.TerminalNode {
    return this.getToken(PythonParser.NL, 0)!;
  }
  public GHOSTED(): antlr.TerminalNode | null {
    return this.getToken(PythonParser.GHOSTED, 0);
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
  public COLON(): antlr.TerminalNode {
    return this.getToken(PythonParser.COLON, 0)!;
  }
  public NL(): antlr.TerminalNode {
    return this.getToken(PythonParser.NL, 0)!;
  }
  public GHOSTED(): antlr.TerminalNode | null {
    return this.getToken(PythonParser.GHOSTED, 0);
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
  public COMMENT(): antlr.TerminalNode {
    return this.getToken(PythonParser.COMMENT, 0)!;
  }
  public GHOSTED(): antlr.TerminalNode | null {
    return this.getToken(PythonParser.GHOSTED, 0);
  }
  public paramList(): ParamListContext | null {
    return this.getRuleContext(0, ParamListContext);
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
  public PROPERTY_ANNOTATION(): antlr.TerminalNode {
    return this.getToken(PythonParser.PROPERTY_ANNOTATION, 0)!;
  }
  public NL(): antlr.TerminalNode {
    return this.getToken(PythonParser.NL, 0)!;
  }
  public GHOSTED(): antlr.TerminalNode | null {
    return this.getToken(PythonParser.GHOSTED, 0);
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
  public FUNCTION_METHOD_ANNOTATION(): antlr.TerminalNode {
    return this.getToken(PythonParser.FUNCTION_METHOD_ANNOTATION, 0)!;
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
  public COMMENT(): antlr.TerminalNode {
    return this.getToken(PythonParser.COMMENT, 0)!;
  }
  public GHOSTED(): antlr.TerminalNode | null {
    return this.getToken(PythonParser.GHOSTED, 0);
  }
  public paramList(): ParamListContext | null {
    return this.getRuleContext(0, ParamListContext);
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
  public PROCEDURE_METHOD_ANNOTATION(): antlr.TerminalNode {
    return this.getToken(PythonParser.PROCEDURE_METHOD_ANNOTATION, 0)!;
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
  public COMMENT(): antlr.TerminalNode {
    return this.getToken(PythonParser.COMMENT, 0)!;
  }
  public GHOSTED(): antlr.TerminalNode | null {
    return this.getToken(PythonParser.GHOSTED, 0);
  }
  public paramList(): ParamListContext | null {
    return this.getRuleContext(0, ParamListContext);
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
  public COMMENT(): antlr.TerminalNode {
    return this.getToken(PythonParser.COMMENT, 0)!;
  }
  public GHOSTED(): antlr.TerminalNode | null {
    return this.getToken(PythonParser.GHOSTED, 0);
  }
  public paramList(): ParamListContext | null {
    return this.getRuleContext(0, ParamListContext);
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
  public COMMENT(): antlr.TerminalNode {
    return this.getToken(PythonParser.COMMENT, 0)!;
  }
  public GHOSTED(): antlr.TerminalNode | null {
    return this.getToken(PythonParser.GHOSTED, 0);
  }
  public paramList(): ParamListContext | null {
    return this.getRuleContext(0, ParamListContext);
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
  public identifierUse(): IdentifierUseContext | null {
    return this.getRuleContext(0, IdentifierUseContext);
  }
  public THIS_INSTANCE(): antlr.TerminalNode | null {
    return this.getToken(PythonParser.THIS_INSTANCE, 0);
  }
  public DOT(): antlr.TerminalNode | null {
    return this.getToken(PythonParser.DOT, 0);
  }
  public assignable(): AssignableContext | null {
    return this.getRuleContext(0, AssignableContext);
  }
  public index(): IndexContext | null {
    return this.getRuleContext(0, IndexContext);
  }
  public override get ruleIndex(): number {
    return PythonParser.RULE_assignable;
  }
  public override enterRule(listener: PythonListener): void {
    if (listener.enterAssignable) {
      listener.enterAssignable(this);
    }
  }
  public override exitRule(listener: PythonListener): void {
    if (listener.exitAssignable) {
      listener.exitAssignable(this);
    }
  }
  public override accept<Result>(visitor: PythonVisitor<Result>): Result | null {
    if (visitor.visitAssignable) {
      return visitor.visitAssignable(this);
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
  public INT_NAME(): antlr.TerminalNode | null {
    return this.getToken(PythonParser.INT_NAME, 0);
  }
  public FLOAT_NAME(): antlr.TerminalNode | null {
    return this.getToken(PythonParser.FLOAT_NAME, 0);
  }
  public BOOL_NAME(): antlr.TerminalNode | null {
    return this.getToken(PythonParser.BOOL_NAME, 0);
  }
  public STRING_NAME(): antlr.TerminalNode | null {
    return this.getToken(PythonParser.STRING_NAME, 0);
  }
  public LIST_NAME(): antlr.TerminalNode | null {
    return this.getToken(PythonParser.LIST_NAME, 0);
  }
  public NAME_STARTING_UC(): antlr.TerminalNode | null {
    return this.getToken(PythonParser.NAME_STARTING_UC, 0);
  }
  public override get ruleIndex(): number {
    return PythonParser.RULE_typeName;
  }
  public override enterRule(listener: PythonListener): void {
    if (listener.enterTypeName) {
      listener.enterTypeName(this);
    }
  }
  public override exitRule(listener: PythonListener): void {
    if (listener.exitTypeName) {
      listener.exitTypeName(this);
    }
  }
  public override accept<Result>(visitor: PythonVisitor<Result>): Result | null {
    if (visitor.visitTypeName) {
      return visitor.visitTypeName(this);
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
  public LITERAL_INTEGER(): antlr.TerminalNode | null {
    return this.getToken(PythonParser.LITERAL_INTEGER, 0);
  }
  public LITERAL_BINARY(): antlr.TerminalNode | null {
    return this.getToken(PythonParser.LITERAL_BINARY, 0);
  }
  public LITERAL_HEX(): antlr.TerminalNode | null {
    return this.getToken(PythonParser.LITERAL_HEX, 0);
  }
  public override get ruleIndex(): number {
    return PythonParser.RULE_litInt;
  }
  public override enterRule(listener: PythonListener): void {
    if (listener.enterLitInt) {
      listener.enterLitInt(this);
    }
  }
  public override exitRule(listener: PythonListener): void {
    if (listener.exitLitInt) {
      listener.exitLitInt(this);
    }
  }
  public override accept<Result>(visitor: PythonVisitor<Result>): Result | null {
    if (visitor.visitLitInt) {
      return visitor.visitLitInt(this);
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

export class LitRegExpContext extends antlr.ParserRuleContext {
  public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
    super(parent, invokingState);
  }
  public LITERAL_REGEXP(): antlr.TerminalNode {
    return this.getToken(PythonParser.LITERAL_REGEXP, 0)!;
  }
  public override get ruleIndex(): number {
    return PythonParser.RULE_litRegExp;
  }
  public override enterRule(listener: PythonListener): void {
    if (listener.enterLitRegExp) {
      listener.enterLitRegExp(this);
    }
  }
  public override exitRule(listener: PythonListener): void {
    if (listener.exitLitRegExp) {
      listener.exitLitRegExp(this);
    }
  }
  public override accept<Result>(visitor: PythonVisitor<Result>): Result | null {
    if (visitor.visitLitRegExp) {
      return visitor.visitLitRegExp(this);
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
  public newInstance(): NewInstanceContext | null {
    return this.getRuleContext(0, NewInstanceContext);
  }
  public unaryExpression(): UnaryExpressionContext | null {
    return this.getRuleContext(0, UnaryExpressionContext);
  }
  public term(): TermContext | null {
    return this.getRuleContext(0, TermContext);
  }
  public binaryExpression(): BinaryExpressionContext | null {
    return this.getRuleContext(0, BinaryExpressionContext);
  }
  public expression(): ExpressionContext[];
  public expression(i: number): ExpressionContext | null;
  public expression(i?: number): ExpressionContext[] | ExpressionContext | null {
    if (i === undefined) {
      return this.getRuleContexts(ExpressionContext);
    }

    return this.getRuleContext(i, ExpressionContext);
  }
  public IF(): antlr.TerminalNode | null {
    return this.getToken(PythonParser.IF, 0);
  }
  public ELSE(): antlr.TerminalNode | null {
    return this.getToken(PythonParser.ELSE, 0);
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
  public override get ruleIndex(): number {
    return PythonParser.RULE_expression;
  }
  public override enterRule(listener: PythonListener): void {
    if (listener.enterExpression) {
      listener.enterExpression(this);
    }
  }
  public override exitRule(listener: PythonListener): void {
    if (listener.exitExpression) {
      listener.exitExpression(this);
    }
  }
  public override accept<Result>(visitor: PythonVisitor<Result>): Result | null {
    if (visitor.visitExpression) {
      return visitor.visitExpression(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class TermContext extends antlr.ParserRuleContext {
  public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
    super(parent, invokingState);
  }
  public thisInstance(): ThisInstanceContext | null {
    return this.getRuleContext(0, ThisInstanceContext);
  }
  public bracketedExpression(): BracketedExpressionContext | null {
    return this.getRuleContext(0, BracketedExpressionContext);
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
  public tuple(): TupleContext | null {
    return this.getRuleContext(0, TupleContext);
  }
  public identifierUse(): IdentifierUseContext | null {
    return this.getRuleContext(0, IdentifierUseContext);
  }
  public methodCall(): MethodCallContext | null {
    return this.getRuleContext(0, MethodCallContext);
  }
  public term(): TermContext | null {
    return this.getRuleContext(0, TermContext);
  }
  public index(): IndexContext | null {
    return this.getRuleContext(0, IndexContext);
  }
  public DOT(): antlr.TerminalNode | null {
    return this.getToken(PythonParser.DOT, 0);
  }
  public chainable(): ChainableContext | null {
    return this.getRuleContext(0, ChainableContext);
  }
  public override get ruleIndex(): number {
    return PythonParser.RULE_term;
  }
  public override enterRule(listener: PythonListener): void {
    if (listener.enterTerm) {
      listener.enterTerm(this);
    }
  }
  public override exitRule(listener: PythonListener): void {
    if (listener.exitTerm) {
      listener.exitTerm(this);
    }
  }
  public override accept<Result>(visitor: PythonVisitor<Result>): Result | null {
    if (visitor.visitTerm) {
      return visitor.visitTerm(this);
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
  public index(): IndexContext[];
  public index(i: number): IndexContext | null;
  public index(i?: number): IndexContext[] | IndexContext | null {
    if (i === undefined) {
      return this.getRuleContexts(IndexContext);
    }

    return this.getRuleContext(i, IndexContext);
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
  public COLON(): antlr.TerminalNode {
    return this.getToken(PythonParser.COLON, 0)!;
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
