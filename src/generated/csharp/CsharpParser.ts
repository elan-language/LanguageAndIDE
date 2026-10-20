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
  public static readonly RETURN = 48;
  public static readonly TRY = 49;
  public static readonly WHILE = 50;
  public static readonly POWER = 51;
  public static readonly TUPLE = 52;
  public static readonly IF_ = 53;
  public static readonly COMMENT = 54;
  public static readonly SINGLE_EQUALS = 55;
  public static readonly OPEN_BRACE = 56;
  public static readonly CLOSE_BRACE = 57;
  public static readonly OPEN_SQ_BRACKET = 58;
  public static readonly CLOSE_SQ_BRACKET = 59;
  public static readonly OPEN_BRACKET = 60;
  public static readonly CLOSE_BRACKET = 61;
  public static readonly DOT = 62;
  public static readonly COMMA = 63;
  public static readonly COLON = 64;
  public static readonly PLUS = 65;
  public static readonly MINUS = 66;
  public static readonly MULT = 67;
  public static readonly DIVIDE = 68;
  public static readonly LT = 69;
  public static readonly GT = 70;
  public static readonly LE = 71;
  public static readonly GE = 72;
  public static readonly DOUBLE_QUOTES = 73;
  public static readonly WS = 74;
  public static readonly NL = 75;
  public static readonly NAME_STARTING_TEST_ = 76;
  public static readonly NAME_STARTING_LC = 77;
  public static readonly NAME_STARTING_UC = 78;
  public static readonly LITERAL_BINARY = 79;
  public static readonly LITERAL_HEX = 80;
  public static readonly LITERAL_INTEGER = 81;
  public static readonly LITERAL_FLOAT = 82;
  public static readonly LITERAL_STRING = 83;
  public static readonly INTERPOLATED_STRING_PREFIX = 84;
  public static readonly WHITESPACES = 85;
  public static readonly TEXT = 86;
  public static readonly GHOSTED = 87;
  public static readonly FUNCTION_ANNOTATION = 88;
  public static readonly PROCECDURE_ANNOTATION = 89;
  public static readonly CONSTANT_ANNOTATION = 90;
  public static readonly ENUM_ANNOTATION = 91;
  public static readonly CONCRETE_CLASS_ANNOTATION = 92;
  public static readonly ABSTRACT_CLASS_ANNOTATION = 93;
  public static readonly VARIABLE_ANNOTATION = 94;
  public static readonly ASSIGNMENT_ANNOTATION = 95;
  public static readonly INPUT_ANNOTATION = 96;
  public static readonly CALL_ANNOTATION = 97;
  public static readonly LET_ANNOTATION = 98;
  public static readonly ELSE_IF_ANNOTATION = 99;
  public static readonly PROPERTY_ANNOTATION = 100;
  public static readonly FUNCTION_METHOD_ANNOTATION = 101;
  public static readonly PROCEDURE_METHOD_ANNOTATION = 102;
  public static readonly INTERPOLATED_STRING = 103;
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
  public static readonly RULE_variableDefinition = 13;
  public static readonly RULE_assignment = 14;
  public static readonly RULE_ifStatement = 15;
  public static readonly RULE_whileLoop = 16;
  public static readonly RULE_forLoop = 17;
  public static readonly RULE_procedureCall = 18;
  public static readonly RULE_procRef = 19;
  public static readonly RULE_thisProcRef = 20;
  public static readonly RULE_instanceProcRef = 21;
  public static readonly RULE_identifierWithOptIndexes = 22;
  public static readonly RULE_tryStatement = 23;
  public static readonly RULE_throwStatement = 24;
  public static readonly RULE_errorMessage = 25;
  public static readonly RULE_assert = 26;
  public static readonly RULE_returnStatement = 27;
  public static readonly RULE_elseIfClause = 28;
  public static readonly RULE_elseClause = 29;
  public static readonly RULE_catchStatement = 30;
  public static readonly RULE_constructorMember = 31;
  public static readonly RULE_property = 32;
  public static readonly RULE_functionMethod = 33;
  public static readonly RULE_procedureMethod = 34;
  public static readonly RULE_abstractFunction = 35;
  public static readonly RULE_abstractProcedure = 36;
  public static readonly RULE_identifierDef = 37;
  public static readonly RULE_identifierUse = 38;
  public static readonly RULE_assignable = 39;
  public static readonly RULE_methodName = 40;
  public static readonly RULE_testName = 41;
  public static readonly RULE_typeName = 42;
  public static readonly RULE_constantValue = 43;
  public static readonly RULE_argList = 44;
  public static readonly RULE_argument = 45;
  public static readonly RULE_paramList = 46;
  public static readonly RULE_identifierList = 47;
  public static readonly RULE_expressionList = 48;
  public static readonly RULE_type = 49;
  public static readonly RULE_assertActual = 50;
  public static readonly RULE_assertExpected = 51;
  public static readonly RULE_litValue = 52;
  public static readonly RULE_litBoolean = 53;
  public static readonly RULE_litInt = 54;
  public static readonly RULE_litFloat = 55;
  public static readonly RULE_litString = 56;
  public static readonly RULE_enumValue = 57;
  public static readonly RULE_index = 58;
  public static readonly RULE_expression = 59;
  public static readonly RULE_term = 60;
  public static readonly RULE_chainable = 61;
  public static readonly RULE_thisInstance = 62;
  public static readonly RULE_bracketedExpression = 63;
  public static readonly RULE_unaryExpression = 64;
  public static readonly RULE_negateNumeric = 65;
  public static readonly RULE_negateLogical = 66;
  public static readonly RULE_binaryExpression = 67;
  public static readonly RULE_list = 68;
  public static readonly RULE_tuple = 69;
  public static readonly RULE_dictionary = 70;
  public static readonly RULE_kvpList = 71;
  public static readonly RULE_kvp = 72;
  public static readonly RULE_methodCall = 73;
  public static readonly RULE_binaryOperator = 74;
  public static readonly RULE_newInstance = 75;
  public static readonly RULE_paramDef = 76;
  public static readonly RULE_typeGeneric = 77;
  public static readonly RULE_typeFunc = 78;
  public static readonly RULE_typeTuple = 79;
  public static readonly RULE_lambda = 80;
  public static readonly RULE_interpolatedString = 81;
  public static readonly RULE_power = 82;

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
    "variableDefinition",
    "assignment",
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
        this.state = 167;
        this.errorHandler.sync(this);
        switch (this.interpreter.adaptivePredict(this.tokenStream, 0, this.context)) {
          case 1:
            {
              this.state = 166;
              this.match(CsharpParser.COMMENT);
            }
            break;
        }
        this.state = 172;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (
          ((_la & ~0x1f) === 0 && ((1 << _la) & 122683392) !== 0) ||
          _la === 40 ||
          _la === 54
        ) {
          {
            {
              this.state = 169;
              this.global();
            }
          }
          this.state = 174;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 178;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (_la === 75) {
          {
            {
              this.state = 175;
              this.match(CsharpParser.NL);
            }
          }
          this.state = 180;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 181;
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
      this.state = 192;
      this.errorHandler.sync(this);
      switch (this.interpreter.adaptivePredict(this.tokenStream, 3, this.context)) {
        case 1:
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 183;
            this.main();
          }
          break;
        case 2:
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 184;
            this.function_();
          }
          break;
        case 3:
          this.enterOuterAlt(localContext, 3);
          {
            this.state = 185;
            this.test();
          }
          break;
        case 4:
          this.enterOuterAlt(localContext, 4);
          {
            this.state = 186;
            this.procedure();
          }
          break;
        case 5:
          this.enterOuterAlt(localContext, 5);
          {
            this.state = 187;
            this.constant();
          }
          break;
        case 6:
          this.enterOuterAlt(localContext, 6);
          {
            this.state = 188;
            this.enum_();
          }
          break;
        case 7:
          this.enterOuterAlt(localContext, 7);
          {
            this.state = 189;
            this.concreteClass();
          }
          break;
        case 8:
          this.enterOuterAlt(localContext, 8);
          {
            this.state = 190;
            this.abstractClass();
          }
          break;
        case 9:
          this.enterOuterAlt(localContext, 9);
          {
            this.state = 191;
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
        this.state = 194;
        this.match(CsharpParser.STATIC);
        this.state = 195;
        this.match(CsharpParser.VOID);
        this.state = 196;
        this.match(CsharpParser.MAIN);
        this.state = 197;
        this.match(CsharpParser.OPEN_BRACKET);
        this.state = 198;
        this.match(CsharpParser.CLOSE_BRACKET);
        this.state = 199;
        this.match(CsharpParser.OPEN_BRACE);
        this.state = 200;
        this.match(CsharpParser.NL);
        this.state = 204;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (
          ((_la & ~0x1f) === 0 && ((1 << _la) & 403177472) !== 0) ||
          (((_la - 32) & ~0x1f) === 0 && ((1 << (_la - 32)) & 4589569) !== 0) ||
          _la === 77 ||
          _la === 87
        ) {
          {
            {
              this.state = 201;
              this.ordinaryStatement();
            }
          }
          this.state = 206;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 207;
        this.match(CsharpParser.CLOSE_BRACE);
        this.state = 208;
        this.match(CsharpParser.COMMENT);
        this.state = 209;
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
        this.state = 211;
        this.match(CsharpParser.STATIC);
        this.state = 212;
        this.type_();
        this.state = 213;
        this.methodName();
        this.state = 214;
        this.match(CsharpParser.OPEN_BRACKET);
        this.state = 216;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (((_la & ~0x1f) === 0 && ((1 << _la) & 252) !== 0) || _la === 52 || _la === 78) {
          {
            this.state = 215;
            this.paramList();
          }
        }

        this.state = 218;
        this.match(CsharpParser.CLOSE_BRACKET);
        this.state = 219;
        this.match(CsharpParser.OPEN_BRACE);
        this.state = 220;
        this.match(CsharpParser.COMMENT);
        this.state = 221;
        this.match(CsharpParser.NL);
        this.state = 227;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (
          ((_la & ~0x1f) === 0 && ((1 << _la) & 403177472) !== 0) ||
          (((_la - 32) & ~0x1f) === 0 && ((1 << (_la - 32)) & 4589569) !== 0) ||
          _la === 77 ||
          _la === 87
        ) {
          {
            {
              this.state = 222;
              this.ordinaryStatement();
              this.state = 223;
              this.ordinaryStatement();
            }
          }
          this.state = 229;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 230;
        this.returnStatement();
        this.state = 231;
        this.match(CsharpParser.CLOSE_BRACE);
        this.state = 232;
        this.match(CsharpParser.COMMENT);
        this.state = 233;
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
        this.state = 235;
        this.match(CsharpParser.TEST_CLASS_ANNOT);
        this.state = 236;
        this.match(CsharpParser.CLASS);
        this.state = 237;
        this.typeName();
        this.state = 238;
        this.match(CsharpParser.NL);
        this.state = 239;
        this.match(CsharpParser.TEST_METHOD_ANNOT);
        this.state = 240;
        this.match(CsharpParser.STATIC);
        this.state = 241;
        this.match(CsharpParser.VOID);
        this.state = 242;
        this.testName();
        this.state = 248;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (((_la - 28) & ~0x1f) === 0 && ((1 << (_la - 28)) & 67108867) !== 0) {
          {
            this.state = 246;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
              case CsharpParser.ASSERT:
                {
                  this.state = 243;
                  this.assert();
                }
                break;
              case CsharpParser.VAR:
                {
                  this.state = 244;
                  this.variableDefinition();
                }
                break;
              case CsharpParser.COMMENT:
                {
                  this.state = 245;
                  this.comment();
                }
                break;
              default:
                throw new antlr.NoViableAltException(this);
            }
          }
          this.state = 250;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 251;
        this.match(CsharpParser.CLOSE_BRACE);
        this.state = 252;
        this.match(CsharpParser.COMMENT);
        this.state = 253;
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
        this.state = 255;
        this.match(CsharpParser.STATIC);
        this.state = 256;
        this.match(CsharpParser.VOID);
        this.state = 257;
        this.methodName();
        this.state = 258;
        this.match(CsharpParser.OPEN_BRACKET);
        this.state = 260;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (((_la & ~0x1f) === 0 && ((1 << _la) & 252) !== 0) || _la === 52 || _la === 78) {
          {
            this.state = 259;
            this.paramList();
          }
        }

        this.state = 262;
        this.match(CsharpParser.CLOSE_BRACKET);
        this.state = 263;
        this.match(CsharpParser.OPEN_BRACE);
        this.state = 264;
        this.match(CsharpParser.COMMENT);
        this.state = 265;
        this.match(CsharpParser.NL);
        this.state = 269;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (
          ((_la & ~0x1f) === 0 && ((1 << _la) & 403177472) !== 0) ||
          (((_la - 32) & ~0x1f) === 0 && ((1 << (_la - 32)) & 4589569) !== 0) ||
          _la === 77 ||
          _la === 87
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
        this.match(CsharpParser.CLOSE_BRACE);
        this.state = 273;
        this.match(CsharpParser.COMMENT);
        this.state = 274;
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
        this.state = 276;
        this.match(CsharpParser.CONST);
        this.state = 277;
        this.identifierDef();
        this.state = 278;
        this.match(CsharpParser.EQUAL);
        this.state = 279;
        this.constantValue();
        this.state = 280;
        this.match(CsharpParser.COMMENT);
        this.state = 281;
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
        this.state = 283;
        this.match(CsharpParser.ENUM);
        this.state = 284;
        this.typeName();
        this.state = 285;
        this.match(CsharpParser.OPEN_BRACE);
        this.state = 286;
        this.identifierList();
        this.state = 287;
        this.match(CsharpParser.CLOSE_BRACKET);
        this.state = 288;
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
        this.state = 290;
        this.match(CsharpParser.CLASS);
        this.state = 291;
        this.typeName();
        this.state = 294;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 64) {
          {
            this.state = 292;
            this.match(CsharpParser.COLON);
            this.state = 293;
            this.typeName();
          }
        }

        this.state = 296;
        this.match(CsharpParser.OPEN_BRACE);
        this.state = 297;
        this.match(CsharpParser.NL);
        this.state = 305;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (_la === 35 || _la === 54) {
          {
            this.state = 303;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 12, this.context)) {
              case 1:
                {
                  this.state = 298;
                  this.constructorMember();
                }
                break;
              case 2:
                {
                  this.state = 299;
                  this.property();
                }
                break;
              case 3:
                {
                  this.state = 300;
                  this.functionMethod();
                }
                break;
              case 4:
                {
                  this.state = 301;
                  this.procedureMethod();
                }
                break;
              case 5:
                {
                  this.state = 302;
                  this.comment();
                }
                break;
            }
          }
          this.state = 307;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 308;
        this.match(CsharpParser.CLOSE_BRACE);
        this.state = 309;
        this.match(CsharpParser.COMMENT);
        this.state = 310;
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
        this.state = 312;
        this.match(CsharpParser.ABSTRACT);
        this.state = 313;
        this.match(CsharpParser.CLASS);
        this.state = 314;
        this.typeName();
        this.state = 317;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 64) {
          {
            this.state = 315;
            this.match(CsharpParser.COLON);
            this.state = 316;
            this.typeName();
          }
        }

        this.state = 319;
        this.match(CsharpParser.OPEN_BRACE);
        this.state = 320;
        this.match(CsharpParser.NL);
        this.state = 329;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (((_la - 26) & ~0x1f) === 0 && ((1 << (_la - 26)) & 268435969) !== 0) {
          {
            this.state = 327;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 15, this.context)) {
              case 1:
                {
                  this.state = 321;
                  this.property();
                }
                break;
              case 2:
                {
                  this.state = 322;
                  this.functionMethod();
                }
                break;
              case 3:
                {
                  this.state = 323;
                  this.procedureMethod();
                }
                break;
              case 4:
                {
                  this.state = 324;
                  this.abstractFunction();
                }
                break;
              case 5:
                {
                  this.state = 325;
                  this.abstractProcedure();
                }
                break;
              case 6:
                {
                  this.state = 326;
                  this.comment();
                }
                break;
            }
          }
          this.state = 331;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 332;
        this.match(CsharpParser.CLOSE_BRACE);
        this.state = 333;
        this.match(CsharpParser.COMMENT);
        this.state = 334;
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
        this.state = 336;
        this.commentText();
        this.state = 337;
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
        this.state = 339;
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
      this.state = 350;
      this.errorHandler.sync(this);
      switch (this.interpreter.adaptivePredict(this.tokenStream, 17, this.context)) {
        case 1:
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 341;
            this.variableDefinition();
          }
          break;
        case 2:
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 342;
            this.assignment();
          }
          break;
        case 3:
          this.enterOuterAlt(localContext, 3);
          {
            this.state = 343;
            this.ifStatement();
          }
          break;
        case 4:
          this.enterOuterAlt(localContext, 4);
          {
            this.state = 344;
            this.whileLoop();
          }
          break;
        case 5:
          this.enterOuterAlt(localContext, 5);
          {
            this.state = 345;
            this.forLoop();
          }
          break;
        case 6:
          this.enterOuterAlt(localContext, 6);
          {
            this.state = 346;
            this.procedureCall();
          }
          break;
        case 7:
          this.enterOuterAlt(localContext, 7);
          {
            this.state = 347;
            this.tryStatement();
          }
          break;
        case 8:
          this.enterOuterAlt(localContext, 8);
          {
            this.state = 348;
            this.throwStatement();
          }
          break;
        case 9:
          this.enterOuterAlt(localContext, 9);
          {
            this.state = 349;
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
    this.enterRule(localContext, 26, CsharpParser.RULE_variableDefinition);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 352;
        this.match(CsharpParser.VAR);
        this.state = 353;
        this.identifierDef();
        this.state = 354;
        this.match(CsharpParser.SINGLE_EQUALS);
        this.state = 355;
        this.expression();
        this.state = 356;
        this.match(CsharpParser.SEMI_COLON);
        this.state = 357;
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
    this.enterRule(localContext, 28, CsharpParser.RULE_assignment);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 359;
        this.assignable(0);
        this.state = 360;
        this.match(CsharpParser.SINGLE_EQUALS);
        this.state = 361;
        this.expression();
        this.state = 362;
        this.match(CsharpParser.SEMI_COLON);
        this.state = 363;
        this.match(CsharpParser.COMMENT);
        this.state = 364;
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
    this.enterRule(localContext, 30, CsharpParser.RULE_ifStatement);
    try {
      let alternative: number;
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 366;
        this.match(CsharpParser.IF);
        this.state = 367;
        this.match(CsharpParser.OPEN_BRACKET);
        this.state = 368;
        this.expression();
        this.state = 369;
        this.match(CsharpParser.CLOSE_BRACKET);
        this.state = 370;
        this.match(CsharpParser.OPEN_BRACE);
        this.state = 371;
        this.match(CsharpParser.NL);
        this.state = 377;
        this.errorHandler.sync(this);
        alternative = this.interpreter.adaptivePredict(this.tokenStream, 19, this.context);
        while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
          if (alternative === 1) {
            {
              this.state = 375;
              this.errorHandler.sync(this);
              switch (this.interpreter.adaptivePredict(this.tokenStream, 18, this.context)) {
                case 1:
                  {
                    this.state = 372;
                    this.elseIfClause();
                  }
                  break;
                case 2:
                  {
                    this.state = 373;
                    this.elseClause();
                  }
                  break;
                case 3:
                  {
                    this.state = 374;
                    this.ordinaryStatement();
                  }
                  break;
              }
            }
          }
          this.state = 379;
          this.errorHandler.sync(this);
          alternative = this.interpreter.adaptivePredict(this.tokenStream, 19, this.context);
        }
        this.state = 380;
        this.match(CsharpParser.CLOSE_BRACE);
        this.state = 381;
        this.match(CsharpParser.COMMENT);
        this.state = 382;
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
    this.enterRule(localContext, 32, CsharpParser.RULE_whileLoop);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 384;
        this.match(CsharpParser.WHILE);
        this.state = 385;
        this.match(CsharpParser.OPEN_BRACKET);
        this.state = 386;
        this.expression();
        this.state = 387;
        this.match(CsharpParser.CLOSE_BRACKET);
        this.state = 388;
        this.match(CsharpParser.OPEN_BRACE);
        this.state = 389;
        this.match(CsharpParser.NL);
        this.state = 393;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (
          ((_la & ~0x1f) === 0 && ((1 << _la) & 403177472) !== 0) ||
          (((_la - 32) & ~0x1f) === 0 && ((1 << (_la - 32)) & 4589569) !== 0) ||
          _la === 77 ||
          _la === 87
        ) {
          {
            {
              this.state = 390;
              this.ordinaryStatement();
            }
          }
          this.state = 395;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 396;
        this.match(CsharpParser.CLOSE_BRACE);
        this.state = 397;
        this.match(CsharpParser.COMMENT);
        this.state = 398;
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
    this.enterRule(localContext, 34, CsharpParser.RULE_forLoop);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 400;
        this.match(CsharpParser.FOREACH);
        this.state = 401;
        this.match(CsharpParser.OPEN_BRACKET);
        this.state = 402;
        this.match(CsharpParser.VAR);
        this.state = 403;
        this.identifierDef();
        this.state = 404;
        this.match(CsharpParser.IN);
        this.state = 405;
        this.expression();
        this.state = 406;
        this.match(CsharpParser.CLOSE_BRACKET);
        this.state = 407;
        this.match(CsharpParser.OPEN_BRACE);
        this.state = 408;
        this.match(CsharpParser.NL);
        this.state = 412;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (
          ((_la & ~0x1f) === 0 && ((1 << _la) & 403177472) !== 0) ||
          (((_la - 32) & ~0x1f) === 0 && ((1 << (_la - 32)) & 4589569) !== 0) ||
          _la === 77 ||
          _la === 87
        ) {
          {
            {
              this.state = 409;
              this.ordinaryStatement();
            }
          }
          this.state = 414;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 415;
        this.match(CsharpParser.CLOSE_BRACE);
        this.state = 416;
        this.match(CsharpParser.COMMENT);
        this.state = 417;
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
    this.enterRule(localContext, 36, CsharpParser.RULE_procedureCall);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 420;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 87) {
          {
            this.state = 419;
            this.match(CsharpParser.GHOSTED);
          }
        }

        this.state = 422;
        this.procRef();
        this.state = 423;
        this.match(CsharpParser.OPEN_BRACKET);
        this.state = 424;
        this.argList();
        this.state = 425;
        this.match(CsharpParser.CLOSE_BRACKET);
        this.state = 426;
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
    this.enterRule(localContext, 38, CsharpParser.RULE_procRef);
    try {
      this.state = 431;
      this.errorHandler.sync(this);
      switch (this.interpreter.adaptivePredict(this.tokenStream, 23, this.context)) {
        case 1:
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 428;
            this.methodName();
          }
          break;
        case 2:
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 429;
            this.thisProcRef();
          }
          break;
        case 3:
          this.enterOuterAlt(localContext, 3);
          {
            this.state = 430;
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
    this.enterRule(localContext, 40, CsharpParser.RULE_thisProcRef);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 433;
        this.match(CsharpParser.THIS_INSTANCE);
        this.state = 434;
        this.match(CsharpParser.DOT);
        this.state = 435;
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
    this.enterRule(localContext, 42, CsharpParser.RULE_instanceProcRef);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 437;
        this.identifierWithOptIndexes();
        this.state = 438;
        this.match(CsharpParser.DOT);
        this.state = 439;
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
    this.enterRule(localContext, 44, CsharpParser.RULE_identifierWithOptIndexes);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 441;
        this.identifierUse();
        this.state = 445;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (_la === 58) {
          {
            {
              this.state = 442;
              this.index();
            }
          }
          this.state = 447;
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
    this.enterRule(localContext, 46, CsharpParser.RULE_tryStatement);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 448;
        this.match(CsharpParser.TRY);
        this.state = 449;
        this.match(CsharpParser.OPEN_BRACE);
        this.state = 450;
        this.match(CsharpParser.NL);
        this.state = 454;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (
          ((_la & ~0x1f) === 0 && ((1 << _la) & 403177472) !== 0) ||
          (((_la - 32) & ~0x1f) === 0 && ((1 << (_la - 32)) & 4589569) !== 0) ||
          _la === 77 ||
          _la === 87
        ) {
          {
            {
              this.state = 451;
              this.ordinaryStatement();
            }
          }
          this.state = 456;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 457;
        this.catchStatement();
        this.state = 461;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (
          ((_la & ~0x1f) === 0 && ((1 << _la) & 403177472) !== 0) ||
          (((_la - 32) & ~0x1f) === 0 && ((1 << (_la - 32)) & 4589569) !== 0) ||
          _la === 77 ||
          _la === 87
        ) {
          {
            {
              this.state = 458;
              this.ordinaryStatement();
            }
          }
          this.state = 463;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 464;
        this.match(CsharpParser.CLOSE_BRACE);
        this.state = 465;
        this.match(CsharpParser.COMMENT);
        this.state = 466;
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
    this.enterRule(localContext, 48, CsharpParser.RULE_throwStatement);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 468;
        this.match(CsharpParser.THROW);
        this.state = 469;
        this.match(CsharpParser.NEW);
        this.state = 470;
        this.typeName();
        this.state = 471;
        this.match(CsharpParser.OPEN_BRACKET);
        this.state = 472;
        this.errorMessage();
        this.state = 473;
        this.match(CsharpParser.CLOSE_BRACKET);
        this.state = 474;
        this.match(CsharpParser.SEMI_COLON);
        this.state = 475;
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
    this.enterRule(localContext, 50, CsharpParser.RULE_errorMessage);
    try {
      this.state = 479;
      this.errorHandler.sync(this);
      switch (this.tokenStream.LA(1)) {
        case CsharpParser.LITERAL_STRING:
        case CsharpParser.INTERPOLATED_STRING_PREFIX:
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 477;
            this.litString();
          }
          break;
        case CsharpParser.NAME_STARTING_LC:
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 478;
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
    this.enterRule(localContext, 52, CsharpParser.RULE_assert);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 481;
        this.match(CsharpParser.ASSERT);
        this.state = 482;
        this.match(CsharpParser.DOT);
        this.state = 483;
        this.match(CsharpParser.ARE_EQUAL);
        this.state = 484;
        this.match(CsharpParser.OPEN_BRACKET);
        this.state = 485;
        this.assertActual();
        this.state = 486;
        this.match(CsharpParser.COMMA);
        this.state = 487;
        this.expression();
        this.state = 488;
        this.match(CsharpParser.CLOSE_BRACKET);
        this.state = 489;
        this.match(CsharpParser.SEMI_COLON);
        this.state = 490;
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
    this.enterRule(localContext, 54, CsharpParser.RULE_returnStatement);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 492;
        this.match(CsharpParser.RETURN);
        this.state = 493;
        this.expression();
        this.state = 494;
        this.match(CsharpParser.SEMI_COLON);
        this.state = 495;
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
    this.enterRule(localContext, 56, CsharpParser.RULE_elseIfClause);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 497;
        this.match(CsharpParser.CLOSE_BRACE);
        this.state = 498;
        this.match(CsharpParser.ELSE);
        this.state = 499;
        this.match(CsharpParser.IF);
        this.state = 500;
        this.match(CsharpParser.OPEN_BRACKET);
        this.state = 501;
        this.expression();
        this.state = 502;
        this.match(CsharpParser.CLOSE_BRACKET);
        this.state = 503;
        this.match(CsharpParser.OPEN_BRACE);
        this.state = 504;
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
    this.enterRule(localContext, 58, CsharpParser.RULE_elseClause);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 506;
        this.match(CsharpParser.CLOSE_BRACE);
        this.state = 507;
        this.match(CsharpParser.ELSE);
        this.state = 508;
        this.match(CsharpParser.OPEN_BRACE);
        this.state = 509;
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
    this.enterRule(localContext, 60, CsharpParser.RULE_catchStatement);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 511;
        this.match(CsharpParser.CLOSE_BRACE);
        this.state = 512;
        this.match(CsharpParser.CATCH);
        this.state = 513;
        this.match(CsharpParser.OPEN_BRACKET);
        this.state = 514;
        this.typeName();
        this.state = 515;
        this.identifierDef();
        this.state = 516;
        this.match(CsharpParser.CLOSE_BRACKET);
        this.state = 517;
        this.match(CsharpParser.OPEN_BRACE);
        this.state = 518;
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
    this.enterRule(localContext, 62, CsharpParser.RULE_constructorMember);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 520;
        this.match(CsharpParser.PUBLIC);
        this.state = 521;
        this.match(CsharpParser.OPEN_BRACKET);
        this.state = 523;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (((_la & ~0x1f) === 0 && ((1 << _la) & 252) !== 0) || _la === 52 || _la === 78) {
          {
            this.state = 522;
            this.paramList();
          }
        }

        this.state = 525;
        this.match(CsharpParser.CLOSE_BRACKET);
        this.state = 526;
        this.match(CsharpParser.OPEN_BRACE);
        this.state = 527;
        this.match(CsharpParser.NL);
        this.state = 531;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (
          ((_la & ~0x1f) === 0 && ((1 << _la) & 403177472) !== 0) ||
          (((_la - 32) & ~0x1f) === 0 && ((1 << (_la - 32)) & 4589569) !== 0) ||
          _la === 77 ||
          _la === 87
        ) {
          {
            {
              this.state = 528;
              this.ordinaryStatement();
            }
          }
          this.state = 533;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 534;
        this.match(CsharpParser.CLOSE_BRACE);
        this.state = 535;
        this.match(CsharpParser.COMMENT);
        this.state = 536;
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
    this.enterRule(localContext, 64, CsharpParser.RULE_property);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 538;
        this.match(CsharpParser.PUBLIC);
        this.state = 539;
        this.type_();
        this.state = 540;
        this.identifierDef();
        this.state = 541;
        this.match(CsharpParser.GET_SET);
        this.state = 542;
        this.match(CsharpParser.COMMENT);
        this.state = 543;
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
    this.enterRule(localContext, 66, CsharpParser.RULE_functionMethod);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 545;
        this.match(CsharpParser.PUBLIC);
        this.state = 546;
        this.type_();
        this.state = 547;
        this.methodName();
        this.state = 548;
        this.match(CsharpParser.OPEN_BRACKET);
        this.state = 550;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (((_la & ~0x1f) === 0 && ((1 << _la) & 252) !== 0) || _la === 52 || _la === 78) {
          {
            this.state = 549;
            this.paramList();
          }
        }

        this.state = 552;
        this.match(CsharpParser.CLOSE_BRACKET);
        this.state = 553;
        this.match(CsharpParser.OPEN_BRACE);
        this.state = 554;
        this.match(CsharpParser.COMMENT);
        this.state = 555;
        this.match(CsharpParser.NL);
        this.state = 559;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (
          ((_la & ~0x1f) === 0 && ((1 << _la) & 403177472) !== 0) ||
          (((_la - 32) & ~0x1f) === 0 && ((1 << (_la - 32)) & 4589569) !== 0) ||
          _la === 77 ||
          _la === 87
        ) {
          {
            {
              this.state = 556;
              this.ordinaryStatement();
            }
          }
          this.state = 561;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 562;
        this.returnStatement();
        this.state = 563;
        this.match(CsharpParser.CLOSE_BRACE);
        this.state = 564;
        this.match(CsharpParser.COMMENT);
        this.state = 565;
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
    this.enterRule(localContext, 68, CsharpParser.RULE_procedureMethod);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 567;
        this.match(CsharpParser.PUBLIC);
        this.state = 568;
        this.match(CsharpParser.VOID);
        this.state = 569;
        this.methodName();
        this.state = 570;
        this.match(CsharpParser.OPEN_BRACKET);
        this.state = 572;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (((_la & ~0x1f) === 0 && ((1 << _la) & 252) !== 0) || _la === 52 || _la === 78) {
          {
            this.state = 571;
            this.paramList();
          }
        }

        this.state = 574;
        this.match(CsharpParser.CLOSE_BRACKET);
        this.state = 575;
        this.match(CsharpParser.OPEN_BRACE);
        this.state = 576;
        this.match(CsharpParser.COMMENT);
        this.state = 577;
        this.match(CsharpParser.NL);
        this.state = 581;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (
          ((_la & ~0x1f) === 0 && ((1 << _la) & 403177472) !== 0) ||
          (((_la - 32) & ~0x1f) === 0 && ((1 << (_la - 32)) & 4589569) !== 0) ||
          _la === 77 ||
          _la === 87
        ) {
          {
            {
              this.state = 578;
              this.ordinaryStatement();
            }
          }
          this.state = 583;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 584;
        this.match(CsharpParser.CLOSE_BRACE);
        this.state = 585;
        this.match(CsharpParser.COMMENT);
        this.state = 586;
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
    this.enterRule(localContext, 70, CsharpParser.RULE_abstractFunction);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 588;
        this.match(CsharpParser.ABSTRACT);
        this.state = 589;
        this.type_();
        this.state = 590;
        this.methodName();
        this.state = 591;
        this.match(CsharpParser.OPEN_BRACKET);
        this.state = 593;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (((_la & ~0x1f) === 0 && ((1 << _la) & 252) !== 0) || _la === 52 || _la === 78) {
          {
            this.state = 592;
            this.paramList();
          }
        }

        this.state = 595;
        this.match(CsharpParser.CLOSE_BRACKET);
        this.state = 596;
        this.match(CsharpParser.SEMI_COLON);
        this.state = 597;
        this.match(CsharpParser.COMMENT);
        this.state = 598;
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
    this.enterRule(localContext, 72, CsharpParser.RULE_abstractProcedure);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 600;
        this.match(CsharpParser.ABSTRACT);
        this.state = 601;
        this.match(CsharpParser.VOID);
        this.state = 602;
        this.methodName();
        this.state = 603;
        this.match(CsharpParser.OPEN_BRACKET);
        this.state = 605;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (((_la & ~0x1f) === 0 && ((1 << _la) & 252) !== 0) || _la === 52 || _la === 78) {
          {
            this.state = 604;
            this.paramList();
          }
        }

        this.state = 607;
        this.match(CsharpParser.CLOSE_BRACKET);
        this.state = 608;
        this.match(CsharpParser.SEMI_COLON);
        this.state = 609;
        this.match(CsharpParser.COMMENT);
        this.state = 610;
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
    this.enterRule(localContext, 74, CsharpParser.RULE_identifierDef);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 612;
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
    this.enterRule(localContext, 76, CsharpParser.RULE_identifierUse);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 614;
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
    let _startState = 78;
    this.enterRecursionRule(localContext, 78, CsharpParser.RULE_assignable, _p);
    try {
      let alternative: number;
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 621;
        this.errorHandler.sync(this);
        switch (this.tokenStream.LA(1)) {
          case CsharpParser.NAME_STARTING_LC:
            {
              this.state = 617;
              this.identifierUse();
            }
            break;
          case CsharpParser.THIS_INSTANCE:
            {
              this.state = 618;
              this.match(CsharpParser.THIS_INSTANCE);
              this.state = 619;
              this.match(CsharpParser.DOT);
              this.state = 620;
              this.identifierUse();
            }
            break;
          default:
            throw new antlr.NoViableAltException(this);
        }
        this.context!.stop = this.tokenStream.LT(-1);
        this.state = 627;
        this.errorHandler.sync(this);
        alternative = this.interpreter.adaptivePredict(this.tokenStream, 37, this.context);
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
                this.state = 623;
                if (!this.precpred(this.context, 1)) {
                  throw this.createFailedPredicateException("this.precpred(this.context, 1)");
                }
                this.state = 624;
                this.index();
              }
            }
          }
          this.state = 629;
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
      this.unrollRecursionContexts(parentContext);
    }
    return localContext;
  }
  public methodName(): MethodNameContext {
    let localContext = new MethodNameContext(this.context, this.state);
    this.enterRule(localContext, 80, CsharpParser.RULE_methodName);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 630;
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
    this.enterRule(localContext, 82, CsharpParser.RULE_testName);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 632;
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
    this.enterRule(localContext, 84, CsharpParser.RULE_typeName);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 634;
        _la = this.tokenStream.LA(1);
        if (!(((_la & ~0x1f) === 0 && ((1 << _la) & 124) !== 0) || _la === 78)) {
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
    this.enterRule(localContext, 86, CsharpParser.RULE_constantValue);
    try {
      this.state = 640;
      this.errorHandler.sync(this);
      switch (this.tokenStream.LA(1)) {
        case CsharpParser.TRUE:
        case CsharpParser.FALSE:
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 636;
            this.litBoolean();
          }
          break;
        case CsharpParser.LITERAL_BINARY:
        case CsharpParser.LITERAL_HEX:
        case CsharpParser.LITERAL_INTEGER:
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 637;
            this.litInt();
          }
          break;
        case CsharpParser.LITERAL_FLOAT:
          this.enterOuterAlt(localContext, 3);
          {
            this.state = 638;
            this.litFloat();
          }
          break;
        case CsharpParser.LITERAL_STRING:
        case CsharpParser.INTERPOLATED_STRING_PREFIX:
          this.enterOuterAlt(localContext, 4);
          {
            this.state = 639;
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
    this.enterRule(localContext, 88, CsharpParser.RULE_argList);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 642;
        this.argument();
        this.state = 647;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (_la === 63) {
          {
            {
              this.state = 643;
              this.match(CsharpParser.COMMA);
              this.state = 644;
              this.argument();
            }
          }
          this.state = 649;
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
    this.enterRule(localContext, 90, CsharpParser.RULE_argument);
    try {
      this.state = 652;
      this.errorHandler.sync(this);
      switch (this.tokenStream.LA(1)) {
        case CsharpParser.LAMBDA:
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 650;
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
            this.state = 651;
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
    this.enterRule(localContext, 92, CsharpParser.RULE_paramList);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 654;
        this.paramDef();
        this.state = 659;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (_la === 63) {
          {
            {
              this.state = 655;
              this.match(CsharpParser.COMMA);
              this.state = 656;
              this.paramDef();
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
  public identifierList(): IdentifierListContext {
    let localContext = new IdentifierListContext(this.context, this.state);
    this.enterRule(localContext, 94, CsharpParser.RULE_identifierList);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 662;
        this.identifierDef();
        this.state = 665;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        do {
          {
            {
              this.state = 663;
              this.match(CsharpParser.COMMA);
              this.state = 664;
              this.identifierDef();
            }
          }
          this.state = 667;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        } while (_la === 63);
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
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
    this.enterRule(localContext, 96, CsharpParser.RULE_expressionList);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 669;
        this.expression();
        this.state = 674;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (_la === 63) {
          {
            {
              this.state = 670;
              this.match(CsharpParser.COMMA);
              this.state = 671;
              this.expression();
            }
          }
          this.state = 676;
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
    this.enterRule(localContext, 98, CsharpParser.RULE_type);
    try {
      this.state = 681;
      this.errorHandler.sync(this);
      switch (this.interpreter.adaptivePredict(this.tokenStream, 44, this.context)) {
        case 1:
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 677;
            this.typeTuple();
          }
          break;
        case 2:
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 678;
            this.typeName();
          }
          break;
        case 3:
          this.enterOuterAlt(localContext, 3);
          {
            this.state = 679;
            this.typeGeneric();
          }
          break;
        case 4:
          this.enterOuterAlt(localContext, 4);
          {
            this.state = 680;
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
    this.enterRule(localContext, 100, CsharpParser.RULE_assertActual);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 683;
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
    this.enterRule(localContext, 102, CsharpParser.RULE_assertExpected);
    try {
      this.state = 690;
      this.errorHandler.sync(this);
      switch (this.interpreter.adaptivePredict(this.tokenStream, 45, this.context)) {
        case 1:
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 685;
            this.litValue();
          }
          break;
        case 2:
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 686;
            this.list();
          }
          break;
        case 3:
          this.enterOuterAlt(localContext, 3);
          {
            this.state = 687;
            this.dictionary();
          }
          break;
        case 4:
          this.enterOuterAlt(localContext, 4);
          {
            this.state = 688;
            this.unaryExpression();
          }
          break;
        case 5:
          this.enterOuterAlt(localContext, 5);
          {
            this.state = 689;
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
    this.enterRule(localContext, 104, CsharpParser.RULE_litValue);
    try {
      this.state = 698;
      this.errorHandler.sync(this);
      switch (this.tokenStream.LA(1)) {
        case CsharpParser.TRUE:
        case CsharpParser.FALSE:
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 692;
            this.litBoolean();
          }
          break;
        case CsharpParser.LITERAL_BINARY:
        case CsharpParser.LITERAL_HEX:
        case CsharpParser.LITERAL_INTEGER:
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 693;
            this.litInt();
          }
          break;
        case CsharpParser.LITERAL_FLOAT:
          this.enterOuterAlt(localContext, 3);
          {
            this.state = 694;
            this.litFloat();
          }
          break;
        case CsharpParser.LITERAL_STRING:
        case CsharpParser.INTERPOLATED_STRING_PREFIX:
          this.enterOuterAlt(localContext, 4);
          {
            this.state = 695;
            this.litString();
          }
          break;
        case CsharpParser.INTERPOLATED_STRING:
          this.enterOuterAlt(localContext, 5);
          {
            this.state = 696;
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
            this.state = 697;
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
    this.enterRule(localContext, 106, CsharpParser.RULE_litBoolean);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 700;
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
    this.enterRule(localContext, 108, CsharpParser.RULE_litInt);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 702;
        _la = this.tokenStream.LA(1);
        if (!(((_la - 79) & ~0x1f) === 0 && ((1 << (_la - 79)) & 7) !== 0)) {
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
    this.enterRule(localContext, 110, CsharpParser.RULE_litFloat);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 704;
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
    this.enterRule(localContext, 112, CsharpParser.RULE_litString);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 707;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 84) {
          {
            this.state = 706;
            this.match(CsharpParser.INTERPOLATED_STRING_PREFIX);
          }
        }

        this.state = 709;
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
    this.enterRule(localContext, 114, CsharpParser.RULE_enumValue);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 711;
        this.typeName();
        this.state = 712;
        this.match(CsharpParser.DOT);
        this.state = 713;
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
    this.enterRule(localContext, 116, CsharpParser.RULE_index);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 715;
        this.match(CsharpParser.OPEN_SQ_BRACKET);
        this.state = 716;
        this.expression();
        this.state = 717;
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
    this.enterRule(localContext, 118, CsharpParser.RULE_expression);
    try {
      this.state = 732;
      this.errorHandler.sync(this);
      switch (this.interpreter.adaptivePredict(this.tokenStream, 48, this.context)) {
        case 1:
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 719;
            this.newInstance();
          }
          break;
        case 2:
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 720;
            this.unaryExpression();
          }
          break;
        case 3:
          this.enterOuterAlt(localContext, 3);
          {
            this.state = 721;
            this.term(0);
          }
          break;
        case 4:
          this.enterOuterAlt(localContext, 4);
          {
            this.state = 722;
            this.binaryExpression();
          }
          break;
        case 5:
          this.enterOuterAlt(localContext, 5);
          {
            this.state = 723;
            this.match(CsharpParser.IF_);
            this.state = 724;
            this.match(CsharpParser.OPEN_BRACKET);
            this.state = 725;
            this.expression();
            this.state = 726;
            this.match(CsharpParser.COMMA);
            this.state = 727;
            this.expression();
            this.state = 728;
            this.match(CsharpParser.COMMA);
            this.state = 729;
            this.expression();
            this.state = 730;
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
    let _startState = 120;
    this.enterRecursionRule(localContext, 120, CsharpParser.RULE_term, _p);
    try {
      let alternative: number;
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 743;
        this.errorHandler.sync(this);
        switch (this.interpreter.adaptivePredict(this.tokenStream, 49, this.context)) {
          case 1:
            {
              this.state = 735;
              this.thisInstance();
            }
            break;
          case 2:
            {
              this.state = 736;
              this.bracketedExpression();
            }
            break;
          case 3:
            {
              this.state = 737;
              this.litValue();
            }
            break;
          case 4:
            {
              this.state = 738;
              this.list();
            }
            break;
          case 5:
            {
              this.state = 739;
              this.dictionary();
            }
            break;
          case 6:
            {
              this.state = 740;
              this.tuple();
            }
            break;
          case 7:
            {
              this.state = 741;
              this.identifierUse();
            }
            break;
          case 8:
            {
              this.state = 742;
              this.methodCall();
            }
            break;
        }
        this.context!.stop = this.tokenStream.LT(-1);
        this.state = 752;
        this.errorHandler.sync(this);
        alternative = this.interpreter.adaptivePredict(this.tokenStream, 51, this.context);
        while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
          if (alternative === 1) {
            if (this.parseListeners != null) {
              this.triggerExitRuleEvent();
            }
            previousContext = localContext;
            {
              this.state = 750;
              this.errorHandler.sync(this);
              switch (this.interpreter.adaptivePredict(this.tokenStream, 50, this.context)) {
                case 1:
                  {
                    localContext = new TermContext(parentContext, parentState);
                    this.pushNewRecursionContext(localContext, _startState, CsharpParser.RULE_term);
                    this.state = 745;
                    if (!this.precpred(this.context, 2)) {
                      throw this.createFailedPredicateException("this.precpred(this.context, 2)");
                    }
                    this.state = 746;
                    this.index();
                  }
                  break;
                case 2:
                  {
                    localContext = new TermContext(parentContext, parentState);
                    this.pushNewRecursionContext(localContext, _startState, CsharpParser.RULE_term);
                    this.state = 747;
                    if (!this.precpred(this.context, 1)) {
                      throw this.createFailedPredicateException("this.precpred(this.context, 1)");
                    }
                    this.state = 748;
                    this.match(CsharpParser.DOT);
                    this.state = 749;
                    this.chainable();
                  }
                  break;
              }
            }
          }
          this.state = 754;
          this.errorHandler.sync(this);
          alternative = this.interpreter.adaptivePredict(this.tokenStream, 51, this.context);
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
    this.enterRule(localContext, 122, CsharpParser.RULE_chainable);
    try {
      let alternative: number;
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 757;
        this.errorHandler.sync(this);
        switch (this.interpreter.adaptivePredict(this.tokenStream, 52, this.context)) {
          case 1:
            {
              this.state = 755;
              this.identifierUse();
            }
            break;
          case 2:
            {
              this.state = 756;
              this.methodCall();
            }
            break;
        }
        this.state = 762;
        this.errorHandler.sync(this);
        alternative = this.interpreter.adaptivePredict(this.tokenStream, 53, this.context);
        while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
          if (alternative === 1) {
            {
              {
                this.state = 759;
                this.index();
              }
            }
          }
          this.state = 764;
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
  public thisInstance(): ThisInstanceContext {
    let localContext = new ThisInstanceContext(this.context, this.state);
    this.enterRule(localContext, 124, CsharpParser.RULE_thisInstance);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 765;
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
    this.enterRule(localContext, 126, CsharpParser.RULE_bracketedExpression);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 767;
        this.match(CsharpParser.OPEN_BRACKET);
        this.state = 768;
        this.expression();
        this.state = 769;
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
    this.enterRule(localContext, 128, CsharpParser.RULE_unaryExpression);
    try {
      this.state = 773;
      this.errorHandler.sync(this);
      switch (this.tokenStream.LA(1)) {
        case CsharpParser.MINUS:
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 771;
            this.negateNumeric();
          }
          break;
        case CsharpParser.NOT:
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 772;
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
    this.enterRule(localContext, 130, CsharpParser.RULE_negateNumeric);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 775;
        this.match(CsharpParser.MINUS);
        this.state = 776;
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
    this.enterRule(localContext, 132, CsharpParser.RULE_negateLogical);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 778;
        this.match(CsharpParser.NOT);
        this.state = 779;
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
    this.enterRule(localContext, 134, CsharpParser.RULE_binaryExpression);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 781;
        localContext._left = this.term(0);
        this.state = 782;
        this.binaryOperator();
        this.state = 783;
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
    this.enterRule(localContext, 136, CsharpParser.RULE_list);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 785;
        this.match(CsharpParser.OPEN_BRACE);
        this.state = 786;
        this.expression();
        this.state = 791;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (_la === 63) {
          {
            {
              this.state = 787;
              this.match(CsharpParser.COMMA);
              this.state = 788;
              this.expression();
            }
          }
          this.state = 793;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 794;
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
    this.enterRule(localContext, 138, CsharpParser.RULE_tuple);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 796;
        this.match(CsharpParser.OPEN_BRACKET);
        this.state = 797;
        this.expression();
        this.state = 798;
        this.match(CsharpParser.COMMA);
        this.state = 799;
        this.expression();
        this.state = 804;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (_la === 63) {
          {
            {
              this.state = 800;
              this.match(CsharpParser.COMMA);
              this.state = 801;
              this.expression();
            }
          }
          this.state = 806;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 807;
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
    this.enterRule(localContext, 140, CsharpParser.RULE_dictionary);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 809;
        this.match(CsharpParser.OPEN_BRACE);
        this.state = 810;
        this.kvpList();
        this.state = 811;
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
    this.enterRule(localContext, 142, CsharpParser.RULE_kvpList);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 813;
        this.kvp();
        this.state = 818;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (_la === 63) {
          {
            {
              this.state = 814;
              this.match(CsharpParser.COMMA);
              this.state = 815;
              this.kvp();
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
  public kvp(): KvpContext {
    let localContext = new KvpContext(this.context, this.state);
    this.enterRule(localContext, 144, CsharpParser.RULE_kvp);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 821;
        this.match(CsharpParser.OPEN_BRACE);
        this.state = 822;
        this.expression();
        this.state = 823;
        this.match(CsharpParser.COLON);
        this.state = 824;
        this.expression();
        this.state = 825;
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
    this.enterRule(localContext, 146, CsharpParser.RULE_methodCall);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 827;
        this.methodName();
        this.state = 828;
        this.match(CsharpParser.OPEN_BRACKET);
        this.state = 830;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (
          (((_la - 2) & ~0x1f) === 0 && ((1 << (_la - 2)) & 2147615967) !== 0) ||
          (((_la - 46) & ~0x1f) === 0 && ((1 << (_la - 46)) & 2148549761) !== 0) ||
          (((_la - 78) & ~0x1f) === 0 && ((1 << (_la - 78)) & 33554559) !== 0)
        ) {
          {
            this.state = 829;
            this.argList();
          }
        }

        this.state = 832;
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
    this.enterRule(localContext, 148, CsharpParser.RULE_binaryOperator);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 834;
        _la = this.tokenStream.LA(1);
        if (!(
          ((_la & ~0x1f) === 0 && ((1 << _la) & 60416) !== 0) ||
          (((_la - 65) & ~0x1f) === 0 && ((1 << (_la - 65)) & 255) !== 0)
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
    this.enterRule(localContext, 150, CsharpParser.RULE_newInstance);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 836;
        this.match(CsharpParser.NEW);
        this.state = 837;
        this.type_();
        this.state = 838;
        this.match(CsharpParser.OPEN_BRACKET);
        this.state = 840;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (
          (((_la - 2) & ~0x1f) === 0 && ((1 << (_la - 2)) & 2147615967) !== 0) ||
          (((_la - 46) & ~0x1f) === 0 && ((1 << (_la - 46)) & 2148549761) !== 0) ||
          (((_la - 78) & ~0x1f) === 0 && ((1 << (_la - 78)) & 33554559) !== 0)
        ) {
          {
            this.state = 839;
            this.argList();
          }
        }

        this.state = 842;
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
    this.enterRule(localContext, 152, CsharpParser.RULE_paramDef);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 844;
        this.type_();
        this.state = 845;
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
    this.enterRule(localContext, 154, CsharpParser.RULE_typeGeneric);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 847;
        this.typeName();
        this.state = 848;
        this.match(CsharpParser.LT);
        this.state = 849;
        this.type_();
        this.state = 854;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (_la === 63) {
          {
            {
              this.state = 850;
              this.match(CsharpParser.COMMA);
              this.state = 851;
              this.type_();
            }
          }
          this.state = 856;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 857;
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
    this.enterRule(localContext, 156, CsharpParser.RULE_typeFunc);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 859;
        this.match(CsharpParser.FUNC_NAME);
        this.state = 860;
        this.match(CsharpParser.LT);
        this.state = 861;
        this.type_();
        this.state = 866;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (_la === 63) {
          {
            {
              this.state = 862;
              this.match(CsharpParser.COMMA);
              this.state = 863;
              this.type_();
            }
          }
          this.state = 868;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 869;
        this.match(CsharpParser.ARROW);
        this.state = 870;
        this.type_();
        this.state = 871;
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
    this.enterRule(localContext, 158, CsharpParser.RULE_typeTuple);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 873;
        this.match(CsharpParser.TUPLE);
        this.state = 874;
        this.match(CsharpParser.OPEN_SQ_BRACKET);
        this.state = 875;
        this.type_();
        this.state = 878;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        do {
          {
            {
              this.state = 876;
              this.match(CsharpParser.COMMA);
              this.state = 877;
              this.type_();
            }
          }
          this.state = 880;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        } while (_la === 63);
        this.state = 882;
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
    this.enterRule(localContext, 160, CsharpParser.RULE_lambda);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 884;
        this.match(CsharpParser.LAMBDA);
        this.state = 885;
        this.argList();
        this.state = 886;
        this.match(CsharpParser.COLON);
        this.state = 887;
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
    this.enterRule(localContext, 162, CsharpParser.RULE_interpolatedString);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 889;
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
    this.enterRule(localContext, 164, CsharpParser.RULE_power);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 891;
        this.term(0);
        this.state = 892;
        this.match(CsharpParser.POWER);
        this.state = 893;
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
      case 39:
        return this.assignable_sempred(localContext as AssignableContext, predIndex);
      case 60:
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
    4, 1, 103, 896, 2, 0, 7, 0, 2, 1, 7, 1, 2, 2, 7, 2, 2, 3, 7, 3, 2, 4, 7, 4, 2, 5, 7, 5, 2, 6, 7,
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
    7, 81, 2, 82, 7, 82, 1, 0, 3, 0, 168, 8, 0, 1, 0, 5, 0, 171, 8, 0, 10, 0, 12, 0, 174, 9, 0, 1,
    0, 5, 0, 177, 8, 0, 10, 0, 12, 0, 180, 9, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 3, 1, 193, 8, 1, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 5, 2, 203, 8, 2,
    10, 2, 12, 2, 206, 9, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 3, 3, 217, 8, 3,
    1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 5, 3, 226, 8, 3, 10, 3, 12, 3, 229, 9, 3, 1, 3, 1, 3,
    1, 3, 1, 3, 1, 3, 1, 4, 1, 4, 1, 4, 1, 4, 1, 4, 1, 4, 1, 4, 1, 4, 1, 4, 1, 4, 1, 4, 5, 4, 247,
    8, 4, 10, 4, 12, 4, 250, 9, 4, 1, 4, 1, 4, 1, 4, 1, 4, 1, 5, 1, 5, 1, 5, 1, 5, 1, 5, 3, 5, 261,
    8, 5, 1, 5, 1, 5, 1, 5, 1, 5, 1, 5, 5, 5, 268, 8, 5, 10, 5, 12, 5, 271, 9, 5, 1, 5, 1, 5, 1, 5,
    1, 5, 1, 6, 1, 6, 1, 6, 1, 6, 1, 6, 1, 6, 1, 6, 1, 7, 1, 7, 1, 7, 1, 7, 1, 7, 1, 7, 1, 7, 1, 8,
    1, 8, 1, 8, 1, 8, 3, 8, 295, 8, 8, 1, 8, 1, 8, 1, 8, 1, 8, 1, 8, 1, 8, 1, 8, 5, 8, 304, 8, 8,
    10, 8, 12, 8, 307, 9, 8, 1, 8, 1, 8, 1, 8, 1, 8, 1, 9, 1, 9, 1, 9, 1, 9, 1, 9, 3, 9, 318, 8, 9,
    1, 9, 1, 9, 1, 9, 1, 9, 1, 9, 1, 9, 1, 9, 1, 9, 5, 9, 328, 8, 9, 10, 9, 12, 9, 331, 9, 9, 1, 9,
    1, 9, 1, 9, 1, 9, 1, 10, 1, 10, 1, 10, 1, 11, 1, 11, 1, 12, 1, 12, 1, 12, 1, 12, 1, 12, 1, 12,
    1, 12, 1, 12, 1, 12, 3, 12, 351, 8, 12, 1, 13, 1, 13, 1, 13, 1, 13, 1, 13, 1, 13, 1, 13, 1, 14,
    1, 14, 1, 14, 1, 14, 1, 14, 1, 14, 1, 14, 1, 15, 1, 15, 1, 15, 1, 15, 1, 15, 1, 15, 1, 15, 1,
    15, 1, 15, 5, 15, 376, 8, 15, 10, 15, 12, 15, 379, 9, 15, 1, 15, 1, 15, 1, 15, 1, 15, 1, 16, 1,
    16, 1, 16, 1, 16, 1, 16, 1, 16, 1, 16, 5, 16, 392, 8, 16, 10, 16, 12, 16, 395, 9, 16, 1, 16, 1,
    16, 1, 16, 1, 16, 1, 17, 1, 17, 1, 17, 1, 17, 1, 17, 1, 17, 1, 17, 1, 17, 1, 17, 1, 17, 5, 17,
    411, 8, 17, 10, 17, 12, 17, 414, 9, 17, 1, 17, 1, 17, 1, 17, 1, 17, 1, 18, 3, 18, 421, 8, 18, 1,
    18, 1, 18, 1, 18, 1, 18, 1, 18, 1, 18, 1, 19, 1, 19, 1, 19, 3, 19, 432, 8, 19, 1, 20, 1, 20, 1,
    20, 1, 20, 1, 21, 1, 21, 1, 21, 1, 21, 1, 22, 1, 22, 5, 22, 444, 8, 22, 10, 22, 12, 22, 447, 9,
    22, 1, 23, 1, 23, 1, 23, 1, 23, 5, 23, 453, 8, 23, 10, 23, 12, 23, 456, 9, 23, 1, 23, 1, 23, 5,
    23, 460, 8, 23, 10, 23, 12, 23, 463, 9, 23, 1, 23, 1, 23, 1, 23, 1, 23, 1, 24, 1, 24, 1, 24, 1,
    24, 1, 24, 1, 24, 1, 24, 1, 24, 1, 24, 1, 25, 1, 25, 3, 25, 480, 8, 25, 1, 26, 1, 26, 1, 26, 1,
    26, 1, 26, 1, 26, 1, 26, 1, 26, 1, 26, 1, 26, 1, 26, 1, 27, 1, 27, 1, 27, 1, 27, 1, 27, 1, 28,
    1, 28, 1, 28, 1, 28, 1, 28, 1, 28, 1, 28, 1, 28, 1, 28, 1, 29, 1, 29, 1, 29, 1, 29, 1, 29, 1,
    30, 1, 30, 1, 30, 1, 30, 1, 30, 1, 30, 1, 30, 1, 30, 1, 30, 1, 31, 1, 31, 1, 31, 3, 31, 524, 8,
    31, 1, 31, 1, 31, 1, 31, 1, 31, 5, 31, 530, 8, 31, 10, 31, 12, 31, 533, 9, 31, 1, 31, 1, 31, 1,
    31, 1, 31, 1, 32, 1, 32, 1, 32, 1, 32, 1, 32, 1, 32, 1, 32, 1, 33, 1, 33, 1, 33, 1, 33, 1, 33,
    3, 33, 551, 8, 33, 1, 33, 1, 33, 1, 33, 1, 33, 1, 33, 5, 33, 558, 8, 33, 10, 33, 12, 33, 561, 9,
    33, 1, 33, 1, 33, 1, 33, 1, 33, 1, 33, 1, 34, 1, 34, 1, 34, 1, 34, 1, 34, 3, 34, 573, 8, 34, 1,
    34, 1, 34, 1, 34, 1, 34, 1, 34, 5, 34, 580, 8, 34, 10, 34, 12, 34, 583, 9, 34, 1, 34, 1, 34, 1,
    34, 1, 34, 1, 35, 1, 35, 1, 35, 1, 35, 1, 35, 3, 35, 594, 8, 35, 1, 35, 1, 35, 1, 35, 1, 35, 1,
    35, 1, 36, 1, 36, 1, 36, 1, 36, 1, 36, 3, 36, 606, 8, 36, 1, 36, 1, 36, 1, 36, 1, 36, 1, 36, 1,
    37, 1, 37, 1, 38, 1, 38, 1, 39, 1, 39, 1, 39, 1, 39, 1, 39, 3, 39, 622, 8, 39, 1, 39, 1, 39, 5,
    39, 626, 8, 39, 10, 39, 12, 39, 629, 9, 39, 1, 40, 1, 40, 1, 41, 1, 41, 1, 42, 1, 42, 1, 43, 1,
    43, 1, 43, 1, 43, 3, 43, 641, 8, 43, 1, 44, 1, 44, 1, 44, 5, 44, 646, 8, 44, 10, 44, 12, 44,
    649, 9, 44, 1, 45, 1, 45, 3, 45, 653, 8, 45, 1, 46, 1, 46, 1, 46, 5, 46, 658, 8, 46, 10, 46, 12,
    46, 661, 9, 46, 1, 47, 1, 47, 1, 47, 4, 47, 666, 8, 47, 11, 47, 12, 47, 667, 1, 48, 1, 48, 1,
    48, 5, 48, 673, 8, 48, 10, 48, 12, 48, 676, 9, 48, 1, 49, 1, 49, 1, 49, 1, 49, 3, 49, 682, 8,
    49, 1, 50, 1, 50, 1, 51, 1, 51, 1, 51, 1, 51, 1, 51, 3, 51, 691, 8, 51, 1, 52, 1, 52, 1, 52, 1,
    52, 1, 52, 1, 52, 3, 52, 699, 8, 52, 1, 53, 1, 53, 1, 54, 1, 54, 1, 55, 1, 55, 1, 56, 3, 56,
    708, 8, 56, 1, 56, 1, 56, 1, 57, 1, 57, 1, 57, 1, 57, 1, 58, 1, 58, 1, 58, 1, 58, 1, 59, 1, 59,
    1, 59, 1, 59, 1, 59, 1, 59, 1, 59, 1, 59, 1, 59, 1, 59, 1, 59, 1, 59, 1, 59, 3, 59, 733, 8, 59,
    1, 60, 1, 60, 1, 60, 1, 60, 1, 60, 1, 60, 1, 60, 1, 60, 1, 60, 3, 60, 744, 8, 60, 1, 60, 1, 60,
    1, 60, 1, 60, 1, 60, 5, 60, 751, 8, 60, 10, 60, 12, 60, 754, 9, 60, 1, 61, 1, 61, 3, 61, 758, 8,
    61, 1, 61, 5, 61, 761, 8, 61, 10, 61, 12, 61, 764, 9, 61, 1, 62, 1, 62, 1, 63, 1, 63, 1, 63, 1,
    63, 1, 64, 1, 64, 3, 64, 774, 8, 64, 1, 65, 1, 65, 1, 65, 1, 66, 1, 66, 1, 66, 1, 67, 1, 67, 1,
    67, 1, 67, 1, 68, 1, 68, 1, 68, 1, 68, 5, 68, 790, 8, 68, 10, 68, 12, 68, 793, 9, 68, 1, 68, 1,
    68, 1, 69, 1, 69, 1, 69, 1, 69, 1, 69, 1, 69, 5, 69, 803, 8, 69, 10, 69, 12, 69, 806, 9, 69, 1,
    69, 1, 69, 1, 70, 1, 70, 1, 70, 1, 70, 1, 71, 1, 71, 1, 71, 5, 71, 817, 8, 71, 10, 71, 12, 71,
    820, 9, 71, 1, 72, 1, 72, 1, 72, 1, 72, 1, 72, 1, 72, 1, 73, 1, 73, 1, 73, 3, 73, 831, 8, 73, 1,
    73, 1, 73, 1, 74, 1, 74, 1, 75, 1, 75, 1, 75, 1, 75, 3, 75, 841, 8, 75, 1, 75, 1, 75, 1, 76, 1,
    76, 1, 76, 1, 77, 1, 77, 1, 77, 1, 77, 1, 77, 5, 77, 853, 8, 77, 10, 77, 12, 77, 856, 9, 77, 1,
    77, 1, 77, 1, 78, 1, 78, 1, 78, 1, 78, 1, 78, 5, 78, 865, 8, 78, 10, 78, 12, 78, 868, 9, 78, 1,
    78, 1, 78, 1, 78, 1, 78, 1, 79, 1, 79, 1, 79, 1, 79, 1, 79, 4, 79, 879, 8, 79, 11, 79, 12, 79,
    880, 1, 79, 1, 79, 1, 80, 1, 80, 1, 80, 1, 80, 1, 80, 1, 81, 1, 81, 1, 82, 1, 82, 1, 82, 1, 82,
    1, 82, 0, 2, 78, 120, 83, 0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36,
    38, 40, 42, 44, 46, 48, 50, 52, 54, 56, 58, 60, 62, 64, 66, 68, 70, 72, 74, 76, 78, 80, 82, 84,
    86, 88, 90, 92, 94, 96, 98, 100, 102, 104, 106, 108, 110, 112, 114, 116, 118, 120, 122, 124,
    126, 128, 130, 132, 134, 136, 138, 140, 142, 144, 146, 148, 150, 152, 154, 156, 158, 160, 162,
    164, 0, 4, 2, 0, 2, 6, 78, 78, 1, 0, 8, 9, 1, 0, 79, 81, 3, 0, 10, 11, 13, 15, 65, 72, 919, 0,
    167, 1, 0, 0, 0, 2, 192, 1, 0, 0, 0, 4, 194, 1, 0, 0, 0, 6, 211, 1, 0, 0, 0, 8, 235, 1, 0, 0, 0,
    10, 255, 1, 0, 0, 0, 12, 276, 1, 0, 0, 0, 14, 283, 1, 0, 0, 0, 16, 290, 1, 0, 0, 0, 18, 312, 1,
    0, 0, 0, 20, 336, 1, 0, 0, 0, 22, 339, 1, 0, 0, 0, 24, 350, 1, 0, 0, 0, 26, 352, 1, 0, 0, 0, 28,
    359, 1, 0, 0, 0, 30, 366, 1, 0, 0, 0, 32, 384, 1, 0, 0, 0, 34, 400, 1, 0, 0, 0, 36, 420, 1, 0,
    0, 0, 38, 431, 1, 0, 0, 0, 40, 433, 1, 0, 0, 0, 42, 437, 1, 0, 0, 0, 44, 441, 1, 0, 0, 0, 46,
    448, 1, 0, 0, 0, 48, 468, 1, 0, 0, 0, 50, 479, 1, 0, 0, 0, 52, 481, 1, 0, 0, 0, 54, 492, 1, 0,
    0, 0, 56, 497, 1, 0, 0, 0, 58, 506, 1, 0, 0, 0, 60, 511, 1, 0, 0, 0, 62, 520, 1, 0, 0, 0, 64,
    538, 1, 0, 0, 0, 66, 545, 1, 0, 0, 0, 68, 567, 1, 0, 0, 0, 70, 588, 1, 0, 0, 0, 72, 600, 1, 0,
    0, 0, 74, 612, 1, 0, 0, 0, 76, 614, 1, 0, 0, 0, 78, 621, 1, 0, 0, 0, 80, 630, 1, 0, 0, 0, 82,
    632, 1, 0, 0, 0, 84, 634, 1, 0, 0, 0, 86, 640, 1, 0, 0, 0, 88, 642, 1, 0, 0, 0, 90, 652, 1, 0,
    0, 0, 92, 654, 1, 0, 0, 0, 94, 662, 1, 0, 0, 0, 96, 669, 1, 0, 0, 0, 98, 681, 1, 0, 0, 0, 100,
    683, 1, 0, 0, 0, 102, 690, 1, 0, 0, 0, 104, 698, 1, 0, 0, 0, 106, 700, 1, 0, 0, 0, 108, 702, 1,
    0, 0, 0, 110, 704, 1, 0, 0, 0, 112, 707, 1, 0, 0, 0, 114, 711, 1, 0, 0, 0, 116, 715, 1, 0, 0, 0,
    118, 732, 1, 0, 0, 0, 120, 743, 1, 0, 0, 0, 122, 757, 1, 0, 0, 0, 124, 765, 1, 0, 0, 0, 126,
    767, 1, 0, 0, 0, 128, 773, 1, 0, 0, 0, 130, 775, 1, 0, 0, 0, 132, 778, 1, 0, 0, 0, 134, 781, 1,
    0, 0, 0, 136, 785, 1, 0, 0, 0, 138, 796, 1, 0, 0, 0, 140, 809, 1, 0, 0, 0, 142, 813, 1, 0, 0, 0,
    144, 821, 1, 0, 0, 0, 146, 827, 1, 0, 0, 0, 148, 834, 1, 0, 0, 0, 150, 836, 1, 0, 0, 0, 152,
    844, 1, 0, 0, 0, 154, 847, 1, 0, 0, 0, 156, 859, 1, 0, 0, 0, 158, 873, 1, 0, 0, 0, 160, 884, 1,
    0, 0, 0, 162, 889, 1, 0, 0, 0, 164, 891, 1, 0, 0, 0, 166, 168, 5, 54, 0, 0, 167, 166, 1, 0, 0,
    0, 167, 168, 1, 0, 0, 0, 168, 172, 1, 0, 0, 0, 169, 171, 3, 2, 1, 0, 170, 169, 1, 0, 0, 0, 171,
    174, 1, 0, 0, 0, 172, 170, 1, 0, 0, 0, 172, 173, 1, 0, 0, 0, 173, 178, 1, 0, 0, 0, 174, 172, 1,
    0, 0, 0, 175, 177, 5, 75, 0, 0, 176, 175, 1, 0, 0, 0, 177, 180, 1, 0, 0, 0, 178, 176, 1, 0, 0,
    0, 178, 179, 1, 0, 0, 0, 179, 181, 1, 0, 0, 0, 180, 178, 1, 0, 0, 0, 181, 182, 5, 0, 0, 1, 182,
    1, 1, 0, 0, 0, 183, 193, 3, 4, 2, 0, 184, 193, 3, 6, 3, 0, 185, 193, 3, 8, 4, 0, 186, 193, 3,
    10, 5, 0, 187, 193, 3, 12, 6, 0, 188, 193, 3, 14, 7, 0, 189, 193, 3, 16, 8, 0, 190, 193, 3, 18,
    9, 0, 191, 193, 3, 20, 10, 0, 192, 183, 1, 0, 0, 0, 192, 184, 1, 0, 0, 0, 192, 185, 1, 0, 0, 0,
    192, 186, 1, 0, 0, 0, 192, 187, 1, 0, 0, 0, 192, 188, 1, 0, 0, 0, 192, 189, 1, 0, 0, 0, 192,
    190, 1, 0, 0, 0, 192, 191, 1, 0, 0, 0, 193, 3, 1, 0, 0, 0, 194, 195, 5, 20, 0, 0, 195, 196, 5,
    21, 0, 0, 196, 197, 5, 47, 0, 0, 197, 198, 5, 60, 0, 0, 198, 199, 5, 61, 0, 0, 199, 200, 5, 56,
    0, 0, 200, 204, 5, 75, 0, 0, 201, 203, 3, 24, 12, 0, 202, 201, 1, 0, 0, 0, 203, 206, 1, 0, 0, 0,
    204, 202, 1, 0, 0, 0, 204, 205, 1, 0, 0, 0, 205, 207, 1, 0, 0, 0, 206, 204, 1, 0, 0, 0, 207,
    208, 5, 57, 0, 0, 208, 209, 5, 54, 0, 0, 209, 210, 5, 75, 0, 0, 210, 5, 1, 0, 0, 0, 211, 212, 5,
    20, 0, 0, 212, 213, 3, 98, 49, 0, 213, 214, 3, 80, 40, 0, 214, 216, 5, 60, 0, 0, 215, 217, 3,
    92, 46, 0, 216, 215, 1, 0, 0, 0, 216, 217, 1, 0, 0, 0, 217, 218, 1, 0, 0, 0, 218, 219, 5, 61, 0,
    0, 219, 220, 5, 56, 0, 0, 220, 221, 5, 54, 0, 0, 221, 227, 5, 75, 0, 0, 222, 223, 3, 24, 12, 0,
    223, 224, 3, 24, 12, 0, 224, 226, 1, 0, 0, 0, 225, 222, 1, 0, 0, 0, 226, 229, 1, 0, 0, 0, 227,
    225, 1, 0, 0, 0, 227, 228, 1, 0, 0, 0, 228, 230, 1, 0, 0, 0, 229, 227, 1, 0, 0, 0, 230, 231, 3,
    54, 27, 0, 231, 232, 5, 57, 0, 0, 232, 233, 5, 54, 0, 0, 233, 234, 5, 75, 0, 0, 234, 7, 1, 0, 0,
    0, 235, 236, 5, 22, 0, 0, 236, 237, 5, 40, 0, 0, 237, 238, 3, 84, 42, 0, 238, 239, 5, 75, 0, 0,
    239, 240, 5, 23, 0, 0, 240, 241, 5, 20, 0, 0, 241, 242, 5, 21, 0, 0, 242, 248, 3, 82, 41, 0,
    243, 247, 3, 52, 26, 0, 244, 247, 3, 26, 13, 0, 245, 247, 3, 20, 10, 0, 246, 243, 1, 0, 0, 0,
    246, 244, 1, 0, 0, 0, 246, 245, 1, 0, 0, 0, 247, 250, 1, 0, 0, 0, 248, 246, 1, 0, 0, 0, 248,
    249, 1, 0, 0, 0, 249, 251, 1, 0, 0, 0, 250, 248, 1, 0, 0, 0, 251, 252, 5, 57, 0, 0, 252, 253, 5,
    54, 0, 0, 253, 254, 5, 75, 0, 0, 254, 9, 1, 0, 0, 0, 255, 256, 5, 20, 0, 0, 256, 257, 5, 21, 0,
    0, 257, 258, 3, 80, 40, 0, 258, 260, 5, 60, 0, 0, 259, 261, 3, 92, 46, 0, 260, 259, 1, 0, 0, 0,
    260, 261, 1, 0, 0, 0, 261, 262, 1, 0, 0, 0, 262, 263, 5, 61, 0, 0, 263, 264, 5, 56, 0, 0, 264,
    265, 5, 54, 0, 0, 265, 269, 5, 75, 0, 0, 266, 268, 3, 24, 12, 0, 267, 266, 1, 0, 0, 0, 268, 271,
    1, 0, 0, 0, 269, 267, 1, 0, 0, 0, 269, 270, 1, 0, 0, 0, 270, 272, 1, 0, 0, 0, 271, 269, 1, 0, 0,
    0, 272, 273, 5, 57, 0, 0, 273, 274, 5, 54, 0, 0, 274, 275, 5, 75, 0, 0, 275, 11, 1, 0, 0, 0,
    276, 277, 5, 24, 0, 0, 277, 278, 3, 74, 37, 0, 278, 279, 5, 13, 0, 0, 279, 280, 3, 86, 43, 0,
    280, 281, 5, 54, 0, 0, 281, 282, 5, 75, 0, 0, 282, 13, 1, 0, 0, 0, 283, 284, 5, 25, 0, 0, 284,
    285, 3, 84, 42, 0, 285, 286, 5, 56, 0, 0, 286, 287, 3, 94, 47, 0, 287, 288, 5, 61, 0, 0, 288,
    289, 5, 75, 0, 0, 289, 15, 1, 0, 0, 0, 290, 291, 5, 40, 0, 0, 291, 294, 3, 84, 42, 0, 292, 293,
    5, 64, 0, 0, 293, 295, 3, 84, 42, 0, 294, 292, 1, 0, 0, 0, 294, 295, 1, 0, 0, 0, 295, 296, 1, 0,
    0, 0, 296, 297, 5, 56, 0, 0, 297, 305, 5, 75, 0, 0, 298, 304, 3, 62, 31, 0, 299, 304, 3, 64, 32,
    0, 300, 304, 3, 66, 33, 0, 301, 304, 3, 68, 34, 0, 302, 304, 3, 20, 10, 0, 303, 298, 1, 0, 0, 0,
    303, 299, 1, 0, 0, 0, 303, 300, 1, 0, 0, 0, 303, 301, 1, 0, 0, 0, 303, 302, 1, 0, 0, 0, 304,
    307, 1, 0, 0, 0, 305, 303, 1, 0, 0, 0, 305, 306, 1, 0, 0, 0, 306, 308, 1, 0, 0, 0, 307, 305, 1,
    0, 0, 0, 308, 309, 5, 57, 0, 0, 309, 310, 5, 54, 0, 0, 310, 311, 5, 75, 0, 0, 311, 17, 1, 0, 0,
    0, 312, 313, 5, 26, 0, 0, 313, 314, 5, 40, 0, 0, 314, 317, 3, 84, 42, 0, 315, 316, 5, 64, 0, 0,
    316, 318, 3, 84, 42, 0, 317, 315, 1, 0, 0, 0, 317, 318, 1, 0, 0, 0, 318, 319, 1, 0, 0, 0, 319,
    320, 5, 56, 0, 0, 320, 329, 5, 75, 0, 0, 321, 328, 3, 64, 32, 0, 322, 328, 3, 66, 33, 0, 323,
    328, 3, 68, 34, 0, 324, 328, 3, 70, 35, 0, 325, 328, 3, 72, 36, 0, 326, 328, 3, 20, 10, 0, 327,
    321, 1, 0, 0, 0, 327, 322, 1, 0, 0, 0, 327, 323, 1, 0, 0, 0, 327, 324, 1, 0, 0, 0, 327, 325, 1,
    0, 0, 0, 327, 326, 1, 0, 0, 0, 328, 331, 1, 0, 0, 0, 329, 327, 1, 0, 0, 0, 329, 330, 1, 0, 0, 0,
    330, 332, 1, 0, 0, 0, 331, 329, 1, 0, 0, 0, 332, 333, 5, 57, 0, 0, 333, 334, 5, 54, 0, 0, 334,
    335, 5, 75, 0, 0, 335, 19, 1, 0, 0, 0, 336, 337, 3, 22, 11, 0, 337, 338, 5, 75, 0, 0, 338, 21,
    1, 0, 0, 0, 339, 340, 5, 54, 0, 0, 340, 23, 1, 0, 0, 0, 341, 351, 3, 26, 13, 0, 342, 351, 3, 28,
    14, 0, 343, 351, 3, 30, 15, 0, 344, 351, 3, 32, 16, 0, 345, 351, 3, 34, 17, 0, 346, 351, 3, 36,
    18, 0, 347, 351, 3, 46, 23, 0, 348, 351, 3, 48, 24, 0, 349, 351, 3, 20, 10, 0, 350, 341, 1, 0,
    0, 0, 350, 342, 1, 0, 0, 0, 350, 343, 1, 0, 0, 0, 350, 344, 1, 0, 0, 0, 350, 345, 1, 0, 0, 0,
    350, 346, 1, 0, 0, 0, 350, 347, 1, 0, 0, 0, 350, 348, 1, 0, 0, 0, 350, 349, 1, 0, 0, 0, 351, 25,
    1, 0, 0, 0, 352, 353, 5, 28, 0, 0, 353, 354, 3, 74, 37, 0, 354, 355, 5, 55, 0, 0, 355, 356, 3,
    118, 59, 0, 356, 357, 5, 31, 0, 0, 357, 358, 5, 75, 0, 0, 358, 27, 1, 0, 0, 0, 359, 360, 3, 78,
    39, 0, 360, 361, 5, 55, 0, 0, 361, 362, 3, 118, 59, 0, 362, 363, 5, 31, 0, 0, 363, 364, 5, 54,
    0, 0, 364, 365, 5, 75, 0, 0, 365, 29, 1, 0, 0, 0, 366, 367, 5, 43, 0, 0, 367, 368, 5, 60, 0, 0,
    368, 369, 3, 118, 59, 0, 369, 370, 5, 61, 0, 0, 370, 371, 5, 56, 0, 0, 371, 377, 5, 75, 0, 0,
    372, 376, 3, 56, 28, 0, 373, 376, 3, 58, 29, 0, 374, 376, 3, 24, 12, 0, 375, 372, 1, 0, 0, 0,
    375, 373, 1, 0, 0, 0, 375, 374, 1, 0, 0, 0, 376, 379, 1, 0, 0, 0, 377, 375, 1, 0, 0, 0, 377,
    378, 1, 0, 0, 0, 378, 380, 1, 0, 0, 0, 379, 377, 1, 0, 0, 0, 380, 381, 5, 57, 0, 0, 381, 382, 5,
    54, 0, 0, 382, 383, 5, 75, 0, 0, 383, 31, 1, 0, 0, 0, 384, 385, 5, 50, 0, 0, 385, 386, 5, 60, 0,
    0, 386, 387, 3, 118, 59, 0, 387, 388, 5, 61, 0, 0, 388, 389, 5, 56, 0, 0, 389, 393, 5, 75, 0, 0,
    390, 392, 3, 24, 12, 0, 391, 390, 1, 0, 0, 0, 392, 395, 1, 0, 0, 0, 393, 391, 1, 0, 0, 0, 393,
    394, 1, 0, 0, 0, 394, 396, 1, 0, 0, 0, 395, 393, 1, 0, 0, 0, 396, 397, 5, 57, 0, 0, 397, 398, 5,
    54, 0, 0, 398, 399, 5, 75, 0, 0, 399, 33, 1, 0, 0, 0, 400, 401, 5, 27, 0, 0, 401, 402, 5, 60, 0,
    0, 402, 403, 5, 28, 0, 0, 403, 404, 3, 74, 37, 0, 404, 405, 5, 44, 0, 0, 405, 406, 3, 118, 59,
    0, 406, 407, 5, 61, 0, 0, 407, 408, 5, 56, 0, 0, 408, 412, 5, 75, 0, 0, 409, 411, 3, 24, 12, 0,
    410, 409, 1, 0, 0, 0, 411, 414, 1, 0, 0, 0, 412, 410, 1, 0, 0, 0, 412, 413, 1, 0, 0, 0, 413,
    415, 1, 0, 0, 0, 414, 412, 1, 0, 0, 0, 415, 416, 5, 57, 0, 0, 416, 417, 5, 54, 0, 0, 417, 418,
    5, 75, 0, 0, 418, 35, 1, 0, 0, 0, 419, 421, 5, 87, 0, 0, 420, 419, 1, 0, 0, 0, 420, 421, 1, 0,
    0, 0, 421, 422, 1, 0, 0, 0, 422, 423, 3, 38, 19, 0, 423, 424, 5, 60, 0, 0, 424, 425, 3, 88, 44,
    0, 425, 426, 5, 61, 0, 0, 426, 427, 5, 75, 0, 0, 427, 37, 1, 0, 0, 0, 428, 432, 3, 80, 40, 0,
    429, 432, 3, 40, 20, 0, 430, 432, 3, 42, 21, 0, 431, 428, 1, 0, 0, 0, 431, 429, 1, 0, 0, 0, 431,
    430, 1, 0, 0, 0, 432, 39, 1, 0, 0, 0, 433, 434, 5, 19, 0, 0, 434, 435, 5, 62, 0, 0, 435, 436, 3,
    80, 40, 0, 436, 41, 1, 0, 0, 0, 437, 438, 3, 44, 22, 0, 438, 439, 5, 62, 0, 0, 439, 440, 3, 80,
    40, 0, 440, 43, 1, 0, 0, 0, 441, 445, 3, 76, 38, 0, 442, 444, 3, 116, 58, 0, 443, 442, 1, 0, 0,
    0, 444, 447, 1, 0, 0, 0, 445, 443, 1, 0, 0, 0, 445, 446, 1, 0, 0, 0, 446, 45, 1, 0, 0, 0, 447,
    445, 1, 0, 0, 0, 448, 449, 5, 49, 0, 0, 449, 450, 5, 56, 0, 0, 450, 454, 5, 75, 0, 0, 451, 453,
    3, 24, 12, 0, 452, 451, 1, 0, 0, 0, 453, 456, 1, 0, 0, 0, 454, 452, 1, 0, 0, 0, 454, 455, 1, 0,
    0, 0, 455, 457, 1, 0, 0, 0, 456, 454, 1, 0, 0, 0, 457, 461, 3, 60, 30, 0, 458, 460, 3, 24, 12,
    0, 459, 458, 1, 0, 0, 0, 460, 463, 1, 0, 0, 0, 461, 459, 1, 0, 0, 0, 461, 462, 1, 0, 0, 0, 462,
    464, 1, 0, 0, 0, 463, 461, 1, 0, 0, 0, 464, 465, 5, 57, 0, 0, 465, 466, 5, 54, 0, 0, 466, 467,
    5, 75, 0, 0, 467, 47, 1, 0, 0, 0, 468, 469, 5, 32, 0, 0, 469, 470, 5, 33, 0, 0, 470, 471, 3, 84,
    42, 0, 471, 472, 5, 60, 0, 0, 472, 473, 3, 50, 25, 0, 473, 474, 5, 61, 0, 0, 474, 475, 5, 31, 0,
    0, 475, 476, 5, 75, 0, 0, 476, 49, 1, 0, 0, 0, 477, 480, 3, 112, 56, 0, 478, 480, 3, 76, 38, 0,
    479, 477, 1, 0, 0, 0, 479, 478, 1, 0, 0, 0, 480, 51, 1, 0, 0, 0, 481, 482, 5, 29, 0, 0, 482,
    483, 5, 62, 0, 0, 483, 484, 5, 30, 0, 0, 484, 485, 5, 60, 0, 0, 485, 486, 3, 100, 50, 0, 486,
    487, 5, 63, 0, 0, 487, 488, 3, 118, 59, 0, 488, 489, 5, 61, 0, 0, 489, 490, 5, 31, 0, 0, 490,
    491, 5, 75, 0, 0, 491, 53, 1, 0, 0, 0, 492, 493, 5, 48, 0, 0, 493, 494, 3, 118, 59, 0, 494, 495,
    5, 31, 0, 0, 495, 496, 5, 75, 0, 0, 496, 55, 1, 0, 0, 0, 497, 498, 5, 57, 0, 0, 498, 499, 5, 41,
    0, 0, 499, 500, 5, 43, 0, 0, 500, 501, 5, 60, 0, 0, 501, 502, 3, 118, 59, 0, 502, 503, 5, 61, 0,
    0, 503, 504, 5, 56, 0, 0, 504, 505, 5, 75, 0, 0, 505, 57, 1, 0, 0, 0, 506, 507, 5, 57, 0, 0,
    507, 508, 5, 41, 0, 0, 508, 509, 5, 56, 0, 0, 509, 510, 5, 75, 0, 0, 510, 59, 1, 0, 0, 0, 511,
    512, 5, 57, 0, 0, 512, 513, 5, 34, 0, 0, 513, 514, 5, 60, 0, 0, 514, 515, 3, 84, 42, 0, 515,
    516, 3, 74, 37, 0, 516, 517, 5, 61, 0, 0, 517, 518, 5, 56, 0, 0, 518, 519, 5, 75, 0, 0, 519, 61,
    1, 0, 0, 0, 520, 521, 5, 35, 0, 0, 521, 523, 5, 60, 0, 0, 522, 524, 3, 92, 46, 0, 523, 522, 1,
    0, 0, 0, 523, 524, 1, 0, 0, 0, 524, 525, 1, 0, 0, 0, 525, 526, 5, 61, 0, 0, 526, 527, 5, 56, 0,
    0, 527, 531, 5, 75, 0, 0, 528, 530, 3, 24, 12, 0, 529, 528, 1, 0, 0, 0, 530, 533, 1, 0, 0, 0,
    531, 529, 1, 0, 0, 0, 531, 532, 1, 0, 0, 0, 532, 534, 1, 0, 0, 0, 533, 531, 1, 0, 0, 0, 534,
    535, 5, 57, 0, 0, 535, 536, 5, 54, 0, 0, 536, 537, 5, 75, 0, 0, 537, 63, 1, 0, 0, 0, 538, 539,
    5, 35, 0, 0, 539, 540, 3, 98, 49, 0, 540, 541, 3, 74, 37, 0, 541, 542, 5, 39, 0, 0, 542, 543, 5,
    54, 0, 0, 543, 544, 5, 75, 0, 0, 544, 65, 1, 0, 0, 0, 545, 546, 5, 35, 0, 0, 546, 547, 3, 98,
    49, 0, 547, 548, 3, 80, 40, 0, 548, 550, 5, 60, 0, 0, 549, 551, 3, 92, 46, 0, 550, 549, 1, 0, 0,
    0, 550, 551, 1, 0, 0, 0, 551, 552, 1, 0, 0, 0, 552, 553, 5, 61, 0, 0, 553, 554, 5, 56, 0, 0,
    554, 555, 5, 54, 0, 0, 555, 559, 5, 75, 0, 0, 556, 558, 3, 24, 12, 0, 557, 556, 1, 0, 0, 0, 558,
    561, 1, 0, 0, 0, 559, 557, 1, 0, 0, 0, 559, 560, 1, 0, 0, 0, 560, 562, 1, 0, 0, 0, 561, 559, 1,
    0, 0, 0, 562, 563, 3, 54, 27, 0, 563, 564, 5, 57, 0, 0, 564, 565, 5, 54, 0, 0, 565, 566, 5, 75,
    0, 0, 566, 67, 1, 0, 0, 0, 567, 568, 5, 35, 0, 0, 568, 569, 5, 21, 0, 0, 569, 570, 3, 80, 40, 0,
    570, 572, 5, 60, 0, 0, 571, 573, 3, 92, 46, 0, 572, 571, 1, 0, 0, 0, 572, 573, 1, 0, 0, 0, 573,
    574, 1, 0, 0, 0, 574, 575, 5, 61, 0, 0, 575, 576, 5, 56, 0, 0, 576, 577, 5, 54, 0, 0, 577, 581,
    5, 75, 0, 0, 578, 580, 3, 24, 12, 0, 579, 578, 1, 0, 0, 0, 580, 583, 1, 0, 0, 0, 581, 579, 1, 0,
    0, 0, 581, 582, 1, 0, 0, 0, 582, 584, 1, 0, 0, 0, 583, 581, 1, 0, 0, 0, 584, 585, 5, 57, 0, 0,
    585, 586, 5, 54, 0, 0, 586, 587, 5, 75, 0, 0, 587, 69, 1, 0, 0, 0, 588, 589, 5, 26, 0, 0, 589,
    590, 3, 98, 49, 0, 590, 591, 3, 80, 40, 0, 591, 593, 5, 60, 0, 0, 592, 594, 3, 92, 46, 0, 593,
    592, 1, 0, 0, 0, 593, 594, 1, 0, 0, 0, 594, 595, 1, 0, 0, 0, 595, 596, 5, 61, 0, 0, 596, 597, 5,
    31, 0, 0, 597, 598, 5, 54, 0, 0, 598, 599, 5, 75, 0, 0, 599, 71, 1, 0, 0, 0, 600, 601, 5, 26, 0,
    0, 601, 602, 5, 21, 0, 0, 602, 603, 3, 80, 40, 0, 603, 605, 5, 60, 0, 0, 604, 606, 3, 92, 46, 0,
    605, 604, 1, 0, 0, 0, 605, 606, 1, 0, 0, 0, 606, 607, 1, 0, 0, 0, 607, 608, 5, 61, 0, 0, 608,
    609, 5, 31, 0, 0, 609, 610, 5, 54, 0, 0, 610, 611, 5, 75, 0, 0, 611, 73, 1, 0, 0, 0, 612, 613,
    5, 77, 0, 0, 613, 75, 1, 0, 0, 0, 614, 615, 5, 77, 0, 0, 615, 77, 1, 0, 0, 0, 616, 617, 6, 39,
    -1, 0, 617, 622, 3, 76, 38, 0, 618, 619, 5, 19, 0, 0, 619, 620, 5, 62, 0, 0, 620, 622, 3, 76,
    38, 0, 621, 616, 1, 0, 0, 0, 621, 618, 1, 0, 0, 0, 622, 627, 1, 0, 0, 0, 623, 624, 10, 1, 0, 0,
    624, 626, 3, 116, 58, 0, 625, 623, 1, 0, 0, 0, 626, 629, 1, 0, 0, 0, 627, 625, 1, 0, 0, 0, 627,
    628, 1, 0, 0, 0, 628, 79, 1, 0, 0, 0, 629, 627, 1, 0, 0, 0, 630, 631, 5, 77, 0, 0, 631, 81, 1,
    0, 0, 0, 632, 633, 5, 76, 0, 0, 633, 83, 1, 0, 0, 0, 634, 635, 7, 0, 0, 0, 635, 85, 1, 0, 0, 0,
    636, 641, 3, 106, 53, 0, 637, 641, 3, 108, 54, 0, 638, 641, 3, 110, 55, 0, 639, 641, 3, 112, 56,
    0, 640, 636, 1, 0, 0, 0, 640, 637, 1, 0, 0, 0, 640, 638, 1, 0, 0, 0, 640, 639, 1, 0, 0, 0, 641,
    87, 1, 0, 0, 0, 642, 647, 3, 90, 45, 0, 643, 644, 5, 63, 0, 0, 644, 646, 3, 90, 45, 0, 645, 643,
    1, 0, 0, 0, 646, 649, 1, 0, 0, 0, 647, 645, 1, 0, 0, 0, 647, 648, 1, 0, 0, 0, 648, 89, 1, 0, 0,
    0, 649, 647, 1, 0, 0, 0, 650, 653, 3, 160, 80, 0, 651, 653, 3, 118, 59, 0, 652, 650, 1, 0, 0, 0,
    652, 651, 1, 0, 0, 0, 653, 91, 1, 0, 0, 0, 654, 659, 3, 152, 76, 0, 655, 656, 5, 63, 0, 0, 656,
    658, 3, 152, 76, 0, 657, 655, 1, 0, 0, 0, 658, 661, 1, 0, 0, 0, 659, 657, 1, 0, 0, 0, 659, 660,
    1, 0, 0, 0, 660, 93, 1, 0, 0, 0, 661, 659, 1, 0, 0, 0, 662, 665, 3, 74, 37, 0, 663, 664, 5, 63,
    0, 0, 664, 666, 3, 74, 37, 0, 665, 663, 1, 0, 0, 0, 666, 667, 1, 0, 0, 0, 667, 665, 1, 0, 0, 0,
    667, 668, 1, 0, 0, 0, 668, 95, 1, 0, 0, 0, 669, 674, 3, 118, 59, 0, 670, 671, 5, 63, 0, 0, 671,
    673, 3, 118, 59, 0, 672, 670, 1, 0, 0, 0, 673, 676, 1, 0, 0, 0, 674, 672, 1, 0, 0, 0, 674, 675,
    1, 0, 0, 0, 675, 97, 1, 0, 0, 0, 676, 674, 1, 0, 0, 0, 677, 682, 3, 158, 79, 0, 678, 682, 3, 84,
    42, 0, 679, 682, 3, 154, 77, 0, 680, 682, 3, 156, 78, 0, 681, 677, 1, 0, 0, 0, 681, 678, 1, 0,
    0, 0, 681, 679, 1, 0, 0, 0, 681, 680, 1, 0, 0, 0, 682, 99, 1, 0, 0, 0, 683, 684, 3, 118, 59, 0,
    684, 101, 1, 0, 0, 0, 685, 691, 3, 104, 52, 0, 686, 691, 3, 136, 68, 0, 687, 691, 3, 140, 70, 0,
    688, 691, 3, 128, 64, 0, 689, 691, 3, 138, 69, 0, 690, 685, 1, 0, 0, 0, 690, 686, 1, 0, 0, 0,
    690, 687, 1, 0, 0, 0, 690, 688, 1, 0, 0, 0, 690, 689, 1, 0, 0, 0, 691, 103, 1, 0, 0, 0, 692,
    699, 3, 106, 53, 0, 693, 699, 3, 108, 54, 0, 694, 699, 3, 110, 55, 0, 695, 699, 3, 112, 56, 0,
    696, 699, 3, 162, 81, 0, 697, 699, 3, 114, 57, 0, 698, 692, 1, 0, 0, 0, 698, 693, 1, 0, 0, 0,
    698, 694, 1, 0, 0, 0, 698, 695, 1, 0, 0, 0, 698, 696, 1, 0, 0, 0, 698, 697, 1, 0, 0, 0, 699,
    105, 1, 0, 0, 0, 700, 701, 7, 1, 0, 0, 701, 107, 1, 0, 0, 0, 702, 703, 7, 2, 0, 0, 703, 109, 1,
    0, 0, 0, 704, 705, 5, 82, 0, 0, 705, 111, 1, 0, 0, 0, 706, 708, 5, 84, 0, 0, 707, 706, 1, 0, 0,
    0, 707, 708, 1, 0, 0, 0, 708, 709, 1, 0, 0, 0, 709, 710, 5, 83, 0, 0, 710, 113, 1, 0, 0, 0, 711,
    712, 3, 84, 42, 0, 712, 713, 5, 62, 0, 0, 713, 714, 3, 76, 38, 0, 714, 115, 1, 0, 0, 0, 715,
    716, 5, 58, 0, 0, 716, 717, 3, 118, 59, 0, 717, 718, 5, 59, 0, 0, 718, 117, 1, 0, 0, 0, 719,
    733, 3, 150, 75, 0, 720, 733, 3, 128, 64, 0, 721, 733, 3, 120, 60, 0, 722, 733, 3, 134, 67, 0,
    723, 724, 5, 53, 0, 0, 724, 725, 5, 60, 0, 0, 725, 726, 3, 118, 59, 0, 726, 727, 5, 63, 0, 0,
    727, 728, 3, 118, 59, 0, 728, 729, 5, 63, 0, 0, 729, 730, 3, 118, 59, 0, 730, 731, 5, 61, 0, 0,
    731, 733, 1, 0, 0, 0, 732, 719, 1, 0, 0, 0, 732, 720, 1, 0, 0, 0, 732, 721, 1, 0, 0, 0, 732,
    722, 1, 0, 0, 0, 732, 723, 1, 0, 0, 0, 733, 119, 1, 0, 0, 0, 734, 735, 6, 60, -1, 0, 735, 744,
    3, 124, 62, 0, 736, 744, 3, 126, 63, 0, 737, 744, 3, 104, 52, 0, 738, 744, 3, 136, 68, 0, 739,
    744, 3, 140, 70, 0, 740, 744, 3, 138, 69, 0, 741, 744, 3, 76, 38, 0, 742, 744, 3, 146, 73, 0,
    743, 734, 1, 0, 0, 0, 743, 736, 1, 0, 0, 0, 743, 737, 1, 0, 0, 0, 743, 738, 1, 0, 0, 0, 743,
    739, 1, 0, 0, 0, 743, 740, 1, 0, 0, 0, 743, 741, 1, 0, 0, 0, 743, 742, 1, 0, 0, 0, 744, 752, 1,
    0, 0, 0, 745, 746, 10, 2, 0, 0, 746, 751, 3, 116, 58, 0, 747, 748, 10, 1, 0, 0, 748, 749, 5, 62,
    0, 0, 749, 751, 3, 122, 61, 0, 750, 745, 1, 0, 0, 0, 750, 747, 1, 0, 0, 0, 751, 754, 1, 0, 0, 0,
    752, 750, 1, 0, 0, 0, 752, 753, 1, 0, 0, 0, 753, 121, 1, 0, 0, 0, 754, 752, 1, 0, 0, 0, 755,
    758, 3, 76, 38, 0, 756, 758, 3, 146, 73, 0, 757, 755, 1, 0, 0, 0, 757, 756, 1, 0, 0, 0, 758,
    762, 1, 0, 0, 0, 759, 761, 3, 116, 58, 0, 760, 759, 1, 0, 0, 0, 761, 764, 1, 0, 0, 0, 762, 760,
    1, 0, 0, 0, 762, 763, 1, 0, 0, 0, 763, 123, 1, 0, 0, 0, 764, 762, 1, 0, 0, 0, 765, 766, 5, 19,
    0, 0, 766, 125, 1, 0, 0, 0, 767, 768, 5, 60, 0, 0, 768, 769, 3, 118, 59, 0, 769, 770, 5, 61, 0,
    0, 770, 127, 1, 0, 0, 0, 771, 774, 3, 130, 65, 0, 772, 774, 3, 132, 66, 0, 773, 771, 1, 0, 0, 0,
    773, 772, 1, 0, 0, 0, 774, 129, 1, 0, 0, 0, 775, 776, 5, 66, 0, 0, 776, 777, 3, 120, 60, 0, 777,
    131, 1, 0, 0, 0, 778, 779, 5, 12, 0, 0, 779, 780, 3, 120, 60, 0, 780, 133, 1, 0, 0, 0, 781, 782,
    3, 120, 60, 0, 782, 783, 3, 148, 74, 0, 783, 784, 3, 118, 59, 0, 784, 135, 1, 0, 0, 0, 785, 786,
    5, 56, 0, 0, 786, 791, 3, 118, 59, 0, 787, 788, 5, 63, 0, 0, 788, 790, 3, 118, 59, 0, 789, 787,
    1, 0, 0, 0, 790, 793, 1, 0, 0, 0, 791, 789, 1, 0, 0, 0, 791, 792, 1, 0, 0, 0, 792, 794, 1, 0, 0,
    0, 793, 791, 1, 0, 0, 0, 794, 795, 5, 57, 0, 0, 795, 137, 1, 0, 0, 0, 796, 797, 5, 60, 0, 0,
    797, 798, 3, 118, 59, 0, 798, 799, 5, 63, 0, 0, 799, 804, 3, 118, 59, 0, 800, 801, 5, 63, 0, 0,
    801, 803, 3, 118, 59, 0, 802, 800, 1, 0, 0, 0, 803, 806, 1, 0, 0, 0, 804, 802, 1, 0, 0, 0, 804,
    805, 1, 0, 0, 0, 805, 807, 1, 0, 0, 0, 806, 804, 1, 0, 0, 0, 807, 808, 5, 61, 0, 0, 808, 139, 1,
    0, 0, 0, 809, 810, 5, 56, 0, 0, 810, 811, 3, 142, 71, 0, 811, 812, 5, 57, 0, 0, 812, 141, 1, 0,
    0, 0, 813, 818, 3, 144, 72, 0, 814, 815, 5, 63, 0, 0, 815, 817, 3, 144, 72, 0, 816, 814, 1, 0,
    0, 0, 817, 820, 1, 0, 0, 0, 818, 816, 1, 0, 0, 0, 818, 819, 1, 0, 0, 0, 819, 143, 1, 0, 0, 0,
    820, 818, 1, 0, 0, 0, 821, 822, 5, 56, 0, 0, 822, 823, 3, 118, 59, 0, 823, 824, 5, 64, 0, 0,
    824, 825, 3, 118, 59, 0, 825, 826, 5, 57, 0, 0, 826, 145, 1, 0, 0, 0, 827, 828, 3, 80, 40, 0,
    828, 830, 5, 60, 0, 0, 829, 831, 3, 88, 44, 0, 830, 829, 1, 0, 0, 0, 830, 831, 1, 0, 0, 0, 831,
    832, 1, 0, 0, 0, 832, 833, 5, 61, 0, 0, 833, 147, 1, 0, 0, 0, 834, 835, 7, 3, 0, 0, 835, 149, 1,
    0, 0, 0, 836, 837, 5, 33, 0, 0, 837, 838, 3, 98, 49, 0, 838, 840, 5, 60, 0, 0, 839, 841, 3, 88,
    44, 0, 840, 839, 1, 0, 0, 0, 840, 841, 1, 0, 0, 0, 841, 842, 1, 0, 0, 0, 842, 843, 5, 61, 0, 0,
    843, 151, 1, 0, 0, 0, 844, 845, 3, 98, 49, 0, 845, 846, 3, 74, 37, 0, 846, 153, 1, 0, 0, 0, 847,
    848, 3, 84, 42, 0, 848, 849, 5, 69, 0, 0, 849, 854, 3, 98, 49, 0, 850, 851, 5, 63, 0, 0, 851,
    853, 3, 98, 49, 0, 852, 850, 1, 0, 0, 0, 853, 856, 1, 0, 0, 0, 854, 852, 1, 0, 0, 0, 854, 855,
    1, 0, 0, 0, 855, 857, 1, 0, 0, 0, 856, 854, 1, 0, 0, 0, 857, 858, 5, 70, 0, 0, 858, 155, 1, 0,
    0, 0, 859, 860, 5, 7, 0, 0, 860, 861, 5, 69, 0, 0, 861, 866, 3, 98, 49, 0, 862, 863, 5, 63, 0,
    0, 863, 865, 3, 98, 49, 0, 864, 862, 1, 0, 0, 0, 865, 868, 1, 0, 0, 0, 866, 864, 1, 0, 0, 0,
    866, 867, 1, 0, 0, 0, 867, 869, 1, 0, 0, 0, 868, 866, 1, 0, 0, 0, 869, 870, 5, 16, 0, 0, 870,
    871, 3, 98, 49, 0, 871, 872, 5, 70, 0, 0, 872, 157, 1, 0, 0, 0, 873, 874, 5, 52, 0, 0, 874, 875,
    5, 58, 0, 0, 875, 878, 3, 98, 49, 0, 876, 877, 5, 63, 0, 0, 877, 879, 3, 98, 49, 0, 878, 876, 1,
    0, 0, 0, 879, 880, 1, 0, 0, 0, 880, 878, 1, 0, 0, 0, 880, 881, 1, 0, 0, 0, 881, 882, 1, 0, 0, 0,
    882, 883, 5, 59, 0, 0, 883, 159, 1, 0, 0, 0, 884, 885, 5, 46, 0, 0, 885, 886, 3, 88, 44, 0, 886,
    887, 5, 64, 0, 0, 887, 888, 3, 118, 59, 0, 888, 161, 1, 0, 0, 0, 889, 890, 5, 103, 0, 0, 890,
    163, 1, 0, 0, 0, 891, 892, 3, 120, 60, 0, 892, 893, 5, 51, 0, 0, 893, 894, 3, 120, 60, 0, 894,
    165, 1, 0, 0, 0, 63, 167, 172, 178, 192, 204, 216, 227, 246, 248, 260, 269, 294, 303, 305, 317,
    327, 329, 350, 375, 377, 393, 412, 420, 431, 445, 454, 461, 479, 523, 531, 550, 559, 572, 581,
    593, 605, 621, 627, 640, 647, 652, 659, 667, 674, 681, 690, 698, 707, 732, 743, 750, 752, 757,
    762, 773, 791, 804, 818, 830, 840, 854, 866, 880,
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
