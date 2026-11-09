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
  public static readonly ASSERT_EQUAL = 43;
  public static readonly AS = 44;
  public static readonly DEF = 45;
  public static readonly EXCEPT = 46;
  public static readonly INIT = 47;
  public static readonly NONE = 48;
  public static readonly PASS = 49;
  public static readonly RAISE = 50;
  public static readonly ABC = 51;
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
  public static readonly NAME_STARTING_TEST_ = 94;
  public static readonly NAME_STARTING_LC = 95;
  public static readonly NAME_STARTING_UC = 96;
  public static readonly LITERAL_BINARY = 97;
  public static readonly LITERAL_HEX = 98;
  public static readonly LITERAL_INTEGER = 99;
  public static readonly LITERAL_FLOAT = 100;
  public static readonly LITERAL_STRING = 101;
  public static readonly INTERPOLATED_STRING = 102;
  public static readonly WHITESPACES = 103;
  public static readonly TEXT = 104;
  public static readonly GHOSTED_LINE = 105;
  public static readonly GHOSTED_BLOCK_START = 106;
  public static readonly GHOSTED_BLOCK_END = 107;
  public static readonly END_MAIN = 108;
  public static readonly END_FUNCTION = 109;
  public static readonly END_TEST = 110;
  public static readonly END_PROCEDURE = 111;
  public static readonly END_ENUM = 112;
  public static readonly END_CLASS = 113;
  public static readonly END_IF = 114;
  public static readonly END_WHILE = 115;
  public static readonly END_FOR = 116;
  public static readonly END_TRY = 117;
  public static readonly END_CONSTRUCTOR = 118;
  public static readonly END_FUNCTION_METHOD = 119;
  public static readonly END_PROCEDURE_METHOD = 120;
  public static readonly ASSIGNMENT_ANNOTATION = 121;
  public static readonly VARIABLE_DEFINITION_ANNOTATION = 122;
  public static readonly ABSTRACT_METHOD = 123;
  public static readonly COMMENT = 124;
  public static readonly RULE_file = 0;
  public static readonly RULE_global = 1;
  public static readonly RULE_main = 2;
  public static readonly RULE_mainCall = 3;
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
  public static readonly RULE_ordinaryStatement = 16;
  public static readonly RULE_variableDefinition = 17;
  public static readonly RULE_assignment = 18;
  public static readonly RULE_ifStatement = 19;
  public static readonly RULE_thenClause = 20;
  public static readonly RULE_elseIfClause = 21;
  public static readonly RULE_elseClause = 22;
  public static readonly RULE_whileLoop = 23;
  public static readonly RULE_forLoop = 24;
  public static readonly RULE_procedureCall = 25;
  public static readonly RULE_tryStatement = 26;
  public static readonly RULE_tryClause = 27;
  public static readonly RULE_catchClause = 28;
  public static readonly RULE_throwStatement = 29;
  public static readonly RULE_errorMessage = 30;
  public static readonly RULE_assert = 31;
  public static readonly RULE_returnStatement = 32;
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
  public static readonly RULE_enumDefValue = 51;
  public static readonly RULE_enumList = 52;
  public static readonly RULE_type = 53;
  public static readonly RULE_assertActual = 54;
  public static readonly RULE_assertExpected = 55;
  public static readonly RULE_litValue = 56;
  public static readonly RULE_litBoolean = 57;
  public static readonly RULE_litInt = 58;
  public static readonly RULE_litFloat = 59;
  public static readonly RULE_litString = 60;
  public static readonly RULE_enumValue = 61;
  public static readonly RULE_index = 62;
  public static readonly RULE_expression = 63;
  public static readonly RULE_term = 64;
  public static readonly RULE_chainable = 65;
  public static readonly RULE_thisInstance = 66;
  public static readonly RULE_bracketedExpression = 67;
  public static readonly RULE_unaryExpression = 68;
  public static readonly RULE_negateNumeric = 69;
  public static readonly RULE_negateLogical = 70;
  public static readonly RULE_binaryExpression = 71;
  public static readonly RULE_list = 72;
  public static readonly RULE_tuple = 73;
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
    "'#[ghosted] '",
    "''''[ghosted] '",
    "'''''",
    "'# end main'",
    "'# end function'",
    "'# end test'",
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
    "GHOSTED_LINE",
    "GHOSTED_BLOCK_START",
    "GHOSTED_BLOCK_END",
    "END_MAIN",
    "END_FUNCTION",
    "END_TEST",
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
        this.state = 173;
        this.errorHandler.sync(this);
        switch (this.interpreter.adaptivePredict(this.tokenStream, 0, this.context)) {
          case 1:
            {
              this.state = 172;
              this.comment();
            }
            break;
        }
        this.state = 178;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (
          _la === 1 ||
          _la === 45 ||
          (((_la - 95) & ~0x1f) === 0 && ((1 << (_la - 95)) & 536873985) !== 0)
        ) {
          {
            {
              this.state = 175;
              this.global();
            }
          }
          this.state = 180;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 182;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 10) {
          {
            this.state = 181;
            this.mainCall();
          }
        }

        this.state = 187;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (_la === 93) {
          {
            {
              this.state = 184;
              this.match(PythonParser.NL);
            }
          }
          this.state = 189;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 190;
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
      this.state = 201;
      this.errorHandler.sync(this);
      switch (this.interpreter.adaptivePredict(this.tokenStream, 4, this.context)) {
        case 1:
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 192;
            this.main();
          }
          break;
        case 2:
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 193;
            this.function_();
          }
          break;
        case 3:
          this.enterOuterAlt(localContext, 3);
          {
            this.state = 194;
            this.test();
          }
          break;
        case 4:
          this.enterOuterAlt(localContext, 4);
          {
            this.state = 195;
            this.procedure();
          }
          break;
        case 5:
          this.enterOuterAlt(localContext, 5);
          {
            this.state = 196;
            this.constant();
          }
          break;
        case 6:
          this.enterOuterAlt(localContext, 6);
          {
            this.state = 197;
            this.enum_();
          }
          break;
        case 7:
          this.enterOuterAlt(localContext, 7);
          {
            this.state = 198;
            this.concreteClass();
          }
          break;
        case 8:
          this.enterOuterAlt(localContext, 8);
          {
            this.state = 199;
            this.abstractClass();
          }
          break;
        case 9:
          this.enterOuterAlt(localContext, 9);
          {
            this.state = 200;
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
        this.state = 204;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 106) {
          {
            this.state = 203;
            this.match(PythonParser.GHOSTED_BLOCK_START);
          }
        }

        this.state = 206;
        this.match(PythonParser.DEF);
        this.state = 207;
        this.match(PythonParser.MAIN);
        this.state = 208;
        this.match(PythonParser.OPEN_BRACKET);
        this.state = 209;
        this.match(PythonParser.CLOSE_BRACKET);
        this.state = 210;
        this.match(PythonParser.ARROW);
        this.state = 211;
        this.match(PythonParser.NONE);
        this.state = 212;
        this.match(PythonParser.COLON);
        this.state = 213;
        this.match(PythonParser.NL);
        this.state = 217;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (
          ((_la & ~0x1f) === 0 && ((1 << _la) & 12384) !== 0) ||
          (((_la - 50) & ~0x1f) === 0 && ((1 << (_la - 50)) & 356519409) !== 0) ||
          (((_la - 95) & ~0x1f) === 0 && ((1 << (_la - 95)) & 536874239) !== 0)
        ) {
          {
            {
              this.state = 214;
              this.ordinaryStatement();
            }
          }
          this.state = 219;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 220;
        this.match(PythonParser.END_MAIN);
        this.state = 222;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 107) {
          {
            this.state = 221;
            this.match(PythonParser.GHOSTED_BLOCK_END);
          }
        }

        this.state = 224;
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
        this.state = 226;
        this.match(PythonParser.MAIN);
        this.state = 227;
        this.match(PythonParser.OPEN_BRACKET);
        this.state = 228;
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
        this.state = 231;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 106) {
          {
            this.state = 230;
            this.match(PythonParser.GHOSTED_BLOCK_START);
          }
        }

        this.state = 233;
        this.match(PythonParser.DEF);
        this.state = 234;
        this.methodName();
        this.state = 235;
        this.match(PythonParser.OPEN_BRACKET);
        this.state = 237;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 72 || _la === 95) {
          {
            this.state = 236;
            this.paramList();
          }
        }

        this.state = 239;
        this.match(PythonParser.CLOSE_BRACKET);
        this.state = 240;
        this.match(PythonParser.ARROW);
        this.state = 241;
        this.type_();
        this.state = 242;
        this.match(PythonParser.COLON);
        this.state = 244;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 124) {
          {
            this.state = 243;
            this.commentText();
          }
        }

        this.state = 246;
        this.match(PythonParser.NL);
        this.state = 250;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (
          ((_la & ~0x1f) === 0 && ((1 << _la) & 12384) !== 0) ||
          (((_la - 50) & ~0x1f) === 0 && ((1 << (_la - 50)) & 356519409) !== 0) ||
          (((_la - 95) & ~0x1f) === 0 && ((1 << (_la - 95)) & 536874239) !== 0)
        ) {
          {
            {
              this.state = 247;
              this.ordinaryStatement();
            }
          }
          this.state = 252;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 253;
        this.returnStatement();
        this.state = 254;
        this.match(PythonParser.END_FUNCTION);
        this.state = 256;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 107) {
          {
            this.state = 255;
            this.match(PythonParser.GHOSTED_BLOCK_END);
          }
        }

        this.state = 258;
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
        this.state = 261;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 106) {
          {
            this.state = 260;
            this.match(PythonParser.GHOSTED_BLOCK_START);
          }
        }

        this.state = 263;
        this.match(PythonParser.CLASS);
        this.state = 264;
        this.testName();
        this.state = 265;
        this.match(PythonParser.OPEN_BRACKET);
        this.state = 266;
        this.match(PythonParser.TESTCASE);
        this.state = 267;
        this.match(PythonParser.CLOSE_BRACKET);
        this.state = 268;
        this.match(PythonParser.COMMENT);
        this.state = 269;
        this.match(PythonParser.NL);
        this.state = 273;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (_la === 72 || _la === 95 || _la === 105 || _la === 124) {
          {
            {
              this.state = 270;
              this.testStatement();
            }
          }
          this.state = 275;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 276;
        this.match(PythonParser.END_TEST);
        this.state = 278;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 107) {
          {
            this.state = 277;
            this.match(PythonParser.GHOSTED_BLOCK_END);
          }
        }

        this.state = 280;
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
    this.enterRule(localContext, 12, PythonParser.RULE_testStatement);
    try {
      this.state = 285;
      this.errorHandler.sync(this);
      switch (this.interpreter.adaptivePredict(this.tokenStream, 16, this.context)) {
        case 1:
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 282;
            this.assert();
          }
          break;
        case 2:
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 283;
            this.variableDefinition();
          }
          break;
        case 3:
          this.enterOuterAlt(localContext, 3);
          {
            this.state = 284;
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
    this.enterRule(localContext, 14, PythonParser.RULE_procedure);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 288;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 106) {
          {
            this.state = 287;
            this.match(PythonParser.GHOSTED_BLOCK_START);
          }
        }

        this.state = 290;
        this.match(PythonParser.DEF);
        this.state = 291;
        this.methodName();
        this.state = 292;
        this.match(PythonParser.OPEN_BRACKET);
        this.state = 294;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 72 || _la === 95) {
          {
            this.state = 293;
            this.paramList();
          }
        }

        this.state = 296;
        this.match(PythonParser.CLOSE_BRACKET);
        this.state = 297;
        this.match(PythonParser.ARROW);
        this.state = 298;
        this.match(PythonParser.NONE);
        this.state = 299;
        this.match(PythonParser.COLON);
        this.state = 301;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 124) {
          {
            this.state = 300;
            this.commentText();
          }
        }

        this.state = 303;
        this.match(PythonParser.NL);
        this.state = 307;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (
          ((_la & ~0x1f) === 0 && ((1 << _la) & 12384) !== 0) ||
          (((_la - 50) & ~0x1f) === 0 && ((1 << (_la - 50)) & 356519409) !== 0) ||
          (((_la - 95) & ~0x1f) === 0 && ((1 << (_la - 95)) & 536874239) !== 0)
        ) {
          {
            {
              this.state = 304;
              this.ordinaryStatement();
            }
          }
          this.state = 309;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 310;
        this.match(PythonParser.END_PROCEDURE);
        this.state = 312;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 107) {
          {
            this.state = 311;
            this.match(PythonParser.GHOSTED_BLOCK_END);
          }
        }

        this.state = 314;
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
    this.enterRule(localContext, 16, PythonParser.RULE_constant);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 317;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 105) {
          {
            this.state = 316;
            this.match(PythonParser.GHOSTED_LINE);
          }
        }

        this.state = 319;
        this.identifierDef();
        this.state = 320;
        this.match(PythonParser.SINGLE_EQUALS);
        this.state = 321;
        this.constantValue();
        this.state = 323;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 124) {
          {
            this.state = 322;
            this.commentText();
          }
        }

        this.state = 325;
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
    this.enterRule(localContext, 18, PythonParser.RULE_enum);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 328;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 106) {
          {
            this.state = 327;
            this.match(PythonParser.GHOSTED_BLOCK_START);
          }
        }

        this.state = 330;
        this.match(PythonParser.CLASS);
        this.state = 331;
        this.typeName();
        this.state = 332;
        this.match(PythonParser.OPEN_BRACKET);
        this.state = 333;
        this.match(PythonParser.ENUM);
        this.state = 334;
        this.match(PythonParser.CLOSE_BRACKET);
        this.state = 335;
        this.match(PythonParser.COLON);
        this.state = 337;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 124) {
          {
            this.state = 336;
            this.commentText();
          }
        }

        this.state = 339;
        this.match(PythonParser.NL);
        this.state = 340;
        this.identifierList();
        this.state = 341;
        this.match(PythonParser.END_ENUM);
        this.state = 343;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 107) {
          {
            this.state = 342;
            this.match(PythonParser.GHOSTED_BLOCK_END);
          }
        }

        this.state = 345;
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
    this.enterRule(localContext, 20, PythonParser.RULE_concreteClass);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 348;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 106) {
          {
            this.state = 347;
            this.match(PythonParser.GHOSTED_BLOCK_START);
          }
        }

        this.state = 350;
        this.match(PythonParser.CLASS);
        this.state = 351;
        localContext._classTypeName = this.typeName();
        this.state = 356;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 78) {
          {
            this.state = 352;
            this.match(PythonParser.OPEN_BRACKET);
            this.state = 353;
            localContext._inheritsTypeName = this.typeName();
            this.state = 354;
            this.match(PythonParser.CLOSE_BRACKET);
          }
        }

        this.state = 358;
        this.match(PythonParser.COLON);
        this.state = 360;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 124) {
          {
            this.state = 359;
            this.commentText();
          }
        }

        this.state = 362;
        this.match(PythonParser.NL);
        this.state = 363;
        this.constructorMember();
        this.state = 367;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (
          _la === 45 ||
          (((_la - 95) & ~0x1f) === 0 && ((1 << (_la - 95)) & 536873985) !== 0)
        ) {
          {
            {
              this.state = 364;
              this.concreteClassMember();
            }
          }
          this.state = 369;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 370;
        this.match(PythonParser.END_CLASS);
        this.state = 372;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 107) {
          {
            this.state = 371;
            this.match(PythonParser.GHOSTED_BLOCK_END);
          }
        }

        this.state = 374;
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
    this.enterRule(localContext, 22, PythonParser.RULE_concreteClassMember);
    try {
      this.state = 380;
      this.errorHandler.sync(this);
      switch (this.interpreter.adaptivePredict(this.tokenStream, 32, this.context)) {
        case 1:
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 376;
            this.property();
          }
          break;
        case 2:
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 377;
            this.functionMethod();
          }
          break;
        case 3:
          this.enterOuterAlt(localContext, 3);
          {
            this.state = 378;
            this.procedureMethod();
          }
          break;
        case 4:
          this.enterOuterAlt(localContext, 4);
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
  public abstractClass(): AbstractClassContext {
    let localContext = new AbstractClassContext(this.context, this.state);
    this.enterRule(localContext, 24, PythonParser.RULE_abstractClass);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 383;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 106) {
          {
            this.state = 382;
            this.match(PythonParser.GHOSTED_BLOCK_START);
          }
        }

        this.state = 385;
        this.match(PythonParser.CLASS);
        this.state = 386;
        localContext._classTypeName = this.typeName();
        {
          this.state = 387;
          this.match(PythonParser.OPEN_BRACKET);
          this.state = 390;
          this.errorHandler.sync(this);
          switch (this.tokenStream.LA(1)) {
            case PythonParser.INT_NAME:
            case PythonParser.FLOAT_NAME:
            case PythonParser.BOOL_NAME:
            case PythonParser.STRING_NAME:
            case PythonParser.LIST_NAME:
            case PythonParser.NAME_STARTING_UC:
              {
                this.state = 388;
                localContext._inheritsTypeName = this.typeName();
              }
              break;
            case PythonParser.ABC:
              {
                this.state = 389;
                this.match(PythonParser.ABC);
              }
              break;
            default:
              throw new antlr.NoViableAltException(this);
          }
          this.state = 392;
          this.match(PythonParser.CLOSE_BRACKET);
        }
        this.state = 394;
        this.match(PythonParser.COLON);
        this.state = 396;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 124) {
          {
            this.state = 395;
            this.commentText();
          }
        }

        this.state = 398;
        this.match(PythonParser.NL);
        this.state = 402;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (
          _la === 45 ||
          (((_la - 95) & ~0x1f) === 0 && ((1 << (_la - 95)) & 805309441) !== 0)
        ) {
          {
            {
              this.state = 399;
              this.abstractClassMember();
            }
          }
          this.state = 404;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 405;
        this.match(PythonParser.END_CLASS);
        this.state = 407;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 107) {
          {
            this.state = 406;
            this.match(PythonParser.GHOSTED_BLOCK_END);
          }
        }

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
  public abstractClassMember(): AbstractClassMemberContext {
    let localContext = new AbstractClassMemberContext(this.context, this.state);
    this.enterRule(localContext, 26, PythonParser.RULE_abstractClassMember);
    try {
      this.state = 417;
      this.errorHandler.sync(this);
      switch (this.interpreter.adaptivePredict(this.tokenStream, 38, this.context)) {
        case 1:
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 411;
            this.property();
          }
          break;
        case 2:
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 412;
            this.functionMethod();
          }
          break;
        case 3:
          this.enterOuterAlt(localContext, 3);
          {
            this.state = 413;
            this.procedureMethod();
          }
          break;
        case 4:
          this.enterOuterAlt(localContext, 4);
          {
            this.state = 414;
            this.abstractFunction();
          }
          break;
        case 5:
          this.enterOuterAlt(localContext, 5);
          {
            this.state = 415;
            this.abstractProcedure();
          }
          break;
        case 6:
          this.enterOuterAlt(localContext, 6);
          {
            this.state = 416;
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
    this.enterRule(localContext, 28, PythonParser.RULE_comment);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 420;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 105) {
          {
            this.state = 419;
            this.match(PythonParser.GHOSTED_LINE);
          }
        }

        this.state = 422;
        this.commentText();
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
  public commentText(): CommentTextContext {
    let localContext = new CommentTextContext(this.context, this.state);
    this.enterRule(localContext, 30, PythonParser.RULE_commentText);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 425;
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
    this.enterRule(localContext, 32, PythonParser.RULE_ordinaryStatement);
    try {
      this.state = 436;
      this.errorHandler.sync(this);
      switch (this.interpreter.adaptivePredict(this.tokenStream, 40, this.context)) {
        case 1:
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 427;
            this.variableDefinition();
          }
          break;
        case 2:
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 428;
            this.assignment();
          }
          break;
        case 3:
          this.enterOuterAlt(localContext, 3);
          {
            this.state = 429;
            this.ifStatement();
          }
          break;
        case 4:
          this.enterOuterAlt(localContext, 4);
          {
            this.state = 430;
            this.whileLoop();
          }
          break;
        case 5:
          this.enterOuterAlt(localContext, 5);
          {
            this.state = 431;
            this.forLoop();
          }
          break;
        case 6:
          this.enterOuterAlt(localContext, 6);
          {
            this.state = 432;
            this.procedureCall();
          }
          break;
        case 7:
          this.enterOuterAlt(localContext, 7);
          {
            this.state = 433;
            this.tryStatement();
          }
          break;
        case 8:
          this.enterOuterAlt(localContext, 8);
          {
            this.state = 434;
            this.throwStatement();
          }
          break;
        case 9:
          this.enterOuterAlt(localContext, 9);
          {
            this.state = 435;
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
    this.enterRule(localContext, 34, PythonParser.RULE_variableDefinition);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 439;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 105) {
          {
            this.state = 438;
            this.match(PythonParser.GHOSTED_LINE);
          }
        }

        this.state = 441;
        this.identifierDef();
        this.state = 442;
        this.match(PythonParser.SINGLE_EQUALS);
        this.state = 443;
        this.expression(0);
        this.state = 444;
        this.match(PythonParser.VARIABLE_DEFINITION_ANNOTATION);
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
  public assignment(): AssignmentContext {
    let localContext = new AssignmentContext(this.context, this.state);
    this.enterRule(localContext, 36, PythonParser.RULE_assignment);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 448;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 105) {
          {
            this.state = 447;
            this.match(PythonParser.GHOSTED_LINE);
          }
        }

        this.state = 450;
        this.assignable(0);
        this.state = 451;
        this.match(PythonParser.SINGLE_EQUALS);
        this.state = 452;
        this.expression(0);
        this.state = 453;
        this.match(PythonParser.ASSIGNMENT_ANNOTATION);
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
  public ifStatement(): IfStatementContext {
    let localContext = new IfStatementContext(this.context, this.state);
    this.enterRule(localContext, 38, PythonParser.RULE_ifStatement);
    let _la: number;
    try {
      let alternative: number;
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 457;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 106) {
          {
            this.state = 456;
            this.match(PythonParser.GHOSTED_BLOCK_START);
          }
        }

        this.state = 459;
        this.match(PythonParser.IF);
        this.state = 460;
        localContext._condition = this.expression(0);
        this.state = 461;
        this.match(PythonParser.COLON);
        this.state = 463;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 124) {
          {
            this.state = 462;
            this.commentText();
          }
        }

        this.state = 465;
        this.match(PythonParser.NL);
        this.state = 466;
        this.thenClause();
        this.state = 470;
        this.errorHandler.sync(this);
        alternative = this.interpreter.adaptivePredict(this.tokenStream, 45, this.context);
        while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
          if (alternative === 1) {
            {
              {
                this.state = 467;
                this.elseIfClause();
              }
            }
          }
          this.state = 472;
          this.errorHandler.sync(this);
          alternative = this.interpreter.adaptivePredict(this.tokenStream, 45, this.context);
        }
        this.state = 474;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 3 || _la === 106) {
          {
            this.state = 473;
            this.elseClause();
          }
        }

        this.state = 476;
        this.match(PythonParser.END_IF);
        this.state = 478;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 107) {
          {
            this.state = 477;
            this.match(PythonParser.GHOSTED_BLOCK_END);
          }
        }

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
  public thenClause(): ThenClauseContext {
    let localContext = new ThenClauseContext(this.context, this.state);
    this.enterRule(localContext, 40, PythonParser.RULE_thenClause);
    try {
      let alternative: number;
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 485;
        this.errorHandler.sync(this);
        alternative = this.interpreter.adaptivePredict(this.tokenStream, 48, this.context);
        while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
          if (alternative === 1) {
            {
              {
                this.state = 482;
                this.ordinaryStatement();
              }
            }
          }
          this.state = 487;
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
  public elseIfClause(): ElseIfClauseContext {
    let localContext = new ElseIfClauseContext(this.context, this.state);
    this.enterRule(localContext, 42, PythonParser.RULE_elseIfClause);
    let _la: number;
    try {
      let alternative: number;
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 489;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 106) {
          {
            this.state = 488;
            this.match(PythonParser.GHOSTED_BLOCK_START);
          }
        }

        this.state = 491;
        this.match(PythonParser.ELIF);
        this.state = 492;
        this.expression(0);
        this.state = 493;
        this.match(PythonParser.COLON);
        this.state = 495;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 124) {
          {
            this.state = 494;
            this.commentText();
          }
        }

        this.state = 497;
        this.match(PythonParser.NL);
        this.state = 501;
        this.errorHandler.sync(this);
        alternative = this.interpreter.adaptivePredict(this.tokenStream, 51, this.context);
        while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
          if (alternative === 1) {
            {
              {
                this.state = 498;
                this.ordinaryStatement();
              }
            }
          }
          this.state = 503;
          this.errorHandler.sync(this);
          alternative = this.interpreter.adaptivePredict(this.tokenStream, 51, this.context);
        }
        this.state = 505;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 107) {
          {
            this.state = 504;
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
    this.enterRule(localContext, 44, PythonParser.RULE_elseClause);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 508;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 106) {
          {
            this.state = 507;
            this.match(PythonParser.GHOSTED_BLOCK_START);
          }
        }

        this.state = 510;
        this.match(PythonParser.ELSE);
        this.state = 511;
        this.match(PythonParser.COLON);
        this.state = 513;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 124) {
          {
            this.state = 512;
            this.commentText();
          }
        }

        this.state = 515;
        this.match(PythonParser.NL);
        this.state = 519;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (
          ((_la & ~0x1f) === 0 && ((1 << _la) & 12384) !== 0) ||
          (((_la - 50) & ~0x1f) === 0 && ((1 << (_la - 50)) & 356519409) !== 0) ||
          (((_la - 95) & ~0x1f) === 0 && ((1 << (_la - 95)) & 536874239) !== 0)
        ) {
          {
            {
              this.state = 516;
              this.ordinaryStatement();
            }
          }
          this.state = 521;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 523;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 107) {
          {
            this.state = 522;
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
    this.enterRule(localContext, 46, PythonParser.RULE_whileLoop);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 526;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 106) {
          {
            this.state = 525;
            this.match(PythonParser.GHOSTED_BLOCK_START);
          }
        }

        this.state = 528;
        this.match(PythonParser.WHILE);
        this.state = 529;
        this.expression(0);
        this.state = 530;
        this.match(PythonParser.COLON);
        this.state = 532;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 124) {
          {
            this.state = 531;
            this.commentText();
          }
        }

        this.state = 534;
        this.match(PythonParser.NL);
        this.state = 538;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (
          ((_la & ~0x1f) === 0 && ((1 << _la) & 12384) !== 0) ||
          (((_la - 50) & ~0x1f) === 0 && ((1 << (_la - 50)) & 356519409) !== 0) ||
          (((_la - 95) & ~0x1f) === 0 && ((1 << (_la - 95)) & 536874239) !== 0)
        ) {
          {
            {
              this.state = 535;
              this.ordinaryStatement();
            }
          }
          this.state = 540;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 541;
        this.match(PythonParser.END_WHILE);
        this.state = 542;
        this.match(PythonParser.GHOSTED_BLOCK_END);
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
  public forLoop(): ForLoopContext {
    let localContext = new ForLoopContext(this.context, this.state);
    this.enterRule(localContext, 48, PythonParser.RULE_forLoop);
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
            this.match(PythonParser.GHOSTED_BLOCK_START);
          }
        }

        this.state = 548;
        this.match(PythonParser.FOR);
        this.state = 549;
        this.identifierDef();
        this.state = 550;
        this.match(PythonParser.IN);
        this.state = 551;
        this.expression(0);
        this.state = 552;
        this.match(PythonParser.COLON);
        this.state = 554;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 124) {
          {
            this.state = 553;
            this.commentText();
          }
        }

        this.state = 556;
        this.match(PythonParser.NL);
        this.state = 560;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (
          ((_la & ~0x1f) === 0 && ((1 << _la) & 12384) !== 0) ||
          (((_la - 50) & ~0x1f) === 0 && ((1 << (_la - 50)) & 356519409) !== 0) ||
          (((_la - 95) & ~0x1f) === 0 && ((1 << (_la - 95)) & 536874239) !== 0)
        ) {
          {
            {
              this.state = 557;
              this.ordinaryStatement();
            }
          }
          this.state = 562;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 563;
        this.match(PythonParser.END_FOR);
        this.state = 564;
        this.match(PythonParser.GHOSTED_BLOCK_END);
        this.state = 565;
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
    this.enterRule(localContext, 50, PythonParser.RULE_procedureCall);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 568;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 105) {
          {
            this.state = 567;
            this.match(PythonParser.GHOSTED_LINE);
          }
        }

        this.state = 570;
        this.term(0);
        this.state = 572;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 124) {
          {
            this.state = 571;
            this.commentText();
          }
        }

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
  public tryStatement(): TryStatementContext {
    let localContext = new TryStatementContext(this.context, this.state);
    this.enterRule(localContext, 52, PythonParser.RULE_tryStatement);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 577;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 106) {
          {
            this.state = 576;
            this.match(PythonParser.GHOSTED_BLOCK_START);
          }
        }

        this.state = 579;
        this.match(PythonParser.TRY);
        this.state = 580;
        this.match(PythonParser.COLON);
        this.state = 582;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 124) {
          {
            this.state = 581;
            this.commentText();
          }
        }

        this.state = 584;
        this.match(PythonParser.NL);
        this.state = 585;
        this.tryClause();
        this.state = 587;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        do {
          {
            {
              this.state = 586;
              this.catchClause();
            }
          }
          this.state = 589;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        } while (_la === 46 || _la === 106);
        this.state = 591;
        this.match(PythonParser.END_TRY);
        this.state = 593;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 107) {
          {
            this.state = 592;
            this.match(PythonParser.GHOSTED_BLOCK_END);
          }
        }

        this.state = 595;
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
    this.enterRule(localContext, 54, PythonParser.RULE_tryClause);
    try {
      let alternative: number;
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 600;
        this.errorHandler.sync(this);
        alternative = this.interpreter.adaptivePredict(this.tokenStream, 69, this.context);
        while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
          if (alternative === 1) {
            {
              {
                this.state = 597;
                this.ordinaryStatement();
              }
            }
          }
          this.state = 602;
          this.errorHandler.sync(this);
          alternative = this.interpreter.adaptivePredict(this.tokenStream, 69, this.context);
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
    this.enterRule(localContext, 56, PythonParser.RULE_catchClause);
    let _la: number;
    try {
      let alternative: number;
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 604;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 106) {
          {
            this.state = 603;
            this.match(PythonParser.GHOSTED_BLOCK_START);
          }
        }

        this.state = 606;
        this.match(PythonParser.EXCEPT);
        this.state = 607;
        this.typeName();
        this.state = 608;
        this.match(PythonParser.AS);
        this.state = 609;
        this.identifierDef();
        this.state = 610;
        this.match(PythonParser.COLON);
        this.state = 612;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 124) {
          {
            this.state = 611;
            this.commentText();
          }
        }

        this.state = 614;
        this.match(PythonParser.NL);
        this.state = 618;
        this.errorHandler.sync(this);
        alternative = this.interpreter.adaptivePredict(this.tokenStream, 72, this.context);
        while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
          if (alternative === 1) {
            {
              {
                this.state = 615;
                this.ordinaryStatement();
              }
            }
          }
          this.state = 620;
          this.errorHandler.sync(this);
          alternative = this.interpreter.adaptivePredict(this.tokenStream, 72, this.context);
        }
        this.state = 622;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 107) {
          {
            this.state = 621;
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
    this.enterRule(localContext, 58, PythonParser.RULE_throwStatement);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 625;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 105) {
          {
            this.state = 624;
            this.match(PythonParser.GHOSTED_LINE);
          }
        }

        this.state = 627;
        this.match(PythonParser.RAISE);
        this.state = 628;
        this.typeName();
        this.state = 629;
        this.match(PythonParser.OPEN_BRACKET);
        this.state = 630;
        this.errorMessage();
        this.state = 631;
        this.match(PythonParser.CLOSE_BRACKET);
        this.state = 633;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 124) {
          {
            this.state = 632;
            this.commentText();
          }
        }

        this.state = 635;
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
    this.enterRule(localContext, 60, PythonParser.RULE_errorMessage);
    try {
      this.state = 639;
      this.errorHandler.sync(this);
      switch (this.tokenStream.LA(1)) {
        case PythonParser.LITERAL_STRING:
        case PythonParser.INTERPOLATED_STRING:
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 637;
            this.litString();
          }
          break;
        case PythonParser.NAME_STARTING_LC:
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 638;
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
    this.enterRule(localContext, 62, PythonParser.RULE_assert);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 642;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 105) {
          {
            this.state = 641;
            this.match(PythonParser.GHOSTED_LINE);
          }
        }

        this.state = 644;
        this.match(PythonParser.THIS_INSTANCE);
        this.state = 645;
        this.match(PythonParser.DOT);
        this.state = 646;
        this.match(PythonParser.ASSERT_EQUAL);
        this.state = 647;
        this.match(PythonParser.OPEN_BRACKET);
        this.state = 648;
        this.assertActual();
        this.state = 649;
        this.match(PythonParser.COMMA);
        this.state = 650;
        this.assertExpected();
        this.state = 651;
        this.match(PythonParser.CLOSE_BRACKET);
        this.state = 653;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 124) {
          {
            this.state = 652;
            this.commentText();
          }
        }

        this.state = 655;
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
    this.enterRule(localContext, 64, PythonParser.RULE_returnStatement);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 657;
        this.match(PythonParser.RETURN);
        this.state = 658;
        this.expression(0);
        this.state = 660;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 124) {
          {
            this.state = 659;
            this.commentText();
          }
        }

        this.state = 662;
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
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 665;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 106) {
          {
            this.state = 664;
            this.match(PythonParser.GHOSTED_BLOCK_START);
          }
        }

        this.state = 667;
        this.match(PythonParser.DEF);
        this.state = 668;
        this.match(PythonParser.INIT);
        this.state = 669;
        this.match(PythonParser.OPEN_BRACKET);
        this.state = 671;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 72 || _la === 95) {
          {
            this.state = 670;
            this.paramList();
          }
        }

        this.state = 673;
        this.match(PythonParser.CLOSE_BRACKET);
        this.state = 674;
        this.match(PythonParser.ARROW);
        this.state = 675;
        this.match(PythonParser.NONE);
        this.state = 676;
        this.match(PythonParser.COLON);
        this.state = 678;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 124) {
          {
            this.state = 677;
            this.commentText();
          }
        }

        this.state = 680;
        this.match(PythonParser.GHOSTED_BLOCK_END);
        this.state = 681;
        this.match(PythonParser.NL);
        this.state = 685;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (
          ((_la & ~0x1f) === 0 && ((1 << _la) & 12384) !== 0) ||
          (((_la - 50) & ~0x1f) === 0 && ((1 << (_la - 50)) & 356519409) !== 0) ||
          (((_la - 95) & ~0x1f) === 0 && ((1 << (_la - 95)) & 536874239) !== 0)
        ) {
          {
            {
              this.state = 682;
              this.ordinaryStatement();
            }
          }
          this.state = 687;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 688;
        this.match(PythonParser.END_CONSTRUCTOR);
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
  public property(): PropertyContext {
    let localContext = new PropertyContext(this.context, this.state);
    this.enterRule(localContext, 68, PythonParser.RULE_property);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 692;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 105) {
          {
            this.state = 691;
            this.match(PythonParser.GHOSTED_LINE);
          }
        }

        this.state = 694;
        this.identifierDef();
        this.state = 695;
        this.match(PythonParser.COLON);
        this.state = 696;
        this.type_();
        this.state = 698;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 124) {
          {
            this.state = 697;
            this.commentText();
          }
        }

        this.state = 700;
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
        this.state = 703;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 106) {
          {
            this.state = 702;
            this.match(PythonParser.GHOSTED_BLOCK_START);
          }
        }

        this.state = 705;
        this.match(PythonParser.DEF);
        this.state = 706;
        this.methodName();
        this.state = 707;
        this.match(PythonParser.OPEN_BRACKET);
        this.state = 709;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 72 || _la === 95) {
          {
            this.state = 708;
            this.paramList();
          }
        }

        this.state = 711;
        this.match(PythonParser.CLOSE_BRACKET);
        this.state = 712;
        this.match(PythonParser.ARROW);
        this.state = 713;
        this.type_();
        this.state = 714;
        this.match(PythonParser.COLON);
        this.state = 716;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 124) {
          {
            this.state = 715;
            this.commentText();
          }
        }

        this.state = 718;
        this.match(PythonParser.NL);
        this.state = 722;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (
          ((_la & ~0x1f) === 0 && ((1 << _la) & 12384) !== 0) ||
          (((_la - 50) & ~0x1f) === 0 && ((1 << (_la - 50)) & 356519409) !== 0) ||
          (((_la - 95) & ~0x1f) === 0 && ((1 << (_la - 95)) & 536874239) !== 0)
        ) {
          {
            {
              this.state = 719;
              this.ordinaryStatement();
            }
          }
          this.state = 724;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 725;
        this.returnStatement();
        this.state = 726;
        this.match(PythonParser.END_FUNCTION);
        this.state = 728;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 107) {
          {
            this.state = 727;
            this.match(PythonParser.GHOSTED_BLOCK_END);
          }
        }

        this.state = 730;
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
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 733;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 106) {
          {
            this.state = 732;
            this.match(PythonParser.GHOSTED_BLOCK_START);
          }
        }

        this.state = 735;
        this.match(PythonParser.DEF);
        this.state = 736;
        this.methodName();
        this.state = 737;
        this.match(PythonParser.OPEN_BRACKET);
        this.state = 739;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 72 || _la === 95) {
          {
            this.state = 738;
            this.paramList();
          }
        }

        this.state = 741;
        this.match(PythonParser.CLOSE_BRACKET);
        this.state = 742;
        this.match(PythonParser.ARROW);
        this.state = 743;
        this.match(PythonParser.NONE);
        this.state = 744;
        this.match(PythonParser.COLON);
        this.state = 746;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 124) {
          {
            this.state = 745;
            this.commentText();
          }
        }

        this.state = 748;
        this.match(PythonParser.NL);
        this.state = 752;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (
          ((_la & ~0x1f) === 0 && ((1 << _la) & 12384) !== 0) ||
          (((_la - 50) & ~0x1f) === 0 && ((1 << (_la - 50)) & 356519409) !== 0) ||
          (((_la - 95) & ~0x1f) === 0 && ((1 << (_la - 95)) & 536874239) !== 0)
        ) {
          {
            {
              this.state = 749;
              this.ordinaryStatement();
            }
          }
          this.state = 754;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 755;
        this.match(PythonParser.END_PROCEDURE);
        this.state = 757;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 107) {
          {
            this.state = 756;
            this.match(PythonParser.GHOSTED_BLOCK_END);
          }
        }

        this.state = 759;
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
        this.state = 762;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 105) {
          {
            this.state = 761;
            this.match(PythonParser.GHOSTED_LINE);
          }
        }

        this.state = 764;
        this.match(PythonParser.ABSTRACT_METHOD);
        this.state = 765;
        this.match(PythonParser.NL);
        this.state = 766;
        this.match(PythonParser.DEF);
        this.state = 767;
        this.methodName();
        this.state = 768;
        this.match(PythonParser.OPEN_BRACKET);
        this.state = 770;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 72 || _la === 95) {
          {
            this.state = 769;
            this.paramList();
          }
        }

        this.state = 772;
        this.match(PythonParser.CLOSE_BRACKET);
        this.state = 773;
        this.match(PythonParser.ARROW);
        this.state = 774;
        this.type_();
        this.state = 775;
        this.match(PythonParser.COLON);
        this.state = 776;
        this.match(PythonParser.NL);
        this.state = 777;
        this.match(PythonParser.PASS);
        this.state = 779;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 124) {
          {
            this.state = 778;
            this.commentText();
          }
        }

        this.state = 781;
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
        this.state = 784;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 105) {
          {
            this.state = 783;
            this.match(PythonParser.GHOSTED_LINE);
          }
        }

        this.state = 786;
        this.match(PythonParser.ABSTRACT_METHOD);
        this.state = 787;
        this.match(PythonParser.NL);
        this.state = 788;
        this.match(PythonParser.DEF);
        this.state = 789;
        this.methodName();
        this.state = 790;
        this.match(PythonParser.OPEN_BRACKET);
        this.state = 792;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 72 || _la === 95) {
          {
            this.state = 791;
            this.paramList();
          }
        }

        this.state = 794;
        this.match(PythonParser.CLOSE_BRACKET);
        this.state = 795;
        this.match(PythonParser.ARROW);
        this.state = 796;
        this.match(PythonParser.NONE);
        this.state = 797;
        this.match(PythonParser.COLON);
        this.state = 798;
        this.match(PythonParser.NL);
        this.state = 799;
        this.match(PythonParser.PASS);
        this.state = 801;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 124) {
          {
            this.state = 800;
            this.commentText();
          }
        }

        this.state = 803;
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
        this.state = 805;
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
        this.state = 807;
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
        this.state = 814;
        this.errorHandler.sync(this);
        switch (this.tokenStream.LA(1)) {
          case PythonParser.NAME_STARTING_LC:
            {
              localContext = new SimpleAssignableContext(localContext);
              this.context = localContext;
              previousContext = localContext;

              this.state = 810;
              this.identifierUse();
            }
            break;
          case PythonParser.THIS_INSTANCE:
            {
              localContext = new ThisAssignableContext(localContext);
              this.context = localContext;
              previousContext = localContext;
              this.state = 811;
              this.match(PythonParser.THIS_INSTANCE);
              this.state = 812;
              this.match(PythonParser.DOT);
              this.state = 813;
              this.identifierUse();
            }
            break;
          default:
            throw new antlr.NoViableAltException(this);
        }
        this.context!.stop = this.tokenStream.LT(-1);
        this.state = 820;
        this.errorHandler.sync(this);
        alternative = this.interpreter.adaptivePredict(this.tokenStream, 103, this.context);
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
                this.state = 816;
                if (!this.precpred(this.context, 1)) {
                  throw this.createFailedPredicateException("this.precpred(this.context, 1)");
                }
                this.state = 817;
                this.index();
              }
            }
          }
          this.state = 822;
          this.errorHandler.sync(this);
          alternative = this.interpreter.adaptivePredict(this.tokenStream, 103, this.context);
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
        this.state = 823;
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
        this.state = 825;
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
    try {
      this.state = 833;
      this.errorHandler.sync(this);
      switch (this.tokenStream.LA(1)) {
        case PythonParser.INT_NAME:
          localContext = new IntTypeNameContext(localContext);
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 827;
            this.match(PythonParser.INT_NAME);
          }
          break;
        case PythonParser.FLOAT_NAME:
          localContext = new FloatTypeNameContext(localContext);
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 828;
            this.match(PythonParser.FLOAT_NAME);
          }
          break;
        case PythonParser.BOOL_NAME:
          localContext = new BoolTypeNameContext(localContext);
          this.enterOuterAlt(localContext, 3);
          {
            this.state = 829;
            this.match(PythonParser.BOOL_NAME);
          }
          break;
        case PythonParser.STRING_NAME:
          localContext = new StringTypeNameContext(localContext);
          this.enterOuterAlt(localContext, 4);
          {
            this.state = 830;
            this.match(PythonParser.STRING_NAME);
          }
          break;
        case PythonParser.LIST_NAME:
          localContext = new ListTypeNameContext(localContext);
          this.enterOuterAlt(localContext, 5);
          {
            this.state = 831;
            this.match(PythonParser.LIST_NAME);
          }
          break;
        case PythonParser.NAME_STARTING_UC:
          localContext = new UdtTypeNameContext(localContext);
          this.enterOuterAlt(localContext, 6);
          {
            this.state = 832;
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
    this.enterRule(localContext, 90, PythonParser.RULE_constantValue);
    try {
      this.state = 839;
      this.errorHandler.sync(this);
      switch (this.tokenStream.LA(1)) {
        case PythonParser.TRUE:
        case PythonParser.FALSE:
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 835;
            this.litBoolean();
          }
          break;
        case PythonParser.LITERAL_BINARY:
        case PythonParser.LITERAL_HEX:
        case PythonParser.LITERAL_INTEGER:
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 836;
            this.litInt();
          }
          break;
        case PythonParser.LITERAL_FLOAT:
          this.enterOuterAlt(localContext, 3);
          {
            this.state = 837;
            this.litFloat();
          }
          break;
        case PythonParser.LITERAL_STRING:
        case PythonParser.INTERPOLATED_STRING:
          this.enterOuterAlt(localContext, 4);
          {
            this.state = 838;
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
    this.enterRule(localContext, 92, PythonParser.RULE_argList);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 841;
        this.argument();
        this.state = 846;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (_la === 81) {
          {
            {
              this.state = 842;
              this.match(PythonParser.COMMA);
              this.state = 843;
              this.argument();
            }
          }
          this.state = 848;
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
      this.state = 851;
      this.errorHandler.sync(this);
      switch (this.tokenStream.LA(1)) {
        case PythonParser.LAMBDA:
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 849;
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
            this.state = 850;
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
        this.state = 853;
        this.paramDef();
        this.state = 858;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (_la === 81) {
          {
            {
              this.state = 854;
              this.match(PythonParser.COMMA);
              this.state = 855;
              this.paramDef();
            }
          }
          this.state = 860;
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
        this.state = 861;
        this.identifierDef();
        this.state = 864;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        do {
          {
            {
              this.state = 862;
              this.match(PythonParser.COMMA);
              this.state = 863;
              this.identifierDef();
            }
          }
          this.state = 866;
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
    this.enterRule(localContext, 100, PythonParser.RULE_expressionList);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 868;
        this.expression(0);
        this.state = 873;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (_la === 81) {
          {
            {
              this.state = 869;
              this.match(PythonParser.COMMA);
              this.state = 870;
              this.expression(0);
            }
          }
          this.state = 875;
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
    this.enterRule(localContext, 102, PythonParser.RULE_enumDefValue);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 876;
        this.identifierDef();
        this.state = 877;
        this.match(PythonParser.SINGLE_EQUALS);
        this.state = 878;
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
    this.enterRule(localContext, 104, PythonParser.RULE_enumList);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 880;
        this.enumDefValue();
        this.state = 885;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (_la === 93) {
          {
            {
              this.state = 881;
              this.match(PythonParser.NL);
              this.state = 882;
              this.enumDefValue();
            }
          }
          this.state = 887;
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
    this.enterRule(localContext, 106, PythonParser.RULE_type);
    try {
      this.state = 892;
      this.errorHandler.sync(this);
      switch (this.interpreter.adaptivePredict(this.tokenStream, 112, this.context)) {
        case 1:
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 888;
            this.typeTuple();
          }
          break;
        case 2:
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 889;
            this.typeName();
          }
          break;
        case 3:
          this.enterOuterAlt(localContext, 3);
          {
            this.state = 890;
            this.typeGeneric();
          }
          break;
        case 4:
          this.enterOuterAlt(localContext, 4);
          {
            this.state = 891;
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
    this.enterRule(localContext, 108, PythonParser.RULE_assertActual);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 894;
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
    this.enterRule(localContext, 110, PythonParser.RULE_assertExpected);
    try {
      this.state = 901;
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
            this.state = 896;
            this.litValue();
          }
          break;
        case PythonParser.OPEN_SQ_BRACKET:
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 897;
            this.list();
          }
          break;
        case PythonParser.OPEN_BRACE:
          this.enterOuterAlt(localContext, 3);
          {
            this.state = 898;
            this.dictionary();
          }
          break;
        case PythonParser.NOT:
        case PythonParser.MINUS:
          this.enterOuterAlt(localContext, 4);
          {
            this.state = 899;
            this.unaryExpression();
          }
          break;
        case PythonParser.OPEN_BRACKET:
          this.enterOuterAlt(localContext, 5);
          {
            this.state = 900;
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
    this.enterRule(localContext, 112, PythonParser.RULE_litValue);
    try {
      this.state = 909;
      this.errorHandler.sync(this);
      switch (this.interpreter.adaptivePredict(this.tokenStream, 114, this.context)) {
        case 1:
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 903;
            this.litBoolean();
          }
          break;
        case 2:
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 904;
            this.litInt();
          }
          break;
        case 3:
          this.enterOuterAlt(localContext, 3);
          {
            this.state = 905;
            this.litFloat();
          }
          break;
        case 4:
          this.enterOuterAlt(localContext, 4);
          {
            this.state = 906;
            this.litString();
          }
          break;
        case 5:
          this.enterOuterAlt(localContext, 5);
          {
            this.state = 907;
            this.interpolatedString();
          }
          break;
        case 6:
          this.enterOuterAlt(localContext, 6);
          {
            this.state = 908;
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
    this.enterRule(localContext, 114, PythonParser.RULE_litBoolean);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 911;
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
    this.enterRule(localContext, 116, PythonParser.RULE_litInt);
    try {
      this.state = 916;
      this.errorHandler.sync(this);
      switch (this.tokenStream.LA(1)) {
        case PythonParser.LITERAL_INTEGER:
          localContext = new LitIntegerContext(localContext);
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 913;
            this.match(PythonParser.LITERAL_INTEGER);
          }
          break;
        case PythonParser.LITERAL_BINARY:
          localContext = new LitBinaryContext(localContext);
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 914;
            this.match(PythonParser.LITERAL_BINARY);
          }
          break;
        case PythonParser.LITERAL_HEX:
          localContext = new LitHexContext(localContext);
          this.enterOuterAlt(localContext, 3);
          {
            this.state = 915;
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
    this.enterRule(localContext, 118, PythonParser.RULE_litFloat);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 918;
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
    this.enterRule(localContext, 120, PythonParser.RULE_litString);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 920;
        _la = this.tokenStream.LA(1);
        if (!(_la === 101 || _la === 102)) {
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
    this.enterRule(localContext, 122, PythonParser.RULE_enumValue);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 922;
        this.typeName();
        this.state = 923;
        this.match(PythonParser.DOT);
        this.state = 924;
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
    this.enterRule(localContext, 124, PythonParser.RULE_index);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 926;
        this.match(PythonParser.OPEN_SQ_BRACKET);
        this.state = 927;
        this.expression(0);
        this.state = 928;
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
    let _startState = 126;
    this.enterRecursionRule(localContext, 126, PythonParser.RULE_expression, _p);
    let _la: number;
    try {
      let alternative: number;
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 935;
        this.errorHandler.sync(this);
        switch (this.interpreter.adaptivePredict(this.tokenStream, 116, this.context)) {
          case 1:
            {
              localContext = new NewInstanceExpressionContext(localContext);
              this.context = localContext;
              previousContext = localContext;

              this.state = 931;
              this.newInstance();
            }
            break;
          case 2:
            {
              localContext = new UnaryExpressionLabelContext(localContext);
              this.context = localContext;
              previousContext = localContext;
              this.state = 932;
              this.unaryExpression();
            }
            break;
          case 3:
            {
              localContext = new TermExpressionContext(localContext);
              this.context = localContext;
              previousContext = localContext;
              this.state = 933;
              this.term(0);
            }
            break;
          case 4:
            {
              localContext = new BinaryExpressionLabelContext(localContext);
              this.context = localContext;
              previousContext = localContext;
              this.state = 934;
              this.binaryExpression();
            }
            break;
        }
        this.context!.stop = this.tokenStream.LT(-1);
        this.state = 952;
        this.errorHandler.sync(this);
        alternative = this.interpreter.adaptivePredict(this.tokenStream, 118, this.context);
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
                this.state = 937;
                if (!this.precpred(this.context, 1)) {
                  throw this.createFailedPredicateException("this.precpred(this.context, 1)");
                }
                this.state = 938;
                this.match(PythonParser.IF);
                this.state = 939;
                (localContext as IfExpressionContext)._condition = this.expression(0);
                this.state = 944;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 2) {
                  {
                    {
                      this.state = 940;
                      this.match(PythonParser.ELIF);
                      this.state = 941;
                      (localContext as IfExpressionContext)._elifCondition = this.expression(0);
                    }
                  }
                  this.state = 946;
                  this.errorHandler.sync(this);
                  _la = this.tokenStream.LA(1);
                }
                this.state = 947;
                this.match(PythonParser.ELSE);
                this.state = 948;
                (localContext as IfExpressionContext)._falseExpr = this.expression(2);
              }
            }
          }
          this.state = 954;
          this.errorHandler.sync(this);
          alternative = this.interpreter.adaptivePredict(this.tokenStream, 118, this.context);
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
    let _startState = 128;
    this.enterRecursionRule(localContext, 128, PythonParser.RULE_term, _p);
    try {
      let alternative: number;
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 964;
        this.errorHandler.sync(this);
        switch (this.interpreter.adaptivePredict(this.tokenStream, 119, this.context)) {
          case 1:
            {
              localContext = new ThisInstanceTermContext(localContext);
              this.context = localContext;
              previousContext = localContext;

              this.state = 956;
              this.thisInstance();
            }
            break;
          case 2:
            {
              localContext = new BracketedExpressionTermContext(localContext);
              this.context = localContext;
              previousContext = localContext;
              this.state = 957;
              this.bracketedExpression();
            }
            break;
          case 3:
            {
              localContext = new LitValueTermContext(localContext);
              this.context = localContext;
              previousContext = localContext;
              this.state = 958;
              this.litValue();
            }
            break;
          case 4:
            {
              localContext = new ListTermContext(localContext);
              this.context = localContext;
              previousContext = localContext;
              this.state = 959;
              this.list();
            }
            break;
          case 5:
            {
              localContext = new DictionaryTermContext(localContext);
              this.context = localContext;
              previousContext = localContext;
              this.state = 960;
              this.dictionary();
            }
            break;
          case 6:
            {
              localContext = new TupleTermContext(localContext);
              this.context = localContext;
              previousContext = localContext;
              this.state = 961;
              this.tuple();
            }
            break;
          case 7:
            {
              localContext = new IdentifierUseTermContext(localContext);
              this.context = localContext;
              previousContext = localContext;
              this.state = 962;
              this.identifierUse();
            }
            break;
          case 8:
            {
              localContext = new MethodCallTermContext(localContext);
              this.context = localContext;
              previousContext = localContext;
              this.state = 963;
              this.methodCall();
            }
            break;
        }
        this.context!.stop = this.tokenStream.LT(-1);
        this.state = 973;
        this.errorHandler.sync(this);
        alternative = this.interpreter.adaptivePredict(this.tokenStream, 121, this.context);
        while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
          if (alternative === 1) {
            if (this.parseListeners != null) {
              this.triggerExitRuleEvent();
            }
            previousContext = localContext;
            {
              this.state = 971;
              this.errorHandler.sync(this);
              switch (this.interpreter.adaptivePredict(this.tokenStream, 120, this.context)) {
                case 1:
                  {
                    localContext = new IndexedTermContext(
                      new TermContext(parentContext, parentState),
                    );
                    this.pushNewRecursionContext(localContext, _startState, PythonParser.RULE_term);
                    this.state = 966;
                    if (!this.precpred(this.context, 2)) {
                      throw this.createFailedPredicateException("this.precpred(this.context, 2)");
                    }
                    this.state = 967;
                    this.index();
                  }
                  break;
                case 2:
                  {
                    localContext = new ChainableTermContext(
                      new TermContext(parentContext, parentState),
                    );
                    this.pushNewRecursionContext(localContext, _startState, PythonParser.RULE_term);
                    this.state = 968;
                    if (!this.precpred(this.context, 1)) {
                      throw this.createFailedPredicateException("this.precpred(this.context, 1)");
                    }
                    this.state = 969;
                    this.match(PythonParser.DOT);
                    this.state = 970;
                    this.chainable();
                  }
                  break;
              }
            }
          }
          this.state = 975;
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
  public chainable(): ChainableContext {
    let localContext = new ChainableContext(this.context, this.state);
    this.enterRule(localContext, 130, PythonParser.RULE_chainable);
    try {
      this.state = 978;
      this.errorHandler.sync(this);
      switch (this.interpreter.adaptivePredict(this.tokenStream, 122, this.context)) {
        case 1:
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 976;
            this.identifierUse();
          }
          break;
        case 2:
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 977;
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
    this.enterRule(localContext, 132, PythonParser.RULE_thisInstance);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 980;
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
    this.enterRule(localContext, 134, PythonParser.RULE_bracketedExpression);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 982;
        this.match(PythonParser.OPEN_BRACKET);
        this.state = 983;
        this.expression(0);
        this.state = 984;
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
    this.enterRule(localContext, 136, PythonParser.RULE_unaryExpression);
    try {
      this.state = 988;
      this.errorHandler.sync(this);
      switch (this.tokenStream.LA(1)) {
        case PythonParser.MINUS:
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 986;
            this.negateNumeric();
          }
          break;
        case PythonParser.NOT:
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 987;
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
    this.enterRule(localContext, 138, PythonParser.RULE_negateNumeric);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 990;
        this.match(PythonParser.MINUS);
        this.state = 991;
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
    this.enterRule(localContext, 140, PythonParser.RULE_negateLogical);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 993;
        this.match(PythonParser.NOT);
        this.state = 994;
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
    this.enterRule(localContext, 142, PythonParser.RULE_binaryExpression);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 996;
        localContext._left = this.term(0);
        this.state = 997;
        this.binaryOperator();
        this.state = 998;
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
    this.enterRule(localContext, 144, PythonParser.RULE_list);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 1000;
        this.match(PythonParser.OPEN_SQ_BRACKET);
        this.state = 1001;
        this.expressionList();
        this.state = 1002;
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
    this.enterRule(localContext, 146, PythonParser.RULE_tuple);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 1004;
        this.match(PythonParser.OPEN_BRACKET);
        this.state = 1005;
        this.expressionList();
        this.state = 1006;
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
    this.enterRule(localContext, 148, PythonParser.RULE_dictionary);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 1008;
        this.match(PythonParser.OPEN_BRACE);
        this.state = 1009;
        this.kvpList();
        this.state = 1010;
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
    this.enterRule(localContext, 150, PythonParser.RULE_kvpList);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 1012;
        this.kvp();
        this.state = 1017;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (_la === 81) {
          {
            {
              this.state = 1013;
              this.match(PythonParser.COMMA);
              this.state = 1014;
              this.kvp();
            }
          }
          this.state = 1019;
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
    this.enterRule(localContext, 152, PythonParser.RULE_kvp);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 1020;
        localContext._key = this.expression(0);
        this.state = 1021;
        this.match(PythonParser.COLON);
        this.state = 1022;
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
    this.enterRule(localContext, 154, PythonParser.RULE_methodCall);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 1024;
        this.methodName();
        this.state = 1025;
        this.match(PythonParser.OPEN_BRACKET);
        this.state = 1027;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (
          _la === 9 ||
          (((_la - 53) & ~0x1f) === 0 && ((1 << (_la - 53)) & 2192050687) !== 0) ||
          (((_la - 95) & ~0x1f) === 0 && ((1 << (_la - 95)) & 255) !== 0)
        ) {
          {
            this.state = 1026;
            this.argList();
          }
        }

        this.state = 1029;
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
    this.enterRule(localContext, 156, PythonParser.RULE_binaryOperator);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 1031;
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
    this.enterRule(localContext, 158, PythonParser.RULE_newInstance);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 1033;
        this.type_();
        this.state = 1034;
        this.match(PythonParser.OPEN_BRACKET);
        this.state = 1036;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (
          _la === 9 ||
          (((_la - 53) & ~0x1f) === 0 && ((1 << (_la - 53)) & 2192050687) !== 0) ||
          (((_la - 95) & ~0x1f) === 0 && ((1 << (_la - 95)) & 255) !== 0)
        ) {
          {
            this.state = 1035;
            this.argList();
          }
        }

        this.state = 1038;
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
    this.enterRule(localContext, 160, PythonParser.RULE_paramDef);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 1042;
        this.errorHandler.sync(this);
        switch (this.tokenStream.LA(1)) {
          case PythonParser.NAME_STARTING_LC:
            {
              this.state = 1040;
              this.identifierDef();
            }
            break;
          case PythonParser.THIS_INSTANCE:
            {
              this.state = 1041;
              this.match(PythonParser.THIS_INSTANCE);
            }
            break;
          default:
            throw new antlr.NoViableAltException(this);
        }
        this.state = 1044;
        this.match(PythonParser.COLON);
        this.state = 1045;
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
    this.enterRule(localContext, 162, PythonParser.RULE_typeGeneric);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 1047;
        this.typeName();
        this.state = 1048;
        this.match(PythonParser.OPEN_SQ_BRACKET);
        this.state = 1049;
        this.type_();
        this.state = 1054;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (_la === 81) {
          {
            {
              this.state = 1050;
              this.match(PythonParser.COMMA);
              this.state = 1051;
              this.type_();
            }
          }
          this.state = 1056;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 1057;
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
    this.enterRule(localContext, 164, PythonParser.RULE_typeFunc);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 1059;
        this.match(PythonParser.FUNC_NAME);
        this.state = 1060;
        this.match(PythonParser.OPEN_SQ_BRACKET);
        this.state = 1061;
        this.match(PythonParser.OPEN_SQ_BRACKET);
        this.state = 1062;
        this.type_();
        this.state = 1067;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (_la === 81) {
          {
            {
              this.state = 1063;
              this.match(PythonParser.COMMA);
              this.state = 1064;
              this.type_();
            }
          }
          this.state = 1069;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 1070;
        this.match(PythonParser.CLOSE_SQ_BRACKET);
        this.state = 1071;
        this.match(PythonParser.COMMA);
        this.state = 1072;
        this.type_();
        this.state = 1073;
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
    this.enterRule(localContext, 166, PythonParser.RULE_typeTuple);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 1075;
        this.match(PythonParser.TUPLE);
        this.state = 1076;
        this.match(PythonParser.OPEN_SQ_BRACKET);
        this.state = 1077;
        this.type_();
        this.state = 1080;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        do {
          {
            {
              this.state = 1078;
              this.match(PythonParser.COMMA);
              this.state = 1079;
              this.type_();
            }
          }
          this.state = 1082;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        } while (_la === 81);
        this.state = 1084;
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
    this.enterRule(localContext, 168, PythonParser.RULE_lambda);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 1086;
        this.match(PythonParser.LAMBDA);
        this.state = 1087;
        this.paramList();
        this.state = 1088;
        this.match(PythonParser.COLON);
        this.state = 1089;
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
    this.enterRule(localContext, 170, PythonParser.RULE_interpolatedString);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 1091;
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
      case 63:
        return this.expression_sempred(localContext as ExpressionContext, predIndex);
      case 64:
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
    4, 1, 124, 1094, 2, 0, 7, 0, 2, 1, 7, 1, 2, 2, 7, 2, 2, 3, 7, 3, 2, 4, 7, 4, 2, 5, 7, 5, 2, 6,
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
    81, 7, 81, 2, 82, 7, 82, 2, 83, 7, 83, 2, 84, 7, 84, 2, 85, 7, 85, 1, 0, 3, 0, 174, 8, 0, 1, 0,
    5, 0, 177, 8, 0, 10, 0, 12, 0, 180, 9, 0, 1, 0, 3, 0, 183, 8, 0, 1, 0, 5, 0, 186, 8, 0, 10, 0,
    12, 0, 189, 9, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 1, 202,
    8, 1, 1, 2, 3, 2, 205, 8, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 5, 2, 216, 8,
    2, 10, 2, 12, 2, 219, 9, 2, 1, 2, 1, 2, 3, 2, 223, 8, 2, 1, 2, 1, 2, 1, 3, 1, 3, 1, 3, 1, 3, 1,
    4, 3, 4, 232, 8, 4, 1, 4, 1, 4, 1, 4, 1, 4, 3, 4, 238, 8, 4, 1, 4, 1, 4, 1, 4, 1, 4, 1, 4, 3, 4,
    245, 8, 4, 1, 4, 1, 4, 5, 4, 249, 8, 4, 10, 4, 12, 4, 252, 9, 4, 1, 4, 1, 4, 1, 4, 3, 4, 257, 8,
    4, 1, 4, 1, 4, 1, 5, 3, 5, 262, 8, 5, 1, 5, 1, 5, 1, 5, 1, 5, 1, 5, 1, 5, 1, 5, 1, 5, 5, 5, 272,
    8, 5, 10, 5, 12, 5, 275, 9, 5, 1, 5, 1, 5, 3, 5, 279, 8, 5, 1, 5, 1, 5, 1, 6, 1, 6, 1, 6, 3, 6,
    286, 8, 6, 1, 7, 3, 7, 289, 8, 7, 1, 7, 1, 7, 1, 7, 1, 7, 3, 7, 295, 8, 7, 1, 7, 1, 7, 1, 7, 1,
    7, 1, 7, 3, 7, 302, 8, 7, 1, 7, 1, 7, 5, 7, 306, 8, 7, 10, 7, 12, 7, 309, 9, 7, 1, 7, 1, 7, 3,
    7, 313, 8, 7, 1, 7, 1, 7, 1, 8, 3, 8, 318, 8, 8, 1, 8, 1, 8, 1, 8, 1, 8, 3, 8, 324, 8, 8, 1, 8,
    1, 8, 1, 9, 3, 9, 329, 8, 9, 1, 9, 1, 9, 1, 9, 1, 9, 1, 9, 1, 9, 1, 9, 3, 9, 338, 8, 9, 1, 9, 1,
    9, 1, 9, 1, 9, 3, 9, 344, 8, 9, 1, 9, 1, 9, 1, 10, 3, 10, 349, 8, 10, 1, 10, 1, 10, 1, 10, 1,
    10, 1, 10, 1, 10, 3, 10, 357, 8, 10, 1, 10, 1, 10, 3, 10, 361, 8, 10, 1, 10, 1, 10, 1, 10, 5,
    10, 366, 8, 10, 10, 10, 12, 10, 369, 9, 10, 1, 10, 1, 10, 3, 10, 373, 8, 10, 1, 10, 1, 10, 1,
    11, 1, 11, 1, 11, 1, 11, 3, 11, 381, 8, 11, 1, 12, 3, 12, 384, 8, 12, 1, 12, 1, 12, 1, 12, 1,
    12, 1, 12, 3, 12, 391, 8, 12, 1, 12, 1, 12, 1, 12, 1, 12, 3, 12, 397, 8, 12, 1, 12, 1, 12, 5,
    12, 401, 8, 12, 10, 12, 12, 12, 404, 9, 12, 1, 12, 1, 12, 3, 12, 408, 8, 12, 1, 12, 1, 12, 1,
    13, 1, 13, 1, 13, 1, 13, 1, 13, 1, 13, 3, 13, 418, 8, 13, 1, 14, 3, 14, 421, 8, 14, 1, 14, 1,
    14, 1, 14, 1, 15, 1, 15, 1, 16, 1, 16, 1, 16, 1, 16, 1, 16, 1, 16, 1, 16, 1, 16, 1, 16, 3, 16,
    437, 8, 16, 1, 17, 3, 17, 440, 8, 17, 1, 17, 1, 17, 1, 17, 1, 17, 1, 17, 1, 17, 1, 18, 3, 18,
    449, 8, 18, 1, 18, 1, 18, 1, 18, 1, 18, 1, 18, 1, 18, 1, 19, 3, 19, 458, 8, 19, 1, 19, 1, 19, 1,
    19, 1, 19, 3, 19, 464, 8, 19, 1, 19, 1, 19, 1, 19, 5, 19, 469, 8, 19, 10, 19, 12, 19, 472, 9,
    19, 1, 19, 3, 19, 475, 8, 19, 1, 19, 1, 19, 3, 19, 479, 8, 19, 1, 19, 1, 19, 1, 20, 5, 20, 484,
    8, 20, 10, 20, 12, 20, 487, 9, 20, 1, 21, 3, 21, 490, 8, 21, 1, 21, 1, 21, 1, 21, 1, 21, 3, 21,
    496, 8, 21, 1, 21, 1, 21, 5, 21, 500, 8, 21, 10, 21, 12, 21, 503, 9, 21, 1, 21, 3, 21, 506, 8,
    21, 1, 22, 3, 22, 509, 8, 22, 1, 22, 1, 22, 1, 22, 3, 22, 514, 8, 22, 1, 22, 1, 22, 5, 22, 518,
    8, 22, 10, 22, 12, 22, 521, 9, 22, 1, 22, 3, 22, 524, 8, 22, 1, 23, 3, 23, 527, 8, 23, 1, 23, 1,
    23, 1, 23, 1, 23, 3, 23, 533, 8, 23, 1, 23, 1, 23, 5, 23, 537, 8, 23, 10, 23, 12, 23, 540, 9,
    23, 1, 23, 1, 23, 1, 23, 1, 23, 1, 24, 3, 24, 547, 8, 24, 1, 24, 1, 24, 1, 24, 1, 24, 1, 24, 1,
    24, 3, 24, 555, 8, 24, 1, 24, 1, 24, 5, 24, 559, 8, 24, 10, 24, 12, 24, 562, 9, 24, 1, 24, 1,
    24, 1, 24, 1, 24, 1, 25, 3, 25, 569, 8, 25, 1, 25, 1, 25, 3, 25, 573, 8, 25, 1, 25, 1, 25, 1,
    26, 3, 26, 578, 8, 26, 1, 26, 1, 26, 1, 26, 3, 26, 583, 8, 26, 1, 26, 1, 26, 1, 26, 4, 26, 588,
    8, 26, 11, 26, 12, 26, 589, 1, 26, 1, 26, 3, 26, 594, 8, 26, 1, 26, 1, 26, 1, 27, 5, 27, 599, 8,
    27, 10, 27, 12, 27, 602, 9, 27, 1, 28, 3, 28, 605, 8, 28, 1, 28, 1, 28, 1, 28, 1, 28, 1, 28, 1,
    28, 3, 28, 613, 8, 28, 1, 28, 1, 28, 5, 28, 617, 8, 28, 10, 28, 12, 28, 620, 9, 28, 1, 28, 3,
    28, 623, 8, 28, 1, 29, 3, 29, 626, 8, 29, 1, 29, 1, 29, 1, 29, 1, 29, 1, 29, 1, 29, 3, 29, 634,
    8, 29, 1, 29, 1, 29, 1, 30, 1, 30, 3, 30, 640, 8, 30, 1, 31, 3, 31, 643, 8, 31, 1, 31, 1, 31, 1,
    31, 1, 31, 1, 31, 1, 31, 1, 31, 1, 31, 1, 31, 3, 31, 654, 8, 31, 1, 31, 1, 31, 1, 32, 1, 32, 1,
    32, 3, 32, 661, 8, 32, 1, 32, 1, 32, 1, 33, 3, 33, 666, 8, 33, 1, 33, 1, 33, 1, 33, 1, 33, 3,
    33, 672, 8, 33, 1, 33, 1, 33, 1, 33, 1, 33, 1, 33, 3, 33, 679, 8, 33, 1, 33, 1, 33, 1, 33, 5,
    33, 684, 8, 33, 10, 33, 12, 33, 687, 9, 33, 1, 33, 1, 33, 1, 33, 1, 34, 3, 34, 693, 8, 34, 1,
    34, 1, 34, 1, 34, 1, 34, 3, 34, 699, 8, 34, 1, 34, 1, 34, 1, 35, 3, 35, 704, 8, 35, 1, 35, 1,
    35, 1, 35, 1, 35, 3, 35, 710, 8, 35, 1, 35, 1, 35, 1, 35, 1, 35, 1, 35, 3, 35, 717, 8, 35, 1,
    35, 1, 35, 5, 35, 721, 8, 35, 10, 35, 12, 35, 724, 9, 35, 1, 35, 1, 35, 1, 35, 3, 35, 729, 8,
    35, 1, 35, 1, 35, 1, 36, 3, 36, 734, 8, 36, 1, 36, 1, 36, 1, 36, 1, 36, 3, 36, 740, 8, 36, 1,
    36, 1, 36, 1, 36, 1, 36, 1, 36, 3, 36, 747, 8, 36, 1, 36, 1, 36, 5, 36, 751, 8, 36, 10, 36, 12,
    36, 754, 9, 36, 1, 36, 1, 36, 3, 36, 758, 8, 36, 1, 36, 1, 36, 1, 37, 3, 37, 763, 8, 37, 1, 37,
    1, 37, 1, 37, 1, 37, 1, 37, 1, 37, 3, 37, 771, 8, 37, 1, 37, 1, 37, 1, 37, 1, 37, 1, 37, 1, 37,
    1, 37, 3, 37, 780, 8, 37, 1, 37, 1, 37, 1, 38, 3, 38, 785, 8, 38, 1, 38, 1, 38, 1, 38, 1, 38, 1,
    38, 1, 38, 3, 38, 793, 8, 38, 1, 38, 1, 38, 1, 38, 1, 38, 1, 38, 1, 38, 1, 38, 3, 38, 802, 8,
    38, 1, 38, 1, 38, 1, 39, 1, 39, 1, 40, 1, 40, 1, 41, 1, 41, 1, 41, 1, 41, 1, 41, 3, 41, 815, 8,
    41, 1, 41, 1, 41, 5, 41, 819, 8, 41, 10, 41, 12, 41, 822, 9, 41, 1, 42, 1, 42, 1, 43, 1, 43, 1,
    44, 1, 44, 1, 44, 1, 44, 1, 44, 1, 44, 3, 44, 834, 8, 44, 1, 45, 1, 45, 1, 45, 1, 45, 3, 45,
    840, 8, 45, 1, 46, 1, 46, 1, 46, 5, 46, 845, 8, 46, 10, 46, 12, 46, 848, 9, 46, 1, 47, 1, 47, 3,
    47, 852, 8, 47, 1, 48, 1, 48, 1, 48, 5, 48, 857, 8, 48, 10, 48, 12, 48, 860, 9, 48, 1, 49, 1,
    49, 1, 49, 4, 49, 865, 8, 49, 11, 49, 12, 49, 866, 1, 50, 1, 50, 1, 50, 5, 50, 872, 8, 50, 10,
    50, 12, 50, 875, 9, 50, 1, 51, 1, 51, 1, 51, 1, 51, 1, 52, 1, 52, 1, 52, 5, 52, 884, 8, 52, 10,
    52, 12, 52, 887, 9, 52, 1, 53, 1, 53, 1, 53, 1, 53, 3, 53, 893, 8, 53, 1, 54, 1, 54, 1, 55, 1,
    55, 1, 55, 1, 55, 1, 55, 3, 55, 902, 8, 55, 1, 56, 1, 56, 1, 56, 1, 56, 1, 56, 1, 56, 3, 56,
    910, 8, 56, 1, 57, 1, 57, 1, 58, 1, 58, 1, 58, 3, 58, 917, 8, 58, 1, 59, 1, 59, 1, 60, 1, 60, 1,
    61, 1, 61, 1, 61, 1, 61, 1, 62, 1, 62, 1, 62, 1, 62, 1, 63, 1, 63, 1, 63, 1, 63, 1, 63, 3, 63,
    936, 8, 63, 1, 63, 1, 63, 1, 63, 1, 63, 1, 63, 5, 63, 943, 8, 63, 10, 63, 12, 63, 946, 9, 63, 1,
    63, 1, 63, 1, 63, 5, 63, 951, 8, 63, 10, 63, 12, 63, 954, 9, 63, 1, 64, 1, 64, 1, 64, 1, 64, 1,
    64, 1, 64, 1, 64, 1, 64, 1, 64, 3, 64, 965, 8, 64, 1, 64, 1, 64, 1, 64, 1, 64, 1, 64, 5, 64,
    972, 8, 64, 10, 64, 12, 64, 975, 9, 64, 1, 65, 1, 65, 3, 65, 979, 8, 65, 1, 66, 1, 66, 1, 67, 1,
    67, 1, 67, 1, 67, 1, 68, 1, 68, 3, 68, 989, 8, 68, 1, 69, 1, 69, 1, 69, 1, 70, 1, 70, 1, 70, 1,
    71, 1, 71, 1, 71, 1, 71, 1, 72, 1, 72, 1, 72, 1, 72, 1, 73, 1, 73, 1, 73, 1, 73, 1, 74, 1, 74,
    1, 74, 1, 74, 1, 75, 1, 75, 1, 75, 5, 75, 1016, 8, 75, 10, 75, 12, 75, 1019, 9, 75, 1, 76, 1,
    76, 1, 76, 1, 76, 1, 77, 1, 77, 1, 77, 3, 77, 1028, 8, 77, 1, 77, 1, 77, 1, 78, 1, 78, 1, 79, 1,
    79, 1, 79, 3, 79, 1037, 8, 79, 1, 79, 1, 79, 1, 80, 1, 80, 3, 80, 1043, 8, 80, 1, 80, 1, 80, 1,
    80, 1, 81, 1, 81, 1, 81, 1, 81, 1, 81, 5, 81, 1053, 8, 81, 10, 81, 12, 81, 1056, 9, 81, 1, 81,
    1, 81, 1, 82, 1, 82, 1, 82, 1, 82, 1, 82, 1, 82, 5, 82, 1066, 8, 82, 10, 82, 12, 82, 1069, 9,
    82, 1, 82, 1, 82, 1, 82, 1, 82, 1, 82, 1, 83, 1, 83, 1, 83, 1, 83, 1, 83, 4, 83, 1081, 8, 83,
    11, 83, 12, 83, 1082, 1, 83, 1, 83, 1, 84, 1, 84, 1, 84, 1, 84, 1, 84, 1, 85, 1, 85, 1, 85, 0,
    3, 82, 126, 128, 86, 0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38,
    40, 42, 44, 46, 48, 50, 52, 54, 56, 58, 60, 62, 64, 66, 68, 70, 72, 74, 76, 78, 80, 82, 84, 86,
    88, 90, 92, 94, 96, 98, 100, 102, 104, 106, 108, 110, 112, 114, 116, 118, 120, 122, 124, 126,
    128, 130, 132, 134, 136, 138, 140, 142, 144, 146, 148, 150, 152, 154, 156, 158, 160, 162, 164,
    166, 168, 170, 0, 3, 1, 0, 60, 61, 1, 0, 101, 102, 4, 0, 62, 63, 65, 67, 69, 69, 83, 90, 1183,
    0, 173, 1, 0, 0, 0, 2, 201, 1, 0, 0, 0, 4, 204, 1, 0, 0, 0, 6, 226, 1, 0, 0, 0, 8, 231, 1, 0, 0,
    0, 10, 261, 1, 0, 0, 0, 12, 285, 1, 0, 0, 0, 14, 288, 1, 0, 0, 0, 16, 317, 1, 0, 0, 0, 18, 328,
    1, 0, 0, 0, 20, 348, 1, 0, 0, 0, 22, 380, 1, 0, 0, 0, 24, 383, 1, 0, 0, 0, 26, 417, 1, 0, 0, 0,
    28, 420, 1, 0, 0, 0, 30, 425, 1, 0, 0, 0, 32, 436, 1, 0, 0, 0, 34, 439, 1, 0, 0, 0, 36, 448, 1,
    0, 0, 0, 38, 457, 1, 0, 0, 0, 40, 485, 1, 0, 0, 0, 42, 489, 1, 0, 0, 0, 44, 508, 1, 0, 0, 0, 46,
    526, 1, 0, 0, 0, 48, 546, 1, 0, 0, 0, 50, 568, 1, 0, 0, 0, 52, 577, 1, 0, 0, 0, 54, 600, 1, 0,
    0, 0, 56, 604, 1, 0, 0, 0, 58, 625, 1, 0, 0, 0, 60, 639, 1, 0, 0, 0, 62, 642, 1, 0, 0, 0, 64,
    657, 1, 0, 0, 0, 66, 665, 1, 0, 0, 0, 68, 692, 1, 0, 0, 0, 70, 703, 1, 0, 0, 0, 72, 733, 1, 0,
    0, 0, 74, 762, 1, 0, 0, 0, 76, 784, 1, 0, 0, 0, 78, 805, 1, 0, 0, 0, 80, 807, 1, 0, 0, 0, 82,
    814, 1, 0, 0, 0, 84, 823, 1, 0, 0, 0, 86, 825, 1, 0, 0, 0, 88, 833, 1, 0, 0, 0, 90, 839, 1, 0,
    0, 0, 92, 841, 1, 0, 0, 0, 94, 851, 1, 0, 0, 0, 96, 853, 1, 0, 0, 0, 98, 861, 1, 0, 0, 0, 100,
    868, 1, 0, 0, 0, 102, 876, 1, 0, 0, 0, 104, 880, 1, 0, 0, 0, 106, 892, 1, 0, 0, 0, 108, 894, 1,
    0, 0, 0, 110, 901, 1, 0, 0, 0, 112, 909, 1, 0, 0, 0, 114, 911, 1, 0, 0, 0, 116, 916, 1, 0, 0, 0,
    118, 918, 1, 0, 0, 0, 120, 920, 1, 0, 0, 0, 122, 922, 1, 0, 0, 0, 124, 926, 1, 0, 0, 0, 126,
    935, 1, 0, 0, 0, 128, 964, 1, 0, 0, 0, 130, 978, 1, 0, 0, 0, 132, 980, 1, 0, 0, 0, 134, 982, 1,
    0, 0, 0, 136, 988, 1, 0, 0, 0, 138, 990, 1, 0, 0, 0, 140, 993, 1, 0, 0, 0, 142, 996, 1, 0, 0, 0,
    144, 1000, 1, 0, 0, 0, 146, 1004, 1, 0, 0, 0, 148, 1008, 1, 0, 0, 0, 150, 1012, 1, 0, 0, 0, 152,
    1020, 1, 0, 0, 0, 154, 1024, 1, 0, 0, 0, 156, 1031, 1, 0, 0, 0, 158, 1033, 1, 0, 0, 0, 160,
    1042, 1, 0, 0, 0, 162, 1047, 1, 0, 0, 0, 164, 1059, 1, 0, 0, 0, 166, 1075, 1, 0, 0, 0, 168,
    1086, 1, 0, 0, 0, 170, 1091, 1, 0, 0, 0, 172, 174, 3, 28, 14, 0, 173, 172, 1, 0, 0, 0, 173, 174,
    1, 0, 0, 0, 174, 178, 1, 0, 0, 0, 175, 177, 3, 2, 1, 0, 176, 175, 1, 0, 0, 0, 177, 180, 1, 0, 0,
    0, 178, 176, 1, 0, 0, 0, 178, 179, 1, 0, 0, 0, 179, 182, 1, 0, 0, 0, 180, 178, 1, 0, 0, 0, 181,
    183, 3, 6, 3, 0, 182, 181, 1, 0, 0, 0, 182, 183, 1, 0, 0, 0, 183, 187, 1, 0, 0, 0, 184, 186, 5,
    93, 0, 0, 185, 184, 1, 0, 0, 0, 186, 189, 1, 0, 0, 0, 187, 185, 1, 0, 0, 0, 187, 188, 1, 0, 0,
    0, 188, 190, 1, 0, 0, 0, 189, 187, 1, 0, 0, 0, 190, 191, 5, 0, 0, 1, 191, 1, 1, 0, 0, 0, 192,
    202, 3, 4, 2, 0, 193, 202, 3, 8, 4, 0, 194, 202, 3, 10, 5, 0, 195, 202, 3, 14, 7, 0, 196, 202,
    3, 16, 8, 0, 197, 202, 3, 18, 9, 0, 198, 202, 3, 20, 10, 0, 199, 202, 3, 24, 12, 0, 200, 202, 3,
    28, 14, 0, 201, 192, 1, 0, 0, 0, 201, 193, 1, 0, 0, 0, 201, 194, 1, 0, 0, 0, 201, 195, 1, 0, 0,
    0, 201, 196, 1, 0, 0, 0, 201, 197, 1, 0, 0, 0, 201, 198, 1, 0, 0, 0, 201, 199, 1, 0, 0, 0, 201,
    200, 1, 0, 0, 0, 202, 3, 1, 0, 0, 0, 203, 205, 5, 106, 0, 0, 204, 203, 1, 0, 0, 0, 204, 205, 1,
    0, 0, 0, 205, 206, 1, 0, 0, 0, 206, 207, 5, 45, 0, 0, 207, 208, 5, 10, 0, 0, 208, 209, 5, 78, 0,
    0, 209, 210, 5, 79, 0, 0, 210, 211, 5, 68, 0, 0, 211, 212, 5, 48, 0, 0, 212, 213, 5, 82, 0, 0,
    213, 217, 5, 93, 0, 0, 214, 216, 3, 32, 16, 0, 215, 214, 1, 0, 0, 0, 216, 219, 1, 0, 0, 0, 217,
    215, 1, 0, 0, 0, 217, 218, 1, 0, 0, 0, 218, 220, 1, 0, 0, 0, 219, 217, 1, 0, 0, 0, 220, 222, 5,
    108, 0, 0, 221, 223, 5, 107, 0, 0, 222, 221, 1, 0, 0, 0, 222, 223, 1, 0, 0, 0, 223, 224, 1, 0,
    0, 0, 224, 225, 5, 93, 0, 0, 225, 5, 1, 0, 0, 0, 226, 227, 5, 10, 0, 0, 227, 228, 5, 78, 0, 0,
    228, 229, 5, 79, 0, 0, 229, 7, 1, 0, 0, 0, 230, 232, 5, 106, 0, 0, 231, 230, 1, 0, 0, 0, 231,
    232, 1, 0, 0, 0, 232, 233, 1, 0, 0, 0, 233, 234, 5, 45, 0, 0, 234, 235, 3, 84, 42, 0, 235, 237,
    5, 78, 0, 0, 236, 238, 3, 96, 48, 0, 237, 236, 1, 0, 0, 0, 237, 238, 1, 0, 0, 0, 238, 239, 1, 0,
    0, 0, 239, 240, 5, 79, 0, 0, 240, 241, 5, 68, 0, 0, 241, 242, 3, 106, 53, 0, 242, 244, 5, 82, 0,
    0, 243, 245, 3, 30, 15, 0, 244, 243, 1, 0, 0, 0, 244, 245, 1, 0, 0, 0, 245, 246, 1, 0, 0, 0,
    246, 250, 5, 93, 0, 0, 247, 249, 3, 32, 16, 0, 248, 247, 1, 0, 0, 0, 249, 252, 1, 0, 0, 0, 250,
    248, 1, 0, 0, 0, 250, 251, 1, 0, 0, 0, 251, 253, 1, 0, 0, 0, 252, 250, 1, 0, 0, 0, 253, 254, 3,
    64, 32, 0, 254, 256, 5, 109, 0, 0, 255, 257, 5, 107, 0, 0, 256, 255, 1, 0, 0, 0, 256, 257, 1, 0,
    0, 0, 257, 258, 1, 0, 0, 0, 258, 259, 5, 93, 0, 0, 259, 9, 1, 0, 0, 0, 260, 262, 5, 106, 0, 0,
    261, 260, 1, 0, 0, 0, 261, 262, 1, 0, 0, 0, 262, 263, 1, 0, 0, 0, 263, 264, 5, 1, 0, 0, 264,
    265, 3, 86, 43, 0, 265, 266, 5, 78, 0, 0, 266, 267, 5, 52, 0, 0, 267, 268, 5, 79, 0, 0, 268,
    269, 5, 124, 0, 0, 269, 273, 5, 93, 0, 0, 270, 272, 3, 12, 6, 0, 271, 270, 1, 0, 0, 0, 272, 275,
    1, 0, 0, 0, 273, 271, 1, 0, 0, 0, 273, 274, 1, 0, 0, 0, 274, 276, 1, 0, 0, 0, 275, 273, 1, 0, 0,
    0, 276, 278, 5, 110, 0, 0, 277, 279, 5, 107, 0, 0, 278, 277, 1, 0, 0, 0, 278, 279, 1, 0, 0, 0,
    279, 280, 1, 0, 0, 0, 280, 281, 5, 93, 0, 0, 281, 11, 1, 0, 0, 0, 282, 286, 3, 62, 31, 0, 283,
    286, 3, 34, 17, 0, 284, 286, 3, 28, 14, 0, 285, 282, 1, 0, 0, 0, 285, 283, 1, 0, 0, 0, 285, 284,
    1, 0, 0, 0, 286, 13, 1, 0, 0, 0, 287, 289, 5, 106, 0, 0, 288, 287, 1, 0, 0, 0, 288, 289, 1, 0,
    0, 0, 289, 290, 1, 0, 0, 0, 290, 291, 5, 45, 0, 0, 291, 292, 3, 84, 42, 0, 292, 294, 5, 78, 0,
    0, 293, 295, 3, 96, 48, 0, 294, 293, 1, 0, 0, 0, 294, 295, 1, 0, 0, 0, 295, 296, 1, 0, 0, 0,
    296, 297, 5, 79, 0, 0, 297, 298, 5, 68, 0, 0, 298, 299, 5, 48, 0, 0, 299, 301, 5, 82, 0, 0, 300,
    302, 3, 30, 15, 0, 301, 300, 1, 0, 0, 0, 301, 302, 1, 0, 0, 0, 302, 303, 1, 0, 0, 0, 303, 307,
    5, 93, 0, 0, 304, 306, 3, 32, 16, 0, 305, 304, 1, 0, 0, 0, 306, 309, 1, 0, 0, 0, 307, 305, 1, 0,
    0, 0, 307, 308, 1, 0, 0, 0, 308, 310, 1, 0, 0, 0, 309, 307, 1, 0, 0, 0, 310, 312, 5, 111, 0, 0,
    311, 313, 5, 107, 0, 0, 312, 311, 1, 0, 0, 0, 312, 313, 1, 0, 0, 0, 313, 314, 1, 0, 0, 0, 314,
    315, 5, 93, 0, 0, 315, 15, 1, 0, 0, 0, 316, 318, 5, 105, 0, 0, 317, 316, 1, 0, 0, 0, 317, 318,
    1, 0, 0, 0, 318, 319, 1, 0, 0, 0, 319, 320, 3, 78, 39, 0, 320, 321, 5, 73, 0, 0, 321, 323, 3,
    90, 45, 0, 322, 324, 3, 30, 15, 0, 323, 322, 1, 0, 0, 0, 323, 324, 1, 0, 0, 0, 324, 325, 1, 0,
    0, 0, 325, 326, 5, 93, 0, 0, 326, 17, 1, 0, 0, 0, 327, 329, 5, 106, 0, 0, 328, 327, 1, 0, 0, 0,
    328, 329, 1, 0, 0, 0, 329, 330, 1, 0, 0, 0, 330, 331, 5, 1, 0, 0, 331, 332, 3, 88, 44, 0, 332,
    333, 5, 78, 0, 0, 333, 334, 5, 4, 0, 0, 334, 335, 5, 79, 0, 0, 335, 337, 5, 82, 0, 0, 336, 338,
    3, 30, 15, 0, 337, 336, 1, 0, 0, 0, 337, 338, 1, 0, 0, 0, 338, 339, 1, 0, 0, 0, 339, 340, 5, 93,
    0, 0, 340, 341, 3, 98, 49, 0, 341, 343, 5, 112, 0, 0, 342, 344, 5, 107, 0, 0, 343, 342, 1, 0, 0,
    0, 343, 344, 1, 0, 0, 0, 344, 345, 1, 0, 0, 0, 345, 346, 5, 93, 0, 0, 346, 19, 1, 0, 0, 0, 347,
    349, 5, 106, 0, 0, 348, 347, 1, 0, 0, 0, 348, 349, 1, 0, 0, 0, 349, 350, 1, 0, 0, 0, 350, 351,
    5, 1, 0, 0, 351, 356, 3, 88, 44, 0, 352, 353, 5, 78, 0, 0, 353, 354, 3, 88, 44, 0, 354, 355, 5,
    79, 0, 0, 355, 357, 1, 0, 0, 0, 356, 352, 1, 0, 0, 0, 356, 357, 1, 0, 0, 0, 357, 358, 1, 0, 0,
    0, 358, 360, 5, 82, 0, 0, 359, 361, 3, 30, 15, 0, 360, 359, 1, 0, 0, 0, 360, 361, 1, 0, 0, 0,
    361, 362, 1, 0, 0, 0, 362, 363, 5, 93, 0, 0, 363, 367, 3, 66, 33, 0, 364, 366, 3, 22, 11, 0,
    365, 364, 1, 0, 0, 0, 366, 369, 1, 0, 0, 0, 367, 365, 1, 0, 0, 0, 367, 368, 1, 0, 0, 0, 368,
    370, 1, 0, 0, 0, 369, 367, 1, 0, 0, 0, 370, 372, 5, 113, 0, 0, 371, 373, 5, 107, 0, 0, 372, 371,
    1, 0, 0, 0, 372, 373, 1, 0, 0, 0, 373, 374, 1, 0, 0, 0, 374, 375, 5, 93, 0, 0, 375, 21, 1, 0, 0,
    0, 376, 381, 3, 68, 34, 0, 377, 381, 3, 70, 35, 0, 378, 381, 3, 72, 36, 0, 379, 381, 3, 28, 14,
    0, 380, 376, 1, 0, 0, 0, 380, 377, 1, 0, 0, 0, 380, 378, 1, 0, 0, 0, 380, 379, 1, 0, 0, 0, 381,
    23, 1, 0, 0, 0, 382, 384, 5, 106, 0, 0, 383, 382, 1, 0, 0, 0, 383, 384, 1, 0, 0, 0, 384, 385, 1,
    0, 0, 0, 385, 386, 5, 1, 0, 0, 386, 387, 3, 88, 44, 0, 387, 390, 5, 78, 0, 0, 388, 391, 3, 88,
    44, 0, 389, 391, 5, 51, 0, 0, 390, 388, 1, 0, 0, 0, 390, 389, 1, 0, 0, 0, 391, 392, 1, 0, 0, 0,
    392, 393, 5, 79, 0, 0, 393, 394, 1, 0, 0, 0, 394, 396, 5, 82, 0, 0, 395, 397, 3, 30, 15, 0, 396,
    395, 1, 0, 0, 0, 396, 397, 1, 0, 0, 0, 397, 398, 1, 0, 0, 0, 398, 402, 5, 93, 0, 0, 399, 401, 3,
    26, 13, 0, 400, 399, 1, 0, 0, 0, 401, 404, 1, 0, 0, 0, 402, 400, 1, 0, 0, 0, 402, 403, 1, 0, 0,
    0, 403, 405, 1, 0, 0, 0, 404, 402, 1, 0, 0, 0, 405, 407, 5, 113, 0, 0, 406, 408, 5, 107, 0, 0,
    407, 406, 1, 0, 0, 0, 407, 408, 1, 0, 0, 0, 408, 409, 1, 0, 0, 0, 409, 410, 5, 93, 0, 0, 410,
    25, 1, 0, 0, 0, 411, 418, 3, 68, 34, 0, 412, 418, 3, 70, 35, 0, 413, 418, 3, 72, 36, 0, 414,
    418, 3, 74, 37, 0, 415, 418, 3, 76, 38, 0, 416, 418, 3, 28, 14, 0, 417, 411, 1, 0, 0, 0, 417,
    412, 1, 0, 0, 0, 417, 413, 1, 0, 0, 0, 417, 414, 1, 0, 0, 0, 417, 415, 1, 0, 0, 0, 417, 416, 1,
    0, 0, 0, 418, 27, 1, 0, 0, 0, 419, 421, 5, 105, 0, 0, 420, 419, 1, 0, 0, 0, 420, 421, 1, 0, 0,
    0, 421, 422, 1, 0, 0, 0, 422, 423, 3, 30, 15, 0, 423, 424, 5, 93, 0, 0, 424, 29, 1, 0, 0, 0,
    425, 426, 5, 124, 0, 0, 426, 31, 1, 0, 0, 0, 427, 437, 3, 34, 17, 0, 428, 437, 3, 36, 18, 0,
    429, 437, 3, 38, 19, 0, 430, 437, 3, 46, 23, 0, 431, 437, 3, 48, 24, 0, 432, 437, 3, 50, 25, 0,
    433, 437, 3, 52, 26, 0, 434, 437, 3, 58, 29, 0, 435, 437, 3, 28, 14, 0, 436, 427, 1, 0, 0, 0,
    436, 428, 1, 0, 0, 0, 436, 429, 1, 0, 0, 0, 436, 430, 1, 0, 0, 0, 436, 431, 1, 0, 0, 0, 436,
    432, 1, 0, 0, 0, 436, 433, 1, 0, 0, 0, 436, 434, 1, 0, 0, 0, 436, 435, 1, 0, 0, 0, 437, 33, 1,
    0, 0, 0, 438, 440, 5, 105, 0, 0, 439, 438, 1, 0, 0, 0, 439, 440, 1, 0, 0, 0, 440, 441, 1, 0, 0,
    0, 441, 442, 3, 78, 39, 0, 442, 443, 5, 73, 0, 0, 443, 444, 3, 126, 63, 0, 444, 445, 5, 122, 0,
    0, 445, 446, 5, 93, 0, 0, 446, 35, 1, 0, 0, 0, 447, 449, 5, 105, 0, 0, 448, 447, 1, 0, 0, 0,
    448, 449, 1, 0, 0, 0, 449, 450, 1, 0, 0, 0, 450, 451, 3, 82, 41, 0, 451, 452, 5, 73, 0, 0, 452,
    453, 3, 126, 63, 0, 453, 454, 5, 121, 0, 0, 454, 455, 5, 93, 0, 0, 455, 37, 1, 0, 0, 0, 456,
    458, 5, 106, 0, 0, 457, 456, 1, 0, 0, 0, 457, 458, 1, 0, 0, 0, 458, 459, 1, 0, 0, 0, 459, 460,
    5, 6, 0, 0, 460, 461, 3, 126, 63, 0, 461, 463, 5, 82, 0, 0, 462, 464, 3, 30, 15, 0, 463, 462, 1,
    0, 0, 0, 463, 464, 1, 0, 0, 0, 464, 465, 1, 0, 0, 0, 465, 466, 5, 93, 0, 0, 466, 470, 3, 40, 20,
    0, 467, 469, 3, 42, 21, 0, 468, 467, 1, 0, 0, 0, 469, 472, 1, 0, 0, 0, 470, 468, 1, 0, 0, 0,
    470, 471, 1, 0, 0, 0, 471, 474, 1, 0, 0, 0, 472, 470, 1, 0, 0, 0, 473, 475, 3, 44, 22, 0, 474,
    473, 1, 0, 0, 0, 474, 475, 1, 0, 0, 0, 475, 476, 1, 0, 0, 0, 476, 478, 5, 114, 0, 0, 477, 479,
    5, 107, 0, 0, 478, 477, 1, 0, 0, 0, 478, 479, 1, 0, 0, 0, 479, 480, 1, 0, 0, 0, 480, 481, 5, 93,
    0, 0, 481, 39, 1, 0, 0, 0, 482, 484, 3, 32, 16, 0, 483, 482, 1, 0, 0, 0, 484, 487, 1, 0, 0, 0,
    485, 483, 1, 0, 0, 0, 485, 486, 1, 0, 0, 0, 486, 41, 1, 0, 0, 0, 487, 485, 1, 0, 0, 0, 488, 490,
    5, 106, 0, 0, 489, 488, 1, 0, 0, 0, 489, 490, 1, 0, 0, 0, 490, 491, 1, 0, 0, 0, 491, 492, 5, 2,
    0, 0, 492, 493, 3, 126, 63, 0, 493, 495, 5, 82, 0, 0, 494, 496, 3, 30, 15, 0, 495, 494, 1, 0, 0,
    0, 495, 496, 1, 0, 0, 0, 496, 497, 1, 0, 0, 0, 497, 501, 5, 93, 0, 0, 498, 500, 3, 32, 16, 0,
    499, 498, 1, 0, 0, 0, 500, 503, 1, 0, 0, 0, 501, 499, 1, 0, 0, 0, 501, 502, 1, 0, 0, 0, 502,
    505, 1, 0, 0, 0, 503, 501, 1, 0, 0, 0, 504, 506, 5, 107, 0, 0, 505, 504, 1, 0, 0, 0, 505, 506,
    1, 0, 0, 0, 506, 43, 1, 0, 0, 0, 507, 509, 5, 106, 0, 0, 508, 507, 1, 0, 0, 0, 508, 509, 1, 0,
    0, 0, 509, 510, 1, 0, 0, 0, 510, 511, 5, 3, 0, 0, 511, 513, 5, 82, 0, 0, 512, 514, 3, 30, 15, 0,
    513, 512, 1, 0, 0, 0, 513, 514, 1, 0, 0, 0, 514, 515, 1, 0, 0, 0, 515, 519, 5, 93, 0, 0, 516,
    518, 3, 32, 16, 0, 517, 516, 1, 0, 0, 0, 518, 521, 1, 0, 0, 0, 519, 517, 1, 0, 0, 0, 519, 520,
    1, 0, 0, 0, 520, 523, 1, 0, 0, 0, 521, 519, 1, 0, 0, 0, 522, 524, 5, 107, 0, 0, 523, 522, 1, 0,
    0, 0, 523, 524, 1, 0, 0, 0, 524, 45, 1, 0, 0, 0, 525, 527, 5, 106, 0, 0, 526, 525, 1, 0, 0, 0,
    526, 527, 1, 0, 0, 0, 527, 528, 1, 0, 0, 0, 528, 529, 5, 13, 0, 0, 529, 530, 3, 126, 63, 0, 530,
    532, 5, 82, 0, 0, 531, 533, 3, 30, 15, 0, 532, 531, 1, 0, 0, 0, 532, 533, 1, 0, 0, 0, 533, 534,
    1, 0, 0, 0, 534, 538, 5, 93, 0, 0, 535, 537, 3, 32, 16, 0, 536, 535, 1, 0, 0, 0, 537, 540, 1, 0,
    0, 0, 538, 536, 1, 0, 0, 0, 538, 539, 1, 0, 0, 0, 539, 541, 1, 0, 0, 0, 540, 538, 1, 0, 0, 0,
    541, 542, 5, 115, 0, 0, 542, 543, 5, 107, 0, 0, 543, 544, 5, 93, 0, 0, 544, 47, 1, 0, 0, 0, 545,
    547, 5, 106, 0, 0, 546, 545, 1, 0, 0, 0, 546, 547, 1, 0, 0, 0, 547, 548, 1, 0, 0, 0, 548, 549,
    5, 5, 0, 0, 549, 550, 3, 78, 39, 0, 550, 551, 5, 7, 0, 0, 551, 552, 3, 126, 63, 0, 552, 554, 5,
    82, 0, 0, 553, 555, 3, 30, 15, 0, 554, 553, 1, 0, 0, 0, 554, 555, 1, 0, 0, 0, 555, 556, 1, 0, 0,
    0, 556, 560, 5, 93, 0, 0, 557, 559, 3, 32, 16, 0, 558, 557, 1, 0, 0, 0, 559, 562, 1, 0, 0, 0,
    560, 558, 1, 0, 0, 0, 560, 561, 1, 0, 0, 0, 561, 563, 1, 0, 0, 0, 562, 560, 1, 0, 0, 0, 563,
    564, 5, 116, 0, 0, 564, 565, 5, 107, 0, 0, 565, 566, 5, 93, 0, 0, 566, 49, 1, 0, 0, 0, 567, 569,
    5, 105, 0, 0, 568, 567, 1, 0, 0, 0, 568, 569, 1, 0, 0, 0, 569, 570, 1, 0, 0, 0, 570, 572, 3,
    128, 64, 0, 571, 573, 3, 30, 15, 0, 572, 571, 1, 0, 0, 0, 572, 573, 1, 0, 0, 0, 573, 574, 1, 0,
    0, 0, 574, 575, 5, 93, 0, 0, 575, 51, 1, 0, 0, 0, 576, 578, 5, 106, 0, 0, 577, 576, 1, 0, 0, 0,
    577, 578, 1, 0, 0, 0, 578, 579, 1, 0, 0, 0, 579, 580, 5, 12, 0, 0, 580, 582, 5, 82, 0, 0, 581,
    583, 3, 30, 15, 0, 582, 581, 1, 0, 0, 0, 582, 583, 1, 0, 0, 0, 583, 584, 1, 0, 0, 0, 584, 585,
    5, 93, 0, 0, 585, 587, 3, 54, 27, 0, 586, 588, 3, 56, 28, 0, 587, 586, 1, 0, 0, 0, 588, 589, 1,
    0, 0, 0, 589, 587, 1, 0, 0, 0, 589, 590, 1, 0, 0, 0, 590, 591, 1, 0, 0, 0, 591, 593, 5, 117, 0,
    0, 592, 594, 5, 107, 0, 0, 593, 592, 1, 0, 0, 0, 593, 594, 1, 0, 0, 0, 594, 595, 1, 0, 0, 0,
    595, 596, 5, 93, 0, 0, 596, 53, 1, 0, 0, 0, 597, 599, 3, 32, 16, 0, 598, 597, 1, 0, 0, 0, 599,
    602, 1, 0, 0, 0, 600, 598, 1, 0, 0, 0, 600, 601, 1, 0, 0, 0, 601, 55, 1, 0, 0, 0, 602, 600, 1,
    0, 0, 0, 603, 605, 5, 106, 0, 0, 604, 603, 1, 0, 0, 0, 604, 605, 1, 0, 0, 0, 605, 606, 1, 0, 0,
    0, 606, 607, 5, 46, 0, 0, 607, 608, 3, 88, 44, 0, 608, 609, 5, 44, 0, 0, 609, 610, 3, 78, 39, 0,
    610, 612, 5, 82, 0, 0, 611, 613, 3, 30, 15, 0, 612, 611, 1, 0, 0, 0, 612, 613, 1, 0, 0, 0, 613,
    614, 1, 0, 0, 0, 614, 618, 5, 93, 0, 0, 615, 617, 3, 32, 16, 0, 616, 615, 1, 0, 0, 0, 617, 620,
    1, 0, 0, 0, 618, 616, 1, 0, 0, 0, 618, 619, 1, 0, 0, 0, 619, 622, 1, 0, 0, 0, 620, 618, 1, 0, 0,
    0, 621, 623, 5, 107, 0, 0, 622, 621, 1, 0, 0, 0, 622, 623, 1, 0, 0, 0, 623, 57, 1, 0, 0, 0, 624,
    626, 5, 105, 0, 0, 625, 624, 1, 0, 0, 0, 625, 626, 1, 0, 0, 0, 626, 627, 1, 0, 0, 0, 627, 628,
    5, 50, 0, 0, 628, 629, 3, 88, 44, 0, 629, 630, 5, 78, 0, 0, 630, 631, 3, 60, 30, 0, 631, 633, 5,
    79, 0, 0, 632, 634, 3, 30, 15, 0, 633, 632, 1, 0, 0, 0, 633, 634, 1, 0, 0, 0, 634, 635, 1, 0, 0,
    0, 635, 636, 5, 93, 0, 0, 636, 59, 1, 0, 0, 0, 637, 640, 3, 120, 60, 0, 638, 640, 3, 80, 40, 0,
    639, 637, 1, 0, 0, 0, 639, 638, 1, 0, 0, 0, 640, 61, 1, 0, 0, 0, 641, 643, 5, 105, 0, 0, 642,
    641, 1, 0, 0, 0, 642, 643, 1, 0, 0, 0, 643, 644, 1, 0, 0, 0, 644, 645, 5, 72, 0, 0, 645, 646, 5,
    80, 0, 0, 646, 647, 5, 43, 0, 0, 647, 648, 5, 78, 0, 0, 648, 649, 3, 108, 54, 0, 649, 650, 5,
    81, 0, 0, 650, 651, 3, 110, 55, 0, 651, 653, 5, 79, 0, 0, 652, 654, 3, 30, 15, 0, 653, 652, 1,
    0, 0, 0, 653, 654, 1, 0, 0, 0, 654, 655, 1, 0, 0, 0, 655, 656, 5, 93, 0, 0, 656, 63, 1, 0, 0, 0,
    657, 658, 5, 11, 0, 0, 658, 660, 3, 126, 63, 0, 659, 661, 3, 30, 15, 0, 660, 659, 1, 0, 0, 0,
    660, 661, 1, 0, 0, 0, 661, 662, 1, 0, 0, 0, 662, 663, 5, 93, 0, 0, 663, 65, 1, 0, 0, 0, 664,
    666, 5, 106, 0, 0, 665, 664, 1, 0, 0, 0, 665, 666, 1, 0, 0, 0, 666, 667, 1, 0, 0, 0, 667, 668,
    5, 45, 0, 0, 668, 669, 5, 47, 0, 0, 669, 671, 5, 78, 0, 0, 670, 672, 3, 96, 48, 0, 671, 670, 1,
    0, 0, 0, 671, 672, 1, 0, 0, 0, 672, 673, 1, 0, 0, 0, 673, 674, 5, 79, 0, 0, 674, 675, 5, 68, 0,
    0, 675, 676, 5, 48, 0, 0, 676, 678, 5, 82, 0, 0, 677, 679, 3, 30, 15, 0, 678, 677, 1, 0, 0, 0,
    678, 679, 1, 0, 0, 0, 679, 680, 1, 0, 0, 0, 680, 681, 5, 107, 0, 0, 681, 685, 5, 93, 0, 0, 682,
    684, 3, 32, 16, 0, 683, 682, 1, 0, 0, 0, 684, 687, 1, 0, 0, 0, 685, 683, 1, 0, 0, 0, 685, 686,
    1, 0, 0, 0, 686, 688, 1, 0, 0, 0, 687, 685, 1, 0, 0, 0, 688, 689, 5, 118, 0, 0, 689, 690, 5, 93,
    0, 0, 690, 67, 1, 0, 0, 0, 691, 693, 5, 105, 0, 0, 692, 691, 1, 0, 0, 0, 692, 693, 1, 0, 0, 0,
    693, 694, 1, 0, 0, 0, 694, 695, 3, 78, 39, 0, 695, 696, 5, 82, 0, 0, 696, 698, 3, 106, 53, 0,
    697, 699, 3, 30, 15, 0, 698, 697, 1, 0, 0, 0, 698, 699, 1, 0, 0, 0, 699, 700, 1, 0, 0, 0, 700,
    701, 5, 93, 0, 0, 701, 69, 1, 0, 0, 0, 702, 704, 5, 106, 0, 0, 703, 702, 1, 0, 0, 0, 703, 704,
    1, 0, 0, 0, 704, 705, 1, 0, 0, 0, 705, 706, 5, 45, 0, 0, 706, 707, 3, 84, 42, 0, 707, 709, 5,
    78, 0, 0, 708, 710, 3, 96, 48, 0, 709, 708, 1, 0, 0, 0, 709, 710, 1, 0, 0, 0, 710, 711, 1, 0, 0,
    0, 711, 712, 5, 79, 0, 0, 712, 713, 5, 68, 0, 0, 713, 714, 3, 106, 53, 0, 714, 716, 5, 82, 0, 0,
    715, 717, 3, 30, 15, 0, 716, 715, 1, 0, 0, 0, 716, 717, 1, 0, 0, 0, 717, 718, 1, 0, 0, 0, 718,
    722, 5, 93, 0, 0, 719, 721, 3, 32, 16, 0, 720, 719, 1, 0, 0, 0, 721, 724, 1, 0, 0, 0, 722, 720,
    1, 0, 0, 0, 722, 723, 1, 0, 0, 0, 723, 725, 1, 0, 0, 0, 724, 722, 1, 0, 0, 0, 725, 726, 3, 64,
    32, 0, 726, 728, 5, 109, 0, 0, 727, 729, 5, 107, 0, 0, 728, 727, 1, 0, 0, 0, 728, 729, 1, 0, 0,
    0, 729, 730, 1, 0, 0, 0, 730, 731, 5, 93, 0, 0, 731, 71, 1, 0, 0, 0, 732, 734, 5, 106, 0, 0,
    733, 732, 1, 0, 0, 0, 733, 734, 1, 0, 0, 0, 734, 735, 1, 0, 0, 0, 735, 736, 5, 45, 0, 0, 736,
    737, 3, 84, 42, 0, 737, 739, 5, 78, 0, 0, 738, 740, 3, 96, 48, 0, 739, 738, 1, 0, 0, 0, 739,
    740, 1, 0, 0, 0, 740, 741, 1, 0, 0, 0, 741, 742, 5, 79, 0, 0, 742, 743, 5, 68, 0, 0, 743, 744,
    5, 48, 0, 0, 744, 746, 5, 82, 0, 0, 745, 747, 3, 30, 15, 0, 746, 745, 1, 0, 0, 0, 746, 747, 1,
    0, 0, 0, 747, 748, 1, 0, 0, 0, 748, 752, 5, 93, 0, 0, 749, 751, 3, 32, 16, 0, 750, 749, 1, 0, 0,
    0, 751, 754, 1, 0, 0, 0, 752, 750, 1, 0, 0, 0, 752, 753, 1, 0, 0, 0, 753, 755, 1, 0, 0, 0, 754,
    752, 1, 0, 0, 0, 755, 757, 5, 111, 0, 0, 756, 758, 5, 107, 0, 0, 757, 756, 1, 0, 0, 0, 757, 758,
    1, 0, 0, 0, 758, 759, 1, 0, 0, 0, 759, 760, 5, 93, 0, 0, 760, 73, 1, 0, 0, 0, 761, 763, 5, 105,
    0, 0, 762, 761, 1, 0, 0, 0, 762, 763, 1, 0, 0, 0, 763, 764, 1, 0, 0, 0, 764, 765, 5, 123, 0, 0,
    765, 766, 5, 93, 0, 0, 766, 767, 5, 45, 0, 0, 767, 768, 3, 84, 42, 0, 768, 770, 5, 78, 0, 0,
    769, 771, 3, 96, 48, 0, 770, 769, 1, 0, 0, 0, 770, 771, 1, 0, 0, 0, 771, 772, 1, 0, 0, 0, 772,
    773, 5, 79, 0, 0, 773, 774, 5, 68, 0, 0, 774, 775, 3, 106, 53, 0, 775, 776, 5, 82, 0, 0, 776,
    777, 5, 93, 0, 0, 777, 779, 5, 49, 0, 0, 778, 780, 3, 30, 15, 0, 779, 778, 1, 0, 0, 0, 779, 780,
    1, 0, 0, 0, 780, 781, 1, 0, 0, 0, 781, 782, 5, 93, 0, 0, 782, 75, 1, 0, 0, 0, 783, 785, 5, 105,
    0, 0, 784, 783, 1, 0, 0, 0, 784, 785, 1, 0, 0, 0, 785, 786, 1, 0, 0, 0, 786, 787, 5, 123, 0, 0,
    787, 788, 5, 93, 0, 0, 788, 789, 5, 45, 0, 0, 789, 790, 3, 84, 42, 0, 790, 792, 5, 78, 0, 0,
    791, 793, 3, 96, 48, 0, 792, 791, 1, 0, 0, 0, 792, 793, 1, 0, 0, 0, 793, 794, 1, 0, 0, 0, 794,
    795, 5, 79, 0, 0, 795, 796, 5, 68, 0, 0, 796, 797, 5, 48, 0, 0, 797, 798, 5, 82, 0, 0, 798, 799,
    5, 93, 0, 0, 799, 801, 5, 49, 0, 0, 800, 802, 3, 30, 15, 0, 801, 800, 1, 0, 0, 0, 801, 802, 1,
    0, 0, 0, 802, 803, 1, 0, 0, 0, 803, 804, 5, 93, 0, 0, 804, 77, 1, 0, 0, 0, 805, 806, 5, 95, 0,
    0, 806, 79, 1, 0, 0, 0, 807, 808, 5, 95, 0, 0, 808, 81, 1, 0, 0, 0, 809, 810, 6, 41, -1, 0, 810,
    815, 3, 80, 40, 0, 811, 812, 5, 72, 0, 0, 812, 813, 5, 80, 0, 0, 813, 815, 3, 80, 40, 0, 814,
    809, 1, 0, 0, 0, 814, 811, 1, 0, 0, 0, 815, 820, 1, 0, 0, 0, 816, 817, 10, 1, 0, 0, 817, 819, 3,
    124, 62, 0, 818, 816, 1, 0, 0, 0, 819, 822, 1, 0, 0, 0, 820, 818, 1, 0, 0, 0, 820, 821, 1, 0, 0,
    0, 821, 83, 1, 0, 0, 0, 822, 820, 1, 0, 0, 0, 823, 824, 5, 95, 0, 0, 824, 85, 1, 0, 0, 0, 825,
    826, 5, 94, 0, 0, 826, 87, 1, 0, 0, 0, 827, 834, 5, 54, 0, 0, 828, 834, 5, 55, 0, 0, 829, 834,
    5, 56, 0, 0, 830, 834, 5, 57, 0, 0, 831, 834, 5, 58, 0, 0, 832, 834, 5, 96, 0, 0, 833, 827, 1,
    0, 0, 0, 833, 828, 1, 0, 0, 0, 833, 829, 1, 0, 0, 0, 833, 830, 1, 0, 0, 0, 833, 831, 1, 0, 0, 0,
    833, 832, 1, 0, 0, 0, 834, 89, 1, 0, 0, 0, 835, 840, 3, 114, 57, 0, 836, 840, 3, 116, 58, 0,
    837, 840, 3, 118, 59, 0, 838, 840, 3, 120, 60, 0, 839, 835, 1, 0, 0, 0, 839, 836, 1, 0, 0, 0,
    839, 837, 1, 0, 0, 0, 839, 838, 1, 0, 0, 0, 840, 91, 1, 0, 0, 0, 841, 846, 3, 94, 47, 0, 842,
    843, 5, 81, 0, 0, 843, 845, 3, 94, 47, 0, 844, 842, 1, 0, 0, 0, 845, 848, 1, 0, 0, 0, 846, 844,
    1, 0, 0, 0, 846, 847, 1, 0, 0, 0, 847, 93, 1, 0, 0, 0, 848, 846, 1, 0, 0, 0, 849, 852, 3, 168,
    84, 0, 850, 852, 3, 126, 63, 0, 851, 849, 1, 0, 0, 0, 851, 850, 1, 0, 0, 0, 852, 95, 1, 0, 0, 0,
    853, 858, 3, 160, 80, 0, 854, 855, 5, 81, 0, 0, 855, 857, 3, 160, 80, 0, 856, 854, 1, 0, 0, 0,
    857, 860, 1, 0, 0, 0, 858, 856, 1, 0, 0, 0, 858, 859, 1, 0, 0, 0, 859, 97, 1, 0, 0, 0, 860, 858,
    1, 0, 0, 0, 861, 864, 3, 78, 39, 0, 862, 863, 5, 81, 0, 0, 863, 865, 3, 78, 39, 0, 864, 862, 1,
    0, 0, 0, 865, 866, 1, 0, 0, 0, 866, 864, 1, 0, 0, 0, 866, 867, 1, 0, 0, 0, 867, 99, 1, 0, 0, 0,
    868, 873, 3, 126, 63, 0, 869, 870, 5, 81, 0, 0, 870, 872, 3, 126, 63, 0, 871, 869, 1, 0, 0, 0,
    872, 875, 1, 0, 0, 0, 873, 871, 1, 0, 0, 0, 873, 874, 1, 0, 0, 0, 874, 101, 1, 0, 0, 0, 875,
    873, 1, 0, 0, 0, 876, 877, 3, 78, 39, 0, 877, 878, 5, 73, 0, 0, 878, 879, 3, 116, 58, 0, 879,
    103, 1, 0, 0, 0, 880, 885, 3, 102, 51, 0, 881, 882, 5, 93, 0, 0, 882, 884, 3, 102, 51, 0, 883,
    881, 1, 0, 0, 0, 884, 887, 1, 0, 0, 0, 885, 883, 1, 0, 0, 0, 885, 886, 1, 0, 0, 0, 886, 105, 1,
    0, 0, 0, 887, 885, 1, 0, 0, 0, 888, 893, 3, 166, 83, 0, 889, 893, 3, 88, 44, 0, 890, 893, 3,
    162, 81, 0, 891, 893, 3, 164, 82, 0, 892, 888, 1, 0, 0, 0, 892, 889, 1, 0, 0, 0, 892, 890, 1, 0,
    0, 0, 892, 891, 1, 0, 0, 0, 893, 107, 1, 0, 0, 0, 894, 895, 3, 126, 63, 0, 895, 109, 1, 0, 0, 0,
    896, 902, 3, 112, 56, 0, 897, 902, 3, 144, 72, 0, 898, 902, 3, 148, 74, 0, 899, 902, 3, 136, 68,
    0, 900, 902, 3, 146, 73, 0, 901, 896, 1, 0, 0, 0, 901, 897, 1, 0, 0, 0, 901, 898, 1, 0, 0, 0,
    901, 899, 1, 0, 0, 0, 901, 900, 1, 0, 0, 0, 902, 111, 1, 0, 0, 0, 903, 910, 3, 114, 57, 0, 904,
    910, 3, 116, 58, 0, 905, 910, 3, 118, 59, 0, 906, 910, 3, 120, 60, 0, 907, 910, 3, 170, 85, 0,
    908, 910, 3, 122, 61, 0, 909, 903, 1, 0, 0, 0, 909, 904, 1, 0, 0, 0, 909, 905, 1, 0, 0, 0, 909,
    906, 1, 0, 0, 0, 909, 907, 1, 0, 0, 0, 909, 908, 1, 0, 0, 0, 910, 113, 1, 0, 0, 0, 911, 912, 7,
    0, 0, 0, 912, 115, 1, 0, 0, 0, 913, 917, 5, 99, 0, 0, 914, 917, 5, 97, 0, 0, 915, 917, 5, 98, 0,
    0, 916, 913, 1, 0, 0, 0, 916, 914, 1, 0, 0, 0, 916, 915, 1, 0, 0, 0, 917, 117, 1, 0, 0, 0, 918,
    919, 5, 100, 0, 0, 919, 119, 1, 0, 0, 0, 920, 921, 7, 1, 0, 0, 921, 121, 1, 0, 0, 0, 922, 923,
    3, 88, 44, 0, 923, 924, 5, 80, 0, 0, 924, 925, 3, 80, 40, 0, 925, 123, 1, 0, 0, 0, 926, 927, 5,
    76, 0, 0, 927, 928, 3, 126, 63, 0, 928, 929, 5, 77, 0, 0, 929, 125, 1, 0, 0, 0, 930, 931, 6, 63,
    -1, 0, 931, 936, 3, 158, 79, 0, 932, 936, 3, 136, 68, 0, 933, 936, 3, 128, 64, 0, 934, 936, 3,
    142, 71, 0, 935, 930, 1, 0, 0, 0, 935, 932, 1, 0, 0, 0, 935, 933, 1, 0, 0, 0, 935, 934, 1, 0, 0,
    0, 936, 952, 1, 0, 0, 0, 937, 938, 10, 1, 0, 0, 938, 939, 5, 6, 0, 0, 939, 944, 3, 126, 63, 0,
    940, 941, 5, 2, 0, 0, 941, 943, 3, 126, 63, 0, 942, 940, 1, 0, 0, 0, 943, 946, 1, 0, 0, 0, 944,
    942, 1, 0, 0, 0, 944, 945, 1, 0, 0, 0, 945, 947, 1, 0, 0, 0, 946, 944, 1, 0, 0, 0, 947, 948, 5,
    3, 0, 0, 948, 949, 3, 126, 63, 2, 949, 951, 1, 0, 0, 0, 950, 937, 1, 0, 0, 0, 951, 954, 1, 0, 0,
    0, 952, 950, 1, 0, 0, 0, 952, 953, 1, 0, 0, 0, 953, 127, 1, 0, 0, 0, 954, 952, 1, 0, 0, 0, 955,
    956, 6, 64, -1, 0, 956, 965, 3, 132, 66, 0, 957, 965, 3, 134, 67, 0, 958, 965, 3, 112, 56, 0,
    959, 965, 3, 144, 72, 0, 960, 965, 3, 148, 74, 0, 961, 965, 3, 146, 73, 0, 962, 965, 3, 80, 40,
    0, 963, 965, 3, 154, 77, 0, 964, 955, 1, 0, 0, 0, 964, 957, 1, 0, 0, 0, 964, 958, 1, 0, 0, 0,
    964, 959, 1, 0, 0, 0, 964, 960, 1, 0, 0, 0, 964, 961, 1, 0, 0, 0, 964, 962, 1, 0, 0, 0, 964,
    963, 1, 0, 0, 0, 965, 973, 1, 0, 0, 0, 966, 967, 10, 2, 0, 0, 967, 972, 3, 124, 62, 0, 968, 969,
    10, 1, 0, 0, 969, 970, 5, 80, 0, 0, 970, 972, 3, 130, 65, 0, 971, 966, 1, 0, 0, 0, 971, 968, 1,
    0, 0, 0, 972, 975, 1, 0, 0, 0, 973, 971, 1, 0, 0, 0, 973, 974, 1, 0, 0, 0, 974, 129, 1, 0, 0, 0,
    975, 973, 1, 0, 0, 0, 976, 979, 3, 80, 40, 0, 977, 979, 3, 154, 77, 0, 978, 976, 1, 0, 0, 0,
    978, 977, 1, 0, 0, 0, 979, 131, 1, 0, 0, 0, 980, 981, 5, 72, 0, 0, 981, 133, 1, 0, 0, 0, 982,
    983, 5, 78, 0, 0, 983, 984, 3, 126, 63, 0, 984, 985, 5, 79, 0, 0, 985, 135, 1, 0, 0, 0, 986,
    989, 3, 138, 69, 0, 987, 989, 3, 140, 70, 0, 988, 986, 1, 0, 0, 0, 988, 987, 1, 0, 0, 0, 989,
    137, 1, 0, 0, 0, 990, 991, 5, 84, 0, 0, 991, 992, 3, 128, 64, 0, 992, 139, 1, 0, 0, 0, 993, 994,
    5, 64, 0, 0, 994, 995, 3, 128, 64, 0, 995, 141, 1, 0, 0, 0, 996, 997, 3, 128, 64, 0, 997, 998,
    3, 156, 78, 0, 998, 999, 3, 126, 63, 0, 999, 143, 1, 0, 0, 0, 1000, 1001, 5, 76, 0, 0, 1001,
    1002, 3, 100, 50, 0, 1002, 1003, 5, 77, 0, 0, 1003, 145, 1, 0, 0, 0, 1004, 1005, 5, 78, 0, 0,
    1005, 1006, 3, 100, 50, 0, 1006, 1007, 5, 79, 0, 0, 1007, 147, 1, 0, 0, 0, 1008, 1009, 5, 74, 0,
    0, 1009, 1010, 3, 150, 75, 0, 1010, 1011, 5, 75, 0, 0, 1011, 149, 1, 0, 0, 0, 1012, 1017, 3,
    152, 76, 0, 1013, 1014, 5, 81, 0, 0, 1014, 1016, 3, 152, 76, 0, 1015, 1013, 1, 0, 0, 0, 1016,
    1019, 1, 0, 0, 0, 1017, 1015, 1, 0, 0, 0, 1017, 1018, 1, 0, 0, 0, 1018, 151, 1, 0, 0, 0, 1019,
    1017, 1, 0, 0, 0, 1020, 1021, 3, 126, 63, 0, 1021, 1022, 5, 82, 0, 0, 1022, 1023, 3, 126, 63, 0,
    1023, 153, 1, 0, 0, 0, 1024, 1025, 3, 84, 42, 0, 1025, 1027, 5, 78, 0, 0, 1026, 1028, 3, 92, 46,
    0, 1027, 1026, 1, 0, 0, 0, 1027, 1028, 1, 0, 0, 0, 1028, 1029, 1, 0, 0, 0, 1029, 1030, 5, 79, 0,
    0, 1030, 155, 1, 0, 0, 0, 1031, 1032, 7, 2, 0, 0, 1032, 157, 1, 0, 0, 0, 1033, 1034, 3, 106, 53,
    0, 1034, 1036, 5, 78, 0, 0, 1035, 1037, 3, 92, 46, 0, 1036, 1035, 1, 0, 0, 0, 1036, 1037, 1, 0,
    0, 0, 1037, 1038, 1, 0, 0, 0, 1038, 1039, 5, 79, 0, 0, 1039, 159, 1, 0, 0, 0, 1040, 1043, 3, 78,
    39, 0, 1041, 1043, 5, 72, 0, 0, 1042, 1040, 1, 0, 0, 0, 1042, 1041, 1, 0, 0, 0, 1043, 1044, 1,
    0, 0, 0, 1044, 1045, 5, 82, 0, 0, 1045, 1046, 3, 106, 53, 0, 1046, 161, 1, 0, 0, 0, 1047, 1048,
    3, 88, 44, 0, 1048, 1049, 5, 76, 0, 0, 1049, 1054, 3, 106, 53, 0, 1050, 1051, 5, 81, 0, 0, 1051,
    1053, 3, 106, 53, 0, 1052, 1050, 1, 0, 0, 0, 1053, 1056, 1, 0, 0, 0, 1054, 1052, 1, 0, 0, 0,
    1054, 1055, 1, 0, 0, 0, 1055, 1057, 1, 0, 0, 0, 1056, 1054, 1, 0, 0, 0, 1057, 1058, 5, 77, 0, 0,
    1058, 163, 1, 0, 0, 0, 1059, 1060, 5, 59, 0, 0, 1060, 1061, 5, 76, 0, 0, 1061, 1062, 5, 76, 0,
    0, 1062, 1067, 3, 106, 53, 0, 1063, 1064, 5, 81, 0, 0, 1064, 1066, 3, 106, 53, 0, 1065, 1063, 1,
    0, 0, 0, 1066, 1069, 1, 0, 0, 0, 1067, 1065, 1, 0, 0, 0, 1067, 1068, 1, 0, 0, 0, 1068, 1070, 1,
    0, 0, 0, 1069, 1067, 1, 0, 0, 0, 1070, 1071, 5, 77, 0, 0, 1071, 1072, 5, 81, 0, 0, 1072, 1073,
    3, 106, 53, 0, 1073, 1074, 5, 77, 0, 0, 1074, 165, 1, 0, 0, 0, 1075, 1076, 5, 53, 0, 0, 1076,
    1077, 5, 76, 0, 0, 1077, 1080, 3, 106, 53, 0, 1078, 1079, 5, 81, 0, 0, 1079, 1081, 3, 106, 53,
    0, 1080, 1078, 1, 0, 0, 0, 1081, 1082, 1, 0, 0, 0, 1082, 1080, 1, 0, 0, 0, 1082, 1083, 1, 0, 0,
    0, 1083, 1084, 1, 0, 0, 0, 1084, 1085, 5, 77, 0, 0, 1085, 167, 1, 0, 0, 0, 1086, 1087, 5, 9, 0,
    0, 1087, 1088, 3, 96, 48, 0, 1088, 1089, 5, 82, 0, 0, 1089, 1090, 3, 126, 63, 0, 1090, 169, 1,
    0, 0, 0, 1091, 1092, 5, 102, 0, 0, 1092, 171, 1, 0, 0, 0, 131, 173, 178, 182, 187, 201, 204,
    217, 222, 231, 237, 244, 250, 256, 261, 273, 278, 285, 288, 294, 301, 307, 312, 317, 323, 328,
    337, 343, 348, 356, 360, 367, 372, 380, 383, 390, 396, 402, 407, 417, 420, 436, 439, 448, 457,
    463, 470, 474, 478, 485, 489, 495, 501, 505, 508, 513, 519, 523, 526, 532, 538, 546, 554, 560,
    568, 572, 577, 582, 589, 593, 600, 604, 612, 618, 622, 625, 633, 639, 642, 653, 660, 665, 671,
    678, 685, 692, 698, 703, 709, 716, 722, 728, 733, 739, 746, 752, 757, 762, 770, 779, 784, 792,
    801, 814, 820, 833, 839, 846, 851, 858, 866, 873, 885, 892, 901, 909, 916, 935, 944, 952, 964,
    971, 973, 978, 988, 1017, 1027, 1036, 1042, 1054, 1067, 1082,
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
  public COMMENT(): antlr.TerminalNode {
    return this.getToken(PythonParser.COMMENT, 0)!;
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
  public testStatement(): TestStatementContext[];
  public testStatement(i: number): TestStatementContext | null;
  public testStatement(i?: number): TestStatementContext[] | TestStatementContext | null {
    if (i === undefined) {
      return this.getRuleContexts(TestStatementContext);
    }

    return this.getRuleContext(i, TestStatementContext);
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
  public identifierList(): IdentifierListContext {
    return this.getRuleContext(0, IdentifierListContext)!;
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
  public GHOSTED_BLOCK_END(): antlr.TerminalNode {
    return this.getToken(PythonParser.GHOSTED_BLOCK_END, 0)!;
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
