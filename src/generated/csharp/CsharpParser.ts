// Generated from src/grammars/csharp/Csharp.g4 by ANTLR 4.13.1

import * as antlr from "antlr4ng";
import { Token } from "antlr4ng";

import { CsharpListener } from "./CsharpListener.js";
import { CsharpVisitor } from "./CsharpVisitor.js";

// for running tests with parameters, TODO: discuss strategy for typed parameters in CI
// eslint-disable-next-line no-unused-vars
type int = number;

export class CsharpParser extends antlr.Parser {
  public static readonly COMMENT_MARKER = 1;
  public static readonly INT_NAME = 2;
  public static readonly FLOAT_NAME = 3;
  public static readonly BOOL_NAME = 4;
  public static readonly STRING_NAME = 5;
  public static readonly LIST_NAME = 6;
  public static readonly FUNC_NAME = 7;
  public static readonly TRUE = 8;
  public static readonly FALSE = 9;
  public static readonly AND = 10;
  public static readonly OR = 11;
  public static readonly NOT = 12;
  public static readonly EQUAL = 13;
  public static readonly NOT_EQUAL = 14;
  public static readonly MOD = 15;
  public static readonly ARROW = 16;
  public static readonly BINARY_PREFIX = 17;
  public static readonly HEX_PREFIX = 18;
  public static readonly THIS_INSTANCE = 19;
  public static readonly STATIC = 20;
  public static readonly VOID = 21;
  public static readonly TEST_CLASS_ANNOT = 22;
  public static readonly TEST_METHOD_ANNOT = 23;
  public static readonly CONST = 24;
  public static readonly ENUM = 25;
  public static readonly ABSTRACT = 26;
  public static readonly FOREACH = 27;
  public static readonly VAR = 28;
  public static readonly ASSERT = 29;
  public static readonly ARE_EQUAL = 30;
  public static readonly SEMI_COLON = 31;
  public static readonly THROW = 32;
  public static readonly NEW = 33;
  public static readonly CATCH = 34;
  public static readonly PUBLIC = 35;
  public static readonly PRIVATE = 36;
  public static readonly GET = 37;
  public static readonly SET = 38;
  public static readonly GET_SET = 39;
  public static readonly CLASS = 40;
  public static readonly ELSE = 41;
  public static readonly FOR = 42;
  public static readonly IF = 43;
  public static readonly IN = 44;
  public static readonly INPUT = 45;
  public static readonly LAMBDA = 46;
  public static readonly MAIN = 47;
  public static readonly PRINT = 48;
  public static readonly RETURN = 49;
  public static readonly TRY = 50;
  public static readonly WHILE = 51;
  public static readonly POWER = 52;
  public static readonly TUPLE = 53;
  public static readonly IF_ = 54;
  public static readonly COMMENT = 55;
  public static readonly SINGLE_EQUALS = 56;
  public static readonly OPEN_BRACE = 57;
  public static readonly CLOSE_BRACE = 58;
  public static readonly OPEN_SQ_BRACKET = 59;
  public static readonly CLOSE_SQ_BRACKET = 60;
  public static readonly OPEN_BRACKET = 61;
  public static readonly CLOSE_BRACKET = 62;
  public static readonly DOT = 63;
  public static readonly COMMA = 64;
  public static readonly COLON = 65;
  public static readonly PLUS = 66;
  public static readonly MINUS = 67;
  public static readonly MULT = 68;
  public static readonly DIVIDE = 69;
  public static readonly LT = 70;
  public static readonly GT = 71;
  public static readonly LE = 72;
  public static readonly GE = 73;
  public static readonly DOUBLE_QUOTES = 74;
  public static readonly WS = 75;
  public static readonly NL = 76;
  public static readonly NAME_STARTING_TEST_ = 77;
  public static readonly NAME_STARTING_LC = 78;
  public static readonly NAME_STARTING_UC = 79;
  public static readonly LITERAL_BINARY = 80;
  public static readonly LITERAL_HEX = 81;
  public static readonly LITERAL_INTEGER = 82;
  public static readonly LITERAL_FLOAT = 83;
  public static readonly LITERAL_STRING = 84;
  public static readonly INTERPOLATED_STRING_PREFIX = 85;
  public static readonly LITERAL_REGEXP = 86;
  public static readonly WHITESPACES = 87;
  public static readonly TEXT = 88;
  public static readonly GHOSTED = 89;
  public static readonly FUNCTION_ANNOTATION = 90;
  public static readonly PROCECDURE_ANNOTATION = 91;
  public static readonly CONSTANT_ANNOTATION = 92;
  public static readonly ENUM_ANNOTATION = 93;
  public static readonly CONCRETE_CLASS_ANNOTATION = 94;
  public static readonly ABSTRACT_CLASS_ANNOTATION = 95;
  public static readonly VARIABLE_ANNOTATION = 96;
  public static readonly ASSIGNMENT_ANNOTATION = 97;
  public static readonly INPUT_ANNOTATION = 98;
  public static readonly CALL_ANNOTATION = 99;
  public static readonly LET_ANNOTATION = 100;
  public static readonly ELSE_IF_ANNOTATION = 101;
  public static readonly PROPERTY_ANNOTATION = 102;
  public static readonly FUNCTION_METHOD_ANNOTATION = 103;
  public static readonly PROCEDURE_METHOD_ANNOTATION = 104;
  public static readonly INTERPOLATED_STRING = 105;
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
  public static readonly RULE_procRef = 21;
  public static readonly RULE_thisProcRef = 22;
  public static readonly RULE_instanceProcRef = 23;
  public static readonly RULE_identifierWithOptIndexes = 24;
  public static readonly RULE_tryStatement = 25;
  public static readonly RULE_throwStatement = 26;
  public static readonly RULE_errorMessage = 27;
  public static readonly RULE_assert = 28;
  public static readonly RULE_returnStatement = 29;
  public static readonly RULE_elseIfClause = 30;
  public static readonly RULE_elseClause = 31;
  public static readonly RULE_catchStatement = 32;
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
  public static readonly RULE_type = 51;
  public static readonly RULE_assertActual = 52;
  public static readonly RULE_assertExpected = 53;
  public static readonly RULE_litValue = 54;
  public static readonly RULE_litBoolean = 55;
  public static readonly RULE_litInt = 56;
  public static readonly RULE_litFloat = 57;
  public static readonly RULE_litString = 58;
  public static readonly RULE_enumValue = 59;
  public static readonly RULE_litRegExp = 60;
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
  public static readonly RULE_power = 85;

  public static readonly literalNames = [
    null,
    "'//'",
    "'int'",
    "'double'",
    "'bool'",
    "'string'",
    "'List'",
    "'Func'",
    "'true'",
    "'false'",
    "'&&'",
    "'||'",
    "'!'",
    "'=='",
    "'!='",
    "'%'",
    "'=>'",
    "'0b'",
    "'0x'",
    "'this'",
    "'static'",
    "'void'",
    null,
    null,
    "'const'",
    "'enum'",
    "'abstract'",
    "'foreach'",
    "'var'",
    "'Assert'",
    "'areEqual'",
    "';'",
    "'throw'",
    "'new'",
    "'catch'",
    "'public'",
    "'private'",
    "'get'",
    "'set'",
    null,
    "'class'",
    "'else'",
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
    "'^'",
    "'tuple'",
    "'if_'",
    null,
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
  ];

  public static readonly symbolicNames = [
    null,
    "COMMENT_MARKER",
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
    "BINARY_PREFIX",
    "HEX_PREFIX",
    "THIS_INSTANCE",
    "STATIC",
    "VOID",
    "TEST_CLASS_ANNOT",
    "TEST_METHOD_ANNOT",
    "CONST",
    "ENUM",
    "ABSTRACT",
    "FOREACH",
    "VAR",
    "ASSERT",
    "ARE_EQUAL",
    "SEMI_COLON",
    "THROW",
    "NEW",
    "CATCH",
    "PUBLIC",
    "PRIVATE",
    "GET",
    "SET",
    "GET_SET",
    "CLASS",
    "ELSE",
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
    "POWER",
    "TUPLE",
    "IF_",
    "COMMENT",
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
    "INTERPOLATED_STRING_PREFIX",
    "LITERAL_REGEXP",
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
    "INTERPOLATED_STRING",
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
    "interpolatedString",
    "power",
  ];

