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
  public static readonly RULE_throwStatement = 24;
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
  public static readonly RULE_term = 57;
  public static readonly RULE_chainHead = 58;
  public static readonly RULE_thisInstance = 59;
  public static readonly RULE_chainable = 60;
  public static readonly RULE_bracketedExpression = 61;
  public static readonly RULE_unaryExpression = 62;
  public static readonly RULE_negateNumeric = 63;
  public static readonly RULE_negateLogical = 64;
  public static readonly RULE_binaryExpression = 65;
  public static readonly RULE_tuple = 66;
  public static readonly RULE_methodCall = 67;
  public static readonly RULE_binaryOperator = 68;
  public static readonly RULE_newInstance = 69;
  public static readonly RULE_paramDef = 70;
  public static readonly RULE_typeGeneric = 71;
  public static readonly RULE_typeFunc = 72;
  public static readonly RULE_typeTuple = 73;
  public static readonly RULE_lambda = 74;
  public static readonly RULE_list = 75;
  public static readonly RULE_interpolatedString = 76;
  public static readonly RULE_power = 77;

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
    "enumValue",
    "litString",
    "index",
    "identifierWithOptIndexes",
    "propertyRef",
    "expression",
    "term",
    "chainHead",
    "thisInstance",
    "chainable",
    "bracketedExpression",
    "unaryExpression",
    "negateNumeric",
    "negateLogical",
    "binaryExpression",
    "tuple",
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
        this.state = 157;
        this.errorHandler.sync(this);
        switch (this.interpreter.adaptivePredict(this.tokenStream, 0, this.context)) {
          case 1:
            {
              this.state = 156;
              this.comment();
            }
            break;
        }
        this.state = 162;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (
          ((_la & ~0x1f) === 0 && ((1 << _la) & 541131794) !== 0) ||
          _la === 35 ||
          _la === 40 ||
          _la === 108 ||
          _la === 124
        ) {
          {
            {
              this.state = 159;
              this.global();
            }
          }
          this.state = 164;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 168;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (_la === 97) {
          {
            {
              this.state = 165;
              this.match(RefLangParser.NL);
            }
          }
          this.state = 170;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 171;
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
      this.state = 182;
      this.errorHandler.sync(this);
      switch (this.interpreter.adaptivePredict(this.tokenStream, 3, this.context)) {
        case 1:
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 173;
            this.main();
          }
          break;
        case 2:
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 174;
            this.function_();
          }
          break;
        case 3:
          this.enterOuterAlt(localContext, 3);
          {
            this.state = 175;
            this.test();
          }
          break;
        case 4:
          this.enterOuterAlt(localContext, 4);
          {
            this.state = 176;
            this.procedure();
          }
          break;
        case 5:
          this.enterOuterAlt(localContext, 5);
          {
            this.state = 177;
            this.constant();
          }
          break;
        case 6:
          this.enterOuterAlt(localContext, 6);
          {
            this.state = 178;
            this.enum_();
          }
          break;
        case 7:
          this.enterOuterAlt(localContext, 7);
          {
            this.state = 179;
            this.concreteClass();
          }
          break;
        case 8:
          this.enterOuterAlt(localContext, 8);
          {
            this.state = 180;
            this.abstractClass();
          }
          break;
        case 9:
          this.enterOuterAlt(localContext, 9);
          {
            this.state = 181;
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
        this.state = 185;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 108) {
          {
            this.state = 184;
            this.match(RefLangParser.GHOSTED);
          }
        }

        this.state = 187;
        this.match(RefLangParser.MAIN);
        this.state = 188;
        this.match(RefLangParser.NL);
        this.state = 192;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (
          ((_la & ~0x1f) === 0 && ((1 << _la) & 1337696) !== 0) ||
          _la === 42 ||
          _la === 44 ||
          _la === 108 ||
          _la === 124
        ) {
          {
            {
              this.state = 189;
              this.ordinaryStatement();
            }
          }
          this.state = 194;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 195;
        this.match(RefLangParser.END);
        this.state = 196;
        this.match(RefLangParser.MAIN);
        this.state = 197;
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
        this.state = 200;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 108) {
          {
            this.state = 199;
            this.match(RefLangParser.GHOSTED);
          }
        }

        this.state = 202;
        this.match(RefLangParser.FUNCTION);
        this.state = 203;
        this.methodName();
        this.state = 204;
        this.match(RefLangParser.OPEN_BRACKET);
        this.state = 206;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 99) {
          {
            this.state = 205;
            this.paramsList();
          }
        }

        this.state = 208;
        this.match(RefLangParser.CLOSE_BRACKET);
        this.state = 209;
        this.match(RefLangParser.RETURNS);
        this.state = 210;
        this.type_();
        this.state = 211;
        this.match(RefLangParser.NL);
        this.state = 216;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (
          ((_la & ~0x1f) === 0 && ((1 << _la) & 2148821344) !== 0) ||
          _la === 42 ||
          _la === 44 ||
          _la === 108 ||
          _la === 124
        ) {
          {
            this.state = 214;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 8, this.context)) {
              case 1:
                {
                  this.state = 212;
                  this.letStatement();
                }
                break;
              case 2:
                {
                  this.state = 213;
                  this.ordinaryStatement();
                }
                break;
            }
          }
          this.state = 218;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 219;
        this.returnStatement();
        this.state = 220;
        this.match(RefLangParser.END);
        this.state = 221;
        this.match(RefLangParser.FUNCTION);
        this.state = 222;
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
        this.state = 225;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 108) {
          {
            this.state = 224;
            this.match(RefLangParser.GHOSTED);
          }
        }

        this.state = 227;
        this.match(RefLangParser.TEST);
        this.state = 228;
        this.testName();
        this.state = 229;
        this.match(RefLangParser.NL);
        this.state = 236;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (
          (((_la - 17) & ~0x1f) === 0 && ((1 << (_la - 17)) & 134234113) !== 0) ||
          _la === 108 ||
          _la === 124
        ) {
          {
            this.state = 234;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 11, this.context)) {
              case 1:
                {
                  this.state = 230;
                  this.assert();
                }
                break;
              case 2:
                {
                  this.state = 231;
                  this.letStatement();
                }
                break;
              case 3:
                {
                  this.state = 232;
                  this.variableDefinition();
                }
                break;
              case 4:
                {
                  this.state = 233;
                  this.comment();
                }
                break;
            }
          }
          this.state = 238;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 239;
        this.match(RefLangParser.END);
        this.state = 240;
        this.match(RefLangParser.TEST);
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
  public procedure(): ProcedureContext {
    let localContext = new ProcedureContext(this.context, this.state);
    this.enterRule(localContext, 10, RefLangParser.RULE_procedure);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 244;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 108) {
          {
            this.state = 243;
            this.match(RefLangParser.GHOSTED);
          }
        }

        this.state = 246;
        this.match(RefLangParser.PROCEDURE);
        this.state = 247;
        this.methodName();
        this.state = 248;
        this.match(RefLangParser.OPEN_BRACKET);
        this.state = 250;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 99) {
          {
            this.state = 249;
            this.paramsList();
          }
        }

        this.state = 252;
        this.match(RefLangParser.CLOSE_BRACKET);
        this.state = 253;
        this.match(RefLangParser.NL);
        this.state = 257;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (
          ((_la & ~0x1f) === 0 && ((1 << _la) & 1337696) !== 0) ||
          _la === 42 ||
          _la === 44 ||
          _la === 108 ||
          _la === 124
        ) {
          {
            {
              this.state = 254;
              this.ordinaryStatement();
            }
          }
          this.state = 259;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 260;
        this.match(RefLangParser.END);
        this.state = 261;
        this.match(RefLangParser.PROCEDURE);
        this.state = 262;
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
        this.state = 265;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 108) {
          {
            this.state = 264;
            this.match(RefLangParser.GHOSTED);
          }
        }

        this.state = 267;
        this.match(RefLangParser.CONSTANT);
        this.state = 268;
        this.identifier();
        this.state = 269;
        this.match(RefLangParser.SET);
        this.state = 270;
        this.match(RefLangParser.TO);
        this.state = 271;
        this.constantValue();
        this.state = 272;
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
        this.state = 275;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 108) {
          {
            this.state = 274;
            this.match(RefLangParser.GHOSTED);
          }
        }

        this.state = 277;
        this.match(RefLangParser.ENUM);
        this.state = 278;
        this.typeName();
        this.state = 279;
        this.enumValuesList();
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
  public concreteClass(): ConcreteClassContext {
    let localContext = new ConcreteClassContext(this.context, this.state);
    this.enterRule(localContext, 16, RefLangParser.RULE_concreteClass);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 283;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 108) {
          {
            this.state = 282;
            this.match(RefLangParser.GHOSTED);
          }
        }

        this.state = 285;
        this.match(RefLangParser.CLASS);
        this.state = 286;
        this.typeName();
        this.state = 289;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 30) {
          {
            this.state = 287;
            this.match(RefLangParser.INHERITS);
            this.state = 288;
            this.typeName();
          }
        }

        this.state = 291;
        this.match(RefLangParser.NL);
        this.state = 299;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (
          (((_la - 23) & ~0x1f) === 0 && ((1 << (_la - 23)) & 14401) !== 0) ||
          _la === 108 ||
          _la === 124
        ) {
          {
            this.state = 297;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 20, this.context)) {
              case 1:
                {
                  this.state = 292;
                  this.constructorMember();
                }
                break;
              case 2:
                {
                  this.state = 293;
                  this.property();
                }
                break;
              case 3:
                {
                  this.state = 294;
                  this.functionMethod();
                }
                break;
              case 4:
                {
                  this.state = 295;
                  this.procedureMethod();
                }
                break;
              case 5:
                {
                  this.state = 296;
                  this.comment();
                }
                break;
            }
          }
          this.state = 301;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 302;
        this.match(RefLangParser.END);
        this.state = 303;
        this.match(RefLangParser.CLASS);
        this.state = 304;
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
        this.state = 307;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 108) {
          {
            this.state = 306;
            this.match(RefLangParser.GHOSTED);
          }
        }

        this.state = 309;
        this.match(RefLangParser.ABSTRACT);
        this.state = 310;
        this.match(RefLangParser.CLASS);
        this.state = 311;
        this.typeName();
        this.state = 314;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 30) {
          {
            this.state = 312;
            this.match(RefLangParser.INHERITS);
            this.state = 313;
            this.typeName();
          }
        }

        this.state = 316;
        this.match(RefLangParser.NL);
        this.state = 325;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (
          (((_la - 16) & ~0x1f) === 0 && ((1 << (_la - 16)) & 1843201) !== 0) ||
          _la === 108 ||
          _la === 124
        ) {
          {
            this.state = 323;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 24, this.context)) {
              case 1:
                {
                  this.state = 317;
                  this.property();
                }
                break;
              case 2:
                {
                  this.state = 318;
                  this.functionMethod();
                }
                break;
              case 3:
                {
                  this.state = 319;
                  this.procedureMethod();
                }
                break;
              case 4:
                {
                  this.state = 320;
                  this.abstractFunction();
                }
                break;
              case 5:
                {
                  this.state = 321;
                  this.abstractProcedure();
                }
                break;
              case 6:
                {
                  this.state = 322;
                  this.comment();
                }
                break;
            }
          }
          this.state = 327;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 328;
        this.match(RefLangParser.END);
        this.state = 329;
        this.match(RefLangParser.CLASS);
        this.state = 330;
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
        this.state = 332;
        this.commentText();
        this.state = 333;
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
        this.state = 335;
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
      this.state = 348;
      this.errorHandler.sync(this);
      switch (this.interpreter.adaptivePredict(this.tokenStream, 26, this.context)) {
        case 1:
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 337;
            this.print();
          }
          break;
        case 2:
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 338;
            this.variableDefinition();
          }
          break;
        case 3:
          this.enterOuterAlt(localContext, 3);
          {
            this.state = 339;
            this.assignment();
          }
          break;
        case 4:
          this.enterOuterAlt(localContext, 4);
          {
            this.state = 340;
            this.inputStatement();
          }
          break;
        case 5:
          this.enterOuterAlt(localContext, 5);
          {
            this.state = 341;
            this.ifStatement();
          }
          break;
        case 6:
          this.enterOuterAlt(localContext, 6);
          {
            this.state = 342;
            this.whileLoop();
          }
          break;
        case 7:
          this.enterOuterAlt(localContext, 7);
          {
            this.state = 343;
            this.forLoop();
          }
          break;
        case 8:
          this.enterOuterAlt(localContext, 8);
          {
            this.state = 344;
            this.procedureCall();
          }
          break;
        case 9:
          this.enterOuterAlt(localContext, 9);
          {
            this.state = 345;
            this.tryStatement();
          }
          break;
        case 10:
          this.enterOuterAlt(localContext, 10);
          {
            this.state = 346;
            this.throwStatement();
          }
          break;
        case 11:
          this.enterOuterAlt(localContext, 11);
          {
            this.state = 347;
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
        this.state = 351;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 108) {
          {
            this.state = 350;
            this.match(RefLangParser.GHOSTED);
          }
        }

        this.state = 353;
        this.match(RefLangParser.IF);
        this.state = 354;
        this.expression(0);
        this.state = 355;
        this.match(RefLangParser.THEN);
        this.state = 356;
        this.match(RefLangParser.NL);
        this.state = 362;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (
          ((_la & ~0x1f) === 0 && ((1 << _la) & 1337708) !== 0) ||
          _la === 42 ||
          _la === 44 ||
          _la === 108 ||
          _la === 124
        ) {
          {
            this.state = 360;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 28, this.context)) {
              case 1:
                {
                  this.state = 357;
                  this.elseIfClause();
                }
                break;
              case 2:
                {
                  this.state = 358;
                  this.elseClause();
                }
                break;
              case 3:
                {
                  this.state = 359;
                  this.ordinaryStatement();
                }
                break;
            }
          }
          this.state = 364;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 365;
        this.match(RefLangParser.END);
        this.state = 366;
        this.match(RefLangParser.IF);
        this.state = 367;
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
        this.state = 370;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 108) {
          {
            this.state = 369;
            this.match(RefLangParser.GHOSTED);
          }
        }

        this.state = 372;
        this.match(RefLangParser.WHILE);
        this.state = 373;
        this.expression(0);
        this.state = 374;
        this.match(RefLangParser.NL);
        this.state = 378;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (
          ((_la & ~0x1f) === 0 && ((1 << _la) & 1337696) !== 0) ||
          _la === 42 ||
          _la === 44 ||
          _la === 108 ||
          _la === 124
        ) {
          {
            {
              this.state = 375;
              this.ordinaryStatement();
            }
          }
          this.state = 380;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 381;
        this.match(RefLangParser.END);
        this.state = 382;
        this.match(RefLangParser.WHILE);
        this.state = 383;
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
        this.state = 386;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 108) {
          {
            this.state = 385;
            this.match(RefLangParser.GHOSTED);
          }
        }

        this.state = 388;
        this.match(RefLangParser.FOR);
        this.state = 389;
        this.identifier();
        this.state = 390;
        this.match(RefLangParser.IN);
        this.state = 391;
        this.expression(0);
        this.state = 392;
        this.match(RefLangParser.NL);
        this.state = 396;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (
          ((_la & ~0x1f) === 0 && ((1 << _la) & 1337696) !== 0) ||
          _la === 42 ||
          _la === 44 ||
          _la === 108 ||
          _la === 124
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
        this.match(RefLangParser.FOR);
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
  public tryStatement(): TryStatementContext {
    let localContext = new TryStatementContext(this.context, this.state);
    this.enterRule(localContext, 32, RefLangParser.RULE_tryStatement);
    let _la: number;
    try {
      let alternative: number;
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 404;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 108) {
          {
            this.state = 403;
            this.match(RefLangParser.GHOSTED);
          }
        }

        this.state = 406;
        this.match(RefLangParser.TRY);
        this.state = 407;
        this.match(RefLangParser.NL);
        this.state = 411;
        this.errorHandler.sync(this);
        alternative = this.interpreter.adaptivePredict(this.tokenStream, 35, this.context);
        while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
          if (alternative === 1) {
            {
              {
                this.state = 408;
                this.ordinaryStatement();
              }
            }
          }
          this.state = 413;
          this.errorHandler.sync(this);
          alternative = this.interpreter.adaptivePredict(this.tokenStream, 35, this.context);
        }
        this.state = 414;
        this.catchStatement();
        this.state = 418;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (
          ((_la & ~0x1f) === 0 && ((1 << _la) & 1337696) !== 0) ||
          _la === 42 ||
          _la === 44 ||
          _la === 108 ||
          _la === 124
        ) {
          {
            {
              this.state = 415;
              this.ordinaryStatement();
            }
          }
          this.state = 420;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 421;
        this.match(RefLangParser.END);
        this.state = 422;
        this.match(RefLangParser.TRY);
        this.state = 423;
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
        this.state = 426;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 108) {
          {
            this.state = 425;
            this.match(RefLangParser.GHOSTED);
          }
        }

        this.state = 428;
        this.match(RefLangParser.ASSERT);
        this.state = 429;
        this.assertActual();
        this.state = 430;
        this.match(RefLangParser.EVALUATES);
        this.state = 431;
        this.match(RefLangParser.TO);
        this.state = 432;
        this.expression(0);
        this.state = 433;
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
        this.state = 436;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 108) {
          {
            this.state = 435;
            this.match(RefLangParser.GHOSTED);
          }
        }

        this.state = 438;
        this.match(RefLangParser.LET);
        this.state = 439;
        this.identifier();
        this.state = 440;
        this.match(RefLangParser.BE);
        this.state = 441;
        this.expression(0);
        this.state = 442;
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
        this.state = 445;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 108) {
          {
            this.state = 444;
            this.match(RefLangParser.GHOSTED);
          }
        }

        this.state = 447;
        this.match(RefLangParser.PRINT);
        this.state = 448;
        this.match(RefLangParser.OPEN_BRACKET);
        this.state = 450;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (
          _la === 15 ||
          _la === 32 ||
          (((_la - 57) & ~0x1f) === 0 && ((1 << (_la - 57)) & 2190214367) !== 0) ||
          (((_la - 99) & ~0x1f) === 0 && ((1 << (_la - 99)) & 127) !== 0)
        ) {
          {
            this.state = 449;
            this.expression(0);
          }
        }

        this.state = 452;
        this.match(RefLangParser.CLOSE_BRACKET);
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
  public variableDefinition(): VariableDefinitionContext {
    let localContext = new VariableDefinitionContext(this.context, this.state);
    this.enterRule(localContext, 40, RefLangParser.RULE_variableDefinition);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 456;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 108) {
          {
            this.state = 455;
            this.match(RefLangParser.GHOSTED);
          }
        }

        this.state = 458;
        this.match(RefLangParser.VARIABLE);
        this.state = 459;
        this.identifier();
        this.state = 460;
        this.match(RefLangParser.SET);
        this.state = 461;
        this.match(RefLangParser.TO);
        this.state = 462;
        this.expression(0);
        this.state = 463;
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
        this.state = 466;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 108) {
          {
            this.state = 465;
            this.match(RefLangParser.GHOSTED);
          }
        }

        this.state = 468;
        this.match(RefLangParser.ASSIGN);
        this.state = 469;
        this.assignable();
        this.state = 470;
        this.match(RefLangParser.TO);
        this.state = 471;
        this.expression(0);
        this.state = 472;
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
        this.state = 475;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 108) {
          {
            this.state = 474;
            this.match(RefLangParser.GHOSTED);
          }
        }

        this.state = 477;
        this.match(RefLangParser.INPUT);
        this.state = 478;
        this.identifier();
        this.state = 479;
        this.match(RefLangParser.SET);
        this.state = 480;
        this.match(RefLangParser.TO);
        this.state = 481;
        this.methodName();
        this.state = 482;
        this.match(RefLangParser.OPEN_BRACKET);
        this.state = 483;
        this.expression(0);
        this.state = 484;
        this.match(RefLangParser.CLOSE_BRACKET);
        this.state = 485;
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
        this.state = 488;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 108) {
          {
            this.state = 487;
            this.match(RefLangParser.GHOSTED);
          }
        }

        this.state = 490;
        this.match(RefLangParser.CALL);
        this.state = 491;
        this.term();
        this.state = 492;
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
    this.enterRule(localContext, 48, RefLangParser.RULE_throwStatement);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 495;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 108) {
          {
            this.state = 494;
            this.match(RefLangParser.GHOSTED);
          }
        }

        this.state = 497;
        this.match(RefLangParser.THROW);
        this.state = 498;
        this.typeName();
        this.state = 499;
        this.litString();
        this.state = 500;
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
    this.enterRule(localContext, 50, RefLangParser.RULE_returnStatement);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 502;
        this.match(RefLangParser.RETURN);
        this.state = 503;
        this.expression(0);
        this.state = 504;
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
    this.enterRule(localContext, 52, RefLangParser.RULE_elseIfClause);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 507;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 108) {
          {
            this.state = 506;
            this.match(RefLangParser.GHOSTED);
          }
        }

        this.state = 509;
        this.match(RefLangParser.ELIF);
        this.state = 510;
        this.expression(0);
        this.state = 511;
        this.match(RefLangParser.THEN);
        this.state = 512;
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
    this.enterRule(localContext, 54, RefLangParser.RULE_elseClause);
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
            this.match(RefLangParser.GHOSTED);
          }
        }

        this.state = 517;
        this.match(RefLangParser.ELSE);
        this.state = 518;
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
    this.enterRule(localContext, 56, RefLangParser.RULE_catchStatement);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 521;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 108) {
          {
            this.state = 520;
            this.match(RefLangParser.GHOSTED);
          }
        }

        this.state = 523;
        this.match(RefLangParser.CATCH);
        this.state = 524;
        this.identifier();
        this.state = 525;
        this.match(RefLangParser.AS);
        this.state = 526;
        this.typeName();
        this.state = 527;
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
    this.enterRule(localContext, 58, RefLangParser.RULE_constructorMember);
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
            this.match(RefLangParser.GHOSTED);
          }
        }

        this.state = 532;
        this.match(RefLangParser.CONSTRUCTOR);
        this.state = 533;
        this.match(RefLangParser.OPEN_BRACKET);
        this.state = 535;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 99) {
          {
            this.state = 534;
            this.paramsList();
          }
        }

        this.state = 537;
        this.match(RefLangParser.CLOSE_BRACKET);
        this.state = 538;
        this.match(RefLangParser.NL);
        this.state = 542;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (
          ((_la & ~0x1f) === 0 && ((1 << _la) & 1337696) !== 0) ||
          _la === 42 ||
          _la === 44 ||
          _la === 108 ||
          _la === 124
        ) {
          {
            {
              this.state = 539;
              this.ordinaryStatement();
            }
          }
          this.state = 544;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 545;
        this.match(RefLangParser.END);
        this.state = 546;
        this.match(RefLangParser.CONSTRUCTOR);
        this.state = 547;
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
    this.enterRule(localContext, 60, RefLangParser.RULE_property);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 550;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 34) {
          {
            this.state = 549;
            this.match(RefLangParser.PRIVATE);
          }
        }

        this.state = 552;
        this.match(RefLangParser.PROPERTY);
        this.state = 553;
        this.identifier();
        this.state = 554;
        this.match(RefLangParser.AS);
        this.state = 555;
        this.type_();
        this.state = 556;
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
    this.enterRule(localContext, 62, RefLangParser.RULE_functionMethod);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 559;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 108) {
          {
            this.state = 558;
            this.match(RefLangParser.GHOSTED);
          }
        }

        this.state = 562;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 34) {
          {
            this.state = 561;
            this.match(RefLangParser.PRIVATE);
          }
        }

        this.state = 564;
        this.match(RefLangParser.FUNCTION);
        this.state = 565;
        this.methodName();
        this.state = 566;
        this.match(RefLangParser.OPEN_BRACKET);
        this.state = 568;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 99) {
          {
            this.state = 567;
            this.paramsList();
          }
        }

        this.state = 570;
        this.match(RefLangParser.CLOSE_BRACKET);
        this.state = 571;
        this.match(RefLangParser.RETURNS);
        this.state = 572;
        this.type_();
        this.state = 573;
        this.match(RefLangParser.NL);
        this.state = 578;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (
          ((_la & ~0x1f) === 0 && ((1 << _la) & 2148821344) !== 0) ||
          _la === 42 ||
          _la === 44 ||
          _la === 108 ||
          _la === 124
        ) {
          {
            this.state = 576;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 56, this.context)) {
              case 1:
                {
                  this.state = 574;
                  this.letStatement();
                }
                break;
              case 2:
                {
                  this.state = 575;
                  this.ordinaryStatement();
                }
                break;
            }
          }
          this.state = 580;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 581;
        this.returnStatement();
        this.state = 582;
        this.match(RefLangParser.END);
        this.state = 583;
        this.match(RefLangParser.FUNCTION);
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
  public procedureMethod(): ProcedureMethodContext {
    let localContext = new ProcedureMethodContext(this.context, this.state);
    this.enterRule(localContext, 64, RefLangParser.RULE_procedureMethod);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 587;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 108) {
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
        this.match(RefLangParser.PROCEDURE);
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
        this.match(RefLangParser.NL);
        this.state = 603;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (
          ((_la & ~0x1f) === 0 && ((1 << _la) & 1337696) !== 0) ||
          _la === 42 ||
          _la === 44 ||
          _la === 108 ||
          _la === 124
        ) {
          {
            {
              this.state = 600;
              this.ordinaryStatement();
            }
          }
          this.state = 605;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 606;
        this.match(RefLangParser.END);
        this.state = 607;
        this.match(RefLangParser.PROCEDURE);
        this.state = 608;
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
    this.enterRule(localContext, 66, RefLangParser.RULE_abstractFunction);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 611;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 108) {
          {
            this.state = 610;
            this.match(RefLangParser.GHOSTED);
          }
        }

        this.state = 613;
        this.match(RefLangParser.ABSTRACT);
        this.state = 614;
        this.match(RefLangParser.FUNCTION);
        this.state = 615;
        this.methodName();
        this.state = 616;
        this.match(RefLangParser.OPEN_BRACKET);
        this.state = 618;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 99) {
          {
            this.state = 617;
            this.paramsList();
          }
        }

        this.state = 620;
        this.match(RefLangParser.CLOSE_BRACKET);
        this.state = 621;
        this.match(RefLangParser.RETURNS);
        this.state = 622;
        this.type_();
        this.state = 623;
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
    this.enterRule(localContext, 68, RefLangParser.RULE_abstractProcedure);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 626;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 108) {
          {
            this.state = 625;
            this.match(RefLangParser.GHOSTED);
          }
        }

        this.state = 628;
        this.match(RefLangParser.ABSTRACT);
        this.state = 629;
        this.match(RefLangParser.PROCEDURE);
        this.state = 630;
        this.methodName();
        this.state = 631;
        this.match(RefLangParser.OPEN_BRACKET);
        this.state = 633;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 99) {
          {
            this.state = 632;
            this.paramsList();
          }
        }

        this.state = 635;
        this.match(RefLangParser.CLOSE_BRACKET);
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
  public identifier(): IdentifierContext {
    let localContext = new IdentifierContext(this.context, this.state);
    this.enterRule(localContext, 70, RefLangParser.RULE_identifier);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 638;
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
    this.enterRule(localContext, 72, RefLangParser.RULE_assignable);
    try {
      this.state = 642;
      this.errorHandler.sync(this);
      switch (this.tokenStream.LA(1)) {
        case RefLangParser.NAME_STARTING_LC:
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 640;
            this.identifierWithOptIndexes();
          }
          break;
        case RefLangParser.THIS_INSTANCE:
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 641;
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
    this.enterRule(localContext, 74, RefLangParser.RULE_methodName);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 644;
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
    this.enterRule(localContext, 76, RefLangParser.RULE_testName);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 646;
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
    this.enterRule(localContext, 78, RefLangParser.RULE_typeName);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 648;
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
    this.enterRule(localContext, 80, RefLangParser.RULE_constantValue);
    try {
      this.state = 652;
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
        case RefLangParser.LITERAL_STRING:
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 650;
            this.litValue();
          }
          break;
        case RefLangParser.NAME_STARTING_LC:
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 651;
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
    this.enterRule(localContext, 82, RefLangParser.RULE_argList);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 654;
        this.argument();
        this.state = 659;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (_la === 85) {
          {
            {
              this.state = 655;
              this.match(RefLangParser.COMMA);
              this.state = 656;
              this.argument();
            }
          }
          this.state = 661;
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
    this.enterRule(localContext, 84, RefLangParser.RULE_argument);
    try {
      this.state = 664;
      this.errorHandler.sync(this);
      switch (this.tokenStream.LA(1)) {
        case RefLangParser.LAMBDA:
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 662;
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
        case RefLangParser.LITERAL_STRING:
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 663;
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
    this.enterRule(localContext, 86, RefLangParser.RULE_paramsList);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 666;
        this.paramDef();
        this.state = 671;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (_la === 85) {
          {
            {
              this.state = 667;
              this.match(RefLangParser.COMMA);
              this.state = 668;
              this.paramDef();
            }
          }
          this.state = 673;
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
    this.enterRule(localContext, 88, RefLangParser.RULE_type);
    try {
      this.state = 678;
      this.errorHandler.sync(this);
      switch (this.interpreter.adaptivePredict(this.tokenStream, 71, this.context)) {
        case 1:
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 674;
            this.typeTuple();
          }
          break;
        case 2:
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 675;
            this.typeName();
          }
          break;
        case 3:
          this.enterOuterAlt(localContext, 3);
          {
            this.state = 676;
            this.typeGeneric();
          }
          break;
        case 4:
          this.enterOuterAlt(localContext, 4);
          {
            this.state = 677;
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
    this.enterRule(localContext, 90, RefLangParser.RULE_enumValuesList);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 680;
        this.identifier();
        this.state = 685;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (_la === 85) {
          {
            {
              this.state = 681;
              this.match(RefLangParser.COMMA);
              this.state = 682;
              this.identifier();
            }
          }
          this.state = 687;
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
    this.enterRule(localContext, 92, RefLangParser.RULE_assertActual);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 688;
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
    this.enterRule(localContext, 94, RefLangParser.RULE_litValue);
    try {
      this.state = 695;
      this.errorHandler.sync(this);
      switch (this.tokenStream.LA(1)) {
        case RefLangParser.TRUE:
        case RefLangParser.FALSE:
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 690;
            this.litBoolean();
          }
          break;
        case RefLangParser.LITERAL_BINARY:
        case RefLangParser.LITERAL_HEX:
        case RefLangParser.LITERAL_INTEGER:
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 691;
            this.litInt();
          }
          break;
        case RefLangParser.LITERAL_FLOAT:
          this.enterOuterAlt(localContext, 3);
          {
            this.state = 692;
            this.litFloat();
          }
          break;
        case RefLangParser.INTERPOLATED_STRING_PREFIX:
        case RefLangParser.LITERAL_STRING:
          this.enterOuterAlt(localContext, 4);
          {
            this.state = 693;
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
            this.state = 694;
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
    this.enterRule(localContext, 96, RefLangParser.RULE_litBoolean);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 697;
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
    this.enterRule(localContext, 98, RefLangParser.RULE_litInt);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 699;
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
    this.enterRule(localContext, 100, RefLangParser.RULE_litFloat);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 701;
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
  public enumValue(): EnumValueContext {
    let localContext = new EnumValueContext(this.context, this.state);
    this.enterRule(localContext, 102, RefLangParser.RULE_enumValue);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 703;
        this.typeName();
        this.state = 704;
        this.match(RefLangParser.DOT);
        this.state = 705;
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
    this.enterRule(localContext, 104, RefLangParser.RULE_litString);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 708;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 75) {
          {
            this.state = 707;
            this.match(RefLangParser.INTERPOLATED_STRING_PREFIX);
          }
        }

        this.state = 710;
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
  public index(): IndexContext {
    let localContext = new IndexContext(this.context, this.state);
    this.enterRule(localContext, 106, RefLangParser.RULE_index);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 712;
        this.match(RefLangParser.OPEN_SQ_BRACKET);
        this.state = 713;
        this.expression(0);
        this.state = 714;
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
    this.enterRule(localContext, 108, RefLangParser.RULE_identifierWithOptIndexes);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 716;
        this.identifier();
        this.state = 720;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (_la === 80) {
          {
            {
              this.state = 717;
              this.index();
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
  public propertyRef(): PropertyRefContext {
    let localContext = new PropertyRefContext(this.context, this.state);
    this.enterRule(localContext, 110, RefLangParser.RULE_propertyRef);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 723;
        this.match(RefLangParser.THIS_INSTANCE);
        this.state = 724;
        this.match(RefLangParser.DOT);
        this.state = 725;
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
    this.enterRecursionRule(localContext, 112, RefLangParser.RULE_expression, _p);
    try {
      let alternative: number;
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 740;
        this.errorHandler.sync(this);
        switch (this.tokenStream.LA(1)) {
          case RefLangParser.NEW:
            {
              this.state = 728;
              this.newInstance();
            }
            break;
          case RefLangParser.NOT:
          case RefLangParser.MINUS:
            {
              this.state = 729;
              this.unaryExpression();
            }
            break;
          case RefLangParser.INT_NAME:
          case RefLangParser.FLOAT_NAME:
          case RefLangParser.BOOL_NAME:
          case RefLangParser.STRING_NAME:
          case RefLangParser.LIST_NAME:
          case RefLangParser.TRUE:
          case RefLangParser.FALSE:
          case RefLangParser.INTERPOLATED_STRING_PREFIX:
          case RefLangParser.THIS_INSTANCE:
          case RefLangParser.OPEN_SQ_BRACKET:
          case RefLangParser.OPEN_BRACKET:
          case RefLangParser.NAME_STARTING_LC:
          case RefLangParser.NAME_STARTING_UC:
          case RefLangParser.LITERAL_BINARY:
          case RefLangParser.LITERAL_HEX:
          case RefLangParser.LITERAL_INTEGER:
          case RefLangParser.LITERAL_FLOAT:
          case RefLangParser.LITERAL_STRING:
            {
              this.state = 730;
              this.term();
            }
            break;
          case RefLangParser.IF_:
            {
              this.state = 731;
              this.match(RefLangParser.IF_);
              this.state = 732;
              this.match(RefLangParser.OPEN_BRACKET);
              this.state = 733;
              this.expression(0);
              this.state = 734;
              this.match(RefLangParser.COMMA);
              this.state = 735;
              this.expression(0);
              this.state = 736;
              this.match(RefLangParser.COMMA);
              this.state = 737;
              this.expression(0);
              this.state = 738;
              this.match(RefLangParser.CLOSE_BRACKET);
            }
            break;
          default:
            throw new antlr.NoViableAltException(this);
        }
        this.context!.stop = this.tokenStream.LT(-1);
        this.state = 748;
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
                  RefLangParser.RULE_expression,
                );
                this.state = 742;
                if (!this.precpred(this.context, 2)) {
                  throw this.createFailedPredicateException("this.precpred(this.context, 2)");
                }
                this.state = 743;
                this.binaryOperator();
                this.state = 744;
                this.expression(3);
              }
            }
          }
          this.state = 750;
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
  public term(): TermContext {
    let localContext = new TermContext(this.context, this.state);
    this.enterRule(localContext, 114, RefLangParser.RULE_term);
    try {
      let alternative: number;
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 751;
        this.chainHead();
        this.state = 756;
        this.errorHandler.sync(this);
        alternative = this.interpreter.adaptivePredict(this.tokenStream, 78, this.context);
        while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
          if (alternative === 1) {
            {
              {
                this.state = 752;
                this.match(RefLangParser.DOT);
                this.state = 753;
                this.chainable();
              }
            }
          }
          this.state = 758;
          this.errorHandler.sync(this);
          alternative = this.interpreter.adaptivePredict(this.tokenStream, 78, this.context);
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
    this.enterRule(localContext, 116, RefLangParser.RULE_chainHead);
    try {
      this.state = 765;
      this.errorHandler.sync(this);
      switch (this.interpreter.adaptivePredict(this.tokenStream, 79, this.context)) {
        case 1:
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 759;
            this.thisInstance();
          }
          break;
        case 2:
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 760;
            this.bracketedExpression();
          }
          break;
        case 3:
          this.enterOuterAlt(localContext, 3);
          {
            this.state = 761;
            this.tuple();
          }
          break;
        case 4:
          this.enterOuterAlt(localContext, 4);
          {
            this.state = 762;
            this.litValue();
          }
          break;
        case 5:
          this.enterOuterAlt(localContext, 5);
          {
            this.state = 763;
            this.list();
          }
          break;
        case 6:
          this.enterOuterAlt(localContext, 6);
          {
            this.state = 764;
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
    this.enterRule(localContext, 118, RefLangParser.RULE_thisInstance);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 767;
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
  public chainable(): ChainableContext {
    let localContext = new ChainableContext(this.context, this.state);
    this.enterRule(localContext, 120, RefLangParser.RULE_chainable);
    try {
      let alternative: number;
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 771;
        this.errorHandler.sync(this);
        switch (this.interpreter.adaptivePredict(this.tokenStream, 80, this.context)) {
          case 1:
            {
              this.state = 769;
              this.identifier();
            }
            break;
          case 2:
            {
              this.state = 770;
              this.methodCall();
            }
            break;
        }
        this.state = 776;
        this.errorHandler.sync(this);
        alternative = this.interpreter.adaptivePredict(this.tokenStream, 81, this.context);
        while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
          if (alternative === 1) {
            {
              {
                this.state = 773;
                this.index();
              }
            }
          }
          this.state = 778;
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
  public bracketedExpression(): BracketedExpressionContext {
    let localContext = new BracketedExpressionContext(this.context, this.state);
    this.enterRule(localContext, 122, RefLangParser.RULE_bracketedExpression);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 779;
        this.match(RefLangParser.OPEN_BRACKET);
        this.state = 780;
        this.expression(0);
        this.state = 781;
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
    this.enterRule(localContext, 124, RefLangParser.RULE_unaryExpression);
    try {
      this.state = 785;
      this.errorHandler.sync(this);
      switch (this.tokenStream.LA(1)) {
        case RefLangParser.MINUS:
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 783;
            this.negateNumeric();
          }
          break;
        case RefLangParser.NOT:
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 784;
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
    this.enterRule(localContext, 126, RefLangParser.RULE_negateNumeric);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 787;
        this.match(RefLangParser.MINUS);
        this.state = 788;
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
    this.enterRule(localContext, 128, RefLangParser.RULE_negateLogical);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 790;
        this.match(RefLangParser.NOT);
        this.state = 791;
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
    this.enterRule(localContext, 130, RefLangParser.RULE_binaryExpression);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 793;
        this.term();
        this.state = 794;
        this.binaryOperator();
        this.state = 795;
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
    this.enterRule(localContext, 132, RefLangParser.RULE_tuple);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 797;
        this.match(RefLangParser.OPEN_BRACKET);
        this.state = 798;
        this.expression(0);
        this.state = 799;
        this.match(RefLangParser.COMMA);
        this.state = 800;
        this.expression(0);
        this.state = 805;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (_la === 85) {
          {
            {
              this.state = 801;
              this.match(RefLangParser.COMMA);
              this.state = 802;
              this.expression(0);
            }
          }
          this.state = 807;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 808;
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
  public methodCall(): MethodCallContext {
    let localContext = new MethodCallContext(this.context, this.state);
    this.enterRule(localContext, 134, RefLangParser.RULE_methodCall);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 810;
        this.methodName();
        this.state = 811;
        this.match(RefLangParser.OPEN_BRACKET);
        this.state = 813;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (
          (((_la - 9) & ~0x1f) === 0 && ((1 << (_la - 9)) & 8388673) !== 0) ||
          (((_la - 57) & ~0x1f) === 0 && ((1 << (_la - 57)) & 2190214367) !== 0) ||
          (((_la - 99) & ~0x1f) === 0 && ((1 << (_la - 99)) & 127) !== 0)
        ) {
          {
            this.state = 812;
            this.argList();
          }
        }

        this.state = 815;
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
    this.enterRule(localContext, 136, RefLangParser.RULE_binaryOperator);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 817;
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
    this.enterRule(localContext, 138, RefLangParser.RULE_newInstance);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 819;
        this.match(RefLangParser.NEW);
        this.state = 820;
        this.type_();
        this.state = 821;
        this.match(RefLangParser.OPEN_BRACKET);
        this.state = 823;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (
          (((_la - 9) & ~0x1f) === 0 && ((1 << (_la - 9)) & 8388673) !== 0) ||
          (((_la - 57) & ~0x1f) === 0 && ((1 << (_la - 57)) & 2190214367) !== 0) ||
          (((_la - 99) & ~0x1f) === 0 && ((1 << (_la - 99)) & 127) !== 0)
        ) {
          {
            this.state = 822;
            this.argList();
          }
        }

        this.state = 825;
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
    this.enterRule(localContext, 140, RefLangParser.RULE_paramDef);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 827;
        this.identifier();
        this.state = 828;
        this.match(RefLangParser.AS);
        this.state = 829;
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
    this.enterRule(localContext, 142, RefLangParser.RULE_typeGeneric);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 831;
        this.typeName();
        this.state = 832;
        this.match(RefLangParser.LT);
        this.state = 833;
        this.match(RefLangParser.OF);
        this.state = 834;
        this.type_();
        this.state = 839;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (_la === 85) {
          {
            {
              this.state = 835;
              this.match(RefLangParser.COMMA);
              this.state = 836;
              this.type_();
            }
          }
          this.state = 841;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 842;
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
    this.enterRule(localContext, 144, RefLangParser.RULE_typeFunc);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 844;
        this.match(RefLangParser.FUNC_NAME);
        this.state = 845;
        this.match(RefLangParser.LT);
        this.state = 846;
        this.match(RefLangParser.OF);
        this.state = 847;
        this.type_();
        this.state = 852;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (_la === 85) {
          {
            {
              this.state = 848;
              this.match(RefLangParser.COMMA);
              this.state = 849;
              this.type_();
            }
          }
          this.state = 854;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 855;
        this.match(RefLangParser.ARROW);
        this.state = 856;
        this.type_();
        this.state = 857;
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
    this.enterRule(localContext, 146, RefLangParser.RULE_typeTuple);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 859;
        this.match(RefLangParser.OPEN_BRACKET);
        this.state = 860;
        this.type_();
        this.state = 863;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        do {
          {
            {
              this.state = 861;
              this.match(RefLangParser.COMMA);
              this.state = 862;
              this.type_();
            }
          }
          this.state = 865;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        } while (_la === 85);
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
  public lambda(): LambdaContext {
    let localContext = new LambdaContext(this.context, this.state);
    this.enterRule(localContext, 148, RefLangParser.RULE_lambda);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 869;
        this.match(RefLangParser.LAMBDA);
        this.state = 872;
        this.errorHandler.sync(this);
        switch (this.interpreter.adaptivePredict(this.tokenStream, 89, this.context)) {
          case 1:
            {
              this.state = 870;
              this.paramsList();
            }
            break;
          case 2:
            {
              this.state = 871;
              this.argList();
            }
            break;
        }
        this.state = 874;
        this.match(RefLangParser.ARROW);
        this.state = 875;
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
    this.enterRule(localContext, 150, RefLangParser.RULE_list);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 877;
        this.match(RefLangParser.OPEN_SQ_BRACKET);
        this.state = 878;
        this.expression(0);
        this.state = 883;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (_la === 85) {
          {
            {
              this.state = 879;
              this.match(RefLangParser.COMMA);
              this.state = 880;
              this.expression(0);
            }
          }
          this.state = 885;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 886;
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
  public interpolatedString(): InterpolatedStringContext {
    let localContext = new InterpolatedStringContext(this.context, this.state);
    this.enterRule(localContext, 152, RefLangParser.RULE_interpolatedString);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 888;
        this.match(RefLangParser.INTERPOLATED_STRING_PREFIX);
        this.state = 889;
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
    this.enterRule(localContext, 154, RefLangParser.RULE_power);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 891;
        this.term();
        this.state = 892;
        this.match(RefLangParser.POWER);
        this.state = 893;
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
        return this.precpred(this.context, 2);
    }
    return true;
  }

  public static readonly _serializedATN: number[] = [
    4, 1, 124, 896, 2, 0, 7, 0, 2, 1, 7, 1, 2, 2, 7, 2, 2, 3, 7, 3, 2, 4, 7, 4, 2, 5, 7, 5, 2, 6, 7,
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
    74, 2, 75, 7, 75, 2, 76, 7, 76, 2, 77, 7, 77, 1, 0, 3, 0, 158, 8, 0, 1, 0, 5, 0, 161, 8, 0, 10,
    0, 12, 0, 164, 9, 0, 1, 0, 5, 0, 167, 8, 0, 10, 0, 12, 0, 170, 9, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 1, 183, 8, 1, 1, 2, 3, 2, 186, 8, 2, 1, 2, 1, 2, 1, 2,
    5, 2, 191, 8, 2, 10, 2, 12, 2, 194, 9, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 3, 3, 3, 201, 8, 3, 1, 3,
    1, 3, 1, 3, 1, 3, 3, 3, 207, 8, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 5, 3, 215, 8, 3, 10, 3,
    12, 3, 218, 9, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 4, 3, 4, 226, 8, 4, 1, 4, 1, 4, 1, 4, 1, 4,
    1, 4, 1, 4, 1, 4, 5, 4, 235, 8, 4, 10, 4, 12, 4, 238, 9, 4, 1, 4, 1, 4, 1, 4, 1, 4, 1, 5, 3, 5,
    245, 8, 5, 1, 5, 1, 5, 1, 5, 1, 5, 3, 5, 251, 8, 5, 1, 5, 1, 5, 1, 5, 5, 5, 256, 8, 5, 10, 5,
    12, 5, 259, 9, 5, 1, 5, 1, 5, 1, 5, 1, 5, 1, 6, 3, 6, 266, 8, 6, 1, 6, 1, 6, 1, 6, 1, 6, 1, 6,
    1, 6, 1, 6, 1, 7, 3, 7, 276, 8, 7, 1, 7, 1, 7, 1, 7, 1, 7, 1, 7, 1, 8, 3, 8, 284, 8, 8, 1, 8, 1,
    8, 1, 8, 1, 8, 3, 8, 290, 8, 8, 1, 8, 1, 8, 1, 8, 1, 8, 1, 8, 1, 8, 5, 8, 298, 8, 8, 10, 8, 12,
    8, 301, 9, 8, 1, 8, 1, 8, 1, 8, 1, 8, 1, 9, 3, 9, 308, 8, 9, 1, 9, 1, 9, 1, 9, 1, 9, 1, 9, 3, 9,
    315, 8, 9, 1, 9, 1, 9, 1, 9, 1, 9, 1, 9, 1, 9, 1, 9, 5, 9, 324, 8, 9, 10, 9, 12, 9, 327, 9, 9,
    1, 9, 1, 9, 1, 9, 1, 9, 1, 10, 1, 10, 1, 10, 1, 11, 1, 11, 1, 12, 1, 12, 1, 12, 1, 12, 1, 12, 1,
    12, 1, 12, 1, 12, 1, 12, 1, 12, 1, 12, 3, 12, 349, 8, 12, 1, 13, 3, 13, 352, 8, 13, 1, 13, 1,
    13, 1, 13, 1, 13, 1, 13, 1, 13, 1, 13, 5, 13, 361, 8, 13, 10, 13, 12, 13, 364, 9, 13, 1, 13, 1,
    13, 1, 13, 1, 13, 1, 14, 3, 14, 371, 8, 14, 1, 14, 1, 14, 1, 14, 1, 14, 5, 14, 377, 8, 14, 10,
    14, 12, 14, 380, 9, 14, 1, 14, 1, 14, 1, 14, 1, 14, 1, 15, 3, 15, 387, 8, 15, 1, 15, 1, 15, 1,
    15, 1, 15, 1, 15, 1, 15, 5, 15, 395, 8, 15, 10, 15, 12, 15, 398, 9, 15, 1, 15, 1, 15, 1, 15, 1,
    15, 1, 16, 3, 16, 405, 8, 16, 1, 16, 1, 16, 1, 16, 5, 16, 410, 8, 16, 10, 16, 12, 16, 413, 9,
    16, 1, 16, 1, 16, 5, 16, 417, 8, 16, 10, 16, 12, 16, 420, 9, 16, 1, 16, 1, 16, 1, 16, 1, 16, 1,
    17, 3, 17, 427, 8, 17, 1, 17, 1, 17, 1, 17, 1, 17, 1, 17, 1, 17, 1, 17, 1, 18, 3, 18, 437, 8,
    18, 1, 18, 1, 18, 1, 18, 1, 18, 1, 18, 1, 18, 1, 19, 3, 19, 446, 8, 19, 1, 19, 1, 19, 1, 19, 3,
    19, 451, 8, 19, 1, 19, 1, 19, 1, 19, 1, 20, 3, 20, 457, 8, 20, 1, 20, 1, 20, 1, 20, 1, 20, 1,
    20, 1, 20, 1, 20, 1, 21, 3, 21, 467, 8, 21, 1, 21, 1, 21, 1, 21, 1, 21, 1, 21, 1, 21, 1, 22, 3,
    22, 476, 8, 22, 1, 22, 1, 22, 1, 22, 1, 22, 1, 22, 1, 22, 1, 22, 1, 22, 1, 22, 1, 22, 1, 23, 3,
    23, 489, 8, 23, 1, 23, 1, 23, 1, 23, 1, 23, 1, 24, 3, 24, 496, 8, 24, 1, 24, 1, 24, 1, 24, 1,
    24, 1, 24, 1, 25, 1, 25, 1, 25, 1, 25, 1, 26, 3, 26, 508, 8, 26, 1, 26, 1, 26, 1, 26, 1, 26, 1,
    26, 1, 27, 3, 27, 516, 8, 27, 1, 27, 1, 27, 1, 27, 1, 28, 3, 28, 522, 8, 28, 1, 28, 1, 28, 1,
    28, 1, 28, 1, 28, 1, 28, 1, 29, 3, 29, 531, 8, 29, 1, 29, 1, 29, 1, 29, 3, 29, 536, 8, 29, 1,
    29, 1, 29, 1, 29, 5, 29, 541, 8, 29, 10, 29, 12, 29, 544, 9, 29, 1, 29, 1, 29, 1, 29, 1, 29, 1,
    30, 3, 30, 551, 8, 30, 1, 30, 1, 30, 1, 30, 1, 30, 1, 30, 1, 30, 1, 31, 3, 31, 560, 8, 31, 1,
    31, 3, 31, 563, 8, 31, 1, 31, 1, 31, 1, 31, 1, 31, 3, 31, 569, 8, 31, 1, 31, 1, 31, 1, 31, 1,
    31, 1, 31, 1, 31, 5, 31, 577, 8, 31, 10, 31, 12, 31, 580, 9, 31, 1, 31, 1, 31, 1, 31, 1, 31, 1,
    31, 1, 32, 3, 32, 588, 8, 32, 1, 32, 3, 32, 591, 8, 32, 1, 32, 1, 32, 1, 32, 1, 32, 3, 32, 597,
    8, 32, 1, 32, 1, 32, 1, 32, 5, 32, 602, 8, 32, 10, 32, 12, 32, 605, 9, 32, 1, 32, 1, 32, 1, 32,
    1, 32, 1, 33, 3, 33, 612, 8, 33, 1, 33, 1, 33, 1, 33, 1, 33, 1, 33, 3, 33, 619, 8, 33, 1, 33, 1,
    33, 1, 33, 1, 33, 1, 33, 1, 34, 3, 34, 627, 8, 34, 1, 34, 1, 34, 1, 34, 1, 34, 1, 34, 3, 34,
    634, 8, 34, 1, 34, 1, 34, 1, 34, 1, 35, 1, 35, 1, 36, 1, 36, 3, 36, 643, 8, 36, 1, 37, 1, 37, 1,
    38, 1, 38, 1, 39, 1, 39, 1, 40, 1, 40, 3, 40, 653, 8, 40, 1, 41, 1, 41, 1, 41, 5, 41, 658, 8,
    41, 10, 41, 12, 41, 661, 9, 41, 1, 42, 1, 42, 3, 42, 665, 8, 42, 1, 43, 1, 43, 1, 43, 5, 43,
    670, 8, 43, 10, 43, 12, 43, 673, 9, 43, 1, 44, 1, 44, 1, 44, 1, 44, 3, 44, 679, 8, 44, 1, 45, 1,
    45, 1, 45, 5, 45, 684, 8, 45, 10, 45, 12, 45, 687, 9, 45, 1, 46, 1, 46, 1, 47, 1, 47, 1, 47, 1,
    47, 1, 47, 3, 47, 696, 8, 47, 1, 48, 1, 48, 1, 49, 1, 49, 1, 50, 1, 50, 1, 51, 1, 51, 1, 51, 1,
    51, 1, 52, 3, 52, 709, 8, 52, 1, 52, 1, 52, 1, 53, 1, 53, 1, 53, 1, 53, 1, 54, 1, 54, 5, 54,
    719, 8, 54, 10, 54, 12, 54, 722, 9, 54, 1, 55, 1, 55, 1, 55, 1, 55, 1, 56, 1, 56, 1, 56, 1, 56,
    1, 56, 1, 56, 1, 56, 1, 56, 1, 56, 1, 56, 1, 56, 1, 56, 1, 56, 3, 56, 741, 8, 56, 1, 56, 1, 56,
    1, 56, 1, 56, 5, 56, 747, 8, 56, 10, 56, 12, 56, 750, 9, 56, 1, 57, 1, 57, 1, 57, 5, 57, 755, 8,
    57, 10, 57, 12, 57, 758, 9, 57, 1, 58, 1, 58, 1, 58, 1, 58, 1, 58, 1, 58, 3, 58, 766, 8, 58, 1,
    59, 1, 59, 1, 60, 1, 60, 3, 60, 772, 8, 60, 1, 60, 5, 60, 775, 8, 60, 10, 60, 12, 60, 778, 9,
    60, 1, 61, 1, 61, 1, 61, 1, 61, 1, 62, 1, 62, 3, 62, 786, 8, 62, 1, 63, 1, 63, 1, 63, 1, 64, 1,
    64, 1, 64, 1, 65, 1, 65, 1, 65, 1, 65, 1, 66, 1, 66, 1, 66, 1, 66, 1, 66, 1, 66, 5, 66, 804, 8,
    66, 10, 66, 12, 66, 807, 9, 66, 1, 66, 1, 66, 1, 67, 1, 67, 1, 67, 3, 67, 814, 8, 67, 1, 67, 1,
    67, 1, 68, 1, 68, 1, 69, 1, 69, 1, 69, 1, 69, 3, 69, 824, 8, 69, 1, 69, 1, 69, 1, 70, 1, 70, 1,
    70, 1, 70, 1, 71, 1, 71, 1, 71, 1, 71, 1, 71, 1, 71, 5, 71, 838, 8, 71, 10, 71, 12, 71, 841, 9,
    71, 1, 71, 1, 71, 1, 72, 1, 72, 1, 72, 1, 72, 1, 72, 1, 72, 5, 72, 851, 8, 72, 10, 72, 12, 72,
    854, 9, 72, 1, 72, 1, 72, 1, 72, 1, 72, 1, 73, 1, 73, 1, 73, 1, 73, 4, 73, 864, 8, 73, 11, 73,
    12, 73, 865, 1, 73, 1, 73, 1, 74, 1, 74, 1, 74, 3, 74, 873, 8, 74, 1, 74, 1, 74, 1, 74, 1, 75,
    1, 75, 1, 75, 1, 75, 5, 75, 882, 8, 75, 10, 75, 12, 75, 885, 9, 75, 1, 75, 1, 75, 1, 76, 1, 76,
    1, 76, 1, 77, 1, 77, 1, 77, 1, 77, 1, 77, 0, 1, 112, 78, 0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20,
    22, 24, 26, 28, 30, 32, 34, 36, 38, 40, 42, 44, 46, 48, 50, 52, 54, 56, 58, 60, 62, 64, 66, 68,
    70, 72, 74, 76, 78, 80, 82, 84, 86, 88, 90, 92, 94, 96, 98, 100, 102, 104, 106, 108, 110, 112,
    114, 116, 118, 120, 122, 124, 126, 128, 130, 132, 134, 136, 138, 140, 142, 144, 146, 148, 150,
    152, 154, 0, 4, 2, 0, 57, 61, 100, 100, 1, 0, 63, 64, 1, 0, 101, 103, 3, 0, 65, 66, 68, 70, 87,
    94, 945, 0, 157, 1, 0, 0, 0, 2, 182, 1, 0, 0, 0, 4, 185, 1, 0, 0, 0, 6, 200, 1, 0, 0, 0, 8, 225,
    1, 0, 0, 0, 10, 244, 1, 0, 0, 0, 12, 265, 1, 0, 0, 0, 14, 275, 1, 0, 0, 0, 16, 283, 1, 0, 0, 0,
    18, 307, 1, 0, 0, 0, 20, 332, 1, 0, 0, 0, 22, 335, 1, 0, 0, 0, 24, 348, 1, 0, 0, 0, 26, 351, 1,
    0, 0, 0, 28, 370, 1, 0, 0, 0, 30, 386, 1, 0, 0, 0, 32, 404, 1, 0, 0, 0, 34, 426, 1, 0, 0, 0, 36,
    436, 1, 0, 0, 0, 38, 445, 1, 0, 0, 0, 40, 456, 1, 0, 0, 0, 42, 466, 1, 0, 0, 0, 44, 475, 1, 0,
    0, 0, 46, 488, 1, 0, 0, 0, 48, 495, 1, 0, 0, 0, 50, 502, 1, 0, 0, 0, 52, 507, 1, 0, 0, 0, 54,
    515, 1, 0, 0, 0, 56, 521, 1, 0, 0, 0, 58, 530, 1, 0, 0, 0, 60, 550, 1, 0, 0, 0, 62, 559, 1, 0,
    0, 0, 64, 587, 1, 0, 0, 0, 66, 611, 1, 0, 0, 0, 68, 626, 1, 0, 0, 0, 70, 638, 1, 0, 0, 0, 72,
    642, 1, 0, 0, 0, 74, 644, 1, 0, 0, 0, 76, 646, 1, 0, 0, 0, 78, 648, 1, 0, 0, 0, 80, 652, 1, 0,
    0, 0, 82, 654, 1, 0, 0, 0, 84, 664, 1, 0, 0, 0, 86, 666, 1, 0, 0, 0, 88, 678, 1, 0, 0, 0, 90,
    680, 1, 0, 0, 0, 92, 688, 1, 0, 0, 0, 94, 695, 1, 0, 0, 0, 96, 697, 1, 0, 0, 0, 98, 699, 1, 0,
    0, 0, 100, 701, 1, 0, 0, 0, 102, 703, 1, 0, 0, 0, 104, 708, 1, 0, 0, 0, 106, 712, 1, 0, 0, 0,
    108, 716, 1, 0, 0, 0, 110, 723, 1, 0, 0, 0, 112, 740, 1, 0, 0, 0, 114, 751, 1, 0, 0, 0, 116,
    765, 1, 0, 0, 0, 118, 767, 1, 0, 0, 0, 120, 771, 1, 0, 0, 0, 122, 779, 1, 0, 0, 0, 124, 785, 1,
    0, 0, 0, 126, 787, 1, 0, 0, 0, 128, 790, 1, 0, 0, 0, 130, 793, 1, 0, 0, 0, 132, 797, 1, 0, 0, 0,
    134, 810, 1, 0, 0, 0, 136, 817, 1, 0, 0, 0, 138, 819, 1, 0, 0, 0, 140, 827, 1, 0, 0, 0, 142,
    831, 1, 0, 0, 0, 144, 844, 1, 0, 0, 0, 146, 859, 1, 0, 0, 0, 148, 869, 1, 0, 0, 0, 150, 877, 1,
    0, 0, 0, 152, 888, 1, 0, 0, 0, 154, 891, 1, 0, 0, 0, 156, 158, 3, 20, 10, 0, 157, 156, 1, 0, 0,
    0, 157, 158, 1, 0, 0, 0, 158, 162, 1, 0, 0, 0, 159, 161, 3, 2, 1, 0, 160, 159, 1, 0, 0, 0, 161,
    164, 1, 0, 0, 0, 162, 160, 1, 0, 0, 0, 162, 163, 1, 0, 0, 0, 163, 168, 1, 0, 0, 0, 164, 162, 1,
    0, 0, 0, 165, 167, 5, 97, 0, 0, 166, 165, 1, 0, 0, 0, 167, 170, 1, 0, 0, 0, 168, 166, 1, 0, 0,
    0, 168, 169, 1, 0, 0, 0, 169, 171, 1, 0, 0, 0, 170, 168, 1, 0, 0, 0, 171, 172, 5, 0, 0, 1, 172,
    1, 1, 0, 0, 0, 173, 183, 3, 4, 2, 0, 174, 183, 3, 6, 3, 0, 175, 183, 3, 8, 4, 0, 176, 183, 3,
    10, 5, 0, 177, 183, 3, 12, 6, 0, 178, 183, 3, 14, 7, 0, 179, 183, 3, 16, 8, 0, 180, 183, 3, 18,
    9, 0, 181, 183, 3, 20, 10, 0, 182, 173, 1, 0, 0, 0, 182, 174, 1, 0, 0, 0, 182, 175, 1, 0, 0, 0,
    182, 176, 1, 0, 0, 0, 182, 177, 1, 0, 0, 0, 182, 178, 1, 0, 0, 0, 182, 179, 1, 0, 0, 0, 182,
    180, 1, 0, 0, 0, 182, 181, 1, 0, 0, 0, 183, 3, 1, 0, 0, 0, 184, 186, 5, 108, 0, 0, 185, 184, 1,
    0, 0, 0, 185, 186, 1, 0, 0, 0, 186, 187, 1, 0, 0, 0, 187, 188, 5, 10, 0, 0, 188, 192, 5, 97, 0,
    0, 189, 191, 3, 24, 12, 0, 190, 189, 1, 0, 0, 0, 191, 194, 1, 0, 0, 0, 192, 190, 1, 0, 0, 0,
    192, 193, 1, 0, 0, 0, 193, 195, 1, 0, 0, 0, 194, 192, 1, 0, 0, 0, 195, 196, 5, 26, 0, 0, 196,
    197, 5, 10, 0, 0, 197, 198, 5, 97, 0, 0, 198, 5, 1, 0, 0, 0, 199, 201, 5, 108, 0, 0, 200, 199,
    1, 0, 0, 0, 200, 201, 1, 0, 0, 0, 201, 202, 1, 0, 0, 0, 202, 203, 5, 29, 0, 0, 203, 204, 3, 74,
    37, 0, 204, 206, 5, 82, 0, 0, 205, 207, 3, 86, 43, 0, 206, 205, 1, 0, 0, 0, 206, 207, 1, 0, 0,
    0, 207, 208, 1, 0, 0, 0, 208, 209, 5, 83, 0, 0, 209, 210, 5, 37, 0, 0, 210, 211, 3, 88, 44, 0,
    211, 216, 5, 97, 0, 0, 212, 215, 3, 36, 18, 0, 213, 215, 3, 24, 12, 0, 214, 212, 1, 0, 0, 0,
    214, 213, 1, 0, 0, 0, 215, 218, 1, 0, 0, 0, 216, 214, 1, 0, 0, 0, 216, 217, 1, 0, 0, 0, 217,
    219, 1, 0, 0, 0, 218, 216, 1, 0, 0, 0, 219, 220, 3, 50, 25, 0, 220, 221, 5, 26, 0, 0, 221, 222,
    5, 29, 0, 0, 222, 223, 5, 97, 0, 0, 223, 7, 1, 0, 0, 0, 224, 226, 5, 108, 0, 0, 225, 224, 1, 0,
    0, 0, 225, 226, 1, 0, 0, 0, 226, 227, 1, 0, 0, 0, 227, 228, 5, 40, 0, 0, 228, 229, 3, 76, 38, 0,
    229, 236, 5, 97, 0, 0, 230, 235, 3, 34, 17, 0, 231, 235, 3, 36, 18, 0, 232, 235, 3, 40, 20, 0,
    233, 235, 3, 20, 10, 0, 234, 230, 1, 0, 0, 0, 234, 231, 1, 0, 0, 0, 234, 232, 1, 0, 0, 0, 234,
    233, 1, 0, 0, 0, 235, 238, 1, 0, 0, 0, 236, 234, 1, 0, 0, 0, 236, 237, 1, 0, 0, 0, 237, 239, 1,
    0, 0, 0, 238, 236, 1, 0, 0, 0, 239, 240, 5, 26, 0, 0, 240, 241, 5, 40, 0, 0, 241, 242, 5, 97, 0,
    0, 242, 9, 1, 0, 0, 0, 243, 245, 5, 108, 0, 0, 244, 243, 1, 0, 0, 0, 244, 245, 1, 0, 0, 0, 245,
    246, 1, 0, 0, 0, 246, 247, 5, 35, 0, 0, 247, 248, 3, 74, 37, 0, 248, 250, 5, 82, 0, 0, 249, 251,
    3, 86, 43, 0, 250, 249, 1, 0, 0, 0, 250, 251, 1, 0, 0, 0, 251, 252, 1, 0, 0, 0, 252, 253, 5, 83,
    0, 0, 253, 257, 5, 97, 0, 0, 254, 256, 3, 24, 12, 0, 255, 254, 1, 0, 0, 0, 256, 259, 1, 0, 0, 0,
    257, 255, 1, 0, 0, 0, 257, 258, 1, 0, 0, 0, 258, 260, 1, 0, 0, 0, 259, 257, 1, 0, 0, 0, 260,
    261, 5, 26, 0, 0, 261, 262, 5, 35, 0, 0, 262, 263, 5, 97, 0, 0, 263, 11, 1, 0, 0, 0, 264, 266,
    5, 108, 0, 0, 265, 264, 1, 0, 0, 0, 265, 266, 1, 0, 0, 0, 266, 267, 1, 0, 0, 0, 267, 268, 5, 22,
    0, 0, 268, 269, 3, 70, 35, 0, 269, 270, 5, 38, 0, 0, 270, 271, 5, 43, 0, 0, 271, 272, 3, 80, 40,
    0, 272, 273, 5, 97, 0, 0, 273, 13, 1, 0, 0, 0, 274, 276, 5, 108, 0, 0, 275, 274, 1, 0, 0, 0,
    275, 276, 1, 0, 0, 0, 276, 277, 1, 0, 0, 0, 277, 278, 5, 4, 0, 0, 278, 279, 3, 78, 39, 0, 279,
    280, 3, 90, 45, 0, 280, 281, 5, 97, 0, 0, 281, 15, 1, 0, 0, 0, 282, 284, 5, 108, 0, 0, 283, 282,
    1, 0, 0, 0, 283, 284, 1, 0, 0, 0, 284, 285, 1, 0, 0, 0, 285, 286, 5, 1, 0, 0, 286, 289, 3, 78,
    39, 0, 287, 288, 5, 30, 0, 0, 288, 290, 3, 78, 39, 0, 289, 287, 1, 0, 0, 0, 289, 290, 1, 0, 0,
    0, 290, 291, 1, 0, 0, 0, 291, 299, 5, 97, 0, 0, 292, 298, 3, 58, 29, 0, 293, 298, 3, 60, 30, 0,
    294, 298, 3, 62, 31, 0, 295, 298, 3, 64, 32, 0, 296, 298, 3, 20, 10, 0, 297, 292, 1, 0, 0, 0,
    297, 293, 1, 0, 0, 0, 297, 294, 1, 0, 0, 0, 297, 295, 1, 0, 0, 0, 297, 296, 1, 0, 0, 0, 298,
    301, 1, 0, 0, 0, 299, 297, 1, 0, 0, 0, 299, 300, 1, 0, 0, 0, 300, 302, 1, 0, 0, 0, 301, 299, 1,
    0, 0, 0, 302, 303, 5, 26, 0, 0, 303, 304, 5, 1, 0, 0, 304, 305, 5, 97, 0, 0, 305, 17, 1, 0, 0,
    0, 306, 308, 5, 108, 0, 0, 307, 306, 1, 0, 0, 0, 307, 308, 1, 0, 0, 0, 308, 309, 1, 0, 0, 0,
    309, 310, 5, 16, 0, 0, 310, 311, 5, 1, 0, 0, 311, 314, 3, 78, 39, 0, 312, 313, 5, 30, 0, 0, 313,
    315, 3, 78, 39, 0, 314, 312, 1, 0, 0, 0, 314, 315, 1, 0, 0, 0, 315, 316, 1, 0, 0, 0, 316, 325,
    5, 97, 0, 0, 317, 324, 3, 60, 30, 0, 318, 324, 3, 62, 31, 0, 319, 324, 3, 64, 32, 0, 320, 324,
    3, 66, 33, 0, 321, 324, 3, 68, 34, 0, 322, 324, 3, 20, 10, 0, 323, 317, 1, 0, 0, 0, 323, 318, 1,
    0, 0, 0, 323, 319, 1, 0, 0, 0, 323, 320, 1, 0, 0, 0, 323, 321, 1, 0, 0, 0, 323, 322, 1, 0, 0, 0,
    324, 327, 1, 0, 0, 0, 325, 323, 1, 0, 0, 0, 325, 326, 1, 0, 0, 0, 326, 328, 1, 0, 0, 0, 327,
    325, 1, 0, 0, 0, 328, 329, 5, 26, 0, 0, 329, 330, 5, 1, 0, 0, 330, 331, 5, 97, 0, 0, 331, 19, 1,
    0, 0, 0, 332, 333, 3, 22, 11, 0, 333, 334, 5, 97, 0, 0, 334, 21, 1, 0, 0, 0, 335, 336, 5, 124,
    0, 0, 336, 23, 1, 0, 0, 0, 337, 349, 3, 38, 19, 0, 338, 349, 3, 40, 20, 0, 339, 349, 3, 42, 21,
    0, 340, 349, 3, 44, 22, 0, 341, 349, 3, 26, 13, 0, 342, 349, 3, 28, 14, 0, 343, 349, 3, 30, 15,
    0, 344, 349, 3, 46, 23, 0, 345, 349, 3, 32, 16, 0, 346, 349, 3, 48, 24, 0, 347, 349, 3, 20, 10,
    0, 348, 337, 1, 0, 0, 0, 348, 338, 1, 0, 0, 0, 348, 339, 1, 0, 0, 0, 348, 340, 1, 0, 0, 0, 348,
    341, 1, 0, 0, 0, 348, 342, 1, 0, 0, 0, 348, 343, 1, 0, 0, 0, 348, 344, 1, 0, 0, 0, 348, 345, 1,
    0, 0, 0, 348, 346, 1, 0, 0, 0, 348, 347, 1, 0, 0, 0, 349, 25, 1, 0, 0, 0, 350, 352, 5, 108, 0,
    0, 351, 350, 1, 0, 0, 0, 351, 352, 1, 0, 0, 0, 352, 353, 1, 0, 0, 0, 353, 354, 5, 6, 0, 0, 354,
    355, 3, 112, 56, 0, 355, 356, 5, 41, 0, 0, 356, 362, 5, 97, 0, 0, 357, 361, 3, 52, 26, 0, 358,
    361, 3, 54, 27, 0, 359, 361, 3, 24, 12, 0, 360, 357, 1, 0, 0, 0, 360, 358, 1, 0, 0, 0, 360, 359,
    1, 0, 0, 0, 361, 364, 1, 0, 0, 0, 362, 360, 1, 0, 0, 0, 362, 363, 1, 0, 0, 0, 363, 365, 1, 0, 0,
    0, 364, 362, 1, 0, 0, 0, 365, 366, 5, 26, 0, 0, 366, 367, 5, 6, 0, 0, 367, 368, 5, 97, 0, 0,
    368, 27, 1, 0, 0, 0, 369, 371, 5, 108, 0, 0, 370, 369, 1, 0, 0, 0, 370, 371, 1, 0, 0, 0, 371,
    372, 1, 0, 0, 0, 372, 373, 5, 14, 0, 0, 373, 374, 3, 112, 56, 0, 374, 378, 5, 97, 0, 0, 375,
    377, 3, 24, 12, 0, 376, 375, 1, 0, 0, 0, 377, 380, 1, 0, 0, 0, 378, 376, 1, 0, 0, 0, 378, 379,
    1, 0, 0, 0, 379, 381, 1, 0, 0, 0, 380, 378, 1, 0, 0, 0, 381, 382, 5, 26, 0, 0, 382, 383, 5, 14,
    0, 0, 383, 384, 5, 97, 0, 0, 384, 29, 1, 0, 0, 0, 385, 387, 5, 108, 0, 0, 386, 385, 1, 0, 0, 0,
    386, 387, 1, 0, 0, 0, 387, 388, 1, 0, 0, 0, 388, 389, 5, 5, 0, 0, 389, 390, 3, 70, 35, 0, 390,
    391, 5, 7, 0, 0, 391, 392, 3, 112, 56, 0, 392, 396, 5, 97, 0, 0, 393, 395, 3, 24, 12, 0, 394,
    393, 1, 0, 0, 0, 395, 398, 1, 0, 0, 0, 396, 394, 1, 0, 0, 0, 396, 397, 1, 0, 0, 0, 397, 399, 1,
    0, 0, 0, 398, 396, 1, 0, 0, 0, 399, 400, 5, 26, 0, 0, 400, 401, 5, 5, 0, 0, 401, 402, 5, 97, 0,
    0, 402, 31, 1, 0, 0, 0, 403, 405, 5, 108, 0, 0, 404, 403, 1, 0, 0, 0, 404, 405, 1, 0, 0, 0, 405,
    406, 1, 0, 0, 0, 406, 407, 5, 13, 0, 0, 407, 411, 5, 97, 0, 0, 408, 410, 3, 24, 12, 0, 409, 408,
    1, 0, 0, 0, 410, 413, 1, 0, 0, 0, 411, 409, 1, 0, 0, 0, 411, 412, 1, 0, 0, 0, 412, 414, 1, 0, 0,
    0, 413, 411, 1, 0, 0, 0, 414, 418, 3, 56, 28, 0, 415, 417, 3, 24, 12, 0, 416, 415, 1, 0, 0, 0,
    417, 420, 1, 0, 0, 0, 418, 416, 1, 0, 0, 0, 418, 419, 1, 0, 0, 0, 419, 421, 1, 0, 0, 0, 420,
    418, 1, 0, 0, 0, 421, 422, 5, 26, 0, 0, 422, 423, 5, 13, 0, 0, 423, 424, 5, 97, 0, 0, 424, 33,
    1, 0, 0, 0, 425, 427, 5, 108, 0, 0, 426, 425, 1, 0, 0, 0, 426, 427, 1, 0, 0, 0, 427, 428, 1, 0,
    0, 0, 428, 429, 5, 17, 0, 0, 429, 430, 3, 92, 46, 0, 430, 431, 5, 27, 0, 0, 431, 432, 5, 43, 0,
    0, 432, 433, 3, 112, 56, 0, 433, 434, 5, 97, 0, 0, 434, 35, 1, 0, 0, 0, 435, 437, 5, 108, 0, 0,
    436, 435, 1, 0, 0, 0, 436, 437, 1, 0, 0, 0, 437, 438, 1, 0, 0, 0, 438, 439, 5, 31, 0, 0, 439,
    440, 3, 70, 35, 0, 440, 441, 5, 19, 0, 0, 441, 442, 3, 112, 56, 0, 442, 443, 5, 97, 0, 0, 443,
    37, 1, 0, 0, 0, 444, 446, 5, 108, 0, 0, 445, 444, 1, 0, 0, 0, 445, 446, 1, 0, 0, 0, 446, 447, 1,
    0, 0, 0, 447, 448, 5, 11, 0, 0, 448, 450, 5, 82, 0, 0, 449, 451, 3, 112, 56, 0, 450, 449, 1, 0,
    0, 0, 450, 451, 1, 0, 0, 0, 451, 452, 1, 0, 0, 0, 452, 453, 5, 83, 0, 0, 453, 454, 5, 97, 0, 0,
    454, 39, 1, 0, 0, 0, 455, 457, 5, 108, 0, 0, 456, 455, 1, 0, 0, 0, 456, 457, 1, 0, 0, 0, 457,
    458, 1, 0, 0, 0, 458, 459, 5, 44, 0, 0, 459, 460, 3, 70, 35, 0, 460, 461, 5, 38, 0, 0, 461, 462,
    5, 43, 0, 0, 462, 463, 3, 112, 56, 0, 463, 464, 5, 97, 0, 0, 464, 41, 1, 0, 0, 0, 465, 467, 5,
    108, 0, 0, 466, 465, 1, 0, 0, 0, 466, 467, 1, 0, 0, 0, 467, 468, 1, 0, 0, 0, 468, 469, 5, 18, 0,
    0, 469, 470, 3, 72, 36, 0, 470, 471, 5, 43, 0, 0, 471, 472, 3, 112, 56, 0, 472, 473, 5, 97, 0,
    0, 473, 43, 1, 0, 0, 0, 474, 476, 5, 108, 0, 0, 475, 474, 1, 0, 0, 0, 475, 476, 1, 0, 0, 0, 476,
    477, 1, 0, 0, 0, 477, 478, 5, 8, 0, 0, 478, 479, 3, 70, 35, 0, 479, 480, 5, 38, 0, 0, 480, 481,
    5, 43, 0, 0, 481, 482, 3, 74, 37, 0, 482, 483, 5, 82, 0, 0, 483, 484, 3, 112, 56, 0, 484, 485,
    5, 83, 0, 0, 485, 486, 5, 97, 0, 0, 486, 45, 1, 0, 0, 0, 487, 489, 5, 108, 0, 0, 488, 487, 1, 0,
    0, 0, 488, 489, 1, 0, 0, 0, 489, 490, 1, 0, 0, 0, 490, 491, 5, 20, 0, 0, 491, 492, 3, 114, 57,
    0, 492, 493, 5, 97, 0, 0, 493, 47, 1, 0, 0, 0, 494, 496, 5, 108, 0, 0, 495, 494, 1, 0, 0, 0,
    495, 496, 1, 0, 0, 0, 496, 497, 1, 0, 0, 0, 497, 498, 5, 42, 0, 0, 498, 499, 3, 78, 39, 0, 499,
    500, 3, 104, 52, 0, 500, 501, 5, 97, 0, 0, 501, 49, 1, 0, 0, 0, 502, 503, 5, 12, 0, 0, 503, 504,
    3, 112, 56, 0, 504, 505, 5, 97, 0, 0, 505, 51, 1, 0, 0, 0, 506, 508, 5, 108, 0, 0, 507, 506, 1,
    0, 0, 0, 507, 508, 1, 0, 0, 0, 508, 509, 1, 0, 0, 0, 509, 510, 5, 2, 0, 0, 510, 511, 3, 112, 56,
    0, 511, 512, 5, 41, 0, 0, 512, 513, 5, 97, 0, 0, 513, 53, 1, 0, 0, 0, 514, 516, 5, 108, 0, 0,
    515, 514, 1, 0, 0, 0, 515, 516, 1, 0, 0, 0, 516, 517, 1, 0, 0, 0, 517, 518, 5, 3, 0, 0, 518,
    519, 5, 97, 0, 0, 519, 55, 1, 0, 0, 0, 520, 522, 5, 108, 0, 0, 521, 520, 1, 0, 0, 0, 521, 522,
    1, 0, 0, 0, 522, 523, 1, 0, 0, 0, 523, 524, 5, 21, 0, 0, 524, 525, 3, 70, 35, 0, 525, 526, 5,
    47, 0, 0, 526, 527, 3, 78, 39, 0, 527, 528, 5, 97, 0, 0, 528, 57, 1, 0, 0, 0, 529, 531, 5, 108,
    0, 0, 530, 529, 1, 0, 0, 0, 530, 531, 1, 0, 0, 0, 531, 532, 1, 0, 0, 0, 532, 533, 5, 23, 0, 0,
    533, 535, 5, 82, 0, 0, 534, 536, 3, 86, 43, 0, 535, 534, 1, 0, 0, 0, 535, 536, 1, 0, 0, 0, 536,
    537, 1, 0, 0, 0, 537, 538, 5, 83, 0, 0, 538, 542, 5, 97, 0, 0, 539, 541, 3, 24, 12, 0, 540, 539,
    1, 0, 0, 0, 541, 544, 1, 0, 0, 0, 542, 540, 1, 0, 0, 0, 542, 543, 1, 0, 0, 0, 543, 545, 1, 0, 0,
    0, 544, 542, 1, 0, 0, 0, 545, 546, 5, 26, 0, 0, 546, 547, 5, 23, 0, 0, 547, 548, 5, 97, 0, 0,
    548, 59, 1, 0, 0, 0, 549, 551, 5, 34, 0, 0, 550, 549, 1, 0, 0, 0, 550, 551, 1, 0, 0, 0, 551,
    552, 1, 0, 0, 0, 552, 553, 5, 36, 0, 0, 553, 554, 3, 70, 35, 0, 554, 555, 5, 47, 0, 0, 555, 556,
    3, 88, 44, 0, 556, 557, 5, 97, 0, 0, 557, 61, 1, 0, 0, 0, 558, 560, 5, 108, 0, 0, 559, 558, 1,
    0, 0, 0, 559, 560, 1, 0, 0, 0, 560, 562, 1, 0, 0, 0, 561, 563, 5, 34, 0, 0, 562, 561, 1, 0, 0,
    0, 562, 563, 1, 0, 0, 0, 563, 564, 1, 0, 0, 0, 564, 565, 5, 29, 0, 0, 565, 566, 3, 74, 37, 0,
    566, 568, 5, 82, 0, 0, 567, 569, 3, 86, 43, 0, 568, 567, 1, 0, 0, 0, 568, 569, 1, 0, 0, 0, 569,
    570, 1, 0, 0, 0, 570, 571, 5, 83, 0, 0, 571, 572, 5, 37, 0, 0, 572, 573, 3, 88, 44, 0, 573, 578,
    5, 97, 0, 0, 574, 577, 3, 36, 18, 0, 575, 577, 3, 24, 12, 0, 576, 574, 1, 0, 0, 0, 576, 575, 1,
    0, 0, 0, 577, 580, 1, 0, 0, 0, 578, 576, 1, 0, 0, 0, 578, 579, 1, 0, 0, 0, 579, 581, 1, 0, 0, 0,
    580, 578, 1, 0, 0, 0, 581, 582, 3, 50, 25, 0, 582, 583, 5, 26, 0, 0, 583, 584, 5, 29, 0, 0, 584,
    585, 5, 97, 0, 0, 585, 63, 1, 0, 0, 0, 586, 588, 5, 108, 0, 0, 587, 586, 1, 0, 0, 0, 587, 588,
    1, 0, 0, 0, 588, 590, 1, 0, 0, 0, 589, 591, 5, 34, 0, 0, 590, 589, 1, 0, 0, 0, 590, 591, 1, 0,
    0, 0, 591, 592, 1, 0, 0, 0, 592, 593, 5, 35, 0, 0, 593, 594, 3, 74, 37, 0, 594, 596, 5, 82, 0,
    0, 595, 597, 3, 86, 43, 0, 596, 595, 1, 0, 0, 0, 596, 597, 1, 0, 0, 0, 597, 598, 1, 0, 0, 0,
    598, 599, 5, 83, 0, 0, 599, 603, 5, 97, 0, 0, 600, 602, 3, 24, 12, 0, 601, 600, 1, 0, 0, 0, 602,
    605, 1, 0, 0, 0, 603, 601, 1, 0, 0, 0, 603, 604, 1, 0, 0, 0, 604, 606, 1, 0, 0, 0, 605, 603, 1,
    0, 0, 0, 606, 607, 5, 26, 0, 0, 607, 608, 5, 35, 0, 0, 608, 609, 5, 97, 0, 0, 609, 65, 1, 0, 0,
    0, 610, 612, 5, 108, 0, 0, 611, 610, 1, 0, 0, 0, 611, 612, 1, 0, 0, 0, 612, 613, 1, 0, 0, 0,
    613, 614, 5, 16, 0, 0, 614, 615, 5, 29, 0, 0, 615, 616, 3, 74, 37, 0, 616, 618, 5, 82, 0, 0,
    617, 619, 3, 86, 43, 0, 618, 617, 1, 0, 0, 0, 618, 619, 1, 0, 0, 0, 619, 620, 1, 0, 0, 0, 620,
    621, 5, 83, 0, 0, 621, 622, 5, 37, 0, 0, 622, 623, 3, 88, 44, 0, 623, 624, 5, 97, 0, 0, 624, 67,
    1, 0, 0, 0, 625, 627, 5, 108, 0, 0, 626, 625, 1, 0, 0, 0, 626, 627, 1, 0, 0, 0, 627, 628, 1, 0,
    0, 0, 628, 629, 5, 16, 0, 0, 629, 630, 5, 35, 0, 0, 630, 631, 3, 74, 37, 0, 631, 633, 5, 82, 0,
    0, 632, 634, 3, 86, 43, 0, 633, 632, 1, 0, 0, 0, 633, 634, 1, 0, 0, 0, 634, 635, 1, 0, 0, 0,
    635, 636, 5, 83, 0, 0, 636, 637, 5, 97, 0, 0, 637, 69, 1, 0, 0, 0, 638, 639, 5, 99, 0, 0, 639,
    71, 1, 0, 0, 0, 640, 643, 3, 108, 54, 0, 641, 643, 3, 110, 55, 0, 642, 640, 1, 0, 0, 0, 642,
    641, 1, 0, 0, 0, 643, 73, 1, 0, 0, 0, 644, 645, 5, 99, 0, 0, 645, 75, 1, 0, 0, 0, 646, 647, 5,
    98, 0, 0, 647, 77, 1, 0, 0, 0, 648, 649, 7, 0, 0, 0, 649, 79, 1, 0, 0, 0, 650, 653, 3, 94, 47,
    0, 651, 653, 3, 70, 35, 0, 652, 650, 1, 0, 0, 0, 652, 651, 1, 0, 0, 0, 653, 81, 1, 0, 0, 0, 654,
    659, 3, 84, 42, 0, 655, 656, 5, 85, 0, 0, 656, 658, 3, 84, 42, 0, 657, 655, 1, 0, 0, 0, 658,
    661, 1, 0, 0, 0, 659, 657, 1, 0, 0, 0, 659, 660, 1, 0, 0, 0, 660, 83, 1, 0, 0, 0, 661, 659, 1,
    0, 0, 0, 662, 665, 3, 148, 74, 0, 663, 665, 3, 112, 56, 0, 664, 662, 1, 0, 0, 0, 664, 663, 1, 0,
    0, 0, 665, 85, 1, 0, 0, 0, 666, 671, 3, 140, 70, 0, 667, 668, 5, 85, 0, 0, 668, 670, 3, 140, 70,
    0, 669, 667, 1, 0, 0, 0, 670, 673, 1, 0, 0, 0, 671, 669, 1, 0, 0, 0, 671, 672, 1, 0, 0, 0, 672,
    87, 1, 0, 0, 0, 673, 671, 1, 0, 0, 0, 674, 679, 3, 146, 73, 0, 675, 679, 3, 78, 39, 0, 676, 679,
    3, 142, 71, 0, 677, 679, 3, 144, 72, 0, 678, 674, 1, 0, 0, 0, 678, 675, 1, 0, 0, 0, 678, 676, 1,
    0, 0, 0, 678, 677, 1, 0, 0, 0, 679, 89, 1, 0, 0, 0, 680, 685, 3, 70, 35, 0, 681, 682, 5, 85, 0,
    0, 682, 684, 3, 70, 35, 0, 683, 681, 1, 0, 0, 0, 684, 687, 1, 0, 0, 0, 685, 683, 1, 0, 0, 0,
    685, 686, 1, 0, 0, 0, 686, 91, 1, 0, 0, 0, 687, 685, 1, 0, 0, 0, 688, 689, 3, 112, 56, 0, 689,
    93, 1, 0, 0, 0, 690, 696, 3, 96, 48, 0, 691, 696, 3, 98, 49, 0, 692, 696, 3, 100, 50, 0, 693,
    696, 3, 104, 52, 0, 694, 696, 3, 102, 51, 0, 695, 690, 1, 0, 0, 0, 695, 691, 1, 0, 0, 0, 695,
    692, 1, 0, 0, 0, 695, 693, 1, 0, 0, 0, 695, 694, 1, 0, 0, 0, 696, 95, 1, 0, 0, 0, 697, 698, 7,
    1, 0, 0, 698, 97, 1, 0, 0, 0, 699, 700, 7, 2, 0, 0, 700, 99, 1, 0, 0, 0, 701, 702, 5, 104, 0, 0,
    702, 101, 1, 0, 0, 0, 703, 704, 3, 78, 39, 0, 704, 705, 5, 84, 0, 0, 705, 706, 3, 70, 35, 0,
    706, 103, 1, 0, 0, 0, 707, 709, 5, 75, 0, 0, 708, 707, 1, 0, 0, 0, 708, 709, 1, 0, 0, 0, 709,
    710, 1, 0, 0, 0, 710, 711, 5, 105, 0, 0, 711, 105, 1, 0, 0, 0, 712, 713, 5, 80, 0, 0, 713, 714,
    3, 112, 56, 0, 714, 715, 5, 81, 0, 0, 715, 107, 1, 0, 0, 0, 716, 720, 3, 70, 35, 0, 717, 719, 3,
    106, 53, 0, 718, 717, 1, 0, 0, 0, 719, 722, 1, 0, 0, 0, 720, 718, 1, 0, 0, 0, 720, 721, 1, 0, 0,
    0, 721, 109, 1, 0, 0, 0, 722, 720, 1, 0, 0, 0, 723, 724, 5, 76, 0, 0, 724, 725, 5, 84, 0, 0,
    725, 726, 3, 108, 54, 0, 726, 111, 1, 0, 0, 0, 727, 728, 6, 56, -1, 0, 728, 741, 3, 138, 69, 0,
    729, 741, 3, 124, 62, 0, 730, 741, 3, 114, 57, 0, 731, 732, 5, 15, 0, 0, 732, 733, 5, 82, 0, 0,
    733, 734, 3, 112, 56, 0, 734, 735, 5, 85, 0, 0, 735, 736, 3, 112, 56, 0, 736, 737, 5, 85, 0, 0,
    737, 738, 3, 112, 56, 0, 738, 739, 5, 83, 0, 0, 739, 741, 1, 0, 0, 0, 740, 727, 1, 0, 0, 0, 740,
    729, 1, 0, 0, 0, 740, 730, 1, 0, 0, 0, 740, 731, 1, 0, 0, 0, 741, 748, 1, 0, 0, 0, 742, 743, 10,
    2, 0, 0, 743, 744, 3, 136, 68, 0, 744, 745, 3, 112, 56, 3, 745, 747, 1, 0, 0, 0, 746, 742, 1, 0,
    0, 0, 747, 750, 1, 0, 0, 0, 748, 746, 1, 0, 0, 0, 748, 749, 1, 0, 0, 0, 749, 113, 1, 0, 0, 0,
    750, 748, 1, 0, 0, 0, 751, 756, 3, 116, 58, 0, 752, 753, 5, 84, 0, 0, 753, 755, 3, 120, 60, 0,
    754, 752, 1, 0, 0, 0, 755, 758, 1, 0, 0, 0, 756, 754, 1, 0, 0, 0, 756, 757, 1, 0, 0, 0, 757,
    115, 1, 0, 0, 0, 758, 756, 1, 0, 0, 0, 759, 766, 3, 118, 59, 0, 760, 766, 3, 122, 61, 0, 761,
    766, 3, 132, 66, 0, 762, 766, 3, 94, 47, 0, 763, 766, 3, 150, 75, 0, 764, 766, 3, 120, 60, 0,
    765, 759, 1, 0, 0, 0, 765, 760, 1, 0, 0, 0, 765, 761, 1, 0, 0, 0, 765, 762, 1, 0, 0, 0, 765,
    763, 1, 0, 0, 0, 765, 764, 1, 0, 0, 0, 766, 117, 1, 0, 0, 0, 767, 768, 5, 76, 0, 0, 768, 119, 1,
    0, 0, 0, 769, 772, 3, 70, 35, 0, 770, 772, 3, 134, 67, 0, 771, 769, 1, 0, 0, 0, 771, 770, 1, 0,
    0, 0, 772, 776, 1, 0, 0, 0, 773, 775, 3, 106, 53, 0, 774, 773, 1, 0, 0, 0, 775, 778, 1, 0, 0, 0,
    776, 774, 1, 0, 0, 0, 776, 777, 1, 0, 0, 0, 777, 121, 1, 0, 0, 0, 778, 776, 1, 0, 0, 0, 779,
    780, 5, 82, 0, 0, 780, 781, 3, 112, 56, 0, 781, 782, 5, 83, 0, 0, 782, 123, 1, 0, 0, 0, 783,
    786, 3, 126, 63, 0, 784, 786, 3, 128, 64, 0, 785, 783, 1, 0, 0, 0, 785, 784, 1, 0, 0, 0, 786,
    125, 1, 0, 0, 0, 787, 788, 5, 88, 0, 0, 788, 789, 3, 114, 57, 0, 789, 127, 1, 0, 0, 0, 790, 791,
    5, 67, 0, 0, 791, 792, 3, 114, 57, 0, 792, 129, 1, 0, 0, 0, 793, 794, 3, 114, 57, 0, 794, 795,
    3, 136, 68, 0, 795, 796, 3, 112, 56, 0, 796, 131, 1, 0, 0, 0, 797, 798, 5, 82, 0, 0, 798, 799,
    3, 112, 56, 0, 799, 800, 5, 85, 0, 0, 800, 805, 3, 112, 56, 0, 801, 802, 5, 85, 0, 0, 802, 804,
    3, 112, 56, 0, 803, 801, 1, 0, 0, 0, 804, 807, 1, 0, 0, 0, 805, 803, 1, 0, 0, 0, 805, 806, 1, 0,
    0, 0, 806, 808, 1, 0, 0, 0, 807, 805, 1, 0, 0, 0, 808, 809, 5, 83, 0, 0, 809, 133, 1, 0, 0, 0,
    810, 811, 3, 74, 37, 0, 811, 813, 5, 82, 0, 0, 812, 814, 3, 82, 41, 0, 813, 812, 1, 0, 0, 0,
    813, 814, 1, 0, 0, 0, 814, 815, 1, 0, 0, 0, 815, 816, 5, 83, 0, 0, 816, 135, 1, 0, 0, 0, 817,
    818, 7, 3, 0, 0, 818, 137, 1, 0, 0, 0, 819, 820, 5, 32, 0, 0, 820, 821, 3, 88, 44, 0, 821, 823,
    5, 82, 0, 0, 822, 824, 3, 82, 41, 0, 823, 822, 1, 0, 0, 0, 823, 824, 1, 0, 0, 0, 824, 825, 1, 0,
    0, 0, 825, 826, 5, 83, 0, 0, 826, 139, 1, 0, 0, 0, 827, 828, 3, 70, 35, 0, 828, 829, 5, 47, 0,
    0, 829, 830, 3, 88, 44, 0, 830, 141, 1, 0, 0, 0, 831, 832, 3, 78, 39, 0, 832, 833, 5, 91, 0, 0,
    833, 834, 5, 33, 0, 0, 834, 839, 3, 88, 44, 0, 835, 836, 5, 85, 0, 0, 836, 838, 3, 88, 44, 0,
    837, 835, 1, 0, 0, 0, 838, 841, 1, 0, 0, 0, 839, 837, 1, 0, 0, 0, 839, 840, 1, 0, 0, 0, 840,
    842, 1, 0, 0, 0, 841, 839, 1, 0, 0, 0, 842, 843, 5, 92, 0, 0, 843, 143, 1, 0, 0, 0, 844, 845, 5,
    62, 0, 0, 845, 846, 5, 91, 0, 0, 846, 847, 5, 33, 0, 0, 847, 852, 3, 88, 44, 0, 848, 849, 5, 85,
    0, 0, 849, 851, 3, 88, 44, 0, 850, 848, 1, 0, 0, 0, 851, 854, 1, 0, 0, 0, 852, 850, 1, 0, 0, 0,
    852, 853, 1, 0, 0, 0, 853, 855, 1, 0, 0, 0, 854, 852, 1, 0, 0, 0, 855, 856, 5, 71, 0, 0, 856,
    857, 3, 88, 44, 0, 857, 858, 5, 92, 0, 0, 858, 145, 1, 0, 0, 0, 859, 860, 5, 82, 0, 0, 860, 863,
    3, 88, 44, 0, 861, 862, 5, 85, 0, 0, 862, 864, 3, 88, 44, 0, 863, 861, 1, 0, 0, 0, 864, 865, 1,
    0, 0, 0, 865, 863, 1, 0, 0, 0, 865, 866, 1, 0, 0, 0, 866, 867, 1, 0, 0, 0, 867, 868, 5, 83, 0,
    0, 868, 147, 1, 0, 0, 0, 869, 872, 5, 9, 0, 0, 870, 873, 3, 86, 43, 0, 871, 873, 3, 82, 41, 0,
    872, 870, 1, 0, 0, 0, 872, 871, 1, 0, 0, 0, 873, 874, 1, 0, 0, 0, 874, 875, 5, 71, 0, 0, 875,
    876, 3, 112, 56, 0, 876, 149, 1, 0, 0, 0, 877, 878, 5, 80, 0, 0, 878, 883, 3, 112, 56, 0, 879,
    880, 5, 85, 0, 0, 880, 882, 3, 112, 56, 0, 881, 879, 1, 0, 0, 0, 882, 885, 1, 0, 0, 0, 883, 881,
    1, 0, 0, 0, 883, 884, 1, 0, 0, 0, 884, 886, 1, 0, 0, 0, 885, 883, 1, 0, 0, 0, 886, 887, 5, 81,
    0, 0, 887, 151, 1, 0, 0, 0, 888, 889, 5, 75, 0, 0, 889, 890, 5, 105, 0, 0, 890, 153, 1, 0, 0, 0,
    891, 892, 3, 114, 57, 0, 892, 893, 5, 72, 0, 0, 893, 894, 3, 114, 57, 0, 894, 155, 1, 0, 0, 0,
    91, 157, 162, 168, 182, 185, 192, 200, 206, 214, 216, 225, 234, 236, 244, 250, 257, 265, 275,
    283, 289, 297, 299, 307, 314, 323, 325, 348, 351, 360, 362, 370, 378, 386, 396, 404, 411, 418,
    426, 436, 445, 450, 456, 466, 475, 488, 495, 507, 515, 521, 530, 535, 542, 550, 559, 562, 568,
    576, 578, 587, 590, 596, 603, 611, 618, 626, 633, 642, 652, 659, 664, 671, 678, 685, 695, 708,
    720, 740, 748, 756, 765, 771, 776, 785, 805, 813, 823, 839, 852, 865, 872, 883,
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
  public term(): TermContext {
    return this.getRuleContext(0, TermContext)!;
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
  public binaryOperator(): BinaryOperatorContext | null {
    return this.getRuleContext(0, BinaryOperatorContext);
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
  public chainHead(): ChainHeadContext {
    return this.getRuleContext(0, ChainHeadContext)!;
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

export class TupleContext extends antlr.ParserRuleContext {
  public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
    super(parent, invokingState);
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

export class ListContext extends antlr.ParserRuleContext {
  public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
    super(parent, invokingState);
  }
  public OPEN_SQ_BRACKET(): antlr.TerminalNode {
    return this.getToken(RefLangParser.OPEN_SQ_BRACKET, 0)!;
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
    return this.getToken(RefLangParser.CLOSE_SQ_BRACKET, 0)!;
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
