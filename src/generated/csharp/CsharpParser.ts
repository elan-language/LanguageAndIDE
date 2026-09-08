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
  public static readonly INTERPOLATED_STRING_PREFIX = 19;
  public static readonly THIS_INSTANCE = 20;
  public static readonly STATIC = 21;
  public static readonly VOID = 22;
  public static readonly TEST_CLASS_ANNOT = 23;
  public static readonly TEST_METHOD_ANNOT = 24;
  public static readonly CONST = 25;
  public static readonly ENUM = 26;
  public static readonly ABSTRACT = 27;
  public static readonly FOREACH = 28;
  public static readonly VAR = 29;
  public static readonly ASSERT = 30;
  public static readonly ARE_EQUAL = 31;
  public static readonly SEMI_COLON = 32;
  public static readonly THROW = 33;
  public static readonly NEW = 34;
  public static readonly CATCH = 35;
  public static readonly PUBLIC = 36;
  public static readonly PRIVATE = 37;
  public static readonly GET = 38;
  public static readonly SET = 39;
  public static readonly GET_SET = 40;
  public static readonly CLASS = 41;
  public static readonly ELSE = 42;
  public static readonly FOR = 43;
  public static readonly IF = 44;
  public static readonly IN = 45;
  public static readonly INPUT = 46;
  public static readonly LAMBDA = 47;
  public static readonly MAIN = 48;
  public static readonly PRINT = 49;
  public static readonly RETURN = 50;
  public static readonly TRY = 51;
  public static readonly WHILE = 52;
  public static readonly POWER = 53;
  public static readonly TUPLE = 54;
  public static readonly IF_ = 55;
  public static readonly COMMENT = 56;
  public static readonly SINGLE_EQUALS = 57;
  public static readonly OPEN_BRACE = 58;
  public static readonly CLOSE_BRACE = 59;
  public static readonly OPEN_SQ_BRACKET = 60;
  public static readonly CLOSE_SQ_BRACKET = 61;
  public static readonly OPEN_BRACKET = 62;
  public static readonly CLOSE_BRACKET = 63;
  public static readonly DOT = 64;
  public static readonly COMMA = 65;
  public static readonly COLON = 66;
  public static readonly PLUS = 67;
  public static readonly MINUS = 68;
  public static readonly MULT = 69;
  public static readonly DIVIDE = 70;
  public static readonly LT = 71;
  public static readonly GT = 72;
  public static readonly LE = 73;
  public static readonly GE = 74;
  public static readonly DOUBLE_QUOTES = 75;
  public static readonly WS = 76;
  public static readonly NL = 77;
  public static readonly NAME_STARTING_TEST_ = 78;
  public static readonly NAME_STARTING_LC = 79;
  public static readonly NAME_STARTING_UC = 80;
  public static readonly LITERAL_BINARY = 81;
  public static readonly LITERAL_HEX = 82;
  public static readonly LITERAL_INTEGER = 83;
  public static readonly LITERAL_FLOAT = 84;
  public static readonly LITERAL_STRING = 85;
  public static readonly WHITESPACES = 86;
  public static readonly TEXT = 87;
  public static readonly GHOSTED = 88;
  public static readonly FUNCTION_ANNOTATION = 89;
  public static readonly PROCECDURE_ANNOTATION = 90;
  public static readonly CONSTANT_ANNOTATION = 91;
  public static readonly ENUM_ANNOTATION = 92;
  public static readonly CONCRETE_CLASS_ANNOTATION = 93;
  public static readonly ABSTRACT_CLASS_ANNOTATION = 94;
  public static readonly VARIABLE_ANNOTATION = 95;
  public static readonly ASSIGNMENT_ANNOTATION = 96;
  public static readonly INPUT_ANNOTATION = 97;
  public static readonly CALL_ANNOTATION = 98;
  public static readonly LET_ANNOTATION = 99;
  public static readonly ELSE_IF_ANNOTATION = 100;
  public static readonly PROPERTY_ANNOTATION = 101;
  public static readonly FUNCTION_METHOD_ANNOTATION = 102;
  public static readonly PROCEDURE_METHOD_ANNOTATION = 103;
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
  public static readonly RULE_commentLine = 10;
  public static readonly RULE_ordinaryStatement = 11;
  public static readonly RULE_ifStatement = 12;
  public static readonly RULE_whileLoop = 13;
  public static readonly RULE_forLoop = 14;
  public static readonly RULE_tryStatement = 15;
  public static readonly RULE_assert = 16;
  public static readonly RULE_letStatement = 17;
  public static readonly RULE_print = 18;
  public static readonly RULE_variableDefinition = 19;
  public static readonly RULE_assignment = 20;
  public static readonly RULE_inputStatement = 21;
  public static readonly RULE_procedureCall = 22;
  public static readonly RULE_throwStatement = 23;
  public static readonly RULE_returnStatement = 24;
  public static readonly RULE_elseIfClause = 25;
  public static readonly RULE_elseClause = 26;
  public static readonly RULE_catchStatement = 27;
  public static readonly RULE_constructorMember = 28;
  public static readonly RULE_property = 29;
  public static readonly RULE_functionMethod = 30;
  public static readonly RULE_procedureMethod = 31;
  public static readonly RULE_abstractFunction = 32;
  public static readonly RULE_abstractProcedure = 33;
  public static readonly RULE_identifier = 34;
  public static readonly RULE_assignable = 35;
  public static readonly RULE_methodName = 36;
  public static readonly RULE_testName = 37;
  public static readonly RULE_typeName = 38;
  public static readonly RULE_constantValue = 39;
  public static readonly RULE_argList = 40;
  public static readonly RULE_argument = 41;
  public static readonly RULE_paramsList = 42;
  public static readonly RULE_type = 43;
  public static readonly RULE_enumValuesList = 44;
  public static readonly RULE_assertActual = 45;
  public static readonly RULE_litValue = 46;
  public static readonly RULE_litBoolean = 47;
  public static readonly RULE_litInt = 48;
  public static readonly RULE_litFloat = 49;
  public static readonly RULE_enumValue = 50;
  public static readonly RULE_litString = 51;
  public static readonly RULE_index = 52;
  public static readonly RULE_identifierWithOptIndexes = 53;
  public static readonly RULE_propertyRef = 54;
  public static readonly RULE_expression = 55;
  public static readonly RULE_term = 56;
  public static readonly RULE_chainHead = 57;
  public static readonly RULE_chainable = 58;
  public static readonly RULE_bracketedExpression = 59;
  public static readonly RULE_unaryExpression = 60;
  public static readonly RULE_binaryExpression = 61;
  public static readonly RULE_tuple = 62;
  public static readonly RULE_methodCall = 63;
  public static readonly RULE_binaryOperator = 64;
  public static readonly RULE_newInstance = 65;
  public static readonly RULE_paramDef = 66;
  public static readonly RULE_typeGeneric = 67;
  public static readonly RULE_typeTuple = 68;
  public static readonly RULE_lambda = 69;
  public static readonly RULE_list = 70;
  public static readonly RULE_interpolatedString = 71;
  public static readonly RULE_power = 72;

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
    "'$'",
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
    "INTERPOLATED_STRING_PREFIX",
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
    "commentLine",
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
    "chainable",
    "bracketedExpression",
    "unaryExpression",
    "binaryExpression",
    "tuple",
    "methodCall",
    "binaryOperator",
    "newInstance",
    "paramDef",
    "typeGeneric",
    "typeTuple",
    "lambda",
    "list",
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
        this.state = 147;
        this.errorHandler.sync(this);
        switch (this.interpreter.adaptivePredict(this.tokenStream, 0, this.context)) {
          case 1:
            {
              this.state = 146;
              this.match(CsharpParser.COMMENT);
            }
            break;
        }
        this.state = 152;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (
          ((_la & ~0x1f) === 0 && ((1 << _la) & 245366784) !== 0) ||
          _la === 41 ||
          _la === 56
        ) {
          {
            {
              this.state = 149;
              this.global();
            }
          }
          this.state = 154;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 158;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (_la === 77) {
          {
            {
              this.state = 155;
              this.match(CsharpParser.NL);
            }
          }
          this.state = 160;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 161;
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
      this.state = 172;
      this.errorHandler.sync(this);
      switch (this.interpreter.adaptivePredict(this.tokenStream, 3, this.context)) {
        case 1:
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 163;
            this.main();
          }
          break;
        case 2:
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 164;
            this.function_();
          }
          break;
        case 3:
          this.enterOuterAlt(localContext, 3);
          {
            this.state = 165;
            this.test();
          }
          break;
        case 4:
          this.enterOuterAlt(localContext, 4);
          {
            this.state = 166;
            this.procedure();
          }
          break;
        case 5:
          this.enterOuterAlt(localContext, 5);
          {
            this.state = 167;
            this.constant();
          }
          break;
        case 6:
          this.enterOuterAlt(localContext, 6);
          {
            this.state = 168;
            this.enum_();
          }
          break;
        case 7:
          this.enterOuterAlt(localContext, 7);
          {
            this.state = 169;
            this.concreteClass();
          }
          break;
        case 8:
          this.enterOuterAlt(localContext, 8);
          {
            this.state = 170;
            this.abstractClass();
          }
          break;
        case 9:
          this.enterOuterAlt(localContext, 9);
          {
            this.state = 171;
            this.commentLine();
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
        this.state = 174;
        this.match(CsharpParser.STATIC);
        this.state = 175;
        this.match(CsharpParser.VOID);
        this.state = 176;
        this.match(CsharpParser.MAIN);
        this.state = 177;
        this.match(CsharpParser.OPEN_BRACKET);
        this.state = 178;
        this.match(CsharpParser.CLOSE_BRACKET);
        this.state = 179;
        this.match(CsharpParser.OPEN_BRACE);
        this.state = 180;
        this.match(CsharpParser.NL);
        this.state = 184;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (
          ((_la & ~0x1f) === 0 && ((1 << _la) & 806880124) !== 0) ||
          (((_la - 33) & ~0x1f) === 0 && ((1 << (_la - 33)) & 579667969) !== 0) ||
          (((_la - 79) & ~0x1f) === 0 && ((1 << (_la - 79)) & 127) !== 0)
        ) {
          {
            {
              this.state = 181;
              this.ordinaryStatement();
            }
          }
          this.state = 186;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 187;
        this.match(CsharpParser.CLOSE_BRACE);
        this.state = 188;
        this.match(CsharpParser.COMMENT);
        this.state = 189;
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
        this.state = 191;
        this.match(CsharpParser.STATIC);
        this.state = 192;
        this.type_();
        this.state = 193;
        this.methodName();
        this.state = 194;
        this.match(CsharpParser.OPEN_BRACKET);
        this.state = 196;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (((_la & ~0x1f) === 0 && ((1 << _la) & 124) !== 0) || _la === 54 || _la === 80) {
          {
            this.state = 195;
            this.paramsList();
          }
        }

        this.state = 198;
        this.match(CsharpParser.CLOSE_BRACKET);
        this.state = 199;
        this.match(CsharpParser.OPEN_BRACE);
        this.state = 200;
        this.match(CsharpParser.COMMENT);
        this.state = 201;
        this.match(CsharpParser.NL);
        this.state = 206;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (
          ((_la & ~0x1f) === 0 && ((1 << _la) & 806880124) !== 0) ||
          (((_la - 33) & ~0x1f) === 0 && ((1 << (_la - 33)) & 579667969) !== 0) ||
          (((_la - 79) & ~0x1f) === 0 && ((1 << (_la - 79)) & 127) !== 0)
        ) {
          {
            this.state = 204;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 6, this.context)) {
              case 1:
                {
                  this.state = 202;
                  this.letStatement();
                }
                break;
              case 2:
                {
                  this.state = 203;
                  this.ordinaryStatement();
                }
                break;
            }
          }
          this.state = 208;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 209;
        this.returnStatement();
        this.state = 210;
        this.match(CsharpParser.CLOSE_BRACE);
        this.state = 211;
        this.match(CsharpParser.COMMENT);
        this.state = 212;
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
        this.state = 214;
        this.match(CsharpParser.TEST_CLASS_ANNOT);
        this.state = 215;
        this.match(CsharpParser.CLASS);
        this.state = 216;
        this.typeName();
        this.state = 217;
        this.match(CsharpParser.NL);
        this.state = 218;
        this.match(CsharpParser.TEST_METHOD_ANNOT);
        this.state = 219;
        this.match(CsharpParser.STATIC);
        this.state = 220;
        this.match(CsharpParser.VOID);
        this.state = 221;
        this.testName();
        this.state = 228;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (((_la - 29) & ~0x1f) === 0 && ((1 << (_la - 29)) & 134217731) !== 0) {
          {
            this.state = 226;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 8, this.context)) {
              case 1:
                {
                  this.state = 222;
                  this.assert();
                }
                break;
              case 2:
                {
                  this.state = 223;
                  this.letStatement();
                }
                break;
              case 3:
                {
                  this.state = 224;
                  this.variableDefinition();
                }
                break;
              case 4:
                {
                  this.state = 225;
                  this.commentLine();
                }
                break;
            }
          }
          this.state = 230;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
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
  public procedure(): ProcedureContext {
    let localContext = new ProcedureContext(this.context, this.state);
    this.enterRule(localContext, 10, CsharpParser.RULE_procedure);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 235;
        this.match(CsharpParser.STATIC);
        this.state = 236;
        this.match(CsharpParser.VOID);
        this.state = 237;
        this.methodName();
        this.state = 238;
        this.match(CsharpParser.OPEN_BRACKET);
        this.state = 240;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (((_la & ~0x1f) === 0 && ((1 << _la) & 124) !== 0) || _la === 54 || _la === 80) {
          {
            this.state = 239;
            this.paramsList();
          }
        }

        this.state = 242;
        this.match(CsharpParser.CLOSE_BRACKET);
        this.state = 243;
        this.match(CsharpParser.OPEN_BRACE);
        this.state = 244;
        this.match(CsharpParser.COMMENT);
        this.state = 245;
        this.match(CsharpParser.NL);
        this.state = 249;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (
          ((_la & ~0x1f) === 0 && ((1 << _la) & 806880124) !== 0) ||
          (((_la - 33) & ~0x1f) === 0 && ((1 << (_la - 33)) & 579667969) !== 0) ||
          (((_la - 79) & ~0x1f) === 0 && ((1 << (_la - 79)) & 127) !== 0)
        ) {
          {
            {
              this.state = 246;
              this.ordinaryStatement();
            }
          }
          this.state = 251;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 252;
        this.match(CsharpParser.CLOSE_BRACE);
        this.state = 253;
        this.match(CsharpParser.COMMENT);
        this.state = 254;
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
        this.state = 256;
        this.match(CsharpParser.CONST);
        this.state = 257;
        this.identifier();
        this.state = 258;
        this.match(CsharpParser.EQUAL);
        this.state = 259;
        this.constantValue();
        this.state = 260;
        this.match(CsharpParser.COMMENT);
        this.state = 261;
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
        this.state = 263;
        this.match(CsharpParser.ENUM);
        this.state = 264;
        this.typeName();
        this.state = 265;
        this.match(CsharpParser.OPEN_BRACE);
        this.state = 266;
        this.enumValuesList();
        this.state = 267;
        this.match(CsharpParser.CLOSE_BRACKET);
        this.state = 268;
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
        this.state = 270;
        this.match(CsharpParser.CLASS);
        this.state = 271;
        this.typeName();
        this.state = 274;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 66) {
          {
            this.state = 272;
            this.match(CsharpParser.COLON);
            this.state = 273;
            this.typeName();
          }
        }

        this.state = 276;
        this.match(CsharpParser.OPEN_BRACE);
        this.state = 277;
        this.match(CsharpParser.NL);
        this.state = 285;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (_la === 36 || _la === 56) {
          {
            this.state = 283;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 13, this.context)) {
              case 1:
                {
                  this.state = 278;
                  this.constructorMember();
                }
                break;
              case 2:
                {
                  this.state = 279;
                  this.property();
                }
                break;
              case 3:
                {
                  this.state = 280;
                  this.functionMethod();
                }
                break;
              case 4:
                {
                  this.state = 281;
                  this.procedureMethod();
                }
                break;
              case 5:
                {
                  this.state = 282;
                  this.commentLine();
                }
                break;
            }
          }
          this.state = 287;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 288;
        this.match(CsharpParser.CLOSE_BRACE);
        this.state = 289;
        this.match(CsharpParser.COMMENT);
        this.state = 290;
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
        this.state = 292;
        this.match(CsharpParser.ABSTRACT);
        this.state = 293;
        this.match(CsharpParser.CLASS);
        this.state = 294;
        this.typeName();
        this.state = 297;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 66) {
          {
            this.state = 295;
            this.match(CsharpParser.COLON);
            this.state = 296;
            this.typeName();
          }
        }

        this.state = 299;
        this.match(CsharpParser.OPEN_BRACE);
        this.state = 300;
        this.match(CsharpParser.NL);
        this.state = 309;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (((_la - 27) & ~0x1f) === 0 && ((1 << (_la - 27)) & 536871425) !== 0) {
          {
            this.state = 307;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 16, this.context)) {
              case 1:
                {
                  this.state = 301;
                  this.property();
                }
                break;
              case 2:
                {
                  this.state = 302;
                  this.functionMethod();
                }
                break;
              case 3:
                {
                  this.state = 303;
                  this.procedureMethod();
                }
                break;
              case 4:
                {
                  this.state = 304;
                  this.abstractFunction();
                }
                break;
              case 5:
                {
                  this.state = 305;
                  this.abstractProcedure();
                }
                break;
              case 6:
                {
                  this.state = 306;
                  this.commentLine();
                }
                break;
            }
          }
          this.state = 311;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 312;
        this.match(CsharpParser.CLOSE_BRACE);
        this.state = 313;
        this.match(CsharpParser.COMMENT);
        this.state = 314;
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
  public commentLine(): CommentLineContext {
    let localContext = new CommentLineContext(this.context, this.state);
    this.enterRule(localContext, 20, CsharpParser.RULE_commentLine);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 316;
        this.match(CsharpParser.COMMENT);
        this.state = 317;
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
  public ordinaryStatement(): OrdinaryStatementContext {
    let localContext = new OrdinaryStatementContext(this.context, this.state);
    this.enterRule(localContext, 22, CsharpParser.RULE_ordinaryStatement);
    try {
      this.state = 330;
      this.errorHandler.sync(this);
      switch (this.interpreter.adaptivePredict(this.tokenStream, 18, this.context)) {
        case 1:
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 319;
            this.print();
          }
          break;
        case 2:
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 320;
            this.variableDefinition();
          }
          break;
        case 3:
          this.enterOuterAlt(localContext, 3);
          {
            this.state = 321;
            this.assignment();
          }
          break;
        case 4:
          this.enterOuterAlt(localContext, 4);
          {
            this.state = 322;
            this.inputStatement();
          }
          break;
        case 5:
          this.enterOuterAlt(localContext, 5);
          {
            this.state = 323;
            this.ifStatement();
          }
          break;
        case 6:
          this.enterOuterAlt(localContext, 6);
          {
            this.state = 324;
            this.whileLoop();
          }
          break;
        case 7:
          this.enterOuterAlt(localContext, 7);
          {
            this.state = 325;
            this.forLoop();
          }
          break;
        case 8:
          this.enterOuterAlt(localContext, 8);
          {
            this.state = 326;
            this.procedureCall();
          }
          break;
        case 9:
          this.enterOuterAlt(localContext, 9);
          {
            this.state = 327;
            this.tryStatement();
          }
          break;
        case 10:
          this.enterOuterAlt(localContext, 10);
          {
            this.state = 328;
            this.throwStatement();
          }
          break;
        case 11:
          this.enterOuterAlt(localContext, 11);
          {
            this.state = 329;
            this.commentLine();
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
    this.enterRule(localContext, 24, CsharpParser.RULE_ifStatement);
    try {
      let alternative: number;
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 332;
        this.match(CsharpParser.IF);
        this.state = 333;
        this.match(CsharpParser.OPEN_BRACKET);
        this.state = 334;
        this.expression(0);
        this.state = 335;
        this.match(CsharpParser.CLOSE_BRACKET);
        this.state = 336;
        this.match(CsharpParser.OPEN_BRACE);
        this.state = 337;
        this.match(CsharpParser.NL);
        this.state = 343;
        this.errorHandler.sync(this);
        alternative = this.interpreter.adaptivePredict(this.tokenStream, 20, this.context);
        while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
          if (alternative === 1) {
            {
              this.state = 341;
              this.errorHandler.sync(this);
              switch (this.interpreter.adaptivePredict(this.tokenStream, 19, this.context)) {
                case 1:
                  {
                    this.state = 338;
                    this.elseIfClause();
                  }
                  break;
                case 2:
                  {
                    this.state = 339;
                    this.elseClause();
                  }
                  break;
                case 3:
                  {
                    this.state = 340;
                    this.ordinaryStatement();
                  }
                  break;
              }
            }
          }
          this.state = 345;
          this.errorHandler.sync(this);
          alternative = this.interpreter.adaptivePredict(this.tokenStream, 20, this.context);
        }
        this.state = 346;
        this.match(CsharpParser.CLOSE_BRACE);
        this.state = 347;
        this.match(CsharpParser.COMMENT);
        this.state = 348;
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
    this.enterRule(localContext, 26, CsharpParser.RULE_whileLoop);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 350;
        this.match(CsharpParser.WHILE);
        this.state = 351;
        this.match(CsharpParser.OPEN_BRACKET);
        this.state = 352;
        this.expression(0);
        this.state = 353;
        this.match(CsharpParser.CLOSE_BRACKET);
        this.state = 354;
        this.match(CsharpParser.OPEN_BRACE);
        this.state = 355;
        this.match(CsharpParser.NL);
        this.state = 359;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (
          ((_la & ~0x1f) === 0 && ((1 << _la) & 806880124) !== 0) ||
          (((_la - 33) & ~0x1f) === 0 && ((1 << (_la - 33)) & 579667969) !== 0) ||
          (((_la - 79) & ~0x1f) === 0 && ((1 << (_la - 79)) & 127) !== 0)
        ) {
          {
            {
              this.state = 356;
              this.ordinaryStatement();
            }
          }
          this.state = 361;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 362;
        this.match(CsharpParser.CLOSE_BRACE);
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
  public forLoop(): ForLoopContext {
    let localContext = new ForLoopContext(this.context, this.state);
    this.enterRule(localContext, 28, CsharpParser.RULE_forLoop);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 366;
        this.match(CsharpParser.FOREACH);
        this.state = 367;
        this.match(CsharpParser.OPEN_BRACKET);
        this.state = 368;
        this.match(CsharpParser.VAR);
        this.state = 369;
        this.identifier();
        this.state = 370;
        this.match(CsharpParser.IN);
        this.state = 371;
        this.expression(0);
        this.state = 372;
        this.match(CsharpParser.CLOSE_BRACKET);
        this.state = 373;
        this.match(CsharpParser.OPEN_BRACE);
        this.state = 374;
        this.match(CsharpParser.NL);
        this.state = 378;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (
          ((_la & ~0x1f) === 0 && ((1 << _la) & 806880124) !== 0) ||
          (((_la - 33) & ~0x1f) === 0 && ((1 << (_la - 33)) & 579667969) !== 0) ||
          (((_la - 79) & ~0x1f) === 0 && ((1 << (_la - 79)) & 127) !== 0)
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
        this.match(CsharpParser.CLOSE_BRACE);
        this.state = 382;
        this.match(CsharpParser.COMMENT);
        this.state = 383;
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
  public tryStatement(): TryStatementContext {
    let localContext = new TryStatementContext(this.context, this.state);
    this.enterRule(localContext, 30, CsharpParser.RULE_tryStatement);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 385;
        this.match(CsharpParser.TRY);
        this.state = 386;
        this.match(CsharpParser.OPEN_BRACE);
        this.state = 387;
        this.match(CsharpParser.NL);
        this.state = 391;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (
          ((_la & ~0x1f) === 0 && ((1 << _la) & 806880124) !== 0) ||
          (((_la - 33) & ~0x1f) === 0 && ((1 << (_la - 33)) & 579667969) !== 0) ||
          (((_la - 79) & ~0x1f) === 0 && ((1 << (_la - 79)) & 127) !== 0)
        ) {
          {
            {
              this.state = 388;
              this.ordinaryStatement();
            }
          }
          this.state = 393;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 394;
        this.catchStatement();
        this.state = 398;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (
          ((_la & ~0x1f) === 0 && ((1 << _la) & 806880124) !== 0) ||
          (((_la - 33) & ~0x1f) === 0 && ((1 << (_la - 33)) & 579667969) !== 0) ||
          (((_la - 79) & ~0x1f) === 0 && ((1 << (_la - 79)) & 127) !== 0)
        ) {
          {
            {
              this.state = 395;
              this.ordinaryStatement();
            }
          }
          this.state = 400;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 401;
        this.match(CsharpParser.CLOSE_BRACE);
        this.state = 402;
        this.match(CsharpParser.COMMENT);
        this.state = 403;
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
  public assert(): AssertContext {
    let localContext = new AssertContext(this.context, this.state);
    this.enterRule(localContext, 32, CsharpParser.RULE_assert);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 405;
        this.match(CsharpParser.ASSERT);
        this.state = 406;
        this.match(CsharpParser.DOT);
        this.state = 407;
        this.match(CsharpParser.ARE_EQUAL);
        this.state = 408;
        this.match(CsharpParser.OPEN_BRACKET);
        this.state = 409;
        this.assertActual();
        this.state = 410;
        this.match(CsharpParser.COMMA);
        this.state = 411;
        this.expression(0);
        this.state = 412;
        this.match(CsharpParser.CLOSE_BRACKET);
        this.state = 413;
        this.match(CsharpParser.SEMI_COLON);
        this.state = 414;
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
  public letStatement(): LetStatementContext {
    let localContext = new LetStatementContext(this.context, this.state);
    this.enterRule(localContext, 34, CsharpParser.RULE_letStatement);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 416;
        this.match(CsharpParser.VAR);
        this.state = 417;
        this.identifier();
        this.state = 418;
        this.match(CsharpParser.SINGLE_EQUALS);
        this.state = 419;
        this.expression(0);
        this.state = 420;
        this.match(CsharpParser.SEMI_COLON);
        this.state = 421;
        this.match(CsharpParser.COMMENT);
        this.state = 422;
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
  public print(): PrintContext {
    let localContext = new PrintContext(this.context, this.state);
    this.enterRule(localContext, 36, CsharpParser.RULE_print);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 424;
        this.match(CsharpParser.PRINT);
        this.state = 425;
        this.match(CsharpParser.OPEN_BRACKET);
        this.state = 427;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (
          ((_la & ~0x1f) === 0 && ((1 << _la) & 1577852) !== 0) ||
          (((_la - 34) & ~0x1f) === 0 && ((1 << (_la - 34)) & 287309825) !== 0) ||
          (((_la - 68) & ~0x1f) === 0 && ((1 << (_la - 68)) & 260097) !== 0)
        ) {
          {
            this.state = 426;
            this.expression(0);
          }
        }

        this.state = 429;
        this.match(CsharpParser.CLOSE_BRACKET);
        this.state = 430;
        this.match(CsharpParser.SEMI_COLON);
        this.state = 431;
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
    this.enterRule(localContext, 38, CsharpParser.RULE_variableDefinition);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 433;
        this.match(CsharpParser.VAR);
        this.state = 434;
        this.identifier();
        this.state = 435;
        this.match(CsharpParser.SINGLE_EQUALS);
        this.state = 436;
        this.expression(0);
        this.state = 437;
        this.match(CsharpParser.SEMI_COLON);
        this.state = 438;
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
    this.enterRule(localContext, 40, CsharpParser.RULE_assignment);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 440;
        this.assignable();
        this.state = 441;
        this.match(CsharpParser.SINGLE_EQUALS);
        this.state = 442;
        this.expression(0);
        this.state = 443;
        this.match(CsharpParser.SEMI_COLON);
        this.state = 444;
        this.match(CsharpParser.COMMENT);
        this.state = 445;
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
    this.enterRule(localContext, 42, CsharpParser.RULE_inputStatement);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 447;
        this.identifier();
        this.state = 448;
        this.match(CsharpParser.EQUAL);
        this.state = 449;
        this.match(CsharpParser.INPUT);
        this.state = 450;
        this.match(CsharpParser.OPEN_BRACKET);
        this.state = 451;
        this.expression(0);
        this.state = 452;
        this.match(CsharpParser.CLOSE_BRACKET);
        this.state = 453;
        this.match(CsharpParser.SEMI_COLON);
        this.state = 454;
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
    this.enterRule(localContext, 44, CsharpParser.RULE_procedureCall);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 456;
        this.term();
        this.state = 457;
        this.match(CsharpParser.SEMI_COLON);
        this.state = 458;
        this.match(CsharpParser.COMMENT);
        this.state = 459;
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
    this.enterRule(localContext, 46, CsharpParser.RULE_throwStatement);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 461;
        this.match(CsharpParser.THROW);
        this.state = 462;
        this.match(CsharpParser.NEW);
        this.state = 463;
        this.typeName();
        this.state = 464;
        this.match(CsharpParser.OPEN_BRACKET);
        this.state = 465;
        this.expression(0);
        this.state = 466;
        this.match(CsharpParser.CLOSE_BRACKET);
        this.state = 467;
        this.match(CsharpParser.SEMI_COLON);
        this.state = 468;
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
    this.enterRule(localContext, 48, CsharpParser.RULE_returnStatement);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 470;
        this.match(CsharpParser.RETURN);
        this.state = 471;
        this.expression(0);
        this.state = 472;
        this.match(CsharpParser.SEMI_COLON);
        this.state = 473;
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
    this.enterRule(localContext, 50, CsharpParser.RULE_elseIfClause);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 475;
        this.match(CsharpParser.CLOSE_BRACE);
        this.state = 476;
        this.match(CsharpParser.ELSE);
        this.state = 477;
        this.match(CsharpParser.IF);
        this.state = 478;
        this.match(CsharpParser.OPEN_BRACKET);
        this.state = 479;
        this.expression(0);
        this.state = 480;
        this.match(CsharpParser.CLOSE_BRACKET);
        this.state = 481;
        this.match(CsharpParser.OPEN_BRACE);
        this.state = 482;
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
    this.enterRule(localContext, 52, CsharpParser.RULE_elseClause);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 484;
        this.match(CsharpParser.CLOSE_BRACE);
        this.state = 485;
        this.match(CsharpParser.ELSE);
        this.state = 486;
        this.match(CsharpParser.OPEN_BRACE);
        this.state = 487;
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
    this.enterRule(localContext, 54, CsharpParser.RULE_catchStatement);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 489;
        this.match(CsharpParser.CLOSE_BRACE);
        this.state = 490;
        this.match(CsharpParser.CATCH);
        this.state = 491;
        this.match(CsharpParser.OPEN_BRACKET);
        this.state = 492;
        this.typeName();
        this.state = 493;
        this.identifier();
        this.state = 494;
        this.match(CsharpParser.CLOSE_BRACKET);
        this.state = 495;
        this.match(CsharpParser.OPEN_BRACE);
        this.state = 496;
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
    this.enterRule(localContext, 56, CsharpParser.RULE_constructorMember);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 498;
        this.match(CsharpParser.PUBLIC);
        this.state = 499;
        this.match(CsharpParser.OPEN_BRACKET);
        this.state = 501;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (((_la & ~0x1f) === 0 && ((1 << _la) & 124) !== 0) || _la === 54 || _la === 80) {
          {
            this.state = 500;
            this.paramsList();
          }
        }

        this.state = 503;
        this.match(CsharpParser.CLOSE_BRACKET);
        this.state = 504;
        this.match(CsharpParser.OPEN_BRACE);
        this.state = 505;
        this.match(CsharpParser.NL);
        this.state = 509;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (
          ((_la & ~0x1f) === 0 && ((1 << _la) & 806880124) !== 0) ||
          (((_la - 33) & ~0x1f) === 0 && ((1 << (_la - 33)) & 579667969) !== 0) ||
          (((_la - 79) & ~0x1f) === 0 && ((1 << (_la - 79)) & 127) !== 0)
        ) {
          {
            {
              this.state = 506;
              this.ordinaryStatement();
            }
          }
          this.state = 511;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 512;
        this.match(CsharpParser.CLOSE_BRACE);
        this.state = 513;
        this.match(CsharpParser.COMMENT);
        this.state = 514;
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
    this.enterRule(localContext, 58, CsharpParser.RULE_property);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 516;
        this.match(CsharpParser.PUBLIC);
        this.state = 517;
        this.type_();
        this.state = 518;
        this.identifier();
        this.state = 519;
        this.match(CsharpParser.GET_SET);
        this.state = 520;
        this.match(CsharpParser.COMMENT);
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
  public functionMethod(): FunctionMethodContext {
    let localContext = new FunctionMethodContext(this.context, this.state);
    this.enterRule(localContext, 60, CsharpParser.RULE_functionMethod);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 523;
        this.match(CsharpParser.PUBLIC);
        this.state = 524;
        this.type_();
        this.state = 525;
        this.methodName();
        this.state = 526;
        this.match(CsharpParser.OPEN_BRACKET);
        this.state = 528;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (((_la & ~0x1f) === 0 && ((1 << _la) & 124) !== 0) || _la === 54 || _la === 80) {
          {
            this.state = 527;
            this.paramsList();
          }
        }

        this.state = 530;
        this.match(CsharpParser.CLOSE_BRACKET);
        this.state = 531;
        this.match(CsharpParser.OPEN_BRACE);
        this.state = 532;
        this.match(CsharpParser.COMMENT);
        this.state = 533;
        this.match(CsharpParser.NL);
        this.state = 538;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (
          ((_la & ~0x1f) === 0 && ((1 << _la) & 806880124) !== 0) ||
          (((_la - 33) & ~0x1f) === 0 && ((1 << (_la - 33)) & 579667969) !== 0) ||
          (((_la - 79) & ~0x1f) === 0 && ((1 << (_la - 79)) & 127) !== 0)
        ) {
          {
            this.state = 536;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 29, this.context)) {
              case 1:
                {
                  this.state = 534;
                  this.letStatement();
                }
                break;
              case 2:
                {
                  this.state = 535;
                  this.ordinaryStatement();
                }
                break;
            }
          }
          this.state = 540;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 541;
        this.returnStatement();
        this.state = 542;
        this.match(CsharpParser.CLOSE_BRACE);
        this.state = 543;
        this.match(CsharpParser.COMMENT);
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
  public procedureMethod(): ProcedureMethodContext {
    let localContext = new ProcedureMethodContext(this.context, this.state);
    this.enterRule(localContext, 62, CsharpParser.RULE_procedureMethod);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 546;
        this.match(CsharpParser.PUBLIC);
        this.state = 547;
        this.match(CsharpParser.VOID);
        this.state = 548;
        this.methodName();
        this.state = 549;
        this.match(CsharpParser.OPEN_BRACKET);
        this.state = 551;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (((_la & ~0x1f) === 0 && ((1 << _la) & 124) !== 0) || _la === 54 || _la === 80) {
          {
            this.state = 550;
            this.paramsList();
          }
        }

        this.state = 553;
        this.match(CsharpParser.CLOSE_BRACKET);
        this.state = 554;
        this.match(CsharpParser.OPEN_BRACE);
        this.state = 555;
        this.match(CsharpParser.COMMENT);
        this.state = 556;
        this.match(CsharpParser.NL);
        this.state = 560;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (
          ((_la & ~0x1f) === 0 && ((1 << _la) & 806880124) !== 0) ||
          (((_la - 33) & ~0x1f) === 0 && ((1 << (_la - 33)) & 579667969) !== 0) ||
          (((_la - 79) & ~0x1f) === 0 && ((1 << (_la - 79)) & 127) !== 0)
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
  public abstractFunction(): AbstractFunctionContext {
    let localContext = new AbstractFunctionContext(this.context, this.state);
    this.enterRule(localContext, 64, CsharpParser.RULE_abstractFunction);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 567;
        this.match(CsharpParser.ABSTRACT);
        this.state = 568;
        this.type_();
        this.state = 569;
        this.methodName();
        this.state = 570;
        this.match(CsharpParser.OPEN_BRACKET);
        this.state = 572;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (((_la & ~0x1f) === 0 && ((1 << _la) & 124) !== 0) || _la === 54 || _la === 80) {
          {
            this.state = 571;
            this.paramsList();
          }
        }

        this.state = 574;
        this.match(CsharpParser.CLOSE_BRACKET);
        this.state = 575;
        this.match(CsharpParser.SEMI_COLON);
        this.state = 576;
        this.match(CsharpParser.COMMENT);
        this.state = 577;
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
    this.enterRule(localContext, 66, CsharpParser.RULE_abstractProcedure);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 579;
        this.match(CsharpParser.ABSTRACT);
        this.state = 580;
        this.match(CsharpParser.VOID);
        this.state = 581;
        this.methodName();
        this.state = 582;
        this.match(CsharpParser.OPEN_BRACKET);
        this.state = 584;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (((_la & ~0x1f) === 0 && ((1 << _la) & 124) !== 0) || _la === 54 || _la === 80) {
          {
            this.state = 583;
            this.paramsList();
          }
        }

        this.state = 586;
        this.match(CsharpParser.CLOSE_BRACKET);
        this.state = 587;
        this.match(CsharpParser.SEMI_COLON);
        this.state = 588;
        this.match(CsharpParser.COMMENT);
        this.state = 589;
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
  public identifier(): IdentifierContext {
    let localContext = new IdentifierContext(this.context, this.state);
    this.enterRule(localContext, 68, CsharpParser.RULE_identifier);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 591;
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
  public assignable(): AssignableContext {
    let localContext = new AssignableContext(this.context, this.state);
    this.enterRule(localContext, 70, CsharpParser.RULE_assignable);
    try {
      this.state = 595;
      this.errorHandler.sync(this);
      switch (this.tokenStream.LA(1)) {
        case CsharpParser.NAME_STARTING_LC:
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 593;
            this.identifierWithOptIndexes();
          }
          break;
        case CsharpParser.THIS_INSTANCE:
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 594;
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
    this.enterRule(localContext, 72, CsharpParser.RULE_methodName);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 597;
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
    this.enterRule(localContext, 74, CsharpParser.RULE_testName);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 599;
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
    this.enterRule(localContext, 76, CsharpParser.RULE_typeName);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 601;
        _la = this.tokenStream.LA(1);
        if (!(((_la & ~0x1f) === 0 && ((1 << _la) & 124) !== 0) || _la === 80)) {
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
    this.enterRule(localContext, 78, CsharpParser.RULE_constantValue);
    try {
      this.state = 605;
      this.errorHandler.sync(this);
      switch (this.tokenStream.LA(1)) {
        case CsharpParser.INT_NAME:
        case CsharpParser.FLOAT_NAME:
        case CsharpParser.BOOL_NAME:
        case CsharpParser.STRING_NAME:
        case CsharpParser.LIST_NAME:
        case CsharpParser.TRUE:
        case CsharpParser.FALSE:
        case CsharpParser.INTERPOLATED_STRING_PREFIX:
        case CsharpParser.NAME_STARTING_UC:
        case CsharpParser.LITERAL_BINARY:
        case CsharpParser.LITERAL_HEX:
        case CsharpParser.LITERAL_INTEGER:
        case CsharpParser.LITERAL_FLOAT:
        case CsharpParser.LITERAL_STRING:
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 603;
            this.litValue();
          }
          break;
        case CsharpParser.NAME_STARTING_LC:
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 604;
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
    this.enterRule(localContext, 80, CsharpParser.RULE_argList);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 607;
        this.argument();
        this.state = 612;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (_la === 65) {
          {
            {
              this.state = 608;
              this.match(CsharpParser.COMMA);
              this.state = 609;
              this.argument();
            }
          }
          this.state = 614;
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
    this.enterRule(localContext, 82, CsharpParser.RULE_argument);
    try {
      this.state = 617;
      this.errorHandler.sync(this);
      switch (this.tokenStream.LA(1)) {
        case CsharpParser.LAMBDA:
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 615;
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
        case CsharpParser.INTERPOLATED_STRING_PREFIX:
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
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 616;
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
    this.enterRule(localContext, 84, CsharpParser.RULE_paramsList);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 619;
        this.paramDef();
        this.state = 624;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (_la === 65) {
          {
            {
              this.state = 620;
              this.match(CsharpParser.COMMA);
              this.state = 621;
              this.paramDef();
            }
          }
          this.state = 626;
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
    this.enterRule(localContext, 86, CsharpParser.RULE_type);
    try {
      this.state = 630;
      this.errorHandler.sync(this);
      switch (this.interpreter.adaptivePredict(this.tokenStream, 40, this.context)) {
        case 1:
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 627;
            this.typeTuple();
          }
          break;
        case 2:
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 628;
            this.typeName();
          }
          break;
        case 3:
          this.enterOuterAlt(localContext, 3);
          {
            this.state = 629;
            this.typeGeneric();
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
    this.enterRule(localContext, 88, CsharpParser.RULE_enumValuesList);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 632;
        this.identifier();
        this.state = 637;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (_la === 65) {
          {
            {
              this.state = 633;
              this.match(CsharpParser.COMMA);
              this.state = 634;
              this.identifier();
            }
          }
          this.state = 639;
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
    this.enterRule(localContext, 90, CsharpParser.RULE_assertActual);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 640;
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
    this.enterRule(localContext, 92, CsharpParser.RULE_litValue);
    try {
      this.state = 647;
      this.errorHandler.sync(this);
      switch (this.tokenStream.LA(1)) {
        case CsharpParser.TRUE:
        case CsharpParser.FALSE:
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 642;
            this.litBoolean();
          }
          break;
        case CsharpParser.LITERAL_BINARY:
        case CsharpParser.LITERAL_HEX:
        case CsharpParser.LITERAL_INTEGER:
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 643;
            this.litInt();
          }
          break;
        case CsharpParser.LITERAL_FLOAT:
          this.enterOuterAlt(localContext, 3);
          {
            this.state = 644;
            this.litFloat();
          }
          break;
        case CsharpParser.INTERPOLATED_STRING_PREFIX:
        case CsharpParser.LITERAL_STRING:
          this.enterOuterAlt(localContext, 4);
          {
            this.state = 645;
            this.litString();
          }
          break;
        case CsharpParser.INT_NAME:
        case CsharpParser.FLOAT_NAME:
        case CsharpParser.BOOL_NAME:
        case CsharpParser.STRING_NAME:
        case CsharpParser.LIST_NAME:
        case CsharpParser.NAME_STARTING_UC:
          this.enterOuterAlt(localContext, 5);
          {
            this.state = 646;
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
    this.enterRule(localContext, 94, CsharpParser.RULE_litBoolean);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 649;
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
    this.enterRule(localContext, 96, CsharpParser.RULE_litInt);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 651;
        _la = this.tokenStream.LA(1);
        if (!(((_la - 81) & ~0x1f) === 0 && ((1 << (_la - 81)) & 7) !== 0)) {
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
    this.enterRule(localContext, 98, CsharpParser.RULE_litFloat);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 653;
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
  public enumValue(): EnumValueContext {
    let localContext = new EnumValueContext(this.context, this.state);
    this.enterRule(localContext, 100, CsharpParser.RULE_enumValue);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 655;
        this.typeName();
        this.state = 656;
        this.match(CsharpParser.DOT);
        this.state = 657;
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
    this.enterRule(localContext, 102, CsharpParser.RULE_litString);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 660;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 19) {
          {
            this.state = 659;
            this.match(CsharpParser.INTERPOLATED_STRING_PREFIX);
          }
        }

        this.state = 662;
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
  public index(): IndexContext {
    let localContext = new IndexContext(this.context, this.state);
    this.enterRule(localContext, 104, CsharpParser.RULE_index);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 664;
        this.match(CsharpParser.OPEN_SQ_BRACKET);
        this.state = 665;
        this.expression(0);
        this.state = 666;
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
  public identifierWithOptIndexes(): IdentifierWithOptIndexesContext {
    let localContext = new IdentifierWithOptIndexesContext(this.context, this.state);
    this.enterRule(localContext, 106, CsharpParser.RULE_identifierWithOptIndexes);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 668;
        this.identifier();
        this.state = 672;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (_la === 60) {
          {
            {
              this.state = 669;
              this.index();
            }
          }
          this.state = 674;
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
    this.enterRule(localContext, 108, CsharpParser.RULE_propertyRef);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 675;
        this.match(CsharpParser.THIS_INSTANCE);
        this.state = 676;
        this.match(CsharpParser.DOT);
        this.state = 677;
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
    let _startState = 110;
    this.enterRecursionRule(localContext, 110, CsharpParser.RULE_expression, _p);
    try {
      let alternative: number;
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 692;
        this.errorHandler.sync(this);
        switch (this.tokenStream.LA(1)) {
          case CsharpParser.NEW:
            {
              this.state = 680;
              this.newInstance();
            }
            break;
          case CsharpParser.NOT:
          case CsharpParser.MINUS:
            {
              this.state = 681;
              this.unaryExpression();
            }
            break;
          case CsharpParser.INT_NAME:
          case CsharpParser.FLOAT_NAME:
          case CsharpParser.BOOL_NAME:
          case CsharpParser.STRING_NAME:
          case CsharpParser.LIST_NAME:
          case CsharpParser.TRUE:
          case CsharpParser.FALSE:
          case CsharpParser.INTERPOLATED_STRING_PREFIX:
          case CsharpParser.THIS_INSTANCE:
          case CsharpParser.OPEN_BRACE:
          case CsharpParser.OPEN_BRACKET:
          case CsharpParser.NAME_STARTING_LC:
          case CsharpParser.NAME_STARTING_UC:
          case CsharpParser.LITERAL_BINARY:
          case CsharpParser.LITERAL_HEX:
          case CsharpParser.LITERAL_INTEGER:
          case CsharpParser.LITERAL_FLOAT:
          case CsharpParser.LITERAL_STRING:
            {
              this.state = 682;
              this.term();
            }
            break;
          case CsharpParser.IF_:
            {
              this.state = 683;
              this.match(CsharpParser.IF_);
              this.state = 684;
              this.match(CsharpParser.OPEN_BRACKET);
              this.state = 685;
              this.expression(0);
              this.state = 686;
              this.match(CsharpParser.COMMA);
              this.state = 687;
              this.expression(0);
              this.state = 688;
              this.match(CsharpParser.COMMA);
              this.state = 689;
              this.expression(0);
              this.state = 690;
              this.match(CsharpParser.CLOSE_BRACKET);
            }
            break;
          default:
            throw new antlr.NoViableAltException(this);
        }
        this.context!.stop = this.tokenStream.LT(-1);
        this.state = 700;
        this.errorHandler.sync(this);
        alternative = this.interpreter.adaptivePredict(this.tokenStream, 46, this.context);
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
                  CsharpParser.RULE_expression,
                );
                this.state = 694;
                if (!this.precpred(this.context, 2)) {
                  throw this.createFailedPredicateException("this.precpred(this.context, 2)");
                }
                this.state = 695;
                this.binaryOperator();
                this.state = 696;
                this.expression(3);
              }
            }
          }
          this.state = 702;
          this.errorHandler.sync(this);
          alternative = this.interpreter.adaptivePredict(this.tokenStream, 46, this.context);
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
    this.enterRule(localContext, 112, CsharpParser.RULE_term);
    try {
      let alternative: number;
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 703;
        this.chainHead();
        this.state = 708;
        this.errorHandler.sync(this);
        alternative = this.interpreter.adaptivePredict(this.tokenStream, 47, this.context);
        while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
          if (alternative === 1) {
            {
              {
                this.state = 704;
                this.match(CsharpParser.DOT);
                this.state = 705;
                this.chainable();
              }
            }
          }
          this.state = 710;
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
  public chainHead(): ChainHeadContext {
    let localContext = new ChainHeadContext(this.context, this.state);
    this.enterRule(localContext, 114, CsharpParser.RULE_chainHead);
    try {
      this.state = 717;
      this.errorHandler.sync(this);
      switch (this.interpreter.adaptivePredict(this.tokenStream, 48, this.context)) {
        case 1:
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 711;
            this.match(CsharpParser.THIS_INSTANCE);
          }
          break;
        case 2:
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 712;
            this.bracketedExpression();
          }
          break;
        case 3:
          this.enterOuterAlt(localContext, 3);
          {
            this.state = 713;
            this.tuple();
          }
          break;
        case 4:
          this.enterOuterAlt(localContext, 4);
          {
            this.state = 714;
            this.litValue();
          }
          break;
        case 5:
          this.enterOuterAlt(localContext, 5);
          {
            this.state = 715;
            this.list();
          }
          break;
        case 6:
          this.enterOuterAlt(localContext, 6);
          {
            this.state = 716;
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
  public chainable(): ChainableContext {
    let localContext = new ChainableContext(this.context, this.state);
    this.enterRule(localContext, 116, CsharpParser.RULE_chainable);
    try {
      let alternative: number;
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 721;
        this.errorHandler.sync(this);
        switch (this.interpreter.adaptivePredict(this.tokenStream, 49, this.context)) {
          case 1:
            {
              this.state = 719;
              this.identifier();
            }
            break;
          case 2:
            {
              this.state = 720;
              this.methodCall();
            }
            break;
        }
        this.state = 726;
        this.errorHandler.sync(this);
        alternative = this.interpreter.adaptivePredict(this.tokenStream, 50, this.context);
        while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
          if (alternative === 1) {
            {
              {
                this.state = 723;
                this.index();
              }
            }
          }
          this.state = 728;
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
  public bracketedExpression(): BracketedExpressionContext {
    let localContext = new BracketedExpressionContext(this.context, this.state);
    this.enterRule(localContext, 118, CsharpParser.RULE_bracketedExpression);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 729;
        this.match(CsharpParser.OPEN_BRACKET);
        this.state = 730;
        this.expression(0);
        this.state = 731;
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
    this.enterRule(localContext, 120, CsharpParser.RULE_unaryExpression);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 733;
        _la = this.tokenStream.LA(1);
        if (!(_la === 12 || _la === 68)) {
          this.errorHandler.recoverInline(this);
        } else {
          this.errorHandler.reportMatch(this);
          this.consume();
        }
        this.state = 734;
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
    this.enterRule(localContext, 122, CsharpParser.RULE_binaryExpression);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 736;
        this.term();
        this.state = 737;
        this.binaryOperator();
        this.state = 738;
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
    this.enterRule(localContext, 124, CsharpParser.RULE_tuple);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 740;
        this.match(CsharpParser.OPEN_BRACKET);
        this.state = 741;
        this.expression(0);
        this.state = 742;
        this.match(CsharpParser.COMMA);
        this.state = 743;
        this.expression(0);
        this.state = 748;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (_la === 65) {
          {
            {
              this.state = 744;
              this.match(CsharpParser.COMMA);
              this.state = 745;
              this.expression(0);
            }
          }
          this.state = 750;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 751;
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
  public methodCall(): MethodCallContext {
    let localContext = new MethodCallContext(this.context, this.state);
    this.enterRule(localContext, 126, CsharpParser.RULE_methodCall);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 753;
        this.methodName();
        this.state = 754;
        this.match(CsharpParser.OPEN_BRACKET);
        this.state = 756;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (
          ((_la & ~0x1f) === 0 && ((1 << _la) & 1577852) !== 0) ||
          (((_la - 34) & ~0x1f) === 0 && ((1 << (_la - 34)) & 287318017) !== 0) ||
          (((_la - 68) & ~0x1f) === 0 && ((1 << (_la - 68)) & 260097) !== 0)
        ) {
          {
            this.state = 755;
            this.argList();
          }
        }

        this.state = 758;
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
    this.enterRule(localContext, 128, CsharpParser.RULE_binaryOperator);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 760;
        _la = this.tokenStream.LA(1);
        if (!(
          ((_la & ~0x1f) === 0 && ((1 << _la) & 60416) !== 0) ||
          (((_la - 67) & ~0x1f) === 0 && ((1 << (_la - 67)) & 255) !== 0)
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
    this.enterRule(localContext, 130, CsharpParser.RULE_newInstance);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 762;
        this.match(CsharpParser.NEW);
        this.state = 763;
        this.type_();
        this.state = 764;
        this.match(CsharpParser.OPEN_BRACKET);
        this.state = 766;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (
          ((_la & ~0x1f) === 0 && ((1 << _la) & 1577852) !== 0) ||
          (((_la - 34) & ~0x1f) === 0 && ((1 << (_la - 34)) & 287318017) !== 0) ||
          (((_la - 68) & ~0x1f) === 0 && ((1 << (_la - 68)) & 260097) !== 0)
        ) {
          {
            this.state = 765;
            this.argList();
          }
        }

        this.state = 768;
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
    this.enterRule(localContext, 132, CsharpParser.RULE_paramDef);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 770;
        this.type_();
        this.state = 771;
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
  public typeGeneric(): TypeGenericContext {
    let localContext = new TypeGenericContext(this.context, this.state);
    this.enterRule(localContext, 134, CsharpParser.RULE_typeGeneric);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 773;
        this.typeName();
        this.state = 774;
        this.match(CsharpParser.LT);
        this.state = 775;
        this.type_();
        this.state = 780;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (_la === 65) {
          {
            {
              this.state = 776;
              this.match(CsharpParser.COMMA);
              this.state = 777;
              this.type_();
            }
          }
          this.state = 782;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 783;
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
    this.enterRule(localContext, 136, CsharpParser.RULE_typeTuple);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 785;
        this.match(CsharpParser.TUPLE);
        this.state = 786;
        this.match(CsharpParser.OPEN_SQ_BRACKET);
        this.state = 787;
        this.type_();
        this.state = 790;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        do {
          {
            {
              this.state = 788;
              this.match(CsharpParser.COMMA);
              this.state = 789;
              this.type_();
            }
          }
          this.state = 792;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        } while (_la === 65);
        this.state = 794;
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
    this.enterRule(localContext, 138, CsharpParser.RULE_lambda);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 796;
        this.match(CsharpParser.LAMBDA);
        this.state = 797;
        this.argList();
        this.state = 798;
        this.match(CsharpParser.COLON);
        this.state = 799;
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
    this.enterRule(localContext, 140, CsharpParser.RULE_list);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 801;
        this.match(CsharpParser.OPEN_BRACE);
        this.state = 802;
        this.expression(0);
        this.state = 807;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (_la === 65) {
          {
            {
              this.state = 803;
              this.match(CsharpParser.COMMA);
              this.state = 804;
              this.expression(0);
            }
          }
          this.state = 809;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 810;
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
  public interpolatedString(): InterpolatedStringContext {
    let localContext = new InterpolatedStringContext(this.context, this.state);
    this.enterRule(localContext, 142, CsharpParser.RULE_interpolatedString);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 812;
        this.match(CsharpParser.INTERPOLATED_STRING_PREFIX);
        this.state = 813;
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
  public power(): PowerContext {
    let localContext = new PowerContext(this.context, this.state);
    this.enterRule(localContext, 144, CsharpParser.RULE_power);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 815;
        this.term();
        this.state = 816;
        this.match(CsharpParser.POWER);
        this.state = 817;
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
      case 55:
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
    4, 1, 103, 820, 2, 0, 7, 0, 2, 1, 7, 1, 2, 2, 7, 2, 2, 3, 7, 3, 2, 4, 7, 4, 2, 5, 7, 5, 2, 6, 7,
    6, 2, 7, 7, 7, 2, 8, 7, 8, 2, 9, 7, 9, 2, 10, 7, 10, 2, 11, 7, 11, 2, 12, 7, 12, 2, 13, 7, 13,
    2, 14, 7, 14, 2, 15, 7, 15, 2, 16, 7, 16, 2, 17, 7, 17, 2, 18, 7, 18, 2, 19, 7, 19, 2, 20, 7,
    20, 2, 21, 7, 21, 2, 22, 7, 22, 2, 23, 7, 23, 2, 24, 7, 24, 2, 25, 7, 25, 2, 26, 7, 26, 2, 27,
    7, 27, 2, 28, 7, 28, 2, 29, 7, 29, 2, 30, 7, 30, 2, 31, 7, 31, 2, 32, 7, 32, 2, 33, 7, 33, 2,
    34, 7, 34, 2, 35, 7, 35, 2, 36, 7, 36, 2, 37, 7, 37, 2, 38, 7, 38, 2, 39, 7, 39, 2, 40, 7, 40,
    2, 41, 7, 41, 2, 42, 7, 42, 2, 43, 7, 43, 2, 44, 7, 44, 2, 45, 7, 45, 2, 46, 7, 46, 2, 47, 7,
    47, 2, 48, 7, 48, 2, 49, 7, 49, 2, 50, 7, 50, 2, 51, 7, 51, 2, 52, 7, 52, 2, 53, 7, 53, 2, 54,
    7, 54, 2, 55, 7, 55, 2, 56, 7, 56, 2, 57, 7, 57, 2, 58, 7, 58, 2, 59, 7, 59, 2, 60, 7, 60, 2,
    61, 7, 61, 2, 62, 7, 62, 2, 63, 7, 63, 2, 64, 7, 64, 2, 65, 7, 65, 2, 66, 7, 66, 2, 67, 7, 67,
    2, 68, 7, 68, 2, 69, 7, 69, 2, 70, 7, 70, 2, 71, 7, 71, 2, 72, 7, 72, 1, 0, 3, 0, 148, 8, 0, 1,
    0, 5, 0, 151, 8, 0, 10, 0, 12, 0, 154, 9, 0, 1, 0, 5, 0, 157, 8, 0, 10, 0, 12, 0, 160, 9, 0, 1,
    0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 1, 173, 8, 1, 1, 2, 1, 2, 1,
    2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 5, 2, 183, 8, 2, 10, 2, 12, 2, 186, 9, 2, 1, 2, 1, 2, 1, 2, 1,
    2, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 3, 3, 197, 8, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 5, 3, 205,
    8, 3, 10, 3, 12, 3, 208, 9, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 4, 1, 4, 1, 4, 1, 4, 1, 4, 1, 4,
    1, 4, 1, 4, 1, 4, 1, 4, 1, 4, 1, 4, 5, 4, 227, 8, 4, 10, 4, 12, 4, 230, 9, 4, 1, 4, 1, 4, 1, 4,
    1, 4, 1, 5, 1, 5, 1, 5, 1, 5, 1, 5, 3, 5, 241, 8, 5, 1, 5, 1, 5, 1, 5, 1, 5, 1, 5, 5, 5, 248, 8,
    5, 10, 5, 12, 5, 251, 9, 5, 1, 5, 1, 5, 1, 5, 1, 5, 1, 6, 1, 6, 1, 6, 1, 6, 1, 6, 1, 6, 1, 6, 1,
    7, 1, 7, 1, 7, 1, 7, 1, 7, 1, 7, 1, 7, 1, 8, 1, 8, 1, 8, 1, 8, 3, 8, 275, 8, 8, 1, 8, 1, 8, 1,
    8, 1, 8, 1, 8, 1, 8, 1, 8, 5, 8, 284, 8, 8, 10, 8, 12, 8, 287, 9, 8, 1, 8, 1, 8, 1, 8, 1, 8, 1,
    9, 1, 9, 1, 9, 1, 9, 1, 9, 3, 9, 298, 8, 9, 1, 9, 1, 9, 1, 9, 1, 9, 1, 9, 1, 9, 1, 9, 1, 9, 5,
    9, 308, 8, 9, 10, 9, 12, 9, 311, 9, 9, 1, 9, 1, 9, 1, 9, 1, 9, 1, 10, 1, 10, 1, 10, 1, 11, 1,
    11, 1, 11, 1, 11, 1, 11, 1, 11, 1, 11, 1, 11, 1, 11, 1, 11, 1, 11, 3, 11, 331, 8, 11, 1, 12, 1,
    12, 1, 12, 1, 12, 1, 12, 1, 12, 1, 12, 1, 12, 1, 12, 5, 12, 342, 8, 12, 10, 12, 12, 12, 345, 9,
    12, 1, 12, 1, 12, 1, 12, 1, 12, 1, 13, 1, 13, 1, 13, 1, 13, 1, 13, 1, 13, 1, 13, 5, 13, 358, 8,
    13, 10, 13, 12, 13, 361, 9, 13, 1, 13, 1, 13, 1, 13, 1, 13, 1, 14, 1, 14, 1, 14, 1, 14, 1, 14,
    1, 14, 1, 14, 1, 14, 1, 14, 1, 14, 5, 14, 377, 8, 14, 10, 14, 12, 14, 380, 9, 14, 1, 14, 1, 14,
    1, 14, 1, 14, 1, 15, 1, 15, 1, 15, 1, 15, 5, 15, 390, 8, 15, 10, 15, 12, 15, 393, 9, 15, 1, 15,
    1, 15, 5, 15, 397, 8, 15, 10, 15, 12, 15, 400, 9, 15, 1, 15, 1, 15, 1, 15, 1, 15, 1, 16, 1, 16,
    1, 16, 1, 16, 1, 16, 1, 16, 1, 16, 1, 16, 1, 16, 1, 16, 1, 16, 1, 17, 1, 17, 1, 17, 1, 17, 1,
    17, 1, 17, 1, 17, 1, 17, 1, 18, 1, 18, 1, 18, 3, 18, 428, 8, 18, 1, 18, 1, 18, 1, 18, 1, 18, 1,
    19, 1, 19, 1, 19, 1, 19, 1, 19, 1, 19, 1, 19, 1, 20, 1, 20, 1, 20, 1, 20, 1, 20, 1, 20, 1, 20,
    1, 21, 1, 21, 1, 21, 1, 21, 1, 21, 1, 21, 1, 21, 1, 21, 1, 21, 1, 22, 1, 22, 1, 22, 1, 22, 1,
    22, 1, 23, 1, 23, 1, 23, 1, 23, 1, 23, 1, 23, 1, 23, 1, 23, 1, 23, 1, 24, 1, 24, 1, 24, 1, 24,
    1, 24, 1, 25, 1, 25, 1, 25, 1, 25, 1, 25, 1, 25, 1, 25, 1, 25, 1, 25, 1, 26, 1, 26, 1, 26, 1,
    26, 1, 26, 1, 27, 1, 27, 1, 27, 1, 27, 1, 27, 1, 27, 1, 27, 1, 27, 1, 27, 1, 28, 1, 28, 1, 28,
    3, 28, 502, 8, 28, 1, 28, 1, 28, 1, 28, 1, 28, 5, 28, 508, 8, 28, 10, 28, 12, 28, 511, 9, 28, 1,
    28, 1, 28, 1, 28, 1, 28, 1, 29, 1, 29, 1, 29, 1, 29, 1, 29, 1, 29, 1, 29, 1, 30, 1, 30, 1, 30,
    1, 30, 1, 30, 3, 30, 529, 8, 30, 1, 30, 1, 30, 1, 30, 1, 30, 1, 30, 1, 30, 5, 30, 537, 8, 30,
    10, 30, 12, 30, 540, 9, 30, 1, 30, 1, 30, 1, 30, 1, 30, 1, 30, 1, 31, 1, 31, 1, 31, 1, 31, 1,
    31, 3, 31, 552, 8, 31, 1, 31, 1, 31, 1, 31, 1, 31, 1, 31, 5, 31, 559, 8, 31, 10, 31, 12, 31,
    562, 9, 31, 1, 31, 1, 31, 1, 31, 1, 31, 1, 32, 1, 32, 1, 32, 1, 32, 1, 32, 3, 32, 573, 8, 32, 1,
    32, 1, 32, 1, 32, 1, 32, 1, 32, 1, 33, 1, 33, 1, 33, 1, 33, 1, 33, 3, 33, 585, 8, 33, 1, 33, 1,
    33, 1, 33, 1, 33, 1, 33, 1, 34, 1, 34, 1, 35, 1, 35, 3, 35, 596, 8, 35, 1, 36, 1, 36, 1, 37, 1,
    37, 1, 38, 1, 38, 1, 39, 1, 39, 3, 39, 606, 8, 39, 1, 40, 1, 40, 1, 40, 5, 40, 611, 8, 40, 10,
    40, 12, 40, 614, 9, 40, 1, 41, 1, 41, 3, 41, 618, 8, 41, 1, 42, 1, 42, 1, 42, 5, 42, 623, 8, 42,
    10, 42, 12, 42, 626, 9, 42, 1, 43, 1, 43, 1, 43, 3, 43, 631, 8, 43, 1, 44, 1, 44, 1, 44, 5, 44,
    636, 8, 44, 10, 44, 12, 44, 639, 9, 44, 1, 45, 1, 45, 1, 46, 1, 46, 1, 46, 1, 46, 1, 46, 3, 46,
    648, 8, 46, 1, 47, 1, 47, 1, 48, 1, 48, 1, 49, 1, 49, 1, 50, 1, 50, 1, 50, 1, 50, 1, 51, 3, 51,
    661, 8, 51, 1, 51, 1, 51, 1, 52, 1, 52, 1, 52, 1, 52, 1, 53, 1, 53, 5, 53, 671, 8, 53, 10, 53,
    12, 53, 674, 9, 53, 1, 54, 1, 54, 1, 54, 1, 54, 1, 55, 1, 55, 1, 55, 1, 55, 1, 55, 1, 55, 1, 55,
    1, 55, 1, 55, 1, 55, 1, 55, 1, 55, 1, 55, 3, 55, 693, 8, 55, 1, 55, 1, 55, 1, 55, 1, 55, 5, 55,
    699, 8, 55, 10, 55, 12, 55, 702, 9, 55, 1, 56, 1, 56, 1, 56, 5, 56, 707, 8, 56, 10, 56, 12, 56,
    710, 9, 56, 1, 57, 1, 57, 1, 57, 1, 57, 1, 57, 1, 57, 3, 57, 718, 8, 57, 1, 58, 1, 58, 3, 58,
    722, 8, 58, 1, 58, 5, 58, 725, 8, 58, 10, 58, 12, 58, 728, 9, 58, 1, 59, 1, 59, 1, 59, 1, 59, 1,
    60, 1, 60, 1, 60, 1, 61, 1, 61, 1, 61, 1, 61, 1, 62, 1, 62, 1, 62, 1, 62, 1, 62, 1, 62, 5, 62,
    747, 8, 62, 10, 62, 12, 62, 750, 9, 62, 1, 62, 1, 62, 1, 63, 1, 63, 1, 63, 3, 63, 757, 8, 63, 1,
    63, 1, 63, 1, 64, 1, 64, 1, 65, 1, 65, 1, 65, 1, 65, 3, 65, 767, 8, 65, 1, 65, 1, 65, 1, 66, 1,
    66, 1, 66, 1, 67, 1, 67, 1, 67, 1, 67, 1, 67, 5, 67, 779, 8, 67, 10, 67, 12, 67, 782, 9, 67, 1,
    67, 1, 67, 1, 68, 1, 68, 1, 68, 1, 68, 1, 68, 4, 68, 791, 8, 68, 11, 68, 12, 68, 792, 1, 68, 1,
    68, 1, 69, 1, 69, 1, 69, 1, 69, 1, 69, 1, 70, 1, 70, 1, 70, 1, 70, 5, 70, 806, 8, 70, 10, 70,
    12, 70, 809, 9, 70, 1, 70, 1, 70, 1, 71, 1, 71, 1, 71, 1, 72, 1, 72, 1, 72, 1, 72, 1, 72, 0, 1,
    110, 73, 0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40, 42, 44,
    46, 48, 50, 52, 54, 56, 58, 60, 62, 64, 66, 68, 70, 72, 74, 76, 78, 80, 82, 84, 86, 88, 90, 92,
    94, 96, 98, 100, 102, 104, 106, 108, 110, 112, 114, 116, 118, 120, 122, 124, 126, 128, 130, 132,
    134, 136, 138, 140, 142, 144, 0, 5, 2, 0, 2, 6, 80, 80, 1, 0, 8, 9, 1, 0, 81, 83, 2, 0, 12, 12,
    68, 68, 3, 0, 10, 11, 13, 15, 67, 74, 839, 0, 147, 1, 0, 0, 0, 2, 172, 1, 0, 0, 0, 4, 174, 1, 0,
    0, 0, 6, 191, 1, 0, 0, 0, 8, 214, 1, 0, 0, 0, 10, 235, 1, 0, 0, 0, 12, 256, 1, 0, 0, 0, 14, 263,
    1, 0, 0, 0, 16, 270, 1, 0, 0, 0, 18, 292, 1, 0, 0, 0, 20, 316, 1, 0, 0, 0, 22, 330, 1, 0, 0, 0,
    24, 332, 1, 0, 0, 0, 26, 350, 1, 0, 0, 0, 28, 366, 1, 0, 0, 0, 30, 385, 1, 0, 0, 0, 32, 405, 1,
    0, 0, 0, 34, 416, 1, 0, 0, 0, 36, 424, 1, 0, 0, 0, 38, 433, 1, 0, 0, 0, 40, 440, 1, 0, 0, 0, 42,
    447, 1, 0, 0, 0, 44, 456, 1, 0, 0, 0, 46, 461, 1, 0, 0, 0, 48, 470, 1, 0, 0, 0, 50, 475, 1, 0,
    0, 0, 52, 484, 1, 0, 0, 0, 54, 489, 1, 0, 0, 0, 56, 498, 1, 0, 0, 0, 58, 516, 1, 0, 0, 0, 60,
    523, 1, 0, 0, 0, 62, 546, 1, 0, 0, 0, 64, 567, 1, 0, 0, 0, 66, 579, 1, 0, 0, 0, 68, 591, 1, 0,
    0, 0, 70, 595, 1, 0, 0, 0, 72, 597, 1, 0, 0, 0, 74, 599, 1, 0, 0, 0, 76, 601, 1, 0, 0, 0, 78,
    605, 1, 0, 0, 0, 80, 607, 1, 0, 0, 0, 82, 617, 1, 0, 0, 0, 84, 619, 1, 0, 0, 0, 86, 630, 1, 0,
    0, 0, 88, 632, 1, 0, 0, 0, 90, 640, 1, 0, 0, 0, 92, 647, 1, 0, 0, 0, 94, 649, 1, 0, 0, 0, 96,
    651, 1, 0, 0, 0, 98, 653, 1, 0, 0, 0, 100, 655, 1, 0, 0, 0, 102, 660, 1, 0, 0, 0, 104, 664, 1,
    0, 0, 0, 106, 668, 1, 0, 0, 0, 108, 675, 1, 0, 0, 0, 110, 692, 1, 0, 0, 0, 112, 703, 1, 0, 0, 0,
    114, 717, 1, 0, 0, 0, 116, 721, 1, 0, 0, 0, 118, 729, 1, 0, 0, 0, 120, 733, 1, 0, 0, 0, 122,
    736, 1, 0, 0, 0, 124, 740, 1, 0, 0, 0, 126, 753, 1, 0, 0, 0, 128, 760, 1, 0, 0, 0, 130, 762, 1,
    0, 0, 0, 132, 770, 1, 0, 0, 0, 134, 773, 1, 0, 0, 0, 136, 785, 1, 0, 0, 0, 138, 796, 1, 0, 0, 0,
    140, 801, 1, 0, 0, 0, 142, 812, 1, 0, 0, 0, 144, 815, 1, 0, 0, 0, 146, 148, 5, 56, 0, 0, 147,
    146, 1, 0, 0, 0, 147, 148, 1, 0, 0, 0, 148, 152, 1, 0, 0, 0, 149, 151, 3, 2, 1, 0, 150, 149, 1,
    0, 0, 0, 151, 154, 1, 0, 0, 0, 152, 150, 1, 0, 0, 0, 152, 153, 1, 0, 0, 0, 153, 158, 1, 0, 0, 0,
    154, 152, 1, 0, 0, 0, 155, 157, 5, 77, 0, 0, 156, 155, 1, 0, 0, 0, 157, 160, 1, 0, 0, 0, 158,
    156, 1, 0, 0, 0, 158, 159, 1, 0, 0, 0, 159, 161, 1, 0, 0, 0, 160, 158, 1, 0, 0, 0, 161, 162, 5,
    0, 0, 1, 162, 1, 1, 0, 0, 0, 163, 173, 3, 4, 2, 0, 164, 173, 3, 6, 3, 0, 165, 173, 3, 8, 4, 0,
    166, 173, 3, 10, 5, 0, 167, 173, 3, 12, 6, 0, 168, 173, 3, 14, 7, 0, 169, 173, 3, 16, 8, 0, 170,
    173, 3, 18, 9, 0, 171, 173, 3, 20, 10, 0, 172, 163, 1, 0, 0, 0, 172, 164, 1, 0, 0, 0, 172, 165,
    1, 0, 0, 0, 172, 166, 1, 0, 0, 0, 172, 167, 1, 0, 0, 0, 172, 168, 1, 0, 0, 0, 172, 169, 1, 0, 0,
    0, 172, 170, 1, 0, 0, 0, 172, 171, 1, 0, 0, 0, 173, 3, 1, 0, 0, 0, 174, 175, 5, 21, 0, 0, 175,
    176, 5, 22, 0, 0, 176, 177, 5, 48, 0, 0, 177, 178, 5, 62, 0, 0, 178, 179, 5, 63, 0, 0, 179, 180,
    5, 58, 0, 0, 180, 184, 5, 77, 0, 0, 181, 183, 3, 22, 11, 0, 182, 181, 1, 0, 0, 0, 183, 186, 1,
    0, 0, 0, 184, 182, 1, 0, 0, 0, 184, 185, 1, 0, 0, 0, 185, 187, 1, 0, 0, 0, 186, 184, 1, 0, 0, 0,
    187, 188, 5, 59, 0, 0, 188, 189, 5, 56, 0, 0, 189, 190, 5, 77, 0, 0, 190, 5, 1, 0, 0, 0, 191,
    192, 5, 21, 0, 0, 192, 193, 3, 86, 43, 0, 193, 194, 3, 72, 36, 0, 194, 196, 5, 62, 0, 0, 195,
    197, 3, 84, 42, 0, 196, 195, 1, 0, 0, 0, 196, 197, 1, 0, 0, 0, 197, 198, 1, 0, 0, 0, 198, 199,
    5, 63, 0, 0, 199, 200, 5, 58, 0, 0, 200, 201, 5, 56, 0, 0, 201, 206, 5, 77, 0, 0, 202, 205, 3,
    34, 17, 0, 203, 205, 3, 22, 11, 0, 204, 202, 1, 0, 0, 0, 204, 203, 1, 0, 0, 0, 205, 208, 1, 0,
    0, 0, 206, 204, 1, 0, 0, 0, 206, 207, 1, 0, 0, 0, 207, 209, 1, 0, 0, 0, 208, 206, 1, 0, 0, 0,
    209, 210, 3, 48, 24, 0, 210, 211, 5, 59, 0, 0, 211, 212, 5, 56, 0, 0, 212, 213, 5, 77, 0, 0,
    213, 7, 1, 0, 0, 0, 214, 215, 5, 23, 0, 0, 215, 216, 5, 41, 0, 0, 216, 217, 3, 76, 38, 0, 217,
    218, 5, 77, 0, 0, 218, 219, 5, 24, 0, 0, 219, 220, 5, 21, 0, 0, 220, 221, 5, 22, 0, 0, 221, 228,
    3, 74, 37, 0, 222, 227, 3, 32, 16, 0, 223, 227, 3, 34, 17, 0, 224, 227, 3, 38, 19, 0, 225, 227,
    3, 20, 10, 0, 226, 222, 1, 0, 0, 0, 226, 223, 1, 0, 0, 0, 226, 224, 1, 0, 0, 0, 226, 225, 1, 0,
    0, 0, 227, 230, 1, 0, 0, 0, 228, 226, 1, 0, 0, 0, 228, 229, 1, 0, 0, 0, 229, 231, 1, 0, 0, 0,
    230, 228, 1, 0, 0, 0, 231, 232, 5, 59, 0, 0, 232, 233, 5, 56, 0, 0, 233, 234, 5, 77, 0, 0, 234,
    9, 1, 0, 0, 0, 235, 236, 5, 21, 0, 0, 236, 237, 5, 22, 0, 0, 237, 238, 3, 72, 36, 0, 238, 240,
    5, 62, 0, 0, 239, 241, 3, 84, 42, 0, 240, 239, 1, 0, 0, 0, 240, 241, 1, 0, 0, 0, 241, 242, 1, 0,
    0, 0, 242, 243, 5, 63, 0, 0, 243, 244, 5, 58, 0, 0, 244, 245, 5, 56, 0, 0, 245, 249, 5, 77, 0,
    0, 246, 248, 3, 22, 11, 0, 247, 246, 1, 0, 0, 0, 248, 251, 1, 0, 0, 0, 249, 247, 1, 0, 0, 0,
    249, 250, 1, 0, 0, 0, 250, 252, 1, 0, 0, 0, 251, 249, 1, 0, 0, 0, 252, 253, 5, 59, 0, 0, 253,
    254, 5, 56, 0, 0, 254, 255, 5, 77, 0, 0, 255, 11, 1, 0, 0, 0, 256, 257, 5, 25, 0, 0, 257, 258,
    3, 68, 34, 0, 258, 259, 5, 13, 0, 0, 259, 260, 3, 78, 39, 0, 260, 261, 5, 56, 0, 0, 261, 262, 5,
    77, 0, 0, 262, 13, 1, 0, 0, 0, 263, 264, 5, 26, 0, 0, 264, 265, 3, 76, 38, 0, 265, 266, 5, 58,
    0, 0, 266, 267, 3, 88, 44, 0, 267, 268, 5, 63, 0, 0, 268, 269, 5, 77, 0, 0, 269, 15, 1, 0, 0, 0,
    270, 271, 5, 41, 0, 0, 271, 274, 3, 76, 38, 0, 272, 273, 5, 66, 0, 0, 273, 275, 3, 76, 38, 0,
    274, 272, 1, 0, 0, 0, 274, 275, 1, 0, 0, 0, 275, 276, 1, 0, 0, 0, 276, 277, 5, 58, 0, 0, 277,
    285, 5, 77, 0, 0, 278, 284, 3, 56, 28, 0, 279, 284, 3, 58, 29, 0, 280, 284, 3, 60, 30, 0, 281,
    284, 3, 62, 31, 0, 282, 284, 3, 20, 10, 0, 283, 278, 1, 0, 0, 0, 283, 279, 1, 0, 0, 0, 283, 280,
    1, 0, 0, 0, 283, 281, 1, 0, 0, 0, 283, 282, 1, 0, 0, 0, 284, 287, 1, 0, 0, 0, 285, 283, 1, 0, 0,
    0, 285, 286, 1, 0, 0, 0, 286, 288, 1, 0, 0, 0, 287, 285, 1, 0, 0, 0, 288, 289, 5, 59, 0, 0, 289,
    290, 5, 56, 0, 0, 290, 291, 5, 77, 0, 0, 291, 17, 1, 0, 0, 0, 292, 293, 5, 27, 0, 0, 293, 294,
    5, 41, 0, 0, 294, 297, 3, 76, 38, 0, 295, 296, 5, 66, 0, 0, 296, 298, 3, 76, 38, 0, 297, 295, 1,
    0, 0, 0, 297, 298, 1, 0, 0, 0, 298, 299, 1, 0, 0, 0, 299, 300, 5, 58, 0, 0, 300, 309, 5, 77, 0,
    0, 301, 308, 3, 58, 29, 0, 302, 308, 3, 60, 30, 0, 303, 308, 3, 62, 31, 0, 304, 308, 3, 64, 32,
    0, 305, 308, 3, 66, 33, 0, 306, 308, 3, 20, 10, 0, 307, 301, 1, 0, 0, 0, 307, 302, 1, 0, 0, 0,
    307, 303, 1, 0, 0, 0, 307, 304, 1, 0, 0, 0, 307, 305, 1, 0, 0, 0, 307, 306, 1, 0, 0, 0, 308,
    311, 1, 0, 0, 0, 309, 307, 1, 0, 0, 0, 309, 310, 1, 0, 0, 0, 310, 312, 1, 0, 0, 0, 311, 309, 1,
    0, 0, 0, 312, 313, 5, 59, 0, 0, 313, 314, 5, 56, 0, 0, 314, 315, 5, 77, 0, 0, 315, 19, 1, 0, 0,
    0, 316, 317, 5, 56, 0, 0, 317, 318, 5, 77, 0, 0, 318, 21, 1, 0, 0, 0, 319, 331, 3, 36, 18, 0,
    320, 331, 3, 38, 19, 0, 321, 331, 3, 40, 20, 0, 322, 331, 3, 42, 21, 0, 323, 331, 3, 24, 12, 0,
    324, 331, 3, 26, 13, 0, 325, 331, 3, 28, 14, 0, 326, 331, 3, 44, 22, 0, 327, 331, 3, 30, 15, 0,
    328, 331, 3, 46, 23, 0, 329, 331, 3, 20, 10, 0, 330, 319, 1, 0, 0, 0, 330, 320, 1, 0, 0, 0, 330,
    321, 1, 0, 0, 0, 330, 322, 1, 0, 0, 0, 330, 323, 1, 0, 0, 0, 330, 324, 1, 0, 0, 0, 330, 325, 1,
    0, 0, 0, 330, 326, 1, 0, 0, 0, 330, 327, 1, 0, 0, 0, 330, 328, 1, 0, 0, 0, 330, 329, 1, 0, 0, 0,
    331, 23, 1, 0, 0, 0, 332, 333, 5, 44, 0, 0, 333, 334, 5, 62, 0, 0, 334, 335, 3, 110, 55, 0, 335,
    336, 5, 63, 0, 0, 336, 337, 5, 58, 0, 0, 337, 343, 5, 77, 0, 0, 338, 342, 3, 50, 25, 0, 339,
    342, 3, 52, 26, 0, 340, 342, 3, 22, 11, 0, 341, 338, 1, 0, 0, 0, 341, 339, 1, 0, 0, 0, 341, 340,
    1, 0, 0, 0, 342, 345, 1, 0, 0, 0, 343, 341, 1, 0, 0, 0, 343, 344, 1, 0, 0, 0, 344, 346, 1, 0, 0,
    0, 345, 343, 1, 0, 0, 0, 346, 347, 5, 59, 0, 0, 347, 348, 5, 56, 0, 0, 348, 349, 5, 77, 0, 0,
    349, 25, 1, 0, 0, 0, 350, 351, 5, 52, 0, 0, 351, 352, 5, 62, 0, 0, 352, 353, 3, 110, 55, 0, 353,
    354, 5, 63, 0, 0, 354, 355, 5, 58, 0, 0, 355, 359, 5, 77, 0, 0, 356, 358, 3, 22, 11, 0, 357,
    356, 1, 0, 0, 0, 358, 361, 1, 0, 0, 0, 359, 357, 1, 0, 0, 0, 359, 360, 1, 0, 0, 0, 360, 362, 1,
    0, 0, 0, 361, 359, 1, 0, 0, 0, 362, 363, 5, 59, 0, 0, 363, 364, 5, 56, 0, 0, 364, 365, 5, 77, 0,
    0, 365, 27, 1, 0, 0, 0, 366, 367, 5, 28, 0, 0, 367, 368, 5, 62, 0, 0, 368, 369, 5, 29, 0, 0,
    369, 370, 3, 68, 34, 0, 370, 371, 5, 45, 0, 0, 371, 372, 3, 110, 55, 0, 372, 373, 5, 63, 0, 0,
    373, 374, 5, 58, 0, 0, 374, 378, 5, 77, 0, 0, 375, 377, 3, 22, 11, 0, 376, 375, 1, 0, 0, 0, 377,
    380, 1, 0, 0, 0, 378, 376, 1, 0, 0, 0, 378, 379, 1, 0, 0, 0, 379, 381, 1, 0, 0, 0, 380, 378, 1,
    0, 0, 0, 381, 382, 5, 59, 0, 0, 382, 383, 5, 56, 0, 0, 383, 384, 5, 77, 0, 0, 384, 29, 1, 0, 0,
    0, 385, 386, 5, 51, 0, 0, 386, 387, 5, 58, 0, 0, 387, 391, 5, 77, 0, 0, 388, 390, 3, 22, 11, 0,
    389, 388, 1, 0, 0, 0, 390, 393, 1, 0, 0, 0, 391, 389, 1, 0, 0, 0, 391, 392, 1, 0, 0, 0, 392,
    394, 1, 0, 0, 0, 393, 391, 1, 0, 0, 0, 394, 398, 3, 54, 27, 0, 395, 397, 3, 22, 11, 0, 396, 395,
    1, 0, 0, 0, 397, 400, 1, 0, 0, 0, 398, 396, 1, 0, 0, 0, 398, 399, 1, 0, 0, 0, 399, 401, 1, 0, 0,
    0, 400, 398, 1, 0, 0, 0, 401, 402, 5, 59, 0, 0, 402, 403, 5, 56, 0, 0, 403, 404, 5, 77, 0, 0,
    404, 31, 1, 0, 0, 0, 405, 406, 5, 30, 0, 0, 406, 407, 5, 64, 0, 0, 407, 408, 5, 31, 0, 0, 408,
    409, 5, 62, 0, 0, 409, 410, 3, 90, 45, 0, 410, 411, 5, 65, 0, 0, 411, 412, 3, 110, 55, 0, 412,
    413, 5, 63, 0, 0, 413, 414, 5, 32, 0, 0, 414, 415, 5, 77, 0, 0, 415, 33, 1, 0, 0, 0, 416, 417,
    5, 29, 0, 0, 417, 418, 3, 68, 34, 0, 418, 419, 5, 57, 0, 0, 419, 420, 3, 110, 55, 0, 420, 421,
    5, 32, 0, 0, 421, 422, 5, 56, 0, 0, 422, 423, 5, 77, 0, 0, 423, 35, 1, 0, 0, 0, 424, 425, 5, 49,
    0, 0, 425, 427, 5, 62, 0, 0, 426, 428, 3, 110, 55, 0, 427, 426, 1, 0, 0, 0, 427, 428, 1, 0, 0,
    0, 428, 429, 1, 0, 0, 0, 429, 430, 5, 63, 0, 0, 430, 431, 5, 32, 0, 0, 431, 432, 5, 77, 0, 0,
    432, 37, 1, 0, 0, 0, 433, 434, 5, 29, 0, 0, 434, 435, 3, 68, 34, 0, 435, 436, 5, 57, 0, 0, 436,
    437, 3, 110, 55, 0, 437, 438, 5, 32, 0, 0, 438, 439, 5, 77, 0, 0, 439, 39, 1, 0, 0, 0, 440, 441,
    3, 70, 35, 0, 441, 442, 5, 57, 0, 0, 442, 443, 3, 110, 55, 0, 443, 444, 5, 32, 0, 0, 444, 445,
    5, 56, 0, 0, 445, 446, 5, 77, 0, 0, 446, 41, 1, 0, 0, 0, 447, 448, 3, 68, 34, 0, 448, 449, 5,
    13, 0, 0, 449, 450, 5, 46, 0, 0, 450, 451, 5, 62, 0, 0, 451, 452, 3, 110, 55, 0, 452, 453, 5,
    63, 0, 0, 453, 454, 5, 32, 0, 0, 454, 455, 5, 77, 0, 0, 455, 43, 1, 0, 0, 0, 456, 457, 3, 112,
    56, 0, 457, 458, 5, 32, 0, 0, 458, 459, 5, 56, 0, 0, 459, 460, 5, 77, 0, 0, 460, 45, 1, 0, 0, 0,
    461, 462, 5, 33, 0, 0, 462, 463, 5, 34, 0, 0, 463, 464, 3, 76, 38, 0, 464, 465, 5, 62, 0, 0,
    465, 466, 3, 110, 55, 0, 466, 467, 5, 63, 0, 0, 467, 468, 5, 32, 0, 0, 468, 469, 5, 77, 0, 0,
    469, 47, 1, 0, 0, 0, 470, 471, 5, 50, 0, 0, 471, 472, 3, 110, 55, 0, 472, 473, 5, 32, 0, 0, 473,
    474, 5, 77, 0, 0, 474, 49, 1, 0, 0, 0, 475, 476, 5, 59, 0, 0, 476, 477, 5, 42, 0, 0, 477, 478,
    5, 44, 0, 0, 478, 479, 5, 62, 0, 0, 479, 480, 3, 110, 55, 0, 480, 481, 5, 63, 0, 0, 481, 482, 5,
    58, 0, 0, 482, 483, 5, 77, 0, 0, 483, 51, 1, 0, 0, 0, 484, 485, 5, 59, 0, 0, 485, 486, 5, 42, 0,
    0, 486, 487, 5, 58, 0, 0, 487, 488, 5, 77, 0, 0, 488, 53, 1, 0, 0, 0, 489, 490, 5, 59, 0, 0,
    490, 491, 5, 35, 0, 0, 491, 492, 5, 62, 0, 0, 492, 493, 3, 76, 38, 0, 493, 494, 3, 68, 34, 0,
    494, 495, 5, 63, 0, 0, 495, 496, 5, 58, 0, 0, 496, 497, 5, 77, 0, 0, 497, 55, 1, 0, 0, 0, 498,
    499, 5, 36, 0, 0, 499, 501, 5, 62, 0, 0, 500, 502, 3, 84, 42, 0, 501, 500, 1, 0, 0, 0, 501, 502,
    1, 0, 0, 0, 502, 503, 1, 0, 0, 0, 503, 504, 5, 63, 0, 0, 504, 505, 5, 58, 0, 0, 505, 509, 5, 77,
    0, 0, 506, 508, 3, 22, 11, 0, 507, 506, 1, 0, 0, 0, 508, 511, 1, 0, 0, 0, 509, 507, 1, 0, 0, 0,
    509, 510, 1, 0, 0, 0, 510, 512, 1, 0, 0, 0, 511, 509, 1, 0, 0, 0, 512, 513, 5, 59, 0, 0, 513,
    514, 5, 56, 0, 0, 514, 515, 5, 77, 0, 0, 515, 57, 1, 0, 0, 0, 516, 517, 5, 36, 0, 0, 517, 518,
    3, 86, 43, 0, 518, 519, 3, 68, 34, 0, 519, 520, 5, 40, 0, 0, 520, 521, 5, 56, 0, 0, 521, 522, 5,
    77, 0, 0, 522, 59, 1, 0, 0, 0, 523, 524, 5, 36, 0, 0, 524, 525, 3, 86, 43, 0, 525, 526, 3, 72,
    36, 0, 526, 528, 5, 62, 0, 0, 527, 529, 3, 84, 42, 0, 528, 527, 1, 0, 0, 0, 528, 529, 1, 0, 0,
    0, 529, 530, 1, 0, 0, 0, 530, 531, 5, 63, 0, 0, 531, 532, 5, 58, 0, 0, 532, 533, 5, 56, 0, 0,
    533, 538, 5, 77, 0, 0, 534, 537, 3, 34, 17, 0, 535, 537, 3, 22, 11, 0, 536, 534, 1, 0, 0, 0,
    536, 535, 1, 0, 0, 0, 537, 540, 1, 0, 0, 0, 538, 536, 1, 0, 0, 0, 538, 539, 1, 0, 0, 0, 539,
    541, 1, 0, 0, 0, 540, 538, 1, 0, 0, 0, 541, 542, 3, 48, 24, 0, 542, 543, 5, 59, 0, 0, 543, 544,
    5, 56, 0, 0, 544, 545, 5, 77, 0, 0, 545, 61, 1, 0, 0, 0, 546, 547, 5, 36, 0, 0, 547, 548, 5, 22,
    0, 0, 548, 549, 3, 72, 36, 0, 549, 551, 5, 62, 0, 0, 550, 552, 3, 84, 42, 0, 551, 550, 1, 0, 0,
    0, 551, 552, 1, 0, 0, 0, 552, 553, 1, 0, 0, 0, 553, 554, 5, 63, 0, 0, 554, 555, 5, 58, 0, 0,
    555, 556, 5, 56, 0, 0, 556, 560, 5, 77, 0, 0, 557, 559, 3, 22, 11, 0, 558, 557, 1, 0, 0, 0, 559,
    562, 1, 0, 0, 0, 560, 558, 1, 0, 0, 0, 560, 561, 1, 0, 0, 0, 561, 563, 1, 0, 0, 0, 562, 560, 1,
    0, 0, 0, 563, 564, 5, 59, 0, 0, 564, 565, 5, 56, 0, 0, 565, 566, 5, 77, 0, 0, 566, 63, 1, 0, 0,
    0, 567, 568, 5, 27, 0, 0, 568, 569, 3, 86, 43, 0, 569, 570, 3, 72, 36, 0, 570, 572, 5, 62, 0, 0,
    571, 573, 3, 84, 42, 0, 572, 571, 1, 0, 0, 0, 572, 573, 1, 0, 0, 0, 573, 574, 1, 0, 0, 0, 574,
    575, 5, 63, 0, 0, 575, 576, 5, 32, 0, 0, 576, 577, 5, 56, 0, 0, 577, 578, 5, 77, 0, 0, 578, 65,
    1, 0, 0, 0, 579, 580, 5, 27, 0, 0, 580, 581, 5, 22, 0, 0, 581, 582, 3, 72, 36, 0, 582, 584, 5,
    62, 0, 0, 583, 585, 3, 84, 42, 0, 584, 583, 1, 0, 0, 0, 584, 585, 1, 0, 0, 0, 585, 586, 1, 0, 0,
    0, 586, 587, 5, 63, 0, 0, 587, 588, 5, 32, 0, 0, 588, 589, 5, 56, 0, 0, 589, 590, 5, 77, 0, 0,
    590, 67, 1, 0, 0, 0, 591, 592, 5, 79, 0, 0, 592, 69, 1, 0, 0, 0, 593, 596, 3, 106, 53, 0, 594,
    596, 3, 108, 54, 0, 595, 593, 1, 0, 0, 0, 595, 594, 1, 0, 0, 0, 596, 71, 1, 0, 0, 0, 597, 598,
    5, 79, 0, 0, 598, 73, 1, 0, 0, 0, 599, 600, 5, 78, 0, 0, 600, 75, 1, 0, 0, 0, 601, 602, 7, 0, 0,
    0, 602, 77, 1, 0, 0, 0, 603, 606, 3, 92, 46, 0, 604, 606, 3, 68, 34, 0, 605, 603, 1, 0, 0, 0,
    605, 604, 1, 0, 0, 0, 606, 79, 1, 0, 0, 0, 607, 612, 3, 82, 41, 0, 608, 609, 5, 65, 0, 0, 609,
    611, 3, 82, 41, 0, 610, 608, 1, 0, 0, 0, 611, 614, 1, 0, 0, 0, 612, 610, 1, 0, 0, 0, 612, 613,
    1, 0, 0, 0, 613, 81, 1, 0, 0, 0, 614, 612, 1, 0, 0, 0, 615, 618, 3, 138, 69, 0, 616, 618, 3,
    110, 55, 0, 617, 615, 1, 0, 0, 0, 617, 616, 1, 0, 0, 0, 618, 83, 1, 0, 0, 0, 619, 624, 3, 132,
    66, 0, 620, 621, 5, 65, 0, 0, 621, 623, 3, 132, 66, 0, 622, 620, 1, 0, 0, 0, 623, 626, 1, 0, 0,
    0, 624, 622, 1, 0, 0, 0, 624, 625, 1, 0, 0, 0, 625, 85, 1, 0, 0, 0, 626, 624, 1, 0, 0, 0, 627,
    631, 3, 136, 68, 0, 628, 631, 3, 76, 38, 0, 629, 631, 3, 134, 67, 0, 630, 627, 1, 0, 0, 0, 630,
    628, 1, 0, 0, 0, 630, 629, 1, 0, 0, 0, 631, 87, 1, 0, 0, 0, 632, 637, 3, 68, 34, 0, 633, 634, 5,
    65, 0, 0, 634, 636, 3, 68, 34, 0, 635, 633, 1, 0, 0, 0, 636, 639, 1, 0, 0, 0, 637, 635, 1, 0, 0,
    0, 637, 638, 1, 0, 0, 0, 638, 89, 1, 0, 0, 0, 639, 637, 1, 0, 0, 0, 640, 641, 3, 110, 55, 0,
    641, 91, 1, 0, 0, 0, 642, 648, 3, 94, 47, 0, 643, 648, 3, 96, 48, 0, 644, 648, 3, 98, 49, 0,
    645, 648, 3, 102, 51, 0, 646, 648, 3, 100, 50, 0, 647, 642, 1, 0, 0, 0, 647, 643, 1, 0, 0, 0,
    647, 644, 1, 0, 0, 0, 647, 645, 1, 0, 0, 0, 647, 646, 1, 0, 0, 0, 648, 93, 1, 0, 0, 0, 649, 650,
    7, 1, 0, 0, 650, 95, 1, 0, 0, 0, 651, 652, 7, 2, 0, 0, 652, 97, 1, 0, 0, 0, 653, 654, 5, 84, 0,
    0, 654, 99, 1, 0, 0, 0, 655, 656, 3, 76, 38, 0, 656, 657, 5, 64, 0, 0, 657, 658, 3, 68, 34, 0,
    658, 101, 1, 0, 0, 0, 659, 661, 5, 19, 0, 0, 660, 659, 1, 0, 0, 0, 660, 661, 1, 0, 0, 0, 661,
    662, 1, 0, 0, 0, 662, 663, 5, 85, 0, 0, 663, 103, 1, 0, 0, 0, 664, 665, 5, 60, 0, 0, 665, 666,
    3, 110, 55, 0, 666, 667, 5, 61, 0, 0, 667, 105, 1, 0, 0, 0, 668, 672, 3, 68, 34, 0, 669, 671, 3,
    104, 52, 0, 670, 669, 1, 0, 0, 0, 671, 674, 1, 0, 0, 0, 672, 670, 1, 0, 0, 0, 672, 673, 1, 0, 0,
    0, 673, 107, 1, 0, 0, 0, 674, 672, 1, 0, 0, 0, 675, 676, 5, 20, 0, 0, 676, 677, 5, 64, 0, 0,
    677, 678, 3, 106, 53, 0, 678, 109, 1, 0, 0, 0, 679, 680, 6, 55, -1, 0, 680, 693, 3, 130, 65, 0,
    681, 693, 3, 120, 60, 0, 682, 693, 3, 112, 56, 0, 683, 684, 5, 55, 0, 0, 684, 685, 5, 62, 0, 0,
    685, 686, 3, 110, 55, 0, 686, 687, 5, 65, 0, 0, 687, 688, 3, 110, 55, 0, 688, 689, 5, 65, 0, 0,
    689, 690, 3, 110, 55, 0, 690, 691, 5, 63, 0, 0, 691, 693, 1, 0, 0, 0, 692, 679, 1, 0, 0, 0, 692,
    681, 1, 0, 0, 0, 692, 682, 1, 0, 0, 0, 692, 683, 1, 0, 0, 0, 693, 700, 1, 0, 0, 0, 694, 695, 10,
    2, 0, 0, 695, 696, 3, 128, 64, 0, 696, 697, 3, 110, 55, 3, 697, 699, 1, 0, 0, 0, 698, 694, 1, 0,
    0, 0, 699, 702, 1, 0, 0, 0, 700, 698, 1, 0, 0, 0, 700, 701, 1, 0, 0, 0, 701, 111, 1, 0, 0, 0,
    702, 700, 1, 0, 0, 0, 703, 708, 3, 114, 57, 0, 704, 705, 5, 64, 0, 0, 705, 707, 3, 116, 58, 0,
    706, 704, 1, 0, 0, 0, 707, 710, 1, 0, 0, 0, 708, 706, 1, 0, 0, 0, 708, 709, 1, 0, 0, 0, 709,
    113, 1, 0, 0, 0, 710, 708, 1, 0, 0, 0, 711, 718, 5, 20, 0, 0, 712, 718, 3, 118, 59, 0, 713, 718,
    3, 124, 62, 0, 714, 718, 3, 92, 46, 0, 715, 718, 3, 140, 70, 0, 716, 718, 3, 116, 58, 0, 717,
    711, 1, 0, 0, 0, 717, 712, 1, 0, 0, 0, 717, 713, 1, 0, 0, 0, 717, 714, 1, 0, 0, 0, 717, 715, 1,
    0, 0, 0, 717, 716, 1, 0, 0, 0, 718, 115, 1, 0, 0, 0, 719, 722, 3, 68, 34, 0, 720, 722, 3, 126,
    63, 0, 721, 719, 1, 0, 0, 0, 721, 720, 1, 0, 0, 0, 722, 726, 1, 0, 0, 0, 723, 725, 3, 104, 52,
    0, 724, 723, 1, 0, 0, 0, 725, 728, 1, 0, 0, 0, 726, 724, 1, 0, 0, 0, 726, 727, 1, 0, 0, 0, 727,
    117, 1, 0, 0, 0, 728, 726, 1, 0, 0, 0, 729, 730, 5, 62, 0, 0, 730, 731, 3, 110, 55, 0, 731, 732,
    5, 63, 0, 0, 732, 119, 1, 0, 0, 0, 733, 734, 7, 3, 0, 0, 734, 735, 3, 112, 56, 0, 735, 121, 1,
    0, 0, 0, 736, 737, 3, 112, 56, 0, 737, 738, 3, 128, 64, 0, 738, 739, 3, 110, 55, 0, 739, 123, 1,
    0, 0, 0, 740, 741, 5, 62, 0, 0, 741, 742, 3, 110, 55, 0, 742, 743, 5, 65, 0, 0, 743, 748, 3,
    110, 55, 0, 744, 745, 5, 65, 0, 0, 745, 747, 3, 110, 55, 0, 746, 744, 1, 0, 0, 0, 747, 750, 1,
    0, 0, 0, 748, 746, 1, 0, 0, 0, 748, 749, 1, 0, 0, 0, 749, 751, 1, 0, 0, 0, 750, 748, 1, 0, 0, 0,
    751, 752, 5, 63, 0, 0, 752, 125, 1, 0, 0, 0, 753, 754, 3, 72, 36, 0, 754, 756, 5, 62, 0, 0, 755,
    757, 3, 80, 40, 0, 756, 755, 1, 0, 0, 0, 756, 757, 1, 0, 0, 0, 757, 758, 1, 0, 0, 0, 758, 759,
    5, 63, 0, 0, 759, 127, 1, 0, 0, 0, 760, 761, 7, 4, 0, 0, 761, 129, 1, 0, 0, 0, 762, 763, 5, 34,
    0, 0, 763, 764, 3, 86, 43, 0, 764, 766, 5, 62, 0, 0, 765, 767, 3, 80, 40, 0, 766, 765, 1, 0, 0,
    0, 766, 767, 1, 0, 0, 0, 767, 768, 1, 0, 0, 0, 768, 769, 5, 63, 0, 0, 769, 131, 1, 0, 0, 0, 770,
    771, 3, 86, 43, 0, 771, 772, 3, 68, 34, 0, 772, 133, 1, 0, 0, 0, 773, 774, 3, 76, 38, 0, 774,
    775, 5, 71, 0, 0, 775, 780, 3, 86, 43, 0, 776, 777, 5, 65, 0, 0, 777, 779, 3, 86, 43, 0, 778,
    776, 1, 0, 0, 0, 779, 782, 1, 0, 0, 0, 780, 778, 1, 0, 0, 0, 780, 781, 1, 0, 0, 0, 781, 783, 1,
    0, 0, 0, 782, 780, 1, 0, 0, 0, 783, 784, 5, 72, 0, 0, 784, 135, 1, 0, 0, 0, 785, 786, 5, 54, 0,
    0, 786, 787, 5, 60, 0, 0, 787, 790, 3, 86, 43, 0, 788, 789, 5, 65, 0, 0, 789, 791, 3, 86, 43, 0,
    790, 788, 1, 0, 0, 0, 791, 792, 1, 0, 0, 0, 792, 790, 1, 0, 0, 0, 792, 793, 1, 0, 0, 0, 793,
    794, 1, 0, 0, 0, 794, 795, 5, 61, 0, 0, 795, 137, 1, 0, 0, 0, 796, 797, 5, 47, 0, 0, 797, 798,
    3, 80, 40, 0, 798, 799, 5, 66, 0, 0, 799, 800, 3, 110, 55, 0, 800, 139, 1, 0, 0, 0, 801, 802, 5,
    58, 0, 0, 802, 807, 3, 110, 55, 0, 803, 804, 5, 65, 0, 0, 804, 806, 3, 110, 55, 0, 805, 803, 1,
    0, 0, 0, 806, 809, 1, 0, 0, 0, 807, 805, 1, 0, 0, 0, 807, 808, 1, 0, 0, 0, 808, 810, 1, 0, 0, 0,
    809, 807, 1, 0, 0, 0, 810, 811, 5, 59, 0, 0, 811, 141, 1, 0, 0, 0, 812, 813, 5, 19, 0, 0, 813,
    814, 5, 85, 0, 0, 814, 143, 1, 0, 0, 0, 815, 816, 3, 112, 56, 0, 816, 817, 5, 53, 0, 0, 817,
    818, 3, 112, 56, 0, 818, 145, 1, 0, 0, 0, 57, 147, 152, 158, 172, 184, 196, 204, 206, 226, 228,
    240, 249, 274, 283, 285, 297, 307, 309, 330, 341, 343, 359, 378, 391, 398, 427, 501, 509, 528,
    536, 538, 551, 560, 572, 584, 595, 605, 612, 617, 624, 630, 637, 647, 660, 672, 692, 700, 708,
    717, 721, 726, 748, 756, 766, 780, 792, 807,
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
  public commentLine(): CommentLineContext | null {
    return this.getRuleContext(0, CommentLineContext);
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
  public commentLine(): CommentLineContext[];
  public commentLine(i: number): CommentLineContext | null;
  public commentLine(i?: number): CommentLineContext[] | CommentLineContext | null {
    if (i === undefined) {
      return this.getRuleContexts(CommentLineContext);
    }

    return this.getRuleContext(i, CommentLineContext);
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
  public identifier(): IdentifierContext {
    return this.getRuleContext(0, IdentifierContext)!;
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
  public enumValuesList(): EnumValuesListContext {
    return this.getRuleContext(0, EnumValuesListContext)!;
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
  public commentLine(): CommentLineContext[];
  public commentLine(i: number): CommentLineContext | null;
  public commentLine(i?: number): CommentLineContext[] | CommentLineContext | null {
    if (i === undefined) {
      return this.getRuleContexts(CommentLineContext);
    }

    return this.getRuleContext(i, CommentLineContext);
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
  public commentLine(): CommentLineContext[];
  public commentLine(i: number): CommentLineContext | null;
  public commentLine(i?: number): CommentLineContext[] | CommentLineContext | null {
    if (i === undefined) {
      return this.getRuleContexts(CommentLineContext);
    }

    return this.getRuleContext(i, CommentLineContext);
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

export class CommentLineContext extends antlr.ParserRuleContext {
  public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
    super(parent, invokingState);
  }
  public COMMENT(): antlr.TerminalNode {
    return this.getToken(CsharpParser.COMMENT, 0)!;
  }
  public NL(): antlr.TerminalNode {
    return this.getToken(CsharpParser.NL, 0)!;
  }
  public override get ruleIndex(): number {
    return CsharpParser.RULE_commentLine;
  }
  public override enterRule(listener: CsharpListener): void {
    if (listener.enterCommentLine) {
      listener.enterCommentLine(this);
    }
  }
  public override exitRule(listener: CsharpListener): void {
    if (listener.exitCommentLine) {
      listener.exitCommentLine(this);
    }
  }
  public override accept<Result>(visitor: CsharpVisitor<Result>): Result | null {
    if (visitor.visitCommentLine) {
      return visitor.visitCommentLine(this);
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
  public commentLine(): CommentLineContext | null {
    return this.getRuleContext(0, CommentLineContext);
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
  public identifier(): IdentifierContext {
    return this.getRuleContext(0, IdentifierContext)!;
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

export class LetStatementContext extends antlr.ParserRuleContext {
  public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
    super(parent, invokingState);
  }
  public VAR(): antlr.TerminalNode {
    return this.getToken(CsharpParser.VAR, 0)!;
  }
  public identifier(): IdentifierContext {
    return this.getRuleContext(0, IdentifierContext)!;
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
    return CsharpParser.RULE_letStatement;
  }
  public override enterRule(listener: CsharpListener): void {
    if (listener.enterLetStatement) {
      listener.enterLetStatement(this);
    }
  }
  public override exitRule(listener: CsharpListener): void {
    if (listener.exitLetStatement) {
      listener.exitLetStatement(this);
    }
  }
  public override accept<Result>(visitor: CsharpVisitor<Result>): Result | null {
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
  public identifier(): IdentifierContext {
    return this.getRuleContext(0, IdentifierContext)!;
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
  public identifier(): IdentifierContext {
    return this.getRuleContext(0, IdentifierContext)!;
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

export class ProcedureCallContext extends antlr.ParserRuleContext {
  public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
    super(parent, invokingState);
  }
  public term(): TermContext {
    return this.getRuleContext(0, TermContext)!;
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
  public identifier(): IdentifierContext {
    return this.getRuleContext(0, IdentifierContext)!;
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
  public identifier(): IdentifierContext {
    return this.getRuleContext(0, IdentifierContext)!;
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
  public paramsList(): ParamsListContext | null {
    return this.getRuleContext(0, ParamsListContext);
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
  public paramsList(): ParamsListContext | null {
    return this.getRuleContext(0, ParamsListContext);
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

export class IdentifierContext extends antlr.ParserRuleContext {
  public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
    super(parent, invokingState);
  }
  public NAME_STARTING_LC(): antlr.TerminalNode {
    return this.getToken(CsharpParser.NAME_STARTING_LC, 0)!;
  }
  public override get ruleIndex(): number {
    return CsharpParser.RULE_identifier;
  }
  public override enterRule(listener: CsharpListener): void {
    if (listener.enterIdentifier) {
      listener.enterIdentifier(this);
    }
  }
  public override exitRule(listener: CsharpListener): void {
    if (listener.exitIdentifier) {
      listener.exitIdentifier(this);
    }
  }
  public override accept<Result>(visitor: CsharpVisitor<Result>): Result | null {
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
  public litValue(): LitValueContext | null {
    return this.getRuleContext(0, LitValueContext);
  }
  public identifier(): IdentifierContext | null {
    return this.getRuleContext(0, IdentifierContext);
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
      return this.getTokens(CsharpParser.COMMA);
    } else {
      return this.getToken(CsharpParser.COMMA, i);
    }
  }
  public override get ruleIndex(): number {
    return CsharpParser.RULE_paramsList;
  }
  public override enterRule(listener: CsharpListener): void {
    if (listener.enterParamsList) {
      listener.enterParamsList(this);
    }
  }
  public override exitRule(listener: CsharpListener): void {
    if (listener.exitParamsList) {
      listener.exitParamsList(this);
    }
  }
  public override accept<Result>(visitor: CsharpVisitor<Result>): Result | null {
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
      return this.getTokens(CsharpParser.COMMA);
    } else {
      return this.getToken(CsharpParser.COMMA, i);
    }
  }
  public override get ruleIndex(): number {
    return CsharpParser.RULE_enumValuesList;
  }
  public override enterRule(listener: CsharpListener): void {
    if (listener.enterEnumValuesList) {
      listener.enterEnumValuesList(this);
    }
  }
  public override exitRule(listener: CsharpListener): void {
    if (listener.exitEnumValuesList) {
      listener.exitEnumValuesList(this);
    }
  }
  public override accept<Result>(visitor: CsharpVisitor<Result>): Result | null {
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
  public identifier(): IdentifierContext {
    return this.getRuleContext(0, IdentifierContext)!;
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

export class PropertyRefContext extends antlr.ParserRuleContext {
  public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
    super(parent, invokingState);
  }
  public THIS_INSTANCE(): antlr.TerminalNode {
    return this.getToken(CsharpParser.THIS_INSTANCE, 0)!;
  }
  public DOT(): antlr.TerminalNode {
    return this.getToken(CsharpParser.DOT, 0)!;
  }
  public identifierWithOptIndexes(): IdentifierWithOptIndexesContext {
    return this.getRuleContext(0, IdentifierWithOptIndexesContext)!;
  }
  public override get ruleIndex(): number {
    return CsharpParser.RULE_propertyRef;
  }
  public override enterRule(listener: CsharpListener): void {
    if (listener.enterPropertyRef) {
      listener.enterPropertyRef(this);
    }
  }
  public override exitRule(listener: CsharpListener): void {
    if (listener.exitPropertyRef) {
      listener.exitPropertyRef(this);
    }
  }
  public override accept<Result>(visitor: CsharpVisitor<Result>): Result | null {
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
  public binaryOperator(): BinaryOperatorContext | null {
    return this.getRuleContext(0, BinaryOperatorContext);
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
  public chainHead(): ChainHeadContext {
    return this.getRuleContext(0, ChainHeadContext)!;
  }
  public DOT(): antlr.TerminalNode[];
  public DOT(i: number): antlr.TerminalNode | null;
  public DOT(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    if (i === undefined) {
      return this.getTokens(CsharpParser.DOT);
    } else {
      return this.getToken(CsharpParser.DOT, i);
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

export class ChainHeadContext extends antlr.ParserRuleContext {
  public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
    super(parent, invokingState);
  }
  public THIS_INSTANCE(): antlr.TerminalNode | null {
    return this.getToken(CsharpParser.THIS_INSTANCE, 0);
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
    return CsharpParser.RULE_chainHead;
  }
  public override enterRule(listener: CsharpListener): void {
    if (listener.enterChainHead) {
      listener.enterChainHead(this);
    }
  }
  public override exitRule(listener: CsharpListener): void {
    if (listener.exitChainHead) {
      listener.exitChainHead(this);
    }
  }
  public override accept<Result>(visitor: CsharpVisitor<Result>): Result | null {
    if (visitor.visitChainHead) {
      return visitor.visitChainHead(this);
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
  public term(): TermContext {
    return this.getRuleContext(0, TermContext)!;
  }
  public MINUS(): antlr.TerminalNode | null {
    return this.getToken(CsharpParser.MINUS, 0);
  }
  public NOT(): antlr.TerminalNode | null {
    return this.getToken(CsharpParser.NOT, 0);
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
  public identifier(): IdentifierContext {
    return this.getRuleContext(0, IdentifierContext)!;
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

export class InterpolatedStringContext extends antlr.ParserRuleContext {
  public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
    super(parent, invokingState);
  }
  public INTERPOLATED_STRING_PREFIX(): antlr.TerminalNode {
    return this.getToken(CsharpParser.INTERPOLATED_STRING_PREFIX, 0)!;
  }
  public LITERAL_STRING(): antlr.TerminalNode {
    return this.getToken(CsharpParser.LITERAL_STRING, 0)!;
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
