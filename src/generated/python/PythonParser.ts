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
  public static readonly LITERAL_STRING = 104;
  public static readonly WHITESPACES = 105;
  public static readonly TEXT = 106;
  public static readonly GHOSTED = 107;
  public static readonly FUNCTION_ANNOTATION = 108;
  public static readonly PROCECDURE_ANNOTATION = 109;
  public static readonly CONSTANT_ANNOTATION = 110;
  public static readonly ENUM_ANNOTATION = 111;
  public static readonly CONCRETE_CLASS_ANNOTATION = 112;
  public static readonly ABSTRACT_CLASS_ANNOTATION = 113;
  public static readonly VARIABLE_ANNOTATION = 114;
  public static readonly ASSIGNMENT_ANNOTATION = 115;
  public static readonly INPUT_ANNOTATION = 116;
  public static readonly CALL_ANNOTATION = 117;
  public static readonly LET_ANNOTATION = 118;
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
  public static readonly RULE_inputStatement = 16;
  public static readonly RULE_ifStatement = 17;
  public static readonly RULE_whileLoop = 18;
  public static readonly RULE_forLoop = 19;
  public static readonly RULE_procedureCall = 20;
  public static readonly RULE_tryStatement = 21;
  public static readonly RULE_throwStatement = 22;
  public static readonly RULE_assert = 23;
  public static readonly RULE_letStatement = 24;
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
  public static readonly RULE_identifier = 35;
  public static readonly RULE_assignable = 36;
  public static readonly RULE_methodName = 37;
  public static readonly RULE_testName = 38;
  public static readonly RULE_typeName = 39;
  public static readonly RULE_constantValue = 40;
  public static readonly RULE_argList = 41;
  public static readonly RULE_argument = 42;
  public static readonly RULE_paramsList = 43;
  public static readonly RULE_type = 44;
  public static readonly RULE_enumValuesList = 45;
  public static readonly RULE_assertActual = 46;
  public static readonly RULE_litValue = 47;
  public static readonly RULE_litBoolean = 48;
  public static readonly RULE_litInt = 49;
  public static readonly RULE_litFloat = 50;
  public static readonly RULE_enumValue = 51;
  public static readonly RULE_litString = 52;
  public static readonly RULE_index = 53;
  public static readonly RULE_identifierWithOptIndexes = 54;
  public static readonly RULE_propertyRef = 55;
  public static readonly RULE_expression = 56;
  public static readonly RULE_ifClause = 57;
  public static readonly RULE_term = 58;
  public static readonly RULE_chainHead = 59;
  public static readonly RULE_thisInstance = 60;
  public static readonly RULE_chainable = 61;
  public static readonly RULE_bracketedExpression = 62;
  public static readonly RULE_unaryExpression = 63;
  public static readonly RULE_binaryExpression = 64;
  public static readonly RULE_tuple = 65;
  public static readonly RULE_dictionary = 66;
  public static readonly RULE_kvpList = 67;
  public static readonly RULE_kvp = 68;
  public static readonly RULE_methodCall = 69;
  public static readonly RULE_binaryOperator = 70;
  public static readonly RULE_newInstance = 71;
  public static readonly RULE_paramDef = 72;
  public static readonly RULE_typeGeneric = 73;
  public static readonly RULE_typeFunc = 74;
  public static readonly RULE_typeTuple = 75;
  public static readonly RULE_lambda = 76;
  public static readonly RULE_list = 77;
  public static readonly RULE_interpolatedString = 78;
  public static readonly RULE_power = 79;

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
    "tryStatement",
    "throwStatement",
    "assert",
    "letStatement",
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
    "identifier",
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
    "enumValue",
    "litString",
    "index",
    "identifierWithOptIndexes",
    "propertyRef",
    "expression",
    "ifClause",
    "term",
    "chainHead",
    "thisInstance",
    "chainable",
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
    "power",
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
        while (_la === 1 || _la === 47 || _la === 98 || _la === 123) {
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
        this.state = 222;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (
          ((_la & ~0x1f) === 0 && ((1 << _la) & 26720) !== 0) ||
          (((_la - 52) & ~0x1f) === 0 && ((1 << (_la - 52)) & 683675121) !== 0) ||
          (((_la - 98) & ~0x1f) === 0 && ((1 << (_la - 98)) & 33554559) !== 0)
        ) {
          {
            this.state = 220;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 6, this.context)) {
              case 1:
                {
                  this.state = 218;
                  this.letStatement();
                }
                break;
              case 2:
                {
                  this.state = 219;
                  this.ordinaryStatement();
                }
                break;
            }
          }
          this.state = 224;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 225;
        this.returnStatement();
        this.state = 226;
        this.match(PythonParser.COMMENT);
        this.state = 227;
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
        this.state = 229;
        this.match(PythonParser.CLASS);
        this.state = 230;
        this.testName();
        this.state = 231;
        this.match(PythonParser.OPEN_BRACKET);
        this.state = 232;
        this.match(PythonParser.TESTCASE);
        this.state = 233;
        this.match(PythonParser.CLOSE_BRACKET);
        this.state = 234;
        this.match(PythonParser.COMMENT);
        this.state = 235;
        this.match(PythonParser.NL);
        this.state = 242;
        this.errorHandler.sync(this);
        alternative = this.interpreter.adaptivePredict(this.tokenStream, 9, this.context);
        while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
          if (alternative === 1) {
            {
              this.state = 240;
              this.errorHandler.sync(this);
              switch (this.interpreter.adaptivePredict(this.tokenStream, 8, this.context)) {
                case 1:
                  {
                    this.state = 236;
                    this.assert();
                  }
                  break;
                case 2:
                  {
                    this.state = 237;
                    this.letStatement();
                  }
                  break;
                case 3:
                  {
                    this.state = 238;
                    this.variableDefinition();
                  }
                  break;
                case 4:
                  {
                    this.state = 239;
                    this.comment();
                  }
                  break;
              }
            }
          }
          this.state = 244;
          this.errorHandler.sync(this);
          alternative = this.interpreter.adaptivePredict(this.tokenStream, 9, this.context);
        }
        this.state = 245;
        this.match(PythonParser.COMMENT);
        this.state = 246;
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
        this.state = 248;
        this.match(PythonParser.DEF);
        this.state = 249;
        this.methodName();
        this.state = 250;
        this.match(PythonParser.OPEN_BRACKET);
        this.state = 252;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 98) {
          {
            this.state = 251;
            this.paramsList();
          }
        }

        this.state = 254;
        this.match(PythonParser.CLOSE_BRACKET);
        this.state = 255;
        this.match(PythonParser.ARROW);
        this.state = 256;
        this.match(PythonParser.NONE);
        this.state = 257;
        this.match(PythonParser.COLON);
        this.state = 258;
        this.match(PythonParser.PROCECDURE_ANNOTATION);
        this.state = 259;
        this.match(PythonParser.NL);
        this.state = 263;
        this.errorHandler.sync(this);
        alternative = this.interpreter.adaptivePredict(this.tokenStream, 11, this.context);
        while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
          if (alternative === 1) {
            {
              {
                this.state = 260;
                this.ordinaryStatement();
              }
            }
          }
          this.state = 265;
          this.errorHandler.sync(this);
          alternative = this.interpreter.adaptivePredict(this.tokenStream, 11, this.context);
        }
        this.state = 266;
        this.match(PythonParser.COMMENT);
        this.state = 267;
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
        this.state = 269;
        this.identifier();
        this.state = 270;
        this.match(PythonParser.EQUAL);
        this.state = 271;
        this.constantValue();
        this.state = 272;
        this.match(PythonParser.CONSTANT_ANNOTATION);
        this.state = 273;
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
        this.state = 275;
        this.match(PythonParser.CLASS);
        this.state = 276;
        this.typeName();
        this.state = 277;
        this.match(PythonParser.OPEN_BRACKET);
        this.state = 278;
        this.match(PythonParser.ENUM);
        this.state = 279;
        this.match(PythonParser.CLOSE_BRACKET);
        this.state = 280;
        this.match(PythonParser.COLON);
        this.state = 281;
        this.match(PythonParser.ENUM_ANNOTATION);
        this.state = 282;
        this.match(PythonParser.NL);
        this.state = 283;
        this.enumValuesList();
        this.state = 284;
        this.match(PythonParser.NL);
        this.state = 285;
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
        this.state = 287;
        this.match(PythonParser.CLASS);
        this.state = 288;
        this.typeName();
        this.state = 293;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 81) {
          {
            this.state = 289;
            this.match(PythonParser.OPEN_BRACKET);
            this.state = 290;
            this.typeName();
            this.state = 291;
            this.match(PythonParser.CLOSE_BRACKET);
          }
        }

        this.state = 295;
        this.match(PythonParser.COLON);
        this.state = 296;
        this.match(PythonParser.CONCRETE_CLASS_ANNOTATION);
        this.state = 297;
        this.match(PythonParser.NL);
        this.state = 305;
        this.errorHandler.sync(this);
        alternative = this.interpreter.adaptivePredict(this.tokenStream, 14, this.context);
        while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
          if (alternative === 1) {
            {
              this.state = 303;
              this.errorHandler.sync(this);
              switch (this.interpreter.adaptivePredict(this.tokenStream, 13, this.context)) {
                case 1:
                  {
                    this.state = 298;
                    this.constructorMember();
                  }
                  break;
                case 2:
                  {
                    this.state = 299;
                    this.property();
                  }
                  break;
                case 3:
                  {
                    this.state = 300;
                    this.functionMethod();
                  }
                  break;
                case 4:
                  {
                    this.state = 301;
                    this.procedureMethod();
                  }
                  break;
                case 5:
                  {
                    this.state = 302;
                    this.comment();
                  }
                  break;
              }
            }
          }
          this.state = 307;
          this.errorHandler.sync(this);
          alternative = this.interpreter.adaptivePredict(this.tokenStream, 14, this.context);
        }
        this.state = 308;
        this.match(PythonParser.COMMENT);
        this.state = 309;
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
        this.state = 311;
        this.match(PythonParser.CLASS);
        this.state = 312;
        this.typeName();
        this.state = 317;
        this.errorHandler.sync(this);
        switch (this.tokenStream.LA(1)) {
          case PythonParser.OPEN_BRACKET:
            {
              this.state = 313;
              this.match(PythonParser.OPEN_BRACKET);
              this.state = 314;
              this.typeName();
            }
            break;
          case PythonParser.ABC:
            {
              this.state = 315;
              this.match(PythonParser.ABC);
              this.state = 316;
              this.match(PythonParser.CLOSE_BRACKET);
            }
            break;
          default:
            throw new antlr.NoViableAltException(this);
        }
        this.state = 319;
        this.match(PythonParser.ABSTRACT_CLASS_ANNOTATION);
        this.state = 320;
        this.match(PythonParser.NL);
        this.state = 329;
        this.errorHandler.sync(this);
        alternative = this.interpreter.adaptivePredict(this.tokenStream, 17, this.context);
        while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
          if (alternative === 1) {
            {
              this.state = 327;
              this.errorHandler.sync(this);
              switch (this.interpreter.adaptivePredict(this.tokenStream, 16, this.context)) {
                case 1:
                  {
                    this.state = 321;
                    this.property();
                  }
                  break;
                case 2:
                  {
                    this.state = 322;
                    this.functionMethod();
                  }
                  break;
                case 3:
                  {
                    this.state = 323;
                    this.procedureMethod();
                  }
                  break;
                case 4:
                  {
                    this.state = 324;
                    this.abstractFunction();
                  }
                  break;
                case 5:
                  {
                    this.state = 325;
                    this.abstractProcedure();
                  }
                  break;
                case 6:
                  {
                    this.state = 326;
                    this.comment();
                  }
                  break;
              }
            }
          }
          this.state = 331;
          this.errorHandler.sync(this);
          alternative = this.interpreter.adaptivePredict(this.tokenStream, 17, this.context);
        }
        this.state = 332;
        this.match(PythonParser.COMMENT);
        this.state = 333;
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
        this.state = 335;
        this.commentText();
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
  public commentText(): CommentTextContext {
    let localContext = new CommentTextContext(this.context, this.state);
    this.enterRule(localContext, 22, PythonParser.RULE_commentText);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 338;
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
      this.state = 351;
      this.errorHandler.sync(this);
      switch (this.interpreter.adaptivePredict(this.tokenStream, 18, this.context)) {
        case 1:
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 340;
            this.print();
          }
          break;
        case 2:
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 341;
            this.variableDefinition();
          }
          break;
        case 3:
          this.enterOuterAlt(localContext, 3);
          {
            this.state = 342;
            this.assignment();
          }
          break;
        case 4:
          this.enterOuterAlt(localContext, 4);
          {
            this.state = 343;
            this.inputStatement();
          }
          break;
        case 5:
          this.enterOuterAlt(localContext, 5);
          {
            this.state = 344;
            this.ifStatement();
          }
          break;
        case 6:
          this.enterOuterAlt(localContext, 6);
          {
            this.state = 345;
            this.whileLoop();
          }
          break;
        case 7:
          this.enterOuterAlt(localContext, 7);
          {
            this.state = 346;
            this.forLoop();
          }
          break;
        case 8:
          this.enterOuterAlt(localContext, 8);
          {
            this.state = 347;
            this.procedureCall();
          }
          break;
        case 9:
          this.enterOuterAlt(localContext, 9);
          {
            this.state = 348;
            this.tryStatement();
          }
          break;
        case 10:
          this.enterOuterAlt(localContext, 10);
          {
            this.state = 349;
            this.throwStatement();
          }
          break;
        case 11:
          this.enterOuterAlt(localContext, 11);
          {
            this.state = 350;
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
        this.state = 353;
        this.match(PythonParser.PRINT);
        this.state = 354;
        this.match(PythonParser.OPEN_BRACKET);
        this.state = 356;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (
          (((_la - 55) & ~0x1f) === 0 && ((1 << (_la - 55)) & 85461503) !== 0) ||
          (((_la - 87) & ~0x1f) === 0 && ((1 << (_la - 87)) & 260097) !== 0)
        ) {
          {
            this.state = 355;
            this.expression(0);
          }
        }

        this.state = 358;
        this.match(PythonParser.CLOSE_BRACKET);
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
  public variableDefinition(): VariableDefinitionContext {
    let localContext = new VariableDefinitionContext(this.context, this.state);
    this.enterRule(localContext, 28, PythonParser.RULE_variableDefinition);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 361;
        this.identifier();
        this.state = 362;
        this.match(PythonParser.EQUAL);
        this.state = 363;
        this.expression(0);
        this.state = 364;
        this.match(PythonParser.VARIABLE_ANNOTATION);
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
  public assignment(): AssignmentContext {
    let localContext = new AssignmentContext(this.context, this.state);
    this.enterRule(localContext, 30, PythonParser.RULE_assignment);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 367;
        this.assignable();
        this.state = 368;
        this.match(PythonParser.EQUAL);
        this.state = 369;
        this.expression(0);
        this.state = 370;
        this.match(PythonParser.ASSIGNMENT_ANNOTATION);
        this.state = 371;
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
        this.state = 373;
        this.identifier();
        this.state = 374;
        this.match(PythonParser.EQUAL);
        this.state = 375;
        this.match(PythonParser.INPUT);
        this.state = 376;
        this.match(PythonParser.OPEN_BRACKET);
        this.state = 377;
        this.expression(0);
        this.state = 378;
        this.match(PythonParser.CLOSE_BRACKET);
        this.state = 379;
        this.match(PythonParser.INPUT_ANNOTATION);
        this.state = 380;
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
        this.state = 382;
        this.match(PythonParser.IF);
        this.state = 383;
        this.expression(0);
        this.state = 384;
        this.match(PythonParser.COLON);
        this.state = 385;
        this.match(PythonParser.NL);
        this.state = 391;
        this.errorHandler.sync(this);
        alternative = this.interpreter.adaptivePredict(this.tokenStream, 21, this.context);
        while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
          if (alternative === 1) {
            {
              this.state = 389;
              this.errorHandler.sync(this);
              switch (this.tokenStream.LA(1)) {
                case PythonParser.ELIF:
                  {
                    this.state = 386;
                    this.elseIfClause();
                  }
                  break;
                case PythonParser.ELSE:
                  {
                    this.state = 387;
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
                case PythonParser.COMMENT:
                  {
                    this.state = 388;
                    this.ordinaryStatement();
                  }
                  break;
                default:
                  throw new antlr.NoViableAltException(this);
              }
            }
          }
          this.state = 393;
          this.errorHandler.sync(this);
          alternative = this.interpreter.adaptivePredict(this.tokenStream, 21, this.context);
        }
        this.state = 394;
        this.match(PythonParser.COMMENT);
        this.state = 395;
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
        this.state = 397;
        this.match(PythonParser.WHILE);
        this.state = 398;
        this.expression(0);
        this.state = 399;
        this.match(PythonParser.COLON);
        this.state = 400;
        this.match(PythonParser.NL);
        this.state = 404;
        this.errorHandler.sync(this);
        alternative = this.interpreter.adaptivePredict(this.tokenStream, 22, this.context);
        while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
          if (alternative === 1) {
            {
              {
                this.state = 401;
                this.ordinaryStatement();
              }
            }
          }
          this.state = 406;
          this.errorHandler.sync(this);
          alternative = this.interpreter.adaptivePredict(this.tokenStream, 22, this.context);
        }
        this.state = 407;
        this.match(PythonParser.COMMENT);
        this.state = 408;
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
        this.state = 410;
        this.match(PythonParser.FOR);
        this.state = 411;
        this.identifier();
        this.state = 412;
        this.match(PythonParser.IN);
        this.state = 413;
        this.expression(0);
        this.state = 414;
        this.match(PythonParser.COLON);
        this.state = 415;
        this.match(PythonParser.NL);
        this.state = 419;
        this.errorHandler.sync(this);
        alternative = this.interpreter.adaptivePredict(this.tokenStream, 23, this.context);
        while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
          if (alternative === 1) {
            {
              {
                this.state = 416;
                this.ordinaryStatement();
              }
            }
          }
          this.state = 421;
          this.errorHandler.sync(this);
          alternative = this.interpreter.adaptivePredict(this.tokenStream, 23, this.context);
        }
        this.state = 422;
        this.match(PythonParser.COMMENT);
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
  public procedureCall(): ProcedureCallContext {
    let localContext = new ProcedureCallContext(this.context, this.state);
    this.enterRule(localContext, 40, PythonParser.RULE_procedureCall);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 425;
        this.term();
        this.state = 426;
        this.match(PythonParser.CALL_ANNOTATION);
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
  public tryStatement(): TryStatementContext {
    let localContext = new TryStatementContext(this.context, this.state);
    this.enterRule(localContext, 42, PythonParser.RULE_tryStatement);
    let _la: number;
    try {
      let alternative: number;
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 429;
        this.match(PythonParser.TRY);
        this.state = 430;
        this.match(PythonParser.NL);
        this.state = 434;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (
          ((_la & ~0x1f) === 0 && ((1 << _la) & 26720) !== 0) ||
          (((_la - 52) & ~0x1f) === 0 && ((1 << (_la - 52)) & 683675121) !== 0) ||
          (((_la - 98) & ~0x1f) === 0 && ((1 << (_la - 98)) & 33554559) !== 0)
        ) {
          {
            {
              this.state = 431;
              this.ordinaryStatement();
            }
          }
          this.state = 436;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 437;
        this.catchStatement();
        this.state = 441;
        this.errorHandler.sync(this);
        alternative = this.interpreter.adaptivePredict(this.tokenStream, 25, this.context);
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
          alternative = this.interpreter.adaptivePredict(this.tokenStream, 25, this.context);
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
  public throwStatement(): ThrowStatementContext {
    let localContext = new ThrowStatementContext(this.context, this.state);
    this.enterRule(localContext, 44, PythonParser.RULE_throwStatement);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 447;
        this.match(PythonParser.RAISE);
        this.state = 448;
        this.typeName();
        this.state = 449;
        this.match(PythonParser.OPEN_BRACKET);
        this.state = 450;
        this.litString();
        this.state = 451;
        this.match(PythonParser.CLOSE_BRACKET);
        this.state = 452;
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
    this.enterRule(localContext, 46, PythonParser.RULE_assert);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 454;
        this.match(PythonParser.THIS_INSTANCE);
        this.state = 455;
        this.match(PythonParser.DOT);
        this.state = 456;
        this.match(PythonParser.ASSERT_EQUAL);
        this.state = 457;
        this.match(PythonParser.OPEN_BRACKET);
        this.state = 458;
        this.assertActual();
        this.state = 459;
        this.match(PythonParser.COMMA);
        this.state = 460;
        this.expression(0);
        this.state = 461;
        this.match(PythonParser.CLOSE_BRACKET);
        this.state = 462;
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
  public letStatement(): LetStatementContext {
    let localContext = new LetStatementContext(this.context, this.state);
    this.enterRule(localContext, 48, PythonParser.RULE_letStatement);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 464;
        this.identifier();
        this.state = 465;
        this.match(PythonParser.EQUAL);
        this.state = 466;
        this.expression(0);
        this.state = 467;
        this.match(PythonParser.LET_ANNOTATION);
        this.state = 468;
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
        this.state = 470;
        this.match(PythonParser.RETURN);
        this.state = 471;
        this.expression(0);
        this.state = 472;
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
        this.state = 474;
        this.match(PythonParser.ELIF);
        this.state = 475;
        this.expression(0);
        this.state = 476;
        this.match(PythonParser.COLON);
        this.state = 477;
        this.match(PythonParser.ELSE_IF_ANNOTATION);
        this.state = 478;
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
        this.state = 480;
        this.match(PythonParser.ELSE);
        this.state = 481;
        this.match(PythonParser.COLON);
        this.state = 482;
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
        this.state = 484;
        this.match(PythonParser.EXCEPT);
        this.state = 485;
        this.typeName();
        this.state = 486;
        this.match(PythonParser.AS);
        this.state = 487;
        this.identifier();
        this.state = 488;
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
        this.state = 490;
        this.match(PythonParser.DEF);
        this.state = 491;
        this.match(PythonParser.INIT);
        this.state = 492;
        this.match(PythonParser.OPEN_BRACKET);
        this.state = 494;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 98) {
          {
            this.state = 493;
            this.paramsList();
          }
        }

        this.state = 496;
        this.match(PythonParser.CLOSE_BRACKET);
        this.state = 497;
        this.match(PythonParser.ARROW);
        this.state = 498;
        this.match(PythonParser.NONE);
        this.state = 499;
        this.match(PythonParser.COLON);
        this.state = 500;
        this.match(PythonParser.NL);
        this.state = 504;
        this.errorHandler.sync(this);
        alternative = this.interpreter.adaptivePredict(this.tokenStream, 27, this.context);
        while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
          if (alternative === 1) {
            {
              {
                this.state = 501;
                this.ordinaryStatement();
              }
            }
          }
          this.state = 506;
          this.errorHandler.sync(this);
          alternative = this.interpreter.adaptivePredict(this.tokenStream, 27, this.context);
        }
        this.state = 507;
        this.match(PythonParser.COMMENT);
        this.state = 508;
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
        this.state = 510;
        this.identifier();
        this.state = 511;
        this.match(PythonParser.COLON);
        this.state = 512;
        this.type_();
        this.state = 513;
        this.match(PythonParser.PROPERTY_ANNOTATION);
        this.state = 514;
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
        this.state = 516;
        this.match(PythonParser.DEF);
        this.state = 517;
        this.methodName();
        this.state = 518;
        this.match(PythonParser.OPEN_BRACKET);
        this.state = 520;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 98) {
          {
            this.state = 519;
            this.paramsList();
          }
        }

        this.state = 522;
        this.match(PythonParser.CLOSE_BRACKET);
        this.state = 523;
        this.match(PythonParser.ARROW);
        this.state = 524;
        this.type_();
        this.state = 525;
        this.match(PythonParser.COLON);
        this.state = 526;
        this.match(PythonParser.FUNCTION_METHOD_ANNOTATION);
        this.state = 527;
        this.match(PythonParser.NL);
        this.state = 532;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (
          ((_la & ~0x1f) === 0 && ((1 << _la) & 26720) !== 0) ||
          (((_la - 52) & ~0x1f) === 0 && ((1 << (_la - 52)) & 683675121) !== 0) ||
          (((_la - 98) & ~0x1f) === 0 && ((1 << (_la - 98)) & 33554559) !== 0)
        ) {
          {
            this.state = 530;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 29, this.context)) {
              case 1:
                {
                  this.state = 528;
                  this.letStatement();
                }
                break;
              case 2:
                {
                  this.state = 529;
                  this.ordinaryStatement();
                }
                break;
            }
          }
          this.state = 534;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 535;
        this.returnStatement();
        this.state = 536;
        this.match(PythonParser.COMMENT);
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
  public procedureMethod(): ProcedureMethodContext {
    let localContext = new ProcedureMethodContext(this.context, this.state);
    this.enterRule(localContext, 64, PythonParser.RULE_procedureMethod);
    let _la: number;
    try {
      let alternative: number;
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 539;
        this.match(PythonParser.DEF);
        this.state = 540;
        this.methodName();
        this.state = 541;
        this.match(PythonParser.OPEN_BRACKET);
        this.state = 543;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 98) {
          {
            this.state = 542;
            this.paramsList();
          }
        }

        this.state = 545;
        this.match(PythonParser.CLOSE_BRACKET);
        this.state = 546;
        this.match(PythonParser.ARROW);
        this.state = 547;
        this.match(PythonParser.NONE);
        this.state = 548;
        this.match(PythonParser.COLON);
        this.state = 549;
        this.match(PythonParser.PROCEDURE_METHOD_ANNOTATION);
        this.state = 550;
        this.match(PythonParser.NL);
        this.state = 554;
        this.errorHandler.sync(this);
        alternative = this.interpreter.adaptivePredict(this.tokenStream, 32, this.context);
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
          alternative = this.interpreter.adaptivePredict(this.tokenStream, 32, this.context);
        }
        this.state = 557;
        this.match(PythonParser.COMMENT);
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
  public abstractFunction(): AbstractFunctionContext {
    let localContext = new AbstractFunctionContext(this.context, this.state);
    this.enterRule(localContext, 66, PythonParser.RULE_abstractFunction);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 560;
        this.match(PythonParser.ABSTRACT_METHOD);
        this.state = 561;
        this.match(PythonParser.NL);
        this.state = 562;
        this.match(PythonParser.DEF);
        this.state = 563;
        this.methodName();
        this.state = 564;
        this.match(PythonParser.OPEN_BRACKET);
        this.state = 566;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 98) {
          {
            this.state = 565;
            this.paramsList();
          }
        }

        this.state = 568;
        this.match(PythonParser.CLOSE_BRACKET);
        this.state = 569;
        this.match(PythonParser.ARROW);
        this.state = 570;
        this.type_();
        this.state = 571;
        this.match(PythonParser.COLON);
        this.state = 572;
        this.match(PythonParser.NL);
        this.state = 573;
        this.match(PythonParser.PASS);
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
  public abstractProcedure(): AbstractProcedureContext {
    let localContext = new AbstractProcedureContext(this.context, this.state);
    this.enterRule(localContext, 68, PythonParser.RULE_abstractProcedure);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 577;
        this.match(PythonParser.ABSTRACT_METHOD);
        this.state = 578;
        this.match(PythonParser.NL);
        this.state = 579;
        this.match(PythonParser.DEF);
        this.state = 580;
        this.methodName();
        this.state = 581;
        this.match(PythonParser.OPEN_BRACKET);
        this.state = 583;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 98) {
          {
            this.state = 582;
            this.paramsList();
          }
        }

        this.state = 585;
        this.match(PythonParser.CLOSE_BRACKET);
        this.state = 586;
        this.match(PythonParser.ARROW);
        this.state = 587;
        this.match(PythonParser.NONE);
        this.state = 588;
        this.match(PythonParser.COLON);
        this.state = 589;
        this.match(PythonParser.NL);
        this.state = 590;
        this.match(PythonParser.PASS);
        this.state = 591;
        this.match(PythonParser.COMMENT);
        this.state = 592;
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
  public identifier(): IdentifierContext {
    let localContext = new IdentifierContext(this.context, this.state);
    this.enterRule(localContext, 70, PythonParser.RULE_identifier);
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
  public assignable(): AssignableContext {
    let localContext = new AssignableContext(this.context, this.state);
    this.enterRule(localContext, 72, PythonParser.RULE_assignable);
    try {
      this.state = 598;
      this.errorHandler.sync(this);
      switch (this.tokenStream.LA(1)) {
        case PythonParser.NAME_STARTING_LC:
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 596;
            this.identifierWithOptIndexes();
          }
          break;
        case PythonParser.THIS_INSTANCE:
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 597;
            this.propertyRef();
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
  public methodName(): MethodNameContext {
    let localContext = new MethodNameContext(this.context, this.state);
    this.enterRule(localContext, 74, PythonParser.RULE_methodName);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 600;
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
    this.enterRule(localContext, 76, PythonParser.RULE_testName);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 602;
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
    this.enterRule(localContext, 78, PythonParser.RULE_typeName);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 604;
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
    this.enterRule(localContext, 80, PythonParser.RULE_constantValue);
    try {
      this.state = 608;
      this.errorHandler.sync(this);
      switch (this.tokenStream.LA(1)) {
        case PythonParser.INT_NAME:
        case PythonParser.FLOAT_NAME:
        case PythonParser.BOOL_NAME:
        case PythonParser.STRING_NAME:
        case PythonParser.LIST_NAME:
        case PythonParser.TRUE:
        case PythonParser.FALSE:
        case PythonParser.INTERPOLATED_STRING_PREFIX:
        case PythonParser.NAME_STARTING_UC:
        case PythonParser.LITERAL_BINARY:
        case PythonParser.LITERAL_HEX:
        case PythonParser.LITERAL_INTEGER:
        case PythonParser.LITERAL_FLOAT:
        case PythonParser.LITERAL_STRING:
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 606;
            this.litValue();
          }
          break;
        case PythonParser.NAME_STARTING_LC:
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 607;
            this.identifier();
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
    this.enterRule(localContext, 82, PythonParser.RULE_argList);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 610;
        this.argument();
        this.state = 615;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (_la === 84) {
          {
            {
              this.state = 611;
              this.match(PythonParser.COMMA);
              this.state = 612;
              this.argument();
            }
          }
          this.state = 617;
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
    this.enterRule(localContext, 84, PythonParser.RULE_argument);
    try {
      this.state = 620;
      this.errorHandler.sync(this);
      switch (this.tokenStream.LA(1)) {
        case PythonParser.LAMBDA:
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 618;
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
            this.state = 619;
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
    this.enterRule(localContext, 86, PythonParser.RULE_paramsList);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 622;
        this.paramDef();
        this.state = 627;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (_la === 84) {
          {
            {
              this.state = 623;
              this.match(PythonParser.COMMA);
              this.state = 624;
              this.paramDef();
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
  public type_(): TypeContext {
    let localContext = new TypeContext(this.context, this.state);
    this.enterRule(localContext, 88, PythonParser.RULE_type);
    try {
      this.state = 634;
      this.errorHandler.sync(this);
      switch (this.interpreter.adaptivePredict(this.tokenStream, 40, this.context)) {
        case 1:
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 630;
            this.typeTuple();
          }
          break;
        case 2:
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 631;
            this.typeName();
          }
          break;
        case 3:
          this.enterOuterAlt(localContext, 3);
          {
            this.state = 632;
            this.typeGeneric();
          }
          break;
        case 4:
          this.enterOuterAlt(localContext, 4);
          {
            this.state = 633;
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
    this.enterRule(localContext, 90, PythonParser.RULE_enumValuesList);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 636;
        this.identifier();
        this.state = 641;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (_la === 84) {
          {
            {
              this.state = 637;
              this.match(PythonParser.COMMA);
              this.state = 638;
              this.identifier();
            }
          }
          this.state = 643;
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
    this.enterRule(localContext, 92, PythonParser.RULE_assertActual);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 644;
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
    this.enterRule(localContext, 94, PythonParser.RULE_litValue);
    try {
      this.state = 651;
      this.errorHandler.sync(this);
      switch (this.tokenStream.LA(1)) {
        case PythonParser.TRUE:
        case PythonParser.FALSE:
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 646;
            this.litBoolean();
          }
          break;
        case PythonParser.LITERAL_BINARY:
        case PythonParser.LITERAL_HEX:
        case PythonParser.LITERAL_INTEGER:
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 647;
            this.litInt();
          }
          break;
        case PythonParser.LITERAL_FLOAT:
          this.enterOuterAlt(localContext, 3);
          {
            this.state = 648;
            this.litFloat();
          }
          break;
        case PythonParser.INTERPOLATED_STRING_PREFIX:
        case PythonParser.LITERAL_STRING:
          this.enterOuterAlt(localContext, 4);
          {
            this.state = 649;
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
            this.state = 650;
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
    this.enterRule(localContext, 96, PythonParser.RULE_litBoolean);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 653;
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
    this.enterRule(localContext, 98, PythonParser.RULE_litInt);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 655;
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
    this.enterRule(localContext, 100, PythonParser.RULE_litFloat);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 657;
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
  public enumValue(): EnumValueContext {
    let localContext = new EnumValueContext(this.context, this.state);
    this.enterRule(localContext, 102, PythonParser.RULE_enumValue);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 659;
        this.typeName();
        this.state = 660;
        this.match(PythonParser.DOT);
        this.state = 661;
        this.identifier();
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
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
        this.state = 664;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 74) {
          {
            this.state = 663;
            this.match(PythonParser.INTERPOLATED_STRING_PREFIX);
          }
        }

        this.state = 666;
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
  public index(): IndexContext {
    let localContext = new IndexContext(this.context, this.state);
    this.enterRule(localContext, 106, PythonParser.RULE_index);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 668;
        this.match(PythonParser.OPEN_SQ_BRACKET);
        this.state = 669;
        this.expression(0);
        this.state = 670;
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
  public identifierWithOptIndexes(): IdentifierWithOptIndexesContext {
    let localContext = new IdentifierWithOptIndexesContext(this.context, this.state);
    this.enterRule(localContext, 108, PythonParser.RULE_identifierWithOptIndexes);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 672;
        this.identifier();
        this.state = 676;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (_la === 79) {
          {
            {
              this.state = 673;
              this.index();
            }
          }
          this.state = 678;
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
  public propertyRef(): PropertyRefContext {
    let localContext = new PropertyRefContext(this.context, this.state);
    this.enterRule(localContext, 110, PythonParser.RULE_propertyRef);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 679;
        this.match(PythonParser.THIS_INSTANCE);
        this.state = 680;
        this.match(PythonParser.DOT);
        this.state = 681;
        this.identifierWithOptIndexes();
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
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
        this.state = 688;
        this.errorHandler.sync(this);
        switch (this.interpreter.adaptivePredict(this.tokenStream, 45, this.context)) {
          case 1:
            {
              this.state = 684;
              this.newInstance();
            }
            break;
          case 2:
            {
              this.state = 685;
              this.unaryExpression();
            }
            break;
          case 3:
            {
              this.state = 686;
              this.term();
            }
            break;
          case 4:
            {
              this.state = 687;
              this.binaryExpression();
            }
            break;
        }
        this.context!.stop = this.tokenStream.LT(-1);
        this.state = 694;
        this.errorHandler.sync(this);
        alternative = this.interpreter.adaptivePredict(this.tokenStream, 46, this.context);
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
                this.state = 690;
                if (!this.precpred(this.context, 1)) {
                  throw this.createFailedPredicateException("this.precpred(this.context, 1)");
                }
                this.state = 691;
                this.ifClause();
              }
            }
          }
          this.state = 696;
          this.errorHandler.sync(this);
          alternative = this.interpreter.adaptivePredict(this.tokenStream, 46, this.context);
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
        this.state = 697;
        this.match(PythonParser.IF);
        this.state = 698;
        this.expression(0);
        this.state = 703;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (_la === 2) {
          {
            {
              this.state = 699;
              this.match(PythonParser.ELIF);
              this.state = 700;
              this.expression(0);
            }
          }
          this.state = 705;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 706;
        this.match(PythonParser.ELSE);
        this.state = 707;
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
      let alternative: number;
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 709;
        this.chainHead();
        this.state = 714;
        this.errorHandler.sync(this);
        alternative = this.interpreter.adaptivePredict(this.tokenStream, 48, this.context);
        while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
          if (alternative === 1) {
            {
              {
                this.state = 710;
                this.match(PythonParser.DOT);
                this.state = 711;
                this.chainable();
              }
            }
          }
          this.state = 716;
          this.errorHandler.sync(this);
          alternative = this.interpreter.adaptivePredict(this.tokenStream, 48, this.context);
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
      switch (this.interpreter.adaptivePredict(this.tokenStream, 49, this.context)) {
        case 1:
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 717;
            this.thisInstance();
          }
          break;
        case 2:
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 718;
            this.bracketedExpression();
          }
          break;
        case 3:
          this.enterOuterAlt(localContext, 3);
          {
            this.state = 719;
            this.tuple();
          }
          break;
        case 4:
          this.enterOuterAlt(localContext, 4);
          {
            this.state = 720;
            this.litValue();
          }
          break;
        case 5:
          this.enterOuterAlt(localContext, 5);
          {
            this.state = 721;
            this.list();
          }
          break;
        case 6:
          this.enterOuterAlt(localContext, 6);
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
  public thisInstance(): ThisInstanceContext {
    let localContext = new ThisInstanceContext(this.context, this.state);
    this.enterRule(localContext, 120, PythonParser.RULE_thisInstance);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 725;
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
  public chainable(): ChainableContext {
    let localContext = new ChainableContext(this.context, this.state);
    this.enterRule(localContext, 122, PythonParser.RULE_chainable);
    try {
      let alternative: number;
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 729;
        this.errorHandler.sync(this);
        switch (this.interpreter.adaptivePredict(this.tokenStream, 50, this.context)) {
          case 1:
            {
              this.state = 727;
              this.identifier();
            }
            break;
          case 2:
            {
              this.state = 728;
              this.methodCall();
            }
            break;
        }
        this.state = 734;
        this.errorHandler.sync(this);
        alternative = this.interpreter.adaptivePredict(this.tokenStream, 51, this.context);
        while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
          if (alternative === 1) {
            {
              {
                this.state = 731;
                this.index();
              }
            }
          }
          this.state = 736;
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
  public bracketedExpression(): BracketedExpressionContext {
    let localContext = new BracketedExpressionContext(this.context, this.state);
    this.enterRule(localContext, 124, PythonParser.RULE_bracketedExpression);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 737;
        this.match(PythonParser.OPEN_BRACKET);
        this.state = 738;
        this.expression(0);
        this.state = 739;
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
    this.enterRule(localContext, 126, PythonParser.RULE_unaryExpression);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 741;
        _la = this.tokenStream.LA(1);
        if (!(_la === 66 || _la === 87)) {
          this.errorHandler.recoverInline(this);
        } else {
          this.errorHandler.reportMatch(this);
          this.consume();
        }
        this.state = 742;
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
    this.enterRule(localContext, 128, PythonParser.RULE_binaryExpression);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 744;
        this.term();
        this.state = 745;
        this.binaryOperator();
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
  public tuple(): TupleContext {
    let localContext = new TupleContext(this.context, this.state);
    this.enterRule(localContext, 130, PythonParser.RULE_tuple);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 748;
        this.match(PythonParser.OPEN_BRACKET);
        this.state = 749;
        this.expression(0);
        this.state = 750;
        this.match(PythonParser.COMMA);
        this.state = 751;
        this.expression(0);
        this.state = 756;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (_la === 84) {
          {
            {
              this.state = 752;
              this.match(PythonParser.COMMA);
              this.state = 753;
              this.expression(0);
            }
          }
          this.state = 758;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 759;
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
    this.enterRule(localContext, 132, PythonParser.RULE_dictionary);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 761;
        this.match(PythonParser.OPEN_SQ_BRACKET);
        this.state = 762;
        this.kvpList();
        this.state = 763;
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
    this.enterRule(localContext, 134, PythonParser.RULE_kvpList);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 765;
        this.kvp();
        this.state = 770;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (_la === 84) {
          {
            {
              this.state = 766;
              this.match(PythonParser.COMMA);
              this.state = 767;
              this.kvp();
            }
          }
          this.state = 772;
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
    this.enterRule(localContext, 136, PythonParser.RULE_kvp);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 773;
        this.expression(0);
        this.state = 774;
        this.match(PythonParser.COLON);
        this.state = 775;
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
    this.enterRule(localContext, 138, PythonParser.RULE_methodCall);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 777;
        this.methodName();
        this.state = 778;
        this.match(PythonParser.OPEN_BRACKET);
        this.state = 780;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (
          _la === 9 ||
          (((_la - 55) & ~0x1f) === 0 && ((1 << (_la - 55)) & 85461503) !== 0) ||
          (((_la - 87) & ~0x1f) === 0 && ((1 << (_la - 87)) & 260097) !== 0)
        ) {
          {
            this.state = 779;
            this.argList();
          }
        }

        this.state = 782;
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
    this.enterRule(localContext, 140, PythonParser.RULE_binaryOperator);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 784;
        _la = this.tokenStream.LA(1);
        if (!(((_la - 64) & ~0x1f) === 0 && ((1 << (_la - 64)) & 1069547579) !== 0)) {
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
    this.enterRule(localContext, 142, PythonParser.RULE_newInstance);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 786;
        this.type_();
        this.state = 787;
        this.match(PythonParser.OPEN_BRACKET);
        this.state = 789;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (
          _la === 9 ||
          (((_la - 55) & ~0x1f) === 0 && ((1 << (_la - 55)) & 85461503) !== 0) ||
          (((_la - 87) & ~0x1f) === 0 && ((1 << (_la - 87)) & 260097) !== 0)
        ) {
          {
            this.state = 788;
            this.argList();
          }
        }

        this.state = 791;
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
    this.enterRule(localContext, 144, PythonParser.RULE_paramDef);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 793;
        this.identifier();
        this.state = 794;
        this.match(PythonParser.COLON);
        this.state = 795;
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
    this.enterRule(localContext, 146, PythonParser.RULE_typeGeneric);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 797;
        this.typeName();
        this.state = 798;
        this.match(PythonParser.OPEN_SQ_BRACKET);
        this.state = 799;
        this.type_();
        this.state = 804;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (_la === 84) {
          {
            {
              this.state = 800;
              this.match(PythonParser.COMMA);
              this.state = 801;
              this.type_();
            }
          }
          this.state = 806;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 807;
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
    this.enterRule(localContext, 148, PythonParser.RULE_typeFunc);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 809;
        this.match(PythonParser.FUNC_NAME);
        this.state = 810;
        this.match(PythonParser.OPEN_SQ_BRACKET);
        this.state = 811;
        this.match(PythonParser.OPEN_SQ_BRACKET);
        this.state = 812;
        this.type_();
        this.state = 817;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (_la === 84) {
          {
            {
              this.state = 813;
              this.match(PythonParser.COMMA);
              this.state = 814;
              this.type_();
            }
          }
          this.state = 819;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 820;
        this.match(PythonParser.CLOSE_SQ_BRACKET);
        this.state = 821;
        this.match(PythonParser.COMMA);
        this.state = 822;
        this.type_();
        this.state = 823;
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
    this.enterRule(localContext, 150, PythonParser.RULE_typeTuple);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 825;
        this.match(PythonParser.TUPLE);
        this.state = 826;
        this.match(PythonParser.OPEN_SQ_BRACKET);
        this.state = 827;
        this.type_();
        this.state = 830;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        do {
          {
            {
              this.state = 828;
              this.match(PythonParser.COMMA);
              this.state = 829;
              this.type_();
            }
          }
          this.state = 832;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        } while (_la === 84);
        this.state = 834;
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
    this.enterRule(localContext, 152, PythonParser.RULE_lambda);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 836;
        this.match(PythonParser.LAMBDA);
        this.state = 837;
        this.argList();
        this.state = 838;
        this.match(PythonParser.COLON);
        this.state = 839;
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
    this.enterRule(localContext, 154, PythonParser.RULE_list);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 841;
        this.match(PythonParser.OPEN_SQ_BRACKET);
        this.state = 842;
        this.expression(0);
        this.state = 847;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (_la === 84) {
          {
            {
              this.state = 843;
              this.match(PythonParser.COMMA);
              this.state = 844;
              this.expression(0);
            }
          }
          this.state = 849;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 850;
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
    this.enterRule(localContext, 156, PythonParser.RULE_interpolatedString);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 852;
        this.match(PythonParser.INTERPOLATED_STRING_PREFIX);
        this.state = 853;
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
  public power(): PowerContext {
    let localContext = new PowerContext(this.context, this.state);
    this.enterRule(localContext, 158, PythonParser.RULE_power);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 855;
        this.term();
        this.state = 856;
        this.match(PythonParser.POWER);
        this.state = 857;
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

  public override sempred(
    localContext: antlr.ParserRuleContext | null,
    ruleIndex: number,
    predIndex: number,
  ): boolean {
    switch (ruleIndex) {
      case 56:
        return this.expression_sempred(localContext as ExpressionContext, predIndex);
    }
    return true;
  }
  private expression_sempred(localContext: ExpressionContext | null, predIndex: number): boolean {
    switch (predIndex) {
      case 0:
        return this.precpred(this.context, 1);
    }
    return true;
  }

  public static readonly _serializedATN: number[] = [
    4, 1, 123, 860, 2, 0, 7, 0, 2, 1, 7, 1, 2, 2, 7, 2, 2, 3, 7, 3, 2, 4, 7, 4, 2, 5, 7, 5, 2, 6, 7,
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
    1, 3, 5, 3, 221, 8, 3, 10, 3, 12, 3, 224, 9, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 4, 1, 4, 1, 4, 1, 4,
    1, 4, 1, 4, 1, 4, 1, 4, 1, 4, 1, 4, 1, 4, 5, 4, 241, 8, 4, 10, 4, 12, 4, 244, 9, 4, 1, 4, 1, 4,
    1, 4, 1, 5, 1, 5, 1, 5, 1, 5, 3, 5, 253, 8, 5, 1, 5, 1, 5, 1, 5, 1, 5, 1, 5, 1, 5, 1, 5, 5, 5,
    262, 8, 5, 10, 5, 12, 5, 265, 9, 5, 1, 5, 1, 5, 1, 5, 1, 6, 1, 6, 1, 6, 1, 6, 1, 6, 1, 6, 1, 7,
    1, 7, 1, 7, 1, 7, 1, 7, 1, 7, 1, 7, 1, 7, 1, 7, 1, 7, 1, 7, 1, 7, 1, 8, 1, 8, 1, 8, 1, 8, 1, 8,
    1, 8, 3, 8, 294, 8, 8, 1, 8, 1, 8, 1, 8, 1, 8, 1, 8, 1, 8, 1, 8, 1, 8, 5, 8, 304, 8, 8, 10, 8,
    12, 8, 307, 9, 8, 1, 8, 1, 8, 1, 8, 1, 9, 1, 9, 1, 9, 1, 9, 1, 9, 1, 9, 3, 9, 318, 8, 9, 1, 9,
    1, 9, 1, 9, 1, 9, 1, 9, 1, 9, 1, 9, 1, 9, 5, 9, 328, 8, 9, 10, 9, 12, 9, 331, 9, 9, 1, 9, 1, 9,
    1, 9, 1, 10, 1, 10, 1, 10, 1, 11, 1, 11, 1, 12, 1, 12, 1, 12, 1, 12, 1, 12, 1, 12, 1, 12, 1, 12,
    1, 12, 1, 12, 1, 12, 3, 12, 352, 8, 12, 1, 13, 1, 13, 1, 13, 3, 13, 357, 8, 13, 1, 13, 1, 13, 1,
    13, 1, 14, 1, 14, 1, 14, 1, 14, 1, 14, 1, 14, 1, 15, 1, 15, 1, 15, 1, 15, 1, 15, 1, 15, 1, 16,
    1, 16, 1, 16, 1, 16, 1, 16, 1, 16, 1, 16, 1, 16, 1, 16, 1, 17, 1, 17, 1, 17, 1, 17, 1, 17, 1,
    17, 1, 17, 5, 17, 390, 8, 17, 10, 17, 12, 17, 393, 9, 17, 1, 17, 1, 17, 1, 17, 1, 18, 1, 18, 1,
    18, 1, 18, 1, 18, 5, 18, 403, 8, 18, 10, 18, 12, 18, 406, 9, 18, 1, 18, 1, 18, 1, 18, 1, 19, 1,
    19, 1, 19, 1, 19, 1, 19, 1, 19, 1, 19, 5, 19, 418, 8, 19, 10, 19, 12, 19, 421, 9, 19, 1, 19, 1,
    19, 1, 19, 1, 20, 1, 20, 1, 20, 1, 20, 1, 21, 1, 21, 1, 21, 5, 21, 433, 8, 21, 10, 21, 12, 21,
    436, 9, 21, 1, 21, 1, 21, 5, 21, 440, 8, 21, 10, 21, 12, 21, 443, 9, 21, 1, 21, 1, 21, 1, 21, 1,
    22, 1, 22, 1, 22, 1, 22, 1, 22, 1, 22, 1, 22, 1, 23, 1, 23, 1, 23, 1, 23, 1, 23, 1, 23, 1, 23,
    1, 23, 1, 23, 1, 23, 1, 24, 1, 24, 1, 24, 1, 24, 1, 24, 1, 24, 1, 25, 1, 25, 1, 25, 1, 25, 1,
    26, 1, 26, 1, 26, 1, 26, 1, 26, 1, 26, 1, 27, 1, 27, 1, 27, 1, 27, 1, 28, 1, 28, 1, 28, 1, 28,
    1, 28, 1, 28, 1, 29, 1, 29, 1, 29, 1, 29, 3, 29, 495, 8, 29, 1, 29, 1, 29, 1, 29, 1, 29, 1, 29,
    1, 29, 5, 29, 503, 8, 29, 10, 29, 12, 29, 506, 9, 29, 1, 29, 1, 29, 1, 29, 1, 30, 1, 30, 1, 30,
    1, 30, 1, 30, 1, 30, 1, 31, 1, 31, 1, 31, 1, 31, 3, 31, 521, 8, 31, 1, 31, 1, 31, 1, 31, 1, 31,
    1, 31, 1, 31, 1, 31, 1, 31, 5, 31, 531, 8, 31, 10, 31, 12, 31, 534, 9, 31, 1, 31, 1, 31, 1, 31,
    1, 31, 1, 32, 1, 32, 1, 32, 1, 32, 3, 32, 544, 8, 32, 1, 32, 1, 32, 1, 32, 1, 32, 1, 32, 1, 32,
    1, 32, 5, 32, 553, 8, 32, 10, 32, 12, 32, 556, 9, 32, 1, 32, 1, 32, 1, 32, 1, 33, 1, 33, 1, 33,
    1, 33, 1, 33, 1, 33, 3, 33, 567, 8, 33, 1, 33, 1, 33, 1, 33, 1, 33, 1, 33, 1, 33, 1, 33, 1, 33,
    1, 33, 1, 34, 1, 34, 1, 34, 1, 34, 1, 34, 1, 34, 3, 34, 584, 8, 34, 1, 34, 1, 34, 1, 34, 1, 34,
    1, 34, 1, 34, 1, 34, 1, 34, 1, 34, 1, 35, 1, 35, 1, 36, 1, 36, 3, 36, 599, 8, 36, 1, 37, 1, 37,
    1, 38, 1, 38, 1, 39, 1, 39, 1, 40, 1, 40, 3, 40, 609, 8, 40, 1, 41, 1, 41, 1, 41, 5, 41, 614, 8,
    41, 10, 41, 12, 41, 617, 9, 41, 1, 42, 1, 42, 3, 42, 621, 8, 42, 1, 43, 1, 43, 1, 43, 5, 43,
    626, 8, 43, 10, 43, 12, 43, 629, 9, 43, 1, 44, 1, 44, 1, 44, 1, 44, 3, 44, 635, 8, 44, 1, 45, 1,
    45, 1, 45, 5, 45, 640, 8, 45, 10, 45, 12, 45, 643, 9, 45, 1, 46, 1, 46, 1, 47, 1, 47, 1, 47, 1,
    47, 1, 47, 3, 47, 652, 8, 47, 1, 48, 1, 48, 1, 49, 1, 49, 1, 50, 1, 50, 1, 51, 1, 51, 1, 51, 1,
    51, 1, 52, 3, 52, 665, 8, 52, 1, 52, 1, 52, 1, 53, 1, 53, 1, 53, 1, 53, 1, 54, 1, 54, 5, 54,
    675, 8, 54, 10, 54, 12, 54, 678, 9, 54, 1, 55, 1, 55, 1, 55, 1, 55, 1, 56, 1, 56, 1, 56, 1, 56,
    1, 56, 3, 56, 689, 8, 56, 1, 56, 1, 56, 5, 56, 693, 8, 56, 10, 56, 12, 56, 696, 9, 56, 1, 57, 1,
    57, 1, 57, 1, 57, 5, 57, 702, 8, 57, 10, 57, 12, 57, 705, 9, 57, 1, 57, 1, 57, 1, 57, 1, 58, 1,
    58, 1, 58, 5, 58, 713, 8, 58, 10, 58, 12, 58, 716, 9, 58, 1, 59, 1, 59, 1, 59, 1, 59, 1, 59, 1,
    59, 3, 59, 724, 8, 59, 1, 60, 1, 60, 1, 61, 1, 61, 3, 61, 730, 8, 61, 1, 61, 5, 61, 733, 8, 61,
    10, 61, 12, 61, 736, 9, 61, 1, 62, 1, 62, 1, 62, 1, 62, 1, 63, 1, 63, 1, 63, 1, 64, 1, 64, 1,
    64, 1, 64, 1, 65, 1, 65, 1, 65, 1, 65, 1, 65, 1, 65, 5, 65, 755, 8, 65, 10, 65, 12, 65, 758, 9,
    65, 1, 65, 1, 65, 1, 66, 1, 66, 1, 66, 1, 66, 1, 67, 1, 67, 1, 67, 5, 67, 769, 8, 67, 10, 67,
    12, 67, 772, 9, 67, 1, 68, 1, 68, 1, 68, 1, 68, 1, 69, 1, 69, 1, 69, 3, 69, 781, 8, 69, 1, 69,
    1, 69, 1, 70, 1, 70, 1, 71, 1, 71, 1, 71, 3, 71, 790, 8, 71, 1, 71, 1, 71, 1, 72, 1, 72, 1, 72,
    1, 72, 1, 73, 1, 73, 1, 73, 1, 73, 1, 73, 5, 73, 803, 8, 73, 10, 73, 12, 73, 806, 9, 73, 1, 73,
    1, 73, 1, 74, 1, 74, 1, 74, 1, 74, 1, 74, 1, 74, 5, 74, 816, 8, 74, 10, 74, 12, 74, 819, 9, 74,
    1, 74, 1, 74, 1, 74, 1, 74, 1, 74, 1, 75, 1, 75, 1, 75, 1, 75, 1, 75, 4, 75, 831, 8, 75, 11, 75,
    12, 75, 832, 1, 75, 1, 75, 1, 76, 1, 76, 1, 76, 1, 76, 1, 76, 1, 77, 1, 77, 1, 77, 1, 77, 5, 77,
    846, 8, 77, 10, 77, 12, 77, 849, 9, 77, 1, 77, 1, 77, 1, 78, 1, 78, 1, 78, 1, 79, 1, 79, 1, 79,
    1, 79, 1, 79, 0, 1, 112, 80, 0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34,
    36, 38, 40, 42, 44, 46, 48, 50, 52, 54, 56, 58, 60, 62, 64, 66, 68, 70, 72, 74, 76, 78, 80, 82,
    84, 86, 88, 90, 92, 94, 96, 98, 100, 102, 104, 106, 108, 110, 112, 114, 116, 118, 120, 122, 124,
    126, 128, 130, 132, 134, 136, 138, 140, 142, 144, 146, 148, 150, 152, 154, 156, 158, 0, 5, 2, 0,
    56, 60, 99, 99, 1, 0, 62, 63, 1, 0, 100, 102, 2, 0, 66, 66, 87, 87, 3, 0, 64, 65, 67, 69, 86,
    93, 876, 0, 161, 1, 0, 0, 0, 2, 186, 1, 0, 0, 0, 4, 188, 1, 0, 0, 0, 6, 206, 1, 0, 0, 0, 8, 229,
    1, 0, 0, 0, 10, 248, 1, 0, 0, 0, 12, 269, 1, 0, 0, 0, 14, 275, 1, 0, 0, 0, 16, 287, 1, 0, 0, 0,
    18, 311, 1, 0, 0, 0, 20, 335, 1, 0, 0, 0, 22, 338, 1, 0, 0, 0, 24, 351, 1, 0, 0, 0, 26, 353, 1,
    0, 0, 0, 28, 361, 1, 0, 0, 0, 30, 367, 1, 0, 0, 0, 32, 373, 1, 0, 0, 0, 34, 382, 1, 0, 0, 0, 36,
    397, 1, 0, 0, 0, 38, 410, 1, 0, 0, 0, 40, 425, 1, 0, 0, 0, 42, 429, 1, 0, 0, 0, 44, 447, 1, 0,
    0, 0, 46, 454, 1, 0, 0, 0, 48, 464, 1, 0, 0, 0, 50, 470, 1, 0, 0, 0, 52, 474, 1, 0, 0, 0, 54,
    480, 1, 0, 0, 0, 56, 484, 1, 0, 0, 0, 58, 490, 1, 0, 0, 0, 60, 510, 1, 0, 0, 0, 62, 516, 1, 0,
    0, 0, 64, 539, 1, 0, 0, 0, 66, 560, 1, 0, 0, 0, 68, 577, 1, 0, 0, 0, 70, 594, 1, 0, 0, 0, 72,
    598, 1, 0, 0, 0, 74, 600, 1, 0, 0, 0, 76, 602, 1, 0, 0, 0, 78, 604, 1, 0, 0, 0, 80, 608, 1, 0,
    0, 0, 82, 610, 1, 0, 0, 0, 84, 620, 1, 0, 0, 0, 86, 622, 1, 0, 0, 0, 88, 634, 1, 0, 0, 0, 90,
    636, 1, 0, 0, 0, 92, 644, 1, 0, 0, 0, 94, 651, 1, 0, 0, 0, 96, 653, 1, 0, 0, 0, 98, 655, 1, 0,
    0, 0, 100, 657, 1, 0, 0, 0, 102, 659, 1, 0, 0, 0, 104, 664, 1, 0, 0, 0, 106, 668, 1, 0, 0, 0,
    108, 672, 1, 0, 0, 0, 110, 679, 1, 0, 0, 0, 112, 688, 1, 0, 0, 0, 114, 697, 1, 0, 0, 0, 116,
    709, 1, 0, 0, 0, 118, 723, 1, 0, 0, 0, 120, 725, 1, 0, 0, 0, 122, 729, 1, 0, 0, 0, 124, 737, 1,
    0, 0, 0, 126, 741, 1, 0, 0, 0, 128, 744, 1, 0, 0, 0, 130, 748, 1, 0, 0, 0, 132, 761, 1, 0, 0, 0,
    134, 765, 1, 0, 0, 0, 136, 773, 1, 0, 0, 0, 138, 777, 1, 0, 0, 0, 140, 784, 1, 0, 0, 0, 142,
    786, 1, 0, 0, 0, 144, 793, 1, 0, 0, 0, 146, 797, 1, 0, 0, 0, 148, 809, 1, 0, 0, 0, 150, 825, 1,
    0, 0, 0, 152, 836, 1, 0, 0, 0, 154, 841, 1, 0, 0, 0, 156, 852, 1, 0, 0, 0, 158, 855, 1, 0, 0, 0,
    160, 162, 3, 20, 10, 0, 161, 160, 1, 0, 0, 0, 161, 162, 1, 0, 0, 0, 162, 166, 1, 0, 0, 0, 163,
    165, 3, 2, 1, 0, 164, 163, 1, 0, 0, 0, 165, 168, 1, 0, 0, 0, 166, 164, 1, 0, 0, 0, 166, 167, 1,
    0, 0, 0, 167, 172, 1, 0, 0, 0, 168, 166, 1, 0, 0, 0, 169, 171, 5, 96, 0, 0, 170, 169, 1, 0, 0,
    0, 171, 174, 1, 0, 0, 0, 172, 170, 1, 0, 0, 0, 172, 173, 1, 0, 0, 0, 173, 175, 1, 0, 0, 0, 174,
    172, 1, 0, 0, 0, 175, 176, 5, 0, 0, 1, 176, 1, 1, 0, 0, 0, 177, 187, 3, 4, 2, 0, 178, 187, 3, 6,
    3, 0, 179, 187, 3, 8, 4, 0, 180, 187, 3, 10, 5, 0, 181, 187, 3, 12, 6, 0, 182, 187, 3, 14, 7, 0,
    183, 187, 3, 16, 8, 0, 184, 187, 3, 18, 9, 0, 185, 187, 3, 20, 10, 0, 186, 177, 1, 0, 0, 0, 186,
    178, 1, 0, 0, 0, 186, 179, 1, 0, 0, 0, 186, 180, 1, 0, 0, 0, 186, 181, 1, 0, 0, 0, 186, 182, 1,
    0, 0, 0, 186, 183, 1, 0, 0, 0, 186, 184, 1, 0, 0, 0, 186, 185, 1, 0, 0, 0, 187, 3, 1, 0, 0, 0,
    188, 189, 5, 47, 0, 0, 189, 190, 5, 10, 0, 0, 190, 191, 5, 81, 0, 0, 191, 192, 5, 82, 0, 0, 192,
    193, 5, 82, 0, 0, 193, 194, 5, 70, 0, 0, 194, 195, 5, 50, 0, 0, 195, 196, 5, 85, 0, 0, 196, 200,
    5, 96, 0, 0, 197, 199, 3, 24, 12, 0, 198, 197, 1, 0, 0, 0, 199, 202, 1, 0, 0, 0, 200, 198, 1, 0,
    0, 0, 200, 201, 1, 0, 0, 0, 201, 203, 1, 0, 0, 0, 202, 200, 1, 0, 0, 0, 203, 204, 5, 123, 0, 0,
    204, 205, 5, 96, 0, 0, 205, 5, 1, 0, 0, 0, 206, 207, 5, 47, 0, 0, 207, 208, 3, 74, 37, 0, 208,
    210, 5, 81, 0, 0, 209, 211, 3, 86, 43, 0, 210, 209, 1, 0, 0, 0, 210, 211, 1, 0, 0, 0, 211, 212,
    1, 0, 0, 0, 212, 213, 5, 82, 0, 0, 213, 214, 5, 70, 0, 0, 214, 215, 3, 88, 44, 0, 215, 216, 5,
    85, 0, 0, 216, 217, 5, 108, 0, 0, 217, 222, 5, 96, 0, 0, 218, 221, 3, 48, 24, 0, 219, 221, 3,
    24, 12, 0, 220, 218, 1, 0, 0, 0, 220, 219, 1, 0, 0, 0, 221, 224, 1, 0, 0, 0, 222, 220, 1, 0, 0,
    0, 222, 223, 1, 0, 0, 0, 223, 225, 1, 0, 0, 0, 224, 222, 1, 0, 0, 0, 225, 226, 3, 50, 25, 0,
    226, 227, 5, 123, 0, 0, 227, 228, 5, 96, 0, 0, 228, 7, 1, 0, 0, 0, 229, 230, 5, 1, 0, 0, 230,
    231, 3, 76, 38, 0, 231, 232, 5, 81, 0, 0, 232, 233, 5, 54, 0, 0, 233, 234, 5, 82, 0, 0, 234,
    235, 5, 123, 0, 0, 235, 242, 5, 96, 0, 0, 236, 241, 3, 46, 23, 0, 237, 241, 3, 48, 24, 0, 238,
    241, 3, 28, 14, 0, 239, 241, 3, 20, 10, 0, 240, 236, 1, 0, 0, 0, 240, 237, 1, 0, 0, 0, 240, 238,
    1, 0, 0, 0, 240, 239, 1, 0, 0, 0, 241, 244, 1, 0, 0, 0, 242, 240, 1, 0, 0, 0, 242, 243, 1, 0, 0,
    0, 243, 245, 1, 0, 0, 0, 244, 242, 1, 0, 0, 0, 245, 246, 5, 123, 0, 0, 246, 247, 5, 96, 0, 0,
    247, 9, 1, 0, 0, 0, 248, 249, 5, 47, 0, 0, 249, 250, 3, 74, 37, 0, 250, 252, 5, 81, 0, 0, 251,
    253, 3, 86, 43, 0, 252, 251, 1, 0, 0, 0, 252, 253, 1, 0, 0, 0, 253, 254, 1, 0, 0, 0, 254, 255,
    5, 82, 0, 0, 255, 256, 5, 70, 0, 0, 256, 257, 5, 50, 0, 0, 257, 258, 5, 85, 0, 0, 258, 259, 5,
    109, 0, 0, 259, 263, 5, 96, 0, 0, 260, 262, 3, 24, 12, 0, 261, 260, 1, 0, 0, 0, 262, 265, 1, 0,
    0, 0, 263, 261, 1, 0, 0, 0, 263, 264, 1, 0, 0, 0, 264, 266, 1, 0, 0, 0, 265, 263, 1, 0, 0, 0,
    266, 267, 5, 123, 0, 0, 267, 268, 5, 96, 0, 0, 268, 11, 1, 0, 0, 0, 269, 270, 3, 70, 35, 0, 270,
    271, 5, 67, 0, 0, 271, 272, 3, 80, 40, 0, 272, 273, 5, 110, 0, 0, 273, 274, 5, 96, 0, 0, 274,
    13, 1, 0, 0, 0, 275, 276, 5, 1, 0, 0, 276, 277, 3, 78, 39, 0, 277, 278, 5, 81, 0, 0, 278, 279,
    5, 4, 0, 0, 279, 280, 5, 82, 0, 0, 280, 281, 5, 85, 0, 0, 281, 282, 5, 111, 0, 0, 282, 283, 5,
    96, 0, 0, 283, 284, 3, 90, 45, 0, 284, 285, 5, 96, 0, 0, 285, 286, 5, 123, 0, 0, 286, 15, 1, 0,
    0, 0, 287, 288, 5, 1, 0, 0, 288, 293, 3, 78, 39, 0, 289, 290, 5, 81, 0, 0, 290, 291, 3, 78, 39,
    0, 291, 292, 5, 82, 0, 0, 292, 294, 1, 0, 0, 0, 293, 289, 1, 0, 0, 0, 293, 294, 1, 0, 0, 0, 294,
    295, 1, 0, 0, 0, 295, 296, 5, 85, 0, 0, 296, 297, 5, 112, 0, 0, 297, 305, 5, 96, 0, 0, 298, 304,
    3, 58, 29, 0, 299, 304, 3, 60, 30, 0, 300, 304, 3, 62, 31, 0, 301, 304, 3, 64, 32, 0, 302, 304,
    3, 20, 10, 0, 303, 298, 1, 0, 0, 0, 303, 299, 1, 0, 0, 0, 303, 300, 1, 0, 0, 0, 303, 301, 1, 0,
    0, 0, 303, 302, 1, 0, 0, 0, 304, 307, 1, 0, 0, 0, 305, 303, 1, 0, 0, 0, 305, 306, 1, 0, 0, 0,
    306, 308, 1, 0, 0, 0, 307, 305, 1, 0, 0, 0, 308, 309, 5, 123, 0, 0, 309, 310, 5, 96, 0, 0, 310,
    17, 1, 0, 0, 0, 311, 312, 5, 1, 0, 0, 312, 317, 3, 78, 39, 0, 313, 314, 5, 81, 0, 0, 314, 318,
    3, 78, 39, 0, 315, 316, 5, 53, 0, 0, 316, 318, 5, 82, 0, 0, 317, 313, 1, 0, 0, 0, 317, 315, 1,
    0, 0, 0, 318, 319, 1, 0, 0, 0, 319, 320, 5, 113, 0, 0, 320, 329, 5, 96, 0, 0, 321, 328, 3, 60,
    30, 0, 322, 328, 3, 62, 31, 0, 323, 328, 3, 64, 32, 0, 324, 328, 3, 66, 33, 0, 325, 328, 3, 68,
    34, 0, 326, 328, 3, 20, 10, 0, 327, 321, 1, 0, 0, 0, 327, 322, 1, 0, 0, 0, 327, 323, 1, 0, 0, 0,
    327, 324, 1, 0, 0, 0, 327, 325, 1, 0, 0, 0, 327, 326, 1, 0, 0, 0, 328, 331, 1, 0, 0, 0, 329,
    327, 1, 0, 0, 0, 329, 330, 1, 0, 0, 0, 330, 332, 1, 0, 0, 0, 331, 329, 1, 0, 0, 0, 332, 333, 5,
    123, 0, 0, 333, 334, 5, 96, 0, 0, 334, 19, 1, 0, 0, 0, 335, 336, 3, 22, 11, 0, 336, 337, 5, 96,
    0, 0, 337, 21, 1, 0, 0, 0, 338, 339, 5, 123, 0, 0, 339, 23, 1, 0, 0, 0, 340, 352, 3, 26, 13, 0,
    341, 352, 3, 28, 14, 0, 342, 352, 3, 30, 15, 0, 343, 352, 3, 32, 16, 0, 344, 352, 3, 34, 17, 0,
    345, 352, 3, 36, 18, 0, 346, 352, 3, 38, 19, 0, 347, 352, 3, 40, 20, 0, 348, 352, 3, 42, 21, 0,
    349, 352, 3, 44, 22, 0, 350, 352, 3, 20, 10, 0, 351, 340, 1, 0, 0, 0, 351, 341, 1, 0, 0, 0, 351,
    342, 1, 0, 0, 0, 351, 343, 1, 0, 0, 0, 351, 344, 1, 0, 0, 0, 351, 345, 1, 0, 0, 0, 351, 346, 1,
    0, 0, 0, 351, 347, 1, 0, 0, 0, 351, 348, 1, 0, 0, 0, 351, 349, 1, 0, 0, 0, 351, 350, 1, 0, 0, 0,
    352, 25, 1, 0, 0, 0, 353, 354, 5, 11, 0, 0, 354, 356, 5, 81, 0, 0, 355, 357, 3, 112, 56, 0, 356,
    355, 1, 0, 0, 0, 356, 357, 1, 0, 0, 0, 357, 358, 1, 0, 0, 0, 358, 359, 5, 82, 0, 0, 359, 360, 5,
    96, 0, 0, 360, 27, 1, 0, 0, 0, 361, 362, 3, 70, 35, 0, 362, 363, 5, 67, 0, 0, 363, 364, 3, 112,
    56, 0, 364, 365, 5, 114, 0, 0, 365, 366, 5, 96, 0, 0, 366, 29, 1, 0, 0, 0, 367, 368, 3, 72, 36,
    0, 368, 369, 5, 67, 0, 0, 369, 370, 3, 112, 56, 0, 370, 371, 5, 115, 0, 0, 371, 372, 5, 96, 0,
    0, 372, 31, 1, 0, 0, 0, 373, 374, 3, 70, 35, 0, 374, 375, 5, 67, 0, 0, 375, 376, 5, 8, 0, 0,
    376, 377, 5, 81, 0, 0, 377, 378, 3, 112, 56, 0, 378, 379, 5, 82, 0, 0, 379, 380, 5, 116, 0, 0,
    380, 381, 5, 96, 0, 0, 381, 33, 1, 0, 0, 0, 382, 383, 5, 6, 0, 0, 383, 384, 3, 112, 56, 0, 384,
    385, 5, 85, 0, 0, 385, 391, 5, 96, 0, 0, 386, 390, 3, 52, 26, 0, 387, 390, 3, 54, 27, 0, 388,
    390, 3, 24, 12, 0, 389, 386, 1, 0, 0, 0, 389, 387, 1, 0, 0, 0, 389, 388, 1, 0, 0, 0, 390, 393,
    1, 0, 0, 0, 391, 389, 1, 0, 0, 0, 391, 392, 1, 0, 0, 0, 392, 394, 1, 0, 0, 0, 393, 391, 1, 0, 0,
    0, 394, 395, 5, 123, 0, 0, 395, 396, 5, 96, 0, 0, 396, 35, 1, 0, 0, 0, 397, 398, 5, 14, 0, 0,
    398, 399, 3, 112, 56, 0, 399, 400, 5, 85, 0, 0, 400, 404, 5, 96, 0, 0, 401, 403, 3, 24, 12, 0,
    402, 401, 1, 0, 0, 0, 403, 406, 1, 0, 0, 0, 404, 402, 1, 0, 0, 0, 404, 405, 1, 0, 0, 0, 405,
    407, 1, 0, 0, 0, 406, 404, 1, 0, 0, 0, 407, 408, 5, 123, 0, 0, 408, 409, 5, 96, 0, 0, 409, 37,
    1, 0, 0, 0, 410, 411, 5, 5, 0, 0, 411, 412, 3, 70, 35, 0, 412, 413, 5, 7, 0, 0, 413, 414, 3,
    112, 56, 0, 414, 415, 5, 85, 0, 0, 415, 419, 5, 96, 0, 0, 416, 418, 3, 24, 12, 0, 417, 416, 1,
    0, 0, 0, 418, 421, 1, 0, 0, 0, 419, 417, 1, 0, 0, 0, 419, 420, 1, 0, 0, 0, 420, 422, 1, 0, 0, 0,
    421, 419, 1, 0, 0, 0, 422, 423, 5, 123, 0, 0, 423, 424, 5, 96, 0, 0, 424, 39, 1, 0, 0, 0, 425,
    426, 3, 116, 58, 0, 426, 427, 5, 117, 0, 0, 427, 428, 5, 96, 0, 0, 428, 41, 1, 0, 0, 0, 429,
    430, 5, 13, 0, 0, 430, 434, 5, 96, 0, 0, 431, 433, 3, 24, 12, 0, 432, 431, 1, 0, 0, 0, 433, 436,
    1, 0, 0, 0, 434, 432, 1, 0, 0, 0, 434, 435, 1, 0, 0, 0, 435, 437, 1, 0, 0, 0, 436, 434, 1, 0, 0,
    0, 437, 441, 3, 56, 28, 0, 438, 440, 3, 24, 12, 0, 439, 438, 1, 0, 0, 0, 440, 443, 1, 0, 0, 0,
    441, 439, 1, 0, 0, 0, 441, 442, 1, 0, 0, 0, 442, 444, 1, 0, 0, 0, 443, 441, 1, 0, 0, 0, 444,
    445, 5, 123, 0, 0, 445, 446, 5, 96, 0, 0, 446, 43, 1, 0, 0, 0, 447, 448, 5, 52, 0, 0, 448, 449,
    3, 78, 39, 0, 449, 450, 5, 81, 0, 0, 450, 451, 3, 104, 52, 0, 451, 452, 5, 82, 0, 0, 452, 453,
    5, 96, 0, 0, 453, 45, 1, 0, 0, 0, 454, 455, 5, 75, 0, 0, 455, 456, 5, 83, 0, 0, 456, 457, 5, 45,
    0, 0, 457, 458, 5, 81, 0, 0, 458, 459, 3, 92, 46, 0, 459, 460, 5, 84, 0, 0, 460, 461, 3, 112,
    56, 0, 461, 462, 5, 82, 0, 0, 462, 463, 5, 96, 0, 0, 463, 47, 1, 0, 0, 0, 464, 465, 3, 70, 35,
    0, 465, 466, 5, 67, 0, 0, 466, 467, 3, 112, 56, 0, 467, 468, 5, 118, 0, 0, 468, 469, 5, 96, 0,
    0, 469, 49, 1, 0, 0, 0, 470, 471, 5, 12, 0, 0, 471, 472, 3, 112, 56, 0, 472, 473, 5, 96, 0, 0,
    473, 51, 1, 0, 0, 0, 474, 475, 5, 2, 0, 0, 475, 476, 3, 112, 56, 0, 476, 477, 5, 85, 0, 0, 477,
    478, 5, 119, 0, 0, 478, 479, 5, 96, 0, 0, 479, 53, 1, 0, 0, 0, 480, 481, 5, 3, 0, 0, 481, 482,
    5, 85, 0, 0, 482, 483, 5, 96, 0, 0, 483, 55, 1, 0, 0, 0, 484, 485, 5, 48, 0, 0, 485, 486, 3, 78,
    39, 0, 486, 487, 5, 46, 0, 0, 487, 488, 3, 70, 35, 0, 488, 489, 5, 96, 0, 0, 489, 57, 1, 0, 0,
    0, 490, 491, 5, 47, 0, 0, 491, 492, 5, 49, 0, 0, 492, 494, 5, 81, 0, 0, 493, 495, 3, 86, 43, 0,
    494, 493, 1, 0, 0, 0, 494, 495, 1, 0, 0, 0, 495, 496, 1, 0, 0, 0, 496, 497, 5, 82, 0, 0, 497,
    498, 5, 70, 0, 0, 498, 499, 5, 50, 0, 0, 499, 500, 5, 85, 0, 0, 500, 504, 5, 96, 0, 0, 501, 503,
    3, 24, 12, 0, 502, 501, 1, 0, 0, 0, 503, 506, 1, 0, 0, 0, 504, 502, 1, 0, 0, 0, 504, 505, 1, 0,
    0, 0, 505, 507, 1, 0, 0, 0, 506, 504, 1, 0, 0, 0, 507, 508, 5, 123, 0, 0, 508, 509, 5, 96, 0, 0,
    509, 59, 1, 0, 0, 0, 510, 511, 3, 70, 35, 0, 511, 512, 5, 85, 0, 0, 512, 513, 3, 88, 44, 0, 513,
    514, 5, 120, 0, 0, 514, 515, 5, 96, 0, 0, 515, 61, 1, 0, 0, 0, 516, 517, 5, 47, 0, 0, 517, 518,
    3, 74, 37, 0, 518, 520, 5, 81, 0, 0, 519, 521, 3, 86, 43, 0, 520, 519, 1, 0, 0, 0, 520, 521, 1,
    0, 0, 0, 521, 522, 1, 0, 0, 0, 522, 523, 5, 82, 0, 0, 523, 524, 5, 70, 0, 0, 524, 525, 3, 88,
    44, 0, 525, 526, 5, 85, 0, 0, 526, 527, 5, 121, 0, 0, 527, 532, 5, 96, 0, 0, 528, 531, 3, 48,
    24, 0, 529, 531, 3, 24, 12, 0, 530, 528, 1, 0, 0, 0, 530, 529, 1, 0, 0, 0, 531, 534, 1, 0, 0, 0,
    532, 530, 1, 0, 0, 0, 532, 533, 1, 0, 0, 0, 533, 535, 1, 0, 0, 0, 534, 532, 1, 0, 0, 0, 535,
    536, 3, 50, 25, 0, 536, 537, 5, 123, 0, 0, 537, 538, 5, 96, 0, 0, 538, 63, 1, 0, 0, 0, 539, 540,
    5, 47, 0, 0, 540, 541, 3, 74, 37, 0, 541, 543, 5, 81, 0, 0, 542, 544, 3, 86, 43, 0, 543, 542, 1,
    0, 0, 0, 543, 544, 1, 0, 0, 0, 544, 545, 1, 0, 0, 0, 545, 546, 5, 82, 0, 0, 546, 547, 5, 70, 0,
    0, 547, 548, 5, 50, 0, 0, 548, 549, 5, 85, 0, 0, 549, 550, 5, 122, 0, 0, 550, 554, 5, 96, 0, 0,
    551, 553, 3, 24, 12, 0, 552, 551, 1, 0, 0, 0, 553, 556, 1, 0, 0, 0, 554, 552, 1, 0, 0, 0, 554,
    555, 1, 0, 0, 0, 555, 557, 1, 0, 0, 0, 556, 554, 1, 0, 0, 0, 557, 558, 5, 123, 0, 0, 558, 559,
    5, 96, 0, 0, 559, 65, 1, 0, 0, 0, 560, 561, 5, 44, 0, 0, 561, 562, 5, 96, 0, 0, 562, 563, 5, 47,
    0, 0, 563, 564, 3, 74, 37, 0, 564, 566, 5, 81, 0, 0, 565, 567, 3, 86, 43, 0, 566, 565, 1, 0, 0,
    0, 566, 567, 1, 0, 0, 0, 567, 568, 1, 0, 0, 0, 568, 569, 5, 82, 0, 0, 569, 570, 5, 70, 0, 0,
    570, 571, 3, 88, 44, 0, 571, 572, 5, 85, 0, 0, 572, 573, 5, 96, 0, 0, 573, 574, 5, 51, 0, 0,
    574, 575, 5, 123, 0, 0, 575, 576, 5, 96, 0, 0, 576, 67, 1, 0, 0, 0, 577, 578, 5, 44, 0, 0, 578,
    579, 5, 96, 0, 0, 579, 580, 5, 47, 0, 0, 580, 581, 3, 74, 37, 0, 581, 583, 5, 81, 0, 0, 582,
    584, 3, 86, 43, 0, 583, 582, 1, 0, 0, 0, 583, 584, 1, 0, 0, 0, 584, 585, 1, 0, 0, 0, 585, 586,
    5, 82, 0, 0, 586, 587, 5, 70, 0, 0, 587, 588, 5, 50, 0, 0, 588, 589, 5, 85, 0, 0, 589, 590, 5,
    96, 0, 0, 590, 591, 5, 51, 0, 0, 591, 592, 5, 123, 0, 0, 592, 593, 5, 96, 0, 0, 593, 69, 1, 0,
    0, 0, 594, 595, 5, 98, 0, 0, 595, 71, 1, 0, 0, 0, 596, 599, 3, 108, 54, 0, 597, 599, 3, 110, 55,
    0, 598, 596, 1, 0, 0, 0, 598, 597, 1, 0, 0, 0, 599, 73, 1, 0, 0, 0, 600, 601, 5, 98, 0, 0, 601,
    75, 1, 0, 0, 0, 602, 603, 5, 97, 0, 0, 603, 77, 1, 0, 0, 0, 604, 605, 7, 0, 0, 0, 605, 79, 1, 0,
    0, 0, 606, 609, 3, 94, 47, 0, 607, 609, 3, 70, 35, 0, 608, 606, 1, 0, 0, 0, 608, 607, 1, 0, 0,
    0, 609, 81, 1, 0, 0, 0, 610, 615, 3, 84, 42, 0, 611, 612, 5, 84, 0, 0, 612, 614, 3, 84, 42, 0,
    613, 611, 1, 0, 0, 0, 614, 617, 1, 0, 0, 0, 615, 613, 1, 0, 0, 0, 615, 616, 1, 0, 0, 0, 616, 83,
    1, 0, 0, 0, 617, 615, 1, 0, 0, 0, 618, 621, 3, 152, 76, 0, 619, 621, 3, 112, 56, 0, 620, 618, 1,
    0, 0, 0, 620, 619, 1, 0, 0, 0, 621, 85, 1, 0, 0, 0, 622, 627, 3, 144, 72, 0, 623, 624, 5, 84, 0,
    0, 624, 626, 3, 144, 72, 0, 625, 623, 1, 0, 0, 0, 626, 629, 1, 0, 0, 0, 627, 625, 1, 0, 0, 0,
    627, 628, 1, 0, 0, 0, 628, 87, 1, 0, 0, 0, 629, 627, 1, 0, 0, 0, 630, 635, 3, 150, 75, 0, 631,
    635, 3, 78, 39, 0, 632, 635, 3, 146, 73, 0, 633, 635, 3, 148, 74, 0, 634, 630, 1, 0, 0, 0, 634,
    631, 1, 0, 0, 0, 634, 632, 1, 0, 0, 0, 634, 633, 1, 0, 0, 0, 635, 89, 1, 0, 0, 0, 636, 641, 3,
    70, 35, 0, 637, 638, 5, 84, 0, 0, 638, 640, 3, 70, 35, 0, 639, 637, 1, 0, 0, 0, 640, 643, 1, 0,
    0, 0, 641, 639, 1, 0, 0, 0, 641, 642, 1, 0, 0, 0, 642, 91, 1, 0, 0, 0, 643, 641, 1, 0, 0, 0,
    644, 645, 3, 112, 56, 0, 645, 93, 1, 0, 0, 0, 646, 652, 3, 96, 48, 0, 647, 652, 3, 98, 49, 0,
    648, 652, 3, 100, 50, 0, 649, 652, 3, 104, 52, 0, 650, 652, 3, 102, 51, 0, 651, 646, 1, 0, 0, 0,
    651, 647, 1, 0, 0, 0, 651, 648, 1, 0, 0, 0, 651, 649, 1, 0, 0, 0, 651, 650, 1, 0, 0, 0, 652, 95,
    1, 0, 0, 0, 653, 654, 7, 1, 0, 0, 654, 97, 1, 0, 0, 0, 655, 656, 7, 2, 0, 0, 656, 99, 1, 0, 0,
    0, 657, 658, 5, 103, 0, 0, 658, 101, 1, 0, 0, 0, 659, 660, 3, 78, 39, 0, 660, 661, 5, 83, 0, 0,
    661, 662, 3, 70, 35, 0, 662, 103, 1, 0, 0, 0, 663, 665, 5, 74, 0, 0, 664, 663, 1, 0, 0, 0, 664,
    665, 1, 0, 0, 0, 665, 666, 1, 0, 0, 0, 666, 667, 5, 104, 0, 0, 667, 105, 1, 0, 0, 0, 668, 669,
    5, 79, 0, 0, 669, 670, 3, 112, 56, 0, 670, 671, 5, 80, 0, 0, 671, 107, 1, 0, 0, 0, 672, 676, 3,
    70, 35, 0, 673, 675, 3, 106, 53, 0, 674, 673, 1, 0, 0, 0, 675, 678, 1, 0, 0, 0, 676, 674, 1, 0,
    0, 0, 676, 677, 1, 0, 0, 0, 677, 109, 1, 0, 0, 0, 678, 676, 1, 0, 0, 0, 679, 680, 5, 75, 0, 0,
    680, 681, 5, 83, 0, 0, 681, 682, 3, 108, 54, 0, 682, 111, 1, 0, 0, 0, 683, 684, 6, 56, -1, 0,
    684, 689, 3, 142, 71, 0, 685, 689, 3, 126, 63, 0, 686, 689, 3, 116, 58, 0, 687, 689, 3, 128, 64,
    0, 688, 683, 1, 0, 0, 0, 688, 685, 1, 0, 0, 0, 688, 686, 1, 0, 0, 0, 688, 687, 1, 0, 0, 0, 689,
    694, 1, 0, 0, 0, 690, 691, 10, 1, 0, 0, 691, 693, 3, 114, 57, 0, 692, 690, 1, 0, 0, 0, 693, 696,
    1, 0, 0, 0, 694, 692, 1, 0, 0, 0, 694, 695, 1, 0, 0, 0, 695, 113, 1, 0, 0, 0, 696, 694, 1, 0, 0,
    0, 697, 698, 5, 6, 0, 0, 698, 703, 3, 112, 56, 0, 699, 700, 5, 2, 0, 0, 700, 702, 3, 112, 56, 0,
    701, 699, 1, 0, 0, 0, 702, 705, 1, 0, 0, 0, 703, 701, 1, 0, 0, 0, 703, 704, 1, 0, 0, 0, 704,
    706, 1, 0, 0, 0, 705, 703, 1, 0, 0, 0, 706, 707, 5, 3, 0, 0, 707, 708, 3, 112, 56, 0, 708, 115,
    1, 0, 0, 0, 709, 714, 3, 118, 59, 0, 710, 711, 5, 83, 0, 0, 711, 713, 3, 122, 61, 0, 712, 710,
    1, 0, 0, 0, 713, 716, 1, 0, 0, 0, 714, 712, 1, 0, 0, 0, 714, 715, 1, 0, 0, 0, 715, 117, 1, 0, 0,
    0, 716, 714, 1, 0, 0, 0, 717, 724, 3, 120, 60, 0, 718, 724, 3, 124, 62, 0, 719, 724, 3, 130, 65,
    0, 720, 724, 3, 94, 47, 0, 721, 724, 3, 154, 77, 0, 722, 724, 3, 122, 61, 0, 723, 717, 1, 0, 0,
    0, 723, 718, 1, 0, 0, 0, 723, 719, 1, 0, 0, 0, 723, 720, 1, 0, 0, 0, 723, 721, 1, 0, 0, 0, 723,
    722, 1, 0, 0, 0, 724, 119, 1, 0, 0, 0, 725, 726, 5, 75, 0, 0, 726, 121, 1, 0, 0, 0, 727, 730, 3,
    70, 35, 0, 728, 730, 3, 138, 69, 0, 729, 727, 1, 0, 0, 0, 729, 728, 1, 0, 0, 0, 730, 734, 1, 0,
    0, 0, 731, 733, 3, 106, 53, 0, 732, 731, 1, 0, 0, 0, 733, 736, 1, 0, 0, 0, 734, 732, 1, 0, 0, 0,
    734, 735, 1, 0, 0, 0, 735, 123, 1, 0, 0, 0, 736, 734, 1, 0, 0, 0, 737, 738, 5, 81, 0, 0, 738,
    739, 3, 112, 56, 0, 739, 740, 5, 82, 0, 0, 740, 125, 1, 0, 0, 0, 741, 742, 7, 3, 0, 0, 742, 743,
    3, 116, 58, 0, 743, 127, 1, 0, 0, 0, 744, 745, 3, 116, 58, 0, 745, 746, 3, 140, 70, 0, 746, 747,
    3, 112, 56, 0, 747, 129, 1, 0, 0, 0, 748, 749, 5, 81, 0, 0, 749, 750, 3, 112, 56, 0, 750, 751,
    5, 84, 0, 0, 751, 756, 3, 112, 56, 0, 752, 753, 5, 84, 0, 0, 753, 755, 3, 112, 56, 0, 754, 752,
    1, 0, 0, 0, 755, 758, 1, 0, 0, 0, 756, 754, 1, 0, 0, 0, 756, 757, 1, 0, 0, 0, 757, 759, 1, 0, 0,
    0, 758, 756, 1, 0, 0, 0, 759, 760, 5, 82, 0, 0, 760, 131, 1, 0, 0, 0, 761, 762, 5, 79, 0, 0,
    762, 763, 3, 134, 67, 0, 763, 764, 5, 80, 0, 0, 764, 133, 1, 0, 0, 0, 765, 770, 3, 136, 68, 0,
    766, 767, 5, 84, 0, 0, 767, 769, 3, 136, 68, 0, 768, 766, 1, 0, 0, 0, 769, 772, 1, 0, 0, 0, 770,
    768, 1, 0, 0, 0, 770, 771, 1, 0, 0, 0, 771, 135, 1, 0, 0, 0, 772, 770, 1, 0, 0, 0, 773, 774, 3,
    112, 56, 0, 774, 775, 5, 85, 0, 0, 775, 776, 3, 112, 56, 0, 776, 137, 1, 0, 0, 0, 777, 778, 3,
    74, 37, 0, 778, 780, 5, 81, 0, 0, 779, 781, 3, 82, 41, 0, 780, 779, 1, 0, 0, 0, 780, 781, 1, 0,
    0, 0, 781, 782, 1, 0, 0, 0, 782, 783, 5, 82, 0, 0, 783, 139, 1, 0, 0, 0, 784, 785, 7, 4, 0, 0,
    785, 141, 1, 0, 0, 0, 786, 787, 3, 88, 44, 0, 787, 789, 5, 81, 0, 0, 788, 790, 3, 82, 41, 0,
    789, 788, 1, 0, 0, 0, 789, 790, 1, 0, 0, 0, 790, 791, 1, 0, 0, 0, 791, 792, 5, 82, 0, 0, 792,
    143, 1, 0, 0, 0, 793, 794, 3, 70, 35, 0, 794, 795, 5, 85, 0, 0, 795, 796, 3, 88, 44, 0, 796,
    145, 1, 0, 0, 0, 797, 798, 3, 78, 39, 0, 798, 799, 5, 79, 0, 0, 799, 804, 3, 88, 44, 0, 800,
    801, 5, 84, 0, 0, 801, 803, 3, 88, 44, 0, 802, 800, 1, 0, 0, 0, 803, 806, 1, 0, 0, 0, 804, 802,
    1, 0, 0, 0, 804, 805, 1, 0, 0, 0, 805, 807, 1, 0, 0, 0, 806, 804, 1, 0, 0, 0, 807, 808, 5, 80,
    0, 0, 808, 147, 1, 0, 0, 0, 809, 810, 5, 61, 0, 0, 810, 811, 5, 79, 0, 0, 811, 812, 5, 79, 0, 0,
    812, 817, 3, 88, 44, 0, 813, 814, 5, 84, 0, 0, 814, 816, 3, 88, 44, 0, 815, 813, 1, 0, 0, 0,
    816, 819, 1, 0, 0, 0, 817, 815, 1, 0, 0, 0, 817, 818, 1, 0, 0, 0, 818, 820, 1, 0, 0, 0, 819,
    817, 1, 0, 0, 0, 820, 821, 5, 80, 0, 0, 821, 822, 5, 84, 0, 0, 822, 823, 3, 88, 44, 0, 823, 824,
    5, 80, 0, 0, 824, 149, 1, 0, 0, 0, 825, 826, 5, 55, 0, 0, 826, 827, 5, 79, 0, 0, 827, 830, 3,
    88, 44, 0, 828, 829, 5, 84, 0, 0, 829, 831, 3, 88, 44, 0, 830, 828, 1, 0, 0, 0, 831, 832, 1, 0,
    0, 0, 832, 830, 1, 0, 0, 0, 832, 833, 1, 0, 0, 0, 833, 834, 1, 0, 0, 0, 834, 835, 5, 80, 0, 0,
    835, 151, 1, 0, 0, 0, 836, 837, 5, 9, 0, 0, 837, 838, 3, 82, 41, 0, 838, 839, 5, 85, 0, 0, 839,
    840, 3, 112, 56, 0, 840, 153, 1, 0, 0, 0, 841, 842, 5, 79, 0, 0, 842, 847, 3, 112, 56, 0, 843,
    844, 5, 84, 0, 0, 844, 846, 3, 112, 56, 0, 845, 843, 1, 0, 0, 0, 846, 849, 1, 0, 0, 0, 847, 845,
    1, 0, 0, 0, 847, 848, 1, 0, 0, 0, 848, 850, 1, 0, 0, 0, 849, 847, 1, 0, 0, 0, 850, 851, 5, 80,
    0, 0, 851, 155, 1, 0, 0, 0, 852, 853, 5, 74, 0, 0, 853, 854, 5, 104, 0, 0, 854, 157, 1, 0, 0, 0,
    855, 856, 3, 116, 58, 0, 856, 857, 5, 71, 0, 0, 857, 858, 3, 116, 58, 0, 858, 159, 1, 0, 0, 0,
    60, 161, 166, 172, 186, 200, 210, 220, 222, 240, 242, 252, 263, 293, 303, 305, 317, 327, 329,
    351, 356, 389, 391, 404, 419, 434, 441, 494, 504, 520, 530, 532, 543, 554, 566, 583, 598, 608,
    615, 620, 627, 634, 641, 651, 664, 676, 688, 694, 703, 714, 723, 729, 734, 756, 770, 780, 789,
    804, 817, 832, 847,
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
  public letStatement(): LetStatementContext[];
  public letStatement(i: number): LetStatementContext | null;
  public letStatement(i?: number): LetStatementContext[] | LetStatementContext | null {
    if (i === undefined) {
      return this.getRuleContexts(LetStatementContext);
    }

    return this.getRuleContext(i, LetStatementContext);
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
  public letStatement(): LetStatementContext[];
  public letStatement(i: number): LetStatementContext | null;
  public letStatement(i?: number): LetStatementContext[] | LetStatementContext | null {
    if (i === undefined) {
      return this.getRuleContexts(LetStatementContext);
    }

    return this.getRuleContext(i, LetStatementContext);
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
  public identifier(): IdentifierContext {
    return this.getRuleContext(0, IdentifierContext)!;
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
  public identifier(): IdentifierContext {
    return this.getRuleContext(0, IdentifierContext)!;
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
  public identifier(): IdentifierContext {
    return this.getRuleContext(0, IdentifierContext)!;
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
  public identifier(): IdentifierContext {
    return this.getRuleContext(0, IdentifierContext)!;
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
  public term(): TermContext {
    return this.getRuleContext(0, TermContext)!;
  }
  public CALL_ANNOTATION(): antlr.TerminalNode {
    return this.getToken(PythonParser.CALL_ANNOTATION, 0)!;
  }
  public NL(): antlr.TerminalNode {
    return this.getToken(PythonParser.NL, 0)!;
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

export class LetStatementContext extends antlr.ParserRuleContext {
  public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
    super(parent, invokingState);
  }
  public identifier(): IdentifierContext {
    return this.getRuleContext(0, IdentifierContext)!;
  }
  public EQUAL(): antlr.TerminalNode {
    return this.getToken(PythonParser.EQUAL, 0)!;
  }
  public expression(): ExpressionContext {
    return this.getRuleContext(0, ExpressionContext)!;
  }
  public LET_ANNOTATION(): antlr.TerminalNode {
    return this.getToken(PythonParser.LET_ANNOTATION, 0)!;
  }
  public NL(): antlr.TerminalNode {
    return this.getToken(PythonParser.NL, 0)!;
  }
  public override get ruleIndex(): number {
    return PythonParser.RULE_letStatement;
  }
  public override enterRule(listener: PythonListener): void {
    if (listener.enterLetStatement) {
      listener.enterLetStatement(this);
    }
  }
  public override exitRule(listener: PythonListener): void {
    if (listener.exitLetStatement) {
      listener.exitLetStatement(this);
    }
  }
  public override accept<Result>(visitor: PythonVisitor<Result>): Result | null {
    if (visitor.visitLetStatement) {
      return visitor.visitLetStatement(this);
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
  public identifier(): IdentifierContext {
    return this.getRuleContext(0, IdentifierContext)!;
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
  public identifier(): IdentifierContext {
    return this.getRuleContext(0, IdentifierContext)!;
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
  public letStatement(): LetStatementContext[];
  public letStatement(i: number): LetStatementContext | null;
  public letStatement(i?: number): LetStatementContext[] | LetStatementContext | null {
    if (i === undefined) {
      return this.getRuleContexts(LetStatementContext);
    }

    return this.getRuleContext(i, LetStatementContext);
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

export class IdentifierContext extends antlr.ParserRuleContext {
  public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
    super(parent, invokingState);
  }
  public NAME_STARTING_LC(): antlr.TerminalNode {
    return this.getToken(PythonParser.NAME_STARTING_LC, 0)!;
  }
  public override get ruleIndex(): number {
    return PythonParser.RULE_identifier;
  }
  public override enterRule(listener: PythonListener): void {
    if (listener.enterIdentifier) {
      listener.enterIdentifier(this);
    }
  }
  public override exitRule(listener: PythonListener): void {
    if (listener.exitIdentifier) {
      listener.exitIdentifier(this);
    }
  }
  public override accept<Result>(visitor: PythonVisitor<Result>): Result | null {
    if (visitor.visitIdentifier) {
      return visitor.visitIdentifier(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class AssignableContext extends antlr.ParserRuleContext {
  public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
    super(parent, invokingState);
  }
  public identifierWithOptIndexes(): IdentifierWithOptIndexesContext | null {
    return this.getRuleContext(0, IdentifierWithOptIndexesContext);
  }
  public propertyRef(): PropertyRefContext | null {
    return this.getRuleContext(0, PropertyRefContext);
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
  public litValue(): LitValueContext | null {
    return this.getRuleContext(0, LitValueContext);
  }
  public identifier(): IdentifierContext | null {
    return this.getRuleContext(0, IdentifierContext);
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
  public identifier(): IdentifierContext[];
  public identifier(i: number): IdentifierContext | null;
  public identifier(i?: number): IdentifierContext[] | IdentifierContext | null {
    if (i === undefined) {
      return this.getRuleContexts(IdentifierContext);
    }

    return this.getRuleContext(i, IdentifierContext);
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
  public identifier(): IdentifierContext {
    return this.getRuleContext(0, IdentifierContext)!;
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

export class IdentifierWithOptIndexesContext extends antlr.ParserRuleContext {
  public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
    super(parent, invokingState);
  }
  public identifier(): IdentifierContext {
    return this.getRuleContext(0, IdentifierContext)!;
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

export class PropertyRefContext extends antlr.ParserRuleContext {
  public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
    super(parent, invokingState);
  }
  public THIS_INSTANCE(): antlr.TerminalNode {
    return this.getToken(PythonParser.THIS_INSTANCE, 0)!;
  }
  public DOT(): antlr.TerminalNode {
    return this.getToken(PythonParser.DOT, 0)!;
  }
  public identifierWithOptIndexes(): IdentifierWithOptIndexesContext {
    return this.getRuleContext(0, IdentifierWithOptIndexesContext)!;
  }
  public override get ruleIndex(): number {
    return PythonParser.RULE_propertyRef;
  }
  public override enterRule(listener: PythonListener): void {
    if (listener.enterPropertyRef) {
      listener.enterPropertyRef(this);
    }
  }
  public override exitRule(listener: PythonListener): void {
    if (listener.exitPropertyRef) {
      listener.exitPropertyRef(this);
    }
  }
  public override accept<Result>(visitor: PythonVisitor<Result>): Result | null {
    if (visitor.visitPropertyRef) {
      return visitor.visitPropertyRef(this);
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
  public tuple(): TupleContext | null {
    return this.getRuleContext(0, TupleContext);
  }
  public litValue(): LitValueContext | null {
    return this.getRuleContext(0, LitValueContext);
  }
  public list(): ListContext | null {
    return this.getRuleContext(0, ListContext);
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

export class ChainableContext extends antlr.ParserRuleContext {
  public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
    super(parent, invokingState);
  }
  public identifier(): IdentifierContext | null {
    return this.getRuleContext(0, IdentifierContext);
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
  public identifier(): IdentifierContext {
    return this.getRuleContext(0, IdentifierContext)!;
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

export class PowerContext extends antlr.ParserRuleContext {
  public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
    super(parent, invokingState);
  }
  public term(): TermContext[];
  public term(i: number): TermContext | null;
  public term(i?: number): TermContext[] | TermContext | null {
    if (i === undefined) {
      return this.getRuleContexts(TermContext);
    }

    return this.getRuleContext(i, TermContext);
  }
  public POWER(): antlr.TerminalNode {
    return this.getToken(PythonParser.POWER, 0)!;
  }
  public override get ruleIndex(): number {
    return PythonParser.RULE_power;
  }
  public override enterRule(listener: PythonListener): void {
    if (listener.enterPower) {
      listener.enterPower(this);
    }
  }
  public override exitRule(listener: PythonListener): void {
    if (listener.exitPower) {
      listener.exitPower(this);
    }
  }
  public override accept<Result>(visitor: PythonVisitor<Result>): Result | null {
    if (visitor.visitPower) {
      return visitor.visitPower(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}
