// Generated from src/grammars/ref-lang/RefLang.g4 by ANTLR 4.13.1

import * as antlr from "antlr4ng";
import { Token } from "antlr4ng";

import { RefLangListener } from "./RefLangListener.js";
import { RefLangVisitor } from "./RefLangVisitor.js";

// for running tests with parameters, TODO: discuss strategy for typed parameters in CI
// eslint-disable-next-line no-unused-vars
type int = number;

export class RefLangParser extends antlr.Parser {
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
  public static readonly ABSTRACT = 21;
  public static readonly AS = 22;
  public static readonly ASSERT = 23;
  public static readonly ASSIGN = 24;
  public static readonly BE = 25;
  public static readonly CALL = 26;
  public static readonly CATCH = 27;
  public static readonly CLASS = 28;
  public static readonly CONSTANT = 29;
  public static readonly CONSTRUCTOR = 30;
  public static readonly COPY = 31;
  public static readonly DIV = 32;
  public static readonly ELIF = 33;
  public static readonly ELSE = 34;
  public static readonly END = 35;
  public static readonly ENUM = 36;
  public static readonly EVALUATES = 37;
  public static readonly FOR = 38;
  public static readonly FROM = 39;
  public static readonly FUNCTION = 40;
  public static readonly IF = 41;
  public static readonly IN = 42;
  public static readonly INHERITS = 43;
  public static readonly INPUT = 44;
  public static readonly LAMBDA = 45;
  public static readonly LET = 46;
  public static readonly MAIN = 47;
  public static readonly NEW = 48;
  public static readonly OF = 49;
  public static readonly PRINT = 50;
  public static readonly PRIVATE = 51;
  public static readonly PROCEDURE = 52;
  public static readonly PROPERTY = 53;
  public static readonly RETURN = 54;
  public static readonly RETURNS = 55;
  public static readonly SET = 56;
  public static readonly STEP = 57;
  public static readonly TEST = 58;
  public static readonly THEN = 59;
  public static readonly THROW = 60;
  public static readonly TO = 61;
  public static readonly TRY = 62;
  public static readonly VARIABLE = 63;
  public static readonly WHILE = 64;
  public static readonly POWER = 65;
  public static readonly IF_ = 66;
  public static readonly COMMENT = 67;
  public static readonly SINGLE_EQUALS = 68;
  public static readonly OPEN_BRACE = 69;
  public static readonly CLOSE_BRACE = 70;
  public static readonly OPEN_SQ_BRACKET = 71;
  public static readonly CLOSE_SQ_BRACKET = 72;
  public static readonly OPEN_BRACKET = 73;
  public static readonly CLOSE_BRACKET = 74;
  public static readonly DOT = 75;
  public static readonly COMMA = 76;
  public static readonly COLON = 77;
  public static readonly PLUS = 78;
  public static readonly MINUS = 79;
  public static readonly MULT = 80;
  public static readonly DIVIDE = 81;
  public static readonly LT = 82;
  public static readonly GT = 83;
  public static readonly LE = 84;
  public static readonly GE = 85;
  public static readonly DOUBLE_QUOTES = 86;
  public static readonly WS = 87;
  public static readonly NL = 88;
  public static readonly NAME_STARTING_TEST_ = 89;
  public static readonly NAME_STARTING_LC = 90;
  public static readonly NAME_STARTING_UC = 91;
  public static readonly LITERAL_BINARY = 92;
  public static readonly LITERAL_HEX = 93;
  public static readonly LITERAL_INTEGER = 94;
  public static readonly LITERAL_FLOAT = 95;
  public static readonly LITERAL_STRING = 96;
  public static readonly WHITESPACES = 97;
  public static readonly TEXT = 98;
  public static readonly GHOSTED = 99;
  public static readonly FUNCTION_ANNOTATION = 100;
  public static readonly PROCECDURE_ANNOTATION = 101;
  public static readonly CONSTANT_ANNOTATION = 102;
  public static readonly ENUM_ANNOTATION = 103;
  public static readonly CONCRETE_CLASS_ANNOTATION = 104;
  public static readonly ABSTRACT_CLASS_ANNOTATION = 105;
  public static readonly VARIABLE_ANNOTATION = 106;
  public static readonly ASSIGNMENT_ANNOTATION = 107;
  public static readonly INPUT_ANNOTATION = 108;
  public static readonly CALL_ANNOTATION = 109;
  public static readonly LET_ANNOTATION = 110;
  public static readonly ELSE_IF_ANNOTATION = 111;
  public static readonly PROPERTY_ANNOTATION = 112;
  public static readonly FUNCTION_METHOD_ANNOTATION = 113;
  public static readonly PROCEDURE_METHOD_ANNOTATION = 114;
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
  public static readonly RULE_commentGlobal = 10;
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
  public static readonly RULE_commentStatement = 28;
  public static readonly RULE_constructorMember = 29;
  public static readonly RULE_property = 30;
  public static readonly RULE_functionMethod = 31;
  public static readonly RULE_procedureMethod = 32;
  public static readonly RULE_abstractFunction = 33;
  public static readonly RULE_abstractProcedure = 34;
  public static readonly RULE_commentMember = 35;
  public static readonly RULE_identifier = 36;
  public static readonly RULE_assignable = 37;
  public static readonly RULE_methodName = 38;
  public static readonly RULE_testName = 39;
  public static readonly RULE_typeName = 40;
  public static readonly RULE_constantValue = 41;
  public static readonly RULE_argList = 42;
  public static readonly RULE_argument = 43;
  public static readonly RULE_paramsList = 44;
  public static readonly RULE_type = 45;
  public static readonly RULE_enumValuesList = 46;
  public static readonly RULE_assertActual = 47;
  public static readonly RULE_litValue = 48;
  public static readonly RULE_litBoolean = 49;
  public static readonly RULE_litInt = 50;
  public static readonly RULE_litFloat = 51;
  public static readonly RULE_enumValue = 52;
  public static readonly RULE_litString = 53;
  public static readonly RULE_index = 54;
  public static readonly RULE_identifierWithOptIndexes = 55;
  public static readonly RULE_propertyRef = 56;
  public static readonly RULE_expression = 57;
  public static readonly RULE_term = 58;
  public static readonly RULE_chainHead = 59;
  public static readonly RULE_chainable = 60;
  public static readonly RULE_bracketedExpression = 61;
  public static readonly RULE_unaryExpression = 62;
  public static readonly RULE_binaryExpression = 63;
  public static readonly RULE_tuple = 64;
  public static readonly RULE_methodCall = 65;
  public static readonly RULE_binaryOperator = 66;
  public static readonly RULE_newInstance = 67;
  public static readonly RULE_paramDef = 68;
  public static readonly RULE_typeGeneric = 69;
  public static readonly RULE_typeFunc = 70;
  public static readonly RULE_typeTuple = 71;
  public static readonly RULE_lambda = 72;
  public static readonly RULE_list = 73;
  public static readonly RULE_interpolatedString = 74;
  public static readonly RULE_power = 75;

