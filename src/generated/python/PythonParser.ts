// Generated from src/grammars/python/Python.g4 by ANTLR 4.13.1

import * as antlr from "antlr4ng";
import { Token } from "antlr4ng";

import { PythonListener } from "./PythonListener.js";
import { PythonVisitor } from "./PythonVisitor.js";

// for running tests with parameters, TODO: discuss strategy for typed parameters in CI
// eslint-disable-next-line no-unused-vars
type int = number;

export class PythonParser extends antlr.Parser {
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
  public static readonly ABSTRACT_METHOD = 21;
  public static readonly ASSERT_EQUAL = 22;
  public static readonly AS = 23;
  public static readonly DEF = 24;
  public static readonly CLASS = 25;
  public static readonly ELIF = 26;
  public static readonly ELSE = 27;
  public static readonly EXCEPT = 28;
  public static readonly FOR = 29;
  public static readonly IF = 30;
  public static readonly IN = 31;
  public static readonly INIT = 32;
  public static readonly INPUT = 33;
  public static readonly LAMBDA = 34;
  public static readonly MAIN = 35;
  public static readonly NONE = 36;
  public static readonly PASS = 37;
  public static readonly PRINT = 38;
  public static readonly RAISE = 39;
  public static readonly RETURN = 40;
  public static readonly TRY = 41;
  public static readonly WHILE = 42;
  public static readonly ABC = 43;
  public static readonly ENUM = 44;
  public static readonly TESTCASE = 45;
  public static readonly POWER = 46;
  public static readonly TUPLE = 47;
  public static readonly IF_ = 48;
  public static readonly COMMENT = 49;
  public static readonly SINGLE_EQUALS = 50;
  public static readonly OPEN_BRACE = 51;
  public static readonly CLOSE_BRACE = 52;
  public static readonly OPEN_SQ_BRACKET = 53;
  public static readonly CLOSE_SQ_BRACKET = 54;
  public static readonly OPEN_BRACKET = 55;
  public static readonly CLOSE_BRACKET = 56;
  public static readonly DOT = 57;
  public static readonly COMMA = 58;
  public static readonly COLON = 59;
  public static readonly PLUS = 60;
  public static readonly MINUS = 61;
  public static readonly MULT = 62;
  public static readonly DIVIDE = 63;
  public static readonly LT = 64;
  public static readonly GT = 65;
  public static readonly LE = 66;
  public static readonly GE = 67;
  public static readonly DOUBLE_QUOTES = 68;
  public static readonly WS = 69;
  public static readonly NL = 70;
  public static readonly NAME_STARTING_TEST_ = 71;
  public static readonly NAME_STARTING_LC = 72;
  public static readonly NAME_STARTING_UC = 73;
  public static readonly LITERAL_BINARY = 74;
  public static readonly LITERAL_HEX = 75;
  public static readonly LITERAL_INTEGER = 76;
  public static readonly LITERAL_FLOAT = 77;
  public static readonly LITERAL_STRING = 78;
  public static readonly WHITESPACES = 79;
  public static readonly TEXT = 80;
  public static readonly GHOSTED = 81;
  public static readonly FUNCTION_ANNOTATION = 82;
  public static readonly PROCECDURE_ANNOTATION = 83;
  public static readonly CONSTANT_ANNOTATION = 84;
  public static readonly ENUM_ANNOTATION = 85;
  public static readonly CONCRETE_CLASS_ANNOTATION = 86;
  public static readonly ABSTRACT_CLASS_ANNOTATION = 87;
  public static readonly VARIABLE_ANNOTATION = 88;
  public static readonly ASSIGNMENT_ANNOTATION = 89;
  public static readonly INPUT_ANNOTATION = 90;
  public static readonly CALL_ANNOTATION = 91;
  public static readonly LET_ANNOTATION = 92;
  public static readonly ELSE_IF_ANNOTATION = 93;
  public static readonly PROPERTY_ANNOTATION = 94;
  public static readonly FUNCTION_METHOD_ANNOTATION = 95;
  public static readonly PROCEDURE_METHOD_ANNOTATION = 96;
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
  public static readonly RULE_print = 12;
  public static readonly RULE_variableDefinition = 13;
  public static readonly RULE_assignment = 14;
  public static readonly RULE_inputStatement = 15;
  public static readonly RULE_ifStatement = 16;
  public static readonly RULE_whileLoop = 17;
  public static readonly RULE_forLoop = 18;
  public static readonly RULE_procedureCall = 19;
  public static readonly RULE_tryStatement = 20;
  public static readonly RULE_throwStatement = 21;
  public static readonly RULE_commentStatement = 22;
  public static readonly RULE_assert = 23;
  public static readonly RULE_letStatement = 24;
  public static readonly RULE_returnStatement = 25;
  public static readonly RULE_elseIfClause = 26;
  public static readonly RULE_elseClause = 27;
  public static readonly RULE_catchStatement = 28;
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
    "'0b'",
    "'0x'",
    "'f'",
    "'self'",
    "'@abstractmethod'",
    "'assertEqual'",
    "'as'",
    "'def'",
    "'class'",
    "'elif'",
    "'else'",
    "'except'",
    "'for'",
    "'if'",
    "'in'",
    "'__init__'",
    "'input'",
    "'lambda'",
    "'main'",
    "'None'",
    "'pass'",
    "'print'",
    "'raise'",
    "'return'",
    "'try'",
    "'while'",
    "'ABC'",
    "'Enum'",
    "'unittest.TestCase'",
    "'**'",
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
    "ABSTRACT_METHOD",
    "ASSERT_EQUAL",
    "AS",
    "DEF",
    "CLASS",
    "ELIF",
    "ELSE",
    "EXCEPT",
    "FOR",
    "IF",
    "IN",
    "INIT",
    "INPUT",
    "LAMBDA",
    "MAIN",
    "NONE",
    "PASS",
    "PRINT",
    "RAISE",
    "RETURN",
    "TRY",
    "WHILE",
    "ABC",
    "ENUM",
    "TESTCASE",
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
    "commentGlobal",
    "ordinaryStatement",
    "print",
    "variableDefinition",
    "assignment",
    "inputStatement",
    "ifStatement",
    "whileLoop",
    "forLoop",
    "procedureCall",
    "tryStatement",
    "throwStatement",
    "commentStatement",
    "assert",
    "letStatement",
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
        this.state = 153;
        this.errorHandler.sync(this);
        switch (this.interpreter.adaptivePredict(this.tokenStream, 0, this.context)) {
          case 1:
            {
              this.state = 152;
              this.match(PythonParser.COMMENT);
            }
            break;
        }
        this.state = 158;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (_la === 24 || _la === 25 || _la === 49 || _la === 72) {
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
        while (_la === 70) {
          {
            {
              this.state = 161;
              this.match(PythonParser.NL);
            }
          }
          this.state = 166;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 167;
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
    this.enterRule(localContext, 4, PythonParser.RULE_main);
    try {
      let alternative: number;
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 180;
        this.match(PythonParser.DEF);
        this.state = 181;
        this.match(PythonParser.MAIN);
        this.state = 182;
        this.match(PythonParser.OPEN_BRACKET);
        this.state = 183;
        this.match(PythonParser.CLOSE_BRACKET);
        this.state = 184;
        this.match(PythonParser.CLOSE_BRACKET);
        this.state = 185;
        this.match(PythonParser.ARROW);
        this.state = 186;
        this.match(PythonParser.NONE);
        this.state = 187;
        this.match(PythonParser.COLON);
        this.state = 188;
        this.match(PythonParser.NL);
        this.state = 192;
        this.errorHandler.sync(this);
        alternative = this.interpreter.adaptivePredict(this.tokenStream, 4, this.context);
        while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
          if (alternative === 1) {
            {
              {
                this.state = 189;
                this.ordinaryStatement();
              }
            }
          }
          this.state = 194;
          this.errorHandler.sync(this);
          alternative = this.interpreter.adaptivePredict(this.tokenStream, 4, this.context);
        }
        this.state = 195;
        this.match(PythonParser.COMMENT);
        this.state = 196;
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
  public function_(): FunctionContext {
    let localContext = new FunctionContext(this.context, this.state);
    this.enterRule(localContext, 6, PythonParser.RULE_function);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 198;
        this.match(PythonParser.DEF);
        this.state = 199;
        this.methodName();
        this.state = 200;
        this.match(PythonParser.OPEN_BRACKET);
        this.state = 202;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 72) {
          {
            this.state = 201;
            this.paramsList();
          }
        }

        this.state = 204;
        this.match(PythonParser.CLOSE_BRACKET);
        this.state = 205;
        this.match(PythonParser.ARROW);
        this.state = 206;
        this.type_();
        this.state = 207;
        this.match(PythonParser.COLON);
        this.state = 208;
        this.match(PythonParser.FUNCTION_ANNOTATION);
        this.state = 209;
        this.match(PythonParser.NL);
        this.state = 214;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (
          ((_la & ~0x1f) === 0 && ((1 << _la) & 1612186492) !== 0) ||
          (((_la - 38) & ~0x1f) === 0 && ((1 << (_la - 38)) & 165915) !== 0) ||
          (((_la - 72) & ~0x1f) === 0 && ((1 << (_la - 72)) & 127) !== 0)
        ) {
          {
            this.state = 212;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 6, this.context)) {
              case 1:
                {
                  this.state = 210;
                  this.letStatement();
                }
                break;
              case 2:
                {
                  this.state = 211;
                  this.ordinaryStatement();
                }
                break;
            }
          }
          this.state = 216;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 217;
        this.returnStatement();
        this.state = 218;
        this.match(PythonParser.COMMENT);
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
  public test(): TestContext {
    let localContext = new TestContext(this.context, this.state);
    this.enterRule(localContext, 8, PythonParser.RULE_test);
    try {
      let alternative: number;
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 221;
        this.match(PythonParser.CLASS);
        this.state = 222;
        this.testName();
        this.state = 223;
        this.match(PythonParser.OPEN_BRACKET);
        this.state = 224;
        this.match(PythonParser.TESTCASE);
        this.state = 225;
        this.match(PythonParser.CLOSE_BRACKET);
        this.state = 226;
        this.match(PythonParser.COMMENT);
        this.state = 227;
        this.match(PythonParser.NL);
        this.state = 234;
        this.errorHandler.sync(this);
        alternative = this.interpreter.adaptivePredict(this.tokenStream, 9, this.context);
        while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
          if (alternative === 1) {
            {
              this.state = 232;
              this.errorHandler.sync(this);
              switch (this.interpreter.adaptivePredict(this.tokenStream, 8, this.context)) {
                case 1:
                  {
                    this.state = 228;
                    this.assert();
                  }
                  break;
                case 2:
                  {
                    this.state = 229;
                    this.letStatement();
                  }
                  break;
                case 3:
                  {
                    this.state = 230;
                    this.variableDefinition();
                  }
                  break;
                case 4:
                  {
                    this.state = 231;
                    this.commentStatement();
                  }
                  break;
              }
            }
          }
          this.state = 236;
          this.errorHandler.sync(this);
          alternative = this.interpreter.adaptivePredict(this.tokenStream, 9, this.context);
        }
        this.state = 237;
        this.match(PythonParser.COMMENT);
        this.state = 238;
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
  public procedure(): ProcedureContext {
    let localContext = new ProcedureContext(this.context, this.state);
    this.enterRule(localContext, 10, PythonParser.RULE_procedure);
    let _la: number;
    try {
      let alternative: number;
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 240;
        this.match(PythonParser.DEF);
        this.state = 241;
        this.methodName();
        this.state = 242;
        this.match(PythonParser.OPEN_BRACKET);
        this.state = 244;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 72) {
          {
            this.state = 243;
            this.paramsList();
          }
        }

        this.state = 246;
        this.match(PythonParser.CLOSE_BRACKET);
        this.state = 247;
        this.match(PythonParser.ARROW);
        this.state = 248;
        this.match(PythonParser.NONE);
        this.state = 249;
        this.match(PythonParser.COLON);
        this.state = 250;
        this.match(PythonParser.PROCECDURE_ANNOTATION);
        this.state = 251;
        this.match(PythonParser.NL);
        this.state = 255;
        this.errorHandler.sync(this);
        alternative = this.interpreter.adaptivePredict(this.tokenStream, 11, this.context);
        while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
          if (alternative === 1) {
            {
              {
                this.state = 252;
                this.ordinaryStatement();
              }
            }
          }
          this.state = 257;
          this.errorHandler.sync(this);
          alternative = this.interpreter.adaptivePredict(this.tokenStream, 11, this.context);
        }
        this.state = 258;
        this.match(PythonParser.COMMENT);
        this.state = 259;
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
    this.enterRule(localContext, 12, PythonParser.RULE_constant);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 261;
        this.identifier();
        this.state = 262;
        this.match(PythonParser.EQUAL);
        this.state = 263;
        this.constantValue();
        this.state = 264;
        this.match(PythonParser.CONSTANT_ANNOTATION);
        this.state = 265;
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
    this.enterRule(localContext, 14, PythonParser.RULE_enum);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 267;
        this.match(PythonParser.CLASS);
        this.state = 268;
        this.typeName();
        this.state = 269;
        this.match(PythonParser.OPEN_BRACKET);
        this.state = 270;
        this.match(PythonParser.ENUM);
        this.state = 271;
        this.match(PythonParser.CLOSE_BRACKET);
        this.state = 272;
        this.match(PythonParser.COLON);
        this.state = 273;
        this.match(PythonParser.ENUM_ANNOTATION);
        this.state = 274;
        this.match(PythonParser.NL);
        this.state = 275;
        this.enumValuesList();
        this.state = 276;
        this.match(PythonParser.NL);
        this.state = 277;
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
  public concreteClass(): ConcreteClassContext {
    let localContext = new ConcreteClassContext(this.context, this.state);
    this.enterRule(localContext, 16, PythonParser.RULE_concreteClass);
    let _la: number;
    try {
      let alternative: number;
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 279;
        this.match(PythonParser.CLASS);
        this.state = 280;
        this.typeName();
        this.state = 285;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 55) {
          {
            this.state = 281;
            this.match(PythonParser.OPEN_BRACKET);
            this.state = 282;
            this.typeName();
            this.state = 283;
            this.match(PythonParser.CLOSE_BRACKET);
          }
        }

        this.state = 287;
        this.match(PythonParser.COLON);
        this.state = 288;
        this.match(PythonParser.CONCRETE_CLASS_ANNOTATION);
        this.state = 289;
        this.match(PythonParser.NL);
        this.state = 297;
        this.errorHandler.sync(this);
        alternative = this.interpreter.adaptivePredict(this.tokenStream, 14, this.context);
        while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
          if (alternative === 1) {
            {
              this.state = 295;
              this.errorHandler.sync(this);
              switch (this.interpreter.adaptivePredict(this.tokenStream, 13, this.context)) {
                case 1:
                  {
                    this.state = 290;
                    this.constructorMember();
                  }
                  break;
                case 2:
                  {
                    this.state = 291;
                    this.property();
                  }
                  break;
                case 3:
                  {
                    this.state = 292;
                    this.functionMethod();
                  }
                  break;
                case 4:
                  {
                    this.state = 293;
                    this.procedureMethod();
                  }
                  break;
                case 5:
                  {
                    this.state = 294;
                    this.commentMember();
                  }
                  break;
              }
            }
          }
          this.state = 299;
          this.errorHandler.sync(this);
          alternative = this.interpreter.adaptivePredict(this.tokenStream, 14, this.context);
        }
        this.state = 300;
        this.match(PythonParser.COMMENT);
        this.state = 301;
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
  public abstractClass(): AbstractClassContext {
    let localContext = new AbstractClassContext(this.context, this.state);
    this.enterRule(localContext, 18, PythonParser.RULE_abstractClass);
    try {
      let alternative: number;
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 303;
        this.match(PythonParser.CLASS);
        this.state = 304;
        this.typeName();
        this.state = 309;
        this.errorHandler.sync(this);
        switch (this.tokenStream.LA(1)) {
          case PythonParser.OPEN_BRACKET:
            {
              this.state = 305;
              this.match(PythonParser.OPEN_BRACKET);
              this.state = 306;
              this.typeName();
            }
            break;
          case PythonParser.ABC:
            {
              this.state = 307;
              this.match(PythonParser.ABC);
              this.state = 308;
              this.match(PythonParser.CLOSE_BRACKET);
            }
            break;
          default:
            throw new antlr.NoViableAltException(this);
        }
        this.state = 311;
        this.match(PythonParser.ABSTRACT_CLASS_ANNOTATION);
        this.state = 312;
        this.match(PythonParser.NL);
        this.state = 321;
        this.errorHandler.sync(this);
        alternative = this.interpreter.adaptivePredict(this.tokenStream, 17, this.context);
        while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
          if (alternative === 1) {
            {
              this.state = 319;
              this.errorHandler.sync(this);
              switch (this.interpreter.adaptivePredict(this.tokenStream, 16, this.context)) {
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
          }
          this.state = 323;
          this.errorHandler.sync(this);
          alternative = this.interpreter.adaptivePredict(this.tokenStream, 17, this.context);
        }
        this.state = 324;
        this.match(PythonParser.COMMENT);
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
  public commentGlobal(): CommentGlobalContext {
    let localContext = new CommentGlobalContext(this.context, this.state);
    this.enterRule(localContext, 20, PythonParser.RULE_commentGlobal);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 327;
        this.match(PythonParser.COMMENT);
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
  public ordinaryStatement(): OrdinaryStatementContext {
    let localContext = new OrdinaryStatementContext(this.context, this.state);
    this.enterRule(localContext, 22, PythonParser.RULE_ordinaryStatement);
    try {
      this.state = 341;
      this.errorHandler.sync(this);
      switch (this.interpreter.adaptivePredict(this.tokenStream, 18, this.context)) {
        case 1:
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 330;
            this.print();
          }
          break;
        case 2:
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 331;
            this.variableDefinition();
          }
          break;
        case 3:
          this.enterOuterAlt(localContext, 3);
          {
            this.state = 332;
            this.assignment();
          }
          break;
        case 4:
          this.enterOuterAlt(localContext, 4);
          {
            this.state = 333;
            this.inputStatement();
          }
          break;
        case 5:
          this.enterOuterAlt(localContext, 5);
          {
            this.state = 334;
            this.ifStatement();
          }
          break;
        case 6:
          this.enterOuterAlt(localContext, 6);
          {
            this.state = 335;
            this.whileLoop();
          }
          break;
        case 7:
          this.enterOuterAlt(localContext, 7);
          {
            this.state = 336;
            this.forLoop();
          }
          break;
        case 8:
          this.enterOuterAlt(localContext, 8);
          {
            this.state = 337;
            this.procedureCall();
          }
          break;
        case 9:
          this.enterOuterAlt(localContext, 9);
          {
            this.state = 338;
            this.tryStatement();
          }
          break;
        case 10:
          this.enterOuterAlt(localContext, 10);
          {
            this.state = 339;
            this.throwStatement();
          }
          break;
        case 11:
          this.enterOuterAlt(localContext, 11);
          {
            this.state = 340;
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
  public print(): PrintContext {
    let localContext = new PrintContext(this.context, this.state);
    this.enterRule(localContext, 24, PythonParser.RULE_print);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 343;
        this.match(PythonParser.PRINT);
        this.state = 344;
        this.match(PythonParser.OPEN_BRACKET);
        this.state = 346;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (
          ((_la & ~0x1f) === 0 && ((1 << _la) & 1577980) !== 0) ||
          (((_la - 47) & ~0x1f) === 0 && ((1 << (_la - 47)) & 4261429571) !== 0)
        ) {
          {
            this.state = 345;
            this.expression(0);
          }
        }

        this.state = 348;
        this.match(PythonParser.CLOSE_BRACKET);
        this.state = 349;
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
  public variableDefinition(): VariableDefinitionContext {
    let localContext = new VariableDefinitionContext(this.context, this.state);
    this.enterRule(localContext, 26, PythonParser.RULE_variableDefinition);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 351;
        this.identifier();
        this.state = 352;
        this.match(PythonParser.EQUAL);
        this.state = 353;
        this.expression(0);
        this.state = 354;
        this.match(PythonParser.VARIABLE_ANNOTATION);
        this.state = 355;
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
    this.enterRule(localContext, 28, PythonParser.RULE_assignment);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 357;
        this.assignable();
        this.state = 358;
        this.match(PythonParser.EQUAL);
        this.state = 359;
        this.expression(0);
        this.state = 360;
        this.match(PythonParser.ASSIGNMENT_ANNOTATION);
        this.state = 361;
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
  public inputStatement(): InputStatementContext {
    let localContext = new InputStatementContext(this.context, this.state);
    this.enterRule(localContext, 30, PythonParser.RULE_inputStatement);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 363;
        this.identifier();
        this.state = 364;
        this.match(PythonParser.EQUAL);
        this.state = 365;
        this.match(PythonParser.INPUT);
        this.state = 366;
        this.match(PythonParser.OPEN_BRACKET);
        this.state = 367;
        this.expression(0);
        this.state = 368;
        this.match(PythonParser.CLOSE_BRACKET);
        this.state = 369;
        this.match(PythonParser.INPUT_ANNOTATION);
        this.state = 370;
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
    this.enterRule(localContext, 32, PythonParser.RULE_ifStatement);
    try {
      let alternative: number;
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 372;
        this.match(PythonParser.IF);
        this.state = 373;
        this.expression(0);
        this.state = 374;
        this.match(PythonParser.COLON);
        this.state = 375;
        this.match(PythonParser.NL);
        this.state = 381;
        this.errorHandler.sync(this);
        alternative = this.interpreter.adaptivePredict(this.tokenStream, 21, this.context);
        while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
          if (alternative === 1) {
            {
              this.state = 379;
              this.errorHandler.sync(this);
              switch (this.tokenStream.LA(1)) {
                case PythonParser.ELIF:
                  {
                    this.state = 376;
                    this.elseIfClause();
                  }
                  break;
                case PythonParser.ELSE:
                  {
                    this.state = 377;
                    this.elseClause();
                  }
                  break;
                case PythonParser.INT_NAME:
                case PythonParser.FLOAT_NAME:
                case PythonParser.BOOL_NAME:
                case PythonParser.STRING_NAME:
                case PythonParser.LIST_NAME:
                case PythonParser.TRUE:
                case PythonParser.FALSE:
                case PythonParser.INTERPOLATED_STRING_PREFIX:
                case PythonParser.THIS_INSTANCE:
                case PythonParser.FOR:
                case PythonParser.IF:
                case PythonParser.PRINT:
                case PythonParser.RAISE:
                case PythonParser.TRY:
                case PythonParser.WHILE:
                case PythonParser.COMMENT:
                case PythonParser.OPEN_SQ_BRACKET:
                case PythonParser.OPEN_BRACKET:
                case PythonParser.NAME_STARTING_LC:
                case PythonParser.NAME_STARTING_UC:
                case PythonParser.LITERAL_BINARY:
                case PythonParser.LITERAL_HEX:
                case PythonParser.LITERAL_INTEGER:
                case PythonParser.LITERAL_FLOAT:
                case PythonParser.LITERAL_STRING:
                  {
                    this.state = 378;
                    this.ordinaryStatement();
                  }
                  break;
                default:
                  throw new antlr.NoViableAltException(this);
              }
            }
          }
          this.state = 383;
          this.errorHandler.sync(this);
          alternative = this.interpreter.adaptivePredict(this.tokenStream, 21, this.context);
        }
        this.state = 384;
        this.match(PythonParser.COMMENT);
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
  public whileLoop(): WhileLoopContext {
    let localContext = new WhileLoopContext(this.context, this.state);
    this.enterRule(localContext, 34, PythonParser.RULE_whileLoop);
    try {
      let alternative: number;
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 387;
        this.match(PythonParser.WHILE);
        this.state = 388;
        this.expression(0);
        this.state = 389;
        this.match(PythonParser.COLON);
        this.state = 390;
        this.match(PythonParser.NL);
        this.state = 394;
        this.errorHandler.sync(this);
        alternative = this.interpreter.adaptivePredict(this.tokenStream, 22, this.context);
        while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
          if (alternative === 1) {
            {
              {
                this.state = 391;
                this.ordinaryStatement();
              }
            }
          }
          this.state = 396;
          this.errorHandler.sync(this);
          alternative = this.interpreter.adaptivePredict(this.tokenStream, 22, this.context);
        }
        this.state = 397;
        this.match(PythonParser.COMMENT);
        this.state = 398;
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
    this.enterRule(localContext, 36, PythonParser.RULE_forLoop);
    try {
      let alternative: number;
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 400;
        this.match(PythonParser.FOR);
        this.state = 401;
        this.identifier();
        this.state = 402;
        this.match(PythonParser.IN);
        this.state = 403;
        this.expression(0);
        this.state = 404;
        this.match(PythonParser.COLON);
        this.state = 405;
        this.match(PythonParser.NL);
        this.state = 409;
        this.errorHandler.sync(this);
        alternative = this.interpreter.adaptivePredict(this.tokenStream, 23, this.context);
        while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
          if (alternative === 1) {
            {
              {
                this.state = 406;
                this.ordinaryStatement();
              }
            }
          }
          this.state = 411;
          this.errorHandler.sync(this);
          alternative = this.interpreter.adaptivePredict(this.tokenStream, 23, this.context);
        }
        this.state = 412;
        this.match(PythonParser.COMMENT);
        this.state = 413;
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
    this.enterRule(localContext, 38, PythonParser.RULE_procedureCall);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 415;
        this.term();
        this.state = 416;
        this.match(PythonParser.CALL_ANNOTATION);
        this.state = 417;
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
    this.enterRule(localContext, 40, PythonParser.RULE_tryStatement);
    let _la: number;
    try {
      let alternative: number;
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 419;
        this.match(PythonParser.TRY);
        this.state = 420;
        this.match(PythonParser.NL);
        this.state = 424;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (
          ((_la & ~0x1f) === 0 && ((1 << _la) & 1612186492) !== 0) ||
          (((_la - 38) & ~0x1f) === 0 && ((1 << (_la - 38)) & 165915) !== 0) ||
          (((_la - 72) & ~0x1f) === 0 && ((1 << (_la - 72)) & 127) !== 0)
        ) {
          {
            {
              this.state = 421;
              this.ordinaryStatement();
            }
          }
          this.state = 426;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 427;
        this.catchStatement();
        this.state = 431;
        this.errorHandler.sync(this);
        alternative = this.interpreter.adaptivePredict(this.tokenStream, 25, this.context);
        while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
          if (alternative === 1) {
            {
              {
                this.state = 428;
                this.ordinaryStatement();
              }
            }
          }
          this.state = 433;
          this.errorHandler.sync(this);
          alternative = this.interpreter.adaptivePredict(this.tokenStream, 25, this.context);
        }
        this.state = 434;
        this.match(PythonParser.COMMENT);
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
  public throwStatement(): ThrowStatementContext {
    let localContext = new ThrowStatementContext(this.context, this.state);
    this.enterRule(localContext, 42, PythonParser.RULE_throwStatement);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 437;
        this.match(PythonParser.RAISE);
        this.state = 438;
        this.typeName();
        this.state = 439;
        this.match(PythonParser.OPEN_BRACKET);
        this.state = 440;
        this.litString();
        this.state = 441;
        this.match(PythonParser.CLOSE_BRACKET);
        this.state = 442;
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
  public commentStatement(): CommentStatementContext {
    let localContext = new CommentStatementContext(this.context, this.state);
    this.enterRule(localContext, 44, PythonParser.RULE_commentStatement);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 444;
        this.match(PythonParser.COMMENT);
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
  public assert(): AssertContext {
    let localContext = new AssertContext(this.context, this.state);
    this.enterRule(localContext, 46, PythonParser.RULE_assert);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 447;
        this.match(PythonParser.THIS_INSTANCE);
        this.state = 448;
        this.match(PythonParser.DOT);
        this.state = 449;
        this.match(PythonParser.ASSERT_EQUAL);
        this.state = 450;
        this.match(PythonParser.OPEN_BRACKET);
        this.state = 451;
        this.assertActual();
        this.state = 452;
        this.match(PythonParser.COMMA);
        this.state = 453;
        this.expression(0);
        this.state = 454;
        this.match(PythonParser.CLOSE_BRACKET);
        this.state = 455;
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
  public letStatement(): LetStatementContext {
    let localContext = new LetStatementContext(this.context, this.state);
    this.enterRule(localContext, 48, PythonParser.RULE_letStatement);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 457;
        this.identifier();
        this.state = 458;
        this.match(PythonParser.EQUAL);
        this.state = 459;
        this.expression(0);
        this.state = 460;
        this.match(PythonParser.LET_ANNOTATION);
        this.state = 461;
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
    this.enterRule(localContext, 50, PythonParser.RULE_returnStatement);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 463;
        this.match(PythonParser.RETURN);
        this.state = 464;
        this.expression(0);
        this.state = 465;
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
  public elseIfClause(): ElseIfClauseContext {
    let localContext = new ElseIfClauseContext(this.context, this.state);
    this.enterRule(localContext, 52, PythonParser.RULE_elseIfClause);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 467;
        this.match(PythonParser.ELIF);
        this.state = 468;
        this.expression(0);
        this.state = 469;
        this.match(PythonParser.COLON);
        this.state = 470;
        this.match(PythonParser.ELSE_IF_ANNOTATION);
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
  public elseClause(): ElseClauseContext {
    let localContext = new ElseClauseContext(this.context, this.state);
    this.enterRule(localContext, 54, PythonParser.RULE_elseClause);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 473;
        this.match(PythonParser.ELSE);
        this.state = 474;
        this.match(PythonParser.COLON);
        this.state = 475;
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
    this.enterRule(localContext, 56, PythonParser.RULE_catchStatement);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 477;
        this.match(PythonParser.EXCEPT);
        this.state = 478;
        this.typeName();
        this.state = 479;
        this.match(PythonParser.AS);
        this.state = 480;
        this.identifier();
        this.state = 481;
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
    this.enterRule(localContext, 58, PythonParser.RULE_constructorMember);
    let _la: number;
    try {
      let alternative: number;
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 483;
        this.match(PythonParser.DEF);
        this.state = 484;
        this.match(PythonParser.INIT);
        this.state = 485;
        this.match(PythonParser.OPEN_BRACKET);
        this.state = 487;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 72) {
          {
            this.state = 486;
            this.paramsList();
          }
        }

        this.state = 489;
        this.match(PythonParser.CLOSE_BRACKET);
        this.state = 490;
        this.match(PythonParser.ARROW);
        this.state = 491;
        this.match(PythonParser.NONE);
        this.state = 492;
        this.match(PythonParser.COLON);
        this.state = 493;
        this.match(PythonParser.NL);
        this.state = 497;
        this.errorHandler.sync(this);
        alternative = this.interpreter.adaptivePredict(this.tokenStream, 27, this.context);
        while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
          if (alternative === 1) {
            {
              {
                this.state = 494;
                this.ordinaryStatement();
              }
            }
          }
          this.state = 499;
          this.errorHandler.sync(this);
          alternative = this.interpreter.adaptivePredict(this.tokenStream, 27, this.context);
        }
        this.state = 500;
        this.match(PythonParser.COMMENT);
        this.state = 501;
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
    this.enterRule(localContext, 60, PythonParser.RULE_property);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 503;
        this.identifier();
        this.state = 504;
        this.match(PythonParser.COLON);
        this.state = 505;
        this.type_();
        this.state = 506;
        this.match(PythonParser.PROPERTY_ANNOTATION);
        this.state = 507;
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
    this.enterRule(localContext, 62, PythonParser.RULE_functionMethod);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 509;
        this.match(PythonParser.DEF);
        this.state = 510;
        this.methodName();
        this.state = 511;
        this.match(PythonParser.OPEN_BRACKET);
        this.state = 513;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 72) {
          {
            this.state = 512;
            this.paramsList();
          }
        }

        this.state = 515;
        this.match(PythonParser.CLOSE_BRACKET);
        this.state = 516;
        this.match(PythonParser.ARROW);
        this.state = 517;
        this.type_();
        this.state = 518;
        this.match(PythonParser.COLON);
        this.state = 519;
        this.match(PythonParser.FUNCTION_METHOD_ANNOTATION);
        this.state = 520;
        this.match(PythonParser.NL);
        this.state = 525;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (
          ((_la & ~0x1f) === 0 && ((1 << _la) & 1612186492) !== 0) ||
          (((_la - 38) & ~0x1f) === 0 && ((1 << (_la - 38)) & 165915) !== 0) ||
          (((_la - 72) & ~0x1f) === 0 && ((1 << (_la - 72)) & 127) !== 0)
        ) {
          {
            this.state = 523;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 29, this.context)) {
              case 1:
                {
                  this.state = 521;
                  this.letStatement();
                }
                break;
              case 2:
                {
                  this.state = 522;
                  this.ordinaryStatement();
                }
                break;
            }
          }
          this.state = 527;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 528;
        this.returnStatement();
        this.state = 529;
        this.match(PythonParser.COMMENT);
        this.state = 530;
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
    this.enterRule(localContext, 64, PythonParser.RULE_procedureMethod);
    let _la: number;
    try {
      let alternative: number;
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 532;
        this.match(PythonParser.DEF);
        this.state = 533;
        this.methodName();
        this.state = 534;
        this.match(PythonParser.OPEN_BRACKET);
        this.state = 536;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 72) {
          {
            this.state = 535;
            this.paramsList();
          }
        }

        this.state = 538;
        this.match(PythonParser.CLOSE_BRACKET);
        this.state = 539;
        this.match(PythonParser.ARROW);
        this.state = 540;
        this.match(PythonParser.NONE);
        this.state = 541;
        this.match(PythonParser.COLON);
        this.state = 542;
        this.match(PythonParser.PROCEDURE_METHOD_ANNOTATION);
        this.state = 543;
        this.match(PythonParser.NL);
        this.state = 547;
        this.errorHandler.sync(this);
        alternative = this.interpreter.adaptivePredict(this.tokenStream, 32, this.context);
        while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
          if (alternative === 1) {
            {
              {
                this.state = 544;
                this.ordinaryStatement();
              }
            }
          }
          this.state = 549;
          this.errorHandler.sync(this);
          alternative = this.interpreter.adaptivePredict(this.tokenStream, 32, this.context);
        }
        this.state = 550;
        this.match(PythonParser.COMMENT);
        this.state = 551;
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
    this.enterRule(localContext, 66, PythonParser.RULE_abstractFunction);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 553;
        this.match(PythonParser.ABSTRACT_METHOD);
        this.state = 554;
        this.match(PythonParser.NL);
        this.state = 555;
        this.match(PythonParser.DEF);
        this.state = 556;
        this.methodName();
        this.state = 557;
        this.match(PythonParser.OPEN_BRACKET);
        this.state = 559;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 72) {
          {
            this.state = 558;
            this.paramsList();
          }
        }

        this.state = 561;
        this.match(PythonParser.CLOSE_BRACKET);
        this.state = 562;
        this.match(PythonParser.ARROW);
        this.state = 563;
        this.type_();
        this.state = 564;
        this.match(PythonParser.COLON);
        this.state = 565;
        this.match(PythonParser.NL);
        this.state = 566;
        this.match(PythonParser.PASS);
        this.state = 567;
        this.match(PythonParser.COMMENT);
        this.state = 568;
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
    this.enterRule(localContext, 68, PythonParser.RULE_abstractProcedure);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 570;
        this.match(PythonParser.ABSTRACT_METHOD);
        this.state = 571;
        this.match(PythonParser.NL);
        this.state = 572;
        this.match(PythonParser.DEF);
        this.state = 573;
        this.methodName();
        this.state = 574;
        this.match(PythonParser.OPEN_BRACKET);
        this.state = 576;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 72) {
          {
            this.state = 575;
            this.paramsList();
          }
        }

        this.state = 578;
        this.match(PythonParser.CLOSE_BRACKET);
        this.state = 579;
        this.match(PythonParser.ARROW);
        this.state = 580;
        this.match(PythonParser.NONE);
        this.state = 581;
        this.match(PythonParser.COLON);
        this.state = 582;
        this.match(PythonParser.NL);
        this.state = 583;
        this.match(PythonParser.PASS);
        this.state = 584;
        this.match(PythonParser.COMMENT);
        this.state = 585;
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
  public commentMember(): CommentMemberContext {
    let localContext = new CommentMemberContext(this.context, this.state);
    this.enterRule(localContext, 70, PythonParser.RULE_commentMember);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 588;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 49) {
          {
            this.state = 587;
            this.match(PythonParser.COMMENT);
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
  public identifier(): IdentifierContext {
    let localContext = new IdentifierContext(this.context, this.state);
    this.enterRule(localContext, 72, PythonParser.RULE_identifier);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 592;
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
  public assignable(): AssignableContext {
    let localContext = new AssignableContext(this.context, this.state);
    this.enterRule(localContext, 74, PythonParser.RULE_assignable);
    try {
      this.state = 596;
      this.errorHandler.sync(this);
      switch (this.tokenStream.LA(1)) {
        case PythonParser.NAME_STARTING_LC:
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 594;
            this.identifierWithOptIndexes();
          }
          break;
        case PythonParser.THIS_INSTANCE:
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 595;
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
    this.enterRule(localContext, 76, PythonParser.RULE_methodName);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 598;
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
    this.enterRule(localContext, 78, PythonParser.RULE_testName);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 600;
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
    this.enterRule(localContext, 80, PythonParser.RULE_typeName);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 602;
        _la = this.tokenStream.LA(1);
        if (!(((_la & ~0x1f) === 0 && ((1 << _la) & 124) !== 0) || _la === 73)) {
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
    this.enterRule(localContext, 82, PythonParser.RULE_constantValue);
    try {
      this.state = 606;
      this.errorHandler.sync(this);
      switch (this.tokenStream.LA(1)) {
        case PythonParser.INT_NAME:
        case PythonParser.FLOAT_NAME:
        case PythonParser.BOOL_NAME:
        case PythonParser.STRING_NAME:
        case PythonParser.LIST_NAME:
        case PythonParser.TRUE:
        case PythonParser.FALSE:
        case PythonParser.INTERPOLATED_STRING_PREFIX:
        case PythonParser.NAME_STARTING_UC:
        case PythonParser.LITERAL_BINARY:
        case PythonParser.LITERAL_HEX:
        case PythonParser.LITERAL_INTEGER:
        case PythonParser.LITERAL_FLOAT:
        case PythonParser.LITERAL_STRING:
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 604;
            this.litValue();
          }
          break;
        case PythonParser.NAME_STARTING_LC:
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 605;
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
    this.enterRule(localContext, 84, PythonParser.RULE_argList);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 608;
        this.argument();
        this.state = 613;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (_la === 58) {
          {
            {
              this.state = 609;
              this.match(PythonParser.COMMA);
              this.state = 610;
              this.argument();
            }
          }
          this.state = 615;
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
    this.enterRule(localContext, 86, PythonParser.RULE_argument);
    try {
      this.state = 618;
      this.errorHandler.sync(this);
      switch (this.tokenStream.LA(1)) {
        case PythonParser.LAMBDA:
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 616;
            this.lambda();
          }
          break;
        case PythonParser.INT_NAME:
        case PythonParser.FLOAT_NAME:
        case PythonParser.BOOL_NAME:
        case PythonParser.STRING_NAME:
        case PythonParser.LIST_NAME:
        case PythonParser.FUNC_NAME:
        case PythonParser.TRUE:
        case PythonParser.FALSE:
        case PythonParser.NOT:
        case PythonParser.INTERPOLATED_STRING_PREFIX:
        case PythonParser.THIS_INSTANCE:
        case PythonParser.TUPLE:
        case PythonParser.IF_:
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
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 617;
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
    this.enterRule(localContext, 88, PythonParser.RULE_paramsList);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 620;
        this.paramDef();
        this.state = 625;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (_la === 58) {
          {
            {
              this.state = 621;
              this.match(PythonParser.COMMA);
              this.state = 622;
              this.paramDef();
            }
          }
          this.state = 627;
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
    this.enterRule(localContext, 90, PythonParser.RULE_type);
    try {
      this.state = 632;
      this.errorHandler.sync(this);
      switch (this.interpreter.adaptivePredict(this.tokenStream, 41, this.context)) {
        case 1:
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 628;
            this.typeTuple();
          }
          break;
        case 2:
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 629;
            this.typeName();
          }
          break;
        case 3:
          this.enterOuterAlt(localContext, 3);
          {
            this.state = 630;
            this.typeGeneric();
          }
          break;
        case 4:
          this.enterOuterAlt(localContext, 4);
          {
            this.state = 631;
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
    this.enterRule(localContext, 92, PythonParser.RULE_enumValuesList);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 634;
        this.identifier();
        this.state = 639;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (_la === 58) {
          {
            {
              this.state = 635;
              this.match(PythonParser.COMMA);
              this.state = 636;
              this.identifier();
            }
          }
          this.state = 641;
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
    this.enterRule(localContext, 94, PythonParser.RULE_assertActual);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 642;
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
    this.enterRule(localContext, 96, PythonParser.RULE_litValue);
    try {
      this.state = 649;
      this.errorHandler.sync(this);
      switch (this.tokenStream.LA(1)) {
        case PythonParser.TRUE:
        case PythonParser.FALSE:
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 644;
            this.litBoolean();
          }
          break;
        case PythonParser.LITERAL_BINARY:
        case PythonParser.LITERAL_HEX:
        case PythonParser.LITERAL_INTEGER:
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 645;
            this.litInt();
          }
          break;
        case PythonParser.LITERAL_FLOAT:
          this.enterOuterAlt(localContext, 3);
          {
            this.state = 646;
            this.litFloat();
          }
          break;
        case PythonParser.INTERPOLATED_STRING_PREFIX:
        case PythonParser.LITERAL_STRING:
          this.enterOuterAlt(localContext, 4);
          {
            this.state = 647;
            this.litString();
          }
          break;
        case PythonParser.INT_NAME:
        case PythonParser.FLOAT_NAME:
        case PythonParser.BOOL_NAME:
        case PythonParser.STRING_NAME:
        case PythonParser.LIST_NAME:
        case PythonParser.NAME_STARTING_UC:
          this.enterOuterAlt(localContext, 5);
          {
            this.state = 648;
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
    this.enterRule(localContext, 98, PythonParser.RULE_litBoolean);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 651;
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
    this.enterRule(localContext, 100, PythonParser.RULE_litInt);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 653;
        _la = this.tokenStream.LA(1);
        if (!(((_la - 74) & ~0x1f) === 0 && ((1 << (_la - 74)) & 7) !== 0)) {
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
    this.enterRule(localContext, 102, PythonParser.RULE_litFloat);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 655;
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
  public enumValue(): EnumValueContext {
    let localContext = new EnumValueContext(this.context, this.state);
    this.enterRule(localContext, 104, PythonParser.RULE_enumValue);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 657;
        this.typeName();
        this.state = 658;
        this.match(PythonParser.DOT);
        this.state = 659;
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
    this.enterRule(localContext, 106, PythonParser.RULE_litString);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 662;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 19) {
          {
            this.state = 661;
            this.match(PythonParser.INTERPOLATED_STRING_PREFIX);
          }
        }

        this.state = 664;
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
  public index(): IndexContext {
    let localContext = new IndexContext(this.context, this.state);
    this.enterRule(localContext, 108, PythonParser.RULE_index);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 666;
        this.match(PythonParser.OPEN_SQ_BRACKET);
        this.state = 667;
        this.expression(0);
        this.state = 668;
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
  public identifierWithOptIndexes(): IdentifierWithOptIndexesContext {
    let localContext = new IdentifierWithOptIndexesContext(this.context, this.state);
    this.enterRule(localContext, 110, PythonParser.RULE_identifierWithOptIndexes);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 670;
        this.identifier();
        this.state = 674;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (_la === 53) {
          {
            {
              this.state = 671;
              this.index();
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
  public propertyRef(): PropertyRefContext {
    let localContext = new PropertyRefContext(this.context, this.state);
    this.enterRule(localContext, 112, PythonParser.RULE_propertyRef);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 677;
        this.match(PythonParser.THIS_INSTANCE);
        this.state = 678;
        this.match(PythonParser.DOT);
        this.state = 679;
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
    this.enterRecursionRule(localContext, 114, PythonParser.RULE_expression, _p);
    try {
      let alternative: number;
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 694;
        this.errorHandler.sync(this);
        switch (this.interpreter.adaptivePredict(this.tokenStream, 46, this.context)) {
          case 1:
            {
              this.state = 682;
              this.newInstance();
            }
            break;
          case 2:
            {
              this.state = 683;
              this.unaryExpression();
            }
            break;
          case 3:
            {
              this.state = 684;
              this.term();
            }
            break;
          case 4:
            {
              this.state = 685;
              this.match(PythonParser.IF_);
              this.state = 686;
              this.match(PythonParser.OPEN_BRACKET);
              this.state = 687;
              this.expression(0);
              this.state = 688;
              this.match(PythonParser.COMMA);
              this.state = 689;
              this.expression(0);
              this.state = 690;
              this.match(PythonParser.COMMA);
              this.state = 691;
              this.expression(0);
              this.state = 692;
              this.match(PythonParser.CLOSE_BRACKET);
            }
            break;
        }
        this.context!.stop = this.tokenStream.LT(-1);
        this.state = 702;
        this.errorHandler.sync(this);
        alternative = this.interpreter.adaptivePredict(this.tokenStream, 47, this.context);
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
                  PythonParser.RULE_expression,
                );
                this.state = 696;
                if (!this.precpred(this.context, 2)) {
                  throw this.createFailedPredicateException("this.precpred(this.context, 2)");
                }
                this.state = 697;
                this.binaryOperator();
                this.state = 698;
                this.expression(3);
              }
            }
          }
          this.state = 704;
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
      this.unrollRecursionContexts(parentContext);
    }
    return localContext;
  }
  public term(): TermContext {
    let localContext = new TermContext(this.context, this.state);
    this.enterRule(localContext, 116, PythonParser.RULE_term);
    try {
      let alternative: number;
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 705;
        this.chainHead();
        this.state = 710;
        this.errorHandler.sync(this);
        alternative = this.interpreter.adaptivePredict(this.tokenStream, 48, this.context);
        while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
          if (alternative === 1) {
            {
              {
                this.state = 706;
                this.match(PythonParser.DOT);
                this.state = 707;
                this.chainable();
              }
            }
          }
          this.state = 712;
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
  public chainHead(): ChainHeadContext {
    let localContext = new ChainHeadContext(this.context, this.state);
    this.enterRule(localContext, 118, PythonParser.RULE_chainHead);
    try {
      this.state = 719;
      this.errorHandler.sync(this);
      switch (this.interpreter.adaptivePredict(this.tokenStream, 49, this.context)) {
        case 1:
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 713;
            this.match(PythonParser.THIS_INSTANCE);
          }
          break;
        case 2:
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 714;
            this.bracketedExpression();
          }
          break;
        case 3:
          this.enterOuterAlt(localContext, 3);
          {
            this.state = 715;
            this.tuple();
          }
          break;
        case 4:
          this.enterOuterAlt(localContext, 4);
          {
            this.state = 716;
            this.litValue();
          }
          break;
        case 5:
          this.enterOuterAlt(localContext, 5);
          {
            this.state = 717;
            this.list();
          }
          break;
        case 6:
          this.enterOuterAlt(localContext, 6);
          {
            this.state = 718;
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
    this.enterRule(localContext, 120, PythonParser.RULE_chainable);
    try {
      let alternative: number;
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 723;
        this.errorHandler.sync(this);
        switch (this.interpreter.adaptivePredict(this.tokenStream, 50, this.context)) {
          case 1:
            {
              this.state = 721;
              this.identifier();
            }
            break;
          case 2:
            {
              this.state = 722;
              this.methodCall();
            }
            break;
        }
        this.state = 728;
        this.errorHandler.sync(this);
        alternative = this.interpreter.adaptivePredict(this.tokenStream, 51, this.context);
        while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
          if (alternative === 1) {
            {
              {
                this.state = 725;
                this.index();
              }
            }
          }
          this.state = 730;
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
      this.exitRule();
    }
    return localContext;
  }
  public bracketedExpression(): BracketedExpressionContext {
    let localContext = new BracketedExpressionContext(this.context, this.state);
    this.enterRule(localContext, 122, PythonParser.RULE_bracketedExpression);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 731;
        this.match(PythonParser.OPEN_BRACKET);
        this.state = 732;
        this.expression(0);
        this.state = 733;
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
    this.enterRule(localContext, 124, PythonParser.RULE_unaryExpression);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 735;
        _la = this.tokenStream.LA(1);
        if (!(_la === 12 || _la === 61)) {
          this.errorHandler.recoverInline(this);
        } else {
          this.errorHandler.reportMatch(this);
          this.consume();
        }
        this.state = 736;
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
    this.enterRule(localContext, 126, PythonParser.RULE_binaryExpression);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 738;
        this.term();
        this.state = 739;
        this.binaryOperator();
        this.state = 740;
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
    this.enterRule(localContext, 128, PythonParser.RULE_tuple);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 742;
        this.match(PythonParser.OPEN_BRACKET);
        this.state = 743;
        this.expression(0);
        this.state = 744;
        this.match(PythonParser.COMMA);
        this.state = 745;
        this.expression(0);
        this.state = 750;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (_la === 58) {
          {
            {
              this.state = 746;
              this.match(PythonParser.COMMA);
              this.state = 747;
              this.expression(0);
            }
          }
          this.state = 752;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 753;
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
  public methodCall(): MethodCallContext {
    let localContext = new MethodCallContext(this.context, this.state);
    this.enterRule(localContext, 130, PythonParser.RULE_methodCall);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 755;
        this.methodName();
        this.state = 756;
        this.match(PythonParser.OPEN_BRACKET);
        this.state = 758;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (
          ((_la & ~0x1f) === 0 && ((1 << _la) & 1577980) !== 0) ||
          (((_la - 34) & ~0x1f) === 0 && ((1 << (_la - 34)) & 136863745) !== 0) ||
          (((_la - 72) & ~0x1f) === 0 && ((1 << (_la - 72)) & 127) !== 0)
        ) {
          {
            this.state = 757;
            this.argList();
          }
        }

        this.state = 760;
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
    this.enterRule(localContext, 132, PythonParser.RULE_binaryOperator);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 762;
        _la = this.tokenStream.LA(1);
        if (!(
          ((_la & ~0x1f) === 0 && ((1 << _la) & 60416) !== 0) ||
          (((_la - 60) & ~0x1f) === 0 && ((1 << (_la - 60)) & 255) !== 0)
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
    this.enterRule(localContext, 134, PythonParser.RULE_newInstance);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 764;
        this.type_();
        this.state = 765;
        this.match(PythonParser.OPEN_BRACKET);
        this.state = 767;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (
          ((_la & ~0x1f) === 0 && ((1 << _la) & 1577980) !== 0) ||
          (((_la - 34) & ~0x1f) === 0 && ((1 << (_la - 34)) & 136863745) !== 0) ||
          (((_la - 72) & ~0x1f) === 0 && ((1 << (_la - 72)) & 127) !== 0)
        ) {
          {
            this.state = 766;
            this.argList();
          }
        }

        this.state = 769;
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
    this.enterRule(localContext, 136, PythonParser.RULE_paramDef);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 771;
        this.identifier();
        this.state = 772;
        this.match(PythonParser.COLON);
        this.state = 773;
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
    this.enterRule(localContext, 138, PythonParser.RULE_typeGeneric);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 775;
        this.typeName();
        this.state = 776;
        this.match(PythonParser.OPEN_SQ_BRACKET);
        this.state = 777;
        this.type_();
        this.state = 782;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (_la === 58) {
          {
            {
              this.state = 778;
              this.match(PythonParser.COMMA);
              this.state = 779;
              this.type_();
            }
          }
          this.state = 784;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 785;
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
    this.enterRule(localContext, 140, PythonParser.RULE_typeFunc);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 787;
        this.match(PythonParser.FUNC_NAME);
        this.state = 788;
        this.match(PythonParser.OPEN_SQ_BRACKET);
        this.state = 789;
        this.match(PythonParser.OPEN_SQ_BRACKET);
        this.state = 790;
        this.type_();
        this.state = 795;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (_la === 58) {
          {
            {
              this.state = 791;
              this.match(PythonParser.COMMA);
              this.state = 792;
              this.type_();
            }
          }
          this.state = 797;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 798;
        this.match(PythonParser.CLOSE_SQ_BRACKET);
        this.state = 799;
        this.type_();
        this.state = 800;
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
    this.enterRule(localContext, 142, PythonParser.RULE_typeTuple);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 802;
        this.match(PythonParser.TUPLE);
        this.state = 803;
        this.match(PythonParser.OPEN_SQ_BRACKET);
        this.state = 804;
        this.type_();
        this.state = 807;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        do {
          {
            {
              this.state = 805;
              this.match(PythonParser.COMMA);
              this.state = 806;
              this.type_();
            }
          }
          this.state = 809;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        } while (_la === 58);
        this.state = 811;
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
    this.enterRule(localContext, 144, PythonParser.RULE_lambda);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 813;
        this.match(PythonParser.LAMBDA);
        this.state = 814;
        this.argList();
        this.state = 815;
        this.match(PythonParser.COLON);
        this.state = 816;
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
    this.enterRule(localContext, 146, PythonParser.RULE_list);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 818;
        this.match(PythonParser.OPEN_SQ_BRACKET);
        this.state = 819;
        this.expression(0);
        this.state = 824;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (_la === 58) {
          {
            {
              this.state = 820;
              this.match(PythonParser.COMMA);
              this.state = 821;
              this.expression(0);
            }
          }
          this.state = 826;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 827;
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
  public interpolatedString(): InterpolatedStringContext {
    let localContext = new InterpolatedStringContext(this.context, this.state);
    this.enterRule(localContext, 148, PythonParser.RULE_interpolatedString);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 829;
        this.match(PythonParser.INTERPOLATED_STRING_PREFIX);
        this.state = 830;
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
  public power(): PowerContext {
    let localContext = new PowerContext(this.context, this.state);
    this.enterRule(localContext, 150, PythonParser.RULE_power);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 832;
        this.term();
        this.state = 833;
        this.match(PythonParser.POWER);
        this.state = 834;
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
    4, 1, 96, 837, 2, 0, 7, 0, 2, 1, 7, 1, 2, 2, 7, 2, 2, 3, 7, 3, 2, 4, 7, 4, 2, 5, 7, 5, 2, 6, 7,
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
    1, 1, 1, 1, 3, 1, 179, 8, 1, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 5, 2,
    191, 8, 2, 10, 2, 12, 2, 194, 9, 2, 1, 2, 1, 2, 1, 2, 1, 3, 1, 3, 1, 3, 1, 3, 3, 3, 203, 8, 3,
    1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 5, 3, 213, 8, 3, 10, 3, 12, 3, 216, 9, 3, 1, 3,
    1, 3, 1, 3, 1, 3, 1, 4, 1, 4, 1, 4, 1, 4, 1, 4, 1, 4, 1, 4, 1, 4, 1, 4, 1, 4, 1, 4, 5, 4, 233,
    8, 4, 10, 4, 12, 4, 236, 9, 4, 1, 4, 1, 4, 1, 4, 1, 5, 1, 5, 1, 5, 1, 5, 3, 5, 245, 8, 5, 1, 5,
    1, 5, 1, 5, 1, 5, 1, 5, 1, 5, 1, 5, 5, 5, 254, 8, 5, 10, 5, 12, 5, 257, 9, 5, 1, 5, 1, 5, 1, 5,
    1, 6, 1, 6, 1, 6, 1, 6, 1, 6, 1, 6, 1, 7, 1, 7, 1, 7, 1, 7, 1, 7, 1, 7, 1, 7, 1, 7, 1, 7, 1, 7,
    1, 7, 1, 7, 1, 8, 1, 8, 1, 8, 1, 8, 1, 8, 1, 8, 3, 8, 286, 8, 8, 1, 8, 1, 8, 1, 8, 1, 8, 1, 8,
    1, 8, 1, 8, 1, 8, 5, 8, 296, 8, 8, 10, 8, 12, 8, 299, 9, 8, 1, 8, 1, 8, 1, 8, 1, 9, 1, 9, 1, 9,
    1, 9, 1, 9, 1, 9, 3, 9, 310, 8, 9, 1, 9, 1, 9, 1, 9, 1, 9, 1, 9, 1, 9, 1, 9, 1, 9, 5, 9, 320, 8,
    9, 10, 9, 12, 9, 323, 9, 9, 1, 9, 1, 9, 1, 9, 1, 10, 1, 10, 1, 10, 1, 11, 1, 11, 1, 11, 1, 11,
    1, 11, 1, 11, 1, 11, 1, 11, 1, 11, 1, 11, 1, 11, 3, 11, 342, 8, 11, 1, 12, 1, 12, 1, 12, 3, 12,
    347, 8, 12, 1, 12, 1, 12, 1, 12, 1, 13, 1, 13, 1, 13, 1, 13, 1, 13, 1, 13, 1, 14, 1, 14, 1, 14,
    1, 14, 1, 14, 1, 14, 1, 15, 1, 15, 1, 15, 1, 15, 1, 15, 1, 15, 1, 15, 1, 15, 1, 15, 1, 16, 1,
    16, 1, 16, 1, 16, 1, 16, 1, 16, 1, 16, 5, 16, 380, 8, 16, 10, 16, 12, 16, 383, 9, 16, 1, 16, 1,
    16, 1, 16, 1, 17, 1, 17, 1, 17, 1, 17, 1, 17, 5, 17, 393, 8, 17, 10, 17, 12, 17, 396, 9, 17, 1,
    17, 1, 17, 1, 17, 1, 18, 1, 18, 1, 18, 1, 18, 1, 18, 1, 18, 1, 18, 5, 18, 408, 8, 18, 10, 18,
    12, 18, 411, 9, 18, 1, 18, 1, 18, 1, 18, 1, 19, 1, 19, 1, 19, 1, 19, 1, 20, 1, 20, 1, 20, 5, 20,
    423, 8, 20, 10, 20, 12, 20, 426, 9, 20, 1, 20, 1, 20, 5, 20, 430, 8, 20, 10, 20, 12, 20, 433, 9,
    20, 1, 20, 1, 20, 1, 20, 1, 21, 1, 21, 1, 21, 1, 21, 1, 21, 1, 21, 1, 21, 1, 22, 1, 22, 1, 22,
    1, 23, 1, 23, 1, 23, 1, 23, 1, 23, 1, 23, 1, 23, 1, 23, 1, 23, 1, 23, 1, 24, 1, 24, 1, 24, 1,
    24, 1, 24, 1, 24, 1, 25, 1, 25, 1, 25, 1, 25, 1, 26, 1, 26, 1, 26, 1, 26, 1, 26, 1, 26, 1, 27,
    1, 27, 1, 27, 1, 27, 1, 28, 1, 28, 1, 28, 1, 28, 1, 28, 1, 28, 1, 29, 1, 29, 1, 29, 1, 29, 3,
    29, 488, 8, 29, 1, 29, 1, 29, 1, 29, 1, 29, 1, 29, 1, 29, 5, 29, 496, 8, 29, 10, 29, 12, 29,
    499, 9, 29, 1, 29, 1, 29, 1, 29, 1, 30, 1, 30, 1, 30, 1, 30, 1, 30, 1, 30, 1, 31, 1, 31, 1, 31,
    1, 31, 3, 31, 514, 8, 31, 1, 31, 1, 31, 1, 31, 1, 31, 1, 31, 1, 31, 1, 31, 1, 31, 5, 31, 524, 8,
    31, 10, 31, 12, 31, 527, 9, 31, 1, 31, 1, 31, 1, 31, 1, 31, 1, 32, 1, 32, 1, 32, 1, 32, 3, 32,
    537, 8, 32, 1, 32, 1, 32, 1, 32, 1, 32, 1, 32, 1, 32, 1, 32, 5, 32, 546, 8, 32, 10, 32, 12, 32,
    549, 9, 32, 1, 32, 1, 32, 1, 32, 1, 33, 1, 33, 1, 33, 1, 33, 1, 33, 1, 33, 3, 33, 560, 8, 33, 1,
    33, 1, 33, 1, 33, 1, 33, 1, 33, 1, 33, 1, 33, 1, 33, 1, 33, 1, 34, 1, 34, 1, 34, 1, 34, 1, 34,
    1, 34, 3, 34, 577, 8, 34, 1, 34, 1, 34, 1, 34, 1, 34, 1, 34, 1, 34, 1, 34, 1, 34, 1, 34, 1, 35,
    3, 35, 589, 8, 35, 1, 35, 1, 35, 1, 36, 1, 36, 1, 37, 1, 37, 3, 37, 597, 8, 37, 1, 38, 1, 38, 1,
    39, 1, 39, 1, 40, 1, 40, 1, 41, 1, 41, 3, 41, 607, 8, 41, 1, 42, 1, 42, 1, 42, 5, 42, 612, 8,
    42, 10, 42, 12, 42, 615, 9, 42, 1, 43, 1, 43, 3, 43, 619, 8, 43, 1, 44, 1, 44, 1, 44, 5, 44,
    624, 8, 44, 10, 44, 12, 44, 627, 9, 44, 1, 45, 1, 45, 1, 45, 1, 45, 3, 45, 633, 8, 45, 1, 46, 1,
    46, 1, 46, 5, 46, 638, 8, 46, 10, 46, 12, 46, 641, 9, 46, 1, 47, 1, 47, 1, 48, 1, 48, 1, 48, 1,
    48, 1, 48, 3, 48, 650, 8, 48, 1, 49, 1, 49, 1, 50, 1, 50, 1, 51, 1, 51, 1, 52, 1, 52, 1, 52, 1,
    52, 1, 53, 3, 53, 663, 8, 53, 1, 53, 1, 53, 1, 54, 1, 54, 1, 54, 1, 54, 1, 55, 1, 55, 5, 55,
    673, 8, 55, 10, 55, 12, 55, 676, 9, 55, 1, 56, 1, 56, 1, 56, 1, 56, 1, 57, 1, 57, 1, 57, 1, 57,
    1, 57, 1, 57, 1, 57, 1, 57, 1, 57, 1, 57, 1, 57, 1, 57, 1, 57, 3, 57, 695, 8, 57, 1, 57, 1, 57,
    1, 57, 1, 57, 5, 57, 701, 8, 57, 10, 57, 12, 57, 704, 9, 57, 1, 58, 1, 58, 1, 58, 5, 58, 709, 8,
    58, 10, 58, 12, 58, 712, 9, 58, 1, 59, 1, 59, 1, 59, 1, 59, 1, 59, 1, 59, 3, 59, 720, 8, 59, 1,
    60, 1, 60, 3, 60, 724, 8, 60, 1, 60, 5, 60, 727, 8, 60, 10, 60, 12, 60, 730, 9, 60, 1, 61, 1,
    61, 1, 61, 1, 61, 1, 62, 1, 62, 1, 62, 1, 63, 1, 63, 1, 63, 1, 63, 1, 64, 1, 64, 1, 64, 1, 64,
    1, 64, 1, 64, 5, 64, 749, 8, 64, 10, 64, 12, 64, 752, 9, 64, 1, 64, 1, 64, 1, 65, 1, 65, 1, 65,
    3, 65, 759, 8, 65, 1, 65, 1, 65, 1, 66, 1, 66, 1, 67, 1, 67, 1, 67, 3, 67, 768, 8, 67, 1, 67, 1,
    67, 1, 68, 1, 68, 1, 68, 1, 68, 1, 69, 1, 69, 1, 69, 1, 69, 1, 69, 5, 69, 781, 8, 69, 10, 69,
    12, 69, 784, 9, 69, 1, 69, 1, 69, 1, 70, 1, 70, 1, 70, 1, 70, 1, 70, 1, 70, 5, 70, 794, 8, 70,
    10, 70, 12, 70, 797, 9, 70, 1, 70, 1, 70, 1, 70, 1, 70, 1, 71, 1, 71, 1, 71, 1, 71, 1, 71, 4,
    71, 808, 8, 71, 11, 71, 12, 71, 809, 1, 71, 1, 71, 1, 72, 1, 72, 1, 72, 1, 72, 1, 72, 1, 73, 1,
    73, 1, 73, 1, 73, 5, 73, 823, 8, 73, 10, 73, 12, 73, 826, 9, 73, 1, 73, 1, 73, 1, 74, 1, 74, 1,
    74, 1, 75, 1, 75, 1, 75, 1, 75, 1, 75, 0, 1, 114, 76, 0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22,
    24, 26, 28, 30, 32, 34, 36, 38, 40, 42, 44, 46, 48, 50, 52, 54, 56, 58, 60, 62, 64, 66, 68, 70,
    72, 74, 76, 78, 80, 82, 84, 86, 88, 90, 92, 94, 96, 98, 100, 102, 104, 106, 108, 110, 112, 114,
    116, 118, 120, 122, 124, 126, 128, 130, 132, 134, 136, 138, 140, 142, 144, 146, 148, 150, 0, 5,
    2, 0, 2, 6, 73, 73, 1, 0, 8, 9, 1, 0, 74, 76, 2, 0, 12, 12, 61, 61, 3, 0, 10, 11, 13, 15, 60,
    67, 856, 0, 153, 1, 0, 0, 0, 2, 178, 1, 0, 0, 0, 4, 180, 1, 0, 0, 0, 6, 198, 1, 0, 0, 0, 8, 221,
    1, 0, 0, 0, 10, 240, 1, 0, 0, 0, 12, 261, 1, 0, 0, 0, 14, 267, 1, 0, 0, 0, 16, 279, 1, 0, 0, 0,
    18, 303, 1, 0, 0, 0, 20, 327, 1, 0, 0, 0, 22, 341, 1, 0, 0, 0, 24, 343, 1, 0, 0, 0, 26, 351, 1,
    0, 0, 0, 28, 357, 1, 0, 0, 0, 30, 363, 1, 0, 0, 0, 32, 372, 1, 0, 0, 0, 34, 387, 1, 0, 0, 0, 36,
    400, 1, 0, 0, 0, 38, 415, 1, 0, 0, 0, 40, 419, 1, 0, 0, 0, 42, 437, 1, 0, 0, 0, 44, 444, 1, 0,
    0, 0, 46, 447, 1, 0, 0, 0, 48, 457, 1, 0, 0, 0, 50, 463, 1, 0, 0, 0, 52, 467, 1, 0, 0, 0, 54,
    473, 1, 0, 0, 0, 56, 477, 1, 0, 0, 0, 58, 483, 1, 0, 0, 0, 60, 503, 1, 0, 0, 0, 62, 509, 1, 0,
    0, 0, 64, 532, 1, 0, 0, 0, 66, 553, 1, 0, 0, 0, 68, 570, 1, 0, 0, 0, 70, 588, 1, 0, 0, 0, 72,
    592, 1, 0, 0, 0, 74, 596, 1, 0, 0, 0, 76, 598, 1, 0, 0, 0, 78, 600, 1, 0, 0, 0, 80, 602, 1, 0,
    0, 0, 82, 606, 1, 0, 0, 0, 84, 608, 1, 0, 0, 0, 86, 618, 1, 0, 0, 0, 88, 620, 1, 0, 0, 0, 90,
    632, 1, 0, 0, 0, 92, 634, 1, 0, 0, 0, 94, 642, 1, 0, 0, 0, 96, 649, 1, 0, 0, 0, 98, 651, 1, 0,
    0, 0, 100, 653, 1, 0, 0, 0, 102, 655, 1, 0, 0, 0, 104, 657, 1, 0, 0, 0, 106, 662, 1, 0, 0, 0,
    108, 666, 1, 0, 0, 0, 110, 670, 1, 0, 0, 0, 112, 677, 1, 0, 0, 0, 114, 694, 1, 0, 0, 0, 116,
    705, 1, 0, 0, 0, 118, 719, 1, 0, 0, 0, 120, 723, 1, 0, 0, 0, 122, 731, 1, 0, 0, 0, 124, 735, 1,
    0, 0, 0, 126, 738, 1, 0, 0, 0, 128, 742, 1, 0, 0, 0, 130, 755, 1, 0, 0, 0, 132, 762, 1, 0, 0, 0,
    134, 764, 1, 0, 0, 0, 136, 771, 1, 0, 0, 0, 138, 775, 1, 0, 0, 0, 140, 787, 1, 0, 0, 0, 142,
    802, 1, 0, 0, 0, 144, 813, 1, 0, 0, 0, 146, 818, 1, 0, 0, 0, 148, 829, 1, 0, 0, 0, 150, 832, 1,
    0, 0, 0, 152, 154, 5, 49, 0, 0, 153, 152, 1, 0, 0, 0, 153, 154, 1, 0, 0, 0, 154, 158, 1, 0, 0,
    0, 155, 157, 3, 2, 1, 0, 156, 155, 1, 0, 0, 0, 157, 160, 1, 0, 0, 0, 158, 156, 1, 0, 0, 0, 158,
    159, 1, 0, 0, 0, 159, 164, 1, 0, 0, 0, 160, 158, 1, 0, 0, 0, 161, 163, 5, 70, 0, 0, 162, 161, 1,
    0, 0, 0, 163, 166, 1, 0, 0, 0, 164, 162, 1, 0, 0, 0, 164, 165, 1, 0, 0, 0, 165, 167, 1, 0, 0, 0,
    166, 164, 1, 0, 0, 0, 167, 168, 5, 0, 0, 1, 168, 1, 1, 0, 0, 0, 169, 179, 3, 4, 2, 0, 170, 179,
    3, 6, 3, 0, 171, 179, 3, 8, 4, 0, 172, 179, 3, 10, 5, 0, 173, 179, 3, 12, 6, 0, 174, 179, 3, 14,
    7, 0, 175, 179, 3, 16, 8, 0, 176, 179, 3, 18, 9, 0, 177, 179, 3, 20, 10, 0, 178, 169, 1, 0, 0,
    0, 178, 170, 1, 0, 0, 0, 178, 171, 1, 0, 0, 0, 178, 172, 1, 0, 0, 0, 178, 173, 1, 0, 0, 0, 178,
    174, 1, 0, 0, 0, 178, 175, 1, 0, 0, 0, 178, 176, 1, 0, 0, 0, 178, 177, 1, 0, 0, 0, 179, 3, 1, 0,
    0, 0, 180, 181, 5, 24, 0, 0, 181, 182, 5, 35, 0, 0, 182, 183, 5, 55, 0, 0, 183, 184, 5, 56, 0,
    0, 184, 185, 5, 56, 0, 0, 185, 186, 5, 16, 0, 0, 186, 187, 5, 36, 0, 0, 187, 188, 5, 59, 0, 0,
    188, 192, 5, 70, 0, 0, 189, 191, 3, 22, 11, 0, 190, 189, 1, 0, 0, 0, 191, 194, 1, 0, 0, 0, 192,
    190, 1, 0, 0, 0, 192, 193, 1, 0, 0, 0, 193, 195, 1, 0, 0, 0, 194, 192, 1, 0, 0, 0, 195, 196, 5,
    49, 0, 0, 196, 197, 5, 70, 0, 0, 197, 5, 1, 0, 0, 0, 198, 199, 5, 24, 0, 0, 199, 200, 3, 76, 38,
    0, 200, 202, 5, 55, 0, 0, 201, 203, 3, 88, 44, 0, 202, 201, 1, 0, 0, 0, 202, 203, 1, 0, 0, 0,
    203, 204, 1, 0, 0, 0, 204, 205, 5, 56, 0, 0, 205, 206, 5, 16, 0, 0, 206, 207, 3, 90, 45, 0, 207,
    208, 5, 59, 0, 0, 208, 209, 5, 82, 0, 0, 209, 214, 5, 70, 0, 0, 210, 213, 3, 48, 24, 0, 211,
    213, 3, 22, 11, 0, 212, 210, 1, 0, 0, 0, 212, 211, 1, 0, 0, 0, 213, 216, 1, 0, 0, 0, 214, 212,
    1, 0, 0, 0, 214, 215, 1, 0, 0, 0, 215, 217, 1, 0, 0, 0, 216, 214, 1, 0, 0, 0, 217, 218, 3, 50,
    25, 0, 218, 219, 5, 49, 0, 0, 219, 220, 5, 70, 0, 0, 220, 7, 1, 0, 0, 0, 221, 222, 5, 25, 0, 0,
    222, 223, 3, 78, 39, 0, 223, 224, 5, 55, 0, 0, 224, 225, 5, 45, 0, 0, 225, 226, 5, 56, 0, 0,
    226, 227, 5, 49, 0, 0, 227, 234, 5, 70, 0, 0, 228, 233, 3, 46, 23, 0, 229, 233, 3, 48, 24, 0,
    230, 233, 3, 26, 13, 0, 231, 233, 3, 44, 22, 0, 232, 228, 1, 0, 0, 0, 232, 229, 1, 0, 0, 0, 232,
    230, 1, 0, 0, 0, 232, 231, 1, 0, 0, 0, 233, 236, 1, 0, 0, 0, 234, 232, 1, 0, 0, 0, 234, 235, 1,
    0, 0, 0, 235, 237, 1, 0, 0, 0, 236, 234, 1, 0, 0, 0, 237, 238, 5, 49, 0, 0, 238, 239, 5, 70, 0,
    0, 239, 9, 1, 0, 0, 0, 240, 241, 5, 24, 0, 0, 241, 242, 3, 76, 38, 0, 242, 244, 5, 55, 0, 0,
    243, 245, 3, 88, 44, 0, 244, 243, 1, 0, 0, 0, 244, 245, 1, 0, 0, 0, 245, 246, 1, 0, 0, 0, 246,
    247, 5, 56, 0, 0, 247, 248, 5, 16, 0, 0, 248, 249, 5, 36, 0, 0, 249, 250, 5, 59, 0, 0, 250, 251,
    5, 83, 0, 0, 251, 255, 5, 70, 0, 0, 252, 254, 3, 22, 11, 0, 253, 252, 1, 0, 0, 0, 254, 257, 1,
    0, 0, 0, 255, 253, 1, 0, 0, 0, 255, 256, 1, 0, 0, 0, 256, 258, 1, 0, 0, 0, 257, 255, 1, 0, 0, 0,
    258, 259, 5, 49, 0, 0, 259, 260, 5, 70, 0, 0, 260, 11, 1, 0, 0, 0, 261, 262, 3, 72, 36, 0, 262,
    263, 5, 13, 0, 0, 263, 264, 3, 82, 41, 0, 264, 265, 5, 84, 0, 0, 265, 266, 5, 70, 0, 0, 266, 13,
    1, 0, 0, 0, 267, 268, 5, 25, 0, 0, 268, 269, 3, 80, 40, 0, 269, 270, 5, 55, 0, 0, 270, 271, 5,
    44, 0, 0, 271, 272, 5, 56, 0, 0, 272, 273, 5, 59, 0, 0, 273, 274, 5, 85, 0, 0, 274, 275, 5, 70,
    0, 0, 275, 276, 3, 92, 46, 0, 276, 277, 5, 70, 0, 0, 277, 278, 5, 49, 0, 0, 278, 15, 1, 0, 0, 0,
    279, 280, 5, 25, 0, 0, 280, 285, 3, 80, 40, 0, 281, 282, 5, 55, 0, 0, 282, 283, 3, 80, 40, 0,
    283, 284, 5, 56, 0, 0, 284, 286, 1, 0, 0, 0, 285, 281, 1, 0, 0, 0, 285, 286, 1, 0, 0, 0, 286,
    287, 1, 0, 0, 0, 287, 288, 5, 59, 0, 0, 288, 289, 5, 86, 0, 0, 289, 297, 5, 70, 0, 0, 290, 296,
    3, 58, 29, 0, 291, 296, 3, 60, 30, 0, 292, 296, 3, 62, 31, 0, 293, 296, 3, 64, 32, 0, 294, 296,
    3, 70, 35, 0, 295, 290, 1, 0, 0, 0, 295, 291, 1, 0, 0, 0, 295, 292, 1, 0, 0, 0, 295, 293, 1, 0,
    0, 0, 295, 294, 1, 0, 0, 0, 296, 299, 1, 0, 0, 0, 297, 295, 1, 0, 0, 0, 297, 298, 1, 0, 0, 0,
    298, 300, 1, 0, 0, 0, 299, 297, 1, 0, 0, 0, 300, 301, 5, 49, 0, 0, 301, 302, 5, 70, 0, 0, 302,
    17, 1, 0, 0, 0, 303, 304, 5, 25, 0, 0, 304, 309, 3, 80, 40, 0, 305, 306, 5, 55, 0, 0, 306, 310,
    3, 80, 40, 0, 307, 308, 5, 43, 0, 0, 308, 310, 5, 56, 0, 0, 309, 305, 1, 0, 0, 0, 309, 307, 1,
    0, 0, 0, 310, 311, 1, 0, 0, 0, 311, 312, 5, 87, 0, 0, 312, 321, 5, 70, 0, 0, 313, 320, 3, 60,
    30, 0, 314, 320, 3, 62, 31, 0, 315, 320, 3, 64, 32, 0, 316, 320, 3, 66, 33, 0, 317, 320, 3, 68,
    34, 0, 318, 320, 3, 70, 35, 0, 319, 313, 1, 0, 0, 0, 319, 314, 1, 0, 0, 0, 319, 315, 1, 0, 0, 0,
    319, 316, 1, 0, 0, 0, 319, 317, 1, 0, 0, 0, 319, 318, 1, 0, 0, 0, 320, 323, 1, 0, 0, 0, 321,
    319, 1, 0, 0, 0, 321, 322, 1, 0, 0, 0, 322, 324, 1, 0, 0, 0, 323, 321, 1, 0, 0, 0, 324, 325, 5,
    49, 0, 0, 325, 326, 5, 70, 0, 0, 326, 19, 1, 0, 0, 0, 327, 328, 5, 49, 0, 0, 328, 329, 5, 70, 0,
    0, 329, 21, 1, 0, 0, 0, 330, 342, 3, 24, 12, 0, 331, 342, 3, 26, 13, 0, 332, 342, 3, 28, 14, 0,
    333, 342, 3, 30, 15, 0, 334, 342, 3, 32, 16, 0, 335, 342, 3, 34, 17, 0, 336, 342, 3, 36, 18, 0,
    337, 342, 3, 38, 19, 0, 338, 342, 3, 40, 20, 0, 339, 342, 3, 42, 21, 0, 340, 342, 3, 44, 22, 0,
    341, 330, 1, 0, 0, 0, 341, 331, 1, 0, 0, 0, 341, 332, 1, 0, 0, 0, 341, 333, 1, 0, 0, 0, 341,
    334, 1, 0, 0, 0, 341, 335, 1, 0, 0, 0, 341, 336, 1, 0, 0, 0, 341, 337, 1, 0, 0, 0, 341, 338, 1,
    0, 0, 0, 341, 339, 1, 0, 0, 0, 341, 340, 1, 0, 0, 0, 342, 23, 1, 0, 0, 0, 343, 344, 5, 38, 0, 0,
    344, 346, 5, 55, 0, 0, 345, 347, 3, 114, 57, 0, 346, 345, 1, 0, 0, 0, 346, 347, 1, 0, 0, 0, 347,
    348, 1, 0, 0, 0, 348, 349, 5, 56, 0, 0, 349, 350, 5, 70, 0, 0, 350, 25, 1, 0, 0, 0, 351, 352, 3,
    72, 36, 0, 352, 353, 5, 13, 0, 0, 353, 354, 3, 114, 57, 0, 354, 355, 5, 88, 0, 0, 355, 356, 5,
    70, 0, 0, 356, 27, 1, 0, 0, 0, 357, 358, 3, 74, 37, 0, 358, 359, 5, 13, 0, 0, 359, 360, 3, 114,
    57, 0, 360, 361, 5, 89, 0, 0, 361, 362, 5, 70, 0, 0, 362, 29, 1, 0, 0, 0, 363, 364, 3, 72, 36,
    0, 364, 365, 5, 13, 0, 0, 365, 366, 5, 33, 0, 0, 366, 367, 5, 55, 0, 0, 367, 368, 3, 114, 57, 0,
    368, 369, 5, 56, 0, 0, 369, 370, 5, 90, 0, 0, 370, 371, 5, 70, 0, 0, 371, 31, 1, 0, 0, 0, 372,
    373, 5, 30, 0, 0, 373, 374, 3, 114, 57, 0, 374, 375, 5, 59, 0, 0, 375, 381, 5, 70, 0, 0, 376,
    380, 3, 52, 26, 0, 377, 380, 3, 54, 27, 0, 378, 380, 3, 22, 11, 0, 379, 376, 1, 0, 0, 0, 379,
    377, 1, 0, 0, 0, 379, 378, 1, 0, 0, 0, 380, 383, 1, 0, 0, 0, 381, 379, 1, 0, 0, 0, 381, 382, 1,
    0, 0, 0, 382, 384, 1, 0, 0, 0, 383, 381, 1, 0, 0, 0, 384, 385, 5, 49, 0, 0, 385, 386, 5, 70, 0,
    0, 386, 33, 1, 0, 0, 0, 387, 388, 5, 42, 0, 0, 388, 389, 3, 114, 57, 0, 389, 390, 5, 59, 0, 0,
    390, 394, 5, 70, 0, 0, 391, 393, 3, 22, 11, 0, 392, 391, 1, 0, 0, 0, 393, 396, 1, 0, 0, 0, 394,
    392, 1, 0, 0, 0, 394, 395, 1, 0, 0, 0, 395, 397, 1, 0, 0, 0, 396, 394, 1, 0, 0, 0, 397, 398, 5,
    49, 0, 0, 398, 399, 5, 70, 0, 0, 399, 35, 1, 0, 0, 0, 400, 401, 5, 29, 0, 0, 401, 402, 3, 72,
    36, 0, 402, 403, 5, 31, 0, 0, 403, 404, 3, 114, 57, 0, 404, 405, 5, 59, 0, 0, 405, 409, 5, 70,
    0, 0, 406, 408, 3, 22, 11, 0, 407, 406, 1, 0, 0, 0, 408, 411, 1, 0, 0, 0, 409, 407, 1, 0, 0, 0,
    409, 410, 1, 0, 0, 0, 410, 412, 1, 0, 0, 0, 411, 409, 1, 0, 0, 0, 412, 413, 5, 49, 0, 0, 413,
    414, 5, 70, 0, 0, 414, 37, 1, 0, 0, 0, 415, 416, 3, 116, 58, 0, 416, 417, 5, 91, 0, 0, 417, 418,
    5, 70, 0, 0, 418, 39, 1, 0, 0, 0, 419, 420, 5, 41, 0, 0, 420, 424, 5, 70, 0, 0, 421, 423, 3, 22,
    11, 0, 422, 421, 1, 0, 0, 0, 423, 426, 1, 0, 0, 0, 424, 422, 1, 0, 0, 0, 424, 425, 1, 0, 0, 0,
    425, 427, 1, 0, 0, 0, 426, 424, 1, 0, 0, 0, 427, 431, 3, 56, 28, 0, 428, 430, 3, 22, 11, 0, 429,
    428, 1, 0, 0, 0, 430, 433, 1, 0, 0, 0, 431, 429, 1, 0, 0, 0, 431, 432, 1, 0, 0, 0, 432, 434, 1,
    0, 0, 0, 433, 431, 1, 0, 0, 0, 434, 435, 5, 49, 0, 0, 435, 436, 5, 70, 0, 0, 436, 41, 1, 0, 0,
    0, 437, 438, 5, 39, 0, 0, 438, 439, 3, 80, 40, 0, 439, 440, 5, 55, 0, 0, 440, 441, 3, 106, 53,
    0, 441, 442, 5, 56, 0, 0, 442, 443, 5, 70, 0, 0, 443, 43, 1, 0, 0, 0, 444, 445, 5, 49, 0, 0,
    445, 446, 5, 70, 0, 0, 446, 45, 1, 0, 0, 0, 447, 448, 5, 20, 0, 0, 448, 449, 5, 57, 0, 0, 449,
    450, 5, 22, 0, 0, 450, 451, 5, 55, 0, 0, 451, 452, 3, 94, 47, 0, 452, 453, 5, 58, 0, 0, 453,
    454, 3, 114, 57, 0, 454, 455, 5, 56, 0, 0, 455, 456, 5, 70, 0, 0, 456, 47, 1, 0, 0, 0, 457, 458,
    3, 72, 36, 0, 458, 459, 5, 13, 0, 0, 459, 460, 3, 114, 57, 0, 460, 461, 5, 92, 0, 0, 461, 462,
    5, 70, 0, 0, 462, 49, 1, 0, 0, 0, 463, 464, 5, 40, 0, 0, 464, 465, 3, 114, 57, 0, 465, 466, 5,
    70, 0, 0, 466, 51, 1, 0, 0, 0, 467, 468, 5, 26, 0, 0, 468, 469, 3, 114, 57, 0, 469, 470, 5, 59,
    0, 0, 470, 471, 5, 93, 0, 0, 471, 472, 5, 70, 0, 0, 472, 53, 1, 0, 0, 0, 473, 474, 5, 27, 0, 0,
    474, 475, 5, 59, 0, 0, 475, 476, 5, 70, 0, 0, 476, 55, 1, 0, 0, 0, 477, 478, 5, 28, 0, 0, 478,
    479, 3, 80, 40, 0, 479, 480, 5, 23, 0, 0, 480, 481, 3, 72, 36, 0, 481, 482, 5, 70, 0, 0, 482,
    57, 1, 0, 0, 0, 483, 484, 5, 24, 0, 0, 484, 485, 5, 32, 0, 0, 485, 487, 5, 55, 0, 0, 486, 488,
    3, 88, 44, 0, 487, 486, 1, 0, 0, 0, 487, 488, 1, 0, 0, 0, 488, 489, 1, 0, 0, 0, 489, 490, 5, 56,
    0, 0, 490, 491, 5, 16, 0, 0, 491, 492, 5, 36, 0, 0, 492, 493, 5, 59, 0, 0, 493, 497, 5, 70, 0,
    0, 494, 496, 3, 22, 11, 0, 495, 494, 1, 0, 0, 0, 496, 499, 1, 0, 0, 0, 497, 495, 1, 0, 0, 0,
    497, 498, 1, 0, 0, 0, 498, 500, 1, 0, 0, 0, 499, 497, 1, 0, 0, 0, 500, 501, 5, 49, 0, 0, 501,
    502, 5, 70, 0, 0, 502, 59, 1, 0, 0, 0, 503, 504, 3, 72, 36, 0, 504, 505, 5, 59, 0, 0, 505, 506,
    3, 90, 45, 0, 506, 507, 5, 94, 0, 0, 507, 508, 5, 70, 0, 0, 508, 61, 1, 0, 0, 0, 509, 510, 5,
    24, 0, 0, 510, 511, 3, 76, 38, 0, 511, 513, 5, 55, 0, 0, 512, 514, 3, 88, 44, 0, 513, 512, 1, 0,
    0, 0, 513, 514, 1, 0, 0, 0, 514, 515, 1, 0, 0, 0, 515, 516, 5, 56, 0, 0, 516, 517, 5, 16, 0, 0,
    517, 518, 3, 90, 45, 0, 518, 519, 5, 59, 0, 0, 519, 520, 5, 95, 0, 0, 520, 525, 5, 70, 0, 0,
    521, 524, 3, 48, 24, 0, 522, 524, 3, 22, 11, 0, 523, 521, 1, 0, 0, 0, 523, 522, 1, 0, 0, 0, 524,
    527, 1, 0, 0, 0, 525, 523, 1, 0, 0, 0, 525, 526, 1, 0, 0, 0, 526, 528, 1, 0, 0, 0, 527, 525, 1,
    0, 0, 0, 528, 529, 3, 50, 25, 0, 529, 530, 5, 49, 0, 0, 530, 531, 5, 70, 0, 0, 531, 63, 1, 0, 0,
    0, 532, 533, 5, 24, 0, 0, 533, 534, 3, 76, 38, 0, 534, 536, 5, 55, 0, 0, 535, 537, 3, 88, 44, 0,
    536, 535, 1, 0, 0, 0, 536, 537, 1, 0, 0, 0, 537, 538, 1, 0, 0, 0, 538, 539, 5, 56, 0, 0, 539,
    540, 5, 16, 0, 0, 540, 541, 5, 36, 0, 0, 541, 542, 5, 59, 0, 0, 542, 543, 5, 96, 0, 0, 543, 547,
    5, 70, 0, 0, 544, 546, 3, 22, 11, 0, 545, 544, 1, 0, 0, 0, 546, 549, 1, 0, 0, 0, 547, 545, 1, 0,
    0, 0, 547, 548, 1, 0, 0, 0, 548, 550, 1, 0, 0, 0, 549, 547, 1, 0, 0, 0, 550, 551, 5, 49, 0, 0,
    551, 552, 5, 70, 0, 0, 552, 65, 1, 0, 0, 0, 553, 554, 5, 21, 0, 0, 554, 555, 5, 70, 0, 0, 555,
    556, 5, 24, 0, 0, 556, 557, 3, 76, 38, 0, 557, 559, 5, 55, 0, 0, 558, 560, 3, 88, 44, 0, 559,
    558, 1, 0, 0, 0, 559, 560, 1, 0, 0, 0, 560, 561, 1, 0, 0, 0, 561, 562, 5, 56, 0, 0, 562, 563, 5,
    16, 0, 0, 563, 564, 3, 90, 45, 0, 564, 565, 5, 59, 0, 0, 565, 566, 5, 70, 0, 0, 566, 567, 5, 37,
    0, 0, 567, 568, 5, 49, 0, 0, 568, 569, 5, 70, 0, 0, 569, 67, 1, 0, 0, 0, 570, 571, 5, 21, 0, 0,
    571, 572, 5, 70, 0, 0, 572, 573, 5, 24, 0, 0, 573, 574, 3, 76, 38, 0, 574, 576, 5, 55, 0, 0,
    575, 577, 3, 88, 44, 0, 576, 575, 1, 0, 0, 0, 576, 577, 1, 0, 0, 0, 577, 578, 1, 0, 0, 0, 578,
    579, 5, 56, 0, 0, 579, 580, 5, 16, 0, 0, 580, 581, 5, 36, 0, 0, 581, 582, 5, 59, 0, 0, 582, 583,
    5, 70, 0, 0, 583, 584, 5, 37, 0, 0, 584, 585, 5, 49, 0, 0, 585, 586, 5, 70, 0, 0, 586, 69, 1, 0,
    0, 0, 587, 589, 5, 49, 0, 0, 588, 587, 1, 0, 0, 0, 588, 589, 1, 0, 0, 0, 589, 590, 1, 0, 0, 0,
    590, 591, 5, 70, 0, 0, 591, 71, 1, 0, 0, 0, 592, 593, 5, 72, 0, 0, 593, 73, 1, 0, 0, 0, 594,
    597, 3, 110, 55, 0, 595, 597, 3, 112, 56, 0, 596, 594, 1, 0, 0, 0, 596, 595, 1, 0, 0, 0, 597,
    75, 1, 0, 0, 0, 598, 599, 5, 72, 0, 0, 599, 77, 1, 0, 0, 0, 600, 601, 5, 71, 0, 0, 601, 79, 1,
    0, 0, 0, 602, 603, 7, 0, 0, 0, 603, 81, 1, 0, 0, 0, 604, 607, 3, 96, 48, 0, 605, 607, 3, 72, 36,
    0, 606, 604, 1, 0, 0, 0, 606, 605, 1, 0, 0, 0, 607, 83, 1, 0, 0, 0, 608, 613, 3, 86, 43, 0, 609,
    610, 5, 58, 0, 0, 610, 612, 3, 86, 43, 0, 611, 609, 1, 0, 0, 0, 612, 615, 1, 0, 0, 0, 613, 611,
    1, 0, 0, 0, 613, 614, 1, 0, 0, 0, 614, 85, 1, 0, 0, 0, 615, 613, 1, 0, 0, 0, 616, 619, 3, 144,
    72, 0, 617, 619, 3, 114, 57, 0, 618, 616, 1, 0, 0, 0, 618, 617, 1, 0, 0, 0, 619, 87, 1, 0, 0, 0,
    620, 625, 3, 136, 68, 0, 621, 622, 5, 58, 0, 0, 622, 624, 3, 136, 68, 0, 623, 621, 1, 0, 0, 0,
    624, 627, 1, 0, 0, 0, 625, 623, 1, 0, 0, 0, 625, 626, 1, 0, 0, 0, 626, 89, 1, 0, 0, 0, 627, 625,
    1, 0, 0, 0, 628, 633, 3, 142, 71, 0, 629, 633, 3, 80, 40, 0, 630, 633, 3, 138, 69, 0, 631, 633,
    3, 140, 70, 0, 632, 628, 1, 0, 0, 0, 632, 629, 1, 0, 0, 0, 632, 630, 1, 0, 0, 0, 632, 631, 1, 0,
    0, 0, 633, 91, 1, 0, 0, 0, 634, 639, 3, 72, 36, 0, 635, 636, 5, 58, 0, 0, 636, 638, 3, 72, 36,
    0, 637, 635, 1, 0, 0, 0, 638, 641, 1, 0, 0, 0, 639, 637, 1, 0, 0, 0, 639, 640, 1, 0, 0, 0, 640,
    93, 1, 0, 0, 0, 641, 639, 1, 0, 0, 0, 642, 643, 3, 114, 57, 0, 643, 95, 1, 0, 0, 0, 644, 650, 3,
    98, 49, 0, 645, 650, 3, 100, 50, 0, 646, 650, 3, 102, 51, 0, 647, 650, 3, 106, 53, 0, 648, 650,
    3, 104, 52, 0, 649, 644, 1, 0, 0, 0, 649, 645, 1, 0, 0, 0, 649, 646, 1, 0, 0, 0, 649, 647, 1, 0,
    0, 0, 649, 648, 1, 0, 0, 0, 650, 97, 1, 0, 0, 0, 651, 652, 7, 1, 0, 0, 652, 99, 1, 0, 0, 0, 653,
    654, 7, 2, 0, 0, 654, 101, 1, 0, 0, 0, 655, 656, 5, 77, 0, 0, 656, 103, 1, 0, 0, 0, 657, 658, 3,
    80, 40, 0, 658, 659, 5, 57, 0, 0, 659, 660, 3, 72, 36, 0, 660, 105, 1, 0, 0, 0, 661, 663, 5, 19,
    0, 0, 662, 661, 1, 0, 0, 0, 662, 663, 1, 0, 0, 0, 663, 664, 1, 0, 0, 0, 664, 665, 5, 78, 0, 0,
    665, 107, 1, 0, 0, 0, 666, 667, 5, 53, 0, 0, 667, 668, 3, 114, 57, 0, 668, 669, 5, 54, 0, 0,
    669, 109, 1, 0, 0, 0, 670, 674, 3, 72, 36, 0, 671, 673, 3, 108, 54, 0, 672, 671, 1, 0, 0, 0,
    673, 676, 1, 0, 0, 0, 674, 672, 1, 0, 0, 0, 674, 675, 1, 0, 0, 0, 675, 111, 1, 0, 0, 0, 676,
    674, 1, 0, 0, 0, 677, 678, 5, 20, 0, 0, 678, 679, 5, 57, 0, 0, 679, 680, 3, 110, 55, 0, 680,
    113, 1, 0, 0, 0, 681, 682, 6, 57, -1, 0, 682, 695, 3, 134, 67, 0, 683, 695, 3, 124, 62, 0, 684,
    695, 3, 116, 58, 0, 685, 686, 5, 48, 0, 0, 686, 687, 5, 55, 0, 0, 687, 688, 3, 114, 57, 0, 688,
    689, 5, 58, 0, 0, 689, 690, 3, 114, 57, 0, 690, 691, 5, 58, 0, 0, 691, 692, 3, 114, 57, 0, 692,
    693, 5, 56, 0, 0, 693, 695, 1, 0, 0, 0, 694, 681, 1, 0, 0, 0, 694, 683, 1, 0, 0, 0, 694, 684, 1,
    0, 0, 0, 694, 685, 1, 0, 0, 0, 695, 702, 1, 0, 0, 0, 696, 697, 10, 2, 0, 0, 697, 698, 3, 132,
    66, 0, 698, 699, 3, 114, 57, 3, 699, 701, 1, 0, 0, 0, 700, 696, 1, 0, 0, 0, 701, 704, 1, 0, 0,
    0, 702, 700, 1, 0, 0, 0, 702, 703, 1, 0, 0, 0, 703, 115, 1, 0, 0, 0, 704, 702, 1, 0, 0, 0, 705,
    710, 3, 118, 59, 0, 706, 707, 5, 57, 0, 0, 707, 709, 3, 120, 60, 0, 708, 706, 1, 0, 0, 0, 709,
    712, 1, 0, 0, 0, 710, 708, 1, 0, 0, 0, 710, 711, 1, 0, 0, 0, 711, 117, 1, 0, 0, 0, 712, 710, 1,
    0, 0, 0, 713, 720, 5, 20, 0, 0, 714, 720, 3, 122, 61, 0, 715, 720, 3, 128, 64, 0, 716, 720, 3,
    96, 48, 0, 717, 720, 3, 146, 73, 0, 718, 720, 3, 120, 60, 0, 719, 713, 1, 0, 0, 0, 719, 714, 1,
    0, 0, 0, 719, 715, 1, 0, 0, 0, 719, 716, 1, 0, 0, 0, 719, 717, 1, 0, 0, 0, 719, 718, 1, 0, 0, 0,
    720, 119, 1, 0, 0, 0, 721, 724, 3, 72, 36, 0, 722, 724, 3, 130, 65, 0, 723, 721, 1, 0, 0, 0,
    723, 722, 1, 0, 0, 0, 724, 728, 1, 0, 0, 0, 725, 727, 3, 108, 54, 0, 726, 725, 1, 0, 0, 0, 727,
    730, 1, 0, 0, 0, 728, 726, 1, 0, 0, 0, 728, 729, 1, 0, 0, 0, 729, 121, 1, 0, 0, 0, 730, 728, 1,
    0, 0, 0, 731, 732, 5, 55, 0, 0, 732, 733, 3, 114, 57, 0, 733, 734, 5, 56, 0, 0, 734, 123, 1, 0,
    0, 0, 735, 736, 7, 3, 0, 0, 736, 737, 3, 116, 58, 0, 737, 125, 1, 0, 0, 0, 738, 739, 3, 116, 58,
    0, 739, 740, 3, 132, 66, 0, 740, 741, 3, 114, 57, 0, 741, 127, 1, 0, 0, 0, 742, 743, 5, 55, 0,
    0, 743, 744, 3, 114, 57, 0, 744, 745, 5, 58, 0, 0, 745, 750, 3, 114, 57, 0, 746, 747, 5, 58, 0,
    0, 747, 749, 3, 114, 57, 0, 748, 746, 1, 0, 0, 0, 749, 752, 1, 0, 0, 0, 750, 748, 1, 0, 0, 0,
    750, 751, 1, 0, 0, 0, 751, 753, 1, 0, 0, 0, 752, 750, 1, 0, 0, 0, 753, 754, 5, 56, 0, 0, 754,
    129, 1, 0, 0, 0, 755, 756, 3, 76, 38, 0, 756, 758, 5, 55, 0, 0, 757, 759, 3, 84, 42, 0, 758,
    757, 1, 0, 0, 0, 758, 759, 1, 0, 0, 0, 759, 760, 1, 0, 0, 0, 760, 761, 5, 56, 0, 0, 761, 131, 1,
    0, 0, 0, 762, 763, 7, 4, 0, 0, 763, 133, 1, 0, 0, 0, 764, 765, 3, 90, 45, 0, 765, 767, 5, 55, 0,
    0, 766, 768, 3, 84, 42, 0, 767, 766, 1, 0, 0, 0, 767, 768, 1, 0, 0, 0, 768, 769, 1, 0, 0, 0,
    769, 770, 5, 56, 0, 0, 770, 135, 1, 0, 0, 0, 771, 772, 3, 72, 36, 0, 772, 773, 5, 59, 0, 0, 773,
    774, 3, 90, 45, 0, 774, 137, 1, 0, 0, 0, 775, 776, 3, 80, 40, 0, 776, 777, 5, 53, 0, 0, 777,
    782, 3, 90, 45, 0, 778, 779, 5, 58, 0, 0, 779, 781, 3, 90, 45, 0, 780, 778, 1, 0, 0, 0, 781,
    784, 1, 0, 0, 0, 782, 780, 1, 0, 0, 0, 782, 783, 1, 0, 0, 0, 783, 785, 1, 0, 0, 0, 784, 782, 1,
    0, 0, 0, 785, 786, 5, 54, 0, 0, 786, 139, 1, 0, 0, 0, 787, 788, 5, 7, 0, 0, 788, 789, 5, 53, 0,
    0, 789, 790, 5, 53, 0, 0, 790, 795, 3, 90, 45, 0, 791, 792, 5, 58, 0, 0, 792, 794, 3, 90, 45, 0,
    793, 791, 1, 0, 0, 0, 794, 797, 1, 0, 0, 0, 795, 793, 1, 0, 0, 0, 795, 796, 1, 0, 0, 0, 796,
    798, 1, 0, 0, 0, 797, 795, 1, 0, 0, 0, 798, 799, 5, 54, 0, 0, 799, 800, 3, 90, 45, 0, 800, 801,
    5, 54, 0, 0, 801, 141, 1, 0, 0, 0, 802, 803, 5, 47, 0, 0, 803, 804, 5, 53, 0, 0, 804, 807, 3,
    90, 45, 0, 805, 806, 5, 58, 0, 0, 806, 808, 3, 90, 45, 0, 807, 805, 1, 0, 0, 0, 808, 809, 1, 0,
    0, 0, 809, 807, 1, 0, 0, 0, 809, 810, 1, 0, 0, 0, 810, 811, 1, 0, 0, 0, 811, 812, 5, 54, 0, 0,
    812, 143, 1, 0, 0, 0, 813, 814, 5, 34, 0, 0, 814, 815, 3, 84, 42, 0, 815, 816, 5, 59, 0, 0, 816,
    817, 3, 114, 57, 0, 817, 145, 1, 0, 0, 0, 818, 819, 5, 53, 0, 0, 819, 824, 3, 114, 57, 0, 820,
    821, 5, 58, 0, 0, 821, 823, 3, 114, 57, 0, 822, 820, 1, 0, 0, 0, 823, 826, 1, 0, 0, 0, 824, 822,
    1, 0, 0, 0, 824, 825, 1, 0, 0, 0, 825, 827, 1, 0, 0, 0, 826, 824, 1, 0, 0, 0, 827, 828, 5, 54,
    0, 0, 828, 147, 1, 0, 0, 0, 829, 830, 5, 19, 0, 0, 830, 831, 5, 78, 0, 0, 831, 149, 1, 0, 0, 0,
    832, 833, 3, 116, 58, 0, 833, 834, 5, 46, 0, 0, 834, 835, 3, 116, 58, 0, 835, 151, 1, 0, 0, 0,
    59, 153, 158, 164, 178, 192, 202, 212, 214, 232, 234, 244, 255, 285, 295, 297, 309, 319, 321,
    341, 346, 379, 381, 394, 409, 424, 431, 487, 497, 513, 523, 525, 536, 547, 559, 576, 588, 596,
    606, 613, 618, 625, 632, 639, 649, 662, 674, 694, 702, 710, 719, 723, 728, 750, 758, 767, 782,
    795, 809, 824,
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
  public COMMENT(): antlr.TerminalNode | null {
    return this.getToken(PythonParser.COMMENT, 0);
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
  public commentGlobal(): CommentGlobalContext | null {
    return this.getRuleContext(0, CommentGlobalContext);
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
  public CLOSE_BRACKET(): antlr.TerminalNode[];
  public CLOSE_BRACKET(i: number): antlr.TerminalNode | null;
  public CLOSE_BRACKET(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    if (i === undefined) {
      return this.getTokens(PythonParser.CLOSE_BRACKET);
    } else {
      return this.getToken(PythonParser.CLOSE_BRACKET, i);
    }
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
  public COMMENT(): antlr.TerminalNode {
    return this.getToken(PythonParser.COMMENT, 0)!;
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
  public FUNCTION_ANNOTATION(): antlr.TerminalNode {
    return this.getToken(PythonParser.FUNCTION_ANNOTATION, 0)!;
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
  public COMMENT(): antlr.TerminalNode {
    return this.getToken(PythonParser.COMMENT, 0)!;
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
  public COMMENT(): antlr.TerminalNode[];
  public COMMENT(i: number): antlr.TerminalNode | null;
  public COMMENT(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    if (i === undefined) {
      return this.getTokens(PythonParser.COMMENT);
    } else {
      return this.getToken(PythonParser.COMMENT, i);
    }
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
  public PROCECDURE_ANNOTATION(): antlr.TerminalNode {
    return this.getToken(PythonParser.PROCECDURE_ANNOTATION, 0)!;
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
  public COMMENT(): antlr.TerminalNode {
    return this.getToken(PythonParser.COMMENT, 0)!;
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
  public identifier(): IdentifierContext {
    return this.getRuleContext(0, IdentifierContext)!;
  }
  public EQUAL(): antlr.TerminalNode {
    return this.getToken(PythonParser.EQUAL, 0)!;
  }
  public constantValue(): ConstantValueContext {
    return this.getRuleContext(0, ConstantValueContext)!;
  }
  public CONSTANT_ANNOTATION(): antlr.TerminalNode {
    return this.getToken(PythonParser.CONSTANT_ANNOTATION, 0)!;
  }
  public NL(): antlr.TerminalNode {
    return this.getToken(PythonParser.NL, 0)!;
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
  public ENUM_ANNOTATION(): antlr.TerminalNode {
    return this.getToken(PythonParser.ENUM_ANNOTATION, 0)!;
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
  public enumValuesList(): EnumValuesListContext {
    return this.getRuleContext(0, EnumValuesListContext)!;
  }
  public COMMENT(): antlr.TerminalNode {
    return this.getToken(PythonParser.COMMENT, 0)!;
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
  public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
    super(parent, invokingState);
  }
  public CLASS(): antlr.TerminalNode {
    return this.getToken(PythonParser.CLASS, 0)!;
  }
  public typeName(): TypeNameContext[];
  public typeName(i: number): TypeNameContext | null;
  public typeName(i?: number): TypeNameContext[] | TypeNameContext | null {
    if (i === undefined) {
      return this.getRuleContexts(TypeNameContext);
    }

    return this.getRuleContext(i, TypeNameContext);
  }
  public COLON(): antlr.TerminalNode {
    return this.getToken(PythonParser.COLON, 0)!;
  }
  public CONCRETE_CLASS_ANNOTATION(): antlr.TerminalNode {
    return this.getToken(PythonParser.CONCRETE_CLASS_ANNOTATION, 0)!;
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
  public COMMENT(): antlr.TerminalNode {
    return this.getToken(PythonParser.COMMENT, 0)!;
  }
  public OPEN_BRACKET(): antlr.TerminalNode | null {
    return this.getToken(PythonParser.OPEN_BRACKET, 0);
  }
  public CLOSE_BRACKET(): antlr.TerminalNode | null {
    return this.getToken(PythonParser.CLOSE_BRACKET, 0);
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

export class AbstractClassContext extends antlr.ParserRuleContext {
  public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
    super(parent, invokingState);
  }
  public CLASS(): antlr.TerminalNode {
    return this.getToken(PythonParser.CLASS, 0)!;
  }
  public typeName(): TypeNameContext[];
  public typeName(i: number): TypeNameContext | null;
  public typeName(i?: number): TypeNameContext[] | TypeNameContext | null {
    if (i === undefined) {
      return this.getRuleContexts(TypeNameContext);
    }

    return this.getRuleContext(i, TypeNameContext);
  }
  public ABSTRACT_CLASS_ANNOTATION(): antlr.TerminalNode {
    return this.getToken(PythonParser.ABSTRACT_CLASS_ANNOTATION, 0)!;
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
  public COMMENT(): antlr.TerminalNode {
    return this.getToken(PythonParser.COMMENT, 0)!;
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

export class CommentGlobalContext extends antlr.ParserRuleContext {
  public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
    super(parent, invokingState);
  }
  public COMMENT(): antlr.TerminalNode {
    return this.getToken(PythonParser.COMMENT, 0)!;
  }
  public NL(): antlr.TerminalNode {
    return this.getToken(PythonParser.NL, 0)!;
  }
  public override get ruleIndex(): number {
    return PythonParser.RULE_commentGlobal;
  }
  public override enterRule(listener: PythonListener): void {
    if (listener.enterCommentGlobal) {
      listener.enterCommentGlobal(this);
    }
  }
  public override exitRule(listener: PythonListener): void {
    if (listener.exitCommentGlobal) {
      listener.exitCommentGlobal(this);
    }
  }
  public override accept<Result>(visitor: PythonVisitor<Result>): Result | null {
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

export class PrintContext extends antlr.ParserRuleContext {
  public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
    super(parent, invokingState);
  }
  public PRINT(): antlr.TerminalNode {
    return this.getToken(PythonParser.PRINT, 0)!;
  }
  public OPEN_BRACKET(): antlr.TerminalNode {
    return this.getToken(PythonParser.OPEN_BRACKET, 0)!;
  }
  public CLOSE_BRACKET(): antlr.TerminalNode {
    return this.getToken(PythonParser.CLOSE_BRACKET, 0)!;
  }
  public NL(): antlr.TerminalNode {
    return this.getToken(PythonParser.NL, 0)!;
  }
  public expression(): ExpressionContext | null {
    return this.getRuleContext(0, ExpressionContext);
  }
  public override get ruleIndex(): number {
    return PythonParser.RULE_print;
  }
  public override enterRule(listener: PythonListener): void {
    if (listener.enterPrint) {
      listener.enterPrint(this);
    }
  }
  public override exitRule(listener: PythonListener): void {
    if (listener.exitPrint) {
      listener.exitPrint(this);
    }
  }
  public override accept<Result>(visitor: PythonVisitor<Result>): Result | null {
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
  public identifier(): IdentifierContext {
    return this.getRuleContext(0, IdentifierContext)!;
  }
  public EQUAL(): antlr.TerminalNode {
    return this.getToken(PythonParser.EQUAL, 0)!;
  }
  public expression(): ExpressionContext {
    return this.getRuleContext(0, ExpressionContext)!;
  }
  public VARIABLE_ANNOTATION(): antlr.TerminalNode {
    return this.getToken(PythonParser.VARIABLE_ANNOTATION, 0)!;
  }
  public NL(): antlr.TerminalNode {
    return this.getToken(PythonParser.NL, 0)!;
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
  public EQUAL(): antlr.TerminalNode {
    return this.getToken(PythonParser.EQUAL, 0)!;
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

export class InputStatementContext extends antlr.ParserRuleContext {
  public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
    super(parent, invokingState);
  }
  public identifier(): IdentifierContext {
    return this.getRuleContext(0, IdentifierContext)!;
  }
  public EQUAL(): antlr.TerminalNode {
    return this.getToken(PythonParser.EQUAL, 0)!;
  }
  public INPUT(): antlr.TerminalNode {
    return this.getToken(PythonParser.INPUT, 0)!;
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
  public INPUT_ANNOTATION(): antlr.TerminalNode {
    return this.getToken(PythonParser.INPUT_ANNOTATION, 0)!;
  }
  public NL(): antlr.TerminalNode {
    return this.getToken(PythonParser.NL, 0)!;
  }
  public override get ruleIndex(): number {
    return PythonParser.RULE_inputStatement;
  }
  public override enterRule(listener: PythonListener): void {
    if (listener.enterInputStatement) {
      listener.enterInputStatement(this);
    }
  }
  public override exitRule(listener: PythonListener): void {
    if (listener.exitInputStatement) {
      listener.exitInputStatement(this);
    }
  }
  public override accept<Result>(visitor: PythonVisitor<Result>): Result | null {
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
    return this.getToken(PythonParser.IF, 0)!;
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
  public COMMENT(): antlr.TerminalNode {
    return this.getToken(PythonParser.COMMENT, 0)!;
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
  public COMMENT(): antlr.TerminalNode {
    return this.getToken(PythonParser.COMMENT, 0)!;
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
  public identifier(): IdentifierContext {
    return this.getRuleContext(0, IdentifierContext)!;
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
  public COMMENT(): antlr.TerminalNode {
    return this.getToken(PythonParser.COMMENT, 0)!;
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
  public CALL_ANNOTATION(): antlr.TerminalNode {
    return this.getToken(PythonParser.CALL_ANNOTATION, 0)!;
  }
  public NL(): antlr.TerminalNode {
    return this.getToken(PythonParser.NL, 0)!;
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
  public NL(): antlr.TerminalNode[];
  public NL(i: number): antlr.TerminalNode | null;
  public NL(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    if (i === undefined) {
      return this.getTokens(PythonParser.NL);
    } else {
      return this.getToken(PythonParser.NL, i);
    }
  }
  public catchStatement(): CatchStatementContext {
    return this.getRuleContext(0, CatchStatementContext)!;
  }
  public COMMENT(): antlr.TerminalNode {
    return this.getToken(PythonParser.COMMENT, 0)!;
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
  public litString(): LitStringContext {
    return this.getRuleContext(0, LitStringContext)!;
  }
  public CLOSE_BRACKET(): antlr.TerminalNode {
    return this.getToken(PythonParser.CLOSE_BRACKET, 0)!;
  }
  public NL(): antlr.TerminalNode {
    return this.getToken(PythonParser.NL, 0)!;
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

export class CommentStatementContext extends antlr.ParserRuleContext {
  public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
    super(parent, invokingState);
  }
  public COMMENT(): antlr.TerminalNode {
    return this.getToken(PythonParser.COMMENT, 0)!;
  }
  public NL(): antlr.TerminalNode {
    return this.getToken(PythonParser.NL, 0)!;
  }
  public override get ruleIndex(): number {
    return PythonParser.RULE_commentStatement;
  }
  public override enterRule(listener: PythonListener): void {
    if (listener.enterCommentStatement) {
      listener.enterCommentStatement(this);
    }
  }
  public override exitRule(listener: PythonListener): void {
    if (listener.exitCommentStatement) {
      listener.exitCommentStatement(this);
    }
  }
  public override accept<Result>(visitor: PythonVisitor<Result>): Result | null {
    if (visitor.visitCommentStatement) {
      return visitor.visitCommentStatement(this);
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
  public expression(): ExpressionContext {
    return this.getRuleContext(0, ExpressionContext)!;
  }
  public CLOSE_BRACKET(): antlr.TerminalNode {
    return this.getToken(PythonParser.CLOSE_BRACKET, 0)!;
  }
  public NL(): antlr.TerminalNode {
    return this.getToken(PythonParser.NL, 0)!;
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

export class LetStatementContext extends antlr.ParserRuleContext {
  public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
    super(parent, invokingState);
  }
  public identifier(): IdentifierContext {
    return this.getRuleContext(0, IdentifierContext)!;
  }
  public EQUAL(): antlr.TerminalNode {
    return this.getToken(PythonParser.EQUAL, 0)!;
  }
  public expression(): ExpressionContext {
    return this.getRuleContext(0, ExpressionContext)!;
  }
  public LET_ANNOTATION(): antlr.TerminalNode {
    return this.getToken(PythonParser.LET_ANNOTATION, 0)!;
  }
  public NL(): antlr.TerminalNode {
    return this.getToken(PythonParser.NL, 0)!;
  }
  public override get ruleIndex(): number {
    return PythonParser.RULE_letStatement;
  }
  public override enterRule(listener: PythonListener): void {
    if (listener.enterLetStatement) {
      listener.enterLetStatement(this);
    }
  }
  public override exitRule(listener: PythonListener): void {
    if (listener.exitLetStatement) {
      listener.exitLetStatement(this);
    }
  }
  public override accept<Result>(visitor: PythonVisitor<Result>): Result | null {
    if (visitor.visitLetStatement) {
      return visitor.visitLetStatement(this);
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
  public ELSE_IF_ANNOTATION(): antlr.TerminalNode {
    return this.getToken(PythonParser.ELSE_IF_ANNOTATION, 0)!;
  }
  public NL(): antlr.TerminalNode {
    return this.getToken(PythonParser.NL, 0)!;
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
  public identifier(): IdentifierContext {
    return this.getRuleContext(0, IdentifierContext)!;
  }
  public NL(): antlr.TerminalNode {
    return this.getToken(PythonParser.NL, 0)!;
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
  public COMMENT(): antlr.TerminalNode {
    return this.getToken(PythonParser.COMMENT, 0)!;
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
  public identifier(): IdentifierContext {
    return this.getRuleContext(0, IdentifierContext)!;
  }
  public COLON(): antlr.TerminalNode {
    return this.getToken(PythonParser.COLON, 0)!;
  }
  public type(): TypeContext {
    return this.getRuleContext(0, TypeContext)!;
  }
  public PROPERTY_ANNOTATION(): antlr.TerminalNode {
    return this.getToken(PythonParser.PROPERTY_ANNOTATION, 0)!;
  }
  public NL(): antlr.TerminalNode {
    return this.getToken(PythonParser.NL, 0)!;
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
  public FUNCTION_METHOD_ANNOTATION(): antlr.TerminalNode {
    return this.getToken(PythonParser.FUNCTION_METHOD_ANNOTATION, 0)!;
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
  public COMMENT(): antlr.TerminalNode {
    return this.getToken(PythonParser.COMMENT, 0)!;
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
  public PROCEDURE_METHOD_ANNOTATION(): antlr.TerminalNode {
    return this.getToken(PythonParser.PROCEDURE_METHOD_ANNOTATION, 0)!;
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
  public COMMENT(): antlr.TerminalNode {
    return this.getToken(PythonParser.COMMENT, 0)!;
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
  public COMMENT(): antlr.TerminalNode {
    return this.getToken(PythonParser.COMMENT, 0)!;
  }
  public paramsList(): ParamsListContext | null {
    return this.getRuleContext(0, ParamsListContext);
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
  public COMMENT(): antlr.TerminalNode {
    return this.getToken(PythonParser.COMMENT, 0)!;
  }
  public paramsList(): ParamsListContext | null {
    return this.getRuleContext(0, ParamsListContext);
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

export class CommentMemberContext extends antlr.ParserRuleContext {
  public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
    super(parent, invokingState);
  }
  public NL(): antlr.TerminalNode {
    return this.getToken(PythonParser.NL, 0)!;
  }
  public COMMENT(): antlr.TerminalNode | null {
    return this.getToken(PythonParser.COMMENT, 0);
  }
  public override get ruleIndex(): number {
    return PythonParser.RULE_commentMember;
  }
  public override enterRule(listener: PythonListener): void {
    if (listener.enterCommentMember) {
      listener.enterCommentMember(this);
    }
  }
  public override exitRule(listener: PythonListener): void {
    if (listener.exitCommentMember) {
      listener.exitCommentMember(this);
    }
  }
  public override accept<Result>(visitor: PythonVisitor<Result>): Result | null {
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
    return this.getToken(PythonParser.NAME_STARTING_LC, 0)!;
  }
  public override get ruleIndex(): number {
    return PythonParser.RULE_identifier;
  }
  public override enterRule(listener: PythonListener): void {
    if (listener.enterIdentifier) {
      listener.enterIdentifier(this);
    }
  }
  public override exitRule(listener: PythonListener): void {
    if (listener.exitIdentifier) {
      listener.exitIdentifier(this);
    }
  }
  public override accept<Result>(visitor: PythonVisitor<Result>): Result | null {
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
    return PythonParser.RULE_assignable;
  }
  public override enterRule(listener: PythonListener): void {
    if (listener.enterAssignable) {
      listener.enterAssignable(this);
    }
  }
  public override exitRule(listener: PythonListener): void {
    if (listener.exitAssignable) {
      listener.exitAssignable(this);
    }
  }
  public override accept<Result>(visitor: PythonVisitor<Result>): Result | null {
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
  public INT_NAME(): antlr.TerminalNode | null {
    return this.getToken(PythonParser.INT_NAME, 0);
  }
  public FLOAT_NAME(): antlr.TerminalNode | null {
    return this.getToken(PythonParser.FLOAT_NAME, 0);
  }
  public BOOL_NAME(): antlr.TerminalNode | null {
    return this.getToken(PythonParser.BOOL_NAME, 0);
  }
  public STRING_NAME(): antlr.TerminalNode | null {
    return this.getToken(PythonParser.STRING_NAME, 0);
  }
  public LIST_NAME(): antlr.TerminalNode | null {
    return this.getToken(PythonParser.LIST_NAME, 0);
  }
  public NAME_STARTING_UC(): antlr.TerminalNode | null {
    return this.getToken(PythonParser.NAME_STARTING_UC, 0);
  }
  public override get ruleIndex(): number {
    return PythonParser.RULE_typeName;
  }
  public override enterRule(listener: PythonListener): void {
    if (listener.enterTypeName) {
      listener.enterTypeName(this);
    }
  }
  public override exitRule(listener: PythonListener): void {
    if (listener.exitTypeName) {
      listener.exitTypeName(this);
    }
  }
  public override accept<Result>(visitor: PythonVisitor<Result>): Result | null {
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
      return this.getTokens(PythonParser.COMMA);
    } else {
      return this.getToken(PythonParser.COMMA, i);
    }
  }
  public override get ruleIndex(): number {
    return PythonParser.RULE_paramsList;
  }
  public override enterRule(listener: PythonListener): void {
    if (listener.enterParamsList) {
      listener.enterParamsList(this);
    }
  }
  public override exitRule(listener: PythonListener): void {
    if (listener.exitParamsList) {
      listener.exitParamsList(this);
    }
  }
  public override accept<Result>(visitor: PythonVisitor<Result>): Result | null {
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
      return this.getTokens(PythonParser.COMMA);
    } else {
      return this.getToken(PythonParser.COMMA, i);
    }
  }
  public override get ruleIndex(): number {
    return PythonParser.RULE_enumValuesList;
  }
  public override enterRule(listener: PythonListener): void {
    if (listener.enterEnumValuesList) {
      listener.enterEnumValuesList(this);
    }
  }
  public override exitRule(listener: PythonListener): void {
    if (listener.exitEnumValuesList) {
      listener.exitEnumValuesList(this);
    }
  }
  public override accept<Result>(visitor: PythonVisitor<Result>): Result | null {
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
  public LITERAL_INTEGER(): antlr.TerminalNode | null {
    return this.getToken(PythonParser.LITERAL_INTEGER, 0);
  }
  public LITERAL_BINARY(): antlr.TerminalNode | null {
    return this.getToken(PythonParser.LITERAL_BINARY, 0);
  }
  public LITERAL_HEX(): antlr.TerminalNode | null {
    return this.getToken(PythonParser.LITERAL_HEX, 0);
  }
  public override get ruleIndex(): number {
    return PythonParser.RULE_litInt;
  }
  public override enterRule(listener: PythonListener): void {
    if (listener.enterLitInt) {
      listener.enterLitInt(this);
    }
  }
  public override exitRule(listener: PythonListener): void {
    if (listener.exitLitInt) {
      listener.exitLitInt(this);
    }
  }
  public override accept<Result>(visitor: PythonVisitor<Result>): Result | null {
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
  public identifier(): IdentifierContext {
    return this.getRuleContext(0, IdentifierContext)!;
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

export class LitStringContext extends antlr.ParserRuleContext {
  public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
    super(parent, invokingState);
  }
  public LITERAL_STRING(): antlr.TerminalNode {
    return this.getToken(PythonParser.LITERAL_STRING, 0)!;
  }
  public INTERPOLATED_STRING_PREFIX(): antlr.TerminalNode | null {
    return this.getToken(PythonParser.INTERPOLATED_STRING_PREFIX, 0);
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
    return PythonParser.RULE_identifierWithOptIndexes;
  }
  public override enterRule(listener: PythonListener): void {
    if (listener.enterIdentifierWithOptIndexes) {
      listener.enterIdentifierWithOptIndexes(this);
    }
  }
  public override exitRule(listener: PythonListener): void {
    if (listener.exitIdentifierWithOptIndexes) {
      listener.exitIdentifierWithOptIndexes(this);
    }
  }
  public override accept<Result>(visitor: PythonVisitor<Result>): Result | null {
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
    return this.getToken(PythonParser.THIS_INSTANCE, 0)!;
  }
  public DOT(): antlr.TerminalNode {
    return this.getToken(PythonParser.DOT, 0)!;
  }
  public identifierWithOptIndexes(): IdentifierWithOptIndexesContext {
    return this.getRuleContext(0, IdentifierWithOptIndexesContext)!;
  }
  public override get ruleIndex(): number {
    return PythonParser.RULE_propertyRef;
  }
  public override enterRule(listener: PythonListener): void {
    if (listener.enterPropertyRef) {
      listener.enterPropertyRef(this);
    }
  }
  public override exitRule(listener: PythonListener): void {
    if (listener.exitPropertyRef) {
      listener.exitPropertyRef(this);
    }
  }
  public override accept<Result>(visitor: PythonVisitor<Result>): Result | null {
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
    return this.getToken(PythonParser.IF_, 0);
  }
  public OPEN_BRACKET(): antlr.TerminalNode | null {
    return this.getToken(PythonParser.OPEN_BRACKET, 0);
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
  public CLOSE_BRACKET(): antlr.TerminalNode | null {
    return this.getToken(PythonParser.CLOSE_BRACKET, 0);
  }
  public binaryOperator(): BinaryOperatorContext | null {
    return this.getRuleContext(0, BinaryOperatorContext);
  }
  public override get ruleIndex(): number {
    return PythonParser.RULE_expression;
  }
  public override enterRule(listener: PythonListener): void {
    if (listener.enterExpression) {
      listener.enterExpression(this);
    }
  }
  public override exitRule(listener: PythonListener): void {
    if (listener.exitExpression) {
      listener.exitExpression(this);
    }
  }
  public override accept<Result>(visitor: PythonVisitor<Result>): Result | null {
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
      return this.getTokens(PythonParser.DOT);
    } else {
      return this.getToken(PythonParser.DOT, i);
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
    return PythonParser.RULE_term;
  }
  public override enterRule(listener: PythonListener): void {
    if (listener.enterTerm) {
      listener.enterTerm(this);
    }
  }
  public override exitRule(listener: PythonListener): void {
    if (listener.exitTerm) {
      listener.exitTerm(this);
    }
  }
  public override accept<Result>(visitor: PythonVisitor<Result>): Result | null {
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
    return this.getToken(PythonParser.THIS_INSTANCE, 0);
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
    return PythonParser.RULE_chainHead;
  }
  public override enterRule(listener: PythonListener): void {
    if (listener.enterChainHead) {
      listener.enterChainHead(this);
    }
  }
  public override exitRule(listener: PythonListener): void {
    if (listener.exitChainHead) {
      listener.exitChainHead(this);
    }
  }
  public override accept<Result>(visitor: PythonVisitor<Result>): Result | null {
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
  public term(): TermContext {
    return this.getRuleContext(0, TermContext)!;
  }
  public MINUS(): antlr.TerminalNode | null {
    return this.getToken(PythonParser.MINUS, 0);
  }
  public NOT(): antlr.TerminalNode | null {
    return this.getToken(PythonParser.NOT, 0);
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

export class TupleContext extends antlr.ParserRuleContext {
  public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
    super(parent, invokingState);
  }
  public OPEN_BRACKET(): antlr.TerminalNode {
    return this.getToken(PythonParser.OPEN_BRACKET, 0)!;
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
  public identifier(): IdentifierContext {
    return this.getRuleContext(0, IdentifierContext)!;
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
  public argList(): ArgListContext {
    return this.getRuleContext(0, ArgListContext)!;
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

export class ListContext extends antlr.ParserRuleContext {
  public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
    super(parent, invokingState);
  }
  public OPEN_SQ_BRACKET(): antlr.TerminalNode {
    return this.getToken(PythonParser.OPEN_SQ_BRACKET, 0)!;
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

export class InterpolatedStringContext extends antlr.ParserRuleContext {
  public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
    super(parent, invokingState);
  }
  public INTERPOLATED_STRING_PREFIX(): antlr.TerminalNode {
    return this.getToken(PythonParser.INTERPOLATED_STRING_PREFIX, 0)!;
  }
  public LITERAL_STRING(): antlr.TerminalNode {
    return this.getToken(PythonParser.LITERAL_STRING, 0)!;
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
    return this.getToken(PythonParser.POWER, 0)!;
  }
  public override get ruleIndex(): number {
    return PythonParser.RULE_power;
  }
  public override enterRule(listener: PythonListener): void {
    if (listener.enterPower) {
      listener.enterPower(this);
    }
  }
  public override exitRule(listener: PythonListener): void {
    if (listener.exitPower) {
      listener.exitPower(this);
    }
  }
  public override accept<Result>(visitor: PythonVisitor<Result>): Result | null {
    if (visitor.visitPower) {
      return visitor.visitPower(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}
