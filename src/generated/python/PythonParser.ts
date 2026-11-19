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
  public static readonly PROCEDURE = 30;
  public static readonly PROPERTY = 31;
  public static readonly RETURNS = 32;
  public static readonly SET = 33;
  public static readonly STEP = 34;
  public static readonly TEST = 35;
  public static readonly THEN = 36;
  public static readonly THROW = 37;
  public static readonly TO = 38;
  public static readonly VARIABLE = 39;
  public static readonly ASSERT_EQUAL = 40;
  public static readonly AS = 41;
  public static readonly DEF = 42;
  public static readonly EXCEPT = 43;
  public static readonly INIT = 44;
  public static readonly NONE = 45;
  public static readonly PASS = 46;
  public static readonly RAISE = 47;
  public static readonly ABC = 48;
  public static readonly ENUM = 49;
  public static readonly TESTCASE = 50;
  public static readonly TUPLE = 51;
  public static readonly INT_NAME = 52;
  public static readonly FLOAT_NAME = 53;
  public static readonly BOOL_NAME = 54;
  public static readonly STRING_NAME = 55;
  public static readonly LIST_NAME = 56;
  public static readonly DICT_NAME = 57;
  public static readonly FUNC_NAME = 58;
  public static readonly TRUE = 59;
  public static readonly FALSE = 60;
  public static readonly AND = 61;
  public static readonly OR = 62;
  public static readonly NOT = 63;
  public static readonly EQUAL = 64;
  public static readonly NOT_EQUAL = 65;
  public static readonly REF_EQUAL = 66;
  public static readonly REF_NOT_EQUAL = 67;
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
  public static readonly START_INTERPOLATED_STRING = 102;
  public static readonly LITERAL_STRING = 103;
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
  public static readonly PRIVATE_ANNOTATION = 125;
  public static readonly ABSTRACT_METHOD = 126;
  public static readonly COMMENT = 127;
  public static readonly Grapheme = 128;
  public static readonly EscapedLeftBrace = 129;
  public static readonly EscapedDoubleQuotes = 130;
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
  public static readonly RULE_interpolatedString = 68;
  public static readonly RULE_segment = 69;
  public static readonly RULE_interpolatedStringText = 70;
  public static readonly RULE_interpolatedStringExpression = 71;
  public static readonly RULE_enumValue = 72;
  public static readonly RULE_index = 73;
  public static readonly RULE_expression = 74;
  public static readonly RULE_term = 75;
  public static readonly RULE_chainable = 76;
  public static readonly RULE_thisInstance = 77;
  public static readonly RULE_bracketedExpression = 78;
  public static readonly RULE_unaryExpression = 79;
  public static readonly RULE_negateNumeric = 80;
  public static readonly RULE_negateLogical = 81;
  public static readonly RULE_binaryExpression = 82;
  public static readonly RULE_list = 83;
  public static readonly RULE_tuple = 84;
  public static readonly RULE_dictionary = 85;
  public static readonly RULE_kvpList = 86;
  public static readonly RULE_kvp = 87;
  public static readonly RULE_methodCall = 88;
  public static readonly RULE_binaryOperator = 89;
  public static readonly RULE_newInstance = 90;
  public static readonly RULE_paramDef = 91;
  public static readonly RULE_typeGeneric = 92;
  public static readonly RULE_typeFunc = 93;
  public static readonly RULE_typeTuple = 94;
  public static readonly RULE_lambda = 95;

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
    "'is'",
    "'not is'",
    "'%'",
    "'->'",
    "'**'",
    "'0b'",
    "'0x'",
    "'self'",
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
    "'f\"'",
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
    "'# private'",
    "'@abstractmethod'",
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
    "REF_EQUAL",
    "REF_NOT_EQUAL",
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
    "PRIVATE_ANNOTATION",
    "ABSTRACT_METHOD",
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
    "interpolatedString",
    "segment",
    "interpolatedStringText",
    "interpolatedStringExpression",
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
        this.state = 193;
        this.errorHandler.sync(this);
        switch (this.interpreter.adaptivePredict(this.tokenStream, 0, this.context)) {
          case 1:
            {
              this.state = 192;
              this.comment();
            }
            break;
        }
        this.state = 198;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (
          _la === 1 ||
          _la === 42 ||
          (((_la - 96) & ~0x1f) === 0 && ((1 << (_la - 96)) & 2147486721) !== 0)
        ) {
          {
            {
              this.state = 195;
              this.global();
            }
          }
          this.state = 200;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 202;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 8) {
          {
            this.state = 201;
            this.mainCall();
          }
        }

        this.state = 207;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (_la === 94) {
          {
            {
              this.state = 204;
              this.match(PythonParser.NL);
            }
          }
          this.state = 209;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 210;
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
        this.state = 213;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        do {
          {
            {
              this.state = 212;
              this.global();
            }
          }
          this.state = 215;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        } while (
          _la === 1 ||
          _la === 42 ||
          (((_la - 96) & ~0x1f) === 0 && ((1 << (_la - 96)) & 2147486721) !== 0)
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
      this.state = 226;
      this.errorHandler.sync(this);
      switch (this.interpreter.adaptivePredict(this.tokenStream, 5, this.context)) {
        case 1:
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 217;
            this.main();
          }
          break;
        case 2:
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 218;
            this.function_();
          }
          break;
        case 3:
          this.enterOuterAlt(localContext, 3);
          {
            this.state = 219;
            this.test();
          }
          break;
        case 4:
          this.enterOuterAlt(localContext, 4);
          {
            this.state = 220;
            this.procedure();
          }
          break;
        case 5:
          this.enterOuterAlt(localContext, 5);
          {
            this.state = 221;
            this.constant();
          }
          break;
        case 6:
          this.enterOuterAlt(localContext, 6);
          {
            this.state = 222;
            this.enum_();
          }
          break;
        case 7:
          this.enterOuterAlt(localContext, 7);
          {
            this.state = 223;
            this.concreteClass();
          }
          break;
        case 8:
          this.enterOuterAlt(localContext, 8);
          {
            this.state = 224;
            this.abstractClass();
          }
          break;
        case 9:
          this.enterOuterAlt(localContext, 9);
          {
            this.state = 225;
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
        this.state = 229;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 107) {
          {
            this.state = 228;
            this.match(PythonParser.GHOSTED_BLOCK_START);
          }
        }

        this.state = 231;
        this.match(PythonParser.DEF);
        this.state = 232;
        this.match(PythonParser.MAIN);
        this.state = 233;
        this.match(PythonParser.OPEN_BRACKET);
        this.state = 234;
        this.match(PythonParser.CLOSE_BRACKET);
        this.state = 235;
        this.match(PythonParser.ARROW);
        this.state = 236;
        this.match(PythonParser.NONE);
        this.state = 237;
        this.match(PythonParser.COLON);
        this.state = 238;
        this.match(PythonParser.NL);
        this.state = 242;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (
          ((_la & ~0x1f) === 0 && ((1 << _la) & 3120) !== 0) ||
          (((_la - 47) & ~0x1f) === 0 && ((1 << (_la - 47)) & 1409300449) !== 0) ||
          (((_la - 79) & ~0x1f) === 0 && ((1 << (_la - 79)) & 436076545) !== 0) ||
          _la === 127
        ) {
          {
            {
              this.state = 239;
              this.ordinaryStatement();
            }
          }
          this.state = 244;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 245;
        this.match(PythonParser.END_MAIN);
        this.state = 247;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 108) {
          {
            this.state = 246;
            this.match(PythonParser.GHOSTED_BLOCK_END);
          }
        }

        this.state = 249;
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
        this.state = 251;
        this.match(PythonParser.MAIN);
        this.state = 252;
        this.match(PythonParser.OPEN_BRACKET);
        this.state = 253;
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
        this.state = 256;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 107) {
          {
            this.state = 255;
            this.match(PythonParser.GHOSTED_BLOCK_START);
          }
        }

        this.state = 258;
        this.match(PythonParser.DEF);
        this.state = 259;
        this.methodName();
        this.state = 260;
        this.match(PythonParser.OPEN_BRACKET);
        this.state = 262;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 73 || _la === 96) {
          {
            this.state = 261;
            this.paramList();
          }
        }

        this.state = 264;
        this.match(PythonParser.CLOSE_BRACKET);
        this.state = 265;
        this.match(PythonParser.ARROW);
        this.state = 266;
        this.type_();
        this.state = 267;
        this.match(PythonParser.COLON);
        this.state = 269;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 127) {
          {
            this.state = 268;
            this.commentText();
          }
        }

        this.state = 271;
        this.match(PythonParser.NL);
        this.state = 275;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (
          ((_la & ~0x1f) === 0 && ((1 << _la) & 3120) !== 0) ||
          (((_la - 47) & ~0x1f) === 0 && ((1 << (_la - 47)) & 1409300449) !== 0) ||
          (((_la - 79) & ~0x1f) === 0 && ((1 << (_la - 79)) & 436076545) !== 0) ||
          _la === 127
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
        this.returnStatement();
        this.state = 279;
        this.match(PythonParser.END_FUNCTION);
        this.state = 281;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 108) {
          {
            this.state = 280;
            this.match(PythonParser.GHOSTED_BLOCK_END);
          }
        }

        this.state = 283;
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
        this.state = 286;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 107) {
          {
            this.state = 285;
            this.match(PythonParser.GHOSTED_BLOCK_START);
          }
        }

        this.state = 288;
        this.match(PythonParser.CLASS);
        this.state = 289;
        this.testClassName();
        this.state = 290;
        this.match(PythonParser.OPEN_BRACKET);
        this.state = 291;
        this.match(PythonParser.TESTCASE);
        this.state = 292;
        this.match(PythonParser.CLOSE_BRACKET);
        this.state = 293;
        this.match(PythonParser.COLON);
        this.state = 294;
        this.match(PythonParser.NL);
        this.state = 295;
        this.testFunction();
        this.state = 296;
        this.match(PythonParser.END_TEST_CLASS);
        this.state = 298;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 108) {
          {
            this.state = 297;
            this.match(PythonParser.GHOSTED_BLOCK_END);
          }
        }

        this.state = 300;
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
        this.state = 303;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 107) {
          {
            this.state = 302;
            this.match(PythonParser.GHOSTED_BLOCK_START);
          }
        }

        this.state = 305;
        this.match(PythonParser.DEF);
        this.state = 306;
        this.testName();
        this.state = 307;
        this.match(PythonParser.OPEN_BRACKET);
        this.state = 308;
        this.match(PythonParser.THIS_INSTANCE);
        this.state = 309;
        this.match(PythonParser.COLON);
        this.state = 310;
        this.testClassName();
        this.state = 311;
        this.match(PythonParser.CLOSE_BRACKET);
        this.state = 312;
        this.match(PythonParser.ARROW);
        this.state = 313;
        this.match(PythonParser.NONE);
        this.state = 314;
        this.match(PythonParser.COLON);
        this.state = 316;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 127) {
          {
            this.state = 315;
            this.commentText();
          }
        }

        this.state = 318;
        this.match(PythonParser.NL);
        this.state = 322;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (_la === 73 || _la === 96 || _la === 106 || _la === 127) {
          {
            {
              this.state = 319;
              this.testStatement();
            }
          }
          this.state = 324;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 325;
        this.match(PythonParser.END_TEST);
        this.state = 326;
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
      this.state = 331;
      this.errorHandler.sync(this);
      switch (this.interpreter.adaptivePredict(this.tokenStream, 19, this.context)) {
        case 1:
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 328;
            this.assert();
          }
          break;
        case 2:
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 329;
            this.variableDefinition();
          }
          break;
        case 3:
          this.enterOuterAlt(localContext, 3);
          {
            this.state = 330;
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
        this.state = 334;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 107) {
          {
            this.state = 333;
            this.match(PythonParser.GHOSTED_BLOCK_START);
          }
        }

        this.state = 336;
        this.match(PythonParser.DEF);
        this.state = 337;
        this.methodName();
        this.state = 338;
        this.match(PythonParser.OPEN_BRACKET);
        this.state = 340;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 73 || _la === 96) {
          {
            this.state = 339;
            this.paramList();
          }
        }

        this.state = 342;
        this.match(PythonParser.CLOSE_BRACKET);
        this.state = 343;
        this.match(PythonParser.ARROW);
        this.state = 344;
        this.match(PythonParser.NONE);
        this.state = 345;
        this.match(PythonParser.COLON);
        this.state = 347;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 127) {
          {
            this.state = 346;
            this.commentText();
          }
        }

        this.state = 349;
        this.match(PythonParser.NL);
        this.state = 353;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (
          ((_la & ~0x1f) === 0 && ((1 << _la) & 3120) !== 0) ||
          (((_la - 47) & ~0x1f) === 0 && ((1 << (_la - 47)) & 1409300449) !== 0) ||
          (((_la - 79) & ~0x1f) === 0 && ((1 << (_la - 79)) & 436076545) !== 0) ||
          _la === 127
        ) {
          {
            {
              this.state = 350;
              this.ordinaryStatement();
            }
          }
          this.state = 355;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 356;
        this.match(PythonParser.END_PROCEDURE);
        this.state = 358;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 108) {
          {
            this.state = 357;
            this.match(PythonParser.GHOSTED_BLOCK_END);
          }
        }

        this.state = 360;
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
        this.state = 363;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 106) {
          {
            this.state = 362;
            this.match(PythonParser.GHOSTED_LINE);
          }
        }

        this.state = 365;
        this.identifierDef();
        this.state = 366;
        this.match(PythonParser.SINGLE_EQUALS);
        this.state = 367;
        this.constantValue();
        this.state = 369;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 127) {
          {
            this.state = 368;
            this.commentText();
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
  public enum_(): EnumContext {
    let localContext = new EnumContext(this.context, this.state);
    this.enterRule(localContext, 22, PythonParser.RULE_enum);
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
        this.typeName();
        this.state = 378;
        this.match(PythonParser.OPEN_BRACKET);
        this.state = 379;
        this.match(PythonParser.ENUM);
        this.state = 380;
        this.match(PythonParser.CLOSE_BRACKET);
        this.state = 381;
        this.match(PythonParser.COLON);
        this.state = 383;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 127) {
          {
            this.state = 382;
            this.commentText();
          }
        }

        this.state = 385;
        this.match(PythonParser.NL);
        this.state = 386;
        this.enumList();
        this.state = 387;
        this.match(PythonParser.NL);
        this.state = 388;
        this.match(PythonParser.END_ENUM);
        this.state = 390;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 108) {
          {
            this.state = 389;
            this.match(PythonParser.GHOSTED_BLOCK_END);
          }
        }

        this.state = 392;
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
        this.state = 395;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 107) {
          {
            this.state = 394;
            this.match(PythonParser.GHOSTED_BLOCK_START);
          }
        }

        this.state = 397;
        this.match(PythonParser.CLASS);
        this.state = 398;
        localContext._classTypeName = this.typeName();
        this.state = 403;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 79) {
          {
            this.state = 399;
            this.match(PythonParser.OPEN_BRACKET);
            this.state = 400;
            localContext._inheritsTypeName = this.typeName();
            this.state = 401;
            this.match(PythonParser.CLOSE_BRACKET);
          }
        }

        this.state = 405;
        this.match(PythonParser.COLON);
        this.state = 407;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 127) {
          {
            this.state = 406;
            this.commentText();
          }
        }

        this.state = 409;
        this.match(PythonParser.NL);
        this.state = 410;
        this.constructorMember();
        this.state = 414;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (
          _la === 42 ||
          (((_la - 96) & ~0x1f) === 0 && ((1 << (_la - 96)) & 2147486721) !== 0)
        ) {
          {
            {
              this.state = 411;
              this.concreteClassMember();
            }
          }
          this.state = 416;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 417;
        this.match(PythonParser.END_CLASS);
        this.state = 419;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 108) {
          {
            this.state = 418;
            this.match(PythonParser.GHOSTED_BLOCK_END);
          }
        }

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
  public concreteClassMember(): ConcreteClassMemberContext {
    let localContext = new ConcreteClassMemberContext(this.context, this.state);
    this.enterRule(localContext, 26, PythonParser.RULE_concreteClassMember);
    try {
      this.state = 427;
      this.errorHandler.sync(this);
      switch (this.interpreter.adaptivePredict(this.tokenStream, 35, this.context)) {
        case 1:
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 423;
            this.property();
          }
          break;
        case 2:
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 424;
            this.functionMethod();
          }
          break;
        case 3:
          this.enterOuterAlt(localContext, 3);
          {
            this.state = 425;
            this.procedureMethod();
          }
          break;
        case 4:
          this.enterOuterAlt(localContext, 4);
          {
            this.state = 426;
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
        this.state = 430;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 107) {
          {
            this.state = 429;
            this.match(PythonParser.GHOSTED_BLOCK_START);
          }
        }

        this.state = 432;
        this.match(PythonParser.CLASS);
        this.state = 433;
        localContext._classTypeName = this.typeName();
        {
          this.state = 434;
          this.match(PythonParser.OPEN_BRACKET);
          this.state = 437;
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
                this.state = 435;
                localContext._inheritsTypeName = this.typeName();
              }
              break;
            case PythonParser.ABC:
              {
                this.state = 436;
                this.match(PythonParser.ABC);
              }
              break;
            default:
              throw new antlr.NoViableAltException(this);
          }
          this.state = 439;
          this.match(PythonParser.CLOSE_BRACKET);
        }
        this.state = 441;
        this.match(PythonParser.COLON);
        this.state = 443;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 127) {
          {
            this.state = 442;
            this.commentText();
          }
        }

        this.state = 445;
        this.match(PythonParser.NL);
        this.state = 449;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (
          _la === 42 ||
          (((_la - 96) & ~0x1f) === 0 && ((1 << (_la - 96)) & 3221228545) !== 0)
        ) {
          {
            {
              this.state = 446;
              this.abstractClassMember();
            }
          }
          this.state = 451;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 452;
        this.match(PythonParser.END_CLASS);
        this.state = 454;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 108) {
          {
            this.state = 453;
            this.match(PythonParser.GHOSTED_BLOCK_END);
          }
        }

        this.state = 456;
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
      this.state = 464;
      this.errorHandler.sync(this);
      switch (this.interpreter.adaptivePredict(this.tokenStream, 41, this.context)) {
        case 1:
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 458;
            this.property();
          }
          break;
        case 2:
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 459;
            this.functionMethod();
          }
          break;
        case 3:
          this.enterOuterAlt(localContext, 3);
          {
            this.state = 460;
            this.procedureMethod();
          }
          break;
        case 4:
          this.enterOuterAlt(localContext, 4);
          {
            this.state = 461;
            this.abstractFunction();
          }
          break;
        case 5:
          this.enterOuterAlt(localContext, 5);
          {
            this.state = 462;
            this.abstractProcedure();
          }
          break;
        case 6:
          this.enterOuterAlt(localContext, 6);
          {
            this.state = 463;
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
        this.state = 467;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 106) {
          {
            this.state = 466;
            this.match(PythonParser.GHOSTED_LINE);
          }
        }

        this.state = 469;
        this.commentText();
        this.state = 470;
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
        this.state = 472;
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
        this.state = 475;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        do {
          {
            {
              this.state = 474;
              this.selectableStatement();
            }
          }
          this.state = 477;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        } while (
          ((_la & ~0x1f) === 0 && ((1 << _la) & 3132) !== 0) ||
          (((_la - 43) & ~0x1f) === 0 && ((1 << (_la - 43)) & 1073970705) !== 0) ||
          (((_la - 75) & ~0x1f) === 0 && ((1 << (_la - 75)) & 2682257429) !== 0) ||
          _la === 107 ||
          _la === 127
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
      this.state = 492;
      this.errorHandler.sync(this);
      switch (this.interpreter.adaptivePredict(this.tokenStream, 44, this.context)) {
        case 1:
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 479;
            this.variableDefinition();
          }
          break;
        case 2:
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 480;
            this.assert();
          }
          break;
        case 3:
          this.enterOuterAlt(localContext, 3);
          {
            this.state = 481;
            this.assignment();
          }
          break;
        case 4:
          this.enterOuterAlt(localContext, 4);
          {
            this.state = 482;
            this.ifStatement();
          }
          break;
        case 5:
          this.enterOuterAlt(localContext, 5);
          {
            this.state = 483;
            this.elseIfClause();
          }
          break;
        case 6:
          this.enterOuterAlt(localContext, 6);
          {
            this.state = 484;
            this.elseClause();
          }
          break;
        case 7:
          this.enterOuterAlt(localContext, 7);
          {
            this.state = 485;
            this.whileLoop();
          }
          break;
        case 8:
          this.enterOuterAlt(localContext, 8);
          {
            this.state = 486;
            this.forLoop();
          }
          break;
        case 9:
          this.enterOuterAlt(localContext, 9);
          {
            this.state = 487;
            this.procedureCall();
          }
          break;
        case 10:
          this.enterOuterAlt(localContext, 10);
          {
            this.state = 488;
            this.tryStatement();
          }
          break;
        case 11:
          this.enterOuterAlt(localContext, 11);
          {
            this.state = 489;
            this.catchClause();
          }
          break;
        case 12:
          this.enterOuterAlt(localContext, 12);
          {
            this.state = 490;
            this.throwStatement();
          }
          break;
        case 13:
          this.enterOuterAlt(localContext, 13);
          {
            this.state = 491;
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
      this.state = 503;
      this.errorHandler.sync(this);
      switch (this.interpreter.adaptivePredict(this.tokenStream, 45, this.context)) {
        case 1:
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 494;
            this.variableDefinition();
          }
          break;
        case 2:
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 495;
            this.assignment();
          }
          break;
        case 3:
          this.enterOuterAlt(localContext, 3);
          {
            this.state = 496;
            this.ifStatement();
          }
          break;
        case 4:
          this.enterOuterAlt(localContext, 4);
          {
            this.state = 497;
            this.whileLoop();
          }
          break;
        case 5:
          this.enterOuterAlt(localContext, 5);
          {
            this.state = 498;
            this.forLoop();
          }
          break;
        case 6:
          this.enterOuterAlt(localContext, 6);
          {
            this.state = 499;
            this.procedureCall();
          }
          break;
        case 7:
          this.enterOuterAlt(localContext, 7);
          {
            this.state = 500;
            this.tryStatement();
          }
          break;
        case 8:
          this.enterOuterAlt(localContext, 8);
          {
            this.state = 501;
            this.throwStatement();
          }
          break;
        case 9:
          this.enterOuterAlt(localContext, 9);
          {
            this.state = 502;
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
        this.state = 506;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 106) {
          {
            this.state = 505;
            this.match(PythonParser.GHOSTED_LINE);
          }
        }

        this.state = 508;
        this.identifierDef();
        this.state = 509;
        this.match(PythonParser.SINGLE_EQUALS);
        this.state = 510;
        this.expression(0);
        this.state = 511;
        this.match(PythonParser.VARIABLE_DEFINITION_ANNOTATION);
        this.state = 512;
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
        this.state = 515;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 106) {
          {
            this.state = 514;
            this.match(PythonParser.GHOSTED_LINE);
          }
        }

        this.state = 517;
        this.assignable(0);
        this.state = 518;
        this.match(PythonParser.SINGLE_EQUALS);
        this.state = 519;
        this.expression(0);
        this.state = 520;
        this.match(PythonParser.ASSIGNMENT_ANNOTATION);
        this.state = 521;
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
        this.state = 524;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 107) {
          {
            this.state = 523;
            this.match(PythonParser.GHOSTED_BLOCK_START);
          }
        }

        this.state = 526;
        this.match(PythonParser.IF);
        this.state = 527;
        localContext._condition = this.expression(0);
        this.state = 528;
        this.match(PythonParser.COLON);
        this.state = 530;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 127) {
          {
            this.state = 529;
            this.commentText();
          }
        }

        this.state = 532;
        this.match(PythonParser.NL);
        this.state = 533;
        this.thenClause();
        this.state = 537;
        this.errorHandler.sync(this);
        alternative = this.interpreter.adaptivePredict(this.tokenStream, 50, this.context);
        while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
          if (alternative === 1) {
            {
              {
                this.state = 534;
                this.elseIfClause();
              }
            }
          }
          this.state = 539;
          this.errorHandler.sync(this);
          alternative = this.interpreter.adaptivePredict(this.tokenStream, 50, this.context);
        }
        this.state = 541;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 3 || _la === 107) {
          {
            this.state = 540;
            this.elseClause();
          }
        }

        this.state = 543;
        this.match(PythonParser.END_IF);
        this.state = 545;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 108) {
          {
            this.state = 544;
            this.match(PythonParser.GHOSTED_BLOCK_END);
          }
        }

        this.state = 547;
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
        this.state = 552;
        this.errorHandler.sync(this);
        alternative = this.interpreter.adaptivePredict(this.tokenStream, 53, this.context);
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
        this.state = 556;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 107) {
          {
            this.state = 555;
            this.match(PythonParser.GHOSTED_BLOCK_START);
          }
        }

        this.state = 558;
        this.match(PythonParser.ELIF);
        this.state = 559;
        this.expression(0);
        this.state = 560;
        this.match(PythonParser.COLON);
        this.state = 562;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 127) {
          {
            this.state = 561;
            this.commentText();
          }
        }

        this.state = 564;
        this.match(PythonParser.NL);
        this.state = 568;
        this.errorHandler.sync(this);
        alternative = this.interpreter.adaptivePredict(this.tokenStream, 56, this.context);
        while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
          if (alternative === 1) {
            {
              {
                this.state = 565;
                this.ordinaryStatement();
              }
            }
          }
          this.state = 570;
          this.errorHandler.sync(this);
          alternative = this.interpreter.adaptivePredict(this.tokenStream, 56, this.context);
        }
        this.state = 572;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 108) {
          {
            this.state = 571;
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
        this.state = 575;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 107) {
          {
            this.state = 574;
            this.match(PythonParser.GHOSTED_BLOCK_START);
          }
        }

        this.state = 577;
        this.match(PythonParser.ELSE);
        this.state = 578;
        this.match(PythonParser.COLON);
        this.state = 580;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 127) {
          {
            this.state = 579;
            this.commentText();
          }
        }

        this.state = 582;
        this.match(PythonParser.NL);
        this.state = 586;
        this.errorHandler.sync(this);
        alternative = this.interpreter.adaptivePredict(this.tokenStream, 60, this.context);
        while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
          if (alternative === 1) {
            {
              {
                this.state = 583;
                this.ordinaryStatement();
              }
            }
          }
          this.state = 588;
          this.errorHandler.sync(this);
          alternative = this.interpreter.adaptivePredict(this.tokenStream, 60, this.context);
        }
        this.state = 590;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 108) {
          {
            this.state = 589;
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
        this.state = 593;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 107) {
          {
            this.state = 592;
            this.match(PythonParser.GHOSTED_BLOCK_START);
          }
        }

        this.state = 595;
        this.match(PythonParser.WHILE);
        this.state = 596;
        this.expression(0);
        this.state = 597;
        this.match(PythonParser.COLON);
        this.state = 599;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 127) {
          {
            this.state = 598;
            this.commentText();
          }
        }

        this.state = 601;
        this.match(PythonParser.NL);
        this.state = 605;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (
          ((_la & ~0x1f) === 0 && ((1 << _la) & 3120) !== 0) ||
          (((_la - 47) & ~0x1f) === 0 && ((1 << (_la - 47)) & 1409300449) !== 0) ||
          (((_la - 79) & ~0x1f) === 0 && ((1 << (_la - 79)) & 436076545) !== 0) ||
          _la === 127
        ) {
          {
            {
              this.state = 602;
              this.ordinaryStatement();
            }
          }
          this.state = 607;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 608;
        this.match(PythonParser.END_WHILE);
        this.state = 610;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 108) {
          {
            this.state = 609;
            this.match(PythonParser.GHOSTED_BLOCK_END);
          }
        }

        this.state = 612;
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
        this.state = 615;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 107) {
          {
            this.state = 614;
            this.match(PythonParser.GHOSTED_BLOCK_START);
          }
        }

        this.state = 617;
        this.match(PythonParser.FOR);
        this.state = 618;
        this.identifierDef();
        this.state = 619;
        this.match(PythonParser.IN);
        this.state = 620;
        this.expression(0);
        this.state = 621;
        this.match(PythonParser.COLON);
        this.state = 623;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 127) {
          {
            this.state = 622;
            this.commentText();
          }
        }

        this.state = 625;
        this.match(PythonParser.NL);
        this.state = 629;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (
          ((_la & ~0x1f) === 0 && ((1 << _la) & 3120) !== 0) ||
          (((_la - 47) & ~0x1f) === 0 && ((1 << (_la - 47)) & 1409300449) !== 0) ||
          (((_la - 79) & ~0x1f) === 0 && ((1 << (_la - 79)) & 436076545) !== 0) ||
          _la === 127
        ) {
          {
            {
              this.state = 626;
              this.ordinaryStatement();
            }
          }
          this.state = 631;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 632;
        this.match(PythonParser.END_FOR);
        this.state = 634;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 108) {
          {
            this.state = 633;
            this.match(PythonParser.GHOSTED_BLOCK_END);
          }
        }

        this.state = 636;
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
        this.state = 639;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 106) {
          {
            this.state = 638;
            this.match(PythonParser.GHOSTED_LINE);
          }
        }

        this.state = 641;
        this.term(0);
        this.state = 643;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 127) {
          {
            this.state = 642;
            this.commentText();
          }
        }

        this.state = 645;
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
        this.state = 648;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 107) {
          {
            this.state = 647;
            this.match(PythonParser.GHOSTED_BLOCK_START);
          }
        }

        this.state = 650;
        this.match(PythonParser.TRY);
        this.state = 651;
        this.match(PythonParser.COLON);
        this.state = 653;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 127) {
          {
            this.state = 652;
            this.commentText();
          }
        }

        this.state = 655;
        this.match(PythonParser.NL);
        this.state = 656;
        this.tryClause();
        this.state = 658;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        do {
          {
            {
              this.state = 657;
              this.catchClause();
            }
          }
          this.state = 660;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        } while (_la === 43 || _la === 107);
        this.state = 662;
        this.match(PythonParser.END_TRY);
        this.state = 664;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 108) {
          {
            this.state = 663;
            this.match(PythonParser.GHOSTED_BLOCK_END);
          }
        }

        this.state = 666;
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
        this.state = 671;
        this.errorHandler.sync(this);
        alternative = this.interpreter.adaptivePredict(this.tokenStream, 76, this.context);
        while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
          if (alternative === 1) {
            {
              {
                this.state = 668;
                this.ordinaryStatement();
              }
            }
          }
          this.state = 673;
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
        this.state = 675;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 107) {
          {
            this.state = 674;
            this.match(PythonParser.GHOSTED_BLOCK_START);
          }
        }

        this.state = 677;
        this.match(PythonParser.EXCEPT);
        this.state = 678;
        this.typeName();
        this.state = 679;
        this.match(PythonParser.AS);
        this.state = 680;
        this.identifierDef();
        this.state = 681;
        this.match(PythonParser.COLON);
        this.state = 683;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 127) {
          {
            this.state = 682;
            this.commentText();
          }
        }

        this.state = 685;
        this.match(PythonParser.NL);
        this.state = 689;
        this.errorHandler.sync(this);
        alternative = this.interpreter.adaptivePredict(this.tokenStream, 79, this.context);
        while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
          if (alternative === 1) {
            {
              {
                this.state = 686;
                this.ordinaryStatement();
              }
            }
          }
          this.state = 691;
          this.errorHandler.sync(this);
          alternative = this.interpreter.adaptivePredict(this.tokenStream, 79, this.context);
        }
        this.state = 693;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 108) {
          {
            this.state = 692;
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
        this.state = 696;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 106) {
          {
            this.state = 695;
            this.match(PythonParser.GHOSTED_LINE);
          }
        }

        this.state = 698;
        this.match(PythonParser.RAISE);
        this.state = 699;
        this.typeName();
        this.state = 700;
        this.match(PythonParser.OPEN_BRACKET);
        this.state = 701;
        this.errorMessage();
        this.state = 702;
        this.match(PythonParser.CLOSE_BRACKET);
        this.state = 704;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 127) {
          {
            this.state = 703;
            this.commentText();
          }
        }

        this.state = 706;
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
      this.state = 710;
      this.errorHandler.sync(this);
      switch (this.tokenStream.LA(1)) {
        case PythonParser.LITERAL_STRING:
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 708;
            this.litString();
          }
          break;
        case PythonParser.NAME_STARTING_LC:
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 709;
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
        this.state = 713;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 106) {
          {
            this.state = 712;
            this.match(PythonParser.GHOSTED_LINE);
          }
        }

        this.state = 715;
        this.match(PythonParser.THIS_INSTANCE);
        this.state = 716;
        this.match(PythonParser.DOT);
        this.state = 717;
        this.match(PythonParser.ASSERT_EQUAL);
        this.state = 718;
        this.match(PythonParser.OPEN_BRACKET);
        this.state = 719;
        this.assertActual();
        this.state = 720;
        this.match(PythonParser.COMMA);
        this.state = 721;
        this.assertExpected();
        this.state = 722;
        this.match(PythonParser.CLOSE_BRACKET);
        this.state = 724;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 127) {
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
  public returnStatement(): ReturnStatementContext {
    let localContext = new ReturnStatementContext(this.context, this.state);
    this.enterRule(localContext, 72, PythonParser.RULE_returnStatement);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 728;
        this.match(PythonParser.RETURN);
        this.state = 729;
        this.expression(0);
        this.state = 731;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 127) {
          {
            this.state = 730;
            this.commentText();
          }
        }

        this.state = 733;
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
        this.state = 736;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        do {
          {
            {
              this.state = 735;
              this.selectableMember();
            }
          }
          this.state = 738;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        } while (
          _la === 42 ||
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
  public selectableMember(): SelectableMemberContext {
    let localContext = new SelectableMemberContext(this.context, this.state);
    this.enterRule(localContext, 76, PythonParser.RULE_selectableMember);
    try {
      this.state = 745;
      this.errorHandler.sync(this);
      switch (this.interpreter.adaptivePredict(this.tokenStream, 88, this.context)) {
        case 1:
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 740;
            this.property();
          }
          break;
        case 2:
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 741;
            this.functionMethod();
          }
          break;
        case 3:
          this.enterOuterAlt(localContext, 3);
          {
            this.state = 742;
            this.procedureMethod();
          }
          break;
        case 4:
          this.enterOuterAlt(localContext, 4);
          {
            this.state = 743;
            this.abstractFunction();
          }
          break;
        case 5:
          this.enterOuterAlt(localContext, 5);
          {
            this.state = 744;
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
        this.state = 748;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 107) {
          {
            this.state = 747;
            this.match(PythonParser.GHOSTED_BLOCK_START);
          }
        }

        this.state = 750;
        this.match(PythonParser.DEF);
        this.state = 751;
        this.match(PythonParser.INIT);
        this.state = 752;
        this.match(PythonParser.OPEN_BRACKET);
        this.state = 754;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 73 || _la === 96) {
          {
            this.state = 753;
            this.paramList();
          }
        }

        this.state = 756;
        this.match(PythonParser.CLOSE_BRACKET);
        this.state = 757;
        this.match(PythonParser.ARROW);
        this.state = 758;
        this.match(PythonParser.NONE);
        this.state = 759;
        this.match(PythonParser.COLON);
        this.state = 761;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 127) {
          {
            this.state = 760;
            this.commentText();
          }
        }

        this.state = 764;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 108) {
          {
            this.state = 763;
            this.match(PythonParser.GHOSTED_BLOCK_END);
          }
        }

        this.state = 766;
        this.match(PythonParser.NL);
        this.state = 770;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (
          ((_la & ~0x1f) === 0 && ((1 << _la) & 3120) !== 0) ||
          (((_la - 47) & ~0x1f) === 0 && ((1 << (_la - 47)) & 1409300449) !== 0) ||
          (((_la - 79) & ~0x1f) === 0 && ((1 << (_la - 79)) & 436076545) !== 0) ||
          _la === 127
        ) {
          {
            {
              this.state = 767;
              this.ordinaryStatement();
            }
          }
          this.state = 772;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 773;
        this.match(PythonParser.END_CONSTRUCTOR);
        this.state = 774;
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
        this.state = 777;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 106) {
          {
            this.state = 776;
            this.match(PythonParser.GHOSTED_LINE);
          }
        }

        this.state = 779;
        this.identifierDef();
        this.state = 780;
        this.match(PythonParser.COLON);
        this.state = 781;
        this.type_();
        this.state = 783;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 125) {
          {
            this.state = 782;
            this.match(PythonParser.PRIVATE_ANNOTATION);
          }
        }

        this.state = 786;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 127) {
          {
            this.state = 785;
            this.commentText();
          }
        }

        this.state = 788;
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
        this.state = 791;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 107) {
          {
            this.state = 790;
            this.match(PythonParser.GHOSTED_BLOCK_START);
          }
        }

        this.state = 793;
        this.match(PythonParser.DEF);
        this.state = 794;
        this.methodName();
        this.state = 795;
        this.match(PythonParser.OPEN_BRACKET);
        this.state = 797;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 73 || _la === 96) {
          {
            this.state = 796;
            this.paramList();
          }
        }

        this.state = 799;
        this.match(PythonParser.CLOSE_BRACKET);
        this.state = 800;
        this.match(PythonParser.ARROW);
        this.state = 801;
        this.type_();
        this.state = 802;
        this.match(PythonParser.COLON);
        this.state = 804;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 125) {
          {
            this.state = 803;
            this.match(PythonParser.PRIVATE_ANNOTATION);
          }
        }

        this.state = 806;
        this.match(PythonParser.NL);
        this.state = 810;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (
          ((_la & ~0x1f) === 0 && ((1 << _la) & 3120) !== 0) ||
          (((_la - 47) & ~0x1f) === 0 && ((1 << (_la - 47)) & 1409300449) !== 0) ||
          (((_la - 79) & ~0x1f) === 0 && ((1 << (_la - 79)) & 436076545) !== 0) ||
          _la === 127
        ) {
          {
            {
              this.state = 807;
              this.ordinaryStatement();
            }
          }
          this.state = 812;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 813;
        this.returnStatement();
        this.state = 814;
        this.match(PythonParser.END_FUNCTION);
        this.state = 816;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 108) {
          {
            this.state = 815;
            this.match(PythonParser.GHOSTED_BLOCK_END);
          }
        }

        this.state = 818;
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
        this.state = 821;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 107) {
          {
            this.state = 820;
            this.match(PythonParser.GHOSTED_BLOCK_START);
          }
        }

        this.state = 823;
        this.match(PythonParser.DEF);
        this.state = 824;
        this.methodName();
        this.state = 825;
        this.match(PythonParser.OPEN_BRACKET);
        this.state = 827;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 73 || _la === 96) {
          {
            this.state = 826;
            this.paramList();
          }
        }

        this.state = 829;
        this.match(PythonParser.CLOSE_BRACKET);
        this.state = 830;
        this.match(PythonParser.ARROW);
        this.state = 831;
        this.match(PythonParser.NONE);
        this.state = 832;
        this.match(PythonParser.COLON);
        this.state = 834;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 125) {
          {
            this.state = 833;
            this.match(PythonParser.PRIVATE_ANNOTATION);
          }
        }

        this.state = 836;
        this.match(PythonParser.NL);
        this.state = 840;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (
          ((_la & ~0x1f) === 0 && ((1 << _la) & 3120) !== 0) ||
          (((_la - 47) & ~0x1f) === 0 && ((1 << (_la - 47)) & 1409300449) !== 0) ||
          (((_la - 79) & ~0x1f) === 0 && ((1 << (_la - 79)) & 436076545) !== 0) ||
          _la === 127
        ) {
          {
            {
              this.state = 837;
              this.ordinaryStatement();
            }
          }
          this.state = 842;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 843;
        this.match(PythonParser.END_PROCEDURE);
        this.state = 845;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 108) {
          {
            this.state = 844;
            this.match(PythonParser.GHOSTED_BLOCK_END);
          }
        }

        this.state = 847;
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
        this.state = 850;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 106) {
          {
            this.state = 849;
            this.match(PythonParser.GHOSTED_LINE);
          }
        }

        this.state = 852;
        this.match(PythonParser.ABSTRACT_METHOD);
        this.state = 853;
        this.match(PythonParser.NL);
        this.state = 854;
        this.match(PythonParser.DEF);
        this.state = 855;
        this.methodName();
        this.state = 856;
        this.match(PythonParser.OPEN_BRACKET);
        this.state = 858;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 73 || _la === 96) {
          {
            this.state = 857;
            this.paramList();
          }
        }

        this.state = 860;
        this.match(PythonParser.CLOSE_BRACKET);
        this.state = 861;
        this.match(PythonParser.ARROW);
        this.state = 862;
        this.type_();
        this.state = 863;
        this.match(PythonParser.COLON);
        this.state = 864;
        this.match(PythonParser.NL);
        this.state = 865;
        this.match(PythonParser.PASS);
        this.state = 867;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 127) {
          {
            this.state = 866;
            this.commentText();
          }
        }

        this.state = 869;
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
        this.state = 872;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 106) {
          {
            this.state = 871;
            this.match(PythonParser.GHOSTED_LINE);
          }
        }

        this.state = 874;
        this.match(PythonParser.ABSTRACT_METHOD);
        this.state = 875;
        this.match(PythonParser.NL);
        this.state = 876;
        this.match(PythonParser.DEF);
        this.state = 877;
        this.methodName();
        this.state = 878;
        this.match(PythonParser.OPEN_BRACKET);
        this.state = 880;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 73 || _la === 96) {
          {
            this.state = 879;
            this.paramList();
          }
        }

        this.state = 882;
        this.match(PythonParser.CLOSE_BRACKET);
        this.state = 883;
        this.match(PythonParser.ARROW);
        this.state = 884;
        this.match(PythonParser.NONE);
        this.state = 885;
        this.match(PythonParser.COLON);
        this.state = 887;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 125) {
          {
            this.state = 886;
            this.match(PythonParser.PRIVATE_ANNOTATION);
          }
        }

        this.state = 889;
        this.match(PythonParser.NL);
        this.state = 890;
        this.match(PythonParser.PASS);
        this.state = 892;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 127) {
          {
            this.state = 891;
            this.commentText();
          }
        }

        this.state = 894;
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
        this.state = 896;
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
        this.state = 898;
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
        this.state = 905;
        this.errorHandler.sync(this);
        switch (this.tokenStream.LA(1)) {
          case PythonParser.NAME_STARTING_LC:
            {
              localContext = new SimpleAssignableContext(localContext);
              this.context = localContext;
              previousContext = localContext;

              this.state = 901;
              this.identifierUse();
            }
            break;
          case PythonParser.THIS_INSTANCE:
            {
              localContext = new ThisAssignableContext(localContext);
              this.context = localContext;
              previousContext = localContext;
              this.state = 902;
              this.match(PythonParser.THIS_INSTANCE);
              this.state = 903;
              this.match(PythonParser.DOT);
              this.state = 904;
              this.identifierUse();
            }
            break;
          default:
            throw new antlr.NoViableAltException(this);
        }
        this.context!.stop = this.tokenStream.LT(-1);
        this.state = 911;
        this.errorHandler.sync(this);
        alternative = this.interpreter.adaptivePredict(this.tokenStream, 115, this.context);
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
                this.state = 907;
                if (!this.precpred(this.context, 1)) {
                  throw this.createFailedPredicateException("this.precpred(this.context, 1)");
                }
                this.state = 908;
                this.index();
              }
            }
          }
          this.state = 913;
          this.errorHandler.sync(this);
          alternative = this.interpreter.adaptivePredict(this.tokenStream, 115, this.context);
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
        this.state = 914;
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
        this.state = 916;
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
  public testClassName(): TestClassNameContext {
    let localContext = new TestClassNameContext(this.context, this.state);
    this.enterRule(localContext, 100, PythonParser.RULE_testClassName);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 918;
        this.match(PythonParser.NAME_STARTING_UC);
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
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
      this.state = 927;
      this.errorHandler.sync(this);
      switch (this.tokenStream.LA(1)) {
        case PythonParser.INT_NAME:
          localContext = new IntTypeNameContext(localContext);
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 920;
            this.match(PythonParser.INT_NAME);
          }
          break;
        case PythonParser.FLOAT_NAME:
          localContext = new FloatTypeNameContext(localContext);
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 921;
            this.match(PythonParser.FLOAT_NAME);
          }
          break;
        case PythonParser.BOOL_NAME:
          localContext = new BoolTypeNameContext(localContext);
          this.enterOuterAlt(localContext, 3);
          {
            this.state = 922;
            this.match(PythonParser.BOOL_NAME);
          }
          break;
        case PythonParser.STRING_NAME:
          localContext = new StringTypeNameContext(localContext);
          this.enterOuterAlt(localContext, 4);
          {
            this.state = 923;
            this.match(PythonParser.STRING_NAME);
          }
          break;
        case PythonParser.LIST_NAME:
          localContext = new ListTypeNameContext(localContext);
          this.enterOuterAlt(localContext, 5);
          {
            this.state = 924;
            this.match(PythonParser.LIST_NAME);
          }
          break;
        case PythonParser.DICT_NAME:
          localContext = new DictTypeNameContext(localContext);
          this.enterOuterAlt(localContext, 6);
          {
            this.state = 925;
            this.match(PythonParser.DICT_NAME);
          }
          break;
        case PythonParser.NAME_STARTING_UC:
          localContext = new UdtTypeNameContext(localContext);
          this.enterOuterAlt(localContext, 7);
          {
            this.state = 926;
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
      this.state = 933;
      this.errorHandler.sync(this);
      switch (this.tokenStream.LA(1)) {
        case PythonParser.TRUE:
        case PythonParser.FALSE:
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 929;
            this.litBoolean();
          }
          break;
        case PythonParser.LITERAL_BINARY:
        case PythonParser.LITERAL_HEX:
        case PythonParser.LITERAL_INTEGER:
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 930;
            this.litInt();
          }
          break;
        case PythonParser.LITERAL_FLOAT:
          this.enterOuterAlt(localContext, 3);
          {
            this.state = 931;
            this.litFloat();
          }
          break;
        case PythonParser.LITERAL_STRING:
          this.enterOuterAlt(localContext, 4);
          {
            this.state = 932;
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
        this.state = 935;
        this.argument();
        this.state = 940;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (_la === 82) {
          {
            {
              this.state = 936;
              this.match(PythonParser.COMMA);
              this.state = 937;
              this.argument();
            }
          }
          this.state = 942;
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
      this.state = 945;
      this.errorHandler.sync(this);
      switch (this.tokenStream.LA(1)) {
        case PythonParser.LAMBDA:
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 943;
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
        case PythonParser.START_INTERPOLATED_STRING:
        case PythonParser.LITERAL_STRING:
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 944;
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
        this.state = 947;
        this.paramDef();
        this.state = 952;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (_la === 82) {
          {
            {
              this.state = 948;
              this.match(PythonParser.COMMA);
              this.state = 949;
              this.paramDef();
            }
          }
          this.state = 954;
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
        this.state = 955;
        this.identifierDef();
        this.state = 958;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        do {
          {
            {
              this.state = 956;
              this.match(PythonParser.COMMA);
              this.state = 957;
              this.identifierDef();
            }
          }
          this.state = 960;
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
    this.enterRule(localContext, 114, PythonParser.RULE_expressionList);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 962;
        this.expression(0);
        this.state = 967;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (_la === 82) {
          {
            {
              this.state = 963;
              this.match(PythonParser.COMMA);
              this.state = 964;
              this.expression(0);
            }
          }
          this.state = 969;
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
        this.state = 970;
        this.identifierDef();
        this.state = 971;
        this.match(PythonParser.SINGLE_EQUALS);
        this.state = 972;
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
        this.state = 974;
        this.enumDefValue();
        this.state = 979;
        this.errorHandler.sync(this);
        alternative = this.interpreter.adaptivePredict(this.tokenStream, 123, this.context);
        while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
          if (alternative === 1) {
            {
              {
                this.state = 975;
                this.match(PythonParser.NL);
                this.state = 976;
                this.enumDefValue();
              }
            }
          }
          this.state = 981;
          this.errorHandler.sync(this);
          alternative = this.interpreter.adaptivePredict(this.tokenStream, 123, this.context);
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
      this.state = 986;
      this.errorHandler.sync(this);
      switch (this.interpreter.adaptivePredict(this.tokenStream, 124, this.context)) {
        case 1:
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 982;
            this.typeTuple();
          }
          break;
        case 2:
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 983;
            this.typeName();
          }
          break;
        case 3:
          this.enterOuterAlt(localContext, 3);
          {
            this.state = 984;
            this.typeGeneric();
          }
          break;
        case 4:
          this.enterOuterAlt(localContext, 4);
          {
            this.state = 985;
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
        this.state = 988;
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
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 990;
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
    this.enterRule(localContext, 126, PythonParser.RULE_litValue);
    try {
      this.state = 998;
      this.errorHandler.sync(this);
      switch (this.tokenStream.LA(1)) {
        case PythonParser.TRUE:
        case PythonParser.FALSE:
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 992;
            this.litBoolean();
          }
          break;
        case PythonParser.LITERAL_BINARY:
        case PythonParser.LITERAL_HEX:
        case PythonParser.LITERAL_INTEGER:
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 993;
            this.litInt();
          }
          break;
        case PythonParser.LITERAL_FLOAT:
          this.enterOuterAlt(localContext, 3);
          {
            this.state = 994;
            this.litFloat();
          }
          break;
        case PythonParser.LITERAL_STRING:
          this.enterOuterAlt(localContext, 4);
          {
            this.state = 995;
            this.litString();
          }
          break;
        case PythonParser.START_INTERPOLATED_STRING:
          this.enterOuterAlt(localContext, 5);
          {
            this.state = 996;
            this.interpolatedString();
          }
          break;
        case PythonParser.INT_NAME:
        case PythonParser.FLOAT_NAME:
        case PythonParser.BOOL_NAME:
        case PythonParser.STRING_NAME:
        case PythonParser.LIST_NAME:
        case PythonParser.DICT_NAME:
        case PythonParser.NAME_STARTING_UC:
          this.enterOuterAlt(localContext, 6);
          {
            this.state = 997;
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
    this.enterRule(localContext, 128, PythonParser.RULE_litBoolean);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 1000;
        _la = this.tokenStream.LA(1);
        if (!(_la === 59 || _la === 60)) {
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
      this.state = 1005;
      this.errorHandler.sync(this);
      switch (this.tokenStream.LA(1)) {
        case PythonParser.LITERAL_INTEGER:
          localContext = new LitIntegerContext(localContext);
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 1002;
            this.match(PythonParser.LITERAL_INTEGER);
          }
          break;
        case PythonParser.LITERAL_BINARY:
          localContext = new LitBinaryContext(localContext);
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 1003;
            this.match(PythonParser.LITERAL_BINARY);
          }
          break;
        case PythonParser.LITERAL_HEX:
          localContext = new LitHexContext(localContext);
          this.enterOuterAlt(localContext, 3);
          {
            this.state = 1004;
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
        this.state = 1007;
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
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 1009;
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
  public interpolatedString(): InterpolatedStringContext {
    let localContext = new InterpolatedStringContext(this.context, this.state);
    this.enterRule(localContext, 136, PythonParser.RULE_interpolatedString);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 1011;
        this.match(PythonParser.START_INTERPOLATED_STRING);
        this.state = 1015;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (_la === 75 || _la === 128) {
          {
            {
              this.state = 1012;
              this.segment();
            }
          }
          this.state = 1017;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 1018;
        this.match(PythonParser.DOUBLE_QUOTES);
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
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
    this.enterRule(localContext, 138, PythonParser.RULE_segment);
    try {
      this.state = 1022;
      this.errorHandler.sync(this);
      switch (this.tokenStream.LA(1)) {
        case PythonParser.Grapheme:
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 1020;
            this.interpolatedStringText();
          }
          break;
        case PythonParser.OPEN_BRACE:
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 1021;
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
  public interpolatedStringText(): InterpolatedStringTextContext {
    let localContext = new InterpolatedStringTextContext(this.context, this.state);
    this.enterRule(localContext, 140, PythonParser.RULE_interpolatedStringText);
    try {
      let alternative: number;
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 1025;
        this.errorHandler.sync(this);
        alternative = 1;
        do {
          switch (alternative) {
            case 1:
              {
                {
                  this.state = 1024;
                  this.match(PythonParser.Grapheme);
                }
              }
              break;
            default:
              throw new antlr.NoViableAltException(this);
          }
          this.state = 1027;
          this.errorHandler.sync(this);
          alternative = this.interpreter.adaptivePredict(this.tokenStream, 129, this.context);
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
  public interpolatedStringExpression(): InterpolatedStringExpressionContext {
    let localContext = new InterpolatedStringExpressionContext(this.context, this.state);
    this.enterRule(localContext, 142, PythonParser.RULE_interpolatedStringExpression);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 1029;
        this.match(PythonParser.OPEN_BRACE);
        this.state = 1030;
        this.expression(0);
        this.state = 1031;
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
  public enumValue(): EnumValueContext {
    let localContext = new EnumValueContext(this.context, this.state);
    this.enterRule(localContext, 144, PythonParser.RULE_enumValue);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 1033;
        this.typeName();
        this.state = 1034;
        this.match(PythonParser.DOT);
        this.state = 1035;
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
    this.enterRule(localContext, 146, PythonParser.RULE_index);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 1037;
        this.match(PythonParser.OPEN_SQ_BRACKET);
        this.state = 1038;
        this.expression(0);
        this.state = 1039;
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
    let _startState = 148;
    this.enterRecursionRule(localContext, 148, PythonParser.RULE_expression, _p);
    let _la: number;
    try {
      let alternative: number;
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 1046;
        this.errorHandler.sync(this);
        switch (this.interpreter.adaptivePredict(this.tokenStream, 130, this.context)) {
          case 1:
            {
              localContext = new NewInstanceExpressionContext(localContext);
              this.context = localContext;
              previousContext = localContext;

              this.state = 1042;
              this.newInstance();
            }
            break;
          case 2:
            {
              localContext = new UnaryExpressionLabelContext(localContext);
              this.context = localContext;
              previousContext = localContext;
              this.state = 1043;
              this.unaryExpression();
            }
            break;
          case 3:
            {
              localContext = new TermExpressionContext(localContext);
              this.context = localContext;
              previousContext = localContext;
              this.state = 1044;
              this.term(0);
            }
            break;
          case 4:
            {
              localContext = new BinaryExpressionLabelContext(localContext);
              this.context = localContext;
              previousContext = localContext;
              this.state = 1045;
              this.binaryExpression();
            }
            break;
        }
        this.context!.stop = this.tokenStream.LT(-1);
        this.state = 1063;
        this.errorHandler.sync(this);
        alternative = this.interpreter.adaptivePredict(this.tokenStream, 132, this.context);
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
                this.state = 1048;
                if (!this.precpred(this.context, 1)) {
                  throw this.createFailedPredicateException("this.precpred(this.context, 1)");
                }
                this.state = 1049;
                this.match(PythonParser.IF);
                this.state = 1050;
                (localContext as IfExpressionContext)._condition = this.expression(0);
                this.state = 1055;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 2) {
                  {
                    {
                      this.state = 1051;
                      this.match(PythonParser.ELIF);
                      this.state = 1052;
                      (localContext as IfExpressionContext)._elifCondition = this.expression(0);
                    }
                  }
                  this.state = 1057;
                  this.errorHandler.sync(this);
                  _la = this.tokenStream.LA(1);
                }
                this.state = 1058;
                this.match(PythonParser.ELSE);
                this.state = 1059;
                (localContext as IfExpressionContext)._falseExpr = this.expression(2);
              }
            }
          }
          this.state = 1065;
          this.errorHandler.sync(this);
          alternative = this.interpreter.adaptivePredict(this.tokenStream, 132, this.context);
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
    let _startState = 150;
    this.enterRecursionRule(localContext, 150, PythonParser.RULE_term, _p);
    try {
      let alternative: number;
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 1075;
        this.errorHandler.sync(this);
        switch (this.interpreter.adaptivePredict(this.tokenStream, 133, this.context)) {
          case 1:
            {
              localContext = new ThisInstanceTermContext(localContext);
              this.context = localContext;
              previousContext = localContext;

              this.state = 1067;
              this.thisInstance();
            }
            break;
          case 2:
            {
              localContext = new BracketedExpressionTermContext(localContext);
              this.context = localContext;
              previousContext = localContext;
              this.state = 1068;
              this.bracketedExpression();
            }
            break;
          case 3:
            {
              localContext = new LitValueTermContext(localContext);
              this.context = localContext;
              previousContext = localContext;
              this.state = 1069;
              this.litValue();
            }
            break;
          case 4:
            {
              localContext = new ListTermContext(localContext);
              this.context = localContext;
              previousContext = localContext;
              this.state = 1070;
              this.list();
            }
            break;
          case 5:
            {
              localContext = new DictionaryTermContext(localContext);
              this.context = localContext;
              previousContext = localContext;
              this.state = 1071;
              this.dictionary();
            }
            break;
          case 6:
            {
              localContext = new TupleTermContext(localContext);
              this.context = localContext;
              previousContext = localContext;
              this.state = 1072;
              this.tuple();
            }
            break;
          case 7:
            {
              localContext = new IdentifierUseTermContext(localContext);
              this.context = localContext;
              previousContext = localContext;
              this.state = 1073;
              this.identifierUse();
            }
            break;
          case 8:
            {
              localContext = new MethodCallTermContext(localContext);
              this.context = localContext;
              previousContext = localContext;
              this.state = 1074;
              this.methodCall();
            }
            break;
        }
        this.context!.stop = this.tokenStream.LT(-1);
        this.state = 1084;
        this.errorHandler.sync(this);
        alternative = this.interpreter.adaptivePredict(this.tokenStream, 135, this.context);
        while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
          if (alternative === 1) {
            if (this.parseListeners != null) {
              this.triggerExitRuleEvent();
            }
            previousContext = localContext;
            {
              this.state = 1082;
              this.errorHandler.sync(this);
              switch (this.interpreter.adaptivePredict(this.tokenStream, 134, this.context)) {
                case 1:
                  {
                    localContext = new IndexedTermContext(
                      new TermContext(parentContext, parentState),
                    );
                    this.pushNewRecursionContext(localContext, _startState, PythonParser.RULE_term);
                    this.state = 1077;
                    if (!this.precpred(this.context, 2)) {
                      throw this.createFailedPredicateException("this.precpred(this.context, 2)");
                    }
                    this.state = 1078;
                    this.index();
                  }
                  break;
                case 2:
                  {
                    localContext = new ChainableTermContext(
                      new TermContext(parentContext, parentState),
                    );
                    this.pushNewRecursionContext(localContext, _startState, PythonParser.RULE_term);
                    this.state = 1079;
                    if (!this.precpred(this.context, 1)) {
                      throw this.createFailedPredicateException("this.precpred(this.context, 1)");
                    }
                    this.state = 1080;
                    this.match(PythonParser.DOT);
                    this.state = 1081;
                    this.chainable();
                  }
                  break;
              }
            }
          }
          this.state = 1086;
          this.errorHandler.sync(this);
          alternative = this.interpreter.adaptivePredict(this.tokenStream, 135, this.context);
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
    this.enterRule(localContext, 152, PythonParser.RULE_chainable);
    try {
      this.state = 1089;
      this.errorHandler.sync(this);
      switch (this.interpreter.adaptivePredict(this.tokenStream, 136, this.context)) {
        case 1:
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 1087;
            this.identifierUse();
          }
          break;
        case 2:
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 1088;
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
    this.enterRule(localContext, 154, PythonParser.RULE_thisInstance);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 1091;
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
    this.enterRule(localContext, 156, PythonParser.RULE_bracketedExpression);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 1093;
        this.match(PythonParser.OPEN_BRACKET);
        this.state = 1094;
        this.expression(0);
        this.state = 1095;
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
    this.enterRule(localContext, 158, PythonParser.RULE_unaryExpression);
    try {
      this.state = 1099;
      this.errorHandler.sync(this);
      switch (this.tokenStream.LA(1)) {
        case PythonParser.MINUS:
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 1097;
            this.negateNumeric();
          }
          break;
        case PythonParser.NOT:
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 1098;
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
    this.enterRule(localContext, 160, PythonParser.RULE_negateNumeric);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 1101;
        this.match(PythonParser.MINUS);
        this.state = 1102;
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
    this.enterRule(localContext, 162, PythonParser.RULE_negateLogical);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 1104;
        this.match(PythonParser.NOT);
        this.state = 1105;
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
    this.enterRule(localContext, 164, PythonParser.RULE_binaryExpression);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 1107;
        localContext._left = this.term(0);
        this.state = 1108;
        this.binaryOperator();
        this.state = 1109;
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
    this.enterRule(localContext, 166, PythonParser.RULE_list);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 1111;
        this.match(PythonParser.OPEN_SQ_BRACKET);
        this.state = 1112;
        this.expressionList();
        this.state = 1113;
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
    this.enterRule(localContext, 168, PythonParser.RULE_tuple);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 1115;
        this.match(PythonParser.OPEN_BRACKET);
        this.state = 1116;
        this.expressionList();
        this.state = 1117;
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
    this.enterRule(localContext, 170, PythonParser.RULE_dictionary);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 1119;
        this.match(PythonParser.OPEN_BRACE);
        this.state = 1120;
        this.kvpList();
        this.state = 1121;
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
    this.enterRule(localContext, 172, PythonParser.RULE_kvpList);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 1123;
        this.kvp();
        this.state = 1128;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (_la === 82) {
          {
            {
              this.state = 1124;
              this.match(PythonParser.COMMA);
              this.state = 1125;
              this.kvp();
            }
          }
          this.state = 1130;
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
    this.enterRule(localContext, 174, PythonParser.RULE_kvp);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 1131;
        localContext._key = this.expression(0);
        this.state = 1132;
        this.match(PythonParser.COLON);
        this.state = 1133;
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
    this.enterRule(localContext, 176, PythonParser.RULE_methodCall);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 1135;
        this.methodName();
        this.state = 1136;
        this.match(PythonParser.OPEN_BRACKET);
        this.state = 1138;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (
          _la === 7 ||
          (((_la - 51) & ~0x1f) === 0 && ((1 << (_la - 51)) & 356520959) !== 0) ||
          (((_la - 85) & ~0x1f) === 0 && ((1 << (_la - 85)) & 522241) !== 0)
        ) {
          {
            this.state = 1137;
            this.argList();
          }
        }

        this.state = 1140;
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
    this.enterRule(localContext, 178, PythonParser.RULE_binaryOperator);
    try {
      this.state = 1158;
      this.errorHandler.sync(this);
      switch (this.tokenStream.LA(1)) {
        case PythonParser.EQUAL:
          localContext = new OpEQUALContext(localContext);
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 1142;
            this.match(PythonParser.EQUAL);
          }
          break;
        case PythonParser.NOT_EQUAL:
          localContext = new OpNOT_EQUALContext(localContext);
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 1143;
            this.match(PythonParser.NOT_EQUAL);
          }
          break;
        case PythonParser.REF_EQUAL:
          localContext = new OpREF_EQUALContext(localContext);
          this.enterOuterAlt(localContext, 3);
          {
            this.state = 1144;
            this.match(PythonParser.REF_EQUAL);
          }
          break;
        case PythonParser.REF_NOT_EQUAL:
          localContext = new OpREF_NOT_EQUALContext(localContext);
          this.enterOuterAlt(localContext, 4);
          {
            this.state = 1145;
            this.match(PythonParser.REF_NOT_EQUAL);
          }
          break;
        case PythonParser.GT:
          localContext = new OpGTContext(localContext);
          this.enterOuterAlt(localContext, 5);
          {
            this.state = 1146;
            this.match(PythonParser.GT);
          }
          break;
        case PythonParser.LT:
          localContext = new OpLTContext(localContext);
          this.enterOuterAlt(localContext, 6);
          {
            this.state = 1147;
            this.match(PythonParser.LT);
          }
          break;
        case PythonParser.GE:
          localContext = new OpGEContext(localContext);
          this.enterOuterAlt(localContext, 7);
          {
            this.state = 1148;
            this.match(PythonParser.GE);
          }
          break;
        case PythonParser.LE:
          localContext = new OpLEContext(localContext);
          this.enterOuterAlt(localContext, 8);
          {
            this.state = 1149;
            this.match(PythonParser.LE);
          }
          break;
        case PythonParser.MULT:
          localContext = new OpMULTContext(localContext);
          this.enterOuterAlt(localContext, 9);
          {
            this.state = 1150;
            this.match(PythonParser.MULT);
          }
          break;
        case PythonParser.DIVIDE:
          localContext = new OpDIVIDEContext(localContext);
          this.enterOuterAlt(localContext, 10);
          {
            this.state = 1151;
            this.match(PythonParser.DIVIDE);
          }
          break;
        case PythonParser.PLUS:
          localContext = new OpPLUSContext(localContext);
          this.enterOuterAlt(localContext, 11);
          {
            this.state = 1152;
            this.match(PythonParser.PLUS);
          }
          break;
        case PythonParser.MINUS:
          localContext = new OpMINUSContext(localContext);
          this.enterOuterAlt(localContext, 12);
          {
            this.state = 1153;
            this.match(PythonParser.MINUS);
          }
          break;
        case PythonParser.AND:
          localContext = new OpANDContext(localContext);
          this.enterOuterAlt(localContext, 13);
          {
            this.state = 1154;
            this.match(PythonParser.AND);
          }
          break;
        case PythonParser.OR:
          localContext = new OpORContext(localContext);
          this.enterOuterAlt(localContext, 14);
          {
            this.state = 1155;
            this.match(PythonParser.OR);
          }
          break;
        case PythonParser.MOD:
          localContext = new OpMODContext(localContext);
          this.enterOuterAlt(localContext, 15);
          {
            this.state = 1156;
            this.match(PythonParser.MOD);
          }
          break;
        case PythonParser.POWER:
          localContext = new OpPOWERContext(localContext);
          this.enterOuterAlt(localContext, 16);
          {
            this.state = 1157;
            this.match(PythonParser.POWER);
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
    this.enterRule(localContext, 180, PythonParser.RULE_newInstance);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 1160;
        this.type_();
        this.state = 1161;
        this.match(PythonParser.OPEN_BRACKET);
        this.state = 1163;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (
          _la === 7 ||
          (((_la - 51) & ~0x1f) === 0 && ((1 << (_la - 51)) & 356520959) !== 0) ||
          (((_la - 85) & ~0x1f) === 0 && ((1 << (_la - 85)) & 522241) !== 0)
        ) {
          {
            this.state = 1162;
            this.argList();
          }
        }

        this.state = 1165;
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
    this.enterRule(localContext, 182, PythonParser.RULE_paramDef);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 1169;
        this.errorHandler.sync(this);
        switch (this.tokenStream.LA(1)) {
          case PythonParser.NAME_STARTING_LC:
            {
              this.state = 1167;
              this.identifierDef();
            }
            break;
          case PythonParser.THIS_INSTANCE:
            {
              this.state = 1168;
              this.match(PythonParser.THIS_INSTANCE);
            }
            break;
          default:
            throw new antlr.NoViableAltException(this);
        }
        this.state = 1171;
        this.match(PythonParser.COLON);
        this.state = 1172;
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
    this.enterRule(localContext, 184, PythonParser.RULE_typeGeneric);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 1174;
        this.typeName();
        this.state = 1175;
        this.match(PythonParser.OPEN_SQ_BRACKET);
        this.state = 1176;
        this.type_();
        this.state = 1181;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (_la === 82) {
          {
            {
              this.state = 1177;
              this.match(PythonParser.COMMA);
              this.state = 1178;
              this.type_();
            }
          }
          this.state = 1183;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 1184;
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
    this.enterRule(localContext, 186, PythonParser.RULE_typeFunc);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 1186;
        this.match(PythonParser.FUNC_NAME);
        this.state = 1187;
        this.match(PythonParser.OPEN_SQ_BRACKET);
        this.state = 1188;
        this.match(PythonParser.OPEN_SQ_BRACKET);
        this.state = 1189;
        this.type_();
        this.state = 1194;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (_la === 82) {
          {
            {
              this.state = 1190;
              this.match(PythonParser.COMMA);
              this.state = 1191;
              this.type_();
            }
          }
          this.state = 1196;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 1197;
        this.match(PythonParser.CLOSE_SQ_BRACKET);
        this.state = 1198;
        this.match(PythonParser.COMMA);
        this.state = 1199;
        this.type_();
        this.state = 1200;
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
    this.enterRule(localContext, 188, PythonParser.RULE_typeTuple);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 1202;
        this.match(PythonParser.TUPLE);
        this.state = 1203;
        this.match(PythonParser.OPEN_SQ_BRACKET);
        this.state = 1204;
        this.type_();
        this.state = 1207;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        do {
          {
            {
              this.state = 1205;
              this.match(PythonParser.COMMA);
              this.state = 1206;
              this.type_();
            }
          }
          this.state = 1209;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        } while (_la === 82);
        this.state = 1211;
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
    this.enterRule(localContext, 190, PythonParser.RULE_lambda);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 1213;
        this.match(PythonParser.LAMBDA);
        this.state = 1214;
        this.paramList();
        this.state = 1215;
        this.match(PythonParser.COLON);
        this.state = 1216;
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

  public override sempred(
    localContext: antlr.ParserRuleContext | null,
    ruleIndex: number,
    predIndex: number,
  ): boolean {
    switch (ruleIndex) {
      case 47:
        return this.assignable_sempred(localContext as AssignableContext, predIndex);
      case 74:
        return this.expression_sempred(localContext as ExpressionContext, predIndex);
      case 75:
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
    4, 1, 130, 1219, 2, 0, 7, 0, 2, 1, 7, 1, 2, 2, 7, 2, 2, 3, 7, 3, 2, 4, 7, 4, 2, 5, 7, 5, 2, 6,
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
    2, 88, 7, 88, 2, 89, 7, 89, 2, 90, 7, 90, 2, 91, 7, 91, 2, 92, 7, 92, 2, 93, 7, 93, 2, 94, 7,
    94, 2, 95, 7, 95, 1, 0, 3, 0, 194, 8, 0, 1, 0, 5, 0, 197, 8, 0, 10, 0, 12, 0, 200, 9, 0, 1, 0,
    3, 0, 203, 8, 0, 1, 0, 5, 0, 206, 8, 0, 10, 0, 12, 0, 209, 9, 0, 1, 0, 1, 0, 1, 1, 4, 1, 214, 8,
    1, 11, 1, 12, 1, 215, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 3, 2, 227, 8, 2, 1,
    3, 3, 3, 230, 8, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 5, 3, 241, 8, 3, 10,
    3, 12, 3, 244, 9, 3, 1, 3, 1, 3, 3, 3, 248, 8, 3, 1, 3, 1, 3, 1, 4, 1, 4, 1, 4, 1, 4, 1, 5, 3,
    5, 257, 8, 5, 1, 5, 1, 5, 1, 5, 1, 5, 3, 5, 263, 8, 5, 1, 5, 1, 5, 1, 5, 1, 5, 1, 5, 3, 5, 270,
    8, 5, 1, 5, 1, 5, 5, 5, 274, 8, 5, 10, 5, 12, 5, 277, 9, 5, 1, 5, 1, 5, 1, 5, 3, 5, 282, 8, 5,
    1, 5, 1, 5, 1, 6, 3, 6, 287, 8, 6, 1, 6, 1, 6, 1, 6, 1, 6, 1, 6, 1, 6, 1, 6, 1, 6, 1, 6, 1, 6,
    3, 6, 299, 8, 6, 1, 6, 1, 6, 1, 7, 3, 7, 304, 8, 7, 1, 7, 1, 7, 1, 7, 1, 7, 1, 7, 1, 7, 1, 7, 1,
    7, 1, 7, 1, 7, 1, 7, 3, 7, 317, 8, 7, 1, 7, 1, 7, 5, 7, 321, 8, 7, 10, 7, 12, 7, 324, 9, 7, 1,
    7, 1, 7, 1, 7, 1, 8, 1, 8, 1, 8, 3, 8, 332, 8, 8, 1, 9, 3, 9, 335, 8, 9, 1, 9, 1, 9, 1, 9, 1, 9,
    3, 9, 341, 8, 9, 1, 9, 1, 9, 1, 9, 1, 9, 1, 9, 3, 9, 348, 8, 9, 1, 9, 1, 9, 5, 9, 352, 8, 9, 10,
    9, 12, 9, 355, 9, 9, 1, 9, 1, 9, 3, 9, 359, 8, 9, 1, 9, 1, 9, 1, 10, 3, 10, 364, 8, 10, 1, 10,
    1, 10, 1, 10, 1, 10, 3, 10, 370, 8, 10, 1, 10, 1, 10, 1, 11, 3, 11, 375, 8, 11, 1, 11, 1, 11, 1,
    11, 1, 11, 1, 11, 1, 11, 1, 11, 3, 11, 384, 8, 11, 1, 11, 1, 11, 1, 11, 1, 11, 1, 11, 3, 11,
    391, 8, 11, 1, 11, 1, 11, 1, 12, 3, 12, 396, 8, 12, 1, 12, 1, 12, 1, 12, 1, 12, 1, 12, 1, 12, 3,
    12, 404, 8, 12, 1, 12, 1, 12, 3, 12, 408, 8, 12, 1, 12, 1, 12, 1, 12, 5, 12, 413, 8, 12, 10, 12,
    12, 12, 416, 9, 12, 1, 12, 1, 12, 3, 12, 420, 8, 12, 1, 12, 1, 12, 1, 13, 1, 13, 1, 13, 1, 13,
    3, 13, 428, 8, 13, 1, 14, 3, 14, 431, 8, 14, 1, 14, 1, 14, 1, 14, 1, 14, 1, 14, 3, 14, 438, 8,
    14, 1, 14, 1, 14, 1, 14, 1, 14, 3, 14, 444, 8, 14, 1, 14, 1, 14, 5, 14, 448, 8, 14, 10, 14, 12,
    14, 451, 9, 14, 1, 14, 1, 14, 3, 14, 455, 8, 14, 1, 14, 1, 14, 1, 15, 1, 15, 1, 15, 1, 15, 1,
    15, 1, 15, 3, 15, 465, 8, 15, 1, 16, 3, 16, 468, 8, 16, 1, 16, 1, 16, 1, 16, 1, 17, 1, 17, 1,
    18, 4, 18, 476, 8, 18, 11, 18, 12, 18, 477, 1, 19, 1, 19, 1, 19, 1, 19, 1, 19, 1, 19, 1, 19, 1,
    19, 1, 19, 1, 19, 1, 19, 1, 19, 1, 19, 3, 19, 493, 8, 19, 1, 20, 1, 20, 1, 20, 1, 20, 1, 20, 1,
    20, 1, 20, 1, 20, 1, 20, 3, 20, 504, 8, 20, 1, 21, 3, 21, 507, 8, 21, 1, 21, 1, 21, 1, 21, 1,
    21, 1, 21, 1, 21, 1, 22, 3, 22, 516, 8, 22, 1, 22, 1, 22, 1, 22, 1, 22, 1, 22, 1, 22, 1, 23, 3,
    23, 525, 8, 23, 1, 23, 1, 23, 1, 23, 1, 23, 3, 23, 531, 8, 23, 1, 23, 1, 23, 1, 23, 5, 23, 536,
    8, 23, 10, 23, 12, 23, 539, 9, 23, 1, 23, 3, 23, 542, 8, 23, 1, 23, 1, 23, 3, 23, 546, 8, 23, 1,
    23, 1, 23, 1, 24, 5, 24, 551, 8, 24, 10, 24, 12, 24, 554, 9, 24, 1, 25, 3, 25, 557, 8, 25, 1,
    25, 1, 25, 1, 25, 1, 25, 3, 25, 563, 8, 25, 1, 25, 1, 25, 5, 25, 567, 8, 25, 10, 25, 12, 25,
    570, 9, 25, 1, 25, 3, 25, 573, 8, 25, 1, 26, 3, 26, 576, 8, 26, 1, 26, 1, 26, 1, 26, 3, 26, 581,
    8, 26, 1, 26, 1, 26, 5, 26, 585, 8, 26, 10, 26, 12, 26, 588, 9, 26, 1, 26, 3, 26, 591, 8, 26, 1,
    27, 3, 27, 594, 8, 27, 1, 27, 1, 27, 1, 27, 1, 27, 3, 27, 600, 8, 27, 1, 27, 1, 27, 5, 27, 604,
    8, 27, 10, 27, 12, 27, 607, 9, 27, 1, 27, 1, 27, 3, 27, 611, 8, 27, 1, 27, 1, 27, 1, 28, 3, 28,
    616, 8, 28, 1, 28, 1, 28, 1, 28, 1, 28, 1, 28, 1, 28, 3, 28, 624, 8, 28, 1, 28, 1, 28, 5, 28,
    628, 8, 28, 10, 28, 12, 28, 631, 9, 28, 1, 28, 1, 28, 3, 28, 635, 8, 28, 1, 28, 1, 28, 1, 29, 3,
    29, 640, 8, 29, 1, 29, 1, 29, 3, 29, 644, 8, 29, 1, 29, 1, 29, 1, 30, 3, 30, 649, 8, 30, 1, 30,
    1, 30, 1, 30, 3, 30, 654, 8, 30, 1, 30, 1, 30, 1, 30, 4, 30, 659, 8, 30, 11, 30, 12, 30, 660, 1,
    30, 1, 30, 3, 30, 665, 8, 30, 1, 30, 1, 30, 1, 31, 5, 31, 670, 8, 31, 10, 31, 12, 31, 673, 9,
    31, 1, 32, 3, 32, 676, 8, 32, 1, 32, 1, 32, 1, 32, 1, 32, 1, 32, 1, 32, 3, 32, 684, 8, 32, 1,
    32, 1, 32, 5, 32, 688, 8, 32, 10, 32, 12, 32, 691, 9, 32, 1, 32, 3, 32, 694, 8, 32, 1, 33, 3,
    33, 697, 8, 33, 1, 33, 1, 33, 1, 33, 1, 33, 1, 33, 1, 33, 3, 33, 705, 8, 33, 1, 33, 1, 33, 1,
    34, 1, 34, 3, 34, 711, 8, 34, 1, 35, 3, 35, 714, 8, 35, 1, 35, 1, 35, 1, 35, 1, 35, 1, 35, 1,
    35, 1, 35, 1, 35, 1, 35, 3, 35, 725, 8, 35, 1, 35, 1, 35, 1, 36, 1, 36, 1, 36, 3, 36, 732, 8,
    36, 1, 36, 1, 36, 1, 37, 4, 37, 737, 8, 37, 11, 37, 12, 37, 738, 1, 38, 1, 38, 1, 38, 1, 38, 1,
    38, 3, 38, 746, 8, 38, 1, 39, 3, 39, 749, 8, 39, 1, 39, 1, 39, 1, 39, 1, 39, 3, 39, 755, 8, 39,
    1, 39, 1, 39, 1, 39, 1, 39, 1, 39, 3, 39, 762, 8, 39, 1, 39, 3, 39, 765, 8, 39, 1, 39, 1, 39, 5,
    39, 769, 8, 39, 10, 39, 12, 39, 772, 9, 39, 1, 39, 1, 39, 1, 39, 1, 40, 3, 40, 778, 8, 40, 1,
    40, 1, 40, 1, 40, 1, 40, 3, 40, 784, 8, 40, 1, 40, 3, 40, 787, 8, 40, 1, 40, 1, 40, 1, 41, 3,
    41, 792, 8, 41, 1, 41, 1, 41, 1, 41, 1, 41, 3, 41, 798, 8, 41, 1, 41, 1, 41, 1, 41, 1, 41, 1,
    41, 3, 41, 805, 8, 41, 1, 41, 1, 41, 5, 41, 809, 8, 41, 10, 41, 12, 41, 812, 9, 41, 1, 41, 1,
    41, 1, 41, 3, 41, 817, 8, 41, 1, 41, 1, 41, 1, 42, 3, 42, 822, 8, 42, 1, 42, 1, 42, 1, 42, 1,
    42, 3, 42, 828, 8, 42, 1, 42, 1, 42, 1, 42, 1, 42, 1, 42, 3, 42, 835, 8, 42, 1, 42, 1, 42, 5,
    42, 839, 8, 42, 10, 42, 12, 42, 842, 9, 42, 1, 42, 1, 42, 3, 42, 846, 8, 42, 1, 42, 1, 42, 1,
    43, 3, 43, 851, 8, 43, 1, 43, 1, 43, 1, 43, 1, 43, 1, 43, 1, 43, 3, 43, 859, 8, 43, 1, 43, 1,
    43, 1, 43, 1, 43, 1, 43, 1, 43, 1, 43, 3, 43, 868, 8, 43, 1, 43, 1, 43, 1, 44, 3, 44, 873, 8,
    44, 1, 44, 1, 44, 1, 44, 1, 44, 1, 44, 1, 44, 3, 44, 881, 8, 44, 1, 44, 1, 44, 1, 44, 1, 44, 1,
    44, 3, 44, 888, 8, 44, 1, 44, 1, 44, 1, 44, 3, 44, 893, 8, 44, 1, 44, 1, 44, 1, 45, 1, 45, 1,
    46, 1, 46, 1, 47, 1, 47, 1, 47, 1, 47, 1, 47, 3, 47, 906, 8, 47, 1, 47, 1, 47, 5, 47, 910, 8,
    47, 10, 47, 12, 47, 913, 9, 47, 1, 48, 1, 48, 1, 49, 1, 49, 1, 50, 1, 50, 1, 51, 1, 51, 1, 51,
    1, 51, 1, 51, 1, 51, 1, 51, 3, 51, 928, 8, 51, 1, 52, 1, 52, 1, 52, 1, 52, 3, 52, 934, 8, 52, 1,
    53, 1, 53, 1, 53, 5, 53, 939, 8, 53, 10, 53, 12, 53, 942, 9, 53, 1, 54, 1, 54, 3, 54, 946, 8,
    54, 1, 55, 1, 55, 1, 55, 5, 55, 951, 8, 55, 10, 55, 12, 55, 954, 9, 55, 1, 56, 1, 56, 1, 56, 4,
    56, 959, 8, 56, 11, 56, 12, 56, 960, 1, 57, 1, 57, 1, 57, 5, 57, 966, 8, 57, 10, 57, 12, 57,
    969, 9, 57, 1, 58, 1, 58, 1, 58, 1, 58, 1, 59, 1, 59, 1, 59, 5, 59, 978, 8, 59, 10, 59, 12, 59,
    981, 9, 59, 1, 60, 1, 60, 1, 60, 1, 60, 3, 60, 987, 8, 60, 1, 61, 1, 61, 1, 62, 1, 62, 1, 63, 1,
    63, 1, 63, 1, 63, 1, 63, 1, 63, 3, 63, 999, 8, 63, 1, 64, 1, 64, 1, 65, 1, 65, 1, 65, 3, 65,
    1006, 8, 65, 1, 66, 1, 66, 1, 67, 1, 67, 1, 68, 1, 68, 5, 68, 1014, 8, 68, 10, 68, 12, 68, 1017,
    9, 68, 1, 68, 1, 68, 1, 69, 1, 69, 3, 69, 1023, 8, 69, 1, 70, 4, 70, 1026, 8, 70, 11, 70, 12,
    70, 1027, 1, 71, 1, 71, 1, 71, 1, 71, 1, 72, 1, 72, 1, 72, 1, 72, 1, 73, 1, 73, 1, 73, 1, 73, 1,
    74, 1, 74, 1, 74, 1, 74, 1, 74, 3, 74, 1047, 8, 74, 1, 74, 1, 74, 1, 74, 1, 74, 1, 74, 5, 74,
    1054, 8, 74, 10, 74, 12, 74, 1057, 9, 74, 1, 74, 1, 74, 1, 74, 5, 74, 1062, 8, 74, 10, 74, 12,
    74, 1065, 9, 74, 1, 75, 1, 75, 1, 75, 1, 75, 1, 75, 1, 75, 1, 75, 1, 75, 1, 75, 3, 75, 1076, 8,
    75, 1, 75, 1, 75, 1, 75, 1, 75, 1, 75, 5, 75, 1083, 8, 75, 10, 75, 12, 75, 1086, 9, 75, 1, 76,
    1, 76, 3, 76, 1090, 8, 76, 1, 77, 1, 77, 1, 78, 1, 78, 1, 78, 1, 78, 1, 79, 1, 79, 3, 79, 1100,
    8, 79, 1, 80, 1, 80, 1, 80, 1, 81, 1, 81, 1, 81, 1, 82, 1, 82, 1, 82, 1, 82, 1, 83, 1, 83, 1,
    83, 1, 83, 1, 84, 1, 84, 1, 84, 1, 84, 1, 85, 1, 85, 1, 85, 1, 85, 1, 86, 1, 86, 1, 86, 5, 86,
    1127, 8, 86, 10, 86, 12, 86, 1130, 9, 86, 1, 87, 1, 87, 1, 87, 1, 87, 1, 88, 1, 88, 1, 88, 3,
    88, 1139, 8, 88, 1, 88, 1, 88, 1, 89, 1, 89, 1, 89, 1, 89, 1, 89, 1, 89, 1, 89, 1, 89, 1, 89, 1,
    89, 1, 89, 1, 89, 1, 89, 1, 89, 1, 89, 1, 89, 3, 89, 1159, 8, 89, 1, 90, 1, 90, 1, 90, 3, 90,
    1164, 8, 90, 1, 90, 1, 90, 1, 91, 1, 91, 3, 91, 1170, 8, 91, 1, 91, 1, 91, 1, 91, 1, 92, 1, 92,
    1, 92, 1, 92, 1, 92, 5, 92, 1180, 8, 92, 10, 92, 12, 92, 1183, 9, 92, 1, 92, 1, 92, 1, 93, 1,
    93, 1, 93, 1, 93, 1, 93, 1, 93, 5, 93, 1193, 8, 93, 10, 93, 12, 93, 1196, 9, 93, 1, 93, 1, 93,
    1, 93, 1, 93, 1, 93, 1, 94, 1, 94, 1, 94, 1, 94, 1, 94, 4, 94, 1208, 8, 94, 11, 94, 12, 94,
    1209, 1, 94, 1, 94, 1, 95, 1, 95, 1, 95, 1, 95, 1, 95, 1, 95, 0, 3, 94, 148, 150, 96, 0, 2, 4,
    6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40, 42, 44, 46, 48, 50, 52,
    54, 56, 58, 60, 62, 64, 66, 68, 70, 72, 74, 76, 78, 80, 82, 84, 86, 88, 90, 92, 94, 96, 98, 100,
    102, 104, 106, 108, 110, 112, 114, 116, 118, 120, 122, 124, 126, 128, 130, 132, 134, 136, 138,
    140, 142, 144, 146, 148, 150, 152, 154, 156, 158, 160, 162, 164, 166, 168, 170, 172, 174, 176,
    178, 180, 182, 184, 186, 188, 190, 0, 1, 1, 0, 59, 60, 1339, 0, 193, 1, 0, 0, 0, 2, 213, 1, 0,
    0, 0, 4, 226, 1, 0, 0, 0, 6, 229, 1, 0, 0, 0, 8, 251, 1, 0, 0, 0, 10, 256, 1, 0, 0, 0, 12, 286,
    1, 0, 0, 0, 14, 303, 1, 0, 0, 0, 16, 331, 1, 0, 0, 0, 18, 334, 1, 0, 0, 0, 20, 363, 1, 0, 0, 0,
    22, 374, 1, 0, 0, 0, 24, 395, 1, 0, 0, 0, 26, 427, 1, 0, 0, 0, 28, 430, 1, 0, 0, 0, 30, 464, 1,
    0, 0, 0, 32, 467, 1, 0, 0, 0, 34, 472, 1, 0, 0, 0, 36, 475, 1, 0, 0, 0, 38, 492, 1, 0, 0, 0, 40,
    503, 1, 0, 0, 0, 42, 506, 1, 0, 0, 0, 44, 515, 1, 0, 0, 0, 46, 524, 1, 0, 0, 0, 48, 552, 1, 0,
    0, 0, 50, 556, 1, 0, 0, 0, 52, 575, 1, 0, 0, 0, 54, 593, 1, 0, 0, 0, 56, 615, 1, 0, 0, 0, 58,
    639, 1, 0, 0, 0, 60, 648, 1, 0, 0, 0, 62, 671, 1, 0, 0, 0, 64, 675, 1, 0, 0, 0, 66, 696, 1, 0,
    0, 0, 68, 710, 1, 0, 0, 0, 70, 713, 1, 0, 0, 0, 72, 728, 1, 0, 0, 0, 74, 736, 1, 0, 0, 0, 76,
    745, 1, 0, 0, 0, 78, 748, 1, 0, 0, 0, 80, 777, 1, 0, 0, 0, 82, 791, 1, 0, 0, 0, 84, 821, 1, 0,
    0, 0, 86, 850, 1, 0, 0, 0, 88, 872, 1, 0, 0, 0, 90, 896, 1, 0, 0, 0, 92, 898, 1, 0, 0, 0, 94,
    905, 1, 0, 0, 0, 96, 914, 1, 0, 0, 0, 98, 916, 1, 0, 0, 0, 100, 918, 1, 0, 0, 0, 102, 927, 1, 0,
    0, 0, 104, 933, 1, 0, 0, 0, 106, 935, 1, 0, 0, 0, 108, 945, 1, 0, 0, 0, 110, 947, 1, 0, 0, 0,
    112, 955, 1, 0, 0, 0, 114, 962, 1, 0, 0, 0, 116, 970, 1, 0, 0, 0, 118, 974, 1, 0, 0, 0, 120,
    986, 1, 0, 0, 0, 122, 988, 1, 0, 0, 0, 124, 990, 1, 0, 0, 0, 126, 998, 1, 0, 0, 0, 128, 1000, 1,
    0, 0, 0, 130, 1005, 1, 0, 0, 0, 132, 1007, 1, 0, 0, 0, 134, 1009, 1, 0, 0, 0, 136, 1011, 1, 0,
    0, 0, 138, 1022, 1, 0, 0, 0, 140, 1025, 1, 0, 0, 0, 142, 1029, 1, 0, 0, 0, 144, 1033, 1, 0, 0,
    0, 146, 1037, 1, 0, 0, 0, 148, 1046, 1, 0, 0, 0, 150, 1075, 1, 0, 0, 0, 152, 1089, 1, 0, 0, 0,
    154, 1091, 1, 0, 0, 0, 156, 1093, 1, 0, 0, 0, 158, 1099, 1, 0, 0, 0, 160, 1101, 1, 0, 0, 0, 162,
    1104, 1, 0, 0, 0, 164, 1107, 1, 0, 0, 0, 166, 1111, 1, 0, 0, 0, 168, 1115, 1, 0, 0, 0, 170,
    1119, 1, 0, 0, 0, 172, 1123, 1, 0, 0, 0, 174, 1131, 1, 0, 0, 0, 176, 1135, 1, 0, 0, 0, 178,
    1158, 1, 0, 0, 0, 180, 1160, 1, 0, 0, 0, 182, 1169, 1, 0, 0, 0, 184, 1174, 1, 0, 0, 0, 186,
    1186, 1, 0, 0, 0, 188, 1202, 1, 0, 0, 0, 190, 1213, 1, 0, 0, 0, 192, 194, 3, 32, 16, 0, 193,
    192, 1, 0, 0, 0, 193, 194, 1, 0, 0, 0, 194, 198, 1, 0, 0, 0, 195, 197, 3, 4, 2, 0, 196, 195, 1,
    0, 0, 0, 197, 200, 1, 0, 0, 0, 198, 196, 1, 0, 0, 0, 198, 199, 1, 0, 0, 0, 199, 202, 1, 0, 0, 0,
    200, 198, 1, 0, 0, 0, 201, 203, 3, 8, 4, 0, 202, 201, 1, 0, 0, 0, 202, 203, 1, 0, 0, 0, 203,
    207, 1, 0, 0, 0, 204, 206, 5, 94, 0, 0, 205, 204, 1, 0, 0, 0, 206, 209, 1, 0, 0, 0, 207, 205, 1,
    0, 0, 0, 207, 208, 1, 0, 0, 0, 208, 210, 1, 0, 0, 0, 209, 207, 1, 0, 0, 0, 210, 211, 5, 0, 0, 1,
    211, 1, 1, 0, 0, 0, 212, 214, 3, 4, 2, 0, 213, 212, 1, 0, 0, 0, 214, 215, 1, 0, 0, 0, 215, 213,
    1, 0, 0, 0, 215, 216, 1, 0, 0, 0, 216, 3, 1, 0, 0, 0, 217, 227, 3, 6, 3, 0, 218, 227, 3, 10, 5,
    0, 219, 227, 3, 12, 6, 0, 220, 227, 3, 18, 9, 0, 221, 227, 3, 20, 10, 0, 222, 227, 3, 22, 11, 0,
    223, 227, 3, 24, 12, 0, 224, 227, 3, 28, 14, 0, 225, 227, 3, 32, 16, 0, 226, 217, 1, 0, 0, 0,
    226, 218, 1, 0, 0, 0, 226, 219, 1, 0, 0, 0, 226, 220, 1, 0, 0, 0, 226, 221, 1, 0, 0, 0, 226,
    222, 1, 0, 0, 0, 226, 223, 1, 0, 0, 0, 226, 224, 1, 0, 0, 0, 226, 225, 1, 0, 0, 0, 227, 5, 1, 0,
    0, 0, 228, 230, 5, 107, 0, 0, 229, 228, 1, 0, 0, 0, 229, 230, 1, 0, 0, 0, 230, 231, 1, 0, 0, 0,
    231, 232, 5, 42, 0, 0, 232, 233, 5, 8, 0, 0, 233, 234, 5, 79, 0, 0, 234, 235, 5, 80, 0, 0, 235,
    236, 5, 69, 0, 0, 236, 237, 5, 45, 0, 0, 237, 238, 5, 83, 0, 0, 238, 242, 5, 94, 0, 0, 239, 241,
    3, 40, 20, 0, 240, 239, 1, 0, 0, 0, 241, 244, 1, 0, 0, 0, 242, 240, 1, 0, 0, 0, 242, 243, 1, 0,
    0, 0, 243, 245, 1, 0, 0, 0, 244, 242, 1, 0, 0, 0, 245, 247, 5, 109, 0, 0, 246, 248, 5, 108, 0,
    0, 247, 246, 1, 0, 0, 0, 247, 248, 1, 0, 0, 0, 248, 249, 1, 0, 0, 0, 249, 250, 5, 94, 0, 0, 250,
    7, 1, 0, 0, 0, 251, 252, 5, 8, 0, 0, 252, 253, 5, 79, 0, 0, 253, 254, 5, 80, 0, 0, 254, 9, 1, 0,
    0, 0, 255, 257, 5, 107, 0, 0, 256, 255, 1, 0, 0, 0, 256, 257, 1, 0, 0, 0, 257, 258, 1, 0, 0, 0,
    258, 259, 5, 42, 0, 0, 259, 260, 3, 96, 48, 0, 260, 262, 5, 79, 0, 0, 261, 263, 3, 110, 55, 0,
    262, 261, 1, 0, 0, 0, 262, 263, 1, 0, 0, 0, 263, 264, 1, 0, 0, 0, 264, 265, 5, 80, 0, 0, 265,
    266, 5, 69, 0, 0, 266, 267, 3, 120, 60, 0, 267, 269, 5, 83, 0, 0, 268, 270, 3, 34, 17, 0, 269,
    268, 1, 0, 0, 0, 269, 270, 1, 0, 0, 0, 270, 271, 1, 0, 0, 0, 271, 275, 5, 94, 0, 0, 272, 274, 3,
    40, 20, 0, 273, 272, 1, 0, 0, 0, 274, 277, 1, 0, 0, 0, 275, 273, 1, 0, 0, 0, 275, 276, 1, 0, 0,
    0, 276, 278, 1, 0, 0, 0, 277, 275, 1, 0, 0, 0, 278, 279, 3, 72, 36, 0, 279, 281, 5, 110, 0, 0,
    280, 282, 5, 108, 0, 0, 281, 280, 1, 0, 0, 0, 281, 282, 1, 0, 0, 0, 282, 283, 1, 0, 0, 0, 283,
    284, 5, 94, 0, 0, 284, 11, 1, 0, 0, 0, 285, 287, 5, 107, 0, 0, 286, 285, 1, 0, 0, 0, 286, 287,
    1, 0, 0, 0, 287, 288, 1, 0, 0, 0, 288, 289, 5, 1, 0, 0, 289, 290, 3, 100, 50, 0, 290, 291, 5,
    79, 0, 0, 291, 292, 5, 50, 0, 0, 292, 293, 5, 80, 0, 0, 293, 294, 5, 83, 0, 0, 294, 295, 5, 94,
    0, 0, 295, 296, 3, 14, 7, 0, 296, 298, 5, 112, 0, 0, 297, 299, 5, 108, 0, 0, 298, 297, 1, 0, 0,
    0, 298, 299, 1, 0, 0, 0, 299, 300, 1, 0, 0, 0, 300, 301, 5, 94, 0, 0, 301, 13, 1, 0, 0, 0, 302,
    304, 5, 107, 0, 0, 303, 302, 1, 0, 0, 0, 303, 304, 1, 0, 0, 0, 304, 305, 1, 0, 0, 0, 305, 306,
    5, 42, 0, 0, 306, 307, 3, 98, 49, 0, 307, 308, 5, 79, 0, 0, 308, 309, 5, 73, 0, 0, 309, 310, 5,
    83, 0, 0, 310, 311, 3, 100, 50, 0, 311, 312, 5, 80, 0, 0, 312, 313, 5, 69, 0, 0, 313, 314, 5,
    45, 0, 0, 314, 316, 5, 83, 0, 0, 315, 317, 3, 34, 17, 0, 316, 315, 1, 0, 0, 0, 316, 317, 1, 0,
    0, 0, 317, 318, 1, 0, 0, 0, 318, 322, 5, 94, 0, 0, 319, 321, 3, 16, 8, 0, 320, 319, 1, 0, 0, 0,
    321, 324, 1, 0, 0, 0, 322, 320, 1, 0, 0, 0, 322, 323, 1, 0, 0, 0, 323, 325, 1, 0, 0, 0, 324,
    322, 1, 0, 0, 0, 325, 326, 5, 111, 0, 0, 326, 327, 5, 94, 0, 0, 327, 15, 1, 0, 0, 0, 328, 332,
    3, 70, 35, 0, 329, 332, 3, 42, 21, 0, 330, 332, 3, 32, 16, 0, 331, 328, 1, 0, 0, 0, 331, 329, 1,
    0, 0, 0, 331, 330, 1, 0, 0, 0, 332, 17, 1, 0, 0, 0, 333, 335, 5, 107, 0, 0, 334, 333, 1, 0, 0,
    0, 334, 335, 1, 0, 0, 0, 335, 336, 1, 0, 0, 0, 336, 337, 5, 42, 0, 0, 337, 338, 3, 96, 48, 0,
    338, 340, 5, 79, 0, 0, 339, 341, 3, 110, 55, 0, 340, 339, 1, 0, 0, 0, 340, 341, 1, 0, 0, 0, 341,
    342, 1, 0, 0, 0, 342, 343, 5, 80, 0, 0, 343, 344, 5, 69, 0, 0, 344, 345, 5, 45, 0, 0, 345, 347,
    5, 83, 0, 0, 346, 348, 3, 34, 17, 0, 347, 346, 1, 0, 0, 0, 347, 348, 1, 0, 0, 0, 348, 349, 1, 0,
    0, 0, 349, 353, 5, 94, 0, 0, 350, 352, 3, 40, 20, 0, 351, 350, 1, 0, 0, 0, 352, 355, 1, 0, 0, 0,
    353, 351, 1, 0, 0, 0, 353, 354, 1, 0, 0, 0, 354, 356, 1, 0, 0, 0, 355, 353, 1, 0, 0, 0, 356,
    358, 5, 113, 0, 0, 357, 359, 5, 108, 0, 0, 358, 357, 1, 0, 0, 0, 358, 359, 1, 0, 0, 0, 359, 360,
    1, 0, 0, 0, 360, 361, 5, 94, 0, 0, 361, 19, 1, 0, 0, 0, 362, 364, 5, 106, 0, 0, 363, 362, 1, 0,
    0, 0, 363, 364, 1, 0, 0, 0, 364, 365, 1, 0, 0, 0, 365, 366, 3, 90, 45, 0, 366, 367, 5, 74, 0, 0,
    367, 369, 3, 104, 52, 0, 368, 370, 3, 34, 17, 0, 369, 368, 1, 0, 0, 0, 369, 370, 1, 0, 0, 0,
    370, 371, 1, 0, 0, 0, 371, 372, 5, 94, 0, 0, 372, 21, 1, 0, 0, 0, 373, 375, 5, 107, 0, 0, 374,
    373, 1, 0, 0, 0, 374, 375, 1, 0, 0, 0, 375, 376, 1, 0, 0, 0, 376, 377, 5, 1, 0, 0, 377, 378, 3,
    102, 51, 0, 378, 379, 5, 79, 0, 0, 379, 380, 5, 49, 0, 0, 380, 381, 5, 80, 0, 0, 381, 383, 5,
    83, 0, 0, 382, 384, 3, 34, 17, 0, 383, 382, 1, 0, 0, 0, 383, 384, 1, 0, 0, 0, 384, 385, 1, 0, 0,
    0, 385, 386, 5, 94, 0, 0, 386, 387, 3, 118, 59, 0, 387, 388, 5, 94, 0, 0, 388, 390, 5, 114, 0,
    0, 389, 391, 5, 108, 0, 0, 390, 389, 1, 0, 0, 0, 390, 391, 1, 0, 0, 0, 391, 392, 1, 0, 0, 0,
    392, 393, 5, 94, 0, 0, 393, 23, 1, 0, 0, 0, 394, 396, 5, 107, 0, 0, 395, 394, 1, 0, 0, 0, 395,
    396, 1, 0, 0, 0, 396, 397, 1, 0, 0, 0, 397, 398, 5, 1, 0, 0, 398, 403, 3, 102, 51, 0, 399, 400,
    5, 79, 0, 0, 400, 401, 3, 102, 51, 0, 401, 402, 5, 80, 0, 0, 402, 404, 1, 0, 0, 0, 403, 399, 1,
    0, 0, 0, 403, 404, 1, 0, 0, 0, 404, 405, 1, 0, 0, 0, 405, 407, 5, 83, 0, 0, 406, 408, 3, 34, 17,
    0, 407, 406, 1, 0, 0, 0, 407, 408, 1, 0, 0, 0, 408, 409, 1, 0, 0, 0, 409, 410, 5, 94, 0, 0, 410,
    414, 3, 78, 39, 0, 411, 413, 3, 26, 13, 0, 412, 411, 1, 0, 0, 0, 413, 416, 1, 0, 0, 0, 414, 412,
    1, 0, 0, 0, 414, 415, 1, 0, 0, 0, 415, 417, 1, 0, 0, 0, 416, 414, 1, 0, 0, 0, 417, 419, 5, 115,
    0, 0, 418, 420, 5, 108, 0, 0, 419, 418, 1, 0, 0, 0, 419, 420, 1, 0, 0, 0, 420, 421, 1, 0, 0, 0,
    421, 422, 5, 94, 0, 0, 422, 25, 1, 0, 0, 0, 423, 428, 3, 80, 40, 0, 424, 428, 3, 82, 41, 0, 425,
    428, 3, 84, 42, 0, 426, 428, 3, 32, 16, 0, 427, 423, 1, 0, 0, 0, 427, 424, 1, 0, 0, 0, 427, 425,
    1, 0, 0, 0, 427, 426, 1, 0, 0, 0, 428, 27, 1, 0, 0, 0, 429, 431, 5, 107, 0, 0, 430, 429, 1, 0,
    0, 0, 430, 431, 1, 0, 0, 0, 431, 432, 1, 0, 0, 0, 432, 433, 5, 1, 0, 0, 433, 434, 3, 102, 51, 0,
    434, 437, 5, 79, 0, 0, 435, 438, 3, 102, 51, 0, 436, 438, 5, 48, 0, 0, 437, 435, 1, 0, 0, 0,
    437, 436, 1, 0, 0, 0, 438, 439, 1, 0, 0, 0, 439, 440, 5, 80, 0, 0, 440, 441, 1, 0, 0, 0, 441,
    443, 5, 83, 0, 0, 442, 444, 3, 34, 17, 0, 443, 442, 1, 0, 0, 0, 443, 444, 1, 0, 0, 0, 444, 445,
    1, 0, 0, 0, 445, 449, 5, 94, 0, 0, 446, 448, 3, 30, 15, 0, 447, 446, 1, 0, 0, 0, 448, 451, 1, 0,
    0, 0, 449, 447, 1, 0, 0, 0, 449, 450, 1, 0, 0, 0, 450, 452, 1, 0, 0, 0, 451, 449, 1, 0, 0, 0,
    452, 454, 5, 115, 0, 0, 453, 455, 5, 108, 0, 0, 454, 453, 1, 0, 0, 0, 454, 455, 1, 0, 0, 0, 455,
    456, 1, 0, 0, 0, 456, 457, 5, 94, 0, 0, 457, 29, 1, 0, 0, 0, 458, 465, 3, 80, 40, 0, 459, 465,
    3, 82, 41, 0, 460, 465, 3, 84, 42, 0, 461, 465, 3, 86, 43, 0, 462, 465, 3, 88, 44, 0, 463, 465,
    3, 32, 16, 0, 464, 458, 1, 0, 0, 0, 464, 459, 1, 0, 0, 0, 464, 460, 1, 0, 0, 0, 464, 461, 1, 0,
    0, 0, 464, 462, 1, 0, 0, 0, 464, 463, 1, 0, 0, 0, 465, 31, 1, 0, 0, 0, 466, 468, 5, 106, 0, 0,
    467, 466, 1, 0, 0, 0, 467, 468, 1, 0, 0, 0, 468, 469, 1, 0, 0, 0, 469, 470, 3, 34, 17, 0, 470,
    471, 5, 94, 0, 0, 471, 33, 1, 0, 0, 0, 472, 473, 5, 127, 0, 0, 473, 35, 1, 0, 0, 0, 474, 476, 3,
    38, 19, 0, 475, 474, 1, 0, 0, 0, 476, 477, 1, 0, 0, 0, 477, 475, 1, 0, 0, 0, 477, 478, 1, 0, 0,
    0, 478, 37, 1, 0, 0, 0, 479, 493, 3, 42, 21, 0, 480, 493, 3, 70, 35, 0, 481, 493, 3, 44, 22, 0,
    482, 493, 3, 46, 23, 0, 483, 493, 3, 50, 25, 0, 484, 493, 3, 52, 26, 0, 485, 493, 3, 54, 27, 0,
    486, 493, 3, 56, 28, 0, 487, 493, 3, 58, 29, 0, 488, 493, 3, 60, 30, 0, 489, 493, 3, 64, 32, 0,
    490, 493, 3, 66, 33, 0, 491, 493, 3, 32, 16, 0, 492, 479, 1, 0, 0, 0, 492, 480, 1, 0, 0, 0, 492,
    481, 1, 0, 0, 0, 492, 482, 1, 0, 0, 0, 492, 483, 1, 0, 0, 0, 492, 484, 1, 0, 0, 0, 492, 485, 1,
    0, 0, 0, 492, 486, 1, 0, 0, 0, 492, 487, 1, 0, 0, 0, 492, 488, 1, 0, 0, 0, 492, 489, 1, 0, 0, 0,
    492, 490, 1, 0, 0, 0, 492, 491, 1, 0, 0, 0, 493, 39, 1, 0, 0, 0, 494, 504, 3, 42, 21, 0, 495,
    504, 3, 44, 22, 0, 496, 504, 3, 46, 23, 0, 497, 504, 3, 54, 27, 0, 498, 504, 3, 56, 28, 0, 499,
    504, 3, 58, 29, 0, 500, 504, 3, 60, 30, 0, 501, 504, 3, 66, 33, 0, 502, 504, 3, 32, 16, 0, 503,
    494, 1, 0, 0, 0, 503, 495, 1, 0, 0, 0, 503, 496, 1, 0, 0, 0, 503, 497, 1, 0, 0, 0, 503, 498, 1,
    0, 0, 0, 503, 499, 1, 0, 0, 0, 503, 500, 1, 0, 0, 0, 503, 501, 1, 0, 0, 0, 503, 502, 1, 0, 0, 0,
    504, 41, 1, 0, 0, 0, 505, 507, 5, 106, 0, 0, 506, 505, 1, 0, 0, 0, 506, 507, 1, 0, 0, 0, 507,
    508, 1, 0, 0, 0, 508, 509, 3, 90, 45, 0, 509, 510, 5, 74, 0, 0, 510, 511, 3, 148, 74, 0, 511,
    512, 5, 124, 0, 0, 512, 513, 5, 94, 0, 0, 513, 43, 1, 0, 0, 0, 514, 516, 5, 106, 0, 0, 515, 514,
    1, 0, 0, 0, 515, 516, 1, 0, 0, 0, 516, 517, 1, 0, 0, 0, 517, 518, 3, 94, 47, 0, 518, 519, 5, 74,
    0, 0, 519, 520, 3, 148, 74, 0, 520, 521, 5, 123, 0, 0, 521, 522, 5, 94, 0, 0, 522, 45, 1, 0, 0,
    0, 523, 525, 5, 107, 0, 0, 524, 523, 1, 0, 0, 0, 524, 525, 1, 0, 0, 0, 525, 526, 1, 0, 0, 0,
    526, 527, 5, 5, 0, 0, 527, 528, 3, 148, 74, 0, 528, 530, 5, 83, 0, 0, 529, 531, 3, 34, 17, 0,
    530, 529, 1, 0, 0, 0, 530, 531, 1, 0, 0, 0, 531, 532, 1, 0, 0, 0, 532, 533, 5, 94, 0, 0, 533,
    537, 3, 48, 24, 0, 534, 536, 3, 50, 25, 0, 535, 534, 1, 0, 0, 0, 536, 539, 1, 0, 0, 0, 537, 535,
    1, 0, 0, 0, 537, 538, 1, 0, 0, 0, 538, 541, 1, 0, 0, 0, 539, 537, 1, 0, 0, 0, 540, 542, 3, 52,
    26, 0, 541, 540, 1, 0, 0, 0, 541, 542, 1, 0, 0, 0, 542, 543, 1, 0, 0, 0, 543, 545, 5, 116, 0, 0,
    544, 546, 5, 108, 0, 0, 545, 544, 1, 0, 0, 0, 545, 546, 1, 0, 0, 0, 546, 547, 1, 0, 0, 0, 547,
    548, 5, 94, 0, 0, 548, 47, 1, 0, 0, 0, 549, 551, 3, 40, 20, 0, 550, 549, 1, 0, 0, 0, 551, 554,
    1, 0, 0, 0, 552, 550, 1, 0, 0, 0, 552, 553, 1, 0, 0, 0, 553, 49, 1, 0, 0, 0, 554, 552, 1, 0, 0,
    0, 555, 557, 5, 107, 0, 0, 556, 555, 1, 0, 0, 0, 556, 557, 1, 0, 0, 0, 557, 558, 1, 0, 0, 0,
    558, 559, 5, 2, 0, 0, 559, 560, 3, 148, 74, 0, 560, 562, 5, 83, 0, 0, 561, 563, 3, 34, 17, 0,
    562, 561, 1, 0, 0, 0, 562, 563, 1, 0, 0, 0, 563, 564, 1, 0, 0, 0, 564, 568, 5, 94, 0, 0, 565,
    567, 3, 40, 20, 0, 566, 565, 1, 0, 0, 0, 567, 570, 1, 0, 0, 0, 568, 566, 1, 0, 0, 0, 568, 569,
    1, 0, 0, 0, 569, 572, 1, 0, 0, 0, 570, 568, 1, 0, 0, 0, 571, 573, 5, 108, 0, 0, 572, 571, 1, 0,
    0, 0, 572, 573, 1, 0, 0, 0, 573, 51, 1, 0, 0, 0, 574, 576, 5, 107, 0, 0, 575, 574, 1, 0, 0, 0,
    575, 576, 1, 0, 0, 0, 576, 577, 1, 0, 0, 0, 577, 578, 5, 3, 0, 0, 578, 580, 5, 83, 0, 0, 579,
    581, 3, 34, 17, 0, 580, 579, 1, 0, 0, 0, 580, 581, 1, 0, 0, 0, 581, 582, 1, 0, 0, 0, 582, 586,
    5, 94, 0, 0, 583, 585, 3, 40, 20, 0, 584, 583, 1, 0, 0, 0, 585, 588, 1, 0, 0, 0, 586, 584, 1, 0,
    0, 0, 586, 587, 1, 0, 0, 0, 587, 590, 1, 0, 0, 0, 588, 586, 1, 0, 0, 0, 589, 591, 5, 108, 0, 0,
    590, 589, 1, 0, 0, 0, 590, 591, 1, 0, 0, 0, 591, 53, 1, 0, 0, 0, 592, 594, 5, 107, 0, 0, 593,
    592, 1, 0, 0, 0, 593, 594, 1, 0, 0, 0, 594, 595, 1, 0, 0, 0, 595, 596, 5, 11, 0, 0, 596, 597, 3,
    148, 74, 0, 597, 599, 5, 83, 0, 0, 598, 600, 3, 34, 17, 0, 599, 598, 1, 0, 0, 0, 599, 600, 1, 0,
    0, 0, 600, 601, 1, 0, 0, 0, 601, 605, 5, 94, 0, 0, 602, 604, 3, 40, 20, 0, 603, 602, 1, 0, 0, 0,
    604, 607, 1, 0, 0, 0, 605, 603, 1, 0, 0, 0, 605, 606, 1, 0, 0, 0, 606, 608, 1, 0, 0, 0, 607,
    605, 1, 0, 0, 0, 608, 610, 5, 117, 0, 0, 609, 611, 5, 108, 0, 0, 610, 609, 1, 0, 0, 0, 610, 611,
    1, 0, 0, 0, 611, 612, 1, 0, 0, 0, 612, 613, 5, 94, 0, 0, 613, 55, 1, 0, 0, 0, 614, 616, 5, 107,
    0, 0, 615, 614, 1, 0, 0, 0, 615, 616, 1, 0, 0, 0, 616, 617, 1, 0, 0, 0, 617, 618, 5, 4, 0, 0,
    618, 619, 3, 90, 45, 0, 619, 620, 5, 6, 0, 0, 620, 621, 3, 148, 74, 0, 621, 623, 5, 83, 0, 0,
    622, 624, 3, 34, 17, 0, 623, 622, 1, 0, 0, 0, 623, 624, 1, 0, 0, 0, 624, 625, 1, 0, 0, 0, 625,
    629, 5, 94, 0, 0, 626, 628, 3, 40, 20, 0, 627, 626, 1, 0, 0, 0, 628, 631, 1, 0, 0, 0, 629, 627,
    1, 0, 0, 0, 629, 630, 1, 0, 0, 0, 630, 632, 1, 0, 0, 0, 631, 629, 1, 0, 0, 0, 632, 634, 5, 118,
    0, 0, 633, 635, 5, 108, 0, 0, 634, 633, 1, 0, 0, 0, 634, 635, 1, 0, 0, 0, 635, 636, 1, 0, 0, 0,
    636, 637, 5, 94, 0, 0, 637, 57, 1, 0, 0, 0, 638, 640, 5, 106, 0, 0, 639, 638, 1, 0, 0, 0, 639,
    640, 1, 0, 0, 0, 640, 641, 1, 0, 0, 0, 641, 643, 3, 150, 75, 0, 642, 644, 3, 34, 17, 0, 643,
    642, 1, 0, 0, 0, 643, 644, 1, 0, 0, 0, 644, 645, 1, 0, 0, 0, 645, 646, 5, 94, 0, 0, 646, 59, 1,
    0, 0, 0, 647, 649, 5, 107, 0, 0, 648, 647, 1, 0, 0, 0, 648, 649, 1, 0, 0, 0, 649, 650, 1, 0, 0,
    0, 650, 651, 5, 10, 0, 0, 651, 653, 5, 83, 0, 0, 652, 654, 3, 34, 17, 0, 653, 652, 1, 0, 0, 0,
    653, 654, 1, 0, 0, 0, 654, 655, 1, 0, 0, 0, 655, 656, 5, 94, 0, 0, 656, 658, 3, 62, 31, 0, 657,
    659, 3, 64, 32, 0, 658, 657, 1, 0, 0, 0, 659, 660, 1, 0, 0, 0, 660, 658, 1, 0, 0, 0, 660, 661,
    1, 0, 0, 0, 661, 662, 1, 0, 0, 0, 662, 664, 5, 119, 0, 0, 663, 665, 5, 108, 0, 0, 664, 663, 1,
    0, 0, 0, 664, 665, 1, 0, 0, 0, 665, 666, 1, 0, 0, 0, 666, 667, 5, 94, 0, 0, 667, 61, 1, 0, 0, 0,
    668, 670, 3, 40, 20, 0, 669, 668, 1, 0, 0, 0, 670, 673, 1, 0, 0, 0, 671, 669, 1, 0, 0, 0, 671,
    672, 1, 0, 0, 0, 672, 63, 1, 0, 0, 0, 673, 671, 1, 0, 0, 0, 674, 676, 5, 107, 0, 0, 675, 674, 1,
    0, 0, 0, 675, 676, 1, 0, 0, 0, 676, 677, 1, 0, 0, 0, 677, 678, 5, 43, 0, 0, 678, 679, 3, 102,
    51, 0, 679, 680, 5, 41, 0, 0, 680, 681, 3, 90, 45, 0, 681, 683, 5, 83, 0, 0, 682, 684, 3, 34,
    17, 0, 683, 682, 1, 0, 0, 0, 683, 684, 1, 0, 0, 0, 684, 685, 1, 0, 0, 0, 685, 689, 5, 94, 0, 0,
    686, 688, 3, 40, 20, 0, 687, 686, 1, 0, 0, 0, 688, 691, 1, 0, 0, 0, 689, 687, 1, 0, 0, 0, 689,
    690, 1, 0, 0, 0, 690, 693, 1, 0, 0, 0, 691, 689, 1, 0, 0, 0, 692, 694, 5, 108, 0, 0, 693, 692,
    1, 0, 0, 0, 693, 694, 1, 0, 0, 0, 694, 65, 1, 0, 0, 0, 695, 697, 5, 106, 0, 0, 696, 695, 1, 0,
    0, 0, 696, 697, 1, 0, 0, 0, 697, 698, 1, 0, 0, 0, 698, 699, 5, 47, 0, 0, 699, 700, 3, 102, 51,
    0, 700, 701, 5, 79, 0, 0, 701, 702, 3, 68, 34, 0, 702, 704, 5, 80, 0, 0, 703, 705, 3, 34, 17, 0,
    704, 703, 1, 0, 0, 0, 704, 705, 1, 0, 0, 0, 705, 706, 1, 0, 0, 0, 706, 707, 5, 94, 0, 0, 707,
    67, 1, 0, 0, 0, 708, 711, 3, 134, 67, 0, 709, 711, 3, 92, 46, 0, 710, 708, 1, 0, 0, 0, 710, 709,
    1, 0, 0, 0, 711, 69, 1, 0, 0, 0, 712, 714, 5, 106, 0, 0, 713, 712, 1, 0, 0, 0, 713, 714, 1, 0,
    0, 0, 714, 715, 1, 0, 0, 0, 715, 716, 5, 73, 0, 0, 716, 717, 5, 81, 0, 0, 717, 718, 5, 40, 0, 0,
    718, 719, 5, 79, 0, 0, 719, 720, 3, 122, 61, 0, 720, 721, 5, 82, 0, 0, 721, 722, 3, 124, 62, 0,
    722, 724, 5, 80, 0, 0, 723, 725, 3, 34, 17, 0, 724, 723, 1, 0, 0, 0, 724, 725, 1, 0, 0, 0, 725,
    726, 1, 0, 0, 0, 726, 727, 5, 94, 0, 0, 727, 71, 1, 0, 0, 0, 728, 729, 5, 9, 0, 0, 729, 731, 3,
    148, 74, 0, 730, 732, 3, 34, 17, 0, 731, 730, 1, 0, 0, 0, 731, 732, 1, 0, 0, 0, 732, 733, 1, 0,
    0, 0, 733, 734, 5, 94, 0, 0, 734, 73, 1, 0, 0, 0, 735, 737, 3, 76, 38, 0, 736, 735, 1, 0, 0, 0,
    737, 738, 1, 0, 0, 0, 738, 736, 1, 0, 0, 0, 738, 739, 1, 0, 0, 0, 739, 75, 1, 0, 0, 0, 740, 746,
    3, 80, 40, 0, 741, 746, 3, 82, 41, 0, 742, 746, 3, 84, 42, 0, 743, 746, 3, 86, 43, 0, 744, 746,
    3, 88, 44, 0, 745, 740, 1, 0, 0, 0, 745, 741, 1, 0, 0, 0, 745, 742, 1, 0, 0, 0, 745, 743, 1, 0,
    0, 0, 745, 744, 1, 0, 0, 0, 746, 77, 1, 0, 0, 0, 747, 749, 5, 107, 0, 0, 748, 747, 1, 0, 0, 0,
    748, 749, 1, 0, 0, 0, 749, 750, 1, 0, 0, 0, 750, 751, 5, 42, 0, 0, 751, 752, 5, 44, 0, 0, 752,
    754, 5, 79, 0, 0, 753, 755, 3, 110, 55, 0, 754, 753, 1, 0, 0, 0, 754, 755, 1, 0, 0, 0, 755, 756,
    1, 0, 0, 0, 756, 757, 5, 80, 0, 0, 757, 758, 5, 69, 0, 0, 758, 759, 5, 45, 0, 0, 759, 761, 5,
    83, 0, 0, 760, 762, 3, 34, 17, 0, 761, 760, 1, 0, 0, 0, 761, 762, 1, 0, 0, 0, 762, 764, 1, 0, 0,
    0, 763, 765, 5, 108, 0, 0, 764, 763, 1, 0, 0, 0, 764, 765, 1, 0, 0, 0, 765, 766, 1, 0, 0, 0,
    766, 770, 5, 94, 0, 0, 767, 769, 3, 40, 20, 0, 768, 767, 1, 0, 0, 0, 769, 772, 1, 0, 0, 0, 770,
    768, 1, 0, 0, 0, 770, 771, 1, 0, 0, 0, 771, 773, 1, 0, 0, 0, 772, 770, 1, 0, 0, 0, 773, 774, 5,
    120, 0, 0, 774, 775, 5, 94, 0, 0, 775, 79, 1, 0, 0, 0, 776, 778, 5, 106, 0, 0, 777, 776, 1, 0,
    0, 0, 777, 778, 1, 0, 0, 0, 778, 779, 1, 0, 0, 0, 779, 780, 3, 90, 45, 0, 780, 781, 5, 83, 0, 0,
    781, 783, 3, 120, 60, 0, 782, 784, 5, 125, 0, 0, 783, 782, 1, 0, 0, 0, 783, 784, 1, 0, 0, 0,
    784, 786, 1, 0, 0, 0, 785, 787, 3, 34, 17, 0, 786, 785, 1, 0, 0, 0, 786, 787, 1, 0, 0, 0, 787,
    788, 1, 0, 0, 0, 788, 789, 5, 94, 0, 0, 789, 81, 1, 0, 0, 0, 790, 792, 5, 107, 0, 0, 791, 790,
    1, 0, 0, 0, 791, 792, 1, 0, 0, 0, 792, 793, 1, 0, 0, 0, 793, 794, 5, 42, 0, 0, 794, 795, 3, 96,
    48, 0, 795, 797, 5, 79, 0, 0, 796, 798, 3, 110, 55, 0, 797, 796, 1, 0, 0, 0, 797, 798, 1, 0, 0,
    0, 798, 799, 1, 0, 0, 0, 799, 800, 5, 80, 0, 0, 800, 801, 5, 69, 0, 0, 801, 802, 3, 120, 60, 0,
    802, 804, 5, 83, 0, 0, 803, 805, 5, 125, 0, 0, 804, 803, 1, 0, 0, 0, 804, 805, 1, 0, 0, 0, 805,
    806, 1, 0, 0, 0, 806, 810, 5, 94, 0, 0, 807, 809, 3, 40, 20, 0, 808, 807, 1, 0, 0, 0, 809, 812,
    1, 0, 0, 0, 810, 808, 1, 0, 0, 0, 810, 811, 1, 0, 0, 0, 811, 813, 1, 0, 0, 0, 812, 810, 1, 0, 0,
    0, 813, 814, 3, 72, 36, 0, 814, 816, 5, 110, 0, 0, 815, 817, 5, 108, 0, 0, 816, 815, 1, 0, 0, 0,
    816, 817, 1, 0, 0, 0, 817, 818, 1, 0, 0, 0, 818, 819, 5, 94, 0, 0, 819, 83, 1, 0, 0, 0, 820,
    822, 5, 107, 0, 0, 821, 820, 1, 0, 0, 0, 821, 822, 1, 0, 0, 0, 822, 823, 1, 0, 0, 0, 823, 824,
    5, 42, 0, 0, 824, 825, 3, 96, 48, 0, 825, 827, 5, 79, 0, 0, 826, 828, 3, 110, 55, 0, 827, 826,
    1, 0, 0, 0, 827, 828, 1, 0, 0, 0, 828, 829, 1, 0, 0, 0, 829, 830, 5, 80, 0, 0, 830, 831, 5, 69,
    0, 0, 831, 832, 5, 45, 0, 0, 832, 834, 5, 83, 0, 0, 833, 835, 5, 125, 0, 0, 834, 833, 1, 0, 0,
    0, 834, 835, 1, 0, 0, 0, 835, 836, 1, 0, 0, 0, 836, 840, 5, 94, 0, 0, 837, 839, 3, 40, 20, 0,
    838, 837, 1, 0, 0, 0, 839, 842, 1, 0, 0, 0, 840, 838, 1, 0, 0, 0, 840, 841, 1, 0, 0, 0, 841,
    843, 1, 0, 0, 0, 842, 840, 1, 0, 0, 0, 843, 845, 5, 113, 0, 0, 844, 846, 5, 108, 0, 0, 845, 844,
    1, 0, 0, 0, 845, 846, 1, 0, 0, 0, 846, 847, 1, 0, 0, 0, 847, 848, 5, 94, 0, 0, 848, 85, 1, 0, 0,
    0, 849, 851, 5, 106, 0, 0, 850, 849, 1, 0, 0, 0, 850, 851, 1, 0, 0, 0, 851, 852, 1, 0, 0, 0,
    852, 853, 5, 126, 0, 0, 853, 854, 5, 94, 0, 0, 854, 855, 5, 42, 0, 0, 855, 856, 3, 96, 48, 0,
    856, 858, 5, 79, 0, 0, 857, 859, 3, 110, 55, 0, 858, 857, 1, 0, 0, 0, 858, 859, 1, 0, 0, 0, 859,
    860, 1, 0, 0, 0, 860, 861, 5, 80, 0, 0, 861, 862, 5, 69, 0, 0, 862, 863, 3, 120, 60, 0, 863,
    864, 5, 83, 0, 0, 864, 865, 5, 94, 0, 0, 865, 867, 5, 46, 0, 0, 866, 868, 3, 34, 17, 0, 867,
    866, 1, 0, 0, 0, 867, 868, 1, 0, 0, 0, 868, 869, 1, 0, 0, 0, 869, 870, 5, 94, 0, 0, 870, 87, 1,
    0, 0, 0, 871, 873, 5, 106, 0, 0, 872, 871, 1, 0, 0, 0, 872, 873, 1, 0, 0, 0, 873, 874, 1, 0, 0,
    0, 874, 875, 5, 126, 0, 0, 875, 876, 5, 94, 0, 0, 876, 877, 5, 42, 0, 0, 877, 878, 3, 96, 48, 0,
    878, 880, 5, 79, 0, 0, 879, 881, 3, 110, 55, 0, 880, 879, 1, 0, 0, 0, 880, 881, 1, 0, 0, 0, 881,
    882, 1, 0, 0, 0, 882, 883, 5, 80, 0, 0, 883, 884, 5, 69, 0, 0, 884, 885, 5, 45, 0, 0, 885, 887,
    5, 83, 0, 0, 886, 888, 5, 125, 0, 0, 887, 886, 1, 0, 0, 0, 887, 888, 1, 0, 0, 0, 888, 889, 1, 0,
    0, 0, 889, 890, 5, 94, 0, 0, 890, 892, 5, 46, 0, 0, 891, 893, 3, 34, 17, 0, 892, 891, 1, 0, 0,
    0, 892, 893, 1, 0, 0, 0, 893, 894, 1, 0, 0, 0, 894, 895, 5, 94, 0, 0, 895, 89, 1, 0, 0, 0, 896,
    897, 5, 96, 0, 0, 897, 91, 1, 0, 0, 0, 898, 899, 5, 96, 0, 0, 899, 93, 1, 0, 0, 0, 900, 901, 6,
    47, -1, 0, 901, 906, 3, 92, 46, 0, 902, 903, 5, 73, 0, 0, 903, 904, 5, 81, 0, 0, 904, 906, 3,
    92, 46, 0, 905, 900, 1, 0, 0, 0, 905, 902, 1, 0, 0, 0, 906, 911, 1, 0, 0, 0, 907, 908, 10, 1, 0,
    0, 908, 910, 3, 146, 73, 0, 909, 907, 1, 0, 0, 0, 910, 913, 1, 0, 0, 0, 911, 909, 1, 0, 0, 0,
    911, 912, 1, 0, 0, 0, 912, 95, 1, 0, 0, 0, 913, 911, 1, 0, 0, 0, 914, 915, 5, 96, 0, 0, 915, 97,
    1, 0, 0, 0, 916, 917, 5, 95, 0, 0, 917, 99, 1, 0, 0, 0, 918, 919, 5, 97, 0, 0, 919, 101, 1, 0,
    0, 0, 920, 928, 5, 52, 0, 0, 921, 928, 5, 53, 0, 0, 922, 928, 5, 54, 0, 0, 923, 928, 5, 55, 0,
    0, 924, 928, 5, 56, 0, 0, 925, 928, 5, 57, 0, 0, 926, 928, 5, 97, 0, 0, 927, 920, 1, 0, 0, 0,
    927, 921, 1, 0, 0, 0, 927, 922, 1, 0, 0, 0, 927, 923, 1, 0, 0, 0, 927, 924, 1, 0, 0, 0, 927,
    925, 1, 0, 0, 0, 927, 926, 1, 0, 0, 0, 928, 103, 1, 0, 0, 0, 929, 934, 3, 128, 64, 0, 930, 934,
    3, 130, 65, 0, 931, 934, 3, 132, 66, 0, 932, 934, 3, 134, 67, 0, 933, 929, 1, 0, 0, 0, 933, 930,
    1, 0, 0, 0, 933, 931, 1, 0, 0, 0, 933, 932, 1, 0, 0, 0, 934, 105, 1, 0, 0, 0, 935, 940, 3, 108,
    54, 0, 936, 937, 5, 82, 0, 0, 937, 939, 3, 108, 54, 0, 938, 936, 1, 0, 0, 0, 939, 942, 1, 0, 0,
    0, 940, 938, 1, 0, 0, 0, 940, 941, 1, 0, 0, 0, 941, 107, 1, 0, 0, 0, 942, 940, 1, 0, 0, 0, 943,
    946, 3, 190, 95, 0, 944, 946, 3, 148, 74, 0, 945, 943, 1, 0, 0, 0, 945, 944, 1, 0, 0, 0, 946,
    109, 1, 0, 0, 0, 947, 952, 3, 182, 91, 0, 948, 949, 5, 82, 0, 0, 949, 951, 3, 182, 91, 0, 950,
    948, 1, 0, 0, 0, 951, 954, 1, 0, 0, 0, 952, 950, 1, 0, 0, 0, 952, 953, 1, 0, 0, 0, 953, 111, 1,
    0, 0, 0, 954, 952, 1, 0, 0, 0, 955, 958, 3, 90, 45, 0, 956, 957, 5, 82, 0, 0, 957, 959, 3, 90,
    45, 0, 958, 956, 1, 0, 0, 0, 959, 960, 1, 0, 0, 0, 960, 958, 1, 0, 0, 0, 960, 961, 1, 0, 0, 0,
    961, 113, 1, 0, 0, 0, 962, 967, 3, 148, 74, 0, 963, 964, 5, 82, 0, 0, 964, 966, 3, 148, 74, 0,
    965, 963, 1, 0, 0, 0, 966, 969, 1, 0, 0, 0, 967, 965, 1, 0, 0, 0, 967, 968, 1, 0, 0, 0, 968,
    115, 1, 0, 0, 0, 969, 967, 1, 0, 0, 0, 970, 971, 3, 90, 45, 0, 971, 972, 5, 74, 0, 0, 972, 973,
    3, 130, 65, 0, 973, 117, 1, 0, 0, 0, 974, 979, 3, 116, 58, 0, 975, 976, 5, 94, 0, 0, 976, 978,
    3, 116, 58, 0, 977, 975, 1, 0, 0, 0, 978, 981, 1, 0, 0, 0, 979, 977, 1, 0, 0, 0, 979, 980, 1, 0,
    0, 0, 980, 119, 1, 0, 0, 0, 981, 979, 1, 0, 0, 0, 982, 987, 3, 188, 94, 0, 983, 987, 3, 102, 51,
    0, 984, 987, 3, 184, 92, 0, 985, 987, 3, 186, 93, 0, 986, 982, 1, 0, 0, 0, 986, 983, 1, 0, 0, 0,
    986, 984, 1, 0, 0, 0, 986, 985, 1, 0, 0, 0, 987, 121, 1, 0, 0, 0, 988, 989, 3, 148, 74, 0, 989,
    123, 1, 0, 0, 0, 990, 991, 3, 148, 74, 0, 991, 125, 1, 0, 0, 0, 992, 999, 3, 128, 64, 0, 993,
    999, 3, 130, 65, 0, 994, 999, 3, 132, 66, 0, 995, 999, 3, 134, 67, 0, 996, 999, 3, 136, 68, 0,
    997, 999, 3, 144, 72, 0, 998, 992, 1, 0, 0, 0, 998, 993, 1, 0, 0, 0, 998, 994, 1, 0, 0, 0, 998,
    995, 1, 0, 0, 0, 998, 996, 1, 0, 0, 0, 998, 997, 1, 0, 0, 0, 999, 127, 1, 0, 0, 0, 1000, 1001,
    7, 0, 0, 0, 1001, 129, 1, 0, 0, 0, 1002, 1006, 5, 100, 0, 0, 1003, 1006, 5, 98, 0, 0, 1004,
    1006, 5, 99, 0, 0, 1005, 1002, 1, 0, 0, 0, 1005, 1003, 1, 0, 0, 0, 1005, 1004, 1, 0, 0, 0, 1006,
    131, 1, 0, 0, 0, 1007, 1008, 5, 101, 0, 0, 1008, 133, 1, 0, 0, 0, 1009, 1010, 5, 103, 0, 0,
    1010, 135, 1, 0, 0, 0, 1011, 1015, 5, 102, 0, 0, 1012, 1014, 3, 138, 69, 0, 1013, 1012, 1, 0, 0,
    0, 1014, 1017, 1, 0, 0, 0, 1015, 1013, 1, 0, 0, 0, 1015, 1016, 1, 0, 0, 0, 1016, 1018, 1, 0, 0,
    0, 1017, 1015, 1, 0, 0, 0, 1018, 1019, 5, 92, 0, 0, 1019, 137, 1, 0, 0, 0, 1020, 1023, 3, 140,
    70, 0, 1021, 1023, 3, 142, 71, 0, 1022, 1020, 1, 0, 0, 0, 1022, 1021, 1, 0, 0, 0, 1023, 139, 1,
    0, 0, 0, 1024, 1026, 5, 128, 0, 0, 1025, 1024, 1, 0, 0, 0, 1026, 1027, 1, 0, 0, 0, 1027, 1025,
    1, 0, 0, 0, 1027, 1028, 1, 0, 0, 0, 1028, 141, 1, 0, 0, 0, 1029, 1030, 5, 75, 0, 0, 1030, 1031,
    3, 148, 74, 0, 1031, 1032, 5, 76, 0, 0, 1032, 143, 1, 0, 0, 0, 1033, 1034, 3, 102, 51, 0, 1034,
    1035, 5, 81, 0, 0, 1035, 1036, 3, 92, 46, 0, 1036, 145, 1, 0, 0, 0, 1037, 1038, 5, 77, 0, 0,
    1038, 1039, 3, 148, 74, 0, 1039, 1040, 5, 78, 0, 0, 1040, 147, 1, 0, 0, 0, 1041, 1042, 6, 74,
    -1, 0, 1042, 1047, 3, 180, 90, 0, 1043, 1047, 3, 158, 79, 0, 1044, 1047, 3, 150, 75, 0, 1045,
    1047, 3, 164, 82, 0, 1046, 1041, 1, 0, 0, 0, 1046, 1043, 1, 0, 0, 0, 1046, 1044, 1, 0, 0, 0,
    1046, 1045, 1, 0, 0, 0, 1047, 1063, 1, 0, 0, 0, 1048, 1049, 10, 1, 0, 0, 1049, 1050, 5, 5, 0, 0,
    1050, 1055, 3, 148, 74, 0, 1051, 1052, 5, 2, 0, 0, 1052, 1054, 3, 148, 74, 0, 1053, 1051, 1, 0,
    0, 0, 1054, 1057, 1, 0, 0, 0, 1055, 1053, 1, 0, 0, 0, 1055, 1056, 1, 0, 0, 0, 1056, 1058, 1, 0,
    0, 0, 1057, 1055, 1, 0, 0, 0, 1058, 1059, 5, 3, 0, 0, 1059, 1060, 3, 148, 74, 2, 1060, 1062, 1,
    0, 0, 0, 1061, 1048, 1, 0, 0, 0, 1062, 1065, 1, 0, 0, 0, 1063, 1061, 1, 0, 0, 0, 1063, 1064, 1,
    0, 0, 0, 1064, 149, 1, 0, 0, 0, 1065, 1063, 1, 0, 0, 0, 1066, 1067, 6, 75, -1, 0, 1067, 1076, 3,
    154, 77, 0, 1068, 1076, 3, 156, 78, 0, 1069, 1076, 3, 126, 63, 0, 1070, 1076, 3, 166, 83, 0,
    1071, 1076, 3, 170, 85, 0, 1072, 1076, 3, 168, 84, 0, 1073, 1076, 3, 92, 46, 0, 1074, 1076, 3,
    176, 88, 0, 1075, 1066, 1, 0, 0, 0, 1075, 1068, 1, 0, 0, 0, 1075, 1069, 1, 0, 0, 0, 1075, 1070,
    1, 0, 0, 0, 1075, 1071, 1, 0, 0, 0, 1075, 1072, 1, 0, 0, 0, 1075, 1073, 1, 0, 0, 0, 1075, 1074,
    1, 0, 0, 0, 1076, 1084, 1, 0, 0, 0, 1077, 1078, 10, 2, 0, 0, 1078, 1083, 3, 146, 73, 0, 1079,
    1080, 10, 1, 0, 0, 1080, 1081, 5, 81, 0, 0, 1081, 1083, 3, 152, 76, 0, 1082, 1077, 1, 0, 0, 0,
    1082, 1079, 1, 0, 0, 0, 1083, 1086, 1, 0, 0, 0, 1084, 1082, 1, 0, 0, 0, 1084, 1085, 1, 0, 0, 0,
    1085, 151, 1, 0, 0, 0, 1086, 1084, 1, 0, 0, 0, 1087, 1090, 3, 92, 46, 0, 1088, 1090, 3, 176, 88,
    0, 1089, 1087, 1, 0, 0, 0, 1089, 1088, 1, 0, 0, 0, 1090, 153, 1, 0, 0, 0, 1091, 1092, 5, 73, 0,
    0, 1092, 155, 1, 0, 0, 0, 1093, 1094, 5, 79, 0, 0, 1094, 1095, 3, 148, 74, 0, 1095, 1096, 5, 80,
    0, 0, 1096, 157, 1, 0, 0, 0, 1097, 1100, 3, 160, 80, 0, 1098, 1100, 3, 162, 81, 0, 1099, 1097,
    1, 0, 0, 0, 1099, 1098, 1, 0, 0, 0, 1100, 159, 1, 0, 0, 0, 1101, 1102, 5, 85, 0, 0, 1102, 1103,
    3, 150, 75, 0, 1103, 161, 1, 0, 0, 0, 1104, 1105, 5, 63, 0, 0, 1105, 1106, 3, 150, 75, 0, 1106,
    163, 1, 0, 0, 0, 1107, 1108, 3, 150, 75, 0, 1108, 1109, 3, 178, 89, 0, 1109, 1110, 3, 148, 74,
    0, 1110, 165, 1, 0, 0, 0, 1111, 1112, 5, 77, 0, 0, 1112, 1113, 3, 114, 57, 0, 1113, 1114, 5, 78,
    0, 0, 1114, 167, 1, 0, 0, 0, 1115, 1116, 5, 79, 0, 0, 1116, 1117, 3, 114, 57, 0, 1117, 1118, 5,
    80, 0, 0, 1118, 169, 1, 0, 0, 0, 1119, 1120, 5, 75, 0, 0, 1120, 1121, 3, 172, 86, 0, 1121, 1122,
    5, 76, 0, 0, 1122, 171, 1, 0, 0, 0, 1123, 1128, 3, 174, 87, 0, 1124, 1125, 5, 82, 0, 0, 1125,
    1127, 3, 174, 87, 0, 1126, 1124, 1, 0, 0, 0, 1127, 1130, 1, 0, 0, 0, 1128, 1126, 1, 0, 0, 0,
    1128, 1129, 1, 0, 0, 0, 1129, 173, 1, 0, 0, 0, 1130, 1128, 1, 0, 0, 0, 1131, 1132, 3, 148, 74,
    0, 1132, 1133, 5, 83, 0, 0, 1133, 1134, 3, 148, 74, 0, 1134, 175, 1, 0, 0, 0, 1135, 1136, 3, 96,
    48, 0, 1136, 1138, 5, 79, 0, 0, 1137, 1139, 3, 106, 53, 0, 1138, 1137, 1, 0, 0, 0, 1138, 1139,
    1, 0, 0, 0, 1139, 1140, 1, 0, 0, 0, 1140, 1141, 5, 80, 0, 0, 1141, 177, 1, 0, 0, 0, 1142, 1159,
    5, 64, 0, 0, 1143, 1159, 5, 65, 0, 0, 1144, 1159, 5, 66, 0, 0, 1145, 1159, 5, 67, 0, 0, 1146,
    1159, 5, 89, 0, 0, 1147, 1159, 5, 88, 0, 0, 1148, 1159, 5, 91, 0, 0, 1149, 1159, 5, 90, 0, 0,
    1150, 1159, 5, 86, 0, 0, 1151, 1159, 5, 87, 0, 0, 1152, 1159, 5, 84, 0, 0, 1153, 1159, 5, 85, 0,
    0, 1154, 1159, 5, 61, 0, 0, 1155, 1159, 5, 62, 0, 0, 1156, 1159, 5, 68, 0, 0, 1157, 1159, 5, 70,
    0, 0, 1158, 1142, 1, 0, 0, 0, 1158, 1143, 1, 0, 0, 0, 1158, 1144, 1, 0, 0, 0, 1158, 1145, 1, 0,
    0, 0, 1158, 1146, 1, 0, 0, 0, 1158, 1147, 1, 0, 0, 0, 1158, 1148, 1, 0, 0, 0, 1158, 1149, 1, 0,
    0, 0, 1158, 1150, 1, 0, 0, 0, 1158, 1151, 1, 0, 0, 0, 1158, 1152, 1, 0, 0, 0, 1158, 1153, 1, 0,
    0, 0, 1158, 1154, 1, 0, 0, 0, 1158, 1155, 1, 0, 0, 0, 1158, 1156, 1, 0, 0, 0, 1158, 1157, 1, 0,
    0, 0, 1159, 179, 1, 0, 0, 0, 1160, 1161, 3, 120, 60, 0, 1161, 1163, 5, 79, 0, 0, 1162, 1164, 3,
    106, 53, 0, 1163, 1162, 1, 0, 0, 0, 1163, 1164, 1, 0, 0, 0, 1164, 1165, 1, 0, 0, 0, 1165, 1166,
    5, 80, 0, 0, 1166, 181, 1, 0, 0, 0, 1167, 1170, 3, 90, 45, 0, 1168, 1170, 5, 73, 0, 0, 1169,
    1167, 1, 0, 0, 0, 1169, 1168, 1, 0, 0, 0, 1170, 1171, 1, 0, 0, 0, 1171, 1172, 5, 83, 0, 0, 1172,
    1173, 3, 120, 60, 0, 1173, 183, 1, 0, 0, 0, 1174, 1175, 3, 102, 51, 0, 1175, 1176, 5, 77, 0, 0,
    1176, 1181, 3, 120, 60, 0, 1177, 1178, 5, 82, 0, 0, 1178, 1180, 3, 120, 60, 0, 1179, 1177, 1, 0,
    0, 0, 1180, 1183, 1, 0, 0, 0, 1181, 1179, 1, 0, 0, 0, 1181, 1182, 1, 0, 0, 0, 1182, 1184, 1, 0,
    0, 0, 1183, 1181, 1, 0, 0, 0, 1184, 1185, 5, 78, 0, 0, 1185, 185, 1, 0, 0, 0, 1186, 1187, 5, 58,
    0, 0, 1187, 1188, 5, 77, 0, 0, 1188, 1189, 5, 77, 0, 0, 1189, 1194, 3, 120, 60, 0, 1190, 1191,
    5, 82, 0, 0, 1191, 1193, 3, 120, 60, 0, 1192, 1190, 1, 0, 0, 0, 1193, 1196, 1, 0, 0, 0, 1194,
    1192, 1, 0, 0, 0, 1194, 1195, 1, 0, 0, 0, 1195, 1197, 1, 0, 0, 0, 1196, 1194, 1, 0, 0, 0, 1197,
    1198, 5, 78, 0, 0, 1198, 1199, 5, 82, 0, 0, 1199, 1200, 3, 120, 60, 0, 1200, 1201, 5, 78, 0, 0,
    1201, 187, 1, 0, 0, 0, 1202, 1203, 5, 51, 0, 0, 1203, 1204, 5, 77, 0, 0, 1204, 1207, 3, 120, 60,
    0, 1205, 1206, 5, 82, 0, 0, 1206, 1208, 3, 120, 60, 0, 1207, 1205, 1, 0, 0, 0, 1208, 1209, 1, 0,
    0, 0, 1209, 1207, 1, 0, 0, 0, 1209, 1210, 1, 0, 0, 0, 1210, 1211, 1, 0, 0, 0, 1211, 1212, 5, 78,
    0, 0, 1212, 189, 1, 0, 0, 0, 1213, 1214, 5, 7, 0, 0, 1214, 1215, 3, 110, 55, 0, 1215, 1216, 5,
    83, 0, 0, 1216, 1217, 3, 148, 74, 0, 1217, 191, 1, 0, 0, 0, 146, 193, 198, 202, 207, 215, 226,
    229, 242, 247, 256, 262, 269, 275, 281, 286, 298, 303, 316, 322, 331, 334, 340, 347, 353, 358,
    363, 369, 374, 383, 390, 395, 403, 407, 414, 419, 427, 430, 437, 443, 449, 454, 464, 467, 477,
    492, 503, 506, 515, 524, 530, 537, 541, 545, 552, 556, 562, 568, 572, 575, 580, 586, 590, 593,
    599, 605, 610, 615, 623, 629, 634, 639, 643, 648, 653, 660, 664, 671, 675, 683, 689, 693, 696,
    704, 710, 713, 724, 731, 738, 745, 748, 754, 761, 764, 770, 777, 783, 786, 791, 797, 804, 810,
    816, 821, 827, 834, 840, 845, 850, 858, 867, 872, 880, 887, 892, 905, 911, 927, 933, 940, 945,
    952, 960, 967, 979, 986, 998, 1005, 1015, 1022, 1027, 1046, 1055, 1063, 1075, 1082, 1084, 1089,
    1099, 1128, 1138, 1158, 1163, 1169, 1181, 1194, 1209,
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
  public PRIVATE_ANNOTATION(): antlr.TerminalNode | null {
    return this.getToken(PythonParser.PRIVATE_ANNOTATION, 0);
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
  public PRIVATE_ANNOTATION(): antlr.TerminalNode | null {
    return this.getToken(PythonParser.PRIVATE_ANNOTATION, 0);
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
  public PRIVATE_ANNOTATION(): antlr.TerminalNode | null {
    return this.getToken(PythonParser.PRIVATE_ANNOTATION, 0);
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
  public PRIVATE_ANNOTATION(): antlr.TerminalNode | null {
    return this.getToken(PythonParser.PRIVATE_ANNOTATION, 0);
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

export class TestClassNameContext extends antlr.ParserRuleContext {
  public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
    super(parent, invokingState);
  }
  public NAME_STARTING_UC(): antlr.TerminalNode {
    return this.getToken(PythonParser.NAME_STARTING_UC, 0)!;
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
  public expression(): ExpressionContext {
    return this.getRuleContext(0, ExpressionContext)!;
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
  public LITERAL_STRING(): antlr.TerminalNode {
    return this.getToken(PythonParser.LITERAL_STRING, 0)!;
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

export class InterpolatedStringContext extends antlr.ParserRuleContext {
  public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
    super(parent, invokingState);
  }
  public START_INTERPOLATED_STRING(): antlr.TerminalNode {
    return this.getToken(PythonParser.START_INTERPOLATED_STRING, 0)!;
  }
  public DOUBLE_QUOTES(): antlr.TerminalNode {
    return this.getToken(PythonParser.DOUBLE_QUOTES, 0)!;
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

export class SegmentContext extends antlr.ParserRuleContext {
  public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
    super(parent, invokingState);
  }
  public interpolatedStringText(): InterpolatedStringTextContext | null {
    return this.getRuleContext(0, InterpolatedStringTextContext);
  }
  public interpolatedStringExpression(): InterpolatedStringExpressionContext | null {
    return this.getRuleContext(0, InterpolatedStringExpressionContext);
  }
  public override get ruleIndex(): number {
    return PythonParser.RULE_segment;
  }
  public override enterRule(listener: PythonListener): void {
    if (listener.enterSegment) {
      listener.enterSegment(this);
    }
  }
  public override exitRule(listener: PythonListener): void {
    if (listener.exitSegment) {
      listener.exitSegment(this);
    }
  }
  public override accept<Result>(visitor: PythonVisitor<Result>): Result | null {
    if (visitor.visitSegment) {
      return visitor.visitSegment(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class InterpolatedStringTextContext extends antlr.ParserRuleContext {
  public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
    super(parent, invokingState);
  }
  public Grapheme(): antlr.TerminalNode[];
  public Grapheme(i: number): antlr.TerminalNode | null;
  public Grapheme(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    if (i === undefined) {
      return this.getTokens(PythonParser.Grapheme);
    } else {
      return this.getToken(PythonParser.Grapheme, i);
    }
  }
  public override get ruleIndex(): number {
    return PythonParser.RULE_interpolatedStringText;
  }
  public override enterRule(listener: PythonListener): void {
    if (listener.enterInterpolatedStringText) {
      listener.enterInterpolatedStringText(this);
    }
  }
  public override exitRule(listener: PythonListener): void {
    if (listener.exitInterpolatedStringText) {
      listener.exitInterpolatedStringText(this);
    }
  }
  public override accept<Result>(visitor: PythonVisitor<Result>): Result | null {
    if (visitor.visitInterpolatedStringText) {
      return visitor.visitInterpolatedStringText(this);
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
    return this.getToken(PythonParser.OPEN_BRACE, 0)!;
  }
  public expression(): ExpressionContext {
    return this.getRuleContext(0, ExpressionContext)!;
  }
  public CLOSE_BRACE(): antlr.TerminalNode {
    return this.getToken(PythonParser.CLOSE_BRACE, 0)!;
  }
  public override get ruleIndex(): number {
    return PythonParser.RULE_interpolatedStringExpression;
  }
  public override enterRule(listener: PythonListener): void {
    if (listener.enterInterpolatedStringExpression) {
      listener.enterInterpolatedStringExpression(this);
    }
  }
  public override exitRule(listener: PythonListener): void {
    if (listener.exitInterpolatedStringExpression) {
      listener.exitInterpolatedStringExpression(this);
    }
  }
  public override accept<Result>(visitor: PythonVisitor<Result>): Result | null {
    if (visitor.visitInterpolatedStringExpression) {
      return visitor.visitInterpolatedStringExpression(this);
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
  public override get ruleIndex(): number {
    return PythonParser.RULE_binaryOperator;
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
    return this.getToken(PythonParser.PLUS, 0)!;
  }
  public override enterRule(listener: PythonListener): void {
    if (listener.enterOpPLUS) {
      listener.enterOpPLUS(this);
    }
  }
  public override exitRule(listener: PythonListener): void {
    if (listener.exitOpPLUS) {
      listener.exitOpPLUS(this);
    }
  }
  public override accept<Result>(visitor: PythonVisitor<Result>): Result | null {
    if (visitor.visitOpPLUS) {
      return visitor.visitOpPLUS(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}
export class OpREF_NOT_EQUALContext extends BinaryOperatorContext {
  public constructor(ctx: BinaryOperatorContext) {
    super(ctx.parent, ctx.invokingState);
    super.copyFrom(ctx);
  }
  public REF_NOT_EQUAL(): antlr.TerminalNode {
    return this.getToken(PythonParser.REF_NOT_EQUAL, 0)!;
  }
  public override enterRule(listener: PythonListener): void {
    if (listener.enterOpREF_NOT_EQUAL) {
      listener.enterOpREF_NOT_EQUAL(this);
    }
  }
  public override exitRule(listener: PythonListener): void {
    if (listener.exitOpREF_NOT_EQUAL) {
      listener.exitOpREF_NOT_EQUAL(this);
    }
  }
  public override accept<Result>(visitor: PythonVisitor<Result>): Result | null {
    if (visitor.visitOpREF_NOT_EQUAL) {
      return visitor.visitOpREF_NOT_EQUAL(this);
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
    return this.getToken(PythonParser.AND, 0)!;
  }
  public override enterRule(listener: PythonListener): void {
    if (listener.enterOpAND) {
      listener.enterOpAND(this);
    }
  }
  public override exitRule(listener: PythonListener): void {
    if (listener.exitOpAND) {
      listener.exitOpAND(this);
    }
  }
  public override accept<Result>(visitor: PythonVisitor<Result>): Result | null {
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
    return this.getToken(PythonParser.DIVIDE, 0)!;
  }
  public override enterRule(listener: PythonListener): void {
    if (listener.enterOpDIVIDE) {
      listener.enterOpDIVIDE(this);
    }
  }
  public override exitRule(listener: PythonListener): void {
    if (listener.exitOpDIVIDE) {
      listener.exitOpDIVIDE(this);
    }
  }
  public override accept<Result>(visitor: PythonVisitor<Result>): Result | null {
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
    return this.getToken(PythonParser.MULT, 0)!;
  }
  public override enterRule(listener: PythonListener): void {
    if (listener.enterOpMULT) {
      listener.enterOpMULT(this);
    }
  }
  public override exitRule(listener: PythonListener): void {
    if (listener.exitOpMULT) {
      listener.exitOpMULT(this);
    }
  }
  public override accept<Result>(visitor: PythonVisitor<Result>): Result | null {
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
    return this.getToken(PythonParser.GE, 0)!;
  }
  public override enterRule(listener: PythonListener): void {
    if (listener.enterOpGE) {
      listener.enterOpGE(this);
    }
  }
  public override exitRule(listener: PythonListener): void {
    if (listener.exitOpGE) {
      listener.exitOpGE(this);
    }
  }
  public override accept<Result>(visitor: PythonVisitor<Result>): Result | null {
    if (visitor.visitOpGE) {
      return visitor.visitOpGE(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}
export class OpREF_EQUALContext extends BinaryOperatorContext {
  public constructor(ctx: BinaryOperatorContext) {
    super(ctx.parent, ctx.invokingState);
    super.copyFrom(ctx);
  }
  public REF_EQUAL(): antlr.TerminalNode {
    return this.getToken(PythonParser.REF_EQUAL, 0)!;
  }
  public override enterRule(listener: PythonListener): void {
    if (listener.enterOpREF_EQUAL) {
      listener.enterOpREF_EQUAL(this);
    }
  }
  public override exitRule(listener: PythonListener): void {
    if (listener.exitOpREF_EQUAL) {
      listener.exitOpREF_EQUAL(this);
    }
  }
  public override accept<Result>(visitor: PythonVisitor<Result>): Result | null {
    if (visitor.visitOpREF_EQUAL) {
      return visitor.visitOpREF_EQUAL(this);
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
    return this.getToken(PythonParser.LE, 0)!;
  }
  public override enterRule(listener: PythonListener): void {
    if (listener.enterOpLE) {
      listener.enterOpLE(this);
    }
  }
  public override exitRule(listener: PythonListener): void {
    if (listener.exitOpLE) {
      listener.exitOpLE(this);
    }
  }
  public override accept<Result>(visitor: PythonVisitor<Result>): Result | null {
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
    return this.getToken(PythonParser.OR, 0)!;
  }
  public override enterRule(listener: PythonListener): void {
    if (listener.enterOpOR) {
      listener.enterOpOR(this);
    }
  }
  public override exitRule(listener: PythonListener): void {
    if (listener.exitOpOR) {
      listener.exitOpOR(this);
    }
  }
  public override accept<Result>(visitor: PythonVisitor<Result>): Result | null {
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
    return this.getToken(PythonParser.MOD, 0)!;
  }
  public override enterRule(listener: PythonListener): void {
    if (listener.enterOpMOD) {
      listener.enterOpMOD(this);
    }
  }
  public override exitRule(listener: PythonListener): void {
    if (listener.exitOpMOD) {
      listener.exitOpMOD(this);
    }
  }
  public override accept<Result>(visitor: PythonVisitor<Result>): Result | null {
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
    return this.getToken(PythonParser.EQUAL, 0)!;
  }
  public override enterRule(listener: PythonListener): void {
    if (listener.enterOpEQUAL) {
      listener.enterOpEQUAL(this);
    }
  }
  public override exitRule(listener: PythonListener): void {
    if (listener.exitOpEQUAL) {
      listener.exitOpEQUAL(this);
    }
  }
  public override accept<Result>(visitor: PythonVisitor<Result>): Result | null {
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
    return this.getToken(PythonParser.GT, 0)!;
  }
  public override enterRule(listener: PythonListener): void {
    if (listener.enterOpGT) {
      listener.enterOpGT(this);
    }
  }
  public override exitRule(listener: PythonListener): void {
    if (listener.exitOpGT) {
      listener.exitOpGT(this);
    }
  }
  public override accept<Result>(visitor: PythonVisitor<Result>): Result | null {
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
    return this.getToken(PythonParser.POWER, 0)!;
  }
  public override enterRule(listener: PythonListener): void {
    if (listener.enterOpPOWER) {
      listener.enterOpPOWER(this);
    }
  }
  public override exitRule(listener: PythonListener): void {
    if (listener.exitOpPOWER) {
      listener.exitOpPOWER(this);
    }
  }
  public override accept<Result>(visitor: PythonVisitor<Result>): Result | null {
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
    return this.getToken(PythonParser.NOT_EQUAL, 0)!;
  }
  public override enterRule(listener: PythonListener): void {
    if (listener.enterOpNOT_EQUAL) {
      listener.enterOpNOT_EQUAL(this);
    }
  }
  public override exitRule(listener: PythonListener): void {
    if (listener.exitOpNOT_EQUAL) {
      listener.exitOpNOT_EQUAL(this);
    }
  }
  public override accept<Result>(visitor: PythonVisitor<Result>): Result | null {
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
    return this.getToken(PythonParser.LT, 0)!;
  }
  public override enterRule(listener: PythonListener): void {
    if (listener.enterOpLT) {
      listener.enterOpLT(this);
    }
  }
  public override exitRule(listener: PythonListener): void {
    if (listener.exitOpLT) {
      listener.exitOpLT(this);
    }
  }
  public override accept<Result>(visitor: PythonVisitor<Result>): Result | null {
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
    return this.getToken(PythonParser.MINUS, 0)!;
  }
  public override enterRule(listener: PythonListener): void {
    if (listener.enterOpMINUS) {
      listener.enterOpMINUS(this);
    }
  }
  public override exitRule(listener: PythonListener): void {
    if (listener.exitOpMINUS) {
      listener.exitOpMINUS(this);
    }
  }
  public override accept<Result>(visitor: PythonVisitor<Result>): Result | null {
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
