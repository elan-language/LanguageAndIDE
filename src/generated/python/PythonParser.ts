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
  public static readonly GHOSTED = 105;
  public static readonly END_MAIN = 106;
  public static readonly END_FUNCTION = 107;
  public static readonly END_TEST = 108;
  public static readonly END_PROCEDURE = 109;
  public static readonly END_ENUM = 110;
  public static readonly END_CLASS = 111;
  public static readonly END_IF = 112;
  public static readonly END_WHILE = 113;
  public static readonly END_FOR = 114;
  public static readonly END_TRY = 115;
  public static readonly END_CONSTRUCTOR = 116;
  public static readonly END_FUNCTION_METHOD = 117;
  public static readonly END_PROCEDURE_METHOD = 118;
  public static readonly ASSIGNMENT_ANNOTATION = 119;
  public static readonly VARIABLE_DEFINITION_ANNOTATION = 120;
  public static readonly ABSTRACT_METHOD = 121;
  public static readonly COMMENT = 122;
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
  public static readonly RULE_catchStatement = 33;
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
  public static readonly RULE_typeName = 45;
  public static readonly RULE_constantValue = 46;
  public static readonly RULE_argList = 47;
  public static readonly RULE_argument = 48;
  public static readonly RULE_paramList = 49;
  public static readonly RULE_identifierList = 50;
  public static readonly RULE_expressionList = 51;
  public static readonly RULE_type = 52;
  public static readonly RULE_assertActual = 53;
  public static readonly RULE_assertExpected = 54;
  public static readonly RULE_litValue = 55;
  public static readonly RULE_litBoolean = 56;
  public static readonly RULE_litInt = 57;
  public static readonly RULE_litFloat = 58;
  public static readonly RULE_litString = 59;
  public static readonly RULE_enumValue = 60;
  public static readonly RULE_index = 61;
  public static readonly RULE_expression = 62;
  public static readonly RULE_term = 63;
  public static readonly RULE_chainable = 64;
  public static readonly RULE_thisInstance = 65;
  public static readonly RULE_bracketedExpression = 66;
  public static readonly RULE_unaryExpression = 67;
  public static readonly RULE_negateNumeric = 68;
  public static readonly RULE_negateLogical = 69;
  public static readonly RULE_binaryExpression = 70;
  public static readonly RULE_list = 71;
  public static readonly RULE_tuple = 72;
  public static readonly RULE_dictionary = 73;
  public static readonly RULE_kvpList = 74;
  public static readonly RULE_kvp = 75;
  public static readonly RULE_methodCall = 76;
  public static readonly RULE_binaryOperator = 77;
  public static readonly RULE_newInstance = 78;
  public static readonly RULE_paramDef = 79;
  public static readonly RULE_typeGeneric = 80;
  public static readonly RULE_typeFunc = 81;
  public static readonly RULE_typeTuple = 82;
  public static readonly RULE_lambda = 83;
  public static readonly RULE_interpolatedString = 84;

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
    "'[ghosted]'",
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
    "'# @abstractmethod'",
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
    "GHOSTED",
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
        this.state = 171;
        this.errorHandler.sync(this);
        switch (this.interpreter.adaptivePredict(this.tokenStream, 0, this.context)) {
          case 1:
            {
              this.state = 170;
              this.comment();
            }
            break;
        }
        this.state = 176;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (
          _la === 1 ||
          _la === 45 ||
          (((_la - 95) & ~0x1f) === 0 && ((1 << (_la - 95)) & 134218753) !== 0)
        ) {
          {
            {
              this.state = 173;
              this.global();
            }
          }
          this.state = 178;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 180;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 10) {
          {
            this.state = 179;
            this.mainCall();
          }
        }

        this.state = 185;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (_la === 93) {
          {
            {
              this.state = 182;
              this.match(PythonParser.NL);
            }
          }
          this.state = 187;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 188;
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
      this.state = 199;
      this.errorHandler.sync(this);
      switch (this.interpreter.adaptivePredict(this.tokenStream, 4, this.context)) {
        case 1:
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 190;
            this.main();
          }
          break;
        case 2:
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 191;
            this.function_();
          }
          break;
        case 3:
          this.enterOuterAlt(localContext, 3);
          {
            this.state = 192;
            this.test();
          }
          break;
        case 4:
          this.enterOuterAlt(localContext, 4);
          {
            this.state = 193;
            this.procedure();
          }
          break;
        case 5:
          this.enterOuterAlt(localContext, 5);
          {
            this.state = 194;
            this.constant();
          }
          break;
        case 6:
          this.enterOuterAlt(localContext, 6);
          {
            this.state = 195;
            this.enum_();
          }
          break;
        case 7:
          this.enterOuterAlt(localContext, 7);
          {
            this.state = 196;
            this.concreteClass();
          }
          break;
        case 8:
          this.enterOuterAlt(localContext, 8);
          {
            this.state = 197;
            this.abstractClass();
          }
          break;
        case 9:
          this.enterOuterAlt(localContext, 9);
          {
            this.state = 198;
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
        this.state = 202;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 105) {
          {
            this.state = 201;
            this.match(PythonParser.GHOSTED);
          }
        }

        this.state = 204;
        this.match(PythonParser.DEF);
        this.state = 205;
        this.match(PythonParser.MAIN);
        this.state = 206;
        this.match(PythonParser.OPEN_BRACKET);
        this.state = 207;
        this.match(PythonParser.CLOSE_BRACKET);
        this.state = 208;
        this.match(PythonParser.ARROW);
        this.state = 209;
        this.match(PythonParser.NONE);
        this.state = 210;
        this.match(PythonParser.COLON);
        this.state = 211;
        this.match(PythonParser.NL);
        this.state = 215;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (
          ((_la & ~0x1f) === 0 && ((1 << _la) & 12384) !== 0) ||
          (((_la - 50) & ~0x1f) === 0 && ((1 << (_la - 50)) & 356519409) !== 0) ||
          (((_la - 95) & ~0x1f) === 0 && ((1 << (_la - 95)) & 134219007) !== 0)
        ) {
          {
            {
              this.state = 212;
              this.ordinaryStatement();
            }
          }
          this.state = 217;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 218;
        this.match(PythonParser.END_MAIN);
        this.state = 219;
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
        this.state = 221;
        this.match(PythonParser.MAIN);
        this.state = 222;
        this.match(PythonParser.OPEN_BRACKET);
        this.state = 223;
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
        this.state = 226;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 105) {
          {
            this.state = 225;
            this.match(PythonParser.GHOSTED);
          }
        }

        this.state = 228;
        this.match(PythonParser.DEF);
        this.state = 229;
        this.methodName();
        this.state = 230;
        this.match(PythonParser.OPEN_BRACKET);
        this.state = 232;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 95) {
          {
            this.state = 231;
            this.paramList();
          }
        }

        this.state = 234;
        this.match(PythonParser.CLOSE_BRACKET);
        this.state = 235;
        this.match(PythonParser.ARROW);
        this.state = 236;
        this.type_();
        this.state = 237;
        this.match(PythonParser.COLON);
        this.state = 239;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 122) {
          {
            this.state = 238;
            this.commentText();
          }
        }

        this.state = 241;
        this.match(PythonParser.NL);
        this.state = 245;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (
          ((_la & ~0x1f) === 0 && ((1 << _la) & 12384) !== 0) ||
          (((_la - 50) & ~0x1f) === 0 && ((1 << (_la - 50)) & 356519409) !== 0) ||
          (((_la - 95) & ~0x1f) === 0 && ((1 << (_la - 95)) & 134219007) !== 0)
        ) {
          {
            {
              this.state = 242;
              this.ordinaryStatement();
            }
          }
          this.state = 247;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 248;
        this.returnStatement();
        this.state = 249;
        this.match(PythonParser.END_FUNCTION);
        this.state = 250;
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
        this.state = 253;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 105) {
          {
            this.state = 252;
            this.match(PythonParser.GHOSTED);
          }
        }

        this.state = 255;
        this.match(PythonParser.CLASS);
        this.state = 256;
        this.testName();
        this.state = 257;
        this.match(PythonParser.OPEN_BRACKET);
        this.state = 258;
        this.match(PythonParser.TESTCASE);
        this.state = 259;
        this.match(PythonParser.CLOSE_BRACKET);
        this.state = 260;
        this.match(PythonParser.COMMENT);
        this.state = 261;
        this.match(PythonParser.NL);
        this.state = 265;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (_la === 72 || _la === 95 || _la === 105 || _la === 122) {
          {
            {
              this.state = 262;
              this.testStatement();
            }
          }
          this.state = 267;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 268;
        this.match(PythonParser.END_TEST);
        this.state = 269;
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
      this.state = 274;
      this.errorHandler.sync(this);
      switch (this.interpreter.adaptivePredict(this.tokenStream, 13, this.context)) {
        case 1:
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 271;
            this.assert();
          }
          break;
        case 2:
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 272;
            this.variableDefinition();
          }
          break;
        case 3:
          this.enterOuterAlt(localContext, 3);
          {
            this.state = 273;
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
        this.state = 277;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 105) {
          {
            this.state = 276;
            this.match(PythonParser.GHOSTED);
          }
        }

        this.state = 279;
        this.match(PythonParser.DEF);
        this.state = 280;
        this.methodName();
        this.state = 281;
        this.match(PythonParser.OPEN_BRACKET);
        this.state = 283;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 95) {
          {
            this.state = 282;
            this.paramList();
          }
        }

        this.state = 285;
        this.match(PythonParser.CLOSE_BRACKET);
        this.state = 286;
        this.match(PythonParser.ARROW);
        this.state = 287;
        this.match(PythonParser.NONE);
        this.state = 288;
        this.match(PythonParser.COLON);
        this.state = 290;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 122) {
          {
            this.state = 289;
            this.commentText();
          }
        }

        this.state = 292;
        this.match(PythonParser.NL);
        this.state = 296;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (
          ((_la & ~0x1f) === 0 && ((1 << _la) & 12384) !== 0) ||
          (((_la - 50) & ~0x1f) === 0 && ((1 << (_la - 50)) & 356519409) !== 0) ||
          (((_la - 95) & ~0x1f) === 0 && ((1 << (_la - 95)) & 134219007) !== 0)
        ) {
          {
            {
              this.state = 293;
              this.ordinaryStatement();
            }
          }
          this.state = 298;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 299;
        this.match(PythonParser.END_PROCEDURE);
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
  public constant(): ConstantContext {
    let localContext = new ConstantContext(this.context, this.state);
    this.enterRule(localContext, 16, PythonParser.RULE_constant);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 303;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 105) {
          {
            this.state = 302;
            this.match(PythonParser.GHOSTED);
          }
        }

        this.state = 305;
        this.identifierDef();
        this.state = 306;
        this.match(PythonParser.SINGLE_EQUALS);
        this.state = 307;
        this.constantValue();
        this.state = 309;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 122) {
          {
            this.state = 308;
            this.commentText();
          }
        }

        this.state = 311;
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
        this.state = 314;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 105) {
          {
            this.state = 313;
            this.match(PythonParser.GHOSTED);
          }
        }

        this.state = 316;
        this.match(PythonParser.CLASS);
        this.state = 317;
        this.typeName();
        this.state = 318;
        this.match(PythonParser.OPEN_BRACKET);
        this.state = 319;
        this.match(PythonParser.ENUM);
        this.state = 320;
        this.match(PythonParser.CLOSE_BRACKET);
        this.state = 321;
        this.match(PythonParser.COLON);
        this.state = 323;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 122) {
          {
            this.state = 322;
            this.commentText();
          }
        }

        this.state = 325;
        this.match(PythonParser.NL);
        this.state = 326;
        this.identifierList();
        this.state = 327;
        this.match(PythonParser.END_ENUM);
        this.state = 328;
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
        this.state = 331;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 105) {
          {
            this.state = 330;
            this.match(PythonParser.GHOSTED);
          }
        }

        this.state = 333;
        this.match(PythonParser.CLASS);
        this.state = 334;
        localContext._classTypeName = this.typeName();
        this.state = 339;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 78) {
          {
            this.state = 335;
            this.match(PythonParser.OPEN_BRACKET);
            this.state = 336;
            localContext._inheritsTypeName = this.typeName();
            this.state = 337;
            this.match(PythonParser.CLOSE_BRACKET);
          }
        }

        this.state = 341;
        this.match(PythonParser.COLON);
        this.state = 343;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 122) {
          {
            this.state = 342;
            this.commentText();
          }
        }

        this.state = 345;
        this.match(PythonParser.NL);
        this.state = 346;
        this.constructorMember();
        this.state = 350;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (
          _la === 45 ||
          (((_la - 95) & ~0x1f) === 0 && ((1 << (_la - 95)) & 134218753) !== 0)
        ) {
          {
            {
              this.state = 347;
              this.concreteClassMember();
            }
          }
          this.state = 352;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 353;
        this.match(PythonParser.END_CLASS);
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
  public concreteClassMember(): ConcreteClassMemberContext {
    let localContext = new ConcreteClassMemberContext(this.context, this.state);
    this.enterRule(localContext, 22, PythonParser.RULE_concreteClassMember);
    try {
      this.state = 360;
      this.errorHandler.sync(this);
      switch (this.interpreter.adaptivePredict(this.tokenStream, 26, this.context)) {
        case 1:
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 356;
            this.property();
          }
          break;
        case 2:
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 357;
            this.functionMethod();
          }
          break;
        case 3:
          this.enterOuterAlt(localContext, 3);
          {
            this.state = 358;
            this.procedureMethod();
          }
          break;
        case 4:
          this.enterOuterAlt(localContext, 4);
          {
            this.state = 359;
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
        this.state = 363;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 105) {
          {
            this.state = 362;
            this.match(PythonParser.GHOSTED);
          }
        }

        this.state = 365;
        this.match(PythonParser.CLASS);
        this.state = 366;
        localContext._classTypeName = this.typeName();
        this.state = 371;
        this.errorHandler.sync(this);
        switch (this.tokenStream.LA(1)) {
          case PythonParser.OPEN_BRACKET:
            {
              this.state = 367;
              this.match(PythonParser.OPEN_BRACKET);
              this.state = 368;
              localContext._inheritsTypeName = this.typeName();
            }
            break;
          case PythonParser.ABC:
            {
              this.state = 369;
              this.match(PythonParser.ABC);
              this.state = 370;
              this.match(PythonParser.CLOSE_BRACKET);
            }
            break;
          default:
            throw new antlr.NoViableAltException(this);
        }
        this.state = 373;
        this.match(PythonParser.COLON);
        this.state = 375;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 122) {
          {
            this.state = 374;
            this.commentText();
          }
        }

        this.state = 377;
        this.match(PythonParser.NL);
        this.state = 381;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (
          _la === 45 ||
          (((_la - 95) & ~0x1f) === 0 && ((1 << (_la - 95)) & 201327617) !== 0)
        ) {
          {
            {
              this.state = 378;
              this.abstractClassMember();
            }
          }
          this.state = 383;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 384;
        this.match(PythonParser.END_CLASS);
        this.state = 385;
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
      this.state = 393;
      this.errorHandler.sync(this);
      switch (this.interpreter.adaptivePredict(this.tokenStream, 31, this.context)) {
        case 1:
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 387;
            this.property();
          }
          break;
        case 2:
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 388;
            this.functionMethod();
          }
          break;
        case 3:
          this.enterOuterAlt(localContext, 3);
          {
            this.state = 389;
            this.procedureMethod();
          }
          break;
        case 4:
          this.enterOuterAlt(localContext, 4);
          {
            this.state = 390;
            this.abstractFunction();
          }
          break;
        case 5:
          this.enterOuterAlt(localContext, 5);
          {
            this.state = 391;
            this.abstractProcedure();
          }
          break;
        case 6:
          this.enterOuterAlt(localContext, 6);
          {
            this.state = 392;
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
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 395;
        this.commentText();
        this.state = 396;
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
        this.state = 398;
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
      this.state = 409;
      this.errorHandler.sync(this);
      switch (this.interpreter.adaptivePredict(this.tokenStream, 32, this.context)) {
        case 1:
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 400;
            this.variableDefinition();
          }
          break;
        case 2:
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 401;
            this.assignment();
          }
          break;
        case 3:
          this.enterOuterAlt(localContext, 3);
          {
            this.state = 402;
            this.ifStatement();
          }
          break;
        case 4:
          this.enterOuterAlt(localContext, 4);
          {
            this.state = 403;
            this.whileLoop();
          }
          break;
        case 5:
          this.enterOuterAlt(localContext, 5);
          {
            this.state = 404;
            this.forLoop();
          }
          break;
        case 6:
          this.enterOuterAlt(localContext, 6);
          {
            this.state = 405;
            this.procedureCall();
          }
          break;
        case 7:
          this.enterOuterAlt(localContext, 7);
          {
            this.state = 406;
            this.tryStatement();
          }
          break;
        case 8:
          this.enterOuterAlt(localContext, 8);
          {
            this.state = 407;
            this.throwStatement();
          }
          break;
        case 9:
          this.enterOuterAlt(localContext, 9);
          {
            this.state = 408;
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
        this.state = 412;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 105) {
          {
            this.state = 411;
            this.match(PythonParser.GHOSTED);
          }
        }

        this.state = 414;
        this.identifierDef();
        this.state = 415;
        this.match(PythonParser.SINGLE_EQUALS);
        this.state = 416;
        this.expression(0);
        this.state = 417;
        this.match(PythonParser.VARIABLE_DEFINITION_ANNOTATION);
        this.state = 418;
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
        this.state = 421;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 105) {
          {
            this.state = 420;
            this.match(PythonParser.GHOSTED);
          }
        }

        this.state = 423;
        this.assignable(0);
        this.state = 424;
        this.match(PythonParser.SINGLE_EQUALS);
        this.state = 425;
        this.expression(0);
        this.state = 426;
        this.match(PythonParser.ASSIGNMENT_ANNOTATION);
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
  public ifStatement(): IfStatementContext {
    let localContext = new IfStatementContext(this.context, this.state);
    this.enterRule(localContext, 38, PythonParser.RULE_ifStatement);
    let _la: number;
    try {
      let alternative: number;
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 430;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 105) {
          {
            this.state = 429;
            this.match(PythonParser.GHOSTED);
          }
        }

        this.state = 432;
        this.match(PythonParser.IF);
        this.state = 433;
        localContext._condition = this.expression(0);
        this.state = 434;
        this.match(PythonParser.THEN);
        this.state = 436;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 122) {
          {
            this.state = 435;
            this.commentText();
          }
        }

        this.state = 438;
        this.match(PythonParser.NL);
        this.state = 439;
        this.thenClause();
        this.state = 443;
        this.errorHandler.sync(this);
        alternative = this.interpreter.adaptivePredict(this.tokenStream, 37, this.context);
        while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
          if (alternative === 1) {
            {
              {
                this.state = 440;
                this.elseIfClause();
              }
            }
          }
          this.state = 445;
          this.errorHandler.sync(this);
          alternative = this.interpreter.adaptivePredict(this.tokenStream, 37, this.context);
        }
        this.state = 447;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 3 || _la === 105) {
          {
            this.state = 446;
            this.elseClause();
          }
        }

        this.state = 449;
        this.match(PythonParser.END_IF);
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
  public thenClause(): ThenClauseContext {
    let localContext = new ThenClauseContext(this.context, this.state);
    this.enterRule(localContext, 40, PythonParser.RULE_thenClause);
    try {
      let alternative: number;
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 455;
        this.errorHandler.sync(this);
        alternative = this.interpreter.adaptivePredict(this.tokenStream, 39, this.context);
        while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
          if (alternative === 1) {
            {
              {
                this.state = 452;
                this.ordinaryStatement();
              }
            }
          }
          this.state = 457;
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
  public elseIfClause(): ElseIfClauseContext {
    let localContext = new ElseIfClauseContext(this.context, this.state);
    this.enterRule(localContext, 42, PythonParser.RULE_elseIfClause);
    let _la: number;
    try {
      let alternative: number;
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 459;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 105) {
          {
            this.state = 458;
            this.match(PythonParser.GHOSTED);
          }
        }

        this.state = 461;
        this.match(PythonParser.ELIF);
        this.state = 462;
        this.expression(0);
        this.state = 463;
        this.match(PythonParser.THEN);
        this.state = 465;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 122) {
          {
            this.state = 464;
            this.commentText();
          }
        }

        this.state = 467;
        this.match(PythonParser.NL);
        this.state = 471;
        this.errorHandler.sync(this);
        alternative = this.interpreter.adaptivePredict(this.tokenStream, 42, this.context);
        while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
          if (alternative === 1) {
            {
              {
                this.state = 468;
                this.ordinaryStatement();
              }
            }
          }
          this.state = 473;
          this.errorHandler.sync(this);
          alternative = this.interpreter.adaptivePredict(this.tokenStream, 42, this.context);
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
        this.state = 475;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 105) {
          {
            this.state = 474;
            this.match(PythonParser.GHOSTED);
          }
        }

        this.state = 477;
        this.match(PythonParser.ELSE);
        this.state = 479;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 122) {
          {
            this.state = 478;
            this.commentText();
          }
        }

        this.state = 481;
        this.match(PythonParser.NL);
        this.state = 485;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (
          ((_la & ~0x1f) === 0 && ((1 << _la) & 12384) !== 0) ||
          (((_la - 50) & ~0x1f) === 0 && ((1 << (_la - 50)) & 356519409) !== 0) ||
          (((_la - 95) & ~0x1f) === 0 && ((1 << (_la - 95)) & 134219007) !== 0)
        ) {
          {
            {
              this.state = 482;
              this.ordinaryStatement();
            }
          }
          this.state = 487;
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
  public whileLoop(): WhileLoopContext {
    let localContext = new WhileLoopContext(this.context, this.state);
    this.enterRule(localContext, 46, PythonParser.RULE_whileLoop);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 489;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 105) {
          {
            this.state = 488;
            this.match(PythonParser.GHOSTED);
          }
        }

        this.state = 491;
        this.match(PythonParser.WHILE);
        this.state = 492;
        this.expression(0);
        this.state = 493;
        this.match(PythonParser.COLON);
        this.state = 495;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 122) {
          {
            this.state = 494;
            this.commentText();
          }
        }

        this.state = 497;
        this.match(PythonParser.NL);
        this.state = 501;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (
          ((_la & ~0x1f) === 0 && ((1 << _la) & 12384) !== 0) ||
          (((_la - 50) & ~0x1f) === 0 && ((1 << (_la - 50)) & 356519409) !== 0) ||
          (((_la - 95) & ~0x1f) === 0 && ((1 << (_la - 95)) & 134219007) !== 0)
        ) {
          {
            {
              this.state = 498;
              this.ordinaryStatement();
            }
          }
          this.state = 503;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 504;
        this.match(PythonParser.END_WHILE);
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
  public forLoop(): ForLoopContext {
    let localContext = new ForLoopContext(this.context, this.state);
    this.enterRule(localContext, 48, PythonParser.RULE_forLoop);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 508;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 105) {
          {
            this.state = 507;
            this.match(PythonParser.GHOSTED);
          }
        }

        this.state = 510;
        this.match(PythonParser.FOR);
        this.state = 511;
        this.identifierDef();
        this.state = 512;
        this.match(PythonParser.IN);
        this.state = 513;
        this.expression(0);
        this.state = 514;
        this.match(PythonParser.COLON);
        this.state = 516;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 122) {
          {
            this.state = 515;
            this.commentText();
          }
        }

        this.state = 518;
        this.match(PythonParser.NL);
        this.state = 522;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (
          ((_la & ~0x1f) === 0 && ((1 << _la) & 12384) !== 0) ||
          (((_la - 50) & ~0x1f) === 0 && ((1 << (_la - 50)) & 356519409) !== 0) ||
          (((_la - 95) & ~0x1f) === 0 && ((1 << (_la - 95)) & 134219007) !== 0)
        ) {
          {
            {
              this.state = 519;
              this.ordinaryStatement();
            }
          }
          this.state = 524;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 525;
        this.match(PythonParser.END_FOR);
        this.state = 526;
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
        this.state = 529;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 105) {
          {
            this.state = 528;
            this.match(PythonParser.GHOSTED);
          }
        }

        this.state = 531;
        this.term(0);
        this.state = 533;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 122) {
          {
            this.state = 532;
            this.commentText();
          }
        }

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
  public tryStatement(): TryStatementContext {
    let localContext = new TryStatementContext(this.context, this.state);
    this.enterRule(localContext, 52, PythonParser.RULE_tryStatement);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 538;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 105) {
          {
            this.state = 537;
            this.match(PythonParser.GHOSTED);
          }
        }

        this.state = 540;
        this.match(PythonParser.TRY);
        this.state = 541;
        this.match(PythonParser.COLON);
        this.state = 543;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 122) {
          {
            this.state = 542;
            this.commentText();
          }
        }

        this.state = 545;
        this.match(PythonParser.NL);
        this.state = 546;
        this.tryClause();
        this.state = 548;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        do {
          {
            {
              this.state = 547;
              this.catchClause();
            }
          }
          this.state = 550;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        } while (_la === 46 || _la === 105);
        this.state = 552;
        this.match(PythonParser.END_TRY);
        this.state = 553;
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
        this.state = 558;
        this.errorHandler.sync(this);
        alternative = this.interpreter.adaptivePredict(this.tokenStream, 57, this.context);
        while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
          if (alternative === 1) {
            {
              {
                this.state = 555;
                this.ordinaryStatement();
              }
            }
          }
          this.state = 560;
          this.errorHandler.sync(this);
          alternative = this.interpreter.adaptivePredict(this.tokenStream, 57, this.context);
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
        this.state = 562;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 105) {
          {
            this.state = 561;
            this.match(PythonParser.GHOSTED);
          }
        }

        this.state = 564;
        this.match(PythonParser.EXCEPT);
        this.state = 565;
        this.typeName();
        this.state = 566;
        this.match(PythonParser.AS);
        this.state = 567;
        this.identifierDef();
        this.state = 568;
        this.match(PythonParser.COLON);
        this.state = 570;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 122) {
          {
            this.state = 569;
            this.commentText();
          }
        }

        this.state = 572;
        this.match(PythonParser.NL);
        this.state = 576;
        this.errorHandler.sync(this);
        alternative = this.interpreter.adaptivePredict(this.tokenStream, 60, this.context);
        while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
          if (alternative === 1) {
            {
              {
                this.state = 573;
                this.ordinaryStatement();
              }
            }
          }
          this.state = 578;
          this.errorHandler.sync(this);
          alternative = this.interpreter.adaptivePredict(this.tokenStream, 60, this.context);
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
        this.state = 580;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 105) {
          {
            this.state = 579;
            this.match(PythonParser.GHOSTED);
          }
        }

        this.state = 582;
        this.match(PythonParser.RAISE);
        this.state = 583;
        this.typeName();
        this.state = 584;
        this.match(PythonParser.OPEN_BRACKET);
        this.state = 585;
        this.errorMessage();
        this.state = 586;
        this.match(PythonParser.CLOSE_BRACKET);
        this.state = 588;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 122) {
          {
            this.state = 587;
            this.commentText();
          }
        }

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
  public errorMessage(): ErrorMessageContext {
    let localContext = new ErrorMessageContext(this.context, this.state);
    this.enterRule(localContext, 60, PythonParser.RULE_errorMessage);
    try {
      this.state = 594;
      this.errorHandler.sync(this);
      switch (this.tokenStream.LA(1)) {
        case PythonParser.LITERAL_STRING:
        case PythonParser.INTERPOLATED_STRING:
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 592;
            this.litString();
          }
          break;
        case PythonParser.NAME_STARTING_LC:
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 593;
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
        this.state = 597;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 105) {
          {
            this.state = 596;
            this.match(PythonParser.GHOSTED);
          }
        }

        this.state = 599;
        this.match(PythonParser.THIS_INSTANCE);
        this.state = 600;
        this.match(PythonParser.DOT);
        this.state = 601;
        this.match(PythonParser.ASSERT_EQUAL);
        this.state = 602;
        this.match(PythonParser.OPEN_BRACKET);
        this.state = 603;
        this.assertActual();
        this.state = 604;
        this.match(PythonParser.COMMA);
        this.state = 605;
        this.assertExpected();
        this.state = 606;
        this.match(PythonParser.CLOSE_BRACKET);
        this.state = 608;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 122) {
          {
            this.state = 607;
            this.commentText();
          }
        }

        this.state = 610;
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
        this.state = 612;
        this.match(PythonParser.RETURN);
        this.state = 613;
        this.expression(0);
        this.state = 615;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 122) {
          {
            this.state = 614;
            this.commentText();
          }
        }

        this.state = 617;
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
    this.enterRule(localContext, 66, PythonParser.RULE_catchStatement);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 620;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 105) {
          {
            this.state = 619;
            this.match(PythonParser.GHOSTED);
          }
        }

        this.state = 622;
        this.match(PythonParser.EXCEPT);
        this.state = 623;
        this.typeName();
        this.state = 624;
        this.match(PythonParser.AS);
        this.state = 625;
        this.identifierDef();
        this.state = 627;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 122) {
          {
            this.state = 626;
            this.commentText();
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
  public constructorMember(): ConstructorMemberContext {
    let localContext = new ConstructorMemberContext(this.context, this.state);
    this.enterRule(localContext, 68, PythonParser.RULE_constructorMember);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 632;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 105) {
          {
            this.state = 631;
            this.match(PythonParser.GHOSTED);
          }
        }

        this.state = 634;
        this.match(PythonParser.DEF);
        this.state = 635;
        this.match(PythonParser.INIT);
        this.state = 636;
        this.match(PythonParser.OPEN_BRACKET);
        this.state = 638;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 95) {
          {
            this.state = 637;
            this.paramList();
          }
        }

        this.state = 640;
        this.match(PythonParser.CLOSE_BRACKET);
        this.state = 641;
        this.match(PythonParser.ARROW);
        this.state = 642;
        this.match(PythonParser.NONE);
        this.state = 643;
        this.match(PythonParser.COLON);
        this.state = 645;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 122) {
          {
            this.state = 644;
            this.commentText();
          }
        }

        this.state = 647;
        this.match(PythonParser.NL);
        this.state = 651;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (
          ((_la & ~0x1f) === 0 && ((1 << _la) & 12384) !== 0) ||
          (((_la - 50) & ~0x1f) === 0 && ((1 << (_la - 50)) & 356519409) !== 0) ||
          (((_la - 95) & ~0x1f) === 0 && ((1 << (_la - 95)) & 134219007) !== 0)
        ) {
          {
            {
              this.state = 648;
              this.ordinaryStatement();
            }
          }
          this.state = 653;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 654;
        this.match(PythonParser.END_CONSTRUCTOR);
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
  public property(): PropertyContext {
    let localContext = new PropertyContext(this.context, this.state);
    this.enterRule(localContext, 70, PythonParser.RULE_property);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 658;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 105) {
          {
            this.state = 657;
            this.match(PythonParser.GHOSTED);
          }
        }

        this.state = 660;
        this.identifierDef();
        this.state = 661;
        this.match(PythonParser.COLON);
        this.state = 662;
        this.type_();
        this.state = 664;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 122) {
          {
            this.state = 663;
            this.commentText();
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
  public functionMethod(): FunctionMethodContext {
    let localContext = new FunctionMethodContext(this.context, this.state);
    this.enterRule(localContext, 72, PythonParser.RULE_functionMethod);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 669;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 105) {
          {
            this.state = 668;
            this.match(PythonParser.GHOSTED);
          }
        }

        this.state = 671;
        this.match(PythonParser.DEF);
        this.state = 672;
        this.methodName();
        this.state = 673;
        this.match(PythonParser.OPEN_BRACKET);
        this.state = 675;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 95) {
          {
            this.state = 674;
            this.paramList();
          }
        }

        this.state = 677;
        this.match(PythonParser.CLOSE_BRACKET);
        this.state = 678;
        this.match(PythonParser.ARROW);
        this.state = 679;
        this.type_();
        this.state = 680;
        this.match(PythonParser.COLON);
        this.state = 682;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 122) {
          {
            this.state = 681;
            this.commentText();
          }
        }

        this.state = 684;
        this.match(PythonParser.NL);
        this.state = 688;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (
          ((_la & ~0x1f) === 0 && ((1 << _la) & 12384) !== 0) ||
          (((_la - 50) & ~0x1f) === 0 && ((1 << (_la - 50)) & 356519409) !== 0) ||
          (((_la - 95) & ~0x1f) === 0 && ((1 << (_la - 95)) & 134219007) !== 0)
        ) {
          {
            {
              this.state = 685;
              this.ordinaryStatement();
            }
          }
          this.state = 690;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 691;
        this.returnStatement();
        this.state = 692;
        this.match(PythonParser.END_FUNCTION_METHOD);
        this.state = 693;
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
        this.state = 696;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 105) {
          {
            this.state = 695;
            this.match(PythonParser.GHOSTED);
          }
        }

        this.state = 698;
        this.match(PythonParser.DEF);
        this.state = 699;
        this.methodName();
        this.state = 700;
        this.match(PythonParser.OPEN_BRACKET);
        this.state = 702;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 95) {
          {
            this.state = 701;
            this.paramList();
          }
        }

        this.state = 704;
        this.match(PythonParser.CLOSE_BRACKET);
        this.state = 705;
        this.match(PythonParser.ARROW);
        this.state = 706;
        this.match(PythonParser.NONE);
        this.state = 707;
        this.match(PythonParser.COLON);
        this.state = 709;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 122) {
          {
            this.state = 708;
            this.commentText();
          }
        }

        this.state = 711;
        this.match(PythonParser.NL);
        this.state = 715;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (
          ((_la & ~0x1f) === 0 && ((1 << _la) & 12384) !== 0) ||
          (((_la - 50) & ~0x1f) === 0 && ((1 << (_la - 50)) & 356519409) !== 0) ||
          (((_la - 95) & ~0x1f) === 0 && ((1 << (_la - 95)) & 134219007) !== 0)
        ) {
          {
            {
              this.state = 712;
              this.ordinaryStatement();
            }
          }
          this.state = 717;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 718;
        this.match(PythonParser.END_PROCEDURE_METHOD);
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
  public abstractFunction(): AbstractFunctionContext {
    let localContext = new AbstractFunctionContext(this.context, this.state);
    this.enterRule(localContext, 76, PythonParser.RULE_abstractFunction);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 722;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 105) {
          {
            this.state = 721;
            this.match(PythonParser.GHOSTED);
          }
        }

        this.state = 724;
        this.match(PythonParser.ABSTRACT_METHOD);
        this.state = 725;
        this.match(PythonParser.NL);
        this.state = 726;
        this.match(PythonParser.DEF);
        this.state = 727;
        this.methodName();
        this.state = 728;
        this.match(PythonParser.OPEN_BRACKET);
        this.state = 730;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 95) {
          {
            this.state = 729;
            this.paramList();
          }
        }

        this.state = 732;
        this.match(PythonParser.CLOSE_BRACKET);
        this.state = 733;
        this.match(PythonParser.ARROW);
        this.state = 734;
        this.type_();
        this.state = 735;
        this.match(PythonParser.COLON);
        this.state = 736;
        this.match(PythonParser.NL);
        this.state = 737;
        this.match(PythonParser.PASS);
        this.state = 739;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 122) {
          {
            this.state = 738;
            this.commentText();
          }
        }

        this.state = 741;
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
        this.state = 744;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 105) {
          {
            this.state = 743;
            this.match(PythonParser.GHOSTED);
          }
        }

        this.state = 746;
        this.match(PythonParser.ABSTRACT_METHOD);
        this.state = 747;
        this.match(PythonParser.NL);
        this.state = 748;
        this.match(PythonParser.DEF);
        this.state = 749;
        this.methodName();
        this.state = 750;
        this.match(PythonParser.OPEN_BRACKET);
        this.state = 752;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 95) {
          {
            this.state = 751;
            this.paramList();
          }
        }

        this.state = 754;
        this.match(PythonParser.CLOSE_BRACKET);
        this.state = 755;
        this.match(PythonParser.ARROW);
        this.state = 756;
        this.match(PythonParser.NONE);
        this.state = 757;
        this.match(PythonParser.COLON);
        this.state = 758;
        this.match(PythonParser.NL);
        this.state = 759;
        this.match(PythonParser.PASS);
        this.state = 761;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 122) {
          {
            this.state = 760;
            this.commentText();
          }
        }

        this.state = 763;
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
        this.state = 765;
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
        this.state = 767;
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
        this.state = 774;
        this.errorHandler.sync(this);
        switch (this.tokenStream.LA(1)) {
          case PythonParser.NAME_STARTING_LC:
            {
              localContext = new SimpleAssignableContext(localContext);
              this.context = localContext;
              previousContext = localContext;

              this.state = 770;
              this.identifierUse();
            }
            break;
          case PythonParser.THIS_INSTANCE:
            {
              localContext = new ThisAssignableContext(localContext);
              this.context = localContext;
              previousContext = localContext;
              this.state = 771;
              this.match(PythonParser.THIS_INSTANCE);
              this.state = 772;
              this.match(PythonParser.DOT);
              this.state = 773;
              this.identifierUse();
            }
            break;
          default:
            throw new antlr.NoViableAltException(this);
        }
        this.context!.stop = this.tokenStream.LT(-1);
        this.state = 780;
        this.errorHandler.sync(this);
        alternative = this.interpreter.adaptivePredict(this.tokenStream, 90, this.context);
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
                this.state = 776;
                if (!this.precpred(this.context, 1)) {
                  throw this.createFailedPredicateException("this.precpred(this.context, 1)");
                }
                this.state = 777;
                this.index();
              }
            }
          }
          this.state = 782;
          this.errorHandler.sync(this);
          alternative = this.interpreter.adaptivePredict(this.tokenStream, 90, this.context);
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
        this.state = 783;
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
        this.state = 785;
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
    this.enterRule(localContext, 90, PythonParser.RULE_typeName);
    try {
      this.state = 793;
      this.errorHandler.sync(this);
      switch (this.tokenStream.LA(1)) {
        case PythonParser.INT_NAME:
          localContext = new IntTypeNameContext(localContext);
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 787;
            this.match(PythonParser.INT_NAME);
          }
          break;
        case PythonParser.FLOAT_NAME:
          localContext = new FloatTypeNameContext(localContext);
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 788;
            this.match(PythonParser.FLOAT_NAME);
          }
          break;
        case PythonParser.BOOL_NAME:
          localContext = new BoolTypeNameContext(localContext);
          this.enterOuterAlt(localContext, 3);
          {
            this.state = 789;
            this.match(PythonParser.BOOL_NAME);
          }
          break;
        case PythonParser.STRING_NAME:
          localContext = new StringTypeNameContext(localContext);
          this.enterOuterAlt(localContext, 4);
          {
            this.state = 790;
            this.match(PythonParser.STRING_NAME);
          }
          break;
        case PythonParser.LIST_NAME:
          localContext = new ListTypeNameContext(localContext);
          this.enterOuterAlt(localContext, 5);
          {
            this.state = 791;
            this.match(PythonParser.LIST_NAME);
          }
          break;
        case PythonParser.NAME_STARTING_UC:
          localContext = new UdtTypeNameContext(localContext);
          this.enterOuterAlt(localContext, 6);
          {
            this.state = 792;
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
    this.enterRule(localContext, 92, PythonParser.RULE_constantValue);
    try {
      this.state = 799;
      this.errorHandler.sync(this);
      switch (this.tokenStream.LA(1)) {
        case PythonParser.TRUE:
        case PythonParser.FALSE:
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 795;
            this.litBoolean();
          }
          break;
        case PythonParser.LITERAL_BINARY:
        case PythonParser.LITERAL_HEX:
        case PythonParser.LITERAL_INTEGER:
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 796;
            this.litInt();
          }
          break;
        case PythonParser.LITERAL_FLOAT:
          this.enterOuterAlt(localContext, 3);
          {
            this.state = 797;
            this.litFloat();
          }
          break;
        case PythonParser.LITERAL_STRING:
        case PythonParser.INTERPOLATED_STRING:
          this.enterOuterAlt(localContext, 4);
          {
            this.state = 798;
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
    this.enterRule(localContext, 94, PythonParser.RULE_argList);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 801;
        this.argument();
        this.state = 806;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (_la === 81) {
          {
            {
              this.state = 802;
              this.match(PythonParser.COMMA);
              this.state = 803;
              this.argument();
            }
          }
          this.state = 808;
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
    this.enterRule(localContext, 96, PythonParser.RULE_argument);
    try {
      this.state = 811;
      this.errorHandler.sync(this);
      switch (this.tokenStream.LA(1)) {
        case PythonParser.LAMBDA:
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 809;
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
            this.state = 810;
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
    this.enterRule(localContext, 98, PythonParser.RULE_paramList);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 813;
        this.paramDef();
        this.state = 818;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (_la === 81) {
          {
            {
              this.state = 814;
              this.match(PythonParser.COMMA);
              this.state = 815;
              this.paramDef();
            }
          }
          this.state = 820;
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
    this.enterRule(localContext, 100, PythonParser.RULE_identifierList);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 821;
        this.identifierDef();
        this.state = 824;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        do {
          {
            {
              this.state = 822;
              this.match(PythonParser.COMMA);
              this.state = 823;
              this.identifierDef();
            }
          }
          this.state = 826;
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
    this.enterRule(localContext, 102, PythonParser.RULE_expressionList);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 828;
        this.expression(0);
        this.state = 833;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (_la === 81) {
          {
            {
              this.state = 829;
              this.match(PythonParser.COMMA);
              this.state = 830;
              this.expression(0);
            }
          }
          this.state = 835;
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
    this.enterRule(localContext, 104, PythonParser.RULE_type);
    try {
      this.state = 840;
      this.errorHandler.sync(this);
      switch (this.interpreter.adaptivePredict(this.tokenStream, 98, this.context)) {
        case 1:
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 836;
            this.typeTuple();
          }
          break;
        case 2:
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 837;
            this.typeName();
          }
          break;
        case 3:
          this.enterOuterAlt(localContext, 3);
          {
            this.state = 838;
            this.typeGeneric();
          }
          break;
        case 4:
          this.enterOuterAlt(localContext, 4);
          {
            this.state = 839;
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
    this.enterRule(localContext, 106, PythonParser.RULE_assertActual);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 842;
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
    this.enterRule(localContext, 108, PythonParser.RULE_assertExpected);
    try {
      this.state = 849;
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
            this.state = 844;
            this.litValue();
          }
          break;
        case PythonParser.OPEN_SQ_BRACKET:
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 845;
            this.list();
          }
          break;
        case PythonParser.OPEN_BRACE:
          this.enterOuterAlt(localContext, 3);
          {
            this.state = 846;
            this.dictionary();
          }
          break;
        case PythonParser.NOT:
        case PythonParser.MINUS:
          this.enterOuterAlt(localContext, 4);
          {
            this.state = 847;
            this.unaryExpression();
          }
          break;
        case PythonParser.OPEN_BRACKET:
          this.enterOuterAlt(localContext, 5);
          {
            this.state = 848;
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
    this.enterRule(localContext, 110, PythonParser.RULE_litValue);
    try {
      this.state = 857;
      this.errorHandler.sync(this);
      switch (this.interpreter.adaptivePredict(this.tokenStream, 100, this.context)) {
        case 1:
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 851;
            this.litBoolean();
          }
          break;
        case 2:
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 852;
            this.litInt();
          }
          break;
        case 3:
          this.enterOuterAlt(localContext, 3);
          {
            this.state = 853;
            this.litFloat();
          }
          break;
        case 4:
          this.enterOuterAlt(localContext, 4);
          {
            this.state = 854;
            this.litString();
          }
          break;
        case 5:
          this.enterOuterAlt(localContext, 5);
          {
            this.state = 855;
            this.interpolatedString();
          }
          break;
        case 6:
          this.enterOuterAlt(localContext, 6);
          {
            this.state = 856;
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
    this.enterRule(localContext, 112, PythonParser.RULE_litBoolean);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 859;
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
    this.enterRule(localContext, 114, PythonParser.RULE_litInt);
    try {
      this.state = 864;
      this.errorHandler.sync(this);
      switch (this.tokenStream.LA(1)) {
        case PythonParser.LITERAL_INTEGER:
          localContext = new LitIntegerContext(localContext);
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 861;
            this.match(PythonParser.LITERAL_INTEGER);
          }
          break;
        case PythonParser.LITERAL_BINARY:
          localContext = new LitBinaryContext(localContext);
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 862;
            this.match(PythonParser.LITERAL_BINARY);
          }
          break;
        case PythonParser.LITERAL_HEX:
          localContext = new LitHexContext(localContext);
          this.enterOuterAlt(localContext, 3);
          {
            this.state = 863;
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
    this.enterRule(localContext, 116, PythonParser.RULE_litFloat);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 866;
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
    this.enterRule(localContext, 118, PythonParser.RULE_litString);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 868;
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
    this.enterRule(localContext, 120, PythonParser.RULE_enumValue);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 870;
        this.typeName();
        this.state = 871;
        this.match(PythonParser.DOT);
        this.state = 872;
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
    this.enterRule(localContext, 122, PythonParser.RULE_index);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 874;
        this.match(PythonParser.OPEN_SQ_BRACKET);
        this.state = 875;
        this.expression(0);
        this.state = 876;
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
    let _startState = 124;
    this.enterRecursionRule(localContext, 124, PythonParser.RULE_expression, _p);
    let _la: number;
    try {
      let alternative: number;
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 883;
        this.errorHandler.sync(this);
        switch (this.interpreter.adaptivePredict(this.tokenStream, 102, this.context)) {
          case 1:
            {
              localContext = new NewInstanceExpressionContext(localContext);
              this.context = localContext;
              previousContext = localContext;

              this.state = 879;
              this.newInstance();
            }
            break;
          case 2:
            {
              localContext = new UnaryExpressionLabelContext(localContext);
              this.context = localContext;
              previousContext = localContext;
              this.state = 880;
              this.unaryExpression();
            }
            break;
          case 3:
            {
              localContext = new TermExpressionContext(localContext);
              this.context = localContext;
              previousContext = localContext;
              this.state = 881;
              this.term(0);
            }
            break;
          case 4:
            {
              localContext = new BinaryExpressionLabelContext(localContext);
              this.context = localContext;
              previousContext = localContext;
              this.state = 882;
              this.binaryExpression();
            }
            break;
        }
        this.context!.stop = this.tokenStream.LT(-1);
        this.state = 900;
        this.errorHandler.sync(this);
        alternative = this.interpreter.adaptivePredict(this.tokenStream, 104, this.context);
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
                this.state = 885;
                if (!this.precpred(this.context, 1)) {
                  throw this.createFailedPredicateException("this.precpred(this.context, 1)");
                }
                this.state = 886;
                this.match(PythonParser.IF);
                this.state = 887;
                (localContext as IfExpressionContext)._condition = this.expression(0);
                this.state = 892;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 2) {
                  {
                    {
                      this.state = 888;
                      this.match(PythonParser.ELIF);
                      this.state = 889;
                      (localContext as IfExpressionContext)._elifCondition = this.expression(0);
                    }
                  }
                  this.state = 894;
                  this.errorHandler.sync(this);
                  _la = this.tokenStream.LA(1);
                }
                this.state = 895;
                this.match(PythonParser.ELSE);
                this.state = 896;
                (localContext as IfExpressionContext)._falseExpr = this.expression(2);
              }
            }
          }
          this.state = 902;
          this.errorHandler.sync(this);
          alternative = this.interpreter.adaptivePredict(this.tokenStream, 104, this.context);
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
    let _startState = 126;
    this.enterRecursionRule(localContext, 126, PythonParser.RULE_term, _p);
    try {
      let alternative: number;
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 912;
        this.errorHandler.sync(this);
        switch (this.interpreter.adaptivePredict(this.tokenStream, 105, this.context)) {
          case 1:
            {
              localContext = new ThisInstanceTermContext(localContext);
              this.context = localContext;
              previousContext = localContext;

              this.state = 904;
              this.thisInstance();
            }
            break;
          case 2:
            {
              localContext = new BracketedExpressionTermContext(localContext);
              this.context = localContext;
              previousContext = localContext;
              this.state = 905;
              this.bracketedExpression();
            }
            break;
          case 3:
            {
              localContext = new LitValueTermContext(localContext);
              this.context = localContext;
              previousContext = localContext;
              this.state = 906;
              this.litValue();
            }
            break;
          case 4:
            {
              localContext = new ListTermContext(localContext);
              this.context = localContext;
              previousContext = localContext;
              this.state = 907;
              this.list();
            }
            break;
          case 5:
            {
              localContext = new DictionaryTermContext(localContext);
              this.context = localContext;
              previousContext = localContext;
              this.state = 908;
              this.dictionary();
            }
            break;
          case 6:
            {
              localContext = new TupleTermContext(localContext);
              this.context = localContext;
              previousContext = localContext;
              this.state = 909;
              this.tuple();
            }
            break;
          case 7:
            {
              localContext = new IdentifierUseTermContext(localContext);
              this.context = localContext;
              previousContext = localContext;
              this.state = 910;
              this.identifierUse();
            }
            break;
          case 8:
            {
              localContext = new MethodCallTermContext(localContext);
              this.context = localContext;
              previousContext = localContext;
              this.state = 911;
              this.methodCall();
            }
            break;
        }
        this.context!.stop = this.tokenStream.LT(-1);
        this.state = 921;
        this.errorHandler.sync(this);
        alternative = this.interpreter.adaptivePredict(this.tokenStream, 107, this.context);
        while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
          if (alternative === 1) {
            if (this.parseListeners != null) {
              this.triggerExitRuleEvent();
            }
            previousContext = localContext;
            {
              this.state = 919;
              this.errorHandler.sync(this);
              switch (this.interpreter.adaptivePredict(this.tokenStream, 106, this.context)) {
                case 1:
                  {
                    localContext = new IndexedTermContext(
                      new TermContext(parentContext, parentState),
                    );
                    this.pushNewRecursionContext(localContext, _startState, PythonParser.RULE_term);
                    this.state = 914;
                    if (!this.precpred(this.context, 2)) {
                      throw this.createFailedPredicateException("this.precpred(this.context, 2)");
                    }
                    this.state = 915;
                    this.index();
                  }
                  break;
                case 2:
                  {
                    localContext = new ChainableTermContext(
                      new TermContext(parentContext, parentState),
                    );
                    this.pushNewRecursionContext(localContext, _startState, PythonParser.RULE_term);
                    this.state = 916;
                    if (!this.precpred(this.context, 1)) {
                      throw this.createFailedPredicateException("this.precpred(this.context, 1)");
                    }
                    this.state = 917;
                    this.match(PythonParser.DOT);
                    this.state = 918;
                    this.chainable();
                  }
                  break;
              }
            }
          }
          this.state = 923;
          this.errorHandler.sync(this);
          alternative = this.interpreter.adaptivePredict(this.tokenStream, 107, this.context);
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
    this.enterRule(localContext, 128, PythonParser.RULE_chainable);
    try {
      this.state = 926;
      this.errorHandler.sync(this);
      switch (this.interpreter.adaptivePredict(this.tokenStream, 108, this.context)) {
        case 1:
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 924;
            this.identifierUse();
          }
          break;
        case 2:
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 925;
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
    this.enterRule(localContext, 130, PythonParser.RULE_thisInstance);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 928;
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
    this.enterRule(localContext, 132, PythonParser.RULE_bracketedExpression);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 930;
        this.match(PythonParser.OPEN_BRACKET);
        this.state = 931;
        this.expression(0);
        this.state = 932;
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
    this.enterRule(localContext, 134, PythonParser.RULE_unaryExpression);
    try {
      this.state = 936;
      this.errorHandler.sync(this);
      switch (this.tokenStream.LA(1)) {
        case PythonParser.MINUS:
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 934;
            this.negateNumeric();
          }
          break;
        case PythonParser.NOT:
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 935;
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
    this.enterRule(localContext, 136, PythonParser.RULE_negateNumeric);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 938;
        this.match(PythonParser.MINUS);
        this.state = 939;
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
    this.enterRule(localContext, 138, PythonParser.RULE_negateLogical);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 941;
        this.match(PythonParser.NOT);
        this.state = 942;
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
    this.enterRule(localContext, 140, PythonParser.RULE_binaryExpression);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 944;
        localContext._left = this.term(0);
        this.state = 945;
        this.binaryOperator();
        this.state = 946;
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
    this.enterRule(localContext, 142, PythonParser.RULE_list);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 948;
        this.match(PythonParser.OPEN_SQ_BRACKET);
        this.state = 949;
        this.expressionList();
        this.state = 950;
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
    this.enterRule(localContext, 144, PythonParser.RULE_tuple);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 952;
        this.match(PythonParser.OPEN_BRACKET);
        this.state = 953;
        this.expressionList();
        this.state = 954;
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
    this.enterRule(localContext, 146, PythonParser.RULE_dictionary);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 956;
        this.match(PythonParser.OPEN_BRACE);
        this.state = 957;
        this.kvpList();
        this.state = 958;
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
    this.enterRule(localContext, 148, PythonParser.RULE_kvpList);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 960;
        this.kvp();
        this.state = 965;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (_la === 81) {
          {
            {
              this.state = 961;
              this.match(PythonParser.COMMA);
              this.state = 962;
              this.kvp();
            }
          }
          this.state = 967;
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
    this.enterRule(localContext, 150, PythonParser.RULE_kvp);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 968;
        localContext._key = this.expression(0);
        this.state = 969;
        this.match(PythonParser.COLON);
        this.state = 970;
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
    this.enterRule(localContext, 152, PythonParser.RULE_methodCall);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 972;
        this.methodName();
        this.state = 973;
        this.match(PythonParser.OPEN_BRACKET);
        this.state = 975;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (
          _la === 9 ||
          (((_la - 53) & ~0x1f) === 0 && ((1 << (_la - 53)) & 2192050687) !== 0) ||
          (((_la - 95) & ~0x1f) === 0 && ((1 << (_la - 95)) & 255) !== 0)
        ) {
          {
            this.state = 974;
            this.argList();
          }
        }

        this.state = 977;
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
    this.enterRule(localContext, 154, PythonParser.RULE_binaryOperator);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 979;
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
    this.enterRule(localContext, 156, PythonParser.RULE_newInstance);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 981;
        this.type_();
        this.state = 982;
        this.match(PythonParser.OPEN_BRACKET);
        this.state = 984;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (
          _la === 9 ||
          (((_la - 53) & ~0x1f) === 0 && ((1 << (_la - 53)) & 2192050687) !== 0) ||
          (((_la - 95) & ~0x1f) === 0 && ((1 << (_la - 95)) & 255) !== 0)
        ) {
          {
            this.state = 983;
            this.argList();
          }
        }

        this.state = 986;
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
    this.enterRule(localContext, 158, PythonParser.RULE_paramDef);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 988;
        this.identifierDef();
        this.state = 989;
        this.match(PythonParser.COLON);
        this.state = 990;
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
    this.enterRule(localContext, 160, PythonParser.RULE_typeGeneric);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 992;
        this.typeName();
        this.state = 993;
        this.match(PythonParser.OPEN_SQ_BRACKET);
        this.state = 994;
        this.type_();
        this.state = 999;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (_la === 81) {
          {
            {
              this.state = 995;
              this.match(PythonParser.COMMA);
              this.state = 996;
              this.type_();
            }
          }
          this.state = 1001;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
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
  public typeFunc(): TypeFuncContext {
    let localContext = new TypeFuncContext(this.context, this.state);
    this.enterRule(localContext, 162, PythonParser.RULE_typeFunc);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 1004;
        this.match(PythonParser.FUNC_NAME);
        this.state = 1005;
        this.match(PythonParser.OPEN_SQ_BRACKET);
        this.state = 1006;
        this.match(PythonParser.OPEN_SQ_BRACKET);
        this.state = 1007;
        this.type_();
        this.state = 1012;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (_la === 81) {
          {
            {
              this.state = 1008;
              this.match(PythonParser.COMMA);
              this.state = 1009;
              this.type_();
            }
          }
          this.state = 1014;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 1015;
        this.match(PythonParser.CLOSE_SQ_BRACKET);
        this.state = 1016;
        this.match(PythonParser.COMMA);
        this.state = 1017;
        this.type_();
        this.state = 1018;
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
    this.enterRule(localContext, 164, PythonParser.RULE_typeTuple);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 1020;
        this.match(PythonParser.TUPLE);
        this.state = 1021;
        this.match(PythonParser.OPEN_SQ_BRACKET);
        this.state = 1022;
        this.type_();
        this.state = 1025;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        do {
          {
            {
              this.state = 1023;
              this.match(PythonParser.COMMA);
              this.state = 1024;
              this.type_();
            }
          }
          this.state = 1027;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        } while (_la === 81);
        this.state = 1029;
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
    this.enterRule(localContext, 166, PythonParser.RULE_lambda);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 1031;
        this.match(PythonParser.LAMBDA);
        this.state = 1032;
        this.paramList();
        this.state = 1033;
        this.match(PythonParser.COLON);
        this.state = 1034;
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
    this.enterRule(localContext, 168, PythonParser.RULE_interpolatedString);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 1036;
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
      case 62:
        return this.expression_sempred(localContext as ExpressionContext, predIndex);
      case 63:
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
    4, 1, 122, 1039, 2, 0, 7, 0, 2, 1, 7, 1, 2, 2, 7, 2, 2, 3, 7, 3, 2, 4, 7, 4, 2, 5, 7, 5, 2, 6,
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
    81, 7, 81, 2, 82, 7, 82, 2, 83, 7, 83, 2, 84, 7, 84, 1, 0, 3, 0, 172, 8, 0, 1, 0, 5, 0, 175, 8,
    0, 10, 0, 12, 0, 178, 9, 0, 1, 0, 3, 0, 181, 8, 0, 1, 0, 5, 0, 184, 8, 0, 10, 0, 12, 0, 187, 9,
    0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 1, 200, 8, 1, 1, 2, 3,
    2, 203, 8, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 5, 2, 214, 8, 2, 10, 2, 12,
    2, 217, 9, 2, 1, 2, 1, 2, 1, 2, 1, 3, 1, 3, 1, 3, 1, 3, 1, 4, 3, 4, 227, 8, 4, 1, 4, 1, 4, 1, 4,
    1, 4, 3, 4, 233, 8, 4, 1, 4, 1, 4, 1, 4, 1, 4, 1, 4, 3, 4, 240, 8, 4, 1, 4, 1, 4, 5, 4, 244, 8,
    4, 10, 4, 12, 4, 247, 9, 4, 1, 4, 1, 4, 1, 4, 1, 4, 1, 5, 3, 5, 254, 8, 5, 1, 5, 1, 5, 1, 5, 1,
    5, 1, 5, 1, 5, 1, 5, 1, 5, 5, 5, 264, 8, 5, 10, 5, 12, 5, 267, 9, 5, 1, 5, 1, 5, 1, 5, 1, 6, 1,
    6, 1, 6, 3, 6, 275, 8, 6, 1, 7, 3, 7, 278, 8, 7, 1, 7, 1, 7, 1, 7, 1, 7, 3, 7, 284, 8, 7, 1, 7,
    1, 7, 1, 7, 1, 7, 1, 7, 3, 7, 291, 8, 7, 1, 7, 1, 7, 5, 7, 295, 8, 7, 10, 7, 12, 7, 298, 9, 7,
    1, 7, 1, 7, 1, 7, 1, 8, 3, 8, 304, 8, 8, 1, 8, 1, 8, 1, 8, 1, 8, 3, 8, 310, 8, 8, 1, 8, 1, 8, 1,
    9, 3, 9, 315, 8, 9, 1, 9, 1, 9, 1, 9, 1, 9, 1, 9, 1, 9, 1, 9, 3, 9, 324, 8, 9, 1, 9, 1, 9, 1, 9,
    1, 9, 1, 9, 1, 10, 3, 10, 332, 8, 10, 1, 10, 1, 10, 1, 10, 1, 10, 1, 10, 1, 10, 3, 10, 340, 8,
    10, 1, 10, 1, 10, 3, 10, 344, 8, 10, 1, 10, 1, 10, 1, 10, 5, 10, 349, 8, 10, 10, 10, 12, 10,
    352, 9, 10, 1, 10, 1, 10, 1, 10, 1, 11, 1, 11, 1, 11, 1, 11, 3, 11, 361, 8, 11, 1, 12, 3, 12,
    364, 8, 12, 1, 12, 1, 12, 1, 12, 1, 12, 1, 12, 1, 12, 3, 12, 372, 8, 12, 1, 12, 1, 12, 3, 12,
    376, 8, 12, 1, 12, 1, 12, 5, 12, 380, 8, 12, 10, 12, 12, 12, 383, 9, 12, 1, 12, 1, 12, 1, 12, 1,
    13, 1, 13, 1, 13, 1, 13, 1, 13, 1, 13, 3, 13, 394, 8, 13, 1, 14, 1, 14, 1, 14, 1, 15, 1, 15, 1,
    16, 1, 16, 1, 16, 1, 16, 1, 16, 1, 16, 1, 16, 1, 16, 1, 16, 3, 16, 410, 8, 16, 1, 17, 3, 17,
    413, 8, 17, 1, 17, 1, 17, 1, 17, 1, 17, 1, 17, 1, 17, 1, 18, 3, 18, 422, 8, 18, 1, 18, 1, 18, 1,
    18, 1, 18, 1, 18, 1, 18, 1, 19, 3, 19, 431, 8, 19, 1, 19, 1, 19, 1, 19, 1, 19, 3, 19, 437, 8,
    19, 1, 19, 1, 19, 1, 19, 5, 19, 442, 8, 19, 10, 19, 12, 19, 445, 9, 19, 1, 19, 3, 19, 448, 8,
    19, 1, 19, 1, 19, 1, 19, 1, 20, 5, 20, 454, 8, 20, 10, 20, 12, 20, 457, 9, 20, 1, 21, 3, 21,
    460, 8, 21, 1, 21, 1, 21, 1, 21, 1, 21, 3, 21, 466, 8, 21, 1, 21, 1, 21, 5, 21, 470, 8, 21, 10,
    21, 12, 21, 473, 9, 21, 1, 22, 3, 22, 476, 8, 22, 1, 22, 1, 22, 3, 22, 480, 8, 22, 1, 22, 1, 22,
    5, 22, 484, 8, 22, 10, 22, 12, 22, 487, 9, 22, 1, 23, 3, 23, 490, 8, 23, 1, 23, 1, 23, 1, 23, 1,
    23, 3, 23, 496, 8, 23, 1, 23, 1, 23, 5, 23, 500, 8, 23, 10, 23, 12, 23, 503, 9, 23, 1, 23, 1,
    23, 1, 23, 1, 24, 3, 24, 509, 8, 24, 1, 24, 1, 24, 1, 24, 1, 24, 1, 24, 1, 24, 3, 24, 517, 8,
    24, 1, 24, 1, 24, 5, 24, 521, 8, 24, 10, 24, 12, 24, 524, 9, 24, 1, 24, 1, 24, 1, 24, 1, 25, 3,
    25, 530, 8, 25, 1, 25, 1, 25, 3, 25, 534, 8, 25, 1, 25, 1, 25, 1, 26, 3, 26, 539, 8, 26, 1, 26,
    1, 26, 1, 26, 3, 26, 544, 8, 26, 1, 26, 1, 26, 1, 26, 4, 26, 549, 8, 26, 11, 26, 12, 26, 550, 1,
    26, 1, 26, 1, 26, 1, 27, 5, 27, 557, 8, 27, 10, 27, 12, 27, 560, 9, 27, 1, 28, 3, 28, 563, 8,
    28, 1, 28, 1, 28, 1, 28, 1, 28, 1, 28, 1, 28, 3, 28, 571, 8, 28, 1, 28, 1, 28, 5, 28, 575, 8,
    28, 10, 28, 12, 28, 578, 9, 28, 1, 29, 3, 29, 581, 8, 29, 1, 29, 1, 29, 1, 29, 1, 29, 1, 29, 1,
    29, 3, 29, 589, 8, 29, 1, 29, 1, 29, 1, 30, 1, 30, 3, 30, 595, 8, 30, 1, 31, 3, 31, 598, 8, 31,
    1, 31, 1, 31, 1, 31, 1, 31, 1, 31, 1, 31, 1, 31, 1, 31, 1, 31, 3, 31, 609, 8, 31, 1, 31, 1, 31,
    1, 32, 1, 32, 1, 32, 3, 32, 616, 8, 32, 1, 32, 1, 32, 1, 33, 3, 33, 621, 8, 33, 1, 33, 1, 33, 1,
    33, 1, 33, 1, 33, 3, 33, 628, 8, 33, 1, 33, 1, 33, 1, 34, 3, 34, 633, 8, 34, 1, 34, 1, 34, 1,
    34, 1, 34, 3, 34, 639, 8, 34, 1, 34, 1, 34, 1, 34, 1, 34, 1, 34, 3, 34, 646, 8, 34, 1, 34, 1,
    34, 5, 34, 650, 8, 34, 10, 34, 12, 34, 653, 9, 34, 1, 34, 1, 34, 1, 34, 1, 35, 3, 35, 659, 8,
    35, 1, 35, 1, 35, 1, 35, 1, 35, 3, 35, 665, 8, 35, 1, 35, 1, 35, 1, 36, 3, 36, 670, 8, 36, 1,
    36, 1, 36, 1, 36, 1, 36, 3, 36, 676, 8, 36, 1, 36, 1, 36, 1, 36, 1, 36, 1, 36, 3, 36, 683, 8,
    36, 1, 36, 1, 36, 5, 36, 687, 8, 36, 10, 36, 12, 36, 690, 9, 36, 1, 36, 1, 36, 1, 36, 1, 36, 1,
    37, 3, 37, 697, 8, 37, 1, 37, 1, 37, 1, 37, 1, 37, 3, 37, 703, 8, 37, 1, 37, 1, 37, 1, 37, 1,
    37, 1, 37, 3, 37, 710, 8, 37, 1, 37, 1, 37, 5, 37, 714, 8, 37, 10, 37, 12, 37, 717, 9, 37, 1,
    37, 1, 37, 1, 37, 1, 38, 3, 38, 723, 8, 38, 1, 38, 1, 38, 1, 38, 1, 38, 1, 38, 1, 38, 3, 38,
    731, 8, 38, 1, 38, 1, 38, 1, 38, 1, 38, 1, 38, 1, 38, 1, 38, 3, 38, 740, 8, 38, 1, 38, 1, 38, 1,
    39, 3, 39, 745, 8, 39, 1, 39, 1, 39, 1, 39, 1, 39, 1, 39, 1, 39, 3, 39, 753, 8, 39, 1, 39, 1,
    39, 1, 39, 1, 39, 1, 39, 1, 39, 1, 39, 3, 39, 762, 8, 39, 1, 39, 1, 39, 1, 40, 1, 40, 1, 41, 1,
    41, 1, 42, 1, 42, 1, 42, 1, 42, 1, 42, 3, 42, 775, 8, 42, 1, 42, 1, 42, 5, 42, 779, 8, 42, 10,
    42, 12, 42, 782, 9, 42, 1, 43, 1, 43, 1, 44, 1, 44, 1, 45, 1, 45, 1, 45, 1, 45, 1, 45, 1, 45, 3,
    45, 794, 8, 45, 1, 46, 1, 46, 1, 46, 1, 46, 3, 46, 800, 8, 46, 1, 47, 1, 47, 1, 47, 5, 47, 805,
    8, 47, 10, 47, 12, 47, 808, 9, 47, 1, 48, 1, 48, 3, 48, 812, 8, 48, 1, 49, 1, 49, 1, 49, 5, 49,
    817, 8, 49, 10, 49, 12, 49, 820, 9, 49, 1, 50, 1, 50, 1, 50, 4, 50, 825, 8, 50, 11, 50, 12, 50,
    826, 1, 51, 1, 51, 1, 51, 5, 51, 832, 8, 51, 10, 51, 12, 51, 835, 9, 51, 1, 52, 1, 52, 1, 52, 1,
    52, 3, 52, 841, 8, 52, 1, 53, 1, 53, 1, 54, 1, 54, 1, 54, 1, 54, 1, 54, 3, 54, 850, 8, 54, 1,
    55, 1, 55, 1, 55, 1, 55, 1, 55, 1, 55, 3, 55, 858, 8, 55, 1, 56, 1, 56, 1, 57, 1, 57, 1, 57, 3,
    57, 865, 8, 57, 1, 58, 1, 58, 1, 59, 1, 59, 1, 60, 1, 60, 1, 60, 1, 60, 1, 61, 1, 61, 1, 61, 1,
    61, 1, 62, 1, 62, 1, 62, 1, 62, 1, 62, 3, 62, 884, 8, 62, 1, 62, 1, 62, 1, 62, 1, 62, 1, 62, 5,
    62, 891, 8, 62, 10, 62, 12, 62, 894, 9, 62, 1, 62, 1, 62, 1, 62, 5, 62, 899, 8, 62, 10, 62, 12,
    62, 902, 9, 62, 1, 63, 1, 63, 1, 63, 1, 63, 1, 63, 1, 63, 1, 63, 1, 63, 1, 63, 3, 63, 913, 8,
    63, 1, 63, 1, 63, 1, 63, 1, 63, 1, 63, 5, 63, 920, 8, 63, 10, 63, 12, 63, 923, 9, 63, 1, 64, 1,
    64, 3, 64, 927, 8, 64, 1, 65, 1, 65, 1, 66, 1, 66, 1, 66, 1, 66, 1, 67, 1, 67, 3, 67, 937, 8,
    67, 1, 68, 1, 68, 1, 68, 1, 69, 1, 69, 1, 69, 1, 70, 1, 70, 1, 70, 1, 70, 1, 71, 1, 71, 1, 71,
    1, 71, 1, 72, 1, 72, 1, 72, 1, 72, 1, 73, 1, 73, 1, 73, 1, 73, 1, 74, 1, 74, 1, 74, 5, 74, 964,
    8, 74, 10, 74, 12, 74, 967, 9, 74, 1, 75, 1, 75, 1, 75, 1, 75, 1, 76, 1, 76, 1, 76, 3, 76, 976,
    8, 76, 1, 76, 1, 76, 1, 77, 1, 77, 1, 78, 1, 78, 1, 78, 3, 78, 985, 8, 78, 1, 78, 1, 78, 1, 79,
    1, 79, 1, 79, 1, 79, 1, 80, 1, 80, 1, 80, 1, 80, 1, 80, 5, 80, 998, 8, 80, 10, 80, 12, 80, 1001,
    9, 80, 1, 80, 1, 80, 1, 81, 1, 81, 1, 81, 1, 81, 1, 81, 1, 81, 5, 81, 1011, 8, 81, 10, 81, 12,
    81, 1014, 9, 81, 1, 81, 1, 81, 1, 81, 1, 81, 1, 81, 1, 82, 1, 82, 1, 82, 1, 82, 1, 82, 4, 82,
    1026, 8, 82, 11, 82, 12, 82, 1027, 1, 82, 1, 82, 1, 83, 1, 83, 1, 83, 1, 83, 1, 83, 1, 84, 1,
    84, 1, 84, 0, 3, 84, 124, 126, 85, 0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30,
    32, 34, 36, 38, 40, 42, 44, 46, 48, 50, 52, 54, 56, 58, 60, 62, 64, 66, 68, 70, 72, 74, 76, 78,
    80, 82, 84, 86, 88, 90, 92, 94, 96, 98, 100, 102, 104, 106, 108, 110, 112, 114, 116, 118, 120,
    122, 124, 126, 128, 130, 132, 134, 136, 138, 140, 142, 144, 146, 148, 150, 152, 154, 156, 158,
    160, 162, 164, 166, 168, 0, 3, 1, 0, 60, 61, 1, 0, 101, 102, 4, 0, 62, 63, 65, 67, 69, 69, 83,
    90, 1114, 0, 171, 1, 0, 0, 0, 2, 199, 1, 0, 0, 0, 4, 202, 1, 0, 0, 0, 6, 221, 1, 0, 0, 0, 8,
    226, 1, 0, 0, 0, 10, 253, 1, 0, 0, 0, 12, 274, 1, 0, 0, 0, 14, 277, 1, 0, 0, 0, 16, 303, 1, 0,
    0, 0, 18, 314, 1, 0, 0, 0, 20, 331, 1, 0, 0, 0, 22, 360, 1, 0, 0, 0, 24, 363, 1, 0, 0, 0, 26,
    393, 1, 0, 0, 0, 28, 395, 1, 0, 0, 0, 30, 398, 1, 0, 0, 0, 32, 409, 1, 0, 0, 0, 34, 412, 1, 0,
    0, 0, 36, 421, 1, 0, 0, 0, 38, 430, 1, 0, 0, 0, 40, 455, 1, 0, 0, 0, 42, 459, 1, 0, 0, 0, 44,
    475, 1, 0, 0, 0, 46, 489, 1, 0, 0, 0, 48, 508, 1, 0, 0, 0, 50, 529, 1, 0, 0, 0, 52, 538, 1, 0,
    0, 0, 54, 558, 1, 0, 0, 0, 56, 562, 1, 0, 0, 0, 58, 580, 1, 0, 0, 0, 60, 594, 1, 0, 0, 0, 62,
    597, 1, 0, 0, 0, 64, 612, 1, 0, 0, 0, 66, 620, 1, 0, 0, 0, 68, 632, 1, 0, 0, 0, 70, 658, 1, 0,
    0, 0, 72, 669, 1, 0, 0, 0, 74, 696, 1, 0, 0, 0, 76, 722, 1, 0, 0, 0, 78, 744, 1, 0, 0, 0, 80,
    765, 1, 0, 0, 0, 82, 767, 1, 0, 0, 0, 84, 774, 1, 0, 0, 0, 86, 783, 1, 0, 0, 0, 88, 785, 1, 0,
    0, 0, 90, 793, 1, 0, 0, 0, 92, 799, 1, 0, 0, 0, 94, 801, 1, 0, 0, 0, 96, 811, 1, 0, 0, 0, 98,
    813, 1, 0, 0, 0, 100, 821, 1, 0, 0, 0, 102, 828, 1, 0, 0, 0, 104, 840, 1, 0, 0, 0, 106, 842, 1,
    0, 0, 0, 108, 849, 1, 0, 0, 0, 110, 857, 1, 0, 0, 0, 112, 859, 1, 0, 0, 0, 114, 864, 1, 0, 0, 0,
    116, 866, 1, 0, 0, 0, 118, 868, 1, 0, 0, 0, 120, 870, 1, 0, 0, 0, 122, 874, 1, 0, 0, 0, 124,
    883, 1, 0, 0, 0, 126, 912, 1, 0, 0, 0, 128, 926, 1, 0, 0, 0, 130, 928, 1, 0, 0, 0, 132, 930, 1,
    0, 0, 0, 134, 936, 1, 0, 0, 0, 136, 938, 1, 0, 0, 0, 138, 941, 1, 0, 0, 0, 140, 944, 1, 0, 0, 0,
    142, 948, 1, 0, 0, 0, 144, 952, 1, 0, 0, 0, 146, 956, 1, 0, 0, 0, 148, 960, 1, 0, 0, 0, 150,
    968, 1, 0, 0, 0, 152, 972, 1, 0, 0, 0, 154, 979, 1, 0, 0, 0, 156, 981, 1, 0, 0, 0, 158, 988, 1,
    0, 0, 0, 160, 992, 1, 0, 0, 0, 162, 1004, 1, 0, 0, 0, 164, 1020, 1, 0, 0, 0, 166, 1031, 1, 0, 0,
    0, 168, 1036, 1, 0, 0, 0, 170, 172, 3, 28, 14, 0, 171, 170, 1, 0, 0, 0, 171, 172, 1, 0, 0, 0,
    172, 176, 1, 0, 0, 0, 173, 175, 3, 2, 1, 0, 174, 173, 1, 0, 0, 0, 175, 178, 1, 0, 0, 0, 176,
    174, 1, 0, 0, 0, 176, 177, 1, 0, 0, 0, 177, 180, 1, 0, 0, 0, 178, 176, 1, 0, 0, 0, 179, 181, 3,
    6, 3, 0, 180, 179, 1, 0, 0, 0, 180, 181, 1, 0, 0, 0, 181, 185, 1, 0, 0, 0, 182, 184, 5, 93, 0,
    0, 183, 182, 1, 0, 0, 0, 184, 187, 1, 0, 0, 0, 185, 183, 1, 0, 0, 0, 185, 186, 1, 0, 0, 0, 186,
    188, 1, 0, 0, 0, 187, 185, 1, 0, 0, 0, 188, 189, 5, 0, 0, 1, 189, 1, 1, 0, 0, 0, 190, 200, 3, 4,
    2, 0, 191, 200, 3, 8, 4, 0, 192, 200, 3, 10, 5, 0, 193, 200, 3, 14, 7, 0, 194, 200, 3, 16, 8, 0,
    195, 200, 3, 18, 9, 0, 196, 200, 3, 20, 10, 0, 197, 200, 3, 24, 12, 0, 198, 200, 3, 28, 14, 0,
    199, 190, 1, 0, 0, 0, 199, 191, 1, 0, 0, 0, 199, 192, 1, 0, 0, 0, 199, 193, 1, 0, 0, 0, 199,
    194, 1, 0, 0, 0, 199, 195, 1, 0, 0, 0, 199, 196, 1, 0, 0, 0, 199, 197, 1, 0, 0, 0, 199, 198, 1,
    0, 0, 0, 200, 3, 1, 0, 0, 0, 201, 203, 5, 105, 0, 0, 202, 201, 1, 0, 0, 0, 202, 203, 1, 0, 0, 0,
    203, 204, 1, 0, 0, 0, 204, 205, 5, 45, 0, 0, 205, 206, 5, 10, 0, 0, 206, 207, 5, 78, 0, 0, 207,
    208, 5, 79, 0, 0, 208, 209, 5, 68, 0, 0, 209, 210, 5, 48, 0, 0, 210, 211, 5, 82, 0, 0, 211, 215,
    5, 93, 0, 0, 212, 214, 3, 32, 16, 0, 213, 212, 1, 0, 0, 0, 214, 217, 1, 0, 0, 0, 215, 213, 1, 0,
    0, 0, 215, 216, 1, 0, 0, 0, 216, 218, 1, 0, 0, 0, 217, 215, 1, 0, 0, 0, 218, 219, 5, 106, 0, 0,
    219, 220, 5, 93, 0, 0, 220, 5, 1, 0, 0, 0, 221, 222, 5, 10, 0, 0, 222, 223, 5, 78, 0, 0, 223,
    224, 5, 79, 0, 0, 224, 7, 1, 0, 0, 0, 225, 227, 5, 105, 0, 0, 226, 225, 1, 0, 0, 0, 226, 227, 1,
    0, 0, 0, 227, 228, 1, 0, 0, 0, 228, 229, 5, 45, 0, 0, 229, 230, 3, 86, 43, 0, 230, 232, 5, 78,
    0, 0, 231, 233, 3, 98, 49, 0, 232, 231, 1, 0, 0, 0, 232, 233, 1, 0, 0, 0, 233, 234, 1, 0, 0, 0,
    234, 235, 5, 79, 0, 0, 235, 236, 5, 68, 0, 0, 236, 237, 3, 104, 52, 0, 237, 239, 5, 82, 0, 0,
    238, 240, 3, 30, 15, 0, 239, 238, 1, 0, 0, 0, 239, 240, 1, 0, 0, 0, 240, 241, 1, 0, 0, 0, 241,
    245, 5, 93, 0, 0, 242, 244, 3, 32, 16, 0, 243, 242, 1, 0, 0, 0, 244, 247, 1, 0, 0, 0, 245, 243,
    1, 0, 0, 0, 245, 246, 1, 0, 0, 0, 246, 248, 1, 0, 0, 0, 247, 245, 1, 0, 0, 0, 248, 249, 3, 64,
    32, 0, 249, 250, 5, 107, 0, 0, 250, 251, 5, 93, 0, 0, 251, 9, 1, 0, 0, 0, 252, 254, 5, 105, 0,
    0, 253, 252, 1, 0, 0, 0, 253, 254, 1, 0, 0, 0, 254, 255, 1, 0, 0, 0, 255, 256, 5, 1, 0, 0, 256,
    257, 3, 88, 44, 0, 257, 258, 5, 78, 0, 0, 258, 259, 5, 52, 0, 0, 259, 260, 5, 79, 0, 0, 260,
    261, 5, 122, 0, 0, 261, 265, 5, 93, 0, 0, 262, 264, 3, 12, 6, 0, 263, 262, 1, 0, 0, 0, 264, 267,
    1, 0, 0, 0, 265, 263, 1, 0, 0, 0, 265, 266, 1, 0, 0, 0, 266, 268, 1, 0, 0, 0, 267, 265, 1, 0, 0,
    0, 268, 269, 5, 108, 0, 0, 269, 270, 5, 93, 0, 0, 270, 11, 1, 0, 0, 0, 271, 275, 3, 62, 31, 0,
    272, 275, 3, 34, 17, 0, 273, 275, 3, 28, 14, 0, 274, 271, 1, 0, 0, 0, 274, 272, 1, 0, 0, 0, 274,
    273, 1, 0, 0, 0, 275, 13, 1, 0, 0, 0, 276, 278, 5, 105, 0, 0, 277, 276, 1, 0, 0, 0, 277, 278, 1,
    0, 0, 0, 278, 279, 1, 0, 0, 0, 279, 280, 5, 45, 0, 0, 280, 281, 3, 86, 43, 0, 281, 283, 5, 78,
    0, 0, 282, 284, 3, 98, 49, 0, 283, 282, 1, 0, 0, 0, 283, 284, 1, 0, 0, 0, 284, 285, 1, 0, 0, 0,
    285, 286, 5, 79, 0, 0, 286, 287, 5, 68, 0, 0, 287, 288, 5, 48, 0, 0, 288, 290, 5, 82, 0, 0, 289,
    291, 3, 30, 15, 0, 290, 289, 1, 0, 0, 0, 290, 291, 1, 0, 0, 0, 291, 292, 1, 0, 0, 0, 292, 296,
    5, 93, 0, 0, 293, 295, 3, 32, 16, 0, 294, 293, 1, 0, 0, 0, 295, 298, 1, 0, 0, 0, 296, 294, 1, 0,
    0, 0, 296, 297, 1, 0, 0, 0, 297, 299, 1, 0, 0, 0, 298, 296, 1, 0, 0, 0, 299, 300, 5, 109, 0, 0,
    300, 301, 5, 93, 0, 0, 301, 15, 1, 0, 0, 0, 302, 304, 5, 105, 0, 0, 303, 302, 1, 0, 0, 0, 303,
    304, 1, 0, 0, 0, 304, 305, 1, 0, 0, 0, 305, 306, 3, 80, 40, 0, 306, 307, 5, 73, 0, 0, 307, 309,
    3, 92, 46, 0, 308, 310, 3, 30, 15, 0, 309, 308, 1, 0, 0, 0, 309, 310, 1, 0, 0, 0, 310, 311, 1,
    0, 0, 0, 311, 312, 5, 93, 0, 0, 312, 17, 1, 0, 0, 0, 313, 315, 5, 105, 0, 0, 314, 313, 1, 0, 0,
    0, 314, 315, 1, 0, 0, 0, 315, 316, 1, 0, 0, 0, 316, 317, 5, 1, 0, 0, 317, 318, 3, 90, 45, 0,
    318, 319, 5, 78, 0, 0, 319, 320, 5, 4, 0, 0, 320, 321, 5, 79, 0, 0, 321, 323, 5, 82, 0, 0, 322,
    324, 3, 30, 15, 0, 323, 322, 1, 0, 0, 0, 323, 324, 1, 0, 0, 0, 324, 325, 1, 0, 0, 0, 325, 326,
    5, 93, 0, 0, 326, 327, 3, 100, 50, 0, 327, 328, 5, 110, 0, 0, 328, 329, 5, 93, 0, 0, 329, 19, 1,
    0, 0, 0, 330, 332, 5, 105, 0, 0, 331, 330, 1, 0, 0, 0, 331, 332, 1, 0, 0, 0, 332, 333, 1, 0, 0,
    0, 333, 334, 5, 1, 0, 0, 334, 339, 3, 90, 45, 0, 335, 336, 5, 78, 0, 0, 336, 337, 3, 90, 45, 0,
    337, 338, 5, 79, 0, 0, 338, 340, 1, 0, 0, 0, 339, 335, 1, 0, 0, 0, 339, 340, 1, 0, 0, 0, 340,
    341, 1, 0, 0, 0, 341, 343, 5, 82, 0, 0, 342, 344, 3, 30, 15, 0, 343, 342, 1, 0, 0, 0, 343, 344,
    1, 0, 0, 0, 344, 345, 1, 0, 0, 0, 345, 346, 5, 93, 0, 0, 346, 350, 3, 68, 34, 0, 347, 349, 3,
    22, 11, 0, 348, 347, 1, 0, 0, 0, 349, 352, 1, 0, 0, 0, 350, 348, 1, 0, 0, 0, 350, 351, 1, 0, 0,
    0, 351, 353, 1, 0, 0, 0, 352, 350, 1, 0, 0, 0, 353, 354, 5, 111, 0, 0, 354, 355, 5, 93, 0, 0,
    355, 21, 1, 0, 0, 0, 356, 361, 3, 70, 35, 0, 357, 361, 3, 72, 36, 0, 358, 361, 3, 74, 37, 0,
    359, 361, 3, 28, 14, 0, 360, 356, 1, 0, 0, 0, 360, 357, 1, 0, 0, 0, 360, 358, 1, 0, 0, 0, 360,
    359, 1, 0, 0, 0, 361, 23, 1, 0, 0, 0, 362, 364, 5, 105, 0, 0, 363, 362, 1, 0, 0, 0, 363, 364, 1,
    0, 0, 0, 364, 365, 1, 0, 0, 0, 365, 366, 5, 1, 0, 0, 366, 371, 3, 90, 45, 0, 367, 368, 5, 78, 0,
    0, 368, 372, 3, 90, 45, 0, 369, 370, 5, 51, 0, 0, 370, 372, 5, 79, 0, 0, 371, 367, 1, 0, 0, 0,
    371, 369, 1, 0, 0, 0, 372, 373, 1, 0, 0, 0, 373, 375, 5, 82, 0, 0, 374, 376, 3, 30, 15, 0, 375,
    374, 1, 0, 0, 0, 375, 376, 1, 0, 0, 0, 376, 377, 1, 0, 0, 0, 377, 381, 5, 93, 0, 0, 378, 380, 3,
    26, 13, 0, 379, 378, 1, 0, 0, 0, 380, 383, 1, 0, 0, 0, 381, 379, 1, 0, 0, 0, 381, 382, 1, 0, 0,
    0, 382, 384, 1, 0, 0, 0, 383, 381, 1, 0, 0, 0, 384, 385, 5, 111, 0, 0, 385, 386, 5, 93, 0, 0,
    386, 25, 1, 0, 0, 0, 387, 394, 3, 70, 35, 0, 388, 394, 3, 72, 36, 0, 389, 394, 3, 74, 37, 0,
    390, 394, 3, 76, 38, 0, 391, 394, 3, 78, 39, 0, 392, 394, 3, 28, 14, 0, 393, 387, 1, 0, 0, 0,
    393, 388, 1, 0, 0, 0, 393, 389, 1, 0, 0, 0, 393, 390, 1, 0, 0, 0, 393, 391, 1, 0, 0, 0, 393,
    392, 1, 0, 0, 0, 394, 27, 1, 0, 0, 0, 395, 396, 3, 30, 15, 0, 396, 397, 5, 93, 0, 0, 397, 29, 1,
    0, 0, 0, 398, 399, 5, 122, 0, 0, 399, 31, 1, 0, 0, 0, 400, 410, 3, 34, 17, 0, 401, 410, 3, 36,
    18, 0, 402, 410, 3, 38, 19, 0, 403, 410, 3, 46, 23, 0, 404, 410, 3, 48, 24, 0, 405, 410, 3, 50,
    25, 0, 406, 410, 3, 52, 26, 0, 407, 410, 3, 58, 29, 0, 408, 410, 3, 28, 14, 0, 409, 400, 1, 0,
    0, 0, 409, 401, 1, 0, 0, 0, 409, 402, 1, 0, 0, 0, 409, 403, 1, 0, 0, 0, 409, 404, 1, 0, 0, 0,
    409, 405, 1, 0, 0, 0, 409, 406, 1, 0, 0, 0, 409, 407, 1, 0, 0, 0, 409, 408, 1, 0, 0, 0, 410, 33,
    1, 0, 0, 0, 411, 413, 5, 105, 0, 0, 412, 411, 1, 0, 0, 0, 412, 413, 1, 0, 0, 0, 413, 414, 1, 0,
    0, 0, 414, 415, 3, 80, 40, 0, 415, 416, 5, 73, 0, 0, 416, 417, 3, 124, 62, 0, 417, 418, 5, 120,
    0, 0, 418, 419, 5, 93, 0, 0, 419, 35, 1, 0, 0, 0, 420, 422, 5, 105, 0, 0, 421, 420, 1, 0, 0, 0,
    421, 422, 1, 0, 0, 0, 422, 423, 1, 0, 0, 0, 423, 424, 3, 84, 42, 0, 424, 425, 5, 73, 0, 0, 425,
    426, 3, 124, 62, 0, 426, 427, 5, 119, 0, 0, 427, 428, 5, 93, 0, 0, 428, 37, 1, 0, 0, 0, 429,
    431, 5, 105, 0, 0, 430, 429, 1, 0, 0, 0, 430, 431, 1, 0, 0, 0, 431, 432, 1, 0, 0, 0, 432, 433,
    5, 6, 0, 0, 433, 434, 3, 124, 62, 0, 434, 436, 5, 39, 0, 0, 435, 437, 3, 30, 15, 0, 436, 435, 1,
    0, 0, 0, 436, 437, 1, 0, 0, 0, 437, 438, 1, 0, 0, 0, 438, 439, 5, 93, 0, 0, 439, 443, 3, 40, 20,
    0, 440, 442, 3, 42, 21, 0, 441, 440, 1, 0, 0, 0, 442, 445, 1, 0, 0, 0, 443, 441, 1, 0, 0, 0,
    443, 444, 1, 0, 0, 0, 444, 447, 1, 0, 0, 0, 445, 443, 1, 0, 0, 0, 446, 448, 3, 44, 22, 0, 447,
    446, 1, 0, 0, 0, 447, 448, 1, 0, 0, 0, 448, 449, 1, 0, 0, 0, 449, 450, 5, 112, 0, 0, 450, 451,
    5, 93, 0, 0, 451, 39, 1, 0, 0, 0, 452, 454, 3, 32, 16, 0, 453, 452, 1, 0, 0, 0, 454, 457, 1, 0,
    0, 0, 455, 453, 1, 0, 0, 0, 455, 456, 1, 0, 0, 0, 456, 41, 1, 0, 0, 0, 457, 455, 1, 0, 0, 0,
    458, 460, 5, 105, 0, 0, 459, 458, 1, 0, 0, 0, 459, 460, 1, 0, 0, 0, 460, 461, 1, 0, 0, 0, 461,
    462, 5, 2, 0, 0, 462, 463, 3, 124, 62, 0, 463, 465, 5, 39, 0, 0, 464, 466, 3, 30, 15, 0, 465,
    464, 1, 0, 0, 0, 465, 466, 1, 0, 0, 0, 466, 467, 1, 0, 0, 0, 467, 471, 5, 93, 0, 0, 468, 470, 3,
    32, 16, 0, 469, 468, 1, 0, 0, 0, 470, 473, 1, 0, 0, 0, 471, 469, 1, 0, 0, 0, 471, 472, 1, 0, 0,
    0, 472, 43, 1, 0, 0, 0, 473, 471, 1, 0, 0, 0, 474, 476, 5, 105, 0, 0, 475, 474, 1, 0, 0, 0, 475,
    476, 1, 0, 0, 0, 476, 477, 1, 0, 0, 0, 477, 479, 5, 3, 0, 0, 478, 480, 3, 30, 15, 0, 479, 478,
    1, 0, 0, 0, 479, 480, 1, 0, 0, 0, 480, 481, 1, 0, 0, 0, 481, 485, 5, 93, 0, 0, 482, 484, 3, 32,
    16, 0, 483, 482, 1, 0, 0, 0, 484, 487, 1, 0, 0, 0, 485, 483, 1, 0, 0, 0, 485, 486, 1, 0, 0, 0,
    486, 45, 1, 0, 0, 0, 487, 485, 1, 0, 0, 0, 488, 490, 5, 105, 0, 0, 489, 488, 1, 0, 0, 0, 489,
    490, 1, 0, 0, 0, 490, 491, 1, 0, 0, 0, 491, 492, 5, 13, 0, 0, 492, 493, 3, 124, 62, 0, 493, 495,
    5, 82, 0, 0, 494, 496, 3, 30, 15, 0, 495, 494, 1, 0, 0, 0, 495, 496, 1, 0, 0, 0, 496, 497, 1, 0,
    0, 0, 497, 501, 5, 93, 0, 0, 498, 500, 3, 32, 16, 0, 499, 498, 1, 0, 0, 0, 500, 503, 1, 0, 0, 0,
    501, 499, 1, 0, 0, 0, 501, 502, 1, 0, 0, 0, 502, 504, 1, 0, 0, 0, 503, 501, 1, 0, 0, 0, 504,
    505, 5, 113, 0, 0, 505, 506, 5, 93, 0, 0, 506, 47, 1, 0, 0, 0, 507, 509, 5, 105, 0, 0, 508, 507,
    1, 0, 0, 0, 508, 509, 1, 0, 0, 0, 509, 510, 1, 0, 0, 0, 510, 511, 5, 5, 0, 0, 511, 512, 3, 80,
    40, 0, 512, 513, 5, 7, 0, 0, 513, 514, 3, 124, 62, 0, 514, 516, 5, 82, 0, 0, 515, 517, 3, 30,
    15, 0, 516, 515, 1, 0, 0, 0, 516, 517, 1, 0, 0, 0, 517, 518, 1, 0, 0, 0, 518, 522, 5, 93, 0, 0,
    519, 521, 3, 32, 16, 0, 520, 519, 1, 0, 0, 0, 521, 524, 1, 0, 0, 0, 522, 520, 1, 0, 0, 0, 522,
    523, 1, 0, 0, 0, 523, 525, 1, 0, 0, 0, 524, 522, 1, 0, 0, 0, 525, 526, 5, 114, 0, 0, 526, 527,
    5, 93, 0, 0, 527, 49, 1, 0, 0, 0, 528, 530, 5, 105, 0, 0, 529, 528, 1, 0, 0, 0, 529, 530, 1, 0,
    0, 0, 530, 531, 1, 0, 0, 0, 531, 533, 3, 126, 63, 0, 532, 534, 3, 30, 15, 0, 533, 532, 1, 0, 0,
    0, 533, 534, 1, 0, 0, 0, 534, 535, 1, 0, 0, 0, 535, 536, 5, 93, 0, 0, 536, 51, 1, 0, 0, 0, 537,
    539, 5, 105, 0, 0, 538, 537, 1, 0, 0, 0, 538, 539, 1, 0, 0, 0, 539, 540, 1, 0, 0, 0, 540, 541,
    5, 12, 0, 0, 541, 543, 5, 82, 0, 0, 542, 544, 3, 30, 15, 0, 543, 542, 1, 0, 0, 0, 543, 544, 1,
    0, 0, 0, 544, 545, 1, 0, 0, 0, 545, 546, 5, 93, 0, 0, 546, 548, 3, 54, 27, 0, 547, 549, 3, 56,
    28, 0, 548, 547, 1, 0, 0, 0, 549, 550, 1, 0, 0, 0, 550, 548, 1, 0, 0, 0, 550, 551, 1, 0, 0, 0,
    551, 552, 1, 0, 0, 0, 552, 553, 5, 115, 0, 0, 553, 554, 5, 93, 0, 0, 554, 53, 1, 0, 0, 0, 555,
    557, 3, 32, 16, 0, 556, 555, 1, 0, 0, 0, 557, 560, 1, 0, 0, 0, 558, 556, 1, 0, 0, 0, 558, 559,
    1, 0, 0, 0, 559, 55, 1, 0, 0, 0, 560, 558, 1, 0, 0, 0, 561, 563, 5, 105, 0, 0, 562, 561, 1, 0,
    0, 0, 562, 563, 1, 0, 0, 0, 563, 564, 1, 0, 0, 0, 564, 565, 5, 46, 0, 0, 565, 566, 3, 90, 45, 0,
    566, 567, 5, 44, 0, 0, 567, 568, 3, 80, 40, 0, 568, 570, 5, 82, 0, 0, 569, 571, 3, 30, 15, 0,
    570, 569, 1, 0, 0, 0, 570, 571, 1, 0, 0, 0, 571, 572, 1, 0, 0, 0, 572, 576, 5, 93, 0, 0, 573,
    575, 3, 32, 16, 0, 574, 573, 1, 0, 0, 0, 575, 578, 1, 0, 0, 0, 576, 574, 1, 0, 0, 0, 576, 577,
    1, 0, 0, 0, 577, 57, 1, 0, 0, 0, 578, 576, 1, 0, 0, 0, 579, 581, 5, 105, 0, 0, 580, 579, 1, 0,
    0, 0, 580, 581, 1, 0, 0, 0, 581, 582, 1, 0, 0, 0, 582, 583, 5, 50, 0, 0, 583, 584, 3, 90, 45, 0,
    584, 585, 5, 78, 0, 0, 585, 586, 3, 60, 30, 0, 586, 588, 5, 79, 0, 0, 587, 589, 3, 30, 15, 0,
    588, 587, 1, 0, 0, 0, 588, 589, 1, 0, 0, 0, 589, 590, 1, 0, 0, 0, 590, 591, 5, 93, 0, 0, 591,
    59, 1, 0, 0, 0, 592, 595, 3, 118, 59, 0, 593, 595, 3, 82, 41, 0, 594, 592, 1, 0, 0, 0, 594, 593,
    1, 0, 0, 0, 595, 61, 1, 0, 0, 0, 596, 598, 5, 105, 0, 0, 597, 596, 1, 0, 0, 0, 597, 598, 1, 0,
    0, 0, 598, 599, 1, 0, 0, 0, 599, 600, 5, 72, 0, 0, 600, 601, 5, 80, 0, 0, 601, 602, 5, 43, 0, 0,
    602, 603, 5, 78, 0, 0, 603, 604, 3, 106, 53, 0, 604, 605, 5, 81, 0, 0, 605, 606, 3, 108, 54, 0,
    606, 608, 5, 79, 0, 0, 607, 609, 3, 30, 15, 0, 608, 607, 1, 0, 0, 0, 608, 609, 1, 0, 0, 0, 609,
    610, 1, 0, 0, 0, 610, 611, 5, 93, 0, 0, 611, 63, 1, 0, 0, 0, 612, 613, 5, 11, 0, 0, 613, 615, 3,
    124, 62, 0, 614, 616, 3, 30, 15, 0, 615, 614, 1, 0, 0, 0, 615, 616, 1, 0, 0, 0, 616, 617, 1, 0,
    0, 0, 617, 618, 5, 93, 0, 0, 618, 65, 1, 0, 0, 0, 619, 621, 5, 105, 0, 0, 620, 619, 1, 0, 0, 0,
    620, 621, 1, 0, 0, 0, 621, 622, 1, 0, 0, 0, 622, 623, 5, 46, 0, 0, 623, 624, 3, 90, 45, 0, 624,
    625, 5, 44, 0, 0, 625, 627, 3, 80, 40, 0, 626, 628, 3, 30, 15, 0, 627, 626, 1, 0, 0, 0, 627,
    628, 1, 0, 0, 0, 628, 629, 1, 0, 0, 0, 629, 630, 5, 93, 0, 0, 630, 67, 1, 0, 0, 0, 631, 633, 5,
    105, 0, 0, 632, 631, 1, 0, 0, 0, 632, 633, 1, 0, 0, 0, 633, 634, 1, 0, 0, 0, 634, 635, 5, 45, 0,
    0, 635, 636, 5, 47, 0, 0, 636, 638, 5, 78, 0, 0, 637, 639, 3, 98, 49, 0, 638, 637, 1, 0, 0, 0,
    638, 639, 1, 0, 0, 0, 639, 640, 1, 0, 0, 0, 640, 641, 5, 79, 0, 0, 641, 642, 5, 68, 0, 0, 642,
    643, 5, 48, 0, 0, 643, 645, 5, 82, 0, 0, 644, 646, 3, 30, 15, 0, 645, 644, 1, 0, 0, 0, 645, 646,
    1, 0, 0, 0, 646, 647, 1, 0, 0, 0, 647, 651, 5, 93, 0, 0, 648, 650, 3, 32, 16, 0, 649, 648, 1, 0,
    0, 0, 650, 653, 1, 0, 0, 0, 651, 649, 1, 0, 0, 0, 651, 652, 1, 0, 0, 0, 652, 654, 1, 0, 0, 0,
    653, 651, 1, 0, 0, 0, 654, 655, 5, 116, 0, 0, 655, 656, 5, 93, 0, 0, 656, 69, 1, 0, 0, 0, 657,
    659, 5, 105, 0, 0, 658, 657, 1, 0, 0, 0, 658, 659, 1, 0, 0, 0, 659, 660, 1, 0, 0, 0, 660, 661,
    3, 80, 40, 0, 661, 662, 5, 82, 0, 0, 662, 664, 3, 104, 52, 0, 663, 665, 3, 30, 15, 0, 664, 663,
    1, 0, 0, 0, 664, 665, 1, 0, 0, 0, 665, 666, 1, 0, 0, 0, 666, 667, 5, 93, 0, 0, 667, 71, 1, 0, 0,
    0, 668, 670, 5, 105, 0, 0, 669, 668, 1, 0, 0, 0, 669, 670, 1, 0, 0, 0, 670, 671, 1, 0, 0, 0,
    671, 672, 5, 45, 0, 0, 672, 673, 3, 86, 43, 0, 673, 675, 5, 78, 0, 0, 674, 676, 3, 98, 49, 0,
    675, 674, 1, 0, 0, 0, 675, 676, 1, 0, 0, 0, 676, 677, 1, 0, 0, 0, 677, 678, 5, 79, 0, 0, 678,
    679, 5, 68, 0, 0, 679, 680, 3, 104, 52, 0, 680, 682, 5, 82, 0, 0, 681, 683, 3, 30, 15, 0, 682,
    681, 1, 0, 0, 0, 682, 683, 1, 0, 0, 0, 683, 684, 1, 0, 0, 0, 684, 688, 5, 93, 0, 0, 685, 687, 3,
    32, 16, 0, 686, 685, 1, 0, 0, 0, 687, 690, 1, 0, 0, 0, 688, 686, 1, 0, 0, 0, 688, 689, 1, 0, 0,
    0, 689, 691, 1, 0, 0, 0, 690, 688, 1, 0, 0, 0, 691, 692, 3, 64, 32, 0, 692, 693, 5, 117, 0, 0,
    693, 694, 5, 93, 0, 0, 694, 73, 1, 0, 0, 0, 695, 697, 5, 105, 0, 0, 696, 695, 1, 0, 0, 0, 696,
    697, 1, 0, 0, 0, 697, 698, 1, 0, 0, 0, 698, 699, 5, 45, 0, 0, 699, 700, 3, 86, 43, 0, 700, 702,
    5, 78, 0, 0, 701, 703, 3, 98, 49, 0, 702, 701, 1, 0, 0, 0, 702, 703, 1, 0, 0, 0, 703, 704, 1, 0,
    0, 0, 704, 705, 5, 79, 0, 0, 705, 706, 5, 68, 0, 0, 706, 707, 5, 48, 0, 0, 707, 709, 5, 82, 0,
    0, 708, 710, 3, 30, 15, 0, 709, 708, 1, 0, 0, 0, 709, 710, 1, 0, 0, 0, 710, 711, 1, 0, 0, 0,
    711, 715, 5, 93, 0, 0, 712, 714, 3, 32, 16, 0, 713, 712, 1, 0, 0, 0, 714, 717, 1, 0, 0, 0, 715,
    713, 1, 0, 0, 0, 715, 716, 1, 0, 0, 0, 716, 718, 1, 0, 0, 0, 717, 715, 1, 0, 0, 0, 718, 719, 5,
    118, 0, 0, 719, 720, 5, 93, 0, 0, 720, 75, 1, 0, 0, 0, 721, 723, 5, 105, 0, 0, 722, 721, 1, 0,
    0, 0, 722, 723, 1, 0, 0, 0, 723, 724, 1, 0, 0, 0, 724, 725, 5, 121, 0, 0, 725, 726, 5, 93, 0, 0,
    726, 727, 5, 45, 0, 0, 727, 728, 3, 86, 43, 0, 728, 730, 5, 78, 0, 0, 729, 731, 3, 98, 49, 0,
    730, 729, 1, 0, 0, 0, 730, 731, 1, 0, 0, 0, 731, 732, 1, 0, 0, 0, 732, 733, 5, 79, 0, 0, 733,
    734, 5, 68, 0, 0, 734, 735, 3, 104, 52, 0, 735, 736, 5, 82, 0, 0, 736, 737, 5, 93, 0, 0, 737,
    739, 5, 49, 0, 0, 738, 740, 3, 30, 15, 0, 739, 738, 1, 0, 0, 0, 739, 740, 1, 0, 0, 0, 740, 741,
    1, 0, 0, 0, 741, 742, 5, 93, 0, 0, 742, 77, 1, 0, 0, 0, 743, 745, 5, 105, 0, 0, 744, 743, 1, 0,
    0, 0, 744, 745, 1, 0, 0, 0, 745, 746, 1, 0, 0, 0, 746, 747, 5, 121, 0, 0, 747, 748, 5, 93, 0, 0,
    748, 749, 5, 45, 0, 0, 749, 750, 3, 86, 43, 0, 750, 752, 5, 78, 0, 0, 751, 753, 3, 98, 49, 0,
    752, 751, 1, 0, 0, 0, 752, 753, 1, 0, 0, 0, 753, 754, 1, 0, 0, 0, 754, 755, 5, 79, 0, 0, 755,
    756, 5, 68, 0, 0, 756, 757, 5, 48, 0, 0, 757, 758, 5, 82, 0, 0, 758, 759, 5, 93, 0, 0, 759, 761,
    5, 49, 0, 0, 760, 762, 3, 30, 15, 0, 761, 760, 1, 0, 0, 0, 761, 762, 1, 0, 0, 0, 762, 763, 1, 0,
    0, 0, 763, 764, 5, 93, 0, 0, 764, 79, 1, 0, 0, 0, 765, 766, 5, 95, 0, 0, 766, 81, 1, 0, 0, 0,
    767, 768, 5, 95, 0, 0, 768, 83, 1, 0, 0, 0, 769, 770, 6, 42, -1, 0, 770, 775, 3, 82, 41, 0, 771,
    772, 5, 72, 0, 0, 772, 773, 5, 80, 0, 0, 773, 775, 3, 82, 41, 0, 774, 769, 1, 0, 0, 0, 774, 771,
    1, 0, 0, 0, 775, 780, 1, 0, 0, 0, 776, 777, 10, 1, 0, 0, 777, 779, 3, 122, 61, 0, 778, 776, 1,
    0, 0, 0, 779, 782, 1, 0, 0, 0, 780, 778, 1, 0, 0, 0, 780, 781, 1, 0, 0, 0, 781, 85, 1, 0, 0, 0,
    782, 780, 1, 0, 0, 0, 783, 784, 5, 95, 0, 0, 784, 87, 1, 0, 0, 0, 785, 786, 5, 94, 0, 0, 786,
    89, 1, 0, 0, 0, 787, 794, 5, 54, 0, 0, 788, 794, 5, 55, 0, 0, 789, 794, 5, 56, 0, 0, 790, 794,
    5, 57, 0, 0, 791, 794, 5, 58, 0, 0, 792, 794, 5, 96, 0, 0, 793, 787, 1, 0, 0, 0, 793, 788, 1, 0,
    0, 0, 793, 789, 1, 0, 0, 0, 793, 790, 1, 0, 0, 0, 793, 791, 1, 0, 0, 0, 793, 792, 1, 0, 0, 0,
    794, 91, 1, 0, 0, 0, 795, 800, 3, 112, 56, 0, 796, 800, 3, 114, 57, 0, 797, 800, 3, 116, 58, 0,
    798, 800, 3, 118, 59, 0, 799, 795, 1, 0, 0, 0, 799, 796, 1, 0, 0, 0, 799, 797, 1, 0, 0, 0, 799,
    798, 1, 0, 0, 0, 800, 93, 1, 0, 0, 0, 801, 806, 3, 96, 48, 0, 802, 803, 5, 81, 0, 0, 803, 805,
    3, 96, 48, 0, 804, 802, 1, 0, 0, 0, 805, 808, 1, 0, 0, 0, 806, 804, 1, 0, 0, 0, 806, 807, 1, 0,
    0, 0, 807, 95, 1, 0, 0, 0, 808, 806, 1, 0, 0, 0, 809, 812, 3, 166, 83, 0, 810, 812, 3, 124, 62,
    0, 811, 809, 1, 0, 0, 0, 811, 810, 1, 0, 0, 0, 812, 97, 1, 0, 0, 0, 813, 818, 3, 158, 79, 0,
    814, 815, 5, 81, 0, 0, 815, 817, 3, 158, 79, 0, 816, 814, 1, 0, 0, 0, 817, 820, 1, 0, 0, 0, 818,
    816, 1, 0, 0, 0, 818, 819, 1, 0, 0, 0, 819, 99, 1, 0, 0, 0, 820, 818, 1, 0, 0, 0, 821, 824, 3,
    80, 40, 0, 822, 823, 5, 81, 0, 0, 823, 825, 3, 80, 40, 0, 824, 822, 1, 0, 0, 0, 825, 826, 1, 0,
    0, 0, 826, 824, 1, 0, 0, 0, 826, 827, 1, 0, 0, 0, 827, 101, 1, 0, 0, 0, 828, 833, 3, 124, 62, 0,
    829, 830, 5, 81, 0, 0, 830, 832, 3, 124, 62, 0, 831, 829, 1, 0, 0, 0, 832, 835, 1, 0, 0, 0, 833,
    831, 1, 0, 0, 0, 833, 834, 1, 0, 0, 0, 834, 103, 1, 0, 0, 0, 835, 833, 1, 0, 0, 0, 836, 841, 3,
    164, 82, 0, 837, 841, 3, 90, 45, 0, 838, 841, 3, 160, 80, 0, 839, 841, 3, 162, 81, 0, 840, 836,
    1, 0, 0, 0, 840, 837, 1, 0, 0, 0, 840, 838, 1, 0, 0, 0, 840, 839, 1, 0, 0, 0, 841, 105, 1, 0, 0,
    0, 842, 843, 3, 124, 62, 0, 843, 107, 1, 0, 0, 0, 844, 850, 3, 110, 55, 0, 845, 850, 3, 142, 71,
    0, 846, 850, 3, 146, 73, 0, 847, 850, 3, 134, 67, 0, 848, 850, 3, 144, 72, 0, 849, 844, 1, 0, 0,
    0, 849, 845, 1, 0, 0, 0, 849, 846, 1, 0, 0, 0, 849, 847, 1, 0, 0, 0, 849, 848, 1, 0, 0, 0, 850,
    109, 1, 0, 0, 0, 851, 858, 3, 112, 56, 0, 852, 858, 3, 114, 57, 0, 853, 858, 3, 116, 58, 0, 854,
    858, 3, 118, 59, 0, 855, 858, 3, 168, 84, 0, 856, 858, 3, 120, 60, 0, 857, 851, 1, 0, 0, 0, 857,
    852, 1, 0, 0, 0, 857, 853, 1, 0, 0, 0, 857, 854, 1, 0, 0, 0, 857, 855, 1, 0, 0, 0, 857, 856, 1,
    0, 0, 0, 858, 111, 1, 0, 0, 0, 859, 860, 7, 0, 0, 0, 860, 113, 1, 0, 0, 0, 861, 865, 5, 99, 0,
    0, 862, 865, 5, 97, 0, 0, 863, 865, 5, 98, 0, 0, 864, 861, 1, 0, 0, 0, 864, 862, 1, 0, 0, 0,
    864, 863, 1, 0, 0, 0, 865, 115, 1, 0, 0, 0, 866, 867, 5, 100, 0, 0, 867, 117, 1, 0, 0, 0, 868,
    869, 7, 1, 0, 0, 869, 119, 1, 0, 0, 0, 870, 871, 3, 90, 45, 0, 871, 872, 5, 80, 0, 0, 872, 873,
    3, 82, 41, 0, 873, 121, 1, 0, 0, 0, 874, 875, 5, 76, 0, 0, 875, 876, 3, 124, 62, 0, 876, 877, 5,
    77, 0, 0, 877, 123, 1, 0, 0, 0, 878, 879, 6, 62, -1, 0, 879, 884, 3, 156, 78, 0, 880, 884, 3,
    134, 67, 0, 881, 884, 3, 126, 63, 0, 882, 884, 3, 140, 70, 0, 883, 878, 1, 0, 0, 0, 883, 880, 1,
    0, 0, 0, 883, 881, 1, 0, 0, 0, 883, 882, 1, 0, 0, 0, 884, 900, 1, 0, 0, 0, 885, 886, 10, 1, 0,
    0, 886, 887, 5, 6, 0, 0, 887, 892, 3, 124, 62, 0, 888, 889, 5, 2, 0, 0, 889, 891, 3, 124, 62, 0,
    890, 888, 1, 0, 0, 0, 891, 894, 1, 0, 0, 0, 892, 890, 1, 0, 0, 0, 892, 893, 1, 0, 0, 0, 893,
    895, 1, 0, 0, 0, 894, 892, 1, 0, 0, 0, 895, 896, 5, 3, 0, 0, 896, 897, 3, 124, 62, 2, 897, 899,
    1, 0, 0, 0, 898, 885, 1, 0, 0, 0, 899, 902, 1, 0, 0, 0, 900, 898, 1, 0, 0, 0, 900, 901, 1, 0, 0,
    0, 901, 125, 1, 0, 0, 0, 902, 900, 1, 0, 0, 0, 903, 904, 6, 63, -1, 0, 904, 913, 3, 130, 65, 0,
    905, 913, 3, 132, 66, 0, 906, 913, 3, 110, 55, 0, 907, 913, 3, 142, 71, 0, 908, 913, 3, 146, 73,
    0, 909, 913, 3, 144, 72, 0, 910, 913, 3, 82, 41, 0, 911, 913, 3, 152, 76, 0, 912, 903, 1, 0, 0,
    0, 912, 905, 1, 0, 0, 0, 912, 906, 1, 0, 0, 0, 912, 907, 1, 0, 0, 0, 912, 908, 1, 0, 0, 0, 912,
    909, 1, 0, 0, 0, 912, 910, 1, 0, 0, 0, 912, 911, 1, 0, 0, 0, 913, 921, 1, 0, 0, 0, 914, 915, 10,
    2, 0, 0, 915, 920, 3, 122, 61, 0, 916, 917, 10, 1, 0, 0, 917, 918, 5, 80, 0, 0, 918, 920, 3,
    128, 64, 0, 919, 914, 1, 0, 0, 0, 919, 916, 1, 0, 0, 0, 920, 923, 1, 0, 0, 0, 921, 919, 1, 0, 0,
    0, 921, 922, 1, 0, 0, 0, 922, 127, 1, 0, 0, 0, 923, 921, 1, 0, 0, 0, 924, 927, 3, 82, 41, 0,
    925, 927, 3, 152, 76, 0, 926, 924, 1, 0, 0, 0, 926, 925, 1, 0, 0, 0, 927, 129, 1, 0, 0, 0, 928,
    929, 5, 72, 0, 0, 929, 131, 1, 0, 0, 0, 930, 931, 5, 78, 0, 0, 931, 932, 3, 124, 62, 0, 932,
    933, 5, 79, 0, 0, 933, 133, 1, 0, 0, 0, 934, 937, 3, 136, 68, 0, 935, 937, 3, 138, 69, 0, 936,
    934, 1, 0, 0, 0, 936, 935, 1, 0, 0, 0, 937, 135, 1, 0, 0, 0, 938, 939, 5, 84, 0, 0, 939, 940, 3,
    126, 63, 0, 940, 137, 1, 0, 0, 0, 941, 942, 5, 64, 0, 0, 942, 943, 3, 126, 63, 0, 943, 139, 1,
    0, 0, 0, 944, 945, 3, 126, 63, 0, 945, 946, 3, 154, 77, 0, 946, 947, 3, 124, 62, 0, 947, 141, 1,
    0, 0, 0, 948, 949, 5, 76, 0, 0, 949, 950, 3, 102, 51, 0, 950, 951, 5, 77, 0, 0, 951, 143, 1, 0,
    0, 0, 952, 953, 5, 78, 0, 0, 953, 954, 3, 102, 51, 0, 954, 955, 5, 79, 0, 0, 955, 145, 1, 0, 0,
    0, 956, 957, 5, 74, 0, 0, 957, 958, 3, 148, 74, 0, 958, 959, 5, 75, 0, 0, 959, 147, 1, 0, 0, 0,
    960, 965, 3, 150, 75, 0, 961, 962, 5, 81, 0, 0, 962, 964, 3, 150, 75, 0, 963, 961, 1, 0, 0, 0,
    964, 967, 1, 0, 0, 0, 965, 963, 1, 0, 0, 0, 965, 966, 1, 0, 0, 0, 966, 149, 1, 0, 0, 0, 967,
    965, 1, 0, 0, 0, 968, 969, 3, 124, 62, 0, 969, 970, 5, 82, 0, 0, 970, 971, 3, 124, 62, 0, 971,
    151, 1, 0, 0, 0, 972, 973, 3, 86, 43, 0, 973, 975, 5, 78, 0, 0, 974, 976, 3, 94, 47, 0, 975,
    974, 1, 0, 0, 0, 975, 976, 1, 0, 0, 0, 976, 977, 1, 0, 0, 0, 977, 978, 5, 79, 0, 0, 978, 153, 1,
    0, 0, 0, 979, 980, 7, 2, 0, 0, 980, 155, 1, 0, 0, 0, 981, 982, 3, 104, 52, 0, 982, 984, 5, 78,
    0, 0, 983, 985, 3, 94, 47, 0, 984, 983, 1, 0, 0, 0, 984, 985, 1, 0, 0, 0, 985, 986, 1, 0, 0, 0,
    986, 987, 5, 79, 0, 0, 987, 157, 1, 0, 0, 0, 988, 989, 3, 80, 40, 0, 989, 990, 5, 82, 0, 0, 990,
    991, 3, 104, 52, 0, 991, 159, 1, 0, 0, 0, 992, 993, 3, 90, 45, 0, 993, 994, 5, 76, 0, 0, 994,
    999, 3, 104, 52, 0, 995, 996, 5, 81, 0, 0, 996, 998, 3, 104, 52, 0, 997, 995, 1, 0, 0, 0, 998,
    1001, 1, 0, 0, 0, 999, 997, 1, 0, 0, 0, 999, 1000, 1, 0, 0, 0, 1000, 1002, 1, 0, 0, 0, 1001,
    999, 1, 0, 0, 0, 1002, 1003, 5, 77, 0, 0, 1003, 161, 1, 0, 0, 0, 1004, 1005, 5, 59, 0, 0, 1005,
    1006, 5, 76, 0, 0, 1006, 1007, 5, 76, 0, 0, 1007, 1012, 3, 104, 52, 0, 1008, 1009, 5, 81, 0, 0,
    1009, 1011, 3, 104, 52, 0, 1010, 1008, 1, 0, 0, 0, 1011, 1014, 1, 0, 0, 0, 1012, 1010, 1, 0, 0,
    0, 1012, 1013, 1, 0, 0, 0, 1013, 1015, 1, 0, 0, 0, 1014, 1012, 1, 0, 0, 0, 1015, 1016, 5, 77, 0,
    0, 1016, 1017, 5, 81, 0, 0, 1017, 1018, 3, 104, 52, 0, 1018, 1019, 5, 77, 0, 0, 1019, 163, 1, 0,
    0, 0, 1020, 1021, 5, 53, 0, 0, 1021, 1022, 5, 76, 0, 0, 1022, 1025, 3, 104, 52, 0, 1023, 1024,
    5, 81, 0, 0, 1024, 1026, 3, 104, 52, 0, 1025, 1023, 1, 0, 0, 0, 1026, 1027, 1, 0, 0, 0, 1027,
    1025, 1, 0, 0, 0, 1027, 1028, 1, 0, 0, 0, 1028, 1029, 1, 0, 0, 0, 1029, 1030, 5, 77, 0, 0, 1030,
    165, 1, 0, 0, 0, 1031, 1032, 5, 9, 0, 0, 1032, 1033, 3, 98, 49, 0, 1033, 1034, 5, 82, 0, 0,
    1034, 1035, 3, 124, 62, 0, 1035, 167, 1, 0, 0, 0, 1036, 1037, 5, 102, 0, 0, 1037, 169, 1, 0, 0,
    0, 116, 171, 176, 180, 185, 199, 202, 215, 226, 232, 239, 245, 253, 265, 274, 277, 283, 290,
    296, 303, 309, 314, 323, 331, 339, 343, 350, 360, 363, 371, 375, 381, 393, 409, 412, 421, 430,
    436, 443, 447, 455, 459, 465, 471, 475, 479, 485, 489, 495, 501, 508, 516, 522, 529, 533, 538,
    543, 550, 558, 562, 570, 576, 580, 588, 594, 597, 608, 615, 620, 627, 632, 638, 645, 651, 658,
    664, 669, 675, 682, 688, 696, 702, 709, 715, 722, 730, 739, 744, 752, 761, 774, 780, 793, 799,
    806, 811, 818, 826, 833, 840, 849, 857, 864, 883, 892, 900, 912, 919, 921, 926, 936, 965, 975,
    984, 999, 1012, 1027,
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
  public GHOSTED(): antlr.TerminalNode | null {
    return this.getToken(PythonParser.GHOSTED, 0);
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
  public GHOSTED(): antlr.TerminalNode | null {
    return this.getToken(PythonParser.GHOSTED, 0);
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
  public GHOSTED(): antlr.TerminalNode | null {
    return this.getToken(PythonParser.GHOSTED, 0);
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
  public GHOSTED(): antlr.TerminalNode | null {
    return this.getToken(PythonParser.GHOSTED, 0);
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
  public GHOSTED(): antlr.TerminalNode | null {
    return this.getToken(PythonParser.GHOSTED, 0);
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
  public GHOSTED(): antlr.TerminalNode | null {
    return this.getToken(PythonParser.GHOSTED, 0);
  }
  public commentText(): CommentTextContext | null {
    return this.getRuleContext(0, CommentTextContext);
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
  public GHOSTED(): antlr.TerminalNode | null {
    return this.getToken(PythonParser.GHOSTED, 0);
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
  public ABC(): antlr.TerminalNode | null {
    return this.getToken(PythonParser.ABC, 0);
  }
  public CLOSE_BRACKET(): antlr.TerminalNode | null {
    return this.getToken(PythonParser.CLOSE_BRACKET, 0);
  }
  public GHOSTED(): antlr.TerminalNode | null {
    return this.getToken(PythonParser.GHOSTED, 0);
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
  public GHOSTED(): antlr.TerminalNode | null {
    return this.getToken(PythonParser.GHOSTED, 0);
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
  public GHOSTED(): antlr.TerminalNode | null {
    return this.getToken(PythonParser.GHOSTED, 0);
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
  public THEN(): antlr.TerminalNode {
    return this.getToken(PythonParser.THEN, 0)!;
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
  public GHOSTED(): antlr.TerminalNode | null {
    return this.getToken(PythonParser.GHOSTED, 0);
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
  public THEN(): antlr.TerminalNode {
    return this.getToken(PythonParser.THEN, 0)!;
  }
  public NL(): antlr.TerminalNode {
    return this.getToken(PythonParser.NL, 0)!;
  }
  public GHOSTED(): antlr.TerminalNode | null {
    return this.getToken(PythonParser.GHOSTED, 0);
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
  public NL(): antlr.TerminalNode {
    return this.getToken(PythonParser.NL, 0)!;
  }
  public GHOSTED(): antlr.TerminalNode | null {
    return this.getToken(PythonParser.GHOSTED, 0);
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
  public GHOSTED(): antlr.TerminalNode | null {
    return this.getToken(PythonParser.GHOSTED, 0);
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
  public GHOSTED(): antlr.TerminalNode | null {
    return this.getToken(PythonParser.GHOSTED, 0);
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
  public GHOSTED(): antlr.TerminalNode | null {
    return this.getToken(PythonParser.GHOSTED, 0);
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
  public GHOSTED(): antlr.TerminalNode | null {
    return this.getToken(PythonParser.GHOSTED, 0);
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
  public GHOSTED(): antlr.TerminalNode | null {
    return this.getToken(PythonParser.GHOSTED, 0);
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
  public GHOSTED(): antlr.TerminalNode | null {
    return this.getToken(PythonParser.GHOSTED, 0);
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
  public GHOSTED(): antlr.TerminalNode | null {
    return this.getToken(PythonParser.GHOSTED, 0);
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
  public GHOSTED(): antlr.TerminalNode | null {
    return this.getToken(PythonParser.GHOSTED, 0);
  }
  public commentText(): CommentTextContext | null {
    return this.getRuleContext(0, CommentTextContext);
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
  public END_CONSTRUCTOR(): antlr.TerminalNode {
    return this.getToken(PythonParser.END_CONSTRUCTOR, 0)!;
  }
  public GHOSTED(): antlr.TerminalNode | null {
    return this.getToken(PythonParser.GHOSTED, 0);
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
  public GHOSTED(): antlr.TerminalNode | null {
    return this.getToken(PythonParser.GHOSTED, 0);
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
  public END_FUNCTION_METHOD(): antlr.TerminalNode {
    return this.getToken(PythonParser.END_FUNCTION_METHOD, 0)!;
  }
  public GHOSTED(): antlr.TerminalNode | null {
    return this.getToken(PythonParser.GHOSTED, 0);
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
  public END_PROCEDURE_METHOD(): antlr.TerminalNode {
    return this.getToken(PythonParser.END_PROCEDURE_METHOD, 0)!;
  }
  public GHOSTED(): antlr.TerminalNode | null {
    return this.getToken(PythonParser.GHOSTED, 0);
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
  public GHOSTED(): antlr.TerminalNode | null {
    return this.getToken(PythonParser.GHOSTED, 0);
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
  public GHOSTED(): antlr.TerminalNode | null {
    return this.getToken(PythonParser.GHOSTED, 0);
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
