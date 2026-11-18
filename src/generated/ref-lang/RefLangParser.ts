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
  public static readonly LAMBDA = 8;
  public static readonly MAIN = 9;
  public static readonly RETURN = 10;
  public static readonly TRY = 11;
  public static readonly WHILE = 12;
  public static readonly IF_ = 13;
  public static readonly ABSTRACT = 14;
  public static readonly ASSERT = 15;
  public static readonly ASSIGN = 16;
  public static readonly BE = 17;
  public static readonly CALL = 18;
  public static readonly CATCH = 19;
  public static readonly CONSTANT = 20;
  public static readonly CONSTRUCTOR = 21;
  public static readonly COPY = 22;
  public static readonly DIV = 23;
  public static readonly END = 24;
  public static readonly EVALUATES = 25;
  public static readonly FROM = 26;
  public static readonly FUNCTION = 27;
  public static readonly INHERITS = 28;
  public static readonly LET = 29;
  public static readonly NEW = 30;
  public static readonly OF = 31;
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
  public static readonly DICT_NAME = 60;
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
  public static readonly START_INTERPOLATED_STRING = 103;
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
  public static readonly Grapheme = 124;
  public static readonly EscapedLeftBrace = 125;
  public static readonly EscapedDoubleQuotes = 126;
  public static readonly RULE_file = 0;
  public static readonly RULE_globalBlock = 1;
  public static readonly RULE_global = 2;
  public static readonly RULE_main = 3;
  public static readonly RULE_function = 4;
  public static readonly RULE_test = 5;
  public static readonly RULE_testStatement = 6;
  public static readonly RULE_procedure = 7;
  public static readonly RULE_constant = 8;
  public static readonly RULE_enum = 9;
  public static readonly RULE_concreteClass = 10;
  public static readonly RULE_concreteClassMember = 11;
  public static readonly RULE_abstractClass = 12;
  public static readonly RULE_abstractClassMember = 13;
  public static readonly RULE_comment = 14;
  public static readonly RULE_commentText = 15;
  public static readonly RULE_statementBlock = 16;
  public static readonly RULE_selectableStatement = 17;
  public static readonly RULE_ordinaryStatement = 18;
  public static readonly RULE_variableDefinition = 19;
  public static readonly RULE_assignment = 20;
  public static readonly RULE_ifStatement = 21;
  public static readonly RULE_thenClause = 22;
  public static readonly RULE_elseIfClause = 23;
  public static readonly RULE_elseClause = 24;
  public static readonly RULE_whileLoop = 25;
  public static readonly RULE_forLoop = 26;
  public static readonly RULE_procedureCall = 27;
  public static readonly RULE_tryStatement = 28;
  public static readonly RULE_tryClause = 29;
  public static readonly RULE_catchClause = 30;
  public static readonly RULE_throwStatement = 31;
  public static readonly RULE_errorMessage = 32;
  public static readonly RULE_assert = 33;
  public static readonly RULE_returnStatement = 34;
  public static readonly RULE_memberBlock = 35;
  public static readonly RULE_selectableMember = 36;
  public static readonly RULE_constructorMember = 37;
  public static readonly RULE_property = 38;
  public static readonly RULE_functionMethod = 39;
  public static readonly RULE_procedureMethod = 40;
  public static readonly RULE_abstractFunction = 41;
  public static readonly RULE_abstractProcedure = 42;
  public static readonly RULE_identifierDef = 43;
  public static readonly RULE_identifierUse = 44;
  public static readonly RULE_assignable = 45;
  public static readonly RULE_methodName = 46;
  public static readonly RULE_testName = 47;
  public static readonly RULE_typeName = 48;
  public static readonly RULE_constantValue = 49;
  public static readonly RULE_argList = 50;
  public static readonly RULE_argument = 51;
  public static readonly RULE_paramList = 52;
  public static readonly RULE_identifierList = 53;
  public static readonly RULE_expressionList = 54;
  public static readonly RULE_type = 55;
  public static readonly RULE_assertActual = 56;
  public static readonly RULE_assertExpected = 57;
  public static readonly RULE_litValue = 58;
  public static readonly RULE_litBoolean = 59;
  public static readonly RULE_litInt = 60;
  public static readonly RULE_litFloat = 61;
  public static readonly RULE_litString = 62;
  public static readonly RULE_interpolatedStringExpression = 63;
  public static readonly RULE_segment = 64;
  public static readonly RULE_interpolatedString = 65;
  public static readonly RULE_enumValue = 66;
  public static readonly RULE_index = 67;
  public static readonly RULE_expression = 68;
  public static readonly RULE_term = 69;
  public static readonly RULE_chainable = 70;
  public static readonly RULE_thisInstance = 71;
  public static readonly RULE_bracketedExpression = 72;
  public static readonly RULE_unaryExpression = 73;
  public static readonly RULE_negateNumeric = 74;
  public static readonly RULE_negateLogical = 75;
  public static readonly RULE_binaryExpression = 76;
  public static readonly RULE_list = 77;
  public static readonly RULE_tuple = 78;
  public static readonly RULE_dictionary = 79;
  public static readonly RULE_kvpList = 80;
  public static readonly RULE_kvp = 81;
  public static readonly RULE_methodCall = 82;
  public static readonly RULE_binaryOperator = 83;
  public static readonly RULE_newInstance = 84;
  public static readonly RULE_paramDef = 85;
  public static readonly RULE_typeGeneric = 86;
  public static readonly RULE_typeFunc = 87;
  public static readonly RULE_typeTuple = 88;
  public static readonly RULE_lambda = 89;

  public static readonly literalNames = [
    null,
    "'class'",
    "'elif'",
    "'else'",
    "'enum'",
    "'for'",
    "'if'",
    "'in'",
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
    "'Dictionary'",
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
    null,
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
    "'$\"'",
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
    null,
    null,
    "'\\{'",
    "'\\\"'",
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
    "DICT_NAME",
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
    "START_INTERPOLATED_STRING",
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
    "Grapheme",
    "EscapedLeftBrace",
    "EscapedDoubleQuotes",
  ];
  public static readonly ruleNames = [
    "file",
    "globalBlock",
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
    "statementBlock",
    "selectableStatement",
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
    "memberBlock",
    "selectableMember",
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
    "interpolatedStringExpression",
    "segment",
    "interpolatedString",
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
        this.state = 181;
        this.errorHandler.sync(this);
        switch (this.interpreter.adaptivePredict(this.tokenStream, 0, this.context)) {
          case 1:
            {
              this.state = 180;
              this.comment();
            }
            break;
        }
        this.state = 186;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (
          ((_la & ~0x1f) === 0 && ((1 << _la) & 135283218) !== 0) ||
          _la === 33 ||
          _la === 38 ||
          _la === 107 ||
          _la === 123
        ) {
          {
            {
              this.state = 183;
              this.global();
            }
          }
          this.state = 188;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 192;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (_la === 95) {
          {
            {
              this.state = 189;
              this.match(RefLangParser.NL);
            }
          }
          this.state = 194;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 195;
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
  public globalBlock(): GlobalBlockContext {
    let localContext = new GlobalBlockContext(this.context, this.state);
    this.enterRule(localContext, 2, RefLangParser.RULE_globalBlock);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 198;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        do {
          {
            {
              this.state = 197;
              this.global();
            }
          }
          this.state = 200;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        } while (
          ((_la & ~0x1f) === 0 && ((1 << _la) & 135283218) !== 0) ||
          _la === 33 ||
          _la === 38 ||
          _la === 107 ||
          _la === 123
        );
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
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
    this.enterRule(localContext, 4, RefLangParser.RULE_global);
    try {
      this.state = 211;
      this.errorHandler.sync(this);
      switch (this.interpreter.adaptivePredict(this.tokenStream, 4, this.context)) {
        case 1:
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 202;
            this.main();
          }
          break;
        case 2:
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 203;
            this.function_();
          }
          break;
        case 3:
          this.enterOuterAlt(localContext, 3);
          {
            this.state = 204;
            this.test();
          }
          break;
        case 4:
          this.enterOuterAlt(localContext, 4);
          {
            this.state = 205;
            this.procedure();
          }
          break;
        case 5:
          this.enterOuterAlt(localContext, 5);
          {
            this.state = 206;
            this.constant();
          }
          break;
        case 6:
          this.enterOuterAlt(localContext, 6);
          {
            this.state = 207;
            this.enum_();
          }
          break;
        case 7:
          this.enterOuterAlt(localContext, 7);
          {
            this.state = 208;
            this.concreteClass();
          }
          break;
        case 8:
          this.enterOuterAlt(localContext, 8);
          {
            this.state = 209;
            this.abstractClass();
          }
          break;
        case 9:
          this.enterOuterAlt(localContext, 9);
          {
            this.state = 210;
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
    this.enterRule(localContext, 6, RefLangParser.RULE_main);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 214;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 107) {
          {
            this.state = 213;
            this.match(RefLangParser.GHOSTED);
          }
        }

        this.state = 216;
        this.match(RefLangParser.MAIN);
        this.state = 217;
        this.match(RefLangParser.NL);
        this.state = 221;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (
          ((_la & ~0x1f) === 0 && ((1 << _la) & 333920) !== 0) ||
          _la === 40 ||
          _la === 42 ||
          _la === 107 ||
          _la === 123
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
        this.match(RefLangParser.END);
        this.state = 225;
        this.match(RefLangParser.MAIN);
        this.state = 226;
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
    this.enterRule(localContext, 8, RefLangParser.RULE_function);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 229;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 107) {
          {
            this.state = 228;
            this.match(RefLangParser.GHOSTED);
          }
        }

        this.state = 231;
        this.match(RefLangParser.FUNCTION);
        this.state = 232;
        this.methodName();
        this.state = 233;
        this.match(RefLangParser.OPEN_BRACKET);
        this.state = 235;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 97) {
          {
            this.state = 234;
            this.paramList();
          }
        }

        this.state = 237;
        this.match(RefLangParser.CLOSE_BRACKET);
        this.state = 238;
        this.match(RefLangParser.RETURNS);
        this.state = 239;
        this.type_();
        this.state = 240;
        this.match(RefLangParser.NL);
        this.state = 244;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (
          ((_la & ~0x1f) === 0 && ((1 << _la) & 333920) !== 0) ||
          _la === 40 ||
          _la === 42 ||
          _la === 107 ||
          _la === 123
        ) {
          {
            {
              this.state = 241;
              this.ordinaryStatement();
            }
          }
          this.state = 246;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 247;
        this.returnStatement();
        this.state = 248;
        this.match(RefLangParser.END);
        this.state = 249;
        this.match(RefLangParser.FUNCTION);
        this.state = 250;
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
    this.enterRule(localContext, 10, RefLangParser.RULE_test);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 253;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 107) {
          {
            this.state = 252;
            this.match(RefLangParser.GHOSTED);
          }
        }

        this.state = 255;
        this.match(RefLangParser.TEST);
        this.state = 256;
        this.testName();
        this.state = 257;
        this.match(RefLangParser.NL);
        this.state = 261;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (_la === 15 || _la === 42 || _la === 107 || _la === 123) {
          {
            {
              this.state = 258;
              this.testStatement();
            }
          }
          this.state = 263;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 264;
        this.match(RefLangParser.END);
        this.state = 265;
        this.match(RefLangParser.TEST);
        this.state = 266;
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
    this.enterRule(localContext, 12, RefLangParser.RULE_testStatement);
    try {
      this.state = 271;
      this.errorHandler.sync(this);
      switch (this.interpreter.adaptivePredict(this.tokenStream, 12, this.context)) {
        case 1:
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 268;
            this.assert();
          }
          break;
        case 2:
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 269;
            this.variableDefinition();
          }
          break;
        case 3:
          this.enterOuterAlt(localContext, 3);
          {
            this.state = 270;
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
    this.enterRule(localContext, 14, RefLangParser.RULE_procedure);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 274;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 107) {
          {
            this.state = 273;
            this.match(RefLangParser.GHOSTED);
          }
        }

        this.state = 276;
        this.match(RefLangParser.PROCEDURE);
        this.state = 277;
        this.methodName();
        this.state = 278;
        this.match(RefLangParser.OPEN_BRACKET);
        this.state = 280;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 97) {
          {
            this.state = 279;
            this.paramList();
          }
        }

        this.state = 282;
        this.match(RefLangParser.CLOSE_BRACKET);
        this.state = 283;
        this.match(RefLangParser.NL);
        this.state = 287;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (
          ((_la & ~0x1f) === 0 && ((1 << _la) & 333920) !== 0) ||
          _la === 40 ||
          _la === 42 ||
          _la === 107 ||
          _la === 123
        ) {
          {
            {
              this.state = 284;
              this.ordinaryStatement();
            }
          }
          this.state = 289;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 290;
        this.match(RefLangParser.END);
        this.state = 291;
        this.match(RefLangParser.PROCEDURE);
        this.state = 292;
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
    this.enterRule(localContext, 16, RefLangParser.RULE_constant);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 295;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 107) {
          {
            this.state = 294;
            this.match(RefLangParser.GHOSTED);
          }
        }

        this.state = 297;
        this.match(RefLangParser.CONSTANT);
        this.state = 298;
        this.identifierDef();
        this.state = 299;
        this.match(RefLangParser.SET);
        this.state = 300;
        this.match(RefLangParser.TO);
        this.state = 301;
        this.constantValue();
        this.state = 302;
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
    this.enterRule(localContext, 18, RefLangParser.RULE_enum);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 305;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 107) {
          {
            this.state = 304;
            this.match(RefLangParser.GHOSTED);
          }
        }

        this.state = 307;
        this.match(RefLangParser.ENUM);
        this.state = 308;
        this.typeName();
        this.state = 309;
        this.identifierList();
        this.state = 310;
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
    this.enterRule(localContext, 20, RefLangParser.RULE_concreteClass);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 313;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 107) {
          {
            this.state = 312;
            this.match(RefLangParser.GHOSTED);
          }
        }

        this.state = 315;
        this.match(RefLangParser.CLASS);
        this.state = 316;
        localContext._classTypeName = this.typeName();
        this.state = 319;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 28) {
          {
            this.state = 317;
            this.match(RefLangParser.INHERITS);
            this.state = 318;
            localContext._inheritsTypeName = this.typeName();
          }
        }

        this.state = 321;
        this.match(RefLangParser.NL);
        this.state = 322;
        this.constructorMember();
        this.state = 326;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (
          (((_la - 27) & ~0x1f) === 0 && ((1 << (_la - 27)) & 225) !== 0) ||
          _la === 107 ||
          _la === 123
        ) {
          {
            {
              this.state = 323;
              this.concreteClassMember();
            }
          }
          this.state = 328;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 329;
        this.match(RefLangParser.END);
        this.state = 330;
        this.match(RefLangParser.CLASS);
        this.state = 331;
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
    this.enterRule(localContext, 22, RefLangParser.RULE_concreteClassMember);
    try {
      this.state = 337;
      this.errorHandler.sync(this);
      switch (this.interpreter.adaptivePredict(this.tokenStream, 21, this.context)) {
        case 1:
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 333;
            this.property();
          }
          break;
        case 2:
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 334;
            this.functionMethod();
          }
          break;
        case 3:
          this.enterOuterAlt(localContext, 3);
          {
            this.state = 335;
            this.procedureMethod();
          }
          break;
        case 4:
          this.enterOuterAlt(localContext, 4);
          {
            this.state = 336;
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
    this.enterRule(localContext, 24, RefLangParser.RULE_abstractClass);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 340;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 107) {
          {
            this.state = 339;
            this.match(RefLangParser.GHOSTED);
          }
        }

        this.state = 342;
        this.match(RefLangParser.ABSTRACT);
        this.state = 343;
        this.match(RefLangParser.CLASS);
        this.state = 344;
        localContext._classTypeName = this.typeName();
        this.state = 347;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 28) {
          {
            this.state = 345;
            this.match(RefLangParser.INHERITS);
            this.state = 346;
            localContext._inheritsTypeName = this.typeName();
          }
        }

        this.state = 349;
        this.match(RefLangParser.NL);
        this.state = 353;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (
          (((_la - 14) & ~0x1f) === 0 && ((1 << (_la - 14)) & 1843201) !== 0) ||
          _la === 107 ||
          _la === 123
        ) {
          {
            {
              this.state = 350;
              this.abstractClassMember();
            }
          }
          this.state = 355;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 356;
        this.match(RefLangParser.END);
        this.state = 357;
        this.match(RefLangParser.CLASS);
        this.state = 358;
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
    this.enterRule(localContext, 26, RefLangParser.RULE_abstractClassMember);
    try {
      this.state = 366;
      this.errorHandler.sync(this);
      switch (this.interpreter.adaptivePredict(this.tokenStream, 25, this.context)) {
        case 1:
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 360;
            this.property();
          }
          break;
        case 2:
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 361;
            this.functionMethod();
          }
          break;
        case 3:
          this.enterOuterAlt(localContext, 3);
          {
            this.state = 362;
            this.procedureMethod();
          }
          break;
        case 4:
          this.enterOuterAlt(localContext, 4);
          {
            this.state = 363;
            this.abstractFunction();
          }
          break;
        case 5:
          this.enterOuterAlt(localContext, 5);
          {
            this.state = 364;
            this.abstractProcedure();
          }
          break;
        case 6:
          this.enterOuterAlt(localContext, 6);
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
  public comment(): CommentContext {
    let localContext = new CommentContext(this.context, this.state);
    this.enterRule(localContext, 28, RefLangParser.RULE_comment);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 369;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 107) {
          {
            this.state = 368;
            this.match(RefLangParser.GHOSTED);
          }
        }

        this.state = 371;
        this.commentText();
        this.state = 372;
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
    this.enterRule(localContext, 30, RefLangParser.RULE_commentText);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 374;
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
  public statementBlock(): StatementBlockContext {
    let localContext = new StatementBlockContext(this.context, this.state);
    this.enterRule(localContext, 32, RefLangParser.RULE_statementBlock);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 377;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        do {
          {
            {
              this.state = 376;
              this.selectableStatement();
            }
          }
          this.state = 379;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        } while (
          ((_la & ~0x1f) === 0 && ((1 << _la) & 890988) !== 0) ||
          _la === 40 ||
          _la === 42 ||
          _la === 107 ||
          _la === 123
        );
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
        this.errorHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localContext;
  }
  public selectableStatement(): SelectableStatementContext {
    let localContext = new SelectableStatementContext(this.context, this.state);
    this.enterRule(localContext, 34, RefLangParser.RULE_selectableStatement);
    try {
      this.state = 394;
      this.errorHandler.sync(this);
      switch (this.interpreter.adaptivePredict(this.tokenStream, 28, this.context)) {
        case 1:
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 381;
            this.variableDefinition();
          }
          break;
        case 2:
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 382;
            this.assert();
          }
          break;
        case 3:
          this.enterOuterAlt(localContext, 3);
          {
            this.state = 383;
            this.assignment();
          }
          break;
        case 4:
          this.enterOuterAlt(localContext, 4);
          {
            this.state = 384;
            this.ifStatement();
          }
          break;
        case 5:
          this.enterOuterAlt(localContext, 5);
          {
            this.state = 385;
            this.elseIfClause();
          }
          break;
        case 6:
          this.enterOuterAlt(localContext, 6);
          {
            this.state = 386;
            this.elseClause();
          }
          break;
        case 7:
          this.enterOuterAlt(localContext, 7);
          {
            this.state = 387;
            this.whileLoop();
          }
          break;
        case 8:
          this.enterOuterAlt(localContext, 8);
          {
            this.state = 388;
            this.forLoop();
          }
          break;
        case 9:
          this.enterOuterAlt(localContext, 9);
          {
            this.state = 389;
            this.procedureCall();
          }
          break;
        case 10:
          this.enterOuterAlt(localContext, 10);
          {
            this.state = 390;
            this.tryStatement();
          }
          break;
        case 11:
          this.enterOuterAlt(localContext, 11);
          {
            this.state = 391;
            this.catchClause();
          }
          break;
        case 12:
          this.enterOuterAlt(localContext, 12);
          {
            this.state = 392;
            this.throwStatement();
          }
          break;
        case 13:
          this.enterOuterAlt(localContext, 13);
          {
            this.state = 393;
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
  public ordinaryStatement(): OrdinaryStatementContext {
    let localContext = new OrdinaryStatementContext(this.context, this.state);
    this.enterRule(localContext, 36, RefLangParser.RULE_ordinaryStatement);
    try {
      this.state = 405;
      this.errorHandler.sync(this);
      switch (this.interpreter.adaptivePredict(this.tokenStream, 29, this.context)) {
        case 1:
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 396;
            this.variableDefinition();
          }
          break;
        case 2:
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 397;
            this.assignment();
          }
          break;
        case 3:
          this.enterOuterAlt(localContext, 3);
          {
            this.state = 398;
            this.ifStatement();
          }
          break;
        case 4:
          this.enterOuterAlt(localContext, 4);
          {
            this.state = 399;
            this.whileLoop();
          }
          break;
        case 5:
          this.enterOuterAlt(localContext, 5);
          {
            this.state = 400;
            this.forLoop();
          }
          break;
        case 6:
          this.enterOuterAlt(localContext, 6);
          {
            this.state = 401;
            this.procedureCall();
          }
          break;
        case 7:
          this.enterOuterAlt(localContext, 7);
          {
            this.state = 402;
            this.tryStatement();
          }
          break;
        case 8:
          this.enterOuterAlt(localContext, 8);
          {
            this.state = 403;
            this.throwStatement();
          }
          break;
        case 9:
          this.enterOuterAlt(localContext, 9);
          {
            this.state = 404;
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
    this.enterRule(localContext, 38, RefLangParser.RULE_variableDefinition);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 408;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 107) {
          {
            this.state = 407;
            this.match(RefLangParser.GHOSTED);
          }
        }

        this.state = 410;
        this.match(RefLangParser.VARIABLE);
        this.state = 411;
        this.identifierDef();
        this.state = 412;
        this.match(RefLangParser.SET);
        this.state = 413;
        this.match(RefLangParser.TO);
        this.state = 414;
        this.expression();
        this.state = 415;
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
    this.enterRule(localContext, 40, RefLangParser.RULE_assignment);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 418;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 107) {
          {
            this.state = 417;
            this.match(RefLangParser.GHOSTED);
          }
        }

        this.state = 420;
        this.match(RefLangParser.ASSIGN);
        this.state = 421;
        this.assignable(0);
        this.state = 422;
        this.match(RefLangParser.TO);
        this.state = 423;
        this.expression();
        this.state = 424;
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
    this.enterRule(localContext, 42, RefLangParser.RULE_ifStatement);
    let _la: number;
    try {
      let alternative: number;
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 427;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 107) {
          {
            this.state = 426;
            this.match(RefLangParser.GHOSTED);
          }
        }

        this.state = 429;
        this.match(RefLangParser.IF);
        this.state = 430;
        localContext._condition = this.expression();
        this.state = 431;
        this.match(RefLangParser.THEN);
        this.state = 432;
        this.match(RefLangParser.NL);
        this.state = 433;
        this.thenClause();
        this.state = 437;
        this.errorHandler.sync(this);
        alternative = this.interpreter.adaptivePredict(this.tokenStream, 33, this.context);
        while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
          if (alternative === 1) {
            {
              {
                this.state = 434;
                this.elseIfClause();
              }
            }
          }
          this.state = 439;
          this.errorHandler.sync(this);
          alternative = this.interpreter.adaptivePredict(this.tokenStream, 33, this.context);
        }
        this.state = 441;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 3 || _la === 107) {
          {
            this.state = 440;
            this.elseClause();
          }
        }

        this.state = 443;
        this.match(RefLangParser.END);
        this.state = 444;
        this.match(RefLangParser.IF);
        this.state = 445;
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
  public thenClause(): ThenClauseContext {
    let localContext = new ThenClauseContext(this.context, this.state);
    this.enterRule(localContext, 44, RefLangParser.RULE_thenClause);
    try {
      let alternative: number;
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 450;
        this.errorHandler.sync(this);
        alternative = this.interpreter.adaptivePredict(this.tokenStream, 35, this.context);
        while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
          if (alternative === 1) {
            {
              {
                this.state = 447;
                this.ordinaryStatement();
              }
            }
          }
          this.state = 452;
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
      this.exitRule();
    }
    return localContext;
  }
  public elseIfClause(): ElseIfClauseContext {
    let localContext = new ElseIfClauseContext(this.context, this.state);
    this.enterRule(localContext, 46, RefLangParser.RULE_elseIfClause);
    let _la: number;
    try {
      let alternative: number;
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 454;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 107) {
          {
            this.state = 453;
            this.match(RefLangParser.GHOSTED);
          }
        }

        this.state = 456;
        this.match(RefLangParser.ELIF);
        this.state = 457;
        this.expression();
        this.state = 458;
        this.match(RefLangParser.THEN);
        this.state = 459;
        this.match(RefLangParser.NL);
        this.state = 463;
        this.errorHandler.sync(this);
        alternative = this.interpreter.adaptivePredict(this.tokenStream, 37, this.context);
        while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
          if (alternative === 1) {
            {
              {
                this.state = 460;
                this.ordinaryStatement();
              }
            }
          }
          this.state = 465;
          this.errorHandler.sync(this);
          alternative = this.interpreter.adaptivePredict(this.tokenStream, 37, this.context);
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
    this.enterRule(localContext, 48, RefLangParser.RULE_elseClause);
    let _la: number;
    try {
      let alternative: number;
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 467;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 107) {
          {
            this.state = 466;
            this.match(RefLangParser.GHOSTED);
          }
        }

        this.state = 469;
        this.match(RefLangParser.ELSE);
        this.state = 470;
        this.match(RefLangParser.NL);
        this.state = 474;
        this.errorHandler.sync(this);
        alternative = this.interpreter.adaptivePredict(this.tokenStream, 39, this.context);
        while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
          if (alternative === 1) {
            {
              {
                this.state = 471;
                this.ordinaryStatement();
              }
            }
          }
          this.state = 476;
          this.errorHandler.sync(this);
          alternative = this.interpreter.adaptivePredict(this.tokenStream, 39, this.context);
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
    this.enterRule(localContext, 50, RefLangParser.RULE_whileLoop);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 478;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 107) {
          {
            this.state = 477;
            this.match(RefLangParser.GHOSTED);
          }
        }

        this.state = 480;
        this.match(RefLangParser.WHILE);
        this.state = 481;
        localContext._condition = this.expression();
        this.state = 482;
        this.match(RefLangParser.NL);
        this.state = 486;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (
          ((_la & ~0x1f) === 0 && ((1 << _la) & 333920) !== 0) ||
          _la === 40 ||
          _la === 42 ||
          _la === 107 ||
          _la === 123
        ) {
          {
            {
              this.state = 483;
              this.ordinaryStatement();
            }
          }
          this.state = 488;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 489;
        this.match(RefLangParser.END);
        this.state = 490;
        this.match(RefLangParser.WHILE);
        this.state = 491;
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
    this.enterRule(localContext, 52, RefLangParser.RULE_forLoop);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 494;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 107) {
          {
            this.state = 493;
            this.match(RefLangParser.GHOSTED);
          }
        }

        this.state = 496;
        this.match(RefLangParser.FOR);
        this.state = 497;
        this.identifierDef();
        this.state = 498;
        this.match(RefLangParser.IN);
        this.state = 499;
        this.expression();
        this.state = 500;
        this.match(RefLangParser.NL);
        this.state = 504;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (
          ((_la & ~0x1f) === 0 && ((1 << _la) & 333920) !== 0) ||
          _la === 40 ||
          _la === 42 ||
          _la === 107 ||
          _la === 123
        ) {
          {
            {
              this.state = 501;
              this.ordinaryStatement();
            }
          }
          this.state = 506;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 507;
        this.match(RefLangParser.END);
        this.state = 508;
        this.match(RefLangParser.FOR);
        this.state = 509;
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
    this.enterRule(localContext, 54, RefLangParser.RULE_procedureCall);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 512;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 107) {
          {
            this.state = 511;
            this.match(RefLangParser.GHOSTED);
          }
        }

        this.state = 514;
        this.match(RefLangParser.CALL);
        this.state = 515;
        this.term(0);
        this.state = 516;
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
    this.enterRule(localContext, 56, RefLangParser.RULE_tryStatement);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 519;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 107) {
          {
            this.state = 518;
            this.match(RefLangParser.GHOSTED);
          }
        }

        this.state = 521;
        this.match(RefLangParser.TRY);
        this.state = 522;
        this.match(RefLangParser.NL);
        this.state = 523;
        this.tryClause();
        this.state = 525;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        do {
          {
            {
              this.state = 524;
              this.catchClause();
            }
          }
          this.state = 527;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        } while (_la === 19 || _la === 107);
        this.state = 529;
        this.match(RefLangParser.END);
        this.state = 530;
        this.match(RefLangParser.TRY);
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
  public tryClause(): TryClauseContext {
    let localContext = new TryClauseContext(this.context, this.state);
    this.enterRule(localContext, 58, RefLangParser.RULE_tryClause);
    try {
      let alternative: number;
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 536;
        this.errorHandler.sync(this);
        alternative = this.interpreter.adaptivePredict(this.tokenStream, 47, this.context);
        while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
          if (alternative === 1) {
            {
              {
                this.state = 533;
                this.ordinaryStatement();
              }
            }
          }
          this.state = 538;
          this.errorHandler.sync(this);
          alternative = this.interpreter.adaptivePredict(this.tokenStream, 47, this.context);
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
    this.enterRule(localContext, 60, RefLangParser.RULE_catchClause);
    let _la: number;
    try {
      let alternative: number;
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 540;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 107) {
          {
            this.state = 539;
            this.match(RefLangParser.GHOSTED);
          }
        }

        this.state = 542;
        this.match(RefLangParser.CATCH);
        this.state = 543;
        this.identifierDef();
        this.state = 544;
        this.match(RefLangParser.AS);
        this.state = 545;
        this.typeName();
        this.state = 546;
        this.match(RefLangParser.NL);
        this.state = 550;
        this.errorHandler.sync(this);
        alternative = this.interpreter.adaptivePredict(this.tokenStream, 49, this.context);
        while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
          if (alternative === 1) {
            {
              {
                this.state = 547;
                this.ordinaryStatement();
              }
            }
          }
          this.state = 552;
          this.errorHandler.sync(this);
          alternative = this.interpreter.adaptivePredict(this.tokenStream, 49, this.context);
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
    this.enterRule(localContext, 62, RefLangParser.RULE_throwStatement);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 554;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 107) {
          {
            this.state = 553;
            this.match(RefLangParser.GHOSTED);
          }
        }

        this.state = 556;
        this.match(RefLangParser.THROW);
        this.state = 557;
        this.typeName();
        this.state = 558;
        this.errorMessage();
        this.state = 559;
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
    this.enterRule(localContext, 64, RefLangParser.RULE_errorMessage);
    try {
      this.state = 563;
      this.errorHandler.sync(this);
      switch (this.tokenStream.LA(1)) {
        case RefLangParser.LITERAL_STRING:
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 561;
            this.litString();
          }
          break;
        case RefLangParser.NAME_STARTING_LC:
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 562;
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
    this.enterRule(localContext, 66, RefLangParser.RULE_assert);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 566;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 107) {
          {
            this.state = 565;
            this.match(RefLangParser.GHOSTED);
          }
        }

        this.state = 568;
        this.match(RefLangParser.ASSERT);
        this.state = 569;
        this.assertActual();
        this.state = 570;
        this.match(RefLangParser.EVALUATES);
        this.state = 571;
        this.match(RefLangParser.TO);
        this.state = 572;
        this.assertExpected();
        this.state = 573;
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
    this.enterRule(localContext, 68, RefLangParser.RULE_returnStatement);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 575;
        this.match(RefLangParser.RETURN);
        this.state = 576;
        this.expression();
        this.state = 577;
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
  public memberBlock(): MemberBlockContext {
    let localContext = new MemberBlockContext(this.context, this.state);
    this.enterRule(localContext, 70, RefLangParser.RULE_memberBlock);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 580;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        do {
          {
            {
              this.state = 579;
              this.selectableMember();
            }
          }
          this.state = 582;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        } while (
          (((_la - 14) & ~0x1f) === 0 && ((1 << (_la - 14)) & 1843201) !== 0) ||
          _la === 107
        );
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
        this.errorHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localContext;
  }
  public selectableMember(): SelectableMemberContext {
    let localContext = new SelectableMemberContext(this.context, this.state);
    this.enterRule(localContext, 72, RefLangParser.RULE_selectableMember);
    try {
      this.state = 589;
      this.errorHandler.sync(this);
      switch (this.interpreter.adaptivePredict(this.tokenStream, 54, this.context)) {
        case 1:
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 584;
            this.property();
          }
          break;
        case 2:
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 585;
            this.functionMethod();
          }
          break;
        case 3:
          this.enterOuterAlt(localContext, 3);
          {
            this.state = 586;
            this.procedureMethod();
          }
          break;
        case 4:
          this.enterOuterAlt(localContext, 4);
          {
            this.state = 587;
            this.abstractFunction();
          }
          break;
        case 5:
          this.enterOuterAlt(localContext, 5);
          {
            this.state = 588;
            this.abstractProcedure();
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
  public constructorMember(): ConstructorMemberContext {
    let localContext = new ConstructorMemberContext(this.context, this.state);
    this.enterRule(localContext, 74, RefLangParser.RULE_constructorMember);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 592;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 107) {
          {
            this.state = 591;
            this.match(RefLangParser.GHOSTED);
          }
        }

        this.state = 594;
        this.match(RefLangParser.CONSTRUCTOR);
        this.state = 595;
        this.match(RefLangParser.OPEN_BRACKET);
        this.state = 597;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 97) {
          {
            this.state = 596;
            this.paramList();
          }
        }

        this.state = 599;
        this.match(RefLangParser.CLOSE_BRACKET);
        this.state = 600;
        this.match(RefLangParser.NL);
        this.state = 604;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (
          ((_la & ~0x1f) === 0 && ((1 << _la) & 333920) !== 0) ||
          _la === 40 ||
          _la === 42 ||
          _la === 107 ||
          _la === 123
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
        this.match(RefLangParser.END);
        this.state = 608;
        this.match(RefLangParser.CONSTRUCTOR);
        this.state = 609;
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
    this.enterRule(localContext, 76, RefLangParser.RULE_property);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 612;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 107) {
          {
            this.state = 611;
            this.match(RefLangParser.GHOSTED);
          }
        }

        this.state = 615;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 32) {
          {
            this.state = 614;
            this.match(RefLangParser.PRIVATE);
          }
        }

        this.state = 617;
        this.match(RefLangParser.PROPERTY);
        this.state = 618;
        this.identifierDef();
        this.state = 619;
        this.match(RefLangParser.AS);
        this.state = 620;
        this.type_();
        this.state = 621;
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
    this.enterRule(localContext, 78, RefLangParser.RULE_functionMethod);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 624;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 107) {
          {
            this.state = 623;
            this.match(RefLangParser.GHOSTED);
          }
        }

        this.state = 627;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 32) {
          {
            this.state = 626;
            this.match(RefLangParser.PRIVATE);
          }
        }

        this.state = 629;
        this.match(RefLangParser.FUNCTION);
        this.state = 630;
        this.methodName();
        this.state = 631;
        this.match(RefLangParser.OPEN_BRACKET);
        this.state = 633;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 97) {
          {
            this.state = 632;
            this.paramList();
          }
        }

        this.state = 635;
        this.match(RefLangParser.CLOSE_BRACKET);
        this.state = 636;
        this.match(RefLangParser.RETURNS);
        this.state = 637;
        this.type_();
        this.state = 638;
        this.match(RefLangParser.NL);
        this.state = 642;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (
          ((_la & ~0x1f) === 0 && ((1 << _la) & 333920) !== 0) ||
          _la === 40 ||
          _la === 42 ||
          _la === 107 ||
          _la === 123
        ) {
          {
            {
              this.state = 639;
              this.ordinaryStatement();
            }
          }
          this.state = 644;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 645;
        this.returnStatement();
        this.state = 646;
        this.match(RefLangParser.END);
        this.state = 647;
        this.match(RefLangParser.FUNCTION);
        this.state = 648;
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
    this.enterRule(localContext, 80, RefLangParser.RULE_procedureMethod);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 651;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 107) {
          {
            this.state = 650;
            this.match(RefLangParser.GHOSTED);
          }
        }

        this.state = 654;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 32) {
          {
            this.state = 653;
            this.match(RefLangParser.PRIVATE);
          }
        }

        this.state = 656;
        this.match(RefLangParser.PROCEDURE);
        this.state = 657;
        this.methodName();
        this.state = 658;
        this.match(RefLangParser.OPEN_BRACKET);
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
        this.match(RefLangParser.CLOSE_BRACKET);
        this.state = 663;
        this.match(RefLangParser.NL);
        this.state = 667;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (
          ((_la & ~0x1f) === 0 && ((1 << _la) & 333920) !== 0) ||
          _la === 40 ||
          _la === 42 ||
          _la === 107 ||
          _la === 123
        ) {
          {
            {
              this.state = 664;
              this.ordinaryStatement();
            }
          }
          this.state = 669;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 670;
        this.match(RefLangParser.END);
        this.state = 671;
        this.match(RefLangParser.PROCEDURE);
        this.state = 672;
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
    this.enterRule(localContext, 82, RefLangParser.RULE_abstractFunction);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 675;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 107) {
          {
            this.state = 674;
            this.match(RefLangParser.GHOSTED);
          }
        }

        this.state = 677;
        this.match(RefLangParser.ABSTRACT);
        this.state = 678;
        this.match(RefLangParser.FUNCTION);
        this.state = 679;
        this.methodName();
        this.state = 680;
        this.match(RefLangParser.OPEN_BRACKET);
        this.state = 682;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 97) {
          {
            this.state = 681;
            this.paramList();
          }
        }

        this.state = 684;
        this.match(RefLangParser.CLOSE_BRACKET);
        this.state = 685;
        this.match(RefLangParser.RETURNS);
        this.state = 686;
        this.type_();
        this.state = 687;
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
    this.enterRule(localContext, 84, RefLangParser.RULE_abstractProcedure);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 690;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 107) {
          {
            this.state = 689;
            this.match(RefLangParser.GHOSTED);
          }
        }

        this.state = 692;
        this.match(RefLangParser.ABSTRACT);
        this.state = 693;
        this.match(RefLangParser.PROCEDURE);
        this.state = 694;
        this.methodName();
        this.state = 695;
        this.match(RefLangParser.OPEN_BRACKET);
        this.state = 697;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 97) {
          {
            this.state = 696;
            this.paramList();
          }
        }

        this.state = 699;
        this.match(RefLangParser.CLOSE_BRACKET);
        this.state = 700;
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
    this.enterRule(localContext, 86, RefLangParser.RULE_identifierDef);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 702;
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
    this.enterRule(localContext, 88, RefLangParser.RULE_identifierUse);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 704;
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
    let _startState = 90;
    this.enterRecursionRule(localContext, 90, RefLangParser.RULE_assignable, _p);
    try {
      let alternative: number;
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 711;
        this.errorHandler.sync(this);
        switch (this.tokenStream.LA(1)) {
          case RefLangParser.NAME_STARTING_LC:
            {
              localContext = new SimpleAssignableContext(localContext);
              this.context = localContext;
              previousContext = localContext;

              this.state = 707;
              this.identifierUse();
            }
            break;
          case RefLangParser.THIS_INSTANCE:
            {
              localContext = new ThisAssignableContext(localContext);
              this.context = localContext;
              previousContext = localContext;
              this.state = 708;
              this.match(RefLangParser.THIS_INSTANCE);
              this.state = 709;
              this.match(RefLangParser.DOT);
              this.state = 710;
              this.identifierUse();
            }
            break;
          default:
            throw new antlr.NoViableAltException(this);
        }
        this.context!.stop = this.tokenStream.LT(-1);
        this.state = 717;
        this.errorHandler.sync(this);
        alternative = this.interpreter.adaptivePredict(this.tokenStream, 73, this.context);
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
                  RefLangParser.RULE_assignable,
                );
                this.state = 713;
                if (!this.precpred(this.context, 1)) {
                  throw this.createFailedPredicateException("this.precpred(this.context, 1)");
                }
                this.state = 714;
                this.index();
              }
            }
          }
          this.state = 719;
          this.errorHandler.sync(this);
          alternative = this.interpreter.adaptivePredict(this.tokenStream, 73, this.context);
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
    this.enterRule(localContext, 92, RefLangParser.RULE_methodName);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 720;
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
    this.enterRule(localContext, 94, RefLangParser.RULE_testName);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 722;
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
    this.enterRule(localContext, 96, RefLangParser.RULE_typeName);
    try {
      this.state = 731;
      this.errorHandler.sync(this);
      switch (this.tokenStream.LA(1)) {
        case RefLangParser.INT_NAME:
          localContext = new IntTypeNameContext(localContext);
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 724;
            this.match(RefLangParser.INT_NAME);
          }
          break;
        case RefLangParser.FLOAT_NAME:
          localContext = new FloatTypeNameContext(localContext);
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 725;
            this.match(RefLangParser.FLOAT_NAME);
          }
          break;
        case RefLangParser.BOOL_NAME:
          localContext = new BoolTypeNameContext(localContext);
          this.enterOuterAlt(localContext, 3);
          {
            this.state = 726;
            this.match(RefLangParser.BOOL_NAME);
          }
          break;
        case RefLangParser.STRING_NAME:
          localContext = new StringTypeNameContext(localContext);
          this.enterOuterAlt(localContext, 4);
          {
            this.state = 727;
            this.match(RefLangParser.STRING_NAME);
          }
          break;
        case RefLangParser.LIST_NAME:
          localContext = new ListTypeNameContext(localContext);
          this.enterOuterAlt(localContext, 5);
          {
            this.state = 728;
            this.match(RefLangParser.LIST_NAME);
          }
          break;
        case RefLangParser.DICT_NAME:
          localContext = new DictTypeNameContext(localContext);
          this.enterOuterAlt(localContext, 6);
          {
            this.state = 729;
            this.match(RefLangParser.DICT_NAME);
          }
          break;
        case RefLangParser.NAME_STARTING_UC:
          localContext = new UdtTypeNameContext(localContext);
          this.enterOuterAlt(localContext, 7);
          {
            this.state = 730;
            this.match(RefLangParser.NAME_STARTING_UC);
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
    this.enterRule(localContext, 98, RefLangParser.RULE_constantValue);
    try {
      this.state = 737;
      this.errorHandler.sync(this);
      switch (this.tokenStream.LA(1)) {
        case RefLangParser.TRUE:
        case RefLangParser.FALSE:
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 733;
            this.litBoolean();
          }
          break;
        case RefLangParser.LITERAL_BINARY:
        case RefLangParser.LITERAL_HEX:
        case RefLangParser.LITERAL_INTEGER:
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 734;
            this.litInt();
          }
          break;
        case RefLangParser.LITERAL_FLOAT:
          this.enterOuterAlt(localContext, 3);
          {
            this.state = 735;
            this.litFloat();
          }
          break;
        case RefLangParser.LITERAL_STRING:
          this.enterOuterAlt(localContext, 4);
          {
            this.state = 736;
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
    this.enterRule(localContext, 100, RefLangParser.RULE_argList);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 739;
        this.argument();
        this.state = 744;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (_la === 83) {
          {
            {
              this.state = 740;
              this.match(RefLangParser.COMMA);
              this.state = 741;
              this.argument();
            }
          }
          this.state = 746;
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
    this.enterRule(localContext, 102, RefLangParser.RULE_argument);
    try {
      this.state = 749;
      this.errorHandler.sync(this);
      switch (this.tokenStream.LA(1)) {
        case RefLangParser.LAMBDA:
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 747;
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
        case RefLangParser.DICT_NAME:
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
        case RefLangParser.START_INTERPOLATED_STRING:
        case RefLangParser.LITERAL_STRING:
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 748;
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
    this.enterRule(localContext, 104, RefLangParser.RULE_paramList);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 751;
        this.paramDef();
        this.state = 756;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (_la === 83) {
          {
            {
              this.state = 752;
              this.match(RefLangParser.COMMA);
              this.state = 753;
              this.paramDef();
            }
          }
          this.state = 758;
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
    this.enterRule(localContext, 106, RefLangParser.RULE_identifierList);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 759;
        this.identifierDef();
        this.state = 762;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        do {
          {
            {
              this.state = 760;
              this.match(RefLangParser.COMMA);
              this.state = 761;
              this.identifierDef();
            }
          }
          this.state = 764;
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
    this.enterRule(localContext, 108, RefLangParser.RULE_expressionList);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 766;
        this.expression();
        this.state = 771;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (_la === 83) {
          {
            {
              this.state = 767;
              this.match(RefLangParser.COMMA);
              this.state = 768;
              this.expression();
            }
          }
          this.state = 773;
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
    this.enterRule(localContext, 110, RefLangParser.RULE_type);
    try {
      this.state = 778;
      this.errorHandler.sync(this);
      switch (this.interpreter.adaptivePredict(this.tokenStream, 81, this.context)) {
        case 1:
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 774;
            this.typeTuple();
          }
          break;
        case 2:
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 775;
            this.typeName();
          }
          break;
        case 3:
          this.enterOuterAlt(localContext, 3);
          {
            this.state = 776;
            this.typeGeneric();
          }
          break;
        case 4:
          this.enterOuterAlt(localContext, 4);
          {
            this.state = 777;
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
    this.enterRule(localContext, 112, RefLangParser.RULE_assertActual);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 780;
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
    this.enterRule(localContext, 114, RefLangParser.RULE_assertExpected);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 782;
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
    this.enterRule(localContext, 116, RefLangParser.RULE_litValue);
    try {
      this.state = 790;
      this.errorHandler.sync(this);
      switch (this.tokenStream.LA(1)) {
        case RefLangParser.TRUE:
        case RefLangParser.FALSE:
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 784;
            this.litBoolean();
          }
          break;
        case RefLangParser.LITERAL_BINARY:
        case RefLangParser.LITERAL_HEX:
        case RefLangParser.LITERAL_INTEGER:
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 785;
            this.litInt();
          }
          break;
        case RefLangParser.LITERAL_FLOAT:
          this.enterOuterAlt(localContext, 3);
          {
            this.state = 786;
            this.litFloat();
          }
          break;
        case RefLangParser.LITERAL_STRING:
          this.enterOuterAlt(localContext, 4);
          {
            this.state = 787;
            this.litString();
          }
          break;
        case RefLangParser.START_INTERPOLATED_STRING:
          this.enterOuterAlt(localContext, 5);
          {
            this.state = 788;
            this.interpolatedString();
          }
          break;
        case RefLangParser.INT_NAME:
        case RefLangParser.FLOAT_NAME:
        case RefLangParser.BOOL_NAME:
        case RefLangParser.STRING_NAME:
        case RefLangParser.LIST_NAME:
        case RefLangParser.DICT_NAME:
        case RefLangParser.NAME_STARTING_UC:
          this.enterOuterAlt(localContext, 6);
          {
            this.state = 789;
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
    this.enterRule(localContext, 118, RefLangParser.RULE_litBoolean);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 792;
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
    this.enterRule(localContext, 120, RefLangParser.RULE_litInt);
    try {
      this.state = 797;
      this.errorHandler.sync(this);
      switch (this.tokenStream.LA(1)) {
        case RefLangParser.LITERAL_INTEGER:
          localContext = new LitIntegerContext(localContext);
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 794;
            this.match(RefLangParser.LITERAL_INTEGER);
          }
          break;
        case RefLangParser.LITERAL_BINARY:
          localContext = new LitBinaryContext(localContext);
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 795;
            this.match(RefLangParser.LITERAL_BINARY);
          }
          break;
        case RefLangParser.LITERAL_HEX:
          localContext = new LitHexContext(localContext);
          this.enterOuterAlt(localContext, 3);
          {
            this.state = 796;
            this.match(RefLangParser.LITERAL_HEX);
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
    this.enterRule(localContext, 122, RefLangParser.RULE_litFloat);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 799;
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
    this.enterRule(localContext, 124, RefLangParser.RULE_litString);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 801;
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
  public interpolatedStringExpression(): InterpolatedStringExpressionContext {
    let localContext = new InterpolatedStringExpressionContext(this.context, this.state);
    this.enterRule(localContext, 126, RefLangParser.RULE_interpolatedStringExpression);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 803;
        this.match(RefLangParser.OPEN_BRACE);
        this.state = 804;
        this.expression();
        this.state = 805;
        this.match(RefLangParser.CLOSE_BRACE);
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
        this.errorHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localContext;
  }
  public segment(): SegmentContext {
    let localContext = new SegmentContext(this.context, this.state);
    this.enterRule(localContext, 128, RefLangParser.RULE_segment);
    try {
      this.state = 809;
      this.errorHandler.sync(this);
      switch (this.tokenStream.LA(1)) {
        case RefLangParser.Grapheme:
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 807;
            this.match(RefLangParser.Grapheme);
          }
          break;
        case RefLangParser.OPEN_BRACE:
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 808;
            this.interpolatedStringExpression();
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
  public interpolatedString(): InterpolatedStringContext {
    let localContext = new InterpolatedStringContext(this.context, this.state);
    this.enterRule(localContext, 130, RefLangParser.RULE_interpolatedString);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 811;
        this.match(RefLangParser.START_INTERPOLATED_STRING);
        this.state = 815;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (_la === 76 || _la === 124) {
          {
            {
              this.state = 812;
              this.segment();
            }
          }
          this.state = 817;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 818;
        this.match(RefLangParser.DOUBLE_QUOTES);
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
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
    this.enterRule(localContext, 132, RefLangParser.RULE_enumValue);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 820;
        this.typeName();
        this.state = 821;
        this.match(RefLangParser.DOT);
        this.state = 822;
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
    this.enterRule(localContext, 134, RefLangParser.RULE_index);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 824;
        this.match(RefLangParser.OPEN_SQ_BRACKET);
        this.state = 825;
        this.expression();
        this.state = 826;
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
    this.enterRule(localContext, 136, RefLangParser.RULE_expression);
    try {
      this.state = 841;
      this.errorHandler.sync(this);
      switch (this.interpreter.adaptivePredict(this.tokenStream, 86, this.context)) {
        case 1:
          localContext = new NewInstanceExpressionContext(localContext);
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 828;
            this.newInstance();
          }
          break;
        case 2:
          localContext = new UnaryExpressionLabelContext(localContext);
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 829;
            this.unaryExpression();
          }
          break;
        case 3:
          localContext = new TermExpressionContext(localContext);
          this.enterOuterAlt(localContext, 3);
          {
            this.state = 830;
            this.term(0);
          }
          break;
        case 4:
          localContext = new BinaryExpressionLabelContext(localContext);
          this.enterOuterAlt(localContext, 4);
          {
            this.state = 831;
            this.binaryExpression();
          }
          break;
        case 5:
          localContext = new IfExpressionContext(localContext);
          this.enterOuterAlt(localContext, 5);
          {
            this.state = 832;
            this.match(RefLangParser.IF_);
            this.state = 833;
            this.match(RefLangParser.OPEN_BRACKET);
            this.state = 834;
            (localContext as IfExpressionContext)._condition = this.expression();
            this.state = 835;
            this.match(RefLangParser.COMMA);
            this.state = 836;
            (localContext as IfExpressionContext)._trueExpr = this.expression();
            this.state = 837;
            this.match(RefLangParser.COMMA);
            this.state = 838;
            (localContext as IfExpressionContext)._falseExpr = this.expression();
            this.state = 839;
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
    let _startState = 138;
    this.enterRecursionRule(localContext, 138, RefLangParser.RULE_term, _p);
    try {
      let alternative: number;
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 852;
        this.errorHandler.sync(this);
        switch (this.interpreter.adaptivePredict(this.tokenStream, 87, this.context)) {
          case 1:
            {
              localContext = new ThisInstanceTermContext(localContext);
              this.context = localContext;
              previousContext = localContext;

              this.state = 844;
              this.thisInstance();
            }
            break;
          case 2:
            {
              localContext = new BracketedExpressionTermContext(localContext);
              this.context = localContext;
              previousContext = localContext;
              this.state = 845;
              this.bracketedExpression();
            }
            break;
          case 3:
            {
              localContext = new LitValueTermContext(localContext);
              this.context = localContext;
              previousContext = localContext;
              this.state = 846;
              this.litValue();
            }
            break;
          case 4:
            {
              localContext = new ListTermContext(localContext);
              this.context = localContext;
              previousContext = localContext;
              this.state = 847;
              this.list();
            }
            break;
          case 5:
            {
              localContext = new DictionaryTermContext(localContext);
              this.context = localContext;
              previousContext = localContext;
              this.state = 848;
              this.dictionary();
            }
            break;
          case 6:
            {
              localContext = new TupleTermContext(localContext);
              this.context = localContext;
              previousContext = localContext;
              this.state = 849;
              this.tuple();
            }
            break;
          case 7:
            {
              localContext = new IdentifierUseTermContext(localContext);
              this.context = localContext;
              previousContext = localContext;
              this.state = 850;
              this.identifierUse();
            }
            break;
          case 8:
            {
              localContext = new MethodCallTermContext(localContext);
              this.context = localContext;
              previousContext = localContext;
              this.state = 851;
              this.methodCall();
            }
            break;
        }
        this.context!.stop = this.tokenStream.LT(-1);
        this.state = 861;
        this.errorHandler.sync(this);
        alternative = this.interpreter.adaptivePredict(this.tokenStream, 89, this.context);
        while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
          if (alternative === 1) {
            if (this.parseListeners != null) {
              this.triggerExitRuleEvent();
            }
            previousContext = localContext;
            {
              this.state = 859;
              this.errorHandler.sync(this);
              switch (this.interpreter.adaptivePredict(this.tokenStream, 88, this.context)) {
                case 1:
                  {
                    localContext = new IndexedTermContext(
                      new TermContext(parentContext, parentState),
                    );
                    this.pushNewRecursionContext(
                      localContext,
                      _startState,
                      RefLangParser.RULE_term,
                    );
                    this.state = 854;
                    if (!this.precpred(this.context, 2)) {
                      throw this.createFailedPredicateException("this.precpred(this.context, 2)");
                    }
                    this.state = 855;
                    this.index();
                  }
                  break;
                case 2:
                  {
                    localContext = new ChainableTermContext(
                      new TermContext(parentContext, parentState),
                    );
                    this.pushNewRecursionContext(
                      localContext,
                      _startState,
                      RefLangParser.RULE_term,
                    );
                    this.state = 856;
                    if (!this.precpred(this.context, 1)) {
                      throw this.createFailedPredicateException("this.precpred(this.context, 1)");
                    }
                    this.state = 857;
                    this.match(RefLangParser.DOT);
                    this.state = 858;
                    this.chainable();
                  }
                  break;
              }
            }
          }
          this.state = 863;
          this.errorHandler.sync(this);
          alternative = this.interpreter.adaptivePredict(this.tokenStream, 89, this.context);
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
    this.enterRule(localContext, 140, RefLangParser.RULE_chainable);
    try {
      this.state = 866;
      this.errorHandler.sync(this);
      switch (this.interpreter.adaptivePredict(this.tokenStream, 90, this.context)) {
        case 1:
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 864;
            this.identifierUse();
          }
          break;
        case 2:
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 865;
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
    this.enterRule(localContext, 142, RefLangParser.RULE_thisInstance);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 868;
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
    this.enterRule(localContext, 144, RefLangParser.RULE_bracketedExpression);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 870;
        this.match(RefLangParser.OPEN_BRACKET);
        this.state = 871;
        this.expression();
        this.state = 872;
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
    this.enterRule(localContext, 146, RefLangParser.RULE_unaryExpression);
    try {
      this.state = 876;
      this.errorHandler.sync(this);
      switch (this.tokenStream.LA(1)) {
        case RefLangParser.MINUS:
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 874;
            this.negateNumeric();
          }
          break;
        case RefLangParser.NOT:
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
    this.enterRule(localContext, 148, RefLangParser.RULE_negateNumeric);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 878;
        this.match(RefLangParser.MINUS);
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
    this.enterRule(localContext, 150, RefLangParser.RULE_negateLogical);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 881;
        this.match(RefLangParser.NOT);
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
    this.enterRule(localContext, 152, RefLangParser.RULE_binaryExpression);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 884;
        localContext._left = this.term(0);
        this.state = 885;
        this.binaryOperator();
        this.state = 886;
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
    this.enterRule(localContext, 154, RefLangParser.RULE_list);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 888;
        this.match(RefLangParser.OPEN_SQ_BRACKET);
        this.state = 889;
        this.expressionList();
        this.state = 890;
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
    this.enterRule(localContext, 156, RefLangParser.RULE_tuple);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 892;
        this.match(RefLangParser.OPEN_BRACKET);
        this.state = 893;
        this.expressionList();
        this.state = 894;
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
    this.enterRule(localContext, 158, RefLangParser.RULE_dictionary);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 896;
        this.match(RefLangParser.OPEN_SQ_BRACKET);
        this.state = 897;
        this.kvpList();
        this.state = 898;
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
    this.enterRule(localContext, 160, RefLangParser.RULE_kvpList);
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
              this.match(RefLangParser.COMMA);
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
    this.enterRule(localContext, 162, RefLangParser.RULE_kvp);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 908;
        localContext._key = this.expression();
        this.state = 909;
        this.match(RefLangParser.COLON);
        this.state = 910;
        localContext._value = this.expression();
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
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
    this.enterRule(localContext, 164, RefLangParser.RULE_methodCall);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 912;
        this.methodName();
        this.state = 913;
        this.match(RefLangParser.OPEN_BRACKET);
        this.state = 915;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (
          ((_la & ~0x1f) === 0 && ((1 << _la) & 1073750272) !== 0) ||
          (((_la - 55) & ~0x1f) === 0 && ((1 << (_la - 55)) & 2189953471) !== 0) ||
          (((_la - 97) & ~0x1f) === 0 && ((1 << (_la - 97)) & 255) !== 0)
        ) {
          {
            this.state = 914;
            this.argList();
          }
        }

        this.state = 917;
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
    this.enterRule(localContext, 166, RefLangParser.RULE_binaryOperator);
    try {
      this.state = 933;
      this.errorHandler.sync(this);
      switch (this.tokenStream.LA(1)) {
        case RefLangParser.EQUAL:
          localContext = new OpEQUALContext(localContext);
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 919;
            this.match(RefLangParser.EQUAL);
          }
          break;
        case RefLangParser.NOT_EQUAL:
          localContext = new OpNOT_EQUALContext(localContext);
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 920;
            this.match(RefLangParser.NOT_EQUAL);
          }
          break;
        case RefLangParser.GT:
          localContext = new OpGTContext(localContext);
          this.enterOuterAlt(localContext, 3);
          {
            this.state = 921;
            this.match(RefLangParser.GT);
          }
          break;
        case RefLangParser.LT:
          localContext = new OpLTContext(localContext);
          this.enterOuterAlt(localContext, 4);
          {
            this.state = 922;
            this.match(RefLangParser.LT);
          }
          break;
        case RefLangParser.GE:
          localContext = new OpGEContext(localContext);
          this.enterOuterAlt(localContext, 5);
          {
            this.state = 923;
            this.match(RefLangParser.GE);
          }
          break;
        case RefLangParser.LE:
          localContext = new OpLEContext(localContext);
          this.enterOuterAlt(localContext, 6);
          {
            this.state = 924;
            this.match(RefLangParser.LE);
          }
          break;
        case RefLangParser.MULT:
          localContext = new OpMULTContext(localContext);
          this.enterOuterAlt(localContext, 7);
          {
            this.state = 925;
            this.match(RefLangParser.MULT);
          }
          break;
        case RefLangParser.DIVIDE:
          localContext = new OpDIVIDEContext(localContext);
          this.enterOuterAlt(localContext, 8);
          {
            this.state = 926;
            this.match(RefLangParser.DIVIDE);
          }
          break;
        case RefLangParser.PLUS:
          localContext = new OpPLUSContext(localContext);
          this.enterOuterAlt(localContext, 9);
          {
            this.state = 927;
            this.match(RefLangParser.PLUS);
          }
          break;
        case RefLangParser.MINUS:
          localContext = new OpMINUSContext(localContext);
          this.enterOuterAlt(localContext, 10);
          {
            this.state = 928;
            this.match(RefLangParser.MINUS);
          }
          break;
        case RefLangParser.AND:
          localContext = new OpANDContext(localContext);
          this.enterOuterAlt(localContext, 11);
          {
            this.state = 929;
            this.match(RefLangParser.AND);
          }
          break;
        case RefLangParser.OR:
          localContext = new OpORContext(localContext);
          this.enterOuterAlt(localContext, 12);
          {
            this.state = 930;
            this.match(RefLangParser.OR);
          }
          break;
        case RefLangParser.MOD:
          localContext = new OpMODContext(localContext);
          this.enterOuterAlt(localContext, 13);
          {
            this.state = 931;
            this.match(RefLangParser.MOD);
          }
          break;
        case RefLangParser.POWER:
          localContext = new OpPOWERContext(localContext);
          this.enterOuterAlt(localContext, 14);
          {
            this.state = 932;
            this.match(RefLangParser.POWER);
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
  public newInstance(): NewInstanceContext {
    let localContext = new NewInstanceContext(this.context, this.state);
    this.enterRule(localContext, 168, RefLangParser.RULE_newInstance);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 935;
        this.match(RefLangParser.NEW);
        this.state = 936;
        this.type_();
        this.state = 937;
        this.match(RefLangParser.OPEN_BRACKET);
        this.state = 939;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (
          ((_la & ~0x1f) === 0 && ((1 << _la) & 1073750272) !== 0) ||
          (((_la - 55) & ~0x1f) === 0 && ((1 << (_la - 55)) & 2189953471) !== 0) ||
          (((_la - 97) & ~0x1f) === 0 && ((1 << (_la - 97)) & 255) !== 0)
        ) {
          {
            this.state = 938;
            this.argList();
          }
        }

        this.state = 941;
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
    this.enterRule(localContext, 170, RefLangParser.RULE_paramDef);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 943;
        this.identifierDef();
        this.state = 944;
        this.match(RefLangParser.AS);
        this.state = 945;
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
    this.enterRule(localContext, 172, RefLangParser.RULE_typeGeneric);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 947;
        this.typeName();
        this.state = 948;
        this.match(RefLangParser.LT);
        this.state = 949;
        this.match(RefLangParser.OF);
        this.state = 950;
        this.type_();
        this.state = 955;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (_la === 83) {
          {
            {
              this.state = 951;
              this.match(RefLangParser.COMMA);
              this.state = 952;
              this.type_();
            }
          }
          this.state = 957;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 958;
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
    this.enterRule(localContext, 174, RefLangParser.RULE_typeFunc);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 960;
        this.match(RefLangParser.FUNC_NAME);
        this.state = 961;
        this.match(RefLangParser.LT);
        this.state = 962;
        this.match(RefLangParser.OF);
        this.state = 963;
        this.type_();
        this.state = 968;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (_la === 83) {
          {
            {
              this.state = 964;
              this.match(RefLangParser.COMMA);
              this.state = 965;
              this.type_();
            }
          }
          this.state = 970;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 971;
        this.match(RefLangParser.ARROW);
        this.state = 972;
        this.type_();
        this.state = 973;
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
    this.enterRule(localContext, 176, RefLangParser.RULE_typeTuple);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 975;
        this.match(RefLangParser.OPEN_BRACKET);
        this.state = 976;
        this.type_();
        this.state = 979;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        do {
          {
            {
              this.state = 977;
              this.match(RefLangParser.COMMA);
              this.state = 978;
              this.type_();
            }
          }
          this.state = 981;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        } while (_la === 83);
        this.state = 983;
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
    this.enterRule(localContext, 178, RefLangParser.RULE_lambda);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 985;
        this.match(RefLangParser.LAMBDA);
        this.state = 986;
        this.paramList();
        this.state = 987;
        this.match(RefLangParser.ARROW);
        this.state = 988;
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
      case 45:
        return this.assignable_sempred(localContext as AssignableContext, predIndex);
      case 69:
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
    4, 1, 126, 991, 2, 0, 7, 0, 2, 1, 7, 1, 2, 2, 7, 2, 2, 3, 7, 3, 2, 4, 7, 4, 2, 5, 7, 5, 2, 6, 7,
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
    7, 81, 2, 82, 7, 82, 2, 83, 7, 83, 2, 84, 7, 84, 2, 85, 7, 85, 2, 86, 7, 86, 2, 87, 7, 87, 2,
    88, 7, 88, 2, 89, 7, 89, 1, 0, 3, 0, 182, 8, 0, 1, 0, 5, 0, 185, 8, 0, 10, 0, 12, 0, 188, 9, 0,
    1, 0, 5, 0, 191, 8, 0, 10, 0, 12, 0, 194, 9, 0, 1, 0, 1, 0, 1, 1, 4, 1, 199, 8, 1, 11, 1, 12, 1,
    200, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 3, 2, 212, 8, 2, 1, 3, 3, 3, 215, 8,
    3, 1, 3, 1, 3, 1, 3, 5, 3, 220, 8, 3, 10, 3, 12, 3, 223, 9, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 4, 3,
    4, 230, 8, 4, 1, 4, 1, 4, 1, 4, 1, 4, 3, 4, 236, 8, 4, 1, 4, 1, 4, 1, 4, 1, 4, 1, 4, 5, 4, 243,
    8, 4, 10, 4, 12, 4, 246, 9, 4, 1, 4, 1, 4, 1, 4, 1, 4, 1, 4, 1, 5, 3, 5, 254, 8, 5, 1, 5, 1, 5,
    1, 5, 1, 5, 5, 5, 260, 8, 5, 10, 5, 12, 5, 263, 9, 5, 1, 5, 1, 5, 1, 5, 1, 5, 1, 6, 1, 6, 1, 6,
    3, 6, 272, 8, 6, 1, 7, 3, 7, 275, 8, 7, 1, 7, 1, 7, 1, 7, 1, 7, 3, 7, 281, 8, 7, 1, 7, 1, 7, 1,
    7, 5, 7, 286, 8, 7, 10, 7, 12, 7, 289, 9, 7, 1, 7, 1, 7, 1, 7, 1, 7, 1, 8, 3, 8, 296, 8, 8, 1,
    8, 1, 8, 1, 8, 1, 8, 1, 8, 1, 8, 1, 8, 1, 9, 3, 9, 306, 8, 9, 1, 9, 1, 9, 1, 9, 1, 9, 1, 9, 1,
    10, 3, 10, 314, 8, 10, 1, 10, 1, 10, 1, 10, 1, 10, 3, 10, 320, 8, 10, 1, 10, 1, 10, 1, 10, 5,
    10, 325, 8, 10, 10, 10, 12, 10, 328, 9, 10, 1, 10, 1, 10, 1, 10, 1, 10, 1, 11, 1, 11, 1, 11, 1,
    11, 3, 11, 338, 8, 11, 1, 12, 3, 12, 341, 8, 12, 1, 12, 1, 12, 1, 12, 1, 12, 1, 12, 3, 12, 348,
    8, 12, 1, 12, 1, 12, 5, 12, 352, 8, 12, 10, 12, 12, 12, 355, 9, 12, 1, 12, 1, 12, 1, 12, 1, 12,
    1, 13, 1, 13, 1, 13, 1, 13, 1, 13, 1, 13, 3, 13, 367, 8, 13, 1, 14, 3, 14, 370, 8, 14, 1, 14, 1,
    14, 1, 14, 1, 15, 1, 15, 1, 16, 4, 16, 378, 8, 16, 11, 16, 12, 16, 379, 1, 17, 1, 17, 1, 17, 1,
    17, 1, 17, 1, 17, 1, 17, 1, 17, 1, 17, 1, 17, 1, 17, 1, 17, 1, 17, 3, 17, 395, 8, 17, 1, 18, 1,
    18, 1, 18, 1, 18, 1, 18, 1, 18, 1, 18, 1, 18, 1, 18, 3, 18, 406, 8, 18, 1, 19, 3, 19, 409, 8,
    19, 1, 19, 1, 19, 1, 19, 1, 19, 1, 19, 1, 19, 1, 19, 1, 20, 3, 20, 419, 8, 20, 1, 20, 1, 20, 1,
    20, 1, 20, 1, 20, 1, 20, 1, 21, 3, 21, 428, 8, 21, 1, 21, 1, 21, 1, 21, 1, 21, 1, 21, 1, 21, 5,
    21, 436, 8, 21, 10, 21, 12, 21, 439, 9, 21, 1, 21, 3, 21, 442, 8, 21, 1, 21, 1, 21, 1, 21, 1,
    21, 1, 22, 5, 22, 449, 8, 22, 10, 22, 12, 22, 452, 9, 22, 1, 23, 3, 23, 455, 8, 23, 1, 23, 1,
    23, 1, 23, 1, 23, 1, 23, 5, 23, 462, 8, 23, 10, 23, 12, 23, 465, 9, 23, 1, 24, 3, 24, 468, 8,
    24, 1, 24, 1, 24, 1, 24, 5, 24, 473, 8, 24, 10, 24, 12, 24, 476, 9, 24, 1, 25, 3, 25, 479, 8,
    25, 1, 25, 1, 25, 1, 25, 1, 25, 5, 25, 485, 8, 25, 10, 25, 12, 25, 488, 9, 25, 1, 25, 1, 25, 1,
    25, 1, 25, 1, 26, 3, 26, 495, 8, 26, 1, 26, 1, 26, 1, 26, 1, 26, 1, 26, 1, 26, 5, 26, 503, 8,
    26, 10, 26, 12, 26, 506, 9, 26, 1, 26, 1, 26, 1, 26, 1, 26, 1, 27, 3, 27, 513, 8, 27, 1, 27, 1,
    27, 1, 27, 1, 27, 1, 28, 3, 28, 520, 8, 28, 1, 28, 1, 28, 1, 28, 1, 28, 4, 28, 526, 8, 28, 11,
    28, 12, 28, 527, 1, 28, 1, 28, 1, 28, 1, 28, 1, 29, 5, 29, 535, 8, 29, 10, 29, 12, 29, 538, 9,
    29, 1, 30, 3, 30, 541, 8, 30, 1, 30, 1, 30, 1, 30, 1, 30, 1, 30, 1, 30, 5, 30, 549, 8, 30, 10,
    30, 12, 30, 552, 9, 30, 1, 31, 3, 31, 555, 8, 31, 1, 31, 1, 31, 1, 31, 1, 31, 1, 31, 1, 32, 1,
    32, 3, 32, 564, 8, 32, 1, 33, 3, 33, 567, 8, 33, 1, 33, 1, 33, 1, 33, 1, 33, 1, 33, 1, 33, 1,
    33, 1, 34, 1, 34, 1, 34, 1, 34, 1, 35, 4, 35, 581, 8, 35, 11, 35, 12, 35, 582, 1, 36, 1, 36, 1,
    36, 1, 36, 1, 36, 3, 36, 590, 8, 36, 1, 37, 3, 37, 593, 8, 37, 1, 37, 1, 37, 1, 37, 3, 37, 598,
    8, 37, 1, 37, 1, 37, 1, 37, 5, 37, 603, 8, 37, 10, 37, 12, 37, 606, 9, 37, 1, 37, 1, 37, 1, 37,
    1, 37, 1, 38, 3, 38, 613, 8, 38, 1, 38, 3, 38, 616, 8, 38, 1, 38, 1, 38, 1, 38, 1, 38, 1, 38, 1,
    38, 1, 39, 3, 39, 625, 8, 39, 1, 39, 3, 39, 628, 8, 39, 1, 39, 1, 39, 1, 39, 1, 39, 3, 39, 634,
    8, 39, 1, 39, 1, 39, 1, 39, 1, 39, 1, 39, 5, 39, 641, 8, 39, 10, 39, 12, 39, 644, 9, 39, 1, 39,
    1, 39, 1, 39, 1, 39, 1, 39, 1, 40, 3, 40, 652, 8, 40, 1, 40, 3, 40, 655, 8, 40, 1, 40, 1, 40, 1,
    40, 1, 40, 3, 40, 661, 8, 40, 1, 40, 1, 40, 1, 40, 5, 40, 666, 8, 40, 10, 40, 12, 40, 669, 9,
    40, 1, 40, 1, 40, 1, 40, 1, 40, 1, 41, 3, 41, 676, 8, 41, 1, 41, 1, 41, 1, 41, 1, 41, 1, 41, 3,
    41, 683, 8, 41, 1, 41, 1, 41, 1, 41, 1, 41, 1, 41, 1, 42, 3, 42, 691, 8, 42, 1, 42, 1, 42, 1,
    42, 1, 42, 1, 42, 3, 42, 698, 8, 42, 1, 42, 1, 42, 1, 42, 1, 43, 1, 43, 1, 44, 1, 44, 1, 45, 1,
    45, 1, 45, 1, 45, 1, 45, 3, 45, 712, 8, 45, 1, 45, 1, 45, 5, 45, 716, 8, 45, 10, 45, 12, 45,
    719, 9, 45, 1, 46, 1, 46, 1, 47, 1, 47, 1, 48, 1, 48, 1, 48, 1, 48, 1, 48, 1, 48, 1, 48, 3, 48,
    732, 8, 48, 1, 49, 1, 49, 1, 49, 1, 49, 3, 49, 738, 8, 49, 1, 50, 1, 50, 1, 50, 5, 50, 743, 8,
    50, 10, 50, 12, 50, 746, 9, 50, 1, 51, 1, 51, 3, 51, 750, 8, 51, 1, 52, 1, 52, 1, 52, 5, 52,
    755, 8, 52, 10, 52, 12, 52, 758, 9, 52, 1, 53, 1, 53, 1, 53, 4, 53, 763, 8, 53, 11, 53, 12, 53,
    764, 1, 54, 1, 54, 1, 54, 5, 54, 770, 8, 54, 10, 54, 12, 54, 773, 9, 54, 1, 55, 1, 55, 1, 55, 1,
    55, 3, 55, 779, 8, 55, 1, 56, 1, 56, 1, 57, 1, 57, 1, 58, 1, 58, 1, 58, 1, 58, 1, 58, 1, 58, 3,
    58, 791, 8, 58, 1, 59, 1, 59, 1, 60, 1, 60, 1, 60, 3, 60, 798, 8, 60, 1, 61, 1, 61, 1, 62, 1,
    62, 1, 63, 1, 63, 1, 63, 1, 63, 1, 64, 1, 64, 3, 64, 810, 8, 64, 1, 65, 1, 65, 5, 65, 814, 8,
    65, 10, 65, 12, 65, 817, 9, 65, 1, 65, 1, 65, 1, 66, 1, 66, 1, 66, 1, 66, 1, 67, 1, 67, 1, 67,
    1, 67, 1, 68, 1, 68, 1, 68, 1, 68, 1, 68, 1, 68, 1, 68, 1, 68, 1, 68, 1, 68, 1, 68, 1, 68, 1,
    68, 3, 68, 842, 8, 68, 1, 69, 1, 69, 1, 69, 1, 69, 1, 69, 1, 69, 1, 69, 1, 69, 1, 69, 3, 69,
    853, 8, 69, 1, 69, 1, 69, 1, 69, 1, 69, 1, 69, 5, 69, 860, 8, 69, 10, 69, 12, 69, 863, 9, 69, 1,
    70, 1, 70, 3, 70, 867, 8, 70, 1, 71, 1, 71, 1, 72, 1, 72, 1, 72, 1, 72, 1, 73, 1, 73, 3, 73,
    877, 8, 73, 1, 74, 1, 74, 1, 74, 1, 75, 1, 75, 1, 75, 1, 76, 1, 76, 1, 76, 1, 76, 1, 77, 1, 77,
    1, 77, 1, 77, 1, 78, 1, 78, 1, 78, 1, 78, 1, 79, 1, 79, 1, 79, 1, 79, 1, 80, 1, 80, 1, 80, 5,
    80, 904, 8, 80, 10, 80, 12, 80, 907, 9, 80, 1, 81, 1, 81, 1, 81, 1, 81, 1, 82, 1, 82, 1, 82, 3,
    82, 916, 8, 82, 1, 82, 1, 82, 1, 83, 1, 83, 1, 83, 1, 83, 1, 83, 1, 83, 1, 83, 1, 83, 1, 83, 1,
    83, 1, 83, 1, 83, 1, 83, 1, 83, 3, 83, 934, 8, 83, 1, 84, 1, 84, 1, 84, 1, 84, 3, 84, 940, 8,
    84, 1, 84, 1, 84, 1, 85, 1, 85, 1, 85, 1, 85, 1, 86, 1, 86, 1, 86, 1, 86, 1, 86, 1, 86, 5, 86,
    954, 8, 86, 10, 86, 12, 86, 957, 9, 86, 1, 86, 1, 86, 1, 87, 1, 87, 1, 87, 1, 87, 1, 87, 1, 87,
    5, 87, 967, 8, 87, 10, 87, 12, 87, 970, 9, 87, 1, 87, 1, 87, 1, 87, 1, 87, 1, 88, 1, 88, 1, 88,
    1, 88, 4, 88, 980, 8, 88, 11, 88, 12, 88, 981, 1, 88, 1, 88, 1, 89, 1, 89, 1, 89, 1, 89, 1, 89,
    1, 89, 0, 2, 90, 138, 90, 0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36,
    38, 40, 42, 44, 46, 48, 50, 52, 54, 56, 58, 60, 62, 64, 66, 68, 70, 72, 74, 76, 78, 80, 82, 84,
    86, 88, 90, 92, 94, 96, 98, 100, 102, 104, 106, 108, 110, 112, 114, 116, 118, 120, 122, 124,
    126, 128, 130, 132, 134, 136, 138, 140, 142, 144, 146, 148, 150, 152, 154, 156, 158, 160, 162,
    164, 166, 168, 170, 172, 174, 176, 178, 0, 1, 1, 0, 62, 63, 1069, 0, 181, 1, 0, 0, 0, 2, 198, 1,
    0, 0, 0, 4, 211, 1, 0, 0, 0, 6, 214, 1, 0, 0, 0, 8, 229, 1, 0, 0, 0, 10, 253, 1, 0, 0, 0, 12,
    271, 1, 0, 0, 0, 14, 274, 1, 0, 0, 0, 16, 295, 1, 0, 0, 0, 18, 305, 1, 0, 0, 0, 20, 313, 1, 0,
    0, 0, 22, 337, 1, 0, 0, 0, 24, 340, 1, 0, 0, 0, 26, 366, 1, 0, 0, 0, 28, 369, 1, 0, 0, 0, 30,
    374, 1, 0, 0, 0, 32, 377, 1, 0, 0, 0, 34, 394, 1, 0, 0, 0, 36, 405, 1, 0, 0, 0, 38, 408, 1, 0,
    0, 0, 40, 418, 1, 0, 0, 0, 42, 427, 1, 0, 0, 0, 44, 450, 1, 0, 0, 0, 46, 454, 1, 0, 0, 0, 48,
    467, 1, 0, 0, 0, 50, 478, 1, 0, 0, 0, 52, 494, 1, 0, 0, 0, 54, 512, 1, 0, 0, 0, 56, 519, 1, 0,
    0, 0, 58, 536, 1, 0, 0, 0, 60, 540, 1, 0, 0, 0, 62, 554, 1, 0, 0, 0, 64, 563, 1, 0, 0, 0, 66,
    566, 1, 0, 0, 0, 68, 575, 1, 0, 0, 0, 70, 580, 1, 0, 0, 0, 72, 589, 1, 0, 0, 0, 74, 592, 1, 0,
    0, 0, 76, 612, 1, 0, 0, 0, 78, 624, 1, 0, 0, 0, 80, 651, 1, 0, 0, 0, 82, 675, 1, 0, 0, 0, 84,
    690, 1, 0, 0, 0, 86, 702, 1, 0, 0, 0, 88, 704, 1, 0, 0, 0, 90, 711, 1, 0, 0, 0, 92, 720, 1, 0,
    0, 0, 94, 722, 1, 0, 0, 0, 96, 731, 1, 0, 0, 0, 98, 737, 1, 0, 0, 0, 100, 739, 1, 0, 0, 0, 102,
    749, 1, 0, 0, 0, 104, 751, 1, 0, 0, 0, 106, 759, 1, 0, 0, 0, 108, 766, 1, 0, 0, 0, 110, 778, 1,
    0, 0, 0, 112, 780, 1, 0, 0, 0, 114, 782, 1, 0, 0, 0, 116, 790, 1, 0, 0, 0, 118, 792, 1, 0, 0, 0,
    120, 797, 1, 0, 0, 0, 122, 799, 1, 0, 0, 0, 124, 801, 1, 0, 0, 0, 126, 803, 1, 0, 0, 0, 128,
    809, 1, 0, 0, 0, 130, 811, 1, 0, 0, 0, 132, 820, 1, 0, 0, 0, 134, 824, 1, 0, 0, 0, 136, 841, 1,
    0, 0, 0, 138, 852, 1, 0, 0, 0, 140, 866, 1, 0, 0, 0, 142, 868, 1, 0, 0, 0, 144, 870, 1, 0, 0, 0,
    146, 876, 1, 0, 0, 0, 148, 878, 1, 0, 0, 0, 150, 881, 1, 0, 0, 0, 152, 884, 1, 0, 0, 0, 154,
    888, 1, 0, 0, 0, 156, 892, 1, 0, 0, 0, 158, 896, 1, 0, 0, 0, 160, 900, 1, 0, 0, 0, 162, 908, 1,
    0, 0, 0, 164, 912, 1, 0, 0, 0, 166, 933, 1, 0, 0, 0, 168, 935, 1, 0, 0, 0, 170, 943, 1, 0, 0, 0,
    172, 947, 1, 0, 0, 0, 174, 960, 1, 0, 0, 0, 176, 975, 1, 0, 0, 0, 178, 985, 1, 0, 0, 0, 180,
    182, 3, 28, 14, 0, 181, 180, 1, 0, 0, 0, 181, 182, 1, 0, 0, 0, 182, 186, 1, 0, 0, 0, 183, 185,
    3, 4, 2, 0, 184, 183, 1, 0, 0, 0, 185, 188, 1, 0, 0, 0, 186, 184, 1, 0, 0, 0, 186, 187, 1, 0, 0,
    0, 187, 192, 1, 0, 0, 0, 188, 186, 1, 0, 0, 0, 189, 191, 5, 95, 0, 0, 190, 189, 1, 0, 0, 0, 191,
    194, 1, 0, 0, 0, 192, 190, 1, 0, 0, 0, 192, 193, 1, 0, 0, 0, 193, 195, 1, 0, 0, 0, 194, 192, 1,
    0, 0, 0, 195, 196, 5, 0, 0, 1, 196, 1, 1, 0, 0, 0, 197, 199, 3, 4, 2, 0, 198, 197, 1, 0, 0, 0,
    199, 200, 1, 0, 0, 0, 200, 198, 1, 0, 0, 0, 200, 201, 1, 0, 0, 0, 201, 3, 1, 0, 0, 0, 202, 212,
    3, 6, 3, 0, 203, 212, 3, 8, 4, 0, 204, 212, 3, 10, 5, 0, 205, 212, 3, 14, 7, 0, 206, 212, 3, 16,
    8, 0, 207, 212, 3, 18, 9, 0, 208, 212, 3, 20, 10, 0, 209, 212, 3, 24, 12, 0, 210, 212, 3, 28,
    14, 0, 211, 202, 1, 0, 0, 0, 211, 203, 1, 0, 0, 0, 211, 204, 1, 0, 0, 0, 211, 205, 1, 0, 0, 0,
    211, 206, 1, 0, 0, 0, 211, 207, 1, 0, 0, 0, 211, 208, 1, 0, 0, 0, 211, 209, 1, 0, 0, 0, 211,
    210, 1, 0, 0, 0, 212, 5, 1, 0, 0, 0, 213, 215, 5, 107, 0, 0, 214, 213, 1, 0, 0, 0, 214, 215, 1,
    0, 0, 0, 215, 216, 1, 0, 0, 0, 216, 217, 5, 9, 0, 0, 217, 221, 5, 95, 0, 0, 218, 220, 3, 36, 18,
    0, 219, 218, 1, 0, 0, 0, 220, 223, 1, 0, 0, 0, 221, 219, 1, 0, 0, 0, 221, 222, 1, 0, 0, 0, 222,
    224, 1, 0, 0, 0, 223, 221, 1, 0, 0, 0, 224, 225, 5, 24, 0, 0, 225, 226, 5, 9, 0, 0, 226, 227, 5,
    95, 0, 0, 227, 7, 1, 0, 0, 0, 228, 230, 5, 107, 0, 0, 229, 228, 1, 0, 0, 0, 229, 230, 1, 0, 0,
    0, 230, 231, 1, 0, 0, 0, 231, 232, 5, 27, 0, 0, 232, 233, 3, 92, 46, 0, 233, 235, 5, 80, 0, 0,
    234, 236, 3, 104, 52, 0, 235, 234, 1, 0, 0, 0, 235, 236, 1, 0, 0, 0, 236, 237, 1, 0, 0, 0, 237,
    238, 5, 81, 0, 0, 238, 239, 5, 35, 0, 0, 239, 240, 3, 110, 55, 0, 240, 244, 5, 95, 0, 0, 241,
    243, 3, 36, 18, 0, 242, 241, 1, 0, 0, 0, 243, 246, 1, 0, 0, 0, 244, 242, 1, 0, 0, 0, 244, 245,
    1, 0, 0, 0, 245, 247, 1, 0, 0, 0, 246, 244, 1, 0, 0, 0, 247, 248, 3, 68, 34, 0, 248, 249, 5, 24,
    0, 0, 249, 250, 5, 27, 0, 0, 250, 251, 5, 95, 0, 0, 251, 9, 1, 0, 0, 0, 252, 254, 5, 107, 0, 0,
    253, 252, 1, 0, 0, 0, 253, 254, 1, 0, 0, 0, 254, 255, 1, 0, 0, 0, 255, 256, 5, 38, 0, 0, 256,
    257, 3, 94, 47, 0, 257, 261, 5, 95, 0, 0, 258, 260, 3, 12, 6, 0, 259, 258, 1, 0, 0, 0, 260, 263,
    1, 0, 0, 0, 261, 259, 1, 0, 0, 0, 261, 262, 1, 0, 0, 0, 262, 264, 1, 0, 0, 0, 263, 261, 1, 0, 0,
    0, 264, 265, 5, 24, 0, 0, 265, 266, 5, 38, 0, 0, 266, 267, 5, 95, 0, 0, 267, 11, 1, 0, 0, 0,
    268, 272, 3, 66, 33, 0, 269, 272, 3, 38, 19, 0, 270, 272, 3, 28, 14, 0, 271, 268, 1, 0, 0, 0,
    271, 269, 1, 0, 0, 0, 271, 270, 1, 0, 0, 0, 272, 13, 1, 0, 0, 0, 273, 275, 5, 107, 0, 0, 274,
    273, 1, 0, 0, 0, 274, 275, 1, 0, 0, 0, 275, 276, 1, 0, 0, 0, 276, 277, 5, 33, 0, 0, 277, 278, 3,
    92, 46, 0, 278, 280, 5, 80, 0, 0, 279, 281, 3, 104, 52, 0, 280, 279, 1, 0, 0, 0, 280, 281, 1, 0,
    0, 0, 281, 282, 1, 0, 0, 0, 282, 283, 5, 81, 0, 0, 283, 287, 5, 95, 0, 0, 284, 286, 3, 36, 18,
    0, 285, 284, 1, 0, 0, 0, 286, 289, 1, 0, 0, 0, 287, 285, 1, 0, 0, 0, 287, 288, 1, 0, 0, 0, 288,
    290, 1, 0, 0, 0, 289, 287, 1, 0, 0, 0, 290, 291, 5, 24, 0, 0, 291, 292, 5, 33, 0, 0, 292, 293,
    5, 95, 0, 0, 293, 15, 1, 0, 0, 0, 294, 296, 5, 107, 0, 0, 295, 294, 1, 0, 0, 0, 295, 296, 1, 0,
    0, 0, 296, 297, 1, 0, 0, 0, 297, 298, 5, 20, 0, 0, 298, 299, 3, 86, 43, 0, 299, 300, 5, 36, 0,
    0, 300, 301, 5, 41, 0, 0, 301, 302, 3, 98, 49, 0, 302, 303, 5, 95, 0, 0, 303, 17, 1, 0, 0, 0,
    304, 306, 5, 107, 0, 0, 305, 304, 1, 0, 0, 0, 305, 306, 1, 0, 0, 0, 306, 307, 1, 0, 0, 0, 307,
    308, 5, 4, 0, 0, 308, 309, 3, 96, 48, 0, 309, 310, 3, 106, 53, 0, 310, 311, 5, 95, 0, 0, 311,
    19, 1, 0, 0, 0, 312, 314, 5, 107, 0, 0, 313, 312, 1, 0, 0, 0, 313, 314, 1, 0, 0, 0, 314, 315, 1,
    0, 0, 0, 315, 316, 5, 1, 0, 0, 316, 319, 3, 96, 48, 0, 317, 318, 5, 28, 0, 0, 318, 320, 3, 96,
    48, 0, 319, 317, 1, 0, 0, 0, 319, 320, 1, 0, 0, 0, 320, 321, 1, 0, 0, 0, 321, 322, 5, 95, 0, 0,
    322, 326, 3, 74, 37, 0, 323, 325, 3, 22, 11, 0, 324, 323, 1, 0, 0, 0, 325, 328, 1, 0, 0, 0, 326,
    324, 1, 0, 0, 0, 326, 327, 1, 0, 0, 0, 327, 329, 1, 0, 0, 0, 328, 326, 1, 0, 0, 0, 329, 330, 5,
    24, 0, 0, 330, 331, 5, 1, 0, 0, 331, 332, 5, 95, 0, 0, 332, 21, 1, 0, 0, 0, 333, 338, 3, 76, 38,
    0, 334, 338, 3, 78, 39, 0, 335, 338, 3, 80, 40, 0, 336, 338, 3, 28, 14, 0, 337, 333, 1, 0, 0, 0,
    337, 334, 1, 0, 0, 0, 337, 335, 1, 0, 0, 0, 337, 336, 1, 0, 0, 0, 338, 23, 1, 0, 0, 0, 339, 341,
    5, 107, 0, 0, 340, 339, 1, 0, 0, 0, 340, 341, 1, 0, 0, 0, 341, 342, 1, 0, 0, 0, 342, 343, 5, 14,
    0, 0, 343, 344, 5, 1, 0, 0, 344, 347, 3, 96, 48, 0, 345, 346, 5, 28, 0, 0, 346, 348, 3, 96, 48,
    0, 347, 345, 1, 0, 0, 0, 347, 348, 1, 0, 0, 0, 348, 349, 1, 0, 0, 0, 349, 353, 5, 95, 0, 0, 350,
    352, 3, 26, 13, 0, 351, 350, 1, 0, 0, 0, 352, 355, 1, 0, 0, 0, 353, 351, 1, 0, 0, 0, 353, 354,
    1, 0, 0, 0, 354, 356, 1, 0, 0, 0, 355, 353, 1, 0, 0, 0, 356, 357, 5, 24, 0, 0, 357, 358, 5, 1,
    0, 0, 358, 359, 5, 95, 0, 0, 359, 25, 1, 0, 0, 0, 360, 367, 3, 76, 38, 0, 361, 367, 3, 78, 39,
    0, 362, 367, 3, 80, 40, 0, 363, 367, 3, 82, 41, 0, 364, 367, 3, 84, 42, 0, 365, 367, 3, 28, 14,
    0, 366, 360, 1, 0, 0, 0, 366, 361, 1, 0, 0, 0, 366, 362, 1, 0, 0, 0, 366, 363, 1, 0, 0, 0, 366,
    364, 1, 0, 0, 0, 366, 365, 1, 0, 0, 0, 367, 27, 1, 0, 0, 0, 368, 370, 5, 107, 0, 0, 369, 368, 1,
    0, 0, 0, 369, 370, 1, 0, 0, 0, 370, 371, 1, 0, 0, 0, 371, 372, 3, 30, 15, 0, 372, 373, 5, 95, 0,
    0, 373, 29, 1, 0, 0, 0, 374, 375, 5, 123, 0, 0, 375, 31, 1, 0, 0, 0, 376, 378, 3, 34, 17, 0,
    377, 376, 1, 0, 0, 0, 378, 379, 1, 0, 0, 0, 379, 377, 1, 0, 0, 0, 379, 380, 1, 0, 0, 0, 380, 33,
    1, 0, 0, 0, 381, 395, 3, 38, 19, 0, 382, 395, 3, 66, 33, 0, 383, 395, 3, 40, 20, 0, 384, 395, 3,
    42, 21, 0, 385, 395, 3, 46, 23, 0, 386, 395, 3, 48, 24, 0, 387, 395, 3, 50, 25, 0, 388, 395, 3,
    52, 26, 0, 389, 395, 3, 54, 27, 0, 390, 395, 3, 56, 28, 0, 391, 395, 3, 60, 30, 0, 392, 395, 3,
    62, 31, 0, 393, 395, 3, 28, 14, 0, 394, 381, 1, 0, 0, 0, 394, 382, 1, 0, 0, 0, 394, 383, 1, 0,
    0, 0, 394, 384, 1, 0, 0, 0, 394, 385, 1, 0, 0, 0, 394, 386, 1, 0, 0, 0, 394, 387, 1, 0, 0, 0,
    394, 388, 1, 0, 0, 0, 394, 389, 1, 0, 0, 0, 394, 390, 1, 0, 0, 0, 394, 391, 1, 0, 0, 0, 394,
    392, 1, 0, 0, 0, 394, 393, 1, 0, 0, 0, 395, 35, 1, 0, 0, 0, 396, 406, 3, 38, 19, 0, 397, 406, 3,
    40, 20, 0, 398, 406, 3, 42, 21, 0, 399, 406, 3, 50, 25, 0, 400, 406, 3, 52, 26, 0, 401, 406, 3,
    54, 27, 0, 402, 406, 3, 56, 28, 0, 403, 406, 3, 62, 31, 0, 404, 406, 3, 28, 14, 0, 405, 396, 1,
    0, 0, 0, 405, 397, 1, 0, 0, 0, 405, 398, 1, 0, 0, 0, 405, 399, 1, 0, 0, 0, 405, 400, 1, 0, 0, 0,
    405, 401, 1, 0, 0, 0, 405, 402, 1, 0, 0, 0, 405, 403, 1, 0, 0, 0, 405, 404, 1, 0, 0, 0, 406, 37,
    1, 0, 0, 0, 407, 409, 5, 107, 0, 0, 408, 407, 1, 0, 0, 0, 408, 409, 1, 0, 0, 0, 409, 410, 1, 0,
    0, 0, 410, 411, 5, 42, 0, 0, 411, 412, 3, 86, 43, 0, 412, 413, 5, 36, 0, 0, 413, 414, 5, 41, 0,
    0, 414, 415, 3, 136, 68, 0, 415, 416, 5, 95, 0, 0, 416, 39, 1, 0, 0, 0, 417, 419, 5, 107, 0, 0,
    418, 417, 1, 0, 0, 0, 418, 419, 1, 0, 0, 0, 419, 420, 1, 0, 0, 0, 420, 421, 5, 16, 0, 0, 421,
    422, 3, 90, 45, 0, 422, 423, 5, 41, 0, 0, 423, 424, 3, 136, 68, 0, 424, 425, 5, 95, 0, 0, 425,
    41, 1, 0, 0, 0, 426, 428, 5, 107, 0, 0, 427, 426, 1, 0, 0, 0, 427, 428, 1, 0, 0, 0, 428, 429, 1,
    0, 0, 0, 429, 430, 5, 6, 0, 0, 430, 431, 3, 136, 68, 0, 431, 432, 5, 39, 0, 0, 432, 433, 5, 95,
    0, 0, 433, 437, 3, 44, 22, 0, 434, 436, 3, 46, 23, 0, 435, 434, 1, 0, 0, 0, 436, 439, 1, 0, 0,
    0, 437, 435, 1, 0, 0, 0, 437, 438, 1, 0, 0, 0, 438, 441, 1, 0, 0, 0, 439, 437, 1, 0, 0, 0, 440,
    442, 3, 48, 24, 0, 441, 440, 1, 0, 0, 0, 441, 442, 1, 0, 0, 0, 442, 443, 1, 0, 0, 0, 443, 444,
    5, 24, 0, 0, 444, 445, 5, 6, 0, 0, 445, 446, 5, 95, 0, 0, 446, 43, 1, 0, 0, 0, 447, 449, 3, 36,
    18, 0, 448, 447, 1, 0, 0, 0, 449, 452, 1, 0, 0, 0, 450, 448, 1, 0, 0, 0, 450, 451, 1, 0, 0, 0,
    451, 45, 1, 0, 0, 0, 452, 450, 1, 0, 0, 0, 453, 455, 5, 107, 0, 0, 454, 453, 1, 0, 0, 0, 454,
    455, 1, 0, 0, 0, 455, 456, 1, 0, 0, 0, 456, 457, 5, 2, 0, 0, 457, 458, 3, 136, 68, 0, 458, 459,
    5, 39, 0, 0, 459, 463, 5, 95, 0, 0, 460, 462, 3, 36, 18, 0, 461, 460, 1, 0, 0, 0, 462, 465, 1,
    0, 0, 0, 463, 461, 1, 0, 0, 0, 463, 464, 1, 0, 0, 0, 464, 47, 1, 0, 0, 0, 465, 463, 1, 0, 0, 0,
    466, 468, 5, 107, 0, 0, 467, 466, 1, 0, 0, 0, 467, 468, 1, 0, 0, 0, 468, 469, 1, 0, 0, 0, 469,
    470, 5, 3, 0, 0, 470, 474, 5, 95, 0, 0, 471, 473, 3, 36, 18, 0, 472, 471, 1, 0, 0, 0, 473, 476,
    1, 0, 0, 0, 474, 472, 1, 0, 0, 0, 474, 475, 1, 0, 0, 0, 475, 49, 1, 0, 0, 0, 476, 474, 1, 0, 0,
    0, 477, 479, 5, 107, 0, 0, 478, 477, 1, 0, 0, 0, 478, 479, 1, 0, 0, 0, 479, 480, 1, 0, 0, 0,
    480, 481, 5, 12, 0, 0, 481, 482, 3, 136, 68, 0, 482, 486, 5, 95, 0, 0, 483, 485, 3, 36, 18, 0,
    484, 483, 1, 0, 0, 0, 485, 488, 1, 0, 0, 0, 486, 484, 1, 0, 0, 0, 486, 487, 1, 0, 0, 0, 487,
    489, 1, 0, 0, 0, 488, 486, 1, 0, 0, 0, 489, 490, 5, 24, 0, 0, 490, 491, 5, 12, 0, 0, 491, 492,
    5, 95, 0, 0, 492, 51, 1, 0, 0, 0, 493, 495, 5, 107, 0, 0, 494, 493, 1, 0, 0, 0, 494, 495, 1, 0,
    0, 0, 495, 496, 1, 0, 0, 0, 496, 497, 5, 5, 0, 0, 497, 498, 3, 86, 43, 0, 498, 499, 5, 7, 0, 0,
    499, 500, 3, 136, 68, 0, 500, 504, 5, 95, 0, 0, 501, 503, 3, 36, 18, 0, 502, 501, 1, 0, 0, 0,
    503, 506, 1, 0, 0, 0, 504, 502, 1, 0, 0, 0, 504, 505, 1, 0, 0, 0, 505, 507, 1, 0, 0, 0, 506,
    504, 1, 0, 0, 0, 507, 508, 5, 24, 0, 0, 508, 509, 5, 5, 0, 0, 509, 510, 5, 95, 0, 0, 510, 53, 1,
    0, 0, 0, 511, 513, 5, 107, 0, 0, 512, 511, 1, 0, 0, 0, 512, 513, 1, 0, 0, 0, 513, 514, 1, 0, 0,
    0, 514, 515, 5, 18, 0, 0, 515, 516, 3, 138, 69, 0, 516, 517, 5, 95, 0, 0, 517, 55, 1, 0, 0, 0,
    518, 520, 5, 107, 0, 0, 519, 518, 1, 0, 0, 0, 519, 520, 1, 0, 0, 0, 520, 521, 1, 0, 0, 0, 521,
    522, 5, 11, 0, 0, 522, 523, 5, 95, 0, 0, 523, 525, 3, 58, 29, 0, 524, 526, 3, 60, 30, 0, 525,
    524, 1, 0, 0, 0, 526, 527, 1, 0, 0, 0, 527, 525, 1, 0, 0, 0, 527, 528, 1, 0, 0, 0, 528, 529, 1,
    0, 0, 0, 529, 530, 5, 24, 0, 0, 530, 531, 5, 11, 0, 0, 531, 532, 5, 95, 0, 0, 532, 57, 1, 0, 0,
    0, 533, 535, 3, 36, 18, 0, 534, 533, 1, 0, 0, 0, 535, 538, 1, 0, 0, 0, 536, 534, 1, 0, 0, 0,
    536, 537, 1, 0, 0, 0, 537, 59, 1, 0, 0, 0, 538, 536, 1, 0, 0, 0, 539, 541, 5, 107, 0, 0, 540,
    539, 1, 0, 0, 0, 540, 541, 1, 0, 0, 0, 541, 542, 1, 0, 0, 0, 542, 543, 5, 19, 0, 0, 543, 544, 3,
    86, 43, 0, 544, 545, 5, 45, 0, 0, 545, 546, 3, 96, 48, 0, 546, 550, 5, 95, 0, 0, 547, 549, 3,
    36, 18, 0, 548, 547, 1, 0, 0, 0, 549, 552, 1, 0, 0, 0, 550, 548, 1, 0, 0, 0, 550, 551, 1, 0, 0,
    0, 551, 61, 1, 0, 0, 0, 552, 550, 1, 0, 0, 0, 553, 555, 5, 107, 0, 0, 554, 553, 1, 0, 0, 0, 554,
    555, 1, 0, 0, 0, 555, 556, 1, 0, 0, 0, 556, 557, 5, 40, 0, 0, 557, 558, 3, 96, 48, 0, 558, 559,
    3, 64, 32, 0, 559, 560, 5, 95, 0, 0, 560, 63, 1, 0, 0, 0, 561, 564, 3, 124, 62, 0, 562, 564, 3,
    88, 44, 0, 563, 561, 1, 0, 0, 0, 563, 562, 1, 0, 0, 0, 564, 65, 1, 0, 0, 0, 565, 567, 5, 107, 0,
    0, 566, 565, 1, 0, 0, 0, 566, 567, 1, 0, 0, 0, 567, 568, 1, 0, 0, 0, 568, 569, 5, 15, 0, 0, 569,
    570, 3, 112, 56, 0, 570, 571, 5, 25, 0, 0, 571, 572, 5, 41, 0, 0, 572, 573, 3, 114, 57, 0, 573,
    574, 5, 95, 0, 0, 574, 67, 1, 0, 0, 0, 575, 576, 5, 10, 0, 0, 576, 577, 3, 136, 68, 0, 577, 578,
    5, 95, 0, 0, 578, 69, 1, 0, 0, 0, 579, 581, 3, 72, 36, 0, 580, 579, 1, 0, 0, 0, 581, 582, 1, 0,
    0, 0, 582, 580, 1, 0, 0, 0, 582, 583, 1, 0, 0, 0, 583, 71, 1, 0, 0, 0, 584, 590, 3, 76, 38, 0,
    585, 590, 3, 78, 39, 0, 586, 590, 3, 80, 40, 0, 587, 590, 3, 82, 41, 0, 588, 590, 3, 84, 42, 0,
    589, 584, 1, 0, 0, 0, 589, 585, 1, 0, 0, 0, 589, 586, 1, 0, 0, 0, 589, 587, 1, 0, 0, 0, 589,
    588, 1, 0, 0, 0, 590, 73, 1, 0, 0, 0, 591, 593, 5, 107, 0, 0, 592, 591, 1, 0, 0, 0, 592, 593, 1,
    0, 0, 0, 593, 594, 1, 0, 0, 0, 594, 595, 5, 21, 0, 0, 595, 597, 5, 80, 0, 0, 596, 598, 3, 104,
    52, 0, 597, 596, 1, 0, 0, 0, 597, 598, 1, 0, 0, 0, 598, 599, 1, 0, 0, 0, 599, 600, 5, 81, 0, 0,
    600, 604, 5, 95, 0, 0, 601, 603, 3, 36, 18, 0, 602, 601, 1, 0, 0, 0, 603, 606, 1, 0, 0, 0, 604,
    602, 1, 0, 0, 0, 604, 605, 1, 0, 0, 0, 605, 607, 1, 0, 0, 0, 606, 604, 1, 0, 0, 0, 607, 608, 5,
    24, 0, 0, 608, 609, 5, 21, 0, 0, 609, 610, 5, 95, 0, 0, 610, 75, 1, 0, 0, 0, 611, 613, 5, 107,
    0, 0, 612, 611, 1, 0, 0, 0, 612, 613, 1, 0, 0, 0, 613, 615, 1, 0, 0, 0, 614, 616, 5, 32, 0, 0,
    615, 614, 1, 0, 0, 0, 615, 616, 1, 0, 0, 0, 616, 617, 1, 0, 0, 0, 617, 618, 5, 34, 0, 0, 618,
    619, 3, 86, 43, 0, 619, 620, 5, 45, 0, 0, 620, 621, 3, 110, 55, 0, 621, 622, 5, 95, 0, 0, 622,
    77, 1, 0, 0, 0, 623, 625, 5, 107, 0, 0, 624, 623, 1, 0, 0, 0, 624, 625, 1, 0, 0, 0, 625, 627, 1,
    0, 0, 0, 626, 628, 5, 32, 0, 0, 627, 626, 1, 0, 0, 0, 627, 628, 1, 0, 0, 0, 628, 629, 1, 0, 0,
    0, 629, 630, 5, 27, 0, 0, 630, 631, 3, 92, 46, 0, 631, 633, 5, 80, 0, 0, 632, 634, 3, 104, 52,
    0, 633, 632, 1, 0, 0, 0, 633, 634, 1, 0, 0, 0, 634, 635, 1, 0, 0, 0, 635, 636, 5, 81, 0, 0, 636,
    637, 5, 35, 0, 0, 637, 638, 3, 110, 55, 0, 638, 642, 5, 95, 0, 0, 639, 641, 3, 36, 18, 0, 640,
    639, 1, 0, 0, 0, 641, 644, 1, 0, 0, 0, 642, 640, 1, 0, 0, 0, 642, 643, 1, 0, 0, 0, 643, 645, 1,
    0, 0, 0, 644, 642, 1, 0, 0, 0, 645, 646, 3, 68, 34, 0, 646, 647, 5, 24, 0, 0, 647, 648, 5, 27,
    0, 0, 648, 649, 5, 95, 0, 0, 649, 79, 1, 0, 0, 0, 650, 652, 5, 107, 0, 0, 651, 650, 1, 0, 0, 0,
    651, 652, 1, 0, 0, 0, 652, 654, 1, 0, 0, 0, 653, 655, 5, 32, 0, 0, 654, 653, 1, 0, 0, 0, 654,
    655, 1, 0, 0, 0, 655, 656, 1, 0, 0, 0, 656, 657, 5, 33, 0, 0, 657, 658, 3, 92, 46, 0, 658, 660,
    5, 80, 0, 0, 659, 661, 3, 104, 52, 0, 660, 659, 1, 0, 0, 0, 660, 661, 1, 0, 0, 0, 661, 662, 1,
    0, 0, 0, 662, 663, 5, 81, 0, 0, 663, 667, 5, 95, 0, 0, 664, 666, 3, 36, 18, 0, 665, 664, 1, 0,
    0, 0, 666, 669, 1, 0, 0, 0, 667, 665, 1, 0, 0, 0, 667, 668, 1, 0, 0, 0, 668, 670, 1, 0, 0, 0,
    669, 667, 1, 0, 0, 0, 670, 671, 5, 24, 0, 0, 671, 672, 5, 33, 0, 0, 672, 673, 5, 95, 0, 0, 673,
    81, 1, 0, 0, 0, 674, 676, 5, 107, 0, 0, 675, 674, 1, 0, 0, 0, 675, 676, 1, 0, 0, 0, 676, 677, 1,
    0, 0, 0, 677, 678, 5, 14, 0, 0, 678, 679, 5, 27, 0, 0, 679, 680, 3, 92, 46, 0, 680, 682, 5, 80,
    0, 0, 681, 683, 3, 104, 52, 0, 682, 681, 1, 0, 0, 0, 682, 683, 1, 0, 0, 0, 683, 684, 1, 0, 0, 0,
    684, 685, 5, 81, 0, 0, 685, 686, 5, 35, 0, 0, 686, 687, 3, 110, 55, 0, 687, 688, 5, 95, 0, 0,
    688, 83, 1, 0, 0, 0, 689, 691, 5, 107, 0, 0, 690, 689, 1, 0, 0, 0, 690, 691, 1, 0, 0, 0, 691,
    692, 1, 0, 0, 0, 692, 693, 5, 14, 0, 0, 693, 694, 5, 33, 0, 0, 694, 695, 3, 92, 46, 0, 695, 697,
    5, 80, 0, 0, 696, 698, 3, 104, 52, 0, 697, 696, 1, 0, 0, 0, 697, 698, 1, 0, 0, 0, 698, 699, 1,
    0, 0, 0, 699, 700, 5, 81, 0, 0, 700, 701, 5, 95, 0, 0, 701, 85, 1, 0, 0, 0, 702, 703, 5, 97, 0,
    0, 703, 87, 1, 0, 0, 0, 704, 705, 5, 97, 0, 0, 705, 89, 1, 0, 0, 0, 706, 707, 6, 45, -1, 0, 707,
    712, 3, 88, 44, 0, 708, 709, 5, 74, 0, 0, 709, 710, 5, 82, 0, 0, 710, 712, 3, 88, 44, 0, 711,
    706, 1, 0, 0, 0, 711, 708, 1, 0, 0, 0, 712, 717, 1, 0, 0, 0, 713, 714, 10, 1, 0, 0, 714, 716, 3,
    134, 67, 0, 715, 713, 1, 0, 0, 0, 716, 719, 1, 0, 0, 0, 717, 715, 1, 0, 0, 0, 717, 718, 1, 0, 0,
    0, 718, 91, 1, 0, 0, 0, 719, 717, 1, 0, 0, 0, 720, 721, 5, 97, 0, 0, 721, 93, 1, 0, 0, 0, 722,
    723, 5, 96, 0, 0, 723, 95, 1, 0, 0, 0, 724, 732, 5, 55, 0, 0, 725, 732, 5, 56, 0, 0, 726, 732,
    5, 57, 0, 0, 727, 732, 5, 58, 0, 0, 728, 732, 5, 59, 0, 0, 729, 732, 5, 60, 0, 0, 730, 732, 5,
    98, 0, 0, 731, 724, 1, 0, 0, 0, 731, 725, 1, 0, 0, 0, 731, 726, 1, 0, 0, 0, 731, 727, 1, 0, 0,
    0, 731, 728, 1, 0, 0, 0, 731, 729, 1, 0, 0, 0, 731, 730, 1, 0, 0, 0, 732, 97, 1, 0, 0, 0, 733,
    738, 3, 118, 59, 0, 734, 738, 3, 120, 60, 0, 735, 738, 3, 122, 61, 0, 736, 738, 3, 124, 62, 0,
    737, 733, 1, 0, 0, 0, 737, 734, 1, 0, 0, 0, 737, 735, 1, 0, 0, 0, 737, 736, 1, 0, 0, 0, 738, 99,
    1, 0, 0, 0, 739, 744, 3, 102, 51, 0, 740, 741, 5, 83, 0, 0, 741, 743, 3, 102, 51, 0, 742, 740,
    1, 0, 0, 0, 743, 746, 1, 0, 0, 0, 744, 742, 1, 0, 0, 0, 744, 745, 1, 0, 0, 0, 745, 101, 1, 0, 0,
    0, 746, 744, 1, 0, 0, 0, 747, 750, 3, 178, 89, 0, 748, 750, 3, 136, 68, 0, 749, 747, 1, 0, 0, 0,
    749, 748, 1, 0, 0, 0, 750, 103, 1, 0, 0, 0, 751, 756, 3, 170, 85, 0, 752, 753, 5, 83, 0, 0, 753,
    755, 3, 170, 85, 0, 754, 752, 1, 0, 0, 0, 755, 758, 1, 0, 0, 0, 756, 754, 1, 0, 0, 0, 756, 757,
    1, 0, 0, 0, 757, 105, 1, 0, 0, 0, 758, 756, 1, 0, 0, 0, 759, 762, 3, 86, 43, 0, 760, 761, 5, 83,
    0, 0, 761, 763, 3, 86, 43, 0, 762, 760, 1, 0, 0, 0, 763, 764, 1, 0, 0, 0, 764, 762, 1, 0, 0, 0,
    764, 765, 1, 0, 0, 0, 765, 107, 1, 0, 0, 0, 766, 771, 3, 136, 68, 0, 767, 768, 5, 83, 0, 0, 768,
    770, 3, 136, 68, 0, 769, 767, 1, 0, 0, 0, 770, 773, 1, 0, 0, 0, 771, 769, 1, 0, 0, 0, 771, 772,
    1, 0, 0, 0, 772, 109, 1, 0, 0, 0, 773, 771, 1, 0, 0, 0, 774, 779, 3, 176, 88, 0, 775, 779, 3,
    96, 48, 0, 776, 779, 3, 172, 86, 0, 777, 779, 3, 174, 87, 0, 778, 774, 1, 0, 0, 0, 778, 775, 1,
    0, 0, 0, 778, 776, 1, 0, 0, 0, 778, 777, 1, 0, 0, 0, 779, 111, 1, 0, 0, 0, 780, 781, 3, 136, 68,
    0, 781, 113, 1, 0, 0, 0, 782, 783, 3, 136, 68, 0, 783, 115, 1, 0, 0, 0, 784, 791, 3, 118, 59, 0,
    785, 791, 3, 120, 60, 0, 786, 791, 3, 122, 61, 0, 787, 791, 3, 124, 62, 0, 788, 791, 3, 130, 65,
    0, 789, 791, 3, 132, 66, 0, 790, 784, 1, 0, 0, 0, 790, 785, 1, 0, 0, 0, 790, 786, 1, 0, 0, 0,
    790, 787, 1, 0, 0, 0, 790, 788, 1, 0, 0, 0, 790, 789, 1, 0, 0, 0, 791, 117, 1, 0, 0, 0, 792,
    793, 7, 0, 0, 0, 793, 119, 1, 0, 0, 0, 794, 798, 5, 101, 0, 0, 795, 798, 5, 99, 0, 0, 796, 798,
    5, 100, 0, 0, 797, 794, 1, 0, 0, 0, 797, 795, 1, 0, 0, 0, 797, 796, 1, 0, 0, 0, 798, 121, 1, 0,
    0, 0, 799, 800, 5, 102, 0, 0, 800, 123, 1, 0, 0, 0, 801, 802, 5, 104, 0, 0, 802, 125, 1, 0, 0,
    0, 803, 804, 5, 76, 0, 0, 804, 805, 3, 136, 68, 0, 805, 806, 5, 77, 0, 0, 806, 127, 1, 0, 0, 0,
    807, 810, 5, 124, 0, 0, 808, 810, 3, 126, 63, 0, 809, 807, 1, 0, 0, 0, 809, 808, 1, 0, 0, 0,
    810, 129, 1, 0, 0, 0, 811, 815, 5, 103, 0, 0, 812, 814, 3, 128, 64, 0, 813, 812, 1, 0, 0, 0,
    814, 817, 1, 0, 0, 0, 815, 813, 1, 0, 0, 0, 815, 816, 1, 0, 0, 0, 816, 818, 1, 0, 0, 0, 817,
    815, 1, 0, 0, 0, 818, 819, 5, 93, 0, 0, 819, 131, 1, 0, 0, 0, 820, 821, 3, 96, 48, 0, 821, 822,
    5, 82, 0, 0, 822, 823, 3, 88, 44, 0, 823, 133, 1, 0, 0, 0, 824, 825, 5, 78, 0, 0, 825, 826, 3,
    136, 68, 0, 826, 827, 5, 79, 0, 0, 827, 135, 1, 0, 0, 0, 828, 842, 3, 168, 84, 0, 829, 842, 3,
    146, 73, 0, 830, 842, 3, 138, 69, 0, 831, 842, 3, 152, 76, 0, 832, 833, 5, 13, 0, 0, 833, 834,
    5, 80, 0, 0, 834, 835, 3, 136, 68, 0, 835, 836, 5, 83, 0, 0, 836, 837, 3, 136, 68, 0, 837, 838,
    5, 83, 0, 0, 838, 839, 3, 136, 68, 0, 839, 840, 5, 81, 0, 0, 840, 842, 1, 0, 0, 0, 841, 828, 1,
    0, 0, 0, 841, 829, 1, 0, 0, 0, 841, 830, 1, 0, 0, 0, 841, 831, 1, 0, 0, 0, 841, 832, 1, 0, 0, 0,
    842, 137, 1, 0, 0, 0, 843, 844, 6, 69, -1, 0, 844, 853, 3, 142, 71, 0, 845, 853, 3, 144, 72, 0,
    846, 853, 3, 116, 58, 0, 847, 853, 3, 154, 77, 0, 848, 853, 3, 158, 79, 0, 849, 853, 3, 156, 78,
    0, 850, 853, 3, 88, 44, 0, 851, 853, 3, 164, 82, 0, 852, 843, 1, 0, 0, 0, 852, 845, 1, 0, 0, 0,
    852, 846, 1, 0, 0, 0, 852, 847, 1, 0, 0, 0, 852, 848, 1, 0, 0, 0, 852, 849, 1, 0, 0, 0, 852,
    850, 1, 0, 0, 0, 852, 851, 1, 0, 0, 0, 853, 861, 1, 0, 0, 0, 854, 855, 10, 2, 0, 0, 855, 860, 3,
    134, 67, 0, 856, 857, 10, 1, 0, 0, 857, 858, 5, 82, 0, 0, 858, 860, 3, 140, 70, 0, 859, 854, 1,
    0, 0, 0, 859, 856, 1, 0, 0, 0, 860, 863, 1, 0, 0, 0, 861, 859, 1, 0, 0, 0, 861, 862, 1, 0, 0, 0,
    862, 139, 1, 0, 0, 0, 863, 861, 1, 0, 0, 0, 864, 867, 3, 88, 44, 0, 865, 867, 3, 164, 82, 0,
    866, 864, 1, 0, 0, 0, 866, 865, 1, 0, 0, 0, 867, 141, 1, 0, 0, 0, 868, 869, 5, 74, 0, 0, 869,
    143, 1, 0, 0, 0, 870, 871, 5, 80, 0, 0, 871, 872, 3, 136, 68, 0, 872, 873, 5, 81, 0, 0, 873,
    145, 1, 0, 0, 0, 874, 877, 3, 148, 74, 0, 875, 877, 3, 150, 75, 0, 876, 874, 1, 0, 0, 0, 876,
    875, 1, 0, 0, 0, 877, 147, 1, 0, 0, 0, 878, 879, 5, 86, 0, 0, 879, 880, 3, 138, 69, 0, 880, 149,
    1, 0, 0, 0, 881, 882, 5, 66, 0, 0, 882, 883, 3, 138, 69, 0, 883, 151, 1, 0, 0, 0, 884, 885, 3,
    138, 69, 0, 885, 886, 3, 166, 83, 0, 886, 887, 3, 136, 68, 0, 887, 153, 1, 0, 0, 0, 888, 889, 5,
    78, 0, 0, 889, 890, 3, 108, 54, 0, 890, 891, 5, 79, 0, 0, 891, 155, 1, 0, 0, 0, 892, 893, 5, 80,
    0, 0, 893, 894, 3, 108, 54, 0, 894, 895, 5, 81, 0, 0, 895, 157, 1, 0, 0, 0, 896, 897, 5, 78, 0,
    0, 897, 898, 3, 160, 80, 0, 898, 899, 5, 79, 0, 0, 899, 159, 1, 0, 0, 0, 900, 905, 3, 162, 81,
    0, 901, 902, 5, 83, 0, 0, 902, 904, 3, 162, 81, 0, 903, 901, 1, 0, 0, 0, 904, 907, 1, 0, 0, 0,
    905, 903, 1, 0, 0, 0, 905, 906, 1, 0, 0, 0, 906, 161, 1, 0, 0, 0, 907, 905, 1, 0, 0, 0, 908,
    909, 3, 136, 68, 0, 909, 910, 5, 84, 0, 0, 910, 911, 3, 136, 68, 0, 911, 163, 1, 0, 0, 0, 912,
    913, 3, 92, 46, 0, 913, 915, 5, 80, 0, 0, 914, 916, 3, 100, 50, 0, 915, 914, 1, 0, 0, 0, 915,
    916, 1, 0, 0, 0, 916, 917, 1, 0, 0, 0, 917, 918, 5, 81, 0, 0, 918, 165, 1, 0, 0, 0, 919, 934, 5,
    67, 0, 0, 920, 934, 5, 68, 0, 0, 921, 934, 5, 90, 0, 0, 922, 934, 5, 89, 0, 0, 923, 934, 5, 92,
    0, 0, 924, 934, 5, 91, 0, 0, 925, 934, 5, 87, 0, 0, 926, 934, 5, 88, 0, 0, 927, 934, 5, 85, 0,
    0, 928, 934, 5, 86, 0, 0, 929, 934, 5, 64, 0, 0, 930, 934, 5, 65, 0, 0, 931, 934, 5, 69, 0, 0,
    932, 934, 5, 71, 0, 0, 933, 919, 1, 0, 0, 0, 933, 920, 1, 0, 0, 0, 933, 921, 1, 0, 0, 0, 933,
    922, 1, 0, 0, 0, 933, 923, 1, 0, 0, 0, 933, 924, 1, 0, 0, 0, 933, 925, 1, 0, 0, 0, 933, 926, 1,
    0, 0, 0, 933, 927, 1, 0, 0, 0, 933, 928, 1, 0, 0, 0, 933, 929, 1, 0, 0, 0, 933, 930, 1, 0, 0, 0,
    933, 931, 1, 0, 0, 0, 933, 932, 1, 0, 0, 0, 934, 167, 1, 0, 0, 0, 935, 936, 5, 30, 0, 0, 936,
    937, 3, 110, 55, 0, 937, 939, 5, 80, 0, 0, 938, 940, 3, 100, 50, 0, 939, 938, 1, 0, 0, 0, 939,
    940, 1, 0, 0, 0, 940, 941, 1, 0, 0, 0, 941, 942, 5, 81, 0, 0, 942, 169, 1, 0, 0, 0, 943, 944, 3,
    86, 43, 0, 944, 945, 5, 45, 0, 0, 945, 946, 3, 110, 55, 0, 946, 171, 1, 0, 0, 0, 947, 948, 3,
    96, 48, 0, 948, 949, 5, 89, 0, 0, 949, 950, 5, 31, 0, 0, 950, 955, 3, 110, 55, 0, 951, 952, 5,
    83, 0, 0, 952, 954, 3, 110, 55, 0, 953, 951, 1, 0, 0, 0, 954, 957, 1, 0, 0, 0, 955, 953, 1, 0,
    0, 0, 955, 956, 1, 0, 0, 0, 956, 958, 1, 0, 0, 0, 957, 955, 1, 0, 0, 0, 958, 959, 5, 90, 0, 0,
    959, 173, 1, 0, 0, 0, 960, 961, 5, 61, 0, 0, 961, 962, 5, 89, 0, 0, 962, 963, 5, 31, 0, 0, 963,
    968, 3, 110, 55, 0, 964, 965, 5, 83, 0, 0, 965, 967, 3, 110, 55, 0, 966, 964, 1, 0, 0, 0, 967,
    970, 1, 0, 0, 0, 968, 966, 1, 0, 0, 0, 968, 969, 1, 0, 0, 0, 969, 971, 1, 0, 0, 0, 970, 968, 1,
    0, 0, 0, 971, 972, 5, 70, 0, 0, 972, 973, 3, 110, 55, 0, 973, 974, 5, 90, 0, 0, 974, 175, 1, 0,
    0, 0, 975, 976, 5, 80, 0, 0, 976, 979, 3, 110, 55, 0, 977, 978, 5, 83, 0, 0, 978, 980, 3, 110,
    55, 0, 979, 977, 1, 0, 0, 0, 980, 981, 1, 0, 0, 0, 981, 979, 1, 0, 0, 0, 981, 982, 1, 0, 0, 0,
    982, 983, 1, 0, 0, 0, 983, 984, 5, 81, 0, 0, 984, 177, 1, 0, 0, 0, 985, 986, 5, 8, 0, 0, 986,
    987, 3, 104, 52, 0, 987, 988, 5, 70, 0, 0, 988, 989, 3, 136, 68, 0, 989, 179, 1, 0, 0, 0, 99,
    181, 186, 192, 200, 211, 214, 221, 229, 235, 244, 253, 261, 271, 274, 280, 287, 295, 305, 313,
    319, 326, 337, 340, 347, 353, 366, 369, 379, 394, 405, 408, 418, 427, 437, 441, 450, 454, 463,
    467, 474, 478, 486, 494, 504, 512, 519, 527, 536, 540, 550, 554, 563, 566, 582, 589, 592, 597,
    604, 612, 615, 624, 627, 633, 642, 651, 654, 660, 667, 675, 682, 690, 697, 711, 717, 731, 737,
    744, 749, 756, 764, 771, 778, 790, 797, 809, 815, 841, 852, 859, 861, 866, 876, 905, 915, 933,
    939, 955, 968, 981,
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

export class GlobalBlockContext extends antlr.ParserRuleContext {
  public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
    super(parent, invokingState);
  }
  public global(): GlobalContext[];
  public global(i: number): GlobalContext | null;
  public global(i?: number): GlobalContext[] | GlobalContext | null {
    if (i === undefined) {
      return this.getRuleContexts(GlobalContext);
    }

    return this.getRuleContext(i, GlobalContext);
  }
  public override get ruleIndex(): number {
    return RefLangParser.RULE_globalBlock;
  }
  public override enterRule(listener: RefLangListener): void {
    if (listener.enterGlobalBlock) {
      listener.enterGlobalBlock(this);
    }
  }
  public override exitRule(listener: RefLangListener): void {
    if (listener.exitGlobalBlock) {
      listener.exitGlobalBlock(this);
    }
  }
  public override accept<Result>(visitor: RefLangVisitor<Result>): Result | null {
    if (visitor.visitGlobalBlock) {
      return visitor.visitGlobalBlock(this);
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
  public constructorMember(): ConstructorMemberContext {
    return this.getRuleContext(0, ConstructorMemberContext)!;
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
  public GHOSTED(): antlr.TerminalNode | null {
    return this.getToken(RefLangParser.GHOSTED, 0);
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

export class StatementBlockContext extends antlr.ParserRuleContext {
  public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
    super(parent, invokingState);
  }
  public selectableStatement(): SelectableStatementContext[];
  public selectableStatement(i: number): SelectableStatementContext | null;
  public selectableStatement(
    i?: number,
  ): SelectableStatementContext[] | SelectableStatementContext | null {
    if (i === undefined) {
      return this.getRuleContexts(SelectableStatementContext);
    }

    return this.getRuleContext(i, SelectableStatementContext);
  }
  public override get ruleIndex(): number {
    return RefLangParser.RULE_statementBlock;
  }
  public override enterRule(listener: RefLangListener): void {
    if (listener.enterStatementBlock) {
      listener.enterStatementBlock(this);
    }
  }
  public override exitRule(listener: RefLangListener): void {
    if (listener.exitStatementBlock) {
      listener.exitStatementBlock(this);
    }
  }
  public override accept<Result>(visitor: RefLangVisitor<Result>): Result | null {
    if (visitor.visitStatementBlock) {
      return visitor.visitStatementBlock(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class SelectableStatementContext extends antlr.ParserRuleContext {
  public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
    super(parent, invokingState);
  }
  public variableDefinition(): VariableDefinitionContext | null {
    return this.getRuleContext(0, VariableDefinitionContext);
  }
  public assert(): AssertContext | null {
    return this.getRuleContext(0, AssertContext);
  }
  public assignment(): AssignmentContext | null {
    return this.getRuleContext(0, AssignmentContext);
  }
  public ifStatement(): IfStatementContext | null {
    return this.getRuleContext(0, IfStatementContext);
  }
  public elseIfClause(): ElseIfClauseContext | null {
    return this.getRuleContext(0, ElseIfClauseContext);
  }
  public elseClause(): ElseClauseContext | null {
    return this.getRuleContext(0, ElseClauseContext);
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
  public catchClause(): CatchClauseContext | null {
    return this.getRuleContext(0, CatchClauseContext);
  }
  public throwStatement(): ThrowStatementContext | null {
    return this.getRuleContext(0, ThrowStatementContext);
  }
  public comment(): CommentContext | null {
    return this.getRuleContext(0, CommentContext);
  }
  public override get ruleIndex(): number {
    return RefLangParser.RULE_selectableStatement;
  }
  public override enterRule(listener: RefLangListener): void {
    if (listener.enterSelectableStatement) {
      listener.enterSelectableStatement(this);
    }
  }
  public override exitRule(listener: RefLangListener): void {
    if (listener.exitSelectableStatement) {
      listener.exitSelectableStatement(this);
    }
  }
  public override accept<Result>(visitor: RefLangVisitor<Result>): Result | null {
    if (visitor.visitSelectableStatement) {
      return visitor.visitSelectableStatement(this);
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
  public thenClause(): ThenClauseContext {
    return this.getRuleContext(0, ThenClauseContext)!;
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
  public elseClause(): ElseClauseContext | null {
    return this.getRuleContext(0, ElseClauseContext);
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
    return RefLangParser.RULE_thenClause;
  }
  public override enterRule(listener: RefLangListener): void {
    if (listener.enterThenClause) {
      listener.enterThenClause(this);
    }
  }
  public override exitRule(listener: RefLangListener): void {
    if (listener.exitThenClause) {
      listener.exitThenClause(this);
    }
  }
  public override accept<Result>(visitor: RefLangVisitor<Result>): Result | null {
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
  public tryClause(): TryClauseContext {
    return this.getRuleContext(0, TryClauseContext)!;
  }
  public END(): antlr.TerminalNode {
    return this.getToken(RefLangParser.END, 0)!;
  }
  public GHOSTED(): antlr.TerminalNode | null {
    return this.getToken(RefLangParser.GHOSTED, 0);
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
    return RefLangParser.RULE_tryClause;
  }
  public override enterRule(listener: RefLangListener): void {
    if (listener.enterTryClause) {
      listener.enterTryClause(this);
    }
  }
  public override exitRule(listener: RefLangListener): void {
    if (listener.exitTryClause) {
      listener.exitTryClause(this);
    }
  }
  public override accept<Result>(visitor: RefLangVisitor<Result>): Result | null {
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
    return RefLangParser.RULE_catchClause;
  }
  public override enterRule(listener: RefLangListener): void {
    if (listener.enterCatchClause) {
      listener.enterCatchClause(this);
    }
  }
  public override exitRule(listener: RefLangListener): void {
    if (listener.exitCatchClause) {
      listener.exitCatchClause(this);
    }
  }
  public override accept<Result>(visitor: RefLangVisitor<Result>): Result | null {
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

export class MemberBlockContext extends antlr.ParserRuleContext {
  public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
    super(parent, invokingState);
  }
  public selectableMember(): SelectableMemberContext[];
  public selectableMember(i: number): SelectableMemberContext | null;
  public selectableMember(i?: number): SelectableMemberContext[] | SelectableMemberContext | null {
    if (i === undefined) {
      return this.getRuleContexts(SelectableMemberContext);
    }

    return this.getRuleContext(i, SelectableMemberContext);
  }
  public override get ruleIndex(): number {
    return RefLangParser.RULE_memberBlock;
  }
  public override enterRule(listener: RefLangListener): void {
    if (listener.enterMemberBlock) {
      listener.enterMemberBlock(this);
    }
  }
  public override exitRule(listener: RefLangListener): void {
    if (listener.exitMemberBlock) {
      listener.exitMemberBlock(this);
    }
  }
  public override accept<Result>(visitor: RefLangVisitor<Result>): Result | null {
    if (visitor.visitMemberBlock) {
      return visitor.visitMemberBlock(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class SelectableMemberContext extends antlr.ParserRuleContext {
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
  public override get ruleIndex(): number {
    return RefLangParser.RULE_selectableMember;
  }
  public override enterRule(listener: RefLangListener): void {
    if (listener.enterSelectableMember) {
      listener.enterSelectableMember(this);
    }
  }
  public override exitRule(listener: RefLangListener): void {
    if (listener.exitSelectableMember) {
      listener.exitSelectableMember(this);
    }
  }
  public override accept<Result>(visitor: RefLangVisitor<Result>): Result | null {
    if (visitor.visitSelectableMember) {
      return visitor.visitSelectableMember(this);
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
  public override get ruleIndex(): number {
    return RefLangParser.RULE_assignable;
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
  public override enterRule(listener: RefLangListener): void {
    if (listener.enterSimpleAssignable) {
      listener.enterSimpleAssignable(this);
    }
  }
  public override exitRule(listener: RefLangListener): void {
    if (listener.exitSimpleAssignable) {
      listener.exitSimpleAssignable(this);
    }
  }
  public override accept<Result>(visitor: RefLangVisitor<Result>): Result | null {
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
  public override enterRule(listener: RefLangListener): void {
    if (listener.enterIndexedAssignable) {
      listener.enterIndexedAssignable(this);
    }
  }
  public override exitRule(listener: RefLangListener): void {
    if (listener.exitIndexedAssignable) {
      listener.exitIndexedAssignable(this);
    }
  }
  public override accept<Result>(visitor: RefLangVisitor<Result>): Result | null {
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
    return this.getToken(RefLangParser.THIS_INSTANCE, 0)!;
  }
  public DOT(): antlr.TerminalNode {
    return this.getToken(RefLangParser.DOT, 0)!;
  }
  public identifierUse(): IdentifierUseContext {
    return this.getRuleContext(0, IdentifierUseContext)!;
  }
  public override enterRule(listener: RefLangListener): void {
    if (listener.enterThisAssignable) {
      listener.enterThisAssignable(this);
    }
  }
  public override exitRule(listener: RefLangListener): void {
    if (listener.exitThisAssignable) {
      listener.exitThisAssignable(this);
    }
  }
  public override accept<Result>(visitor: RefLangVisitor<Result>): Result | null {
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
  public override get ruleIndex(): number {
    return RefLangParser.RULE_typeName;
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
    return this.getToken(RefLangParser.INT_NAME, 0)!;
  }
  public override enterRule(listener: RefLangListener): void {
    if (listener.enterIntTypeName) {
      listener.enterIntTypeName(this);
    }
  }
  public override exitRule(listener: RefLangListener): void {
    if (listener.exitIntTypeName) {
      listener.exitIntTypeName(this);
    }
  }
  public override accept<Result>(visitor: RefLangVisitor<Result>): Result | null {
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
    return this.getToken(RefLangParser.LIST_NAME, 0)!;
  }
  public override enterRule(listener: RefLangListener): void {
    if (listener.enterListTypeName) {
      listener.enterListTypeName(this);
    }
  }
  public override exitRule(listener: RefLangListener): void {
    if (listener.exitListTypeName) {
      listener.exitListTypeName(this);
    }
  }
  public override accept<Result>(visitor: RefLangVisitor<Result>): Result | null {
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
    return this.getToken(RefLangParser.NAME_STARTING_UC, 0)!;
  }
  public override enterRule(listener: RefLangListener): void {
    if (listener.enterUdtTypeName) {
      listener.enterUdtTypeName(this);
    }
  }
  public override exitRule(listener: RefLangListener): void {
    if (listener.exitUdtTypeName) {
      listener.exitUdtTypeName(this);
    }
  }
  public override accept<Result>(visitor: RefLangVisitor<Result>): Result | null {
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
    return this.getToken(RefLangParser.BOOL_NAME, 0)!;
  }
  public override enterRule(listener: RefLangListener): void {
    if (listener.enterBoolTypeName) {
      listener.enterBoolTypeName(this);
    }
  }
  public override exitRule(listener: RefLangListener): void {
    if (listener.exitBoolTypeName) {
      listener.exitBoolTypeName(this);
    }
  }
  public override accept<Result>(visitor: RefLangVisitor<Result>): Result | null {
    if (visitor.visitBoolTypeName) {
      return visitor.visitBoolTypeName(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}
export class DictTypeNameContext extends TypeNameContext {
  public constructor(ctx: TypeNameContext) {
    super(ctx.parent, ctx.invokingState);
    super.copyFrom(ctx);
  }
  public DICT_NAME(): antlr.TerminalNode {
    return this.getToken(RefLangParser.DICT_NAME, 0)!;
  }
  public override enterRule(listener: RefLangListener): void {
    if (listener.enterDictTypeName) {
      listener.enterDictTypeName(this);
    }
  }
  public override exitRule(listener: RefLangListener): void {
    if (listener.exitDictTypeName) {
      listener.exitDictTypeName(this);
    }
  }
  public override accept<Result>(visitor: RefLangVisitor<Result>): Result | null {
    if (visitor.visitDictTypeName) {
      return visitor.visitDictTypeName(this);
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
    return this.getToken(RefLangParser.FLOAT_NAME, 0)!;
  }
  public override enterRule(listener: RefLangListener): void {
    if (listener.enterFloatTypeName) {
      listener.enterFloatTypeName(this);
    }
  }
  public override exitRule(listener: RefLangListener): void {
    if (listener.exitFloatTypeName) {
      listener.exitFloatTypeName(this);
    }
  }
  public override accept<Result>(visitor: RefLangVisitor<Result>): Result | null {
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
    return this.getToken(RefLangParser.STRING_NAME, 0)!;
  }
  public override enterRule(listener: RefLangListener): void {
    if (listener.enterStringTypeName) {
      listener.enterStringTypeName(this);
    }
  }
  public override exitRule(listener: RefLangListener): void {
    if (listener.exitStringTypeName) {
      listener.exitStringTypeName(this);
    }
  }
  public override accept<Result>(visitor: RefLangVisitor<Result>): Result | null {
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
  public expression(): ExpressionContext {
    return this.getRuleContext(0, ExpressionContext)!;
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
  public override get ruleIndex(): number {
    return RefLangParser.RULE_litInt;
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
    return this.getToken(RefLangParser.LITERAL_BINARY, 0)!;
  }
  public override enterRule(listener: RefLangListener): void {
    if (listener.enterLitBinary) {
      listener.enterLitBinary(this);
    }
  }
  public override exitRule(listener: RefLangListener): void {
    if (listener.exitLitBinary) {
      listener.exitLitBinary(this);
    }
  }
  public override accept<Result>(visitor: RefLangVisitor<Result>): Result | null {
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
    return this.getToken(RefLangParser.LITERAL_INTEGER, 0)!;
  }
  public override enterRule(listener: RefLangListener): void {
    if (listener.enterLitInteger) {
      listener.enterLitInteger(this);
    }
  }
  public override exitRule(listener: RefLangListener): void {
    if (listener.exitLitInteger) {
      listener.exitLitInteger(this);
    }
  }
  public override accept<Result>(visitor: RefLangVisitor<Result>): Result | null {
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
    return this.getToken(RefLangParser.LITERAL_HEX, 0)!;
  }
  public override enterRule(listener: RefLangListener): void {
    if (listener.enterLitHex) {
      listener.enterLitHex(this);
    }
  }
  public override exitRule(listener: RefLangListener): void {
    if (listener.exitLitHex) {
      listener.exitLitHex(this);
    }
  }
  public override accept<Result>(visitor: RefLangVisitor<Result>): Result | null {
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

export class InterpolatedStringExpressionContext extends antlr.ParserRuleContext {
  public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
    super(parent, invokingState);
  }
  public OPEN_BRACE(): antlr.TerminalNode {
    return this.getToken(RefLangParser.OPEN_BRACE, 0)!;
  }
  public expression(): ExpressionContext {
    return this.getRuleContext(0, ExpressionContext)!;
  }
  public CLOSE_BRACE(): antlr.TerminalNode {
    return this.getToken(RefLangParser.CLOSE_BRACE, 0)!;
  }
  public override get ruleIndex(): number {
    return RefLangParser.RULE_interpolatedStringExpression;
  }
  public override enterRule(listener: RefLangListener): void {
    if (listener.enterInterpolatedStringExpression) {
      listener.enterInterpolatedStringExpression(this);
    }
  }
  public override exitRule(listener: RefLangListener): void {
    if (listener.exitInterpolatedStringExpression) {
      listener.exitInterpolatedStringExpression(this);
    }
  }
  public override accept<Result>(visitor: RefLangVisitor<Result>): Result | null {
    if (visitor.visitInterpolatedStringExpression) {
      return visitor.visitInterpolatedStringExpression(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class SegmentContext extends antlr.ParserRuleContext {
  public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
    super(parent, invokingState);
  }
  public Grapheme(): antlr.TerminalNode | null {
    return this.getToken(RefLangParser.Grapheme, 0);
  }
  public interpolatedStringExpression(): InterpolatedStringExpressionContext | null {
    return this.getRuleContext(0, InterpolatedStringExpressionContext);
  }
  public override get ruleIndex(): number {
    return RefLangParser.RULE_segment;
  }
  public override enterRule(listener: RefLangListener): void {
    if (listener.enterSegment) {
      listener.enterSegment(this);
    }
  }
  public override exitRule(listener: RefLangListener): void {
    if (listener.exitSegment) {
      listener.exitSegment(this);
    }
  }
  public override accept<Result>(visitor: RefLangVisitor<Result>): Result | null {
    if (visitor.visitSegment) {
      return visitor.visitSegment(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class InterpolatedStringContext extends antlr.ParserRuleContext {
  public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
    super(parent, invokingState);
  }
  public START_INTERPOLATED_STRING(): antlr.TerminalNode {
    return this.getToken(RefLangParser.START_INTERPOLATED_STRING, 0)!;
  }
  public DOUBLE_QUOTES(): antlr.TerminalNode {
    return this.getToken(RefLangParser.DOUBLE_QUOTES, 0)!;
  }
  public segment(): SegmentContext[];
  public segment(i: number): SegmentContext | null;
  public segment(i?: number): SegmentContext[] | SegmentContext | null {
    if (i === undefined) {
      return this.getRuleContexts(SegmentContext);
    }

    return this.getRuleContext(i, SegmentContext);
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
  public override get ruleIndex(): number {
    return RefLangParser.RULE_expression;
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
  public override enterRule(listener: RefLangListener): void {
    if (listener.enterUnaryExpressionLabel) {
      listener.enterUnaryExpressionLabel(this);
    }
  }
  public override exitRule(listener: RefLangListener): void {
    if (listener.exitUnaryExpressionLabel) {
      listener.exitUnaryExpressionLabel(this);
    }
  }
  public override accept<Result>(visitor: RefLangVisitor<Result>): Result | null {
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
  public override enterRule(listener: RefLangListener): void {
    if (listener.enterBinaryExpressionLabel) {
      listener.enterBinaryExpressionLabel(this);
    }
  }
  public override exitRule(listener: RefLangListener): void {
    if (listener.exitBinaryExpressionLabel) {
      listener.exitBinaryExpressionLabel(this);
    }
  }
  public override accept<Result>(visitor: RefLangVisitor<Result>): Result | null {
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
  public override enterRule(listener: RefLangListener): void {
    if (listener.enterNewInstanceExpression) {
      listener.enterNewInstanceExpression(this);
    }
  }
  public override exitRule(listener: RefLangListener): void {
    if (listener.exitNewInstanceExpression) {
      listener.exitNewInstanceExpression(this);
    }
  }
  public override accept<Result>(visitor: RefLangVisitor<Result>): Result | null {
    if (visitor.visitNewInstanceExpression) {
      return visitor.visitNewInstanceExpression(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}
export class IfExpressionContext extends ExpressionContext {
  public _condition?: ExpressionContext;
  public _trueExpr?: ExpressionContext;
  public _falseExpr?: ExpressionContext;
  public constructor(ctx: ExpressionContext) {
    super(ctx.parent, ctx.invokingState);
    super.copyFrom(ctx);
  }
  public IF_(): antlr.TerminalNode {
    return this.getToken(RefLangParser.IF_, 0)!;
  }
  public OPEN_BRACKET(): antlr.TerminalNode {
    return this.getToken(RefLangParser.OPEN_BRACKET, 0)!;
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
  public expression(): ExpressionContext[];
  public expression(i: number): ExpressionContext | null;
  public expression(i?: number): ExpressionContext[] | ExpressionContext | null {
    if (i === undefined) {
      return this.getRuleContexts(ExpressionContext);
    }

    return this.getRuleContext(i, ExpressionContext);
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
export class TermExpressionContext extends ExpressionContext {
  public constructor(ctx: ExpressionContext) {
    super(ctx.parent, ctx.invokingState);
    super.copyFrom(ctx);
  }
  public term(): TermContext {
    return this.getRuleContext(0, TermContext)!;
  }
  public override enterRule(listener: RefLangListener): void {
    if (listener.enterTermExpression) {
      listener.enterTermExpression(this);
    }
  }
  public override exitRule(listener: RefLangListener): void {
    if (listener.exitTermExpression) {
      listener.exitTermExpression(this);
    }
  }
  public override accept<Result>(visitor: RefLangVisitor<Result>): Result | null {
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
    return RefLangParser.RULE_term;
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
  public override enterRule(listener: RefLangListener): void {
    if (listener.enterIdentifierUseTerm) {
      listener.enterIdentifierUseTerm(this);
    }
  }
  public override exitRule(listener: RefLangListener): void {
    if (listener.exitIdentifierUseTerm) {
      listener.exitIdentifierUseTerm(this);
    }
  }
  public override accept<Result>(visitor: RefLangVisitor<Result>): Result | null {
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
  public override enterRule(listener: RefLangListener): void {
    if (listener.enterMethodCallTerm) {
      listener.enterMethodCallTerm(this);
    }
  }
  public override exitRule(listener: RefLangListener): void {
    if (listener.exitMethodCallTerm) {
      listener.exitMethodCallTerm(this);
    }
  }
  public override accept<Result>(visitor: RefLangVisitor<Result>): Result | null {
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
  public override enterRule(listener: RefLangListener): void {
    if (listener.enterIndexedTerm) {
      listener.enterIndexedTerm(this);
    }
  }
  public override exitRule(listener: RefLangListener): void {
    if (listener.exitIndexedTerm) {
      listener.exitIndexedTerm(this);
    }
  }
  public override accept<Result>(visitor: RefLangVisitor<Result>): Result | null {
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
  public override enterRule(listener: RefLangListener): void {
    if (listener.enterLitValueTerm) {
      listener.enterLitValueTerm(this);
    }
  }
  public override exitRule(listener: RefLangListener): void {
    if (listener.exitLitValueTerm) {
      listener.exitLitValueTerm(this);
    }
  }
  public override accept<Result>(visitor: RefLangVisitor<Result>): Result | null {
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
  public override enterRule(listener: RefLangListener): void {
    if (listener.enterDictionaryTerm) {
      listener.enterDictionaryTerm(this);
    }
  }
  public override exitRule(listener: RefLangListener): void {
    if (listener.exitDictionaryTerm) {
      listener.exitDictionaryTerm(this);
    }
  }
  public override accept<Result>(visitor: RefLangVisitor<Result>): Result | null {
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
  public override enterRule(listener: RefLangListener): void {
    if (listener.enterBracketedExpressionTerm) {
      listener.enterBracketedExpressionTerm(this);
    }
  }
  public override exitRule(listener: RefLangListener): void {
    if (listener.exitBracketedExpressionTerm) {
      listener.exitBracketedExpressionTerm(this);
    }
  }
  public override accept<Result>(visitor: RefLangVisitor<Result>): Result | null {
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
    return this.getToken(RefLangParser.DOT, 0)!;
  }
  public chainable(): ChainableContext {
    return this.getRuleContext(0, ChainableContext)!;
  }
  public override enterRule(listener: RefLangListener): void {
    if (listener.enterChainableTerm) {
      listener.enterChainableTerm(this);
    }
  }
  public override exitRule(listener: RefLangListener): void {
    if (listener.exitChainableTerm) {
      listener.exitChainableTerm(this);
    }
  }
  public override accept<Result>(visitor: RefLangVisitor<Result>): Result | null {
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
  public override enterRule(listener: RefLangListener): void {
    if (listener.enterTupleTerm) {
      listener.enterTupleTerm(this);
    }
  }
  public override exitRule(listener: RefLangListener): void {
    if (listener.exitTupleTerm) {
      listener.exitTupleTerm(this);
    }
  }
  public override accept<Result>(visitor: RefLangVisitor<Result>): Result | null {
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
  public override enterRule(listener: RefLangListener): void {
    if (listener.enterThisInstanceTerm) {
      listener.enterThisInstanceTerm(this);
    }
  }
  public override exitRule(listener: RefLangListener): void {
    if (listener.exitThisInstanceTerm) {
      listener.exitThisInstanceTerm(this);
    }
  }
  public override accept<Result>(visitor: RefLangVisitor<Result>): Result | null {
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
  public override enterRule(listener: RefLangListener): void {
    if (listener.enterListTerm) {
      listener.enterListTerm(this);
    }
  }
  public override exitRule(listener: RefLangListener): void {
    if (listener.exitListTerm) {
      listener.exitListTerm(this);
    }
  }
  public override accept<Result>(visitor: RefLangVisitor<Result>): Result | null {
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
  public _key?: ExpressionContext;
  public _value?: ExpressionContext;
  public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
    super(parent, invokingState);
  }
  public COLON(): antlr.TerminalNode {
    return this.getToken(RefLangParser.COLON, 0)!;
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
  public override get ruleIndex(): number {
    return RefLangParser.RULE_binaryOperator;
  }
  public override copyFrom(ctx: BinaryOperatorContext): void {
    super.copyFrom(ctx);
  }
}
export class OpPLUSContext extends BinaryOperatorContext {
  public constructor(ctx: BinaryOperatorContext) {
    super(ctx.parent, ctx.invokingState);
    super.copyFrom(ctx);
  }
  public PLUS(): antlr.TerminalNode {
    return this.getToken(RefLangParser.PLUS, 0)!;
  }
  public override enterRule(listener: RefLangListener): void {
    if (listener.enterOpPLUS) {
      listener.enterOpPLUS(this);
    }
  }
  public override exitRule(listener: RefLangListener): void {
    if (listener.exitOpPLUS) {
      listener.exitOpPLUS(this);
    }
  }
  public override accept<Result>(visitor: RefLangVisitor<Result>): Result | null {
    if (visitor.visitOpPLUS) {
      return visitor.visitOpPLUS(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}
export class OpANDContext extends BinaryOperatorContext {
  public constructor(ctx: BinaryOperatorContext) {
    super(ctx.parent, ctx.invokingState);
    super.copyFrom(ctx);
  }
  public AND(): antlr.TerminalNode {
    return this.getToken(RefLangParser.AND, 0)!;
  }
  public override enterRule(listener: RefLangListener): void {
    if (listener.enterOpAND) {
      listener.enterOpAND(this);
    }
  }
  public override exitRule(listener: RefLangListener): void {
    if (listener.exitOpAND) {
      listener.exitOpAND(this);
    }
  }
  public override accept<Result>(visitor: RefLangVisitor<Result>): Result | null {
    if (visitor.visitOpAND) {
      return visitor.visitOpAND(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}
export class OpDIVIDEContext extends BinaryOperatorContext {
  public constructor(ctx: BinaryOperatorContext) {
    super(ctx.parent, ctx.invokingState);
    super.copyFrom(ctx);
  }
  public DIVIDE(): antlr.TerminalNode {
    return this.getToken(RefLangParser.DIVIDE, 0)!;
  }
  public override enterRule(listener: RefLangListener): void {
    if (listener.enterOpDIVIDE) {
      listener.enterOpDIVIDE(this);
    }
  }
  public override exitRule(listener: RefLangListener): void {
    if (listener.exitOpDIVIDE) {
      listener.exitOpDIVIDE(this);
    }
  }
  public override accept<Result>(visitor: RefLangVisitor<Result>): Result | null {
    if (visitor.visitOpDIVIDE) {
      return visitor.visitOpDIVIDE(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}
export class OpMULTContext extends BinaryOperatorContext {
  public constructor(ctx: BinaryOperatorContext) {
    super(ctx.parent, ctx.invokingState);
    super.copyFrom(ctx);
  }
  public MULT(): antlr.TerminalNode {
    return this.getToken(RefLangParser.MULT, 0)!;
  }
  public override enterRule(listener: RefLangListener): void {
    if (listener.enterOpMULT) {
      listener.enterOpMULT(this);
    }
  }
  public override exitRule(listener: RefLangListener): void {
    if (listener.exitOpMULT) {
      listener.exitOpMULT(this);
    }
  }
  public override accept<Result>(visitor: RefLangVisitor<Result>): Result | null {
    if (visitor.visitOpMULT) {
      return visitor.visitOpMULT(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}
export class OpGEContext extends BinaryOperatorContext {
  public constructor(ctx: BinaryOperatorContext) {
    super(ctx.parent, ctx.invokingState);
    super.copyFrom(ctx);
  }
  public GE(): antlr.TerminalNode {
    return this.getToken(RefLangParser.GE, 0)!;
  }
  public override enterRule(listener: RefLangListener): void {
    if (listener.enterOpGE) {
      listener.enterOpGE(this);
    }
  }
  public override exitRule(listener: RefLangListener): void {
    if (listener.exitOpGE) {
      listener.exitOpGE(this);
    }
  }
  public override accept<Result>(visitor: RefLangVisitor<Result>): Result | null {
    if (visitor.visitOpGE) {
      return visitor.visitOpGE(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}
export class OpLEContext extends BinaryOperatorContext {
  public constructor(ctx: BinaryOperatorContext) {
    super(ctx.parent, ctx.invokingState);
    super.copyFrom(ctx);
  }
  public LE(): antlr.TerminalNode {
    return this.getToken(RefLangParser.LE, 0)!;
  }
  public override enterRule(listener: RefLangListener): void {
    if (listener.enterOpLE) {
      listener.enterOpLE(this);
    }
  }
  public override exitRule(listener: RefLangListener): void {
    if (listener.exitOpLE) {
      listener.exitOpLE(this);
    }
  }
  public override accept<Result>(visitor: RefLangVisitor<Result>): Result | null {
    if (visitor.visitOpLE) {
      return visitor.visitOpLE(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}
export class OpORContext extends BinaryOperatorContext {
  public constructor(ctx: BinaryOperatorContext) {
    super(ctx.parent, ctx.invokingState);
    super.copyFrom(ctx);
  }
  public OR(): antlr.TerminalNode {
    return this.getToken(RefLangParser.OR, 0)!;
  }
  public override enterRule(listener: RefLangListener): void {
    if (listener.enterOpOR) {
      listener.enterOpOR(this);
    }
  }
  public override exitRule(listener: RefLangListener): void {
    if (listener.exitOpOR) {
      listener.exitOpOR(this);
    }
  }
  public override accept<Result>(visitor: RefLangVisitor<Result>): Result | null {
    if (visitor.visitOpOR) {
      return visitor.visitOpOR(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}
export class OpMODContext extends BinaryOperatorContext {
  public constructor(ctx: BinaryOperatorContext) {
    super(ctx.parent, ctx.invokingState);
    super.copyFrom(ctx);
  }
  public MOD(): antlr.TerminalNode {
    return this.getToken(RefLangParser.MOD, 0)!;
  }
  public override enterRule(listener: RefLangListener): void {
    if (listener.enterOpMOD) {
      listener.enterOpMOD(this);
    }
  }
  public override exitRule(listener: RefLangListener): void {
    if (listener.exitOpMOD) {
      listener.exitOpMOD(this);
    }
  }
  public override accept<Result>(visitor: RefLangVisitor<Result>): Result | null {
    if (visitor.visitOpMOD) {
      return visitor.visitOpMOD(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}
export class OpEQUALContext extends BinaryOperatorContext {
  public constructor(ctx: BinaryOperatorContext) {
    super(ctx.parent, ctx.invokingState);
    super.copyFrom(ctx);
  }
  public EQUAL(): antlr.TerminalNode {
    return this.getToken(RefLangParser.EQUAL, 0)!;
  }
  public override enterRule(listener: RefLangListener): void {
    if (listener.enterOpEQUAL) {
      listener.enterOpEQUAL(this);
    }
  }
  public override exitRule(listener: RefLangListener): void {
    if (listener.exitOpEQUAL) {
      listener.exitOpEQUAL(this);
    }
  }
  public override accept<Result>(visitor: RefLangVisitor<Result>): Result | null {
    if (visitor.visitOpEQUAL) {
      return visitor.visitOpEQUAL(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}
export class OpGTContext extends BinaryOperatorContext {
  public constructor(ctx: BinaryOperatorContext) {
    super(ctx.parent, ctx.invokingState);
    super.copyFrom(ctx);
  }
  public GT(): antlr.TerminalNode {
    return this.getToken(RefLangParser.GT, 0)!;
  }
  public override enterRule(listener: RefLangListener): void {
    if (listener.enterOpGT) {
      listener.enterOpGT(this);
    }
  }
  public override exitRule(listener: RefLangListener): void {
    if (listener.exitOpGT) {
      listener.exitOpGT(this);
    }
  }
  public override accept<Result>(visitor: RefLangVisitor<Result>): Result | null {
    if (visitor.visitOpGT) {
      return visitor.visitOpGT(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}
export class OpPOWERContext extends BinaryOperatorContext {
  public constructor(ctx: BinaryOperatorContext) {
    super(ctx.parent, ctx.invokingState);
    super.copyFrom(ctx);
  }
  public POWER(): antlr.TerminalNode {
    return this.getToken(RefLangParser.POWER, 0)!;
  }
  public override enterRule(listener: RefLangListener): void {
    if (listener.enterOpPOWER) {
      listener.enterOpPOWER(this);
    }
  }
  public override exitRule(listener: RefLangListener): void {
    if (listener.exitOpPOWER) {
      listener.exitOpPOWER(this);
    }
  }
  public override accept<Result>(visitor: RefLangVisitor<Result>): Result | null {
    if (visitor.visitOpPOWER) {
      return visitor.visitOpPOWER(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}
export class OpNOT_EQUALContext extends BinaryOperatorContext {
  public constructor(ctx: BinaryOperatorContext) {
    super(ctx.parent, ctx.invokingState);
    super.copyFrom(ctx);
  }
  public NOT_EQUAL(): antlr.TerminalNode {
    return this.getToken(RefLangParser.NOT_EQUAL, 0)!;
  }
  public override enterRule(listener: RefLangListener): void {
    if (listener.enterOpNOT_EQUAL) {
      listener.enterOpNOT_EQUAL(this);
    }
  }
  public override exitRule(listener: RefLangListener): void {
    if (listener.exitOpNOT_EQUAL) {
      listener.exitOpNOT_EQUAL(this);
    }
  }
  public override accept<Result>(visitor: RefLangVisitor<Result>): Result | null {
    if (visitor.visitOpNOT_EQUAL) {
      return visitor.visitOpNOT_EQUAL(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}
export class OpLTContext extends BinaryOperatorContext {
  public constructor(ctx: BinaryOperatorContext) {
    super(ctx.parent, ctx.invokingState);
    super.copyFrom(ctx);
  }
  public LT(): antlr.TerminalNode {
    return this.getToken(RefLangParser.LT, 0)!;
  }
  public override enterRule(listener: RefLangListener): void {
    if (listener.enterOpLT) {
      listener.enterOpLT(this);
    }
  }
  public override exitRule(listener: RefLangListener): void {
    if (listener.exitOpLT) {
      listener.exitOpLT(this);
    }
  }
  public override accept<Result>(visitor: RefLangVisitor<Result>): Result | null {
    if (visitor.visitOpLT) {
      return visitor.visitOpLT(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}
export class OpMINUSContext extends BinaryOperatorContext {
  public constructor(ctx: BinaryOperatorContext) {
    super(ctx.parent, ctx.invokingState);
    super.copyFrom(ctx);
  }
  public MINUS(): antlr.TerminalNode {
    return this.getToken(RefLangParser.MINUS, 0)!;
  }
  public override enterRule(listener: RefLangListener): void {
    if (listener.enterOpMINUS) {
      listener.enterOpMINUS(this);
    }
  }
  public override exitRule(listener: RefLangListener): void {
    if (listener.exitOpMINUS) {
      listener.exitOpMINUS(this);
    }
  }
  public override accept<Result>(visitor: RefLangVisitor<Result>): Result | null {
    if (visitor.visitOpMINUS) {
      return visitor.visitOpMINUS(this);
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
