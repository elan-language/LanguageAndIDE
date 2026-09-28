// Generated from src/grammars/ref-lang/RefLang.g4 by ANTLR 4.13.1

import * as antlr from "antlr4ng";
import { Token } from "antlr4ng";

import { RefLangListener } from "./RefLangListener.js";
import { RefLangVisitor } from "./RefLangVisitor.js";

// for running tests with parameters, TODO: discuss strategy for typed parameters in CI
// eslint-disable-next-line no-unused-vars
type int = number;

export class RefLangParser extends antlr.Parser {
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
  public static readonly OF = 33;
  public static readonly PRIVATE = 34;
  public static readonly PROCEDURE = 35;
  public static readonly PROPERTY = 36;
  public static readonly RETURNS = 37;
  public static readonly SET = 38;
  public static readonly STEP = 39;
  public static readonly TEST = 40;
  public static readonly THEN = 41;
  public static readonly THROW = 42;
  public static readonly TO = 43;
  public static readonly VARIABLE = 44;
  public static readonly ABSTRACT_METHOD = 45;
  public static readonly ASSERT_EQUAL = 46;
  public static readonly AS = 47;
  public static readonly DEF = 48;
  public static readonly EXCEPT = 49;
  public static readonly INIT = 50;
  public static readonly NONE = 51;
  public static readonly PASS = 52;
  public static readonly RAISE = 53;
  public static readonly ABC = 54;
  public static readonly TESTCASE = 55;
  public static readonly TUPLE = 56;
  public static readonly INT_NAME = 57;
  public static readonly FLOAT_NAME = 58;
  public static readonly BOOL_NAME = 59;
  public static readonly STRING_NAME = 60;
  public static readonly LIST_NAME = 61;
  public static readonly FUNC_NAME = 62;
  public static readonly TRUE = 63;
  public static readonly FALSE = 64;
  public static readonly AND = 65;
  public static readonly OR = 66;
  public static readonly NOT = 67;
  public static readonly EQUAL = 68;
  public static readonly NOT_EQUAL = 69;
  public static readonly MOD = 70;
  public static readonly ARROW = 71;
  public static readonly POWER = 72;
  public static readonly BINARY_PREFIX = 73;
  public static readonly HEX_PREFIX = 74;
  public static readonly INTERPOLATED_STRING_PREFIX = 75;
  public static readonly THIS_INSTANCE = 76;
  public static readonly SINGLE_EQUALS = 77;
  public static readonly OPEN_BRACE = 78;
  public static readonly CLOSE_BRACE = 79;
  public static readonly OPEN_SQ_BRACKET = 80;
  public static readonly CLOSE_SQ_BRACKET = 81;
  public static readonly OPEN_BRACKET = 82;
  public static readonly CLOSE_BRACKET = 83;
  public static readonly DOT = 84;
  public static readonly COMMA = 85;
  public static readonly COLON = 86;
  public static readonly PLUS = 87;
  public static readonly MINUS = 88;
  public static readonly MULT = 89;
  public static readonly DIVIDE = 90;
  public static readonly LT = 91;
  public static readonly GT = 92;
  public static readonly LE = 93;
  public static readonly GE = 94;
  public static readonly DOUBLE_QUOTES = 95;
  public static readonly WS = 96;
  public static readonly NL = 97;
  public static readonly NAME_STARTING_TEST_ = 98;
  public static readonly NAME_STARTING_LC = 99;
  public static readonly NAME_STARTING_UC = 100;
  public static readonly LITERAL_BINARY = 101;
  public static readonly LITERAL_HEX = 102;
  public static readonly LITERAL_INTEGER = 103;
  public static readonly LITERAL_FLOAT = 104;
  public static readonly LITERAL_REGEXP = 105;
  public static readonly LITERAL_STRING = 106;
  public static readonly WHITESPACES = 107;
  public static readonly TEXT = 108;
  public static readonly GHOSTED = 109;
  public static readonly FUNCTION_ANNOTATION = 110;
  public static readonly PROCECDURE_ANNOTATION = 111;
  public static readonly CONSTANT_ANNOTATION = 112;
  public static readonly ENUM_ANNOTATION = 113;
  public static readonly CONCRETE_CLASS_ANNOTATION = 114;
  public static readonly ABSTRACT_CLASS_ANNOTATION = 115;
  public static readonly VARIABLE_ANNOTATION = 116;
  public static readonly ASSIGNMENT_ANNOTATION = 117;
  public static readonly INPUT_ANNOTATION = 118;
  public static readonly CALL_ANNOTATION = 119;
  public static readonly LET_ANNOTATION = 120;
  public static readonly ELSE_IF_ANNOTATION = 121;
  public static readonly PROPERTY_ANNOTATION = 122;
  public static readonly FUNCTION_METHOD_ANNOTATION = 123;
  public static readonly PROCEDURE_METHOD_ANNOTATION = 124;
  public static readonly COMMENT = 125;
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
  public static readonly RULE_ifStatement = 13;
  public static readonly RULE_whileLoop = 14;
  public static readonly RULE_forLoop = 15;
  public static readonly RULE_tryStatement = 16;
  public static readonly RULE_assert = 17;
  public static readonly RULE_letStatement = 18;
  public static readonly RULE_print = 19;
  public static readonly RULE_variableDefinition = 20;
  public static readonly RULE_assignment = 21;
  public static readonly RULE_inputStatement = 22;
  public static readonly RULE_procedureCall = 23;
  public static readonly RULE_procRef = 24;
  public static readonly RULE_throwStatement = 25;
  public static readonly RULE_returnStatement = 26;
  public static readonly RULE_elseIfClause = 27;
  public static readonly RULE_elseClause = 28;
  public static readonly RULE_catchStatement = 29;
  public static readonly RULE_constructorMember = 30;
  public static readonly RULE_property = 31;
  public static readonly RULE_functionMethod = 32;
  public static readonly RULE_procedureMethod = 33;
  public static readonly RULE_abstractFunction = 34;
  public static readonly RULE_abstractProcedure = 35;
  public static readonly RULE_identifier = 36;
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
  public static readonly RULE_identifierWithOptIndexes = 56;
  public static readonly RULE_propertyRef = 57;
  public static readonly RULE_expression = 58;
  public static readonly RULE_ifExpression = 59;
  public static readonly RULE_term = 60;
  public static readonly RULE_chainHead = 61;
  public static readonly RULE_chainTail = 62;
  public static readonly RULE_chainable = 63;
  public static readonly RULE_thisInstance = 64;
  public static readonly RULE_bracketedExpression = 65;
  public static readonly RULE_unaryExpression = 66;
  public static readonly RULE_negateNumeric = 67;
  public static readonly RULE_negateLogical = 68;
  public static readonly RULE_binaryExpression = 69;
  public static readonly RULE_list = 70;
  public static readonly RULE_expressionList = 71;
  public static readonly RULE_tuple = 72;
  public static readonly RULE_tupleElementList = 73;
  public static readonly RULE_dictionary = 74;
  public static readonly RULE_kvpList = 75;
  public static readonly RULE_kvp = 76;
  public static readonly RULE_methodCall = 77;
  public static readonly RULE_binaryOperator = 78;
  public static readonly RULE_newInstance = 79;
  public static readonly RULE_paramDef = 80;
  public static readonly RULE_typeGeneric = 81;
  public static readonly RULE_typeFunc = 82;
  public static readonly RULE_typeTuple = 83;
  public static readonly RULE_lambda = 84;
  public static readonly RULE_interpolatedString = 85;
  public static readonly RULE_power = 86;

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
    "'of'",
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
    "'Int'",
    "'Float'",
    "'Boolean'",
    "'String'",
    "'List'",
    "'Func'",
    "'true'",
    "'false'",
    "'and'",
    "'or'",
    "'not'",
    "'is'",
    "'isnt'",
    "'mod'",
    "'=>'",
    "'**'",
    "'0b'",
    "'0x'",
    "'$'",
    "'this'",
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
    "OF",
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
    "ifStatement",
    "whileLoop",
    "forLoop",
    "tryStatement",
    "assert",
    "letStatement",
    "print",
    "variableDefinition",
    "assignment",
    "inputStatement",
    "procedureCall",
    "procRef",
    "throwStatement",
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
    "litString",
    "enumValue",
    "litRegExp",
    "index",
    "identifierWithOptIndexes",
    "propertyRef",
    "expression",
    "ifExpression",
    "term",
    "chainHead",
    "chainTail",
    "chainable",
    "thisInstance",
    "bracketedExpression",
    "unaryExpression",
    "negateNumeric",
    "negateLogical",
    "binaryExpression",
    "list",
    "expressionList",
    "tuple",
    "tupleElementList",
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
    "power",
  ];

  public get grammarFileName(): string {
    return "RefLang.g4";
  }
  public get literalNames(): (string | null)[] {
    return RefLangParser.literalNames;
  }
  public get symbolicNames(): (string | null)[] {
    return RefLangParser.symbolicNames;
  }
  public get ruleNames(): string[] {
    return RefLangParser.ruleNames;
  }
  public get serializedATN(): number[] {
    return RefLangParser._serializedATN;
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
      RefLangParser._ATN,
      RefLangParser.decisionsToDFA,
      new antlr.PredictionContextCache(),
    );
  }
  public file(): FileContext {
    let localContext = new FileContext(this.context, this.state);
    this.enterRule(localContext, 0, RefLangParser.RULE_file);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 175;
        this.errorHandler.sync(this);
        switch (this.interpreter.adaptivePredict(this.tokenStream, 0, this.context)) {
          case 1:
            {
              this.state = 174;
              this.comment();
            }
            break;
        }
        this.state = 180;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (
          ((_la & ~0x1f) === 0 && ((1 << _la) & 541131794) !== 0) ||
          _la === 35 ||
          _la === 40 ||
          _la === 109 ||
          _la === 125
        ) {
          {
            {
              this.state = 177;
              this.global();
            }
          }
          this.state = 182;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 186;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (_la === 97) {
          {
            {
              this.state = 183;
              this.match(RefLangParser.NL);
            }
          }
          this.state = 188;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 189;
        this.match(RefLangParser.EOF);
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
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
    this.enterRule(localContext, 2, RefLangParser.RULE_global);
    try {
      this.state = 200;
      this.errorHandler.sync(this);
      switch (this.interpreter.adaptivePredict(this.tokenStream, 3, this.context)) {
        case 1:
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 191;
            this.main();
          }
          break;
        case 2:
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 192;
            this.function_();
          }
          break;
        case 3:
          this.enterOuterAlt(localContext, 3);
          {
            this.state = 193;
            this.test();
          }
          break;
        case 4:
          this.enterOuterAlt(localContext, 4);
          {
            this.state = 194;
            this.procedure();
          }
          break;
        case 5:
          this.enterOuterAlt(localContext, 5);
          {
            this.state = 195;
            this.constant();
          }
          break;
        case 6:
          this.enterOuterAlt(localContext, 6);
          {
            this.state = 196;
            this.enum_();
          }
          break;
        case 7:
          this.enterOuterAlt(localContext, 7);
          {
            this.state = 197;
            this.concreteClass();
          }
          break;
        case 8:
          this.enterOuterAlt(localContext, 8);
          {
            this.state = 198;
            this.abstractClass();
          }
          break;
        case 9:
          this.enterOuterAlt(localContext, 9);
          {
            this.state = 199;
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
    this.enterRule(localContext, 4, RefLangParser.RULE_main);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 203;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 109) {
          {
            this.state = 202;
            this.match(RefLangParser.GHOSTED);
          }
        }

        this.state = 205;
        this.match(RefLangParser.MAIN);
        this.state = 206;
        this.match(RefLangParser.NL);
        this.state = 210;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (
          ((_la & ~0x1f) === 0 && ((1 << _la) & 1337696) !== 0) ||
          _la === 42 ||
          _la === 44 ||
          _la === 109 ||
          _la === 125
        ) {
          {
            {
              this.state = 207;
              this.ordinaryStatement();
            }
          }
          this.state = 212;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 213;
        this.match(RefLangParser.END);
        this.state = 214;
        this.match(RefLangParser.MAIN);
        this.state = 215;
        this.match(RefLangParser.NL);
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
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
    this.enterRule(localContext, 6, RefLangParser.RULE_function);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 218;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 109) {
          {
            this.state = 217;
            this.match(RefLangParser.GHOSTED);
          }
        }

        this.state = 220;
        this.match(RefLangParser.FUNCTION);
        this.state = 221;
        this.methodName();
        this.state = 222;
        this.match(RefLangParser.OPEN_BRACKET);
        this.state = 224;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 99) {
          {
            this.state = 223;
            this.paramsList();
          }
        }

        this.state = 226;
        this.match(RefLangParser.CLOSE_BRACKET);
        this.state = 227;
        this.match(RefLangParser.RETURNS);
        this.state = 228;
        this.type_();
        this.state = 229;
        this.match(RefLangParser.NL);
        this.state = 234;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (
          ((_la & ~0x1f) === 0 && ((1 << _la) & 2148821344) !== 0) ||
          _la === 42 ||
          _la === 44 ||
          _la === 109 ||
          _la === 125
        ) {
          {
            this.state = 232;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 8, this.context)) {
              case 1:
                {
                  this.state = 230;
                  this.letStatement();
                }
                break;
              case 2:
                {
                  this.state = 231;
                  this.ordinaryStatement();
                }
                break;
            }
          }
          this.state = 236;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 237;
        this.returnStatement();
        this.state = 238;
        this.match(RefLangParser.END);
        this.state = 239;
        this.match(RefLangParser.FUNCTION);
        this.state = 240;
        this.match(RefLangParser.NL);
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
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
    this.enterRule(localContext, 8, RefLangParser.RULE_test);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 243;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 109) {
          {
            this.state = 242;
            this.match(RefLangParser.GHOSTED);
          }
        }

        this.state = 245;
        this.match(RefLangParser.TEST);
        this.state = 246;
        this.testName();
        this.state = 247;
        this.match(RefLangParser.NL);
        this.state = 254;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (
          (((_la - 17) & ~0x1f) === 0 && ((1 << (_la - 17)) & 134234113) !== 0) ||
          _la === 109 ||
          _la === 125
        ) {
          {
            this.state = 252;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 11, this.context)) {
              case 1:
                {
                  this.state = 248;
                  this.assert();
                }
                break;
              case 2:
                {
                  this.state = 249;
                  this.letStatement();
                }
                break;
              case 3:
                {
                  this.state = 250;
                  this.variableDefinition();
                }
                break;
              case 4:
                {
                  this.state = 251;
                  this.comment();
                }
                break;
            }
          }
          this.state = 256;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 257;
        this.match(RefLangParser.END);
        this.state = 258;
        this.match(RefLangParser.TEST);
        this.state = 259;
        this.match(RefLangParser.NL);
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
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
    this.enterRule(localContext, 10, RefLangParser.RULE_procedure);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 262;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 109) {
          {
            this.state = 261;
            this.match(RefLangParser.GHOSTED);
          }
        }

        this.state = 264;
        this.match(RefLangParser.PROCEDURE);
        this.state = 265;
        this.methodName();
        this.state = 266;
        this.match(RefLangParser.OPEN_BRACKET);
        this.state = 268;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 99) {
          {
            this.state = 267;
            this.paramsList();
          }
        }

        this.state = 270;
        this.match(RefLangParser.CLOSE_BRACKET);
        this.state = 271;
        this.match(RefLangParser.NL);
        this.state = 275;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (
          ((_la & ~0x1f) === 0 && ((1 << _la) & 1337696) !== 0) ||
          _la === 42 ||
          _la === 44 ||
          _la === 109 ||
          _la === 125
        ) {
          {
            {
              this.state = 272;
              this.ordinaryStatement();
            }
          }
          this.state = 277;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 278;
        this.match(RefLangParser.END);
        this.state = 279;
        this.match(RefLangParser.PROCEDURE);
        this.state = 280;
        this.match(RefLangParser.NL);
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
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
    this.enterRule(localContext, 12, RefLangParser.RULE_constant);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 283;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 109) {
          {
            this.state = 282;
            this.match(RefLangParser.GHOSTED);
          }
        }

        this.state = 285;
        this.match(RefLangParser.CONSTANT);
        this.state = 286;
        this.identifier();
        this.state = 287;
        this.match(RefLangParser.SET);
        this.state = 288;
        this.match(RefLangParser.TO);
        this.state = 289;
        this.constantValue();
        this.state = 290;
        this.match(RefLangParser.NL);
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
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
    this.enterRule(localContext, 14, RefLangParser.RULE_enum);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 293;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 109) {
          {
            this.state = 292;
            this.match(RefLangParser.GHOSTED);
          }
        }

        this.state = 295;
        this.match(RefLangParser.ENUM);
        this.state = 296;
        this.typeName();
        this.state = 297;
        this.enumValuesList();
        this.state = 298;
        this.match(RefLangParser.NL);
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
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
    this.enterRule(localContext, 16, RefLangParser.RULE_concreteClass);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 301;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 109) {
          {
            this.state = 300;
            this.match(RefLangParser.GHOSTED);
          }
        }

        this.state = 303;
        this.match(RefLangParser.CLASS);
        this.state = 304;
        this.typeName();
        this.state = 307;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 30) {
          {
            this.state = 305;
            this.match(RefLangParser.INHERITS);
            this.state = 306;
            this.typeName();
          }
        }

        this.state = 309;
        this.match(RefLangParser.NL);
        this.state = 317;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (
          (((_la - 23) & ~0x1f) === 0 && ((1 << (_la - 23)) & 14401) !== 0) ||
          _la === 109 ||
          _la === 125
        ) {
          {
            this.state = 315;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 20, this.context)) {
              case 1:
                {
                  this.state = 310;
                  this.constructorMember();
                }
                break;
              case 2:
                {
                  this.state = 311;
                  this.property();
                }
                break;
              case 3:
                {
                  this.state = 312;
                  this.functionMethod();
                }
                break;
              case 4:
                {
                  this.state = 313;
                  this.procedureMethod();
                }
                break;
              case 5:
                {
                  this.state = 314;
                  this.comment();
                }
                break;
            }
          }
          this.state = 319;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 320;
        this.match(RefLangParser.END);
        this.state = 321;
        this.match(RefLangParser.CLASS);
        this.state = 322;
        this.match(RefLangParser.NL);
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
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
    this.enterRule(localContext, 18, RefLangParser.RULE_abstractClass);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 325;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 109) {
          {
            this.state = 324;
            this.match(RefLangParser.GHOSTED);
          }
        }

        this.state = 327;
        this.match(RefLangParser.ABSTRACT);
        this.state = 328;
        this.match(RefLangParser.CLASS);
        this.state = 329;
        this.typeName();
        this.state = 332;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 30) {
          {
            this.state = 330;
            this.match(RefLangParser.INHERITS);
            this.state = 331;
            this.typeName();
          }
        }

        this.state = 334;
        this.match(RefLangParser.NL);
        this.state = 343;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (
          (((_la - 16) & ~0x1f) === 0 && ((1 << (_la - 16)) & 1843201) !== 0) ||
          _la === 109 ||
          _la === 125
        ) {
          {
            this.state = 341;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 24, this.context)) {
              case 1:
                {
                  this.state = 335;
                  this.property();
                }
                break;
              case 2:
                {
                  this.state = 336;
                  this.functionMethod();
                }
                break;
              case 3:
                {
                  this.state = 337;
                  this.procedureMethod();
                }
                break;
              case 4:
                {
                  this.state = 338;
                  this.abstractFunction();
                }
                break;
              case 5:
                {
                  this.state = 339;
                  this.abstractProcedure();
                }
                break;
              case 6:
                {
                  this.state = 340;
                  this.comment();
                }
                break;
            }
          }
          this.state = 345;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 346;
        this.match(RefLangParser.END);
        this.state = 347;
        this.match(RefLangParser.CLASS);
        this.state = 348;
        this.match(RefLangParser.NL);
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
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
    this.enterRule(localContext, 20, RefLangParser.RULE_comment);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 350;
        this.commentText();
        this.state = 351;
        this.match(RefLangParser.NL);
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
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
    this.enterRule(localContext, 22, RefLangParser.RULE_commentText);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 353;
        this.match(RefLangParser.COMMENT);
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
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
    this.enterRule(localContext, 24, RefLangParser.RULE_ordinaryStatement);
    try {
      this.state = 366;
      this.errorHandler.sync(this);
      switch (this.interpreter.adaptivePredict(this.tokenStream, 26, this.context)) {
        case 1:
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 355;
            this.print();
          }
          break;
        case 2:
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 356;
            this.variableDefinition();
          }
          break;
        case 3:
          this.enterOuterAlt(localContext, 3);
          {
            this.state = 357;
            this.assignment();
          }
          break;
        case 4:
          this.enterOuterAlt(localContext, 4);
          {
            this.state = 358;
            this.inputStatement();
          }
          break;
        case 5:
          this.enterOuterAlt(localContext, 5);
          {
            this.state = 359;
            this.ifStatement();
          }
          break;
        case 6:
          this.enterOuterAlt(localContext, 6);
          {
            this.state = 360;
            this.whileLoop();
          }
          break;
        case 7:
          this.enterOuterAlt(localContext, 7);
          {
            this.state = 361;
            this.forLoop();
          }
          break;
        case 8:
          this.enterOuterAlt(localContext, 8);
          {
            this.state = 362;
            this.procedureCall();
          }
          break;
        case 9:
          this.enterOuterAlt(localContext, 9);
          {
            this.state = 363;
            this.tryStatement();
          }
          break;
        case 10:
          this.enterOuterAlt(localContext, 10);
          {
            this.state = 364;
            this.throwStatement();
          }
          break;
        case 11:
          this.enterOuterAlt(localContext, 11);
          {
            this.state = 365;
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
  public ifStatement(): IfStatementContext {
    let localContext = new IfStatementContext(this.context, this.state);
    this.enterRule(localContext, 26, RefLangParser.RULE_ifStatement);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 369;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 109) {
          {
            this.state = 368;
            this.match(RefLangParser.GHOSTED);
          }
        }

        this.state = 371;
        this.match(RefLangParser.IF);
        this.state = 372;
        this.expression();
        this.state = 373;
        this.match(RefLangParser.THEN);
        this.state = 374;
        this.match(RefLangParser.NL);
        this.state = 380;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (
          ((_la & ~0x1f) === 0 && ((1 << _la) & 1337708) !== 0) ||
          _la === 42 ||
          _la === 44 ||
          _la === 109 ||
          _la === 125
        ) {
          {
            this.state = 378;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 28, this.context)) {
              case 1:
                {
                  this.state = 375;
                  this.elseIfClause();
                }
                break;
              case 2:
                {
                  this.state = 376;
                  this.elseClause();
                }
                break;
              case 3:
                {
                  this.state = 377;
                  this.ordinaryStatement();
                }
                break;
            }
          }
          this.state = 382;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 383;
        this.match(RefLangParser.END);
        this.state = 384;
        this.match(RefLangParser.IF);
        this.state = 385;
        this.match(RefLangParser.NL);
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
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
    this.enterRule(localContext, 28, RefLangParser.RULE_whileLoop);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 388;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 109) {
          {
            this.state = 387;
            this.match(RefLangParser.GHOSTED);
          }
        }

        this.state = 390;
        this.match(RefLangParser.WHILE);
        this.state = 391;
        this.expression();
        this.state = 392;
        this.match(RefLangParser.NL);
        this.state = 396;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (
          ((_la & ~0x1f) === 0 && ((1 << _la) & 1337696) !== 0) ||
          _la === 42 ||
          _la === 44 ||
          _la === 109 ||
          _la === 125
        ) {
          {
            {
              this.state = 393;
              this.ordinaryStatement();
            }
          }
          this.state = 398;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 399;
        this.match(RefLangParser.END);
        this.state = 400;
        this.match(RefLangParser.WHILE);
        this.state = 401;
        this.match(RefLangParser.NL);
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
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
    this.enterRule(localContext, 30, RefLangParser.RULE_forLoop);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 404;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 109) {
          {
            this.state = 403;
            this.match(RefLangParser.GHOSTED);
          }
        }

        this.state = 406;
        this.match(RefLangParser.FOR);
        this.state = 407;
        this.identifier();
        this.state = 408;
        this.match(RefLangParser.IN);
        this.state = 409;
        this.expression();
        this.state = 410;
        this.match(RefLangParser.NL);
        this.state = 414;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (
          ((_la & ~0x1f) === 0 && ((1 << _la) & 1337696) !== 0) ||
          _la === 42 ||
          _la === 44 ||
          _la === 109 ||
          _la === 125
        ) {
          {
            {
              this.state = 411;
              this.ordinaryStatement();
            }
          }
          this.state = 416;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 417;
        this.match(RefLangParser.END);
        this.state = 418;
        this.match(RefLangParser.FOR);
        this.state = 419;
        this.match(RefLangParser.NL);
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
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
    this.enterRule(localContext, 32, RefLangParser.RULE_tryStatement);
    let _la: number;
    try {
      let alternative: number;
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 422;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 109) {
          {
            this.state = 421;
            this.match(RefLangParser.GHOSTED);
          }
        }

        this.state = 424;
        this.match(RefLangParser.TRY);
        this.state = 425;
        this.match(RefLangParser.NL);
        this.state = 429;
        this.errorHandler.sync(this);
        alternative = this.interpreter.adaptivePredict(this.tokenStream, 35, this.context);
        while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
          if (alternative === 1) {
            {
              {
                this.state = 426;
                this.ordinaryStatement();
              }
            }
          }
          this.state = 431;
          this.errorHandler.sync(this);
          alternative = this.interpreter.adaptivePredict(this.tokenStream, 35, this.context);
        }
        this.state = 432;
        this.catchStatement();
        this.state = 436;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (
          ((_la & ~0x1f) === 0 && ((1 << _la) & 1337696) !== 0) ||
          _la === 42 ||
          _la === 44 ||
          _la === 109 ||
          _la === 125
        ) {
          {
            {
              this.state = 433;
              this.ordinaryStatement();
            }
          }
          this.state = 438;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 439;
        this.match(RefLangParser.END);
        this.state = 440;
        this.match(RefLangParser.TRY);
        this.state = 441;
        this.match(RefLangParser.NL);
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
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
    this.enterRule(localContext, 34, RefLangParser.RULE_assert);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 444;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 109) {
          {
            this.state = 443;
            this.match(RefLangParser.GHOSTED);
          }
        }

        this.state = 446;
        this.match(RefLangParser.ASSERT);
        this.state = 447;
        this.assertActual();
        this.state = 448;
        this.match(RefLangParser.EVALUATES);
        this.state = 449;
        this.match(RefLangParser.TO);
        this.state = 450;
        this.expression();
        this.state = 451;
        this.match(RefLangParser.NL);
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
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
    this.enterRule(localContext, 36, RefLangParser.RULE_letStatement);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 454;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 109) {
          {
            this.state = 453;
            this.match(RefLangParser.GHOSTED);
          }
        }

        this.state = 456;
        this.match(RefLangParser.LET);
        this.state = 457;
        this.identifier();
        this.state = 458;
        this.match(RefLangParser.BE);
        this.state = 459;
        this.expression();
        this.state = 460;
        this.match(RefLangParser.NL);
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
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
    this.enterRule(localContext, 38, RefLangParser.RULE_print);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 463;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 109) {
          {
            this.state = 462;
            this.match(RefLangParser.GHOSTED);
          }
        }

        this.state = 465;
        this.match(RefLangParser.PRINT);
        this.state = 466;
        this.match(RefLangParser.OPEN_BRACKET);
        this.state = 468;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (
          _la === 15 ||
          _la === 32 ||
          (((_la - 57) & ~0x1f) === 0 && ((1 << (_la - 57)) & 2190214367) !== 0) ||
          (((_la - 99) & ~0x1f) === 0 && ((1 << (_la - 99)) & 255) !== 0)
        ) {
          {
            this.state = 467;
            this.expression();
          }
        }

        this.state = 470;
        this.match(RefLangParser.CLOSE_BRACKET);
        this.state = 471;
        this.match(RefLangParser.NL);
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
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
    this.enterRule(localContext, 40, RefLangParser.RULE_variableDefinition);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 474;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 109) {
          {
            this.state = 473;
            this.match(RefLangParser.GHOSTED);
          }
        }

        this.state = 476;
        this.match(RefLangParser.VARIABLE);
        this.state = 477;
        this.identifier();
        this.state = 478;
        this.match(RefLangParser.SET);
        this.state = 479;
        this.match(RefLangParser.TO);
        this.state = 480;
        this.expression();
        this.state = 481;
        this.match(RefLangParser.NL);
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
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
    this.enterRule(localContext, 42, RefLangParser.RULE_assignment);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 484;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 109) {
          {
            this.state = 483;
            this.match(RefLangParser.GHOSTED);
          }
        }

        this.state = 486;
        this.match(RefLangParser.ASSIGN);
        this.state = 487;
        this.assignable();
        this.state = 488;
        this.match(RefLangParser.TO);
        this.state = 489;
        this.expression();
        this.state = 490;
        this.match(RefLangParser.NL);
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
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
    this.enterRule(localContext, 44, RefLangParser.RULE_inputStatement);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 493;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 109) {
          {
            this.state = 492;
            this.match(RefLangParser.GHOSTED);
          }
        }

        this.state = 495;
        this.match(RefLangParser.INPUT);
        this.state = 496;
        this.identifier();
        this.state = 497;
        this.match(RefLangParser.SET);
        this.state = 498;
        this.match(RefLangParser.TO);
        this.state = 499;
        this.methodName();
        this.state = 500;
        this.match(RefLangParser.OPEN_BRACKET);
        this.state = 501;
        this.expression();
        this.state = 502;
        this.match(RefLangParser.CLOSE_BRACKET);
        this.state = 503;
        this.match(RefLangParser.NL);
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
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
    this.enterRule(localContext, 46, RefLangParser.RULE_procedureCall);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 506;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 109) {
          {
            this.state = 505;
            this.match(RefLangParser.GHOSTED);
          }
        }

        this.state = 508;
        this.match(RefLangParser.CALL);
        this.state = 509;
        this.procRef();
        this.state = 510;
        this.match(RefLangParser.OPEN_BRACKET);
        this.state = 511;
        this.argList();
        this.state = 512;
        this.match(RefLangParser.CLOSE_BRACKET);
        this.state = 513;
        this.match(RefLangParser.NL);
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
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
    this.enterRule(localContext, 48, RefLangParser.RULE_procRef);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 518;
        this.errorHandler.sync(this);
        switch (this.interpreter.adaptivePredict(this.tokenStream, 45, this.context)) {
          case 1:
            {
              this.state = 515;
              this.term();
              this.state = 516;
              this.match(RefLangParser.DOT);
            }
            break;
        }
        this.state = 520;
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
  public throwStatement(): ThrowStatementContext {
    let localContext = new ThrowStatementContext(this.context, this.state);
    this.enterRule(localContext, 50, RefLangParser.RULE_throwStatement);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 523;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 109) {
          {
            this.state = 522;
            this.match(RefLangParser.GHOSTED);
          }
        }

        this.state = 525;
        this.match(RefLangParser.THROW);
        this.state = 526;
        this.typeName();
        this.state = 527;
        this.litString();
        this.state = 528;
        this.match(RefLangParser.NL);
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
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
    this.enterRule(localContext, 52, RefLangParser.RULE_returnStatement);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 530;
        this.match(RefLangParser.RETURN);
        this.state = 531;
        this.expression();
        this.state = 532;
        this.match(RefLangParser.NL);
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
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
    this.enterRule(localContext, 54, RefLangParser.RULE_elseIfClause);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 535;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 109) {
          {
            this.state = 534;
            this.match(RefLangParser.GHOSTED);
          }
        }

        this.state = 537;
        this.match(RefLangParser.ELIF);
        this.state = 538;
        this.expression();
        this.state = 539;
        this.match(RefLangParser.THEN);
        this.state = 540;
        this.match(RefLangParser.NL);
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
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
    this.enterRule(localContext, 56, RefLangParser.RULE_elseClause);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 543;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 109) {
          {
            this.state = 542;
            this.match(RefLangParser.GHOSTED);
          }
        }

        this.state = 545;
        this.match(RefLangParser.ELSE);
        this.state = 546;
        this.match(RefLangParser.NL);
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
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
    this.enterRule(localContext, 58, RefLangParser.RULE_catchStatement);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 549;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 109) {
          {
            this.state = 548;
            this.match(RefLangParser.GHOSTED);
          }
        }

        this.state = 551;
        this.match(RefLangParser.CATCH);
        this.state = 552;
        this.identifier();
        this.state = 553;
        this.match(RefLangParser.AS);
        this.state = 554;
        this.typeName();
        this.state = 555;
        this.match(RefLangParser.NL);
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
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
    this.enterRule(localContext, 60, RefLangParser.RULE_constructorMember);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 558;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 109) {
          {
            this.state = 557;
            this.match(RefLangParser.GHOSTED);
          }
        }

        this.state = 560;
        this.match(RefLangParser.CONSTRUCTOR);
        this.state = 561;
        this.match(RefLangParser.OPEN_BRACKET);
        this.state = 563;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 99) {
          {
            this.state = 562;
            this.paramsList();
          }
        }

        this.state = 565;
        this.match(RefLangParser.CLOSE_BRACKET);
        this.state = 566;
        this.match(RefLangParser.NL);
        this.state = 570;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (
          ((_la & ~0x1f) === 0 && ((1 << _la) & 1337696) !== 0) ||
          _la === 42 ||
          _la === 44 ||
          _la === 109 ||
          _la === 125
        ) {
          {
            {
              this.state = 567;
              this.ordinaryStatement();
            }
          }
          this.state = 572;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 573;
        this.match(RefLangParser.END);
        this.state = 574;
        this.match(RefLangParser.CONSTRUCTOR);
        this.state = 575;
        this.match(RefLangParser.NL);
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
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
    this.enterRule(localContext, 62, RefLangParser.RULE_property);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 578;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 34) {
          {
            this.state = 577;
            this.match(RefLangParser.PRIVATE);
          }
        }

        this.state = 580;
        this.match(RefLangParser.PROPERTY);
        this.state = 581;
        this.identifier();
        this.state = 582;
        this.match(RefLangParser.AS);
        this.state = 583;
        this.type_();
        this.state = 584;
        this.match(RefLangParser.NL);
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
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
    this.enterRule(localContext, 64, RefLangParser.RULE_functionMethod);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 587;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 109) {
          {
            this.state = 586;
            this.match(RefLangParser.GHOSTED);
          }
        }

        this.state = 590;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 34) {
          {
            this.state = 589;
            this.match(RefLangParser.PRIVATE);
          }
        }

        this.state = 592;
        this.match(RefLangParser.FUNCTION);
        this.state = 593;
        this.methodName();
        this.state = 594;
        this.match(RefLangParser.OPEN_BRACKET);
        this.state = 596;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 99) {
          {
            this.state = 595;
            this.paramsList();
          }
        }

        this.state = 598;
        this.match(RefLangParser.CLOSE_BRACKET);
        this.state = 599;
        this.match(RefLangParser.RETURNS);
        this.state = 600;
        this.type_();
        this.state = 601;
        this.match(RefLangParser.NL);
        this.state = 606;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (
          ((_la & ~0x1f) === 0 && ((1 << _la) & 2148821344) !== 0) ||
          _la === 42 ||
          _la === 44 ||
          _la === 109 ||
          _la === 125
        ) {
          {
            this.state = 604;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 57, this.context)) {
              case 1:
                {
                  this.state = 602;
                  this.letStatement();
                }
                break;
              case 2:
                {
                  this.state = 603;
                  this.ordinaryStatement();
                }
                break;
            }
          }
          this.state = 608;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 609;
        this.returnStatement();
        this.state = 610;
        this.match(RefLangParser.END);
        this.state = 611;
        this.match(RefLangParser.FUNCTION);
        this.state = 612;
        this.match(RefLangParser.NL);
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
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
    this.enterRule(localContext, 66, RefLangParser.RULE_procedureMethod);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 615;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 109) {
          {
            this.state = 614;
            this.match(RefLangParser.GHOSTED);
          }
        }

        this.state = 618;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 34) {
          {
            this.state = 617;
            this.match(RefLangParser.PRIVATE);
          }
        }

        this.state = 620;
        this.match(RefLangParser.PROCEDURE);
        this.state = 621;
        this.methodName();
        this.state = 622;
        this.match(RefLangParser.OPEN_BRACKET);
        this.state = 624;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 99) {
          {
            this.state = 623;
            this.paramsList();
          }
        }

        this.state = 626;
        this.match(RefLangParser.CLOSE_BRACKET);
        this.state = 627;
        this.match(RefLangParser.NL);
        this.state = 631;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (
          ((_la & ~0x1f) === 0 && ((1 << _la) & 1337696) !== 0) ||
          _la === 42 ||
          _la === 44 ||
          _la === 109 ||
          _la === 125
        ) {
          {
            {
              this.state = 628;
              this.ordinaryStatement();
            }
          }
          this.state = 633;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 634;
        this.match(RefLangParser.END);
        this.state = 635;
        this.match(RefLangParser.PROCEDURE);
        this.state = 636;
        this.match(RefLangParser.NL);
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
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
    this.enterRule(localContext, 68, RefLangParser.RULE_abstractFunction);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 639;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 109) {
          {
            this.state = 638;
            this.match(RefLangParser.GHOSTED);
          }
        }

        this.state = 641;
        this.match(RefLangParser.ABSTRACT);
        this.state = 642;
        this.match(RefLangParser.FUNCTION);
        this.state = 643;
        this.methodName();
        this.state = 644;
        this.match(RefLangParser.OPEN_BRACKET);
        this.state = 646;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 99) {
          {
            this.state = 645;
            this.paramsList();
          }
        }

        this.state = 648;
        this.match(RefLangParser.CLOSE_BRACKET);
        this.state = 649;
        this.match(RefLangParser.RETURNS);
        this.state = 650;
        this.type_();
        this.state = 651;
        this.match(RefLangParser.NL);
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
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
    this.enterRule(localContext, 70, RefLangParser.RULE_abstractProcedure);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 654;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 109) {
          {
            this.state = 653;
            this.match(RefLangParser.GHOSTED);
          }
        }

        this.state = 656;
        this.match(RefLangParser.ABSTRACT);
        this.state = 657;
        this.match(RefLangParser.PROCEDURE);
        this.state = 658;
        this.methodName();
        this.state = 659;
        this.match(RefLangParser.OPEN_BRACKET);
        this.state = 661;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 99) {
          {
            this.state = 660;
            this.paramsList();
          }
        }

        this.state = 663;
        this.match(RefLangParser.CLOSE_BRACKET);
        this.state = 664;
        this.match(RefLangParser.NL);
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
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
    this.enterRule(localContext, 72, RefLangParser.RULE_identifier);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 666;
        this.match(RefLangParser.NAME_STARTING_LC);
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
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
    this.enterRule(localContext, 74, RefLangParser.RULE_assignable);
    try {
      this.state = 670;
      this.errorHandler.sync(this);
      switch (this.tokenStream.LA(1)) {
        case RefLangParser.NAME_STARTING_LC:
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 668;
            this.identifierWithOptIndexes();
          }
          break;
        case RefLangParser.THIS_INSTANCE:
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 669;
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
    this.enterRule(localContext, 76, RefLangParser.RULE_methodName);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 672;
        this.match(RefLangParser.NAME_STARTING_LC);
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
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
    this.enterRule(localContext, 78, RefLangParser.RULE_testName);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 674;
        this.match(RefLangParser.NAME_STARTING_TEST_);
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
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
    this.enterRule(localContext, 80, RefLangParser.RULE_typeName);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 676;
        _la = this.tokenStream.LA(1);
        if (!((((_la - 57) & ~0x1f) === 0 && ((1 << (_la - 57)) & 31) !== 0) || _la === 100)) {
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
    this.enterRule(localContext, 82, RefLangParser.RULE_constantValue);
    try {
      this.state = 680;
      this.errorHandler.sync(this);
      switch (this.tokenStream.LA(1)) {
        case RefLangParser.INT_NAME:
        case RefLangParser.FLOAT_NAME:
        case RefLangParser.BOOL_NAME:
        case RefLangParser.STRING_NAME:
        case RefLangParser.LIST_NAME:
        case RefLangParser.TRUE:
        case RefLangParser.FALSE:
        case RefLangParser.INTERPOLATED_STRING_PREFIX:
        case RefLangParser.NAME_STARTING_UC:
        case RefLangParser.LITERAL_BINARY:
        case RefLangParser.LITERAL_HEX:
        case RefLangParser.LITERAL_INTEGER:
        case RefLangParser.LITERAL_FLOAT:
        case RefLangParser.LITERAL_REGEXP:
        case RefLangParser.LITERAL_STRING:
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 678;
            this.litValue();
          }
          break;
        case RefLangParser.NAME_STARTING_LC:
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 679;
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
    this.enterRule(localContext, 84, RefLangParser.RULE_argList);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 682;
        this.argument();
        this.state = 687;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (_la === 85) {
          {
            {
              this.state = 683;
              this.match(RefLangParser.COMMA);
              this.state = 684;
              this.argument();
            }
          }
          this.state = 689;
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
    this.enterRule(localContext, 86, RefLangParser.RULE_argument);
    try {
      this.state = 692;
      this.errorHandler.sync(this);
      switch (this.tokenStream.LA(1)) {
        case RefLangParser.LAMBDA:
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 690;
            this.lambda();
          }
          break;
        case RefLangParser.IF_:
        case RefLangParser.NEW:
        case RefLangParser.INT_NAME:
        case RefLangParser.FLOAT_NAME:
        case RefLangParser.BOOL_NAME:
        case RefLangParser.STRING_NAME:
        case RefLangParser.LIST_NAME:
        case RefLangParser.TRUE:
        case RefLangParser.FALSE:
        case RefLangParser.NOT:
        case RefLangParser.INTERPOLATED_STRING_PREFIX:
        case RefLangParser.THIS_INSTANCE:
        case RefLangParser.OPEN_SQ_BRACKET:
        case RefLangParser.OPEN_BRACKET:
        case RefLangParser.MINUS:
        case RefLangParser.NAME_STARTING_LC:
        case RefLangParser.NAME_STARTING_UC:
        case RefLangParser.LITERAL_BINARY:
        case RefLangParser.LITERAL_HEX:
        case RefLangParser.LITERAL_INTEGER:
        case RefLangParser.LITERAL_FLOAT:
        case RefLangParser.LITERAL_REGEXP:
        case RefLangParser.LITERAL_STRING:
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 691;
            this.expression();
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
    this.enterRule(localContext, 88, RefLangParser.RULE_paramsList);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 694;
        this.paramDef();
        this.state = 699;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (_la === 85) {
          {
            {
              this.state = 695;
              this.match(RefLangParser.COMMA);
              this.state = 696;
              this.paramDef();
            }
          }
          this.state = 701;
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
    this.enterRule(localContext, 90, RefLangParser.RULE_type);
    try {
      this.state = 706;
      this.errorHandler.sync(this);
      switch (this.interpreter.adaptivePredict(this.tokenStream, 72, this.context)) {
        case 1:
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 702;
            this.typeTuple();
          }
          break;
        case 2:
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 703;
            this.typeName();
          }
          break;
        case 3:
          this.enterOuterAlt(localContext, 3);
          {
            this.state = 704;
            this.typeGeneric();
          }
          break;
        case 4:
          this.enterOuterAlt(localContext, 4);
          {
            this.state = 705;
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
    this.enterRule(localContext, 92, RefLangParser.RULE_enumValuesList);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 708;
        this.identifier();
        this.state = 713;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (_la === 85) {
          {
            {
              this.state = 709;
              this.match(RefLangParser.COMMA);
              this.state = 710;
              this.identifier();
            }
          }
          this.state = 715;
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
    this.enterRule(localContext, 94, RefLangParser.RULE_assertActual);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 716;
        this.expression();
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
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
    this.enterRule(localContext, 96, RefLangParser.RULE_litValue);
    try {
      this.state = 724;
      this.errorHandler.sync(this);
      switch (this.tokenStream.LA(1)) {
        case RefLangParser.TRUE:
        case RefLangParser.FALSE:
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 718;
            this.litBoolean();
          }
          break;
        case RefLangParser.LITERAL_BINARY:
        case RefLangParser.LITERAL_HEX:
        case RefLangParser.LITERAL_INTEGER:
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 719;
            this.litInt();
          }
          break;
        case RefLangParser.LITERAL_FLOAT:
          this.enterOuterAlt(localContext, 3);
          {
            this.state = 720;
            this.litFloat();
          }
          break;
        case RefLangParser.INTERPOLATED_STRING_PREFIX:
        case RefLangParser.LITERAL_STRING:
          this.enterOuterAlt(localContext, 4);
          {
            this.state = 721;
            this.litString();
          }
          break;
        case RefLangParser.INT_NAME:
        case RefLangParser.FLOAT_NAME:
        case RefLangParser.BOOL_NAME:
        case RefLangParser.STRING_NAME:
        case RefLangParser.LIST_NAME:
        case RefLangParser.NAME_STARTING_UC:
          this.enterOuterAlt(localContext, 5);
          {
            this.state = 722;
            this.enumValue();
          }
          break;
        case RefLangParser.LITERAL_REGEXP:
          this.enterOuterAlt(localContext, 6);
          {
            this.state = 723;
            this.litRegExp();
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
    this.enterRule(localContext, 98, RefLangParser.RULE_litBoolean);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 726;
        _la = this.tokenStream.LA(1);
        if (!(_la === 63 || _la === 64)) {
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
    this.enterRule(localContext, 100, RefLangParser.RULE_litInt);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 728;
        _la = this.tokenStream.LA(1);
        if (!(((_la - 101) & ~0x1f) === 0 && ((1 << (_la - 101)) & 7) !== 0)) {
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
    this.enterRule(localContext, 102, RefLangParser.RULE_litFloat);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 730;
        this.match(RefLangParser.LITERAL_FLOAT);
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
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
    this.enterRule(localContext, 104, RefLangParser.RULE_litString);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 733;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 75) {
          {
            this.state = 732;
            this.match(RefLangParser.INTERPOLATED_STRING_PREFIX);
          }
        }

        this.state = 735;
        this.match(RefLangParser.LITERAL_STRING);
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
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
    this.enterRule(localContext, 106, RefLangParser.RULE_enumValue);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 737;
        this.typeName();
        this.state = 738;
        this.match(RefLangParser.DOT);
        this.state = 739;
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
  public litRegExp(): LitRegExpContext {
    let localContext = new LitRegExpContext(this.context, this.state);
    this.enterRule(localContext, 108, RefLangParser.RULE_litRegExp);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 741;
        this.match(RefLangParser.LITERAL_REGEXP);
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
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
    this.enterRule(localContext, 110, RefLangParser.RULE_index);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 743;
        this.match(RefLangParser.OPEN_SQ_BRACKET);
        this.state = 744;
        this.expression();
        this.state = 745;
        this.match(RefLangParser.CLOSE_SQ_BRACKET);
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
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
    this.enterRule(localContext, 112, RefLangParser.RULE_identifierWithOptIndexes);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 747;
        this.identifier();
        this.state = 751;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (_la === 80) {
          {
            {
              this.state = 748;
              this.index();
            }
          }
          this.state = 753;
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
    this.enterRule(localContext, 114, RefLangParser.RULE_propertyRef);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 754;
        this.match(RefLangParser.THIS_INSTANCE);
        this.state = 755;
        this.match(RefLangParser.DOT);
        this.state = 756;
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
  public expression(): ExpressionContext {
    let localContext = new ExpressionContext(this.context, this.state);
    this.enterRule(localContext, 116, RefLangParser.RULE_expression);
    try {
      this.state = 763;
      this.errorHandler.sync(this);
      switch (this.interpreter.adaptivePredict(this.tokenStream, 77, this.context)) {
        case 1:
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 758;
            this.newInstance();
          }
          break;
        case 2:
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 759;
            this.unaryExpression();
          }
          break;
        case 3:
          this.enterOuterAlt(localContext, 3);
          {
            this.state = 760;
            this.term();
          }
          break;
        case 4:
          this.enterOuterAlt(localContext, 4);
          {
            this.state = 761;
            this.binaryExpression();
          }
          break;
        case 5:
          this.enterOuterAlt(localContext, 5);
          {
            this.state = 762;
            this.ifExpression();
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
  public ifExpression(): IfExpressionContext {
    let localContext = new IfExpressionContext(this.context, this.state);
    this.enterRule(localContext, 118, RefLangParser.RULE_ifExpression);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 765;
        this.match(RefLangParser.IF_);
        this.state = 766;
        this.match(RefLangParser.OPEN_BRACKET);
        this.state = 767;
        this.expression();
        this.state = 768;
        this.match(RefLangParser.COMMA);
        this.state = 769;
        this.expression();
        this.state = 770;
        this.match(RefLangParser.COMMA);
        this.state = 771;
        this.expression();
        this.state = 772;
        this.match(RefLangParser.CLOSE_BRACKET);
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
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
    this.enterRule(localContext, 120, RefLangParser.RULE_term);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 774;
        this.chainHead();
        this.state = 776;
        this.errorHandler.sync(this);
        switch (this.interpreter.adaptivePredict(this.tokenStream, 78, this.context)) {
          case 1:
            {
              this.state = 775;
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
    this.enterRule(localContext, 122, RefLangParser.RULE_chainHead);
    try {
      this.state = 785;
      this.errorHandler.sync(this);
      switch (this.interpreter.adaptivePredict(this.tokenStream, 79, this.context)) {
        case 1:
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 778;
            this.thisInstance();
          }
          break;
        case 2:
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 779;
            this.bracketedExpression();
          }
          break;
        case 3:
          this.enterOuterAlt(localContext, 3);
          {
            this.state = 780;
            this.litValue();
          }
          break;
        case 4:
          this.enterOuterAlt(localContext, 4);
          {
            this.state = 781;
            this.list();
          }
          break;
        case 5:
          this.enterOuterAlt(localContext, 5);
          {
            this.state = 782;
            this.dictionary();
          }
          break;
        case 6:
          this.enterOuterAlt(localContext, 6);
          {
            this.state = 783;
            this.tuple();
          }
          break;
        case 7:
          this.enterOuterAlt(localContext, 7);
          {
            this.state = 784;
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
    this.enterRule(localContext, 124, RefLangParser.RULE_chainTail);
    try {
      let alternative: number;
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 789;
        this.errorHandler.sync(this);
        alternative = 1;
        do {
          switch (alternative) {
            case 1:
              {
                {
                  this.state = 787;
                  this.match(RefLangParser.DOT);
                  this.state = 788;
                  this.chainable();
                }
              }
              break;
            default:
              throw new antlr.NoViableAltException(this);
          }
          this.state = 791;
          this.errorHandler.sync(this);
          alternative = this.interpreter.adaptivePredict(this.tokenStream, 80, this.context);
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
    this.enterRule(localContext, 126, RefLangParser.RULE_chainable);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 795;
        this.errorHandler.sync(this);
        switch (this.interpreter.adaptivePredict(this.tokenStream, 81, this.context)) {
          case 1:
            {
              this.state = 793;
              this.identifier();
            }
            break;
          case 2:
            {
              this.state = 794;
              this.methodCall();
            }
            break;
        }
        this.state = 800;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (_la === 80) {
          {
            {
              this.state = 797;
              this.index();
            }
          }
          this.state = 802;
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
  public thisInstance(): ThisInstanceContext {
    let localContext = new ThisInstanceContext(this.context, this.state);
    this.enterRule(localContext, 128, RefLangParser.RULE_thisInstance);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 803;
        this.match(RefLangParser.THIS_INSTANCE);
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
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
    this.enterRule(localContext, 130, RefLangParser.RULE_bracketedExpression);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 805;
        this.match(RefLangParser.OPEN_BRACKET);
        this.state = 806;
        this.expression();
        this.state = 807;
        this.match(RefLangParser.CLOSE_BRACKET);
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
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
    this.enterRule(localContext, 132, RefLangParser.RULE_unaryExpression);
    try {
      this.state = 811;
      this.errorHandler.sync(this);
      switch (this.tokenStream.LA(1)) {
        case RefLangParser.MINUS:
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 809;
            this.negateNumeric();
          }
          break;
        case RefLangParser.NOT:
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 810;
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
    this.enterRule(localContext, 134, RefLangParser.RULE_negateNumeric);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 813;
        this.match(RefLangParser.MINUS);
        this.state = 814;
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
  public negateLogical(): NegateLogicalContext {
    let localContext = new NegateLogicalContext(this.context, this.state);
    this.enterRule(localContext, 136, RefLangParser.RULE_negateLogical);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 816;
        this.match(RefLangParser.NOT);
        this.state = 817;
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
    this.enterRule(localContext, 138, RefLangParser.RULE_binaryExpression);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 819;
        this.term();
        this.state = 820;
        this.binaryOperator();
        this.state = 821;
        this.expression();
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
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
    this.enterRule(localContext, 140, RefLangParser.RULE_list);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 823;
        this.match(RefLangParser.OPEN_SQ_BRACKET);
        this.state = 824;
        this.expressionList();
        this.state = 825;
        this.match(RefLangParser.CLOSE_SQ_BRACKET);
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
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
    this.enterRule(localContext, 142, RefLangParser.RULE_expressionList);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 827;
        this.expression();
        this.state = 832;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (_la === 85) {
          {
            {
              this.state = 828;
              this.match(RefLangParser.COMMA);
              this.state = 829;
              this.expression();
            }
          }
          this.state = 834;
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
  public tuple(): TupleContext {
    let localContext = new TupleContext(this.context, this.state);
    this.enterRule(localContext, 144, RefLangParser.RULE_tuple);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 835;
        this.match(RefLangParser.OPEN_BRACKET);
        this.state = 836;
        this.tupleElementList();
        this.state = 837;
        this.match(RefLangParser.CLOSE_BRACKET);
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
        this.errorHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localContext;
  }
  public tupleElementList(): TupleElementListContext {
    let localContext = new TupleElementListContext(this.context, this.state);
    this.enterRule(localContext, 146, RefLangParser.RULE_tupleElementList);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 839;
        this.expression();
        this.state = 842;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        do {
          {
            {
              this.state = 840;
              this.match(RefLangParser.COMMA);
              this.state = 841;
              this.expression();
            }
          }
          this.state = 844;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        } while (_la === 85);
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
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
    this.enterRule(localContext, 148, RefLangParser.RULE_dictionary);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 846;
        this.match(RefLangParser.OPEN_SQ_BRACKET);
        this.state = 847;
        this.kvpList();
        this.state = 848;
        this.match(RefLangParser.CLOSE_SQ_BRACKET);
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
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
    this.enterRule(localContext, 150, RefLangParser.RULE_kvpList);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 850;
        this.kvp();
        this.state = 855;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (_la === 85) {
          {
            {
              this.state = 851;
              this.match(RefLangParser.COMMA);
              this.state = 852;
              this.kvp();
            }
          }
          this.state = 857;
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
    this.enterRule(localContext, 152, RefLangParser.RULE_kvp);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 858;
        this.expression();
        this.state = 859;
        this.match(RefLangParser.COLON);
        this.state = 860;
        this.expression();
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
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
    this.enterRule(localContext, 154, RefLangParser.RULE_methodCall);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 862;
        this.methodName();
        this.state = 863;
        this.match(RefLangParser.OPEN_BRACKET);
        this.state = 865;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (
          (((_la - 9) & ~0x1f) === 0 && ((1 << (_la - 9)) & 8388673) !== 0) ||
          (((_la - 57) & ~0x1f) === 0 && ((1 << (_la - 57)) & 2190214367) !== 0) ||
          (((_la - 99) & ~0x1f) === 0 && ((1 << (_la - 99)) & 255) !== 0)
        ) {
          {
            this.state = 864;
            this.argList();
          }
        }

        this.state = 867;
        this.match(RefLangParser.CLOSE_BRACKET);
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
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
    this.enterRule(localContext, 156, RefLangParser.RULE_binaryOperator);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 869;
        _la = this.tokenStream.LA(1);
        if (!(((_la - 65) & ~0x1f) === 0 && ((1 << (_la - 65)) & 1069547579) !== 0)) {
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
    this.enterRule(localContext, 158, RefLangParser.RULE_newInstance);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 871;
        this.match(RefLangParser.NEW);
        this.state = 872;
        this.type_();
        this.state = 873;
        this.match(RefLangParser.OPEN_BRACKET);
        this.state = 875;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (
          (((_la - 9) & ~0x1f) === 0 && ((1 << (_la - 9)) & 8388673) !== 0) ||
          (((_la - 57) & ~0x1f) === 0 && ((1 << (_la - 57)) & 2190214367) !== 0) ||
          (((_la - 99) & ~0x1f) === 0 && ((1 << (_la - 99)) & 255) !== 0)
        ) {
          {
            this.state = 874;
            this.argList();
          }
        }

        this.state = 877;
        this.match(RefLangParser.CLOSE_BRACKET);
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
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
    this.enterRule(localContext, 160, RefLangParser.RULE_paramDef);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 879;
        this.identifier();
        this.state = 880;
        this.match(RefLangParser.AS);
        this.state = 881;
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
    this.enterRule(localContext, 162, RefLangParser.RULE_typeGeneric);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 883;
        this.typeName();
        this.state = 884;
        this.match(RefLangParser.LT);
        this.state = 885;
        this.match(RefLangParser.OF);
        this.state = 886;
        this.type_();
        this.state = 891;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (_la === 85) {
          {
            {
              this.state = 887;
              this.match(RefLangParser.COMMA);
              this.state = 888;
              this.type_();
            }
          }
          this.state = 893;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 894;
        this.match(RefLangParser.GT);
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
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
    this.enterRule(localContext, 164, RefLangParser.RULE_typeFunc);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 896;
        this.match(RefLangParser.FUNC_NAME);
        this.state = 897;
        this.match(RefLangParser.LT);
        this.state = 898;
        this.match(RefLangParser.OF);
        this.state = 899;
        this.type_();
        this.state = 904;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (_la === 85) {
          {
            {
              this.state = 900;
              this.match(RefLangParser.COMMA);
              this.state = 901;
              this.type_();
            }
          }
          this.state = 906;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 907;
        this.match(RefLangParser.ARROW);
        this.state = 908;
        this.type_();
        this.state = 909;
        this.match(RefLangParser.GT);
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
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
    this.enterRule(localContext, 166, RefLangParser.RULE_typeTuple);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 911;
        this.match(RefLangParser.OPEN_BRACKET);
        this.state = 912;
        this.type_();
        this.state = 915;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        do {
          {
            {
              this.state = 913;
              this.match(RefLangParser.COMMA);
              this.state = 914;
              this.type_();
            }
          }
          this.state = 917;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        } while (_la === 85);
        this.state = 919;
        this.match(RefLangParser.CLOSE_BRACKET);
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
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
    this.enterRule(localContext, 168, RefLangParser.RULE_lambda);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 921;
        this.match(RefLangParser.LAMBDA);
        this.state = 924;
        this.errorHandler.sync(this);
        switch (this.interpreter.adaptivePredict(this.tokenStream, 92, this.context)) {
          case 1:
            {
              this.state = 922;
              this.paramsList();
            }
            break;
          case 2:
            {
              this.state = 923;
              this.argList();
            }
            break;
        }
        this.state = 926;
        this.match(RefLangParser.ARROW);
        this.state = 927;
        this.expression();
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
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
    this.enterRule(localContext, 170, RefLangParser.RULE_interpolatedString);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 929;
        this.match(RefLangParser.INTERPOLATED_STRING_PREFIX);
        this.state = 930;
        this.match(RefLangParser.LITERAL_STRING);
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
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
    this.enterRule(localContext, 172, RefLangParser.RULE_power);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 932;
        this.term();
        this.state = 933;
        this.match(RefLangParser.POWER);
        this.state = 934;
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

  public static readonly _serializedATN: number[] = [
    4, 1, 125, 937, 2, 0, 7, 0, 2, 1, 7, 1, 2, 2, 7, 2, 2, 3, 7, 3, 2, 4, 7, 4, 2, 5, 7, 5, 2, 6, 7,
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
    7, 81, 2, 82, 7, 82, 2, 83, 7, 83, 2, 84, 7, 84, 2, 85, 7, 85, 2, 86, 7, 86, 1, 0, 3, 0, 176, 8,
    0, 1, 0, 5, 0, 179, 8, 0, 10, 0, 12, 0, 182, 9, 0, 1, 0, 5, 0, 185, 8, 0, 10, 0, 12, 0, 188, 9,
    0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 1, 201, 8, 1, 1, 2, 3,
    2, 204, 8, 2, 1, 2, 1, 2, 1, 2, 5, 2, 209, 8, 2, 10, 2, 12, 2, 212, 9, 2, 1, 2, 1, 2, 1, 2, 1,
    2, 1, 3, 3, 3, 219, 8, 3, 1, 3, 1, 3, 1, 3, 1, 3, 3, 3, 225, 8, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3,
    1, 3, 5, 3, 233, 8, 3, 10, 3, 12, 3, 236, 9, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 4, 3, 4, 244,
    8, 4, 1, 4, 1, 4, 1, 4, 1, 4, 1, 4, 1, 4, 1, 4, 5, 4, 253, 8, 4, 10, 4, 12, 4, 256, 9, 4, 1, 4,
    1, 4, 1, 4, 1, 4, 1, 5, 3, 5, 263, 8, 5, 1, 5, 1, 5, 1, 5, 1, 5, 3, 5, 269, 8, 5, 1, 5, 1, 5, 1,
    5, 5, 5, 274, 8, 5, 10, 5, 12, 5, 277, 9, 5, 1, 5, 1, 5, 1, 5, 1, 5, 1, 6, 3, 6, 284, 8, 6, 1,
    6, 1, 6, 1, 6, 1, 6, 1, 6, 1, 6, 1, 6, 1, 7, 3, 7, 294, 8, 7, 1, 7, 1, 7, 1, 7, 1, 7, 1, 7, 1,
    8, 3, 8, 302, 8, 8, 1, 8, 1, 8, 1, 8, 1, 8, 3, 8, 308, 8, 8, 1, 8, 1, 8, 1, 8, 1, 8, 1, 8, 1, 8,
    5, 8, 316, 8, 8, 10, 8, 12, 8, 319, 9, 8, 1, 8, 1, 8, 1, 8, 1, 8, 1, 9, 3, 9, 326, 8, 9, 1, 9,
    1, 9, 1, 9, 1, 9, 1, 9, 3, 9, 333, 8, 9, 1, 9, 1, 9, 1, 9, 1, 9, 1, 9, 1, 9, 1, 9, 5, 9, 342, 8,
    9, 10, 9, 12, 9, 345, 9, 9, 1, 9, 1, 9, 1, 9, 1, 9, 1, 10, 1, 10, 1, 10, 1, 11, 1, 11, 1, 12, 1,
    12, 1, 12, 1, 12, 1, 12, 1, 12, 1, 12, 1, 12, 1, 12, 1, 12, 1, 12, 3, 12, 367, 8, 12, 1, 13, 3,
    13, 370, 8, 13, 1, 13, 1, 13, 1, 13, 1, 13, 1, 13, 1, 13, 1, 13, 5, 13, 379, 8, 13, 10, 13, 12,
    13, 382, 9, 13, 1, 13, 1, 13, 1, 13, 1, 13, 1, 14, 3, 14, 389, 8, 14, 1, 14, 1, 14, 1, 14, 1,
    14, 5, 14, 395, 8, 14, 10, 14, 12, 14, 398, 9, 14, 1, 14, 1, 14, 1, 14, 1, 14, 1, 15, 3, 15,
    405, 8, 15, 1, 15, 1, 15, 1, 15, 1, 15, 1, 15, 1, 15, 5, 15, 413, 8, 15, 10, 15, 12, 15, 416, 9,
    15, 1, 15, 1, 15, 1, 15, 1, 15, 1, 16, 3, 16, 423, 8, 16, 1, 16, 1, 16, 1, 16, 5, 16, 428, 8,
    16, 10, 16, 12, 16, 431, 9, 16, 1, 16, 1, 16, 5, 16, 435, 8, 16, 10, 16, 12, 16, 438, 9, 16, 1,
    16, 1, 16, 1, 16, 1, 16, 1, 17, 3, 17, 445, 8, 17, 1, 17, 1, 17, 1, 17, 1, 17, 1, 17, 1, 17, 1,
    17, 1, 18, 3, 18, 455, 8, 18, 1, 18, 1, 18, 1, 18, 1, 18, 1, 18, 1, 18, 1, 19, 3, 19, 464, 8,
    19, 1, 19, 1, 19, 1, 19, 3, 19, 469, 8, 19, 1, 19, 1, 19, 1, 19, 1, 20, 3, 20, 475, 8, 20, 1,
    20, 1, 20, 1, 20, 1, 20, 1, 20, 1, 20, 1, 20, 1, 21, 3, 21, 485, 8, 21, 1, 21, 1, 21, 1, 21, 1,
    21, 1, 21, 1, 21, 1, 22, 3, 22, 494, 8, 22, 1, 22, 1, 22, 1, 22, 1, 22, 1, 22, 1, 22, 1, 22, 1,
    22, 1, 22, 1, 22, 1, 23, 3, 23, 507, 8, 23, 1, 23, 1, 23, 1, 23, 1, 23, 1, 23, 1, 23, 1, 23, 1,
    24, 1, 24, 1, 24, 3, 24, 519, 8, 24, 1, 24, 1, 24, 1, 25, 3, 25, 524, 8, 25, 1, 25, 1, 25, 1,
    25, 1, 25, 1, 25, 1, 26, 1, 26, 1, 26, 1, 26, 1, 27, 3, 27, 536, 8, 27, 1, 27, 1, 27, 1, 27, 1,
    27, 1, 27, 1, 28, 3, 28, 544, 8, 28, 1, 28, 1, 28, 1, 28, 1, 29, 3, 29, 550, 8, 29, 1, 29, 1,
    29, 1, 29, 1, 29, 1, 29, 1, 29, 1, 30, 3, 30, 559, 8, 30, 1, 30, 1, 30, 1, 30, 3, 30, 564, 8,
    30, 1, 30, 1, 30, 1, 30, 5, 30, 569, 8, 30, 10, 30, 12, 30, 572, 9, 30, 1, 30, 1, 30, 1, 30, 1,
    30, 1, 31, 3, 31, 579, 8, 31, 1, 31, 1, 31, 1, 31, 1, 31, 1, 31, 1, 31, 1, 32, 3, 32, 588, 8,
    32, 1, 32, 3, 32, 591, 8, 32, 1, 32, 1, 32, 1, 32, 1, 32, 3, 32, 597, 8, 32, 1, 32, 1, 32, 1,
    32, 1, 32, 1, 32, 1, 32, 5, 32, 605, 8, 32, 10, 32, 12, 32, 608, 9, 32, 1, 32, 1, 32, 1, 32, 1,
    32, 1, 32, 1, 33, 3, 33, 616, 8, 33, 1, 33, 3, 33, 619, 8, 33, 1, 33, 1, 33, 1, 33, 1, 33, 3,
    33, 625, 8, 33, 1, 33, 1, 33, 1, 33, 5, 33, 630, 8, 33, 10, 33, 12, 33, 633, 9, 33, 1, 33, 1,
    33, 1, 33, 1, 33, 1, 34, 3, 34, 640, 8, 34, 1, 34, 1, 34, 1, 34, 1, 34, 1, 34, 3, 34, 647, 8,
    34, 1, 34, 1, 34, 1, 34, 1, 34, 1, 34, 1, 35, 3, 35, 655, 8, 35, 1, 35, 1, 35, 1, 35, 1, 35, 1,
    35, 3, 35, 662, 8, 35, 1, 35, 1, 35, 1, 35, 1, 36, 1, 36, 1, 37, 1, 37, 3, 37, 671, 8, 37, 1,
    38, 1, 38, 1, 39, 1, 39, 1, 40, 1, 40, 1, 41, 1, 41, 3, 41, 681, 8, 41, 1, 42, 1, 42, 1, 42, 5,
    42, 686, 8, 42, 10, 42, 12, 42, 689, 9, 42, 1, 43, 1, 43, 3, 43, 693, 8, 43, 1, 44, 1, 44, 1,
    44, 5, 44, 698, 8, 44, 10, 44, 12, 44, 701, 9, 44, 1, 45, 1, 45, 1, 45, 1, 45, 3, 45, 707, 8,
    45, 1, 46, 1, 46, 1, 46, 5, 46, 712, 8, 46, 10, 46, 12, 46, 715, 9, 46, 1, 47, 1, 47, 1, 48, 1,
    48, 1, 48, 1, 48, 1, 48, 1, 48, 3, 48, 725, 8, 48, 1, 49, 1, 49, 1, 50, 1, 50, 1, 51, 1, 51, 1,
    52, 3, 52, 734, 8, 52, 1, 52, 1, 52, 1, 53, 1, 53, 1, 53, 1, 53, 1, 54, 1, 54, 1, 55, 1, 55, 1,
    55, 1, 55, 1, 56, 1, 56, 5, 56, 750, 8, 56, 10, 56, 12, 56, 753, 9, 56, 1, 57, 1, 57, 1, 57, 1,
    57, 1, 58, 1, 58, 1, 58, 1, 58, 1, 58, 3, 58, 764, 8, 58, 1, 59, 1, 59, 1, 59, 1, 59, 1, 59, 1,
    59, 1, 59, 1, 59, 1, 59, 1, 60, 1, 60, 3, 60, 777, 8, 60, 1, 61, 1, 61, 1, 61, 1, 61, 1, 61, 1,
    61, 1, 61, 3, 61, 786, 8, 61, 1, 62, 1, 62, 4, 62, 790, 8, 62, 11, 62, 12, 62, 791, 1, 63, 1,
    63, 3, 63, 796, 8, 63, 1, 63, 5, 63, 799, 8, 63, 10, 63, 12, 63, 802, 9, 63, 1, 64, 1, 64, 1,
    65, 1, 65, 1, 65, 1, 65, 1, 66, 1, 66, 3, 66, 812, 8, 66, 1, 67, 1, 67, 1, 67, 1, 68, 1, 68, 1,
    68, 1, 69, 1, 69, 1, 69, 1, 69, 1, 70, 1, 70, 1, 70, 1, 70, 1, 71, 1, 71, 1, 71, 5, 71, 831, 8,
    71, 10, 71, 12, 71, 834, 9, 71, 1, 72, 1, 72, 1, 72, 1, 72, 1, 73, 1, 73, 1, 73, 4, 73, 843, 8,
    73, 11, 73, 12, 73, 844, 1, 74, 1, 74, 1, 74, 1, 74, 1, 75, 1, 75, 1, 75, 5, 75, 854, 8, 75, 10,
    75, 12, 75, 857, 9, 75, 1, 76, 1, 76, 1, 76, 1, 76, 1, 77, 1, 77, 1, 77, 3, 77, 866, 8, 77, 1,
    77, 1, 77, 1, 78, 1, 78, 1, 79, 1, 79, 1, 79, 1, 79, 3, 79, 876, 8, 79, 1, 79, 1, 79, 1, 80, 1,
    80, 1, 80, 1, 80, 1, 81, 1, 81, 1, 81, 1, 81, 1, 81, 1, 81, 5, 81, 890, 8, 81, 10, 81, 12, 81,
    893, 9, 81, 1, 81, 1, 81, 1, 82, 1, 82, 1, 82, 1, 82, 1, 82, 1, 82, 5, 82, 903, 8, 82, 10, 82,
    12, 82, 906, 9, 82, 1, 82, 1, 82, 1, 82, 1, 82, 1, 83, 1, 83, 1, 83, 1, 83, 4, 83, 916, 8, 83,
    11, 83, 12, 83, 917, 1, 83, 1, 83, 1, 84, 1, 84, 1, 84, 3, 84, 925, 8, 84, 1, 84, 1, 84, 1, 84,
    1, 85, 1, 85, 1, 85, 1, 86, 1, 86, 1, 86, 1, 86, 1, 86, 0, 0, 87, 0, 2, 4, 6, 8, 10, 12, 14, 16,
    18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40, 42, 44, 46, 48, 50, 52, 54, 56, 58, 60, 62, 64,
    66, 68, 70, 72, 74, 76, 78, 80, 82, 84, 86, 88, 90, 92, 94, 96, 98, 100, 102, 104, 106, 108,
    110, 112, 114, 116, 118, 120, 122, 124, 126, 128, 130, 132, 134, 136, 138, 140, 142, 144, 146,
    148, 150, 152, 154, 156, 158, 160, 162, 164, 166, 168, 170, 172, 0, 4, 2, 0, 57, 61, 100, 100,
    1, 0, 63, 64, 1, 0, 101, 103, 3, 0, 65, 66, 68, 70, 87, 94, 982, 0, 175, 1, 0, 0, 0, 2, 200, 1,
    0, 0, 0, 4, 203, 1, 0, 0, 0, 6, 218, 1, 0, 0, 0, 8, 243, 1, 0, 0, 0, 10, 262, 1, 0, 0, 0, 12,
    283, 1, 0, 0, 0, 14, 293, 1, 0, 0, 0, 16, 301, 1, 0, 0, 0, 18, 325, 1, 0, 0, 0, 20, 350, 1, 0,
    0, 0, 22, 353, 1, 0, 0, 0, 24, 366, 1, 0, 0, 0, 26, 369, 1, 0, 0, 0, 28, 388, 1, 0, 0, 0, 30,
    404, 1, 0, 0, 0, 32, 422, 1, 0, 0, 0, 34, 444, 1, 0, 0, 0, 36, 454, 1, 0, 0, 0, 38, 463, 1, 0,
    0, 0, 40, 474, 1, 0, 0, 0, 42, 484, 1, 0, 0, 0, 44, 493, 1, 0, 0, 0, 46, 506, 1, 0, 0, 0, 48,
    518, 1, 0, 0, 0, 50, 523, 1, 0, 0, 0, 52, 530, 1, 0, 0, 0, 54, 535, 1, 0, 0, 0, 56, 543, 1, 0,
    0, 0, 58, 549, 1, 0, 0, 0, 60, 558, 1, 0, 0, 0, 62, 578, 1, 0, 0, 0, 64, 587, 1, 0, 0, 0, 66,
    615, 1, 0, 0, 0, 68, 639, 1, 0, 0, 0, 70, 654, 1, 0, 0, 0, 72, 666, 1, 0, 0, 0, 74, 670, 1, 0,
    0, 0, 76, 672, 1, 0, 0, 0, 78, 674, 1, 0, 0, 0, 80, 676, 1, 0, 0, 0, 82, 680, 1, 0, 0, 0, 84,
    682, 1, 0, 0, 0, 86, 692, 1, 0, 0, 0, 88, 694, 1, 0, 0, 0, 90, 706, 1, 0, 0, 0, 92, 708, 1, 0,
    0, 0, 94, 716, 1, 0, 0, 0, 96, 724, 1, 0, 0, 0, 98, 726, 1, 0, 0, 0, 100, 728, 1, 0, 0, 0, 102,
    730, 1, 0, 0, 0, 104, 733, 1, 0, 0, 0, 106, 737, 1, 0, 0, 0, 108, 741, 1, 0, 0, 0, 110, 743, 1,
    0, 0, 0, 112, 747, 1, 0, 0, 0, 114, 754, 1, 0, 0, 0, 116, 763, 1, 0, 0, 0, 118, 765, 1, 0, 0, 0,
    120, 774, 1, 0, 0, 0, 122, 785, 1, 0, 0, 0, 124, 789, 1, 0, 0, 0, 126, 795, 1, 0, 0, 0, 128,
    803, 1, 0, 0, 0, 130, 805, 1, 0, 0, 0, 132, 811, 1, 0, 0, 0, 134, 813, 1, 0, 0, 0, 136, 816, 1,
    0, 0, 0, 138, 819, 1, 0, 0, 0, 140, 823, 1, 0, 0, 0, 142, 827, 1, 0, 0, 0, 144, 835, 1, 0, 0, 0,
    146, 839, 1, 0, 0, 0, 148, 846, 1, 0, 0, 0, 150, 850, 1, 0, 0, 0, 152, 858, 1, 0, 0, 0, 154,
    862, 1, 0, 0, 0, 156, 869, 1, 0, 0, 0, 158, 871, 1, 0, 0, 0, 160, 879, 1, 0, 0, 0, 162, 883, 1,
    0, 0, 0, 164, 896, 1, 0, 0, 0, 166, 911, 1, 0, 0, 0, 168, 921, 1, 0, 0, 0, 170, 929, 1, 0, 0, 0,
    172, 932, 1, 0, 0, 0, 174, 176, 3, 20, 10, 0, 175, 174, 1, 0, 0, 0, 175, 176, 1, 0, 0, 0, 176,
    180, 1, 0, 0, 0, 177, 179, 3, 2, 1, 0, 178, 177, 1, 0, 0, 0, 179, 182, 1, 0, 0, 0, 180, 178, 1,
    0, 0, 0, 180, 181, 1, 0, 0, 0, 181, 186, 1, 0, 0, 0, 182, 180, 1, 0, 0, 0, 183, 185, 5, 97, 0,
    0, 184, 183, 1, 0, 0, 0, 185, 188, 1, 0, 0, 0, 186, 184, 1, 0, 0, 0, 186, 187, 1, 0, 0, 0, 187,
    189, 1, 0, 0, 0, 188, 186, 1, 0, 0, 0, 189, 190, 5, 0, 0, 1, 190, 1, 1, 0, 0, 0, 191, 201, 3, 4,
    2, 0, 192, 201, 3, 6, 3, 0, 193, 201, 3, 8, 4, 0, 194, 201, 3, 10, 5, 0, 195, 201, 3, 12, 6, 0,
    196, 201, 3, 14, 7, 0, 197, 201, 3, 16, 8, 0, 198, 201, 3, 18, 9, 0, 199, 201, 3, 20, 10, 0,
    200, 191, 1, 0, 0, 0, 200, 192, 1, 0, 0, 0, 200, 193, 1, 0, 0, 0, 200, 194, 1, 0, 0, 0, 200,
    195, 1, 0, 0, 0, 200, 196, 1, 0, 0, 0, 200, 197, 1, 0, 0, 0, 200, 198, 1, 0, 0, 0, 200, 199, 1,
    0, 0, 0, 201, 3, 1, 0, 0, 0, 202, 204, 5, 109, 0, 0, 203, 202, 1, 0, 0, 0, 203, 204, 1, 0, 0, 0,
    204, 205, 1, 0, 0, 0, 205, 206, 5, 10, 0, 0, 206, 210, 5, 97, 0, 0, 207, 209, 3, 24, 12, 0, 208,
    207, 1, 0, 0, 0, 209, 212, 1, 0, 0, 0, 210, 208, 1, 0, 0, 0, 210, 211, 1, 0, 0, 0, 211, 213, 1,
    0, 0, 0, 212, 210, 1, 0, 0, 0, 213, 214, 5, 26, 0, 0, 214, 215, 5, 10, 0, 0, 215, 216, 5, 97, 0,
    0, 216, 5, 1, 0, 0, 0, 217, 219, 5, 109, 0, 0, 218, 217, 1, 0, 0, 0, 218, 219, 1, 0, 0, 0, 219,
    220, 1, 0, 0, 0, 220, 221, 5, 29, 0, 0, 221, 222, 3, 76, 38, 0, 222, 224, 5, 82, 0, 0, 223, 225,
    3, 88, 44, 0, 224, 223, 1, 0, 0, 0, 224, 225, 1, 0, 0, 0, 225, 226, 1, 0, 0, 0, 226, 227, 5, 83,
    0, 0, 227, 228, 5, 37, 0, 0, 228, 229, 3, 90, 45, 0, 229, 234, 5, 97, 0, 0, 230, 233, 3, 36, 18,
    0, 231, 233, 3, 24, 12, 0, 232, 230, 1, 0, 0, 0, 232, 231, 1, 0, 0, 0, 233, 236, 1, 0, 0, 0,
    234, 232, 1, 0, 0, 0, 234, 235, 1, 0, 0, 0, 235, 237, 1, 0, 0, 0, 236, 234, 1, 0, 0, 0, 237,
    238, 3, 52, 26, 0, 238, 239, 5, 26, 0, 0, 239, 240, 5, 29, 0, 0, 240, 241, 5, 97, 0, 0, 241, 7,
    1, 0, 0, 0, 242, 244, 5, 109, 0, 0, 243, 242, 1, 0, 0, 0, 243, 244, 1, 0, 0, 0, 244, 245, 1, 0,
    0, 0, 245, 246, 5, 40, 0, 0, 246, 247, 3, 78, 39, 0, 247, 254, 5, 97, 0, 0, 248, 253, 3, 34, 17,
    0, 249, 253, 3, 36, 18, 0, 250, 253, 3, 40, 20, 0, 251, 253, 3, 20, 10, 0, 252, 248, 1, 0, 0, 0,
    252, 249, 1, 0, 0, 0, 252, 250, 1, 0, 0, 0, 252, 251, 1, 0, 0, 0, 253, 256, 1, 0, 0, 0, 254,
    252, 1, 0, 0, 0, 254, 255, 1, 0, 0, 0, 255, 257, 1, 0, 0, 0, 256, 254, 1, 0, 0, 0, 257, 258, 5,
    26, 0, 0, 258, 259, 5, 40, 0, 0, 259, 260, 5, 97, 0, 0, 260, 9, 1, 0, 0, 0, 261, 263, 5, 109, 0,
    0, 262, 261, 1, 0, 0, 0, 262, 263, 1, 0, 0, 0, 263, 264, 1, 0, 0, 0, 264, 265, 5, 35, 0, 0, 265,
    266, 3, 76, 38, 0, 266, 268, 5, 82, 0, 0, 267, 269, 3, 88, 44, 0, 268, 267, 1, 0, 0, 0, 268,
    269, 1, 0, 0, 0, 269, 270, 1, 0, 0, 0, 270, 271, 5, 83, 0, 0, 271, 275, 5, 97, 0, 0, 272, 274,
    3, 24, 12, 0, 273, 272, 1, 0, 0, 0, 274, 277, 1, 0, 0, 0, 275, 273, 1, 0, 0, 0, 275, 276, 1, 0,
    0, 0, 276, 278, 1, 0, 0, 0, 277, 275, 1, 0, 0, 0, 278, 279, 5, 26, 0, 0, 279, 280, 5, 35, 0, 0,
    280, 281, 5, 97, 0, 0, 281, 11, 1, 0, 0, 0, 282, 284, 5, 109, 0, 0, 283, 282, 1, 0, 0, 0, 283,
    284, 1, 0, 0, 0, 284, 285, 1, 0, 0, 0, 285, 286, 5, 22, 0, 0, 286, 287, 3, 72, 36, 0, 287, 288,
    5, 38, 0, 0, 288, 289, 5, 43, 0, 0, 289, 290, 3, 82, 41, 0, 290, 291, 5, 97, 0, 0, 291, 13, 1,
    0, 0, 0, 292, 294, 5, 109, 0, 0, 293, 292, 1, 0, 0, 0, 293, 294, 1, 0, 0, 0, 294, 295, 1, 0, 0,
    0, 295, 296, 5, 4, 0, 0, 296, 297, 3, 80, 40, 0, 297, 298, 3, 92, 46, 0, 298, 299, 5, 97, 0, 0,
    299, 15, 1, 0, 0, 0, 300, 302, 5, 109, 0, 0, 301, 300, 1, 0, 0, 0, 301, 302, 1, 0, 0, 0, 302,
    303, 1, 0, 0, 0, 303, 304, 5, 1, 0, 0, 304, 307, 3, 80, 40, 0, 305, 306, 5, 30, 0, 0, 306, 308,
    3, 80, 40, 0, 307, 305, 1, 0, 0, 0, 307, 308, 1, 0, 0, 0, 308, 309, 1, 0, 0, 0, 309, 317, 5, 97,
    0, 0, 310, 316, 3, 60, 30, 0, 311, 316, 3, 62, 31, 0, 312, 316, 3, 64, 32, 0, 313, 316, 3, 66,
    33, 0, 314, 316, 3, 20, 10, 0, 315, 310, 1, 0, 0, 0, 315, 311, 1, 0, 0, 0, 315, 312, 1, 0, 0, 0,
    315, 313, 1, 0, 0, 0, 315, 314, 1, 0, 0, 0, 316, 319, 1, 0, 0, 0, 317, 315, 1, 0, 0, 0, 317,
    318, 1, 0, 0, 0, 318, 320, 1, 0, 0, 0, 319, 317, 1, 0, 0, 0, 320, 321, 5, 26, 0, 0, 321, 322, 5,
    1, 0, 0, 322, 323, 5, 97, 0, 0, 323, 17, 1, 0, 0, 0, 324, 326, 5, 109, 0, 0, 325, 324, 1, 0, 0,
    0, 325, 326, 1, 0, 0, 0, 326, 327, 1, 0, 0, 0, 327, 328, 5, 16, 0, 0, 328, 329, 5, 1, 0, 0, 329,
    332, 3, 80, 40, 0, 330, 331, 5, 30, 0, 0, 331, 333, 3, 80, 40, 0, 332, 330, 1, 0, 0, 0, 332,
    333, 1, 0, 0, 0, 333, 334, 1, 0, 0, 0, 334, 343, 5, 97, 0, 0, 335, 342, 3, 62, 31, 0, 336, 342,
    3, 64, 32, 0, 337, 342, 3, 66, 33, 0, 338, 342, 3, 68, 34, 0, 339, 342, 3, 70, 35, 0, 340, 342,
    3, 20, 10, 0, 341, 335, 1, 0, 0, 0, 341, 336, 1, 0, 0, 0, 341, 337, 1, 0, 0, 0, 341, 338, 1, 0,
    0, 0, 341, 339, 1, 0, 0, 0, 341, 340, 1, 0, 0, 0, 342, 345, 1, 0, 0, 0, 343, 341, 1, 0, 0, 0,
    343, 344, 1, 0, 0, 0, 344, 346, 1, 0, 0, 0, 345, 343, 1, 0, 0, 0, 346, 347, 5, 26, 0, 0, 347,
    348, 5, 1, 0, 0, 348, 349, 5, 97, 0, 0, 349, 19, 1, 0, 0, 0, 350, 351, 3, 22, 11, 0, 351, 352,
    5, 97, 0, 0, 352, 21, 1, 0, 0, 0, 353, 354, 5, 125, 0, 0, 354, 23, 1, 0, 0, 0, 355, 367, 3, 38,
    19, 0, 356, 367, 3, 40, 20, 0, 357, 367, 3, 42, 21, 0, 358, 367, 3, 44, 22, 0, 359, 367, 3, 26,
    13, 0, 360, 367, 3, 28, 14, 0, 361, 367, 3, 30, 15, 0, 362, 367, 3, 46, 23, 0, 363, 367, 3, 32,
    16, 0, 364, 367, 3, 50, 25, 0, 365, 367, 3, 20, 10, 0, 366, 355, 1, 0, 0, 0, 366, 356, 1, 0, 0,
    0, 366, 357, 1, 0, 0, 0, 366, 358, 1, 0, 0, 0, 366, 359, 1, 0, 0, 0, 366, 360, 1, 0, 0, 0, 366,
    361, 1, 0, 0, 0, 366, 362, 1, 0, 0, 0, 366, 363, 1, 0, 0, 0, 366, 364, 1, 0, 0, 0, 366, 365, 1,
    0, 0, 0, 367, 25, 1, 0, 0, 0, 368, 370, 5, 109, 0, 0, 369, 368, 1, 0, 0, 0, 369, 370, 1, 0, 0,
    0, 370, 371, 1, 0, 0, 0, 371, 372, 5, 6, 0, 0, 372, 373, 3, 116, 58, 0, 373, 374, 5, 41, 0, 0,
    374, 380, 5, 97, 0, 0, 375, 379, 3, 54, 27, 0, 376, 379, 3, 56, 28, 0, 377, 379, 3, 24, 12, 0,
    378, 375, 1, 0, 0, 0, 378, 376, 1, 0, 0, 0, 378, 377, 1, 0, 0, 0, 379, 382, 1, 0, 0, 0, 380,
    378, 1, 0, 0, 0, 380, 381, 1, 0, 0, 0, 381, 383, 1, 0, 0, 0, 382, 380, 1, 0, 0, 0, 383, 384, 5,
    26, 0, 0, 384, 385, 5, 6, 0, 0, 385, 386, 5, 97, 0, 0, 386, 27, 1, 0, 0, 0, 387, 389, 5, 109, 0,
    0, 388, 387, 1, 0, 0, 0, 388, 389, 1, 0, 0, 0, 389, 390, 1, 0, 0, 0, 390, 391, 5, 14, 0, 0, 391,
    392, 3, 116, 58, 0, 392, 396, 5, 97, 0, 0, 393, 395, 3, 24, 12, 0, 394, 393, 1, 0, 0, 0, 395,
    398, 1, 0, 0, 0, 396, 394, 1, 0, 0, 0, 396, 397, 1, 0, 0, 0, 397, 399, 1, 0, 0, 0, 398, 396, 1,
    0, 0, 0, 399, 400, 5, 26, 0, 0, 400, 401, 5, 14, 0, 0, 401, 402, 5, 97, 0, 0, 402, 29, 1, 0, 0,
    0, 403, 405, 5, 109, 0, 0, 404, 403, 1, 0, 0, 0, 404, 405, 1, 0, 0, 0, 405, 406, 1, 0, 0, 0,
    406, 407, 5, 5, 0, 0, 407, 408, 3, 72, 36, 0, 408, 409, 5, 7, 0, 0, 409, 410, 3, 116, 58, 0,
    410, 414, 5, 97, 0, 0, 411, 413, 3, 24, 12, 0, 412, 411, 1, 0, 0, 0, 413, 416, 1, 0, 0, 0, 414,
    412, 1, 0, 0, 0, 414, 415, 1, 0, 0, 0, 415, 417, 1, 0, 0, 0, 416, 414, 1, 0, 0, 0, 417, 418, 5,
    26, 0, 0, 418, 419, 5, 5, 0, 0, 419, 420, 5, 97, 0, 0, 420, 31, 1, 0, 0, 0, 421, 423, 5, 109, 0,
    0, 422, 421, 1, 0, 0, 0, 422, 423, 1, 0, 0, 0, 423, 424, 1, 0, 0, 0, 424, 425, 5, 13, 0, 0, 425,
    429, 5, 97, 0, 0, 426, 428, 3, 24, 12, 0, 427, 426, 1, 0, 0, 0, 428, 431, 1, 0, 0, 0, 429, 427,
    1, 0, 0, 0, 429, 430, 1, 0, 0, 0, 430, 432, 1, 0, 0, 0, 431, 429, 1, 0, 0, 0, 432, 436, 3, 58,
    29, 0, 433, 435, 3, 24, 12, 0, 434, 433, 1, 0, 0, 0, 435, 438, 1, 0, 0, 0, 436, 434, 1, 0, 0, 0,
    436, 437, 1, 0, 0, 0, 437, 439, 1, 0, 0, 0, 438, 436, 1, 0, 0, 0, 439, 440, 5, 26, 0, 0, 440,
    441, 5, 13, 0, 0, 441, 442, 5, 97, 0, 0, 442, 33, 1, 0, 0, 0, 443, 445, 5, 109, 0, 0, 444, 443,
    1, 0, 0, 0, 444, 445, 1, 0, 0, 0, 445, 446, 1, 0, 0, 0, 446, 447, 5, 17, 0, 0, 447, 448, 3, 94,
    47, 0, 448, 449, 5, 27, 0, 0, 449, 450, 5, 43, 0, 0, 450, 451, 3, 116, 58, 0, 451, 452, 5, 97,
    0, 0, 452, 35, 1, 0, 0, 0, 453, 455, 5, 109, 0, 0, 454, 453, 1, 0, 0, 0, 454, 455, 1, 0, 0, 0,
    455, 456, 1, 0, 0, 0, 456, 457, 5, 31, 0, 0, 457, 458, 3, 72, 36, 0, 458, 459, 5, 19, 0, 0, 459,
    460, 3, 116, 58, 0, 460, 461, 5, 97, 0, 0, 461, 37, 1, 0, 0, 0, 462, 464, 5, 109, 0, 0, 463,
    462, 1, 0, 0, 0, 463, 464, 1, 0, 0, 0, 464, 465, 1, 0, 0, 0, 465, 466, 5, 11, 0, 0, 466, 468, 5,
    82, 0, 0, 467, 469, 3, 116, 58, 0, 468, 467, 1, 0, 0, 0, 468, 469, 1, 0, 0, 0, 469, 470, 1, 0,
    0, 0, 470, 471, 5, 83, 0, 0, 471, 472, 5, 97, 0, 0, 472, 39, 1, 0, 0, 0, 473, 475, 5, 109, 0, 0,
    474, 473, 1, 0, 0, 0, 474, 475, 1, 0, 0, 0, 475, 476, 1, 0, 0, 0, 476, 477, 5, 44, 0, 0, 477,
    478, 3, 72, 36, 0, 478, 479, 5, 38, 0, 0, 479, 480, 5, 43, 0, 0, 480, 481, 3, 116, 58, 0, 481,
    482, 5, 97, 0, 0, 482, 41, 1, 0, 0, 0, 483, 485, 5, 109, 0, 0, 484, 483, 1, 0, 0, 0, 484, 485,
    1, 0, 0, 0, 485, 486, 1, 0, 0, 0, 486, 487, 5, 18, 0, 0, 487, 488, 3, 74, 37, 0, 488, 489, 5,
    43, 0, 0, 489, 490, 3, 116, 58, 0, 490, 491, 5, 97, 0, 0, 491, 43, 1, 0, 0, 0, 492, 494, 5, 109,
    0, 0, 493, 492, 1, 0, 0, 0, 493, 494, 1, 0, 0, 0, 494, 495, 1, 0, 0, 0, 495, 496, 5, 8, 0, 0,
    496, 497, 3, 72, 36, 0, 497, 498, 5, 38, 0, 0, 498, 499, 5, 43, 0, 0, 499, 500, 3, 76, 38, 0,
    500, 501, 5, 82, 0, 0, 501, 502, 3, 116, 58, 0, 502, 503, 5, 83, 0, 0, 503, 504, 5, 97, 0, 0,
    504, 45, 1, 0, 0, 0, 505, 507, 5, 109, 0, 0, 506, 505, 1, 0, 0, 0, 506, 507, 1, 0, 0, 0, 507,
    508, 1, 0, 0, 0, 508, 509, 5, 20, 0, 0, 509, 510, 3, 48, 24, 0, 510, 511, 5, 82, 0, 0, 511, 512,
    3, 84, 42, 0, 512, 513, 5, 83, 0, 0, 513, 514, 5, 97, 0, 0, 514, 47, 1, 0, 0, 0, 515, 516, 3,
    120, 60, 0, 516, 517, 5, 84, 0, 0, 517, 519, 1, 0, 0, 0, 518, 515, 1, 0, 0, 0, 518, 519, 1, 0,
    0, 0, 519, 520, 1, 0, 0, 0, 520, 521, 3, 76, 38, 0, 521, 49, 1, 0, 0, 0, 522, 524, 5, 109, 0, 0,
    523, 522, 1, 0, 0, 0, 523, 524, 1, 0, 0, 0, 524, 525, 1, 0, 0, 0, 525, 526, 5, 42, 0, 0, 526,
    527, 3, 80, 40, 0, 527, 528, 3, 104, 52, 0, 528, 529, 5, 97, 0, 0, 529, 51, 1, 0, 0, 0, 530,
    531, 5, 12, 0, 0, 531, 532, 3, 116, 58, 0, 532, 533, 5, 97, 0, 0, 533, 53, 1, 0, 0, 0, 534, 536,
    5, 109, 0, 0, 535, 534, 1, 0, 0, 0, 535, 536, 1, 0, 0, 0, 536, 537, 1, 0, 0, 0, 537, 538, 5, 2,
    0, 0, 538, 539, 3, 116, 58, 0, 539, 540, 5, 41, 0, 0, 540, 541, 5, 97, 0, 0, 541, 55, 1, 0, 0,
    0, 542, 544, 5, 109, 0, 0, 543, 542, 1, 0, 0, 0, 543, 544, 1, 0, 0, 0, 544, 545, 1, 0, 0, 0,
    545, 546, 5, 3, 0, 0, 546, 547, 5, 97, 0, 0, 547, 57, 1, 0, 0, 0, 548, 550, 5, 109, 0, 0, 549,
    548, 1, 0, 0, 0, 549, 550, 1, 0, 0, 0, 550, 551, 1, 0, 0, 0, 551, 552, 5, 21, 0, 0, 552, 553, 3,
    72, 36, 0, 553, 554, 5, 47, 0, 0, 554, 555, 3, 80, 40, 0, 555, 556, 5, 97, 0, 0, 556, 59, 1, 0,
    0, 0, 557, 559, 5, 109, 0, 0, 558, 557, 1, 0, 0, 0, 558, 559, 1, 0, 0, 0, 559, 560, 1, 0, 0, 0,
    560, 561, 5, 23, 0, 0, 561, 563, 5, 82, 0, 0, 562, 564, 3, 88, 44, 0, 563, 562, 1, 0, 0, 0, 563,
    564, 1, 0, 0, 0, 564, 565, 1, 0, 0, 0, 565, 566, 5, 83, 0, 0, 566, 570, 5, 97, 0, 0, 567, 569,
    3, 24, 12, 0, 568, 567, 1, 0, 0, 0, 569, 572, 1, 0, 0, 0, 570, 568, 1, 0, 0, 0, 570, 571, 1, 0,
    0, 0, 571, 573, 1, 0, 0, 0, 572, 570, 1, 0, 0, 0, 573, 574, 5, 26, 0, 0, 574, 575, 5, 23, 0, 0,
    575, 576, 5, 97, 0, 0, 576, 61, 1, 0, 0, 0, 577, 579, 5, 34, 0, 0, 578, 577, 1, 0, 0, 0, 578,
    579, 1, 0, 0, 0, 579, 580, 1, 0, 0, 0, 580, 581, 5, 36, 0, 0, 581, 582, 3, 72, 36, 0, 582, 583,
    5, 47, 0, 0, 583, 584, 3, 90, 45, 0, 584, 585, 5, 97, 0, 0, 585, 63, 1, 0, 0, 0, 586, 588, 5,
    109, 0, 0, 587, 586, 1, 0, 0, 0, 587, 588, 1, 0, 0, 0, 588, 590, 1, 0, 0, 0, 589, 591, 5, 34, 0,
    0, 590, 589, 1, 0, 0, 0, 590, 591, 1, 0, 0, 0, 591, 592, 1, 0, 0, 0, 592, 593, 5, 29, 0, 0, 593,
    594, 3, 76, 38, 0, 594, 596, 5, 82, 0, 0, 595, 597, 3, 88, 44, 0, 596, 595, 1, 0, 0, 0, 596,
    597, 1, 0, 0, 0, 597, 598, 1, 0, 0, 0, 598, 599, 5, 83, 0, 0, 599, 600, 5, 37, 0, 0, 600, 601,
    3, 90, 45, 0, 601, 606, 5, 97, 0, 0, 602, 605, 3, 36, 18, 0, 603, 605, 3, 24, 12, 0, 604, 602,
    1, 0, 0, 0, 604, 603, 1, 0, 0, 0, 605, 608, 1, 0, 0, 0, 606, 604, 1, 0, 0, 0, 606, 607, 1, 0, 0,
    0, 607, 609, 1, 0, 0, 0, 608, 606, 1, 0, 0, 0, 609, 610, 3, 52, 26, 0, 610, 611, 5, 26, 0, 0,
    611, 612, 5, 29, 0, 0, 612, 613, 5, 97, 0, 0, 613, 65, 1, 0, 0, 0, 614, 616, 5, 109, 0, 0, 615,
    614, 1, 0, 0, 0, 615, 616, 1, 0, 0, 0, 616, 618, 1, 0, 0, 0, 617, 619, 5, 34, 0, 0, 618, 617, 1,
    0, 0, 0, 618, 619, 1, 0, 0, 0, 619, 620, 1, 0, 0, 0, 620, 621, 5, 35, 0, 0, 621, 622, 3, 76, 38,
    0, 622, 624, 5, 82, 0, 0, 623, 625, 3, 88, 44, 0, 624, 623, 1, 0, 0, 0, 624, 625, 1, 0, 0, 0,
    625, 626, 1, 0, 0, 0, 626, 627, 5, 83, 0, 0, 627, 631, 5, 97, 0, 0, 628, 630, 3, 24, 12, 0, 629,
    628, 1, 0, 0, 0, 630, 633, 1, 0, 0, 0, 631, 629, 1, 0, 0, 0, 631, 632, 1, 0, 0, 0, 632, 634, 1,
    0, 0, 0, 633, 631, 1, 0, 0, 0, 634, 635, 5, 26, 0, 0, 635, 636, 5, 35, 0, 0, 636, 637, 5, 97, 0,
    0, 637, 67, 1, 0, 0, 0, 638, 640, 5, 109, 0, 0, 639, 638, 1, 0, 0, 0, 639, 640, 1, 0, 0, 0, 640,
    641, 1, 0, 0, 0, 641, 642, 5, 16, 0, 0, 642, 643, 5, 29, 0, 0, 643, 644, 3, 76, 38, 0, 644, 646,
    5, 82, 0, 0, 645, 647, 3, 88, 44, 0, 646, 645, 1, 0, 0, 0, 646, 647, 1, 0, 0, 0, 647, 648, 1, 0,
    0, 0, 648, 649, 5, 83, 0, 0, 649, 650, 5, 37, 0, 0, 650, 651, 3, 90, 45, 0, 651, 652, 5, 97, 0,
    0, 652, 69, 1, 0, 0, 0, 653, 655, 5, 109, 0, 0, 654, 653, 1, 0, 0, 0, 654, 655, 1, 0, 0, 0, 655,
    656, 1, 0, 0, 0, 656, 657, 5, 16, 0, 0, 657, 658, 5, 35, 0, 0, 658, 659, 3, 76, 38, 0, 659, 661,
    5, 82, 0, 0, 660, 662, 3, 88, 44, 0, 661, 660, 1, 0, 0, 0, 661, 662, 1, 0, 0, 0, 662, 663, 1, 0,
    0, 0, 663, 664, 5, 83, 0, 0, 664, 665, 5, 97, 0, 0, 665, 71, 1, 0, 0, 0, 666, 667, 5, 99, 0, 0,
    667, 73, 1, 0, 0, 0, 668, 671, 3, 112, 56, 0, 669, 671, 3, 114, 57, 0, 670, 668, 1, 0, 0, 0,
    670, 669, 1, 0, 0, 0, 671, 75, 1, 0, 0, 0, 672, 673, 5, 99, 0, 0, 673, 77, 1, 0, 0, 0, 674, 675,
    5, 98, 0, 0, 675, 79, 1, 0, 0, 0, 676, 677, 7, 0, 0, 0, 677, 81, 1, 0, 0, 0, 678, 681, 3, 96,
    48, 0, 679, 681, 3, 72, 36, 0, 680, 678, 1, 0, 0, 0, 680, 679, 1, 0, 0, 0, 681, 83, 1, 0, 0, 0,
    682, 687, 3, 86, 43, 0, 683, 684, 5, 85, 0, 0, 684, 686, 3, 86, 43, 0, 685, 683, 1, 0, 0, 0,
    686, 689, 1, 0, 0, 0, 687, 685, 1, 0, 0, 0, 687, 688, 1, 0, 0, 0, 688, 85, 1, 0, 0, 0, 689, 687,
    1, 0, 0, 0, 690, 693, 3, 168, 84, 0, 691, 693, 3, 116, 58, 0, 692, 690, 1, 0, 0, 0, 692, 691, 1,
    0, 0, 0, 693, 87, 1, 0, 0, 0, 694, 699, 3, 160, 80, 0, 695, 696, 5, 85, 0, 0, 696, 698, 3, 160,
    80, 0, 697, 695, 1, 0, 0, 0, 698, 701, 1, 0, 0, 0, 699, 697, 1, 0, 0, 0, 699, 700, 1, 0, 0, 0,
    700, 89, 1, 0, 0, 0, 701, 699, 1, 0, 0, 0, 702, 707, 3, 166, 83, 0, 703, 707, 3, 80, 40, 0, 704,
    707, 3, 162, 81, 0, 705, 707, 3, 164, 82, 0, 706, 702, 1, 0, 0, 0, 706, 703, 1, 0, 0, 0, 706,
    704, 1, 0, 0, 0, 706, 705, 1, 0, 0, 0, 707, 91, 1, 0, 0, 0, 708, 713, 3, 72, 36, 0, 709, 710, 5,
    85, 0, 0, 710, 712, 3, 72, 36, 0, 711, 709, 1, 0, 0, 0, 712, 715, 1, 0, 0, 0, 713, 711, 1, 0, 0,
    0, 713, 714, 1, 0, 0, 0, 714, 93, 1, 0, 0, 0, 715, 713, 1, 0, 0, 0, 716, 717, 3, 116, 58, 0,
    717, 95, 1, 0, 0, 0, 718, 725, 3, 98, 49, 0, 719, 725, 3, 100, 50, 0, 720, 725, 3, 102, 51, 0,
    721, 725, 3, 104, 52, 0, 722, 725, 3, 106, 53, 0, 723, 725, 3, 108, 54, 0, 724, 718, 1, 0, 0, 0,
    724, 719, 1, 0, 0, 0, 724, 720, 1, 0, 0, 0, 724, 721, 1, 0, 0, 0, 724, 722, 1, 0, 0, 0, 724,
    723, 1, 0, 0, 0, 725, 97, 1, 0, 0, 0, 726, 727, 7, 1, 0, 0, 727, 99, 1, 0, 0, 0, 728, 729, 7, 2,
    0, 0, 729, 101, 1, 0, 0, 0, 730, 731, 5, 104, 0, 0, 731, 103, 1, 0, 0, 0, 732, 734, 5, 75, 0, 0,
    733, 732, 1, 0, 0, 0, 733, 734, 1, 0, 0, 0, 734, 735, 1, 0, 0, 0, 735, 736, 5, 106, 0, 0, 736,
    105, 1, 0, 0, 0, 737, 738, 3, 80, 40, 0, 738, 739, 5, 84, 0, 0, 739, 740, 3, 72, 36, 0, 740,
    107, 1, 0, 0, 0, 741, 742, 5, 105, 0, 0, 742, 109, 1, 0, 0, 0, 743, 744, 5, 80, 0, 0, 744, 745,
    3, 116, 58, 0, 745, 746, 5, 81, 0, 0, 746, 111, 1, 0, 0, 0, 747, 751, 3, 72, 36, 0, 748, 750, 3,
    110, 55, 0, 749, 748, 1, 0, 0, 0, 750, 753, 1, 0, 0, 0, 751, 749, 1, 0, 0, 0, 751, 752, 1, 0, 0,
    0, 752, 113, 1, 0, 0, 0, 753, 751, 1, 0, 0, 0, 754, 755, 5, 76, 0, 0, 755, 756, 5, 84, 0, 0,
    756, 757, 3, 112, 56, 0, 757, 115, 1, 0, 0, 0, 758, 764, 3, 158, 79, 0, 759, 764, 3, 132, 66, 0,
    760, 764, 3, 120, 60, 0, 761, 764, 3, 138, 69, 0, 762, 764, 3, 118, 59, 0, 763, 758, 1, 0, 0, 0,
    763, 759, 1, 0, 0, 0, 763, 760, 1, 0, 0, 0, 763, 761, 1, 0, 0, 0, 763, 762, 1, 0, 0, 0, 764,
    117, 1, 0, 0, 0, 765, 766, 5, 15, 0, 0, 766, 767, 5, 82, 0, 0, 767, 768, 3, 116, 58, 0, 768,
    769, 5, 85, 0, 0, 769, 770, 3, 116, 58, 0, 770, 771, 5, 85, 0, 0, 771, 772, 3, 116, 58, 0, 772,
    773, 5, 83, 0, 0, 773, 119, 1, 0, 0, 0, 774, 776, 3, 122, 61, 0, 775, 777, 3, 124, 62, 0, 776,
    775, 1, 0, 0, 0, 776, 777, 1, 0, 0, 0, 777, 121, 1, 0, 0, 0, 778, 786, 3, 128, 64, 0, 779, 786,
    3, 130, 65, 0, 780, 786, 3, 96, 48, 0, 781, 786, 3, 140, 70, 0, 782, 786, 3, 148, 74, 0, 783,
    786, 3, 144, 72, 0, 784, 786, 3, 126, 63, 0, 785, 778, 1, 0, 0, 0, 785, 779, 1, 0, 0, 0, 785,
    780, 1, 0, 0, 0, 785, 781, 1, 0, 0, 0, 785, 782, 1, 0, 0, 0, 785, 783, 1, 0, 0, 0, 785, 784, 1,
    0, 0, 0, 786, 123, 1, 0, 0, 0, 787, 788, 5, 84, 0, 0, 788, 790, 3, 126, 63, 0, 789, 787, 1, 0,
    0, 0, 790, 791, 1, 0, 0, 0, 791, 789, 1, 0, 0, 0, 791, 792, 1, 0, 0, 0, 792, 125, 1, 0, 0, 0,
    793, 796, 3, 72, 36, 0, 794, 796, 3, 154, 77, 0, 795, 793, 1, 0, 0, 0, 795, 794, 1, 0, 0, 0,
    796, 800, 1, 0, 0, 0, 797, 799, 3, 110, 55, 0, 798, 797, 1, 0, 0, 0, 799, 802, 1, 0, 0, 0, 800,
    798, 1, 0, 0, 0, 800, 801, 1, 0, 0, 0, 801, 127, 1, 0, 0, 0, 802, 800, 1, 0, 0, 0, 803, 804, 5,
    76, 0, 0, 804, 129, 1, 0, 0, 0, 805, 806, 5, 82, 0, 0, 806, 807, 3, 116, 58, 0, 807, 808, 5, 83,
    0, 0, 808, 131, 1, 0, 0, 0, 809, 812, 3, 134, 67, 0, 810, 812, 3, 136, 68, 0, 811, 809, 1, 0, 0,
    0, 811, 810, 1, 0, 0, 0, 812, 133, 1, 0, 0, 0, 813, 814, 5, 88, 0, 0, 814, 815, 3, 120, 60, 0,
    815, 135, 1, 0, 0, 0, 816, 817, 5, 67, 0, 0, 817, 818, 3, 120, 60, 0, 818, 137, 1, 0, 0, 0, 819,
    820, 3, 120, 60, 0, 820, 821, 3, 156, 78, 0, 821, 822, 3, 116, 58, 0, 822, 139, 1, 0, 0, 0, 823,
    824, 5, 80, 0, 0, 824, 825, 3, 142, 71, 0, 825, 826, 5, 81, 0, 0, 826, 141, 1, 0, 0, 0, 827,
    832, 3, 116, 58, 0, 828, 829, 5, 85, 0, 0, 829, 831, 3, 116, 58, 0, 830, 828, 1, 0, 0, 0, 831,
    834, 1, 0, 0, 0, 832, 830, 1, 0, 0, 0, 832, 833, 1, 0, 0, 0, 833, 143, 1, 0, 0, 0, 834, 832, 1,
    0, 0, 0, 835, 836, 5, 82, 0, 0, 836, 837, 3, 146, 73, 0, 837, 838, 5, 83, 0, 0, 838, 145, 1, 0,
    0, 0, 839, 842, 3, 116, 58, 0, 840, 841, 5, 85, 0, 0, 841, 843, 3, 116, 58, 0, 842, 840, 1, 0,
    0, 0, 843, 844, 1, 0, 0, 0, 844, 842, 1, 0, 0, 0, 844, 845, 1, 0, 0, 0, 845, 147, 1, 0, 0, 0,
    846, 847, 5, 80, 0, 0, 847, 848, 3, 150, 75, 0, 848, 849, 5, 81, 0, 0, 849, 149, 1, 0, 0, 0,
    850, 855, 3, 152, 76, 0, 851, 852, 5, 85, 0, 0, 852, 854, 3, 152, 76, 0, 853, 851, 1, 0, 0, 0,
    854, 857, 1, 0, 0, 0, 855, 853, 1, 0, 0, 0, 855, 856, 1, 0, 0, 0, 856, 151, 1, 0, 0, 0, 857,
    855, 1, 0, 0, 0, 858, 859, 3, 116, 58, 0, 859, 860, 5, 86, 0, 0, 860, 861, 3, 116, 58, 0, 861,
    153, 1, 0, 0, 0, 862, 863, 3, 76, 38, 0, 863, 865, 5, 82, 0, 0, 864, 866, 3, 84, 42, 0, 865,
    864, 1, 0, 0, 0, 865, 866, 1, 0, 0, 0, 866, 867, 1, 0, 0, 0, 867, 868, 5, 83, 0, 0, 868, 155, 1,
    0, 0, 0, 869, 870, 7, 3, 0, 0, 870, 157, 1, 0, 0, 0, 871, 872, 5, 32, 0, 0, 872, 873, 3, 90, 45,
    0, 873, 875, 5, 82, 0, 0, 874, 876, 3, 84, 42, 0, 875, 874, 1, 0, 0, 0, 875, 876, 1, 0, 0, 0,
    876, 877, 1, 0, 0, 0, 877, 878, 5, 83, 0, 0, 878, 159, 1, 0, 0, 0, 879, 880, 3, 72, 36, 0, 880,
    881, 5, 47, 0, 0, 881, 882, 3, 90, 45, 0, 882, 161, 1, 0, 0, 0, 883, 884, 3, 80, 40, 0, 884,
    885, 5, 91, 0, 0, 885, 886, 5, 33, 0, 0, 886, 891, 3, 90, 45, 0, 887, 888, 5, 85, 0, 0, 888,
    890, 3, 90, 45, 0, 889, 887, 1, 0, 0, 0, 890, 893, 1, 0, 0, 0, 891, 889, 1, 0, 0, 0, 891, 892,
    1, 0, 0, 0, 892, 894, 1, 0, 0, 0, 893, 891, 1, 0, 0, 0, 894, 895, 5, 92, 0, 0, 895, 163, 1, 0,
    0, 0, 896, 897, 5, 62, 0, 0, 897, 898, 5, 91, 0, 0, 898, 899, 5, 33, 0, 0, 899, 904, 3, 90, 45,
    0, 900, 901, 5, 85, 0, 0, 901, 903, 3, 90, 45, 0, 902, 900, 1, 0, 0, 0, 903, 906, 1, 0, 0, 0,
    904, 902, 1, 0, 0, 0, 904, 905, 1, 0, 0, 0, 905, 907, 1, 0, 0, 0, 906, 904, 1, 0, 0, 0, 907,
    908, 5, 71, 0, 0, 908, 909, 3, 90, 45, 0, 909, 910, 5, 92, 0, 0, 910, 165, 1, 0, 0, 0, 911, 912,
    5, 82, 0, 0, 912, 915, 3, 90, 45, 0, 913, 914, 5, 85, 0, 0, 914, 916, 3, 90, 45, 0, 915, 913, 1,
    0, 0, 0, 916, 917, 1, 0, 0, 0, 917, 915, 1, 0, 0, 0, 917, 918, 1, 0, 0, 0, 918, 919, 1, 0, 0, 0,
    919, 920, 5, 83, 0, 0, 920, 167, 1, 0, 0, 0, 921, 924, 5, 9, 0, 0, 922, 925, 3, 88, 44, 0, 923,
    925, 3, 84, 42, 0, 924, 922, 1, 0, 0, 0, 924, 923, 1, 0, 0, 0, 925, 926, 1, 0, 0, 0, 926, 927,
    5, 71, 0, 0, 927, 928, 3, 116, 58, 0, 928, 169, 1, 0, 0, 0, 929, 930, 5, 75, 0, 0, 930, 931, 5,
    106, 0, 0, 931, 171, 1, 0, 0, 0, 932, 933, 3, 120, 60, 0, 933, 934, 5, 72, 0, 0, 934, 935, 3,
    120, 60, 0, 935, 173, 1, 0, 0, 0, 93, 175, 180, 186, 200, 203, 210, 218, 224, 232, 234, 243,
    252, 254, 262, 268, 275, 283, 293, 301, 307, 315, 317, 325, 332, 341, 343, 366, 369, 378, 380,
    388, 396, 404, 414, 422, 429, 436, 444, 454, 463, 468, 474, 484, 493, 506, 518, 523, 535, 543,
    549, 558, 563, 570, 578, 587, 590, 596, 604, 606, 615, 618, 624, 631, 639, 646, 654, 661, 670,
    680, 687, 692, 699, 706, 713, 724, 733, 751, 763, 776, 785, 791, 795, 800, 811, 832, 844, 855,
    865, 875, 891, 904, 917, 924,
  ];

  private static __ATN: antlr.ATN;
  public static get _ATN(): antlr.ATN {
    if (!RefLangParser.__ATN) {
      RefLangParser.__ATN = new antlr.ATNDeserializer().deserialize(RefLangParser._serializedATN);
    }

    return RefLangParser.__ATN;
  }

  private static readonly vocabulary = new antlr.Vocabulary(
    RefLangParser.literalNames,
    RefLangParser.symbolicNames,
    [],
  );

  public override get vocabulary(): antlr.Vocabulary {
    return RefLangParser.vocabulary;
  }

  private static readonly decisionsToDFA = RefLangParser._ATN.decisionToState.map(
    (ds: antlr.DecisionState, index: number) => new antlr.DFA(ds, index),
  );
}

export class FileContext extends antlr.ParserRuleContext {
  public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
    super(parent, invokingState);
  }
  public EOF(): antlr.TerminalNode {
    return this.getToken(RefLangParser.EOF, 0)!;
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
      return this.getTokens(RefLangParser.NL);
    } else {
      return this.getToken(RefLangParser.NL, i);
    }
  }
  public override get ruleIndex(): number {
    return RefLangParser.RULE_file;
  }
  public override enterRule(listener: RefLangListener): void {
    if (listener.enterFile) {
      listener.enterFile(this);
    }
  }
  public override exitRule(listener: RefLangListener): void {
    if (listener.exitFile) {
      listener.exitFile(this);
    }
  }
  public override accept<Result>(visitor: RefLangVisitor<Result>): Result | null {
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
    return RefLangParser.RULE_global;
  }
  public override enterRule(listener: RefLangListener): void {
    if (listener.enterGlobal) {
      listener.enterGlobal(this);
    }
  }
  public override exitRule(listener: RefLangListener): void {
    if (listener.exitGlobal) {
      listener.exitGlobal(this);
    }
  }
  public override accept<Result>(visitor: RefLangVisitor<Result>): Result | null {
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
  public MAIN(): antlr.TerminalNode[];
  public MAIN(i: number): antlr.TerminalNode | null;
  public MAIN(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    if (i === undefined) {
      return this.getTokens(RefLangParser.MAIN);
    } else {
      return this.getToken(RefLangParser.MAIN, i);
    }
  }
  public NL(): antlr.TerminalNode[];
  public NL(i: number): antlr.TerminalNode | null;
  public NL(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    if (i === undefined) {
      return this.getTokens(RefLangParser.NL);
    } else {
      return this.getToken(RefLangParser.NL, i);
    }
  }
  public END(): antlr.TerminalNode {
    return this.getToken(RefLangParser.END, 0)!;
  }
  public GHOSTED(): antlr.TerminalNode | null {
    return this.getToken(RefLangParser.GHOSTED, 0);
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
    return RefLangParser.RULE_main;
  }
  public override enterRule(listener: RefLangListener): void {
    if (listener.enterMain) {
      listener.enterMain(this);
    }
  }
  public override exitRule(listener: RefLangListener): void {
    if (listener.exitMain) {
      listener.exitMain(this);
    }
  }
  public override accept<Result>(visitor: RefLangVisitor<Result>): Result | null {
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
  public FUNCTION(): antlr.TerminalNode[];
  public FUNCTION(i: number): antlr.TerminalNode | null;
  public FUNCTION(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    if (i === undefined) {
      return this.getTokens(RefLangParser.FUNCTION);
    } else {
      return this.getToken(RefLangParser.FUNCTION, i);
    }
  }
  public methodName(): MethodNameContext {
    return this.getRuleContext(0, MethodNameContext)!;
  }
  public OPEN_BRACKET(): antlr.TerminalNode {
    return this.getToken(RefLangParser.OPEN_BRACKET, 0)!;
  }
  public CLOSE_BRACKET(): antlr.TerminalNode {
    return this.getToken(RefLangParser.CLOSE_BRACKET, 0)!;
  }
  public RETURNS(): antlr.TerminalNode {
    return this.getToken(RefLangParser.RETURNS, 0)!;
  }
  public type(): TypeContext {
    return this.getRuleContext(0, TypeContext)!;
  }
  public NL(): antlr.TerminalNode[];
  public NL(i: number): antlr.TerminalNode | null;
  public NL(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    if (i === undefined) {
      return this.getTokens(RefLangParser.NL);
    } else {
      return this.getToken(RefLangParser.NL, i);
    }
  }
  public returnStatement(): ReturnStatementContext {
    return this.getRuleContext(0, ReturnStatementContext)!;
  }
  public END(): antlr.TerminalNode {
    return this.getToken(RefLangParser.END, 0)!;
  }
  public GHOSTED(): antlr.TerminalNode | null {
    return this.getToken(RefLangParser.GHOSTED, 0);
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
    return RefLangParser.RULE_function;
  }
  public override enterRule(listener: RefLangListener): void {
    if (listener.enterFunction) {
      listener.enterFunction(this);
    }
  }
  public override exitRule(listener: RefLangListener): void {
    if (listener.exitFunction) {
      listener.exitFunction(this);
    }
  }
  public override accept<Result>(visitor: RefLangVisitor<Result>): Result | null {
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
  public TEST(): antlr.TerminalNode[];
  public TEST(i: number): antlr.TerminalNode | null;
  public TEST(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    if (i === undefined) {
      return this.getTokens(RefLangParser.TEST);
    } else {
      return this.getToken(RefLangParser.TEST, i);
    }
  }
  public testName(): TestNameContext {
    return this.getRuleContext(0, TestNameContext)!;
  }
  public NL(): antlr.TerminalNode[];
  public NL(i: number): antlr.TerminalNode | null;
  public NL(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    if (i === undefined) {
      return this.getTokens(RefLangParser.NL);
    } else {
      return this.getToken(RefLangParser.NL, i);
    }
  }
  public END(): antlr.TerminalNode {
    return this.getToken(RefLangParser.END, 0)!;
  }
  public GHOSTED(): antlr.TerminalNode | null {
    return this.getToken(RefLangParser.GHOSTED, 0);
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
    return RefLangParser.RULE_test;
  }
  public override enterRule(listener: RefLangListener): void {
    if (listener.enterTest) {
      listener.enterTest(this);
    }
  }
  public override exitRule(listener: RefLangListener): void {
    if (listener.exitTest) {
      listener.exitTest(this);
    }
  }
  public override accept<Result>(visitor: RefLangVisitor<Result>): Result | null {
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
  public PROCEDURE(): antlr.TerminalNode[];
  public PROCEDURE(i: number): antlr.TerminalNode | null;
  public PROCEDURE(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    if (i === undefined) {
      return this.getTokens(RefLangParser.PROCEDURE);
    } else {
      return this.getToken(RefLangParser.PROCEDURE, i);
    }
  }
  public methodName(): MethodNameContext {
    return this.getRuleContext(0, MethodNameContext)!;
  }
  public OPEN_BRACKET(): antlr.TerminalNode {
    return this.getToken(RefLangParser.OPEN_BRACKET, 0)!;
  }
  public CLOSE_BRACKET(): antlr.TerminalNode {
    return this.getToken(RefLangParser.CLOSE_BRACKET, 0)!;
  }
  public NL(): antlr.TerminalNode[];
  public NL(i: number): antlr.TerminalNode | null;
  public NL(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    if (i === undefined) {
      return this.getTokens(RefLangParser.NL);
    } else {
      return this.getToken(RefLangParser.NL, i);
    }
  }
  public END(): antlr.TerminalNode {
    return this.getToken(RefLangParser.END, 0)!;
  }
  public GHOSTED(): antlr.TerminalNode | null {
    return this.getToken(RefLangParser.GHOSTED, 0);
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
    return RefLangParser.RULE_procedure;
  }
  public override enterRule(listener: RefLangListener): void {
    if (listener.enterProcedure) {
      listener.enterProcedure(this);
    }
  }
  public override exitRule(listener: RefLangListener): void {
    if (listener.exitProcedure) {
      listener.exitProcedure(this);
    }
  }
  public override accept<Result>(visitor: RefLangVisitor<Result>): Result | null {
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
  public CONSTANT(): antlr.TerminalNode {
    return this.getToken(RefLangParser.CONSTANT, 0)!;
  }
  public identifier(): IdentifierContext {
    return this.getRuleContext(0, IdentifierContext)!;
  }
  public SET(): antlr.TerminalNode {
    return this.getToken(RefLangParser.SET, 0)!;
  }
  public TO(): antlr.TerminalNode {
    return this.getToken(RefLangParser.TO, 0)!;
  }
  public constantValue(): ConstantValueContext {
    return this.getRuleContext(0, ConstantValueContext)!;
  }
  public NL(): antlr.TerminalNode {
    return this.getToken(RefLangParser.NL, 0)!;
  }
  public GHOSTED(): antlr.TerminalNode | null {
    return this.getToken(RefLangParser.GHOSTED, 0);
  }
  public override get ruleIndex(): number {
    return RefLangParser.RULE_constant;
  }
  public override enterRule(listener: RefLangListener): void {
    if (listener.enterConstant) {
      listener.enterConstant(this);
    }
  }
  public override exitRule(listener: RefLangListener): void {
    if (listener.exitConstant) {
      listener.exitConstant(this);
    }
  }
  public override accept<Result>(visitor: RefLangVisitor<Result>): Result | null {
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
  public ENUM(): antlr.TerminalNode {
    return this.getToken(RefLangParser.ENUM, 0)!;
  }
  public typeName(): TypeNameContext {
    return this.getRuleContext(0, TypeNameContext)!;
  }
  public enumValuesList(): EnumValuesListContext {
    return this.getRuleContext(0, EnumValuesListContext)!;
  }
  public NL(): antlr.TerminalNode {
    return this.getToken(RefLangParser.NL, 0)!;
  }
  public GHOSTED(): antlr.TerminalNode | null {
    return this.getToken(RefLangParser.GHOSTED, 0);
  }
  public override get ruleIndex(): number {
    return RefLangParser.RULE_enum;
  }
  public override enterRule(listener: RefLangListener): void {
    if (listener.enterEnum) {
      listener.enterEnum(this);
    }
  }
  public override exitRule(listener: RefLangListener): void {
    if (listener.exitEnum) {
      listener.exitEnum(this);
    }
  }
  public override accept<Result>(visitor: RefLangVisitor<Result>): Result | null {
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
  public CLASS(): antlr.TerminalNode[];
  public CLASS(i: number): antlr.TerminalNode | null;
  public CLASS(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    if (i === undefined) {
      return this.getTokens(RefLangParser.CLASS);
    } else {
      return this.getToken(RefLangParser.CLASS, i);
    }
  }
  public typeName(): TypeNameContext[];
  public typeName(i: number): TypeNameContext | null;
  public typeName(i?: number): TypeNameContext[] | TypeNameContext | null {
    if (i === undefined) {
      return this.getRuleContexts(TypeNameContext);
    }

    return this.getRuleContext(i, TypeNameContext);
  }
  public NL(): antlr.TerminalNode[];
  public NL(i: number): antlr.TerminalNode | null;
  public NL(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    if (i === undefined) {
      return this.getTokens(RefLangParser.NL);
    } else {
      return this.getToken(RefLangParser.NL, i);
    }
  }
  public END(): antlr.TerminalNode {
    return this.getToken(RefLangParser.END, 0)!;
  }
  public GHOSTED(): antlr.TerminalNode | null {
    return this.getToken(RefLangParser.GHOSTED, 0);
  }
  public INHERITS(): antlr.TerminalNode | null {
    return this.getToken(RefLangParser.INHERITS, 0);
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
    return RefLangParser.RULE_concreteClass;
  }
  public override enterRule(listener: RefLangListener): void {
    if (listener.enterConcreteClass) {
      listener.enterConcreteClass(this);
    }
  }
  public override exitRule(listener: RefLangListener): void {
    if (listener.exitConcreteClass) {
      listener.exitConcreteClass(this);
    }
  }
  public override accept<Result>(visitor: RefLangVisitor<Result>): Result | null {
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
  public ABSTRACT(): antlr.TerminalNode {
    return this.getToken(RefLangParser.ABSTRACT, 0)!;
  }
  public CLASS(): antlr.TerminalNode[];
  public CLASS(i: number): antlr.TerminalNode | null;
  public CLASS(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    if (i === undefined) {
      return this.getTokens(RefLangParser.CLASS);
    } else {
      return this.getToken(RefLangParser.CLASS, i);
    }
  }
  public typeName(): TypeNameContext[];
  public typeName(i: number): TypeNameContext | null;
  public typeName(i?: number): TypeNameContext[] | TypeNameContext | null {
    if (i === undefined) {
      return this.getRuleContexts(TypeNameContext);
    }

    return this.getRuleContext(i, TypeNameContext);
  }
  public NL(): antlr.TerminalNode[];
  public NL(i: number): antlr.TerminalNode | null;
  public NL(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    if (i === undefined) {
      return this.getTokens(RefLangParser.NL);
    } else {
      return this.getToken(RefLangParser.NL, i);
    }
  }
  public END(): antlr.TerminalNode {
    return this.getToken(RefLangParser.END, 0)!;
  }
  public GHOSTED(): antlr.TerminalNode | null {
    return this.getToken(RefLangParser.GHOSTED, 0);
  }
  public INHERITS(): antlr.TerminalNode | null {
    return this.getToken(RefLangParser.INHERITS, 0);
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
    return RefLangParser.RULE_abstractClass;
  }
  public override enterRule(listener: RefLangListener): void {
    if (listener.enterAbstractClass) {
      listener.enterAbstractClass(this);
    }
  }
  public override exitRule(listener: RefLangListener): void {
    if (listener.exitAbstractClass) {
      listener.exitAbstractClass(this);
    }
  }
  public override accept<Result>(visitor: RefLangVisitor<Result>): Result | null {
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
    return this.getToken(RefLangParser.NL, 0)!;
  }
  public override get ruleIndex(): number {
    return RefLangParser.RULE_comment;
  }
  public override enterRule(listener: RefLangListener): void {
    if (listener.enterComment) {
      listener.enterComment(this);
    }
  }
  public override exitRule(listener: RefLangListener): void {
    if (listener.exitComment) {
      listener.exitComment(this);
    }
  }
  public override accept<Result>(visitor: RefLangVisitor<Result>): Result | null {
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
    return this.getToken(RefLangParser.COMMENT, 0)!;
  }
  public override get ruleIndex(): number {
    return RefLangParser.RULE_commentText;
  }
  public override enterRule(listener: RefLangListener): void {
    if (listener.enterCommentText) {
      listener.enterCommentText(this);
    }
  }
  public override exitRule(listener: RefLangListener): void {
    if (listener.exitCommentText) {
      listener.exitCommentText(this);
    }
  }
  public override accept<Result>(visitor: RefLangVisitor<Result>): Result | null {
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
    return RefLangParser.RULE_ordinaryStatement;
  }
  public override enterRule(listener: RefLangListener): void {
    if (listener.enterOrdinaryStatement) {
      listener.enterOrdinaryStatement(this);
    }
  }
  public override exitRule(listener: RefLangListener): void {
    if (listener.exitOrdinaryStatement) {
      listener.exitOrdinaryStatement(this);
    }
  }
  public override accept<Result>(visitor: RefLangVisitor<Result>): Result | null {
    if (visitor.visitOrdinaryStatement) {
      return visitor.visitOrdinaryStatement(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class IfStatementContext extends antlr.ParserRuleContext {
  public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
    super(parent, invokingState);
  }
  public IF(): antlr.TerminalNode[];
  public IF(i: number): antlr.TerminalNode | null;
  public IF(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    if (i === undefined) {
      return this.getTokens(RefLangParser.IF);
    } else {
      return this.getToken(RefLangParser.IF, i);
    }
  }
  public expression(): ExpressionContext {
    return this.getRuleContext(0, ExpressionContext)!;
  }
  public THEN(): antlr.TerminalNode {
    return this.getToken(RefLangParser.THEN, 0)!;
  }
  public NL(): antlr.TerminalNode[];
  public NL(i: number): antlr.TerminalNode | null;
  public NL(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    if (i === undefined) {
      return this.getTokens(RefLangParser.NL);
    } else {
      return this.getToken(RefLangParser.NL, i);
    }
  }
  public END(): antlr.TerminalNode {
    return this.getToken(RefLangParser.END, 0)!;
  }
  public GHOSTED(): antlr.TerminalNode | null {
    return this.getToken(RefLangParser.GHOSTED, 0);
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
    return RefLangParser.RULE_ifStatement;
  }
  public override enterRule(listener: RefLangListener): void {
    if (listener.enterIfStatement) {
      listener.enterIfStatement(this);
    }
  }
  public override exitRule(listener: RefLangListener): void {
    if (listener.exitIfStatement) {
      listener.exitIfStatement(this);
    }
  }
  public override accept<Result>(visitor: RefLangVisitor<Result>): Result | null {
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
  public WHILE(): antlr.TerminalNode[];
  public WHILE(i: number): antlr.TerminalNode | null;
  public WHILE(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    if (i === undefined) {
      return this.getTokens(RefLangParser.WHILE);
    } else {
      return this.getToken(RefLangParser.WHILE, i);
    }
  }
  public expression(): ExpressionContext {
    return this.getRuleContext(0, ExpressionContext)!;
  }
  public NL(): antlr.TerminalNode[];
  public NL(i: number): antlr.TerminalNode | null;
  public NL(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    if (i === undefined) {
      return this.getTokens(RefLangParser.NL);
    } else {
      return this.getToken(RefLangParser.NL, i);
    }
  }
  public END(): antlr.TerminalNode {
    return this.getToken(RefLangParser.END, 0)!;
  }
  public GHOSTED(): antlr.TerminalNode | null {
    return this.getToken(RefLangParser.GHOSTED, 0);
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
    return RefLangParser.RULE_whileLoop;
  }
  public override enterRule(listener: RefLangListener): void {
    if (listener.enterWhileLoop) {
      listener.enterWhileLoop(this);
    }
  }
  public override exitRule(listener: RefLangListener): void {
    if (listener.exitWhileLoop) {
      listener.exitWhileLoop(this);
    }
  }
  public override accept<Result>(visitor: RefLangVisitor<Result>): Result | null {
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
  public FOR(): antlr.TerminalNode[];
  public FOR(i: number): antlr.TerminalNode | null;
  public FOR(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    if (i === undefined) {
      return this.getTokens(RefLangParser.FOR);
    } else {
      return this.getToken(RefLangParser.FOR, i);
    }
  }
  public identifier(): IdentifierContext {
    return this.getRuleContext(0, IdentifierContext)!;
  }
  public IN(): antlr.TerminalNode {
    return this.getToken(RefLangParser.IN, 0)!;
  }
  public expression(): ExpressionContext {
    return this.getRuleContext(0, ExpressionContext)!;
  }
  public NL(): antlr.TerminalNode[];
  public NL(i: number): antlr.TerminalNode | null;
  public NL(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    if (i === undefined) {
      return this.getTokens(RefLangParser.NL);
    } else {
      return this.getToken(RefLangParser.NL, i);
    }
  }
  public END(): antlr.TerminalNode {
    return this.getToken(RefLangParser.END, 0)!;
  }
  public GHOSTED(): antlr.TerminalNode | null {
    return this.getToken(RefLangParser.GHOSTED, 0);
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
    return RefLangParser.RULE_forLoop;
  }
  public override enterRule(listener: RefLangListener): void {
    if (listener.enterForLoop) {
      listener.enterForLoop(this);
    }
  }
  public override exitRule(listener: RefLangListener): void {
    if (listener.exitForLoop) {
      listener.exitForLoop(this);
    }
  }
  public override accept<Result>(visitor: RefLangVisitor<Result>): Result | null {
    if (visitor.visitForLoop) {
      return visitor.visitForLoop(this);
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
      return this.getTokens(RefLangParser.TRY);
    } else {
      return this.getToken(RefLangParser.TRY, i);
    }
  }
  public NL(): antlr.TerminalNode[];
  public NL(i: number): antlr.TerminalNode | null;
  public NL(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    if (i === undefined) {
      return this.getTokens(RefLangParser.NL);
    } else {
      return this.getToken(RefLangParser.NL, i);
    }
  }
  public catchStatement(): CatchStatementContext {
    return this.getRuleContext(0, CatchStatementContext)!;
  }
  public END(): antlr.TerminalNode {
    return this.getToken(RefLangParser.END, 0)!;
  }
  public GHOSTED(): antlr.TerminalNode | null {
    return this.getToken(RefLangParser.GHOSTED, 0);
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
    return RefLangParser.RULE_tryStatement;
  }
  public override enterRule(listener: RefLangListener): void {
    if (listener.enterTryStatement) {
      listener.enterTryStatement(this);
    }
  }
  public override exitRule(listener: RefLangListener): void {
    if (listener.exitTryStatement) {
      listener.exitTryStatement(this);
    }
  }
  public override accept<Result>(visitor: RefLangVisitor<Result>): Result | null {
    if (visitor.visitTryStatement) {
      return visitor.visitTryStatement(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class AssertContext extends antlr.ParserRuleContext {
  public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
    super(parent, invokingState);
  }
  public ASSERT(): antlr.TerminalNode {
    return this.getToken(RefLangParser.ASSERT, 0)!;
  }
  public assertActual(): AssertActualContext {
    return this.getRuleContext(0, AssertActualContext)!;
  }
  public EVALUATES(): antlr.TerminalNode {
    return this.getToken(RefLangParser.EVALUATES, 0)!;
  }
  public TO(): antlr.TerminalNode {
    return this.getToken(RefLangParser.TO, 0)!;
  }
  public expression(): ExpressionContext {
    return this.getRuleContext(0, ExpressionContext)!;
  }
  public NL(): antlr.TerminalNode {
    return this.getToken(RefLangParser.NL, 0)!;
  }
  public GHOSTED(): antlr.TerminalNode | null {
    return this.getToken(RefLangParser.GHOSTED, 0);
  }
  public override get ruleIndex(): number {
    return RefLangParser.RULE_assert;
  }
  public override enterRule(listener: RefLangListener): void {
    if (listener.enterAssert) {
      listener.enterAssert(this);
    }
  }
  public override exitRule(listener: RefLangListener): void {
    if (listener.exitAssert) {
      listener.exitAssert(this);
    }
  }
  public override accept<Result>(visitor: RefLangVisitor<Result>): Result | null {
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
  public LET(): antlr.TerminalNode {
    return this.getToken(RefLangParser.LET, 0)!;
  }
  public identifier(): IdentifierContext {
    return this.getRuleContext(0, IdentifierContext)!;
  }
  public BE(): antlr.TerminalNode {
    return this.getToken(RefLangParser.BE, 0)!;
  }
  public expression(): ExpressionContext {
    return this.getRuleContext(0, ExpressionContext)!;
  }
  public NL(): antlr.TerminalNode {
    return this.getToken(RefLangParser.NL, 0)!;
  }
  public GHOSTED(): antlr.TerminalNode | null {
    return this.getToken(RefLangParser.GHOSTED, 0);
  }
  public override get ruleIndex(): number {
    return RefLangParser.RULE_letStatement;
  }
  public override enterRule(listener: RefLangListener): void {
    if (listener.enterLetStatement) {
      listener.enterLetStatement(this);
    }
  }
  public override exitRule(listener: RefLangListener): void {
    if (listener.exitLetStatement) {
      listener.exitLetStatement(this);
    }
  }
  public override accept<Result>(visitor: RefLangVisitor<Result>): Result | null {
    if (visitor.visitLetStatement) {
      return visitor.visitLetStatement(this);
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
    return this.getToken(RefLangParser.PRINT, 0)!;
  }
  public OPEN_BRACKET(): antlr.TerminalNode {
    return this.getToken(RefLangParser.OPEN_BRACKET, 0)!;
  }
  public CLOSE_BRACKET(): antlr.TerminalNode {
    return this.getToken(RefLangParser.CLOSE_BRACKET, 0)!;
  }
  public NL(): antlr.TerminalNode {
    return this.getToken(RefLangParser.NL, 0)!;
  }
  public GHOSTED(): antlr.TerminalNode | null {
    return this.getToken(RefLangParser.GHOSTED, 0);
  }
  public expression(): ExpressionContext | null {
    return this.getRuleContext(0, ExpressionContext);
  }
  public override get ruleIndex(): number {
    return RefLangParser.RULE_print;
  }
  public override enterRule(listener: RefLangListener): void {
    if (listener.enterPrint) {
      listener.enterPrint(this);
    }
  }
  public override exitRule(listener: RefLangListener): void {
    if (listener.exitPrint) {
      listener.exitPrint(this);
    }
  }
  public override accept<Result>(visitor: RefLangVisitor<Result>): Result | null {
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
  public VARIABLE(): antlr.TerminalNode {
    return this.getToken(RefLangParser.VARIABLE, 0)!;
  }
  public identifier(): IdentifierContext {
    return this.getRuleContext(0, IdentifierContext)!;
  }
  public SET(): antlr.TerminalNode {
    return this.getToken(RefLangParser.SET, 0)!;
  }
  public TO(): antlr.TerminalNode {
    return this.getToken(RefLangParser.TO, 0)!;
  }
  public expression(): ExpressionContext {
    return this.getRuleContext(0, ExpressionContext)!;
  }
  public NL(): antlr.TerminalNode {
    return this.getToken(RefLangParser.NL, 0)!;
  }
  public GHOSTED(): antlr.TerminalNode | null {
    return this.getToken(RefLangParser.GHOSTED, 0);
  }
  public override get ruleIndex(): number {
    return RefLangParser.RULE_variableDefinition;
  }
  public override enterRule(listener: RefLangListener): void {
    if (listener.enterVariableDefinition) {
      listener.enterVariableDefinition(this);
    }
  }
  public override exitRule(listener: RefLangListener): void {
    if (listener.exitVariableDefinition) {
      listener.exitVariableDefinition(this);
    }
  }
  public override accept<Result>(visitor: RefLangVisitor<Result>): Result | null {
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
  public ASSIGN(): antlr.TerminalNode {
    return this.getToken(RefLangParser.ASSIGN, 0)!;
  }
  public assignable(): AssignableContext {
    return this.getRuleContext(0, AssignableContext)!;
  }
  public TO(): antlr.TerminalNode {
    return this.getToken(RefLangParser.TO, 0)!;
  }
  public expression(): ExpressionContext {
    return this.getRuleContext(0, ExpressionContext)!;
  }
  public NL(): antlr.TerminalNode {
    return this.getToken(RefLangParser.NL, 0)!;
  }
  public GHOSTED(): antlr.TerminalNode | null {
    return this.getToken(RefLangParser.GHOSTED, 0);
  }
  public override get ruleIndex(): number {
    return RefLangParser.RULE_assignment;
  }
  public override enterRule(listener: RefLangListener): void {
    if (listener.enterAssignment) {
      listener.enterAssignment(this);
    }
  }
  public override exitRule(listener: RefLangListener): void {
    if (listener.exitAssignment) {
      listener.exitAssignment(this);
    }
  }
  public override accept<Result>(visitor: RefLangVisitor<Result>): Result | null {
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
  public INPUT(): antlr.TerminalNode {
    return this.getToken(RefLangParser.INPUT, 0)!;
  }
  public identifier(): IdentifierContext {
    return this.getRuleContext(0, IdentifierContext)!;
  }
  public SET(): antlr.TerminalNode {
    return this.getToken(RefLangParser.SET, 0)!;
  }
  public TO(): antlr.TerminalNode {
    return this.getToken(RefLangParser.TO, 0)!;
  }
  public methodName(): MethodNameContext {
    return this.getRuleContext(0, MethodNameContext)!;
  }
  public OPEN_BRACKET(): antlr.TerminalNode {
    return this.getToken(RefLangParser.OPEN_BRACKET, 0)!;
  }
  public expression(): ExpressionContext {
    return this.getRuleContext(0, ExpressionContext)!;
  }
  public CLOSE_BRACKET(): antlr.TerminalNode {
    return this.getToken(RefLangParser.CLOSE_BRACKET, 0)!;
  }
  public NL(): antlr.TerminalNode {
    return this.getToken(RefLangParser.NL, 0)!;
  }
  public GHOSTED(): antlr.TerminalNode | null {
    return this.getToken(RefLangParser.GHOSTED, 0);
  }
  public override get ruleIndex(): number {
    return RefLangParser.RULE_inputStatement;
  }
  public override enterRule(listener: RefLangListener): void {
    if (listener.enterInputStatement) {
      listener.enterInputStatement(this);
    }
  }
  public override exitRule(listener: RefLangListener): void {
    if (listener.exitInputStatement) {
      listener.exitInputStatement(this);
    }
  }
  public override accept<Result>(visitor: RefLangVisitor<Result>): Result | null {
    if (visitor.visitInputStatement) {
      return visitor.visitInputStatement(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class ProcedureCallContext extends antlr.ParserRuleContext {
  public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
    super(parent, invokingState);
  }
  public CALL(): antlr.TerminalNode {
    return this.getToken(RefLangParser.CALL, 0)!;
  }
  public procRef(): ProcRefContext {
    return this.getRuleContext(0, ProcRefContext)!;
  }
  public OPEN_BRACKET(): antlr.TerminalNode {
    return this.getToken(RefLangParser.OPEN_BRACKET, 0)!;
  }
  public argList(): ArgListContext {
    return this.getRuleContext(0, ArgListContext)!;
  }
  public CLOSE_BRACKET(): antlr.TerminalNode {
    return this.getToken(RefLangParser.CLOSE_BRACKET, 0)!;
  }
  public NL(): antlr.TerminalNode {
    return this.getToken(RefLangParser.NL, 0)!;
  }
  public GHOSTED(): antlr.TerminalNode | null {
    return this.getToken(RefLangParser.GHOSTED, 0);
  }
  public override get ruleIndex(): number {
    return RefLangParser.RULE_procedureCall;
  }
  public override enterRule(listener: RefLangListener): void {
    if (listener.enterProcedureCall) {
      listener.enterProcedureCall(this);
    }
  }
  public override exitRule(listener: RefLangListener): void {
    if (listener.exitProcedureCall) {
      listener.exitProcedureCall(this);
    }
  }
  public override accept<Result>(visitor: RefLangVisitor<Result>): Result | null {
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
  public methodName(): MethodNameContext {
    return this.getRuleContext(0, MethodNameContext)!;
  }
  public term(): TermContext | null {
    return this.getRuleContext(0, TermContext);
  }
  public DOT(): antlr.TerminalNode | null {
    return this.getToken(RefLangParser.DOT, 0);
  }
  public override get ruleIndex(): number {
    return RefLangParser.RULE_procRef;
  }
  public override enterRule(listener: RefLangListener): void {
    if (listener.enterProcRef) {
      listener.enterProcRef(this);
    }
  }
  public override exitRule(listener: RefLangListener): void {
    if (listener.exitProcRef) {
      listener.exitProcRef(this);
    }
  }
  public override accept<Result>(visitor: RefLangVisitor<Result>): Result | null {
    if (visitor.visitProcRef) {
      return visitor.visitProcRef(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class ThrowStatementContext extends antlr.ParserRuleContext {
  public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
    super(parent, invokingState);
  }
  public THROW(): antlr.TerminalNode {
    return this.getToken(RefLangParser.THROW, 0)!;
  }
  public typeName(): TypeNameContext {
    return this.getRuleContext(0, TypeNameContext)!;
  }
  public litString(): LitStringContext {
    return this.getRuleContext(0, LitStringContext)!;
  }
  public NL(): antlr.TerminalNode {
    return this.getToken(RefLangParser.NL, 0)!;
  }
  public GHOSTED(): antlr.TerminalNode | null {
    return this.getToken(RefLangParser.GHOSTED, 0);
  }
  public override get ruleIndex(): number {
    return RefLangParser.RULE_throwStatement;
  }
  public override enterRule(listener: RefLangListener): void {
    if (listener.enterThrowStatement) {
      listener.enterThrowStatement(this);
    }
  }
  public override exitRule(listener: RefLangListener): void {
    if (listener.exitThrowStatement) {
      listener.exitThrowStatement(this);
    }
  }
  public override accept<Result>(visitor: RefLangVisitor<Result>): Result | null {
    if (visitor.visitThrowStatement) {
      return visitor.visitThrowStatement(this);
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
    return this.getToken(RefLangParser.RETURN, 0)!;
  }
  public expression(): ExpressionContext {
    return this.getRuleContext(0, ExpressionContext)!;
  }
  public NL(): antlr.TerminalNode {
    return this.getToken(RefLangParser.NL, 0)!;
  }
  public override get ruleIndex(): number {
    return RefLangParser.RULE_returnStatement;
  }
  public override enterRule(listener: RefLangListener): void {
    if (listener.enterReturnStatement) {
      listener.enterReturnStatement(this);
    }
  }
  public override exitRule(listener: RefLangListener): void {
    if (listener.exitReturnStatement) {
      listener.exitReturnStatement(this);
    }
  }
  public override accept<Result>(visitor: RefLangVisitor<Result>): Result | null {
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
    return this.getToken(RefLangParser.ELIF, 0)!;
  }
  public expression(): ExpressionContext {
    return this.getRuleContext(0, ExpressionContext)!;
  }
  public THEN(): antlr.TerminalNode {
    return this.getToken(RefLangParser.THEN, 0)!;
  }
  public NL(): antlr.TerminalNode {
    return this.getToken(RefLangParser.NL, 0)!;
  }
  public GHOSTED(): antlr.TerminalNode | null {
    return this.getToken(RefLangParser.GHOSTED, 0);
  }
  public override get ruleIndex(): number {
    return RefLangParser.RULE_elseIfClause;
  }
  public override enterRule(listener: RefLangListener): void {
    if (listener.enterElseIfClause) {
      listener.enterElseIfClause(this);
    }
  }
  public override exitRule(listener: RefLangListener): void {
    if (listener.exitElseIfClause) {
      listener.exitElseIfClause(this);
    }
  }
  public override accept<Result>(visitor: RefLangVisitor<Result>): Result | null {
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
    return this.getToken(RefLangParser.ELSE, 0)!;
  }
  public NL(): antlr.TerminalNode {
    return this.getToken(RefLangParser.NL, 0)!;
  }
  public GHOSTED(): antlr.TerminalNode | null {
    return this.getToken(RefLangParser.GHOSTED, 0);
  }
  public override get ruleIndex(): number {
    return RefLangParser.RULE_elseClause;
  }
  public override enterRule(listener: RefLangListener): void {
    if (listener.enterElseClause) {
      listener.enterElseClause(this);
    }
  }
  public override exitRule(listener: RefLangListener): void {
    if (listener.exitElseClause) {
      listener.exitElseClause(this);
    }
  }
  public override accept<Result>(visitor: RefLangVisitor<Result>): Result | null {
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
  public CATCH(): antlr.TerminalNode {
    return this.getToken(RefLangParser.CATCH, 0)!;
  }
  public identifier(): IdentifierContext {
    return this.getRuleContext(0, IdentifierContext)!;
  }
  public AS(): antlr.TerminalNode {
    return this.getToken(RefLangParser.AS, 0)!;
  }
  public typeName(): TypeNameContext {
    return this.getRuleContext(0, TypeNameContext)!;
  }
  public NL(): antlr.TerminalNode {
    return this.getToken(RefLangParser.NL, 0)!;
  }
  public GHOSTED(): antlr.TerminalNode | null {
    return this.getToken(RefLangParser.GHOSTED, 0);
  }
  public override get ruleIndex(): number {
    return RefLangParser.RULE_catchStatement;
  }
  public override enterRule(listener: RefLangListener): void {
    if (listener.enterCatchStatement) {
      listener.enterCatchStatement(this);
    }
  }
  public override exitRule(listener: RefLangListener): void {
    if (listener.exitCatchStatement) {
      listener.exitCatchStatement(this);
    }
  }
  public override accept<Result>(visitor: RefLangVisitor<Result>): Result | null {
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
  public CONSTRUCTOR(): antlr.TerminalNode[];
  public CONSTRUCTOR(i: number): antlr.TerminalNode | null;
  public CONSTRUCTOR(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    if (i === undefined) {
      return this.getTokens(RefLangParser.CONSTRUCTOR);
    } else {
      return this.getToken(RefLangParser.CONSTRUCTOR, i);
    }
  }
  public OPEN_BRACKET(): antlr.TerminalNode {
    return this.getToken(RefLangParser.OPEN_BRACKET, 0)!;
  }
  public CLOSE_BRACKET(): antlr.TerminalNode {
    return this.getToken(RefLangParser.CLOSE_BRACKET, 0)!;
  }
  public NL(): antlr.TerminalNode[];
  public NL(i: number): antlr.TerminalNode | null;
  public NL(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    if (i === undefined) {
      return this.getTokens(RefLangParser.NL);
    } else {
      return this.getToken(RefLangParser.NL, i);
    }
  }
  public END(): antlr.TerminalNode {
    return this.getToken(RefLangParser.END, 0)!;
  }
  public GHOSTED(): antlr.TerminalNode | null {
    return this.getToken(RefLangParser.GHOSTED, 0);
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
    return RefLangParser.RULE_constructorMember;
  }
  public override enterRule(listener: RefLangListener): void {
    if (listener.enterConstructorMember) {
      listener.enterConstructorMember(this);
    }
  }
  public override exitRule(listener: RefLangListener): void {
    if (listener.exitConstructorMember) {
      listener.exitConstructorMember(this);
    }
  }
  public override accept<Result>(visitor: RefLangVisitor<Result>): Result | null {
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
  public PROPERTY(): antlr.TerminalNode {
    return this.getToken(RefLangParser.PROPERTY, 0)!;
  }
  public identifier(): IdentifierContext {
    return this.getRuleContext(0, IdentifierContext)!;
  }
  public AS(): antlr.TerminalNode {
    return this.getToken(RefLangParser.AS, 0)!;
  }
  public type(): TypeContext {
    return this.getRuleContext(0, TypeContext)!;
  }
  public NL(): antlr.TerminalNode {
    return this.getToken(RefLangParser.NL, 0)!;
  }
  public PRIVATE(): antlr.TerminalNode | null {
    return this.getToken(RefLangParser.PRIVATE, 0);
  }
  public override get ruleIndex(): number {
    return RefLangParser.RULE_property;
  }
  public override enterRule(listener: RefLangListener): void {
    if (listener.enterProperty) {
      listener.enterProperty(this);
    }
  }
  public override exitRule(listener: RefLangListener): void {
    if (listener.exitProperty) {
      listener.exitProperty(this);
    }
  }
  public override accept<Result>(visitor: RefLangVisitor<Result>): Result | null {
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
  public FUNCTION(): antlr.TerminalNode[];
  public FUNCTION(i: number): antlr.TerminalNode | null;
  public FUNCTION(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    if (i === undefined) {
      return this.getTokens(RefLangParser.FUNCTION);
    } else {
      return this.getToken(RefLangParser.FUNCTION, i);
    }
  }
  public methodName(): MethodNameContext {
    return this.getRuleContext(0, MethodNameContext)!;
  }
  public OPEN_BRACKET(): antlr.TerminalNode {
    return this.getToken(RefLangParser.OPEN_BRACKET, 0)!;
  }
  public CLOSE_BRACKET(): antlr.TerminalNode {
    return this.getToken(RefLangParser.CLOSE_BRACKET, 0)!;
  }
  public RETURNS(): antlr.TerminalNode {
    return this.getToken(RefLangParser.RETURNS, 0)!;
  }
  public type(): TypeContext {
    return this.getRuleContext(0, TypeContext)!;
  }
  public NL(): antlr.TerminalNode[];
  public NL(i: number): antlr.TerminalNode | null;
  public NL(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    if (i === undefined) {
      return this.getTokens(RefLangParser.NL);
    } else {
      return this.getToken(RefLangParser.NL, i);
    }
  }
  public returnStatement(): ReturnStatementContext {
    return this.getRuleContext(0, ReturnStatementContext)!;
  }
  public END(): antlr.TerminalNode {
    return this.getToken(RefLangParser.END, 0)!;
  }
  public GHOSTED(): antlr.TerminalNode | null {
    return this.getToken(RefLangParser.GHOSTED, 0);
  }
  public PRIVATE(): antlr.TerminalNode | null {
    return this.getToken(RefLangParser.PRIVATE, 0);
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
    return RefLangParser.RULE_functionMethod;
  }
  public override enterRule(listener: RefLangListener): void {
    if (listener.enterFunctionMethod) {
      listener.enterFunctionMethod(this);
    }
  }
  public override exitRule(listener: RefLangListener): void {
    if (listener.exitFunctionMethod) {
      listener.exitFunctionMethod(this);
    }
  }
  public override accept<Result>(visitor: RefLangVisitor<Result>): Result | null {
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
  public PROCEDURE(): antlr.TerminalNode[];
  public PROCEDURE(i: number): antlr.TerminalNode | null;
  public PROCEDURE(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    if (i === undefined) {
      return this.getTokens(RefLangParser.PROCEDURE);
    } else {
      return this.getToken(RefLangParser.PROCEDURE, i);
    }
  }
  public methodName(): MethodNameContext {
    return this.getRuleContext(0, MethodNameContext)!;
  }
  public OPEN_BRACKET(): antlr.TerminalNode {
    return this.getToken(RefLangParser.OPEN_BRACKET, 0)!;
  }
  public CLOSE_BRACKET(): antlr.TerminalNode {
    return this.getToken(RefLangParser.CLOSE_BRACKET, 0)!;
  }
  public NL(): antlr.TerminalNode[];
  public NL(i: number): antlr.TerminalNode | null;
  public NL(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    if (i === undefined) {
      return this.getTokens(RefLangParser.NL);
    } else {
      return this.getToken(RefLangParser.NL, i);
    }
  }
  public END(): antlr.TerminalNode {
    return this.getToken(RefLangParser.END, 0)!;
  }
  public GHOSTED(): antlr.TerminalNode | null {
    return this.getToken(RefLangParser.GHOSTED, 0);
  }
  public PRIVATE(): antlr.TerminalNode | null {
    return this.getToken(RefLangParser.PRIVATE, 0);
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
    return RefLangParser.RULE_procedureMethod;
  }
  public override enterRule(listener: RefLangListener): void {
    if (listener.enterProcedureMethod) {
      listener.enterProcedureMethod(this);
    }
  }
  public override exitRule(listener: RefLangListener): void {
    if (listener.exitProcedureMethod) {
      listener.exitProcedureMethod(this);
    }
  }
  public override accept<Result>(visitor: RefLangVisitor<Result>): Result | null {
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
  public ABSTRACT(): antlr.TerminalNode {
    return this.getToken(RefLangParser.ABSTRACT, 0)!;
  }
  public FUNCTION(): antlr.TerminalNode {
    return this.getToken(RefLangParser.FUNCTION, 0)!;
  }
  public methodName(): MethodNameContext {
    return this.getRuleContext(0, MethodNameContext)!;
  }
  public OPEN_BRACKET(): antlr.TerminalNode {
    return this.getToken(RefLangParser.OPEN_BRACKET, 0)!;
  }
  public CLOSE_BRACKET(): antlr.TerminalNode {
    return this.getToken(RefLangParser.CLOSE_BRACKET, 0)!;
  }
  public RETURNS(): antlr.TerminalNode {
    return this.getToken(RefLangParser.RETURNS, 0)!;
  }
  public type(): TypeContext {
    return this.getRuleContext(0, TypeContext)!;
  }
  public NL(): antlr.TerminalNode {
    return this.getToken(RefLangParser.NL, 0)!;
  }
  public GHOSTED(): antlr.TerminalNode | null {
    return this.getToken(RefLangParser.GHOSTED, 0);
  }
  public paramsList(): ParamsListContext | null {
    return this.getRuleContext(0, ParamsListContext);
  }
  public override get ruleIndex(): number {
    return RefLangParser.RULE_abstractFunction;
  }
  public override enterRule(listener: RefLangListener): void {
    if (listener.enterAbstractFunction) {
      listener.enterAbstractFunction(this);
    }
  }
  public override exitRule(listener: RefLangListener): void {
    if (listener.exitAbstractFunction) {
      listener.exitAbstractFunction(this);
    }
  }
  public override accept<Result>(visitor: RefLangVisitor<Result>): Result | null {
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
  public ABSTRACT(): antlr.TerminalNode {
    return this.getToken(RefLangParser.ABSTRACT, 0)!;
  }
  public PROCEDURE(): antlr.TerminalNode {
    return this.getToken(RefLangParser.PROCEDURE, 0)!;
  }
  public methodName(): MethodNameContext {
    return this.getRuleContext(0, MethodNameContext)!;
  }
  public OPEN_BRACKET(): antlr.TerminalNode {
    return this.getToken(RefLangParser.OPEN_BRACKET, 0)!;
  }
  public CLOSE_BRACKET(): antlr.TerminalNode {
    return this.getToken(RefLangParser.CLOSE_BRACKET, 0)!;
  }
  public NL(): antlr.TerminalNode {
    return this.getToken(RefLangParser.NL, 0)!;
  }
  public GHOSTED(): antlr.TerminalNode | null {
    return this.getToken(RefLangParser.GHOSTED, 0);
  }
  public paramsList(): ParamsListContext | null {
    return this.getRuleContext(0, ParamsListContext);
  }
  public override get ruleIndex(): number {
    return RefLangParser.RULE_abstractProcedure;
  }
  public override enterRule(listener: RefLangListener): void {
    if (listener.enterAbstractProcedure) {
      listener.enterAbstractProcedure(this);
    }
  }
  public override exitRule(listener: RefLangListener): void {
    if (listener.exitAbstractProcedure) {
      listener.exitAbstractProcedure(this);
    }
  }
  public override accept<Result>(visitor: RefLangVisitor<Result>): Result | null {
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
    return this.getToken(RefLangParser.NAME_STARTING_LC, 0)!;
  }
  public override get ruleIndex(): number {
    return RefLangParser.RULE_identifier;
  }
  public override enterRule(listener: RefLangListener): void {
    if (listener.enterIdentifier) {
      listener.enterIdentifier(this);
    }
  }
  public override exitRule(listener: RefLangListener): void {
    if (listener.exitIdentifier) {
      listener.exitIdentifier(this);
    }
  }
  public override accept<Result>(visitor: RefLangVisitor<Result>): Result | null {
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
    return RefLangParser.RULE_assignable;
  }
  public override enterRule(listener: RefLangListener): void {
    if (listener.enterAssignable) {
      listener.enterAssignable(this);
    }
  }
  public override exitRule(listener: RefLangListener): void {
    if (listener.exitAssignable) {
      listener.exitAssignable(this);
    }
  }
  public override accept<Result>(visitor: RefLangVisitor<Result>): Result | null {
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
    return this.getToken(RefLangParser.NAME_STARTING_LC, 0)!;
  }
  public override get ruleIndex(): number {
    return RefLangParser.RULE_methodName;
  }
  public override enterRule(listener: RefLangListener): void {
    if (listener.enterMethodName) {
      listener.enterMethodName(this);
    }
  }
  public override exitRule(listener: RefLangListener): void {
    if (listener.exitMethodName) {
      listener.exitMethodName(this);
    }
  }
  public override accept<Result>(visitor: RefLangVisitor<Result>): Result | null {
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
    return this.getToken(RefLangParser.NAME_STARTING_TEST_, 0)!;
  }
  public override get ruleIndex(): number {
    return RefLangParser.RULE_testName;
  }
  public override enterRule(listener: RefLangListener): void {
    if (listener.enterTestName) {
      listener.enterTestName(this);
    }
  }
  public override exitRule(listener: RefLangListener): void {
    if (listener.exitTestName) {
      listener.exitTestName(this);
    }
  }
  public override accept<Result>(visitor: RefLangVisitor<Result>): Result | null {
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
    return this.getToken(RefLangParser.INT_NAME, 0);
  }
  public FLOAT_NAME(): antlr.TerminalNode | null {
    return this.getToken(RefLangParser.FLOAT_NAME, 0);
  }
  public BOOL_NAME(): antlr.TerminalNode | null {
    return this.getToken(RefLangParser.BOOL_NAME, 0);
  }
  public STRING_NAME(): antlr.TerminalNode | null {
    return this.getToken(RefLangParser.STRING_NAME, 0);
  }
  public LIST_NAME(): antlr.TerminalNode | null {
    return this.getToken(RefLangParser.LIST_NAME, 0);
  }
  public NAME_STARTING_UC(): antlr.TerminalNode | null {
    return this.getToken(RefLangParser.NAME_STARTING_UC, 0);
  }
  public override get ruleIndex(): number {
    return RefLangParser.RULE_typeName;
  }
  public override enterRule(listener: RefLangListener): void {
    if (listener.enterTypeName) {
      listener.enterTypeName(this);
    }
  }
  public override exitRule(listener: RefLangListener): void {
    if (listener.exitTypeName) {
      listener.exitTypeName(this);
    }
  }
  public override accept<Result>(visitor: RefLangVisitor<Result>): Result | null {
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
    return RefLangParser.RULE_constantValue;
  }
  public override enterRule(listener: RefLangListener): void {
    if (listener.enterConstantValue) {
      listener.enterConstantValue(this);
    }
  }
  public override exitRule(listener: RefLangListener): void {
    if (listener.exitConstantValue) {
      listener.exitConstantValue(this);
    }
  }
  public override accept<Result>(visitor: RefLangVisitor<Result>): Result | null {
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
      return this.getTokens(RefLangParser.COMMA);
    } else {
      return this.getToken(RefLangParser.COMMA, i);
    }
  }
  public override get ruleIndex(): number {
    return RefLangParser.RULE_argList;
  }
  public override enterRule(listener: RefLangListener): void {
    if (listener.enterArgList) {
      listener.enterArgList(this);
    }
  }
  public override exitRule(listener: RefLangListener): void {
    if (listener.exitArgList) {
      listener.exitArgList(this);
    }
  }
  public override accept<Result>(visitor: RefLangVisitor<Result>): Result | null {
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
    return RefLangParser.RULE_argument;
  }
  public override enterRule(listener: RefLangListener): void {
    if (listener.enterArgument) {
      listener.enterArgument(this);
    }
  }
  public override exitRule(listener: RefLangListener): void {
    if (listener.exitArgument) {
      listener.exitArgument(this);
    }
  }
  public override accept<Result>(visitor: RefLangVisitor<Result>): Result | null {
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
      return this.getTokens(RefLangParser.COMMA);
    } else {
      return this.getToken(RefLangParser.COMMA, i);
    }
  }
  public override get ruleIndex(): number {
    return RefLangParser.RULE_paramsList;
  }
  public override enterRule(listener: RefLangListener): void {
    if (listener.enterParamsList) {
      listener.enterParamsList(this);
    }
  }
  public override exitRule(listener: RefLangListener): void {
    if (listener.exitParamsList) {
      listener.exitParamsList(this);
    }
  }
  public override accept<Result>(visitor: RefLangVisitor<Result>): Result | null {
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
    return RefLangParser.RULE_type;
  }
  public override enterRule(listener: RefLangListener): void {
    if (listener.enterType) {
      listener.enterType(this);
    }
  }
  public override exitRule(listener: RefLangListener): void {
    if (listener.exitType) {
      listener.exitType(this);
    }
  }
  public override accept<Result>(visitor: RefLangVisitor<Result>): Result | null {
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
      return this.getTokens(RefLangParser.COMMA);
    } else {
      return this.getToken(RefLangParser.COMMA, i);
    }
  }
  public override get ruleIndex(): number {
    return RefLangParser.RULE_enumValuesList;
  }
  public override enterRule(listener: RefLangListener): void {
    if (listener.enterEnumValuesList) {
      listener.enterEnumValuesList(this);
    }
  }
  public override exitRule(listener: RefLangListener): void {
    if (listener.exitEnumValuesList) {
      listener.exitEnumValuesList(this);
    }
  }
  public override accept<Result>(visitor: RefLangVisitor<Result>): Result | null {
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
    return RefLangParser.RULE_assertActual;
  }
  public override enterRule(listener: RefLangListener): void {
    if (listener.enterAssertActual) {
      listener.enterAssertActual(this);
    }
  }
  public override exitRule(listener: RefLangListener): void {
    if (listener.exitAssertActual) {
      listener.exitAssertActual(this);
    }
  }
  public override accept<Result>(visitor: RefLangVisitor<Result>): Result | null {
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
  public litRegExp(): LitRegExpContext | null {
    return this.getRuleContext(0, LitRegExpContext);
  }
  public override get ruleIndex(): number {
    return RefLangParser.RULE_litValue;
  }
  public override enterRule(listener: RefLangListener): void {
    if (listener.enterLitValue) {
      listener.enterLitValue(this);
    }
  }
  public override exitRule(listener: RefLangListener): void {
    if (listener.exitLitValue) {
      listener.exitLitValue(this);
    }
  }
  public override accept<Result>(visitor: RefLangVisitor<Result>): Result | null {
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
    return this.getToken(RefLangParser.TRUE, 0);
  }
  public FALSE(): antlr.TerminalNode | null {
    return this.getToken(RefLangParser.FALSE, 0);
  }
  public override get ruleIndex(): number {
    return RefLangParser.RULE_litBoolean;
  }
  public override enterRule(listener: RefLangListener): void {
    if (listener.enterLitBoolean) {
      listener.enterLitBoolean(this);
    }
  }
  public override exitRule(listener: RefLangListener): void {
    if (listener.exitLitBoolean) {
      listener.exitLitBoolean(this);
    }
  }
  public override accept<Result>(visitor: RefLangVisitor<Result>): Result | null {
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
    return this.getToken(RefLangParser.LITERAL_INTEGER, 0);
  }
  public LITERAL_BINARY(): antlr.TerminalNode | null {
    return this.getToken(RefLangParser.LITERAL_BINARY, 0);
  }
  public LITERAL_HEX(): antlr.TerminalNode | null {
    return this.getToken(RefLangParser.LITERAL_HEX, 0);
  }
  public override get ruleIndex(): number {
    return RefLangParser.RULE_litInt;
  }
  public override enterRule(listener: RefLangListener): void {
    if (listener.enterLitInt) {
      listener.enterLitInt(this);
    }
  }
  public override exitRule(listener: RefLangListener): void {
    if (listener.exitLitInt) {
      listener.exitLitInt(this);
    }
  }
  public override accept<Result>(visitor: RefLangVisitor<Result>): Result | null {
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
    return this.getToken(RefLangParser.LITERAL_FLOAT, 0)!;
  }
  public override get ruleIndex(): number {
    return RefLangParser.RULE_litFloat;
  }
  public override enterRule(listener: RefLangListener): void {
    if (listener.enterLitFloat) {
      listener.enterLitFloat(this);
    }
  }
  public override exitRule(listener: RefLangListener): void {
    if (listener.exitLitFloat) {
      listener.exitLitFloat(this);
    }
  }
  public override accept<Result>(visitor: RefLangVisitor<Result>): Result | null {
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
    return this.getToken(RefLangParser.LITERAL_STRING, 0)!;
  }
  public INTERPOLATED_STRING_PREFIX(): antlr.TerminalNode | null {
    return this.getToken(RefLangParser.INTERPOLATED_STRING_PREFIX, 0);
  }
  public override get ruleIndex(): number {
    return RefLangParser.RULE_litString;
  }
  public override enterRule(listener: RefLangListener): void {
    if (listener.enterLitString) {
      listener.enterLitString(this);
    }
  }
  public override exitRule(listener: RefLangListener): void {
    if (listener.exitLitString) {
      listener.exitLitString(this);
    }
  }
  public override accept<Result>(visitor: RefLangVisitor<Result>): Result | null {
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
    return this.getToken(RefLangParser.DOT, 0)!;
  }
  public identifier(): IdentifierContext {
    return this.getRuleContext(0, IdentifierContext)!;
  }
  public override get ruleIndex(): number {
    return RefLangParser.RULE_enumValue;
  }
  public override enterRule(listener: RefLangListener): void {
    if (listener.enterEnumValue) {
      listener.enterEnumValue(this);
    }
  }
  public override exitRule(listener: RefLangListener): void {
    if (listener.exitEnumValue) {
      listener.exitEnumValue(this);
    }
  }
  public override accept<Result>(visitor: RefLangVisitor<Result>): Result | null {
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
    return this.getToken(RefLangParser.LITERAL_REGEXP, 0)!;
  }
  public override get ruleIndex(): number {
    return RefLangParser.RULE_litRegExp;
  }
  public override enterRule(listener: RefLangListener): void {
    if (listener.enterLitRegExp) {
      listener.enterLitRegExp(this);
    }
  }
  public override exitRule(listener: RefLangListener): void {
    if (listener.exitLitRegExp) {
      listener.exitLitRegExp(this);
    }
  }
  public override accept<Result>(visitor: RefLangVisitor<Result>): Result | null {
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
    return this.getToken(RefLangParser.OPEN_SQ_BRACKET, 0)!;
  }
  public expression(): ExpressionContext {
    return this.getRuleContext(0, ExpressionContext)!;
  }
  public CLOSE_SQ_BRACKET(): antlr.TerminalNode {
    return this.getToken(RefLangParser.CLOSE_SQ_BRACKET, 0)!;
  }
  public override get ruleIndex(): number {
    return RefLangParser.RULE_index;
  }
  public override enterRule(listener: RefLangListener): void {
    if (listener.enterIndex) {
      listener.enterIndex(this);
    }
  }
  public override exitRule(listener: RefLangListener): void {
    if (listener.exitIndex) {
      listener.exitIndex(this);
    }
  }
  public override accept<Result>(visitor: RefLangVisitor<Result>): Result | null {
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
    return RefLangParser.RULE_identifierWithOptIndexes;
  }
  public override enterRule(listener: RefLangListener): void {
    if (listener.enterIdentifierWithOptIndexes) {
      listener.enterIdentifierWithOptIndexes(this);
    }
  }
  public override exitRule(listener: RefLangListener): void {
    if (listener.exitIdentifierWithOptIndexes) {
      listener.exitIdentifierWithOptIndexes(this);
    }
  }
  public override accept<Result>(visitor: RefLangVisitor<Result>): Result | null {
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
    return this.getToken(RefLangParser.THIS_INSTANCE, 0)!;
  }
  public DOT(): antlr.TerminalNode {
    return this.getToken(RefLangParser.DOT, 0)!;
  }
  public identifierWithOptIndexes(): IdentifierWithOptIndexesContext {
    return this.getRuleContext(0, IdentifierWithOptIndexesContext)!;
  }
  public override get ruleIndex(): number {
    return RefLangParser.RULE_propertyRef;
  }
  public override enterRule(listener: RefLangListener): void {
    if (listener.enterPropertyRef) {
      listener.enterPropertyRef(this);
    }
  }
  public override exitRule(listener: RefLangListener): void {
    if (listener.exitPropertyRef) {
      listener.exitPropertyRef(this);
    }
  }
  public override accept<Result>(visitor: RefLangVisitor<Result>): Result | null {
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
  public ifExpression(): IfExpressionContext | null {
    return this.getRuleContext(0, IfExpressionContext);
  }
  public override get ruleIndex(): number {
    return RefLangParser.RULE_expression;
  }
  public override enterRule(listener: RefLangListener): void {
    if (listener.enterExpression) {
      listener.enterExpression(this);
    }
  }
  public override exitRule(listener: RefLangListener): void {
    if (listener.exitExpression) {
      listener.exitExpression(this);
    }
  }
  public override accept<Result>(visitor: RefLangVisitor<Result>): Result | null {
    if (visitor.visitExpression) {
      return visitor.visitExpression(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class IfExpressionContext extends antlr.ParserRuleContext {
  public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
    super(parent, invokingState);
  }
  public IF_(): antlr.TerminalNode {
    return this.getToken(RefLangParser.IF_, 0)!;
  }
  public OPEN_BRACKET(): antlr.TerminalNode {
    return this.getToken(RefLangParser.OPEN_BRACKET, 0)!;
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
      return this.getTokens(RefLangParser.COMMA);
    } else {
      return this.getToken(RefLangParser.COMMA, i);
    }
  }
  public CLOSE_BRACKET(): antlr.TerminalNode {
    return this.getToken(RefLangParser.CLOSE_BRACKET, 0)!;
  }
  public override get ruleIndex(): number {
    return RefLangParser.RULE_ifExpression;
  }
  public override enterRule(listener: RefLangListener): void {
    if (listener.enterIfExpression) {
      listener.enterIfExpression(this);
    }
  }
  public override exitRule(listener: RefLangListener): void {
    if (listener.exitIfExpression) {
      listener.exitIfExpression(this);
    }
  }
  public override accept<Result>(visitor: RefLangVisitor<Result>): Result | null {
    if (visitor.visitIfExpression) {
      return visitor.visitIfExpression(this);
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
    return RefLangParser.RULE_term;
  }
  public override enterRule(listener: RefLangListener): void {
    if (listener.enterTerm) {
      listener.enterTerm(this);
    }
  }
  public override exitRule(listener: RefLangListener): void {
    if (listener.exitTerm) {
      listener.exitTerm(this);
    }
  }
  public override accept<Result>(visitor: RefLangVisitor<Result>): Result | null {
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
    return RefLangParser.RULE_chainHead;
  }
  public override enterRule(listener: RefLangListener): void {
    if (listener.enterChainHead) {
      listener.enterChainHead(this);
    }
  }
  public override exitRule(listener: RefLangListener): void {
    if (listener.exitChainHead) {
      listener.exitChainHead(this);
    }
  }
  public override accept<Result>(visitor: RefLangVisitor<Result>): Result | null {
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
      return this.getTokens(RefLangParser.DOT);
    } else {
      return this.getToken(RefLangParser.DOT, i);
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
    return RefLangParser.RULE_chainTail;
  }
  public override enterRule(listener: RefLangListener): void {
    if (listener.enterChainTail) {
      listener.enterChainTail(this);
    }
  }
  public override exitRule(listener: RefLangListener): void {
    if (listener.exitChainTail) {
      listener.exitChainTail(this);
    }
  }
  public override accept<Result>(visitor: RefLangVisitor<Result>): Result | null {
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
    return RefLangParser.RULE_chainable;
  }
  public override enterRule(listener: RefLangListener): void {
    if (listener.enterChainable) {
      listener.enterChainable(this);
    }
  }
  public override exitRule(listener: RefLangListener): void {
    if (listener.exitChainable) {
      listener.exitChainable(this);
    }
  }
  public override accept<Result>(visitor: RefLangVisitor<Result>): Result | null {
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
    return this.getToken(RefLangParser.THIS_INSTANCE, 0)!;
  }
  public override get ruleIndex(): number {
    return RefLangParser.RULE_thisInstance;
  }
  public override enterRule(listener: RefLangListener): void {
    if (listener.enterThisInstance) {
      listener.enterThisInstance(this);
    }
  }
  public override exitRule(listener: RefLangListener): void {
    if (listener.exitThisInstance) {
      listener.exitThisInstance(this);
    }
  }
  public override accept<Result>(visitor: RefLangVisitor<Result>): Result | null {
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
    return this.getToken(RefLangParser.OPEN_BRACKET, 0)!;
  }
  public expression(): ExpressionContext {
    return this.getRuleContext(0, ExpressionContext)!;
  }
  public CLOSE_BRACKET(): antlr.TerminalNode {
    return this.getToken(RefLangParser.CLOSE_BRACKET, 0)!;
  }
  public override get ruleIndex(): number {
    return RefLangParser.RULE_bracketedExpression;
  }
  public override enterRule(listener: RefLangListener): void {
    if (listener.enterBracketedExpression) {
      listener.enterBracketedExpression(this);
    }
  }
  public override exitRule(listener: RefLangListener): void {
    if (listener.exitBracketedExpression) {
      listener.exitBracketedExpression(this);
    }
  }
  public override accept<Result>(visitor: RefLangVisitor<Result>): Result | null {
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
    return RefLangParser.RULE_unaryExpression;
  }
  public override enterRule(listener: RefLangListener): void {
    if (listener.enterUnaryExpression) {
      listener.enterUnaryExpression(this);
    }
  }
  public override exitRule(listener: RefLangListener): void {
    if (listener.exitUnaryExpression) {
      listener.exitUnaryExpression(this);
    }
  }
  public override accept<Result>(visitor: RefLangVisitor<Result>): Result | null {
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
    return this.getToken(RefLangParser.MINUS, 0)!;
  }
  public term(): TermContext {
    return this.getRuleContext(0, TermContext)!;
  }
  public override get ruleIndex(): number {
    return RefLangParser.RULE_negateNumeric;
  }
  public override enterRule(listener: RefLangListener): void {
    if (listener.enterNegateNumeric) {
      listener.enterNegateNumeric(this);
    }
  }
  public override exitRule(listener: RefLangListener): void {
    if (listener.exitNegateNumeric) {
      listener.exitNegateNumeric(this);
    }
  }
  public override accept<Result>(visitor: RefLangVisitor<Result>): Result | null {
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
    return this.getToken(RefLangParser.NOT, 0)!;
  }
  public term(): TermContext {
    return this.getRuleContext(0, TermContext)!;
  }
  public override get ruleIndex(): number {
    return RefLangParser.RULE_negateLogical;
  }
  public override enterRule(listener: RefLangListener): void {
    if (listener.enterNegateLogical) {
      listener.enterNegateLogical(this);
    }
  }
  public override exitRule(listener: RefLangListener): void {
    if (listener.exitNegateLogical) {
      listener.exitNegateLogical(this);
    }
  }
  public override accept<Result>(visitor: RefLangVisitor<Result>): Result | null {
    if (visitor.visitNegateLogical) {
      return visitor.visitNegateLogical(this);
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
    return RefLangParser.RULE_binaryExpression;
  }
  public override enterRule(listener: RefLangListener): void {
    if (listener.enterBinaryExpression) {
      listener.enterBinaryExpression(this);
    }
  }
  public override exitRule(listener: RefLangListener): void {
    if (listener.exitBinaryExpression) {
      listener.exitBinaryExpression(this);
    }
  }
  public override accept<Result>(visitor: RefLangVisitor<Result>): Result | null {
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
    return this.getToken(RefLangParser.OPEN_SQ_BRACKET, 0)!;
  }
  public expressionList(): ExpressionListContext {
    return this.getRuleContext(0, ExpressionListContext)!;
  }
  public CLOSE_SQ_BRACKET(): antlr.TerminalNode {
    return this.getToken(RefLangParser.CLOSE_SQ_BRACKET, 0)!;
  }
  public override get ruleIndex(): number {
    return RefLangParser.RULE_list;
  }
  public override enterRule(listener: RefLangListener): void {
    if (listener.enterList) {
      listener.enterList(this);
    }
  }
  public override exitRule(listener: RefLangListener): void {
    if (listener.exitList) {
      listener.exitList(this);
    }
  }
  public override accept<Result>(visitor: RefLangVisitor<Result>): Result | null {
    if (visitor.visitList) {
      return visitor.visitList(this);
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
      return this.getTokens(RefLangParser.COMMA);
    } else {
      return this.getToken(RefLangParser.COMMA, i);
    }
  }
  public override get ruleIndex(): number {
    return RefLangParser.RULE_expressionList;
  }
  public override enterRule(listener: RefLangListener): void {
    if (listener.enterExpressionList) {
      listener.enterExpressionList(this);
    }
  }
  public override exitRule(listener: RefLangListener): void {
    if (listener.exitExpressionList) {
      listener.exitExpressionList(this);
    }
  }
  public override accept<Result>(visitor: RefLangVisitor<Result>): Result | null {
    if (visitor.visitExpressionList) {
      return visitor.visitExpressionList(this);
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
    return this.getToken(RefLangParser.OPEN_BRACKET, 0)!;
  }
  public tupleElementList(): TupleElementListContext {
    return this.getRuleContext(0, TupleElementListContext)!;
  }
  public CLOSE_BRACKET(): antlr.TerminalNode {
    return this.getToken(RefLangParser.CLOSE_BRACKET, 0)!;
  }
  public override get ruleIndex(): number {
    return RefLangParser.RULE_tuple;
  }
  public override enterRule(listener: RefLangListener): void {
    if (listener.enterTuple) {
      listener.enterTuple(this);
    }
  }
  public override exitRule(listener: RefLangListener): void {
    if (listener.exitTuple) {
      listener.exitTuple(this);
    }
  }
  public override accept<Result>(visitor: RefLangVisitor<Result>): Result | null {
    if (visitor.visitTuple) {
      return visitor.visitTuple(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class TupleElementListContext extends antlr.ParserRuleContext {
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
      return this.getTokens(RefLangParser.COMMA);
    } else {
      return this.getToken(RefLangParser.COMMA, i);
    }
  }
  public override get ruleIndex(): number {
    return RefLangParser.RULE_tupleElementList;
  }
  public override enterRule(listener: RefLangListener): void {
    if (listener.enterTupleElementList) {
      listener.enterTupleElementList(this);
    }
  }
  public override exitRule(listener: RefLangListener): void {
    if (listener.exitTupleElementList) {
      listener.exitTupleElementList(this);
    }
  }
  public override accept<Result>(visitor: RefLangVisitor<Result>): Result | null {
    if (visitor.visitTupleElementList) {
      return visitor.visitTupleElementList(this);
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
    return this.getToken(RefLangParser.OPEN_SQ_BRACKET, 0)!;
  }
  public kvpList(): KvpListContext {
    return this.getRuleContext(0, KvpListContext)!;
  }
  public CLOSE_SQ_BRACKET(): antlr.TerminalNode {
    return this.getToken(RefLangParser.CLOSE_SQ_BRACKET, 0)!;
  }
  public override get ruleIndex(): number {
    return RefLangParser.RULE_dictionary;
  }
  public override enterRule(listener: RefLangListener): void {
    if (listener.enterDictionary) {
      listener.enterDictionary(this);
    }
  }
  public override exitRule(listener: RefLangListener): void {
    if (listener.exitDictionary) {
      listener.exitDictionary(this);
    }
  }
  public override accept<Result>(visitor: RefLangVisitor<Result>): Result | null {
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
      return this.getTokens(RefLangParser.COMMA);
    } else {
      return this.getToken(RefLangParser.COMMA, i);
    }
  }
  public override get ruleIndex(): number {
    return RefLangParser.RULE_kvpList;
  }
  public override enterRule(listener: RefLangListener): void {
    if (listener.enterKvpList) {
      listener.enterKvpList(this);
    }
  }
  public override exitRule(listener: RefLangListener): void {
    if (listener.exitKvpList) {
      listener.exitKvpList(this);
    }
  }
  public override accept<Result>(visitor: RefLangVisitor<Result>): Result | null {
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
    return this.getToken(RefLangParser.COLON, 0)!;
  }
  public override get ruleIndex(): number {
    return RefLangParser.RULE_kvp;
  }
  public override enterRule(listener: RefLangListener): void {
    if (listener.enterKvp) {
      listener.enterKvp(this);
    }
  }
  public override exitRule(listener: RefLangListener): void {
    if (listener.exitKvp) {
      listener.exitKvp(this);
    }
  }
  public override accept<Result>(visitor: RefLangVisitor<Result>): Result | null {
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
    return this.getToken(RefLangParser.OPEN_BRACKET, 0)!;
  }
  public CLOSE_BRACKET(): antlr.TerminalNode {
    return this.getToken(RefLangParser.CLOSE_BRACKET, 0)!;
  }
  public argList(): ArgListContext | null {
    return this.getRuleContext(0, ArgListContext);
  }
  public override get ruleIndex(): number {
    return RefLangParser.RULE_methodCall;
  }
  public override enterRule(listener: RefLangListener): void {
    if (listener.enterMethodCall) {
      listener.enterMethodCall(this);
    }
  }
  public override exitRule(listener: RefLangListener): void {
    if (listener.exitMethodCall) {
      listener.exitMethodCall(this);
    }
  }
  public override accept<Result>(visitor: RefLangVisitor<Result>): Result | null {
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
    return this.getToken(RefLangParser.EQUAL, 0);
  }
  public NOT_EQUAL(): antlr.TerminalNode | null {
    return this.getToken(RefLangParser.NOT_EQUAL, 0);
  }
  public GT(): antlr.TerminalNode | null {
    return this.getToken(RefLangParser.GT, 0);
  }
  public LT(): antlr.TerminalNode | null {
    return this.getToken(RefLangParser.LT, 0);
  }
  public GE(): antlr.TerminalNode | null {
    return this.getToken(RefLangParser.GE, 0);
  }
  public LE(): antlr.TerminalNode | null {
    return this.getToken(RefLangParser.LE, 0);
  }
  public MULT(): antlr.TerminalNode | null {
    return this.getToken(RefLangParser.MULT, 0);
  }
  public DIVIDE(): antlr.TerminalNode | null {
    return this.getToken(RefLangParser.DIVIDE, 0);
  }
  public PLUS(): antlr.TerminalNode | null {
    return this.getToken(RefLangParser.PLUS, 0);
  }
  public MINUS(): antlr.TerminalNode | null {
    return this.getToken(RefLangParser.MINUS, 0);
  }
  public AND(): antlr.TerminalNode | null {
    return this.getToken(RefLangParser.AND, 0);
  }
  public OR(): antlr.TerminalNode | null {
    return this.getToken(RefLangParser.OR, 0);
  }
  public MOD(): antlr.TerminalNode | null {
    return this.getToken(RefLangParser.MOD, 0);
  }
  public override get ruleIndex(): number {
    return RefLangParser.RULE_binaryOperator;
  }
  public override enterRule(listener: RefLangListener): void {
    if (listener.enterBinaryOperator) {
      listener.enterBinaryOperator(this);
    }
  }
  public override exitRule(listener: RefLangListener): void {
    if (listener.exitBinaryOperator) {
      listener.exitBinaryOperator(this);
    }
  }
  public override accept<Result>(visitor: RefLangVisitor<Result>): Result | null {
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
  public NEW(): antlr.TerminalNode {
    return this.getToken(RefLangParser.NEW, 0)!;
  }
  public type(): TypeContext {
    return this.getRuleContext(0, TypeContext)!;
  }
  public OPEN_BRACKET(): antlr.TerminalNode {
    return this.getToken(RefLangParser.OPEN_BRACKET, 0)!;
  }
  public CLOSE_BRACKET(): antlr.TerminalNode {
    return this.getToken(RefLangParser.CLOSE_BRACKET, 0)!;
  }
  public argList(): ArgListContext | null {
    return this.getRuleContext(0, ArgListContext);
  }
  public override get ruleIndex(): number {
    return RefLangParser.RULE_newInstance;
  }
  public override enterRule(listener: RefLangListener): void {
    if (listener.enterNewInstance) {
      listener.enterNewInstance(this);
    }
  }
  public override exitRule(listener: RefLangListener): void {
    if (listener.exitNewInstance) {
      listener.exitNewInstance(this);
    }
  }
  public override accept<Result>(visitor: RefLangVisitor<Result>): Result | null {
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
  public AS(): antlr.TerminalNode {
    return this.getToken(RefLangParser.AS, 0)!;
  }
  public type(): TypeContext {
    return this.getRuleContext(0, TypeContext)!;
  }
  public override get ruleIndex(): number {
    return RefLangParser.RULE_paramDef;
  }
  public override enterRule(listener: RefLangListener): void {
    if (listener.enterParamDef) {
      listener.enterParamDef(this);
    }
  }
  public override exitRule(listener: RefLangListener): void {
    if (listener.exitParamDef) {
      listener.exitParamDef(this);
    }
  }
  public override accept<Result>(visitor: RefLangVisitor<Result>): Result | null {
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
  public LT(): antlr.TerminalNode {
    return this.getToken(RefLangParser.LT, 0)!;
  }
  public OF(): antlr.TerminalNode {
    return this.getToken(RefLangParser.OF, 0)!;
  }
  public type_(): TypeContext[];
  public type_(i: number): TypeContext | null;
  public type_(i?: number): TypeContext[] | TypeContext | null {
    if (i === undefined) {
      return this.getRuleContexts(TypeContext);
    }

    return this.getRuleContext(i, TypeContext);
  }
  public GT(): antlr.TerminalNode {
    return this.getToken(RefLangParser.GT, 0)!;
  }
  public COMMA(): antlr.TerminalNode[];
  public COMMA(i: number): antlr.TerminalNode | null;
  public COMMA(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    if (i === undefined) {
      return this.getTokens(RefLangParser.COMMA);
    } else {
      return this.getToken(RefLangParser.COMMA, i);
    }
  }
  public override get ruleIndex(): number {
    return RefLangParser.RULE_typeGeneric;
  }
  public override enterRule(listener: RefLangListener): void {
    if (listener.enterTypeGeneric) {
      listener.enterTypeGeneric(this);
    }
  }
  public override exitRule(listener: RefLangListener): void {
    if (listener.exitTypeGeneric) {
      listener.exitTypeGeneric(this);
    }
  }
  public override accept<Result>(visitor: RefLangVisitor<Result>): Result | null {
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
    return this.getToken(RefLangParser.FUNC_NAME, 0)!;
  }
  public LT(): antlr.TerminalNode {
    return this.getToken(RefLangParser.LT, 0)!;
  }
  public OF(): antlr.TerminalNode {
    return this.getToken(RefLangParser.OF, 0)!;
  }
  public type_(): TypeContext[];
  public type_(i: number): TypeContext | null;
  public type_(i?: number): TypeContext[] | TypeContext | null {
    if (i === undefined) {
      return this.getRuleContexts(TypeContext);
    }

    return this.getRuleContext(i, TypeContext);
  }
  public ARROW(): antlr.TerminalNode {
    return this.getToken(RefLangParser.ARROW, 0)!;
  }
  public GT(): antlr.TerminalNode {
    return this.getToken(RefLangParser.GT, 0)!;
  }
  public COMMA(): antlr.TerminalNode[];
  public COMMA(i: number): antlr.TerminalNode | null;
  public COMMA(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    if (i === undefined) {
      return this.getTokens(RefLangParser.COMMA);
    } else {
      return this.getToken(RefLangParser.COMMA, i);
    }
  }
  public override get ruleIndex(): number {
    return RefLangParser.RULE_typeFunc;
  }
  public override enterRule(listener: RefLangListener): void {
    if (listener.enterTypeFunc) {
      listener.enterTypeFunc(this);
    }
  }
  public override exitRule(listener: RefLangListener): void {
    if (listener.exitTypeFunc) {
      listener.exitTypeFunc(this);
    }
  }
  public override accept<Result>(visitor: RefLangVisitor<Result>): Result | null {
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
  public OPEN_BRACKET(): antlr.TerminalNode {
    return this.getToken(RefLangParser.OPEN_BRACKET, 0)!;
  }
  public type_(): TypeContext[];
  public type_(i: number): TypeContext | null;
  public type_(i?: number): TypeContext[] | TypeContext | null {
    if (i === undefined) {
      return this.getRuleContexts(TypeContext);
    }

    return this.getRuleContext(i, TypeContext);
  }
  public CLOSE_BRACKET(): antlr.TerminalNode {
    return this.getToken(RefLangParser.CLOSE_BRACKET, 0)!;
  }
  public COMMA(): antlr.TerminalNode[];
  public COMMA(i: number): antlr.TerminalNode | null;
  public COMMA(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    if (i === undefined) {
      return this.getTokens(RefLangParser.COMMA);
    } else {
      return this.getToken(RefLangParser.COMMA, i);
    }
  }
  public override get ruleIndex(): number {
    return RefLangParser.RULE_typeTuple;
  }
  public override enterRule(listener: RefLangListener): void {
    if (listener.enterTypeTuple) {
      listener.enterTypeTuple(this);
    }
  }
  public override exitRule(listener: RefLangListener): void {
    if (listener.exitTypeTuple) {
      listener.exitTypeTuple(this);
    }
  }
  public override accept<Result>(visitor: RefLangVisitor<Result>): Result | null {
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
    return this.getToken(RefLangParser.LAMBDA, 0)!;
  }
  public ARROW(): antlr.TerminalNode {
    return this.getToken(RefLangParser.ARROW, 0)!;
  }
  public expression(): ExpressionContext {
    return this.getRuleContext(0, ExpressionContext)!;
  }
  public paramsList(): ParamsListContext | null {
    return this.getRuleContext(0, ParamsListContext);
  }
  public argList(): ArgListContext | null {
    return this.getRuleContext(0, ArgListContext);
  }
  public override get ruleIndex(): number {
    return RefLangParser.RULE_lambda;
  }
  public override enterRule(listener: RefLangListener): void {
    if (listener.enterLambda) {
      listener.enterLambda(this);
    }
  }
  public override exitRule(listener: RefLangListener): void {
    if (listener.exitLambda) {
      listener.exitLambda(this);
    }
  }
  public override accept<Result>(visitor: RefLangVisitor<Result>): Result | null {
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
  public INTERPOLATED_STRING_PREFIX(): antlr.TerminalNode {
    return this.getToken(RefLangParser.INTERPOLATED_STRING_PREFIX, 0)!;
  }
  public LITERAL_STRING(): antlr.TerminalNode {
    return this.getToken(RefLangParser.LITERAL_STRING, 0)!;
  }
  public override get ruleIndex(): number {
    return RefLangParser.RULE_interpolatedString;
  }
  public override enterRule(listener: RefLangListener): void {
    if (listener.enterInterpolatedString) {
      listener.enterInterpolatedString(this);
    }
  }
  public override exitRule(listener: RefLangListener): void {
    if (listener.exitInterpolatedString) {
      listener.exitInterpolatedString(this);
    }
  }
  public override accept<Result>(visitor: RefLangVisitor<Result>): Result | null {
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
    return this.getToken(RefLangParser.POWER, 0)!;
  }
  public override get ruleIndex(): number {
    return RefLangParser.RULE_power;
  }
  public override enterRule(listener: RefLangListener): void {
    if (listener.enterPower) {
      listener.enterPower(this);
    }
  }
  public override exitRule(listener: RefLangListener): void {
    if (listener.exitPower) {
      listener.exitPower(this);
    }
  }
  public override accept<Result>(visitor: RefLangVisitor<Result>): Result | null {
    if (visitor.visitPower) {
      return visitor.visitPower(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}
