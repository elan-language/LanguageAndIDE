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
  public static readonly FOR = 4;
  public static readonly IF = 5;
  public static readonly IN = 6;
  public static readonly INPUT = 7;
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
  public static readonly PRIVATE = 31;
  public static readonly PROCEDURE = 32;
  public static readonly PROPERTY = 33;
  public static readonly RETURNS = 34;
  public static readonly SET = 35;
  public static readonly STEP = 36;
  public static readonly TEST = 37;
  public static readonly THEN = 38;
  public static readonly THROW = 39;
  public static readonly TO = 40;
  public static readonly VARIABLE = 41;
  public static readonly ASSERT_EQUAL = 42;
  public static readonly AS = 43;
  public static readonly DEF = 44;
  public static readonly EXCEPT = 45;
  public static readonly INIT = 46;
  public static readonly NONE = 47;
  public static readonly PASS = 48;
  public static readonly RAISE = 49;
  public static readonly ABC = 50;
  public static readonly ENUM = 51;
  public static readonly TESTCASE = 52;
  public static readonly TUPLE = 53;
  public static readonly INT_NAME = 54;
  public static readonly FLOAT_NAME = 55;
  public static readonly BOOL_NAME = 56;
  public static readonly STRING_NAME = 57;
  public static readonly LIST_NAME = 58;
  public static readonly FUNC_NAME = 59;
  public static readonly TRUE = 60;
  public static readonly FALSE = 61;
  public static readonly AND = 62;
  public static readonly OR = 63;
  public static readonly NOT = 64;
  public static readonly EQUAL = 65;
  public static readonly NOT_EQUAL = 66;
  public static readonly MOD = 67;
  public static readonly ARROW = 68;
  public static readonly POWER = 69;
  public static readonly BINARY_PREFIX = 70;
  public static readonly HEX_PREFIX = 71;
  public static readonly THIS_INSTANCE = 72;
  public static readonly SINGLE_EQUALS = 73;
  public static readonly OPEN_BRACE = 74;
  public static readonly CLOSE_BRACE = 75;
  public static readonly OPEN_SQ_BRACKET = 76;
  public static readonly CLOSE_SQ_BRACKET = 77;
  public static readonly OPEN_BRACKET = 78;
  public static readonly CLOSE_BRACKET = 79;
  public static readonly DOT = 80;
  public static readonly COMMA = 81;
  public static readonly COLON = 82;
  public static readonly PLUS = 83;
  public static readonly MINUS = 84;
  public static readonly MULT = 85;
  public static readonly DIVIDE = 86;
  public static readonly LT = 87;
  public static readonly GT = 88;
  public static readonly LE = 89;
  public static readonly GE = 90;
  public static readonly DOUBLE_QUOTES = 91;
  public static readonly WS = 92;
  public static readonly NL = 93;
  public static readonly NAME_STARTING_LC_TEST_ = 94;
  public static readonly NAME_STARTING_UC_TEST_ = 95;
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
  public static readonly GHOSTED_LINE = 106;
  public static readonly GHOSTED_BLOCK_START = 107;
  public static readonly GHOSTED_BLOCK_END = 108;
  public static readonly END_MAIN = 109;
  public static readonly END_FUNCTION = 110;
  public static readonly END_TEST = 111;
  public static readonly END_TEST_CLASS = 112;
  public static readonly END_PROCEDURE = 113;
  public static readonly END_ENUM = 114;
  public static readonly END_CLASS = 115;
  public static readonly END_IF = 116;
  public static readonly END_WHILE = 117;
  public static readonly END_FOR = 118;
  public static readonly END_TRY = 119;
  public static readonly END_CONSTRUCTOR = 120;
  public static readonly END_FUNCTION_METHOD = 121;
  public static readonly END_PROCEDURE_METHOD = 122;
  public static readonly ASSIGNMENT_ANNOTATION = 123;
  public static readonly VARIABLE_DEFINITION_ANNOTATION = 124;
  public static readonly ABSTRACT_METHOD = 125;
  public static readonly COMMENT = 126;
  public static readonly RULE_file = 0;
  public static readonly RULE_global = 1;
  public static readonly RULE_main = 2;
  public static readonly RULE_mainCall = 3;
  public static readonly RULE_function = 4;
  public static readonly RULE_test = 5;
  public static readonly RULE_testFunction = 6;
  public static readonly RULE_testStatement = 7;
  public static readonly RULE_procedure = 8;
  public static readonly RULE_constant = 9;
  public static readonly RULE_enum = 10;
  public static readonly RULE_concreteClass = 11;
  public static readonly RULE_concreteClassMember = 12;
  public static readonly RULE_abstractClass = 13;
  public static readonly RULE_abstractClassMember = 14;
  public static readonly RULE_comment = 15;
  public static readonly RULE_commentText = 16;
  public static readonly RULE_ordinaryStatement = 17;
  public static readonly RULE_variableDefinition = 18;
  public static readonly RULE_assignment = 19;
  public static readonly RULE_ifStatement = 20;
  public static readonly RULE_thenClause = 21;
  public static readonly RULE_elseIfClause = 22;
  public static readonly RULE_elseClause = 23;
  public static readonly RULE_whileLoop = 24;
  public static readonly RULE_forLoop = 25;
  public static readonly RULE_procedureCall = 26;
  public static readonly RULE_tryStatement = 27;
  public static readonly RULE_tryClause = 28;
  public static readonly RULE_catchClause = 29;
  public static readonly RULE_throwStatement = 30;
  public static readonly RULE_errorMessage = 31;
  public static readonly RULE_assert = 32;
  public static readonly RULE_returnStatement = 33;
  public static readonly RULE_constructorMember = 34;
  public static readonly RULE_property = 35;
  public static readonly RULE_functionMethod = 36;
  public static readonly RULE_procedureMethod = 37;
  public static readonly RULE_abstractFunction = 38;
  public static readonly RULE_abstractProcedure = 39;
  public static readonly RULE_identifierDef = 40;
  public static readonly RULE_identifierUse = 41;
  public static readonly RULE_assignable = 42;
  public static readonly RULE_methodName = 43;
  public static readonly RULE_testName = 44;
  public static readonly RULE_testClassName = 45;
  public static readonly RULE_typeName = 46;
  public static readonly RULE_constantValue = 47;
  public static readonly RULE_argList = 48;
  public static readonly RULE_argument = 49;
  public static readonly RULE_paramList = 50;
  public static readonly RULE_identifierList = 51;
  public static readonly RULE_expressionList = 52;
  public static readonly RULE_enumDefValue = 53;
  public static readonly RULE_enumList = 54;
  public static readonly RULE_type = 55;
  public static readonly RULE_assertActual = 56;
  public static readonly RULE_assertExpected = 57;
  public static readonly RULE_litValue = 58;
  public static readonly RULE_litBoolean = 59;
  public static readonly RULE_litInt = 60;
  public static readonly RULE_litFloat = 61;
  public static readonly RULE_litString = 62;
  public static readonly RULE_enumValue = 63;
  public static readonly RULE_index = 64;
  public static readonly RULE_expression = 65;
  public static readonly RULE_term = 66;
  public static readonly RULE_chainable = 67;
  public static readonly RULE_thisInstance = 68;
  public static readonly RULE_bracketedExpression = 69;
  public static readonly RULE_unaryExpression = 70;
  public static readonly RULE_negateNumeric = 71;
  public static readonly RULE_negateLogical = 72;
  public static readonly RULE_binaryExpression = 73;
  public static readonly RULE_list = 74;
  public static readonly RULE_tuple = 75;
  public static readonly RULE_dictionary = 76;
  public static readonly RULE_kvpList = 77;
  public static readonly RULE_kvp = 78;
  public static readonly RULE_methodCall = 79;
  public static readonly RULE_binaryOperator = 80;
  public static readonly RULE_newInstance = 81;
  public static readonly RULE_paramDef = 82;
  public static readonly RULE_typeGeneric = 83;
  public static readonly RULE_typeFunc = 84;
  public static readonly RULE_typeTuple = 85;
  public static readonly RULE_lambda = 86;
  public static readonly RULE_interpolatedString = 87;

  public static readonly literalNames = [
    null,
    "'class'",
    "'elif'",
    "'else'",
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
    "'assertEqual'",
    "'as'",
    "'def'",
    "'except'",
    "'__init__'",
    "'None'",
    "'pass'",
    "'raise'",
    "'ABC'",
    "'Enum'",
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
    "'#[ghosted] '",
    "''''[ghosted] '",
    "'''''",
    "'# end main'",
    "'# end function'",
    "'# end test'",
    "'# end test class'",
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
    "'# assignment'",
    "'# variable definition'",
    "'@abstractmethod'",
  ];

  public static readonly symbolicNames = [
    null,
    "CLASS",
    "ELIF",
    "ELSE",
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
    "ASSERT_EQUAL",
    "AS",
    "DEF",
    "EXCEPT",
    "INIT",
    "NONE",
    "PASS",
    "RAISE",
    "ABC",
    "ENUM",
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
    "NAME_STARTING_LC_TEST_",
    "NAME_STARTING_UC_TEST_",
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
    "GHOSTED_LINE",
    "GHOSTED_BLOCK_START",
    "GHOSTED_BLOCK_END",
    "END_MAIN",
    "END_FUNCTION",
    "END_TEST",
    "END_TEST_CLASS",
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
    "ASSIGNMENT_ANNOTATION",
    "VARIABLE_DEFINITION_ANNOTATION",
    "ABSTRACT_METHOD",
    "COMMENT",
  ];
  public static readonly ruleNames = [
    "file",
    "global",
    "main",
    "mainCall",
    "function",
    "test",
    "testFunction",
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
    "testClassName",
    "typeName",
    "constantValue",
    "argList",
    "argument",
    "paramList",
    "identifierList",
    "expressionList",
    "enumDefValue",
    "enumList",
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
          _la === 1 ||
          _la === 44 ||
          (((_la - 96) & ~0x1f) === 0 && ((1 << (_la - 96)) & 1073744897) !== 0)
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
        this.state = 186;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 9) {
          {
            this.state = 185;
            this.mainCall();
          }
        }

        this.state = 191;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (_la === 93) {
          {
            {
              this.state = 188;
              this.match(PythonParser.NL);
            }
          }
          this.state = 193;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 194;
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
      this.state = 205;
      this.errorHandler.sync(this);
      switch (this.interpreter.adaptivePredict(this.tokenStream, 4, this.context)) {
        case 1:
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 196;
            this.main();
          }
          break;
        case 2:
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 197;
            this.function_();
          }
          break;
        case 3:
          this.enterOuterAlt(localContext, 3);
          {
            this.state = 198;
            this.test();
          }
          break;
        case 4:
          this.enterOuterAlt(localContext, 4);
          {
            this.state = 199;
            this.procedure();
          }
          break;
        case 5:
          this.enterOuterAlt(localContext, 5);
          {
            this.state = 200;
            this.constant();
          }
          break;
        case 6:
          this.enterOuterAlt(localContext, 6);
          {
            this.state = 201;
            this.enum_();
          }
          break;
        case 7:
          this.enterOuterAlt(localContext, 7);
          {
            this.state = 202;
            this.concreteClass();
          }
          break;
        case 8:
          this.enterOuterAlt(localContext, 8);
          {
            this.state = 203;
            this.abstractClass();
          }
          break;
        case 9:
          this.enterOuterAlt(localContext, 9);
          {
            this.state = 204;
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
        this.state = 208;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 107) {
          {
            this.state = 207;
            this.match(PythonParser.GHOSTED_BLOCK_START);
          }
        }

        this.state = 210;
        this.match(PythonParser.DEF);
        this.state = 211;
        this.match(PythonParser.MAIN);
        this.state = 212;
        this.match(PythonParser.OPEN_BRACKET);
        this.state = 213;
        this.match(PythonParser.CLOSE_BRACKET);
        this.state = 214;
        this.match(PythonParser.ARROW);
        this.state = 215;
        this.match(PythonParser.NONE);
        this.state = 216;
        this.match(PythonParser.COLON);
        this.state = 217;
        this.match(PythonParser.NL);
        this.state = 221;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (
          ((_la & ~0x1f) === 0 && ((1 << _la) & 6192) !== 0) ||
          (((_la - 49) & ~0x1f) === 0 && ((1 << (_la - 49)) & 713038817) !== 0) ||
          (((_la - 96) & ~0x1f) === 0 && ((1 << (_la - 96)) & 1073745151) !== 0)
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
        this.match(PythonParser.END_MAIN);
        this.state = 226;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 108) {
          {
            this.state = 225;
            this.match(PythonParser.GHOSTED_BLOCK_END);
          }
        }

        this.state = 228;
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
  public mainCall(): MainCallContext {
    let localContext = new MainCallContext(this.context, this.state);
    this.enterRule(localContext, 6, PythonParser.RULE_mainCall);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 230;
        this.match(PythonParser.MAIN);
        this.state = 231;
        this.match(PythonParser.OPEN_BRACKET);
        this.state = 232;
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
  public function_(): FunctionContext {
    let localContext = new FunctionContext(this.context, this.state);
    this.enterRule(localContext, 8, PythonParser.RULE_function);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 235;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 107) {
          {
            this.state = 234;
            this.match(PythonParser.GHOSTED_BLOCK_START);
          }
        }

        this.state = 237;
        this.match(PythonParser.DEF);
        this.state = 238;
        this.methodName();
        this.state = 239;
        this.match(PythonParser.OPEN_BRACKET);
        this.state = 241;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 72 || _la === 96) {
          {
            this.state = 240;
            this.paramList();
          }
        }

        this.state = 243;
        this.match(PythonParser.CLOSE_BRACKET);
        this.state = 244;
        this.match(PythonParser.ARROW);
        this.state = 245;
        this.type_();
        this.state = 246;
        this.match(PythonParser.COLON);
        this.state = 248;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 126) {
          {
            this.state = 247;
            this.commentText();
          }
        }

        this.state = 250;
        this.match(PythonParser.NL);
        this.state = 254;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (
          ((_la & ~0x1f) === 0 && ((1 << _la) & 6192) !== 0) ||
          (((_la - 49) & ~0x1f) === 0 && ((1 << (_la - 49)) & 713038817) !== 0) ||
          (((_la - 96) & ~0x1f) === 0 && ((1 << (_la - 96)) & 1073745151) !== 0)
        ) {
          {
            {
              this.state = 251;
              this.ordinaryStatement();
            }
          }
          this.state = 256;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 257;
        this.returnStatement();
        this.state = 258;
        this.match(PythonParser.END_FUNCTION);
        this.state = 260;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 108) {
          {
            this.state = 259;
            this.match(PythonParser.GHOSTED_BLOCK_END);
          }
        }

        this.state = 262;
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
    this.enterRule(localContext, 10, PythonParser.RULE_test);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 265;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 107) {
          {
            this.state = 264;
            this.match(PythonParser.GHOSTED_BLOCK_START);
          }
        }

        this.state = 267;
        this.match(PythonParser.CLASS);
        this.state = 268;
        this.testClassName();
        this.state = 269;
        this.match(PythonParser.OPEN_BRACKET);
        this.state = 270;
        this.match(PythonParser.TESTCASE);
        this.state = 271;
        this.match(PythonParser.CLOSE_BRACKET);
        this.state = 272;
        this.match(PythonParser.COLON);
        this.state = 273;
        this.match(PythonParser.NL);
        this.state = 274;
        this.testFunction();
        this.state = 275;
        this.match(PythonParser.END_TEST_CLASS);
        this.state = 277;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 108) {
          {
            this.state = 276;
            this.match(PythonParser.GHOSTED_BLOCK_END);
          }
        }

        this.state = 279;
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
  public testFunction(): TestFunctionContext {
    let localContext = new TestFunctionContext(this.context, this.state);
    this.enterRule(localContext, 12, PythonParser.RULE_testFunction);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 282;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 107) {
          {
            this.state = 281;
            this.match(PythonParser.GHOSTED_BLOCK_START);
          }
        }

        this.state = 284;
        this.match(PythonParser.DEF);
        this.state = 285;
        this.testName();
        this.state = 286;
        this.match(PythonParser.OPEN_BRACKET);
        this.state = 287;
        this.match(PythonParser.THIS_INSTANCE);
        this.state = 288;
        this.match(PythonParser.COLON);
        this.state = 289;
        this.testClassName();
        this.state = 290;
        this.match(PythonParser.CLOSE_BRACKET);
        this.state = 291;
        this.match(PythonParser.ARROW);
        this.state = 292;
        this.match(PythonParser.NONE);
        this.state = 293;
        this.match(PythonParser.COLON);
        this.state = 295;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 126) {
          {
            this.state = 294;
            this.commentText();
          }
        }

        this.state = 297;
        this.match(PythonParser.NL);
        this.state = 301;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (_la === 72 || _la === 96 || _la === 106 || _la === 126) {
          {
            {
              this.state = 298;
              this.testStatement();
            }
          }
          this.state = 303;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 304;
        this.match(PythonParser.END_TEST);
        this.state = 305;
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
    this.enterRule(localContext, 14, PythonParser.RULE_testStatement);
    try {
      this.state = 310;
      this.errorHandler.sync(this);
      switch (this.interpreter.adaptivePredict(this.tokenStream, 18, this.context)) {
        case 1:
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 307;
            this.assert();
          }
          break;
        case 2:
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 308;
            this.variableDefinition();
          }
          break;
        case 3:
          this.enterOuterAlt(localContext, 3);
          {
            this.state = 309;
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
    this.enterRule(localContext, 16, PythonParser.RULE_procedure);
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
            this.match(PythonParser.GHOSTED_BLOCK_START);
          }
        }

        this.state = 315;
        this.match(PythonParser.DEF);
        this.state = 316;
        this.methodName();
        this.state = 317;
        this.match(PythonParser.OPEN_BRACKET);
        this.state = 319;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 72 || _la === 96) {
          {
            this.state = 318;
            this.paramList();
          }
        }

        this.state = 321;
        this.match(PythonParser.CLOSE_BRACKET);
        this.state = 322;
        this.match(PythonParser.ARROW);
        this.state = 323;
        this.match(PythonParser.NONE);
        this.state = 324;
        this.match(PythonParser.COLON);
        this.state = 326;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 126) {
          {
            this.state = 325;
            this.commentText();
          }
        }

        this.state = 328;
        this.match(PythonParser.NL);
        this.state = 332;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (
          ((_la & ~0x1f) === 0 && ((1 << _la) & 6192) !== 0) ||
          (((_la - 49) & ~0x1f) === 0 && ((1 << (_la - 49)) & 713038817) !== 0) ||
          (((_la - 96) & ~0x1f) === 0 && ((1 << (_la - 96)) & 1073745151) !== 0)
        ) {
          {
            {
              this.state = 329;
              this.ordinaryStatement();
            }
          }
          this.state = 334;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 335;
        this.match(PythonParser.END_PROCEDURE);
        this.state = 337;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 108) {
          {
            this.state = 336;
            this.match(PythonParser.GHOSTED_BLOCK_END);
          }
        }

        this.state = 339;
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
    this.enterRule(localContext, 18, PythonParser.RULE_constant);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 342;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 106) {
          {
            this.state = 341;
            this.match(PythonParser.GHOSTED_LINE);
          }
        }

        this.state = 344;
        this.identifierDef();
        this.state = 345;
        this.match(PythonParser.SINGLE_EQUALS);
        this.state = 346;
        this.constantValue();
        this.state = 348;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 126) {
          {
            this.state = 347;
            this.commentText();
          }
        }

        this.state = 350;
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
    this.enterRule(localContext, 20, PythonParser.RULE_enum);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 353;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 107) {
          {
            this.state = 352;
            this.match(PythonParser.GHOSTED_BLOCK_START);
          }
        }

        this.state = 355;
        this.match(PythonParser.CLASS);
        this.state = 356;
        this.typeName();
        this.state = 357;
        this.match(PythonParser.OPEN_BRACKET);
        this.state = 358;
        this.match(PythonParser.ENUM);
        this.state = 359;
        this.match(PythonParser.CLOSE_BRACKET);
        this.state = 360;
        this.match(PythonParser.COLON);
        this.state = 362;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 126) {
          {
            this.state = 361;
            this.commentText();
          }
        }

        this.state = 364;
        this.match(PythonParser.NL);
        this.state = 365;
        this.enumList();
        this.state = 366;
        this.match(PythonParser.NL);
        this.state = 367;
        this.match(PythonParser.END_ENUM);
        this.state = 369;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 108) {
          {
            this.state = 368;
            this.match(PythonParser.GHOSTED_BLOCK_END);
          }
        }

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
  public concreteClass(): ConcreteClassContext {
    let localContext = new ConcreteClassContext(this.context, this.state);
    this.enterRule(localContext, 22, PythonParser.RULE_concreteClass);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 374;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 107) {
          {
            this.state = 373;
            this.match(PythonParser.GHOSTED_BLOCK_START);
          }
        }

        this.state = 376;
        this.match(PythonParser.CLASS);
        this.state = 377;
        localContext._classTypeName = this.typeName();
        this.state = 382;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 78) {
          {
            this.state = 378;
            this.match(PythonParser.OPEN_BRACKET);
            this.state = 379;
            localContext._inheritsTypeName = this.typeName();
            this.state = 380;
            this.match(PythonParser.CLOSE_BRACKET);
          }
        }

        this.state = 384;
        this.match(PythonParser.COLON);
        this.state = 386;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 126) {
          {
            this.state = 385;
            this.commentText();
          }
        }

        this.state = 388;
        this.match(PythonParser.NL);
        this.state = 389;
        this.constructorMember();
        this.state = 393;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (
          _la === 44 ||
          (((_la - 96) & ~0x1f) === 0 && ((1 << (_la - 96)) & 1073744897) !== 0)
        ) {
          {
            {
              this.state = 390;
              this.concreteClassMember();
            }
          }
          this.state = 395;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 396;
        this.match(PythonParser.END_CLASS);
        this.state = 398;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 108) {
          {
            this.state = 397;
            this.match(PythonParser.GHOSTED_BLOCK_END);
          }
        }

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
  public concreteClassMember(): ConcreteClassMemberContext {
    let localContext = new ConcreteClassMemberContext(this.context, this.state);
    this.enterRule(localContext, 24, PythonParser.RULE_concreteClassMember);
    try {
      this.state = 406;
      this.errorHandler.sync(this);
      switch (this.interpreter.adaptivePredict(this.tokenStream, 34, this.context)) {
        case 1:
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 402;
            this.property();
          }
          break;
        case 2:
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 403;
            this.functionMethod();
          }
          break;
        case 3:
          this.enterOuterAlt(localContext, 3);
          {
            this.state = 404;
            this.procedureMethod();
          }
          break;
        case 4:
          this.enterOuterAlt(localContext, 4);
          {
            this.state = 405;
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
    this.enterRule(localContext, 26, PythonParser.RULE_abstractClass);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 409;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 107) {
          {
            this.state = 408;
            this.match(PythonParser.GHOSTED_BLOCK_START);
          }
        }

        this.state = 411;
        this.match(PythonParser.CLASS);
        this.state = 412;
        localContext._classTypeName = this.typeName();
        {
          this.state = 413;
          this.match(PythonParser.OPEN_BRACKET);
          this.state = 416;
          this.errorHandler.sync(this);
          switch (this.tokenStream.LA(1)) {
            case PythonParser.INT_NAME:
            case PythonParser.FLOAT_NAME:
            case PythonParser.BOOL_NAME:
            case PythonParser.STRING_NAME:
            case PythonParser.LIST_NAME:
            case PythonParser.NAME_STARTING_UC:
              {
                this.state = 414;
                localContext._inheritsTypeName = this.typeName();
              }
              break;
            case PythonParser.ABC:
              {
                this.state = 415;
                this.match(PythonParser.ABC);
              }
              break;
            default:
              throw new antlr.NoViableAltException(this);
          }
          this.state = 418;
          this.match(PythonParser.CLOSE_BRACKET);
        }
        this.state = 420;
        this.match(PythonParser.COLON);
        this.state = 422;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 126) {
          {
            this.state = 421;
            this.commentText();
          }
        }

        this.state = 424;
        this.match(PythonParser.NL);
        this.state = 428;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (
          _la === 44 ||
          (((_la - 96) & ~0x1f) === 0 && ((1 << (_la - 96)) & 1610615809) !== 0)
        ) {
          {
            {
              this.state = 425;
              this.abstractClassMember();
            }
          }
          this.state = 430;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 431;
        this.match(PythonParser.END_CLASS);
        this.state = 433;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 108) {
          {
            this.state = 432;
            this.match(PythonParser.GHOSTED_BLOCK_END);
          }
        }

        this.state = 435;
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
    this.enterRule(localContext, 28, PythonParser.RULE_abstractClassMember);
    try {
      this.state = 443;
      this.errorHandler.sync(this);
      switch (this.interpreter.adaptivePredict(this.tokenStream, 40, this.context)) {
        case 1:
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 437;
            this.property();
          }
          break;
        case 2:
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 438;
            this.functionMethod();
          }
          break;
        case 3:
          this.enterOuterAlt(localContext, 3);
          {
            this.state = 439;
            this.procedureMethod();
          }
          break;
        case 4:
          this.enterOuterAlt(localContext, 4);
          {
            this.state = 440;
            this.abstractFunction();
          }
          break;
        case 5:
          this.enterOuterAlt(localContext, 5);
          {
            this.state = 441;
            this.abstractProcedure();
          }
          break;
        case 6:
          this.enterOuterAlt(localContext, 6);
          {
            this.state = 442;
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
    this.enterRule(localContext, 30, PythonParser.RULE_comment);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 446;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 106) {
          {
            this.state = 445;
            this.match(PythonParser.GHOSTED_LINE);
          }
        }

        this.state = 448;
        this.commentText();
        this.state = 449;
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
    this.enterRule(localContext, 32, PythonParser.RULE_commentText);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 451;
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
    this.enterRule(localContext, 34, PythonParser.RULE_ordinaryStatement);
    try {
      this.state = 462;
      this.errorHandler.sync(this);
      switch (this.interpreter.adaptivePredict(this.tokenStream, 42, this.context)) {
        case 1:
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 453;
            this.variableDefinition();
          }
          break;
        case 2:
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 454;
            this.assignment();
          }
          break;
        case 3:
          this.enterOuterAlt(localContext, 3);
          {
            this.state = 455;
            this.ifStatement();
          }
          break;
        case 4:
          this.enterOuterAlt(localContext, 4);
          {
            this.state = 456;
            this.whileLoop();
          }
          break;
        case 5:
          this.enterOuterAlt(localContext, 5);
          {
            this.state = 457;
            this.forLoop();
          }
          break;
        case 6:
          this.enterOuterAlt(localContext, 6);
          {
            this.state = 458;
            this.procedureCall();
          }
          break;
        case 7:
          this.enterOuterAlt(localContext, 7);
          {
            this.state = 459;
            this.tryStatement();
          }
          break;
        case 8:
          this.enterOuterAlt(localContext, 8);
          {
            this.state = 460;
            this.throwStatement();
          }
          break;
        case 9:
          this.enterOuterAlt(localContext, 9);
          {
            this.state = 461;
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
    this.enterRule(localContext, 36, PythonParser.RULE_variableDefinition);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 465;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 106) {
          {
            this.state = 464;
            this.match(PythonParser.GHOSTED_LINE);
          }
        }

        this.state = 467;
        this.identifierDef();
        this.state = 468;
        this.match(PythonParser.SINGLE_EQUALS);
        this.state = 469;
        this.expression(0);
        this.state = 470;
        this.match(PythonParser.VARIABLE_DEFINITION_ANNOTATION);
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
  public assignment(): AssignmentContext {
    let localContext = new AssignmentContext(this.context, this.state);
    this.enterRule(localContext, 38, PythonParser.RULE_assignment);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 474;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 106) {
          {
            this.state = 473;
            this.match(PythonParser.GHOSTED_LINE);
          }
        }

        this.state = 476;
        this.assignable(0);
        this.state = 477;
        this.match(PythonParser.SINGLE_EQUALS);
        this.state = 478;
        this.expression(0);
        this.state = 479;
        this.match(PythonParser.ASSIGNMENT_ANNOTATION);
        this.state = 480;
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
    this.enterRule(localContext, 40, PythonParser.RULE_ifStatement);
    let _la: number;
    try {
      let alternative: number;
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 483;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 107) {
          {
            this.state = 482;
            this.match(PythonParser.GHOSTED_BLOCK_START);
          }
        }

        this.state = 485;
        this.match(PythonParser.IF);
        this.state = 486;
        localContext._condition = this.expression(0);
        this.state = 487;
        this.match(PythonParser.COLON);
        this.state = 489;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 126) {
          {
            this.state = 488;
            this.commentText();
          }
        }

        this.state = 491;
        this.match(PythonParser.NL);
        this.state = 492;
        this.thenClause();
        this.state = 496;
        this.errorHandler.sync(this);
        alternative = this.interpreter.adaptivePredict(this.tokenStream, 47, this.context);
        while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
          if (alternative === 1) {
            {
              {
                this.state = 493;
                this.elseIfClause();
              }
            }
          }
          this.state = 498;
          this.errorHandler.sync(this);
          alternative = this.interpreter.adaptivePredict(this.tokenStream, 47, this.context);
        }
        this.state = 500;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 3 || _la === 107) {
          {
            this.state = 499;
            this.elseClause();
          }
        }

        this.state = 502;
        this.match(PythonParser.END_IF);
        this.state = 504;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 108) {
          {
            this.state = 503;
            this.match(PythonParser.GHOSTED_BLOCK_END);
          }
        }

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
  public thenClause(): ThenClauseContext {
    let localContext = new ThenClauseContext(this.context, this.state);
    this.enterRule(localContext, 42, PythonParser.RULE_thenClause);
    try {
      let alternative: number;
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 511;
        this.errorHandler.sync(this);
        alternative = this.interpreter.adaptivePredict(this.tokenStream, 50, this.context);
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
          alternative = this.interpreter.adaptivePredict(this.tokenStream, 50, this.context);
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
    this.enterRule(localContext, 44, PythonParser.RULE_elseIfClause);
    let _la: number;
    try {
      let alternative: number;
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 515;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 107) {
          {
            this.state = 514;
            this.match(PythonParser.GHOSTED_BLOCK_START);
          }
        }

        this.state = 517;
        this.match(PythonParser.ELIF);
        this.state = 518;
        this.expression(0);
        this.state = 519;
        this.match(PythonParser.COLON);
        this.state = 521;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 126) {
          {
            this.state = 520;
            this.commentText();
          }
        }

        this.state = 523;
        this.match(PythonParser.NL);
        this.state = 527;
        this.errorHandler.sync(this);
        alternative = this.interpreter.adaptivePredict(this.tokenStream, 53, this.context);
        while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
          if (alternative === 1) {
            {
              {
                this.state = 524;
                this.ordinaryStatement();
              }
            }
          }
          this.state = 529;
          this.errorHandler.sync(this);
          alternative = this.interpreter.adaptivePredict(this.tokenStream, 53, this.context);
        }
        this.state = 531;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 108) {
          {
            this.state = 530;
            this.match(PythonParser.GHOSTED_BLOCK_END);
          }
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
    this.enterRule(localContext, 46, PythonParser.RULE_elseClause);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 534;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 107) {
          {
            this.state = 533;
            this.match(PythonParser.GHOSTED_BLOCK_START);
          }
        }

        this.state = 536;
        this.match(PythonParser.ELSE);
        this.state = 537;
        this.match(PythonParser.COLON);
        this.state = 539;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 126) {
          {
            this.state = 538;
            this.commentText();
          }
        }

        this.state = 541;
        this.match(PythonParser.NL);
        this.state = 545;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (
          ((_la & ~0x1f) === 0 && ((1 << _la) & 6192) !== 0) ||
          (((_la - 49) & ~0x1f) === 0 && ((1 << (_la - 49)) & 713038817) !== 0) ||
          (((_la - 96) & ~0x1f) === 0 && ((1 << (_la - 96)) & 1073745151) !== 0)
        ) {
          {
            {
              this.state = 542;
              this.ordinaryStatement();
            }
          }
          this.state = 547;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 549;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 108) {
          {
            this.state = 548;
            this.match(PythonParser.GHOSTED_BLOCK_END);
          }
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
    this.enterRule(localContext, 48, PythonParser.RULE_whileLoop);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 552;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 107) {
          {
            this.state = 551;
            this.match(PythonParser.GHOSTED_BLOCK_START);
          }
        }

        this.state = 554;
        this.match(PythonParser.WHILE);
        this.state = 555;
        this.expression(0);
        this.state = 556;
        this.match(PythonParser.COLON);
        this.state = 558;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 126) {
          {
            this.state = 557;
            this.commentText();
          }
        }

        this.state = 560;
        this.match(PythonParser.NL);
        this.state = 564;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (
          ((_la & ~0x1f) === 0 && ((1 << _la) & 6192) !== 0) ||
          (((_la - 49) & ~0x1f) === 0 && ((1 << (_la - 49)) & 713038817) !== 0) ||
          (((_la - 96) & ~0x1f) === 0 && ((1 << (_la - 96)) & 1073745151) !== 0)
        ) {
          {
            {
              this.state = 561;
              this.ordinaryStatement();
            }
          }
          this.state = 566;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 567;
        this.match(PythonParser.END_WHILE);
        this.state = 568;
        this.match(PythonParser.GHOSTED_BLOCK_END);
        this.state = 569;
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
    this.enterRule(localContext, 50, PythonParser.RULE_forLoop);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 572;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 107) {
          {
            this.state = 571;
            this.match(PythonParser.GHOSTED_BLOCK_START);
          }
        }

        this.state = 574;
        this.match(PythonParser.FOR);
        this.state = 575;
        this.identifierDef();
        this.state = 576;
        this.match(PythonParser.IN);
        this.state = 577;
        this.expression(0);
        this.state = 578;
        this.match(PythonParser.COLON);
        this.state = 580;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 126) {
          {
            this.state = 579;
            this.commentText();
          }
        }

        this.state = 582;
        this.match(PythonParser.NL);
        this.state = 586;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (
          ((_la & ~0x1f) === 0 && ((1 << _la) & 6192) !== 0) ||
          (((_la - 49) & ~0x1f) === 0 && ((1 << (_la - 49)) & 713038817) !== 0) ||
          (((_la - 96) & ~0x1f) === 0 && ((1 << (_la - 96)) & 1073745151) !== 0)
        ) {
          {
            {
              this.state = 583;
              this.ordinaryStatement();
            }
          }
          this.state = 588;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 589;
        this.match(PythonParser.END_FOR);
        this.state = 590;
        this.match(PythonParser.GHOSTED_BLOCK_END);
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
  public procedureCall(): ProcedureCallContext {
    let localContext = new ProcedureCallContext(this.context, this.state);
    this.enterRule(localContext, 52, PythonParser.RULE_procedureCall);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 594;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 106) {
          {
            this.state = 593;
            this.match(PythonParser.GHOSTED_LINE);
          }
        }

        this.state = 596;
        this.term(0);
        this.state = 598;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 126) {
          {
            this.state = 597;
            this.commentText();
          }
        }

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
  public tryStatement(): TryStatementContext {
    let localContext = new TryStatementContext(this.context, this.state);
    this.enterRule(localContext, 54, PythonParser.RULE_tryStatement);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 603;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 107) {
          {
            this.state = 602;
            this.match(PythonParser.GHOSTED_BLOCK_START);
          }
        }

        this.state = 605;
        this.match(PythonParser.TRY);
        this.state = 606;
        this.match(PythonParser.COLON);
        this.state = 608;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 126) {
          {
            this.state = 607;
            this.commentText();
          }
        }

        this.state = 610;
        this.match(PythonParser.NL);
        this.state = 611;
        this.tryClause();
        this.state = 613;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        do {
          {
            {
              this.state = 612;
              this.catchClause();
            }
          }
          this.state = 615;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        } while (_la === 45 || _la === 107);
        this.state = 617;
        this.match(PythonParser.END_TRY);
        this.state = 619;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 108) {
          {
            this.state = 618;
            this.match(PythonParser.GHOSTED_BLOCK_END);
          }
        }

        this.state = 621;
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
    this.enterRule(localContext, 56, PythonParser.RULE_tryClause);
    try {
      let alternative: number;
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 626;
        this.errorHandler.sync(this);
        alternative = this.interpreter.adaptivePredict(this.tokenStream, 71, this.context);
        while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
          if (alternative === 1) {
            {
              {
                this.state = 623;
                this.ordinaryStatement();
              }
            }
          }
          this.state = 628;
          this.errorHandler.sync(this);
          alternative = this.interpreter.adaptivePredict(this.tokenStream, 71, this.context);
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
    this.enterRule(localContext, 58, PythonParser.RULE_catchClause);
    let _la: number;
    try {
      let alternative: number;
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 630;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 107) {
          {
            this.state = 629;
            this.match(PythonParser.GHOSTED_BLOCK_START);
          }
        }

        this.state = 632;
        this.match(PythonParser.EXCEPT);
        this.state = 633;
        this.typeName();
        this.state = 634;
        this.match(PythonParser.AS);
        this.state = 635;
        this.identifierDef();
        this.state = 636;
        this.match(PythonParser.COLON);
        this.state = 638;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 126) {
          {
            this.state = 637;
            this.commentText();
          }
        }

        this.state = 640;
        this.match(PythonParser.NL);
        this.state = 644;
        this.errorHandler.sync(this);
        alternative = this.interpreter.adaptivePredict(this.tokenStream, 74, this.context);
        while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
          if (alternative === 1) {
            {
              {
                this.state = 641;
                this.ordinaryStatement();
              }
            }
          }
          this.state = 646;
          this.errorHandler.sync(this);
          alternative = this.interpreter.adaptivePredict(this.tokenStream, 74, this.context);
        }
        this.state = 648;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 108) {
          {
            this.state = 647;
            this.match(PythonParser.GHOSTED_BLOCK_END);
          }
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
    this.enterRule(localContext, 60, PythonParser.RULE_throwStatement);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 651;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 106) {
          {
            this.state = 650;
            this.match(PythonParser.GHOSTED_LINE);
          }
        }

        this.state = 653;
        this.match(PythonParser.RAISE);
        this.state = 654;
        this.typeName();
        this.state = 655;
        this.match(PythonParser.OPEN_BRACKET);
        this.state = 656;
        this.errorMessage();
        this.state = 657;
        this.match(PythonParser.CLOSE_BRACKET);
        this.state = 659;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 126) {
          {
            this.state = 658;
            this.commentText();
          }
        }

        this.state = 661;
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
    this.enterRule(localContext, 62, PythonParser.RULE_errorMessage);
    try {
      this.state = 665;
      this.errorHandler.sync(this);
      switch (this.tokenStream.LA(1)) {
        case PythonParser.LITERAL_STRING:
        case PythonParser.INTERPOLATED_STRING:
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 663;
            this.litString();
          }
          break;
        case PythonParser.NAME_STARTING_LC:
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 664;
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
    this.enterRule(localContext, 64, PythonParser.RULE_assert);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 668;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 106) {
          {
            this.state = 667;
            this.match(PythonParser.GHOSTED_LINE);
          }
        }

        this.state = 670;
        this.match(PythonParser.THIS_INSTANCE);
        this.state = 671;
        this.match(PythonParser.DOT);
        this.state = 672;
        this.match(PythonParser.ASSERT_EQUAL);
        this.state = 673;
        this.match(PythonParser.OPEN_BRACKET);
        this.state = 674;
        this.assertActual();
        this.state = 675;
        this.match(PythonParser.COMMA);
        this.state = 676;
        this.assertExpected();
        this.state = 677;
        this.match(PythonParser.CLOSE_BRACKET);
        this.state = 679;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 126) {
          {
            this.state = 678;
            this.commentText();
          }
        }

        this.state = 681;
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
    this.enterRule(localContext, 66, PythonParser.RULE_returnStatement);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 683;
        this.match(PythonParser.RETURN);
        this.state = 684;
        this.expression(0);
        this.state = 686;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 126) {
          {
            this.state = 685;
            this.commentText();
          }
        }

        this.state = 688;
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
    this.enterRule(localContext, 68, PythonParser.RULE_constructorMember);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 691;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 107) {
          {
            this.state = 690;
            this.match(PythonParser.GHOSTED_BLOCK_START);
          }
        }

        this.state = 693;
        this.match(PythonParser.DEF);
        this.state = 694;
        this.match(PythonParser.INIT);
        this.state = 695;
        this.match(PythonParser.OPEN_BRACKET);
        this.state = 697;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 72 || _la === 96) {
          {
            this.state = 696;
            this.paramList();
          }
        }

        this.state = 699;
        this.match(PythonParser.CLOSE_BRACKET);
        this.state = 700;
        this.match(PythonParser.ARROW);
        this.state = 701;
        this.match(PythonParser.NONE);
        this.state = 702;
        this.match(PythonParser.COLON);
        this.state = 704;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 126) {
          {
            this.state = 703;
            this.commentText();
          }
        }

        this.state = 707;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 108) {
          {
            this.state = 706;
            this.match(PythonParser.GHOSTED_BLOCK_END);
          }
        }

        this.state = 709;
        this.match(PythonParser.NL);
        this.state = 713;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (
          ((_la & ~0x1f) === 0 && ((1 << _la) & 6192) !== 0) ||
          (((_la - 49) & ~0x1f) === 0 && ((1 << (_la - 49)) & 713038817) !== 0) ||
          (((_la - 96) & ~0x1f) === 0 && ((1 << (_la - 96)) & 1073745151) !== 0)
        ) {
          {
            {
              this.state = 710;
              this.ordinaryStatement();
            }
          }
          this.state = 715;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 716;
        this.match(PythonParser.END_CONSTRUCTOR);
        this.state = 717;
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
    this.enterRule(localContext, 70, PythonParser.RULE_property);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 720;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 106) {
          {
            this.state = 719;
            this.match(PythonParser.GHOSTED_LINE);
          }
        }

        this.state = 722;
        this.identifierDef();
        this.state = 723;
        this.match(PythonParser.COLON);
        this.state = 724;
        this.type_();
        this.state = 726;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 126) {
          {
            this.state = 725;
            this.commentText();
          }
        }

        this.state = 728;
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
    this.enterRule(localContext, 72, PythonParser.RULE_functionMethod);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 731;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 107) {
          {
            this.state = 730;
            this.match(PythonParser.GHOSTED_BLOCK_START);
          }
        }

        this.state = 733;
        this.match(PythonParser.DEF);
        this.state = 734;
        this.methodName();
        this.state = 735;
        this.match(PythonParser.OPEN_BRACKET);
        this.state = 737;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 72 || _la === 96) {
          {
            this.state = 736;
            this.paramList();
          }
        }

        this.state = 739;
        this.match(PythonParser.CLOSE_BRACKET);
        this.state = 740;
        this.match(PythonParser.ARROW);
        this.state = 741;
        this.type_();
        this.state = 742;
        this.match(PythonParser.COLON);
        this.state = 744;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 126) {
          {
            this.state = 743;
            this.commentText();
          }
        }

        this.state = 746;
        this.match(PythonParser.NL);
        this.state = 750;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (
          ((_la & ~0x1f) === 0 && ((1 << _la) & 6192) !== 0) ||
          (((_la - 49) & ~0x1f) === 0 && ((1 << (_la - 49)) & 713038817) !== 0) ||
          (((_la - 96) & ~0x1f) === 0 && ((1 << (_la - 96)) & 1073745151) !== 0)
        ) {
          {
            {
              this.state = 747;
              this.ordinaryStatement();
            }
          }
          this.state = 752;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 753;
        this.returnStatement();
        this.state = 754;
        this.match(PythonParser.END_FUNCTION);
        this.state = 756;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 108) {
          {
            this.state = 755;
            this.match(PythonParser.GHOSTED_BLOCK_END);
          }
        }

        this.state = 758;
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
    this.enterRule(localContext, 74, PythonParser.RULE_procedureMethod);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 761;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 107) {
          {
            this.state = 760;
            this.match(PythonParser.GHOSTED_BLOCK_START);
          }
        }

        this.state = 763;
        this.match(PythonParser.DEF);
        this.state = 764;
        this.methodName();
        this.state = 765;
        this.match(PythonParser.OPEN_BRACKET);
        this.state = 767;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 72 || _la === 96) {
          {
            this.state = 766;
            this.paramList();
          }
        }

        this.state = 769;
        this.match(PythonParser.CLOSE_BRACKET);
        this.state = 770;
        this.match(PythonParser.ARROW);
        this.state = 771;
        this.match(PythonParser.NONE);
        this.state = 772;
        this.match(PythonParser.COLON);
        this.state = 774;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 126) {
          {
            this.state = 773;
            this.commentText();
          }
        }

        this.state = 776;
        this.match(PythonParser.NL);
        this.state = 780;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (
          ((_la & ~0x1f) === 0 && ((1 << _la) & 6192) !== 0) ||
          (((_la - 49) & ~0x1f) === 0 && ((1 << (_la - 49)) & 713038817) !== 0) ||
          (((_la - 96) & ~0x1f) === 0 && ((1 << (_la - 96)) & 1073745151) !== 0)
        ) {
          {
            {
              this.state = 777;
              this.ordinaryStatement();
            }
          }
          this.state = 782;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 783;
        this.match(PythonParser.END_PROCEDURE);
        this.state = 785;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 108) {
          {
            this.state = 784;
            this.match(PythonParser.GHOSTED_BLOCK_END);
          }
        }

        this.state = 787;
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
    this.enterRule(localContext, 76, PythonParser.RULE_abstractFunction);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 790;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 106) {
          {
            this.state = 789;
            this.match(PythonParser.GHOSTED_LINE);
          }
        }

        this.state = 792;
        this.match(PythonParser.ABSTRACT_METHOD);
        this.state = 793;
        this.match(PythonParser.NL);
        this.state = 794;
        this.match(PythonParser.DEF);
        this.state = 795;
        this.methodName();
        this.state = 796;
        this.match(PythonParser.OPEN_BRACKET);
        this.state = 798;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 72 || _la === 96) {
          {
            this.state = 797;
            this.paramList();
          }
        }

        this.state = 800;
        this.match(PythonParser.CLOSE_BRACKET);
        this.state = 801;
        this.match(PythonParser.ARROW);
        this.state = 802;
        this.type_();
        this.state = 803;
        this.match(PythonParser.COLON);
        this.state = 804;
        this.match(PythonParser.NL);
        this.state = 805;
        this.match(PythonParser.PASS);
        this.state = 807;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 126) {
          {
            this.state = 806;
            this.commentText();
          }
        }

        this.state = 809;
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
    this.enterRule(localContext, 78, PythonParser.RULE_abstractProcedure);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 812;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 106) {
          {
            this.state = 811;
            this.match(PythonParser.GHOSTED_LINE);
          }
        }

        this.state = 814;
        this.match(PythonParser.ABSTRACT_METHOD);
        this.state = 815;
        this.match(PythonParser.NL);
        this.state = 816;
        this.match(PythonParser.DEF);
        this.state = 817;
        this.methodName();
        this.state = 818;
        this.match(PythonParser.OPEN_BRACKET);
        this.state = 820;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 72 || _la === 96) {
          {
            this.state = 819;
            this.paramList();
          }
        }

        this.state = 822;
        this.match(PythonParser.CLOSE_BRACKET);
        this.state = 823;
        this.match(PythonParser.ARROW);
        this.state = 824;
        this.match(PythonParser.NONE);
        this.state = 825;
        this.match(PythonParser.COLON);
        this.state = 826;
        this.match(PythonParser.NL);
        this.state = 827;
        this.match(PythonParser.PASS);
        this.state = 829;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 126) {
          {
            this.state = 828;
            this.commentText();
          }
        }

        this.state = 831;
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
    this.enterRule(localContext, 80, PythonParser.RULE_identifierDef);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 833;
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
    this.enterRule(localContext, 82, PythonParser.RULE_identifierUse);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 835;
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
    let _startState = 84;
    this.enterRecursionRule(localContext, 84, PythonParser.RULE_assignable, _p);
    try {
      let alternative: number;
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 842;
        this.errorHandler.sync(this);
        switch (this.tokenStream.LA(1)) {
          case PythonParser.NAME_STARTING_LC:
            {
              localContext = new SimpleAssignableContext(localContext);
              this.context = localContext;
              previousContext = localContext;

              this.state = 838;
              this.identifierUse();
            }
            break;
          case PythonParser.THIS_INSTANCE:
            {
              localContext = new ThisAssignableContext(localContext);
              this.context = localContext;
              previousContext = localContext;
              this.state = 839;
              this.match(PythonParser.THIS_INSTANCE);
              this.state = 840;
              this.match(PythonParser.DOT);
              this.state = 841;
              this.identifierUse();
            }
            break;
          default:
            throw new antlr.NoViableAltException(this);
        }
        this.context!.stop = this.tokenStream.LT(-1);
        this.state = 848;
        this.errorHandler.sync(this);
        alternative = this.interpreter.adaptivePredict(this.tokenStream, 106, this.context);
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
                this.state = 844;
                if (!this.precpred(this.context, 1)) {
                  throw this.createFailedPredicateException("this.precpred(this.context, 1)");
                }
                this.state = 845;
                this.index();
              }
            }
          }
          this.state = 850;
          this.errorHandler.sync(this);
          alternative = this.interpreter.adaptivePredict(this.tokenStream, 106, this.context);
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
    this.enterRule(localContext, 86, PythonParser.RULE_methodName);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 851;
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
    this.enterRule(localContext, 88, PythonParser.RULE_testName);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 853;
        this.match(PythonParser.NAME_STARTING_LC_TEST_);
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
        this.errorHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localContext;
  }
  public testClassName(): TestClassNameContext {
    let localContext = new TestClassNameContext(this.context, this.state);
    this.enterRule(localContext, 90, PythonParser.RULE_testClassName);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 855;
        this.match(PythonParser.NAME_STARTING_UC_TEST_);
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
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
    this.enterRule(localContext, 92, PythonParser.RULE_typeName);
    try {
      this.state = 863;
      this.errorHandler.sync(this);
      switch (this.tokenStream.LA(1)) {
        case PythonParser.INT_NAME:
          localContext = new IntTypeNameContext(localContext);
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 857;
            this.match(PythonParser.INT_NAME);
          }
          break;
        case PythonParser.FLOAT_NAME:
          localContext = new FloatTypeNameContext(localContext);
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 858;
            this.match(PythonParser.FLOAT_NAME);
          }
          break;
        case PythonParser.BOOL_NAME:
          localContext = new BoolTypeNameContext(localContext);
          this.enterOuterAlt(localContext, 3);
          {
            this.state = 859;
            this.match(PythonParser.BOOL_NAME);
          }
          break;
        case PythonParser.STRING_NAME:
          localContext = new StringTypeNameContext(localContext);
          this.enterOuterAlt(localContext, 4);
          {
            this.state = 860;
            this.match(PythonParser.STRING_NAME);
          }
          break;
        case PythonParser.LIST_NAME:
          localContext = new ListTypeNameContext(localContext);
          this.enterOuterAlt(localContext, 5);
          {
            this.state = 861;
            this.match(PythonParser.LIST_NAME);
          }
          break;
        case PythonParser.NAME_STARTING_UC:
          localContext = new UdtTypeNameContext(localContext);
          this.enterOuterAlt(localContext, 6);
          {
            this.state = 862;
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
    this.enterRule(localContext, 94, PythonParser.RULE_constantValue);
    try {
      this.state = 869;
      this.errorHandler.sync(this);
      switch (this.tokenStream.LA(1)) {
        case PythonParser.TRUE:
        case PythonParser.FALSE:
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 865;
            this.litBoolean();
          }
          break;
        case PythonParser.LITERAL_BINARY:
        case PythonParser.LITERAL_HEX:
        case PythonParser.LITERAL_INTEGER:
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 866;
            this.litInt();
          }
          break;
        case PythonParser.LITERAL_FLOAT:
          this.enterOuterAlt(localContext, 3);
          {
            this.state = 867;
            this.litFloat();
          }
          break;
        case PythonParser.LITERAL_STRING:
        case PythonParser.INTERPOLATED_STRING:
          this.enterOuterAlt(localContext, 4);
          {
            this.state = 868;
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
    this.enterRule(localContext, 96, PythonParser.RULE_argList);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 871;
        this.argument();
        this.state = 876;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (_la === 81) {
          {
            {
              this.state = 872;
              this.match(PythonParser.COMMA);
              this.state = 873;
              this.argument();
            }
          }
          this.state = 878;
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
    this.enterRule(localContext, 98, PythonParser.RULE_argument);
    try {
      this.state = 881;
      this.errorHandler.sync(this);
      switch (this.tokenStream.LA(1)) {
        case PythonParser.LAMBDA:
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 879;
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
            this.state = 880;
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
    this.enterRule(localContext, 100, PythonParser.RULE_paramList);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 883;
        this.paramDef();
        this.state = 888;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (_la === 81) {
          {
            {
              this.state = 884;
              this.match(PythonParser.COMMA);
              this.state = 885;
              this.paramDef();
            }
          }
          this.state = 890;
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
    this.enterRule(localContext, 102, PythonParser.RULE_identifierList);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 891;
        this.identifierDef();
        this.state = 894;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        do {
          {
            {
              this.state = 892;
              this.match(PythonParser.COMMA);
              this.state = 893;
              this.identifierDef();
            }
          }
          this.state = 896;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        } while (_la === 81);
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
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
    this.enterRule(localContext, 104, PythonParser.RULE_expressionList);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 898;
        this.expression(0);
        this.state = 903;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (_la === 81) {
          {
            {
              this.state = 899;
              this.match(PythonParser.COMMA);
              this.state = 900;
              this.expression(0);
            }
          }
          this.state = 905;
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
  public enumDefValue(): EnumDefValueContext {
    let localContext = new EnumDefValueContext(this.context, this.state);
    this.enterRule(localContext, 106, PythonParser.RULE_enumDefValue);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 906;
        this.identifierDef();
        this.state = 907;
        this.match(PythonParser.SINGLE_EQUALS);
        this.state = 908;
        this.litInt();
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
        this.errorHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localContext;
  }
  public enumList(): EnumListContext {
    let localContext = new EnumListContext(this.context, this.state);
    this.enterRule(localContext, 108, PythonParser.RULE_enumList);
    try {
      let alternative: number;
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 910;
        this.enumDefValue();
        this.state = 915;
        this.errorHandler.sync(this);
        alternative = this.interpreter.adaptivePredict(this.tokenStream, 114, this.context);
        while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
          if (alternative === 1) {
            {
              {
                this.state = 911;
                this.match(PythonParser.NL);
                this.state = 912;
                this.enumDefValue();
              }
            }
          }
          this.state = 917;
          this.errorHandler.sync(this);
          alternative = this.interpreter.adaptivePredict(this.tokenStream, 114, this.context);
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
    this.enterRule(localContext, 110, PythonParser.RULE_type);
    try {
      this.state = 922;
      this.errorHandler.sync(this);
      switch (this.interpreter.adaptivePredict(this.tokenStream, 115, this.context)) {
        case 1:
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 918;
            this.typeTuple();
          }
          break;
        case 2:
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 919;
            this.typeName();
          }
          break;
        case 3:
          this.enterOuterAlt(localContext, 3);
          {
            this.state = 920;
            this.typeGeneric();
          }
          break;
        case 4:
          this.enterOuterAlt(localContext, 4);
          {
            this.state = 921;
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
    this.enterRule(localContext, 112, PythonParser.RULE_assertActual);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 924;
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
    this.enterRule(localContext, 114, PythonParser.RULE_assertExpected);
    try {
      this.state = 931;
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
            this.state = 926;
            this.litValue();
          }
          break;
        case PythonParser.OPEN_SQ_BRACKET:
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 927;
            this.list();
          }
          break;
        case PythonParser.OPEN_BRACE:
          this.enterOuterAlt(localContext, 3);
          {
            this.state = 928;
            this.dictionary();
          }
          break;
        case PythonParser.NOT:
        case PythonParser.MINUS:
          this.enterOuterAlt(localContext, 4);
          {
            this.state = 929;
            this.unaryExpression();
          }
          break;
        case PythonParser.OPEN_BRACKET:
          this.enterOuterAlt(localContext, 5);
          {
            this.state = 930;
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
    this.enterRule(localContext, 116, PythonParser.RULE_litValue);
    try {
      this.state = 939;
      this.errorHandler.sync(this);
      switch (this.interpreter.adaptivePredict(this.tokenStream, 117, this.context)) {
        case 1:
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 933;
            this.litBoolean();
          }
          break;
        case 2:
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 934;
            this.litInt();
          }
          break;
        case 3:
          this.enterOuterAlt(localContext, 3);
          {
            this.state = 935;
            this.litFloat();
          }
          break;
        case 4:
          this.enterOuterAlt(localContext, 4);
          {
            this.state = 936;
            this.litString();
          }
          break;
        case 5:
          this.enterOuterAlt(localContext, 5);
          {
            this.state = 937;
            this.interpolatedString();
          }
          break;
        case 6:
          this.enterOuterAlt(localContext, 6);
          {
            this.state = 938;
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
    this.enterRule(localContext, 118, PythonParser.RULE_litBoolean);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 941;
        _la = this.tokenStream.LA(1);
        if (!(_la === 60 || _la === 61)) {
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
    this.enterRule(localContext, 120, PythonParser.RULE_litInt);
    try {
      this.state = 946;
      this.errorHandler.sync(this);
      switch (this.tokenStream.LA(1)) {
        case PythonParser.LITERAL_INTEGER:
          localContext = new LitIntegerContext(localContext);
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 943;
            this.match(PythonParser.LITERAL_INTEGER);
          }
          break;
        case PythonParser.LITERAL_BINARY:
          localContext = new LitBinaryContext(localContext);
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 944;
            this.match(PythonParser.LITERAL_BINARY);
          }
          break;
        case PythonParser.LITERAL_HEX:
          localContext = new LitHexContext(localContext);
          this.enterOuterAlt(localContext, 3);
          {
            this.state = 945;
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
    this.enterRule(localContext, 122, PythonParser.RULE_litFloat);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 948;
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
    this.enterRule(localContext, 124, PythonParser.RULE_litString);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 950;
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
    this.enterRule(localContext, 126, PythonParser.RULE_enumValue);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 952;
        this.typeName();
        this.state = 953;
        this.match(PythonParser.DOT);
        this.state = 954;
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
    this.enterRule(localContext, 128, PythonParser.RULE_index);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 956;
        this.match(PythonParser.OPEN_SQ_BRACKET);
        this.state = 957;
        this.expression(0);
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
    let _startState = 130;
    this.enterRecursionRule(localContext, 130, PythonParser.RULE_expression, _p);
    let _la: number;
    try {
      let alternative: number;
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 965;
        this.errorHandler.sync(this);
        switch (this.interpreter.adaptivePredict(this.tokenStream, 119, this.context)) {
          case 1:
            {
              localContext = new NewInstanceExpressionContext(localContext);
              this.context = localContext;
              previousContext = localContext;

              this.state = 961;
              this.newInstance();
            }
            break;
          case 2:
            {
              localContext = new UnaryExpressionLabelContext(localContext);
              this.context = localContext;
              previousContext = localContext;
              this.state = 962;
              this.unaryExpression();
            }
            break;
          case 3:
            {
              localContext = new TermExpressionContext(localContext);
              this.context = localContext;
              previousContext = localContext;
              this.state = 963;
              this.term(0);
            }
            break;
          case 4:
            {
              localContext = new BinaryExpressionLabelContext(localContext);
              this.context = localContext;
              previousContext = localContext;
              this.state = 964;
              this.binaryExpression();
            }
            break;
        }
        this.context!.stop = this.tokenStream.LT(-1);
        this.state = 982;
        this.errorHandler.sync(this);
        alternative = this.interpreter.adaptivePredict(this.tokenStream, 121, this.context);
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
                this.state = 967;
                if (!this.precpred(this.context, 1)) {
                  throw this.createFailedPredicateException("this.precpred(this.context, 1)");
                }
                this.state = 968;
                this.match(PythonParser.IF);
                this.state = 969;
                (localContext as IfExpressionContext)._condition = this.expression(0);
                this.state = 974;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 2) {
                  {
                    {
                      this.state = 970;
                      this.match(PythonParser.ELIF);
                      this.state = 971;
                      (localContext as IfExpressionContext)._elifCondition = this.expression(0);
                    }
                  }
                  this.state = 976;
                  this.errorHandler.sync(this);
                  _la = this.tokenStream.LA(1);
                }
                this.state = 977;
                this.match(PythonParser.ELSE);
                this.state = 978;
                (localContext as IfExpressionContext)._falseExpr = this.expression(2);
              }
            }
          }
          this.state = 984;
          this.errorHandler.sync(this);
          alternative = this.interpreter.adaptivePredict(this.tokenStream, 121, this.context);
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
    let _startState = 132;
    this.enterRecursionRule(localContext, 132, PythonParser.RULE_term, _p);
    try {
      let alternative: number;
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 994;
        this.errorHandler.sync(this);
        switch (this.interpreter.adaptivePredict(this.tokenStream, 122, this.context)) {
          case 1:
            {
              localContext = new ThisInstanceTermContext(localContext);
              this.context = localContext;
              previousContext = localContext;

              this.state = 986;
              this.thisInstance();
            }
            break;
          case 2:
            {
              localContext = new BracketedExpressionTermContext(localContext);
              this.context = localContext;
              previousContext = localContext;
              this.state = 987;
              this.bracketedExpression();
            }
            break;
          case 3:
            {
              localContext = new LitValueTermContext(localContext);
              this.context = localContext;
              previousContext = localContext;
              this.state = 988;
              this.litValue();
            }
            break;
          case 4:
            {
              localContext = new ListTermContext(localContext);
              this.context = localContext;
              previousContext = localContext;
              this.state = 989;
              this.list();
            }
            break;
          case 5:
            {
              localContext = new DictionaryTermContext(localContext);
              this.context = localContext;
              previousContext = localContext;
              this.state = 990;
              this.dictionary();
            }
            break;
          case 6:
            {
              localContext = new TupleTermContext(localContext);
              this.context = localContext;
              previousContext = localContext;
              this.state = 991;
              this.tuple();
            }
            break;
          case 7:
            {
              localContext = new IdentifierUseTermContext(localContext);
              this.context = localContext;
              previousContext = localContext;
              this.state = 992;
              this.identifierUse();
            }
            break;
          case 8:
            {
              localContext = new MethodCallTermContext(localContext);
              this.context = localContext;
              previousContext = localContext;
              this.state = 993;
              this.methodCall();
            }
            break;
        }
        this.context!.stop = this.tokenStream.LT(-1);
        this.state = 1003;
        this.errorHandler.sync(this);
        alternative = this.interpreter.adaptivePredict(this.tokenStream, 124, this.context);
        while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
          if (alternative === 1) {
            if (this.parseListeners != null) {
              this.triggerExitRuleEvent();
            }
            previousContext = localContext;
            {
              this.state = 1001;
              this.errorHandler.sync(this);
              switch (this.interpreter.adaptivePredict(this.tokenStream, 123, this.context)) {
                case 1:
                  {
                    localContext = new IndexedTermContext(
                      new TermContext(parentContext, parentState),
                    );
                    this.pushNewRecursionContext(localContext, _startState, PythonParser.RULE_term);
                    this.state = 996;
                    if (!this.precpred(this.context, 2)) {
                      throw this.createFailedPredicateException("this.precpred(this.context, 2)");
                    }
                    this.state = 997;
                    this.index();
                  }
                  break;
                case 2:
                  {
                    localContext = new ChainableTermContext(
                      new TermContext(parentContext, parentState),
                    );
                    this.pushNewRecursionContext(localContext, _startState, PythonParser.RULE_term);
                    this.state = 998;
                    if (!this.precpred(this.context, 1)) {
                      throw this.createFailedPredicateException("this.precpred(this.context, 1)");
                    }
                    this.state = 999;
                    this.match(PythonParser.DOT);
                    this.state = 1000;
                    this.chainable();
                  }
                  break;
              }
            }
          }
          this.state = 1005;
          this.errorHandler.sync(this);
          alternative = this.interpreter.adaptivePredict(this.tokenStream, 124, this.context);
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
    this.enterRule(localContext, 134, PythonParser.RULE_chainable);
    try {
      this.state = 1008;
      this.errorHandler.sync(this);
      switch (this.interpreter.adaptivePredict(this.tokenStream, 125, this.context)) {
        case 1:
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 1006;
            this.identifierUse();
          }
          break;
        case 2:
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 1007;
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
    this.enterRule(localContext, 136, PythonParser.RULE_thisInstance);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 1010;
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
    this.enterRule(localContext, 138, PythonParser.RULE_bracketedExpression);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 1012;
        this.match(PythonParser.OPEN_BRACKET);
        this.state = 1013;
        this.expression(0);
        this.state = 1014;
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
    this.enterRule(localContext, 140, PythonParser.RULE_unaryExpression);
    try {
      this.state = 1018;
      this.errorHandler.sync(this);
      switch (this.tokenStream.LA(1)) {
        case PythonParser.MINUS:
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 1016;
            this.negateNumeric();
          }
          break;
        case PythonParser.NOT:
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 1017;
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
    this.enterRule(localContext, 142, PythonParser.RULE_negateNumeric);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 1020;
        this.match(PythonParser.MINUS);
        this.state = 1021;
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
    this.enterRule(localContext, 144, PythonParser.RULE_negateLogical);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 1023;
        this.match(PythonParser.NOT);
        this.state = 1024;
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
    this.enterRule(localContext, 146, PythonParser.RULE_binaryExpression);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 1026;
        localContext._left = this.term(0);
        this.state = 1027;
        this.binaryOperator();
        this.state = 1028;
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
    this.enterRule(localContext, 148, PythonParser.RULE_list);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 1030;
        this.match(PythonParser.OPEN_SQ_BRACKET);
        this.state = 1031;
        this.expressionList();
        this.state = 1032;
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
    this.enterRule(localContext, 150, PythonParser.RULE_tuple);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 1034;
        this.match(PythonParser.OPEN_BRACKET);
        this.state = 1035;
        this.expressionList();
        this.state = 1036;
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
    this.enterRule(localContext, 152, PythonParser.RULE_dictionary);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 1038;
        this.match(PythonParser.OPEN_BRACE);
        this.state = 1039;
        this.kvpList();
        this.state = 1040;
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
    this.enterRule(localContext, 154, PythonParser.RULE_kvpList);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 1042;
        this.kvp();
        this.state = 1047;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (_la === 81) {
          {
            {
              this.state = 1043;
              this.match(PythonParser.COMMA);
              this.state = 1044;
              this.kvp();
            }
          }
          this.state = 1049;
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
    this.enterRule(localContext, 156, PythonParser.RULE_kvp);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 1050;
        localContext._key = this.expression(0);
        this.state = 1051;
        this.match(PythonParser.COLON);
        this.state = 1052;
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
    this.enterRule(localContext, 158, PythonParser.RULE_methodCall);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 1054;
        this.methodName();
        this.state = 1055;
        this.match(PythonParser.OPEN_BRACKET);
        this.state = 1057;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (
          _la === 8 ||
          (((_la - 53) & ~0x1f) === 0 && ((1 << (_la - 53)) & 2192050687) !== 0) ||
          (((_la - 96) & ~0x1f) === 0 && ((1 << (_la - 96)) & 255) !== 0)
        ) {
          {
            this.state = 1056;
            this.argList();
          }
        }

        this.state = 1059;
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
    this.enterRule(localContext, 160, PythonParser.RULE_binaryOperator);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 1061;
        _la = this.tokenStream.LA(1);
        if (!(((_la - 62) & ~0x1f) === 0 && ((1 << (_la - 62)) & 534773947) !== 0)) {
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
    this.enterRule(localContext, 162, PythonParser.RULE_newInstance);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 1063;
        this.type_();
        this.state = 1064;
        this.match(PythonParser.OPEN_BRACKET);
        this.state = 1066;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (
          _la === 8 ||
          (((_la - 53) & ~0x1f) === 0 && ((1 << (_la - 53)) & 2192050687) !== 0) ||
          (((_la - 96) & ~0x1f) === 0 && ((1 << (_la - 96)) & 255) !== 0)
        ) {
          {
            this.state = 1065;
            this.argList();
          }
        }

        this.state = 1068;
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
    this.enterRule(localContext, 164, PythonParser.RULE_paramDef);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 1072;
        this.errorHandler.sync(this);
        switch (this.tokenStream.LA(1)) {
          case PythonParser.NAME_STARTING_LC:
            {
              this.state = 1070;
              this.identifierDef();
            }
            break;
          case PythonParser.THIS_INSTANCE:
            {
              this.state = 1071;
              this.match(PythonParser.THIS_INSTANCE);
            }
            break;
          default:
            throw new antlr.NoViableAltException(this);
        }
        this.state = 1074;
        this.match(PythonParser.COLON);
        this.state = 1075;
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
    this.enterRule(localContext, 166, PythonParser.RULE_typeGeneric);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 1077;
        this.typeName();
        this.state = 1078;
        this.match(PythonParser.OPEN_SQ_BRACKET);
        this.state = 1079;
        this.type_();
        this.state = 1084;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (_la === 81) {
          {
            {
              this.state = 1080;
              this.match(PythonParser.COMMA);
              this.state = 1081;
              this.type_();
            }
          }
          this.state = 1086;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 1087;
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
    this.enterRule(localContext, 168, PythonParser.RULE_typeFunc);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 1089;
        this.match(PythonParser.FUNC_NAME);
        this.state = 1090;
        this.match(PythonParser.OPEN_SQ_BRACKET);
        this.state = 1091;
        this.match(PythonParser.OPEN_SQ_BRACKET);
        this.state = 1092;
        this.type_();
        this.state = 1097;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (_la === 81) {
          {
            {
              this.state = 1093;
              this.match(PythonParser.COMMA);
              this.state = 1094;
              this.type_();
            }
          }
          this.state = 1099;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 1100;
        this.match(PythonParser.CLOSE_SQ_BRACKET);
        this.state = 1101;
        this.match(PythonParser.COMMA);
        this.state = 1102;
        this.type_();
        this.state = 1103;
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
    this.enterRule(localContext, 170, PythonParser.RULE_typeTuple);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 1105;
        this.match(PythonParser.TUPLE);
        this.state = 1106;
        this.match(PythonParser.OPEN_SQ_BRACKET);
        this.state = 1107;
        this.type_();
        this.state = 1110;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        do {
          {
            {
              this.state = 1108;
              this.match(PythonParser.COMMA);
              this.state = 1109;
              this.type_();
            }
          }
          this.state = 1112;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        } while (_la === 81);
        this.state = 1114;
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
    this.enterRule(localContext, 172, PythonParser.RULE_lambda);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 1116;
        this.match(PythonParser.LAMBDA);
        this.state = 1117;
        this.paramList();
        this.state = 1118;
        this.match(PythonParser.COLON);
        this.state = 1119;
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
    this.enterRule(localContext, 174, PythonParser.RULE_interpolatedString);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 1121;
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
      case 42:
        return this.assignable_sempred(localContext as AssignableContext, predIndex);
      case 65:
        return this.expression_sempred(localContext as ExpressionContext, predIndex);
      case 66:
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
    4, 1, 126, 1124, 2, 0, 7, 0, 2, 1, 7, 1, 2, 2, 7, 2, 2, 3, 7, 3, 2, 4, 7, 4, 2, 5, 7, 5, 2, 6,
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
    81, 7, 81, 2, 82, 7, 82, 2, 83, 7, 83, 2, 84, 7, 84, 2, 85, 7, 85, 2, 86, 7, 86, 2, 87, 7, 87,
    1, 0, 3, 0, 178, 8, 0, 1, 0, 5, 0, 181, 8, 0, 10, 0, 12, 0, 184, 9, 0, 1, 0, 3, 0, 187, 8, 0, 1,
    0, 5, 0, 190, 8, 0, 10, 0, 12, 0, 193, 9, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 3, 1, 206, 8, 1, 1, 2, 3, 2, 209, 8, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2,
    1, 2, 1, 2, 5, 2, 220, 8, 2, 10, 2, 12, 2, 223, 9, 2, 1, 2, 1, 2, 3, 2, 227, 8, 2, 1, 2, 1, 2,
    1, 3, 1, 3, 1, 3, 1, 3, 1, 4, 3, 4, 236, 8, 4, 1, 4, 1, 4, 1, 4, 1, 4, 3, 4, 242, 8, 4, 1, 4, 1,
    4, 1, 4, 1, 4, 1, 4, 3, 4, 249, 8, 4, 1, 4, 1, 4, 5, 4, 253, 8, 4, 10, 4, 12, 4, 256, 9, 4, 1,
    4, 1, 4, 1, 4, 3, 4, 261, 8, 4, 1, 4, 1, 4, 1, 5, 3, 5, 266, 8, 5, 1, 5, 1, 5, 1, 5, 1, 5, 1, 5,
    1, 5, 1, 5, 1, 5, 1, 5, 1, 5, 3, 5, 278, 8, 5, 1, 5, 1, 5, 1, 6, 3, 6, 283, 8, 6, 1, 6, 1, 6, 1,
    6, 1, 6, 1, 6, 1, 6, 1, 6, 1, 6, 1, 6, 1, 6, 1, 6, 3, 6, 296, 8, 6, 1, 6, 1, 6, 5, 6, 300, 8, 6,
    10, 6, 12, 6, 303, 9, 6, 1, 6, 1, 6, 1, 6, 1, 7, 1, 7, 1, 7, 3, 7, 311, 8, 7, 1, 8, 3, 8, 314,
    8, 8, 1, 8, 1, 8, 1, 8, 1, 8, 3, 8, 320, 8, 8, 1, 8, 1, 8, 1, 8, 1, 8, 1, 8, 3, 8, 327, 8, 8, 1,
    8, 1, 8, 5, 8, 331, 8, 8, 10, 8, 12, 8, 334, 9, 8, 1, 8, 1, 8, 3, 8, 338, 8, 8, 1, 8, 1, 8, 1,
    9, 3, 9, 343, 8, 9, 1, 9, 1, 9, 1, 9, 1, 9, 3, 9, 349, 8, 9, 1, 9, 1, 9, 1, 10, 3, 10, 354, 8,
    10, 1, 10, 1, 10, 1, 10, 1, 10, 1, 10, 1, 10, 1, 10, 3, 10, 363, 8, 10, 1, 10, 1, 10, 1, 10, 1,
    10, 1, 10, 3, 10, 370, 8, 10, 1, 10, 1, 10, 1, 11, 3, 11, 375, 8, 11, 1, 11, 1, 11, 1, 11, 1,
    11, 1, 11, 1, 11, 3, 11, 383, 8, 11, 1, 11, 1, 11, 3, 11, 387, 8, 11, 1, 11, 1, 11, 1, 11, 5,
    11, 392, 8, 11, 10, 11, 12, 11, 395, 9, 11, 1, 11, 1, 11, 3, 11, 399, 8, 11, 1, 11, 1, 11, 1,
    12, 1, 12, 1, 12, 1, 12, 3, 12, 407, 8, 12, 1, 13, 3, 13, 410, 8, 13, 1, 13, 1, 13, 1, 13, 1,
    13, 1, 13, 3, 13, 417, 8, 13, 1, 13, 1, 13, 1, 13, 1, 13, 3, 13, 423, 8, 13, 1, 13, 1, 13, 5,
    13, 427, 8, 13, 10, 13, 12, 13, 430, 9, 13, 1, 13, 1, 13, 3, 13, 434, 8, 13, 1, 13, 1, 13, 1,
    14, 1, 14, 1, 14, 1, 14, 1, 14, 1, 14, 3, 14, 444, 8, 14, 1, 15, 3, 15, 447, 8, 15, 1, 15, 1,
    15, 1, 15, 1, 16, 1, 16, 1, 17, 1, 17, 1, 17, 1, 17, 1, 17, 1, 17, 1, 17, 1, 17, 1, 17, 3, 17,
    463, 8, 17, 1, 18, 3, 18, 466, 8, 18, 1, 18, 1, 18, 1, 18, 1, 18, 1, 18, 1, 18, 1, 19, 3, 19,
    475, 8, 19, 1, 19, 1, 19, 1, 19, 1, 19, 1, 19, 1, 19, 1, 20, 3, 20, 484, 8, 20, 1, 20, 1, 20, 1,
    20, 1, 20, 3, 20, 490, 8, 20, 1, 20, 1, 20, 1, 20, 5, 20, 495, 8, 20, 10, 20, 12, 20, 498, 9,
    20, 1, 20, 3, 20, 501, 8, 20, 1, 20, 1, 20, 3, 20, 505, 8, 20, 1, 20, 1, 20, 1, 21, 5, 21, 510,
    8, 21, 10, 21, 12, 21, 513, 9, 21, 1, 22, 3, 22, 516, 8, 22, 1, 22, 1, 22, 1, 22, 1, 22, 3, 22,
    522, 8, 22, 1, 22, 1, 22, 5, 22, 526, 8, 22, 10, 22, 12, 22, 529, 9, 22, 1, 22, 3, 22, 532, 8,
    22, 1, 23, 3, 23, 535, 8, 23, 1, 23, 1, 23, 1, 23, 3, 23, 540, 8, 23, 1, 23, 1, 23, 5, 23, 544,
    8, 23, 10, 23, 12, 23, 547, 9, 23, 1, 23, 3, 23, 550, 8, 23, 1, 24, 3, 24, 553, 8, 24, 1, 24, 1,
    24, 1, 24, 1, 24, 3, 24, 559, 8, 24, 1, 24, 1, 24, 5, 24, 563, 8, 24, 10, 24, 12, 24, 566, 9,
    24, 1, 24, 1, 24, 1, 24, 1, 24, 1, 25, 3, 25, 573, 8, 25, 1, 25, 1, 25, 1, 25, 1, 25, 1, 25, 1,
    25, 3, 25, 581, 8, 25, 1, 25, 1, 25, 5, 25, 585, 8, 25, 10, 25, 12, 25, 588, 9, 25, 1, 25, 1,
    25, 1, 25, 1, 25, 1, 26, 3, 26, 595, 8, 26, 1, 26, 1, 26, 3, 26, 599, 8, 26, 1, 26, 1, 26, 1,
    27, 3, 27, 604, 8, 27, 1, 27, 1, 27, 1, 27, 3, 27, 609, 8, 27, 1, 27, 1, 27, 1, 27, 4, 27, 614,
    8, 27, 11, 27, 12, 27, 615, 1, 27, 1, 27, 3, 27, 620, 8, 27, 1, 27, 1, 27, 1, 28, 5, 28, 625, 8,
    28, 10, 28, 12, 28, 628, 9, 28, 1, 29, 3, 29, 631, 8, 29, 1, 29, 1, 29, 1, 29, 1, 29, 1, 29, 1,
    29, 3, 29, 639, 8, 29, 1, 29, 1, 29, 5, 29, 643, 8, 29, 10, 29, 12, 29, 646, 9, 29, 1, 29, 3,
    29, 649, 8, 29, 1, 30, 3, 30, 652, 8, 30, 1, 30, 1, 30, 1, 30, 1, 30, 1, 30, 1, 30, 3, 30, 660,
    8, 30, 1, 30, 1, 30, 1, 31, 1, 31, 3, 31, 666, 8, 31, 1, 32, 3, 32, 669, 8, 32, 1, 32, 1, 32, 1,
    32, 1, 32, 1, 32, 1, 32, 1, 32, 1, 32, 1, 32, 3, 32, 680, 8, 32, 1, 32, 1, 32, 1, 33, 1, 33, 1,
    33, 3, 33, 687, 8, 33, 1, 33, 1, 33, 1, 34, 3, 34, 692, 8, 34, 1, 34, 1, 34, 1, 34, 1, 34, 3,
    34, 698, 8, 34, 1, 34, 1, 34, 1, 34, 1, 34, 1, 34, 3, 34, 705, 8, 34, 1, 34, 3, 34, 708, 8, 34,
    1, 34, 1, 34, 5, 34, 712, 8, 34, 10, 34, 12, 34, 715, 9, 34, 1, 34, 1, 34, 1, 34, 1, 35, 3, 35,
    721, 8, 35, 1, 35, 1, 35, 1, 35, 1, 35, 3, 35, 727, 8, 35, 1, 35, 1, 35, 1, 36, 3, 36, 732, 8,
    36, 1, 36, 1, 36, 1, 36, 1, 36, 3, 36, 738, 8, 36, 1, 36, 1, 36, 1, 36, 1, 36, 1, 36, 3, 36,
    745, 8, 36, 1, 36, 1, 36, 5, 36, 749, 8, 36, 10, 36, 12, 36, 752, 9, 36, 1, 36, 1, 36, 1, 36, 3,
    36, 757, 8, 36, 1, 36, 1, 36, 1, 37, 3, 37, 762, 8, 37, 1, 37, 1, 37, 1, 37, 1, 37, 3, 37, 768,
    8, 37, 1, 37, 1, 37, 1, 37, 1, 37, 1, 37, 3, 37, 775, 8, 37, 1, 37, 1, 37, 5, 37, 779, 8, 37,
    10, 37, 12, 37, 782, 9, 37, 1, 37, 1, 37, 3, 37, 786, 8, 37, 1, 37, 1, 37, 1, 38, 3, 38, 791, 8,
    38, 1, 38, 1, 38, 1, 38, 1, 38, 1, 38, 1, 38, 3, 38, 799, 8, 38, 1, 38, 1, 38, 1, 38, 1, 38, 1,
    38, 1, 38, 1, 38, 3, 38, 808, 8, 38, 1, 38, 1, 38, 1, 39, 3, 39, 813, 8, 39, 1, 39, 1, 39, 1,
    39, 1, 39, 1, 39, 1, 39, 3, 39, 821, 8, 39, 1, 39, 1, 39, 1, 39, 1, 39, 1, 39, 1, 39, 1, 39, 3,
    39, 830, 8, 39, 1, 39, 1, 39, 1, 40, 1, 40, 1, 41, 1, 41, 1, 42, 1, 42, 1, 42, 1, 42, 1, 42, 3,
    42, 843, 8, 42, 1, 42, 1, 42, 5, 42, 847, 8, 42, 10, 42, 12, 42, 850, 9, 42, 1, 43, 1, 43, 1,
    44, 1, 44, 1, 45, 1, 45, 1, 46, 1, 46, 1, 46, 1, 46, 1, 46, 1, 46, 3, 46, 864, 8, 46, 1, 47, 1,
    47, 1, 47, 1, 47, 3, 47, 870, 8, 47, 1, 48, 1, 48, 1, 48, 5, 48, 875, 8, 48, 10, 48, 12, 48,
    878, 9, 48, 1, 49, 1, 49, 3, 49, 882, 8, 49, 1, 50, 1, 50, 1, 50, 5, 50, 887, 8, 50, 10, 50, 12,
    50, 890, 9, 50, 1, 51, 1, 51, 1, 51, 4, 51, 895, 8, 51, 11, 51, 12, 51, 896, 1, 52, 1, 52, 1,
    52, 5, 52, 902, 8, 52, 10, 52, 12, 52, 905, 9, 52, 1, 53, 1, 53, 1, 53, 1, 53, 1, 54, 1, 54, 1,
    54, 5, 54, 914, 8, 54, 10, 54, 12, 54, 917, 9, 54, 1, 55, 1, 55, 1, 55, 1, 55, 3, 55, 923, 8,
    55, 1, 56, 1, 56, 1, 57, 1, 57, 1, 57, 1, 57, 1, 57, 3, 57, 932, 8, 57, 1, 58, 1, 58, 1, 58, 1,
    58, 1, 58, 1, 58, 3, 58, 940, 8, 58, 1, 59, 1, 59, 1, 60, 1, 60, 1, 60, 3, 60, 947, 8, 60, 1,
    61, 1, 61, 1, 62, 1, 62, 1, 63, 1, 63, 1, 63, 1, 63, 1, 64, 1, 64, 1, 64, 1, 64, 1, 65, 1, 65,
    1, 65, 1, 65, 1, 65, 3, 65, 966, 8, 65, 1, 65, 1, 65, 1, 65, 1, 65, 1, 65, 5, 65, 973, 8, 65,
    10, 65, 12, 65, 976, 9, 65, 1, 65, 1, 65, 1, 65, 5, 65, 981, 8, 65, 10, 65, 12, 65, 984, 9, 65,
    1, 66, 1, 66, 1, 66, 1, 66, 1, 66, 1, 66, 1, 66, 1, 66, 1, 66, 3, 66, 995, 8, 66, 1, 66, 1, 66,
    1, 66, 1, 66, 1, 66, 5, 66, 1002, 8, 66, 10, 66, 12, 66, 1005, 9, 66, 1, 67, 1, 67, 3, 67, 1009,
    8, 67, 1, 68, 1, 68, 1, 69, 1, 69, 1, 69, 1, 69, 1, 70, 1, 70, 3, 70, 1019, 8, 70, 1, 71, 1, 71,
    1, 71, 1, 72, 1, 72, 1, 72, 1, 73, 1, 73, 1, 73, 1, 73, 1, 74, 1, 74, 1, 74, 1, 74, 1, 75, 1,
    75, 1, 75, 1, 75, 1, 76, 1, 76, 1, 76, 1, 76, 1, 77, 1, 77, 1, 77, 5, 77, 1046, 8, 77, 10, 77,
    12, 77, 1049, 9, 77, 1, 78, 1, 78, 1, 78, 1, 78, 1, 79, 1, 79, 1, 79, 3, 79, 1058, 8, 79, 1, 79,
    1, 79, 1, 80, 1, 80, 1, 81, 1, 81, 1, 81, 3, 81, 1067, 8, 81, 1, 81, 1, 81, 1, 82, 1, 82, 3, 82,
    1073, 8, 82, 1, 82, 1, 82, 1, 82, 1, 83, 1, 83, 1, 83, 1, 83, 1, 83, 5, 83, 1083, 8, 83, 10, 83,
    12, 83, 1086, 9, 83, 1, 83, 1, 83, 1, 84, 1, 84, 1, 84, 1, 84, 1, 84, 1, 84, 5, 84, 1096, 8, 84,
    10, 84, 12, 84, 1099, 9, 84, 1, 84, 1, 84, 1, 84, 1, 84, 1, 84, 1, 85, 1, 85, 1, 85, 1, 85, 1,
    85, 4, 85, 1111, 8, 85, 11, 85, 12, 85, 1112, 1, 85, 1, 85, 1, 86, 1, 86, 1, 86, 1, 86, 1, 86,
    1, 87, 1, 87, 1, 87, 0, 3, 84, 130, 132, 88, 0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26,
    28, 30, 32, 34, 36, 38, 40, 42, 44, 46, 48, 50, 52, 54, 56, 58, 60, 62, 64, 66, 68, 70, 72, 74,
    76, 78, 80, 82, 84, 86, 88, 90, 92, 94, 96, 98, 100, 102, 104, 106, 108, 110, 112, 114, 116,
    118, 120, 122, 124, 126, 128, 130, 132, 134, 136, 138, 140, 142, 144, 146, 148, 150, 152, 154,
    156, 158, 160, 162, 164, 166, 168, 170, 172, 174, 0, 3, 1, 0, 60, 61, 1, 0, 102, 103, 4, 0, 62,
    63, 65, 67, 69, 69, 83, 90, 1214, 0, 177, 1, 0, 0, 0, 2, 205, 1, 0, 0, 0, 4, 208, 1, 0, 0, 0, 6,
    230, 1, 0, 0, 0, 8, 235, 1, 0, 0, 0, 10, 265, 1, 0, 0, 0, 12, 282, 1, 0, 0, 0, 14, 310, 1, 0, 0,
    0, 16, 313, 1, 0, 0, 0, 18, 342, 1, 0, 0, 0, 20, 353, 1, 0, 0, 0, 22, 374, 1, 0, 0, 0, 24, 406,
    1, 0, 0, 0, 26, 409, 1, 0, 0, 0, 28, 443, 1, 0, 0, 0, 30, 446, 1, 0, 0, 0, 32, 451, 1, 0, 0, 0,
    34, 462, 1, 0, 0, 0, 36, 465, 1, 0, 0, 0, 38, 474, 1, 0, 0, 0, 40, 483, 1, 0, 0, 0, 42, 511, 1,
    0, 0, 0, 44, 515, 1, 0, 0, 0, 46, 534, 1, 0, 0, 0, 48, 552, 1, 0, 0, 0, 50, 572, 1, 0, 0, 0, 52,
    594, 1, 0, 0, 0, 54, 603, 1, 0, 0, 0, 56, 626, 1, 0, 0, 0, 58, 630, 1, 0, 0, 0, 60, 651, 1, 0,
    0, 0, 62, 665, 1, 0, 0, 0, 64, 668, 1, 0, 0, 0, 66, 683, 1, 0, 0, 0, 68, 691, 1, 0, 0, 0, 70,
    720, 1, 0, 0, 0, 72, 731, 1, 0, 0, 0, 74, 761, 1, 0, 0, 0, 76, 790, 1, 0, 0, 0, 78, 812, 1, 0,
    0, 0, 80, 833, 1, 0, 0, 0, 82, 835, 1, 0, 0, 0, 84, 842, 1, 0, 0, 0, 86, 851, 1, 0, 0, 0, 88,
    853, 1, 0, 0, 0, 90, 855, 1, 0, 0, 0, 92, 863, 1, 0, 0, 0, 94, 869, 1, 0, 0, 0, 96, 871, 1, 0,
    0, 0, 98, 881, 1, 0, 0, 0, 100, 883, 1, 0, 0, 0, 102, 891, 1, 0, 0, 0, 104, 898, 1, 0, 0, 0,
    106, 906, 1, 0, 0, 0, 108, 910, 1, 0, 0, 0, 110, 922, 1, 0, 0, 0, 112, 924, 1, 0, 0, 0, 114,
    931, 1, 0, 0, 0, 116, 939, 1, 0, 0, 0, 118, 941, 1, 0, 0, 0, 120, 946, 1, 0, 0, 0, 122, 948, 1,
    0, 0, 0, 124, 950, 1, 0, 0, 0, 126, 952, 1, 0, 0, 0, 128, 956, 1, 0, 0, 0, 130, 965, 1, 0, 0, 0,
    132, 994, 1, 0, 0, 0, 134, 1008, 1, 0, 0, 0, 136, 1010, 1, 0, 0, 0, 138, 1012, 1, 0, 0, 0, 140,
    1018, 1, 0, 0, 0, 142, 1020, 1, 0, 0, 0, 144, 1023, 1, 0, 0, 0, 146, 1026, 1, 0, 0, 0, 148,
    1030, 1, 0, 0, 0, 150, 1034, 1, 0, 0, 0, 152, 1038, 1, 0, 0, 0, 154, 1042, 1, 0, 0, 0, 156,
    1050, 1, 0, 0, 0, 158, 1054, 1, 0, 0, 0, 160, 1061, 1, 0, 0, 0, 162, 1063, 1, 0, 0, 0, 164,
    1072, 1, 0, 0, 0, 166, 1077, 1, 0, 0, 0, 168, 1089, 1, 0, 0, 0, 170, 1105, 1, 0, 0, 0, 172,
    1116, 1, 0, 0, 0, 174, 1121, 1, 0, 0, 0, 176, 178, 3, 30, 15, 0, 177, 176, 1, 0, 0, 0, 177, 178,
    1, 0, 0, 0, 178, 182, 1, 0, 0, 0, 179, 181, 3, 2, 1, 0, 180, 179, 1, 0, 0, 0, 181, 184, 1, 0, 0,
    0, 182, 180, 1, 0, 0, 0, 182, 183, 1, 0, 0, 0, 183, 186, 1, 0, 0, 0, 184, 182, 1, 0, 0, 0, 185,
    187, 3, 6, 3, 0, 186, 185, 1, 0, 0, 0, 186, 187, 1, 0, 0, 0, 187, 191, 1, 0, 0, 0, 188, 190, 5,
    93, 0, 0, 189, 188, 1, 0, 0, 0, 190, 193, 1, 0, 0, 0, 191, 189, 1, 0, 0, 0, 191, 192, 1, 0, 0,
    0, 192, 194, 1, 0, 0, 0, 193, 191, 1, 0, 0, 0, 194, 195, 5, 0, 0, 1, 195, 1, 1, 0, 0, 0, 196,
    206, 3, 4, 2, 0, 197, 206, 3, 8, 4, 0, 198, 206, 3, 10, 5, 0, 199, 206, 3, 16, 8, 0, 200, 206,
    3, 18, 9, 0, 201, 206, 3, 20, 10, 0, 202, 206, 3, 22, 11, 0, 203, 206, 3, 26, 13, 0, 204, 206,
    3, 30, 15, 0, 205, 196, 1, 0, 0, 0, 205, 197, 1, 0, 0, 0, 205, 198, 1, 0, 0, 0, 205, 199, 1, 0,
    0, 0, 205, 200, 1, 0, 0, 0, 205, 201, 1, 0, 0, 0, 205, 202, 1, 0, 0, 0, 205, 203, 1, 0, 0, 0,
    205, 204, 1, 0, 0, 0, 206, 3, 1, 0, 0, 0, 207, 209, 5, 107, 0, 0, 208, 207, 1, 0, 0, 0, 208,
    209, 1, 0, 0, 0, 209, 210, 1, 0, 0, 0, 210, 211, 5, 44, 0, 0, 211, 212, 5, 9, 0, 0, 212, 213, 5,
    78, 0, 0, 213, 214, 5, 79, 0, 0, 214, 215, 5, 68, 0, 0, 215, 216, 5, 47, 0, 0, 216, 217, 5, 82,
    0, 0, 217, 221, 5, 93, 0, 0, 218, 220, 3, 34, 17, 0, 219, 218, 1, 0, 0, 0, 220, 223, 1, 0, 0, 0,
    221, 219, 1, 0, 0, 0, 221, 222, 1, 0, 0, 0, 222, 224, 1, 0, 0, 0, 223, 221, 1, 0, 0, 0, 224,
    226, 5, 109, 0, 0, 225, 227, 5, 108, 0, 0, 226, 225, 1, 0, 0, 0, 226, 227, 1, 0, 0, 0, 227, 228,
    1, 0, 0, 0, 228, 229, 5, 93, 0, 0, 229, 5, 1, 0, 0, 0, 230, 231, 5, 9, 0, 0, 231, 232, 5, 78, 0,
    0, 232, 233, 5, 79, 0, 0, 233, 7, 1, 0, 0, 0, 234, 236, 5, 107, 0, 0, 235, 234, 1, 0, 0, 0, 235,
    236, 1, 0, 0, 0, 236, 237, 1, 0, 0, 0, 237, 238, 5, 44, 0, 0, 238, 239, 3, 86, 43, 0, 239, 241,
    5, 78, 0, 0, 240, 242, 3, 100, 50, 0, 241, 240, 1, 0, 0, 0, 241, 242, 1, 0, 0, 0, 242, 243, 1,
    0, 0, 0, 243, 244, 5, 79, 0, 0, 244, 245, 5, 68, 0, 0, 245, 246, 3, 110, 55, 0, 246, 248, 5, 82,
    0, 0, 247, 249, 3, 32, 16, 0, 248, 247, 1, 0, 0, 0, 248, 249, 1, 0, 0, 0, 249, 250, 1, 0, 0, 0,
    250, 254, 5, 93, 0, 0, 251, 253, 3, 34, 17, 0, 252, 251, 1, 0, 0, 0, 253, 256, 1, 0, 0, 0, 254,
    252, 1, 0, 0, 0, 254, 255, 1, 0, 0, 0, 255, 257, 1, 0, 0, 0, 256, 254, 1, 0, 0, 0, 257, 258, 3,
    66, 33, 0, 258, 260, 5, 110, 0, 0, 259, 261, 5, 108, 0, 0, 260, 259, 1, 0, 0, 0, 260, 261, 1, 0,
    0, 0, 261, 262, 1, 0, 0, 0, 262, 263, 5, 93, 0, 0, 263, 9, 1, 0, 0, 0, 264, 266, 5, 107, 0, 0,
    265, 264, 1, 0, 0, 0, 265, 266, 1, 0, 0, 0, 266, 267, 1, 0, 0, 0, 267, 268, 5, 1, 0, 0, 268,
    269, 3, 90, 45, 0, 269, 270, 5, 78, 0, 0, 270, 271, 5, 52, 0, 0, 271, 272, 5, 79, 0, 0, 272,
    273, 5, 82, 0, 0, 273, 274, 5, 93, 0, 0, 274, 275, 3, 12, 6, 0, 275, 277, 5, 112, 0, 0, 276,
    278, 5, 108, 0, 0, 277, 276, 1, 0, 0, 0, 277, 278, 1, 0, 0, 0, 278, 279, 1, 0, 0, 0, 279, 280,
    5, 93, 0, 0, 280, 11, 1, 0, 0, 0, 281, 283, 5, 107, 0, 0, 282, 281, 1, 0, 0, 0, 282, 283, 1, 0,
    0, 0, 283, 284, 1, 0, 0, 0, 284, 285, 5, 44, 0, 0, 285, 286, 3, 88, 44, 0, 286, 287, 5, 78, 0,
    0, 287, 288, 5, 72, 0, 0, 288, 289, 5, 82, 0, 0, 289, 290, 3, 90, 45, 0, 290, 291, 5, 79, 0, 0,
    291, 292, 5, 68, 0, 0, 292, 293, 5, 47, 0, 0, 293, 295, 5, 82, 0, 0, 294, 296, 3, 32, 16, 0,
    295, 294, 1, 0, 0, 0, 295, 296, 1, 0, 0, 0, 296, 297, 1, 0, 0, 0, 297, 301, 5, 93, 0, 0, 298,
    300, 3, 14, 7, 0, 299, 298, 1, 0, 0, 0, 300, 303, 1, 0, 0, 0, 301, 299, 1, 0, 0, 0, 301, 302, 1,
    0, 0, 0, 302, 304, 1, 0, 0, 0, 303, 301, 1, 0, 0, 0, 304, 305, 5, 111, 0, 0, 305, 306, 5, 93, 0,
    0, 306, 13, 1, 0, 0, 0, 307, 311, 3, 64, 32, 0, 308, 311, 3, 36, 18, 0, 309, 311, 3, 30, 15, 0,
    310, 307, 1, 0, 0, 0, 310, 308, 1, 0, 0, 0, 310, 309, 1, 0, 0, 0, 311, 15, 1, 0, 0, 0, 312, 314,
    5, 107, 0, 0, 313, 312, 1, 0, 0, 0, 313, 314, 1, 0, 0, 0, 314, 315, 1, 0, 0, 0, 315, 316, 5, 44,
    0, 0, 316, 317, 3, 86, 43, 0, 317, 319, 5, 78, 0, 0, 318, 320, 3, 100, 50, 0, 319, 318, 1, 0, 0,
    0, 319, 320, 1, 0, 0, 0, 320, 321, 1, 0, 0, 0, 321, 322, 5, 79, 0, 0, 322, 323, 5, 68, 0, 0,
    323, 324, 5, 47, 0, 0, 324, 326, 5, 82, 0, 0, 325, 327, 3, 32, 16, 0, 326, 325, 1, 0, 0, 0, 326,
    327, 1, 0, 0, 0, 327, 328, 1, 0, 0, 0, 328, 332, 5, 93, 0, 0, 329, 331, 3, 34, 17, 0, 330, 329,
    1, 0, 0, 0, 331, 334, 1, 0, 0, 0, 332, 330, 1, 0, 0, 0, 332, 333, 1, 0, 0, 0, 333, 335, 1, 0, 0,
    0, 334, 332, 1, 0, 0, 0, 335, 337, 5, 113, 0, 0, 336, 338, 5, 108, 0, 0, 337, 336, 1, 0, 0, 0,
    337, 338, 1, 0, 0, 0, 338, 339, 1, 0, 0, 0, 339, 340, 5, 93, 0, 0, 340, 17, 1, 0, 0, 0, 341,
    343, 5, 106, 0, 0, 342, 341, 1, 0, 0, 0, 342, 343, 1, 0, 0, 0, 343, 344, 1, 0, 0, 0, 344, 345,
    3, 80, 40, 0, 345, 346, 5, 73, 0, 0, 346, 348, 3, 94, 47, 0, 347, 349, 3, 32, 16, 0, 348, 347,
    1, 0, 0, 0, 348, 349, 1, 0, 0, 0, 349, 350, 1, 0, 0, 0, 350, 351, 5, 93, 0, 0, 351, 19, 1, 0, 0,
    0, 352, 354, 5, 107, 0, 0, 353, 352, 1, 0, 0, 0, 353, 354, 1, 0, 0, 0, 354, 355, 1, 0, 0, 0,
    355, 356, 5, 1, 0, 0, 356, 357, 3, 92, 46, 0, 357, 358, 5, 78, 0, 0, 358, 359, 5, 51, 0, 0, 359,
    360, 5, 79, 0, 0, 360, 362, 5, 82, 0, 0, 361, 363, 3, 32, 16, 0, 362, 361, 1, 0, 0, 0, 362, 363,
    1, 0, 0, 0, 363, 364, 1, 0, 0, 0, 364, 365, 5, 93, 0, 0, 365, 366, 3, 108, 54, 0, 366, 367, 5,
    93, 0, 0, 367, 369, 5, 114, 0, 0, 368, 370, 5, 108, 0, 0, 369, 368, 1, 0, 0, 0, 369, 370, 1, 0,
    0, 0, 370, 371, 1, 0, 0, 0, 371, 372, 5, 93, 0, 0, 372, 21, 1, 0, 0, 0, 373, 375, 5, 107, 0, 0,
    374, 373, 1, 0, 0, 0, 374, 375, 1, 0, 0, 0, 375, 376, 1, 0, 0, 0, 376, 377, 5, 1, 0, 0, 377,
    382, 3, 92, 46, 0, 378, 379, 5, 78, 0, 0, 379, 380, 3, 92, 46, 0, 380, 381, 5, 79, 0, 0, 381,
    383, 1, 0, 0, 0, 382, 378, 1, 0, 0, 0, 382, 383, 1, 0, 0, 0, 383, 384, 1, 0, 0, 0, 384, 386, 5,
    82, 0, 0, 385, 387, 3, 32, 16, 0, 386, 385, 1, 0, 0, 0, 386, 387, 1, 0, 0, 0, 387, 388, 1, 0, 0,
    0, 388, 389, 5, 93, 0, 0, 389, 393, 3, 68, 34, 0, 390, 392, 3, 24, 12, 0, 391, 390, 1, 0, 0, 0,
    392, 395, 1, 0, 0, 0, 393, 391, 1, 0, 0, 0, 393, 394, 1, 0, 0, 0, 394, 396, 1, 0, 0, 0, 395,
    393, 1, 0, 0, 0, 396, 398, 5, 115, 0, 0, 397, 399, 5, 108, 0, 0, 398, 397, 1, 0, 0, 0, 398, 399,
    1, 0, 0, 0, 399, 400, 1, 0, 0, 0, 400, 401, 5, 93, 0, 0, 401, 23, 1, 0, 0, 0, 402, 407, 3, 70,
    35, 0, 403, 407, 3, 72, 36, 0, 404, 407, 3, 74, 37, 0, 405, 407, 3, 30, 15, 0, 406, 402, 1, 0,
    0, 0, 406, 403, 1, 0, 0, 0, 406, 404, 1, 0, 0, 0, 406, 405, 1, 0, 0, 0, 407, 25, 1, 0, 0, 0,
    408, 410, 5, 107, 0, 0, 409, 408, 1, 0, 0, 0, 409, 410, 1, 0, 0, 0, 410, 411, 1, 0, 0, 0, 411,
    412, 5, 1, 0, 0, 412, 413, 3, 92, 46, 0, 413, 416, 5, 78, 0, 0, 414, 417, 3, 92, 46, 0, 415,
    417, 5, 50, 0, 0, 416, 414, 1, 0, 0, 0, 416, 415, 1, 0, 0, 0, 417, 418, 1, 0, 0, 0, 418, 419, 5,
    79, 0, 0, 419, 420, 1, 0, 0, 0, 420, 422, 5, 82, 0, 0, 421, 423, 3, 32, 16, 0, 422, 421, 1, 0,
    0, 0, 422, 423, 1, 0, 0, 0, 423, 424, 1, 0, 0, 0, 424, 428, 5, 93, 0, 0, 425, 427, 3, 28, 14, 0,
    426, 425, 1, 0, 0, 0, 427, 430, 1, 0, 0, 0, 428, 426, 1, 0, 0, 0, 428, 429, 1, 0, 0, 0, 429,
    431, 1, 0, 0, 0, 430, 428, 1, 0, 0, 0, 431, 433, 5, 115, 0, 0, 432, 434, 5, 108, 0, 0, 433, 432,
    1, 0, 0, 0, 433, 434, 1, 0, 0, 0, 434, 435, 1, 0, 0, 0, 435, 436, 5, 93, 0, 0, 436, 27, 1, 0, 0,
    0, 437, 444, 3, 70, 35, 0, 438, 444, 3, 72, 36, 0, 439, 444, 3, 74, 37, 0, 440, 444, 3, 76, 38,
    0, 441, 444, 3, 78, 39, 0, 442, 444, 3, 30, 15, 0, 443, 437, 1, 0, 0, 0, 443, 438, 1, 0, 0, 0,
    443, 439, 1, 0, 0, 0, 443, 440, 1, 0, 0, 0, 443, 441, 1, 0, 0, 0, 443, 442, 1, 0, 0, 0, 444, 29,
    1, 0, 0, 0, 445, 447, 5, 106, 0, 0, 446, 445, 1, 0, 0, 0, 446, 447, 1, 0, 0, 0, 447, 448, 1, 0,
    0, 0, 448, 449, 3, 32, 16, 0, 449, 450, 5, 93, 0, 0, 450, 31, 1, 0, 0, 0, 451, 452, 5, 126, 0,
    0, 452, 33, 1, 0, 0, 0, 453, 463, 3, 36, 18, 0, 454, 463, 3, 38, 19, 0, 455, 463, 3, 40, 20, 0,
    456, 463, 3, 48, 24, 0, 457, 463, 3, 50, 25, 0, 458, 463, 3, 52, 26, 0, 459, 463, 3, 54, 27, 0,
    460, 463, 3, 60, 30, 0, 461, 463, 3, 30, 15, 0, 462, 453, 1, 0, 0, 0, 462, 454, 1, 0, 0, 0, 462,
    455, 1, 0, 0, 0, 462, 456, 1, 0, 0, 0, 462, 457, 1, 0, 0, 0, 462, 458, 1, 0, 0, 0, 462, 459, 1,
    0, 0, 0, 462, 460, 1, 0, 0, 0, 462, 461, 1, 0, 0, 0, 463, 35, 1, 0, 0, 0, 464, 466, 5, 106, 0,
    0, 465, 464, 1, 0, 0, 0, 465, 466, 1, 0, 0, 0, 466, 467, 1, 0, 0, 0, 467, 468, 3, 80, 40, 0,
    468, 469, 5, 73, 0, 0, 469, 470, 3, 130, 65, 0, 470, 471, 5, 124, 0, 0, 471, 472, 5, 93, 0, 0,
    472, 37, 1, 0, 0, 0, 473, 475, 5, 106, 0, 0, 474, 473, 1, 0, 0, 0, 474, 475, 1, 0, 0, 0, 475,
    476, 1, 0, 0, 0, 476, 477, 3, 84, 42, 0, 477, 478, 5, 73, 0, 0, 478, 479, 3, 130, 65, 0, 479,
    480, 5, 123, 0, 0, 480, 481, 5, 93, 0, 0, 481, 39, 1, 0, 0, 0, 482, 484, 5, 107, 0, 0, 483, 482,
    1, 0, 0, 0, 483, 484, 1, 0, 0, 0, 484, 485, 1, 0, 0, 0, 485, 486, 5, 5, 0, 0, 486, 487, 3, 130,
    65, 0, 487, 489, 5, 82, 0, 0, 488, 490, 3, 32, 16, 0, 489, 488, 1, 0, 0, 0, 489, 490, 1, 0, 0,
    0, 490, 491, 1, 0, 0, 0, 491, 492, 5, 93, 0, 0, 492, 496, 3, 42, 21, 0, 493, 495, 3, 44, 22, 0,
    494, 493, 1, 0, 0, 0, 495, 498, 1, 0, 0, 0, 496, 494, 1, 0, 0, 0, 496, 497, 1, 0, 0, 0, 497,
    500, 1, 0, 0, 0, 498, 496, 1, 0, 0, 0, 499, 501, 3, 46, 23, 0, 500, 499, 1, 0, 0, 0, 500, 501,
    1, 0, 0, 0, 501, 502, 1, 0, 0, 0, 502, 504, 5, 116, 0, 0, 503, 505, 5, 108, 0, 0, 504, 503, 1,
    0, 0, 0, 504, 505, 1, 0, 0, 0, 505, 506, 1, 0, 0, 0, 506, 507, 5, 93, 0, 0, 507, 41, 1, 0, 0, 0,
    508, 510, 3, 34, 17, 0, 509, 508, 1, 0, 0, 0, 510, 513, 1, 0, 0, 0, 511, 509, 1, 0, 0, 0, 511,
    512, 1, 0, 0, 0, 512, 43, 1, 0, 0, 0, 513, 511, 1, 0, 0, 0, 514, 516, 5, 107, 0, 0, 515, 514, 1,
    0, 0, 0, 515, 516, 1, 0, 0, 0, 516, 517, 1, 0, 0, 0, 517, 518, 5, 2, 0, 0, 518, 519, 3, 130, 65,
    0, 519, 521, 5, 82, 0, 0, 520, 522, 3, 32, 16, 0, 521, 520, 1, 0, 0, 0, 521, 522, 1, 0, 0, 0,
    522, 523, 1, 0, 0, 0, 523, 527, 5, 93, 0, 0, 524, 526, 3, 34, 17, 0, 525, 524, 1, 0, 0, 0, 526,
    529, 1, 0, 0, 0, 527, 525, 1, 0, 0, 0, 527, 528, 1, 0, 0, 0, 528, 531, 1, 0, 0, 0, 529, 527, 1,
    0, 0, 0, 530, 532, 5, 108, 0, 0, 531, 530, 1, 0, 0, 0, 531, 532, 1, 0, 0, 0, 532, 45, 1, 0, 0,
    0, 533, 535, 5, 107, 0, 0, 534, 533, 1, 0, 0, 0, 534, 535, 1, 0, 0, 0, 535, 536, 1, 0, 0, 0,
    536, 537, 5, 3, 0, 0, 537, 539, 5, 82, 0, 0, 538, 540, 3, 32, 16, 0, 539, 538, 1, 0, 0, 0, 539,
    540, 1, 0, 0, 0, 540, 541, 1, 0, 0, 0, 541, 545, 5, 93, 0, 0, 542, 544, 3, 34, 17, 0, 543, 542,
    1, 0, 0, 0, 544, 547, 1, 0, 0, 0, 545, 543, 1, 0, 0, 0, 545, 546, 1, 0, 0, 0, 546, 549, 1, 0, 0,
    0, 547, 545, 1, 0, 0, 0, 548, 550, 5, 108, 0, 0, 549, 548, 1, 0, 0, 0, 549, 550, 1, 0, 0, 0,
    550, 47, 1, 0, 0, 0, 551, 553, 5, 107, 0, 0, 552, 551, 1, 0, 0, 0, 552, 553, 1, 0, 0, 0, 553,
    554, 1, 0, 0, 0, 554, 555, 5, 12, 0, 0, 555, 556, 3, 130, 65, 0, 556, 558, 5, 82, 0, 0, 557,
    559, 3, 32, 16, 0, 558, 557, 1, 0, 0, 0, 558, 559, 1, 0, 0, 0, 559, 560, 1, 0, 0, 0, 560, 564,
    5, 93, 0, 0, 561, 563, 3, 34, 17, 0, 562, 561, 1, 0, 0, 0, 563, 566, 1, 0, 0, 0, 564, 562, 1, 0,
    0, 0, 564, 565, 1, 0, 0, 0, 565, 567, 1, 0, 0, 0, 566, 564, 1, 0, 0, 0, 567, 568, 5, 117, 0, 0,
    568, 569, 5, 108, 0, 0, 569, 570, 5, 93, 0, 0, 570, 49, 1, 0, 0, 0, 571, 573, 5, 107, 0, 0, 572,
    571, 1, 0, 0, 0, 572, 573, 1, 0, 0, 0, 573, 574, 1, 0, 0, 0, 574, 575, 5, 4, 0, 0, 575, 576, 3,
    80, 40, 0, 576, 577, 5, 6, 0, 0, 577, 578, 3, 130, 65, 0, 578, 580, 5, 82, 0, 0, 579, 581, 3,
    32, 16, 0, 580, 579, 1, 0, 0, 0, 580, 581, 1, 0, 0, 0, 581, 582, 1, 0, 0, 0, 582, 586, 5, 93, 0,
    0, 583, 585, 3, 34, 17, 0, 584, 583, 1, 0, 0, 0, 585, 588, 1, 0, 0, 0, 586, 584, 1, 0, 0, 0,
    586, 587, 1, 0, 0, 0, 587, 589, 1, 0, 0, 0, 588, 586, 1, 0, 0, 0, 589, 590, 5, 118, 0, 0, 590,
    591, 5, 108, 0, 0, 591, 592, 5, 93, 0, 0, 592, 51, 1, 0, 0, 0, 593, 595, 5, 106, 0, 0, 594, 593,
    1, 0, 0, 0, 594, 595, 1, 0, 0, 0, 595, 596, 1, 0, 0, 0, 596, 598, 3, 132, 66, 0, 597, 599, 3,
    32, 16, 0, 598, 597, 1, 0, 0, 0, 598, 599, 1, 0, 0, 0, 599, 600, 1, 0, 0, 0, 600, 601, 5, 93, 0,
    0, 601, 53, 1, 0, 0, 0, 602, 604, 5, 107, 0, 0, 603, 602, 1, 0, 0, 0, 603, 604, 1, 0, 0, 0, 604,
    605, 1, 0, 0, 0, 605, 606, 5, 11, 0, 0, 606, 608, 5, 82, 0, 0, 607, 609, 3, 32, 16, 0, 608, 607,
    1, 0, 0, 0, 608, 609, 1, 0, 0, 0, 609, 610, 1, 0, 0, 0, 610, 611, 5, 93, 0, 0, 611, 613, 3, 56,
    28, 0, 612, 614, 3, 58, 29, 0, 613, 612, 1, 0, 0, 0, 614, 615, 1, 0, 0, 0, 615, 613, 1, 0, 0, 0,
    615, 616, 1, 0, 0, 0, 616, 617, 1, 0, 0, 0, 617, 619, 5, 119, 0, 0, 618, 620, 5, 108, 0, 0, 619,
    618, 1, 0, 0, 0, 619, 620, 1, 0, 0, 0, 620, 621, 1, 0, 0, 0, 621, 622, 5, 93, 0, 0, 622, 55, 1,
    0, 0, 0, 623, 625, 3, 34, 17, 0, 624, 623, 1, 0, 0, 0, 625, 628, 1, 0, 0, 0, 626, 624, 1, 0, 0,
    0, 626, 627, 1, 0, 0, 0, 627, 57, 1, 0, 0, 0, 628, 626, 1, 0, 0, 0, 629, 631, 5, 107, 0, 0, 630,
    629, 1, 0, 0, 0, 630, 631, 1, 0, 0, 0, 631, 632, 1, 0, 0, 0, 632, 633, 5, 45, 0, 0, 633, 634, 3,
    92, 46, 0, 634, 635, 5, 43, 0, 0, 635, 636, 3, 80, 40, 0, 636, 638, 5, 82, 0, 0, 637, 639, 3,
    32, 16, 0, 638, 637, 1, 0, 0, 0, 638, 639, 1, 0, 0, 0, 639, 640, 1, 0, 0, 0, 640, 644, 5, 93, 0,
    0, 641, 643, 3, 34, 17, 0, 642, 641, 1, 0, 0, 0, 643, 646, 1, 0, 0, 0, 644, 642, 1, 0, 0, 0,
    644, 645, 1, 0, 0, 0, 645, 648, 1, 0, 0, 0, 646, 644, 1, 0, 0, 0, 647, 649, 5, 108, 0, 0, 648,
    647, 1, 0, 0, 0, 648, 649, 1, 0, 0, 0, 649, 59, 1, 0, 0, 0, 650, 652, 5, 106, 0, 0, 651, 650, 1,
    0, 0, 0, 651, 652, 1, 0, 0, 0, 652, 653, 1, 0, 0, 0, 653, 654, 5, 49, 0, 0, 654, 655, 3, 92, 46,
    0, 655, 656, 5, 78, 0, 0, 656, 657, 3, 62, 31, 0, 657, 659, 5, 79, 0, 0, 658, 660, 3, 32, 16, 0,
    659, 658, 1, 0, 0, 0, 659, 660, 1, 0, 0, 0, 660, 661, 1, 0, 0, 0, 661, 662, 5, 93, 0, 0, 662,
    61, 1, 0, 0, 0, 663, 666, 3, 124, 62, 0, 664, 666, 3, 82, 41, 0, 665, 663, 1, 0, 0, 0, 665, 664,
    1, 0, 0, 0, 666, 63, 1, 0, 0, 0, 667, 669, 5, 106, 0, 0, 668, 667, 1, 0, 0, 0, 668, 669, 1, 0,
    0, 0, 669, 670, 1, 0, 0, 0, 670, 671, 5, 72, 0, 0, 671, 672, 5, 80, 0, 0, 672, 673, 5, 42, 0, 0,
    673, 674, 5, 78, 0, 0, 674, 675, 3, 112, 56, 0, 675, 676, 5, 81, 0, 0, 676, 677, 3, 114, 57, 0,
    677, 679, 5, 79, 0, 0, 678, 680, 3, 32, 16, 0, 679, 678, 1, 0, 0, 0, 679, 680, 1, 0, 0, 0, 680,
    681, 1, 0, 0, 0, 681, 682, 5, 93, 0, 0, 682, 65, 1, 0, 0, 0, 683, 684, 5, 10, 0, 0, 684, 686, 3,
    130, 65, 0, 685, 687, 3, 32, 16, 0, 686, 685, 1, 0, 0, 0, 686, 687, 1, 0, 0, 0, 687, 688, 1, 0,
    0, 0, 688, 689, 5, 93, 0, 0, 689, 67, 1, 0, 0, 0, 690, 692, 5, 107, 0, 0, 691, 690, 1, 0, 0, 0,
    691, 692, 1, 0, 0, 0, 692, 693, 1, 0, 0, 0, 693, 694, 5, 44, 0, 0, 694, 695, 5, 46, 0, 0, 695,
    697, 5, 78, 0, 0, 696, 698, 3, 100, 50, 0, 697, 696, 1, 0, 0, 0, 697, 698, 1, 0, 0, 0, 698, 699,
    1, 0, 0, 0, 699, 700, 5, 79, 0, 0, 700, 701, 5, 68, 0, 0, 701, 702, 5, 47, 0, 0, 702, 704, 5,
    82, 0, 0, 703, 705, 3, 32, 16, 0, 704, 703, 1, 0, 0, 0, 704, 705, 1, 0, 0, 0, 705, 707, 1, 0, 0,
    0, 706, 708, 5, 108, 0, 0, 707, 706, 1, 0, 0, 0, 707, 708, 1, 0, 0, 0, 708, 709, 1, 0, 0, 0,
    709, 713, 5, 93, 0, 0, 710, 712, 3, 34, 17, 0, 711, 710, 1, 0, 0, 0, 712, 715, 1, 0, 0, 0, 713,
    711, 1, 0, 0, 0, 713, 714, 1, 0, 0, 0, 714, 716, 1, 0, 0, 0, 715, 713, 1, 0, 0, 0, 716, 717, 5,
    120, 0, 0, 717, 718, 5, 93, 0, 0, 718, 69, 1, 0, 0, 0, 719, 721, 5, 106, 0, 0, 720, 719, 1, 0,
    0, 0, 720, 721, 1, 0, 0, 0, 721, 722, 1, 0, 0, 0, 722, 723, 3, 80, 40, 0, 723, 724, 5, 82, 0, 0,
    724, 726, 3, 110, 55, 0, 725, 727, 3, 32, 16, 0, 726, 725, 1, 0, 0, 0, 726, 727, 1, 0, 0, 0,
    727, 728, 1, 0, 0, 0, 728, 729, 5, 93, 0, 0, 729, 71, 1, 0, 0, 0, 730, 732, 5, 107, 0, 0, 731,
    730, 1, 0, 0, 0, 731, 732, 1, 0, 0, 0, 732, 733, 1, 0, 0, 0, 733, 734, 5, 44, 0, 0, 734, 735, 3,
    86, 43, 0, 735, 737, 5, 78, 0, 0, 736, 738, 3, 100, 50, 0, 737, 736, 1, 0, 0, 0, 737, 738, 1, 0,
    0, 0, 738, 739, 1, 0, 0, 0, 739, 740, 5, 79, 0, 0, 740, 741, 5, 68, 0, 0, 741, 742, 3, 110, 55,
    0, 742, 744, 5, 82, 0, 0, 743, 745, 3, 32, 16, 0, 744, 743, 1, 0, 0, 0, 744, 745, 1, 0, 0, 0,
    745, 746, 1, 0, 0, 0, 746, 750, 5, 93, 0, 0, 747, 749, 3, 34, 17, 0, 748, 747, 1, 0, 0, 0, 749,
    752, 1, 0, 0, 0, 750, 748, 1, 0, 0, 0, 750, 751, 1, 0, 0, 0, 751, 753, 1, 0, 0, 0, 752, 750, 1,
    0, 0, 0, 753, 754, 3, 66, 33, 0, 754, 756, 5, 110, 0, 0, 755, 757, 5, 108, 0, 0, 756, 755, 1, 0,
    0, 0, 756, 757, 1, 0, 0, 0, 757, 758, 1, 0, 0, 0, 758, 759, 5, 93, 0, 0, 759, 73, 1, 0, 0, 0,
    760, 762, 5, 107, 0, 0, 761, 760, 1, 0, 0, 0, 761, 762, 1, 0, 0, 0, 762, 763, 1, 0, 0, 0, 763,
    764, 5, 44, 0, 0, 764, 765, 3, 86, 43, 0, 765, 767, 5, 78, 0, 0, 766, 768, 3, 100, 50, 0, 767,
    766, 1, 0, 0, 0, 767, 768, 1, 0, 0, 0, 768, 769, 1, 0, 0, 0, 769, 770, 5, 79, 0, 0, 770, 771, 5,
    68, 0, 0, 771, 772, 5, 47, 0, 0, 772, 774, 5, 82, 0, 0, 773, 775, 3, 32, 16, 0, 774, 773, 1, 0,
    0, 0, 774, 775, 1, 0, 0, 0, 775, 776, 1, 0, 0, 0, 776, 780, 5, 93, 0, 0, 777, 779, 3, 34, 17, 0,
    778, 777, 1, 0, 0, 0, 779, 782, 1, 0, 0, 0, 780, 778, 1, 0, 0, 0, 780, 781, 1, 0, 0, 0, 781,
    783, 1, 0, 0, 0, 782, 780, 1, 0, 0, 0, 783, 785, 5, 113, 0, 0, 784, 786, 5, 108, 0, 0, 785, 784,
    1, 0, 0, 0, 785, 786, 1, 0, 0, 0, 786, 787, 1, 0, 0, 0, 787, 788, 5, 93, 0, 0, 788, 75, 1, 0, 0,
    0, 789, 791, 5, 106, 0, 0, 790, 789, 1, 0, 0, 0, 790, 791, 1, 0, 0, 0, 791, 792, 1, 0, 0, 0,
    792, 793, 5, 125, 0, 0, 793, 794, 5, 93, 0, 0, 794, 795, 5, 44, 0, 0, 795, 796, 3, 86, 43, 0,
    796, 798, 5, 78, 0, 0, 797, 799, 3, 100, 50, 0, 798, 797, 1, 0, 0, 0, 798, 799, 1, 0, 0, 0, 799,
    800, 1, 0, 0, 0, 800, 801, 5, 79, 0, 0, 801, 802, 5, 68, 0, 0, 802, 803, 3, 110, 55, 0, 803,
    804, 5, 82, 0, 0, 804, 805, 5, 93, 0, 0, 805, 807, 5, 48, 0, 0, 806, 808, 3, 32, 16, 0, 807,
    806, 1, 0, 0, 0, 807, 808, 1, 0, 0, 0, 808, 809, 1, 0, 0, 0, 809, 810, 5, 93, 0, 0, 810, 77, 1,
    0, 0, 0, 811, 813, 5, 106, 0, 0, 812, 811, 1, 0, 0, 0, 812, 813, 1, 0, 0, 0, 813, 814, 1, 0, 0,
    0, 814, 815, 5, 125, 0, 0, 815, 816, 5, 93, 0, 0, 816, 817, 5, 44, 0, 0, 817, 818, 3, 86, 43, 0,
    818, 820, 5, 78, 0, 0, 819, 821, 3, 100, 50, 0, 820, 819, 1, 0, 0, 0, 820, 821, 1, 0, 0, 0, 821,
    822, 1, 0, 0, 0, 822, 823, 5, 79, 0, 0, 823, 824, 5, 68, 0, 0, 824, 825, 5, 47, 0, 0, 825, 826,
    5, 82, 0, 0, 826, 827, 5, 93, 0, 0, 827, 829, 5, 48, 0, 0, 828, 830, 3, 32, 16, 0, 829, 828, 1,
    0, 0, 0, 829, 830, 1, 0, 0, 0, 830, 831, 1, 0, 0, 0, 831, 832, 5, 93, 0, 0, 832, 79, 1, 0, 0, 0,
    833, 834, 5, 96, 0, 0, 834, 81, 1, 0, 0, 0, 835, 836, 5, 96, 0, 0, 836, 83, 1, 0, 0, 0, 837,
    838, 6, 42, -1, 0, 838, 843, 3, 82, 41, 0, 839, 840, 5, 72, 0, 0, 840, 841, 5, 80, 0, 0, 841,
    843, 3, 82, 41, 0, 842, 837, 1, 0, 0, 0, 842, 839, 1, 0, 0, 0, 843, 848, 1, 0, 0, 0, 844, 845,
    10, 1, 0, 0, 845, 847, 3, 128, 64, 0, 846, 844, 1, 0, 0, 0, 847, 850, 1, 0, 0, 0, 848, 846, 1,
    0, 0, 0, 848, 849, 1, 0, 0, 0, 849, 85, 1, 0, 0, 0, 850, 848, 1, 0, 0, 0, 851, 852, 5, 96, 0, 0,
    852, 87, 1, 0, 0, 0, 853, 854, 5, 94, 0, 0, 854, 89, 1, 0, 0, 0, 855, 856, 5, 95, 0, 0, 856, 91,
    1, 0, 0, 0, 857, 864, 5, 54, 0, 0, 858, 864, 5, 55, 0, 0, 859, 864, 5, 56, 0, 0, 860, 864, 5,
    57, 0, 0, 861, 864, 5, 58, 0, 0, 862, 864, 5, 97, 0, 0, 863, 857, 1, 0, 0, 0, 863, 858, 1, 0, 0,
    0, 863, 859, 1, 0, 0, 0, 863, 860, 1, 0, 0, 0, 863, 861, 1, 0, 0, 0, 863, 862, 1, 0, 0, 0, 864,
    93, 1, 0, 0, 0, 865, 870, 3, 118, 59, 0, 866, 870, 3, 120, 60, 0, 867, 870, 3, 122, 61, 0, 868,
    870, 3, 124, 62, 0, 869, 865, 1, 0, 0, 0, 869, 866, 1, 0, 0, 0, 869, 867, 1, 0, 0, 0, 869, 868,
    1, 0, 0, 0, 870, 95, 1, 0, 0, 0, 871, 876, 3, 98, 49, 0, 872, 873, 5, 81, 0, 0, 873, 875, 3, 98,
    49, 0, 874, 872, 1, 0, 0, 0, 875, 878, 1, 0, 0, 0, 876, 874, 1, 0, 0, 0, 876, 877, 1, 0, 0, 0,
    877, 97, 1, 0, 0, 0, 878, 876, 1, 0, 0, 0, 879, 882, 3, 172, 86, 0, 880, 882, 3, 130, 65, 0,
    881, 879, 1, 0, 0, 0, 881, 880, 1, 0, 0, 0, 882, 99, 1, 0, 0, 0, 883, 888, 3, 164, 82, 0, 884,
    885, 5, 81, 0, 0, 885, 887, 3, 164, 82, 0, 886, 884, 1, 0, 0, 0, 887, 890, 1, 0, 0, 0, 888, 886,
    1, 0, 0, 0, 888, 889, 1, 0, 0, 0, 889, 101, 1, 0, 0, 0, 890, 888, 1, 0, 0, 0, 891, 894, 3, 80,
    40, 0, 892, 893, 5, 81, 0, 0, 893, 895, 3, 80, 40, 0, 894, 892, 1, 0, 0, 0, 895, 896, 1, 0, 0,
    0, 896, 894, 1, 0, 0, 0, 896, 897, 1, 0, 0, 0, 897, 103, 1, 0, 0, 0, 898, 903, 3, 130, 65, 0,
    899, 900, 5, 81, 0, 0, 900, 902, 3, 130, 65, 0, 901, 899, 1, 0, 0, 0, 902, 905, 1, 0, 0, 0, 903,
    901, 1, 0, 0, 0, 903, 904, 1, 0, 0, 0, 904, 105, 1, 0, 0, 0, 905, 903, 1, 0, 0, 0, 906, 907, 3,
    80, 40, 0, 907, 908, 5, 73, 0, 0, 908, 909, 3, 120, 60, 0, 909, 107, 1, 0, 0, 0, 910, 915, 3,
    106, 53, 0, 911, 912, 5, 93, 0, 0, 912, 914, 3, 106, 53, 0, 913, 911, 1, 0, 0, 0, 914, 917, 1,
    0, 0, 0, 915, 913, 1, 0, 0, 0, 915, 916, 1, 0, 0, 0, 916, 109, 1, 0, 0, 0, 917, 915, 1, 0, 0, 0,
    918, 923, 3, 170, 85, 0, 919, 923, 3, 92, 46, 0, 920, 923, 3, 166, 83, 0, 921, 923, 3, 168, 84,
    0, 922, 918, 1, 0, 0, 0, 922, 919, 1, 0, 0, 0, 922, 920, 1, 0, 0, 0, 922, 921, 1, 0, 0, 0, 923,
    111, 1, 0, 0, 0, 924, 925, 3, 130, 65, 0, 925, 113, 1, 0, 0, 0, 926, 932, 3, 116, 58, 0, 927,
    932, 3, 148, 74, 0, 928, 932, 3, 152, 76, 0, 929, 932, 3, 140, 70, 0, 930, 932, 3, 150, 75, 0,
    931, 926, 1, 0, 0, 0, 931, 927, 1, 0, 0, 0, 931, 928, 1, 0, 0, 0, 931, 929, 1, 0, 0, 0, 931,
    930, 1, 0, 0, 0, 932, 115, 1, 0, 0, 0, 933, 940, 3, 118, 59, 0, 934, 940, 3, 120, 60, 0, 935,
    940, 3, 122, 61, 0, 936, 940, 3, 124, 62, 0, 937, 940, 3, 174, 87, 0, 938, 940, 3, 126, 63, 0,
    939, 933, 1, 0, 0, 0, 939, 934, 1, 0, 0, 0, 939, 935, 1, 0, 0, 0, 939, 936, 1, 0, 0, 0, 939,
    937, 1, 0, 0, 0, 939, 938, 1, 0, 0, 0, 940, 117, 1, 0, 0, 0, 941, 942, 7, 0, 0, 0, 942, 119, 1,
    0, 0, 0, 943, 947, 5, 100, 0, 0, 944, 947, 5, 98, 0, 0, 945, 947, 5, 99, 0, 0, 946, 943, 1, 0,
    0, 0, 946, 944, 1, 0, 0, 0, 946, 945, 1, 0, 0, 0, 947, 121, 1, 0, 0, 0, 948, 949, 5, 101, 0, 0,
    949, 123, 1, 0, 0, 0, 950, 951, 7, 1, 0, 0, 951, 125, 1, 0, 0, 0, 952, 953, 3, 92, 46, 0, 953,
    954, 5, 80, 0, 0, 954, 955, 3, 82, 41, 0, 955, 127, 1, 0, 0, 0, 956, 957, 5, 76, 0, 0, 957, 958,
    3, 130, 65, 0, 958, 959, 5, 77, 0, 0, 959, 129, 1, 0, 0, 0, 960, 961, 6, 65, -1, 0, 961, 966, 3,
    162, 81, 0, 962, 966, 3, 140, 70, 0, 963, 966, 3, 132, 66, 0, 964, 966, 3, 146, 73, 0, 965, 960,
    1, 0, 0, 0, 965, 962, 1, 0, 0, 0, 965, 963, 1, 0, 0, 0, 965, 964, 1, 0, 0, 0, 966, 982, 1, 0, 0,
    0, 967, 968, 10, 1, 0, 0, 968, 969, 5, 5, 0, 0, 969, 974, 3, 130, 65, 0, 970, 971, 5, 2, 0, 0,
    971, 973, 3, 130, 65, 0, 972, 970, 1, 0, 0, 0, 973, 976, 1, 0, 0, 0, 974, 972, 1, 0, 0, 0, 974,
    975, 1, 0, 0, 0, 975, 977, 1, 0, 0, 0, 976, 974, 1, 0, 0, 0, 977, 978, 5, 3, 0, 0, 978, 979, 3,
    130, 65, 2, 979, 981, 1, 0, 0, 0, 980, 967, 1, 0, 0, 0, 981, 984, 1, 0, 0, 0, 982, 980, 1, 0, 0,
    0, 982, 983, 1, 0, 0, 0, 983, 131, 1, 0, 0, 0, 984, 982, 1, 0, 0, 0, 985, 986, 6, 66, -1, 0,
    986, 995, 3, 136, 68, 0, 987, 995, 3, 138, 69, 0, 988, 995, 3, 116, 58, 0, 989, 995, 3, 148, 74,
    0, 990, 995, 3, 152, 76, 0, 991, 995, 3, 150, 75, 0, 992, 995, 3, 82, 41, 0, 993, 995, 3, 158,
    79, 0, 994, 985, 1, 0, 0, 0, 994, 987, 1, 0, 0, 0, 994, 988, 1, 0, 0, 0, 994, 989, 1, 0, 0, 0,
    994, 990, 1, 0, 0, 0, 994, 991, 1, 0, 0, 0, 994, 992, 1, 0, 0, 0, 994, 993, 1, 0, 0, 0, 995,
    1003, 1, 0, 0, 0, 996, 997, 10, 2, 0, 0, 997, 1002, 3, 128, 64, 0, 998, 999, 10, 1, 0, 0, 999,
    1000, 5, 80, 0, 0, 1000, 1002, 3, 134, 67, 0, 1001, 996, 1, 0, 0, 0, 1001, 998, 1, 0, 0, 0,
    1002, 1005, 1, 0, 0, 0, 1003, 1001, 1, 0, 0, 0, 1003, 1004, 1, 0, 0, 0, 1004, 133, 1, 0, 0, 0,
    1005, 1003, 1, 0, 0, 0, 1006, 1009, 3, 82, 41, 0, 1007, 1009, 3, 158, 79, 0, 1008, 1006, 1, 0,
    0, 0, 1008, 1007, 1, 0, 0, 0, 1009, 135, 1, 0, 0, 0, 1010, 1011, 5, 72, 0, 0, 1011, 137, 1, 0,
    0, 0, 1012, 1013, 5, 78, 0, 0, 1013, 1014, 3, 130, 65, 0, 1014, 1015, 5, 79, 0, 0, 1015, 139, 1,
    0, 0, 0, 1016, 1019, 3, 142, 71, 0, 1017, 1019, 3, 144, 72, 0, 1018, 1016, 1, 0, 0, 0, 1018,
    1017, 1, 0, 0, 0, 1019, 141, 1, 0, 0, 0, 1020, 1021, 5, 84, 0, 0, 1021, 1022, 3, 132, 66, 0,
    1022, 143, 1, 0, 0, 0, 1023, 1024, 5, 64, 0, 0, 1024, 1025, 3, 132, 66, 0, 1025, 145, 1, 0, 0,
    0, 1026, 1027, 3, 132, 66, 0, 1027, 1028, 3, 160, 80, 0, 1028, 1029, 3, 130, 65, 0, 1029, 147,
    1, 0, 0, 0, 1030, 1031, 5, 76, 0, 0, 1031, 1032, 3, 104, 52, 0, 1032, 1033, 5, 77, 0, 0, 1033,
    149, 1, 0, 0, 0, 1034, 1035, 5, 78, 0, 0, 1035, 1036, 3, 104, 52, 0, 1036, 1037, 5, 79, 0, 0,
    1037, 151, 1, 0, 0, 0, 1038, 1039, 5, 74, 0, 0, 1039, 1040, 3, 154, 77, 0, 1040, 1041, 5, 75, 0,
    0, 1041, 153, 1, 0, 0, 0, 1042, 1047, 3, 156, 78, 0, 1043, 1044, 5, 81, 0, 0, 1044, 1046, 3,
    156, 78, 0, 1045, 1043, 1, 0, 0, 0, 1046, 1049, 1, 0, 0, 0, 1047, 1045, 1, 0, 0, 0, 1047, 1048,
    1, 0, 0, 0, 1048, 155, 1, 0, 0, 0, 1049, 1047, 1, 0, 0, 0, 1050, 1051, 3, 130, 65, 0, 1051,
    1052, 5, 82, 0, 0, 1052, 1053, 3, 130, 65, 0, 1053, 157, 1, 0, 0, 0, 1054, 1055, 3, 86, 43, 0,
    1055, 1057, 5, 78, 0, 0, 1056, 1058, 3, 96, 48, 0, 1057, 1056, 1, 0, 0, 0, 1057, 1058, 1, 0, 0,
    0, 1058, 1059, 1, 0, 0, 0, 1059, 1060, 5, 79, 0, 0, 1060, 159, 1, 0, 0, 0, 1061, 1062, 7, 2, 0,
    0, 1062, 161, 1, 0, 0, 0, 1063, 1064, 3, 110, 55, 0, 1064, 1066, 5, 78, 0, 0, 1065, 1067, 3, 96,
    48, 0, 1066, 1065, 1, 0, 0, 0, 1066, 1067, 1, 0, 0, 0, 1067, 1068, 1, 0, 0, 0, 1068, 1069, 5,
    79, 0, 0, 1069, 163, 1, 0, 0, 0, 1070, 1073, 3, 80, 40, 0, 1071, 1073, 5, 72, 0, 0, 1072, 1070,
    1, 0, 0, 0, 1072, 1071, 1, 0, 0, 0, 1073, 1074, 1, 0, 0, 0, 1074, 1075, 5, 82, 0, 0, 1075, 1076,
    3, 110, 55, 0, 1076, 165, 1, 0, 0, 0, 1077, 1078, 3, 92, 46, 0, 1078, 1079, 5, 76, 0, 0, 1079,
    1084, 3, 110, 55, 0, 1080, 1081, 5, 81, 0, 0, 1081, 1083, 3, 110, 55, 0, 1082, 1080, 1, 0, 0, 0,
    1083, 1086, 1, 0, 0, 0, 1084, 1082, 1, 0, 0, 0, 1084, 1085, 1, 0, 0, 0, 1085, 1087, 1, 0, 0, 0,
    1086, 1084, 1, 0, 0, 0, 1087, 1088, 5, 77, 0, 0, 1088, 167, 1, 0, 0, 0, 1089, 1090, 5, 59, 0, 0,
    1090, 1091, 5, 76, 0, 0, 1091, 1092, 5, 76, 0, 0, 1092, 1097, 3, 110, 55, 0, 1093, 1094, 5, 81,
    0, 0, 1094, 1096, 3, 110, 55, 0, 1095, 1093, 1, 0, 0, 0, 1096, 1099, 1, 0, 0, 0, 1097, 1095, 1,
    0, 0, 0, 1097, 1098, 1, 0, 0, 0, 1098, 1100, 1, 0, 0, 0, 1099, 1097, 1, 0, 0, 0, 1100, 1101, 5,
    77, 0, 0, 1101, 1102, 5, 81, 0, 0, 1102, 1103, 3, 110, 55, 0, 1103, 1104, 5, 77, 0, 0, 1104,
    169, 1, 0, 0, 0, 1105, 1106, 5, 53, 0, 0, 1106, 1107, 5, 76, 0, 0, 1107, 1110, 3, 110, 55, 0,
    1108, 1109, 5, 81, 0, 0, 1109, 1111, 3, 110, 55, 0, 1110, 1108, 1, 0, 0, 0, 1111, 1112, 1, 0, 0,
    0, 1112, 1110, 1, 0, 0, 0, 1112, 1113, 1, 0, 0, 0, 1113, 1114, 1, 0, 0, 0, 1114, 1115, 5, 77, 0,
    0, 1115, 171, 1, 0, 0, 0, 1116, 1117, 5, 8, 0, 0, 1117, 1118, 3, 100, 50, 0, 1118, 1119, 5, 82,
    0, 0, 1119, 1120, 3, 130, 65, 0, 1120, 173, 1, 0, 0, 0, 1121, 1122, 5, 103, 0, 0, 1122, 175, 1,
    0, 0, 0, 134, 177, 182, 186, 191, 205, 208, 221, 226, 235, 241, 248, 254, 260, 265, 277, 282,
    295, 301, 310, 313, 319, 326, 332, 337, 342, 348, 353, 362, 369, 374, 382, 386, 393, 398, 406,
    409, 416, 422, 428, 433, 443, 446, 462, 465, 474, 483, 489, 496, 500, 504, 511, 515, 521, 527,
    531, 534, 539, 545, 549, 552, 558, 564, 572, 580, 586, 594, 598, 603, 608, 615, 619, 626, 630,
    638, 644, 648, 651, 659, 665, 668, 679, 686, 691, 697, 704, 707, 713, 720, 726, 731, 737, 744,
    750, 756, 761, 767, 774, 780, 785, 790, 798, 807, 812, 820, 829, 842, 848, 863, 869, 876, 881,
    888, 896, 903, 915, 922, 931, 939, 946, 965, 974, 982, 994, 1001, 1003, 1008, 1018, 1047, 1057,
    1066, 1072, 1084, 1097, 1112,
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
  public mainCall(): MainCallContext | null {
    return this.getRuleContext(0, MainCallContext);
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
  public END_MAIN(): antlr.TerminalNode {
    return this.getToken(PythonParser.END_MAIN, 0)!;
  }
  public GHOSTED_BLOCK_START(): antlr.TerminalNode | null {
    return this.getToken(PythonParser.GHOSTED_BLOCK_START, 0);
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
  public GHOSTED_BLOCK_END(): antlr.TerminalNode | null {
    return this.getToken(PythonParser.GHOSTED_BLOCK_END, 0);
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

export class MainCallContext extends antlr.ParserRuleContext {
  public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
    super(parent, invokingState);
  }
  public MAIN(): antlr.TerminalNode {
    return this.getToken(PythonParser.MAIN, 0)!;
  }
  public OPEN_BRACKET(): antlr.TerminalNode {
    return this.getToken(PythonParser.OPEN_BRACKET, 0)!;
  }
  public CLOSE_BRACKET(): antlr.TerminalNode {
    return this.getToken(PythonParser.CLOSE_BRACKET, 0)!;
  }
  public override get ruleIndex(): number {
    return PythonParser.RULE_mainCall;
  }
  public override enterRule(listener: PythonListener): void {
    if (listener.enterMainCall) {
      listener.enterMainCall(this);
    }
  }
  public override exitRule(listener: PythonListener): void {
    if (listener.exitMainCall) {
      listener.exitMainCall(this);
    }
  }
  public override accept<Result>(visitor: PythonVisitor<Result>): Result | null {
    if (visitor.visitMainCall) {
      return visitor.visitMainCall(this);
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
  public GHOSTED_BLOCK_START(): antlr.TerminalNode | null {
    return this.getToken(PythonParser.GHOSTED_BLOCK_START, 0);
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
  public GHOSTED_BLOCK_END(): antlr.TerminalNode | null {
    return this.getToken(PythonParser.GHOSTED_BLOCK_END, 0);
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
  public testClassName(): TestClassNameContext {
    return this.getRuleContext(0, TestClassNameContext)!;
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
  public testFunction(): TestFunctionContext {
    return this.getRuleContext(0, TestFunctionContext)!;
  }
  public END_TEST_CLASS(): antlr.TerminalNode {
    return this.getToken(PythonParser.END_TEST_CLASS, 0)!;
  }
  public GHOSTED_BLOCK_START(): antlr.TerminalNode | null {
    return this.getToken(PythonParser.GHOSTED_BLOCK_START, 0);
  }
  public GHOSTED_BLOCK_END(): antlr.TerminalNode | null {
    return this.getToken(PythonParser.GHOSTED_BLOCK_END, 0);
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

export class TestFunctionContext extends antlr.ParserRuleContext {
  public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
    super(parent, invokingState);
  }
  public DEF(): antlr.TerminalNode {
    return this.getToken(PythonParser.DEF, 0)!;
  }
  public testName(): TestNameContext {
    return this.getRuleContext(0, TestNameContext)!;
  }
  public OPEN_BRACKET(): antlr.TerminalNode {
    return this.getToken(PythonParser.OPEN_BRACKET, 0)!;
  }
  public THIS_INSTANCE(): antlr.TerminalNode {
    return this.getToken(PythonParser.THIS_INSTANCE, 0)!;
  }
  public COLON(): antlr.TerminalNode[];
  public COLON(i: number): antlr.TerminalNode | null;
  public COLON(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    if (i === undefined) {
      return this.getTokens(PythonParser.COLON);
    } else {
      return this.getToken(PythonParser.COLON, i);
    }
  }
  public testClassName(): TestClassNameContext {
    return this.getRuleContext(0, TestClassNameContext)!;
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
  public GHOSTED_BLOCK_START(): antlr.TerminalNode | null {
    return this.getToken(PythonParser.GHOSTED_BLOCK_START, 0);
  }
  public commentText(): CommentTextContext | null {
    return this.getRuleContext(0, CommentTextContext);
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
    return PythonParser.RULE_testFunction;
  }
  public override enterRule(listener: PythonListener): void {
    if (listener.enterTestFunction) {
      listener.enterTestFunction(this);
    }
  }
  public override exitRule(listener: PythonListener): void {
    if (listener.exitTestFunction) {
      listener.exitTestFunction(this);
    }
  }
  public override accept<Result>(visitor: PythonVisitor<Result>): Result | null {
    if (visitor.visitTestFunction) {
      return visitor.visitTestFunction(this);
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
  public GHOSTED_BLOCK_START(): antlr.TerminalNode | null {
    return this.getToken(PythonParser.GHOSTED_BLOCK_START, 0);
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
  public GHOSTED_BLOCK_END(): antlr.TerminalNode | null {
    return this.getToken(PythonParser.GHOSTED_BLOCK_END, 0);
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
  public SINGLE_EQUALS(): antlr.TerminalNode {
    return this.getToken(PythonParser.SINGLE_EQUALS, 0)!;
  }
  public constantValue(): ConstantValueContext {
    return this.getRuleContext(0, ConstantValueContext)!;
  }
  public NL(): antlr.TerminalNode {
    return this.getToken(PythonParser.NL, 0)!;
  }
  public GHOSTED_LINE(): antlr.TerminalNode | null {
    return this.getToken(PythonParser.GHOSTED_LINE, 0);
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
  public enumList(): EnumListContext {
    return this.getRuleContext(0, EnumListContext)!;
  }
  public END_ENUM(): antlr.TerminalNode {
    return this.getToken(PythonParser.END_ENUM, 0)!;
  }
  public GHOSTED_BLOCK_START(): antlr.TerminalNode | null {
    return this.getToken(PythonParser.GHOSTED_BLOCK_START, 0);
  }
  public commentText(): CommentTextContext | null {
    return this.getRuleContext(0, CommentTextContext);
  }
  public GHOSTED_BLOCK_END(): antlr.TerminalNode | null {
    return this.getToken(PythonParser.GHOSTED_BLOCK_END, 0);
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
  public GHOSTED_BLOCK_START(): antlr.TerminalNode | null {
    return this.getToken(PythonParser.GHOSTED_BLOCK_START, 0);
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
  public GHOSTED_BLOCK_END(): antlr.TerminalNode | null {
    return this.getToken(PythonParser.GHOSTED_BLOCK_END, 0);
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
  public CLOSE_BRACKET(): antlr.TerminalNode | null {
    return this.getToken(PythonParser.CLOSE_BRACKET, 0);
  }
  public GHOSTED_BLOCK_START(): antlr.TerminalNode | null {
    return this.getToken(PythonParser.GHOSTED_BLOCK_START, 0);
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
  public GHOSTED_BLOCK_END(): antlr.TerminalNode | null {
    return this.getToken(PythonParser.GHOSTED_BLOCK_END, 0);
  }
  public ABC(): antlr.TerminalNode | null {
    return this.getToken(PythonParser.ABC, 0);
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
  public GHOSTED_LINE(): antlr.TerminalNode | null {
    return this.getToken(PythonParser.GHOSTED_LINE, 0);
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
  public SINGLE_EQUALS(): antlr.TerminalNode {
    return this.getToken(PythonParser.SINGLE_EQUALS, 0)!;
  }
  public expression(): ExpressionContext {
    return this.getRuleContext(0, ExpressionContext)!;
  }
  public VARIABLE_DEFINITION_ANNOTATION(): antlr.TerminalNode {
    return this.getToken(PythonParser.VARIABLE_DEFINITION_ANNOTATION, 0)!;
  }
  public NL(): antlr.TerminalNode {
    return this.getToken(PythonParser.NL, 0)!;
  }
  public GHOSTED_LINE(): antlr.TerminalNode | null {
    return this.getToken(PythonParser.GHOSTED_LINE, 0);
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
  public SINGLE_EQUALS(): antlr.TerminalNode {
    return this.getToken(PythonParser.SINGLE_EQUALS, 0)!;
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
  public GHOSTED_LINE(): antlr.TerminalNode | null {
    return this.getToken(PythonParser.GHOSTED_LINE, 0);
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
  public thenClause(): ThenClauseContext {
    return this.getRuleContext(0, ThenClauseContext)!;
  }
  public END_IF(): antlr.TerminalNode {
    return this.getToken(PythonParser.END_IF, 0)!;
  }
  public expression(): ExpressionContext {
    return this.getRuleContext(0, ExpressionContext)!;
  }
  public GHOSTED_BLOCK_START(): antlr.TerminalNode | null {
    return this.getToken(PythonParser.GHOSTED_BLOCK_START, 0);
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
  public GHOSTED_BLOCK_END(): antlr.TerminalNode | null {
    return this.getToken(PythonParser.GHOSTED_BLOCK_END, 0);
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
  public COLON(): antlr.TerminalNode {
    return this.getToken(PythonParser.COLON, 0)!;
  }
  public NL(): antlr.TerminalNode {
    return this.getToken(PythonParser.NL, 0)!;
  }
  public GHOSTED_BLOCK_START(): antlr.TerminalNode | null {
    return this.getToken(PythonParser.GHOSTED_BLOCK_START, 0);
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
  public GHOSTED_BLOCK_END(): antlr.TerminalNode | null {
    return this.getToken(PythonParser.GHOSTED_BLOCK_END, 0);
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
  public GHOSTED_BLOCK_START(): antlr.TerminalNode | null {
    return this.getToken(PythonParser.GHOSTED_BLOCK_START, 0);
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
  public GHOSTED_BLOCK_END(): antlr.TerminalNode | null {
    return this.getToken(PythonParser.GHOSTED_BLOCK_END, 0);
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
  public GHOSTED_BLOCK_END(): antlr.TerminalNode {
    return this.getToken(PythonParser.GHOSTED_BLOCK_END, 0)!;
  }
  public GHOSTED_BLOCK_START(): antlr.TerminalNode | null {
    return this.getToken(PythonParser.GHOSTED_BLOCK_START, 0);
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
  public GHOSTED_BLOCK_END(): antlr.TerminalNode {
    return this.getToken(PythonParser.GHOSTED_BLOCK_END, 0)!;
  }
  public GHOSTED_BLOCK_START(): antlr.TerminalNode | null {
    return this.getToken(PythonParser.GHOSTED_BLOCK_START, 0);
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
  public GHOSTED_LINE(): antlr.TerminalNode | null {
    return this.getToken(PythonParser.GHOSTED_LINE, 0);
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
  public GHOSTED_BLOCK_START(): antlr.TerminalNode | null {
    return this.getToken(PythonParser.GHOSTED_BLOCK_START, 0);
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
  public GHOSTED_BLOCK_END(): antlr.TerminalNode | null {
    return this.getToken(PythonParser.GHOSTED_BLOCK_END, 0);
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
  public GHOSTED_BLOCK_START(): antlr.TerminalNode | null {
    return this.getToken(PythonParser.GHOSTED_BLOCK_START, 0);
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
  public GHOSTED_BLOCK_END(): antlr.TerminalNode | null {
    return this.getToken(PythonParser.GHOSTED_BLOCK_END, 0);
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
  public GHOSTED_LINE(): antlr.TerminalNode | null {
    return this.getToken(PythonParser.GHOSTED_LINE, 0);
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
  public GHOSTED_LINE(): antlr.TerminalNode | null {
    return this.getToken(PythonParser.GHOSTED_LINE, 0);
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
  public GHOSTED_BLOCK_START(): antlr.TerminalNode | null {
    return this.getToken(PythonParser.GHOSTED_BLOCK_START, 0);
  }
  public paramList(): ParamListContext | null {
    return this.getRuleContext(0, ParamListContext);
  }
  public commentText(): CommentTextContext | null {
    return this.getRuleContext(0, CommentTextContext);
  }
  public GHOSTED_BLOCK_END(): antlr.TerminalNode | null {
    return this.getToken(PythonParser.GHOSTED_BLOCK_END, 0);
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
  public GHOSTED_LINE(): antlr.TerminalNode | null {
    return this.getToken(PythonParser.GHOSTED_LINE, 0);
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
  public END_FUNCTION(): antlr.TerminalNode {
    return this.getToken(PythonParser.END_FUNCTION, 0)!;
  }
  public GHOSTED_BLOCK_START(): antlr.TerminalNode | null {
    return this.getToken(PythonParser.GHOSTED_BLOCK_START, 0);
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
  public GHOSTED_BLOCK_END(): antlr.TerminalNode | null {
    return this.getToken(PythonParser.GHOSTED_BLOCK_END, 0);
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
  public END_PROCEDURE(): antlr.TerminalNode {
    return this.getToken(PythonParser.END_PROCEDURE, 0)!;
  }
  public GHOSTED_BLOCK_START(): antlr.TerminalNode | null {
    return this.getToken(PythonParser.GHOSTED_BLOCK_START, 0);
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
  public GHOSTED_BLOCK_END(): antlr.TerminalNode | null {
    return this.getToken(PythonParser.GHOSTED_BLOCK_END, 0);
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
  public GHOSTED_LINE(): antlr.TerminalNode | null {
    return this.getToken(PythonParser.GHOSTED_LINE, 0);
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
  public GHOSTED_LINE(): antlr.TerminalNode | null {
    return this.getToken(PythonParser.GHOSTED_LINE, 0);
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
  public NAME_STARTING_LC_TEST_(): antlr.TerminalNode {
    return this.getToken(PythonParser.NAME_STARTING_LC_TEST_, 0)!;
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

export class TestClassNameContext extends antlr.ParserRuleContext {
  public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
    super(parent, invokingState);
  }
  public NAME_STARTING_UC_TEST_(): antlr.TerminalNode {
    return this.getToken(PythonParser.NAME_STARTING_UC_TEST_, 0)!;
  }
  public override get ruleIndex(): number {
    return PythonParser.RULE_testClassName;
  }
  public override enterRule(listener: PythonListener): void {
    if (listener.enterTestClassName) {
      listener.enterTestClassName(this);
    }
  }
  public override exitRule(listener: PythonListener): void {
    if (listener.exitTestClassName) {
      listener.exitTestClassName(this);
    }
  }
  public override accept<Result>(visitor: PythonVisitor<Result>): Result | null {
    if (visitor.visitTestClassName) {
      return visitor.visitTestClassName(this);
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

export class EnumDefValueContext extends antlr.ParserRuleContext {
  public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
    super(parent, invokingState);
  }
  public identifierDef(): IdentifierDefContext {
    return this.getRuleContext(0, IdentifierDefContext)!;
  }
  public SINGLE_EQUALS(): antlr.TerminalNode {
    return this.getToken(PythonParser.SINGLE_EQUALS, 0)!;
  }
  public litInt(): LitIntContext {
    return this.getRuleContext(0, LitIntContext)!;
  }
  public override get ruleIndex(): number {
    return PythonParser.RULE_enumDefValue;
  }
  public override enterRule(listener: PythonListener): void {
    if (listener.enterEnumDefValue) {
      listener.enterEnumDefValue(this);
    }
  }
  public override exitRule(listener: PythonListener): void {
    if (listener.exitEnumDefValue) {
      listener.exitEnumDefValue(this);
    }
  }
  public override accept<Result>(visitor: PythonVisitor<Result>): Result | null {
    if (visitor.visitEnumDefValue) {
      return visitor.visitEnumDefValue(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class EnumListContext extends antlr.ParserRuleContext {
  public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
    super(parent, invokingState);
  }
  public enumDefValue(): EnumDefValueContext[];
  public enumDefValue(i: number): EnumDefValueContext | null;
  public enumDefValue(i?: number): EnumDefValueContext[] | EnumDefValueContext | null {
    if (i === undefined) {
      return this.getRuleContexts(EnumDefValueContext);
    }

    return this.getRuleContext(i, EnumDefValueContext);
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
    return PythonParser.RULE_enumList;
  }
  public override enterRule(listener: PythonListener): void {
    if (listener.enterEnumList) {
      listener.enterEnumList(this);
    }
  }
  public override exitRule(listener: PythonListener): void {
    if (listener.exitEnumList) {
      listener.exitEnumList(this);
    }
  }
  public override accept<Result>(visitor: PythonVisitor<Result>): Result | null {
    if (visitor.visitEnumList) {
      return visitor.visitEnumList(this);
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
  public COLON(): antlr.TerminalNode {
    return this.getToken(PythonParser.COLON, 0)!;
  }
  public type(): TypeContext {
    return this.getRuleContext(0, TypeContext)!;
  }
  public identifierDef(): IdentifierDefContext | null {
    return this.getRuleContext(0, IdentifierDefContext);
  }
  public THIS_INSTANCE(): antlr.TerminalNode | null {
    return this.getToken(PythonParser.THIS_INSTANCE, 0);
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
