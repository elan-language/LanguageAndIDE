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
  public static readonly LAMBDA = 7;
  public static readonly MAIN = 8;
  public static readonly RETURN = 9;
  public static readonly TRY = 10;
  public static readonly WHILE = 11;
  public static readonly IF_ = 12;
  public static readonly ABSTRACT = 13;
  public static readonly ASSERT = 14;
  public static readonly ASSIGN = 15;
  public static readonly BE = 16;
  public static readonly CALL = 17;
  public static readonly CATCH = 18;
  public static readonly CONSTANT = 19;
  public static readonly CONSTRUCTOR = 20;
  public static readonly COPY = 21;
  public static readonly DIV = 22;
  public static readonly END = 23;
  public static readonly EVALUATES = 24;
  public static readonly FROM = 25;
  public static readonly FUNCTION = 26;
  public static readonly INHERITS = 27;
  public static readonly LET = 28;
  public static readonly NEW = 29;
  public static readonly PRIVATE = 30;
  public static readonly PROCEDURE = 31;
  public static readonly PROPERTY = 32;
  public static readonly RETURNS = 33;
  public static readonly SET = 34;
  public static readonly STEP = 35;
  public static readonly TEST = 36;
  public static readonly THEN = 37;
  public static readonly THROW = 38;
  public static readonly TO = 39;
  public static readonly VARIABLE = 40;
  public static readonly ASSERT_EQUAL = 41;
  public static readonly AS = 42;
  public static readonly DEF = 43;
  public static readonly EXCEPT = 44;
  public static readonly INIT = 45;
  public static readonly NONE = 46;
  public static readonly PASS = 47;
  public static readonly RAISE = 48;
  public static readonly ABC = 49;
  public static readonly ENUM = 50;
  public static readonly TESTCASE = 51;
  public static readonly TUPLE = 52;
  public static readonly INT_NAME = 53;
  public static readonly FLOAT_NAME = 54;
  public static readonly BOOL_NAME = 55;
  public static readonly STRING_NAME = 56;
  public static readonly LIST_NAME = 57;
  public static readonly DICT_NAME = 58;
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
  public static readonly RULE_globalBlock = 1;
  public static readonly RULE_global = 2;
  public static readonly RULE_main = 3;
  public static readonly RULE_mainCall = 4;
  public static readonly RULE_function = 5;
  public static readonly RULE_test = 6;
  public static readonly RULE_testFunction = 7;
  public static readonly RULE_testStatement = 8;
  public static readonly RULE_procedure = 9;
  public static readonly RULE_constant = 10;
  public static readonly RULE_enum = 11;
  public static readonly RULE_concreteClass = 12;
  public static readonly RULE_concreteClassMember = 13;
  public static readonly RULE_abstractClass = 14;
  public static readonly RULE_abstractClassMember = 15;
  public static readonly RULE_comment = 16;
  public static readonly RULE_commentText = 17;
  public static readonly RULE_statementBlock = 18;
  public static readonly RULE_selectableStatement = 19;
  public static readonly RULE_ordinaryStatement = 20;
  public static readonly RULE_variableDefinition = 21;
  public static readonly RULE_assignment = 22;
  public static readonly RULE_ifStatement = 23;
  public static readonly RULE_thenClause = 24;
  public static readonly RULE_elseIfClause = 25;
  public static readonly RULE_elseClause = 26;
  public static readonly RULE_whileLoop = 27;
  public static readonly RULE_forLoop = 28;
  public static readonly RULE_procedureCall = 29;
  public static readonly RULE_tryStatement = 30;
  public static readonly RULE_tryClause = 31;
  public static readonly RULE_catchClause = 32;
  public static readonly RULE_throwStatement = 33;
  public static readonly RULE_errorMessage = 34;
  public static readonly RULE_assert = 35;
  public static readonly RULE_returnStatement = 36;
  public static readonly RULE_memberBlock = 37;
  public static readonly RULE_selectableMember = 38;
  public static readonly RULE_constructorMember = 39;
  public static readonly RULE_property = 40;
  public static readonly RULE_functionMethod = 41;
  public static readonly RULE_procedureMethod = 42;
  public static readonly RULE_abstractFunction = 43;
  public static readonly RULE_abstractProcedure = 44;
  public static readonly RULE_identifierDef = 45;
  public static readonly RULE_identifierUse = 46;
  public static readonly RULE_assignable = 47;
  public static readonly RULE_methodName = 48;
  public static readonly RULE_testName = 49;
  public static readonly RULE_testClassName = 50;
  public static readonly RULE_typeName = 51;
  public static readonly RULE_constantValue = 52;
  public static readonly RULE_argList = 53;
  public static readonly RULE_argument = 54;
  public static readonly RULE_paramList = 55;
  public static readonly RULE_identifierList = 56;
  public static readonly RULE_expressionList = 57;
  public static readonly RULE_enumDefValue = 58;
  public static readonly RULE_enumList = 59;
  public static readonly RULE_type = 60;
  public static readonly RULE_assertActual = 61;
  public static readonly RULE_assertExpected = 62;
  public static readonly RULE_litValue = 63;
  public static readonly RULE_litBoolean = 64;
  public static readonly RULE_litInt = 65;
  public static readonly RULE_litFloat = 66;
  public static readonly RULE_litString = 67;
  public static readonly RULE_enumValue = 68;
  public static readonly RULE_index = 69;
  public static readonly RULE_expression = 70;
  public static readonly RULE_term = 71;
  public static readonly RULE_chainable = 72;
  public static readonly RULE_thisInstance = 73;
  public static readonly RULE_bracketedExpression = 74;
  public static readonly RULE_unaryExpression = 75;
  public static readonly RULE_negateNumeric = 76;
  public static readonly RULE_negateLogical = 77;
  public static readonly RULE_binaryExpression = 78;
  public static readonly RULE_list = 79;
  public static readonly RULE_tuple = 80;
  public static readonly RULE_dictionary = 81;
  public static readonly RULE_kvpList = 82;
  public static readonly RULE_kvp = 83;
  public static readonly RULE_methodCall = 84;
  public static readonly RULE_binaryOperator = 85;
  public static readonly RULE_newInstance = 86;
  public static readonly RULE_paramDef = 87;
  public static readonly RULE_typeGeneric = 88;
  public static readonly RULE_typeFunc = 89;
  public static readonly RULE_typeTuple = 90;
  public static readonly RULE_lambda = 91;
  public static readonly RULE_interpolatedString = 92;

  public static readonly literalNames = [
    null,
    "'class'",
    "'elif'",
    "'else'",
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
    "'dict'",
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
    "globalBlock",
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
        this.state = 187;
        this.errorHandler.sync(this);
        switch (this.interpreter.adaptivePredict(this.tokenStream, 0, this.context)) {
          case 1:
            {
              this.state = 186;
              this.comment();
            }
            break;
        }
        this.state = 192;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (
          _la === 1 ||
          _la === 43 ||
          (((_la - 96) & ~0x1f) === 0 && ((1 << (_la - 96)) & 1073744897) !== 0)
        ) {
          {
            {
              this.state = 189;
              this.global();
            }
          }
          this.state = 194;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 196;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 8) {
          {
            this.state = 195;
            this.mainCall();
          }
        }

        this.state = 201;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (_la === 93) {
          {
            {
              this.state = 198;
              this.match(PythonParser.NL);
            }
          }
          this.state = 203;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 204;
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
  public globalBlock(): GlobalBlockContext {
    let localContext = new GlobalBlockContext(this.context, this.state);
    this.enterRule(localContext, 2, PythonParser.RULE_globalBlock);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 207;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        do {
          {
            {
              this.state = 206;
              this.global();
            }
          }
          this.state = 209;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        } while (
          _la === 1 ||
          _la === 43 ||
          (((_la - 96) & ~0x1f) === 0 && ((1 << (_la - 96)) & 1073744897) !== 0)
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
    this.enterRule(localContext, 4, PythonParser.RULE_global);
    try {
      this.state = 220;
      this.errorHandler.sync(this);
      switch (this.interpreter.adaptivePredict(this.tokenStream, 5, this.context)) {
        case 1:
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 211;
            this.main();
          }
          break;
        case 2:
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 212;
            this.function_();
          }
          break;
        case 3:
          this.enterOuterAlt(localContext, 3);
          {
            this.state = 213;
            this.test();
          }
          break;
        case 4:
          this.enterOuterAlt(localContext, 4);
          {
            this.state = 214;
            this.procedure();
          }
          break;
        case 5:
          this.enterOuterAlt(localContext, 5);
          {
            this.state = 215;
            this.constant();
          }
          break;
        case 6:
          this.enterOuterAlt(localContext, 6);
          {
            this.state = 216;
            this.enum_();
          }
          break;
        case 7:
          this.enterOuterAlt(localContext, 7);
          {
            this.state = 217;
            this.concreteClass();
          }
          break;
        case 8:
          this.enterOuterAlt(localContext, 8);
          {
            this.state = 218;
            this.abstractClass();
          }
          break;
        case 9:
          this.enterOuterAlt(localContext, 9);
          {
            this.state = 219;
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
    this.enterRule(localContext, 6, PythonParser.RULE_main);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 223;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 107) {
          {
            this.state = 222;
            this.match(PythonParser.GHOSTED_BLOCK_START);
          }
        }

        this.state = 225;
        this.match(PythonParser.DEF);
        this.state = 226;
        this.match(PythonParser.MAIN);
        this.state = 227;
        this.match(PythonParser.OPEN_BRACKET);
        this.state = 228;
        this.match(PythonParser.CLOSE_BRACKET);
        this.state = 229;
        this.match(PythonParser.ARROW);
        this.state = 230;
        this.match(PythonParser.NONE);
        this.state = 231;
        this.match(PythonParser.COLON);
        this.state = 232;
        this.match(PythonParser.NL);
        this.state = 236;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (
          ((_la & ~0x1f) === 0 && ((1 << _la) & 3120) !== 0) ||
          (((_la - 48) & ~0x1f) === 0 && ((1 << (_la - 48)) & 1426077665) !== 0) ||
          (((_la - 96) & ~0x1f) === 0 && ((1 << (_la - 96)) & 1073745151) !== 0)
        ) {
          {
            {
              this.state = 233;
              this.ordinaryStatement();
            }
          }
          this.state = 238;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 239;
        this.match(PythonParser.END_MAIN);
        this.state = 241;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 108) {
          {
            this.state = 240;
            this.match(PythonParser.GHOSTED_BLOCK_END);
          }
        }

        this.state = 243;
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
    this.enterRule(localContext, 8, PythonParser.RULE_mainCall);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 245;
        this.match(PythonParser.MAIN);
        this.state = 246;
        this.match(PythonParser.OPEN_BRACKET);
        this.state = 247;
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
    this.enterRule(localContext, 10, PythonParser.RULE_function);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 250;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 107) {
          {
            this.state = 249;
            this.match(PythonParser.GHOSTED_BLOCK_START);
          }
        }

        this.state = 252;
        this.match(PythonParser.DEF);
        this.state = 253;
        this.methodName();
        this.state = 254;
        this.match(PythonParser.OPEN_BRACKET);
        this.state = 256;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 72 || _la === 96) {
          {
            this.state = 255;
            this.paramList();
          }
        }

        this.state = 258;
        this.match(PythonParser.CLOSE_BRACKET);
        this.state = 259;
        this.match(PythonParser.ARROW);
        this.state = 260;
        this.type_();
        this.state = 261;
        this.match(PythonParser.COLON);
        this.state = 263;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 126) {
          {
            this.state = 262;
            this.commentText();
          }
        }

        this.state = 265;
        this.match(PythonParser.NL);
        this.state = 269;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (
          ((_la & ~0x1f) === 0 && ((1 << _la) & 3120) !== 0) ||
          (((_la - 48) & ~0x1f) === 0 && ((1 << (_la - 48)) & 1426077665) !== 0) ||
          (((_la - 96) & ~0x1f) === 0 && ((1 << (_la - 96)) & 1073745151) !== 0)
        ) {
          {
            {
              this.state = 266;
              this.ordinaryStatement();
            }
          }
          this.state = 271;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 272;
        this.returnStatement();
        this.state = 273;
        this.match(PythonParser.END_FUNCTION);
        this.state = 275;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 108) {
          {
            this.state = 274;
            this.match(PythonParser.GHOSTED_BLOCK_END);
          }
        }

        this.state = 277;
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
    this.enterRule(localContext, 12, PythonParser.RULE_test);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 280;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 107) {
          {
            this.state = 279;
            this.match(PythonParser.GHOSTED_BLOCK_START);
          }
        }

        this.state = 282;
        this.match(PythonParser.CLASS);
        this.state = 283;
        this.testClassName();
        this.state = 284;
        this.match(PythonParser.OPEN_BRACKET);
        this.state = 285;
        this.match(PythonParser.TESTCASE);
        this.state = 286;
        this.match(PythonParser.CLOSE_BRACKET);
        this.state = 287;
        this.match(PythonParser.COLON);
        this.state = 288;
        this.match(PythonParser.NL);
        this.state = 289;
        this.testFunction();
        this.state = 290;
        this.match(PythonParser.END_TEST_CLASS);
        this.state = 292;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 108) {
          {
            this.state = 291;
            this.match(PythonParser.GHOSTED_BLOCK_END);
          }
        }

        this.state = 294;
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
    this.enterRule(localContext, 14, PythonParser.RULE_testFunction);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 297;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 107) {
          {
            this.state = 296;
            this.match(PythonParser.GHOSTED_BLOCK_START);
          }
        }

        this.state = 299;
        this.match(PythonParser.DEF);
        this.state = 300;
        this.testName();
        this.state = 301;
        this.match(PythonParser.OPEN_BRACKET);
        this.state = 302;
        this.match(PythonParser.THIS_INSTANCE);
        this.state = 303;
        this.match(PythonParser.COLON);
        this.state = 304;
        this.testClassName();
        this.state = 305;
        this.match(PythonParser.CLOSE_BRACKET);
        this.state = 306;
        this.match(PythonParser.ARROW);
        this.state = 307;
        this.match(PythonParser.NONE);
        this.state = 308;
        this.match(PythonParser.COLON);
        this.state = 310;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 126) {
          {
            this.state = 309;
            this.commentText();
          }
        }

        this.state = 312;
        this.match(PythonParser.NL);
        this.state = 316;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (_la === 72 || _la === 96 || _la === 106 || _la === 126) {
          {
            {
              this.state = 313;
              this.testStatement();
            }
          }
          this.state = 318;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 319;
        this.match(PythonParser.END_TEST);
        this.state = 320;
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
    this.enterRule(localContext, 16, PythonParser.RULE_testStatement);
    try {
      this.state = 325;
      this.errorHandler.sync(this);
      switch (this.interpreter.adaptivePredict(this.tokenStream, 19, this.context)) {
        case 1:
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 322;
            this.assert();
          }
          break;
        case 2:
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 323;
            this.variableDefinition();
          }
          break;
        case 3:
          this.enterOuterAlt(localContext, 3);
          {
            this.state = 324;
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
    this.enterRule(localContext, 18, PythonParser.RULE_procedure);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 328;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 107) {
          {
            this.state = 327;
            this.match(PythonParser.GHOSTED_BLOCK_START);
          }
        }

        this.state = 330;
        this.match(PythonParser.DEF);
        this.state = 331;
        this.methodName();
        this.state = 332;
        this.match(PythonParser.OPEN_BRACKET);
        this.state = 334;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 72 || _la === 96) {
          {
            this.state = 333;
            this.paramList();
          }
        }

        this.state = 336;
        this.match(PythonParser.CLOSE_BRACKET);
        this.state = 337;
        this.match(PythonParser.ARROW);
        this.state = 338;
        this.match(PythonParser.NONE);
        this.state = 339;
        this.match(PythonParser.COLON);
        this.state = 341;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 126) {
          {
            this.state = 340;
            this.commentText();
          }
        }

        this.state = 343;
        this.match(PythonParser.NL);
        this.state = 347;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (
          ((_la & ~0x1f) === 0 && ((1 << _la) & 3120) !== 0) ||
          (((_la - 48) & ~0x1f) === 0 && ((1 << (_la - 48)) & 1426077665) !== 0) ||
          (((_la - 96) & ~0x1f) === 0 && ((1 << (_la - 96)) & 1073745151) !== 0)
        ) {
          {
            {
              this.state = 344;
              this.ordinaryStatement();
            }
          }
          this.state = 349;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 350;
        this.match(PythonParser.END_PROCEDURE);
        this.state = 352;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 108) {
          {
            this.state = 351;
            this.match(PythonParser.GHOSTED_BLOCK_END);
          }
        }

        this.state = 354;
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
    this.enterRule(localContext, 20, PythonParser.RULE_constant);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 357;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 106) {
          {
            this.state = 356;
            this.match(PythonParser.GHOSTED_LINE);
          }
        }

        this.state = 359;
        this.identifierDef();
        this.state = 360;
        this.match(PythonParser.SINGLE_EQUALS);
        this.state = 361;
        this.constantValue();
        this.state = 363;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 126) {
          {
            this.state = 362;
            this.commentText();
          }
        }

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
  public enum_(): EnumContext {
    let localContext = new EnumContext(this.context, this.state);
    this.enterRule(localContext, 22, PythonParser.RULE_enum);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 368;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 107) {
          {
            this.state = 367;
            this.match(PythonParser.GHOSTED_BLOCK_START);
          }
        }

        this.state = 370;
        this.match(PythonParser.CLASS);
        this.state = 371;
        this.typeName();
        this.state = 372;
        this.match(PythonParser.OPEN_BRACKET);
        this.state = 373;
        this.match(PythonParser.ENUM);
        this.state = 374;
        this.match(PythonParser.CLOSE_BRACKET);
        this.state = 375;
        this.match(PythonParser.COLON);
        this.state = 377;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 126) {
          {
            this.state = 376;
            this.commentText();
          }
        }

        this.state = 379;
        this.match(PythonParser.NL);
        this.state = 380;
        this.enumList();
        this.state = 381;
        this.match(PythonParser.NL);
        this.state = 382;
        this.match(PythonParser.END_ENUM);
        this.state = 384;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 108) {
          {
            this.state = 383;
            this.match(PythonParser.GHOSTED_BLOCK_END);
          }
        }

        this.state = 386;
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
    this.enterRule(localContext, 24, PythonParser.RULE_concreteClass);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 389;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 107) {
          {
            this.state = 388;
            this.match(PythonParser.GHOSTED_BLOCK_START);
          }
        }

        this.state = 391;
        this.match(PythonParser.CLASS);
        this.state = 392;
        localContext._classTypeName = this.typeName();
        this.state = 397;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 78) {
          {
            this.state = 393;
            this.match(PythonParser.OPEN_BRACKET);
            this.state = 394;
            localContext._inheritsTypeName = this.typeName();
            this.state = 395;
            this.match(PythonParser.CLOSE_BRACKET);
          }
        }

        this.state = 399;
        this.match(PythonParser.COLON);
        this.state = 401;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 126) {
          {
            this.state = 400;
            this.commentText();
          }
        }

        this.state = 403;
        this.match(PythonParser.NL);
        this.state = 404;
        this.constructorMember();
        this.state = 408;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (
          _la === 43 ||
          (((_la - 96) & ~0x1f) === 0 && ((1 << (_la - 96)) & 1073744897) !== 0)
        ) {
          {
            {
              this.state = 405;
              this.concreteClassMember();
            }
          }
          this.state = 410;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 411;
        this.match(PythonParser.END_CLASS);
        this.state = 413;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 108) {
          {
            this.state = 412;
            this.match(PythonParser.GHOSTED_BLOCK_END);
          }
        }

        this.state = 415;
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
    this.enterRule(localContext, 26, PythonParser.RULE_concreteClassMember);
    try {
      this.state = 421;
      this.errorHandler.sync(this);
      switch (this.interpreter.adaptivePredict(this.tokenStream, 35, this.context)) {
        case 1:
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 417;
            this.property();
          }
          break;
        case 2:
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 418;
            this.functionMethod();
          }
          break;
        case 3:
          this.enterOuterAlt(localContext, 3);
          {
            this.state = 419;
            this.procedureMethod();
          }
          break;
        case 4:
          this.enterOuterAlt(localContext, 4);
          {
            this.state = 420;
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
    this.enterRule(localContext, 28, PythonParser.RULE_abstractClass);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 424;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 107) {
          {
            this.state = 423;
            this.match(PythonParser.GHOSTED_BLOCK_START);
          }
        }

        this.state = 426;
        this.match(PythonParser.CLASS);
        this.state = 427;
        localContext._classTypeName = this.typeName();
        {
          this.state = 428;
          this.match(PythonParser.OPEN_BRACKET);
          this.state = 431;
          this.errorHandler.sync(this);
          switch (this.tokenStream.LA(1)) {
            case PythonParser.INT_NAME:
            case PythonParser.FLOAT_NAME:
            case PythonParser.BOOL_NAME:
            case PythonParser.STRING_NAME:
            case PythonParser.LIST_NAME:
            case PythonParser.DICT_NAME:
            case PythonParser.NAME_STARTING_UC:
              {
                this.state = 429;
                localContext._inheritsTypeName = this.typeName();
              }
              break;
            case PythonParser.ABC:
              {
                this.state = 430;
                this.match(PythonParser.ABC);
              }
              break;
            default:
              throw new antlr.NoViableAltException(this);
          }
          this.state = 433;
          this.match(PythonParser.CLOSE_BRACKET);
        }
        this.state = 435;
        this.match(PythonParser.COLON);
        this.state = 437;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 126) {
          {
            this.state = 436;
            this.commentText();
          }
        }

        this.state = 439;
        this.match(PythonParser.NL);
        this.state = 443;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (
          _la === 43 ||
          (((_la - 96) & ~0x1f) === 0 && ((1 << (_la - 96)) & 1610615809) !== 0)
        ) {
          {
            {
              this.state = 440;
              this.abstractClassMember();
            }
          }
          this.state = 445;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 446;
        this.match(PythonParser.END_CLASS);
        this.state = 448;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 108) {
          {
            this.state = 447;
            this.match(PythonParser.GHOSTED_BLOCK_END);
          }
        }

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
  public abstractClassMember(): AbstractClassMemberContext {
    let localContext = new AbstractClassMemberContext(this.context, this.state);
    this.enterRule(localContext, 30, PythonParser.RULE_abstractClassMember);
    try {
      this.state = 458;
      this.errorHandler.sync(this);
      switch (this.interpreter.adaptivePredict(this.tokenStream, 41, this.context)) {
        case 1:
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 452;
            this.property();
          }
          break;
        case 2:
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 453;
            this.functionMethod();
          }
          break;
        case 3:
          this.enterOuterAlt(localContext, 3);
          {
            this.state = 454;
            this.procedureMethod();
          }
          break;
        case 4:
          this.enterOuterAlt(localContext, 4);
          {
            this.state = 455;
            this.abstractFunction();
          }
          break;
        case 5:
          this.enterOuterAlt(localContext, 5);
          {
            this.state = 456;
            this.abstractProcedure();
          }
          break;
        case 6:
          this.enterOuterAlt(localContext, 6);
          {
            this.state = 457;
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
    this.enterRule(localContext, 32, PythonParser.RULE_comment);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 461;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 106) {
          {
            this.state = 460;
            this.match(PythonParser.GHOSTED_LINE);
          }
        }

        this.state = 463;
        this.commentText();
        this.state = 464;
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
    this.enterRule(localContext, 34, PythonParser.RULE_commentText);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 466;
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
  public statementBlock(): StatementBlockContext {
    let localContext = new StatementBlockContext(this.context, this.state);
    this.enterRule(localContext, 36, PythonParser.RULE_statementBlock);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 469;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        do {
          {
            {
              this.state = 468;
              this.selectableStatement();
            }
          }
          this.state = 471;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        } while (
          ((_la & ~0x1f) === 0 && ((1 << _la) & 3132) !== 0) ||
          (((_la - 44) & ~0x1f) === 0 && ((1 << (_la - 44)) & 1342406161) !== 0) ||
          (((_la - 76) & ~0x1f) === 0 && ((1 << (_la - 76)) & 3488612357) !== 0) ||
          _la === 126
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
    this.enterRule(localContext, 38, PythonParser.RULE_selectableStatement);
    try {
      this.state = 485;
      this.errorHandler.sync(this);
      switch (this.interpreter.adaptivePredict(this.tokenStream, 44, this.context)) {
        case 1:
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 473;
            this.variableDefinition();
          }
          break;
        case 2:
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 474;
            this.assignment();
          }
          break;
        case 3:
          this.enterOuterAlt(localContext, 3);
          {
            this.state = 475;
            this.ifStatement();
          }
          break;
        case 4:
          this.enterOuterAlt(localContext, 4);
          {
            this.state = 476;
            this.elseIfClause();
          }
          break;
        case 5:
          this.enterOuterAlt(localContext, 5);
          {
            this.state = 477;
            this.elseClause();
          }
          break;
        case 6:
          this.enterOuterAlt(localContext, 6);
          {
            this.state = 478;
            this.whileLoop();
          }
          break;
        case 7:
          this.enterOuterAlt(localContext, 7);
          {
            this.state = 479;
            this.forLoop();
          }
          break;
        case 8:
          this.enterOuterAlt(localContext, 8);
          {
            this.state = 480;
            this.procedureCall();
          }
          break;
        case 9:
          this.enterOuterAlt(localContext, 9);
          {
            this.state = 481;
            this.tryStatement();
          }
          break;
        case 10:
          this.enterOuterAlt(localContext, 10);
          {
            this.state = 482;
            this.catchClause();
          }
          break;
        case 11:
          this.enterOuterAlt(localContext, 11);
          {
            this.state = 483;
            this.throwStatement();
          }
          break;
        case 12:
          this.enterOuterAlt(localContext, 12);
          {
            this.state = 484;
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
    this.enterRule(localContext, 40, PythonParser.RULE_ordinaryStatement);
    try {
      this.state = 496;
      this.errorHandler.sync(this);
      switch (this.interpreter.adaptivePredict(this.tokenStream, 45, this.context)) {
        case 1:
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 487;
            this.variableDefinition();
          }
          break;
        case 2:
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 488;
            this.assignment();
          }
          break;
        case 3:
          this.enterOuterAlt(localContext, 3);
          {
            this.state = 489;
            this.ifStatement();
          }
          break;
        case 4:
          this.enterOuterAlt(localContext, 4);
          {
            this.state = 490;
            this.whileLoop();
          }
          break;
        case 5:
          this.enterOuterAlt(localContext, 5);
          {
            this.state = 491;
            this.forLoop();
          }
          break;
        case 6:
          this.enterOuterAlt(localContext, 6);
          {
            this.state = 492;
            this.procedureCall();
          }
          break;
        case 7:
          this.enterOuterAlt(localContext, 7);
          {
            this.state = 493;
            this.tryStatement();
          }
          break;
        case 8:
          this.enterOuterAlt(localContext, 8);
          {
            this.state = 494;
            this.throwStatement();
          }
          break;
        case 9:
          this.enterOuterAlt(localContext, 9);
          {
            this.state = 495;
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
    this.enterRule(localContext, 42, PythonParser.RULE_variableDefinition);
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
            this.match(PythonParser.GHOSTED_LINE);
          }
        }

        this.state = 501;
        this.identifierDef();
        this.state = 502;
        this.match(PythonParser.SINGLE_EQUALS);
        this.state = 503;
        this.expression(0);
        this.state = 504;
        this.match(PythonParser.VARIABLE_DEFINITION_ANNOTATION);
        this.state = 505;
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
    this.enterRule(localContext, 44, PythonParser.RULE_assignment);
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
            this.match(PythonParser.GHOSTED_LINE);
          }
        }

        this.state = 510;
        this.assignable(0);
        this.state = 511;
        this.match(PythonParser.SINGLE_EQUALS);
        this.state = 512;
        this.expression(0);
        this.state = 513;
        this.match(PythonParser.ASSIGNMENT_ANNOTATION);
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
  public ifStatement(): IfStatementContext {
    let localContext = new IfStatementContext(this.context, this.state);
    this.enterRule(localContext, 46, PythonParser.RULE_ifStatement);
    let _la: number;
    try {
      let alternative: number;
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 517;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 107) {
          {
            this.state = 516;
            this.match(PythonParser.GHOSTED_BLOCK_START);
          }
        }

        this.state = 519;
        this.match(PythonParser.IF);
        this.state = 520;
        localContext._condition = this.expression(0);
        this.state = 521;
        this.match(PythonParser.COLON);
        this.state = 523;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 126) {
          {
            this.state = 522;
            this.commentText();
          }
        }

        this.state = 525;
        this.match(PythonParser.NL);
        this.state = 526;
        this.thenClause();
        this.state = 530;
        this.errorHandler.sync(this);
        alternative = this.interpreter.adaptivePredict(this.tokenStream, 50, this.context);
        while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
          if (alternative === 1) {
            {
              {
                this.state = 527;
                this.elseIfClause();
              }
            }
          }
          this.state = 532;
          this.errorHandler.sync(this);
          alternative = this.interpreter.adaptivePredict(this.tokenStream, 50, this.context);
        }
        this.state = 534;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 3 || _la === 107) {
          {
            this.state = 533;
            this.elseClause();
          }
        }

        this.state = 536;
        this.match(PythonParser.END_IF);
        this.state = 538;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 108) {
          {
            this.state = 537;
            this.match(PythonParser.GHOSTED_BLOCK_END);
          }
        }

        this.state = 540;
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
    this.enterRule(localContext, 48, PythonParser.RULE_thenClause);
    try {
      let alternative: number;
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 545;
        this.errorHandler.sync(this);
        alternative = this.interpreter.adaptivePredict(this.tokenStream, 53, this.context);
        while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
          if (alternative === 1) {
            {
              {
                this.state = 542;
                this.ordinaryStatement();
              }
            }
          }
          this.state = 547;
          this.errorHandler.sync(this);
          alternative = this.interpreter.adaptivePredict(this.tokenStream, 53, this.context);
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
    this.enterRule(localContext, 50, PythonParser.RULE_elseIfClause);
    let _la: number;
    try {
      let alternative: number;
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 549;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 107) {
          {
            this.state = 548;
            this.match(PythonParser.GHOSTED_BLOCK_START);
          }
        }

        this.state = 551;
        this.match(PythonParser.ELIF);
        this.state = 552;
        this.expression(0);
        this.state = 553;
        this.match(PythonParser.COLON);
        this.state = 555;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 126) {
          {
            this.state = 554;
            this.commentText();
          }
        }

        this.state = 557;
        this.match(PythonParser.NL);
        this.state = 561;
        this.errorHandler.sync(this);
        alternative = this.interpreter.adaptivePredict(this.tokenStream, 56, this.context);
        while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
          if (alternative === 1) {
            {
              {
                this.state = 558;
                this.ordinaryStatement();
              }
            }
          }
          this.state = 563;
          this.errorHandler.sync(this);
          alternative = this.interpreter.adaptivePredict(this.tokenStream, 56, this.context);
        }
        this.state = 565;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 108) {
          {
            this.state = 564;
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
    this.enterRule(localContext, 52, PythonParser.RULE_elseClause);
    let _la: number;
    try {
      let alternative: number;
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 568;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 107) {
          {
            this.state = 567;
            this.match(PythonParser.GHOSTED_BLOCK_START);
          }
        }

        this.state = 570;
        this.match(PythonParser.ELSE);
        this.state = 571;
        this.match(PythonParser.COLON);
        this.state = 573;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 126) {
          {
            this.state = 572;
            this.commentText();
          }
        }

        this.state = 575;
        this.match(PythonParser.NL);
        this.state = 579;
        this.errorHandler.sync(this);
        alternative = this.interpreter.adaptivePredict(this.tokenStream, 60, this.context);
        while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
          if (alternative === 1) {
            {
              {
                this.state = 576;
                this.ordinaryStatement();
              }
            }
          }
          this.state = 581;
          this.errorHandler.sync(this);
          alternative = this.interpreter.adaptivePredict(this.tokenStream, 60, this.context);
        }
        this.state = 583;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 108) {
          {
            this.state = 582;
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
    this.enterRule(localContext, 54, PythonParser.RULE_whileLoop);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 586;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 107) {
          {
            this.state = 585;
            this.match(PythonParser.GHOSTED_BLOCK_START);
          }
        }

        this.state = 588;
        this.match(PythonParser.WHILE);
        this.state = 589;
        this.expression(0);
        this.state = 590;
        this.match(PythonParser.COLON);
        this.state = 592;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 126) {
          {
            this.state = 591;
            this.commentText();
          }
        }

        this.state = 594;
        this.match(PythonParser.NL);
        this.state = 598;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (
          ((_la & ~0x1f) === 0 && ((1 << _la) & 3120) !== 0) ||
          (((_la - 48) & ~0x1f) === 0 && ((1 << (_la - 48)) & 1426077665) !== 0) ||
          (((_la - 96) & ~0x1f) === 0 && ((1 << (_la - 96)) & 1073745151) !== 0)
        ) {
          {
            {
              this.state = 595;
              this.ordinaryStatement();
            }
          }
          this.state = 600;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 601;
        this.match(PythonParser.END_WHILE);
        this.state = 603;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 108) {
          {
            this.state = 602;
            this.match(PythonParser.GHOSTED_BLOCK_END);
          }
        }

        this.state = 605;
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
    this.enterRule(localContext, 56, PythonParser.RULE_forLoop);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 608;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 107) {
          {
            this.state = 607;
            this.match(PythonParser.GHOSTED_BLOCK_START);
          }
        }

        this.state = 610;
        this.match(PythonParser.FOR);
        this.state = 611;
        this.identifierDef();
        this.state = 612;
        this.match(PythonParser.IN);
        this.state = 613;
        this.expression(0);
        this.state = 614;
        this.match(PythonParser.COLON);
        this.state = 616;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 126) {
          {
            this.state = 615;
            this.commentText();
          }
        }

        this.state = 618;
        this.match(PythonParser.NL);
        this.state = 622;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (
          ((_la & ~0x1f) === 0 && ((1 << _la) & 3120) !== 0) ||
          (((_la - 48) & ~0x1f) === 0 && ((1 << (_la - 48)) & 1426077665) !== 0) ||
          (((_la - 96) & ~0x1f) === 0 && ((1 << (_la - 96)) & 1073745151) !== 0)
        ) {
          {
            {
              this.state = 619;
              this.ordinaryStatement();
            }
          }
          this.state = 624;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 625;
        this.match(PythonParser.END_FOR);
        this.state = 627;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 108) {
          {
            this.state = 626;
            this.match(PythonParser.GHOSTED_BLOCK_END);
          }
        }

        this.state = 629;
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
    this.enterRule(localContext, 58, PythonParser.RULE_procedureCall);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 632;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 106) {
          {
            this.state = 631;
            this.match(PythonParser.GHOSTED_LINE);
          }
        }

        this.state = 634;
        this.term(0);
        this.state = 636;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 126) {
          {
            this.state = 635;
            this.commentText();
          }
        }

        this.state = 638;
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
    this.enterRule(localContext, 60, PythonParser.RULE_tryStatement);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 641;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 107) {
          {
            this.state = 640;
            this.match(PythonParser.GHOSTED_BLOCK_START);
          }
        }

        this.state = 643;
        this.match(PythonParser.TRY);
        this.state = 644;
        this.match(PythonParser.COLON);
        this.state = 646;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 126) {
          {
            this.state = 645;
            this.commentText();
          }
        }

        this.state = 648;
        this.match(PythonParser.NL);
        this.state = 649;
        this.tryClause();
        this.state = 651;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        do {
          {
            {
              this.state = 650;
              this.catchClause();
            }
          }
          this.state = 653;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        } while (_la === 44 || _la === 107);
        this.state = 655;
        this.match(PythonParser.END_TRY);
        this.state = 657;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 108) {
          {
            this.state = 656;
            this.match(PythonParser.GHOSTED_BLOCK_END);
          }
        }

        this.state = 659;
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
    this.enterRule(localContext, 62, PythonParser.RULE_tryClause);
    try {
      let alternative: number;
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 664;
        this.errorHandler.sync(this);
        alternative = this.interpreter.adaptivePredict(this.tokenStream, 76, this.context);
        while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
          if (alternative === 1) {
            {
              {
                this.state = 661;
                this.ordinaryStatement();
              }
            }
          }
          this.state = 666;
          this.errorHandler.sync(this);
          alternative = this.interpreter.adaptivePredict(this.tokenStream, 76, this.context);
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
    this.enterRule(localContext, 64, PythonParser.RULE_catchClause);
    let _la: number;
    try {
      let alternative: number;
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 668;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 107) {
          {
            this.state = 667;
            this.match(PythonParser.GHOSTED_BLOCK_START);
          }
        }

        this.state = 670;
        this.match(PythonParser.EXCEPT);
        this.state = 671;
        this.typeName();
        this.state = 672;
        this.match(PythonParser.AS);
        this.state = 673;
        this.identifierDef();
        this.state = 674;
        this.match(PythonParser.COLON);
        this.state = 676;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 126) {
          {
            this.state = 675;
            this.commentText();
          }
        }

        this.state = 678;
        this.match(PythonParser.NL);
        this.state = 682;
        this.errorHandler.sync(this);
        alternative = this.interpreter.adaptivePredict(this.tokenStream, 79, this.context);
        while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
          if (alternative === 1) {
            {
              {
                this.state = 679;
                this.ordinaryStatement();
              }
            }
          }
          this.state = 684;
          this.errorHandler.sync(this);
          alternative = this.interpreter.adaptivePredict(this.tokenStream, 79, this.context);
        }
        this.state = 686;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 108) {
          {
            this.state = 685;
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
    this.enterRule(localContext, 66, PythonParser.RULE_throwStatement);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 689;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 106) {
          {
            this.state = 688;
            this.match(PythonParser.GHOSTED_LINE);
          }
        }

        this.state = 691;
        this.match(PythonParser.RAISE);
        this.state = 692;
        this.typeName();
        this.state = 693;
        this.match(PythonParser.OPEN_BRACKET);
        this.state = 694;
        this.errorMessage();
        this.state = 695;
        this.match(PythonParser.CLOSE_BRACKET);
        this.state = 697;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 126) {
          {
            this.state = 696;
            this.commentText();
          }
        }

        this.state = 699;
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
    this.enterRule(localContext, 68, PythonParser.RULE_errorMessage);
    try {
      this.state = 703;
      this.errorHandler.sync(this);
      switch (this.tokenStream.LA(1)) {
        case PythonParser.LITERAL_STRING:
        case PythonParser.INTERPOLATED_STRING:
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 701;
            this.litString();
          }
          break;
        case PythonParser.NAME_STARTING_LC:
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 702;
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
    this.enterRule(localContext, 70, PythonParser.RULE_assert);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 706;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 106) {
          {
            this.state = 705;
            this.match(PythonParser.GHOSTED_LINE);
          }
        }

        this.state = 708;
        this.match(PythonParser.THIS_INSTANCE);
        this.state = 709;
        this.match(PythonParser.DOT);
        this.state = 710;
        this.match(PythonParser.ASSERT_EQUAL);
        this.state = 711;
        this.match(PythonParser.OPEN_BRACKET);
        this.state = 712;
        this.assertActual();
        this.state = 713;
        this.match(PythonParser.COMMA);
        this.state = 714;
        this.assertExpected();
        this.state = 715;
        this.match(PythonParser.CLOSE_BRACKET);
        this.state = 717;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 126) {
          {
            this.state = 716;
            this.commentText();
          }
        }

        this.state = 719;
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
    this.enterRule(localContext, 72, PythonParser.RULE_returnStatement);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 721;
        this.match(PythonParser.RETURN);
        this.state = 722;
        this.expression(0);
        this.state = 724;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 126) {
          {
            this.state = 723;
            this.commentText();
          }
        }

        this.state = 726;
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
  public memberBlock(): MemberBlockContext {
    let localContext = new MemberBlockContext(this.context, this.state);
    this.enterRule(localContext, 74, PythonParser.RULE_memberBlock);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 729;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        do {
          {
            {
              this.state = 728;
              this.selectableMember();
            }
          }
          this.state = 731;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        } while (
          _la === 43 ||
          (((_la - 96) & ~0x1f) === 0 && ((1 << (_la - 96)) & 536873985) !== 0)
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
    this.enterRule(localContext, 76, PythonParser.RULE_selectableMember);
    try {
      this.state = 738;
      this.errorHandler.sync(this);
      switch (this.interpreter.adaptivePredict(this.tokenStream, 88, this.context)) {
        case 1:
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 733;
            this.property();
          }
          break;
        case 2:
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 734;
            this.functionMethod();
          }
          break;
        case 3:
          this.enterOuterAlt(localContext, 3);
          {
            this.state = 735;
            this.procedureMethod();
          }
          break;
        case 4:
          this.enterOuterAlt(localContext, 4);
          {
            this.state = 736;
            this.abstractFunction();
          }
          break;
        case 5:
          this.enterOuterAlt(localContext, 5);
          {
            this.state = 737;
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
    this.enterRule(localContext, 78, PythonParser.RULE_constructorMember);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 741;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 107) {
          {
            this.state = 740;
            this.match(PythonParser.GHOSTED_BLOCK_START);
          }
        }

        this.state = 743;
        this.match(PythonParser.DEF);
        this.state = 744;
        this.match(PythonParser.INIT);
        this.state = 745;
        this.match(PythonParser.OPEN_BRACKET);
        this.state = 747;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 72 || _la === 96) {
          {
            this.state = 746;
            this.paramList();
          }
        }

        this.state = 749;
        this.match(PythonParser.CLOSE_BRACKET);
        this.state = 750;
        this.match(PythonParser.ARROW);
        this.state = 751;
        this.match(PythonParser.NONE);
        this.state = 752;
        this.match(PythonParser.COLON);
        this.state = 754;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 126) {
          {
            this.state = 753;
            this.commentText();
          }
        }

        this.state = 757;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 108) {
          {
            this.state = 756;
            this.match(PythonParser.GHOSTED_BLOCK_END);
          }
        }

        this.state = 759;
        this.match(PythonParser.NL);
        this.state = 763;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (
          ((_la & ~0x1f) === 0 && ((1 << _la) & 3120) !== 0) ||
          (((_la - 48) & ~0x1f) === 0 && ((1 << (_la - 48)) & 1426077665) !== 0) ||
          (((_la - 96) & ~0x1f) === 0 && ((1 << (_la - 96)) & 1073745151) !== 0)
        ) {
          {
            {
              this.state = 760;
              this.ordinaryStatement();
            }
          }
          this.state = 765;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 766;
        this.match(PythonParser.END_CONSTRUCTOR);
        this.state = 767;
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
    this.enterRule(localContext, 80, PythonParser.RULE_property);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 770;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 106) {
          {
            this.state = 769;
            this.match(PythonParser.GHOSTED_LINE);
          }
        }

        this.state = 772;
        this.identifierDef();
        this.state = 773;
        this.match(PythonParser.COLON);
        this.state = 774;
        this.type_();
        this.state = 776;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 126) {
          {
            this.state = 775;
            this.commentText();
          }
        }

        this.state = 778;
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
    this.enterRule(localContext, 82, PythonParser.RULE_functionMethod);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 781;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 107) {
          {
            this.state = 780;
            this.match(PythonParser.GHOSTED_BLOCK_START);
          }
        }

        this.state = 783;
        this.match(PythonParser.DEF);
        this.state = 784;
        this.methodName();
        this.state = 785;
        this.match(PythonParser.OPEN_BRACKET);
        this.state = 787;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 72 || _la === 96) {
          {
            this.state = 786;
            this.paramList();
          }
        }

        this.state = 789;
        this.match(PythonParser.CLOSE_BRACKET);
        this.state = 790;
        this.match(PythonParser.ARROW);
        this.state = 791;
        this.type_();
        this.state = 792;
        this.match(PythonParser.COLON);
        this.state = 794;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 126) {
          {
            this.state = 793;
            this.commentText();
          }
        }

        this.state = 796;
        this.match(PythonParser.NL);
        this.state = 800;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (
          ((_la & ~0x1f) === 0 && ((1 << _la) & 3120) !== 0) ||
          (((_la - 48) & ~0x1f) === 0 && ((1 << (_la - 48)) & 1426077665) !== 0) ||
          (((_la - 96) & ~0x1f) === 0 && ((1 << (_la - 96)) & 1073745151) !== 0)
        ) {
          {
            {
              this.state = 797;
              this.ordinaryStatement();
            }
          }
          this.state = 802;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 803;
        this.returnStatement();
        this.state = 804;
        this.match(PythonParser.END_FUNCTION);
        this.state = 806;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 108) {
          {
            this.state = 805;
            this.match(PythonParser.GHOSTED_BLOCK_END);
          }
        }

        this.state = 808;
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
    this.enterRule(localContext, 84, PythonParser.RULE_procedureMethod);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 811;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 107) {
          {
            this.state = 810;
            this.match(PythonParser.GHOSTED_BLOCK_START);
          }
        }

        this.state = 813;
        this.match(PythonParser.DEF);
        this.state = 814;
        this.methodName();
        this.state = 815;
        this.match(PythonParser.OPEN_BRACKET);
        this.state = 817;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 72 || _la === 96) {
          {
            this.state = 816;
            this.paramList();
          }
        }

        this.state = 819;
        this.match(PythonParser.CLOSE_BRACKET);
        this.state = 820;
        this.match(PythonParser.ARROW);
        this.state = 821;
        this.match(PythonParser.NONE);
        this.state = 822;
        this.match(PythonParser.COLON);
        this.state = 824;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 126) {
          {
            this.state = 823;
            this.commentText();
          }
        }

        this.state = 826;
        this.match(PythonParser.NL);
        this.state = 830;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (
          ((_la & ~0x1f) === 0 && ((1 << _la) & 3120) !== 0) ||
          (((_la - 48) & ~0x1f) === 0 && ((1 << (_la - 48)) & 1426077665) !== 0) ||
          (((_la - 96) & ~0x1f) === 0 && ((1 << (_la - 96)) & 1073745151) !== 0)
        ) {
          {
            {
              this.state = 827;
              this.ordinaryStatement();
            }
          }
          this.state = 832;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 833;
        this.match(PythonParser.END_PROCEDURE);
        this.state = 835;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 108) {
          {
            this.state = 834;
            this.match(PythonParser.GHOSTED_BLOCK_END);
          }
        }

        this.state = 837;
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
    this.enterRule(localContext, 86, PythonParser.RULE_abstractFunction);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 840;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 106) {
          {
            this.state = 839;
            this.match(PythonParser.GHOSTED_LINE);
          }
        }

        this.state = 842;
        this.match(PythonParser.ABSTRACT_METHOD);
        this.state = 843;
        this.match(PythonParser.NL);
        this.state = 844;
        this.match(PythonParser.DEF);
        this.state = 845;
        this.methodName();
        this.state = 846;
        this.match(PythonParser.OPEN_BRACKET);
        this.state = 848;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 72 || _la === 96) {
          {
            this.state = 847;
            this.paramList();
          }
        }

        this.state = 850;
        this.match(PythonParser.CLOSE_BRACKET);
        this.state = 851;
        this.match(PythonParser.ARROW);
        this.state = 852;
        this.type_();
        this.state = 853;
        this.match(PythonParser.COLON);
        this.state = 854;
        this.match(PythonParser.NL);
        this.state = 855;
        this.match(PythonParser.PASS);
        this.state = 857;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 126) {
          {
            this.state = 856;
            this.commentText();
          }
        }

        this.state = 859;
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
    this.enterRule(localContext, 88, PythonParser.RULE_abstractProcedure);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 862;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 106) {
          {
            this.state = 861;
            this.match(PythonParser.GHOSTED_LINE);
          }
        }

        this.state = 864;
        this.match(PythonParser.ABSTRACT_METHOD);
        this.state = 865;
        this.match(PythonParser.NL);
        this.state = 866;
        this.match(PythonParser.DEF);
        this.state = 867;
        this.methodName();
        this.state = 868;
        this.match(PythonParser.OPEN_BRACKET);
        this.state = 870;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 72 || _la === 96) {
          {
            this.state = 869;
            this.paramList();
          }
        }

        this.state = 872;
        this.match(PythonParser.CLOSE_BRACKET);
        this.state = 873;
        this.match(PythonParser.ARROW);
        this.state = 874;
        this.match(PythonParser.NONE);
        this.state = 875;
        this.match(PythonParser.COLON);
        this.state = 876;
        this.match(PythonParser.NL);
        this.state = 877;
        this.match(PythonParser.PASS);
        this.state = 879;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 126) {
          {
            this.state = 878;
            this.commentText();
          }
        }

        this.state = 881;
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
    this.enterRule(localContext, 90, PythonParser.RULE_identifierDef);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 883;
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
    this.enterRule(localContext, 92, PythonParser.RULE_identifierUse);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 885;
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
    let _startState = 94;
    this.enterRecursionRule(localContext, 94, PythonParser.RULE_assignable, _p);
    try {
      let alternative: number;
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 892;
        this.errorHandler.sync(this);
        switch (this.tokenStream.LA(1)) {
          case PythonParser.NAME_STARTING_LC:
            {
              localContext = new SimpleAssignableContext(localContext);
              this.context = localContext;
              previousContext = localContext;

              this.state = 888;
              this.identifierUse();
            }
            break;
          case PythonParser.THIS_INSTANCE:
            {
              localContext = new ThisAssignableContext(localContext);
              this.context = localContext;
              previousContext = localContext;
              this.state = 889;
              this.match(PythonParser.THIS_INSTANCE);
              this.state = 890;
              this.match(PythonParser.DOT);
              this.state = 891;
              this.identifierUse();
            }
            break;
          default:
            throw new antlr.NoViableAltException(this);
        }
        this.context!.stop = this.tokenStream.LT(-1);
        this.state = 898;
        this.errorHandler.sync(this);
        alternative = this.interpreter.adaptivePredict(this.tokenStream, 113, this.context);
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
                this.state = 894;
                if (!this.precpred(this.context, 1)) {
                  throw this.createFailedPredicateException("this.precpred(this.context, 1)");
                }
                this.state = 895;
                this.index();
              }
            }
          }
          this.state = 900;
          this.errorHandler.sync(this);
          alternative = this.interpreter.adaptivePredict(this.tokenStream, 113, this.context);
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
    this.enterRule(localContext, 96, PythonParser.RULE_methodName);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 901;
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
    this.enterRule(localContext, 98, PythonParser.RULE_testName);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 903;
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
    this.enterRule(localContext, 100, PythonParser.RULE_testClassName);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 905;
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
    this.enterRule(localContext, 102, PythonParser.RULE_typeName);
    try {
      this.state = 914;
      this.errorHandler.sync(this);
      switch (this.tokenStream.LA(1)) {
        case PythonParser.INT_NAME:
          localContext = new IntTypeNameContext(localContext);
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 907;
            this.match(PythonParser.INT_NAME);
          }
          break;
        case PythonParser.FLOAT_NAME:
          localContext = new FloatTypeNameContext(localContext);
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 908;
            this.match(PythonParser.FLOAT_NAME);
          }
          break;
        case PythonParser.BOOL_NAME:
          localContext = new BoolTypeNameContext(localContext);
          this.enterOuterAlt(localContext, 3);
          {
            this.state = 909;
            this.match(PythonParser.BOOL_NAME);
          }
          break;
        case PythonParser.STRING_NAME:
          localContext = new StringTypeNameContext(localContext);
          this.enterOuterAlt(localContext, 4);
          {
            this.state = 910;
            this.match(PythonParser.STRING_NAME);
          }
          break;
        case PythonParser.LIST_NAME:
          localContext = new ListTypeNameContext(localContext);
          this.enterOuterAlt(localContext, 5);
          {
            this.state = 911;
            this.match(PythonParser.LIST_NAME);
          }
          break;
        case PythonParser.DICT_NAME:
          localContext = new DictTypeNameContext(localContext);
          this.enterOuterAlt(localContext, 6);
          {
            this.state = 912;
            this.match(PythonParser.DICT_NAME);
          }
          break;
        case PythonParser.NAME_STARTING_UC:
          localContext = new UdtTypeNameContext(localContext);
          this.enterOuterAlt(localContext, 7);
          {
            this.state = 913;
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
    this.enterRule(localContext, 104, PythonParser.RULE_constantValue);
    try {
      this.state = 920;
      this.errorHandler.sync(this);
      switch (this.tokenStream.LA(1)) {
        case PythonParser.TRUE:
        case PythonParser.FALSE:
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 916;
            this.litBoolean();
          }
          break;
        case PythonParser.LITERAL_BINARY:
        case PythonParser.LITERAL_HEX:
        case PythonParser.LITERAL_INTEGER:
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 917;
            this.litInt();
          }
          break;
        case PythonParser.LITERAL_FLOAT:
          this.enterOuterAlt(localContext, 3);
          {
            this.state = 918;
            this.litFloat();
          }
          break;
        case PythonParser.LITERAL_STRING:
        case PythonParser.INTERPOLATED_STRING:
          this.enterOuterAlt(localContext, 4);
          {
            this.state = 919;
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
    this.enterRule(localContext, 106, PythonParser.RULE_argList);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 922;
        this.argument();
        this.state = 927;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (_la === 81) {
          {
            {
              this.state = 923;
              this.match(PythonParser.COMMA);
              this.state = 924;
              this.argument();
            }
          }
          this.state = 929;
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
    this.enterRule(localContext, 108, PythonParser.RULE_argument);
    try {
      this.state = 932;
      this.errorHandler.sync(this);
      switch (this.tokenStream.LA(1)) {
        case PythonParser.LAMBDA:
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 930;
            this.lambda();
          }
          break;
        case PythonParser.TUPLE:
        case PythonParser.INT_NAME:
        case PythonParser.FLOAT_NAME:
        case PythonParser.BOOL_NAME:
        case PythonParser.STRING_NAME:
        case PythonParser.LIST_NAME:
        case PythonParser.DICT_NAME:
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
            this.state = 931;
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
    this.enterRule(localContext, 110, PythonParser.RULE_paramList);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 934;
        this.paramDef();
        this.state = 939;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (_la === 81) {
          {
            {
              this.state = 935;
              this.match(PythonParser.COMMA);
              this.state = 936;
              this.paramDef();
            }
          }
          this.state = 941;
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
    this.enterRule(localContext, 112, PythonParser.RULE_identifierList);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 942;
        this.identifierDef();
        this.state = 945;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        do {
          {
            {
              this.state = 943;
              this.match(PythonParser.COMMA);
              this.state = 944;
              this.identifierDef();
            }
          }
          this.state = 947;
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
    this.enterRule(localContext, 114, PythonParser.RULE_expressionList);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 949;
        this.expression(0);
        this.state = 954;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (_la === 81) {
          {
            {
              this.state = 950;
              this.match(PythonParser.COMMA);
              this.state = 951;
              this.expression(0);
            }
          }
          this.state = 956;
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
    this.enterRule(localContext, 116, PythonParser.RULE_enumDefValue);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 957;
        this.identifierDef();
        this.state = 958;
        this.match(PythonParser.SINGLE_EQUALS);
        this.state = 959;
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
    this.enterRule(localContext, 118, PythonParser.RULE_enumList);
    try {
      let alternative: number;
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 961;
        this.enumDefValue();
        this.state = 966;
        this.errorHandler.sync(this);
        alternative = this.interpreter.adaptivePredict(this.tokenStream, 121, this.context);
        while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
          if (alternative === 1) {
            {
              {
                this.state = 962;
                this.match(PythonParser.NL);
                this.state = 963;
                this.enumDefValue();
              }
            }
          }
          this.state = 968;
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
      this.exitRule();
    }
    return localContext;
  }
  public type_(): TypeContext {
    let localContext = new TypeContext(this.context, this.state);
    this.enterRule(localContext, 120, PythonParser.RULE_type);
    try {
      this.state = 973;
      this.errorHandler.sync(this);
      switch (this.interpreter.adaptivePredict(this.tokenStream, 122, this.context)) {
        case 1:
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 969;
            this.typeTuple();
          }
          break;
        case 2:
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 970;
            this.typeName();
          }
          break;
        case 3:
          this.enterOuterAlt(localContext, 3);
          {
            this.state = 971;
            this.typeGeneric();
          }
          break;
        case 4:
          this.enterOuterAlt(localContext, 4);
          {
            this.state = 972;
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
    this.enterRule(localContext, 122, PythonParser.RULE_assertActual);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 975;
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
    this.enterRule(localContext, 124, PythonParser.RULE_assertExpected);
    try {
      this.state = 982;
      this.errorHandler.sync(this);
      switch (this.tokenStream.LA(1)) {
        case PythonParser.INT_NAME:
        case PythonParser.FLOAT_NAME:
        case PythonParser.BOOL_NAME:
        case PythonParser.STRING_NAME:
        case PythonParser.LIST_NAME:
        case PythonParser.DICT_NAME:
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
            this.state = 977;
            this.litValue();
          }
          break;
        case PythonParser.OPEN_SQ_BRACKET:
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 978;
            this.list();
          }
          break;
        case PythonParser.OPEN_BRACE:
          this.enterOuterAlt(localContext, 3);
          {
            this.state = 979;
            this.dictionary();
          }
          break;
        case PythonParser.NOT:
        case PythonParser.MINUS:
          this.enterOuterAlt(localContext, 4);
          {
            this.state = 980;
            this.unaryExpression();
          }
          break;
        case PythonParser.OPEN_BRACKET:
          this.enterOuterAlt(localContext, 5);
          {
            this.state = 981;
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
    this.enterRule(localContext, 126, PythonParser.RULE_litValue);
    try {
      this.state = 990;
      this.errorHandler.sync(this);
      switch (this.interpreter.adaptivePredict(this.tokenStream, 124, this.context)) {
        case 1:
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 984;
            this.litBoolean();
          }
          break;
        case 2:
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 985;
            this.litInt();
          }
          break;
        case 3:
          this.enterOuterAlt(localContext, 3);
          {
            this.state = 986;
            this.litFloat();
          }
          break;
        case 4:
          this.enterOuterAlt(localContext, 4);
          {
            this.state = 987;
            this.litString();
          }
          break;
        case 5:
          this.enterOuterAlt(localContext, 5);
          {
            this.state = 988;
            this.interpolatedString();
          }
          break;
        case 6:
          this.enterOuterAlt(localContext, 6);
          {
            this.state = 989;
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
    this.enterRule(localContext, 128, PythonParser.RULE_litBoolean);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 992;
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
    this.enterRule(localContext, 130, PythonParser.RULE_litInt);
    try {
      this.state = 997;
      this.errorHandler.sync(this);
      switch (this.tokenStream.LA(1)) {
        case PythonParser.LITERAL_INTEGER:
          localContext = new LitIntegerContext(localContext);
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 994;
            this.match(PythonParser.LITERAL_INTEGER);
          }
          break;
        case PythonParser.LITERAL_BINARY:
          localContext = new LitBinaryContext(localContext);
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 995;
            this.match(PythonParser.LITERAL_BINARY);
          }
          break;
        case PythonParser.LITERAL_HEX:
          localContext = new LitHexContext(localContext);
          this.enterOuterAlt(localContext, 3);
          {
            this.state = 996;
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
    this.enterRule(localContext, 132, PythonParser.RULE_litFloat);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 999;
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
    this.enterRule(localContext, 134, PythonParser.RULE_litString);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 1001;
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
    this.enterRule(localContext, 136, PythonParser.RULE_enumValue);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 1003;
        this.typeName();
        this.state = 1004;
        this.match(PythonParser.DOT);
        this.state = 1005;
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
    this.enterRule(localContext, 138, PythonParser.RULE_index);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 1007;
        this.match(PythonParser.OPEN_SQ_BRACKET);
        this.state = 1008;
        this.expression(0);
        this.state = 1009;
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
    let _startState = 140;
    this.enterRecursionRule(localContext, 140, PythonParser.RULE_expression, _p);
    let _la: number;
    try {
      let alternative: number;
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 1016;
        this.errorHandler.sync(this);
        switch (this.interpreter.adaptivePredict(this.tokenStream, 126, this.context)) {
          case 1:
            {
              localContext = new NewInstanceExpressionContext(localContext);
              this.context = localContext;
              previousContext = localContext;

              this.state = 1012;
              this.newInstance();
            }
            break;
          case 2:
            {
              localContext = new UnaryExpressionLabelContext(localContext);
              this.context = localContext;
              previousContext = localContext;
              this.state = 1013;
              this.unaryExpression();
            }
            break;
          case 3:
            {
              localContext = new TermExpressionContext(localContext);
              this.context = localContext;
              previousContext = localContext;
              this.state = 1014;
              this.term(0);
            }
            break;
          case 4:
            {
              localContext = new BinaryExpressionLabelContext(localContext);
              this.context = localContext;
              previousContext = localContext;
              this.state = 1015;
              this.binaryExpression();
            }
            break;
        }
        this.context!.stop = this.tokenStream.LT(-1);
        this.state = 1033;
        this.errorHandler.sync(this);
        alternative = this.interpreter.adaptivePredict(this.tokenStream, 128, this.context);
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
                this.state = 1018;
                if (!this.precpred(this.context, 1)) {
                  throw this.createFailedPredicateException("this.precpred(this.context, 1)");
                }
                this.state = 1019;
                this.match(PythonParser.IF);
                this.state = 1020;
                (localContext as IfExpressionContext)._condition = this.expression(0);
                this.state = 1025;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 2) {
                  {
                    {
                      this.state = 1021;
                      this.match(PythonParser.ELIF);
                      this.state = 1022;
                      (localContext as IfExpressionContext)._elifCondition = this.expression(0);
                    }
                  }
                  this.state = 1027;
                  this.errorHandler.sync(this);
                  _la = this.tokenStream.LA(1);
                }
                this.state = 1028;
                this.match(PythonParser.ELSE);
                this.state = 1029;
                (localContext as IfExpressionContext)._falseExpr = this.expression(2);
              }
            }
          }
          this.state = 1035;
          this.errorHandler.sync(this);
          alternative = this.interpreter.adaptivePredict(this.tokenStream, 128, this.context);
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
    let _startState = 142;
    this.enterRecursionRule(localContext, 142, PythonParser.RULE_term, _p);
    try {
      let alternative: number;
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 1045;
        this.errorHandler.sync(this);
        switch (this.interpreter.adaptivePredict(this.tokenStream, 129, this.context)) {
          case 1:
            {
              localContext = new ThisInstanceTermContext(localContext);
              this.context = localContext;
              previousContext = localContext;

              this.state = 1037;
              this.thisInstance();
            }
            break;
          case 2:
            {
              localContext = new BracketedExpressionTermContext(localContext);
              this.context = localContext;
              previousContext = localContext;
              this.state = 1038;
              this.bracketedExpression();
            }
            break;
          case 3:
            {
              localContext = new LitValueTermContext(localContext);
              this.context = localContext;
              previousContext = localContext;
              this.state = 1039;
              this.litValue();
            }
            break;
          case 4:
            {
              localContext = new ListTermContext(localContext);
              this.context = localContext;
              previousContext = localContext;
              this.state = 1040;
              this.list();
            }
            break;
          case 5:
            {
              localContext = new DictionaryTermContext(localContext);
              this.context = localContext;
              previousContext = localContext;
              this.state = 1041;
              this.dictionary();
            }
            break;
          case 6:
            {
              localContext = new TupleTermContext(localContext);
              this.context = localContext;
              previousContext = localContext;
              this.state = 1042;
              this.tuple();
            }
            break;
          case 7:
            {
              localContext = new IdentifierUseTermContext(localContext);
              this.context = localContext;
              previousContext = localContext;
              this.state = 1043;
              this.identifierUse();
            }
            break;
          case 8:
            {
              localContext = new MethodCallTermContext(localContext);
              this.context = localContext;
              previousContext = localContext;
              this.state = 1044;
              this.methodCall();
            }
            break;
        }
        this.context!.stop = this.tokenStream.LT(-1);
        this.state = 1054;
        this.errorHandler.sync(this);
        alternative = this.interpreter.adaptivePredict(this.tokenStream, 131, this.context);
        while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
          if (alternative === 1) {
            if (this.parseListeners != null) {
              this.triggerExitRuleEvent();
            }
            previousContext = localContext;
            {
              this.state = 1052;
              this.errorHandler.sync(this);
              switch (this.interpreter.adaptivePredict(this.tokenStream, 130, this.context)) {
                case 1:
                  {
                    localContext = new IndexedTermContext(
                      new TermContext(parentContext, parentState),
                    );
                    this.pushNewRecursionContext(localContext, _startState, PythonParser.RULE_term);
                    this.state = 1047;
                    if (!this.precpred(this.context, 2)) {
                      throw this.createFailedPredicateException("this.precpred(this.context, 2)");
                    }
                    this.state = 1048;
                    this.index();
                  }
                  break;
                case 2:
                  {
                    localContext = new ChainableTermContext(
                      new TermContext(parentContext, parentState),
                    );
                    this.pushNewRecursionContext(localContext, _startState, PythonParser.RULE_term);
                    this.state = 1049;
                    if (!this.precpred(this.context, 1)) {
                      throw this.createFailedPredicateException("this.precpred(this.context, 1)");
                    }
                    this.state = 1050;
                    this.match(PythonParser.DOT);
                    this.state = 1051;
                    this.chainable();
                  }
                  break;
              }
            }
          }
          this.state = 1056;
          this.errorHandler.sync(this);
          alternative = this.interpreter.adaptivePredict(this.tokenStream, 131, this.context);
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
    this.enterRule(localContext, 144, PythonParser.RULE_chainable);
    try {
      this.state = 1059;
      this.errorHandler.sync(this);
      switch (this.interpreter.adaptivePredict(this.tokenStream, 132, this.context)) {
        case 1:
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 1057;
            this.identifierUse();
          }
          break;
        case 2:
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 1058;
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
    this.enterRule(localContext, 146, PythonParser.RULE_thisInstance);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 1061;
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
    this.enterRule(localContext, 148, PythonParser.RULE_bracketedExpression);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 1063;
        this.match(PythonParser.OPEN_BRACKET);
        this.state = 1064;
        this.expression(0);
        this.state = 1065;
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
    this.enterRule(localContext, 150, PythonParser.RULE_unaryExpression);
    try {
      this.state = 1069;
      this.errorHandler.sync(this);
      switch (this.tokenStream.LA(1)) {
        case PythonParser.MINUS:
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 1067;
            this.negateNumeric();
          }
          break;
        case PythonParser.NOT:
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 1068;
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
    this.enterRule(localContext, 152, PythonParser.RULE_negateNumeric);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 1071;
        this.match(PythonParser.MINUS);
        this.state = 1072;
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
    this.enterRule(localContext, 154, PythonParser.RULE_negateLogical);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 1074;
        this.match(PythonParser.NOT);
        this.state = 1075;
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
    this.enterRule(localContext, 156, PythonParser.RULE_binaryExpression);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 1077;
        localContext._left = this.term(0);
        this.state = 1078;
        this.binaryOperator();
        this.state = 1079;
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
    this.enterRule(localContext, 158, PythonParser.RULE_list);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 1081;
        this.match(PythonParser.OPEN_SQ_BRACKET);
        this.state = 1082;
        this.expressionList();
        this.state = 1083;
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
    this.enterRule(localContext, 160, PythonParser.RULE_tuple);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 1085;
        this.match(PythonParser.OPEN_BRACKET);
        this.state = 1086;
        this.expressionList();
        this.state = 1087;
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
    this.enterRule(localContext, 162, PythonParser.RULE_dictionary);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 1089;
        this.match(PythonParser.OPEN_BRACE);
        this.state = 1090;
        this.kvpList();
        this.state = 1091;
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
    this.enterRule(localContext, 164, PythonParser.RULE_kvpList);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 1093;
        this.kvp();
        this.state = 1098;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (_la === 81) {
          {
            {
              this.state = 1094;
              this.match(PythonParser.COMMA);
              this.state = 1095;
              this.kvp();
            }
          }
          this.state = 1100;
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
    this.enterRule(localContext, 166, PythonParser.RULE_kvp);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 1101;
        localContext._key = this.expression(0);
        this.state = 1102;
        this.match(PythonParser.COLON);
        this.state = 1103;
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
    this.enterRule(localContext, 168, PythonParser.RULE_methodCall);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 1105;
        this.methodName();
        this.state = 1106;
        this.match(PythonParser.OPEN_BRACKET);
        this.state = 1108;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (
          _la === 7 ||
          (((_la - 52) & ~0x1f) === 0 && ((1 << (_la - 52)) & 89134079) !== 0) ||
          (((_la - 84) & ~0x1f) === 0 && ((1 << (_la - 84)) & 1044481) !== 0)
        ) {
          {
            this.state = 1107;
            this.argList();
          }
        }

        this.state = 1110;
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
    this.enterRule(localContext, 170, PythonParser.RULE_binaryOperator);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 1112;
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
    this.enterRule(localContext, 172, PythonParser.RULE_newInstance);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 1114;
        this.type_();
        this.state = 1115;
        this.match(PythonParser.OPEN_BRACKET);
        this.state = 1117;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (
          _la === 7 ||
          (((_la - 52) & ~0x1f) === 0 && ((1 << (_la - 52)) & 89134079) !== 0) ||
          (((_la - 84) & ~0x1f) === 0 && ((1 << (_la - 84)) & 1044481) !== 0)
        ) {
          {
            this.state = 1116;
            this.argList();
          }
        }

        this.state = 1119;
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
    this.enterRule(localContext, 174, PythonParser.RULE_paramDef);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 1123;
        this.errorHandler.sync(this);
        switch (this.tokenStream.LA(1)) {
          case PythonParser.NAME_STARTING_LC:
            {
              this.state = 1121;
              this.identifierDef();
            }
            break;
          case PythonParser.THIS_INSTANCE:
            {
              this.state = 1122;
              this.match(PythonParser.THIS_INSTANCE);
            }
            break;
          default:
            throw new antlr.NoViableAltException(this);
        }
        this.state = 1125;
        this.match(PythonParser.COLON);
        this.state = 1126;
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
    this.enterRule(localContext, 176, PythonParser.RULE_typeGeneric);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 1128;
        this.typeName();
        this.state = 1129;
        this.match(PythonParser.OPEN_SQ_BRACKET);
        this.state = 1130;
        this.type_();
        this.state = 1135;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (_la === 81) {
          {
            {
              this.state = 1131;
              this.match(PythonParser.COMMA);
              this.state = 1132;
              this.type_();
            }
          }
          this.state = 1137;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 1138;
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
    this.enterRule(localContext, 178, PythonParser.RULE_typeFunc);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 1140;
        this.match(PythonParser.FUNC_NAME);
        this.state = 1141;
        this.match(PythonParser.OPEN_SQ_BRACKET);
        this.state = 1142;
        this.match(PythonParser.OPEN_SQ_BRACKET);
        this.state = 1143;
        this.type_();
        this.state = 1148;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (_la === 81) {
          {
            {
              this.state = 1144;
              this.match(PythonParser.COMMA);
              this.state = 1145;
              this.type_();
            }
          }
          this.state = 1150;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 1151;
        this.match(PythonParser.CLOSE_SQ_BRACKET);
        this.state = 1152;
        this.match(PythonParser.COMMA);
        this.state = 1153;
        this.type_();
        this.state = 1154;
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
    this.enterRule(localContext, 180, PythonParser.RULE_typeTuple);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 1156;
        this.match(PythonParser.TUPLE);
        this.state = 1157;
        this.match(PythonParser.OPEN_SQ_BRACKET);
        this.state = 1158;
        this.type_();
        this.state = 1161;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        do {
          {
            {
              this.state = 1159;
              this.match(PythonParser.COMMA);
              this.state = 1160;
              this.type_();
            }
          }
          this.state = 1163;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        } while (_la === 81);
        this.state = 1165;
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
    this.enterRule(localContext, 182, PythonParser.RULE_lambda);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 1167;
        this.match(PythonParser.LAMBDA);
        this.state = 1168;
        this.paramList();
        this.state = 1169;
        this.match(PythonParser.COLON);
        this.state = 1170;
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
    this.enterRule(localContext, 184, PythonParser.RULE_interpolatedString);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 1172;
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
      case 47:
        return this.assignable_sempred(localContext as AssignableContext, predIndex);
      case 70:
        return this.expression_sempred(localContext as ExpressionContext, predIndex);
      case 71:
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
    4, 1, 126, 1175, 2, 0, 7, 0, 2, 1, 7, 1, 2, 2, 7, 2, 2, 3, 7, 3, 2, 4, 7, 4, 2, 5, 7, 5, 2, 6,
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
    2, 88, 7, 88, 2, 89, 7, 89, 2, 90, 7, 90, 2, 91, 7, 91, 2, 92, 7, 92, 1, 0, 3, 0, 188, 8, 0, 1,
    0, 5, 0, 191, 8, 0, 10, 0, 12, 0, 194, 9, 0, 1, 0, 3, 0, 197, 8, 0, 1, 0, 5, 0, 200, 8, 0, 10,
    0, 12, 0, 203, 9, 0, 1, 0, 1, 0, 1, 1, 4, 1, 208, 8, 1, 11, 1, 12, 1, 209, 1, 2, 1, 2, 1, 2, 1,
    2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 3, 2, 221, 8, 2, 1, 3, 3, 3, 224, 8, 3, 1, 3, 1, 3, 1, 3, 1, 3,
    1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 5, 3, 235, 8, 3, 10, 3, 12, 3, 238, 9, 3, 1, 3, 1, 3, 3, 3, 242,
    8, 3, 1, 3, 1, 3, 1, 4, 1, 4, 1, 4, 1, 4, 1, 5, 3, 5, 251, 8, 5, 1, 5, 1, 5, 1, 5, 1, 5, 3, 5,
    257, 8, 5, 1, 5, 1, 5, 1, 5, 1, 5, 1, 5, 3, 5, 264, 8, 5, 1, 5, 1, 5, 5, 5, 268, 8, 5, 10, 5,
    12, 5, 271, 9, 5, 1, 5, 1, 5, 1, 5, 3, 5, 276, 8, 5, 1, 5, 1, 5, 1, 6, 3, 6, 281, 8, 6, 1, 6, 1,
    6, 1, 6, 1, 6, 1, 6, 1, 6, 1, 6, 1, 6, 1, 6, 1, 6, 3, 6, 293, 8, 6, 1, 6, 1, 6, 1, 7, 3, 7, 298,
    8, 7, 1, 7, 1, 7, 1, 7, 1, 7, 1, 7, 1, 7, 1, 7, 1, 7, 1, 7, 1, 7, 1, 7, 3, 7, 311, 8, 7, 1, 7,
    1, 7, 5, 7, 315, 8, 7, 10, 7, 12, 7, 318, 9, 7, 1, 7, 1, 7, 1, 7, 1, 8, 1, 8, 1, 8, 3, 8, 326,
    8, 8, 1, 9, 3, 9, 329, 8, 9, 1, 9, 1, 9, 1, 9, 1, 9, 3, 9, 335, 8, 9, 1, 9, 1, 9, 1, 9, 1, 9, 1,
    9, 3, 9, 342, 8, 9, 1, 9, 1, 9, 5, 9, 346, 8, 9, 10, 9, 12, 9, 349, 9, 9, 1, 9, 1, 9, 3, 9, 353,
    8, 9, 1, 9, 1, 9, 1, 10, 3, 10, 358, 8, 10, 1, 10, 1, 10, 1, 10, 1, 10, 3, 10, 364, 8, 10, 1,
    10, 1, 10, 1, 11, 3, 11, 369, 8, 11, 1, 11, 1, 11, 1, 11, 1, 11, 1, 11, 1, 11, 1, 11, 3, 11,
    378, 8, 11, 1, 11, 1, 11, 1, 11, 1, 11, 1, 11, 3, 11, 385, 8, 11, 1, 11, 1, 11, 1, 12, 3, 12,
    390, 8, 12, 1, 12, 1, 12, 1, 12, 1, 12, 1, 12, 1, 12, 3, 12, 398, 8, 12, 1, 12, 1, 12, 3, 12,
    402, 8, 12, 1, 12, 1, 12, 1, 12, 5, 12, 407, 8, 12, 10, 12, 12, 12, 410, 9, 12, 1, 12, 1, 12, 3,
    12, 414, 8, 12, 1, 12, 1, 12, 1, 13, 1, 13, 1, 13, 1, 13, 3, 13, 422, 8, 13, 1, 14, 3, 14, 425,
    8, 14, 1, 14, 1, 14, 1, 14, 1, 14, 1, 14, 3, 14, 432, 8, 14, 1, 14, 1, 14, 1, 14, 1, 14, 3, 14,
    438, 8, 14, 1, 14, 1, 14, 5, 14, 442, 8, 14, 10, 14, 12, 14, 445, 9, 14, 1, 14, 1, 14, 3, 14,
    449, 8, 14, 1, 14, 1, 14, 1, 15, 1, 15, 1, 15, 1, 15, 1, 15, 1, 15, 3, 15, 459, 8, 15, 1, 16, 3,
    16, 462, 8, 16, 1, 16, 1, 16, 1, 16, 1, 17, 1, 17, 1, 18, 4, 18, 470, 8, 18, 11, 18, 12, 18,
    471, 1, 19, 1, 19, 1, 19, 1, 19, 1, 19, 1, 19, 1, 19, 1, 19, 1, 19, 1, 19, 1, 19, 1, 19, 3, 19,
    486, 8, 19, 1, 20, 1, 20, 1, 20, 1, 20, 1, 20, 1, 20, 1, 20, 1, 20, 1, 20, 3, 20, 497, 8, 20, 1,
    21, 3, 21, 500, 8, 21, 1, 21, 1, 21, 1, 21, 1, 21, 1, 21, 1, 21, 1, 22, 3, 22, 509, 8, 22, 1,
    22, 1, 22, 1, 22, 1, 22, 1, 22, 1, 22, 1, 23, 3, 23, 518, 8, 23, 1, 23, 1, 23, 1, 23, 1, 23, 3,
    23, 524, 8, 23, 1, 23, 1, 23, 1, 23, 5, 23, 529, 8, 23, 10, 23, 12, 23, 532, 9, 23, 1, 23, 3,
    23, 535, 8, 23, 1, 23, 1, 23, 3, 23, 539, 8, 23, 1, 23, 1, 23, 1, 24, 5, 24, 544, 8, 24, 10, 24,
    12, 24, 547, 9, 24, 1, 25, 3, 25, 550, 8, 25, 1, 25, 1, 25, 1, 25, 1, 25, 3, 25, 556, 8, 25, 1,
    25, 1, 25, 5, 25, 560, 8, 25, 10, 25, 12, 25, 563, 9, 25, 1, 25, 3, 25, 566, 8, 25, 1, 26, 3,
    26, 569, 8, 26, 1, 26, 1, 26, 1, 26, 3, 26, 574, 8, 26, 1, 26, 1, 26, 5, 26, 578, 8, 26, 10, 26,
    12, 26, 581, 9, 26, 1, 26, 3, 26, 584, 8, 26, 1, 27, 3, 27, 587, 8, 27, 1, 27, 1, 27, 1, 27, 1,
    27, 3, 27, 593, 8, 27, 1, 27, 1, 27, 5, 27, 597, 8, 27, 10, 27, 12, 27, 600, 9, 27, 1, 27, 1,
    27, 3, 27, 604, 8, 27, 1, 27, 1, 27, 1, 28, 3, 28, 609, 8, 28, 1, 28, 1, 28, 1, 28, 1, 28, 1,
    28, 1, 28, 3, 28, 617, 8, 28, 1, 28, 1, 28, 5, 28, 621, 8, 28, 10, 28, 12, 28, 624, 9, 28, 1,
    28, 1, 28, 3, 28, 628, 8, 28, 1, 28, 1, 28, 1, 29, 3, 29, 633, 8, 29, 1, 29, 1, 29, 3, 29, 637,
    8, 29, 1, 29, 1, 29, 1, 30, 3, 30, 642, 8, 30, 1, 30, 1, 30, 1, 30, 3, 30, 647, 8, 30, 1, 30, 1,
    30, 1, 30, 4, 30, 652, 8, 30, 11, 30, 12, 30, 653, 1, 30, 1, 30, 3, 30, 658, 8, 30, 1, 30, 1,
    30, 1, 31, 5, 31, 663, 8, 31, 10, 31, 12, 31, 666, 9, 31, 1, 32, 3, 32, 669, 8, 32, 1, 32, 1,
    32, 1, 32, 1, 32, 1, 32, 1, 32, 3, 32, 677, 8, 32, 1, 32, 1, 32, 5, 32, 681, 8, 32, 10, 32, 12,
    32, 684, 9, 32, 1, 32, 3, 32, 687, 8, 32, 1, 33, 3, 33, 690, 8, 33, 1, 33, 1, 33, 1, 33, 1, 33,
    1, 33, 1, 33, 3, 33, 698, 8, 33, 1, 33, 1, 33, 1, 34, 1, 34, 3, 34, 704, 8, 34, 1, 35, 3, 35,
    707, 8, 35, 1, 35, 1, 35, 1, 35, 1, 35, 1, 35, 1, 35, 1, 35, 1, 35, 1, 35, 3, 35, 718, 8, 35, 1,
    35, 1, 35, 1, 36, 1, 36, 1, 36, 3, 36, 725, 8, 36, 1, 36, 1, 36, 1, 37, 4, 37, 730, 8, 37, 11,
    37, 12, 37, 731, 1, 38, 1, 38, 1, 38, 1, 38, 1, 38, 3, 38, 739, 8, 38, 1, 39, 3, 39, 742, 8, 39,
    1, 39, 1, 39, 1, 39, 1, 39, 3, 39, 748, 8, 39, 1, 39, 1, 39, 1, 39, 1, 39, 1, 39, 3, 39, 755, 8,
    39, 1, 39, 3, 39, 758, 8, 39, 1, 39, 1, 39, 5, 39, 762, 8, 39, 10, 39, 12, 39, 765, 9, 39, 1,
    39, 1, 39, 1, 39, 1, 40, 3, 40, 771, 8, 40, 1, 40, 1, 40, 1, 40, 1, 40, 3, 40, 777, 8, 40, 1,
    40, 1, 40, 1, 41, 3, 41, 782, 8, 41, 1, 41, 1, 41, 1, 41, 1, 41, 3, 41, 788, 8, 41, 1, 41, 1,
    41, 1, 41, 1, 41, 1, 41, 3, 41, 795, 8, 41, 1, 41, 1, 41, 5, 41, 799, 8, 41, 10, 41, 12, 41,
    802, 9, 41, 1, 41, 1, 41, 1, 41, 3, 41, 807, 8, 41, 1, 41, 1, 41, 1, 42, 3, 42, 812, 8, 42, 1,
    42, 1, 42, 1, 42, 1, 42, 3, 42, 818, 8, 42, 1, 42, 1, 42, 1, 42, 1, 42, 1, 42, 3, 42, 825, 8,
    42, 1, 42, 1, 42, 5, 42, 829, 8, 42, 10, 42, 12, 42, 832, 9, 42, 1, 42, 1, 42, 3, 42, 836, 8,
    42, 1, 42, 1, 42, 1, 43, 3, 43, 841, 8, 43, 1, 43, 1, 43, 1, 43, 1, 43, 1, 43, 1, 43, 3, 43,
    849, 8, 43, 1, 43, 1, 43, 1, 43, 1, 43, 1, 43, 1, 43, 1, 43, 3, 43, 858, 8, 43, 1, 43, 1, 43, 1,
    44, 3, 44, 863, 8, 44, 1, 44, 1, 44, 1, 44, 1, 44, 1, 44, 1, 44, 3, 44, 871, 8, 44, 1, 44, 1,
    44, 1, 44, 1, 44, 1, 44, 1, 44, 1, 44, 3, 44, 880, 8, 44, 1, 44, 1, 44, 1, 45, 1, 45, 1, 46, 1,
    46, 1, 47, 1, 47, 1, 47, 1, 47, 1, 47, 3, 47, 893, 8, 47, 1, 47, 1, 47, 5, 47, 897, 8, 47, 10,
    47, 12, 47, 900, 9, 47, 1, 48, 1, 48, 1, 49, 1, 49, 1, 50, 1, 50, 1, 51, 1, 51, 1, 51, 1, 51, 1,
    51, 1, 51, 1, 51, 3, 51, 915, 8, 51, 1, 52, 1, 52, 1, 52, 1, 52, 3, 52, 921, 8, 52, 1, 53, 1,
    53, 1, 53, 5, 53, 926, 8, 53, 10, 53, 12, 53, 929, 9, 53, 1, 54, 1, 54, 3, 54, 933, 8, 54, 1,
    55, 1, 55, 1, 55, 5, 55, 938, 8, 55, 10, 55, 12, 55, 941, 9, 55, 1, 56, 1, 56, 1, 56, 4, 56,
    946, 8, 56, 11, 56, 12, 56, 947, 1, 57, 1, 57, 1, 57, 5, 57, 953, 8, 57, 10, 57, 12, 57, 956, 9,
    57, 1, 58, 1, 58, 1, 58, 1, 58, 1, 59, 1, 59, 1, 59, 5, 59, 965, 8, 59, 10, 59, 12, 59, 968, 9,
    59, 1, 60, 1, 60, 1, 60, 1, 60, 3, 60, 974, 8, 60, 1, 61, 1, 61, 1, 62, 1, 62, 1, 62, 1, 62, 1,
    62, 3, 62, 983, 8, 62, 1, 63, 1, 63, 1, 63, 1, 63, 1, 63, 1, 63, 3, 63, 991, 8, 63, 1, 64, 1,
    64, 1, 65, 1, 65, 1, 65, 3, 65, 998, 8, 65, 1, 66, 1, 66, 1, 67, 1, 67, 1, 68, 1, 68, 1, 68, 1,
    68, 1, 69, 1, 69, 1, 69, 1, 69, 1, 70, 1, 70, 1, 70, 1, 70, 1, 70, 3, 70, 1017, 8, 70, 1, 70, 1,
    70, 1, 70, 1, 70, 1, 70, 5, 70, 1024, 8, 70, 10, 70, 12, 70, 1027, 9, 70, 1, 70, 1, 70, 1, 70,
    5, 70, 1032, 8, 70, 10, 70, 12, 70, 1035, 9, 70, 1, 71, 1, 71, 1, 71, 1, 71, 1, 71, 1, 71, 1,
    71, 1, 71, 1, 71, 3, 71, 1046, 8, 71, 1, 71, 1, 71, 1, 71, 1, 71, 1, 71, 5, 71, 1053, 8, 71, 10,
    71, 12, 71, 1056, 9, 71, 1, 72, 1, 72, 3, 72, 1060, 8, 72, 1, 73, 1, 73, 1, 74, 1, 74, 1, 74, 1,
    74, 1, 75, 1, 75, 3, 75, 1070, 8, 75, 1, 76, 1, 76, 1, 76, 1, 77, 1, 77, 1, 77, 1, 78, 1, 78, 1,
    78, 1, 78, 1, 79, 1, 79, 1, 79, 1, 79, 1, 80, 1, 80, 1, 80, 1, 80, 1, 81, 1, 81, 1, 81, 1, 81,
    1, 82, 1, 82, 1, 82, 5, 82, 1097, 8, 82, 10, 82, 12, 82, 1100, 9, 82, 1, 83, 1, 83, 1, 83, 1,
    83, 1, 84, 1, 84, 1, 84, 3, 84, 1109, 8, 84, 1, 84, 1, 84, 1, 85, 1, 85, 1, 86, 1, 86, 1, 86, 3,
    86, 1118, 8, 86, 1, 86, 1, 86, 1, 87, 1, 87, 3, 87, 1124, 8, 87, 1, 87, 1, 87, 1, 87, 1, 88, 1,
    88, 1, 88, 1, 88, 1, 88, 5, 88, 1134, 8, 88, 10, 88, 12, 88, 1137, 9, 88, 1, 88, 1, 88, 1, 89,
    1, 89, 1, 89, 1, 89, 1, 89, 1, 89, 5, 89, 1147, 8, 89, 10, 89, 12, 89, 1150, 9, 89, 1, 89, 1,
    89, 1, 89, 1, 89, 1, 89, 1, 90, 1, 90, 1, 90, 1, 90, 1, 90, 4, 90, 1162, 8, 90, 11, 90, 12, 90,
    1163, 1, 90, 1, 90, 1, 91, 1, 91, 1, 91, 1, 91, 1, 91, 1, 92, 1, 92, 1, 92, 0, 3, 94, 140, 142,
    93, 0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40, 42, 44, 46,
    48, 50, 52, 54, 56, 58, 60, 62, 64, 66, 68, 70, 72, 74, 76, 78, 80, 82, 84, 86, 88, 90, 92, 94,
    96, 98, 100, 102, 104, 106, 108, 110, 112, 114, 116, 118, 120, 122, 124, 126, 128, 130, 132,
    134, 136, 138, 140, 142, 144, 146, 148, 150, 152, 154, 156, 158, 160, 162, 164, 166, 168, 170,
    172, 174, 176, 178, 180, 182, 184, 0, 3, 1, 0, 60, 61, 1, 0, 102, 103, 4, 0, 62, 63, 65, 67, 69,
    69, 83, 90, 1281, 0, 187, 1, 0, 0, 0, 2, 207, 1, 0, 0, 0, 4, 220, 1, 0, 0, 0, 6, 223, 1, 0, 0,
    0, 8, 245, 1, 0, 0, 0, 10, 250, 1, 0, 0, 0, 12, 280, 1, 0, 0, 0, 14, 297, 1, 0, 0, 0, 16, 325,
    1, 0, 0, 0, 18, 328, 1, 0, 0, 0, 20, 357, 1, 0, 0, 0, 22, 368, 1, 0, 0, 0, 24, 389, 1, 0, 0, 0,
    26, 421, 1, 0, 0, 0, 28, 424, 1, 0, 0, 0, 30, 458, 1, 0, 0, 0, 32, 461, 1, 0, 0, 0, 34, 466, 1,
    0, 0, 0, 36, 469, 1, 0, 0, 0, 38, 485, 1, 0, 0, 0, 40, 496, 1, 0, 0, 0, 42, 499, 1, 0, 0, 0, 44,
    508, 1, 0, 0, 0, 46, 517, 1, 0, 0, 0, 48, 545, 1, 0, 0, 0, 50, 549, 1, 0, 0, 0, 52, 568, 1, 0,
    0, 0, 54, 586, 1, 0, 0, 0, 56, 608, 1, 0, 0, 0, 58, 632, 1, 0, 0, 0, 60, 641, 1, 0, 0, 0, 62,
    664, 1, 0, 0, 0, 64, 668, 1, 0, 0, 0, 66, 689, 1, 0, 0, 0, 68, 703, 1, 0, 0, 0, 70, 706, 1, 0,
    0, 0, 72, 721, 1, 0, 0, 0, 74, 729, 1, 0, 0, 0, 76, 738, 1, 0, 0, 0, 78, 741, 1, 0, 0, 0, 80,
    770, 1, 0, 0, 0, 82, 781, 1, 0, 0, 0, 84, 811, 1, 0, 0, 0, 86, 840, 1, 0, 0, 0, 88, 862, 1, 0,
    0, 0, 90, 883, 1, 0, 0, 0, 92, 885, 1, 0, 0, 0, 94, 892, 1, 0, 0, 0, 96, 901, 1, 0, 0, 0, 98,
    903, 1, 0, 0, 0, 100, 905, 1, 0, 0, 0, 102, 914, 1, 0, 0, 0, 104, 920, 1, 0, 0, 0, 106, 922, 1,
    0, 0, 0, 108, 932, 1, 0, 0, 0, 110, 934, 1, 0, 0, 0, 112, 942, 1, 0, 0, 0, 114, 949, 1, 0, 0, 0,
    116, 957, 1, 0, 0, 0, 118, 961, 1, 0, 0, 0, 120, 973, 1, 0, 0, 0, 122, 975, 1, 0, 0, 0, 124,
    982, 1, 0, 0, 0, 126, 990, 1, 0, 0, 0, 128, 992, 1, 0, 0, 0, 130, 997, 1, 0, 0, 0, 132, 999, 1,
    0, 0, 0, 134, 1001, 1, 0, 0, 0, 136, 1003, 1, 0, 0, 0, 138, 1007, 1, 0, 0, 0, 140, 1016, 1, 0,
    0, 0, 142, 1045, 1, 0, 0, 0, 144, 1059, 1, 0, 0, 0, 146, 1061, 1, 0, 0, 0, 148, 1063, 1, 0, 0,
    0, 150, 1069, 1, 0, 0, 0, 152, 1071, 1, 0, 0, 0, 154, 1074, 1, 0, 0, 0, 156, 1077, 1, 0, 0, 0,
    158, 1081, 1, 0, 0, 0, 160, 1085, 1, 0, 0, 0, 162, 1089, 1, 0, 0, 0, 164, 1093, 1, 0, 0, 0, 166,
    1101, 1, 0, 0, 0, 168, 1105, 1, 0, 0, 0, 170, 1112, 1, 0, 0, 0, 172, 1114, 1, 0, 0, 0, 174,
    1123, 1, 0, 0, 0, 176, 1128, 1, 0, 0, 0, 178, 1140, 1, 0, 0, 0, 180, 1156, 1, 0, 0, 0, 182,
    1167, 1, 0, 0, 0, 184, 1172, 1, 0, 0, 0, 186, 188, 3, 32, 16, 0, 187, 186, 1, 0, 0, 0, 187, 188,
    1, 0, 0, 0, 188, 192, 1, 0, 0, 0, 189, 191, 3, 4, 2, 0, 190, 189, 1, 0, 0, 0, 191, 194, 1, 0, 0,
    0, 192, 190, 1, 0, 0, 0, 192, 193, 1, 0, 0, 0, 193, 196, 1, 0, 0, 0, 194, 192, 1, 0, 0, 0, 195,
    197, 3, 8, 4, 0, 196, 195, 1, 0, 0, 0, 196, 197, 1, 0, 0, 0, 197, 201, 1, 0, 0, 0, 198, 200, 5,
    93, 0, 0, 199, 198, 1, 0, 0, 0, 200, 203, 1, 0, 0, 0, 201, 199, 1, 0, 0, 0, 201, 202, 1, 0, 0,
    0, 202, 204, 1, 0, 0, 0, 203, 201, 1, 0, 0, 0, 204, 205, 5, 0, 0, 1, 205, 1, 1, 0, 0, 0, 206,
    208, 3, 4, 2, 0, 207, 206, 1, 0, 0, 0, 208, 209, 1, 0, 0, 0, 209, 207, 1, 0, 0, 0, 209, 210, 1,
    0, 0, 0, 210, 3, 1, 0, 0, 0, 211, 221, 3, 6, 3, 0, 212, 221, 3, 10, 5, 0, 213, 221, 3, 12, 6, 0,
    214, 221, 3, 18, 9, 0, 215, 221, 3, 20, 10, 0, 216, 221, 3, 22, 11, 0, 217, 221, 3, 24, 12, 0,
    218, 221, 3, 28, 14, 0, 219, 221, 3, 32, 16, 0, 220, 211, 1, 0, 0, 0, 220, 212, 1, 0, 0, 0, 220,
    213, 1, 0, 0, 0, 220, 214, 1, 0, 0, 0, 220, 215, 1, 0, 0, 0, 220, 216, 1, 0, 0, 0, 220, 217, 1,
    0, 0, 0, 220, 218, 1, 0, 0, 0, 220, 219, 1, 0, 0, 0, 221, 5, 1, 0, 0, 0, 222, 224, 5, 107, 0, 0,
    223, 222, 1, 0, 0, 0, 223, 224, 1, 0, 0, 0, 224, 225, 1, 0, 0, 0, 225, 226, 5, 43, 0, 0, 226,
    227, 5, 8, 0, 0, 227, 228, 5, 78, 0, 0, 228, 229, 5, 79, 0, 0, 229, 230, 5, 68, 0, 0, 230, 231,
    5, 46, 0, 0, 231, 232, 5, 82, 0, 0, 232, 236, 5, 93, 0, 0, 233, 235, 3, 40, 20, 0, 234, 233, 1,
    0, 0, 0, 235, 238, 1, 0, 0, 0, 236, 234, 1, 0, 0, 0, 236, 237, 1, 0, 0, 0, 237, 239, 1, 0, 0, 0,
    238, 236, 1, 0, 0, 0, 239, 241, 5, 109, 0, 0, 240, 242, 5, 108, 0, 0, 241, 240, 1, 0, 0, 0, 241,
    242, 1, 0, 0, 0, 242, 243, 1, 0, 0, 0, 243, 244, 5, 93, 0, 0, 244, 7, 1, 0, 0, 0, 245, 246, 5,
    8, 0, 0, 246, 247, 5, 78, 0, 0, 247, 248, 5, 79, 0, 0, 248, 9, 1, 0, 0, 0, 249, 251, 5, 107, 0,
    0, 250, 249, 1, 0, 0, 0, 250, 251, 1, 0, 0, 0, 251, 252, 1, 0, 0, 0, 252, 253, 5, 43, 0, 0, 253,
    254, 3, 96, 48, 0, 254, 256, 5, 78, 0, 0, 255, 257, 3, 110, 55, 0, 256, 255, 1, 0, 0, 0, 256,
    257, 1, 0, 0, 0, 257, 258, 1, 0, 0, 0, 258, 259, 5, 79, 0, 0, 259, 260, 5, 68, 0, 0, 260, 261,
    3, 120, 60, 0, 261, 263, 5, 82, 0, 0, 262, 264, 3, 34, 17, 0, 263, 262, 1, 0, 0, 0, 263, 264, 1,
    0, 0, 0, 264, 265, 1, 0, 0, 0, 265, 269, 5, 93, 0, 0, 266, 268, 3, 40, 20, 0, 267, 266, 1, 0, 0,
    0, 268, 271, 1, 0, 0, 0, 269, 267, 1, 0, 0, 0, 269, 270, 1, 0, 0, 0, 270, 272, 1, 0, 0, 0, 271,
    269, 1, 0, 0, 0, 272, 273, 3, 72, 36, 0, 273, 275, 5, 110, 0, 0, 274, 276, 5, 108, 0, 0, 275,
    274, 1, 0, 0, 0, 275, 276, 1, 0, 0, 0, 276, 277, 1, 0, 0, 0, 277, 278, 5, 93, 0, 0, 278, 11, 1,
    0, 0, 0, 279, 281, 5, 107, 0, 0, 280, 279, 1, 0, 0, 0, 280, 281, 1, 0, 0, 0, 281, 282, 1, 0, 0,
    0, 282, 283, 5, 1, 0, 0, 283, 284, 3, 100, 50, 0, 284, 285, 5, 78, 0, 0, 285, 286, 5, 51, 0, 0,
    286, 287, 5, 79, 0, 0, 287, 288, 5, 82, 0, 0, 288, 289, 5, 93, 0, 0, 289, 290, 3, 14, 7, 0, 290,
    292, 5, 112, 0, 0, 291, 293, 5, 108, 0, 0, 292, 291, 1, 0, 0, 0, 292, 293, 1, 0, 0, 0, 293, 294,
    1, 0, 0, 0, 294, 295, 5, 93, 0, 0, 295, 13, 1, 0, 0, 0, 296, 298, 5, 107, 0, 0, 297, 296, 1, 0,
    0, 0, 297, 298, 1, 0, 0, 0, 298, 299, 1, 0, 0, 0, 299, 300, 5, 43, 0, 0, 300, 301, 3, 98, 49, 0,
    301, 302, 5, 78, 0, 0, 302, 303, 5, 72, 0, 0, 303, 304, 5, 82, 0, 0, 304, 305, 3, 100, 50, 0,
    305, 306, 5, 79, 0, 0, 306, 307, 5, 68, 0, 0, 307, 308, 5, 46, 0, 0, 308, 310, 5, 82, 0, 0, 309,
    311, 3, 34, 17, 0, 310, 309, 1, 0, 0, 0, 310, 311, 1, 0, 0, 0, 311, 312, 1, 0, 0, 0, 312, 316,
    5, 93, 0, 0, 313, 315, 3, 16, 8, 0, 314, 313, 1, 0, 0, 0, 315, 318, 1, 0, 0, 0, 316, 314, 1, 0,
    0, 0, 316, 317, 1, 0, 0, 0, 317, 319, 1, 0, 0, 0, 318, 316, 1, 0, 0, 0, 319, 320, 5, 111, 0, 0,
    320, 321, 5, 93, 0, 0, 321, 15, 1, 0, 0, 0, 322, 326, 3, 70, 35, 0, 323, 326, 3, 42, 21, 0, 324,
    326, 3, 32, 16, 0, 325, 322, 1, 0, 0, 0, 325, 323, 1, 0, 0, 0, 325, 324, 1, 0, 0, 0, 326, 17, 1,
    0, 0, 0, 327, 329, 5, 107, 0, 0, 328, 327, 1, 0, 0, 0, 328, 329, 1, 0, 0, 0, 329, 330, 1, 0, 0,
    0, 330, 331, 5, 43, 0, 0, 331, 332, 3, 96, 48, 0, 332, 334, 5, 78, 0, 0, 333, 335, 3, 110, 55,
    0, 334, 333, 1, 0, 0, 0, 334, 335, 1, 0, 0, 0, 335, 336, 1, 0, 0, 0, 336, 337, 5, 79, 0, 0, 337,
    338, 5, 68, 0, 0, 338, 339, 5, 46, 0, 0, 339, 341, 5, 82, 0, 0, 340, 342, 3, 34, 17, 0, 341,
    340, 1, 0, 0, 0, 341, 342, 1, 0, 0, 0, 342, 343, 1, 0, 0, 0, 343, 347, 5, 93, 0, 0, 344, 346, 3,
    40, 20, 0, 345, 344, 1, 0, 0, 0, 346, 349, 1, 0, 0, 0, 347, 345, 1, 0, 0, 0, 347, 348, 1, 0, 0,
    0, 348, 350, 1, 0, 0, 0, 349, 347, 1, 0, 0, 0, 350, 352, 5, 113, 0, 0, 351, 353, 5, 108, 0, 0,
    352, 351, 1, 0, 0, 0, 352, 353, 1, 0, 0, 0, 353, 354, 1, 0, 0, 0, 354, 355, 5, 93, 0, 0, 355,
    19, 1, 0, 0, 0, 356, 358, 5, 106, 0, 0, 357, 356, 1, 0, 0, 0, 357, 358, 1, 0, 0, 0, 358, 359, 1,
    0, 0, 0, 359, 360, 3, 90, 45, 0, 360, 361, 5, 73, 0, 0, 361, 363, 3, 104, 52, 0, 362, 364, 3,
    34, 17, 0, 363, 362, 1, 0, 0, 0, 363, 364, 1, 0, 0, 0, 364, 365, 1, 0, 0, 0, 365, 366, 5, 93, 0,
    0, 366, 21, 1, 0, 0, 0, 367, 369, 5, 107, 0, 0, 368, 367, 1, 0, 0, 0, 368, 369, 1, 0, 0, 0, 369,
    370, 1, 0, 0, 0, 370, 371, 5, 1, 0, 0, 371, 372, 3, 102, 51, 0, 372, 373, 5, 78, 0, 0, 373, 374,
    5, 50, 0, 0, 374, 375, 5, 79, 0, 0, 375, 377, 5, 82, 0, 0, 376, 378, 3, 34, 17, 0, 377, 376, 1,
    0, 0, 0, 377, 378, 1, 0, 0, 0, 378, 379, 1, 0, 0, 0, 379, 380, 5, 93, 0, 0, 380, 381, 3, 118,
    59, 0, 381, 382, 5, 93, 0, 0, 382, 384, 5, 114, 0, 0, 383, 385, 5, 108, 0, 0, 384, 383, 1, 0, 0,
    0, 384, 385, 1, 0, 0, 0, 385, 386, 1, 0, 0, 0, 386, 387, 5, 93, 0, 0, 387, 23, 1, 0, 0, 0, 388,
    390, 5, 107, 0, 0, 389, 388, 1, 0, 0, 0, 389, 390, 1, 0, 0, 0, 390, 391, 1, 0, 0, 0, 391, 392,
    5, 1, 0, 0, 392, 397, 3, 102, 51, 0, 393, 394, 5, 78, 0, 0, 394, 395, 3, 102, 51, 0, 395, 396,
    5, 79, 0, 0, 396, 398, 1, 0, 0, 0, 397, 393, 1, 0, 0, 0, 397, 398, 1, 0, 0, 0, 398, 399, 1, 0,
    0, 0, 399, 401, 5, 82, 0, 0, 400, 402, 3, 34, 17, 0, 401, 400, 1, 0, 0, 0, 401, 402, 1, 0, 0, 0,
    402, 403, 1, 0, 0, 0, 403, 404, 5, 93, 0, 0, 404, 408, 3, 78, 39, 0, 405, 407, 3, 26, 13, 0,
    406, 405, 1, 0, 0, 0, 407, 410, 1, 0, 0, 0, 408, 406, 1, 0, 0, 0, 408, 409, 1, 0, 0, 0, 409,
    411, 1, 0, 0, 0, 410, 408, 1, 0, 0, 0, 411, 413, 5, 115, 0, 0, 412, 414, 5, 108, 0, 0, 413, 412,
    1, 0, 0, 0, 413, 414, 1, 0, 0, 0, 414, 415, 1, 0, 0, 0, 415, 416, 5, 93, 0, 0, 416, 25, 1, 0, 0,
    0, 417, 422, 3, 80, 40, 0, 418, 422, 3, 82, 41, 0, 419, 422, 3, 84, 42, 0, 420, 422, 3, 32, 16,
    0, 421, 417, 1, 0, 0, 0, 421, 418, 1, 0, 0, 0, 421, 419, 1, 0, 0, 0, 421, 420, 1, 0, 0, 0, 422,
    27, 1, 0, 0, 0, 423, 425, 5, 107, 0, 0, 424, 423, 1, 0, 0, 0, 424, 425, 1, 0, 0, 0, 425, 426, 1,
    0, 0, 0, 426, 427, 5, 1, 0, 0, 427, 428, 3, 102, 51, 0, 428, 431, 5, 78, 0, 0, 429, 432, 3, 102,
    51, 0, 430, 432, 5, 49, 0, 0, 431, 429, 1, 0, 0, 0, 431, 430, 1, 0, 0, 0, 432, 433, 1, 0, 0, 0,
    433, 434, 5, 79, 0, 0, 434, 435, 1, 0, 0, 0, 435, 437, 5, 82, 0, 0, 436, 438, 3, 34, 17, 0, 437,
    436, 1, 0, 0, 0, 437, 438, 1, 0, 0, 0, 438, 439, 1, 0, 0, 0, 439, 443, 5, 93, 0, 0, 440, 442, 3,
    30, 15, 0, 441, 440, 1, 0, 0, 0, 442, 445, 1, 0, 0, 0, 443, 441, 1, 0, 0, 0, 443, 444, 1, 0, 0,
    0, 444, 446, 1, 0, 0, 0, 445, 443, 1, 0, 0, 0, 446, 448, 5, 115, 0, 0, 447, 449, 5, 108, 0, 0,
    448, 447, 1, 0, 0, 0, 448, 449, 1, 0, 0, 0, 449, 450, 1, 0, 0, 0, 450, 451, 5, 93, 0, 0, 451,
    29, 1, 0, 0, 0, 452, 459, 3, 80, 40, 0, 453, 459, 3, 82, 41, 0, 454, 459, 3, 84, 42, 0, 455,
    459, 3, 86, 43, 0, 456, 459, 3, 88, 44, 0, 457, 459, 3, 32, 16, 0, 458, 452, 1, 0, 0, 0, 458,
    453, 1, 0, 0, 0, 458, 454, 1, 0, 0, 0, 458, 455, 1, 0, 0, 0, 458, 456, 1, 0, 0, 0, 458, 457, 1,
    0, 0, 0, 459, 31, 1, 0, 0, 0, 460, 462, 5, 106, 0, 0, 461, 460, 1, 0, 0, 0, 461, 462, 1, 0, 0,
    0, 462, 463, 1, 0, 0, 0, 463, 464, 3, 34, 17, 0, 464, 465, 5, 93, 0, 0, 465, 33, 1, 0, 0, 0,
    466, 467, 5, 126, 0, 0, 467, 35, 1, 0, 0, 0, 468, 470, 3, 38, 19, 0, 469, 468, 1, 0, 0, 0, 470,
    471, 1, 0, 0, 0, 471, 469, 1, 0, 0, 0, 471, 472, 1, 0, 0, 0, 472, 37, 1, 0, 0, 0, 473, 486, 3,
    42, 21, 0, 474, 486, 3, 44, 22, 0, 475, 486, 3, 46, 23, 0, 476, 486, 3, 50, 25, 0, 477, 486, 3,
    52, 26, 0, 478, 486, 3, 54, 27, 0, 479, 486, 3, 56, 28, 0, 480, 486, 3, 58, 29, 0, 481, 486, 3,
    60, 30, 0, 482, 486, 3, 64, 32, 0, 483, 486, 3, 66, 33, 0, 484, 486, 3, 32, 16, 0, 485, 473, 1,
    0, 0, 0, 485, 474, 1, 0, 0, 0, 485, 475, 1, 0, 0, 0, 485, 476, 1, 0, 0, 0, 485, 477, 1, 0, 0, 0,
    485, 478, 1, 0, 0, 0, 485, 479, 1, 0, 0, 0, 485, 480, 1, 0, 0, 0, 485, 481, 1, 0, 0, 0, 485,
    482, 1, 0, 0, 0, 485, 483, 1, 0, 0, 0, 485, 484, 1, 0, 0, 0, 486, 39, 1, 0, 0, 0, 487, 497, 3,
    42, 21, 0, 488, 497, 3, 44, 22, 0, 489, 497, 3, 46, 23, 0, 490, 497, 3, 54, 27, 0, 491, 497, 3,
    56, 28, 0, 492, 497, 3, 58, 29, 0, 493, 497, 3, 60, 30, 0, 494, 497, 3, 66, 33, 0, 495, 497, 3,
    32, 16, 0, 496, 487, 1, 0, 0, 0, 496, 488, 1, 0, 0, 0, 496, 489, 1, 0, 0, 0, 496, 490, 1, 0, 0,
    0, 496, 491, 1, 0, 0, 0, 496, 492, 1, 0, 0, 0, 496, 493, 1, 0, 0, 0, 496, 494, 1, 0, 0, 0, 496,
    495, 1, 0, 0, 0, 497, 41, 1, 0, 0, 0, 498, 500, 5, 106, 0, 0, 499, 498, 1, 0, 0, 0, 499, 500, 1,
    0, 0, 0, 500, 501, 1, 0, 0, 0, 501, 502, 3, 90, 45, 0, 502, 503, 5, 73, 0, 0, 503, 504, 3, 140,
    70, 0, 504, 505, 5, 124, 0, 0, 505, 506, 5, 93, 0, 0, 506, 43, 1, 0, 0, 0, 507, 509, 5, 106, 0,
    0, 508, 507, 1, 0, 0, 0, 508, 509, 1, 0, 0, 0, 509, 510, 1, 0, 0, 0, 510, 511, 3, 94, 47, 0,
    511, 512, 5, 73, 0, 0, 512, 513, 3, 140, 70, 0, 513, 514, 5, 123, 0, 0, 514, 515, 5, 93, 0, 0,
    515, 45, 1, 0, 0, 0, 516, 518, 5, 107, 0, 0, 517, 516, 1, 0, 0, 0, 517, 518, 1, 0, 0, 0, 518,
    519, 1, 0, 0, 0, 519, 520, 5, 5, 0, 0, 520, 521, 3, 140, 70, 0, 521, 523, 5, 82, 0, 0, 522, 524,
    3, 34, 17, 0, 523, 522, 1, 0, 0, 0, 523, 524, 1, 0, 0, 0, 524, 525, 1, 0, 0, 0, 525, 526, 5, 93,
    0, 0, 526, 530, 3, 48, 24, 0, 527, 529, 3, 50, 25, 0, 528, 527, 1, 0, 0, 0, 529, 532, 1, 0, 0,
    0, 530, 528, 1, 0, 0, 0, 530, 531, 1, 0, 0, 0, 531, 534, 1, 0, 0, 0, 532, 530, 1, 0, 0, 0, 533,
    535, 3, 52, 26, 0, 534, 533, 1, 0, 0, 0, 534, 535, 1, 0, 0, 0, 535, 536, 1, 0, 0, 0, 536, 538,
    5, 116, 0, 0, 537, 539, 5, 108, 0, 0, 538, 537, 1, 0, 0, 0, 538, 539, 1, 0, 0, 0, 539, 540, 1,
    0, 0, 0, 540, 541, 5, 93, 0, 0, 541, 47, 1, 0, 0, 0, 542, 544, 3, 40, 20, 0, 543, 542, 1, 0, 0,
    0, 544, 547, 1, 0, 0, 0, 545, 543, 1, 0, 0, 0, 545, 546, 1, 0, 0, 0, 546, 49, 1, 0, 0, 0, 547,
    545, 1, 0, 0, 0, 548, 550, 5, 107, 0, 0, 549, 548, 1, 0, 0, 0, 549, 550, 1, 0, 0, 0, 550, 551,
    1, 0, 0, 0, 551, 552, 5, 2, 0, 0, 552, 553, 3, 140, 70, 0, 553, 555, 5, 82, 0, 0, 554, 556, 3,
    34, 17, 0, 555, 554, 1, 0, 0, 0, 555, 556, 1, 0, 0, 0, 556, 557, 1, 0, 0, 0, 557, 561, 5, 93, 0,
    0, 558, 560, 3, 40, 20, 0, 559, 558, 1, 0, 0, 0, 560, 563, 1, 0, 0, 0, 561, 559, 1, 0, 0, 0,
    561, 562, 1, 0, 0, 0, 562, 565, 1, 0, 0, 0, 563, 561, 1, 0, 0, 0, 564, 566, 5, 108, 0, 0, 565,
    564, 1, 0, 0, 0, 565, 566, 1, 0, 0, 0, 566, 51, 1, 0, 0, 0, 567, 569, 5, 107, 0, 0, 568, 567, 1,
    0, 0, 0, 568, 569, 1, 0, 0, 0, 569, 570, 1, 0, 0, 0, 570, 571, 5, 3, 0, 0, 571, 573, 5, 82, 0,
    0, 572, 574, 3, 34, 17, 0, 573, 572, 1, 0, 0, 0, 573, 574, 1, 0, 0, 0, 574, 575, 1, 0, 0, 0,
    575, 579, 5, 93, 0, 0, 576, 578, 3, 40, 20, 0, 577, 576, 1, 0, 0, 0, 578, 581, 1, 0, 0, 0, 579,
    577, 1, 0, 0, 0, 579, 580, 1, 0, 0, 0, 580, 583, 1, 0, 0, 0, 581, 579, 1, 0, 0, 0, 582, 584, 5,
    108, 0, 0, 583, 582, 1, 0, 0, 0, 583, 584, 1, 0, 0, 0, 584, 53, 1, 0, 0, 0, 585, 587, 5, 107, 0,
    0, 586, 585, 1, 0, 0, 0, 586, 587, 1, 0, 0, 0, 587, 588, 1, 0, 0, 0, 588, 589, 5, 11, 0, 0, 589,
    590, 3, 140, 70, 0, 590, 592, 5, 82, 0, 0, 591, 593, 3, 34, 17, 0, 592, 591, 1, 0, 0, 0, 592,
    593, 1, 0, 0, 0, 593, 594, 1, 0, 0, 0, 594, 598, 5, 93, 0, 0, 595, 597, 3, 40, 20, 0, 596, 595,
    1, 0, 0, 0, 597, 600, 1, 0, 0, 0, 598, 596, 1, 0, 0, 0, 598, 599, 1, 0, 0, 0, 599, 601, 1, 0, 0,
    0, 600, 598, 1, 0, 0, 0, 601, 603, 5, 117, 0, 0, 602, 604, 5, 108, 0, 0, 603, 602, 1, 0, 0, 0,
    603, 604, 1, 0, 0, 0, 604, 605, 1, 0, 0, 0, 605, 606, 5, 93, 0, 0, 606, 55, 1, 0, 0, 0, 607,
    609, 5, 107, 0, 0, 608, 607, 1, 0, 0, 0, 608, 609, 1, 0, 0, 0, 609, 610, 1, 0, 0, 0, 610, 611,
    5, 4, 0, 0, 611, 612, 3, 90, 45, 0, 612, 613, 5, 6, 0, 0, 613, 614, 3, 140, 70, 0, 614, 616, 5,
    82, 0, 0, 615, 617, 3, 34, 17, 0, 616, 615, 1, 0, 0, 0, 616, 617, 1, 0, 0, 0, 617, 618, 1, 0, 0,
    0, 618, 622, 5, 93, 0, 0, 619, 621, 3, 40, 20, 0, 620, 619, 1, 0, 0, 0, 621, 624, 1, 0, 0, 0,
    622, 620, 1, 0, 0, 0, 622, 623, 1, 0, 0, 0, 623, 625, 1, 0, 0, 0, 624, 622, 1, 0, 0, 0, 625,
    627, 5, 118, 0, 0, 626, 628, 5, 108, 0, 0, 627, 626, 1, 0, 0, 0, 627, 628, 1, 0, 0, 0, 628, 629,
    1, 0, 0, 0, 629, 630, 5, 93, 0, 0, 630, 57, 1, 0, 0, 0, 631, 633, 5, 106, 0, 0, 632, 631, 1, 0,
    0, 0, 632, 633, 1, 0, 0, 0, 633, 634, 1, 0, 0, 0, 634, 636, 3, 142, 71, 0, 635, 637, 3, 34, 17,
    0, 636, 635, 1, 0, 0, 0, 636, 637, 1, 0, 0, 0, 637, 638, 1, 0, 0, 0, 638, 639, 5, 93, 0, 0, 639,
    59, 1, 0, 0, 0, 640, 642, 5, 107, 0, 0, 641, 640, 1, 0, 0, 0, 641, 642, 1, 0, 0, 0, 642, 643, 1,
    0, 0, 0, 643, 644, 5, 10, 0, 0, 644, 646, 5, 82, 0, 0, 645, 647, 3, 34, 17, 0, 646, 645, 1, 0,
    0, 0, 646, 647, 1, 0, 0, 0, 647, 648, 1, 0, 0, 0, 648, 649, 5, 93, 0, 0, 649, 651, 3, 62, 31, 0,
    650, 652, 3, 64, 32, 0, 651, 650, 1, 0, 0, 0, 652, 653, 1, 0, 0, 0, 653, 651, 1, 0, 0, 0, 653,
    654, 1, 0, 0, 0, 654, 655, 1, 0, 0, 0, 655, 657, 5, 119, 0, 0, 656, 658, 5, 108, 0, 0, 657, 656,
    1, 0, 0, 0, 657, 658, 1, 0, 0, 0, 658, 659, 1, 0, 0, 0, 659, 660, 5, 93, 0, 0, 660, 61, 1, 0, 0,
    0, 661, 663, 3, 40, 20, 0, 662, 661, 1, 0, 0, 0, 663, 666, 1, 0, 0, 0, 664, 662, 1, 0, 0, 0,
    664, 665, 1, 0, 0, 0, 665, 63, 1, 0, 0, 0, 666, 664, 1, 0, 0, 0, 667, 669, 5, 107, 0, 0, 668,
    667, 1, 0, 0, 0, 668, 669, 1, 0, 0, 0, 669, 670, 1, 0, 0, 0, 670, 671, 5, 44, 0, 0, 671, 672, 3,
    102, 51, 0, 672, 673, 5, 42, 0, 0, 673, 674, 3, 90, 45, 0, 674, 676, 5, 82, 0, 0, 675, 677, 3,
    34, 17, 0, 676, 675, 1, 0, 0, 0, 676, 677, 1, 0, 0, 0, 677, 678, 1, 0, 0, 0, 678, 682, 5, 93, 0,
    0, 679, 681, 3, 40, 20, 0, 680, 679, 1, 0, 0, 0, 681, 684, 1, 0, 0, 0, 682, 680, 1, 0, 0, 0,
    682, 683, 1, 0, 0, 0, 683, 686, 1, 0, 0, 0, 684, 682, 1, 0, 0, 0, 685, 687, 5, 108, 0, 0, 686,
    685, 1, 0, 0, 0, 686, 687, 1, 0, 0, 0, 687, 65, 1, 0, 0, 0, 688, 690, 5, 106, 0, 0, 689, 688, 1,
    0, 0, 0, 689, 690, 1, 0, 0, 0, 690, 691, 1, 0, 0, 0, 691, 692, 5, 48, 0, 0, 692, 693, 3, 102,
    51, 0, 693, 694, 5, 78, 0, 0, 694, 695, 3, 68, 34, 0, 695, 697, 5, 79, 0, 0, 696, 698, 3, 34,
    17, 0, 697, 696, 1, 0, 0, 0, 697, 698, 1, 0, 0, 0, 698, 699, 1, 0, 0, 0, 699, 700, 5, 93, 0, 0,
    700, 67, 1, 0, 0, 0, 701, 704, 3, 134, 67, 0, 702, 704, 3, 92, 46, 0, 703, 701, 1, 0, 0, 0, 703,
    702, 1, 0, 0, 0, 704, 69, 1, 0, 0, 0, 705, 707, 5, 106, 0, 0, 706, 705, 1, 0, 0, 0, 706, 707, 1,
    0, 0, 0, 707, 708, 1, 0, 0, 0, 708, 709, 5, 72, 0, 0, 709, 710, 5, 80, 0, 0, 710, 711, 5, 41, 0,
    0, 711, 712, 5, 78, 0, 0, 712, 713, 3, 122, 61, 0, 713, 714, 5, 81, 0, 0, 714, 715, 3, 124, 62,
    0, 715, 717, 5, 79, 0, 0, 716, 718, 3, 34, 17, 0, 717, 716, 1, 0, 0, 0, 717, 718, 1, 0, 0, 0,
    718, 719, 1, 0, 0, 0, 719, 720, 5, 93, 0, 0, 720, 71, 1, 0, 0, 0, 721, 722, 5, 9, 0, 0, 722,
    724, 3, 140, 70, 0, 723, 725, 3, 34, 17, 0, 724, 723, 1, 0, 0, 0, 724, 725, 1, 0, 0, 0, 725,
    726, 1, 0, 0, 0, 726, 727, 5, 93, 0, 0, 727, 73, 1, 0, 0, 0, 728, 730, 3, 76, 38, 0, 729, 728,
    1, 0, 0, 0, 730, 731, 1, 0, 0, 0, 731, 729, 1, 0, 0, 0, 731, 732, 1, 0, 0, 0, 732, 75, 1, 0, 0,
    0, 733, 739, 3, 80, 40, 0, 734, 739, 3, 82, 41, 0, 735, 739, 3, 84, 42, 0, 736, 739, 3, 86, 43,
    0, 737, 739, 3, 88, 44, 0, 738, 733, 1, 0, 0, 0, 738, 734, 1, 0, 0, 0, 738, 735, 1, 0, 0, 0,
    738, 736, 1, 0, 0, 0, 738, 737, 1, 0, 0, 0, 739, 77, 1, 0, 0, 0, 740, 742, 5, 107, 0, 0, 741,
    740, 1, 0, 0, 0, 741, 742, 1, 0, 0, 0, 742, 743, 1, 0, 0, 0, 743, 744, 5, 43, 0, 0, 744, 745, 5,
    45, 0, 0, 745, 747, 5, 78, 0, 0, 746, 748, 3, 110, 55, 0, 747, 746, 1, 0, 0, 0, 747, 748, 1, 0,
    0, 0, 748, 749, 1, 0, 0, 0, 749, 750, 5, 79, 0, 0, 750, 751, 5, 68, 0, 0, 751, 752, 5, 46, 0, 0,
    752, 754, 5, 82, 0, 0, 753, 755, 3, 34, 17, 0, 754, 753, 1, 0, 0, 0, 754, 755, 1, 0, 0, 0, 755,
    757, 1, 0, 0, 0, 756, 758, 5, 108, 0, 0, 757, 756, 1, 0, 0, 0, 757, 758, 1, 0, 0, 0, 758, 759,
    1, 0, 0, 0, 759, 763, 5, 93, 0, 0, 760, 762, 3, 40, 20, 0, 761, 760, 1, 0, 0, 0, 762, 765, 1, 0,
    0, 0, 763, 761, 1, 0, 0, 0, 763, 764, 1, 0, 0, 0, 764, 766, 1, 0, 0, 0, 765, 763, 1, 0, 0, 0,
    766, 767, 5, 120, 0, 0, 767, 768, 5, 93, 0, 0, 768, 79, 1, 0, 0, 0, 769, 771, 5, 106, 0, 0, 770,
    769, 1, 0, 0, 0, 770, 771, 1, 0, 0, 0, 771, 772, 1, 0, 0, 0, 772, 773, 3, 90, 45, 0, 773, 774,
    5, 82, 0, 0, 774, 776, 3, 120, 60, 0, 775, 777, 3, 34, 17, 0, 776, 775, 1, 0, 0, 0, 776, 777, 1,
    0, 0, 0, 777, 778, 1, 0, 0, 0, 778, 779, 5, 93, 0, 0, 779, 81, 1, 0, 0, 0, 780, 782, 5, 107, 0,
    0, 781, 780, 1, 0, 0, 0, 781, 782, 1, 0, 0, 0, 782, 783, 1, 0, 0, 0, 783, 784, 5, 43, 0, 0, 784,
    785, 3, 96, 48, 0, 785, 787, 5, 78, 0, 0, 786, 788, 3, 110, 55, 0, 787, 786, 1, 0, 0, 0, 787,
    788, 1, 0, 0, 0, 788, 789, 1, 0, 0, 0, 789, 790, 5, 79, 0, 0, 790, 791, 5, 68, 0, 0, 791, 792,
    3, 120, 60, 0, 792, 794, 5, 82, 0, 0, 793, 795, 3, 34, 17, 0, 794, 793, 1, 0, 0, 0, 794, 795, 1,
    0, 0, 0, 795, 796, 1, 0, 0, 0, 796, 800, 5, 93, 0, 0, 797, 799, 3, 40, 20, 0, 798, 797, 1, 0, 0,
    0, 799, 802, 1, 0, 0, 0, 800, 798, 1, 0, 0, 0, 800, 801, 1, 0, 0, 0, 801, 803, 1, 0, 0, 0, 802,
    800, 1, 0, 0, 0, 803, 804, 3, 72, 36, 0, 804, 806, 5, 110, 0, 0, 805, 807, 5, 108, 0, 0, 806,
    805, 1, 0, 0, 0, 806, 807, 1, 0, 0, 0, 807, 808, 1, 0, 0, 0, 808, 809, 5, 93, 0, 0, 809, 83, 1,
    0, 0, 0, 810, 812, 5, 107, 0, 0, 811, 810, 1, 0, 0, 0, 811, 812, 1, 0, 0, 0, 812, 813, 1, 0, 0,
    0, 813, 814, 5, 43, 0, 0, 814, 815, 3, 96, 48, 0, 815, 817, 5, 78, 0, 0, 816, 818, 3, 110, 55,
    0, 817, 816, 1, 0, 0, 0, 817, 818, 1, 0, 0, 0, 818, 819, 1, 0, 0, 0, 819, 820, 5, 79, 0, 0, 820,
    821, 5, 68, 0, 0, 821, 822, 5, 46, 0, 0, 822, 824, 5, 82, 0, 0, 823, 825, 3, 34, 17, 0, 824,
    823, 1, 0, 0, 0, 824, 825, 1, 0, 0, 0, 825, 826, 1, 0, 0, 0, 826, 830, 5, 93, 0, 0, 827, 829, 3,
    40, 20, 0, 828, 827, 1, 0, 0, 0, 829, 832, 1, 0, 0, 0, 830, 828, 1, 0, 0, 0, 830, 831, 1, 0, 0,
    0, 831, 833, 1, 0, 0, 0, 832, 830, 1, 0, 0, 0, 833, 835, 5, 113, 0, 0, 834, 836, 5, 108, 0, 0,
    835, 834, 1, 0, 0, 0, 835, 836, 1, 0, 0, 0, 836, 837, 1, 0, 0, 0, 837, 838, 5, 93, 0, 0, 838,
    85, 1, 0, 0, 0, 839, 841, 5, 106, 0, 0, 840, 839, 1, 0, 0, 0, 840, 841, 1, 0, 0, 0, 841, 842, 1,
    0, 0, 0, 842, 843, 5, 125, 0, 0, 843, 844, 5, 93, 0, 0, 844, 845, 5, 43, 0, 0, 845, 846, 3, 96,
    48, 0, 846, 848, 5, 78, 0, 0, 847, 849, 3, 110, 55, 0, 848, 847, 1, 0, 0, 0, 848, 849, 1, 0, 0,
    0, 849, 850, 1, 0, 0, 0, 850, 851, 5, 79, 0, 0, 851, 852, 5, 68, 0, 0, 852, 853, 3, 120, 60, 0,
    853, 854, 5, 82, 0, 0, 854, 855, 5, 93, 0, 0, 855, 857, 5, 47, 0, 0, 856, 858, 3, 34, 17, 0,
    857, 856, 1, 0, 0, 0, 857, 858, 1, 0, 0, 0, 858, 859, 1, 0, 0, 0, 859, 860, 5, 93, 0, 0, 860,
    87, 1, 0, 0, 0, 861, 863, 5, 106, 0, 0, 862, 861, 1, 0, 0, 0, 862, 863, 1, 0, 0, 0, 863, 864, 1,
    0, 0, 0, 864, 865, 5, 125, 0, 0, 865, 866, 5, 93, 0, 0, 866, 867, 5, 43, 0, 0, 867, 868, 3, 96,
    48, 0, 868, 870, 5, 78, 0, 0, 869, 871, 3, 110, 55, 0, 870, 869, 1, 0, 0, 0, 870, 871, 1, 0, 0,
    0, 871, 872, 1, 0, 0, 0, 872, 873, 5, 79, 0, 0, 873, 874, 5, 68, 0, 0, 874, 875, 5, 46, 0, 0,
    875, 876, 5, 82, 0, 0, 876, 877, 5, 93, 0, 0, 877, 879, 5, 47, 0, 0, 878, 880, 3, 34, 17, 0,
    879, 878, 1, 0, 0, 0, 879, 880, 1, 0, 0, 0, 880, 881, 1, 0, 0, 0, 881, 882, 5, 93, 0, 0, 882,
    89, 1, 0, 0, 0, 883, 884, 5, 96, 0, 0, 884, 91, 1, 0, 0, 0, 885, 886, 5, 96, 0, 0, 886, 93, 1,
    0, 0, 0, 887, 888, 6, 47, -1, 0, 888, 893, 3, 92, 46, 0, 889, 890, 5, 72, 0, 0, 890, 891, 5, 80,
    0, 0, 891, 893, 3, 92, 46, 0, 892, 887, 1, 0, 0, 0, 892, 889, 1, 0, 0, 0, 893, 898, 1, 0, 0, 0,
    894, 895, 10, 1, 0, 0, 895, 897, 3, 138, 69, 0, 896, 894, 1, 0, 0, 0, 897, 900, 1, 0, 0, 0, 898,
    896, 1, 0, 0, 0, 898, 899, 1, 0, 0, 0, 899, 95, 1, 0, 0, 0, 900, 898, 1, 0, 0, 0, 901, 902, 5,
    96, 0, 0, 902, 97, 1, 0, 0, 0, 903, 904, 5, 94, 0, 0, 904, 99, 1, 0, 0, 0, 905, 906, 5, 95, 0,
    0, 906, 101, 1, 0, 0, 0, 907, 915, 5, 53, 0, 0, 908, 915, 5, 54, 0, 0, 909, 915, 5, 55, 0, 0,
    910, 915, 5, 56, 0, 0, 911, 915, 5, 57, 0, 0, 912, 915, 5, 58, 0, 0, 913, 915, 5, 97, 0, 0, 914,
    907, 1, 0, 0, 0, 914, 908, 1, 0, 0, 0, 914, 909, 1, 0, 0, 0, 914, 910, 1, 0, 0, 0, 914, 911, 1,
    0, 0, 0, 914, 912, 1, 0, 0, 0, 914, 913, 1, 0, 0, 0, 915, 103, 1, 0, 0, 0, 916, 921, 3, 128, 64,
    0, 917, 921, 3, 130, 65, 0, 918, 921, 3, 132, 66, 0, 919, 921, 3, 134, 67, 0, 920, 916, 1, 0, 0,
    0, 920, 917, 1, 0, 0, 0, 920, 918, 1, 0, 0, 0, 920, 919, 1, 0, 0, 0, 921, 105, 1, 0, 0, 0, 922,
    927, 3, 108, 54, 0, 923, 924, 5, 81, 0, 0, 924, 926, 3, 108, 54, 0, 925, 923, 1, 0, 0, 0, 926,
    929, 1, 0, 0, 0, 927, 925, 1, 0, 0, 0, 927, 928, 1, 0, 0, 0, 928, 107, 1, 0, 0, 0, 929, 927, 1,
    0, 0, 0, 930, 933, 3, 182, 91, 0, 931, 933, 3, 140, 70, 0, 932, 930, 1, 0, 0, 0, 932, 931, 1, 0,
    0, 0, 933, 109, 1, 0, 0, 0, 934, 939, 3, 174, 87, 0, 935, 936, 5, 81, 0, 0, 936, 938, 3, 174,
    87, 0, 937, 935, 1, 0, 0, 0, 938, 941, 1, 0, 0, 0, 939, 937, 1, 0, 0, 0, 939, 940, 1, 0, 0, 0,
    940, 111, 1, 0, 0, 0, 941, 939, 1, 0, 0, 0, 942, 945, 3, 90, 45, 0, 943, 944, 5, 81, 0, 0, 944,
    946, 3, 90, 45, 0, 945, 943, 1, 0, 0, 0, 946, 947, 1, 0, 0, 0, 947, 945, 1, 0, 0, 0, 947, 948,
    1, 0, 0, 0, 948, 113, 1, 0, 0, 0, 949, 954, 3, 140, 70, 0, 950, 951, 5, 81, 0, 0, 951, 953, 3,
    140, 70, 0, 952, 950, 1, 0, 0, 0, 953, 956, 1, 0, 0, 0, 954, 952, 1, 0, 0, 0, 954, 955, 1, 0, 0,
    0, 955, 115, 1, 0, 0, 0, 956, 954, 1, 0, 0, 0, 957, 958, 3, 90, 45, 0, 958, 959, 5, 73, 0, 0,
    959, 960, 3, 130, 65, 0, 960, 117, 1, 0, 0, 0, 961, 966, 3, 116, 58, 0, 962, 963, 5, 93, 0, 0,
    963, 965, 3, 116, 58, 0, 964, 962, 1, 0, 0, 0, 965, 968, 1, 0, 0, 0, 966, 964, 1, 0, 0, 0, 966,
    967, 1, 0, 0, 0, 967, 119, 1, 0, 0, 0, 968, 966, 1, 0, 0, 0, 969, 974, 3, 180, 90, 0, 970, 974,
    3, 102, 51, 0, 971, 974, 3, 176, 88, 0, 972, 974, 3, 178, 89, 0, 973, 969, 1, 0, 0, 0, 973, 970,
    1, 0, 0, 0, 973, 971, 1, 0, 0, 0, 973, 972, 1, 0, 0, 0, 974, 121, 1, 0, 0, 0, 975, 976, 3, 140,
    70, 0, 976, 123, 1, 0, 0, 0, 977, 983, 3, 126, 63, 0, 978, 983, 3, 158, 79, 0, 979, 983, 3, 162,
    81, 0, 980, 983, 3, 150, 75, 0, 981, 983, 3, 160, 80, 0, 982, 977, 1, 0, 0, 0, 982, 978, 1, 0,
    0, 0, 982, 979, 1, 0, 0, 0, 982, 980, 1, 0, 0, 0, 982, 981, 1, 0, 0, 0, 983, 125, 1, 0, 0, 0,
    984, 991, 3, 128, 64, 0, 985, 991, 3, 130, 65, 0, 986, 991, 3, 132, 66, 0, 987, 991, 3, 134, 67,
    0, 988, 991, 3, 184, 92, 0, 989, 991, 3, 136, 68, 0, 990, 984, 1, 0, 0, 0, 990, 985, 1, 0, 0, 0,
    990, 986, 1, 0, 0, 0, 990, 987, 1, 0, 0, 0, 990, 988, 1, 0, 0, 0, 990, 989, 1, 0, 0, 0, 991,
    127, 1, 0, 0, 0, 992, 993, 7, 0, 0, 0, 993, 129, 1, 0, 0, 0, 994, 998, 5, 100, 0, 0, 995, 998,
    5, 98, 0, 0, 996, 998, 5, 99, 0, 0, 997, 994, 1, 0, 0, 0, 997, 995, 1, 0, 0, 0, 997, 996, 1, 0,
    0, 0, 998, 131, 1, 0, 0, 0, 999, 1000, 5, 101, 0, 0, 1000, 133, 1, 0, 0, 0, 1001, 1002, 7, 1, 0,
    0, 1002, 135, 1, 0, 0, 0, 1003, 1004, 3, 102, 51, 0, 1004, 1005, 5, 80, 0, 0, 1005, 1006, 3, 92,
    46, 0, 1006, 137, 1, 0, 0, 0, 1007, 1008, 5, 76, 0, 0, 1008, 1009, 3, 140, 70, 0, 1009, 1010, 5,
    77, 0, 0, 1010, 139, 1, 0, 0, 0, 1011, 1012, 6, 70, -1, 0, 1012, 1017, 3, 172, 86, 0, 1013,
    1017, 3, 150, 75, 0, 1014, 1017, 3, 142, 71, 0, 1015, 1017, 3, 156, 78, 0, 1016, 1011, 1, 0, 0,
    0, 1016, 1013, 1, 0, 0, 0, 1016, 1014, 1, 0, 0, 0, 1016, 1015, 1, 0, 0, 0, 1017, 1033, 1, 0, 0,
    0, 1018, 1019, 10, 1, 0, 0, 1019, 1020, 5, 5, 0, 0, 1020, 1025, 3, 140, 70, 0, 1021, 1022, 5, 2,
    0, 0, 1022, 1024, 3, 140, 70, 0, 1023, 1021, 1, 0, 0, 0, 1024, 1027, 1, 0, 0, 0, 1025, 1023, 1,
    0, 0, 0, 1025, 1026, 1, 0, 0, 0, 1026, 1028, 1, 0, 0, 0, 1027, 1025, 1, 0, 0, 0, 1028, 1029, 5,
    3, 0, 0, 1029, 1030, 3, 140, 70, 2, 1030, 1032, 1, 0, 0, 0, 1031, 1018, 1, 0, 0, 0, 1032, 1035,
    1, 0, 0, 0, 1033, 1031, 1, 0, 0, 0, 1033, 1034, 1, 0, 0, 0, 1034, 141, 1, 0, 0, 0, 1035, 1033,
    1, 0, 0, 0, 1036, 1037, 6, 71, -1, 0, 1037, 1046, 3, 146, 73, 0, 1038, 1046, 3, 148, 74, 0,
    1039, 1046, 3, 126, 63, 0, 1040, 1046, 3, 158, 79, 0, 1041, 1046, 3, 162, 81, 0, 1042, 1046, 3,
    160, 80, 0, 1043, 1046, 3, 92, 46, 0, 1044, 1046, 3, 168, 84, 0, 1045, 1036, 1, 0, 0, 0, 1045,
    1038, 1, 0, 0, 0, 1045, 1039, 1, 0, 0, 0, 1045, 1040, 1, 0, 0, 0, 1045, 1041, 1, 0, 0, 0, 1045,
    1042, 1, 0, 0, 0, 1045, 1043, 1, 0, 0, 0, 1045, 1044, 1, 0, 0, 0, 1046, 1054, 1, 0, 0, 0, 1047,
    1048, 10, 2, 0, 0, 1048, 1053, 3, 138, 69, 0, 1049, 1050, 10, 1, 0, 0, 1050, 1051, 5, 80, 0, 0,
    1051, 1053, 3, 144, 72, 0, 1052, 1047, 1, 0, 0, 0, 1052, 1049, 1, 0, 0, 0, 1053, 1056, 1, 0, 0,
    0, 1054, 1052, 1, 0, 0, 0, 1054, 1055, 1, 0, 0, 0, 1055, 143, 1, 0, 0, 0, 1056, 1054, 1, 0, 0,
    0, 1057, 1060, 3, 92, 46, 0, 1058, 1060, 3, 168, 84, 0, 1059, 1057, 1, 0, 0, 0, 1059, 1058, 1,
    0, 0, 0, 1060, 145, 1, 0, 0, 0, 1061, 1062, 5, 72, 0, 0, 1062, 147, 1, 0, 0, 0, 1063, 1064, 5,
    78, 0, 0, 1064, 1065, 3, 140, 70, 0, 1065, 1066, 5, 79, 0, 0, 1066, 149, 1, 0, 0, 0, 1067, 1070,
    3, 152, 76, 0, 1068, 1070, 3, 154, 77, 0, 1069, 1067, 1, 0, 0, 0, 1069, 1068, 1, 0, 0, 0, 1070,
    151, 1, 0, 0, 0, 1071, 1072, 5, 84, 0, 0, 1072, 1073, 3, 142, 71, 0, 1073, 153, 1, 0, 0, 0,
    1074, 1075, 5, 64, 0, 0, 1075, 1076, 3, 142, 71, 0, 1076, 155, 1, 0, 0, 0, 1077, 1078, 3, 142,
    71, 0, 1078, 1079, 3, 170, 85, 0, 1079, 1080, 3, 140, 70, 0, 1080, 157, 1, 0, 0, 0, 1081, 1082,
    5, 76, 0, 0, 1082, 1083, 3, 114, 57, 0, 1083, 1084, 5, 77, 0, 0, 1084, 159, 1, 0, 0, 0, 1085,
    1086, 5, 78, 0, 0, 1086, 1087, 3, 114, 57, 0, 1087, 1088, 5, 79, 0, 0, 1088, 161, 1, 0, 0, 0,
    1089, 1090, 5, 74, 0, 0, 1090, 1091, 3, 164, 82, 0, 1091, 1092, 5, 75, 0, 0, 1092, 163, 1, 0, 0,
    0, 1093, 1098, 3, 166, 83, 0, 1094, 1095, 5, 81, 0, 0, 1095, 1097, 3, 166, 83, 0, 1096, 1094, 1,
    0, 0, 0, 1097, 1100, 1, 0, 0, 0, 1098, 1096, 1, 0, 0, 0, 1098, 1099, 1, 0, 0, 0, 1099, 165, 1,
    0, 0, 0, 1100, 1098, 1, 0, 0, 0, 1101, 1102, 3, 140, 70, 0, 1102, 1103, 5, 82, 0, 0, 1103, 1104,
    3, 140, 70, 0, 1104, 167, 1, 0, 0, 0, 1105, 1106, 3, 96, 48, 0, 1106, 1108, 5, 78, 0, 0, 1107,
    1109, 3, 106, 53, 0, 1108, 1107, 1, 0, 0, 0, 1108, 1109, 1, 0, 0, 0, 1109, 1110, 1, 0, 0, 0,
    1110, 1111, 5, 79, 0, 0, 1111, 169, 1, 0, 0, 0, 1112, 1113, 7, 2, 0, 0, 1113, 171, 1, 0, 0, 0,
    1114, 1115, 3, 120, 60, 0, 1115, 1117, 5, 78, 0, 0, 1116, 1118, 3, 106, 53, 0, 1117, 1116, 1, 0,
    0, 0, 1117, 1118, 1, 0, 0, 0, 1118, 1119, 1, 0, 0, 0, 1119, 1120, 5, 79, 0, 0, 1120, 173, 1, 0,
    0, 0, 1121, 1124, 3, 90, 45, 0, 1122, 1124, 5, 72, 0, 0, 1123, 1121, 1, 0, 0, 0, 1123, 1122, 1,
    0, 0, 0, 1124, 1125, 1, 0, 0, 0, 1125, 1126, 5, 82, 0, 0, 1126, 1127, 3, 120, 60, 0, 1127, 175,
    1, 0, 0, 0, 1128, 1129, 3, 102, 51, 0, 1129, 1130, 5, 76, 0, 0, 1130, 1135, 3, 120, 60, 0, 1131,
    1132, 5, 81, 0, 0, 1132, 1134, 3, 120, 60, 0, 1133, 1131, 1, 0, 0, 0, 1134, 1137, 1, 0, 0, 0,
    1135, 1133, 1, 0, 0, 0, 1135, 1136, 1, 0, 0, 0, 1136, 1138, 1, 0, 0, 0, 1137, 1135, 1, 0, 0, 0,
    1138, 1139, 5, 77, 0, 0, 1139, 177, 1, 0, 0, 0, 1140, 1141, 5, 59, 0, 0, 1141, 1142, 5, 76, 0,
    0, 1142, 1143, 5, 76, 0, 0, 1143, 1148, 3, 120, 60, 0, 1144, 1145, 5, 81, 0, 0, 1145, 1147, 3,
    120, 60, 0, 1146, 1144, 1, 0, 0, 0, 1147, 1150, 1, 0, 0, 0, 1148, 1146, 1, 0, 0, 0, 1148, 1149,
    1, 0, 0, 0, 1149, 1151, 1, 0, 0, 0, 1150, 1148, 1, 0, 0, 0, 1151, 1152, 5, 77, 0, 0, 1152, 1153,
    5, 81, 0, 0, 1153, 1154, 3, 120, 60, 0, 1154, 1155, 5, 77, 0, 0, 1155, 179, 1, 0, 0, 0, 1156,
    1157, 5, 52, 0, 0, 1157, 1158, 5, 76, 0, 0, 1158, 1161, 3, 120, 60, 0, 1159, 1160, 5, 81, 0, 0,
    1160, 1162, 3, 120, 60, 0, 1161, 1159, 1, 0, 0, 0, 1162, 1163, 1, 0, 0, 0, 1163, 1161, 1, 0, 0,
    0, 1163, 1164, 1, 0, 0, 0, 1164, 1165, 1, 0, 0, 0, 1165, 1166, 5, 77, 0, 0, 1166, 181, 1, 0, 0,
    0, 1167, 1168, 5, 7, 0, 0, 1168, 1169, 3, 110, 55, 0, 1169, 1170, 5, 82, 0, 0, 1170, 1171, 3,
    140, 70, 0, 1171, 183, 1, 0, 0, 0, 1172, 1173, 5, 103, 0, 0, 1173, 185, 1, 0, 0, 0, 141, 187,
    192, 196, 201, 209, 220, 223, 236, 241, 250, 256, 263, 269, 275, 280, 292, 297, 310, 316, 325,
    328, 334, 341, 347, 352, 357, 363, 368, 377, 384, 389, 397, 401, 408, 413, 421, 424, 431, 437,
    443, 448, 458, 461, 471, 485, 496, 499, 508, 517, 523, 530, 534, 538, 545, 549, 555, 561, 565,
    568, 573, 579, 583, 586, 592, 598, 603, 608, 616, 622, 627, 632, 636, 641, 646, 653, 657, 664,
    668, 676, 682, 686, 689, 697, 703, 706, 717, 724, 731, 738, 741, 747, 754, 757, 763, 770, 776,
    781, 787, 794, 800, 806, 811, 817, 824, 830, 835, 840, 848, 857, 862, 870, 879, 892, 898, 914,
    920, 927, 932, 939, 947, 954, 966, 973, 982, 990, 997, 1016, 1025, 1033, 1045, 1052, 1054, 1059,
    1069, 1098, 1108, 1117, 1123, 1135, 1148, 1163,
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
    return PythonParser.RULE_globalBlock;
  }
  public override enterRule(listener: PythonListener): void {
    if (listener.enterGlobalBlock) {
      listener.enterGlobalBlock(this);
    }
  }
  public override exitRule(listener: PythonListener): void {
    if (listener.exitGlobalBlock) {
      listener.exitGlobalBlock(this);
    }
  }
  public override accept<Result>(visitor: PythonVisitor<Result>): Result | null {
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
    return PythonParser.RULE_statementBlock;
  }
  public override enterRule(listener: PythonListener): void {
    if (listener.enterStatementBlock) {
      listener.enterStatementBlock(this);
    }
  }
  public override exitRule(listener: PythonListener): void {
    if (listener.exitStatementBlock) {
      listener.exitStatementBlock(this);
    }
  }
  public override accept<Result>(visitor: PythonVisitor<Result>): Result | null {
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
    return PythonParser.RULE_selectableStatement;
  }
  public override enterRule(listener: PythonListener): void {
    if (listener.enterSelectableStatement) {
      listener.enterSelectableStatement(this);
    }
  }
  public override exitRule(listener: PythonListener): void {
    if (listener.exitSelectableStatement) {
      listener.exitSelectableStatement(this);
    }
  }
  public override accept<Result>(visitor: PythonVisitor<Result>): Result | null {
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
    return PythonParser.RULE_memberBlock;
  }
  public override enterRule(listener: PythonListener): void {
    if (listener.enterMemberBlock) {
      listener.enterMemberBlock(this);
    }
  }
  public override exitRule(listener: PythonListener): void {
    if (listener.exitMemberBlock) {
      listener.exitMemberBlock(this);
    }
  }
  public override accept<Result>(visitor: PythonVisitor<Result>): Result | null {
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
    return PythonParser.RULE_selectableMember;
  }
  public override enterRule(listener: PythonListener): void {
    if (listener.enterSelectableMember) {
      listener.enterSelectableMember(this);
    }
  }
  public override exitRule(listener: PythonListener): void {
    if (listener.exitSelectableMember) {
      listener.exitSelectableMember(this);
    }
  }
  public override accept<Result>(visitor: PythonVisitor<Result>): Result | null {
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
export class DictTypeNameContext extends TypeNameContext {
  public constructor(ctx: TypeNameContext) {
    super(ctx.parent, ctx.invokingState);
    super.copyFrom(ctx);
  }
  public DICT_NAME(): antlr.TerminalNode {
    return this.getToken(PythonParser.DICT_NAME, 0)!;
  }
  public override enterRule(listener: PythonListener): void {
    if (listener.enterDictTypeName) {
      listener.enterDictTypeName(this);
    }
  }
  public override exitRule(listener: PythonListener): void {
    if (listener.exitDictTypeName) {
      listener.exitDictTypeName(this);
    }
  }
  public override accept<Result>(visitor: PythonVisitor<Result>): Result | null {
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
