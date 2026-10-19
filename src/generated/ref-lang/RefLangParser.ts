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
  public static readonly INTERPOLATED_STRING = 106;
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
  public static readonly RULE_print = 16;
  public static readonly RULE_variableDefinition = 17;
  public static readonly RULE_assignment = 18;
  public static readonly RULE_inputStatement = 19;
  public static readonly RULE_ifStatement = 20;
  public static readonly RULE_whileLoop = 21;
  public static readonly RULE_forLoop = 22;
  public static readonly RULE_procedureCall = 23;
  public static readonly RULE_procRef = 24;
  public static readonly RULE_thisProcRef = 25;
  public static readonly RULE_instanceProcRef = 26;
  public static readonly RULE_identifierWithOptIndexes = 27;
  public static readonly RULE_tryStatement = 28;
  public static readonly RULE_throwStatement = 29;
  public static readonly RULE_errorMessage = 30;
  public static readonly RULE_assert = 31;
  public static readonly RULE_returnStatement = 32;
  public static readonly RULE_elseIfClause = 33;
  public static readonly RULE_elseClause = 34;
  public static readonly RULE_catchStatement = 35;
  public static readonly RULE_constructorMember = 36;
  public static readonly RULE_property = 37;
  public static readonly RULE_functionMethod = 38;
  public static readonly RULE_procedureMethod = 39;
  public static readonly RULE_abstractFunction = 40;
  public static readonly RULE_abstractProcedure = 41;
  public static readonly RULE_identifierDef = 42;
  public static readonly RULE_identifierUse = 43;
  public static readonly RULE_assignable = 44;
  public static readonly RULE_methodName = 45;
  public static readonly RULE_testName = 46;
  public static readonly RULE_typeName = 47;
  public static readonly RULE_constantValue = 48;
  public static readonly RULE_argList = 49;
  public static readonly RULE_argument = 50;
  public static readonly RULE_paramList = 51;
  public static readonly RULE_identifierList = 52;
  public static readonly RULE_expressionList = 53;
  public static readonly RULE_type = 54;
  public static readonly RULE_assertActual = 55;
  public static readonly RULE_assertExpected = 56;
  public static readonly RULE_litValue = 57;
  public static readonly RULE_litBoolean = 58;
  public static readonly RULE_litInt = 59;
  public static readonly RULE_litFloat = 60;
  public static readonly RULE_litString = 61;
  public static readonly RULE_interpolatedString = 62;
  public static readonly RULE_enumValue = 63;
  public static readonly RULE_litRegExp = 64;
  public static readonly RULE_index = 65;
  public static readonly RULE_expression = 66;
  public static readonly RULE_term = 67;
  public static readonly RULE_chainable = 68;
  public static readonly RULE_thisInstance = 69;
  public static readonly RULE_bracketedExpression = 70;
  public static readonly RULE_unaryExpression = 71;
  public static readonly RULE_negateNumeric = 72;
  public static readonly RULE_negateLogical = 73;
  public static readonly RULE_binaryExpression = 74;
  public static readonly RULE_list = 75;
  public static readonly RULE_tuple = 76;
  public static readonly RULE_dictionary = 77;
  public static readonly RULE_kvpList = 78;
  public static readonly RULE_kvp = 79;
  public static readonly RULE_methodCall = 80;
  public static readonly RULE_binaryOperator = 81;
  public static readonly RULE_newInstance = 82;
  public static readonly RULE_paramDef = 83;
  public static readonly RULE_typeGeneric = 84;
  public static readonly RULE_typeFunc = 85;
  public static readonly RULE_typeTuple = 86;
  public static readonly RULE_lambda = 87;

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
    "'^'",
    "'0b'",
    "'0x'",
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
    "interpolatedString",
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
        this.state = 177;
        this.errorHandler.sync(this);
        switch (this.interpreter.adaptivePredict(this.tokenStream, 0, this.context)) {
          case 1:
            {
              this.state = 176;
              this.comment();
            }
            break;
        }
        this.state = 182;
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
              this.state = 179;
              this.global();
            }
          }
          this.state = 184;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 188;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (_la === 96) {
          {
            {
              this.state = 185;
              this.match(RefLangParser.NL);
            }
          }
          this.state = 190;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 191;
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
      this.state = 202;
      this.errorHandler.sync(this);
      switch (this.interpreter.adaptivePredict(this.tokenStream, 3, this.context)) {
        case 1:
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 193;
            this.main();
          }
          break;
        case 2:
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 194;
            this.function_();
          }
          break;
        case 3:
          this.enterOuterAlt(localContext, 3);
          {
            this.state = 195;
            this.test();
          }
          break;
        case 4:
          this.enterOuterAlt(localContext, 4);
          {
            this.state = 196;
            this.procedure();
          }
          break;
        case 5:
          this.enterOuterAlt(localContext, 5);
          {
            this.state = 197;
            this.constant();
          }
          break;
        case 6:
          this.enterOuterAlt(localContext, 6);
          {
            this.state = 198;
            this.enum_();
          }
          break;
        case 7:
          this.enterOuterAlt(localContext, 7);
          {
            this.state = 199;
            this.concreteClass();
          }
          break;
        case 8:
          this.enterOuterAlt(localContext, 8);
          {
            this.state = 200;
            this.abstractClass();
          }
          break;
        case 9:
          this.enterOuterAlt(localContext, 9);
          {
            this.state = 201;
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
        this.state = 205;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 109) {
          {
            this.state = 204;
            this.match(RefLangParser.GHOSTED);
          }
        }

        this.state = 207;
        this.match(RefLangParser.MAIN);
        this.state = 208;
        this.match(RefLangParser.NL);
        this.state = 212;
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
              this.state = 209;
              this.ordinaryStatement();
            }
          }
          this.state = 214;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 215;
        this.match(RefLangParser.END);
        this.state = 216;
        this.match(RefLangParser.MAIN);
        this.state = 217;
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
        this.state = 220;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 109) {
          {
            this.state = 219;
            this.match(RefLangParser.GHOSTED);
          }
        }

        this.state = 222;
        this.match(RefLangParser.FUNCTION);
        this.state = 223;
        this.methodName();
        this.state = 224;
        this.match(RefLangParser.OPEN_BRACKET);
        this.state = 226;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 98) {
          {
            this.state = 225;
            this.paramList();
          }
        }

        this.state = 228;
        this.match(RefLangParser.CLOSE_BRACKET);
        this.state = 229;
        this.match(RefLangParser.RETURNS);
        this.state = 230;
        this.type_();
        this.state = 231;
        this.match(RefLangParser.NL);
        this.state = 235;
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
        this.match(RefLangParser.END);
        this.state = 240;
        this.match(RefLangParser.FUNCTION);
        this.state = 241;
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
        this.state = 244;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 109) {
          {
            this.state = 243;
            this.match(RefLangParser.GHOSTED);
          }
        }

        this.state = 246;
        this.match(RefLangParser.TEST);
        this.state = 247;
        this.testName();
        this.state = 248;
        this.match(RefLangParser.NL);
        this.state = 252;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (_la === 17 || _la === 44 || _la === 109 || _la === 125) {
          {
            {
              this.state = 249;
              this.testStatement();
            }
          }
          this.state = 254;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 255;
        this.match(RefLangParser.END);
        this.state = 256;
        this.match(RefLangParser.TEST);
        this.state = 257;
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
  public testStatement(): TestStatementContext {
    let localContext = new TestStatementContext(this.context, this.state);
    this.enterRule(localContext, 10, RefLangParser.RULE_testStatement);
    try {
      this.state = 262;
      this.errorHandler.sync(this);
      switch (this.interpreter.adaptivePredict(this.tokenStream, 11, this.context)) {
        case 1:
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 259;
            this.assert();
          }
          break;
        case 2:
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 260;
            this.variableDefinition();
          }
          break;
        case 3:
          this.enterOuterAlt(localContext, 3);
          {
            this.state = 261;
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
    this.enterRule(localContext, 12, RefLangParser.RULE_procedure);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 265;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 109) {
          {
            this.state = 264;
            this.match(RefLangParser.GHOSTED);
          }
        }

        this.state = 267;
        this.match(RefLangParser.PROCEDURE);
        this.state = 268;
        this.methodName();
        this.state = 269;
        this.match(RefLangParser.OPEN_BRACKET);
        this.state = 271;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 98) {
          {
            this.state = 270;
            this.paramList();
          }
        }

        this.state = 273;
        this.match(RefLangParser.CLOSE_BRACKET);
        this.state = 274;
        this.match(RefLangParser.NL);
        this.state = 278;
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
              this.state = 275;
              this.ordinaryStatement();
            }
          }
          this.state = 280;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 281;
        this.match(RefLangParser.END);
        this.state = 282;
        this.match(RefLangParser.PROCEDURE);
        this.state = 283;
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
    this.enterRule(localContext, 14, RefLangParser.RULE_constant);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 286;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 109) {
          {
            this.state = 285;
            this.match(RefLangParser.GHOSTED);
          }
        }

        this.state = 288;
        this.match(RefLangParser.CONSTANT);
        this.state = 289;
        this.identifierDef();
        this.state = 290;
        this.match(RefLangParser.SET);
        this.state = 291;
        this.match(RefLangParser.TO);
        this.state = 292;
        this.constantValue();
        this.state = 293;
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
    this.enterRule(localContext, 16, RefLangParser.RULE_enum);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 296;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 109) {
          {
            this.state = 295;
            this.match(RefLangParser.GHOSTED);
          }
        }

        this.state = 298;
        this.match(RefLangParser.ENUM);
        this.state = 299;
        this.typeName();
        this.state = 300;
        this.identifierList();
        this.state = 301;
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
    this.enterRule(localContext, 18, RefLangParser.RULE_concreteClass);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 304;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 109) {
          {
            this.state = 303;
            this.match(RefLangParser.GHOSTED);
          }
        }

        this.state = 306;
        this.match(RefLangParser.CLASS);
        this.state = 307;
        localContext._classTypeName = this.typeName();
        this.state = 310;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 30) {
          {
            this.state = 308;
            this.match(RefLangParser.INHERITS);
            this.state = 309;
            localContext._inheritsTypeName = this.typeName();
          }
        }

        this.state = 312;
        this.match(RefLangParser.NL);
        this.state = 316;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (
          (((_la - 23) & ~0x1f) === 0 && ((1 << (_la - 23)) & 14401) !== 0) ||
          _la === 109 ||
          _la === 125
        ) {
          {
            {
              this.state = 313;
              this.concreteClassMember();
            }
          }
          this.state = 318;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 319;
        this.match(RefLangParser.END);
        this.state = 320;
        this.match(RefLangParser.CLASS);
        this.state = 321;
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
  public concreteClassMember(): ConcreteClassMemberContext {
    let localContext = new ConcreteClassMemberContext(this.context, this.state);
    this.enterRule(localContext, 20, RefLangParser.RULE_concreteClassMember);
    try {
      this.state = 328;
      this.errorHandler.sync(this);
      switch (this.interpreter.adaptivePredict(this.tokenStream, 20, this.context)) {
        case 1:
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 323;
            this.constructorMember();
          }
          break;
        case 2:
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 324;
            this.property();
          }
          break;
        case 3:
          this.enterOuterAlt(localContext, 3);
          {
            this.state = 325;
            this.functionMethod();
          }
          break;
        case 4:
          this.enterOuterAlt(localContext, 4);
          {
            this.state = 326;
            this.procedureMethod();
          }
          break;
        case 5:
          this.enterOuterAlt(localContext, 5);
          {
            this.state = 327;
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
    this.enterRule(localContext, 22, RefLangParser.RULE_abstractClass);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 331;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 109) {
          {
            this.state = 330;
            this.match(RefLangParser.GHOSTED);
          }
        }

        this.state = 333;
        this.match(RefLangParser.ABSTRACT);
        this.state = 334;
        this.match(RefLangParser.CLASS);
        this.state = 335;
        localContext._classTypeName = this.typeName();
        this.state = 338;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 30) {
          {
            this.state = 336;
            this.match(RefLangParser.INHERITS);
            this.state = 337;
            localContext._inheritsTypeName = this.typeName();
          }
        }

        this.state = 340;
        this.match(RefLangParser.NL);
        this.state = 344;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (
          (((_la - 16) & ~0x1f) === 0 && ((1 << (_la - 16)) & 1843201) !== 0) ||
          _la === 109 ||
          _la === 125
        ) {
          {
            {
              this.state = 341;
              this.abstractClassMember();
            }
          }
          this.state = 346;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 347;
        this.match(RefLangParser.END);
        this.state = 348;
        this.match(RefLangParser.CLASS);
        this.state = 349;
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
  public abstractClassMember(): AbstractClassMemberContext {
    let localContext = new AbstractClassMemberContext(this.context, this.state);
    this.enterRule(localContext, 24, RefLangParser.RULE_abstractClassMember);
    try {
      this.state = 357;
      this.errorHandler.sync(this);
      switch (this.interpreter.adaptivePredict(this.tokenStream, 24, this.context)) {
        case 1:
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 351;
            this.property();
          }
          break;
        case 2:
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 352;
            this.functionMethod();
          }
          break;
        case 3:
          this.enterOuterAlt(localContext, 3);
          {
            this.state = 353;
            this.procedureMethod();
          }
          break;
        case 4:
          this.enterOuterAlt(localContext, 4);
          {
            this.state = 354;
            this.abstractFunction();
          }
          break;
        case 5:
          this.enterOuterAlt(localContext, 5);
          {
            this.state = 355;
            this.abstractProcedure();
          }
          break;
        case 6:
          this.enterOuterAlt(localContext, 6);
          {
            this.state = 356;
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
    this.enterRule(localContext, 26, RefLangParser.RULE_comment);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 359;
        this.commentText();
        this.state = 360;
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
    this.enterRule(localContext, 28, RefLangParser.RULE_commentText);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 362;
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
    this.enterRule(localContext, 30, RefLangParser.RULE_ordinaryStatement);
    try {
      this.state = 375;
      this.errorHandler.sync(this);
      switch (this.interpreter.adaptivePredict(this.tokenStream, 25, this.context)) {
        case 1:
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 364;
            this.print();
          }
          break;
        case 2:
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 365;
            this.variableDefinition();
          }
          break;
        case 3:
          this.enterOuterAlt(localContext, 3);
          {
            this.state = 366;
            this.assignment();
          }
          break;
        case 4:
          this.enterOuterAlt(localContext, 4);
          {
            this.state = 367;
            this.inputStatement();
          }
          break;
        case 5:
          this.enterOuterAlt(localContext, 5);
          {
            this.state = 368;
            this.ifStatement();
          }
          break;
        case 6:
          this.enterOuterAlt(localContext, 6);
          {
            this.state = 369;
            this.whileLoop();
          }
          break;
        case 7:
          this.enterOuterAlt(localContext, 7);
          {
            this.state = 370;
            this.forLoop();
          }
          break;
        case 8:
          this.enterOuterAlt(localContext, 8);
          {
            this.state = 371;
            this.procedureCall();
          }
          break;
        case 9:
          this.enterOuterAlt(localContext, 9);
          {
            this.state = 372;
            this.tryStatement();
          }
          break;
        case 10:
          this.enterOuterAlt(localContext, 10);
          {
            this.state = 373;
            this.throwStatement();
          }
          break;
        case 11:
          this.enterOuterAlt(localContext, 11);
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
  public print(): PrintContext {
    let localContext = new PrintContext(this.context, this.state);
    this.enterRule(localContext, 32, RefLangParser.RULE_print);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 378;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 109) {
          {
            this.state = 377;
            this.match(RefLangParser.GHOSTED);
          }
        }

        this.state = 380;
        this.match(RefLangParser.PRINT);
        this.state = 381;
        this.match(RefLangParser.OPEN_BRACKET);
        this.state = 383;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (
          _la === 15 ||
          _la === 32 ||
          (((_la - 57) & ~0x1f) === 0 && ((1 << (_la - 57)) & 1094976735) !== 0) ||
          (((_la - 98) & ~0x1f) === 0 && ((1 << (_la - 98)) & 511) !== 0)
        ) {
          {
            this.state = 382;
            this.expression();
          }
        }

        this.state = 385;
        this.match(RefLangParser.CLOSE_BRACKET);
        this.state = 386;
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
    this.enterRule(localContext, 34, RefLangParser.RULE_variableDefinition);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 389;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 109) {
          {
            this.state = 388;
            this.match(RefLangParser.GHOSTED);
          }
        }

        this.state = 391;
        this.match(RefLangParser.VARIABLE);
        this.state = 392;
        this.identifierDef();
        this.state = 393;
        this.match(RefLangParser.SET);
        this.state = 394;
        this.match(RefLangParser.TO);
        this.state = 395;
        this.expression();
        this.state = 396;
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
    this.enterRule(localContext, 36, RefLangParser.RULE_assignment);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 399;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 109) {
          {
            this.state = 398;
            this.match(RefLangParser.GHOSTED);
          }
        }

        this.state = 401;
        this.match(RefLangParser.ASSIGN);
        this.state = 402;
        this.assignable(0);
        this.state = 403;
        this.match(RefLangParser.TO);
        this.state = 404;
        this.expression();
        this.state = 405;
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
    this.enterRule(localContext, 38, RefLangParser.RULE_inputStatement);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 408;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 109) {
          {
            this.state = 407;
            this.match(RefLangParser.GHOSTED);
          }
        }

        this.state = 410;
        this.match(RefLangParser.INPUT);
        this.state = 411;
        this.identifierDef();
        this.state = 412;
        this.match(RefLangParser.SET);
        this.state = 413;
        this.match(RefLangParser.TO);
        this.state = 414;
        this.methodName();
        this.state = 415;
        this.match(RefLangParser.OPEN_BRACKET);
        this.state = 416;
        this.expression();
        this.state = 417;
        this.match(RefLangParser.CLOSE_BRACKET);
        this.state = 418;
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
  public ifStatement(): IfStatementContext {
    let localContext = new IfStatementContext(this.context, this.state);
    this.enterRule(localContext, 40, RefLangParser.RULE_ifStatement);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 421;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 109) {
          {
            this.state = 420;
            this.match(RefLangParser.GHOSTED);
          }
        }

        this.state = 423;
        this.match(RefLangParser.IF);
        this.state = 424;
        localContext._condition = this.expression();
        this.state = 425;
        this.match(RefLangParser.THEN);
        this.state = 426;
        this.match(RefLangParser.NL);
        this.state = 432;
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
            this.state = 430;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 32, this.context)) {
              case 1:
                {
                  this.state = 427;
                  this.elseIfClause();
                }
                break;
              case 2:
                {
                  this.state = 428;
                  this.elseClause();
                }
                break;
              case 3:
                {
                  this.state = 429;
                  this.ordinaryStatement();
                }
                break;
            }
          }
          this.state = 434;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 435;
        this.match(RefLangParser.END);
        this.state = 436;
        this.match(RefLangParser.IF);
        this.state = 437;
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
    this.enterRule(localContext, 42, RefLangParser.RULE_whileLoop);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 440;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 109) {
          {
            this.state = 439;
            this.match(RefLangParser.GHOSTED);
          }
        }

        this.state = 442;
        this.match(RefLangParser.WHILE);
        this.state = 443;
        localContext._condition = this.expression();
        this.state = 444;
        this.match(RefLangParser.NL);
        this.state = 448;
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
              this.state = 445;
              this.ordinaryStatement();
            }
          }
          this.state = 450;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 451;
        this.match(RefLangParser.END);
        this.state = 452;
        this.match(RefLangParser.WHILE);
        this.state = 453;
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
    this.enterRule(localContext, 44, RefLangParser.RULE_forLoop);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 456;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 109) {
          {
            this.state = 455;
            this.match(RefLangParser.GHOSTED);
          }
        }

        this.state = 458;
        this.match(RefLangParser.FOR);
        this.state = 459;
        this.identifierDef();
        this.state = 460;
        this.match(RefLangParser.IN);
        this.state = 461;
        this.expression();
        this.state = 462;
        this.match(RefLangParser.NL);
        this.state = 466;
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
              this.state = 463;
              this.ordinaryStatement();
            }
          }
          this.state = 468;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 469;
        this.match(RefLangParser.END);
        this.state = 470;
        this.match(RefLangParser.FOR);
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
  public procedureCall(): ProcedureCallContext {
    let localContext = new ProcedureCallContext(this.context, this.state);
    this.enterRule(localContext, 46, RefLangParser.RULE_procedureCall);
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
        this.match(RefLangParser.CALL);
        this.state = 477;
        this.procRef();
        this.state = 478;
        this.match(RefLangParser.OPEN_BRACKET);
        this.state = 479;
        this.argList();
        this.state = 480;
        this.match(RefLangParser.CLOSE_BRACKET);
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
  public procRef(): ProcRefContext {
    let localContext = new ProcRefContext(this.context, this.state);
    this.enterRule(localContext, 48, RefLangParser.RULE_procRef);
    try {
      this.state = 486;
      this.errorHandler.sync(this);
      switch (this.interpreter.adaptivePredict(this.tokenStream, 39, this.context)) {
        case 1:
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 483;
            this.methodName();
          }
          break;
        case 2:
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 484;
            this.thisProcRef();
          }
          break;
        case 3:
          this.enterOuterAlt(localContext, 3);
          {
            this.state = 485;
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
    this.enterRule(localContext, 50, RefLangParser.RULE_thisProcRef);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 488;
        this.match(RefLangParser.THIS_INSTANCE);
        this.state = 489;
        this.match(RefLangParser.DOT);
        this.state = 490;
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
    this.enterRule(localContext, 52, RefLangParser.RULE_instanceProcRef);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 492;
        this.identifierWithOptIndexes();
        this.state = 493;
        this.match(RefLangParser.DOT);
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
  public identifierWithOptIndexes(): IdentifierWithOptIndexesContext {
    let localContext = new IdentifierWithOptIndexesContext(this.context, this.state);
    this.enterRule(localContext, 54, RefLangParser.RULE_identifierWithOptIndexes);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 496;
        this.identifierUse();
        this.state = 500;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (_la === 79) {
          {
            {
              this.state = 497;
              this.index();
            }
          }
          this.state = 502;
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
    this.enterRule(localContext, 56, RefLangParser.RULE_tryStatement);
    let _la: number;
    try {
      let alternative: number;
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 504;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 109) {
          {
            this.state = 503;
            this.match(RefLangParser.GHOSTED);
          }
        }

        this.state = 506;
        this.match(RefLangParser.TRY);
        this.state = 507;
        this.match(RefLangParser.NL);
        this.state = 511;
        this.errorHandler.sync(this);
        alternative = this.interpreter.adaptivePredict(this.tokenStream, 42, this.context);
        while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
          if (alternative === 1) {
            {
              {
                this.state = 508;
                this.ordinaryStatement();
              }
            }
          }
          this.state = 513;
          this.errorHandler.sync(this);
          alternative = this.interpreter.adaptivePredict(this.tokenStream, 42, this.context);
        }
        this.state = 514;
        this.catchStatement();
        this.state = 518;
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
              this.state = 515;
              this.ordinaryStatement();
            }
          }
          this.state = 520;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 521;
        this.match(RefLangParser.END);
        this.state = 522;
        this.match(RefLangParser.TRY);
        this.state = 523;
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
  public throwStatement(): ThrowStatementContext {
    let localContext = new ThrowStatementContext(this.context, this.state);
    this.enterRule(localContext, 58, RefLangParser.RULE_throwStatement);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 526;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 109) {
          {
            this.state = 525;
            this.match(RefLangParser.GHOSTED);
          }
        }

        this.state = 528;
        this.match(RefLangParser.THROW);
        this.state = 529;
        this.typeName();
        this.state = 530;
        this.errorMessage();
        this.state = 531;
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
  public errorMessage(): ErrorMessageContext {
    let localContext = new ErrorMessageContext(this.context, this.state);
    this.enterRule(localContext, 60, RefLangParser.RULE_errorMessage);
    try {
      this.state = 535;
      this.errorHandler.sync(this);
      switch (this.tokenStream.LA(1)) {
        case RefLangParser.LITERAL_STRING:
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 533;
            this.litString();
          }
          break;
        case RefLangParser.NAME_STARTING_LC:
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 534;
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
    this.enterRule(localContext, 62, RefLangParser.RULE_assert);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 538;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 109) {
          {
            this.state = 537;
            this.match(RefLangParser.GHOSTED);
          }
        }

        this.state = 540;
        this.match(RefLangParser.ASSERT);
        this.state = 541;
        this.assertActual();
        this.state = 542;
        this.match(RefLangParser.EVALUATES);
        this.state = 543;
        this.match(RefLangParser.TO);
        this.state = 544;
        this.assertExpected();
        this.state = 545;
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
    this.enterRule(localContext, 64, RefLangParser.RULE_returnStatement);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 547;
        this.match(RefLangParser.RETURN);
        this.state = 548;
        this.expression();
        this.state = 549;
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
    this.enterRule(localContext, 66, RefLangParser.RULE_elseIfClause);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 552;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 109) {
          {
            this.state = 551;
            this.match(RefLangParser.GHOSTED);
          }
        }

        this.state = 554;
        this.match(RefLangParser.ELIF);
        this.state = 555;
        this.expression();
        this.state = 556;
        this.match(RefLangParser.THEN);
        this.state = 557;
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
    this.enterRule(localContext, 68, RefLangParser.RULE_elseClause);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 560;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 109) {
          {
            this.state = 559;
            this.match(RefLangParser.GHOSTED);
          }
        }

        this.state = 562;
        this.match(RefLangParser.ELSE);
        this.state = 563;
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
    this.enterRule(localContext, 70, RefLangParser.RULE_catchStatement);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 566;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 109) {
          {
            this.state = 565;
            this.match(RefLangParser.GHOSTED);
          }
        }

        this.state = 568;
        this.match(RefLangParser.CATCH);
        this.state = 569;
        this.identifierDef();
        this.state = 570;
        this.match(RefLangParser.AS);
        this.state = 571;
        this.typeName();
        this.state = 572;
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
    this.enterRule(localContext, 72, RefLangParser.RULE_constructorMember);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 575;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 109) {
          {
            this.state = 574;
            this.match(RefLangParser.GHOSTED);
          }
        }

        this.state = 577;
        this.match(RefLangParser.CONSTRUCTOR);
        this.state = 578;
        this.match(RefLangParser.OPEN_BRACKET);
        this.state = 580;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 98) {
          {
            this.state = 579;
            this.paramList();
          }
        }

        this.state = 582;
        this.match(RefLangParser.CLOSE_BRACKET);
        this.state = 583;
        this.match(RefLangParser.NL);
        this.state = 587;
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
              this.state = 584;
              this.ordinaryStatement();
            }
          }
          this.state = 589;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 590;
        this.match(RefLangParser.END);
        this.state = 591;
        this.match(RefLangParser.CONSTRUCTOR);
        this.state = 592;
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
    this.enterRule(localContext, 74, RefLangParser.RULE_property);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 595;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 109) {
          {
            this.state = 594;
            this.match(RefLangParser.GHOSTED);
          }
        }

        this.state = 598;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 34) {
          {
            this.state = 597;
            this.match(RefLangParser.PRIVATE);
          }
        }

        this.state = 600;
        this.match(RefLangParser.PROPERTY);
        this.state = 601;
        this.identifierDef();
        this.state = 602;
        this.match(RefLangParser.AS);
        this.state = 603;
        this.type_();
        this.state = 604;
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
    this.enterRule(localContext, 76, RefLangParser.RULE_functionMethod);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 607;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 109) {
          {
            this.state = 606;
            this.match(RefLangParser.GHOSTED);
          }
        }

        this.state = 610;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 34) {
          {
            this.state = 609;
            this.match(RefLangParser.PRIVATE);
          }
        }

        this.state = 612;
        this.match(RefLangParser.FUNCTION);
        this.state = 613;
        this.methodName();
        this.state = 614;
        this.match(RefLangParser.OPEN_BRACKET);
        this.state = 616;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 98) {
          {
            this.state = 615;
            this.paramList();
          }
        }

        this.state = 618;
        this.match(RefLangParser.CLOSE_BRACKET);
        this.state = 619;
        this.match(RefLangParser.RETURNS);
        this.state = 620;
        this.type_();
        this.state = 621;
        this.match(RefLangParser.NL);
        this.state = 625;
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
              this.state = 622;
              this.ordinaryStatement();
            }
          }
          this.state = 627;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 628;
        this.returnStatement();
        this.state = 629;
        this.match(RefLangParser.END);
        this.state = 630;
        this.match(RefLangParser.FUNCTION);
        this.state = 631;
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
    this.enterRule(localContext, 78, RefLangParser.RULE_procedureMethod);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 634;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 109) {
          {
            this.state = 633;
            this.match(RefLangParser.GHOSTED);
          }
        }

        this.state = 637;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 34) {
          {
            this.state = 636;
            this.match(RefLangParser.PRIVATE);
          }
        }

        this.state = 639;
        this.match(RefLangParser.PROCEDURE);
        this.state = 640;
        this.methodName();
        this.state = 641;
        this.match(RefLangParser.OPEN_BRACKET);
        this.state = 643;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 98) {
          {
            this.state = 642;
            this.paramList();
          }
        }

        this.state = 645;
        this.match(RefLangParser.CLOSE_BRACKET);
        this.state = 646;
        this.match(RefLangParser.NL);
        this.state = 650;
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
              this.state = 647;
              this.ordinaryStatement();
            }
          }
          this.state = 652;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 653;
        this.match(RefLangParser.END);
        this.state = 654;
        this.match(RefLangParser.PROCEDURE);
        this.state = 655;
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
    this.enterRule(localContext, 80, RefLangParser.RULE_abstractFunction);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 658;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 109) {
          {
            this.state = 657;
            this.match(RefLangParser.GHOSTED);
          }
        }

        this.state = 660;
        this.match(RefLangParser.ABSTRACT);
        this.state = 661;
        this.match(RefLangParser.FUNCTION);
        this.state = 662;
        this.methodName();
        this.state = 663;
        this.match(RefLangParser.OPEN_BRACKET);
        this.state = 665;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 98) {
          {
            this.state = 664;
            this.paramList();
          }
        }

        this.state = 667;
        this.match(RefLangParser.CLOSE_BRACKET);
        this.state = 668;
        this.match(RefLangParser.RETURNS);
        this.state = 669;
        this.type_();
        this.state = 670;
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
    this.enterRule(localContext, 82, RefLangParser.RULE_abstractProcedure);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 673;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 109) {
          {
            this.state = 672;
            this.match(RefLangParser.GHOSTED);
          }
        }

        this.state = 675;
        this.match(RefLangParser.ABSTRACT);
        this.state = 676;
        this.match(RefLangParser.PROCEDURE);
        this.state = 677;
        this.methodName();
        this.state = 678;
        this.match(RefLangParser.OPEN_BRACKET);
        this.state = 680;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 98) {
          {
            this.state = 679;
            this.paramList();
          }
        }

        this.state = 682;
        this.match(RefLangParser.CLOSE_BRACKET);
        this.state = 683;
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
  public identifierDef(): IdentifierDefContext {
    let localContext = new IdentifierDefContext(this.context, this.state);
    this.enterRule(localContext, 84, RefLangParser.RULE_identifierDef);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 685;
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
  public identifierUse(): IdentifierUseContext {
    let localContext = new IdentifierUseContext(this.context, this.state);
    this.enterRule(localContext, 86, RefLangParser.RULE_identifierUse);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 687;
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
    let _startState = 88;
    this.enterRecursionRule(localContext, 88, RefLangParser.RULE_assignable, _p);
    try {
      let alternative: number;
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 694;
        this.errorHandler.sync(this);
        switch (this.tokenStream.LA(1)) {
          case RefLangParser.NAME_STARTING_LC:
            {
              this.state = 690;
              this.identifierUse();
            }
            break;
          case RefLangParser.THIS_INSTANCE:
            {
              this.state = 691;
              this.match(RefLangParser.THIS_INSTANCE);
              this.state = 692;
              this.match(RefLangParser.DOT);
              this.state = 693;
              this.identifierUse();
            }
            break;
          default:
            throw new antlr.NoViableAltException(this);
        }
        this.context!.stop = this.tokenStream.LT(-1);
        this.state = 700;
        this.errorHandler.sync(this);
        alternative = this.interpreter.adaptivePredict(this.tokenStream, 68, this.context);
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
                  RefLangParser.RULE_assignable,
                );
                this.state = 696;
                if (!this.precpred(this.context, 1)) {
                  throw this.createFailedPredicateException("this.precpred(this.context, 1)");
                }
                this.state = 697;
                this.index();
              }
            }
          }
          this.state = 702;
          this.errorHandler.sync(this);
          alternative = this.interpreter.adaptivePredict(this.tokenStream, 68, this.context);
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
    this.enterRule(localContext, 90, RefLangParser.RULE_methodName);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 703;
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
    this.enterRule(localContext, 92, RefLangParser.RULE_testName);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 705;
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
    this.enterRule(localContext, 94, RefLangParser.RULE_typeName);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 707;
        _la = this.tokenStream.LA(1);
        if (!((((_la - 57) & ~0x1f) === 0 && ((1 << (_la - 57)) & 31) !== 0) || _la === 99)) {
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
    this.enterRule(localContext, 96, RefLangParser.RULE_constantValue);
    try {
      this.state = 713;
      this.errorHandler.sync(this);
      switch (this.tokenStream.LA(1)) {
        case RefLangParser.TRUE:
        case RefLangParser.FALSE:
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 709;
            this.litBoolean();
          }
          break;
        case RefLangParser.LITERAL_BINARY:
        case RefLangParser.LITERAL_HEX:
        case RefLangParser.LITERAL_INTEGER:
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 710;
            this.litInt();
          }
          break;
        case RefLangParser.LITERAL_FLOAT:
          this.enterOuterAlt(localContext, 3);
          {
            this.state = 711;
            this.litFloat();
          }
          break;
        case RefLangParser.LITERAL_STRING:
          this.enterOuterAlt(localContext, 4);
          {
            this.state = 712;
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
    this.enterRule(localContext, 98, RefLangParser.RULE_argList);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 715;
        this.argument();
        this.state = 720;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (_la === 84) {
          {
            {
              this.state = 716;
              this.match(RefLangParser.COMMA);
              this.state = 717;
              this.argument();
            }
          }
          this.state = 722;
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
    this.enterRule(localContext, 100, RefLangParser.RULE_argument);
    try {
      this.state = 725;
      this.errorHandler.sync(this);
      switch (this.tokenStream.LA(1)) {
        case RefLangParser.LAMBDA:
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 723;
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
        case RefLangParser.INTERPOLATED_STRING:
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 724;
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
  public paramList(): ParamListContext {
    let localContext = new ParamListContext(this.context, this.state);
    this.enterRule(localContext, 102, RefLangParser.RULE_paramList);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 727;
        this.paramDef();
        this.state = 732;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (_la === 84) {
          {
            {
              this.state = 728;
              this.match(RefLangParser.COMMA);
              this.state = 729;
              this.paramDef();
            }
          }
          this.state = 734;
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
    this.enterRule(localContext, 104, RefLangParser.RULE_identifierList);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 735;
        this.identifierDef();
        this.state = 738;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        do {
          {
            {
              this.state = 736;
              this.match(RefLangParser.COMMA);
              this.state = 737;
              this.identifierDef();
            }
          }
          this.state = 740;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        } while (_la === 84);
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
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
    this.enterRule(localContext, 106, RefLangParser.RULE_expressionList);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 742;
        this.expression();
        this.state = 747;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (_la === 84) {
          {
            {
              this.state = 743;
              this.match(RefLangParser.COMMA);
              this.state = 744;
              this.expression();
            }
          }
          this.state = 749;
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
    this.enterRule(localContext, 108, RefLangParser.RULE_type);
    try {
      this.state = 754;
      this.errorHandler.sync(this);
      switch (this.interpreter.adaptivePredict(this.tokenStream, 75, this.context)) {
        case 1:
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 750;
            this.typeTuple();
          }
          break;
        case 2:
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 751;
            this.typeName();
          }
          break;
        case 3:
          this.enterOuterAlt(localContext, 3);
          {
            this.state = 752;
            this.typeGeneric();
          }
          break;
        case 4:
          this.enterOuterAlt(localContext, 4);
          {
            this.state = 753;
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
    this.enterRule(localContext, 110, RefLangParser.RULE_assertActual);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 756;
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
  public assertExpected(): AssertExpectedContext {
    let localContext = new AssertExpectedContext(this.context, this.state);
    this.enterRule(localContext, 112, RefLangParser.RULE_assertExpected);
    try {
      this.state = 763;
      this.errorHandler.sync(this);
      switch (this.interpreter.adaptivePredict(this.tokenStream, 76, this.context)) {
        case 1:
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 758;
            this.litValue();
          }
          break;
        case 2:
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 759;
            this.list();
          }
          break;
        case 3:
          this.enterOuterAlt(localContext, 3);
          {
            this.state = 760;
            this.dictionary();
          }
          break;
        case 4:
          this.enterOuterAlt(localContext, 4);
          {
            this.state = 761;
            this.unaryExpression();
          }
          break;
        case 5:
          this.enterOuterAlt(localContext, 5);
          {
            this.state = 762;
            this.tuple();
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
  public litValue(): LitValueContext {
    let localContext = new LitValueContext(this.context, this.state);
    this.enterRule(localContext, 114, RefLangParser.RULE_litValue);
    try {
      this.state = 772;
      this.errorHandler.sync(this);
      switch (this.tokenStream.LA(1)) {
        case RefLangParser.TRUE:
        case RefLangParser.FALSE:
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 765;
            this.litBoolean();
          }
          break;
        case RefLangParser.LITERAL_BINARY:
        case RefLangParser.LITERAL_HEX:
        case RefLangParser.LITERAL_INTEGER:
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 766;
            this.litInt();
          }
          break;
        case RefLangParser.LITERAL_FLOAT:
          this.enterOuterAlt(localContext, 3);
          {
            this.state = 767;
            this.litFloat();
          }
          break;
        case RefLangParser.LITERAL_STRING:
          this.enterOuterAlt(localContext, 4);
          {
            this.state = 768;
            this.litString();
          }
          break;
        case RefLangParser.INTERPOLATED_STRING:
          this.enterOuterAlt(localContext, 5);
          {
            this.state = 769;
            this.interpolatedString();
          }
          break;
        case RefLangParser.INT_NAME:
        case RefLangParser.FLOAT_NAME:
        case RefLangParser.BOOL_NAME:
        case RefLangParser.STRING_NAME:
        case RefLangParser.LIST_NAME:
        case RefLangParser.NAME_STARTING_UC:
          this.enterOuterAlt(localContext, 6);
          {
            this.state = 770;
            this.enumValue();
          }
          break;
        case RefLangParser.LITERAL_REGEXP:
          this.enterOuterAlt(localContext, 7);
          {
            this.state = 771;
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
    this.enterRule(localContext, 116, RefLangParser.RULE_litBoolean);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 774;
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
    this.enterRule(localContext, 118, RefLangParser.RULE_litInt);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 776;
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
    this.enterRule(localContext, 120, RefLangParser.RULE_litFloat);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 778;
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
    this.enterRule(localContext, 122, RefLangParser.RULE_litString);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 780;
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
  public interpolatedString(): InterpolatedStringContext {
    let localContext = new InterpolatedStringContext(this.context, this.state);
    this.enterRule(localContext, 124, RefLangParser.RULE_interpolatedString);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 782;
        this.match(RefLangParser.INTERPOLATED_STRING);
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
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
    this.enterRule(localContext, 126, RefLangParser.RULE_enumValue);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 784;
        this.typeName();
        this.state = 785;
        this.match(RefLangParser.DOT);
        this.state = 786;
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
    this.enterRule(localContext, 128, RefLangParser.RULE_litRegExp);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 788;
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
    this.enterRule(localContext, 130, RefLangParser.RULE_index);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 790;
        this.match(RefLangParser.OPEN_SQ_BRACKET);
        this.state = 791;
        this.expression();
        this.state = 792;
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
  public expression(): ExpressionContext {
    let localContext = new ExpressionContext(this.context, this.state);
    this.enterRule(localContext, 132, RefLangParser.RULE_expression);
    try {
      this.state = 807;
      this.errorHandler.sync(this);
      switch (this.interpreter.adaptivePredict(this.tokenStream, 78, this.context)) {
        case 1:
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 794;
            this.newInstance();
          }
          break;
        case 2:
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 795;
            this.unaryExpression();
          }
          break;
        case 3:
          this.enterOuterAlt(localContext, 3);
          {
            this.state = 796;
            this.term(0);
          }
          break;
        case 4:
          this.enterOuterAlt(localContext, 4);
          {
            this.state = 797;
            this.binaryExpression();
          }
          break;
        case 5:
          this.enterOuterAlt(localContext, 5);
          {
            this.state = 798;
            this.match(RefLangParser.IF_);
            this.state = 799;
            this.match(RefLangParser.OPEN_BRACKET);
            this.state = 800;
            this.expression();
            this.state = 801;
            this.match(RefLangParser.COMMA);
            this.state = 802;
            this.expression();
            this.state = 803;
            this.match(RefLangParser.COMMA);
            this.state = 804;
            this.expression();
            this.state = 805;
            this.match(RefLangParser.CLOSE_BRACKET);
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
    let _startState = 134;
    this.enterRecursionRule(localContext, 134, RefLangParser.RULE_term, _p);
    try {
      let alternative: number;
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 818;
        this.errorHandler.sync(this);
        switch (this.interpreter.adaptivePredict(this.tokenStream, 79, this.context)) {
          case 1:
            {
              this.state = 810;
              this.thisInstance();
            }
            break;
          case 2:
            {
              this.state = 811;
              this.bracketedExpression();
            }
            break;
          case 3:
            {
              this.state = 812;
              this.litValue();
            }
            break;
          case 4:
            {
              this.state = 813;
              this.list();
            }
            break;
          case 5:
            {
              this.state = 814;
              this.dictionary();
            }
            break;
          case 6:
            {
              this.state = 815;
              this.tuple();
            }
            break;
          case 7:
            {
              this.state = 816;
              this.identifierUse();
            }
            break;
          case 8:
            {
              this.state = 817;
              this.methodCall();
            }
            break;
        }
        this.context!.stop = this.tokenStream.LT(-1);
        this.state = 827;
        this.errorHandler.sync(this);
        alternative = this.interpreter.adaptivePredict(this.tokenStream, 81, this.context);
        while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
          if (alternative === 1) {
            if (this.parseListeners != null) {
              this.triggerExitRuleEvent();
            }
            previousContext = localContext;
            {
              this.state = 825;
              this.errorHandler.sync(this);
              switch (this.interpreter.adaptivePredict(this.tokenStream, 80, this.context)) {
                case 1:
                  {
                    localContext = new TermContext(parentContext, parentState);
                    this.pushNewRecursionContext(
                      localContext,
                      _startState,
                      RefLangParser.RULE_term,
                    );
                    this.state = 820;
                    if (!this.precpred(this.context, 2)) {
                      throw this.createFailedPredicateException("this.precpred(this.context, 2)");
                    }
                    this.state = 821;
                    this.index();
                  }
                  break;
                case 2:
                  {
                    localContext = new TermContext(parentContext, parentState);
                    this.pushNewRecursionContext(
                      localContext,
                      _startState,
                      RefLangParser.RULE_term,
                    );
                    this.state = 822;
                    if (!this.precpred(this.context, 1)) {
                      throw this.createFailedPredicateException("this.precpred(this.context, 1)");
                    }
                    this.state = 823;
                    this.match(RefLangParser.DOT);
                    this.state = 824;
                    this.chainable();
                  }
                  break;
              }
            }
          }
          this.state = 829;
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
      this.unrollRecursionContexts(parentContext);
    }
    return localContext;
  }
  public chainable(): ChainableContext {
    let localContext = new ChainableContext(this.context, this.state);
    this.enterRule(localContext, 136, RefLangParser.RULE_chainable);
    try {
      this.state = 832;
      this.errorHandler.sync(this);
      switch (this.interpreter.adaptivePredict(this.tokenStream, 82, this.context)) {
        case 1:
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 830;
            this.identifierUse();
          }
          break;
        case 2:
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 831;
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
    this.enterRule(localContext, 138, RefLangParser.RULE_thisInstance);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 834;
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
    this.enterRule(localContext, 140, RefLangParser.RULE_bracketedExpression);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 836;
        this.match(RefLangParser.OPEN_BRACKET);
        this.state = 837;
        this.expression();
        this.state = 838;
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
    this.enterRule(localContext, 142, RefLangParser.RULE_unaryExpression);
    try {
      this.state = 842;
      this.errorHandler.sync(this);
      switch (this.tokenStream.LA(1)) {
        case RefLangParser.MINUS:
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 840;
            this.negateNumeric();
          }
          break;
        case RefLangParser.NOT:
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 841;
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
    this.enterRule(localContext, 144, RefLangParser.RULE_negateNumeric);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 844;
        this.match(RefLangParser.MINUS);
        this.state = 845;
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
    this.enterRule(localContext, 146, RefLangParser.RULE_negateLogical);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 847;
        this.match(RefLangParser.NOT);
        this.state = 848;
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
    this.enterRule(localContext, 148, RefLangParser.RULE_binaryExpression);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 850;
        localContext._left = this.term(0);
        this.state = 851;
        this.binaryOperator();
        this.state = 852;
        localContext._right = this.expression();
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
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
    this.enterRule(localContext, 150, RefLangParser.RULE_list);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 854;
        this.match(RefLangParser.OPEN_SQ_BRACKET);
        this.state = 855;
        this.expressionList();
        this.state = 856;
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
  public tuple(): TupleContext {
    let localContext = new TupleContext(this.context, this.state);
    this.enterRule(localContext, 152, RefLangParser.RULE_tuple);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 858;
        this.match(RefLangParser.OPEN_BRACKET);
        this.state = 859;
        this.expressionList();
        this.state = 860;
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
  public dictionary(): DictionaryContext {
    let localContext = new DictionaryContext(this.context, this.state);
    this.enterRule(localContext, 154, RefLangParser.RULE_dictionary);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 862;
        this.match(RefLangParser.OPEN_SQ_BRACKET);
        this.state = 863;
        this.kvpList();
        this.state = 864;
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
    this.enterRule(localContext, 156, RefLangParser.RULE_kvpList);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 866;
        this.kvp();
        this.state = 871;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (_la === 84) {
          {
            {
              this.state = 867;
              this.match(RefLangParser.COMMA);
              this.state = 868;
              this.kvp();
            }
          }
          this.state = 873;
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
    this.enterRule(localContext, 158, RefLangParser.RULE_kvp);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 874;
        this.expression();
        this.state = 875;
        this.match(RefLangParser.COLON);
        this.state = 876;
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
    this.enterRule(localContext, 160, RefLangParser.RULE_methodCall);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 878;
        this.methodName();
        this.state = 879;
        this.match(RefLangParser.OPEN_BRACKET);
        this.state = 881;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (
          (((_la - 9) & ~0x1f) === 0 && ((1 << (_la - 9)) & 8388673) !== 0) ||
          (((_la - 57) & ~0x1f) === 0 && ((1 << (_la - 57)) & 1094976735) !== 0) ||
          (((_la - 98) & ~0x1f) === 0 && ((1 << (_la - 98)) & 511) !== 0)
        ) {
          {
            this.state = 880;
            this.argList();
          }
        }

        this.state = 883;
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
    this.enterRule(localContext, 162, RefLangParser.RULE_binaryOperator);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 885;
        _la = this.tokenStream.LA(1);
        if (!(((_la - 65) & ~0x1f) === 0 && ((1 << (_la - 65)) & 534773947) !== 0)) {
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
    this.enterRule(localContext, 164, RefLangParser.RULE_newInstance);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 887;
        this.match(RefLangParser.NEW);
        this.state = 888;
        this.type_();
        this.state = 889;
        this.match(RefLangParser.OPEN_BRACKET);
        this.state = 891;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (
          (((_la - 9) & ~0x1f) === 0 && ((1 << (_la - 9)) & 8388673) !== 0) ||
          (((_la - 57) & ~0x1f) === 0 && ((1 << (_la - 57)) & 1094976735) !== 0) ||
          (((_la - 98) & ~0x1f) === 0 && ((1 << (_la - 98)) & 511) !== 0)
        ) {
          {
            this.state = 890;
            this.argList();
          }
        }

        this.state = 893;
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
    this.enterRule(localContext, 166, RefLangParser.RULE_paramDef);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 895;
        this.identifierDef();
        this.state = 896;
        this.match(RefLangParser.AS);
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
    this.enterRule(localContext, 168, RefLangParser.RULE_typeGeneric);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 899;
        this.typeName();
        this.state = 900;
        this.match(RefLangParser.LT);
        this.state = 901;
        this.match(RefLangParser.OF);
        this.state = 902;
        this.type_();
        this.state = 907;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (_la === 84) {
          {
            {
              this.state = 903;
              this.match(RefLangParser.COMMA);
              this.state = 904;
              this.type_();
            }
          }
          this.state = 909;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 910;
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
    this.enterRule(localContext, 170, RefLangParser.RULE_typeFunc);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 912;
        this.match(RefLangParser.FUNC_NAME);
        this.state = 913;
        this.match(RefLangParser.LT);
        this.state = 914;
        this.match(RefLangParser.OF);
        this.state = 915;
        this.type_();
        this.state = 920;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (_la === 84) {
          {
            {
              this.state = 916;
              this.match(RefLangParser.COMMA);
              this.state = 917;
              this.type_();
            }
          }
          this.state = 922;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 923;
        this.match(RefLangParser.ARROW);
        this.state = 924;
        this.type_();
        this.state = 925;
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
    this.enterRule(localContext, 172, RefLangParser.RULE_typeTuple);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 927;
        this.match(RefLangParser.OPEN_BRACKET);
        this.state = 928;
        this.type_();
        this.state = 931;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        do {
          {
            {
              this.state = 929;
              this.match(RefLangParser.COMMA);
              this.state = 930;
              this.type_();
            }
          }
          this.state = 933;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        } while (_la === 84);
        this.state = 935;
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
    this.enterRule(localContext, 174, RefLangParser.RULE_lambda);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 937;
        this.match(RefLangParser.LAMBDA);
        this.state = 938;
        this.paramList();
        this.state = 939;
        this.match(RefLangParser.ARROW);
        this.state = 940;
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

  public override sempred(
    localContext: antlr.ParserRuleContext | null,
    ruleIndex: number,
    predIndex: number,
  ): boolean {
    switch (ruleIndex) {
      case 44:
        return this.assignable_sempred(localContext as AssignableContext, predIndex);
      case 67:
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
  private term_sempred(localContext: TermContext | null, predIndex: number): boolean {
    switch (predIndex) {
      case 1:
        return this.precpred(this.context, 2);
      case 2:
        return this.precpred(this.context, 1);
    }
    return true;
  }

  public static readonly _serializedATN: number[] = [
    4, 1, 125, 943, 2, 0, 7, 0, 2, 1, 7, 1, 2, 2, 7, 2, 2, 3, 7, 3, 2, 4, 7, 4, 2, 5, 7, 5, 2, 6, 7,
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
    7, 81, 2, 82, 7, 82, 2, 83, 7, 83, 2, 84, 7, 84, 2, 85, 7, 85, 2, 86, 7, 86, 2, 87, 7, 87, 1, 0,
    3, 0, 178, 8, 0, 1, 0, 5, 0, 181, 8, 0, 10, 0, 12, 0, 184, 9, 0, 1, 0, 5, 0, 187, 8, 0, 10, 0,
    12, 0, 190, 9, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 1, 203,
    8, 1, 1, 2, 3, 2, 206, 8, 2, 1, 2, 1, 2, 1, 2, 5, 2, 211, 8, 2, 10, 2, 12, 2, 214, 9, 2, 1, 2,
    1, 2, 1, 2, 1, 2, 1, 3, 3, 3, 221, 8, 3, 1, 3, 1, 3, 1, 3, 1, 3, 3, 3, 227, 8, 3, 1, 3, 1, 3, 1,
    3, 1, 3, 1, 3, 5, 3, 234, 8, 3, 10, 3, 12, 3, 237, 9, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 4, 3,
    4, 245, 8, 4, 1, 4, 1, 4, 1, 4, 1, 4, 5, 4, 251, 8, 4, 10, 4, 12, 4, 254, 9, 4, 1, 4, 1, 4, 1,
    4, 1, 4, 1, 5, 1, 5, 1, 5, 3, 5, 263, 8, 5, 1, 6, 3, 6, 266, 8, 6, 1, 6, 1, 6, 1, 6, 1, 6, 3, 6,
    272, 8, 6, 1, 6, 1, 6, 1, 6, 5, 6, 277, 8, 6, 10, 6, 12, 6, 280, 9, 6, 1, 6, 1, 6, 1, 6, 1, 6,
    1, 7, 3, 7, 287, 8, 7, 1, 7, 1, 7, 1, 7, 1, 7, 1, 7, 1, 7, 1, 7, 1, 8, 3, 8, 297, 8, 8, 1, 8, 1,
    8, 1, 8, 1, 8, 1, 8, 1, 9, 3, 9, 305, 8, 9, 1, 9, 1, 9, 1, 9, 1, 9, 3, 9, 311, 8, 9, 1, 9, 1, 9,
    5, 9, 315, 8, 9, 10, 9, 12, 9, 318, 9, 9, 1, 9, 1, 9, 1, 9, 1, 9, 1, 10, 1, 10, 1, 10, 1, 10, 1,
    10, 3, 10, 329, 8, 10, 1, 11, 3, 11, 332, 8, 11, 1, 11, 1, 11, 1, 11, 1, 11, 1, 11, 3, 11, 339,
    8, 11, 1, 11, 1, 11, 5, 11, 343, 8, 11, 10, 11, 12, 11, 346, 9, 11, 1, 11, 1, 11, 1, 11, 1, 11,
    1, 12, 1, 12, 1, 12, 1, 12, 1, 12, 1, 12, 3, 12, 358, 8, 12, 1, 13, 1, 13, 1, 13, 1, 14, 1, 14,
    1, 15, 1, 15, 1, 15, 1, 15, 1, 15, 1, 15, 1, 15, 1, 15, 1, 15, 1, 15, 1, 15, 3, 15, 376, 8, 15,
    1, 16, 3, 16, 379, 8, 16, 1, 16, 1, 16, 1, 16, 3, 16, 384, 8, 16, 1, 16, 1, 16, 1, 16, 1, 17, 3,
    17, 390, 8, 17, 1, 17, 1, 17, 1, 17, 1, 17, 1, 17, 1, 17, 1, 17, 1, 18, 3, 18, 400, 8, 18, 1,
    18, 1, 18, 1, 18, 1, 18, 1, 18, 1, 18, 1, 19, 3, 19, 409, 8, 19, 1, 19, 1, 19, 1, 19, 1, 19, 1,
    19, 1, 19, 1, 19, 1, 19, 1, 19, 1, 19, 1, 20, 3, 20, 422, 8, 20, 1, 20, 1, 20, 1, 20, 1, 20, 1,
    20, 1, 20, 1, 20, 5, 20, 431, 8, 20, 10, 20, 12, 20, 434, 9, 20, 1, 20, 1, 20, 1, 20, 1, 20, 1,
    21, 3, 21, 441, 8, 21, 1, 21, 1, 21, 1, 21, 1, 21, 5, 21, 447, 8, 21, 10, 21, 12, 21, 450, 9,
    21, 1, 21, 1, 21, 1, 21, 1, 21, 1, 22, 3, 22, 457, 8, 22, 1, 22, 1, 22, 1, 22, 1, 22, 1, 22, 1,
    22, 5, 22, 465, 8, 22, 10, 22, 12, 22, 468, 9, 22, 1, 22, 1, 22, 1, 22, 1, 22, 1, 23, 3, 23,
    475, 8, 23, 1, 23, 1, 23, 1, 23, 1, 23, 1, 23, 1, 23, 1, 23, 1, 24, 1, 24, 1, 24, 3, 24, 487, 8,
    24, 1, 25, 1, 25, 1, 25, 1, 25, 1, 26, 1, 26, 1, 26, 1, 26, 1, 27, 1, 27, 5, 27, 499, 8, 27, 10,
    27, 12, 27, 502, 9, 27, 1, 28, 3, 28, 505, 8, 28, 1, 28, 1, 28, 1, 28, 5, 28, 510, 8, 28, 10,
    28, 12, 28, 513, 9, 28, 1, 28, 1, 28, 5, 28, 517, 8, 28, 10, 28, 12, 28, 520, 9, 28, 1, 28, 1,
    28, 1, 28, 1, 28, 1, 29, 3, 29, 527, 8, 29, 1, 29, 1, 29, 1, 29, 1, 29, 1, 29, 1, 30, 1, 30, 3,
    30, 536, 8, 30, 1, 31, 3, 31, 539, 8, 31, 1, 31, 1, 31, 1, 31, 1, 31, 1, 31, 1, 31, 1, 31, 1,
    32, 1, 32, 1, 32, 1, 32, 1, 33, 3, 33, 553, 8, 33, 1, 33, 1, 33, 1, 33, 1, 33, 1, 33, 1, 34, 3,
    34, 561, 8, 34, 1, 34, 1, 34, 1, 34, 1, 35, 3, 35, 567, 8, 35, 1, 35, 1, 35, 1, 35, 1, 35, 1,
    35, 1, 35, 1, 36, 3, 36, 576, 8, 36, 1, 36, 1, 36, 1, 36, 3, 36, 581, 8, 36, 1, 36, 1, 36, 1,
    36, 5, 36, 586, 8, 36, 10, 36, 12, 36, 589, 9, 36, 1, 36, 1, 36, 1, 36, 1, 36, 1, 37, 3, 37,
    596, 8, 37, 1, 37, 3, 37, 599, 8, 37, 1, 37, 1, 37, 1, 37, 1, 37, 1, 37, 1, 37, 1, 38, 3, 38,
    608, 8, 38, 1, 38, 3, 38, 611, 8, 38, 1, 38, 1, 38, 1, 38, 1, 38, 3, 38, 617, 8, 38, 1, 38, 1,
    38, 1, 38, 1, 38, 1, 38, 5, 38, 624, 8, 38, 10, 38, 12, 38, 627, 9, 38, 1, 38, 1, 38, 1, 38, 1,
    38, 1, 38, 1, 39, 3, 39, 635, 8, 39, 1, 39, 3, 39, 638, 8, 39, 1, 39, 1, 39, 1, 39, 1, 39, 3,
    39, 644, 8, 39, 1, 39, 1, 39, 1, 39, 5, 39, 649, 8, 39, 10, 39, 12, 39, 652, 9, 39, 1, 39, 1,
    39, 1, 39, 1, 39, 1, 40, 3, 40, 659, 8, 40, 1, 40, 1, 40, 1, 40, 1, 40, 1, 40, 3, 40, 666, 8,
    40, 1, 40, 1, 40, 1, 40, 1, 40, 1, 40, 1, 41, 3, 41, 674, 8, 41, 1, 41, 1, 41, 1, 41, 1, 41, 1,
    41, 3, 41, 681, 8, 41, 1, 41, 1, 41, 1, 41, 1, 42, 1, 42, 1, 43, 1, 43, 1, 44, 1, 44, 1, 44, 1,
    44, 1, 44, 3, 44, 695, 8, 44, 1, 44, 1, 44, 5, 44, 699, 8, 44, 10, 44, 12, 44, 702, 9, 44, 1,
    45, 1, 45, 1, 46, 1, 46, 1, 47, 1, 47, 1, 48, 1, 48, 1, 48, 1, 48, 3, 48, 714, 8, 48, 1, 49, 1,
    49, 1, 49, 5, 49, 719, 8, 49, 10, 49, 12, 49, 722, 9, 49, 1, 50, 1, 50, 3, 50, 726, 8, 50, 1,
    51, 1, 51, 1, 51, 5, 51, 731, 8, 51, 10, 51, 12, 51, 734, 9, 51, 1, 52, 1, 52, 1, 52, 4, 52,
    739, 8, 52, 11, 52, 12, 52, 740, 1, 53, 1, 53, 1, 53, 5, 53, 746, 8, 53, 10, 53, 12, 53, 749, 9,
    53, 1, 54, 1, 54, 1, 54, 1, 54, 3, 54, 755, 8, 54, 1, 55, 1, 55, 1, 56, 1, 56, 1, 56, 1, 56, 1,
    56, 3, 56, 764, 8, 56, 1, 57, 1, 57, 1, 57, 1, 57, 1, 57, 1, 57, 1, 57, 3, 57, 773, 8, 57, 1,
    58, 1, 58, 1, 59, 1, 59, 1, 60, 1, 60, 1, 61, 1, 61, 1, 62, 1, 62, 1, 63, 1, 63, 1, 63, 1, 63,
    1, 64, 1, 64, 1, 65, 1, 65, 1, 65, 1, 65, 1, 66, 1, 66, 1, 66, 1, 66, 1, 66, 1, 66, 1, 66, 1,
    66, 1, 66, 1, 66, 1, 66, 1, 66, 1, 66, 3, 66, 808, 8, 66, 1, 67, 1, 67, 1, 67, 1, 67, 1, 67, 1,
    67, 1, 67, 1, 67, 1, 67, 3, 67, 819, 8, 67, 1, 67, 1, 67, 1, 67, 1, 67, 1, 67, 5, 67, 826, 8,
    67, 10, 67, 12, 67, 829, 9, 67, 1, 68, 1, 68, 3, 68, 833, 8, 68, 1, 69, 1, 69, 1, 70, 1, 70, 1,
    70, 1, 70, 1, 71, 1, 71, 3, 71, 843, 8, 71, 1, 72, 1, 72, 1, 72, 1, 73, 1, 73, 1, 73, 1, 74, 1,
    74, 1, 74, 1, 74, 1, 75, 1, 75, 1, 75, 1, 75, 1, 76, 1, 76, 1, 76, 1, 76, 1, 77, 1, 77, 1, 77,
    1, 77, 1, 78, 1, 78, 1, 78, 5, 78, 870, 8, 78, 10, 78, 12, 78, 873, 9, 78, 1, 79, 1, 79, 1, 79,
    1, 79, 1, 80, 1, 80, 1, 80, 3, 80, 882, 8, 80, 1, 80, 1, 80, 1, 81, 1, 81, 1, 82, 1, 82, 1, 82,
    1, 82, 3, 82, 892, 8, 82, 1, 82, 1, 82, 1, 83, 1, 83, 1, 83, 1, 83, 1, 84, 1, 84, 1, 84, 1, 84,
    1, 84, 1, 84, 5, 84, 906, 8, 84, 10, 84, 12, 84, 909, 9, 84, 1, 84, 1, 84, 1, 85, 1, 85, 1, 85,
    1, 85, 1, 85, 1, 85, 5, 85, 919, 8, 85, 10, 85, 12, 85, 922, 9, 85, 1, 85, 1, 85, 1, 85, 1, 85,
    1, 86, 1, 86, 1, 86, 1, 86, 4, 86, 932, 8, 86, 11, 86, 12, 86, 933, 1, 86, 1, 86, 1, 87, 1, 87,
    1, 87, 1, 87, 1, 87, 1, 87, 0, 2, 88, 134, 88, 0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24,
    26, 28, 30, 32, 34, 36, 38, 40, 42, 44, 46, 48, 50, 52, 54, 56, 58, 60, 62, 64, 66, 68, 70, 72,
    74, 76, 78, 80, 82, 84, 86, 88, 90, 92, 94, 96, 98, 100, 102, 104, 106, 108, 110, 112, 114, 116,
    118, 120, 122, 124, 126, 128, 130, 132, 134, 136, 138, 140, 142, 144, 146, 148, 150, 152, 154,
    156, 158, 160, 162, 164, 166, 168, 170, 172, 174, 0, 4, 2, 0, 57, 61, 99, 99, 1, 0, 63, 64, 1,
    0, 100, 102, 4, 0, 65, 66, 68, 70, 72, 72, 86, 93, 991, 0, 177, 1, 0, 0, 0, 2, 202, 1, 0, 0, 0,
    4, 205, 1, 0, 0, 0, 6, 220, 1, 0, 0, 0, 8, 244, 1, 0, 0, 0, 10, 262, 1, 0, 0, 0, 12, 265, 1, 0,
    0, 0, 14, 286, 1, 0, 0, 0, 16, 296, 1, 0, 0, 0, 18, 304, 1, 0, 0, 0, 20, 328, 1, 0, 0, 0, 22,
    331, 1, 0, 0, 0, 24, 357, 1, 0, 0, 0, 26, 359, 1, 0, 0, 0, 28, 362, 1, 0, 0, 0, 30, 375, 1, 0,
    0, 0, 32, 378, 1, 0, 0, 0, 34, 389, 1, 0, 0, 0, 36, 399, 1, 0, 0, 0, 38, 408, 1, 0, 0, 0, 40,
    421, 1, 0, 0, 0, 42, 440, 1, 0, 0, 0, 44, 456, 1, 0, 0, 0, 46, 474, 1, 0, 0, 0, 48, 486, 1, 0,
    0, 0, 50, 488, 1, 0, 0, 0, 52, 492, 1, 0, 0, 0, 54, 496, 1, 0, 0, 0, 56, 504, 1, 0, 0, 0, 58,
    526, 1, 0, 0, 0, 60, 535, 1, 0, 0, 0, 62, 538, 1, 0, 0, 0, 64, 547, 1, 0, 0, 0, 66, 552, 1, 0,
    0, 0, 68, 560, 1, 0, 0, 0, 70, 566, 1, 0, 0, 0, 72, 575, 1, 0, 0, 0, 74, 595, 1, 0, 0, 0, 76,
    607, 1, 0, 0, 0, 78, 634, 1, 0, 0, 0, 80, 658, 1, 0, 0, 0, 82, 673, 1, 0, 0, 0, 84, 685, 1, 0,
    0, 0, 86, 687, 1, 0, 0, 0, 88, 694, 1, 0, 0, 0, 90, 703, 1, 0, 0, 0, 92, 705, 1, 0, 0, 0, 94,
    707, 1, 0, 0, 0, 96, 713, 1, 0, 0, 0, 98, 715, 1, 0, 0, 0, 100, 725, 1, 0, 0, 0, 102, 727, 1, 0,
    0, 0, 104, 735, 1, 0, 0, 0, 106, 742, 1, 0, 0, 0, 108, 754, 1, 0, 0, 0, 110, 756, 1, 0, 0, 0,
    112, 763, 1, 0, 0, 0, 114, 772, 1, 0, 0, 0, 116, 774, 1, 0, 0, 0, 118, 776, 1, 0, 0, 0, 120,
    778, 1, 0, 0, 0, 122, 780, 1, 0, 0, 0, 124, 782, 1, 0, 0, 0, 126, 784, 1, 0, 0, 0, 128, 788, 1,
    0, 0, 0, 130, 790, 1, 0, 0, 0, 132, 807, 1, 0, 0, 0, 134, 818, 1, 0, 0, 0, 136, 832, 1, 0, 0, 0,
    138, 834, 1, 0, 0, 0, 140, 836, 1, 0, 0, 0, 142, 842, 1, 0, 0, 0, 144, 844, 1, 0, 0, 0, 146,
    847, 1, 0, 0, 0, 148, 850, 1, 0, 0, 0, 150, 854, 1, 0, 0, 0, 152, 858, 1, 0, 0, 0, 154, 862, 1,
    0, 0, 0, 156, 866, 1, 0, 0, 0, 158, 874, 1, 0, 0, 0, 160, 878, 1, 0, 0, 0, 162, 885, 1, 0, 0, 0,
    164, 887, 1, 0, 0, 0, 166, 895, 1, 0, 0, 0, 168, 899, 1, 0, 0, 0, 170, 912, 1, 0, 0, 0, 172,
    927, 1, 0, 0, 0, 174, 937, 1, 0, 0, 0, 176, 178, 3, 26, 13, 0, 177, 176, 1, 0, 0, 0, 177, 178,
    1, 0, 0, 0, 178, 182, 1, 0, 0, 0, 179, 181, 3, 2, 1, 0, 180, 179, 1, 0, 0, 0, 181, 184, 1, 0, 0,
    0, 182, 180, 1, 0, 0, 0, 182, 183, 1, 0, 0, 0, 183, 188, 1, 0, 0, 0, 184, 182, 1, 0, 0, 0, 185,
    187, 5, 96, 0, 0, 186, 185, 1, 0, 0, 0, 187, 190, 1, 0, 0, 0, 188, 186, 1, 0, 0, 0, 188, 189, 1,
    0, 0, 0, 189, 191, 1, 0, 0, 0, 190, 188, 1, 0, 0, 0, 191, 192, 5, 0, 0, 1, 192, 1, 1, 0, 0, 0,
    193, 203, 3, 4, 2, 0, 194, 203, 3, 6, 3, 0, 195, 203, 3, 8, 4, 0, 196, 203, 3, 12, 6, 0, 197,
    203, 3, 14, 7, 0, 198, 203, 3, 16, 8, 0, 199, 203, 3, 18, 9, 0, 200, 203, 3, 22, 11, 0, 201,
    203, 3, 26, 13, 0, 202, 193, 1, 0, 0, 0, 202, 194, 1, 0, 0, 0, 202, 195, 1, 0, 0, 0, 202, 196,
    1, 0, 0, 0, 202, 197, 1, 0, 0, 0, 202, 198, 1, 0, 0, 0, 202, 199, 1, 0, 0, 0, 202, 200, 1, 0, 0,
    0, 202, 201, 1, 0, 0, 0, 203, 3, 1, 0, 0, 0, 204, 206, 5, 109, 0, 0, 205, 204, 1, 0, 0, 0, 205,
    206, 1, 0, 0, 0, 206, 207, 1, 0, 0, 0, 207, 208, 5, 10, 0, 0, 208, 212, 5, 96, 0, 0, 209, 211,
    3, 30, 15, 0, 210, 209, 1, 0, 0, 0, 211, 214, 1, 0, 0, 0, 212, 210, 1, 0, 0, 0, 212, 213, 1, 0,
    0, 0, 213, 215, 1, 0, 0, 0, 214, 212, 1, 0, 0, 0, 215, 216, 5, 26, 0, 0, 216, 217, 5, 10, 0, 0,
    217, 218, 5, 96, 0, 0, 218, 5, 1, 0, 0, 0, 219, 221, 5, 109, 0, 0, 220, 219, 1, 0, 0, 0, 220,
    221, 1, 0, 0, 0, 221, 222, 1, 0, 0, 0, 222, 223, 5, 29, 0, 0, 223, 224, 3, 90, 45, 0, 224, 226,
    5, 81, 0, 0, 225, 227, 3, 102, 51, 0, 226, 225, 1, 0, 0, 0, 226, 227, 1, 0, 0, 0, 227, 228, 1,
    0, 0, 0, 228, 229, 5, 82, 0, 0, 229, 230, 5, 37, 0, 0, 230, 231, 3, 108, 54, 0, 231, 235, 5, 96,
    0, 0, 232, 234, 3, 30, 15, 0, 233, 232, 1, 0, 0, 0, 234, 237, 1, 0, 0, 0, 235, 233, 1, 0, 0, 0,
    235, 236, 1, 0, 0, 0, 236, 238, 1, 0, 0, 0, 237, 235, 1, 0, 0, 0, 238, 239, 3, 64, 32, 0, 239,
    240, 5, 26, 0, 0, 240, 241, 5, 29, 0, 0, 241, 242, 5, 96, 0, 0, 242, 7, 1, 0, 0, 0, 243, 245, 5,
    109, 0, 0, 244, 243, 1, 0, 0, 0, 244, 245, 1, 0, 0, 0, 245, 246, 1, 0, 0, 0, 246, 247, 5, 40, 0,
    0, 247, 248, 3, 92, 46, 0, 248, 252, 5, 96, 0, 0, 249, 251, 3, 10, 5, 0, 250, 249, 1, 0, 0, 0,
    251, 254, 1, 0, 0, 0, 252, 250, 1, 0, 0, 0, 252, 253, 1, 0, 0, 0, 253, 255, 1, 0, 0, 0, 254,
    252, 1, 0, 0, 0, 255, 256, 5, 26, 0, 0, 256, 257, 5, 40, 0, 0, 257, 258, 5, 96, 0, 0, 258, 9, 1,
    0, 0, 0, 259, 263, 3, 62, 31, 0, 260, 263, 3, 34, 17, 0, 261, 263, 3, 26, 13, 0, 262, 259, 1, 0,
    0, 0, 262, 260, 1, 0, 0, 0, 262, 261, 1, 0, 0, 0, 263, 11, 1, 0, 0, 0, 264, 266, 5, 109, 0, 0,
    265, 264, 1, 0, 0, 0, 265, 266, 1, 0, 0, 0, 266, 267, 1, 0, 0, 0, 267, 268, 5, 35, 0, 0, 268,
    269, 3, 90, 45, 0, 269, 271, 5, 81, 0, 0, 270, 272, 3, 102, 51, 0, 271, 270, 1, 0, 0, 0, 271,
    272, 1, 0, 0, 0, 272, 273, 1, 0, 0, 0, 273, 274, 5, 82, 0, 0, 274, 278, 5, 96, 0, 0, 275, 277,
    3, 30, 15, 0, 276, 275, 1, 0, 0, 0, 277, 280, 1, 0, 0, 0, 278, 276, 1, 0, 0, 0, 278, 279, 1, 0,
    0, 0, 279, 281, 1, 0, 0, 0, 280, 278, 1, 0, 0, 0, 281, 282, 5, 26, 0, 0, 282, 283, 5, 35, 0, 0,
    283, 284, 5, 96, 0, 0, 284, 13, 1, 0, 0, 0, 285, 287, 5, 109, 0, 0, 286, 285, 1, 0, 0, 0, 286,
    287, 1, 0, 0, 0, 287, 288, 1, 0, 0, 0, 288, 289, 5, 22, 0, 0, 289, 290, 3, 84, 42, 0, 290, 291,
    5, 38, 0, 0, 291, 292, 5, 43, 0, 0, 292, 293, 3, 96, 48, 0, 293, 294, 5, 96, 0, 0, 294, 15, 1,
    0, 0, 0, 295, 297, 5, 109, 0, 0, 296, 295, 1, 0, 0, 0, 296, 297, 1, 0, 0, 0, 297, 298, 1, 0, 0,
    0, 298, 299, 5, 4, 0, 0, 299, 300, 3, 94, 47, 0, 300, 301, 3, 104, 52, 0, 301, 302, 5, 96, 0, 0,
    302, 17, 1, 0, 0, 0, 303, 305, 5, 109, 0, 0, 304, 303, 1, 0, 0, 0, 304, 305, 1, 0, 0, 0, 305,
    306, 1, 0, 0, 0, 306, 307, 5, 1, 0, 0, 307, 310, 3, 94, 47, 0, 308, 309, 5, 30, 0, 0, 309, 311,
    3, 94, 47, 0, 310, 308, 1, 0, 0, 0, 310, 311, 1, 0, 0, 0, 311, 312, 1, 0, 0, 0, 312, 316, 5, 96,
    0, 0, 313, 315, 3, 20, 10, 0, 314, 313, 1, 0, 0, 0, 315, 318, 1, 0, 0, 0, 316, 314, 1, 0, 0, 0,
    316, 317, 1, 0, 0, 0, 317, 319, 1, 0, 0, 0, 318, 316, 1, 0, 0, 0, 319, 320, 5, 26, 0, 0, 320,
    321, 5, 1, 0, 0, 321, 322, 5, 96, 0, 0, 322, 19, 1, 0, 0, 0, 323, 329, 3, 72, 36, 0, 324, 329,
    3, 74, 37, 0, 325, 329, 3, 76, 38, 0, 326, 329, 3, 78, 39, 0, 327, 329, 3, 26, 13, 0, 328, 323,
    1, 0, 0, 0, 328, 324, 1, 0, 0, 0, 328, 325, 1, 0, 0, 0, 328, 326, 1, 0, 0, 0, 328, 327, 1, 0, 0,
    0, 329, 21, 1, 0, 0, 0, 330, 332, 5, 109, 0, 0, 331, 330, 1, 0, 0, 0, 331, 332, 1, 0, 0, 0, 332,
    333, 1, 0, 0, 0, 333, 334, 5, 16, 0, 0, 334, 335, 5, 1, 0, 0, 335, 338, 3, 94, 47, 0, 336, 337,
    5, 30, 0, 0, 337, 339, 3, 94, 47, 0, 338, 336, 1, 0, 0, 0, 338, 339, 1, 0, 0, 0, 339, 340, 1, 0,
    0, 0, 340, 344, 5, 96, 0, 0, 341, 343, 3, 24, 12, 0, 342, 341, 1, 0, 0, 0, 343, 346, 1, 0, 0, 0,
    344, 342, 1, 0, 0, 0, 344, 345, 1, 0, 0, 0, 345, 347, 1, 0, 0, 0, 346, 344, 1, 0, 0, 0, 347,
    348, 5, 26, 0, 0, 348, 349, 5, 1, 0, 0, 349, 350, 5, 96, 0, 0, 350, 23, 1, 0, 0, 0, 351, 358, 3,
    74, 37, 0, 352, 358, 3, 76, 38, 0, 353, 358, 3, 78, 39, 0, 354, 358, 3, 80, 40, 0, 355, 358, 3,
    82, 41, 0, 356, 358, 3, 26, 13, 0, 357, 351, 1, 0, 0, 0, 357, 352, 1, 0, 0, 0, 357, 353, 1, 0,
    0, 0, 357, 354, 1, 0, 0, 0, 357, 355, 1, 0, 0, 0, 357, 356, 1, 0, 0, 0, 358, 25, 1, 0, 0, 0,
    359, 360, 3, 28, 14, 0, 360, 361, 5, 96, 0, 0, 361, 27, 1, 0, 0, 0, 362, 363, 5, 125, 0, 0, 363,
    29, 1, 0, 0, 0, 364, 376, 3, 32, 16, 0, 365, 376, 3, 34, 17, 0, 366, 376, 3, 36, 18, 0, 367,
    376, 3, 38, 19, 0, 368, 376, 3, 40, 20, 0, 369, 376, 3, 42, 21, 0, 370, 376, 3, 44, 22, 0, 371,
    376, 3, 46, 23, 0, 372, 376, 3, 56, 28, 0, 373, 376, 3, 58, 29, 0, 374, 376, 3, 26, 13, 0, 375,
    364, 1, 0, 0, 0, 375, 365, 1, 0, 0, 0, 375, 366, 1, 0, 0, 0, 375, 367, 1, 0, 0, 0, 375, 368, 1,
    0, 0, 0, 375, 369, 1, 0, 0, 0, 375, 370, 1, 0, 0, 0, 375, 371, 1, 0, 0, 0, 375, 372, 1, 0, 0, 0,
    375, 373, 1, 0, 0, 0, 375, 374, 1, 0, 0, 0, 376, 31, 1, 0, 0, 0, 377, 379, 5, 109, 0, 0, 378,
    377, 1, 0, 0, 0, 378, 379, 1, 0, 0, 0, 379, 380, 1, 0, 0, 0, 380, 381, 5, 11, 0, 0, 381, 383, 5,
    81, 0, 0, 382, 384, 3, 132, 66, 0, 383, 382, 1, 0, 0, 0, 383, 384, 1, 0, 0, 0, 384, 385, 1, 0,
    0, 0, 385, 386, 5, 82, 0, 0, 386, 387, 5, 96, 0, 0, 387, 33, 1, 0, 0, 0, 388, 390, 5, 109, 0, 0,
    389, 388, 1, 0, 0, 0, 389, 390, 1, 0, 0, 0, 390, 391, 1, 0, 0, 0, 391, 392, 5, 44, 0, 0, 392,
    393, 3, 84, 42, 0, 393, 394, 5, 38, 0, 0, 394, 395, 5, 43, 0, 0, 395, 396, 3, 132, 66, 0, 396,
    397, 5, 96, 0, 0, 397, 35, 1, 0, 0, 0, 398, 400, 5, 109, 0, 0, 399, 398, 1, 0, 0, 0, 399, 400,
    1, 0, 0, 0, 400, 401, 1, 0, 0, 0, 401, 402, 5, 18, 0, 0, 402, 403, 3, 88, 44, 0, 403, 404, 5,
    43, 0, 0, 404, 405, 3, 132, 66, 0, 405, 406, 5, 96, 0, 0, 406, 37, 1, 0, 0, 0, 407, 409, 5, 109,
    0, 0, 408, 407, 1, 0, 0, 0, 408, 409, 1, 0, 0, 0, 409, 410, 1, 0, 0, 0, 410, 411, 5, 8, 0, 0,
    411, 412, 3, 84, 42, 0, 412, 413, 5, 38, 0, 0, 413, 414, 5, 43, 0, 0, 414, 415, 3, 90, 45, 0,
    415, 416, 5, 81, 0, 0, 416, 417, 3, 132, 66, 0, 417, 418, 5, 82, 0, 0, 418, 419, 5, 96, 0, 0,
    419, 39, 1, 0, 0, 0, 420, 422, 5, 109, 0, 0, 421, 420, 1, 0, 0, 0, 421, 422, 1, 0, 0, 0, 422,
    423, 1, 0, 0, 0, 423, 424, 5, 6, 0, 0, 424, 425, 3, 132, 66, 0, 425, 426, 5, 41, 0, 0, 426, 432,
    5, 96, 0, 0, 427, 431, 3, 66, 33, 0, 428, 431, 3, 68, 34, 0, 429, 431, 3, 30, 15, 0, 430, 427,
    1, 0, 0, 0, 430, 428, 1, 0, 0, 0, 430, 429, 1, 0, 0, 0, 431, 434, 1, 0, 0, 0, 432, 430, 1, 0, 0,
    0, 432, 433, 1, 0, 0, 0, 433, 435, 1, 0, 0, 0, 434, 432, 1, 0, 0, 0, 435, 436, 5, 26, 0, 0, 436,
    437, 5, 6, 0, 0, 437, 438, 5, 96, 0, 0, 438, 41, 1, 0, 0, 0, 439, 441, 5, 109, 0, 0, 440, 439,
    1, 0, 0, 0, 440, 441, 1, 0, 0, 0, 441, 442, 1, 0, 0, 0, 442, 443, 5, 14, 0, 0, 443, 444, 3, 132,
    66, 0, 444, 448, 5, 96, 0, 0, 445, 447, 3, 30, 15, 0, 446, 445, 1, 0, 0, 0, 447, 450, 1, 0, 0,
    0, 448, 446, 1, 0, 0, 0, 448, 449, 1, 0, 0, 0, 449, 451, 1, 0, 0, 0, 450, 448, 1, 0, 0, 0, 451,
    452, 5, 26, 0, 0, 452, 453, 5, 14, 0, 0, 453, 454, 5, 96, 0, 0, 454, 43, 1, 0, 0, 0, 455, 457,
    5, 109, 0, 0, 456, 455, 1, 0, 0, 0, 456, 457, 1, 0, 0, 0, 457, 458, 1, 0, 0, 0, 458, 459, 5, 5,
    0, 0, 459, 460, 3, 84, 42, 0, 460, 461, 5, 7, 0, 0, 461, 462, 3, 132, 66, 0, 462, 466, 5, 96, 0,
    0, 463, 465, 3, 30, 15, 0, 464, 463, 1, 0, 0, 0, 465, 468, 1, 0, 0, 0, 466, 464, 1, 0, 0, 0,
    466, 467, 1, 0, 0, 0, 467, 469, 1, 0, 0, 0, 468, 466, 1, 0, 0, 0, 469, 470, 5, 26, 0, 0, 470,
    471, 5, 5, 0, 0, 471, 472, 5, 96, 0, 0, 472, 45, 1, 0, 0, 0, 473, 475, 5, 109, 0, 0, 474, 473,
    1, 0, 0, 0, 474, 475, 1, 0, 0, 0, 475, 476, 1, 0, 0, 0, 476, 477, 5, 20, 0, 0, 477, 478, 3, 48,
    24, 0, 478, 479, 5, 81, 0, 0, 479, 480, 3, 98, 49, 0, 480, 481, 5, 82, 0, 0, 481, 482, 5, 96, 0,
    0, 482, 47, 1, 0, 0, 0, 483, 487, 3, 90, 45, 0, 484, 487, 3, 50, 25, 0, 485, 487, 3, 52, 26, 0,
    486, 483, 1, 0, 0, 0, 486, 484, 1, 0, 0, 0, 486, 485, 1, 0, 0, 0, 487, 49, 1, 0, 0, 0, 488, 489,
    5, 75, 0, 0, 489, 490, 5, 83, 0, 0, 490, 491, 3, 90, 45, 0, 491, 51, 1, 0, 0, 0, 492, 493, 3,
    54, 27, 0, 493, 494, 5, 83, 0, 0, 494, 495, 3, 90, 45, 0, 495, 53, 1, 0, 0, 0, 496, 500, 3, 86,
    43, 0, 497, 499, 3, 130, 65, 0, 498, 497, 1, 0, 0, 0, 499, 502, 1, 0, 0, 0, 500, 498, 1, 0, 0,
    0, 500, 501, 1, 0, 0, 0, 501, 55, 1, 0, 0, 0, 502, 500, 1, 0, 0, 0, 503, 505, 5, 109, 0, 0, 504,
    503, 1, 0, 0, 0, 504, 505, 1, 0, 0, 0, 505, 506, 1, 0, 0, 0, 506, 507, 5, 13, 0, 0, 507, 511, 5,
    96, 0, 0, 508, 510, 3, 30, 15, 0, 509, 508, 1, 0, 0, 0, 510, 513, 1, 0, 0, 0, 511, 509, 1, 0, 0,
    0, 511, 512, 1, 0, 0, 0, 512, 514, 1, 0, 0, 0, 513, 511, 1, 0, 0, 0, 514, 518, 3, 70, 35, 0,
    515, 517, 3, 30, 15, 0, 516, 515, 1, 0, 0, 0, 517, 520, 1, 0, 0, 0, 518, 516, 1, 0, 0, 0, 518,
    519, 1, 0, 0, 0, 519, 521, 1, 0, 0, 0, 520, 518, 1, 0, 0, 0, 521, 522, 5, 26, 0, 0, 522, 523, 5,
    13, 0, 0, 523, 524, 5, 96, 0, 0, 524, 57, 1, 0, 0, 0, 525, 527, 5, 109, 0, 0, 526, 525, 1, 0, 0,
    0, 526, 527, 1, 0, 0, 0, 527, 528, 1, 0, 0, 0, 528, 529, 5, 42, 0, 0, 529, 530, 3, 94, 47, 0,
    530, 531, 3, 60, 30, 0, 531, 532, 5, 96, 0, 0, 532, 59, 1, 0, 0, 0, 533, 536, 3, 122, 61, 0,
    534, 536, 3, 86, 43, 0, 535, 533, 1, 0, 0, 0, 535, 534, 1, 0, 0, 0, 536, 61, 1, 0, 0, 0, 537,
    539, 5, 109, 0, 0, 538, 537, 1, 0, 0, 0, 538, 539, 1, 0, 0, 0, 539, 540, 1, 0, 0, 0, 540, 541,
    5, 17, 0, 0, 541, 542, 3, 110, 55, 0, 542, 543, 5, 27, 0, 0, 543, 544, 5, 43, 0, 0, 544, 545, 3,
    112, 56, 0, 545, 546, 5, 96, 0, 0, 546, 63, 1, 0, 0, 0, 547, 548, 5, 12, 0, 0, 548, 549, 3, 132,
    66, 0, 549, 550, 5, 96, 0, 0, 550, 65, 1, 0, 0, 0, 551, 553, 5, 109, 0, 0, 552, 551, 1, 0, 0, 0,
    552, 553, 1, 0, 0, 0, 553, 554, 1, 0, 0, 0, 554, 555, 5, 2, 0, 0, 555, 556, 3, 132, 66, 0, 556,
    557, 5, 41, 0, 0, 557, 558, 5, 96, 0, 0, 558, 67, 1, 0, 0, 0, 559, 561, 5, 109, 0, 0, 560, 559,
    1, 0, 0, 0, 560, 561, 1, 0, 0, 0, 561, 562, 1, 0, 0, 0, 562, 563, 5, 3, 0, 0, 563, 564, 5, 96,
    0, 0, 564, 69, 1, 0, 0, 0, 565, 567, 5, 109, 0, 0, 566, 565, 1, 0, 0, 0, 566, 567, 1, 0, 0, 0,
    567, 568, 1, 0, 0, 0, 568, 569, 5, 21, 0, 0, 569, 570, 3, 84, 42, 0, 570, 571, 5, 47, 0, 0, 571,
    572, 3, 94, 47, 0, 572, 573, 5, 96, 0, 0, 573, 71, 1, 0, 0, 0, 574, 576, 5, 109, 0, 0, 575, 574,
    1, 0, 0, 0, 575, 576, 1, 0, 0, 0, 576, 577, 1, 0, 0, 0, 577, 578, 5, 23, 0, 0, 578, 580, 5, 81,
    0, 0, 579, 581, 3, 102, 51, 0, 580, 579, 1, 0, 0, 0, 580, 581, 1, 0, 0, 0, 581, 582, 1, 0, 0, 0,
    582, 583, 5, 82, 0, 0, 583, 587, 5, 96, 0, 0, 584, 586, 3, 30, 15, 0, 585, 584, 1, 0, 0, 0, 586,
    589, 1, 0, 0, 0, 587, 585, 1, 0, 0, 0, 587, 588, 1, 0, 0, 0, 588, 590, 1, 0, 0, 0, 589, 587, 1,
    0, 0, 0, 590, 591, 5, 26, 0, 0, 591, 592, 5, 23, 0, 0, 592, 593, 5, 96, 0, 0, 593, 73, 1, 0, 0,
    0, 594, 596, 5, 109, 0, 0, 595, 594, 1, 0, 0, 0, 595, 596, 1, 0, 0, 0, 596, 598, 1, 0, 0, 0,
    597, 599, 5, 34, 0, 0, 598, 597, 1, 0, 0, 0, 598, 599, 1, 0, 0, 0, 599, 600, 1, 0, 0, 0, 600,
    601, 5, 36, 0, 0, 601, 602, 3, 84, 42, 0, 602, 603, 5, 47, 0, 0, 603, 604, 3, 108, 54, 0, 604,
    605, 5, 96, 0, 0, 605, 75, 1, 0, 0, 0, 606, 608, 5, 109, 0, 0, 607, 606, 1, 0, 0, 0, 607, 608,
    1, 0, 0, 0, 608, 610, 1, 0, 0, 0, 609, 611, 5, 34, 0, 0, 610, 609, 1, 0, 0, 0, 610, 611, 1, 0,
    0, 0, 611, 612, 1, 0, 0, 0, 612, 613, 5, 29, 0, 0, 613, 614, 3, 90, 45, 0, 614, 616, 5, 81, 0,
    0, 615, 617, 3, 102, 51, 0, 616, 615, 1, 0, 0, 0, 616, 617, 1, 0, 0, 0, 617, 618, 1, 0, 0, 0,
    618, 619, 5, 82, 0, 0, 619, 620, 5, 37, 0, 0, 620, 621, 3, 108, 54, 0, 621, 625, 5, 96, 0, 0,
    622, 624, 3, 30, 15, 0, 623, 622, 1, 0, 0, 0, 624, 627, 1, 0, 0, 0, 625, 623, 1, 0, 0, 0, 625,
    626, 1, 0, 0, 0, 626, 628, 1, 0, 0, 0, 627, 625, 1, 0, 0, 0, 628, 629, 3, 64, 32, 0, 629, 630,
    5, 26, 0, 0, 630, 631, 5, 29, 0, 0, 631, 632, 5, 96, 0, 0, 632, 77, 1, 0, 0, 0, 633, 635, 5,
    109, 0, 0, 634, 633, 1, 0, 0, 0, 634, 635, 1, 0, 0, 0, 635, 637, 1, 0, 0, 0, 636, 638, 5, 34, 0,
    0, 637, 636, 1, 0, 0, 0, 637, 638, 1, 0, 0, 0, 638, 639, 1, 0, 0, 0, 639, 640, 5, 35, 0, 0, 640,
    641, 3, 90, 45, 0, 641, 643, 5, 81, 0, 0, 642, 644, 3, 102, 51, 0, 643, 642, 1, 0, 0, 0, 643,
    644, 1, 0, 0, 0, 644, 645, 1, 0, 0, 0, 645, 646, 5, 82, 0, 0, 646, 650, 5, 96, 0, 0, 647, 649,
    3, 30, 15, 0, 648, 647, 1, 0, 0, 0, 649, 652, 1, 0, 0, 0, 650, 648, 1, 0, 0, 0, 650, 651, 1, 0,
    0, 0, 651, 653, 1, 0, 0, 0, 652, 650, 1, 0, 0, 0, 653, 654, 5, 26, 0, 0, 654, 655, 5, 35, 0, 0,
    655, 656, 5, 96, 0, 0, 656, 79, 1, 0, 0, 0, 657, 659, 5, 109, 0, 0, 658, 657, 1, 0, 0, 0, 658,
    659, 1, 0, 0, 0, 659, 660, 1, 0, 0, 0, 660, 661, 5, 16, 0, 0, 661, 662, 5, 29, 0, 0, 662, 663,
    3, 90, 45, 0, 663, 665, 5, 81, 0, 0, 664, 666, 3, 102, 51, 0, 665, 664, 1, 0, 0, 0, 665, 666, 1,
    0, 0, 0, 666, 667, 1, 0, 0, 0, 667, 668, 5, 82, 0, 0, 668, 669, 5, 37, 0, 0, 669, 670, 3, 108,
    54, 0, 670, 671, 5, 96, 0, 0, 671, 81, 1, 0, 0, 0, 672, 674, 5, 109, 0, 0, 673, 672, 1, 0, 0, 0,
    673, 674, 1, 0, 0, 0, 674, 675, 1, 0, 0, 0, 675, 676, 5, 16, 0, 0, 676, 677, 5, 35, 0, 0, 677,
    678, 3, 90, 45, 0, 678, 680, 5, 81, 0, 0, 679, 681, 3, 102, 51, 0, 680, 679, 1, 0, 0, 0, 680,
    681, 1, 0, 0, 0, 681, 682, 1, 0, 0, 0, 682, 683, 5, 82, 0, 0, 683, 684, 5, 96, 0, 0, 684, 83, 1,
    0, 0, 0, 685, 686, 5, 98, 0, 0, 686, 85, 1, 0, 0, 0, 687, 688, 5, 98, 0, 0, 688, 87, 1, 0, 0, 0,
    689, 690, 6, 44, -1, 0, 690, 695, 3, 86, 43, 0, 691, 692, 5, 75, 0, 0, 692, 693, 5, 83, 0, 0,
    693, 695, 3, 86, 43, 0, 694, 689, 1, 0, 0, 0, 694, 691, 1, 0, 0, 0, 695, 700, 1, 0, 0, 0, 696,
    697, 10, 1, 0, 0, 697, 699, 3, 130, 65, 0, 698, 696, 1, 0, 0, 0, 699, 702, 1, 0, 0, 0, 700, 698,
    1, 0, 0, 0, 700, 701, 1, 0, 0, 0, 701, 89, 1, 0, 0, 0, 702, 700, 1, 0, 0, 0, 703, 704, 5, 98, 0,
    0, 704, 91, 1, 0, 0, 0, 705, 706, 5, 97, 0, 0, 706, 93, 1, 0, 0, 0, 707, 708, 7, 0, 0, 0, 708,
    95, 1, 0, 0, 0, 709, 714, 3, 116, 58, 0, 710, 714, 3, 118, 59, 0, 711, 714, 3, 120, 60, 0, 712,
    714, 3, 122, 61, 0, 713, 709, 1, 0, 0, 0, 713, 710, 1, 0, 0, 0, 713, 711, 1, 0, 0, 0, 713, 712,
    1, 0, 0, 0, 714, 97, 1, 0, 0, 0, 715, 720, 3, 100, 50, 0, 716, 717, 5, 84, 0, 0, 717, 719, 3,
    100, 50, 0, 718, 716, 1, 0, 0, 0, 719, 722, 1, 0, 0, 0, 720, 718, 1, 0, 0, 0, 720, 721, 1, 0, 0,
    0, 721, 99, 1, 0, 0, 0, 722, 720, 1, 0, 0, 0, 723, 726, 3, 174, 87, 0, 724, 726, 3, 132, 66, 0,
    725, 723, 1, 0, 0, 0, 725, 724, 1, 0, 0, 0, 726, 101, 1, 0, 0, 0, 727, 732, 3, 166, 83, 0, 728,
    729, 5, 84, 0, 0, 729, 731, 3, 166, 83, 0, 730, 728, 1, 0, 0, 0, 731, 734, 1, 0, 0, 0, 732, 730,
    1, 0, 0, 0, 732, 733, 1, 0, 0, 0, 733, 103, 1, 0, 0, 0, 734, 732, 1, 0, 0, 0, 735, 738, 3, 84,
    42, 0, 736, 737, 5, 84, 0, 0, 737, 739, 3, 84, 42, 0, 738, 736, 1, 0, 0, 0, 739, 740, 1, 0, 0,
    0, 740, 738, 1, 0, 0, 0, 740, 741, 1, 0, 0, 0, 741, 105, 1, 0, 0, 0, 742, 747, 3, 132, 66, 0,
    743, 744, 5, 84, 0, 0, 744, 746, 3, 132, 66, 0, 745, 743, 1, 0, 0, 0, 746, 749, 1, 0, 0, 0, 747,
    745, 1, 0, 0, 0, 747, 748, 1, 0, 0, 0, 748, 107, 1, 0, 0, 0, 749, 747, 1, 0, 0, 0, 750, 755, 3,
    172, 86, 0, 751, 755, 3, 94, 47, 0, 752, 755, 3, 168, 84, 0, 753, 755, 3, 170, 85, 0, 754, 750,
    1, 0, 0, 0, 754, 751, 1, 0, 0, 0, 754, 752, 1, 0, 0, 0, 754, 753, 1, 0, 0, 0, 755, 109, 1, 0, 0,
    0, 756, 757, 3, 132, 66, 0, 757, 111, 1, 0, 0, 0, 758, 764, 3, 114, 57, 0, 759, 764, 3, 150, 75,
    0, 760, 764, 3, 154, 77, 0, 761, 764, 3, 142, 71, 0, 762, 764, 3, 152, 76, 0, 763, 758, 1, 0, 0,
    0, 763, 759, 1, 0, 0, 0, 763, 760, 1, 0, 0, 0, 763, 761, 1, 0, 0, 0, 763, 762, 1, 0, 0, 0, 764,
    113, 1, 0, 0, 0, 765, 773, 3, 116, 58, 0, 766, 773, 3, 118, 59, 0, 767, 773, 3, 120, 60, 0, 768,
    773, 3, 122, 61, 0, 769, 773, 3, 124, 62, 0, 770, 773, 3, 126, 63, 0, 771, 773, 3, 128, 64, 0,
    772, 765, 1, 0, 0, 0, 772, 766, 1, 0, 0, 0, 772, 767, 1, 0, 0, 0, 772, 768, 1, 0, 0, 0, 772,
    769, 1, 0, 0, 0, 772, 770, 1, 0, 0, 0, 772, 771, 1, 0, 0, 0, 773, 115, 1, 0, 0, 0, 774, 775, 7,
    1, 0, 0, 775, 117, 1, 0, 0, 0, 776, 777, 7, 2, 0, 0, 777, 119, 1, 0, 0, 0, 778, 779, 5, 103, 0,
    0, 779, 121, 1, 0, 0, 0, 780, 781, 5, 105, 0, 0, 781, 123, 1, 0, 0, 0, 782, 783, 5, 106, 0, 0,
    783, 125, 1, 0, 0, 0, 784, 785, 3, 94, 47, 0, 785, 786, 5, 83, 0, 0, 786, 787, 3, 86, 43, 0,
    787, 127, 1, 0, 0, 0, 788, 789, 5, 104, 0, 0, 789, 129, 1, 0, 0, 0, 790, 791, 5, 79, 0, 0, 791,
    792, 3, 132, 66, 0, 792, 793, 5, 80, 0, 0, 793, 131, 1, 0, 0, 0, 794, 808, 3, 164, 82, 0, 795,
    808, 3, 142, 71, 0, 796, 808, 3, 134, 67, 0, 797, 808, 3, 148, 74, 0, 798, 799, 5, 15, 0, 0,
    799, 800, 5, 81, 0, 0, 800, 801, 3, 132, 66, 0, 801, 802, 5, 84, 0, 0, 802, 803, 3, 132, 66, 0,
    803, 804, 5, 84, 0, 0, 804, 805, 3, 132, 66, 0, 805, 806, 5, 82, 0, 0, 806, 808, 1, 0, 0, 0,
    807, 794, 1, 0, 0, 0, 807, 795, 1, 0, 0, 0, 807, 796, 1, 0, 0, 0, 807, 797, 1, 0, 0, 0, 807,
    798, 1, 0, 0, 0, 808, 133, 1, 0, 0, 0, 809, 810, 6, 67, -1, 0, 810, 819, 3, 138, 69, 0, 811,
    819, 3, 140, 70, 0, 812, 819, 3, 114, 57, 0, 813, 819, 3, 150, 75, 0, 814, 819, 3, 154, 77, 0,
    815, 819, 3, 152, 76, 0, 816, 819, 3, 86, 43, 0, 817, 819, 3, 160, 80, 0, 818, 809, 1, 0, 0, 0,
    818, 811, 1, 0, 0, 0, 818, 812, 1, 0, 0, 0, 818, 813, 1, 0, 0, 0, 818, 814, 1, 0, 0, 0, 818,
    815, 1, 0, 0, 0, 818, 816, 1, 0, 0, 0, 818, 817, 1, 0, 0, 0, 819, 827, 1, 0, 0, 0, 820, 821, 10,
    2, 0, 0, 821, 826, 3, 130, 65, 0, 822, 823, 10, 1, 0, 0, 823, 824, 5, 83, 0, 0, 824, 826, 3,
    136, 68, 0, 825, 820, 1, 0, 0, 0, 825, 822, 1, 0, 0, 0, 826, 829, 1, 0, 0, 0, 827, 825, 1, 0, 0,
    0, 827, 828, 1, 0, 0, 0, 828, 135, 1, 0, 0, 0, 829, 827, 1, 0, 0, 0, 830, 833, 3, 86, 43, 0,
    831, 833, 3, 160, 80, 0, 832, 830, 1, 0, 0, 0, 832, 831, 1, 0, 0, 0, 833, 137, 1, 0, 0, 0, 834,
    835, 5, 75, 0, 0, 835, 139, 1, 0, 0, 0, 836, 837, 5, 81, 0, 0, 837, 838, 3, 132, 66, 0, 838,
    839, 5, 82, 0, 0, 839, 141, 1, 0, 0, 0, 840, 843, 3, 144, 72, 0, 841, 843, 3, 146, 73, 0, 842,
    840, 1, 0, 0, 0, 842, 841, 1, 0, 0, 0, 843, 143, 1, 0, 0, 0, 844, 845, 5, 87, 0, 0, 845, 846, 3,
    134, 67, 0, 846, 145, 1, 0, 0, 0, 847, 848, 5, 67, 0, 0, 848, 849, 3, 134, 67, 0, 849, 147, 1,
    0, 0, 0, 850, 851, 3, 134, 67, 0, 851, 852, 3, 162, 81, 0, 852, 853, 3, 132, 66, 0, 853, 149, 1,
    0, 0, 0, 854, 855, 5, 79, 0, 0, 855, 856, 3, 106, 53, 0, 856, 857, 5, 80, 0, 0, 857, 151, 1, 0,
    0, 0, 858, 859, 5, 81, 0, 0, 859, 860, 3, 106, 53, 0, 860, 861, 5, 82, 0, 0, 861, 153, 1, 0, 0,
    0, 862, 863, 5, 79, 0, 0, 863, 864, 3, 156, 78, 0, 864, 865, 5, 80, 0, 0, 865, 155, 1, 0, 0, 0,
    866, 871, 3, 158, 79, 0, 867, 868, 5, 84, 0, 0, 868, 870, 3, 158, 79, 0, 869, 867, 1, 0, 0, 0,
    870, 873, 1, 0, 0, 0, 871, 869, 1, 0, 0, 0, 871, 872, 1, 0, 0, 0, 872, 157, 1, 0, 0, 0, 873,
    871, 1, 0, 0, 0, 874, 875, 3, 132, 66, 0, 875, 876, 5, 85, 0, 0, 876, 877, 3, 132, 66, 0, 877,
    159, 1, 0, 0, 0, 878, 879, 3, 90, 45, 0, 879, 881, 5, 81, 0, 0, 880, 882, 3, 98, 49, 0, 881,
    880, 1, 0, 0, 0, 881, 882, 1, 0, 0, 0, 882, 883, 1, 0, 0, 0, 883, 884, 5, 82, 0, 0, 884, 161, 1,
    0, 0, 0, 885, 886, 7, 3, 0, 0, 886, 163, 1, 0, 0, 0, 887, 888, 5, 32, 0, 0, 888, 889, 3, 108,
    54, 0, 889, 891, 5, 81, 0, 0, 890, 892, 3, 98, 49, 0, 891, 890, 1, 0, 0, 0, 891, 892, 1, 0, 0,
    0, 892, 893, 1, 0, 0, 0, 893, 894, 5, 82, 0, 0, 894, 165, 1, 0, 0, 0, 895, 896, 3, 84, 42, 0,
    896, 897, 5, 47, 0, 0, 897, 898, 3, 108, 54, 0, 898, 167, 1, 0, 0, 0, 899, 900, 3, 94, 47, 0,
    900, 901, 5, 90, 0, 0, 901, 902, 5, 33, 0, 0, 902, 907, 3, 108, 54, 0, 903, 904, 5, 84, 0, 0,
    904, 906, 3, 108, 54, 0, 905, 903, 1, 0, 0, 0, 906, 909, 1, 0, 0, 0, 907, 905, 1, 0, 0, 0, 907,
    908, 1, 0, 0, 0, 908, 910, 1, 0, 0, 0, 909, 907, 1, 0, 0, 0, 910, 911, 5, 91, 0, 0, 911, 169, 1,
    0, 0, 0, 912, 913, 5, 62, 0, 0, 913, 914, 5, 90, 0, 0, 914, 915, 5, 33, 0, 0, 915, 920, 3, 108,
    54, 0, 916, 917, 5, 84, 0, 0, 917, 919, 3, 108, 54, 0, 918, 916, 1, 0, 0, 0, 919, 922, 1, 0, 0,
    0, 920, 918, 1, 0, 0, 0, 920, 921, 1, 0, 0, 0, 921, 923, 1, 0, 0, 0, 922, 920, 1, 0, 0, 0, 923,
    924, 5, 71, 0, 0, 924, 925, 3, 108, 54, 0, 925, 926, 5, 91, 0, 0, 926, 171, 1, 0, 0, 0, 927,
    928, 5, 81, 0, 0, 928, 931, 3, 108, 54, 0, 929, 930, 5, 84, 0, 0, 930, 932, 3, 108, 54, 0, 931,
    929, 1, 0, 0, 0, 932, 933, 1, 0, 0, 0, 933, 931, 1, 0, 0, 0, 933, 934, 1, 0, 0, 0, 934, 935, 1,
    0, 0, 0, 935, 936, 5, 82, 0, 0, 936, 173, 1, 0, 0, 0, 937, 938, 5, 9, 0, 0, 938, 939, 3, 102,
    51, 0, 939, 940, 5, 71, 0, 0, 940, 941, 3, 132, 66, 0, 941, 175, 1, 0, 0, 0, 90, 177, 182, 188,
    202, 205, 212, 220, 226, 235, 244, 252, 262, 265, 271, 278, 286, 296, 304, 310, 316, 328, 331,
    338, 344, 357, 375, 378, 383, 389, 399, 408, 421, 430, 432, 440, 448, 456, 466, 474, 486, 500,
    504, 511, 518, 526, 535, 538, 552, 560, 566, 575, 580, 587, 595, 598, 607, 610, 616, 625, 634,
    637, 643, 650, 658, 665, 673, 680, 694, 700, 713, 720, 725, 732, 740, 747, 754, 763, 772, 807,
    818, 825, 827, 832, 842, 871, 881, 891, 907, 920, 933,
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
  public testStatement(): TestStatementContext[];
  public testStatement(i: number): TestStatementContext | null;
  public testStatement(i?: number): TestStatementContext[] | TestStatementContext | null {
    if (i === undefined) {
      return this.getRuleContexts(TestStatementContext);
    }

    return this.getRuleContext(i, TestStatementContext);
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
    return RefLangParser.RULE_testStatement;
  }
  public override enterRule(listener: RefLangListener): void {
    if (listener.enterTestStatement) {
      listener.enterTestStatement(this);
    }
  }
  public override exitRule(listener: RefLangListener): void {
    if (listener.exitTestStatement) {
      listener.exitTestStatement(this);
    }
  }
  public override accept<Result>(visitor: RefLangVisitor<Result>): Result | null {
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
  public identifierDef(): IdentifierDefContext {
    return this.getRuleContext(0, IdentifierDefContext)!;
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
  public identifierList(): IdentifierListContext {
    return this.getRuleContext(0, IdentifierListContext)!;
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
  public _classTypeName?: TypeNameContext;
  public _inheritsTypeName?: TypeNameContext;
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
  public typeName(): TypeNameContext[];
  public typeName(i: number): TypeNameContext | null;
  public typeName(i?: number): TypeNameContext[] | TypeNameContext | null {
    if (i === undefined) {
      return this.getRuleContexts(TypeNameContext);
    }

    return this.getRuleContext(i, TypeNameContext);
  }
  public GHOSTED(): antlr.TerminalNode | null {
    return this.getToken(RefLangParser.GHOSTED, 0);
  }
  public INHERITS(): antlr.TerminalNode | null {
    return this.getToken(RefLangParser.INHERITS, 0);
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

export class ConcreteClassMemberContext extends antlr.ParserRuleContext {
  public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
    super(parent, invokingState);
  }
  public constructorMember(): ConstructorMemberContext | null {
    return this.getRuleContext(0, ConstructorMemberContext);
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
    return RefLangParser.RULE_concreteClassMember;
  }
  public override enterRule(listener: RefLangListener): void {
    if (listener.enterConcreteClassMember) {
      listener.enterConcreteClassMember(this);
    }
  }
  public override exitRule(listener: RefLangListener): void {
    if (listener.exitConcreteClassMember) {
      listener.exitConcreteClassMember(this);
    }
  }
  public override accept<Result>(visitor: RefLangVisitor<Result>): Result | null {
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
  public typeName(): TypeNameContext[];
  public typeName(i: number): TypeNameContext | null;
  public typeName(i?: number): TypeNameContext[] | TypeNameContext | null {
    if (i === undefined) {
      return this.getRuleContexts(TypeNameContext);
    }

    return this.getRuleContext(i, TypeNameContext);
  }
  public GHOSTED(): antlr.TerminalNode | null {
    return this.getToken(RefLangParser.GHOSTED, 0);
  }
  public INHERITS(): antlr.TerminalNode | null {
    return this.getToken(RefLangParser.INHERITS, 0);
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
    return RefLangParser.RULE_abstractClassMember;
  }
  public override enterRule(listener: RefLangListener): void {
    if (listener.enterAbstractClassMember) {
      listener.enterAbstractClassMember(this);
    }
  }
  public override exitRule(listener: RefLangListener): void {
    if (listener.exitAbstractClassMember) {
      listener.exitAbstractClassMember(this);
    }
  }
  public override accept<Result>(visitor: RefLangVisitor<Result>): Result | null {
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
  public identifierDef(): IdentifierDefContext {
    return this.getRuleContext(0, IdentifierDefContext)!;
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
  public identifierDef(): IdentifierDefContext {
    return this.getRuleContext(0, IdentifierDefContext)!;
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

export class IfStatementContext extends antlr.ParserRuleContext {
  public _condition?: ExpressionContext;
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
  public expression(): ExpressionContext {
    return this.getRuleContext(0, ExpressionContext)!;
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
  public _condition?: ExpressionContext;
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
  public expression(): ExpressionContext {
    return this.getRuleContext(0, ExpressionContext)!;
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
  public identifierDef(): IdentifierDefContext {
    return this.getRuleContext(0, IdentifierDefContext)!;
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

export class ThisProcRefContext extends antlr.ParserRuleContext {
  public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
    super(parent, invokingState);
  }
  public THIS_INSTANCE(): antlr.TerminalNode {
    return this.getToken(RefLangParser.THIS_INSTANCE, 0)!;
  }
  public DOT(): antlr.TerminalNode {
    return this.getToken(RefLangParser.DOT, 0)!;
  }
  public methodName(): MethodNameContext {
    return this.getRuleContext(0, MethodNameContext)!;
  }
  public override get ruleIndex(): number {
    return RefLangParser.RULE_thisProcRef;
  }
  public override enterRule(listener: RefLangListener): void {
    if (listener.enterThisProcRef) {
      listener.enterThisProcRef(this);
    }
  }
  public override exitRule(listener: RefLangListener): void {
    if (listener.exitThisProcRef) {
      listener.exitThisProcRef(this);
    }
  }
  public override accept<Result>(visitor: RefLangVisitor<Result>): Result | null {
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
    return this.getToken(RefLangParser.DOT, 0)!;
  }
  public methodName(): MethodNameContext {
    return this.getRuleContext(0, MethodNameContext)!;
  }
  public override get ruleIndex(): number {
    return RefLangParser.RULE_instanceProcRef;
  }
  public override enterRule(listener: RefLangListener): void {
    if (listener.enterInstanceProcRef) {
      listener.enterInstanceProcRef(this);
    }
  }
  public override exitRule(listener: RefLangListener): void {
    if (listener.exitInstanceProcRef) {
      listener.exitInstanceProcRef(this);
    }
  }
  public override accept<Result>(visitor: RefLangVisitor<Result>): Result | null {
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
  public errorMessage(): ErrorMessageContext {
    return this.getRuleContext(0, ErrorMessageContext)!;
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
    return RefLangParser.RULE_errorMessage;
  }
  public override enterRule(listener: RefLangListener): void {
    if (listener.enterErrorMessage) {
      listener.enterErrorMessage(this);
    }
  }
  public override exitRule(listener: RefLangListener): void {
    if (listener.exitErrorMessage) {
      listener.exitErrorMessage(this);
    }
  }
  public override accept<Result>(visitor: RefLangVisitor<Result>): Result | null {
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
  public assertExpected(): AssertExpectedContext {
    return this.getRuleContext(0, AssertExpectedContext)!;
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
  public identifierDef(): IdentifierDefContext {
    return this.getRuleContext(0, IdentifierDefContext)!;
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
  public identifierDef(): IdentifierDefContext {
    return this.getRuleContext(0, IdentifierDefContext)!;
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
  public GHOSTED(): antlr.TerminalNode | null {
    return this.getToken(RefLangParser.GHOSTED, 0);
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
  public paramList(): ParamListContext | null {
    return this.getRuleContext(0, ParamListContext);
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
  public paramList(): ParamListContext | null {
    return this.getRuleContext(0, ParamListContext);
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

export class IdentifierDefContext extends antlr.ParserRuleContext {
  public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
    super(parent, invokingState);
  }
  public NAME_STARTING_LC(): antlr.TerminalNode {
    return this.getToken(RefLangParser.NAME_STARTING_LC, 0)!;
  }
  public override get ruleIndex(): number {
    return RefLangParser.RULE_identifierDef;
  }
  public override enterRule(listener: RefLangListener): void {
    if (listener.enterIdentifierDef) {
      listener.enterIdentifierDef(this);
    }
  }
  public override exitRule(listener: RefLangListener): void {
    if (listener.exitIdentifierDef) {
      listener.exitIdentifierDef(this);
    }
  }
  public override accept<Result>(visitor: RefLangVisitor<Result>): Result | null {
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
    return this.getToken(RefLangParser.NAME_STARTING_LC, 0)!;
  }
  public override get ruleIndex(): number {
    return RefLangParser.RULE_identifierUse;
  }
  public override enterRule(listener: RefLangListener): void {
    if (listener.enterIdentifierUse) {
      listener.enterIdentifierUse(this);
    }
  }
  public override exitRule(listener: RefLangListener): void {
    if (listener.exitIdentifierUse) {
      listener.exitIdentifierUse(this);
    }
  }
  public override accept<Result>(visitor: RefLangVisitor<Result>): Result | null {
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
    return this.getToken(RefLangParser.THIS_INSTANCE, 0);
  }
  public DOT(): antlr.TerminalNode | null {
    return this.getToken(RefLangParser.DOT, 0);
  }
  public assignable(): AssignableContext | null {
    return this.getRuleContext(0, AssignableContext);
  }
  public index(): IndexContext | null {
    return this.getRuleContext(0, IndexContext);
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
      return this.getTokens(RefLangParser.COMMA);
    } else {
      return this.getToken(RefLangParser.COMMA, i);
    }
  }
  public override get ruleIndex(): number {
    return RefLangParser.RULE_paramList;
  }
  public override enterRule(listener: RefLangListener): void {
    if (listener.enterParamList) {
      listener.enterParamList(this);
    }
  }
  public override exitRule(listener: RefLangListener): void {
    if (listener.exitParamList) {
      listener.exitParamList(this);
    }
  }
  public override accept<Result>(visitor: RefLangVisitor<Result>): Result | null {
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
      return this.getTokens(RefLangParser.COMMA);
    } else {
      return this.getToken(RefLangParser.COMMA, i);
    }
  }
  public override get ruleIndex(): number {
    return RefLangParser.RULE_identifierList;
  }
  public override enterRule(listener: RefLangListener): void {
    if (listener.enterIdentifierList) {
      listener.enterIdentifierList(this);
    }
  }
  public override exitRule(listener: RefLangListener): void {
    if (listener.exitIdentifierList) {
      listener.exitIdentifierList(this);
    }
  }
  public override accept<Result>(visitor: RefLangVisitor<Result>): Result | null {
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
    return RefLangParser.RULE_assertExpected;
  }
  public override enterRule(listener: RefLangListener): void {
    if (listener.enterAssertExpected) {
      listener.enterAssertExpected(this);
    }
  }
  public override exitRule(listener: RefLangListener): void {
    if (listener.exitAssertExpected) {
      listener.exitAssertExpected(this);
    }
  }
  public override accept<Result>(visitor: RefLangVisitor<Result>): Result | null {
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

export class InterpolatedStringContext extends antlr.ParserRuleContext {
  public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
    super(parent, invokingState);
  }
  public INTERPOLATED_STRING(): antlr.TerminalNode {
    return this.getToken(RefLangParser.INTERPOLATED_STRING, 0)!;
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
  public identifierUse(): IdentifierUseContext {
    return this.getRuleContext(0, IdentifierUseContext)!;
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
  public IF_(): antlr.TerminalNode | null {
    return this.getToken(RefLangParser.IF_, 0);
  }
  public OPEN_BRACKET(): antlr.TerminalNode | null {
    return this.getToken(RefLangParser.OPEN_BRACKET, 0);
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
  public CLOSE_BRACKET(): antlr.TerminalNode | null {
    return this.getToken(RefLangParser.CLOSE_BRACKET, 0);
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
    return this.getToken(RefLangParser.DOT, 0);
  }
  public chainable(): ChainableContext | null {
    return this.getRuleContext(0, ChainableContext);
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

export class TupleContext extends antlr.ParserRuleContext {
  public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
    super(parent, invokingState);
  }
  public OPEN_BRACKET(): antlr.TerminalNode {
    return this.getToken(RefLangParser.OPEN_BRACKET, 0)!;
  }
  public expressionList(): ExpressionListContext {
    return this.getRuleContext(0, ExpressionListContext)!;
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
  public POWER(): antlr.TerminalNode | null {
    return this.getToken(RefLangParser.POWER, 0);
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
  public identifierDef(): IdentifierDefContext {
    return this.getRuleContext(0, IdentifierDefContext)!;
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
  public paramList(): ParamListContext {
    return this.getRuleContext(0, ParamListContext)!;
  }
  public ARROW(): antlr.TerminalNode {
    return this.getToken(RefLangParser.ARROW, 0)!;
  }
  public expression(): ExpressionContext {
    return this.getRuleContext(0, ExpressionContext)!;
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