  public get grammarFileName(): string {
    return "Csharp.g4";
  }
  public get literalNames(): (string | null)[] {
    return CsharpParser.literalNames;
  }
  public get symbolicNames(): (string | null)[] {
    return CsharpParser.symbolicNames;
  }
  public get ruleNames(): string[] {
    return CsharpParser.ruleNames;
  }
  public get serializedATN(): number[] {
    return CsharpParser._serializedATN;
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
      CsharpParser._ATN,
      CsharpParser.decisionsToDFA,
      new antlr.PredictionContextCache(),
    );
  }
  public file(): FileContext {
    let localContext = new FileContext(this.context, this.state);
    this.enterRule(localContext, 0, CsharpParser.RULE_file);
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
              this.match(CsharpParser.COMMENT);
            }
            break;
        }
        this.state = 178;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (
          ((_la & ~0x1f) === 0 && ((1 << _la) & 122683392) !== 0) ||
          _la === 40 ||
          _la === 55
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
        this.state = 184;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (_la === 76) {
          {
            {
              this.state = 181;
              this.match(CsharpParser.NL);
            }
          }
          this.state = 186;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 187;
        this.match(CsharpParser.EOF);
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
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
    this.enterRule(localContext, 2, CsharpParser.RULE_global);
    try {
      this.state = 198;
      this.errorHandler.sync(this);
      switch (this.interpreter.adaptivePredict(this.tokenStream, 3, this.context)) {
        case 1:
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 189;
            this.main();
          }
          break;
        case 2:
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 190;
            this.function_();
          }
          break;
        case 3:
          this.enterOuterAlt(localContext, 3);
          {
            this.state = 191;
            this.test();
          }
          break;
        case 4:
          this.enterOuterAlt(localContext, 4);
          {
            this.state = 192;
            this.procedure();
          }
          break;
        case 5:
          this.enterOuterAlt(localContext, 5);
          {
            this.state = 193;
            this.constant();
          }
          break;
        case 6:
          this.enterOuterAlt(localContext, 6);
          {
            this.state = 194;
            this.enum_();
          }
          break;
        case 7:
          this.enterOuterAlt(localContext, 7);
          {
            this.state = 195;
            this.concreteClass();
          }
          break;
        case 8:
          this.enterOuterAlt(localContext, 8);
          {
            this.state = 196;
            this.abstractClass();
          }
          break;
        case 9:
          this.enterOuterAlt(localContext, 9);
          {
            this.state = 197;
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
    this.enterRule(localContext, 4, CsharpParser.RULE_main);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 200;
        this.match(CsharpParser.STATIC);
        this.state = 201;
        this.match(CsharpParser.VOID);
        this.state = 202;
        this.match(CsharpParser.MAIN);
        this.state = 203;
        this.match(CsharpParser.OPEN_BRACKET);
        this.state = 204;
        this.match(CsharpParser.CLOSE_BRACKET);
        this.state = 205;
        this.match(CsharpParser.OPEN_BRACE);
        this.state = 206;
        this.match(CsharpParser.NL);
        this.state = 210;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (
          ((_la & ~0x1f) === 0 && ((1 << _la) & 403177472) !== 0) ||
          (((_la - 32) & ~0x1f) === 0 && ((1 << (_la - 32)) & 9242625) !== 0) ||
          _la === 78 ||
          _la === 89
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
        this.match(CsharpParser.CLOSE_BRACE);
        this.state = 214;
        this.match(CsharpParser.COMMENT);
        this.state = 215;
        this.match(CsharpParser.NL);
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
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
    this.enterRule(localContext, 6, CsharpParser.RULE_function);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 217;
        this.match(CsharpParser.STATIC);
        this.state = 218;
        this.type_();
        this.state = 219;
        this.methodName();
        this.state = 220;
        this.match(CsharpParser.OPEN_BRACKET);
        this.state = 222;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (((_la & ~0x1f) === 0 && ((1 << _la) & 252) !== 0) || _la === 53 || _la === 79) {
          {
            this.state = 221;
            this.paramList();
          }
        }

        this.state = 224;
        this.match(CsharpParser.CLOSE_BRACKET);
        this.state = 225;
        this.match(CsharpParser.OPEN_BRACE);
        this.state = 226;
        this.match(CsharpParser.COMMENT);
        this.state = 227;
        this.match(CsharpParser.NL);
        this.state = 233;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (
          ((_la & ~0x1f) === 0 && ((1 << _la) & 403177472) !== 0) ||
          (((_la - 32) & ~0x1f) === 0 && ((1 << (_la - 32)) & 9242625) !== 0) ||
          _la === 78 ||
          _la === 89
        ) {
          {
            {
              this.state = 228;
              this.ordinaryStatement();
              this.state = 229;
              this.ordinaryStatement();
            }
          }
          this.state = 235;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 236;
        this.returnStatement();
        this.state = 237;
        this.match(CsharpParser.CLOSE_BRACE);
        this.state = 238;
        this.match(CsharpParser.COMMENT);
        this.state = 239;
        this.match(CsharpParser.NL);
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
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
    this.enterRule(localContext, 8, CsharpParser.RULE_test);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 241;
        this.match(CsharpParser.TEST_CLASS_ANNOT);
        this.state = 242;
        this.match(CsharpParser.CLASS);
        this.state = 243;
        this.typeName();
        this.state = 244;
        this.match(CsharpParser.NL);
        this.state = 245;
        this.match(CsharpParser.TEST_METHOD_ANNOT);
        this.state = 246;
        this.match(CsharpParser.STATIC);
        this.state = 247;
        this.match(CsharpParser.VOID);
        this.state = 248;
        this.testName();
        this.state = 254;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (((_la - 28) & ~0x1f) === 0 && ((1 << (_la - 28)) & 134217731) !== 0) {
          {
            this.state = 252;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
              case CsharpParser.ASSERT:
                {
                  this.state = 249;
                  this.assert();
                }
                break;
              case CsharpParser.VAR:
                {
                  this.state = 250;
                  this.variableDefinition();
                }
                break;
              case CsharpParser.COMMENT:
                {
                  this.state = 251;
                  this.comment();
                }
                break;
              default:
                throw new antlr.NoViableAltException(this);
            }
          }
          this.state = 256;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 257;
        this.match(CsharpParser.CLOSE_BRACE);
        this.state = 258;
        this.match(CsharpParser.COMMENT);
        this.state = 259;
        this.match(CsharpParser.NL);
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
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
    this.enterRule(localContext, 10, CsharpParser.RULE_procedure);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 261;
        this.match(CsharpParser.STATIC);
        this.state = 262;
        this.match(CsharpParser.VOID);
        this.state = 263;
        this.methodName();
        this.state = 264;
        this.match(CsharpParser.OPEN_BRACKET);
        this.state = 266;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (((_la & ~0x1f) === 0 && ((1 << _la) & 252) !== 0) || _la === 53 || _la === 79) {
          {
            this.state = 265;
            this.paramList();
          }
        }

        this.state = 268;
        this.match(CsharpParser.CLOSE_BRACKET);
        this.state = 269;
        this.match(CsharpParser.OPEN_BRACE);
        this.state = 270;
        this.match(CsharpParser.COMMENT);
        this.state = 271;
        this.match(CsharpParser.NL);
        this.state = 275;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (
          ((_la & ~0x1f) === 0 && ((1 << _la) & 403177472) !== 0) ||
          (((_la - 32) & ~0x1f) === 0 && ((1 << (_la - 32)) & 9242625) !== 0) ||
          _la === 78 ||
          _la === 89
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
        this.match(CsharpParser.CLOSE_BRACE);
        this.state = 279;
        this.match(CsharpParser.COMMENT);
        this.state = 280;
        this.match(CsharpParser.NL);
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
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
    this.enterRule(localContext, 12, CsharpParser.RULE_constant);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 282;
        this.match(CsharpParser.CONST);
        this.state = 283;
        this.identifierDef();
        this.state = 284;
        this.match(CsharpParser.EQUAL);
        this.state = 285;
        this.constantValue();
        this.state = 286;
        this.match(CsharpParser.COMMENT);
        this.state = 287;
        this.match(CsharpParser.NL);
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
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
    this.enterRule(localContext, 14, CsharpParser.RULE_enum);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 289;
        this.match(CsharpParser.ENUM);
        this.state = 290;
        this.typeName();
        this.state = 291;
        this.match(CsharpParser.OPEN_BRACE);
        this.state = 292;
        this.identifierList();
        this.state = 293;
        this.match(CsharpParser.CLOSE_BRACKET);
        this.state = 294;
        this.match(CsharpParser.NL);
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
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
    this.enterRule(localContext, 16, CsharpParser.RULE_concreteClass);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 296;
        this.match(CsharpParser.CLASS);
        this.state = 297;
        this.typeName();
        this.state = 300;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 65) {
          {
            this.state = 298;
            this.match(CsharpParser.COLON);
            this.state = 299;
            this.typeName();
          }
        }

        this.state = 302;
        this.match(CsharpParser.OPEN_BRACE);
        this.state = 303;
        this.match(CsharpParser.NL);
        this.state = 311;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (_la === 35 || _la === 55) {
          {
            this.state = 309;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 12, this.context)) {
              case 1:
                {
                  this.state = 304;
                  this.constructorMember();
                }
                break;
              case 2:
                {
                  this.state = 305;
                  this.property();
                }
                break;
              case 3:
                {
                  this.state = 306;
                  this.functionMethod();
                }
                break;
              case 4:
                {
                  this.state = 307;
                  this.procedureMethod();
                }
                break;
              case 5:
                {
                  this.state = 308;
                  this.comment();
                }
                break;
            }
          }
          this.state = 313;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 314;
        this.match(CsharpParser.CLOSE_BRACE);
        this.state = 315;
        this.match(CsharpParser.COMMENT);
        this.state = 316;
        this.match(CsharpParser.NL);
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
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
    this.enterRule(localContext, 18, CsharpParser.RULE_abstractClass);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 318;
        this.match(CsharpParser.ABSTRACT);
        this.state = 319;
        this.match(CsharpParser.CLASS);
        this.state = 320;
        this.typeName();
        this.state = 323;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 65) {
          {
            this.state = 321;
            this.match(CsharpParser.COLON);
            this.state = 322;
            this.typeName();
          }
        }

        this.state = 325;
        this.match(CsharpParser.OPEN_BRACE);
        this.state = 326;
        this.match(CsharpParser.NL);
        this.state = 335;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (((_la - 26) & ~0x1f) === 0 && ((1 << (_la - 26)) & 536871425) !== 0) {
          {
            this.state = 333;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 15, this.context)) {
              case 1:
                {
                  this.state = 327;
                  this.property();
                }
                break;
              case 2:
                {
                  this.state = 328;
                  this.functionMethod();
                }
                break;
              case 3:
                {
                  this.state = 329;
                  this.procedureMethod();
                }
                break;
              case 4:
                {
                  this.state = 330;
                  this.abstractFunction();
                }
                break;
              case 5:
                {
                  this.state = 331;
                  this.abstractProcedure();
                }
                break;
              case 6:
                {
                  this.state = 332;
                  this.comment();
                }
                break;
            }
          }
          this.state = 337;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 338;
        this.match(CsharpParser.CLOSE_BRACE);
        this.state = 339;
        this.match(CsharpParser.COMMENT);
        this.state = 340;
        this.match(CsharpParser.NL);
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
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
    this.enterRule(localContext, 20, CsharpParser.RULE_comment);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 342;
        this.commentText();
        this.state = 343;
        this.match(CsharpParser.NL);
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
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
    this.enterRule(localContext, 22, CsharpParser.RULE_commentText);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 345;
        this.match(CsharpParser.COMMENT);
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
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
    this.enterRule(localContext, 24, CsharpParser.RULE_ordinaryStatement);
    try {
      this.state = 358;
      this.errorHandler.sync(this);
      switch (this.interpreter.adaptivePredict(this.tokenStream, 17, this.context)) {
        case 1:
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 347;
            this.print();
          }
          break;
        case 2:
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 348;
            this.variableDefinition();
          }
          break;
        case 3:
          this.enterOuterAlt(localContext, 3);
          {
            this.state = 349;
            this.assignment();
          }
          break;
        case 4:
          this.enterOuterAlt(localContext, 4);
          {
            this.state = 350;
            this.inputStatement();
          }
          break;
        case 5:
          this.enterOuterAlt(localContext, 5);
          {
            this.state = 351;
            this.ifStatement();
          }
          break;
        case 6:
          this.enterOuterAlt(localContext, 6);
          {
            this.state = 352;
            this.whileLoop();
          }
          break;
        case 7:
          this.enterOuterAlt(localContext, 7);
          {
            this.state = 353;
            this.forLoop();
          }
          break;
        case 8:
          this.enterOuterAlt(localContext, 8);
          {
            this.state = 354;
            this.procedureCall();
          }
          break;
        case 9:
          this.enterOuterAlt(localContext, 9);
          {
            this.state = 355;
            this.tryStatement();
          }
          break;
        case 10:
          this.enterOuterAlt(localContext, 10);
          {
            this.state = 356;
            this.throwStatement();
          }
          break;
        case 11:
          this.enterOuterAlt(localContext, 11);
          {
            this.state = 357;
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
    this.enterRule(localContext, 26, CsharpParser.RULE_print);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 360;
        this.match(CsharpParser.PRINT);
        this.state = 361;
        this.match(CsharpParser.OPEN_BRACKET);
        this.state = 363;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (
          (((_la - 2) & ~0x1f) === 0 && ((1 << (_la - 2)) & 2147615967) !== 0) ||
          (((_la - 54) & ~0x1f) === 0 && ((1 << (_la - 54)) & 4278198409) !== 0) ||
          _la === 105
        ) {
          {
            this.state = 362;
            this.expression();
          }
        }

        this.state = 365;
        this.match(CsharpParser.CLOSE_BRACKET);
        this.state = 366;
        this.match(CsharpParser.SEMI_COLON);
        this.state = 367;
        this.match(CsharpParser.NL);
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
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
    this.enterRule(localContext, 28, CsharpParser.RULE_variableDefinition);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 369;
        this.match(CsharpParser.VAR);
        this.state = 370;
        this.identifierDef();
        this.state = 371;
        this.match(CsharpParser.SINGLE_EQUALS);
        this.state = 372;
        this.expression();
        this.state = 373;
        this.match(CsharpParser.SEMI_COLON);
        this.state = 374;
        this.match(CsharpParser.NL);
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
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
    this.enterRule(localContext, 30, CsharpParser.RULE_assignment);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 376;
        this.assignable(0);
        this.state = 377;
        this.match(CsharpParser.SINGLE_EQUALS);
        this.state = 378;
        this.expression();
        this.state = 379;
        this.match(CsharpParser.SEMI_COLON);
        this.state = 380;
        this.match(CsharpParser.COMMENT);
        this.state = 381;
        this.match(CsharpParser.NL);
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
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
    this.enterRule(localContext, 32, CsharpParser.RULE_inputStatement);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 383;
        this.identifierDef();
        this.state = 384;
        this.match(CsharpParser.EQUAL);
        this.state = 385;
        this.match(CsharpParser.INPUT);
        this.state = 386;
        this.match(CsharpParser.OPEN_BRACKET);
        this.state = 387;
        this.expression();
        this.state = 388;
        this.match(CsharpParser.CLOSE_BRACKET);
        this.state = 389;
        this.match(CsharpParser.SEMI_COLON);
        this.state = 390;
        this.match(CsharpParser.NL);
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
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
    this.enterRule(localContext, 34, CsharpParser.RULE_ifStatement);
    try {
      let alternative: number;
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 392;
        this.match(CsharpParser.IF);
        this.state = 393;
        this.match(CsharpParser.OPEN_BRACKET);
        this.state = 394;
        this.expression();
        this.state = 395;
        this.match(CsharpParser.CLOSE_BRACKET);
        this.state = 396;
        this.match(CsharpParser.OPEN_BRACE);
        this.state = 397;
        this.match(CsharpParser.NL);
        this.state = 403;
        this.errorHandler.sync(this);
        alternative = this.interpreter.adaptivePredict(this.tokenStream, 20, this.context);
        while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
          if (alternative === 1) {
            {
              this.state = 401;
              this.errorHandler.sync(this);
              switch (this.interpreter.adaptivePredict(this.tokenStream, 19, this.context)) {
                case 1:
                  {
                    this.state = 398;
                    this.elseIfClause();
                  }
                  break;
                case 2:
                  {
                    this.state = 399;
                    this.elseClause();
                  }
                  break;
                case 3:
                  {
                    this.state = 400;
                    this.ordinaryStatement();
                  }
                  break;
              }
            }
          }
          this.state = 405;
          this.errorHandler.sync(this);
          alternative = this.interpreter.adaptivePredict(this.tokenStream, 20, this.context);
        }
        this.state = 406;
        this.match(CsharpParser.CLOSE_BRACE);
        this.state = 407;
        this.match(CsharpParser.COMMENT);
        this.state = 408;
        this.match(CsharpParser.NL);
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
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
    this.enterRule(localContext, 36, CsharpParser.RULE_whileLoop);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 410;
        this.match(CsharpParser.WHILE);
        this.state = 411;
        this.match(CsharpParser.OPEN_BRACKET);
        this.state = 412;
        this.expression();
        this.state = 413;
        this.match(CsharpParser.CLOSE_BRACKET);
        this.state = 414;
        this.match(CsharpParser.OPEN_BRACE);
        this.state = 415;
        this.match(CsharpParser.NL);
        this.state = 419;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (
          ((_la & ~0x1f) === 0 && ((1 << _la) & 403177472) !== 0) ||
          (((_la - 32) & ~0x1f) === 0 && ((1 << (_la - 32)) & 9242625) !== 0) ||
          _la === 78 ||
          _la === 89
        ) {
          {
            {
              this.state = 416;
              this.ordinaryStatement();
            }
          }
          this.state = 421;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 422;
        this.match(CsharpParser.CLOSE_BRACE);
        this.state = 423;
        this.match(CsharpParser.COMMENT);
        this.state = 424;
        this.match(CsharpParser.NL);
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
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
    this.enterRule(localContext, 38, CsharpParser.RULE_forLoop);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 426;
        this.match(CsharpParser.FOREACH);
        this.state = 427;
        this.match(CsharpParser.OPEN_BRACKET);
        this.state = 428;
        this.match(CsharpParser.VAR);
        this.state = 429;
        this.identifierDef();
        this.state = 430;
        this.match(CsharpParser.IN);
        this.state = 431;
        this.expression();
        this.state = 432;
        this.match(CsharpParser.CLOSE_BRACKET);
        this.state = 433;
        this.match(CsharpParser.OPEN_BRACE);
        this.state = 434;
        this.match(CsharpParser.NL);
        this.state = 438;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (
          ((_la & ~0x1f) === 0 && ((1 << _la) & 403177472) !== 0) ||
          (((_la - 32) & ~0x1f) === 0 && ((1 << (_la - 32)) & 9242625) !== 0) ||
          _la === 78 ||
          _la === 89
        ) {
          {
            {
              this.state = 435;
              this.ordinaryStatement();
            }
          }
          this.state = 440;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 441;
        this.match(CsharpParser.CLOSE_BRACE);
        this.state = 442;
        this.match(CsharpParser.COMMENT);
        this.state = 443;
        this.match(CsharpParser.NL);
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
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
    this.enterRule(localContext, 40, CsharpParser.RULE_procedureCall);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 446;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 89) {
          {
            this.state = 445;
            this.match(CsharpParser.GHOSTED);
          }
        }

        this.state = 448;
        this.procRef();
        this.state = 449;
        this.match(CsharpParser.OPEN_BRACKET);
        this.state = 450;
        this.argList();
        this.state = 451;
        this.match(CsharpParser.CLOSE_BRACKET);
        this.state = 452;
        this.match(CsharpParser.NL);
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
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
    this.enterRule(localContext, 42, CsharpParser.RULE_procRef);
    try {
      this.state = 457;
      this.errorHandler.sync(this);
      switch (this.interpreter.adaptivePredict(this.tokenStream, 24, this.context)) {
        case 1:
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 454;
            this.methodName();
          }
          break;
        case 2:
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 455;
            this.thisProcRef();
          }
          break;
        case 3:
          this.enterOuterAlt(localContext, 3);
          {
            this.state = 456;
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
    this.enterRule(localContext, 44, CsharpParser.RULE_thisProcRef);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 459;
        this.match(CsharpParser.THIS_INSTANCE);
        this.state = 460;
        this.match(CsharpParser.DOT);
        this.state = 461;
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
    this.enterRule(localContext, 46, CsharpParser.RULE_instanceProcRef);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 463;
        this.identifierWithOptIndexes();
        this.state = 464;
        this.match(CsharpParser.DOT);
        this.state = 465;
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
    this.enterRule(localContext, 48, CsharpParser.RULE_identifierWithOptIndexes);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 467;
        this.identifierUse();
        this.state = 471;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (_la === 59) {
          {
            {
              this.state = 468;
              this.index();
            }
          }
          this.state = 473;
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
    this.enterRule(localContext, 50, CsharpParser.RULE_tryStatement);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 474;
        this.match(CsharpParser.TRY);
        this.state = 475;
        this.match(CsharpParser.OPEN_BRACE);
        this.state = 476;
        this.match(CsharpParser.NL);
        this.state = 480;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (
          ((_la & ~0x1f) === 0 && ((1 << _la) & 403177472) !== 0) ||
          (((_la - 32) & ~0x1f) === 0 && ((1 << (_la - 32)) & 9242625) !== 0) ||
          _la === 78 ||
          _la === 89
        ) {
          {
            {
              this.state = 477;
              this.ordinaryStatement();
            }
          }
          this.state = 482;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 483;
        this.catchStatement();
        this.state = 487;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (
          ((_la & ~0x1f) === 0 && ((1 << _la) & 403177472) !== 0) ||
          (((_la - 32) & ~0x1f) === 0 && ((1 << (_la - 32)) & 9242625) !== 0) ||
          _la === 78 ||
          _la === 89
        ) {
          {
            {
              this.state = 484;
              this.ordinaryStatement();
            }
          }
          this.state = 489;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 490;
        this.match(CsharpParser.CLOSE_BRACE);
        this.state = 491;
        this.match(CsharpParser.COMMENT);
        this.state = 492;
        this.match(CsharpParser.NL);
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
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
    this.enterRule(localContext, 52, CsharpParser.RULE_throwStatement);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 494;
        this.match(CsharpParser.THROW);
        this.state = 495;
        this.match(CsharpParser.NEW);
        this.state = 496;
        this.typeName();
        this.state = 497;
        this.match(CsharpParser.OPEN_BRACKET);
        this.state = 498;
        this.errorMessage();
        this.state = 499;
        this.match(CsharpParser.CLOSE_BRACKET);
        this.state = 500;
        this.match(CsharpParser.SEMI_COLON);
        this.state = 501;
        this.match(CsharpParser.NL);
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
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
    this.enterRule(localContext, 54, CsharpParser.RULE_errorMessage);
    try {
      this.state = 505;
      this.errorHandler.sync(this);
      switch (this.tokenStream.LA(1)) {
        case CsharpParser.LITERAL_STRING:
        case CsharpParser.INTERPOLATED_STRING_PREFIX:
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 503;
            this.litString();
          }
          break;
        case CsharpParser.NAME_STARTING_LC:
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 504;
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
    this.enterRule(localContext, 56, CsharpParser.RULE_assert);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 507;
        this.match(CsharpParser.ASSERT);
        this.state = 508;
        this.match(CsharpParser.DOT);
        this.state = 509;
        this.match(CsharpParser.ARE_EQUAL);
        this.state = 510;
        this.match(CsharpParser.OPEN_BRACKET);
        this.state = 511;
        this.assertActual();
        this.state = 512;
        this.match(CsharpParser.COMMA);
        this.state = 513;
        this.expression();
        this.state = 514;
        this.match(CsharpParser.CLOSE_BRACKET);
        this.state = 515;
        this.match(CsharpParser.SEMI_COLON);
        this.state = 516;
        this.match(CsharpParser.NL);
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
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
    this.enterRule(localContext, 58, CsharpParser.RULE_returnStatement);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 518;
        this.match(CsharpParser.RETURN);
        this.state = 519;
        this.expression();
        this.state = 520;
        this.match(CsharpParser.SEMI_COLON);
        this.state = 521;
        this.match(CsharpParser.NL);
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
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
    this.enterRule(localContext, 60, CsharpParser.RULE_elseIfClause);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 523;
        this.match(CsharpParser.CLOSE_BRACE);
        this.state = 524;
        this.match(CsharpParser.ELSE);
        this.state = 525;
        this.match(CsharpParser.IF);
        this.state = 526;
        this.match(CsharpParser.OPEN_BRACKET);
        this.state = 527;
        this.expression();
        this.state = 528;
        this.match(CsharpParser.CLOSE_BRACKET);
        this.state = 529;
        this.match(CsharpParser.OPEN_BRACE);
        this.state = 530;
        this.match(CsharpParser.NL);
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
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
    this.enterRule(localContext, 62, CsharpParser.RULE_elseClause);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 532;
        this.match(CsharpParser.CLOSE_BRACE);
        this.state = 533;
        this.match(CsharpParser.ELSE);
        this.state = 534;
        this.match(CsharpParser.OPEN_BRACE);
        this.state = 535;
        this.match(CsharpParser.NL);
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
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
    this.enterRule(localContext, 64, CsharpParser.RULE_catchStatement);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 537;
        this.match(CsharpParser.CLOSE_BRACE);
        this.state = 538;
        this.match(CsharpParser.CATCH);
        this.state = 539;
        this.match(CsharpParser.OPEN_BRACKET);
        this.state = 540;
        this.typeName();
        this.state = 541;
        this.identifierDef();
        this.state = 542;
        this.match(CsharpParser.CLOSE_BRACKET);
        this.state = 543;
        this.match(CsharpParser.OPEN_BRACE);
        this.state = 544;
        this.match(CsharpParser.NL);
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
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
    this.enterRule(localContext, 66, CsharpParser.RULE_constructorMember);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 546;
        this.match(CsharpParser.PUBLIC);
        this.state = 547;
        this.match(CsharpParser.OPEN_BRACKET);
        this.state = 549;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (((_la & ~0x1f) === 0 && ((1 << _la) & 252) !== 0) || _la === 53 || _la === 79) {
          {
            this.state = 548;
            this.paramList();
          }
        }

        this.state = 551;
        this.match(CsharpParser.CLOSE_BRACKET);
        this.state = 552;
        this.match(CsharpParser.OPEN_BRACE);
        this.state = 553;
        this.match(CsharpParser.NL);
        this.state = 557;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (
          ((_la & ~0x1f) === 0 && ((1 << _la) & 403177472) !== 0) ||
          (((_la - 32) & ~0x1f) === 0 && ((1 << (_la - 32)) & 9242625) !== 0) ||
          _la === 78 ||
          _la === 89
        ) {
          {
            {
              this.state = 554;
              this.ordinaryStatement();
            }
          }
          this.state = 559;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 560;
        this.match(CsharpParser.CLOSE_BRACE);
        this.state = 561;
        this.match(CsharpParser.COMMENT);
        this.state = 562;
        this.match(CsharpParser.NL);
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
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
    this.enterRule(localContext, 68, CsharpParser.RULE_property);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 564;
        this.match(CsharpParser.PUBLIC);
        this.state = 565;
        this.type_();
        this.state = 566;
        this.identifierDef();
        this.state = 567;
        this.match(CsharpParser.GET_SET);
        this.state = 568;
        this.match(CsharpParser.COMMENT);
        this.state = 569;
        this.match(CsharpParser.NL);
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
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
    this.enterRule(localContext, 70, CsharpParser.RULE_functionMethod);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 571;
        this.match(CsharpParser.PUBLIC);
        this.state = 572;
        this.type_();
        this.state = 573;
        this.methodName();
        this.state = 574;
        this.match(CsharpParser.OPEN_BRACKET);
        this.state = 576;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (((_la & ~0x1f) === 0 && ((1 << _la) & 252) !== 0) || _la === 53 || _la === 79) {
          {
            this.state = 575;
            this.paramList();
          }
        }

        this.state = 578;
        this.match(CsharpParser.CLOSE_BRACKET);
        this.state = 579;
        this.match(CsharpParser.OPEN_BRACE);
        this.state = 580;
        this.match(CsharpParser.COMMENT);
        this.state = 581;
        this.match(CsharpParser.NL);
        this.state = 585;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (
          ((_la & ~0x1f) === 0 && ((1 << _la) & 403177472) !== 0) ||
          (((_la - 32) & ~0x1f) === 0 && ((1 << (_la - 32)) & 9242625) !== 0) ||
          _la === 78 ||
          _la === 89
        ) {
          {
            {
              this.state = 582;
              this.ordinaryStatement();
            }
          }
          this.state = 587;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 588;
        this.returnStatement();
        this.state = 589;
        this.match(CsharpParser.CLOSE_BRACE);
        this.state = 590;
        this.match(CsharpParser.COMMENT);
        this.state = 591;
        this.match(CsharpParser.NL);
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
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
    this.enterRule(localContext, 72, CsharpParser.RULE_procedureMethod);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 593;
        this.match(CsharpParser.PUBLIC);
        this.state = 594;
        this.match(CsharpParser.VOID);
        this.state = 595;
        this.methodName();
        this.state = 596;
        this.match(CsharpParser.OPEN_BRACKET);
        this.state = 598;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (((_la & ~0x1f) === 0 && ((1 << _la) & 252) !== 0) || _la === 53 || _la === 79) {
          {
            this.state = 597;
            this.paramList();
          }
        }

        this.state = 600;
        this.match(CsharpParser.CLOSE_BRACKET);
        this.state = 601;
        this.match(CsharpParser.OPEN_BRACE);
        this.state = 602;
        this.match(CsharpParser.COMMENT);
        this.state = 603;
        this.match(CsharpParser.NL);
        this.state = 607;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (
          ((_la & ~0x1f) === 0 && ((1 << _la) & 403177472) !== 0) ||
          (((_la - 32) & ~0x1f) === 0 && ((1 << (_la - 32)) & 9242625) !== 0) ||
          _la === 78 ||
          _la === 89
        ) {
          {
            {
              this.state = 604;
              this.ordinaryStatement();
            }
          }
          this.state = 609;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 610;
        this.match(CsharpParser.CLOSE_BRACE);
        this.state = 611;
        this.match(CsharpParser.COMMENT);
        this.state = 612;
        this.match(CsharpParser.NL);
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
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
    this.enterRule(localContext, 74, CsharpParser.RULE_abstractFunction);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 614;
        this.match(CsharpParser.ABSTRACT);
        this.state = 615;
        this.type_();
        this.state = 616;
        this.methodName();
        this.state = 617;
        this.match(CsharpParser.OPEN_BRACKET);
        this.state = 619;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (((_la & ~0x1f) === 0 && ((1 << _la) & 252) !== 0) || _la === 53 || _la === 79) {
          {
            this.state = 618;
            this.paramList();
          }
        }

        this.state = 621;
        this.match(CsharpParser.CLOSE_BRACKET);
        this.state = 622;
        this.match(CsharpParser.SEMI_COLON);
        this.state = 623;
        this.match(CsharpParser.COMMENT);
        this.state = 624;
        this.match(CsharpParser.NL);
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
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
    this.enterRule(localContext, 76, CsharpParser.RULE_abstractProcedure);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 626;
        this.match(CsharpParser.ABSTRACT);
        this.state = 627;
        this.match(CsharpParser.VOID);
        this.state = 628;
        this.methodName();
        this.state = 629;
        this.match(CsharpParser.OPEN_BRACKET);
        this.state = 631;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (((_la & ~0x1f) === 0 && ((1 << _la) & 252) !== 0) || _la === 53 || _la === 79) {
          {
            this.state = 630;
            this.paramList();
          }
        }

        this.state = 633;
        this.match(CsharpParser.CLOSE_BRACKET);
        this.state = 634;
        this.match(CsharpParser.SEMI_COLON);
        this.state = 635;
        this.match(CsharpParser.COMMENT);
        this.state = 636;
        this.match(CsharpParser.NL);
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
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
    this.enterRule(localContext, 78, CsharpParser.RULE_identifierDef);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 638;
        this.match(CsharpParser.NAME_STARTING_LC);
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
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
    this.enterRule(localContext, 80, CsharpParser.RULE_identifierUse);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 640;
        this.match(CsharpParser.NAME_STARTING_LC);
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
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
    this.enterRecursionRule(localContext, 82, CsharpParser.RULE_assignable, _p);
    try {
      let alternative: number;
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 647;
        this.errorHandler.sync(this);
        switch (this.tokenStream.LA(1)) {
          case CsharpParser.NAME_STARTING_LC:
            {
              this.state = 643;
              this.identifierUse();
            }
            break;
          case CsharpParser.THIS_INSTANCE:
            {
              this.state = 644;
              this.match(CsharpParser.THIS_INSTANCE);
              this.state = 645;
              this.match(CsharpParser.DOT);
              this.state = 646;
              this.identifierUse();
            }
            break;
          default:
            throw new antlr.NoViableAltException(this);
        }
        this.context!.stop = this.tokenStream.LT(-1);
        this.state = 653;
        this.errorHandler.sync(this);
        alternative = this.interpreter.adaptivePredict(this.tokenStream, 38, this.context);
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
                  CsharpParser.RULE_assignable,
                );
                this.state = 649;
                if (!this.precpred(this.context, 1)) {
                  throw this.createFailedPredicateException("this.precpred(this.context, 1)");
                }
                this.state = 650;
                this.index();
              }
            }
          }
          this.state = 655;
          this.errorHandler.sync(this);
          alternative = this.interpreter.adaptivePredict(this.tokenStream, 38, this.context);
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
    this.enterRule(localContext, 84, CsharpParser.RULE_methodName);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 656;
        this.match(CsharpParser.NAME_STARTING_LC);
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
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
    this.enterRule(localContext, 86, CsharpParser.RULE_testName);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 658;
        this.match(CsharpParser.NAME_STARTING_TEST_);
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
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
    this.enterRule(localContext, 88, CsharpParser.RULE_typeName);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 660;
        _la = this.tokenStream.LA(1);
        if (!(((_la & ~0x1f) === 0 && ((1 << _la) & 124) !== 0) || _la === 79)) {
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
    this.enterRule(localContext, 90, CsharpParser.RULE_constantValue);
    try {
      this.state = 666;
      this.errorHandler.sync(this);
      switch (this.tokenStream.LA(1)) {
        case CsharpParser.TRUE:
        case CsharpParser.FALSE:
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 662;
            this.litBoolean();
          }
          break;
        case CsharpParser.LITERAL_BINARY:
        case CsharpParser.LITERAL_HEX:
        case CsharpParser.LITERAL_INTEGER:
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 663;
            this.litInt();
          }
          break;
        case CsharpParser.LITERAL_FLOAT:
          this.enterOuterAlt(localContext, 3);
          {
            this.state = 664;
            this.litFloat();
          }
          break;
        case CsharpParser.LITERAL_STRING:
        case CsharpParser.INTERPOLATED_STRING_PREFIX:
          this.enterOuterAlt(localContext, 4);
          {
            this.state = 665;
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
    this.enterRule(localContext, 92, CsharpParser.RULE_argList);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 668;
        this.argument();
        this.state = 673;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (_la === 64) {
          {
            {
              this.state = 669;
              this.match(CsharpParser.COMMA);
              this.state = 670;
              this.argument();
            }
          }
          this.state = 675;
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
    this.enterRule(localContext, 94, CsharpParser.RULE_argument);
    try {
      this.state = 678;
      this.errorHandler.sync(this);
      switch (this.tokenStream.LA(1)) {
        case CsharpParser.LAMBDA:
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 676;
            this.lambda();
          }
          break;
        case CsharpParser.INT_NAME:
        case CsharpParser.FLOAT_NAME:
        case CsharpParser.BOOL_NAME:
        case CsharpParser.STRING_NAME:
        case CsharpParser.LIST_NAME:
        case CsharpParser.TRUE:
        case CsharpParser.FALSE:
        case CsharpParser.NOT:
        case CsharpParser.THIS_INSTANCE:
        case CsharpParser.NEW:
        case CsharpParser.IF_:
        case CsharpParser.OPEN_BRACE:
        case CsharpParser.OPEN_BRACKET:
        case CsharpParser.MINUS:
        case CsharpParser.NAME_STARTING_LC:
        case CsharpParser.NAME_STARTING_UC:
        case CsharpParser.LITERAL_BINARY:
        case CsharpParser.LITERAL_HEX:
        case CsharpParser.LITERAL_INTEGER:
        case CsharpParser.LITERAL_FLOAT:
        case CsharpParser.LITERAL_STRING:
        case CsharpParser.INTERPOLATED_STRING_PREFIX:
        case CsharpParser.INTERPOLATED_STRING:
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 677;
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
    this.enterRule(localContext, 96, CsharpParser.RULE_paramList);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 680;
        this.paramDef();
        this.state = 685;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (_la === 64) {
          {
            {
              this.state = 681;
              this.match(CsharpParser.COMMA);
              this.state = 682;
              this.paramDef();
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
  public identifierList(): IdentifierListContext {
    let localContext = new IdentifierListContext(this.context, this.state);
    this.enterRule(localContext, 98, CsharpParser.RULE_identifierList);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 688;
        this.identifierDef();
        this.state = 691;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        do {
          {
            {
              this.state = 689;
              this.match(CsharpParser.COMMA);
              this.state = 690;
              this.identifierDef();
            }
          }
          this.state = 693;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        } while (_la === 64);
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
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
    this.enterRule(localContext, 100, CsharpParser.RULE_expressionList);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 695;
        this.expression();
        this.state = 700;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (_la === 64) {
          {
            {
              this.state = 696;
              this.match(CsharpParser.COMMA);
              this.state = 697;
              this.expression();
            }
          }
          this.state = 702;
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
    this.enterRule(localContext, 102, CsharpParser.RULE_type);
    try {
      this.state = 707;
      this.errorHandler.sync(this);
      switch (this.interpreter.adaptivePredict(this.tokenStream, 45, this.context)) {
        case 1:
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 703;
            this.typeTuple();
          }
          break;
        case 2:
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 704;
            this.typeName();
          }
          break;
        case 3:
          this.enterOuterAlt(localContext, 3);
          {
            this.state = 705;
            this.typeGeneric();
          }
          break;
        case 4:
          this.enterOuterAlt(localContext, 4);
          {
            this.state = 706;
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
    this.enterRule(localContext, 104, CsharpParser.RULE_assertActual);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 709;
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
    this.enterRule(localContext, 106, CsharpParser.RULE_assertExpected);
    try {
      this.state = 716;
      this.errorHandler.sync(this);
      switch (this.interpreter.adaptivePredict(this.tokenStream, 46, this.context)) {
        case 1:
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 711;
            this.litValue();
          }
          break;
        case 2:
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 712;
            this.list();
          }
          break;
        case 3:
          this.enterOuterAlt(localContext, 3);
          {
            this.state = 713;
            this.dictionary();
          }
          break;
        case 4:
          this.enterOuterAlt(localContext, 4);
          {
            this.state = 714;
            this.unaryExpression();
          }
          break;
        case 5:
          this.enterOuterAlt(localContext, 5);
          {
            this.state = 715;
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
    this.enterRule(localContext, 108, CsharpParser.RULE_litValue);
    try {
      this.state = 724;
      this.errorHandler.sync(this);
      switch (this.tokenStream.LA(1)) {
        case CsharpParser.TRUE:
        case CsharpParser.FALSE:
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 718;
            this.litBoolean();
          }
          break;
        case CsharpParser.LITERAL_BINARY:
        case CsharpParser.LITERAL_HEX:
        case CsharpParser.LITERAL_INTEGER:
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 719;
            this.litInt();
          }
          break;
        case CsharpParser.LITERAL_FLOAT:
          this.enterOuterAlt(localContext, 3);
          {
            this.state = 720;
            this.litFloat();
          }
          break;
        case CsharpParser.LITERAL_STRING:
        case CsharpParser.INTERPOLATED_STRING_PREFIX:
          this.enterOuterAlt(localContext, 4);
          {
            this.state = 721;
            this.litString();
          }
          break;
        case CsharpParser.INTERPOLATED_STRING:
          this.enterOuterAlt(localContext, 5);
          {
            this.state = 722;
            this.interpolatedString();
          }
          break;
        case CsharpParser.INT_NAME:
        case CsharpParser.FLOAT_NAME:
        case CsharpParser.BOOL_NAME:
        case CsharpParser.STRING_NAME:
        case CsharpParser.LIST_NAME:
        case CsharpParser.NAME_STARTING_UC:
          this.enterOuterAlt(localContext, 6);
          {
            this.state = 723;
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
    this.enterRule(localContext, 110, CsharpParser.RULE_litBoolean);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 726;
        _la = this.tokenStream.LA(1);
        if (!(_la === 8 || _la === 9)) {
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
    this.enterRule(localContext, 112, CsharpParser.RULE_litInt);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 728;
        _la = this.tokenStream.LA(1);
        if (!(((_la - 80) & ~0x1f) === 0 && ((1 << (_la - 80)) & 7) !== 0)) {
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
    this.enterRule(localContext, 114, CsharpParser.RULE_litFloat);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 730;
        this.match(CsharpParser.LITERAL_FLOAT);
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
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
    this.enterRule(localContext, 116, CsharpParser.RULE_litString);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 733;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 85) {
          {
            this.state = 732;
            this.match(CsharpParser.INTERPOLATED_STRING_PREFIX);
          }
        }

        this.state = 735;
        this.match(CsharpParser.LITERAL_STRING);
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
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
    this.enterRule(localContext, 118, CsharpParser.RULE_enumValue);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 737;
        this.typeName();
        this.state = 738;
        this.match(CsharpParser.DOT);
        this.state = 739;
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
    this.enterRule(localContext, 120, CsharpParser.RULE_litRegExp);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 741;
        this.match(CsharpParser.LITERAL_REGEXP);
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
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
    this.enterRule(localContext, 122, CsharpParser.RULE_index);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 743;
        this.match(CsharpParser.OPEN_SQ_BRACKET);
        this.state = 744;
        this.expression();
        this.state = 745;
        this.match(CsharpParser.CLOSE_SQ_BRACKET);
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
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
    this.enterRule(localContext, 124, CsharpParser.RULE_expression);
    try {
      this.state = 760;
      this.errorHandler.sync(this);
      switch (this.interpreter.adaptivePredict(this.tokenStream, 49, this.context)) {
        case 1:
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 747;
            this.newInstance();
          }
          break;
        case 2:
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 748;
            this.unaryExpression();
          }
          break;
        case 3:
          this.enterOuterAlt(localContext, 3);
          {
            this.state = 749;
            this.term(0);
          }
          break;
        case 4:
          this.enterOuterAlt(localContext, 4);
          {
            this.state = 750;
            this.binaryExpression();
          }
          break;
        case 5:
          this.enterOuterAlt(localContext, 5);
          {
            this.state = 751;
            this.match(CsharpParser.IF_);
            this.state = 752;
            this.match(CsharpParser.OPEN_BRACKET);
            this.state = 753;
            this.expression();
            this.state = 754;
            this.match(CsharpParser.COMMA);
            this.state = 755;
            this.expression();
            this.state = 756;
            this.match(CsharpParser.COMMA);
            this.state = 757;
            this.expression();
            this.state = 758;
            this.match(CsharpParser.CLOSE_BRACKET);
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
    let _startState = 126;
    this.enterRecursionRule(localContext, 126, CsharpParser.RULE_term, _p);
    try {
      let alternative: number;
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 771;
        this.errorHandler.sync(this);
        switch (this.interpreter.adaptivePredict(this.tokenStream, 50, this.context)) {
          case 1:
            {
              this.state = 763;
              this.thisInstance();
            }
            break;
          case 2:
            {
              this.state = 764;
              this.bracketedExpression();
            }
            break;
          case 3:
            {
              this.state = 765;
              this.litValue();
            }
            break;
          case 4:
            {
              this.state = 766;
              this.list();
            }
            break;
          case 5:
            {
              this.state = 767;
              this.dictionary();
            }
            break;
          case 6:
            {
              this.state = 768;
              this.tuple();
            }
            break;
          case 7:
            {
              this.state = 769;
              this.identifierUse();
            }
            break;
          case 8:
            {
              this.state = 770;
              this.methodCall();
            }
            break;
        }
        this.context!.stop = this.tokenStream.LT(-1);
        this.state = 780;
        this.errorHandler.sync(this);
        alternative = this.interpreter.adaptivePredict(this.tokenStream, 52, this.context);
        while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
          if (alternative === 1) {
            if (this.parseListeners != null) {
              this.triggerExitRuleEvent();
            }
            previousContext = localContext;
            {
              this.state = 778;
              this.errorHandler.sync(this);
              switch (this.interpreter.adaptivePredict(this.tokenStream, 51, this.context)) {
                case 1:
                  {
                    localContext = new TermContext(parentContext, parentState);
                    this.pushNewRecursionContext(localContext, _startState, CsharpParser.RULE_term);
                    this.state = 773;
                    if (!this.precpred(this.context, 2)) {
                      throw this.createFailedPredicateException("this.precpred(this.context, 2)");
                    }
                    this.state = 774;
                    this.index();
                  }
                  break;
                case 2:
                  {
                    localContext = new TermContext(parentContext, parentState);
                    this.pushNewRecursionContext(localContext, _startState, CsharpParser.RULE_term);
                    this.state = 775;
                    if (!this.precpred(this.context, 1)) {
                      throw this.createFailedPredicateException("this.precpred(this.context, 1)");
                    }
                    this.state = 776;
                    this.match(CsharpParser.DOT);
                    this.state = 777;
                    this.chainable();
                  }
                  break;
              }
            }
          }
          this.state = 782;
          this.errorHandler.sync(this);
          alternative = this.interpreter.adaptivePredict(this.tokenStream, 52, this.context);
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
    this.enterRule(localContext, 128, CsharpParser.RULE_chainable);
    try {
      let alternative: number;
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 785;
        this.errorHandler.sync(this);
        switch (this.interpreter.adaptivePredict(this.tokenStream, 53, this.context)) {
          case 1:
            {
              this.state = 783;
              this.identifierUse();
            }
            break;
          case 2:
            {
              this.state = 784;
              this.methodCall();
            }
            break;
        }
        this.state = 790;
        this.errorHandler.sync(this);
        alternative = this.interpreter.adaptivePredict(this.tokenStream, 54, this.context);
        while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
          if (alternative === 1) {
            {
              {
                this.state = 787;
                this.index();
              }
            }
          }
          this.state = 792;
          this.errorHandler.sync(this);
          alternative = this.interpreter.adaptivePredict(this.tokenStream, 54, this.context);
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
    this.enterRule(localContext, 130, CsharpParser.RULE_thisInstance);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 793;
        this.match(CsharpParser.THIS_INSTANCE);
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
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
    this.enterRule(localContext, 132, CsharpParser.RULE_bracketedExpression);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 795;
        this.match(CsharpParser.OPEN_BRACKET);
        this.state = 796;
        this.expression();
        this.state = 797;
        this.match(CsharpParser.CLOSE_BRACKET);
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
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
    this.enterRule(localContext, 134, CsharpParser.RULE_unaryExpression);
    try {
      this.state = 801;
      this.errorHandler.sync(this);
      switch (this.tokenStream.LA(1)) {
        case CsharpParser.MINUS:
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 799;
            this.negateNumeric();
          }
          break;
        case CsharpParser.NOT:
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 800;
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
    this.enterRule(localContext, 136, CsharpParser.RULE_negateNumeric);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 803;
        this.match(CsharpParser.MINUS);
        this.state = 804;
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
    this.enterRule(localContext, 138, CsharpParser.RULE_negateLogical);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 806;
        this.match(CsharpParser.NOT);
        this.state = 807;
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
    this.enterRule(localContext, 140, CsharpParser.RULE_binaryExpression);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 809;
        localContext._left = this.term(0);
        this.state = 810;
        this.binaryOperator();
        this.state = 811;
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
    this.enterRule(localContext, 142, CsharpParser.RULE_list);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 813;
        this.match(CsharpParser.OPEN_BRACE);
        this.state = 814;
        this.expression();
        this.state = 819;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (_la === 64) {
          {
            {
              this.state = 815;
              this.match(CsharpParser.COMMA);
              this.state = 816;
              this.expression();
            }
          }
          this.state = 821;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 822;
        this.match(CsharpParser.CLOSE_BRACE);
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
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
    this.enterRule(localContext, 144, CsharpParser.RULE_tuple);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 824;
        this.match(CsharpParser.OPEN_BRACKET);
        this.state = 825;
        this.expression();
        this.state = 826;
        this.match(CsharpParser.COMMA);
        this.state = 827;
        this.expression();
        this.state = 832;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (_la === 64) {
          {
            {
              this.state = 828;
              this.match(CsharpParser.COMMA);
              this.state = 829;
              this.expression();
            }
          }
          this.state = 834;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 835;
        this.match(CsharpParser.CLOSE_BRACKET);
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
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
    this.enterRule(localContext, 146, CsharpParser.RULE_dictionary);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 837;
        this.match(CsharpParser.OPEN_BRACE);
        this.state = 838;
        this.kvpList();
        this.state = 839;
        this.match(CsharpParser.CLOSE_BRACE);
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
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
    this.enterRule(localContext, 148, CsharpParser.RULE_kvpList);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 841;
        this.kvp();
        this.state = 846;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (_la === 64) {
          {
            {
              this.state = 842;
              this.match(CsharpParser.COMMA);
              this.state = 843;
              this.kvp();
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
  public kvp(): KvpContext {
    let localContext = new KvpContext(this.context, this.state);
    this.enterRule(localContext, 150, CsharpParser.RULE_kvp);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 849;
        this.match(CsharpParser.OPEN_BRACE);
        this.state = 850;
        this.expression();
        this.state = 851;
        this.match(CsharpParser.COLON);
        this.state = 852;
        this.expression();
        this.state = 853;
        this.match(CsharpParser.CLOSE_BRACE);
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
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
    this.enterRule(localContext, 152, CsharpParser.RULE_methodCall);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 855;
        this.methodName();
        this.state = 856;
        this.match(CsharpParser.OPEN_BRACKET);
        this.state = 858;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (
          (((_la - 2) & ~0x1f) === 0 && ((1 << (_la - 2)) & 2147615967) !== 0) ||
          (((_la - 46) & ~0x1f) === 0 && ((1 << (_la - 46)) & 2132225) !== 0) ||
          (((_la - 78) & ~0x1f) === 0 && ((1 << (_la - 78)) & 134217983) !== 0)
        ) {
          {
            this.state = 857;
            this.argList();
          }
        }

        this.state = 860;
        this.match(CsharpParser.CLOSE_BRACKET);
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
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
    this.enterRule(localContext, 154, CsharpParser.RULE_binaryOperator);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 862;
        _la = this.tokenStream.LA(1);
        if (!(
          ((_la & ~0x1f) === 0 && ((1 << _la) & 60416) !== 0) ||
          (((_la - 66) & ~0x1f) === 0 && ((1 << (_la - 66)) & 255) !== 0)
        )) {
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
    this.enterRule(localContext, 156, CsharpParser.RULE_newInstance);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 864;
        this.match(CsharpParser.NEW);
        this.state = 865;
        this.type_();
        this.state = 866;
        this.match(CsharpParser.OPEN_BRACKET);
        this.state = 868;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (
          (((_la - 2) & ~0x1f) === 0 && ((1 << (_la - 2)) & 2147615967) !== 0) ||
          (((_la - 46) & ~0x1f) === 0 && ((1 << (_la - 46)) & 2132225) !== 0) ||
          (((_la - 78) & ~0x1f) === 0 && ((1 << (_la - 78)) & 134217983) !== 0)
        ) {
          {
            this.state = 867;
            this.argList();
          }
        }

        this.state = 870;
        this.match(CsharpParser.CLOSE_BRACKET);
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
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
    this.enterRule(localContext, 158, CsharpParser.RULE_paramDef);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 872;
        this.type_();
        this.state = 873;
        this.identifierDef();
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
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
    this.enterRule(localContext, 160, CsharpParser.RULE_typeGeneric);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 875;
        this.typeName();
        this.state = 876;
        this.match(CsharpParser.LT);
        this.state = 877;
        this.type_();
        this.state = 882;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (_la === 64) {
          {
            {
              this.state = 878;
              this.match(CsharpParser.COMMA);
              this.state = 879;
              this.type_();
            }
          }
          this.state = 884;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 885;
        this.match(CsharpParser.GT);
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
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
    this.enterRule(localContext, 162, CsharpParser.RULE_typeFunc);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 887;
        this.match(CsharpParser.FUNC_NAME);
        this.state = 888;
        this.match(CsharpParser.LT);
        this.state = 889;
        this.type_();
        this.state = 894;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (_la === 64) {
          {
            {
              this.state = 890;
              this.match(CsharpParser.COMMA);
              this.state = 891;
              this.type_();
            }
          }
          this.state = 896;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 897;
        this.match(CsharpParser.ARROW);
        this.state = 898;
        this.type_();
        this.state = 899;
        this.match(CsharpParser.GT);
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
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
    this.enterRule(localContext, 164, CsharpParser.RULE_typeTuple);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 901;
        this.match(CsharpParser.TUPLE);
        this.state = 902;
        this.match(CsharpParser.OPEN_SQ_BRACKET);
        this.state = 903;
        this.type_();
        this.state = 906;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        do {
          {
            {
              this.state = 904;
              this.match(CsharpParser.COMMA);
              this.state = 905;
              this.type_();
            }
          }
          this.state = 908;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        } while (_la === 64);
        this.state = 910;
        this.match(CsharpParser.CLOSE_SQ_BRACKET);
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
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
    this.enterRule(localContext, 166, CsharpParser.RULE_lambda);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 912;
        this.match(CsharpParser.LAMBDA);
        this.state = 913;
        this.argList();
        this.state = 914;
        this.match(CsharpParser.COLON);
        this.state = 915;
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
    this.enterRule(localContext, 168, CsharpParser.RULE_interpolatedString);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 917;
        this.match(CsharpParser.INTERPOLATED_STRING);
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
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
    this.enterRule(localContext, 170, CsharpParser.RULE_power);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 919;
        this.term(0);
        this.state = 920;
        this.match(CsharpParser.POWER);
        this.state = 921;
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

  public override sempred(
    localContext: antlr.ParserRuleContext | null,
    ruleIndex: number,
    predIndex: number,
  ): boolean {
    switch (ruleIndex) {
      case 41:
        return this.assignable_sempred(localContext as AssignableContext, predIndex);
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
    4, 1, 105, 924, 2, 0, 7, 0, 2, 1, 7, 1, 2, 2, 7, 2, 2, 3, 7, 3, 2, 4, 7, 4, 2, 5, 7, 5, 2, 6, 7,
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
    7, 81, 2, 82, 7, 82, 2, 83, 7, 83, 2, 84, 7, 84, 2, 85, 7, 85, 1, 0, 3, 0, 174, 8, 0, 1, 0, 5,
    0, 177, 8, 0, 10, 0, 12, 0, 180, 9, 0, 1, 0, 5, 0, 183, 8, 0, 10, 0, 12, 0, 186, 9, 0, 1, 0, 1,
    0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 1, 199, 8, 1, 1, 2, 1, 2, 1, 2, 1,
    2, 1, 2, 1, 2, 1, 2, 1, 2, 5, 2, 209, 8, 2, 10, 2, 12, 2, 212, 9, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1,
    3, 1, 3, 1, 3, 1, 3, 1, 3, 3, 3, 223, 8, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 5, 3, 232,
    8, 3, 10, 3, 12, 3, 235, 9, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 4, 1, 4, 1, 4, 1, 4, 1, 4, 1, 4,
    1, 4, 1, 4, 1, 4, 1, 4, 1, 4, 5, 4, 253, 8, 4, 10, 4, 12, 4, 256, 9, 4, 1, 4, 1, 4, 1, 4, 1, 4,
    1, 5, 1, 5, 1, 5, 1, 5, 1, 5, 3, 5, 267, 8, 5, 1, 5, 1, 5, 1, 5, 1, 5, 1, 5, 5, 5, 274, 8, 5,
    10, 5, 12, 5, 277, 9, 5, 1, 5, 1, 5, 1, 5, 1, 5, 1, 6, 1, 6, 1, 6, 1, 6, 1, 6, 1, 6, 1, 6, 1, 7,
    1, 7, 1, 7, 1, 7, 1, 7, 1, 7, 1, 7, 1, 8, 1, 8, 1, 8, 1, 8, 3, 8, 301, 8, 8, 1, 8, 1, 8, 1, 8,
    1, 8, 1, 8, 1, 8, 1, 8, 5, 8, 310, 8, 8, 10, 8, 12, 8, 313, 9, 8, 1, 8, 1, 8, 1, 8, 1, 8, 1, 9,
    1, 9, 1, 9, 1, 9, 1, 9, 3, 9, 324, 8, 9, 1, 9, 1, 9, 1, 9, 1, 9, 1, 9, 1, 9, 1, 9, 1, 9, 5, 9,
    334, 8, 9, 10, 9, 12, 9, 337, 9, 9, 1, 9, 1, 9, 1, 9, 1, 9, 1, 10, 1, 10, 1, 10, 1, 11, 1, 11,
    1, 12, 1, 12, 1, 12, 1, 12, 1, 12, 1, 12, 1, 12, 1, 12, 1, 12, 1, 12, 1, 12, 3, 12, 359, 8, 12,
    1, 13, 1, 13, 1, 13, 3, 13, 364, 8, 13, 1, 13, 1, 13, 1, 13, 1, 13, 1, 14, 1, 14, 1, 14, 1, 14,
    1, 14, 1, 14, 1, 14, 1, 15, 1, 15, 1, 15, 1, 15, 1, 15, 1, 15, 1, 15, 1, 16, 1, 16, 1, 16, 1,
    16, 1, 16, 1, 16, 1, 16, 1, 16, 1, 16, 1, 17, 1, 17, 1, 17, 1, 17, 1, 17, 1, 17, 1, 17, 1, 17,
    1, 17, 5, 17, 402, 8, 17, 10, 17, 12, 17, 405, 9, 17, 1, 17, 1, 17, 1, 17, 1, 17, 1, 18, 1, 18,
    1, 18, 1, 18, 1, 18, 1, 18, 1, 18, 5, 18, 418, 8, 18, 10, 18, 12, 18, 421, 9, 18, 1, 18, 1, 18,
    1, 18, 1, 18, 1, 19, 1, 19, 1, 19, 1, 19, 1, 19, 1, 19, 1, 19, 1, 19, 1, 19, 1, 19, 5, 19, 437,
    8, 19, 10, 19, 12, 19, 440, 9, 19, 1, 19, 1, 19, 1, 19, 1, 19, 1, 20, 3, 20, 447, 8, 20, 1, 20,
    1, 20, 1, 20, 1, 20, 1, 20, 1, 20, 1, 21, 1, 21, 1, 21, 3, 21, 458, 8, 21, 1, 22, 1, 22, 1, 22,
    1, 22, 1, 23, 1, 23, 1, 23, 1, 23, 1, 24, 1, 24, 5, 24, 470, 8, 24, 10, 24, 12, 24, 473, 9, 24,
    1, 25, 1, 25, 1, 25, 1, 25, 5, 25, 479, 8, 25, 10, 25, 12, 25, 482, 9, 25, 1, 25, 1, 25, 5, 25,
    486, 8, 25, 10, 25, 12, 25, 489, 9, 25, 1, 25, 1, 25, 1, 25, 1, 25, 1, 26, 1, 26, 1, 26, 1, 26,
    1, 26, 1, 26, 1, 26, 1, 26, 1, 26, 1, 27, 1, 27, 3, 27, 506, 8, 27, 1, 28, 1, 28, 1, 28, 1, 28,
    1, 28, 1, 28, 1, 28, 1, 28, 1, 28, 1, 28, 1, 28, 1, 29, 1, 29, 1, 29, 1, 29, 1, 29, 1, 30, 1,
    30, 1, 30, 1, 30, 1, 30, 1, 30, 1, 30, 1, 30, 1, 30, 1, 31, 1, 31, 1, 31, 1, 31, 1, 31, 1, 32,
    1, 32, 1, 32, 1, 32, 1, 32, 1, 32, 1, 32, 1, 32, 1, 32, 1, 33, 1, 33, 1, 33, 3, 33, 550, 8, 33,
    1, 33, 1, 33, 1, 33, 1, 33, 5, 33, 556, 8, 33, 10, 33, 12, 33, 559, 9, 33, 1, 33, 1, 33, 1, 33,
    1, 33, 1, 34, 1, 34, 1, 34, 1, 34, 1, 34, 1, 34, 1, 34, 1, 35, 1, 35, 1, 35, 1, 35, 1, 35, 3,
    35, 577, 8, 35, 1, 35, 1, 35, 1, 35, 1, 35, 1, 35, 5, 35, 584, 8, 35, 10, 35, 12, 35, 587, 9,
    35, 1, 35, 1, 35, 1, 35, 1, 35, 1, 35, 1, 36, 1, 36, 1, 36, 1, 36, 1, 36, 3, 36, 599, 8, 36, 1,
    36, 1, 36, 1, 36, 1, 36, 1, 36, 5, 36, 606, 8, 36, 10, 36, 12, 36, 609, 9, 36, 1, 36, 1, 36, 1,
    36, 1, 36, 1, 37, 1, 37, 1, 37, 1, 37, 1, 37, 3, 37, 620, 8, 37, 1, 37, 1, 37, 1, 37, 1, 37, 1,
    37, 1, 38, 1, 38, 1, 38, 1, 38, 1, 38, 3, 38, 632, 8, 38, 1, 38, 1, 38, 1, 38, 1, 38, 1, 38, 1,
    39, 1, 39, 1, 40, 1, 40, 1, 41, 1, 41, 1, 41, 1, 41, 1, 41, 3, 41, 648, 8, 41, 1, 41, 1, 41, 5,
    41, 652, 8, 41, 10, 41, 12, 41, 655, 9, 41, 1, 42, 1, 42, 1, 43, 1, 43, 1, 44, 1, 44, 1, 45, 1,
    45, 1, 45, 1, 45, 3, 45, 667, 8, 45, 1, 46, 1, 46, 1, 46, 5, 46, 672, 8, 46, 10, 46, 12, 46,
    675, 9, 46, 1, 47, 1, 47, 3, 47, 679, 8, 47, 1, 48, 1, 48, 1, 48, 5, 48, 684, 8, 48, 10, 48, 12,
    48, 687, 9, 48, 1, 49, 1, 49, 1, 49, 4, 49, 692, 8, 49, 11, 49, 12, 49, 693, 1, 50, 1, 50, 1,
    50, 5, 50, 699, 8, 50, 10, 50, 12, 50, 702, 9, 50, 1, 51, 1, 51, 1, 51, 1, 51, 3, 51, 708, 8,
    51, 1, 52, 1, 52, 1, 53, 1, 53, 1, 53, 1, 53, 1, 53, 3, 53, 717, 8, 53, 1, 54, 1, 54, 1, 54, 1,
    54, 1, 54, 1, 54, 3, 54, 725, 8, 54, 1, 55, 1, 55, 1, 56, 1, 56, 1, 57, 1, 57, 1, 58, 3, 58,
    734, 8, 58, 1, 58, 1, 58, 1, 59, 1, 59, 1, 59, 1, 59, 1, 60, 1, 60, 1, 61, 1, 61, 1, 61, 1, 61,
    1, 62, 1, 62, 1, 62, 1, 62, 1, 62, 1, 62, 1, 62, 1, 62, 1, 62, 1, 62, 1, 62, 1, 62, 1, 62, 3,
    62, 761, 8, 62, 1, 63, 1, 63, 1, 63, 1, 63, 1, 63, 1, 63, 1, 63, 1, 63, 1, 63, 3, 63, 772, 8,
    63, 1, 63, 1, 63, 1, 63, 1, 63, 1, 63, 5, 63, 779, 8, 63, 10, 63, 12, 63, 782, 9, 63, 1, 64, 1,
    64, 3, 64, 786, 8, 64, 1, 64, 5, 64, 789, 8, 64, 10, 64, 12, 64, 792, 9, 64, 1, 65, 1, 65, 1,
    66, 1, 66, 1, 66, 1, 66, 1, 67, 1, 67, 3, 67, 802, 8, 67, 1, 68, 1, 68, 1, 68, 1, 69, 1, 69, 1,
    69, 1, 70, 1, 70, 1, 70, 1, 70, 1, 71, 1, 71, 1, 71, 1, 71, 5, 71, 818, 8, 71, 10, 71, 12, 71,
    821, 9, 71, 1, 71, 1, 71, 1, 72, 1, 72, 1, 72, 1, 72, 1, 72, 1, 72, 5, 72, 831, 8, 72, 10, 72,
    12, 72, 834, 9, 72, 1, 72, 1, 72, 1, 73, 1, 73, 1, 73, 1, 73, 1, 74, 1, 74, 1, 74, 5, 74, 845,
    8, 74, 10, 74, 12, 74, 848, 9, 74, 1, 75, 1, 75, 1, 75, 1, 75, 1, 75, 1, 75, 1, 76, 1, 76, 1,
    76, 3, 76, 859, 8, 76, 1, 76, 1, 76, 1, 77, 1, 77, 1, 78, 1, 78, 1, 78, 1, 78, 3, 78, 869, 8,
    78, 1, 78, 1, 78, 1, 79, 1, 79, 1, 79, 1, 80, 1, 80, 1, 80, 1, 80, 1, 80, 5, 80, 881, 8, 80, 10,
    80, 12, 80, 884, 9, 80, 1, 80, 1, 80, 1, 81, 1, 81, 1, 81, 1, 81, 1, 81, 5, 81, 893, 8, 81, 10,
    81, 12, 81, 896, 9, 81, 1, 81, 1, 81, 1, 81, 1, 81, 1, 82, 1, 82, 1, 82, 1, 82, 1, 82, 4, 82,
    907, 8, 82, 11, 82, 12, 82, 908, 1, 82, 1, 82, 1, 83, 1, 83, 1, 83, 1, 83, 1, 83, 1, 84, 1, 84,
    1, 85, 1, 85, 1, 85, 1, 85, 1, 85, 0, 2, 82, 126, 86, 0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22,
    24, 26, 28, 30, 32, 34, 36, 38, 40, 42, 44, 46, 48, 50, 52, 54, 56, 58, 60, 62, 64, 66, 68, 70,
    72, 74, 76, 78, 80, 82, 84, 86, 88, 90, 92, 94, 96, 98, 100, 102, 104, 106, 108, 110, 112, 114,
    116, 118, 120, 122, 124, 126, 128, 130, 132, 134, 136, 138, 140, 142, 144, 146, 148, 150, 152,
    154, 156, 158, 160, 162, 164, 166, 168, 170, 0, 4, 2, 0, 2, 6, 79, 79, 1, 0, 8, 9, 1, 0, 80, 82,
    3, 0, 10, 11, 13, 15, 66, 73, 947, 0, 173, 1, 0, 0, 0, 2, 198, 1, 0, 0, 0, 4, 200, 1, 0, 0, 0,
    6, 217, 1, 0, 0, 0, 8, 241, 1, 0, 0, 0, 10, 261, 1, 0, 0, 0, 12, 282, 1, 0, 0, 0, 14, 289, 1, 0,
    0, 0, 16, 296, 1, 0, 0, 0, 18, 318, 1, 0, 0, 0, 20, 342, 1, 0, 0, 0, 22, 345, 1, 0, 0, 0, 24,
    358, 1, 0, 0, 0, 26, 360, 1, 0, 0, 0, 28, 369, 1, 0, 0, 0, 30, 376, 1, 0, 0, 0, 32, 383, 1, 0,
    0, 0, 34, 392, 1, 0, 0, 0, 36, 410, 1, 0, 0, 0, 38, 426, 1, 0, 0, 0, 40, 446, 1, 0, 0, 0, 42,
    457, 1, 0, 0, 0, 44, 459, 1, 0, 0, 0, 46, 463, 1, 0, 0, 0, 48, 467, 1, 0, 0, 0, 50, 474, 1, 0,
    0, 0, 52, 494, 1, 0, 0, 0, 54, 505, 1, 0, 0, 0, 56, 507, 1, 0, 0, 0, 58, 518, 1, 0, 0, 0, 60,
    523, 1, 0, 0, 0, 62, 532, 1, 0, 0, 0, 64, 537, 1, 0, 0, 0, 66, 546, 1, 0, 0, 0, 68, 564, 1, 0,
    0, 0, 70, 571, 1, 0, 0, 0, 72, 593, 1, 0, 0, 0, 74, 614, 1, 0, 0, 0, 76, 626, 1, 0, 0, 0, 78,
    638, 1, 0, 0, 0, 80, 640, 1, 0, 0, 0, 82, 647, 1, 0, 0, 0, 84, 656, 1, 0, 0, 0, 86, 658, 1, 0,
    0, 0, 88, 660, 1, 0, 0, 0, 90, 666, 1, 0, 0, 0, 92, 668, 1, 0, 0, 0, 94, 678, 1, 0, 0, 0, 96,
    680, 1, 0, 0, 0, 98, 688, 1, 0, 0, 0, 100, 695, 1, 0, 0, 0, 102, 707, 1, 0, 0, 0, 104, 709, 1,
    0, 0, 0, 106, 716, 1, 0, 0, 0, 108, 724, 1, 0, 0, 0, 110, 726, 1, 0, 0, 0, 112, 728, 1, 0, 0, 0,
    114, 730, 1, 0, 0, 0, 116, 733, 1, 0, 0, 0, 118, 737, 1, 0, 0, 0, 120, 741, 1, 0, 0, 0, 122,
    743, 1, 0, 0, 0, 124, 760, 1, 0, 0, 0, 126, 771, 1, 0, 0, 0, 128, 785, 1, 0, 0, 0, 130, 793, 1,
    0, 0, 0, 132, 795, 1, 0, 0, 0, 134, 801, 1, 0, 0, 0, 136, 803, 1, 0, 0, 0, 138, 806, 1, 0, 0, 0,
    140, 809, 1, 0, 0, 0, 142, 813, 1, 0, 0, 0, 144, 824, 1, 0, 0, 0, 146, 837, 1, 0, 0, 0, 148,
    841, 1, 0, 0, 0, 150, 849, 1, 0, 0, 0, 152, 855, 1, 0, 0, 0, 154, 862, 1, 0, 0, 0, 156, 864, 1,
    0, 0, 0, 158, 872, 1, 0, 0, 0, 160, 875, 1, 0, 0, 0, 162, 887, 1, 0, 0, 0, 164, 901, 1, 0, 0, 0,
    166, 912, 1, 0, 0, 0, 168, 917, 1, 0, 0, 0, 170, 919, 1, 0, 0, 0, 172, 174, 5, 55, 0, 0, 173,
    172, 1, 0, 0, 0, 173, 174, 1, 0, 0, 0, 174, 178, 1, 0, 0, 0, 175, 177, 3, 2, 1, 0, 176, 175, 1,
    0, 0, 0, 177, 180, 1, 0, 0, 0, 178, 176, 1, 0, 0, 0, 178, 179, 1, 0, 0, 0, 179, 184, 1, 0, 0, 0,
    180, 178, 1, 0, 0, 0, 181, 183, 5, 76, 0, 0, 182, 181, 1, 0, 0, 0, 183, 186, 1, 0, 0, 0, 184,
    182, 1, 0, 0, 0, 184, 185, 1, 0, 0, 0, 185, 187, 1, 0, 0, 0, 186, 184, 1, 0, 0, 0, 187, 188, 5,
    0, 0, 1, 188, 1, 1, 0, 0, 0, 189, 199, 3, 4, 2, 0, 190, 199, 3, 6, 3, 0, 191, 199, 3, 8, 4, 0,
    192, 199, 3, 10, 5, 0, 193, 199, 3, 12, 6, 0, 194, 199, 3, 14, 7, 0, 195, 199, 3, 16, 8, 0, 196,
    199, 3, 18, 9, 0, 197, 199, 3, 20, 10, 0, 198, 189, 1, 0, 0, 0, 198, 190, 1, 0, 0, 0, 198, 191,
    1, 0, 0, 0, 198, 192, 1, 0, 0, 0, 198, 193, 1, 0, 0, 0, 198, 194, 1, 0, 0, 0, 198, 195, 1, 0, 0,
    0, 198, 196, 1, 0, 0, 0, 198, 197, 1, 0, 0, 0, 199, 3, 1, 0, 0, 0, 200, 201, 5, 20, 0, 0, 201,
    202, 5, 21, 0, 0, 202, 203, 5, 47, 0, 0, 203, 204, 5, 61, 0, 0, 204, 205, 5, 62, 0, 0, 205, 206,
    5, 57, 0, 0, 206, 210, 5, 76, 0, 0, 207, 209, 3, 24, 12, 0, 208, 207, 1, 0, 0, 0, 209, 212, 1,
    0, 0, 0, 210, 208, 1, 0, 0, 0, 210, 211, 1, 0, 0, 0, 211, 213, 1, 0, 0, 0, 212, 210, 1, 0, 0, 0,
    213, 214, 5, 58, 0, 0, 214, 215, 5, 55, 0, 0, 215, 216, 5, 76, 0, 0, 216, 5, 1, 0, 0, 0, 217,
    218, 5, 20, 0, 0, 218, 219, 3, 102, 51, 0, 219, 220, 3, 84, 42, 0, 220, 222, 5, 61, 0, 0, 221,
    223, 3, 96, 48, 0, 222, 221, 1, 0, 0, 0, 222, 223, 1, 0, 0, 0, 223, 224, 1, 0, 0, 0, 224, 225,
    5, 62, 0, 0, 225, 226, 5, 57, 0, 0, 226, 227, 5, 55, 0, 0, 227, 233, 5, 76, 0, 0, 228, 229, 3,
    24, 12, 0, 229, 230, 3, 24, 12, 0, 230, 232, 1, 0, 0, 0, 231, 228, 1, 0, 0, 0, 232, 235, 1, 0,
    0, 0, 233, 231, 1, 0, 0, 0, 233, 234, 1, 0, 0, 0, 234, 236, 1, 0, 0, 0, 235, 233, 1, 0, 0, 0,
    236, 237, 3, 58, 29, 0, 237, 238, 5, 58, 0, 0, 238, 239, 5, 55, 0, 0, 239, 240, 5, 76, 0, 0,
    240, 7, 1, 0, 0, 0, 241, 242, 5, 22, 0, 0, 242, 243, 5, 40, 0, 0, 243, 244, 3, 88, 44, 0, 244,
    245, 5, 76, 0, 0, 245, 246, 5, 23, 0, 0, 246, 247, 5, 20, 0, 0, 247, 248, 5, 21, 0, 0, 248, 254,
    3, 86, 43, 0, 249, 253, 3, 56, 28, 0, 250, 253, 3, 28, 14, 0, 251, 253, 3, 20, 10, 0, 252, 249,
    1, 0, 0, 0, 252, 250, 1, 0, 0, 0, 252, 251, 1, 0, 0, 0, 253, 256, 1, 0, 0, 0, 254, 252, 1, 0, 0,
    0, 254, 255, 1, 0, 0, 0, 255, 257, 1, 0, 0, 0, 256, 254, 1, 0, 0, 0, 257, 258, 5, 58, 0, 0, 258,
    259, 5, 55, 0, 0, 259, 260, 5, 76, 0, 0, 260, 9, 1, 0, 0, 0, 261, 262, 5, 20, 0, 0, 262, 263, 5,
    21, 0, 0, 263, 264, 3, 84, 42, 0, 264, 266, 5, 61, 0, 0, 265, 267, 3, 96, 48, 0, 266, 265, 1, 0,
    0, 0, 266, 267, 1, 0, 0, 0, 267, 268, 1, 0, 0, 0, 268, 269, 5, 62, 0, 0, 269, 270, 5, 57, 0, 0,
    270, 271, 5, 55, 0, 0, 271, 275, 5, 76, 0, 0, 272, 274, 3, 24, 12, 0, 273, 272, 1, 0, 0, 0, 274,
    277, 1, 0, 0, 0, 275, 273, 1, 0, 0, 0, 275, 276, 1, 0, 0, 0, 276, 278, 1, 0, 0, 0, 277, 275, 1,
    0, 0, 0, 278, 279, 5, 58, 0, 0, 279, 280, 5, 55, 0, 0, 280, 281, 5, 76, 0, 0, 281, 11, 1, 0, 0,
    0, 282, 283, 5, 24, 0, 0, 283, 284, 3, 78, 39, 0, 284, 285, 5, 13, 0, 0, 285, 286, 3, 90, 45, 0,
    286, 287, 5, 55, 0, 0, 287, 288, 5, 76, 0, 0, 288, 13, 1, 0, 0, 0, 289, 290, 5, 25, 0, 0, 290,
    291, 3, 88, 44, 0, 291, 292, 5, 57, 0, 0, 292, 293, 3, 98, 49, 0, 293, 294, 5, 62, 0, 0, 294,
    295, 5, 76, 0, 0, 295, 15, 1, 0, 0, 0, 296, 297, 5, 40, 0, 0, 297, 300, 3, 88, 44, 0, 298, 299,
    5, 65, 0, 0, 299, 301, 3, 88, 44, 0, 300, 298, 1, 0, 0, 0, 300, 301, 1, 0, 0, 0, 301, 302, 1, 0,
    0, 0, 302, 303, 5, 57, 0, 0, 303, 311, 5, 76, 0, 0, 304, 310, 3, 66, 33, 0, 305, 310, 3, 68, 34,
    0, 306, 310, 3, 70, 35, 0, 307, 310, 3, 72, 36, 0, 308, 310, 3, 20, 10, 0, 309, 304, 1, 0, 0, 0,
    309, 305, 1, 0, 0, 0, 309, 306, 1, 0, 0, 0, 309, 307, 1, 0, 0, 0, 309, 308, 1, 0, 0, 0, 310,
    313, 1, 0, 0, 0, 311, 309, 1, 0, 0, 0, 311, 312, 1, 0, 0, 0, 312, 314, 1, 0, 0, 0, 313, 311, 1,
    0, 0, 0, 314, 315, 5, 58, 0, 0, 315, 316, 5, 55, 0, 0, 316, 317, 5, 76, 0, 0, 317, 17, 1, 0, 0,
    0, 318, 319, 5, 26, 0, 0, 319, 320, 5, 40, 0, 0, 320, 323, 3, 88, 44, 0, 321, 322, 5, 65, 0, 0,
    322, 324, 3, 88, 44, 0, 323, 321, 1, 0, 0, 0, 323, 324, 1, 0, 0, 0, 324, 325, 1, 0, 0, 0, 325,
    326, 5, 57, 0, 0, 326, 335, 5, 76, 0, 0, 327, 334, 3, 68, 34, 0, 328, 334, 3, 70, 35, 0, 329,
    334, 3, 72, 36, 0, 330, 334, 3, 74, 37, 0, 331, 334, 3, 76, 38, 0, 332, 334, 3, 20, 10, 0, 333,
    327, 1, 0, 0, 0, 333, 328, 1, 0, 0, 0, 333, 329, 1, 0, 0, 0, 333, 330, 1, 0, 0, 0, 333, 331, 1,
    0, 0, 0, 333, 332, 1, 0, 0, 0, 334, 337, 1, 0, 0, 0, 335, 333, 1, 0, 0, 0, 335, 336, 1, 0, 0, 0,
    336, 338, 1, 0, 0, 0, 337, 335, 1, 0, 0, 0, 338, 339, 5, 58, 0, 0, 339, 340, 5, 55, 0, 0, 340,
    341, 5, 76, 0, 0, 341, 19, 1, 0, 0, 0, 342, 343, 3, 22, 11, 0, 343, 344, 5, 76, 0, 0, 344, 21,
    1, 0, 0, 0, 345, 346, 5, 55, 0, 0, 346, 23, 1, 0, 0, 0, 347, 359, 3, 26, 13, 0, 348, 359, 3, 28,
    14, 0, 349, 359, 3, 30, 15, 0, 350, 359, 3, 32, 16, 0, 351, 359, 3, 34, 17, 0, 352, 359, 3, 36,
    18, 0, 353, 359, 3, 38, 19, 0, 354, 359, 3, 40, 20, 0, 355, 359, 3, 50, 25, 0, 356, 359, 3, 52,
    26, 0, 357, 359, 3, 20, 10, 0, 358, 347, 1, 0, 0, 0, 358, 348, 1, 0, 0, 0, 358, 349, 1, 0, 0, 0,
    358, 350, 1, 0, 0, 0, 358, 351, 1, 0, 0, 0, 358, 352, 1, 0, 0, 0, 358, 353, 1, 0, 0, 0, 358,
    354, 1, 0, 0, 0, 358, 355, 1, 0, 0, 0, 358, 356, 1, 0, 0, 0, 358, 357, 1, 0, 0, 0, 359, 25, 1,
    0, 0, 0, 360, 361, 5, 48, 0, 0, 361, 363, 5, 61, 0, 0, 362, 364, 3, 124, 62, 0, 363, 362, 1, 0,
    0, 0, 363, 364, 1, 0, 0, 0, 364, 365, 1, 0, 0, 0, 365, 366, 5, 62, 0, 0, 366, 367, 5, 31, 0, 0,
    367, 368, 5, 76, 0, 0, 368, 27, 1, 0, 0, 0, 369, 370, 5, 28, 0, 0, 370, 371, 3, 78, 39, 0, 371,
    372, 5, 56, 0, 0, 372, 373, 3, 124, 62, 0, 373, 374, 5, 31, 0, 0, 374, 375, 5, 76, 0, 0, 375,
    29, 1, 0, 0, 0, 376, 377, 3, 82, 41, 0, 377, 378, 5, 56, 0, 0, 378, 379, 3, 124, 62, 0, 379,
    380, 5, 31, 0, 0, 380, 381, 5, 55, 0, 0, 381, 382, 5, 76, 0, 0, 382, 31, 1, 0, 0, 0, 383, 384,
    3, 78, 39, 0, 384, 385, 5, 13, 0, 0, 385, 386, 5, 45, 0, 0, 386, 387, 5, 61, 0, 0, 387, 388, 3,
    124, 62, 0, 388, 389, 5, 62, 0, 0, 389, 390, 5, 31, 0, 0, 390, 391, 5, 76, 0, 0, 391, 33, 1, 0,
    0, 0, 392, 393, 5, 43, 0, 0, 393, 394, 5, 61, 0, 0, 394, 395, 3, 124, 62, 0, 395, 396, 5, 62, 0,
    0, 396, 397, 5, 57, 0, 0, 397, 403, 5, 76, 0, 0, 398, 402, 3, 60, 30, 0, 399, 402, 3, 62, 31, 0,
    400, 402, 3, 24, 12, 0, 401, 398, 1, 0, 0, 0, 401, 399, 1, 0, 0, 0, 401, 400, 1, 0, 0, 0, 402,
    405, 1, 0, 0, 0, 403, 401, 1, 0, 0, 0, 403, 404, 1, 0, 0, 0, 404, 406, 1, 0, 0, 0, 405, 403, 1,
    0, 0, 0, 406, 407, 5, 58, 0, 0, 407, 408, 5, 55, 0, 0, 408, 409, 5, 76, 0, 0, 409, 35, 1, 0, 0,
    0, 410, 411, 5, 51, 0, 0, 411, 412, 5, 61, 0, 0, 412, 413, 3, 124, 62, 0, 413, 414, 5, 62, 0, 0,
    414, 415, 5, 57, 0, 0, 415, 419, 5, 76, 0, 0, 416, 418, 3, 24, 12, 0, 417, 416, 1, 0, 0, 0, 418,
    421, 1, 0, 0, 0, 419, 417, 1, 0, 0, 0, 419, 420, 1, 0, 0, 0, 420, 422, 1, 0, 0, 0, 421, 419, 1,
    0, 0, 0, 422, 423, 5, 58, 0, 0, 423, 424, 5, 55, 0, 0, 424, 425, 5, 76, 0, 0, 425, 37, 1, 0, 0,
    0, 426, 427, 5, 27, 0, 0, 427, 428, 5, 61, 0, 0, 428, 429, 5, 28, 0, 0, 429, 430, 3, 78, 39, 0,
    430, 431, 5, 44, 0, 0, 431, 432, 3, 124, 62, 0, 432, 433, 5, 62, 0, 0, 433, 434, 5, 57, 0, 0,
    434, 438, 5, 76, 0, 0, 435, 437, 3, 24, 12, 0, 436, 435, 1, 0, 0, 0, 437, 440, 1, 0, 0, 0, 438,
    436, 1, 0, 0, 0, 438, 439, 1, 0, 0, 0, 439, 441, 1, 0, 0, 0, 440, 438, 1, 0, 0, 0, 441, 442, 5,
    58, 0, 0, 442, 443, 5, 55, 0, 0, 443, 444, 5, 76, 0, 0, 444, 39, 1, 0, 0, 0, 445, 447, 5, 89, 0,
    0, 446, 445, 1, 0, 0, 0, 446, 447, 1, 0, 0, 0, 447, 448, 1, 0, 0, 0, 448, 449, 3, 42, 21, 0,
    449, 450, 5, 61, 0, 0, 450, 451, 3, 92, 46, 0, 451, 452, 5, 62, 0, 0, 452, 453, 5, 76, 0, 0,
    453, 41, 1, 0, 0, 0, 454, 458, 3, 84, 42, 0, 455, 458, 3, 44, 22, 0, 456, 458, 3, 46, 23, 0,
    457, 454, 1, 0, 0, 0, 457, 455, 1, 0, 0, 0, 457, 456, 1, 0, 0, 0, 458, 43, 1, 0, 0, 0, 459, 460,
    5, 19, 0, 0, 460, 461, 5, 63, 0, 0, 461, 462, 3, 84, 42, 0, 462, 45, 1, 0, 0, 0, 463, 464, 3,
    48, 24, 0, 464, 465, 5, 63, 0, 0, 465, 466, 3, 84, 42, 0, 466, 47, 1, 0, 0, 0, 467, 471, 3, 80,
    40, 0, 468, 470, 3, 122, 61, 0, 469, 468, 1, 0, 0, 0, 470, 473, 1, 0, 0, 0, 471, 469, 1, 0, 0,
    0, 471, 472, 1, 0, 0, 0, 472, 49, 1, 0, 0, 0, 473, 471, 1, 0, 0, 0, 474, 475, 5, 50, 0, 0, 475,
    476, 5, 57, 0, 0, 476, 480, 5, 76, 0, 0, 477, 479, 3, 24, 12, 0, 478, 477, 1, 0, 0, 0, 479, 482,
    1, 0, 0, 0, 480, 478, 1, 0, 0, 0, 480, 481, 1, 0, 0, 0, 481, 483, 1, 0, 0, 0, 482, 480, 1, 0, 0,
    0, 483, 487, 3, 64, 32, 0, 484, 486, 3, 24, 12, 0, 485, 484, 1, 0, 0, 0, 486, 489, 1, 0, 0, 0,
    487, 485, 1, 0, 0, 0, 487, 488, 1, 0, 0, 0, 488, 490, 1, 0, 0, 0, 489, 487, 1, 0, 0, 0, 490,
    491, 5, 58, 0, 0, 491, 492, 5, 55, 0, 0, 492, 493, 5, 76, 0, 0, 493, 51, 1, 0, 0, 0, 494, 495,
    5, 32, 0, 0, 495, 496, 5, 33, 0, 0, 496, 497, 3, 88, 44, 0, 497, 498, 5, 61, 0, 0, 498, 499, 3,
    54, 27, 0, 499, 500, 5, 62, 0, 0, 500, 501, 5, 31, 0, 0, 501, 502, 5, 76, 0, 0, 502, 53, 1, 0,
    0, 0, 503, 506, 3, 116, 58, 0, 504, 506, 3, 80, 40, 0, 505, 503, 1, 0, 0, 0, 505, 504, 1, 0, 0,
    0, 506, 55, 1, 0, 0, 0, 507, 508, 5, 29, 0, 0, 508, 509, 5, 63, 0, 0, 509, 510, 5, 30, 0, 0,
    510, 511, 5, 61, 0, 0, 511, 512, 3, 104, 52, 0, 512, 513, 5, 64, 0, 0, 513, 514, 3, 124, 62, 0,
    514, 515, 5, 62, 0, 0, 515, 516, 5, 31, 0, 0, 516, 517, 5, 76, 0, 0, 517, 57, 1, 0, 0, 0, 518,
    519, 5, 49, 0, 0, 519, 520, 3, 124, 62, 0, 520, 521, 5, 31, 0, 0, 521, 522, 5, 76, 0, 0, 522,
    59, 1, 0, 0, 0, 523, 524, 5, 58, 0, 0, 524, 525, 5, 41, 0, 0, 525, 526, 5, 43, 0, 0, 526, 527,
    5, 61, 0, 0, 527, 528, 3, 124, 62, 0, 528, 529, 5, 62, 0, 0, 529, 530, 5, 57, 0, 0, 530, 531, 5,
    76, 0, 0, 531, 61, 1, 0, 0, 0, 532, 533, 5, 58, 0, 0, 533, 534, 5, 41, 0, 0, 534, 535, 5, 57, 0,
    0, 535, 536, 5, 76, 0, 0, 536, 63, 1, 0, 0, 0, 537, 538, 5, 58, 0, 0, 538, 539, 5, 34, 0, 0,
    539, 540, 5, 61, 0, 0, 540, 541, 3, 88, 44, 0, 541, 542, 3, 78, 39, 0, 542, 543, 5, 62, 0, 0,
    543, 544, 5, 57, 0, 0, 544, 545, 5, 76, 0, 0, 545, 65, 1, 0, 0, 0, 546, 547, 5, 35, 0, 0, 547,
    549, 5, 61, 0, 0, 548, 550, 3, 96, 48, 0, 549, 548, 1, 0, 0, 0, 549, 550, 1, 0, 0, 0, 550, 551,
    1, 0, 0, 0, 551, 552, 5, 62, 0, 0, 552, 553, 5, 57, 0, 0, 553, 557, 5, 76, 0, 0, 554, 556, 3,
    24, 12, 0, 555, 554, 1, 0, 0, 0, 556, 559, 1, 0, 0, 0, 557, 555, 1, 0, 0, 0, 557, 558, 1, 0, 0,
    0, 558, 560, 1, 0, 0, 0, 559, 557, 1, 0, 0, 0, 560, 561, 5, 58, 0, 0, 561, 562, 5, 55, 0, 0,
    562, 563, 5, 76, 0, 0, 563, 67, 1, 0, 0, 0, 564, 565, 5, 35, 0, 0, 565, 566, 3, 102, 51, 0, 566,
    567, 3, 78, 39, 0, 567, 568, 5, 39, 0, 0, 568, 569, 5, 55, 0, 0, 569, 570, 5, 76, 0, 0, 570, 69,
    1, 0, 0, 0, 571, 572, 5, 35, 0, 0, 572, 573, 3, 102, 51, 0, 573, 574, 3, 84, 42, 0, 574, 576, 5,
    61, 0, 0, 575, 577, 3, 96, 48, 0, 576, 575, 1, 0, 0, 0, 576, 577, 1, 0, 0, 0, 577, 578, 1, 0, 0,
    0, 578, 579, 5, 62, 0, 0, 579, 580, 5, 57, 0, 0, 580, 581, 5, 55, 0, 0, 581, 585, 5, 76, 0, 0,
    582, 584, 3, 24, 12, 0, 583, 582, 1, 0, 0, 0, 584, 587, 1, 0, 0, 0, 585, 583, 1, 0, 0, 0, 585,
    586, 1, 0, 0, 0, 586, 588, 1, 0, 0, 0, 587, 585, 1, 0, 0, 0, 588, 589, 3, 58, 29, 0, 589, 590,
    5, 58, 0, 0, 590, 591, 5, 55, 0, 0, 591, 592, 5, 76, 0, 0, 592, 71, 1, 0, 0, 0, 593, 594, 5, 35,
    0, 0, 594, 595, 5, 21, 0, 0, 595, 596, 3, 84, 42, 0, 596, 598, 5, 61, 0, 0, 597, 599, 3, 96, 48,
    0, 598, 597, 1, 0, 0, 0, 598, 599, 1, 0, 0, 0, 599, 600, 1, 0, 0, 0, 600, 601, 5, 62, 0, 0, 601,
    602, 5, 57, 0, 0, 602, 603, 5, 55, 0, 0, 603, 607, 5, 76, 0, 0, 604, 606, 3, 24, 12, 0, 605,
    604, 1, 0, 0, 0, 606, 609, 1, 0, 0, 0, 607, 605, 1, 0, 0, 0, 607, 608, 1, 0, 0, 0, 608, 610, 1,
    0, 0, 0, 609, 607, 1, 0, 0, 0, 610, 611, 5, 58, 0, 0, 611, 612, 5, 55, 0, 0, 612, 613, 5, 76, 0,
    0, 613, 73, 1, 0, 0, 0, 614, 615, 5, 26, 0, 0, 615, 616, 3, 102, 51, 0, 616, 617, 3, 84, 42, 0,
    617, 619, 5, 61, 0, 0, 618, 620, 3, 96, 48, 0, 619, 618, 1, 0, 0, 0, 619, 620, 1, 0, 0, 0, 620,
    621, 1, 0, 0, 0, 621, 622, 5, 62, 0, 0, 622, 623, 5, 31, 0, 0, 623, 624, 5, 55, 0, 0, 624, 625,
    5, 76, 0, 0, 625, 75, 1, 0, 0, 0, 626, 627, 5, 26, 0, 0, 627, 628, 5, 21, 0, 0, 628, 629, 3, 84,
    42, 0, 629, 631, 5, 61, 0, 0, 630, 632, 3, 96, 48, 0, 631, 630, 1, 0, 0, 0, 631, 632, 1, 0, 0,
    0, 632, 633, 1, 0, 0, 0, 633, 634, 5, 62, 0, 0, 634, 635, 5, 31, 0, 0, 635, 636, 5, 55, 0, 0,
    636, 637, 5, 76, 0, 0, 637, 77, 1, 0, 0, 0, 638, 639, 5, 78, 0, 0, 639, 79, 1, 0, 0, 0, 640,
    641, 5, 78, 0, 0, 641, 81, 1, 0, 0, 0, 642, 643, 6, 41, -1, 0, 643, 648, 3, 80, 40, 0, 644, 645,
    5, 19, 0, 0, 645, 646, 5, 63, 0, 0, 646, 648, 3, 80, 40, 0, 647, 642, 1, 0, 0, 0, 647, 644, 1,
    0, 0, 0, 648, 653, 1, 0, 0, 0, 649, 650, 10, 1, 0, 0, 650, 652, 3, 122, 61, 0, 651, 649, 1, 0,
    0, 0, 652, 655, 1, 0, 0, 0, 653, 651, 1, 0, 0, 0, 653, 654, 1, 0, 0, 0, 654, 83, 1, 0, 0, 0,
    655, 653, 1, 0, 0, 0, 656, 657, 5, 78, 0, 0, 657, 85, 1, 0, 0, 0, 658, 659, 5, 77, 0, 0, 659,
    87, 1, 0, 0, 0, 660, 661, 7, 0, 0, 0, 661, 89, 1, 0, 0, 0, 662, 667, 3, 110, 55, 0, 663, 667, 3,
    112, 56, 0, 664, 667, 3, 114, 57, 0, 665, 667, 3, 116, 58, 0, 666, 662, 1, 0, 0, 0, 666, 663, 1,
    0, 0, 0, 666, 664, 1, 0, 0, 0, 666, 665, 1, 0, 0, 0, 667, 91, 1, 0, 0, 0, 668, 673, 3, 94, 47,
    0, 669, 670, 5, 64, 0, 0, 670, 672, 3, 94, 47, 0, 671, 669, 1, 0, 0, 0, 672, 675, 1, 0, 0, 0,
    673, 671, 1, 0, 0, 0, 673, 674, 1, 0, 0, 0, 674, 93, 1, 0, 0, 0, 675, 673, 1, 0, 0, 0, 676, 679,
    3, 166, 83, 0, 677, 679, 3, 124, 62, 0, 678, 676, 1, 0, 0, 0, 678, 677, 1, 0, 0, 0, 679, 95, 1,
    0, 0, 0, 680, 685, 3, 158, 79, 0, 681, 682, 5, 64, 0, 0, 682, 684, 3, 158, 79, 0, 683, 681, 1,
    0, 0, 0, 684, 687, 1, 0, 0, 0, 685, 683, 1, 0, 0, 0, 685, 686, 1, 0, 0, 0, 686, 97, 1, 0, 0, 0,
    687, 685, 1, 0, 0, 0, 688, 691, 3, 78, 39, 0, 689, 690, 5, 64, 0, 0, 690, 692, 3, 78, 39, 0,
    691, 689, 1, 0, 0, 0, 692, 693, 1, 0, 0, 0, 693, 691, 1, 0, 0, 0, 693, 694, 1, 0, 0, 0, 694, 99,
    1, 0, 0, 0, 695, 700, 3, 124, 62, 0, 696, 697, 5, 64, 0, 0, 697, 699, 3, 124, 62, 0, 698, 696,
    1, 0, 0, 0, 699, 702, 1, 0, 0, 0, 700, 698, 1, 0, 0, 0, 700, 701, 1, 0, 0, 0, 701, 101, 1, 0, 0,
    0, 702, 700, 1, 0, 0, 0, 703, 708, 3, 164, 82, 0, 704, 708, 3, 88, 44, 0, 705, 708, 3, 160, 80,
    0, 706, 708, 3, 162, 81, 0, 707, 703, 1, 0, 0, 0, 707, 704, 1, 0, 0, 0, 707, 705, 1, 0, 0, 0,
    707, 706, 1, 0, 0, 0, 708, 103, 1, 0, 0, 0, 709, 710, 3, 124, 62, 0, 710, 105, 1, 0, 0, 0, 711,
    717, 3, 108, 54, 0, 712, 717, 3, 142, 71, 0, 713, 717, 3, 146, 73, 0, 714, 717, 3, 134, 67, 0,
    715, 717, 3, 144, 72, 0, 716, 711, 1, 0, 0, 0, 716, 712, 1, 0, 0, 0, 716, 713, 1, 0, 0, 0, 716,
    714, 1, 0, 0, 0, 716, 715, 1, 0, 0, 0, 717, 107, 1, 0, 0, 0, 718, 725, 3, 110, 55, 0, 719, 725,
    3, 112, 56, 0, 720, 725, 3, 114, 57, 0, 721, 725, 3, 116, 58, 0, 722, 725, 3, 168, 84, 0, 723,
    725, 3, 118, 59, 0, 724, 718, 1, 0, 0, 0, 724, 719, 1, 0, 0, 0, 724, 720, 1, 0, 0, 0, 724, 721,
    1, 0, 0, 0, 724, 722, 1, 0, 0, 0, 724, 723, 1, 0, 0, 0, 725, 109, 1, 0, 0, 0, 726, 727, 7, 1, 0,
    0, 727, 111, 1, 0, 0, 0, 728, 729, 7, 2, 0, 0, 729, 113, 1, 0, 0, 0, 730, 731, 5, 83, 0, 0, 731,
    115, 1, 0, 0, 0, 732, 734, 5, 85, 0, 0, 733, 732, 1, 0, 0, 0, 733, 734, 1, 0, 0, 0, 734, 735, 1,
    0, 0, 0, 735, 736, 5, 84, 0, 0, 736, 117, 1, 0, 0, 0, 737, 738, 3, 88, 44, 0, 738, 739, 5, 63,
    0, 0, 739, 740, 3, 80, 40, 0, 740, 119, 1, 0, 0, 0, 741, 742, 5, 86, 0, 0, 742, 121, 1, 0, 0, 0,
    743, 744, 5, 59, 0, 0, 744, 745, 3, 124, 62, 0, 745, 746, 5, 60, 0, 0, 746, 123, 1, 0, 0, 0,
    747, 761, 3, 156, 78, 0, 748, 761, 3, 134, 67, 0, 749, 761, 3, 126, 63, 0, 750, 761, 3, 140, 70,
    0, 751, 752, 5, 54, 0, 0, 752, 753, 5, 61, 0, 0, 753, 754, 3, 124, 62, 0, 754, 755, 5, 64, 0, 0,
    755, 756, 3, 124, 62, 0, 756, 757, 5, 64, 0, 0, 757, 758, 3, 124, 62, 0, 758, 759, 5, 62, 0, 0,
    759, 761, 1, 0, 0, 0, 760, 747, 1, 0, 0, 0, 760, 748, 1, 0, 0, 0, 760, 749, 1, 0, 0, 0, 760,
    750, 1, 0, 0, 0, 760, 751, 1, 0, 0, 0, 761, 125, 1, 0, 0, 0, 762, 763, 6, 63, -1, 0, 763, 772,
    3, 130, 65, 0, 764, 772, 3, 132, 66, 0, 765, 772, 3, 108, 54, 0, 766, 772, 3, 142, 71, 0, 767,
    772, 3, 146, 73, 0, 768, 772, 3, 144, 72, 0, 769, 772, 3, 80, 40, 0, 770, 772, 3, 152, 76, 0,
    771, 762, 1, 0, 0, 0, 771, 764, 1, 0, 0, 0, 771, 765, 1, 0, 0, 0, 771, 766, 1, 0, 0, 0, 771,
    767, 1, 0, 0, 0, 771, 768, 1, 0, 0, 0, 771, 769, 1, 0, 0, 0, 771, 770, 1, 0, 0, 0, 772, 780, 1,
    0, 0, 0, 773, 774, 10, 2, 0, 0, 774, 779, 3, 122, 61, 0, 775, 776, 10, 1, 0, 0, 776, 777, 5, 63,
    0, 0, 777, 779, 3, 128, 64, 0, 778, 773, 1, 0, 0, 0, 778, 775, 1, 0, 0, 0, 779, 782, 1, 0, 0, 0,
    780, 778, 1, 0, 0, 0, 780, 781, 1, 0, 0, 0, 781, 127, 1, 0, 0, 0, 782, 780, 1, 0, 0, 0, 783,
    786, 3, 80, 40, 0, 784, 786, 3, 152, 76, 0, 785, 783, 1, 0, 0, 0, 785, 784, 1, 0, 0, 0, 786,
    790, 1, 0, 0, 0, 787, 789, 3, 122, 61, 0, 788, 787, 1, 0, 0, 0, 789, 792, 1, 0, 0, 0, 790, 788,
    1, 0, 0, 0, 790, 791, 1, 0, 0, 0, 791, 129, 1, 0, 0, 0, 792, 790, 1, 0, 0, 0, 793, 794, 5, 19,
    0, 0, 794, 131, 1, 0, 0, 0, 795, 796, 5, 61, 0, 0, 796, 797, 3, 124, 62, 0, 797, 798, 5, 62, 0,
    0, 798, 133, 1, 0, 0, 0, 799, 802, 3, 136, 68, 0, 800, 802, 3, 138, 69, 0, 801, 799, 1, 0, 0, 0,
    801, 800, 1, 0, 0, 0, 802, 135, 1, 0, 0, 0, 803, 804, 5, 67, 0, 0, 804, 805, 3, 126, 63, 0, 805,
    137, 1, 0, 0, 0, 806, 807, 5, 12, 0, 0, 807, 808, 3, 126, 63, 0, 808, 139, 1, 0, 0, 0, 809, 810,
    3, 126, 63, 0, 810, 811, 3, 154, 77, 0, 811, 812, 3, 124, 62, 0, 812, 141, 1, 0, 0, 0, 813, 814,
    5, 57, 0, 0, 814, 819, 3, 124, 62, 0, 815, 816, 5, 64, 0, 0, 816, 818, 3, 124, 62, 0, 817, 815,
    1, 0, 0, 0, 818, 821, 1, 0, 0, 0, 819, 817, 1, 0, 0, 0, 819, 820, 1, 0, 0, 0, 820, 822, 1, 0, 0,
    0, 821, 819, 1, 0, 0, 0, 822, 823, 5, 58, 0, 0, 823, 143, 1, 0, 0, 0, 824, 825, 5, 61, 0, 0,
    825, 826, 3, 124, 62, 0, 826, 827, 5, 64, 0, 0, 827, 832, 3, 124, 62, 0, 828, 829, 5, 64, 0, 0,
    829, 831, 3, 124, 62, 0, 830, 828, 1, 0, 0, 0, 831, 834, 1, 0, 0, 0, 832, 830, 1, 0, 0, 0, 832,
    833, 1, 0, 0, 0, 833, 835, 1, 0, 0, 0, 834, 832, 1, 0, 0, 0, 835, 836, 5, 62, 0, 0, 836, 145, 1,
    0, 0, 0, 837, 838, 5, 57, 0, 0, 838, 839, 3, 148, 74, 0, 839, 840, 5, 58, 0, 0, 840, 147, 1, 0,
    0, 0, 841, 846, 3, 150, 75, 0, 842, 843, 5, 64, 0, 0, 843, 845, 3, 150, 75, 0, 844, 842, 1, 0,
    0, 0, 845, 848, 1, 0, 0, 0, 846, 844, 1, 0, 0, 0, 846, 847, 1, 0, 0, 0, 847, 149, 1, 0, 0, 0,
    848, 846, 1, 0, 0, 0, 849, 850, 5, 57, 0, 0, 850, 851, 3, 124, 62, 0, 851, 852, 5, 65, 0, 0,
    852, 853, 3, 124, 62, 0, 853, 854, 5, 58, 0, 0, 854, 151, 1, 0, 0, 0, 855, 856, 3, 84, 42, 0,
    856, 858, 5, 61, 0, 0, 857, 859, 3, 92, 46, 0, 858, 857, 1, 0, 0, 0, 858, 859, 1, 0, 0, 0, 859,
    860, 1, 0, 0, 0, 860, 861, 5, 62, 0, 0, 861, 153, 1, 0, 0, 0, 862, 863, 7, 3, 0, 0, 863, 155, 1,
    0, 0, 0, 864, 865, 5, 33, 0, 0, 865, 866, 3, 102, 51, 0, 866, 868, 5, 61, 0, 0, 867, 869, 3, 92,
    46, 0, 868, 867, 1, 0, 0, 0, 868, 869, 1, 0, 0, 0, 869, 870, 1, 0, 0, 0, 870, 871, 5, 62, 0, 0,
    871, 157, 1, 0, 0, 0, 872, 873, 3, 102, 51, 0, 873, 874, 3, 78, 39, 0, 874, 159, 1, 0, 0, 0,
    875, 876, 3, 88, 44, 0, 876, 877, 5, 70, 0, 0, 877, 882, 3, 102, 51, 0, 878, 879, 5, 64, 0, 0,
    879, 881, 3, 102, 51, 0, 880, 878, 1, 0, 0, 0, 881, 884, 1, 0, 0, 0, 882, 880, 1, 0, 0, 0, 882,
    883, 1, 0, 0, 0, 883, 885, 1, 0, 0, 0, 884, 882, 1, 0, 0, 0, 885, 886, 5, 71, 0, 0, 886, 161, 1,
    0, 0, 0, 887, 888, 5, 7, 0, 0, 888, 889, 5, 70, 0, 0, 889, 894, 3, 102, 51, 0, 890, 891, 5, 64,
    0, 0, 891, 893, 3, 102, 51, 0, 892, 890, 1, 0, 0, 0, 893, 896, 1, 0, 0, 0, 894, 892, 1, 0, 0, 0,
    894, 895, 1, 0, 0, 0, 895, 897, 1, 0, 0, 0, 896, 894, 1, 0, 0, 0, 897, 898, 5, 16, 0, 0, 898,
    899, 3, 102, 51, 0, 899, 900, 5, 71, 0, 0, 900, 163, 1, 0, 0, 0, 901, 902, 5, 53, 0, 0, 902,
    903, 5, 59, 0, 0, 903, 906, 3, 102, 51, 0, 904, 905, 5, 64, 0, 0, 905, 907, 3, 102, 51, 0, 906,
    904, 1, 0, 0, 0, 907, 908, 1, 0, 0, 0, 908, 906, 1, 0, 0, 0, 908, 909, 1, 0, 0, 0, 909, 910, 1,
    0, 0, 0, 910, 911, 5, 60, 0, 0, 911, 165, 1, 0, 0, 0, 912, 913, 5, 46, 0, 0, 913, 914, 3, 92,
    46, 0, 914, 915, 5, 65, 0, 0, 915, 916, 3, 124, 62, 0, 916, 167, 1, 0, 0, 0, 917, 918, 5, 105,
    0, 0, 918, 169, 1, 0, 0, 0, 919, 920, 3, 126, 63, 0, 920, 921, 5, 52, 0, 0, 921, 922, 3, 126,
    63, 0, 922, 171, 1, 0, 0, 0, 64, 173, 178, 184, 198, 210, 222, 233, 252, 254, 266, 275, 300,
    309, 311, 323, 333, 335, 358, 363, 401, 403, 419, 438, 446, 457, 471, 480, 487, 505, 549, 557,
    576, 585, 598, 607, 619, 631, 647, 653, 666, 673, 678, 685, 693, 700, 707, 716, 724, 733, 760,
    771, 778, 780, 785, 790, 801, 819, 832, 846, 858, 868, 882, 894, 908,
  ];

  private static __ATN: antlr.ATN;
  public static get _ATN(): antlr.ATN {
    if (!CsharpParser.__ATN) {
      CsharpParser.__ATN = new antlr.ATNDeserializer().deserialize(CsharpParser._serializedATN);
    }

    return CsharpParser.__ATN;
  }

  private static readonly vocabulary = new antlr.Vocabulary(
    CsharpParser.literalNames,
    CsharpParser.symbolicNames,
    [],
  );

  public override get vocabulary(): antlr.Vocabulary {
    return CsharpParser.vocabulary;
  }

  private static readonly decisionsToDFA = CsharpParser._ATN.decisionToState.map(
    (ds: antlr.DecisionState, index: number) => new antlr.DFA(ds, index),
  );
}

export class FileContext extends antlr.ParserRuleContext {
  public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
    super(parent, invokingState);
  }
  public EOF(): antlr.TerminalNode {
    return this.getToken(CsharpParser.EOF, 0)!;
  }
  public COMMENT(): antlr.TerminalNode | null {
    return this.getToken(CsharpParser.COMMENT, 0);
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
      return this.getTokens(CsharpParser.NL);
    } else {
      return this.getToken(CsharpParser.NL, i);
    }
  }
  public override get ruleIndex(): number {
    return CsharpParser.RULE_file;
  }
  public override enterRule(listener: CsharpListener): void {
    if (listener.enterFile) {
      listener.enterFile(this);
    }
  }
  public override exitRule(listener: CsharpListener): void {
    if (listener.exitFile) {
      listener.exitFile(this);
    }
  }
  public override accept<Result>(visitor: CsharpVisitor<Result>): Result | null {
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
    return CsharpParser.RULE_global;
  }
  public override enterRule(listener: CsharpListener): void {
    if (listener.enterGlobal) {
      listener.enterGlobal(this);
    }
  }
  public override exitRule(listener: CsharpListener): void {
    if (listener.exitGlobal) {
      listener.exitGlobal(this);
    }
  }
  public override accept<Result>(visitor: CsharpVisitor<Result>): Result | null {
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
  public STATIC(): antlr.TerminalNode {
    return this.getToken(CsharpParser.STATIC, 0)!;
  }
  public VOID(): antlr.TerminalNode {
    return this.getToken(CsharpParser.VOID, 0)!;
  }
  public MAIN(): antlr.TerminalNode {
    return this.getToken(CsharpParser.MAIN, 0)!;
  }
  public OPEN_BRACKET(): antlr.TerminalNode {
    return this.getToken(CsharpParser.OPEN_BRACKET, 0)!;
  }
  public CLOSE_BRACKET(): antlr.TerminalNode {
    return this.getToken(CsharpParser.CLOSE_BRACKET, 0)!;
  }
  public OPEN_BRACE(): antlr.TerminalNode {
    return this.getToken(CsharpParser.OPEN_BRACE, 0)!;
  }
  public NL(): antlr.TerminalNode[];
  public NL(i: number): antlr.TerminalNode | null;
  public NL(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    if (i === undefined) {
      return this.getTokens(CsharpParser.NL);
    } else {
      return this.getToken(CsharpParser.NL, i);
    }
  }
  public CLOSE_BRACE(): antlr.TerminalNode {
    return this.getToken(CsharpParser.CLOSE_BRACE, 0)!;
  }
  public COMMENT(): antlr.TerminalNode {
    return this.getToken(CsharpParser.COMMENT, 0)!;
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
    return CsharpParser.RULE_main;
  }
  public override enterRule(listener: CsharpListener): void {
    if (listener.enterMain) {
      listener.enterMain(this);
    }
  }
  public override exitRule(listener: CsharpListener): void {
    if (listener.exitMain) {
      listener.exitMain(this);
    }
  }
  public override accept<Result>(visitor: CsharpVisitor<Result>): Result | null {
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
  public STATIC(): antlr.TerminalNode {
    return this.getToken(CsharpParser.STATIC, 0)!;
  }
  public type(): TypeContext {
    return this.getRuleContext(0, TypeContext)!;
  }
  public methodName(): MethodNameContext {
    return this.getRuleContext(0, MethodNameContext)!;
  }
  public OPEN_BRACKET(): antlr.TerminalNode {
    return this.getToken(CsharpParser.OPEN_BRACKET, 0)!;
  }
  public CLOSE_BRACKET(): antlr.TerminalNode {
    return this.getToken(CsharpParser.CLOSE_BRACKET, 0)!;
  }
  public OPEN_BRACE(): antlr.TerminalNode {
    return this.getToken(CsharpParser.OPEN_BRACE, 0)!;
  }
  public COMMENT(): antlr.TerminalNode[];
  public COMMENT(i: number): antlr.TerminalNode | null;
  public COMMENT(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    if (i === undefined) {
      return this.getTokens(CsharpParser.COMMENT);
    } else {
      return this.getToken(CsharpParser.COMMENT, i);
    }
  }
  public NL(): antlr.TerminalNode[];
  public NL(i: number): antlr.TerminalNode | null;
  public NL(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    if (i === undefined) {
      return this.getTokens(CsharpParser.NL);
    } else {
      return this.getToken(CsharpParser.NL, i);
    }
  }
  public returnStatement(): ReturnStatementContext {
    return this.getRuleContext(0, ReturnStatementContext)!;
  }
  public CLOSE_BRACE(): antlr.TerminalNode {
    return this.getToken(CsharpParser.CLOSE_BRACE, 0)!;
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
    return CsharpParser.RULE_function;
  }
  public override enterRule(listener: CsharpListener): void {
    if (listener.enterFunction) {
      listener.enterFunction(this);
    }
  }
  public override exitRule(listener: CsharpListener): void {
    if (listener.exitFunction) {
      listener.exitFunction(this);
    }
  }
  public override accept<Result>(visitor: CsharpVisitor<Result>): Result | null {
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
  public TEST_CLASS_ANNOT(): antlr.TerminalNode {
    return this.getToken(CsharpParser.TEST_CLASS_ANNOT, 0)!;
  }
  public CLASS(): antlr.TerminalNode {
    return this.getToken(CsharpParser.CLASS, 0)!;
  }
  public typeName(): TypeNameContext {
    return this.getRuleContext(0, TypeNameContext)!;
  }
  public NL(): antlr.TerminalNode[];
  public NL(i: number): antlr.TerminalNode | null;
  public NL(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    if (i === undefined) {
      return this.getTokens(CsharpParser.NL);
    } else {
      return this.getToken(CsharpParser.NL, i);
    }
  }
  public TEST_METHOD_ANNOT(): antlr.TerminalNode {
    return this.getToken(CsharpParser.TEST_METHOD_ANNOT, 0)!;
  }
  public STATIC(): antlr.TerminalNode {
    return this.getToken(CsharpParser.STATIC, 0)!;
  }
  public VOID(): antlr.TerminalNode {
    return this.getToken(CsharpParser.VOID, 0)!;
  }
  public testName(): TestNameContext {
    return this.getRuleContext(0, TestNameContext)!;
  }
  public CLOSE_BRACE(): antlr.TerminalNode {
    return this.getToken(CsharpParser.CLOSE_BRACE, 0)!;
  }
  public COMMENT(): antlr.TerminalNode {
    return this.getToken(CsharpParser.COMMENT, 0)!;
  }
  public assert(): AssertContext[];
  public assert(i: number): AssertContext | null;
  public assert(i?: number): AssertContext[] | AssertContext | null {
    if (i === undefined) {
      return this.getRuleContexts(AssertContext);
    }

    return this.getRuleContext(i, AssertContext);
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
    return CsharpParser.RULE_test;
  }
  public override enterRule(listener: CsharpListener): void {
    if (listener.enterTest) {
      listener.enterTest(this);
    }
  }
  public override exitRule(listener: CsharpListener): void {
    if (listener.exitTest) {
      listener.exitTest(this);
    }
  }
  public override accept<Result>(visitor: CsharpVisitor<Result>): Result | null {
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
  public STATIC(): antlr.TerminalNode {
    return this.getToken(CsharpParser.STATIC, 0)!;
  }
  public VOID(): antlr.TerminalNode {
    return this.getToken(CsharpParser.VOID, 0)!;
  }
  public methodName(): MethodNameContext {
    return this.getRuleContext(0, MethodNameContext)!;
  }
  public OPEN_BRACKET(): antlr.TerminalNode {
    return this.getToken(CsharpParser.OPEN_BRACKET, 0)!;
  }
  public CLOSE_BRACKET(): antlr.TerminalNode {
    return this.getToken(CsharpParser.CLOSE_BRACKET, 0)!;
  }
  public OPEN_BRACE(): antlr.TerminalNode {
    return this.getToken(CsharpParser.OPEN_BRACE, 0)!;
  }
  public COMMENT(): antlr.TerminalNode[];
  public COMMENT(i: number): antlr.TerminalNode | null;
  public COMMENT(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    if (i === undefined) {
      return this.getTokens(CsharpParser.COMMENT);
    } else {
      return this.getToken(CsharpParser.COMMENT, i);
    }
  }
  public NL(): antlr.TerminalNode[];
  public NL(i: number): antlr.TerminalNode | null;
  public NL(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    if (i === undefined) {
      return this.getTokens(CsharpParser.NL);
    } else {
      return this.getToken(CsharpParser.NL, i);
    }
  }
  public CLOSE_BRACE(): antlr.TerminalNode {
    return this.getToken(CsharpParser.CLOSE_BRACE, 0)!;
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
    return CsharpParser.RULE_procedure;
  }
  public override enterRule(listener: CsharpListener): void {
    if (listener.enterProcedure) {
      listener.enterProcedure(this);
    }
  }
  public override exitRule(listener: CsharpListener): void {
    if (listener.exitProcedure) {
      listener.exitProcedure(this);
    }
  }
  public override accept<Result>(visitor: CsharpVisitor<Result>): Result | null {
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
  public CONST(): antlr.TerminalNode {
    return this.getToken(CsharpParser.CONST, 0)!;
  }
  public identifierDef(): IdentifierDefContext {
    return this.getRuleContext(0, IdentifierDefContext)!;
  }
  public EQUAL(): antlr.TerminalNode {
    return this.getToken(CsharpParser.EQUAL, 0)!;
  }
  public constantValue(): ConstantValueContext {
    return this.getRuleContext(0, ConstantValueContext)!;
  }
  public COMMENT(): antlr.TerminalNode {
    return this.getToken(CsharpParser.COMMENT, 0)!;
  }
  public NL(): antlr.TerminalNode {
    return this.getToken(CsharpParser.NL, 0)!;
  }
  public override get ruleIndex(): number {
    return CsharpParser.RULE_constant;
  }
  public override enterRule(listener: CsharpListener): void {
    if (listener.enterConstant) {
      listener.enterConstant(this);
    }
  }
  public override exitRule(listener: CsharpListener): void {
    if (listener.exitConstant) {
      listener.exitConstant(this);
    }
  }
  public override accept<Result>(visitor: CsharpVisitor<Result>): Result | null {
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
    return this.getToken(CsharpParser.ENUM, 0)!;
  }
  public typeName(): TypeNameContext {
    return this.getRuleContext(0, TypeNameContext)!;
  }
  public OPEN_BRACE(): antlr.TerminalNode {
    return this.getToken(CsharpParser.OPEN_BRACE, 0)!;
  }
  public identifierList(): IdentifierListContext {
    return this.getRuleContext(0, IdentifierListContext)!;
  }
  public CLOSE_BRACKET(): antlr.TerminalNode {
    return this.getToken(CsharpParser.CLOSE_BRACKET, 0)!;
  }
  public NL(): antlr.TerminalNode {
    return this.getToken(CsharpParser.NL, 0)!;
  }
  public override get ruleIndex(): number {
    return CsharpParser.RULE_enum;
  }
  public override enterRule(listener: CsharpListener): void {
    if (listener.enterEnum) {
      listener.enterEnum(this);
    }
  }
  public override exitRule(listener: CsharpListener): void {
    if (listener.exitEnum) {
      listener.exitEnum(this);
    }
  }
  public override accept<Result>(visitor: CsharpVisitor<Result>): Result | null {
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
    return this.getToken(CsharpParser.CLASS, 0)!;
  }
  public typeName(): TypeNameContext[];
  public typeName(i: number): TypeNameContext | null;
  public typeName(i?: number): TypeNameContext[] | TypeNameContext | null {
    if (i === undefined) {
      return this.getRuleContexts(TypeNameContext);
    }

    return this.getRuleContext(i, TypeNameContext);
  }
  public OPEN_BRACE(): antlr.TerminalNode {
    return this.getToken(CsharpParser.OPEN_BRACE, 0)!;
  }
  public NL(): antlr.TerminalNode[];
  public NL(i: number): antlr.TerminalNode | null;
  public NL(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    if (i === undefined) {
      return this.getTokens(CsharpParser.NL);
    } else {
      return this.getToken(CsharpParser.NL, i);
    }
  }
  public CLOSE_BRACE(): antlr.TerminalNode {
    return this.getToken(CsharpParser.CLOSE_BRACE, 0)!;
  }
  public COMMENT(): antlr.TerminalNode {
    return this.getToken(CsharpParser.COMMENT, 0)!;
  }
  public COLON(): antlr.TerminalNode | null {
    return this.getToken(CsharpParser.COLON, 0);
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
    return CsharpParser.RULE_concreteClass;
  }
  public override enterRule(listener: CsharpListener): void {
    if (listener.enterConcreteClass) {
      listener.enterConcreteClass(this);
    }
  }
  public override exitRule(listener: CsharpListener): void {
    if (listener.exitConcreteClass) {
      listener.exitConcreteClass(this);
    }
  }
  public override accept<Result>(visitor: CsharpVisitor<Result>): Result | null {
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
    return this.getToken(CsharpParser.ABSTRACT, 0)!;
  }
  public CLASS(): antlr.TerminalNode {
    return this.getToken(CsharpParser.CLASS, 0)!;
  }
  public typeName(): TypeNameContext[];
  public typeName(i: number): TypeNameContext | null;
  public typeName(i?: number): TypeNameContext[] | TypeNameContext | null {
    if (i === undefined) {
      return this.getRuleContexts(TypeNameContext);
    }

    return this.getRuleContext(i, TypeNameContext);
  }
  public OPEN_BRACE(): antlr.TerminalNode {
    return this.getToken(CsharpParser.OPEN_BRACE, 0)!;
  }
  public NL(): antlr.TerminalNode[];
  public NL(i: number): antlr.TerminalNode | null;
  public NL(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    if (i === undefined) {
      return this.getTokens(CsharpParser.NL);
    } else {
      return this.getToken(CsharpParser.NL, i);
    }
  }
  public CLOSE_BRACE(): antlr.TerminalNode {
    return this.getToken(CsharpParser.CLOSE_BRACE, 0)!;
  }
  public COMMENT(): antlr.TerminalNode {
    return this.getToken(CsharpParser.COMMENT, 0)!;
  }
  public COLON(): antlr.TerminalNode | null {
    return this.getToken(CsharpParser.COLON, 0);
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
    return CsharpParser.RULE_abstractClass;
  }
  public override enterRule(listener: CsharpListener): void {
    if (listener.enterAbstractClass) {
      listener.enterAbstractClass(this);
    }
  }
  public override exitRule(listener: CsharpListener): void {
    if (listener.exitAbstractClass) {
      listener.exitAbstractClass(this);
    }
  }
  public override accept<Result>(visitor: CsharpVisitor<Result>): Result | null {
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
    return this.getToken(CsharpParser.NL, 0)!;
  }
  public override get ruleIndex(): number {
    return CsharpParser.RULE_comment;
  }
  public override enterRule(listener: CsharpListener): void {
    if (listener.enterComment) {
      listener.enterComment(this);
    }
  }
  public override exitRule(listener: CsharpListener): void {
    if (listener.exitComment) {
      listener.exitComment(this);
    }
  }
  public override accept<Result>(visitor: CsharpVisitor<Result>): Result | null {
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
    return this.getToken(CsharpParser.COMMENT, 0)!;
  }
  public override get ruleIndex(): number {
    return CsharpParser.RULE_commentText;
  }
  public override enterRule(listener: CsharpListener): void {
    if (listener.enterCommentText) {
      listener.enterCommentText(this);
    }
  }
  public override exitRule(listener: CsharpListener): void {
    if (listener.exitCommentText) {
      listener.exitCommentText(this);
    }
  }
  public override accept<Result>(visitor: CsharpVisitor<Result>): Result | null {
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
    return CsharpParser.RULE_ordinaryStatement;
  }
  public override enterRule(listener: CsharpListener): void {
    if (listener.enterOrdinaryStatement) {
      listener.enterOrdinaryStatement(this);
    }
  }
  public override exitRule(listener: CsharpListener): void {
    if (listener.exitOrdinaryStatement) {
      listener.exitOrdinaryStatement(this);
    }
  }
  public override accept<Result>(visitor: CsharpVisitor<Result>): Result | null {
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
    return this.getToken(CsharpParser.PRINT, 0)!;
  }
  public OPEN_BRACKET(): antlr.TerminalNode {
    return this.getToken(CsharpParser.OPEN_BRACKET, 0)!;
  }
  public CLOSE_BRACKET(): antlr.TerminalNode {
    return this.getToken(CsharpParser.CLOSE_BRACKET, 0)!;
  }
  public SEMI_COLON(): antlr.TerminalNode {
    return this.getToken(CsharpParser.SEMI_COLON, 0)!;
  }
  public NL(): antlr.TerminalNode {
    return this.getToken(CsharpParser.NL, 0)!;
  }
  public expression(): ExpressionContext | null {
    return this.getRuleContext(0, ExpressionContext);
  }
  public override get ruleIndex(): number {
    return CsharpParser.RULE_print;
  }
  public override enterRule(listener: CsharpListener): void {
    if (listener.enterPrint) {
      listener.enterPrint(this);
    }
  }
  public override exitRule(listener: CsharpListener): void {
    if (listener.exitPrint) {
      listener.exitPrint(this);
    }
  }
  public override accept<Result>(visitor: CsharpVisitor<Result>): Result | null {
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
  public VAR(): antlr.TerminalNode {
    return this.getToken(CsharpParser.VAR, 0)!;
  }
  public identifierDef(): IdentifierDefContext {
    return this.getRuleContext(0, IdentifierDefContext)!;
  }
  public SINGLE_EQUALS(): antlr.TerminalNode {
    return this.getToken(CsharpParser.SINGLE_EQUALS, 0)!;
  }
  public expression(): ExpressionContext {
    return this.getRuleContext(0, ExpressionContext)!;
  }
  public SEMI_COLON(): antlr.TerminalNode {
    return this.getToken(CsharpParser.SEMI_COLON, 0)!;
  }
  public NL(): antlr.TerminalNode {
    return this.getToken(CsharpParser.NL, 0)!;
  }
  public override get ruleIndex(): number {
    return CsharpParser.RULE_variableDefinition;
  }
  public override enterRule(listener: CsharpListener): void {
    if (listener.enterVariableDefinition) {
      listener.enterVariableDefinition(this);
    }
  }
  public override exitRule(listener: CsharpListener): void {
    if (listener.exitVariableDefinition) {
      listener.exitVariableDefinition(this);
    }
  }
  public override accept<Result>(visitor: CsharpVisitor<Result>): Result | null {
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
    return this.getToken(CsharpParser.SINGLE_EQUALS, 0)!;
  }
  public expression(): ExpressionContext {
    return this.getRuleContext(0, ExpressionContext)!;
  }
  public SEMI_COLON(): antlr.TerminalNode {
    return this.getToken(CsharpParser.SEMI_COLON, 0)!;
  }
  public COMMENT(): antlr.TerminalNode {
    return this.getToken(CsharpParser.COMMENT, 0)!;
  }
  public NL(): antlr.TerminalNode {
    return this.getToken(CsharpParser.NL, 0)!;
  }
  public override get ruleIndex(): number {
    return CsharpParser.RULE_assignment;
  }
  public override enterRule(listener: CsharpListener): void {
    if (listener.enterAssignment) {
      listener.enterAssignment(this);
    }
  }
  public override exitRule(listener: CsharpListener): void {
    if (listener.exitAssignment) {
      listener.exitAssignment(this);
    }
  }
  public override accept<Result>(visitor: CsharpVisitor<Result>): Result | null {
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
  public identifierDef(): IdentifierDefContext {
    return this.getRuleContext(0, IdentifierDefContext)!;
  }
  public EQUAL(): antlr.TerminalNode {
    return this.getToken(CsharpParser.EQUAL, 0)!;
  }
  public INPUT(): antlr.TerminalNode {
    return this.getToken(CsharpParser.INPUT, 0)!;
  }
  public OPEN_BRACKET(): antlr.TerminalNode {
    return this.getToken(CsharpParser.OPEN_BRACKET, 0)!;
  }
  public expression(): ExpressionContext {
    return this.getRuleContext(0, ExpressionContext)!;
  }
  public CLOSE_BRACKET(): antlr.TerminalNode {
    return this.getToken(CsharpParser.CLOSE_BRACKET, 0)!;
  }
  public SEMI_COLON(): antlr.TerminalNode {
    return this.getToken(CsharpParser.SEMI_COLON, 0)!;
  }
  public NL(): antlr.TerminalNode {
    return this.getToken(CsharpParser.NL, 0)!;
  }
  public override get ruleIndex(): number {
    return CsharpParser.RULE_inputStatement;
  }
  public override enterRule(listener: CsharpListener): void {
    if (listener.enterInputStatement) {
      listener.enterInputStatement(this);
    }
  }
  public override exitRule(listener: CsharpListener): void {
    if (listener.exitInputStatement) {
      listener.exitInputStatement(this);
    }
  }
  public override accept<Result>(visitor: CsharpVisitor<Result>): Result | null {
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
    return this.getToken(CsharpParser.IF, 0)!;
  }
  public OPEN_BRACKET(): antlr.TerminalNode {
    return this.getToken(CsharpParser.OPEN_BRACKET, 0)!;
  }
  public expression(): ExpressionContext {
    return this.getRuleContext(0, ExpressionContext)!;
  }
  public CLOSE_BRACKET(): antlr.TerminalNode {
    return this.getToken(CsharpParser.CLOSE_BRACKET, 0)!;
  }
  public OPEN_BRACE(): antlr.TerminalNode {
    return this.getToken(CsharpParser.OPEN_BRACE, 0)!;
  }
  public NL(): antlr.TerminalNode[];
  public NL(i: number): antlr.TerminalNode | null;
  public NL(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    if (i === undefined) {
      return this.getTokens(CsharpParser.NL);
    } else {
      return this.getToken(CsharpParser.NL, i);
    }
  }
  public CLOSE_BRACE(): antlr.TerminalNode {
    return this.getToken(CsharpParser.CLOSE_BRACE, 0)!;
  }
  public COMMENT(): antlr.TerminalNode {
    return this.getToken(CsharpParser.COMMENT, 0)!;
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
    return CsharpParser.RULE_ifStatement;
  }
  public override enterRule(listener: CsharpListener): void {
    if (listener.enterIfStatement) {
      listener.enterIfStatement(this);
    }
  }
  public override exitRule(listener: CsharpListener): void {
    if (listener.exitIfStatement) {
      listener.exitIfStatement(this);
    }
  }
  public override accept<Result>(visitor: CsharpVisitor<Result>): Result | null {
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
    return this.getToken(CsharpParser.WHILE, 0)!;
  }
  public OPEN_BRACKET(): antlr.TerminalNode {
    return this.getToken(CsharpParser.OPEN_BRACKET, 0)!;
  }
  public expression(): ExpressionContext {
    return this.getRuleContext(0, ExpressionContext)!;
  }
  public CLOSE_BRACKET(): antlr.TerminalNode {
    return this.getToken(CsharpParser.CLOSE_BRACKET, 0)!;
  }
  public OPEN_BRACE(): antlr.TerminalNode {
    return this.getToken(CsharpParser.OPEN_BRACE, 0)!;
  }
  public NL(): antlr.TerminalNode[];
  public NL(i: number): antlr.TerminalNode | null;
  public NL(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    if (i === undefined) {
      return this.getTokens(CsharpParser.NL);
    } else {
      return this.getToken(CsharpParser.NL, i);
    }
  }
  public CLOSE_BRACE(): antlr.TerminalNode {
    return this.getToken(CsharpParser.CLOSE_BRACE, 0)!;
  }
  public COMMENT(): antlr.TerminalNode {
    return this.getToken(CsharpParser.COMMENT, 0)!;
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
    return CsharpParser.RULE_whileLoop;
  }
  public override enterRule(listener: CsharpListener): void {
    if (listener.enterWhileLoop) {
      listener.enterWhileLoop(this);
    }
  }
  public override exitRule(listener: CsharpListener): void {
    if (listener.exitWhileLoop) {
      listener.exitWhileLoop(this);
    }
  }
  public override accept<Result>(visitor: CsharpVisitor<Result>): Result | null {
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
  public FOREACH(): antlr.TerminalNode {
    return this.getToken(CsharpParser.FOREACH, 0)!;
  }
  public OPEN_BRACKET(): antlr.TerminalNode {
    return this.getToken(CsharpParser.OPEN_BRACKET, 0)!;
  }
  public VAR(): antlr.TerminalNode {
    return this.getToken(CsharpParser.VAR, 0)!;
  }
  public identifierDef(): IdentifierDefContext {
    return this.getRuleContext(0, IdentifierDefContext)!;
  }
  public IN(): antlr.TerminalNode {
    return this.getToken(CsharpParser.IN, 0)!;
  }
  public expression(): ExpressionContext {
    return this.getRuleContext(0, ExpressionContext)!;
  }
  public CLOSE_BRACKET(): antlr.TerminalNode {
    return this.getToken(CsharpParser.CLOSE_BRACKET, 0)!;
  }
  public OPEN_BRACE(): antlr.TerminalNode {
    return this.getToken(CsharpParser.OPEN_BRACE, 0)!;
  }
  public NL(): antlr.TerminalNode[];
  public NL(i: number): antlr.TerminalNode | null;
  public NL(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    if (i === undefined) {
      return this.getTokens(CsharpParser.NL);
    } else {
      return this.getToken(CsharpParser.NL, i);
    }
  }
  public CLOSE_BRACE(): antlr.TerminalNode {
    return this.getToken(CsharpParser.CLOSE_BRACE, 0)!;
  }
  public COMMENT(): antlr.TerminalNode {
    return this.getToken(CsharpParser.COMMENT, 0)!;
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
    return CsharpParser.RULE_forLoop;
  }
  public override enterRule(listener: CsharpListener): void {
    if (listener.enterForLoop) {
      listener.enterForLoop(this);
    }
  }
  public override exitRule(listener: CsharpListener): void {
    if (listener.exitForLoop) {
      listener.exitForLoop(this);
    }
  }
  public override accept<Result>(visitor: CsharpVisitor<Result>): Result | null {
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
  public procRef(): ProcRefContext {
    return this.getRuleContext(0, ProcRefContext)!;
  }
  public OPEN_BRACKET(): antlr.TerminalNode {
    return this.getToken(CsharpParser.OPEN_BRACKET, 0)!;
  }
  public argList(): ArgListContext {
    return this.getRuleContext(0, ArgListContext)!;
  }
  public CLOSE_BRACKET(): antlr.TerminalNode {
    return this.getToken(CsharpParser.CLOSE_BRACKET, 0)!;
  }
  public NL(): antlr.TerminalNode {
    return this.getToken(CsharpParser.NL, 0)!;
  }
  public GHOSTED(): antlr.TerminalNode | null {
    return this.getToken(CsharpParser.GHOSTED, 0);
  }
  public override get ruleIndex(): number {
    return CsharpParser.RULE_procedureCall;
  }
  public override enterRule(listener: CsharpListener): void {
    if (listener.enterProcedureCall) {
      listener.enterProcedureCall(this);
    }
  }
  public override exitRule(listener: CsharpListener): void {
    if (listener.exitProcedureCall) {
      listener.exitProcedureCall(this);
    }
  }
  public override accept<Result>(visitor: CsharpVisitor<Result>): Result | null {
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
    return CsharpParser.RULE_procRef;
  }
  public override enterRule(listener: CsharpListener): void {
    if (listener.enterProcRef) {
      listener.enterProcRef(this);
    }
  }
  public override exitRule(listener: CsharpListener): void {
    if (listener.exitProcRef) {
      listener.exitProcRef(this);
    }
  }
  public override accept<Result>(visitor: CsharpVisitor<Result>): Result | null {
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
    return this.getToken(CsharpParser.THIS_INSTANCE, 0)!;
  }
  public DOT(): antlr.TerminalNode {
    return this.getToken(CsharpParser.DOT, 0)!;
  }
  public methodName(): MethodNameContext {
    return this.getRuleContext(0, MethodNameContext)!;
  }
  public override get ruleIndex(): number {
    return CsharpParser.RULE_thisProcRef;
  }
  public override enterRule(listener: CsharpListener): void {
    if (listener.enterThisProcRef) {
      listener.enterThisProcRef(this);
    }
  }
  public override exitRule(listener: CsharpListener): void {
    if (listener.exitThisProcRef) {
      listener.exitThisProcRef(this);
    }
  }
  public override accept<Result>(visitor: CsharpVisitor<Result>): Result | null {
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
    return this.getToken(CsharpParser.DOT, 0)!;
  }
  public methodName(): MethodNameContext {
    return this.getRuleContext(0, MethodNameContext)!;
  }
  public override get ruleIndex(): number {
    return CsharpParser.RULE_instanceProcRef;
  }
  public override enterRule(listener: CsharpListener): void {
    if (listener.enterInstanceProcRef) {
      listener.enterInstanceProcRef(this);
    }
  }
  public override exitRule(listener: CsharpListener): void {
    if (listener.exitInstanceProcRef) {
      listener.exitInstanceProcRef(this);
    }
  }
  public override accept<Result>(visitor: CsharpVisitor<Result>): Result | null {
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
    return CsharpParser.RULE_identifierWithOptIndexes;
  }
  public override enterRule(listener: CsharpListener): void {
    if (listener.enterIdentifierWithOptIndexes) {
      listener.enterIdentifierWithOptIndexes(this);
    }
  }
  public override exitRule(listener: CsharpListener): void {
    if (listener.exitIdentifierWithOptIndexes) {
      listener.exitIdentifierWithOptIndexes(this);
    }
  }
  public override accept<Result>(visitor: CsharpVisitor<Result>): Result | null {
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
  public TRY(): antlr.TerminalNode {
    return this.getToken(CsharpParser.TRY, 0)!;
  }
  public OPEN_BRACE(): antlr.TerminalNode {
    return this.getToken(CsharpParser.OPEN_BRACE, 0)!;
  }
  public NL(): antlr.TerminalNode[];
  public NL(i: number): antlr.TerminalNode | null;
  public NL(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    if (i === undefined) {
      return this.getTokens(CsharpParser.NL);
    } else {
      return this.getToken(CsharpParser.NL, i);
    }
  }
  public catchStatement(): CatchStatementContext {
    return this.getRuleContext(0, CatchStatementContext)!;
  }
  public CLOSE_BRACE(): antlr.TerminalNode {
    return this.getToken(CsharpParser.CLOSE_BRACE, 0)!;
  }
  public COMMENT(): antlr.TerminalNode {
    return this.getToken(CsharpParser.COMMENT, 0)!;
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
    return CsharpParser.RULE_tryStatement;
  }
  public override enterRule(listener: CsharpListener): void {
    if (listener.enterTryStatement) {
      listener.enterTryStatement(this);
    }
  }
  public override exitRule(listener: CsharpListener): void {
    if (listener.exitTryStatement) {
      listener.exitTryStatement(this);
    }
  }
  public override accept<Result>(visitor: CsharpVisitor<Result>): Result | null {
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
    return this.getToken(CsharpParser.THROW, 0)!;
  }
  public NEW(): antlr.TerminalNode {
    return this.getToken(CsharpParser.NEW, 0)!;
  }
  public typeName(): TypeNameContext {
    return this.getRuleContext(0, TypeNameContext)!;
  }
  public OPEN_BRACKET(): antlr.TerminalNode {
    return this.getToken(CsharpParser.OPEN_BRACKET, 0)!;
  }
  public errorMessage(): ErrorMessageContext {
    return this.getRuleContext(0, ErrorMessageContext)!;
  }
  public CLOSE_BRACKET(): antlr.TerminalNode {
    return this.getToken(CsharpParser.CLOSE_BRACKET, 0)!;
  }
  public SEMI_COLON(): antlr.TerminalNode {
    return this.getToken(CsharpParser.SEMI_COLON, 0)!;
  }
  public NL(): antlr.TerminalNode {
    return this.getToken(CsharpParser.NL, 0)!;
  }
  public override get ruleIndex(): number {
    return CsharpParser.RULE_throwStatement;
  }
  public override enterRule(listener: CsharpListener): void {
    if (listener.enterThrowStatement) {
      listener.enterThrowStatement(this);
    }
  }
  public override exitRule(listener: CsharpListener): void {
    if (listener.exitThrowStatement) {
      listener.exitThrowStatement(this);
    }
  }
  public override accept<Result>(visitor: CsharpVisitor<Result>): Result | null {
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
    return CsharpParser.RULE_errorMessage;
  }
  public override enterRule(listener: CsharpListener): void {
    if (listener.enterErrorMessage) {
      listener.enterErrorMessage(this);
    }
  }
  public override exitRule(listener: CsharpListener): void {
    if (listener.exitErrorMessage) {
      listener.exitErrorMessage(this);
    }
  }
  public override accept<Result>(visitor: CsharpVisitor<Result>): Result | null {
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
    return this.getToken(CsharpParser.ASSERT, 0)!;
  }
  public DOT(): antlr.TerminalNode {
    return this.getToken(CsharpParser.DOT, 0)!;
  }
  public ARE_EQUAL(): antlr.TerminalNode {
    return this.getToken(CsharpParser.ARE_EQUAL, 0)!;
  }
  public OPEN_BRACKET(): antlr.TerminalNode {
    return this.getToken(CsharpParser.OPEN_BRACKET, 0)!;
  }
  public assertActual(): AssertActualContext {
    return this.getRuleContext(0, AssertActualContext)!;
  }
  public COMMA(): antlr.TerminalNode {
    return this.getToken(CsharpParser.COMMA, 0)!;
  }
  public expression(): ExpressionContext {
    return this.getRuleContext(0, ExpressionContext)!;
  }
  public CLOSE_BRACKET(): antlr.TerminalNode {
    return this.getToken(CsharpParser.CLOSE_BRACKET, 0)!;
  }
  public SEMI_COLON(): antlr.TerminalNode {
    return this.getToken(CsharpParser.SEMI_COLON, 0)!;
  }
  public NL(): antlr.TerminalNode {
    return this.getToken(CsharpParser.NL, 0)!;
  }
  public override get ruleIndex(): number {
    return CsharpParser.RULE_assert;
  }
  public override enterRule(listener: CsharpListener): void {
    if (listener.enterAssert) {
      listener.enterAssert(this);
    }
  }
  public override exitRule(listener: CsharpListener): void {
    if (listener.exitAssert) {
      listener.exitAssert(this);
    }
  }
  public override accept<Result>(visitor: CsharpVisitor<Result>): Result | null {
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
    return this.getToken(CsharpParser.RETURN, 0)!;
  }
  public expression(): ExpressionContext {
    return this.getRuleContext(0, ExpressionContext)!;
  }
  public SEMI_COLON(): antlr.TerminalNode {
    return this.getToken(CsharpParser.SEMI_COLON, 0)!;
  }
  public NL(): antlr.TerminalNode {
    return this.getToken(CsharpParser.NL, 0)!;
  }
  public override get ruleIndex(): number {
    return CsharpParser.RULE_returnStatement;
  }
  public override enterRule(listener: CsharpListener): void {
    if (listener.enterReturnStatement) {
      listener.enterReturnStatement(this);
    }
  }
  public override exitRule(listener: CsharpListener): void {
    if (listener.exitReturnStatement) {
      listener.exitReturnStatement(this);
    }
  }
  public override accept<Result>(visitor: CsharpVisitor<Result>): Result | null {
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
  public CLOSE_BRACE(): antlr.TerminalNode {
    return this.getToken(CsharpParser.CLOSE_BRACE, 0)!;
  }
  public ELSE(): antlr.TerminalNode {
    return this.getToken(CsharpParser.ELSE, 0)!;
  }
  public IF(): antlr.TerminalNode {
    return this.getToken(CsharpParser.IF, 0)!;
  }
  public OPEN_BRACKET(): antlr.TerminalNode {
    return this.getToken(CsharpParser.OPEN_BRACKET, 0)!;
  }
  public expression(): ExpressionContext {
    return this.getRuleContext(0, ExpressionContext)!;
  }
  public CLOSE_BRACKET(): antlr.TerminalNode {
    return this.getToken(CsharpParser.CLOSE_BRACKET, 0)!;
  }
  public OPEN_BRACE(): antlr.TerminalNode {
    return this.getToken(CsharpParser.OPEN_BRACE, 0)!;
  }
  public NL(): antlr.TerminalNode {
    return this.getToken(CsharpParser.NL, 0)!;
  }
  public override get ruleIndex(): number {
    return CsharpParser.RULE_elseIfClause;
  }
  public override enterRule(listener: CsharpListener): void {
    if (listener.enterElseIfClause) {
      listener.enterElseIfClause(this);
    }
  }
  public override exitRule(listener: CsharpListener): void {
    if (listener.exitElseIfClause) {
      listener.exitElseIfClause(this);
    }
  }
  public override accept<Result>(visitor: CsharpVisitor<Result>): Result | null {
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
  public CLOSE_BRACE(): antlr.TerminalNode {
    return this.getToken(CsharpParser.CLOSE_BRACE, 0)!;
  }
  public ELSE(): antlr.TerminalNode {
    return this.getToken(CsharpParser.ELSE, 0)!;
  }
  public OPEN_BRACE(): antlr.TerminalNode {
    return this.getToken(CsharpParser.OPEN_BRACE, 0)!;
  }
  public NL(): antlr.TerminalNode {
    return this.getToken(CsharpParser.NL, 0)!;
  }
  public override get ruleIndex(): number {
    return CsharpParser.RULE_elseClause;
  }
  public override enterRule(listener: CsharpListener): void {
    if (listener.enterElseClause) {
      listener.enterElseClause(this);
    }
  }
  public override exitRule(listener: CsharpListener): void {
    if (listener.exitElseClause) {
      listener.exitElseClause(this);
    }
  }
  public override accept<Result>(visitor: CsharpVisitor<Result>): Result | null {
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
  public CLOSE_BRACE(): antlr.TerminalNode {
    return this.getToken(CsharpParser.CLOSE_BRACE, 0)!;
  }
  public CATCH(): antlr.TerminalNode {
    return this.getToken(CsharpParser.CATCH, 0)!;
  }
  public OPEN_BRACKET(): antlr.TerminalNode {
    return this.getToken(CsharpParser.OPEN_BRACKET, 0)!;
  }
  public typeName(): TypeNameContext {
    return this.getRuleContext(0, TypeNameContext)!;
  }
  public identifierDef(): IdentifierDefContext {
    return this.getRuleContext(0, IdentifierDefContext)!;
  }
  public CLOSE_BRACKET(): antlr.TerminalNode {
    return this.getToken(CsharpParser.CLOSE_BRACKET, 0)!;
  }
  public OPEN_BRACE(): antlr.TerminalNode {
    return this.getToken(CsharpParser.OPEN_BRACE, 0)!;
  }
  public NL(): antlr.TerminalNode {
    return this.getToken(CsharpParser.NL, 0)!;
  }
  public override get ruleIndex(): number {
    return CsharpParser.RULE_catchStatement;
  }
  public override enterRule(listener: CsharpListener): void {
    if (listener.enterCatchStatement) {
      listener.enterCatchStatement(this);
    }
  }
  public override exitRule(listener: CsharpListener): void {
    if (listener.exitCatchStatement) {
      listener.exitCatchStatement(this);
    }
  }
  public override accept<Result>(visitor: CsharpVisitor<Result>): Result | null {
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
  public PUBLIC(): antlr.TerminalNode {
    return this.getToken(CsharpParser.PUBLIC, 0)!;
  }
  public OPEN_BRACKET(): antlr.TerminalNode {
    return this.getToken(CsharpParser.OPEN_BRACKET, 0)!;
  }
  public CLOSE_BRACKET(): antlr.TerminalNode {
    return this.getToken(CsharpParser.CLOSE_BRACKET, 0)!;
  }
  public OPEN_BRACE(): antlr.TerminalNode {
    return this.getToken(CsharpParser.OPEN_BRACE, 0)!;
  }
  public NL(): antlr.TerminalNode[];
  public NL(i: number): antlr.TerminalNode | null;
  public NL(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    if (i === undefined) {
      return this.getTokens(CsharpParser.NL);
    } else {
      return this.getToken(CsharpParser.NL, i);
    }
  }
  public CLOSE_BRACE(): antlr.TerminalNode {
    return this.getToken(CsharpParser.CLOSE_BRACE, 0)!;
  }
  public COMMENT(): antlr.TerminalNode {
    return this.getToken(CsharpParser.COMMENT, 0)!;
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
    return CsharpParser.RULE_constructorMember;
  }
  public override enterRule(listener: CsharpListener): void {
    if (listener.enterConstructorMember) {
      listener.enterConstructorMember(this);
    }
  }
  public override exitRule(listener: CsharpListener): void {
    if (listener.exitConstructorMember) {
      listener.exitConstructorMember(this);
    }
  }
  public override accept<Result>(visitor: CsharpVisitor<Result>): Result | null {
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
  public PUBLIC(): antlr.TerminalNode {
    return this.getToken(CsharpParser.PUBLIC, 0)!;
  }
  public type(): TypeContext {
    return this.getRuleContext(0, TypeContext)!;
  }
  public identifierDef(): IdentifierDefContext {
    return this.getRuleContext(0, IdentifierDefContext)!;
  }
  public GET_SET(): antlr.TerminalNode {
    return this.getToken(CsharpParser.GET_SET, 0)!;
  }
  public COMMENT(): antlr.TerminalNode {
    return this.getToken(CsharpParser.COMMENT, 0)!;
  }
  public NL(): antlr.TerminalNode {
    return this.getToken(CsharpParser.NL, 0)!;
  }
  public override get ruleIndex(): number {
    return CsharpParser.RULE_property;
  }
  public override enterRule(listener: CsharpListener): void {
    if (listener.enterProperty) {
      listener.enterProperty(this);
    }
  }
  public override exitRule(listener: CsharpListener): void {
    if (listener.exitProperty) {
      listener.exitProperty(this);
    }
  }
  public override accept<Result>(visitor: CsharpVisitor<Result>): Result | null {
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
  public PUBLIC(): antlr.TerminalNode {
    return this.getToken(CsharpParser.PUBLIC, 0)!;
  }
  public type(): TypeContext {
    return this.getRuleContext(0, TypeContext)!;
  }
  public methodName(): MethodNameContext {
    return this.getRuleContext(0, MethodNameContext)!;
  }
  public OPEN_BRACKET(): antlr.TerminalNode {
    return this.getToken(CsharpParser.OPEN_BRACKET, 0)!;
  }
  public CLOSE_BRACKET(): antlr.TerminalNode {
    return this.getToken(CsharpParser.CLOSE_BRACKET, 0)!;
  }
  public OPEN_BRACE(): antlr.TerminalNode {
    return this.getToken(CsharpParser.OPEN_BRACE, 0)!;
  }
  public COMMENT(): antlr.TerminalNode[];
  public COMMENT(i: number): antlr.TerminalNode | null;
  public COMMENT(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    if (i === undefined) {
      return this.getTokens(CsharpParser.COMMENT);
    } else {
      return this.getToken(CsharpParser.COMMENT, i);
    }
  }
  public NL(): antlr.TerminalNode[];
  public NL(i: number): antlr.TerminalNode | null;
  public NL(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    if (i === undefined) {
      return this.getTokens(CsharpParser.NL);
    } else {
      return this.getToken(CsharpParser.NL, i);
    }
  }
  public returnStatement(): ReturnStatementContext {
    return this.getRuleContext(0, ReturnStatementContext)!;
  }
  public CLOSE_BRACE(): antlr.TerminalNode {
    return this.getToken(CsharpParser.CLOSE_BRACE, 0)!;
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
    return CsharpParser.RULE_functionMethod;
  }
  public override enterRule(listener: CsharpListener): void {
    if (listener.enterFunctionMethod) {
      listener.enterFunctionMethod(this);
    }
  }
  public override exitRule(listener: CsharpListener): void {
    if (listener.exitFunctionMethod) {
      listener.exitFunctionMethod(this);
    }
  }
  public override accept<Result>(visitor: CsharpVisitor<Result>): Result | null {
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
  public PUBLIC(): antlr.TerminalNode {
    return this.getToken(CsharpParser.PUBLIC, 0)!;
  }
  public VOID(): antlr.TerminalNode {
    return this.getToken(CsharpParser.VOID, 0)!;
  }
  public methodName(): MethodNameContext {
    return this.getRuleContext(0, MethodNameContext)!;
  }
  public OPEN_BRACKET(): antlr.TerminalNode {
    return this.getToken(CsharpParser.OPEN_BRACKET, 0)!;
  }
  public CLOSE_BRACKET(): antlr.TerminalNode {
    return this.getToken(CsharpParser.CLOSE_BRACKET, 0)!;
  }
  public OPEN_BRACE(): antlr.TerminalNode {
    return this.getToken(CsharpParser.OPEN_BRACE, 0)!;
  }
  public COMMENT(): antlr.TerminalNode[];
  public COMMENT(i: number): antlr.TerminalNode | null;
  public COMMENT(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    if (i === undefined) {
      return this.getTokens(CsharpParser.COMMENT);
    } else {
      return this.getToken(CsharpParser.COMMENT, i);
    }
  }
  public NL(): antlr.TerminalNode[];
  public NL(i: number): antlr.TerminalNode | null;
  public NL(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    if (i === undefined) {
      return this.getTokens(CsharpParser.NL);
    } else {
      return this.getToken(CsharpParser.NL, i);
    }
  }
  public CLOSE_BRACE(): antlr.TerminalNode {
    return this.getToken(CsharpParser.CLOSE_BRACE, 0)!;
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
    return CsharpParser.RULE_procedureMethod;
  }
  public override enterRule(listener: CsharpListener): void {
    if (listener.enterProcedureMethod) {
      listener.enterProcedureMethod(this);
    }
  }
  public override exitRule(listener: CsharpListener): void {
    if (listener.exitProcedureMethod) {
      listener.exitProcedureMethod(this);
    }
  }
  public override accept<Result>(visitor: CsharpVisitor<Result>): Result | null {
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
    return this.getToken(CsharpParser.ABSTRACT, 0)!;
  }
  public type(): TypeContext {
    return this.getRuleContext(0, TypeContext)!;
  }
  public methodName(): MethodNameContext {
    return this.getRuleContext(0, MethodNameContext)!;
  }
  public OPEN_BRACKET(): antlr.TerminalNode {
    return this.getToken(CsharpParser.OPEN_BRACKET, 0)!;
  }
  public CLOSE_BRACKET(): antlr.TerminalNode {
    return this.getToken(CsharpParser.CLOSE_BRACKET, 0)!;
  }
  public SEMI_COLON(): antlr.TerminalNode {
    return this.getToken(CsharpParser.SEMI_COLON, 0)!;
  }
  public COMMENT(): antlr.TerminalNode {
    return this.getToken(CsharpParser.COMMENT, 0)!;
  }
  public NL(): antlr.TerminalNode {
    return this.getToken(CsharpParser.NL, 0)!;
  }
  public paramList(): ParamListContext | null {
    return this.getRuleContext(0, ParamListContext);
  }
  public override get ruleIndex(): number {
    return CsharpParser.RULE_abstractFunction;
  }
  public override enterRule(listener: CsharpListener): void {
    if (listener.enterAbstractFunction) {
      listener.enterAbstractFunction(this);
    }
  }
  public override exitRule(listener: CsharpListener): void {
    if (listener.exitAbstractFunction) {
      listener.exitAbstractFunction(this);
    }
  }
  public override accept<Result>(visitor: CsharpVisitor<Result>): Result | null {
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
    return this.getToken(CsharpParser.ABSTRACT, 0)!;
  }
  public VOID(): antlr.TerminalNode {
    return this.getToken(CsharpParser.VOID, 0)!;
  }
  public methodName(): MethodNameContext {
    return this.getRuleContext(0, MethodNameContext)!;
  }
  public OPEN_BRACKET(): antlr.TerminalNode {
    return this.getToken(CsharpParser.OPEN_BRACKET, 0)!;
  }
  public CLOSE_BRACKET(): antlr.TerminalNode {
    return this.getToken(CsharpParser.CLOSE_BRACKET, 0)!;
  }
  public SEMI_COLON(): antlr.TerminalNode {
    return this.getToken(CsharpParser.SEMI_COLON, 0)!;
  }
  public COMMENT(): antlr.TerminalNode {
    return this.getToken(CsharpParser.COMMENT, 0)!;
  }
  public NL(): antlr.TerminalNode {
    return this.getToken(CsharpParser.NL, 0)!;
  }
  public paramList(): ParamListContext | null {
    return this.getRuleContext(0, ParamListContext);
  }
  public override get ruleIndex(): number {
    return CsharpParser.RULE_abstractProcedure;
  }
  public override enterRule(listener: CsharpListener): void {
    if (listener.enterAbstractProcedure) {
      listener.enterAbstractProcedure(this);
    }
  }
  public override exitRule(listener: CsharpListener): void {
    if (listener.exitAbstractProcedure) {
      listener.exitAbstractProcedure(this);
    }
  }
  public override accept<Result>(visitor: CsharpVisitor<Result>): Result | null {
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
    return this.getToken(CsharpParser.NAME_STARTING_LC, 0)!;
  }
  public override get ruleIndex(): number {
    return CsharpParser.RULE_identifierDef;
  }
  public override enterRule(listener: CsharpListener): void {
    if (listener.enterIdentifierDef) {
      listener.enterIdentifierDef(this);
    }
  }
  public override exitRule(listener: CsharpListener): void {
    if (listener.exitIdentifierDef) {
      listener.exitIdentifierDef(this);
    }
  }
  public override accept<Result>(visitor: CsharpVisitor<Result>): Result | null {
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
    return this.getToken(CsharpParser.NAME_STARTING_LC, 0)!;
  }
  public override get ruleIndex(): number {
    return CsharpParser.RULE_identifierUse;
  }
  public override enterRule(listener: CsharpListener): void {
    if (listener.enterIdentifierUse) {
      listener.enterIdentifierUse(this);
    }
  }
  public override exitRule(listener: CsharpListener): void {
    if (listener.exitIdentifierUse) {
      listener.exitIdentifierUse(this);
    }
  }
  public override accept<Result>(visitor: CsharpVisitor<Result>): Result | null {
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
    return this.getToken(CsharpParser.THIS_INSTANCE, 0);
  }
  public DOT(): antlr.TerminalNode | null {
    return this.getToken(CsharpParser.DOT, 0);
  }
  public assignable(): AssignableContext | null {
    return this.getRuleContext(0, AssignableContext);
  }
  public index(): IndexContext | null {
    return this.getRuleContext(0, IndexContext);
  }
  public override get ruleIndex(): number {
    return CsharpParser.RULE_assignable;
  }
  public override enterRule(listener: CsharpListener): void {
    if (listener.enterAssignable) {
      listener.enterAssignable(this);
    }
  }
  public override exitRule(listener: CsharpListener): void {
    if (listener.exitAssignable) {
      listener.exitAssignable(this);
    }
  }
  public override accept<Result>(visitor: CsharpVisitor<Result>): Result | null {
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
    return this.getToken(CsharpParser.NAME_STARTING_LC, 0)!;
  }
  public override get ruleIndex(): number {
    return CsharpParser.RULE_methodName;
  }
  public override enterRule(listener: CsharpListener): void {
    if (listener.enterMethodName) {
      listener.enterMethodName(this);
    }
  }
  public override exitRule(listener: CsharpListener): void {
    if (listener.exitMethodName) {
      listener.exitMethodName(this);
    }
  }
  public override accept<Result>(visitor: CsharpVisitor<Result>): Result | null {
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
    return this.getToken(CsharpParser.NAME_STARTING_TEST_, 0)!;
  }
  public override get ruleIndex(): number {
    return CsharpParser.RULE_testName;
  }
  public override enterRule(listener: CsharpListener): void {
    if (listener.enterTestName) {
      listener.enterTestName(this);
    }
  }
  public override exitRule(listener: CsharpListener): void {
    if (listener.exitTestName) {
      listener.exitTestName(this);
    }
  }
  public override accept<Result>(visitor: CsharpVisitor<Result>): Result | null {
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
    return this.getToken(CsharpParser.INT_NAME, 0);
  }
  public FLOAT_NAME(): antlr.TerminalNode | null {
    return this.getToken(CsharpParser.FLOAT_NAME, 0);
  }
  public BOOL_NAME(): antlr.TerminalNode | null {
    return this.getToken(CsharpParser.BOOL_NAME, 0);
  }
  public STRING_NAME(): antlr.TerminalNode | null {
    return this.getToken(CsharpParser.STRING_NAME, 0);
  }
  public LIST_NAME(): antlr.TerminalNode | null {
    return this.getToken(CsharpParser.LIST_NAME, 0);
  }
  public NAME_STARTING_UC(): antlr.TerminalNode | null {
    return this.getToken(CsharpParser.NAME_STARTING_UC, 0);
  }
  public override get ruleIndex(): number {
    return CsharpParser.RULE_typeName;
  }
  public override enterRule(listener: CsharpListener): void {
    if (listener.enterTypeName) {
      listener.enterTypeName(this);
    }
  }
  public override exitRule(listener: CsharpListener): void {
    if (listener.exitTypeName) {
      listener.exitTypeName(this);
    }
  }
  public override accept<Result>(visitor: CsharpVisitor<Result>): Result | null {
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
    return CsharpParser.RULE_constantValue;
  }
  public override enterRule(listener: CsharpListener): void {
    if (listener.enterConstantValue) {
      listener.enterConstantValue(this);
    }
  }
  public override exitRule(listener: CsharpListener): void {
    if (listener.exitConstantValue) {
      listener.exitConstantValue(this);
    }
  }
  public override accept<Result>(visitor: CsharpVisitor<Result>): Result | null {
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
      return this.getTokens(CsharpParser.COMMA);
    } else {
      return this.getToken(CsharpParser.COMMA, i);
    }
  }
  public override get ruleIndex(): number {
    return CsharpParser.RULE_argList;
  }
  public override enterRule(listener: CsharpListener): void {
    if (listener.enterArgList) {
      listener.enterArgList(this);
    }
  }
  public override exitRule(listener: CsharpListener): void {
    if (listener.exitArgList) {
      listener.exitArgList(this);
    }
  }
  public override accept<Result>(visitor: CsharpVisitor<Result>): Result | null {
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
    return CsharpParser.RULE_argument;
  }
  public override enterRule(listener: CsharpListener): void {
    if (listener.enterArgument) {
      listener.enterArgument(this);
    }
  }
  public override exitRule(listener: CsharpListener): void {
    if (listener.exitArgument) {
      listener.exitArgument(this);
    }
  }
  public override accept<Result>(visitor: CsharpVisitor<Result>): Result | null {
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
      return this.getTokens(CsharpParser.COMMA);
    } else {
      return this.getToken(CsharpParser.COMMA, i);
    }
  }
  public override get ruleIndex(): number {
    return CsharpParser.RULE_paramList;
  }
  public override enterRule(listener: CsharpListener): void {
    if (listener.enterParamList) {
      listener.enterParamList(this);
    }
  }
  public override exitRule(listener: CsharpListener): void {
    if (listener.exitParamList) {
      listener.exitParamList(this);
    }
  }
  public override accept<Result>(visitor: CsharpVisitor<Result>): Result | null {
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
      return this.getTokens(CsharpParser.COMMA);
    } else {
      return this.getToken(CsharpParser.COMMA, i);
    }
  }
  public override get ruleIndex(): number {
    return CsharpParser.RULE_identifierList;
  }
  public override enterRule(listener: CsharpListener): void {
    if (listener.enterIdentifierList) {
      listener.enterIdentifierList(this);
    }
  }
  public override exitRule(listener: CsharpListener): void {
    if (listener.exitIdentifierList) {
      listener.exitIdentifierList(this);
    }
  }
  public override accept<Result>(visitor: CsharpVisitor<Result>): Result | null {
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
      return this.getTokens(CsharpParser.COMMA);
    } else {
      return this.getToken(CsharpParser.COMMA, i);
    }
  }
  public override get ruleIndex(): number {
    return CsharpParser.RULE_expressionList;
  }
  public override enterRule(listener: CsharpListener): void {
    if (listener.enterExpressionList) {
      listener.enterExpressionList(this);
    }
  }
  public override exitRule(listener: CsharpListener): void {
    if (listener.exitExpressionList) {
      listener.exitExpressionList(this);
    }
  }
  public override accept<Result>(visitor: CsharpVisitor<Result>): Result | null {
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
    return CsharpParser.RULE_type;
  }
  public override enterRule(listener: CsharpListener): void {
    if (listener.enterType) {
      listener.enterType(this);
    }
  }
  public override exitRule(listener: CsharpListener): void {
    if (listener.exitType) {
      listener.exitType(this);
    }
  }
  public override accept<Result>(visitor: CsharpVisitor<Result>): Result | null {
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
    return CsharpParser.RULE_assertActual;
  }
  public override enterRule(listener: CsharpListener): void {
    if (listener.enterAssertActual) {
      listener.enterAssertActual(this);
    }
  }
  public override exitRule(listener: CsharpListener): void {
    if (listener.exitAssertActual) {
      listener.exitAssertActual(this);
    }
  }
  public override accept<Result>(visitor: CsharpVisitor<Result>): Result | null {
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
    return CsharpParser.RULE_assertExpected;
  }
  public override enterRule(listener: CsharpListener): void {
    if (listener.enterAssertExpected) {
      listener.enterAssertExpected(this);
    }
  }
  public override exitRule(listener: CsharpListener): void {
    if (listener.exitAssertExpected) {
      listener.exitAssertExpected(this);
    }
  }
  public override accept<Result>(visitor: CsharpVisitor<Result>): Result | null {
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
    return CsharpParser.RULE_litValue;
  }
  public override enterRule(listener: CsharpListener): void {
    if (listener.enterLitValue) {
      listener.enterLitValue(this);
    }
  }
  public override exitRule(listener: CsharpListener): void {
    if (listener.exitLitValue) {
      listener.exitLitValue(this);
    }
  }
  public override accept<Result>(visitor: CsharpVisitor<Result>): Result | null {
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
    return this.getToken(CsharpParser.TRUE, 0);
  }
  public FALSE(): antlr.TerminalNode | null {
    return this.getToken(CsharpParser.FALSE, 0);
  }
  public override get ruleIndex(): number {
    return CsharpParser.RULE_litBoolean;
  }
  public override enterRule(listener: CsharpListener): void {
    if (listener.enterLitBoolean) {
      listener.enterLitBoolean(this);
    }
  }
  public override exitRule(listener: CsharpListener): void {
    if (listener.exitLitBoolean) {
      listener.exitLitBoolean(this);
    }
  }
  public override accept<Result>(visitor: CsharpVisitor<Result>): Result | null {
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
    return this.getToken(CsharpParser.LITERAL_INTEGER, 0);
  }
  public LITERAL_BINARY(): antlr.TerminalNode | null {
    return this.getToken(CsharpParser.LITERAL_BINARY, 0);
  }
  public LITERAL_HEX(): antlr.TerminalNode | null {
    return this.getToken(CsharpParser.LITERAL_HEX, 0);
  }
  public override get ruleIndex(): number {
    return CsharpParser.RULE_litInt;
  }
  public override enterRule(listener: CsharpListener): void {
    if (listener.enterLitInt) {
      listener.enterLitInt(this);
    }
  }
  public override exitRule(listener: CsharpListener): void {
    if (listener.exitLitInt) {
      listener.exitLitInt(this);
    }
  }
  public override accept<Result>(visitor: CsharpVisitor<Result>): Result | null {
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
    return this.getToken(CsharpParser.LITERAL_FLOAT, 0)!;
  }
  public override get ruleIndex(): number {
    return CsharpParser.RULE_litFloat;
  }
  public override enterRule(listener: CsharpListener): void {
    if (listener.enterLitFloat) {
      listener.enterLitFloat(this);
    }
  }
  public override exitRule(listener: CsharpListener): void {
    if (listener.exitLitFloat) {
      listener.exitLitFloat(this);
    }
  }
  public override accept<Result>(visitor: CsharpVisitor<Result>): Result | null {
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
    return this.getToken(CsharpParser.LITERAL_STRING, 0)!;
  }
  public INTERPOLATED_STRING_PREFIX(): antlr.TerminalNode | null {
    return this.getToken(CsharpParser.INTERPOLATED_STRING_PREFIX, 0);
  }
  public override get ruleIndex(): number {
    return CsharpParser.RULE_litString;
  }
  public override enterRule(listener: CsharpListener): void {
    if (listener.enterLitString) {
      listener.enterLitString(this);
    }
  }
  public override exitRule(listener: CsharpListener): void {
    if (listener.exitLitString) {
      listener.exitLitString(this);
    }
  }
  public override accept<Result>(visitor: CsharpVisitor<Result>): Result | null {
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
    return this.getToken(CsharpParser.DOT, 0)!;
  }
  public identifierUse(): IdentifierUseContext {
    return this.getRuleContext(0, IdentifierUseContext)!;
  }
  public override get ruleIndex(): number {
    return CsharpParser.RULE_enumValue;
  }
  public override enterRule(listener: CsharpListener): void {
    if (listener.enterEnumValue) {
      listener.enterEnumValue(this);
    }
  }
  public override exitRule(listener: CsharpListener): void {
    if (listener.exitEnumValue) {
      listener.exitEnumValue(this);
    }
  }
  public override accept<Result>(visitor: CsharpVisitor<Result>): Result | null {
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
    return this.getToken(CsharpParser.LITERAL_REGEXP, 0)!;
  }
  public override get ruleIndex(): number {
    return CsharpParser.RULE_litRegExp;
  }
  public override enterRule(listener: CsharpListener): void {
    if (listener.enterLitRegExp) {
      listener.enterLitRegExp(this);
    }
  }
  public override exitRule(listener: CsharpListener): void {
    if (listener.exitLitRegExp) {
      listener.exitLitRegExp(this);
    }
  }
  public override accept<Result>(visitor: CsharpVisitor<Result>): Result | null {
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
    return this.getToken(CsharpParser.OPEN_SQ_BRACKET, 0)!;
  }
  public expression(): ExpressionContext {
    return this.getRuleContext(0, ExpressionContext)!;
  }
  public CLOSE_SQ_BRACKET(): antlr.TerminalNode {
    return this.getToken(CsharpParser.CLOSE_SQ_BRACKET, 0)!;
  }
  public override get ruleIndex(): number {
    return CsharpParser.RULE_index;
  }
  public override enterRule(listener: CsharpListener): void {
    if (listener.enterIndex) {
      listener.enterIndex(this);
    }
  }
  public override exitRule(listener: CsharpListener): void {
    if (listener.exitIndex) {
      listener.exitIndex(this);
    }
  }
  public override accept<Result>(visitor: CsharpVisitor<Result>): Result | null {
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
    return this.getToken(CsharpParser.IF_, 0);
  }
  public OPEN_BRACKET(): antlr.TerminalNode | null {
    return this.getToken(CsharpParser.OPEN_BRACKET, 0);
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
      return this.getTokens(CsharpParser.COMMA);
    } else {
      return this.getToken(CsharpParser.COMMA, i);
    }
  }
  public CLOSE_BRACKET(): antlr.TerminalNode | null {
    return this.getToken(CsharpParser.CLOSE_BRACKET, 0);
  }
  public override get ruleIndex(): number {
    return CsharpParser.RULE_expression;
  }
  public override enterRule(listener: CsharpListener): void {
    if (listener.enterExpression) {
      listener.enterExpression(this);
    }
  }
  public override exitRule(listener: CsharpListener): void {
    if (listener.exitExpression) {
      listener.exitExpression(this);
    }
  }
  public override accept<Result>(visitor: CsharpVisitor<Result>): Result | null {
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
    return this.getToken(CsharpParser.DOT, 0);
  }
  public chainable(): ChainableContext | null {
    return this.getRuleContext(0, ChainableContext);
  }
  public override get ruleIndex(): number {
    return CsharpParser.RULE_term;
  }
  public override enterRule(listener: CsharpListener): void {
    if (listener.enterTerm) {
      listener.enterTerm(this);
    }
  }
  public override exitRule(listener: CsharpListener): void {
    if (listener.exitTerm) {
      listener.exitTerm(this);
    }
  }
  public override accept<Result>(visitor: CsharpVisitor<Result>): Result | null {
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
  public index(): IndexContext[];
  public index(i: number): IndexContext | null;
  public index(i?: number): IndexContext[] | IndexContext | null {
    if (i === undefined) {
      return this.getRuleContexts(IndexContext);
    }

    return this.getRuleContext(i, IndexContext);
  }
  public override get ruleIndex(): number {
    return CsharpParser.RULE_chainable;
  }
  public override enterRule(listener: CsharpListener): void {
    if (listener.enterChainable) {
      listener.enterChainable(this);
    }
  }
  public override exitRule(listener: CsharpListener): void {
    if (listener.exitChainable) {
      listener.exitChainable(this);
    }
  }
  public override accept<Result>(visitor: CsharpVisitor<Result>): Result | null {
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
    return this.getToken(CsharpParser.THIS_INSTANCE, 0)!;
  }
  public override get ruleIndex(): number {
    return CsharpParser.RULE_thisInstance;
  }
  public override enterRule(listener: CsharpListener): void {
    if (listener.enterThisInstance) {
      listener.enterThisInstance(this);
    }
  }
  public override exitRule(listener: CsharpListener): void {
    if (listener.exitThisInstance) {
      listener.exitThisInstance(this);
    }
  }
  public override accept<Result>(visitor: CsharpVisitor<Result>): Result | null {
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
    return this.getToken(CsharpParser.OPEN_BRACKET, 0)!;
  }
  public expression(): ExpressionContext {
    return this.getRuleContext(0, ExpressionContext)!;
  }
  public CLOSE_BRACKET(): antlr.TerminalNode {
    return this.getToken(CsharpParser.CLOSE_BRACKET, 0)!;
  }
  public override get ruleIndex(): number {
    return CsharpParser.RULE_bracketedExpression;
  }
  public override enterRule(listener: CsharpListener): void {
    if (listener.enterBracketedExpression) {
      listener.enterBracketedExpression(this);
    }
  }
  public override exitRule(listener: CsharpListener): void {
    if (listener.exitBracketedExpression) {
      listener.exitBracketedExpression(this);
    }
  }
  public override accept<Result>(visitor: CsharpVisitor<Result>): Result | null {
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
    return CsharpParser.RULE_unaryExpression;
  }
  public override enterRule(listener: CsharpListener): void {
    if (listener.enterUnaryExpression) {
      listener.enterUnaryExpression(this);
    }
  }
  public override exitRule(listener: CsharpListener): void {
    if (listener.exitUnaryExpression) {
      listener.exitUnaryExpression(this);
    }
  }
  public override accept<Result>(visitor: CsharpVisitor<Result>): Result | null {
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
    return this.getToken(CsharpParser.MINUS, 0)!;
  }
  public term(): TermContext {
    return this.getRuleContext(0, TermContext)!;
  }
  public override get ruleIndex(): number {
    return CsharpParser.RULE_negateNumeric;
  }
  public override enterRule(listener: CsharpListener): void {
    if (listener.enterNegateNumeric) {
      listener.enterNegateNumeric(this);
    }
  }
  public override exitRule(listener: CsharpListener): void {
    if (listener.exitNegateNumeric) {
      listener.exitNegateNumeric(this);
    }
  }
  public override accept<Result>(visitor: CsharpVisitor<Result>): Result | null {
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
    return this.getToken(CsharpParser.NOT, 0)!;
  }
  public term(): TermContext {
    return this.getRuleContext(0, TermContext)!;
  }
  public override get ruleIndex(): number {
    return CsharpParser.RULE_negateLogical;
  }
  public override enterRule(listener: CsharpListener): void {
    if (listener.enterNegateLogical) {
      listener.enterNegateLogical(this);
    }
  }
  public override exitRule(listener: CsharpListener): void {
    if (listener.exitNegateLogical) {
      listener.exitNegateLogical(this);
    }
  }
  public override accept<Result>(visitor: CsharpVisitor<Result>): Result | null {
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
    return CsharpParser.RULE_binaryExpression;
  }
  public override enterRule(listener: CsharpListener): void {
    if (listener.enterBinaryExpression) {
      listener.enterBinaryExpression(this);
    }
  }
  public override exitRule(listener: CsharpListener): void {
    if (listener.exitBinaryExpression) {
      listener.exitBinaryExpression(this);
    }
  }
  public override accept<Result>(visitor: CsharpVisitor<Result>): Result | null {
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
  public OPEN_BRACE(): antlr.TerminalNode {
    return this.getToken(CsharpParser.OPEN_BRACE, 0)!;
  }
  public expression(): ExpressionContext[];
  public expression(i: number): ExpressionContext | null;
  public expression(i?: number): ExpressionContext[] | ExpressionContext | null {
    if (i === undefined) {
      return this.getRuleContexts(ExpressionContext);
    }

    return this.getRuleContext(i, ExpressionContext);
  }
  public CLOSE_BRACE(): antlr.TerminalNode {
    return this.getToken(CsharpParser.CLOSE_BRACE, 0)!;
  }
  public COMMA(): antlr.TerminalNode[];
  public COMMA(i: number): antlr.TerminalNode | null;
  public COMMA(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    if (i === undefined) {
      return this.getTokens(CsharpParser.COMMA);
    } else {
      return this.getToken(CsharpParser.COMMA, i);
    }
  }
  public override get ruleIndex(): number {
    return CsharpParser.RULE_list;
  }
  public override enterRule(listener: CsharpListener): void {
    if (listener.enterList) {
      listener.enterList(this);
    }
  }
  public override exitRule(listener: CsharpListener): void {
    if (listener.exitList) {
      listener.exitList(this);
    }
  }
  public override accept<Result>(visitor: CsharpVisitor<Result>): Result | null {
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
    return this.getToken(CsharpParser.OPEN_BRACKET, 0)!;
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
      return this.getTokens(CsharpParser.COMMA);
    } else {
      return this.getToken(CsharpParser.COMMA, i);
    }
  }
  public CLOSE_BRACKET(): antlr.TerminalNode {
    return this.getToken(CsharpParser.CLOSE_BRACKET, 0)!;
  }
  public override get ruleIndex(): number {
    return CsharpParser.RULE_tuple;
  }
  public override enterRule(listener: CsharpListener): void {
    if (listener.enterTuple) {
      listener.enterTuple(this);
    }
  }
  public override exitRule(listener: CsharpListener): void {
    if (listener.exitTuple) {
      listener.exitTuple(this);
    }
  }
  public override accept<Result>(visitor: CsharpVisitor<Result>): Result | null {
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
    return this.getToken(CsharpParser.OPEN_BRACE, 0)!;
  }
  public kvpList(): KvpListContext {
    return this.getRuleContext(0, KvpListContext)!;
  }
  public CLOSE_BRACE(): antlr.TerminalNode {
    return this.getToken(CsharpParser.CLOSE_BRACE, 0)!;
  }
  public override get ruleIndex(): number {
    return CsharpParser.RULE_dictionary;
  }
  public override enterRule(listener: CsharpListener): void {
    if (listener.enterDictionary) {
      listener.enterDictionary(this);
    }
  }
  public override exitRule(listener: CsharpListener): void {
    if (listener.exitDictionary) {
      listener.exitDictionary(this);
    }
  }
  public override accept<Result>(visitor: CsharpVisitor<Result>): Result | null {
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
      return this.getTokens(CsharpParser.COMMA);
    } else {
      return this.getToken(CsharpParser.COMMA, i);
    }
  }
  public override get ruleIndex(): number {
    return CsharpParser.RULE_kvpList;
  }
  public override enterRule(listener: CsharpListener): void {
    if (listener.enterKvpList) {
      listener.enterKvpList(this);
    }
  }
  public override exitRule(listener: CsharpListener): void {
    if (listener.exitKvpList) {
      listener.exitKvpList(this);
    }
  }
  public override accept<Result>(visitor: CsharpVisitor<Result>): Result | null {
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
  public OPEN_BRACE(): antlr.TerminalNode {
    return this.getToken(CsharpParser.OPEN_BRACE, 0)!;
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
    return this.getToken(CsharpParser.COLON, 0)!;
  }
  public CLOSE_BRACE(): antlr.TerminalNode {
    return this.getToken(CsharpParser.CLOSE_BRACE, 0)!;
  }
  public override get ruleIndex(): number {
    return CsharpParser.RULE_kvp;
  }
  public override enterRule(listener: CsharpListener): void {
    if (listener.enterKvp) {
      listener.enterKvp(this);
    }
  }
  public override exitRule(listener: CsharpListener): void {
    if (listener.exitKvp) {
      listener.exitKvp(this);
    }
  }
  public override accept<Result>(visitor: CsharpVisitor<Result>): Result | null {
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
    return this.getToken(CsharpParser.OPEN_BRACKET, 0)!;
  }
  public CLOSE_BRACKET(): antlr.TerminalNode {
    return this.getToken(CsharpParser.CLOSE_BRACKET, 0)!;
  }
  public argList(): ArgListContext | null {
    return this.getRuleContext(0, ArgListContext);
  }
  public override get ruleIndex(): number {
    return CsharpParser.RULE_methodCall;
  }
  public override enterRule(listener: CsharpListener): void {
    if (listener.enterMethodCall) {
      listener.enterMethodCall(this);
    }
  }
  public override exitRule(listener: CsharpListener): void {
    if (listener.exitMethodCall) {
      listener.exitMethodCall(this);
    }
  }
  public override accept<Result>(visitor: CsharpVisitor<Result>): Result | null {
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
    return this.getToken(CsharpParser.EQUAL, 0);
  }
  public NOT_EQUAL(): antlr.TerminalNode | null {
    return this.getToken(CsharpParser.NOT_EQUAL, 0);
  }
  public GT(): antlr.TerminalNode | null {
    return this.getToken(CsharpParser.GT, 0);
  }
  public LT(): antlr.TerminalNode | null {
    return this.getToken(CsharpParser.LT, 0);
  }
  public GE(): antlr.TerminalNode | null {
    return this.getToken(CsharpParser.GE, 0);
  }
  public LE(): antlr.TerminalNode | null {
    return this.getToken(CsharpParser.LE, 0);
  }
  public MULT(): antlr.TerminalNode | null {
    return this.getToken(CsharpParser.MULT, 0);
  }
  public DIVIDE(): antlr.TerminalNode | null {
    return this.getToken(CsharpParser.DIVIDE, 0);
  }
  public PLUS(): antlr.TerminalNode | null {
    return this.getToken(CsharpParser.PLUS, 0);
  }
  public MINUS(): antlr.TerminalNode | null {
    return this.getToken(CsharpParser.MINUS, 0);
  }
  public AND(): antlr.TerminalNode | null {
    return this.getToken(CsharpParser.AND, 0);
  }
  public OR(): antlr.TerminalNode | null {
    return this.getToken(CsharpParser.OR, 0);
  }
  public MOD(): antlr.TerminalNode | null {
    return this.getToken(CsharpParser.MOD, 0);
  }
  public override get ruleIndex(): number {
    return CsharpParser.RULE_binaryOperator;
  }
  public override enterRule(listener: CsharpListener): void {
    if (listener.enterBinaryOperator) {
      listener.enterBinaryOperator(this);
    }
  }
  public override exitRule(listener: CsharpListener): void {
    if (listener.exitBinaryOperator) {
      listener.exitBinaryOperator(this);
    }
  }
  public override accept<Result>(visitor: CsharpVisitor<Result>): Result | null {
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
    return this.getToken(CsharpParser.NEW, 0)!;
  }
  public type(): TypeContext {
    return this.getRuleContext(0, TypeContext)!;
  }
  public OPEN_BRACKET(): antlr.TerminalNode {
    return this.getToken(CsharpParser.OPEN_BRACKET, 0)!;
  }
  public CLOSE_BRACKET(): antlr.TerminalNode {
    return this.getToken(CsharpParser.CLOSE_BRACKET, 0)!;
  }
  public argList(): ArgListContext | null {
    return this.getRuleContext(0, ArgListContext);
  }
  public override get ruleIndex(): number {
    return CsharpParser.RULE_newInstance;
  }
  public override enterRule(listener: CsharpListener): void {
    if (listener.enterNewInstance) {
      listener.enterNewInstance(this);
    }
  }
  public override exitRule(listener: CsharpListener): void {
    if (listener.exitNewInstance) {
      listener.exitNewInstance(this);
    }
  }
  public override accept<Result>(visitor: CsharpVisitor<Result>): Result | null {
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
  public type(): TypeContext {
    return this.getRuleContext(0, TypeContext)!;
  }
  public identifierDef(): IdentifierDefContext {
    return this.getRuleContext(0, IdentifierDefContext)!;
  }
  public override get ruleIndex(): number {
    return CsharpParser.RULE_paramDef;
  }
  public override enterRule(listener: CsharpListener): void {
    if (listener.enterParamDef) {
      listener.enterParamDef(this);
    }
  }
  public override exitRule(listener: CsharpListener): void {
    if (listener.exitParamDef) {
      listener.exitParamDef(this);
    }
  }
  public override accept<Result>(visitor: CsharpVisitor<Result>): Result | null {
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
    return this.getToken(CsharpParser.LT, 0)!;
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
    return this.getToken(CsharpParser.GT, 0)!;
  }
  public COMMA(): antlr.TerminalNode[];
  public COMMA(i: number): antlr.TerminalNode | null;
  public COMMA(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    if (i === undefined) {
      return this.getTokens(CsharpParser.COMMA);
    } else {
      return this.getToken(CsharpParser.COMMA, i);
    }
  }
  public override get ruleIndex(): number {
    return CsharpParser.RULE_typeGeneric;
  }
  public override enterRule(listener: CsharpListener): void {
    if (listener.enterTypeGeneric) {
      listener.enterTypeGeneric(this);
    }
  }
  public override exitRule(listener: CsharpListener): void {
    if (listener.exitTypeGeneric) {
      listener.exitTypeGeneric(this);
    }
  }
  public override accept<Result>(visitor: CsharpVisitor<Result>): Result | null {
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
    return this.getToken(CsharpParser.FUNC_NAME, 0)!;
  }
  public LT(): antlr.TerminalNode {
    return this.getToken(CsharpParser.LT, 0)!;
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
    return this.getToken(CsharpParser.ARROW, 0)!;
  }
  public GT(): antlr.TerminalNode {
    return this.getToken(CsharpParser.GT, 0)!;
  }
  public COMMA(): antlr.TerminalNode[];
  public COMMA(i: number): antlr.TerminalNode | null;
  public COMMA(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    if (i === undefined) {
      return this.getTokens(CsharpParser.COMMA);
    } else {
      return this.getToken(CsharpParser.COMMA, i);
    }
  }
  public override get ruleIndex(): number {
    return CsharpParser.RULE_typeFunc;
  }
  public override enterRule(listener: CsharpListener): void {
    if (listener.enterTypeFunc) {
      listener.enterTypeFunc(this);
    }
  }
  public override exitRule(listener: CsharpListener): void {
    if (listener.exitTypeFunc) {
      listener.exitTypeFunc(this);
    }
  }
  public override accept<Result>(visitor: CsharpVisitor<Result>): Result | null {
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
    return this.getToken(CsharpParser.TUPLE, 0)!;
  }
  public OPEN_SQ_BRACKET(): antlr.TerminalNode {
    return this.getToken(CsharpParser.OPEN_SQ_BRACKET, 0)!;
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
    return this.getToken(CsharpParser.CLOSE_SQ_BRACKET, 0)!;
  }
  public COMMA(): antlr.TerminalNode[];
  public COMMA(i: number): antlr.TerminalNode | null;
  public COMMA(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    if (i === undefined) {
      return this.getTokens(CsharpParser.COMMA);
    } else {
      return this.getToken(CsharpParser.COMMA, i);
    }
  }
  public override get ruleIndex(): number {
    return CsharpParser.RULE_typeTuple;
  }
  public override enterRule(listener: CsharpListener): void {
    if (listener.enterTypeTuple) {
      listener.enterTypeTuple(this);
    }
  }
  public override exitRule(listener: CsharpListener): void {
    if (listener.exitTypeTuple) {
      listener.exitTypeTuple(this);
    }
  }
  public override accept<Result>(visitor: CsharpVisitor<Result>): Result | null {
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
    return this.getToken(CsharpParser.LAMBDA, 0)!;
  }
  public argList(): ArgListContext {
    return this.getRuleContext(0, ArgListContext)!;
  }
  public COLON(): antlr.TerminalNode {
    return this.getToken(CsharpParser.COLON, 0)!;
  }
  public expression(): ExpressionContext {
    return this.getRuleContext(0, ExpressionContext)!;
  }
  public override get ruleIndex(): number {
    return CsharpParser.RULE_lambda;
  }
  public override enterRule(listener: CsharpListener): void {
    if (listener.enterLambda) {
      listener.enterLambda(this);
    }
  }
  public override exitRule(listener: CsharpListener): void {
    if (listener.exitLambda) {
      listener.exitLambda(this);
    }
  }
  public override accept<Result>(visitor: CsharpVisitor<Result>): Result | null {
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
    return this.getToken(CsharpParser.INTERPOLATED_STRING, 0)!;
  }
  public override get ruleIndex(): number {
    return CsharpParser.RULE_interpolatedString;
  }
  public override enterRule(listener: CsharpListener): void {
    if (listener.enterInterpolatedString) {
      listener.enterInterpolatedString(this);
    }
  }
  public override exitRule(listener: CsharpListener): void {
    if (listener.exitInterpolatedString) {
      listener.exitInterpolatedString(this);
    }
  }
  public override accept<Result>(visitor: CsharpVisitor<Result>): Result | null {
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
    return this.getToken(CsharpParser.POWER, 0)!;
  }
  public override get ruleIndex(): number {
    return CsharpParser.RULE_power;
  }
  public override enterRule(listener: CsharpListener): void {
    if (listener.enterPower) {
      listener.enterPower(this);
    }
  }
  public override exitRule(listener: CsharpListener): void {
    if (listener.exitPower) {
      listener.exitPower(this);
    }
  }
  public override accept<Result>(visitor: CsharpVisitor<Result>): Result | null {
    if (visitor.visitPower) {
      return visitor.visitPower(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}
