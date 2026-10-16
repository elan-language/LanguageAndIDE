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
  public static readonly LET_ANNOTATION = 119;
  public static readonly ELSE_IF_ANNOTATION = 120;
  public static readonly PROPERTY_ANNOTATION = 121;
  public static readonly FUNCTION_METHOD_ANNOTATION = 122;
  public static readonly PROCEDURE_METHOD_ANNOTATION = 123;
  public static readonly COMMENT = 124;
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
  public static readonly RULE_inputStatement = 16;
  public static readonly RULE_ifStatement = 17;
  public static readonly RULE_whileLoop = 18;
  public static readonly RULE_forLoop = 19;
  public static readonly RULE_procedureCall = 20;
  public static readonly RULE_procRef = 21;
  public static readonly RULE_thisProcRef = 22;
  public static readonly RULE_instanceProcRef = 23;
  public static readonly RULE_identifierWithOptIndexes = 24;
  public static readonly RULE_tryStatement = 25;
  public static readonly RULE_throwStatement = 26;
  public static readonly RULE_errorMessage = 27;
  public static readonly RULE_assert = 28;
  public static readonly RULE_returnStatement = 29;
  public static readonly RULE_elseIfClause = 30;
  public static readonly RULE_elseClause = 31;
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
  public static readonly RULE_litRegExp = 60;
  public static readonly RULE_index = 61;
  public static readonly RULE_expression = 62;
  public static readonly RULE_term = 63;
  public static readonly RULE_chainable = 64;
  public static readonly RULE_thisInstance = 65;
  public static readonly RULE_bracketedExpression = 66;
  public static readonly RULE_unaryExpression = 67;
  public static readonly RULE_negateNumeric = 68;
  public static readonly RULE_negateLogical = 69;
  public static readonly RULE_binaryExpression = 70;
  public static readonly RULE_list = 71;
  public static readonly RULE_tuple = 72;
  public static readonly RULE_dictionary = 73;
  public static readonly RULE_kvpList = 74;
  public static readonly RULE_kvp = 75;
  public static readonly RULE_methodCall = 76;
  public static readonly RULE_binaryOperator = 77;
  public static readonly RULE_newInstance = 78;
  public static readonly RULE_paramDef = 79;
  public static readonly RULE_typeGeneric = 80;
  public static readonly RULE_typeFunc = 81;
  public static readonly RULE_typeTuple = 82;
  public static readonly RULE_lambda = 83;
  public static readonly RULE_interpolatedString = 84;

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
    "'# let'",
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
    "LET_ANNOTATION",
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
    "inputStatement",
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
        this.state = 171;
        this.errorHandler.sync(this);
        switch (this.interpreter.adaptivePredict(this.tokenStream, 0, this.context)) {
          case 1:
            {
              this.state = 170;
              this.comment();
            }
            break;
        }
        this.state = 176;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (
          _la === 1 ||
          _la === 47 ||
          (((_la - 97) & ~0x1f) === 0 && ((1 << (_la - 97)) & 134219777) !== 0)
        ) {
          {
            {
              this.state = 173;
              this.global();
            }
          }
          this.state = 178;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 182;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (_la === 95) {
          {
            {
              this.state = 179;
              this.match(PythonParser.NL);
            }
          }
          this.state = 184;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 185;
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
      this.state = 196;
      this.errorHandler.sync(this);
      switch (this.interpreter.adaptivePredict(this.tokenStream, 3, this.context)) {
        case 1:
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 187;
            this.main();
          }
          break;
        case 2:
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 188;
            this.function_();
          }
          break;
        case 3:
          this.enterOuterAlt(localContext, 3);
          {
            this.state = 189;
            this.test();
          }
          break;
        case 4:
          this.enterOuterAlt(localContext, 4);
          {
            this.state = 190;
            this.procedure();
          }
          break;
        case 5:
          this.enterOuterAlt(localContext, 5);
          {
            this.state = 191;
            this.constant();
          }
          break;
        case 6:
          this.enterOuterAlt(localContext, 6);
          {
            this.state = 192;
            this.enum_();
          }
          break;
        case 7:
          this.enterOuterAlt(localContext, 7);
          {
            this.state = 193;
            this.concreteClass();
          }
          break;
        case 8:
          this.enterOuterAlt(localContext, 8);
          {
            this.state = 194;
            this.abstractClass();
          }
          break;
        case 9:
          this.enterOuterAlt(localContext, 9);
          {
            this.state = 195;
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
        this.state = 199;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 108) {
          {
            this.state = 198;
            this.match(PythonParser.GHOSTED);
          }
        }

        this.state = 201;
        this.match(PythonParser.DEF);
        this.state = 202;
        this.match(PythonParser.MAIN);
        this.state = 203;
        this.match(PythonParser.OPEN_BRACKET);
        this.state = 204;
        this.match(PythonParser.CLOSE_BRACKET);
        this.state = 205;
        this.match(PythonParser.CLOSE_BRACKET);
        this.state = 206;
        this.match(PythonParser.ARROW);
        this.state = 207;
        this.match(PythonParser.NONE);
        this.state = 208;
        this.match(PythonParser.COLON);
        this.state = 209;
        this.match(PythonParser.NL);
        this.state = 213;
        this.errorHandler.sync(this);
        alternative = this.interpreter.adaptivePredict(this.tokenStream, 5, this.context);
        while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
          if (alternative === 1) {
            {
              {
                this.state = 210;
                this.ordinaryStatement();
              }
            }
          }
          this.state = 215;
          this.errorHandler.sync(this);
          alternative = this.interpreter.adaptivePredict(this.tokenStream, 5, this.context);
        }
        this.state = 216;
        this.match(PythonParser.COMMENT);
        this.state = 217;
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
        this.state = 220;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 108) {
          {
            this.state = 219;
            this.match(PythonParser.GHOSTED);
          }
        }

        this.state = 222;
        this.match(PythonParser.DEF);
        this.state = 223;
        this.methodName();
        this.state = 224;
        this.match(PythonParser.OPEN_BRACKET);
        this.state = 226;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 97) {
          {
            this.state = 225;
            this.paramList();
          }
        }

        this.state = 228;
        this.match(PythonParser.CLOSE_BRACKET);
        this.state = 229;
        this.match(PythonParser.ARROW);
        this.state = 230;
        this.type_();
        this.state = 231;
        this.match(PythonParser.COLON);
        this.state = 232;
        this.match(PythonParser.FUNCTION_ANNOTATION);
        this.state = 233;
        this.match(PythonParser.NL);
        this.state = 237;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (
          ((_la & ~0x1f) === 0 && ((1 << _la) & 26720) !== 0) ||
          _la === 52 ||
          _la === 74 ||
          (((_la - 97) & ~0x1f) === 0 && ((1 << (_la - 97)) & 134219777) !== 0)
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
        this.match(PythonParser.COMMENT);
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
      let alternative: number;
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 245;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 108) {
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
        this.state = 259;
        this.errorHandler.sync(this);
        alternative = this.interpreter.adaptivePredict(this.tokenStream, 11, this.context);
        while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
          if (alternative === 1) {
            {
              this.state = 257;
              this.errorHandler.sync(this);
              switch (this.interpreter.adaptivePredict(this.tokenStream, 10, this.context)) {
                case 1:
                  {
                    this.state = 254;
                    this.assert();
                  }
                  break;
                case 2:
                  {
                    this.state = 255;
                    this.variableDefinition();
                  }
                  break;
                case 3:
                  {
                    this.state = 256;
                    this.comment();
                  }
                  break;
              }
            }
          }
          this.state = 261;
          this.errorHandler.sync(this);
          alternative = this.interpreter.adaptivePredict(this.tokenStream, 11, this.context);
        }
        this.state = 262;
        this.match(PythonParser.COMMENT);
        this.state = 263;
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
        this.state = 266;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 108) {
          {
            this.state = 265;
            this.match(PythonParser.GHOSTED);
          }
        }

        this.state = 268;
        this.match(PythonParser.DEF);
        this.state = 269;
        this.methodName();
        this.state = 270;
        this.match(PythonParser.OPEN_BRACKET);
        this.state = 272;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 97) {
          {
            this.state = 271;
            this.paramList();
          }
        }

        this.state = 274;
        this.match(PythonParser.CLOSE_BRACKET);
        this.state = 275;
        this.match(PythonParser.ARROW);
        this.state = 276;
        this.match(PythonParser.NONE);
        this.state = 277;
        this.match(PythonParser.COLON);
        this.state = 278;
        this.match(PythonParser.PROCECDURE_ANNOTATION);
        this.state = 279;
        this.match(PythonParser.NL);
        this.state = 283;
        this.errorHandler.sync(this);
        alternative = this.interpreter.adaptivePredict(this.tokenStream, 14, this.context);
        while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
          if (alternative === 1) {
            {
              {
                this.state = 280;
                this.ordinaryStatement();
              }
            }
          }
          this.state = 285;
          this.errorHandler.sync(this);
          alternative = this.interpreter.adaptivePredict(this.tokenStream, 14, this.context);
        }
        this.state = 286;
        this.match(PythonParser.COMMENT);
        this.state = 287;
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
        this.state = 290;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 108) {
          {
            this.state = 289;
            this.match(PythonParser.GHOSTED);
          }
        }

        this.state = 292;
        this.identifierDef();
        this.state = 293;
        this.match(PythonParser.EQUAL);
        this.state = 294;
        this.constantValue();
        this.state = 295;
        this.match(PythonParser.CONSTANT_ANNOTATION);
        this.state = 296;
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
        this.state = 299;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 108) {
          {
            this.state = 298;
            this.match(PythonParser.GHOSTED);
          }
        }

        this.state = 301;
        this.match(PythonParser.CLASS);
        this.state = 302;
        this.typeName();
        this.state = 303;
        this.match(PythonParser.OPEN_BRACKET);
        this.state = 304;
        this.match(PythonParser.ENUM);
        this.state = 305;
        this.match(PythonParser.CLOSE_BRACKET);
        this.state = 306;
        this.match(PythonParser.COLON);
        this.state = 307;
        this.match(PythonParser.ENUM_ANNOTATION);
        this.state = 308;
        this.match(PythonParser.NL);
        this.state = 309;
        this.identifierList();
        this.state = 310;
        this.match(PythonParser.NL);
        this.state = 311;
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
        this.state = 314;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 108) {
          {
            this.state = 313;
            this.match(PythonParser.GHOSTED);
          }
        }

        this.state = 316;
        this.match(PythonParser.CLASS);
        this.state = 317;
        this.typeName();
        this.state = 322;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 80) {
          {
            this.state = 318;
            this.match(PythonParser.OPEN_BRACKET);
            this.state = 319;
            this.typeName();
            this.state = 320;
            this.match(PythonParser.CLOSE_BRACKET);
          }
        }

        this.state = 324;
        this.match(PythonParser.COLON);
        this.state = 325;
        this.match(PythonParser.CONCRETE_CLASS_ANNOTATION);
        this.state = 326;
        this.match(PythonParser.NL);
        this.state = 334;
        this.errorHandler.sync(this);
        alternative = this.interpreter.adaptivePredict(this.tokenStream, 20, this.context);
        while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
          if (alternative === 1) {
            {
              this.state = 332;
              this.errorHandler.sync(this);
              switch (this.interpreter.adaptivePredict(this.tokenStream, 19, this.context)) {
                case 1:
                  {
                    this.state = 327;
                    this.constructorMember();
                  }
                  break;
                case 2:
                  {
                    this.state = 328;
                    this.property();
                  }
                  break;
                case 3:
                  {
                    this.state = 329;
                    this.functionMethod();
                  }
                  break;
                case 4:
                  {
                    this.state = 330;
                    this.procedureMethod();
                  }
                  break;
                case 5:
                  {
                    this.state = 331;
                    this.comment();
                  }
                  break;
              }
            }
          }
          this.state = 336;
          this.errorHandler.sync(this);
          alternative = this.interpreter.adaptivePredict(this.tokenStream, 20, this.context);
        }
        this.state = 337;
        this.match(PythonParser.COMMENT);
        this.state = 338;
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
        this.state = 341;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 108) {
          {
            this.state = 340;
            this.match(PythonParser.GHOSTED);
          }
        }

        this.state = 343;
        this.match(PythonParser.CLASS);
        this.state = 344;
        this.typeName();
        this.state = 349;
        this.errorHandler.sync(this);
        switch (this.tokenStream.LA(1)) {
          case PythonParser.OPEN_BRACKET:
            {
              this.state = 345;
              this.match(PythonParser.OPEN_BRACKET);
              this.state = 346;
              this.typeName();
            }
            break;
          case PythonParser.ABC:
            {
              this.state = 347;
              this.match(PythonParser.ABC);
              this.state = 348;
              this.match(PythonParser.CLOSE_BRACKET);
            }
            break;
          default:
            throw new antlr.NoViableAltException(this);
        }
        this.state = 351;
        this.match(PythonParser.ABSTRACT_CLASS_ANNOTATION);
        this.state = 352;
        this.match(PythonParser.NL);
        this.state = 361;
        this.errorHandler.sync(this);
        alternative = this.interpreter.adaptivePredict(this.tokenStream, 24, this.context);
        while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
          if (alternative === 1) {
            {
              this.state = 359;
              this.errorHandler.sync(this);
              switch (this.interpreter.adaptivePredict(this.tokenStream, 23, this.context)) {
                case 1:
                  {
                    this.state = 353;
                    this.property();
                  }
                  break;
                case 2:
                  {
                    this.state = 354;
                    this.functionMethod();
                  }
                  break;
                case 3:
                  {
                    this.state = 355;
                    this.procedureMethod();
                  }
                  break;
                case 4:
                  {
                    this.state = 356;
                    this.abstractFunction();
                  }
                  break;
                case 5:
                  {
                    this.state = 357;
                    this.abstractProcedure();
                  }
                  break;
                case 6:
                  {
                    this.state = 358;
                    this.comment();
                  }
                  break;
              }
            }
          }
          this.state = 363;
          this.errorHandler.sync(this);
          alternative = this.interpreter.adaptivePredict(this.tokenStream, 24, this.context);
        }
        this.state = 364;
        this.match(PythonParser.COMMENT);
        this.state = 365;
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
        this.state = 367;
        this.commentText();
        this.state = 368;
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
        this.state = 370;
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
      this.state = 383;
      this.errorHandler.sync(this);
      switch (this.interpreter.adaptivePredict(this.tokenStream, 25, this.context)) {
        case 1:
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 372;
            this.print();
          }
          break;
        case 2:
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 373;
            this.variableDefinition();
          }
          break;
        case 3:
          this.enterOuterAlt(localContext, 3);
          {
            this.state = 374;
            this.assignment();
          }
          break;
        case 4:
          this.enterOuterAlt(localContext, 4);
          {
            this.state = 375;
            this.inputStatement();
          }
          break;
        case 5:
          this.enterOuterAlt(localContext, 5);
          {
            this.state = 376;
            this.ifStatement();
          }
          break;
        case 6:
          this.enterOuterAlt(localContext, 6);
          {
            this.state = 377;
            this.whileLoop();
          }
          break;
        case 7:
          this.enterOuterAlt(localContext, 7);
          {
            this.state = 378;
            this.forLoop();
          }
          break;
        case 8:
          this.enterOuterAlt(localContext, 8);
          {
            this.state = 379;
            this.procedureCall();
          }
          break;
        case 9:
          this.enterOuterAlt(localContext, 9);
          {
            this.state = 380;
            this.tryStatement();
          }
          break;
        case 10:
          this.enterOuterAlt(localContext, 10);
          {
            this.state = 381;
            this.throwStatement();
          }
          break;
        case 11:
          this.enterOuterAlt(localContext, 11);
          {
            this.state = 382;
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
        this.state = 386;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 108) {
          {
            this.state = 385;
            this.match(PythonParser.GHOSTED);
          }
        }

        this.state = 388;
        this.match(PythonParser.PRINT);
        this.state = 389;
        this.match(PythonParser.OPEN_BRACKET);
        this.state = 391;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (
          (((_la - 55) & ~0x1f) === 0 && ((1 << (_la - 55)) & 2192050687) !== 0) ||
          (((_la - 97) & ~0x1f) === 0 && ((1 << (_la - 97)) & 255) !== 0)
        ) {
          {
            this.state = 390;
            this.expression(0);
          }
        }

        this.state = 393;
        this.match(PythonParser.CLOSE_BRACKET);
        this.state = 394;
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
        this.state = 397;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 108) {
          {
            this.state = 396;
            this.match(PythonParser.GHOSTED);
          }
        }

        this.state = 399;
        this.identifierDef();
        this.state = 400;
        this.match(PythonParser.EQUAL);
        this.state = 401;
        this.expression(0);
        this.state = 402;
        this.match(PythonParser.VARIABLE_ANNOTATION);
        this.state = 403;
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
        this.state = 406;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 108) {
          {
            this.state = 405;
            this.match(PythonParser.GHOSTED);
          }
        }

        this.state = 408;
        this.assignable(0);
        this.state = 409;
        this.match(PythonParser.EQUAL);
        this.state = 410;
        this.expression(0);
        this.state = 411;
        this.match(PythonParser.ASSIGNMENT_ANNOTATION);
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
  public inputStatement(): InputStatementContext {
    let localContext = new InputStatementContext(this.context, this.state);
    this.enterRule(localContext, 32, PythonParser.RULE_inputStatement);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 415;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 108) {
          {
            this.state = 414;
            this.match(PythonParser.GHOSTED);
          }
        }

        this.state = 417;
        this.identifierDef();
        this.state = 418;
        this.match(PythonParser.EQUAL);
        this.state = 419;
        this.match(PythonParser.INPUT);
        this.state = 420;
        this.match(PythonParser.OPEN_BRACKET);
        this.state = 421;
        this.expression(0);
        this.state = 422;
        this.match(PythonParser.CLOSE_BRACKET);
        this.state = 423;
        this.match(PythonParser.INPUT_ANNOTATION);
        this.state = 424;
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
    this.enterRule(localContext, 34, PythonParser.RULE_ifStatement);
    let _la: number;
    try {
      let alternative: number;
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 427;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 108) {
          {
            this.state = 426;
            this.match(PythonParser.GHOSTED);
          }
        }

        this.state = 429;
        this.match(PythonParser.IF);
        this.state = 430;
        this.expression(0);
        this.state = 431;
        this.match(PythonParser.COLON);
        this.state = 432;
        this.match(PythonParser.NL);
        this.state = 438;
        this.errorHandler.sync(this);
        alternative = this.interpreter.adaptivePredict(this.tokenStream, 33, this.context);
        while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
          if (alternative === 1) {
            {
              this.state = 436;
              this.errorHandler.sync(this);
              switch (this.interpreter.adaptivePredict(this.tokenStream, 32, this.context)) {
                case 1:
                  {
                    this.state = 433;
                    this.elseIfClause();
                  }
                  break;
                case 2:
                  {
                    this.state = 434;
                    this.elseClause();
                  }
                  break;
                case 3:
                  {
                    this.state = 435;
                    this.ordinaryStatement();
                  }
                  break;
              }
            }
          }
          this.state = 440;
          this.errorHandler.sync(this);
          alternative = this.interpreter.adaptivePredict(this.tokenStream, 33, this.context);
        }
        this.state = 441;
        this.match(PythonParser.COMMENT);
        this.state = 442;
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
    this.enterRule(localContext, 36, PythonParser.RULE_whileLoop);
    let _la: number;
    try {
      let alternative: number;
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 445;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 108) {
          {
            this.state = 444;
            this.match(PythonParser.GHOSTED);
          }
        }

        this.state = 447;
        this.match(PythonParser.WHILE);
        this.state = 448;
        this.expression(0);
        this.state = 449;
        this.match(PythonParser.COLON);
        this.state = 450;
        this.match(PythonParser.NL);
        this.state = 454;
        this.errorHandler.sync(this);
        alternative = this.interpreter.adaptivePredict(this.tokenStream, 35, this.context);
        while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
          if (alternative === 1) {
            {
              {
                this.state = 451;
                this.ordinaryStatement();
              }
            }
          }
          this.state = 456;
          this.errorHandler.sync(this);
          alternative = this.interpreter.adaptivePredict(this.tokenStream, 35, this.context);
        }
        this.state = 457;
        this.match(PythonParser.COMMENT);
        this.state = 458;
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
    this.enterRule(localContext, 38, PythonParser.RULE_forLoop);
    let _la: number;
    try {
      let alternative: number;
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 461;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 108) {
          {
            this.state = 460;
            this.match(PythonParser.GHOSTED);
          }
        }

        this.state = 463;
        this.match(PythonParser.FOR);
        this.state = 464;
        this.identifierDef();
        this.state = 465;
        this.match(PythonParser.IN);
        this.state = 466;
        this.expression(0);
        this.state = 467;
        this.match(PythonParser.COLON);
        this.state = 468;
        this.match(PythonParser.NL);
        this.state = 472;
        this.errorHandler.sync(this);
        alternative = this.interpreter.adaptivePredict(this.tokenStream, 37, this.context);
        while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
          if (alternative === 1) {
            {
              {
                this.state = 469;
                this.ordinaryStatement();
              }
            }
          }
          this.state = 474;
          this.errorHandler.sync(this);
          alternative = this.interpreter.adaptivePredict(this.tokenStream, 37, this.context);
        }
        this.state = 475;
        this.match(PythonParser.COMMENT);
        this.state = 476;
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
    this.enterRule(localContext, 40, PythonParser.RULE_procedureCall);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 479;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 108) {
          {
            this.state = 478;
            this.match(PythonParser.GHOSTED);
          }
        }

        this.state = 481;
        this.procRef();
        this.state = 482;
        this.match(PythonParser.OPEN_BRACKET);
        this.state = 483;
        this.argList();
        this.state = 484;
        this.match(PythonParser.CLOSE_BRACKET);
        this.state = 485;
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
    this.enterRule(localContext, 42, PythonParser.RULE_procRef);
    try {
      this.state = 490;
      this.errorHandler.sync(this);
      switch (this.interpreter.adaptivePredict(this.tokenStream, 39, this.context)) {
        case 1:
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 487;
            this.methodName();
          }
          break;
        case 2:
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 488;
            this.thisProcRef();
          }
          break;
        case 3:
          this.enterOuterAlt(localContext, 3);
          {
            this.state = 489;
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
    this.enterRule(localContext, 44, PythonParser.RULE_thisProcRef);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 492;
        this.match(PythonParser.THIS_INSTANCE);
        this.state = 493;
        this.match(PythonParser.DOT);
        this.state = 494;
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
    this.enterRule(localContext, 46, PythonParser.RULE_instanceProcRef);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 496;
        this.identifierWithOptIndexes();
        this.state = 497;
        this.match(PythonParser.DOT);
        this.state = 498;
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
    this.enterRule(localContext, 48, PythonParser.RULE_identifierWithOptIndexes);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 500;
        this.identifierUse();
        this.state = 504;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (_la === 78) {
          {
            {
              this.state = 501;
              this.index();
            }
          }
          this.state = 506;
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
    this.enterRule(localContext, 50, PythonParser.RULE_tryStatement);
    let _la: number;
    try {
      let alternative: number;
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 508;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 108) {
          {
            this.state = 507;
            this.match(PythonParser.GHOSTED);
          }
        }

        this.state = 510;
        this.match(PythonParser.TRY);
        this.state = 511;
        this.match(PythonParser.NL);
        this.state = 515;
        this.errorHandler.sync(this);
        alternative = this.interpreter.adaptivePredict(this.tokenStream, 42, this.context);
        while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
          if (alternative === 1) {
            {
              {
                this.state = 512;
                this.ordinaryStatement();
              }
            }
          }
          this.state = 517;
          this.errorHandler.sync(this);
          alternative = this.interpreter.adaptivePredict(this.tokenStream, 42, this.context);
        }
        this.state = 518;
        this.catchStatement();
        this.state = 522;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (
          ((_la & ~0x1f) === 0 && ((1 << _la) & 26720) !== 0) ||
          _la === 52 ||
          _la === 74 ||
          (((_la - 97) & ~0x1f) === 0 && ((1 << (_la - 97)) & 134219777) !== 0)
        ) {
          {
            {
              this.state = 519;
              this.ordinaryStatement();
            }
          }
          this.state = 524;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 525;
        this.match(PythonParser.END);
        this.state = 526;
        this.match(PythonParser.TRY);
        this.state = 527;
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
    this.enterRule(localContext, 52, PythonParser.RULE_throwStatement);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 530;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 108) {
          {
            this.state = 529;
            this.match(PythonParser.GHOSTED);
          }
        }

        this.state = 532;
        this.match(PythonParser.RAISE);
        this.state = 533;
        this.typeName();
        this.state = 534;
        this.match(PythonParser.OPEN_BRACKET);
        this.state = 535;
        this.errorMessage();
        this.state = 536;
        this.match(PythonParser.CLOSE_BRACKET);
        this.state = 537;
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
    this.enterRule(localContext, 54, PythonParser.RULE_errorMessage);
    try {
      this.state = 541;
      this.errorHandler.sync(this);
      switch (this.tokenStream.LA(1)) {
        case PythonParser.LITERAL_STRING:
        case PythonParser.INTERPOLATED_STRING:
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 539;
            this.litString();
          }
          break;
        case PythonParser.NAME_STARTING_LC:
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 540;
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
    this.enterRule(localContext, 56, PythonParser.RULE_assert);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 544;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 108) {
          {
            this.state = 543;
            this.match(PythonParser.GHOSTED);
          }
        }

        this.state = 546;
        this.match(PythonParser.THIS_INSTANCE);
        this.state = 547;
        this.match(PythonParser.DOT);
        this.state = 548;
        this.match(PythonParser.ASSERT_EQUAL);
        this.state = 549;
        this.match(PythonParser.OPEN_BRACKET);
        this.state = 550;
        this.assertActual();
        this.state = 551;
        this.match(PythonParser.COMMA);
        this.state = 552;
        this.assertExpected();
        this.state = 553;
        this.match(PythonParser.CLOSE_BRACKET);
        this.state = 554;
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
    this.enterRule(localContext, 58, PythonParser.RULE_returnStatement);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 556;
        this.match(PythonParser.RETURN);
        this.state = 557;
        this.expression(0);
        this.state = 558;
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
    this.enterRule(localContext, 60, PythonParser.RULE_elseIfClause);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 561;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 108) {
          {
            this.state = 560;
            this.match(PythonParser.GHOSTED);
          }
        }

        this.state = 563;
        this.match(PythonParser.ELIF);
        this.state = 564;
        this.expression(0);
        this.state = 565;
        this.match(PythonParser.COLON);
        this.state = 566;
        this.match(PythonParser.ELSE_IF_ANNOTATION);
        this.state = 567;
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
    this.enterRule(localContext, 62, PythonParser.RULE_elseClause);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 570;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 108) {
          {
            this.state = 569;
            this.match(PythonParser.GHOSTED);
          }
        }

        this.state = 572;
        this.match(PythonParser.ELSE);
        this.state = 573;
        this.match(PythonParser.COLON);
        this.state = 574;
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
        this.state = 577;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 108) {
          {
            this.state = 576;
            this.match(PythonParser.GHOSTED);
          }
        }

        this.state = 579;
        this.match(PythonParser.EXCEPT);
        this.state = 580;
        this.typeName();
        this.state = 581;
        this.match(PythonParser.AS);
        this.state = 582;
        this.identifierDef();
        this.state = 583;
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
      let alternative: number;
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 586;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 108) {
          {
            this.state = 585;
            this.match(PythonParser.GHOSTED);
          }
        }

        this.state = 588;
        this.match(PythonParser.DEF);
        this.state = 589;
        this.match(PythonParser.INIT);
        this.state = 590;
        this.match(PythonParser.OPEN_BRACKET);
        this.state = 592;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 97) {
          {
            this.state = 591;
            this.paramList();
          }
        }

        this.state = 594;
        this.match(PythonParser.CLOSE_BRACKET);
        this.state = 595;
        this.match(PythonParser.ARROW);
        this.state = 596;
        this.match(PythonParser.NONE);
        this.state = 597;
        this.match(PythonParser.COLON);
        this.state = 598;
        this.match(PythonParser.NL);
        this.state = 602;
        this.errorHandler.sync(this);
        alternative = this.interpreter.adaptivePredict(this.tokenStream, 52, this.context);
        while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
          if (alternative === 1) {
            {
              {
                this.state = 599;
                this.ordinaryStatement();
              }
            }
          }
          this.state = 604;
          this.errorHandler.sync(this);
          alternative = this.interpreter.adaptivePredict(this.tokenStream, 52, this.context);
        }
        this.state = 605;
        this.match(PythonParser.COMMENT);
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
  public property(): PropertyContext {
    let localContext = new PropertyContext(this.context, this.state);
    this.enterRule(localContext, 68, PythonParser.RULE_property);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 609;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 108) {
          {
            this.state = 608;
            this.match(PythonParser.GHOSTED);
          }
        }

        this.state = 611;
        this.identifierDef();
        this.state = 612;
        this.match(PythonParser.COLON);
        this.state = 613;
        this.type_();
        this.state = 614;
        this.match(PythonParser.PROPERTY_ANNOTATION);
        this.state = 615;
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
        this.state = 618;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 108) {
          {
            this.state = 617;
            this.match(PythonParser.GHOSTED);
          }
        }

        this.state = 620;
        this.match(PythonParser.DEF);
        this.state = 621;
        this.methodName();
        this.state = 622;
        this.match(PythonParser.OPEN_BRACKET);
        this.state = 624;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 97) {
          {
            this.state = 623;
            this.paramList();
          }
        }

        this.state = 626;
        this.match(PythonParser.CLOSE_BRACKET);
        this.state = 627;
        this.match(PythonParser.ARROW);
        this.state = 628;
        this.type_();
        this.state = 629;
        this.match(PythonParser.COLON);
        this.state = 630;
        this.match(PythonParser.FUNCTION_METHOD_ANNOTATION);
        this.state = 631;
        this.match(PythonParser.NL);
        this.state = 635;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (
          ((_la & ~0x1f) === 0 && ((1 << _la) & 26720) !== 0) ||
          _la === 52 ||
          _la === 74 ||
          (((_la - 97) & ~0x1f) === 0 && ((1 << (_la - 97)) & 134219777) !== 0)
        ) {
          {
            {
              this.state = 632;
              this.ordinaryStatement();
            }
          }
          this.state = 637;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 638;
        this.returnStatement();
        this.state = 639;
        this.match(PythonParser.COMMENT);
        this.state = 640;
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
      let alternative: number;
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 643;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 108) {
          {
            this.state = 642;
            this.match(PythonParser.GHOSTED);
          }
        }

        this.state = 645;
        this.match(PythonParser.DEF);
        this.state = 646;
        this.methodName();
        this.state = 647;
        this.match(PythonParser.OPEN_BRACKET);
        this.state = 649;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 97) {
          {
            this.state = 648;
            this.paramList();
          }
        }

        this.state = 651;
        this.match(PythonParser.CLOSE_BRACKET);
        this.state = 652;
        this.match(PythonParser.ARROW);
        this.state = 653;
        this.match(PythonParser.NONE);
        this.state = 654;
        this.match(PythonParser.COLON);
        this.state = 655;
        this.match(PythonParser.PROCEDURE_METHOD_ANNOTATION);
        this.state = 656;
        this.match(PythonParser.NL);
        this.state = 660;
        this.errorHandler.sync(this);
        alternative = this.interpreter.adaptivePredict(this.tokenStream, 59, this.context);
        while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
          if (alternative === 1) {
            {
              {
                this.state = 657;
                this.ordinaryStatement();
              }
            }
          }
          this.state = 662;
          this.errorHandler.sync(this);
          alternative = this.interpreter.adaptivePredict(this.tokenStream, 59, this.context);
        }
        this.state = 663;
        this.match(PythonParser.COMMENT);
        this.state = 664;
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
        this.state = 667;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 108) {
          {
            this.state = 666;
            this.match(PythonParser.GHOSTED);
          }
        }

        this.state = 669;
        this.match(PythonParser.ABSTRACT_METHOD);
        this.state = 670;
        this.match(PythonParser.NL);
        this.state = 671;
        this.match(PythonParser.DEF);
        this.state = 672;
        this.methodName();
        this.state = 673;
        this.match(PythonParser.OPEN_BRACKET);
        this.state = 675;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 97) {
          {
            this.state = 674;
            this.paramList();
          }
        }

        this.state = 677;
        this.match(PythonParser.CLOSE_BRACKET);
        this.state = 678;
        this.match(PythonParser.ARROW);
        this.state = 679;
        this.type_();
        this.state = 680;
        this.match(PythonParser.COLON);
        this.state = 681;
        this.match(PythonParser.NL);
        this.state = 682;
        this.match(PythonParser.PASS);
        this.state = 683;
        this.match(PythonParser.COMMENT);
        this.state = 684;
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
        this.state = 687;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 108) {
          {
            this.state = 686;
            this.match(PythonParser.GHOSTED);
          }
        }

        this.state = 689;
        this.match(PythonParser.ABSTRACT_METHOD);
        this.state = 690;
        this.match(PythonParser.NL);
        this.state = 691;
        this.match(PythonParser.DEF);
        this.state = 692;
        this.methodName();
        this.state = 693;
        this.match(PythonParser.OPEN_BRACKET);
        this.state = 695;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 97) {
          {
            this.state = 694;
            this.paramList();
          }
        }

        this.state = 697;
        this.match(PythonParser.CLOSE_BRACKET);
        this.state = 698;
        this.match(PythonParser.ARROW);
        this.state = 699;
        this.match(PythonParser.NONE);
        this.state = 700;
        this.match(PythonParser.COLON);
        this.state = 701;
        this.match(PythonParser.NL);
        this.state = 702;
        this.match(PythonParser.PASS);
        this.state = 703;
        this.match(PythonParser.COMMENT);
        this.state = 704;
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
        this.state = 706;
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
        this.state = 708;
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
        this.state = 715;
        this.errorHandler.sync(this);
        switch (this.tokenStream.LA(1)) {
          case PythonParser.NAME_STARTING_LC:
            {
              this.state = 711;
              this.identifierUse();
            }
            break;
          case PythonParser.THIS_INSTANCE:
            {
              this.state = 712;
              this.match(PythonParser.THIS_INSTANCE);
              this.state = 713;
              this.match(PythonParser.DOT);
              this.state = 714;
              this.identifierUse();
            }
            break;
          default:
            throw new antlr.NoViableAltException(this);
        }
        this.context!.stop = this.tokenStream.LT(-1);
        this.state = 721;
        this.errorHandler.sync(this);
        alternative = this.interpreter.adaptivePredict(this.tokenStream, 65, this.context);
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
                this.state = 717;
                if (!this.precpred(this.context, 1)) {
                  throw this.createFailedPredicateException("this.precpred(this.context, 1)");
                }
                this.state = 718;
                this.index();
              }
            }
          }
          this.state = 723;
          this.errorHandler.sync(this);
          alternative = this.interpreter.adaptivePredict(this.tokenStream, 65, this.context);
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
        this.state = 724;
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
        this.state = 726;
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
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 728;
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
    this.enterRule(localContext, 90, PythonParser.RULE_constantValue);
    try {
      this.state = 735;
      this.errorHandler.sync(this);
      switch (this.interpreter.adaptivePredict(this.tokenStream, 66, this.context)) {
        case 1:
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 730;
            this.litBoolean();
          }
          break;
        case 2:
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 731;
            this.litInt();
          }
          break;
        case 3:
          this.enterOuterAlt(localContext, 3);
          {
            this.state = 732;
            this.litFloat();
          }
          break;
        case 4:
          this.enterOuterAlt(localContext, 4);
          {
            this.state = 733;
            this.litString();
          }
          break;
        case 5:
          this.enterOuterAlt(localContext, 5);
          {
            this.state = 734;
            this.interpolatedString();
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
  public argList(): ArgListContext {
    let localContext = new ArgListContext(this.context, this.state);
    this.enterRule(localContext, 92, PythonParser.RULE_argList);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 737;
        this.argument();
        this.state = 742;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (_la === 83) {
          {
            {
              this.state = 738;
              this.match(PythonParser.COMMA);
              this.state = 739;
              this.argument();
            }
          }
          this.state = 744;
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
      this.state = 747;
      this.errorHandler.sync(this);
      switch (this.tokenStream.LA(1)) {
        case PythonParser.LAMBDA:
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 745;
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
            this.state = 746;
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
        this.state = 749;
        this.paramDef();
        this.state = 754;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (_la === 83) {
          {
            {
              this.state = 750;
              this.match(PythonParser.COMMA);
              this.state = 751;
              this.paramDef();
            }
          }
          this.state = 756;
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
        this.state = 757;
        this.identifierDef();
        this.state = 760;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        do {
          {
            {
              this.state = 758;
              this.match(PythonParser.COMMA);
              this.state = 759;
              this.identifierDef();
            }
          }
          this.state = 762;
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
    this.enterRule(localContext, 100, PythonParser.RULE_expressionList);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 764;
        this.expression(0);
        this.state = 769;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (_la === 83) {
          {
            {
              this.state = 765;
              this.match(PythonParser.COMMA);
              this.state = 766;
              this.expression(0);
            }
          }
          this.state = 771;
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
      this.state = 776;
      this.errorHandler.sync(this);
      switch (this.interpreter.adaptivePredict(this.tokenStream, 72, this.context)) {
        case 1:
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 772;
            this.typeTuple();
          }
          break;
        case 2:
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 773;
            this.typeName();
          }
          break;
        case 3:
          this.enterOuterAlt(localContext, 3);
          {
            this.state = 774;
            this.typeGeneric();
          }
          break;
        case 4:
          this.enterOuterAlt(localContext, 4);
          {
            this.state = 775;
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
        this.state = 778;
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
      this.state = 785;
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
            this.state = 780;
            this.litValue();
          }
          break;
        case PythonParser.OPEN_SQ_BRACKET:
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 781;
            this.list();
          }
          break;
        case PythonParser.OPEN_BRACE:
          this.enterOuterAlt(localContext, 3);
          {
            this.state = 782;
            this.dictionary();
          }
          break;
        case PythonParser.NOT:
        case PythonParser.MINUS:
          this.enterOuterAlt(localContext, 4);
          {
            this.state = 783;
            this.unaryExpression();
          }
          break;
        case PythonParser.OPEN_BRACKET:
          this.enterOuterAlt(localContext, 5);
          {
            this.state = 784;
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
      this.state = 792;
      this.errorHandler.sync(this);
      switch (this.tokenStream.LA(1)) {
        case PythonParser.TRUE:
        case PythonParser.FALSE:
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 787;
            this.litBoolean();
          }
          break;
        case PythonParser.LITERAL_BINARY:
        case PythonParser.LITERAL_HEX:
        case PythonParser.LITERAL_INTEGER:
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 788;
            this.litInt();
          }
          break;
        case PythonParser.LITERAL_FLOAT:
          this.enterOuterAlt(localContext, 3);
          {
            this.state = 789;
            this.litFloat();
          }
          break;
        case PythonParser.LITERAL_STRING:
        case PythonParser.INTERPOLATED_STRING:
          this.enterOuterAlt(localContext, 4);
          {
            this.state = 790;
            this.litString();
          }
          break;
        case PythonParser.INT_NAME:
        case PythonParser.FLOAT_NAME:
        case PythonParser.BOOL_NAME:
        case PythonParser.STRING_NAME:
        case PythonParser.LIST_NAME:
        case PythonParser.NAME_STARTING_UC:
          this.enterOuterAlt(localContext, 5);
          {
            this.state = 791;
            this.enumValue();
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
  public litBoolean(): LitBooleanContext {
    let localContext = new LitBooleanContext(this.context, this.state);
    this.enterRule(localContext, 110, PythonParser.RULE_litBoolean);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 794;
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
    this.enterRule(localContext, 112, PythonParser.RULE_litInt);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 796;
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
    this.enterRule(localContext, 114, PythonParser.RULE_litFloat);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 798;
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
        this.state = 800;
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
    this.enterRule(localContext, 118, PythonParser.RULE_enumValue);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 802;
        this.typeName();
        this.state = 803;
        this.match(PythonParser.DOT);
        this.state = 804;
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
    this.enterRule(localContext, 120, PythonParser.RULE_litRegExp);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 806;
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
    this.enterRule(localContext, 122, PythonParser.RULE_index);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 808;
        this.match(PythonParser.OPEN_SQ_BRACKET);
        this.state = 809;
        this.expression(0);
        this.state = 810;
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
    let _startState = 124;
    this.enterRecursionRule(localContext, 124, PythonParser.RULE_expression, _p);
    let _la: number;
    try {
      let alternative: number;
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 817;
        this.errorHandler.sync(this);
        switch (this.interpreter.adaptivePredict(this.tokenStream, 75, this.context)) {
          case 1:
            {
              this.state = 813;
              this.newInstance();
            }
            break;
          case 2:
            {
              this.state = 814;
              this.unaryExpression();
            }
            break;
          case 3:
            {
              this.state = 815;
              this.term(0);
            }
            break;
          case 4:
            {
              this.state = 816;
              this.binaryExpression();
            }
            break;
        }
        this.context!.stop = this.tokenStream.LT(-1);
        this.state = 834;
        this.errorHandler.sync(this);
        alternative = this.interpreter.adaptivePredict(this.tokenStream, 77, this.context);
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
                this.state = 819;
                if (!this.precpred(this.context, 1)) {
                  throw this.createFailedPredicateException("this.precpred(this.context, 1)");
                }
                this.state = 820;
                this.match(PythonParser.IF);
                this.state = 821;
                this.expression(0);
                this.state = 826;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 2) {
                  {
                    {
                      this.state = 822;
                      this.match(PythonParser.ELIF);
                      this.state = 823;
                      this.expression(0);
                    }
                  }
                  this.state = 828;
                  this.errorHandler.sync(this);
                  _la = this.tokenStream.LA(1);
                }
                this.state = 829;
                this.match(PythonParser.ELSE);
                this.state = 830;
                this.expression(2);
              }
            }
          }
          this.state = 836;
          this.errorHandler.sync(this);
          alternative = this.interpreter.adaptivePredict(this.tokenStream, 77, this.context);
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
    let _startState = 126;
    this.enterRecursionRule(localContext, 126, PythonParser.RULE_term, _p);
    try {
      let alternative: number;
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 846;
        this.errorHandler.sync(this);
        switch (this.interpreter.adaptivePredict(this.tokenStream, 78, this.context)) {
          case 1:
            {
              this.state = 838;
              this.thisInstance();
            }
            break;
          case 2:
            {
              this.state = 839;
              this.bracketedExpression();
            }
            break;
          case 3:
            {
              this.state = 840;
              this.litValue();
            }
            break;
          case 4:
            {
              this.state = 841;
              this.list();
            }
            break;
          case 5:
            {
              this.state = 842;
              this.dictionary();
            }
            break;
          case 6:
            {
              this.state = 843;
              this.tuple();
            }
            break;
          case 7:
            {
              this.state = 844;
              this.identifierUse();
            }
            break;
          case 8:
            {
              this.state = 845;
              this.methodCall();
            }
            break;
        }
        this.context!.stop = this.tokenStream.LT(-1);
        this.state = 855;
        this.errorHandler.sync(this);
        alternative = this.interpreter.adaptivePredict(this.tokenStream, 80, this.context);
        while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
          if (alternative === 1) {
            if (this.parseListeners != null) {
              this.triggerExitRuleEvent();
            }
            previousContext = localContext;
            {
              this.state = 853;
              this.errorHandler.sync(this);
              switch (this.interpreter.adaptivePredict(this.tokenStream, 79, this.context)) {
                case 1:
                  {
                    localContext = new TermContext(parentContext, parentState);
                    this.pushNewRecursionContext(localContext, _startState, PythonParser.RULE_term);
                    this.state = 848;
                    if (!this.precpred(this.context, 2)) {
                      throw this.createFailedPredicateException("this.precpred(this.context, 2)");
                    }
                    this.state = 849;
                    this.index();
                  }
                  break;
                case 2:
                  {
                    localContext = new TermContext(parentContext, parentState);
                    this.pushNewRecursionContext(localContext, _startState, PythonParser.RULE_term);
                    this.state = 850;
                    if (!this.precpred(this.context, 1)) {
                      throw this.createFailedPredicateException("this.precpred(this.context, 1)");
                    }
                    this.state = 851;
                    this.match(PythonParser.DOT);
                    this.state = 852;
                    this.chainable();
                  }
                  break;
              }
            }
          }
          this.state = 857;
          this.errorHandler.sync(this);
          alternative = this.interpreter.adaptivePredict(this.tokenStream, 80, this.context);
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
    this.enterRule(localContext, 128, PythonParser.RULE_chainable);
    try {
      let alternative: number;
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 860;
        this.errorHandler.sync(this);
        switch (this.interpreter.adaptivePredict(this.tokenStream, 81, this.context)) {
          case 1:
            {
              this.state = 858;
              this.identifierUse();
            }
            break;
          case 2:
            {
              this.state = 859;
              this.methodCall();
            }
            break;
        }
        this.state = 865;
        this.errorHandler.sync(this);
        alternative = this.interpreter.adaptivePredict(this.tokenStream, 82, this.context);
        while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
          if (alternative === 1) {
            {
              {
                this.state = 862;
                this.index();
              }
            }
          }
          this.state = 867;
          this.errorHandler.sync(this);
          alternative = this.interpreter.adaptivePredict(this.tokenStream, 82, this.context);
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
    this.enterRule(localContext, 130, PythonParser.RULE_thisInstance);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 868;
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
    this.enterRule(localContext, 132, PythonParser.RULE_bracketedExpression);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 870;
        this.match(PythonParser.OPEN_BRACKET);
        this.state = 871;
        this.expression(0);
        this.state = 872;
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
    this.enterRule(localContext, 134, PythonParser.RULE_unaryExpression);
    try {
      this.state = 876;
      this.errorHandler.sync(this);
      switch (this.tokenStream.LA(1)) {
        case PythonParser.MINUS:
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 874;
            this.negateNumeric();
          }
          break;
        case PythonParser.NOT:
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 875;
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
    this.enterRule(localContext, 136, PythonParser.RULE_negateNumeric);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 878;
        this.match(PythonParser.MINUS);
        this.state = 879;
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
    this.enterRule(localContext, 138, PythonParser.RULE_negateLogical);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 881;
        this.match(PythonParser.NOT);
        this.state = 882;
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
    this.enterRule(localContext, 140, PythonParser.RULE_binaryExpression);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 884;
        localContext._left = this.term(0);
        this.state = 885;
        this.binaryOperator();
        this.state = 886;
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
    this.enterRule(localContext, 142, PythonParser.RULE_list);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 888;
        this.match(PythonParser.OPEN_SQ_BRACKET);
        this.state = 889;
        this.expressionList();
        this.state = 890;
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
    this.enterRule(localContext, 144, PythonParser.RULE_tuple);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 892;
        this.match(PythonParser.OPEN_BRACKET);
        this.state = 893;
        this.expressionList();
        this.state = 894;
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
    this.enterRule(localContext, 146, PythonParser.RULE_dictionary);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 896;
        this.match(PythonParser.OPEN_BRACE);
        this.state = 897;
        this.kvpList();
        this.state = 898;
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
    this.enterRule(localContext, 148, PythonParser.RULE_kvpList);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 900;
        this.kvp();
        this.state = 905;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (_la === 83) {
          {
            {
              this.state = 901;
              this.match(PythonParser.COMMA);
              this.state = 902;
              this.kvp();
            }
          }
          this.state = 907;
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
    this.enterRule(localContext, 150, PythonParser.RULE_kvp);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 908;
        this.expression(0);
        this.state = 909;
        this.match(PythonParser.COLON);
        this.state = 910;
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
    this.enterRule(localContext, 152, PythonParser.RULE_methodCall);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 912;
        this.methodName();
        this.state = 913;
        this.match(PythonParser.OPEN_BRACKET);
        this.state = 915;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (
          _la === 9 ||
          (((_la - 55) & ~0x1f) === 0 && ((1 << (_la - 55)) & 2192050687) !== 0) ||
          (((_la - 97) & ~0x1f) === 0 && ((1 << (_la - 97)) & 255) !== 0)
        ) {
          {
            this.state = 914;
            this.argList();
          }
        }

        this.state = 917;
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
    this.enterRule(localContext, 154, PythonParser.RULE_binaryOperator);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 919;
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
    this.enterRule(localContext, 156, PythonParser.RULE_newInstance);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 921;
        this.type_();
        this.state = 922;
        this.match(PythonParser.OPEN_BRACKET);
        this.state = 924;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (
          _la === 9 ||
          (((_la - 55) & ~0x1f) === 0 && ((1 << (_la - 55)) & 2192050687) !== 0) ||
          (((_la - 97) & ~0x1f) === 0 && ((1 << (_la - 97)) & 255) !== 0)
        ) {
          {
            this.state = 923;
            this.argList();
          }
        }

        this.state = 926;
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
    this.enterRule(localContext, 158, PythonParser.RULE_paramDef);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 928;
        this.identifierDef();
        this.state = 929;
        this.match(PythonParser.COLON);
        this.state = 930;
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
    this.enterRule(localContext, 160, PythonParser.RULE_typeGeneric);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 932;
        this.typeName();
        this.state = 933;
        this.match(PythonParser.OPEN_SQ_BRACKET);
        this.state = 934;
        this.type_();
        this.state = 939;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (_la === 83) {
          {
            {
              this.state = 935;
              this.match(PythonParser.COMMA);
              this.state = 936;
              this.type_();
            }
          }
          this.state = 941;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 942;
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
    this.enterRule(localContext, 162, PythonParser.RULE_typeFunc);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 944;
        this.match(PythonParser.FUNC_NAME);
        this.state = 945;
        this.match(PythonParser.OPEN_SQ_BRACKET);
        this.state = 946;
        this.match(PythonParser.OPEN_SQ_BRACKET);
        this.state = 947;
        this.type_();
        this.state = 952;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (_la === 83) {
          {
            {
              this.state = 948;
              this.match(PythonParser.COMMA);
              this.state = 949;
              this.type_();
            }
          }
          this.state = 954;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 955;
        this.match(PythonParser.CLOSE_SQ_BRACKET);
        this.state = 956;
        this.match(PythonParser.COMMA);
        this.state = 957;
        this.type_();
        this.state = 958;
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
    this.enterRule(localContext, 164, PythonParser.RULE_typeTuple);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 960;
        this.match(PythonParser.TUPLE);
        this.state = 961;
        this.match(PythonParser.OPEN_SQ_BRACKET);
        this.state = 962;
        this.type_();
        this.state = 965;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        do {
          {
            {
              this.state = 963;
              this.match(PythonParser.COMMA);
              this.state = 964;
              this.type_();
            }
          }
          this.state = 967;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        } while (_la === 83);
        this.state = 969;
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
    this.enterRule(localContext, 166, PythonParser.RULE_lambda);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 971;
        this.match(PythonParser.LAMBDA);
        this.state = 972;
        this.paramList();
        this.state = 973;
        this.match(PythonParser.COLON);
        this.state = 974;
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
    this.enterRule(localContext, 168, PythonParser.RULE_interpolatedString);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 976;
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
      case 62:
        return this.expression_sempred(localContext as ExpressionContext, predIndex);
      case 63:
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
    4, 1, 124, 979, 2, 0, 7, 0, 2, 1, 7, 1, 2, 2, 7, 2, 2, 3, 7, 3, 2, 4, 7, 4, 2, 5, 7, 5, 2, 6, 7,
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
    7, 81, 2, 82, 7, 82, 2, 83, 7, 83, 2, 84, 7, 84, 1, 0, 3, 0, 172, 8, 0, 1, 0, 5, 0, 175, 8, 0,
    10, 0, 12, 0, 178, 9, 0, 1, 0, 5, 0, 181, 8, 0, 10, 0, 12, 0, 184, 9, 0, 1, 0, 1, 0, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 1, 197, 8, 1, 1, 2, 3, 2, 200, 8, 2, 1, 2, 1, 2, 1,
    2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 5, 2, 212, 8, 2, 10, 2, 12, 2, 215, 9, 2, 1, 2, 1,
    2, 1, 2, 1, 3, 3, 3, 221, 8, 3, 1, 3, 1, 3, 1, 3, 1, 3, 3, 3, 227, 8, 3, 1, 3, 1, 3, 1, 3, 1, 3,
    1, 3, 1, 3, 1, 3, 5, 3, 236, 8, 3, 10, 3, 12, 3, 239, 9, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 4, 3, 4,
    246, 8, 4, 1, 4, 1, 4, 1, 4, 1, 4, 1, 4, 1, 4, 1, 4, 1, 4, 1, 4, 1, 4, 5, 4, 258, 8, 4, 10, 4,
    12, 4, 261, 9, 4, 1, 4, 1, 4, 1, 4, 1, 5, 3, 5, 267, 8, 5, 1, 5, 1, 5, 1, 5, 1, 5, 3, 5, 273, 8,
    5, 1, 5, 1, 5, 1, 5, 1, 5, 1, 5, 1, 5, 1, 5, 5, 5, 282, 8, 5, 10, 5, 12, 5, 285, 9, 5, 1, 5, 1,
    5, 1, 5, 1, 6, 3, 6, 291, 8, 6, 1, 6, 1, 6, 1, 6, 1, 6, 1, 6, 1, 6, 1, 7, 3, 7, 300, 8, 7, 1, 7,
    1, 7, 1, 7, 1, 7, 1, 7, 1, 7, 1, 7, 1, 7, 1, 7, 1, 7, 1, 7, 1, 7, 1, 8, 3, 8, 315, 8, 8, 1, 8,
    1, 8, 1, 8, 1, 8, 1, 8, 1, 8, 3, 8, 323, 8, 8, 1, 8, 1, 8, 1, 8, 1, 8, 1, 8, 1, 8, 1, 8, 1, 8,
    5, 8, 333, 8, 8, 10, 8, 12, 8, 336, 9, 8, 1, 8, 1, 8, 1, 8, 1, 9, 3, 9, 342, 8, 9, 1, 9, 1, 9,
    1, 9, 1, 9, 1, 9, 1, 9, 3, 9, 350, 8, 9, 1, 9, 1, 9, 1, 9, 1, 9, 1, 9, 1, 9, 1, 9, 1, 9, 5, 9,
    360, 8, 9, 10, 9, 12, 9, 363, 9, 9, 1, 9, 1, 9, 1, 9, 1, 10, 1, 10, 1, 10, 1, 11, 1, 11, 1, 12,
    1, 12, 1, 12, 1, 12, 1, 12, 1, 12, 1, 12, 1, 12, 1, 12, 1, 12, 1, 12, 3, 12, 384, 8, 12, 1, 13,
    3, 13, 387, 8, 13, 1, 13, 1, 13, 1, 13, 3, 13, 392, 8, 13, 1, 13, 1, 13, 1, 13, 1, 14, 3, 14,
    398, 8, 14, 1, 14, 1, 14, 1, 14, 1, 14, 1, 14, 1, 14, 1, 15, 3, 15, 407, 8, 15, 1, 15, 1, 15, 1,
    15, 1, 15, 1, 15, 1, 15, 1, 16, 3, 16, 416, 8, 16, 1, 16, 1, 16, 1, 16, 1, 16, 1, 16, 1, 16, 1,
    16, 1, 16, 1, 16, 1, 17, 3, 17, 428, 8, 17, 1, 17, 1, 17, 1, 17, 1, 17, 1, 17, 1, 17, 1, 17, 5,
    17, 437, 8, 17, 10, 17, 12, 17, 440, 9, 17, 1, 17, 1, 17, 1, 17, 1, 18, 3, 18, 446, 8, 18, 1,
    18, 1, 18, 1, 18, 1, 18, 1, 18, 5, 18, 453, 8, 18, 10, 18, 12, 18, 456, 9, 18, 1, 18, 1, 18, 1,
    18, 1, 19, 3, 19, 462, 8, 19, 1, 19, 1, 19, 1, 19, 1, 19, 1, 19, 1, 19, 1, 19, 5, 19, 471, 8,
    19, 10, 19, 12, 19, 474, 9, 19, 1, 19, 1, 19, 1, 19, 1, 20, 3, 20, 480, 8, 20, 1, 20, 1, 20, 1,
    20, 1, 20, 1, 20, 1, 20, 1, 21, 1, 21, 1, 21, 3, 21, 491, 8, 21, 1, 22, 1, 22, 1, 22, 1, 22, 1,
    23, 1, 23, 1, 23, 1, 23, 1, 24, 1, 24, 5, 24, 503, 8, 24, 10, 24, 12, 24, 506, 9, 24, 1, 25, 3,
    25, 509, 8, 25, 1, 25, 1, 25, 1, 25, 5, 25, 514, 8, 25, 10, 25, 12, 25, 517, 9, 25, 1, 25, 1,
    25, 5, 25, 521, 8, 25, 10, 25, 12, 25, 524, 9, 25, 1, 25, 1, 25, 1, 25, 1, 25, 1, 26, 3, 26,
    531, 8, 26, 1, 26, 1, 26, 1, 26, 1, 26, 1, 26, 1, 26, 1, 26, 1, 27, 1, 27, 3, 27, 542, 8, 27, 1,
    28, 3, 28, 545, 8, 28, 1, 28, 1, 28, 1, 28, 1, 28, 1, 28, 1, 28, 1, 28, 1, 28, 1, 28, 1, 28, 1,
    29, 1, 29, 1, 29, 1, 29, 1, 30, 3, 30, 562, 8, 30, 1, 30, 1, 30, 1, 30, 1, 30, 1, 30, 1, 30, 1,
    31, 3, 31, 571, 8, 31, 1, 31, 1, 31, 1, 31, 1, 31, 1, 32, 3, 32, 578, 8, 32, 1, 32, 1, 32, 1,
    32, 1, 32, 1, 32, 1, 32, 1, 33, 3, 33, 587, 8, 33, 1, 33, 1, 33, 1, 33, 1, 33, 3, 33, 593, 8,
    33, 1, 33, 1, 33, 1, 33, 1, 33, 1, 33, 1, 33, 5, 33, 601, 8, 33, 10, 33, 12, 33, 604, 9, 33, 1,
    33, 1, 33, 1, 33, 1, 34, 3, 34, 610, 8, 34, 1, 34, 1, 34, 1, 34, 1, 34, 1, 34, 1, 34, 1, 35, 3,
    35, 619, 8, 35, 1, 35, 1, 35, 1, 35, 1, 35, 3, 35, 625, 8, 35, 1, 35, 1, 35, 1, 35, 1, 35, 1,
    35, 1, 35, 1, 35, 5, 35, 634, 8, 35, 10, 35, 12, 35, 637, 9, 35, 1, 35, 1, 35, 1, 35, 1, 35, 1,
    36, 3, 36, 644, 8, 36, 1, 36, 1, 36, 1, 36, 1, 36, 3, 36, 650, 8, 36, 1, 36, 1, 36, 1, 36, 1,
    36, 1, 36, 1, 36, 1, 36, 5, 36, 659, 8, 36, 10, 36, 12, 36, 662, 9, 36, 1, 36, 1, 36, 1, 36, 1,
    37, 3, 37, 668, 8, 37, 1, 37, 1, 37, 1, 37, 1, 37, 1, 37, 1, 37, 3, 37, 676, 8, 37, 1, 37, 1,
    37, 1, 37, 1, 37, 1, 37, 1, 37, 1, 37, 1, 37, 1, 37, 1, 38, 3, 38, 688, 8, 38, 1, 38, 1, 38, 1,
    38, 1, 38, 1, 38, 1, 38, 3, 38, 696, 8, 38, 1, 38, 1, 38, 1, 38, 1, 38, 1, 38, 1, 38, 1, 38, 1,
    38, 1, 38, 1, 39, 1, 39, 1, 40, 1, 40, 1, 41, 1, 41, 1, 41, 1, 41, 1, 41, 3, 41, 716, 8, 41, 1,
    41, 1, 41, 5, 41, 720, 8, 41, 10, 41, 12, 41, 723, 9, 41, 1, 42, 1, 42, 1, 43, 1, 43, 1, 44, 1,
    44, 1, 45, 1, 45, 1, 45, 1, 45, 1, 45, 3, 45, 736, 8, 45, 1, 46, 1, 46, 1, 46, 5, 46, 741, 8,
    46, 10, 46, 12, 46, 744, 9, 46, 1, 47, 1, 47, 3, 47, 748, 8, 47, 1, 48, 1, 48, 1, 48, 5, 48,
    753, 8, 48, 10, 48, 12, 48, 756, 9, 48, 1, 49, 1, 49, 1, 49, 4, 49, 761, 8, 49, 11, 49, 12, 49,
    762, 1, 50, 1, 50, 1, 50, 5, 50, 768, 8, 50, 10, 50, 12, 50, 771, 9, 50, 1, 51, 1, 51, 1, 51, 1,
    51, 3, 51, 777, 8, 51, 1, 52, 1, 52, 1, 53, 1, 53, 1, 53, 1, 53, 1, 53, 3, 53, 786, 8, 53, 1,
    54, 1, 54, 1, 54, 1, 54, 1, 54, 3, 54, 793, 8, 54, 1, 55, 1, 55, 1, 56, 1, 56, 1, 57, 1, 57, 1,
    58, 1, 58, 1, 59, 1, 59, 1, 59, 1, 59, 1, 60, 1, 60, 1, 61, 1, 61, 1, 61, 1, 61, 1, 62, 1, 62,
    1, 62, 1, 62, 1, 62, 3, 62, 818, 8, 62, 1, 62, 1, 62, 1, 62, 1, 62, 1, 62, 5, 62, 825, 8, 62,
    10, 62, 12, 62, 828, 9, 62, 1, 62, 1, 62, 1, 62, 5, 62, 833, 8, 62, 10, 62, 12, 62, 836, 9, 62,
    1, 63, 1, 63, 1, 63, 1, 63, 1, 63, 1, 63, 1, 63, 1, 63, 1, 63, 3, 63, 847, 8, 63, 1, 63, 1, 63,
    1, 63, 1, 63, 1, 63, 5, 63, 854, 8, 63, 10, 63, 12, 63, 857, 9, 63, 1, 64, 1, 64, 3, 64, 861, 8,
    64, 1, 64, 5, 64, 864, 8, 64, 10, 64, 12, 64, 867, 9, 64, 1, 65, 1, 65, 1, 66, 1, 66, 1, 66, 1,
    66, 1, 67, 1, 67, 3, 67, 877, 8, 67, 1, 68, 1, 68, 1, 68, 1, 69, 1, 69, 1, 69, 1, 70, 1, 70, 1,
    70, 1, 70, 1, 71, 1, 71, 1, 71, 1, 71, 1, 72, 1, 72, 1, 72, 1, 72, 1, 73, 1, 73, 1, 73, 1, 73,
    1, 74, 1, 74, 1, 74, 5, 74, 904, 8, 74, 10, 74, 12, 74, 907, 9, 74, 1, 75, 1, 75, 1, 75, 1, 75,
    1, 76, 1, 76, 1, 76, 3, 76, 916, 8, 76, 1, 76, 1, 76, 1, 77, 1, 77, 1, 78, 1, 78, 1, 78, 3, 78,
    925, 8, 78, 1, 78, 1, 78, 1, 79, 1, 79, 1, 79, 1, 79, 1, 80, 1, 80, 1, 80, 1, 80, 1, 80, 5, 80,
    938, 8, 80, 10, 80, 12, 80, 941, 9, 80, 1, 80, 1, 80, 1, 81, 1, 81, 1, 81, 1, 81, 1, 81, 1, 81,
    5, 81, 951, 8, 81, 10, 81, 12, 81, 954, 9, 81, 1, 81, 1, 81, 1, 81, 1, 81, 1, 81, 1, 82, 1, 82,
    1, 82, 1, 82, 1, 82, 4, 82, 966, 8, 82, 11, 82, 12, 82, 967, 1, 82, 1, 82, 1, 83, 1, 83, 1, 83,
    1, 83, 1, 83, 1, 84, 1, 84, 1, 84, 0, 3, 82, 124, 126, 85, 0, 2, 4, 6, 8, 10, 12, 14, 16, 18,
    20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40, 42, 44, 46, 48, 50, 52, 54, 56, 58, 60, 62, 64, 66,
    68, 70, 72, 74, 76, 78, 80, 82, 84, 86, 88, 90, 92, 94, 96, 98, 100, 102, 104, 106, 108, 110,
    112, 114, 116, 118, 120, 122, 124, 126, 128, 130, 132, 134, 136, 138, 140, 142, 144, 146, 148,
    150, 152, 154, 156, 158, 160, 162, 164, 166, 168, 0, 5, 2, 0, 56, 60, 98, 98, 1, 0, 62, 63, 1,
    0, 99, 101, 1, 0, 103, 104, 4, 0, 64, 65, 67, 69, 71, 71, 85, 92, 1028, 0, 171, 1, 0, 0, 0, 2,
    196, 1, 0, 0, 0, 4, 199, 1, 0, 0, 0, 6, 220, 1, 0, 0, 0, 8, 245, 1, 0, 0, 0, 10, 266, 1, 0, 0,
    0, 12, 290, 1, 0, 0, 0, 14, 299, 1, 0, 0, 0, 16, 314, 1, 0, 0, 0, 18, 341, 1, 0, 0, 0, 20, 367,
    1, 0, 0, 0, 22, 370, 1, 0, 0, 0, 24, 383, 1, 0, 0, 0, 26, 386, 1, 0, 0, 0, 28, 397, 1, 0, 0, 0,
    30, 406, 1, 0, 0, 0, 32, 415, 1, 0, 0, 0, 34, 427, 1, 0, 0, 0, 36, 445, 1, 0, 0, 0, 38, 461, 1,
    0, 0, 0, 40, 479, 1, 0, 0, 0, 42, 490, 1, 0, 0, 0, 44, 492, 1, 0, 0, 0, 46, 496, 1, 0, 0, 0, 48,
    500, 1, 0, 0, 0, 50, 508, 1, 0, 0, 0, 52, 530, 1, 0, 0, 0, 54, 541, 1, 0, 0, 0, 56, 544, 1, 0,
    0, 0, 58, 556, 1, 0, 0, 0, 60, 561, 1, 0, 0, 0, 62, 570, 1, 0, 0, 0, 64, 577, 1, 0, 0, 0, 66,
    586, 1, 0, 0, 0, 68, 609, 1, 0, 0, 0, 70, 618, 1, 0, 0, 0, 72, 643, 1, 0, 0, 0, 74, 667, 1, 0,
    0, 0, 76, 687, 1, 0, 0, 0, 78, 706, 1, 0, 0, 0, 80, 708, 1, 0, 0, 0, 82, 715, 1, 0, 0, 0, 84,
    724, 1, 0, 0, 0, 86, 726, 1, 0, 0, 0, 88, 728, 1, 0, 0, 0, 90, 735, 1, 0, 0, 0, 92, 737, 1, 0,
    0, 0, 94, 747, 1, 0, 0, 0, 96, 749, 1, 0, 0, 0, 98, 757, 1, 0, 0, 0, 100, 764, 1, 0, 0, 0, 102,
    776, 1, 0, 0, 0, 104, 778, 1, 0, 0, 0, 106, 785, 1, 0, 0, 0, 108, 792, 1, 0, 0, 0, 110, 794, 1,
    0, 0, 0, 112, 796, 1, 0, 0, 0, 114, 798, 1, 0, 0, 0, 116, 800, 1, 0, 0, 0, 118, 802, 1, 0, 0, 0,
    120, 806, 1, 0, 0, 0, 122, 808, 1, 0, 0, 0, 124, 817, 1, 0, 0, 0, 126, 846, 1, 0, 0, 0, 128,
    860, 1, 0, 0, 0, 130, 868, 1, 0, 0, 0, 132, 870, 1, 0, 0, 0, 134, 876, 1, 0, 0, 0, 136, 878, 1,
    0, 0, 0, 138, 881, 1, 0, 0, 0, 140, 884, 1, 0, 0, 0, 142, 888, 1, 0, 0, 0, 144, 892, 1, 0, 0, 0,
    146, 896, 1, 0, 0, 0, 148, 900, 1, 0, 0, 0, 150, 908, 1, 0, 0, 0, 152, 912, 1, 0, 0, 0, 154,
    919, 1, 0, 0, 0, 156, 921, 1, 0, 0, 0, 158, 928, 1, 0, 0, 0, 160, 932, 1, 0, 0, 0, 162, 944, 1,
    0, 0, 0, 164, 960, 1, 0, 0, 0, 166, 971, 1, 0, 0, 0, 168, 976, 1, 0, 0, 0, 170, 172, 3, 20, 10,
    0, 171, 170, 1, 0, 0, 0, 171, 172, 1, 0, 0, 0, 172, 176, 1, 0, 0, 0, 173, 175, 3, 2, 1, 0, 174,
    173, 1, 0, 0, 0, 175, 178, 1, 0, 0, 0, 176, 174, 1, 0, 0, 0, 176, 177, 1, 0, 0, 0, 177, 182, 1,
    0, 0, 0, 178, 176, 1, 0, 0, 0, 179, 181, 5, 95, 0, 0, 180, 179, 1, 0, 0, 0, 181, 184, 1, 0, 0,
    0, 182, 180, 1, 0, 0, 0, 182, 183, 1, 0, 0, 0, 183, 185, 1, 0, 0, 0, 184, 182, 1, 0, 0, 0, 185,
    186, 5, 0, 0, 1, 186, 1, 1, 0, 0, 0, 187, 197, 3, 4, 2, 0, 188, 197, 3, 6, 3, 0, 189, 197, 3, 8,
    4, 0, 190, 197, 3, 10, 5, 0, 191, 197, 3, 12, 6, 0, 192, 197, 3, 14, 7, 0, 193, 197, 3, 16, 8,
    0, 194, 197, 3, 18, 9, 0, 195, 197, 3, 20, 10, 0, 196, 187, 1, 0, 0, 0, 196, 188, 1, 0, 0, 0,
    196, 189, 1, 0, 0, 0, 196, 190, 1, 0, 0, 0, 196, 191, 1, 0, 0, 0, 196, 192, 1, 0, 0, 0, 196,
    193, 1, 0, 0, 0, 196, 194, 1, 0, 0, 0, 196, 195, 1, 0, 0, 0, 197, 3, 1, 0, 0, 0, 198, 200, 5,
    108, 0, 0, 199, 198, 1, 0, 0, 0, 199, 200, 1, 0, 0, 0, 200, 201, 1, 0, 0, 0, 201, 202, 5, 47, 0,
    0, 202, 203, 5, 10, 0, 0, 203, 204, 5, 80, 0, 0, 204, 205, 5, 81, 0, 0, 205, 206, 5, 81, 0, 0,
    206, 207, 5, 70, 0, 0, 207, 208, 5, 50, 0, 0, 208, 209, 5, 84, 0, 0, 209, 213, 5, 95, 0, 0, 210,
    212, 3, 24, 12, 0, 211, 210, 1, 0, 0, 0, 212, 215, 1, 0, 0, 0, 213, 211, 1, 0, 0, 0, 213, 214,
    1, 0, 0, 0, 214, 216, 1, 0, 0, 0, 215, 213, 1, 0, 0, 0, 216, 217, 5, 124, 0, 0, 217, 218, 5, 95,
    0, 0, 218, 5, 1, 0, 0, 0, 219, 221, 5, 108, 0, 0, 220, 219, 1, 0, 0, 0, 220, 221, 1, 0, 0, 0,
    221, 222, 1, 0, 0, 0, 222, 223, 5, 47, 0, 0, 223, 224, 3, 84, 42, 0, 224, 226, 5, 80, 0, 0, 225,
    227, 3, 96, 48, 0, 226, 225, 1, 0, 0, 0, 226, 227, 1, 0, 0, 0, 227, 228, 1, 0, 0, 0, 228, 229,
    5, 81, 0, 0, 229, 230, 5, 70, 0, 0, 230, 231, 3, 102, 51, 0, 231, 232, 5, 84, 0, 0, 232, 233, 5,
    109, 0, 0, 233, 237, 5, 95, 0, 0, 234, 236, 3, 24, 12, 0, 235, 234, 1, 0, 0, 0, 236, 239, 1, 0,
    0, 0, 237, 235, 1, 0, 0, 0, 237, 238, 1, 0, 0, 0, 238, 240, 1, 0, 0, 0, 239, 237, 1, 0, 0, 0,
    240, 241, 3, 58, 29, 0, 241, 242, 5, 124, 0, 0, 242, 243, 5, 95, 0, 0, 243, 7, 1, 0, 0, 0, 244,
    246, 5, 108, 0, 0, 245, 244, 1, 0, 0, 0, 245, 246, 1, 0, 0, 0, 246, 247, 1, 0, 0, 0, 247, 248,
    5, 1, 0, 0, 248, 249, 3, 86, 43, 0, 249, 250, 5, 80, 0, 0, 250, 251, 5, 54, 0, 0, 251, 252, 5,
    81, 0, 0, 252, 253, 5, 124, 0, 0, 253, 259, 5, 95, 0, 0, 254, 258, 3, 56, 28, 0, 255, 258, 3,
    28, 14, 0, 256, 258, 3, 20, 10, 0, 257, 254, 1, 0, 0, 0, 257, 255, 1, 0, 0, 0, 257, 256, 1, 0,
    0, 0, 258, 261, 1, 0, 0, 0, 259, 257, 1, 0, 0, 0, 259, 260, 1, 0, 0, 0, 260, 262, 1, 0, 0, 0,
    261, 259, 1, 0, 0, 0, 262, 263, 5, 124, 0, 0, 263, 264, 5, 95, 0, 0, 264, 9, 1, 0, 0, 0, 265,
    267, 5, 108, 0, 0, 266, 265, 1, 0, 0, 0, 266, 267, 1, 0, 0, 0, 267, 268, 1, 0, 0, 0, 268, 269,
    5, 47, 0, 0, 269, 270, 3, 84, 42, 0, 270, 272, 5, 80, 0, 0, 271, 273, 3, 96, 48, 0, 272, 271, 1,
    0, 0, 0, 272, 273, 1, 0, 0, 0, 273, 274, 1, 0, 0, 0, 274, 275, 5, 81, 0, 0, 275, 276, 5, 70, 0,
    0, 276, 277, 5, 50, 0, 0, 277, 278, 5, 84, 0, 0, 278, 279, 5, 110, 0, 0, 279, 283, 5, 95, 0, 0,
    280, 282, 3, 24, 12, 0, 281, 280, 1, 0, 0, 0, 282, 285, 1, 0, 0, 0, 283, 281, 1, 0, 0, 0, 283,
    284, 1, 0, 0, 0, 284, 286, 1, 0, 0, 0, 285, 283, 1, 0, 0, 0, 286, 287, 5, 124, 0, 0, 287, 288,
    5, 95, 0, 0, 288, 11, 1, 0, 0, 0, 289, 291, 5, 108, 0, 0, 290, 289, 1, 0, 0, 0, 290, 291, 1, 0,
    0, 0, 291, 292, 1, 0, 0, 0, 292, 293, 3, 78, 39, 0, 293, 294, 5, 67, 0, 0, 294, 295, 3, 90, 45,
    0, 295, 296, 5, 111, 0, 0, 296, 297, 5, 95, 0, 0, 297, 13, 1, 0, 0, 0, 298, 300, 5, 108, 0, 0,
    299, 298, 1, 0, 0, 0, 299, 300, 1, 0, 0, 0, 300, 301, 1, 0, 0, 0, 301, 302, 5, 1, 0, 0, 302,
    303, 3, 88, 44, 0, 303, 304, 5, 80, 0, 0, 304, 305, 5, 4, 0, 0, 305, 306, 5, 81, 0, 0, 306, 307,
    5, 84, 0, 0, 307, 308, 5, 112, 0, 0, 308, 309, 5, 95, 0, 0, 309, 310, 3, 98, 49, 0, 310, 311, 5,
    95, 0, 0, 311, 312, 5, 124, 0, 0, 312, 15, 1, 0, 0, 0, 313, 315, 5, 108, 0, 0, 314, 313, 1, 0,
    0, 0, 314, 315, 1, 0, 0, 0, 315, 316, 1, 0, 0, 0, 316, 317, 5, 1, 0, 0, 317, 322, 3, 88, 44, 0,
    318, 319, 5, 80, 0, 0, 319, 320, 3, 88, 44, 0, 320, 321, 5, 81, 0, 0, 321, 323, 1, 0, 0, 0, 322,
    318, 1, 0, 0, 0, 322, 323, 1, 0, 0, 0, 323, 324, 1, 0, 0, 0, 324, 325, 5, 84, 0, 0, 325, 326, 5,
    113, 0, 0, 326, 334, 5, 95, 0, 0, 327, 333, 3, 66, 33, 0, 328, 333, 3, 68, 34, 0, 329, 333, 3,
    70, 35, 0, 330, 333, 3, 72, 36, 0, 331, 333, 3, 20, 10, 0, 332, 327, 1, 0, 0, 0, 332, 328, 1, 0,
    0, 0, 332, 329, 1, 0, 0, 0, 332, 330, 1, 0, 0, 0, 332, 331, 1, 0, 0, 0, 333, 336, 1, 0, 0, 0,
    334, 332, 1, 0, 0, 0, 334, 335, 1, 0, 0, 0, 335, 337, 1, 0, 0, 0, 336, 334, 1, 0, 0, 0, 337,
    338, 5, 124, 0, 0, 338, 339, 5, 95, 0, 0, 339, 17, 1, 0, 0, 0, 340, 342, 5, 108, 0, 0, 341, 340,
    1, 0, 0, 0, 341, 342, 1, 0, 0, 0, 342, 343, 1, 0, 0, 0, 343, 344, 5, 1, 0, 0, 344, 349, 3, 88,
    44, 0, 345, 346, 5, 80, 0, 0, 346, 350, 3, 88, 44, 0, 347, 348, 5, 53, 0, 0, 348, 350, 5, 81, 0,
    0, 349, 345, 1, 0, 0, 0, 349, 347, 1, 0, 0, 0, 350, 351, 1, 0, 0, 0, 351, 352, 5, 114, 0, 0,
    352, 361, 5, 95, 0, 0, 353, 360, 3, 68, 34, 0, 354, 360, 3, 70, 35, 0, 355, 360, 3, 72, 36, 0,
    356, 360, 3, 74, 37, 0, 357, 360, 3, 76, 38, 0, 358, 360, 3, 20, 10, 0, 359, 353, 1, 0, 0, 0,
    359, 354, 1, 0, 0, 0, 359, 355, 1, 0, 0, 0, 359, 356, 1, 0, 0, 0, 359, 357, 1, 0, 0, 0, 359,
    358, 1, 0, 0, 0, 360, 363, 1, 0, 0, 0, 361, 359, 1, 0, 0, 0, 361, 362, 1, 0, 0, 0, 362, 364, 1,
    0, 0, 0, 363, 361, 1, 0, 0, 0, 364, 365, 5, 124, 0, 0, 365, 366, 5, 95, 0, 0, 366, 19, 1, 0, 0,
    0, 367, 368, 3, 22, 11, 0, 368, 369, 5, 95, 0, 0, 369, 21, 1, 0, 0, 0, 370, 371, 5, 124, 0, 0,
    371, 23, 1, 0, 0, 0, 372, 384, 3, 26, 13, 0, 373, 384, 3, 28, 14, 0, 374, 384, 3, 30, 15, 0,
    375, 384, 3, 32, 16, 0, 376, 384, 3, 34, 17, 0, 377, 384, 3, 36, 18, 0, 378, 384, 3, 38, 19, 0,
    379, 384, 3, 40, 20, 0, 380, 384, 3, 50, 25, 0, 381, 384, 3, 52, 26, 0, 382, 384, 3, 20, 10, 0,
    383, 372, 1, 0, 0, 0, 383, 373, 1, 0, 0, 0, 383, 374, 1, 0, 0, 0, 383, 375, 1, 0, 0, 0, 383,
    376, 1, 0, 0, 0, 383, 377, 1, 0, 0, 0, 383, 378, 1, 0, 0, 0, 383, 379, 1, 0, 0, 0, 383, 380, 1,
    0, 0, 0, 383, 381, 1, 0, 0, 0, 383, 382, 1, 0, 0, 0, 384, 25, 1, 0, 0, 0, 385, 387, 5, 108, 0,
    0, 386, 385, 1, 0, 0, 0, 386, 387, 1, 0, 0, 0, 387, 388, 1, 0, 0, 0, 388, 389, 5, 11, 0, 0, 389,
    391, 5, 80, 0, 0, 390, 392, 3, 124, 62, 0, 391, 390, 1, 0, 0, 0, 391, 392, 1, 0, 0, 0, 392, 393,
    1, 0, 0, 0, 393, 394, 5, 81, 0, 0, 394, 395, 5, 95, 0, 0, 395, 27, 1, 0, 0, 0, 396, 398, 5, 108,
    0, 0, 397, 396, 1, 0, 0, 0, 397, 398, 1, 0, 0, 0, 398, 399, 1, 0, 0, 0, 399, 400, 3, 78, 39, 0,
    400, 401, 5, 67, 0, 0, 401, 402, 3, 124, 62, 0, 402, 403, 5, 115, 0, 0, 403, 404, 5, 95, 0, 0,
    404, 29, 1, 0, 0, 0, 405, 407, 5, 108, 0, 0, 406, 405, 1, 0, 0, 0, 406, 407, 1, 0, 0, 0, 407,
    408, 1, 0, 0, 0, 408, 409, 3, 82, 41, 0, 409, 410, 5, 67, 0, 0, 410, 411, 3, 124, 62, 0, 411,
    412, 5, 116, 0, 0, 412, 413, 5, 95, 0, 0, 413, 31, 1, 0, 0, 0, 414, 416, 5, 108, 0, 0, 415, 414,
    1, 0, 0, 0, 415, 416, 1, 0, 0, 0, 416, 417, 1, 0, 0, 0, 417, 418, 3, 78, 39, 0, 418, 419, 5, 67,
    0, 0, 419, 420, 5, 8, 0, 0, 420, 421, 5, 80, 0, 0, 421, 422, 3, 124, 62, 0, 422, 423, 5, 81, 0,
    0, 423, 424, 5, 117, 0, 0, 424, 425, 5, 95, 0, 0, 425, 33, 1, 0, 0, 0, 426, 428, 5, 108, 0, 0,
    427, 426, 1, 0, 0, 0, 427, 428, 1, 0, 0, 0, 428, 429, 1, 0, 0, 0, 429, 430, 5, 6, 0, 0, 430,
    431, 3, 124, 62, 0, 431, 432, 5, 84, 0, 0, 432, 438, 5, 95, 0, 0, 433, 437, 3, 60, 30, 0, 434,
    437, 3, 62, 31, 0, 435, 437, 3, 24, 12, 0, 436, 433, 1, 0, 0, 0, 436, 434, 1, 0, 0, 0, 436, 435,
    1, 0, 0, 0, 437, 440, 1, 0, 0, 0, 438, 436, 1, 0, 0, 0, 438, 439, 1, 0, 0, 0, 439, 441, 1, 0, 0,
    0, 440, 438, 1, 0, 0, 0, 441, 442, 5, 124, 0, 0, 442, 443, 5, 95, 0, 0, 443, 35, 1, 0, 0, 0,
    444, 446, 5, 108, 0, 0, 445, 444, 1, 0, 0, 0, 445, 446, 1, 0, 0, 0, 446, 447, 1, 0, 0, 0, 447,
    448, 5, 14, 0, 0, 448, 449, 3, 124, 62, 0, 449, 450, 5, 84, 0, 0, 450, 454, 5, 95, 0, 0, 451,
    453, 3, 24, 12, 0, 452, 451, 1, 0, 0, 0, 453, 456, 1, 0, 0, 0, 454, 452, 1, 0, 0, 0, 454, 455,
    1, 0, 0, 0, 455, 457, 1, 0, 0, 0, 456, 454, 1, 0, 0, 0, 457, 458, 5, 124, 0, 0, 458, 459, 5, 95,
    0, 0, 459, 37, 1, 0, 0, 0, 460, 462, 5, 108, 0, 0, 461, 460, 1, 0, 0, 0, 461, 462, 1, 0, 0, 0,
    462, 463, 1, 0, 0, 0, 463, 464, 5, 5, 0, 0, 464, 465, 3, 78, 39, 0, 465, 466, 5, 7, 0, 0, 466,
    467, 3, 124, 62, 0, 467, 468, 5, 84, 0, 0, 468, 472, 5, 95, 0, 0, 469, 471, 3, 24, 12, 0, 470,
    469, 1, 0, 0, 0, 471, 474, 1, 0, 0, 0, 472, 470, 1, 0, 0, 0, 472, 473, 1, 0, 0, 0, 473, 475, 1,
    0, 0, 0, 474, 472, 1, 0, 0, 0, 475, 476, 5, 124, 0, 0, 476, 477, 5, 95, 0, 0, 477, 39, 1, 0, 0,
    0, 478, 480, 5, 108, 0, 0, 479, 478, 1, 0, 0, 0, 479, 480, 1, 0, 0, 0, 480, 481, 1, 0, 0, 0,
    481, 482, 3, 42, 21, 0, 482, 483, 5, 80, 0, 0, 483, 484, 3, 92, 46, 0, 484, 485, 5, 81, 0, 0,
    485, 486, 5, 95, 0, 0, 486, 41, 1, 0, 0, 0, 487, 491, 3, 84, 42, 0, 488, 491, 3, 44, 22, 0, 489,
    491, 3, 46, 23, 0, 490, 487, 1, 0, 0, 0, 490, 488, 1, 0, 0, 0, 490, 489, 1, 0, 0, 0, 491, 43, 1,
    0, 0, 0, 492, 493, 5, 74, 0, 0, 493, 494, 5, 82, 0, 0, 494, 495, 3, 84, 42, 0, 495, 45, 1, 0, 0,
    0, 496, 497, 3, 48, 24, 0, 497, 498, 5, 82, 0, 0, 498, 499, 3, 84, 42, 0, 499, 47, 1, 0, 0, 0,
    500, 504, 3, 80, 40, 0, 501, 503, 3, 122, 61, 0, 502, 501, 1, 0, 0, 0, 503, 506, 1, 0, 0, 0,
    504, 502, 1, 0, 0, 0, 504, 505, 1, 0, 0, 0, 505, 49, 1, 0, 0, 0, 506, 504, 1, 0, 0, 0, 507, 509,
    5, 108, 0, 0, 508, 507, 1, 0, 0, 0, 508, 509, 1, 0, 0, 0, 509, 510, 1, 0, 0, 0, 510, 511, 5, 13,
    0, 0, 511, 515, 5, 95, 0, 0, 512, 514, 3, 24, 12, 0, 513, 512, 1, 0, 0, 0, 514, 517, 1, 0, 0, 0,
    515, 513, 1, 0, 0, 0, 515, 516, 1, 0, 0, 0, 516, 518, 1, 0, 0, 0, 517, 515, 1, 0, 0, 0, 518,
    522, 3, 64, 32, 0, 519, 521, 3, 24, 12, 0, 520, 519, 1, 0, 0, 0, 521, 524, 1, 0, 0, 0, 522, 520,
    1, 0, 0, 0, 522, 523, 1, 0, 0, 0, 523, 525, 1, 0, 0, 0, 524, 522, 1, 0, 0, 0, 525, 526, 5, 26,
    0, 0, 526, 527, 5, 13, 0, 0, 527, 528, 5, 95, 0, 0, 528, 51, 1, 0, 0, 0, 529, 531, 5, 108, 0, 0,
    530, 529, 1, 0, 0, 0, 530, 531, 1, 0, 0, 0, 531, 532, 1, 0, 0, 0, 532, 533, 5, 52, 0, 0, 533,
    534, 3, 88, 44, 0, 534, 535, 5, 80, 0, 0, 535, 536, 3, 54, 27, 0, 536, 537, 5, 81, 0, 0, 537,
    538, 5, 95, 0, 0, 538, 53, 1, 0, 0, 0, 539, 542, 3, 116, 58, 0, 540, 542, 3, 80, 40, 0, 541,
    539, 1, 0, 0, 0, 541, 540, 1, 0, 0, 0, 542, 55, 1, 0, 0, 0, 543, 545, 5, 108, 0, 0, 544, 543, 1,
    0, 0, 0, 544, 545, 1, 0, 0, 0, 545, 546, 1, 0, 0, 0, 546, 547, 5, 74, 0, 0, 547, 548, 5, 82, 0,
    0, 548, 549, 5, 45, 0, 0, 549, 550, 5, 80, 0, 0, 550, 551, 3, 104, 52, 0, 551, 552, 5, 83, 0, 0,
    552, 553, 3, 106, 53, 0, 553, 554, 5, 81, 0, 0, 554, 555, 5, 95, 0, 0, 555, 57, 1, 0, 0, 0, 556,
    557, 5, 12, 0, 0, 557, 558, 3, 124, 62, 0, 558, 559, 5, 95, 0, 0, 559, 59, 1, 0, 0, 0, 560, 562,
    5, 108, 0, 0, 561, 560, 1, 0, 0, 0, 561, 562, 1, 0, 0, 0, 562, 563, 1, 0, 0, 0, 563, 564, 5, 2,
    0, 0, 564, 565, 3, 124, 62, 0, 565, 566, 5, 84, 0, 0, 566, 567, 5, 120, 0, 0, 567, 568, 5, 95,
    0, 0, 568, 61, 1, 0, 0, 0, 569, 571, 5, 108, 0, 0, 570, 569, 1, 0, 0, 0, 570, 571, 1, 0, 0, 0,
    571, 572, 1, 0, 0, 0, 572, 573, 5, 3, 0, 0, 573, 574, 5, 84, 0, 0, 574, 575, 5, 95, 0, 0, 575,
    63, 1, 0, 0, 0, 576, 578, 5, 108, 0, 0, 577, 576, 1, 0, 0, 0, 577, 578, 1, 0, 0, 0, 578, 579, 1,
    0, 0, 0, 579, 580, 5, 48, 0, 0, 580, 581, 3, 88, 44, 0, 581, 582, 5, 46, 0, 0, 582, 583, 3, 78,
    39, 0, 583, 584, 5, 95, 0, 0, 584, 65, 1, 0, 0, 0, 585, 587, 5, 108, 0, 0, 586, 585, 1, 0, 0, 0,
    586, 587, 1, 0, 0, 0, 587, 588, 1, 0, 0, 0, 588, 589, 5, 47, 0, 0, 589, 590, 5, 49, 0, 0, 590,
    592, 5, 80, 0, 0, 591, 593, 3, 96, 48, 0, 592, 591, 1, 0, 0, 0, 592, 593, 1, 0, 0, 0, 593, 594,
    1, 0, 0, 0, 594, 595, 5, 81, 0, 0, 595, 596, 5, 70, 0, 0, 596, 597, 5, 50, 0, 0, 597, 598, 5,
    84, 0, 0, 598, 602, 5, 95, 0, 0, 599, 601, 3, 24, 12, 0, 600, 599, 1, 0, 0, 0, 601, 604, 1, 0,
    0, 0, 602, 600, 1, 0, 0, 0, 602, 603, 1, 0, 0, 0, 603, 605, 1, 0, 0, 0, 604, 602, 1, 0, 0, 0,
    605, 606, 5, 124, 0, 0, 606, 607, 5, 95, 0, 0, 607, 67, 1, 0, 0, 0, 608, 610, 5, 108, 0, 0, 609,
    608, 1, 0, 0, 0, 609, 610, 1, 0, 0, 0, 610, 611, 1, 0, 0, 0, 611, 612, 3, 78, 39, 0, 612, 613,
    5, 84, 0, 0, 613, 614, 3, 102, 51, 0, 614, 615, 5, 121, 0, 0, 615, 616, 5, 95, 0, 0, 616, 69, 1,
    0, 0, 0, 617, 619, 5, 108, 0, 0, 618, 617, 1, 0, 0, 0, 618, 619, 1, 0, 0, 0, 619, 620, 1, 0, 0,
    0, 620, 621, 5, 47, 0, 0, 621, 622, 3, 84, 42, 0, 622, 624, 5, 80, 0, 0, 623, 625, 3, 96, 48, 0,
    624, 623, 1, 0, 0, 0, 624, 625, 1, 0, 0, 0, 625, 626, 1, 0, 0, 0, 626, 627, 5, 81, 0, 0, 627,
    628, 5, 70, 0, 0, 628, 629, 3, 102, 51, 0, 629, 630, 5, 84, 0, 0, 630, 631, 5, 122, 0, 0, 631,
    635, 5, 95, 0, 0, 632, 634, 3, 24, 12, 0, 633, 632, 1, 0, 0, 0, 634, 637, 1, 0, 0, 0, 635, 633,
    1, 0, 0, 0, 635, 636, 1, 0, 0, 0, 636, 638, 1, 0, 0, 0, 637, 635, 1, 0, 0, 0, 638, 639, 3, 58,
    29, 0, 639, 640, 5, 124, 0, 0, 640, 641, 5, 95, 0, 0, 641, 71, 1, 0, 0, 0, 642, 644, 5, 108, 0,
    0, 643, 642, 1, 0, 0, 0, 643, 644, 1, 0, 0, 0, 644, 645, 1, 0, 0, 0, 645, 646, 5, 47, 0, 0, 646,
    647, 3, 84, 42, 0, 647, 649, 5, 80, 0, 0, 648, 650, 3, 96, 48, 0, 649, 648, 1, 0, 0, 0, 649,
    650, 1, 0, 0, 0, 650, 651, 1, 0, 0, 0, 651, 652, 5, 81, 0, 0, 652, 653, 5, 70, 0, 0, 653, 654,
    5, 50, 0, 0, 654, 655, 5, 84, 0, 0, 655, 656, 5, 123, 0, 0, 656, 660, 5, 95, 0, 0, 657, 659, 3,
    24, 12, 0, 658, 657, 1, 0, 0, 0, 659, 662, 1, 0, 0, 0, 660, 658, 1, 0, 0, 0, 660, 661, 1, 0, 0,
    0, 661, 663, 1, 0, 0, 0, 662, 660, 1, 0, 0, 0, 663, 664, 5, 124, 0, 0, 664, 665, 5, 95, 0, 0,
    665, 73, 1, 0, 0, 0, 666, 668, 5, 108, 0, 0, 667, 666, 1, 0, 0, 0, 667, 668, 1, 0, 0, 0, 668,
    669, 1, 0, 0, 0, 669, 670, 5, 44, 0, 0, 670, 671, 5, 95, 0, 0, 671, 672, 5, 47, 0, 0, 672, 673,
    3, 84, 42, 0, 673, 675, 5, 80, 0, 0, 674, 676, 3, 96, 48, 0, 675, 674, 1, 0, 0, 0, 675, 676, 1,
    0, 0, 0, 676, 677, 1, 0, 0, 0, 677, 678, 5, 81, 0, 0, 678, 679, 5, 70, 0, 0, 679, 680, 3, 102,
    51, 0, 680, 681, 5, 84, 0, 0, 681, 682, 5, 95, 0, 0, 682, 683, 5, 51, 0, 0, 683, 684, 5, 124, 0,
    0, 684, 685, 5, 95, 0, 0, 685, 75, 1, 0, 0, 0, 686, 688, 5, 108, 0, 0, 687, 686, 1, 0, 0, 0,
    687, 688, 1, 0, 0, 0, 688, 689, 1, 0, 0, 0, 689, 690, 5, 44, 0, 0, 690, 691, 5, 95, 0, 0, 691,
    692, 5, 47, 0, 0, 692, 693, 3, 84, 42, 0, 693, 695, 5, 80, 0, 0, 694, 696, 3, 96, 48, 0, 695,
    694, 1, 0, 0, 0, 695, 696, 1, 0, 0, 0, 696, 697, 1, 0, 0, 0, 697, 698, 5, 81, 0, 0, 698, 699, 5,
    70, 0, 0, 699, 700, 5, 50, 0, 0, 700, 701, 5, 84, 0, 0, 701, 702, 5, 95, 0, 0, 702, 703, 5, 51,
    0, 0, 703, 704, 5, 124, 0, 0, 704, 705, 5, 95, 0, 0, 705, 77, 1, 0, 0, 0, 706, 707, 5, 97, 0, 0,
    707, 79, 1, 0, 0, 0, 708, 709, 5, 97, 0, 0, 709, 81, 1, 0, 0, 0, 710, 711, 6, 41, -1, 0, 711,
    716, 3, 80, 40, 0, 712, 713, 5, 74, 0, 0, 713, 714, 5, 82, 0, 0, 714, 716, 3, 80, 40, 0, 715,
    710, 1, 0, 0, 0, 715, 712, 1, 0, 0, 0, 716, 721, 1, 0, 0, 0, 717, 718, 10, 1, 0, 0, 718, 720, 3,
    122, 61, 0, 719, 717, 1, 0, 0, 0, 720, 723, 1, 0, 0, 0, 721, 719, 1, 0, 0, 0, 721, 722, 1, 0, 0,
    0, 722, 83, 1, 0, 0, 0, 723, 721, 1, 0, 0, 0, 724, 725, 5, 97, 0, 0, 725, 85, 1, 0, 0, 0, 726,
    727, 5, 96, 0, 0, 727, 87, 1, 0, 0, 0, 728, 729, 7, 0, 0, 0, 729, 89, 1, 0, 0, 0, 730, 736, 3,
    110, 55, 0, 731, 736, 3, 112, 56, 0, 732, 736, 3, 114, 57, 0, 733, 736, 3, 116, 58, 0, 734, 736,
    3, 168, 84, 0, 735, 730, 1, 0, 0, 0, 735, 731, 1, 0, 0, 0, 735, 732, 1, 0, 0, 0, 735, 733, 1, 0,
    0, 0, 735, 734, 1, 0, 0, 0, 736, 91, 1, 0, 0, 0, 737, 742, 3, 94, 47, 0, 738, 739, 5, 83, 0, 0,
    739, 741, 3, 94, 47, 0, 740, 738, 1, 0, 0, 0, 741, 744, 1, 0, 0, 0, 742, 740, 1, 0, 0, 0, 742,
    743, 1, 0, 0, 0, 743, 93, 1, 0, 0, 0, 744, 742, 1, 0, 0, 0, 745, 748, 3, 166, 83, 0, 746, 748,
    3, 124, 62, 0, 747, 745, 1, 0, 0, 0, 747, 746, 1, 0, 0, 0, 748, 95, 1, 0, 0, 0, 749, 754, 3,
    158, 79, 0, 750, 751, 5, 83, 0, 0, 751, 753, 3, 158, 79, 0, 752, 750, 1, 0, 0, 0, 753, 756, 1,
    0, 0, 0, 754, 752, 1, 0, 0, 0, 754, 755, 1, 0, 0, 0, 755, 97, 1, 0, 0, 0, 756, 754, 1, 0, 0, 0,
    757, 760, 3, 78, 39, 0, 758, 759, 5, 83, 0, 0, 759, 761, 3, 78, 39, 0, 760, 758, 1, 0, 0, 0,
    761, 762, 1, 0, 0, 0, 762, 760, 1, 0, 0, 0, 762, 763, 1, 0, 0, 0, 763, 99, 1, 0, 0, 0, 764, 769,
    3, 124, 62, 0, 765, 766, 5, 83, 0, 0, 766, 768, 3, 124, 62, 0, 767, 765, 1, 0, 0, 0, 768, 771,
    1, 0, 0, 0, 769, 767, 1, 0, 0, 0, 769, 770, 1, 0, 0, 0, 770, 101, 1, 0, 0, 0, 771, 769, 1, 0, 0,
    0, 772, 777, 3, 164, 82, 0, 773, 777, 3, 88, 44, 0, 774, 777, 3, 160, 80, 0, 775, 777, 3, 162,
    81, 0, 776, 772, 1, 0, 0, 0, 776, 773, 1, 0, 0, 0, 776, 774, 1, 0, 0, 0, 776, 775, 1, 0, 0, 0,
    777, 103, 1, 0, 0, 0, 778, 779, 3, 124, 62, 0, 779, 105, 1, 0, 0, 0, 780, 786, 3, 108, 54, 0,
    781, 786, 3, 142, 71, 0, 782, 786, 3, 146, 73, 0, 783, 786, 3, 134, 67, 0, 784, 786, 3, 144, 72,
    0, 785, 780, 1, 0, 0, 0, 785, 781, 1, 0, 0, 0, 785, 782, 1, 0, 0, 0, 785, 783, 1, 0, 0, 0, 785,
    784, 1, 0, 0, 0, 786, 107, 1, 0, 0, 0, 787, 793, 3, 110, 55, 0, 788, 793, 3, 112, 56, 0, 789,
    793, 3, 114, 57, 0, 790, 793, 3, 116, 58, 0, 791, 793, 3, 118, 59, 0, 792, 787, 1, 0, 0, 0, 792,
    788, 1, 0, 0, 0, 792, 789, 1, 0, 0, 0, 792, 790, 1, 0, 0, 0, 792, 791, 1, 0, 0, 0, 793, 109, 1,
    0, 0, 0, 794, 795, 7, 1, 0, 0, 795, 111, 1, 0, 0, 0, 796, 797, 7, 2, 0, 0, 797, 113, 1, 0, 0, 0,
    798, 799, 5, 102, 0, 0, 799, 115, 1, 0, 0, 0, 800, 801, 7, 3, 0, 0, 801, 117, 1, 0, 0, 0, 802,
    803, 3, 88, 44, 0, 803, 804, 5, 82, 0, 0, 804, 805, 3, 80, 40, 0, 805, 119, 1, 0, 0, 0, 806,
    807, 5, 105, 0, 0, 807, 121, 1, 0, 0, 0, 808, 809, 5, 78, 0, 0, 809, 810, 3, 124, 62, 0, 810,
    811, 5, 79, 0, 0, 811, 123, 1, 0, 0, 0, 812, 813, 6, 62, -1, 0, 813, 818, 3, 156, 78, 0, 814,
    818, 3, 134, 67, 0, 815, 818, 3, 126, 63, 0, 816, 818, 3, 140, 70, 0, 817, 812, 1, 0, 0, 0, 817,
    814, 1, 0, 0, 0, 817, 815, 1, 0, 0, 0, 817, 816, 1, 0, 0, 0, 818, 834, 1, 0, 0, 0, 819, 820, 10,
    1, 0, 0, 820, 821, 5, 6, 0, 0, 821, 826, 3, 124, 62, 0, 822, 823, 5, 2, 0, 0, 823, 825, 3, 124,
    62, 0, 824, 822, 1, 0, 0, 0, 825, 828, 1, 0, 0, 0, 826, 824, 1, 0, 0, 0, 826, 827, 1, 0, 0, 0,
    827, 829, 1, 0, 0, 0, 828, 826, 1, 0, 0, 0, 829, 830, 5, 3, 0, 0, 830, 831, 3, 124, 62, 2, 831,
    833, 1, 0, 0, 0, 832, 819, 1, 0, 0, 0, 833, 836, 1, 0, 0, 0, 834, 832, 1, 0, 0, 0, 834, 835, 1,
    0, 0, 0, 835, 125, 1, 0, 0, 0, 836, 834, 1, 0, 0, 0, 837, 838, 6, 63, -1, 0, 838, 847, 3, 130,
    65, 0, 839, 847, 3, 132, 66, 0, 840, 847, 3, 108, 54, 0, 841, 847, 3, 142, 71, 0, 842, 847, 3,
    146, 73, 0, 843, 847, 3, 144, 72, 0, 844, 847, 3, 80, 40, 0, 845, 847, 3, 152, 76, 0, 846, 837,
    1, 0, 0, 0, 846, 839, 1, 0, 0, 0, 846, 840, 1, 0, 0, 0, 846, 841, 1, 0, 0, 0, 846, 842, 1, 0, 0,
    0, 846, 843, 1, 0, 0, 0, 846, 844, 1, 0, 0, 0, 846, 845, 1, 0, 0, 0, 847, 855, 1, 0, 0, 0, 848,
    849, 10, 2, 0, 0, 849, 854, 3, 122, 61, 0, 850, 851, 10, 1, 0, 0, 851, 852, 5, 82, 0, 0, 852,
    854, 3, 128, 64, 0, 853, 848, 1, 0, 0, 0, 853, 850, 1, 0, 0, 0, 854, 857, 1, 0, 0, 0, 855, 853,
    1, 0, 0, 0, 855, 856, 1, 0, 0, 0, 856, 127, 1, 0, 0, 0, 857, 855, 1, 0, 0, 0, 858, 861, 3, 80,
    40, 0, 859, 861, 3, 152, 76, 0, 860, 858, 1, 0, 0, 0, 860, 859, 1, 0, 0, 0, 861, 865, 1, 0, 0,
    0, 862, 864, 3, 122, 61, 0, 863, 862, 1, 0, 0, 0, 864, 867, 1, 0, 0, 0, 865, 863, 1, 0, 0, 0,
    865, 866, 1, 0, 0, 0, 866, 129, 1, 0, 0, 0, 867, 865, 1, 0, 0, 0, 868, 869, 5, 74, 0, 0, 869,
    131, 1, 0, 0, 0, 870, 871, 5, 80, 0, 0, 871, 872, 3, 124, 62, 0, 872, 873, 5, 81, 0, 0, 873,
    133, 1, 0, 0, 0, 874, 877, 3, 136, 68, 0, 875, 877, 3, 138, 69, 0, 876, 874, 1, 0, 0, 0, 876,
    875, 1, 0, 0, 0, 877, 135, 1, 0, 0, 0, 878, 879, 5, 86, 0, 0, 879, 880, 3, 126, 63, 0, 880, 137,
    1, 0, 0, 0, 881, 882, 5, 66, 0, 0, 882, 883, 3, 126, 63, 0, 883, 139, 1, 0, 0, 0, 884, 885, 3,
    126, 63, 0, 885, 886, 3, 154, 77, 0, 886, 887, 3, 124, 62, 0, 887, 141, 1, 0, 0, 0, 888, 889, 5,
    78, 0, 0, 889, 890, 3, 100, 50, 0, 890, 891, 5, 79, 0, 0, 891, 143, 1, 0, 0, 0, 892, 893, 5, 80,
    0, 0, 893, 894, 3, 100, 50, 0, 894, 895, 5, 81, 0, 0, 895, 145, 1, 0, 0, 0, 896, 897, 5, 76, 0,
    0, 897, 898, 3, 148, 74, 0, 898, 899, 5, 77, 0, 0, 899, 147, 1, 0, 0, 0, 900, 905, 3, 150, 75,
    0, 901, 902, 5, 83, 0, 0, 902, 904, 3, 150, 75, 0, 903, 901, 1, 0, 0, 0, 904, 907, 1, 0, 0, 0,
    905, 903, 1, 0, 0, 0, 905, 906, 1, 0, 0, 0, 906, 149, 1, 0, 0, 0, 907, 905, 1, 0, 0, 0, 908,
    909, 3, 124, 62, 0, 909, 910, 5, 84, 0, 0, 910, 911, 3, 124, 62, 0, 911, 151, 1, 0, 0, 0, 912,
    913, 3, 84, 42, 0, 913, 915, 5, 80, 0, 0, 914, 916, 3, 92, 46, 0, 915, 914, 1, 0, 0, 0, 915,
    916, 1, 0, 0, 0, 916, 917, 1, 0, 0, 0, 917, 918, 5, 81, 0, 0, 918, 153, 1, 0, 0, 0, 919, 920, 7,
    4, 0, 0, 920, 155, 1, 0, 0, 0, 921, 922, 3, 102, 51, 0, 922, 924, 5, 80, 0, 0, 923, 925, 3, 92,
    46, 0, 924, 923, 1, 0, 0, 0, 924, 925, 1, 0, 0, 0, 925, 926, 1, 0, 0, 0, 926, 927, 5, 81, 0, 0,
    927, 157, 1, 0, 0, 0, 928, 929, 3, 78, 39, 0, 929, 930, 5, 84, 0, 0, 930, 931, 3, 102, 51, 0,
    931, 159, 1, 0, 0, 0, 932, 933, 3, 88, 44, 0, 933, 934, 5, 78, 0, 0, 934, 939, 3, 102, 51, 0,
    935, 936, 5, 83, 0, 0, 936, 938, 3, 102, 51, 0, 937, 935, 1, 0, 0, 0, 938, 941, 1, 0, 0, 0, 939,
    937, 1, 0, 0, 0, 939, 940, 1, 0, 0, 0, 940, 942, 1, 0, 0, 0, 941, 939, 1, 0, 0, 0, 942, 943, 5,
    79, 0, 0, 943, 161, 1, 0, 0, 0, 944, 945, 5, 61, 0, 0, 945, 946, 5, 78, 0, 0, 946, 947, 5, 78,
    0, 0, 947, 952, 3, 102, 51, 0, 948, 949, 5, 83, 0, 0, 949, 951, 3, 102, 51, 0, 950, 948, 1, 0,
    0, 0, 951, 954, 1, 0, 0, 0, 952, 950, 1, 0, 0, 0, 952, 953, 1, 0, 0, 0, 953, 955, 1, 0, 0, 0,
    954, 952, 1, 0, 0, 0, 955, 956, 5, 79, 0, 0, 956, 957, 5, 83, 0, 0, 957, 958, 3, 102, 51, 0,
    958, 959, 5, 79, 0, 0, 959, 163, 1, 0, 0, 0, 960, 961, 5, 55, 0, 0, 961, 962, 5, 78, 0, 0, 962,
    965, 3, 102, 51, 0, 963, 964, 5, 83, 0, 0, 964, 966, 3, 102, 51, 0, 965, 963, 1, 0, 0, 0, 966,
    967, 1, 0, 0, 0, 967, 965, 1, 0, 0, 0, 967, 968, 1, 0, 0, 0, 968, 969, 1, 0, 0, 0, 969, 970, 5,
    79, 0, 0, 970, 165, 1, 0, 0, 0, 971, 972, 5, 9, 0, 0, 972, 973, 3, 96, 48, 0, 973, 974, 5, 84,
    0, 0, 974, 975, 3, 124, 62, 0, 975, 167, 1, 0, 0, 0, 976, 977, 5, 104, 0, 0, 977, 169, 1, 0, 0,
    0, 90, 171, 176, 182, 196, 199, 213, 220, 226, 237, 245, 257, 259, 266, 272, 283, 290, 299, 314,
    322, 332, 334, 341, 349, 359, 361, 383, 386, 391, 397, 406, 415, 427, 436, 438, 445, 454, 461,
    472, 479, 490, 504, 508, 515, 522, 530, 541, 544, 561, 570, 577, 586, 592, 602, 609, 618, 624,
    635, 643, 649, 660, 667, 675, 687, 695, 715, 721, 735, 742, 747, 754, 762, 769, 776, 785, 792,
    817, 826, 834, 846, 853, 855, 860, 865, 876, 905, 915, 924, 939, 952, 967,
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
  public inputStatement(): InputStatementContext | null {
    return this.getRuleContext(0, InputStatementContext);
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

export class InputStatementContext extends antlr.ParserRuleContext {
  public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
    super(parent, invokingState);
  }
  public identifierDef(): IdentifierDefContext {
    return this.getRuleContext(0, IdentifierDefContext)!;
  }
  public EQUAL(): antlr.TerminalNode {
    return this.getToken(PythonParser.EQUAL, 0)!;
  }
  public INPUT(): antlr.TerminalNode {
    return this.getToken(PythonParser.INPUT, 0)!;
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
  public INPUT_ANNOTATION(): antlr.TerminalNode {
    return this.getToken(PythonParser.INPUT_ANNOTATION, 0)!;
  }
  public NL(): antlr.TerminalNode {
    return this.getToken(PythonParser.NL, 0)!;
  }
  public GHOSTED(): antlr.TerminalNode | null {
    return this.getToken(PythonParser.GHOSTED, 0);
  }
  public override get ruleIndex(): number {
    return PythonParser.RULE_inputStatement;
  }
  public override enterRule(listener: PythonListener): void {
    if (listener.enterInputStatement) {
      listener.enterInputStatement(this);
    }
  }
  public override exitRule(listener: PythonListener): void {
    if (listener.exitInputStatement) {
      listener.exitInputStatement(this);
    }
  }
  public override accept<Result>(visitor: PythonVisitor<Result>): Result | null {
    if (visitor.visitInputStatement) {
      return visitor.visitInputStatement(this);
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
  public interpolatedString(): InterpolatedStringContext | null {
    return this.getRuleContext(0, InterpolatedStringContext);
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