  public static readonly literalNames = [
    null,
    "'#'",
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
    "'0b'",
    "'0x'",
    "'$'",
    "'this'",
    "'abstract'",
    "'as'",
    "'assert'",
    "'assign'",
    "'be'",
    "'call'",
    "'catch'",
    "'class'",
    "'constant'",
    "'constructor'",
    "'copy'",
    "'div'",
    "'elif'",
    "'else'",
    "'end'",
    "'enum'",
    "'evaluates'",
    "'for'",
    "'from'",
    "'function'",
    "'if'",
    "'in'",
    "'inherits'",
    "'input'",
    "'lambda'",
    "'let'",
    "'main'",
    "'new'",
    "'of'",
    "'print'",
    "'private'",
    "'procedure'",
    "'property'",
    "'return'",
    "'returns'",
    "'set'",
    "'step'",
    "'test'",
    "'then'",
    "'throw'",
    "'to'",
    "'try'",
    "'variable'",
    "'while'",
    "'^'",
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
    "ABSTRACT",
    "AS",
    "ASSERT",
    "ASSIGN",
    "BE",
    "CALL",
    "CATCH",
    "CLASS",
    "CONSTANT",
    "CONSTRUCTOR",
    "COPY",
    "DIV",
    "ELIF",
    "ELSE",
    "END",
    "ENUM",
    "EVALUATES",
    "FOR",
    "FROM",
    "FUNCTION",
    "IF",
    "IN",
    "INHERITS",
    "INPUT",
    "LAMBDA",
    "LET",
    "MAIN",
    "NEW",
    "OF",
    "PRINT",
    "PRIVATE",
    "PROCEDURE",
    "PROPERTY",
    "RETURN",
    "RETURNS",
    "SET",
    "STEP",
    "TEST",
    "THEN",
    "THROW",
    "TO",
    "TRY",
    "VARIABLE",
    "WHILE",
    "POWER",
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
    "commentGlobal",
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
    "commentStatement",
    "constructorMember",
    "property",
    "functionMethod",
    "procedureMethod",
    "abstractFunction",
    "abstractProcedure",
    "commentMember",
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
        this.state = 153;
        this.errorHandler.sync(this);
        switch (this.interpreter.adaptivePredict(this.tokenStream, 0, this.context)) {
          case 1:
            {
              this.state = 152;
              this.match(RefLangParser.COMMENT);
            }
            break;
        }
        this.state = 158;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (
          ((_la & ~0x1f) === 0 && ((1 << _la) & 807403520) !== 0) ||
          (((_la - 36) & ~0x1f) === 0 && ((1 << (_la - 36)) & 2151745553) !== 0) ||
          _la === 99
        ) {
          {
            {
              this.state = 155;
              this.global();
            }
          }
          this.state = 160;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 164;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (_la === 88) {
          {
            {
              this.state = 161;
              this.match(RefLangParser.NL);
            }
          }
          this.state = 166;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 167;
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
      this.state = 178;
      this.errorHandler.sync(this);
      switch (this.interpreter.adaptivePredict(this.tokenStream, 3, this.context)) {
        case 1:
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 169;
            this.main();
          }
          break;
        case 2:
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 170;
            this.function_();
          }
          break;
        case 3:
          this.enterOuterAlt(localContext, 3);
          {
            this.state = 171;
            this.test();
          }
          break;
        case 4:
          this.enterOuterAlt(localContext, 4);
          {
            this.state = 172;
            this.procedure();
          }
          break;
        case 5:
          this.enterOuterAlt(localContext, 5);
          {
            this.state = 173;
            this.constant();
          }
          break;
        case 6:
          this.enterOuterAlt(localContext, 6);
          {
            this.state = 174;
            this.enum_();
          }
          break;
        case 7:
          this.enterOuterAlt(localContext, 7);
          {
            this.state = 175;
            this.concreteClass();
          }
          break;
        case 8:
          this.enterOuterAlt(localContext, 8);
          {
            this.state = 176;
            this.abstractClass();
          }
          break;
        case 9:
          this.enterOuterAlt(localContext, 9);
          {
            this.state = 177;
            this.commentGlobal();
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
        this.state = 181;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 99) {
          {
            this.state = 180;
            this.match(RefLangParser.GHOSTED);
          }
        }

        this.state = 183;
        this.match(RefLangParser.MAIN);
        this.state = 184;
        this.match(RefLangParser.NL);
        this.state = 188;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (
          _la === 24 ||
          _la === 26 ||
          (((_la - 38) & ~0x1f) === 0 && ((1 << (_la - 38)) & 658509897) !== 0) ||
          _la === 99
        ) {
          {
            {
              this.state = 185;
              this.ordinaryStatement();
            }
          }
          this.state = 190;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 191;
        this.match(RefLangParser.END);
        this.state = 192;
        this.match(RefLangParser.MAIN);
        this.state = 193;
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
        this.state = 196;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 99) {
          {
            this.state = 195;
            this.match(RefLangParser.GHOSTED);
          }
        }

        this.state = 198;
        this.match(RefLangParser.FUNCTION);
        this.state = 199;
        this.methodName();
        this.state = 200;
        this.match(RefLangParser.OPEN_BRACKET);
        this.state = 202;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 90) {
          {
            this.state = 201;
            this.paramsList();
          }
        }

        this.state = 204;
        this.match(RefLangParser.CLOSE_BRACKET);
        this.state = 205;
        this.match(RefLangParser.RETURNS);
        this.state = 206;
        this.type_();
        this.state = 207;
        this.match(RefLangParser.NL);
        this.state = 212;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (
          _la === 24 ||
          _la === 26 ||
          (((_la - 38) & ~0x1f) === 0 && ((1 << (_la - 38)) & 658510153) !== 0) ||
          _la === 99
        ) {
          {
            this.state = 210;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 8, this.context)) {
              case 1:
                {
                  this.state = 208;
                  this.letStatement();
                }
                break;
              case 2:
                {
                  this.state = 209;
                  this.ordinaryStatement();
                }
                break;
            }
          }
          this.state = 214;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 215;
        this.returnStatement();
        this.state = 216;
        this.match(RefLangParser.END);
        this.state = 217;
        this.match(RefLangParser.FUNCTION);
        this.state = 218;
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
        this.state = 221;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 99) {
          {
            this.state = 220;
            this.match(RefLangParser.GHOSTED);
          }
        }

        this.state = 223;
        this.match(RefLangParser.TEST);
        this.state = 224;
        this.testName();
        this.state = 225;
        this.match(RefLangParser.NL);
        this.state = 232;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (
          _la === 23 ||
          (((_la - 46) & ~0x1f) === 0 && ((1 << (_la - 46)) & 2228225) !== 0) ||
          _la === 99
        ) {
          {
            this.state = 230;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 11, this.context)) {
              case 1:
                {
                  this.state = 226;
                  this.assert();
                }
                break;
              case 2:
                {
                  this.state = 227;
                  this.letStatement();
                }
                break;
              case 3:
                {
                  this.state = 228;
                  this.variableDefinition();
                }
                break;
              case 4:
                {
                  this.state = 229;
                  this.commentStatement();
                }
                break;
            }
          }
          this.state = 234;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 235;
        this.match(RefLangParser.END);
        this.state = 236;
        this.match(RefLangParser.TEST);
        this.state = 237;
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
        this.state = 240;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 99) {
          {
            this.state = 239;
            this.match(RefLangParser.GHOSTED);
          }
        }

        this.state = 242;
        this.match(RefLangParser.PROCEDURE);
        this.state = 243;
        this.methodName();
        this.state = 244;
        this.match(RefLangParser.OPEN_BRACKET);
        this.state = 246;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 90) {
          {
            this.state = 245;
            this.paramsList();
          }
        }

        this.state = 248;
        this.match(RefLangParser.CLOSE_BRACKET);
        this.state = 249;
        this.match(RefLangParser.NL);
        this.state = 253;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (
          _la === 24 ||
          _la === 26 ||
          (((_la - 38) & ~0x1f) === 0 && ((1 << (_la - 38)) & 658509897) !== 0) ||
          _la === 99
        ) {
          {
            {
              this.state = 250;
              this.ordinaryStatement();
            }
          }
          this.state = 255;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 256;
        this.match(RefLangParser.END);
        this.state = 257;
        this.match(RefLangParser.PROCEDURE);
        this.state = 258;
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
        this.state = 261;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 99) {
          {
            this.state = 260;
            this.match(RefLangParser.GHOSTED);
          }
        }

        this.state = 263;
        this.match(RefLangParser.CONSTANT);
        this.state = 264;
        this.identifier();
        this.state = 265;
        this.match(RefLangParser.SET);
        this.state = 266;
        this.match(RefLangParser.TO);
        this.state = 267;
        this.constantValue();
        this.state = 268;
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
        this.state = 271;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 99) {
          {
            this.state = 270;
            this.match(RefLangParser.GHOSTED);
          }
        }

        this.state = 273;
        this.match(RefLangParser.ENUM);
        this.state = 274;
        this.typeName();
        this.state = 275;
        this.enumValuesList();
        this.state = 276;
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
        this.state = 279;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 99) {
          {
            this.state = 278;
            this.match(RefLangParser.GHOSTED);
          }
        }

        this.state = 281;
        this.match(RefLangParser.CLASS);
        this.state = 282;
        this.typeName();
        this.state = 285;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 43) {
          {
            this.state = 283;
            this.match(RefLangParser.INHERITS);
            this.state = 284;
            this.typeName();
          }
        }

        this.state = 287;
        this.match(RefLangParser.NL);
        this.state = 295;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (
          _la === 30 ||
          (((_la - 40) & ~0x1f) === 0 && ((1 << (_la - 40)) & 134232065) !== 0) ||
          _la === 88 ||
          _la === 99
        ) {
          {
            this.state = 293;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 20, this.context)) {
              case 1:
                {
                  this.state = 288;
                  this.constructorMember();
                }
                break;
              case 2:
                {
                  this.state = 289;
                  this.property();
                }
                break;
              case 3:
                {
                  this.state = 290;
                  this.functionMethod();
                }
                break;
              case 4:
                {
                  this.state = 291;
                  this.procedureMethod();
                }
                break;
              case 5:
                {
                  this.state = 292;
                  this.commentMember();
                }
                break;
            }
          }
          this.state = 297;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 298;
        this.match(RefLangParser.END);
        this.state = 299;
        this.match(RefLangParser.CLASS);
        this.state = 300;
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
        this.state = 303;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 99) {
          {
            this.state = 302;
            this.match(RefLangParser.GHOSTED);
          }
        }

        this.state = 305;
        this.match(RefLangParser.ABSTRACT);
        this.state = 306;
        this.match(RefLangParser.CLASS);
        this.state = 307;
        this.typeName();
        this.state = 310;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 43) {
          {
            this.state = 308;
            this.match(RefLangParser.INHERITS);
            this.state = 309;
            this.typeName();
          }
        }

        this.state = 312;
        this.match(RefLangParser.NL);
        this.state = 321;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (
          _la === 21 ||
          (((_la - 40) & ~0x1f) === 0 && ((1 << (_la - 40)) & 134232065) !== 0) ||
          _la === 88 ||
          _la === 99
        ) {
          {
            this.state = 319;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 24, this.context)) {
              case 1:
                {
                  this.state = 313;
                  this.property();
                }
                break;
              case 2:
                {
                  this.state = 314;
                  this.functionMethod();
                }
                break;
              case 3:
                {
                  this.state = 315;
                  this.procedureMethod();
                }
                break;
              case 4:
                {
                  this.state = 316;
                  this.abstractFunction();
                }
                break;
              case 5:
                {
                  this.state = 317;
                  this.abstractProcedure();
                }
                break;
              case 6:
                {
                  this.state = 318;
                  this.commentMember();
                }
                break;
            }
          }
          this.state = 323;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 324;
        this.match(RefLangParser.END);
        this.state = 325;
        this.match(RefLangParser.CLASS);
        this.state = 326;
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
  public commentGlobal(): CommentGlobalContext {
    let localContext = new CommentGlobalContext(this.context, this.state);
    this.enterRule(localContext, 20, RefLangParser.RULE_commentGlobal);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 328;
        this.match(RefLangParser.COMMENT);
        this.state = 329;
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
  public ordinaryStatement(): OrdinaryStatementContext {
    let localContext = new OrdinaryStatementContext(this.context, this.state);
    this.enterRule(localContext, 22, RefLangParser.RULE_ordinaryStatement);
    try {
      this.state = 342;
      this.errorHandler.sync(this);
      switch (this.interpreter.adaptivePredict(this.tokenStream, 26, this.context)) {
        case 1:
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 331;
            this.print();
          }
          break;
        case 2:
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 332;
            this.variableDefinition();
          }
          break;
        case 3:
          this.enterOuterAlt(localContext, 3);
          {
            this.state = 333;
            this.assignment();
          }
          break;
        case 4:
          this.enterOuterAlt(localContext, 4);
          {
            this.state = 334;
            this.inputStatement();
          }
          break;
        case 5:
          this.enterOuterAlt(localContext, 5);
          {
            this.state = 335;
            this.ifStatement();
          }
          break;
        case 6:
          this.enterOuterAlt(localContext, 6);
          {
            this.state = 336;
            this.whileLoop();
          }
          break;
        case 7:
          this.enterOuterAlt(localContext, 7);
          {
            this.state = 337;
            this.forLoop();
          }
          break;
        case 8:
          this.enterOuterAlt(localContext, 8);
          {
            this.state = 338;
            this.procedureCall();
          }
          break;
        case 9:
          this.enterOuterAlt(localContext, 9);
          {
            this.state = 339;
            this.tryStatement();
          }
          break;
        case 10:
          this.enterOuterAlt(localContext, 10);
          {
            this.state = 340;
            this.throwStatement();
          }
          break;
        case 11:
          this.enterOuterAlt(localContext, 11);
          {
            this.state = 341;
            this.commentStatement();
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
    this.enterRule(localContext, 24, RefLangParser.RULE_ifStatement);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 345;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 99) {
          {
            this.state = 344;
            this.match(RefLangParser.GHOSTED);
          }
        }

        this.state = 347;
        this.match(RefLangParser.IF);
        this.state = 348;
        this.expression(0);
        this.state = 349;
        this.match(RefLangParser.THEN);
        this.state = 350;
        this.match(RefLangParser.NL);
        this.state = 356;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (
          (((_la - 24) & ~0x1f) === 0 && ((1 << (_la - 24)) & 68306437) !== 0) ||
          (((_la - 60) & ~0x1f) === 0 && ((1 << (_la - 60)) & 157) !== 0) ||
          _la === 99
        ) {
          {
            this.state = 354;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 28, this.context)) {
              case 1:
                {
                  this.state = 351;
                  this.elseIfClause();
                }
                break;
              case 2:
                {
                  this.state = 352;
                  this.elseClause();
                }
                break;
              case 3:
                {
                  this.state = 353;
                  this.ordinaryStatement();
                }
                break;
            }
          }
          this.state = 358;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 359;
        this.match(RefLangParser.END);
        this.state = 360;
        this.match(RefLangParser.IF);
        this.state = 361;
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
    this.enterRule(localContext, 26, RefLangParser.RULE_whileLoop);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 364;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 99) {
          {
            this.state = 363;
            this.match(RefLangParser.GHOSTED);
          }
        }

        this.state = 366;
        this.match(RefLangParser.WHILE);
        this.state = 367;
        this.expression(0);
        this.state = 368;
        this.match(RefLangParser.NL);
        this.state = 372;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (
          _la === 24 ||
          _la === 26 ||
          (((_la - 38) & ~0x1f) === 0 && ((1 << (_la - 38)) & 658509897) !== 0) ||
          _la === 99
        ) {
          {
            {
              this.state = 369;
              this.ordinaryStatement();
            }
          }
          this.state = 374;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 375;
        this.match(RefLangParser.END);
        this.state = 376;
        this.match(RefLangParser.WHILE);
        this.state = 377;
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
    this.enterRule(localContext, 28, RefLangParser.RULE_forLoop);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 380;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 99) {
          {
            this.state = 379;
            this.match(RefLangParser.GHOSTED);
          }
        }

        this.state = 382;
        this.match(RefLangParser.FOR);
        this.state = 383;
        this.identifier();
        this.state = 384;
        this.match(RefLangParser.IN);
        this.state = 385;
        this.expression(0);
        this.state = 386;
        this.match(RefLangParser.NL);
        this.state = 390;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (
          _la === 24 ||
          _la === 26 ||
          (((_la - 38) & ~0x1f) === 0 && ((1 << (_la - 38)) & 658509897) !== 0) ||
          _la === 99
        ) {
          {
            {
              this.state = 387;
              this.ordinaryStatement();
            }
          }
          this.state = 392;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 393;
        this.match(RefLangParser.END);
        this.state = 394;
        this.match(RefLangParser.FOR);
        this.state = 395;
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
    this.enterRule(localContext, 30, RefLangParser.RULE_tryStatement);
    let _la: number;
    try {
      let alternative: number;
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 398;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 99) {
          {
            this.state = 397;
            this.match(RefLangParser.GHOSTED);
          }
        }

        this.state = 400;
        this.match(RefLangParser.TRY);
        this.state = 401;
        this.match(RefLangParser.NL);
        this.state = 405;
        this.errorHandler.sync(this);
        alternative = this.interpreter.adaptivePredict(this.tokenStream, 35, this.context);
        while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
          if (alternative === 1) {
            {
              {
                this.state = 402;
                this.ordinaryStatement();
              }
            }
          }
          this.state = 407;
          this.errorHandler.sync(this);
          alternative = this.interpreter.adaptivePredict(this.tokenStream, 35, this.context);
        }
        this.state = 408;
        this.catchStatement();
        this.state = 412;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (
          _la === 24 ||
          _la === 26 ||
          (((_la - 38) & ~0x1f) === 0 && ((1 << (_la - 38)) & 658509897) !== 0) ||
          _la === 99
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
        this.match(RefLangParser.END);
        this.state = 416;
        this.match(RefLangParser.TRY);
        this.state = 417;
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
    this.enterRule(localContext, 32, RefLangParser.RULE_assert);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 420;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 99) {
          {
            this.state = 419;
            this.match(RefLangParser.GHOSTED);
          }
        }

        this.state = 422;
        this.match(RefLangParser.ASSERT);
        this.state = 423;
        this.assertActual();
        this.state = 424;
        this.match(RefLangParser.EVALUATES);
        this.state = 425;
        this.match(RefLangParser.TO);
        this.state = 426;
        this.expression(0);
        this.state = 427;
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
    this.enterRule(localContext, 34, RefLangParser.RULE_letStatement);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 430;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 99) {
          {
            this.state = 429;
            this.match(RefLangParser.GHOSTED);
          }
        }

        this.state = 432;
        this.match(RefLangParser.LET);
        this.state = 433;
        this.identifier();
        this.state = 434;
        this.match(RefLangParser.BE);
        this.state = 435;
        this.expression(0);
        this.state = 436;
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
    this.enterRule(localContext, 36, RefLangParser.RULE_print);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 439;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 99) {
          {
            this.state = 438;
            this.match(RefLangParser.GHOSTED);
          }
        }

        this.state = 441;
        this.match(RefLangParser.PRINT);
        this.state = 442;
        this.match(RefLangParser.OPEN_BRACKET);
        this.state = 444;
        this.errorHandler.sync(this);
        switch (this.interpreter.adaptivePredict(this.tokenStream, 40, this.context)) {
          case 1:
            {
              this.state = 443;
              this.expression(0);
            }
            break;
        }
        this.state = 446;
        this.match(RefLangParser.CLOSE_BRACKET);
        this.state = 447;
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
    this.enterRule(localContext, 38, RefLangParser.RULE_variableDefinition);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 450;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 99) {
          {
            this.state = 449;
            this.match(RefLangParser.GHOSTED);
          }
        }

        this.state = 452;
        this.match(RefLangParser.VARIABLE);
        this.state = 453;
        this.identifier();
        this.state = 454;
        this.match(RefLangParser.SET);
        this.state = 455;
        this.match(RefLangParser.TO);
        this.state = 456;
        this.expression(0);
        this.state = 457;
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
        this.state = 460;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 99) {
          {
            this.state = 459;
            this.match(RefLangParser.GHOSTED);
          }
        }

        this.state = 462;
        this.match(RefLangParser.ASSIGN);
        this.state = 463;
        this.assignable();
        this.state = 464;
        this.match(RefLangParser.TO);
        this.state = 465;
        this.expression(0);
        this.state = 466;
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
    this.enterRule(localContext, 42, RefLangParser.RULE_inputStatement);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 469;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 99) {
          {
            this.state = 468;
            this.match(RefLangParser.GHOSTED);
          }
        }

        this.state = 471;
        this.match(RefLangParser.INPUT);
        this.state = 472;
        this.identifier();
        this.state = 473;
        this.match(RefLangParser.SET);
        this.state = 474;
        this.match(RefLangParser.TO);
        this.state = 475;
        this.methodName();
        this.state = 476;
        this.match(RefLangParser.OPEN_BRACKET);
        this.state = 477;
        this.expression(0);
        this.state = 478;
        this.match(RefLangParser.CLOSE_BRACKET);
        this.state = 479;
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
    this.enterRule(localContext, 44, RefLangParser.RULE_procedureCall);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 482;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 99) {
          {
            this.state = 481;
            this.match(RefLangParser.GHOSTED);
          }
        }

        this.state = 484;
        this.match(RefLangParser.CALL);
        this.state = 485;
        this.term();
        this.state = 486;
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
    this.enterRule(localContext, 46, RefLangParser.RULE_throwStatement);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 489;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 99) {
          {
            this.state = 488;
            this.match(RefLangParser.GHOSTED);
          }
        }

        this.state = 491;
        this.match(RefLangParser.THROW);
        this.state = 492;
        this.typeName();
        this.state = 493;
        this.litString();
        this.state = 494;
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
    this.enterRule(localContext, 48, RefLangParser.RULE_returnStatement);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 496;
        this.match(RefLangParser.RETURN);
        this.state = 497;
        this.expression(0);
        this.state = 498;
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
    this.enterRule(localContext, 50, RefLangParser.RULE_elseIfClause);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 501;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 99) {
          {
            this.state = 500;
            this.match(RefLangParser.GHOSTED);
          }
        }

        this.state = 503;
        this.match(RefLangParser.ELIF);
        this.state = 504;
        this.expression(0);
        this.state = 505;
        this.match(RefLangParser.THEN);
        this.state = 506;
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
    this.enterRule(localContext, 52, RefLangParser.RULE_elseClause);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 509;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 99) {
          {
            this.state = 508;
            this.match(RefLangParser.GHOSTED);
          }
        }

        this.state = 511;
        this.match(RefLangParser.ELSE);
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
  public catchStatement(): CatchStatementContext {
    let localContext = new CatchStatementContext(this.context, this.state);
    this.enterRule(localContext, 54, RefLangParser.RULE_catchStatement);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 515;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 99) {
          {
            this.state = 514;
            this.match(RefLangParser.GHOSTED);
          }
        }

        this.state = 517;
        this.match(RefLangParser.CATCH);
        this.state = 518;
        this.identifier();
        this.state = 519;
        this.match(RefLangParser.AS);
        this.state = 520;
        this.typeName();
        this.state = 521;
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
  public commentStatement(): CommentStatementContext {
    let localContext = new CommentStatementContext(this.context, this.state);
    this.enterRule(localContext, 56, RefLangParser.RULE_commentStatement);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 523;
        this.match(RefLangParser.COMMENT);
        this.state = 524;
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
        this.state = 527;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 99) {
          {
            this.state = 526;
            this.match(RefLangParser.GHOSTED);
          }
        }

        this.state = 529;
        this.match(RefLangParser.CONSTRUCTOR);
        this.state = 530;
        this.match(RefLangParser.OPEN_BRACKET);
        this.state = 532;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 90) {
          {
            this.state = 531;
            this.paramsList();
          }
        }

        this.state = 534;
        this.match(RefLangParser.CLOSE_BRACKET);
        this.state = 535;
        this.match(RefLangParser.NL);
        this.state = 539;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (
          _la === 24 ||
          _la === 26 ||
          (((_la - 38) & ~0x1f) === 0 && ((1 << (_la - 38)) & 658509897) !== 0) ||
          _la === 99
        ) {
          {
            {
              this.state = 536;
              this.ordinaryStatement();
            }
          }
          this.state = 541;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 542;
        this.match(RefLangParser.END);
        this.state = 543;
        this.match(RefLangParser.CONSTRUCTOR);
        this.state = 544;
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
        this.state = 547;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 51) {
          {
            this.state = 546;
            this.match(RefLangParser.PRIVATE);
          }
        }

        this.state = 549;
        this.match(RefLangParser.PROPERTY);
        this.state = 550;
        this.identifier();
        this.state = 551;
        this.match(RefLangParser.AS);
        this.state = 552;
        this.type_();
        this.state = 553;
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
        this.state = 556;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 99) {
          {
            this.state = 555;
            this.match(RefLangParser.GHOSTED);
          }
        }

        this.state = 559;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 51) {
          {
            this.state = 558;
            this.match(RefLangParser.PRIVATE);
          }
        }

        this.state = 561;
        this.match(RefLangParser.FUNCTION);
        this.state = 562;
        this.methodName();
        this.state = 563;
        this.match(RefLangParser.OPEN_BRACKET);
        this.state = 565;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 90) {
          {
            this.state = 564;
            this.paramsList();
          }
        }

        this.state = 567;
        this.match(RefLangParser.CLOSE_BRACKET);
        this.state = 568;
        this.match(RefLangParser.RETURNS);
        this.state = 569;
        this.type_();
        this.state = 570;
        this.match(RefLangParser.NL);
        this.state = 575;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (
          _la === 24 ||
          _la === 26 ||
          (((_la - 38) & ~0x1f) === 0 && ((1 << (_la - 38)) & 658510153) !== 0) ||
          _la === 99
        ) {
          {
            this.state = 573;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 56, this.context)) {
              case 1:
                {
                  this.state = 571;
                  this.letStatement();
                }
                break;
              case 2:
                {
                  this.state = 572;
                  this.ordinaryStatement();
                }
                break;
            }
          }
          this.state = 577;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 578;
        this.returnStatement();
        this.state = 579;
        this.match(RefLangParser.END);
        this.state = 580;
        this.match(RefLangParser.FUNCTION);
        this.state = 581;
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
        this.state = 584;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 99) {
          {
            this.state = 583;
            this.match(RefLangParser.GHOSTED);
          }
        }

        this.state = 587;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 51) {
          {
            this.state = 586;
            this.match(RefLangParser.PRIVATE);
          }
        }

        this.state = 589;
        this.match(RefLangParser.PROCEDURE);
        this.state = 590;
        this.methodName();
        this.state = 591;
        this.match(RefLangParser.OPEN_BRACKET);
        this.state = 593;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 90) {
          {
            this.state = 592;
            this.paramsList();
          }
        }

        this.state = 595;
        this.match(RefLangParser.CLOSE_BRACKET);
        this.state = 596;
        this.match(RefLangParser.NL);
        this.state = 600;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (
          _la === 24 ||
          _la === 26 ||
          (((_la - 38) & ~0x1f) === 0 && ((1 << (_la - 38)) & 658509897) !== 0) ||
          _la === 99
        ) {
          {
            {
              this.state = 597;
              this.ordinaryStatement();
            }
          }
          this.state = 602;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 603;
        this.match(RefLangParser.END);
        this.state = 604;
        this.match(RefLangParser.PROCEDURE);
        this.state = 605;
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
        this.state = 608;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 99) {
          {
            this.state = 607;
            this.match(RefLangParser.GHOSTED);
          }
        }

        this.state = 610;
        this.match(RefLangParser.ABSTRACT);
        this.state = 611;
        this.match(RefLangParser.FUNCTION);
        this.state = 612;
        this.methodName();
        this.state = 613;
        this.match(RefLangParser.OPEN_BRACKET);
        this.state = 615;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 90) {
          {
            this.state = 614;
            this.paramsList();
          }
        }

        this.state = 617;
        this.match(RefLangParser.CLOSE_BRACKET);
        this.state = 618;
        this.match(RefLangParser.RETURNS);
        this.state = 619;
        this.type_();
        this.state = 620;
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
        this.state = 623;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 99) {
          {
            this.state = 622;
            this.match(RefLangParser.GHOSTED);
          }
        }

        this.state = 625;
        this.match(RefLangParser.ABSTRACT);
        this.state = 626;
        this.match(RefLangParser.PROCEDURE);
        this.state = 627;
        this.methodName();
        this.state = 628;
        this.match(RefLangParser.OPEN_BRACKET);
        this.state = 630;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 90) {
          {
            this.state = 629;
            this.paramsList();
          }
        }

        this.state = 632;
        this.match(RefLangParser.CLOSE_BRACKET);
        this.state = 633;
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
  public commentMember(): CommentMemberContext {
    let localContext = new CommentMemberContext(this.context, this.state);
    this.enterRule(localContext, 70, RefLangParser.RULE_commentMember);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 636;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 67) {
          {
            this.state = 635;
            this.match(RefLangParser.COMMENT);
          }
        }

        this.state = 638;
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
    this.enterRule(localContext, 72, RefLangParser.RULE_identifier);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 640;
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
    this.enterRule(localContext, 74, RefLangParser.RULE_assignable);
    try {
      this.state = 644;
      this.errorHandler.sync(this);
      switch (this.tokenStream.LA(1)) {
        case RefLangParser.NAME_STARTING_LC:
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 642;
            this.identifierWithOptIndexes();
          }
          break;
        case RefLangParser.THIS_INSTANCE:
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 643;
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
    this.enterRule(localContext, 76, RefLangParser.RULE_methodName);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 646;
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
    this.enterRule(localContext, 78, RefLangParser.RULE_testName);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 648;
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
    this.enterRule(localContext, 80, RefLangParser.RULE_typeName);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 650;
        _la = this.tokenStream.LA(1);
        if (!(((_la & ~0x1f) === 0 && ((1 << _la) & 124) !== 0) || _la === 91)) {
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
    this.enterRule(localContext, 82, RefLangParser.RULE_constantValue);
    try {
      this.state = 654;
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
        case RefLangParser.NL:
        case RefLangParser.NAME_STARTING_UC:
        case RefLangParser.LITERAL_BINARY:
        case RefLangParser.LITERAL_HEX:
        case RefLangParser.LITERAL_INTEGER:
        case RefLangParser.LITERAL_FLOAT:
        case RefLangParser.LITERAL_STRING:
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 652;
            this.litValue();
          }
          break;
        case RefLangParser.NAME_STARTING_LC:
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 653;
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
    this.enterRule(localContext, 84, RefLangParser.RULE_argList);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 656;
        this.argument();
        this.state = 661;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (_la === 76) {
          {
            {
              this.state = 657;
              this.match(RefLangParser.COMMA);
              this.state = 658;
              this.argument();
            }
          }
          this.state = 663;
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
    this.enterRule(localContext, 86, RefLangParser.RULE_argument);
    try {
      this.state = 666;
      this.errorHandler.sync(this);
      switch (this.interpreter.adaptivePredict(this.tokenStream, 70, this.context)) {
        case 1:
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 664;
            this.lambda();
          }
          break;
        case 2:
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 665;
            this.expression(0);
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
  public paramsList(): ParamsListContext {
    let localContext = new ParamsListContext(this.context, this.state);
    this.enterRule(localContext, 88, RefLangParser.RULE_paramsList);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 668;
        this.paramDef();
        this.state = 673;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (_la === 76) {
          {
            {
              this.state = 669;
              this.match(RefLangParser.COMMA);
              this.state = 670;
              this.paramDef();
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
  public type_(): TypeContext {
    let localContext = new TypeContext(this.context, this.state);
    this.enterRule(localContext, 90, RefLangParser.RULE_type);
    try {
      this.state = 680;
      this.errorHandler.sync(this);
      switch (this.interpreter.adaptivePredict(this.tokenStream, 72, this.context)) {
        case 1:
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 676;
            this.typeTuple();
          }
          break;
        case 2:
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 677;
            this.typeName();
          }
          break;
        case 3:
          this.enterOuterAlt(localContext, 3);
          {
            this.state = 678;
            this.typeGeneric();
          }
          break;
        case 4:
          this.enterOuterAlt(localContext, 4);
          {
            this.state = 679;
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
    this.enterRule(localContext, 92, RefLangParser.RULE_enumValuesList);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 682;
        this.identifier();
        this.state = 687;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (_la === 76) {
          {
            {
              this.state = 683;
              this.match(RefLangParser.COMMA);
              this.state = 684;
              this.identifier();
            }
          }
          this.state = 689;
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
    this.enterRule(localContext, 94, RefLangParser.RULE_assertActual);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 690;
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
    this.enterRule(localContext, 96, RefLangParser.RULE_litValue);
    try {
      this.state = 698;
      this.errorHandler.sync(this);
      switch (this.interpreter.adaptivePredict(this.tokenStream, 74, this.context)) {
        case 1:
          this.enterOuterAlt(localContext, 1);
          // tslint:disable-next-line:no-empty
          {
          }
          break;
        case 2:
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 693;
            this.litBoolean();
          }
          break;
        case 3:
          this.enterOuterAlt(localContext, 3);
          {
            this.state = 694;
            this.litInt();
          }
          break;
        case 4:
          this.enterOuterAlt(localContext, 4);
          {
            this.state = 695;
            this.litFloat();
          }
          break;
        case 5:
          this.enterOuterAlt(localContext, 5);
          {
            this.state = 696;
            this.litString();
          }
          break;
        case 6:
          this.enterOuterAlt(localContext, 6);
          {
            this.state = 697;
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
    this.enterRule(localContext, 98, RefLangParser.RULE_litBoolean);
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
    this.enterRule(localContext, 100, RefLangParser.RULE_litInt);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 702;
        _la = this.tokenStream.LA(1);
        if (!(((_la - 92) & ~0x1f) === 0 && ((1 << (_la - 92)) & 7) !== 0)) {
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
    this.enterRule(localContext, 102, RefLangParser.RULE_litFloat);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 704;
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
    this.enterRule(localContext, 104, RefLangParser.RULE_enumValue);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 706;
        this.typeName();
        this.state = 707;
        this.match(RefLangParser.DOT);
        this.state = 708;
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
    this.enterRule(localContext, 106, RefLangParser.RULE_litString);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 711;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 19) {
          {
            this.state = 710;
            this.match(RefLangParser.INTERPOLATED_STRING_PREFIX);
          }
        }

        this.state = 713;
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
    this.enterRule(localContext, 108, RefLangParser.RULE_index);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 715;
        this.match(RefLangParser.OPEN_SQ_BRACKET);
        this.state = 716;
        this.expression(0);
        this.state = 717;
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
    this.enterRule(localContext, 110, RefLangParser.RULE_identifierWithOptIndexes);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 719;
        this.identifier();
        this.state = 723;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (_la === 71) {
          {
            {
              this.state = 720;
              this.index();
            }
          }
          this.state = 725;
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
    this.enterRule(localContext, 112, RefLangParser.RULE_propertyRef);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 726;
        this.match(RefLangParser.THIS_INSTANCE);
        this.state = 727;
        this.match(RefLangParser.DOT);
        this.state = 728;
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
    let _startState = 114;
    this.enterRecursionRule(localContext, 114, RefLangParser.RULE_expression, _p);
    try {
      let alternative: number;
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 743;
        this.errorHandler.sync(this);
        switch (this.interpreter.adaptivePredict(this.tokenStream, 77, this.context)) {
          case 1:
            {
              this.state = 731;
              this.newInstance();
            }
            break;
          case 2:
            {
              this.state = 732;
              this.unaryExpression();
            }
            break;
          case 3:
            {
              this.state = 733;
              this.term();
            }
            break;
          case 4:
            {
              this.state = 734;
              this.match(RefLangParser.IF_);
              this.state = 735;
              this.match(RefLangParser.OPEN_BRACKET);
              this.state = 736;
              this.expression(0);
              this.state = 737;
              this.match(RefLangParser.COMMA);
              this.state = 738;
              this.expression(0);
              this.state = 739;
              this.match(RefLangParser.COMMA);
              this.state = 740;
              this.expression(0);
              this.state = 741;
              this.match(RefLangParser.CLOSE_BRACKET);
            }
            break;
        }
        this.context!.stop = this.tokenStream.LT(-1);
        this.state = 751;
        this.errorHandler.sync(this);
        alternative = this.interpreter.adaptivePredict(this.tokenStream, 78, this.context);
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
                this.state = 745;
                if (!this.precpred(this.context, 2)) {
                  throw this.createFailedPredicateException("this.precpred(this.context, 2)");
                }
                this.state = 746;
                this.binaryOperator();
                this.state = 747;
                this.expression(3);
              }
            }
          }
          this.state = 753;
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
      this.unrollRecursionContexts(parentContext);
    }
    return localContext;
  }
  public term(): TermContext {
    let localContext = new TermContext(this.context, this.state);
    this.enterRule(localContext, 116, RefLangParser.RULE_term);
    try {
      let alternative: number;
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 754;
        this.chainHead();
        this.state = 759;
        this.errorHandler.sync(this);
        alternative = this.interpreter.adaptivePredict(this.tokenStream, 79, this.context);
        while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
          if (alternative === 1) {
            {
              {
                this.state = 755;
                this.match(RefLangParser.DOT);
                this.state = 756;
                this.chainable();
              }
            }
          }
          this.state = 761;
          this.errorHandler.sync(this);
          alternative = this.interpreter.adaptivePredict(this.tokenStream, 79, this.context);
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
    this.enterRule(localContext, 118, RefLangParser.RULE_chainHead);
    try {
      this.state = 768;
      this.errorHandler.sync(this);
      switch (this.interpreter.adaptivePredict(this.tokenStream, 80, this.context)) {
        case 1:
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 762;
            this.match(RefLangParser.THIS_INSTANCE);
          }
          break;
        case 2:
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 763;
            this.bracketedExpression();
          }
          break;
        case 3:
          this.enterOuterAlt(localContext, 3);
          {
            this.state = 764;
            this.tuple();
          }
          break;
        case 4:
          this.enterOuterAlt(localContext, 4);
          {
            this.state = 765;
            this.litValue();
          }
          break;
        case 5:
          this.enterOuterAlt(localContext, 5);
          {
            this.state = 766;
            this.list();
          }
          break;
        case 6:
          this.enterOuterAlt(localContext, 6);
          {
            this.state = 767;
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
    this.enterRule(localContext, 120, RefLangParser.RULE_chainable);
    try {
      let alternative: number;
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 772;
        this.errorHandler.sync(this);
        switch (this.interpreter.adaptivePredict(this.tokenStream, 81, this.context)) {
          case 1:
            {
              this.state = 770;
              this.identifier();
            }
            break;
          case 2:
            {
              this.state = 771;
              this.methodCall();
            }
            break;
        }
        this.state = 777;
        this.errorHandler.sync(this);
        alternative = this.interpreter.adaptivePredict(this.tokenStream, 82, this.context);
        while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
          if (alternative === 1) {
            {
              {
                this.state = 774;
                this.index();
              }
            }
          }
          this.state = 779;
          this.errorHandler.sync(this);
          alternative = this.interpreter.adaptivePredict(this.tokenStream, 82, this.context);
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
        this.state = 780;
        this.match(RefLangParser.OPEN_BRACKET);
        this.state = 781;
        this.expression(0);
        this.state = 782;
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
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 784;
        _la = this.tokenStream.LA(1);
        if (!(_la === 12 || _la === 79)) {
          this.errorHandler.recoverInline(this);
        } else {
          this.errorHandler.reportMatch(this);
          this.consume();
        }
        this.state = 785;
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
    this.enterRule(localContext, 126, RefLangParser.RULE_binaryExpression);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 787;
        this.term();
        this.state = 788;
        this.binaryOperator();
        this.state = 789;
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
    this.enterRule(localContext, 128, RefLangParser.RULE_tuple);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 791;
        this.match(RefLangParser.OPEN_BRACKET);
        this.state = 792;
        this.expression(0);
        this.state = 793;
        this.match(RefLangParser.COMMA);
        this.state = 794;
        this.expression(0);
        this.state = 799;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (_la === 76) {
          {
            {
              this.state = 795;
              this.match(RefLangParser.COMMA);
              this.state = 796;
              this.expression(0);
            }
          }
          this.state = 801;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 802;
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
    this.enterRule(localContext, 130, RefLangParser.RULE_methodCall);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 804;
        this.methodName();
        this.state = 805;
        this.match(RefLangParser.OPEN_BRACKET);
        this.state = 807;
        this.errorHandler.sync(this);
        switch (this.interpreter.adaptivePredict(this.tokenStream, 84, this.context)) {
          case 1:
            {
              this.state = 806;
              this.argList();
            }
            break;
        }
        this.state = 809;
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
    this.enterRule(localContext, 132, RefLangParser.RULE_binaryOperator);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 811;
        _la = this.tokenStream.LA(1);
        if (!(
          ((_la & ~0x1f) === 0 && ((1 << _la) & 60416) !== 0) ||
          (((_la - 78) & ~0x1f) === 0 && ((1 << (_la - 78)) & 255) !== 0)
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
    this.enterRule(localContext, 134, RefLangParser.RULE_newInstance);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 813;
        this.match(RefLangParser.NEW);
        this.state = 814;
        this.type_();
        this.state = 815;
        this.match(RefLangParser.OPEN_BRACKET);
        this.state = 817;
        this.errorHandler.sync(this);
        switch (this.interpreter.adaptivePredict(this.tokenStream, 85, this.context)) {
          case 1:
            {
              this.state = 816;
              this.argList();
            }
            break;
        }
        this.state = 819;
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
    this.enterRule(localContext, 136, RefLangParser.RULE_paramDef);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 821;
        this.identifier();
        this.state = 822;
        this.match(RefLangParser.AS);
        this.state = 823;
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
    this.enterRule(localContext, 138, RefLangParser.RULE_typeGeneric);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 825;
        this.typeName();
        this.state = 826;
        this.match(RefLangParser.LT);
        this.state = 827;
        this.match(RefLangParser.OF);
        this.state = 828;
        this.type_();
        this.state = 833;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (_la === 76) {
          {
            {
              this.state = 829;
              this.match(RefLangParser.COMMA);
              this.state = 830;
              this.type_();
            }
          }
          this.state = 835;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 836;
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
    this.enterRule(localContext, 140, RefLangParser.RULE_typeFunc);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 838;
        this.match(RefLangParser.FUNC_NAME);
        this.state = 839;
        this.match(RefLangParser.LT);
        this.state = 840;
        this.match(RefLangParser.OF);
        this.state = 841;
        this.type_();
        this.state = 846;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (_la === 76) {
          {
            {
              this.state = 842;
              this.match(RefLangParser.COMMA);
              this.state = 843;
              this.type_();
            }
          }
          this.state = 848;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 849;
        this.match(RefLangParser.ARROW);
        this.state = 850;
        this.type_();
        this.state = 851;
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
    this.enterRule(localContext, 142, RefLangParser.RULE_typeTuple);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 853;
        this.match(RefLangParser.OPEN_BRACKET);
        this.state = 854;
        this.type_();
        this.state = 857;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        do {
          {
            {
              this.state = 855;
              this.match(RefLangParser.COMMA);
              this.state = 856;
              this.type_();
            }
          }
          this.state = 859;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        } while (_la === 76);
        this.state = 861;
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
    this.enterRule(localContext, 144, RefLangParser.RULE_lambda);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 863;
        this.match(RefLangParser.LAMBDA);
        this.state = 866;
        this.errorHandler.sync(this);
        switch (this.interpreter.adaptivePredict(this.tokenStream, 89, this.context)) {
          case 1:
            {
              this.state = 864;
              this.paramsList();
            }
            break;
          case 2:
            {
              this.state = 865;
              this.argList();
            }
            break;
        }
        this.state = 868;
        this.match(RefLangParser.ARROW);
        this.state = 869;
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
    this.enterRule(localContext, 146, RefLangParser.RULE_list);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 871;
        this.match(RefLangParser.OPEN_SQ_BRACKET);
        this.state = 872;
        this.expression(0);
        this.state = 877;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (_la === 76) {
          {
            {
              this.state = 873;
              this.match(RefLangParser.COMMA);
              this.state = 874;
              this.expression(0);
            }
          }
          this.state = 879;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 880;
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
    this.enterRule(localContext, 148, RefLangParser.RULE_interpolatedString);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 882;
        this.match(RefLangParser.INTERPOLATED_STRING_PREFIX);
        this.state = 883;
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
    this.enterRule(localContext, 150, RefLangParser.RULE_power);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 885;
        this.term();
        this.state = 886;
        this.match(RefLangParser.POWER);
        this.state = 887;
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
      case 57:
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
    4, 1, 114, 890, 2, 0, 7, 0, 2, 1, 7, 1, 2, 2, 7, 2, 2, 3, 7, 3, 2, 4, 7, 4, 2, 5, 7, 5, 2, 6, 7,
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
    74, 2, 75, 7, 75, 1, 0, 3, 0, 154, 8, 0, 1, 0, 5, 0, 157, 8, 0, 10, 0, 12, 0, 160, 9, 0, 1, 0,
    5, 0, 163, 8, 0, 10, 0, 12, 0, 166, 9, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 3, 1, 179, 8, 1, 1, 2, 3, 2, 182, 8, 2, 1, 2, 1, 2, 1, 2, 5, 2, 187, 8, 2, 10, 2,
    12, 2, 190, 9, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 3, 3, 3, 197, 8, 3, 1, 3, 1, 3, 1, 3, 1, 3, 3, 3,
    203, 8, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 5, 3, 211, 8, 3, 10, 3, 12, 3, 214, 9, 3, 1, 3,
    1, 3, 1, 3, 1, 3, 1, 3, 1, 4, 3, 4, 222, 8, 4, 1, 4, 1, 4, 1, 4, 1, 4, 1, 4, 1, 4, 1, 4, 5, 4,
    231, 8, 4, 10, 4, 12, 4, 234, 9, 4, 1, 4, 1, 4, 1, 4, 1, 4, 1, 5, 3, 5, 241, 8, 5, 1, 5, 1, 5,
    1, 5, 1, 5, 3, 5, 247, 8, 5, 1, 5, 1, 5, 1, 5, 5, 5, 252, 8, 5, 10, 5, 12, 5, 255, 9, 5, 1, 5,
    1, 5, 1, 5, 1, 5, 1, 6, 3, 6, 262, 8, 6, 1, 6, 1, 6, 1, 6, 1, 6, 1, 6, 1, 6, 1, 6, 1, 7, 3, 7,
    272, 8, 7, 1, 7, 1, 7, 1, 7, 1, 7, 1, 7, 1, 8, 3, 8, 280, 8, 8, 1, 8, 1, 8, 1, 8, 1, 8, 3, 8,
    286, 8, 8, 1, 8, 1, 8, 1, 8, 1, 8, 1, 8, 1, 8, 5, 8, 294, 8, 8, 10, 8, 12, 8, 297, 9, 8, 1, 8,
    1, 8, 1, 8, 1, 8, 1, 9, 3, 9, 304, 8, 9, 1, 9, 1, 9, 1, 9, 1, 9, 1, 9, 3, 9, 311, 8, 9, 1, 9, 1,
    9, 1, 9, 1, 9, 1, 9, 1, 9, 1, 9, 5, 9, 320, 8, 9, 10, 9, 12, 9, 323, 9, 9, 1, 9, 1, 9, 1, 9, 1,
    9, 1, 10, 1, 10, 1, 10, 1, 11, 1, 11, 1, 11, 1, 11, 1, 11, 1, 11, 1, 11, 1, 11, 1, 11, 1, 11, 1,
    11, 3, 11, 343, 8, 11, 1, 12, 3, 12, 346, 8, 12, 1, 12, 1, 12, 1, 12, 1, 12, 1, 12, 1, 12, 1,
    12, 5, 12, 355, 8, 12, 10, 12, 12, 12, 358, 9, 12, 1, 12, 1, 12, 1, 12, 1, 12, 1, 13, 3, 13,
    365, 8, 13, 1, 13, 1, 13, 1, 13, 1, 13, 5, 13, 371, 8, 13, 10, 13, 12, 13, 374, 9, 13, 1, 13, 1,
    13, 1, 13, 1, 13, 1, 14, 3, 14, 381, 8, 14, 1, 14, 1, 14, 1, 14, 1, 14, 1, 14, 1, 14, 5, 14,
    389, 8, 14, 10, 14, 12, 14, 392, 9, 14, 1, 14, 1, 14, 1, 14, 1, 14, 1, 15, 3, 15, 399, 8, 15, 1,
    15, 1, 15, 1, 15, 5, 15, 404, 8, 15, 10, 15, 12, 15, 407, 9, 15, 1, 15, 1, 15, 5, 15, 411, 8,
    15, 10, 15, 12, 15, 414, 9, 15, 1, 15, 1, 15, 1, 15, 1, 15, 1, 16, 3, 16, 421, 8, 16, 1, 16, 1,
    16, 1, 16, 1, 16, 1, 16, 1, 16, 1, 16, 1, 17, 3, 17, 431, 8, 17, 1, 17, 1, 17, 1, 17, 1, 17, 1,
    17, 1, 17, 1, 18, 3, 18, 440, 8, 18, 1, 18, 1, 18, 1, 18, 3, 18, 445, 8, 18, 1, 18, 1, 18, 1,
    18, 1, 19, 3, 19, 451, 8, 19, 1, 19, 1, 19, 1, 19, 1, 19, 1, 19, 1, 19, 1, 19, 1, 20, 3, 20,
    461, 8, 20, 1, 20, 1, 20, 1, 20, 1, 20, 1, 20, 1, 20, 1, 21, 3, 21, 470, 8, 21, 1, 21, 1, 21, 1,
    21, 1, 21, 1, 21, 1, 21, 1, 21, 1, 21, 1, 21, 1, 21, 1, 22, 3, 22, 483, 8, 22, 1, 22, 1, 22, 1,
    22, 1, 22, 1, 23, 3, 23, 490, 8, 23, 1, 23, 1, 23, 1, 23, 1, 23, 1, 23, 1, 24, 1, 24, 1, 24, 1,
    24, 1, 25, 3, 25, 502, 8, 25, 1, 25, 1, 25, 1, 25, 1, 25, 1, 25, 1, 26, 3, 26, 510, 8, 26, 1,
    26, 1, 26, 1, 26, 1, 27, 3, 27, 516, 8, 27, 1, 27, 1, 27, 1, 27, 1, 27, 1, 27, 1, 27, 1, 28, 1,
    28, 1, 28, 1, 29, 3, 29, 528, 8, 29, 1, 29, 1, 29, 1, 29, 3, 29, 533, 8, 29, 1, 29, 1, 29, 1,
    29, 5, 29, 538, 8, 29, 10, 29, 12, 29, 541, 9, 29, 1, 29, 1, 29, 1, 29, 1, 29, 1, 30, 3, 30,
    548, 8, 30, 1, 30, 1, 30, 1, 30, 1, 30, 1, 30, 1, 30, 1, 31, 3, 31, 557, 8, 31, 1, 31, 3, 31,
    560, 8, 31, 1, 31, 1, 31, 1, 31, 1, 31, 3, 31, 566, 8, 31, 1, 31, 1, 31, 1, 31, 1, 31, 1, 31, 1,
    31, 5, 31, 574, 8, 31, 10, 31, 12, 31, 577, 9, 31, 1, 31, 1, 31, 1, 31, 1, 31, 1, 31, 1, 32, 3,
    32, 585, 8, 32, 1, 32, 3, 32, 588, 8, 32, 1, 32, 1, 32, 1, 32, 1, 32, 3, 32, 594, 8, 32, 1, 32,
    1, 32, 1, 32, 5, 32, 599, 8, 32, 10, 32, 12, 32, 602, 9, 32, 1, 32, 1, 32, 1, 32, 1, 32, 1, 33,
    3, 33, 609, 8, 33, 1, 33, 1, 33, 1, 33, 1, 33, 1, 33, 3, 33, 616, 8, 33, 1, 33, 1, 33, 1, 33, 1,
    33, 1, 33, 1, 34, 3, 34, 624, 8, 34, 1, 34, 1, 34, 1, 34, 1, 34, 1, 34, 3, 34, 631, 8, 34, 1,
    34, 1, 34, 1, 34, 1, 35, 3, 35, 637, 8, 35, 1, 35, 1, 35, 1, 36, 1, 36, 1, 37, 1, 37, 3, 37,
    645, 8, 37, 1, 38, 1, 38, 1, 39, 1, 39, 1, 40, 1, 40, 1, 41, 1, 41, 3, 41, 655, 8, 41, 1, 42, 1,
    42, 1, 42, 5, 42, 660, 8, 42, 10, 42, 12, 42, 663, 9, 42, 1, 43, 1, 43, 3, 43, 667, 8, 43, 1,
    44, 1, 44, 1, 44, 5, 44, 672, 8, 44, 10, 44, 12, 44, 675, 9, 44, 1, 45, 1, 45, 1, 45, 1, 45, 3,
    45, 681, 8, 45, 1, 46, 1, 46, 1, 46, 5, 46, 686, 8, 46, 10, 46, 12, 46, 689, 9, 46, 1, 47, 1,
    47, 1, 48, 1, 48, 1, 48, 1, 48, 1, 48, 1, 48, 3, 48, 699, 8, 48, 1, 49, 1, 49, 1, 50, 1, 50, 1,
    51, 1, 51, 1, 52, 1, 52, 1, 52, 1, 52, 1, 53, 3, 53, 712, 8, 53, 1, 53, 1, 53, 1, 54, 1, 54, 1,
    54, 1, 54, 1, 55, 1, 55, 5, 55, 722, 8, 55, 10, 55, 12, 55, 725, 9, 55, 1, 56, 1, 56, 1, 56, 1,
    56, 1, 57, 1, 57, 1, 57, 1, 57, 1, 57, 1, 57, 1, 57, 1, 57, 1, 57, 1, 57, 1, 57, 1, 57, 1, 57,
    3, 57, 744, 8, 57, 1, 57, 1, 57, 1, 57, 1, 57, 5, 57, 750, 8, 57, 10, 57, 12, 57, 753, 9, 57, 1,
    58, 1, 58, 1, 58, 5, 58, 758, 8, 58, 10, 58, 12, 58, 761, 9, 58, 1, 59, 1, 59, 1, 59, 1, 59, 1,
    59, 1, 59, 3, 59, 769, 8, 59, 1, 60, 1, 60, 3, 60, 773, 8, 60, 1, 60, 5, 60, 776, 8, 60, 10, 60,
    12, 60, 779, 9, 60, 1, 61, 1, 61, 1, 61, 1, 61, 1, 62, 1, 62, 1, 62, 1, 63, 1, 63, 1, 63, 1, 63,
    1, 64, 1, 64, 1, 64, 1, 64, 1, 64, 1, 64, 5, 64, 798, 8, 64, 10, 64, 12, 64, 801, 9, 64, 1, 64,
    1, 64, 1, 65, 1, 65, 1, 65, 3, 65, 808, 8, 65, 1, 65, 1, 65, 1, 66, 1, 66, 1, 67, 1, 67, 1, 67,
    1, 67, 3, 67, 818, 8, 67, 1, 67, 1, 67, 1, 68, 1, 68, 1, 68, 1, 68, 1, 69, 1, 69, 1, 69, 1, 69,
    1, 69, 1, 69, 5, 69, 832, 8, 69, 10, 69, 12, 69, 835, 9, 69, 1, 69, 1, 69, 1, 70, 1, 70, 1, 70,
    1, 70, 1, 70, 1, 70, 5, 70, 845, 8, 70, 10, 70, 12, 70, 848, 9, 70, 1, 70, 1, 70, 1, 70, 1, 70,
    1, 71, 1, 71, 1, 71, 1, 71, 4, 71, 858, 8, 71, 11, 71, 12, 71, 859, 1, 71, 1, 71, 1, 72, 1, 72,
    1, 72, 3, 72, 867, 8, 72, 1, 72, 1, 72, 1, 72, 1, 73, 1, 73, 1, 73, 1, 73, 5, 73, 876, 8, 73,
    10, 73, 12, 73, 879, 9, 73, 1, 73, 1, 73, 1, 74, 1, 74, 1, 74, 1, 75, 1, 75, 1, 75, 1, 75, 1,
    75, 0, 1, 114, 76, 0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38,
    40, 42, 44, 46, 48, 50, 52, 54, 56, 58, 60, 62, 64, 66, 68, 70, 72, 74, 76, 78, 80, 82, 84, 86,
    88, 90, 92, 94, 96, 98, 100, 102, 104, 106, 108, 110, 112, 114, 116, 118, 120, 122, 124, 126,
    128, 130, 132, 134, 136, 138, 140, 142, 144, 146, 148, 150, 0, 5, 2, 0, 2, 6, 91, 91, 1, 0, 8,
    9, 1, 0, 92, 94, 2, 0, 12, 12, 79, 79, 3, 0, 10, 11, 13, 15, 78, 85, 942, 0, 153, 1, 0, 0, 0, 2,
    178, 1, 0, 0, 0, 4, 181, 1, 0, 0, 0, 6, 196, 1, 0, 0, 0, 8, 221, 1, 0, 0, 0, 10, 240, 1, 0, 0,
    0, 12, 261, 1, 0, 0, 0, 14, 271, 1, 0, 0, 0, 16, 279, 1, 0, 0, 0, 18, 303, 1, 0, 0, 0, 20, 328,
    1, 0, 0, 0, 22, 342, 1, 0, 0, 0, 24, 345, 1, 0, 0, 0, 26, 364, 1, 0, 0, 0, 28, 380, 1, 0, 0, 0,
    30, 398, 1, 0, 0, 0, 32, 420, 1, 0, 0, 0, 34, 430, 1, 0, 0, 0, 36, 439, 1, 0, 0, 0, 38, 450, 1,
    0, 0, 0, 40, 460, 1, 0, 0, 0, 42, 469, 1, 0, 0, 0, 44, 482, 1, 0, 0, 0, 46, 489, 1, 0, 0, 0, 48,
    496, 1, 0, 0, 0, 50, 501, 1, 0, 0, 0, 52, 509, 1, 0, 0, 0, 54, 515, 1, 0, 0, 0, 56, 523, 1, 0,
    0, 0, 58, 527, 1, 0, 0, 0, 60, 547, 1, 0, 0, 0, 62, 556, 1, 0, 0, 0, 64, 584, 1, 0, 0, 0, 66,
    608, 1, 0, 0, 0, 68, 623, 1, 0, 0, 0, 70, 636, 1, 0, 0, 0, 72, 640, 1, 0, 0, 0, 74, 644, 1, 0,
    0, 0, 76, 646, 1, 0, 0, 0, 78, 648, 1, 0, 0, 0, 80, 650, 1, 0, 0, 0, 82, 654, 1, 0, 0, 0, 84,
    656, 1, 0, 0, 0, 86, 666, 1, 0, 0, 0, 88, 668, 1, 0, 0, 0, 90, 680, 1, 0, 0, 0, 92, 682, 1, 0,
    0, 0, 94, 690, 1, 0, 0, 0, 96, 698, 1, 0, 0, 0, 98, 700, 1, 0, 0, 0, 100, 702, 1, 0, 0, 0, 102,
    704, 1, 0, 0, 0, 104, 706, 1, 0, 0, 0, 106, 711, 1, 0, 0, 0, 108, 715, 1, 0, 0, 0, 110, 719, 1,
    0, 0, 0, 112, 726, 1, 0, 0, 0, 114, 743, 1, 0, 0, 0, 116, 754, 1, 0, 0, 0, 118, 768, 1, 0, 0, 0,
    120, 772, 1, 0, 0, 0, 122, 780, 1, 0, 0, 0, 124, 784, 1, 0, 0, 0, 126, 787, 1, 0, 0, 0, 128,
    791, 1, 0, 0, 0, 130, 804, 1, 0, 0, 0, 132, 811, 1, 0, 0, 0, 134, 813, 1, 0, 0, 0, 136, 821, 1,
    0, 0, 0, 138, 825, 1, 0, 0, 0, 140, 838, 1, 0, 0, 0, 142, 853, 1, 0, 0, 0, 144, 863, 1, 0, 0, 0,
    146, 871, 1, 0, 0, 0, 148, 882, 1, 0, 0, 0, 150, 885, 1, 0, 0, 0, 152, 154, 5, 67, 0, 0, 153,
    152, 1, 0, 0, 0, 153, 154, 1, 0, 0, 0, 154, 158, 1, 0, 0, 0, 155, 157, 3, 2, 1, 0, 156, 155, 1,
    0, 0, 0, 157, 160, 1, 0, 0, 0, 158, 156, 1, 0, 0, 0, 158, 159, 1, 0, 0, 0, 159, 164, 1, 0, 0, 0,
    160, 158, 1, 0, 0, 0, 161, 163, 5, 88, 0, 0, 162, 161, 1, 0, 0, 0, 163, 166, 1, 0, 0, 0, 164,
    162, 1, 0, 0, 0, 164, 165, 1, 0, 0, 0, 165, 167, 1, 0, 0, 0, 166, 164, 1, 0, 0, 0, 167, 168, 5,
    0, 0, 1, 168, 1, 1, 0, 0, 0, 169, 179, 3, 4, 2, 0, 170, 179, 3, 6, 3, 0, 171, 179, 3, 8, 4, 0,
    172, 179, 3, 10, 5, 0, 173, 179, 3, 12, 6, 0, 174, 179, 3, 14, 7, 0, 175, 179, 3, 16, 8, 0, 176,
    179, 3, 18, 9, 0, 177, 179, 3, 20, 10, 0, 178, 169, 1, 0, 0, 0, 178, 170, 1, 0, 0, 0, 178, 171,
    1, 0, 0, 0, 178, 172, 1, 0, 0, 0, 178, 173, 1, 0, 0, 0, 178, 174, 1, 0, 0, 0, 178, 175, 1, 0, 0,
    0, 178, 176, 1, 0, 0, 0, 178, 177, 1, 0, 0, 0, 179, 3, 1, 0, 0, 0, 180, 182, 5, 99, 0, 0, 181,
    180, 1, 0, 0, 0, 181, 182, 1, 0, 0, 0, 182, 183, 1, 0, 0, 0, 183, 184, 5, 47, 0, 0, 184, 188, 5,
    88, 0, 0, 185, 187, 3, 22, 11, 0, 186, 185, 1, 0, 0, 0, 187, 190, 1, 0, 0, 0, 188, 186, 1, 0, 0,
    0, 188, 189, 1, 0, 0, 0, 189, 191, 1, 0, 0, 0, 190, 188, 1, 0, 0, 0, 191, 192, 5, 35, 0, 0, 192,
    193, 5, 47, 0, 0, 193, 194, 5, 88, 0, 0, 194, 5, 1, 0, 0, 0, 195, 197, 5, 99, 0, 0, 196, 195, 1,
    0, 0, 0, 196, 197, 1, 0, 0, 0, 197, 198, 1, 0, 0, 0, 198, 199, 5, 40, 0, 0, 199, 200, 3, 76, 38,
    0, 200, 202, 5, 73, 0, 0, 201, 203, 3, 88, 44, 0, 202, 201, 1, 0, 0, 0, 202, 203, 1, 0, 0, 0,
    203, 204, 1, 0, 0, 0, 204, 205, 5, 74, 0, 0, 205, 206, 5, 55, 0, 0, 206, 207, 3, 90, 45, 0, 207,
    212, 5, 88, 0, 0, 208, 211, 3, 34, 17, 0, 209, 211, 3, 22, 11, 0, 210, 208, 1, 0, 0, 0, 210,
    209, 1, 0, 0, 0, 211, 214, 1, 0, 0, 0, 212, 210, 1, 0, 0, 0, 212, 213, 1, 0, 0, 0, 213, 215, 1,
    0, 0, 0, 214, 212, 1, 0, 0, 0, 215, 216, 3, 48, 24, 0, 216, 217, 5, 35, 0, 0, 217, 218, 5, 40,
    0, 0, 218, 219, 5, 88, 0, 0, 219, 7, 1, 0, 0, 0, 220, 222, 5, 99, 0, 0, 221, 220, 1, 0, 0, 0,
    221, 222, 1, 0, 0, 0, 222, 223, 1, 0, 0, 0, 223, 224, 5, 58, 0, 0, 224, 225, 3, 78, 39, 0, 225,
    232, 5, 88, 0, 0, 226, 231, 3, 32, 16, 0, 227, 231, 3, 34, 17, 0, 228, 231, 3, 38, 19, 0, 229,
    231, 3, 56, 28, 0, 230, 226, 1, 0, 0, 0, 230, 227, 1, 0, 0, 0, 230, 228, 1, 0, 0, 0, 230, 229,
    1, 0, 0, 0, 231, 234, 1, 0, 0, 0, 232, 230, 1, 0, 0, 0, 232, 233, 1, 0, 0, 0, 233, 235, 1, 0, 0,
    0, 234, 232, 1, 0, 0, 0, 235, 236, 5, 35, 0, 0, 236, 237, 5, 58, 0, 0, 237, 238, 5, 88, 0, 0,
    238, 9, 1, 0, 0, 0, 239, 241, 5, 99, 0, 0, 240, 239, 1, 0, 0, 0, 240, 241, 1, 0, 0, 0, 241, 242,
    1, 0, 0, 0, 242, 243, 5, 52, 0, 0, 243, 244, 3, 76, 38, 0, 244, 246, 5, 73, 0, 0, 245, 247, 3,
    88, 44, 0, 246, 245, 1, 0, 0, 0, 246, 247, 1, 0, 0, 0, 247, 248, 1, 0, 0, 0, 248, 249, 5, 74, 0,
    0, 249, 253, 5, 88, 0, 0, 250, 252, 3, 22, 11, 0, 251, 250, 1, 0, 0, 0, 252, 255, 1, 0, 0, 0,
    253, 251, 1, 0, 0, 0, 253, 254, 1, 0, 0, 0, 254, 256, 1, 0, 0, 0, 255, 253, 1, 0, 0, 0, 256,
    257, 5, 35, 0, 0, 257, 258, 5, 52, 0, 0, 258, 259, 5, 88, 0, 0, 259, 11, 1, 0, 0, 0, 260, 262,
    5, 99, 0, 0, 261, 260, 1, 0, 0, 0, 261, 262, 1, 0, 0, 0, 262, 263, 1, 0, 0, 0, 263, 264, 5, 29,
    0, 0, 264, 265, 3, 72, 36, 0, 265, 266, 5, 56, 0, 0, 266, 267, 5, 61, 0, 0, 267, 268, 3, 82, 41,
    0, 268, 269, 5, 88, 0, 0, 269, 13, 1, 0, 0, 0, 270, 272, 5, 99, 0, 0, 271, 270, 1, 0, 0, 0, 271,
    272, 1, 0, 0, 0, 272, 273, 1, 0, 0, 0, 273, 274, 5, 36, 0, 0, 274, 275, 3, 80, 40, 0, 275, 276,
    3, 92, 46, 0, 276, 277, 5, 88, 0, 0, 277, 15, 1, 0, 0, 0, 278, 280, 5, 99, 0, 0, 279, 278, 1, 0,
    0, 0, 279, 280, 1, 0, 0, 0, 280, 281, 1, 0, 0, 0, 281, 282, 5, 28, 0, 0, 282, 285, 3, 80, 40, 0,
    283, 284, 5, 43, 0, 0, 284, 286, 3, 80, 40, 0, 285, 283, 1, 0, 0, 0, 285, 286, 1, 0, 0, 0, 286,
    287, 1, 0, 0, 0, 287, 295, 5, 88, 0, 0, 288, 294, 3, 58, 29, 0, 289, 294, 3, 60, 30, 0, 290,
    294, 3, 62, 31, 0, 291, 294, 3, 64, 32, 0, 292, 294, 3, 70, 35, 0, 293, 288, 1, 0, 0, 0, 293,
    289, 1, 0, 0, 0, 293, 290, 1, 0, 0, 0, 293, 291, 1, 0, 0, 0, 293, 292, 1, 0, 0, 0, 294, 297, 1,
    0, 0, 0, 295, 293, 1, 0, 0, 0, 295, 296, 1, 0, 0, 0, 296, 298, 1, 0, 0, 0, 297, 295, 1, 0, 0, 0,
    298, 299, 5, 35, 0, 0, 299, 300, 5, 28, 0, 0, 300, 301, 5, 88, 0, 0, 301, 17, 1, 0, 0, 0, 302,
    304, 5, 99, 0, 0, 303, 302, 1, 0, 0, 0, 303, 304, 1, 0, 0, 0, 304, 305, 1, 0, 0, 0, 305, 306, 5,
    21, 0, 0, 306, 307, 5, 28, 0, 0, 307, 310, 3, 80, 40, 0, 308, 309, 5, 43, 0, 0, 309, 311, 3, 80,
    40, 0, 310, 308, 1, 0, 0, 0, 310, 311, 1, 0, 0, 0, 311, 312, 1, 0, 0, 0, 312, 321, 5, 88, 0, 0,
    313, 320, 3, 60, 30, 0, 314, 320, 3, 62, 31, 0, 315, 320, 3, 64, 32, 0, 316, 320, 3, 66, 33, 0,
    317, 320, 3, 68, 34, 0, 318, 320, 3, 70, 35, 0, 319, 313, 1, 0, 0, 0, 319, 314, 1, 0, 0, 0, 319,
    315, 1, 0, 0, 0, 319, 316, 1, 0, 0, 0, 319, 317, 1, 0, 0, 0, 319, 318, 1, 0, 0, 0, 320, 323, 1,
    0, 0, 0, 321, 319, 1, 0, 0, 0, 321, 322, 1, 0, 0, 0, 322, 324, 1, 0, 0, 0, 323, 321, 1, 0, 0, 0,
    324, 325, 5, 35, 0, 0, 325, 326, 5, 28, 0, 0, 326, 327, 5, 88, 0, 0, 327, 19, 1, 0, 0, 0, 328,
    329, 5, 67, 0, 0, 329, 330, 5, 88, 0, 0, 330, 21, 1, 0, 0, 0, 331, 343, 3, 36, 18, 0, 332, 343,
    3, 38, 19, 0, 333, 343, 3, 40, 20, 0, 334, 343, 3, 42, 21, 0, 335, 343, 3, 24, 12, 0, 336, 343,
    3, 26, 13, 0, 337, 343, 3, 28, 14, 0, 338, 343, 3, 44, 22, 0, 339, 343, 3, 30, 15, 0, 340, 343,
    3, 46, 23, 0, 341, 343, 3, 56, 28, 0, 342, 331, 1, 0, 0, 0, 342, 332, 1, 0, 0, 0, 342, 333, 1,
    0, 0, 0, 342, 334, 1, 0, 0, 0, 342, 335, 1, 0, 0, 0, 342, 336, 1, 0, 0, 0, 342, 337, 1, 0, 0, 0,
    342, 338, 1, 0, 0, 0, 342, 339, 1, 0, 0, 0, 342, 340, 1, 0, 0, 0, 342, 341, 1, 0, 0, 0, 343, 23,
    1, 0, 0, 0, 344, 346, 5, 99, 0, 0, 345, 344, 1, 0, 0, 0, 345, 346, 1, 0, 0, 0, 346, 347, 1, 0,
    0, 0, 347, 348, 5, 41, 0, 0, 348, 349, 3, 114, 57, 0, 349, 350, 5, 59, 0, 0, 350, 356, 5, 88, 0,
    0, 351, 355, 3, 50, 25, 0, 352, 355, 3, 52, 26, 0, 353, 355, 3, 22, 11, 0, 354, 351, 1, 0, 0, 0,
    354, 352, 1, 0, 0, 0, 354, 353, 1, 0, 0, 0, 355, 358, 1, 0, 0, 0, 356, 354, 1, 0, 0, 0, 356,
    357, 1, 0, 0, 0, 357, 359, 1, 0, 0, 0, 358, 356, 1, 0, 0, 0, 359, 360, 5, 35, 0, 0, 360, 361, 5,
    41, 0, 0, 361, 362, 5, 88, 0, 0, 362, 25, 1, 0, 0, 0, 363, 365, 5, 99, 0, 0, 364, 363, 1, 0, 0,
    0, 364, 365, 1, 0, 0, 0, 365, 366, 1, 0, 0, 0, 366, 367, 5, 64, 0, 0, 367, 368, 3, 114, 57, 0,
    368, 372, 5, 88, 0, 0, 369, 371, 3, 22, 11, 0, 370, 369, 1, 0, 0, 0, 371, 374, 1, 0, 0, 0, 372,
    370, 1, 0, 0, 0, 372, 373, 1, 0, 0, 0, 373, 375, 1, 0, 0, 0, 374, 372, 1, 0, 0, 0, 375, 376, 5,
    35, 0, 0, 376, 377, 5, 64, 0, 0, 377, 378, 5, 88, 0, 0, 378, 27, 1, 0, 0, 0, 379, 381, 5, 99, 0,
    0, 380, 379, 1, 0, 0, 0, 380, 381, 1, 0, 0, 0, 381, 382, 1, 0, 0, 0, 382, 383, 5, 38, 0, 0, 383,
    384, 3, 72, 36, 0, 384, 385, 5, 42, 0, 0, 385, 386, 3, 114, 57, 0, 386, 390, 5, 88, 0, 0, 387,
    389, 3, 22, 11, 0, 388, 387, 1, 0, 0, 0, 389, 392, 1, 0, 0, 0, 390, 388, 1, 0, 0, 0, 390, 391,
    1, 0, 0, 0, 391, 393, 1, 0, 0, 0, 392, 390, 1, 0, 0, 0, 393, 394, 5, 35, 0, 0, 394, 395, 5, 38,
    0, 0, 395, 396, 5, 88, 0, 0, 396, 29, 1, 0, 0, 0, 397, 399, 5, 99, 0, 0, 398, 397, 1, 0, 0, 0,
    398, 399, 1, 0, 0, 0, 399, 400, 1, 0, 0, 0, 400, 401, 5, 62, 0, 0, 401, 405, 5, 88, 0, 0, 402,
    404, 3, 22, 11, 0, 403, 402, 1, 0, 0, 0, 404, 407, 1, 0, 0, 0, 405, 403, 1, 0, 0, 0, 405, 406,
    1, 0, 0, 0, 406, 408, 1, 0, 0, 0, 407, 405, 1, 0, 0, 0, 408, 412, 3, 54, 27, 0, 409, 411, 3, 22,
    11, 0, 410, 409, 1, 0, 0, 0, 411, 414, 1, 0, 0, 0, 412, 410, 1, 0, 0, 0, 412, 413, 1, 0, 0, 0,
    413, 415, 1, 0, 0, 0, 414, 412, 1, 0, 0, 0, 415, 416, 5, 35, 0, 0, 416, 417, 5, 62, 0, 0, 417,
    418, 5, 88, 0, 0, 418, 31, 1, 0, 0, 0, 419, 421, 5, 99, 0, 0, 420, 419, 1, 0, 0, 0, 420, 421, 1,
    0, 0, 0, 421, 422, 1, 0, 0, 0, 422, 423, 5, 23, 0, 0, 423, 424, 3, 94, 47, 0, 424, 425, 5, 37,
    0, 0, 425, 426, 5, 61, 0, 0, 426, 427, 3, 114, 57, 0, 427, 428, 5, 88, 0, 0, 428, 33, 1, 0, 0,
    0, 429, 431, 5, 99, 0, 0, 430, 429, 1, 0, 0, 0, 430, 431, 1, 0, 0, 0, 431, 432, 1, 0, 0, 0, 432,
    433, 5, 46, 0, 0, 433, 434, 3, 72, 36, 0, 434, 435, 5, 25, 0, 0, 435, 436, 3, 114, 57, 0, 436,
    437, 5, 88, 0, 0, 437, 35, 1, 0, 0, 0, 438, 440, 5, 99, 0, 0, 439, 438, 1, 0, 0, 0, 439, 440, 1,
    0, 0, 0, 440, 441, 1, 0, 0, 0, 441, 442, 5, 50, 0, 0, 442, 444, 5, 73, 0, 0, 443, 445, 3, 114,
    57, 0, 444, 443, 1, 0, 0, 0, 444, 445, 1, 0, 0, 0, 445, 446, 1, 0, 0, 0, 446, 447, 5, 74, 0, 0,
    447, 448, 5, 88, 0, 0, 448, 37, 1, 0, 0, 0, 449, 451, 5, 99, 0, 0, 450, 449, 1, 0, 0, 0, 450,
    451, 1, 0, 0, 0, 451, 452, 1, 0, 0, 0, 452, 453, 5, 63, 0, 0, 453, 454, 3, 72, 36, 0, 454, 455,
    5, 56, 0, 0, 455, 456, 5, 61, 0, 0, 456, 457, 3, 114, 57, 0, 457, 458, 5, 88, 0, 0, 458, 39, 1,
    0, 0, 0, 459, 461, 5, 99, 0, 0, 460, 459, 1, 0, 0, 0, 460, 461, 1, 0, 0, 0, 461, 462, 1, 0, 0,
    0, 462, 463, 5, 24, 0, 0, 463, 464, 3, 74, 37, 0, 464, 465, 5, 61, 0, 0, 465, 466, 3, 114, 57,
    0, 466, 467, 5, 88, 0, 0, 467, 41, 1, 0, 0, 0, 468, 470, 5, 99, 0, 0, 469, 468, 1, 0, 0, 0, 469,
    470, 1, 0, 0, 0, 470, 471, 1, 0, 0, 0, 471, 472, 5, 44, 0, 0, 472, 473, 3, 72, 36, 0, 473, 474,
    5, 56, 0, 0, 474, 475, 5, 61, 0, 0, 475, 476, 3, 76, 38, 0, 476, 477, 5, 73, 0, 0, 477, 478, 3,
    114, 57, 0, 478, 479, 5, 74, 0, 0, 479, 480, 5, 88, 0, 0, 480, 43, 1, 0, 0, 0, 481, 483, 5, 99,
    0, 0, 482, 481, 1, 0, 0, 0, 482, 483, 1, 0, 0, 0, 483, 484, 1, 0, 0, 0, 484, 485, 5, 26, 0, 0,
    485, 486, 3, 116, 58, 0, 486, 487, 5, 88, 0, 0, 487, 45, 1, 0, 0, 0, 488, 490, 5, 99, 0, 0, 489,
    488, 1, 0, 0, 0, 489, 490, 1, 0, 0, 0, 490, 491, 1, 0, 0, 0, 491, 492, 5, 60, 0, 0, 492, 493, 3,
    80, 40, 0, 493, 494, 3, 106, 53, 0, 494, 495, 5, 88, 0, 0, 495, 47, 1, 0, 0, 0, 496, 497, 5, 54,
    0, 0, 497, 498, 3, 114, 57, 0, 498, 499, 5, 88, 0, 0, 499, 49, 1, 0, 0, 0, 500, 502, 5, 99, 0,
    0, 501, 500, 1, 0, 0, 0, 501, 502, 1, 0, 0, 0, 502, 503, 1, 0, 0, 0, 503, 504, 5, 33, 0, 0, 504,
    505, 3, 114, 57, 0, 505, 506, 5, 59, 0, 0, 506, 507, 5, 88, 0, 0, 507, 51, 1, 0, 0, 0, 508, 510,
    5, 99, 0, 0, 509, 508, 1, 0, 0, 0, 509, 510, 1, 0, 0, 0, 510, 511, 1, 0, 0, 0, 511, 512, 5, 34,
    0, 0, 512, 513, 5, 88, 0, 0, 513, 53, 1, 0, 0, 0, 514, 516, 5, 99, 0, 0, 515, 514, 1, 0, 0, 0,
    515, 516, 1, 0, 0, 0, 516, 517, 1, 0, 0, 0, 517, 518, 5, 27, 0, 0, 518, 519, 3, 72, 36, 0, 519,
    520, 5, 22, 0, 0, 520, 521, 3, 80, 40, 0, 521, 522, 5, 88, 0, 0, 522, 55, 1, 0, 0, 0, 523, 524,
    5, 67, 0, 0, 524, 525, 5, 88, 0, 0, 525, 57, 1, 0, 0, 0, 526, 528, 5, 99, 0, 0, 527, 526, 1, 0,
    0, 0, 527, 528, 1, 0, 0, 0, 528, 529, 1, 0, 0, 0, 529, 530, 5, 30, 0, 0, 530, 532, 5, 73, 0, 0,
    531, 533, 3, 88, 44, 0, 532, 531, 1, 0, 0, 0, 532, 533, 1, 0, 0, 0, 533, 534, 1, 0, 0, 0, 534,
    535, 5, 74, 0, 0, 535, 539, 5, 88, 0, 0, 536, 538, 3, 22, 11, 0, 537, 536, 1, 0, 0, 0, 538, 541,
    1, 0, 0, 0, 539, 537, 1, 0, 0, 0, 539, 540, 1, 0, 0, 0, 540, 542, 1, 0, 0, 0, 541, 539, 1, 0, 0,
    0, 542, 543, 5, 35, 0, 0, 543, 544, 5, 30, 0, 0, 544, 545, 5, 88, 0, 0, 545, 59, 1, 0, 0, 0,
    546, 548, 5, 51, 0, 0, 547, 546, 1, 0, 0, 0, 547, 548, 1, 0, 0, 0, 548, 549, 1, 0, 0, 0, 549,
    550, 5, 53, 0, 0, 550, 551, 3, 72, 36, 0, 551, 552, 5, 22, 0, 0, 552, 553, 3, 90, 45, 0, 553,
    554, 5, 88, 0, 0, 554, 61, 1, 0, 0, 0, 555, 557, 5, 99, 0, 0, 556, 555, 1, 0, 0, 0, 556, 557, 1,
    0, 0, 0, 557, 559, 1, 0, 0, 0, 558, 560, 5, 51, 0, 0, 559, 558, 1, 0, 0, 0, 559, 560, 1, 0, 0,
    0, 560, 561, 1, 0, 0, 0, 561, 562, 5, 40, 0, 0, 562, 563, 3, 76, 38, 0, 563, 565, 5, 73, 0, 0,
    564, 566, 3, 88, 44, 0, 565, 564, 1, 0, 0, 0, 565, 566, 1, 0, 0, 0, 566, 567, 1, 0, 0, 0, 567,
    568, 5, 74, 0, 0, 568, 569, 5, 55, 0, 0, 569, 570, 3, 90, 45, 0, 570, 575, 5, 88, 0, 0, 571,
    574, 3, 34, 17, 0, 572, 574, 3, 22, 11, 0, 573, 571, 1, 0, 0, 0, 573, 572, 1, 0, 0, 0, 574, 577,
    1, 0, 0, 0, 575, 573, 1, 0, 0, 0, 575, 576, 1, 0, 0, 0, 576, 578, 1, 0, 0, 0, 577, 575, 1, 0, 0,
    0, 578, 579, 3, 48, 24, 0, 579, 580, 5, 35, 0, 0, 580, 581, 5, 40, 0, 0, 581, 582, 5, 88, 0, 0,
    582, 63, 1, 0, 0, 0, 583, 585, 5, 99, 0, 0, 584, 583, 1, 0, 0, 0, 584, 585, 1, 0, 0, 0, 585,
    587, 1, 0, 0, 0, 586, 588, 5, 51, 0, 0, 587, 586, 1, 0, 0, 0, 587, 588, 1, 0, 0, 0, 588, 589, 1,
    0, 0, 0, 589, 590, 5, 52, 0, 0, 590, 591, 3, 76, 38, 0, 591, 593, 5, 73, 0, 0, 592, 594, 3, 88,
    44, 0, 593, 592, 1, 0, 0, 0, 593, 594, 1, 0, 0, 0, 594, 595, 1, 0, 0, 0, 595, 596, 5, 74, 0, 0,
    596, 600, 5, 88, 0, 0, 597, 599, 3, 22, 11, 0, 598, 597, 1, 0, 0, 0, 599, 602, 1, 0, 0, 0, 600,
    598, 1, 0, 0, 0, 600, 601, 1, 0, 0, 0, 601, 603, 1, 0, 0, 0, 602, 600, 1, 0, 0, 0, 603, 604, 5,
    35, 0, 0, 604, 605, 5, 52, 0, 0, 605, 606, 5, 88, 0, 0, 606, 65, 1, 0, 0, 0, 607, 609, 5, 99, 0,
    0, 608, 607, 1, 0, 0, 0, 608, 609, 1, 0, 0, 0, 609, 610, 1, 0, 0, 0, 610, 611, 5, 21, 0, 0, 611,
    612, 5, 40, 0, 0, 612, 613, 3, 76, 38, 0, 613, 615, 5, 73, 0, 0, 614, 616, 3, 88, 44, 0, 615,
    614, 1, 0, 0, 0, 615, 616, 1, 0, 0, 0, 616, 617, 1, 0, 0, 0, 617, 618, 5, 74, 0, 0, 618, 619, 5,
    55, 0, 0, 619, 620, 3, 90, 45, 0, 620, 621, 5, 88, 0, 0, 621, 67, 1, 0, 0, 0, 622, 624, 5, 99,
    0, 0, 623, 622, 1, 0, 0, 0, 623, 624, 1, 0, 0, 0, 624, 625, 1, 0, 0, 0, 625, 626, 5, 21, 0, 0,
    626, 627, 5, 52, 0, 0, 627, 628, 3, 76, 38, 0, 628, 630, 5, 73, 0, 0, 629, 631, 3, 88, 44, 0,
    630, 629, 1, 0, 0, 0, 630, 631, 1, 0, 0, 0, 631, 632, 1, 0, 0, 0, 632, 633, 5, 74, 0, 0, 633,
    634, 5, 88, 0, 0, 634, 69, 1, 0, 0, 0, 635, 637, 5, 67, 0, 0, 636, 635, 1, 0, 0, 0, 636, 637, 1,
    0, 0, 0, 637, 638, 1, 0, 0, 0, 638, 639, 5, 88, 0, 0, 639, 71, 1, 0, 0, 0, 640, 641, 5, 90, 0,
    0, 641, 73, 1, 0, 0, 0, 642, 645, 3, 110, 55, 0, 643, 645, 3, 112, 56, 0, 644, 642, 1, 0, 0, 0,
    644, 643, 1, 0, 0, 0, 645, 75, 1, 0, 0, 0, 646, 647, 5, 90, 0, 0, 647, 77, 1, 0, 0, 0, 648, 649,
    5, 89, 0, 0, 649, 79, 1, 0, 0, 0, 650, 651, 7, 0, 0, 0, 651, 81, 1, 0, 0, 0, 652, 655, 3, 96,
    48, 0, 653, 655, 3, 72, 36, 0, 654, 652, 1, 0, 0, 0, 654, 653, 1, 0, 0, 0, 655, 83, 1, 0, 0, 0,
    656, 661, 3, 86, 43, 0, 657, 658, 5, 76, 0, 0, 658, 660, 3, 86, 43, 0, 659, 657, 1, 0, 0, 0,
    660, 663, 1, 0, 0, 0, 661, 659, 1, 0, 0, 0, 661, 662, 1, 0, 0, 0, 662, 85, 1, 0, 0, 0, 663, 661,
    1, 0, 0, 0, 664, 667, 3, 144, 72, 0, 665, 667, 3, 114, 57, 0, 666, 664, 1, 0, 0, 0, 666, 665, 1,
    0, 0, 0, 667, 87, 1, 0, 0, 0, 668, 673, 3, 136, 68, 0, 669, 670, 5, 76, 0, 0, 670, 672, 3, 136,
    68, 0, 671, 669, 1, 0, 0, 0, 672, 675, 1, 0, 0, 0, 673, 671, 1, 0, 0, 0, 673, 674, 1, 0, 0, 0,
    674, 89, 1, 0, 0, 0, 675, 673, 1, 0, 0, 0, 676, 681, 3, 142, 71, 0, 677, 681, 3, 80, 40, 0, 678,
    681, 3, 138, 69, 0, 679, 681, 3, 140, 70, 0, 680, 676, 1, 0, 0, 0, 680, 677, 1, 0, 0, 0, 680,
    678, 1, 0, 0, 0, 680, 679, 1, 0, 0, 0, 681, 91, 1, 0, 0, 0, 682, 687, 3, 72, 36, 0, 683, 684, 5,
    76, 0, 0, 684, 686, 3, 72, 36, 0, 685, 683, 1, 0, 0, 0, 686, 689, 1, 0, 0, 0, 687, 685, 1, 0, 0,
    0, 687, 688, 1, 0, 0, 0, 688, 93, 1, 0, 0, 0, 689, 687, 1, 0, 0, 0, 690, 691, 3, 114, 57, 0,
    691, 95, 1, 0, 0, 0, 692, 699, 1, 0, 0, 0, 693, 699, 3, 98, 49, 0, 694, 699, 3, 100, 50, 0, 695,
    699, 3, 102, 51, 0, 696, 699, 3, 106, 53, 0, 697, 699, 3, 104, 52, 0, 698, 692, 1, 0, 0, 0, 698,
    693, 1, 0, 0, 0, 698, 694, 1, 0, 0, 0, 698, 695, 1, 0, 0, 0, 698, 696, 1, 0, 0, 0, 698, 697, 1,
    0, 0, 0, 699, 97, 1, 0, 0, 0, 700, 701, 7, 1, 0, 0, 701, 99, 1, 0, 0, 0, 702, 703, 7, 2, 0, 0,
    703, 101, 1, 0, 0, 0, 704, 705, 5, 95, 0, 0, 705, 103, 1, 0, 0, 0, 706, 707, 3, 80, 40, 0, 707,
    708, 5, 75, 0, 0, 708, 709, 3, 72, 36, 0, 709, 105, 1, 0, 0, 0, 710, 712, 5, 19, 0, 0, 711, 710,
    1, 0, 0, 0, 711, 712, 1, 0, 0, 0, 712, 713, 1, 0, 0, 0, 713, 714, 5, 96, 0, 0, 714, 107, 1, 0,
    0, 0, 715, 716, 5, 71, 0, 0, 716, 717, 3, 114, 57, 0, 717, 718, 5, 72, 0, 0, 718, 109, 1, 0, 0,
    0, 719, 723, 3, 72, 36, 0, 720, 722, 3, 108, 54, 0, 721, 720, 1, 0, 0, 0, 722, 725, 1, 0, 0, 0,
    723, 721, 1, 0, 0, 0, 723, 724, 1, 0, 0, 0, 724, 111, 1, 0, 0, 0, 725, 723, 1, 0, 0, 0, 726,
    727, 5, 20, 0, 0, 727, 728, 5, 75, 0, 0, 728, 729, 3, 110, 55, 0, 729, 113, 1, 0, 0, 0, 730,
    731, 6, 57, -1, 0, 731, 744, 3, 134, 67, 0, 732, 744, 3, 124, 62, 0, 733, 744, 3, 116, 58, 0,
    734, 735, 5, 66, 0, 0, 735, 736, 5, 73, 0, 0, 736, 737, 3, 114, 57, 0, 737, 738, 5, 76, 0, 0,
    738, 739, 3, 114, 57, 0, 739, 740, 5, 76, 0, 0, 740, 741, 3, 114, 57, 0, 741, 742, 5, 74, 0, 0,
    742, 744, 1, 0, 0, 0, 743, 730, 1, 0, 0, 0, 743, 732, 1, 0, 0, 0, 743, 733, 1, 0, 0, 0, 743,
    734, 1, 0, 0, 0, 744, 751, 1, 0, 0, 0, 745, 746, 10, 2, 0, 0, 746, 747, 3, 132, 66, 0, 747, 748,
    3, 114, 57, 3, 748, 750, 1, 0, 0, 0, 749, 745, 1, 0, 0, 0, 750, 753, 1, 0, 0, 0, 751, 749, 1, 0,
    0, 0, 751, 752, 1, 0, 0, 0, 752, 115, 1, 0, 0, 0, 753, 751, 1, 0, 0, 0, 754, 759, 3, 118, 59, 0,
    755, 756, 5, 75, 0, 0, 756, 758, 3, 120, 60, 0, 757, 755, 1, 0, 0, 0, 758, 761, 1, 0, 0, 0, 759,
    757, 1, 0, 0, 0, 759, 760, 1, 0, 0, 0, 760, 117, 1, 0, 0, 0, 761, 759, 1, 0, 0, 0, 762, 769, 5,
    20, 0, 0, 763, 769, 3, 122, 61, 0, 764, 769, 3, 128, 64, 0, 765, 769, 3, 96, 48, 0, 766, 769, 3,
    146, 73, 0, 767, 769, 3, 120, 60, 0, 768, 762, 1, 0, 0, 0, 768, 763, 1, 0, 0, 0, 768, 764, 1, 0,
    0, 0, 768, 765, 1, 0, 0, 0, 768, 766, 1, 0, 0, 0, 768, 767, 1, 0, 0, 0, 769, 119, 1, 0, 0, 0,
    770, 773, 3, 72, 36, 0, 771, 773, 3, 130, 65, 0, 772, 770, 1, 0, 0, 0, 772, 771, 1, 0, 0, 0,
    773, 777, 1, 0, 0, 0, 774, 776, 3, 108, 54, 0, 775, 774, 1, 0, 0, 0, 776, 779, 1, 0, 0, 0, 777,
    775, 1, 0, 0, 0, 777, 778, 1, 0, 0, 0, 778, 121, 1, 0, 0, 0, 779, 777, 1, 0, 0, 0, 780, 781, 5,
    73, 0, 0, 781, 782, 3, 114, 57, 0, 782, 783, 5, 74, 0, 0, 783, 123, 1, 0, 0, 0, 784, 785, 7, 3,
    0, 0, 785, 786, 3, 116, 58, 0, 786, 125, 1, 0, 0, 0, 787, 788, 3, 116, 58, 0, 788, 789, 3, 132,
    66, 0, 789, 790, 3, 114, 57, 0, 790, 127, 1, 0, 0, 0, 791, 792, 5, 73, 0, 0, 792, 793, 3, 114,
    57, 0, 793, 794, 5, 76, 0, 0, 794, 799, 3, 114, 57, 0, 795, 796, 5, 76, 0, 0, 796, 798, 3, 114,
    57, 0, 797, 795, 1, 0, 0, 0, 798, 801, 1, 0, 0, 0, 799, 797, 1, 0, 0, 0, 799, 800, 1, 0, 0, 0,
    800, 802, 1, 0, 0, 0, 801, 799, 1, 0, 0, 0, 802, 803, 5, 74, 0, 0, 803, 129, 1, 0, 0, 0, 804,
    805, 3, 76, 38, 0, 805, 807, 5, 73, 0, 0, 806, 808, 3, 84, 42, 0, 807, 806, 1, 0, 0, 0, 807,
    808, 1, 0, 0, 0, 808, 809, 1, 0, 0, 0, 809, 810, 5, 74, 0, 0, 810, 131, 1, 0, 0, 0, 811, 812, 7,
    4, 0, 0, 812, 133, 1, 0, 0, 0, 813, 814, 5, 48, 0, 0, 814, 815, 3, 90, 45, 0, 815, 817, 5, 73,
    0, 0, 816, 818, 3, 84, 42, 0, 817, 816, 1, 0, 0, 0, 817, 818, 1, 0, 0, 0, 818, 819, 1, 0, 0, 0,
    819, 820, 5, 74, 0, 0, 820, 135, 1, 0, 0, 0, 821, 822, 3, 72, 36, 0, 822, 823, 5, 22, 0, 0, 823,
    824, 3, 90, 45, 0, 824, 137, 1, 0, 0, 0, 825, 826, 3, 80, 40, 0, 826, 827, 5, 82, 0, 0, 827,
    828, 5, 49, 0, 0, 828, 833, 3, 90, 45, 0, 829, 830, 5, 76, 0, 0, 830, 832, 3, 90, 45, 0, 831,
    829, 1, 0, 0, 0, 832, 835, 1, 0, 0, 0, 833, 831, 1, 0, 0, 0, 833, 834, 1, 0, 0, 0, 834, 836, 1,
    0, 0, 0, 835, 833, 1, 0, 0, 0, 836, 837, 5, 83, 0, 0, 837, 139, 1, 0, 0, 0, 838, 839, 5, 7, 0,
    0, 839, 840, 5, 82, 0, 0, 840, 841, 5, 49, 0, 0, 841, 846, 3, 90, 45, 0, 842, 843, 5, 76, 0, 0,
    843, 845, 3, 90, 45, 0, 844, 842, 1, 0, 0, 0, 845, 848, 1, 0, 0, 0, 846, 844, 1, 0, 0, 0, 846,
    847, 1, 0, 0, 0, 847, 849, 1, 0, 0, 0, 848, 846, 1, 0, 0, 0, 849, 850, 5, 16, 0, 0, 850, 851, 3,
    90, 45, 0, 851, 852, 5, 83, 0, 0, 852, 141, 1, 0, 0, 0, 853, 854, 5, 73, 0, 0, 854, 857, 3, 90,
    45, 0, 855, 856, 5, 76, 0, 0, 856, 858, 3, 90, 45, 0, 857, 855, 1, 0, 0, 0, 858, 859, 1, 0, 0,
    0, 859, 857, 1, 0, 0, 0, 859, 860, 1, 0, 0, 0, 860, 861, 1, 0, 0, 0, 861, 862, 5, 74, 0, 0, 862,
    143, 1, 0, 0, 0, 863, 866, 5, 45, 0, 0, 864, 867, 3, 88, 44, 0, 865, 867, 3, 84, 42, 0, 866,
    864, 1, 0, 0, 0, 866, 865, 1, 0, 0, 0, 867, 868, 1, 0, 0, 0, 868, 869, 5, 16, 0, 0, 869, 870, 3,
    114, 57, 0, 870, 145, 1, 0, 0, 0, 871, 872, 5, 71, 0, 0, 872, 877, 3, 114, 57, 0, 873, 874, 5,
    76, 0, 0, 874, 876, 3, 114, 57, 0, 875, 873, 1, 0, 0, 0, 876, 879, 1, 0, 0, 0, 877, 875, 1, 0,
    0, 0, 877, 878, 1, 0, 0, 0, 878, 880, 1, 0, 0, 0, 879, 877, 1, 0, 0, 0, 880, 881, 5, 72, 0, 0,
    881, 147, 1, 0, 0, 0, 882, 883, 5, 19, 0, 0, 883, 884, 5, 96, 0, 0, 884, 149, 1, 0, 0, 0, 885,
    886, 3, 116, 58, 0, 886, 887, 5, 65, 0, 0, 887, 888, 3, 116, 58, 0, 888, 151, 1, 0, 0, 0, 91,
    153, 158, 164, 178, 181, 188, 196, 202, 210, 212, 221, 230, 232, 240, 246, 253, 261, 271, 279,
    285, 293, 295, 303, 310, 319, 321, 342, 345, 354, 356, 364, 372, 380, 390, 398, 405, 412, 420,
    430, 439, 444, 450, 460, 469, 482, 489, 501, 509, 515, 527, 532, 539, 547, 556, 559, 565, 573,
    575, 584, 587, 593, 600, 608, 615, 623, 630, 636, 644, 654, 661, 666, 673, 680, 687, 698, 711,
    723, 743, 751, 759, 768, 772, 777, 799, 807, 817, 833, 846, 859, 866, 877,
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
  public COMMENT(): antlr.TerminalNode | null {
    return this.getToken(RefLangParser.COMMENT, 0);
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
  public commentGlobal(): CommentGlobalContext | null {
    return this.getRuleContext(0, CommentGlobalContext);
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
  public commentStatement(): CommentStatementContext[];
  public commentStatement(i: number): CommentStatementContext | null;
  public commentStatement(i?: number): CommentStatementContext[] | CommentStatementContext | null {
    if (i === undefined) {
      return this.getRuleContexts(CommentStatementContext);
    }

    return this.getRuleContext(i, CommentStatementContext);
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
  public commentMember(): CommentMemberContext[];
  public commentMember(i: number): CommentMemberContext | null;
  public commentMember(i?: number): CommentMemberContext[] | CommentMemberContext | null {
    if (i === undefined) {
      return this.getRuleContexts(CommentMemberContext);
    }

    return this.getRuleContext(i, CommentMemberContext);
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
  public commentMember(): CommentMemberContext[];
  public commentMember(i: number): CommentMemberContext | null;
  public commentMember(i?: number): CommentMemberContext[] | CommentMemberContext | null {
    if (i === undefined) {
      return this.getRuleContexts(CommentMemberContext);
    }

    return this.getRuleContext(i, CommentMemberContext);
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

export class CommentGlobalContext extends antlr.ParserRuleContext {
  public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
    super(parent, invokingState);
  }
  public COMMENT(): antlr.TerminalNode {
    return this.getToken(RefLangParser.COMMENT, 0)!;
  }
  public NL(): antlr.TerminalNode {
    return this.getToken(RefLangParser.NL, 0)!;
  }
  public override get ruleIndex(): number {
    return RefLangParser.RULE_commentGlobal;
  }
  public override enterRule(listener: RefLangListener): void {
    if (listener.enterCommentGlobal) {
      listener.enterCommentGlobal(this);
    }
  }
  public override exitRule(listener: RefLangListener): void {
    if (listener.exitCommentGlobal) {
      listener.exitCommentGlobal(this);
    }
  }
  public override accept<Result>(visitor: RefLangVisitor<Result>): Result | null {
    if (visitor.visitCommentGlobal) {
      return visitor.visitCommentGlobal(this);
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
  public commentStatement(): CommentStatementContext | null {
    return this.getRuleContext(0, CommentStatementContext);
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

export class CommentStatementContext extends antlr.ParserRuleContext {
  public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
    super(parent, invokingState);
  }
  public COMMENT(): antlr.TerminalNode {
    return this.getToken(RefLangParser.COMMENT, 0)!;
  }
  public NL(): antlr.TerminalNode {
    return this.getToken(RefLangParser.NL, 0)!;
  }
  public override get ruleIndex(): number {
    return RefLangParser.RULE_commentStatement;
  }
  public override enterRule(listener: RefLangListener): void {
    if (listener.enterCommentStatement) {
      listener.enterCommentStatement(this);
    }
  }
  public override exitRule(listener: RefLangListener): void {
    if (listener.exitCommentStatement) {
      listener.exitCommentStatement(this);
    }
  }
  public override accept<Result>(visitor: RefLangVisitor<Result>): Result | null {
    if (visitor.visitCommentStatement) {
      return visitor.visitCommentStatement(this);
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

export class CommentMemberContext extends antlr.ParserRuleContext {
  public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
    super(parent, invokingState);
  }
  public NL(): antlr.TerminalNode {
    return this.getToken(RefLangParser.NL, 0)!;
  }
  public COMMENT(): antlr.TerminalNode | null {
    return this.getToken(RefLangParser.COMMENT, 0);
  }
  public override get ruleIndex(): number {
    return RefLangParser.RULE_commentMember;
  }
  public override enterRule(listener: RefLangListener): void {
    if (listener.enterCommentMember) {
      listener.enterCommentMember(this);
    }
  }
  public override exitRule(listener: RefLangListener): void {
    if (listener.exitCommentMember) {
      listener.exitCommentMember(this);
    }
  }
  public override accept<Result>(visitor: RefLangVisitor<Result>): Result | null {
    if (visitor.visitCommentMember) {
      return visitor.visitCommentMember(this);
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
  public THIS_INSTANCE(): antlr.TerminalNode | null {
    return this.getToken(RefLangParser.THIS_INSTANCE, 0);
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
  public term(): TermContext {
    return this.getRuleContext(0, TermContext)!;
  }
  public MINUS(): antlr.TerminalNode | null {
    return this.getToken(RefLangParser.MINUS, 0);
  }
  public NOT(): antlr.TerminalNode | null {
    return this.getToken(RefLangParser.NOT, 0);
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
