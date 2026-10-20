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
  public static readonly FUNCTION_ANNOTATION = 107;
  public static readonly PROCECDURE_ANNOTATION = 108;
  public static readonly CONSTANT_ANNOTATION = 109;
  public static readonly ENUM_ANNOTATION = 110;
  public static readonly CONCRETE_CLASS_ANNOTATION = 111;
  public static readonly ABSTRACT_CLASS_ANNOTATION = 112;
  public static readonly VARIABLE_ANNOTATION = 113;
  public static readonly ASSIGNMENT_ANNOTATION = 114;
  public static readonly INPUT_ANNOTATION = 115;
  public static readonly CALL_ANNOTATION = 116;
  public static readonly ELSE_IF_ANNOTATION = 117;
  public static readonly PROPERTY_ANNOTATION = 118;
  public static readonly FUNCTION_METHOD_ANNOTATION = 119;
  public static readonly PROCEDURE_METHOD_ANNOTATION = 120;
  public static readonly COMMENT = 121;
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
  public static readonly RULE_variableDefinition = 13;
  public static readonly RULE_assignment = 14;
  public static readonly RULE_ifStatement = 15;
  public static readonly RULE_whileLoop = 16;
  public static readonly RULE_forLoop = 17;
  public static readonly RULE_procedureCall = 18;
  public static readonly RULE_procRef = 19;
  public static readonly RULE_thisProcRef = 20;
  public static readonly RULE_instanceProcRef = 21;
  public static readonly RULE_identifierWithOptIndexes = 22;
  public static readonly RULE_tryStatement = 23;
  public static readonly RULE_throwStatement = 24;
  public static readonly RULE_errorMessage = 25;
  public static readonly RULE_assert = 26;
  public static readonly RULE_returnStatement = 27;
  public static readonly RULE_elseIfClause = 28;
  public static readonly RULE_elseClause = 29;
  public static readonly RULE_catchStatement = 30;
  public static readonly RULE_constructorMember = 31;
  public static readonly RULE_property = 32;
  public static readonly RULE_functionMethod = 33;
  public static readonly RULE_procedureMethod = 34;
  public static readonly RULE_abstractFunction = 35;
  public static readonly RULE_abstractProcedure = 36;
  public static readonly RULE_identifierDef = 37;
  public static readonly RULE_identifierUse = 38;
  public static readonly RULE_assignable = 39;
  public static readonly RULE_methodName = 40;
  public static readonly RULE_testName = 41;
  public static readonly RULE_typeName = 42;
  public static readonly RULE_constantValue = 43;
  public static readonly RULE_argList = 44;
  public static readonly RULE_argument = 45;
  public static readonly RULE_paramList = 46;
  public static readonly RULE_identifierList = 47;
  public static readonly RULE_expressionList = 48;
  public static readonly RULE_type = 49;
  public static readonly RULE_assertActual = 50;
  public static readonly RULE_assertExpected = 51;
  public static readonly RULE_litValue = 52;
  public static readonly RULE_litBoolean = 53;
  public static readonly RULE_litInt = 54;
  public static readonly RULE_litFloat = 55;
  public static readonly RULE_litString = 56;
  public static readonly RULE_enumValue = 57;
  public static readonly RULE_index = 58;
  public static readonly RULE_expression = 59;
  public static readonly RULE_term = 60;
  public static readonly RULE_chainable = 61;
  public static readonly RULE_thisInstance = 62;
  public static readonly RULE_bracketedExpression = 63;
  public static readonly RULE_unaryExpression = 64;
  public static readonly RULE_negateNumeric = 65;
  public static readonly RULE_negateLogical = 66;
  public static readonly RULE_binaryExpression = 67;
  public static readonly RULE_list = 68;
  public static readonly RULE_tuple = 69;
  public static readonly RULE_dictionary = 70;
  public static readonly RULE_kvpList = 71;
  public static readonly RULE_kvp = 72;
  public static readonly RULE_methodCall = 73;
  public static readonly RULE_binaryOperator = 74;
  public static readonly RULE_newInstance = 75;
  public static readonly RULE_paramDef = 76;
  public static readonly RULE_typeGeneric = 77;
  public static readonly RULE_typeFunc = 78;
  public static readonly RULE_typeTuple = 79;
  public static readonly RULE_lambda = 80;
  public static readonly RULE_interpolatedString = 81;

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
        this.state = 165;
        this.errorHandler.sync(this);
        switch (this.interpreter.adaptivePredict(this.tokenStream, 0, this.context)) {
          case 1:
            {
              this.state = 164;
              this.comment();
            }
            break;
        }
        this.state = 170;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (
          _la === 1 ||
          _la === 46 ||
          (((_la - 96) & ~0x1f) === 0 && ((1 << (_la - 96)) & 33555457) !== 0)
        ) {
          {
            {
              this.state = 167;
              this.global();
            }
          }
          this.state = 172;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 176;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (_la === 94) {
          {
            {
              this.state = 173;
              this.match(PythonParser.NL);
            }
          }
          this.state = 178;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 179;
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
      this.state = 190;
      this.errorHandler.sync(this);
      switch (this.interpreter.adaptivePredict(this.tokenStream, 3, this.context)) {
        case 1:
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 181;
            this.main();
          }
          break;
        case 2:
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 182;
            this.function_();
          }
          break;
        case 3:
          this.enterOuterAlt(localContext, 3);
          {
            this.state = 183;
            this.test();
          }
          break;
        case 4:
          this.enterOuterAlt(localContext, 4);
          {
            this.state = 184;
            this.procedure();
          }
          break;
        case 5:
          this.enterOuterAlt(localContext, 5);
          {
            this.state = 185;
            this.constant();
          }
          break;
        case 6:
          this.enterOuterAlt(localContext, 6);
          {
            this.state = 186;
            this.enum_();
          }
          break;
        case 7:
          this.enterOuterAlt(localContext, 7);
          {
            this.state = 187;
            this.concreteClass();
          }
          break;
        case 8:
          this.enterOuterAlt(localContext, 8);
          {
            this.state = 188;
            this.abstractClass();
          }
          break;
        case 9:
          this.enterOuterAlt(localContext, 9);
          {
            this.state = 189;
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
        this.state = 193;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 106) {
          {
            this.state = 192;
            this.match(PythonParser.GHOSTED);
          }
        }

        this.state = 195;
        this.match(PythonParser.DEF);
        this.state = 196;
        this.match(PythonParser.MAIN);
        this.state = 197;
        this.match(PythonParser.OPEN_BRACKET);
        this.state = 198;
        this.match(PythonParser.CLOSE_BRACKET);
        this.state = 199;
        this.match(PythonParser.CLOSE_BRACKET);
        this.state = 200;
        this.match(PythonParser.ARROW);
        this.state = 201;
        this.match(PythonParser.NONE);
        this.state = 202;
        this.match(PythonParser.COLON);
        this.state = 203;
        this.match(PythonParser.NL);
        this.state = 207;
        this.errorHandler.sync(this);
        alternative = this.interpreter.adaptivePredict(this.tokenStream, 5, this.context);
        while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
          if (alternative === 1) {
            {
              {
                this.state = 204;
                this.ordinaryStatement();
              }
            }
          }
          this.state = 209;
          this.errorHandler.sync(this);
          alternative = this.interpreter.adaptivePredict(this.tokenStream, 5, this.context);
        }
        this.state = 210;
        this.match(PythonParser.COMMENT);
        this.state = 211;
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
        this.state = 214;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 106) {
          {
            this.state = 213;
            this.match(PythonParser.GHOSTED);
          }
        }

        this.state = 216;
        this.match(PythonParser.DEF);
        this.state = 217;
        this.methodName();
        this.state = 218;
        this.match(PythonParser.OPEN_BRACKET);
        this.state = 220;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 96) {
          {
            this.state = 219;
            this.paramList();
          }
        }

        this.state = 222;
        this.match(PythonParser.CLOSE_BRACKET);
        this.state = 223;
        this.match(PythonParser.ARROW);
        this.state = 224;
        this.type_();
        this.state = 225;
        this.match(PythonParser.COLON);
        this.state = 226;
        this.match(PythonParser.FUNCTION_ANNOTATION);
        this.state = 227;
        this.match(PythonParser.NL);
        this.state = 231;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (
          ((_la & ~0x1f) === 0 && ((1 << _la) & 12384) !== 0) ||
          _la === 51 ||
          _la === 73 ||
          (((_la - 96) & ~0x1f) === 0 && ((1 << (_la - 96)) & 33555457) !== 0)
        ) {
          {
            {
              this.state = 228;
              this.ordinaryStatement();
            }
          }
          this.state = 233;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 234;
        this.returnStatement();
        this.state = 235;
        this.match(PythonParser.COMMENT);
        this.state = 236;
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
        this.state = 239;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 106) {
          {
            this.state = 238;
            this.match(PythonParser.GHOSTED);
          }
        }

        this.state = 241;
        this.match(PythonParser.CLASS);
        this.state = 242;
        this.testName();
        this.state = 243;
        this.match(PythonParser.OPEN_BRACKET);
        this.state = 244;
        this.match(PythonParser.TESTCASE);
        this.state = 245;
        this.match(PythonParser.CLOSE_BRACKET);
        this.state = 246;
        this.match(PythonParser.COMMENT);
        this.state = 247;
        this.match(PythonParser.NL);
        this.state = 253;
        this.errorHandler.sync(this);
        alternative = this.interpreter.adaptivePredict(this.tokenStream, 11, this.context);
        while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
          if (alternative === 1) {
            {
              this.state = 251;
              this.errorHandler.sync(this);
              switch (this.interpreter.adaptivePredict(this.tokenStream, 10, this.context)) {
                case 1:
                  {
                    this.state = 248;
                    this.assert();
                  }
                  break;
                case 2:
                  {
                    this.state = 249;
                    this.variableDefinition();
                  }
                  break;
                case 3:
                  {
                    this.state = 250;
                    this.comment();
                  }
                  break;
              }
            }
          }
          this.state = 255;
          this.errorHandler.sync(this);
          alternative = this.interpreter.adaptivePredict(this.tokenStream, 11, this.context);
        }
        this.state = 256;
        this.match(PythonParser.COMMENT);
        this.state = 257;
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
        this.state = 260;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 106) {
          {
            this.state = 259;
            this.match(PythonParser.GHOSTED);
          }
        }

        this.state = 262;
        this.match(PythonParser.DEF);
        this.state = 263;
        this.methodName();
        this.state = 264;
        this.match(PythonParser.OPEN_BRACKET);
        this.state = 266;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 96) {
          {
            this.state = 265;
            this.paramList();
          }
        }

        this.state = 268;
        this.match(PythonParser.CLOSE_BRACKET);
        this.state = 269;
        this.match(PythonParser.ARROW);
        this.state = 270;
        this.match(PythonParser.NONE);
        this.state = 271;
        this.match(PythonParser.COLON);
        this.state = 272;
        this.match(PythonParser.PROCECDURE_ANNOTATION);
        this.state = 273;
        this.match(PythonParser.NL);
        this.state = 277;
        this.errorHandler.sync(this);
        alternative = this.interpreter.adaptivePredict(this.tokenStream, 14, this.context);
        while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
          if (alternative === 1) {
            {
              {
                this.state = 274;
                this.ordinaryStatement();
              }
            }
          }
          this.state = 279;
          this.errorHandler.sync(this);
          alternative = this.interpreter.adaptivePredict(this.tokenStream, 14, this.context);
        }
        this.state = 280;
        this.match(PythonParser.COMMENT);
        this.state = 281;
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
        this.state = 284;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 106) {
          {
            this.state = 283;
            this.match(PythonParser.GHOSTED);
          }
        }

        this.state = 286;
        this.identifierDef();
        this.state = 287;
        this.match(PythonParser.EQUAL);
        this.state = 288;
        this.constantValue();
        this.state = 289;
        this.match(PythonParser.CONSTANT_ANNOTATION);
        this.state = 290;
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
        this.state = 293;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 106) {
          {
            this.state = 292;
            this.match(PythonParser.GHOSTED);
          }
        }

        this.state = 295;
        this.match(PythonParser.CLASS);
        this.state = 296;
        this.typeName();
        this.state = 297;
        this.match(PythonParser.OPEN_BRACKET);
        this.state = 298;
        this.match(PythonParser.ENUM);
        this.state = 299;
        this.match(PythonParser.CLOSE_BRACKET);
        this.state = 300;
        this.match(PythonParser.COLON);
        this.state = 301;
        this.match(PythonParser.ENUM_ANNOTATION);
        this.state = 302;
        this.match(PythonParser.NL);
        this.state = 303;
        this.identifierList();
        this.state = 304;
        this.match(PythonParser.NL);
        this.state = 305;
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
        this.state = 308;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 106) {
          {
            this.state = 307;
            this.match(PythonParser.GHOSTED);
          }
        }

        this.state = 310;
        this.match(PythonParser.CLASS);
        this.state = 311;
        this.typeName();
        this.state = 316;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 79) {
          {
            this.state = 312;
            this.match(PythonParser.OPEN_BRACKET);
            this.state = 313;
            this.typeName();
            this.state = 314;
            this.match(PythonParser.CLOSE_BRACKET);
          }
        }

        this.state = 318;
        this.match(PythonParser.COLON);
        this.state = 319;
        this.match(PythonParser.CONCRETE_CLASS_ANNOTATION);
        this.state = 320;
        this.match(PythonParser.NL);
        this.state = 328;
        this.errorHandler.sync(this);
        alternative = this.interpreter.adaptivePredict(this.tokenStream, 20, this.context);
        while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
          if (alternative === 1) {
            {
              this.state = 326;
              this.errorHandler.sync(this);
              switch (this.interpreter.adaptivePredict(this.tokenStream, 19, this.context)) {
                case 1:
                  {
                    this.state = 321;
                    this.constructorMember();
                  }
                  break;
                case 2:
                  {
                    this.state = 322;
                    this.property();
                  }
                  break;
                case 3:
                  {
                    this.state = 323;
                    this.functionMethod();
                  }
                  break;
                case 4:
                  {
                    this.state = 324;
                    this.procedureMethod();
                  }
                  break;
                case 5:
                  {
                    this.state = 325;
                    this.comment();
                  }
                  break;
              }
            }
          }
          this.state = 330;
          this.errorHandler.sync(this);
          alternative = this.interpreter.adaptivePredict(this.tokenStream, 20, this.context);
        }
        this.state = 331;
        this.match(PythonParser.COMMENT);
        this.state = 332;
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
        this.state = 335;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 106) {
          {
            this.state = 334;
            this.match(PythonParser.GHOSTED);
          }
        }

        this.state = 337;
        this.match(PythonParser.CLASS);
        this.state = 338;
        this.typeName();
        this.state = 343;
        this.errorHandler.sync(this);
        switch (this.tokenStream.LA(1)) {
          case PythonParser.OPEN_BRACKET:
            {
              this.state = 339;
              this.match(PythonParser.OPEN_BRACKET);
              this.state = 340;
              this.typeName();
            }
            break;
          case PythonParser.ABC:
            {
              this.state = 341;
              this.match(PythonParser.ABC);
              this.state = 342;
              this.match(PythonParser.CLOSE_BRACKET);
            }
            break;
          default:
            throw new antlr.NoViableAltException(this);
        }
        this.state = 345;
        this.match(PythonParser.ABSTRACT_CLASS_ANNOTATION);
        this.state = 346;
        this.match(PythonParser.NL);
        this.state = 355;
        this.errorHandler.sync(this);
        alternative = this.interpreter.adaptivePredict(this.tokenStream, 24, this.context);
        while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
          if (alternative === 1) {
            {
              this.state = 353;
              this.errorHandler.sync(this);
              switch (this.interpreter.adaptivePredict(this.tokenStream, 23, this.context)) {
                case 1:
                  {
                    this.state = 347;
                    this.property();
                  }
                  break;
                case 2:
                  {
                    this.state = 348;
                    this.functionMethod();
                  }
                  break;
                case 3:
                  {
                    this.state = 349;
                    this.procedureMethod();
                  }
                  break;
                case 4:
                  {
                    this.state = 350;
                    this.abstractFunction();
                  }
                  break;
                case 5:
                  {
                    this.state = 351;
                    this.abstractProcedure();
                  }
                  break;
                case 6:
                  {
                    this.state = 352;
                    this.comment();
                  }
                  break;
              }
            }
          }
          this.state = 357;
          this.errorHandler.sync(this);
          alternative = this.interpreter.adaptivePredict(this.tokenStream, 24, this.context);
        }
        this.state = 358;
        this.match(PythonParser.COMMENT);
        this.state = 359;
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
        this.state = 361;
        this.commentText();
        this.state = 362;
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
        this.state = 364;
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
      this.state = 375;
      this.errorHandler.sync(this);
      switch (this.interpreter.adaptivePredict(this.tokenStream, 25, this.context)) {
        case 1:
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 366;
            this.variableDefinition();
          }
          break;
        case 2:
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 367;
            this.assignment();
          }
          break;
        case 3:
          this.enterOuterAlt(localContext, 3);
          {
            this.state = 368;
            this.ifStatement();
          }
          break;
        case 4:
          this.enterOuterAlt(localContext, 4);
          {
            this.state = 369;
            this.whileLoop();
          }
          break;
        case 5:
          this.enterOuterAlt(localContext, 5);
          {
            this.state = 370;
            this.forLoop();
          }
          break;
        case 6:
          this.enterOuterAlt(localContext, 6);
          {
            this.state = 371;
            this.procedureCall();
          }
          break;
        case 7:
          this.enterOuterAlt(localContext, 7);
          {
            this.state = 372;
            this.tryStatement();
          }
          break;
        case 8:
          this.enterOuterAlt(localContext, 8);
          {
            this.state = 373;
            this.throwStatement();
          }
          break;
        case 9:
          this.enterOuterAlt(localContext, 9);
          {
            this.state = 374;
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
    this.enterRule(localContext, 26, PythonParser.RULE_variableDefinition);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 378;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 106) {
          {
            this.state = 377;
            this.match(PythonParser.GHOSTED);
          }
        }

        this.state = 380;
        this.identifierDef();
        this.state = 381;
        this.match(PythonParser.EQUAL);
        this.state = 382;
        this.expression(0);
        this.state = 383;
        this.match(PythonParser.VARIABLE_ANNOTATION);
        this.state = 384;
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
    this.enterRule(localContext, 28, PythonParser.RULE_assignment);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 387;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 106) {
          {
            this.state = 386;
            this.match(PythonParser.GHOSTED);
          }
        }

        this.state = 389;
        this.assignable(0);
        this.state = 390;
        this.match(PythonParser.EQUAL);
        this.state = 391;
        this.expression(0);
        this.state = 392;
        this.match(PythonParser.ASSIGNMENT_ANNOTATION);
        this.state = 393;
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
    this.enterRule(localContext, 30, PythonParser.RULE_ifStatement);
    let _la: number;
    try {
      let alternative: number;
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 396;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 106) {
          {
            this.state = 395;
            this.match(PythonParser.GHOSTED);
          }
        }

        this.state = 398;
        this.match(PythonParser.IF);
        this.state = 399;
        this.expression(0);
        this.state = 400;
        this.match(PythonParser.COLON);
        this.state = 401;
        this.match(PythonParser.NL);
        this.state = 407;
        this.errorHandler.sync(this);
        alternative = this.interpreter.adaptivePredict(this.tokenStream, 30, this.context);
        while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
          if (alternative === 1) {
            {
              this.state = 405;
              this.errorHandler.sync(this);
              switch (this.interpreter.adaptivePredict(this.tokenStream, 29, this.context)) {
                case 1:
                  {
                    this.state = 402;
                    this.elseIfClause();
                  }
                  break;
                case 2:
                  {
                    this.state = 403;
                    this.elseClause();
                  }
                  break;
                case 3:
                  {
                    this.state = 404;
                    this.ordinaryStatement();
                  }
                  break;
              }
            }
          }
          this.state = 409;
          this.errorHandler.sync(this);
          alternative = this.interpreter.adaptivePredict(this.tokenStream, 30, this.context);
        }
        this.state = 410;
        this.match(PythonParser.COMMENT);
        this.state = 411;
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
    this.enterRule(localContext, 32, PythonParser.RULE_whileLoop);
    let _la: number;
    try {
      let alternative: number;
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 414;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 106) {
          {
            this.state = 413;
            this.match(PythonParser.GHOSTED);
          }
        }

        this.state = 416;
        this.match(PythonParser.WHILE);
        this.state = 417;
        this.expression(0);
        this.state = 418;
        this.match(PythonParser.COLON);
        this.state = 419;
        this.match(PythonParser.NL);
        this.state = 423;
        this.errorHandler.sync(this);
        alternative = this.interpreter.adaptivePredict(this.tokenStream, 32, this.context);
        while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
          if (alternative === 1) {
            {
              {
                this.state = 420;
                this.ordinaryStatement();
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
  public forLoop(): ForLoopContext {
    let localContext = new ForLoopContext(this.context, this.state);
    this.enterRule(localContext, 34, PythonParser.RULE_forLoop);
    let _la: number;
    try {
      let alternative: number;
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 430;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 106) {
          {
            this.state = 429;
            this.match(PythonParser.GHOSTED);
          }
        }

        this.state = 432;
        this.match(PythonParser.FOR);
        this.state = 433;
        this.identifierDef();
        this.state = 434;
        this.match(PythonParser.IN);
        this.state = 435;
        this.expression(0);
        this.state = 436;
        this.match(PythonParser.COLON);
        this.state = 437;
        this.match(PythonParser.NL);
        this.state = 441;
        this.errorHandler.sync(this);
        alternative = this.interpreter.adaptivePredict(this.tokenStream, 34, this.context);
        while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
          if (alternative === 1) {
            {
              {
                this.state = 438;
                this.ordinaryStatement();
              }
            }
          }
          this.state = 443;
          this.errorHandler.sync(this);
          alternative = this.interpreter.adaptivePredict(this.tokenStream, 34, this.context);
        }
        this.state = 444;
        this.match(PythonParser.COMMENT);
        this.state = 445;
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
    this.enterRule(localContext, 36, PythonParser.RULE_procedureCall);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 448;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 106) {
          {
            this.state = 447;
            this.match(PythonParser.GHOSTED);
          }
        }

        this.state = 450;
        this.procRef();
        this.state = 451;
        this.match(PythonParser.OPEN_BRACKET);
        this.state = 452;
        this.argList();
        this.state = 453;
        this.match(PythonParser.CLOSE_BRACKET);
        this.state = 454;
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
    this.enterRule(localContext, 38, PythonParser.RULE_procRef);
    try {
      this.state = 459;
      this.errorHandler.sync(this);
      switch (this.interpreter.adaptivePredict(this.tokenStream, 36, this.context)) {
        case 1:
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 456;
            this.methodName();
          }
          break;
        case 2:
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 457;
            this.thisProcRef();
          }
          break;
        case 3:
          this.enterOuterAlt(localContext, 3);
          {
            this.state = 458;
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
    this.enterRule(localContext, 40, PythonParser.RULE_thisProcRef);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 461;
        this.match(PythonParser.THIS_INSTANCE);
        this.state = 462;
        this.match(PythonParser.DOT);
        this.state = 463;
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
    this.enterRule(localContext, 42, PythonParser.RULE_instanceProcRef);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 465;
        this.identifierWithOptIndexes();
        this.state = 466;
        this.match(PythonParser.DOT);
        this.state = 467;
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
    this.enterRule(localContext, 44, PythonParser.RULE_identifierWithOptIndexes);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 469;
        this.identifierUse();
        this.state = 473;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (_la === 77) {
          {
            {
              this.state = 470;
              this.index();
            }
          }
          this.state = 475;
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
    this.enterRule(localContext, 46, PythonParser.RULE_tryStatement);
    let _la: number;
    try {
      let alternative: number;
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 477;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 106) {
          {
            this.state = 476;
            this.match(PythonParser.GHOSTED);
          }
        }

        this.state = 479;
        this.match(PythonParser.TRY);
        this.state = 480;
        this.match(PythonParser.NL);
        this.state = 484;
        this.errorHandler.sync(this);
        alternative = this.interpreter.adaptivePredict(this.tokenStream, 39, this.context);
        while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
          if (alternative === 1) {
            {
              {
                this.state = 481;
                this.ordinaryStatement();
              }
            }
          }
          this.state = 486;
          this.errorHandler.sync(this);
          alternative = this.interpreter.adaptivePredict(this.tokenStream, 39, this.context);
        }
        this.state = 487;
        this.catchStatement();
        this.state = 491;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (
          ((_la & ~0x1f) === 0 && ((1 << _la) & 12384) !== 0) ||
          _la === 51 ||
          _la === 73 ||
          (((_la - 96) & ~0x1f) === 0 && ((1 << (_la - 96)) & 33555457) !== 0)
        ) {
          {
            {
              this.state = 488;
              this.ordinaryStatement();
            }
          }
          this.state = 493;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 494;
        this.match(PythonParser.END);
        this.state = 495;
        this.match(PythonParser.TRY);
        this.state = 496;
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
    this.enterRule(localContext, 48, PythonParser.RULE_throwStatement);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 499;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 106) {
          {
            this.state = 498;
            this.match(PythonParser.GHOSTED);
          }
        }

        this.state = 501;
        this.match(PythonParser.RAISE);
        this.state = 502;
        this.typeName();
        this.state = 503;
        this.match(PythonParser.OPEN_BRACKET);
        this.state = 504;
        this.errorMessage();
        this.state = 505;
        this.match(PythonParser.CLOSE_BRACKET);
        this.state = 506;
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
    this.enterRule(localContext, 50, PythonParser.RULE_errorMessage);
    try {
      this.state = 510;
      this.errorHandler.sync(this);
      switch (this.tokenStream.LA(1)) {
        case PythonParser.LITERAL_STRING:
        case PythonParser.INTERPOLATED_STRING:
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 508;
            this.litString();
          }
          break;
        case PythonParser.NAME_STARTING_LC:
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 509;
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
    this.enterRule(localContext, 52, PythonParser.RULE_assert);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 513;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 106) {
          {
            this.state = 512;
            this.match(PythonParser.GHOSTED);
          }
        }

        this.state = 515;
        this.match(PythonParser.THIS_INSTANCE);
        this.state = 516;
        this.match(PythonParser.DOT);
        this.state = 517;
        this.match(PythonParser.ASSERT_EQUAL);
        this.state = 518;
        this.match(PythonParser.OPEN_BRACKET);
        this.state = 519;
        this.assertActual();
        this.state = 520;
        this.match(PythonParser.COMMA);
        this.state = 521;
        this.assertExpected();
        this.state = 522;
        this.match(PythonParser.CLOSE_BRACKET);
        this.state = 523;
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
    this.enterRule(localContext, 54, PythonParser.RULE_returnStatement);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 525;
        this.match(PythonParser.RETURN);
        this.state = 526;
        this.expression(0);
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
  public elseIfClause(): ElseIfClauseContext {
    let localContext = new ElseIfClauseContext(this.context, this.state);
    this.enterRule(localContext, 56, PythonParser.RULE_elseIfClause);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 530;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 106) {
          {
            this.state = 529;
            this.match(PythonParser.GHOSTED);
          }
        }

        this.state = 532;
        this.match(PythonParser.ELIF);
        this.state = 533;
        this.expression(0);
        this.state = 534;
        this.match(PythonParser.COLON);
        this.state = 535;
        this.match(PythonParser.ELSE_IF_ANNOTATION);
        this.state = 536;
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
    this.enterRule(localContext, 58, PythonParser.RULE_elseClause);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 539;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 106) {
          {
            this.state = 538;
            this.match(PythonParser.GHOSTED);
          }
        }

        this.state = 541;
        this.match(PythonParser.ELSE);
        this.state = 542;
        this.match(PythonParser.COLON);
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
  public catchStatement(): CatchStatementContext {
    let localContext = new CatchStatementContext(this.context, this.state);
    this.enterRule(localContext, 60, PythonParser.RULE_catchStatement);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 546;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 106) {
          {
            this.state = 545;
            this.match(PythonParser.GHOSTED);
          }
        }

        this.state = 548;
        this.match(PythonParser.EXCEPT);
        this.state = 549;
        this.typeName();
        this.state = 550;
        this.match(PythonParser.AS);
        this.state = 551;
        this.identifierDef();
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
  public constructorMember(): ConstructorMemberContext {
    let localContext = new ConstructorMemberContext(this.context, this.state);
    this.enterRule(localContext, 62, PythonParser.RULE_constructorMember);
    let _la: number;
    try {
      let alternative: number;
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 555;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 106) {
          {
            this.state = 554;
            this.match(PythonParser.GHOSTED);
          }
        }

        this.state = 557;
        this.match(PythonParser.DEF);
        this.state = 558;
        this.match(PythonParser.INIT);
        this.state = 559;
        this.match(PythonParser.OPEN_BRACKET);
        this.state = 561;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 96) {
          {
            this.state = 560;
            this.paramList();
          }
        }

        this.state = 563;
        this.match(PythonParser.CLOSE_BRACKET);
        this.state = 564;
        this.match(PythonParser.ARROW);
        this.state = 565;
        this.match(PythonParser.NONE);
        this.state = 566;
        this.match(PythonParser.COLON);
        this.state = 567;
        this.match(PythonParser.NL);
        this.state = 571;
        this.errorHandler.sync(this);
        alternative = this.interpreter.adaptivePredict(this.tokenStream, 49, this.context);
        while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
          if (alternative === 1) {
            {
              {
                this.state = 568;
                this.ordinaryStatement();
              }
            }
          }
          this.state = 573;
          this.errorHandler.sync(this);
          alternative = this.interpreter.adaptivePredict(this.tokenStream, 49, this.context);
        }
        this.state = 574;
        this.match(PythonParser.COMMENT);
        this.state = 575;
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
    this.enterRule(localContext, 64, PythonParser.RULE_property);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 578;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 106) {
          {
            this.state = 577;
            this.match(PythonParser.GHOSTED);
          }
        }

        this.state = 580;
        this.identifierDef();
        this.state = 581;
        this.match(PythonParser.COLON);
        this.state = 582;
        this.type_();
        this.state = 583;
        this.match(PythonParser.PROPERTY_ANNOTATION);
        this.state = 584;
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
    this.enterRule(localContext, 66, PythonParser.RULE_functionMethod);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 587;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 106) {
          {
            this.state = 586;
            this.match(PythonParser.GHOSTED);
          }
        }

        this.state = 589;
        this.match(PythonParser.DEF);
        this.state = 590;
        this.methodName();
        this.state = 591;
        this.match(PythonParser.OPEN_BRACKET);
        this.state = 593;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 96) {
          {
            this.state = 592;
            this.paramList();
          }
        }

        this.state = 595;
        this.match(PythonParser.CLOSE_BRACKET);
        this.state = 596;
        this.match(PythonParser.ARROW);
        this.state = 597;
        this.type_();
        this.state = 598;
        this.match(PythonParser.COLON);
        this.state = 599;
        this.match(PythonParser.FUNCTION_METHOD_ANNOTATION);
        this.state = 600;
        this.match(PythonParser.NL);
        this.state = 604;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (
          ((_la & ~0x1f) === 0 && ((1 << _la) & 12384) !== 0) ||
          _la === 51 ||
          _la === 73 ||
          (((_la - 96) & ~0x1f) === 0 && ((1 << (_la - 96)) & 33555457) !== 0)
        ) {
          {
            {
              this.state = 601;
              this.ordinaryStatement();
            }
          }
          this.state = 606;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 607;
        this.returnStatement();
        this.state = 608;
        this.match(PythonParser.COMMENT);
        this.state = 609;
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
    this.enterRule(localContext, 68, PythonParser.RULE_procedureMethod);
    let _la: number;
    try {
      let alternative: number;
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 612;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 106) {
          {
            this.state = 611;
            this.match(PythonParser.GHOSTED);
          }
        }

        this.state = 614;
        this.match(PythonParser.DEF);
        this.state = 615;
        this.methodName();
        this.state = 616;
        this.match(PythonParser.OPEN_BRACKET);
        this.state = 618;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 96) {
          {
            this.state = 617;
            this.paramList();
          }
        }

        this.state = 620;
        this.match(PythonParser.CLOSE_BRACKET);
        this.state = 621;
        this.match(PythonParser.ARROW);
        this.state = 622;
        this.match(PythonParser.NONE);
        this.state = 623;
        this.match(PythonParser.COLON);
        this.state = 624;
        this.match(PythonParser.PROCEDURE_METHOD_ANNOTATION);
        this.state = 625;
        this.match(PythonParser.NL);
        this.state = 629;
        this.errorHandler.sync(this);
        alternative = this.interpreter.adaptivePredict(this.tokenStream, 56, this.context);
        while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
          if (alternative === 1) {
            {
              {
                this.state = 626;
                this.ordinaryStatement();
              }
            }
          }
          this.state = 631;
          this.errorHandler.sync(this);
          alternative = this.interpreter.adaptivePredict(this.tokenStream, 56, this.context);
        }
        this.state = 632;
        this.match(PythonParser.COMMENT);
        this.state = 633;
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
    this.enterRule(localContext, 70, PythonParser.RULE_abstractFunction);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 636;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 106) {
          {
            this.state = 635;
            this.match(PythonParser.GHOSTED);
          }
        }

        this.state = 638;
        this.match(PythonParser.ABSTRACT_METHOD);
        this.state = 639;
        this.match(PythonParser.NL);
        this.state = 640;
        this.match(PythonParser.DEF);
        this.state = 641;
        this.methodName();
        this.state = 642;
        this.match(PythonParser.OPEN_BRACKET);
        this.state = 644;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 96) {
          {
            this.state = 643;
            this.paramList();
          }
        }

        this.state = 646;
        this.match(PythonParser.CLOSE_BRACKET);
        this.state = 647;
        this.match(PythonParser.ARROW);
        this.state = 648;
        this.type_();
        this.state = 649;
        this.match(PythonParser.COLON);
        this.state = 650;
        this.match(PythonParser.NL);
        this.state = 651;
        this.match(PythonParser.PASS);
        this.state = 652;
        this.match(PythonParser.COMMENT);
        this.state = 653;
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
    this.enterRule(localContext, 72, PythonParser.RULE_abstractProcedure);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 656;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 106) {
          {
            this.state = 655;
            this.match(PythonParser.GHOSTED);
          }
        }

        this.state = 658;
        this.match(PythonParser.ABSTRACT_METHOD);
        this.state = 659;
        this.match(PythonParser.NL);
        this.state = 660;
        this.match(PythonParser.DEF);
        this.state = 661;
        this.methodName();
        this.state = 662;
        this.match(PythonParser.OPEN_BRACKET);
        this.state = 664;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 96) {
          {
            this.state = 663;
            this.paramList();
          }
        }

        this.state = 666;
        this.match(PythonParser.CLOSE_BRACKET);
        this.state = 667;
        this.match(PythonParser.ARROW);
        this.state = 668;
        this.match(PythonParser.NONE);
        this.state = 669;
        this.match(PythonParser.COLON);
        this.state = 670;
        this.match(PythonParser.NL);
        this.state = 671;
        this.match(PythonParser.PASS);
        this.state = 672;
        this.match(PythonParser.COMMENT);
        this.state = 673;
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
    this.enterRule(localContext, 74, PythonParser.RULE_identifierDef);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 675;
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
    this.enterRule(localContext, 76, PythonParser.RULE_identifierUse);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 677;
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
    let _startState = 78;
    this.enterRecursionRule(localContext, 78, PythonParser.RULE_assignable, _p);
    try {
      let alternative: number;
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 684;
        this.errorHandler.sync(this);
        switch (this.tokenStream.LA(1)) {
          case PythonParser.NAME_STARTING_LC:
            {
              this.state = 680;
              this.identifierUse();
            }
            break;
          case PythonParser.THIS_INSTANCE:
            {
              this.state = 681;
              this.match(PythonParser.THIS_INSTANCE);
              this.state = 682;
              this.match(PythonParser.DOT);
              this.state = 683;
              this.identifierUse();
            }
            break;
          default:
            throw new antlr.NoViableAltException(this);
        }
        this.context!.stop = this.tokenStream.LT(-1);
        this.state = 690;
        this.errorHandler.sync(this);
        alternative = this.interpreter.adaptivePredict(this.tokenStream, 62, this.context);
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
                this.state = 686;
                if (!this.precpred(this.context, 1)) {
                  throw this.createFailedPredicateException("this.precpred(this.context, 1)");
                }
                this.state = 687;
                this.index();
              }
            }
          }
          this.state = 692;
          this.errorHandler.sync(this);
          alternative = this.interpreter.adaptivePredict(this.tokenStream, 62, this.context);
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
    this.enterRule(localContext, 80, PythonParser.RULE_methodName);
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
  public testName(): TestNameContext {
    let localContext = new TestNameContext(this.context, this.state);
    this.enterRule(localContext, 82, PythonParser.RULE_testName);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 695;
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
    this.enterRule(localContext, 84, PythonParser.RULE_typeName);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 697;
        _la = this.tokenStream.LA(1);
        if (!((((_la - 55) & ~0x1f) === 0 && ((1 << (_la - 55)) & 31) !== 0) || _la === 97)) {
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
    this.enterRule(localContext, 86, PythonParser.RULE_constantValue);
    try {
      this.state = 703;
      this.errorHandler.sync(this);
      switch (this.tokenStream.LA(1)) {
        case PythonParser.TRUE:
        case PythonParser.FALSE:
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 699;
            this.litBoolean();
          }
          break;
        case PythonParser.LITERAL_BINARY:
        case PythonParser.LITERAL_HEX:
        case PythonParser.LITERAL_INTEGER:
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 700;
            this.litInt();
          }
          break;
        case PythonParser.LITERAL_FLOAT:
          this.enterOuterAlt(localContext, 3);
          {
            this.state = 701;
            this.litFloat();
          }
          break;
        case PythonParser.LITERAL_STRING:
        case PythonParser.INTERPOLATED_STRING:
          this.enterOuterAlt(localContext, 4);
          {
            this.state = 702;
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
    this.enterRule(localContext, 88, PythonParser.RULE_argList);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 705;
        this.argument();
        this.state = 710;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (_la === 82) {
          {
            {
              this.state = 706;
              this.match(PythonParser.COMMA);
              this.state = 707;
              this.argument();
            }
          }
          this.state = 712;
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
    this.enterRule(localContext, 90, PythonParser.RULE_argument);
    try {
      this.state = 715;
      this.errorHandler.sync(this);
      switch (this.tokenStream.LA(1)) {
        case PythonParser.LAMBDA:
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 713;
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
            this.state = 714;
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
    this.enterRule(localContext, 92, PythonParser.RULE_paramList);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 717;
        this.paramDef();
        this.state = 722;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (_la === 82) {
          {
            {
              this.state = 718;
              this.match(PythonParser.COMMA);
              this.state = 719;
              this.paramDef();
            }
          }
          this.state = 724;
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
    this.enterRule(localContext, 94, PythonParser.RULE_identifierList);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 725;
        this.identifierDef();
        this.state = 728;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        do {
          {
            {
              this.state = 726;
              this.match(PythonParser.COMMA);
              this.state = 727;
              this.identifierDef();
            }
          }
          this.state = 730;
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
    this.enterRule(localContext, 96, PythonParser.RULE_expressionList);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 732;
        this.expression(0);
        this.state = 737;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (_la === 82) {
          {
            {
              this.state = 733;
              this.match(PythonParser.COMMA);
              this.state = 734;
              this.expression(0);
            }
          }
          this.state = 739;
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
    this.enterRule(localContext, 98, PythonParser.RULE_type);
    try {
      this.state = 744;
      this.errorHandler.sync(this);
      switch (this.interpreter.adaptivePredict(this.tokenStream, 69, this.context)) {
        case 1:
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 740;
            this.typeTuple();
          }
          break;
        case 2:
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 741;
            this.typeName();
          }
          break;
        case 3:
          this.enterOuterAlt(localContext, 3);
          {
            this.state = 742;
            this.typeGeneric();
          }
          break;
        case 4:
          this.enterOuterAlt(localContext, 4);
          {
            this.state = 743;
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
    this.enterRule(localContext, 100, PythonParser.RULE_assertActual);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 746;
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
    this.enterRule(localContext, 102, PythonParser.RULE_assertExpected);
    try {
      this.state = 753;
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
            this.state = 748;
            this.litValue();
          }
          break;
        case PythonParser.OPEN_SQ_BRACKET:
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 749;
            this.list();
          }
          break;
        case PythonParser.OPEN_BRACE:
          this.enterOuterAlt(localContext, 3);
          {
            this.state = 750;
            this.dictionary();
          }
          break;
        case PythonParser.NOT:
        case PythonParser.MINUS:
          this.enterOuterAlt(localContext, 4);
          {
            this.state = 751;
            this.unaryExpression();
          }
          break;
        case PythonParser.OPEN_BRACKET:
          this.enterOuterAlt(localContext, 5);
          {
            this.state = 752;
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
    this.enterRule(localContext, 104, PythonParser.RULE_litValue);
    try {
      this.state = 761;
      this.errorHandler.sync(this);
      switch (this.interpreter.adaptivePredict(this.tokenStream, 71, this.context)) {
        case 1:
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 755;
            this.litBoolean();
          }
          break;
        case 2:
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 756;
            this.litInt();
          }
          break;
        case 3:
          this.enterOuterAlt(localContext, 3);
          {
            this.state = 757;
            this.litFloat();
          }
          break;
        case 4:
          this.enterOuterAlt(localContext, 4);
          {
            this.state = 758;
            this.litString();
          }
          break;
        case 5:
          this.enterOuterAlt(localContext, 5);
          {
            this.state = 759;
            this.interpolatedString();
          }
          break;
        case 6:
          this.enterOuterAlt(localContext, 6);
          {
            this.state = 760;
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
    this.enterRule(localContext, 106, PythonParser.RULE_litBoolean);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 763;
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
    this.enterRule(localContext, 108, PythonParser.RULE_litInt);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 765;
        _la = this.tokenStream.LA(1);
        if (!(((_la - 98) & ~0x1f) === 0 && ((1 << (_la - 98)) & 7) !== 0)) {
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
    this.enterRule(localContext, 110, PythonParser.RULE_litFloat);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 767;
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
    this.enterRule(localContext, 112, PythonParser.RULE_litString);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 769;
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
    this.enterRule(localContext, 114, PythonParser.RULE_enumValue);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 771;
        this.typeName();
        this.state = 772;
        this.match(PythonParser.DOT);
        this.state = 773;
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
    this.enterRule(localContext, 116, PythonParser.RULE_index);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 775;
        this.match(PythonParser.OPEN_SQ_BRACKET);
        this.state = 776;
        this.expression(0);
        this.state = 777;
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
    let _startState = 118;
    this.enterRecursionRule(localContext, 118, PythonParser.RULE_expression, _p);
    let _la: number;
    try {
      let alternative: number;
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 784;
        this.errorHandler.sync(this);
        switch (this.interpreter.adaptivePredict(this.tokenStream, 72, this.context)) {
          case 1:
            {
              this.state = 780;
              this.newInstance();
            }
            break;
          case 2:
            {
              this.state = 781;
              this.unaryExpression();
            }
            break;
          case 3:
            {
              this.state = 782;
              this.term(0);
            }
            break;
          case 4:
            {
              this.state = 783;
              this.binaryExpression();
            }
            break;
        }
        this.context!.stop = this.tokenStream.LT(-1);
        this.state = 801;
        this.errorHandler.sync(this);
        alternative = this.interpreter.adaptivePredict(this.tokenStream, 74, this.context);
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
                this.state = 786;
                if (!this.precpred(this.context, 1)) {
                  throw this.createFailedPredicateException("this.precpred(this.context, 1)");
                }
                this.state = 787;
                this.match(PythonParser.IF);
                this.state = 788;
                this.expression(0);
                this.state = 793;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 2) {
                  {
                    {
                      this.state = 789;
                      this.match(PythonParser.ELIF);
                      this.state = 790;
                      this.expression(0);
                    }
                  }
                  this.state = 795;
                  this.errorHandler.sync(this);
                  _la = this.tokenStream.LA(1);
                }
                this.state = 796;
                this.match(PythonParser.ELSE);
                this.state = 797;
                this.expression(2);
              }
            }
          }
          this.state = 803;
          this.errorHandler.sync(this);
          alternative = this.interpreter.adaptivePredict(this.tokenStream, 74, this.context);
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
    let _startState = 120;
    this.enterRecursionRule(localContext, 120, PythonParser.RULE_term, _p);
    try {
      let alternative: number;
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 813;
        this.errorHandler.sync(this);
        switch (this.interpreter.adaptivePredict(this.tokenStream, 75, this.context)) {
          case 1:
            {
              this.state = 805;
              this.thisInstance();
            }
            break;
          case 2:
            {
              this.state = 806;
              this.bracketedExpression();
            }
            break;
          case 3:
            {
              this.state = 807;
              this.litValue();
            }
            break;
          case 4:
            {
              this.state = 808;
              this.list();
            }
            break;
          case 5:
            {
              this.state = 809;
              this.dictionary();
            }
            break;
          case 6:
            {
              this.state = 810;
              this.tuple();
            }
            break;
          case 7:
            {
              this.state = 811;
              this.identifierUse();
            }
            break;
          case 8:
            {
              this.state = 812;
              this.methodCall();
            }
            break;
        }
        this.context!.stop = this.tokenStream.LT(-1);
        this.state = 822;
        this.errorHandler.sync(this);
        alternative = this.interpreter.adaptivePredict(this.tokenStream, 77, this.context);
        while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
          if (alternative === 1) {
            if (this.parseListeners != null) {
              this.triggerExitRuleEvent();
            }
            previousContext = localContext;
            {
              this.state = 820;
              this.errorHandler.sync(this);
              switch (this.interpreter.adaptivePredict(this.tokenStream, 76, this.context)) {
                case 1:
                  {
                    localContext = new TermContext(parentContext, parentState);
                    this.pushNewRecursionContext(localContext, _startState, PythonParser.RULE_term);
                    this.state = 815;
                    if (!this.precpred(this.context, 2)) {
                      throw this.createFailedPredicateException("this.precpred(this.context, 2)");
                    }
                    this.state = 816;
                    this.index();
                  }
                  break;
                case 2:
                  {
                    localContext = new TermContext(parentContext, parentState);
                    this.pushNewRecursionContext(localContext, _startState, PythonParser.RULE_term);
                    this.state = 817;
                    if (!this.precpred(this.context, 1)) {
                      throw this.createFailedPredicateException("this.precpred(this.context, 1)");
                    }
                    this.state = 818;
                    this.match(PythonParser.DOT);
                    this.state = 819;
                    this.chainable();
                  }
                  break;
              }
            }
          }
          this.state = 824;
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
  public chainable(): ChainableContext {
    let localContext = new ChainableContext(this.context, this.state);
    this.enterRule(localContext, 122, PythonParser.RULE_chainable);
    try {
      let alternative: number;
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 827;
        this.errorHandler.sync(this);
        switch (this.interpreter.adaptivePredict(this.tokenStream, 78, this.context)) {
          case 1:
            {
              this.state = 825;
              this.identifierUse();
            }
            break;
          case 2:
            {
              this.state = 826;
              this.methodCall();
            }
            break;
        }
        this.state = 832;
        this.errorHandler.sync(this);
        alternative = this.interpreter.adaptivePredict(this.tokenStream, 79, this.context);
        while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
          if (alternative === 1) {
            {
              {
                this.state = 829;
                this.index();
              }
            }
          }
          this.state = 834;
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
      this.exitRule();
    }
    return localContext;
  }
  public thisInstance(): ThisInstanceContext {
    let localContext = new ThisInstanceContext(this.context, this.state);
    this.enterRule(localContext, 124, PythonParser.RULE_thisInstance);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 835;
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
    this.enterRule(localContext, 126, PythonParser.RULE_bracketedExpression);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 837;
        this.match(PythonParser.OPEN_BRACKET);
        this.state = 838;
        this.expression(0);
        this.state = 839;
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
    this.enterRule(localContext, 128, PythonParser.RULE_unaryExpression);
    try {
      this.state = 843;
      this.errorHandler.sync(this);
      switch (this.tokenStream.LA(1)) {
        case PythonParser.MINUS:
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 841;
            this.negateNumeric();
          }
          break;
        case PythonParser.NOT:
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 842;
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
    this.enterRule(localContext, 130, PythonParser.RULE_negateNumeric);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 845;
        this.match(PythonParser.MINUS);
        this.state = 846;
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
    this.enterRule(localContext, 132, PythonParser.RULE_negateLogical);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 848;
        this.match(PythonParser.NOT);
        this.state = 849;
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
    this.enterRule(localContext, 134, PythonParser.RULE_binaryExpression);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 851;
        localContext._left = this.term(0);
        this.state = 852;
        this.binaryOperator();
        this.state = 853;
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
    this.enterRule(localContext, 136, PythonParser.RULE_list);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 855;
        this.match(PythonParser.OPEN_SQ_BRACKET);
        this.state = 856;
        this.expressionList();
        this.state = 857;
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
    this.enterRule(localContext, 138, PythonParser.RULE_tuple);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 859;
        this.match(PythonParser.OPEN_BRACKET);
        this.state = 860;
        this.expressionList();
        this.state = 861;
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
    this.enterRule(localContext, 140, PythonParser.RULE_dictionary);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 863;
        this.match(PythonParser.OPEN_BRACE);
        this.state = 864;
        this.kvpList();
        this.state = 865;
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
    this.enterRule(localContext, 142, PythonParser.RULE_kvpList);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 867;
        this.kvp();
        this.state = 872;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (_la === 82) {
          {
            {
              this.state = 868;
              this.match(PythonParser.COMMA);
              this.state = 869;
              this.kvp();
            }
          }
          this.state = 874;
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
    this.enterRule(localContext, 144, PythonParser.RULE_kvp);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 875;
        this.expression(0);
        this.state = 876;
        this.match(PythonParser.COLON);
        this.state = 877;
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
    this.enterRule(localContext, 146, PythonParser.RULE_methodCall);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 879;
        this.methodName();
        this.state = 880;
        this.match(PythonParser.OPEN_BRACKET);
        this.state = 882;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (
          _la === 9 ||
          (((_la - 54) & ~0x1f) === 0 && ((1 << (_la - 54)) & 2192050687) !== 0) ||
          (((_la - 96) & ~0x1f) === 0 && ((1 << (_la - 96)) & 255) !== 0)
        ) {
          {
            this.state = 881;
            this.argList();
          }
        }

        this.state = 884;
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
    this.enterRule(localContext, 148, PythonParser.RULE_binaryOperator);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 886;
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
    this.enterRule(localContext, 150, PythonParser.RULE_newInstance);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 888;
        this.type_();
        this.state = 889;
        this.match(PythonParser.OPEN_BRACKET);
        this.state = 891;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (
          _la === 9 ||
          (((_la - 54) & ~0x1f) === 0 && ((1 << (_la - 54)) & 2192050687) !== 0) ||
          (((_la - 96) & ~0x1f) === 0 && ((1 << (_la - 96)) & 255) !== 0)
        ) {
          {
            this.state = 890;
            this.argList();
          }
        }

        this.state = 893;
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
    this.enterRule(localContext, 152, PythonParser.RULE_paramDef);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 895;
        this.identifierDef();
        this.state = 896;
        this.match(PythonParser.COLON);
        this.state = 897;
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
    this.enterRule(localContext, 154, PythonParser.RULE_typeGeneric);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 899;
        this.typeName();
        this.state = 900;
        this.match(PythonParser.OPEN_SQ_BRACKET);
        this.state = 901;
        this.type_();
        this.state = 906;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (_la === 82) {
          {
            {
              this.state = 902;
              this.match(PythonParser.COMMA);
              this.state = 903;
              this.type_();
            }
          }
          this.state = 908;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 909;
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
    this.enterRule(localContext, 156, PythonParser.RULE_typeFunc);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 911;
        this.match(PythonParser.FUNC_NAME);
        this.state = 912;
        this.match(PythonParser.OPEN_SQ_BRACKET);
        this.state = 913;
        this.match(PythonParser.OPEN_SQ_BRACKET);
        this.state = 914;
        this.type_();
        this.state = 919;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (_la === 82) {
          {
            {
              this.state = 915;
              this.match(PythonParser.COMMA);
              this.state = 916;
              this.type_();
            }
          }
          this.state = 921;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 922;
        this.match(PythonParser.CLOSE_SQ_BRACKET);
        this.state = 923;
        this.match(PythonParser.COMMA);
        this.state = 924;
        this.type_();
        this.state = 925;
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
    this.enterRule(localContext, 158, PythonParser.RULE_typeTuple);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 927;
        this.match(PythonParser.TUPLE);
        this.state = 928;
        this.match(PythonParser.OPEN_SQ_BRACKET);
        this.state = 929;
        this.type_();
        this.state = 932;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        do {
          {
            {
              this.state = 930;
              this.match(PythonParser.COMMA);
              this.state = 931;
              this.type_();
            }
          }
          this.state = 934;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        } while (_la === 82);
        this.state = 936;
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
    this.enterRule(localContext, 160, PythonParser.RULE_lambda);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 938;
        this.match(PythonParser.LAMBDA);
        this.state = 939;
        this.paramList();
        this.state = 940;
        this.match(PythonParser.COLON);
        this.state = 941;
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
    this.enterRule(localContext, 162, PythonParser.RULE_interpolatedString);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 943;
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
      case 39:
        return this.assignable_sempred(localContext as AssignableContext, predIndex);
      case 59:
        return this.expression_sempred(localContext as ExpressionContext, predIndex);
      case 60:
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
    4, 1, 121, 946, 2, 0, 7, 0, 2, 1, 7, 1, 2, 2, 7, 2, 2, 3, 7, 3, 2, 4, 7, 4, 2, 5, 7, 5, 2, 6, 7,
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
    7, 81, 1, 0, 3, 0, 166, 8, 0, 1, 0, 5, 0, 169, 8, 0, 10, 0, 12, 0, 172, 9, 0, 1, 0, 5, 0, 175,
    8, 0, 10, 0, 12, 0, 178, 9, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    3, 1, 191, 8, 1, 1, 2, 3, 2, 194, 8, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1,
    2, 5, 2, 206, 8, 2, 10, 2, 12, 2, 209, 9, 2, 1, 2, 1, 2, 1, 2, 1, 3, 3, 3, 215, 8, 3, 1, 3, 1,
    3, 1, 3, 1, 3, 3, 3, 221, 8, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 5, 3, 230, 8, 3, 10,
    3, 12, 3, 233, 9, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 4, 3, 4, 240, 8, 4, 1, 4, 1, 4, 1, 4, 1, 4, 1,
    4, 1, 4, 1, 4, 1, 4, 1, 4, 1, 4, 5, 4, 252, 8, 4, 10, 4, 12, 4, 255, 9, 4, 1, 4, 1, 4, 1, 4, 1,
    5, 3, 5, 261, 8, 5, 1, 5, 1, 5, 1, 5, 1, 5, 3, 5, 267, 8, 5, 1, 5, 1, 5, 1, 5, 1, 5, 1, 5, 1, 5,
    1, 5, 5, 5, 276, 8, 5, 10, 5, 12, 5, 279, 9, 5, 1, 5, 1, 5, 1, 5, 1, 6, 3, 6, 285, 8, 6, 1, 6,
    1, 6, 1, 6, 1, 6, 1, 6, 1, 6, 1, 7, 3, 7, 294, 8, 7, 1, 7, 1, 7, 1, 7, 1, 7, 1, 7, 1, 7, 1, 7,
    1, 7, 1, 7, 1, 7, 1, 7, 1, 7, 1, 8, 3, 8, 309, 8, 8, 1, 8, 1, 8, 1, 8, 1, 8, 1, 8, 1, 8, 3, 8,
    317, 8, 8, 1, 8, 1, 8, 1, 8, 1, 8, 1, 8, 1, 8, 1, 8, 1, 8, 5, 8, 327, 8, 8, 10, 8, 12, 8, 330,
    9, 8, 1, 8, 1, 8, 1, 8, 1, 9, 3, 9, 336, 8, 9, 1, 9, 1, 9, 1, 9, 1, 9, 1, 9, 1, 9, 3, 9, 344, 8,
    9, 1, 9, 1, 9, 1, 9, 1, 9, 1, 9, 1, 9, 1, 9, 1, 9, 5, 9, 354, 8, 9, 10, 9, 12, 9, 357, 9, 9, 1,
    9, 1, 9, 1, 9, 1, 10, 1, 10, 1, 10, 1, 11, 1, 11, 1, 12, 1, 12, 1, 12, 1, 12, 1, 12, 1, 12, 1,
    12, 1, 12, 1, 12, 3, 12, 376, 8, 12, 1, 13, 3, 13, 379, 8, 13, 1, 13, 1, 13, 1, 13, 1, 13, 1,
    13, 1, 13, 1, 14, 3, 14, 388, 8, 14, 1, 14, 1, 14, 1, 14, 1, 14, 1, 14, 1, 14, 1, 15, 3, 15,
    397, 8, 15, 1, 15, 1, 15, 1, 15, 1, 15, 1, 15, 1, 15, 1, 15, 5, 15, 406, 8, 15, 10, 15, 12, 15,
    409, 9, 15, 1, 15, 1, 15, 1, 15, 1, 16, 3, 16, 415, 8, 16, 1, 16, 1, 16, 1, 16, 1, 16, 1, 16, 5,
    16, 422, 8, 16, 10, 16, 12, 16, 425, 9, 16, 1, 16, 1, 16, 1, 16, 1, 17, 3, 17, 431, 8, 17, 1,
    17, 1, 17, 1, 17, 1, 17, 1, 17, 1, 17, 1, 17, 5, 17, 440, 8, 17, 10, 17, 12, 17, 443, 9, 17, 1,
    17, 1, 17, 1, 17, 1, 18, 3, 18, 449, 8, 18, 1, 18, 1, 18, 1, 18, 1, 18, 1, 18, 1, 18, 1, 19, 1,
    19, 1, 19, 3, 19, 460, 8, 19, 1, 20, 1, 20, 1, 20, 1, 20, 1, 21, 1, 21, 1, 21, 1, 21, 1, 22, 1,
    22, 5, 22, 472, 8, 22, 10, 22, 12, 22, 475, 9, 22, 1, 23, 3, 23, 478, 8, 23, 1, 23, 1, 23, 1,
    23, 5, 23, 483, 8, 23, 10, 23, 12, 23, 486, 9, 23, 1, 23, 1, 23, 5, 23, 490, 8, 23, 10, 23, 12,
    23, 493, 9, 23, 1, 23, 1, 23, 1, 23, 1, 23, 1, 24, 3, 24, 500, 8, 24, 1, 24, 1, 24, 1, 24, 1,
    24, 1, 24, 1, 24, 1, 24, 1, 25, 1, 25, 3, 25, 511, 8, 25, 1, 26, 3, 26, 514, 8, 26, 1, 26, 1,
    26, 1, 26, 1, 26, 1, 26, 1, 26, 1, 26, 1, 26, 1, 26, 1, 26, 1, 27, 1, 27, 1, 27, 1, 27, 1, 28,
    3, 28, 531, 8, 28, 1, 28, 1, 28, 1, 28, 1, 28, 1, 28, 1, 28, 1, 29, 3, 29, 540, 8, 29, 1, 29, 1,
    29, 1, 29, 1, 29, 1, 30, 3, 30, 547, 8, 30, 1, 30, 1, 30, 1, 30, 1, 30, 1, 30, 1, 30, 1, 31, 3,
    31, 556, 8, 31, 1, 31, 1, 31, 1, 31, 1, 31, 3, 31, 562, 8, 31, 1, 31, 1, 31, 1, 31, 1, 31, 1,
    31, 1, 31, 5, 31, 570, 8, 31, 10, 31, 12, 31, 573, 9, 31, 1, 31, 1, 31, 1, 31, 1, 32, 3, 32,
    579, 8, 32, 1, 32, 1, 32, 1, 32, 1, 32, 1, 32, 1, 32, 1, 33, 3, 33, 588, 8, 33, 1, 33, 1, 33, 1,
    33, 1, 33, 3, 33, 594, 8, 33, 1, 33, 1, 33, 1, 33, 1, 33, 1, 33, 1, 33, 1, 33, 5, 33, 603, 8,
    33, 10, 33, 12, 33, 606, 9, 33, 1, 33, 1, 33, 1, 33, 1, 33, 1, 34, 3, 34, 613, 8, 34, 1, 34, 1,
    34, 1, 34, 1, 34, 3, 34, 619, 8, 34, 1, 34, 1, 34, 1, 34, 1, 34, 1, 34, 1, 34, 1, 34, 5, 34,
    628, 8, 34, 10, 34, 12, 34, 631, 9, 34, 1, 34, 1, 34, 1, 34, 1, 35, 3, 35, 637, 8, 35, 1, 35, 1,
    35, 1, 35, 1, 35, 1, 35, 1, 35, 3, 35, 645, 8, 35, 1, 35, 1, 35, 1, 35, 1, 35, 1, 35, 1, 35, 1,
    35, 1, 35, 1, 35, 1, 36, 3, 36, 657, 8, 36, 1, 36, 1, 36, 1, 36, 1, 36, 1, 36, 1, 36, 3, 36,
    665, 8, 36, 1, 36, 1, 36, 1, 36, 1, 36, 1, 36, 1, 36, 1, 36, 1, 36, 1, 36, 1, 37, 1, 37, 1, 38,
    1, 38, 1, 39, 1, 39, 1, 39, 1, 39, 1, 39, 3, 39, 685, 8, 39, 1, 39, 1, 39, 5, 39, 689, 8, 39,
    10, 39, 12, 39, 692, 9, 39, 1, 40, 1, 40, 1, 41, 1, 41, 1, 42, 1, 42, 1, 43, 1, 43, 1, 43, 1,
    43, 3, 43, 704, 8, 43, 1, 44, 1, 44, 1, 44, 5, 44, 709, 8, 44, 10, 44, 12, 44, 712, 9, 44, 1,
    45, 1, 45, 3, 45, 716, 8, 45, 1, 46, 1, 46, 1, 46, 5, 46, 721, 8, 46, 10, 46, 12, 46, 724, 9,
    46, 1, 47, 1, 47, 1, 47, 4, 47, 729, 8, 47, 11, 47, 12, 47, 730, 1, 48, 1, 48, 1, 48, 5, 48,
    736, 8, 48, 10, 48, 12, 48, 739, 9, 48, 1, 49, 1, 49, 1, 49, 1, 49, 3, 49, 745, 8, 49, 1, 50, 1,
    50, 1, 51, 1, 51, 1, 51, 1, 51, 1, 51, 3, 51, 754, 8, 51, 1, 52, 1, 52, 1, 52, 1, 52, 1, 52, 1,
    52, 3, 52, 762, 8, 52, 1, 53, 1, 53, 1, 54, 1, 54, 1, 55, 1, 55, 1, 56, 1, 56, 1, 57, 1, 57, 1,
    57, 1, 57, 1, 58, 1, 58, 1, 58, 1, 58, 1, 59, 1, 59, 1, 59, 1, 59, 1, 59, 3, 59, 785, 8, 59, 1,
    59, 1, 59, 1, 59, 1, 59, 1, 59, 5, 59, 792, 8, 59, 10, 59, 12, 59, 795, 9, 59, 1, 59, 1, 59, 1,
    59, 5, 59, 800, 8, 59, 10, 59, 12, 59, 803, 9, 59, 1, 60, 1, 60, 1, 60, 1, 60, 1, 60, 1, 60, 1,
    60, 1, 60, 1, 60, 3, 60, 814, 8, 60, 1, 60, 1, 60, 1, 60, 1, 60, 1, 60, 5, 60, 821, 8, 60, 10,
    60, 12, 60, 824, 9, 60, 1, 61, 1, 61, 3, 61, 828, 8, 61, 1, 61, 5, 61, 831, 8, 61, 10, 61, 12,
    61, 834, 9, 61, 1, 62, 1, 62, 1, 63, 1, 63, 1, 63, 1, 63, 1, 64, 1, 64, 3, 64, 844, 8, 64, 1,
    65, 1, 65, 1, 65, 1, 66, 1, 66, 1, 66, 1, 67, 1, 67, 1, 67, 1, 67, 1, 68, 1, 68, 1, 68, 1, 68,
    1, 69, 1, 69, 1, 69, 1, 69, 1, 70, 1, 70, 1, 70, 1, 70, 1, 71, 1, 71, 1, 71, 5, 71, 871, 8, 71,
    10, 71, 12, 71, 874, 9, 71, 1, 72, 1, 72, 1, 72, 1, 72, 1, 73, 1, 73, 1, 73, 3, 73, 883, 8, 73,
    1, 73, 1, 73, 1, 74, 1, 74, 1, 75, 1, 75, 1, 75, 3, 75, 892, 8, 75, 1, 75, 1, 75, 1, 76, 1, 76,
    1, 76, 1, 76, 1, 77, 1, 77, 1, 77, 1, 77, 1, 77, 5, 77, 905, 8, 77, 10, 77, 12, 77, 908, 9, 77,
    1, 77, 1, 77, 1, 78, 1, 78, 1, 78, 1, 78, 1, 78, 1, 78, 5, 78, 918, 8, 78, 10, 78, 12, 78, 921,
    9, 78, 1, 78, 1, 78, 1, 78, 1, 78, 1, 78, 1, 79, 1, 79, 1, 79, 1, 79, 1, 79, 4, 79, 933, 8, 79,
    11, 79, 12, 79, 934, 1, 79, 1, 79, 1, 80, 1, 80, 1, 80, 1, 80, 1, 80, 1, 81, 1, 81, 1, 81, 0, 3,
    78, 118, 120, 82, 0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40,
    42, 44, 46, 48, 50, 52, 54, 56, 58, 60, 62, 64, 66, 68, 70, 72, 74, 76, 78, 80, 82, 84, 86, 88,
    90, 92, 94, 96, 98, 100, 102, 104, 106, 108, 110, 112, 114, 116, 118, 120, 122, 124, 126, 128,
    130, 132, 134, 136, 138, 140, 142, 144, 146, 148, 150, 152, 154, 156, 158, 160, 162, 0, 5, 2, 0,
    55, 59, 97, 97, 1, 0, 61, 62, 1, 0, 98, 100, 1, 0, 102, 103, 4, 0, 63, 64, 66, 68, 70, 70, 84,
    91, 993, 0, 165, 1, 0, 0, 0, 2, 190, 1, 0, 0, 0, 4, 193, 1, 0, 0, 0, 6, 214, 1, 0, 0, 0, 8, 239,
    1, 0, 0, 0, 10, 260, 1, 0, 0, 0, 12, 284, 1, 0, 0, 0, 14, 293, 1, 0, 0, 0, 16, 308, 1, 0, 0, 0,
    18, 335, 1, 0, 0, 0, 20, 361, 1, 0, 0, 0, 22, 364, 1, 0, 0, 0, 24, 375, 1, 0, 0, 0, 26, 378, 1,
    0, 0, 0, 28, 387, 1, 0, 0, 0, 30, 396, 1, 0, 0, 0, 32, 414, 1, 0, 0, 0, 34, 430, 1, 0, 0, 0, 36,
    448, 1, 0, 0, 0, 38, 459, 1, 0, 0, 0, 40, 461, 1, 0, 0, 0, 42, 465, 1, 0, 0, 0, 44, 469, 1, 0,
    0, 0, 46, 477, 1, 0, 0, 0, 48, 499, 1, 0, 0, 0, 50, 510, 1, 0, 0, 0, 52, 513, 1, 0, 0, 0, 54,
    525, 1, 0, 0, 0, 56, 530, 1, 0, 0, 0, 58, 539, 1, 0, 0, 0, 60, 546, 1, 0, 0, 0, 62, 555, 1, 0,
    0, 0, 64, 578, 1, 0, 0, 0, 66, 587, 1, 0, 0, 0, 68, 612, 1, 0, 0, 0, 70, 636, 1, 0, 0, 0, 72,
    656, 1, 0, 0, 0, 74, 675, 1, 0, 0, 0, 76, 677, 1, 0, 0, 0, 78, 684, 1, 0, 0, 0, 80, 693, 1, 0,
    0, 0, 82, 695, 1, 0, 0, 0, 84, 697, 1, 0, 0, 0, 86, 703, 1, 0, 0, 0, 88, 705, 1, 0, 0, 0, 90,
    715, 1, 0, 0, 0, 92, 717, 1, 0, 0, 0, 94, 725, 1, 0, 0, 0, 96, 732, 1, 0, 0, 0, 98, 744, 1, 0,
    0, 0, 100, 746, 1, 0, 0, 0, 102, 753, 1, 0, 0, 0, 104, 761, 1, 0, 0, 0, 106, 763, 1, 0, 0, 0,
    108, 765, 1, 0, 0, 0, 110, 767, 1, 0, 0, 0, 112, 769, 1, 0, 0, 0, 114, 771, 1, 0, 0, 0, 116,
    775, 1, 0, 0, 0, 118, 784, 1, 0, 0, 0, 120, 813, 1, 0, 0, 0, 122, 827, 1, 0, 0, 0, 124, 835, 1,
    0, 0, 0, 126, 837, 1, 0, 0, 0, 128, 843, 1, 0, 0, 0, 130, 845, 1, 0, 0, 0, 132, 848, 1, 0, 0, 0,
    134, 851, 1, 0, 0, 0, 136, 855, 1, 0, 0, 0, 138, 859, 1, 0, 0, 0, 140, 863, 1, 0, 0, 0, 142,
    867, 1, 0, 0, 0, 144, 875, 1, 0, 0, 0, 146, 879, 1, 0, 0, 0, 148, 886, 1, 0, 0, 0, 150, 888, 1,
    0, 0, 0, 152, 895, 1, 0, 0, 0, 154, 899, 1, 0, 0, 0, 156, 911, 1, 0, 0, 0, 158, 927, 1, 0, 0, 0,
    160, 938, 1, 0, 0, 0, 162, 943, 1, 0, 0, 0, 164, 166, 3, 20, 10, 0, 165, 164, 1, 0, 0, 0, 165,
    166, 1, 0, 0, 0, 166, 170, 1, 0, 0, 0, 167, 169, 3, 2, 1, 0, 168, 167, 1, 0, 0, 0, 169, 172, 1,
    0, 0, 0, 170, 168, 1, 0, 0, 0, 170, 171, 1, 0, 0, 0, 171, 176, 1, 0, 0, 0, 172, 170, 1, 0, 0, 0,
    173, 175, 5, 94, 0, 0, 174, 173, 1, 0, 0, 0, 175, 178, 1, 0, 0, 0, 176, 174, 1, 0, 0, 0, 176,
    177, 1, 0, 0, 0, 177, 179, 1, 0, 0, 0, 178, 176, 1, 0, 0, 0, 179, 180, 5, 0, 0, 1, 180, 1, 1, 0,
    0, 0, 181, 191, 3, 4, 2, 0, 182, 191, 3, 6, 3, 0, 183, 191, 3, 8, 4, 0, 184, 191, 3, 10, 5, 0,
    185, 191, 3, 12, 6, 0, 186, 191, 3, 14, 7, 0, 187, 191, 3, 16, 8, 0, 188, 191, 3, 18, 9, 0, 189,
    191, 3, 20, 10, 0, 190, 181, 1, 0, 0, 0, 190, 182, 1, 0, 0, 0, 190, 183, 1, 0, 0, 0, 190, 184,
    1, 0, 0, 0, 190, 185, 1, 0, 0, 0, 190, 186, 1, 0, 0, 0, 190, 187, 1, 0, 0, 0, 190, 188, 1, 0, 0,
    0, 190, 189, 1, 0, 0, 0, 191, 3, 1, 0, 0, 0, 192, 194, 5, 106, 0, 0, 193, 192, 1, 0, 0, 0, 193,
    194, 1, 0, 0, 0, 194, 195, 1, 0, 0, 0, 195, 196, 5, 46, 0, 0, 196, 197, 5, 10, 0, 0, 197, 198,
    5, 79, 0, 0, 198, 199, 5, 80, 0, 0, 199, 200, 5, 80, 0, 0, 200, 201, 5, 69, 0, 0, 201, 202, 5,
    49, 0, 0, 202, 203, 5, 83, 0, 0, 203, 207, 5, 94, 0, 0, 204, 206, 3, 24, 12, 0, 205, 204, 1, 0,
    0, 0, 206, 209, 1, 0, 0, 0, 207, 205, 1, 0, 0, 0, 207, 208, 1, 0, 0, 0, 208, 210, 1, 0, 0, 0,
    209, 207, 1, 0, 0, 0, 210, 211, 5, 121, 0, 0, 211, 212, 5, 94, 0, 0, 212, 5, 1, 0, 0, 0, 213,
    215, 5, 106, 0, 0, 214, 213, 1, 0, 0, 0, 214, 215, 1, 0, 0, 0, 215, 216, 1, 0, 0, 0, 216, 217,
    5, 46, 0, 0, 217, 218, 3, 80, 40, 0, 218, 220, 5, 79, 0, 0, 219, 221, 3, 92, 46, 0, 220, 219, 1,
    0, 0, 0, 220, 221, 1, 0, 0, 0, 221, 222, 1, 0, 0, 0, 222, 223, 5, 80, 0, 0, 223, 224, 5, 69, 0,
    0, 224, 225, 3, 98, 49, 0, 225, 226, 5, 83, 0, 0, 226, 227, 5, 107, 0, 0, 227, 231, 5, 94, 0, 0,
    228, 230, 3, 24, 12, 0, 229, 228, 1, 0, 0, 0, 230, 233, 1, 0, 0, 0, 231, 229, 1, 0, 0, 0, 231,
    232, 1, 0, 0, 0, 232, 234, 1, 0, 0, 0, 233, 231, 1, 0, 0, 0, 234, 235, 3, 54, 27, 0, 235, 236,
    5, 121, 0, 0, 236, 237, 5, 94, 0, 0, 237, 7, 1, 0, 0, 0, 238, 240, 5, 106, 0, 0, 239, 238, 1, 0,
    0, 0, 239, 240, 1, 0, 0, 0, 240, 241, 1, 0, 0, 0, 241, 242, 5, 1, 0, 0, 242, 243, 3, 82, 41, 0,
    243, 244, 5, 79, 0, 0, 244, 245, 5, 53, 0, 0, 245, 246, 5, 80, 0, 0, 246, 247, 5, 121, 0, 0,
    247, 253, 5, 94, 0, 0, 248, 252, 3, 52, 26, 0, 249, 252, 3, 26, 13, 0, 250, 252, 3, 20, 10, 0,
    251, 248, 1, 0, 0, 0, 251, 249, 1, 0, 0, 0, 251, 250, 1, 0, 0, 0, 252, 255, 1, 0, 0, 0, 253,
    251, 1, 0, 0, 0, 253, 254, 1, 0, 0, 0, 254, 256, 1, 0, 0, 0, 255, 253, 1, 0, 0, 0, 256, 257, 5,
    121, 0, 0, 257, 258, 5, 94, 0, 0, 258, 9, 1, 0, 0, 0, 259, 261, 5, 106, 0, 0, 260, 259, 1, 0, 0,
    0, 260, 261, 1, 0, 0, 0, 261, 262, 1, 0, 0, 0, 262, 263, 5, 46, 0, 0, 263, 264, 3, 80, 40, 0,
    264, 266, 5, 79, 0, 0, 265, 267, 3, 92, 46, 0, 266, 265, 1, 0, 0, 0, 266, 267, 1, 0, 0, 0, 267,
    268, 1, 0, 0, 0, 268, 269, 5, 80, 0, 0, 269, 270, 5, 69, 0, 0, 270, 271, 5, 49, 0, 0, 271, 272,
    5, 83, 0, 0, 272, 273, 5, 108, 0, 0, 273, 277, 5, 94, 0, 0, 274, 276, 3, 24, 12, 0, 275, 274, 1,
    0, 0, 0, 276, 279, 1, 0, 0, 0, 277, 275, 1, 0, 0, 0, 277, 278, 1, 0, 0, 0, 278, 280, 1, 0, 0, 0,
    279, 277, 1, 0, 0, 0, 280, 281, 5, 121, 0, 0, 281, 282, 5, 94, 0, 0, 282, 11, 1, 0, 0, 0, 283,
    285, 5, 106, 0, 0, 284, 283, 1, 0, 0, 0, 284, 285, 1, 0, 0, 0, 285, 286, 1, 0, 0, 0, 286, 287,
    3, 74, 37, 0, 287, 288, 5, 66, 0, 0, 288, 289, 3, 86, 43, 0, 289, 290, 5, 109, 0, 0, 290, 291,
    5, 94, 0, 0, 291, 13, 1, 0, 0, 0, 292, 294, 5, 106, 0, 0, 293, 292, 1, 0, 0, 0, 293, 294, 1, 0,
    0, 0, 294, 295, 1, 0, 0, 0, 295, 296, 5, 1, 0, 0, 296, 297, 3, 84, 42, 0, 297, 298, 5, 79, 0, 0,
    298, 299, 5, 4, 0, 0, 299, 300, 5, 80, 0, 0, 300, 301, 5, 83, 0, 0, 301, 302, 5, 110, 0, 0, 302,
    303, 5, 94, 0, 0, 303, 304, 3, 94, 47, 0, 304, 305, 5, 94, 0, 0, 305, 306, 5, 121, 0, 0, 306,
    15, 1, 0, 0, 0, 307, 309, 5, 106, 0, 0, 308, 307, 1, 0, 0, 0, 308, 309, 1, 0, 0, 0, 309, 310, 1,
    0, 0, 0, 310, 311, 5, 1, 0, 0, 311, 316, 3, 84, 42, 0, 312, 313, 5, 79, 0, 0, 313, 314, 3, 84,
    42, 0, 314, 315, 5, 80, 0, 0, 315, 317, 1, 0, 0, 0, 316, 312, 1, 0, 0, 0, 316, 317, 1, 0, 0, 0,
    317, 318, 1, 0, 0, 0, 318, 319, 5, 83, 0, 0, 319, 320, 5, 111, 0, 0, 320, 328, 5, 94, 0, 0, 321,
    327, 3, 62, 31, 0, 322, 327, 3, 64, 32, 0, 323, 327, 3, 66, 33, 0, 324, 327, 3, 68, 34, 0, 325,
    327, 3, 20, 10, 0, 326, 321, 1, 0, 0, 0, 326, 322, 1, 0, 0, 0, 326, 323, 1, 0, 0, 0, 326, 324,
    1, 0, 0, 0, 326, 325, 1, 0, 0, 0, 327, 330, 1, 0, 0, 0, 328, 326, 1, 0, 0, 0, 328, 329, 1, 0, 0,
    0, 329, 331, 1, 0, 0, 0, 330, 328, 1, 0, 0, 0, 331, 332, 5, 121, 0, 0, 332, 333, 5, 94, 0, 0,
    333, 17, 1, 0, 0, 0, 334, 336, 5, 106, 0, 0, 335, 334, 1, 0, 0, 0, 335, 336, 1, 0, 0, 0, 336,
    337, 1, 0, 0, 0, 337, 338, 5, 1, 0, 0, 338, 343, 3, 84, 42, 0, 339, 340, 5, 79, 0, 0, 340, 344,
    3, 84, 42, 0, 341, 342, 5, 52, 0, 0, 342, 344, 5, 80, 0, 0, 343, 339, 1, 0, 0, 0, 343, 341, 1,
    0, 0, 0, 344, 345, 1, 0, 0, 0, 345, 346, 5, 112, 0, 0, 346, 355, 5, 94, 0, 0, 347, 354, 3, 64,
    32, 0, 348, 354, 3, 66, 33, 0, 349, 354, 3, 68, 34, 0, 350, 354, 3, 70, 35, 0, 351, 354, 3, 72,
    36, 0, 352, 354, 3, 20, 10, 0, 353, 347, 1, 0, 0, 0, 353, 348, 1, 0, 0, 0, 353, 349, 1, 0, 0, 0,
    353, 350, 1, 0, 0, 0, 353, 351, 1, 0, 0, 0, 353, 352, 1, 0, 0, 0, 354, 357, 1, 0, 0, 0, 355,
    353, 1, 0, 0, 0, 355, 356, 1, 0, 0, 0, 356, 358, 1, 0, 0, 0, 357, 355, 1, 0, 0, 0, 358, 359, 5,
    121, 0, 0, 359, 360, 5, 94, 0, 0, 360, 19, 1, 0, 0, 0, 361, 362, 3, 22, 11, 0, 362, 363, 5, 94,
    0, 0, 363, 21, 1, 0, 0, 0, 364, 365, 5, 121, 0, 0, 365, 23, 1, 0, 0, 0, 366, 376, 3, 26, 13, 0,
    367, 376, 3, 28, 14, 0, 368, 376, 3, 30, 15, 0, 369, 376, 3, 32, 16, 0, 370, 376, 3, 34, 17, 0,
    371, 376, 3, 36, 18, 0, 372, 376, 3, 46, 23, 0, 373, 376, 3, 48, 24, 0, 374, 376, 3, 20, 10, 0,
    375, 366, 1, 0, 0, 0, 375, 367, 1, 0, 0, 0, 375, 368, 1, 0, 0, 0, 375, 369, 1, 0, 0, 0, 375,
    370, 1, 0, 0, 0, 375, 371, 1, 0, 0, 0, 375, 372, 1, 0, 0, 0, 375, 373, 1, 0, 0, 0, 375, 374, 1,
    0, 0, 0, 376, 25, 1, 0, 0, 0, 377, 379, 5, 106, 0, 0, 378, 377, 1, 0, 0, 0, 378, 379, 1, 0, 0,
    0, 379, 380, 1, 0, 0, 0, 380, 381, 3, 74, 37, 0, 381, 382, 5, 66, 0, 0, 382, 383, 3, 118, 59, 0,
    383, 384, 5, 113, 0, 0, 384, 385, 5, 94, 0, 0, 385, 27, 1, 0, 0, 0, 386, 388, 5, 106, 0, 0, 387,
    386, 1, 0, 0, 0, 387, 388, 1, 0, 0, 0, 388, 389, 1, 0, 0, 0, 389, 390, 3, 78, 39, 0, 390, 391,
    5, 66, 0, 0, 391, 392, 3, 118, 59, 0, 392, 393, 5, 114, 0, 0, 393, 394, 5, 94, 0, 0, 394, 29, 1,
    0, 0, 0, 395, 397, 5, 106, 0, 0, 396, 395, 1, 0, 0, 0, 396, 397, 1, 0, 0, 0, 397, 398, 1, 0, 0,
    0, 398, 399, 5, 6, 0, 0, 399, 400, 3, 118, 59, 0, 400, 401, 5, 83, 0, 0, 401, 407, 5, 94, 0, 0,
    402, 406, 3, 56, 28, 0, 403, 406, 3, 58, 29, 0, 404, 406, 3, 24, 12, 0, 405, 402, 1, 0, 0, 0,
    405, 403, 1, 0, 0, 0, 405, 404, 1, 0, 0, 0, 406, 409, 1, 0, 0, 0, 407, 405, 1, 0, 0, 0, 407,
    408, 1, 0, 0, 0, 408, 410, 1, 0, 0, 0, 409, 407, 1, 0, 0, 0, 410, 411, 5, 121, 0, 0, 411, 412,
    5, 94, 0, 0, 412, 31, 1, 0, 0, 0, 413, 415, 5, 106, 0, 0, 414, 413, 1, 0, 0, 0, 414, 415, 1, 0,
    0, 0, 415, 416, 1, 0, 0, 0, 416, 417, 5, 13, 0, 0, 417, 418, 3, 118, 59, 0, 418, 419, 5, 83, 0,
    0, 419, 423, 5, 94, 0, 0, 420, 422, 3, 24, 12, 0, 421, 420, 1, 0, 0, 0, 422, 425, 1, 0, 0, 0,
    423, 421, 1, 0, 0, 0, 423, 424, 1, 0, 0, 0, 424, 426, 1, 0, 0, 0, 425, 423, 1, 0, 0, 0, 426,
    427, 5, 121, 0, 0, 427, 428, 5, 94, 0, 0, 428, 33, 1, 0, 0, 0, 429, 431, 5, 106, 0, 0, 430, 429,
    1, 0, 0, 0, 430, 431, 1, 0, 0, 0, 431, 432, 1, 0, 0, 0, 432, 433, 5, 5, 0, 0, 433, 434, 3, 74,
    37, 0, 434, 435, 5, 7, 0, 0, 435, 436, 3, 118, 59, 0, 436, 437, 5, 83, 0, 0, 437, 441, 5, 94, 0,
    0, 438, 440, 3, 24, 12, 0, 439, 438, 1, 0, 0, 0, 440, 443, 1, 0, 0, 0, 441, 439, 1, 0, 0, 0,
    441, 442, 1, 0, 0, 0, 442, 444, 1, 0, 0, 0, 443, 441, 1, 0, 0, 0, 444, 445, 5, 121, 0, 0, 445,
    446, 5, 94, 0, 0, 446, 35, 1, 0, 0, 0, 447, 449, 5, 106, 0, 0, 448, 447, 1, 0, 0, 0, 448, 449,
    1, 0, 0, 0, 449, 450, 1, 0, 0, 0, 450, 451, 3, 38, 19, 0, 451, 452, 5, 79, 0, 0, 452, 453, 3,
    88, 44, 0, 453, 454, 5, 80, 0, 0, 454, 455, 5, 94, 0, 0, 455, 37, 1, 0, 0, 0, 456, 460, 3, 80,
    40, 0, 457, 460, 3, 40, 20, 0, 458, 460, 3, 42, 21, 0, 459, 456, 1, 0, 0, 0, 459, 457, 1, 0, 0,
    0, 459, 458, 1, 0, 0, 0, 460, 39, 1, 0, 0, 0, 461, 462, 5, 73, 0, 0, 462, 463, 5, 81, 0, 0, 463,
    464, 3, 80, 40, 0, 464, 41, 1, 0, 0, 0, 465, 466, 3, 44, 22, 0, 466, 467, 5, 81, 0, 0, 467, 468,
    3, 80, 40, 0, 468, 43, 1, 0, 0, 0, 469, 473, 3, 76, 38, 0, 470, 472, 3, 116, 58, 0, 471, 470, 1,
    0, 0, 0, 472, 475, 1, 0, 0, 0, 473, 471, 1, 0, 0, 0, 473, 474, 1, 0, 0, 0, 474, 45, 1, 0, 0, 0,
    475, 473, 1, 0, 0, 0, 476, 478, 5, 106, 0, 0, 477, 476, 1, 0, 0, 0, 477, 478, 1, 0, 0, 0, 478,
    479, 1, 0, 0, 0, 479, 480, 5, 12, 0, 0, 480, 484, 5, 94, 0, 0, 481, 483, 3, 24, 12, 0, 482, 481,
    1, 0, 0, 0, 483, 486, 1, 0, 0, 0, 484, 482, 1, 0, 0, 0, 484, 485, 1, 0, 0, 0, 485, 487, 1, 0, 0,
    0, 486, 484, 1, 0, 0, 0, 487, 491, 3, 60, 30, 0, 488, 490, 3, 24, 12, 0, 489, 488, 1, 0, 0, 0,
    490, 493, 1, 0, 0, 0, 491, 489, 1, 0, 0, 0, 491, 492, 1, 0, 0, 0, 492, 494, 1, 0, 0, 0, 493,
    491, 1, 0, 0, 0, 494, 495, 5, 25, 0, 0, 495, 496, 5, 12, 0, 0, 496, 497, 5, 94, 0, 0, 497, 47,
    1, 0, 0, 0, 498, 500, 5, 106, 0, 0, 499, 498, 1, 0, 0, 0, 499, 500, 1, 0, 0, 0, 500, 501, 1, 0,
    0, 0, 501, 502, 5, 51, 0, 0, 502, 503, 3, 84, 42, 0, 503, 504, 5, 79, 0, 0, 504, 505, 3, 50, 25,
    0, 505, 506, 5, 80, 0, 0, 506, 507, 5, 94, 0, 0, 507, 49, 1, 0, 0, 0, 508, 511, 3, 112, 56, 0,
    509, 511, 3, 76, 38, 0, 510, 508, 1, 0, 0, 0, 510, 509, 1, 0, 0, 0, 511, 51, 1, 0, 0, 0, 512,
    514, 5, 106, 0, 0, 513, 512, 1, 0, 0, 0, 513, 514, 1, 0, 0, 0, 514, 515, 1, 0, 0, 0, 515, 516,
    5, 73, 0, 0, 516, 517, 5, 81, 0, 0, 517, 518, 5, 44, 0, 0, 518, 519, 5, 79, 0, 0, 519, 520, 3,
    100, 50, 0, 520, 521, 5, 82, 0, 0, 521, 522, 3, 102, 51, 0, 522, 523, 5, 80, 0, 0, 523, 524, 5,
    94, 0, 0, 524, 53, 1, 0, 0, 0, 525, 526, 5, 11, 0, 0, 526, 527, 3, 118, 59, 0, 527, 528, 5, 94,
    0, 0, 528, 55, 1, 0, 0, 0, 529, 531, 5, 106, 0, 0, 530, 529, 1, 0, 0, 0, 530, 531, 1, 0, 0, 0,
    531, 532, 1, 0, 0, 0, 532, 533, 5, 2, 0, 0, 533, 534, 3, 118, 59, 0, 534, 535, 5, 83, 0, 0, 535,
    536, 5, 117, 0, 0, 536, 537, 5, 94, 0, 0, 537, 57, 1, 0, 0, 0, 538, 540, 5, 106, 0, 0, 539, 538,
    1, 0, 0, 0, 539, 540, 1, 0, 0, 0, 540, 541, 1, 0, 0, 0, 541, 542, 5, 3, 0, 0, 542, 543, 5, 83,
    0, 0, 543, 544, 5, 94, 0, 0, 544, 59, 1, 0, 0, 0, 545, 547, 5, 106, 0, 0, 546, 545, 1, 0, 0, 0,
    546, 547, 1, 0, 0, 0, 547, 548, 1, 0, 0, 0, 548, 549, 5, 47, 0, 0, 549, 550, 3, 84, 42, 0, 550,
    551, 5, 45, 0, 0, 551, 552, 3, 74, 37, 0, 552, 553, 5, 94, 0, 0, 553, 61, 1, 0, 0, 0, 554, 556,
    5, 106, 0, 0, 555, 554, 1, 0, 0, 0, 555, 556, 1, 0, 0, 0, 556, 557, 1, 0, 0, 0, 557, 558, 5, 46,
    0, 0, 558, 559, 5, 48, 0, 0, 559, 561, 5, 79, 0, 0, 560, 562, 3, 92, 46, 0, 561, 560, 1, 0, 0,
    0, 561, 562, 1, 0, 0, 0, 562, 563, 1, 0, 0, 0, 563, 564, 5, 80, 0, 0, 564, 565, 5, 69, 0, 0,
    565, 566, 5, 49, 0, 0, 566, 567, 5, 83, 0, 0, 567, 571, 5, 94, 0, 0, 568, 570, 3, 24, 12, 0,
    569, 568, 1, 0, 0, 0, 570, 573, 1, 0, 0, 0, 571, 569, 1, 0, 0, 0, 571, 572, 1, 0, 0, 0, 572,
    574, 1, 0, 0, 0, 573, 571, 1, 0, 0, 0, 574, 575, 5, 121, 0, 0, 575, 576, 5, 94, 0, 0, 576, 63,
    1, 0, 0, 0, 577, 579, 5, 106, 0, 0, 578, 577, 1, 0, 0, 0, 578, 579, 1, 0, 0, 0, 579, 580, 1, 0,
    0, 0, 580, 581, 3, 74, 37, 0, 581, 582, 5, 83, 0, 0, 582, 583, 3, 98, 49, 0, 583, 584, 5, 118,
    0, 0, 584, 585, 5, 94, 0, 0, 585, 65, 1, 0, 0, 0, 586, 588, 5, 106, 0, 0, 587, 586, 1, 0, 0, 0,
    587, 588, 1, 0, 0, 0, 588, 589, 1, 0, 0, 0, 589, 590, 5, 46, 0, 0, 590, 591, 3, 80, 40, 0, 591,
    593, 5, 79, 0, 0, 592, 594, 3, 92, 46, 0, 593, 592, 1, 0, 0, 0, 593, 594, 1, 0, 0, 0, 594, 595,
    1, 0, 0, 0, 595, 596, 5, 80, 0, 0, 596, 597, 5, 69, 0, 0, 597, 598, 3, 98, 49, 0, 598, 599, 5,
    83, 0, 0, 599, 600, 5, 119, 0, 0, 600, 604, 5, 94, 0, 0, 601, 603, 3, 24, 12, 0, 602, 601, 1, 0,
    0, 0, 603, 606, 1, 0, 0, 0, 604, 602, 1, 0, 0, 0, 604, 605, 1, 0, 0, 0, 605, 607, 1, 0, 0, 0,
    606, 604, 1, 0, 0, 0, 607, 608, 3, 54, 27, 0, 608, 609, 5, 121, 0, 0, 609, 610, 5, 94, 0, 0,
    610, 67, 1, 0, 0, 0, 611, 613, 5, 106, 0, 0, 612, 611, 1, 0, 0, 0, 612, 613, 1, 0, 0, 0, 613,
    614, 1, 0, 0, 0, 614, 615, 5, 46, 0, 0, 615, 616, 3, 80, 40, 0, 616, 618, 5, 79, 0, 0, 617, 619,
    3, 92, 46, 0, 618, 617, 1, 0, 0, 0, 618, 619, 1, 0, 0, 0, 619, 620, 1, 0, 0, 0, 620, 621, 5, 80,
    0, 0, 621, 622, 5, 69, 0, 0, 622, 623, 5, 49, 0, 0, 623, 624, 5, 83, 0, 0, 624, 625, 5, 120, 0,
    0, 625, 629, 5, 94, 0, 0, 626, 628, 3, 24, 12, 0, 627, 626, 1, 0, 0, 0, 628, 631, 1, 0, 0, 0,
    629, 627, 1, 0, 0, 0, 629, 630, 1, 0, 0, 0, 630, 632, 1, 0, 0, 0, 631, 629, 1, 0, 0, 0, 632,
    633, 5, 121, 0, 0, 633, 634, 5, 94, 0, 0, 634, 69, 1, 0, 0, 0, 635, 637, 5, 106, 0, 0, 636, 635,
    1, 0, 0, 0, 636, 637, 1, 0, 0, 0, 637, 638, 1, 0, 0, 0, 638, 639, 5, 43, 0, 0, 639, 640, 5, 94,
    0, 0, 640, 641, 5, 46, 0, 0, 641, 642, 3, 80, 40, 0, 642, 644, 5, 79, 0, 0, 643, 645, 3, 92, 46,
    0, 644, 643, 1, 0, 0, 0, 644, 645, 1, 0, 0, 0, 645, 646, 1, 0, 0, 0, 646, 647, 5, 80, 0, 0, 647,
    648, 5, 69, 0, 0, 648, 649, 3, 98, 49, 0, 649, 650, 5, 83, 0, 0, 650, 651, 5, 94, 0, 0, 651,
    652, 5, 50, 0, 0, 652, 653, 5, 121, 0, 0, 653, 654, 5, 94, 0, 0, 654, 71, 1, 0, 0, 0, 655, 657,
    5, 106, 0, 0, 656, 655, 1, 0, 0, 0, 656, 657, 1, 0, 0, 0, 657, 658, 1, 0, 0, 0, 658, 659, 5, 43,
    0, 0, 659, 660, 5, 94, 0, 0, 660, 661, 5, 46, 0, 0, 661, 662, 3, 80, 40, 0, 662, 664, 5, 79, 0,
    0, 663, 665, 3, 92, 46, 0, 664, 663, 1, 0, 0, 0, 664, 665, 1, 0, 0, 0, 665, 666, 1, 0, 0, 0,
    666, 667, 5, 80, 0, 0, 667, 668, 5, 69, 0, 0, 668, 669, 5, 49, 0, 0, 669, 670, 5, 83, 0, 0, 670,
    671, 5, 94, 0, 0, 671, 672, 5, 50, 0, 0, 672, 673, 5, 121, 0, 0, 673, 674, 5, 94, 0, 0, 674, 73,
    1, 0, 0, 0, 675, 676, 5, 96, 0, 0, 676, 75, 1, 0, 0, 0, 677, 678, 5, 96, 0, 0, 678, 77, 1, 0, 0,
    0, 679, 680, 6, 39, -1, 0, 680, 685, 3, 76, 38, 0, 681, 682, 5, 73, 0, 0, 682, 683, 5, 81, 0, 0,
    683, 685, 3, 76, 38, 0, 684, 679, 1, 0, 0, 0, 684, 681, 1, 0, 0, 0, 685, 690, 1, 0, 0, 0, 686,
    687, 10, 1, 0, 0, 687, 689, 3, 116, 58, 0, 688, 686, 1, 0, 0, 0, 689, 692, 1, 0, 0, 0, 690, 688,
    1, 0, 0, 0, 690, 691, 1, 0, 0, 0, 691, 79, 1, 0, 0, 0, 692, 690, 1, 0, 0, 0, 693, 694, 5, 96, 0,
    0, 694, 81, 1, 0, 0, 0, 695, 696, 5, 95, 0, 0, 696, 83, 1, 0, 0, 0, 697, 698, 7, 0, 0, 0, 698,
    85, 1, 0, 0, 0, 699, 704, 3, 106, 53, 0, 700, 704, 3, 108, 54, 0, 701, 704, 3, 110, 55, 0, 702,
    704, 3, 112, 56, 0, 703, 699, 1, 0, 0, 0, 703, 700, 1, 0, 0, 0, 703, 701, 1, 0, 0, 0, 703, 702,
    1, 0, 0, 0, 704, 87, 1, 0, 0, 0, 705, 710, 3, 90, 45, 0, 706, 707, 5, 82, 0, 0, 707, 709, 3, 90,
    45, 0, 708, 706, 1, 0, 0, 0, 709, 712, 1, 0, 0, 0, 710, 708, 1, 0, 0, 0, 710, 711, 1, 0, 0, 0,
    711, 89, 1, 0, 0, 0, 712, 710, 1, 0, 0, 0, 713, 716, 3, 160, 80, 0, 714, 716, 3, 118, 59, 0,
    715, 713, 1, 0, 0, 0, 715, 714, 1, 0, 0, 0, 716, 91, 1, 0, 0, 0, 717, 722, 3, 152, 76, 0, 718,
    719, 5, 82, 0, 0, 719, 721, 3, 152, 76, 0, 720, 718, 1, 0, 0, 0, 721, 724, 1, 0, 0, 0, 722, 720,
    1, 0, 0, 0, 722, 723, 1, 0, 0, 0, 723, 93, 1, 0, 0, 0, 724, 722, 1, 0, 0, 0, 725, 728, 3, 74,
    37, 0, 726, 727, 5, 82, 0, 0, 727, 729, 3, 74, 37, 0, 728, 726, 1, 0, 0, 0, 729, 730, 1, 0, 0,
    0, 730, 728, 1, 0, 0, 0, 730, 731, 1, 0, 0, 0, 731, 95, 1, 0, 0, 0, 732, 737, 3, 118, 59, 0,
    733, 734, 5, 82, 0, 0, 734, 736, 3, 118, 59, 0, 735, 733, 1, 0, 0, 0, 736, 739, 1, 0, 0, 0, 737,
    735, 1, 0, 0, 0, 737, 738, 1, 0, 0, 0, 738, 97, 1, 0, 0, 0, 739, 737, 1, 0, 0, 0, 740, 745, 3,
    158, 79, 0, 741, 745, 3, 84, 42, 0, 742, 745, 3, 154, 77, 0, 743, 745, 3, 156, 78, 0, 744, 740,
    1, 0, 0, 0, 744, 741, 1, 0, 0, 0, 744, 742, 1, 0, 0, 0, 744, 743, 1, 0, 0, 0, 745, 99, 1, 0, 0,
    0, 746, 747, 3, 118, 59, 0, 747, 101, 1, 0, 0, 0, 748, 754, 3, 104, 52, 0, 749, 754, 3, 136, 68,
    0, 750, 754, 3, 140, 70, 0, 751, 754, 3, 128, 64, 0, 752, 754, 3, 138, 69, 0, 753, 748, 1, 0, 0,
    0, 753, 749, 1, 0, 0, 0, 753, 750, 1, 0, 0, 0, 753, 751, 1, 0, 0, 0, 753, 752, 1, 0, 0, 0, 754,
    103, 1, 0, 0, 0, 755, 762, 3, 106, 53, 0, 756, 762, 3, 108, 54, 0, 757, 762, 3, 110, 55, 0, 758,
    762, 3, 112, 56, 0, 759, 762, 3, 162, 81, 0, 760, 762, 3, 114, 57, 0, 761, 755, 1, 0, 0, 0, 761,
    756, 1, 0, 0, 0, 761, 757, 1, 0, 0, 0, 761, 758, 1, 0, 0, 0, 761, 759, 1, 0, 0, 0, 761, 760, 1,
    0, 0, 0, 762, 105, 1, 0, 0, 0, 763, 764, 7, 1, 0, 0, 764, 107, 1, 0, 0, 0, 765, 766, 7, 2, 0, 0,
    766, 109, 1, 0, 0, 0, 767, 768, 5, 101, 0, 0, 768, 111, 1, 0, 0, 0, 769, 770, 7, 3, 0, 0, 770,
    113, 1, 0, 0, 0, 771, 772, 3, 84, 42, 0, 772, 773, 5, 81, 0, 0, 773, 774, 3, 76, 38, 0, 774,
    115, 1, 0, 0, 0, 775, 776, 5, 77, 0, 0, 776, 777, 3, 118, 59, 0, 777, 778, 5, 78, 0, 0, 778,
    117, 1, 0, 0, 0, 779, 780, 6, 59, -1, 0, 780, 785, 3, 150, 75, 0, 781, 785, 3, 128, 64, 0, 782,
    785, 3, 120, 60, 0, 783, 785, 3, 134, 67, 0, 784, 779, 1, 0, 0, 0, 784, 781, 1, 0, 0, 0, 784,
    782, 1, 0, 0, 0, 784, 783, 1, 0, 0, 0, 785, 801, 1, 0, 0, 0, 786, 787, 10, 1, 0, 0, 787, 788, 5,
    6, 0, 0, 788, 793, 3, 118, 59, 0, 789, 790, 5, 2, 0, 0, 790, 792, 3, 118, 59, 0, 791, 789, 1, 0,
    0, 0, 792, 795, 1, 0, 0, 0, 793, 791, 1, 0, 0, 0, 793, 794, 1, 0, 0, 0, 794, 796, 1, 0, 0, 0,
    795, 793, 1, 0, 0, 0, 796, 797, 5, 3, 0, 0, 797, 798, 3, 118, 59, 2, 798, 800, 1, 0, 0, 0, 799,
    786, 1, 0, 0, 0, 800, 803, 1, 0, 0, 0, 801, 799, 1, 0, 0, 0, 801, 802, 1, 0, 0, 0, 802, 119, 1,
    0, 0, 0, 803, 801, 1, 0, 0, 0, 804, 805, 6, 60, -1, 0, 805, 814, 3, 124, 62, 0, 806, 814, 3,
    126, 63, 0, 807, 814, 3, 104, 52, 0, 808, 814, 3, 136, 68, 0, 809, 814, 3, 140, 70, 0, 810, 814,
    3, 138, 69, 0, 811, 814, 3, 76, 38, 0, 812, 814, 3, 146, 73, 0, 813, 804, 1, 0, 0, 0, 813, 806,
    1, 0, 0, 0, 813, 807, 1, 0, 0, 0, 813, 808, 1, 0, 0, 0, 813, 809, 1, 0, 0, 0, 813, 810, 1, 0, 0,
    0, 813, 811, 1, 0, 0, 0, 813, 812, 1, 0, 0, 0, 814, 822, 1, 0, 0, 0, 815, 816, 10, 2, 0, 0, 816,
    821, 3, 116, 58, 0, 817, 818, 10, 1, 0, 0, 818, 819, 5, 81, 0, 0, 819, 821, 3, 122, 61, 0, 820,
    815, 1, 0, 0, 0, 820, 817, 1, 0, 0, 0, 821, 824, 1, 0, 0, 0, 822, 820, 1, 0, 0, 0, 822, 823, 1,
    0, 0, 0, 823, 121, 1, 0, 0, 0, 824, 822, 1, 0, 0, 0, 825, 828, 3, 76, 38, 0, 826, 828, 3, 146,
    73, 0, 827, 825, 1, 0, 0, 0, 827, 826, 1, 0, 0, 0, 828, 832, 1, 0, 0, 0, 829, 831, 3, 116, 58,
    0, 830, 829, 1, 0, 0, 0, 831, 834, 1, 0, 0, 0, 832, 830, 1, 0, 0, 0, 832, 833, 1, 0, 0, 0, 833,
    123, 1, 0, 0, 0, 834, 832, 1, 0, 0, 0, 835, 836, 5, 73, 0, 0, 836, 125, 1, 0, 0, 0, 837, 838, 5,
    79, 0, 0, 838, 839, 3, 118, 59, 0, 839, 840, 5, 80, 0, 0, 840, 127, 1, 0, 0, 0, 841, 844, 3,
    130, 65, 0, 842, 844, 3, 132, 66, 0, 843, 841, 1, 0, 0, 0, 843, 842, 1, 0, 0, 0, 844, 129, 1, 0,
    0, 0, 845, 846, 5, 85, 0, 0, 846, 847, 3, 120, 60, 0, 847, 131, 1, 0, 0, 0, 848, 849, 5, 65, 0,
    0, 849, 850, 3, 120, 60, 0, 850, 133, 1, 0, 0, 0, 851, 852, 3, 120, 60, 0, 852, 853, 3, 148, 74,
    0, 853, 854, 3, 118, 59, 0, 854, 135, 1, 0, 0, 0, 855, 856, 5, 77, 0, 0, 856, 857, 3, 96, 48, 0,
    857, 858, 5, 78, 0, 0, 858, 137, 1, 0, 0, 0, 859, 860, 5, 79, 0, 0, 860, 861, 3, 96, 48, 0, 861,
    862, 5, 80, 0, 0, 862, 139, 1, 0, 0, 0, 863, 864, 5, 75, 0, 0, 864, 865, 3, 142, 71, 0, 865,
    866, 5, 76, 0, 0, 866, 141, 1, 0, 0, 0, 867, 872, 3, 144, 72, 0, 868, 869, 5, 82, 0, 0, 869,
    871, 3, 144, 72, 0, 870, 868, 1, 0, 0, 0, 871, 874, 1, 0, 0, 0, 872, 870, 1, 0, 0, 0, 872, 873,
    1, 0, 0, 0, 873, 143, 1, 0, 0, 0, 874, 872, 1, 0, 0, 0, 875, 876, 3, 118, 59, 0, 876, 877, 5,
    83, 0, 0, 877, 878, 3, 118, 59, 0, 878, 145, 1, 0, 0, 0, 879, 880, 3, 80, 40, 0, 880, 882, 5,
    79, 0, 0, 881, 883, 3, 88, 44, 0, 882, 881, 1, 0, 0, 0, 882, 883, 1, 0, 0, 0, 883, 884, 1, 0, 0,
    0, 884, 885, 5, 80, 0, 0, 885, 147, 1, 0, 0, 0, 886, 887, 7, 4, 0, 0, 887, 149, 1, 0, 0, 0, 888,
    889, 3, 98, 49, 0, 889, 891, 5, 79, 0, 0, 890, 892, 3, 88, 44, 0, 891, 890, 1, 0, 0, 0, 891,
    892, 1, 0, 0, 0, 892, 893, 1, 0, 0, 0, 893, 894, 5, 80, 0, 0, 894, 151, 1, 0, 0, 0, 895, 896, 3,
    74, 37, 0, 896, 897, 5, 83, 0, 0, 897, 898, 3, 98, 49, 0, 898, 153, 1, 0, 0, 0, 899, 900, 3, 84,
    42, 0, 900, 901, 5, 77, 0, 0, 901, 906, 3, 98, 49, 0, 902, 903, 5, 82, 0, 0, 903, 905, 3, 98,
    49, 0, 904, 902, 1, 0, 0, 0, 905, 908, 1, 0, 0, 0, 906, 904, 1, 0, 0, 0, 906, 907, 1, 0, 0, 0,
    907, 909, 1, 0, 0, 0, 908, 906, 1, 0, 0, 0, 909, 910, 5, 78, 0, 0, 910, 155, 1, 0, 0, 0, 911,
    912, 5, 60, 0, 0, 912, 913, 5, 77, 0, 0, 913, 914, 5, 77, 0, 0, 914, 919, 3, 98, 49, 0, 915,
    916, 5, 82, 0, 0, 916, 918, 3, 98, 49, 0, 917, 915, 1, 0, 0, 0, 918, 921, 1, 0, 0, 0, 919, 917,
    1, 0, 0, 0, 919, 920, 1, 0, 0, 0, 920, 922, 1, 0, 0, 0, 921, 919, 1, 0, 0, 0, 922, 923, 5, 78,
    0, 0, 923, 924, 5, 82, 0, 0, 924, 925, 3, 98, 49, 0, 925, 926, 5, 78, 0, 0, 926, 157, 1, 0, 0,
    0, 927, 928, 5, 54, 0, 0, 928, 929, 5, 77, 0, 0, 929, 932, 3, 98, 49, 0, 930, 931, 5, 82, 0, 0,
    931, 933, 3, 98, 49, 0, 932, 930, 1, 0, 0, 0, 933, 934, 1, 0, 0, 0, 934, 932, 1, 0, 0, 0, 934,
    935, 1, 0, 0, 0, 935, 936, 1, 0, 0, 0, 936, 937, 5, 78, 0, 0, 937, 159, 1, 0, 0, 0, 938, 939, 5,
    9, 0, 0, 939, 940, 3, 92, 46, 0, 940, 941, 5, 83, 0, 0, 941, 942, 3, 118, 59, 0, 942, 161, 1, 0,
    0, 0, 943, 944, 5, 103, 0, 0, 944, 163, 1, 0, 0, 0, 87, 165, 170, 176, 190, 193, 207, 214, 220,
    231, 239, 251, 253, 260, 266, 277, 284, 293, 308, 316, 326, 328, 335, 343, 353, 355, 375, 378,
    387, 396, 405, 407, 414, 423, 430, 441, 448, 459, 473, 477, 484, 491, 499, 510, 513, 530, 539,
    546, 555, 561, 571, 578, 587, 593, 604, 612, 618, 629, 636, 644, 656, 664, 684, 690, 703, 710,
    715, 722, 730, 737, 744, 753, 761, 784, 793, 801, 813, 820, 822, 827, 832, 843, 872, 882, 891,
    906, 919, 934,
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
