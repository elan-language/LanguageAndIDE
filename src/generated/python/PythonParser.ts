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
  public static readonly INTERPOLATED_STRING_PREFIX = 74;
  public static readonly THIS_INSTANCE = 75;
  public static readonly SINGLE_EQUALS = 76;
  public static readonly OPEN_BRACE = 77;
  public static readonly CLOSE_BRACE = 78;
  public static readonly OPEN_SQ_BRACKET = 79;
  public static readonly CLOSE_SQ_BRACKET = 80;
  public static readonly OPEN_BRACKET = 81;
  public static readonly CLOSE_BRACKET = 82;
  public static readonly DOT = 83;
  public static readonly COMMA = 84;
  public static readonly COLON = 85;
  public static readonly PLUS = 86;
  public static readonly MINUS = 87;
  public static readonly MULT = 88;
  public static readonly DIVIDE = 89;
  public static readonly LT = 90;
  public static readonly GT = 91;
  public static readonly LE = 92;
  public static readonly GE = 93;
  public static readonly DOUBLE_QUOTES = 94;
  public static readonly WS = 95;
  public static readonly NL = 96;
  public static readonly NAME_STARTING_TEST_ = 97;
  public static readonly NAME_STARTING_LC = 98;
  public static readonly NAME_STARTING_UC = 99;
  public static readonly LITERAL_BINARY = 100;
  public static readonly LITERAL_HEX = 101;
  public static readonly LITERAL_INTEGER = 102;
  public static readonly LITERAL_FLOAT = 103;
  public static readonly LITERAL_REGEXP = 104;
  public static readonly LITERAL_STRING = 105;
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
  public static readonly RULE_tryStatement = 22;
  public static readonly RULE_throwStatement = 23;
  public static readonly RULE_assert = 24;
  public static readonly RULE_returnStatement = 25;
  public static readonly RULE_elseIfClause = 26;
  public static readonly RULE_elseClause = 27;
  public static readonly RULE_catchStatement = 28;
  public static readonly RULE_constructorMember = 29;
  public static readonly RULE_property = 30;
  public static readonly RULE_functionMethod = 31;
  public static readonly RULE_procedureMethod = 32;
  public static readonly RULE_abstractFunction = 33;
  public static readonly RULE_abstractProcedure = 34;
  public static readonly RULE_identifierDef = 35;
  public static readonly RULE_identifierUse = 36;
  public static readonly RULE_assignable = 37;
  public static readonly RULE_methodName = 38;
  public static readonly RULE_testName = 39;
  public static readonly RULE_typeName = 40;
  public static readonly RULE_constantValue = 41;
  public static readonly RULE_argList = 42;
  public static readonly RULE_argument = 43;
  public static readonly RULE_paramsList = 44;
  public static readonly RULE_type = 45;
  public static readonly RULE_enumValuesList = 46;
  public static readonly RULE_assertActual = 47;
  public static readonly RULE_litValue = 48;
  public static readonly RULE_litBoolean = 49;
  public static readonly RULE_litInt = 50;
  public static readonly RULE_litFloat = 51;
  public static readonly RULE_litString = 52;
  public static readonly RULE_enumValue = 53;
  public static readonly RULE_litRegExp = 54;
  public static readonly RULE_index = 55;
  public static readonly RULE_expression = 56;
  public static readonly RULE_ifClause = 57;
  public static readonly RULE_term = 58;
  public static readonly RULE_chainHead = 59;
  public static readonly RULE_chainTail = 60;
  public static readonly RULE_chainable = 61;
  public static readonly RULE_thisInstance = 62;
  public static readonly RULE_bracketedExpression = 63;
  public static readonly RULE_unaryExpression = 64;
  public static readonly RULE_binaryExpression = 65;
  public static readonly RULE_tuple = 66;
  public static readonly RULE_dictionary = 67;
  public static readonly RULE_kvpList = 68;
  public static readonly RULE_kvp = 69;
  public static readonly RULE_methodCall = 70;
  public static readonly RULE_binaryOperator = 71;
  public static readonly RULE_newInstance = 72;
  public static readonly RULE_paramDef = 73;
  public static readonly RULE_typeGeneric = 74;
  public static readonly RULE_typeFunc = 75;
  public static readonly RULE_typeTuple = 76;
  public static readonly RULE_lambda = 77;
  public static readonly RULE_list = 78;
  public static readonly RULE_interpolatedString = 79;

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
    "'f'",
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
    "INTERPOLATED_STRING_PREFIX",
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
    "LITERAL_REGEXP",
    "LITERAL_STRING",
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
    "tryStatement",
    "throwStatement",
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
    "paramsList",
    "type",
    "enumValuesList",
    "assertActual",
    "litValue",
    "litBoolean",
    "litInt",
    "litFloat",
    "litString",
    "enumValue",
    "litRegExp",
    "index",
    "expression",
    "ifClause",
    "term",
    "chainHead",
    "chainTail",
    "chainable",
    "thisInstance",
    "bracketedExpression",
    "unaryExpression",
    "binaryExpression",
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
    "list",
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
        this.state = 161;
        this.errorHandler.sync(this);
        switch (this.interpreter.adaptivePredict(this.tokenStream, 0, this.context)) {
          case 1:
            {
              this.state = 160;
              this.comment();
            }
            break;
        }
        this.state = 166;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (_la === 1 || _la === 47 || _la === 98 || _la === 124) {
          {
            {
              this.state = 163;
              this.global();
            }
          }
          this.state = 168;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 172;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (_la === 96) {
          {
            {
              this.state = 169;
              this.match(PythonParser.NL);
            }
          }
          this.state = 174;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 175;
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
      this.state = 186;
      this.errorHandler.sync(this);
      switch (this.interpreter.adaptivePredict(this.tokenStream, 3, this.context)) {
        case 1:
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 177;
            this.main();
          }
          break;
        case 2:
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 178;
            this.function_();
          }
          break;
        case 3:
          this.enterOuterAlt(localContext, 3);
          {
            this.state = 179;
            this.test();
          }
          break;
        case 4:
          this.enterOuterAlt(localContext, 4);
          {
            this.state = 180;
            this.procedure();
          }
          break;
        case 5:
          this.enterOuterAlt(localContext, 5);
          {
            this.state = 181;
            this.constant();
          }
          break;
        case 6:
          this.enterOuterAlt(localContext, 6);
          {
            this.state = 182;
            this.enum_();
          }
          break;
        case 7:
          this.enterOuterAlt(localContext, 7);
          {
            this.state = 183;
            this.concreteClass();
          }
          break;
        case 8:
          this.enterOuterAlt(localContext, 8);
          {
            this.state = 184;
            this.abstractClass();
          }
          break;
        case 9:
          this.enterOuterAlt(localContext, 9);
          {
            this.state = 185;
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
    try {
      let alternative: number;
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 188;
        this.match(PythonParser.DEF);
        this.state = 189;
        this.match(PythonParser.MAIN);
        this.state = 190;
        this.match(PythonParser.OPEN_BRACKET);
        this.state = 191;
        this.match(PythonParser.CLOSE_BRACKET);
        this.state = 192;
        this.match(PythonParser.CLOSE_BRACKET);
        this.state = 193;
        this.match(PythonParser.ARROW);
        this.state = 194;
        this.match(PythonParser.NONE);
        this.state = 195;
        this.match(PythonParser.COLON);
        this.state = 196;
        this.match(PythonParser.NL);
        this.state = 200;
        this.errorHandler.sync(this);
        alternative = this.interpreter.adaptivePredict(this.tokenStream, 4, this.context);
        while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
          if (alternative === 1) {
            {
              {
                this.state = 197;
                this.ordinaryStatement();
              }
            }
          }
          this.state = 202;
          this.errorHandler.sync(this);
          alternative = this.interpreter.adaptivePredict(this.tokenStream, 4, this.context);
        }
        this.state = 203;
        this.match(PythonParser.COMMENT);
        this.state = 204;
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
        this.state = 206;
        this.match(PythonParser.DEF);
        this.state = 207;
        this.methodName();
        this.state = 208;
        this.match(PythonParser.OPEN_BRACKET);
        this.state = 210;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 98) {
          {
            this.state = 209;
            this.paramsList();
          }
        }

        this.state = 212;
        this.match(PythonParser.CLOSE_BRACKET);
        this.state = 213;
        this.match(PythonParser.ARROW);
        this.state = 214;
        this.type_();
        this.state = 215;
        this.match(PythonParser.COLON);
        this.state = 216;
        this.match(PythonParser.FUNCTION_ANNOTATION);
        this.state = 217;
        this.match(PythonParser.NL);
        this.state = 221;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (
          ((_la & ~0x1f) === 0 && ((1 << _la) & 26720) !== 0) ||
          (((_la - 52) & ~0x1f) === 0 && ((1 << (_la - 52)) & 683675121) !== 0) ||
          (((_la - 98) & ~0x1f) === 0 && ((1 << (_la - 98)) & 67110079) !== 0)
        ) {
          {
            {
              this.state = 218;
              this.ordinaryStatement();
            }
          }
          this.state = 223;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 224;
        this.returnStatement();
        this.state = 225;
        this.match(PythonParser.COMMENT);
        this.state = 226;
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
    try {
      let alternative: number;
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 228;
        this.match(PythonParser.CLASS);
        this.state = 229;
        this.testName();
        this.state = 230;
        this.match(PythonParser.OPEN_BRACKET);
        this.state = 231;
        this.match(PythonParser.TESTCASE);
        this.state = 232;
        this.match(PythonParser.CLOSE_BRACKET);
        this.state = 233;
        this.match(PythonParser.COMMENT);
        this.state = 234;
        this.match(PythonParser.NL);
        this.state = 240;
        this.errorHandler.sync(this);
        alternative = this.interpreter.adaptivePredict(this.tokenStream, 8, this.context);
        while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
          if (alternative === 1) {
            {
              this.state = 238;
              this.errorHandler.sync(this);
              switch (this.tokenStream.LA(1)) {
                case PythonParser.THIS_INSTANCE:
                  {
                    this.state = 235;
                    this.assert();
                  }
                  break;
                case PythonParser.NAME_STARTING_LC:
                  {
                    this.state = 236;
                    this.variableDefinition();
                  }
                  break;
                case PythonParser.COMMENT:
                  {
                    this.state = 237;
                    this.comment();
                  }
                  break;
                default:
                  throw new antlr.NoViableAltException(this);
              }
            }
          }
          this.state = 242;
          this.errorHandler.sync(this);
          alternative = this.interpreter.adaptivePredict(this.tokenStream, 8, this.context);
        }
        this.state = 243;
        this.match(PythonParser.COMMENT);
        this.state = 244;
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
        this.state = 246;
        this.match(PythonParser.DEF);
        this.state = 247;
        this.methodName();
        this.state = 248;
        this.match(PythonParser.OPEN_BRACKET);
        this.state = 250;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 98) {
          {
            this.state = 249;
            this.paramsList();
          }
        }

        this.state = 252;
        this.match(PythonParser.CLOSE_BRACKET);
        this.state = 253;
        this.match(PythonParser.ARROW);
        this.state = 254;
        this.match(PythonParser.NONE);
        this.state = 255;
        this.match(PythonParser.COLON);
        this.state = 256;
        this.match(PythonParser.PROCECDURE_ANNOTATION);
        this.state = 257;
        this.match(PythonParser.NL);
        this.state = 261;
        this.errorHandler.sync(this);
        alternative = this.interpreter.adaptivePredict(this.tokenStream, 10, this.context);
        while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
          if (alternative === 1) {
            {
              {
                this.state = 258;
                this.ordinaryStatement();
              }
            }
          }
          this.state = 263;
          this.errorHandler.sync(this);
          alternative = this.interpreter.adaptivePredict(this.tokenStream, 10, this.context);
        }
        this.state = 264;
        this.match(PythonParser.COMMENT);
        this.state = 265;
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
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 267;
        this.identifierDef();
        this.state = 268;
        this.match(PythonParser.EQUAL);
        this.state = 269;
        this.constantValue();
        this.state = 270;
        this.match(PythonParser.CONSTANT_ANNOTATION);
        this.state = 271;
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
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 273;
        this.match(PythonParser.CLASS);
        this.state = 274;
        this.typeName();
        this.state = 275;
        this.match(PythonParser.OPEN_BRACKET);
        this.state = 276;
        this.match(PythonParser.ENUM);
        this.state = 277;
        this.match(PythonParser.CLOSE_BRACKET);
        this.state = 278;
        this.match(PythonParser.COLON);
        this.state = 279;
        this.match(PythonParser.ENUM_ANNOTATION);
        this.state = 280;
        this.match(PythonParser.NL);
        this.state = 281;
        this.enumValuesList();
        this.state = 282;
        this.match(PythonParser.NL);
        this.state = 283;
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
        this.state = 285;
        this.match(PythonParser.CLASS);
        this.state = 286;
        this.typeName();
        this.state = 291;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 81) {
          {
            this.state = 287;
            this.match(PythonParser.OPEN_BRACKET);
            this.state = 288;
            this.typeName();
            this.state = 289;
            this.match(PythonParser.CLOSE_BRACKET);
          }
        }

        this.state = 293;
        this.match(PythonParser.COLON);
        this.state = 294;
        this.match(PythonParser.CONCRETE_CLASS_ANNOTATION);
        this.state = 295;
        this.match(PythonParser.NL);
        this.state = 303;
        this.errorHandler.sync(this);
        alternative = this.interpreter.adaptivePredict(this.tokenStream, 13, this.context);
        while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
          if (alternative === 1) {
            {
              this.state = 301;
              this.errorHandler.sync(this);
              switch (this.interpreter.adaptivePredict(this.tokenStream, 12, this.context)) {
                case 1:
                  {
                    this.state = 296;
                    this.constructorMember();
                  }
                  break;
                case 2:
                  {
                    this.state = 297;
                    this.property();
                  }
                  break;
                case 3:
                  {
                    this.state = 298;
                    this.functionMethod();
                  }
                  break;
                case 4:
                  {
                    this.state = 299;
                    this.procedureMethod();
                  }
                  break;
                case 5:
                  {
                    this.state = 300;
                    this.comment();
                  }
                  break;
              }
            }
          }
          this.state = 305;
          this.errorHandler.sync(this);
          alternative = this.interpreter.adaptivePredict(this.tokenStream, 13, this.context);
        }
        this.state = 306;
        this.match(PythonParser.COMMENT);
        this.state = 307;
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
    try {
      let alternative: number;
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 309;
        this.match(PythonParser.CLASS);
        this.state = 310;
        this.typeName();
        this.state = 315;
        this.errorHandler.sync(this);
        switch (this.tokenStream.LA(1)) {
          case PythonParser.OPEN_BRACKET:
            {
              this.state = 311;
              this.match(PythonParser.OPEN_BRACKET);
              this.state = 312;
              this.typeName();
            }
            break;
          case PythonParser.ABC:
            {
              this.state = 313;
              this.match(PythonParser.ABC);
              this.state = 314;
              this.match(PythonParser.CLOSE_BRACKET);
            }
            break;
          default:
            throw new antlr.NoViableAltException(this);
        }
        this.state = 317;
        this.match(PythonParser.ABSTRACT_CLASS_ANNOTATION);
        this.state = 318;
        this.match(PythonParser.NL);
        this.state = 327;
        this.errorHandler.sync(this);
        alternative = this.interpreter.adaptivePredict(this.tokenStream, 16, this.context);
        while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
          if (alternative === 1) {
            {
              this.state = 325;
              this.errorHandler.sync(this);
              switch (this.interpreter.adaptivePredict(this.tokenStream, 15, this.context)) {
                case 1:
                  {
                    this.state = 319;
                    this.property();
                  }
                  break;
                case 2:
                  {
                    this.state = 320;
                    this.functionMethod();
                  }
                  break;
                case 3:
                  {
                    this.state = 321;
                    this.procedureMethod();
                  }
                  break;
                case 4:
                  {
                    this.state = 322;
                    this.abstractFunction();
                  }
                  break;
                case 5:
                  {
                    this.state = 323;
                    this.abstractProcedure();
                  }
                  break;
                case 6:
                  {
                    this.state = 324;
                    this.comment();
                  }
                  break;
              }
            }
          }
          this.state = 329;
          this.errorHandler.sync(this);
          alternative = this.interpreter.adaptivePredict(this.tokenStream, 16, this.context);
        }
        this.state = 330;
        this.match(PythonParser.COMMENT);
        this.state = 331;
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
        this.state = 333;
        this.commentText();
        this.state = 334;
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
        this.state = 336;
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
      this.state = 349;
      this.errorHandler.sync(this);
      switch (this.interpreter.adaptivePredict(this.tokenStream, 17, this.context)) {
        case 1:
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 338;
            this.print();
          }
          break;
        case 2:
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 339;
            this.variableDefinition();
          }
          break;
        case 3:
          this.enterOuterAlt(localContext, 3);
          {
            this.state = 340;
            this.assignment();
          }
          break;
        case 4:
          this.enterOuterAlt(localContext, 4);
          {
            this.state = 341;
            this.inputStatement();
          }
          break;
        case 5:
          this.enterOuterAlt(localContext, 5);
          {
            this.state = 342;
            this.ifStatement();
          }
          break;
        case 6:
          this.enterOuterAlt(localContext, 6);
          {
            this.state = 343;
            this.whileLoop();
          }
          break;
        case 7:
          this.enterOuterAlt(localContext, 7);
          {
            this.state = 344;
            this.forLoop();
          }
          break;
        case 8:
          this.enterOuterAlt(localContext, 8);
          {
            this.state = 345;
            this.procedureCall();
          }
          break;
        case 9:
          this.enterOuterAlt(localContext, 9);
          {
            this.state = 346;
            this.tryStatement();
          }
          break;
        case 10:
          this.enterOuterAlt(localContext, 10);
          {
            this.state = 347;
            this.throwStatement();
          }
          break;
        case 11:
          this.enterOuterAlt(localContext, 11);
          {
            this.state = 348;
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
        this.state = 351;
        this.match(PythonParser.PRINT);
        this.state = 352;
        this.match(PythonParser.OPEN_BRACKET);
        this.state = 354;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (
          (((_la - 55) & ~0x1f) === 0 && ((1 << (_la - 55)) & 85461503) !== 0) ||
          (((_la - 87) & ~0x1f) === 0 && ((1 << (_la - 87)) & 391169) !== 0)
        ) {
          {
            this.state = 353;
            this.expression(0);
          }
        }

        this.state = 356;
        this.match(PythonParser.CLOSE_BRACKET);
        this.state = 357;
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
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 359;
        this.identifierDef();
        this.state = 360;
        this.match(PythonParser.EQUAL);
        this.state = 361;
        this.expression(0);
        this.state = 362;
        this.match(PythonParser.VARIABLE_ANNOTATION);
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
  public assignment(): AssignmentContext {
    let localContext = new AssignmentContext(this.context, this.state);
    this.enterRule(localContext, 30, PythonParser.RULE_assignment);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 365;
        this.assignable(0);
        this.state = 366;
        this.match(PythonParser.EQUAL);
        this.state = 367;
        this.expression(0);
        this.state = 368;
        this.match(PythonParser.ASSIGNMENT_ANNOTATION);
        this.state = 369;
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
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 371;
        this.identifierDef();
        this.state = 372;
        this.match(PythonParser.EQUAL);
        this.state = 373;
        this.match(PythonParser.INPUT);
        this.state = 374;
        this.match(PythonParser.OPEN_BRACKET);
        this.state = 375;
        this.expression(0);
        this.state = 376;
        this.match(PythonParser.CLOSE_BRACKET);
        this.state = 377;
        this.match(PythonParser.INPUT_ANNOTATION);
        this.state = 378;
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
    try {
      let alternative: number;
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 380;
        this.match(PythonParser.IF);
        this.state = 381;
        this.expression(0);
        this.state = 382;
        this.match(PythonParser.COLON);
        this.state = 383;
        this.match(PythonParser.NL);
        this.state = 389;
        this.errorHandler.sync(this);
        alternative = this.interpreter.adaptivePredict(this.tokenStream, 20, this.context);
        while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
          if (alternative === 1) {
            {
              this.state = 387;
              this.errorHandler.sync(this);
              switch (this.tokenStream.LA(1)) {
                case PythonParser.ELIF:
                  {
                    this.state = 384;
                    this.elseIfClause();
                  }
                  break;
                case PythonParser.ELSE:
                  {
                    this.state = 385;
                    this.elseClause();
                  }
                  break;
                case PythonParser.FOR:
                case PythonParser.IF:
                case PythonParser.PRINT:
                case PythonParser.TRY:
                case PythonParser.WHILE:
                case PythonParser.RAISE:
                case PythonParser.INT_NAME:
                case PythonParser.FLOAT_NAME:
                case PythonParser.BOOL_NAME:
                case PythonParser.STRING_NAME:
                case PythonParser.LIST_NAME:
                case PythonParser.TRUE:
                case PythonParser.FALSE:
                case PythonParser.INTERPOLATED_STRING_PREFIX:
                case PythonParser.THIS_INSTANCE:
                case PythonParser.OPEN_SQ_BRACKET:
                case PythonParser.OPEN_BRACKET:
                case PythonParser.NAME_STARTING_LC:
                case PythonParser.NAME_STARTING_UC:
                case PythonParser.LITERAL_BINARY:
                case PythonParser.LITERAL_HEX:
                case PythonParser.LITERAL_INTEGER:
                case PythonParser.LITERAL_FLOAT:
                case PythonParser.LITERAL_STRING:
                case PythonParser.GHOSTED:
                case PythonParser.COMMENT:
                  {
                    this.state = 386;
                    this.ordinaryStatement();
                  }
                  break;
                default:
                  throw new antlr.NoViableAltException(this);
              }
            }
          }
          this.state = 391;
          this.errorHandler.sync(this);
          alternative = this.interpreter.adaptivePredict(this.tokenStream, 20, this.context);
        }
        this.state = 392;
        this.match(PythonParser.COMMENT);
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
  public whileLoop(): WhileLoopContext {
    let localContext = new WhileLoopContext(this.context, this.state);
    this.enterRule(localContext, 36, PythonParser.RULE_whileLoop);
    try {
      let alternative: number;
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 395;
        this.match(PythonParser.WHILE);
        this.state = 396;
        this.expression(0);
        this.state = 397;
        this.match(PythonParser.COLON);
        this.state = 398;
        this.match(PythonParser.NL);
        this.state = 402;
        this.errorHandler.sync(this);
        alternative = this.interpreter.adaptivePredict(this.tokenStream, 21, this.context);
        while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
          if (alternative === 1) {
            {
              {
                this.state = 399;
                this.ordinaryStatement();
              }
            }
          }
          this.state = 404;
          this.errorHandler.sync(this);
          alternative = this.interpreter.adaptivePredict(this.tokenStream, 21, this.context);
        }
        this.state = 405;
        this.match(PythonParser.COMMENT);
        this.state = 406;
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
    try {
      let alternative: number;
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 408;
        this.match(PythonParser.FOR);
        this.state = 409;
        this.identifierDef();
        this.state = 410;
        this.match(PythonParser.IN);
        this.state = 411;
        this.expression(0);
        this.state = 412;
        this.match(PythonParser.COLON);
        this.state = 413;
        this.match(PythonParser.NL);
        this.state = 417;
        this.errorHandler.sync(this);
        alternative = this.interpreter.adaptivePredict(this.tokenStream, 22, this.context);
        while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
          if (alternative === 1) {
            {
              {
                this.state = 414;
                this.ordinaryStatement();
              }
            }
          }
          this.state = 419;
          this.errorHandler.sync(this);
          alternative = this.interpreter.adaptivePredict(this.tokenStream, 22, this.context);
        }
        this.state = 420;
        this.match(PythonParser.COMMENT);
        this.state = 421;
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
        this.state = 424;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 108) {
          {
            this.state = 423;
            this.match(PythonParser.GHOSTED);
          }
        }

        this.state = 426;
        this.procRef();
        this.state = 427;
        this.match(PythonParser.OPEN_BRACKET);
        this.state = 428;
        this.argList();
        this.state = 429;
        this.match(PythonParser.CLOSE_BRACKET);
        this.state = 430;
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
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 432;
        this.term();
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
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
    this.enterRule(localContext, 44, PythonParser.RULE_tryStatement);
    let _la: number;
    try {
      let alternative: number;
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 434;
        this.match(PythonParser.TRY);
        this.state = 435;
        this.match(PythonParser.NL);
        this.state = 439;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (
          ((_la & ~0x1f) === 0 && ((1 << _la) & 26720) !== 0) ||
          (((_la - 52) & ~0x1f) === 0 && ((1 << (_la - 52)) & 683675121) !== 0) ||
          (((_la - 98) & ~0x1f) === 0 && ((1 << (_la - 98)) & 67110079) !== 0)
        ) {
          {
            {
              this.state = 436;
              this.ordinaryStatement();
            }
          }
          this.state = 441;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 442;
        this.catchStatement();
        this.state = 446;
        this.errorHandler.sync(this);
        alternative = this.interpreter.adaptivePredict(this.tokenStream, 25, this.context);
        while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
          if (alternative === 1) {
            {
              {
                this.state = 443;
                this.ordinaryStatement();
              }
            }
          }
          this.state = 448;
          this.errorHandler.sync(this);
          alternative = this.interpreter.adaptivePredict(this.tokenStream, 25, this.context);
        }
        this.state = 449;
        this.match(PythonParser.COMMENT);
        this.state = 450;
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
    this.enterRule(localContext, 46, PythonParser.RULE_throwStatement);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 452;
        this.match(PythonParser.RAISE);
        this.state = 453;
        this.typeName();
        this.state = 454;
        this.match(PythonParser.OPEN_BRACKET);
        this.state = 455;
        this.litString();
        this.state = 456;
        this.match(PythonParser.CLOSE_BRACKET);
        this.state = 457;
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
  public assert(): AssertContext {
    let localContext = new AssertContext(this.context, this.state);
    this.enterRule(localContext, 48, PythonParser.RULE_assert);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 459;
        this.match(PythonParser.THIS_INSTANCE);
        this.state = 460;
        this.match(PythonParser.DOT);
        this.state = 461;
        this.match(PythonParser.ASSERT_EQUAL);
        this.state = 462;
        this.match(PythonParser.OPEN_BRACKET);
        this.state = 463;
        this.assertActual();
        this.state = 464;
        this.match(PythonParser.COMMA);
        this.state = 465;
        this.expression(0);
        this.state = 466;
        this.match(PythonParser.CLOSE_BRACKET);
        this.state = 467;
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
    this.enterRule(localContext, 50, PythonParser.RULE_returnStatement);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 469;
        this.match(PythonParser.RETURN);
        this.state = 470;
        this.expression(0);
        this.state = 471;
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
    this.enterRule(localContext, 52, PythonParser.RULE_elseIfClause);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 473;
        this.match(PythonParser.ELIF);
        this.state = 474;
        this.expression(0);
        this.state = 475;
        this.match(PythonParser.COLON);
        this.state = 476;
        this.match(PythonParser.ELSE_IF_ANNOTATION);
        this.state = 477;
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
    this.enterRule(localContext, 54, PythonParser.RULE_elseClause);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 479;
        this.match(PythonParser.ELSE);
        this.state = 480;
        this.match(PythonParser.COLON);
        this.state = 481;
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
    this.enterRule(localContext, 56, PythonParser.RULE_catchStatement);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 483;
        this.match(PythonParser.EXCEPT);
        this.state = 484;
        this.typeName();
        this.state = 485;
        this.match(PythonParser.AS);
        this.state = 486;
        this.identifierDef();
        this.state = 487;
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
    this.enterRule(localContext, 58, PythonParser.RULE_constructorMember);
    let _la: number;
    try {
      let alternative: number;
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 489;
        this.match(PythonParser.DEF);
        this.state = 490;
        this.match(PythonParser.INIT);
        this.state = 491;
        this.match(PythonParser.OPEN_BRACKET);
        this.state = 493;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 98) {
          {
            this.state = 492;
            this.paramsList();
          }
        }

        this.state = 495;
        this.match(PythonParser.CLOSE_BRACKET);
        this.state = 496;
        this.match(PythonParser.ARROW);
        this.state = 497;
        this.match(PythonParser.NONE);
        this.state = 498;
        this.match(PythonParser.COLON);
        this.state = 499;
        this.match(PythonParser.NL);
        this.state = 503;
        this.errorHandler.sync(this);
        alternative = this.interpreter.adaptivePredict(this.tokenStream, 27, this.context);
        while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
          if (alternative === 1) {
            {
              {
                this.state = 500;
                this.ordinaryStatement();
              }
            }
          }
          this.state = 505;
          this.errorHandler.sync(this);
          alternative = this.interpreter.adaptivePredict(this.tokenStream, 27, this.context);
        }
        this.state = 506;
        this.match(PythonParser.COMMENT);
        this.state = 507;
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
    this.enterRule(localContext, 60, PythonParser.RULE_property);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 509;
        this.identifierDef();
        this.state = 510;
        this.match(PythonParser.COLON);
        this.state = 511;
        this.type_();
        this.state = 512;
        this.match(PythonParser.PROPERTY_ANNOTATION);
        this.state = 513;
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
    this.enterRule(localContext, 62, PythonParser.RULE_functionMethod);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 515;
        this.match(PythonParser.DEF);
        this.state = 516;
        this.methodName();
        this.state = 517;
        this.match(PythonParser.OPEN_BRACKET);
        this.state = 519;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 98) {
          {
            this.state = 518;
            this.paramsList();
          }
        }

        this.state = 521;
        this.match(PythonParser.CLOSE_BRACKET);
        this.state = 522;
        this.match(PythonParser.ARROW);
        this.state = 523;
        this.type_();
        this.state = 524;
        this.match(PythonParser.COLON);
        this.state = 525;
        this.match(PythonParser.FUNCTION_METHOD_ANNOTATION);
        this.state = 526;
        this.match(PythonParser.NL);
        this.state = 530;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (
          ((_la & ~0x1f) === 0 && ((1 << _la) & 26720) !== 0) ||
          (((_la - 52) & ~0x1f) === 0 && ((1 << (_la - 52)) & 683675121) !== 0) ||
          (((_la - 98) & ~0x1f) === 0 && ((1 << (_la - 98)) & 67110079) !== 0)
        ) {
          {
            {
              this.state = 527;
              this.ordinaryStatement();
            }
          }
          this.state = 532;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 533;
        this.returnStatement();
        this.state = 534;
        this.match(PythonParser.COMMENT);
        this.state = 535;
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
    this.enterRule(localContext, 64, PythonParser.RULE_procedureMethod);
    let _la: number;
    try {
      let alternative: number;
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 537;
        this.match(PythonParser.DEF);
        this.state = 538;
        this.methodName();
        this.state = 539;
        this.match(PythonParser.OPEN_BRACKET);
        this.state = 541;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 98) {
          {
            this.state = 540;
            this.paramsList();
          }
        }

        this.state = 543;
        this.match(PythonParser.CLOSE_BRACKET);
        this.state = 544;
        this.match(PythonParser.ARROW);
        this.state = 545;
        this.match(PythonParser.NONE);
        this.state = 546;
        this.match(PythonParser.COLON);
        this.state = 547;
        this.match(PythonParser.PROCEDURE_METHOD_ANNOTATION);
        this.state = 548;
        this.match(PythonParser.NL);
        this.state = 552;
        this.errorHandler.sync(this);
        alternative = this.interpreter.adaptivePredict(this.tokenStream, 31, this.context);
        while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
          if (alternative === 1) {
            {
              {
                this.state = 549;
                this.ordinaryStatement();
              }
            }
          }
          this.state = 554;
          this.errorHandler.sync(this);
          alternative = this.interpreter.adaptivePredict(this.tokenStream, 31, this.context);
        }
        this.state = 555;
        this.match(PythonParser.COMMENT);
        this.state = 556;
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
    this.enterRule(localContext, 66, PythonParser.RULE_abstractFunction);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 558;
        this.match(PythonParser.ABSTRACT_METHOD);
        this.state = 559;
        this.match(PythonParser.NL);
        this.state = 560;
        this.match(PythonParser.DEF);
        this.state = 561;
        this.methodName();
        this.state = 562;
        this.match(PythonParser.OPEN_BRACKET);
        this.state = 564;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 98) {
          {
            this.state = 563;
            this.paramsList();
          }
        }

        this.state = 566;
        this.match(PythonParser.CLOSE_BRACKET);
        this.state = 567;
        this.match(PythonParser.ARROW);
        this.state = 568;
        this.type_();
        this.state = 569;
        this.match(PythonParser.COLON);
        this.state = 570;
        this.match(PythonParser.NL);
        this.state = 571;
        this.match(PythonParser.PASS);
        this.state = 572;
        this.match(PythonParser.COMMENT);
        this.state = 573;
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
    this.enterRule(localContext, 68, PythonParser.RULE_abstractProcedure);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 575;
        this.match(PythonParser.ABSTRACT_METHOD);
        this.state = 576;
        this.match(PythonParser.NL);
        this.state = 577;
        this.match(PythonParser.DEF);
        this.state = 578;
        this.methodName();
        this.state = 579;
        this.match(PythonParser.OPEN_BRACKET);
        this.state = 581;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 98) {
          {
            this.state = 580;
            this.paramsList();
          }
        }

        this.state = 583;
        this.match(PythonParser.CLOSE_BRACKET);
        this.state = 584;
        this.match(PythonParser.ARROW);
        this.state = 585;
        this.match(PythonParser.NONE);
        this.state = 586;
        this.match(PythonParser.COLON);
        this.state = 587;
        this.match(PythonParser.NL);
        this.state = 588;
        this.match(PythonParser.PASS);
        this.state = 589;
        this.match(PythonParser.COMMENT);
        this.state = 590;
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
    this.enterRule(localContext, 70, PythonParser.RULE_identifierDef);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 592;
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
    this.enterRule(localContext, 72, PythonParser.RULE_identifierUse);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 594;
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
    let _startState = 74;
    this.enterRecursionRule(localContext, 74, PythonParser.RULE_assignable, _p);
    try {
      let alternative: number;
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 601;
        this.errorHandler.sync(this);
        switch (this.tokenStream.LA(1)) {
          case PythonParser.NAME_STARTING_LC:
            {
              this.state = 597;
              this.identifierUse();
            }
            break;
          case PythonParser.THIS_INSTANCE:
            {
              this.state = 598;
              this.match(PythonParser.THIS_INSTANCE);
              this.state = 599;
              this.match(PythonParser.DOT);
              this.state = 600;
              this.identifierUse();
            }
            break;
          default:
            throw new antlr.NoViableAltException(this);
        }
        this.context!.stop = this.tokenStream.LT(-1);
        this.state = 607;
        this.errorHandler.sync(this);
        alternative = this.interpreter.adaptivePredict(this.tokenStream, 35, this.context);
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
                this.state = 603;
                if (!this.precpred(this.context, 1)) {
                  throw this.createFailedPredicateException("this.precpred(this.context, 1)");
                }
                this.state = 604;
                this.index();
              }
            }
          }
          this.state = 609;
          this.errorHandler.sync(this);
          alternative = this.interpreter.adaptivePredict(this.tokenStream, 35, this.context);
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
    this.enterRule(localContext, 76, PythonParser.RULE_methodName);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 610;
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
    this.enterRule(localContext, 78, PythonParser.RULE_testName);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 612;
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
    this.enterRule(localContext, 80, PythonParser.RULE_typeName);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 614;
        _la = this.tokenStream.LA(1);
        if (!((((_la - 56) & ~0x1f) === 0 && ((1 << (_la - 56)) & 31) !== 0) || _la === 99)) {
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
    this.enterRule(localContext, 82, PythonParser.RULE_constantValue);
    try {
      this.state = 620;
      this.errorHandler.sync(this);
      switch (this.tokenStream.LA(1)) {
        case PythonParser.TRUE:
        case PythonParser.FALSE:
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 616;
            this.litBoolean();
          }
          break;
        case PythonParser.LITERAL_BINARY:
        case PythonParser.LITERAL_HEX:
        case PythonParser.LITERAL_INTEGER:
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 617;
            this.litInt();
          }
          break;
        case PythonParser.LITERAL_FLOAT:
          this.enterOuterAlt(localContext, 3);
          {
            this.state = 618;
            this.litFloat();
          }
          break;
        case PythonParser.INTERPOLATED_STRING_PREFIX:
        case PythonParser.LITERAL_STRING:
          this.enterOuterAlt(localContext, 4);
          {
            this.state = 619;
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
    this.enterRule(localContext, 84, PythonParser.RULE_argList);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 622;
        this.argument();
        this.state = 627;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (_la === 84) {
          {
            {
              this.state = 623;
              this.match(PythonParser.COMMA);
              this.state = 624;
              this.argument();
            }
          }
          this.state = 629;
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
    this.enterRule(localContext, 86, PythonParser.RULE_argument);
    try {
      this.state = 632;
      this.errorHandler.sync(this);
      switch (this.tokenStream.LA(1)) {
        case PythonParser.LAMBDA:
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 630;
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
        case PythonParser.INTERPOLATED_STRING_PREFIX:
        case PythonParser.THIS_INSTANCE:
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
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 631;
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
  public paramsList(): ParamsListContext {
    let localContext = new ParamsListContext(this.context, this.state);
    this.enterRule(localContext, 88, PythonParser.RULE_paramsList);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 634;
        this.paramDef();
        this.state = 639;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (_la === 84) {
          {
            {
              this.state = 635;
              this.match(PythonParser.COMMA);
              this.state = 636;
              this.paramDef();
            }
          }
          this.state = 641;
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
    this.enterRule(localContext, 90, PythonParser.RULE_type);
    try {
      this.state = 646;
      this.errorHandler.sync(this);
      switch (this.interpreter.adaptivePredict(this.tokenStream, 40, this.context)) {
        case 1:
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 642;
            this.typeTuple();
          }
          break;
        case 2:
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 643;
            this.typeName();
          }
          break;
        case 3:
          this.enterOuterAlt(localContext, 3);
          {
            this.state = 644;
            this.typeGeneric();
          }
          break;
        case 4:
          this.enterOuterAlt(localContext, 4);
          {
            this.state = 645;
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
  public enumValuesList(): EnumValuesListContext {
    let localContext = new EnumValuesListContext(this.context, this.state);
    this.enterRule(localContext, 92, PythonParser.RULE_enumValuesList);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 648;
        this.identifierDef();
        this.state = 653;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (_la === 84) {
          {
            {
              this.state = 649;
              this.match(PythonParser.COMMA);
              this.state = 650;
              this.identifierDef();
            }
          }
          this.state = 655;
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
  public assertActual(): AssertActualContext {
    let localContext = new AssertActualContext(this.context, this.state);
    this.enterRule(localContext, 94, PythonParser.RULE_assertActual);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 656;
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
  public litValue(): LitValueContext {
    let localContext = new LitValueContext(this.context, this.state);
    this.enterRule(localContext, 96, PythonParser.RULE_litValue);
    try {
      this.state = 663;
      this.errorHandler.sync(this);
      switch (this.tokenStream.LA(1)) {
        case PythonParser.TRUE:
        case PythonParser.FALSE:
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 658;
            this.litBoolean();
          }
          break;
        case PythonParser.LITERAL_BINARY:
        case PythonParser.LITERAL_HEX:
        case PythonParser.LITERAL_INTEGER:
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 659;
            this.litInt();
          }
          break;
        case PythonParser.LITERAL_FLOAT:
          this.enterOuterAlt(localContext, 3);
          {
            this.state = 660;
            this.litFloat();
          }
          break;
        case PythonParser.INTERPOLATED_STRING_PREFIX:
        case PythonParser.LITERAL_STRING:
          this.enterOuterAlt(localContext, 4);
          {
            this.state = 661;
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
            this.state = 662;
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
    this.enterRule(localContext, 98, PythonParser.RULE_litBoolean);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 665;
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
    this.enterRule(localContext, 100, PythonParser.RULE_litInt);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 667;
        _la = this.tokenStream.LA(1);
        if (!(((_la - 100) & ~0x1f) === 0 && ((1 << (_la - 100)) & 7) !== 0)) {
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
    this.enterRule(localContext, 102, PythonParser.RULE_litFloat);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 669;
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
    this.enterRule(localContext, 104, PythonParser.RULE_litString);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 672;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 74) {
          {
            this.state = 671;
            this.match(PythonParser.INTERPOLATED_STRING_PREFIX);
          }
        }

        this.state = 674;
        this.match(PythonParser.LITERAL_STRING);
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
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
    this.enterRule(localContext, 106, PythonParser.RULE_enumValue);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 676;
        this.typeName();
        this.state = 677;
        this.match(PythonParser.DOT);
        this.state = 678;
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
    this.enterRule(localContext, 108, PythonParser.RULE_litRegExp);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 680;
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
    this.enterRule(localContext, 110, PythonParser.RULE_index);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 682;
        this.match(PythonParser.OPEN_SQ_BRACKET);
        this.state = 683;
        this.expression(0);
        this.state = 684;
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
    let _startState = 112;
    this.enterRecursionRule(localContext, 112, PythonParser.RULE_expression, _p);
    try {
      let alternative: number;
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 691;
        this.errorHandler.sync(this);
        switch (this.interpreter.adaptivePredict(this.tokenStream, 44, this.context)) {
          case 1:
            {
              this.state = 687;
              this.newInstance();
            }
            break;
          case 2:
            {
              this.state = 688;
              this.unaryExpression();
            }
            break;
          case 3:
            {
              this.state = 689;
              this.term();
            }
            break;
          case 4:
            {
              this.state = 690;
              this.binaryExpression();
            }
            break;
        }
        this.context!.stop = this.tokenStream.LT(-1);
        this.state = 697;
        this.errorHandler.sync(this);
        alternative = this.interpreter.adaptivePredict(this.tokenStream, 45, this.context);
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
                this.state = 693;
                if (!this.precpred(this.context, 1)) {
                  throw this.createFailedPredicateException("this.precpred(this.context, 1)");
                }
                this.state = 694;
                this.ifClause();
              }
            }
          }
          this.state = 699;
          this.errorHandler.sync(this);
          alternative = this.interpreter.adaptivePredict(this.tokenStream, 45, this.context);
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
  public ifClause(): IfClauseContext {
    let localContext = new IfClauseContext(this.context, this.state);
    this.enterRule(localContext, 114, PythonParser.RULE_ifClause);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 700;
        this.match(PythonParser.IF);
        this.state = 701;
        this.expression(0);
        this.state = 706;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (_la === 2) {
          {
            {
              this.state = 702;
              this.match(PythonParser.ELIF);
              this.state = 703;
              this.expression(0);
            }
          }
          this.state = 708;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 709;
        this.match(PythonParser.ELSE);
        this.state = 710;
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
  public term(): TermContext {
    let localContext = new TermContext(this.context, this.state);
    this.enterRule(localContext, 116, PythonParser.RULE_term);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 712;
        this.chainHead();
        this.state = 714;
        this.errorHandler.sync(this);
        switch (this.interpreter.adaptivePredict(this.tokenStream, 47, this.context)) {
          case 1:
            {
              this.state = 713;
              this.chainTail();
            }
            break;
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
  public chainHead(): ChainHeadContext {
    let localContext = new ChainHeadContext(this.context, this.state);
    this.enterRule(localContext, 118, PythonParser.RULE_chainHead);
    try {
      this.state = 723;
      this.errorHandler.sync(this);
      switch (this.interpreter.adaptivePredict(this.tokenStream, 48, this.context)) {
        case 1:
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 716;
            this.thisInstance();
          }
          break;
        case 2:
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 717;
            this.bracketedExpression();
          }
          break;
        case 3:
          this.enterOuterAlt(localContext, 3);
          {
            this.state = 718;
            this.litValue();
          }
          break;
        case 4:
          this.enterOuterAlt(localContext, 4);
          {
            this.state = 719;
            this.list();
          }
          break;
        case 5:
          this.enterOuterAlt(localContext, 5);
          {
            this.state = 720;
            this.dictionary();
          }
          break;
        case 6:
          this.enterOuterAlt(localContext, 6);
          {
            this.state = 721;
            this.tuple();
          }
          break;
        case 7:
          this.enterOuterAlt(localContext, 7);
          {
            this.state = 722;
            this.chainable();
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
  public chainTail(): ChainTailContext {
    let localContext = new ChainTailContext(this.context, this.state);
    this.enterRule(localContext, 120, PythonParser.RULE_chainTail);
    try {
      let alternative: number;
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 727;
        this.errorHandler.sync(this);
        alternative = 1;
        do {
          switch (alternative) {
            case 1:
              {
                {
                  this.state = 725;
                  this.match(PythonParser.DOT);
                  this.state = 726;
                  this.chainable();
                }
              }
              break;
            default:
              throw new antlr.NoViableAltException(this);
          }
          this.state = 729;
          this.errorHandler.sync(this);
          alternative = this.interpreter.adaptivePredict(this.tokenStream, 49, this.context);
        } while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER);
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
        this.errorHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
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
        this.state = 733;
        this.errorHandler.sync(this);
        switch (this.interpreter.adaptivePredict(this.tokenStream, 50, this.context)) {
          case 1:
            {
              this.state = 731;
              this.identifierUse();
            }
            break;
          case 2:
            {
              this.state = 732;
              this.methodCall();
            }
            break;
        }
        this.state = 738;
        this.errorHandler.sync(this);
        alternative = this.interpreter.adaptivePredict(this.tokenStream, 51, this.context);
        while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
          if (alternative === 1) {
            {
              {
                this.state = 735;
                this.index();
              }
            }
          }
          this.state = 740;
          this.errorHandler.sync(this);
          alternative = this.interpreter.adaptivePredict(this.tokenStream, 51, this.context);
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
        this.state = 741;
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
        this.state = 743;
        this.match(PythonParser.OPEN_BRACKET);
        this.state = 744;
        this.expression(0);
        this.state = 745;
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
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 747;
        _la = this.tokenStream.LA(1);
        if (!(_la === 66 || _la === 87)) {
          this.errorHandler.recoverInline(this);
        } else {
          this.errorHandler.reportMatch(this);
          this.consume();
        }
        this.state = 748;
        this.term();
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
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
    this.enterRule(localContext, 130, PythonParser.RULE_binaryExpression);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 750;
        this.term();
        this.state = 751;
        this.binaryOperator();
        this.state = 752;
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
  public tuple(): TupleContext {
    let localContext = new TupleContext(this.context, this.state);
    this.enterRule(localContext, 132, PythonParser.RULE_tuple);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 754;
        this.match(PythonParser.OPEN_BRACKET);
        this.state = 755;
        this.expression(0);
        this.state = 756;
        this.match(PythonParser.COMMA);
        this.state = 757;
        this.expression(0);
        this.state = 762;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (_la === 84) {
          {
            {
              this.state = 758;
              this.match(PythonParser.COMMA);
              this.state = 759;
              this.expression(0);
            }
          }
          this.state = 764;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 765;
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
    this.enterRule(localContext, 134, PythonParser.RULE_dictionary);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 767;
        this.match(PythonParser.OPEN_SQ_BRACKET);
        this.state = 768;
        this.kvpList();
        this.state = 769;
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
  public kvpList(): KvpListContext {
    let localContext = new KvpListContext(this.context, this.state);
    this.enterRule(localContext, 136, PythonParser.RULE_kvpList);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 771;
        this.kvp();
        this.state = 776;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (_la === 84) {
          {
            {
              this.state = 772;
              this.match(PythonParser.COMMA);
              this.state = 773;
              this.kvp();
            }
          }
          this.state = 778;
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
    this.enterRule(localContext, 138, PythonParser.RULE_kvp);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 779;
        this.expression(0);
        this.state = 780;
        this.match(PythonParser.COLON);
        this.state = 781;
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
    this.enterRule(localContext, 140, PythonParser.RULE_methodCall);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 783;
        this.methodName();
        this.state = 784;
        this.match(PythonParser.OPEN_BRACKET);
        this.state = 786;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (
          _la === 9 ||
          (((_la - 55) & ~0x1f) === 0 && ((1 << (_la - 55)) & 85461503) !== 0) ||
          (((_la - 87) & ~0x1f) === 0 && ((1 << (_la - 87)) & 391169) !== 0)
        ) {
          {
            this.state = 785;
            this.argList();
          }
        }

        this.state = 788;
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
    this.enterRule(localContext, 142, PythonParser.RULE_binaryOperator);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 790;
        _la = this.tokenStream.LA(1);
        if (!(((_la - 64) & ~0x1f) === 0 && ((1 << (_la - 64)) & 1069547707) !== 0)) {
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
    this.enterRule(localContext, 144, PythonParser.RULE_newInstance);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 792;
        this.type_();
        this.state = 793;
        this.match(PythonParser.OPEN_BRACKET);
        this.state = 795;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (
          _la === 9 ||
          (((_la - 55) & ~0x1f) === 0 && ((1 << (_la - 55)) & 85461503) !== 0) ||
          (((_la - 87) & ~0x1f) === 0 && ((1 << (_la - 87)) & 391169) !== 0)
        ) {
          {
            this.state = 794;
            this.argList();
          }
        }

        this.state = 797;
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
    this.enterRule(localContext, 146, PythonParser.RULE_paramDef);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 799;
        this.identifierDef();
        this.state = 800;
        this.match(PythonParser.COLON);
        this.state = 801;
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
    this.enterRule(localContext, 148, PythonParser.RULE_typeGeneric);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 803;
        this.typeName();
        this.state = 804;
        this.match(PythonParser.OPEN_SQ_BRACKET);
        this.state = 805;
        this.type_();
        this.state = 810;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (_la === 84) {
          {
            {
              this.state = 806;
              this.match(PythonParser.COMMA);
              this.state = 807;
              this.type_();
            }
          }
          this.state = 812;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 813;
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
    this.enterRule(localContext, 150, PythonParser.RULE_typeFunc);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 815;
        this.match(PythonParser.FUNC_NAME);
        this.state = 816;
        this.match(PythonParser.OPEN_SQ_BRACKET);
        this.state = 817;
        this.match(PythonParser.OPEN_SQ_BRACKET);
        this.state = 818;
        this.type_();
        this.state = 823;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (_la === 84) {
          {
            {
              this.state = 819;
              this.match(PythonParser.COMMA);
              this.state = 820;
              this.type_();
            }
          }
          this.state = 825;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 826;
        this.match(PythonParser.CLOSE_SQ_BRACKET);
        this.state = 827;
        this.match(PythonParser.COMMA);
        this.state = 828;
        this.type_();
        this.state = 829;
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
    this.enterRule(localContext, 152, PythonParser.RULE_typeTuple);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 831;
        this.match(PythonParser.TUPLE);
        this.state = 832;
        this.match(PythonParser.OPEN_SQ_BRACKET);
        this.state = 833;
        this.type_();
        this.state = 836;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        do {
          {
            {
              this.state = 834;
              this.match(PythonParser.COMMA);
              this.state = 835;
              this.type_();
            }
          }
          this.state = 838;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        } while (_la === 84);
        this.state = 840;
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
    this.enterRule(localContext, 154, PythonParser.RULE_lambda);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 842;
        this.match(PythonParser.LAMBDA);
        this.state = 843;
        this.argList();
        this.state = 844;
        this.match(PythonParser.COLON);
        this.state = 845;
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
  public list(): ListContext {
    let localContext = new ListContext(this.context, this.state);
    this.enterRule(localContext, 156, PythonParser.RULE_list);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 847;
        this.match(PythonParser.OPEN_SQ_BRACKET);
        this.state = 848;
        this.expression(0);
        this.state = 853;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (_la === 84) {
          {
            {
              this.state = 849;
              this.match(PythonParser.COMMA);
              this.state = 850;
              this.expression(0);
            }
          }
          this.state = 855;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 856;
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
  public interpolatedString(): InterpolatedStringContext {
    let localContext = new InterpolatedStringContext(this.context, this.state);
    this.enterRule(localContext, 158, PythonParser.RULE_interpolatedString);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 858;
        this.match(PythonParser.INTERPOLATED_STRING_PREFIX);
        this.state = 859;
        this.match(PythonParser.LITERAL_STRING);
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
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
      case 37:
        return this.assignable_sempred(localContext as AssignableContext, predIndex);
      case 56:
        return this.expression_sempred(localContext as ExpressionContext, predIndex);
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

  public static readonly _serializedATN: number[] = [
    4, 1, 124, 862, 2, 0, 7, 0, 2, 1, 7, 1, 2, 2, 7, 2, 2, 3, 7, 3, 2, 4, 7, 4, 2, 5, 7, 5, 2, 6, 7,
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
    74, 2, 75, 7, 75, 2, 76, 7, 76, 2, 77, 7, 77, 2, 78, 7, 78, 2, 79, 7, 79, 1, 0, 3, 0, 162, 8, 0,
    1, 0, 5, 0, 165, 8, 0, 10, 0, 12, 0, 168, 9, 0, 1, 0, 5, 0, 171, 8, 0, 10, 0, 12, 0, 174, 9, 0,
    1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 1, 187, 8, 1, 1, 2, 1, 2,
    1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 5, 2, 199, 8, 2, 10, 2, 12, 2, 202, 9, 2, 1, 2,
    1, 2, 1, 2, 1, 3, 1, 3, 1, 3, 1, 3, 3, 3, 211, 8, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3,
    5, 3, 220, 8, 3, 10, 3, 12, 3, 223, 9, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 4, 1, 4, 1, 4, 1, 4, 1, 4,
    1, 4, 1, 4, 1, 4, 1, 4, 1, 4, 5, 4, 239, 8, 4, 10, 4, 12, 4, 242, 9, 4, 1, 4, 1, 4, 1, 4, 1, 5,
    1, 5, 1, 5, 1, 5, 3, 5, 251, 8, 5, 1, 5, 1, 5, 1, 5, 1, 5, 1, 5, 1, 5, 1, 5, 5, 5, 260, 8, 5,
    10, 5, 12, 5, 263, 9, 5, 1, 5, 1, 5, 1, 5, 1, 6, 1, 6, 1, 6, 1, 6, 1, 6, 1, 6, 1, 7, 1, 7, 1, 7,
    1, 7, 1, 7, 1, 7, 1, 7, 1, 7, 1, 7, 1, 7, 1, 7, 1, 7, 1, 8, 1, 8, 1, 8, 1, 8, 1, 8, 1, 8, 3, 8,
    292, 8, 8, 1, 8, 1, 8, 1, 8, 1, 8, 1, 8, 1, 8, 1, 8, 1, 8, 5, 8, 302, 8, 8, 10, 8, 12, 8, 305,
    9, 8, 1, 8, 1, 8, 1, 8, 1, 9, 1, 9, 1, 9, 1, 9, 1, 9, 1, 9, 3, 9, 316, 8, 9, 1, 9, 1, 9, 1, 9,
    1, 9, 1, 9, 1, 9, 1, 9, 1, 9, 5, 9, 326, 8, 9, 10, 9, 12, 9, 329, 9, 9, 1, 9, 1, 9, 1, 9, 1, 10,
    1, 10, 1, 10, 1, 11, 1, 11, 1, 12, 1, 12, 1, 12, 1, 12, 1, 12, 1, 12, 1, 12, 1, 12, 1, 12, 1,
    12, 1, 12, 3, 12, 350, 8, 12, 1, 13, 1, 13, 1, 13, 3, 13, 355, 8, 13, 1, 13, 1, 13, 1, 13, 1,
    14, 1, 14, 1, 14, 1, 14, 1, 14, 1, 14, 1, 15, 1, 15, 1, 15, 1, 15, 1, 15, 1, 15, 1, 16, 1, 16,
    1, 16, 1, 16, 1, 16, 1, 16, 1, 16, 1, 16, 1, 16, 1, 17, 1, 17, 1, 17, 1, 17, 1, 17, 1, 17, 1,
    17, 5, 17, 388, 8, 17, 10, 17, 12, 17, 391, 9, 17, 1, 17, 1, 17, 1, 17, 1, 18, 1, 18, 1, 18, 1,
    18, 1, 18, 5, 18, 401, 8, 18, 10, 18, 12, 18, 404, 9, 18, 1, 18, 1, 18, 1, 18, 1, 19, 1, 19, 1,
    19, 1, 19, 1, 19, 1, 19, 1, 19, 5, 19, 416, 8, 19, 10, 19, 12, 19, 419, 9, 19, 1, 19, 1, 19, 1,
    19, 1, 20, 3, 20, 425, 8, 20, 1, 20, 1, 20, 1, 20, 1, 20, 1, 20, 1, 20, 1, 21, 1, 21, 1, 22, 1,
    22, 1, 22, 5, 22, 438, 8, 22, 10, 22, 12, 22, 441, 9, 22, 1, 22, 1, 22, 5, 22, 445, 8, 22, 10,
    22, 12, 22, 448, 9, 22, 1, 22, 1, 22, 1, 22, 1, 23, 1, 23, 1, 23, 1, 23, 1, 23, 1, 23, 1, 23, 1,
    24, 1, 24, 1, 24, 1, 24, 1, 24, 1, 24, 1, 24, 1, 24, 1, 24, 1, 24, 1, 25, 1, 25, 1, 25, 1, 25,
    1, 26, 1, 26, 1, 26, 1, 26, 1, 26, 1, 26, 1, 27, 1, 27, 1, 27, 1, 27, 1, 28, 1, 28, 1, 28, 1,
    28, 1, 28, 1, 28, 1, 29, 1, 29, 1, 29, 1, 29, 3, 29, 494, 8, 29, 1, 29, 1, 29, 1, 29, 1, 29, 1,
    29, 1, 29, 5, 29, 502, 8, 29, 10, 29, 12, 29, 505, 9, 29, 1, 29, 1, 29, 1, 29, 1, 30, 1, 30, 1,
    30, 1, 30, 1, 30, 1, 30, 1, 31, 1, 31, 1, 31, 1, 31, 3, 31, 520, 8, 31, 1, 31, 1, 31, 1, 31, 1,
    31, 1, 31, 1, 31, 1, 31, 5, 31, 529, 8, 31, 10, 31, 12, 31, 532, 9, 31, 1, 31, 1, 31, 1, 31, 1,
    31, 1, 32, 1, 32, 1, 32, 1, 32, 3, 32, 542, 8, 32, 1, 32, 1, 32, 1, 32, 1, 32, 1, 32, 1, 32, 1,
    32, 5, 32, 551, 8, 32, 10, 32, 12, 32, 554, 9, 32, 1, 32, 1, 32, 1, 32, 1, 33, 1, 33, 1, 33, 1,
    33, 1, 33, 1, 33, 3, 33, 565, 8, 33, 1, 33, 1, 33, 1, 33, 1, 33, 1, 33, 1, 33, 1, 33, 1, 33, 1,
    33, 1, 34, 1, 34, 1, 34, 1, 34, 1, 34, 1, 34, 3, 34, 582, 8, 34, 1, 34, 1, 34, 1, 34, 1, 34, 1,
    34, 1, 34, 1, 34, 1, 34, 1, 34, 1, 35, 1, 35, 1, 36, 1, 36, 1, 37, 1, 37, 1, 37, 1, 37, 1, 37,
    3, 37, 602, 8, 37, 1, 37, 1, 37, 5, 37, 606, 8, 37, 10, 37, 12, 37, 609, 9, 37, 1, 38, 1, 38, 1,
    39, 1, 39, 1, 40, 1, 40, 1, 41, 1, 41, 1, 41, 1, 41, 3, 41, 621, 8, 41, 1, 42, 1, 42, 1, 42, 5,
    42, 626, 8, 42, 10, 42, 12, 42, 629, 9, 42, 1, 43, 1, 43, 3, 43, 633, 8, 43, 1, 44, 1, 44, 1,
    44, 5, 44, 638, 8, 44, 10, 44, 12, 44, 641, 9, 44, 1, 45, 1, 45, 1, 45, 1, 45, 3, 45, 647, 8,
    45, 1, 46, 1, 46, 1, 46, 5, 46, 652, 8, 46, 10, 46, 12, 46, 655, 9, 46, 1, 47, 1, 47, 1, 48, 1,
    48, 1, 48, 1, 48, 1, 48, 3, 48, 664, 8, 48, 1, 49, 1, 49, 1, 50, 1, 50, 1, 51, 1, 51, 1, 52, 3,
    52, 673, 8, 52, 1, 52, 1, 52, 1, 53, 1, 53, 1, 53, 1, 53, 1, 54, 1, 54, 1, 55, 1, 55, 1, 55, 1,
    55, 1, 56, 1, 56, 1, 56, 1, 56, 1, 56, 3, 56, 692, 8, 56, 1, 56, 1, 56, 5, 56, 696, 8, 56, 10,
    56, 12, 56, 699, 9, 56, 1, 57, 1, 57, 1, 57, 1, 57, 5, 57, 705, 8, 57, 10, 57, 12, 57, 708, 9,
    57, 1, 57, 1, 57, 1, 57, 1, 58, 1, 58, 3, 58, 715, 8, 58, 1, 59, 1, 59, 1, 59, 1, 59, 1, 59, 1,
    59, 1, 59, 3, 59, 724, 8, 59, 1, 60, 1, 60, 4, 60, 728, 8, 60, 11, 60, 12, 60, 729, 1, 61, 1,
    61, 3, 61, 734, 8, 61, 1, 61, 5, 61, 737, 8, 61, 10, 61, 12, 61, 740, 9, 61, 1, 62, 1, 62, 1,
    63, 1, 63, 1, 63, 1, 63, 1, 64, 1, 64, 1, 64, 1, 65, 1, 65, 1, 65, 1, 65, 1, 66, 1, 66, 1, 66,
    1, 66, 1, 66, 1, 66, 5, 66, 761, 8, 66, 10, 66, 12, 66, 764, 9, 66, 1, 66, 1, 66, 1, 67, 1, 67,
    1, 67, 1, 67, 1, 68, 1, 68, 1, 68, 5, 68, 775, 8, 68, 10, 68, 12, 68, 778, 9, 68, 1, 69, 1, 69,
    1, 69, 1, 69, 1, 70, 1, 70, 1, 70, 3, 70, 787, 8, 70, 1, 70, 1, 70, 1, 71, 1, 71, 1, 72, 1, 72,
    1, 72, 3, 72, 796, 8, 72, 1, 72, 1, 72, 1, 73, 1, 73, 1, 73, 1, 73, 1, 74, 1, 74, 1, 74, 1, 74,
    1, 74, 5, 74, 809, 8, 74, 10, 74, 12, 74, 812, 9, 74, 1, 74, 1, 74, 1, 75, 1, 75, 1, 75, 1, 75,
    1, 75, 1, 75, 5, 75, 822, 8, 75, 10, 75, 12, 75, 825, 9, 75, 1, 75, 1, 75, 1, 75, 1, 75, 1, 75,
    1, 76, 1, 76, 1, 76, 1, 76, 1, 76, 4, 76, 837, 8, 76, 11, 76, 12, 76, 838, 1, 76, 1, 76, 1, 77,
    1, 77, 1, 77, 1, 77, 1, 77, 1, 78, 1, 78, 1, 78, 1, 78, 5, 78, 852, 8, 78, 10, 78, 12, 78, 855,
    9, 78, 1, 78, 1, 78, 1, 79, 1, 79, 1, 79, 1, 79, 0, 2, 74, 112, 80, 0, 2, 4, 6, 8, 10, 12, 14,
    16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40, 42, 44, 46, 48, 50, 52, 54, 56, 58, 60, 62,
    64, 66, 68, 70, 72, 74, 76, 78, 80, 82, 84, 86, 88, 90, 92, 94, 96, 98, 100, 102, 104, 106, 108,
    110, 112, 114, 116, 118, 120, 122, 124, 126, 128, 130, 132, 134, 136, 138, 140, 142, 144, 146,
    148, 150, 152, 154, 156, 158, 0, 5, 2, 0, 56, 60, 99, 99, 1, 0, 62, 63, 1, 0, 100, 102, 2, 0,
    66, 66, 87, 87, 4, 0, 64, 65, 67, 69, 71, 71, 86, 93, 880, 0, 161, 1, 0, 0, 0, 2, 186, 1, 0, 0,
    0, 4, 188, 1, 0, 0, 0, 6, 206, 1, 0, 0, 0, 8, 228, 1, 0, 0, 0, 10, 246, 1, 0, 0, 0, 12, 267, 1,
    0, 0, 0, 14, 273, 1, 0, 0, 0, 16, 285, 1, 0, 0, 0, 18, 309, 1, 0, 0, 0, 20, 333, 1, 0, 0, 0, 22,
    336, 1, 0, 0, 0, 24, 349, 1, 0, 0, 0, 26, 351, 1, 0, 0, 0, 28, 359, 1, 0, 0, 0, 30, 365, 1, 0,
    0, 0, 32, 371, 1, 0, 0, 0, 34, 380, 1, 0, 0, 0, 36, 395, 1, 0, 0, 0, 38, 408, 1, 0, 0, 0, 40,
    424, 1, 0, 0, 0, 42, 432, 1, 0, 0, 0, 44, 434, 1, 0, 0, 0, 46, 452, 1, 0, 0, 0, 48, 459, 1, 0,
    0, 0, 50, 469, 1, 0, 0, 0, 52, 473, 1, 0, 0, 0, 54, 479, 1, 0, 0, 0, 56, 483, 1, 0, 0, 0, 58,
    489, 1, 0, 0, 0, 60, 509, 1, 0, 0, 0, 62, 515, 1, 0, 0, 0, 64, 537, 1, 0, 0, 0, 66, 558, 1, 0,
    0, 0, 68, 575, 1, 0, 0, 0, 70, 592, 1, 0, 0, 0, 72, 594, 1, 0, 0, 0, 74, 601, 1, 0, 0, 0, 76,
    610, 1, 0, 0, 0, 78, 612, 1, 0, 0, 0, 80, 614, 1, 0, 0, 0, 82, 620, 1, 0, 0, 0, 84, 622, 1, 0,
    0, 0, 86, 632, 1, 0, 0, 0, 88, 634, 1, 0, 0, 0, 90, 646, 1, 0, 0, 0, 92, 648, 1, 0, 0, 0, 94,
    656, 1, 0, 0, 0, 96, 663, 1, 0, 0, 0, 98, 665, 1, 0, 0, 0, 100, 667, 1, 0, 0, 0, 102, 669, 1, 0,
    0, 0, 104, 672, 1, 0, 0, 0, 106, 676, 1, 0, 0, 0, 108, 680, 1, 0, 0, 0, 110, 682, 1, 0, 0, 0,
    112, 691, 1, 0, 0, 0, 114, 700, 1, 0, 0, 0, 116, 712, 1, 0, 0, 0, 118, 723, 1, 0, 0, 0, 120,
    727, 1, 0, 0, 0, 122, 733, 1, 0, 0, 0, 124, 741, 1, 0, 0, 0, 126, 743, 1, 0, 0, 0, 128, 747, 1,
    0, 0, 0, 130, 750, 1, 0, 0, 0, 132, 754, 1, 0, 0, 0, 134, 767, 1, 0, 0, 0, 136, 771, 1, 0, 0, 0,
    138, 779, 1, 0, 0, 0, 140, 783, 1, 0, 0, 0, 142, 790, 1, 0, 0, 0, 144, 792, 1, 0, 0, 0, 146,
    799, 1, 0, 0, 0, 148, 803, 1, 0, 0, 0, 150, 815, 1, 0, 0, 0, 152, 831, 1, 0, 0, 0, 154, 842, 1,
    0, 0, 0, 156, 847, 1, 0, 0, 0, 158, 858, 1, 0, 0, 0, 160, 162, 3, 20, 10, 0, 161, 160, 1, 0, 0,
    0, 161, 162, 1, 0, 0, 0, 162, 166, 1, 0, 0, 0, 163, 165, 3, 2, 1, 0, 164, 163, 1, 0, 0, 0, 165,
    168, 1, 0, 0, 0, 166, 164, 1, 0, 0, 0, 166, 167, 1, 0, 0, 0, 167, 172, 1, 0, 0, 0, 168, 166, 1,
    0, 0, 0, 169, 171, 5, 96, 0, 0, 170, 169, 1, 0, 0, 0, 171, 174, 1, 0, 0, 0, 172, 170, 1, 0, 0,
    0, 172, 173, 1, 0, 0, 0, 173, 175, 1, 0, 0, 0, 174, 172, 1, 0, 0, 0, 175, 176, 5, 0, 0, 1, 176,
    1, 1, 0, 0, 0, 177, 187, 3, 4, 2, 0, 178, 187, 3, 6, 3, 0, 179, 187, 3, 8, 4, 0, 180, 187, 3,
    10, 5, 0, 181, 187, 3, 12, 6, 0, 182, 187, 3, 14, 7, 0, 183, 187, 3, 16, 8, 0, 184, 187, 3, 18,
    9, 0, 185, 187, 3, 20, 10, 0, 186, 177, 1, 0, 0, 0, 186, 178, 1, 0, 0, 0, 186, 179, 1, 0, 0, 0,
    186, 180, 1, 0, 0, 0, 186, 181, 1, 0, 0, 0, 186, 182, 1, 0, 0, 0, 186, 183, 1, 0, 0, 0, 186,
    184, 1, 0, 0, 0, 186, 185, 1, 0, 0, 0, 187, 3, 1, 0, 0, 0, 188, 189, 5, 47, 0, 0, 189, 190, 5,
    10, 0, 0, 190, 191, 5, 81, 0, 0, 191, 192, 5, 82, 0, 0, 192, 193, 5, 82, 0, 0, 193, 194, 5, 70,
    0, 0, 194, 195, 5, 50, 0, 0, 195, 196, 5, 85, 0, 0, 196, 200, 5, 96, 0, 0, 197, 199, 3, 24, 12,
    0, 198, 197, 1, 0, 0, 0, 199, 202, 1, 0, 0, 0, 200, 198, 1, 0, 0, 0, 200, 201, 1, 0, 0, 0, 201,
    203, 1, 0, 0, 0, 202, 200, 1, 0, 0, 0, 203, 204, 5, 124, 0, 0, 204, 205, 5, 96, 0, 0, 205, 5, 1,
    0, 0, 0, 206, 207, 5, 47, 0, 0, 207, 208, 3, 76, 38, 0, 208, 210, 5, 81, 0, 0, 209, 211, 3, 88,
    44, 0, 210, 209, 1, 0, 0, 0, 210, 211, 1, 0, 0, 0, 211, 212, 1, 0, 0, 0, 212, 213, 5, 82, 0, 0,
    213, 214, 5, 70, 0, 0, 214, 215, 3, 90, 45, 0, 215, 216, 5, 85, 0, 0, 216, 217, 5, 109, 0, 0,
    217, 221, 5, 96, 0, 0, 218, 220, 3, 24, 12, 0, 219, 218, 1, 0, 0, 0, 220, 223, 1, 0, 0, 0, 221,
    219, 1, 0, 0, 0, 221, 222, 1, 0, 0, 0, 222, 224, 1, 0, 0, 0, 223, 221, 1, 0, 0, 0, 224, 225, 3,
    50, 25, 0, 225, 226, 5, 124, 0, 0, 226, 227, 5, 96, 0, 0, 227, 7, 1, 0, 0, 0, 228, 229, 5, 1, 0,
    0, 229, 230, 3, 78, 39, 0, 230, 231, 5, 81, 0, 0, 231, 232, 5, 54, 0, 0, 232, 233, 5, 82, 0, 0,
    233, 234, 5, 124, 0, 0, 234, 240, 5, 96, 0, 0, 235, 239, 3, 48, 24, 0, 236, 239, 3, 28, 14, 0,
    237, 239, 3, 20, 10, 0, 238, 235, 1, 0, 0, 0, 238, 236, 1, 0, 0, 0, 238, 237, 1, 0, 0, 0, 239,
    242, 1, 0, 0, 0, 240, 238, 1, 0, 0, 0, 240, 241, 1, 0, 0, 0, 241, 243, 1, 0, 0, 0, 242, 240, 1,
    0, 0, 0, 243, 244, 5, 124, 0, 0, 244, 245, 5, 96, 0, 0, 245, 9, 1, 0, 0, 0, 246, 247, 5, 47, 0,
    0, 247, 248, 3, 76, 38, 0, 248, 250, 5, 81, 0, 0, 249, 251, 3, 88, 44, 0, 250, 249, 1, 0, 0, 0,
    250, 251, 1, 0, 0, 0, 251, 252, 1, 0, 0, 0, 252, 253, 5, 82, 0, 0, 253, 254, 5, 70, 0, 0, 254,
    255, 5, 50, 0, 0, 255, 256, 5, 85, 0, 0, 256, 257, 5, 110, 0, 0, 257, 261, 5, 96, 0, 0, 258,
    260, 3, 24, 12, 0, 259, 258, 1, 0, 0, 0, 260, 263, 1, 0, 0, 0, 261, 259, 1, 0, 0, 0, 261, 262,
    1, 0, 0, 0, 262, 264, 1, 0, 0, 0, 263, 261, 1, 0, 0, 0, 264, 265, 5, 124, 0, 0, 265, 266, 5, 96,
    0, 0, 266, 11, 1, 0, 0, 0, 267, 268, 3, 70, 35, 0, 268, 269, 5, 67, 0, 0, 269, 270, 3, 82, 41,
    0, 270, 271, 5, 111, 0, 0, 271, 272, 5, 96, 0, 0, 272, 13, 1, 0, 0, 0, 273, 274, 5, 1, 0, 0,
    274, 275, 3, 80, 40, 0, 275, 276, 5, 81, 0, 0, 276, 277, 5, 4, 0, 0, 277, 278, 5, 82, 0, 0, 278,
    279, 5, 85, 0, 0, 279, 280, 5, 112, 0, 0, 280, 281, 5, 96, 0, 0, 281, 282, 3, 92, 46, 0, 282,
    283, 5, 96, 0, 0, 283, 284, 5, 124, 0, 0, 284, 15, 1, 0, 0, 0, 285, 286, 5, 1, 0, 0, 286, 291,
    3, 80, 40, 0, 287, 288, 5, 81, 0, 0, 288, 289, 3, 80, 40, 0, 289, 290, 5, 82, 0, 0, 290, 292, 1,
    0, 0, 0, 291, 287, 1, 0, 0, 0, 291, 292, 1, 0, 0, 0, 292, 293, 1, 0, 0, 0, 293, 294, 5, 85, 0,
    0, 294, 295, 5, 113, 0, 0, 295, 303, 5, 96, 0, 0, 296, 302, 3, 58, 29, 0, 297, 302, 3, 60, 30,
    0, 298, 302, 3, 62, 31, 0, 299, 302, 3, 64, 32, 0, 300, 302, 3, 20, 10, 0, 301, 296, 1, 0, 0, 0,
    301, 297, 1, 0, 0, 0, 301, 298, 1, 0, 0, 0, 301, 299, 1, 0, 0, 0, 301, 300, 1, 0, 0, 0, 302,
    305, 1, 0, 0, 0, 303, 301, 1, 0, 0, 0, 303, 304, 1, 0, 0, 0, 304, 306, 1, 0, 0, 0, 305, 303, 1,
    0, 0, 0, 306, 307, 5, 124, 0, 0, 307, 308, 5, 96, 0, 0, 308, 17, 1, 0, 0, 0, 309, 310, 5, 1, 0,
    0, 310, 315, 3, 80, 40, 0, 311, 312, 5, 81, 0, 0, 312, 316, 3, 80, 40, 0, 313, 314, 5, 53, 0, 0,
    314, 316, 5, 82, 0, 0, 315, 311, 1, 0, 0, 0, 315, 313, 1, 0, 0, 0, 316, 317, 1, 0, 0, 0, 317,
    318, 5, 114, 0, 0, 318, 327, 5, 96, 0, 0, 319, 326, 3, 60, 30, 0, 320, 326, 3, 62, 31, 0, 321,
    326, 3, 64, 32, 0, 322, 326, 3, 66, 33, 0, 323, 326, 3, 68, 34, 0, 324, 326, 3, 20, 10, 0, 325,
    319, 1, 0, 0, 0, 325, 320, 1, 0, 0, 0, 325, 321, 1, 0, 0, 0, 325, 322, 1, 0, 0, 0, 325, 323, 1,
    0, 0, 0, 325, 324, 1, 0, 0, 0, 326, 329, 1, 0, 0, 0, 327, 325, 1, 0, 0, 0, 327, 328, 1, 0, 0, 0,
    328, 330, 1, 0, 0, 0, 329, 327, 1, 0, 0, 0, 330, 331, 5, 124, 0, 0, 331, 332, 5, 96, 0, 0, 332,
    19, 1, 0, 0, 0, 333, 334, 3, 22, 11, 0, 334, 335, 5, 96, 0, 0, 335, 21, 1, 0, 0, 0, 336, 337, 5,
    124, 0, 0, 337, 23, 1, 0, 0, 0, 338, 350, 3, 26, 13, 0, 339, 350, 3, 28, 14, 0, 340, 350, 3, 30,
    15, 0, 341, 350, 3, 32, 16, 0, 342, 350, 3, 34, 17, 0, 343, 350, 3, 36, 18, 0, 344, 350, 3, 38,
    19, 0, 345, 350, 3, 40, 20, 0, 346, 350, 3, 44, 22, 0, 347, 350, 3, 46, 23, 0, 348, 350, 3, 20,
    10, 0, 349, 338, 1, 0, 0, 0, 349, 339, 1, 0, 0, 0, 349, 340, 1, 0, 0, 0, 349, 341, 1, 0, 0, 0,
    349, 342, 1, 0, 0, 0, 349, 343, 1, 0, 0, 0, 349, 344, 1, 0, 0, 0, 349, 345, 1, 0, 0, 0, 349,
    346, 1, 0, 0, 0, 349, 347, 1, 0, 0, 0, 349, 348, 1, 0, 0, 0, 350, 25, 1, 0, 0, 0, 351, 352, 5,
    11, 0, 0, 352, 354, 5, 81, 0, 0, 353, 355, 3, 112, 56, 0, 354, 353, 1, 0, 0, 0, 354, 355, 1, 0,
    0, 0, 355, 356, 1, 0, 0, 0, 356, 357, 5, 82, 0, 0, 357, 358, 5, 96, 0, 0, 358, 27, 1, 0, 0, 0,
    359, 360, 3, 70, 35, 0, 360, 361, 5, 67, 0, 0, 361, 362, 3, 112, 56, 0, 362, 363, 5, 115, 0, 0,
    363, 364, 5, 96, 0, 0, 364, 29, 1, 0, 0, 0, 365, 366, 3, 74, 37, 0, 366, 367, 5, 67, 0, 0, 367,
    368, 3, 112, 56, 0, 368, 369, 5, 116, 0, 0, 369, 370, 5, 96, 0, 0, 370, 31, 1, 0, 0, 0, 371,
    372, 3, 70, 35, 0, 372, 373, 5, 67, 0, 0, 373, 374, 5, 8, 0, 0, 374, 375, 5, 81, 0, 0, 375, 376,
    3, 112, 56, 0, 376, 377, 5, 82, 0, 0, 377, 378, 5, 117, 0, 0, 378, 379, 5, 96, 0, 0, 379, 33, 1,
    0, 0, 0, 380, 381, 5, 6, 0, 0, 381, 382, 3, 112, 56, 0, 382, 383, 5, 85, 0, 0, 383, 389, 5, 96,
    0, 0, 384, 388, 3, 52, 26, 0, 385, 388, 3, 54, 27, 0, 386, 388, 3, 24, 12, 0, 387, 384, 1, 0, 0,
    0, 387, 385, 1, 0, 0, 0, 387, 386, 1, 0, 0, 0, 388, 391, 1, 0, 0, 0, 389, 387, 1, 0, 0, 0, 389,
    390, 1, 0, 0, 0, 390, 392, 1, 0, 0, 0, 391, 389, 1, 0, 0, 0, 392, 393, 5, 124, 0, 0, 393, 394,
    5, 96, 0, 0, 394, 35, 1, 0, 0, 0, 395, 396, 5, 14, 0, 0, 396, 397, 3, 112, 56, 0, 397, 398, 5,
    85, 0, 0, 398, 402, 5, 96, 0, 0, 399, 401, 3, 24, 12, 0, 400, 399, 1, 0, 0, 0, 401, 404, 1, 0,
    0, 0, 402, 400, 1, 0, 0, 0, 402, 403, 1, 0, 0, 0, 403, 405, 1, 0, 0, 0, 404, 402, 1, 0, 0, 0,
    405, 406, 5, 124, 0, 0, 406, 407, 5, 96, 0, 0, 407, 37, 1, 0, 0, 0, 408, 409, 5, 5, 0, 0, 409,
    410, 3, 70, 35, 0, 410, 411, 5, 7, 0, 0, 411, 412, 3, 112, 56, 0, 412, 413, 5, 85, 0, 0, 413,
    417, 5, 96, 0, 0, 414, 416, 3, 24, 12, 0, 415, 414, 1, 0, 0, 0, 416, 419, 1, 0, 0, 0, 417, 415,
    1, 0, 0, 0, 417, 418, 1, 0, 0, 0, 418, 420, 1, 0, 0, 0, 419, 417, 1, 0, 0, 0, 420, 421, 5, 124,
    0, 0, 421, 422, 5, 96, 0, 0, 422, 39, 1, 0, 0, 0, 423, 425, 5, 108, 0, 0, 424, 423, 1, 0, 0, 0,
    424, 425, 1, 0, 0, 0, 425, 426, 1, 0, 0, 0, 426, 427, 3, 42, 21, 0, 427, 428, 5, 81, 0, 0, 428,
    429, 3, 84, 42, 0, 429, 430, 5, 82, 0, 0, 430, 431, 5, 96, 0, 0, 431, 41, 1, 0, 0, 0, 432, 433,
    3, 116, 58, 0, 433, 43, 1, 0, 0, 0, 434, 435, 5, 13, 0, 0, 435, 439, 5, 96, 0, 0, 436, 438, 3,
    24, 12, 0, 437, 436, 1, 0, 0, 0, 438, 441, 1, 0, 0, 0, 439, 437, 1, 0, 0, 0, 439, 440, 1, 0, 0,
    0, 440, 442, 1, 0, 0, 0, 441, 439, 1, 0, 0, 0, 442, 446, 3, 56, 28, 0, 443, 445, 3, 24, 12, 0,
    444, 443, 1, 0, 0, 0, 445, 448, 1, 0, 0, 0, 446, 444, 1, 0, 0, 0, 446, 447, 1, 0, 0, 0, 447,
    449, 1, 0, 0, 0, 448, 446, 1, 0, 0, 0, 449, 450, 5, 124, 0, 0, 450, 451, 5, 96, 0, 0, 451, 45,
    1, 0, 0, 0, 452, 453, 5, 52, 0, 0, 453, 454, 3, 80, 40, 0, 454, 455, 5, 81, 0, 0, 455, 456, 3,
    104, 52, 0, 456, 457, 5, 82, 0, 0, 457, 458, 5, 96, 0, 0, 458, 47, 1, 0, 0, 0, 459, 460, 5, 75,
    0, 0, 460, 461, 5, 83, 0, 0, 461, 462, 5, 45, 0, 0, 462, 463, 5, 81, 0, 0, 463, 464, 3, 94, 47,
    0, 464, 465, 5, 84, 0, 0, 465, 466, 3, 112, 56, 0, 466, 467, 5, 82, 0, 0, 467, 468, 5, 96, 0, 0,
    468, 49, 1, 0, 0, 0, 469, 470, 5, 12, 0, 0, 470, 471, 3, 112, 56, 0, 471, 472, 5, 96, 0, 0, 472,
    51, 1, 0, 0, 0, 473, 474, 5, 2, 0, 0, 474, 475, 3, 112, 56, 0, 475, 476, 5, 85, 0, 0, 476, 477,
    5, 120, 0, 0, 477, 478, 5, 96, 0, 0, 478, 53, 1, 0, 0, 0, 479, 480, 5, 3, 0, 0, 480, 481, 5, 85,
    0, 0, 481, 482, 5, 96, 0, 0, 482, 55, 1, 0, 0, 0, 483, 484, 5, 48, 0, 0, 484, 485, 3, 80, 40, 0,
    485, 486, 5, 46, 0, 0, 486, 487, 3, 70, 35, 0, 487, 488, 5, 96, 0, 0, 488, 57, 1, 0, 0, 0, 489,
    490, 5, 47, 0, 0, 490, 491, 5, 49, 0, 0, 491, 493, 5, 81, 0, 0, 492, 494, 3, 88, 44, 0, 493,
    492, 1, 0, 0, 0, 493, 494, 1, 0, 0, 0, 494, 495, 1, 0, 0, 0, 495, 496, 5, 82, 0, 0, 496, 497, 5,
    70, 0, 0, 497, 498, 5, 50, 0, 0, 498, 499, 5, 85, 0, 0, 499, 503, 5, 96, 0, 0, 500, 502, 3, 24,
    12, 0, 501, 500, 1, 0, 0, 0, 502, 505, 1, 0, 0, 0, 503, 501, 1, 0, 0, 0, 503, 504, 1, 0, 0, 0,
    504, 506, 1, 0, 0, 0, 505, 503, 1, 0, 0, 0, 506, 507, 5, 124, 0, 0, 507, 508, 5, 96, 0, 0, 508,
    59, 1, 0, 0, 0, 509, 510, 3, 70, 35, 0, 510, 511, 5, 85, 0, 0, 511, 512, 3, 90, 45, 0, 512, 513,
    5, 121, 0, 0, 513, 514, 5, 96, 0, 0, 514, 61, 1, 0, 0, 0, 515, 516, 5, 47, 0, 0, 516, 517, 3,
    76, 38, 0, 517, 519, 5, 81, 0, 0, 518, 520, 3, 88, 44, 0, 519, 518, 1, 0, 0, 0, 519, 520, 1, 0,
    0, 0, 520, 521, 1, 0, 0, 0, 521, 522, 5, 82, 0, 0, 522, 523, 5, 70, 0, 0, 523, 524, 3, 90, 45,
    0, 524, 525, 5, 85, 0, 0, 525, 526, 5, 122, 0, 0, 526, 530, 5, 96, 0, 0, 527, 529, 3, 24, 12, 0,
    528, 527, 1, 0, 0, 0, 529, 532, 1, 0, 0, 0, 530, 528, 1, 0, 0, 0, 530, 531, 1, 0, 0, 0, 531,
    533, 1, 0, 0, 0, 532, 530, 1, 0, 0, 0, 533, 534, 3, 50, 25, 0, 534, 535, 5, 124, 0, 0, 535, 536,
    5, 96, 0, 0, 536, 63, 1, 0, 0, 0, 537, 538, 5, 47, 0, 0, 538, 539, 3, 76, 38, 0, 539, 541, 5,
    81, 0, 0, 540, 542, 3, 88, 44, 0, 541, 540, 1, 0, 0, 0, 541, 542, 1, 0, 0, 0, 542, 543, 1, 0, 0,
    0, 543, 544, 5, 82, 0, 0, 544, 545, 5, 70, 0, 0, 545, 546, 5, 50, 0, 0, 546, 547, 5, 85, 0, 0,
    547, 548, 5, 123, 0, 0, 548, 552, 5, 96, 0, 0, 549, 551, 3, 24, 12, 0, 550, 549, 1, 0, 0, 0,
    551, 554, 1, 0, 0, 0, 552, 550, 1, 0, 0, 0, 552, 553, 1, 0, 0, 0, 553, 555, 1, 0, 0, 0, 554,
    552, 1, 0, 0, 0, 555, 556, 5, 124, 0, 0, 556, 557, 5, 96, 0, 0, 557, 65, 1, 0, 0, 0, 558, 559,
    5, 44, 0, 0, 559, 560, 5, 96, 0, 0, 560, 561, 5, 47, 0, 0, 561, 562, 3, 76, 38, 0, 562, 564, 5,
    81, 0, 0, 563, 565, 3, 88, 44, 0, 564, 563, 1, 0, 0, 0, 564, 565, 1, 0, 0, 0, 565, 566, 1, 0, 0,
    0, 566, 567, 5, 82, 0, 0, 567, 568, 5, 70, 0, 0, 568, 569, 3, 90, 45, 0, 569, 570, 5, 85, 0, 0,
    570, 571, 5, 96, 0, 0, 571, 572, 5, 51, 0, 0, 572, 573, 5, 124, 0, 0, 573, 574, 5, 96, 0, 0,
    574, 67, 1, 0, 0, 0, 575, 576, 5, 44, 0, 0, 576, 577, 5, 96, 0, 0, 577, 578, 5, 47, 0, 0, 578,
    579, 3, 76, 38, 0, 579, 581, 5, 81, 0, 0, 580, 582, 3, 88, 44, 0, 581, 580, 1, 0, 0, 0, 581,
    582, 1, 0, 0, 0, 582, 583, 1, 0, 0, 0, 583, 584, 5, 82, 0, 0, 584, 585, 5, 70, 0, 0, 585, 586,
    5, 50, 0, 0, 586, 587, 5, 85, 0, 0, 587, 588, 5, 96, 0, 0, 588, 589, 5, 51, 0, 0, 589, 590, 5,
    124, 0, 0, 590, 591, 5, 96, 0, 0, 591, 69, 1, 0, 0, 0, 592, 593, 5, 98, 0, 0, 593, 71, 1, 0, 0,
    0, 594, 595, 5, 98, 0, 0, 595, 73, 1, 0, 0, 0, 596, 597, 6, 37, -1, 0, 597, 602, 3, 72, 36, 0,
    598, 599, 5, 75, 0, 0, 599, 600, 5, 83, 0, 0, 600, 602, 3, 72, 36, 0, 601, 596, 1, 0, 0, 0, 601,
    598, 1, 0, 0, 0, 602, 607, 1, 0, 0, 0, 603, 604, 10, 1, 0, 0, 604, 606, 3, 110, 55, 0, 605, 603,
    1, 0, 0, 0, 606, 609, 1, 0, 0, 0, 607, 605, 1, 0, 0, 0, 607, 608, 1, 0, 0, 0, 608, 75, 1, 0, 0,
    0, 609, 607, 1, 0, 0, 0, 610, 611, 5, 98, 0, 0, 611, 77, 1, 0, 0, 0, 612, 613, 5, 97, 0, 0, 613,
    79, 1, 0, 0, 0, 614, 615, 7, 0, 0, 0, 615, 81, 1, 0, 0, 0, 616, 621, 3, 98, 49, 0, 617, 621, 3,
    100, 50, 0, 618, 621, 3, 102, 51, 0, 619, 621, 3, 104, 52, 0, 620, 616, 1, 0, 0, 0, 620, 617, 1,
    0, 0, 0, 620, 618, 1, 0, 0, 0, 620, 619, 1, 0, 0, 0, 621, 83, 1, 0, 0, 0, 622, 627, 3, 86, 43,
    0, 623, 624, 5, 84, 0, 0, 624, 626, 3, 86, 43, 0, 625, 623, 1, 0, 0, 0, 626, 629, 1, 0, 0, 0,
    627, 625, 1, 0, 0, 0, 627, 628, 1, 0, 0, 0, 628, 85, 1, 0, 0, 0, 629, 627, 1, 0, 0, 0, 630, 633,
    3, 154, 77, 0, 631, 633, 3, 112, 56, 0, 632, 630, 1, 0, 0, 0, 632, 631, 1, 0, 0, 0, 633, 87, 1,
    0, 0, 0, 634, 639, 3, 146, 73, 0, 635, 636, 5, 84, 0, 0, 636, 638, 3, 146, 73, 0, 637, 635, 1,
    0, 0, 0, 638, 641, 1, 0, 0, 0, 639, 637, 1, 0, 0, 0, 639, 640, 1, 0, 0, 0, 640, 89, 1, 0, 0, 0,
    641, 639, 1, 0, 0, 0, 642, 647, 3, 152, 76, 0, 643, 647, 3, 80, 40, 0, 644, 647, 3, 148, 74, 0,
    645, 647, 3, 150, 75, 0, 646, 642, 1, 0, 0, 0, 646, 643, 1, 0, 0, 0, 646, 644, 1, 0, 0, 0, 646,
    645, 1, 0, 0, 0, 647, 91, 1, 0, 0, 0, 648, 653, 3, 70, 35, 0, 649, 650, 5, 84, 0, 0, 650, 652,
    3, 70, 35, 0, 651, 649, 1, 0, 0, 0, 652, 655, 1, 0, 0, 0, 653, 651, 1, 0, 0, 0, 653, 654, 1, 0,
    0, 0, 654, 93, 1, 0, 0, 0, 655, 653, 1, 0, 0, 0, 656, 657, 3, 112, 56, 0, 657, 95, 1, 0, 0, 0,
    658, 664, 3, 98, 49, 0, 659, 664, 3, 100, 50, 0, 660, 664, 3, 102, 51, 0, 661, 664, 3, 104, 52,
    0, 662, 664, 3, 106, 53, 0, 663, 658, 1, 0, 0, 0, 663, 659, 1, 0, 0, 0, 663, 660, 1, 0, 0, 0,
    663, 661, 1, 0, 0, 0, 663, 662, 1, 0, 0, 0, 664, 97, 1, 0, 0, 0, 665, 666, 7, 1, 0, 0, 666, 99,
    1, 0, 0, 0, 667, 668, 7, 2, 0, 0, 668, 101, 1, 0, 0, 0, 669, 670, 5, 103, 0, 0, 670, 103, 1, 0,
    0, 0, 671, 673, 5, 74, 0, 0, 672, 671, 1, 0, 0, 0, 672, 673, 1, 0, 0, 0, 673, 674, 1, 0, 0, 0,
    674, 675, 5, 105, 0, 0, 675, 105, 1, 0, 0, 0, 676, 677, 3, 80, 40, 0, 677, 678, 5, 83, 0, 0,
    678, 679, 3, 72, 36, 0, 679, 107, 1, 0, 0, 0, 680, 681, 5, 104, 0, 0, 681, 109, 1, 0, 0, 0, 682,
    683, 5, 79, 0, 0, 683, 684, 3, 112, 56, 0, 684, 685, 5, 80, 0, 0, 685, 111, 1, 0, 0, 0, 686,
    687, 6, 56, -1, 0, 687, 692, 3, 144, 72, 0, 688, 692, 3, 128, 64, 0, 689, 692, 3, 116, 58, 0,
    690, 692, 3, 130, 65, 0, 691, 686, 1, 0, 0, 0, 691, 688, 1, 0, 0, 0, 691, 689, 1, 0, 0, 0, 691,
    690, 1, 0, 0, 0, 692, 697, 1, 0, 0, 0, 693, 694, 10, 1, 0, 0, 694, 696, 3, 114, 57, 0, 695, 693,
    1, 0, 0, 0, 696, 699, 1, 0, 0, 0, 697, 695, 1, 0, 0, 0, 697, 698, 1, 0, 0, 0, 698, 113, 1, 0, 0,
    0, 699, 697, 1, 0, 0, 0, 700, 701, 5, 6, 0, 0, 701, 706, 3, 112, 56, 0, 702, 703, 5, 2, 0, 0,
    703, 705, 3, 112, 56, 0, 704, 702, 1, 0, 0, 0, 705, 708, 1, 0, 0, 0, 706, 704, 1, 0, 0, 0, 706,
    707, 1, 0, 0, 0, 707, 709, 1, 0, 0, 0, 708, 706, 1, 0, 0, 0, 709, 710, 5, 3, 0, 0, 710, 711, 3,
    112, 56, 0, 711, 115, 1, 0, 0, 0, 712, 714, 3, 118, 59, 0, 713, 715, 3, 120, 60, 0, 714, 713, 1,
    0, 0, 0, 714, 715, 1, 0, 0, 0, 715, 117, 1, 0, 0, 0, 716, 724, 3, 124, 62, 0, 717, 724, 3, 126,
    63, 0, 718, 724, 3, 96, 48, 0, 719, 724, 3, 156, 78, 0, 720, 724, 3, 134, 67, 0, 721, 724, 3,
    132, 66, 0, 722, 724, 3, 122, 61, 0, 723, 716, 1, 0, 0, 0, 723, 717, 1, 0, 0, 0, 723, 718, 1, 0,
    0, 0, 723, 719, 1, 0, 0, 0, 723, 720, 1, 0, 0, 0, 723, 721, 1, 0, 0, 0, 723, 722, 1, 0, 0, 0,
    724, 119, 1, 0, 0, 0, 725, 726, 5, 83, 0, 0, 726, 728, 3, 122, 61, 0, 727, 725, 1, 0, 0, 0, 728,
    729, 1, 0, 0, 0, 729, 727, 1, 0, 0, 0, 729, 730, 1, 0, 0, 0, 730, 121, 1, 0, 0, 0, 731, 734, 3,
    72, 36, 0, 732, 734, 3, 140, 70, 0, 733, 731, 1, 0, 0, 0, 733, 732, 1, 0, 0, 0, 734, 738, 1, 0,
    0, 0, 735, 737, 3, 110, 55, 0, 736, 735, 1, 0, 0, 0, 737, 740, 1, 0, 0, 0, 738, 736, 1, 0, 0, 0,
    738, 739, 1, 0, 0, 0, 739, 123, 1, 0, 0, 0, 740, 738, 1, 0, 0, 0, 741, 742, 5, 75, 0, 0, 742,
    125, 1, 0, 0, 0, 743, 744, 5, 81, 0, 0, 744, 745, 3, 112, 56, 0, 745, 746, 5, 82, 0, 0, 746,
    127, 1, 0, 0, 0, 747, 748, 7, 3, 0, 0, 748, 749, 3, 116, 58, 0, 749, 129, 1, 0, 0, 0, 750, 751,
    3, 116, 58, 0, 751, 752, 3, 142, 71, 0, 752, 753, 3, 112, 56, 0, 753, 131, 1, 0, 0, 0, 754, 755,
    5, 81, 0, 0, 755, 756, 3, 112, 56, 0, 756, 757, 5, 84, 0, 0, 757, 762, 3, 112, 56, 0, 758, 759,
    5, 84, 0, 0, 759, 761, 3, 112, 56, 0, 760, 758, 1, 0, 0, 0, 761, 764, 1, 0, 0, 0, 762, 760, 1,
    0, 0, 0, 762, 763, 1, 0, 0, 0, 763, 765, 1, 0, 0, 0, 764, 762, 1, 0, 0, 0, 765, 766, 5, 82, 0,
    0, 766, 133, 1, 0, 0, 0, 767, 768, 5, 79, 0, 0, 768, 769, 3, 136, 68, 0, 769, 770, 5, 80, 0, 0,
    770, 135, 1, 0, 0, 0, 771, 776, 3, 138, 69, 0, 772, 773, 5, 84, 0, 0, 773, 775, 3, 138, 69, 0,
    774, 772, 1, 0, 0, 0, 775, 778, 1, 0, 0, 0, 776, 774, 1, 0, 0, 0, 776, 777, 1, 0, 0, 0, 777,
    137, 1, 0, 0, 0, 778, 776, 1, 0, 0, 0, 779, 780, 3, 112, 56, 0, 780, 781, 5, 85, 0, 0, 781, 782,
    3, 112, 56, 0, 782, 139, 1, 0, 0, 0, 783, 784, 3, 76, 38, 0, 784, 786, 5, 81, 0, 0, 785, 787, 3,
    84, 42, 0, 786, 785, 1, 0, 0, 0, 786, 787, 1, 0, 0, 0, 787, 788, 1, 0, 0, 0, 788, 789, 5, 82, 0,
    0, 789, 141, 1, 0, 0, 0, 790, 791, 7, 4, 0, 0, 791, 143, 1, 0, 0, 0, 792, 793, 3, 90, 45, 0,
    793, 795, 5, 81, 0, 0, 794, 796, 3, 84, 42, 0, 795, 794, 1, 0, 0, 0, 795, 796, 1, 0, 0, 0, 796,
    797, 1, 0, 0, 0, 797, 798, 5, 82, 0, 0, 798, 145, 1, 0, 0, 0, 799, 800, 3, 70, 35, 0, 800, 801,
    5, 85, 0, 0, 801, 802, 3, 90, 45, 0, 802, 147, 1, 0, 0, 0, 803, 804, 3, 80, 40, 0, 804, 805, 5,
    79, 0, 0, 805, 810, 3, 90, 45, 0, 806, 807, 5, 84, 0, 0, 807, 809, 3, 90, 45, 0, 808, 806, 1, 0,
    0, 0, 809, 812, 1, 0, 0, 0, 810, 808, 1, 0, 0, 0, 810, 811, 1, 0, 0, 0, 811, 813, 1, 0, 0, 0,
    812, 810, 1, 0, 0, 0, 813, 814, 5, 80, 0, 0, 814, 149, 1, 0, 0, 0, 815, 816, 5, 61, 0, 0, 816,
    817, 5, 79, 0, 0, 817, 818, 5, 79, 0, 0, 818, 823, 3, 90, 45, 0, 819, 820, 5, 84, 0, 0, 820,
    822, 3, 90, 45, 0, 821, 819, 1, 0, 0, 0, 822, 825, 1, 0, 0, 0, 823, 821, 1, 0, 0, 0, 823, 824,
    1, 0, 0, 0, 824, 826, 1, 0, 0, 0, 825, 823, 1, 0, 0, 0, 826, 827, 5, 80, 0, 0, 827, 828, 5, 84,
    0, 0, 828, 829, 3, 90, 45, 0, 829, 830, 5, 80, 0, 0, 830, 151, 1, 0, 0, 0, 831, 832, 5, 55, 0,
    0, 832, 833, 5, 79, 0, 0, 833, 836, 3, 90, 45, 0, 834, 835, 5, 84, 0, 0, 835, 837, 3, 90, 45, 0,
    836, 834, 1, 0, 0, 0, 837, 838, 1, 0, 0, 0, 838, 836, 1, 0, 0, 0, 838, 839, 1, 0, 0, 0, 839,
    840, 1, 0, 0, 0, 840, 841, 5, 80, 0, 0, 841, 153, 1, 0, 0, 0, 842, 843, 5, 9, 0, 0, 843, 844, 3,
    84, 42, 0, 844, 845, 5, 85, 0, 0, 845, 846, 3, 112, 56, 0, 846, 155, 1, 0, 0, 0, 847, 848, 5,
    79, 0, 0, 848, 853, 3, 112, 56, 0, 849, 850, 5, 84, 0, 0, 850, 852, 3, 112, 56, 0, 851, 849, 1,
    0, 0, 0, 852, 855, 1, 0, 0, 0, 853, 851, 1, 0, 0, 0, 853, 854, 1, 0, 0, 0, 854, 856, 1, 0, 0, 0,
    855, 853, 1, 0, 0, 0, 856, 857, 5, 80, 0, 0, 857, 157, 1, 0, 0, 0, 858, 859, 5, 74, 0, 0, 859,
    860, 5, 105, 0, 0, 860, 159, 1, 0, 0, 0, 60, 161, 166, 172, 186, 200, 210, 221, 238, 240, 250,
    261, 291, 301, 303, 315, 325, 327, 349, 354, 387, 389, 402, 417, 424, 439, 446, 493, 503, 519,
    530, 541, 552, 564, 581, 601, 607, 620, 627, 632, 639, 646, 653, 663, 672, 691, 697, 706, 714,
    723, 729, 733, 738, 762, 776, 786, 795, 810, 823, 838, 853,
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
  public paramsList(): ParamsListContext | null {
    return this.getRuleContext(0, ParamsListContext);
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
  public paramsList(): ParamsListContext | null {
    return this.getRuleContext(0, ParamsListContext);
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
  public enumValuesList(): EnumValuesListContext {
    return this.getRuleContext(0, EnumValuesListContext)!;
  }
  public COMMENT(): antlr.TerminalNode {
    return this.getToken(PythonParser.COMMENT, 0)!;
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
  public term(): TermContext {
    return this.getRuleContext(0, TermContext)!;
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

export class TryStatementContext extends antlr.ParserRuleContext {
  public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
    super(parent, invokingState);
  }
  public TRY(): antlr.TerminalNode {
    return this.getToken(PythonParser.TRY, 0)!;
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
  public COMMENT(): antlr.TerminalNode {
    return this.getToken(PythonParser.COMMENT, 0)!;
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
  public litString(): LitStringContext {
    return this.getRuleContext(0, LitStringContext)!;
  }
  public CLOSE_BRACKET(): antlr.TerminalNode {
    return this.getToken(PythonParser.CLOSE_BRACKET, 0)!;
  }
  public NL(): antlr.TerminalNode {
    return this.getToken(PythonParser.NL, 0)!;
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
  public expression(): ExpressionContext {
    return this.getRuleContext(0, ExpressionContext)!;
  }
  public CLOSE_BRACKET(): antlr.TerminalNode {
    return this.getToken(PythonParser.CLOSE_BRACKET, 0)!;
  }
  public NL(): antlr.TerminalNode {
    return this.getToken(PythonParser.NL, 0)!;
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
  public paramsList(): ParamsListContext | null {
    return this.getRuleContext(0, ParamsListContext);
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
  public paramsList(): ParamsListContext | null {
    return this.getRuleContext(0, ParamsListContext);
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
  public paramsList(): ParamsListContext | null {
    return this.getRuleContext(0, ParamsListContext);
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
  public paramsList(): ParamsListContext | null {
    return this.getRuleContext(0, ParamsListContext);
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
  public paramsList(): ParamsListContext | null {
    return this.getRuleContext(0, ParamsListContext);
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

export class ParamsListContext extends antlr.ParserRuleContext {
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
    return PythonParser.RULE_paramsList;
  }
  public override enterRule(listener: PythonListener): void {
    if (listener.enterParamsList) {
      listener.enterParamsList(this);
    }
  }
  public override exitRule(listener: PythonListener): void {
    if (listener.exitParamsList) {
      listener.exitParamsList(this);
    }
  }
  public override accept<Result>(visitor: PythonVisitor<Result>): Result | null {
    if (visitor.visitParamsList) {
      return visitor.visitParamsList(this);
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

export class EnumValuesListContext extends antlr.ParserRuleContext {
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
    return PythonParser.RULE_enumValuesList;
  }
  public override enterRule(listener: PythonListener): void {
    if (listener.enterEnumValuesList) {
      listener.enterEnumValuesList(this);
    }
  }
  public override exitRule(listener: PythonListener): void {
    if (listener.exitEnumValuesList) {
      listener.exitEnumValuesList(this);
    }
  }
  public override accept<Result>(visitor: PythonVisitor<Result>): Result | null {
    if (visitor.visitEnumValuesList) {
      return visitor.visitEnumValuesList(this);
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
  public LITERAL_STRING(): antlr.TerminalNode {
    return this.getToken(PythonParser.LITERAL_STRING, 0)!;
  }
  public INTERPOLATED_STRING_PREFIX(): antlr.TerminalNode | null {
    return this.getToken(PythonParser.INTERPOLATED_STRING_PREFIX, 0);
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
  public expression(): ExpressionContext | null {
    return this.getRuleContext(0, ExpressionContext);
  }
  public ifClause(): IfClauseContext | null {
    return this.getRuleContext(0, IfClauseContext);
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

export class IfClauseContext extends antlr.ParserRuleContext {
  public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
    super(parent, invokingState);
  }
  public IF(): antlr.TerminalNode {
    return this.getToken(PythonParser.IF, 0)!;
  }
  public expression(): ExpressionContext[];
  public expression(i: number): ExpressionContext | null;
  public expression(i?: number): ExpressionContext[] | ExpressionContext | null {
    if (i === undefined) {
      return this.getRuleContexts(ExpressionContext);
    }

    return this.getRuleContext(i, ExpressionContext);
  }
  public ELSE(): antlr.TerminalNode {
    return this.getToken(PythonParser.ELSE, 0)!;
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
    return PythonParser.RULE_ifClause;
  }
  public override enterRule(listener: PythonListener): void {
    if (listener.enterIfClause) {
      listener.enterIfClause(this);
    }
  }
  public override exitRule(listener: PythonListener): void {
    if (listener.exitIfClause) {
      listener.exitIfClause(this);
    }
  }
  public override accept<Result>(visitor: PythonVisitor<Result>): Result | null {
    if (visitor.visitIfClause) {
      return visitor.visitIfClause(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class TermContext extends antlr.ParserRuleContext {
  public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
    super(parent, invokingState);
  }
  public chainHead(): ChainHeadContext {
    return this.getRuleContext(0, ChainHeadContext)!;
  }
  public chainTail(): ChainTailContext | null {
    return this.getRuleContext(0, ChainTailContext);
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

export class ChainHeadContext extends antlr.ParserRuleContext {
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
  public chainable(): ChainableContext | null {
    return this.getRuleContext(0, ChainableContext);
  }
  public override get ruleIndex(): number {
    return PythonParser.RULE_chainHead;
  }
  public override enterRule(listener: PythonListener): void {
    if (listener.enterChainHead) {
      listener.enterChainHead(this);
    }
  }
  public override exitRule(listener: PythonListener): void {
    if (listener.exitChainHead) {
      listener.exitChainHead(this);
    }
  }
  public override accept<Result>(visitor: PythonVisitor<Result>): Result | null {
    if (visitor.visitChainHead) {
      return visitor.visitChainHead(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class ChainTailContext extends antlr.ParserRuleContext {
  public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
    super(parent, invokingState);
  }
  public DOT(): antlr.TerminalNode[];
  public DOT(i: number): antlr.TerminalNode | null;
  public DOT(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    if (i === undefined) {
      return this.getTokens(PythonParser.DOT);
    } else {
      return this.getToken(PythonParser.DOT, i);
    }
  }
  public chainable(): ChainableContext[];
  public chainable(i: number): ChainableContext | null;
  public chainable(i?: number): ChainableContext[] | ChainableContext | null {
    if (i === undefined) {
      return this.getRuleContexts(ChainableContext);
    }

    return this.getRuleContext(i, ChainableContext);
  }
  public override get ruleIndex(): number {
    return PythonParser.RULE_chainTail;
  }
  public override enterRule(listener: PythonListener): void {
    if (listener.enterChainTail) {
      listener.enterChainTail(this);
    }
  }
  public override exitRule(listener: PythonListener): void {
    if (listener.exitChainTail) {
      listener.exitChainTail(this);
    }
  }
  public override accept<Result>(visitor: PythonVisitor<Result>): Result | null {
    if (visitor.visitChainTail) {
      return visitor.visitChainTail(this);
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
  public term(): TermContext {
    return this.getRuleContext(0, TermContext)!;
  }
  public MINUS(): antlr.TerminalNode | null {
    return this.getToken(PythonParser.MINUS, 0);
  }
  public NOT(): antlr.TerminalNode | null {
    return this.getToken(PythonParser.NOT, 0);
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

export class BinaryExpressionContext extends antlr.ParserRuleContext {
  public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
    super(parent, invokingState);
  }
  public term(): TermContext {
    return this.getRuleContext(0, TermContext)!;
  }
  public binaryOperator(): BinaryOperatorContext {
    return this.getRuleContext(0, BinaryOperatorContext)!;
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

export class TupleContext extends antlr.ParserRuleContext {
  public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
    super(parent, invokingState);
  }
  public OPEN_BRACKET(): antlr.TerminalNode {
    return this.getToken(PythonParser.OPEN_BRACKET, 0)!;
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
  public OPEN_SQ_BRACKET(): antlr.TerminalNode {
    return this.getToken(PythonParser.OPEN_SQ_BRACKET, 0)!;
  }
  public kvpList(): KvpListContext {
    return this.getRuleContext(0, KvpListContext)!;
  }
  public CLOSE_SQ_BRACKET(): antlr.TerminalNode {
    return this.getToken(PythonParser.CLOSE_SQ_BRACKET, 0)!;
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
  public argList(): ArgListContext {
    return this.getRuleContext(0, ArgListContext)!;
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

export class ListContext extends antlr.ParserRuleContext {
  public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
    super(parent, invokingState);
  }
  public OPEN_SQ_BRACKET(): antlr.TerminalNode {
    return this.getToken(PythonParser.OPEN_SQ_BRACKET, 0)!;
  }
  public expression(): ExpressionContext[];
  public expression(i: number): ExpressionContext | null;
  public expression(i?: number): ExpressionContext[] | ExpressionContext | null {
    if (i === undefined) {
      return this.getRuleContexts(ExpressionContext);
    }

    return this.getRuleContext(i, ExpressionContext);
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

export class InterpolatedStringContext extends antlr.ParserRuleContext {
  public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
    super(parent, invokingState);
  }
  public INTERPOLATED_STRING_PREFIX(): antlr.TerminalNode {
    return this.getToken(PythonParser.INTERPOLATED_STRING_PREFIX, 0)!;
  }
  public LITERAL_STRING(): antlr.TerminalNode {
    return this.getToken(PythonParser.LITERAL_STRING, 0)!;
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
